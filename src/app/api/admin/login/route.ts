import { NextResponse } from "next/server";
import { validateAdminCredentials } from "@/lib/admin-auth";
import { createChallenge } from "@/lib/admin-challenges";
import { sendAdminVerificationCode } from "@/lib/admin-delivery";
import { checkRateLimit } from "@/lib/rate-limit";
import { apiMessage, languageFromHeaders } from "@/lib/language";

type LoginBody = {
  email?: string;
  password?: string;
};

export async function POST(request: Request) {
  const language = languageFromHeaders(request.headers);

  try {
    const body = (await request.json()) as LoginBody;
    const email = (body.email || "").trim().toLowerCase();
    const password = body.password || "";
    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-real-ip") ||
      "local";

    const limit = checkRateLimit(`admin-login:${ip}:${email}`);
    if (!limit.allowed) {
      return NextResponse.json(
        {
          error: apiMessage(language, "adminRateLimited"),
          retryAfter: limit.retryAfter,
        },
        {
          status: 429,
          headers: { "Retry-After": String(limit.retryAfter) },
        }
      );
    }

    if (!validateAdminCredentials(email, password)) {
      return NextResponse.json(
        { error: apiMessage(language, "adminInvalid") },
        { status: 401 }
      );
    }

    const challenge = createChallenge(email);
    try {
      const delivery = await sendAdminVerificationCode(challenge.code, email);
      return NextResponse.json({
        challengeId: challenge.id,
        expiresAt: challenge.expiresAt,
        channels: delivery.channels,
        devCode: delivery.devCode,
      });
    } catch {
      return NextResponse.json(
        { error: apiMessage(language, "adminDeliveryFailed") },
        { status: 503 }
      );
    }
  } catch {
    return NextResponse.json({ error: apiMessage(language, "invalidRequest") }, { status: 400 });
  }
}
