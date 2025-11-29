import type { APIRoute } from 'astro';
import { companyInfo } from '../../data/company-details';

const EMAIL_API_URL = 'https://email-api-liard.vercel.app/api/contact';

// Tell Astro to render this route on-demand (not prerender)
export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    console.log('=== SEND-BOOKING API CALLED ===');

    // Parse the request body from the frontend
    const body = await request.json();
    console.log('Received body:', JSON.stringify(body, null, 2));

    const { firstName, lastName, email, phone, street, city, state, zipCode, deliveryNotes, order } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !phone || !street || !city || !state || !zipCode || !order) {
      console.error('Validation failed - missing required fields');
      console.log('Missing fields check:', { firstName, lastName, email, phone, street, city, state, zipCode, order: !!order });
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('Validation passed');

    // Build a nice HTML-formatted summary to send as the "message" field
    const customerName = `${firstName} ${lastName}`;
    const serviceLabel = `${order.type}yd Dumpster Booking`;

    const messageText = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #333;">
        <h2 style="color: #2563eb; border-bottom: 3px solid #2563eb; padding-bottom: 10px; margin-bottom: 20px;">
          New Dumpster Booking Request
        </h2>

        <div style="background-color: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1f2937; margin-top: 0; font-size: 18px; border-bottom: 2px solid #d1d5db; padding-bottom: 8px;">
            Customer Information
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 140px;">Name:</td>
              <td style="padding: 8px 0; color: #1f2937;">${customerName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Email:</td>
              <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Phone:</td>
              <td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #2563eb; text-decoration: none;">${phone}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; vertical-align: top;">Address:</td>
              <td style="padding: 8px 0; color: #1f2937; line-height: 1.6;">
                ${street}<br>
                ${city}, ${state.toUpperCase()} ${zipCode}
              </td>
            </tr>
          </table>
        </div>

        <div style="background-color: #ecfdf5; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #10b981;">
          <h3 style="color: #1f2937; margin-top: 0; font-size: 18px; border-bottom: 2px solid #a7f3d0; padding-bottom: 8px;">
            Dumpster Details
          </h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563; width: 140px;">Size:</td>
              <td style="padding: 8px 0; color: #1f2937; font-size: 16px;"><strong>${order.type} Cubic Yard</strong></td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Price:</td>
              <td style="padding: 8px 0; color: #059669; font-size: 18px; font-weight: bold;">$${order.price}/week</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Delivery Date:</td>
              <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${order.deliveryDate}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: bold; color: #4b5563;">Pickup Date:</td>
              <td style="padding: 8px 0; color: #1f2937; font-weight: 600;">${order.pickupDate}</td>
            </tr>
          </table>
        </div>

        ${deliveryNotes ? `
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin-bottom: 20px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #1f2937; margin-top: 0; font-size: 18px; border-bottom: 2px solid #fde68a; padding-bottom: 8px;">
            Delivery Notes
          </h3>
          <p style="margin: 0; color: #1f2937; white-space: pre-line;">${deliveryNotes}</p>
        </div>
        ` : ''}

        <div style="text-align: center; padding-top: 20px; border-top: 2px solid #e5e7eb; color: #6b7280; font-size: 14px;">
          <p style="margin: 5px 0;">This booking request was submitted through <strong>JoeTheGuy.com</strong></p>
        </div>
      </div>
    `.trim();

    // Shape payload for your Vercel email-api service
    const payload = {
      name: customerName,
      email,
      phone,
      service: serviceLabel,
      message: messageText,
    };

    console.log('Sending to email API:', EMAIL_API_URL);
    console.log('Payload:', JSON.stringify(payload, null, 2));
    console.log('Headers:', {
      'Content-Type': 'application/json',
      'Origin': 'http://localhost:4321',
      'x-client-key': companyInfo.emailKey ? '***exists***' : 'MISSING',
    });

    // Call your centralized Vercel email service
    const apiRes = await fetch(EMAIL_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Origin': 'http://joetheguy.com',
        'x-client-key': companyInfo.emailKey, 
      },
      body: JSON.stringify(payload),
    });

    console.log('Email API response status:', apiRes.status);
    console.log('Email API response headers:', Object.fromEntries(apiRes.headers.entries()));

    const apiJson = await apiRes.json().catch(() => ({}));
    console.log('Email API response body:', apiJson);

    if (!apiRes.ok) {
      console.error('Email API error:', apiRes.status, apiJson);
      return new Response(
        JSON.stringify({ error: 'Failed to send booking email via email service' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('=== SEND-BOOKING SUCCESS ===');
    return new Response(
      JSON.stringify({ success: true }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in booking API route:', error);
    return new Response(
      JSON.stringify({
        error: 'Failed to send booking email',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
