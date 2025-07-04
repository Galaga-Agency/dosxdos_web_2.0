import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import { join } from "path";
import { mkdir } from "fs/promises";

async function uploadFiles(formData: FormData): Promise<string[]> {
  try {
    const fileUrls: string[] = [];

    // Get all files from FormData
    const files: File[] = [];
    for (const [key, value] of formData.entries()) {
      if (key.startsWith("file_") && value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return fileUrls;
    }

    console.log(`Uploading ${files.length} files...`);

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), "public/uploads");
    try {
      await mkdir(uploadsDir, { recursive: true });
    } catch (error) {
      // Directory might already exist
    }

    for (const file of files) {
      // Generate unique filename
      const timestamp = Date.now();
      const randomId = Math.random().toString(36).substring(2);
      const filename = `${timestamp}-${randomId}-${file.name}`;

      // Save file
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const uploadPath = join(uploadsDir, filename);

      await writeFile(uploadPath, buffer);

      // Create public URL
      const fileUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/uploads/${filename}`;
      fileUrls.push(fileUrl);

      console.log(`File uploaded: ${file.name} -> ${fileUrl}`);
    }

    return fileUrls;
  } catch (error) {
    console.error("File upload error:", error);
    throw new Error("Failed to upload files");
  }
}

async function sendNotificationEmail(
  subject: string,
  message: string,
  formData: any
) {
  try {
    const nodemailer = require("nodemailer");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const recipients = [
      process.env.NOTIFICATION_EMAIL_1,
      process.env.NOTIFICATION_EMAIL_2,
      process.env.NOTIFICATION_EMAIL_3,
      process.env.NOTIFICATION_EMAIL_4,
    ].filter(Boolean);

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: recipients,
      subject: "PETICIÓN DE CONTACTO DESDE LA PÁGINA WEB",
      html: `
        <p><strong>Mensaje:</strong> DATOS DEL CONTACTO SOLICITADO: </p>
        <ul>
          <li><strong>Nombre:</strong> ${formData.firstName} ${
        formData.lastName
      }</li>
          <li><strong>Correo Electrónico:</strong> ${formData.email}</li>
          <li><strong>Teléfono:</strong> ${formData.phone}</li>
          <li><strong>¿Cómo nos conoció?</strong> ${formData.howDidYouKnow}</li>
          <li><strong>Servicios:</strong> ${formData.servicios}</li>
          <li><strong>Otros detalles:</strong> ${formData.otrosDetalles}</li>
          <li><strong>Mensaje:</strong> ${formData.message}</li>
        </ul>
        <p><strong>Fecha:</strong> ${new Date().toISOString()}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Notification email sent successfully to multiple recipients");

    return NextResponse.json(
      {
        message: "Contact request successfully sent",
        status: "success",
      },
      { status: 200 }
    );
  } catch (emailError) {
    console.error("Failed to send notification email:", emailError);
    return NextResponse.json(
      {
        message: "Error sending contact request",
        error:
          emailError instanceof Error ? emailError.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  let formData: any = null;

  try {
    // Check if request has files (FormData) or is JSON
    const contentType = request.headers.get("content-type");
    let fileUrls: string[] = [];

    if (contentType && contentType.includes("multipart/form-data")) {
      // Handle FormData (with files)
      const data = await request.formData();

      // Upload files first
      fileUrls = await uploadFiles(data);

      // Extract form fields from FormData
      formData = {
        firstName: data.get("firstName") as string,
        lastName: data.get("lastName") as string,
        email: data.get("email") as string,
        phone: data.get("phone") as string,
        howDidYouKnow: data.get("howDidYouKnow") as string,
        servicios: JSON.parse((data.get("servicios") as string) || "[]"),
        otrosDetalles: data.get("otrosDetalles") as string,
        message: data.get("message") as string,
      };
    } else {
      // Handle JSON (no files)
      formData = await request.json();
    }

    console.log("Received form data:", formData);

    // Step 1: Get Access Token from Zoho CRM
    console.log("Getting Zoho CRM access token...");

    const tokenResponse = await fetch(
      "https://accounts.zoho.eu/oauth/v2/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          grant_type: "refresh_token",
          client_id: process.env.CLIENT_ID_ZOHO!,
          client_secret: process.env.CLIENT_SECRET_ZOHO!,
          refresh_token: process.env.REFRESH_TOKEN_ZOHO!,
        }),
      }
    );

    const tokenData = await tokenResponse.json();
    console.log("Token response:", tokenData);

    if (!tokenResponse.ok) {
      console.error("Token error:", tokenData);
      throw new Error(
        `Token error: ${tokenData.error} - ${tokenData.error_description}`
      );
    }

    const accessToken = tokenData.access_token;
    console.log("Access token obtained successfully");

    // Step 2: Prepare data for Zoho CRM using correct API field names
    const crmData = {
      data: [
        {
          First_Name: formData.firstName,
          Last_Name: formData.lastName,
          Email: formData.email,
          Phone: formData.phone,
          Nos_conoci: formData.howDidYouKnow,
          Servicios: formData.servicios,
          Otros_detalles: formData.otrosDetalles,
          Mensaje: formData.message,
          // Add file URLs if any
          ...(fileUrls.length > 0 && {
            Archivos_Adjuntos: fileUrls.join("\n"),
          }),
        },
      ],
    };

    console.log("Sending data to Zoho CRM:", JSON.stringify(crmData, null, 2));

    // Step 3: Create Contact in Zoho CRM
    const crmResponse = await fetch("https://www.zohoapis.eu/crm/v3/Contacts", {
      method: "POST",
      headers: {
        Authorization: `Zoho-oauthtoken ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crmData),
    });

    const crmResult = await crmResponse.json();
    console.log("CRM Account response:", crmResult);

    if (!crmResponse.ok) {
      console.error("CRM error details:", crmResult);
      throw new Error(`CRM error: ${JSON.stringify(crmResult)}`);
    }

    // Check if contact was created successfully
    if (
      crmResult.data &&
      crmResult.data[0] &&
      crmResult.data[0].status === "success"
    ) {
      const contactId = crmResult.data[0].details.id;
      console.log(`SUCCESS - Account created with ID: ${contactId}`);

      return NextResponse.json(
        {
          message: "Contact created successfully in Zoho CRM",
          contactId: contactId,
          status: "success",
        },
        { status: 200 }
      );
    } else {
      throw new Error(`Contact creation failed: ${JSON.stringify(crmResult)}`);
    }
  } catch (error: any) {
    console.error("=== ZOHO CRM API ERROR ===");

    // Check for duplicate data error and send email notification
    if (error.data?.code === "DUPLICATE_DATA") {
      console.error("Duplicate contact detected");

      // Send email notification to multiple recipients
      return await sendNotificationEmail(
        "🔄 Duplicate Contact Attempt - dosxdos Website",
        "Someone tried to submit a contact form with an email that already exists in Zoho CRM.",
        formData
      );
    } else {
      // Send email for other errors too
      return await sendNotificationEmail(
        "❌ Zoho CRM Error - dosxdos Website",
        `Error occurred while creating contact: ${error.message}`,
        formData
      );
    }
  }
}
