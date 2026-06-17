import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function fix_v2_prices_v6({
  container,
}: {
  container: MedusaContainer;
}) {
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const pricingModule = container.resolve(Modules.PRICING);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🛠️  Syncing prices for existing price sets (v6)...");

  try {
    const query = {
      entryPoint: "product_variant",
      fields: ["id", "title", "price_set.id"],
    };

    const variants = await remoteQuery(query);

    for (const variant of variants) {
      const psetId = variant.price_set?.id;
      
      if (!psetId) {
        logger.warn(`⚠️ Variant [${variant.title}] has NO price set. Skipping.`);
        continue;
      }

      // v2 syntax for adding prices
      try {
        await (pricingModule as any).addPrices({
          price_set_id: psetId,
          prices: [{
            currency_code: "inr",
            amount: 10000,
            rules: {}
          }]
        });
        logger.info(`➕ Created INR price for [${variant.title}]`);
      } catch (addErr) {
        // If it already exists, update it
        if (addErr.message.includes("already exists") || addErr.message.includes("Duplicate")) {
           // We need the price ID to update. Let's find it.
           const [priceSet] = await pricingModule.listPriceSets({ id: [psetId] }, { relations: ["prices"] });
           const inrPrice = priceSet?.prices?.find((p: any) => p.currency_code === "inr");
           if (inrPrice) {
              await (pricingModule as any).updatePrices([{
                id: inrPrice.id,
                amount: 10000
              }]);
              logger.info(`✅ Updated INR price for [${variant.title}]`);
           }
        } else {
           logger.error(`❌ Error for [${variant.title}]: ${addErr.message}`);
        }
      }
    }
    logger.info("✨ Price sync complete.");
  } catch (err) {
    logger.error(`❌ Global sync failed: ${err.message}`);
  }
}
