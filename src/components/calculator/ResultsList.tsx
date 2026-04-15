'use client';

import { ComparisonResult } from '@/types';
import ResultCard from './ResultCard';
import ComparisonSummary from './ComparisonSummary';
import DisclosureBanner from '@/components/layout/DisclosureBanner';

interface ResultsListProps {
  results: ComparisonResult[];
  loanAmount: number;
  termMonths: number;
  loanType: string;
  onBack: () => void;
  onReset: () => void;
}

export default function ResultsList({
  results,
  loanAmount,
  termMonths,
  loanType,
  onBack,
  onReset,
}: ResultsListProps) {
  return (
    <div className="space-y-6">
      {/* Header + navigation */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Vertailutulokset</h2>
          <p className="mt-1 text-sm text-gray-500">
            Järjestetty kokonaiskustannusten mukaan. Kaikkien lainanantajien tiedot päivitetty 04/2026.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
            Muokkaa hakua
          </button>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182" />
            </svg>
            Aloita alusta
          </button>
        </div>
      </div>

      {/* Summary cards */}
      {results.length > 0 && (
        <ComparisonSummary
          results={results}
          loanAmount={loanAmount}
          termMonths={termMonths}
          loanType={loanType}
        />
      )}

      {/* Results */}
      {results.length === 0 ? (
        <div className="text-center py-16">
          <div className="mx-auto h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
            <svg className="h-8 w-8 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Ei tuloksia
          </h3>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Annetuilla suodattimilla ei löydetty sopivia lainoja. Kokeile väljentää hakuehtoja tai muuttaa lainasummaa.
          </p>
          <button
            type="button"
            onClick={onBack}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-2.5 text-sm font-semibold text-white hover:bg-[#2a4a7f] transition-colors"
          >
            Muokkaa hakua
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <DisclosureBanner />
          {results.map((result, index) => (
            <ResultCard
              key={result.product.id}
              result={result}
              rank={index + 1}
              loanAmount={loanAmount}
              termMonths={termMonths}
            />
          ))}
        </div>
      )}

      {/* Footer disclaimer */}
      {results.length > 0 && (
        <div className="rounded-lg bg-gray-50 border border-gray-100 px-4 py-3 text-xs text-gray-500 leading-relaxed">
          <strong>Huomautus:</strong> Näytettävät korot ovat &quot;alkaen&quot;-korkoja eli lainanantajan edullisimpia ilmoitettuja korkoja.
          Todellinen korkosi voi olla korkeampi luottokelpoisuutesi perusteella. Vertailu on suuntaa-antava — pyydäthän
          aina virallinen lainatarjous suoraan lainanantajalta. Tiedot päivitetty viimeksi huhtikuussa 2026.
        </div>
      )}
    </div>
  );
}
