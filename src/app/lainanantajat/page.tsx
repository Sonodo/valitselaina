'use client';

import { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, ArrowUpDown, Building2, Cpu, Users, LayoutGrid } from 'lucide-react';
import { providers } from '@/data/providers';
import ProviderCard from '@/components/providers/ProviderCard';

// Filter tab definitions
const filterTabs = [
  { key: 'all', label: 'Kaikki', icon: LayoutGrid },
  { key: 'bank', label: 'Pankit', icon: Building2 },
  { key: 'fintech', label: 'Fintech', icon: Cpu },
  { key: 'p2p', label: 'P2P', icon: Users },
] as const;

type FilterKey = (typeof filterTabs)[number]['key'];

// Sort options
const sortOptions = [
  { key: 'name', label: 'Nimi' },
  { key: 'rate', label: 'Edullisin korko' },
] as const;

type SortKey = (typeof sortOptions)[number]['key'];

export default function LainanantajatPage() {
  const [typeFilter, setTypeFilter] = useState<FilterKey>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortKey>('rate');

  // Filter and sort providers
  const filteredProviders = useMemo(() => {
    let result = [...providers];

    // Type filter
    if (typeFilter !== 'all') {
      result = result.filter((p) => p.type === typeFilter);
    }

    // Search filter
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.shortName?.toLowerCase().includes(q) ?? false) ||
          p.slug.includes(q),
      );
    }

    // Sort
    switch (sortBy) {
      case 'name':
        result.sort((a, b) =>
          (a.shortName || a.name).localeCompare(b.shortName || b.name, 'fi'),
        );
        break;
      case 'rate': {
        const getLowestRate = (p: (typeof providers)[number]) =>
          p.products.reduce(
            (min, prod) => Math.min(min, prod.effectiveRate.min),
            Infinity,
          );
        result.sort((a, b) => getLowestRate(a) - getLowestRate(b));
        break;
      }
    }

    return result;
  }, [typeFilter, searchQuery, sortBy]);

  // Count per type for tab badges
  const counts = useMemo(() => {
    const base = searchQuery.trim()
      ? providers.filter((p) => {
          const q = searchQuery.toLowerCase();
          return (
            p.name.toLowerCase().includes(q) ||
            (p.shortName?.toLowerCase().includes(q) ?? false) ||
            p.slug.includes(q)
          );
        })
      : providers;
    return {
      all: base.length,
      bank: base.filter((p) => p.type === 'bank').length,
      fintech: base.filter((p) => p.type === 'fintech').length,
      p2p: base.filter((p) => p.type === 'p2p').length,
    };
  }, [searchQuery]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Lainanantajat
        </h1>
        <p className="text-lg text-gray-600 max-w-3xl">
          Kaikki {providers.length}+ lainanantajaa Suomessa. Vertaa pankkeja,
          fintech-yhtiöitä ja vertaislainapalveluita yhdessä paikassa.
        </p>
      </div>

      {/* Controls bar */}
      <div className="mb-6 space-y-4">
        {/* Search + Sort row */}
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search input */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-gray-400" />
            <input
              type="text"
              placeholder="Hae lainanantajaa nimellä..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none transition-colors"
            />
          </div>

          {/* Sort dropdown */}
          <div className="relative">
            <div className="flex items-center gap-1.5">
              <ArrowUpDown className="h-4 w-4 text-gray-500 hidden sm:block" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortKey)}
                className="appearance-none rounded-lg border border-gray-300 bg-white py-2.5 pl-3 pr-8 text-sm text-gray-700 focus:border-[#1a365d] focus:ring-2 focus:ring-[#1a365d]/20 focus:outline-none transition-colors cursor-pointer"
                aria-label="Järjestä"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.key} value={opt.key}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <SlidersHorizontal className="absolute right-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Type filter tabs */}
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Suodata tyypeittäin">
          {filterTabs.map((tab) => {
            const isActive = typeFilter === tab.key;
            const Icon = tab.icon;
            const count = counts[tab.key];
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setTypeFilter(tab.key)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1a365d] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                <span
                  className={`ml-0.5 text-xs rounded-full px-1.5 py-0.5 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Results count */}
      <p className="text-sm text-gray-500 mb-4">
        {filteredProviders.length} lainanantajaa
        {typeFilter !== 'all' && (
          <> ({filterTabs.find((t) => t.key === typeFilter)?.label})</>
        )}
        {searchQuery.trim() && (
          <> haulla &quot;{searchQuery}&quot;</>
        )}
      </p>

      {/* Provider grid */}
      {filteredProviders.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredProviders.map((provider) => (
            <ProviderCard key={provider.id} provider={provider} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg mb-2">
            Ei löytynyt yhtään lainanantajaa.
          </p>
          <p className="text-gray-400 text-sm">
            Kokeile eri hakusanaa tai tyhjennä suodattimet.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setTypeFilter('all');
            }}
            className="mt-4 inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
          >
            Tyhjennä suodattimet
          </button>
        </div>
      )}

      {/* Bottom SEO text */}
      <section className="mt-16 border-t border-gray-200 pt-10">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Lainanantajat Suomessa
        </h2>
        <div className="prose prose-gray max-w-none text-gray-600 space-y-4">
          <p>
            Suomessa toimii kymmeniä lainanantajia perinteisistä pankeista
            moderneihin fintech-yhtiöihin ja vertaislainapalveluihin.
            Valitse Laina kokoaa kaikki merkittävät lainanantajat yhteen
            paikkaan, jotta voit helposti vertailla palveluita, korkoja ja
            ehtoja.
          </p>
          <p>
            <strong>Pankit</strong> tarjoavat yleensä edullisimmat korot
            erityisesti vakuudellisille lainoille, kuten asuntolainoille.
            Pankkien kulutusluottojen korot voivat kuitenkin olla korkeampia
            kuin fintech-yhtiöiden tarjoukset.
          </p>
          <p>
            <strong>Fintech-yhtiöt</strong> ovat tuoneet kilpailua
            lainamarkkinoille nopeilla hakuprosesseilla ja joustavilla
            ehdoilla. Monet fintech-yhtiöt erikoistuvat vakuudettomiin
            kulutusluottoihin ja yhdistelylainoihin.
          </p>
          <p>
            <strong>Vertaislainapalvelut (P2P)</strong> yhdistävät lainanottajat
            suoraan sijoittajiin. Korot määräytyvät tarjouskilpailun perusteella,
            mikä voi johtaa edullisempiin ehtoihin.
          </p>
          <p>
            Kaikki Suomessa lainoja myöntävät yritykset ovat
            Finanssivalvonnan (Fiva) valvomia, mikä takaa kuluttajansuojan ja
            vastuullisen luotonannon käytännöt.
          </p>
        </div>
      </section>
    </div>
  );
}
