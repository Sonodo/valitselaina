# Lainavertailu — Dev Guide

> **READ FIRST: [`COMPLIANCE_RED_LINES.md`](./COMPLIANCE_RED_LINES.md)** — Valitse Laina operates in the strict **publisher lane** (Finnish KSL 7:7 / KKV linjaus). Crossing any of the 10 red lines below converts us from a tietopalvelu into a `luotonvälittäjä`, which triggers FIVA registration, supervision, and personal liability for the chairman. **Never** introduce code, copy, or features that violate them — even "temporarily", even "behind a flag".

## ⛔ The 10 publisher-lane red lines (NEVER CROSS)

These are the canonical list. The full reasoning lives in `COMPLIANCE_RED_LINES.md` and in `_EMPIRE_HQ/MARKETING/VALITSE_GROUP_PLAYBOOK/MEMO_FIVA_AFFILIATE_QUESTION.md`.

1. **No on-site loan application form.** No field that collects financial data (income, employment, debts, social security number) on any valitselaina.fi page. The user applies on the **lender's own site** after clicking out.
2. **No offer-solicitation flow.** We never POST user details to a partner API, never receive offers back, never display "your personalized rate". All numbers shown are the lender's own published "alkaen"-rates from static data.
3. **No quiz/eligibility check that returns lender-matched results.** A multi-step calculator that filters our static catalog by amount/term/type is fine. A flow that says "we found 3 lenders likely to approve you" is **not** fine.
4. **No self-description as `lainavälittäjä`, `luotonvälittäjä`, `välitämme lainoja/luottoja`, `lainanvälittäjä`, `rahoitusvälittäjä`** anywhere — UI text, metadata, schema.org, alt text, ad copy, email, push, structured data. Only acceptable usage is a **negation** ("emme ole lainanvälittäjä").
5. **No "one application, multiple lenders"** language or feature. That is the textbook definition of luotonvälitys per the KKV IPF Digital ratkaisu (2022). Banned phrases: "yksi hakemus", "yhdellä hakemuksella useita tarjouksia", "yhteishakemus", "lähetämme tietosi pankeille".
6. **No backend that proxies, brokers, scores, pre-qualifies, or stores loan applications.** No `/api/apply`, no Neon table named `applications` / `loan_requests` / `borrower_profiles`, no webhook receiver for partner offers.
7. **No collection of `henkilötunnus`, income, employment, existing debts, or maksuhäiriömerkintä** anywhere on the site. The privacy policy explicitly states we don't — keep it that way.
8. **No "guaranteed approval" / "always approved" / "without credit check" / "with payment defaults" claims.** Banned: `takuulla laina`, `takuuhyväksyntä`, `aina hyväksytty`, `ilman luottotietoja`, `maksuhäiriömerkinnällä`, `varma laina`. These violate KKV good-credit-marketing rules **and** Google Personal Loans policy independently.
9. **No commission/fee/payment from the consumer.** The service is and remains 100% free for end users. Affiliate revenue from lenders only, paid post-conversion.
10. **No human in the loop on our side for individual loan recommendations.** No live chat that says "based on your situation, take loan X". No email/SMS that addresses one user's specific borrowing decision. Editorial content (general guides, market commentary) is fine; personalized financial advice is not.

**Why these specifically:** Crossing #1, #2, #3, #5, or #6 alone is enough to reclassify Valitse Laina as a `luotonvälittäjä` under KSL 7:7 → mandatory FIVA registration → personal liability. Crossing #4 is enough on its own (self-description is decisive in KKV's reasoning). Crossing #7 triggers tietosuoja-asetus + KKV exposure simultaneously. Crossing #8 risks Google Ads account-level termination + KKV warning. Crossing #9 reclassifies us as a paid intermediary regardless of the other rules. Crossing #10 turns us into investment/credit advice (sijoitus-/luottoneuvonta), which is its own license category.

**Before merging any change to:**
- `src/app/vertailu/**`, `src/components/calculator/**` → re-read rules 1, 2, 3, 5, 6, 7
- `src/app/api/**` (any new route) → re-read rule 6 — there should never be a loan-application-related API route
- `src/data/providers.ts` → re-read rule 8 — provider data is the lender's own published terms only
- Any page copy, metadata, JSON-LD, OG tags → re-read rule 4
- `src/app/tietosuoja/**`, `src/app/tietoa/**`, footer disclaimers → re-read rules 4, 7

**Run** `npm run check:publisher-lane` before every commit and before every push. The script greps the source tree for forbidden patterns and exits non-zero if any are found. It also runs automatically as `prebuild` so Vercel deployments fail closed if a violation lands on `master`.

---

## Stack
- Next.js 16 (App Router) + TypeScript + Tailwind CSS v4
- Deploy: Vercel
- Language: Finnish (fi) — all UI text in Finnish

## Conventions
- Use `src/` directory structure
- Components in `src/components/`
- Pages in `src/app/`
- Finnish UI, English code/comments
- Mobile-first responsive design
- SEO: every page needs metadata, OG images, structured data
- All external provider links use `rel="noopener noreferrer nofollow"` uniformly
- `isAffiliate` field exists in data for link tracking but is **never** exposed in UI
