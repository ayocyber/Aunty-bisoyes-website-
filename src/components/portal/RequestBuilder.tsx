"use client";

import { useEffect } from "react";
import { useForm, useWatch, type UseFormRegisterReturn } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LoaderCircle, Send } from "lucide-react";
import { categories, type CategoryId } from "@/lib/data";
import { BUDGETS, URGENCY, createRequest, prefillStore, sessionStore, type ConciergeRequest, type Urgency } from "@/lib/portal";
import { formatMessage, openWhatsApp } from "@/lib/whatsapp";

const schema = z.object({
  category: z.enum(categories.map((c) => c.id) as [CategoryId, ...CategoryId[]], {
    error: "Choose a service category",
  }),
  title: z.string().trim().min(4, "Briefly describe the request"),
  urgency: z.enum(["standard", "urgent", "immediate"], { error: "Select an urgency" }),
  location: z.string().trim().min(2, "Where should this take place?"),
  date: z.string().optional(),
  budget: z.enum(BUDGETS, { error: "Select a budget range" }),
  instructions: z.string().trim().max(800, "Please keep under 800 characters").optional(),
});
type Values = z.infer<typeof schema>;

export function RequestBuilder({ onCreated }: { onCreated: (r: ConciergeRequest) => void }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setFocus,
    control,
    formState: { errors, isSubmitting },
  } = useForm<Values>({
    resolver: zodResolver(schema),
    defaultValues: { urgency: "standard", instructions: "", date: "" },
  });

  // Pick up a service chosen from the public catalog.
  useEffect(() => {
    const prefill = prefillStore.get();
    if (!prefill) return;
    setValue("category", prefill.category);
    setValue("title", prefill.title);
    prefillStore.set(null);
    document.getElementById("request-builder")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => setFocus("location"), 500);
  }, [setValue, setFocus]);

  const onSubmit = (v: Values) => {
    const member = sessionStore.get();
    openWhatsApp(
      formatMessage(`New Concierge Request · ${URGENCY[v.urgency as Urgency].label}`, [
        ["Member", member ? `${member.name} (${member.memberNo})` : undefined],
        ["Service", categories.find((c) => c.id === v.category)?.label],
        ["Request", v.title],
        ["Location", v.location],
        ["Date", v.date],
        ["Budget", v.budget],
        ["Instructions", v.instructions],
      ]),
    );
    const req = createRequest({
      category: v.category,
      title: v.title,
      urgency: v.urgency as Urgency,
      location: v.location,
      date: v.date || undefined,
      budget: v.budget,
      instructions: v.instructions || undefined,
    });
    reset({ urgency: "standard", instructions: "", date: "", title: "", location: "" });
    onCreated(req);
  };

  const instructions = useWatch({ control, name: "instructions" }) ?? "";

  return (
    <form id="request-builder" onSubmit={handleSubmit(onSubmit)} noValidate className="lux-card scroll-mt-28 p-6 sm:p-8">
      <p className="eyebrow">New Request</p>
      <h2 className="mt-4 font-serif text-3xl text-ivory">What may we arrange?</h2>

      <div className="mt-8 space-y-6">
        <fieldset>
          <legend className="field-label">Service category</legend>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-3">
            {categories.map((c) => (
              <label
                key={c.id}
                className="flex cursor-pointer flex-col items-start gap-2 rounded-xl border border-ivory/10 p-3 text-[12px] leading-tight text-stone transition hover:border-gold/40 has-[:checked]:border-gold has-[:checked]:bg-gold/[0.07] has-[:checked]:text-ivory has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold/50"
              >
                <input type="radio" value={c.id} {...register("category")} className="sr-only" />
                <c.icon className="size-5 text-gold" strokeWidth={1.25} />
                {c.short}
              </label>
            ))}
          </div>
          {errors.category && <p className="field-error">{errors.category.message}</p>}
        </fieldset>

        <div>
          <label htmlFor="rq-title" className="field-label">
            Request
          </label>
          <input id="rq-title" {...register("title")} className="field" placeholder="e.g. Table for four at Nobu, Friday 8pm" />
          {errors.title && <p className="field-error">{errors.title.message}</p>}
        </div>

        <fieldset>
          <legend className="field-label">Urgency</legend>
          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-1 2xl:grid-cols-3">
            {(Object.keys(URGENCY) as Urgency[]).map((u) => (
              <UrgencyOption key={u} id={u} registration={register("urgency")} />
            ))}
          </div>
        </fieldset>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="rq-location" className="field-label">
              Destination / location
            </label>
            <input id="rq-location" {...register("location")} className="field" placeholder="City or venue" />
            {errors.location && <p className="field-error">{errors.location.message}</p>}
          </div>
          <div>
            <label htmlFor="rq-date" className="field-label">
              Date (optional)
            </label>
            <input id="rq-date" type="date" {...register("date")} className="field [color-scheme:dark]" />
          </div>
        </div>

        <div>
          <label htmlFor="rq-budget" className="field-label">
            Budget range
          </label>
          <select id="rq-budget" {...register("budget")} defaultValue="" className="field appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%2212%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%23c9a96e%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[length:14px] bg-[right_1rem_center] bg-no-repeat pr-10">
            <option value="" disabled>
              Select a range
            </option>
            {BUDGETS.map((b) => (
              <option key={b} value={b} className="bg-onyx">
                {b}
              </option>
            ))}
          </select>
          {errors.budget && <p className="field-error">{errors.budget.message}</p>}
        </div>

        <div>
          <label htmlFor="rq-notes" className="field-label">
            Special instructions
          </label>
          <textarea
            id="rq-notes"
            rows={4}
            {...register("instructions")}
            className="field resize-none"
            placeholder="Guests, preferences, dietary needs, discretion requirements…"
          />
          <div className="mt-1.5 flex justify-between">
            {errors.instructions ? <p className="field-error !mt-0">{errors.instructions.message}</p> : <span />}
            <span className="text-xs text-mist">{instructions.length}/800</span>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="btn-gold w-full">
          {isSubmitting ? (
            <>
              <LoaderCircle className="size-4 animate-spin" /> Opening WhatsApp…
            </>
          ) : (
            <>
              <Send className="size-4" /> Send via WhatsApp
            </>
          )}
        </button>
      </div>
    </form>
  );
}

function UrgencyOption({ id, registration }: { id: Urgency; registration: UseFormRegisterReturn }) {
  const u = URGENCY[id];
  const dot = id === "immediate" ? "bg-[#e57c63]" : id === "urgent" ? "bg-gold" : "bg-emerald-400";
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-ivory/10 px-4 py-3 transition hover:border-gold/40 has-[:checked]:border-gold has-[:checked]:bg-gold/[0.07] has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-gold/50">
      <input type="radio" value={id} {...registration} className="sr-only" />
      <span className={`size-2 shrink-0 rounded-full ${dot} ${id === "immediate" ? "animate-pulse-soft" : ""}`} />
      <span className="leading-tight">
        <span className="block text-[13px] font-medium text-ivory">{u.label}</span>
        <span className="block text-[11px] text-mist">{u.note}</span>
      </span>
    </label>
  );
}
