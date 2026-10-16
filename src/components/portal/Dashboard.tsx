"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { Bell, CircleCheckBig, Hourglass, LogOut, MessageCircle, Plus, RotateCcw, Sparkles } from "lucide-react";
import { requestStore, resetDemo, sessionStore, statusOf, type ConciergeRequest, type Member } from "@/lib/portal";
import { RequestBuilder } from "./RequestBuilder";
import { RequestCard } from "./RequestCard";
import { Monogram } from "@/components/ui/Logo";
import { openConciergeChat } from "@/components/chat/ConciergeChat";
import { luxEase } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

type Tab = "active" | "confirmed" | "all";

/** Re-renders every `ms` so status trackers advance live. */
function useNow(ms = 1000) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), ms);
    return () => window.clearInterval(id);
  }, [ms]);
  return now;
}

function greeting(d: Date) {
  const h = d.getHours();
  return h < 12 ? "Good morning" : h < 18 ? "Good afternoon" : "Good evening";
}

export function Dashboard({ member }: { member: Member }) {
  const stored = requestStore.useStore();
  const requests = useMemo(() => stored ?? [], [stored]);
  const now = useNow();
  const [tab, setTab] = useState<Tab>("active");
  const [toast, setToast] = useState<ConciergeRequest | null>(null);

  const { active, confirmed } = useMemo(() => {
    const live = requests.filter((r) => !r.cancelled);
    return {
      active: live.filter((r) => statusOf(r, now) !== "confirmed"),
      confirmed: live.filter((r) => statusOf(r, now) === "confirmed"),
    };
  }, [requests, now]);

  const shown = tab === "active" ? active : tab === "confirmed" ? confirmed : requests;

  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 5000);
    return () => window.clearTimeout(id);
  }, [toast]);

  return (
    <div className="container-lux pt-32 pb-28">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: luxEase }}
        className="flex flex-col justify-between gap-6 md:flex-row md:items-end"
      >
        <div>
          <p className="eyebrow">Private Client Portal</p>
          <h1 className="mt-5 font-serif text-5xl leading-none font-light text-ivory sm:text-6xl">
            {greeting(new Date(now))}, <em className="text-gold-light">{member.salutation}</em>
          </h1>
        </div>
        <div className="flex gap-2">
          <a href="#request-builder" className="btn-gold !px-5 !py-3 lg:hidden">
            <Plus className="size-4" /> New request
          </a>
          <button
            onClick={() => sessionStore.set(null)}
            className="btn-ghost !px-5 !py-3"
            aria-label="Sign out"
          >
            <LogOut className="size-4" strokeWidth={1.5} /> <span className="hidden sm:inline">Sign out</span>
          </button>
        </div>
      </motion.div>

      {/* Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1, ease: luxEase }}
        className="mt-12 grid gap-5 lg:grid-cols-12"
      >
        {/* Membership card */}
        <div className="relative overflow-hidden rounded-2xl border border-gold/30 bg-[linear-gradient(135deg,#2a2218_0%,#14110d_45%,#2b2419_100%)] p-7 shadow-[0_30px_80px_-40px_rgba(201,169,110,0.5)] lg:col-span-5">
          <div className="pointer-events-none absolute inset-0 animate-shimmer bg-[linear-gradient(110deg,transparent_30%,rgba(232,213,176,0.12)_50%,transparent_70%)] bg-[length:250%_100%]" />
          <div className="relative flex h-full min-h-[180px] flex-col justify-between">
            <div className="flex items-start justify-between">
              <Monogram className="size-12 text-gold-light" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-gold">{member.tier}</span>
            </div>
            <div>
              <p className="font-serif text-3xl text-ivory">{member.name}</p>
              <div className="mt-2 flex justify-between text-[11px] tracking-[0.2em] text-stone uppercase">
                <span>{member.memberNo}</span>
                <span>Since {member.since}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-5 lg:col-span-4">
          <Stat icon={Hourglass} label="In motion" value={active.length} />
          <Stat icon={CircleCheckBig} label="Confirmed" value={confirmed.length} />
          <div className="col-span-2 flex items-center gap-3 rounded-2xl border border-gold/10 bg-onyx/80 p-5 text-sm text-stone">
            <Bell className="size-4 shrink-0 text-gold" />
            <span className="truncate">
              {active[0] ? `Latest: ${active[0].title}` : "All requests are confirmed."}
            </span>
          </div>
        </div>

        {/* Lifestyle manager */}
        <div className="flex items-center gap-4 rounded-2xl border border-gold/10 bg-onyx/80 p-6 lg:col-span-3 lg:flex-col lg:items-start lg:justify-between">
          <div className="flex items-center gap-4">
            <span className="relative size-14 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/50">
              <Image src="/images/bisoye.jpg" alt={site.founder} fill sizes="56px" className="object-cover object-[50%_20%]" />
            </span>
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-mist">Your lifestyle manager</p>
              <p className="font-serif text-2xl text-ivory">{site.founder}</p>
              <p className="flex items-center gap-1.5 text-xs text-emerald-300">
                <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-400" /> Available now
              </p>
            </div>
          </div>
          <button onClick={openConciergeChat} className="btn-ghost ml-auto !px-4 !py-2.5 lg:ml-0 lg:w-full">
            <MessageCircle className="size-4" strokeWidth={1.5} /> <span className="hidden sm:inline">Message</span>
          </button>
        </div>
      </motion.div>

      {/* Main */}
      <div className="mt-14 grid items-start gap-10 lg:grid-cols-12">
        <section className="lg:col-span-7 xl:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h2 className="font-serif text-3xl text-ivory">Your requests</h2>
            <LayoutGroup>
              <div role="tablist" className="flex rounded-full border border-ivory/10 p-1">
                {(
                  [
                    ["active", `Active · ${active.length}`],
                    ["confirmed", `Confirmed · ${confirmed.length}`],
                    ["all", "All"],
                  ] as [Tab, string][]
                ).map(([id, label]) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`relative rounded-full px-4 py-2 text-xs font-medium transition-colors ${
                      tab === id ? "text-obsidian" : "text-stone hover:text-ivory"
                    }`}
                  >
                    {tab === id && (
                      <motion.span
                        layoutId="portal-tab"
                        className="absolute inset-0 -z-10 rounded-full bg-gold"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {label}
                  </button>
                ))}
              </div>
            </LayoutGroup>
          </div>

          <div className="mt-8 space-y-5">
            <AnimatePresence mode="popLayout" initial={false}>
              {shown.map((r) => (
                <RequestCard key={r.id} request={r} now={now} />
              ))}
            </AnimatePresence>
            {shown.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gold/20 p-12 text-center">
                <Sparkles className="mx-auto size-6 text-gold" strokeWidth={1.25} />
                <p className="mt-4 font-serif text-2xl text-ivory">Nothing here just yet.</p>
                <p className="mt-2 text-sm text-stone">Your next extraordinary moment is one request away.</p>
              </div>
            )}
          </div>

          <button
            onClick={resetDemo}
            className="mt-8 inline-flex items-center gap-2 text-xs text-mist transition hover:text-stone"
          >
            <RotateCcw className="size-3.5" /> Reset demo data
          </button>
        </section>

        <aside className="lg:sticky lg:top-28 lg:col-span-5 xl:col-span-4">
          <RequestBuilder
            onCreated={(r) => {
              setTab("active");
              setToast(r);
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </aside>
      </div>

      {/* Confirmation toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            role="status"
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.5, ease: luxEase }}
            className="fixed top-24 left-1/2 z-[65] flex w-[calc(100%-2rem)] max-w-md items-center gap-4 rounded-2xl border border-gold/30 bg-onyx/95 p-4 shadow-2xl backdrop-blur-xl"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gold text-obsidian">
              <CircleCheckBig className="size-5" />
            </span>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-ivory">Request {toast.id} received</p>
              <p className="truncate text-xs text-stone">{toast.title} — opened in WhatsApp. Tap send to confirm.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Bell; label: string; value: number }) {
  return (
    <div className="rounded-2xl border border-gold/10 bg-onyx/80 p-5">
      <Icon className="size-5 text-gold" strokeWidth={1.25} />
      <motion.p
        key={value}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-4 font-serif text-5xl text-ivory"
      >
        {value}
      </motion.p>
      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-mist">{label}</p>
    </div>
  );
}
