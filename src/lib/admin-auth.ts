import crypto from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE_NAME = "ms_admin_session";
export const SESSION_MAX_AGE_SECONDS = 90 * 24 * 60 * 60; // 90 días
const TOKEN_VERSION = 3;

// Valores solo para desarrollo local. En producción son obligatorios.
const DEV_CONFIG = {
  email: "admin@marinesuppliers.cl",
  password: "MarineAdmin2026!",
  sessionSecret: "marine-suppliers-chile-admin-secret-key-2026",
};

export type AdminSession = {
  email: string;
  role: "admin";
  authenticatedAt: number;
  expiresAt: number;
};

function requiredEnv(name: string): string {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable ${name}`);
  }
  return value.trim();
}

function getAdminConfig() {
  const production = process.env.NODE_ENV === "production";
  return {
    email: (
      production
        ? requiredEnv("ADMIN_EMAIL")
        : process.env.ADMIN_EMAIL || DEV_CONFIG.email
    )
      .trim()
      .toLowerCase(),
    password: production
      ? requiredEnv("ADMIN_PASSWORD")
      : process.env.ADMIN_PASSWORD || DEV_CONFIG.password,
    sessionSecret: production
      ? requiredEnv("ADMIN_SESSION_SECRET")
      : process.env.ADMIN_SESSION_SECRET || DEV_CONFIG.sessionSecret,
  };
}

export function getCompanyEmailDomain(): string {
  return (process.env.ADMIN_EMAIL_DOMAIN || "marinesuppliers.cl").trim().toLowerCase();
}

function safeEqualStrings(a: string, b: string): boolean {
  const hashA = crypto.createHash("sha256").update(a).digest();
  const hashB = crypto.createHash("sha256").update(b).digest();
  return hashA.length === hashB.length && crypto.timingSafeEqual(hashA, hashB);
}

export function isCompanyEmail(email: string): boolean {
  const domain = getCompanyEmailDomain();
  return (
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) &&
    email.toLowerCase().endsWith(`@${domain}`)
  );
}

/** Primer factor: correo de la empresa y contraseña. */
export function validateAdminCredentials(email: string, password: string): boolean {
  const config = getAdminConfig();
  const normalized = email.trim().toLowerCase();
  if (!isCompanyEmail(normalized)) return false;
  if (!safeEqualStrings(normalized, config.email)) return false;
  return safeEqualStrings(password, config.password);
}

export function createSessionToken(email: string): string {
  const now = Date.now();
  const payload = Buffer.from(
    JSON.stringify({
      email,
      role: "admin",
      v: TOKEN_VERSION,
      iat: now,
      exp: now + SESSION_MAX_AGE_SECONDS * 1000,
    })
  ).toString("base64url");

  const signature = crypto
    .createHmac("sha256", getAdminConfig().sessionSecret)
    .update(payload)
    .digest("base64url");

  return `${payload}.${signature}`;
}

export function verifySessionToken(token: string | undefined): AdminSession | null {
  if (!token || !token.includes(".")) return null;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return null;

  const expectedSignature = crypto
    .createHmac("sha256", getAdminConfig().sessionSecret)
    .update(payload)
    .digest("base64url");

  const received = Buffer.from(signature);
  const expected = Buffer.from(expectedSignature);
  if (received.length !== expected.length || !crypto.timingSafeEqual(received, expected)) {
    return null;
  }

  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString("utf8")) as {
      email?: string;
      role?: string;
      v?: number;
      iat?: number;
      exp?: number;
    };

    if (
      parsed.v !== TOKEN_VERSION ||
      parsed.role !== "admin" ||
      !parsed.email ||
      !parsed.iat ||
      !parsed.exp ||
      parsed.exp <= Date.now()
    ) {
      return null;
    }

    return {
      email: parsed.email,
      role: "admin",
      authenticatedAt: parsed.iat,
      expiresAt: parsed.exp,
    };
  } catch {
    return null;
  }
}

export async function getCurrentAdmin(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  return verifySessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}
