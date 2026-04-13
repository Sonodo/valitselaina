import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Database,
  BarChart3,
  Ban,
  RefreshCcw,
  AlertTriangle,
  Mail,
  CheckCircle2,
  Scale,
  Clock,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Menetelmämme — Näin Valitse Laina toimii';
const pageDescription =
  'Valitse Lainan menetelmä: miten keräämme lainatiedot, miten vertailualgoritmi järjestää lainat todellisen vuosikoron mukaan ja millä kriteereillä tulokset päivittyvät.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/menetelma` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/menetelma`,
    siteName: SITE_NAME,
  },
};

// Structured data — Article about methodology
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'Näin Valitse Laina toimii — Menetelmämme',
  description: pageDescription,
  publisher: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  },
  mainEntityOfPage: `${SITE_URL}/menetelma`,
};

interface SectionProps {
  icon: React.ElementType;
  title: string;
  children: React.ReactNode;
  id?: string;
}

function Section({ icon: Icon, title, children, id }: SectionProps) {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[#1a365d]/10 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#1a365d]" />
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="ml-14 text-gray-700 leading-relaxed space-y-4">{children}</div>
    </section>
  );
}

export default function MenetelmaPage() {
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
            <ShieldCheck className="w-8 h-8 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Läpinäkyvyys
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Näin Valitse Laina toimii
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl">
            Tällä sivulla kerromme tarkalleen, miten keräämme lainatiedot,
            millä kriteereillä vertailumme järjestää lainat ja mitä emme
            koskaan tee.
          </p>
        </div>
      </div>

      {/* Table of contents */}
      <div className="bg-white border-b">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-4">
          <nav aria-label="Sisällysluettelo">
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {[
                { href: '#tiedonkeruu', label: 'Tiedonkeruu' },
                { href: '#algoritmi', label: 'Algoritmi' },
                { href: '#mita-emme-tee', label: 'Mitä emme tee' },
                { href: '#paivitystahti', label: 'Päivitystahti' },
                { href: '#virheet', label: 'Virheiden raportointi' },
              ].map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="text-[#1a365d] hover:text-[#2a4a7f] font-medium transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        <Section icon={Database} title="Miten keräämme ja päivitämme lainatiedot" id="tiedonkeruu">
          <p>
            Lainanantajien tiedot kerätään suoraan pankkien ja rahoituslaitosten julkisista
            lähteistä: verkkosivuilta, hinnastoista ja virallisista tuote-esitteistä.
            Tarkistamme tiedot manuaalisesti ja automaattisilla tarkistuksilla.
          </p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Korot ja kulut kerätään suoraan lainanantajien virallisista lähteistä</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Jokaisen lainatuotteen tiedot tarkistetaan ennen julkaisua</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Päivitysajankohta näytetään jokaisen tuotteen kohdalla</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>Kattavuus: 27+ lainanantajaa, pankeista fintech-yhtiöihin</span>
            </li>
          </ul>
        </Section>

        <Section icon={BarChart3} title="Miten vertailualgoritmi toimii" id="algoritmi">
          <p>
            Vertailumme ydin on yksinkertainen ja reilu: <strong>lainat järjestetään aina
            kokonaiskustannuksen mukaan, edullisin ensin</strong>.
          </p>
          <div className="bg-blue-50 rounded-xl p-5 border border-blue-100">
            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
              <Scale className="w-5 h-5 text-[#1a365d]" />
              Järjestysperiaate
            </h3>
            <ol className="list-decimal list-inside space-y-1 text-sm">
              <li>Lasketaan lainan <strong>kokonaiskustannus</strong> (korot + kulut + maksut koko laina-ajalta)</li>
              <li>Lainat järjestetään kokonaiskustannuksen mukaan — edullisin ensin</li>
              <li>Samankustanteiset lainat järjestetään todellisen vuosikoron (TAV) mukaan</li>
              <li>Käyttäjän suodattimet (lainasumma, laina-aika, lainatyyppi) sovelletaan ensin</li>
            </ol>
          </div>
          <p>
            Algoritmimme on deterministinen: samoilla syötteillä saat aina saman tuloksen.
          </p>
        </Section>

        <Section icon={Ban} title="Mitä emme tee" id="mita-emme-tee">
          <div className="space-y-3">
            {[
              {
                title: 'Emme myy tietojasi',
                desc: 'Emme kerää, tallenna tai myy henkilökohtaisia taloustietojasi. Emme tiedä tulojasi, velkojasi tai luottotietojasi.',
              },
              {
                title: 'Emme nosta tiettyjä lainoja tuloksissa',
                desc: 'Sama menetelmä koskee jokaista lainaa. Kokonaiskustannus ratkaisee järjestyksen — aina.',
              },
              {
                title: 'Emme piilota epäedullisia tietoja',
                desc: 'Jos lainassa on korkea korko tai piilokuluja, kerromme siitä selkeästi. Emme kaunistele tuotteita.',
              },
              {
                title: 'Emme anna taloudellista neuvontaa',
                desc: 'Olemme vertailupalvelu, emme rahoitusneuvojia. Tarjoamme tietoa päätöksenteon tueksi, mutta suosittelemme keskustelemaan ammattilaisen kanssa suurista lainapäätöksistä.',
              },
              {
                title: 'Emme käytä dark pattern -suunnittelua',
                desc: 'Ei painostavia countdown-ajastimia, ei valheellisia "vain X jäljellä" -merkintöjä, ei harhaanjohtavaa UX-suunnittelua.',
              },
            ].map((item) => (
              <div key={item.title} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mt-0.5">
                  <Ban className="w-3.5 h-3.5 text-red-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section icon={RefreshCcw} title="Tietojen päivitystahti" id="paivitystahti">
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              {
                icon: Clock,
                label: 'Korot ja kulut',
                freq: 'Säännöllisesti',
                desc: 'Pyrimme pitämään korko- ja kulutiedot ajantasaisina',
              },
              {
                icon: Database,
                label: 'Tuotetiedot',
                freq: 'Säännöllisesti',
                desc: 'Lainaehdot, rajat ja ominaisuudet',
              },
              {
                icon: RefreshCcw,
                label: 'Uudet lainanantajat',
                freq: 'Jatkuvasti',
                desc: 'Lisäämme uudet toimijat markkinoilta',
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-gray-50 rounded-xl p-4 border border-gray-100"
              >
                <item.icon className="w-5 h-5 text-[#1a365d] mb-2" />
                <p className="font-semibold text-gray-900 text-sm">{item.label}</p>
                <p className="text-[#1a365d] font-bold">{item.freq}</p>
                <p className="text-xs text-gray-500 mt-1">{item.desc}</p>
              </div>
            ))}
          </div>
          <p>
            Jokaisen lainatuotteen kohdalla näkyy &quot;Päivitetty viimeksi&quot; -päivämäärä,
            jotta voit arvioida tietojen tuoreuden.
          </p>
        </Section>

        <Section icon={AlertTriangle} title="Virheen raportointi" id="virheet">
          <p>
            Pyrimme pitämään tietomme ajan tasalla, mutta virheitä voi sattua. Jos huomaat
            väärän tiedon, ilmoitathan siitä meille — korjaamme asian mahdollisimman nopeasti.
          </p>
          <div className="bg-gray-50 rounded-xl p-5 border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <Mail className="w-5 h-5 text-[#1a365d]" />
              Ilmoita virheestä
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/yhteystiedot" className="text-[#1a365d] underline">
                  Ilmoita virheestä yhteydenottosivullamme
                </a>
              </li>
              <li>
                <strong>Kerro viestissä:</strong> mikä tieto on väärin, mikä on oikea tieto
                ja mistä lähteestä oikea tieto löytyy
              </li>
              <li>
                <strong>Käsittelyaika:</strong> tarkistamme ja korjaamme ilmoitetut virheet
                1–3 arkipäivän kuluessa
              </li>
            </ul>
          </div>
        </Section>

        {/* CTA */}
        <div className="bg-[#1a365d] rounded-2xl p-8 sm:p-10 text-center text-white">
          <h2 className="text-2xl font-bold mb-3">Onko sinulla kysyttävää?</h2>
          <p className="text-blue-200 mb-6 max-w-lg mx-auto">
            Jos haluat tietää lisää menetelmistämme tai sinulla on palautetta,
            ota meihin yhteyttä.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/yhteystiedot"
              className="inline-flex items-center gap-2 rounded-lg bg-[#d69e2e] px-6 py-3 font-semibold text-white hover:bg-[#b7791f] transition-colors"
            >
              <Mail className="w-4 h-4" />
              Yhteystiedot
            </Link>
            <Link
              href="/vertailu"
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 font-semibold text-white hover:bg-white/20 transition-colors"
            >
              Kokeile vertailua
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
