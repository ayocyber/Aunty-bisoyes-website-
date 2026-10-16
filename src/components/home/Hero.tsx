"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CircleCheckBig, Plane } from "lucide-react";
import { luxEase } from "@/components/ui/Reveal";
import { site } from "@/lib/site";

const line = {
  hidden: { y: "110%" },
  show: (i: number) => ({ y: 0, transition: { duration: 1.2, delay: 0.25 + i * 0.12, ease: luxEase } }),
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden pt-28 pb-16 lg:pt-0 lg:pb-0">
      {/* Cinematic backdrop: layered light, a slow-drifting glow and fine architectural grid */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_70%_40%,rgba(201,169,110,0.16),transparent_60%)]" />
        <motion.div
          className="absolute -top-1/4 left-1/3 size-[60vw] rounded-full bg-gold/10 blur-[140px]"
          animate={{ x: ["-10%", "15%", "-10%"], y: ["0%", "12%", "0%"] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(rgba(232,213,176,1)_1px,transparent_1px),linear-gradient(90deg,rgba(232,213,176,1)_1px,transparent_1px)] [background-size:120px_120px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-obsidian to-transparent" />
      </div>

      <div className="container-lux grid min-h-[calc(100svh-7rem)] items-center gap-14 lg:min-h-[100svh] lg:grid-cols-12 lg:gap-8">
        {/* Copy */}
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10 lg:col-span-7 lg:pt-20">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="eyebrow"
          >
            By invitation &amp; application
          </motion.p>

          <h1 className="heading-xl mt-8">
            {["Life,", "impeccably", "arranged."].map((word, i) => (
              <span key={word} className="block overflow-hidden pb-[0.08em]">
                <motion.span
                  custom={i}
                  variants={line}
                  initial="hidden"
                  animate="show"
                  className={`block ${i === 1 ? "italic text-gold-gradient pr-2" : ""}`}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8, ease: luxEase }}
            className="mt-8 max-w-xl text-[17px] leading-relaxed text-stone sm:text-lg"
          >
            {site.description}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1, ease: luxEase }}
            className="mt-10 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/apply" className="btn-gold group">
              Request Membership
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
            <Link href="/services" className="btn-ghost">
              Explore Services
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.3 }}
            className="mt-14 flex items-center gap-6 text-xs uppercase tracking-[0.2em] text-mist"
          >
            <span className="flex items-center gap-2">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-emerald-400" /> Concierge online now
            </span>
            <span className="hidden h-3 w-px bg-ivory/15 sm:block" />
            <span className="hidden sm:block">{site.hq}</span>
          </motion.div>
        </motion.div>

        {/* Portrait */}
        <div className="lg:col-span-5 lg:pt-20">
          <div className="relative mx-auto w-full max-w-[460px] p-3 sm:p-0">
          {/* Arch hairline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, delay: 1.2 }}
            className="pointer-events-none absolute inset-0 rounded-t-full rounded-b-[2.25rem] border border-gold/30 sm:-inset-4"
          />
          <motion.div
            initial={{ opacity: 0, scale: 1.04, clipPath: "inset(100% 0% 0% 0% round 999px 999px 24px 24px)" }}
            animate={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 999px 999px 24px 24px)" }}
            transition={{ duration: 1.6, delay: 0.3, ease: luxEase }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-t-full rounded-b-3xl"
          >
            <motion.div style={{ y: imgY }} className="absolute -inset-y-[8%] inset-x-0">
              <Image
                src="/images/bisoye.jpg"
                alt={`${site.founderFullName}, ${site.founderTitle} at ${site.brand}`}
                fill
                priority
                sizes="(min-width: 1024px) 460px, 90vw"
                className="object-cover object-[50%_15%]"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent" />
          </motion.div>


          {/* Floating glass cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.5, ease: luxEase }}
            className="absolute bottom-24 left-0 rounded-2xl border border-gold/20 bg-onyx/75 p-3.5 shadow-2xl backdrop-blur-xl sm:-left-8 sm:p-4 lg:-left-14"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-emerald-400/10 text-emerald-300">
                <CircleCheckBig className="size-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ivory">Paddock Club confirmed</p>
                <p className="text-[11px] text-stone">Monaco · 2 guests · 38 min</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 1.75, ease: luxEase }}
            className="absolute top-12 right-0 hidden rounded-2xl border border-gold/20 bg-onyx/75 p-3.5 shadow-2xl backdrop-blur-xl sm:-right-8 sm:block sm:p-4 lg:top-16 lg:-right-12"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-full bg-gold/10 text-gold">
                <Plane className="size-5" strokeWidth={1.5} />
              </span>
              <div>
                <p className="text-[13px] font-semibold text-ivory">G650 · Wheels up 06:40</p>
                <p className="text-[11px] text-stone">Lagos → Nice</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: luxEase }}
            className="absolute inset-x-0 bottom-6 text-center"
          >
            <p className="font-serif text-3xl text-ivory italic">{site.founderFullName}</p>
            <p className="mt-1 px-4 text-[10px] uppercase tracking-[0.3em] text-gold">{site.founderTitle}</p>
          </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.35em] text-mist">Scroll</span>
        <span className="relative h-14 w-px overflow-hidden bg-ivory/10">
          <motion.span
            className="absolute inset-x-0 top-0 h-1/2 bg-gold"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
