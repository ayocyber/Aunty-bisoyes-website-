/**
 * Central brand configuration. Update these values to rebrand the entire site.
 * The email and social links (except TikTok) are still placeholders.
 */
export const site = {
  url: "https://beestouch.com",
  brand: "Beestouch",
  shortBrand: "B",
  tagline: "Private Lifestyle Concierge",
  founder: "Abisoye",
  founderFullName: "Abisoye Lawal Dada",
  founderTitle: "Founder & Principal Lifestyle Manager",
  description:
    "A discreet, members-only concierge for those who value time above all else. Private aviation, sold-out access, impossible reservations — handled with absolute discretion.",
  email: "concierge@beestouch.com",
  phone: "+234 701 957 8943",
  /** WhatsApp number in international format, digits only. All forms deliver here. */
  whatsapp: "2347019578943",
  hq: "Lagos · London · Dubai",
  socials: {
    instagram: "https://instagram.com/",
    linkedin: "https://linkedin.com/",
    tiktok: "https://www.tiktok.com/@softbeebee",
  },
  nav: [
    { label: "Philosophy", href: "/#philosophy" },
    { label: "Services", href: "/services" },
    { label: "Concierge", href: "/#founder" },
    { label: "Membership", href: "/#membership" },
    { label: "Clients", href: "/#clients" },
  ],
} as const;
