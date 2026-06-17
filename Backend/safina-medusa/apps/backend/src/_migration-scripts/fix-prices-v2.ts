import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function fix_v2_prices({
  container,
}: {
  container: MedusaContainer;
}) {
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const pricingModule = container.resolve(Modules.PRICING);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🛠️  Syncing database prices with 1:1 logic...");

  try {
    // Get all variants and their price sets
    const query = {
      entryPoint: "product_variant",
      fields: ["id", "title", "price_set.id", "price_set.prices.currency_code"],
    };

    const variants = await remoteQuery(query);

    for (const variant of variants) {
      const priceSetId = variant.price_set?.id;
      if (!priceSetId) {
        logger.warn(`⚠️ Variant ${variant.title} has NO price set. Cannot fix.`);
        continue;
      }

      const prices = variant.price_set.prices || [];
      const inrPrice = prices.find((p: any) => p.currency_code === "inr");

      if (inrPrice) {
        // If price exists but is less than ₹100, it's likely a test value
        if (Number(inrPrice.amount) < 100) {
           await pricingModule.updatePrices({
             id: inrPrice.id,
             amount: 10000 // Set to ₹10,000 as professional fallback
           });
           logger.info(`✅ Updated INR price for ${variant.title} to 10000`);
        }
      } else {
        // Create INR price
        await pricingModule.createPrices({
          price_set_id: priceSetId,
          currency_code: "inr",
          amount: 10000
        });
        logger.info(`➕ Created INR price for ${variant.title} as 10000`);
      }
    }
    logger.info("✨ Database price sync complete.");
  } catch (err) {
    logger.error(`❌ Sync failed: ${err.message}`);
  }
}
