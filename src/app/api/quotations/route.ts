import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { createQuotation, listQuotations } from "@/lib/quotations-store";

export async function GET() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: "Acceso denegado. Solo el Administrador puede consultar cotizaciones." },
      { status: 401 }
    );
  }
  const quotations = await listQuotations();
  return NextResponse.json({ quotations });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      vesselName?: string;
      port?: string;
      contactName?: string;
      email?: string;
      division?: string;
      items?: string[];
      message?: string;
      attachmentNames?: string[];
    };

    const email = (body.email || "").trim();
    const contactName = (body.contactName || "").trim();
    const message = (body.message || "").trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json(
        { error: "Por favor ingresa un correo electrónico válido." },
        { status: 400 }
      );
    }

    const record = await createQuotation({
      vesselName: (body.vesselName || "Vessel Inquiry").trim(),
      port: (body.port || "Chilean Port").trim(),
      contactName: contactName || "Chief Officer / Purchasing",
      email,
      division: (body.division || "GENERAL SHIP CHANDLING").trim(),
      items: Array.isArray(body.items) ? body.items : [],
      message: message || "General quotation request",
      attachmentNames: Array.isArray(body.attachmentNames) ? body.attachmentNames : [],
    });

    return NextResponse.json({ quotation: record }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "No se pudo procesar la cotización." }, { status: 400 });
  }
}
