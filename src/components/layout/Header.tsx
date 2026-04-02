'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { ShieldCheck, ChevronDown, Menu, X } from 'lucide-react';

// Navigation link definitions
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
  { label: 'Oppaat', href: '/oppaat' },
  { label: 'Työkalut', href: '/tyokalut' },
  { label: 'Blogi', href: '/blogi' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loanDropdownOpen, setLoanDropdownOpen] = useState(false);
  const [mobileLoanDropdownOpen, setMobileLoanDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Track scroll for header shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setLoanDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Prevent body scroll when mobile menu is open
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
      className={`sticky top-0 z-50 w-full border-b transition-all duration-200 ${
        scrolled
          ? 'border-gray-200 bg-white/95 backdrop-blur-md shadow-sm'
          : 'border-transparent bg-white'
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + Trust Badge */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-[#1a365d] hover:opacity-90 transition-opacity"
              aria-label="Lainavertailu — Etusivu"
            >
              <ShieldCheck className="h-7 w-7 text-[#1a365d]" strokeWidth={2.2} />
              <span className="text-xl font-bold tracking-tight">
                Lainavertailu
              </span>
            </Link>
            {/* Trust badge — desktop only */}
            <span className="hidden lg:inline-flex items-center gap-1 rounded-full bg-[#f0fdf4] px-2.5 py-0.5 text-xs font-medium text-[#38a169] border border-[#38a169]/20">
              <ShieldCheck className="h-3 w-3" />
              Puolueeton vertailu
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Päänavigaatio">
            {/* Vertailu link */}
            <Link
              href="/vertailu"
              className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#1a365d] transition-colors"
            >
              Vertailu
            </Link>

            {/* Lainatyypit dropdown */}
            <div ref={dropdownRef} className="relative">
              <button
                onClick={() => setLoanDropdownOpen(!loanDropdownOpen)}
                onMouseEnter={() => setLoanDropdownOpen(true)}
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#1a365d] transition-colors"
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
                  className="absolute left-0 top-full mt-1 w-52 rounded-lg border border-gray-100 bg-white py-1.5 shadow-lg ring-1 ring-black/5"
                  onMouseLeave={() => setLoanDropdownOpen(false)}
                  role="menu"
                >
                  {loanTypes.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-[#f7fafc] hover:text-[#1a365d] transition-colors"
                      role="menuitem"
                      onClick={() => setLoanDropdownOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Remaining nav links */}
            {mainNavLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-[#1a365d] transition-colors"
              >
                {link.label}
              </Link>
            ))}

            {/* CTA Button */}
            <Link
              href="/vertailu"
              className="ml-3 inline-flex items-center rounded-lg bg-[#1a365d] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1a365d]"
            >
              Vertaa lainoja
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-gray-100 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Sulje valikko' : 'Avaa valikko'}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-16 z-40">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer */}
          <nav
            className="relative bg-white border-t border-gray-100 shadow-xl overflow-y-auto max-h-[calc(100vh-4rem)]"
            aria-label="Mobiilinavigaatio"
          >
            <div className="px-4 py-4 space-y-1">
              {/* Trust badge — mobile */}
              <div className="flex items-center gap-1.5 px-3 py-2 mb-2">
                <ShieldCheck className="h-4 w-4 text-[#38a169]" />
                <span className="text-xs font-medium text-[#38a169]">
                  Puolueeton vertailu
                </span>
              </div>

              {/* Vertailu */}
              <Link
                href="/vertailu"
                className="block rounded-lg px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Vertailu
              </Link>

              {/* Lainatyypit accordion */}
              <div>
                <button
                  className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileLoanDropdownOpen(!mobileLoanDropdownOpen)}
                  aria-expanded={mobileLoanDropdownOpen}
                >
                  Lainatyypit
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transition-transform duration-200 ${
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
                        className="block rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50 hover:text-[#1a365d] transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Other nav links */}
              {mainNavLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-gray-800 hover:bg-gray-50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}

              {/* CTA */}
              <div className="pt-3 px-3">
                <Link
                  href="/vertailu"
                  className="flex w-full items-center justify-center rounded-lg bg-[#1a365d] px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-[#2a4a7f] transition-colors"
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
