'use client';

import { useState, useEffect } from 'react';

const CONSENT_KEY = 'cookie_consent';

type ConsentState = 'pending' | 'granted' | 'denied';

function getStoredConsent(): ConsentState {
  if (typeof window === 'undefined') return 'pending';
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (stored === 'granted' || stored === 'denied') return stored;
  } catch {
    // localStorage may be unavailable
  }
  return 'pending';
}

function updateGtagConsent(granted: boolean) {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;
  const state = granted ? 'granted' : 'denied';
  gtag('consent', 'update', {
    analytics_storage: state,
    ad_storage: state,
    ad_user_data: state,
    ad_personalization: state,
  });
}

function updateClarityConsent(granted: boolean, retries = 5) {
  const clarity = (window as unknown as { clarity?: (...args: unknown[]) => void }).clarity;
  if (!clarity) {
    if (retries > 0) setTimeout(() => updateClarityConsent(granted, retries - 1), 200);
    return;
  }
  clarity('consentv2', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
  });
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<ConsentState>('pending');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = getStoredConsent();
    setConsent(stored);

    if (stored === 'granted') {
      updateGtagConsent(true);
      updateClarityConsent(true);
    } else if (stored === 'denied') {
      updateGtagConsent(false);
      updateClarityConsent(false);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, 'granted');
    setConsent('granted');
    updateGtagConsent(true);
    updateClarityConsent(true);
  }

  function handleReject() {
    localStorage.setItem(CONSENT_KEY, 'denied');
    setConsent('denied');
    updateGtagConsent(false);
    updateClarityConsent(false);
  }

  if (!mounted || consent !== 'pending') return null;

  return (
    <div
      role="dialog"
      aria-label="Evästeasetukset"
      className="fixed bottom-0 inset-x-0 z-50 p-4 sm:p-6"
    >
      <div className="mx-auto max-w-3xl rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
        <p className="text-sm text-gray-700 leading-relaxed mb-4">
          Käytämme evästeitä parantaaksemme käyttökokemusta. Evästeiden avulla
          analysoimme sivuston käyttöä ja kehitämme palveluamme.{' '}
          <a
            href="/evasteet"
            className="text-[#1a365d] underline underline-offset-2 hover:text-[#2a4a7f]"
          >
            Lue lisää evästeistä.
          </a>
        </p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleAccept}
            className="rounded-lg bg-[#1a365d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors"
          >
            Hyväksy
          </button>
          <button
            type="button"
            onClick={handleReject}
            className="rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Hylkää
          </button>
        </div>
      </div>
    </div>
  );
}
