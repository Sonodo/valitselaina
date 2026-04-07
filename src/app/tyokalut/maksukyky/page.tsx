'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Wallet, Info, AlertTriangle } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import {
  calculateMonthlyPayment,
  formatCurrency,
  formatPercentage,
} from '@/lib/utils';

// Reverse-engineer max loan amount from max monthly payment
function calculateMaxLoan(maxMonthlyPayment: number, annualRate: number, termMonths: number): number {
  if (annualRate === 0) return maxMonthlyPayment * termMonths;
  const monthlyRate = annualRate / 100 / 12;
  return (
    (maxMonthlyPayment * (Math.pow(1 + monthlyRate, termMonths) - 1)) /
    (monthlyRate * Math.pow(1 + monthlyRate, termMonths))
  );
}

const INCOME_ALLOCATION_COLORS = ['#1a365d', '#e53e3e', '#ecc94b', '#38a169'];

export default function MaksukykyPage() {
  const [monthlyIncome, setMonthlyIncome] = useState(3500);
  const [existingPayments, setExistingPayments] = useState(200);
  const [monthlyExpenses, setMonthlyExpenses] = useState(1500);
  const [desiredRate, setDesiredRate] = useState(6.5);
  const [desiredTermYears, setDesiredTermYears] = useState(5);
  const [dtiLimit, setDtiLimit] = useState(35);

  const termMonths = desiredTermYears * 12;

  const results = useMemo(() => {
    if (monthlyIncome <= 0 || termMonths <= 0) return null;

    // Max monthly payment based on DTI rule
    const maxTotalDebt = (monthlyIncome * dtiLimit) / 100;
    const maxNewPayment = Math.max(0, maxTotalDebt - existingPayments);

    // Max loan amount
    const maxLoanAmount = calculateMaxLoan(maxNewPayment, desiredRate, termMonths);

    // Payments at different amounts
    const loanScenarios = [
      Math.round(maxLoanAmount * 0.5 / 1000) * 1000,
      Math.round(maxLoanAmount * 0.75 / 1000) * 1000,
      Math.round(maxLoanAmount / 1000) * 1000,
    ].filter((a) => a > 0);

    const scenarioPayments = loanScenarios.map((amount) => ({
      amount,
      payment: calculateMonthlyPayment(amount, desiredRate, termMonths),
      totalCost: calculateMonthlyPayment(amount, desiredRate, termMonths) * termMonths,
    }));

    // Stress test: +2% rate increase
    const stressRate = desiredRate + 2;
    const stressPayment = calculateMonthlyPayment(maxLoanAmount, stressRate, termMonths);
    const stressTotalDebt = stressPayment + existingPayments;
    const stressDTI = monthlyIncome > 0 ? (stressTotalDebt / monthlyIncome) * 100 : 0;
    const stressPasses = stressDTI <= 45; // 45% = still manageable

    // Income allocation chart
    const freeIncome = Math.max(0, monthlyIncome - monthlyExpenses - existingPayments - maxNewPayment);
    const allocationData = [
      { name: 'Uusi laina', value: Math.round(maxNewPayment), color: '#1a365d' },
      { name: 'Nykyiset lainat', value: existingPayments, color: '#e53e3e' },
      { name: 'Menot', value: monthlyExpenses, color: '#ecc94b' },
      { name: 'Vapaa', value: Math.round(freeIncome), color: '#38a169' },
    ].filter((d) => d.value > 0);

    // Bar chart data for scenarios
    const scenarioChartData = scenarioPayments.map((s) => ({
      name: formatCurrency(s.amount),
      Kuukausierä: Math.round(s.payment * 100) / 100,
    }));

    return {
      maxTotalDebt,
      maxNewPayment,
      maxLoanAmount,
      scenarioPayments,
      stressRate,
      stressPayment,
      stressDTI,
      stressPasses,
      allocationData,
      scenarioChartData,
      freeIncome,
    };
  }, [monthlyIncome, existingPayments, monthlyExpenses, desiredRate, desiredTermYears, termMonths, dtiLimit]);

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
            <span className="text-white">Maksukykylaskuri</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
              <Wallet className="w-5 h-5 text-[#ecc94b]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Maksukykylaskuri</h1>
              <p className="text-blue-100/80 text-sm mt-1">
                Kuinka paljon lainaa tulosi kattavat?
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24">
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Taloustiedot</h2>

              {/* Monthly income */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="income" className="text-sm font-medium text-gray-700">
                    Nettotulot / kk
                    <span className="relative group ml-1 inline-block">
                      <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Kuukausitulot verojen jälkeen.
                      </span>
                    </span>
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatCurrency(monthlyIncome)}
                  </span>
                </div>
                <input
                  id="income"
                  type="range"
                  min={1000}
                  max={15000}
                  step={100}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <input
                  type="number"
                  min={0}
                  value={monthlyIncome}
                  onChange={(e) => setMonthlyIncome(Math.max(0, Number(e.target.value)))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none"
                />
              </div>

              {/* Existing loan payments */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="existing" className="text-sm font-medium text-gray-700">
                    Nykyiset lainaerät / kk
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatCurrency(existingPayments)}
                  </span>
                </div>
                <input
                  id="existing"
                  type="range"
                  min={0}
                  max={3000}
                  step={50}
                  value={existingPayments}
                  onChange={(e) => setExistingPayments(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* Monthly expenses */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="expenses" className="text-sm font-medium text-gray-700">
                    Muut menot / kk
                    <span className="relative group ml-1 inline-block">
                      <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Vuokra/vastike, ruoka, vakuutukset, liikenne yms.
                      </span>
                    </span>
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatCurrency(monthlyExpenses)}
                  </span>
                </div>
                <input
                  id="expenses"
                  type="range"
                  min={500}
                  max={8000}
                  step={100}
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* Desired rate */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="desiredRate" className="text-sm font-medium text-gray-700">
                    Arvioitu korko
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatPercentage(desiredRate)}
                  </span>
                </div>
                <input
                  id="desiredRate"
                  type="range"
                  min={2}
                  max={20}
                  step={0.1}
                  value={desiredRate}
                  onChange={(e) => setDesiredRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* Term */}
              <div className="mb-5">
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="desiredTerm" className="text-sm font-medium text-gray-700">
                    Toivottu laina-aika
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {desiredTermYears} {desiredTermYears === 1 ? 'vuosi' : 'vuotta'}
                  </span>
                </div>
                <input
                  id="desiredTerm"
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={desiredTermYears}
                  onChange={(e) => setDesiredTermYears(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* DTI limit */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="dti" className="text-sm font-medium text-gray-700">
                    Velka-tulosuhde -raja
                    <span className="relative group ml-1 inline-block">
                      <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Kuinka suuri osa tuloista saa mennä lainanmaksuun. 30-40% on yleinen suositus.
                      </span>
                    </span>
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {dtiLimit} %
                  </span>
                </div>
                <input
                  id="dti"
                  type="range"
                  min={20}
                  max={50}
                  step={5}
                  value={dtiLimit}
                  onChange={(e) => setDtiLimit(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>20 % (varovainen)</span>
                  <span>50 % (rohkea)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Max loan amount */}
                <div className="bg-white rounded-xl border-2 border-[#1a365d]/20 p-6 shadow-sm text-center">
                  <p className="text-sm text-gray-500">Suositeltu enimmäislainamäärä</p>
                  <p className="text-4xl font-bold text-[#1a365d] mt-2">
                    {formatCurrency(Math.max(0, results.maxLoanAmount))}
                  </p>
                  <p className="text-sm text-gray-500 mt-2">
                    Maksimi kuukausierä: {formatCurrency(results.maxNewPayment)} (DTI {dtiLimit}%)
                  </p>
                </div>

                {/* Income allocation chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Tulojen jakautuminen kuukaudessa
                  </h3>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={[
                        {
                          name: 'Tulot',
                          ...Object.fromEntries(
                            results.allocationData.map((d) => [d.name, d.value])
                          ),
                        },
                      ]}
                      layout="vertical"
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        type="number"
                        tickFormatter={(v) => `${v} €`}
                        tick={{ fontSize: 11, fill: '#718096' }}
                      />
                      <YAxis type="category" dataKey="name" hide />
                      <Tooltip
                        formatter={(value) => formatCurrency(Number(value))}
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '13px',
                        }}
                      />
                      <Legend />
                      {results.allocationData.map((d, i) => (
                        <Bar
                          key={d.name}
                          dataKey={d.name}
                          stackId="a"
                          fill={d.color}
                          radius={
                            i === 0
                              ? [0, 0, 0, 0]
                              : i === results.allocationData.length - 1
                              ? [0, 4, 4, 0]
                              : [0, 0, 0, 0]
                          }
                        />
                      ))}
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                {/* Scenario table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Kuukausierä eri lainasummilla
                    </h3>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600">
                          <th className="px-4 py-3 text-left font-medium">Lainasumma</th>
                          <th className="px-4 py-3 text-right font-medium">Kuukausierä</th>
                          <th className="px-4 py-3 text-right font-medium">Kokonaiskustannus</th>
                          <th className="px-4 py-3 text-right font-medium">DTI</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {results.scenarioPayments.map((s) => {
                          const scenarioDTI =
                            monthlyIncome > 0
                              ? ((s.payment + existingPayments) / monthlyIncome) * 100
                              : 0;
                          return (
                            <tr key={s.amount} className="hover:bg-gray-50 transition-colors">
                              <td className="px-4 py-3 font-medium text-gray-900">
                                {formatCurrency(s.amount)}
                              </td>
                              <td className="px-4 py-3 text-right text-[#1a365d] font-medium">
                                {formatCurrency(s.payment)}
                              </td>
                              <td className="px-4 py-3 text-right text-gray-700">
                                {formatCurrency(s.totalCost)}
                              </td>
                              <td className="px-4 py-3 text-right">
                                <span
                                  className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                                    scenarioDTI <= 30
                                      ? 'bg-green-100 text-green-700'
                                      : scenarioDTI <= 40
                                      ? 'bg-yellow-100 text-yellow-700'
                                      : 'bg-red-100 text-red-700'
                                  }`}
                                >
                                  {formatPercentage(scenarioDTI, 0)}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Stress test */}
                <div
                  className={`rounded-xl border-2 p-6 shadow-sm ${
                    results.stressPasses
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <AlertTriangle
                      className={`w-6 h-6 flex-shrink-0 mt-0.5 ${
                        results.stressPasses ? 'text-green-600' : 'text-red-600'
                      }`}
                    />
                    <div>
                      <h3
                        className={`text-base font-bold ${
                          results.stressPasses ? 'text-green-800' : 'text-red-800'
                        }`}
                      >
                        Stressitesti: korko + 2 prosenttiyksikköä
                      </h3>
                      <p
                        className={`mt-1 text-sm ${
                          results.stressPasses ? 'text-green-700' : 'text-red-700'
                        }`}
                      >
                        Jos korko nousee {formatPercentage(desiredRate)} &rarr;{' '}
                        {formatPercentage(results.stressRate)}, kuukausierä olisi{' '}
                        <strong>{formatCurrency(results.stressPayment)}</strong> ja
                        velka-tulosuhde {formatPercentage(results.stressDTI, 0)}.
                      </p>
                      <p
                        className={`mt-1 text-sm font-medium ${
                          results.stressPasses ? 'text-green-600' : 'text-red-600'
                        }`}
                      >
                        {results.stressPasses
                          ? 'Stressitesti läpäisty — maksukyvyn pitäisi riittää myös koronnousussa.'
                          : 'Stressitesti ei läpäisty — harkitse pienempää lainasummaa tai pidempää laina-aikaa.'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Valmis hakemaan lainaa?
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Vertaa lainatarjouksia ja löydä edullisin korko juuri sinulle.
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
