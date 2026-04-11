'use client';

import { useState, useMemo } from 'react';
import { Calculator, TrendingUp, AlertTriangle } from 'lucide-react';

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  if (annualRate === 0) return principal / termMonths;
  const monthlyRate = annualRate / 100 / 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
}

function formatEur(val: number): string {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

interface Props {
  defaultEuribor: number;
}

export default function StressTestCalculator({ defaultEuribor }: Props) {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [margin, setMargin] = useState(0.5);
  const [termYears, setTermYears] = useState(25);

  const termMonths = termYears * 12;

  const scenarios = useMemo(() => {
    const rates = [defaultEuribor, 3, 4, 5];
    return rates.map((euribor) => {
      const totalRate = euribor + margin;
      const monthly = calculateMonthlyPayment(loanAmount, totalRate, termMonths);
      return { euribor, totalRate, monthly };
    });
  }, [loanAmount, margin, termMonths, defaultEuribor]);

  const currentPayment = scenarios[0].monthly;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a365d]">
          <Calculator className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Korkostressitesti
          </h3>
          <p className="text-sm text-gray-500">
            Miten korkotason nousu vaikuttaisi lainaerääsi?
          </p>
        </div>
      </div>

      {/* Inputs */}
      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        <div>
          <label
            htmlFor="loan-amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Lainasumma
          </label>
          <div className="relative">
            <input
              id="loan-amount"
              type="number"
              min={10000}
              max={1000000}
              step={10000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              EUR
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="margin"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Marginaali
          </label>
          <div className="relative">
            <input
              id="margin"
              type="number"
              min={0}
              max={5}
              step={0.05}
              value={margin}
              onChange={(e) => setMargin(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              %
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="term"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Laina-aika
          </label>
          <div className="relative">
            <input
              id="term"
              type="number"
              min={5}
              max={35}
              step={1}
              value={termYears}
              onChange={(e) => setTermYears(Number(e.target.value))}
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              vuotta
            </span>
          </div>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-3">
        <div className="grid grid-cols-4 gap-3 text-xs font-medium text-gray-500 uppercase tracking-wider px-4">
          <span>Euribor 12kk</span>
          <span>Kokonaiskorko</span>
          <span>Kuukausierä</span>
          <span>Ero nykyiseen</span>
        </div>

        {scenarios.map((s, i) => {
          const diff = s.monthly - currentPayment;
          const isBase = i === 0;

          return (
            <div
              key={s.euribor}
              className={`grid grid-cols-4 gap-3 items-center rounded-xl px-4 py-3 ${
                isBase
                  ? 'bg-[#1a365d]/5 border border-[#1a365d]/20'
                  : diff > 200
                    ? 'bg-red-50 border border-red-200'
                    : 'bg-gray-50 border border-gray-100'
              }`}
            >
              <span className="font-medium text-gray-900">
                {s.euribor.toFixed(2).replace('.', ',')} %
                {isBase && (
                  <span className="block text-xs text-[#1a365d] font-normal">
                    Nyt
                  </span>
                )}
              </span>
              <span className="text-gray-700">
                {s.totalRate.toFixed(2).replace('.', ',')} %
              </span>
              <span className="font-semibold text-gray-900">
                {formatEur(s.monthly)}
              </span>
              <span
                className={`font-medium ${
                  isBase
                    ? 'text-gray-400'
                    : diff > 200
                      ? 'text-red-600'
                      : diff > 0
                        ? 'text-amber-600'
                        : 'text-green-600'
                }`}
              >
                {isBase ? '—' : `+${formatEur(diff)}/kk`}
              </span>
            </div>
          );
        })}
      </div>

      {/* Warning */}
      <div className="mt-6 flex items-start gap-3 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
        <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <p className="text-sm text-amber-800">
          Laskelma on suuntaa antava. Todelliseen kuukausierään vaikuttavat myös
          pankin palvelumaksut, lainan lyhennystapa (annuiteetti/tasalyhennys) ja
          mahdolliset korkokaton ehdot.
        </p>
      </div>
    </div>
  );
}
