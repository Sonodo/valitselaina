import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Maksukykylaskuri — Kuinka paljon lainaa voin saada?',
  description:
    'Laske kuinka paljon lainaa tulosi kattavat. Maksukykylaskuri huomioi tulot, menot ja nykyiset lainat. Sisältää stressitestin koronnousulle.',
  alternates: {
    canonical: 'https://lainavertailu.fi/tyokalut/maksukyky',
  },
  openGraph: {
    title: 'Maksukykylaskuri — Kuinka paljon lainaa voin saada?',
    description:
      'Laske maksukykysi ja selvitä kuinka paljon lainaa voit vastuullisesti ottaa.',
    url: 'https://lainavertailu.fi/tyokalut/maksukyky',
    type: 'website',
  },
};

export default function MaksukykyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
