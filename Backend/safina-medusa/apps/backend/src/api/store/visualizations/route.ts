import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { VISUALIZER_MODULE } from "../../../modules/visualizer"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const visualizerModuleService = req.scope.resolve(VISUALIZER_MODULE)

  const body = req.body as {
    customer_id: string
    customer_name: string
    image_url: string
  }

  const result = await visualizerModuleService.createVisualizerResults({
    customer_id: body.customer_id,
    customer_name: body.customer_name,
    image_url: body.image_url,
  })

  res.json({
    visualizer_result: result,
  })
}

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const visualizerModuleService = req.scope.resolve(VISUALIZER_MODULE)
  const customerId = req.query.customer_id as string

  const filters: any = {}
  if (customerId) {
    filters.customer_id = customerId
  }

  const results = await visualizerModuleService.listVisualizerResults(filters)

  res.json({
    visualizations: results,
  })
}

