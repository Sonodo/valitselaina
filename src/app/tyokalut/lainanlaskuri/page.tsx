'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Calculator, ChevronDown, ChevronUp, Info } from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  calculateMonthlyPayment,
  calculateTotalInterest,
  generateAmortizationSchedule,
  formatCurrency,
  formatPercentage,
} from '@/lib/utils';

const PIE_COLORS = ['#1a365d', '#ecc94b'];

export default function LainanlaskuriPage() {
  const [amount, setAmount] = useState(15000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(5);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const termMonths = termYears * 12;

  const results = useMemo(() => {
    if (amount <= 0 || rate < 0 || termMonths <= 0) return null;

    const monthlyPayment = calculateMonthlyPayment(amount, rate, termMonths);
    const totalCost = monthlyPayment * termMonths;
    const totalInterest = calculateTotalInterest(monthlyPayment, termMonths, amount);
    const interestRatio = amount > 0 ? (totalInterest / amount) * 100 : 0;
    const schedule = generateAmortizationSchedule(amount, rate, termMonths);

    return { monthlyPayment, totalCost, totalInterest, interestRatio, schedule };
  }, [amount, rate, termMonths]);

  const pieData = results
    ? [
        { name: 'Lainapääoma', value: amount },
        { name: 'Korot yhteensä', value: results.totalInterest },
      ]
    : [];

  const areaData = results
    ? results.schedule
        .filter((_, i) => i % (termMonths <= 60 ? 1 : Math.ceil(termMonths / 60)) === 0 || i === results.schedule.length - 1)
        .map((row) => ({
          month: row.month,
          balance: row.remainingBalance,
        }))
    : [];

  const displayedSchedule = results
    ? showFullSchedule
      ? results.schedule
      : results.schedule.slice(0, 12)
    : [];

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
            <span className="text-white">Lainanlaskuri</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
              <Calculator className="w-5 h-5 text-[#ecc94b]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Lainanlaskuri</h1>
              <p className="text-blue-100/80 text-sm mt-1">
                Laske lainan kuukausierä, kokonaiskulut ja korot
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
              <h2 className="text-lg font-semibold text-gray-900 mb-6">Lainan tiedot</h2>

              {/* Loan amount */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="amount" className="text-sm font-medium text-gray-700">
                    Lainasumma
                  </label>
                  <span className="text-lg font-bold text-[#1a365d]">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <input
                  id="amount"
                  type="range"
                  min={1000}
                  max={100000}
                  step={500}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 000 &euro;</span>
                  <span>100 000 &euro;</span>
                </div>
                <input
                  type="number"
                  min={1000}
                  max={1000000}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none"
                  aria-label="Lainasumma euroina"
                />
              </div>

              {/* Interest rate */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="rate" className="text-sm font-medium text-gray-700">
                    Vuosikorko
                    <span className="relative group ml-1 inline-block">
                      <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Nimellinen vuosikorko. Todellinen vuosikorko voi olla korkeampi kulujen takia.
                      </span>
                    </span>
                  </label>
                  <span className="text-lg font-bold text-[#1a365d]">
                    {formatPercentage(rate)}
                  </span>
                </div>
                <input
                  id="rate"
                  type="range"
                  min={0.5}
                  max={20}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>0,5 %</span>
                  <span>20 %</span>
                </div>
                <input
                  type="number"
                  min={0}
                  max={30}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Math.max(0, Number(e.target.value)))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none"
                  aria-label="Vuosikorko prosentteina"
                />
              </div>

              {/* Loan term */}
              <div className="mb-6">
                <div className="flex items-baseline justify-between mb-2">
                  <label htmlFor="term" className="text-sm font-medium text-gray-700">
                    Laina-aika
                  </label>
                  <span className="text-lg font-bold text-[#1a365d]">
                    {termYears} {termYears === 1 ? 'vuosi' : 'vuotta'}
                  </span>
                </div>
                <input
                  id="term"
                  type="range"
                  min={1}
                  max={30}
                  step={1}
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>1 vuosi</span>
                  <span>30 vuotta</span>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 leading-relaxed">
                Laskelma on suuntaa-antava ja perustuu annuiteettilainaan. Todellinen kuukausierä
                voi poiketa lainanantajan ehtojen mukaan.
              </p>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Key metrics */}
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Kuukausierä</p>
                    <p className="text-3xl font-bold text-[#1a365d] mt-1">
                      {formatCurrency(results.monthlyPayment)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Kokonaiskustannus</p>
                    <p className="text-3xl font-bold text-gray-900 mt-1">
                      {formatCurrency(results.totalCost)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Korot yhteensä</p>
                    <p className="text-2xl font-bold text-[#b7791f] mt-1">
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                      Koron osuus pääomasta
                      <span className="relative group ml-1 inline-block">
                        <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                        <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                          Kuinka paljon korot ovat suhteessa lainapääomaan. Mitä pienempi, sitä edullisempi laina.
                        </span>
                      </span>
                    </p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatPercentage(results.interestRatio)}
                    </p>
                  </div>
                </div>

                {/* Charts row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Pie chart */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Pääoma vs. korot
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <PieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={3}
                          dataKey="value"
                          label={({ name, percent }) =>
                            `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                          }
                          labelLine={false}
                        >
                          {pieData.map((_, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={PIE_COLORS[index]}
                              stroke="none"
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => formatCurrency(Number(value))}
                          contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            fontSize: '13px',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="flex justify-center gap-6 mt-2">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#1a365d]" />
                        <span className="text-xs text-gray-600">Pääoma</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ecc94b]" />
                        <span className="text-xs text-gray-600">Korot</span>
                      </div>
                    </div>
                  </div>

                  {/* Area chart — remaining balance */}
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Jäljellä oleva pääoma
                    </h3>
                    <ResponsiveContainer width="100%" height={250}>
                      <AreaChart data={areaData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                          dataKey="month"
                          tickFormatter={(m) =>
                            m % 12 === 0 ? `${m / 12} v` : ''
                          }
                          tick={{ fontSize: 11, fill: '#718096' }}
                        />
                        <YAxis
                          tickFormatter={(v) =>
                            v >= 1000 ? `${(v / 1000).toFixed(0)}k` : `${v}`
                          }
                          tick={{ fontSize: 11, fill: '#718096' }}
                          width={50}
                        />
                        <Tooltip
                          formatter={(value) => [
                            formatCurrency(Number(value)),
                            'Jäljellä',
                          ]}
                          labelFormatter={(label) =>
                            `Kuukausi ${label}`
                          }
                          contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            fontSize: '13px',
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="balance"
                          stroke="#1a365d"
                          fill="#1a365d"
                          fillOpacity={0.1}
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Amortization schedule table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Lyhennyssuunnitelma
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {showFullSchedule
                        ? `Kaikki ${results.schedule.length} kuukautta`
                        : `Ensimmäiset 12 kuukautta (yhteensä ${results.schedule.length})`}
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600">
                          <th className="px-4 py-3 text-left font-medium">Kk</th>
                          <th className="px-4 py-3 text-right font-medium">Erä</th>
                          <th className="px-4 py-3 text-right font-medium">Lyhennys</th>
                          <th className="px-4 py-3 text-right font-medium">Korko</th>
                          <th className="px-4 py-3 text-right font-medium">Jäljellä</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {displayedSchedule.map((row) => (
                          <tr key={row.month} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2.5 text-gray-700">{row.month}</td>
                            <td className="px-4 py-2.5 text-right text-gray-900 font-medium">
                              {formatCurrency(row.payment)}
                            </td>
                            <td className="px-4 py-2.5 text-right text-[#1a365d]">
                              {formatCurrency(row.principal)}
                            </td>
                            <td className="px-4 py-2.5 text-right text-[#b7791f]">
                              {formatCurrency(row.interest)}
                            </td>
                            <td className="px-4 py-2.5 text-right text-gray-700">
                              {formatCurrency(row.remainingBalance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {results.schedule.length > 12 && (
                    <div className="p-4 border-t border-gray-100">
                      <button
                        onClick={() => setShowFullSchedule(!showFullSchedule)}
                        className="flex items-center gap-1.5 text-sm font-medium text-[#1a365d] hover:text-[#2a4a7f] transition-colors mx-auto"
                      >
                        {showFullSchedule ? (
                          <>
                            Näytä vähemmän <ChevronUp className="w-4 h-4" />
                          </>
                        ) : (
                          <>
                            Näytä kaikki {results.schedule.length} kuukautta{' '}
                            <ChevronDown className="w-4 h-4" />
                          </>
                        )}
                      </button>
                    </div>
                  )}
                </div>

                {/* CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Löydä edullisin laina
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Vertaa oikeita lainatarjouksia ja löydä edullisin korko sinulle.
                  </p>
                  <Link
                    href={`/vertailu?summa=${amount}&aika=${termMonths}`}
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
