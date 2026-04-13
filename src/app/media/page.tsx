import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Newspaper,
  BarChart3,
  Users,
  ShieldCheck,
  Building2,
  Download,
  Mail,
  ExternalLink,
  Calculator,
  BookOpen,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Media — Valitse Laina lehdistölle';
const pageDescription =
  'Valitse Lainan mediasivut: avainluvut, brändimateriaalit ja lehdistöyhteydenotot. Valitse Laina on Suomen kattava lainavertailupalvelu.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/media` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/media`,
    siteName: SITE_NAME,
  },
};

const keyStats = [
  {
    icon: Building2,
    value: '27+',
    label: 'Lainanantajaa',
    desc: 'Pankeista fintech-yhtiöihin',
  },
  {
    icon: BarChart3,
    value: '6',
    label: 'Lainatyyppiä',
    desc: 'Kulutusluotot, asuntolainat, autolainat, yhdistelylainat, yrityslainat, pikavipit',
  },
  {
    icon: Calculator,
    value: '6',
    label: 'Laskuria',
    desc: 'Ilmaiset taloustyökalut',
  },
  {
    icon: BookOpen,
    value: '8+',
    label: 'Opasta',
    desc: 'Kattavat lainaoppaat suomeksi',
  },
  {
    icon: ShieldCheck,
    value: '100%',
    label: 'Läpinäkyvä',
    desc: 'Kustannusperusteinen järjestys, ei poikkeuksia',
  },
  {
    icon: Users,
    value: 'Ilmainen',
    label: 'Kuluttajille',
    desc: 'Palvelu on ja tulee aina olemaan ilmainen',
  },
];

export default function MediaPage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-[#1a365d] text-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="flex items-center gap-3 mb-4">
            <Newspaper className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Medialle
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Lehdistö ja media
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl">
            Valitse Laina on suomalainen lainavertailupalvelu.
            Tältä sivulta löydät avainluvut, tietoa palvelusta ja mediayhteydenottokanavat.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* Key stats */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Avainluvut</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {keyStats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <stat.icon className="w-5 h-5 text-[#1a365d] mb-2" />
                <p className="text-2xl font-bold text-[#1a365d]">{stat.value}</p>
                <p className="font-semibold text-gray-900 text-sm">{stat.label}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* About for press */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Tietoa palvelusta</h2>
          <div className="text-gray-700 leading-relaxed space-y-4">
            <p>
              <strong>Valitse Laina</strong> on suomalainen lainavertailupalvelu,
              joka vertailee yli 27 lainanantajan tuotteita kattavasti. Palvelu kattaa
              kulutusluotot, asuntolainat, autolainat, yhdistelylainat, yrityslainat ja pikavipit.
            </p>
            <p>
              Valitse Lainan ydinperiaate on puolueettomuus: lainat järjestetään aina
              kokonaiskustannuksen mukaan, ja sama menetelmä koskee jokaista lainaa.
              Vertailutulokset kattavat laajasti suomalaisen lainamarkkinan toimijat.
            </p>
            <p>
              Palvelu on kuluttajille täysin ilmainen.
            </p>
          </div>
        </section>

        {/* Brand assets */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Brändimateriaali</h2>
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 space-y-4">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Brändivärit</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  { color: '#1a365d', name: 'Tummansininen (pääväri)' },
                  { color: '#d69e2e', name: 'Kulta (korostus)' },
                  { color: '#38a169', name: 'Vihreä (positiivinen)' },
                  { color: '#e53e3e', name: 'Punainen (varoitus)' },
                ].map((c) => (
                  <div key={c.color} className="flex items-center gap-2">
                    <div
                      className="w-8 h-8 rounded-lg border border-gray-200"
                      style={{ backgroundColor: c.color }}
                    />
                    <div>
                      <p className="text-xs font-medium text-gray-900">{c.name}</p>
                      <p className="text-xs text-gray-500">{c.color}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Nimi ja kirjoitusasu</h3>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>Oikea kirjoitusasu: <strong>Valitse Laina</strong> (kaksi sanaa, isot alkukirjaimet)</li>
                <li>Verkkosivusto: <strong>valitselaina.fi</strong></li>
                <li>Älä käytä: &quot;ValitseLaina&quot;, &quot;VALITSE LAINA&quot;, &quot;valitse-laina&quot;</li>
              </ul>
            </div>
            <p className="text-sm text-gray-600">
              Logot ja brändimateriaalit mediakäyttöön: pyydä{' '}
              <a href="/yhteystiedot" className="text-[#1a365d] underline font-medium">
                yhteydenottosivullamme
              </a>.
            </p>
          </div>
        </section>

        {/* Press contact */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Lehdistöyhteydenotot</h2>
          <div className="bg-[#1a365d] rounded-2xl p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-6 h-6 text-[#d69e2e]" />
              <h3 className="text-xl font-bold">Median yhteydenotot</h3>
            </div>
            <p className="text-blue-200 mb-6">
              Haastattelupyynnöt, tiedotusvälineiden kysymykset, tietopyynnöt
              ja kommenttipyynnöt lainamarkkinasta.
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-sm text-blue-300">Yhteydenotto</p>
                <a
                  href="/yhteystiedot"
                  className="text-white font-semibold hover:text-[#d69e2e] transition-colors"
                >
                  Ota yhteyttä
                </a>
              </div>
              <div>
                <p className="text-sm text-blue-300">Vasteaika</p>
                <p className="text-white font-semibold">Saman arkipäivän aikana</p>
              </div>
            </div>
          </div>
        </section>

        {/* Links */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Hyödyllisiä linkkejä</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { href: '/menetelma', label: 'Menetelmämme', desc: 'Miten keräämme tiedot ja miten vertailu toimii' },
              { href: '/tietoa', label: 'Tietoa meistä', desc: 'Keitä olemme ja miksi teemme tätä' },
              { href: '/vertailu', label: 'Vertailutyökalu', desc: 'Kokeile vertailutyökalua' },
              { href: '/yhteystiedot', label: 'Yhteystiedot', desc: 'Kaikki yhteydenottokanavat' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block bg-white rounded-xl p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1a365d]/20 transition-all group"
              >
                <p className="font-semibold text-gray-900 group-hover:text-[#1a365d] transition-colors">
                  {link.label}
                </p>
                <p className="text-sm text-gray-500">{link.desc}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
