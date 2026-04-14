'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Menu, X } from 'lucide-react';
import { UserMenu } from '@/components/auth/UserMenu';

const loanTypes = [
  { label: 'Kulutusluotto', href: '/kulutusluotto' },
  { label: 'Asuntolaina', href: '/asuntolaina' },
  { label: 'Autolaina', href: '/autolaina' },
  { label: 'Yhdistelylaina', href: '/yhdistelylaina' },
  { label: 'Yrityslaina', href: '/yrityslaina' },
  { label: 'Pikavippi', href: '/pikavippi' },
];

const mainNavLinks = [
  { label: 'Vertailu', href: '/vertailu' },
  { label: 'Lainanantajat', href: '/lainanantajat' },
  { label: 'Elämänmuutokset', href: '/elamanmuutokset' },
  { label: 'Oppaat', href: '/oppaat' },
  { label: 'Työkalut', href: '/tyokalut' },
  { label: 'Korkotutka', href: '/korkotutka' },
  { label: 'Artikkelit', href: '/blogi' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loanDropdownOpen, setLoanDropdownOpen] = useState(false);
  const [mobileLoanDropdownOpen, setMobileLoanDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoanDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <header
      className={`sticky top-0 z-50 w-full border-b transition-all duration-300 ${
        scrolled
          ? 'border-white/10 bg-navy/95 backdrop-blur-md shadow-lg shadow-navy-dark/20'
          : 'border-transparent bg-navy'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center hover:opacity-90 transition-opacity"
              aria-label="Valitse Laina — Etusivu"
            >
              <Image
                src="/logo.png"
                alt="Valitse Laina"
                width={590}
                height={192}
                priority
                className="h-14 w-auto"
              />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Päänavigaatio">
            <Link
              href="/vertailu"
              className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
            >
              Vertailu
            </Link>

            {/* Lainatyypit dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setLoanDropdownOpen(!loanDropdownOpen)}
                onMouseEnter={() => setLoanDropdownOpen(true)}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                aria-expanded={loanDropdownOpen}
                aria-haspopup="true"
              >
                Lainatyypit
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    loanDropdownOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {loanDropdownOpen && (
                <div
                  className="absolute left-0 top-full mt-1 w-52 rounded-xl border border-white/10 bg-navy-light/95 backdrop-blur-md py-1.5 shadow-xl"
                  onMouseLeave={() => setLoanDropdownOpen(false)}
                  role="menu"
                >
                  {loanTypes.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-300 hover:bg-white/10 hover:text-white transition-colors"
                      role="menuitem"
                      onClick={() => setLoanDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {mainNavLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* CTA + User Menu */}
            <div className="flex items-center gap-3 ml-3">
              <Link
                href="/vertailu"
                className="inline-flex items-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-accent/25 hover:bg-accent-600 hover:shadow-md transition-all min-h-[44px]"
              >
                Vertaa lainoja
              </Link>
              <UserMenu />
            </div>
          </nav>

          {/* Mobile controls */}
          <div className="lg:hidden flex items-center gap-2">
            <UserMenu />
            <button
              className="inline-flex items-center justify-center rounded-lg p-2 text-slate-300 hover:text-white hover:bg-white/10 transition-colors min-h-[44px] min-w-[44px]"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              aria-label={mobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          <nav
            className="relative bg-navy border-t border-white/10 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)]"
            aria-label="Mobiilinavigaatio"
          >
            <div className="px-4 py-4 space-y-1">
              <Link
                href="/vertailu"
                className="block rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vertailu
              </Link>

              {/* Lainatyypit accordion */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                  onClick={() => setMobileLoanDropdownOpen(!mobileLoanDropdownOpen)}
                  aria-expanded={mobileLoanDropdownOpen}
                >
                  Lainatyypit
                  <ChevronDown
                    className={`h-5 w-5 text-slate-400 transition-transform duration-200 ${
                      mobileLoanDropdownOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {mobileLoanDropdownOpen && (
                  <div className="ml-4 space-y-0.5 pb-1">
                    {loanTypes.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-2.5 text-sm text-slate-400 hover:bg-white/10 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {mainNavLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-slate-200 hover:bg-white/10 hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA */}
              <div className="pt-3 px-3">
                <Link
                  href="/vertailu"
                  className="flex w-full items-center justify-center rounded-xl bg-accent px-4 py-3 text-base font-semibold text-white shadow-sm shadow-accent/25 hover:bg-accent-600 transition-colors min-h-[44px]"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Vertaa lainoja
                </Link>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
