import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  Car,
  Wrench,
  Baby,
  PiggyBank,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Elämänmuutokset — Kaikki palvelut elämän käännekohtiin';
const pageDescription =
  'Asunnon osto, auton hankinta, remontti tai perheen perustaminen? Löydä kaikki tarvitsemasi palvelut yhdestä paikasta — lainat, vakuutukset, sähkö ja liittymät.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/elamanmuutokset` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/elamanmuutokset`,
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
// JSON-LD
// ---------------------------------------------------------------------------

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
  ],
};

// ---------------------------------------------------------------------------
// Life events data
// ---------------------------------------------------------------------------

const lifeEvents = [
  {
    title: 'Asunnon osto',
    description:
      'Asuntolainan kilpailutus, kotivakuutus, sähkösopimus ja nettiliittymä — kaikki mitä tarvitset uuteen kotiin.',
    href: '/elamanmuutokset/asunnonosto',
    icon: Home,
    services: ['Asuntolaina', 'Kotivakuutus', 'Sähkösopimus', 'Nettiliittymä'],
    color: 'bg-blue-600',
    highlight: 'Suosituin',
  },
  {
    title: 'Auton osto',
    description:
      'Autolainan vertailu, autovakuutus ja rahoitusmuotojen vertailu — osamaksu, autolaina vai leasing.',
    href: '/elamanmuutokset/autonosto',
    icon: Car,
    services: ['Autolaina', 'Autovakuutus'],
    color: 'bg-emerald-600',
    highlight: null,
  },
  {
    title: 'Remontti',
    description:
      'Remonttilainan rahoitusvaihtoehdot, kotitalousvähennys ja vakuutusturvan päivittäminen remontin ajaksi.',
    href: '/remonttilaina',
    icon: Wrench,
    services: ['Remonttilaina', 'Kotivakuutuksen päivitys'],
    color: 'bg-amber-600',
    highlight: null,
  },
  {
    title: 'Perheen perustaminen',
    description:
      'Budjetin uudelleenarviointi, vakuutusturvan tarkistus ja asuntolainan kilpailutus kasvavan perheen tarpeisiin.',
    href: '#perheen-perustaminen',
    icon: Baby,
    services: ['Asuntolainan kilpailutus', 'Henkivakuutus', 'Kotivakuutus'],
    color: 'bg-pink-600',
    highlight: null,
    comingSoon: true,
  },
  {
    title: 'Velkajärjestely',
    description:
      'Useiden lainojen yhdistäminen yhdeksi edullisemmaksi lainaksi ja budjetoinnin tehostaminen.',
    href: '/yhdistelylaina',
    icon: PiggyBank,
    services: ['Yhdistelylaina', 'Budjetointityökalut'],
    color: 'bg-purple-600',
    highlight: null,
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function ElamanmuutoksetPage() {
  return (
    <>
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
              <li className="text-white font-medium">Elämänmuutokset</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Elämänmuutokset{' '}
              <span className="block text-[#ecc94b]">
                Kaikki palvelut yhdestä paikasta
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Suuret elämänmuutokset vaativat monia päätöksiä samanaikaisesti.
              Kokosimme yhteen kaikki palvelut, joita tarvitset elämän
              käännekohdissa — lainoista vakuutuksiin, sähkösopimuksista
              liittymiin.
            </p>
          </div>
        </div>
      </section>

      {/* Life events grid */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
            Valitse elämäntilanne
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Jokaiseen tilanteeseen on koottu kattava tarkistuslista
            tarvittavista palveluista ja tärkeimmistä asioista, jotka
            kannattaa hoitaa.
          </p>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {lifeEvents.map((event) => (
              <Link
                key={event.title}
                href={event.href}
                className="group relative rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-lg hover:border-[#1a365d]/20 transition-all duration-200"
              >
                {event.highlight && (
                  <span className="absolute -top-3 right-4 rounded-full bg-[#ecc94b] px-3 py-1 text-xs font-bold text-[#1a365d]">
                    {event.highlight}
                  </span>
                )}
                {event.comingSoon && (
                  <span className="absolute -top-3 right-4 rounded-full bg-gray-200 px-3 py-1 text-xs font-medium text-gray-600">
                    Tulossa pian
                  </span>
                )}

                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`flex h-12 w-12 items-center justify-center rounded-xl ${event.color} shadow-sm`}
                  >
                    <event.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-[#1a365d] transition-colors">
                    {event.title}
                  </h3>
                </div>

                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  {event.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-5">
                  {event.services.map((service) => (
                    <span
                      key={service}
                      className="inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                    >
                      {service}
                    </span>
                  ))}
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold text-[#1a365d] group-hover:gap-2 transition-all">
                  {event.comingSoon ? 'Tulossa pian' : 'Lue lisää'}
                  <ArrowRight className="h-4 w-4" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Valitse ecosystem section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Valitse-verkosto — vertaa kaikkea yhdessä paikassa
            </h2>
            <p className="text-gray-600">
              Valitse-verkosto kokoaa yhteen Suomen tärkeimmät vertailupalvelut.
              Vertaa lainoja, sähkösopimuksia, vakuutuksia ja puhelinliittymiä
              kattavasti.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: 'Valitse Laina',
                url: '/vertailu',
                description: 'Lainavertailu',
                detail: 'Kulutusluotot, asuntolainat, autolainat',
                internal: true,
              },
              {
                name: 'Valitse Sähkö',
                url: 'https://valitsesahko.fi',
                description: 'Sähkövertailu',
                detail: 'Sähkösopimukset ja -hinnat',
                internal: false,
              },
              {
                name: 'Valitse Vakuutus',
                url: 'https://valitsevakuutus.fi',
                description: 'Vakuutusvertailu',
                detail: 'Koti-, auto- ja henkivakuutukset',
                internal: false,
              },
              {
                name: 'Valitse Liittymä',
                url: 'https://valitseliittyma.fi',
                description: 'Liittymävertailu',
                detail: 'Puhelinliittymät ja nettiliittymät',
                internal: false,
              },
            ].map((site) =>
              site.internal ? (
                <Link
                  key={site.name}
                  href={site.url}
                  className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-[#1a365d]/20 transition-all"
                >
                  <h3 className="font-bold text-gray-900 mb-1 group-hover:text-[#1a365d]">
                    {site.name}
                  </h3>
                  <p className="text-sm text-[#1a365d] font-medium mb-2">
                    {site.description}
                  </p>
                  <p className="text-xs text-gray-500">{site.detail}</p>
                </Link>
              ) : (
                <a
                  key={site.name}
                  href={site.url}
                  target="_blank"
                  rel="noopener"
                  className="group rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md hover:border-[#1a365d]/20 transition-all"
                >
                  <div className="flex items-center gap-1.5 mb-1">
                    <h3 className="font-bold text-gray-900 group-hover:text-[#1a365d]">
                      {site.name}
                    </h3>
                    <ExternalLink className="h-3.5 w-3.5 text-gray-400" />
                  </div>
                  <p className="text-sm text-[#1a365d] font-medium mb-2">
                    {site.description}
                  </p>
                  <p className="text-xs text-gray-500">{site.detail}</p>
                </a>
              ),
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-12 sm:py-16 bg-[#1a365d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Aloita vertailemalla lainoja
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Olipa elämäntilanteesi mikä tahansa, rahoituksen vertailu on
            aina hyvä lähtökohta. Löydä edullisin laina tilanteesi tarpeisiin.
          </p>
          <Link
            href="/vertailu"
            className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
          >
            Vertaa lainoja
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </>
  );
}
