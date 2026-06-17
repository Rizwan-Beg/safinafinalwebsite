import VisualizerModuleService from "./service"
import { Module } from "@medusajs/framework/utils"

export const VISUALIZER_MODULE = "visualizer"

export default Module(VISUALIZER_MODULE, {
  service: VisualizerModuleService,
})
