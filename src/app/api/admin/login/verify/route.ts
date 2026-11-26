import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
} from "@/lib/admin-auth";
import { verifyChallenge, type ChallengeResult } from "@/lib/admin-challenges";
import { checkRateLimit } from "@/lib/rate-limit";
import { apiMessage, languageFromHeaders } from "@/lib/language";

type VerifyBody = {
  challengeId?: string;
  code?: string;
};

const ERROR_KEY: Partial<Record<ChallengeResult, "adminCodeInvalid" | "adminCodeExpired" | "adminCodeTooMany">> = {
  invalid: "adminCodeInvalid",
  expired: "adminCodeExpired",
  too_many: "adminCodeTooMany",
  not_found: "adminCodeExpired",
};

export async function POST(request: Request) {
  const language = languageFromHeaders(request.headers);

  try {
    const body = (await request.json()) as VerifyBody;
    const challengeId = (body.challengeId || "").trim();
    const code = (body.code || "").trim();
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "local";

    const limit = checkRateLimit(`admin-code:${ip}`, 10, 15 * 60 * 1000);
    if (!limit.allowed) {
      return NextResponse.json(
        { error: apiMessage(language, "adminRateLimited"), retryAfter: limit.retryAfter },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfter) },
        }
      );
    }

    if (!challengeId || !/^\d{6}$/.test(code)) {
      return NextResponse.json(
        { error: apiMessage(language, "adminCodeInvalid") },
        { status: 400 }
      );
    }

    const { result, email } = verifyChallenge(challengeId, code);
    if (result !== "ok" || !email) {
      const key = ERROR_KEY[result] ?? "adminCodeInvalid";
      return NextResponse.json({ error: apiMessage(language, key) }, { status: 401 });
    }

    const token = createSessionToken(email);
    const response = NextResponse.json({
      authenticated: true,
      admin: { email, role: "admin" },
      expiresAt: Date.now() + SESSION_MAX_AGE_SECONDS * 1000,
    });

    response.cookies.set({
      name: ADMIN_COOKIE_NAME,
      value: token,
      httpOnly: true,
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: SESSION_MAX_AGE_SECONDS,
    });

    return response;
  } catch {
    return NextResponse.json({ error: apiMessage(language, "invalidRequest") }, { status: 400 });
  }
}
