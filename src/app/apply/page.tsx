import type { Metadata } from "next";
import { ApplicationForm } from "@/components/apply/ApplicationForm";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Apply for Membership",
  description: "A confidential application for membership. Every enquiry is reviewed personally.",
};

export default function ApplyPage() {
  return (
    <div className="relative pt-36 pb-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_60%_60%_at_30%_0%,rgba(201,169,110,0.14),transparent_70%)]" />
      <div className="container-lux">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">Membership Application</p>
          <h1 className="heading-lg mt-8">
            A private conversation <em className="text-gold-light">begins here.</em>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone">
            Four short steps, roughly three minutes. There is no obligation, and nothing you share leaves our founding
            team.
          </p>
        </Reveal>
        <div className="mt-16">
          <ApplicationForm />
        </div>
      </div>
    </div>
  );
}
