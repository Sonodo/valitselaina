import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Coins,
  Scale,
  Eye,
  Database,
  Equal,
  HelpCircle,
  Mail,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Sivuston ansainta — Näin ValitseLaina toimii';
const pageDescription =
  'ValitseLaina on ilmainen lainavertailu. Näin ansaitsemme toiminnasta ja miksi vertailu on puolueeton.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/sivuston-ansainta` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/sivuston-ansainta`,
    siteName: SITE_NAME,
    locale: 'fi_FI',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: pageTitle,
    description: pageDescription,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Sivuston ansainta',
  description: pageDescription,
  url: `${SITE_URL}/sivuston-ansainta`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
  },
};

const principles = [
  {
    icon: Scale,
    title: 'Järjestys ei riipu komissiosta',
    desc: 'Palveluntarjoajat näkyvät vertailussa samalla logiikalla riippumatta siitä, saammeko heiltä komissiota vai emme.',
  },
  {
    icon: Eye,
    title: 'Vertaamme myös palveluita, joista emme saa mitään',
    desc: 'Käyttäjällä on oikeus nähdä koko markkina, ei vain kumppaneita.',
  },
  {
    icon: Database,
    title: 'Tiedot perustuvat julkisiin lähteisiin',
    desc: 'Hinnat, korot, ehdot ja ominaisuudet tulevat palveluntarjoajien omilta sivuilta ja virallisista rekistereistä.',
  },
  {
    icon: Equal,
    title: 'Kumppanit ja ei-kumppanit näkyvät identtisesti',
    desc: 'Emme nosta kumppaneita korkeammalle, emme piilota ei-kumppaneita, emmekä merkitse heitä eri tavalla.',
  },
];

export default function SivustonAnsaintaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <div className="bg-[#1a365d] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <Coins className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Avoimuus
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Sivuston ansainta
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl">
            ValitseLaina on ilmainen vertailupalvelu kuluttajille. Emme veloita
            käyttäjiltä mitään — vertailun käyttö ja kaikki sisältö on
            maksutonta.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
        {/* How we earn */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Coins className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Miten ansaitsemme rahaa
            </h2>
          </div>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Saamme komissiota osalta palveluntarjoajista, kun siirryt heidän
              sivulleen ValitseLainan kautta ja teet sopimuksen tai hakemuksen.
              Käytämme tähän Adtraction-affiliate-verkostoa, joka on yksi
              Pohjoismaiden suurimmista ja luotettavimmista
              mainosyhteistyöverkostoista.
            </p>
          </div>
        </section>

        {/* How we keep the comparison neutral */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Miten pidämme vertailun puolueettomana
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {principles.map((p) => (
              <div key={p.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1a365d]/10 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-[#1a365d]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {p.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Why we do this */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Miksi teemme näin
            </h2>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <p className="text-gray-800 leading-relaxed">
              Ilmainen vertailupalvelu tarvitsee ansaintatavan. Valitsimme
              komissiomallin puhtaasti sen takia, että se on ainoa tapa pitää
              palvelu maksuttomana ja silti velvoittaa meidät tekemään hyvää
              vertailua: käyttäjien pitää löytää itselleen paras vaihtoehto, tai
              he eivät tule takaisin.
            </p>
          </div>
        </section>

        {/* Questions */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <HelpCircle className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">Kysyttävää?</h2>
          </div>
          <div className="text-gray-700 leading-relaxed">
            <p>
              Mikäli sinulla on kysymyksiä komissiomallista tai vertailun
              toimintatavasta, voit olla yhteydessä asiakaspalveluumme.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-10 text-center border border-gray-100">
          <Mail className="w-8 h-8 text-[#1a365d] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ota yhteyttä</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Avoimuus on meille tärkeää. Jos jokin jäi mietityttämään, kerro
            meille.
          </p>
          <Link
            href="/yhteystiedot"
            className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 font-semibold text-white hover:bg-[#2a4a7f] transition-colors"
          >
            <Mail className="w-4 h-4" />
            Yhteystiedot
          </Link>
        </div>
      </div>
    </>
  );
}
