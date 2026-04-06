import { SlidersHorizontal, BarChart3, Eye, ExternalLink } from 'lucide-react';

const STEPS = [
  {
    number: '1',
    icon: SlidersHorizontal,
    title: 'Valitse lainasumma',
    description:
      'Valitse haluamasi lainasumma ja laina-aika. Voit vertailla kaikkia lainatyyppejä.',
  },
  {
    number: '2',
    icon: BarChart3,
    title: 'Vertaa tarjouksia',
    description:
      'Näet kaikki lainat yhdellä sivulla — myös ne, joista emme saa komissiota.',
  },
  {
    number: '3',
    icon: Eye,
    title: 'Näe todelliset kulut',
    description:
      'Todellinen vuosikorko kertoo lainan oikean hinnan. Emme piilota kuluja.',
  },
  {
    number: '4',
    icon: ExternalLink,
    title: 'Hae suoraan lainanantajalta',
    description:
      'Valitse sopivin laina ja siirry hakemaan sitä suoraan lainanantajan sivuille.',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Näin vertailu toimii
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Neljä yksinkertaista askelta edullisimpaan lainaan
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="relative text-center">
              {/* Connector line (desktop only, between steps) */}
              {idx < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-10 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-[2px] bg-gray-200"
                  aria-hidden="true"
                />
              )}

              {/* Icon circle */}
              <div className="relative mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1a365d]/5 mb-5">
                <step.icon className="h-8 w-8 text-[#1a365d]" strokeWidth={1.8} />
                <span className="absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#1a365d] text-xs font-bold text-white">
                  {step.number}
                </span>
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-gray-900 mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
