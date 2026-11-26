import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "ms_admin_session";

// Default administrator credentials for local evaluation; override via environment variables in production.
const DEFAULT_ADMIN_EMAIL = "admin@marinesuppliers.cl";
const DEFAULT_ADMIN_PASSWORD = "MarineAdmin2026!";

function getSecret(): string {
  return process.env.ADMIN_SESSION_SECRET || "marine-suppliers-chile-admin-secret-key-2026";
}

export function getAdminCredentials() {
  return {
    email: (process.env.ADMIN_EMAIL || DEFAULT_ADMIN_EMAIL).trim().toLowerCase(),
    password: process.env.ADMIN_PASSWORD || DEFAULT_ADMIN_PASSWORD,
  };
}

export function createSessionToken(email: string): string {
  const payload = Buffer.from(
    JSON.stringify({
      email,
      role: "admin",
      exp: Date.now() + 1000 * 60 * 60 * 12, // 12 hours
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): { email: string; role: "admin" } | null {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");

  const sigBuf = Buffer.from(signature);
  const expectedBuf = Buffer.from(expectedSignature);
  if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email?: string;
      role?: string;
      exp?: number;
    };
    if (parsed.role !== "admin" || !parsed.email || !parsed.exp || parsed.exp < Date.now()) {
      return null;
    }
    return { email: parsed.email, role: "admin" };
  } catch {
    return null;
  }
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}
