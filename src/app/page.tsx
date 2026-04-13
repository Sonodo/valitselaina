import type { Metadata } from 'next';
import { providers, getMarketStats } from '@/data/providers';
import { blogPosts } from '@/data/blog-posts';
import HomeContent from './home-content';

export const metadata: Metadata = {
  title: 'Valitse Laina — Vertaa lainoja rehellisesti | Löydä edullisin laina',
  description:
    'Vertaa kulutusluottoja, asuntolainoja ja autolainoja puolueettomasti. Järjestys perustuu todelliseen vuosikorkoon ja ajantasaiseen dataan. Ilmainen ja riippumaton.',
  alternates: { canonical: 'https://valitselaina.fi' },
};

export default function HomePage() {
  const stats = getMarketStats();
  const latestPosts = blogPosts
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 3);

  return (
    <HomeContent
      totalProviders={stats.totalProviders}
      totalProducts={stats.totalProducts}
      minRate={stats.rateRange.min}
      maxLoanAmount={stats.maxLoanAmount}
      providers={providers.map((p) => ({
        id: p.id,
        name: p.name,
        shortName: p.shortName,
        slug: p.slug,
        type: p.type,
      }))}
      latestPosts={latestPosts.map((post) => ({
        slug: post.slug,
        title: post.title,
        description: post.description,
        category: post.category,
        publishedAt: post.publishedAt,
        readTime: post.readTime,
      }))}
    />
  );
}
