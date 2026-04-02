'use client';

import { useState, useMemo, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { LoanType, ComparisonResult } from '@/types';
import {
  calculateMonthlyPayment,
  calculateTotalCost,
  calculateTotalInterest,
} from '@/lib/utils';
import { providers as allProviders } from '@/data/providers';
import LoanDetailsStep from './LoanDetailsStep';
import PreferencesStep, {
  SortOption,
  ProviderFilter,
} from './PreferencesStep';
import ResultsList from './ResultsList';

type Step = 1 | 2 | 3;

// Helper: parse processing time string to approximate days for sorting
function parseProcessingDays(time: string): number {
  // Handles patterns like "1 päivä", "1–3 arkipäivää", "15 min", "saman päivän"
  if (time.includes('min') || time.includes('tunti') || time.includes('saman')) return 0;
  const match = time.match(/(\d+)/);
  return match ? parseInt(match[1], 10) : 99;
}

export default function ComparisonCalculator() {
  const searchParams = useSearchParams();

  // Step state
  const [step, setStep] = useState<Step>(1);

  // Step 1: Loan details
  const [amount, setAmount] = useState(10000);
  const [termMonths, setTermMonths] = useState(60);
  const [loanType, setLoanType] = useState<LoanType>('kulutusluotto');
  const [purpose, setPurpose] = useState('');

  // Step 2: Preferences
  const [sortBy, setSortBy] = useState<SortOption>('cheapest');
  const [providerFilter, setProviderFilter] = useState<ProviderFilter>('all');
  const [maxRate, setMaxRate] = useState(20); // 20 = no limit
  const [noSetupFeeOnly, setNoSetupFeeOnly] = useState(false);
  const [noMonthlyFeeOnly, setNoMonthlyFeeOnly] = useState(false);

  // Read URL search params on mount (e.g. from HeroSection: ?summa=X&aika=Y&type=Z)
  useEffect(() => {
    const summa = searchParams.get('summa');
    const aika = searchParams.get('aika');
    const type = searchParams.get('type');

    if (summa) {
      const parsed = parseInt(summa, 10);
      if (!isNaN(parsed) && parsed > 0) setAmount(parsed);
    }
    if (aika) {
      const parsed = parseInt(aika, 10);
      if (!isNaN(parsed) && parsed > 0) setTermMonths(parsed);
    }
    if (type && ['kulutusluotto', 'asuntolaina', 'autolaina', 'yhdistelylaina', 'yrityslaina', 'pikavippi'].includes(type)) {
      setLoanType(type as LoanType);
    }
  }, [searchParams]);

  // Compute comparison results
  const results = useMemo((): ComparisonResult[] => {
    const matched: ComparisonResult[] = [];

    for (const provider of allProviders) {
      // Provider type filter
      if (providerFilter === 'bank' && provider.type !== 'bank') continue;
      if (providerFilter === 'fintech' && provider.type !== 'fintech') continue;

      for (const product of provider.products) {
        // Must match loan type
        if (product.type !== loanType) continue;

        // Amount must be within product range
        if (amount < product.minAmount || amount > product.maxAmount) continue;

        // Term must be within product range
        if (termMonths < product.minTermMonths || termMonths > product.maxTermMonths) continue;

        // Fee filters
        if (noSetupFeeOnly && product.setupFee && product.setupFee > 0) continue;
        if (noMonthlyFeeOnly && product.monthlyFee && product.monthlyFee > 0) continue;

        // Use the minimum effective rate ("alkaen" / "from" pricing) — this is what comparison sites show
        const effectiveRate = product.effectiveRate.min;

        // Max rate filter
        if (maxRate < 20 && effectiveRate > maxRate) continue;

        const monthlyPayment = calculateMonthlyPayment(amount, effectiveRate, termMonths);
        const totalCost = calculateTotalCost(
          monthlyPayment,
          termMonths,
          product.setupFee || 0,
          product.monthlyFee || 0
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

    // Sort
    switch (sortBy) {
      case 'cheapest':
        matched.sort((a, b) => a.totalCost - b.totalCost);
        break;
      case 'lowest-monthly':
        matched.sort((a, b) => a.monthlyPayment - b.monthlyPayment);
        break;
      case 'fastest':
        matched.sort(
          (a, b) =>
            parseProcessingDays(a.product.processingTime) -
            parseProcessingDays(b.product.processingTime)
        );
        break;
    }

    return matched;
  }, [amount, termMonths, loanType, sortBy, providerFilter, maxRate, noSetupFeeOnly, noMonthlyFeeOnly]);

  // Navigation handlers
  const goToStep = useCallback((s: Step) => setStep(s), []);

  const handleLoanTypeChange = useCallback((type: LoanType) => {
    setLoanType(type);
    // Reset amount/term to sensible defaults when type changes
    switch (type) {
      case 'asuntolaina':
        setAmount(150000);
        setTermMonths(300);
        break;
      case 'autolaina':
        setAmount(15000);
        setTermMonths(60);
        break;
      case 'yhdistelylaina':
        setAmount(15000);
        setTermMonths(60);
        break;
      default:
        setAmount(10000);
        setTermMonths(60);
    }
  }, []);

  const handleReset = useCallback(() => {
    setAmount(10000);
    setTermMonths(60);
    setLoanType('kulutusluotto');
    setPurpose('');
    setSortBy('cheapest');
    setProviderFilter('all');
    setMaxRate(20);
    setNoSetupFeeOnly(false);
    setNoMonthlyFeeOnly(false);
    setStep(1);
  }, []);

  // Step progress indicator
  const steps = [
    { num: 1, label: 'Lainan tiedot' },
    { num: 2, label: 'Asetukset' },
    { num: 3, label: 'Tulokset' },
  ];

  return (
    <div>
      {/* Step indicator */}
      <div className="mb-8">
        <div className="flex items-center justify-center gap-2">
          {steps.map((s, idx) => (
            <div key={s.num} className="flex items-center">
              <button
                type="button"
                onClick={() => {
                  // Allow navigating to earlier steps or current step
                  if (s.num <= step) goToStep(s.num as Step);
                }}
                disabled={s.num > step}
                className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all ${
                  s.num === step
                    ? 'bg-[#1a365d] text-white shadow-sm'
                    : s.num < step
                    ? 'bg-[#1a365d]/10 text-[#1a365d] hover:bg-[#1a365d]/20 cursor-pointer'
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                <span
                  className={`flex items-center justify-center h-6 w-6 rounded-full text-xs font-bold ${
                    s.num === step
                      ? 'bg-white text-[#1a365d]'
                      : s.num < step
                      ? 'bg-[#1a365d] text-white'
                      : 'bg-gray-300 text-white'
                  }`}
                >
                  {s.num < step ? (
                    <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  ) : (
                    s.num
                  )}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </button>
              {idx < steps.length - 1 && (
                <div
                  className={`mx-2 h-0.5 w-8 sm:w-12 rounded ${
                    s.num < step ? 'bg-[#1a365d]' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Step content */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
        {step === 1 && (
          <LoanDetailsStep
            amount={amount}
            termMonths={termMonths}
            loanType={loanType}
            purpose={purpose}
            onAmountChange={setAmount}
            onTermChange={setTermMonths}
            onLoanTypeChange={handleLoanTypeChange}
            onPurposeChange={setPurpose}
            onNext={() => goToStep(2)}
          />
        )}

        {step === 2 && (
          <PreferencesStep
            sortBy={sortBy}
            providerFilter={providerFilter}
            maxRate={maxRate}
            noSetupFeeOnly={noSetupFeeOnly}
            noMonthlyFeeOnly={noMonthlyFeeOnly}
            onSortChange={setSortBy}
            onProviderFilterChange={setProviderFilter}
            onMaxRateChange={setMaxRate}
            onNoSetupFeeToggle={setNoSetupFeeOnly}
            onNoMonthlyFeeToggle={setNoMonthlyFeeOnly}
            onBack={() => goToStep(1)}
            onSubmit={() => goToStep(3)}
          />
        )}

        {step === 3 && (
          <ResultsList
            results={results}
            loanAmount={amount}
            termMonths={termMonths}
            loanType={loanType}
            onBack={() => goToStep(2)}
            onReset={handleReset}
          />
        )}
      </div>
    </div>
  );
}
