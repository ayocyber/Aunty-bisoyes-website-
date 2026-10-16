"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowUpRight, Check, Clock, Globe, Search, X, ArrowRight, MessageCircle } from "lucide-react";
import { categories, services, type CategoryId, type Service } from "@/lib/data";
import { prefillStore } from "@/lib/portal";
import { luxEase } from "@/components/ui/Reveal";
import { openConciergeChat } from "@/components/chat/ConciergeChat";

type Filter = CategoryId | "all";

const categoryOf = (id: CategoryId) => categories.find((c) => c.id === id)!;

export function Catalog() {
  const [filter, setFilter] = useState<Filter>("all");
  const [query, setQuery] = useState("");
  const [active, setActive] = useState<Service | null>(null);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return services.filter(
      (s) =>
        (filter === "all" || s.category === filter) &&
        (!q || `${s.title} ${s.summary} ${s.description}`.toLowerCase().includes(q)),
    );
  }, [filter, query]);

  return (
    <>
      {/* Toolbar */}
      <div className="sticky top-20 z-30 -mx-5 border-y border-gold/10 bg-obsidian/85 px-5 py-4 backdrop-blur-xl sm:-mx-8 sm:px-8 lg:-mx-12 lg:px-12 2xl:-mx-16 2xl:px-16">
        <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
          <LayoutGroup>
            <div
              role="tablist"
              aria-label="Filter services"
              className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] xl:pb-0"
            >
              {[{ id: "all" as Filter, short: "All Services" }, ...categories].map((c) => {
                const selected = filter === c.id;
                return (
                  <button
                    key={c.id}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setFilter(c.id)}
                    className={`relative shrink-0 rounded-full px-5 py-2.5 text-[13px] font-medium transition-colors duration-300 ${
                      selected ? "text-obsidian" : "text-stone hover:text-ivory"
                    }`}
                  >
                    {selected && (
                      <motion.span
                        layoutId="filter-pill"
                        className="absolute inset-0 -z-10 rounded-full bg-gold shadow-[0_0_30px_-8px_rgba(201,169,110,0.8)]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    {c.short}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
          <label className="relative block xl:w-80">
            <span className="sr-only">Search services</span>
            <Search className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-mist" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search — e.g. yacht, Wimbledon…"
              className="field !rounded-full !py-2.5 !pl-11"
            />
          </label>
        </div>
      </div>

      {/* Grid */}
      <motion.div layout className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {visible.map((s) => {
            const cat = categoryOf(s.category);
            return (
              <motion.button
                layout
                key={s.id}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.5, ease: luxEase }}
                onClick={() => setActive(s)}
                className="lux-card group flex flex-col p-8 text-left hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <span className="grid size-14 place-items-center rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/15 to-transparent text-gold transition-all duration-500 group-hover:scale-105 group-hover:border-gold/50">
                    <cat.icon className="size-6" strokeWidth={1.25} />
                  </span>
                  <span className="grid size-10 place-items-center rounded-full border border-ivory/10 text-stone transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian">
                    <ArrowUpRight className="size-4" />
                  </span>
                </div>
                <p className="mt-8 text-[10px] font-semibold uppercase tracking-[0.25em] text-gold">{cat.short}</p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-ivory">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-stone">{s.summary}</p>
                <div className="mt-auto flex items-center gap-2 pt-8 text-xs text-mist">
                  <Clock className="size-3.5 text-gold/70" /> {s.leadTime}
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {visible.length === 0 && (
        <div className="mt-12 rounded-2xl border border-dashed border-gold/20 p-16 text-center">
          <p className="font-serif text-3xl text-ivory">Not listed — but rarely impossible.</p>
          <p className="mt-3 text-stone">Tell us what you have in mind and we’ll make it happen.</p>
          <button onClick={openConciergeChat} className="btn-gold mt-8">
            <MessageCircle className="size-4" /> Ask the concierge
          </button>
        </div>
      )}

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </>
  );
}

function ServiceModal({ service, onClose }: { service: Service | null; onClose: () => void }) {
  const router = useRouter();

  useEffect(() => {
    if (!service) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [service, onClose]);

  const request = () => {
    if (!service) return;
    prefillStore.set({ category: service.category, title: service.title });
    router.push("/portal");
  };

  return (
    <AnimatePresence>
      {service && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
        >
          <div className="absolute inset-0 bg-obsidian/80 backdrop-blur-md" onClick={onClose} aria-hidden />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="service-title"
            initial={{ opacity: 0, y: 60, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.98 }}
            transition={{ duration: 0.55, ease: luxEase }}
            className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-gold/25 bg-onyx shadow-[0_60px_160px_-40px_rgba(0,0,0,1),0_0_80px_-40px_rgba(201,169,110,0.6)] sm:rounded-3xl"
          >
            {(() => {
              const cat = categoryOf(service.category);
              return (
                <>
                  <div className="relative overflow-hidden border-b border-gold/10 px-7 pt-10 pb-8 sm:px-12">
                    <div className="absolute -top-20 -right-20 size-72 rounded-full bg-gold/15 blur-[90px]" />
                    <cat.icon className="absolute -right-6 -bottom-10 size-56 text-gold/[0.06]" strokeWidth={0.75} />
                    <button
                      onClick={onClose}
                      autoFocus
                      className="absolute top-5 right-5 grid size-11 place-items-center rounded-full border border-ivory/15 text-stone transition hover:border-gold hover:text-gold"
                      aria-label="Close"
                    >
                      <X className="size-5" strokeWidth={1.5} />
                    </button>
                    <p className="eyebrow">{cat.label}</p>
                    <h2 id="service-title" className="mt-5 pr-10 font-serif text-4xl leading-tight text-ivory sm:text-5xl">
                      {service.title}
                    </h2>
                    <p className="relative mt-5 max-w-2xl text-lg leading-relaxed text-stone">{service.description}</p>
                    <div className="relative mt-8 flex flex-wrap gap-3 text-sm">
                      <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-obsidian/60 px-4 py-2 text-ivory/85">
                        <Clock className="size-4 text-gold" /> Lead time: {service.leadTime}
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-gold/20 bg-obsidian/60 px-4 py-2 text-ivory/85">
                        <Globe className="size-4 text-gold" /> {service.coverage}
                      </span>
                    </div>
                  </div>

                  <div className="grid gap-10 px-7 py-10 sm:grid-cols-5 sm:px-12">
                    <div className="sm:col-span-3">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">
                        Bespoke fulfilment
                      </h3>
                      <ol className="mt-6 space-y-5">
                        {service.fulfillment.map((f, i) => (
                          <motion.li
                            key={f}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.25 + i * 0.08, duration: 0.5, ease: luxEase }}
                            className="flex gap-4"
                          >
                            <span className="grid size-7 shrink-0 place-items-center rounded-full border border-gold/40 font-serif text-sm text-gold italic">
                              {i + 1}
                            </span>
                            <span className="pt-0.5 text-ivory/85">{f}</span>
                          </motion.li>
                        ))}
                      </ol>
                    </div>
                    <div className="sm:col-span-2">
                      <h3 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Also included</h3>
                      <ul className="mt-6 space-y-3">
                        {service.includes.map((f) => (
                          <li key={f} className="flex items-center gap-3 text-stone">
                            <Check className="size-4 shrink-0 text-gold" /> {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 border-t border-gold/10 bg-obsidian/40 px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-12">
                    <p className="text-sm text-mist">Members only · Fulfilled under NDA</p>
                    <div className="flex flex-col gap-3 sm:flex-row">
                      <button
                        onClick={() => {
                          onClose();
                          openConciergeChat();
                        }}
                        className="btn-ghost !py-3"
                      >
                        <MessageCircle className="size-4" strokeWidth={1.5} /> Ask a question
                      </button>
                      <button onClick={request} className="btn-gold group !py-3">
                        Request this service
                        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                </>
              );
            })()}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
