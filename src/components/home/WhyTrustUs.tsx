import { ShieldCheck, Eye, Percent, Users } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const TRUST_METRICS = [
  {
    icon: Users,
    value: '28+',
    label: 'Lainanantajaa',
    description: 'vertailussam',
  },
  {
    icon: Eye,
    value: '100%',
    label: 'Kaikki näkyvissä',
    description: 'kattava valikoima',
  },
  {
    icon: Percent,
    value: 'TAV',
    label: 'Todellinen vuosikorko',
    description: 'aina esillä',
  },
  {
    icon: ShieldCheck,
    value: '0 €',
    label: 'Ilmainen palvelu',
    description: 'ei piilokuluia',
  },
];

export default function WhyTrustUs() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="section-title">Miksi Valitse Laina?</h2>
            <p className="section-subtitle mx-auto">
              Kattava ja läpinäkyvä lainavertailu — emme piilota mitään
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TRUST_METRICS.map((metric, idx) => (
            <ScrollReveal key={metric.label} delay={idx * 100}>
              <div className="card-hover text-center p-6">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-50 mb-4">
                  <metric.icon className="h-6 w-6 text-accent" strokeWidth={1.8} />
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-accent-700 mb-1">
                  {metric.value}
                </p>
                <p className="text-sm font-semibold text-slate-900">{metric.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{metric.description}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
