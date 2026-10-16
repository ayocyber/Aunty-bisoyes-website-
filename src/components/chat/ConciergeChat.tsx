"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Lock, Send, X, Phone, ShieldCheck, MessageCircle } from "lucide-react";
import { createPersistentStore } from "@/lib/store";
import { site } from "@/lib/site";
import { luxEase } from "@/components/ui/Reveal";
import { openWhatsApp } from "@/lib/whatsapp";

type Msg = { id: string; from: "client" | "concierge"; text: string; at: number };

const greeting = (): Msg[] => [
  {
    id: "g1",
    from: "concierge",
    text: `Good day. This is ${site.founder}, your lifestyle manager. Messages here come straight to my private WhatsApp, end-to-end encrypted — how may I be of service?`,
    at: Date.now(),
  },
];

const chatStore = createPersistentStore<Msg[]>("mb:chat-v2", greeting);

const QUICK = ["Charter a jet this week", "A table for tonight", "Event tickets", `Speak to ${site.founder}`];

const HANDOFF = "Your message has opened in WhatsApp — just tap send and I'll reply to you there personally.";

export function ConciergeChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const messages = chatStore.useStore();
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onOpen = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener("mb:open-chat", onOpen);
    const t = timers.current;
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mb:open-chat", onOpen);
      t.forEach(clearTimeout);
    };
  }, []);

  const send = (text: string) => {
    const body = text.trim();
    if (!body) return;
    openWhatsApp(body);
    chatStore.set((prev) => [...prev, { id: crypto.randomUUID(), from: "client", text: body, at: Date.now() }]);
    setDraft("");
    setTyping(true);
    timers.current.push(
      window.setTimeout(() => {
        setTyping(false);
        chatStore.set((prev) => [...prev, { id: crypto.randomUUID(), from: "concierge", text: HANDOFF, at: Date.now() }]);
      }, 900),
    );
  };

  const fmt = (at: number) => new Date(at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <>
      {/* Launcher */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6, ease: luxEase }}
        className="group fixed right-4 bottom-4 z-[60] flex items-center gap-3 rounded-full border border-gold/30 bg-onyx/90 py-2 pr-2 pl-2 shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)] backdrop-blur-xl transition-all duration-500 hover:border-gold/70 hover:shadow-[0_0_50px_-12px_rgba(201,169,110,0.6)] sm:right-6 sm:bottom-6 sm:pr-5"
        aria-label={open ? "Close concierge chat" : "Open concierge chat"}
        aria-expanded={open}
      >
        <span className="relative size-11 overflow-hidden rounded-full ring-1 ring-gold/50">
          <Image src="/images/bisoye.jpg" alt="" fill sizes="44px" className="object-cover object-[50%_20%]" />
        </span>
        <span className="absolute top-2 left-10 size-3 rounded-full border-2 border-onyx bg-emerald-400" />
        <span className="hidden flex-col items-start leading-tight sm:flex">
          <span className="text-[13px] font-semibold text-ivory">Private Line</span>
          <span className="flex items-center gap-1 text-[10px] uppercase tracking-[0.18em] text-gold">
            <Lock className="size-2.5" /> Encrypted · 24/7
          </span>
        </span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.section
            role="dialog"
            aria-label="Encrypted concierge messaging"
            initial={{ opacity: 0, y: 30, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.97 }}
            transition={{ duration: 0.45, ease: luxEase }}
            className="fixed inset-0 z-[70] flex flex-col overflow-hidden bg-onyx sm:inset-auto sm:right-6 sm:bottom-24 sm:h-[min(640px,calc(100vh-8rem))] sm:w-[400px] sm:rounded-3xl sm:border sm:border-gold/25 sm:shadow-[0_40px_120px_-30px_rgba(0,0,0,1),0_0_60px_-30px_rgba(201,169,110,0.5)]"
          >
            {/* Header */}
            <header className="relative border-b border-gold/15 bg-gradient-to-b from-graphite to-onyx px-5 pt-5 pb-4">
              <div className="flex items-center gap-3">
                <span className="relative size-12 shrink-0 overflow-hidden rounded-full ring-1 ring-gold/60">
                  <Image src="/images/bisoye.jpg" alt={site.founder} fill sizes="48px" className="object-cover object-[50%_20%]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-xl leading-none text-ivory">{site.founder}</p>
                  <p className="mt-1.5 flex items-center gap-1.5 text-[11px] text-stone">
                    <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-400" /> Online · Lifestyle Manager
                  </p>
                </div>
                <a
                  href={`tel:${site.phone.replace(/\s/g, "")}`}
                  className="grid size-10 place-items-center rounded-full border border-ivory/10 text-stone transition hover:border-gold/60 hover:text-gold"
                  aria-label="Call concierge"
                >
                  <Phone className="size-4" strokeWidth={1.5} />
                </a>
                <button
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full border border-ivory/10 text-stone transition hover:border-gold/60 hover:text-gold"
                  aria-label="Close"
                >
                  <X className="size-4" strokeWidth={1.5} />
                </button>
              </div>
              <div className="mt-4 flex items-center justify-center gap-2 rounded-full border border-gold/15 bg-gold/5 py-1.5 text-[10px] uppercase tracking-[0.2em] text-gold">
                <ShieldCheck className="size-3.5" strokeWidth={1.5} /> End-to-end encrypted · AES-256
              </div>
            </header>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 space-y-4 overflow-y-auto px-5 py-6" aria-live="polite">
              <p className="text-center text-[10px] uppercase tracking-[0.25em] text-mist">Secure session established</p>
              {messages?.map((m) => (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: luxEase }}
                  className={`flex ${m.from === "client" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-3 text-[14px] leading-relaxed ${
                      m.from === "client"
                        ? "rounded-br-md bg-gradient-to-br from-gold to-gold-deep text-obsidian"
                        : "rounded-bl-md border border-ivory/8 bg-graphite text-ivory/90"
                    }`}
                  >
                    {m.text}
                    <span
                      className={`mt-1.5 block text-right text-[10px] ${
                        m.from === "client" ? "text-obsidian/60" : "text-mist"
                      }`}
                    >
                      {fmt(m.at)}
                      {m.from === "client" && " · Sent to WhatsApp"}
                    </span>
                  </div>
                </motion.div>
              ))}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex w-fit items-center gap-1.5 rounded-2xl rounded-bl-md border border-ivory/8 bg-graphite px-4 py-3.5"
                  >
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="size-1.5 rounded-full bg-gold"
                        animate={{ opacity: [0.3, 1, 0.3], y: [0, -3, 0] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Quick replies + composer */}
            <div className="border-t border-gold/10 bg-obsidian/50 p-4">
              {messages && messages.length < 3 && (
                <div className="mb-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
                  {QUICK.map((q) => (
                    <button key={q} onClick={() => send(q)} className="chip shrink-0 !py-1.5 !text-[12px]">
                      {q}
                    </button>
                  ))}
                </div>
              )}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  send(draft);
                }}
                className="flex items-end gap-2"
              >
                <label htmlFor="chat-input" className="sr-only">
                  Message
                </label>
                <textarea
                  id="chat-input"
                  rows={1}
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send(draft);
                    }
                  }}
                  placeholder="Write a private message…"
                  className="field max-h-32 min-h-[48px] resize-none !rounded-2xl !py-3"
                />
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="grid size-12 shrink-0 place-items-center rounded-full bg-gold text-obsidian transition hover:bg-gold-light hover:shadow-[0_0_30px_-6px_rgba(201,169,110,0.8)] disabled:opacity-40"
                  aria-label="Send message"
                >
                  <Send className="size-4" />
                </button>
              </form>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </>
  );
}

/** Opens the chat drawer from anywhere (e.g. a CTA button). */
export function openConciergeChat() {
  window.dispatchEvent(new Event("mb:open-chat"));
}

export function OpenChatButton({ className, children }: { className?: string; children?: React.ReactNode }) {
  return (
    <button type="button" onClick={openConciergeChat} className={className}>
      {children ?? (
        <>
          <MessageCircle className="size-4" strokeWidth={1.5} /> Message the Concierge
        </>
      )}
    </button>
  );
}
