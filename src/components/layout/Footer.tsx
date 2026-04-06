import Link from 'next/link';
import { ShieldCheck, Scale, Users } from 'lucide-react';

// Footer link sections
const palvelut = [
  { label: 'Lainavertailu', href: '/vertailu' },
  { label: 'Kulutusluotto', href: '/kulutusluotto' },
  { label: 'Asuntolaina', href: '/asuntolaina' },
  { label: 'Autolaina', href: '/autolaina' },
  { label: 'Lainanantajat', href: '/lainanantajat' },
];

const oppaat = [
  { label: 'Lainaamisen perusteet', href: '/oppaat/lainaamisen-perusteet' },
  { label: 'Todellinen vuosikorko', href: '/oppaat/todellinen-vuosikorko' },
  { label: 'Lainan kilpailutus', href: '/oppaat/lainan-kilpailutus' },
  { label: 'Velkojen yhdistely', href: '/oppaat/velkojen-yhdistely' },
  { label: 'Blogi', href: '/blogi' },
];

const tyokalut = [
  { label: 'Lainanlaskuri', href: '/tyokalut/lainanlaskuri' },
  { label: 'Maksukykylaskuri', href: '/tyokalut/maksukyky' },
  { label: 'Asuntolainanlaskuri', href: '/tyokalut/asuntolainanlaskuri' },
  { label: 'Kaikki työkalut', href: '/tyokalut' },
];

const tietoa = [
  { label: 'Tietoa palvelusta', href: '/tietoa' },
  { label: 'Menetelmä', href: '/menetelma' },
  { label: 'Media', href: '/media' },
  { label: 'Yhteystiedot', href: '/yhteystiedot' },
];

const legalLinks = [
  { label: 'Tietosuoja', href: '/tietosuoja' },
  { label: 'Käyttöehdot', href: '/kayttoehdot' },
  { label: 'Evästeet', href: '/evasteet' },
];

// Trust badges displayed in the brand column
const trustBadges = [
  { icon: ShieldCheck, label: 'Puolueeton' },
  { icon: Users, label: '28+ lainanantajaa' },
  { icon: Scale, label: 'Ilmainen' },
];

export default function Footer() {
  return (
    <footer className="bg-[#1a365d] text-white" role="contentinfo">
      {/* Main footer content */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-5 lg:gap-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 mb-4 lg:mb-0">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
              aria-label="Lainavertailu — Etusivu"
            >
              <ShieldCheck className="h-6 w-6" strokeWidth={2.2} />
              <span className="text-lg font-bold tracking-tight">Lainavertailu</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed text-blue-200/80">
              Suomen luotettavin lainavertailu. Vertaamme lainoja puolueettomasti
              ja näytämme myös ne lainat, joista emme saa komissiota.
            </p>
            {/* Trust badges */}
            <div className="mt-4 flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <span
                  key={badge.label}
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-medium text-blue-100"
                >
                  <badge.icon className="h-3 w-3" />
                  {badge.label}
                </span>
              ))}
            </div>
          </div>

          {/* Palvelut */}
          <FooterLinkSection title="Palvelut" links={palvelut} />

          {/* Oppaat */}
          <FooterLinkSection title="Oppaat" links={oppaat} />

          {/* Työkalut */}
          <FooterLinkSection title="Työkalut" links={tyokalut} />

          {/* Tietoa */}
          <FooterLinkSection title="Tietoa" links={tietoa} />
        </div>

        {/* Valitse-verkosto */}
        <div className="mt-12 pt-8 border-t border-slate-700">
          <div className="mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Osa Valitse-verkostoa</p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {[
              { name: 'Energiavertailu', url: 'https://energiavertailu.vercel.app', desc: 'Sähkön hintavertailu' },
              { name: 'Vakuutusvertailu', url: 'https://vakuutusvertailu.vercel.app', desc: 'Vakuutusten vertailu' },
              { name: 'Puhelinvertailu', url: 'https://puhelinvertailu.vercel.app', desc: 'Liittymien vertailu' },
              { name: 'Asuntomaatti', url: 'https://asuntomaatti.fi', desc: 'Asuntojen vertailu' },
              { name: 'Alennuskartta', url: 'https://alennuskartta.fi', desc: 'Tarjoukset kartalla' },
              { name: 'Valitse', url: 'https://valitse.fi', desc: 'Kaikki vertailupalvelut' },
            ].map((site) => (
              <a
                key={site.name}
                href={site.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-400 hover:text-cyan-400 transition-colors"
                title={site.desc}
              >
                {site.name}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
          {/* Affiliate disclosure */}
          <p className="text-xs text-blue-200/60 leading-relaxed mb-4">
            Osa linkeistä on affiliate-linkkejä. Tämä tarkoittaa, että saatamme saada
            korvauksen, kun klikkaat linkkiä ja haet lainaa. Tämä ei vaikuta vertailun
            tuloksiin tai näytettäviin lainoihin.{' '}
            <Link
              href="/menetelma"
              className="underline underline-offset-2 hover:text-blue-100 transition-colors"
            >
              Lue lisää menetelmästämme.
            </Link>
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            {/* Copyright */}
            <p className="text-xs text-blue-200/60">
              &copy; {new Date().getFullYear()} Lainavertailu
            </p>

            {/* Legal links */}
            <div className="flex flex-wrap gap-x-4 gap-y-1">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-blue-200/60 hover:text-blue-100 transition-colors"
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

// Reusable footer link section component
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
              className="text-sm text-blue-200/70 hover:text-white transition-colors"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
