'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCcw, Home } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (process.env.NODE_ENV === 'development') {
      console.error('Application error:', error);
    }
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      {/* Icon */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center">
          <AlertTriangle className="w-8 h-8 text-red-600" />
        </div>
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Jokin meni pieleen
      </h1>
      <p className="text-gray-600 mb-8 max-w-md mx-auto">
        Pahoittelemme — sivulla tapahtui odottamaton virhe. Yritä ladata sivu uudelleen
        tai palaa etusivulle.
      </p>

      {/* Actions */}
      <div className="flex flex-wrap justify-center gap-4">
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 font-semibold text-white hover:bg-[#2a4a7f] transition-colors cursor-pointer"
        >
          <RefreshCcw className="w-4 h-4" />
          Yritä uudelleen
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-6 py-3 font-semibold text-gray-900 hover:bg-gray-200 transition-colors"
        >
          <Home className="w-4 h-4" />
          Etusivulle
        </Link>
      </div>

      {/* Error digest for debugging */}
      {error.digest && (
        <p className="mt-8 text-xs text-gray-400">
          Virhekoodi: {error.digest}
        </p>
      )}
    </div>
  );
}
