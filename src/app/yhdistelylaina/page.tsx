import { Metadata } from 'next';
import Link from 'next/link';
import {
  Layers,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Info,
  Calculator,
  HelpCircle,
  AlertTriangle,
  TrendingDown,
  Clock,
  Banknote,
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

const pageTitle = 'Yhdistelylaina — Yhdistä lainasi edullisemmin';
const pageDescription =
  'Vertaa yhdistelylainoja ja yhdistä useampi laina yhdeksi edullisemmaksi lainaksi. Selvitä, milloin yhdistäminen kannattaa ja milloin ei.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/yhdistelylaina` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/yhdistelylaina`,
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
    q: 'Mikä on yhdistelylaina?',
    a: 'Yhdistelylaina tarkoittaa, että otat yhden uuden lainan, jolla maksat pois useamman vanhan lainan. Lopputuloksena sinulla on yksi laina, yksi kuukausierä ja (toivottavasti) alhaisempi kokonaiskorko. Yhdistelylainaa kutsutaan myös nimellä lainojen yhdistäminen tai velkojen konsolidointi.',
  },
  {
    q: 'Milloin yhdistelylaina kannattaa?',
    a: 'Yhdistelylaina kannattaa, jos: 1) sinulla on useita lainoja joiden korot ovat korkeammat kuin yhdistelylainan korko, 2) haluat yksinkertaistaa taloutesi hallintaa yhdellä kuukausierällä, 3) nykyisten lainojesi kuukausierät ovat liian suuret ja tarvitset hengähdystauon. Mutta: varmista, että kokonaiskorko todella laskee eikä laina-aika pitene aiheettomasti.',
  },
  {
    q: 'Milloin yhdistelylaina EI kannata?',
    a: 'Yhdistelylaina ei kannata, jos: 1) uuden lainan korko on korkeampi kuin vanhojen lainojen painotettu keskikorko, 2) pidennät laina-aikaa merkittävästi — pienempi kuukausierä, mutta korkojen kokonaissumma kasvaa, 3) yhdistelet lainoja jotka ovat pian maksettu — et säästä tarpeeksi koroissa.',
  },
  {
    q: 'Vahingoittaako yhdistelylaina luottotietojani?',
    a: 'Ei. Yhdistelylaina on normaali laina eikä vahingoita luottotietojasi. Päinvastoin — jos yhdistelet lainoja saadaksesi taloutesi hallintaan ja maksat uuden lainan ajallaan, se voi parantaa luottoprofiiliasi. Luottotietoihin voi tulla merkintä vain, jos et maksa lainaa ajallaan.',
  },
  {
    q: 'Kuinka paljon voin säästää yhdistelylainalla?',
    a: 'Säästö riippuu nykyisten lainojesi koroista, yhdistelylainan korosta ja laina-ajasta. Tyypillinen säästö on 50–200 euroa kuukaudessa. Esimerkiksi: jos sinulla on 3 lainaa yhteensä 20 000 euroa keskikorolla 15 % ja saat yhdistelylainan 8 %:n korolla, säästö voi olla yli 1 000 euroa vuodessa.',
  },
  {
    q: 'Miten yhdistelylainan hakeminen käytännössä toimii?',
    a: 'Prosessi on yksinkertainen: 1) Kartoita nykyiset lainasi ja niiden saldot, korot ja kuukausierät. 2) Hae yhdistelylainaa — monet lainanantajat tarjoavat tämän nimenomaisesti. 3) Uusi lainanantaja maksaa vanhat lainasi pois puolestasi (tai saat rahat tilille ja maksat itse). 4) Maksat jatkossa vain yhdistelylainan kuukausierää.',
  },
];

// ---------------------------------------------------------------------------
// JSON-LD
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
    { '@type': 'ListItem', position: 1, name: 'Etusivu', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Yhdistelylaina',
      item: `${SITE_URL}/yhdistelylaina`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function YhdistelylainaPage() {
  const allProducts = getProductsSortedByRate('yhdistelylaina');
  const topProducts = allProducts.slice(0, 5);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
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
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Etusivu
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium">Yhdistelylaina</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Yhdistelylaina{' '}
              <span className="block text-[#ecc94b]">
                Yhdistä lainasi edullisemmin
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Onko sinulla useampi laina? Yhdistelylainalla voit yhdistää ne
              yhdeksi ja mahdollisesti säästää koroissa. Mutta — se ei aina
              kannata. Kerromme rehellisesti milloin yhdistäminen on järkevää.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Korot alkaen</p>
                <p className="text-2xl font-bold text-white">5,0 %</p>
                <p className="text-xs text-blue-200/50 mt-1">Tod. vuosikorko</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Lainasumma</p>
                <p className="text-2xl font-bold text-white">
                  2 000–60 000
                </p>
                <p className="text-xs text-blue-200/50 mt-1">euroa</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Laina-aika</p>
                <p className="text-2xl font-bold text-white">1–15 v</p>
                <p className="text-xs text-blue-200/50 mt-1">vuotta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Miten yhdistelylaina toimii?
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                step: '1',
                title: 'Kartoita lainasi',
                desc: 'Kokoa tiedot kaikista nykyisistä lainoistasi: saldot, korot, kuukausierät ja jäljellä olevat laina-ajat.',
                icon: Layers,
              },
              {
                step: '2',
                title: 'Vertaa tarjouksia',
                desc: 'Hae yhdistelylainaa useilta lainanantajilta. Vertaa todellista vuosikorkoa ja kokonaiskustannusta.',
                icon: Calculator,
              },
              {
                step: '3',
                title: 'Vanhat lainat pois',
                desc: 'Uusi lainanantaja maksaa vanhat lainasi pois puolestasi, tai saat rahat tilillesi ja maksat itse.',
                icon: TrendingDown,
              },
              {
                step: '4',
                title: 'Yksi kuukausierä',
                desc: 'Maksat jatkossa vain yhdistelylainan kuukausierää. Yksinkertaisempaa ja mahdollisesti edullisempaa.',
                icon: CheckCircle2,
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#1a365d] mb-4">
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HONEST assessment: when it makes sense vs when it doesn't */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Milloin yhdistäminen kannattaa — ja milloin ei
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* When it makes sense */}
            <div className="rounded-xl border border-green-200 bg-green-50/50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800 mb-4">
                <CheckCircle2 className="h-5 w-5" />
                Yhdistäminen kannattaa kun...
              </h3>
              <ul className="space-y-3">
                {[
                  'Nykyisten lainojesi painotettu keskikorko on korkeampi kuin yhdistelylainan korko',
                  'Sinulla on useita lainoja ja haluat yksinkertaistaa talouden hallintaa',
                  'Kuukausierät ovat liian suuret ja tarvitset hengähdystauon (mutta ymmärrä, että pidempi laina-aika = enemmän korkoja)',
                  'Sinulla on kalliita pienlainoja tai luottokorttivelkaa korkealla korolla',
                  'Haluat kiinteän koron ja ennustettavan kuukausierän monen vaihtuvan tilalle',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-green-900">
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* When it doesn't */}
            <div className="rounded-xl border border-red-200 bg-red-50/50 p-6">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-red-800 mb-4">
                <XCircle className="h-5 w-5" />
                Yhdistäminen EI kannata kun...
              </h3>
              <ul className="space-y-3">
                {[
                  'Uuden lainan korko on korkeampi kuin vanhojen lainojen keskikorko',
                  'Pidennät laina-aikaa merkittävästi — kuukausierä laskee, mutta kokonaiskorkokustannus kasvaa',
                  'Vanhat lainasi ovat lähes maksettu — et ehdi säästää tarpeeksi koroissa',
                  'Yhdistelylainassa on isot avausmaksut tai muita piilokustannuksia',
                  'Yhdistäminen antaa tekosyyn ottaa uutta velkaa "säästyneen" tilan tilalle',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-red-900">
                    <XCircle className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Warning about extending term */}
          <div className="mt-8 max-w-4xl mx-auto rounded-xl bg-amber-50 border border-amber-200 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="text-sm text-gray-700">
                <p className="font-semibold text-gray-900 mb-1">
                  Varoitus: Pidempi laina-aika = enemmän korkoja
                </p>
                <p>
                  Yleisin sudenkuoppa yhdistelylainassa on laina-ajan pidentaminen.
                  Kuukausierä voi pienentyä, mikä tuntuu helpotukselta, mutta
                  kokonaiskorot voivat kasvaa merkittävästi. Esimerkiksi: 20 000
                  euron lainassa 10 %:n korolla — 5 vuoden ajalla maksat korkoja
                  ~5 500 euroa, 10 vuoden ajalla ~11 900 euroa.{' '}
                  <strong>Yli tuplasti enemmän korkoja.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Top providers */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Edullisimmat yhdistelylainat
              </h2>
              <p className="mt-2 text-gray-600">
                Järjestetty todellisen vuosikoron mukaan
              </p>
            </div>
            <Link
              href="/vertailu?type=yhdistelylaina"
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
                  </div>
                </div>

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

          <div className="mt-8 sm:hidden">
            <Link
              href="/vertailu?type=yhdistelylaina"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors w-full"
            >
              Vertaa kaikkia yhdistelylainoja
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Savings example */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Banknote className="h-5 w-5 text-[#38a169]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Esimerkkilaskelma: paljonko voit säästää?
              </h2>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8">
              <h3 className="font-semibold text-gray-900 mb-4">
                Tilanne: 3 erillistä lainaa, yhteensä 20 000 euroa
              </h3>

              {/* Current loans */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Nykyiset lainat
                </h4>
                <div className="space-y-2">
                  {[
                    { name: 'Kulutusluotto A', amount: '8 000 euroa', rate: '14 %', monthly: '221 euroa/kk', time: '4 v jäljellä' },
                    { name: 'Kulutusluotto B', amount: '7 000 euroa', rate: '12 %', monthly: '185 euroa/kk', time: '4 v jäljellä' },
                    { name: 'Luottokorttivelka', amount: '5 000 euroa', rate: '18 %', monthly: '151 euroa/kk', time: '4 v jäljellä' },
                  ].map((loan) => (
                    <div
                      key={loan.name}
                      className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg bg-red-50 px-4 py-3 text-sm"
                    >
                      <span className="font-medium text-gray-900">
                        {loan.name}
                      </span>
                      <span className="text-gray-600">
                        {loan.amount} | {loan.rate} | {loan.monthly}
                      </span>
                    </div>
                  ))}
                  <div className="flex items-center justify-between rounded-lg bg-red-100 px-4 py-3 text-sm font-semibold">
                    <span>Yhteensä</span>
                    <span>
                      20 000 euroa | ~14,3 % keskikorko | 557 euroa/kk
                    </span>
                  </div>
                </div>
              </div>

              {/* Consolidated loan */}
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  Yhdistelylaina
                </h4>
                <div className="rounded-lg bg-green-50 px-4 py-3 text-sm">
                  <div className="flex items-center justify-between font-semibold text-green-900">
                    <span>Yksi yhdistelylaina</span>
                    <span>20 000 euroa | 8 % | 405 euroa/kk (5 v)</span>
                  </div>
                </div>
              </div>

              {/* Savings */}
              <div className="rounded-xl bg-[#1a365d] p-5 text-white">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-blue-200">
                      Säästö kuukaudessa
                    </p>
                    <p className="text-2xl font-bold">~152 euroa/kk</p>
                  </div>
                  <div>
                    <p className="text-sm text-blue-200">
                      Säästö koroissa yhteensä*
                    </p>
                    <p className="text-2xl font-bold">~3 700 euroa</p>
                  </div>
                </div>
                <p className="mt-3 text-xs text-blue-200/70">
                  * Arvioitu säästö kun laina-aika pidetään samana (5 vuotta).
                  Laskelma on suuntaa-antava.
                </p>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <strong>Huom:</strong> Jos laina-aika pitenee 4 vuodesta 10
                  vuoteen, kuukausierä laskee (noin 243 euroa/kk), mutta
                  kokonaiskorot kasvavat noin 9 100 euroon — eli{' '}
                  <strong>maksat 2 600 euroa ENEMMÄN</strong> korkoja kuin
                  nykyisillä lainoilla. Pidä huolta, että vertaat kokonaiskorkoja,
                  älä pelkkää kuukausierää.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Usein kysytyt kysymykset yhdistelylainasta
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
            Selvitä, kannattaako yhdistelylaina sinulle
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Vertaa yhdistelylainoja ja laske paljonko voit säästää. Näytämme
            kaikki tarjoukset rehellisesti — myös haitat.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vertailu?type=yhdistelylaina"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Vertaa yhdistelylainoja
            </Link>
            <Link
              href="/kulutusluotto"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Kulutusluotot
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
              { href: '/kulutusluotto', label: 'Kulutusluotto' },
              { href: '/asuntolaina', label: 'Asuntolaina' },
              { href: '/autolaina', label: 'Autolaina' },
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
