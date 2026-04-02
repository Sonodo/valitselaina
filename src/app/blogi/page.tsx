'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Clock, ArrowRight, Tag, Calendar } from 'lucide-react';
import { blogPosts, BLOG_CATEGORIES } from '@/data/blog-posts';

// Category filter tabs
const categoryTabs = [
  { key: 'all', label: 'Kaikki' },
  ...Object.entries(BLOG_CATEGORIES).map(([key, label]) => ({ key, label })),
];

// Format date to Finnish
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('fi-FI', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

export default function BlogiPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredPosts = useMemo(() => {
    if (activeCategory === 'all') return blogPosts;
    return blogPosts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
            Blogi
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Ajankohtaisia artikkeleita lainoista, koroista ja taloudenhallinnasta.
            Puolueetonta tietoa, joka auttaa tekemaan parempia rahoituspäätöksiä.
          </p>
        </div>

        {/* Category filter tabs */}
        <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Suodata kategorian mukaan">
          {categoryTabs.map((tab) => {
            const isActive = activeCategory === tab.key;
            const count =
              tab.key === 'all'
                ? blogPosts.length
                : blogPosts.filter((p) => p.category === tab.key).length;
            return (
              <button
                key={tab.key}
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveCategory(tab.key)}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? 'bg-[#1a365d] text-white shadow-sm'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                }`}
              >
                {tab.label}
                <span
                  className={`ml-0.5 text-xs rounded-full px-1.5 py-0.5 ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-gray-100 text-gray-500'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Results count */}
        <p className="text-sm text-gray-500 mb-6">
          {filteredPosts.length} artikkelia
          {activeCategory !== 'all' && (
            <> ({BLOG_CATEGORIES[activeCategory]})</>
          )}
        </p>

        {/* Blog post grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blogi/${post.slug}`}
                className="group rounded-xl border border-gray-200 bg-white p-6 hover:shadow-md hover:border-[#1a365d]/20 transition-all flex flex-col"
              >
                {/* Category + reading time */}
                <div className="flex items-center justify-between mb-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-[#1a365d]/5 px-2.5 py-0.5 text-xs font-medium text-[#1a365d]">
                    <Tag className="h-3 w-3" />
                    {BLOG_CATEGORIES[post.category] || post.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <Clock className="h-3 w-3" />
                    {post.readTime} min
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-lg font-semibold text-gray-900 group-hover:text-[#1a365d] transition-colors mb-2 flex-1">
                  {post.title}
                </h2>

                {/* Description */}
                <p className="text-sm text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {post.description}
                </p>

                {/* Footer: date + read more */}
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100">
                  <span className="inline-flex items-center gap-1 text-xs text-gray-400">
                    <Calendar className="h-3 w-3" />
                    {formatDate(post.publishedAt)}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#1a365d] group-hover:gap-2 transition-all">
                    Lue lisää
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-2">
              Ei artikkeleita tässä kategoriassa.
            </p>
            <button
              onClick={() => setActiveCategory('all')}
              className="mt-4 inline-flex items-center rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
            >
              Näytä kaikki artikkelit
            </button>
          </div>
        )}
      </div>
    </>
  );
}
