import { Metadata } from 'next';
import Link from 'next/link';
import {
  Building,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Info,
  Calculator,
  HelpCircle,
  AlertTriangle,
  Briefcase,
  TrendingUp,
  FileText,
  Wallet,
} from 'lucide-react';
import { getProductsSortedByRate } from '@/data/providers';
import { SITE_URL, SITE_NAME } from '@/lib/constants';
import { formatCurrency, formatPercentage, getApplyUrl } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Yrityslaina — Rahoitusta yritystoimintaan';
const pageDescription =
  'Vertaa yrityslainoja Suomessa. Investointilainat, käyttöpääomalainat ja yrittäjälainat alkaen 4,5 %. Löydä sopiva rahoitus yrityksellesi.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/yrityslaina` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/yrityslaina`,
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
    q: 'Mikä on yrityslainan ja kulutusluoton ero?',
    a: 'Yrityslaina on tarkoitettu yritystoiminnan rahoittamiseen — investointeihin, käyttöpääomaan tai toiminnan laajentamiseen. Kulutusluotto taas on yksityishenkilölle henkilökohtaisiin tarpeisiin. Yrityslainassa hakijana on yritys (Y-tunnus), ja lainapäätöksessä arvioidaan yrityksen taloudellista tilannetta, ei yrittäjän henkilökohtaisia tuloja.',
  },
  {
    q: 'Mitä yrityslainaan tarvitaan?',
    a: 'Tyypillisesti tarvitaan: Y-tunnus, viimeisin tilinpäätös tai veroilmoitus, liiketoimintasuunnitelma (erityisesti uusille yrityksille), yrityksen pankkitiliotteet, ja selvitys lainan käyttötarkoituksesta. Vaatimukset vaihtelevat lainanantajittain — Finnveralta haettaessa on omat prosessinsa.',
  },
  {
    q: 'Saanko yrityslainaa uudelle yritykselle?',
    a: 'Se on vaikeampaa kuin vakiintuneelle yritykselle, mutta mahdollista. Finnvera tarjoaa aloittaville yrityksille alkutakausta ja yrittäjälainaa. Pankit voivat vaatia henkilökohtaista takausta. Hyvä liiketoimintasuunnitelma ja oma pääoma parantavat mahdollisuuksia merkittävästi.',
  },
  {
    q: 'Tarvitaanko yrityslainaan vakuuksia?',
    a: 'Riippuu lainanantajasta ja summasta. Monet fintech-yritykset tarjoavat vakuudettomia yrityslainoja 5 000–500 000 euroon asti. Perinteiset pankit vaativat yleensä vakuuksia suuremmissa lainoissa. Finnveran takaus voi korvata puuttuvia vakuuksia.',
  },
  {
    q: 'Mikä on Finnveran rooli yritysrahoituksessa?',
    a: 'Finnvera on valtion omistama erityisrahoittaja, joka tarjoaa yrityksille lainoja, takauksia ja vientitakuita. Finnvera täydentää pankkien rahoitusta — erityisesti tilanteissa, joissa pankki ei voi myöntää riittävää rahoitusta ilman lisävakuuksia. Finnveran alkutakaus on tarkoitettu alle 3 vuotta vanhoille yrityksille.',
  },
  {
    q: 'Miten yrityslainan korot määräytyvät?',
    a: 'Yrityslainan korot riippuvat yrityksen luottoluokituksesta, toimialasta, liikevaihdosta, tuloksesta, vakuuksista ja lainan koosta. Korkojen vaihteluväli on suuri — vakavaraiset yritykset voivat saada lainaa 4–6 %:n korolla, kun pienemmille yrityksille korko voi olla 10–17 %.',
  },
  {
    q: 'Ovatko yrityslainan korot vähennyskelpoisia?',
    a: 'Kyllä. Yrityslainan korot ovat täysin vähennyskelpoisia liiketoiminnan kuluja, toisin kuin yksityishenkilöiden kulutusluottojen korot. Tämä tarkoittaa, että lainan todellinen kustannus yritykselle on alhaisempi kuin nimelliskorko antaa ymmärtää.',
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
      name: 'Yrityslaina',
      item: `${SITE_URL}/yrityslaina`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function YrityslainaPage() {
  const allProducts = getProductsSortedByRate('yrityslaina');
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
              <li className="text-white font-medium">Yrityslaina</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Yrityslaina{' '}
              <span className="block text-[#ecc94b]">
                Rahoitusta yritystoimintaan
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Vertaa yrityslainoja pankeista, fintech-rahoittajista ja
              vertaislainapalveluista. Löydä sopiva rahoitus investointiin,
              käyttöpääomaan tai kasvuun.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Korot alkaen</p>
                <p className="text-2xl font-bold text-white">4,5 %</p>
                <p className="text-xs text-blue-200/50 mt-1">Nimelliskorko</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Lainasumma</p>
                <p className="text-2xl font-bold text-white">
                  3 000–500 000
                </p>
                <p className="text-xs text-blue-200/50 mt-1">euroa</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Laina-aika</p>
                <p className="text-2xl font-bold text-white">0,5–5 v</p>
                <p className="text-xs text-blue-200/50 mt-1">vuotta</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Loan types */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Yrityslainan tyypit
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 mb-4">
                <TrendingUp className="h-6 w-6 text-[#1a365d]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Investointilaina
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Pitkäaikaisiin investointeihin: toimitilat, koneet, laitteet,
                teknologia. Tyypillisesti 1–5 vuotta, usein vakuudellinen.
                Investoinnin tulee tuottaa yritykselle arvoa, joka ylittää
                lainan kustannukset.
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>Summa: 10 000 – 500 000 euroa</li>
                <li>Korko: 4–12 %</li>
                <li>Aika: 1–5 vuotta</li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <Wallet className="h-6 w-6 text-[#38a169]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Käyttöpääomalaina
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Lyhyen aikavälin kassavajeiden kattamiseen: palkkojen maksu,
                varaston täydentäminen, kausivaihtelut. Tyypillisesti 6–24
                kuukautta, joustava. Voi olla limiittimuotoinen.
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>Summa: 3 000 – 200 000 euroa</li>
                <li>Korko: 5–15 %</li>
                <li>Aika: 6–24 kuukautta</li>
              </ul>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-100 mb-4">
                <Briefcase className="h-6 w-6 text-purple-700" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Yrittäjälaina
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Yrittäjän henkilökohtainen laina yritystoiminnan aloittamiseen
                tai pääomasijoitukseen. Finnvera tarjoaa yrittäjälainaa
                enintään 100 000 euroa. Sopii erityisesti aloittaville
                yrittäjille.
              </p>
              <ul className="space-y-1 text-xs text-gray-500">
                <li>Summa: 5 000 – 100 000 euroa</li>
                <li>Korko: 5–10 %</li>
                <li>Aika: 1–5 vuotta</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mitä yrityslainaan vaaditaan?
              </h2>
            </div>

            <p className="text-gray-700 mb-6">
              Vaatimukset vaihtelevat lainanantajittain, mutta alla ovat
              tyypilliset edellytykset yrityslainalle:
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <Building className="h-4 w-4 text-[#1a365d]" />
                  Yrityksen tiedot
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#38a169] shrink-0 mt-0.5" />
                    Voimassa oleva Y-tunnus
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#38a169] shrink-0 mt-0.5" />
                    Vähintään 1–2 vuotta liiketoimintaa (vaihtelee)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#38a169] shrink-0 mt-0.5" />
                    Viimeisin tilinpäätös tai veroilmoitus
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#38a169] shrink-0 mt-0.5" />
                    Positiivinen liikevaihto ja mieluiten tulos
                  </li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#1a365d]" />
                  Hakemuksen liitteet
                </h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#38a169] shrink-0 mt-0.5" />
                    Liiketoimintasuunnitelma (erityisesti uudet yritykset)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#38a169] shrink-0 mt-0.5" />
                    Selvitys lainan käyttötarkoituksesta
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#38a169] shrink-0 mt-0.5" />
                    Pankkitiliotteet (3–6 kk)
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-[#38a169] shrink-0 mt-0.5" />
                    Mahdolliset vakuustiedot
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#1a365d] shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">
                    Vinkki aloitteleville yrittäjille
                  </p>
                  <p>
                    Jos yrityksesi on alle 3 vuotta vanha, tutustu Finnveran
                    alkutakaukseen. Finnvera voi taata jopa 80 % pankin
                    myöntämästä lainasta, mikä parantaa rahoituksen saamista
                    merkittävästi. Myös ELY-keskusten yritystuet ja Business
                    Finlandin rahoitus voivat olla vaihtoehtoja.
                  </p>
                </div>
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
                Yrityslainoja tarjoavat rahoittajat
              </h2>
              <p className="mt-2 text-gray-600">
                Järjestetty todellisen vuosikoron mukaan
              </p>
            </div>
            <Link
              href="/vertailu?type=yrityslaina"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors"
            >
              Vertaa kaikkia
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mb-4">
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
                    rel={
                      product.provider.isAffiliate
                        ? 'noopener noreferrer nofollow sponsored'
                        : 'noopener noreferrer nofollow'
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors whitespace-nowrap"
                  >
                    Hae lainaa
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>

                {product.restrictions && product.restrictions.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.restrictions.map((restriction) => (
                      <span
                        key={restriction}
                        className="inline-block rounded-full bg-amber-50 px-3 py-1 text-xs text-amber-700"
                      >
                        {restriction}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-8 sm:hidden">
            <Link
              href="/vertailu?type=yrityslaina"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-5 py-3 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors w-full"
            >
              Vertaa kaikkia yrityslainoja
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Financing alternatives */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6">
              Muut rahoitusvaihtoehdot yrityksille
            </h2>
            <p className="text-gray-700 mb-6">
              Yrityslaina ei ole ainoa vaihtoehto. Harkitse myös näitä
              rahoitusmuotoja yrityksesi tilanteen mukaan:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: 'Finnveran takaus tai laina',
                  desc: 'Valtion erityisrahoittaja, joka täydentää pankkirahoitusta. Erityisen hyödyllinen aloittaville yrityksille ja tilanteissa, joissa vakuudet eivät riitä. Alkutakaus kattaa jopa 80 % pankkilainasta.',
                },
                {
                  title: 'Laskurahoitus (factoring)',
                  desc: 'Myyt myyntisaatavasi rahoitusyhtiölle ja saat rahat heti. Sopii yrityksille, joilla on pitkiä maksuaikoja (30–90 päivää) ja kassavirta kiristää. Svea, Collector ja monet pankit tarjoavat tätä.',
                },
                {
                  title: 'Business Finland -rahoitus',
                  desc: 'Innovaatiorahoitusta tutkimus- ja kehitysprojekteihin. Avustukset ja lainat tuotekehitykseen, kansainvälistymiseen ja kasvuun. Vaatii tyypillisesti merkittävää omaa panostusta.',
                },
                {
                  title: 'ELY-keskuksen yritystuet',
                  desc: 'Alueelliset yritystuet investointeihin, kehittämiseen ja kansainvälistymiseen. Tuen suuruus vaihtelee alueittain ja hankkeittain. Haku avoinna tyypillisesti jatkuvasti.',
                },
                {
                  title: 'Joukkorahoitus (crowdfunding)',
                  desc: 'Osake-, laina- tai tuotepohjainen joukkorahoitus yleisolta. Sopii erityisesti kuluttajatuotteille ja skaalautuville liiketoimintamalleille. Invesdor ja Springvest ovat suomalaisia alustoja.',
                },
              ].map((alt) => (
                <div
                  key={alt.title}
                  className="rounded-lg border border-gray-200 bg-white p-5 hover:border-[#1a365d]/20 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {alt.title}
                  </h3>
                  <p className="text-sm text-gray-600">{alt.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
              Usein kysytyt kysymykset yrityslainasta
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
            Löydä sopiva rahoitus yrityksellesi
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Vertaa yrityslainoja pankeista ja vaihtoehtoisista rahoittajista.
            Löydä sopiva ratkaisu yrityksesi tilanteeseen.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vertailu?type=yrityslaina"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Vertaa yrityslainoja
            </Link>
            <Link
              href="/kulutusluotto"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Kulutusluotot henkilökohtaiseen tarpeeseen
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
              { href: '/yhdistelylaina', label: 'Yhdistelylaina' },
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
