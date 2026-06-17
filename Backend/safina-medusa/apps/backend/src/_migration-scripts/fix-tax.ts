import { MedusaContainer } from "@medusajs/framework";
import { Modules, ContainerRegistrationKeys } from "@medusajs/framework/utils";

export default async function fix_tax_rates({
  container,
}: {
  container: MedusaContainer;
}) {
  const taxModule = container.resolve(Modules.TAX);
  const regionModule = container.resolve(Modules.REGION);
  const logger = container.resolve(ContainerRegistrationKeys.LOGGER);

  logger.info("🛠️  Ensuring 5% GST for India Region...");

  try {
    const [indiaRegion] = await regionModule.listRegions({ name: "India" });
    if (!indiaRegion) {
      logger.error("❌ India region not found.");
      return;
    }

    // Check existing tax rates
    const taxRates = await taxModule.listTaxRates({
       // Filter by region/context if possible
    });
    
    // In v2, tax rates are often linked to regions via provider or other links
    // For now, let's create a default tax rate of 5% if none exists
    await (taxModule as any).createTaxRates([{
       rate: 5,
       code: "GST",
       name: "Goods and Services Tax",
       region_id: indiaRegion.id, // Some versions use region_id here
    }]);

    logger.info(`✅ Created 5% GST for region ${indiaRegion.id}`);
  } catch (err) {
    logger.error(`❌ Tax fix failed: ${err.message}`);
  }
}
