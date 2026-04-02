import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { BookOpen, ArrowRight, Clock, ArrowLeft } from 'lucide-react';
import { guides, getGuideBySlug, getRelatedGuides } from '@/data/guides';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Static params — pre-render all guides at build time
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }));
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    alternates: { canonical: `${SITE_URL}/oppaat/${guide.slug}` },
    openGraph: {
      title: guide.title,
      description: guide.description,
      url: `${SITE_URL}/oppaat/${guide.slug}`,
      siteName: SITE_NAME,
      locale: 'fi_FI',
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: guide.title,
      description: guide.description,
    },
  };
}

// ---------------------------------------------------------------------------
// Category badge colors (mirrored from index page)
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
// Page component
// ---------------------------------------------------------------------------

export default async function GuidePage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();

  const relatedGuides = getRelatedGuides(guide);

  // JSON-LD Article structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    url: `${SITE_URL}/oppaat/${guide.slug}`,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/oppaat/${guide.slug}`,
    },
    articleSection: guide.category,
    wordCount: guide.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
  };

  // JSON-LD BreadcrumbList
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Etusivu',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Oppaat',
        item: `${SITE_URL}/oppaat`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: guide.title,
        item: `${SITE_URL}/oppaat/${guide.slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero / header */}
      <section className="bg-[#1a365d] text-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Breadcrumb */}
            <nav aria-label="Murupolku" className="mb-6">
              <ol className="flex items-center gap-1.5 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white/80 transition-colors">
                    Etusivu
                  </Link>
                </li>
                <li>/</li>
                <li>
                  <Link href="/oppaat" className="hover:text-white/80 transition-colors">
                    Oppaat
                  </Link>
                </li>
                <li>/</li>
                <li className="text-white/90 font-medium truncate max-w-[200px] sm:max-w-none">
                  {guide.title.split('—')[0].trim()}
                </li>
              </ol>
            </nav>

            {/* Category + reading time */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2.5 py-0.5 text-xs font-medium text-white/90">
                <BookOpen className="h-3 w-3" />
                {guide.category}
              </span>
              <span className="inline-flex items-center gap-1 text-sm text-white/60">
                <Clock className="h-3.5 w-3.5" />
                {guide.readTime} min lukuaika
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight leading-tight">
              {guide.title}
            </h1>
            <p className="mt-4 text-lg text-white/75 leading-relaxed">
              {guide.description}
            </p>
          </div>
        </div>
      </section>

      {/* Content area with sidebar */}
      <section className="py-10 sm:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
            {/* Mobile table of contents */}
            <div className="lg:hidden mb-8">
              <details className="rounded-xl border border-gray-200 bg-white p-4">
                <summary className="font-semibold text-gray-900 cursor-pointer select-none">
                  Sisällysluettelo
                </summary>
                <nav className="mt-3">
                  <ul className="space-y-1.5">
                    {guide.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block text-sm text-gray-600 hover:text-[#1a365d] transition-colors ${
                            item.level === 3 ? 'pl-4' : ''
                          }`}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </details>
            </div>

            {/* Article content */}
            <article
              className="prose prose-gray max-w-none
                prose-headings:scroll-mt-24
                prose-h2:text-xl prose-h2:sm:text-2xl prose-h2:font-bold prose-h2:text-gray-900 prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-lg prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-6 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-4
                prose-li:text-gray-700 prose-li:leading-relaxed
                prose-a:text-[#1a365d] prose-a:font-medium prose-a:underline prose-a:underline-offset-2 hover:prose-a:text-[#2a4a7f]
                prose-strong:text-gray-900
                prose-ul:my-4 prose-ol:my-4
                [&_ul]:list-disc [&_ul]:pl-6
                [&_ol]:list-decimal [&_ol]:pl-6"
              dangerouslySetInnerHTML={{ __html: guide.content }}
            />

            {/* Desktop table of contents sidebar */}
            <aside className="hidden lg:block">
              <div className="sticky top-8">
                <nav className="rounded-xl border border-gray-200 bg-white p-5">
                  <h2 className="text-sm font-bold text-gray-900 uppercase tracking-wider mb-4">
                    Sisällysluettelo
                  </h2>
                  <ul className="space-y-2">
                    {guide.tableOfContents.map((item) => (
                      <li key={item.id}>
                        <a
                          href={`#${item.id}`}
                          className={`block text-sm text-gray-600 hover:text-[#1a365d] transition-colors leading-snug ${
                            item.level === 3 ? 'pl-3 text-xs' : ''
                          }`}
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                {/* CTA in sidebar */}
                <div className="mt-6 rounded-xl bg-[#1a365d] p-5 text-white">
                  <h3 className="font-semibold mb-2">Vertaa lainoja</h3>
                  <p className="text-sm text-white/75 mb-4">
                    Löydä edullisin laina juuri sinun tarpeisiisi.
                  </p>
                  <Link
                    href="/vertailu"
                    className="inline-flex items-center gap-1.5 rounded-lg bg-white text-[#1a365d] px-4 py-2 text-sm font-semibold hover:bg-gray-100 transition-colors"
                  >
                    Vertaile nyt
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* Related guides */}
      {relatedGuides.length > 0 && (
        <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">
              Aiheeseen liittyvät oppaat
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {relatedGuides.map((related) => (
                <Link
                  key={related.slug}
                  href={`/oppaat/${related.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-[#1a365d]/20 transition-all flex flex-col"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${getCategoryColor(related.category)}`}
                    >
                      <BookOpen className="h-3 w-3" />
                      {related.category}
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                      <Clock className="h-3 w-3" />
                      {related.readTime} min
                    </span>
                  </div>
                  <h3 className="text-base font-semibold text-gray-900 group-hover:text-[#1a365d] transition-colors mb-2 flex-1">
                    {related.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed mb-4">
                    {related.description}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a365d] group-hover:gap-2 transition-all">
                    Lue opas
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-100">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
            Valmis vertailemaan lainoja?
          </h2>
          <p className="text-gray-600 mb-6">
            Nyt kun ymmärrät lainaamisen periaatteet, löydä edullisin laina
            sinun tarpeisiisi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/vertailu"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 text-white font-semibold hover:bg-[#2a4a7f] transition-colors"
            >
              Vertaa lainoja
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/oppaat"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Kaikki oppaat
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
