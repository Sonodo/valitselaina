import Link from 'next/link';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

const GUIDES = [
  {
    title: 'Lainaamisen perusteet',
    description:
      'Kattava opas lainan hakemiseen: mita pankit katsovat, miten parannat mahdollisuuksiasi.',
    href: '/oppaat/lainaamisen-perusteet',
    readTime: 8,
    category: 'Perusteet',
  },
  {
    title: 'Todellinen vuosikorko selitettyna',
    description:
      'Mika on todellinen vuosikorko ja miksi se on tarkein luku lainojen vertailussa?',
    href: '/oppaat/todellinen-vuosikorko',
    readTime: 6,
    category: 'Korot',
  },
  {
    title: 'Lainan kilpailutus',
    description:
      'Nain kilpailutat lainan tehokkaasti ja saastat satoja euroja kokonaiskustannuksissa.',
    href: '/oppaat/lainan-kilpailutus',
    readTime: 7,
    category: 'Saastaminen',
  },
];

export default function EducationPreview() {
  return (
    <section className="py-16 sm:py-20 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
            <div>
              <h2 className="section-title">Lainavertailun opas</h2>
              <p className="section-subtitle">
                Kattavia oppaita parempiin taloudellisiin paatoksiin
              </p>
            </div>
            <Link
              href="/oppaat"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:text-accent-600 transition-colors"
            >
              Kaikki oppaat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES.map((guide, idx) => (
            <ScrollReveal key={guide.href} delay={idx * 100}>
              <Link href={guide.href} className="group block h-full">
                <div className="card-hover p-6 h-full flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="badge badge-accent">
                      <BookOpen className="h-3 w-3" />
                      {guide.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                      <Clock className="h-3 w-3" />
                      {guide.readTime} min
                    </span>
                  </div>

                  <h3 className="text-base font-semibold text-slate-900 group-hover:text-accent transition-colors mb-2 flex-1">
                    {guide.title}
                  </h3>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">
                    {guide.description}
                  </p>

                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-accent group-hover:gap-2 transition-all">
                    Lue opas
                    <ArrowRight className="h-3.5 w-3.5" />
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
