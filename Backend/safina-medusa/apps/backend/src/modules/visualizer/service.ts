import { MedusaService } from "@medusajs/framework/utils"
import { VisualizerResult } from "./models/visualizer-result"

class VisualizerModuleService extends MedusaService({
  VisualizerResult,
}) {}

export default VisualizerModuleService
