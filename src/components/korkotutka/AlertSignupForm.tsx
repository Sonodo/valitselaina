'use client';

import { useState } from 'react';
import { Bell, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

type LoanType = 'asuntolaina' | 'kulutusluotto';

export default function AlertSignupForm() {
  const [email, setEmail] = useState('');
  const [loanType, setLoanType] = useState<LoanType>('asuntolaina');
  const [currentRate, setCurrentRate] = useState('');
  const [loanAmount, setLoanAmount] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const res = await fetch('/api/korkotutka/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          loanType,
          currentRate: currentRate ? parseFloat(currentRate.replace(',', '.')) : null,
          loanAmount: loanAmount ? parseInt(loanAmount.replace(/\s/g, ''), 10) : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Jokin meni pieleen');
      }

      setStatus('success');
      setEmail('');
      setCurrentRate('');
      setLoanAmount('');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Tilaus epäonnistui. Yritä uudelleen.'
      );
    }
  };

  if (status === 'success') {
    return (
      <div className="rounded-2xl border border-green-200 bg-green-50 p-6 sm:p-8 text-center">
        <CheckCircle2 className="h-12 w-12 text-green-600 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          Tilaus vahvistettu!
        </h3>
        <p className="text-gray-600 max-w-md mx-auto">
          Saat ilmoituksen sähköpostiisi, kun korkotilanne muuttuu merkittävästi.
          Voit perua tilauksen milloin tahansa.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="mt-4 text-sm font-medium text-[#1a365d] hover:underline"
        >
          Tilaa toinen ilmoitus
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 shadow-sm"
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1a365d]">
          <Bell className="h-5 w-5 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900">
          Tilaa Korkotutka-ilmoitukset
        </h3>
      </div>
      <p className="text-gray-600 mb-6 ml-[52px]">
        Ilmoitamme kun Euribor-korot muuttuvat merkittävästi tai kun
        markkinatilanteessa tapahtuu jotain, joka voi vaikuttaa lainaasi.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label
            htmlFor="alert-email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Sähköposti *
          </label>
          <input
            id="alert-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="nimi@esimerkki.fi"
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
          />
        </div>
        <div>
          <label
            htmlFor="alert-loan-type"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Lainatyyppi *
          </label>
          <select
            id="alert-loan-type"
            value={loanType}
            onChange={(e) => setLoanType(e.target.value as LoanType)}
            className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
          >
            <option value="asuntolaina">Asuntolaina</option>
            <option value="kulutusluotto">Kulutusluotto</option>
          </select>
        </div>
        <div>
          <label
            htmlFor="alert-rate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Nykyinen kokonaiskorko
          </label>
          <div className="relative">
            <input
              id="alert-rate"
              type="text"
              value={currentRate}
              onChange={(e) => setCurrentRate(e.target.value)}
              placeholder="esim. 3,5"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              %
            </span>
          </div>
        </div>
        <div>
          <label
            htmlFor="alert-amount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Lainasumma
          </label>
          <div className="relative">
            <input
              id="alert-amount"
              type="text"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
              placeholder="esim. 200000"
              className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-gray-900 focus:border-[#1a365d] focus:ring-1 focus:ring-[#1a365d]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">
              EUR
            </span>
          </div>
        </div>
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-4 py-3 mb-4">
          <AlertTriangle className="h-4 w-4 text-red-600 shrink-0" />
          <p className="text-sm text-red-700">{errorMessage}</p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#1a365d] px-6 py-3 text-sm font-semibold text-white hover:bg-[#2a4a7f] disabled:opacity-60 disabled:cursor-not-allowed transition-colors min-h-[44px]"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Tilataan...
          </>
        ) : (
          <>
            <Bell className="h-4 w-4" />
            Tilaa ilmoitukset
          </>
        )}
      </button>

      <p className="mt-4 text-xs text-gray-400">
        Käytämme sähköpostiosoitettasi ainoastaan korkoilmoitusten lähettämiseen.
        Voit perua tilauksen milloin tahansa. Emme jaa tietojasi kolmansille
        osapuolille.
      </p>
    </form>
  );
}
