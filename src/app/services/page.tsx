import type { Metadata } from "next";
import { Catalog } from "@/components/services/Catalog";
import { Reveal } from "@/components/ui/Reveal";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Private aviation and yachts, global event access, fine dining, real estate and personal security — curated and fulfilled with discretion.",
};

export default function ServicesPage() {
  return (
    <div className="relative pt-36 pb-28">
      <div className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(201,169,110,0.14),transparent_70%)]" />
      <div className="container-lux">
        <Reveal className="max-w-4xl">
          <p className="eyebrow">Service Portfolio</p>
          <h1 className="heading-xl mt-8">
            Whatever you desire, <em className="text-gold-gradient">wherever you are.</em>
          </h1>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-stone">
            A curated portfolio of our most-requested services. Each is fulfilled by your dedicated lifestyle manager
            and a network of vetted partners — and if it isn’t listed, simply ask.
          </p>
        </Reveal>
        <div className="mt-16">
          <Catalog />
        </div>
      </div>
    </div>
  );
}
