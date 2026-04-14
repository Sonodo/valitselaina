'use client';

import { LoanType } from '@/types';
import { LOAN_TYPE_LABELS } from '@/lib/constants';

// Loan type configuration with amount/term ranges
const LOAN_TYPE_CONFIG: Record<
  string,
  {
    minAmount: number;
    maxAmount: number;
    amountStep: number;
    minTerm: number;
    maxTerm: number;
  }
> = {
  kulutusluotto: { minAmount: 500, maxAmount: 60000, amountStep: 500, minTerm: 12, maxTerm: 180 },
  asuntolaina: { minAmount: 10000, maxAmount: 1000000, amountStep: 5000, minTerm: 12, maxTerm: 360 },
  autolaina: { minAmount: 1000, maxAmount: 80000, amountStep: 500, minTerm: 12, maxTerm: 96 },
  yhdistelylaina: { minAmount: 2000, maxAmount: 60000, amountStep: 500, minTerm: 12, maxTerm: 180 },
  yrityslaina: { minAmount: 5000, maxAmount: 250000, amountStep: 1000, minTerm: 12, maxTerm: 120 },
  pikavippi: { minAmount: 100, maxAmount: 2000, amountStep: 50, minTerm: 1, maxTerm: 12 },
};

const PURPOSE_OPTIONS = [
  { value: '', label: 'Valitse (valinnainen)' },
  { value: 'remontti', label: 'Remontti' },
  { value: 'auto', label: 'Auto' },
  { value: 'matkustelu', label: 'Matkustelu' },
  { value: 'opiskelu', label: 'Opiskelu' },
  { value: 'haat', label: 'Häät' },
  { value: 'elektroniikka', label: 'Elektroniikka' },
  { value: 'muu', label: 'Muu' },
];

// Available loan types for the wizard (subset)
const WIZARD_LOAN_TYPES: LoanType[] = [
  'kulutusluotto',
  'asuntolaina',
  'autolaina',
  'yhdistelylaina',
  'yrityslaina',
  'pikavippi',
];

interface LoanDetailsStepProps {
  amount: number;
  termMonths: number;
  loanType: LoanType;
  purpose: string;
  onAmountChange: (amount: number) => void;
  onTermChange: (months: number) => void;
  onLoanTypeChange: (type: LoanType) => void;
  onPurposeChange: (purpose: string) => void;
  onNext: () => void;
}

export default function LoanDetailsStep({
  amount,
  termMonths,
  loanType,
  purpose,
  onAmountChange,
  onTermChange,
  onLoanTypeChange,
  onPurposeChange,
  onNext,
}: LoanDetailsStepProps) {
  const config = LOAN_TYPE_CONFIG[loanType] || LOAN_TYPE_CONFIG.kulutusluotto;

  // Clamp amount/term when loan type changes
  const clampedAmount = Math.min(Math.max(amount, config.minAmount), config.maxAmount);
  const clampedTerm = Math.min(Math.max(termMonths, config.minTerm), config.maxTerm);

  // Format number with Finnish thousand separator
  const formatThousands = (n: number) =>
    new Intl.NumberFormat('fi-FI').format(n);

  const termYears = Math.floor(clampedTerm / 12);
  const termRemainder = clampedTerm % 12;
  const termLabel =
    clampedTerm < 12
      ? `${clampedTerm} kk`
      : termRemainder === 0
        ? `${termYears} v`
        : `${termYears} v ${termRemainder} kk`;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Lainan tiedot
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Valitse lainatyyppi ja syötä haluamasi summa ja laina-aika.
        </p>
      </div>

      {/* Loan type selection */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Lainatyyppi
        </label>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {WIZARD_LOAN_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => onLoanTypeChange(type)}
              className={`rounded-lg border-2 px-4 py-3 text-sm font-medium transition-all ${
                loanType === type
                  ? 'border-[#1a365d] bg-[#1a365d]/5 text-[#1a365d] shadow-sm'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {LOAN_TYPE_LABELS[type]}
            </button>
          ))}
        </div>
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Lainasumma
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={config.minAmount}
            max={config.maxAmount}
            step={config.amountStep}
            value={clampedAmount}
            onChange={(e) => onAmountChange(Number(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none bg-gray-200 accent-[#1a365d] cursor-pointer"
          />
          <div className="relative">
            <input
              type="text"
              inputMode="numeric"
              value={formatThousands(clampedAmount)}
              onChange={(e) => {
                const raw = e.target.value.replace(/\s/g, '').replace(/[^0-9]/g, '');
                const num = parseInt(raw, 10);
                if (!isNaN(num)) {
                  onAmountChange(
                    Math.min(Math.max(num, config.minAmount), config.maxAmount)
                  );
                }
              }}
              className="w-36 rounded-lg border border-gray-300 pl-3 pr-8 py-2 text-right text-sm font-semibold text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d] focus:outline-none"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400 pointer-events-none">
              &euro;
            </span>
          </div>
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>{formatThousands(config.minAmount)} &euro;</span>
          <span>{formatThousands(config.maxAmount)} &euro;</span>
        </div>
      </div>

      {/* Term */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Laina-aika:{' '}
          <span className="text-[#1a365d]">{termLabel}</span>
          <span className="text-gray-400 font-normal ml-1">({clampedTerm} kk)</span>
        </label>
        <div className="flex items-center gap-4">
          <input
            type="range"
            min={config.minTerm}
            max={config.maxTerm}
            step={config.minTerm < 12 ? 1 : 6}
            value={clampedTerm}
            onChange={(e) => onTermChange(Number(e.target.value))}
            className="flex-1 h-2 rounded-full appearance-none bg-gray-200 accent-[#1a365d] cursor-pointer"
          />
          <div className="w-36 shrink-0">
            <select
              value={clampedTerm}
              onChange={(e) => onTermChange(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-2 py-2 text-sm font-semibold text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d] focus:outline-none"
            >
              {config.minTerm < 12
                ? Array.from(
                    { length: config.maxTerm - config.minTerm + 1 },
                    (_, i) => config.minTerm + i
                  ).map((m) => (
                    <option key={m} value={m}>
                      {m} kk
                    </option>
                  ))
                : Array.from(
                    { length: Math.floor((config.maxTerm - config.minTerm) / 12) + 1 },
                    (_, i) => config.minTerm + i * 12
                  ).map((m) => (
                    <option key={m} value={m}>
                      {m / 12} v ({m} kk)
                    </option>
                  ))}
            </select>
          </div>
        </div>
        <div className="mt-1 flex justify-between text-xs text-gray-400">
          <span>{config.minTerm >= 12 ? `${config.minTerm / 12} vuosi` : `${config.minTerm} kk`}</span>
          <span>{config.maxTerm >= 12 ? `${config.maxTerm / 12} vuotta` : `${config.maxTerm} kk`}</span>
        </div>
      </div>

      {/* Purpose (optional) */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Käyttötarkoitus
          <span className="ml-1 font-normal text-gray-400">(valinnainen)</span>
        </label>
        <select
          value={purpose}
          onChange={(e) => onPurposeChange(e.target.value)}
          className="w-full max-w-xs rounded-lg border border-gray-300 px-3 py-2.5 text-sm text-gray-700 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d] focus:outline-none"
        >
          {PURPOSE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>

      {/* Quick summary */}
      <div className="rounded-lg bg-[#f7fafc] border border-gray-100 p-4">
        <div className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
          <div>
            <span className="text-gray-500">Laina:</span>{' '}
            <span className="font-semibold text-gray-900">
              {formatThousands(clampedAmount)} &euro;
            </span>
          </div>
          <div>
            <span className="text-gray-500">Aika:</span>{' '}
            <span className="font-semibold text-gray-900">{termLabel}</span>
          </div>
          <div>
            <span className="text-gray-500">Tyyppi:</span>{' '}
            <span className="font-semibold text-gray-900">
              {LOAN_TYPE_LABELS[loanType]}
            </span>
          </div>
        </div>
      </div>

      {/* Next button */}
      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
        >
          Seuraava
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </div>
    </div>
  );
}
