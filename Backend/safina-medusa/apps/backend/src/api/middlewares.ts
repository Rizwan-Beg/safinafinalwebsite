import { defineMiddlewares } from "@medusajs/framework/http"
import cors from "cors"

const storeCorsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  credentials: true,
}

export default defineMiddlewares({
  routes: [
    {
      matcher: "/store/chat*",
      middlewares: [cors(storeCorsOptions)],
    },
    {
      matcher: "/admin*",
      middlewares: [cors({ origin: "http://localhost:9000", credentials: true })],
    },
  ],
})
