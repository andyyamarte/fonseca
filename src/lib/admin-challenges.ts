import crypto from "crypto";

const CODE_TTL_MS = 5 * 60 * 1000;
const MAX_ATTEMPTS = 5;

type ChallengeRecord = {
  email: string;
  codeHash: string;
  expiresAt: number;
  attempts: number;
};

const challenges = new Map<string, ChallengeRecord>();

/** Cada código se guarda solo como HMAC; nunca en texto plano en memoria. */
function hashCode(id: string, code: string): string {
  return crypto
    .createHmac("sha256", process.env.ADMIN_SESSION_SECRET || "marine-suppliers-chile-admin-secret-key-2026")
    .update(`${id}:${code}`)
    .digest("base64url");
}

function cleanup(): void {
  const now = Date.now();
  for (const [id, record] of challenges) {
    if (record.expiresAt <= now) challenges.delete(id);
  }
}

export function createChallenge(email: string): { id: string; code: string; expiresAt: number } {
  const normalizedEmail = email.trim().toLowerCase();
  for (const [id, record] of challenges) {
    if (record.email === normalizedEmail) challenges.delete(id);
  }

  const id = crypto.randomUUID();
  const code = String(crypto.randomInt(0, 1_000_000)).padStart(6, "0");
  const expiresAt = Date.now() + CODE_TTL_MS;
  challenges.set(id, {
    email: normalizedEmail,
    codeHash: hashCode(id, code),
    expiresAt,
    attempts: 0,
  });
  cleanup();

  return { id, code, expiresAt };
}

export type ChallengeResult = "ok" | "invalid" | "expired" | "too_many" | "not_found";

export function verifyChallenge(
  id: string,
  code: string
): { result: ChallengeResult; email?: string } {
  const record = challenges.get(id);
  if (!record) return { result: "not_found" };
  if (record.expiresAt <= Date.now()) {
    challenges.delete(id);
    return { result: "expired" };
  }
  if (record.attempts >= MAX_ATTEMPTS) {
    challenges.delete(id);
    return { result: "too_many" };
  }

  record.attempts += 1;
  const expected = Buffer.from(record.codeHash);
  const received = Buffer.from(hashCode(id, code.trim()));
  if (
    expected.length !== received.length ||
    !crypto.timingSafeEqual(expected, received)
  ) {
    if (record.attempts >= MAX_ATTEMPTS) challenges.delete(id);
    return { result: "invalid" };
  }

  challenges.delete(id);
  return { result: "ok", email: record.email };
}
