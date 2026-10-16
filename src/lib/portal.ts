"use client";

import { createPersistentStore } from "./store";
import type { CategoryId } from "./data";

export type Urgency = "standard" | "urgent" | "immediate";
export type Status = "received" | "assigned" | "in_progress" | "confirmed";

export const STATUS_FLOW: { id: Status; label: string }[] = [
  { id: "received", label: "Received" },
  { id: "assigned", label: "Concierge Assigned" },
  { id: "in_progress", label: "In Progress" },
  { id: "confirmed", label: "Confirmed" },
];

export const URGENCY: Record<Urgency, { label: string; note: string }> = {
  standard: { label: "Standard", note: "Within 24 hours" },
  urgent: { label: "Urgent", note: "Within 2 hours" },
  immediate: { label: "Immediate 24/7", note: "Actioned now" },
};

export const BUDGETS = [
  "Under $10,000",
  "$10,000 – $50,000",
  "$50,000 – $250,000",
  "$250,000 – $1M",
  "$1M+",
  "Discretionary",
] as const;

/** Seconds after creation at which each status is reached, by urgency. */
const TIMELINE: Record<Urgency, number[]> = {
  immediate: [0, 12, 40, 110],
  urgent: [0, 25, 90, 240],
  standard: [0, 60, 200, 600],
};

export type ConciergeRequest = {
  id: string;
  category: CategoryId;
  title: string;
  urgency: Urgency;
  location: string;
  budget: string;
  date?: string;
  instructions?: string;
  createdAt: number;
  /** Holds a request at a given stage (for long-running mandates). */
  holdAt?: Status;
  cancelled?: boolean;
  assignee: string;
};

export type Member = {
  name: string;
  salutation: string;
  email: string;
  tier: string;
  memberNo: string;
  since: string;
};

export const DEMO_MEMBER: Member = {
  name: "Adaeze Okafor",
  salutation: "Ms. Okafor",
  email: "member@beestouch.com",
  tier: "Global Elite",
  memberNo: "BT · 0427 · 1188",
  since: "2023",
};
export const DEMO_PASSCODE = "246810";

const ASSIGNEES = ["Abisoye L.", "Tomi R.", "Kemi O.", "Daniel M."];

export function statusOf(r: ConciergeRequest, now: number): Status {
  const elapsed = (now - r.createdAt) / 1000;
  const marks = TIMELINE[r.urgency];
  let idx = 0;
  for (let i = 0; i < marks.length; i++) if (elapsed >= marks[i]) idx = i;
  if (r.holdAt) idx = Math.min(idx, STATUS_FLOW.findIndex((s) => s.id === r.holdAt));
  return STATUS_FLOW[idx].id;
}

export function statusIndex(s: Status) {
  return STATUS_FLOW.findIndex((x) => x.id === s);
}

const now = () => Date.now();
const hours = (h: number) => h * 3_600_000;

function seedRequests(): ConciergeRequest[] {
  const t = now();
  return [
    {
      id: "BT-24817",
      category: "aviation",
      title: "Gulfstream G650 — Lagos to Nice",
      urgency: "urgent",
      location: "Lagos (LOS) → Nice (NCE)",
      budget: "$50,000 – $250,000",
      date: new Date(t + hours(24 * 6)).toISOString().slice(0, 10),
      instructions: "Four passengers, one small dog. Halal catering, still water only. Car to Hôtel du Cap.",
      createdAt: t - 50_000,
      assignee: "Abisoye L.",
    },
    {
      id: "BT-24790",
      category: "estate",
      title: "Off-market townhouse search — Knightsbridge",
      urgency: "standard",
      location: "London, United Kingdom",
      budget: "$1M+",
      instructions: "5 bedrooms minimum, garden, close to Hill House school. Strictly NDA.",
      createdAt: t - hours(72),
      holdAt: "in_progress",
      assignee: "Kemi O.",
    },
    {
      id: "BT-24733",
      category: "dining",
      title: "Chef's counter for six — Saturday",
      urgency: "standard",
      location: "Mayfair, London",
      budget: "Under $10,000",
      date: new Date(t - hours(24 * 2)).toISOString().slice(0, 10),
      instructions: "Anniversary — discreet champagne on arrival.",
      createdAt: t - hours(24 * 5),
      assignee: "Tomi R.",
    },
    {
      id: "BT-24688",
      category: "access",
      title: "Paddock Club — Abu Dhabi Grand Prix",
      urgency: "standard",
      location: "Yas Marina, Abu Dhabi",
      budget: "$50,000 – $250,000",
      createdAt: t - hours(24 * 12),
      assignee: "Abisoye L.",
    },
  ];
}

export const sessionStore = createPersistentStore<Member | null>("mb:session-v2", () => null);
export const requestStore = createPersistentStore<ConciergeRequest[]>("mb:requests-v3", seedRequests);
/** Carries a selected service from the catalog into the request builder. */
export const prefillStore = createPersistentStore<{ category: CategoryId; title: string } | null>(
  "mb:prefill",
  () => null,
);

export function createRequest(
  input: Omit<ConciergeRequest, "id" | "createdAt" | "assignee">,
): ConciergeRequest {
  const req: ConciergeRequest = {
    ...input,
    id: `BT-${Math.floor(25000 + Math.random() * 9000)}`,
    createdAt: now(),
    assignee: input.urgency === "immediate" ? "Abisoye L." : ASSIGNEES[Math.floor(Math.random() * ASSIGNEES.length)],
  };
  requestStore.set((prev) => [req, ...prev]);
  return req;
}

export function cancelRequest(id: string) {
  requestStore.set((prev) => prev.map((r) => (r.id === id ? { ...r, cancelled: true } : r)));
}

export function resetDemo() {
  requestStore.set(seedRequests());
}
