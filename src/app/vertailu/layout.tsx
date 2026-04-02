import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lainavertailu — Vertaa lainoja ja löydä edullisin',
  description:
    'Vertaa kulutusluottoja, asuntolainoja ja autolainoja reaaliajassa. Näe todellinen vuosikorko ja kokonaiskustannukset. 28+ lainanantajaa.',
  alternates: {
    canonical: 'https://lainavertailu.fi/vertailu',
  },
  openGraph: {
    title: 'Lainavertailu — Vertaa lainoja ja löydä edullisin',
    description:
      'Vertaa kulutusluottoja, asuntolainoja ja autolainoja reaaliajassa. 28+ lainanantajaa.',
    url: 'https://lainavertailu.fi/vertailu',
    type: 'website',
  },
};

// JSON-LD for the comparison tool page
const comparisonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Lainavertailu — Lainalaskuri',
  description:
    'Vertaa lainoja reaaliajassa. Näytä todellinen vuosikorko, kuukausiera ja kokonaiskustannukset.',
  url: 'https://lainavertailu.fi/vertailu',
  applicationCategory: 'FinanceApplication',
  operatingSystem: 'Any',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'EUR',
  },
};

export default function VertailuLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(comparisonJsonLd),
        }}
      />
      {children}
    </>
  );
}
