import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import WhyTrustUs from '@/components/home/WhyTrustUs';
import PopularLoans from '@/components/home/PopularLoans';
import LoanTypeCards from '@/components/home/LoanTypeCards';
import EducationPreview from '@/components/home/EducationPreview';
import FAQ from '@/components/home/FAQ';
import CTASection from '@/components/home/CTASection';

export const metadata: Metadata = {
  title: 'Lainavertailu — Vertaa lainoja rehellisesti | Suomen luotettavin',
  description:
    'Vertaa kulutusluottoja, asuntolainoja ja autolainoja. Näytämme kaikki lainat — myös ne, joista emme saa komissiota. 28+ lainanantajaa, todelliset vuosikorot.',
  alternates: { canonical: 'https://lainavertailu.fi' },
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <HowItWorks />
      <WhyTrustUs />
      <PopularLoans />
      <LoanTypeCards />
      <EducationPreview />
      <FAQ />
      <CTASection />
    </>
  );
}
