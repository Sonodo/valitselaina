# Lainavertailu — Status

**Project**: Lainavertailu — Finnish Loan Comparison
**Status**: LIVE at valitselaina.fi
**Health**: GREEN
**Domain**: valitselaina.fi (custom domain)
**GA4**: G-DB1138LVS1 (needs NEXT_PUBLIC_GA_ID env var in Vercel)
**Compliance posture**: **PUBLISHER LANE** — see [`COMPLIANCE_RED_LINES.md`](./COMPLIANCE_RED_LINES.md) and [`CLAUDE.md`](./CLAUDE.md). Enforced by `npm run check:publisher-lane` (auto-runs as `prebuild`).
**Last Updated**: Session #088 — 2026-04-13

## ⛔ Compliance — read before any code change

Valitse Laina operates strictly in the **publisher lane** under Finnish KSL 7:7 / KKV linjaus. Crossing the line into `luotonvälittäjä` (credit intermediary) territory triggers FIVA registration, supervision, and personal liability for the chairman.

**The 10 red lines are documented in [`COMPLIANCE_RED_LINES.md`](./COMPLIANCE_RED_LINES.md)**. The shortlist:
1. No on-site loan application form
2. No offer-solicitation flow (no POST to partner APIs)
3. No personalized eligibility / pre-qualification
4. No self-description as `lainanvälittäjä` / `luotonvälittäjä` (negations OK)
5. No "yksi hakemus, useita tarjouksia" language or mechanic
6. No backend that proxies, brokers, scores, or stores loan applications
7. No collection of henkilötunnus, income, employment, debts, or maksuhäiriö
8. No "guaranteed approval" / "no credit check" / "with payment defaults" claims
9. No commission, fee, or payment from the consumer
10. No personalized human-in-the-loop credit recommendations

**Enforcement**: `scripts/check-publisher-lane.mjs` greps the source tree for forbidden patterns and exits non-zero if any are found. It runs as `prebuild`, so Vercel deployments fail closed if a violation lands on `master`. Run it locally before every commit:

```bash
npm run check:publisher-lane
```

**Canonical regulatory memo**: `_EMPIRE_HQ/MARKETING/VALITSE_GROUP_PLAYBOOK/MEMO_FIVA_AFFILIATE_QUESTION.md`

## Overview
Finland's most trusted, transparent loan comparison site. Consumer-first approach: shows ALL loans including from non-affiliate providers, real total costs (todellinen vuosikorko), no dark patterns. Covers consumer loans, mortgages, car loans, business loans, consolidation loans, and quick loans. Built as a Vertailu Hub spoke from day one.

## Current State — LIVE

- **Custom domain**: valitselaina.fi (Valitse brand)
- **GA4**: G-DB1138LVS1 — needs NEXT_PUBLIC_GA_ID env var set in Vercel for tracking to activate
- **GSC**: Verification tag added
- **Cross-links**: Links to other Valitse sites added
- All content verified and corrected

## Recent Changes

### Session #088 — Publisher-Lane Red Lines Embedded (2026-04-13)
- **`COMPLIANCE_RED_LINES.md` created** — 10 canonical publisher-lane rules with full Finnish primary-source reasoning
- **`CLAUDE.md` updated** — auto-loads the 10 red lines into every Claude Code session opened in this directory
- **`scripts/check-publisher-lane.mjs` created** — static grep enforcer with negation tolerance for legitimate disclaimers
- **`package.json` wired** — `prebuild` hook auto-runs the check; Vercel deployments fail closed on violations
- **One real violation fixed** — `src/data/guides.ts` line 698-717 was describing a Sortter-style broker service ("Yksi hakemus, useita tarjouksia. Vertailupalvelu välittää tietosi useille lainanantajille") and labeling it "kuten Valitse Laina". Rewritten to accurately describe the publisher-lane flow: filter static catalog → click out → user applies on the lender's own site
- **STATUS audit**: Calculator (`src/components/calculator/**`) confirmed 100% client-side — no API, no data passthrough, no form submission. Pure publisher lane.

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
