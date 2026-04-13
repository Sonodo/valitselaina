import type { Metadata } from 'next';
import { FileText, AlertTriangle } from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Käyttöehdot — Valitse Laina';
const pageDescription =
  'Valitse Lainan käyttöehdot. Palvelun käyttöä koskevat ehdot, vastuunrajoitukset ja immateriaalioikeudet.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/kayttoehdot` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/kayttoehdot`,
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

export default function KayttoehdotPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1a365d] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Käyttöehdot
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Käyttöehdot
          </h1>
          <p className="text-lg text-blue-200">
            Viimeksi päivitetty: 1.4.2026
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Important disclaimers */}
        <div className="bg-amber-50 rounded-xl p-6 border border-amber-200 mb-10 space-y-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-amber-700 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-gray-900 mb-1">Tärkeät huomautukset</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li><strong>Valitse Laina on vertailupalvelu, ei lainanantaja.</strong> Emme myönnä lainoja, emme käsittele lainahakemuksia emmekä tee luottopäätöksiä.</li>
                <li><strong>Emme anna taloudellista neuvontaa.</strong> Sivustollamme oleva tieto on tarkoitettu yleiseksi tiedoksi, ei henkilökohtaiseksi taloudelliseksi neuvonnaksi.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="prose-like space-y-2">

          <SectionTitle id="soveltaminen">1. Ehtojen soveltaminen</SectionTitle>
          <SubSection>
            <p>
              Nämä käyttöehdot koskevat Valitse Laina -palvelun (valitselaina.fi) käyttöä.
              Käyttämällä palvelua hyväksyt nämä ehdot. Jos et hyväksy ehtoja,
              älä käytä palvelua.
            </p>
            <p>
              Pidätämme oikeuden muuttaa näitä ehtoja milloin tahansa. Muutokset tulevat
              voimaan, kun ne julkaistaan tällä sivulla. Jatkamalla palvelun käyttöä
              muutosten jälkeen hyväksyt päivitetyt ehdot.
            </p>
          </SubSection>

          <SectionTitle id="palvelun-kuvaus">2. Palvelun kuvaus</SectionTitle>
          <SubSection>
            <p>
              Valitse Laina on ilmainen verkkopalvelu, joka tarjoaa lainatuotteiden
              vertailutietoja Suomessa toimivista lainanantajista. Palvelu sisältää:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Lainatuotteiden vertailun (korot, kulut, ehdot)</li>
              <li>Lainanantajien tietosivut</li>
              <li>Lainanlaskureita ja työkaluja</li>
              <li>Oppaita ja blogiartikkeleita aiheeseen liittyen</li>
            </ul>
          </SubSection>

          <SectionTitle id="ei-talousneuvontaa">3. Ei taloudellista neuvontaa</SectionTitle>
          <SubSection>
            <p>
              Sivustolla julkaistu sisältö, mukaan lukien lainavertailut, laskurit,
              oppaat ja blogiartikkelit, <strong>ei ole taloudellista neuvontaa</strong>.
              Sisältö on tarkoitettu ainoastaan yleiseksi tiedoksi ja vertailun tueksi.
            </p>
            <p>
              Suosittelemme vahvasti, että konsultoit pätevää talousasiantuntijaa,
              pankkia tai muuta rahoitusalan ammattilaista ennen merkittäviä
              taloudellisia päätöksiä.
            </p>
          </SubSection>

          <SectionTitle id="tietojen-tarkkuus">4. Tietojen tarkkuus</SectionTitle>
          <SubSection>
            <p>
              Pyrimme pitämään sivustolla esitetyt tiedot (korot, kulut, ehdot)
              mahdollisimman ajantasaisina ja tarkkoina. Tiedot kerätään lainanantajien
              julkisista lähteistä ja tarkistetaan säännöllisesti.
            </p>
            <p>
              Emme kuitenkaan voi taata, että kaikki tiedot ovat joka hetki
              virheettömiä tai ajan tasalla. Lainanantajat voivat muuttaa ehtojaan
              milloin tahansa. <strong>Tarkista aina lopulliset ehdot suoraan
              lainanantajalta ennen lainan hakemista.</strong>
            </p>
          </SubSection>

          <SectionTitle id="palvelun-maksuttomuus">5. Palvelun maksuttomuus</SectionTitle>
          <SubSection>
            <p>
              Valitse Laina on käyttäjälle maksuton. Palvelu voi saada korvauksen
              palveluntarjoajilta osana normaalia liiketoimintaa.
            </p>
          </SubSection>

          <SectionTitle id="vastuunrajoitus">6. Vastuunrajoitus</SectionTitle>
          <SubSection>
            <p>
              Valitse Laina tarjotaan &quot;sellaisenaan&quot; ilman minkäänlaisia takuita.
              Emme vastaa:
            </p>
            <ul className="list-disc list-inside space-y-1">
              <li>Sivustolla esitettyjen tietojen virheistä tai puutteista</li>
              <li>Palvelun keskeytyksistä tai häiriöistä</li>
              <li>Käyttäjän tekemistä taloudellisista päätöksistä tai niiden seurauksista</li>
              <li>Kolmansien osapuolten (lainanantajien) palveluista, tuotteista tai toiminnasta</li>
              <li>Linkitettyjen sivustojen sisällöstä</li>
            </ul>
            <p>
              Vastuumme on kaikissa tapauksissa rajoitettu Suomen lain sallimaan
              laajuuteen.
            </p>
          </SubSection>

          <SectionTitle id="immateriaalioikeudet">7. Immateriaalioikeudet</SectionTitle>
          <SubSection>
            <p>
              Sivuston sisältö, mukaan lukien tekstit, grafiikat, logot, kuvat ja
              ohjelmistokoodi, on tekijänoikeudella suojattua. Sisältöä ei saa kopioida,
              muokata tai julkaista uudelleen ilman kirjallista lupaa.
            </p>
            <p>
              Lainatuotteiden tiedot (korot, ehdot) ovat peräisin lainanantajilta
              ja kuuluvat kyseisille lainanantajille.
            </p>
          </SubSection>

          <SectionTitle id="kayttajan-velvollisuudet">8. Käyttäjän velvollisuudet</SectionTitle>
          <SubSection>
            <p>Käyttäjä sitoutuu:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Käyttämään palvelua vain laillisiin tarkoituksiin</li>
              <li>Olemaan häiritsemättä palvelun toimintaa</li>
              <li>Olemaan yrittämättä kiertää palvelun teknisiä suojaustoimenpiteitä</li>
              <li>Olemaan käyttämättä automaattisia tiedonkeruutyökaluja ilman lupaa</li>
            </ul>
          </SubSection>

          <SectionTitle id="kolmannet-sivustot">9. Kolmansien osapuolten sivustot</SectionTitle>
          <SubSection>
            <p>
              Palvelu sisältää linkkejä kolmansien osapuolten (lainanantajien ja muiden)
              verkkosivustoille. Emme vastaa näiden sivustojen sisällöstä, tietosuojakäytännöistä
              tai palveluista. Suosittelemme tutustumaan kunkin sivuston omiin ehtoihin.
            </p>
          </SubSection>

          <SectionTitle id="sovellettava-laki">10. Sovellettava laki ja riidanratkaisu</SectionTitle>
          <SubSection>
            <p>
              Näihin käyttöehtoihin sovelletaan Suomen lakia. Mahdolliset riidat
              ratkaistaan ensisijaisesti neuvottelemalla. Jos sopuun ei päästä,
              riidat ratkaistaan Helsingin käräjäoikeudessa.
            </p>
            <p>
              Kuluttajalla on myös oikeus saattaa riita kuluttajariitalautakunnan
              käsiteltäväksi:
            </p>
            <p className="text-sm bg-gray-50 rounded-lg p-4 border border-gray-100">
              <strong>Kuluttajariitalautakunta</strong><br />
              Hämeentie 3, 00530 Helsinki<br />
              Verkkosivusto: kuluttajariita.fi
            </p>
          </SubSection>

          <SectionTitle id="yhteydenotot">11. Yhteydenotot</SectionTitle>
          <SubSection>
            <p>
              Käyttöehtoja koskevat kysymykset voi lähettää{' '}
              <a href="/yhteystiedot" className="text-[#1a365d] underline font-medium">
                yhteydenottosivullamme
              </a>.
            </p>
          </SubSection>

        </div>
      </div>
    </>
  );
}
