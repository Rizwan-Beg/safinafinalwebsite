import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function customerCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const customerModuleService = container.resolve(Modules.CUSTOMER);
  const logger = container.resolve("logger");

  // Fetch customer details
  const customer = await customerModuleService.retrieveCustomer(data.id);

  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "info@safinacarpets.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Safina Carpets";

  if (!brevoApiKey || brevoApiKey === "ENTER_YOUR_KEY_HERE") {
    logger.warn("⚠️ Brevo API key not configured. Skipping welcome email.");
    return;
  }

  const emailHtml = `
    <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; border: 1px solid #8b6d4b; padding: 40px; color: #1a1a1a;">
      <h1 style="color: #8b6d4b; text-align: center; text-transform: uppercase; letter-spacing: 4px;">Safina Carpets</h1>
      <p style="text-align: center; font-style: italic;">Heritage Masterpieces</p>
      <hr style="border: 0; border-top: 1px solid #8b6d4b; margin: 30px 0;">
      <h2 style="text-align: center;">Welcome to Safina Carpets</h2>
      <p>Dear ${customer.first_name || "Valued Customer"},</p>
      <p>Welcome to the world of Safina Carpets! We are delighted to have you as part of our community of heritage and luxury carpet enthusiasts.</p>
      
      <p>At Safina, every carpet tells a story of tradition, craftsmanship, and timeless elegance. As a registered member, you can now:</p>
      <ul style="line-height: 1.8;">
        <li>Track your heritage selections and orders.</li>
        <li>Save your favorite masterpieces to your wishlist.</li>
        <li>Receive exclusive early access to our new collections.</li>
      </ul>

      <div style="background-color: #f9f6f2; padding: 25px; border-radius: 4px; border-left: 4px solid #8b6d4b; margin: 30px 0; text-align: center;">
        <h3 style="margin-top: 0; color: #8b6d4b;">Explore Our Collection</h3>
        <p>Discover the perfect piece for your space.</p>
        <a href="http://localhost:3000/catalog" style="display: inline-block; background-color: #8b6d4b; color: white; padding: 12px 30px; text-decoration: none; text-transform: uppercase; letter-spacing: 2px; font-size: 14px; margin-top: 10px;">Shop Now</a>
      </div>

      <p style="margin-top: 40px;">If you have any questions or need assistance with your selection, our team is here to help.</p>
      <p>Best regards,<br><strong>The Safina Team</strong></p>
    </div>
  `;

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: customer.email, name: `${customer.first_name} ${customer.last_name}` }],
        subject: `Welcome to Safina Carpets - Your Heritage Journey Begins`,
        htmlContent: emailHtml
      })
    });

    if (response.ok) {
      logger.info(`✅ Welcome email sent via Brevo to ${customer.email}`);
    } else {
      const errData = await response.json();
      logger.error(`❌ Brevo Welcome Email failed: ${JSON.stringify(errData)}`);
    }
  } catch (err) {
    logger.error(`❌ Welcome email dispatch error: ${err.message}`);
  }
}

export const config: SubscriberConfig = {
  event: "customer.created",
};
