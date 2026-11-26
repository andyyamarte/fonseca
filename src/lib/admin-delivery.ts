import { SITE_CONTACT } from "@/data/maritime-data";

export type DeliveryResult = {
  channels: ("email" | "phone" | "dev")[];
  devCode?: string;
};

function toE164(display: string): string {
  return `+${display.replace(/\D/g, "")}`;
}

async function sendEmail(code: string, to: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY!;
  const from = process.env.ADMIN_FROM_EMAIL!;

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: "Código de verificación - Acceso administrador",
      text: `Tu código de verificación es ${code}. Vence en 5 minutos. Si no solicitaste este acceso, ignora este correo.`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Email delivery failed (${response.status})`);
  }
}

async function sendSms(code: string, to: string): Promise<void> {
  const sid = process.env.TWILIO_ACCOUNT_SID!;
  const token = process.env.TWILIO_AUTH_TOKEN!;
  const from = process.env.TWILIO_FROM_NUMBER!;
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${sid}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: to,
        From: from,
        Body: `Marine Suppliers Chile: tu código de acceso es ${code}. Vence en 5 minutos.`,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(`SMS delivery failed (${response.status})`);
  }
}

/**
 * Envía el mismo código al correo corporativo y a los dos teléfonos publicados
 * en la página. Sin proveedores configurados solo está disponible en desarrollo,
 * donde el código se devuelve al cliente para poder probar el flujo.
 */
export async function sendAdminVerificationCode(
  code: string,
  email: string
): Promise<DeliveryResult> {
  const emailReady = Boolean(process.env.RESEND_API_KEY && process.env.ADMIN_FROM_EMAIL);
  const smsReady = Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_FROM_NUMBER
  );

  if (process.env.NODE_ENV === "production" && (!emailReady || !smsReady)) {
    throw new Error("Email and SMS providers must be configured in production");
  }

  if (emailReady) await sendEmail(code, email);

  if (smsReady) {
    await Promise.all(SITE_CONTACT.phones.map((phone) => sendSms(code, toE164(phone.display))));
  }

  if (!emailReady && !smsReady) {
    return { channels: ["dev"], devCode: code };
  }

  return {
    channels: [emailReady ? "email" : "dev", smsReady ? "phone" : "dev"].filter(
      (channel, index, all) => all.indexOf(channel) === index
    ) as DeliveryResult["channels"],
  };
}
