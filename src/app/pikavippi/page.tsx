import { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertOctagon,
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
  Heart,
  Scale,
  Phone,
  ShieldAlert,
} from 'lucide-react';
import { getProductsSortedByRate } from '@/data/providers';
import {
  SITE_URL,
  SITE_NAME,
  INTEREST_RATE_CAP,
  COOLING_OFF_DAYS,
} from '@/lib/constants';
import { formatCurrency, formatPercentage, getApplyUrl } from '@/lib/utils';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

const pageTitle = 'Pikavippi — Tunne riskit ennen hakemista';
const pageDescription =
  'Pikavippi eli pikalaina on kallis rahoitusmuoto. Tutustu riskeihin, korkokattoon ja vaihtoehtoihin ennen hakemista. Rehellinen opas pikavipin kustannuksista.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/pikavippi` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/pikavippi`,
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
    q: 'Mikä on pikavippi?',
    a: 'Pikavippi (pikalaina) on pieni, lyhytaikainen laina, joka myönnetään nopeasti — usein muutamassa minuutissa. Summat ovat tyypillisesti 100–2 000 euroa ja laina-ajat 1–12 kuukautta. Pikavippien korot ovat selvästi korkeammat kuin perinteisten kulutusluottojen, vaikka korkokatto (20 %) on laskenut kustannuksia.',
  },
  {
    q: 'Onko pikavipin korkokatto 20 %?',
    a: 'Kyllä. Suomessa kaikkien kulutusluottojen — mukaan lukien pikavippien — todellinen vuosikorko saa olla enintään 20 %. Tämä korkokatto on ollut pysyvä vuodesta 2023. Aiemmin pikavippien korot saattoivat olla satoja prosentteja, mutta korkokatto on rajoittanut tätä merkittävästi.',
  },
  {
    q: 'Onko pikavippi turvallinen?',
    a: 'Pikavippi on laillinen rahoitusmuoto, jos lainanantaja on Finanssivalvonnan (Fiva) rekisteriin merkitty. Riskit liittyvät korkeisiin kustannuksiin ja ylivelkaantumiseen. Pikavippi EI ole turvallinen vaihtoehto, jos et pysty maksamaan sitä takaisin ajallaan — maksuhäiriöt vahingoittavat luottotietojasi ja voivat johtaa velkakierteeseen.',
  },
  {
    q: 'Mikä on pikavipin peruuttamisoikeus?',
    a: `Sinulla on ${COOLING_OFF_DAYS} päivän peruuttamisoikeus kaikissa kulutusluotoissa, mukaan lukien pikavipeissä. Voit peruuttaa lainasopimuksen ${COOLING_OFF_DAYS} päivän kuluessa sopimuksen tekemisestä ilman syytä. Sinun tulee palauttaa lainasumma ja maksaa korot peruuttamisajalta.`,
  },
  {
    q: 'Voinko valittaa pikavipin ehdoista?',
    a: 'Kyllä. Jos olet tyytymätön lainanantajan toimintaan, voit ensiksi valittaa suoraan lainanantajalle. Jos se ei auta, voit tehdä valituksen Finanssivalvonnalle tai viedä asian kuluttajariitalautakuntaan (KRIL). Kuluttajaneuvonta auttaa myös maksutta: puh. 029 505 3050.',
  },
  {
    q: 'Mitä tapahtuu, jos en pysty maksamaan pikavippia?',
    a: 'Myöhästynyt maksu johtaa viivästyskorkoihin, perintäkuluihin ja mahdolliseen maksuhäiriömerkintään luottotietoihin. Maksuhäiriö vaikeuttaa merkittävästi tulevaa lainansaantia, vuokra-asunnon saamista ja jopa työnhakua. Jos maksu on vaikeuksissa, ota HETI yhteys lainanantajaan — monet tarjoavat maksusuunnitelmia.',
  },
  {
    q: 'Onko olemassa vaihtoehtoja pikavipille?',
    a: 'Kyllä, useita: 1) Toimeentulotuki Kelalta akuuttiin tarpeeseen. 2) Sosiaalinen luototus kunnalta. 3) Maksusuunnitelma laskujen myöhästymiselle — ota yhteys velkojaan. 4) Seurakunnan diakoniatyö voi auttaa akuutissa raha-asioissa. 5) Kulutusluotto on merkittävästi edullisempi, jos summa on yli 1 000 euroa. 6) Läheisten apu.',
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
      name: 'Pikavippi',
      item: `${SITE_URL}/pikavippi`,
    },
  ],
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function PikavippiPage() {
  // There are no pikavippi products in the dataset, so show kulutusluotto as alternative
  const pikaProducts = getProductsSortedByRate('pikavippi');
  const kulutusluottoProducts = getProductsSortedByRate('kulutusluotto').slice(
    0,
    5,
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

      {/* Hero — cautionary tone */}
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
              <li className="text-white font-medium">Pikavippi</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
              Pikavippi{' '}
              <span className="block text-amber-300">
                Tunne riskit ennen hakemista
              </span>
            </h1>
            <p className="mt-5 text-lg sm:text-xl text-blue-100/90 leading-relaxed max-w-2xl">
              Pikavippi on Suomen kallein lainamuoto. Ennen hakemista —
              tutustu riskeihin, kustannuksiin ja vaihtoehtoihin. Teemme
              tarkkaan rehellisen arvion siitä, milloin pikavippi voi olla
              perusteltu ja milloin se on huono vaihtoehto.
            </p>
          </div>
        </div>
      </section>

      {/* PROMINENT WARNING */}
      <section className="bg-red-50 border-b-2 border-red-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-red-100">
              <AlertOctagon className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-900 mb-3">
                Tärkeää tietoa ennen pikavipin hakemista
              </h2>
              <div className="grid sm:grid-cols-3 gap-4 mb-4">
                <div className="rounded-lg bg-white border border-red-200 p-4">
                  <p className="text-sm text-gray-500 mb-1">Korkokatto</p>
                  <p className="text-2xl font-bold text-red-700">
                    {INTEREST_RATE_CAP} %
                  </p>
                  <p className="text-xs text-gray-500">
                    Todellinen vuosikorko enintään
                  </p>
                </div>
                <div className="rounded-lg bg-white border border-red-200 p-4">
                  <p className="text-sm text-gray-500 mb-1">Tyypilliset kulut</p>
                  <p className="text-2xl font-bold text-red-700">
                    15–20 %
                  </p>
                  <p className="text-xs text-gray-500">
                    Todellinen vuosikorko
                  </p>
                </div>
                <div className="rounded-lg bg-white border border-red-200 p-4">
                  <p className="text-sm text-gray-500 mb-1">Peruuttamisoikeus</p>
                  <p className="text-2xl font-bold text-red-700">
                    {COOLING_OFF_DAYS} pv
                  </p>
                  <p className="text-xs text-gray-500">
                    Peruuttamisaika allekirjoituksesta
                  </p>
                </div>
              </div>
              <div className="rounded-lg bg-red-100 p-4 text-sm text-red-900">
                <p className="font-semibold mb-1">Riskit:</p>
                <ul className="list-disc list-inside space-y-1">
                  <li>
                    Korkeat kustannukset — jopa lain sallima enimmäiskorko 20 %
                  </li>
                  <li>
                    Velkakierteen riski: pikavippi maksetaan usein uudella
                    pikavipilla
                  </li>
                  <li>
                    Maksuhäiriö pilaa luottotietosi vuosiksi eteenpäin
                  </li>
                  <li>
                    Perintäkulut voivat moninkertaistaa pienenkin velan
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ALTERNATIVES FIRST — Consider these before pikavippi */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <Heart className="h-5 w-5 text-[#38a169]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Harkitse ensin näitä vaihtoehtoja
              </h2>
            </div>

            <p className="text-gray-700 mb-6">
              Ennen pikavipin hakemista — selvitä, onko jokin näistä
              vaihtoehdoista mahdollinen sinulle. Ne ovat kaikki edullisempia
              ja turvallisempia.
            </p>

            <div className="space-y-4">
              <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-5">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <Banknote className="h-5 w-5" />
                  1. Budjetoi ja priorisoi
                </h3>
                <p className="text-sm text-gray-700">
                  Ennen lainan hakemista, kasaa nopea budjetti: onko menoja,
                  joista voit tinkia? Voisitko lykätä hankintaa kuukauden?
                  Usein rahatilanne ratkesi jo sillä, että katsoo mitkä menot
                  ovat välttämättömiä ja mitkä voi siirtää.
                </p>
              </div>

              <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-5">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <Phone className="h-5 w-5" />
                  2. Sovi maksuaikaa velkojan kanssa
                </h3>
                <p className="text-sm text-gray-700">
                  Jos lasku on myöhässä, soita velkojalle (sähköyhtiö, vuokranantaja,
                  puhelin-operaattori) ja pyydä lisämaksuaikaa tai
                  maksusuunnitelmaa. Useimmat yritykset suostuvat — se on
                  niillekin parempi vaihtoehto kuin perintäprosessi.
                </p>
              </div>

              <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-5">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <ShieldAlert className="h-5 w-5" />
                  3. Toimeentulotuki (Kela)
                </h3>
                <p className="text-sm text-gray-700">
                  Jos tulosi eivät riitä välttämättömiin menoihin (vuokra,
                  ruoka, lääkkeet), voit hakea perustoimeentulotukea Kelasta.
                  Hakemus käsitellään 7 arkipäivässä. Kiireellisissä
                  tilanteissa Kela voi käsitellä hakemuksen nopeammin.
                  <a
                    href="https://www.kela.fi/toimeentulotuki"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1 text-[#1a365d] underline"
                  >
                    kela.fi/toimeentulotuki
                  </a>
                </p>
              </div>

              <div className="rounded-xl border-2 border-green-200 bg-green-50/50 p-5">
                <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  4. Sosiaalinen luototus
                </h3>
                <p className="text-sm text-gray-700">
                  Monet kunnat tarjoavat sosiaalista luototusta pienituloisille.
                  Se on edullinen laina väliaikaisiin talousvaikeuksiin. Kysy
                  omasta kunnastasi. Myös seurakunnan diakoniatyö voi auttaa
                  akuutissa hädässä.
                </p>
              </div>

              <div className="rounded-xl border-2 border-blue-200 bg-blue-50/50 p-5">
                <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  5. Kulutusluotto pikavipin sijaan
                </h3>
                <p className="text-sm text-gray-700">
                  Jos tarvitset yli 1 000 euroa, kulutusluotto on lähes aina
                  edullisempi kuin pikavippi. Todellinen vuosikorko voi olla
                  jopa 5–8 % — kymmenesosa pikavipin hinnasta. Vertaa
                  kulutusluottoja{' '}
                  <Link
                    href="/kulutusluotto"
                    className="text-[#1a365d] underline"
                  >
                    kulutusluotto-sivullamme
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* When pikavippi MIGHT be justified */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                <Scale className="h-5 w-5 text-amber-700" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Milloin pikavippi voi olla perusteltu?
              </h2>
            </div>

            <p className="text-gray-700 mb-6">
              Pikavippi voi olla perusteltu <strong>erittäin harvoin</strong> — ja vain, jos KAIKKI seuraavat ehdot täyttyvät:
            </p>

            <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-6">
              <ul className="space-y-3">
                {[
                  'Kyse on aidosta hätätilanteesta, jota ei voi lykätä (esim. auto hajalla ja sitä tarvitaan töihin pääsemiseen)',
                  'Olet VARMA, että pystyt maksamaan lainan takaisin eräpäivänä — esim. palkka tulee tilille ensi viikolla',
                  'Olet jo kokeillut kaikkia edellä mainittuja vaihtoehtoja',
                  'Lainasumma on pieni ja laina-aika lyhyt',
                  'Ymmärrät täysin lainan kustannukset ennen hakemista',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-amber-900">
                    <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 rounded-xl bg-red-50 border border-red-200 p-5">
              <div className="flex items-start gap-3">
                <AlertOctagon className="h-5 w-5 text-red-600 shrink-0 mt-0.5" />
                <div className="text-sm text-red-900">
                  <p className="font-semibold mb-1">
                    Jos et ole VARMA takaisinmaksukyvystäsi — älä ota pikavippiä
                  </p>
                  <p>
                    Maksamaton pikavippi + viivästyskorot + perintäkulut voivat
                    moninkertaistaa pienenkin velan. 500 euron pikavipistä voi
                    tulla 1 000+ euron velka perintäkuluineen. Ja
                    luottotietomerkintä seuraa 2–4 vuotta.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Better alternatives — Cheapest kulutusluotot */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Edullisempi vaihtoehto: kulutusluotto
              </h2>
              <p className="mt-2 text-gray-600">
                Nämä lainat ovat merkittävästi edullisempia kuin pikavippi
              </p>
            </div>
            <Link
              href="/kulutusluotto"
              className="hidden sm:inline-flex items-center gap-2 rounded-lg bg-[#38a169] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#276749] transition-colors"
            >
              Katso kaikki kulutusluotot
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mb-4">
          </div>

          <div className="space-y-4">
            {kulutusluottoProducts.map((product, index) => (
              <div
                key={product.id}
                className="rounded-xl border border-gray-200 bg-white p-5 sm:p-6 shadow-sm hover:shadow-md hover:border-[#38a169]/20 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 text-sm font-bold">
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
                      <p className="text-lg font-bold text-[#38a169]">
                        {formatPercentage(product.effectiveRate.min)} –{' '}
                        {formatPercentage(product.effectiveRate.max)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">
                        Minimisumma
                      </p>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(product.minAmount)}
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

                <div className="mt-4 flex justify-end">
                  <a
                    href={getApplyUrl(product.provider, product.type)}
                    target="_blank"
                    rel={
                      product.provider.isAffiliate
                        ? 'noopener noreferrer nofollow sponsored'
                        : 'noopener noreferrer nofollow'
                    }
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#38a169] px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#276749] transition-colors whitespace-nowrap"
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
              href="/kulutusluotto"
              className="flex items-center justify-center gap-2 rounded-lg bg-[#38a169] px-5 py-3 text-sm font-semibold text-white hover:bg-[#276749] transition-colors w-full"
            >
              Katso kaikki kulutusluotot
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Consumer rights */}
      <section className="py-12 sm:py-16 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <ShieldCheck className="h-5 w-5 text-[#1a365d]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Oikeutesi lainanhakijana
              </h2>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  {COOLING_OFF_DAYS} päivän peruuttamisoikeus
                </h3>
                <p className="text-sm text-gray-700">
                  Sinulla on oikeus peruuttaa kulutusluottosopimus{' '}
                  {COOLING_OFF_DAYS} päivän kuluessa sopimuksen tekemisesta
                  ilman syytä. Palautat lainasumman ja maksat korot
                  peruuttamisajalta. Lainanantaja ei saa periä muita kuluja
                  peruuttamisesta.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Korkokatto {INTEREST_RATE_CAP} %
                </h3>
                <p className="text-sm text-gray-700">
                  Todellinen vuosikorko ei saa ylittää {INTEREST_RATE_CAP} %
                  missään kulutusluotossa. Jos lainanantaja perii tätä
                  enemmän, sopimus on lain vastainen ja voit vaatia
                  liikamaksun palautusta.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Oikeus maksaa laina takaisin etuajassa
                </h3>
                <p className="text-sm text-gray-700">
                  Sinulla on aina oikeus maksaa kulutusluotto takaisin
                  etuajassa. Lainanantaja ei saa periä ennenaikaisesta
                  takaisinmaksusta kohtuuttomia kuluja.
                </p>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-5">
                <h3 className="font-semibold text-gray-900 mb-2">
                  Valitusprosessi
                </h3>
                <p className="text-sm text-gray-700">
                  Jos olet tyytymätön: 1) Valita ensin lainanantajalle
                  kirjallisesti. 2) Jos se ei auta, ota yhteys
                  kuluttajaneuvontaan (029 505 3050). 3) Voit viedä asian
                  kuluttajariitalautakuntaan (KRIL). 4) Ilmoita
                  Finanssivalvonnalle, jos epäilet laitonta toimintaa.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-xl bg-blue-50 border border-blue-200 p-5">
              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-[#1a365d] shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-semibold text-gray-900 mb-1">
                    Tarvitsetko apua velka-asioissa?
                  </p>
                  <p>
                    <strong>Talous- ja velkaneuvonta</strong> on maksuton
                    julkinen palvelu, joka auttaa velkaongelmien ratkaisemisessa.
                    Yhteystiedot:
                    <a
                      href="https://oikeus.fi/oikeusgapu/fi/talous-ja-velkaneuvonta"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-[#1a365d] underline"
                    >
                      oikeus.fi
                    </a>
                    . Myös{' '}
                    <strong>Takuusaatio</strong> tarjoaa apua velka-asioissa:
                    <a
                      href="https://www.takuusaatio.fi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="ml-1 text-[#1a365d] underline"
                    >
                      takuusaatio.fi
                    </a>
                  </p>
                </div>
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
              Usein kysytyt kysymykset pikavipistä
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

      {/* Final CTA — redirects to kulutusluotto, not pikavippi comparison */}
      <section className="py-12 sm:py-16 bg-[#1a365d]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Löydä edullisempi vaihtoehto pikavipille
          </h2>
          <p className="text-blue-100/80 mb-8 max-w-xl mx-auto">
            Kulutusluotto on lähes aina edullisempi kuin pikavippi. Vertaa
            vaihtoehtoja ja säästä turhissa korkokuluissa.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/kulutusluotto"
              className="inline-flex items-center gap-2 rounded-lg bg-[#ecc94b] px-8 py-4 text-base font-semibold text-[#1a365d] hover:bg-[#d69e2e] transition-colors"
            >
              <Calculator className="h-5 w-5" />
              Vertaa kulutusluottoja
            </Link>
            <Link
              href="/yhdistelylaina"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Yhdistä olemassa olevat lainat
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
