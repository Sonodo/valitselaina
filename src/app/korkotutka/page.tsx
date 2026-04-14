import { Metadata } from 'next';
import Link from 'next/link';
import {
  TrendingDown,
  TrendingUp,
  Minus,
  Activity,
  Home,
  Banknote,
  Lock,
  HelpCircle,
  ArrowRight,
  Info,
} from 'lucide-react';
import {
  SITE_URL,
  SITE_NAME,
  EURIBOR_12M,
  EURIBOR_6M,
  EURIBOR_3M,
  EURIBOR_UPDATED,
} from '@/lib/constants';
import StressTestCalculator from '@/components/korkotutka/StressTestCalculator';
import AlertSignupForm from '@/components/korkotutka/AlertSignupForm';
import EuriborHistoryChart from '@/components/korkotutka/EuriborHistoryChart';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Korkotutka — Seuraa korkoja, toimi oikeaan aikaan';
const pageDescription =
  'Seuraa Euribor-korkoja, EKP:n ohjauskorkoa ja lainamarkkinaa reaaliajassa. Korkostressitesti, markkinakatsaus ja ilmoitukset korkomuutoksista.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/korkotutka` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/korkotutka`,
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
// Static data
// ---------------------------------------------------------------------------

const ECB_RATE = 2.65;

const euriborHistory = [
  { period: '1/2024', rate: 3.86 },
  { period: '4/2024', rate: 3.70 },
  { period: '7/2024', rate: 3.55 },
  { period: '10/2024', rate: 2.97 },
  { period: '1/2025', rate: 2.63 },
  { period: '4/2025', rate: 2.49 },
  { period: '7/2025', rate: 2.45 },
  { period: '10/2025', rate: 2.47 },
  { period: '1/2026', rate: 2.48 },
  { period: '4/2026', rate: 2.49 },
];

// ---------------------------------------------------------------------------
// FAQ data
// ---------------------------------------------------------------------------

const faqs = [
  {
    q: 'Mikä on Euribor-korko?',
    a: 'Euribor (Euro Interbank Offered Rate) on euroalueen pankkien välinen viitekorko, joka määrittää suurimman osan suomalaisten asuntolainojen koroista. Yleisimmät viitekorot ovat 3, 6 ja 12 kuukauden Euribor. Korko päivittyy lainaasi viitekoron tarkistuspäivänä.',
  },
  {
    q: 'Miten Euribor vaikuttaa asuntolainaani?',
    a: 'Jos lainasi on sidottu esimerkiksi 12 kuukauden Euriboriin, lainasi kokonaiskorko on Euribor + pankin marginaali. Kun Euribor nousee, kuukausieräsi kasvaa — ja päinvastoin. Marginaali pysyy samana koko laina-ajan.',
  },
  {
    q: 'Mikä on EKP:n ohjauskorko?',
    a: 'Euroopan keskuspankin (EKP) ohjauskorko on korko, jolla pankit saavat lainaa keskuspankilta. Se ohjaa koko euroalueen korkotasoa ja vaikuttaa Euriboriin. EKP päättää ohjauskorosta noin kuuden viikon välein.',
  },
  {
    q: 'Kannattaako valita kiinteä vai vaihtuva korko?',
    a: 'Se riippuu riskinsietokyvystäsi ja markkinanäkemyksestäsi. Vaihtuva korko on historiallisesti ollut edullisempi pitkällä aikavälillä, mutta altistaa korkoriskille. Kiinteä korko tuo ennustettavuutta. Kukaan ei voi ennustaa korkoja varmuudella — valinta on aina henkilökohtainen.',
  },
  {
    q: 'Mihin suuntaan korot ovat menossa?',
    a: 'Korkoennusteiden tekeminen on tunnetusti vaikeaa eikä kukaan voi ennustaa korkoja varmuudella. Markkinahinnoittelu antaa suuntaa, mutta odottamattomat tapahtumat voivat muuttaa tilannetta nopeasti. Korkotutka auttaa sinua seuraamaan tilannetta ja reagoimaan ajoissa.',
  },
  {
    q: 'Miten voin suojautua korkojen nousulta?',
    a: 'Vaihtoehtoja ovat kiinteän koron valinta, korkokaton sopiminen pankin kanssa tai lainan nopeampi lyhentäminen matalien korkojen aikana. Voit myös hajauttaa viitekorkoja eri lainaeriin. Korkostressitestillämme voit arvioida, miten korkojen nousu vaikuttaisi talouteesi.',
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
      name: 'Korkotutka',
      item: `${SITE_URL}/korkotutka`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Helper: monthly payment example for scenario cards
// ---------------------------------------------------------------------------

function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  if (annualRate === 0) return principal / termMonths;
  const monthlyRate = annualRate / 100 / 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
}

function formatEur(val: number): string {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(val);
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function KorkotutkaPage() {
  // Example scenario calculations (200k loan, 25y, margin 0.50%)
  const examplePrincipal = 200000;
  const exampleMargin = 0.5;
  const exampleTermMonths = 25 * 12;
  const currentTotalRate = EURIBOR_12M + exampleMargin;
  const currentMonthly = calculateMonthlyPayment(
    examplePrincipal,
    currentTotalRate,
    exampleTermMonths
  );

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
              <li className="text-white font-medium">Korkotutka</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm text-blue-200 mb-4">
              <Activity className="h-4 w-4" />
              <span>Korkojen seurantatyökalu</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Korkotutka{' '}
              <span className="block text-[#ecc94b]">
                Seuraa korkoja, toimi oikeaan aikaan
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Korkotutka seuraa markkinakorkoja ja lainamarkkinaa puolestasi.
              Näet korot yhdellä silmäyksellä, ymmärrät mitä ne tarkoittavat
              sinulle ja voit testata miten korkomuutokset vaikuttaisivat
              lainaerääsi.
            </p>
          </div>
        </div>
      </section>

      {/* Current Rates Dashboard */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Markkinakorot juuri nyt
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Päivitetty {EURIBOR_UPDATED}
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {/* Euribor 12M */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  Euribor 12 kk
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                  <TrendingDown className="h-3 w-3" />
                  Laskenut
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {EURIBOR_12M.toFixed(3).replace('.', ',')} %
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Yleisin asuntolainojen viitekorko
              </p>
            </div>

            {/* Euribor 6M */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  Euribor 6 kk
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                  <TrendingDown className="h-3 w-3" />
                  Laskenut
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {EURIBOR_6M.toFixed(3).replace('.', ',')} %
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Toiseksi yleisin viitekorko
              </p>
            </div>

            {/* Euribor 3M */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  Euribor 3 kk
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                  <TrendingDown className="h-3 w-3" />
                  Laskenut
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {EURIBOR_3M.toFixed(3).replace('.', ',')} %
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Reagoi nopeimmin muutoksiin
              </p>
            </div>

            {/* ECB Rate */}
            <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-gray-500">
                  EKP ohjauskorko
                </span>
                <span className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                  <Minus className="h-3 w-3" />
                  Ennallaan
                </span>
              </div>
              <p className="text-3xl font-bold text-gray-900">
                {ECB_RATE.toFixed(2).replace('.', ',')} %
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Ohjaa koko euroalueen korkotasoa
              </p>
            </div>
          </div>

          {/* Rate context box */}
          <div className="mt-8 max-w-5xl mx-auto rounded-xl bg-[#1a365d]/5 border border-[#1a365d]/10 p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <Info className="h-5 w-5 text-[#1a365d] shrink-0 mt-0.5" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">
                  Korkotilanne huhtikuussa 2026
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Euribor-korot ovat vakiintuneet noin 2,4–2,5 % tasolle
                  EKP:n korkolaskujen jälkeen. Huippulukemista (lähes 4 %
                  vuoden 2024 alussa) on tultu selvästi alas. Korkomarkkinat
                  hinnoittelevat maltillista vakautta lähikuukausille, mutta
                  kukaan ei voi ennustaa korkoja varmuudella.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Market Analysis — Scenario Cards */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Mitä korot tarkoittavat sinulle?
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            Selkokielellä: miten nykyinen korkotilanne vaikuttaa eri
            lainatilanteissa
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {/* Scenario 1: Variable rate mortgage holders */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a365d]">
                  <Home className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Jos sinulla on vaihtuvakorkoinen asuntolaina
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Euribor 12kk on tullut huipuistaan alas noin 1,4 prosenttiyksikköä.
                Jos lainasi viitekorko päivittyi äskettäin, maksat jo selvästi
                vähemmän kuin vuoden 2024 alussa.
              </p>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500 mb-1">
                  Esimerkki: {formatEur(examplePrincipal)} asuntolaina, marginaali{' '}
                  {exampleMargin.toFixed(2).replace('.', ',')} %
                </p>
                <p className="text-lg font-bold text-[#1a365d]">
                  Kuukausierä: {formatEur(currentMonthly)}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  25 vuoden laina-aika, annuiteetti
                </p>
              </div>
            </div>

            {/* Scenario 2: Considering fixed rate */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a365d]">
                  <Lock className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Jos harkitset kiinteää korkoa
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Kiinteän koron valinta tuo ennustettavuutta. Nykytilanteessa
                kiinteät korot ovat tyypillisesti 3–4 % tasolla riippuen
                kiinteän koron jaksosta. Vaihtuva korko on juuri nyt
                edullisempi, mutta altistaa korkoriskille.
              </p>
              <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                <p className="text-sm text-amber-800">
                  <strong>Muista:</strong> Kiinteän koron valinta on
                  vakuutus korkojen nousua vastaan — ei tuottosijoitus.
                  Historiallisesti vaihtuva korko on ollut edullisempi
                  pitkällä aikavälillä.
                </p>
              </div>
            </div>

            {/* Scenario 3: New borrowers */}
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a365d]">
                  <Banknote className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Jos harkitset uutta lainaa
                </h3>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                Korkotaso on tällä hetkellä maltillinen verrattuna vuoden
                2023–2024 huippuihin. Marginaalit vaihtelevat pankittain
                tyypillisesti 0,3–1,0 %. Kilpailuta laina aina useammasta
                pankista — marginaalissa voi olla suuri ero.
              </p>
              <div className="rounded-lg bg-gray-50 p-4">
                <p className="text-xs text-gray-500 mb-2">
                  Kokonaiskorko tyypillisesti
                </p>
                <p className="text-lg font-bold text-[#1a365d]">
                  2,8 – 3,5 %
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  Euribor 12kk + marginaali 0,3–1,0 %
                </p>
              </div>
              <div className="mt-4">
                <Link
                  href="/asuntolaina"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-[#1a365d] hover:underline"
                >
                  Lue asuntolainaopas
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Historical Rate Table */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Euribor 12 kk — kehitys
          </h2>
          <p className="text-gray-500 text-center mb-10">
            Neljännesvuosittain tammikuusta 2024 alkaen
          </p>

          <div className="max-w-3xl mx-auto">
            <div className="rounded-xl border border-gray-200 bg-white p-4 sm:p-6 shadow-sm">
              <EuriborHistoryChart data={euriborHistory} />
            </div>

            <div className="mt-8 overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-gray-600">
                      Ajankohta
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Euribor 12 kk
                    </th>
                    <th className="text-right py-3 px-4 text-sm font-semibold text-gray-600">
                      Muutos
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {euriborHistory.map((entry, i) => {
                    const prevRate = i > 0 ? euriborHistory[i - 1].rate : null;
                    const change = prevRate !== null ? entry.rate - prevRate : null;

                    return (
                      <tr
                        key={entry.period}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
                      >
                        <td className="py-3 px-4 text-sm font-medium text-gray-900">
                          {entry.period}
                        </td>
                        <td className="py-3 px-4 text-right text-sm font-bold text-gray-900">
                          {entry.rate.toFixed(2).replace('.', ',')} %
                        </td>
                        <td className="py-3 px-4 text-right text-sm">
                          {change === null ? (
                            <span className="text-gray-400">—</span>
                          ) : change < 0 ? (
                            <span className="inline-flex items-center gap-1 text-green-600 font-medium">
                              <TrendingDown className="h-3.5 w-3.5" />
                              {change.toFixed(2).replace('.', ',')}
                            </span>
                          ) : change > 0 ? (
                            <span className="inline-flex items-center gap-1 text-red-600 font-medium">
                              <TrendingUp className="h-3.5 w-3.5" />
                              +{change.toFixed(2).replace('.', ',')}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-gray-500 font-medium">
                              <Minus className="h-3.5 w-3.5" />
                              0,00
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <p className="mt-4 text-xs text-gray-400 text-center">
              Lähde: Suomen Pankin ja EKP:n tilastot. Korot ovat kunkin
              kuukauden alun keskiarvoja.
            </p>
          </div>
        </div>
      </section>

      {/* Stress Test Calculator */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Korkostressitesti
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            Testaa miten korkotason nousu vaikuttaisi kuukausierääsi. Syötä
            omat lainatietosi ja näet eron euroissa.
          </p>

          <div className="max-w-3xl mx-auto">
            <StressTestCalculator defaultEuribor={EURIBOR_12M} />
          </div>
        </div>
      </section>

      {/* Alert Signup */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-2">
            Pysy ajan tasalla
          </h2>
          <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
            Ilmoitamme kun korot muuttuvat merkittävästi tai markkinalla
            tapahtuu jotain tärkeää — niin sinun ei tarvitse seurata
            markkinoita itse.
          </p>

          <div className="max-w-2xl mx-auto">
            <AlertSignupForm />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-10">
            Usein kysytyt kysymykset
          </h2>

          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.q}
                className="group rounded-xl border border-gray-200 bg-white shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 text-gray-900 font-medium hover:bg-gray-50 transition-colors rounded-xl">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="h-5 w-5 text-[#1a365d] shrink-0" />
                    <span>{faq.q}</span>
                  </div>
                  <span className="ml-4 shrink-0 text-gray-400 group-open:rotate-180 transition-transform duration-200">
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </summary>
                <div className="px-5 pb-4 pt-1 ml-8 text-sm text-gray-600 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA to comparison */}
      <section className="py-12 sm:py-16 bg-[#1a365d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Harkitsetko lainan kilpailutusta?
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Nyt kun tiedät korkotilanteen, vertaa lainoja ja löydä edullisin
            vaihtoehto juuri sinulle.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/vertailu"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#1a365d] hover:bg-gray-100 transition-colors min-h-[44px]"
            >
              Vertaa lainoja
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/tyokalut/lainanlaskuri"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/10 border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/20 transition-colors min-h-[44px]"
            >
              Lainanlaskuri
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
