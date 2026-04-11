import { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { guides } from '@/data/guides';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Oppaat — Lainaamisen tietopankki';
const pageDescription =
  'Kattavat oppaat lainaamiseen, korkoihin, luottotietoihin, velkojen hallintaan ja kuluttajan oikeuksiin. Opi tekemään parempia taloudellisia päätöksiä.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/oppaat` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/oppaat`,
    siteName: SITE_NAME,
    locale: 'fi_FI',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: pageTitle,
    description: pageDescription,
  },
};

// ---------------------------------------------------------------------------
// Category badge colors
// ---------------------------------------------------------------------------

const categoryColors: Record<string, string> = {
  Perusteet: 'bg-blue-50 text-blue-700',
  Korot: 'bg-amber-50 text-amber-700',
  Säästäminen: 'bg-green-50 text-green-700',
  Velanhoito: 'bg-rose-50 text-rose-700',
  Asuntolainat: 'bg-violet-50 text-violet-700',
  Oikeudet: 'bg-teal-50 text-teal-700',
};

function getCategoryColor(category: string): string {
  return categoryColors[category] ?? 'bg-gray-50 text-gray-700';
}

// ---------------------------------------------------------------------------
// JSON-LD CollectionPage structured data
// ---------------------------------------------------------------------------

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: pageTitle,
  description: pageDescription,
  url: `${SITE_URL}/oppaat`,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  mainEntity: {
    '@type': 'ItemList',
    itemListElement: guides.map((guide, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      url: `${SITE_URL}/oppaat/${guide.slug}`,
      name: guide.title,
    })),
  },
};

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default function OppaatPage() {
  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-[#1a365d] text-white py-14 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <nav aria-label="Murupolku" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white/80 transition-colors">
                    Etusivu
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white/90 font-medium">Oppaat</li>
              </ol>
            </nav>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
              Lainaamisen tietopankki
            </h1>
            <p className="mt-4 text-lg sm:text-xl text-white/80 leading-relaxed">
              Kattavia oppaita, jotka auttavat sinua tekemään
              parempia taloudellisia päätöksiä. Kaikki oppaat on kirjoitettu
              selkeällä suomella — ilman jargonia.
            </p>
          </div>
        </div>
      </section>

      {/* Guide grid */}
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <Link
                key={guide.slug}
                href={`/oppaat/${guide.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 hover:shadow-lg hover:border-[#1a365d]/20 transition-all flex flex-col"
              >
                {/* Category + reading time */}
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(guide.category)}`}
                  >
                    <BookOpen className="h-3 w-3" />
                    {guide.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {guide.readTime} min
                  </span>
                </div>

                {/* Title + description */}
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#1a365d] transition-colors mb-2">
                  {guide.title}
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed mb-5 flex-1">
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

      {/* CTA */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Valmis vertailemaan lainoja?
          </h2>
          <p className="text-gray-600 mb-8">
            Kun olet perehtynyt oppaisiin, olet valmis tekemään fiksun
            lainapäätöksen. Vertaa lainoja ja löydä edullisin vaihtoehto.
          </p>
          <Link
            href="/vertailu"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 text-white font-semibold hover:bg-[#2a4a7f] transition-colors"
          >
            Vertaa lainoja
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
