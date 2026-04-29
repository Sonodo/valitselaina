'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  Shield,
  Check,
  Users,
  Zap,
  Search,
  BarChart3,
  TrendingDown,
  Clock,
  Building2,
  Home,
  Car,
  Wallet,
  Calculator,
  Landmark,
  FileText,
  Percent,
  Scale,
  Minus,
  Plus,
} from 'lucide-react';
import { AnimatedHeading, ScrollReveal, WaveDivider, StatsCounter } from '@/components/landing';

/* ═══════════════════════════════════════════════════════════════════
   Valitse Laina — Premium Landing Page
   12 visually varied sections with Framer Motion animations
   ═══════════════════════════════════════════════════════════════════ */

const ease = [0.25, 0.1, 0.25, 1] as const;

/* ── Data ───────────────────────────────────────────────────────── */

const faqItems = [
  {
    q: 'Onko Valitse Lainan palvelu ilmainen?',
    a: 'Kyllä, palvelumme on täysin ilmainen kuluttajille. Vertailumme on puolueeton — järjestämme lainat aina todellisen vuosikoron perusteella.',
  },
  {
    q: 'Miten todellinen vuosikorko eroaa nimelliskorosta?',
    a: 'Nimelliskorko on lainan peruskorko ilman kuluja. Todellinen vuosikorko sisältää kaikki lainan kulut (korot, avausmaksut, kuukausimaksut) vuositasolla. Vertaile aina todellista vuosikorkoa — se kertoo lainan todellisen hinnan.',
  },
  {
    q: 'Kuinka nopeasti lainapäätöksen saa?',
    a: 'Riippuu lainanantajasta ja lainatyypistä. Kulutusluoton voi saada jopa samana päivänä. Asuntolainan käsittely kestää tyypillisesti 3–7 arkipäivää. Vertailussa näet jokaisen lainanantajan arvioiman käsittelyajan.',
  },
  {
    q: 'Kannattaako kilpailuttaa asuntolaina?',
    a: 'Ehdottomasti. Jo 0,2 prosenttiyksikön ero marginaalissa voi säästää tuhansia euroja laina-aikana. Esimerkiksi 200 000 € asuntolainassa 0,2 % marginaaliero tarkoittaa noin 400 € vuodessa — 25 vuodessa jopa 10 000 €.',
  },
  {
    q: 'Mitä tarkoittaa vakuudellinen ja vakuudeton laina?',
    a: 'Vakuudellinen laina (esim. asuntolaina) vaatii vakuuden, kuten asunnon. Vakuuden ansiosta korko on matalampi. Vakuudeton laina (esim. kulutusluotto) ei vaadi vakuutta, mutta korko on korkeampi, koska lainanantajan riski on suurempi.',
  },
  {
    q: 'Onko yhdistelylaina järkevä vaihtoehto?',
    a: 'Jos sinulla on useita pieniä lainoja, yhdistelylaina voi alentaa kokonaiskorkoa ja yksinkertaistaa talouttasi yhdeksi kuukausieräksi. Vertaa kuitenkin aina kokonaiskustannuksia — joskus laina-ajan pidentyminen voi tehdä yhdistelystä kalliimman.',
  },
];

const howItWorks = [
  {
    step: 1,
    icon: Search,
    title: 'Vertaile',
    desc: 'Selaa lainanantajien tuotteita yhdessä paikassa. Suodata lainatyypin, summan ja laina-ajan mukaan.',
  },
  {
    step: 2,
    icon: BarChart3,
    title: 'Valitse',
    desc: 'Vertaa lainoja rinnakkain todellisen vuosikoron, kuukausierän ja kokonaiskustannusten perusteella.',
  },
  {
    step: 3,
    icon: ArrowRight,
    title: 'Hae',
    desc: 'Siirry suoraan lainanantajan sivuille ja hae lainaa. Hakemuksen tekeminen ei sido sinua mihinkään.',
  },
];

const valueProps = [
  {
    icon: Shield,
    title: 'Puolueeton menetelmä',
    description: 'Emme suosi mitään lainanantajaa. Järjestys perustuu aina todelliseen vuosikorkoon — sama menetelmä jokaiselle lainalle.',
  },
  {
    icon: Clock,
    title: 'Aina ajan tasalla',
    description: 'Päivitämme korko- ja ehtotiedot säännöllisesti. Näet aina markkinatilanteen mukaiset tiedot yhdestä paikasta.',
  },
  {
    icon: TrendingDown,
    title: 'Säästä lainakuluissa',
    description: 'Kilpailuttamalla lainan voit säästää satoja tai tuhansia euroja. Vertailumme tekee kilpailuttamisesta helppoa ja nopeaa.',
  },
  {
    icon: Scale,
    title: 'Objektiiviset kriteerit',
    description: 'Vertailemme lainoja puolueettomasti kokonaiskustannuksen perusteella. Ei suosikkeja, ei piilotettuja tuloksia.',
  },
];

/* ═══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════ */

interface HomeContentProps {
  totalProviders: number;
  totalProducts: number;
  minRate: number;
  maxLoanAmount: number;
  providers: Array<{
    id: string;
    name: string;
    shortName?: string;
    slug: string;
    type: string;
  }>;
  latestPosts: Array<{
    slug: string;
    title: string;
    description: string;
    category: string;
    publishedAt: string;
    readTime: number;
  }>;
}

export default function HomeContent({
  totalProviders,
  totalProducts,
  minRate,
  maxLoanAmount,
  providers,
  latestPosts,
}: HomeContentProps) {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  return (
    <div className="flex flex-col">

      {/* ─────────────────────────────────────────────────────────────
          SECTION 1: HERO
          Full viewport, dark navy, animated heading
         ───────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[70vh] overflow-hidden bg-navy">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          aria-hidden="true"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Glow orbs */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -left-32 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/15 blur-[128px]" />
          <div className="absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-accent-400/10 blur-[128px]" />
          <div className="absolute left-1/2 top-0 h-[300px] w-[300px] -translate-x-1/2 rounded-full bg-secondary/10 blur-[100px]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-28 pt-20 sm:px-6 sm:pb-36 sm:pt-28 lg:px-8 lg:pt-32">
          <div className="mx-auto max-w-3xl text-center">
            {/* Hero logo */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="mb-10 flex justify-center"
            >
              <Image
                src="/logo.png"
                alt="Valitse Laina"
                width={590}
                height={192}
                priority
                className="h-20 w-auto sm:h-28 lg:h-36"
              />
            </motion.div>

            {/* Animated heading */}
            <AnimatedHeading
              text="VERTAA LAINOJA REHELLISESTI."
              className="text-4xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-5xl lg:text-6xl"
            />
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-2 text-4xl font-extrabold uppercase leading-tight tracking-wide sm:text-5xl lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-accent-400 to-accent-200 bg-clip-text text-transparent">
                Löydä edullisin laina.
              </span>
            </motion.p>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7, ease }}
              className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-white/80"
            >
              Vertaile kulutusluottoja, asuntolainoja ja muita lainoja {totalProviders}+ lainanantajalta.
              Järjestys perustuu aina todelliseen vuosikorkoon — sama menetelmä jokaiselle lainalle.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9, ease }}
              className="mt-10 flex flex-wrap justify-center gap-4"
            >
              <Link
                href="/vertailu"
                className="group inline-flex items-center justify-center border-2 border-accent bg-accent px-6 py-3 sm:px-8 sm:py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                Vertaa lainoja
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/kulutusluotto"
                className="inline-flex items-center justify-center border-2 border-white/30 px-6 py-3 sm:px-8 sm:py-4 text-sm font-bold uppercase tracking-widest text-white/80 transition-all duration-300 hover:border-white hover:text-white"
              >
                Kulutusluotot
              </Link>
            </motion.div>

            {/* Hero trust metrics */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1, ease }}
              className="mt-14 flex flex-wrap items-center justify-center gap-6 sm:gap-10"
            >
              {[
                { value: `${totalProviders}+`, label: 'lainanantajaa' },
                { value: `${totalProducts}+`, label: 'lainatuotetta' },
                { value: `${minRate} %`, label: 'alkaen tod. vuosikorko' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-6">
                  {i > 0 && <div className="h-8 w-px bg-white/10" />}
                  <div className="text-center">
                    <p className="text-2xl font-bold text-white">{item.value}</p>
                    <p className="text-sm text-slate-400">{item.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 2: TRUST BAR
          Subtle light strip
         ───────────────────────────────────────────────────────────── */}
      <section className="border-b border-slate-100 bg-white py-6">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-4 sm:px-6 lg:px-8">
          {[
            { icon: Shield, text: 'Laaja vertailu', color: 'text-accent' },
            { icon: Check, text: 'Ilmainen palvelu', color: 'text-emerald-500' },
            { icon: Users, text: `${totalProviders} lainanantajaa`, color: 'text-accent-400' },
            { icon: Zap, text: 'Todellinen vuosikorko näkyvillä', color: 'text-amber-500' },
          ].map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.1} direction="up">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                <item.icon className={`h-5 w-5 ${item.color}`} />
                {item.text}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 3: LOAN TYPE CARDS — Gradient color progression
          Process-step style cards, blue gradient
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Mitä lainaa etsit?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Valitse lainatyyppi ja löydä sinulle sopivin vaihtoehto
            </p>
          </ScrollReveal>

          <div className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Wallet, title: 'Kulutusluotto', desc: 'Vakuudeton, 500–60 000 €', href: '/kulutusluotto', bg: 'bg-accent-100', text: 'text-accent-900', iconColor: 'text-accent-600' },
              { icon: Home, title: 'Asuntolaina', desc: 'Asunnon ostoon & rakentamiseen', href: '/asuntolaina', bg: 'bg-accent-300', text: 'text-white', iconColor: 'text-white/80' },
              { icon: Car, title: 'Autolaina', desc: 'Auton rahoitus edullisesti', href: '/autolaina', bg: 'bg-accent', text: 'text-white', iconColor: 'text-white/80' },
              { icon: FileText, title: 'Yhdistelylaina', desc: 'Yhdistä lainat yhdeksi', href: '/yhdistelylaina', bg: 'bg-accent-600', text: 'text-white', iconColor: 'text-white/80' },
              { icon: Landmark, title: 'Yrityslaina', desc: 'Yritystoiminnan rahoitus', href: '/yrityslaina', bg: 'bg-accent-700', text: 'text-white', iconColor: 'text-white/80' },
              { icon: Calculator, title: 'Lainanlaskuri', desc: 'Laske kuukausierä ja korot', href: '/tyokalut/lainanlaskuri', bg: 'bg-navy', text: 'text-white', iconColor: 'text-accent-400' },
            ].map((item, i) => (
              <ScrollReveal key={i} delay={i * 0.08} direction="up">
                <Link
                  href={item.href}
                  className={`group flex min-h-[160px] flex-col items-center justify-center rounded-xl px-6 py-8 ${item.bg} transition-transform duration-300 hover:scale-[1.03]`}
                >
                  <item.icon className={`h-10 w-10 ${item.iconColor}`} />
                  <p className={`mt-4 text-center text-lg font-bold ${item.text}`}>
                    {item.title}
                  </p>
                  <p className={`mt-1 text-center text-sm font-medium ${item.text} opacity-70`}>
                    {item.desc}
                  </p>
                  <span className={`mt-3 text-xs font-bold uppercase tracking-widest ${item.text} opacity-60 transition-opacity group-hover:opacity-100`}>
                    Vertaile &rarr;
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 4: VALUE PROPOSITION — 2-column layout
          Dark bg, large heading left, info cards right
         ───────────────────────────────────────────────────────────── */}
      <WaveDivider color="#0B1F3F" flip={false} />
      <section className="bg-navy py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-start">
            {/* Left: large heading and text */}
            <ScrollReveal direction="left">
              <div className="max-w-xl">
                <h2 className="text-2xl font-extrabold uppercase leading-tight tracking-wide text-white sm:text-3xl lg:text-4xl">
                  Kattava. Läpinäkyvä. Ilmainen.
                </h2>
                <p className="mt-6 text-lg leading-relaxed text-white/70">
                  Suomalaiset maksavat lainoistaan usein liikaa, koska eivät kilpailuta. Valitse Laina auttaa löytämään
                  edullisimman vaihtoehdon — kattava valikoima lainanantajia, sama menetelmä jokaiselle lainalle.
                  Näytämme aina todellisen vuosikoron, emmekä piilota kustannuksia.
                </p>
                <div className="mt-8">
                  <Link
                    href="/vertailu"
                    className="inline-flex items-center gap-2 border-2 border-accent bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-white"
                  >
                    Aloita vertailu
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: 2x2 value cards */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {valueProps.map((vp, i) => (
                <ScrollReveal key={i} delay={i * 0.12} direction="right">
                  <div className="rounded-xl bg-white/5 p-6 ring-1 ring-white/10 backdrop-blur-sm transition-all duration-300 hover:bg-white/10">
                    <vp.icon className="h-8 w-8 text-accent-400" />
                    <h3 className="mt-4 text-base font-bold text-white">
                      {vp.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/60">
                      {vp.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 5: STATS
          Dark bg, CountUp numbers
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-navy pb-20 sm:pb-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <StatsCounter
            stats={[
              { end: totalProviders, suffix: '+', label: 'Lainanantajaa' },
              { end: totalProducts, suffix: '+', label: 'Lainatuotetta' },
              { end: 6, label: 'Lainatyyppiä' },
              { end: 0, suffix: ' €', label: 'Hintaa palvelusta' },
            ]}
          />
        </div>
      </section>
      <WaveDivider color="#ffffff" />

      {/* ─────────────────────────────────────────────────────────────
          SECTION 6: LENDERS GRID
          White bg, provider grid with colored initial circles
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="mb-12 text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
                Lainanantajat vertailussa
              </h2>
              <p className="mt-3 text-slate-500">
                Vertailemme Suomen suurimpia pankkeja ja rahoitusyhtiöitä
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {providers.slice(0, 12).map((prov, i) => (
              <ScrollReveal key={prov.id} delay={i * 0.06} direction="up">
                <Link
                  href={`/lainanantajat/${prov.slug}`}
                  className="card-hover group flex flex-col items-center text-center"
                >
                  <div
                    className="mb-3 flex h-14 w-14 items-center justify-center rounded-full text-white text-xl font-bold shadow-lg"
                    style={{
                      backgroundColor:
                        prov.type === 'bank'
                          ? '#1e40af'
                          : prov.type === 'fintech'
                            ? '#059669'
                            : prov.type === 'p2p'
                              ? '#7c3aed'
                              : '#64748b',
                    }}
                  >
                    {(prov.shortName || prov.name).charAt(0)}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-accent">
                    {prov.shortName || prov.name}
                  </h3>
                  <span className="mt-1 text-xs text-slate-500">
                    {prov.type === 'bank'
                      ? 'Pankki'
                      : prov.type === 'fintech'
                        ? 'Rahoitusyhtiö'
                        : prov.type === 'p2p'
                          ? 'Vertaislaina'
                          : 'Muu'}
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {providers.length > 12 && (
            <ScrollReveal direction="up" delay={0.3}>
              <div className="mt-10 text-center">
                <Link
                  href="/lainanantajat"
                  className="inline-flex items-center justify-center gap-2 border-2 border-accent bg-accent px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-accent"
                >
                  Kaikki {totalProviders} lainanantajaa
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>
          )}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 7: HOW IT WORKS — Horizontal numbered steps
          Light bg, connected step icons
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <div className="mb-14 text-center">
              <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
                Näin helppoa se on
              </h2>
              <p className="mt-3 text-slate-500">
                Löydä paras laina kolmessa askeleessa
              </p>
            </div>
          </ScrollReveal>

          <div className="relative">
            {/* Connecting line (desktop) */}
            <div className="absolute left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] top-10 hidden h-0.5 bg-gradient-to-r from-accent-200 via-accent-400 to-accent md:block" aria-hidden="true" />

            <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
              {howItWorks.map((item, i) => (
                <ScrollReveal key={item.step} delay={i * 0.15} direction="up">
                  <div className="flex flex-col items-center text-center">
                    {/* Numbered circle */}
                    <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-accent/20">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent text-lg font-bold text-white">
                        {item.step}
                      </div>
                    </div>
                    <item.icon className="mt-6 h-8 w-8 text-accent-400" />
                    <h3 className="mt-3 text-lg font-bold text-slate-900">{item.title}</h3>
                    <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">{item.desc}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 8: INTEREST RATE INFO — 2-column with accent card
          White bg, educational content
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
            <ScrollReveal direction="left">
              <div>
                <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
                  Ymmärrä lainan todellinen hinta
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  Lainan hintaa määrittävät korko, marginaali, avausmaksut ja kuukausimaksut. Todellinen vuosikorko
                  yhdistää kaikki nämä kulut yhdeksi vertailukelpoiseksi luvuksi.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    'Todellinen vuosikorko sisältää kaikki kulut',
                    'Nimelliskorko ei kerro koko totuutta',
                    'Viitekorko (euribor) vaikuttaa vaihtuvakorkoisten lainojen hintaan',
                    'Marginaali on pankin oma lisä viitekoron päälle',
                  ].map((text, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <Check className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                      <span className="text-slate-700">{text}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="right">
              <div className="rounded-2xl bg-gradient-to-br from-accent/5 to-accent/10 p-8 ring-1 ring-accent/20">
                <div className="flex items-center gap-3 mb-6">
                  <Percent className="h-8 w-8 text-accent" />
                  <h3 className="text-lg font-bold text-slate-900">Korkoesimerkki</h3>
                </div>
                <div className="space-y-4">
                  {[
                    { label: 'Lainasumma', value: '10 000 €' },
                    { label: 'Laina-aika', value: '5 vuotta' },
                    { label: 'Todellinen vuosikorko', value: '6,9 %' },
                    { label: 'Kuukausierä', value: '~198 €/kk' },
                    { label: 'Kokonaiskustannus', value: '~11 880 €' },
                    { label: 'Korkokulut yhteensä', value: '~1 880 €' },
                  ].map((row, i) => (
                    <div key={i} className="flex items-center justify-between border-b border-accent/10 pb-2 last:border-0">
                      <span className="text-sm text-slate-600">{row.label}</span>
                      <span className="text-sm font-bold text-slate-900">{row.value}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500">
                  Esimerkkilaskelma. Todelliset ehdot riippuvat lainanantajasta ja hakijan profiilista.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 9: COMPARISON TABLE
          White bg, highlighted "Valitse Laina" column
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-slate-50 py-20 sm:py-28">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <h2 className="text-center text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Miksi Valitse Laina?
            </h2>
            <p className="mx-auto mt-3 max-w-2xl text-center text-slate-500">
              Vertaile eri tapoja löytää paras laina
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.15}>
            <div className="mt-12 overflow-x-auto rounded-lg ring-1 ring-slate-200">
              <table className="w-full min-w-[500px] text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-white">
                    <th className="px-5 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 sm:px-6">&nbsp;</th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400 sm:px-6">
                      Itse etsiminen
                    </th>
                    <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-widest text-slate-400 sm:px-6">
                      Pankin tarjous
                    </th>
                    <th className="bg-navy px-5 py-4 text-center text-xs font-bold uppercase tracking-widest text-white sm:px-6">
                      Valitse Laina
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white text-sm">
                  {[
                    { label: 'Kattavuus', a: 'Pankki kerrallaan', b: 'Yksi pankki', c: 'Kattava valikoima' },
                    { label: 'Menetelmä', a: 'Vaihtelee pankin mukaan', b: 'Pankin oma tarjonta', c: 'Sama kaikille lainoille' },
                    { label: 'Puolueettomuus', a: 'Vaihtelee', b: 'Rajoitettu', c: 'Kokonaiskustannus ratkaisee' },
                    { label: 'Todellinen vuosikorko', a: 'Pitää etsiä itse', b: 'Usein piilossa', c: 'Aina näkyvillä' },
                    { label: 'Ajankäyttö', a: 'Tunteja', b: 'Tapaaminen tarvitaan', c: 'Muutama minuutti' },
                    { label: 'Hinta', a: 'Ilmainen', b: 'Ilmainen', c: 'Ilmainen' },
                  ].map((row, i) => (
                    <tr key={i}>
                      <td className="px-5 py-4 font-medium text-slate-900 sm:px-6">{row.label}</td>
                      <td className="px-5 py-4 text-center text-slate-500 sm:px-6">{row.a}</td>
                      <td className="px-5 py-4 text-center text-slate-500 sm:px-6">{row.b}</td>
                      <td className="bg-navy/5 px-5 py-4 text-center font-bold text-navy sm:px-6">{row.c}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 10: FAQ ACCORDION
          Light bg, animated expand/collapse
         ───────────────────────────────────────────────────────────── */}
      <section className="bg-white py-20 sm:py-28">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
              Usein kysytyt kysymykset
            </h2>
          </ScrollReveal>

          <div className="mt-10 divide-y divide-slate-200 border-t border-slate-200">
            {faqItems.map((item, index) => (
              <ScrollReveal key={index} delay={index * 0.05} direction="none">
                <div>
                  <button
                    type="button"
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                    className="flex w-full items-center justify-between py-6 text-left min-h-[44px]"
                    aria-expanded={openFaqIndex === index}
                  >
                    <span className="pr-4 text-base font-semibold text-slate-900 sm:text-lg">
                      {item.q}
                    </span>
                    {openFaqIndex === index ? (
                      <Minus className="h-5 w-5 shrink-0 text-accent" />
                    ) : (
                      <Plus className="h-5 w-5 shrink-0 text-slate-400" />
                    )}
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaqIndex === index && (
                      <motion.div
                        key={`faq-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 leading-relaxed text-slate-600">
                          {item.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────
          SECTION 11: BLOG PREVIEW
          Light bg, 3-col article cards
         ───────────────────────────────────────────────────────────── */}
      {latestPosts.length > 0 && (
        <section className="bg-slate-50 py-20 sm:py-28">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <ScrollReveal direction="up">
              <div className="mb-12 flex items-center justify-between">
                <h2 className="text-2xl font-extrabold uppercase tracking-wide text-slate-900 sm:text-3xl">
                  Ajankohtaista
                </h2>
                <Link
                  href="/blogi"
                  className="hidden items-center gap-1 text-sm font-bold uppercase tracking-widest text-accent hover:text-accent-600 sm:flex"
                >
                  Kaikki artikkelit <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </ScrollReveal>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {latestPosts.map((post, i) => (
                <ScrollReveal key={post.slug} delay={i * 0.12} direction="up">
                  <Link
                    href={`/blogi/${post.slug}`}
                    className="card-hover group flex flex-col h-full"
                  >
                    <span className="text-xs font-semibold uppercase tracking-widest text-accent">{post.category}</span>
                    <h3 className="mt-3 text-lg font-bold leading-snug text-slate-900 group-hover:text-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="mt-2 flex-1 line-clamp-2 text-sm text-slate-600">{post.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <p className="text-xs text-slate-400">
                        {post.readTime} min lukuaika
                      </p>
                      <span className="text-xs font-bold uppercase tracking-widest text-accent opacity-0 transition-opacity group-hover:opacity-100">
                        Lue &rarr;
                      </span>
                    </div>
                  </Link>
                </ScrollReveal>
              ))}
            </div>

            <ScrollReveal direction="up" delay={0.2}>
              <div className="mt-8 text-center sm:hidden">
                <Link href="/blogi" className="text-sm font-bold uppercase tracking-widest text-accent hover:text-accent-600">
                  Kaikki artikkelit &rarr;
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────
          SECTION 12: CTA
          Dark bg with glow, strong call to action
         ───────────────────────────────────────────────────────────── */}
      <WaveDivider color="#0B1F3F" flip={false} />
      <section className="relative overflow-hidden bg-navy py-20 sm:py-28">
        {/* Glow */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute left-1/2 top-1/2 h-[400px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[128px]" />
        </div>

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <ScrollReveal direction="up">
            <AnimatedHeading
              as="h2"
              text="Löydä sinulle paras laina"
              className="text-3xl font-extrabold text-white sm:text-4xl"
            />
            <p className="mx-auto mt-6 max-w-2xl text-lg text-white/70 leading-relaxed">
              Vertaa lainoja ilmaiseksi ja löydä edullisin vaihtoehto. {totalProviders}+ lainanantajaa,
              todellinen vuosikorko aina näkyvillä. Puolueeton ja täysin ilmainen palvelu.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Link
                href="/vertailu"
                className="group inline-flex items-center gap-2 border-2 border-accent bg-accent px-8 py-4 text-sm font-bold uppercase tracking-widest text-white transition-all duration-300 hover:bg-transparent hover:text-white"
              >
                Vertaa lainoja nyt
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/tyokalut/lainanlaskuri"
                className="inline-flex items-center gap-2 border-2 border-white/30 px-8 py-4 text-sm font-bold uppercase tracking-widest text-white/80 transition-all duration-300 hover:border-white hover:text-white"
              >
                Lainanlaskuri
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

    </div>
  );
}
