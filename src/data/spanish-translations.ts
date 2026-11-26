import {
  FEATURED_PRODUCTS,
  MORDEC_SLIDES,
  SUPPLY_DIVISIONS,
  type FeaturedProduct,
  type MordecSlide,
  type SupplyDivision,
} from "./maritime-data";
import type { Language } from "@/lib/language";
import type { QuotationRecord } from "@/lib/quotations-store";
import type { QuoteManifestItem } from "@/components/maritime/QuoteManifestContext";

type SpanishDivision = Pick<
  SupplyDivision,
  "title" | "subtitle" | "alt" | "description" | "highlights"
>;

type SpanishProduct = Pick<
  FeaturedProduct,
  "name" | "division" | "alt" | "summary" | "specs"
>;

type SpanishSlide = Pick<
  MordecSlide,
  "title" | "subtitle" | "focusArea" | "description" | "keySpecs" | "recommendedFor"
>;

export const SPANISH_ADDRESS =
  "Los Militares 5620, Las Condes, Región Metropolitana de Santiago 7550000, Chile";
export const SPANISH_COORDINATES_LABEL = '33°24\'23.4"S 70°34\'21.7"O';

export const SPANISH_DIVISIONS: Record<string, SpanishDivision> = {
  "electrical-stores": {
    title: "SUMINISTROS ELÉCTRICOS",
    subtitle: "Iluminación, cableado y tableros de grado marino",
    alt: "Componentes eléctricos marinos e iluminación estanca",
    description:
      "Luminarias marinas estancas, reflectores halógenos/LED, accesorios a prueba de explosión, cables marinos, enchufes de costa, fusibles y repuestos eléctricos de puente diseñados para entornos offshore exigentes.",
    highlights: [
      "Reflectores de cubierta y bombillas de navegación estancas IP67 / IP68",
      "Baterías marinas, transformadores y tomacorrientes de conexión a costa",
      "Interruptores automáticos, relés, multímetros y herramientas aisladas",
    ],
  },
  "cabin-stores": {
    title: "ARTÍCULOS DE CAMAROTE",
    subtitle: "Camarotes de tripulación, cocina y alojamiento",
    alt: "Camarote cómodo de buque con cama, sofá y portillos",
    description:
      "Alojamiento completo, ropa de cama, utensilios de cocina, consumibles de limpieza y artículos de bienestar para la tripulación, diseñados para buques mercantes de larga travesía y flotas de apoyo offshore.",
    highlights: [
      "Ropa de cama ignífuga, colchones y sábanas de alta resistencia",
      "Utensilios de acero inoxidable, vajilla y electrodomésticos de cocina",
      "Químicos de saneamiento, detergentes y kits de mantenimiento de camarotes",
    ],
  },
  "engine-stores": {
    title: "SUMINISTROS DE MÁQUINAS",
    subtitle: "Herramientas de precisión, válvulas, rodamientos y repuestos",
    alt: "Ingeniero seleccionando herramientas de precisión de un maletín marino organizado",
    description:
      "Herramientas neumáticas y manuales, juntas de brida, empaquetaduras, manómetros, acoplamientos y ferretería pesada de sala de máquinas entregados para mantener la maquinaria principal y auxiliar sin tiempos de inactividad.",
    highlights: [
      "Martillos neumáticos de descamación, taladros neumáticos y esmeriladoras angulares",
      "Válvulas marinas JIS / DIN / ANSI, bridas y mangueras hidráulicas",
      "Llaves dinamométricas, micrómetros, manómetros y elementos de fijación",
    ],
  },
  "safety-equipments": {
    title: "EQUIPOS DE SEGURIDAD",
    subtitle: "Protección personal y equipos de rescate de cubierta",
    alt: "Salvavidas marino blanco con franjas negras sobre una red de pesca azul",
    description:
      "Equipos de protección personal certificados, salvavidas, arneses, detectores de gas, aparatos respiratorios y equipos de seguridad de cubierta que cumplen con las normativas marítimas internacionales.",
    highlights: [
      "Guantes antideslizantes, EPP contra arco eléctrico y químicos",
      "Salvavidas, señales de humo flotantes y luces de autoencendido",
      "Arneses anticaída, cascos y monitores de gas en espacios confinados",
    ],
  },
  "marine-paints-chemical": {
    title: "PINTURAS Y QUÍMICOS MARINOS",
    subtitle: "Recubrimientos antiincrustantes, epóxicos y limpiadores de tanques",
    alt: "Recubrimientos anticorrosivos marinos, imprimaciones y químicos industriales",
    description:
      "Recubrimientos marinos de alto espesor, compuestos epóxicos para reparación metálica, químicos de limpieza de tanques, convertidores de óxido y reactivos de tratamiento de agua para la conservación del casco y la preparación de bodegas.",
    highlights: [
      "Kits de emergencia epóxicos para reparación de tuberías en frío",
      "Imprimaciones marinas, esmaltes de cubierta y capas antiincrustantes",
      "Desengrasantes de sentina, desincrustantes y kits de análisis de agua de caldera",
    ],
  },
  provisions: {
    title: "PROVISIONES",
    subtitle: "Víveres frescos, congelados y libres de impuestos para buques",
    alt: "Productos frescos y provisiones de buque preparados para entrega marítima",
    description:
      "Productos chilenos frescos manipulados bajo HACCP, carnes seleccionadas, mariscos, alimentos secos básicos, lácteos y provisiones para tripulaciones multinacionales entregados en camiones con temperatura controlada directamente al muelle.",
    highlights: [
      "Logística estricta de cadena de frío desde Santiago y puertos costeros",
      "Despensa multinacional, artículos halal, asiáticos y europeos",
      "Paquetes de emergencia, agua embotellada y almacenes libres de impuestos",
    ],
  },
  "solas-equipments": {
    title: "EQUIPOS Y SERVICIOS SOLAS",
    subtitle: "Dispositivos de salvamento, trajes de inmersión y liberadores",
    alt: "Tripulante con traje de supervivencia SOLAS color naranja",
    description:
      "Trajes de inmersión aprobados por SOLAS, cintas retrorreflectivas, unidades de liberación hidrostática, luces para chalecos salvavidas, pirotecnia y sistemas contra incendio listos para inspecciones del Estado de Abordo.",
    highlights: [
      "Trajes de inmersión y ayudas térmicas aprobados SOLAS / MED",
      "Unidades de liberación hidrostática Hammar H20R y accesorios para balsas",
      "Mangueras contra incendio, boquillas, botellas SCBA y kits EEBD",
    ],
  },
  "office-supply-products": {
    title: "ARTÍCULOS DE OFICINA (PAPELERÍA)",
    subtitle: "Cuadernos de bitácora, tóner y papelería de buque",
    alt: "Papelería de oficina a bordo, carpetas y artículos administrativos",
    description:
      "Consumibles administrativos completos para la oficina del capitán, el escritorio del ingeniero jefe y la sala de radio, incluidas bitácoras oficiales de cubierta y máquinas, tóner de impresora y sistemas de archivo.",
    highlights: [
      "Bitácoras de cubierta, máquinas, registro de aceite y registro de basura",
      "Tóner láser OEM, papel A4/A3 marino y plastificadoras",
      "Carpetas de archivo, marcadores permanentes y papelería de puente",
    ],
  },
  "imo-publications-charts": {
    title: "PUBLICACIONES IMO Y CARTAS NAUTICAS",
    subtitle: "Cartas de Almirantazgo, códigos IMO y soporte ECDIS",
    alt: "Publicaciones reglamentarias IMO y cartas náuticas oficiales",
    description:
      "Manuales reglamentarios IMO actualizados (SOLAS, MARPOL, IMDG, ISM), instrucciones náuticas del Almirantazgo, avisos a los navegantes y cartas náuticas oficiales en papel para aguas chilenas e internacionales.",
    highlights: [
      "Últimas ediciones IMO: SOLAS, MARPOL, STCW y código IMDG",
      "Cartas náuticas SHOA y UKHO, tablas de mareas y derivas",
      "Reglas paralelas, compases de puntas, pesacartas y herramientas de trazado",
    ],
  },
};

export const SPANISH_PRODUCTS: Record<string, SpanishProduct> = {
  "solas-tape": {
    name: "Cinta Retrorreflectiva, Grado SOLAS",
    division: "Equipos SOLAS",
    alt: "Cinta marina retrorreflectiva IMPA 330189 de grado SOLAS",
    summary:
      "Cinta marina retrorreflectiva de alta intensidad con lente encapsulada, certificada para botes salvavidas, balsas, chalecos y trajes de inmersión.",
    specs: ["Rollo de 50 mm × 45,7 m", "Res. IMO A.658(16)", "Resistente al agua salada y a los rayos UV"],
  },
  "cotton-gloves": {
    name: "Guantes de Trabajo de Algodón con Puntos Antideslizantes",
    division: "Equipos de Seguridad",
    alt: "Guantes de algodón IMPA 190103 con puntos PVC antideslizantes",
    summary:
      "Guantes de trabajo de algodón de punto pesado y transpirable, reforzados con puntos PVC de alta adherencia en palma y dedos para cubierta y manipulación de carga.",
    specs: ["Puntos PVC de alta adherencia", "Puño elástico de punto", "Paquetes de 12 pares"],
  },
  "plastic-steel": {
    name: "Plástico Acero Líquido Faseal (A y B) 500 g",
    division: "Pinturas y Químicos Marinos",
    alt: "Plástico acero epóxico Faseal A y B IMPA 812256 de 500 g",
    summary:
      "Compuesto epóxico bicomponente cargado de acero para reparaciones estructurales rápidas en frío de tuberías, carcasas de bombas, válvulas y tanques.",
    specs: ["Kit A+B de 500 g", "Acabado metálico mecanizable", "Resistente a químicos y aceites"],
  },
  "pneumatic-drill": {
    name: "Taladro Neumático Industrial Pesado",
    division: "Suministros de Máquinas",
    alt: "Taladro neumático industrial para mantenimiento de sala de máquinas",
    summary:
      "Taladro neumático industrial reversible diseñado para funcionar sin chispas en talleres y áreas de mantenimiento a bordo.",
    specs: ["Portabrocas de 10–13 mm", "Presión de trabajo de 6,2 bar", "Mango de escape ergonómico"],
  },
  "angle-grinder": {
    name: "Esmeriladora Angular Neumática + Cepillo de Alambre",
    division: "Suministros de Máquinas",
    alt: "Esmeriladora angular neumática con cepillo de alambre rojo de alta resistencia",
    summary:
      "Esmeriladora angular neumática de alto par combinada con un cepillo de alambre rizado para eliminar óxido rápidamente, preparar soldaduras y retirar recubrimientos de cubierta.",
    specs: ["11.000 RPM en vacío", "Palanca de aceleración de seguridad", "Lista para preparación de superficies"],
  },
  "hammar-h20r": {
    name: "Unidad de Liberación Hidrostática Hammar H20R",
    division: "Equipos SOLAS",
    alt: "Unidad de liberación hidrostática Hammar H20R para balsas salvavidas",
    summary:
      "Unidad de liberación hidrostática original Hammar H20R diseñada para desplegar automáticamente balsas salvavidas entre 1,5 y 4,0 m de profundidad.",
    specs: ["Vida útil de 2 años", "SOLAS / MED / USCG", "Carcasa anticorrosiva"],
  },
};

export const SPANISH_MORDEC_SLIDES: Record<number, SpanishSlide> = {
  1: {
    title: "Programa de Mantenimiento Preventivo MORDEC™",
    subtitle: "Protección de cables de acero y equipos marinos",
    focusArea: "Resumen y defensa contra la corrosión",
    description:
      "Sistemas integrales de lubricación preventiva desarrollados por Mordec International para prolongar la vida útil de los cables de acero bajo exposición extrema al agua salada, flexión cíclica y operaciones de cabrestante con alta carga.",
    keySpecs: [
      "Tecnología de penetración del núcleo a los alambres",
      "Reduce el desgaste interno y la fatiga de los alambres",
      "Opciones compatibles con IMO / VGP",
    ],
    recommendedFor: "Cabrestantes de amarre, grúas de cubierta, pescantes y manejo de anclas",
  },
  2: {
    title: "Penetración del Núcleo y Desplazamiento de Humedad",
    subtitle: "Barrera capilar profunda del núcleo",
    focusArea: "Protección interna de los alambres",
    description:
      "Las grasas superficiales convencionales sellan la humedad dentro del núcleo del cable. Las formulaciones Mordec desplazan la salmuera atrapada y penetran directamente en el núcleo de cáñamo o acero IWRC.",
    keySpecs: [
      "Barrera hidrofóbica contra la rociada marina",
      "Elimina el óxido interno oculto del núcleo",
      "Sin goteo bajo el calor tropical de cubierta",
    ],
    recommendedFor: "Grúas, polipastos de pórtico y remolcadores offshore",
  },
  3: {
    title: "Película de Carga a Presión Extrema",
    subtitle: "Control de abrasión en poleas y tambores",
    focusArea: "Tribología de alto contacto",
    description:
      "Forma una película lubricante límite resistente entre alambres adyacentes y poleas, minimizando el desgaste metal contra metal durantelevantamientos pesados de carga y tensión de amarre.",
    keySpecs: [
      "Alta carga OK según Timken",
      "Previene el agujerado y el aplanamiento de alambres externos",
      "Viscosidad estable de -20 °C a +90 °C",
    ],
    recommendedFor: "Aparejos de carga, grúas de garra y pescantes de gran elevación",
  },
  4: {
    title: "Sistemas de Aplicación con Lubricador a Presión",
    subtitle: "Engrasado limpio, rápido y sin desperdicio",
    focusArea: "Equipos de mantenimiento",
    description:
      "Los aplicadores de collarín de alta presión introducen el lubricante uniformemente en cada capa del cable de acero hasta 1.500 metros por hora, reduciendo hasta un 75 % las horas-hombre respecto al cepillado manual.",
    keySpecs: [
      "Adecuado para diámetros de 8 mm a 64 mm",
      "El raspador prelimpia suciedad y costras de sal",
      "Integración con bomba neumática",
    ],
    recommendedFor: "Equipos de mantenimiento de flotas y revisiones en dique seco",
  },
  5: {
    title: "Protección de Engranajes Abiertos y Coronas Giratorias",
    subtitle: "Alta adherencia pegajosa de larga duración",
    focusArea: "Pedestales de grúa y engranajes de cabrestante",
    description:
      "Los compuestos sintéticos de alta adherencia resisten el arrastre por golpes de mar y lavados de cubierta, amortiguando además las cargas de impacto en engranajes expuestos de grúas y molinetes.",
    keySpecs: [
      "Resistencia al arrastre por agua inferior al 1,5 %",
      "Aditivos sólidos de MoS2 y grafito",
      "Sin proyección a RPM operativas",
    ],
    recommendedFor: "Molinetes de ancla, rodamientos giratorios y cabrestantes",
  },
  6: {
    title: "Grado Marino Biodegradable y Seguro",
    subtitle: "Formulaciones compatibles con EAL / VGP",
    focusArea: "Cuidado ambiental",
    description:
      "Lubricantes fácilmente biodegradables y no bioacumulativos diseñados para buques que operan en aguas costeras sensibles, fiordos chilenos y puertos regulados por la VGP de la EPA de EE. UU.",
    keySpecs: [
      "Fácilmente biodegradable según OCDE 301B",
      "No tóxico para organismos marinos",
      "Ficha de datos de seguridad y expediente técnico completo",
    ],
    recommendedFor: "Pescantes, pescantes de botes y buques costeros de pasajeros o carga",
  },
  7: {
    title: "Inspección y Soporte de Ensayos No Destructivos",
    subtitle: "Visibilidad de la película translúcida",
    focusArea: "Preparación para Estado de Abordo y Clasificación",
    description:
      "La película protectora ámbar translúcida permite a los oficiales de cubierta y peritos inspeccionar visualmente alambres externos rotos y el estado de corrosión sin retirar las capas protectoras de grasa.",
    keySpecs: [
      "Inspección visual de alambres sin desengrasar",
      "Compatible con registros PMS y de Clasificación",
      "Simplifica la certificación anual de cables de grúa",
    ],
    recommendedFor: "Cables de pescantes, pasarelas y inspecciones anuales de Clasificación",
  },
  8: {
    title: "Suministro en Puertos Chilenos y Expediente Técnico",
    subtitle: "Distribución autorizada — Marine Suppliers Chile SPA",
    focusArea: "Stock y despacho rápido",
    description:
      "Disponible directamente a través de Marine Suppliers Chile SPA en cubos, tambores y kits completos de aplicadores, con capacitación técnica para la tripulación de ingeniería de su buque.",
    keySpecs: [
      "Stock local para rotación rápida en puerto",
      "Paquetes combinados de aplicador y grasa",
      "Respuesta de cotización técnica 24/7",
    ],
    recommendedFor: "Todos los buques comerciales que recalan en puertos chilenos",
  },
};

export const SPANISH_SEED_QUOTATIONS: Record<
  string,
  { division: string; items: string[]; message: string }
> = {
  "QT-2026-041": {
    division: "EQUIPOS Y SERVICIOS SOLAS",
    items: ["IMPA 330189 — Cinta Retrorreflectiva", "IMPA 330815 — Hammar H20R"],
    message:
      "ETA Valparaíso, muelle 3, el 28 de noviembre. Necesitamos 6 unidades Hammar H20R con certificados vigentes y 4 rollos de cinta SOLAS antes de la inspección del Estado de Abordo.",
  },
  "QT-2026-042": {
    division: "SUMINISTROS DE MÁQUINAS",
    items: [
      "IMPA 590304 — Esmeriladora Angular Neumática",
      "IMPA 812256 — Plástico Acero Faseal",
      "Grasa MORDEC para cable de acero",
    ],
    message:
      "Solicitamos suministro urgente en muelle durante la ventana de abastecimiento de combustible. Incluir cubo de 20 kg de Mordec y kit de cepillo neumático de descamación.",
  },
  "QT-2026-043": {
    division: "PROVISIONES",
    items: ["PROVISIONES", "ARTÍCULOS DE CAMAROTE"],
    message:
      "Tripulación completa de 24 personas para una travesía sureña de 35 días. Se requieren productos frescos, aves halal y reposición de ropa de cama de camarote.",
  },
};

export function localizeDivision(division: SupplyDivision, language: Language): SupplyDivision {
  if (language === "en") return division;
  const translated = SPANISH_DIVISIONS[division.id];
  return translated ? { ...division, ...translated } : division;
}

export function localizeProduct(product: FeaturedProduct, language: Language): FeaturedProduct {
  if (language === "en") return product;
  const translated = SPANISH_PRODUCTS[product.id];
  return translated ? { ...product, ...translated } : product;
}

export function localizeSlide(slide: MordecSlide, language: Language): MordecSlide {
  if (language === "en") return slide;
  const translated = SPANISH_MORDEC_SLIDES[slide.page];
  return translated ? { ...slide, ...translated } : slide;
}

export function localizeManifestItem(
  item: QuoteManifestItem,
  language: Language
): QuoteManifestItem {
  if (language === "en") return item;

  const division = SUPPLY_DIVISIONS.find((entry) => entry.id === item.id);
  if (division) {
    const localized = localizeDivision(division, language);
    return { ...item, title: localized.title, code: localized.impaRange };
  }

  const product = FEATURED_PRODUCTS.find((entry) => entry.id === item.id);
  if (product) {
    const localized = localizeProduct(product, language);
    return { ...item, title: localized.name, code: localized.impaCode };
  }

  return item;
}

export function localizeDivisionName(name: string, language: Language): string {
  if (language === "en") return name;
  const division = SUPPLY_DIVISIONS.find((entry) => entry.title === name);
  return division ? localizeDivision(division, language).title : name;
}

export function localizeQuotation(
  quotation: QuotationRecord,
  language: Language
): QuotationRecord {
  if (language === "en") return quotation;
  const seed = SPANISH_SEED_QUOTATIONS[quotation.id];
  return {
    ...quotation,
    division: seed?.division ?? localizeDivisionName(quotation.division, language),
    items: seed?.items ?? quotation.items,
    message: seed?.message ?? quotation.message,
  };
}
