'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { RefreshCw, Info, CheckCircle, XCircle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LineChart,
  Line,
} from 'recharts';
import {
  calculateMonthlyPayment,
  formatCurrency,
  formatPercentage,
} from '@/lib/utils';

export default function JalleenrahoitusPage() {
  // Current loan
  const [currentBalance, setCurrentBalance] = useState(25000);
  const [currentRate, setCurrentRate] = useState(9.5);
  const [currentTermMonths, setCurrentTermMonths] = useState(48);

  // New loan
  const [newRate, setNewRate] = useState(5.9);
  const [newTermMonths, setNewTermMonths] = useState(48);
  const [setupFees, setSetupFees] = useState(150);

  const results = useMemo(() => {
    if (currentBalance <= 0 || currentTermMonths <= 0 || newTermMonths <= 0) return null;

    const currentPayment = calculateMonthlyPayment(currentBalance, currentRate, currentTermMonths);
    const newPayment = calculateMonthlyPayment(currentBalance, newRate, newTermMonths);

    const currentTotalCost = currentPayment * currentTermMonths;
    const newTotalCost = newPayment * newTermMonths + setupFees;

    const currentTotalInterest = currentTotalCost - currentBalance;
    const newTotalInterest = newTotalCost - currentBalance;

    const monthlySavings = currentPayment - newPayment;
    const totalSavings = currentTotalCost - newTotalCost;

    // Break-even: month where cumulative savings exceed setup fees
    let breakEvenMonth = 0;
    if (monthlySavings > 0 && setupFees > 0) {
      breakEvenMonth = Math.ceil(setupFees / monthlySavings);
    }

    const worthIt = totalSavings > 0;

    // Comparison data for chart
    const comparisonData = [
      {
        name: 'Kuukausierä',
        'Nykyinen laina': Math.round(currentPayment * 100) / 100,
        'Uusi laina': Math.round(newPayment * 100) / 100,
      },
      {
        name: 'Korot yhteensä',
        'Nykyinen laina': Math.round(currentTotalInterest * 100) / 100,
        'Uusi laina': Math.round(newTotalInterest * 100) / 100,
      },
      {
        name: 'Kokonaiskustannus',
        'Nykyinen laina': Math.round(currentTotalCost * 100) / 100,
        'Uusi laina': Math.round(newTotalCost * 100) / 100,
      },
    ];

    // Cumulative savings over time
    const savingsOverTime = [];
    let cumSavings = -setupFees;
    const maxMonths = Math.max(currentTermMonths, newTermMonths);
    for (let m = 1; m <= maxMonths; m++) {
      const currentPay = m <= currentTermMonths ? currentPayment : 0;
      const newPay = m <= newTermMonths ? newPayment : 0;
      cumSavings += currentPay - newPay;
      if (m % Math.max(1, Math.floor(maxMonths / 48)) === 0 || m === maxMonths || m === 1) {
        savingsOverTime.push({
          month: m,
          savings: Math.round(cumSavings * 100) / 100,
        });
      }
    }

    return {
      currentPayment,
      newPayment,
      currentTotalCost,
      newTotalCost,
      currentTotalInterest,
      newTotalInterest,
      monthlySavings,
      totalSavings,
      breakEvenMonth,
      worthIt,
      comparisonData,
      savingsOverTime,
    };
  }, [currentBalance, currentRate, currentTermMonths, newRate, newTermMonths, setupFees]);

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
            <span className="text-white">Jälleenrahoituslaskuri</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
              <RefreshCw className="w-5 h-5 text-[#ecc94b]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Jälleenrahoituslaskuri
              </h1>
              <p className="text-blue-100/80 text-sm mt-1">
                Selvitä kannattaako lainan uudelleenrahoitus
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Current loan */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                  1
                </div>
                Nykyinen laina
              </h2>

              {/* Current balance */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="currentBalance" className="text-sm font-medium text-gray-700">
                    Jäljellä oleva saldo
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatCurrency(currentBalance)}
                  </span>
                </div>
                <input
                  id="currentBalance"
                  type="range"
                  min={1000}
                  max={100000}
                  step={500}
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <input
                  type="number"
                  min={0}
                  value={currentBalance}
                  onChange={(e) => setCurrentBalance(Math.max(0, Number(e.target.value)))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none"
                />
              </div>

              {/* Current rate */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="currentRate" className="text-sm font-medium text-gray-700">
                    Nykyinen korko
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatPercentage(currentRate)}
                  </span>
                </div>
                <input
                  id="currentRate"
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={currentRate}
                  onChange={(e) => setCurrentRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* Current remaining term */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="currentTerm" className="text-sm font-medium text-gray-700">
                    Jäljellä oleva aika
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {currentTermMonths} kk ({(currentTermMonths / 12).toFixed(1)} v)
                  </span>
                </div>
                <input
                  id="currentTerm"
                  type="range"
                  min={6}
                  max={360}
                  step={6}
                  value={currentTermMonths}
                  onChange={(e) => setCurrentTermMonths(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>
            </div>

            {/* New loan */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
              <h2 className="text-base font-semibold text-gray-900 mb-5 flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-[#1a365d] flex items-center justify-center text-xs font-bold text-white">
                  2
                </div>
                Uusi laina
              </h2>

              {/* New rate */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="newRate" className="text-sm font-medium text-gray-700">
                    Uusi korko
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatPercentage(newRate)}
                  </span>
                </div>
                <input
                  id="newRate"
                  type="range"
                  min={1}
                  max={20}
                  step={0.1}
                  value={newRate}
                  onChange={(e) => setNewRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* New term */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="newTerm" className="text-sm font-medium text-gray-700">
                    Uusi laina-aika
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {newTermMonths} kk ({(newTermMonths / 12).toFixed(1)} v)
                  </span>
                </div>
                <input
                  id="newTerm"
                  type="range"
                  min={6}
                  max={360}
                  step={6}
                  value={newTermMonths}
                  onChange={(e) => setNewTermMonths(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* Setup fees */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="setupFees" className="text-sm font-medium text-gray-700">
                    Avausmaksut ja kulut
                    <span className="relative group ml-1 inline-block">
                      <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Uuden lainan perustamiskulut, käsittelypalkkiot yms.
                      </span>
                    </span>
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatCurrency(setupFees)}
                  </span>
                </div>
                <input
                  id="setupFees"
                  type="number"
                  min={0}
                  max={5000}
                  value={setupFees}
                  onChange={(e) => setSetupFees(Math.max(0, Number(e.target.value)))}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none"
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
                          ? 'Jälleenrahoitus kannattaa!'
                          : 'Jälleenrahoitus ei kannata'}
                      </h3>
                      <p
                        className={`mt-1 text-sm ${
                          results.worthIt ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        {results.worthIt
                          ? `Säästät yhteensä ${formatCurrency(results.totalSavings)} lainan aikana. Kuukausierä pienenee ${formatCurrency(results.monthlySavings)}.`
                          : `Uusi laina maksaisi ${formatCurrency(Math.abs(results.totalSavings))} enemmän kokonaisuudessaan. Harkitse lyhyempää laina-aikaa tai parempaa korkoa.`}
                      </p>
                      {results.worthIt && results.breakEvenMonth > 0 && (
                        <p className="mt-1 text-sm text-green-600">
                          Avausmaksut ovat katettu {results.breakEvenMonth} kuukauden jälkeen.
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Key metrics */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Kuukausisäästö</p>
                    <p
                      className={`text-2xl font-bold mt-1 ${
                        results.monthlySavings >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {results.monthlySavings >= 0 ? '+' : ''}
                      {formatCurrency(results.monthlySavings)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatCurrency(results.currentPayment)} &rarr;{' '}
                      {formatCurrency(results.newPayment)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Kokonaissäästö</p>
                    <p
                      className={`text-2xl font-bold mt-1 ${
                        results.totalSavings >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {results.totalSavings >= 0 ? '+' : ''}
                      {formatCurrency(results.totalSavings)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      sis. avausmaksut {formatCurrency(setupFees)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Break-even</p>
                    <p className="text-2xl font-bold text-[#1a365d] mt-1">
                      {results.breakEvenMonth > 0
                        ? `${results.breakEvenMonth} kk`
                        : results.monthlySavings > 0
                        ? 'Heti'
                        : '-'}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Kulut katetaan tässä ajassa
                    </p>
                  </div>
                </div>

                {/* Comparison chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Vertailu: nykyinen vs. uusi laina
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
                        dataKey="Nykyinen laina"
                        fill="#94a3b8"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        dataKey="Uusi laina"
                        fill="#1a365d"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Cumulative savings chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Kumulatiivinen säästö ajan myötä
                  </h3>
                  <ResponsiveContainer width="100%" height={250}>
                    <LineChart data={results.savingsOverTime}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="month"
                        tickFormatter={(m) => `${m} kk`}
                        tick={{ fontSize: 11, fill: '#718096' }}
                      />
                      <YAxis
                        tickFormatter={(v) =>
                          v >= 1000
                            ? `${(v / 1000).toFixed(0)}k`
                            : v <= -1000
                            ? `${(v / 1000).toFixed(0)}k`
                            : `${v}`
                        }
                        tick={{ fontSize: 11, fill: '#718096' }}
                        width={50}
                      />
                      <Tooltip
                        formatter={(value) => [
                          formatCurrency(Number(value)),
                          'Säästö',
                        ]}
                        labelFormatter={(label) => `Kuukausi ${label}`}
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '13px',
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="savings"
                        stroke="#38a169"
                        strokeWidth={2}
                        dot={false}
                      />
                      {/* Zero line reference */}
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                {/* CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Etsitkö parempaa korkoa?
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Vertaa lainatarjouksia ja löydä edullisin vaihtoehto jälleenrahoitukseen.
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
