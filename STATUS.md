# Lainavertailu — Status

**Project**: Lainavertailu — Finnish Loan Comparison
**Status**: ACTIVE — Publication-ready — all fixes applied, awaiting deployment
**Created**: 2026-03-27
**Last Updated**: 2026-04-01 (Session #075)

## Overview
Finland's most trusted, transparent loan comparison site. Consumer-first approach: shows ALL loans including from non-affiliate providers, real total costs (todellinen vuosikorko), no dark patterns. Covers consumer loans, mortgages, car loans, business loans, consolidation loans, and quick loans. Built as a Vertailu Hub spoke from day one.

## Current Sprint
MVP built — needs review, provider data verification, and deployment.

## Recent Progress
- 2026-03-27: Project created as part of Vertailu Hub ecosystem buildout
- 2026-03-27: Full MVP built — 38 source files, 7 loan type pages, comparison calculator, provider directory, educational content
- 2026-03-27: Next.js 16 build successful

## Blockers
- Domain not yet registered (lainavertailu.fi)
- Provider data needs verification against real Finnish loan products
- Affiliate partnerships not established

## Next Steps
1. Review and QA the MVP build
2. Register domain (lainavertailu.fi)
3. Verify provider data accuracy
4. Set up Adtraction/direct affiliate partnerships
5. Deploy to Vercel
6. GA4 + GSC setup

## Key Decisions Made
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-27 | Consumer-first transparency | Show ALL loans, not just affiliate partners. Open methodology. No dark patterns. Differentiator in a market full of lead-gen forms disguised as comparison tools. |
| 2026-03-27 | Start with consumer loans (kulutusluotto) | Highest volume, simplest product for comparison, fastest path to revenue. |
| 2026-03-27 | Next.js 16 + TypeScript + Tailwind v4 | Empire standard stack. Static data layer for MVP (no DB). |

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

## Viability: 8.5/10
Loan comparison is a proven high-CPA vertical (EUR 50-200 per approved loan). Finnish market has several players but none with our consumer-first transparency approach.
