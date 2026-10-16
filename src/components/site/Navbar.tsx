"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Lock } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { luxEase } from "@/components/ui/Reveal";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "border-b border-gold/10 bg-obsidian/80 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent"
        }`}
      >
        <nav className="container-lux flex h-20 items-center justify-between">
          <Logo />

          <ul className="hidden items-center gap-9 lg:flex">
            {site.nav.map((item) => {
              const active = item.href === pathname;
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`group relative text-[12px] font-medium uppercase tracking-[0.22em] transition-colors duration-300 ${
                      active ? "text-gold-light" : "text-stone hover:text-ivory"
                    }`}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-2 left-0 h-px bg-gold transition-all duration-500 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden items-center gap-3 lg:flex">
            <Link
              href="/portal"
              className="inline-flex items-center gap-2 px-3 py-2 text-[12px] font-medium uppercase tracking-[0.2em] text-stone transition-colors hover:text-gold-light"
            >
              <Lock className="size-3.5" strokeWidth={1.5} /> Client Portal
            </Link>
            <Link href="/apply" className="btn-gold !px-6 !py-3">
              Apply
            </Link>
          </div>

          <button
            onClick={() => setOpen((o) => !o)}
            className="grid size-11 place-items-center rounded-full border border-ivory/15 text-ivory lg:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-obsidian/97 pt-24 backdrop-blur-xl lg:hidden"
          >
            <div className="container-lux flex h-full flex-col pb-24">
              <ul className="flex flex-col">
                {site.nav.map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + i * 0.06, duration: 0.6, ease: luxEase }}
                    className="border-b border-ivory/8"
                  >
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex items-center justify-between py-5 font-serif text-4xl text-ivory"
                    >
                      {item.label}
                      <span className="text-sm text-gold">0{i + 1}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3">
                <Link href="/portal" onClick={() => setOpen(false)} className="btn-ghost">
                  <Lock className="size-4" strokeWidth={1.5} /> Client Portal
                </Link>
                <Link href="/apply" onClick={() => setOpen(false)} className="btn-gold">
                  Apply for Membership
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
