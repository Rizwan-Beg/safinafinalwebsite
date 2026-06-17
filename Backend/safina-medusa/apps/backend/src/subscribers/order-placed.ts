import { SubscriberArgs, SubscriberConfig } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function orderPlacedHandler({
  event: { data },
  container,
}: SubscriberArgs<any>) {
  const orderModuleService = container.resolve(Modules.ORDER);
  const logger = container.resolve("logger");

  const order = await orderModuleService.retrieveOrder(data.id, {
    relations: ["items", "shipping_address"],
  });

  console.log("--------------------------------------------------");
  console.log("📧 TRANSACTIONAL EMAIL SIMULATION");
  console.log(`To: ${order.email}`);
  console.log(`Subject: Your Safina Heritage Masterpiece is Confirmed! (Order #${order.display_id})`);
  console.log("--------------------------------------------------");
  console.log(`Dear ${order.shipping_address?.first_name || "Valued Customer"},`);
  console.log("\nThank you for your purchase from Safina Carpets.");
  console.log(`We are preparing your selection:`);
  
  const items = (order as any).items || [];
  const total = (order as any).total || 0;
  
  // Brevo API call
  const brevoApiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "info@safinacarpets.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Safina Carpets";

  if (!brevoApiKey || brevoApiKey === "ENTER_YOUR_KEY_HERE") {
    logger.warn("⚠️ Brevo API key not configured. Skipping real email.");
    return;
  }

  const itemsHtml = items.map((item: any) => `
    <tr>
      <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.title}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: center;">${item.quantity}</td>
      <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">₹${(item.unit_price / 100).toLocaleString('en-IN')}</td>
    </tr>
  `).join('');

  const emailHtml = `
    <div style="font-family: 'Playfair Display', serif; max-width: 600px; margin: 0 auto; border: 1px solid #8b6d4b; padding: 40px; color: #1a1a1a;">
      <h1 style="color: #8b6d4b; text-align: center; text-transform: uppercase; letter-spacing: 4px;">Safina Carpets</h1>
      <p style="text-align: center; font-style: italic;">Heritage Masterpieces</p>
      <hr style="border: 0; border-top: 1px solid #8b6d4b; margin: 30px 0;">
      <h2>Order Confirmation</h2>
      <p>Dear ${order.shipping_address?.first_name || "Valued Customer"},</p>
      <p>Your order <strong>#${order.display_id}</strong> has been successfully placed. We are now preparing your heritage selection for shipment.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 30px 0;">
        <thead>
          <tr style="background-color: #f9f6f2;">
            <th style="padding: 10px; text-align: left;">Item</th>
            <th style="padding: 10px; text-align: center;">Qty</th>
            <th style="padding: 10px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsHtml}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="2" style="padding: 20px 10px 10px; text-align: right; font-weight: bold;">Total (Incl. GST)</td>
            <td style="padding: 20px 10px 10px; text-align: right; font-weight: bold; color: #8b6d4b;">₹${(total / 100).toLocaleString('en-IN')}</td>
          </tr>
        </tfoot>
      </table>

      <div style="background-color: #f9f6f2; padding: 20px; border-radius: 4px;">
        <h3 style="margin-top: 0; color: #8b6d4b;">Shipping Address</h3>
        <p style="margin-bottom: 0;">
          ${order.shipping_address?.address_1}<br>
          ${order.shipping_address?.city}, ${order.shipping_address?.province}<br>
          ${order.shipping_address?.postal_code}<br>
          India
        </p>
      </div>

      <p style="margin-top: 40px;">We will notify you once your carpet has been dispatched with tracking details.</p>
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
        to: [{ email: order.email, name: `${order.shipping_address?.first_name} ${order.shipping_address?.last_name}` }],
        subject: `Your Safina Heritage Masterpiece is Confirmed! (Order #${order.display_id})`,
        htmlContent: emailHtml
      })
    });

    if (response.ok) {
      logger.info(`✅ Real confirmation email sent via Brevo to ${order.email} for Order ${order.display_id}`);
    } else {
      const errData = await response.json();
      logger.error(`❌ Brevo Email failed: ${JSON.stringify(errData)}`);
    }
  } catch (err) {
    logger.error(`❌ Email dispatch error: ${err.message}`);
  }
}

export const config: SubscriberConfig = {
  event: "order.placed",
};
