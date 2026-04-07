'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'lainavertailu-cookie-consent';

export default function GoogleAnalytics() {
  const [consentGiven, setConsentGiven] = useState(false);

  useEffect(() => {
    function check() {
      setConsentGiven(localStorage.getItem(STORAGE_KEY) === 'accepted');
    }
    check();
    // Re-check when storage changes (e.g. user accepts cookies)
    window.addEventListener('storage', check);
    // Also poll briefly to catch same-tab updates from CookieConsent
    const interval = setInterval(check, 1000);
    return () => {
      window.removeEventListener('storage', check);
      clearInterval(interval);
    };
  }, []);

  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) return null; // GA4 not configured yet
  if (!consentGiven) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}
