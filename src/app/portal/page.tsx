import type { Metadata } from "next";
import { Portal } from "@/components/portal/Portal";

export const metadata: Metadata = {
  title: "Client Portal",
  robots: { index: false, follow: false },
};

export default function PortalPage() {
  return <Portal />;
}
