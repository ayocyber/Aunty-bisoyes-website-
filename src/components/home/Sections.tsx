import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, Gem, Hourglass, Lock, Sparkles } from "lucide-react";
import { Reveal } from "@/components/ui/Reveal";
import { OpenChatButton } from "@/components/chat/ConciergeChat";
import { categories, cities, stats, tiers } from "@/lib/data";
import { site } from "@/lib/site";

export function CityMarquee() {
  const row = [...cities, ...cities];
  return (
    <div className="relative overflow-hidden border-y border-gold/10 bg-onyx/60 py-6">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-obsidian to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-obsidian to-transparent" />
      <div className="flex w-max animate-marquee items-center gap-12">
        {row.map((c, i) => (
          <span key={i} className="flex items-center gap-12 font-serif text-2xl text-ivory/60 italic sm:text-3xl">
            {c}
            <span className="size-1.5 rotate-45 bg-gold/60" />
          </span>
        ))}
      </div>
    </div>
  );
}

const pillars = [
  {
    icon: Hourglass,
    title: "Time, returned",
    text: "Every request is owned end-to-end by a single lifestyle manager who knows your preferences — no call centres, no repetition.",
  },
  {
    icon: Lock,
    title: "Absolute discretion",
    text: "NDAs as standard, encrypted channels and a team trained in protecting principals, families and reputations.",
  },
  {
    icon: Gem,
    title: "The impossible, made routine",
    text: "Decades of relationships with operators, maîtres d', hosts and agents — so 'fully booked' rarely applies to you.",
  },
];

export function Philosophy() {
  return (
    <section id="philosophy" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="container-lux">
        <div className="grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow">Our Philosophy</p>
            <h2 className="heading-lg mt-6">
              Luxury is not more. <em className="text-gold-light">It is less to think about.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.15} className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-stone">
              {site.brand} was founded on a simple belief: the most valuable thing our clients own is their time.
              We exist to absorb the complexity of extraordinary lives — the logistics, the follow-ups, the
              contingencies — so that what remains is only the experience itself.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-stone">
              We remain intentionally small. Membership is limited, so that every client is known by name, by
              preference and by instinct.
            </p>
          </Reveal>
        </div>

        <div className="mt-20 grid gap-5 md:grid-cols-3">
          {pillars.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.12}>
              <article className="lux-card group h-full p-8 sm:p-10">
                <span className="grid size-14 place-items-center rounded-full border border-gold/25 text-gold transition-all duration-500 group-hover:bg-gold group-hover:text-obsidian">
                  <p.icon className="size-6" strokeWidth={1.25} />
                </span>
                <h3 className="heading-md mt-8">{p.title}</h3>
                <p className="mt-4 leading-relaxed text-stone">{p.text}</p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal>
          <dl className="mt-20 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-gold/10 bg-gold/10 lg:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="bg-obsidian p-8 text-center sm:p-10">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-5xl text-gold-light sm:text-6xl">{s.value}</dd>
                <p className="mt-3 text-xs uppercase tracking-[0.2em] text-stone">{s.label}</p>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesPreview() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_60%_50%_at_20%_50%,rgba(201,169,110,0.08),transparent_70%)]" />
      <div className="container-lux">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal>
            <p className="eyebrow">The Portfolio</p>
            <h2 className="heading-lg mt-6 max-w-2xl">
              Five disciplines. <em className="text-gold-light">One trusted line.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <Link href="/services" className="btn-ghost group">
              View all services
              <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-16 border-t border-gold/10">
          {categories.map((c, i) => (
            <Reveal key={c.id} delay={i * 0.05} y={16}>
              <Link
                href="/services"
                className="group relative grid grid-cols-[auto_1fr_auto] items-center gap-5 border-b border-gold/10 py-8 transition-colors duration-500 sm:gap-10 sm:py-10"
              >
                <span className="absolute inset-0 -z-10 origin-left scale-x-0 bg-gradient-to-r from-gold/[0.07] to-transparent transition-transform duration-700 group-hover:scale-x-100" />
                <span className="font-serif text-lg text-mist italic">0{i + 1}</span>
                <span className="grid gap-2 md:grid-cols-2 md:items-center md:gap-10">
                  <span className="font-serif text-3xl text-ivory transition-colors duration-500 group-hover:text-gold-light sm:text-4xl lg:text-5xl">
                    {c.label}
                  </span>
                  <span className="max-w-md text-sm leading-relaxed text-stone sm:text-base">{c.blurb}</span>
                </span>
                <span className="grid size-12 place-items-center rounded-full border border-ivory/10 text-stone transition-all duration-500 group-hover:rotate-45 group-hover:border-gold group-hover:bg-gold group-hover:text-obsidian">
                  <ArrowUpRight className="size-5" strokeWidth={1.5} />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Founder() {
  return (
    <section id="founder" className="relative scroll-mt-20 overflow-hidden bg-onyx py-28 sm:py-36">
      <div className="container-lux grid items-center gap-16 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-5">
          <div className="relative mx-auto max-w-md">
            <div className="absolute -inset-4 rounded-[2rem] border border-gold/20" />
            <div className="relative aspect-[4/5] overflow-hidden rounded-3xl">
              <Image
                src="/images/bisoye.jpg"
                alt={`Portrait of ${site.founderFullName}`}
                fill
                sizes="(min-width: 1024px) 420px, 90vw"
                className="object-cover object-[50%_20%] grayscale-[15%] transition duration-[1.5s] hover:scale-[1.03] hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -right-3 -bottom-6 rounded-2xl border border-gold/25 bg-obsidian/90 px-6 py-5 backdrop-blur sm:-right-10">
              <p className="font-serif text-4xl text-gold-light">24/7</p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-stone">Personally reachable</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <p className="eyebrow">Your Lifestyle Manager</p>
          <h2 className="heading-lg mt-6">
            Meet {site.founder}. <em className="text-gold-light">The person behind the line.</em>
          </h2>
          <div className="mt-8 space-y-5 text-lg leading-relaxed text-stone">
            <p>
              Before founding {site.brand}, {site.founderFullName} spent years as the trusted right hand to executives and
              founders — managing calendars across time zones, inboxes that never slept and the countless details
              that keep a demanding life running beautifully.
            </p>
            <p>
              That instinct for anticipation is now the heart of Beestouch. Every member has a direct, encrypted
              line to {site.founder} and her team: one relationship, one point of contact, and the quiet confidence
              that everything has been thought of.
            </p>
          </div>

          <blockquote className="mt-10 border-l border-gold/50 pl-6 font-serif text-2xl leading-snug text-ivory italic sm:text-3xl">
            “My promise is simple — you will never have to ask twice.”
          </blockquote>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <OpenChatButton className="btn-gold" />
            <Link href="/apply" className="btn-ghost">
              Begin your application
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const steps = [
  { n: "I", title: "Apply discreetly", text: "A short, confidential application. We respond personally within 48 hours." },
  { n: "II", title: "Private consultation", text: `A conversation with ${site.founder} to understand your rhythms, preferences and household.` },
  { n: "III", title: "Your profile, perfected", text: "Seat preferences, allergies, favourite suites — recorded once, remembered forever." },
  { n: "IV", title: "Simply ask", text: "Message, call or use your portal. We handle the rest, any hour, anywhere." },
];

export function Process() {
  return (
    <section className="py-28 sm:py-36">
      <div className="container-lux">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">The Journey</p>
          <h2 className="heading-lg mt-6">
            From application to <em className="text-gold-light">effortless.</em>
          </h2>
        </Reveal>
        <ol className="relative mt-20 grid gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          <div className="hairline absolute top-8 hidden lg:block" />
          {steps.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.12}>
              <li className="relative text-center">
                <span className="relative mx-auto grid size-16 place-items-center rounded-full border border-gold/40 bg-obsidian font-serif text-xl text-gold italic">
                  {s.n}
                </span>
                <h3 className="mt-8 font-serif text-2xl text-ivory">{s.title}</h3>
                <p className="mx-auto mt-3 max-w-xs leading-relaxed text-stone">{s.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Membership() {
  return (
    <section id="membership" className="relative scroll-mt-20 py-28 sm:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_50%_at_50%_30%,rgba(201,169,110,0.1),transparent_70%)]" />
      <div className="container-lux">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="eyebrow justify-center">Membership</p>
          <h2 className="heading-lg mt-6">
            Curated tiers, <em className="text-gold-light">limited by design.</em>
          </h2>
          <p className="mt-6 text-lg text-stone">
            We accept a limited number of new members each quarter to preserve the attention every client deserves.
          </p>
        </Reveal>

        <div className="mt-20 grid items-stretch gap-6 lg:grid-cols-3">
          {tiers.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.12} className="h-full">
              <article
                data-active={t.featured ? "true" : undefined}
                className={`lux-card group relative flex h-full flex-col p-8 sm:p-10 ${
                  t.featured ? "bg-gradient-to-b from-graphite to-onyx lg:-my-6 lg:py-16" : ""
                }`}
              >
                {t.featured && (
                  <span className="absolute -top-3.5 left-1/2 inline-flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-gold px-4 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-obsidian">
                    <Sparkles className="size-3" /> Most chosen
                  </span>
                )}
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-gold">{t.name}</p>
                <p className="mt-6 font-serif text-5xl text-ivory">{t.price}</p>
                <p className="mt-1 text-sm text-mist">{t.cadence}</p>
                <p className="mt-6 leading-relaxed text-stone">{t.description}</p>
                <div className="hairline my-8" />
                <ul className="space-y-4">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-[15px] text-ivory/85">
                      <Check className="mt-0.5 size-4 shrink-0 text-gold" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link href="/apply" className="mt-auto w-full pt-10">
                  <span className={`${t.featured ? "btn-gold" : "btn-ghost"} w-full`}>
                    {t.id === "global-elite" ? "Request an invitation" : `Apply for ${t.name}`}
                  </span>
                </Link>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden py-28 sm:py-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 size-[80vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[120px]" />
      </div>
      <Reveal className="container-lux text-center">
        <p className="eyebrow justify-center">Begin</p>
        <h2 className="heading-xl mx-auto mt-8 max-w-5xl">
          The best things in life <em className="text-gold-gradient">are arranged.</em>
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-stone">
          Membership is by application only. Every enquiry is reviewed personally and held in strict confidence.
        </p>
        <div className="mt-12 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/apply" className="btn-gold group">
            Apply for Membership
            <ArrowRight className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          <Link href="/portal" className="btn-ghost">
            <Lock className="size-4" strokeWidth={1.5} /> Member Login
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
