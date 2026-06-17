import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function shipmentCreatedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const orderModuleService = container.resolve(Modules.ORDER);
  const logger = container.resolve("logger");

  // Fetch order details
  // data contains shipment_id and order_id in Medusa v2
  const orderId = data.order_id;
  const order = await orderModuleService.retrieveOrder(orderId, {
    relations: ["shipping_address"],
  });

  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "info@safinacarpets.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Safina Carpets";

  if (!brevoApiKey || brevoApiKey === "ENTER_YOUR_KEY_HERE") {
    logger.warn("⚠️ Brevo API key not configured. Skipping shipping email.");
    return;
  }

  const emailHtml = `
    <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; border: 1px solid #8b6d4b; padding: 40px; color: #1a1a1a;">
      <h1 style="color: #8b6d4b; text-align: center; text-transform: uppercase; letter-spacing: 4px;">Safina Carpets</h1>
      <p style="text-align: center; font-style: italic;">Heritage Masterpieces</p>
      <hr style="border: 0; border-top: 1px solid #8b6d4b; margin: 30px 0;">
      <h2>Your Masterpiece is on its Way!</h2>
      <p>Dear ${order.shipping_address?.first_name || "Valued Customer"},</p>
      <p>Exciting news! Your heritage selection from Order <strong>#${order.display_id}</strong> has been dispatched and is now in transit to your address.</p>
      
      <div style="background-color: #f9f6f2; padding: 25px; border-radius: 4px; border-left: 4px solid #8b6d4b; margin: 30px 0;">
        <h3 style="margin-top: 0; color: #8b6d4b;">Shipment Details</h3>
        <p><strong>Tracking Number:</strong> ${data.tracking_number || "Available in profile"}</p>
        <p><strong>Shipping Carrier:</strong> Standard Heritage Delivery</p>
      </div>

      <p>You can track the progress of your delivery by logging into your Safina profile.</p>
      
      <p style="margin-top: 40px;">We hope this piece brings timeless elegance to your space.</p>
      <p>Best regards,<br><strong>The Safina Team</strong></p>
    </div>
  `;

  try {
    await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: order.email, name: `${order.shipping_address?.first_name} ${order.shipping_address?.last_name}` }],
        subject: `Your Safina Masterpiece is Dispatched! (Order #${order.display_id})`,
        htmlContent: emailHtml
      })
    });
    logger.info(`✅ Shipment notification sent via Brevo to ${order.email}`);
  } catch (err) {
    logger.error(`❌ Shipment email failed: ${err.message}`);
  }
}

export const config: SubscriberConfig = {
  event: "order.shipment_created",
};
