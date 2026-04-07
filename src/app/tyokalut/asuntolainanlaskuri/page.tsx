'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Home, Info, ChevronDown, ChevronUp } from 'lucide-react';
import {
  LineChart,
  Line,
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
import { EURIBOR_12M, EURIBOR_6M, EURIBOR_3M } from '@/lib/constants';

const EURIBOR_OPTIONS = [
  { label: 'Euribor 12 kk', value: EURIBOR_12M },
  { label: 'Euribor 6 kk', value: EURIBOR_6M },
  { label: 'Euribor 3 kk', value: EURIBOR_3M },
];

const TRANSFER_TAX_RATE = 0.015; // 1.5% for apartments (asunto-osakkeet, since 2024)
const TRANSFER_TAX_RATE_HOUSE = 0.03; // 3% for houses/real estate (kiinteistöt, since 2024)

export default function AsuntolainanlaskuriPage() {
  const [propertyPrice, setPropertyPrice] = useState(250000);
  const [downPaymentPercent, setDownPaymentPercent] = useState(15);
  const [termYears, setTermYears] = useState(25);
  const [margin, setMargin] = useState(0.6);
  const [euriborIndex, setEuriborIndex] = useState(0);
  const [isFixed, setIsFixed] = useState(false);
  const [fixedRate, setFixedRate] = useState(3.5);
  const [isFirstTimeBuyer, setIsFirstTimeBuyer] = useState(false);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  const referenceRate = EURIBOR_OPTIONS[euriborIndex].value;
  const totalRate = isFixed ? fixedRate : referenceRate + margin;
  const downPayment = (propertyPrice * downPaymentPercent) / 100;
  const loanAmount = propertyPrice - downPayment;
  const termMonths = termYears * 12;
  const transferTax = isFirstTimeBuyer ? 0 : propertyPrice * TRANSFER_TAX_RATE;

  const results = useMemo(() => {
    if (loanAmount <= 0 || termMonths <= 0) return null;

    const monthlyPayment = calculateMonthlyPayment(loanAmount, totalRate, termMonths);
    const totalCost = monthlyPayment * termMonths;
    const totalInterest = calculateTotalInterest(monthlyPayment, termMonths, loanAmount);
    const schedule = generateAmortizationSchedule(loanAmount, totalRate, termMonths);

    // Euribor scenario analysis: +1%, +2%, +3%
    const scenarios = [0, 1, 2, 3].map((delta) => {
      const scenarioRate = totalRate + delta;
      const scenarioPayment = calculateMonthlyPayment(loanAmount, scenarioRate, termMonths);
      const scenarioTotal = scenarioPayment * termMonths;
      return {
        delta,
        rate: scenarioRate,
        payment: scenarioPayment,
        totalCost: scenarioTotal,
        totalInterest: scenarioTotal - loanAmount,
      };
    });

    // Line chart data: monthly payment at different Euribor levels
    const scenarioChartData: Array<Record<string, number>> = [];
    const baseRate = isFixed ? fixedRate : margin; // base without Euribor for variable
    for (let euribor = 0; euribor <= 6; euribor += 0.5) {
      const point: Record<string, number> = { euribor };
      if (isFixed) {
        point['Kiinteä korko'] = Math.round(
          calculateMonthlyPayment(loanAmount, fixedRate, termMonths) * 100
        ) / 100;
      } else {
        point['Kuukausierä'] = Math.round(
          calculateMonthlyPayment(loanAmount, margin + euribor, termMonths) * 100
        ) / 100;
      }
      scenarioChartData.push(point);
    }

    return {
      monthlyPayment,
      totalCost,
      totalInterest,
      schedule,
      scenarios,
      scenarioChartData,
    };
  }, [loanAmount, totalRate, termMonths, margin, fixedRate, isFixed]);

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
            <span className="text-white">Asuntolainanlaskuri</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
              <Home className="w-5 h-5 text-[#ecc94b]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Asuntolainanlaskuri
              </h1>
              <p className="text-blue-100/80 text-sm mt-1">
                Laske asuntolainan kuukausierä ja stressitestaa eri korkoskenaariot
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm sticky top-24 space-y-5">
              <h2 className="text-lg font-semibold text-gray-900">Asuntolainan tiedot</h2>

              {/* Property price */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="price" className="text-sm font-medium text-gray-700">
                    Asunnon hinta
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatCurrency(propertyPrice)}
                  </span>
                </div>
                <input
                  id="price"
                  type="range"
                  min={50000}
                  max={800000}
                  step={5000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <input
                  type="number"
                  min={0}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Math.max(0, Number(e.target.value)))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none"
                />
              </div>

              {/* Down payment */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="downpayment" className="text-sm font-medium text-gray-700">
                    Omarahoitus
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {downPaymentPercent} % ({formatCurrency(downPayment)})
                  </span>
                </div>
                <input
                  id="downpayment"
                  type="range"
                  min={5}
                  max={50}
                  step={1}
                  value={downPaymentPercent}
                  onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>5 %</span>
                  <span>50 %</span>
                </div>
              </div>

              {/* Loan term */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="mortgageTerm" className="text-sm font-medium text-gray-700">
                    Laina-aika
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {termYears} vuotta
                  </span>
                </div>
                <input
                  id="mortgageTerm"
                  type="range"
                  min={5}
                  max={35}
                  step={1}
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* Rate type toggle */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Korkotyyppi</label>
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setIsFixed(false)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      !isFixed
                        ? 'bg-[#1a365d] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Vaihtuva
                  </button>
                  <button
                    onClick={() => setIsFixed(true)}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      isFixed
                        ? 'bg-[#1a365d] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Kiinteä
                  </button>
                </div>
              </div>

              {isFixed ? (
                <div>
                  <div className="flex items-baseline justify-between mb-1.5">
                    <label className="text-sm font-medium text-gray-700">
                      Kiinteä korko
                    </label>
                    <span className="text-sm font-bold text-[#1a365d]">
                      {formatPercentage(fixedRate)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={8}
                    step={0.05}
                    value={fixedRate}
                    onChange={(e) => setFixedRate(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                  />
                </div>
              ) : (
                <>
                  {/* Euribor reference rate */}
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1.5">
                      Viitekorko
                    </label>
                    <select
                      value={euriborIndex}
                      onChange={(e) => setEuriborIndex(Number(e.target.value))}
                      className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none"
                    >
                      {EURIBOR_OPTIONS.map((opt, i) => (
                        <option key={i} value={i}>
                          {opt.label} ({formatPercentage(opt.value)})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Margin */}
                  <div>
                    <div className="flex items-baseline justify-between mb-1.5">
                      <label className="text-sm font-medium text-gray-700">
                        Marginaali
                        <span className="relative group ml-1 inline-block">
                          <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                          <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                            Pankin perimä lisäkorko viitekoron päälle. Tyypillisesti 0,3–1,2 %.
                          </span>
                        </span>
                      </label>
                      <span className="text-sm font-bold text-[#1a365d]">
                        {formatPercentage(margin)}
                      </span>
                    </div>
                    <input
                      type="range"
                      min={0.2}
                      max={2}
                      step={0.05}
                      value={margin}
                      onChange={(e) => setMargin(Number(e.target.value))}
                      className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                    />
                  </div>
                </>
              )}

              {/* First-time buyer */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  id="firsttime"
                  type="checkbox"
                  checked={isFirstTimeBuyer}
                  onChange={(e) => setIsFirstTimeBuyer(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-[#1a365d] focus:ring-[#1a365d]"
                />
                <label htmlFor="firsttime" className="text-sm text-gray-700">
                  Ensiasunnon ostaja
                  <span className="relative group ml-1 inline-block">
                    <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-52 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Ensiasunnon ostaja on vapautettu varainsiirtoverosta (1,5 % osakeasunnoista).
                    </span>
                  </span>
                </label>
              </div>

              <div className="border-t border-gray-100 pt-4 mt-2">
                <div className="flex items-baseline justify-between text-sm">
                  <span className="text-gray-600">Kokonaiskorko</span>
                  <span className="font-bold text-[#1a365d]">{formatPercentage(totalRate)}</span>
                </div>
                <div className="flex items-baseline justify-between text-sm mt-1">
                  <span className="text-gray-600">Lainasumma</span>
                  <span className="font-bold text-[#1a365d]">{formatCurrency(loanAmount)}</span>
                </div>
                <div className="flex items-baseline justify-between text-sm mt-1">
                  <span className="text-gray-600">Varainsiirtovero</span>
                  <span className={`font-bold ${isFirstTimeBuyer ? 'text-green-600' : 'text-gray-900'}`}>
                    {isFirstTimeBuyer ? '0 € (ensiasunto)' : formatCurrency(transferTax)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Key metrics */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Kuukausierä</p>
                    <p className="text-3xl font-bold text-[#1a365d] mt-1">
                      {formatCurrency(results.monthlyPayment)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Kokonaiskustannus</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(results.totalCost + transferTax)}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">sis. varainsiirtovero</p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Korot yhteensä</p>
                    <p className="text-2xl font-bold text-[#b7791f] mt-1">
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>
                </div>

                {/* Euribor scenario analysis */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100">
                    <h3 className="text-sm font-semibold text-gray-900">
                      Korkoskenaarioanalyysi
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {isFixed
                        ? 'Kiinteällä korolla kuukausierä ei muutu.'
                        : 'Mitä tapahtuu jos viitekorko nousee?'}
                    </p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50 text-gray-600">
                          <th className="px-4 py-3 text-left font-medium">Skenaario</th>
                          <th className="px-4 py-3 text-right font-medium">Korko</th>
                          <th className="px-4 py-3 text-right font-medium">Kuukausierä</th>
                          <th className="px-4 py-3 text-right font-medium">Korot yhteensä</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {results.scenarios.map((s) => (
                          <tr
                            key={s.delta}
                            className={`hover:bg-gray-50 transition-colors ${
                              s.delta === 0 ? 'bg-blue-50/50' : ''
                            }`}
                          >
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {s.delta === 0
                                ? 'Nykyinen'
                                : `+${s.delta} prosenttiyksikköä`}
                            </td>
                            <td className="px-4 py-3 text-right">
                              {formatPercentage(s.rate)}
                            </td>
                            <td className="px-4 py-3 text-right font-medium text-[#1a365d]">
                              {formatCurrency(s.payment)}
                            </td>
                            <td className="px-4 py-3 text-right text-[#b7791f]">
                              {formatCurrency(s.totalInterest)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Euribor scenario line chart */}
                {!isFixed && (
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <h3 className="text-sm font-semibold text-gray-900 mb-4">
                      Kuukausierä eri Euribor-tasoilla
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                      <LineChart data={results.scenarioChartData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis
                          dataKey="euribor"
                          tickFormatter={(v) => `${v} %`}
                          tick={{ fontSize: 11, fill: '#718096' }}
                          label={{
                            value: 'Euribor %',
                            position: 'insideBottomRight',
                            offset: -5,
                            style: { fontSize: 11, fill: '#718096' },
                          }}
                        />
                        <YAxis
                          tickFormatter={(v) => `${v} €`}
                          tick={{ fontSize: 11, fill: '#718096' }}
                          width={65}
                        />
                        <Tooltip
                          formatter={(value) => [
                            formatCurrency(Number(value)),
                            'Kuukausierä',
                          ]}
                          labelFormatter={(label) =>
                            `Euribor ${label} %`
                          }
                          contentStyle={{
                            borderRadius: '8px',
                            border: '1px solid #e2e8f0',
                            fontSize: '13px',
                          }}
                        />
                        <Line
                          type="monotone"
                          dataKey="Kuukausierä"
                          stroke="#1a365d"
                          strokeWidth={2}
                          dot={{ r: 3, fill: '#1a365d' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Amortization schedule */}
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
                    Vertaa asuntolainoja
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Löydä edullisin asuntolainan marginaali vertailemalla pankkien tarjouksia.
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
