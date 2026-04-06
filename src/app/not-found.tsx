import type { Metadata } from 'next';
import Link from 'next/link';
import { Home, Search, BookOpen, Calculator, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Sivua ei löydy — 404',
  robots: { index: false, follow: false },
};

const quickLinks = [
  {
    icon: Search,
    label: 'Vertailu',
    href: '/vertailu',
    desc: 'Vertaa lainoja yli 28 lainanantajalta',
  },
  {
    icon: BookOpen,
    label: 'Oppaat',
    href: '/oppaat',
    desc: 'Opettele lainojen perusasiat',
  },
  {
    icon: Calculator,
    label: 'Lainanlaskuri',
    href: '/tyokalut/lainanlaskuri',
    desc: 'Laske kuukausierä ja kokonaiskustannus',
  },
];

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
      {/* 404 */}
      <p className="text-7xl sm:text-8xl font-bold text-[#1a365d]/10 mb-4">404</p>
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
        Sivua ei löytynyt
      </h1>
      <p className="text-gray-600 mb-10 max-w-md mx-auto">
        Etsimääsi sivua ei valitettavasti löytynyt. Se on saatettu poistaa tai siirtää.
        Kokeile jotakin alla olevista vaihtoehdoista.
      </p>

      {/* Quick links */}
      <div className="grid sm:grid-cols-3 gap-4 mb-10">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="flex flex-col items-center gap-2 rounded-xl bg-white p-5 border border-gray-100 shadow-sm hover:shadow-md hover:border-[#1a365d]/20 transition-all group"
          >
            <link.icon className="w-6 h-6 text-[#1a365d] group-hover:text-[#2a4a7f] transition-colors" />
            <p className="font-semibold text-gray-900 text-sm">{link.label}</p>
            <p className="text-xs text-gray-500">{link.desc}</p>
          </Link>
        ))}
      </div>

      {/* Back home */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 rounded-lg bg-[#1a365d] px-6 py-3 font-semibold text-white hover:bg-[#2a4a7f] transition-colors"
      >
        <Home className="w-4 h-4" />
        Takaisin etusivulle
      </Link>
    </div>
  );
}
