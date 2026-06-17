import { model } from "@medusajs/framework/utils"

export const VisualizerResult = model.define("visualizer_result", {
  id: model.id().primaryKey(),
  customer_id: model.text(),
  customer_name: model.text(),
  image_url: model.text(),
})
