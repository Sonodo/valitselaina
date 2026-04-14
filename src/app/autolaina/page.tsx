import { Metadata } from 'next';
import Link from 'next/link';
import {
  Car,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Info,
  Calculator,
  HelpCircle,
  AlertTriangle,
  Clock,
  Banknote,
} from 'lucide-react';
import { getProductsSortedByRate } from '@/data/providers';
import { SITE_URL, SITE_NAME, INTEREST_RATE_CAP } from '@/lib/constants';
import { formatCurrency, formatPercentage, getApplyUrl } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Autolaina — Vertaa autorahoituksen vaihtoehdot';
const pageDescription =
  'Vertaa autolainoja, osamaksua ja leasingia. Löydä edullisin autorahoitus Suomessa — korot alkaen 3,5 %. Vertaile uuden ja käytetyn auton rahoitusta.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/autolaina` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/autolaina`,
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
    q: 'Mikä on autolainan ja osamaksun ero?',
    a: 'Autolainassa saat rahat tilillesi ja ostat auton itse — auto on heti sinun nimissäsi. Osamaksussa rahoitusyhtiö omistaa auton, kunnes viimeinen erä on maksettu. Autolaina antaa enemmän vapautta, mutta osamaksu voi olla helpompi järjestää suoraan autoliikkeessä.',
  },
  {
    q: 'Onko autolaina vakuudellinen vai vakuudeton?',
    a: 'Se riippuu lainanantajasta. Perinteiset pankit tarjoavat usein vakuudettomia autolainoja (auto ei ole vakuutena), jolloin voit myydä auton vapaasti. Autoliikkeiden rahoitusyhtiöt (esim. Santander) voivat vaatia auton vakuudeksi. Vakuudellinen autolaina voi olla edullisempi, koska lainanantajalla on pienempi riski.',
  },
  {
    q: 'Mikä on autoleasingin ero autolainaan?',
    a: 'Leasingissa et omista autoa — maksat käytöstä kuukausittain ja palautat auton sopimuskauden päättyessä. Leasingissa kuukausierä on usein pienempi, mutta et kartuta omistusta. Autolainassa taas maksat auton omaksesi ja voit myydä sen milloin vain.',
  },
  {
    q: 'Kuinka paljon autolainaa saan?',
    a: 'Autolainan määrä riippuu tuloistasi, olemassa olevista lainoistasi ja luottoluokituksestasi. Tyypillisesti autolainaa saa 2 000–100 000 euroa. Suositeltava nyrkkisääntö on, että auton hinta ei saisi ylittää 25–30 % vuosiansioistasi.',
  },
  {
    q: 'Kannattaako auto rahoittaa lainalla vai säästöillä?',
    a: 'Jos sinulla on säästöjä, omalla rahalla ostaminen on aina edullisinta — et maksa lainkaan korkoja. Jos rahat eivät riitä kerralla, voit yhdistää omat säästöt ja lainaa. Mitä suurempi omarahoitusosuus, sitä pienempi laina ja vähemmän korkoja. Vältä kuitenkin käyttämästä hätävaraansa auton ostoon.',
  },
  {
    q: 'Millainen laina-aika kannattaa valita autolle?',
    a: 'Autolainan suositeltava laina-aika on 3–5 vuotta. Pidempi laina-aika pienentää kuukausierää, mutta kasvattaa kokonaiskorkoja ja voi johtaa tilanteeseen, jossa olet "veden alla" — eli olet velkaa enemmän kuin auto on arvoinen. Käytetylle autolle suositellaan lyhyempää laina-aikaa kuin uudelle.',
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
      name: 'Autolaina',
      item: `${SITE_URL}/autolaina`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AutolainaPage() {
  const allProducts = getProductsSortedByRate('autolaina');
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
              <li className="text-white font-medium">Autolaina</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Autolaina{' '}
              <span className="block text-[#ecc94b]">
                Vertaa autorahoituksen vaihtoehdot
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Vertaa autolainoja, osamaksua ja leasingia. Löydä edullisin
              rahoitus uudelle tai käytetylle autolle — korot alkaen 3,5 %.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Korot alkaen</p>
                <p className="text-2xl font-bold text-white">3,5 %</p>
                <p className="text-xs text-blue-200/50 mt-1">Nimelliskorko</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Lainasumma</p>
                <p className="text-2xl font-bold text-white">
                  2 000–100 000
                </p>
                <p className="text-xs text-blue-200/50 mt-1">euroa</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Laina-aika</p>
                <p className="text-2xl font-bold text-white">1–8 v</p>
                <p className="text-xs text-blue-200/50 mt-1">vuotta</p>
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
                Edullisimmat autolainat
              </h2>
              <p className="mt-2 text-gray-600">
                Järjestetty todellisen vuosikoron mukaan
              </p>
            </div>
            <Link
              href="/vertailu?type=autolaina"
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

                <div className="mt-4 flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex flex-wrap gap-2 flex-1 min-w-0">
                    {product.features.slice(0, 4).map((feature) => (
                      <span
                        key={feature}
                        className="inline-block rounded-full bg-blue-50 px-3 py-1 text-xs text-blue-700"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <a
                    href={getApplyUrl(product.provider, product.type)}
                    target="_blank"
                    rel="noopener noreferrer nofollow"
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors whitespace-nowrap"
                  >
                    Hae lainaa
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/vertailu?type=autolaina"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors w-full"
            >
              Vertaa kaikkia autolainoja
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Autolaina vs Osamaksu vs Leasing */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Car className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Autolaina vs osamaksu vs leasing
              </h2>
            </div>
            <p className="text-gray-700 mb-8">
              Autorahoituksessa on kolme päävalintaa. Jokaisella on omat
              vahvuutensa ja heikkoutensa — alla kattava vertailu.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1a365d] text-white">
                    <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">
                      Ominaisuus
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Autolaina
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Osamaksu
                    </th>
                    <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">
                      Leasing
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Omistajuus
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="text-green-700 font-medium">
                        Sinun heti
                      </span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Rahoittajan, kunnes maksettu
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="text-red-600">Et omista</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Tyypillinen korko
                    </td>
                    <td className="px-4 py-3 text-gray-700">3,5–11 %</td>
                    <td className="px-4 py-3 text-gray-700">4–14 %</td>
                    <td className="px-4 py-3 text-gray-700">
                      Sisältyy kuukausieraan
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Kuukausierä
                    </td>
                    <td className="px-4 py-3 text-gray-700">Keskitaso</td>
                    <td className="px-4 py-3 text-gray-700">
                      Keskitaso tai korkeampi
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="text-green-700">Usein pienin</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Myynti kesken kauden
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="text-green-700">Vapaasti</span>
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Vaatii lainan maksun
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="text-red-600">Ei mahdollista</span>
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Kilometrirajoitus
                    </td>
                    <td className="px-4 py-3 text-gray-700">Ei</td>
                    <td className="px-4 py-3 text-gray-700">Ei</td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="text-red-600">Kyllä</span>
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Sopii parhaiten
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Käyttöön, uusi & käytetty
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Osto autoliikkeestä
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Uusi auto, vaihto 3–4 v välein
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#1a365d] shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">
                    Miksi autolaina on usein paras valinta?
                  </p>
                  <p>
                    Autolainassa auto on nimissäsi heti, voit myydä sen vapaasti
                    ja valita mistä ostat. Korot ovat usein edullisemmat kuin
                    autoliikkeiden osamaksurahoituksessa. Lisäksi voit kilpailuttaa
                    lainan, kun taas osamaksu sidotaan usein yhteen rahoittajaan.
                    Leasing sopii lähinnä uuden auton lyhyeen käyttöön ja
                    yrityksille.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Educational content */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Banknote className="h-5 w-5 text-[#38a169]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Näin löydät edullisimman autorahoituksen
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Auton rahoituksessa on monia vaihtoehtoja, ja oikean valinnan
                tekeminen voi säästää tuhansia euroja. Alla vinkit fiksuun
                autorahoitukseen.
              </p>

              <div className="space-y-4">
                {[
                  {
                    title: 'Kilpailuta laina ennen autoliikkeeseen menoa',
                    desc: 'Hae lainapäätös pankilta tai verkkopankilta etukäteen. Näin tiedät tarkan budjettisi ja voit verrata pankin tarjousta autoliikkeen rahoitukseen. Autoliikkeen osamaksu ei aina ole edullisin vaihtoehto.',
                  },
                  {
                    title: 'Huomioi auton arvonlasku',
                    desc: 'Uusi auto menettaa arvostaan noin 15–20 % ensimmäisen vuoden aikana ja jopa 40–50 % kolmessa vuodessa. 2–3 vuotta vanha auto voi olla taloudellisesti fiksuin ostos — joku muu on jo "maksanut" suurimman arvonlaskun.',
                  },
                  {
                    title: 'Valitse laina-aika viisaasti',
                    desc: 'Pidä huolta, ettei laina-aika ole auton käyttöikää pidempi. 3–5 vuotta on tyypillinen ja suositeltava autolainan laina-aika. Pidempi laina-aika tarkoittaa enemmän korkoja ja riskin, että olet veden alla.',
                  },
                  {
                    title: 'Laske kokonaiskustannus',
                    desc: 'Älä katso pelkkää kuukausierää. Laske aina kokonaiskustannus: lainasumma + korot + maksut koko laina-ajalta. Pieni kuukausierä ja pitkä laina-aika voivat tulla lopulta paljon kalliimmaksi.',
                  },
                  {
                    title: 'Harkitse sähköautoa',
                    desc: 'Sähköautojen käyttökulut ovat merkittävästi pienemmät kuin polttomoottoriautojen. Jos harkitset autorahoitusta, sähköauto voi olla kokonaistaloudellisesti edullisempi vaihtoehto — erityisesti pitkillä pitovuosilla.',
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
        </div>
      </section>

      {/* Calculator preview */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Calculator className="h-6 w-6 text-[#1a365d]" />
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Laske autorahoituksen kuukausierä
              </h2>
            </div>
            <p className="text-gray-600 mb-6">
              Käytä laskuriamme selvittaaksesi, paljonko autorahoitus maksaa
              kuukaudessa. Vertaile eri laina-aikoja ja summia.
            </p>

            {/* Example calculation box */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 text-left">
              <h3 className="font-semibold text-gray-900 mb-4">
                Esimerkki: 20 000 euron autolaina
              </h3>
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">3 vuotta, 5 %</p>
                  <p className="text-xl font-bold text-[#1a365d]">
                    599 euroa/kk
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Korot yhteensä: ~1 570 euroa
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">5 vuotta, 5 %</p>
                  <p className="text-xl font-bold text-[#1a365d]">
                    377 euroa/kk
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Korot yhteensä: ~2 640 euroa
                  </p>
                </div>
                <div className="rounded-lg bg-gray-50 p-4">
                  <p className="text-sm text-gray-500 mb-1">7 vuotta, 5 %</p>
                  <p className="text-xl font-bold text-[#1a365d]">
                    283 euroa/kk
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Korot yhteensä: ~3 740 euroa
                  </p>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Esimerkkilaskelma. Todellinen kuukausierä riippuu korosta,
                laina-ajasta ja mahdollisista kuukausimaksuista.
              </p>
            </div>

            <Link
              href="/vertailu?type=autolaina"
              className="mt-6 inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors"
            >
              <Calculator className="h-4 w-4" />
              Avaa laskuri ja vertaa lainoja
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Usein kysytyt kysymykset autolainasta
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
            Löydä edullisin autolaina
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Vertaa autolainoja Suomen parhailta pankeilta ja
            rahoitusyhtiöiltä. Kilpailuta autorahoitus ennen autoliikkeeseen
            menoa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vertailu?type=autolaina"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Vertaa autolainoja
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
