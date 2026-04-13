# Valitse Laina — Compliance Red Lines

**Authority**: Chairman, Valitse Group
**Status**: Frozen v1.0 — Session #088, 2026-04-13
**Canonical source**: `_EMPIRE_HQ/MARKETING/VALITSE_GROUP_PLAYBOOK/MEMO_FIVA_AFFILIATE_QUESTION.md`
**Enforcement**: `scripts/check-publisher-lane.mjs` (auto-runs as `prebuild` and `lint:compliance`)

---

## TL;DR — the legal posture

Valitse Laina is a **publisher**, not a `luotonvälittäjä` (credit intermediary). We publish editorial content and a comparison calculator that filters a **static catalog of lender products** and outputs **affiliate links** to the lenders' own websites. The user applies on the lender's site, with the lender. We never see the application, we never solicit offers from the lenders on the user's behalf, we never collect financial data.

This posture means:
- **No FIVA registration required.** FIVA's MOK 4/2018 binds licensed lenders, not their affiliates. Finland is **not** on Google Ads' mandatory Financial Services Verification list.
- **KKV is our primary regulator** under kuluttajansuojalaki 2 luku (consumer marketing supervision).
- **The KKV line is bright and one-way**: the moment we solicit offers from partners and present them back to the user, we become a `luotonvälittäjä` under KSL 7:7 → FIVA registration becomes mandatory → personal supervisory liability for the chairman. Per the KKV IPF Digital Finland ratkaisu (23.11.2022) this reclassification is decisive even when we never see money from the consumer.

We **do not** cross. Ever.

---

## The 10 red lines

### 1. No on-site loan application form
**The rule:** No input field, modal, or form on any valitselaina.fi page that collects information used to apply for credit. Specifically: income, employment status, employer, occupation, marital status, number of dependents, existing debts, credit card balances, mortgage balance, monthly expenses, bank account number, IBAN, payment history, henkilötunnus, ID document upload.

**What is allowed:** the calculator's three inputs — `amount`, `termMonths`, `loanType`. These describe a hypothetical loan, not an applicant.

**Code locations to police:** `src/components/calculator/LoanDetailsStep.tsx`, `PreferencesStep.tsx`, any new component under `src/components/calculator/`, any new page under `src/app/`.

**Why:** KSL 7:7 + EU CCD 2008/48 art. 3(f). The CCD intermediary definition is triggered by "presenting credit agreements to consumers". Collecting application data is the prerequisite to that.

---

### 2. No offer-solicitation flow
**The rule:** No code path that POSTs user details to a partner API, polls a partner system, or receives a personalized offer back. All rates and terms displayed in the calculator come from `src/data/providers.ts` — the lender's own published "alkaen"-rates, frozen at our last manual data review.

**What is allowed:** affiliate-link click-out via plain `<a href={provider.website} target="_blank" rel="noopener noreferrer nofollow">`. The user lands on the lender's own application page.

**Code locations to police:** `src/app/api/**` (this directory should not contain any loan-related route), `src/lib/**` (no fetch-based partner integrations), `src/components/calculator/ResultCard.tsx` (the CTA must remain a plain anchor, not a form submit).

**Why:** This is the **decisive criterion** in the KKV IPF Digital Finland ratkaisu (23.11.2022). The KKV explicitly held that "kuluttajille suunnattua luottojen kilpailutus- ja vertailupalvelua on pidettävä luotonvälittämisenä palveluntarjoajan avustaessa kuluttajia luottosopimuksen tekemisessä **pyytämällä tarjouksia yhteistyökumppaneilta**". Soliciting offers = brokering, regardless of money flow.

---

### 3. No personalized eligibility / pre-qualification
**The rule:** No flow that returns "lenders likely to approve you", "your match score", "your estimated rate", "how much you could borrow". The calculator outputs a **static filter** of our catalog by amount, term, and type. Sort order is by transparent calculation (cheapest by total cost, lowest monthly payment, fastest processing) — not by an opaque personalized score.

**What is allowed:** generic ranking ("Edullisin", rank badges 1–3) computed entirely client-side from the static catalog.

**Code locations to police:** `ComparisonCalculator.tsx` `useMemo` block, any new sort/filter logic, the results header.

**Why:** Pre-qualification is a hallmark of `luotonvälitys` even without an application form. It implies we are evaluating the consumer against partner criteria — which requires a relationship with the partner that goes beyond publisher.

---

### 4. No self-description as a credit intermediary
**The rule:** None of these terms may describe Valitse Laina anywhere — UI text, page metadata, schema.org JSON-LD, og:title/og:description, alt text, structured data, sitemap, ad copy, email, push notification, in-app message, footer disclaimer:
- `lainavälittäjä`
- `luotonvälittäjä`
- `välitämme lainoja`
- `välitämme luottoja`
- `lainanvälittäjä`
- `rahoitusvälittäjä`
- `välitystoiminta`
- `me välitä` (any conjugation)

**The only acceptable usage is a negation:** "Valitse Laina **ei** ole lainanvälittäjä" / "Emme ole rahoituslaitos tai lainanvälittäjä — olemme tietopalvelu" / "Emme välitä lainoja". The check script tolerates these by requiring an `ei`/`emme`/`ole` within 40 characters.

**Code locations to police:** all `*.tsx`, `*.mdx`, `*.json` (manifests, structured data), the privacy policy, the about page, the footer.

**Why:** Self-description is **dispositive** in the KKV's reasoning. If we tell the world we are a `luotonvälittäjä`, we are one — regardless of the actual product mechanics. This is the cheapest red line to cross by accident (one stray sentence from a copywriter or AI agent) and one of the hardest to undo (Google Ads account-level review, Wayback Machine archives).

---

### 5. No "one application, multiple lenders" language or mechanic
**The rule:** Banned phrases anywhere on the site or in any outbound marketing:
- `yksi hakemus, useita tarjouksia`
- `yhdellä hakemuksella useita tarjouksia`
- `yhteishakemus`
- `kilpailuta lainasi yhdellä hakemuksella`
- `lähetämme tietosi pankeille`
- `lähetämme hakemuksesi`
- `pyydämme tarjouksia puolestasi`
- any English equivalent

**Why:** This phrase pattern is the marketing tagline of the entire `luotonvälittäjä` category in Finland (Sortter, Etua, Rahalaitos, Lainaayritykselle.fi all use it). Using it identifies us as part of that category. The KKV ratkaisu cites comparable wording as evidence of the broker classification.

---

### 6. No backend proxying, brokering, scoring, or storing loan applications
**The rule:** The Next.js `src/app/api/**` directory must never contain a route that:
- accepts financial data about a user
- forwards data to a partner system
- receives offers from a partner system
- stores loan-application state in any database (Neon or otherwise)

Banned table/route/function names: `applications`, `loan_requests`, `borrower_profiles`, `applicant`, `prequalify`, `score_user`, `submit_application`, `partner_offers_inbox`, `lender_webhook`, `apply`, `loanApply`.

**What is allowed:** `src/app/api/health`, `src/app/api/sitemap-revalidate`, `src/app/api/og` (image generation), and similar non-loan plumbing. Email-list opt-ins are **not** allowed in this project (Brevo subscriptions go via the marketing site, not here).

**Code locations to police:** `src/app/api/**`, any new file matching `*.sql`, `*.prisma`, `migrations/**`, `db/schema*`.

**Why:** A backend that touches loan applications is the unambiguous infrastructure of a `luotonvälittäjä`. There is no defensible "we just store it for the user" carveout — KKV and FIVA have both consistently treated data possession as evidence of intermediation.

---

### 7. No collection of henkilötunnus, income, employment, debts, or maksuhäiriömerkintä
**The rule:** No input, no cookie, no analytics event, no logging that captures: Finnish henkilötunnus, salary, monthly income, employer, employment status, occupation, existing debt total, payment defaults, maksuhäiriö flags, credit score, mortgage balance.

**Code locations to police:** all forms (currently none), all analytics events (`window.dataLayer.push`, `gtag`), GA4 custom dimensions, any new tracking pixel. The privacy policy at `src/app/tietosuoja/page.tsx` must continue to state explicitly: "Valitse Laina ei kerää lainahakemus- tai henkilökohtaisia taloustietoja". If you change behavior, change the privacy policy first and have it reviewed.

**Why:** Independent of credit law, this would also trigger tietosuoja-asetus art. 9 (special-category data implications via maksuhäiriö) and KKV good-marketing rules. Triple exposure for a single mistake.

---

### 8. No "guaranteed approval" / "no credit check" / "with payment defaults" claims
**The rule:** Banned phrases anywhere — copy, metadata, ad copy, email, push, JSON-LD:
- `takuulla laina` / `takuuhyväksyntä` / `takuuvarma`
- `aina hyväksytty` / `varma hyväksyntä` / `100% hyväksyntä`
- `ilman luottotietoja` / `ilman luottotietojen tarkistusta`
- `maksuhäiriömerkinnällä` / `maksuhäiriöisille` / `vaikka maksuhäiriö`
- `varma laina`
- `taatusti hyväksytty`

**Why:** These violate **three** independent regimes simultaneously: (a) KKV good-credit-marketing rules under KSL 7:13 (markkinoinnin hyvä tapa), (b) Google Personal Loans policy (which would block our entire Google Ads account, not just a single ad), (c) Meta Special Ad Category for Credit. They are also factually false for any responsible lender, so they identify us as low-quality regardless of regulator action.

---

### 9. No commission, fee, or payment from the consumer
**The rule:** The service is and remains 100% free for end users. No "premium tier", no "priority listing for €X", no "your detailed credit assessment for €Y", no donation funnel, no tip jar tied to results. Affiliate revenue from lenders, paid post-conversion, is the **only** monetization path.

**Code locations to police:** any new Stripe / payment integration, any new pricing page, any new "upgrade" CTA. Lainavertailu has zero payment infrastructure today — keep it that way. Stripe lives in Lakimaatti, not here.

**Why:** Charging the consumer for a credit-related service is itself a regulatory trigger (advisory fees fall under KSL 7:7). It also destroys our positioning — "100% free for consumers" is a load-bearing trust signal across all 5 Valitse brands.

---

### 10. No personalized human-in-the-loop credit recommendations
**The rule:** No live chat, no email reply, no SMS, no support ticket, no in-app message that:
- evaluates one specific user's borrowing situation
- recommends a specific lender or loan product to that user
- gives an opinion on whether they should borrow, refinance, or consolidate

**What is allowed:** general editorial content (loan-type guides, market commentary, regulatory explainers), automated FAQ replies that point to public content, and customer support that handles **non-credit-substantive** questions (site bugs, broken links, GDPR data requests).

**Code locations to police:** any new chat widget, any new help-desk integration (Intercom/Zendesk/Crisp/etc.), any new email template that addresses a single user about a single loan decision, any AI agent prompt that touches user data.

**Why:** Personalized credit advice is its own license category in Finland (luottoneuvonta, related to but distinct from luotonvälitys). It would also create an unbounded liability surface — a single bad recommendation that we can't insure against. The push playbook's `MEMO_FIVA_AFFILIATE_QUESTION.md` calls this out explicitly: "automate the engine, never the lawyer".

---

## How this is enforced

### Static check (CI + local)
`scripts/check-publisher-lane.mjs` greps the source tree for forbidden patterns and exits non-zero if any are found, **except** for occurrences flanked by an `ei`/`emme`/`ole` negation marker (so the about-page text "Emme ole rahoituslaitos tai lainanvälittäjä" passes).

It is wired into `package.json` as:
- `check:publisher-lane` — manual run
- `prebuild` — auto-runs before `next build`, so Vercel deployments fail closed
- Optional pre-commit (set up via Husky if/when added)

### Read-first protocol for AI agents
`CLAUDE.md` at the project root references this file and lists the 10 rules inline so any Claude Code session opened against this directory loads them automatically. Every file-touch in `src/app/vertailu/**`, `src/components/calculator/**`, or `src/app/api/**` should re-read the relevant rules before editing.

### Human review before product changes
Any feature proposal that touches the calculator, adds an API route, or introduces a new lead-collection flow must be reviewed against this document **before** an implementation agent is dispatched. The chairman, not an agent, makes the publisher-lane call.

---

## What is *not* a red line (deliberate clarifications)

These are common false positives — they look like they might cross the line, but don't:

- **The word "pikavippi"** — the editorial guide at `/pikavippi` warns consumers about pikavipit. Editorial coverage of a loan category is not the same as offering it. The check script does **not** flag `pikavippi`.
- **The word "Hae lainaa" as a CTA on `<a href={lender}>`** — the user is going to apply on the lender's site. It would be misleading *not* to label the link as "apply for a loan". The check script does not flag this in `src/components/calculator/ResultCard.tsx`.
- **The word "kilpailuta"** as in "vertaa ja kilpailuta lainoja itse" — comparing prices is not brokering. The check script flags `kilpailutamme puolestasi` / `kilpailutus puolestasi` / similar agentive constructions, not the verb on its own.
- **The word "lainanantaja"** — that describes our partners, not us. Always allowed.
- **Mentioning that lenders pay us commission** — disclosing affiliate relationships is required (KKV markkinoinnin tunnistettavuus). Always allowed.
- **Showing "alkaen"-korot from lenders** — these are the lender's own published prices. Republishing them is publishing, not brokering.

---

## Change protocol

This document is **frozen**. To change it:
1. Re-read `_EMPIRE_HQ/MARKETING/VALITSE_GROUP_PLAYBOOK/MEMO_FIVA_AFFILIATE_QUESTION.md` end-to-end.
2. Identify the specific Finnish primary source (KSL section, KKV linjaus, FIVA MOK paragraph, EU directive article) that supports the change.
3. Write a memo to the chairman with the source citation and the proposed delta.
4. **Chairman approval required** before the file is edited. No agent unilaterally changes a red line.

Versions are kept in git history. There is no archive folder — the diff is the audit trail.

---

*Last reviewed: 2026-04-13 — Session #088*
*Owner: Henri Linnainmaa (Chairman)*
*Implementation owner: Claude (CEO) for orchestration + check-script maintenance*
