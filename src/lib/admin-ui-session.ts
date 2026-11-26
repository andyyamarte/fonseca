const STORAGE_KEY = "ms_admin_ui_session";

export type AdminUiSession = {
  email: string;
  expiresAt: number;
};

/**
 * Solo estado visual: la autorización real la decide la cookie httpOnly del
 * servidor. Nunca se usa este valor para permitir acceso.
 */
export function readAdminUiSession(): AdminUiSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<AdminUiSession>;
    if (
      typeof parsed.email !== "string" ||
      typeof parsed.expiresAt !== "number" ||
      parsed.expiresAt <= Date.now()
    ) {
      window.localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    return { email: parsed.email, expiresAt: parsed.expiresAt };
  } catch {
    return null;
  }
}

export function writeAdminUiSession(session: AdminUiSession): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  } catch {
    /* Almacenamiento no disponible. */
  }
}

export function clearAdminUiSession(): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    /* Almacenamiento no disponible. */
  }
}
