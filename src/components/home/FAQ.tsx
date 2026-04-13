'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Onko Valitse Lainan käyttö ilmaista?',
    answer:
      'Kyllä. Valitse Lainan käyttö on täysin ilmaista — ei maksuja, ei rekisteröitymistä, ei sitoumusta.',
  },
  {
    question: 'Miten vertailu toimii?',
    answer:
      'Vertailun järjestys perustuu objektiivisiin kriteereihin: todelliseen vuosikorkoon, kokonaiskustannukseen ja ajantasaiseen dataan. Sama menetelmä koskee jokaista lainaa. Lue lisää sivulta /menetelma.',
  },
  {
    question: 'Oletteko puolueettomia?',
    answer:
      'Kyllä. Vertailun järjestys perustuu aina hintaan ja ominaisuuksiin, ja sama menetelmä koskee jokaista lainaa.',
  },
  {
    question: 'Vaikuttaako vertailu luottotietoihini?',
    answer:
      'Ei. Lainojen vertailu Valitse Lainassa ei vaikuta luottotietoihisi millään tavalla. Luottotietoja tarkistetaan vasta, kun haet lainaa suoraan lainanantajalta.',
  },
  {
    question: 'Miten todellinen vuosikorko lasketaan?',
    answer:
      'Todellinen vuosikorko (TAV) on EU-lainsäädännön mukainen mittari, joka sisältää nimelliskoron lisäksi kaikki lainan pakolliset kulut: avausmaksun, kuukausimaksut ja muut käsittelykulut. Se ilmaistaan vuositasolla prosentteina.',
  },
  {
    question: 'Onko Valitse Laina lainanantaja?',
    answer:
      'Ei. Valitse Laina on vertailupalvelu, emme lainanantaja. Emme myönnä lainoja, emmekä tee luottopäätöksiä. Ohjaamme sinut suoraan lainanantajan sivuille.',
  },
  {
    question: 'Päivitetäänkö tiedot säännöllisesti?',
    answer:
      'Kyllä. Keräämme ja tarkistamme lainatiedot säännöllisesti, jotta näet aina ajantasaisen kuvan markkinasta. Jokaisen tuotteen kohdalla näkyy viimeisin päivityspäivämäärä.',
  },
];

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
    <section className="py-16 sm:py-20 bg-background">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center mb-10">
            <h2 className="section-title">Usein kysytyt kysymykset</h2>
            <p className="section-subtitle mx-auto">
              Vastauksia yleisimpiin kysymyksiin lainavertailusta
            </p>
          </div>
        </ScrollReveal>

        <div className="space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;

            return (
              <ScrollReveal key={index} delay={index * 50}>
                <div className="rounded-2xl bg-white ring-1 ring-slate-200/60 shadow-sm overflow-hidden transition-shadow hover:shadow-md">
                  <button
                    onClick={() => toggle(index)}
                    className="flex w-full items-center justify-between px-5 py-4 sm:px-6 sm:py-5 text-left min-h-[44px]"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <span className="text-sm sm:text-base font-semibold text-slate-900 pr-4">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    className={`overflow-hidden transition-all duration-200 ${
                      isOpen ? 'max-h-96 pb-5' : 'max-h-0'
                    }`}
                    aria-hidden={!isOpen}
                  >
                    <p className="px-5 sm:px-6 text-sm sm:text-base text-slate-600 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
