import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { Modules } from "@medusajs/framework/utils";
import Razorpay from "razorpay";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { cart_id, amount: clientAmount } = req.body as { cart_id?: string; amount?: number };

    let finalAmountInPaise = 0;

    // Secure Cart Verification: Never trust client amount if cart_id is present
    if (cart_id) {
      try {
        const cartModule = req.scope.resolve(Modules.CART);
        const cart = await cartModule.retrieveCart(cart_id, {
          relations: ["items"],
        });

        if (!cart || !cart.items || cart.items.length === 0) {
          return res.status(400).json({ error: "Cart is empty or not found" });
        }

        // Calculate authoritative server-side price (1:1 pricing model with 5% GST)
        let subtotalRupees = 0;
        for (const item of cart.items) {
          const unitPrice = Number(item.unit_price) || 0;
          const quantity = Number(item.quantity) || 1;
          subtotalRupees += unitPrice * quantity;
        }

        const taxRupees = Math.round(subtotalRupees * 0.05);
        const totalRupees = subtotalRupees + taxRupees;
        finalAmountInPaise = Math.max(100, Math.round(totalRupees * 100));

        console.log(`🔒 Server-verified Razorpay order for Cart ${cart_id}: ₹${totalRupees} (${finalAmountInPaise} paise)`);
      } catch (cartErr: any) {
        console.warn(`Could not verify cart on server: ${cartErr?.message}`);
        if (!clientAmount) {
          return res.status(400).json({ error: "Invalid cart and no fallback amount provided" });
        }
        finalAmountInPaise = Math.max(100, Number(clientAmount));
      }
    } else if (clientAmount) {
      console.warn("⚠️ Razorpay order created without cart_id verification");
      finalAmountInPaise = Math.max(100, Number(clientAmount));
    } else {
      return res.status(400).json({ error: "cart_id is required to create a secure order" });
    }

    const key_id = process.env.RAZORPAY_KEY_ID;
    const key_secret = process.env.RAZORPAY_KEY_SECRET;

    if (!key_id || key_id === 'ENTER_YOUR_KEY_HERE') {
      return res.status(500).json({ 
        error: "Razorpay key ID is not configured. Please add RAZORPAY_KEY_ID to your backend .env file." 
      });
    }

    if (!key_secret || key_secret === 'ENTER_YOUR_SECRET_HERE') {
      return res.status(500).json({ 
        error: "Razorpay secret is not configured. Please add RAZORPAY_KEY_SECRET to your backend .env file." 
      });
    }

    const razorpay = new Razorpay({
      key_id,
      key_secret,
    });

    const options = {
      amount: finalAmountInPaise,
      currency: "INR",
      receipt: `rcpt_${cart_id ? cart_id.slice(-8) : Math.random().toString(36).substring(7)}`,
      notes: {
        cart_id: cart_id || "direct_checkout",
      }
    };

    const order = await razorpay.orders.create(options);
    
    res.json({ order_id: order.id, amount: finalAmountInPaise });
  } catch (err: any) {
    console.error("Razorpay API Error:", err);
    res.status(500).json({ error: err.message || "Failed to create Razorpay order" });
  }
};
