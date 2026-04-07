import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Lainavertailu — Luotettava lainavertailu',
    template: '%s | Lainavertailu',
  },
  description:
    'Vertaa lainoja rehellisesti. Näytämme kaikki lainat — myös ne, joista emme saa komissiota. Löydä edullisin kulutusluotto, asuntolaina tai autolaina.',
  metadataBase: new URL('https://valitselaina.fi'),
  openGraph: {
    type: 'website',
    locale: 'fi_FI',
    url: 'https://valitselaina.fi',
    siteName: 'Lainavertailu',
    title: 'Lainavertailu — Luotettava lainavertailu',
    description:
      'Vertaa lainoja rehellisesti. Näytämme kaikki lainat — myös ne, joista emme saa komissiota.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lainavertailu — Luotettava lainavertailu',
    description:
      'Vertaa lainoja rehellisesti. Näytämme kaikki lainat — myös ne, joista emme saa komissiota.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://valitselaina.fi',
  },
  verification: {
    google: 'T6yw61oyDmwPNfWLUOZlEvbeME_y95F2Ayy33PDXzO0',
  },
};

// JSON-LD Organization structured data
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Valitse Laina',
  url: 'https://valitselaina.fi',
  description:
    'Luotettava lainavertailupalvelu. Vertaa kulutusluottoja, asuntolainoja ja autolainoja puolueettomasti.',
  sameAs: [],
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer service',
    availableLanguage: 'Finnish',
  },
};

// JSON-LD WebSite structured data
const websiteJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Valitse Laina',
  url: 'https://valitselaina.fi',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fi" className={`${inter.variable} h-full antialiased`}>
      <head>
        {/* JSON-LD structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />

      </head>
      <body className="min-h-full flex flex-col bg-[#f7fafc] text-gray-900 font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
