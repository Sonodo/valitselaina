'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ShieldCheck, Users, Banknote, ArrowRight, HelpCircle } from 'lucide-react';
import { formatNumber } from '@/lib/utils';
import WaveDivider from '@/components/WaveDivider';

const AMOUNT_STEPS = [
  1000, 2000, 3000, 5000, 7500, 10000, 15000, 20000, 25000, 30000, 40000, 50000, 60000,
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

const TRUST_ITEMS = [
  { icon: Users, label: '28+ lainanantajaa' },
  { icon: ShieldCheck, label: 'Ilmainen vertailu' },
  { icon: Banknote, label: 'Läpinäkyvä' },
];

export default function HeroSection() {
  const [sliderIndex, setSliderIndex] = useState(5);
  const [termMonths, setTermMonths] = useState(60);

  const amount = AMOUNT_STEPS[sliderIndex];

  return (
    <section className="relative bg-navy overflow-hidden">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '60px 60px',
        }}
        aria-hidden="true"
      />

      {/* Glow orbs */}
      <div
        className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-accent-400/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-40 -right-40 w-[500px] h-[500px] rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left column */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-400" />
              </span>
              <span className="text-sm font-medium text-slate-300">Lainavertailu</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight tracking-tight">
              <span className="text-white">Vertaile lainoja</span>
              <br />
              <span className="bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">
                loyda paras korko.
              </span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-300 leading-relaxed max-w-xl">
              Kilpailuta kulutusluotot, asuntolainat ja yrityslainat. Kattava
              vertailu yli 20 lainanantajan tarjonnasta.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/vertailu"
                className="btn btn-primary text-base px-8 py-4 shadow-lg shadow-accent/25"
              >
                Vertaa lainoja
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="#miten-se-toimii"
                className="btn btn-outline border-white/20 text-white hover:bg-white/10 hover:text-white text-base px-8 py-4"
              >
                <HelpCircle className="h-5 w-5" />
                Miten se toimii?
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-4">
              {TRUST_ITEMS.map((item) => (
                <div key={item.label} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-accent-400" />
                  <span className="text-sm font-medium text-slate-300">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — mini form */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 ring-1 ring-white/10">
            <h2 className="text-lg font-semibold text-slate-900 mb-6">
              Aloita vertailu
            </h2>

            {/* Amount slider */}
            <div className="mb-6">
              <div className="flex items-baseline justify-between mb-2">
                <label htmlFor="loan-amount" className="text-sm font-medium text-slate-700">
                  Lainasumma
                </label>
                <span className="text-2xl font-bold text-accent-700">
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
                className="w-full h-2 rounded-full appearance-none cursor-pointer bg-slate-200 accent-accent"
                aria-valuenow={amount}
                aria-valuemin={1000}
                aria-valuemax={60000}
                aria-label={`Lainasumma: ${formatNumber(amount)} euroa`}
              />
              <div className="flex justify-between text-xs text-slate-400 mt-1">
                <span>1 000 &euro;</span>
                <span>60 000 &euro;</span>
              </div>
            </div>

            {/* Term selector */}
            <div className="mb-8">
              <label htmlFor="loan-term" className="block text-sm font-medium text-slate-700 mb-2">
                Laina-aika
              </label>
              <select
                id="loan-term"
                value={termMonths}
                onChange={(e) => setTermMonths(Number(e.target.value))}
                className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none transition-colors"
              >
                {TERM_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>

            {/* CTA */}
            <Link
              href={`/vertailu?summa=${amount}&aika=${termMonths}`}
              className="flex items-center justify-center w-full rounded-xl bg-accent px-6 py-4 text-base font-semibold text-white shadow-lg shadow-accent/25 hover:bg-accent-600 hover:shadow-xl active:bg-accent-700 transition-all min-h-[44px]"
            >
              Vertaa lainoja
              <ArrowRight className="h-5 w-5 ml-2" />
            </Link>

            <p className="mt-3 text-center text-xs text-slate-500">
              Ilmainen &middot; Ei vaikuta luottotietoihin &middot; Ei sitoutumista
            </p>
          </div>
        </div>
      </div>

      <WaveDivider color="#F8FAFC" />
    </section>
  );
}
