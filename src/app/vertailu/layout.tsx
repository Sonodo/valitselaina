import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vertaa lainoja ja löydä edullisin',
  description:
    'Vertaa kulutusluottoja, asuntolainoja ja autolainoja reaaliajassa. Näe todellinen vuosikorko ja kokonaiskustannukset. 27+ lainanantajaa.',
  alternates: {
    canonical: 'https://valitselaina.fi/vertailu',
  },
  openGraph: {
    title: 'Vertaa lainoja ja löydä edullisin',
    description:
      'Vertaa kulutusluottoja, asuntolainoja ja autolainoja reaaliajassa. 27+ lainanantajaa.',
    url: 'https://valitselaina.fi/vertailu',
    type: 'website',
  },
};

// JSON-LD for the comparison tool page
const comparisonJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'Valitse Laina — Lainalaskuri',
  description:
    'Vertaa lainoja reaaliajassa. Näytä todellinen vuosikorko, kuukausiera ja kokonaiskustannukset.',
  url: 'https://valitselaina.fi/vertailu',
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
