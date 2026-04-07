export function GET() {
  const content = `# Valitse Laina
> Luotettava suomalainen lainavertailupalvelu

## About
Valitse Laina on suomalainen, riippumaton lainavertailupalvelu, joka vertailee yli 27 lainanantajan tuotteita puolueettomasti. Palvelu kattaa kulutusluotot, asuntolainat, autolainat, yhdistelylainat, yrityslainat ja pikavipit.

## Key Features
- Honest comparison of 27+ Finnish loan providers
- Loans sorted by total cost — affiliate status never affects ranking
- Covers: consumer loans, mortgages, car loans, consolidation loans, business loans, quick loans
- Free calculators: loan calculator, affordability checker, mortgage calculator, consolidation calculator
- Educational guides on Finnish lending, interest rates, credit scores, and debt management
- All content in Finnish, targeting Finnish consumers

## URL Structure
- / — Homepage with overview and quick comparison
- /vertailu — Full loan comparison tool
- /kulutusluotto — Consumer loan (kulutusluotto) information and comparison
- /asuntolaina — Mortgage information and comparison
- /autolaina — Car loan information and comparison
- /yhdistelylaina — Debt consolidation loan information
- /yrityslaina — Business loan information
- /pikavippi — Quick loan / payday loan information (with warnings)
- /lainanantajat — Directory of all 27+ loan providers
- /lainanantajat/{slug} — Individual provider profile
- /oppaat — Financial education guides
- /oppaat/{slug} — Individual guide articles
- /blogi — Blog with Finnish lending market analysis
- /blogi/{slug} — Individual blog posts
- /tyokalut — Financial calculators and tools
- /tyokalut/lainanlaskuri — General loan calculator
- /tyokalut/maksukyky — Affordability / payment capacity calculator
- /tyokalut/asuntolainanlaskuri — Mortgage calculator
- /tyokalut/yhdistelylaskuri — Debt consolidation calculator
- /tyokalut/lyhennyssuunnitelma — Amortization schedule generator
- /tyokalut/jalleenrahoitus — Refinancing calculator
- /menetelma — Our methodology (how comparison works, transparency)
- /tietoa — About us
- /yhteystiedot — Contact information
- /tietosuoja — Privacy policy
- /kayttoehdot — Terms of service
- /evasteet — Cookie policy
- /media — Press and media page

## Important Context
- All loan data reflects Finnish market conditions (2026)
- Finnish interest rate cap for consumer credit: 20% (permanent since 2023)
- 14-day cooling-off period for consumer credit (Finnish law)
- Mortgage interest deduction fully phased out since 2023
- Reference rates: 12-month Euribor ~2.49%
- Site uses affiliate links (clearly disclosed) but rankings are never influenced by affiliate status

## Contact
- Website: https://valitselaina.fi
- General inquiries: info@valitselaina.fi
- Press: media@valitselaina.fi
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=86400, s-maxage=86400',
    },
  });
}
