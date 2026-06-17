import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { VISUALIZER_MODULE } from "../../../modules/visualizer"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const visualizerModuleService = req.scope.resolve(VISUALIZER_MODULE)

  const results = await visualizerModuleService.listVisualizerResults()

  res.json({
    visualizer_results: results,
  })
}
