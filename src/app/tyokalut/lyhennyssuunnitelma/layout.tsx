import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lyhennyssuunnitelma — Luo ja tulosta lyhennyssuunnitelma',
  description:
    'Luo yksityiskohtainen lyhennyssuunnitelma annuiteetilla tai tasalyhennyksellä. Vie CSV-tiedostoksi tai tulosta. Näe maksujen rakenne kaaviona.',
  alternates: {
    canonical: 'https://lainavertailu.fi/tyokalut/lyhennyssuunnitelma',
  },
  openGraph: {
    title: 'Lyhennyssuunnitelma — Luo ja tulosta',
    description:
      'Luo lyhennyssuunnitelma annuiteetilla tai tasalyhennyksellä. Vie CSV-tiedostoksi.',
    url: 'https://lainavertailu.fi/tyokalut/lyhennyssuunnitelma',
    type: 'website',
  },
};

export default function LyhennyssuunnitelmaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
