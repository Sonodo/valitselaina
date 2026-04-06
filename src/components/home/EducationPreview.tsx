import Link from 'next/link';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';

const GUIDES = [
  {
    title: 'Lainaamisen perusteet',
    description:
      'Kattava opas lainan hakemiseen: mitä pankit katsovat, miten parannat mahdollisuuksiasi ja mitä asiakirjoja tarvitset.',
    href: '/oppaat/lainaamisen-perusteet',
    readTime: 8,
    category: 'Perusteet',
  },
  {
    title: 'Todellinen vuosikorko selitettynä',
    description:
      'Mikä on todellinen vuosikorko, miten se lasketaan ja miksi se on tärkein luku lainojen vertailussa?',
    href: '/oppaat/todellinen-vuosikorko',
    readTime: 6,
    category: 'Korot',
  },
  {
    title: 'Lainan kilpailutus',
    description:
      'Näin kilpailutat lainan tehokkaasti ja säästät satoja tai tuhansia euroja lainan kokonaiskustannuksissa.',
    href: '/oppaat/lainan-kilpailutus',
    readTime: 7,
    category: 'Säästäminen',
  },
  {
    title: 'Velkojen yhdistely ja hallinta',
    description:
      'Jos velat ovat kasvaneet hallitsemattomiksi, tässä oppaassa kerrotaan kaikki vaihtoehdot: yhdistelylainasta velkajärjestelyyn.',
    href: '/oppaat/velkojen-yhdistely',
    readTime: 10,
    category: 'Velanhoito',
  },
];

export default function EducationPreview() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              Opi lainaamisesta
            </h2>
            <p className="mt-2 text-gray-600">
              Puolueettomia oppaita, jotka auttavat tekemään parempia
              taloudellisia päätöksiä
            </p>
          </div>
          <Link
            href="/oppaat"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a365d] hover:text-[#2a4a7f] transition-colors"
          >
            Kaikki oppaat
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Guide cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {GUIDES.map((guide) => (
            <Link
              key={guide.href}
              href={guide.href}
              className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-[#1a365d]/20 transition-all flex flex-col"
            >
              {/* Category + reading time */}
              <div className="flex items-center justify-between mb-3">
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1a365d]/5 px-2.5 py-0.5 text-xs font-medium text-[#1a365d]">
                  <BookOpen className="h-3 w-3" />
                  {guide.category}
                </span>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {guide.readTime} min
                </span>
              </div>

              {/* Content */}
              <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#1a365d] transition-colors mb-2 flex-1">
                {guide.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {guide.description}
              </p>

              {/* Read more */}
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a365d] group-hover:gap-2 transition-all">
                Lue opas
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
