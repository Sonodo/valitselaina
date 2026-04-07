import type { Metadata } from 'next';
import Link from 'next/link';
import { Cookie, Settings, BarChart3, Handshake, ShieldCheck, Info } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Evastekäytäntö — Valitse Laina';
const pageDescription =
  'Valitse Lainan evästekäytäntö. Lue mitä evästeitä käytämme, mihin niitä käytetään ja miten voit hallita evästeasetuksiasi.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/evasteet` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/evasteet`,
    siteName: SITE_NAME,
  },
};

interface CookieInfo {
  name: string;
  purpose: string;
  provider: string;
  duration: string;
  type: 'necessary' | 'analytics' | 'marketing';
}

const cookies: CookieInfo[] = [
  {
    name: 'Istuntoeväste',
    purpose: 'Sivuston perustoiminnallisuus ja tietoturva',
    provider: 'Valitse Laina',
    duration: 'Istunnon ajan',
    type: 'necessary',
  },
  {
    name: 'Evästeasetukset',
    purpose: 'Muistaa käyttäjän evästevalinta',
    provider: 'Valitse Laina',
    duration: '12 kuukautta',
    type: 'necessary',
  },
  {
    name: '_ga',
    purpose: 'Erottaa kävijät toisistaan (Google Analytics)',
    provider: 'Google',
    duration: '2 vuotta',
    type: 'analytics',
  },
  {
    name: '_ga_*',
    purpose: 'Käytetään istunnon tilan tallentamiseen (Google Analytics 4)',
    provider: 'Google',
    duration: '2 vuotta',
    type: 'analytics',
  },
  {
    name: 'Affiliate-seuranta',
    purpose: 'Tunnistaa liikenteen lähteen kumppaniseurantaa varten',
    provider: 'Affiliate-verkostot',
    duration: '30–90 päivää',
    type: 'marketing',
  },
];

const typeLabels: Record<CookieInfo['type'], { label: string; color: string; bgColor: string }> = {
  necessary: { label: 'Välttämätön', color: 'text-green-800', bgColor: 'bg-green-100' },
  analytics: { label: 'Analytiikka', color: 'text-blue-800', bgColor: 'bg-blue-100' },
  marketing: { label: 'Markkinointi', color: 'text-purple-800', bgColor: 'bg-purple-100' },
};

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24">
      {children}
    </h2>
  );
}

export default function EvasteetPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1a365d] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <Cookie className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Evästeet
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Evästekäytäntö
          </h1>
          <p className="text-lg text-blue-200">
            Viimeksi päivitetty: 1.4.2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Intro */}
        <div className="text-gray-700 leading-relaxed space-y-4 mb-10">
          <p>
            Tämä evästekäytäntö kertoo, mitä evästeitä (cookies) valitselaina.fi käyttää,
            mihin niitä käytetään ja miten voit hallita evästeasetuksiasi.
          </p>
        </div>

        {/* What are cookies */}
        <SectionTitle id="mita-evasteet-ovat">Mitä evästeet ovat?</SectionTitle>
        <div className="text-gray-700 leading-relaxed space-y-3 mb-10">
          <p>
            Evästeet ovat pieniä tekstitiedostoja, jotka verkkosivusto tallentaa
            selaimellesi. Ne auttavat sivustoa muistamaan asetuksiasi ja ymmärtämään,
            miten sivustoa käytetään. Evästeet eivät vahingoita laitettasi eivätkä
            sisällä viruksia.
          </p>
        </div>

        {/* Cookie types */}
        <SectionTitle id="evastetyypit">Käytettävät evästetyypit</SectionTitle>

        <div className="space-y-6 mb-10">
          {/* Necessary */}
          <div className="bg-green-50 rounded-xl p-5 border border-green-100">
            <div className="flex items-center gap-2 mb-3">
              <ShieldCheck className="w-5 h-5 text-green-700" />
              <h3 className="font-semibold text-gray-900">Välttämättömät evästeet</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Nämä evästeet ovat tarpeellisia sivuston perustoimintojen varmistamiseksi.
              Niitä ei voi poistaa käytöstä. Ne eivät kerää tunnistettavia henkilötietoja.
            </p>
          </div>

          {/* Analytics */}
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 className="w-5 h-5 text-blue-700" />
              <h3 className="font-semibold text-gray-900">Analytiikkaevästeet</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Analytiikkaevästeet auttavat meitä ymmärtämään, miten kävijät käyttävät
              sivustoa. Tietojen avulla voimme parantaa sivuston sisältöä ja käytettävyyttä.
              Käytämme Google Analytics 4:ää IP-anonymisoinnilla.
            </p>
          </div>

          {/* Marketing / affiliate */}
          <div className="bg-purple-50 rounded-xl p-5 border border-purple-100">
            <div className="flex items-center gap-2 mb-3">
              <Handshake className="w-5 h-5 text-purple-700" />
              <h3 className="font-semibold text-gray-900">Markkinointi- ja affiliate-evästeet</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">
              Nämä evästeet asettavat affiliate-kumppaniverkostot. Niiden avulla
              kumppanimme tunnistavat, että liikenne on tullut Valitse Lainan kautta.
              Tämä mahdollistaa palvelumme ilmaisuuden käyttäjille.
            </p>
          </div>
        </div>

        {/* Cookie table */}
        <SectionTitle id="evastelista">Evästelista</SectionTitle>
        <div className="overflow-x-auto mb-10">
          <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-4 py-3 font-semibold">Eväste</th>
                <th className="text-left px-4 py-3 font-semibold">Tarkoitus</th>
                <th className="text-left px-4 py-3 font-semibold">Asettaja</th>
                <th className="text-left px-4 py-3 font-semibold">Kesto</th>
                <th className="text-left px-4 py-3 font-semibold">Tyyppi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {cookies.map((cookie) => {
                const tl = typeLabels[cookie.type];
                return (
                  <tr key={cookie.name}>
                    <td className="px-4 py-3 font-medium text-gray-900">{cookie.name}</td>
                    <td className="px-4 py-3 text-gray-700">{cookie.purpose}</td>
                    <td className="px-4 py-3 text-gray-700">{cookie.provider}</td>
                    <td className="px-4 py-3 text-gray-700">{cookie.duration}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${tl.bgColor} ${tl.color}`}>
                        {tl.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* How to manage */}
        <SectionTitle id="evasteiden-hallinta">Evästeiden hallinta</SectionTitle>
        <div className="text-gray-700 leading-relaxed space-y-4 mb-10">
          <p>
            Voit hallita evästeitä useilla tavoilla:
          </p>
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Selainasetukset</h3>
              </div>
              <p className="text-sm">
                Useimmat selaimet sallivat evästeiden hallinnan asetuksistaan.
                Voit estää tai poistaa evästeitä selaimesi asetuksista.
                Huomaa, että evästeiden estäminen voi vaikuttaa sivuston toimintaan.
              </p>
              <ul className="mt-3 space-y-1 text-sm">
                <li>
                  <strong>Chrome:</strong> Asetukset → Tietosuoja ja turvallisuus → Evästeet
                </li>
                <li>
                  <strong>Firefox:</strong> Asetukset → Tietosuoja ja turvallisuus → Evästeet
                </li>
                <li>
                  <strong>Safari:</strong> Asetukset → Tietosuoja → Evästeet
                </li>
                <li>
                  <strong>Edge:</strong> Asetukset → Evästeet ja sivuston käyttöoikeudet
                </li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
              <div className="flex items-center gap-2 mb-2">
                <Info className="w-5 h-5 text-gray-600" />
                <h3 className="font-semibold text-gray-900">Google Analytics opt-out</h3>
              </div>
              <p className="text-sm">
                Voit estää Google Analyticsin tiedonkeruun asentamalla{' '}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a365d] underline"
                >
                  Google Analytics Opt-out -selainlisäosan
                </a>.
              </p>
            </div>
          </div>
        </div>

        {/* Third-party cookies */}
        <SectionTitle id="kolmannen-osapuolen-evasteet">Kolmannen osapuolen evästeet</SectionTitle>
        <div className="text-gray-700 leading-relaxed space-y-3 mb-10">
          <p>
            Sivustomme voi sisältää kolmannen osapuolen evästeitä seuraavista lähteistä:
          </p>
          <ul className="list-disc list-inside space-y-1">
            <li><strong>Google Analytics</strong> — Kävijäanalytiikka</li>
            <li><strong>Affiliate-verkostot</strong> — Kumppaniliikenteen seuranta</li>
          </ul>
          <p>
            Kolmannen osapuolen evästeet ovat näiden palveluntarjoajien hallinnoimia.
            Tutustu kunkin palveluntarjoajan omaan evästekäytäntöön lisätietoja varten.
          </p>
        </div>

        {/* Changes */}
        <SectionTitle id="muutokset">Muutokset evästekäytäntöön</SectionTitle>
        <div className="text-gray-700 leading-relaxed space-y-3 mb-10">
          <p>
            Voimme päivittää tätä evästekäytäntöä aika ajoin. Merkittävistä muutoksista
            ilmoitetaan sivustolla. Tämä evästekäytäntö on voimassa 1.4.2026 alkaen.
          </p>
        </div>

        {/* Contact */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
          <h3 className="font-semibold text-gray-900 mb-2">Kysyttävää evästeistä?</h3>
          <p className="text-sm text-gray-700">
            Evästekäytäntöä koskevat kysymykset voi lähettää osoitteeseen{' '}
            <a href="mailto:info@valitselaina.fi" className="text-[#1a365d] underline font-medium">
              info@valitselaina.fi
            </a>. Lue myös{' '}
            <Link href="/tietosuoja" className="text-[#1a365d] underline font-medium">
              tietosuojaselosteemme
            </Link>.
          </p>
        </div>
      </div>
    </>
  );
}
