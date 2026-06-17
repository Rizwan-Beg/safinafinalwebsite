import Medusa from "@medusajs/medusa-js";

// Initialize the Medusa client, pointing it to the default backend port (9000).
// In production, this would point to the deployed Medusa server URL.
export const medusaClient = new Medusa({
  baseUrl: process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL || "http://localhost:9000",
  maxRetries: 3,
  publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || "",
});
