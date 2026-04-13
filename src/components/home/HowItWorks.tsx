import { SlidersHorizontal, BarChart3, Send } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const STEPS = [
  {
    number: '1',
    icon: SlidersHorizontal,
    title: 'Valitse lainatyyppi',
    description:
      'Valitse haluamasi lainasumma ja laina-aika. Voit vertailla kulutusluottoja, asuntolainoja ja muita lainatyyppejä.',
  },
  {
    number: '2',
    icon: BarChart3,
    title: 'Vertaile tarjoajia',
    description:
      'Näet lainat yhdellä sivulla puolueettomasti — järjestys perustuu todelliseen vuosikorkoon.',
  },
  {
    number: '3',
    icon: Send,
    title: 'Hae lainaa',
    description:
      'Valitse sopivin laina ja siirry hakemaan sitä suoraan lainanantajan sivuille. Emme tee luottopäätöksiä.',
  },
];

export default function HowItWorks() {
  return (
    <section id="miten-se-toimii" className="py-16 sm:py-20 bg-accent-50/50">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 lg:mb-16">
            <h2 className="section-title">Näin vertailu toimii</h2>
            <p className="section-subtitle mx-auto">
              Kolme yksinkertaista askelta edullisimpaan lainaan
            </p>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-3 gap-8 lg:gap-12">
          {STEPS.map((step, idx) => (
            <ScrollReveal key={step.number} delay={idx * 150}>
              <div className="relative text-center">
                {/* Connector line (desktop) */}
                {idx < STEPS.length - 1 && (
                  <div
                    className="hidden sm:block absolute top-10 left-[calc(50%+2.5rem)] w-[calc(100%-5rem)] h-[2px] bg-gradient-to-r from-accent-200 to-accent-100"
                    aria-hidden="true"
                  />
                )}

                {/* Number circle */}
                <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-accent-50 mb-5">
                  <step.icon className="h-8 w-8 text-accent" strokeWidth={1.8} />
                  <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-accent text-xs font-bold text-white shadow-sm">
                    {step.number}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-slate-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed max-w-xs mx-auto">
                  {step.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
