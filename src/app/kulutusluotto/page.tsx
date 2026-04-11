import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingDown,
  Clock,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Star,
  Info,
  Banknote,
  Calculator,
  Scale,
  HelpCircle,
} from 'lucide-react';
import { getProductsSortedByRate } from '@/data/providers';
import {
  SITE_URL,
  SITE_NAME,
  INTEREST_RATE_CAP,
  COOLING_OFF_DAYS,
} from '@/lib/constants';
import { formatCurrency, formatPercentage } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Kulutusluotto — Vertaa ja löydä edullisin';
const pageDescription =
  'Vertaa kulutusluottoja rehellisesti. Näytämme kaikki kulutusluotot — korot alkaen 4,9 %. Löydä edullisin vakuudeton laina 500–60 000 euroon.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/kulutusluotto` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/kulutusluotto`,
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
// FAQ data
// ---------------------------------------------------------------------------

const faqs = [
  {
    q: 'Mikä on kulutusluotto?',
    a: 'Kulutusluotto on vakuudeton laina, jonka voi käyttää mihin tahansa tarkoitukseen — esimerkiksi remonttiin, kodinelektroniikkaan tai matkoihin. Lainalle ei tarvita vakuutta eikä takaajaa. Luotto maksetaan takaisin kuukausierissa sovitun laina-ajan kuluessa.',
  },
  {
    q: 'Mikä on todellinen vuosikorko?',
    a: 'Todellinen vuosikorko kertoo lainan kokonaiskustannuksen vuositasolla. Se sisältää nimelliskoron lisäksi kaikki lainaan liittyvät kulut, kuten avausmaksun ja kuukausimaksut. Todellinen vuosikorko on paras tapa vertailla eri lainatarjouksia keskenään, koska se kertoo lainan todellisen hinnan.',
  },
  {
    q: 'Miksi kulutusluoton korko vaihtelee niin paljon?',
    a: 'Kulutusluoton korko määräytyy luottoluokituksen, lainasumman, laina-ajan ja lainanantajan hinnoittelun perusteella. Hyvä luottoluokitus, suurempi lainasumma ja lyhyempi laina-aika johtavat yleensä edullisempaan korkoon. Markkinointi-ilmoituksissa näkyvä alin korko on usein vain parhaiden asiakkaiden hinta.',
  },
  {
    q: 'Kuinka nopeasti saan kulutusluoton?',
    a: 'Useimmat kulutusluottohakemukset käsitellään 1–3 arkipäivässä. Nopeimmillaan rahat ovat tililläsi jo samana päivänä. Verkkopankit ja fintech-yritykset ovat yleensä nopeimpia, perinteiset pankit voivat kestää muutaman päivän kauemmin.',
  },
  {
    q: 'Onko kulutusluotolla korkokatto?',
    a: `Kyllä. Suomessa kulutusluoton todellinen vuosikorko saa olla enintään ${INTEREST_RATE_CAP} %. Korkokatto on ollut pysyvä vuodesta 2023 lähtien. Lisäksi sinulla on ${COOLING_OFF_DAYS} päivän peruuttamisoikeus luottosopimuksen allekirjoittamisesta.`,
  },
  {
    q: 'Vaikuttaako kulutusluoton hakeminen luottotietoihini?',
    a: 'Pelkkä lainahakemus ei yleensä vaikuta luottotietoihisi. Luottotietoihin voi tulla merkintä vasta, jos laina myönnetään ja nostat sen. Maksuhäiriöt kirjautuvat luottotietoihin. Vertailupalvelumme käyttö ei vaikuta luottotietoihisi.',
  },
  {
    q: 'Kannattaako kulutusluotto vai luottokortti?',
    a: 'Kulutusluotto on yleensä edullisempi vaihtoehto, jos tarvitset suuremman summan (yli 1 000 euroa) ja haluat maksaa sen takaisin kuukausierissa. Luottokortti sopii paremmin pienempiin ostoksiin, jotka maksat korottomalla maksuajalla (yleensä 30–45 päivää). Luottokortin korot ovat usein 15–20 %, eli huomattavasti kulutusluottoa kalliimmat.',
  },
  {
    q: 'Voinko maksaa kulutusluoton takaisin etuajassa?',
    a: 'Kyllä. Suomen lain mukaan sinulla on aina oikeus maksaa kulutusluotto takaisin etuajassa. Useimmat lainanantajat eivät peri lisälyhennys- tai ennenaikaisen takaisinmaksun maksuja. Tarkista kuitenkin ehdot ennen lainan ottamista.',
  },
];

// ---------------------------------------------------------------------------
// JSON-LD structured data
// ---------------------------------------------------------------------------

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
};

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
      name: 'Kulutusluotto',
      item: `${SITE_URL}/kulutusluotto`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function KulutusluottoPage() {
  // Get top kulutusluotto products sorted by cheapest effective rate
  const allProducts = getProductsSortedByRate('kulutusluotto');
  const topProducts = allProducts.slice(0, 5);

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero Section */}
      <section className="relative bg-[#1a365d] overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
            backgroundSize: '40px 40px',
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Etusivu
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium">Kulutusluotto</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Kulutusluotto{' '}
              <span className="block text-[#ecc94b]">
                Vertaa ja löydä edullisin
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Vertaa {allProducts.length} kulutusluottoa {allProducts.length > 0
                ? `${new Set(allProducts.map((p) => p.provider.shortName || p.provider.name)).size} lainanantajalta`
                : ''}{' '}
              ja löydä sinulle edullisin vaihtoehto. Näytämme kaikki lainat
              puolueettomasti todellisten vuosikorkojen perusteella.
            </p>

            {/* Key stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Korot alkaen</p>
                <p className="text-2xl font-bold text-white">4,9 %</p>
                <p className="text-xs text-blue-200/50 mt-1">Tod. vuosikorko</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Lainasumma</p>
                <p className="text-2xl font-bold text-white">500–60 000</p>
                <p className="text-xs text-blue-200/50 mt-1">euroa</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Laina-aika</p>
                <p className="text-2xl font-bold text-white">1–15 v</p>
                <p className="text-xs text-blue-200/50 mt-1">vuotta</p>
              </div>
            </div>
          </div>

          {/* Interest rate cap notice */}
          <div className="mt-8 inline-flex items-start gap-3 rounded-xl bg-amber-500/10 border border-amber-400/20 px-5 py-3">
            <AlertTriangle className="h-5 w-5 text-amber-300 shrink-0 mt-0.5" />
            <p className="text-sm text-amber-100">
              <strong>Korkokatto:</strong> Kulutusluoton todellinen vuosikorko
              saa olla enintään <strong>{INTEREST_RATE_CAP} %</strong>. Tämä
              suojaa sinua kohtuuttomilta kustannuksilta.
            </p>
          </div>
        </div>
      </section>

      {/* Quick Comparison — Top 5 cheapest */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Edullisimmat kulutusluotot
              </h2>
              <p className="mt-2 text-gray-600">
                Järjestetty todellisen vuosikoron mukaan — edullisin ensin
              </p>
            </div>
            <Link
              href="/vertailu?type=kulutusluotto"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors"
            >
              Vertaa kaikkia
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#1a365d]/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  {/* Rank */}
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span
                      className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                        index === 0
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {product.provider.shortName || product.provider.name}
                        {product.provider.finFsaRegulated && (
                          <span className="inline-flex items-center gap-1 ml-2 text-[#38a169]">
                            <ShieldCheck className="h-3.5 w-3.5" />
                            <span className="text-xs">Fiva</span>
                          </span>
                        )}
                      </p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="flex flex-wrap items-center gap-6 sm:ml-auto">
                    <div>
                      <p className="text-xs text-gray-500">Tod. vuosikorko</p>
                      <p className="text-lg font-bold text-[#1a365d]">
                        {formatPercentage(product.effectiveRate.min)} –{' '}
                        {formatPercentage(product.effectiveRate.max)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Lainasumma</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(product.minAmount)} –{' '}
                        {formatCurrency(product.maxAmount)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Käsittely</p>
                      <p className="text-sm font-medium text-gray-900">
                        {product.processingTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Kuukausimaksu</p>
                      <p className="text-sm font-medium text-gray-900">
                        {product.monthlyFee
                          ? formatCurrency(product.monthlyFee)
                          : 'Ei maksua'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-3 flex flex-wrap gap-2">
                  {product.features.slice(0, 4).map((feature) => (
                    <span
                      key={feature}
                      className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

              </div>
            ))}
          </div>

          {/* Mobile CTA */}
          <div className="mt-8 sm:hidden">
            <Link
              href="/vertailu?type=kulutusluotto"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors w-full"
            >
              Vertaa kaikkia kulutusluottoja
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Section: Mikä on kulutusluotto? */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <HelpCircle className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mikä on kulutusluotto?
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Kulutusluotto on <strong>vakuudeton laina</strong>, jota voi
                käyttää mihin tahansa tarkoitukseen. Toisin kuin asuntolaina tai
                autolaina, kulutusluotto ei vaadi erillistä vakuutta tai
                takaajaa — lainanantaja myöntää luoton ainoastaan
                luottokelpoisuutesi perusteella.
              </p>

              <p>
                Suomessa kulutusluottoja tarjoavat sekä perinteiset pankit
                (Nordea, OP, Danske Bank) että niin kutsutut fintech-yritykset
                ja verkkopankit (Bank Norwegian, Bigbank, TF Bank). Tarjonta on
                laajaa, joten vertailu kannattaa aina.
              </p>

              <p>
                Kulutusluoton summat vaihtelevat tyypillisesti{' '}
                <strong>500 eurosta 60 000 euroon</strong> ja laina-ajat{' '}
                <strong>1–15 vuoteen</strong>. Korot määräytyvät yksilöllisesti
                luottoluokituksen, lainasumman ja laina-ajan perusteella.
              </p>

              <p>
                Todellinen vuosikorko on tärkein vertailuluku, koska se
                sisältää kaikki lainan kulut — nimelliskoron, avausmaksun ja
                mahdolliset kuukausimaksut. Suomessa kulutusluoton todellinen vuosikorko saa olla
                enintään {INTEREST_RATE_CAP} %.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8">
                Kulutusluoton tyypilliset käyttötarkoitukset
              </h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#38a169] shrink-0 mt-0.5" />
                  <span>
                    <strong>Kodin remontit</strong> — keittioremontti, kylpyhuone,
                    maalaus tai muu kunnostus
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#38a169] shrink-0 mt-0.5" />
                  <span>
                    <strong>Suuremmat hankinnat</strong> — kodinelektroniikka,
                    huonekalut, elektroniikka
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#38a169] shrink-0 mt-0.5" />
                  <span>
                    <strong>Haaveiden toteuttaminen</strong> — matkat, harrastukset,
                    juhlat
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#38a169] shrink-0 mt-0.5" />
                  <span>
                    <strong>Odottamattomat menot</strong> — auton korjaus,
                    hammashoito, muutto
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-[#38a169] shrink-0 mt-0.5" />
                  <span>
                    <strong>Lainojen yhdistäminen</strong> — kalliimpien lainojen
                    uudelleenrahoitus edullisemmalla korolla
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pros & Cons */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Kulutusluoton edut ja haitat
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Pros */}
            <div className="rounded-xl border border-green-200 bg-green-50/50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800 mb-4">
                <CheckCircle2 className="h-5 w-5" />
                Edut
              </h3>
              <ul className="space-y-3">
                {[
                  'Ei vaadi vakuutta eikä takaajaa',
                  'Vapaa käyttötarkoitus — käytä mihin tarvitset',
                  'Nopea hakuprosessi — jopa samana päivänä',
                  'Kiinteä korko ja ennustettava kuukausierä',
                  'Korkokatto 20 % suojaa kuluttajaa',
                  'Oikeus maksaa laina takaisin milloin vain',
                  '14 päivän peruuttamisoikeus',
                ].map((pro) => (
                  <li key={pro} className="flex items-start gap-2 text-sm text-green-900">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    {pro}
                  </li>
                ))}
              </ul>
            </div>

            {/* Cons */}
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-red-800 mb-4">
                <XCircle className="h-5 w-5" />
                Haitat
              </h3>
              <ul className="space-y-3">
                {[
                  'Korkeampi korko kuin vakuudellisissa lainoissa',
                  'Korot vaihtelevat suuresti — huonoin korko voi olla lähellä kattoa',
                  'Kuukausimaksut ja palvelumaksut lisäävät kokonaiskuluja',
                  'Helppo saatavuus voi johtaa ylivelkaantumiseen',
                  'Pienet lainasummat usein kalliimpia suhteellisesti',
                  'Ei korkovähennysoikeutta verotuksessa',
                ].map((con) => (
                  <li key={con} className="flex items-start gap-2 text-sm text-red-900">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    {con}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* When to choose kulutusluotto vs alternatives */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Scale className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Kulutusluotto vai vaihtoehto?
              </h2>
            </div>

            <p className="text-gray-700 mb-8">
              Kulutusluotto ei ole aina paras vaihtoehto. Alla vertaamme
              kulutusluottoa muihin rahoitusmuotoihin, jotta voit tehdä
              perustellun päätöksen.
            </p>

            {/* Comparison table */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1a365d] text-white">
                    <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">
                      Ominaisuus
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Kulutusluotto
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Luottokortti
                    </th>
                    <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">
                      Asuntolainan lisälaina
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Tyypillinen korko
                    </td>
                    <td className="px-4 py-3 text-gray-700">5–20 %</td>
                    <td className="px-4 py-3 text-gray-700">15–20 %</td>
                    <td className="px-4 py-3 text-gray-700">3–6 %</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Vakuus
                    </td>
                    <td className="px-4 py-3 text-gray-700">Ei tarvita</td>
                    <td className="px-4 py-3 text-gray-700">Ei tarvita</td>
                    <td className="px-4 py-3 text-gray-700">
                      Asunto vakuutena
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Nopeus
                    </td>
                    <td className="px-4 py-3 text-gray-700">1–3 päivää</td>
                    <td className="px-4 py-3 text-gray-700">Heti</td>
                    <td className="px-4 py-3 text-gray-700">1–2 viikkoa</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Summa
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      500–60 000 euroa
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      500–10 000 euroa
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      10 000+ euroa
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Parhaiten sopii
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Suuremmat hankinnat, remontti
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Pienet ostokset, päivittäinen käyttö
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Iso remontti, jos asuntolaina on jo
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#1a365d] shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">Vinkki</p>
                  <p>
                    Jos sinulla on jo asuntolaina, kysy pankistasi lisälainaa
                    ennen kulutusluoton hakemista. Vakuudellisen lisälainan korko
                    on usein merkittävästi edullisempi kuin vakuudettoman
                    kulutusluoton. Tosin lisälaina vaatii, että asunnossasi on
                    riittävästi vapaata vakuusarvoa.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tips for getting the best rate */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <TrendingDown className="h-5 w-5 text-[#38a169]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Näin saat edullisimman kulutusluoton
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: '1. Vertaa aina useita tarjouksia',
                  desc: 'Älä ota ensimmäistä tarjousta. Vertaa vähintään 3–5 eri lainanantajan tarjouksia. Todellisten vuosikorkojen ero voi olla yli 10 prosenttiyksikköä.',
                },
                {
                  title: '2. Kiinnitä huomiota todelliseen vuosikorkoon',
                  desc: 'Nimelliskorko ei kerro koko totuutta. Todellinen vuosikorko sisältää kaikki kulut. Joillakin lainanantajilla on pieni nimelliskorko mutta korkeat kuukausimaksut.',
                },
                {
                  title: '3. Valitse lyhyempi laina-aika',
                  desc: 'Mitä lyhyempi laina-aika, sitä vähemmän maksat korkoja yhteensä. 5 vuoden lainassa maksat huomattavasti vähemmän korkoja kuin 10 vuoden lainassa.',
                },
                {
                  title: '4. Pidä huolta luottotiedoistasi',
                  desc: 'Puhdas luottohistoria ja säännölliset tulot johtavat parempiin korkoihin. Maksa laskut ajallaan ja vältä maksuhäiriöitä.',
                },
                {
                  title: '5. Harkitse isompaa lainasummaa',
                  desc: 'Paradoksaalisesti isommat lainasummat saavat usein paremman koron. Jos tarvitset 8 000 euroa, 10 000 euron laina voi olla kokonaisuutena edullisempi — mutta lainaa vain sen mitä tarvitset.',
                },
              ].map((tip) => (
                <div
                  key={tip.title}
                  className="rounded-lg border border-gray-200 p-5 hover:border-[#1a365d]/20 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {tip.title}
                  </h3>
                  <p className="text-sm text-gray-600">{tip.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Usein kysytyt kysymykset kulutusluotosta
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <details
                  key={faq.q}
                  className="group rounded-xl border border-gray-200 bg-white"
                >
                  <summary className="flex cursor-pointer items-center justify-between px-6 py-4 text-left font-semibold text-gray-900 hover:bg-gray-50 rounded-xl transition-colors">
                    <span>{faq.q}</span>
                    <ArrowRight className="h-4 w-4 text-gray-400 transition-transform group-open:rotate-90" />
                  </summary>
                  <div className="px-6 pb-5 text-sm text-gray-700 leading-relaxed">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-16 bg-[#1a365d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Löydä edullisin kulutusluotto
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Vertaa kaikkia {allProducts.length} kulutusluottoa yhdellä
            sivulla. Ilmainen, kattava vertailu — ei vaikuta
            luottotietoihisi.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vertailu?type=kulutusluotto"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Vertaa kulutusluottoja
            </Link>
            <Link
              href="/lainanantajat"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Selaa lainanantajia
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Internal links */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Tutustu myös muihin lainatyyppeihin
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/asuntolaina', label: 'Asuntolaina' },
              { href: '/autolaina', label: 'Autolaina' },
              { href: '/yhdistelylaina', label: 'Yhdistelylaina' },
              { href: '/yrityslaina', label: 'Yrityslaina' },
              { href: '/pikavippi', label: 'Pikavippi' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="inline-flex items-center gap-1 rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700 hover:border-[#1a365d]/30 hover:text-[#1a365d] transition-colors"
              >
                {link.label}
                <ArrowRight className="h-3 w-3" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
