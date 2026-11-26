import { NextResponse } from "next/server";
import { getCurrentAdmin } from "@/lib/admin-auth";
import {
  deleteQuotation,
  type QuotationStatus,
  updateQuotationStatus,
} from "@/lib/quotations-store";
import { apiMessage, languageFromHeaders } from "@/lib/language";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const language = languageFromHeaders(request.headers);
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: apiMessage(language, "adminOnly") },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const body = (await request.json()) as { status?: QuotationStatus };
  if (!body.status || !["pending", "quoted", "dispatched"].includes(body.status)) {
    return NextResponse.json({ error: apiMessage(language, "invalidStatus") }, { status: 400 });
  }

  const updated = await updateQuotationStatus(id, body.status);
  if (!updated) {
    return NextResponse.json({ error: apiMessage(language, "notFound") }, { status: 404 });
  }
  return NextResponse.json({ quotation: updated });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const language = languageFromHeaders(request.headers);
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json(
      { error: apiMessage(language, "adminOnly") },
      { status: 401 }
    );
  }

  const { id } = await context.params;
  const deleted = await deleteQuotation(id);
  if (!deleted) {
    return NextResponse.json({ error: apiMessage(language, "notFound") }, { status: 404 });
  }
  return NextResponse.json({ deleted: true });
}
