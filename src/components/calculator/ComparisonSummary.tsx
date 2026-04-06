'use client';

import { ComparisonResult } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { LOAN_TYPE_LABELS } from '@/lib/constants';

interface ComparisonSummaryProps {
  results: ComparisonResult[];
  loanAmount: number;
  termMonths: number;
  loanType: string;
}

export default function ComparisonSummary({
  results,
  loanAmount,
  termMonths,
  loanType,
}: ComparisonSummaryProps) {
  if (results.length === 0) return null;

  const cheapest = results.reduce((a, b) =>
    a.totalCost < b.totalCost ? a : b
  );
  const mostExpensive = results.reduce((a, b) =>
    a.totalCost > b.totalCost ? a : b
  );
  const lowestRate = results.reduce((a, b) =>
    a.effectiveRate < b.effectiveRate ? a : b
  );

  const savings = mostExpensive.totalCost - cheapest.totalCost;

  const termYears = Math.floor(termMonths / 12);
  const termRemainder = termMonths % 12;
  const termLabel =
    termRemainder === 0
      ? `${termYears} vuotta`
      : `${termYears} v ${termRemainder} kk`;

  return (
    <div className="rounded-xl border border-[#1a365d]/10 bg-gradient-to-br from-[#1a365d] to-[#2a4a7f] p-5 text-white shadow-md">
      {/* Top line */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
        <h3 className="text-lg font-bold">
          {results.length} lainaa löydetty
        </h3>
        <div className="flex items-center gap-2 text-sm text-white/70">
          <span>{LOAN_TYPE_LABELS[loanType] || loanType}</span>
          <span className="text-white/30">|</span>
          <span>{new Intl.NumberFormat('fi-FI').format(loanAmount)} &euro;</span>
          <span className="text-white/30">|</span>
          <span>{termLabel}</span>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-xs text-white/60 mb-0.5">Edullisin kuukausierä</div>
          <div className="text-xl font-bold">{formatCurrency(cheapest.monthlyPayment)}</div>
          <div className="text-xs text-white/50 mt-0.5">
            {cheapest.provider.shortName || cheapest.provider.name}
          </div>
        </div>

        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-xs text-white/60 mb-0.5">Kallein kuukausierä</div>
          <div className="text-xl font-bold">{formatCurrency(mostExpensive.monthlyPayment)}</div>
          <div className="text-xs text-white/50 mt-0.5">
            {mostExpensive.provider.shortName || mostExpensive.provider.name}
          </div>
        </div>

        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-xs text-white/60 mb-0.5">Alin todellinen vuosikorko</div>
          <div className="text-xl font-bold">{formatPercentage(lowestRate.effectiveRate)}</div>
          <div className="text-xs text-white/50 mt-0.5">
            {lowestRate.provider.shortName || lowestRate.provider.name}
          </div>
        </div>

        <div className="rounded-lg bg-white/10 p-3">
          <div className="text-xs text-white/60 mb-0.5">Säästösi vertailemalla</div>
          <div className="text-xl font-bold text-[#48bb78]">
            {formatCurrency(savings)}
          </div>
          <div className="text-xs text-white/50 mt-0.5">
            edullisimman ja kalleimman ero
          </div>
        </div>
      </div>
    </div>
  );
}
