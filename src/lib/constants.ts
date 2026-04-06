// Finnish financial regulations
export const INTEREST_RATE_CAP = 20; // 20% for consumer credit (permanent since 2023)
export const COOLING_OFF_DAYS = 14; // 14-day right to cancel consumer credit
export const MIN_LOAN_AMOUNT_REGULATED = 200; // Consumer credit below €200 exempted from some rules

// Current market reference rates (update periodically)
export const EURIBOR_12M = 2.487;
export const EURIBOR_6M = 2.412;
export const EURIBOR_3M = 2.356;
export const EURIBOR_UPDATED = '1.4.2026';

// Tax
export const INTEREST_DEDUCTION_RATE = 0; // Interest deduction for consumer loans = 0%
export const MORTGAGE_INTEREST_DEDUCTION = 0; // Phased out completely by 2023

// Site config
export const SITE_NAME = 'Lainavertailu';
export const SITE_URL = 'https://lainavertailu.fi';
export const SITE_DESCRIPTION = 'Suomen luotettavin lainavertailu. Vertaa lainoja rehellisesti — näytämme kaikki lainat, myös ne joista emme saa komissiota.';

// Loan type labels (Finnish)
export const LOAN_TYPE_LABELS: Record<string, string> = {
  kulutusluotto: 'Kulutusluotto',
  asuntolaina: 'Asuntolaina',
  autolaina: 'Autolaina',
  yhdistelylaina: 'Yhdistelylaina',
  yrityslaina: 'Yrityslaina',
  pikavippi: 'Pikavippi',
};

export const LOAN_TYPE_DESCRIPTIONS: Record<string, string> = {
  kulutusluotto: 'Vakuudeton kulutusluotto suurempiin hankintoihin ja menoihin',
  asuntolaina: 'Asunnon ostoon tai rakentamiseen tarkoitettu vakuudellinen laina',
  autolaina: 'Auton ostoon tarkoitettu laina, usein auto vakuutena',
  yhdistelylaina: 'Yhdistä useampi laina yhdeksi edullisemmaksi lainaksi',
  yrityslaina: 'Yritystoiminnan rahoitukseen tarkoitettu laina',
  pikavippi: 'Pieni, lyhytaikainen laina — vertaa huolella ennen hakemista',
};
