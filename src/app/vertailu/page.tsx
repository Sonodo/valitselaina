import { Suspense } from 'react';
import ResultsExplorer from '@/components/calculator/ResultsExplorer';
import { ShieldCheck } from 'lucide-react';

export default function VertailuPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc]">
      {/* Compact header */}
      <section className="bg-gradient-to-b from-[#1a365d] to-[#2a4a7f] py-8 sm:py-10">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-white">
            Lainavertailu
          </h1>
          <p className="mt-2 text-sm sm:text-base text-white/80 max-w-2xl mx-auto">
            Muokkaa hakuehtoja yltä — tulokset päivittyvät heti. Todellinen vuosikorko aina näkyvillä.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs sm:text-sm text-white/90 border border-white/20">
            <ShieldCheck className="h-4 w-4 text-[#48bb78]" />
            Puolueeton vertailu — sama menetelmä jokaiselle lainalle
          </div>
        </div>
      </section>

      {/* Results explorer */}
      <section className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <Suspense fallback={<div className="h-[600px] animate-pulse rounded-xl bg-white/80" />}>
          <ResultsExplorer />
        </Suspense>
      </section>

      {/* SEO / explainer */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 prose prose-sm max-w-none text-gray-600">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Miten lainavertailu toimii?</h2>
          <p>
            Vertailumme näyttää heti ensinäkymässä todelliseen vuosikorkoon perustuvat lainaehdotukset.
            Oletuksena näytämme 10&nbsp;000&nbsp;€ kulutusluoton 5 vuoden maksuajalla, mutta voit muokata
            summaa, laina-aikaa ja lainatyyppiä yläpalkista — lista päivittyy heti.
          </p>
          <p>
            Todellinen vuosikorko on luotettavin vertailuluku: se sisältää korot, avausmaksun ja
            kuukausimaksut. Järjestys perustuu aina samaan menetelmään, eikä komissio vaikuta järjestykseen.
          </p>
          <h3 className="text-lg font-semibold text-gray-900 mt-6">Onko vertailu luotettava?</h3>
          <p>
            Kyllä. Järjestämme lainat valitsemasi kriteerin mukaan (oletuksena alin vuosikorko).
            Näytämme sekä yhteistyökumppanien että muiden lainanantajien tuotteet samoilla perusteilla.
          </p>
        </div>
      </section>
    </div>
  );
}
