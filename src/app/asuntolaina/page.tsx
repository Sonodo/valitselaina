import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  TrendingUp,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Info,
  Calculator,
  Key,
  HelpCircle,
  Building2,
  Percent,
} from 'lucide-react';
import { getProductsSortedByRate } from '@/data/providers';
import {
  SITE_URL,
  SITE_NAME,
  EURIBOR_12M,
  EURIBOR_6M,
  EURIBOR_3M,
  EURIBOR_UPDATED,
} from '@/lib/constants';
import { formatCurrency, formatPercentage } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Asuntolaina — Vertaa marginaalit ja löydä paras';
const pageDescription =
  'Vertaa asuntolainoja rehellisesti. Marginaalit alkaen 0,33 %. Seuraa Euribor-korkoja ja löydä edullisin asuntolaina ensiasunnon ostajille ja vaihtajille.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/asuntolaina` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/asuntolaina`,
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
    q: 'Mikä on asuntolainan marginaali?',
    a: 'Marginaali on pankin lisäämä osuus asuntolainan korkoon viitekoron päälle. Esimerkiksi jos Euribor 12 kk on 2,5 % ja marginaali 0,5 %, lainan kokonaiskorko on 3,0 %. Marginaali pysyy yleensä samana koko laina-ajan, ellei toisin sovita. Marginaali on tärkeimpiä vertailukohteita asuntolainoissa.',
  },
  {
    q: 'Mikä viitekorko kannattaa valita asuntolainaan?',
    a: 'Euribor 12 kk on yleisin viitekorko Suomessa. Se päivittyy kerran vuodessa, joten kuukausierasi pysyy samana 12 kuukautta kerrallaan. Euribor 3 kk ja 6 kk reagoivat nopeammin markkinamuutoksiin — ne voivat olla edullisempia laskevassa korkoympäristössä mutta riskialttiimpia nousevassa.',
  },
  {
    q: 'Paljonko omaa rahaa tarvitsen asunnon ostoon?',
    a: 'Suomessa omarahoitusosuus on tyypillisesti 5-15 % asunnon hinnasta. Ensiasunnon ostajat voivat hyödyntää ASP-järjestelmää, jossa omia säästöjä kertyy vähintään 10 % ja valtio takaa lainan 600 000 euroon asti (pääkaupunkiseudulla). Omarahoitusosuuden lisäksi kannattaa varata rahaa varainsiirtoveroon (1,5 % asunto-osakkeista, 3 % kiinteistöistä — ensiasunnon ostajat vapautettu) ja muihin kuluihin.',
  },
  {
    q: 'Mikä on ASP-laina?',
    a: 'ASP-laina (asuntosäästöpalkkiolaina) on nuorille 15–44-vuotiaille ensiasunnon ostajille tarkoitettu edullinen lainamuoto. ASP-tilille säästetään vähintään 8 vuosineljänneksenä ja kertyneille säästöille maksetaan 1 %:n korko sekä 2-4 %:n lisäkorko. Valtio takaa ASP-lainan tiettyyn rajaan asti ja koron noustessa valtio voi maksaa osan korkokuluista.',
  },
  {
    q: 'Miten asuntolainan korko määräytyy?',
    a: 'Asuntolainan korko koostuu viitekorosta (yleensä Euribor 12 kk) ja pankin marginaalista. Marginaali määräytyy luottoluokituksesi, omarahoitusosuuden, asiakkuuden laajuuden ja lainasumman perusteella. Vähintään 3-5 pankista kannattaa pyytää tarjous, koska marginaalierot voivat olla merkittäviä.',
  },
  {
    q: 'Onko asuntolainassa korkovähennysoikeutta?',
    a: 'Ei ole. Asuntolainan korkovähennysoikeus poistettiin kokonaan vuonna 2023. Aiemmin osan koroista sai vähentää verotuksessa, mutta nämä vähennykset ajettiin asteittain alas. Tämä tarkoittaa, että lainan todellinen kustannus on nykyään täysin maksamasi korko ilman verohyvitystä.',
  },
  {
    q: 'Voiko asuntolainaan saada lyhennysvapaata?',
    a: 'Kyllä. Useimmat pankit tarjoavat mahdollisuuden lyhennysvapaaseen, jolloin maksat vain korot. Lyhennysvapaata myönnetään tyypillisesti 1-2 vuotta kerrallaan. Huomaa, että lyhennysvapaalla lainan kokonaiskustannus kasvaa, koska pääoma ei lyhene mutta korot kertyvät.',
  },
  {
    q: 'Kannattaako valita kiinteä vai vaihtuva korko?',
    a: 'Vaihtuva korko (Euribor + marginaali) on yleisempi ja historiallisesti edullisempi pitkällä aikavälillä. Kiinteä korko tuo ennustettavuutta ja suojaa korkojen nousulta — se sopii erityisesti, jos taloutesi on tiukalla eikä yllätyksiä saa tulla. Monet pankit tarjoavat myös yhdistelmämallia, jossa osa lainasta on kiinteäkorkoista ja osa vaihtuvakorkoista.',
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
    { '@type': 'ListItem', position: 1, name: 'Etusivu', item: SITE_URL },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Asuntolaina',
      item: `${SITE_URL}/asuntolaina`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function AsuntolainaPage() {
  const allProducts = getProductsSortedByRate('asuntolaina');
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
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 text-sm text-blue-200/70">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Etusivu
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-white font-medium">Asuntolaina</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Asuntolaina{' '}
              <span className="block text-[#ecc94b]">
                Vertaa marginaalit ja löydä paras
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Vertaa {allProducts.length} asuntolainaa Suomen johtavilta
              pankeilta. Löydä edullisin marginaali ja säästä tuhansia euroja
              lainan kokonaiskustannuksissa.
            </p>

            {/* Key stats */}
            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Marginaali alkaen</p>
                <p className="text-2xl font-bold text-white">0,33 %</p>
                <p className="text-xs text-blue-200/50 mt-1">+ Euribor</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Lainasumma</p>
                <p className="text-2xl font-bold text-white">
                  10 000–1 000 000
                </p>
                <p className="text-xs text-blue-200/50 mt-1">euroa</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Laina-aika</p>
                <p className="text-2xl font-bold text-white">1–30 v</p>
                <p className="text-xs text-blue-200/50 mt-1">vuotta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Euribor tracker */}
      <section className="py-8 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-4">
            <Percent className="h-5 w-5 text-[#1a365d]" />
            <h2 className="text-lg font-semibold text-gray-900">
              Euribor-korot juuri nyt
            </h2>
            <span className="text-xs text-gray-400">
              Päivitetty {EURIBOR_UPDATED}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4 sm:gap-6">
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Euribor 12 kk</p>
              <p className="text-2xl font-bold text-[#1a365d]">
                {formatPercentage(EURIBOR_12M, 3)}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Euribor 6 kk</p>
              <p className="text-2xl font-bold text-[#1a365d]">
                {formatPercentage(EURIBOR_6M, 3)}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center">
              <p className="text-sm text-gray-500 mb-1">Euribor 3 kk</p>
              <p className="text-2xl font-bold text-[#1a365d]">
                {formatPercentage(EURIBOR_3M, 3)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Euribor-korot ovat suuntaa-antavia ja perustuvat viimeisimpiin
            saatavilla oleviin tietoihin. Tarkista aina ajantasaiset korot
            Suomen Pankin verkkosivuilta.
          </p>
        </div>
      </section>

      {/* Top mortgage providers */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Edullisimmat asuntolainat
              </h2>
              <p className="mt-2 text-gray-600">
                Järjestetty todellisen vuosikoron mukaan — edullisin ensin
              </p>
            </div>
            <Link
              href="/vertailu?type=asuntolaina"
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
                      <p className="text-xs text-gray-500">Marginaali</p>
                      <p className="text-lg font-bold text-[#1a365d]">
                        {formatPercentage(product.nominalRate.min)} –{' '}
                        {formatPercentage(product.nominalRate.max)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Tod. vuosikorko</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatPercentage(product.effectiveRate.min)} –{' '}
                        {formatPercentage(product.effectiveRate.max)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Enimmäismäärä</p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(product.maxAmount)}
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
              href="/vertailu?type=asuntolaina"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors w-full"
            >
              Vertaa kaikkia asuntolainoja
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Asuntolainan ABC */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Key className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Asuntolainan ABC
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
              <p>
                Asuntolaina on Suomen yleisin ja tyypillisesti edullisin
                lainamuoto, koska asunto toimii lainan vakuutena. Tämän vuoksi
                pankit pystyvät tarjoamaan merkittävästi edullisempia korkoja
                kuin vakuudettomissa lainoissa.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
                Asuntolainan tärkeät käsitteet
              </h3>

              <div className="grid gap-4">
                {[
                  {
                    term: 'Marginaali',
                    icon: TrendingUp,
                    desc: 'Pankin oma osuus asuntolainan korosta. Marginaali lisätään viitekoron (Euribor) päälle. Tyypillinen marginaali vuonna 2026 on 0,33–1,3 % lainanottajan profiilista riippuen. Marginaali on ainoa osa korkoa, josta voi neuvotella.',
                  },
                  {
                    term: 'Viitekorko (Euribor)',
                    icon: Percent,
                    desc: 'Euribor on pankkien välinen viitekorko, johon asuntolainan korko sidotaan. Yleisin on Euribor 12 kk, joka päivittyy kerran vuodessa. Viitekoron kehitys riippuu EKP:n korkopolitiikasta ja markkinaympäristöstä.',
                  },
                  {
                    term: 'Laina-aika',
                    icon: Home,
                    desc: 'Asuntolainan tyypillinen laina-aika on 20–30 vuotta. Pidempi laina-aika pienentää kuukausierää mutta kasvattaa kokonaiskorkokustannuksia merkittävästi. Enimmäissuositus laina-ajalle on 30 vuotta.',
                  },
                  {
                    term: 'Vakuudet',
                    icon: ShieldCheck,
                    desc: 'Ostettava asunto toimii ensisijaisena vakuutena. Pankit hyväksyvät tyypillisesti 70–75 % asunnon arvosta lainan vakuudeksi. Loppu osuus katetaan muilla vakuuksilla — valtiontakaus (ASP), henkilötakaus, tai muu vakuus.',
                  },
                ].map((item) => (
                  <div
                    key={item.term}
                    className="rounded-xl border border-gray-200 bg-white p-5"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <item.icon className="h-5 w-5 text-[#1a365d]" />
                      <h4 className="font-semibold text-gray-900">
                        {item.term}
                      </h4>
                    </div>
                    <p className="text-sm text-gray-700">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* First-time buyer tips */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Building2 className="h-5 w-5 text-[#38a169]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Ensiasunnon ostajan opas
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: '1. Aloita ASP-säästäminen ajoissa',
                  desc: 'ASP-tili on ensiasunnon ostajan paras työkalu. Säästä vähintään 150 euroa/kk 8 vuosineljänneksenä ja saat valtiontakauksen lainalle sekä lisäkoron säästöille. Tilin voi avata 15–44-vuotiaana.',
                },
                {
                  title: '2. Selvitä maksukykysi realistisesti',
                  desc: 'Nyrkkisääntö: asumiskulut (lainan lyhennys + korot + vastike + vakuutukset) eivät saisi ylittää 40 % nettotulostasi. Huomioi korkonnousuriski — testaa, miten taloutesi kestää 2–3 prosenttiyksikön koronnousun.',
                },
                {
                  title: '3. Kysy tarjouksia vähintään 3–5 pankilta',
                  desc: 'Marginaalierot pankkien välillä voivat olla 0,3–0,5 prosenttiyksikköä. 200 000 euron lainassa tämä tarkoittaa 600–1 000 euroa vuodessa. 25 vuoden aikana säästät helposti useita tuhansia euroja.',
                },
                {
                  title: '4. Älä unohda sivukuluja',
                  desc: 'Varaa rahaa varainsiirtoveroon (1,5 % osakeasunnosta — ensiasunnon ostaja vapautettu), muuttokuluihin, kodinkoneiden hankintaan ja mahdollisiin remontteihin. Peukalosääntö: 3–5 % asunnon hinnasta.',
                },
                {
                  title: '5. Harkitse lainasuojausta',
                  desc: 'Korkosuojaus (korkokatto) suojaa kuukausieriesi nousulta. Se maksaa, mutta voi tuoda mielenrauhaa erityisesti suurissa lainoissa. Vaihtoehtoisesti osa lainasta voi olla kiinteäkorkoista.',
                },
                {
                  title: '6. Ymmärrä lyhennysmuodot',
                  desc: 'Annuiteetti: kuukausierä pysyy samana (koron vaihtuessa). Tasalyhennys: pääoman lyhennys pysyy samana, korot pienenevät. Kiinteä tasaerä: kuukausierä pysyy samana koko laina-ajan. Annuiteetti on yleisin valinta.',
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

            <div className="mt-6 rounded-xl bg-amber-50 border border-amber-200 p-5">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">
                    Muista stressitesti
                  </p>
                  <p>
                    Ennen lainan ottoa testaa, miten taloutesi selviää, jos korot
                    nousevat 2–3 prosenttiyksikköä nykyisestä. Jos 200 000 euron
                    lainan kuukausierä 4 %:n korolla on noin 1 050 euroa, 7 %:n
                    korolla se olisi jo noin 1 400 euroa. Varmista, että
                    pystyt maksamaan myös korkeammat erät.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Usein kysytyt kysymykset asuntolainasta
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
            Löydä edullisin asuntolaina
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Vertaa marginaaleja ja todellisia vuosikorkoja Suomen johtavilta
            pankeilta. Yhdenkin kymmenyksen ero marginaalissa säästää tuhansia
            euroja pitkällä aikavälillä.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vertailu?type=asuntolaina"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Vertaa asuntolainoja
            </Link>
            <Link
              href="/lainanantajat"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Selaa pankkeja
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
