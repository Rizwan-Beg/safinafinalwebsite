import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function audit_v2_prices({
  container,
}: {
  container: MedusaContainer;
}) {
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🔍 Auditing Medusa v2 Prices via Remote Query...");

  const query = {
    product_variant: {
      fields: ["id", "title"],
      product: {
        fields: ["title"]
      },
      price_set: {
        prices: {
          fields: ["amount", "currency_code"]
        }
      }
    }
  };

  try {
    const variants = await remoteQuery(query);

    for (const variant of variants) {
      const productName = variant.product?.title || "Unknown Product";
      const variantName = variant.title;
      const prices = variant.price_set?.prices || [];
      const inrPrice = prices.find((p: any) => p.currency_code === "inr");

      if (inrPrice) {
        console.log(`✅ [${productName}] ${variantName}: ₹${inrPrice.amount}`);
      } else {
        console.log(`❌ [${productName}] ${variantName}: MISSING INR PRICE`);
      }
    }
  } catch (err) {
    logger.error(`❌ Audit failed: ${err.message}`);
  }
}
