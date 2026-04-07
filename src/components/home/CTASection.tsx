import Link from 'next/link';
import { ArrowRight, ShieldCheck, CreditCard, Clock } from 'lucide-react';

const BENEFITS = [
  { icon: CreditCard, text: 'Ilmainen' },
  { icon: ShieldCheck, text: 'Ei vaikuta luottotietoihin' },
  { icon: Clock, text: 'Ei sitoutumista' },
];

export default function CTASection() {
  return (
    <section className="py-16 sm:py-20 bg-[#1a365d]">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Headline */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
          Aloita vertailu — löydä{' '}
          <span className="text-[#ecc94b]">edullisin laina</span>
        </h2>

        <p className="mt-4 text-lg text-blue-100/90 max-w-2xl mx-auto leading-relaxed">
          Vertaa 27+ lainanantajan tarjouksia yhdellä haulla. Näet todelliset
          vuosikorot ja kaikki kulut — ilman piilotettua agendaa.
        </p>

        {/* CTA button */}
        <div className="mt-8">
          <Link
            href="/vertailu"
            className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-bold text-[#1a365d] shadow-lg hover:bg-[#d69e2e] active:bg-[#b7791f] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ecc94b]"
          >
            Vertaa lainoja nyt
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Trust benefits */}
        <div className="mt-8 flex flex-wrap justify-center gap-6">
          {BENEFITS.map((benefit) => (
            <div
              key={benefit.text}
              className="flex items-center gap-2"
            >
              <benefit.icon className="h-4 w-4 text-[#ecc94b]" />
              <span className="text-sm font-medium text-blue-100">
                {benefit.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
