import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function fix_v2_prices_final({
  container,
}: {
  container: MedusaContainer;
}) {
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const pricingModule = container.resolve(Modules.PRICING);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🛠️  Final Sync of database prices with 1:1 logic...");

  try {
    const query = {
      entryPoint: "product_variant",
      fields: ["id", "title", "price_set.id", "price_set.prices.currency_code"],
    };

    const variants = await remoteQuery(query);

    for (const variant of variants) {
      const priceSetId = variant.price_set?.id;
      if (!priceSetId) continue;

      const prices = variant.price_set.prices || [];
      const inrPrice = prices.find((p: any) => p.currency_code === "inr");

      if (!inrPrice) {
        // Use addPrices for v2
        await (pricingModule as any).addPrices({
          price_set_id: priceSetId,
          prices: [{
            currency_code: "inr",
            amount: 10000, // ₹10,000 professional fallback
            rules: {}
          }]
        });
        logger.info(`➕ Created INR price for ${variant.title}`);
      } else if (Number(inrPrice.amount) < 100) {
        // If price is too low, it's likely a test value that breaks logic
        await (pricingModule as any).updatePrices([{
          id: inrPrice.id,
          amount: 10000
        }]);
        logger.info(`✅ Updated low INR price for ${variant.title}`);
      }
    }
    logger.info("✨ Database price sync complete.");
  } catch (err) {
    logger.error(`❌ Sync failed: ${err.message}`);
  }
}
