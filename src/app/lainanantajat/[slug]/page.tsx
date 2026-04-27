import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ShieldCheck,
  Globe,
  Phone,
  MapPin,
  Calendar,
  Building2,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  ArrowLeft,
  Clock,
  Lock,
  UserCheck,
} from 'lucide-react';
import { providers, getProviderBySlug } from '@/data/providers';
import type { LoanProvider, LoanProduct } from '@/data/providers';

// ---------------------------------------------------------------------------
// Static params — pre-render all provider pages at build time
// ---------------------------------------------------------------------------
export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.slug }));
}

// ---------------------------------------------------------------------------
// Dynamic metadata per provider
// ---------------------------------------------------------------------------
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) return {};

  const title = `${provider.shortName || provider.name} — Lainatuotteet ja tiedot`;
  const description = `${provider.shortName || provider.name}: ${provider.products.length} lainatuotetta. ${provider.description.slice(0, 140)}...`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://valitselaina.fi/lainanantajat/${slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://valitselaina.fi/lainanantajat/${slug}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Map provider type to Finnish label
const typeLabels: Record<LoanProvider['type'], string> = {
  bank: 'Pankki',
  fintech: 'Fintech',
  p2p: 'Vertaislaina (P2P)',
  other: 'Muu rahoitusyhtiö',
};

// Map ISO country codes to Finnish names
const countryNames: Record<string, string> = {
  'FI': 'Suomi',
  'NO': 'Norja',
  'SE': 'Ruotsi',
  'EE': 'Viro',
  'GB': 'Iso-Britannia',
  'DK': 'Tanska',
  'DE': 'Saksa',
};

// Map loan product type to Finnish label
const productTypeLabels: Record<string, string> = {
  kulutusluotto: 'Kulutusluotto',
  asuntolaina: 'Asuntolaina',
  autolaina: 'Autolaina',
  yhdistelylaina: 'Yhdistelylaina',
  yrityslaina: 'Yrityslaina',
  pikavippi: 'Pikavippi',
};

// Format euro amounts
function formatEur(amount: number): string {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---------------------------------------------------------------------------
// Product card
// ---------------------------------------------------------------------------
function ProductCard({ product }: { product: LoanProduct }) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      {/* Product header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {product.name}
          </h3>
          <span className="inline-block mt-1 rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
            {productTypeLabels[product.type] || product.type}
          </span>
        </div>
        <div className="text-right shrink-0">
          <p className="text-xs text-gray-500">Tod. vuosikorko</p>
          <p className="text-lg font-bold text-[#1a365d]">
            {product.effectiveRate.min.toFixed(1)}–{product.effectiveRate.max.toFixed(1)} %
          </p>
        </div>
      </div>

      {/* Product details grid */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-sm">
        <div>
          <p className="text-gray-500 text-xs mb-0.5">Lainamäärä</p>
          <p className="font-medium text-gray-900">
            {formatEur(product.minAmount)} – {formatEur(product.maxAmount)}
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-0.5">Laina-aika</p>
          <p className="font-medium text-gray-900">
            {product.minTermMonths}–{product.maxTermMonths} kk
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-0.5">Nimelliskorko</p>
          <p className="font-medium text-gray-900">
            {product.nominalRate.min.toFixed(2)}–{product.nominalRate.max.toFixed(2)} %
          </p>
        </div>
        <div>
          <p className="text-gray-500 text-xs mb-0.5">Käsittelyaika</p>
          <p className="font-medium text-gray-900 flex items-center gap-1">
            <Clock className="h-3.5 w-3.5 text-gray-400" />
            {product.processingTime}
          </p>
        </div>
      </div>

      {/* Fees */}
      {(product.setupFee !== undefined || product.monthlyFee !== undefined) && (
        <div className="flex flex-wrap gap-3 mb-4 text-sm">
          {product.setupFee !== undefined && (
            <div>
              <span className="text-gray-500 text-xs">Avausmaksu: </span>
              <span className="font-medium text-gray-900">
                {product.setupFee === 0 ? 'Ei' : formatEur(product.setupFee)}
              </span>
            </div>
          )}
          {product.monthlyFee !== undefined && (
            <div>
              <span className="text-gray-500 text-xs">Kuukausimaksu: </span>
              <span className="font-medium text-gray-900">
                {product.monthlyFee === 0
                  ? 'Ei'
                  : `${product.monthlyFee.toFixed(2)} €`}
              </span>
            </div>
          )}
        </div>
      )}

      {/* Requirements badges */}
      <div className="flex flex-wrap gap-2 mb-4">
        {product.requiresCollateral && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            <Lock className="h-3 w-3" />
            Vakuus vaaditaan
          </span>
        )}
        {product.requiresGuarantor && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1 text-xs font-medium text-amber-700">
            <UserCheck className="h-3 w-3" />
            Takaaja vaaditaan
          </span>
        )}
        {!product.requiresCollateral && !product.requiresGuarantor && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700">
            Vakuudeton
          </span>
        )}
      </div>

      {/* Features */}
      {product.features.length > 0 && (
        <div>
          <p className="text-xs font-medium text-gray-500 mb-1.5">Ominaisuudet</p>
          <ul className="space-y-1">
            {product.features.map((f, i) => (
              <li key={i} className="text-sm text-gray-600 flex items-start gap-1.5">
                <span className="text-[#38a169] mt-0.5 shrink-0">&#8226;</span>
                {f}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Restrictions */}
      {product.restrictions && product.restrictions.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-medium text-gray-500 mb-1.5">Rajoitukset</p>
          <ul className="space-y-1">
            {product.restrictions.map((r, i) => (
              <li key={i} className="text-sm text-gray-500 flex items-start gap-1.5">
                <span className="text-amber-500 mt-0.5 shrink-0">&#8226;</span>
                {r}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Last updated */}
      <p className="mt-4 text-xs text-gray-400">
        Päivitetty: {new Date(product.lastUpdated).toLocaleDateString('fi-FI')}
      </p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main page component
// ---------------------------------------------------------------------------
export default async function ProviderDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);
  if (!provider) notFound();

  // ─────────────────────────────────────────────────────────────────────
  // JSON-LD: provider Organization/FinancialService + one LoanOrCredit per
  // product. We bundle everything into a single @graph so crawlers parse
  // each entity. Rates that are clearly variable (Euribor + marginaali) are
  // expressed as a string description rather than a numeric to avoid
  // implying false precision.
  // ─────────────────────────────────────────────────────────────────────
  // Narrow once for TS — `provider` is guaranteed non-null past notFound().
  const p0 = provider;
  const providerOrgId = `https://valitselaina.fi/lainanantajat/${p0.slug}#organization`;

  const providerNode = {
    '@type': 'FinancialService',
    '@id': providerOrgId,
    name: p0.name,
    alternateName: p0.shortName,
    description: p0.description,
    url: p0.website,
    foundingDate: String(p0.founded),
    areaServed: 'FI',
    address: {
      '@type': 'PostalAddress',
      addressLocality: p0.headquarters,
      addressCountry: p0.country,
    },
    ...(p0.customerServicePhone && {
      telephone: p0.customerServicePhone,
    }),
  };

  // Heuristic: a product whose features mention "Euribor" or "marginaali"
  // is variable-rate; describe rate as text rather than QuantitativeValue.
  function isVariableRate(p: LoanProduct): boolean {
    const blob = (p.features.join(' ') + ' ' + p.name).toLowerCase();
    return blob.includes('euribor') || blob.includes('marginaali');
  }

  function buildLoanOrCreditNode(p: LoanProduct) {
    const productLabel = productTypeLabels[p.type] || p.type;
    const variable = isVariableRate(p);

    // interestRate: schema.org accepts either number or string. We use a
    // descriptive string for variable-rate loans, an explicit numeric range
    // (as text) for fixed-rate consumer products.
    const interestRate = variable
      ? `${p.nominalRate.min.toFixed(2)}–${p.nominalRate.max.toFixed(2)} % (sis. Euribor + marginaali, vaihtuva)`
      : `${p.nominalRate.min.toFixed(2)}–${p.nominalRate.max.toFixed(2)} %`;

    return {
      '@type': 'LoanOrCredit',
      '@id': `https://valitselaina.fi/lainanantajat/${p0.slug}#${p.id}`,
      name: p.name,
      category: productLabel,
      description: `${productLabel} — ${p.features.slice(0, 3).join('; ')}`,
      provider: { '@id': providerOrgId },
      areaServed: 'FI',
      currency: 'EUR',
      loanTerm: {
        '@type': 'QuantitativeValue',
        unitCode: 'MON',
        minValue: p.minTermMonths,
        maxValue: p.maxTermMonths,
      },
      amount: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        minValue: p.minAmount,
        maxValue: p.maxAmount,
      },
      interestRate,
      annualPercentageRate: `${p.effectiveRate.min.toFixed(2)}–${p.effectiveRate.max.toFixed(2)} %`,
      requiredCollateral: p.requiresCollateral
        ? 'Vakuus vaaditaan'
        : 'Vakuudeton',
      feesAndCommissionsSpecification: [
        p.setupFee !== undefined
          ? `Avausmaksu: ${p.setupFee === 0 ? 'ei avausmaksua' : `${p.setupFee} €`}`
          : null,
        p.monthlyFee !== undefined
          ? `Kuukausimaksu: ${p.monthlyFee === 0 ? 'ei kuukausimaksua' : `${p.monthlyFee.toFixed(2)} €`}`
          : null,
      ]
        .filter(Boolean)
        .join('. '),
      dateModified: p.lastUpdated,
    };
  }

  const jsonLdGraph = {
    '@context': 'https://schema.org',
    '@graph': [
      providerNode,
      ...p0.products.map(buildLoanOrCreditNode),
    ],
  };

  return (
    <>
      {/* JSON-LD structured data — provider + LoanOrCredit per product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb / back link */}
        <Link
          href="/lainanantajat"
          className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a365d] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Kaikki lainanantajat
        </Link>

        {/* ================================================================= */}
        {/* a) Provider header */}
        {/* ================================================================= */}
        <section className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2 flex-wrap">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {provider.shortName || provider.name}
                </h1>
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
                  {typeLabels[provider.type]}
                </span>
              </div>
              {provider.shortName && (
                <p className="text-gray-500 mb-3">{provider.name}</p>
              )}

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {provider.finFsaRegulated && (
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-sm font-medium text-green-700">
                    <ShieldCheck className="h-4 w-4" />
                    Finanssivalvonnan (Fiva) valvoma
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="mt-6 text-gray-600 leading-relaxed max-w-3xl">
            {provider.description}
          </p>
        </section>

        {/* ================================================================= */}
        {/* b) Perustiedot — Key facts */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Perustiedot</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <KeyFact
              icon={<Calendar className="h-5 w-5 text-[#1a365d]" />}
              label="Perustettu"
              value={String(provider.founded)}
            />
            <KeyFact
              icon={<MapPin className="h-5 w-5 text-[#1a365d]" />}
              label="Pääkonttori"
              value={provider.headquarters}
            />
            <KeyFact
              icon={<Building2 className="h-5 w-5 text-[#1a365d]" />}
              label="Maa"
              value={countryNames[provider.country] || provider.country}
            />
            <KeyFact
              icon={<Globe className="h-5 w-5 text-[#1a365d]" />}
              label="Verkkosivut"
              value={
                <a
                  href={provider.website}
                  target="_blank"
                  rel={
                    provider.isAffiliate
                      ? 'noopener noreferrer nofollow sponsored'
                      : 'noopener noreferrer nofollow'
                  }
                  className="text-[#1a365d] hover:underline inline-flex items-center gap-1"
                >
                  {provider.website.replace(/^https?:\/\//, '').replace(/\/$/, '')}
                  <ExternalLink className="h-3 w-3" />
                </a>
              }
            />
            {provider.customerServicePhone && (
              <KeyFact
                icon={<Phone className="h-5 w-5 text-[#1a365d]" />}
                label="Asiakaspalvelu"
                value={provider.customerServicePhone}
              />
            )}
            <KeyFact
              icon={<ShieldCheck className="h-5 w-5 text-[#1a365d]" />}
              label="Fiva-valvottu"
              value={provider.finFsaRegulated ? 'Kyllä' : 'Ei'}
            />
          </div>
        </section>

        {/* ================================================================= */}
        {/* c) Tuotteet — Products */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Tuotteet ({provider.products.length})
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {provider.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* d) Hyvät ja huonot puolet — Pros and cons */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Hyvät ja huonot puolet
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Pros */}
            <div className="rounded-xl border border-green-200 bg-green-50/50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsUp className="h-5 w-5 text-green-600" />
                <h3 className="text-lg font-semibold text-green-800">Plussat</h3>
              </div>
              <ul className="space-y-2.5">
                {provider.pros.map((pro, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-green-900"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-green-500" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-5">
              <div className="flex items-center gap-2 mb-4">
                <ThumbsDown className="h-5 w-5 text-red-500" />
                <h3 className="text-lg font-semibold text-red-800">Miinukset</h3>
              </div>
              <ul className="space-y-2.5">
                {provider.cons.map((con, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-red-900"
                  >
                    <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-red-400" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ================================================================= */}
        {/* e) Link to provider */}
        {/* ================================================================= */}
        <section className="mb-10">
          <a
            href={provider.website}
            target="_blank"
            rel={
              provider.isAffiliate
                ? 'noopener noreferrer nofollow sponsored'
                : 'noopener noreferrer nofollow'
            }
            className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
          >
            Siirry lainanantajan sivuille
            <ExternalLink className="h-4 w-4" />
          </a>
        </section>

        {/* Back to directory */}
        <div className="border-t border-gray-200 pt-6">
          <Link
            href="/lainanantajat"
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-[#1a365d] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Takaisin kaikkiin lainanantajiin
          </Link>
        </div>
      </div>
    </>
  );
}

// ---------------------------------------------------------------------------
// Key fact card sub-component
// ---------------------------------------------------------------------------
function KeyFact({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4">
      <div className="shrink-0 mt-0.5">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 mb-0.5">{label}</p>
        <p className="text-sm font-medium text-gray-900">{value}</p>
      </div>
    </div>
  );
}
