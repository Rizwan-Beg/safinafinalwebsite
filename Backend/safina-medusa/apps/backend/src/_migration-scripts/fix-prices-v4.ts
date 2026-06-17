import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function fix_v2_prices_v4({
  container,
}: {
  container: MedusaContainer;
}) {
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const pricingModule = container.resolve(Modules.PRICING);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🛠️  Syncing prices for existing price sets...");

  try {
    const query = {
      entryPoint: "product_variant",
      fields: ["id", "title", "price_set.id"],
    };

    const variants = await remoteQuery(query);

    for (const variant of variants) {
      const priceSetId = variant.price_set?.id;
      
      if (!priceSetId) {
        logger.warn(`⚠️ Variant [${variant.title}] has NO price set. Please delete and recreate this product in Admin.`);
        continue;
      }

      // Check prices for this set
      const [priceSet] = await pricingModule.listPriceSets({ id: priceSetId }, { relations: ["prices"] });
      const inrPrice = priceSet?.prices?.find((p: any) => p.currency_code === "inr");

      if (!inrPrice) {
        await (pricingModule as any).addPrices({
          price_set_id: priceSetId,
          prices: [{
            currency_code: "inr",
            amount: 10000,
            rules: {}
          }]
        });
        logger.info(`➕ Created INR price for [${variant.title}]`);
      } else if (Number(inrPrice.amount) < 100) {
        await (pricingModule as any).updatePrices([{
          id: inrPrice.id,
          amount: 10000
        }]);
        logger.info(`✅ Updated low INR price for [${variant.title}]`);
      }
    }
    logger.info("✨ Price sync complete.");
  } catch (err) {
    logger.error(`❌ Sync failed: ${err.message}`);
  }
}
