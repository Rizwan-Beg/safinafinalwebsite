import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function debug_v2_data({
  container,
}: {
  container: MedusaContainer;
}) {
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🛠️  Debugging Medusa v2 Data Structure...");

  try {
    const query = {
      entryPoint: "product_variant",
      fields: ["id", "title", "price_set.id"],
    };

    const variants = await remoteQuery(query);
    console.log("📊 VARIANTS DATA:", JSON.stringify(variants, null, 2));

  } catch (err) {
    logger.error(`❌ Debug failed: ${err.message}`);
  }
}
