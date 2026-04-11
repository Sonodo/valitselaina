import Link from 'next/link';
import { Landmark } from 'lucide-react';

const palvelut = [
  { label: 'Vertailu', href: '/vertailu' },
  { label: 'Lainanantajat', href: '/lainanantajat' },
  { label: 'Elämänmuutokset', href: '/elamanmuutokset' },
  { label: 'Työkalut', href: '/tyokalut' },
  { label: 'Oppaat', href: '/oppaat' },
  { label: 'Artikkelit', href: '/blogi' },
];

const lainatyypit = [
  { label: 'Kulutusluotto', href: '/kulutusluotto' },
  { label: 'Asuntolaina', href: '/asuntolaina' },
  { label: 'Autolaina', href: '/autolaina' },
  { label: 'Yhdistelylaina', href: '/yhdistelylaina' },
  { label: 'Remonttilaina', href: '/remonttilaina' },
  { label: 'Yrityslaina', href: '/yrityslaina' },
  { label: 'Pikavippi', href: '/pikavippi' },
];

const tietoa = [
  { label: 'Tietoa palvelusta', href: '/tietoa' },
  { label: 'Menetelmä', href: '/menetelma' },
  { label: 'Media', href: '/media' },
  { label: 'Yhteystiedot', href: '/yhteystiedot' },
];

const verkosto = [
  { label: 'valitse.fi', href: 'https://valitse.fi', desc: 'Vertaa ja valitse' },
  { label: 'valitsesahko.fi', href: 'https://valitsesahko.fi', desc: 'Sähkövertailu' },
  { label: 'valitsevakuutus.fi', href: 'https://valitsevakuutus.fi', desc: 'Vakuutusvertailu' },
  { label: 'valitseliittyma.fi', href: 'https://valitseliittyma.fi', desc: 'Liittymävertailu' },
];

const legalLinks = [
  { label: 'Tietosuoja', href: '/tietosuoja' },
  { label: 'Käyttöehdot', href: '/kayttoehdot' },
  { label: 'Evästeet', href: '/evasteet' },
];

export default function Footer() {
  return (
    <footer className="bg-navy text-white" role="contentinfo">
      {/* Main footer */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2.5 hover:opacity-90 transition-opacity"
              aria-label="Valitse Laina — Etusivu"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent-400 to-accent">
                <Landmark className="h-4.5 w-4.5 text-white" strokeWidth={2} />
              </div>
              <span className="text-lg font-bold tracking-tight">
                <span className="text-white">Valitse</span>
                <span className="text-accent-400 ml-1">Laina</span>
              </span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-slate-400">
              Vertaa lainoja helposti yhdestä paikasta. Kattava vertailu, joka
              näyttää kaikki lainat.
            </p>
          </div>

          {/* Palvelut */}
          <FooterLinkSection title="Palvelut" links={palvelut} />

          {/* Lainatyypit */}
          <FooterLinkSection title="Lainatyypit" links={lainatyypit} />

          {/* Tietoa */}
          <FooterLinkSection title="Tietoa" links={tietoa} />

          {/* Valitse-verkosto */}
          <div>
            <h3 className="text-sm font-semibold text-white tracking-wide">
              Valitse-verkosto
            </h3>
            <div className="mt-3 flex flex-wrap gap-2">
              {verkosto.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-300 hover:bg-white/20 hover:text-white transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-slate-500">
              &copy; {new Date().getFullYear()} Valitse Laina
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-500 hover:text-slate-300 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkSection({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-white tracking-wide">{title}</h3>
      <ul className="mt-3 space-y-2.5" role="list">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-sm text-slate-400 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
