export type Language = "en" | "es";

export function isLanguage(value: unknown): value is Language {
  return value === "en" || value === "es";
}

export function languageFromHeaders(headers: Headers): Language {
  const header = headers.get("x-ui-language");
  return isLanguage(header) ? header : "en";
}

type ApiMessageKey =
  | "adminInvalid"
  | "adminRateLimited"
  | "adminCodeInvalid"
  | "adminCodeExpired"
  | "adminCodeTooMany"
  | "adminDeliveryFailed"
  | "invalidRequest"
  | "adminDenied"
  | "adminOnly"
  | "invalidEmail"
  | "quotationError"
  | "invalidStatus"
  | "notFound"
  | "vesselInquiry"
  | "chileanPort"
  | "chiefOfficer"
  | "generalShipChandling"
  | "generalRequest";

const API_MESSAGES: Record<Language, Record<ApiMessageKey, string>> = {
  en: {
    adminInvalid: "Invalid credentials. Access is restricted to the Administrator.",
    adminRateLimited: "Too many failed attempts. Please try again in a few minutes.",
    adminCodeInvalid: "Incorrect code. Check the code you received and try again.",
    adminCodeExpired: "The code expired. Request a new one.",
    adminCodeTooMany: "Too many incorrect codes. Start the login again.",
    adminDeliveryFailed: "The verification code could not be sent. Contact the administrator.",
    invalidRequest: "Invalid request.",
    adminDenied: "Access denied. Only the Administrator can view quotations.",
    adminOnly: "Administrator access only.",
    invalidEmail: "Please enter a valid email address.",
    quotationError: "The quotation could not be processed.",
    invalidStatus: "Invalid status.",
    notFound: "Quotation not found.",
    vesselInquiry: "Vessel Inquiry",
    chileanPort: "Chilean Port",
    chiefOfficer: "Chief Officer / Purchasing",
    generalShipChandling: "GENERAL SHIP CHANDLING",
    generalRequest: "General quotation request",
  },
  es: {
    adminInvalid: "Credenciales inválidas. Acceso restringido únicamente al Administrador.",
    adminRateLimited: "Demasiados intentos fallidos. Inténtalo de nuevo en unos minutos.",
    adminCodeInvalid: "Código incorrecto. Revisa el código recibido e inténtalo de nuevo.",
    adminCodeExpired: "El código venció. Solicita uno nuevo.",
    adminCodeTooMany: "Demasiados códigos incorrectos. Inicia el acceso nuevamente.",
    adminDeliveryFailed: "No se pudo enviar el código de verificación. Contacta al administrador.",
    invalidRequest: "Solicitud inválida.",
    adminDenied: "Acceso denegado. Solo el Administrador puede consultar cotizaciones.",
    adminOnly: "Acceso exclusivo Administrador.",
    invalidEmail: "Por favor ingresa un correo electrónico válido.",
    quotationError: "No se pudo procesar la cotización.",
    invalidStatus: "Estado inválido.",
    notFound: "Cotización no encontrada.",
    vesselInquiry: "Consulta de buque",
    chileanPort: "Puerto chileno",
    chiefOfficer: "Primer oficial / Compras",
    generalShipChandling: "PROVEEDOR NAVAL GENERAL",
    generalRequest: "Solicitud general de cotización",
  },
};

export function apiMessage(language: Language, key: ApiMessageKey): string {
  return API_MESSAGES[language][key];
}
