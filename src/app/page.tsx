import { Hero } from "@/components/home/Hero";
import {
  CityMarquee,
  Philosophy,
  ServicesPreview,
  Founder,
  Process,
  Membership,
  FinalCTA,
} from "@/components/home/Sections";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <CityMarquee />
      <Philosophy />
      <ServicesPreview />
      <Founder />
      <Process />
      <Membership />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
