export type SupplyDivisionCategory =
  | "all"
  | "deck-safety"
  | "engine-chemical"
  | "provisions-cabin"
  | "navigation-office";

export interface SupplyDivision {
  id: string;
  title: string;
  subtitle: string;
  impaRange: string;
  category: Exclude<SupplyDivisionCategory, "all">;
  image: string;
  alt: string;
  description: string;
  highlights: string[];
  aspect?: "square" | "portrait";
}

export interface FeaturedProduct {
  id: string;
  impaCode: string;
  name: string;
  division: string;
  image: string;
  alt: string;
  summary: string;
  specs: string[];
}

export interface MordecSlide {
  page: number;
  title: string;
  subtitle: string;
  focusArea: string;
  description: string;
  keySpecs: string[];
  recommendedFor: string;
}

export const SITE_CONTACT = {
  company: "Marine Suppliers Chile SPA",
  tagline: "Ship Chandler",
  address: "Los Militares 5620, Las Condes, Santiago Metropolitan Region 7550000, Chile",
  coordinates: {
    lat: -33.406498,
    lng: -70.572693,
    label: "33°24'23.4\"S 70°34'21.7\"W",
  },
  phones: [
    { display: "+56 924825623", href: "tel:+56924825623" },
    { display: "+56 950883665", href: "tel:+56950883665" },
  ],
  whatsappUrl: "https://wa.me/56984225623",
  email: "INFO@MARINESUPPLIERS.CL",
  emailHref: "mailto:info@marinesuppliers.cl?subject=Vessel%20Quotation%20Request&body=Hi%20Marine%20Suppliers%20Chile%20SPA%2C%0A",
  vimeoEmbedUrl:
    "https://player.vimeo.com/video/952911989?h=aa577b24ac&autoplay=1&loop=1&autopause=0&muted=1&title=0&byline=0&portrait=0&controls=0&background=1",
};

export const SUPPLY_DIVISIONS: SupplyDivision[] = [
  {
    id: "electrical-stores",
    title: "ELECTRICAL STORES",
    subtitle: "Marine Grade Lighting, Cabling & Switchgear",
    impaRange: "IMPA 79xxxx",
    category: "engine-chemical",
    image: "/images/cat-electrical.jpg",
    alt: "Marine electrical components and watertight lighting equipment",
    description:
      "Watertight marine luminaires, halogen/LED floodlights, explosion-proof fittings, marine cables, shore power plugs, fuses, and bridge electrical spares built for harsh offshore environments.",
    highlights: [
      "IP67 / IP68 watertight deck floodlights & navigation bulbs",
      "Marine batteries, transformers & shore connection receptacles",
      "Circuit breakers, relays, multimeters & insulated tooling",
    ],
  },
  {
    id: "cabin-stores",
    title: "CABIN STORES",
    subtitle: "Crew Quarters, Galley & Accommodation",
    impaRange: "IMPA 17xxxx – 35xxxx",
    category: "provisions-cabin",
    image: "/images/cat-cabin.webp",
    alt: "Cozy vessel cabin quarters with bed, sofa, and porthole windows",
    description:
      "Complete accommodation, linen, galleyware, cleaning consumables, and crew welfare supplies engineered for long-haul merchant vessels and offshore support fleets.",
    highlights: [
      "Flame-retardant bedding, mattresses & heavy-duty linens",
      "Stainless steel galley utensils, tableware & catering appliances",
      "Sanitation chemicals, detergents & cabin maintenance kits",
    ],
  },
  {
    id: "engine-stores",
    title: "ENGINE STORES",
    subtitle: "Precision Tooling, Valves, Bearings & Spares",
    impaRange: "IMPA 59xxxx – 71xxxx",
    category: "engine-chemical",
    image: "/images/cat-engine.jpg",
    alt: "Engineer selecting precision tools from an organized marine toolbox",
    description:
      "Pneumatic and hand tools, flange gaskets, packings, gauges, couplings, and heavy-duty engine room hardware delivered to keep main and auxiliary machinery running without downtime.",
    highlights: [
      "Pneumatic scaling hammers, air drills & angle grinders",
      "JIS / DIN / ANSI marine valves, flanges & hydraulic hoses",
      "Torque wrenches, micrometers, pressure gauges & fasteners",
    ],
  },
  {
    id: "safety-equipments",
    title: "SAFETY EQUIPMENTS",
    subtitle: "Personal Protection & Deck Rescue Gear",
    impaRange: "IMPA 19xxxx – 33xxxx",
    category: "deck-safety",
    image: "/images/cat-safety.jpg",
    alt: "White marine lifebuoy with black bands resting on a blue fishing net",
    description:
      "Certified personal protective equipment, lifebuoys, harnesses, gas detectors, breathing apparatus, and deck safety gear compliant with international maritime regulations.",
    highlights: [
      "Anti-slip working gloves, arc-flash & chemical PPE",
      "Lifebuoys, buoyant smoke signals & self-igniting lights",
      "Fall arrest harnesses, helmets & confined-space gas monitors",
    ],
  },
  {
    id: "marine-paints-chemical",
    title: "MARINE PAINTS AND CHEMICAL",
    subtitle: "Anti-Fouling Coatings, Epoxies & Tank Cleaners",
    impaRange: "IMPA 25xxxx – 81xxxx",
    category: "engine-chemical",
    image: "/images/cat-paints.png",
    alt: "Marine anti-corrosion coatings, primers, and industrial chemicals",
    description:
      "High-build marine coatings, epoxy metal-repair compounds, tank cleaning chemicals, rust converters, and water-treatment reagents for hull preservation and cargo hold readiness.",
    highlights: [
      "Epoxy liquid steel & cold-weld emergency pipe repair kits",
      "Marine primers, deck enamels & anti-fouling topcoats",
      "Bilge degreasers, descalers & boiler water test kits",
    ],
  },
  {
    id: "provisions",
    title: "PROVISIONS",
    subtitle: "Fresh, Frozen & Bonded Ship Victualling",
    impaRange: "IMPA 01xxxx – 09xxxx",
    category: "provisions-cabin",
    image: "/images/cat-provisions.jpg",
    alt: "Fresh produce and vessel food provisions prepared for maritime delivery",
    description:
      "HACCP-handled fresh Chilean produce, prime meats, seafood, dry staples, dairy, and multinational crew provisions delivered in temperature-controlled trucks directly to berth.",
    highlights: [
      "Strict cold-chain logistics from Santiago & coastal hubs",
      "Multicultural dry stores, halal/asian/european pantry items",
      "Bonded stores, bottled water & emergency ration packs",
    ],
  },
  {
    id: "solas-equipments",
    title: "SOLAS EQUIPMENTS SERVICES AND SUPPLY",
    subtitle: "Lifesaving Appliances, Immersion Suits & Releases",
    impaRange: "IMPA 33xxxx",
    category: "deck-safety",
    image: "/images/cat-solas.webp",
    alt: "Crew member wearing an orange SOLAS immersion survival suit",
    description:
      "SOLAS-approved immersion suits, retro-reflective tapes, hydrostatic release units, lifejacket lights, pyrotechnics, and firefighting systems ready for Port State Control inspections.",
    highlights: [
      "SOLAS MED-approved immersion suits & thermal protective aids",
      "Hammar H20R hydrostatic release units & liferaft accessories",
      "Fire hoses, nozzles, SCBA cylinders & EEBD emergency kits",
    ],
  },
  {
    id: "office-supply-products",
    title: "OFFICE SUPPLY PRODUCTS (E.G STATIONERY)",
    subtitle: "Bridge Logbooks, Toners & Vessel Stationery",
    impaRange: "IMPA 47xxxx",
    category: "navigation-office",
    image: "/images/cat-office.jpg",
    alt: "Shipboard office stationery, folders, and administrative supplies",
    description:
      "Complete administrative consumables for the Master's office, Chief Engineer desk, and radio room—including official deck/engine logbooks, printer toners, and filing systems.",
    highlights: [
      "Deck, engine, oil record & garbage record logbooks",
      "OEM laser toners, A4/A3 marine copy paper & laminators",
      "Archiving binders, permanent markers & bridge stationery",
    ],
  },
  {
    id: "imo-publications-charts",
    title: "IMO PUBLICATONS AND NAUTICAL CHARTS",
    subtitle: "Admiralty Charts, IMO Codes & ECDIS Support",
    impaRange: "IMPA 37xxxx",
    category: "navigation-office",
    image: "/images/cat-imo.png",
    alt: "IMO regulatory publications and official nautical navigation charts",
    description:
      "Up-to-date IMO regulatory manuals (SOLAS, MARPOL, IMDG, ISM), Admiralty Sailing Directions, Notice to Mariners, and official paper nautical charts for Chilean and international waters.",
    highlights: [
      "Latest IMO editions: SOLAS, MARPOL, STCW & IMDG Code",
      "SHOA & UKHO Admiralty nautical charts and tidal tables",
      "Parallel rulers, dividers, chart weights & plotting tools",
    ],
    aspect: "portrait",
  },
];

export const FEATURED_PRODUCTS: FeaturedProduct[] = [
  {
    id: "solas-tape",
    impaCode: "IMPA 330189",
    name: "Retro-Reflective Tape, SOLAS Grade",
    division: "SOLAS Equipment",
    image: "/images/prod-solas-tape.png",
    alt: "IMPA 330189 SOLAS grade retro-reflective marine tape",
    summary:
      "High-intensity encapsulated-lens retro-reflective marine tape certified for lifeboats, liferafts, lifejackets, and immersion suits.",
    specs: ["50mm × 45.7m Roll", "IMO Res. A.658(16)", "Saltwater & UV Resistant"],
  },
  {
    id: "cotton-gloves",
    impaCode: "IMPA 190103",
    name: "Working Gloves Cotton Non-Slip Dot",
    division: "Safety Equipment",
    image: "/images/prod-gloves.png",
    alt: "IMPA 190103 knitted cotton working gloves with PVC non-slip dots",
    summary:
      "Breathable heavy-knit cotton working gloves reinforced with high-grip PVC dots on palm and fingers for deck and cargo handling.",
    specs: ["High-Grip PVC Dots", "Elasticated Knit Wrist", "12-Pair Bulk Packs"],
  },
  {
    id: "plastic-steel",
    impaCode: "IMPA 812256",
    name: "Faseal Plastic Steel Liquid (A & B) 500g",
    division: "Marine Paints & Chemical",
    image: "/images/prod-epoxy.png",
    alt: "IMPA 812256 Faseal A and B epoxy liquid plastic steel 500g",
    summary:
      "Two-component steel-filled epoxy compound for rapid cold-weld structural repairs on pipes, pump casings, valves, and tanks.",
    specs: ["500g A+B Kit", "Machinable Steel Finish", "Chemical & Oil Resistant"],
  },
  {
    id: "pneumatic-drill",
    impaCode: "IMPA 590112",
    name: "Heavy-Duty Pneumatic Air Drill",
    division: "Engine Stores",
    image: "/images/prod-drill.jpg",
    alt: "Industrial pneumatic air drill for vessel engine room maintenance",
    summary:
      "Reversible industrial air drill designed for safe spark-free operation in shipboard workshops and maintenance bays.",
    specs: ["10mm–13mm Chuck", "6.2 Bar Working Pressure", "Ergonomic Exhaust Handle"],
  },
  {
    id: "angle-grinder",
    impaCode: "IMPA 590304",
    name: "Pneumatic Angle Grinder + Wire Cup Brush",
    division: "Engine Stores",
    image: "/images/prod-grinder.jpg",
    alt: "Pneumatic angle grinder fitted with heavy-duty red wire cup brush",
    summary:
      "High-torque air angle grinder paired with crimped wire cup brush for rapid rust scaling, weld prep, and deck coating removal.",
    specs: ["11,000 RPM Free Speed", "Safety Throttle Lever", "Surface Prep Ready"],
  },
  {
    id: "hammar-h20r",
    impaCode: "IMPA 330815",
    name: "Hammar H20R Hydrostatic Release Unit",
    division: "SOLAS Equipment",
    image: "/images/prod-hammar.jpg",
    alt: "Hammar H20R hydrostatic release unit for marine liferafts",
    summary:
      "Original Hammar H20R hydrostatic release unit engineered to automatically deploy liferafts between 1.5m and 4.0m depth.",
    specs: ["2-Year Service Life", "SOLAS / MED / USCG", "Zero Corrosion Housing"],
  },
];

export const MORDEC_SLIDES: MordecSlide[] = [
  {
    page: 1,
    title: "MORDEC™ Preventive Maintenance Program",
    subtitle: "Wire Rope & Marine Equipment Protection",
    focusArea: "Overview & Corrosion Defense",
    description:
      "Comprehensive preventive lubrication systems developed by Mordec International to extend steel wire rope service life under extreme saltwater exposure, cyclic bending, and high-load winch operations.",
    keySpecs: [
      "Core-to-strand penetration technology",
      "Reduces internal fretting & strand fatigue",
      "IMO / VGP environmental compliance options",
    ],
    recommendedFor: "Mooring winches, deck cranes, lifeboat falls & anchor handling",
  },
  {
    page: 2,
    title: "Core Penetration & Moisture Displacement",
    subtitle: "Deep-Core Capillary Barrier",
    focusArea: "Internal Strand Protection",
    description:
      "Conventional surface greases seal moisture inside the rope core. Mordec formulations displace trapped brine and penetrate directly into the hemp or IWRC steel core.",
    keySpecs: [
      "Hydrophobic barrier against sea spray",
      "Eliminates hidden internal core rust",
      "Zero drip under tropical deck heat",
    ],
    recommendedFor: "Cranes, gantry hoists & offshore tug towlines",
  },
  {
    page: 3,
    title: "Extreme-Pressure Load Film",
    subtitle: "Sheave & Drum Abrasion Control",
    focusArea: "High-Contact Tribology",
    description:
      "Forms a resilient boundary lubricating film between adjacent wire strands and sheaves, minimizing metal-to-metal wear during heavy cargo lifts and mooring tensioning.",
    keySpecs: [
      "High Timken OK load rating",
      "Prevents bird-caging & outer-wire flattening",
      "Stable viscosity from -20°C to +90°C",
    ],
    recommendedFor: "Cargo gear, grab cranes & heavy-lift derricks",
  },
  {
    page: 4,
    title: "Pressure Lubricator Application Systems",
    subtitle: "Clean, Fast & Zero-Waste Greasing",
    focusArea: "Maintenance Hardware",
    description:
      "High-pressure collar applicators force lubricant evenly through every lay of wire rope up to 1,500 meters per hour—cutting crew man-hours by up to 75% versus manual brushing.",
    keySpecs: [
      "Fits wire diameters 8mm to 64mm",
      "Scraper pre-cleans old grime & salt crust",
      "Air-operated pump integration",
    ],
    recommendedFor: "Fleet maintenance teams & dry-dock overhauls",
  },
  {
    page: 5,
    title: "Open Gear & Slew Ring Shield",
    subtitle: "Heavy-Duty Adhesive Tackiness",
    focusArea: "Crane Pedestals & Winch Gears",
    description:
      "High-tack synthetic complex compounds resist wash-off from green water and deck washdowns while cushioning shock loads on exposed crane ring gears and windlass pinions.",
    keySpecs: [
      "Water washout resistance < 1.5%",
      "MoS2 & graphite solid boundary additives",
      "No fling-off at operational RPM",
    ],
    recommendedFor: "Anchor windlasses, slewing bearings & capstans",
  },
  {
    page: 6,
    title: "Eco-Safe Biodegradable Marine Grade",
    subtitle: "EAL / VGP Compliant Formulations",
    focusArea: "Environmental Stewardship",
    description:
      "Readily biodegradable, non-bioaccumulative lubricants designed for vessels operating in sensitive coastal waters, Chilean fjords, and US EPA VGP regulated ports.",
    keySpecs: [
      "OECD 301B readily biodegradable",
      "Non-toxic to marine organisms",
      "Full SDS & technical dossier supplied",
    ],
    recommendedFor: "Lifeboat falls, davits & coastal passenger/cargo ships",
  },
  {
    page: 7,
    title: "Inspection & Non-Destructive Testing Support",
    subtitle: "Translucent Film Visibility",
    focusArea: "Port State & Class Readiness",
    description:
      "Translucent amber protective film allows Chief Officers and surveyors to visually inspect broken outer wires and corrosion status without stripping protective grease layers.",
    keySpecs: [
      "Visual strand inspection without degreasing",
      "Supports Class & PMS maintenance logs",
      "Simplifies annual crane wire certification",
    ],
    recommendedFor: "LSA falls, gangway wires & Class annual surveys",
  },
  {
    page: 8,
    title: "Chilean Port Supply & Technical Dossier",
    subtitle: "Authorized Distribution — Marine Suppliers Chile SPA",
    focusArea: "Stock & Rapid Dispatch",
    description:
      "Available directly through Marine Suppliers Chile SPA in pails, drums, and complete applicator kits with technical onboarding for your vessel engineering crew.",
    keySpecs: [
      "Local stock for rapid port turnaround",
      "Bundled applicator + grease packages",
      "24/7 technical quotation response",
    ],
    recommendedFor: "All commercial vessels calling Chilean ports",
  },
];

export const CHILEAN_PORTS = [
  "VALPARAÍSO",
  "SAN ANTONIO",
  "QUINTERO",
  "TALCAHUANO",
  "SAN VICENTE",
  "CORONEL",
  "ANTOFAGASTA",
  "MEJILLONES",
  "IQUIQUE",
  "PUERTO MONTT",
  "PUNTA ARENAS",
];
