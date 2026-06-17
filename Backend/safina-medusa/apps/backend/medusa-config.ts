import { loadEnv, defineConfig } from '@medusajs/framework/utils'

loadEnv(process.env.NODE_ENV || 'development', process.cwd())

module.exports = defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    }
  },
  admin: {
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
    backendUrl: process.env.MEDUSA_BACKEND_URL,
    outDir: ".medusa/server/public/admin",
  },
  modules: [
    {
      resolve: "./src/modules/chatbot",
    },
    {
      resolve: "./src/modules/visualizer",
    },
    {
      resolve: "./src/modules/appointment",
    },
    {
      resolve: "./src/modules/announcement",
    },
    {
      resolve: "./src/modules/favorite",
    }
  ]
})
