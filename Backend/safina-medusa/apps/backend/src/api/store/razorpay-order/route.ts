import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import Razorpay from "razorpay";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  try {
    const { amount } = req.body as { amount: number };

    if (!amount) {
      return res.status(400).json({ error: "Amount is required" });
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
      amount: amount, // amount in the smallest currency unit
      currency: "INR",
      receipt: "receipt_" + Math.random().toString(36).substring(7),
    };

    const order = await razorpay.orders.create(options);
    
    res.json({ order_id: order.id });
  } catch (err: any) {
    console.error("Razorpay API Error:", err);
    res.status(500).json({ error: err.message || "Failed to create Razorpay order" });
  }
};
