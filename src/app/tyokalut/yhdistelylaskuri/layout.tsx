import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Yhdistelylaskuri — Kannattaako lainojen yhdistäminen?',
  description:
    'Laske kannattaako lainojen yhdistäminen. Syötä nykyiset lainasi ja vertaa yhdistelylainan kuukausierää ja kokonaiskuluja. Rehellinen laskelma.',
  alternates: {
    canonical: 'https://lainavertailu.fi/tyokalut/yhdistelylaskuri',
  },
  openGraph: {
    title: 'Yhdistelylaskuri — Kannattaako lainojen yhdistäminen?',
    description:
      'Laske kannattaako usean lainan yhdistäminen yhdeksi. Rehellinen vertailu kokonaiskuluista.',
    url: 'https://lainavertailu.fi/tyokalut/yhdistelylaskuri',
    type: 'website',
  },
};

export default function YhdistelylaskuriLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
