# Valitse Laina (valitselaina.fi) — Status

**Project**: Valitse Laina — Finnish Loan Comparison
**Status**: LIVE at valitselaina.fi
**Health**: GREEN
**Domain**: valitselaina.fi (custom domain)
**GA4**: G-DB1138LVS1 (needs NEXT_PUBLIC_GA_ID env var in Vercel)
**Last Updated**: Session #087 — 2026-04-12

## Overview
Finland's most trusted, transparent loan comparison site. Consumer-first approach: shows ALL loans including from non-affiliate providers, real total costs (todellinen vuosikorko), no dark patterns. Covers consumer loans, mortgages, car loans, business loans, consolidation loans, and quick loans. Built as a Vertailu Hub spoke from day one.

## Current State — LIVE

- **Custom domain**: valitselaina.fi (Valitse brand)
- **GA4**: G-DB1138LVS1 — needs NEXT_PUBLIC_GA_ID env var set in Vercel for tracking to activate
- **GSC**: Verification tag added
- **Cross-links**: Links to other Valitse sites added
- All content verified and corrected

## Recent Changes

### Session #087 — New Logo + Valitse-ID Infra (2026-04-12)
- **New Valitse Laina logo deployed**: Updated brand mark live in production
- **Valitse-ID env vars set**: Shared Neon DB URL, Google OAuth client, AUTH_SECRET configured in Vercel
- **Production redeploy completed**: Site serving new logo + Valitse-ID infrastructure ready for frontend wiring

### Session #080 — Compliance Audit (2026-04-07)
- **Cookie consent added**: GDPR-compliant cookie banner implemented
- **Funding Circle removed**: Non-operating-in-Finland provider cleaned from data
- **Brand unified to Valitse**: Consistent branding across all pages
- **Deployed**: Changes pushed to production at valitselaina.fi

### Session #079 — Live Deployment + Data Corrections (2026-04-07)
- **LIVE at valitselaina.fi**: Custom domain configured and working
- **GA4 G-DB1138LVS1**: Tracking ID configured (needs env var in Vercel)
- **GSC verification tag added**: Google Search Console ready
- **Varainsiirtovero updated to 2024 reform**: 2%/4% → 1.5%/3% (current law)
- **ASP age limit updated to 2023 reform**: 18-39 → 15-44 (current law)
- **Provider data corrections**: GF Money, Funding Circle, Walley, LähiTapiola, Nordea, Danske Bank — all updated with accurate current data
- **Cross-links added**: Links to sibling Valitse comparison sites

### Session #075 — MVP Build (2026-04-01)
- Full MVP built — 38 source files, 7 loan type pages, comparison calculator, provider directory, educational content

## Pages Built
- `/` — Homepage with hero, trust signals, loan type navigation
- `/vertailu` — Multi-step loan comparison calculator
- `/kulutusluotto` — Consumer loan guide
- `/asuntolaina` — Mortgage guide
- `/autolaina` — Car loan guide
- `/yrityslaina` — Business loan guide
- `/yhdistelylaina` — Consolidation loan guide
- `/pikavippi` — Quick loan guide (with consumer protection emphasis)
- `/lainanantajat` — Provider directory
- `/lainanantajat/[slug]` — Individual provider pages

## Tech Stack
- Next.js 16 (App Router) + React 19 + TypeScript + Tailwind CSS v4
- Static data layer (MVP, no database)
- Deploy: Vercel
- Designed as Vertailu Hub spoke from day one

## Next Steps

1. **Set NEXT_PUBLIC_GA_ID env var in Vercel** — G-DB1138LVS1 (required for GA4 tracking)
2. **Submit sitemap to Google Search Console** — accelerate indexing
3. **Apply for Adtraction/direct affiliate partnerships** — loan affiliate programs
4. **Apply for AdSense** — organic traffic monetization
5. **Verify provider data accuracy** — periodic review against real Finnish loan products

## Blockers

- GA4 tracking not active until NEXT_PUBLIC_GA_ID is set in Vercel environment variables

## Chairman Actions Needed

- [ ] Set `NEXT_PUBLIC_GA_ID=G-DB1138LVS1` in Vercel environment variables

## Key Decisions Made
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Consumer-first transparency | Show ALL loans, not just affiliate partners. Open methodology. No dark patterns. |
| 2026-03-27 | Start with consumer loans (kulutusluotto) | Highest volume, simplest product for comparison, fastest path to revenue. |
| 2026-03-27 | Next.js 16 + TypeScript + Tailwind v4 | Empire standard stack. Static data layer for MVP (no DB). |

## Viability: 8.5/10
Loan comparison is a proven high-CPA vertical (EUR 50-200 per approved loan). Finnish market has several players but none with our consumer-first transparency approach.
