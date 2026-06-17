import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { createOrderWorkflow } from "@medusajs/medusa/core-flows";
import { Modules } from "@medusajs/framework/utils";
import crypto from "crypto";

export const POST = async (req: MedusaRequest, res: MedusaResponse) => {
  const {
    cart_id,
    razorpay_payment_id,
    razorpay_order_id,
    razorpay_signature,
    shipping_address: bodyShippingAddress,
  } = req.body as {
    cart_id: string;
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature?: string;
    shipping_address?: any;
  };

  console.log("📦 razorpay-verify called:", { cart_id, razorpay_payment_id, razorpay_order_id });

  if (!cart_id) {
    return res.status(400).json({ error: "cart_id is required" });
  }

  // Step 1: Verify Razorpay payment signature (security check)
  const key_secret = process.env.RAZORPAY_KEY_SECRET;
  if (key_secret && key_secret !== "ENTER_YOUR_SECRET_HERE" && razorpay_signature) {
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body)
      .digest("hex");

    if (expectedSignature !== razorpay_signature) {
      console.error("❌ Razorpay signature mismatch! Possible fraud attempt.");
      return res.status(400).json({ error: "Payment signature verification failed" });
    }
    console.log("✅ Razorpay signature verified");
  }

  try {
    // Step 2: Retrieve the cart with all necessary data
    const cartModule = req.scope.resolve(Modules.CART);
    const cart = await cartModule.retrieveCart(cart_id, {
      relations: ["items", "shipping_address", "billing_address"],
    });

    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    console.log("🛒 Cart retrieved:", {
      id: cart.id,
      customer_id: cart.customer_id,
      email: cart.email,
      currency_code: cart.currency_code,
      itemCount: cart.items?.length ?? 0,
    });

    if (!cart.items || cart.items.length === 0) {
      return res.status(400).json({ error: "Cart is empty — cannot create an order" });
    }

    // Step 3: Resolve customer_id from auth context or token if cart doesn't have one
    let customerId = cart.customer_id;
    
    // Check Medusa v2 auth context first
    if (!customerId && (req as any).auth_context?.actor_id) {
      customerId = (req as any).auth_context.actor_id;
      console.log("👤 Resolved customer_id from auth_context:", customerId);
    }

    if (!customerId) {
      const authHeader = req.headers["authorization"] as string;
      if (authHeader?.startsWith("Bearer ")) {
        try {
          const token = authHeader.replace("Bearer ", "");
          const parts = token.split(".");
          if (parts.length === 3) {
            const payload = JSON.parse(Buffer.from(parts[1], "base64url").toString());
            // Medusa v2 often uses actor_id or sub
            customerId = payload.actor_id || payload.sub;
            if (customerId) {
              console.log("👤 Resolved customer_id from token payload:", customerId);
            }
          }
        } catch (tokenErr) {
          console.warn("Could not resolve customer from token:", tokenErr);
        }
      }
    }

    // Ensure we have an email and it's the customer's email if possible
    let email = cart.email;
    if (customerId) {
      try {
        const customerModule = req.scope.resolve(Modules.CUSTOMER);
        const customer = await customerModule.retrieveCustomer(customerId);
        if (customer?.email) {
          email = customer.email;
          console.log("📧 Using customer email:", email);
        }
      } catch (err) {
        console.warn("Could not retrieve customer email:", err);
      }
    }

    if (!email || email.includes("guest") || email === "guest@safinacarpets.com") {
      // Fallback to cart email or a generic one if absolutely necessary
      email = cart.email || "customer@safinacarpets.com";
    }

    // Currency correction: If region is India, ensure currency is INR
    let currencyCode = cart.currency_code || "inr";
    if (cart.region_id === "reg_01KRQKQ7G3BFCGV3NT7HT91ZJA") {
      currencyCode = "inr";
      console.log("🇮🇳 Forcing INR currency for India region");
    }

    // Step 4: Build order items from cart items
    const items = cart.items.map((item: any) => {
      let unitPrice = Number(item.unit_price) || 0;
      
      // USER REQUEST: 1:1 Pricing. 
      // If user entered 10000 in Admin, item.unit_price is 10000.
      // To make the ORDER in Medusa Admin show ₹10000, we must store it as 1000000 Paise.
      const professionalUnitPrice = unitPrice * 100;

      return {
        title: item.title || "Safina Carpet",
        subtitle: item.subtitle ?? undefined,
        thumbnail: item.thumbnail ?? undefined,
        variant_id: item.variant_id ?? undefined,
        product_id: item.product_id ?? undefined,
        product_title: item.product_title ?? undefined,
        product_handle: item.product_handle ?? undefined,
        variant_sku: item.variant_sku ?? undefined,
        variant_title: item.variant_title ?? undefined,
        quantity: Number(item.quantity) || 1,
        unit_price: professionalUnitPrice,
        metadata: item.metadata ?? {},
      };
    });

    // Step 5: Build shipping address from request, cart, or use defaults
    const addr = bodyShippingAddress || cart.shipping_address || {};
    const shippingAddress = {
      address_1: addr.address_1 || "Not provided",
      address_2: addr.address_2 || undefined,
      city: addr.city || "Not provided",
      province: addr.province || undefined, // Store state in province
      postal_code: addr.postal_code || "000000",
      country_code: (addr.country_code || "in").toLowerCase(),
      phone: addr.phone || undefined,
      first_name: addr.first_name || (customerId ? (await (req.scope.resolve(Modules.CUSTOMER)).retrieveCustomer(customerId)).first_name : "Customer"),
      last_name: addr.last_name || (customerId ? (await (req.scope.resolve(Modules.CUSTOMER)).retrieveCustomer(customerId)).last_name : "Guest"),
    };

    console.log("📝 Building order with:", {
      email,
      customerId,
      currencyCode,
      itemCount: items.length,
      region_id: cart.region_id
    });

    // Step 6: Run the official Medusa createOrderWorkflow
    const { result } = await createOrderWorkflow(req.scope).run({
      input: {
        region_id: cart.region_id ?? undefined,
        customer_id: customerId ?? undefined,
        sales_channel_id: cart.sales_channel_id ?? undefined,
        email: email,
        currency_code: currencyCode,
        items,
        shipping_address: shippingAddress,
        billing_address: shippingAddress,
        metadata: {
          razorpay_payment_id,
          razorpay_order_id,
          razorpay_signature,
          cart_id,
          payment_status: "captured",
          source: "razorpay_custom_flow"
        },
      },
    });

    const order = result as any;
    console.log(`✅ Order created! ID: ${order?.id}, Display: #${order?.display_id}`);

    // Step 7: Delete the cart so it's no longer active
    try {
      await cartModule.deleteCarts([cart_id]);
      console.log(`🗑️ Cart ${cart_id} deleted successfully`);
    } catch (cartDeleteErr) {
      console.warn(`⚠️ Could not delete cart ${cart_id}:`, cartDeleteErr);
    }

    return res.json({
      success: true,
      order_id: order?.id,
      display_id: order?.display_id,
    });
  } catch (error: any) {
    console.error("❌ createOrderWorkflow failed:", error?.message);
    return res.status(500).json({
      error: error?.message || "Failed to create order",
    });
  }
};
