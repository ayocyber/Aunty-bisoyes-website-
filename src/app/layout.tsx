import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ConciergeChat } from "@/components/chat/ConciergeChat";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.brand} — ${site.tagline}`,
    template: `%s · ${site.brand}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.brand} — ${site.tagline}`,
    description: site.description,
    images: ["/images/bisoye.jpg"],
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0a09",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full">
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
        <ConciergeChat />
      </body>
    </html>
  );
}
