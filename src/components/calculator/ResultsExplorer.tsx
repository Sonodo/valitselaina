'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { LoanType, ComparisonResult } from '@/types';
import {
  calculateMonthlyPayment,
  calculateTotalCost,
  calculateTotalInterest,
} from '@/lib/utils';
import { providers as allProviders } from '@/data/providers';
import { LOAN_TYPE_LABELS } from '@/lib/constants';
import ResultCard from './ResultCard';
import ComparisonSummary from './ComparisonSummary';

/* ──────────────────────────────────────────────────────────────────
   Direct-to-results loan comparison.
   - URL query params (?type=&summa=&aika=&jarjesta=) are the source of truth
   - Sensible defaults render offers immediately on first load
   - Sticky criteria bar stays visible; any change re-renders the list
   ────────────────────────────────────────────────────────────────── */

type SortKey = 'cheapest' | 'lowest-monthly' | 'lowest-rate';

interface LoanTypeConfig {
  minAmount: number;
  maxAmount: number;
  amountStep: number;
  defaultAmount: number;
  termOptions: number[]; // months
  defaultTerm: number;
}

const LOAN_TYPE_CONFIG: Record<LoanType, LoanTypeConfig> = {
  kulutusluotto: {
    minAmount: 500,
    maxAmount: 60000,
    amountStep: 500,
    defaultAmount: 10000,
    termOptions: [12, 24, 36, 48, 60, 72, 84, 120, 180],
    defaultTerm: 60,
  },
  asuntolaina: {
    minAmount: 20000,
    maxAmount: 1000000,
    amountStep: 5000,
    defaultAmount: 200000,
    termOptions: [120, 180, 240, 300, 360],
    defaultTerm: 300,
  },
  autolaina: {
    minAmount: 1000,
    maxAmount: 80000,
    amountStep: 500,
    defaultAmount: 15000,
    termOptions: [12, 24, 36, 48, 60, 72, 84, 96],
    defaultTerm: 60,
  },
  yhdistelylaina: {
    minAmount: 2000,
    maxAmount: 60000,
    amountStep: 500,
    defaultAmount: 15000,
    termOptions: [12, 24, 36, 48, 60, 72, 84, 120, 180],
    defaultTerm: 60,
  },
  yrityslaina: {
    minAmount: 5000,
    maxAmount: 250000,
    amountStep: 1000,
    defaultAmount: 50000,
    termOptions: [12, 24, 36, 48, 60, 72, 84, 120],
    defaultTerm: 60,
  },
  pikavippi: {
    minAmount: 100,
    maxAmount: 2000,
    amountStep: 50,
    defaultAmount: 500,
    termOptions: [1, 2, 3, 6, 12],
    defaultTerm: 3,
  },
};

const VALID_LOAN_TYPES: LoanType[] = [
  'kulutusluotto',
  'asuntolaina',
  'autolaina',
  'yhdistelylaina',
  'yrityslaina',
  'pikavippi',
];

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'lowest-rate', label: 'Alin vuosikorko' },
  { value: 'cheapest', label: 'Pienin kokonaiskustannus' },
  { value: 'lowest-monthly', label: 'Pienin kuukausierä' },
];

function parseLoanType(v: string | null): LoanType {
  if (v && (VALID_LOAN_TYPES as string[]).includes(v)) return v as LoanType;
  return 'kulutusluotto';
}

function parseSort(v: string | null): SortKey {
  if (v === 'cheapest' || v === 'lowest-monthly' || v === 'lowest-rate') return v;
  return 'lowest-rate';
}

function parseIntOr(v: string | null, fallback: number): number {
  if (!v) return fallback;
  const n = parseInt(v, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function nearestTerm(n: number, options: number[]): number {
  let best = options[0];
  let bestDiff = Math.abs(n - best);
  for (const opt of options) {
    const diff = Math.abs(n - opt);
    if (diff < bestDiff) {
      best = opt;
      bestDiff = diff;
    }
  }
  return best;
}

function formatThousands(n: number): string {
  return new Intl.NumberFormat('fi-FI').format(n);
}

function termLabel(months: number): string {
  if (months < 12) return `${months} kk`;
  const years = Math.floor(months / 12);
  const remainder = months % 12;
  return remainder === 0 ? `${years} v` : `${years} v ${remainder} kk`;
}

export default function ResultsExplorer() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Initialise state from URL (client-only hook; server will render fallback)
  const initialType = parseLoanType(searchParams.get('type'));
  const initialConfig = LOAN_TYPE_CONFIG[initialType];

  const [loanType, setLoanType] = useState<LoanType>(initialType);
  const [amount, setAmount] = useState<number>(() => {
    const raw = parseIntOr(searchParams.get('summa'), initialConfig.defaultAmount);
    return clamp(raw, initialConfig.minAmount, initialConfig.maxAmount);
  });
  const [termMonths, setTermMonths] = useState<number>(() => {
    const raw = parseIntOr(searchParams.get('aika'), initialConfig.defaultTerm);
    return nearestTerm(raw, initialConfig.termOptions);
  });
  const [sortBy, setSortBy] = useState<SortKey>(parseSort(searchParams.get('jarjesta')));

  const config = LOAN_TYPE_CONFIG[loanType];

  // Sync URL (replace, no history push)
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('type', loanType);
    params.set('summa', String(amount));
    params.set('aika', String(termMonths));
    if (sortBy !== 'lowest-rate') params.set('jarjesta', sortBy);
    router.replace(`/vertailu?${params.toString()}`, { scroll: false });
  }, [loanType, amount, termMonths, sortBy, router]);

  const handleLoanTypeChange = useCallback((next: LoanType) => {
    const nextConfig = LOAN_TYPE_CONFIG[next];
    setLoanType(next);
    setAmount(nextConfig.defaultAmount);
    setTermMonths(nextConfig.defaultTerm);
  }, []);

  // Compute matches
  const results = useMemo((): ComparisonResult[] => {
    const matched: ComparisonResult[] = [];

    for (const provider of allProviders) {
      for (const product of provider.products) {
        if (product.type !== loanType) continue;
        if (amount < product.minAmount || amount > product.maxAmount) continue;
        if (termMonths < product.minTermMonths || termMonths > product.maxTermMonths) continue;

        const effectiveRate = product.effectiveRate.min;
        const monthlyPayment = calculateMonthlyPayment(amount, effectiveRate, termMonths);
        const totalCost = calculateTotalCost(
          monthlyPayment,
          termMonths,
          product.setupFee || 0,
          product.monthlyFee || 0,
        );
        const totalInterest = calculateTotalInterest(monthlyPayment, termMonths, amount);

        matched.push({
          product,
          provider,
          monthlyPayment,
          totalCost,
          totalInterest,
          effectiveRate,
          isAffiliate: provider.isAffiliate,
        });
      }
    }

    switch (sortBy) {
      case 'cheapest':
        matched.sort((a, b) => a.totalCost - b.totalCost);
        break;
      case 'lowest-monthly':
        matched.sort((a, b) => a.monthlyPayment - b.monthlyPayment);
        break;
      case 'lowest-rate':
      default:
        matched.sort((a, b) => a.effectiveRate - b.effectiveRate);
        break;
    }

    return matched;
  }, [loanType, amount, termMonths, sortBy]);

  // For the "closest match" hint in the empty state
  const closestAmount = useMemo(() => {
    if (results.length > 0) return null;
    const typeProducts = allProviders.flatMap((p) =>
      p.products.filter((pr) => pr.type === loanType),
    );
    if (typeProducts.length === 0) return null;
    const amounts = typeProducts.flatMap((pr) => [pr.minAmount, pr.maxAmount]);
    return {
      min: Math.min(...amounts),
      max: Math.max(...amounts),
    };
  }, [loanType, results.length]);

  return (
    <div className="space-y-6">
      {/* ── Sticky criteria bar ────────────────────────────────── */}
      <div className="sticky top-0 z-30 -mx-4 sm:mx-0 border-b border-gray-200 bg-white/95 px-4 sm:px-0 sm:rounded-xl sm:border sm:shadow-sm backdrop-blur">
        <div className="sm:p-5">
          {/* Loan type pills */}
          <div className="flex gap-2 overflow-x-auto pt-3 pb-2 sm:pt-0 -mx-1 px-1 sm:mx-0 sm:px-0">
            {VALID_LOAN_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleLoanTypeChange(type)}
                className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs sm:text-sm font-semibold transition-colors ${
                  loanType === type
                    ? 'border-[#1a365d] bg-[#1a365d] text-white'
                    : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                {LOAN_TYPE_LABELS[type]}
              </button>
            ))}
          </div>

          {/* Sliders + sort */}
          <div className="mt-3 pb-3 sm:pb-0 grid grid-cols-1 gap-4 sm:grid-cols-12 sm:gap-5 sm:items-end">
            {/* Amount */}
            <div className="sm:col-span-5">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                Lainasumma
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min={config.minAmount}
                  max={config.maxAmount}
                  step={config.amountStep}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="flex-1 h-2 rounded-full appearance-none bg-gray-200 accent-[#1a365d] cursor-pointer"
                  aria-label="Lainasumma"
                />
                <div className="relative shrink-0">
                  <input
                    type="text"
                    inputMode="numeric"
                    value={formatThousands(amount)}
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
                      const num = parseInt(raw, 10);
                      if (!Number.isNaN(num)) {
                        setAmount(clamp(num, config.minAmount, config.maxAmount));
                      }
                    }}
                    className="w-28 rounded-lg border border-gray-300 pl-3 pr-7 py-1.5 text-right text-sm font-semibold text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d] focus:outline-none"
                  />
                  <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
                    &euro;
                  </span>
                </div>
              </div>
            </div>

            {/* Term */}
            <div className="sm:col-span-4">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                Laina-aika
              </label>
              <select
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-semibold text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d] focus:outline-none"
                aria-label="Laina-aika"
              >
                {config.termOptions.map((m) => (
                  <option key={m} value={m}>
                    {termLabel(m)} ({m} kk)
                  </option>
                ))}
              </select>
            </div>

            {/* Sort */}
            <div className="sm:col-span-3">
              <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500 mb-1">
                Järjestys
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm font-medium text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d] focus:outline-none"
                aria-label="Järjestys"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* ── Results area ─────────────────────────────────────── */}
      {results.length > 0 ? (
        <>
          <ComparisonSummary
            results={results}
            loanAmount={amount}
            termMonths={termMonths}
            loanType={loanType}
          />
          <div className="space-y-4">
            {results.map((result, index) => (
              <ResultCard
                key={result.product.id}
                result={result}
                rank={index + 1}
                loanAmount={amount}
                termMonths={termMonths}
              />
            ))}
          </div>
          <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-xs text-gray-500 leading-relaxed">
            <strong>Huomautus:</strong> Näytettävät korot ovat &quot;alkaen&quot;-korkoja eli lainanantajan
            edullisimpia ilmoitettuja korkoja. Todellinen korkosi voi olla korkeampi luottokelpoisuutesi
            perusteella. Vertailu on suuntaa-antava — pyydä aina virallinen lainatarjous suoraan
            lainanantajalta. Tiedot tarkistetaan kuukausittain.
          </div>
        </>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white p-10 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg
              className="h-7 w-7 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Näillä ehdoilla ei lainoja
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Muokkaa summaa tai laina-aikaa yltä.
            {closestAmount && (
              <>
                {' '}
                {LOAN_TYPE_LABELS[loanType]}-tuotteita löytyy välillä{' '}
                <strong>{formatThousands(closestAmount.min)} – {formatThousands(closestAmount.max)} &euro;</strong>.
              </>
            )}
          </p>
        </div>
      )}
    </div>
  );
}
