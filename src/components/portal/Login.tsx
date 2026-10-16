"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { KeyRound, LoaderCircle, Lock, ShieldCheck, Sparkles } from "lucide-react";
import { DEMO_MEMBER, DEMO_PASSCODE, sessionStore } from "@/lib/portal";
import { Monogram } from "@/components/ui/Logo";
import { luxEase } from "@/components/ui/Reveal";

const schema = z.object({
  email: z.email("Enter the email registered to your membership"),
  passcode: z.string().regex(/^\d{6}$/, "Your passcode is 6 digits"),
});
type Values = z.infer<typeof schema>;

export function Login() {
  const [authError, setAuthError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = async (v: Values) => {
    setAuthError(null);
    await new Promise((r) => setTimeout(r, 1100));
    // Mock authentication — swap for NextAuth / Clerk / your identity provider in production.
    if (v.email.toLowerCase() === DEMO_MEMBER.email && v.passcode === DEMO_PASSCODE) {
      sessionStore.set(DEMO_MEMBER);
    } else {
      setAuthError("Those credentials don’t match our records. Use the demo access below to preview the portal.");
    }
  };

  const fillDemo = () => {
    setValue("email", DEMO_MEMBER.email, { shouldValidate: true });
    setValue("passcode", DEMO_PASSCODE, { shouldValidate: true });
  };

  return (
    <div className="container-lux grid min-h-[calc(100svh-5rem)] items-center gap-16 py-16 lg:grid-cols-2">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: luxEase }}
        className="hidden lg:block"
      >
        <p className="eyebrow">Client Portal</p>
        <h1 className="heading-lg mt-8">
          Welcome back. <em className="text-gold-light">Everything is in hand.</em>
        </h1>
        <ul className="mt-12 space-y-6 text-stone">
          {[
            { Icon: Sparkles, text: "Submit requests in seconds — from jets to tables for two." },
            { Icon: ShieldCheck, text: "Track every request live, from received to confirmed." },
            { Icon: Lock, text: "Encrypted messaging with your lifestyle manager, 24/7." },
          ].map(({ Icon, text }) => (
            <li key={text} className="flex items-center gap-4">
              <span className="grid size-11 place-items-center rounded-full border border-gold/25 text-gold">
                <Icon className="size-5" strokeWidth={1.25} />
              </span>
              {text}
            </li>
          ))}
        </ul>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.1, ease: luxEase }}
        className="lux-card mx-auto w-full max-w-md p-8 sm:p-10"
        data-active="true"
      >
        <Monogram className="size-14 text-gold" />
        <h2 className="mt-6 font-serif text-4xl text-ivory">Member sign in</h2>
        <p className="mt-2 text-sm text-stone">Secure access to your private concierge desk.</p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5" noValidate>
          <div>
            <label htmlFor="email" className="field-label">
              Email
            </label>
            <input id="email" type="email" autoComplete="email" {...register("email")} className="field" />
            {errors.email && <p className="field-error">{errors.email.message}</p>}
          </div>
          <div>
            <label htmlFor="passcode" className="field-label">
              6-digit passcode
            </label>
            <input
              id="passcode"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              {...register("passcode")}
              className="field tracking-[0.6em]"
            />
            {errors.passcode && <p className="field-error">{errors.passcode.message}</p>}
          </div>

          {authError && (
            <p role="alert" className="rounded-xl border border-[#e39b8b]/30 bg-[#e39b8b]/5 p-3 text-sm text-[#e9b2a5]">
              {authError}
            </p>
          )}

          <button type="submit" disabled={isSubmitting} className="btn-gold w-full">
            {isSubmitting ? (
              <>
                <LoaderCircle className="size-4 animate-spin" /> Verifying…
              </>
            ) : (
              <>
                <Lock className="size-4" /> Enter the portal
              </>
            )}
          </button>
        </form>

        <div className="mt-6 rounded-xl border border-dashed border-gold/25 bg-gold/[0.04] p-4">
          <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-gold">
            <KeyRound className="size-3.5" /> Preview access
          </p>
          <p className="mt-2 text-sm text-stone">
            {DEMO_MEMBER.email} · {DEMO_PASSCODE}
          </p>
          <button type="button" onClick={fillDemo} className="mt-3 text-sm text-gold-light underline-offset-4 hover:underline">
            Fill demo credentials →
          </button>
        </div>

        <p className="mt-8 text-center text-sm text-mist">
          Not yet a member?{" "}
          <Link href="/apply" className="text-gold-light hover:underline">
            Apply for membership
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
