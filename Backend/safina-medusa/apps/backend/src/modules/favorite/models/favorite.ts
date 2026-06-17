import { model } from "@medusajs/framework/utils"

export const Favorite = model.define("favorite", {
  id: model.id().primaryKey(),
  customer_id: model.text(),
  customer_name: model.text().nullable(),
  customer_email: model.text().nullable(),
  product_id: model.text(),
  product_handle: model.text(),
  product_title: model.text(),
  product_thumbnail: model.text().nullable(),
})
