import Link from 'next/link';
import { Wallet, Home, Car, Building2, ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const LOAN_TYPES = [
  {
    icon: Wallet,
    title: 'Kulutusluotto',
    description: 'Vakuudeton laina suurempiin hankintoihin. Vertaile todellisia vuosikorkoja.',
    href: '/kulutusluotto',
  },
  {
    icon: Home,
    title: 'Asuntolaina',
    description: 'Asunnon ostoon tai rakentamiseen. Vertaile marginaaleja ja ehtoja.',
    href: '/asuntolaina',
  },
  {
    icon: Car,
    title: 'Autolaina',
    description: 'Auton rahoitus edullisesti. Vertaile eri autorahoittajien tarjouksia.',
    href: '/autolaina',
  },
  {
    icon: Building2,
    title: 'Yrityslaina',
    description: 'Yritystoiminnan rahoitus. Vertaile yrityslainojen ehtoja ja korkoja.',
    href: '/yrityslaina',
  },
];

export default function LoanTypeCards() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="section-title">Mitä lainaa etsit?</h2>
            <p className="section-subtitle mx-auto">
              Vertaa lainoja tyypeittain ja loyda juuri sinun tarpeisiisi sopiva rahoitus
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {LOAN_TYPES.map((loan, idx) => (
            <ScrollReveal key={loan.title} delay={idx * 100}>
              <Link href={loan.href} className="group block">
                <div className="card-hover p-6 h-full flex flex-col">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 mb-4 group-hover:bg-accent-100 transition-colors">
                    <loan.icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-accent transition-colors mb-2">
                    {loan.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed flex-1 mb-4">
                    {loan.description}
                  </p>

                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent group-hover:gap-2.5 transition-all">
                    Vertaile
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
