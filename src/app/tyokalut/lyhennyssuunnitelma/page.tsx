'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { FileSpreadsheet, Download, Info } from 'lucide-react';
import {
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
  generateAmortizationSchedule,
  formatCurrency,
  formatPercentage,
} from '@/lib/utils';
import { AmortizationRow } from '@/types';

type RepaymentType = 'annuity' | 'equal_principal';

// Generate equal principal (tasalyhennys) schedule
function generateEqualPrincipalSchedule(
  principal: number,
  annualRate: number,
  termMonths: number
): AmortizationRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const principalPayment = principal / termMonths;
  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * monthlyRate;
    const payment = principalPayment + interest;
    balance = Math.max(0, balance - principalPayment);

    schedule.push({
      month,
      payment: Math.round(payment * 100) / 100,
      principal: Math.round(principalPayment * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      remainingBalance: Math.round(balance * 100) / 100,
    });
  }

  return schedule;
}

export default function LyhennyssuunnitelmaPage() {
  const [amount, setAmount] = useState(20000);
  const [rate, setRate] = useState(6.5);
  const [termYears, setTermYears] = useState(5);
  const [repaymentType, setRepaymentType] = useState<RepaymentType>('annuity');

  const termMonths = termYears * 12;

  const results = useMemo(() => {
    if (amount <= 0 || rate < 0 || termMonths <= 0) return null;

    const schedule =
      repaymentType === 'annuity'
        ? generateAmortizationSchedule(amount, rate, termMonths)
        : generateEqualPrincipalSchedule(amount, rate, termMonths);

    const totalPayments = schedule.reduce((sum, row) => sum + row.payment, 0);
    const totalInterest = schedule.reduce((sum, row) => sum + row.interest, 0);
    const totalPrincipal = schedule.reduce((sum, row) => sum + row.principal, 0);

    // Chart data: payment composition over time (sample points)
    const step = Math.max(1, Math.floor(termMonths / 60));
    const chartData = schedule
      .filter((_, i) => i % step === 0 || i === schedule.length - 1)
      .map((row) => ({
        month: row.month,
        Lyhennys: row.principal,
        Korko: row.interest,
      }));

    return {
      schedule,
      totalPayments,
      totalInterest,
      totalPrincipal,
      chartData,
    };
  }, [amount, rate, termMonths, repaymentType]);

  const exportCSV = useCallback(() => {
    if (!results) return;

    const headers = ['Kuukausi', 'Erä (€)', 'Lyhennys (€)', 'Korko (€)', 'Jäljellä (€)'];
    const rows = results.schedule.map((row) =>
      [
        row.month,
        row.payment.toFixed(2).replace('.', ','),
        row.principal.toFixed(2).replace('.', ','),
        row.interest.toFixed(2).replace('.', ','),
        row.remainingBalance.toFixed(2).replace('.', ','),
      ].join(';')
    );

    const csvContent = [headers.join(';'), ...rows].join('\n');
    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `lyhennyssuunnitelma_${amount}e_${rate}p_${termYears}v.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }, [results, amount, rate, termYears]);

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
            <span className="text-white">Lyhennyssuunnitelma</span>
          </nav>
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-white/10">
              <FileSpreadsheet className="w-5 h-5 text-[#ecc94b]" />
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                Lyhennyssuunnitelma
              </h1>
              <p className="text-blue-100/80 text-sm mt-1">
                Yksityiskohtainen lyhennyssuunnitelma annuiteetilla tai tasalyhennyksellä
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
              <h2 className="text-lg font-semibold text-gray-900">Lainan tiedot</h2>

              {/* Amount */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="amountInput" className="text-sm font-medium text-gray-700">
                    Lainasumma
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatCurrency(amount)}
                  </span>
                </div>
                <input
                  id="amountInput"
                  type="range"
                  min={1000}
                  max={500000}
                  step={1000}
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
                <input
                  type="number"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(Math.max(0, Number(e.target.value)))}
                  className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none"
                />
              </div>

              {/* Rate */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="rateInput" className="text-sm font-medium text-gray-700">
                    Vuosikorko
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {formatPercentage(rate)}
                  </span>
                </div>
                <input
                  id="rateInput"
                  type="range"
                  min={0.5}
                  max={20}
                  step={0.1}
                  value={rate}
                  onChange={(e) => setRate(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* Term */}
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <label htmlFor="termInput" className="text-sm font-medium text-gray-700">
                    Laina-aika
                  </label>
                  <span className="text-sm font-bold text-[#1a365d]">
                    {termYears} {termYears === 1 ? 'vuosi' : 'vuotta'}
                  </span>
                </div>
                <input
                  id="termInput"
                  type="range"
                  min={1}
                  max={35}
                  step={1}
                  value={termYears}
                  onChange={(e) => setTermYears(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                />
              </div>

              {/* Repayment type */}
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">
                  Lyhennystapa
                  <span className="relative group ml-1 inline-block">
                    <Info className="w-3.5 h-3.5 text-gray-400 inline" />
                    <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-56 rounded-lg bg-gray-900 px-3 py-2 text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                      Annuiteetti: sama kuukausierä koko laina-ajan. Tasalyhennys: sama lyhennysosa, pienenevä kuukausierä.
                    </span>
                  </span>
                </label>
                <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                  <button
                    onClick={() => setRepaymentType('annuity')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      repaymentType === 'annuity'
                        ? 'bg-[#1a365d] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Annuiteetti
                  </button>
                  <button
                    onClick={() => setRepaymentType('equal_principal')}
                    className={`flex-1 py-2 text-sm font-medium transition-colors ${
                      repaymentType === 'equal_principal'
                        ? 'bg-[#1a365d] text-white'
                        : 'bg-white text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    Tasalyhennys
                  </button>
                </div>
              </div>

              {/* Export button */}
              {results && (
                <button
                  onClick={exportCSV}
                  className="flex items-center justify-center gap-2 w-full rounded-lg border-2 border-[#1a365d] px-4 py-3 text-sm font-semibold text-[#1a365d] hover:bg-[#1a365d] hover:text-white transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Vie CSV-tiedostoksi
                </button>
              )}
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-2 space-y-6">
            {results && (
              <>
                {/* Summary */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">
                      {repaymentType === 'annuity' ? 'Kuukausierä' : 'Ensimmäinen erä'}
                    </p>
                    <p className="text-2xl font-bold text-[#1a365d] mt-1">
                      {formatCurrency(results.schedule[0].payment)}
                    </p>
                    {repaymentType === 'equal_principal' && (
                      <p className="text-xs text-gray-500 mt-1">
                        Viimeinen: {formatCurrency(results.schedule[results.schedule.length - 1].payment)}
                      </p>
                    )}
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Korot yhteensä</p>
                    <p className="text-2xl font-bold text-[#b7791f] mt-1">
                      {formatCurrency(results.totalInterest)}
                    </p>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                    <p className="text-sm text-gray-500">Takaisinmaksu yhteensä</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">
                      {formatCurrency(results.totalPayments)}
                    </p>
                  </div>
                </div>

                {/* Payment composition chart */}
                <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="text-sm font-semibold text-gray-900 mb-4">
                    Maksujen rakenne ajan myötä
                  </h3>
                  <p className="text-xs text-gray-500 mb-4">
                    {repaymentType === 'annuity'
                      ? 'Annuiteetissa lyhennyksen osuus kasvaa ja koron osuus pienenee laina-ajan kuluessa.'
                      : 'Tasalyhennyksessä lyhennysosa pysyy vakiona ja koron osuus pienenee.'}
                  </p>
                  <ResponsiveContainer width="100%" height={300}>
                    <AreaChart data={results.chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis
                        dataKey="month"
                        tickFormatter={(m) =>
                          m % 12 === 0 ? `${m / 12} v` : ''
                        }
                        tick={{ fontSize: 11, fill: '#718096' }}
                      />
                      <YAxis
                        tickFormatter={(v) => `${v.toFixed(0)} €`}
                        tick={{ fontSize: 11, fill: '#718096' }}
                        width={60}
                      />
                      <Tooltip
                        formatter={(value, name) => [
                          formatCurrency(Number(value)),
                          String(name),
                        ]}
                        labelFormatter={(label) => `Kuukausi ${label}`}
                        contentStyle={{
                          borderRadius: '8px',
                          border: '1px solid #e2e8f0',
                          fontSize: '13px',
                        }}
                      />
                      <Legend />
                      <Area
                        type="monotone"
                        dataKey="Lyhennys"
                        stackId="1"
                        stroke="#1a365d"
                        fill="#1a365d"
                        fillOpacity={0.7}
                      />
                      <Area
                        type="monotone"
                        dataKey="Korko"
                        stackId="1"
                        stroke="#ecc94b"
                        fill="#ecc94b"
                        fillOpacity={0.7}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Full amortization table */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                  <div className="p-5 border-b border-gray-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Täydellinen lyhennyssuunnitelma
                      </h3>
                      <p className="text-xs text-gray-500 mt-1">
                        {results.schedule.length} kuukautta &middot;{' '}
                        {repaymentType === 'annuity' ? 'Annuiteetti' : 'Tasalyhennys'}
                      </p>
                    </div>
                    <button
                      onClick={exportCSV}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-[#1a365d] hover:text-[#2a4a7f] transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" /> CSV
                    </button>
                  </div>
                  <div className="overflow-x-auto max-h-[600px] overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="sticky top-0">
                        <tr className="bg-gray-50 text-gray-600">
                          <th className="px-4 py-3 text-left font-medium">Kk</th>
                          <th className="px-4 py-3 text-right font-medium">Erä</th>
                          <th className="px-4 py-3 text-right font-medium">Lyhennys</th>
                          <th className="px-4 py-3 text-right font-medium">Korko</th>
                          <th className="px-4 py-3 text-right font-medium">Jäljellä</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {results.schedule.map((row) => (
                          <tr key={row.month} className="hover:bg-gray-50 transition-colors">
                            <td className="px-4 py-2 text-gray-700">{row.month}</td>
                            <td className="px-4 py-2 text-right text-gray-900 font-medium">
                              {formatCurrency(row.payment)}
                            </td>
                            <td className="px-4 py-2 text-right text-[#1a365d]">
                              {formatCurrency(row.principal)}
                            </td>
                            <td className="px-4 py-2 text-right text-[#b7791f]">
                              {formatCurrency(row.interest)}
                            </td>
                            <td className="px-4 py-2 text-right text-gray-700">
                              {formatCurrency(row.remainingBalance)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50 font-semibold">
                          <td className="px-4 py-3 text-gray-900">Yhteensä</td>
                          <td className="px-4 py-3 text-right text-gray-900">
                            {formatCurrency(results.totalPayments)}
                          </td>
                          <td className="px-4 py-3 text-right text-[#1a365d]">
                            {formatCurrency(results.totalPrincipal)}
                          </td>
                          <td className="px-4 py-3 text-right text-[#b7791f]">
                            {formatCurrency(results.totalInterest)}
                          </td>
                          <td className="px-4 py-3 text-right text-gray-700">
                            {formatCurrency(0)}
                          </td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </div>

                {/* CTA */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm text-center">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Löydä edullisin korko
                  </h3>
                  <p className="mt-2 text-sm text-gray-600">
                    Vertaa lainatarjouksia ja minimoi kokonaiskulusi.
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
