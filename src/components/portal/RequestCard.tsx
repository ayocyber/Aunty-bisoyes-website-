"use client";

import { motion } from "framer-motion";
import { Calendar, Check, MapPin, MessageCircle, UserRound, Wallet, X } from "lucide-react";
import { categories } from "@/lib/data";
import {
  STATUS_FLOW,
  URGENCY,
  cancelRequest,
  statusIndex,
  statusOf,
  type ConciergeRequest,
} from "@/lib/portal";
import { openConciergeChat } from "@/components/chat/ConciergeChat";
import { luxEase } from "@/components/ui/Reveal";

function ago(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function RequestCard({ request: r, now }: { request: ConciergeRequest; now: number }) {
  const cat = categories.find((c) => c.id === r.category)!;
  const status = statusOf(r, now);
  const idx = statusIndex(status);
  const done = status === "confirmed";
  const progress = (idx / (STATUS_FLOW.length - 1)) * 100;

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.5, ease: luxEase }}
      className={`lux-card p-6 sm:p-7 ${r.cancelled ? "opacity-50" : ""}`}
    >
      <div className="flex items-start gap-4">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl border border-gold/20 bg-gold/[0.06] text-gold">
          <cat.icon className="size-5" strokeWidth={1.25} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.18em]">
            <span className="text-mist">{r.id}</span>
            <span className="text-gold">{cat.short}</span>
            {r.urgency !== "standard" && (
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  r.urgency === "immediate" ? "bg-[#e57c63]/15 text-[#f0a08b]" : "bg-gold/15 text-gold-light"
                }`}
              >
                {URGENCY[r.urgency].label}
              </span>
            )}
          </div>
          <h3 className="mt-2 font-serif text-2xl leading-snug text-ivory">{r.title}</h3>
        </div>
        <span className="hidden shrink-0 text-xs text-mist sm:block">{ago(now - r.createdAt)}</span>
      </div>

      <dl className="mt-5 grid gap-x-6 gap-y-2 text-sm text-stone sm:grid-cols-2">
        <div className="flex items-center gap-2">
          <MapPin className="size-3.5 shrink-0 text-gold/70" />
          <dt className="sr-only">Location</dt>
          <dd className="truncate">{r.location}</dd>
        </div>
        <div className="flex items-center gap-2">
          <Wallet className="size-3.5 shrink-0 text-gold/70" />
          <dt className="sr-only">Budget</dt>
          <dd>{r.budget}</dd>
        </div>
        {r.date && (
          <div className="flex items-center gap-2">
            <Calendar className="size-3.5 shrink-0 text-gold/70" />
            <dt className="sr-only">Date</dt>
            <dd>{new Date(r.date + "T12:00:00").toLocaleDateString(undefined, { day: "numeric", month: "long", year: "numeric" })}</dd>
          </div>
        )}
        <div className="flex items-center gap-2">
          <UserRound className="size-3.5 shrink-0 text-gold/70" />
          <dt className="sr-only">Concierge</dt>
          <dd>{idx >= 1 ? r.assignee : "Assigning…"}</dd>
        </div>
      </dl>

      {r.instructions && (
        <p className="mt-4 rounded-xl border-l-2 border-gold/40 bg-obsidian/50 px-4 py-3 text-sm leading-relaxed text-stone italic">
          {r.instructions}
        </p>
      )}

      {/* Live status tracker */}
      {r.cancelled ? (
        <p className="mt-6 text-sm text-mist">This request was withdrawn.</p>
      ) : (
        <div className="mt-7" aria-label={`Status: ${STATUS_FLOW[idx].label}`}>
          <div className="relative mx-3">
            <div className="absolute top-[11px] right-0 left-0 h-px bg-ivory/10" />
            <motion.div
              className="absolute top-[11px] left-0 h-px bg-gradient-to-r from-gold-deep via-gold to-gold-light shadow-[0_0_12px_rgba(201,169,110,0.8)]"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1.2, ease: luxEase }}
            />
            <ol className="relative flex justify-between">
              {STATUS_FLOW.map((s, i) => {
                const reached = i <= idx;
                const current = i === idx && !done;
                return (
                  <li key={s.id} className="flex w-6 flex-col items-center">
                    <span
                      className={`relative grid size-6 place-items-center rounded-full border transition-all duration-700 ${
                        reached ? "border-gold bg-gold text-obsidian" : "border-ivory/20 bg-onyx"
                      }`}
                    >
                      {current && <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />}
                      {reached && <Check className="relative size-3" strokeWidth={3} />}
                    </span>
                  </li>
                );
              })}
            </ol>
          </div>
          <ol className="mt-3 grid grid-cols-4 text-center text-[10px] leading-tight uppercase tracking-[0.12em] sm:text-[11px]">
            {STATUS_FLOW.map((s, i) => (
              <li
                key={s.id}
                className={`${i === 0 ? "text-left" : i === STATUS_FLOW.length - 1 ? "text-right" : ""} ${
                  i <= idx ? "text-gold-light" : "text-mist"
                }`}
              >
                {s.label}
              </li>
            ))}
          </ol>
        </div>
      )}

      {!r.cancelled && (
        <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-ivory/5 pt-5">
          <button
            onClick={openConciergeChat}
            className="inline-flex items-center gap-2 rounded-full border border-ivory/10 px-4 py-2 text-xs text-stone transition hover:border-gold/60 hover:text-gold-light"
          >
            <MessageCircle className="size-3.5" /> Message concierge
          </button>
          {!done && (
            <button
              onClick={() => cancelRequest(r.id)}
              className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs text-mist transition hover:text-[#f0a08b]"
            >
              <X className="size-3.5" /> Withdraw
            </button>
          )}
          {done && (
            <span className="ml-auto inline-flex items-center gap-1.5 text-xs text-emerald-300">
              <Check className="size-3.5" /> Itinerary sent to your inbox
            </span>
          )}
        </div>
      )}
    </motion.article>
  );
}
