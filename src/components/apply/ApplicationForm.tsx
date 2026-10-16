"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, Controller, type FieldPath, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, Lock, MessageCircle, ShieldCheck } from "lucide-react";
import { cities, tiers } from "@/lib/data";
import { luxEase } from "@/components/ui/Reveal";
import { site } from "@/lib/site";
import { formatMessage, openWhatsApp, whatsappUrl } from "@/lib/whatsapp";

const INTERESTS = [
  "Private aviation",
  "Yachting",
  "Fine dining",
  "Art & collecting",
  "Fashion & couture",
  "Motorsport",
  "Wellness & retreats",
  "Family travel",
  "Real estate",
  "Philanthropy",
  "Live music & culture",
  "Security & privacy",
];

const FREQUENCY = [
  { id: "occasional", label: "Occasional", note: "A few special requests each year" },
  { id: "monthly", label: "Monthly", note: "Regular travel and reservations" },
  { id: "weekly", label: "Weekly", note: "An active, multi-city lifestyle" },
  { id: "daily", label: "Daily, on-call", note: "A true extension of my household" },
] as const;

const HOUSEHOLD = ["Individual", "Couple", "Family", "Family office / principal"] as const;

const schema = z.object({
  fullName: z.string().trim().min(2, "Please share your full name"),
  email: z.email("Please enter a valid email address"),
  phone: z.string().trim().min(7, "A private number helps us reach you discreetly"),
  residence: z.string().trim().min(2, "Where are you primarily based?"),
  occupation: z.string().trim().optional(),
  cities: z.array(z.string()).min(1, "Select at least one city"),
  interests: z.array(z.string()).min(1, "Select at least one interest"),
  household: z.enum(HOUSEHOLD, { error: "Please select one" }),
  frequency: z.enum(["occasional", "monthly", "weekly", "daily"], { error: "Please select a frequency" }),
  tier: z.enum(["signature", "bespoke", "global-elite", "unsure"], { error: "Please select a tier" }),
  referral: z.string().trim().optional(),
  notes: z.string().trim().max(1000, "Please keep this under 1,000 characters").optional(),
  consent: z.boolean().refine((v) => v, "Please confirm to continue"),
});

type FormValues = z.infer<typeof schema>;

const FREQUENCY_LABEL = Object.fromEntries(FREQUENCY.map((f) => [f.id, f.label]));
const TIER_LABEL: Record<string, string> = { ...Object.fromEntries(tiers.map((t) => [t.id, t.name])), unsure: "Not sure yet" };

/** Sends the application to the concierge on WhatsApp and returns its reference + link. */
function submitApplication(values: FormValues) {
  const ref = `APP-${Date.now().toString(36).toUpperCase().slice(-6)}`;
  const text = formatMessage(`New Membership Application · ${ref}`, [
    ["Name", values.fullName],
    ["Email", values.email],
    ["Phone", values.phone],
    ["Residence", values.residence],
    ["Occupation", values.occupation],
    ["Cities", values.cities.join(", ")],
    ["Interests", values.interests.join(", ")],
    ["Household", values.household],
    ["Frequency", FREQUENCY_LABEL[values.frequency]],
    ["Membership", TIER_LABEL[values.tier]],
    ["Referred by", values.referral],
    ["Notes", values.notes],
  ]);
  openWhatsApp(text);
  return { ref, url: whatsappUrl(text) };
}

const STEPS: { title: string; subtitle: string; fields: FieldPath<FormValues>[] }[] = [
  { title: "About you", subtitle: "Held in strict confidence", fields: ["fullName", "email", "phone", "residence", "occupation"] },
  { title: "Your world", subtitle: "Where and how you live", fields: ["cities", "interests", "household"] },
  { title: "Your rhythm", subtitle: "How we can serve you", fields: ["frequency", "tier"] },
  { title: "Discretion", subtitle: "A few final details", fields: ["referral", "notes", "consent"] },
];

export function ApplicationForm() {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [submitted, setSubmitted] = useState<{ ref: string; url: string } | null>(null);

  const {
    register,
    control,
    handleSubmit,
    trigger,
    getValues,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { cities: [], interests: [], consent: false, occupation: "", referral: "", notes: "" },
  });

  const next = async () => {
    const ok = await trigger(STEPS[step].fields, { shouldFocus: true });
    if (!ok) return;
    setDir(1);
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 0));
  };

  const onSubmit = (values: FormValues) => {
    setSubmitted(submitApplication(values));
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: luxEase }}
        className="lux-card mx-auto max-w-2xl p-10 text-center sm:p-16"
        data-active="true"
      >
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200, damping: 15 }}
          className="mx-auto grid size-20 place-items-center rounded-full bg-gold text-obsidian shadow-[0_0_60px_-10px_rgba(201,169,110,0.9)]"
        >
          <Check className="size-9" strokeWidth={1.5} />
        </motion.span>
        <h2 className="heading-md mt-10 !text-4xl">Thank you, {getValues("fullName").split(" ")[0]}.</h2>
        <p className="mx-auto mt-5 max-w-md leading-relaxed text-stone">
          Your application has opened in WhatsApp. Just tap <strong className="text-ivory">send</strong> and {site.founder}
          will review it personally and be in touch within 48 hours to arrange a private consultation.
        </p>
        <p className="mt-8 inline-flex items-center gap-2 rounded-full border border-gold/25 px-5 py-2 text-xs uppercase tracking-[0.2em] text-gold">
          <Lock className="size-3.5" /> Reference {submitted.ref}
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <a href={submitted.url} target="_blank" rel="noreferrer" className="btn-gold">
            <MessageCircle className="size-4" /> WhatsApp didn’t open? Send it
          </a>
          <Link href="/" className="btn-ghost">
            Return home
          </Link>
        </div>
      </motion.div>
    );
  }

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: { opacity: 1, x: 0 },
    exit: (d: number) => ({ opacity: 0, x: d * -40 }),
  };

  return (
    <div className="grid gap-12 lg:grid-cols-12">
      {/* Stepper */}
      <aside className="lg:col-span-4">
        <ol className="flex gap-2 lg:sticky lg:top-32 lg:flex-col lg:gap-0">
          {STEPS.map((s, i) => {
            const state = i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li key={s.title} className="relative flex-1 lg:flex lg:gap-5 lg:pb-10 last:lg:pb-0">
                {i < STEPS.length - 1 && (
                  <span className="absolute top-12 bottom-0 left-[19px] hidden w-px bg-ivory/10 lg:block">
                    <motion.span
                      className="absolute inset-x-0 top-0 bg-gold"
                      animate={{ height: i < step ? "100%" : "0%" }}
                      transition={{ duration: 0.6, ease: luxEase }}
                    />
                  </span>
                )}
                <span
                  className={`hidden size-10 shrink-0 place-items-center rounded-full border font-serif text-lg transition-all duration-500 lg:grid ${
                    state === "done"
                      ? "border-gold bg-gold text-obsidian"
                      : state === "current"
                        ? "border-gold text-gold shadow-[0_0_30px_-6px_rgba(201,169,110,0.7)]"
                        : "border-ivory/15 text-mist"
                  }`}
                >
                  {state === "done" ? <Check className="size-4" /> : i + 1}
                </span>
                <span
                  className={`block h-1 rounded-full transition-colors duration-500 lg:hidden ${
                    i <= step ? "bg-gold" : "bg-ivory/10"
                  }`}
                />
                <span className="hidden pt-1.5 lg:block">
                  <span className={`block font-serif text-2xl ${state === "todo" ? "text-mist" : "text-ivory"}`}>
                    {s.title}
                  </span>
                  <span className="mt-1 block text-sm text-mist">{s.subtitle}</span>
                </span>
              </li>
            );
          })}
        </ol>
        <div className="mt-6 lg:hidden">
          <p className="text-[11px] uppercase tracking-[0.25em] text-gold">
            Step {step + 1} of {STEPS.length}
          </p>
          <p className="mt-2 font-serif text-3xl text-ivory">{STEPS[step].title}</p>
        </div>
        <div className="mt-12 hidden rounded-2xl border border-gold/15 bg-onyx/60 p-6 lg:block">
          <ShieldCheck className="size-6 text-gold" strokeWidth={1.25} />
          <p className="mt-4 text-sm leading-relaxed text-stone">
            Your information is encrypted in transit and at rest, reviewed only by our founding team, and never shared
            with third parties.
          </p>
        </div>
      </aside>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="lg:col-span-8" noValidate>
        <div className="lux-card overflow-hidden p-6 sm:p-10 lg:p-12">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.div
              key={step}
              custom={dir}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.45, ease: luxEase }}
            >
              {step === 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                  <Field label="Full name" error={errors.fullName?.message} className="sm:col-span-2">
                    <input {...register("fullName")} className="field" placeholder="As you'd like to be addressed" autoComplete="name" />
                  </Field>
                  <Field label="Private email" error={errors.email?.message}>
                    <input {...register("email")} type="email" className="field" placeholder="you@domain.com" autoComplete="email" />
                  </Field>
                  <Field label="Private phone" error={errors.phone?.message}>
                    <input {...register("phone")} type="tel" className="field" placeholder="+234 …" autoComplete="tel" />
                  </Field>
                  <Field label="Primary residence" error={errors.residence?.message}>
                    <input {...register("residence")} className="field" placeholder="City, Country" />
                  </Field>
                  <Field label="Occupation (optional)" error={errors.occupation?.message}>
                    <input {...register("occupation")} className="field" placeholder="e.g. Founder, Investor" />
                  </Field>
                </div>
              )}

              {step === 1 && (
                <div className="space-y-10">
                  <Controller
                    control={control}
                    name="cities"
                    render={({ field, fieldState }) => (
                      <Field label="Cities you spend most time in" error={fieldState.error?.message}>
                        <ChipGroup options={cities} value={field.value} onChange={field.onChange} />
                      </Field>
                    )}
                  />
                  <Controller
                    control={control}
                    name="interests"
                    render={({ field, fieldState }) => (
                      <Field label="Lifestyle interests" error={fieldState.error?.message}>
                        <ChipGroup options={INTERESTS} value={field.value} onChange={field.onChange} />
                      </Field>
                    )}
                  />
                  <Field label="Who will we be serving?" error={errors.household?.message}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {HOUSEHOLD.map((h) => (
                        <OptionCard key={h} value={h} label={h} registration={register("household")} />
                      ))}
                    </div>
                  </Field>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-10">
                  <Field label="How often do you expect to use the service?" error={errors.frequency?.message}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {FREQUENCY.map((f) => (
                        <OptionCard key={f.id} value={f.id} label={f.label} note={f.note} registration={register("frequency")} />
                      ))}
                    </div>
                  </Field>
                  <Field label="Membership of interest" error={errors.tier?.message}>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {tiers.map((t) => (
                        <OptionCard
                          key={t.id}
                          value={t.id}
                          label={t.name}
                          note={`${t.price}${t.cadence.startsWith("per") ? " / month" : ""}`}
                          registration={register("tier")}
                        />
                      ))}
                      <OptionCard value="unsure" label="Not sure yet" note="Advise me after our consultation" registration={register("tier")} />
                    </div>
                  </Field>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <Field label="Referred by (optional)" error={errors.referral?.message}>
                    <input {...register("referral")} className="field" placeholder="Member name or referral code" />
                  </Field>
                  <Field label="Anything we should know? (optional)" error={errors.notes?.message}>
                    <textarea
                      {...register("notes")}
                      rows={5}
                      className="field resize-none"
                      placeholder="Upcoming plans, special requirements, preferred way to be contacted…"
                    />
                  </Field>
                  <label className="flex cursor-pointer items-start gap-4 rounded-2xl border border-ivory/10 p-5 transition hover:border-gold/40 has-[:checked]:border-gold/60 has-[:checked]:bg-gold/5">
                    <input type="checkbox" {...register("consent")} className="peer sr-only" />
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-ivory/25 text-transparent transition peer-checked:border-gold peer-checked:bg-gold peer-checked:text-obsidian peer-focus-visible:ring-2 peer-focus-visible:ring-gold/60">
                      <Check className="size-3.5" strokeWidth={3} />
                    </span>
                    <span className="text-sm leading-relaxed text-stone">
                      I consent to {site.brand} reviewing this application confidentially and contacting me regarding
                      membership. A mutual NDA is offered to all members.
                    </span>
                  </label>
                  {errors.consent && <p className="field-error">{errors.consent.message}</p>}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="hairline my-10" />

          <div className="flex items-center justify-between gap-4">
            <button
              type="button"
              onClick={back}
              className={`inline-flex items-center gap-2 text-sm text-stone transition hover:text-ivory ${
                step === 0 ? "invisible" : ""
              }`}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button type="button" onClick={next} className="btn-gold group">
                Continue <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </button>
            ) : (
              <button type="submit" disabled={isSubmitting} className="btn-gold min-w-[220px]">
                <MessageCircle className="size-4" /> Send via WhatsApp
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <span className="field-label">{label}</span>
      {children}
      {error && <p className="field-error">{error}</p>}
    </div>
  );
}

function ChipGroup({
  options,
  value,
  onChange,
}: {
  options: readonly string[];
  value: string[];
  onChange: (v: string[]) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2.5">
      {options.map((o) => {
        const on = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            data-active={on}
            aria-pressed={on}
            onClick={() => onChange(on ? value.filter((v) => v !== o) : [...value, o])}
            className="chip"
          >
            {on && <Check className="size-3.5" />}
            {o}
          </button>
        );
      })}
    </div>
  );
}

function OptionCard({
  value,
  label,
  note,
  registration,
}: {
  value: string;
  label: string;
  note?: string;
  registration: UseFormRegisterReturn;
}) {
  return (
    <label className="group relative flex cursor-pointer items-center gap-4 rounded-2xl border border-ivory/10 p-5 transition-all duration-300 hover:border-gold/40 has-[:checked]:border-gold has-[:checked]:bg-gold/[0.06] has-[:checked]:shadow-[0_0_40px_-18px_rgba(201,169,110,0.9)]">
      <input type="radio" value={value} {...registration} className="peer sr-only" />
      <span className="grid size-5 shrink-0 place-items-center rounded-full border border-ivory/25 transition peer-checked:border-gold peer-focus-visible:ring-2 peer-focus-visible:ring-gold/60">
        <span className="size-2.5 scale-0 rounded-full bg-gold transition-transform group-has-[:checked]:scale-100" />
      </span>
      <span>
        <span className="block font-medium text-ivory">{label}</span>
        {note && <span className="mt-0.5 block text-sm text-mist">{note}</span>}
      </span>
    </label>
  );
}
