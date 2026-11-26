"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { isLanguage, type Language } from "@/lib/language";

export type Theme = "light" | "dark";

const EN = {
  "common.close": "Close",
  "common.whatsapp": "WhatsApp 24/7",
  "common.impaSolas": "IMPA · SOLAS",

  "meta.title": "Marine Suppliers Chile SPA | Marine Supplies & Ship Chandlers in Chile",
  "meta.description":
    "Quality marine supplies in Chile: maritime equipment, provisions, IMPA stores and SOLAS safety for shipping. Request a quotation 24/7.",
  "admin.metaTitle": "Admin Panel | Marine Suppliers Chile SPA",

  "brand.tagline": "Chile SPA · Ship Chandler",
  "brand.description":
    "Full-service ship chandler covering Chile's main ports. IMPA supplies, SOLAS safety, fresh provisions, and MORDEC™ maintenance.",

  "nav.divisions": "Divisions",
  "nav.featured": "Featured IMPA",
  "nav.mordec": "MORDEC™",
  "nav.operations": "Operations",
  "nav.quotation": "Quotation",
  "nav.quoteList": "Quote List",
  "nav.adminAccess": "Admin Access",
  "nav.openMenu": "Open navigation menu",
  "nav.mainPage": "Marine Suppliers Chile SPA, Main Page",

  "drawer.title": "Navigation & IMPA Search",
  "drawer.searchLabel": "Search Supplies / IMPA Codes",
  "drawer.searchPlaceholder": "e.g. SOLAS, IMPA 330189, Provisions, Grinder...",
  "drawer.noResults":
    "No direct matches. You can request any IMPA code in the quotation form.",
  "drawer.sections": "Sections",
  "drawer.nav.hero": "Home & Maritime Bridge",
  "drawer.nav.divisions": "What We Offer (9 Divisions)",
  "drawer.nav.featured": "Featured IMPA Products",
  "drawer.nav.mordec": "MORDEC™ Catalog",
  "drawer.nav.operations": "Fast & On Time Operations",
  "drawer.nav.quotation": "Request a Quotation & Map",
  "drawer.adminOnly": "Administrator-Only Access",
  "drawer.adminText":
    "Login is enabled only for the Administrator of Marine Suppliers Chile SPA.",
  "drawer.adminLogin": "Administrator Login",

  "manifest.title": "Quotation Manifest",
  "manifest.description":
    "Group divisions or IMPA equipment to attach them directly to your quotation request.",
  "manifest.empty": "Your manifest is empty",
  "manifest.emptyHint":
    "Explore the 9 divisions or IMPA products and click \"Add to Quotation\" to prepare your request.",
  "manifest.explore": "Explore Divisions",
  "manifest.clear": "Clear manifest",
  "manifest.send": "Send Quotation Request",
  "manifest.removeItem": "Remove {item}",

  "hero.badgePort": "Chile Port Operations · {coords}",
  "hero.badgeStandard": "IMPA & SOLAS Standard",
  "hero.imageAlt": "Marine Suppliers Chile port container vessel operations",
  "hero.videoTitle": "Marine Suppliers Chile Vessel Background Video",
  "hero.description":
    "Full vessel supply at Chile's main ports. Technical IMPA equipment, fresh provisions, SOLAS safety, MORDEC™ preventive maintenance, and coordinated delivery alongside or by launch ",
  "hero.beforeSailing": "before sailing",
  "hero.quote": "Get a Quotation",
  "hero.catalog": "Explore IMPA Catalog",
  "hero.stat1Value": "09 Divisions",
  "hero.stat1Label": "Engine, Deck, Cabin, SOLAS & Provisions",
  "hero.stat2Value": "11+ Ports",
  "hero.stat2Label": "Nationwide coverage on the Chilean coast",
  "hero.stat3Value": "IMPA / IMO Standard",
  "hero.stat3Label": "Certified equipment & PSC checklists",
  "hero.stat4Value": "On Time, Every Time",
  "hero.stat4Label": "24/7 dispatch before sailing",

  "emblem.seal": "Official Chandler Seal",
  "dispatch.badge": "Port Dispatch Desk",
  "dispatch.title": "Contact Us · Direct Attention",
  "dispatch.text":
    "Immediate coordination for captains, chief engineers, and shipping agencies across the entire Chilean coastline. Fast replies via WhatsApp, direct phone, or operational email.",
  "dispatch.whatsapp": "Direct WhatsApp",
  "dispatch.form": "Quotation Form",

  "divisions.eyebrow": "Complete IMPA Catalog · 9 Divisions",
  "divisions.title": "What We Offer",
  "divisions.text":
    "From engine-room spares and IMO publications to fresh provisions and certified SOLAS equipment. Click any division to view specifications or add it to your quotation manifest.",
  "divisions.tab.all": "All (9)",
  "divisions.tab.deck": "Safety & SOLAS",
  "divisions.tab.engine": "Engine & Chemicals",
  "divisions.tab.provisions": "Provisions & Cabin",
  "divisions.tab.navigation": "IMO Charts & Office",
  "divisions.filters": "Filters",
  "divisions.details": "View details of {title}",
  "divisions.inManifest": "In Manifest",
  "divisions.add": "Add to Quotation",
  "divisions.detailsBtn": "Details",
  "divisions.scope": "Typical Supply Scope",
  "divisions.close": "Close",
  "divisions.addOpen": "Add & Open Manifest",

  "mission.quote":
    "On time, every time is how we respond to each vessel. Our crew, the most reliable resource, lives this philosophy: ",
  "mission.quoteHighlight": "We go full ahead for our customer's satisfaction.",

  "featured.eyebrow": "Featured Equipment · IMPA Reference",
  "featured.title": "Featured Products",
  "featured.text":
    "A representative selection of IMPA-standard supplies available for immediate dispatch. Click to enlarge or add them directly to your quotation manifest.",
  "featured.added": "Added",
  "featured.quote": "Quote",
  "featured.close": "Close",
  "featured.add": "Add to Quotation",

  "mordec.eyebrow": "Preventive Maintenance Program",
  "mordec.title": "MORDEC Rope Preventive Maintenance Products",
  "mordec.text":
    "Interactive catalog of the MORDEC™ protection and lubrication program for steel wire ropes, open gears, and deck equipment. 8 pages of technical specifications and marine applications.",
  "mordec.page": "Page {page} of {total}",
  "mordec.specs": "Key Specifications",
  "mordec.recommended": "Recommended for:",
  "mordec.copyright":
    "Copyright © 2020 Mordec International Pte Ltd. All rights reserved.",
  "mordec.previous": "Previous",
  "mordec.next": "Next",
  "mordec.goPage": "Go to page {page}",

  "fast.badge": "24/7 Operational Readiness",
  "fast.eyebrow": "Port Efficiency & Logistics",
  "fast.title": "Fast & On Time",
  "fast.textBefore": "We work ",
  "fast.smart": "SMART",
  "fast.textAfter":
    "to ensure that all provisions, ship stores, and supplies are delivered, completed, and cleaned up well before your ship sets sail, in accordance with IMPA standards.",
  "fast.item1": "Direct coordination with agencies and port captains",
  "fast.item2": "Launch or crane dispatch to vessels at anchorage or berth",
  "fast.item3": "Certified cold chain for fresh provisions",
  "fast.item4": "IMPA documentation and SOLAS certificates included",
  "fast.cta": "Request a Quotation Now",

  "quote.eyebrow": "Quotation & Direct Contact",
  "quote.title": "Get Your Quotation",
  "quote.text":
    "Our mission is to supply your vessel with the best maritime industry equipment and ship stores, including provisions needed for your ship, all at the most competitive market prices. We are your trusted ship chandler, delivering on time, every time.",
  "quote.formTitle": "Get in touch with us.",
  "quote.successTitle": "Quotation Received!",
  "quote.successText":
    "Your request has been registered successfully. Our operations team will contact you within the next few hours.",
  "quote.sendAnother": "Send another quotation",
  "quote.name": "Name",
  "quote.email": "Email *",
  "quote.vessel": "Vessel Name",
  "quote.port": "Port of Arrival",
  "quote.items": "Manifest Items ({count})",
  "quote.message": "Message",
  "quote.messagePlaceholder":
    "Describe your request: IMPA lists, quantities, vessel ETA, special instructions...",
  "quote.mapTitle": "Marine Suppliers Chile location map",
  "quote.namePlaceholder": "Capt. / Ch. Eng.",
  "quote.emailSubject": "Vessel Quotation Request",
  "quote.emailBody":
    "Hi Marine Suppliers Chile SPA,\n\nI would like to request a quotation for my vessel.",
  "quote.sending": "Sending...",
  "quote.send": "Send",
  "quote.whatsapp": "Contact us",
  "quote.whatsappSub": "WhatsApp available 24/7",
  "quote.directions": "Get Directions",
  "quote.response": "Operational response in under 4 hours · Quotations 24/7",
  "quote.errorDefault": "Failed to send",
  "quote.connectionError": "Connection error",

  "footer.contact": "Direct Contact",
  "footer.legal": "Legal & Certifications",
  "footer.privacy": "Privacy Policy",
  "footer.terms": "Terms and Conditions",
  "footer.rights":
    "Copyright © {year} Marine Suppliers Chile SPA — All rights reserved.",
  "footer.impaLine": "IMPA · SOLAS · SHIP CHANDLER",
  "footer.whatsappAria": "Contact on WhatsApp",

  "admin.only": "Admin Only",
  "admin.title": "Administrator-Only Access",
  "admin.text":
    "Private portal for managing maritime quotations of Marine Suppliers Chile SPA. No public registration or customer accounts.",
  "admin.activeSession": "Active session as {email}",
  "admin.goPanel": "Go to Admin Panel",
  "admin.email": "Administrator Email",
  "admin.password": "Master Password",
  "admin.code": "Verification Code",
  "admin.codeHint": "Enter the 6-digit code sent to your company email and phones.",
  "admin.codeStepTitle": "Enter your verification code",
  "admin.codeStepText":
    "We sent a code to the company email and to both phone numbers published on this page. Enter it below to continue.",
  "admin.checkingSession": "Checking session...",
  "admin.sending": "Sending code...",
  "admin.sendCode": "Send verification code",
  "admin.verify": "Verify and enter",
  "admin.resend": "Resend code",
  "admin.back": "Back",
  "admin.devCode": "Development code: {code}",
  "admin.nextVerification": "Next verification required: {date}",
  "admin.verifying": "Verifying...",
  "admin.login": "Log in as Administrator",
  "admin.denied": "Access denied.",
  "admin.connectionError": "Connection error while verifying credentials.",

  "admin.panel": "Admin Panel",
  "admin.badge": "Administrator",
  "admin.publicSite": "Public Site",
  "admin.logout": "Log Out",
  "admin.stat.total": "Total Quotations",
  "admin.stat.pending": "Pending",
  "admin.stat.quoted": "Quoted",
  "admin.stat.dispatched": "Dispatched",
  "admin.status.pending": "Pending",
  "admin.status.quoted": "Quoted",
  "admin.status.dispatched": "Dispatched",
  "admin.list": "Received Quotations",
  "admin.refresh": "Refresh",
  "admin.empty":
    "No quotations yet. Requests from the public form will appear here.",
  "admin.port": "Port:",
  "admin.division": "Division:",
  "admin.attachments": "Attachments:",
  "admin.quoteAction": "Quote",
  "admin.dispatch": "Dispatch",
  "admin.deleteConfirm": "Delete this quotation permanently?",

  "preferences.language": "Change language",
  "preferences.theme": "Change color theme",
} as const;

export type TranslationKey = keyof typeof EN;

const ES: Record<TranslationKey, string> = {
  "common.close": "Cerrar",
  "common.whatsapp": "WhatsApp 24/7",
  "common.impaSolas": "IMPA · SOLAS",

  "meta.title": "Marine Suppliers Chile SPA | Suministros Marinos y Proveedores Navales en Chile",
  "meta.description":
    "Suministros marinos de calidad en Chile: equipos marítimos, provisiones, insumos IMPA y seguridad SOLAS para la navegación. Solicita tu cotización 24/7.",
  "admin.metaTitle": "Panel Admin | Marine Suppliers Chile SPA",

  "brand.tagline": "Chile SPA · Proveedor Naval",
  "brand.description":
    "Proveedor naval integral con cobertura en los principales puertos de Chile. Suministros IMPA, seguridad SOLAS, provisiones frescas y mantenimiento MORDEC™.",

  "nav.divisions": "Divisiones",
  "nav.featured": "IMPA Destacados",
  "nav.mordec": "MORDEC™",
  "nav.operations": "Operaciones",
  "nav.quotation": "Cotización",
  "nav.quoteList": "Cotizador",
  "nav.adminAccess": "Acceso Admin",
  "nav.openMenu": "Abrir menú de navegación",
  "nav.mainPage": "Marine Suppliers Chile SPA, Página Principal",

  "drawer.title": "Navegación & Buscador IMPA",
  "drawer.searchLabel": "Buscar Suministros / Códigos IMPA",
  "drawer.searchPlaceholder": "Ej: SOLAS, IMPA 330189, Provisiones, Esmeriladora...",
  "drawer.noResults":
    "Sin coincidencias directas. Puedes solicitar cualquier código IMPA en el formulario de cotización.",
  "drawer.sections": "Secciones",
  "drawer.nav.hero": "Inicio & Puente Marítimo",
  "drawer.nav.divisions": "Qué Ofrecemos (9 Divisiones)",
  "drawer.nav.featured": "Productos Destacados IMPA",
  "drawer.nav.mordec": "Catálogo MORDEC™",
  "drawer.nav.operations": "Operaciones Fast & On Time",
  "drawer.nav.quotation": "Solicitar Cotización & Mapa",
  "drawer.adminOnly": "Acceso Exclusivo Administrador",
  "drawer.adminText":
    "El inicio de sesión está habilitado únicamente para el Administrador de Marine Suppliers Chile SPA.",
  "drawer.adminLogin": "Iniciar Sesión Administrador",

  "manifest.title": "Manifiesto de Cotización",
  "manifest.description":
    "Agrupa divisiones o equipos IMPA para adjuntarlos directamente a tu solicitud de cotización.",
  "manifest.empty": "Tu manifiesto está vacío",
  "manifest.emptyHint":
    "Explora las 9 divisiones o productos IMPA y pulsa «Añadir a Cotización» para preparar tu requisición.",
  "manifest.explore": "Explorar Divisiones",
  "manifest.clear": "Vaciar manifiesto",
  "manifest.send": "Enviar Solicitud de Cotización",
  "manifest.removeItem": "Quitar {item}",

  "hero.badgePort": "Operaciones Portuarias en Chile · {coords}",
  "hero.badgeStandard": "Estándar IMPA & SOLAS",
  "hero.imageAlt": "Operaciones de buques portacontenedores de Marine Suppliers Chile",
  "hero.videoTitle": "Video de fondo de buque de Marine Suppliers Chile",
  "hero.description":
    "Abastecimiento integral de naves en los principales puertos de Chile. Equipos técnicos IMPA, provisiones frescas, seguridad SOLAS, mantenimiento preventivo MORDEC™ y entrega coordinada en muelle o lancha ",
  "hero.beforeSailing": "antes de zarpar",
  "hero.quote": "Solicitar Cotización",
  "hero.catalog": "Explorar Catálogo IMPA",
  "hero.stat1Value": "09 Divisiones",
  "hero.stat1Label": "Máquinas, Cubierta, Camarotes, SOLAS y Provisiones",
  "hero.stat2Value": "11+ Puertos",
  "hero.stat2Label": "Cobertura nacional en la costa chilena",
  "hero.stat3Value": "Norma IMPA / IMO",
  "hero.stat3Label": "Equipos certificados y listas PSC",
  "hero.stat4Value": "A Tiempo, Siempre",
  "hero.stat4Label": "Despacho 24/7 antes del zarpe",

  "emblem.seal": "Sello Oficial de Proveedor Naval",
  "dispatch.badge": "Mesa de Despacho Portuario",
  "dispatch.title": "Contáctanos · Atención Directa",
  "dispatch.text":
    "Coordinación inmediata para capitanes, jefes de máquinas y agencias navieras en todo el litoral chileno. Respuesta ágil por WhatsApp, telefonía directa o correo operativo.",
  "dispatch.whatsapp": "WhatsApp Directo",
  "dispatch.form": "Formulario de Cotización",

  "divisions.eyebrow": "Catálogo Integral IMPA · 9 Divisiones",
  "divisions.title": "Qué Ofrecemos",
  "divisions.text":
    "Desde repuestos de sala de máquinas y publicaciones IMO hasta provisiones frescas y equipos certificados SOLAS. Haz clic en cualquier división para ver especificaciones o añadirla a tu manifiesto de cotización.",
  "divisions.tab.all": "Todas (9)",
  "divisions.tab.deck": "Seguridad & SOLAS",
  "divisions.tab.engine": "Máquinas & Químicos",
  "divisions.tab.provisions": "Provisiones & Cabina",
  "divisions.tab.navigation": "Cartas IMO & Oficina",
  "divisions.filters": "Filtros",
  "divisions.details": "Ver detalles de {title}",
  "divisions.inManifest": "En Manifiesto",
  "divisions.add": "Añadir a Cotización",
  "divisions.detailsBtn": "Detalles",
  "divisions.scope": "Alcance de Suministro Habitual",
  "divisions.close": "Cerrar",
  "divisions.addOpen": "Añadir y Abrir Manifiesto",

  "mission.quote":
    "A tiempo, siempre, es como respondemos a cada buque. Nuestra tripulación, el recurso más confiable, vive esta filosofía: ",
  "mission.quoteHighlight": "Avanzamos a toda máquina por la satisfacción de nuestro cliente.",

  "featured.eyebrow": "Equipos Destacados · Referencia IMPA",
  "featured.title": "Productos Destacados",
  "featured.text":
    "Muestra representativa de suministros bajo estándar IMPA disponibles para despacho inmediato. Haz clic para ampliar o añade directamente a tu manifiesto de cotización.",
  "featured.added": "Añadido",
  "featured.quote": "Cotizar",
  "featured.close": "Cerrar",
  "featured.add": "Añadir a Cotización",

  "mordec.eyebrow": "Programa de Mantenimiento Preventivo",
  "mordec.title": "Productos MORDEC para Mantenimiento Preventivo de Cables",
  "mordec.text":
    "Catálogo interactivo del programa de protección y lubricación MORDEC™ para cables de acero, engranajes abiertos y equipos de cubierta. 8 páginas de especificaciones técnicas y aplicaciones marítimas.",
  "mordec.page": "Pág. {page} de {total}",
  "mordec.specs": "Especificaciones Clave",
  "mordec.recommended": "Recomendado para:",
  "mordec.copyright":
    "Copyright © 2020 Mordec International Pte Ltd. Todos los derechos reservados.",
  "mordec.previous": "Anterior",
  "mordec.next": "Siguiente",
  "mordec.goPage": "Ir a página {page}",

  "fast.badge": "Disponibilidad Operativa 24/7",
  "fast.eyebrow": "Eficiencia Portuaria & Logística",
  "fast.title": "Rápidos y a Tiempo",
  "fast.textBefore": "Trabajamos de forma ",
  "fast.smart": "INTELIGENTE",
  "fast.textAfter":
    "para garantizar que todas las provisiones, artículos de buque y suministros se entreguen, se completen y se limpien mucho antes de que su buque zarpe, de acuerdo con los estándares IMPA.",
  "fast.item1": "Coordinación directa con agencias y capitanías de puerto",
  "fast.item2": "Despacho en lancha o grúa a buques en rada o muelle",
  "fast.item3": "Cadena de frío certificada para provisiones frescas",
  "fast.item4": "Documentación IMPA y certificados SOLAS incluidos",
  "fast.cta": "Solicitar Cotización Ahora",

  "quote.eyebrow": "Cotización & Contacto Directo",
  "quote.title": "Solicita tu Cotización",
  "quote.text":
    "Nuestra misión es abastecer su buque con los mejores equipos de la industria marítima y artículos de buque, incluidas las provisiones que necesita, todo a los precios más competitivos del mercado. Somos su proveedor naval de confianza, entregando a tiempo, siempre.",
  "quote.formTitle": "Contáctanos.",
  "quote.successTitle": "¡Cotización Recibida!",
  "quote.successText":
    "Tu solicitud ha sido registrada exitosamente. Nuestro equipo operativo se pondrá en contacto contigo en las próximas horas.",
  "quote.sendAnother": "Enviar otra cotización",
  "quote.name": "Nombre",
  "quote.email": "Correo electrónico *",
  "quote.vessel": "Nombre del Buque",
  "quote.port": "Puerto de Arribo",
  "quote.items": "Ítems del Manifiesto ({count})",
  "quote.message": "Mensaje",
  "quote.messagePlaceholder":
    "Describe tu requisición: listas IMPA, cantidades, ETA del buque, instrucciones especiales...",
  "quote.mapTitle": "Mapa de ubicación de Marine Suppliers Chile",
  "quote.namePlaceholder": "Cap. / J. Máq.",
  "quote.emailSubject": "Solicitud de cotización de buque",
  "quote.emailBody":
    "Hola Marine Suppliers Chile SPA,\n\nMe gustaría solicitar una cotización para mi buque.",
  "quote.sending": "Enviando...",
  "quote.send": "Enviar",
  "quote.whatsapp": "Contáctanos",
  "quote.whatsappSub": "WhatsApp disponible 24/7",
  "quote.directions": "Obtener Indicaciones",
  "quote.response": "Respuesta operativa en menos de 4 horas · Cotizaciones 24/7",
  "quote.errorDefault": "Error al enviar",
  "quote.connectionError": "Error de conexión",

  "footer.contact": "Contacto Directo",
  "footer.legal": "Legal & Certificaciones",
  "footer.privacy": "Política de Privacidad",
  "footer.terms": "Términos y Condiciones",
  "footer.rights":
    "Copyright © {year} Marine Suppliers Chile SPA — Todos los derechos reservados.",
  "footer.impaLine": "IMPA · SOLAS · PROVEEDOR NAVAL",
  "footer.whatsappAria": "Contactar por WhatsApp",

  "admin.only": "Solo Administrador",
  "admin.title": "Acceso Exclusivo Administrador",
  "admin.text":
    "Portal privado para la administración de cotizaciones marítimas de Marine Suppliers Chile SPA. No hay registro público ni cuentas de clientes.",
  "admin.activeSession": "Sesión activa como {email}",
  "admin.goPanel": "Ir al Panel Admin",
  "admin.email": "Correo de Administrador",
  "admin.password": "Contraseña Maestra",
  "admin.code": "Código de Verificación",
  "admin.codeHint": "Ingresa el código de 6 dígitos enviado al correo y teléfonos de la empresa.",
  "admin.codeStepTitle": "Coloca aquí tu código",
  "admin.codeStepText":
    "Enviamos un código al correo de la empresa y a ambos teléfonos publicados en esta página. Ingrésalo abajo para continuar.",
  "admin.checkingSession": "Verificando sesión...",
  "admin.sending": "Enviando código...",
  "admin.sendCode": "Enviar código de verificación",
  "admin.verify": "Verificar y entrar",
  "admin.resend": "Reenviar código",
  "admin.back": "Volver",
  "admin.devCode": "Código de desarrollo: {code}",
  "admin.nextVerification": "Próxima verificación requerida: {date}",
  "admin.verifying": "Verificando...",
  "admin.login": "Ingresar como Administrador",
  "admin.denied": "Acceso denegado.",
  "admin.connectionError": "Error de conexión al verificar credenciales.",

  "admin.panel": "Panel Admin",
  "admin.badge": "Administrador",
  "admin.publicSite": "Sitio Público",
  "admin.logout": "Cerrar Sesión",
  "admin.stat.total": "Total Cotizaciones",
  "admin.stat.pending": "Pendientes",
  "admin.stat.quoted": "Cotizadas",
  "admin.stat.dispatched": "Despachadas",
  "admin.status.pending": "Pendiente",
  "admin.status.quoted": "Cotizada",
  "admin.status.dispatched": "Despachada",
  "admin.list": "Cotizaciones Recibidas",
  "admin.refresh": "Actualizar",
  "admin.empty":
    "No hay cotizaciones registradas aún. Las solicitudes del formulario público aparecerán aquí.",
  "admin.port": "Puerto:",
  "admin.division": "División:",
  "admin.attachments": "Adjuntos:",
  "admin.quoteAction": "Cotizar",
  "admin.dispatch": "Despachar",
  "admin.deleteConfirm": "¿Eliminar esta cotización permanentemente?",

  "preferences.language": "Cambiar idioma",
  "preferences.theme": "Cambiar tema de color",
};

interface SitePreferencesContextValue {
  language: Language;
  theme: Theme;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  toggleTheme: () => void;
  t: (key: TranslationKey, vars?: Record<string, string | number>) => string;
}

const SitePreferencesContext = createContext<SitePreferencesContextValue | null>(null);

function interpolate(template: string, vars?: Record<string, string | number>): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match
  );
}

export function SitePreferencesProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    let savedLanguage: string | null = null;
    let savedTheme: string | null = null;
    try {
      savedLanguage = window.localStorage.getItem("fonseca-language");
      savedTheme = window.localStorage.getItem("fonseca-theme");
    } catch {
      /* Storage may be unavailable. */
    }

    const nextLanguage: Language = isLanguage(savedLanguage) ? savedLanguage : "en";
    const nextTheme: Theme = savedTheme === "dark" ? "dark" : "light";
    setLanguageState(nextLanguage);
    setThemeState(nextTheme);
    document.documentElement.lang = nextLanguage;
    document.documentElement.classList.toggle("dark", nextTheme === "dark");
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    const isAdmin = window.location.pathname.startsWith("/admin");
    document.title = isAdmin
      ? language === "es"
        ? ES["admin.metaTitle"]
        : EN["admin.metaTitle"]
      : language === "es"
        ? ES["meta.title"]
        : EN["meta.title"];
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute(
        "content",
        language === "es" ? ES["meta.description"] : EN["meta.description"]
      );
  }, [language]);

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next);
    try {
      window.localStorage.setItem("fonseca-language", next);
    } catch {
      /* Storage may be unavailable. */
    }
  }, []);

  const toggleLanguage = useCallback(() => {
    setLanguageState((prev) => {
      const next: Language = prev === "en" ? "es" : "en";
      try {
        window.localStorage.setItem("fonseca-language", next);
      } catch {
        /* Storage may be unavailable. */
      }
      return next;
    });
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next: Theme = prev === "light" ? "dark" : "light";
      document.documentElement.classList.toggle("dark", next === "dark");
      try {
        window.localStorage.setItem("fonseca-theme", next);
      } catch {
        /* Storage may be unavailable. */
      }
      return next;
    });
  }, []);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string | number>) =>
      interpolate(language === "es" ? ES[key] : EN[key], vars),
    [language]
  );

  const value = useMemo(
    () => ({ language, theme, setLanguage, toggleLanguage, toggleTheme, t }),
    [language, theme, setLanguage, toggleLanguage, toggleTheme, t]
  );

  return (
    <SitePreferencesContext.Provider value={value}>
      {children}
    </SitePreferencesContext.Provider>
  );
}

export function useSitePreferences() {
  const context = useContext(SitePreferencesContext);
  if (!context) {
    throw new Error("useSitePreferences must be used within SitePreferencesProvider");
  }
  return context;
}
