import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    console.log("Received form data:", data);

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
    const currentDateTime = new Date().toISOString();

    const crmData = {
      data: [
        {
          // Standard Account fields using correct API names
          Account_Name: data.company,
          Phone: data.phone,
          Website: "", // You can add this to your form if needed

          // Address fields using correct API names
          Billing_Street: data.address,
          Billing_City: data.city,
          Billing_State: data.province,
          Billing_Code: data.postalCode,
          Billing_Country: "España",

          // Shipping address (same as billing for this case)
          Shipping_Street: data.address,
          Shipping_City: data.city,
          Shipping_State: data.province,
          Shipping_Code: data.postalCode,
          Shipping_Country: "España",

          // Custom fields using exact API names from your Zoho setup
          CIF_NIF1: data.cif, // Using the API name from your screenshot
          Correo_electr_nico: data.email, // Company email

          // Contact information - this might need to be a separate contact record
          // For now, we'll store it in description and custom fields

          // Account type and classification
          Account_Type: "Customer", // You can customize this
          Industry: "Retail", // You can add this to your form or set default

          // Description with all contact and form details
          Description: `
FORMULARIO DE ALTA DE CLIENTE - ${currentDateTime}

=== DATOS DE LA EMPRESA ===
Razón Social: ${data.company}
CIF/NIF: ${data.cif}
Dirección Fiscal: ${data.address}
Población: ${data.city}
Código Postal: ${data.postalCode}
Provincia: ${data.province}
Teléfono: ${data.phone}
Email: ${data.email}

=== CONTACTO PRINCIPAL ===
Nombre: ${data.firstName} ${data.lastName}
Teléfono: ${data.contactPhone}
Email: ${data.contactEmail}
Administración: ${data.administration}

=== INFORMACIÓN ADICIONAL ===
¿Cómo nos conoció?: ${data.howDidYouKnow}
Firma: ${data.signature}
Firmante: ${data.signerName} (${data.signerPosition})
Acepta términos: ${data.acceptTerms ? "Sí" : "No"}

Enviado desde: Formulario web personalizado
          `.trim(),
        },
      ],
    };

    console.log("Sending data to Zoho CRM:", JSON.stringify(crmData, null, 2));

    // Step 3: Create Account in Zoho CRM
    const crmResponse = await fetch("https://www.zohoapis.eu/crm/v3/Accounts", {
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

    // Check if account was created successfully
    if (
      crmResult.data &&
      crmResult.data[0] &&
      crmResult.data[0].status === "success"
    ) {
      const accountId = crmResult.data[0].details.id;
      console.log(`SUCCESS - Account created with ID: ${accountId}`);

      // Step 4: Create Contact record for the contact person
      const contactData = {
        data: [
          {
            First_Name: data.firstName,
            Last_Name: data.lastName,
            Email: data.contactEmail,
            Phone: data.contactPhone,
            Account_Name: accountId, // Link to the account we just created
            Description: `
CONTACTO PRINCIPAL DE: ${data.company}

Administración: ${data.administration}
Firmante: ${data.signerName} (${data.signerPosition})
Forma de conocernos: ${data.howDidYouKnow}
Fecha de registro: ${currentDateTime}
            `.trim(),
          },
        ],
      };

      console.log(
        "Creating contact in Zoho CRM:",
        JSON.stringify(contactData, null, 2)
      );

      const contactResponse = await fetch(
        "https://www.zohoapis.eu/crm/v3/Contacts",
        {
          method: "POST",
          headers: {
            Authorization: `Zoho-oauthtoken ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(contactData),
        }
      );

      const contactResult = await contactResponse.json();
      console.log("CRM Contact response:", contactResult);

      let contactId = null;
      if (
        contactResponse.ok &&
        contactResult.data &&
        contactResult.data[0] &&
        contactResult.data[0].status === "success"
      ) {
        contactId = contactResult.data[0].details.id;
        console.log(`SUCCESS - Contact created with ID: ${contactId}`);
      } else {
        console.warn(
          "Contact creation failed, but account was created successfully:",
          contactResult
        );
      }

      return NextResponse.json(
        {
          message: "Client created successfully in Zoho CRM",
          accountId: accountId,
          contactId: contactId,
          status: "success",
        },
        { status: 200 }
      );
    } else {
      throw new Error(`Account creation failed: ${JSON.stringify(crmResult)}`);
    }
  } catch (error) {
    console.error("=== ZOHO CRM API ERROR ===");
    console.error("Error details:", error);

    return NextResponse.json(
      {
        message: "Error creating client in Zoho CRM",
        error: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    );
  }
}
