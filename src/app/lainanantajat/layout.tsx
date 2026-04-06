import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Lainanantajat Suomessa — Vertaa 28+ pankkia ja rahoitusyhtiötä',
  description:
    'Kattava lista Suomen lainanantajista. Vertaa pankkeja, fintech-yhtiöitä ja vertaislainoja. Puolueeton arvio jokaisesta lainanantajasta.',
  openGraph: {
    title: 'Lainanantajat Suomessa — Vertaa 28+ pankkia ja rahoitusyhtiötä',
    description:
      'Kattava lista Suomen lainanantajista. Vertaa pankkeja, fintech-yhtiöitä ja vertaislainoja.',
    url: 'https://valitselaina.fi/lainanantajat',
    type: 'website',
  },
  alternates: {
    canonical: 'https://valitselaina.fi/lainanantajat',
  },
};

export default function LainanantajatLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
