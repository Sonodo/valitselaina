import Link from 'next/link';
import { Info } from 'lucide-react';

/**
 * Affiliate disclosure banner.
 *
 * Renders a slim, non-dismissible disclosure notice immediately above any
 * comparison/result list that contains outbound provider CTAs. Required for
 * advertising-compliance and affiliate-marketing transparency.
 *
 * Copy is fixed (Finnish, approved verbatim). Do not edit without legal review.
 */
export default function DisclosureBanner() {
  return (
    <div
      role="note"
      aria-label="Mainosyhteistyön tiedote"
      className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-xs sm:text-sm text-gray-600"
    >
      <div className="flex items-start gap-2 sm:items-center">
        <Info
          className="h-4 w-4 shrink-0 text-gray-500 mt-0.5 sm:mt-0"
          aria-hidden="true"
        />
        <p className="leading-relaxed">
          ValitseLaina on ilmainen vertailupalvelu. Saamme komissiota osalta
          palveluntarjoajista, mutta tämä ei vaikuta vertailun järjestykseen.{' '}
          <Link
            href="/sivuston-ansainta"
            className="font-medium text-[#1a365d] underline underline-offset-2 hover:text-[#2a4a7f] transition-colors"
          >
            Lue lisää
          </Link>
        </p>
      </div>
    </div>
  );
}
