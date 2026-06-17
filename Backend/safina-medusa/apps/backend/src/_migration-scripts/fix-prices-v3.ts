import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function fix_v2_prices_v3({
  container,
}: {
  container: MedusaContainer;
}) {
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const pricingModule = container.resolve(Modules.PRICING);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🛠️  Robust Sync of database prices...");

  try {
    const query = {
      entryPoint: "product_variant",
      fields: ["id", "title", "price_set.id", "price_set.prices.id", "price_set.prices.currency_code", "price_set.prices.amount"],
    };

    const variants = await remoteQuery(query);

    for (const variant of variants) {
      let priceSetId = variant.price_set?.id;
      
      if (!priceSetId) {
        logger.warn(`⚠️ Variant ${variant.title} has NO price set. Creating one...`);
        const priceSet = await pricingModule.createPriceSets({
          rules: [{ attribute: "region_id" }]
        });
        priceSetId = priceSet.id;
        
        // Link the price set to the variant using the Link Module
        // In v2, this is done via the remote link service
        const remoteLink = container.resolve(ContainerRegistrationKeys.REMOTE_LINK);
        await remoteLink.create({
          [Modules.PRODUCT]: {
            variant_id: variant.id,
          },
          [Modules.PRICING]: {
            price_set_id: priceSetId,
          },
        });
        logger.info(`✅ Linked new price set ${priceSetId} to variant ${variant.id}`);
      }

      const prices = variant.price_set?.prices || [];
      const inrPrice = prices.find((p: any) => p.currency_code === "inr");

      if (!inrPrice) {
        await (pricingModule as any).addPrices({
          price_set_id: priceSetId,
          prices: [{
            currency_code: "inr",
            amount: 10000,
            rules: {}
          }]
        });
        logger.info(`➕ Created INR price for ${variant.title}`);
      } else if (Number(inrPrice.amount) < 100) {
        await (pricingModule as any).updatePrices([{
          id: inrPrice.id,
          amount: 10000
        }]);
        logger.info(`✅ Updated low INR price for ${variant.title}`);
      }
    }
    logger.info("✨ Robust sync complete.");
  } catch (err) {
    logger.error(`❌ Sync failed: ${err.message}`);
    console.error(err);
  }
}
