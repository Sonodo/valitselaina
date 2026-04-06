import Link from 'next/link';
import { ShieldCheck, ExternalLink, Package } from 'lucide-react';
import type { LoanProvider } from '@/data/providers';

// Map provider type to Finnish label and color scheme
const typeConfig: Record<
  LoanProvider['type'],
  { label: string; bg: string; text: string }
> = {
  bank: { label: 'Pankki', bg: 'bg-blue-50', text: 'text-blue-700' },
  fintech: { label: 'Fintech', bg: 'bg-purple-50', text: 'text-purple-700' },
  p2p: { label: 'P2P', bg: 'bg-amber-50', text: 'text-amber-700' },
  other: { label: 'Muu', bg: 'bg-gray-50', text: 'text-gray-700' },
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

interface ProviderCardProps {
  provider: LoanProvider;
}

export default function ProviderCard({ provider }: ProviderCardProps) {
  const type = typeConfig[provider.type];

  // Calculate lowest effective rate across all products
  const lowestRate = provider.products.reduce(
    (min, p) => Math.min(min, p.effectiveRate.min),
    Infinity,
  );

  // Get unique product types offered
  const productTypes = [
    ...new Set(provider.products.map((p) => p.type)),
  ];

  return (
    <Link
      href={`/lainanantajat/${provider.slug}`}
      className="group block rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-[#1a365d]/30 hover:-translate-y-0.5"
    >
      {/* Header: Name + Type badge */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="min-w-0">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-[#1a365d] transition-colors truncate">
            {provider.shortName || provider.name}
          </h3>
          <p className="text-sm text-gray-500 truncate">{provider.name}</p>
        </div>
        <span
          className={`shrink-0 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${type.bg} ${type.text}`}
        >
          {type.label}
        </span>
      </div>

      {/* Lowest rate */}
      {lowestRate < Infinity && (
        <div className="mb-3">
          <p className="text-xs text-gray-500 mb-0.5">Edullisin tod. vuosikorko</p>
          <p className="text-xl font-bold text-[#1a365d]">
            {lowestRate.toFixed(1)} %
          </p>
        </div>
      )}

      {/* Product types */}
      <div className="mb-3">
        <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-1.5">
          <Package className="h-3.5 w-3.5" />
          <span>{provider.products.length} tuotetta</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {productTypes.map((pt) => (
            <span
              key={pt}
              className="inline-block rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-600"
            >
              {productTypeLabels[pt] || pt}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom: badges */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {provider.finFsaRegulated && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#38a169]">
              <ShieldCheck className="h-3.5 w-3.5" />
              Fiva-valvottu
            </span>
          )}
          {provider.isAffiliate && (
            <span className="inline-flex items-center gap-1 text-xs text-gray-400">
              Mainos
            </span>
          )}
        </div>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-[#1a365d] group-hover:underline">
          Lue lisää
          <ExternalLink className="h-3 w-3" />
        </span>
      </div>
    </Link>
  );
}
