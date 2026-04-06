import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lainanlaskuri — Laske kuukausierä ja kokonaiskulut',
  description:
    'Ilmainen lainanlaskuri: laske lainan kuukausierä, kokonaiskulut, korot ja katso yksityiskohtainen lyhennyssuunnitelma. Visuaaliset kaaviot.',
  alternates: {
    canonical: 'https://lainavertailu.fi/tyokalut/lainanlaskuri',
  },
  openGraph: {
    title: 'Lainanlaskuri — Laske kuukausierä ja kokonaiskulut',
    description:
      'Laske lainan kuukausierä, kokonaiskulut ja korot. Katso lyhennyssuunnitelma ja visuaaliset kaaviot.',
    url: 'https://lainavertailu.fi/tyokalut/lainanlaskuri',
    type: 'website',
  },
};

export default function LainanlaskuriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
