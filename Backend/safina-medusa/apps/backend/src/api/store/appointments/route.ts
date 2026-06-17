import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { APPOINTMENT_MODULE } from "../../../modules/appointment"

export const POST = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const appointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

  const body = req.body as {
    customer_name: string
    email: string
    phone: string
    date: string
    time: string
    notes?: string
  }

  const result = await appointmentModuleService.createAppointments({
    customer_name: body.customer_name,
    email: body.email,
    phone: body.phone,
    date: body.date,
    time: body.time,
    notes: body.notes,
    status: "Pending"
  })

  res.json({
    appointment: result,
  })
}
