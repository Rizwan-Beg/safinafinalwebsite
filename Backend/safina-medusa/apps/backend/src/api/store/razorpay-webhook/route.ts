import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createOrderWorkflow } from "@medusajs/medusa/core-flows";
import { Modules } from "@medusajs/framework/utils";
import crypto from "crypto";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
  const signature = req.headers["x-razorpay-signature"] as string;

  console.log("🔔 Razorpay Webhook Received");

  // Step 1: Verify Webhook Signature
  if (webhookSecret && webhookSecret !== "ENTER_YOUR_SECRET_HERE") {
    const expectedSignature = crypto
      .createHmac("sha256", webhookSecret)
      .update(JSON.stringify(req.body))
      .digest("hex");

    if (expectedSignature !== signature) {
      console.error("❌ Invalid Webhook Signature");
      return res.status(400).send("Invalid signature");
    }
  }

  const { event, payload } = req.body as any;

  // Handle successful payment
  if (event === "payment.captured") {
    const payment = payload.payment.entity;
    const cart_id = payment.notes?.cart_id;
    const razorpay_payment_id = payment.id;
    const razorpay_order_id = payment.order_id;

    if (!cart_id) {
      console.log("ℹ️ No cart_id in webhook notes, skipping auto-order creation.");
      return res.status(200).send("No cart_id found");
    }

    try {
      const cartModule = req.scope.resolve(Modules.CART);
      const orderModule = req.scope.resolve(Modules.ORDER);

      // Check if order already exists for this cart to prevent duplicates
      const existingOrders = await orderModule.listOrders({});
      const duplicateOrder = existingOrders.find(o => (o.metadata as any)?.cart_id === cart_id);

      if (duplicateOrder) {
        console.log(`ℹ️ Order already exists for cart ${cart_id}, skipping.`);
        return res.status(200).send("Order already exists");
      }

      // Retrieve cart data
      const cart = await cartModule.retrieveCart(cart_id, {
        relations: ["items", "shipping_address", "billing_address"],
      });

      if (!cart || !cart.items?.length) {
        return res.status(200).send("Cart empty or not found");
      }

      // Build Order Items (1:1 Pricing)
      const items = cart.items.map((item: any) => ({
        title: item.title,
        quantity: item.quantity,
        unit_price: Number(item.unit_price) * 100, // Convert to Paise for Medusa internal
        thumbnail: item.thumbnail,
        variant_id: item.variant_id,
      }));

      // Resolve Email & Customer
      const email = cart.email || payment.email || "customer@safinacarpets.com";
      const customerId = cart.customer_id;

      // Currency logic
      let currencyCode = cart.currency_code || "inr";
      if (cart.region_id === "reg_01KRQKQ7G3BFCGV3NT7HT91ZJA") {
        currencyCode = "inr";
      }

      // Create Order
      const { result: order } = await createOrderWorkflow(req.scope).run({
        input: {
          region_id: cart.region_id,
          customer_id: customerId,
          email: email,
          currency_code: currencyCode,
          items,
          shipping_address: cart.shipping_address,
          billing_address: cart.shipping_address,
          metadata: {
            razorpay_payment_id,
            razorpay_order_id,
            cart_id,
            source: "razorpay_webhook",
            payment_status: "captured"
          },
        },
      });

      console.log(`✅ Webhook created order: ${(order as any).display_id}`);
      
      // Cleanup Cart
      await cartModule.deleteCarts([cart_id]);

    } catch (err) {
      console.error("❌ Webhook processing error:", err);
      // Still return 200 to Razorpay to stop retries, but log the error
    }
  }

  res.status(200).send("OK");
};
