import { Metadata } from 'next';
import Link from 'next/link';
import {
  Car,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Calculator,
  HelpCircle,
  Info,
  ExternalLink,
  Banknote,
  Fuel,
  Wrench,
  CreditCard,
  Clock,
  Zap,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Auton osto — Rahoitus, vakuutus ja kokonaiskustannukset';
const pageDescription =
  'Kattava opas auton ostoon Suomessa. Vertaa autolainaa, osamaksua ja leasingia. Laske auton omistamisen kokonaiskustannukset ja löydä edullisimmat vakuutukset.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/elamanmuutokset/autonosto` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/elamanmuutokset/autonosto`,
    siteName: SITE_NAME,
    locale: 'fi_FI',
    type: 'article',
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
    q: 'Kumpi on edullisempi, autolaina vai osamaksu?',
    a: 'Autolaina on tyypillisesti edullisempi. Autolainan todellinen vuosikorko on yleensä 4–10 %, kun osamaksun korko on usein 6–15 %. Autolainassa auto on sinun omaisuuttasi heti, kun taas osamaksussa auto siirtyy omistukseesi vasta viimeisen erän jälkeen. Toisaalta osamaksu on usein helpompi järjestää suoraan autoliikkeessä.',
  },
  {
    q: 'Milloin leasing on järkevä vaihtoehto?',
    a: 'Leasing sopii, jos haluat vaihtaa autoa usein (2–4 vuoden välein), et halua huolehtia jälleenmyynnistä tai haluat ennakoitavat kuukausikulut. Yksityisleasing on kalliimpaa kuin oma auto pitkällä aikavälillä, mutta kuukausierä sisältää usein huollon ja renkaat. Yrityksille leasing on veroedullinen vaihtoehto.',
  },
  {
    q: 'Paljonko autolainan kuukausierä on?',
    a: 'Riippuu lainasummasta, korosta ja laina-ajasta. Esimerkiksi 20 000 euron autolainalla, 5 vuoden laina-ajalla ja 6 % todellisella vuosikorolla kuukausierä on noin 387 euroa. Käytä lainanlaskuria tarkan kuukausierän laskemiseen omalla lainasummallasi.',
  },
  {
    q: 'Pitääkö auton olla vakuutena autolainassa?',
    a: 'Ei välttämättä. Vakuudeton autolaina (kulutusluotto) ei vaadi autoa vakuudeksi, mutta korko on yleensä korkeampi. Vakuudellisessa autolainassa auto on lainan vakuutena ja korko on edullisempi. Osamaksussa auto on aina rahoitusyhtiön omistuksessa laina-ajan.',
  },
  {
    q: 'Mitä vakuutuksia auto tarvitsee?',
    a: 'Liikennevakuutus on lakisääteinen ja pakollinen jokaiselle rekisteröidylle autolle. Kaskovakuutus on vapaaehtoinen, mutta erittäin suositeltava — se korvaa esimerkiksi kolarikorjaukset, ilkivallan ja hirvikolarin. Rahoitusyhtiö vaatii yleensä täyskaskon osamaksu- tai leasingautoon.',
  },
  {
    q: 'Kannattaako ostaa sähköauto vai polttomoottoriauto?',
    a: 'Sähköauto on edullisempi käyttökuluiltaan — sähkö on halvempaa kuin bensiini ja huoltokulut pienemmät. Hankintahinta on kuitenkin korkeampi. Sähköauto kannattaa erityisesti, jos ajat paljon (yli 15 000 km/vuosi) ja sinulla on mahdollisuus kotilataukseen. Käytettyjen sähköautojen hinnat ovat laskeneet merkittävästi.',
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
      name: 'Elämänmuutokset',
      item: `${SITE_URL}/elamanmuutokset`,
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Auton osto',
      item: `${SITE_URL}/elamanmuutokset/autonosto`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Financing comparison data
// ---------------------------------------------------------------------------

const financingOptions = [
  {
    title: 'Autolaina',
    icon: Banknote,
    rate: '4–10 %',
    term: '1–8 vuotta',
    ownership: 'Heti sinun',
    best: 'Edullisin vaihtoehto useimmille',
    pros: [
      'Edullisin korko',
      'Auto omistukseesi heti',
      'Vapaa valita auto mistä tahansa',
      'Vapaat lisälyhennykset',
    ],
    cons: [
      'Vaatii erillisen lainahakemuksen',
      'Auton arvo laskee, laina pysyy',
    ],
  },
  {
    title: 'Osamaksu',
    icon: CreditCard,
    rate: '6–15 %',
    term: '1–6 vuotta',
    ownership: 'Viimeisen erän jälkeen',
    best: 'Helppo järjestää autoliikkeessä',
    pros: [
      'Hoituu suoraan autoliikkeessä',
      'Nopea prosessi',
      'Ei vaadi erillistä lainahakemusta',
    ],
    cons: [
      'Korkeampi korko kuin autolainassa',
      'Auto rahoitusyhtiön omistuksessa',
      'Rajoittaa auton myyntiä laina-aikana',
      'Täyskasko usein pakollinen',
    ],
  },
  {
    title: 'Yksityisleasing',
    icon: Clock,
    rate: 'Kiinteä kuukausierä',
    term: '2–4 vuotta',
    ownership: 'Ei omistusta',
    best: 'Auton vaihto usein, ei huolta jälleenmyynnistä',
    pros: [
      'Ennakoitavat kuukausikulut',
      'Usein huolto ja renkaat sisältyvät',
      'Ei jälleenmyyntihuolta',
      'Uusi auto muutaman vuoden välein',
    ],
    cons: [
      'Kallein vaihtoehto pitkällä aikavälillä',
      'Kilometrirajoitus (yleensä 10 000–30 000 km/v)',
      'Ylikilometrimaksut voivat yllättää',
      'Et omista autoa koskaan',
    ],
  },
];

// ---------------------------------------------------------------------------
// Cost breakdown data
// ---------------------------------------------------------------------------

const costBreakdown = {
  purchase: '25 000 euroa',
  insurance: {
    traffic: '200–600 euroa/v',
    kasko: '300–1 500 euroa/v',
  },
  fuel: {
    petrol: '1 500–3 000 euroa/v',
    electric: '400–800 euroa/v',
  },
  maintenance: '500–1 500 euroa/v',
  tax: '0–600 euroa/v',
  depreciation: '2 000–5 000 euroa/v',
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AutonostoPage() {
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
              <li>
                <Link
                  href="/elamanmuutokset"
                  className="hover:text-white transition-colors"
                >
                  Elämänmuutokset
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium">Auton osto</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Auton osto{' '}
              <span className="block text-[#ecc94b]">
                Rahoitus, vakuutus ja todelliset kustannukset
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Auton ostaminen on paljon muutakin kuin pelkkä hankintahinta.
              Vertaa rahoitusvaihtoehdot, löydä edullisimmat vakuutukset ja
              laske auton omistamisen todelliset kustannukset.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Autolaina korot</p>
                <p className="text-2xl font-bold text-white">4–10 %</p>
                <p className="text-xs text-blue-200/50 mt-1">Tod. vuosikorko</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Osamaksu korot</p>
                <p className="text-2xl font-bold text-white">6–15 %</p>
                <p className="text-xs text-blue-200/50 mt-1">Tod. vuosikorko</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Autolaina summa</p>
                <p className="text-2xl font-bold text-white">2 000–60 000</p>
                <p className="text-xs text-blue-200/50 mt-1">euroa</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Auton ostajan tarkistuslista
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Hoida nämä asiat kuntoon, niin auton osto sujuu kitkattomasti.
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'Autolainan vertailu',
                  description:
                    'Vertaa autolainatarjouksia ennen autoliikkeeseen menoa. Valmis lainapäätös taskussa antaa neuvotteluvoimaa ja usein edullisemman koron kuin autoliikkeen oma rahoitus.',
                  cta: { label: 'Vertaa autolainoja', href: '/autolaina' },
                  internal: true,
                },
                {
                  title: 'Autovakuutus',
                  description:
                    'Liikennevakuutus on pakollinen. Kaskovakuutus kannattaa erityisesti uuteen tai arvokkaaseen autoon. Vertaa vakuutuksia — hinnoissa voi olla satojen eurojen vuosiero.',
                  cta: {
                    label: 'Vertaa vakuutuksia',
                    href: 'https://valitsevakuutus.fi',
                  },
                  internal: false,
                },
                {
                  title: 'Rahoitusmuodon valinta',
                  description:
                    'Autolaina, osamaksu vai leasing? Katso alla oleva vertailu ja valitse tilanteesi mukaan.',
                  internal: true,
                },
                {
                  title: 'Auton kuntotarkastus',
                  description:
                    'Käytettyä autoa ostaessa testitä auto kuntotarkastuksessa. Se maksaa 100–200 euroa ja voi säästää tuhansia. Tarkista myös huoltohistoria ja mahdolliset kolarihistoriat.',
                  internal: true,
                },
                {
                  title: 'Rekisteröinti ja omistuksensiirto',
                  description:
                    'Omistuksensiirto on tehtävä 7 päivän kuluessa kaupasta. Tee se Traficomin asiointipalvelussa. Vakuutus pitää olla voimassa ennen rekisteröintiä.',
                  internal: true,
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 hover:shadow-sm transition-shadow"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100">
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {item.title}
                        </h3>
                        {item.cta &&
                          (item.internal ? (
                            <Link
                              href={item.cta.href}
                              className="inline-flex items-center gap-1.5 shrink-0 rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-medium text-white hover:bg-[#2c5282] transition-colors"
                            >
                              {item.cta.label}
                              <ArrowRight className="h-3.5 w-3.5" />
                            </Link>
                          ) : (
                            <a
                              href={item.cta.href}
                              target="_blank"
                              rel="noopener"
                              className="inline-flex items-center gap-1.5 shrink-0 rounded-lg border border-[#1a365d]/20 px-4 py-2 text-sm font-medium text-[#1a365d] hover:bg-[#1a365d]/5 transition-colors"
                            >
                              {item.cta.label}
                              <ExternalLink className="h-3.5 w-3.5" />
                            </a>
                          ))}
                      </div>
                      <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Financing comparison */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
            Osamaksu vs. autolaina vs. leasing
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            Kolme tapaa rahoittaa auton hankinta — jokaisella on omat
            etunsa ja haittansa.
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {financingOptions.map((option) => (
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
                    <span className="text-gray-500">Laina-aika</span>
                    <span className="font-medium text-gray-900">
                      {option.term}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Omistus</span>
                    <span className="font-medium text-gray-900">
                      {option.ownership}
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

          <div className="mt-8 text-center">
            <Link
              href="/autolaina"
              className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2c5282] transition-colors"
            >
              Vertaa autolainoja
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Cost breakdown */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Calculator className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Auton omistamisen vuosikustannukset
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              Auton hankintahinta on vasta alkusoitto. Tässä tyypilliset
              vuosikustannukset 25 000 euron autolle.
            </p>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <div className="space-y-2 text-sm">
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">Arvon aleneminen</span>
                  <span className="font-medium text-gray-900">
                    2 000–5 000 euroa/v
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <div className="text-gray-600">
                    <span>Polttoaine</span>
                    <span className="text-xs text-gray-400 ml-1">
                      (15 000 km/v)
                    </span>
                  </div>
                  <span className="font-medium text-gray-900">
                    1 500–3 000 euroa/v
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-green-50 px-4 py-3">
                  <div className="text-gray-600">
                    <span>Sähkö (sähköauto)</span>
                    <span className="text-xs text-gray-400 ml-1">
                      (15 000 km/v)
                    </span>
                  </div>
                  <span className="font-medium text-green-700">
                    400–800 euroa/v
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">
                    Liikennevakuutus
                  </span>
                  <span className="font-medium text-gray-900">
                    200–600 euroa/v
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">Kaskovakuutus</span>
                  <span className="font-medium text-gray-900">
                    300–1 500 euroa/v
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">
                    Huolto ja korjaukset
                  </span>
                  <span className="font-medium text-gray-900">
                    500–1 500 euroa/v
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">Ajoneuvovero</span>
                  <span className="font-medium text-gray-900">
                    0–600 euroa/v
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">
                    Renkaat (vaihtosetti)
                  </span>
                  <span className="font-medium text-gray-900">
                    200–400 euroa/v
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 font-semibold">
                  <span className="text-[#1a365d]">
                    Vuosikustannukset yhteensä (bensiini)
                  </span>
                  <span className="text-[#1a365d]">
                    ~6 500–12 000 euroa
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-green-50 border border-green-200 p-4">
                <div className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-green-800">
                    <strong>Sähköauto säästää käyttökuluissa:</strong>{' '}
                    Sähköauton polttoainekustannukset ovat jopa 75 % pienemmät,
                    huoltokulut noin puolet ja ajoneuvovero usein 0 euroa.
                    Kokonaissäästö voi olla 2 000–4 000 euroa vuodessa
                    polttomoottorin verrattuun.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/tyokalut/lainanlaskuri"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2c5282] transition-colors"
              >
                <Calculator className="h-4 w-4" />
                Laske kuukausierä
              </Link>
              <a
                href="https://valitsevakuutus.fi"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Vertaa autovakuutuksia
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Vertaa myös vakuutukset Valitse-verkoston kautta
            </h2>
            <p className="text-gray-600 mb-8">
              Auton vakuutushinnoissa on suuria eroja yhtiöiden välillä.
              Vertaa liikenne- ja kaskovakuutukset kattavasti.
            </p>

            <div className="grid sm:grid-cols-2 gap-4 max-w-lg mx-auto">
              <Link
                href="/autolaina"
                className="group rounded-xl border border-gray-200 bg-white p-5 text-center hover:shadow-md hover:border-[#1a365d]/20 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 mx-auto mb-3">
                  <Car className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#1a365d] mb-1">
                  Autolaina
                </h3>
                <p className="text-xs text-gray-500">
                  Vertaa autolainojen korkoja
                </p>
              </Link>

              <a
                href="https://valitsevakuutus.fi"
                target="_blank"
                rel="noopener"
                className="group rounded-xl border border-gray-200 bg-white p-5 text-center hover:shadow-md hover:border-[#1a365d]/20 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 mx-auto mb-3">
                  <ShieldCheck className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#1a365d]">
                    Autovakuutus
                  </h3>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  Vertaa liikenne- ja kaskovakuutuksia
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Usein kysytyt kysymykset auton ostosta
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
            Vertaa autolainoja ja löydä edullisin
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Älä ota autoliikkeen rahoitusta kyselemättä — kilpailuttamalla
            autolainan voit säästää satoja tai tuhansia euroja.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/autolaina"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Vertaa autolainoja
            </Link>
            <Link
              href="/vertailu?type=autolaina"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Kaikki lainat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Related links */}
      <section className="py-8 bg-white border-t border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Tutustu myös
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/elamanmuutokset', label: 'Elämänmuutokset' },
              {
                href: '/elamanmuutokset/asunnonosto',
                label: 'Asunnon osto',
              },
              { href: '/autolaina', label: 'Autolaina' },
              { href: '/kulutusluotto', label: 'Kulutusluotto' },
              { href: '/tyokalut/lainanlaskuri', label: 'Lainanlaskuri' },
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
