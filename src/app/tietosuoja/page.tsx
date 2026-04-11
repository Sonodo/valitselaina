import type { Metadata } from 'next';
import { ShieldCheck, Eye, Database, Globe, UserX, Mail, Lock } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Tietosuojaseloste — Valitse Laina';
const pageDescription =
  'Valitse Lainan tietosuojaseloste. Lue mitä tietoja keräämme, mitä emme kerää, ja miten käsittelemme tietojasi GDPR:n mukaisesti.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/tietosuoja` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/tietosuoja`,
    siteName: SITE_NAME,
  },
};

function SectionTitle({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <h2 id={id} className="text-xl font-bold text-gray-900 mt-10 mb-4 scroll-mt-24">
      {children}
    </h2>
  );
}

function SubSection({ children }: { children: React.ReactNode }) {
  return <div className="text-gray-700 leading-relaxed space-y-3">{children}</div>;
}

export default function TietosuojaPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1a365d] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <Lock className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Tietosuoja
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Tietosuojaseloste
          </h1>
          <p className="text-lg text-blue-200">
            Viimeksi päivitetty: 1.4.2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Important notice */}
        <div className="bg-green-50 rounded-xl p-6 border border-green-100 mb-10">
          <div className="flex items-start gap-3">
            <UserX className="w-6 h-6 text-green-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Tärkeää</h3>
              <p className="text-sm text-gray-700">
                Valitse Laina <strong>ei kerää lainahakemus- tai henkilökohtaisia taloustietoja</strong>.
                Emme tiedä tulojasi, velkojasi, luottotietojasi tai muita taloudellisia tietojasi.
                Olemme vertailupalvelu — emme käsittele lainahakemuksia.
              </p>
            </div>
          </div>
        </div>

        <div className="prose-like space-y-2">

          <SectionTitle id="rekisterinpitaja">1. Rekisterinpitäjä</SectionTitle>
          <SubSection>
            <p>
              <strong>Sonodo — Henri Linnainmaa</strong><br />
              Y-tunnus: 2887416-4<br />
              Helsinki, Suomi<br />
              Verkkosivusto: https://valitselaina.fi
            </p>
          </SubSection>

          <SectionTitle id="mita-tietoja">2. Mitä tietoja keräämme</SectionTitle>
          <SubSection>
            <p>Keräämme vain välttämättömiä tietoja palvelun toiminnan ja kehittämisen tueksi:</p>
            <h3 className="font-semibold text-gray-900 mt-4">2.1 Analytiikkatiedot</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Sivulataukset ja vierailuajat (Google Analytics)</li>
              <li>Selaintyyppi ja käyttöjärjestelmä</li>
              <li>Viittaava verkko-osoite</li>
              <li>Maa ja kaupunkitasoinen sijainti (ei tarkkaa sijaintia)</li>
              <li>Laitteen tyyppi (mobiili/tabletti/tietokone)</li>
            </ul>
            <h3 className="font-semibold text-gray-900 mt-4">2.2 Evästeet</h3>
            <ul className="list-disc list-inside space-y-1 text-sm">
              <li>Välttämättömät evästeet (sivuston toiminta)</li>
              <li>Analytiikkaevästeet (Google Analytics)</li>
              <li>Affiliate-seurantaevästeet (kumppaniverkostojen evästeet)</li>
            </ul>
            <h3 className="font-semibold text-gray-900 mt-4">2.3 Yhteydenottotiedot</h3>
            <p className="text-sm">
              Jos otat meihin yhteyttä sähköpostitse, tallennamme sähköpostiosoitteesi
              ja viestisi sisällön yhteydenottoon vastaamiseksi.
            </p>
          </SubSection>

          <SectionTitle id="mita-emme-keraa">3. Mitä emme kerää</SectionTitle>
          <SubSection>
            <ul className="list-disc list-inside space-y-1">
              <li>Lainahakemustietoja (emme käsittele lainahakemuksia)</li>
              <li>Henkilötunnuksia</li>
              <li>Tulotietoja tai varallisuustietoja</li>
              <li>Luottotietoja</li>
              <li>Pankkitilitietoja</li>
              <li>Tarkkoja sijaintitietoja</li>
            </ul>
          </SubSection>

          <SectionTitle id="tarkoitus">4. Tietojen käyttötarkoitus</SectionTitle>
          <SubSection>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Palvelun kehittäminen:</strong> analytiikkatietojen avulla ymmärrämme, miten sivustoa käytetään ja miten voimme parantaa sitä</li>
              <li><strong>Affiliate-seuranta:</strong> jotta kumppanimme voivat tunnistaa liikenteen lähteen ja maksaa meille korvauksen</li>
              <li><strong>Yhteydenottoon vastaaminen:</strong> sähköpostitse lähetettyihin viesteihin vastaaminen</li>
            </ul>
          </SubSection>

          <SectionTitle id="oikeusperuste">5. Käsittelyn oikeusperuste</SectionTitle>
          <SubSection>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Suostumus:</strong> analytiikka- ja markkinointievästeet (evästebannerin kautta)</li>
              <li><strong>Oikeutettu etu:</strong> palvelun perus toiminnallisuus ja turvallisuus</li>
              <li><strong>Sopimus:</strong> yhteydenottopyyntöihin vastaaminen</li>
            </ul>
          </SubSection>

          <SectionTitle id="kolmannet-osapuolet">6. Kolmannen osapuolen palvelut</SectionTitle>
          <SubSection>
            <p>Käytämme seuraavia kolmannen osapuolen palveluja:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm border border-gray-200 rounded-lg overflow-hidden mt-2">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-2 font-semibold">Palvelu</th>
                    <th className="text-left px-4 py-2 font-semibold">Tarkoitus</th>
                    <th className="text-left px-4 py-2 font-semibold">Tietosuoja</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-4 py-2">Google Analytics</td>
                    <td className="px-4 py-2">Kävijäanalytiikka</td>
                    <td className="px-4 py-2">
                      <a href="https://policies.google.com/privacy" className="text-[#1a365d] underline" target="_blank" rel="noopener noreferrer">
                        Googlen tietosuoja
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Vercel</td>
                    <td className="px-4 py-2">Sivuston ylläpito</td>
                    <td className="px-4 py-2">
                      <a href="https://vercel.com/legal/privacy-policy" className="text-[#1a365d] underline" target="_blank" rel="noopener noreferrer">
                        Vercelin tietosuoja
                      </a>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2">Affiliate-verkostot</td>
                    <td className="px-4 py-2">Kumppaniliikenteen seuranta</td>
                    <td className="px-4 py-2">Kunkin verkoston oma seloste</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </SubSection>

          <SectionTitle id="tietojen-siirto">7. Tietojen siirto EU:n ulkopuolelle</SectionTitle>
          <SubSection>
            <p>
              Google Analytics saattaa käsitellä tietoja EU:n ulkopuolella. Google on sitoutunut
              EU:n tietosuojapuitesopimukseen (EU-US Data Privacy Framework). Käytämme Google
              Analytics 4:n IP-anonymisointia.
            </p>
          </SubSection>

          <SectionTitle id="tietojen-sailytys">8. Tietojen säilytysaika</SectionTitle>
          <SubSection>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Analytiikkatiedot:</strong> Google Analyticsin oletusasetuksen mukaan (14 kuukautta)</li>
              <li><strong>Yhteydenottosähköpostit:</strong> 12 kuukautta yhteydenoton jälkeen</li>
              <li><strong>Evästeet:</strong> evästekäytännön mukainen aika (ks. evästesivu)</li>
            </ul>
          </SubSection>

          <SectionTitle id="oikeutesi">9. Sinun oikeutesi (GDPR)</SectionTitle>
          <SubSection>
            <p>Sinulla on EU:n tietosuoja-asetuksen (GDPR) mukaiset oikeudet:</p>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Oikeus saada tietoa</strong> — Mitä tietoja sinusta käsitellään</li>
              <li><strong>Oikeus päästä tietoihin käsiksi</strong> — Pyydä kopio tiedoistasi</li>
              <li><strong>Oikeus tietojen oikaisemiseen</strong> — Korjaa virheelliset tiedot</li>
              <li><strong>Oikeus tietojen poistamiseen</strong> — Pyydä tietojen poistamista</li>
              <li><strong>Oikeus rajoittaa käsittelyä</strong> — Rajoita tietojen käsittelyä</li>
              <li><strong>Oikeus siirtää tiedot</strong> — Saa tietosi siirrettävässä muodossa</li>
              <li><strong>Oikeus vastustaa käsittelyä</strong> — Vastusta oikeutettuun etuun perustuvaa käsittelyä</li>
              <li><strong>Oikeus peruuttaa suostumus</strong> — Evästeasetukset voi muuttaa milloin tahansa</li>
            </ul>
            <p>
              Toteuta oikeutesi ottamalla yhteyttä{' '}
              <a href="/yhteystiedot" className="text-[#1a365d] underline font-medium">
                yhteydenottosivullamme
              </a>.
              Vastaamme pyyntöihin 30 päivän kuluessa.
            </p>
          </SubSection>

          <SectionTitle id="valitusoikeus">10. Valitusoikeus</SectionTitle>
          <SubSection>
            <p>
              Jos katsot, että henkilötietojesi käsittely rikkoo tietosuoja-asetusta,
              sinulla on oikeus tehdä valitus valvontaviranomaiselle:
            </p>
            <p className="text-sm bg-gray-50 rounded-lg p-4 border border-gray-100">
              <strong>Tietosuojavaltuutetun toimisto</strong><br />
              Lintulahdenkuja 4, 00530 Helsinki<br />
              Puhelin: 029 566 6700<br />
              Sähköposti: tietosuoja@om.fi<br />
              Verkkosivusto: tietosuoja.fi
            </p>
          </SubSection>

          <SectionTitle id="muutokset">11. Muutokset tietosuojaselosteeseen</SectionTitle>
          <SubSection>
            <p>
              Voimme päivittää tätä tietosuojaselostetta aika ajoin. Merkittävistä muutoksista
              ilmoitetaan sivustolla. Suosittelemme tarkistamaan tämän sivun säännöllisesti.
            </p>
            <p className="text-sm text-gray-500">
              Tämä tietosuojaseloste on voimassa 1.4.2026 alkaen.
            </p>
          </SubSection>

        </div>
      </div>
    </>
  );
}
