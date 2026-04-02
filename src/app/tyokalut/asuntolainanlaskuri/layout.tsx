import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Asuntolainanlaskuri — Laske asuntolainan kuukausierä',
  description:
    'Laske asuntolainan kuukausierä marginaalilla ja Euribor-korolla. Stressitestaa eri korkoskenaariot. Ensiasunnon ostajalle ilman varainsiirtoveroa.',
  alternates: {
    canonical: 'https://lainavertailu.fi/tyokalut/asuntolainanlaskuri',
  },
  openGraph: {
    title: 'Asuntolainanlaskuri — Laske asuntolainan kuukausierä',
    description:
      'Asuntolainanlaskuri Euribor-korolla ja marginaalilla. Stressitesti koronnousulle. Ensiasunnon ostajan tuki.',
    url: 'https://lainavertailu.fi/tyokalut/asuntolainanlaskuri',
    type: 'website',
  },
};

export default function AsuntolainanlaskuriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
