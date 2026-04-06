import Link from 'next/link';
import {
  CreditCard,
  Home,
  Car,
  Layers,
  Building2,
  Zap,
  ArrowRight,
} from 'lucide-react';
import { getProductsByType } from '@/data/providers';
import { LOAN_TYPE_LABELS, LOAN_TYPE_DESCRIPTIONS } from '@/lib/constants';

const LOAN_TYPES = [
  { type: 'kulutusluotto' as const, icon: CreditCard, href: '/kulutusluotto' },
  { type: 'asuntolaina' as const, icon: Home, href: '/asuntolaina' },
  { type: 'autolaina' as const, icon: Car, href: '/autolaina' },
  { type: 'yhdistelylaina' as const, icon: Layers, href: '/yhdistelylaina' },
  { type: 'yrityslaina' as const, icon: Building2, href: '/yrityslaina' },
  { type: 'pikavippi' as const, icon: Zap, href: '/pikavippi' },
];

export default function LoanTypeCards() {
  return (
    <section className="py-16 sm:py-20 bg-[#f7fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Kaikki lainatyypit
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Vertaa lainoja tyypeittäin ja löydä juuri sinun tarpeisiisi sopiva
            rahoitus
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {LOAN_TYPES.map(({ type, icon: Icon, href }) => {
            const products = getProductsByType(type);
            const productCount = products.length;

            return (
              <Link
                key={type}
                href={href}
                className="group rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-[#1a365d]/20 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1a365d]/5 group-hover:bg-[#1a365d]/10 transition-colors">
                    <Icon
                      className="h-6 w-6 text-[#1a365d]"
                      strokeWidth={1.8}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#1a365d] transition-colors">
                      {LOAN_TYPE_LABELS[type]}
                    </h3>
                    <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                      {LOAN_TYPE_DESCRIPTIONS[type]}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">
                        {productCount}{' '}
                        {productCount === 1 ? 'tuote' : 'tuotetta'}
                      </span>
                      <span className="inline-flex items-center gap-1 text-xs font-semibold text-[#1a365d] opacity-0 group-hover:opacity-100 transition-opacity">
                        Vertaa
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
