import { model } from "@medusajs/framework/utils"

export const Appointment = model.define("appointment", {
  id: model.id().primaryKey(),
  customer_name: model.text(),
  email: model.text(),
  phone: model.text(),
  date: model.text(),
  time: model.text(),
  notes: model.text().nullable(),
  status: model.text().default("Pending"),
})
