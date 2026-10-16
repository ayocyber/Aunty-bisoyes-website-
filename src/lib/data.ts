import type { LucideIcon } from "lucide-react";
import { Plane, Ticket, UtensilsCrossed, Building2, ShieldCheck } from "lucide-react";

export type CategoryId = "aviation" | "access" | "dining" | "estate" | "security";

export const categories: { id: CategoryId; label: string; short: string; icon: LucideIcon; blurb: string }[] = [
  {
    id: "aviation",
    label: "Private Aviation & Yachts",
    short: "Aviation & Yachts",
    icon: Plane,
    blurb: "Wheels-up in hours, not days. Superyachts crewed and provisioned to your exact taste.",
  },
  {
    id: "access",
    label: "Global Event Access",
    short: "Event Access",
    icon: Ticket,
    blurb: "Sold-out galas, front-row fashion, paddock passes and private viewings.",
  },
  {
    id: "dining",
    label: "Fine Dining & Reservations",
    short: "Fine Dining",
    icon: UtensilsCrossed,
    blurb: "The table that is never available — and private chefs who come to you.",
  },
  {
    id: "estate",
    label: "Real Estate & Relocation",
    short: "Real Estate",
    icon: Building2,
    blurb: "Off-market residences, villa rentals and seamless relocation for the whole household.",
  },
  {
    id: "security",
    label: "Personal Security",
    short: "Security",
    icon: ShieldCheck,
    blurb: "Close protection, secure transport and discreet travel risk management.",
  },
];

export type Service = {
  id: string;
  category: CategoryId;
  title: string;
  summary: string;
  description: string;
  leadTime: string;
  coverage: string;
  fulfillment: string[];
  includes: string[];
};

export const services: Service[] = [
  {
    id: "private-jet",
    category: "aviation",
    title: "Private Jet Charter",
    summary: "Light jets to ultra-long-range aircraft, on demand worldwide.",
    description:
      "From a same-day hop between Lagos and Accra to a transatlantic Global 7500 with a bespoke menu, we source, vet and manage every aspect of your flight — with Wyvern and ARG/US Platinum-rated operators only.",
    leadTime: "As little as 4 hours",
    coverage: "190+ countries",
    fulfillment: [
      "Aircraft options presented within 45 minutes",
      "Operator safety audit and crew verification",
      "FBO, customs and ground transfer coordination",
      "In-flight catering, florals and preferences on file",
    ],
    includes: ["Empty-leg sourcing", "Pet & excess baggage handling", "Live flight tracking"],
  },
  {
    id: "superyacht",
    category: "aviation",
    title: "Superyacht Charter",
    summary: "Crewed yachts across the Riviera, Caribbean and Indian Ocean.",
    description:
      "We match you to the right vessel and crew — not just the right length. Itineraries are designed around anchorages, beach clubs and private islands, with provisioning handled to the last bottle.",
    leadTime: "72 hours – 6 months",
    coverage: "Mediterranean, Caribbean, Seychelles, Maldives",
    fulfillment: [
      "Shortlist of three yachts with crew profiles",
      "In-person or video inspection on request",
      "Bespoke itinerary and berth reservations",
      "APA management and transparent reconciliation",
    ],
    includes: ["Water toys & tenders", "Onboard chef menus", "Helicopter transfers"],
  },
  {
    id: "helicopter",
    category: "aviation",
    title: "Helicopter & Ground Fleet",
    summary: "Seamless transfers — rotor, armoured or chauffeured.",
    description:
      "Avoid every queue. Helicopter transfers, chauffeured Maybachs and armoured SUVs synchronised to your flight times across every city you touch down in.",
    leadTime: "2 hours",
    coverage: "Major global cities",
    fulfillment: [
      "Vetted chauffeurs with security clearance",
      "Flight-synchronised meet & greet",
      "Vehicle preferences stored per city",
    ],
    includes: ["Airport fast-track", "Multilingual drivers", "Child seats & refreshments"],
  },
  {
    id: "galas",
    category: "access",
    title: "Sold-Out Galas & Premieres",
    summary: "The Met Gala after-parties, Cannes premieres, private fundraisers.",
    description:
      "Through long-held relationships with hosts, houses and promoters, we secure invitations that never reach the public — and arrange styling, transport and discreet arrival.",
    leadTime: "1 – 8 weeks",
    coverage: "Global",
    fulfillment: [
      "Confidential availability check with hosts",
      "Dress code and styling coordination",
      "Arrival choreography and security liaison",
    ],
    includes: ["Hair & makeup artists", "Couture rentals", "After-party access"],
  },
  {
    id: "sport",
    category: "access",
    title: "Premier Sporting Hospitality",
    summary: "F1 Paddock Club, Wimbledon debentures, Champions League finals.",
    description:
      "Paddock walks, Royal Box-adjacent seating and courtside access — curated alongside hotels and transfers so the entire weekend runs without a single wait.",
    leadTime: "48 hours – 6 months",
    coverage: "Monaco, Silverstone, Wimbledon, Abu Dhabi & more",
    fulfillment: [
      "Seat and hospitality tier recommendations",
      "Authenticated ticketing — never secondary resale risk",
      "Hotel, transfer and dining packaged together",
    ],
    includes: ["Pit-lane walks", "Driver meet-and-greets", "Private suites"],
  },
  {
    id: "fashion",
    category: "access",
    title: "Fashion Week & Private Viewings",
    summary: "Front-row seats and after-hours boutique appointments.",
    description:
      "Paris, Milan, London and Lagos fashion weeks — plus private, after-hours shopping at maisons that close their doors just for you.",
    leadTime: "1 – 4 weeks",
    coverage: "Paris, Milan, London, New York, Lagos",
    fulfillment: [
      "Show seating via house relationships",
      "Personal shopper and stylist pairing",
      "Waitlist placement for limited pieces",
    ],
    includes: ["Atelier visits", "Private trunk shows", "Shipping & customs"],
  },
  {
    id: "tables",
    category: "dining",
    title: "Impossible Reservations",
    summary: "Michelin-starred tables, chef's counters, members' clubs.",
    description:
      "Tonight at the restaurant that is booked for six months. We hold relationships with maître d's from Mayfair to Ikoyi, and know which table to ask for.",
    leadTime: "Same day",
    coverage: "1,200+ restaurants worldwide",
    fulfillment: [
      "Preferred table and seating noted",
      "Allergies and preferences pre-briefed to the kitchen",
      "Celebration details arranged discreetly",
    ],
    includes: ["Chef's table access", "Members' club guest entry", "Wine pre-selection"],
  },
  {
    id: "private-chef",
    category: "dining",
    title: "Private Chefs & Sommeliers",
    summary: "Michelin-trained chefs at your villa, yacht or residence.",
    description:
      "An intimate dinner for eight or a residency for the season — chefs and sommeliers selected to your palate, dietary needs and the occasion.",
    leadTime: "24 hours",
    coverage: "Global",
    fulfillment: [
      "Menu tasting and approval",
      "Ingredient sourcing from trusted purveyors",
      "Service staff, tableware and florals",
    ],
    includes: ["Wine cellar curation", "Event styling", "Full clean-down"],
  },
  {
    id: "celebrations",
    category: "dining",
    title: "Celebrations & Private Events",
    summary: "Milestone birthdays, proposals and intimate soirées.",
    description:
      "From a candlelit proposal on a Santorini terrace to a 200-guest milestone birthday, every detail is designed, produced and hosted by our events team.",
    leadTime: "1 – 12 weeks",
    coverage: "Global",
    fulfillment: [
      "Concept design and mood boards",
      "Venue buyouts and vendor management",
      "On-site event direction",
    ],
    includes: ["Entertainment booking", "Gifting", "Photography"],
  },
  {
    id: "off-market",
    category: "estate",
    title: "Off-Market Property Search",
    summary: "Residences that never reach a listing site.",
    description:
      "Discreet acquisition of prime residences in London, Dubai, Lagos and beyond — through private agent networks, with full due diligence and negotiation.",
    leadTime: "2 – 12 weeks",
    coverage: "London, Dubai, Lagos, Abuja, Miami, Monaco",
    fulfillment: [
      "Confidential brief and wishlist",
      "Curated private viewings or virtual tours",
      "Legal, survey and negotiation coordination",
    ],
    includes: ["NDA-protected search", "Interior design referrals", "Property management"],
  },
  {
    id: "villas",
    category: "estate",
    title: "Villa & Chalet Rentals",
    summary: "Fully staffed estates for the season or the weekend.",
    description:
      "Hand-inspected villas in Mykonos, ski chalets in Courchevel and safari lodges in the Serengeti — fully staffed and stocked before you arrive.",
    leadTime: "48 hours",
    coverage: "Europe, Africa, Caribbean, Middle East",
    fulfillment: [
      "Personal inspection reports",
      "Staff briefing on household preferences",
      "Arrival stocking and set-up",
    ],
    includes: ["Butlers & nannies", "Ski & safari guides", "Housekeeping"],
  },
  {
    id: "relocation",
    category: "estate",
    title: "Relocation & Household Setup",
    summary: "Move continents without lifting a finger.",
    description:
      "Schools, visas, staffing, art shipping and vehicle import — we orchestrate the entire relocation so your household lands ready to live.",
    leadTime: "4 – 16 weeks",
    coverage: "Global",
    fulfillment: [
      "Dedicated relocation lead",
      "School and residency applications",
      "Household staff recruitment and vetting",
    ],
    includes: ["Fine art logistics", "Pet relocation", "Utility & concierge setup"],
  },
  {
    id: "close-protection",
    category: "security",
    title: "Close Protection",
    summary: "Discreet, highly trained protection officers.",
    description:
      "SIA-licensed and ex-special-forces officers who blend into your day — whether at a board meeting, a red carpet or a family holiday.",
    leadTime: "12 hours",
    coverage: "Global",
    fulfillment: [
      "Threat and risk assessment",
      "Officer profile matching",
      "Advance route and venue reconnaissance",
    ],
    includes: ["Residential security", "Event security", "Family protection"],
  },
  {
    id: "secure-transport",
    category: "security",
    title: "Secure & Armoured Transport",
    summary: "B6-rated vehicles with trained security drivers.",
    description:
      "Armoured vehicles with evasive-driving-trained chauffeurs, coordinated with your protection detail and travel itinerary.",
    leadTime: "6 hours",
    coverage: "Africa, Middle East, Europe",
    fulfillment: ["Route planning and alternates", "Live GPS monitoring", "Convoy coordination"],
    includes: ["Airport-to-door service", "Medical-trained drivers", "Secure comms"],
  },
  {
    id: "travel-risk",
    category: "security",
    title: "Travel Risk & Digital Privacy",
    summary: "Intelligence briefings and privacy protection on the move.",
    description:
      "Pre-travel intelligence, medical evacuation cover and digital privacy audits — so your movements, data and family remain yours alone.",
    leadTime: "24 hours",
    coverage: "Global",
    fulfillment: ["Destination intelligence report", "24/7 operations desk", "Privacy and OSINT audit"],
    includes: ["Medevac coordination", "Secure devices", "Reputation monitoring"],
  },
];

export type Tier = {
  id: string;
  name: string;
  price: string;
  cadence: string;
  description: string;
  features: string[];
  featured?: boolean;
};

export const tiers: Tier[] = [
  {
    id: "signature",
    name: "Signature",
    price: "$1,500",
    cadence: "per month",
    description: "For the discerning individual who wants their time back.",
    features: [
      "Dedicated lifestyle manager",
      "Up to 10 requests monthly",
      "Restaurant & event priority access",
      "Response within 2 hours",
      "Private client portal",
    ],
  },
  {
    id: "bespoke",
    name: "Bespoke",
    price: "$4,500",
    cadence: "per month",
    description: "Unlimited, anticipatory service for you and your household.",
    features: [
      "Senior lifestyle manager + deputy",
      "Unlimited requests, 24/7",
      "Aviation & yacht booking desk",
      "Response within 15 minutes",
      "Household staffing & gifting",
      "Encrypted direct line",
    ],
    featured: true,
  },
  {
    id: "global-elite",
    name: "Global Elite",
    price: "By invitation",
    cadence: "annual retainer",
    description: "A private office for families and principals with global lives.",
    features: [
      "Personal attention of the founder",
      "Dedicated multi-city team",
      "Close protection & secure transport",
      "Off-market property mandate",
      "Family office & relocation support",
      "Immediate response, any hour",
    ],
  },
];

export const testimonials = [
  {
    quote:
      "I called at 11pm needing to be in Geneva by breakfast with my family. By midnight we had a jet, a car at the FBO and the hotel suite I always ask for. That is not service — that is peace of mind.",
    name: "Private Client",
    detail: "Founder, Private Equity · Lagos",
  },
  {
    quote:
      "Abisoye anticipates what I need before I've articulated it. Our relocation to London — schools, staff, the house — happened without me attending a single meeting.",
    name: "Private Client",
    detail: "Family Office Principal · London",
  },
  {
    quote:
      "Monaco Grand Prix, Paddock Club, two days' notice, during the busiest week of the year. I have stopped asking whether something is possible.",
    name: "Private Client",
    detail: "Chief Executive · Dubai",
  },
  {
    quote:
      "Discretion is everything in my world. In three years, not one detail of my life has ever left Beestouch. That is the real luxury.",
    name: "Private Client",
    detail: "Entertainment Executive · Abuja",
  },
];

export const cities = [
  "Lagos",
  "London",
  "Dubai",
  "Paris",
  "Monaco",
  "New York",
  "Abuja",
  "Accra",
  "Milan",
  "Marrakech",
  "Mykonos",
  "Cape Town",
  "Zanzibar",
  "Geneva",
];

export const stats = [
  { value: "24/7", label: "Human response, every hour" },
  { value: "< 15m", label: "Average reply time" },
  { value: "40+", label: "Cities with on-ground partners" },
  { value: "100%", label: "Discretion, always" },
];
