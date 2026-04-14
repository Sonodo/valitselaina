// Global type declarations
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

// Loan provider
export interface LoanProvider {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  type: 'bank' | 'fintech' | 'p2p' | 'other';
  founded: number;
  headquarters: string;
  country: string; // 'FI', 'NO', 'SE', 'EE', etc.
  finFsaRegulated: boolean;
  finFsaId?: string;
  website: string;
  customerServicePhone?: string;
  customerServiceEmail?: string;
  description: string;
  pros: string[];
  cons: string[];
  isAffiliate: boolean;
  logoUrl?: string;
  applyUrls?: Partial<Record<LoanType, string>>;
  products: LoanProduct[];
}

// Individual loan product
export interface LoanProduct {
  id: string;
  providerId: string;
  name: string;
  type: LoanType;
  minAmount: number; // euros
  maxAmount: number;
  minTermMonths: number;
  maxTermMonths: number;
  nominalRate: { min: number; max: number }; // percentage
  effectiveRate: { min: number; max: number }; // todellinen vuosikorko
  setupFee?: number; // euros
  monthlyFee?: number; // euros
  requiresCollateral: boolean;
  requiresGuarantor: boolean;
  processingTime: string; // e.g., "1 päivä", "1-3 päivää"
  features: string[];
  restrictions?: string[];
  lastUpdated: string; // ISO date
}

export type LoanType =
  | 'kulutusluotto'
  | 'asuntolaina'
  | 'autolaina'
  | 'yhdistelylaina'
  | 'yrityslaina'
  | 'pikavippi';

// Comparison calculator types
export interface ComparisonQuery {
  amount: number;
  termMonths: number;
  type: LoanType;
  purpose?: string;
}

export interface ComparisonResult {
  product: LoanProduct;
  provider: LoanProvider;
  monthlyPayment: number;
  totalCost: number;
  totalInterest: number;
  effectiveRate: number;
  isAffiliate: boolean;
}

// Amortization schedule
export interface AmortizationRow {
  month: number;
  payment: number;
  principal: number;
  interest: number;
  remainingBalance: number;
}

// Blog post
export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  readTime: number;
  tags: string[];
}

// Guide
export interface Guide {
  slug: string;
  title: string;
  description: string;
  content: string;
  category: string;
  readTime: number;
  tableOfContents: { id: string; title: string; level: number }[];
  relatedGuides: string[];
}

// Consumer review
export interface ProviderReview {
  id: string;
  providerId: string;
  rating: number;
  title: string;
  text: string;
  date: string;
  verified: boolean;
}
