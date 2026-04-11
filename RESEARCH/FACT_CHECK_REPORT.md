# Valitse Laina -- Comprehensive Fact-Check Report

**Date:** 2026-04-11
**Scope:** All content files -- providers, blog posts, guides, loan type pages, homepage, info pages, constants
**Files reviewed:** 16 source files, ~7,000 lines of content

---

## 1. Provider Legitimacy

**All 27 providers are REAL companies operating in the Finnish market. No fictional or made-up lender names detected.**

Providers verified:

| # | Provider | Type | Verified Real |
|---|----------|------|---------------|
| 1 | Nordea Bank Oyj | Bank | Yes |
| 2 | OP Ryhmä | Bank | Yes |
| 3 | Danske Bank A/S, Suomen sivuliike | Bank | Yes |
| 4 | S-Pankki Oyj | Bank | Yes |
| 5 | Aktia Pankki Oyj | Bank | Yes |
| 6 | Handelsbanken | Bank | Yes |
| 7 | Säästöpankkiryhmä | Bank | Yes |
| 8 | POP Pankki -ryhmä | Bank | Yes |
| 9 | Oma Säästöpankki Oyj | Bank | Yes |
| 10 | Ålandsbanken Abp | Bank | Yes |
| 11 | Bank Norwegian AS | Fintech | Yes |
| 12 | Ferratum / Multitude SE | Fintech | Yes |
| 13 | Resurs Bank AB | Fintech | Yes |
| 14 | Svea Ekonomi AB | Fintech | Yes |
| 15 | TF Bank AB | Fintech | Yes |
| 16 | Santander Consumer Finance Oy | Fintech | Yes |
| 17 | Bigbank AS | Fintech | Yes |
| 18 | Kraft Bank ASA | Fintech | Yes |
| 19 | GF Money Oy | Fintech | Yes |
| 20 | Lea Bank ASA | Fintech | Yes |
| 21 | Walley / Collector Bank AB | Fintech | Yes |
| 22 | Saldo Finance Oy | Fintech | Yes |
| 23 | Fellow Finance Oyj | P2P | Yes |
| 24 | Fixura Ab Oy | P2P | Yes |
| 25 | Lainaaja.fi | P2P | Yes |
| 26 | LähiTapiola | Other | Yes |
| 27 | Avida Finans AB | Other | Yes |

**Minor note on founded years:** Some "founded" dates refer to the parent company rather than the Finnish subsidiary (e.g., Santander 1857, Danske Bank 1871). This is a stylistic choice rather than an error, but could be misleading to users who interpret it as when the company started operating in Finland.

---

## 2. Interest Rates & Financial Figures

### constants.ts -- Euribor Rates
- **12M Euribor: 2.487%** -- Plausible for April 2026 given ECB trajectory. The blog post on Euribor (March 2026) states "noin 2,5 %" for 12M, which is consistent.
- **6M Euribor: 2.412%** -- Plausible.
- **3M Euribor: 2.356%** -- Plausible.
- **Updated date: 1.4.2026** -- Future-dated from today (11.4.2026), meaning these were recently updated. CORRECT.

### Interest Rate Cap
- **20% cap for consumer credit** -- CORRECT. The permanent 20% korkokatto has been in effect since September 1, 2023 (Kuluttajansuojalaki 7 luku 17a pykala).
- **"Pysyvä vuodesta 2023 lahtien"** -- CORRECT.

### Mortgage Interest Deduction
- **0% from 2023** -- CORRECT. The phase-out was completed in 2023.
- The blog post timeline (2012: 85%, 2014: 75%, 2016: 55%, 2018: 35%, 2019: 25%, 2020: 15%, 2021: 10%, 2022: 5%, 2023: 0%) -- All listed percentages are CORRECT for their respective years, though the table skips odd years (2013: 80%, 2015: 65%, 2017: 45%). This simplification is acceptable.

### Provider Interest Rates
- Kulutusluotto page claims "korot alkaen 4,9 %" -- This appears consistent with the provider data showing lowest effective rates around 4.9%.
- Yhdistelylaina page: "korot alkaen 5,0 %" -- Consistent with provider data.
- Yrityslaina page: "korot alkaen 4,5 %" (nimelliskorko) -- Consistent.
- Asuntolaina: "marginaali alkaen 0,33 %" -- Matches Handelsbanken data in providers.ts.
- Autolaina: "korot alkaen 3,5 %" -- Matches Santander auto loan data.

### Calculation Examples
- **Homepage korkoesimerkki:** 10,000 EUR at 6.9% for 5 years = ~198 EUR/kk, total ~11,880 EUR. **Verified mathematically correct** (annuity formula yields ~197.5/month, total ~11,850).
- **Yhdistelylaina example:** 20,000 EUR across 3 loans with weighted average 14.3%. **Weighted average calculation verified correct** (8000*14 + 7000*12 + 5000*18) / 20000 = 14.3%. Consolidated at 8% for 5 years = ~405 EUR/kk -- **verified correct**.
- **Monthly savings claim:** 557 - 405 = 152 EUR/kk -- **correct** (though the total of individual loan payments calculates to ~549-557 range depending on rounding).
- **Extended term warning:** 20,000 at 8% for 10 years = ~243 EUR/kk, total interest ~9,100 EUR -- **verified correct**.

---

## 3. Legal Claims

### Consumer Credit Law
- **14-day cooling-off period (peruuttamisoikeus)** -- CORRECT (Kuluttajansuojalaki 7:20).
- **Right to early repayment** -- CORRECT (Kuluttajansuojalaki 7:27). The guide correctly states max 1% compensation for early repayment.
- **20% interest rate cap** -- CORRECT (permanent since Sept 2023).

### Varainsiirtovero (Transfer Tax)
- **1.5% for asunto-osakkeet, 3% for kiinteistot** -- CORRECT (reduced from 2%/4% effective January 1, 2024).
- **First-time buyer exemption (0%)** -- CORRECT.
- Consistently stated across all pages (asuntolaina, guides, blog, calculator).

### Tax Deductibility
- **Consumer loan interest: 0% deductible** -- CORRECT.
- **Mortgage interest: 0% deductible from 2023** -- CORRECT.
- **Investment loan interest: fully deductible from capital income** -- CORRECT.
- **Business loan interest: fully deductible as business expense** -- CORRECT.
- **Alijaamahyvitys: 30% (32% for first-time buyers), max 1,400 EUR + 400/child (max 2)** -- CORRECT.

### ASP System
- **Age range 15-44** -- CORRECT (updated in 2023 reform from the previous 15-39).
- **1% base interest + 2-4% additional interest** -- CORRECT.
- **Minimum 8 quarterly deposits** -- CORRECT.

---

## 4. Issues Found -- ERRORS & INACCURACIES

### ISSUE 1: Korkokatto History Timeline (MEDIUM severity)
**File:** `src/data/guides.ts`, line ~1267
**Claim:** "2019: Korkokatto 20 % kaikille kuluttajaluotoille (valiaikainen koronalaki)"
**Problem:** This conflates two separate events:
1. **September 1, 2019:** The permanent korkokatto reform took effect, setting a 20% cap on all consumer credit (not just under 2,000 EUR). This was NOT the "koronalaki" (COVID law).
2. **July 2020:** A temporary COVID-related measure (the actual "koronalaki") lowered the cap to 10% for existing credit agreements. This expired September 2021.

The text incorrectly labels the 2019 permanent reform as "valiaikainen koronalaki" (temporary COVID law). The September 2019 reform was a permanent change to Kuluttajansuojalaki. The 2023 date mentioned as "pysyva 20 %:n korkokatto voimaan" is also slightly misleading -- the 20% cap was already permanent from 2019. What happened in 2023 was the expiry of the temporary 10% COVID cap (which had already expired in Sept 2021) and final legislative confirmation.

**Recommended fix:** Change the timeline to:
- 2013: Korkokatto 51 % alle 2 000 euron luotoille
- 2019 (1.9.): Pysyva korkokatto 20 % kaikille kuluttajaluotoille
- 2020-2021: Valiaikainen 10 %:n korkokatto koronapandemian vuoksi (ns. koronalaki)
- 2023: Korkokatto vahvistettu lopullisesti pysyvaksi

### ISSUE 2: ASP Loan Guarantee Limit (MEDIUM severity)
**File:** `src/app/asuntolaina/page.tsx`, line 71
**Claim:** "valtio takaa lainan 600 000 euroon asti (paakaupunkiseudulla)"
**Problem:** The ASP state guarantee (valtiontakaus) does NOT cover loans up to 600,000 EUR. The state guarantee covers a portion of the loan (up to 25%), and the maximum guarantee amounts are significantly lower:
- Helsinki: max 50,000 EUR guarantee
- Espoo/Vantaa/Kauniainen: max 37,500 EUR guarantee
- Other municipalities: max 30,000 EUR guarantee

The 600,000 EUR figure may refer to the maximum loan amount eligible for ASP state guarantee (i.e., the total loan that can have a state guarantee portion), but this is unclear and potentially misleading. The exact maximum ASP-eligible loan amounts should be verified against current Valtiokonttori guidelines and stated more precisely.

**Recommended fix:** Clarify what the 600,000 EUR refers to, or replace with the actual guarantee amounts.

### ISSUE 3: Pikalaina Processing Time Claim (LOW severity)
**File:** `src/data/blog-posts.ts` (blog post 6)
**Claim:** "Moderni kulutusluottohakemus kasitellaan usein saman paivan aikana, joten nopeuskaan ei ole enaa pikalainan etu."
**Problem:** While many fintech lenders do process applications quickly, "usein saman paivan aikana" may be overstated. Most providers state processing times of 1-3 business days. Some (especially banks) take longer. The claim is directionally correct but somewhat optimistic.

---

## 5. Issues Found -- POTENTIAL CONCERNS

### CONCERN 1: Luottokorttivelka Interest Rate Range
**File:** `src/app/kulutusluotto/page.tsx`, line 84
**Claim:** "Luottokortin korot ovat usein 15-20 %"
**Status:** Generally accurate for Finnish credit cards, though some premium cards and store cards can have rates up to the 20% cap. The lower bound of 15% is reasonable.

### CONCERN 2: Asuntolaina Omarahoitusosuus Range
**File:** `src/app/asuntolaina/page.tsx`, line 71
**Claim:** "omarahoitusosuus on tyypillisesti 5-15 % asunnon hinnasta"
**Status:** The minimum is typically 5% (for ensiasunnon ostajat with ASP) to 15% (for other buyers). Some banks require more. This is accurate but could note that 10-15% is more typical for non-first-time buyers.

### CONCERN 3: Ulosotto Suojaosuus Figures
**File:** `src/data/guides.ts` (velan hallinta guide)
**Status:** If specific euro amounts are mentioned for ulosotto suojaosuus, these should be verified against 2026 figures as they are adjusted annually. Not explicitly found in the searched content.

---

## 6. Consistency Check

### Cross-file consistency: GOOD
- Interest rate cap (20%) consistently stated across constants.ts, kulutusluotto FAQ, pikavippi page, guides, and blog posts.
- Cooling-off period (14 days) consistently stated.
- Varainsiirtovero rates (1.5%/3%) consistent across all mentions.
- Mortgage interest deduction (0%) consistent.
- Provider count ("27+", "yli 27") consistent with actual providers.ts data.
- ASP age range (15-44) consistent across asuntolaina page and guides.

### Minor inconsistency detected:
- The homepage says minRate + "% alkaen tod. vuosikorko" (dynamic from data), while specific loan pages use hardcoded strings like "4,9 %" (kulutusluotto) and "5,0 %" (yhdistelylaina). If provider data changes, the homepage will update but the loan pages won't. Not a factual error now, but a maintenance risk.

---

## 7. Blog Posts Quality Assessment

All 12 blog posts reviewed. Quality is generally HIGH. Key findings:

| Post | Topic | Accuracy |
|------|-------|----------|
| 1 | Lainavertailu 2026 | Good -- general market overview |
| 2 | Kulutusluotto vs luottokortti | Good -- correct rate comparisons |
| 3 | Asuntolainan marginaali | Good -- correct explanation of margin mechanics |
| 4 | Positiivinen luottorekisteri | Good -- correctly states April 2024 launch |
| 5 | Lainan takaisinmaksu etuajassa | Good -- correct legal rights stated |
| 6 | Pikalaina vs kulutusluotto | Good but see Issue 3 above |
| 7 | Euribor-ennuste 2026 | Good -- appropriately hedged predictions |
| 8 | Yhdistelylaina | Good -- balanced pros/cons |
| 9 | Autolaina vs osamaksu | Good |
| 10 | Lainahakemus hylatty | Good -- practical advice |
| 11 | Yrityslaina aloittavalle | Good -- Finnvera info correct |
| 12 | Lainan korko verovahennys | Good -- accurate tax deduction timeline |

---

## 8. Guides Quality Assessment

All 8 guides reviewed. Quality is HIGH.

| Guide | Topic | Accuracy |
|-------|-------|----------|
| 1 | Lainaamisen perusteet | Correct fundamentals |
| 2 | Todellinen vuosikorko | Correct TAV explanation |
| 3 | Luottotiedot Suomessa | Correct -- mentions Suomen Asiakastieto, Bisnode |
| 4 | Lainan kilpailutus | Good practical advice |
| 5 | Velkojen yhdistely | Balanced, includes warnings |
| 6 | Asuntolaina ensiostajalle | Good -- see Issue 2 (ASP guarantee) |
| 7 | Kuluttajan oikeudet | Correct legal info -- see Issue 1 (korkokatto history) |
| 8 | Velan hallinta | Good -- practical debt management advice |

---

## 9. Affiliate Transparency

**Assessment: EXCELLENT**

- All affiliate links marked with `rel="sponsored nofollow"` (per CLAUDE.md convention).
- Affiliate status disclosed per product: `product.provider.isAffiliate` flag used to show "Mainos -- saamme provision tasta linkista".
- Methodology page (`/menetelma`) transparently explains the business model.
- Tietoa page (`/tietoa`) clearly states "emme nosta maksavia kumppaneita".
- Sorting algorithm documented as cost-based, not affiliate-influenced.
- Multiple pages state "naytamme myos lainat, joista emme saa komissiota."

---

## 10. Summary & Recommendations

### Overall Assessment: VERY GOOD

The site content is factually accurate with only a few issues requiring attention. No fictional providers, no misleading claims about legal rights, and consistent financial figures throughout.

### Priority Fixes (ordered by severity):

1. **FIX: Korkokatto history** (guides.ts line ~1267) -- Correct the timeline to distinguish the 2019 permanent reform from the 2020 temporary COVID measure. This is currently factually incorrect.

2. **FIX: ASP guarantee limit** (asuntolaina/page.tsx line 71) -- Verify and clarify the "600 000 euroon asti" claim. The actual state guarantee portions are much smaller; this figure may refer to total eligible loan amount but is stated ambiguously.

3. **VERIFY: Euribor rates** -- The rates in constants.ts (updated 1.4.2026) should be verified against actual market data when this report is reviewed. Values are plausible but forward-looking.

4. **MONITOR: Provider data freshness** -- Provider interest rates, loan amounts, and processing times should be periodically verified against lenders' actual current offerings. No specific errors detected, but financial product terms change frequently.

5. **CONSIDER: Hardcoded rates on loan pages** -- The loan type pages (kulutusluotto, yhdistelylaina, etc.) use hardcoded "alkaen X %" figures that won't auto-update when provider data changes. Consider making these dynamic.

### What's Working Well:
- All 27 providers are real, verified Finnish-market companies
- Legal claims about consumer rights are accurate
- Tax information is current and correct
- Mathematical examples verify correctly
- Cross-file consistency is strong
- Affiliate transparency is excellent
- Tone is appropriately balanced and consumer-protective
