import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Blogi',
  description:
    'Ajankohtaisia artikkeleita lainoista, koroista ja taloudenhallinnasta. Puolueetonta tietoa parempien rahoituspäätösten tueksi.',
  alternates: {
    canonical: 'https://valitselaina.fi/blogi',
  },
};

export default function BlogiLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
