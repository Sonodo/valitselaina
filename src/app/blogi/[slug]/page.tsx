import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Clock, Calendar, ArrowLeft, ArrowRight, Tag, User } from 'lucide-react';
import { blogPosts, BLOG_CATEGORIES } from '@/data/blog-posts';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

// Static params for all blog posts
export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Dynamic metadata per post
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return { title: 'Artikkelia ei löytynyt' };

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      locale: 'fi_FI',
      url: `${SITE_URL}/blogi/${post.slug}`,
      siteName: SITE_NAME,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt || post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
    alternates: {
      canonical: `${SITE_URL}/blogi/${post.slug}`,
    },
  };
}

// Format date to Finnish
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fi-FI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

// Get related posts (same category, excluding current, max 3)
function getRelatedPosts(currentSlug: string, category: string) {
  const sameCat = blogPosts.filter(
    (p) => p.category === category && p.slug !== currentSlug,
  );
  if (sameCat.length >= 3) return sameCat.slice(0, 3);
  // Fill with posts from other categories
  const others = blogPosts.filter(
    (p) => p.slug !== currentSlug && !sameCat.includes(p),
  );
  return [...sameCat, ...others].slice(0, 3);
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post.slug, post.category);

  // JSON-LD Article structured data
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    author: {
      '@type': 'Organization',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/logo.png`,
      },
    },
    datePublished: post.publishedAt,
    dateModified: post.updatedAt || post.publishedAt,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blogi/${post.slug}`,
    },
    wordCount: post.readTime * 150,
    keywords: post.tags.join(', '),
    inLanguage: 'fi',
    isAccessibleForFree: true,
  };

  // BreadcrumbList structured data
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
        name: 'Artikkelit',
        item: `${SITE_URL}/blogi`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blogi/${post.slug}`,
      },
    ],
  };

  return (
    <>
      {/* JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbJsonLd),
        }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500" aria-label="Murupolku">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#1a365d] transition-colors">
                Etusivu
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li>
              <Link href="/blogi" className="hover:text-[#1a365d] transition-colors">
                Artikkelit
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-700 font-medium truncate max-w-[250px] sm:max-w-none">
              {post.title}
            </li>
          </ol>
        </nav>

        <div className="grid lg:grid-cols-[1fr_320px] gap-10">
          {/* Main article */}
          <article className="min-w-0">
            {/* Article header */}
            <header className="mb-8">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <Link
                  href={`/blogi?kategoria=${post.category}`}
                  className="inline-flex items-center gap-1 rounded-full bg-[#1a365d]/5 px-3 py-1 text-xs font-medium text-[#1a365d] hover:bg-[#1a365d]/10 transition-colors"
                >
                  <Tag className="h-3 w-3" />
                  {BLOG_CATEGORIES[post.category] || post.category}
                </Link>
                <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                  <Clock className="h-3 w-3" />
                  {post.readTime} min lukuaika
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {post.title}
              </h1>

              <p className="text-lg text-gray-600 mb-5">
                {post.description}
              </p>

              {/* Author + reading time row */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 pb-6 border-b border-gray-200">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4" />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {post.readTime} min lukuaika
                </span>
              </div>
            </header>

            {/* Article content */}
            <div
              className="prose prose-gray prose-lg max-w-none
                prose-headings:text-gray-900 prose-headings:font-bold
                prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                prose-p:text-gray-700 prose-p:leading-relaxed
                prose-li:text-gray-700
                prose-strong:text-gray-900
                prose-a:text-[#1a365d] prose-a:font-semibold hover:prose-a:text-[#2a4a7f]
                prose-ul:my-4 prose-ol:my-4
              "
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            <div className="mt-10 pt-6 border-t border-gray-200">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-sm font-medium text-gray-500 mr-1">Aiheet:</span>
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Back to blog */}
            <div className="mt-8">
              <Link
                href="/blogi"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a365d] hover:text-[#2a4a7f] transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Kaikki artikkelit
              </Link>
            </div>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* CTA card */}
            <div className="rounded-xl bg-[#1a365d] p-6 text-white">
              <h3 className="text-lg font-bold mb-2">Vertaa lainoja nyt</h3>
              <p className="text-sm text-blue-100 mb-4">
                Löydä edullisin laina vertailemalla eri lainanantajien tarjouksia
                yhdellä haulla.
              </p>
              <Link
                href="/vertailu"
                className="inline-flex items-center gap-1.5 rounded-lg bg-white px-4 py-2.5 text-sm font-semibold text-[#1a365d] hover:bg-gray-100 transition-colors w-full justify-center"
              >
                Aloita vertailu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Related posts */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-base font-bold text-gray-900 mb-4">
                Aiheeseen liittyvät artikkelit
              </h3>
              <div className="space-y-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blogi/${related.slug}`}
                    className="group block"
                  >
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400 mb-1">
                      <Clock className="h-3 w-3" />
                      {related.readTime} min
                    </span>
                    <h4 className="text-sm font-semibold text-gray-800 group-hover:text-[#1a365d] transition-colors leading-snug">
                      {related.title}
                    </h4>
                    {related !== relatedPosts[relatedPosts.length - 1] && (
                      <div className="mt-3 border-b border-gray-100" />
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Author info */}
            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <h3 className="text-base font-bold text-gray-900 mb-2">
                Tietoa kirjoittajasta
              </h3>
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-[#1a365d]/10 flex items-center justify-center flex-shrink-0">
                  <User className="h-5 w-5 text-[#1a365d]" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {post.author}
                  </p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                    Valitse Lainan toimitustiimi tuottaa kattavaa ja
                    tutkittua sisältöä lainoista, koroista ja
                    taloudenhallinnasta.
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
