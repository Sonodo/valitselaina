import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import CookieConsent from '@/components/layout/CookieConsent';
import GoogleAnalytics from '@/components/layout/GoogleAnalytics';

const CLARITY_ID = process.env.NODE_ENV === 'production' ? 'w9nbvt7m3n' : '';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Valitse Laina — Luotettava lainavertailu',
    template: '%s | Valitse Laina',
  },
  description:
    'Vertaa lainoja rehellisesti. Näytämme kaikki lainat — myös ne, joista emme saa komissiota. Löydä edullisin kulutusluotto, asuntolaina tai autolaina.',
  metadataBase: new URL('https://valitselaina.fi'),
  openGraph: {
    type: 'website',
    locale: 'fi_FI',
    url: 'https://valitselaina.fi',
    siteName: 'Valitse Laina',
    title: 'Valitse Laina — Luotettava lainavertailu',
    description:
      'Vertaa lainoja rehellisesti. Näytämme kaikki lainat — myös ne, joista emme saa komissiota.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Valitse Laina — Luotettava lainavertailu',
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

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Valitse Laina',
  url: 'https://valitselaina.fi',
  description:
    'Luotettava lainavertailupalvelu. Vertaa kulutusluottoja, asuntolainoja ja autolainoja kattavasti.',
};

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
      <body className="min-h-full flex flex-col bg-background text-foreground font-sans">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <CookieConsent />
        <GoogleAnalytics />
        {CLARITY_ID && (
          <>
            <Script id="ms-clarity" strategy="afterInteractive">
              {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","${CLARITY_ID}");`}
            </Script>
            <Script id="clarity-consent-default" strategy="afterInteractive">
              {`(function w(){if(window.clarity){var c=localStorage.getItem("analytics_consent");clarity("consentv2",{analytics_storage:c==="granted"?"granted":"denied",ad_storage:"denied"})}else{setTimeout(w,100)}})();`}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
