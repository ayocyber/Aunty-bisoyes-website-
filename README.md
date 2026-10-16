# Beestouch — Private Lifestyle Concierge

Luxury concierge web app built with Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Framer Motion, Lucide, React Hook Form and Zod.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start   # production
```

> On this machine, HTTPS traffic is intercepted by local security software, so npm needs Windows' certificate store:
> `$env:NODE_OPTIONS="--use-system-ca"; npm install` (PowerShell). Fonts are self-hosted, so builds don't need the network.

## Pages

| Route       | What it is |
|-------------|-----------|
| `/`         | Cinematic hero, philosophy, services, founder story, process, membership tiers, testimonials |
| `/services` | Filterable, searchable catalog (15 services, 5 categories) with detail modals |
| `/apply`    | 4-step membership application with per-step validation |
| `/portal`   | Client login → dashboard: request builder, live status tracker, membership card |
| (global)    | Floating encrypted-messaging drawer with the lifestyle manager |

**Demo portal login:** `member@beestouch.com` / `246810` (or click "Fill demo credentials").

## Customise

- **Brand, contact details, socials:** `src/lib/site.ts` (placeholders, so replace them before launch)
- **Services, tiers, testimonials, cities, stats:** `src/lib/data.ts`
- **Colours & typography:** `@theme` block in `src/app/globals.css`
- **Founder photo (Abisoye Lawal Dada):** `public/images/bisoye.jpg`

## Going to production

All forms and the chat send to WhatsApp (number set in `src/lib/site.ts`). Portal data lives in the browser (localStorage) and login is a demo.
`prisma/schema.prisma` contains the Postgres model. Wire it up with server actions, replace the mock auth in
`src/components/portal/Login.tsx` with a real provider (Auth.js / Clerk), and connect chat to a realtime service
(e.g. Pusher, Ably, or Supabase Realtime). Deploy to Vercel.
