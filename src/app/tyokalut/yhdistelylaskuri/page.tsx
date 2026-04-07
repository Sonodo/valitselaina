'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Layers, Plus, Trash2, AlertTriangle, Info, CheckCircle, XCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  calculateMonthlyPayment,
  formatCurrency,
  formatPercentage,
} from '@/lib/utils';

interface ExistingLoan {
  id: number;
  name: string;
  amount: number;
  rate: number;
  monthlyPayment: number;
  remainingMonths: number;
}

let nextLoanId = 3;

const DEFAULT_LOANS: ExistingLoan[] = [
  { id: 1, name: 'Kulutusluotto 1', amount: 8000, rate: 9.9, monthlyPayment: 220, remainingMonths: 48 },
  { id: 2, name: 'Kulutusluotto 2', amount: 5000, rate: 12.5, monthlyPayment: 180, remainingMonths: 36 },
];

export default function YhdistelylaskuriPage() {
  const [loans, setLoans] = useState<ExistingLoan[]>(DEFAULT_LOANS);
  const [consolidationRate, setConsolidationRate] = useState(7.5);
  const [consolidationTermMonths, setConsolidationTermMonths] = useState(60);

  const addLoan = () => {
    setLoans([
      ...loans,
      {
        id: nextLoanId++,
        name: `Laina ${loans.length + 1}`,
        amount: 3000,
        rate: 10,
        monthlyPayment: 100,
        remainingMonths: 36,
      },
    ]);
  };

  const removeLoan = (id: number) => {
    if (loans.length > 1) {
      setLoans(loans.filter((l) => l.id !== id));
    }
  };

  const updateLoan = (id: number, field: keyof ExistingLoan, value: string | number) => {
    setLoans(loans.map((l) => (l.id === id ? { ...l, [field]: value } : l)));
  };

  const results = useMemo(() => {
    if (loans.length === 0) return null;

    const totalBalance = loans.reduce((sum, l) => sum + l.amount, 0);
    const totalCurrentMonthly = loans.reduce((sum, l) => sum + l.monthlyPayment, 0);

    // Calculate total remaining cost for each existing loan
    const totalCurrentCost = loans.reduce((sum, l) => {
      return sum + l.monthlyPayment * l.remainingMonths;
    }, 0);
    const totalCurrentInterest = totalCurrentCost - totalBalance;

    // Consolidation loan
    const consolidatedPayment = calculateMonthlyPayment(
      totalBalance,
      consolidationRate,
      consolidationTermMonths
    );
    const consolidatedTotalCost = consolidatedPayment * consolidationTermMonths;
    const consolidatedTotalInterest = consolidatedTotalCost - totalBalance;

    const monthlySavings = totalCurrentMonthly - consolidatedPayment;
    const totalSavings = totalCurrentCost - consolidatedTotalCost;
    const interestDifference = totalCurrentInterest - consolidatedTotalInterest;

    // HONESTY: warn if total interest increases despite lower payment
    const interestIncreases = consolidatedTotalInterest > totalCurrentInterest;

    const worthIt = totalSavings > 0;

    // Per-loan breakdown for chart
    const loanBreakdown = loans.map((l) => ({
      name: l.name,
      'Nykyinen kokonaiskorko': Math.round((l.monthlyPayment * l.remainingMonths - l.amount) * 100) / 100,
      'Nykyinen kuukausierä': l.monthlyPayment,
    }));

    const comparisonData = [
      {
        name: 'Kuukausierä',
        'Nykyiset lainat': Math.round(totalCurrentMonthly * 100) / 100,
        'Yhdistelylaina': Math.round(consolidatedPayment * 100) / 100,
      },
      {
        name: 'Korot yhteensä',
        'Nykyiset lainat': Math.round(totalCurrentInterest * 100) / 100,
        'Yhdistelylaina': Math.round(consolidatedTotalInterest * 100) / 100,
      },
      {
        name: 'Kokonaiskustannus',
        'Nykyiset lainat': Math.round(totalCurrentCost * 100) / 100,
        'Yhdistelylaina': Math.round(consolidatedTotalCost * 100) / 100,
      },
    ];

    return {
      totalBalance,
      totalCurrentMonthly,
      totalCurrentCost,
      totalCurrentInterest,
      consolidatedPayment,
      consolidatedTotalCost,
      consolidatedTotalInterest,
      monthlySavings,
      totalSavings,
      interestDifference,
      interestIncreases,
      worthIt,
      loanBreakdown,
      comparisonData,
    };
  }, [loans, consolidationRate, consolidationTermMonths]);

  return (
    <div className="bg-[#f7fafc] min-h-screen">
      {/* Header */}
      <section className="bg-[#1a365d] py-10 sm:py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <nav className="text-sm text-blue-200 mb-4">
            <Link href="/tyokalut" className="hover:text-white transition-colors">
              Työkalut
            </Link>
            <span className="mx-2">/</span>
            <span className="text-white">Yhdistelylaskuri</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
              <Layers className="w-5 h-5 text-[#ecc94b]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Yhdistelylaskuri</h1>
              <p className="text-blue-100/80 text-sm mt-1">
                Kannattaako lainojen yhdistäminen? Rehellinen laskelma.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Existing loans */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-base font-semibold text-gray-900">Nykyiset lainat</h2>
                <button
                  onClick={addLoan}
                  className="inline-flex items-center gap-1 text-xs font-medium text-[#1a365d] hover:text-[#2a4a7f] transition-colors"
                >
                  <Plus className="w-4 h-4" /> Lisää laina
                </button>
              </div>

              <div className="space-y-5">
                {loans.map((loan, index) => (
                  <div key={loan.id} className="relative border border-gray-100 rounded-lg p-4">
                    {loans.length > 1 && (
                      <button
                        onClick={() => removeLoan(loan.id)}
                        className="absolute top-2 right-2 p-1 text-gray-400 hover:text-red-500 transition-colors"
                        aria-label="Poista laina"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                    <input
                      type="text"
                      value={loan.name}
                      onChange={(e) => updateLoan(loan.id, 'name', e.target.value)}
                      className="text-sm font-medium text-gray-900 bg-transparent border-none p-0 focus:outline-none focus:ring-0 w-full mb-3"
                    />
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Saldo</label>
                        <input
                          type="number"
                          min={0}
                          value={loan.amount}
                          onChange={(e) =>
                            updateLoan(loan.id, 'amount', Math.max(0, Number(e.target.value)))
                          }
                          className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]/20 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Korko %</label>
                        <input
                          type="number"
                          min={0}
                          max={30}
                          step={0.1}
                          value={loan.rate}
                          onChange={(e) =>
                            updateLoan(loan.id, 'rate', Math.max(0, Number(e.target.value)))
                          }
                          className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]/20 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Kuukausierä</label>
                        <input
                          type="number"
                          min={0}
                          value={loan.monthlyPayment}
                          onChange={(e) =>
                            updateLoan(loan.id, 'monthlyPayment', Math.max(0, Number(e.target.value)))
                          }
                          className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]/20 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500 block mb-1">Jäljellä (kk)</label>
                        <input
                          type="number"
                          min={1}
                          value={loan.remainingMonths}
                          onChange={(e) =>
                            updateLoan(loan.id, 'remainingMonths', Math.max(1, Number(e.target.value)))
                          }
                          className="w-full rounded-md border border-gray-300 px-2.5 py-1.5 text-sm focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]/20 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Consolidation offer */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-5">
                Yhdistelylainan ehdot
              </h2>

              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Korko</label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatPercentage(consolidationRate)}
                  </span>
                </div>
                <input
                  type="range"
                  min={2}
                  max={20}
                  step={0.1}
                  value={consolidationRate}
                  onChange={(e) => setConsolidationRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label className="text-sm font-medium text-gray-700">Laina-aika</label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {consolidationTermMonths} kk ({(consolidationTermMonths / 12).toFixed(1)} v)
                  </span>
                </div>
                <input
                  type="range"
                  min={12}
                  max={180}
                  step={6}
                  value={consolidationTermMonths}
                  onChange={(e) => setConsolidationTermMonths(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Verdict */}
                <div
                  className={`rounded-xl border-2 p-6 shadow-sm ${
                    results.worthIt
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {results.worthIt ? (
                      <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <XCircle className="w-7 h-7 text-red-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <h3
                        className={`text-lg font-bold ${
                          results.worthIt ? 'text-green-800' : 'text-red-800'
                        }`}
                      >
                        {results.worthIt
                          ? 'Yhdistäminen kannattaa!'
                          : 'Yhdistäminen ei kannata näillä ehdoilla'}
                      </h3>
                      <p
                        className={`mt-1 text-sm ${
                          results.worthIt ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {results.worthIt
                          ? `Säästät yhteensä ${formatCurrency(results.totalSavings)}. Kuukausierä: ${formatCurrency(results.totalCurrentMonthly)} → ${formatCurrency(results.consolidatedPayment)}.`
                          : `Yhdistelylaina maksaisi ${formatCurrency(Math.abs(results.totalSavings))} enemmän.`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* HONESTY WARNING: Interest increases with longer term */}
                {results.interestIncreases && results.monthlySavings > 0 && (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-bold text-amber-800">
                          Huomio: kokonaiskorko kasvaa!
                        </h4>
                        <p className="text-sm text-amber-700 mt-1">
                          Vaikka kuukausierä pienenee {formatCurrency(results.monthlySavings)},
                          maksat kokonaisuudessaan{' '}
                          <strong>{formatCurrency(Math.abs(results.interestDifference))}</strong> enemmän
                          korkoja pidemmän laina-ajan takia. Harkitse lyhyempää laina-aikaa.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Key metrics */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Yhdistettävä summa
                    </p>
                    <p className="text-2xl font-bold text-[#1a365d] mt-1">
                      {formatCurrency(results.totalBalance)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {loans.length} lainaa yhteensä
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Uusi kuukausierä
                    </p>
                    <p className="text-2xl font-bold text-[#1a365d] mt-1">
                      {formatCurrency(results.consolidatedPayment)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Nykyinen: {formatCurrency(results.totalCurrentMonthly)} / kk
                    </p>
                  </div>
                </div>

                {/* Savings breakdown */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">Säästöerittely</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Nykyinen kuukausierä yhteensä</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(results.totalCurrentMonthly)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Yhdistelylainan kuukausierä</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(results.consolidatedPayment)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Kuukausisäästö</span>
                      <span
                        className={`text-sm font-semibold ${
                          results.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {results.monthlySavings >= 0 ? '+' : ''}
                        {formatCurrency(results.monthlySavings)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Nykyiset korot yhteensä</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(results.totalCurrentInterest)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2 border-b border-gray-100">
                      <span className="text-sm text-gray-600">Yhdistelylainan korot</span>
                      <span className="text-sm font-semibold text-gray-900">
                        {formatCurrency(results.consolidatedTotalInterest)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-2">
                      <span className="text-sm font-semibold text-gray-900">Kokonaissäästö</span>
                      <span
                        className={`text-lg font-bold ${
                          results.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {results.totalSavings >= 0 ? '+' : ''}
                        {formatCurrency(results.totalSavings)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Comparison chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Vertailu: nykyiset lainat vs. yhdistelylaina
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={results.comparisonData} barGap={8}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 12, fill: '#718096' }}
                      />
                      <YAxis
                        tickFormatter={(v) =>
                          v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
                        }
                        tick={{ fontSize: 11, fill: '#718096' }}
                        width={50}
                      />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '13px',
                        }}
                      />
                      <Legend />
                      <Bar
                        dataKey="Nykyiset lainat"
                        fill="#94a3b8"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Yhdistelylaina"
                        fill="#1a365d"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Vertaa yhdistelylainatarjouksia
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Löydä edullisin yhdistelylaina vertailemalla oikeita tarjouksia.
                  </p>
                  <Link
                    href="/vertailu"
                    className="mt-4 inline-flex items-center justify-center rounded-lg bg-[#1a365d] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors"
                  >
                    Vertaa lainoja
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
