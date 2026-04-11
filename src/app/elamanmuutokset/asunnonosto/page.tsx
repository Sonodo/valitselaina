import { Metadata } from 'next';
import Link from 'next/link';
import {
  Home,
  ShieldCheck,
  Zap,
  Wifi,
  CheckCircle2,
  ArrowRight,
  Calculator,
  HelpCircle,
  Info,
  FileText,
  Clock,
  ExternalLink,
  Landmark,
  MapPin,
  Banknote,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle =
  'Asunnon osto — Kaikki mitä tarvitset, yhdessä paikassa';
const pageDescription =
  'Kattava opas asunnon ostoon Suomessa. Asuntolainan kilpailutus, kotivakuutus, sähkösopimus, varainsiirtovero ja muutto — kaikki tärkeimmät asiat koottuna yhteen.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/elamanmuutokset/asunnonosto` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/elamanmuutokset/asunnonosto`,
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
    q: 'Kuinka paljon tarvitsen säästöjä asunnon ostoon?',
    a: 'Pankit vaativat tyypillisesti 10–15 % omarahoitusosuutta asunnon hinnasta. Esimerkiksi 200 000 euron asuntoon tarvitset 20 000–30 000 euroa omia säästöjä. Lisäksi varaa rahaa varainsiirtoveroon (1,5 % tai 3 %), muuttokuluihin ja mahdolliseen remonttiin. ASP-tilin kautta ensiasunnon ostaja voi saada valtiontakauksen, jolloin omarahoitusosuus voi olla pienempi.',
  },
  {
    q: 'Mikä on ASP-tili ja kenelle se sopii?',
    a: 'ASP (asuntosäästöpalkkio) on 15–44-vuotiaille ensiasunnon ostajille tarkoitettu säästöjärjestelmä. Säästät vähintään 8 vuosineljännestä, jonka jälkeen pankki tarjoaa ASP-koron ja lisäkoron säästöille sekä edullisemman asuntolainakoron. Lisäksi valtio takaa osan lainasta. ASP-tili kannattaa avata mahdollisimman varhain, vaikka asunnon osto olisi vasta vuosien päässä.',
  },
  {
    q: 'Kuinka paljon asuntolainan kuukausierä on?',
    a: 'Kuukausierän suuruus riippuu lainasummasta, korosta ja laina-ajasta. Esimerkiksi 200 000 euron lainalla, 25 vuoden laina-ajalla ja 4 % kokonaiskorolla kuukausierä on noin 1 056 euroa (annuiteettilaina). Pankit testaavat maksukykyäsi tyypillisesti 6 % korkotasolla.',
  },
  {
    q: 'Miten asuntolainan kilpailutus toimii?',
    a: 'Pyydä tarjous vähintään 3–4 pankilta. Vertaa tarjousten kokonaiskorko (viitekorko + marginaali), lainaehdot ja lisäpalveluiden hinnat. Kilpailuta myös olemassa oleva asuntolainasi säännöllisesti. Pankki voi neuvotella marginaalia alaspäin, jos saat edullisemman tarjouksen toisesta pankista.',
  },
  {
    q: 'Paljonko varainsiirtovero on?',
    a: 'Asunto-osakkeesta (kerrostalo, rivitalo) varainsiirtovero on 1,5 % kauppahinnasta. Kiinteistöstä (omakotitalo, tontti) vero on 3 %. Ensiasunnon ostaja on vapautettu varainsiirtoverosta, jos on 18–39-vuotias eikä ole aiemmin omistanut vähintään 50 % asunnosta Suomessa.',
  },
  {
    q: 'Mitä vakuutuksia tarvitsen asunnon oston yhteydessä?',
    a: 'Kotivakuutus on käytännössä välttämätön — se korvaa esimerkiksi vesivahinkoja, murtoja ja tulipaloja. Pankki vaatii yleensä kiinteistövakuutuksen lainan vakuutena. Harkitse myös lainaturvavakuutusta, joka turvaa lainan takaisinmaksun sairastumisen, työttömyyden tai kuoleman varalta.',
  },
  {
    q: 'Miten asuntolainan korko muodostuu?',
    a: 'Asuntolainan korko koostuu viitekorosta (yleensä 12 kuukauden euribor) ja pankin marginaalista (tyypillisesti 0,5–1,0 %). Kokonaiskorko on näiden summa. Esimerkiksi euribor 2,5 % + marginaali 0,7 % = kokonaiskorko 3,2 %. Viitekorko muuttuu laina-aikana, marginaali on yleensä kiinteä.',
  },
  {
    q: 'Onko ensiasunnon ostajan veroetu olemassa?',
    a: 'Kyllä. Ensiasunnon ostaja (18–39 v.) on vapautettu varainsiirtoverosta. Lisäksi ASP-järjestelmä tarjoaa korkotukea ja valtiontakauksen. Asuntolainan korkojen verovähennysoikeus sen sijaan poistui kokonaan vuonna 2023.',
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
      name: 'Asunnon osto',
      item: `${SITE_URL}/elamanmuutokset/asunnonosto`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Checklist items
// ---------------------------------------------------------------------------

const checklistItems = [
  {
    title: 'Asuntolainan kilpailutus',
    description:
      'Vertaa asuntolainatarjouksia eri pankeilta. Jo 0,2 prosenttiyksikön ero marginaalissa säästää tuhansia euroja laina-aikana.',
    cta: { label: 'Vertaa lainoja', href: '/vertailu' },
    icon: Landmark,
    internal: true,
  },
  {
    title: 'ASP-lainan mahdollisuudet',
    description:
      'Tarkista, onko sinulla ASP-tili tai oletko oikeutettu ensiasunnon ostajan veroetuun. ASP-lainassa saat korkotukea ja valtiontakauksen.',
    cta: {
      label: 'Lue asuntolainaopas',
      href: '/oppaat/asuntolaina-ensiostajalle',
    },
    icon: FileText,
    internal: true,
  },
  {
    title: 'Kotivakuutus',
    description:
      'Uusi koti tarvitsee kotivakuutuksen. Vertaa koti- ja kiinteistövakuutuksia — pankki vaatii vakuutuksen asuntolainan vakuutena.',
    cta: {
      label: 'Vertaa vakuutuksia',
      href: 'https://valitsevakuutus.fi',
    },
    icon: ShieldCheck,
    internal: false,
  },
  {
    title: 'Sähkösopimus',
    description:
      'Muista siirtää tai avata sähkösopimus uuteen osoitteeseen. Vertaa sähkösopimuksia ja varmista, ettet maksa liikaa.',
    cta: {
      label: 'Vertaa sähkösopimuksia',
      href: 'https://valitsesahko.fi',
    },
    icon: Zap,
    internal: false,
  },
  {
    title: 'Nettiliittymä',
    description:
      'Tarkista nettiyhteyden saatavuus uudessa osoitteessa ja vertaa liittymäpaketteja. Valokuitu, kaapeli vai mobiililaajakaista?',
    cta: {
      label: 'Vertaa liittymiä',
      href: 'https://valitseliittyma.fi',
    },
    icon: Wifi,
    internal: false,
  },
  {
    title: 'Varainsiirtovero',
    description:
      'Asunto-osakkeesta 1,5 %, kiinteistöstä 3 %. Ensiasunnon ostaja (18–39 v.) on vapautettu varainsiirtoverosta kokonaan.',
    icon: Banknote,
    internal: true,
  },
  {
    title: 'Muutto ja osoitteenmuutos',
    description:
      'Tee osoitteenmuutos Postiin, ilmoita muutto DVV:lle (Digi- ja väestötietovirasto) ja päivitä osoite pankkiin, vakuutusyhtiöön ja muihin palveluihin.',
    icon: MapPin,
    internal: true,
  },
];

// ---------------------------------------------------------------------------
// Timeline data
// ---------------------------------------------------------------------------

const timelineSteps = [
  {
    phase: '1. Suunnittelu',
    duration: '1–6 kk ennen',
    items: [
      'Määrittele budjetti ja toiveet',
      'Selvitä omarahoitusosuus (10–15 %)',
      'Tarkista ASP-tilin tilanne',
      'Pyydä alustava lainapäätös pankilta',
    ],
  },
  {
    phase: '2. Asunnon etsintä',
    duration: '1–6 kk',
    items: [
      'Selaa asuntoilmoituksia (Oikotie, Etuovi)',
      'Käy asuntonäytöillä',
      'Tutustu taloyhtiön papereihin',
      'Tarkista isännöitsijäntodistus ja energiatodistus',
    ],
  },
  {
    phase: '3. Tarjous ja kauppa',
    duration: '1–4 viikkoa',
    items: [
      'Tee tarjous ja neuvottele',
      'Hyväksytyn tarjouksen jälkeen: allekirjoita kauppakirja',
      'Maksa varainsiirtovero (ensiasunnon ostaja vapautettu)',
      'Viimeistele lainasopimus pankin kanssa',
    ],
  },
  {
    phase: '4. Ennen muuttoa',
    duration: '1–2 viikkoa',
    items: [
      'Hanki kotivakuutus',
      'Aktivoi sähkösopimus uuteen osoitteeseen',
      'Tilaa nettiyhteys',
      'Tee osoitteenmuutos (Posti + DVV)',
      'Järjestä muutto',
    ],
  },
  {
    phase: '5. Muuton jälkeen',
    duration: 'Ensimmäiset viikot',
    items: [
      'Tarkista asunnon kunto ja dokumentoi mahdolliset puutteet',
      'Päivitä osoite kaikkiin palveluihin',
      'Aloita lainan takaisinmaksu',
      'Tutustu taloyhtiön sääntöihin (osakehuoneistossa)',
    ],
  },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function AsunnonostoPage() {
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
              <li className="text-white font-medium">Asunnon osto</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Asunnon osto{' '}
              <span className="block text-[#ecc94b]">
                Kaikki mitä tarvitset, yhdessä paikassa
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Asunnon ostaminen on monelle elämän suurin taloudellinen päätös.
              Kokosimme yhteen kaiken tarvitsemasi — lainan kilpailutuksesta
              vakuutuksiin, sähkösopimukseen ja muuttoon.
            </p>

            <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Omarahoitus</p>
                <p className="text-2xl font-bold text-white">10–15 %</p>
                <p className="text-xs text-blue-200/50 mt-1">asunnon hinnasta</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Varainsiirtovero</p>
                <p className="text-2xl font-bold text-white">1,5 %</p>
                <p className="text-xs text-blue-200/50 mt-1">asunto-osake</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Ensiasunnon ostaja</p>
                <p className="text-2xl font-bold text-white">0 %</p>
                <p className="text-xs text-blue-200/50 mt-1">varainsiirtovero</p>
              </div>
              <div className="rounded-xl bg-white/10 p-4">
                <p className="text-sm text-blue-200/70">Marginaali tyypillisesti</p>
                <p className="text-2xl font-bold text-white">0,5–1,0 %</p>
                <p className="text-xs text-blue-200/50 mt-1">pankin osuus</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklist */}
      <section className="py-12 sm:py-16 lg:py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Asunnon ostajan tarkistuslista
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              Käy läpi jokainen kohta, niin saat asunnon oston hoidettua
              sujuvasti ja kustannustehokkaasti.
            </p>

            <div className="space-y-4">
              {checklistItems.map((item) => (
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

      {/* Cost calculator section */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Calculator className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Asunnon oston kokonaiskustannukset
              </h2>
            </div>

            <p className="text-gray-600 mb-6">
              Asunnon hinta on vasta alkusoitto. Tässä kaikki kustannukset,
              jotka kannattaa huomioida budjetissa.
            </p>

            <div className="rounded-xl border border-gray-200 bg-white p-6">
              <p className="text-sm font-medium text-gray-500 mb-4">
                Esimerkki: 250 000 euron asunto-osake, 25 vuoden laina-aika
              </p>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">Asunnon hinta</span>
                  <span className="font-medium text-gray-900">
                    250 000 euroa
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">
                    Varainsiirtovero (1,5 %)
                  </span>
                  <span className="font-medium text-gray-900">3 750 euroa</span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">
                    Lainan korot 25 v. (noin 4 %)
                  </span>
                  <span className="font-medium text-gray-900">
                    ~91 000 euroa
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">Kotivakuutus (25 v.)</span>
                  <span className="font-medium text-gray-900">
                    ~7 500 euroa
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-gray-50 px-4 py-3">
                  <span className="text-gray-600">Muuttokustannukset</span>
                  <span className="font-medium text-gray-900">
                    500–2 000 euroa
                  </span>
                </div>
                <div className="flex justify-between rounded-lg bg-blue-50 border border-blue-200 px-4 py-3 font-semibold">
                  <span className="text-[#1a365d]">
                    Kokonaiskustannus arviolta
                  </span>
                  <span className="text-[#1a365d]">~353 000 euroa</span>
                </div>
              </div>

              <div className="mt-4 rounded-lg bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start gap-2">
                  <Info className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-800">
                    Laskelma on suuntaa antava. Todelliset kustannukset riippuvat
                    koron kehityksestä, vakuutusmaksuista ja lainan
                    takaisinmaksutavasta. Ensiasunnon ostaja säästää
                    varainsiirtoveron (3 750 euroa tässä esimerkissä).
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link
                href="/tyokalut/asuntolainanlaskuri"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2c5282] transition-colors"
              >
                <Calculator className="h-4 w-4" />
                Laske oma kuukausierä
              </Link>
              <Link
                href="/vertailu?type=asuntolaina"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Vertaa asuntolainoja
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Clock className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Asunnon oston vaiheet
              </h2>
            </div>
            <p className="text-gray-600 mb-10">
              Asunnon ostoprosessi kestää tyypillisesti muutamasta kuukaudesta
              puoleen vuoteen. Tässä vaihe vaiheelta, mitä tapahtuu.
            </p>

            <div className="space-y-0">
              {timelineSteps.map((step, index) => (
                <div key={step.phase} className="relative flex gap-4 pb-8 last:pb-0">
                  {/* Timeline line */}
                  {index < timelineSteps.length - 1 && (
                    <div
                      className="absolute left-5 top-10 bottom-0 w-px bg-gray-200"
                      aria-hidden="true"
                    />
                  )}

                  {/* Timeline dot */}
                  <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1a365d] text-white font-bold text-sm">
                    {index + 1}
                  </div>

                  <div className="flex-1 pt-1">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-3">
                      <h3 className="text-lg font-bold text-gray-900">
                        {step.phase.replace(/^\d+\.\s/, '')}
                      </h3>
                      <span className="text-sm text-gray-500 bg-gray-100 rounded-full px-3 py-0.5 w-fit">
                        {step.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {step.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-gray-700"
                        >
                          <CheckCircle2 className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cross-sell: Valitse ecosystem */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-4">
              Hoida kaikki kerralla Valitse-verkoston kautta
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-xl mx-auto">
              Asunnon oston yhteydessä tarvitset monta palvelua. Vertaa
              ne kaikki yhdestä paikasta.
            </p>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/asuntolaina"
                className="group rounded-xl border border-gray-200 bg-white p-5 text-center hover:shadow-md hover:border-[#1a365d]/20 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-600 mx-auto mb-3">
                  <Landmark className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 group-hover:text-[#1a365d] mb-1">
                  Asuntolaina
                </h3>
                <p className="text-xs text-gray-500">
                  Kilpailuta asuntolaina — säästä tuhansia
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
                    Kotivakuutus
                  </h3>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  Vertaa kotivakuutuksia kattavasti
                </p>
              </a>

              <a
                href="https://valitsesahko.fi"
                target="_blank"
                rel="noopener"
                className="group rounded-xl border border-gray-200 bg-white p-5 text-center hover:shadow-md hover:border-[#1a365d]/20 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500 mx-auto mb-3">
                  <Zap className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#1a365d]">
                    Sähkösopimus
                  </h3>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  Löydä edullisin sähkösopimus
                </p>
              </a>

              <a
                href="https://valitseliittyma.fi"
                target="_blank"
                rel="noopener"
                className="group rounded-xl border border-gray-200 bg-white p-5 text-center hover:shadow-md hover:border-[#1a365d]/20 transition-all"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-600 mx-auto mb-3">
                  <Wifi className="h-6 w-6 text-white" />
                </div>
                <div className="flex items-center justify-center gap-1 mb-1">
                  <h3 className="font-bold text-gray-900 group-hover:text-[#1a365d]">
                    Nettiliittymä
                  </h3>
                  <ExternalLink className="h-3 w-3 text-gray-400" />
                </div>
                <p className="text-xs text-gray-500">
                  Vertaa netti- ja puhelinliittymiä
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
              Usein kysytyt kysymykset asunnon ostosta
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
            Aloita asuntolainan kilpailutus
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Jo pieni ero asuntolainan marginaalissa voi säästää kymmeniä
            tuhansia euroja laina-aikana. Vertaa tarjouksia kattavasti.
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
              href="/asuntolaina"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Asuntolainaopas
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
              { href: '/elamanmuutokset/autonosto', label: 'Auton osto' },
              { href: '/asuntolaina', label: 'Asuntolaina' },
              { href: '/remonttilaina', label: 'Remonttilaina' },
              {
                href: '/oppaat/asuntolaina-ensiostajalle',
                label: 'Ensiasunnon ostajan opas',
              },
              { href: '/tyokalut/asuntolainanlaskuri', label: 'Asuntolainanlaskuri' },
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
