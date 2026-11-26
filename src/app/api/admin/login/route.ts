import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  createSessionToken,
  getAdminCredentials,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; password?: string };
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";

    const valid = getAdminCredentials();
    if (email !== valid.email || password !== valid.password) {
      return NextResponse.json(
        { error: "Credenciales inválidas. Acceso restringido únicamente al Administrador." },
        { status: 401 }
      );
    }

    const token = createSessionToken(email);
    const response = NextResponse.json({
      authenticated: true,
      admin: { email, role: "admin" },
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Solicitud inválida." }, { status: 400 });
  }
}
