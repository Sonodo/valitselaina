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
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Tietoa Lainavertailusta — Keitä olemme';
const pageDescription =
  'Lainavertailu on riippumaton suomalainen lainavertailupalvelu. Tehtävämme on tehdä lainojen vertailusta rehellistä ja läpinäkyvää.';

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

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: 'Tietoa Lainavertailusta',
  description: pageDescription,
  mainEntity: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    description: pageDescription,
  },
};

const values = [
  {
    icon: Eye,
    title: 'Läpinäkyvyys',
    desc: 'Kerromme avoimesti, miten ansaitsemme, miten vertailumme toimii ja mitä tietoja keräämme. Ei piiloagendaa.',
  },
  {
    icon: Users,
    title: 'Kuluttaja ensin',
    desc: 'Jokainen päätös tehdään kuluttajan edun näkökulmasta. Lainat järjestetään kokonaiskustannuksen mukaan — emme nosta maksavia kumppaneita.',
  },
  {
    icon: Ban,
    title: 'Ei dark patterneita',
    desc: 'Ei väärennettyjä kelloja, keinotekoista kiirettä tai harhaanjohtavaa suunnittelua. Tarjoamme tietoa, emme painostusta.',
  },
  {
    icon: Scale,
    title: 'Puolueettomuus',
    desc: 'Näytämme kaikki lainat — myös ne, joista emme saa komissiota. Affiliate-status ei vaikuta järjestykseen.',
  },
  {
    icon: Lightbulb,
    title: 'Koulutus',
    desc: 'Haluamme, että suomalaiset ymmärtävät lainatuotteet paremmin. Oppaamme ja työkalumme ovat ilmaisia ja kaikille avoimia.',
  },
  {
    icon: ShieldCheck,
    title: 'Luotettavuus',
    desc: 'Tietomme tarkistetaan säännöllisesti. Jokaisen tuotteen kohdalla näkyy viimeisin päivitysajankohta.',
  },
];

export default function TietoaPage() {
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
            <Heart className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Tietoa meistä
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Rehellinen lainavertailu — se on meidän juttumme
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl">
            Lainavertailu on riippumaton suomalainen palvelu, joka auttaa sinua löytämään
            edullisimman lainan vertaamalla yli 28 lainanantajan tuotteita puolueettomasti.
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
              Tehtävämme on tehdä lainojen vertailusta <strong>rehellistä, läpinäkyvää
              ja ymmärrettävää</strong>. Suomalaiset ansaitsevat vertailupalvelun, joka
              todella asettaa kuluttajan edun etusijalle — ei sellaisen, joka piilottaa
              kalliita tuotteita tai nostaa maksavia kumppaneita ylemmäs.
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
              Lainavertailu on suomalainen, riippumaton vertailupalvelu. Emme ole pankki,
              rahoituslaitos tai lainanvälittäjä — olemme tietopalvelu, joka auttaa
              kuluttajia tekemään parempia päätöksiä.
            </p>
            <p>
              Palvelumme kattaa yli 28 suomalaista lainanantajaa: perinteisistä pankeista
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
              aina kokonaiskustannuksen mukaan — affiliate-status ei koskaan vaikuta
              järjestykseen.
            </p>
            <p>
              Ansaitsemme tuloja affiliate-linkkien kautta: kun klikkaat lainanantajan
              linkkiä ja haet lainaa, saatamme saada korvauksen. Kaikki affiliate-linkit
              merkitään selkeästi.
            </p>
            <Link
              href="/menetelma"
              className="inline-flex items-center gap-2 text-[#1a365d] font-semibold hover:text-[#2a4a7f] transition-colors"
            >
              Lue lisää menetelmästämme →
            </Link>
          </div>
        </section>

        {/* Contact CTA */}
        <div className="bg-gray-50 rounded-2xl p-8 sm:p-10 text-center border border-gray-100">
          <Mail className="w-8 h-8 text-[#1a365d] mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-3">Ota yhteyttä</h2>
          <p className="text-gray-600 mb-6 max-w-lg mx-auto">
            Onko sinulla kysyttävää, palautetta tai yhteistyöehdotus?
            Kuulemme mielellämme sinusta.
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
