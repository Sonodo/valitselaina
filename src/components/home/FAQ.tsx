'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Onko Lainavertailun käyttö ilmaista?',
    answer:
      'Kyllä, aina. Lainavertailun käyttö on täysin ilmaista eikä sido sinua mihinkään. Voit vertailla lainoja niin paljon kuin haluat ilman kustannuksia.',
  },
  {
    question: 'Miten Lainavertailu ansaitsee rahaa?',
    answer:
      'Ansaitsemme affiliate-linkkien kautta: kun klikkaat tietyille lainanantajille johtavia linkkejä ja haet lainaa, saatamme saada korvauksen. Jokainen affiliate-linkki on selkeästi merkitty. Tämä ei vaikuta siihen, mitä lainoja näytämme tai miten ne järjestetään.',
  },
  {
    question: 'Vaikuttaako vertailu luottotietoihini?',
    answer:
      'Ei. Lainojen vertailu Lainavertailussa ei vaikuta luottotietoihisi millään tavalla. Luottotietoja tarkistetaan vasta, kun haet lainaa suoraan lainanantajalta.',
  },
  {
    question: 'Miksi näytätte myös lainoja, joista ette saa komissiota?',
    answer:
      'Koska rehellinen vertailu vaatii sitä. Jos näyttäisimme vain maksavien kumppanien lainat, vertailu ei olisi puolueeton. Tavoitteemme on auttaa sinua löytämään oikeasti edullisin laina — riippumatta siitä, ansaitsemmeko siitä vai emme.',
  },
  {
    question: 'Miten todellinen vuosikorko lasketaan?',
    answer:
      'Todellinen vuosikorko (TAV) on EU-lainsäädännön mukainen mittari, joka sisältää nimelliskoron lisäksi kaikki lainan pakolliset kulut: avausmaksun, kuukausimaksut ja muut käsittelykulut. Se ilmaistaan vuositasolla prosentteina, joten voit vertailla eri lainoja suoraan keskenään. Mitä alhaisempi todellinen vuosikorko, sitä edullisempi laina.',
  },
  {
    question: 'Onko Lainavertailu lainanantaja?',
    answer:
      'Ei. Lainavertailu on puolueeton vertailupalvelu, emme lainanantaja. Emme myönnä lainoja, emmekä tee luottopäätöksiä. Ohjaamme sinut suoraan lainanantajan sivuille, jossa varsinainen lainahakemus tehdään.',
  },
  {
    question: 'Kuinka usein tiedot päivitetään?',
    answer:
      'Päivitämme lainatiedot säännöllisesti. Korot, ehdot ja tuotetiedot tarkistetaan vähintään kuukausittain. Jokaisen tuotteen kohdalla näkyy viimeisin päivityspäivämäärä, jotta tiedät tietojen ajantasaisuuden.',
  },
];

// Generate JSON-LD FAQPage schema
function generateFAQSchema(items: FAQItem[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const schema = generateFAQSchema(FAQ_ITEMS);

  return (
    <section className="py-16 sm:py-20 bg-[#f7fafc]">
      {/* JSON-LD FAQPage schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight">
            Usein kysytyt kysymykset
          </h2>
          <p className="mt-3 text-gray-600">
            Vastauksia yleisimpiin kysymyksiin lainavertailusta
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow hover:shadow-sm"
              >
                <button
                  onClick={() => toggle(index)}
                  className="flex w-full items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  <span className="text-sm sm:text-base font-semibold text-gray-900 pr-4">
                    {item.question}
                  </span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-gray-500 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {/* Expandable answer */}
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  className={`overflow-hidden transition-all duration-200 ${
                    isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                  }`}
                  aria-hidden={!isOpen}
                >
                  <p className="px-5 sm:px-6 text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
