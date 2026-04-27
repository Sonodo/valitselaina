import type { Metadata } from 'next';
import Link from 'next/link';
import { BookOpen, ArrowLeft } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

// ─────────────────────────────────────────────────────────────────────────────
// Lainasanasto — glossary of Finnish loan terminology
// Definitions reference Finanssivalvonta (Fiva) and Suomen Pankki where the
// concept is regulator-defined or rate-data-published.
// ─────────────────────────────────────────────────────────────────────────────

const pageTitle = 'Lainasanasto — Lainojen termit selitettyinä';
const pageDescription =
  'Selkokielinen sanasto lainojen vertailuun: euribor, marginaali, todellinen vuosikorko, kuukausierä, vakuudeton laina, Finnvera-takaus ja muut keskeiset termit.';

interface GlossaryTerm {
  /** URL-friendly id used as the in-page anchor and DefinedTerm @id. */
  id: string;
  /** Canonical Finnish term (sometimes followed by an alias in parentheses). */
  term: string;
  /** Optional short alias — used by the DefinedTerm.alternateName field. */
  alternateName?: string;
  /** 2–4 sentence Finnish definition. */
  definition: string;
  /**
   * Optional source attribution for terms whose definition is set by an
   * authority (Fiva, Suomen Pankki, etc.). Renders as a small note.
   */
  source?: { label: string; url: string };
}

const terms: GlossaryTerm[] = [
  {
    id: 'euribor',
    term: 'Euribor',
    alternateName: 'Euro Interbank Offered Rate',
    definition:
      'Euribor on euroalueen pankkien välinen viitekorko, jota käytetään yleisesti Suomessa asuntolainojen ja monien yrityslainojen vaihtuvan koron pohjana. Yleisimmin käytetyt euriborit ovat 3 kk, 6 kk ja 12 kk. Lainan kokonaiskorko muodostuu siitä, että pankin marginaali lisätään euriboriin.',
    source: {
      label: 'Suomen Pankki — Euribor-korot',
      url: 'https://www.suomenpankki.fi/fi/tilastot/korot/',
    },
  },
  {
    id: 'marginaali',
    term: 'Marginaali',
    definition:
      'Marginaali on se osa lainan korkoa, jonka lainanantaja perii euriborin tai muun viitekoron päälle. Esimerkiksi jos viitekorko on 2,5 % ja marginaali 0,6 %, nimelliskoroksi muodostuu 3,1 %. Marginaali pysyy yleensä samana koko laina-ajan, vaikka viitekorko vaihtelee.',
  },
  {
    id: 'todellinen-vuosikorko',
    term: 'Todellinen vuosikorko (TVK)',
    alternateName: 'TVK',
    definition:
      'Todellinen vuosikorko on lainan kokonaiskustannus prosenttilukuna vuodessa. Siihen on laskettu mukaan nimelliskoron lisäksi avausmaksu, kuukausimaksut ja muut pakolliset kulut. Todellinen vuosikorko on ainoa luotettava vertailuluku eri lainojen välillä, koska se kuvaa lainan koko hintalappua.',
    source: {
      label: 'Finanssivalvonta — Kuluttajaluoton kustannukset',
      url: 'https://www.finanssivalvonta.fi/kuluttajansuoja/luotot/',
    },
  },
  {
    id: 'nimelliskorko',
    term: 'Nimelliskorko',
    definition:
      'Nimelliskorko on lainasopimuksessa ilmoitettu korkoprosentti, joka veloitetaan lainan jäljellä olevasta pääomasta. Nimelliskorko ei sisällä lainan kuluja, joten kahta lainaa ei voi vertailla pelkän nimelliskoron perusteella. Vertailussa pitää aina käyttää todellista vuosikorkoa.',
  },
  {
    id: 'kuukausiera',
    term: 'Kuukausierä',
    definition:
      'Kuukausierä on se rahasumma, jonka lainanottaja maksaa kuukausittain lainanantajalleen. Erä koostuu pääoman lyhennyksestä, korosta ja mahdollisesta kuukausimaksusta. Erän suuruus riippuu valitusta lyhennystavasta — annuiteetissa erä pysyy samana, tasalyhennyksessä se pienenee laina-ajan myötä.',
  },
  {
    id: 'kuukausimaksu',
    term: 'Kuukausimaksu',
    definition:
      'Kuukausimaksu on lainanantajan perimä kuukausittainen palvelumaksu, joka maksetaan koron ja lyhennyksen päälle. Tyypillisesti 0–10 € kuukaudessa. Kuukausimaksu sisältyy todelliseen vuosikorkoon, joten se on aina mukana lainojen kokonaiskustannuksen vertailussa.',
  },
  {
    id: 'takaisinmaksuaika',
    term: 'Takaisinmaksuaika',
    alternateName: 'Laina-aika',
    definition:
      'Takaisinmaksuaika on aika, jolla laina maksetaan kokonaan takaisin lainanantajalle. Pidempi laina-aika pienentää kuukausierää mutta nostaa kokonaiskorkokulua, koska korkoa kertyy pidemmältä ajalta. Suomessa kulutusluottojen laina-ajat ovat tyypillisesti 1–15 vuotta ja asuntolainojen 15–30 vuotta.',
  },
  {
    id: 'vakuudeton-laina',
    term: 'Vakuudeton laina',
    definition:
      'Vakuudeton laina on laina, johon lainanottajan ei tarvitse antaa erillistä vakuutta — esimerkiksi asuntoa tai autoa — lainan turvaksi. Suurin osa kulutusluotoista on vakuudettomia. Koska vakuutta ei ole, lainanantajan riski on suurempi, mikä näkyy korkeampana korkona vakuudelliseen lainaan verrattuna.',
  },
  {
    id: 'vakuudellinen-laina',
    term: 'Vakuudellinen laina',
    definition:
      'Vakuudellinen laina on laina, jonka turvaksi lainanottaja antaa omaisuutta — yleisimmin asunnon, sijoituskohteen tai auton. Jos lainaa ei pystytä maksamaan, lainanantaja voi periä saatavansa vakuudesta. Vakuus pienentää lainanantajan riskiä, ja siksi vakuudelliset lainat ovat yleensä vakuudettomia edullisempia.',
  },
  {
    id: 'kulutusluotto',
    term: 'Kulutusluotto',
    definition:
      'Kulutusluotto on yksityishenkilön ottama, yleensä vakuudeton laina, jota voidaan käyttää vapaasti — esimerkiksi remonttiin, auton ostoon tai elämäntilanteen muutoksiin. Kulutusluottojen korkoa rajoittaa Suomen lainsäädännön mukainen 20 %:n korkokatto. Kulutusluottoja säätelevät kuluttajansuojalaki ja Finanssivalvonta.',
  },
  {
    id: 'yrityslaina',
    term: 'Yrityslaina',
    definition:
      'Yrityslaina on yritykselle myönnetty rahoitus, jota käytetään investointeihin, käyttöpääomaan tai laajentumiseen. Yrityslainan ehdot eivät ole kuluttajansuojan piirissä, joten korot, vakuudet ja kulut neuvotellaan tapauskohtaisesti. Yrityslainoissa Finnveran takaus voi pienentää lainanantajan riskiä ja parantaa lainan saatavuutta.',
  },
  {
    id: 'lainakatto',
    term: 'Lainakatto',
    definition:
      'Lainakatto rajaa, kuinka suuren asuntolainan pankki saa myöntää suhteessa asunnon hintaan. Suomessa Finanssivalvonnan asettama lainakatto on yleensä 90 % asunnon hankintahinnasta — ensiasunnon ostajalle 95 %. Lainakatto pakottaa lainanottajan kerryttämään omarahoitusosuutta ennen asuntokauppaa.',
    source: {
      label: 'Finanssivalvonta — Lainakatto',
      url: 'https://www.finanssivalvonta.fi/saantely/maaraykset-ja-ohjeet/',
    },
  },
  {
    id: 'korkokatto',
    term: 'Korkokatto',
    definition:
      'Korkokatto on lailla säädetty enimmäiskorko, jonka lainanantaja saa periä kuluttajaluotosta. Suomessa kulutusluottojen korkokatto on 20 % vuodesta 2023 alkaen. Korkokatto kattaa nimelliskoron — todelliseen vuosikorkoon voi sisältyä lisäksi maksuja, mutta nekin on yhteenlaskettuna rajoitettu kuluttajansuojalaissa.',
    source: {
      label: 'Finanssivalvonta — Kuluttajaluoton korkokatto',
      url: 'https://www.finanssivalvonta.fi/kuluttajansuoja/luotot/',
    },
  },
  {
    id: 'lyhennystapa',
    term: 'Lyhennystapa (annuiteetti, tasaerä, tasalyhennys)',
    alternateName: 'Annuiteetti / tasaerä / tasalyhennys',
    definition:
      'Lyhennystapa määrittää, miten lainan kuukausierät jaetaan koron ja pääoman kesken. Annuiteetissa kuukausierä pysyy samana, mutta korkojen osuus pienenee laina-ajan myötä — laina-aika joustaa korkojen muuttuessa. Tasaerässä kuukausierä on kiinteä ja laina-aika venyy korkojen noustessa. Tasalyhennyksessä lyhennys on aina yhtä suuri ja kuukausierä pienenee laina-ajan myötä.',
  },
  {
    id: 'finnvera-takaus',
    term: 'Finnvera-takaus',
    definition:
      'Finnvera-takaus on valtion erityisrahoitusyhtiö Finnveran myöntämä takaus pankille, joka mahdollistaa yrityslainan saamisen tilanteessa, jossa yrittäjän omat vakuudet eivät riitä. Takaus pienentää pankin riskiä ja siten parantaa rahoituksen saantia erityisesti aloittaville ja kasvaville yrityksille. Takauksesta peritään takausprovisio, joka näkyy yrityslainan kokonaiskustannuksessa.',
  },
  {
    id: 'luottohairiomerkinta',
    term: 'Luottohäiriömerkintä',
    alternateName: 'Maksuhäiriömerkintä',
    definition:
      'Luottohäiriömerkintä on merkintä luottotietorekisterissä, joka kertoo lainanottajan maksukyvyn ongelmista — tyypillisesti maksamattomasta laskusta tai lainasta. Merkintä säilyy rekisterissä yleensä 2–4 vuotta ja vaikeuttaa uuden lainan, vuokra-asunnon tai puhelinliittymän saamista. Merkinnän voi saada Suomen Asiakastiedon tai Bisnoden rekisteriin.',
  },
  {
    id: 'positiivinen-luottotietorekisteri',
    term: 'Positiivinen luottotietorekisteri',
    definition:
      'Positiivinen luottotietorekisteri on Tulorekisterin yhteyteen rakennettu rekisteri, johon kerätään tieto kaikista yksityishenkilön voimassa olevista luotoista — myös niistä, joiden hoitaminen on sujunut moitteettomasti. Rekisteri otettiin käyttöön Suomessa 1.4.2024, ja lainanantajat ovat velvollisia tarkistamaan sen ennen luottopäätöstä. Tarkoituksena on ehkäistä ylivelkaantumista ja tehdä luottoarvioista tarkempia.',
    source: {
      label: 'Finanssivalvonta — Positiivinen luottotietorekisteri',
      url: 'https://www.finanssivalvonta.fi/kuluttajansuoja/luotot/',
    },
  },
];

// ─── Schema.org structured data ────────────────────────────────────────────
const definedTermSetJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  '@id': `${SITE_URL}/sanasto#termset`,
  name: 'Lainasanasto',
  description: pageDescription,
  url: `${SITE_URL}/sanasto`,
  inLanguage: 'fi',
  hasDefinedTerm: terms.map((t) => ({
    '@type': 'DefinedTerm',
    '@id': `${SITE_URL}/sanasto#${t.id}`,
    name: t.term,
    ...(t.alternateName ? { alternateName: t.alternateName } : {}),
    description: t.definition,
    inDefinedTermSet: { '@id': `${SITE_URL}/sanasto#termset` },
    url: `${SITE_URL}/sanasto#${t.id}`,
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
      name: 'Lainasanasto',
      item: `${SITE_URL}/sanasto`,
    },
  ],
};

// ─── Page metadata ─────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/sanasto` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/sanasto`,
    siteName: SITE_NAME,
    type: 'website',
  },
};

export default function SanastoPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(definedTermSetJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      {/* Hero */}
      <div className="bg-[#1a365d] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Lainasanasto
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Lainojen termit selkokielellä
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl">
            Mitä euribor, marginaali tai todellinen vuosikorko oikeasti
            tarkoittaa? Tämä sanasto avaa keskeiset lainatermit niin, että
            vertailu helpottuu.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Breadcrumb */}
        <nav className="mb-6 text-sm text-gray-500" aria-label="Murupolku">
          <ol className="flex items-center gap-1.5 flex-wrap">
            <li>
              <Link href="/" className="hover:text-[#1a365d] transition-colors">
                Etusivu
              </Link>
            </li>
            <li aria-hidden="true">/</li>
            <li className="text-gray-700 font-medium">Lainasanasto</li>
          </ol>
        </nav>

        {/* Term index — alphabetical jump links */}
        <div className="mb-10 rounded-xl border border-gray-200 bg-gray-50 p-5">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-3">
            Sisällys
          </p>
          <ul className="flex flex-wrap gap-x-4 gap-y-2">
            {terms.map((t) => (
              <li key={t.id}>
                <a
                  href={`#${t.id}`}
                  className="text-sm text-[#1a365d] hover:underline"
                >
                  {t.term}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Term list */}
        <dl className="space-y-10">
          {terms.map((t) => (
            <div
              key={t.id}
              id={t.id}
              className="scroll-mt-24 border-b border-gray-100 pb-8 last:border-b-0"
            >
              <dt className="mb-2">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  {t.term}
                </h2>
                {t.alternateName && (
                  <p className="text-sm text-gray-500 mt-0.5">
                    Myös: {t.alternateName}
                  </p>
                )}
              </dt>
              <dd className="text-gray-700 leading-relaxed">
                <p>{t.definition}</p>
                {t.source && (
                  <p className="mt-3 text-xs text-gray-500">
                    Lähde:{' '}
                    <a
                      href={t.source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline hover:text-[#1a365d]"
                    >
                      {t.source.label}
                    </a>
                  </p>
                )}
              </dd>
            </div>
          ))}
        </dl>

        {/* Back / next steps */}
        <div className="mt-12 border-t border-gray-200 pt-8 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <Link
            href="/oppaat"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a365d] hover:text-[#2a4a7f] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Takaisin oppaisiin
          </Link>
          <Link
            href="/vertailu"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors"
          >
            Aloita lainavertailu
          </Link>
        </div>
      </div>
    </>
  );
}
