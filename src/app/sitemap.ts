import type { MetadataRoute } from 'next';
import { providers } from '@/data/providers';

const BASE_URL = 'https://lainavertailu.fi';

// Guide slugs — must match /src/data/guides.ts
const guideSlugs = [
  'lainaamisen-perusteet',
  'todellinen-vuosikorko',
  'luottotiedot-suomessa',
  'lainan-kilpailutus',
  'velkojen-yhdistely',
  'asuntolaina-ensiostajalle',
  'kuluttajan-oikeudet',
  'velan-hallinta',
];

// Blog post slugs — must match /src/data/blog-posts.ts
const blogSlugs = [
  'lainavertailu-2026',
  'kulutusluotto-vai-luottokortti',
  'asuntolainan-marginaali-2026',
  'positiivinen-luottorekisteri',
  'lainan-takaisinmaksu-etuajassa',
  'pikalaina-vai-kulutusluotto',
  'euribor-ennuste-2026',
  'yhdistelylaina-pelasta-vai-loukku',
  'autolaina-vai-osamaksu',
  'lainahakemus-hylatty',
  'yrityslaina-aloittavalle',
  'lainan-korko-verovahennys',
];

// Tool page slugs
const toolSlugs = [
  'lainanlaskuri',
  'maksukyky',
  'asuntolainanlaskuri',
  'yhdistelylaskuri',
  'lyhennyssuunnitelma',
  'jalleenrahoitus',
];

// Info page paths
const infoPages = [
  '/tietoa',
  '/menetelma',
  '/yhteystiedot',
  '/tietosuoja',
  '/kayttoehdot',
  '/evasteet',
  '/media',
];

// Loan type pages
const loanTypes = [
  '/kulutusluotto',
  '/asuntolaina',
  '/autolaina',
  '/yhdistelylaina',
  '/yrityslaina',
  '/pikavippi',
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // Core pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/vertailu`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 0.95,
    },
  ];

  // Loan type pages
  const loanTypePages: MetadataRoute.Sitemap = loanTypes.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Provider pages
  const providerIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/lainanantajat`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const providerPages: MetadataRoute.Sitemap = providers.map((p) => ({
    url: `${BASE_URL}/lainanantajat/${p.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Guide pages
  const guideIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/oppaat`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${BASE_URL}/oppaat/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  // Blog pages
  const blogIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blogi`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE_URL}/blogi/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Tool pages
  const toolIndex: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/tyokalut`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  const toolPages: MetadataRoute.Sitemap = toolSlugs.map((slug) => ({
    url: `${BASE_URL}/tyokalut/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  // Info pages
  const infoPageEntries: MetadataRoute.Sitemap = infoPages.map((path) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.4,
  }));

  return [
    ...corePages,
    ...loanTypePages,
    ...providerIndex,
    ...providerPages,
    ...guideIndex,
    ...guidePages,
    ...blogIndex,
    ...blogPages,
    ...toolIndex,
    ...toolPages,
    ...infoPageEntries,
  ];
}
