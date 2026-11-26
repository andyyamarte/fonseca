import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin-auth";
import { createQuotation, listQuotations } from "@/lib/quotations-store";
import { apiMessage, languageFromHeaders } from "@/lib/language";

export async function GET(request: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: apiMessage(languageFromHeaders(request.headers), "adminDenied") },
      { status: 401 }
    );
  }
  const quotations = await listQuotations();
  return NextResponse.json({ quotations });
}

export async function POST(request: Request) {
  const language = languageFromHeaders(request.headers);
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
        { error: apiMessage(language, "invalidEmail") },
        { status: 400 }
      );
    }

    const record = await createQuotation({
      vesselName: (body.vesselName || apiMessage(language, "vesselInquiry")).trim(),
      port: (body.port || apiMessage(language, "chileanPort")).trim(),
      contactName: contactName || apiMessage(language, "chiefOfficer"),
      email,
      division: (body.division || apiMessage(language, "generalShipChandling")).trim(),
      items: Array.isArray(body.items) ? body.items : [],
      message: message || apiMessage(language, "generalRequest"),
      attachmentNames: Array.isArray(body.attachmentNames) ? body.attachmentNames : [],
    });

    return NextResponse.json({ quotation: record }, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: apiMessage(language, "quotationError") },
      { status: 400 }
    );
  }
}
