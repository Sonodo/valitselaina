import type { Metadata } from 'next';
import {
  Mail,
  Clock,
  MessageCircle,
  Newspaper,
  AlertTriangle,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';
import { SITE_URL, SITE_NAME } from '@/lib/constants';

const pageTitle = 'Yhteystiedot — Ota yhteyttä Valitse Lainaan';
const pageDescription =
  'Ota yhteyttä Valitse Lainaan. Yleinen palaute, median yhteydenotot, virheiden raportointi — löydä oikea kanava.';

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: { canonical: `${SITE_URL}/yhteystiedot` },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE_URL}/yhteystiedot`,
    siteName: SITE_NAME,
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  name: 'Yhteystiedot',
  description: pageDescription,
  mainEntity: {
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
    email: 'info@valitse.fi',
    contactPoint: [
      {
        '@type': 'ContactPoint',
        contactType: 'customer service',
        email: 'info@valitse.fi',
        availableLanguage: 'Finnish',
      },
      {
        '@type': 'ContactPoint',
        contactType: 'media',
        email: 'media@valitse.fi',
        availableLanguage: 'Finnish',
      },
    ],
  },
};

const channels = [
  {
    icon: MessageCircle,
    title: 'Yleinen palaute ja kysymykset',
    email: 'info@valitse.fi',
    desc: 'Palaute palvelusta, yleisiä kysymyksiä, yhteistyöehdotukset.',
    color: 'bg-blue-50 border-blue-100',
    iconColor: 'text-[#1a365d]',
  },
  {
    icon: Newspaper,
    title: 'Median yhteydenotot',
    email: 'media@valitse.fi',
    desc: 'Haastattelupyynnöt, tiedotusvälineiden kysymykset, tietopyynnöt.',
    color: 'bg-purple-50 border-purple-100',
    iconColor: 'text-purple-700',
  },
  {
    icon: AlertTriangle,
    title: 'Virheiden raportointi',
    email: 'korjaukset@valitse.fi',
    desc: 'Ilmoita väärästä lainatiedosta, vanhentuneesta korosta tai muusta virheestä.',
    color: 'bg-amber-50 border-amber-100',
    iconColor: 'text-amber-700',
  },
];

const faqs = [
  {
    q: 'Kuinka nopeasti vastatte?',
    a: 'Pyrimme vastaamaan kaikkiin viesteihin 1–2 arkipäivän kuluessa. Kiireelliset virheilmoitukset käsitellään ensisijaisesti.',
  },
  {
    q: 'Voiko Valitse Lainaan ilmoittaa oman lainatuotteen?',
    a: 'Kyllä! Jos edustat lainanantajaa ja haluaisit tuotteesi mukaan vertailuun, ota yhteyttä osoitteeseen info@valitse.fi. Sisällytämme kaikki luotettavat suomalaiset lainanantajat.',
  },
  {
    q: 'Tarjoaako Valitse Laina taloudellista neuvontaa?',
    a: 'Ei. Olemme vertailupalvelu, emme rahoitusneuvojia. Jos tarvitset henkilökohtaista taloudellista neuvontaa, suosittelemme kääntymään pankkisi tai riippumattoman talousasiantuntijan puoleen.',
  },
  {
    q: 'Miten voin pyytää tietojeni poistamista?',
    a: 'Emme kerää henkilökohtaisia taloustietoja. Jos haluat tietää, mitä evästetietoja keräämme, lue tietosuojaselosteemme. Tietojenpoistoyynnöt osoitteeseen info@valitse.fi.',
  },
];

export default function YhteystiedotPage() {
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
            <Mail className="w-7 h-7 text-[#d69e2e]" />
            <span className="text-sm font-semibold text-[#d69e2e] uppercase tracking-wide">
              Yhteystiedot
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Ota meihin yhteyttä
          </h1>
          <p className="text-lg text-blue-200 max-w-2xl">
            Kuulemme mielellämme palautettasi, kysymyksiäsi ja ehdotuksiasi.
            Valitse sopiva kanava alla.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">

        {/* Contact channels */}
        <section>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Yhteydenottokanavat</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {channels.map((ch) => (
              <div
                key={ch.email}
                className={`rounded-xl p-6 border ${ch.color}`}
              >
                <ch.icon className={`w-6 h-6 ${ch.iconColor} mb-3`} />
                <h3 className="font-semibold text-gray-900 mb-1">{ch.title}</h3>
                <p className="text-sm text-gray-600 mb-4">{ch.desc}</p>
                <a
                  href={`mailto:${ch.email}`}
                  className="text-sm font-semibold text-[#1a365d] hover:text-[#2a4a7f] underline underline-offset-2 transition-colors"
                >
                  {ch.email}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* Response time */}
        <section className="bg-green-50 rounded-xl p-6 border border-green-100">
          <div className="flex items-center gap-3 mb-3">
            <Clock className="w-6 h-6 text-green-700" />
            <h2 className="text-xl font-bold text-gray-900">Vasteaikalupaus</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Virheilmoitukset</p>
                <p className="text-gray-600">1–3 arkipäivää</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Yleinen palaute</p>
                <p className="text-gray-600">1–2 arkipäivää</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900">Median yhteydenotot</p>
                <p className="text-gray-600">Saman arkipäivän aikana</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <HelpCircle className="w-6 h-6 text-[#1a365d]" />
            <h2 className="text-2xl font-bold text-gray-900">Usein kysyttyä</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="bg-white rounded-xl p-5 border border-gray-100 shadow-sm">
                <h3 className="font-semibold text-gray-900 mb-2">{faq.q}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
