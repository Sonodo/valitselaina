import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export default function CTASection() {
  return (
    <section className="relative py-16 sm:py-20 bg-navy overflow-hidden">
      {/* Accent glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-accent/20 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">
            Valmis vertailemaan?
          </h2>

          <p className="mt-4 text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Loyda sinulle paras laina minuuteissa. Kattava vertailu yli 20
            lainanantajan tarjonnasta.
          </p>

          <div className="mt-8">
            <Link
              href="/vertailu"
              className="btn btn-primary text-base px-10 py-4 shadow-lg shadow-accent/30"
            >
              Aloita vertailu
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
