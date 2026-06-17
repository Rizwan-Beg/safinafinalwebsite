import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { APPOINTMENT_MODULE } from "../../../modules/appointment"

export const GET = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const appointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)

  const results = await appointmentModuleService.listAppointments()

  res.json({
    appointments: results,
  })
}

export const PUT = async (
  req: MedusaRequest,
  res: MedusaResponse
) => {
  const appointmentModuleService = req.scope.resolve(APPOINTMENT_MODULE)
  const { id, status } = req.body as { id: string; status: string }

  const updated = await appointmentModuleService.updateAppointments({
    id,
    status,
  })

  res.json({ appointment: updated })
}
