import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Info,
  Calculator,
  HelpCircle,
  AlertTriangle,
  Banknote,
  Wrench,
  Leaf,
  Building2,
  Receipt,
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

const pageTitle = 'Remonttilaina — Vertaa rahoitusvaihtoehtoja remonttiin';
const pageDescription =
  'Vertaa remonttilainoja ja löydä edullisin rahoitus kodin remonttiin. Kattava opas: kotitalousvähennys, taloyhtiölaina, energiaremonttituet ja lainakorot.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/remonttilaina` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/remonttilaina`,
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
    q: 'Mikä on remonttilaina?',
    a: 'Remonttilaina tarkoittaa lainaa, joka otetaan kodin remonttia varten. Erillistä "remonttilaina"-tuotetta ei yleensä ole, vaan remonttiin käytetään tavallista kulutusluottoa, asuntolainan lisälainaa tai taloyhtiölainaa. Rahoitusmuodon valinta riippuu remontin koosta, asumismuodosta ja omasta taloudellisesta tilanteesta.',
  },
  {
    q: 'Paljonko remonttilainan korko on?',
    a: 'Remonttilainan korko riippuu siitä, minkä tyyppisellä lainalla remontti rahoitetaan. Vakuudettoman kulutusluoton todellinen vuosikorko on tyypillisesti 5–15 %, kun taas asuntolainan lisälaina voi olla 3–6 %. Taloyhtiölainan korko on yleensä 3–5 %. Kulutusluoton korkokatto Suomessa on 20 %.',
  },
  {
    q: 'Kannattaako remonttiin ottaa lainaa vai säästää?',
    a: 'Riippuu tilanteesta. Jos remontti on kiireellinen (esim. vesivahinko, homekorjaus), laina on usein ainoa vaihtoehto. Ei-kiireellisissä remonteissa säästäminen on yleensä edullisempaa, koska vältyt koronmaksulta. Toisaalta energiaremontti voi tuoda välittömiä säästöjä lämmityskuluissa, jolloin laina voi maksaa itsensä osittain takaisin.',
  },
  {
    q: 'Miten kotitalousvähennys toimii remonteissa?',
    a: 'Vuonna 2026 kotitalousvähennys on enintään 2 250 euroa henkilöltä vuodessa. Vähennys on 40 % työn osuudesta (ei materiaalit) tavallisissa remonteissa. Omavastuu on 100 euroa per henkilö. Pariskunta voi saada yhteensä jopa 4 500 euroa vähennystä. Työn tekijän on oltava ennakkoperintärekisterissä oleva yritys.',
  },
  {
    q: 'Voiko taloyhtiölainalla rahoittaa remontin?',
    a: 'Kyllä, jos remontti on taloyhtiön päättämä (esim. putkiremontti, julkisivuremontti, hissiremontti). Taloyhtiölainassa taloyhtiö ottaa lainan ja osakkaiden rahoitusvastike kattaa lainanlyhennykset. Osakkaan ei tarvitse hakea omaa lainaa. Vaihtoehtoisesti osakas voi maksaa oman osuutensa kerralla pois.',
  },
  {
    q: 'Saako energiaremonttiin tukea?',
    a: 'ARA (Asumisen rahoitus- ja kehittämiskeskus) myöntää energia-avustuksia asuinrakennusten energiatehokkuuden parantamiseen. Tuki on tyypillisesti 10–15 % hyväksytyistä kustannuksista. Suurempia tukia voi saada, jos remontti parantaa energialuokkaa merkittävästi. Lisäksi kotitalousvähennys koskee myös energiaremontin työkustannuksia.',
  },
  {
    q: 'Kuinka suuri remonttilaina kannattaa ottaa?',
    a: 'Lainaa kannattaa ottaa vain sen verran kuin remontti oikeasti maksaa — mieluiten hieman puskuria yllätysmenoihin. Pyydä remontista kirjallinen kustannusarvio ennen lainahakemusta. Suurissa remonteissa (yli 10 000 euroa) vakuudellinen laina on yleensä edullisempi kuin kulutusluotto.',
  },
  {
    q: 'Voiko remonttilainan korot vähentää verotuksessa?',
    a: 'Ei. Kulutusluoton tai remonttilainan korot eivät ole verovähennyskelpoisia Suomessa. Ainoa verotusetu remonteissa on kotitalousvähennys, joka koskee työn osuutta. Asuntolainan korkovähennys poistui kokonaan vuonna 2023.',
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
      name: 'Remonttilaina',
      item: `${SITE_URL}/remonttilaina`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function RemonttilainaPage() {
  // Renovation loans are kulutusluotto products — filter for those suitable
  // for renovation (higher max amounts, longer terms)
  const allKulutusluotot = getProductsSortedByRate('kulutusluotto');
  const renovationProducts = allKulutusluotot.filter(
    (p) => p.maxAmount >= 10000 && p.maxTermMonths >= 36,
  );
  const topProducts = renovationProducts.slice(0, 5);

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
              <li className="text-white font-medium">Remonttilaina</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Remonttilaina{' '}
              <span className="block text-[#ecc94b]">
                Rahoita remontti järkevästi
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Suomessa käytetään vuosittain yli 10 miljardia euroa asuntojen
              remontointiin. Vertaa rahoitusvaihtoehtoja ja selvitä, mikä
              sopii sinun remonttiisi — oli kyseessä keittiöremontti tai
              koko talon peruskorjaus.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Korot alkaen</p>
                <p className="text-2xl font-bold text-white">4,9 %</p>
                <p className="text-xs text-blue-200/50 mt-1">Tod. vuosikorko</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Kotitalousvähennys</p>
                <p className="text-2xl font-bold text-white">2 250</p>
                <p className="text-xs text-blue-200/50 mt-1">euroa/hlö/vuosi</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Remonttilaina</p>
                <p className="text-2xl font-bold text-white">
                  2 000–60 000
                </p>
                <p className="text-xs text-blue-200/50 mt-1">euroa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Financing options overview */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
            Remontin rahoitusvaihtoehdot
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Remontin voi rahoittaa usealla eri tavalla. Oikea vaihtoehto riippuu
            remontin koosta, kiireellisyydestä ja omasta tilanteestasi.
          </p>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                title: 'Kulutusluotto',
                icon: Banknote,
                rate: '5–15 %',
                amount: '500–60 000 euroa',
                speed: '1–3 päivää',
                best: 'Pieniin ja keskisuuriin remontteihin',
                pros: [
                  'Ei vaadi vakuutta',
                  'Nopea hakuprosessi',
                  'Vapaa käyttötarkoitus',
                ],
                cons: [
                  'Korkeampi korko kuin vakuudellisessa lainassa',
                  'Korot eivät vähennyskelpoisia',
                ],
              },
              {
                title: 'Asuntolainan lisälaina',
                icon: Home,
                rate: '3–6 %',
                amount: '10 000+ euroa',
                speed: '1–2 viikkoa',
                best: 'Isoihin remontteihin asunnonomistajille',
                pros: [
                  'Selvästi edullisempi korko',
                  'Pitkä laina-aika mahdollinen',
                  'Isot summat mahdollisia',
                ],
                cons: [
                  'Vaatii asuntovakuuden',
                  'Hitaampi prosessi',
                  'Ei kaikille mahdollinen',
                ],
              },
              {
                title: 'Taloyhtiölaina',
                icon: Building2,
                rate: '3–5 %',
                amount: 'Yhtiön päätöksen mukainen',
                speed: 'Yhtiökokouksen jälkeen',
                best: 'Taloyhtiön yhteisiin remontteihin',
                pros: [
                  'Edullinen korko',
                  'Ei vaadi omaa lainahakemusta',
                  'Osakkaan osuus rahoitusvastikkeena',
                ],
                cons: [
                  'Vain yhtiön päättämiin remontteihin',
                  'Ei omiin sisäremontteihin',
                  'Prosessi voi olla hidas',
                ],
              },
            ].map((option) => (
              <div
                key={option.title}
                className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a365d]">
                    <option.icon className="h-5 w-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900">
                    {option.title}
                  </h3>
                </div>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Korko</span>
                    <span className="font-medium text-gray-900">
                      {option.rate}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Summa</span>
                    <span className="font-medium text-gray-900">
                      {option.amount}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Nopeus</span>
                    <span className="font-medium text-gray-900">
                      {option.speed}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-[#1a365d] font-medium mb-3">
                  {option.best}
                </p>

                <div className="space-y-1.5">
                  {option.pros.map((pro) => (
                    <div
                      key={pro}
                      className="flex items-start gap-2 text-xs text-green-800"
                    >
                      <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
                      {pro}
                    </div>
                  ))}
                  {option.cons.map((con) => (
                    <div
                      key={con}
                      className="flex items-start gap-2 text-xs text-red-800"
                    >
                      <XCircle className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                      {con}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top products */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Edullisimmat kulutusluotot remonttiin
              </h2>
              <p className="mt-2 text-gray-600">
                Kulutusluottoja, jotka sopivat remonttirahoitukseen — vähintään
                10 000 euron lainasumma ja 3 vuoden laina-aika
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
              href="/vertailu?type=kulutusluotto"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors w-full"
            >
              Vertaa kaikkia kulutusluottoja
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Kotitalousvähennys section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Receipt className="h-5 w-5 text-[#38a169]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Kotitalousvähennys remonteissa
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Kotitalousvähennys on yksi merkittävimmistä säästökeinoista
                remontin yhteydessä. Vuonna 2026 vähennyksen enimmäismäärä on{' '}
                <strong>2 250 euroa henkilöä kohden</strong> vuodessa.
              </p>

              <div className="rounded-xl border border-green-200 bg-green-50/50 p-6 not-prose">
                <h3 className="font-semibold text-gray-900 mb-4">
                  Kotitalousvähennyksen perustiedot (2026)
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Enimmäismäärä:</strong> 2 250 euroa/henkilö/vuosi
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Vähennysprosentti:</strong> 40 % työn osuudesta
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Omavastuu:</strong> 100 euroa/henkilö/vuosi
                      </span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Pariskunta yhteensä:</strong> jopa 4 500 euroa/vuosi
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Koskee:</strong> työn osuutta (ei materiaaleja)
                      </span>
                    </div>
                    <div className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      <span className="text-gray-700">
                        <strong>Edellytys:</strong> tekijä ennakkoperintärekisterissä
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-gray-900 mt-8">
                Esimerkkilaskelma
              </h3>
              <div className="rounded-xl border border-gray-200 bg-white p-6 not-prose">
                <p className="text-sm text-gray-700 mb-4">
                  Keittiöremontti, jossa työn osuus on 5 000 euroa:
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                    <span className="text-gray-600">Työn osuus</span>
                    <span className="font-medium text-gray-900">5 000 euroa</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                    <span className="text-gray-600">
                      Vähennys 40 % työn osuudesta
                    </span>
                    <span className="font-medium text-gray-900">2 000 euroa</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                    <span className="text-gray-600">
                      Miinus omavastuu (100 euroa)
                    </span>
                    <span className="font-medium text-gray-900">–100 euroa</span>
                  </div>
                  <div className="flex justify-between rounded-lg bg-green-100 px-4 py-3 font-semibold">
                    <span className="text-green-900">Verovähennys yhteensä</span>
                    <span className="text-green-900">1 900 euroa</span>
                  </div>
                </div>
                <p className="mt-3 text-xs text-gray-500">
                  Vähennys tehdään suoraan verosta, ei tuloista. 1 900 euron
                  vähennys tarkoittaa siis 1 900 euroa vähemmän veroja.
                </p>
              </div>

              <div className="rounded-xl bg-amber-50 border border-amber-200 p-5 not-prose">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                  <div className="text-sm text-gray-700">
                    <p className="font-semibold text-gray-900 mb-1">
                      Muista nämä kotitalousvähennyksessä
                    </p>
                    <ul className="space-y-1 mt-2">
                      <li>
                        Materiaalikustannukset eivät kuulu vähennyksen piiriin — vain
                        työ
                      </li>
                      <li>
                        Työn tekijän on oltava ennakkoperintärekisterissä oleva
                        yritys tai yrittäjä
                      </li>
                      <li>
                        Omaa työtä ei voi vähentää — et voi vähentää itse
                        tekemääsi remonttia
                      </li>
                      <li>
                        Pyydä aina eritelty lasku, jossa työn ja materiaalien
                        osuudet on eroteltu
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Taloyhtiölaina vs oma remonttilaina */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Building2 className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Taloyhtiölaina vai oma remonttilaina?
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Kun taloyhtiö päättää isosta remontista (putkiremontti,
                julkisivuremontti, kattoremontti), osakkaiden pitää rahoittaa
                oma osuutensa. Vaihtoehtoina ovat taloyhtiölaina tai oman
                remonttilainan hakeminen.
              </p>
            </div>

            <div className="mt-6 overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1a365d] text-white">
                    <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">
                      Ominaisuus
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Taloyhtiölaina
                    </th>
                    <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">
                      Oma remonttilaina
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Korko
                    </td>
                    <td className="px-4 py-3 text-gray-700">3–5 %</td>
                    <td className="px-4 py-3 text-gray-700">5–15 % (kulutusluotto)</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Laina-aika
                    </td>
                    <td className="px-4 py-3 text-gray-700">Tyypillisesti 10–25 vuotta</td>
                    <td className="px-4 py-3 text-gray-700">1–15 vuotta</td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Hakuprosessi
                    </td>
                    <td className="px-4 py-3 text-gray-700">Ei vaadi omaa hakemusta</td>
                    <td className="px-4 py-3 text-gray-700">Oma lainahakemus</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Joustavuus
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Voi maksaa osuuden kerralla pois
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Vapaat lisälyhennykset
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Vaikutus asunnon myyntiin
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Lainaosuus siirtyy uudelle omistajalle
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Ei vaikuta asuntokauppaan
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Parhaiten sopii kun...
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Haluat helppouden ja edullisen koron
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Haluat nopeamman takaisinmaksun tai myyt pian
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
                    Jos myyt asunnon, johon liittyy taloyhtiölainaa, lainaosuus
                    näkyy velattomassa hinnassa ja voi vaikuttaa myyntihintaan.
                    Jos suunnittelet myyntiä lähivuosina, oman osuuden maksaminen
                    kerralla pois voi olla järkevämpää.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Energy renovation section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Leaf className="h-5 w-5 text-[#38a169]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Energiaremontti ja tuet
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Energiaremontti on taloudellisesti ja ympäristön kannalta
                järkevä investointi. Suomen rakennuskannassa on arviolta
                noin 100 miljardin euron korjausvelka, ja suuri osa siitä
                liittyy energiatehokkuuteen.
              </p>

              <p>
                <strong>ARA (Asumisen rahoitus- ja kehittämiskeskus)</strong>{' '}
                myöntää energia-avustuksia asuinrakennusten energiatehokkuuden
                parantamiseen. Tuki koskee erityisesti:
              </p>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-4">
              {[
                {
                  title: 'Lämmitysjärjestelmän vaihto',
                  desc: 'Öljylämmityksestä maalämpöön, ilma-vesilämpöpumppuun tai kaukolämpöön.',
                  saving: 'Säästö 30–70 % lämmityskuluissa',
                },
                {
                  title: 'Ikkunoiden ja ovien vaihto',
                  desc: 'Vanhojen yksilasisten ikkunoiden vaihto nykyaikaisiin energiaikkunoihin.',
                  saving: 'Säästö 10–25 % lämmitysenergiasta',
                },
                {
                  title: 'Lisäeristys',
                  desc: 'Yläpohjan, ulkoseinien tai alapohjan lisäeristäminen.',
                  saving: 'Säästö 15–30 % lämmityskuluissa',
                },
                {
                  title: 'Aurinkopaneelit',
                  desc: 'Oman sähköntuotannon lisääminen aurinkosähköjärjestelmällä.',
                  saving: 'Säästö 20–50 % sähkölaskussa',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-200 p-5"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
                  <p className="text-sm font-medium text-[#38a169]">
                    {item.saving}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-green-50 border border-green-200 p-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                ARA:n energia-avustus pähkinänkuoressa
              </h3>
              <ul className="space-y-2">
                {[
                  'Tuki on tyypillisesti 10–15 % hyväksytyistä kokonaiskustannuksista',
                  'Suurempi tuki mahdollinen, jos energialuokka paranee merkittävästi',
                  'Avustusta haetaan ennen remontin aloittamista',
                  'Koskee sekä pientaloja että taloyhtiöitä',
                  'Energiaremontti + kotitalousvähennys = merkittävä kokonaissäästö',
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 text-sm text-green-900"
                  >
                    <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-sm text-gray-700">
                  <strong>Tärkeää:</strong> ARA:n energia-avustusta on haettava
                  ennen remontin aloittamista. Jos aloitat remontin ennen
                  hakemuksen tekemistä, et voi saada tukea. Tarkista aina
                  viimeisimmät ehdot{' '}
                  <a
                    href="https://www.ara.fi"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1a365d] underline hover:text-[#2a4a7f]"
                  >
                    ARA:n verkkosivuilta
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Typical renovation costs */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Wrench className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Tyypilliset remonttikustannukset
              </h2>
            </div>

            <p className="text-gray-700 mb-6">
              Alla suuntaa-antavia hinta-arvioita tyypillisille remonteille.
              Todelliset kustannukset vaihtelevat huomattavasti sijainnin,
              materiaalivalintojen ja työn laajuuden mukaan.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1a365d] text-white">
                    <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">
                      Remontti
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Hinta-arvio
                    </th>
                    <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">
                      Tyypillinen kesto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {[
                    { name: 'Keittiöremontti', price: '8 000–25 000 euroa', time: '3–6 viikkoa' },
                    { name: 'Kylpyhuoneremontti', price: '7 000–20 000 euroa', time: '3–5 viikkoa' },
                    { name: 'Putkiremontti (osakaskulut)', price: '500–1 200 euroa/m2', time: '2–6 kuukautta' },
                    { name: 'Saunaremontti', price: '5 000–15 000 euroa', time: '2–4 viikkoa' },
                    { name: 'Lattiaremontti', price: '30–80 euroa/m2', time: '1–3 viikkoa' },
                    { name: 'Maalaus ja tapetointi', price: '15–40 euroa/m2', time: '1–2 viikkoa' },
                    { name: 'Ikkunoiden vaihto', price: '500–1 500 euroa/ikkuna', time: '1–3 päivää' },
                    { name: 'Lämmitysjärjestelmän vaihto', price: '10 000–25 000 euroa', time: '2–5 päivää' },
                  ].map((item, i) => (
                    <tr key={item.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-4 py-3 font-medium text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{item.price}</td>
                      <td className="px-4 py-3 text-gray-700">{item.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-xs text-gray-500">
              Hinnat ovat suuntaa-antavia ja perustuvat vuoden 2025–2026
              markkinahintoihin. Pyydä aina useampi tarjous ennen remontin
              aloittamista.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Usein kysytyt kysymykset remonttilainasta
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
            Löydä edullisin rahoitus remonttiisi
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Vertaa kulutusluottoja, jotka sopivat remontin rahoittamiseen.
            Kattava vertailu — näytämme kaikki lainat rehellisesti.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vertailu?type=kulutusluotto"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Vertaa remonttilainoja
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
              { href: '/yhdistelylaina', label: 'Yhdistelylaina' },
              { href: '/autolaina', label: 'Autolaina' },
              { href: '/yrityslaina', label: 'Yrityslaina' },
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
