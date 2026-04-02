import Link from 'next/link';
import {
  Calculator,
  RefreshCw,
  Layers,
  Wallet,
  Home,
  FileSpreadsheet,
} from 'lucide-react';

const tools = [
  {
    name: 'Lainanlaskuri',
    description:
      'Laske kuukausierä, kokonaiskulut ja korot. Näe lyhennyssuunnitelma ja visuaalinen erittely.',
    href: '/tyokalut/lainanlaskuri',
    icon: Calculator,
    color: 'bg-blue-50 text-blue-600',
    popular: true,
  },
  {
    name: 'Asuntolainanlaskuri',
    description:
      'Laske asuntolainan kuukausierä marginaalilla ja Euribor-korolla. Stressitesti koronnousulle.',
    href: '/tyokalut/asuntolainanlaskuri',
    icon: Home,
    color: 'bg-emerald-50 text-emerald-600',
    popular: true,
  },
  {
    name: 'Jälleenrahoituslaskuri',
    description:
      'Selvitä kannattaako lainan uudelleenrahoitus. Vertaa nykyistä ja uutta lainaa rinnakkain.',
    href: '/tyokalut/jalleenrahoitus',
    icon: RefreshCw,
    color: 'bg-amber-50 text-amber-600',
    popular: false,
  },
  {
    name: 'Yhdistelylaskuri',
    description:
      'Yhdistä useampi laina yhdeksi. Rehellinen laskelma — näytämme myös jos kokonaiskorko kasvaa.',
    href: '/tyokalut/yhdistelylaskuri',
    icon: Layers,
    color: 'bg-purple-50 text-purple-600',
    popular: false,
  },
  {
    name: 'Maksukykylaskuri',
    description:
      'Selvitä kuinka paljon lainaa voit saada tulojesi perusteella. Sisältää stressitestin koronnousulle.',
    href: '/tyokalut/maksukyky',
    icon: Wallet,
    color: 'bg-rose-50 text-rose-600',
    popular: false,
  },
  {
    name: 'Lyhennyssuunnitelma',
    description:
      'Luo yksityiskohtainen lyhennyssuunnitelma annuiteetilla tai tasalyhennyksellä. Vie CSV-tiedostoksi.',
    href: '/tyokalut/lyhennyssuunnitelma',
    icon: FileSpreadsheet,
    color: 'bg-teal-50 text-teal-600',
    popular: false,
  },
];

export default function TyokalutPage() {
  return (
    <div className="bg-[#f7fafc] min-h-screen">
      {/* Header Section */}
      <section className="bg-[#1a365d] py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Lainalaskurit ja työkalut
            </h1>
            <p className="mt-4 text-lg text-blue-100/90 max-w-2xl mx-auto">
              Ilmaiset laskurit, jotka auttavat sinua tekemään parempia
              taloudellisia päätöksiä. Kaikki laskelmat ovat suuntaa-antavia.
            </p>
          </div>
        </div>
      </section>

      {/* Tools Grid */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group relative bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md hover:border-[#1a365d]/30 transition-all duration-200"
            >
              {tool.popular && (
                <span className="absolute -top-2.5 right-4 inline-flex items-center rounded-full bg-[#ecc94b] px-2.5 py-0.5 text-xs font-semibold text-[#1a365d]">
                  Suosittu
                </span>
              )}
              <div
                className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${tool.color} mb-4`}
              >
                <tool.icon className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#1a365d] transition-colors">
                {tool.name}
              </h2>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {tool.description}
              </p>
              <span className="mt-4 inline-flex items-center text-sm font-medium text-[#1a365d] group-hover:translate-x-1 transition-transform">
                Avaa laskuri &rarr;
              </span>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl border border-gray-200 p-8 sm:p-10 shadow-sm max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900">
              Haluatko vertailla lainoja?
            </h2>
            <p className="mt-2 text-gray-600">
              Laskureiden lisäksi voit vertailla oikeita lainatarjouksia yli 28
              lainanantajalta.
            </p>
            <Link
              href="/vertailu"
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-[#1a365d] px-6 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors"
            >
              Vertaa lainoja
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
