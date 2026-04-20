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
  Scale,
  TrendingDown,
  BookOpen,
} from 'lucide-react';
import { providers, getProviderBySlug } from '@/data/providers';
import type { LoanProvider, LoanProduct } from '@/data/providers';
import type { LoanType } from '@/types';
import DisclosureBanner from '@/components/layout/DisclosureBanner';

const SITE_URL = 'https://valitselaina.fi';

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

  const displayName = provider.shortName || provider.name;
  const title = `${displayName} lainavertailu 2026 — korot, tuotteet ja arvostelu | Valitse Laina`;

  // Description uses the hand-authored description field, trimmed.
  const rawDesc = provider.description.trim();
  const description =
    rawDesc.length > 155 ? `${rawDesc.slice(0, 152).trimEnd()}...` : rawDesc;

  const url = `${SITE_URL}/lainanantajat/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      siteName: 'Valitse Laina',
      locale: 'fi_FI',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
    },
    alternates: {
      canonical: url,
    },
  };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const typeLabels: Record<LoanProvider['type'], string> = {
  bank: 'Pankki',
  fintech: 'Fintech',
  p2p: 'Vertaislaina (P2P)',
  other: 'Muu rahoitusyhtiö',
};

const countryNames: Record<string, string> = {
  FI: 'Suomi',
  NO: 'Norja',
  SE: 'Ruotsi',
  EE: 'Viro',
  GB: 'Iso-Britannia',
  DK: 'Tanska',
  DE: 'Saksa',
};

const productTypeLabels: Record<string, string> = {
  kulutusluotto: 'Kulutusluotto',
  asuntolaina: 'Asuntolaina',
  autolaina: 'Autolaina',
  yhdistelylaina: 'Yhdistelylaina',
  yrityslaina: 'Yrityslaina',
  pikavippi: 'Pikavippi',
};

// Map loan type to public type-page path (for internal linking)
const loanTypePaths: Record<LoanType, string> = {
  kulutusluotto: '/kulutusluotto',
  asuntolaina: '/asuntolaina',
  autolaina: '/autolaina',
  yhdistelylaina: '/yhdistelylaina',
  yrityslaina: '/yrityslaina',
  pikavippi: '/pikavippi',
};

// Map loan type to most relevant guide slug (keyword match only)
const loanTypeGuides: Record<LoanType, { slug: string; title: string }[]> = {
  asuntolaina: [
    { slug: 'asuntolaina-ensiostajalle', title: 'Asuntolaina ensiasunnon ostajalle — Kattava opas' },
    { slug: 'lainan-kilpailutus', title: 'Lainan kilpailutus — Näin löydät edullisimman lainan' },
  ],
  yhdistelylaina: [
    { slug: 'velkojen-yhdistely', title: 'Velkojen yhdistely — Opas yhdistelylainaan' },
    { slug: 'todellinen-vuosikorko', title: 'Todellinen vuosikorko — Miksi se on tärkein luku' },
  ],
  kulutusluotto: [
    { slug: 'todellinen-vuosikorko', title: 'Todellinen vuosikorko — Miksi se on tärkein luku' },
    { slug: 'lainan-kilpailutus', title: 'Lainan kilpailutus — Näin löydät edullisimman lainan' },
  ],
  pikavippi: [
    { slug: 'kuluttajan-oikeudet', title: 'Kuluttajan oikeudet laina-asioissa' },
    { slug: 'todellinen-vuosikorko', title: 'Todellinen vuosikorko — Miksi se on tärkein luku' },
  ],
  autolaina: [
    { slug: 'lainan-kilpailutus', title: 'Lainan kilpailutus — Näin löydät edullisimman lainan' },
    { slug: 'lainaamisen-perusteet', title: 'Lainaamisen perusteet — Kaikki mitä sinun tulee tietää' },
  ],
  yrityslaina: [
    { slug: 'lainan-kilpailutus', title: 'Lainan kilpailutus — Näin löydät edullisimman lainan' },
    { slug: 'lainaamisen-perusteet', title: 'Lainaamisen perusteet — Kaikki mitä sinun tulee tietää' },
  ],
};

function formatEur(amount: number): string {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// Compute the dominant (most common) loan type offered by a provider.
// Used to rank "related providers" fairly on the same product category.
function dominantLoanType(provider: LoanProvider): LoanType | null {
  if (provider.products.length === 0) return null;
  const counts = new Map<LoanType, number>();
  for (const p of provider.products) {
    counts.set(p.type, (counts.get(p.type) ?? 0) + 1);
  }
  let best: LoanType | null = null;
  let bestCount = -1;
  for (const [type, n] of counts) {
    if (n > bestCount) {
      bestCount = n;
      best = type;
    }
  }
  return best;
}

// Lowest effective APR a provider offers for a given loan type.
function lowestApr(provider: LoanProvider, type: LoanType): number {
  const matching = provider.products.filter((p) => p.type === type);
  if (matching.length === 0) return Infinity;
  return matching.reduce((m, p) => Math.min(m, p.effectiveRate.min), Infinity);
}

// Return up to N alternative providers, ranked by lowest APR on the same
// dominant loan type. Transparent criterion, no commission weighting.
function rankedAlternatives(
  current: LoanProvider,
  limit = 4,
): Array<{ provider: LoanProvider; apr: number; type: LoanType }> {
  const type = dominantLoanType(current);
  if (!type) return [];
  return providers
    .filter((p) => p.slug !== current.slug)
    .map((p) => ({ provider: p, apr: lowestApr(p, type), type }))
    .filter((x) => Number.isFinite(x.apr))
    .sort((a, b) => a.apr - b.apr)
    .slice(0, limit);
}

// Pick the most recent lastUpdated across products (ISO string).
function mostRecentUpdate(provider: LoanProvider): string | null {
  const dates = provider.products
    .map((p) => p.lastUpdated)
    .filter((d): d is string => Boolean(d))
    .sort();
  return dates.length ? dates[dates.length - 1] : null;
}

// ---------------------------------------------------------------------------
// Product card
// ---------------------------------------------------------------------------
function ProductCard({
  product,
  provider,
}: {
  product: LoanProduct;
  provider: LoanProvider;
}) {
  const applyUrl =
    provider.applyUrls?.[product.type] || provider.website;
  const ctaRel = provider.isAffiliate
    ? 'sponsored nofollow noopener'
    : 'nofollow noopener';
  const ctaLabel = provider.isAffiliate ? 'Hae lainaa' : 'Siirry sivulle';

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm">
      {/* Product header */}
      <div className="flex items-start justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-gray-900">
            {product.name}
          </h3>
          <Link
            href={loanTypePaths[product.type] ?? '/vertailu'}
            className="inline-block mt-1 rounded bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
          >
            {productTypeLabels[product.type] || product.type}
          </Link>
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

      {/* CTA */}
      <div className="mt-5 flex flex-wrap items-center gap-3">
        <a
          href={applyUrl}
          target="_blank"
          rel={ctaRel}
          className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors"
        >
          {ctaLabel}
          <ExternalLink className="h-3.5 w-3.5" />
        </a>
        <Link
          href={`/vertailu?type=${product.type}`}
          className="text-sm font-medium text-[#1a365d] hover:underline"
        >
          Vertaa muihin {productTypeLabels[product.type]?.toLowerCase() ?? 'lainoihin'}
        </Link>
      </div>

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

  const displayName = provider.shortName || provider.name;
  const pageUrl = `${SITE_URL}/lainanantajat/${slug}`;
  const lastUpdated = mostRecentUpdate(provider);
  const alternatives = rankedAlternatives(provider, 4);
  const dominantType = dominantLoanType(provider);
  const relatedGuides = dominantType ? loanTypeGuides[dominantType] ?? [] : [];

  // ===========================================================
  // JSON-LD — FinancialService, BreadcrumbList, Product offers.
  // No AggregateRating (no real ratings), no FAQPage (no
  // hand-authored Q&A data). Never fabricate schema.
  // ===========================================================

  const financialServiceLd = {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    '@id': `${pageUrl}#organization`,
    name: provider.name,
    ...(provider.shortName && { alternateName: provider.shortName }),
    description: provider.description,
    url: provider.website,
    foundingDate: String(provider.founded),
    address: {
      '@type': 'PostalAddress',
      addressLocality: provider.headquarters,
      addressCountry: provider.country,
    },
    ...(provider.customerServicePhone && {
      telephone: provider.customerServicePhone,
    }),
    ...(provider.customerServiceEmail && {
      email: provider.customerServiceEmail,
    }),
    areaServed: { '@type': 'Country', name: 'Finland' },
    ...(provider.finFsaRegulated && {
      identifier: {
        '@type': 'PropertyValue',
        name: 'Regulator',
        value: 'Finanssivalvonta (FIN-FSA)',
      },
    }),
  };

  const breadcrumbLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Koti',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Lainanantajat',
        item: `${SITE_URL}/lainanantajat`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: displayName,
        item: pageUrl,
      },
    ],
  };

  // Product / offer schema per loan product (priceSpecification on nominalRate)
  const productLd = provider.products.map((product) => ({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${pageUrl}#${product.id}`,
    name: product.name,
    category: productTypeLabels[product.type] ?? product.type,
    brand: { '@type': 'Organization', name: provider.name },
    description: product.features.join(' '),
    offers: {
      '@type': 'Offer',
      url: provider.applyUrls?.[product.type] || provider.website,
      priceCurrency: 'EUR',
      priceSpecification: [
        {
          '@type': 'UnitPriceSpecification',
          name: 'Nimelliskorko',
          minPrice: product.nominalRate.min,
          maxPrice: product.nominalRate.max,
          priceCurrency: 'EUR',
          unitText: 'PERCENT',
        },
        {
          '@type': 'UnitPriceSpecification',
          name: 'Todellinen vuosikorko',
          minPrice: product.effectiveRate.min,
          maxPrice: product.effectiveRate.max,
          priceCurrency: 'EUR',
          unitText: 'PERCENT',
        },
      ],
      eligibleTransactionVolume: {
        '@type': 'PriceSpecification',
        minPrice: product.minAmount,
        maxPrice: product.maxAmount,
        priceCurrency: 'EUR',
      },
    },
  }));

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(financialServiceLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
      />
      {productLd.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb nav (visible) */}
        <nav aria-label="Murupolku" className="mb-6 text-sm text-gray-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#1a365d] transition-colors">
                Koti
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link
                href="/lainanantajat"
                className="hover:text-[#1a365d] transition-colors"
              >
                Lainanantajat
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li aria-current="page" className="text-gray-700 font-medium">
              {displayName}
            </li>
          </ol>
        </nav>

        {/* ================================================================= */}
        {/* 1) H1 + hero chips */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            {displayName} — lainavertailu ja arvostelu
          </h1>
          {provider.shortName && (
            <p className="text-gray-500 mb-4">{provider.name}</p>
          )}

          {/* Hero chips: founded / HQ / type / FIN-FSA / country */}
          <div className="flex flex-wrap gap-2 mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-sm font-medium text-blue-700">
              {typeLabels[provider.type]}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              <Calendar className="h-3.5 w-3.5" />
              Perustettu {provider.founded}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700">
              <MapPin className="h-3.5 w-3.5" />
              {provider.headquarters}
              {provider.country !== 'FI' &&
                `, ${countryNames[provider.country] ?? provider.country}`}
            </span>
            {provider.finFsaRegulated && (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 border border-green-200 px-3 py-1 text-sm font-medium text-green-700">
                <ShieldCheck className="h-4 w-4" />
                Finanssivalvonnan (Fiva) valvoma
              </span>
            )}
          </div>

          {/* Description */}
          <p className="text-gray-600 leading-relaxed max-w-3xl">
            {provider.description}
          </p>

          {lastUpdated && (
            <p className="mt-3 text-xs text-gray-400">
              Tiedot päivitetty:{' '}
              {new Date(lastUpdated).toLocaleDateString('fi-FI')}
            </p>
          )}
        </section>

        {/* ================================================================= */}
        {/* 2) Perustiedot — Key facts */}
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
                      ? 'sponsored nofollow noopener'
                      : 'nofollow noopener'
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
        {/* 3) Tuotteet — Products + affiliate disclosure */}
        {/* ================================================================= */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {displayName} lainatuotteet ({provider.products.length})
          </h2>
          <div className="mb-4">
            <DisclosureBanner />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {provider.products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                provider={provider}
              />
            ))}
          </div>
        </section>

        {/* ================================================================= */}
        {/* 4) Pros and cons */}
        {/* ================================================================= */}
        {(provider.pros.length > 0 || provider.cons.length > 0) && (
          <section className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {displayName}: hyvät ja huonot puolet
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {provider.pros.length > 0 && (
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
              )}

              {provider.cons.length > 0 && (
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
              )}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 5) Näin vertaamme — Transparency block (static, identical across providers) */}
        {/* ================================================================= */}
        <section className="mb-10 rounded-xl border border-gray-200 bg-white p-6">
          <div className="flex items-center gap-2 mb-3">
            <Scale className="h-5 w-5 text-[#1a365d]" />
            <h2 className="text-xl font-bold text-gray-900">Näin vertaamme</h2>
          </div>
          <div className="text-sm text-gray-600 leading-relaxed space-y-3">
            <p>
              Vertaamme lainatuotteita kolmella julkisella kriteerillä:{' '}
              <strong>todellinen vuosikorko</strong>, lainamäärä- ja laina-aikahaarukka
              sekä mahdolliset vakuus- ja takaajavaatimukset. Järjestys tällä sivulla
              perustuu matalimpaan todelliseen vuosikorkoon ensisijaisen lainatyypin
              osalta — sama sääntö sovelletaan kaikkiin palveluntarjoajiin
              riippumatta siitä, onko meillä kaupallinen yhteistyö.
            </p>
            <p>
              Listaamme sekä kaupallisen yhteistyömme palveluntarjoajat että ne,
              joiden kanssa meillä ei ole sopimusta — jotta vertailu on aidosti
              kattava. Komissiot eivät vaikuta sijoitukseen.{' '}
              <Link
                href="/menetelma"
                className="text-[#1a365d] font-medium hover:underline"
              >
                Lue tarkempi vertailumetodi
              </Link>{' '}
              ja{' '}
              <Link
                href="/sivuston-ansainta"
                className="text-[#1a365d] font-medium hover:underline"
              >
                sivuston ansaintamalli
              </Link>
              .
            </p>
          </div>
        </section>

        {/* ================================================================= */}
        {/* 6) Alternatives — Vertaile {Provider} muihin */}
        {/* ================================================================= */}
        {alternatives.length > 0 && dominantType && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown className="h-5 w-5 text-[#1a365d]" />
              <h2 className="text-2xl font-bold text-gray-900">
                Vertaile {displayName} muihin
              </h2>
            </div>
            <p className="text-sm text-gray-500 mb-5">
              Nämä {alternatives.length} palveluntarjoajaa tarjoavat kilpailukykyisimmät{' '}
              {productTypeLabels[dominantType]?.toLowerCase() ?? 'lainan'} korot —
              järjestys matalimman todellisen vuosikoron mukaan.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {alternatives.map(({ provider: alt, apr }) => (
                <Link
                  key={alt.slug}
                  href={`/lainanantajat/${alt.slug}`}
                  className="group block rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md hover:border-[#1a365d]/30 transition-all"
                >
                  <p className="text-sm font-semibold text-gray-900 group-hover:text-[#1a365d] mb-1 truncate">
                    {alt.shortName || alt.name}
                  </p>
                  <p className="text-xs text-gray-500 mb-3">
                    {typeLabels[alt.type]}
                  </p>
                  <p className="text-xs text-gray-500 mb-0.5">
                    Alk. tod. vuosikorko
                  </p>
                  <p className="text-xl font-bold text-[#1a365d]">
                    {apr.toFixed(1)} %
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 7) Related guides — internal linking */}
        {/* ================================================================= */}
        {relatedGuides.length > 0 && (
          <section className="mb-10">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-5 w-5 text-[#1a365d]" />
              <h2 className="text-xl font-bold text-gray-900">Aiheeseen liittyvät oppaat</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {relatedGuides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/oppaat/${g.slug}`}
                  className="block rounded-lg border border-gray-200 bg-white p-4 hover:border-[#1a365d]/30 hover:shadow-sm transition-all"
                >
                  <p className="text-sm font-medium text-gray-900">
                    {g.title}
                  </p>
                  <p className="mt-1 text-xs text-[#1a365d] font-medium">
                    Lue opas &rarr;
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ================================================================= */}
        {/* 8) Final CTA */}
        {/* ================================================================= */}
        <section className="mb-10 rounded-xl bg-[#1a365d] p-6 sm:p-8 text-white">
          <h2 className="text-xl sm:text-2xl font-bold mb-2">
            Vertaa kaikkia Suomen lainanantajia
          </h2>
          <p className="text-white/80 mb-5 max-w-2xl">
            {displayName} on vain yksi vaihtoehto. Laskuri näyttää{' '}
            {providers.length} palveluntarjoajan tuotteet yhdellä haulla —
            todellinen vuosikorko ja kokonaiskustannukset eriteltyinä.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={
                dominantType
                  ? `/vertailu?type=${dominantType}`
                  : '/vertailu'
              }
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-[#1a365d] hover:bg-gray-100 transition-colors"
            >
              Avaa lainavertailu
              <ExternalLink className="h-4 w-4" />
            </Link>
            <Link
              href="/lainanantajat"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Kaikki lainanantajat
            </Link>
          </div>
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
