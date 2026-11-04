import { MedusaRequest, MedusaResponse } from "@medusajs/framework/http"
import { APPOINTMENT_MODULE } from "../../../modules/appointment"
import { sendAppointmentConfirmationEmail } from "../../../utils/brevo"

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
  const logger = req.scope.resolve("logger")
  const { id, status, meet_url } = req.body as { id: string; status: string; meet_url?: string }

  const updated = await appointmentModuleService.updateAppointments({
    id,
    status,
  })

  // When appointment is marked as Confirmed, trigger Brevo confirmation email
  if (status === "Confirmed") {
    try {
      const record = Array.isArray(updated) ? updated[0] : updated
      const appt = record?.email ? record : await appointmentModuleService.retrieveAppointment(id)

      if (appt && appt.email) {
        await sendAppointmentConfirmationEmail(
          {
            customer_name: appt.customer_name || "Valued Customer",
            email: appt.email,
            phone: appt.phone,
            date: appt.date,
            time: appt.time,
            notes: appt.notes,
            meet_url: meet_url,
          },
          logger
        )
      }
    } catch (err: any) {
      logger.error(`Failed to send appointment confirmation email: ${err.message}`)
    }
  }

  res.json({ appointment: updated })
}

