import { MedusaContainer } from "@medusajs/framework";
import { Modules } from "@medusajs/framework/utils";

export default async function check_variant_prices({
  container,
}: {
  container: MedusaContainer;
}) {
  const productModule = container.resolve(Modules.PRODUCT);
  const pricingModule = container.resolve(Modules.PRICING);
  const regionModule = container.resolve(Modules.REGION);

  console.log("🔍 Auditing Variant Prices for India Region...");

  try {
    const products = await productModule.listProducts({}, { relations: ["variants"] });
    const [indiaRegion] = await regionModule.listRegions({ name: "India" });
    
    if (!indiaRegion) {
      console.error("❌ India region not found.");
      return;
    }

    console.log(`📍 India Region ID: ${indiaRegion.id}, Currency: ${indiaRegion.currency_code}`);

    for (const product of products) {
      console.log(`\n📦 Product: ${product.title}`);
      for (const variant of product.variants) {
        if (!variant.price_set_id) {
          console.log(`  ⚠️ Variant ${variant.title} has NO price_set_id`);
          continue;
        }

        const priceSets = await pricingModule.listPriceSets({
          id: variant.price_set_id
        }, { relations: ["prices"] });

        const priceSet = priceSets[0];
        const inrPrice = priceSet?.prices?.find(p => p.currency_code === "inr");

        if (inrPrice) {
          console.log(`  ✅ Variant ${variant.title}: ₹${inrPrice.amount} (ID: ${variant.id})`);
        } else {
          console.log(`  ❌ Variant ${variant.title}: MISSING INR PRICE (Price Set ID: ${variant.price_set_id})`);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Audit failed: ${error.message}`);
  }
}
