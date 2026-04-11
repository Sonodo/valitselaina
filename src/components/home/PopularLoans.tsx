import Link from 'next/link';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { getProductsSortedByRate, type LoanProduct, type LoanProvider } from '@/data/providers';
import { formatPercentage, formatNumber } from '@/lib/utils';
import { LOAN_TYPE_LABELS } from '@/lib/constants';
import ScrollReveal from '@/components/ScrollReveal';

type EnrichedProduct = LoanProduct & { provider: LoanProvider };

function getCheapestByType(): EnrichedProduct[] {
  const types: LoanProduct['type'][] = [
    'kulutusluotto',
    'asuntolaina',
    'autolaina',
    'yhdistelylaina',
  ];
  const results: EnrichedProduct[] = [];

  for (const type of types) {
    const sorted = getProductsSortedByRate(type);
    if (sorted.length > 0) {
      results.push(sorted[0]);
    }
  }

  return results;
}

export default function PopularLoans() {
  const topLoans = getCheapestByType();

  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="section-title">Suosituimmat lainanantajat</h2>
              <p className="section-subtitle">
                Alhaisimmat todelliset vuosikorot lainatyypeittain
              </p>
            </div>
            <Link
              href="/vertailu"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-600 transition-colors"
            >
              Katso kaikki lainat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {topLoans.map((product, idx) => (
            <ScrollReveal key={product.id} delay={idx * 100}>
              <div className="card-hover flex flex-col h-full">
                {/* Type badge */}
                <span className="badge badge-accent self-start mb-4">
                  {LOAN_TYPE_LABELS[product.type] ?? product.type}
                </span>

                {/* Provider name */}
                <h3 className="text-base font-semibold text-slate-900 mb-1">
                  {product.provider.shortName ?? product.provider.name}
                </h3>
                <p className="text-sm text-slate-500 mb-4">{product.name}</p>

                {/* Rate */}
                <div className="mb-4">
                  <p className="text-xs text-slate-500 mb-0.5">
                    Todellinen vuosikorko alkaen
                  </p>
                  <p className="text-2xl font-bold text-accent-700">
                    {formatPercentage(product.effectiveRate.min)}
                  </p>
                </div>

                {/* Details */}
                <div className="space-y-2 text-sm text-slate-600 mb-5 flex-1">
                  <div className="flex justify-between">
                    <span>Lainasumma</span>
                    <span className="font-medium text-slate-900">
                      {formatNumber(product.minAmount)} &ndash;{' '}
                      {formatNumber(product.maxAmount)} &euro;
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Laina-aika</span>
                    <span className="font-medium text-slate-900">
                      {product.minTermMonths} &ndash; {product.maxTermMonths} kk
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Kasittelyaika</span>
                    <span className="font-medium text-slate-900">
                      {product.processingTime}
                    </span>
                  </div>
                </div>

                {/* Affiliate disclosure */}
                {product.provider.isAffiliate && (
                  <p className="text-xs text-amber-700 bg-amber-50 rounded-lg px-2.5 py-1.5 mb-3 flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Mainos — affiliate-linkki
                  </p>
                )}

                {/* CTA */}
                <Link
                  href={`/lainanantajat/${product.provider.slug}`}
                  className="flex items-center justify-center gap-1.5 w-full rounded-xl border-2 border-accent px-4 py-2.5 text-sm font-semibold text-accent hover:bg-accent hover:text-white transition-all min-h-[44px]"
                >
                  Katso lisaa
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <p className="mt-4 text-sm text-slate-500">
          Korot ja ehdot ovat toimituksellisia arvioita. Tarkista aina ajantasaiset tiedot lainanantajan sivuilta.
        </p>
      </div>
    </section>
  );
}
