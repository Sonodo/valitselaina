import { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Info,
  HelpCircle,
  AlertTriangle,
  Database,
  Search,
  UserCheck,
  Building2,
  Calendar,
  Lock,
  Scale,
  FileText,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle =
  'Positiivinen luottorekisteri — Mikä se on ja miten se vaikuttaa sinuun?';
const pageDescription =
  'Kattava opas Suomen positiivisesta luottorekisteristä (PTL). Mikä se on, mitä tietoja tallennetaan, miten tarkistat omat tietosi ja miten rekisteri vaikuttaa lainan hakemiseen.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/positiivinen-luottorekisteri` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/positiivinen-luottorekisteri`,
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
    q: 'Mikä on positiivinen luottorekisteri?',
    a: 'Positiivinen luottorekisteri (virallisesti positiivinen luottotietorekisteri, PTL) on Verohallinnon tulorekisteriyksikön ylläpitämä rekisteri, johon tallennetaan tiedot kuluttajien luotoista. "Positiivinen" tarkoittaa, että rekisterissä näkyvät myös ajallaan hoidetut luotot — ei vain maksuhäiriöt kuten perinteisissä luottotiedoissa.',
  },
  {
    q: 'Koska positiivinen luottorekisteri otettiin käyttöön?',
    a: 'Rekisteri otettiin käyttöön kahdessa vaiheessa. Ensimmäisessä vaiheessa huhtikuussa 2024 rekisteriin alettiin tallentaa kuluttajaluotot (kulutusluotot, luottokortit, osamaksut). Toisessa vaiheessa joulukuussa 2025 rekisteriin lisättiin myös asuntolainat ja muut vakuudelliset luotot.',
  },
  {
    q: 'Mitä tietoja positiiviseen luottorekisteriin tallennetaan?',
    a: 'Rekisteriin tallennetaan luoton tyyppi, myöntäjä, myöntöpäivä, luoton määrä, jäljellä oleva saldo, korko, laina-aika, kuukausierä ja maksun tila. Myös luottokorttien luottolimiitit ja käytetyt määrät tallennetaan. Rekisteriin EI tallenneta luoton käyttötarkoitusta eikä yksittäisiä ostotapahtumia.',
  },
  {
    q: 'Miten voin tarkistaa omat tietoni positiivisesta luottorekisteristä?',
    a: 'Voit tarkistaa omat tietosi tulorekisteri.fi-palvelusta kirjautumalla pankkitunnuksilla tai mobiilivarmenteella. Palvelu on maksuton ja sinulla on oikeus tarkistaa omat tietosi milloin tahansa. Jos tiedoissa on virheitä, voit tehdä oikaisupyynnön suoraan palvelun kautta.',
  },
  {
    q: 'Miten positiivinen luottorekisteri eroaa Suomen Asiakastiedosta?',
    a: 'Suomen Asiakastieto (nykyään Dun & Bradstreet) on yksityinen yritys, joka ylläpitää maksuhäiriörekisteriä — sinne kirjautuvat vain maksuhäiriöt. Positiivinen luottorekisteri on viranomaisen (Verohallinnon) ylläpitämä ja sisältää KAIKKI luotot, myös hyvin hoidetut. Molemmat ovat edelleen käytössä rinnakkain.',
  },
  {
    q: 'Vaikuttaako positiivinen luottorekisteri lainan saamiseen?',
    a: 'Kyllä. Lainanantajien on lain mukaan tarkistettava hakijan tiedot positiivisesta luottorekisteristä ennen luoton myöntämistä. Hyvä luottohistoria voi auttaa saamaan paremman koron. Toisaalta rekisteri voi vaikeuttaa lainan saamista, jos hakijalla on jo paljon luottoja — tämä on kuitenkin tarkoituksenmukaista ylivelkaantumisen ehkäisemiseksi.',
  },
  {
    q: 'Näkevätkö yritykset ja työnantajat luottorekisteritietoni?',
    a: 'Eivät. Positiivisen luottorekisterin tietoja voivat käyttää vain luotonantajat (pankit ja muut rahoituslaitokset) ja viranomaiset laissa määrättyihin tarkoituksiin. Työnantajilla, vuokranantajilla tai muilla tahoilla ei ole pääsyä rekisteriin. Tiedot ovat salassa pidettäviä.',
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
      name: 'Positiivinen luottorekisteri',
      item: `${SITE_URL}/positiivinen-luottorekisteri`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PositiivinenLuottorekisteriPage() {
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
              <li className="text-white font-medium">
                Positiivinen luottorekisteri
              </li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Positiivinen luottorekisteri{' '}
              <span className="block text-[#ecc94b]">
                Kattava opas kuluttajalle
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Suomen positiivinen luottotietorekisteri (PTL) muuttaa
              merkittävästi lainamarkkinoita. Rekisteriin tallennetaan tiedot
              kaikista kuluttajien luotoista — myös ajallaan hoidetuista.
              Kerromme, mitä se tarkoittaa sinulle lainanhakijana.
            </p>

            <div className="mt-8 grid grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Käyttöönotto</p>
                <p className="text-2xl font-bold text-white">2024–25</p>
                <p className="text-xs text-blue-200/50 mt-1">
                  Kahdessa vaiheessa
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Ylläpitäjä</p>
                <p className="text-2xl font-bold text-white">Vero</p>
                <p className="text-xs text-blue-200/50 mt-1">
                  Tulorekisteriyksikkö
                </p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Koskee</p>
                <p className="text-2xl font-bold text-white">Kaikkia</p>
                <p className="text-xs text-blue-200/50 mt-1">
                  joilla on luottoja
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What is it */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Database className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mikä on positiivinen luottorekisteri?
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Positiivinen luottotietorekisteri (PTL) on Suomessa vuonna 2024
                käyttöön otettu viranomaisen ylläpitämä rekisteri, johon
                tallennetaan kattavat tiedot kuluttajien luotoista.
              </p>

              <p>
                Nimi <strong>&quot;positiivinen&quot;</strong> tulee siitä, että
                rekisteriin tallennetaan tietoja kaikista luotoista — myös
                niistä, jotka on hoidettu moitteettomasti. Aiemmin
                Suomessa oli käytössä vain &quot;negatiivinen&quot;
                luottotietorekisteri (Suomen Asiakastieto / Dun &amp;
                Bradstreet), johon kirjautuivat ainoastaan maksuhäiriöt.
              </p>

              <p>
                Rekisteriä ylläpitää{' '}
                <strong>Verohallinnon tulorekisteriyksikkö</strong>, sama
                organisaatio joka ylläpitää tulorekisteriä. Kyseessä on siis
                viranomaisen — ei yksityisen yrityksen — ylläpitämä rekisteri.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Calendar className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Käyttöönoton aikataulu
              </h2>
            </div>

            <div className="space-y-6">
              {/* Phase 1 */}
              <div className="relative pl-8 border-l-2 border-[#1a365d]">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-[#1a365d]" />
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      Valmis
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      Vaihe 1 — Huhtikuu 2024
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Kuluttajaluotot
                  </h3>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Kulutusluotot ja pienluotot
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Luottokortit ja tililuotot
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Osamaksusopimukset
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Luotonantajien velvollisuus ilmoittaa ja tarkistaa tiedot
                    </li>
                  </ul>
                </div>
              </div>

              {/* Phase 2 */}
              <div className="relative pl-8 border-l-2 border-[#1a365d]">
                <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-[#1a365d]" />
                <div className="rounded-xl border border-gray-200 bg-white p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                      Valmis
                    </span>
                    <span className="text-sm font-semibold text-gray-900">
                      Vaihe 2 — Joulukuu 2025
                    </span>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Kaikki luotot mukaan lukien asuntolainat
                  </h3>
                  <ul className="space-y-1.5 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Asuntolainat
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Opintolainat
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Muut vakuudelliset luotot
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />
                      Kattava kokonaiskuva kuluttajan kaikista luotoista
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What data is stored */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Mitä tietoja rekisteriin tallennetaan?
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {/* Stored */}
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800 mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  Tallennetaan
                </h3>
                <ul className="space-y-3">
                  {[
                    'Luoton tyyppi (kulutusluotto, asuntolaina jne.)',
                    'Luotonantajan tiedot',
                    'Luoton myöntöpäivä ja laina-aika',
                    'Luoton alkuperäinen määrä',
                    'Jäljellä oleva saldo',
                    'Korko ja kuukausierä',
                    'Maksun tila (ajallaan / myöhässä)',
                    'Luottokortin luottoraja ja käytetty määrä',
                    'Mahdolliset lyhennysvapaat jaksot',
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

              {/* Not stored */}
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-700 mb-4">
                  <Lock className="h-5 w-5" />
                  EI tallenneta
                </h3>
                <ul className="space-y-3">
                  {[
                    'Luoton käyttötarkoitusta',
                    'Yksittäisiä ostotapahtumia',
                    'Tulotietoja (ne ovat tulorekisterissä)',
                    'Varallisuustietoja',
                    'Yritysten luottoja',
                    'Vuokra- tai laskutustietoja',
                    'Luotonantajan sisäistä luottoluokitusta',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-600"
                    >
                      <span className="h-4 w-4 shrink-0 mt-0.5 text-center text-gray-400">
                        —
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How to check your data */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Search className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Näin tarkistat omat tietosi
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  step: '1',
                  title: 'Mene tulorekisteri.fi-palveluun',
                  desc: 'Positiivisen luottorekisterin tiedot löytyvät Tulorekisterin sähköisestä asiointipalvelusta osoitteessa tulorekisteri.fi.',
                },
                {
                  step: '2',
                  title: 'Kirjaudu pankkitunnuksilla',
                  desc: 'Tunnistaudu palveluun pankkitunnuksilla, mobiilivarmenteella tai varmennekorttilla. Palvelu on maksuton.',
                },
                {
                  step: '3',
                  title: 'Valitse luottotietonäkymä',
                  desc: 'Valitse positiivisen luottotietorekisterin osio, josta näet kaikki luottosi ja niiden ajantasaiset tiedot.',
                },
                {
                  step: '4',
                  title: 'Tarkista tiedot ja tee tarvittaessa oikaisupyyntö',
                  desc: 'Jos tiedoissa on virheitä, voit tehdä oikaisupyynnön suoraan palvelun kautta. Luotonantajan on korjattava virheelliset tiedot.',
                },
              ].map((item) => (
                <div
                  key={item.step}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 bg-white p-5"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a365d] text-sm font-bold text-white">
                    {item.step}
                  </span>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-[#1a365d] shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">Vinkki</p>
                  <p>
                    Tarkista omat luottotietosi säännöllisesti, erityisesti
                    ennen lainan hakemista. Näin varmistut, että tiedot ovat
                    oikein eikä kukaan ole ottanut luottoja nimissäsi.
                    Omien tietojen tarkistaminen on aina ilmaista.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it affects loan applications */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <UserCheck className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Miten rekisteri vaikuttaa lainan hakemiseen?
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Positiivinen luottorekisteri muuttaa lainamarkkinoita
                merkittävästi. Lainanantajien on lain mukaan tarkistettava
                hakijan tiedot rekisteristä ennen luoton myöntämistä. Tämä
                vaikuttaa sekä lainan saatavuuteen että hinnoitteluun.
              </p>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 gap-6">
              {/* Positive effects */}
              <div className="rounded-xl border border-green-200 bg-green-50/50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-green-800 mb-4">
                  <CheckCircle2 className="h-5 w-5" />
                  Hyödyt lainanhakijalle
                </h3>
                <ul className="space-y-3">
                  {[
                    'Hyvä luottohistoria voi johtaa edullisempaan korkoon',
                    'Luotonantaja näkee kokonaiskuvan — ei tarvitse arvailla',
                    'Vähemmän turhia hylkäyksiä kun tiedot ovat avoimet',
                    'Lainapäätökset perustuvat todelliseen dataan, eivät oletuksiin',
                    'Läpinäkyvyys parantaa kilpailua lainanantajien välillä',
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

              {/* Potential challenges */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-semibold text-amber-800 mb-4">
                  <AlertTriangle className="h-5 w-5" />
                  Huomioitavaa
                </h3>
                <ul className="space-y-3">
                  {[
                    'Paljon luottoja voi vaikeuttaa uuden lainan saamista',
                    'Maksuviiveet näkyvät rekisterissä — hoidetutkin luotot kirjataan',
                    'Luotonantaja näkee kokonaisvelan — ei voi piilottaa olemassaolevia luottoja',
                    'Luottorajan käyttöaste luottokortilla voi vaikuttaa arvioon',
                    'Päätös perustuu kokonaisarvioon — rekisteri on vain yksi osa',
                  ].map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-amber-900"
                    >
                      <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PTL vs Asiakastieto */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Scale className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                PTL vs. Suomen Asiakastieto
              </h2>
            </div>

            <p className="text-gray-700 mb-6">
              Monet ihmiset sekoittavat positiivisen luottorekisterin ja
              perinteisen luottotietorekisterin (Suomen Asiakastieto / Dun &amp;
              Bradstreet) toisiinsa. Kyseessä on kaksi eri järjestelmää, jotka
              toimivat rinnakkain.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="bg-[#1a365d] text-white">
                    <th className="px-4 py-3 text-left font-semibold rounded-tl-lg">
                      Ominaisuus
                    </th>
                    <th className="px-4 py-3 text-left font-semibold">
                      Positiivinen luottorekisteri (PTL)
                    </th>
                    <th className="px-4 py-3 text-left font-semibold rounded-tr-lg">
                      Suomen Asiakastieto
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Ylläpitäjä
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Verohallinto (viranomainen)
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Dun &amp; Bradstreet (yksityinen yritys)
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Sisältö
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Kaikki luotot (myös hyvin hoidetut)
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Vain maksuhäiriöt
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Käyttöönotto
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      2024 (uusi)
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      1960-luvulta asti
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Tietojen tarkistus
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Ilmainen (tulorekisteri.fi)
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      1 kerta/vuosi ilmainen, lisätarkistukset maksullisia
                    </td>
                  </tr>
                  <tr className="bg-white">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Pääsy tietoihin
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Vain luotonantajat ja viranomaiset
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Luotonantajat, vuokranantajat, työnantajat (osittain)
                    </td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-medium text-gray-900">
                      Status
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Molemmat käytössä rinnakkain
                    </td>
                    <td className="px-4 py-3 text-gray-700">
                      Molemmat käytössä rinnakkain
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Impact on loan comparison */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <ShieldCheck className="h-5 w-5 text-[#38a169]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Vaikutus lainavertailuun ja markkinoihin
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
              <p>
                Positiivinen luottorekisteri on iso muutos Suomen
                rahoitusmarkkinoille. Sen pitkäaikaiset vaikutukset alkavat
                näkyä vähitellen.
              </p>
            </div>

            <div className="mt-6 space-y-4">
              {[
                {
                  icon: ShieldCheck,
                  title: 'Ylivelkaantumisen ehkäisy',
                  desc: 'Luotonantajat näkevät hakijan kaikki luotot. Aiemmin hakija saattoi hakea lainaa usealta taholta samanaikaisesti ilman, että mikään niistä näki kokonaiskuvaa. Nyt tämä ei ole enää mahdollista.',
                },
                {
                  icon: Scale,
                  title: 'Tarkempaa riskihinnoittelua',
                  desc: 'Kun luotonantaja näkee hakijan kokonaisvelkatilanteen ja maksuhistorian, se voi hinnoitella luoton tarkemmin. Tämä voi johtaa edullisempiin korkoihin vastuullisille lainanottajille.',
                },
                {
                  icon: Building2,
                  title: 'Kilpailun lisääntyminen',
                  desc: 'Kaikilla luotonantajilla on pääsy samaan tietoon. Pienet pankit ja uudet toimijat voivat arvioida luottoriskiä yhtä hyvin kuin suuret pankit, joilla on pitkät asiakashistoriat.',
                },
                {
                  icon: UserCheck,
                  title: 'Kuluttajan aseman vahvistuminen',
                  desc: 'Kuluttaja voi tarkistaa omat tietonsa ja varmistaa, että ne ovat oikein. Läpinäkyvyys lisää luottamusta ja auttaa kuluttajaa ymmärtämään oman taloudellisen tilanteensa paremmin.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-start gap-4 rounded-xl border border-gray-200 p-5"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100">
                    <item.icon className="h-5 w-5 text-[#1a365d]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Privacy and rights */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Lock className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Tietosuoja ja sinun oikeutesi
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  title: 'Tiedot ovat salassa pidettäviä',
                  desc: 'Positiivisen luottorekisterin tiedot ovat salassa pidettäviä. Vain luotonantajat ja erikseen laissa määrätyt viranomaiset voivat käyttää tietoja — ja vain laissa säädettyihin tarkoituksiin.',
                },
                {
                  title: 'Työnantajat eivät pääse tietoihin',
                  desc: 'Toisin kuin Suomen Asiakastiedosta, positiivisesta luottorekisteristä työnantajat tai vuokranantajat eivät voi tarkistaa tietoja. Rekisterin käyttö on rajattu tiukasti.',
                },
                {
                  title: 'Oikeus tarkistaa ja oikaista',
                  desc: 'Sinulla on oikeus tarkistaa omat tietosi milloin tahansa ilmaiseksi. Jos tiedoissa on virheitä, voit tehdä oikaisupyynnön ja luotonantajan on korjattava tiedot viipymättä.',
                },
                {
                  title: 'Tietojen säilytysaika',
                  desc: 'Luottotiedot poistetaan rekisteristä luoton päättymisen jälkeen lain mukaisessa määräajassa. Tiedot eivät jää rekisteriin pysyvästi.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-gray-200 p-5 hover:border-[#1a365d]/20 transition-colors"
                >
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
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
              Usein kysytyt kysymykset
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
            Vertaa lainoja tietoisena kuluttajana
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Positiivinen luottorekisteri lisää läpinäkyvyyttä. Hyödynnä
            sitä vertaamalla lainoja ja löytämällä sinulle edullisin
            vaihtoehto.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/vertailu"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Search className="h-5 w-5" />
              Vertaa lainoja
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
            Tutustu myös
          </h3>
          <div className="flex flex-wrap gap-3">
            {[
              { href: '/kulutusluotto', label: 'Kulutusluotto' },
              { href: '/asuntolaina', label: 'Asuntolaina' },
              { href: '/yhdistelylaina', label: 'Yhdistelylaina' },
              { href: '/remonttilaina', label: 'Remonttilaina' },
              { href: '/vertailu', label: 'Lainavertailu' },
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
