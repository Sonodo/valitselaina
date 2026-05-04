'use client';

import { Suspense } from 'react';
import ComparisonCalculator from '@/components/calculator/ComparisonCalculator';
import { ShieldCheck } from 'lucide-react';
import { SiteDisclosureBar } from '@/components/disclosure';

export default function VertailuPage() {
  return (
    <div className="min-h-screen bg-[#f7fafc]">
      <SiteDisclosureBar />
      {/* Hero section */}
      <section className="bg-gradient-to-b from-[#1a365d] to-[#2a4a7f] py-12 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
            Vertaa lainoja ja löydä edullisin
          </h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-4">
            Syötä lainan tiedot ja vertaa yli 27 lainanantajan tuotteita reaaliajassa.
            Näkyviin todellinen vuosikorko ja kokonaiskustannukset.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm text-white/90 border border-white/20">
            <ShieldCheck className="h-4 w-4 text-[#48bb78]" />
            Kattava vertailu — yli 27 lainanantajaa samassa vertailussa
          </div>
        </div>
      </section>

      {/* Calculator section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 -mt-8 pb-16">
        <Suspense fallback={<div className="h-96 animate-pulse rounded-xl bg-white/80" />}>
          <ComparisonCalculator />
        </Suspense>
      </section>

      {/* Info section below calculator */}
      <section className="bg-white border-t border-gray-100 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-gray-900 mb-6">
            Miten lainavertailu toimii?
          </h2>
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#1a365d]/10 text-[#1a365d] font-bold text-sm mb-3">
                1
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Syötä lainan tiedot
              </h3>
              <p className="text-sm text-gray-500">
                Valitse lainatyyppi, summa ja laina-aika. Laskuri käyttää todellista vuosikorkoa, joka sisältää kaikki kulut.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#1a365d]/10 text-[#1a365d] font-bold text-sm mb-3">
                2
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Vertaa tarjouksia
              </h3>
              <p className="text-sm text-gray-500">
                Näe lainanantajien kuukausierä, kokonaiskustannukset ja todellinen vuosikorko rinnakkain.
              </p>
            </div>
            <div>
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-[#1a365d]/10 text-[#1a365d] font-bold text-sm mb-3">
                3
              </div>
              <h3 className="text-sm font-semibold text-gray-900 mb-1">
                Hae lainaa
              </h3>
              <p className="text-sm text-gray-500">
                Valitse sopivin laina ja siirry suoraan lainanantajan sivuille. Hakemus on aina ilmainen eikä sido sinua mihinkään.
              </p>
            </div>
          </div>

          {/* SEO content */}
          <div className="mt-12 prose prose-sm max-w-none text-gray-600">
            <h3 className="text-lg font-semibold text-gray-900">
              Miksi vertailla lainoja?
            </h3>
            <p>
              Lainojen vertailu on tärkeää, koska eri lainanantajien korkojen ja kulujen välillä voi olla jopa tuhansia euroja eroa.
              Todellinen vuosikorko on luotettavin vertailuluku, sillä se sisältää kaikki lainaan liittyvät kulut — nimelliskoron, avausmaksun ja kuukausimaksut.
            </p>
            <p>
              Käytämme laskelmissa todellista vuosikorkoa, joka on kuluttajansuojalain mukainen tapa vertailla eri lainojen hintaa.
              Vertailussamme näkyy jokaisen lainan kokonaiskustannus, joten voit helposti valita edullisimman vaihtoehdon.
            </p>
            <h3 className="text-lg font-semibold text-gray-900">
              Onko vertailu luotettava?
            </h3>
            <p>
              Kyllä. Järjestys perustuu aina laskennalliseen edullisuuteen — kokonaiskustannus ratkaisee, ja sama menetelmä koskee jokaista lainaa.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
