import { Eye, Percent, Tag, ShieldCheck } from 'lucide-react';

const TRUST_CARDS = [
  {
    icon: Eye,
    title: 'Näytämme kaikki lainat',
    description:
      'Useimmat vertailusivut näyttävät vain maksavien kumppanien lainat. Me näytämme kaikki — myös ne, joista emme saa komissiota. Näin löydät oikeasti edullisimman vaihtoehdon.',
    highlight: 'Myös ei-kumppanien lainat',
  },
  {
    icon: Percent,
    title: 'Todellinen vuosikorko aina',
    description:
      'Nimelliskorko ei kerro koko totuutta. Me näytämme aina todellisen vuosikoron, joka sisältää kaikki lainan kulut. Näin vertaat hintoja oikeudenmukaisesti.',
    highlight: 'Ei harhaanjohtavia korkoja',
  },
  {
    icon: Tag,
    title: 'Affiliate-linkit merkitty',
    description:
      'Jokainen affiliate-linkki on selkeästi merkitty. Kerromme avoimesti, miten ansaitsemme rahaa. Läpinäkyvyys on meille itsestäänselvyys, ei lisäominaisuus.',
    highlight: 'Täysi läpinäkyvyys',
  },
  {
    icon: ShieldCheck,
    title: 'Ei piilotettua agendaa',
    description:
      'Ei tekaistuja ennakkopäätöksiä, ei kiirehtimistemppuja, ei manipuloivaa suunnittelua. Annamme sinun tehdä päätöksen rauhassa ja oikean tiedon pohjalta.',
    highlight: 'Ei dark patterneita',
  },
];

export default function WhyTrustUs() {
  return (
    <section className="py-16 sm:py-20 bg-[#f7fafc]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Miksi Valitse Laina on erilainen?
          </h2>
          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Rakennettu rehellisyydelle — emme kilpaile temppujen vaan
            luotettavuuden avulla
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {TRUST_CARDS.map((card) => (
            <div
              key={card.title}
              className="rounded-xl border border-gray-200 bg-white p-6 sm:p-8 hover:shadow-md transition-shadow"
            >
              {/* Icon + badge row */}
              <div className="flex items-start gap-4 mb-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#1a365d]/5">
                  <card.icon
                    className="h-6 w-6 text-[#1a365d]"
                    strokeWidth={1.8}
                  />
                </div>
                <span className="inline-flex items-center rounded-full bg-[#f0fdf4] px-3 py-1 text-xs font-medium text-[#38a169] border border-[#38a169]/20">
                  {card.highlight}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
