'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Suspense fallback with a 60s timeout. After 60s, render a recovery UI
 * (refresh + escape link) so users aren't stuck on an indefinite skeleton
 * if the calculator fails to hydrate.
 */
export default function LoadingTimeout({
  fallbackHref = '/lainanantajat',
  fallbackLabel = 'Selaa lainanantajia',
  timeoutMs = 60_000,
}: {
  fallbackHref?: string;
  fallbackLabel?: string;
  timeoutMs?: number;
} = {}) {
  const [timedOut, setTimedOut] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTimedOut(true), timeoutMs);
    return () => clearTimeout(t);
  }, [timeoutMs]);

  if (timedOut) {
    return (
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 text-center">
        <p className="mb-2 font-semibold text-gray-900">
          Laskurin lataus epäonnistui.
        </p>
        <p className="mb-4 text-sm text-gray-600">
          Päivitä sivu tai siirry suoraan tarjoajien sivuille.
        </p>
        <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
          <button
            onClick={() => window.location.reload()}
            className="rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#2a4a7f]"
          >
            Päivitä sivu
          </button>
          <Link
            href={fallbackHref}
            className="rounded-lg border border-[#1a365d] px-4 py-2 text-sm font-medium text-[#1a365d] hover:bg-[#1a365d]/5"
          >
            {fallbackLabel}
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className="h-96 animate-pulse rounded-xl bg-white/80"
      aria-live="polite"
      aria-label="Ladataan laskuria..."
    />
  );
}
