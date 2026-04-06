'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Eye, Users } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

// Predefined amount steps for the slider
const AMOUNT_STEPS = [
  1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 40000,
  50000, 60000,
];

const TERM_OPTIONS = [
  { value: 12, label: '1 vuosi' },
  { value: 24, label: '2 vuotta' },
  { value: 36, label: '3 vuotta' },
  { value: 48, label: '4 vuotta' },
  { value: 60, label: '5 vuotta' },
  { value: 72, label: '6 vuotta' },
  { value: 84, label: '7 vuotta' },
  { value: 96, label: '8 vuotta' },
  { value: 120, label: '10 vuotta' },
];

const TRUST_INDICATORS = [
  { icon: Users, text: '28+ lainanantajaa' },
  { icon: ShieldCheck, text: 'Puolueeton' },
  { icon: Eye, text: 'Kaikki lainat näkyvissä' },
];

export default function HeroSection() {
  const [sliderIndex, setSliderIndex] = useState(5); // defaults to 10,000
  const [termMonths, setTermMonths] = useState(60);

  const amount = AMOUNT_STEPS[sliderIndex];

  return (
    <section className="relative bg-[#1a365d] overflow-hidden">
      {/* Subtle background pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column — headline and trust indicators */}
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Vertaa lainoja
              <br />
              <span className="text-[#ecc94b]">rehellisesti</span>
            </h1>

            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-xl">
              Suomen ainoa lainojen vertailupalvelu, joka näyttää{' '}
              <strong className="text-white font-semibold">kaikki lainat</strong>{' '}
              — myös ne, joista emme saa komissiota. Vertaa todellisia vuosikorkoja
              ilman piilotettua agendaa.
            </p>

            {/* Trust indicators */}
            <div className="mt-8 flex flex-wrap gap-4">
              {TRUST_INDICATORS.map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2"
                >
                  <item.icon className="h-4 w-4 text-[#ecc94b]" />
                  <span className="text-sm font-medium text-blue-100">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — comparison mini-form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">
              Aloita vertailu
            </h2>

            {/* Amount slider */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <label
                  htmlFor="loan-amount"
                  className="text-sm font-medium text-gray-700"
                >
                  Lainasumma
                </label>
                <span className="text-2xl font-bold text-[#1a365d]">
                  {formatNumber(amount)} &euro;
                </span>
              </div>
              <input
                id="loan-amount"
                type="range"
                min={0}
                max={AMOUNT_STEPS.length - 1}
                value={sliderIndex}
                onChange={(e) => setSliderIndex(Number(e.target.value))}
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-gray-200 accent-[#1a365d]"
                aria-valuenow={amount}
                aria-valuemin={1000}
                aria-valuemax={60000}
                aria-label={`Lainasumma: ${formatNumber(amount)} euroa`}
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>1 000 &euro;</span>
                <span>60 000 &euro;</span>
              </div>
            </div>

            {/* Term selector */}
            <div className="mb-8">
              <label
                htmlFor="loan-term"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Laina-aika
              </label>
              <select
                id="loan-term"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none transition-colors"
              >
                {TERM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA button */}
            <Link
              href={`/vertailu?summa=${amount}&aika=${termMonths}`}
              className="flex items-center justify-center w-full rounded-lg bg-[#1a365d] px-6 py-4 text-base font-semibold text-white shadow-lg hover:bg-[#2a4a7f] active:bg-[#0f2440] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
            >
              Vertaa lainoja
            </Link>

            <p className="mt-3 text-center text-xs text-gray-500">
              Ilmainen &middot; Ei vaikuta luottotietoihin &middot; Ei
              sitoutumista
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
