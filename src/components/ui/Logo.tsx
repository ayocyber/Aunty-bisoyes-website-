import Link from "next/link";
import { site } from "@/lib/site";

export function Monogram({ className = "size-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <circle cx="20" cy="20" r="19.25" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.55" />
      <circle cx="20" cy="20" r="16" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
      <text
        x="20"
        y="27"
        textAnchor="middle"
        fontFamily="Cormorant Garamond Variable, serif"
        fontSize="20"
        fontStyle="italic"
        fill="currentColor"
      >
        {site.shortBrand}
      </text>
    </svg>
  );
}

export function Logo() {
  return (
    <Link href="/" className="group flex items-center gap-3" aria-label={`${site.brand} home`}>
      <Monogram className="size-10 text-gold transition-transform duration-700 group-hover:rotate-[360deg]" />
      <span className="flex flex-col leading-none">
        <span className="font-serif text-[22px] tracking-wide text-ivory">{site.brand}</span>
        <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.38em] text-stone">{site.tagline}</span>
      </span>
    </Link>
  );
}
