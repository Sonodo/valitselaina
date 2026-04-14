# VALITSE LAINA — Top 0.01% Plan

## Vision
Finland's most trusted, transparent loan comparison site. The consumer's advocate in a market full of dark patterns and hidden commissions. We show EVERYTHING — even loans from providers who don't pay us. We beat everyone by being the one site consumers can actually trust.

## Core Principles (Non-Negotiable)
1. **Show ALL loans** — including from non-affiliate providers. Competitors only show paying partners.
2. **True total cost always** — todellinen vuosikorko (effective annual rate), not misleading nominal rates
3. **Transparent affiliate disclosure** — every affiliate link clearly marked. Methodology page explains how we make money.
4. **No dark patterns** — no fake "pre-approved" messages, no countdown timers, no manufactured urgency
5. **Education first** — help people understand before they borrow
6. **Consumer advocacy** — content about rights, complaints, the positive credit register

## Competitive Edge
- Only Finnish comparison site showing non-partner loans alongside partner loans
- Open methodology — explain the ranking algorithm
- Real calculators that show actual costs (not lead-gen forms disguised as tools)
- Positive credit register (positiivinen luottorekisteri) education (launched 2024, most Finns still don't understand it)
- Consumer rights content (Kuluttajansuojalaki, interest rate caps, cooling-off periods)
- No "apply now" buttons that are actually just data collection — real links to providers

## Tech Stack
- Next.js 16 + TypeScript + React 19
- Tailwind CSS v4
- Recharts (for interest rate visualizations)
- Static data layer (MVP, no DB)
- Deploy: Vercel

## Revenue Model
1. **Affiliate commissions** (€50-200 per approved loan) — clearly disclosed
2. **AdSense** on educational content
3. **Lead generation partnerships** — only with transparent, regulated providers
4. **Future**: Premium tools, rate alerts, credit score monitoring partnerships

## Target Pages: 120+

### Core Product
- `/` — Homepage with hero, trust signals, quick comparison CTA
- `/vertailu` — Main loan comparison tool (multi-step: amount → purpose → duration → results)
- `/hakemus` — Explanation of how application process works (NOT a fake form)

### Loan Types (6 category pages)
- `/kulutusluotto` — Personal loans (€500-60,000)
- `/asuntolaina` — Mortgages (with Euribor tracker)
- `/autolaina` — Car loans
- `/yhdistelylaina` — Debt consolidation
- `/yrityslaina` — Business loans
- `/pikavippi` — Payday loans (with strong warnings and consumer protection info)

### Provider Directory (30+ providers × 2 = 60+ pages)
- `/lainanantajat` — Provider directory index
- `/lainanantajat/[slug]` — Individual provider pages with:
  - All products, real rates, terms
  - Honest pros/cons
  - Consumer reviews
  - FIN-FSA regulatory status
  - Complaint history if available

### Providers to Include
**Banks**: Nordea, OP, Danske Bank, S-Pankki, Aktia, Handelsbanken, Säästöpankki, POP Pankki, Oma Säästöpankki, Ålandsbanken
**Fintech/Online**: Bank Norwegian, Ferratum/Multitude, Resurs Bank, Svea Ekonomi, TF Bank, Santander Consumer Finance, Bigbank, Kraft Bank (ex-Instabank), GF Money, Lea Bank
**P2P**: Fellow Finance, Fixura
**Other**: Collector Bank, Avida Finance, Komplett Bank, Saldo Finance, LähiTapiola Finance

### Educational Guides (8 guides)
- `/oppaat/lainaamisen-perusteet` — Basics of borrowing
- `/oppaat/todellinen-vuosikorko` — Understanding effective interest rate
- `/oppaat/luottotiedot-suomessa` — Credit scoring in Finland + positive credit register
- `/oppaat/lainan-kilpailutus` — How to shop for the best loan
- `/oppaat/velkojen-yhdistely` — Debt consolidation guide
- `/oppaat/asuntolaina-ensiostajalle` — First-time homebuyer mortgage guide
- `/oppaat/kuluttajan-oikeudet` — Consumer rights with loans
- `/oppaat/velan-hallinta` — Debt management and recovery

### Blog (12 articles)
- Lainavertailu 2026: Näin löydät edullisimman lainan
- Kulutusluotto vai luottokortti — kumpi kannattaa?
- Asuntolainan marginaali 2026 — mitä pankit tarjoavat?
- Positiivinen luottorekisteri: Mitä se tarkoittaa sinulle?
- Lainan takaisinmaksu etuajassa — onko se kannattavaa?
- Pikalaina vai kulutusluotto — erot ja riskit
- Euribor-ennuste 2026 — mihin korot ovat menossa?
- Yhdistelylaina: Pelasta taloutesi vai velkaloukku?
- Autolaina vs osamaksu — kumpi on edullisempi?
- Lainahakemus hylättiin — mitä tehdä seuraavaksi?
- Yrityslaina aloittavalle yrittäjälle — vaihtoehdot 2026
- Lainan korko verovähennyskelpoisena — milloin hyödyt?

### Interactive Tools (6 calculators)
- `/tyokalut` — Tools hub
- `/tyokalut/lainanlaskuri` — Loan cost calculator (monthly payment, total cost, amortization schedule)
- `/tyokalut/jälleenrahoitus` — Refinancing calculator (savings from switching)
- `/tyokalut/yhdistelylaskuri` — Debt consolidation calculator
- `/tyokalut/maksukyky` — Affordability calculator (how much can you borrow)
- `/tyokalut/asuntolainanlaskuri` — Mortgage calculator (with Euribor scenarios)
- `/tyokalut/lyhennyssuunnitelma` — Amortization schedule generator

### SEO & Trust Pages
- `/menetelma` — Open methodology (how we rank, how we make money)
- `/tietoa` — About us
- `/yhteystiedot` — Contact
- `/tietosuoja` — Privacy policy
- `/kayttoehdot` — Terms of service
- `/evasteet` — Cookie policy
- `/media` — Press/media page with brand assets

### SEO Infrastructure
- Dynamic sitemap.ts
- robots.ts
- llms.txt
- JSON-LD structured data (FinancialProduct, Organization, Article, BreadcrumbList, FAQPage)
- OG image generation for all page types
- Per-page metadata

## Build Waves

### Wave 1: Foundation
- Project scaffolding (Next.js 16, config, Tailwind v4)
- TypeScript types (Provider, Loan, ComparisonResult, etc.)
- Constants (interest rate caps, Finnish regulations)
- Data layer: all providers + loan products
- Layout: Header, Footer, Navigation

### Wave 2: Core Product
- Homepage
- Comparison calculator (the crown jewel)
- Provider directory + individual pages
- Loan type category pages

### Wave 3: Content & Tools
- 8 educational guides
- 12 blog articles
- 6 calculator tools

### Wave 4: SEO & Polish
- Sitemap, robots, llms.txt
- OG image generation
- JSON-LD structured data
- Legal pages (privacy, terms, cookies)
- About, contact, methodology, media pages
- Error handling (404, error boundaries)
- Security headers

## Key Finnish Regulations to Reference
- **Kuluttajansuojalaki 7 luku** — Consumer credit regulations
- **Korkokatto 20%** — Interest rate cap for consumer credit (permanent since 2023)
- **14 päivän peruutusoikeus** — 14-day cooling-off period for consumer credit
- **Positiivinen luottorekisteri** — Launched April 2024, operated by Tulorekisteriyksikkö
- **Finanssivalvonta (FIN-FSA)** — Financial Supervisory Authority
- **Hyvä luotonantotapa** — Good lending practices obligation
