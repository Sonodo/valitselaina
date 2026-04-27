import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Eye,
  Users,
  Heart,
  Target,
  Mail,
  Scale,
  Lightbulb,
  Ban,
  CheckCircle2,
  GraduationCap,
  ListChecks,
  Building2,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Tietoa Valitse Lainasta — Toimitus ja periaatteet';
const pageDescription =
  'Valitse Laina on Sonodon (Y-tunnus 2887416-4) ylläpitämä lainavertailupalvelu. Vastaava päätoimittaja Henri Linnainmaa, KTM. Lue toimituksen periaatteet ja vertailumetodologia.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/tietoa` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/tietoa`,
    siteName: SITE_NAME,
  },
};

// ─── Schema.org structured data ────────────────────────────────────────────
const ORG_ID = `${SITE_URL}#organization`;
const HENRI_ID = `${SITE_URL}#henri-linnainmaa`;

const aboutPageJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Tietoa Valitse Lainasta',
  description: pageDescription,
  url: `${SITE_URL}/tietoa`,
  inLanguage: 'fi',
  mainEntity: { '@id': ORG_ID },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': ORG_ID,
  name: SITE_NAME,
  legalName: 'Sonodo',
  url: SITE_URL,
  taxID: '2887416-4',
  vatID: 'FI28874164',
  description: pageDescription,
  founder: { '@id': HENRI_ID },
  publishingPrinciples: `${SITE_URL}/tietoa#toimituksen-periaatteet`,
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Helsinki',
    addressCountry: 'FI',
  },
  knowsAbout: [
    'Lainavertailu',
    'Kulutusluotto',
    'Asuntolaina',
    'Yrityslaina',
    'Todellinen vuosikorko',
    'Euribor',
  ],
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': HENRI_ID,
  name: 'Henri Linnainmaa',
  jobTitle: 'Vastaava päätoimittaja',
  honorificSuffix: 'KTM',
  worksFor: { '@id': ORG_ID },
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'Aalto-yliopisto',
    sameAs: 'https://www.aalto.fi/',
  },
  knowsAbout: [
    'Lainavertailu',
    'Tekoäly liiketoiminnassa',
    'Data-analytiikka',
    'Automaatiojärjestelmät',
  ],
  url: `${SITE_URL}/tietoa#vastaava-paatoimittaja`,
};

const values = [
  {
    icon: Eye,
    title: 'Puolueeton menetelmä',
    desc: 'Vertailun järjestys perustuu aina todelliseen vuosikorkoon ja kokonaiskustannukseen. Sama menetelmä koskee jokaista lainaa.',
  },
  {
    icon: Users,
    title: 'Kuluttaja ensin',
    desc: 'Jokainen päätös tehdään kuluttajan edun näkökulmasta. Lainat järjestetään aina kokonaiskustannuksen mukaan.',
  },
  {
    icon: Ban,
    title: 'Ei dark patterneita',
    desc: 'Ei väärennettyjä kelloja, keinotekoista kiirettä tai harhaanjohtavaa suunnittelua. Tarjoamme tietoa, emme painostusta.',
  },
  {
    icon: Scale,
    title: 'Riippumattomuus',
    desc: 'Emme suosi mitään yksittäistä lainanantajaa. Objektiiviset kriteerit ratkaisevat järjestyksen.',
  },
  {
    icon: Lightbulb,
    title: 'Koulutus',
    desc: 'Haluamme, että suomalaiset ymmärtävät lainatuotteet paremmin. Oppaamme ja työkalumme ovat ilmaisia ja kaikille avoimia.',
  },
  {
    icon: ShieldCheck,
    title: 'Ajantasaisuus',
    desc: 'Tietomme tarkistetaan säännöllisesti. Jokaisen tuotteen kohdalla näkyy viimeisin päivitysajankohta.',
  },
];

export default function TietoaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationJsonLd),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      {/* Hero */}
      <div className="bg-[#1a365d] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <Heart className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Tietoa meistä
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Rehellinen lainavertailu — se on meidän juttumme
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl">
            Valitse Laina on suomalainen palvelu, joka auttaa sinua löytämään
            edullisimman lainan vertaamalla yli 27 lainanantajan tuotteita kattavasti.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* Mission */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">Tehtävämme</h2>
          </div>
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
            <p className="text-lg text-gray-800 leading-relaxed">
              Tehtävämme on tehdä lainojen vertailusta <strong>rehellistä ja
              ymmärrettävää</strong>. Autamme suomalaisia löytämään sopivimman lainan,
              ja järjestämme tulokset aina kokonaiskustannuksen mukaan — objektiivisilla
              kriteereillä, sama menetelmä jokaiselle lainalle.
            </p>
          </div>
        </section>

        {/* Who we are */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">Keitä olemme</h2>
          </div>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Valitse Laina on suomalainen vertailupalvelu. Emme ole pankki,
              rahoituslaitos tai lainanvälittäjä — olemme tietopalvelu, joka auttaa
              kuluttajia tekemään parempia päätöksiä.
            </p>
            <p>
              Palvelumme kattaa yli 27 suomalaista lainanantajaa: perinteisistä pankeista
              fintech-yhtiöihin ja vertaislaina-alustoihin. Vertailemme kulutusluottoja,
              asuntolainoja, autolainoja, yhdistelylainoja, yrityslainoja ja pikavippejä.
            </p>
            <p>
              Palvelumme on ja tulee aina olemaan täysin ilmainen kuluttajille.
            </p>
          </div>
        </section>

        {/* Values */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">Arvomme</h2>
          </div>
          <div className="grid sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1a365d]/10 flex items-center justify-center">
                  <v.icon className="w-5 h-5 text-[#1a365d]" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">{v.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* How we work */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <CheckCircle2 className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">Näin toimimme</h2>
          </div>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              Keräämme lainanantajien tiedot suoraan heidän virallisista lähteistään
              ja tarkistamme ne säännöllisesti. Vertailualgoritmimme järjestää lainat
              aina kokonaiskustannuksen mukaan — sama menetelmä koskee jokaista lainaa.
            </p>
            <p>
              Palvelumme on käyttäjälle täysin ilmainen.
            </p>
            <Link
              href="/menetelma"
              className="inline-flex items-center gap-2 text-[#1a365d] font-semibold hover:text-[#2a4a7f] transition-colors"
            >
              Lue lisää menetelmästämme →
            </Link>
          </div>
        </section>

        {/* ─── Vastaava päätoimittaja ─────────────────────────────────── */}
        <section
          id="vastaava-paatoimittaja"
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Vastaava päätoimittaja
            </h2>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
            <div className="mb-3">
              <h3 className="text-xl font-semibold text-gray-900">
                Henri Linnainmaa
              </h3>
              <p className="text-sm text-[#1a365d] font-medium mt-0.5">
                KTM, Aalto-yliopisto · Vastaava päätoimittaja
              </p>
            </div>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Henri Linnainmaa on kauppatieteiden maisteri Aalto-yliopistosta.
                Hän on urallaan konsultoinut yrityksiä tekoälyn soveltamisessa
                liiketoimintaan ja rakentanut kymmeniä tekoälytyökaluja ja
                automaatioratkaisuja muun muassa raportointiin, analytiikkaan ja
                markkinointiin liittyen.
              </p>
              <p>
                Valitse Lainalla Henri vastaa vertailumetodologiasta ja
                lainadatan käsittelystä — siitä, että jokainen lainanantaja
                arvioidaan samoilla kriteereillä ja että hinta- ja
                ehtotiedot pidetään ajan tasalla. Henrin lähestymistapa
                yhdistää huolellisen järjestelmäsuunnittelun ja
                data-analyyttisen työtavan: vertailun tuloksia seurataan
                mittareiden avulla, poikkeamat tunnistetaan datasta ja
                kehityspäätökset perustuvat todennettuihin havaintoihin.
              </p>
              <p>
                Toimitus ei kirjoita lainahakemuksiin liittyviä
                henkilökohtaisia neuvoja. Sisältömme on yleistä
                kuluttajavalistusta, joka pohjautuu Finanssivalvonnan ja
                Suomen Pankin julkaisemiin tietoihin sekä lainanantajien
                virallisiin lähteisiin.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Toimituksen periaatteet ───────────────────────────────── */}
        <section
          id="toimituksen-periaatteet"
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <ListChecks className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Toimituksen periaatteet
            </h2>
          </div>

          <div className="space-y-6 text-gray-700 leading-relaxed">
            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                1. Vertailujärjestys
              </h3>
              <p>
                Lainanantajat järjestetään aina samalla menetelmällä:
                ensisijaisesti todellisen vuosikoron ja kokonaiskustannuksen
                mukaan, käyttäjän valitsemalle lainasummalle ja maksuajalle.
                Kaupallinen yhteistyö tai mahdollinen affiliate-suhde ei
                vaikuta järjestykseen. Tutustu tarkemmin{' '}
                <Link
                  href="/menetelma"
                  className="text-[#1a365d] font-semibold hover:underline"
                >
                  vertailumenetelmään
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                2. Kaupallinen läpinäkyvyys
              </h3>
              <p>
                Sivusto sisältää kaupallisia kumppanuuksia, joista voimme
                saada palkkion, kun käyttäjä hakee lainaa lainanantajan
                sivulta. Käytämme kaupallisten linkkien kohdalla{' '}
                <code className="rounded bg-gray-100 px-1 py-0.5 text-xs font-mono">
                  rel=&quot;sponsored&quot;
                </code>{' '}
                -merkintää ja sivustotason läpinäkyvyysilmoitusta. Lue lisää
                kohdasta{' '}
                <Link
                  href="/sivuston-ansainta"
                  className="text-[#1a365d] font-semibold hover:underline"
                >
                  Sivuston ansainta
                </Link>
                .
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                3. Tiedon päivitysrytmi
              </h3>
              <p>
                Lainanantajien hinnasto- ja ehtotiedot tarkistetaan
                säännöllisesti. Jokaisen tuotteen yhteydessä näkyy päiväys,
                jolloin tiedot on viimeksi päivitetty. Euribor-viitekorot
                päivitetään{' '}
                <a
                  href="https://www.suomenpankki.fi/fi/tilastot/korot/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1a365d] font-semibold hover:underline"
                >
                  Suomen Pankin tilastoista
                </a>
                .
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                4. Sääntely
              </h3>
              <p>
                Suomalaisia kuluttajaluottoja valvoo Finanssivalvonta
                (FIN-FSA). Kulutusluottojen korkokatto on lain mukaan 20 %
                ja peruutusoikeus 14 päivää. Emme itse myönnä lainoja emmekä
                toimi luotonvälittäjinä — olemme tietopalvelu, joka kerää ja
                vertailee lainanantajien julkisesti ilmoittamia ehtoja.
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900 mb-1">
                5. Virheet ja palaute
              </h3>
              <p>
                Jos havaitset väärän tai vanhentuneen tiedon, ilmoita siitä{' '}
                <Link
                  href="/yhteystiedot"
                  className="text-[#1a365d] font-semibold hover:underline"
                >
                  yhteydenottokanavan
                </Link>{' '}
                kautta. Käsittelemme virheilmoitukset ensisijaisina ja
                korjaamme ne mahdollisimman pian.
              </p>
            </div>
          </div>
        </section>

        {/* ─── Sonodo / Yhteystiedot ─────────────────────────────────── */}
        <section
          id="yhteystiedot-yritys"
          className="scroll-mt-24"
        >
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">
              Palvelun ylläpitäjä
            </h2>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 text-gray-700 leading-relaxed">
            <p className="mb-2">
              <strong>Sonodo</strong> (toiminimi)
            </p>
            <p className="text-sm text-gray-600">
              Y-tunnus: 2887416-4
              <br />
              Helsinki, Suomi
              <br />
              Verkkosivusto: {SITE_URL.replace(/^https?:\/\//, '')}
            </p>
            <p className="mt-4 text-sm text-gray-600">
              Yhteydenotot palvelun{' '}
              <Link
                href="/yhteystiedot"
                className="text-[#1a365d] font-semibold hover:underline"
              >
                yhteystietosivun
              </Link>{' '}
              kautta.
            </p>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-10 text-center border border-gray-100">
          <Mail className="w-8 h-8 text-[#1a365d] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ota yhteyttä</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Onko sinulla kysyttävää tai palautetta? Kuulemme mielellämme sinusta.
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
