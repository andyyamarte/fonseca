import { promises as fs } from "fs";
import path from "path";

export type QuotationStatus = "pending" | "quoted" | "dispatched";

export interface QuotationRecord {
  id: string;
  vesselName: string;
  port: string;
  contactName: string;
  email: string;
  division: string;
  items: string[];
  message: string;
  attachmentNames: string[];
  status: QuotationStatus;
  createdAt: string;
}

// Serverless filesystems are read-only except for /tmp, so use it on Vercel.
const DATA_DIR = process.env.VERCEL
  ? path.join("/tmp", "fonseca-data")
  : path.join(process.cwd(), ".data");
const DATA_FILE = path.join(DATA_DIR, "quotations.json");

const SEED_QUOTATIONS: QuotationRecord[] = [
  {
    id: "QT-2026-041",
    vesselName: "M/V PACIFIC HORIZON",
    port: "Valparaíso",
    contactName: "Capt. Henrik Lindqvist",
    email: "master@pacifichorizon.ship",
    division: "SOLAS EQUIPMENTS SERVICES AND SUPPLY",
    items: ["IMPA 330189 — Retro-Reflective Tape", "IMPA 330815 — Hammar H20R"],
    message: "ETA Valparaíso Berth 3 on Nov 28. Need 6x Hammar H20R units with fresh certificates and 4 rolls SOLAS tape prior to PSC inspection.",
    attachmentNames: ["vessel-requisition-solas.pdf"],
    status: "quoted",
    createdAt: "2026-11-24T14:20:00.000Z",
  },
  {
    id: "QT-2026-042",
    vesselName: "M/T ATACAMA TRADER",
    port: "San Antonio",
    contactName: "Ch. Eng. Marco Bellini",
    email: "ce@atacamatrader.cl",
    division: "ENGINE STORES",
    items: ["IMPA 590304 — Pneumatic Angle Grinder", "IMPA 812256 — Faseal Plastic Steel", "MORDEC Wire Rope Grease"],
    message: "Requesting urgent quayside supply alongside bunkering window. Include Mordec 20kg pail and pneumatic scaling brush kit.",
    attachmentNames: [],
    status: "pending",
    createdAt: "2026-11-25T09:15:00.000Z",
  },
  {
    id: "QT-2026-043",
    vesselName: "M/V SOUTHERN FJORD",
    port: "Puerto Montt",
    contactName: "Purser Elena Morales",
    email: "supplies@southernfjord.com",
    division: "PROVISIONS",
    items: ["PROVISIONS", "CABIN STORES"],
    message: "Full crew of 24 for 35-day southern transit. Fresh produce, halal poultry, and cabin linen replenishment required.",
    attachmentNames: ["provisions-manifest-nov.xlsx"],
    status: "dispatched",
    createdAt: "2026-11-23T18:45:00.000Z",
  },
];

async function ensureDataFile(): Promise<QuotationRecord[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const raw = await fs.readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as QuotationRecord[];
    return Array.isArray(parsed) ? parsed : SEED_QUOTATIONS;
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(SEED_QUOTATIONS, null, 2), "utf8");
    return SEED_QUOTATIONS;
  }
}

export async function listQuotations(): Promise<QuotationRecord[]> {
  const records = await ensureDataFile();
  return records.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createQuotation(
  input: Omit<QuotationRecord, "id" | "status" | "createdAt">
): Promise<QuotationRecord> {
  const records = await ensureDataFile();
  const nextNum = 44 + records.length;
  const newRecord: QuotationRecord = {
    ...input,
    id: `QT-2026-0${nextNum}`,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
  const updated = [newRecord, ...records];
  await fs.writeFile(DATA_FILE, JSON.stringify(updated, null, 2), "utf8");
  return newRecord;
}

export async function updateQuotationStatus(
  id: string,
  status: QuotationStatus
): Promise<QuotationRecord | null> {
  const records = await ensureDataFile();
  const idx = records.findIndex((item) => item.id === id);
  if (idx === -1) return null;
  records[idx] = { ...records[idx], status };
  await fs.writeFile(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
  return records[idx];
}

export async function deleteQuotation(id: string): Promise<boolean> {
  const records = await ensureDataFile();
  const filtered = records.filter((item) => item.id !== id);
  if (filtered.length === records.length) return false;
  await fs.writeFile(DATA_FILE, JSON.stringify(filtered, null, 2), "utf8");
  return true;
}
