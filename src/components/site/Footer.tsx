import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { Monogram } from "@/components/ui/Logo";
import { site } from "@/lib/site";
import { categories } from "@/lib/data";
import { whatsappUrl } from "@/lib/whatsapp";

export function Footer() {
  return (
    <footer className="relative border-t border-gold/10 bg-onyx">
      <div className="container-lux py-20">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Monogram className="size-14 text-gold" />
            <p className="mt-6 max-w-sm font-serif text-3xl leading-tight text-ivory">
              Your time is the only true luxury. <em className="text-gold-light">We protect it.</em>
            </p>
            <p className="mt-6 flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-stone">
              <Lock className="size-3.5 text-gold" strokeWidth={1.5} /> All communications end-to-end encrypted
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Services</h4>
              <ul className="mt-5 space-y-3 text-sm text-stone">
                {categories.map((c) => (
                  <li key={c.id}>
                    <Link href="/services" className="transition-colors hover:text-ivory">
                      {c.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Beestouch</h4>
              <ul className="mt-5 space-y-3 text-sm text-stone">
                {site.nav.map((n) => (
                  <li key={n.href}>
                    <Link href={n.href} className="transition-colors hover:text-ivory">
                      {n.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/portal" className="transition-colors hover:text-ivory">
                    Client Portal
                  </Link>
                </li>
              </ul>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.25em] text-gold">Private Line</h4>
              <ul className="mt-5 space-y-3 text-sm text-stone">
                <li>
                  <a href={`mailto:${site.email}`} className="break-all transition-colors hover:text-ivory">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href={whatsappUrl()} target="_blank" rel="noreferrer" className="transition-colors hover:text-ivory">
                    WhatsApp · {site.phone}
                  </a>
                </li>
                <li>{site.hq}</li>
              </ul>
              <div className="mt-6 flex gap-4 text-sm">
                {Object.entries(site.socials).map(([k, href]) => (
                  <a
                    key={k}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 capitalize text-stone transition-colors hover:text-gold-light"
                  >
                    {k} <ArrowUpRight className="size-3" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-8 flex flex-col justify-between gap-4 text-xs text-mist sm:flex-row">
          <p>
            © {new Date().getFullYear()} {site.brand}. All rights reserved.
          </p>
          <p className="tracking-[0.2em] uppercase">Discretion · Precision · Devotion</p>
        </div>
      </div>
    </footer>
  );
}
