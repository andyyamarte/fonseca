type RateLimitEntry = {
  count: number;
  resetAt: number;
};

// Limitador en memoria por instancia. En despliegues multi-instancia debe
// sustituirse por un almacén compartido (Redis, KV, etc.).
const attempts = new Map<string, RateLimitEntry>();

export function checkRateLimit(
  key: string,
  limit = 5,
  windowMs = 15 * 60 * 1000
): { allowed: boolean; retryAfter: number } {
  const now = Date.now();
  const entry = attempts.get(key);

  if (!entry || entry.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfter: 0 };
  }

  if (entry.count >= limit) {
    return { allowed: false, retryAfter: Math.ceil((entry.resetAt - now) / 1000) };
  }

  entry.count += 1;
  return { allowed: true, retryAfter: 0 };
}

export function clearRateLimit(key: string): void {
  attempts.delete(key);
}
