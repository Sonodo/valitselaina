'use client';

export type SortOption = 'cheapest' | 'lowest-monthly' | 'fastest';
export type ProviderFilter = 'all' | 'bank' | 'fintech';

interface PreferencesStepProps {
  sortBy: SortOption;
  providerFilter: ProviderFilter;
  maxRate: number;
  noSetupFeeOnly: boolean;
  noMonthlyFeeOnly: boolean;
  onSortChange: (sort: SortOption) => void;
  onProviderFilterChange: (filter: ProviderFilter) => void;
  onMaxRateChange: (rate: number) => void;
  onNoSetupFeeToggle: (val: boolean) => void;
  onNoMonthlyFeeToggle: (val: boolean) => void;
  onBack: () => void;
  onSubmit: () => void;
}

const SORT_OPTIONS: { value: SortOption; label: string; description: string }[] = [
  {
    value: 'cheapest',
    label: 'Edullisin ensin',
    description: 'Järjestetään kokonaiskustannusten mukaan',
  },
  {
    value: 'lowest-monthly',
    label: 'Pienin kuukausierä',
    description: 'Pienimmat kuukausimaksut ensin',
  },
  {
    value: 'fastest',
    label: 'Nopein käsittely',
    description: 'Nopeimman käsittelyajan mukaan',
  },
];

const PROVIDER_FILTERS: { value: ProviderFilter; label: string }[] = [
  { value: 'all', label: 'Kaikki' },
  { value: 'bank', label: 'Pankit' },
  { value: 'fintech', label: 'Fintech' },
];

export default function PreferencesStep({
  sortBy,
  providerFilter,
  maxRate,
  noSetupFeeOnly,
  noMonthlyFeeOnly,
  onSortChange,
  onProviderFilterChange,
  onMaxRateChange,
  onNoSetupFeeToggle,
  onNoMonthlyFeeToggle,
  onBack,
  onSubmit,
}: PreferencesStepProps) {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-gray-900">
          Asetukset ja suodattimet
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Valitse miten haluat lajitella ja suodattaa tulokset.
        </p>
      </div>

      {/* Sort preference */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Järjestys
        </label>
        <div className="space-y-2">
          {SORT_OPTIONS.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-start gap-3 rounded-lg border-2 p-4 cursor-pointer transition-all ${
                sortBy === opt.value
                  ? 'border-[#1a365d] bg-[#1a365d]/5'
                  : 'border-gray-200 bg-white hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="sortBy"
                value={opt.value}
                checked={sortBy === opt.value}
                onChange={() => onSortChange(opt.value)}
                className="mt-0.5 h-4 w-4 accent-[#1a365d]"
              />
              <div>
                <div className="text-sm font-semibold text-gray-900">
                  {opt.label}
                </div>
                <div className="text-xs text-gray-500">{opt.description}</div>
              </div>
            </label>
          ))}
        </div>
      </div>

      {/* Provider type filter */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-3">
          Lainanantajan tyyppi
        </label>
        <div className="flex gap-2">
          {PROVIDER_FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              onClick={() => onProviderFilterChange(f.value)}
              className={`rounded-lg border-2 px-5 py-2.5 text-sm font-medium transition-all ${
                providerFilter === f.value
                  ? 'border-[#1a365d] bg-[#1a365d]/5 text-[#1a365d]'
                  : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Max effective rate */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Todellinen vuosikorko enintään:{' '}
          <span className="text-[#1a365d]">
            {maxRate >= 20 ? 'Ei rajaa' : `${maxRate.toFixed(1).replace('.', ',')} %`}
          </span>
        </label>
        <input
          type="range"
          min={2}
          max={20}
          step={0.5}
          value={maxRate}
          onChange={(e) => onMaxRateChange(Number(e.target.value))}
          className="w-full max-w-md h-2 rounded-full appearance-none bg-gray-200 accent-[#1a365d] cursor-pointer"
        />
        <div className="mt-1 flex justify-between text-xs text-gray-400 max-w-md">
          <span>2 %</span>
          <span>Ei rajaa</span>
        </div>
      </div>

      {/* Fee toggles */}
      <div className="space-y-4">
        <label className="block text-sm font-semibold text-gray-700">
          Kulusuodattimet
        </label>

        {/* No setup fee */}
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={noSetupFeeOnly}
            onClick={() => onNoSetupFeeToggle(!noSetupFeeOnly)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
              noSetupFeeOnly ? 'bg-[#1a365d]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                noSetupFeeOnly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-gray-700">
            Vain ilman avausmaksua
          </span>
        </label>

        {/* No monthly fee */}
        <label className="flex items-center gap-3 cursor-pointer">
          <button
            type="button"
            role="switch"
            aria-checked={noMonthlyFeeOnly}
            onClick={() => onNoMonthlyFeeToggle(!noMonthlyFeeOnly)}
            className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
              noMonthlyFeeOnly ? 'bg-[#1a365d]' : 'bg-gray-300'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${
                noMonthlyFeeOnly ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
          <span className="text-sm text-gray-700">
            Vain ilman kuukausimaksua
          </span>
        </label>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-2">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Takaisin
        </button>
        <button
          type="button"
          onClick={onSubmit}
          className="inline-flex items-center gap-2 rounded-lg bg-[#38a169] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#2f855a] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#38a169]"
        >
          Näytä tulokset
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
