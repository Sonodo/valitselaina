'use client';

import { useState } from 'react';
import { ComparisonResult, AmortizationRow } from '@/types';
import {
  formatCurrency,
  formatPercentage,
  generateAmortizationSchedule,
} from '@/lib/utils';

// Provider type labels (Finnish)
const PROVIDER_TYPE_LABELS: Record<string, string> = {
  bank: 'Pankki',
  fintech: 'Fintech',
  p2p: 'Vertaislaina',
  other: 'Muu',
};

interface ResultCardProps {
  result: ComparisonResult;
  rank: number;
  loanAmount: number;
  termMonths: number;
}

export default function ResultCard({
  result,
  rank,
  loanAmount,
  termMonths,
}: ResultCardProps) {
  const [expanded, setExpanded] = useState(false);

  const { product, provider, monthlyPayment, totalCost, totalInterest, effectiveRate, isAffiliate } = result;

  // Setup fee and monthly fee
  const setupFee = product.setupFee || 0;
  const monthlyFee = product.monthlyFee || 0;
  const totalFees = setupFee + monthlyFee * termMonths;

  // Amortization preview (first 6 months)
  const amortizationPreview: AmortizationRow[] = expanded
    ? generateAmortizationSchedule(loanAmount, effectiveRate, termMonths).slice(0, 6)
    : [];

  // Feature highlights
  const highlights: string[] = [];
  if (setupFee === 0) highlights.push('Ei avausmaksua');
  if (monthlyFee === 0) highlights.push('Ei kuukausimaksua');
  if (product.processingTime && product.processingTime.includes('1')) {
    highlights.push('Nopea käsittely');
  }
  if (!product.requiresCollateral) highlights.push('Vakuudeton');
  if (!product.requiresGuarantor) highlights.push('Ei takaajaa');

  return (
    <div
      className={`relative rounded-xl border bg-white shadow-sm transition-shadow hover:shadow-md ${
        rank === 1 ? 'border-[#38a169] ring-1 ring-[#38a169]/20' : 'border-gray-200'
      }`}
    >
      {/* Top bar: rank badge + affiliate disclosure */}
      <div className="flex items-center justify-between px-5 pt-4 pb-0">
        <div className="flex items-center gap-2">
          {rank <= 3 && (
            <span
              className={`inline-flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold text-white ${
                rank === 1
                  ? 'bg-[#38a169]'
                  : rank === 2
                  ? 'bg-[#1a365d]'
                  : 'bg-gray-500'
              }`}
            >
              {rank}
            </span>
          )}
          {rank === 1 && (
            <span className="text-xs font-semibold text-[#38a169]">
              Edullisin
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {isAffiliate && (
            <span className="inline-flex items-center rounded bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800 border border-amber-200">
              Mainos
            </span>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="px-5 pt-3 pb-5">
        {/* Provider info row */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {provider.shortName || provider.name}
            </h3>
            <div className="flex items-center gap-2 mt-0.5">
              <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                {PROVIDER_TYPE_LABELS[provider.type] || provider.type}
              </span>
              <span className="text-xs text-gray-400">
                {product.name}
              </span>
            </div>
          </div>

        </div>

        {/* Key numbers grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 mb-4">
          {/* Monthly payment — most prominent */}
          <div className="col-span-2 sm:col-span-1 rounded-lg bg-[#1a365d]/5 p-3">
            <div className="text-xs text-gray-500 mb-0.5">Kuukausierä</div>
            <div className="text-2xl font-bold text-[#1a365d]">
              {formatCurrency(monthlyPayment)}
            </div>
          </div>

          {/* Effective rate */}
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-xs text-gray-500 mb-0.5">Todellinen vuosikorko</div>
            <div className="text-xl font-bold text-gray-900">
              {formatPercentage(effectiveRate)}
            </div>
          </div>

          {/* Total cost */}
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-xs text-gray-500 mb-0.5">Kokonaiskustannus</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(totalCost)}
            </div>
          </div>

          {/* Total interest */}
          <div className="rounded-lg bg-gray-50 p-3">
            <div className="text-xs text-gray-500 mb-0.5">Korot yhteensä</div>
            <div className="text-lg font-bold text-gray-900">
              {formatCurrency(totalInterest)}
            </div>
          </div>
        </div>

        {/* Cost breakdown bar */}
        <div className="mb-4">
          <div className="flex h-2 w-full rounded-full overflow-hidden bg-gray-100">
            <div
              className="bg-[#1a365d] rounded-l-full"
              style={{ width: `${(loanAmount / totalCost) * 100}%` }}
              title={`Pääoma: ${formatCurrency(loanAmount)}`}
            />
            <div
              className="bg-[#d69e2e]"
              style={{ width: `${(totalInterest / totalCost) * 100}%` }}
              title={`Korot: ${formatCurrency(totalInterest)}`}
            />
            {totalFees > 0 && (
              <div
                className="bg-gray-400 rounded-r-full"
                style={{ width: `${(totalFees / totalCost) * 100}%` }}
                title={`Kulut: ${formatCurrency(totalFees)}`}
              />
            )}
          </div>
          <div className="flex items-center gap-4 mt-1.5 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-[#1a365d]" />
              Pääoma {formatCurrency(loanAmount)}
            </span>
            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded-full bg-[#d69e2e]" />
              Korot {formatCurrency(totalInterest)}
            </span>
            {totalFees > 0 && (
              <span className="flex items-center gap-1">
                <span className="inline-block h-2 w-2 rounded-full bg-gray-400" />
                Kulut {formatCurrency(totalFees)}
              </span>
            )}
          </div>
        </div>

        {/* Feature tags */}
        {highlights.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {highlights.slice(0, 4).map((h) => (
              <span
                key={h}
                className="inline-flex items-center rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-xs font-medium text-[#38a169] border border-[#38a169]/10"
              >
                {h}
              </span>
            ))}
          </div>
        )}

        {/* Fee details */}
        {(setupFee > 0 || monthlyFee > 0) && (
          <div className="flex gap-4 text-xs text-gray-500 mb-4">
            {setupFee > 0 && (
              <span>Avausmaksu: {formatCurrency(setupFee)}</span>
            )}
            {monthlyFee > 0 && (
              <span>Kuukausimaksu: {formatCurrency(monthlyFee)}</span>
            )}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <a
            href={provider.website}
            target="_blank"
            rel={`noopener noreferrer${isAffiliate ? ' sponsored nofollow' : ''}`}
            className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors"
          >
            Hae lainaa
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
            </svg>
          </a>
          <a
            href={`/lainanantajat/${provider.slug}`}
            className="inline-flex items-center gap-1 text-sm font-medium text-[#1a365d] hover:text-[#2a4a7f] transition-colors"
          >
            Katso lisätiedot
            <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setExpanded(!expanded)}
            className="ml-auto inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            {expanded ? 'Piilota lyhennyssuunnitelmaa' : 'Lyhennyssuunnitelma'}
            <svg
              className={`h-3.5 w-3.5 transition-transform ${expanded ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
            </svg>
          </button>
        </div>

        {/* Expandable amortization preview */}
        {expanded && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <h4 className="text-sm font-semibold text-gray-700 mb-2">
              Lyhennyssuunnitelma (6 ensimmäistä kuukautta)
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100">
                    <th className="py-2 pr-3 text-left font-semibold text-gray-500">Kk</th>
                    <th className="py-2 pr-3 text-right font-semibold text-gray-500">Erä</th>
                    <th className="py-2 pr-3 text-right font-semibold text-gray-500">Pääoma</th>
                    <th className="py-2 pr-3 text-right font-semibold text-gray-500">Korko</th>
                    <th className="py-2 text-right font-semibold text-gray-500">Saldo</th>
                  </tr>
                </thead>
                <tbody>
                  {amortizationPreview.map((row) => (
                    <tr key={row.month} className="border-b border-gray-50">
                      <td className="py-1.5 pr-3 text-gray-600">{row.month}</td>
                      <td className="py-1.5 pr-3 text-right font-medium text-gray-900">
                        {formatCurrency(row.payment)}
                      </td>
                      <td className="py-1.5 pr-3 text-right text-gray-600">
                        {formatCurrency(row.principal)}
                      </td>
                      <td className="py-1.5 pr-3 text-right text-gray-600">
                        {formatCurrency(row.interest)}
                      </td>
                      <td className="py-1.5 text-right text-gray-600">
                        {formatCurrency(row.remainingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {termMonths > 6 && (
              <p className="mt-2 text-xs text-gray-400">
                ... ja {termMonths - 6} kuukautta lisää
              </p>
            )}
          </div>
        )}
      </div>

      {/* Affiliate disclosure footnote */}
      {isAffiliate && (
        <div className="border-t border-gray-100 px-5 py-2">
          <p className="text-[10px] text-gray-400 leading-tight">
            Mainos: Saamme korvauksen, jos haet lainaa tämän linkin kautta. Tämä ei vaikuta vertailun järjestykseen tai esitettyihin tietoihin.
          </p>
        </div>
      )}
    </div>
  );
}
