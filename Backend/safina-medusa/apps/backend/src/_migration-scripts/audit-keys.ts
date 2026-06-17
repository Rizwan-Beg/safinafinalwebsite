import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function audit_api_keys({
  container,
}: {
  container: MedusaContainer;
}) {
  const apiKeyModule = container.resolve(Modules.API_KEY);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);
  const remoteQuery = container.resolve(ContainerRegistrationKeys.REMOTE_QUERY);

  logger.info("🔍 Auditing Publishable API Keys and Sales Channels...");

  try {
    const query = {
      entryPoint: "publishable_api_key",
      fields: ["id", "title", "sales_channels.id", "sales_channels.name"],
    };

    const keys = await remoteQuery(query);

    for (const key of keys) {
      console.log(`\n🔑 Key: ${key.title} (${key.id})`);
      const channels = key.sales_channels || [];
      if (channels.length > 0) {
        channels.forEach((sc: any) => console.log(`  🔗 Linked to SC: ${sc.name} (${sc.id})`));
      } else {
        console.log("  ⚠️  NOT LINKED TO ANY SALES CHANNEL!");
      }
    }
  } catch (err) {
    logger.error(`❌ Audit failed: ${err.message}`);
  }
}
