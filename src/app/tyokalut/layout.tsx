import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Laskurit ja tyokalut',
  description:
    'Ilmaiset lainalaskurit: lainanlaskuri, asuntolainanlaskuri, jälleenrahoituslaskuri, yhdistelylaskuri, maksukykylaskuri ja lyhennyssuunnitelma. Laske kuukausierä, kokonaiskulut ja säästöt.',
  alternates: {
    canonical: 'https://valitselaina.fi/tyokalut',
  },
  openGraph: {
    title: 'Laskurit ja työkalut — Valitse Laina',
    description:
      'Ilmaiset lainalaskurit: laske kuukausierä, kokonaiskulut ja selvitä kannattaako jälleenrahoitus.',
    url: 'https://valitselaina.fi/tyokalut',
    type: 'website',
  },
};

const toolsJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: 'Lainalaskurit ja työkalut',
  description:
    'Ilmaiset lainalaskurit Suomen luotettavimmalta lainavertailusivustolta.',
  url: 'https://valitselaina.fi/tyokalut',
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: [
      {
        '@type': 'SoftwareApplication',
        name: 'Lainanlaskuri',
        url: 'https://valitselaina.fi/tyokalut/lainanlaskuri',
        applicationCategory: 'FinanceApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Asuntolainanlaskuri',
        url: 'https://valitselaina.fi/tyokalut/asuntolainanlaskuri',
        applicationCategory: 'FinanceApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Jälleenrahoituslaskuri',
        url: 'https://valitselaina.fi/tyokalut/jalleenrahoitus',
        applicationCategory: 'FinanceApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Yhdistelylaskuri',
        url: 'https://valitselaina.fi/tyokalut/yhdistelylaskuri',
        applicationCategory: 'FinanceApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Maksukykylaskuri',
        url: 'https://valitselaina.fi/tyokalut/maksukyky',
        applicationCategory: 'FinanceApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
      {
        '@type': 'SoftwareApplication',
        name: 'Lyhennyssuunnitelma',
        url: 'https://valitselaina.fi/tyokalut/lyhennyssuunnitelma',
        applicationCategory: 'FinanceApplication',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
      },
    ],
  },
};

export default function TyokalutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(toolsJsonLd),
        }}
      />
      {children}
    </>
  );
}
