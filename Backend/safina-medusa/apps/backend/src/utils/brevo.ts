export interface AppointmentEmailData {
  customer_name: string
  email: string
  phone?: string
  date: string
  time: string
  notes?: string
  meet_url?: string
}

export async function sendAppointmentConfirmationEmail(
  data: AppointmentEmailData,
  logger?: any
): Promise<boolean> {
  const brevoApiKey = process.env.BREVO_API_KEY
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "info@safinacarpets.com"
  const senderName = process.env.BREVO_SENDER_NAME || "Safina Carpets"

  if (!brevoApiKey || brevoApiKey === "ENTER_YOUR_KEY_HERE") {
    logger?.warn?.("⚠️ Brevo API key not configured. Skipping appointment confirmation email.")
    return false
  }

  const meetUrl = data.meet_url || "https://meet.google.com/saf-carp-cns"

  const htmlContent = `
    <div style="font-family: 'Playfair Display', Georgia, serif; max-width: 600px; margin: 0 auto; border: 1px solid #8b6d4b; padding: 40px; color: #1a1a1a; background-color: #ffffff;">
      <div style="text-align: center; margin-bottom: 24px;">
        <h1 style="color: #8b6d4b; margin: 0; font-size: 28px; text-transform: uppercase; letter-spacing: 4px;">Safina Carpets</h1>
        <p style="margin: 4px 0 0; font-style: italic; color: #666; font-size: 14px;">Heritage Masterpieces & Bespoke Rug Consultations</p>
      </div>
      <hr style="border: 0; border-top: 1px solid #8b6d4b; margin: 24px 0;">
      
      <h2 style="color: #2b2b2b; font-size: 20px; margin-bottom: 16px;">Appointment Confirmed</h2>
      <p style="font-size: 15px; line-height: 1.6; color: #444;">
        Dear <strong>${data.customer_name}</strong>,
      </p>
      <p style="font-size: 15px; line-height: 1.6; color: #444;">
        We are delighted to confirm your private consultation with our master rug curators. Your appointment details are outlined below:
      </p>
      
      <div style="background-color: #fbf9f6; border: 1px solid #e7dfd5; border-radius: 6px; padding: 20px; margin: 24px 0;">
        <p style="margin: 6px 0; font-size: 15px;"><strong>📅 Date:</strong> ${data.date}</p>
        <p style="margin: 6px 0; font-size: 15px;"><strong>⏰ Time:</strong> ${data.time}</p>
        ${data.phone ? `<p style="margin: 6px 0; font-size: 15px;"><strong>📞 Contact:</strong> ${data.phone}</p>` : ""}
        ${data.notes ? `<p style="margin: 6px 0; font-size: 15px;"><strong>📝 Notes:</strong> ${data.notes}</p>` : ""}
        <p style="margin: 16px 0 6px 0; font-size: 15px;"><strong>🌐 Video Meeting Link:</strong></p>
        <p style="margin: 0;">
          <a href="${meetUrl}" target="_blank" style="display: inline-block; background-color: #8b6d4b; color: #ffffff; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-weight: bold; font-size: 14px;">
            Join Video Consultation
          </a>
        </p>
        <p style="margin: 8px 0 0 0; font-size: 12px; color: #777;">Direct URL: <a href="${meetUrl}" style="color: #8b6d4b;">${meetUrl}</a></p>
      </div>

      <p style="font-size: 14px; line-height: 1.6; color: #555;">
        If you need to reschedule or have any specific questions about our collection ahead of the session, please reply directly to this email or reach us at <a href="mailto:${senderEmail}" style="color: #8b6d4b;">${senderEmail}</a>.
      </p>

      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e7dfd5; text-align: center; font-size: 12px; color: #888;">
        <p style="margin: 0;">Safina Carpets | Handcrafted Excellence</p>
        <p style="margin: 4px 0 0;">Preserving centuries of artistry in every weave.</p>
      </div>
    </div>
  `

  try {
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "api-key": brevoApiKey,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: senderName, email: senderEmail },
        to: [{ email: data.email, name: data.customer_name }],
        subject: `Your Consultation is Confirmed - Safina Carpets (${data.date} at ${data.time})`,
        htmlContent,
      }),
    })

    if (response.ok) {
      logger?.info?.(`✅ Appointment confirmation email sent to ${data.email}`)
      return true
    } else {
      const errData = await response.json()
      logger?.error?.(`❌ Brevo Appointment Email failed: ${JSON.stringify(errData)}`)
      return false
    }
  } catch (err: any) {
    logger?.error?.(`❌ Appointment email dispatch error: ${err.message}`)
    return false
  }
}
