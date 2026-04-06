import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Jälleenrahoituslaskuri — Kannattaako lainan uudelleenrahoitus?',
  description:
    'Selvitä kannattaako lainan jälleenrahoitus. Vertaa nykyistä ja uutta lainaa, näe kuukausisäästö, kokonaissäästö ja takaisinmaksuaika.',
  alternates: {
    canonical: 'https://valitselaina.fi/tyokalut/jalleenrahoitus',
  },
  openGraph: {
    title: 'Jälleenrahoituslaskuri — Kannattaako lainan vaihtaminen?',
    description:
      'Laske kannattaako lainan uudelleenrahoitus. Vertaa kuukausierää, kokonaiskuluja ja selvitä break-even -piste.',
    url: 'https://valitselaina.fi/tyokalut/jalleenrahoitus',
    type: 'website',
  },
};

export default function JalleenrahoitusLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
