import { NextRequest, NextResponse } from "next/server";

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
          <li><strong>¿Cómo nos conoció?</strong> ${
            formData.howDidYouKnow
          }</li>
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
    formData = await request.json();
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
