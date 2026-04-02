'use client';

import { useState, useEffect } from 'react';

const STORAGE_KEY = 'lainavertailu-cookie-consent';

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show banner only if no choice has been stored yet
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  }

  function handleReject() {
    localStorage.setItem(STORAGE_KEY, 'rejected');
    setVisible(false);
  }

  if (!visible) return null;

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
