"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/data";
import { Reveal, luxEase } from "@/components/ui/Reveal";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[index];

  const go = (d: number) => setIndex((i) => (i + d + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => go(1), 7000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section id="clients" className="relative scroll-mt-20 overflow-hidden bg-onyx py-28 sm:py-36">
      <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 font-serif text-[22rem] leading-none text-gold/[0.05] select-none">
        “
      </div>
      <div className="container-lux">
        <Reveal className="text-center">
          <p className="eyebrow justify-center">Private Client Notes</p>
          <p className="mt-4 text-sm text-mist">Names withheld at our clients’ request.</p>
        </Reveal>

        <div
          className="relative mx-auto mt-14 max-w-5xl"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Fixed min-height prevents layout shift between quotes of different length */}
          <div className="grid min-h-[340px] place-items-center sm:min-h-[300px]">
            <AnimatePresence mode="wait">
              <motion.figure
                key={index}
                initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -20, filter: "blur(6px)" }}
                transition={{ duration: 0.8, ease: luxEase }}
                className="text-center"
              >
                <blockquote className="font-serif text-[clamp(1.6rem,3.2vw,2.75rem)] leading-[1.25] font-light text-ivory">
                  “{t.quote}”
                </blockquote>
                <figcaption className="mt-10">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{t.name}</span>
                  <span className="mt-2 block text-sm text-stone">{t.detail}</span>
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          <div className="mt-12 flex items-center justify-center gap-6">
            <button
              onClick={() => go(-1)}
              className="grid size-12 place-items-center rounded-full border border-ivory/15 text-stone transition hover:border-gold hover:text-gold"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="size-5" strokeWidth={1.5} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Show testimonial ${i + 1}`}
                  className={`h-1 rounded-full transition-all duration-500 ${
                    i === index ? "w-10 bg-gold" : "w-4 bg-ivory/20 hover:bg-ivory/40"
                  }`}
                />
              ))}
            </div>
            <button
              onClick={() => go(1)}
              className="grid size-12 place-items-center rounded-full border border-ivory/15 text-stone transition hover:border-gold hover:text-gold"
              aria-label="Next testimonial"
            >
              <ChevronRight className="size-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
