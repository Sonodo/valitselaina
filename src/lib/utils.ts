import { AmortizationRow, LoanProvider, LoanType } from '@/types';

// Resolve the correct "Hae lainaa" URL for a provider + loan type combination.
// Falls back to the provider's homepage when no type-specific deep link is mapped.
export function getApplyUrl(provider: LoanProvider, loanType?: LoanType): string {
  if (loanType && provider.applyUrls?.[loanType]) {
    return provider.applyUrls[loanType] as string;
  }
  return provider.website;
}

// Calculate monthly annuity payment
export function calculateMonthlyPayment(
  principal: number,
  annualRate: number,
  termMonths: number
): number {
  if (annualRate === 0) return principal / termMonths;
  const monthlyRate = annualRate / 100 / 12;
  return (
    (principal * monthlyRate * Math.pow(1 + monthlyRate, termMonths)) /
    (Math.pow(1 + monthlyRate, termMonths) - 1)
  );
}

// Calculate total cost of loan
export function calculateTotalCost(
  monthlyPayment: number,
  termMonths: number,
  setupFee: number = 0,
  monthlyFee: number = 0
): number {
  return monthlyPayment * termMonths + setupFee + monthlyFee * termMonths;
}

// Calculate total interest paid
export function calculateTotalInterest(
  monthlyPayment: number,
  termMonths: number,
  principal: number
): number {
  return monthlyPayment * termMonths - principal;
}

// Generate amortization schedule
export function generateAmortizationSchedule(
  principal: number,
  annualRate: number,
  termMonths: number
): AmortizationRow[] {
  const monthlyRate = annualRate / 100 / 12;
  const payment = calculateMonthlyPayment(principal, annualRate, termMonths);
  const schedule: AmortizationRow[] = [];
  let balance = principal;

  for (let month = 1; month <= termMonths; month++) {
    const interest = balance * monthlyRate;
    const principalPaid = payment - interest;
    balance = Math.max(0, balance - principalPaid);

    schedule.push({
      month,
      payment: Math.round(payment * 100) / 100,
      principal: Math.round(principalPaid * 100) / 100,
      interest: Math.round(interest * 100) / 100,
      remainingBalance: Math.round(balance * 100) / 100,
    });
  }

  return schedule;
}

// Format currency (Finnish format)
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fi-FI', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// Format percentage
export function formatPercentage(value: number, decimals: number = 2): string {
  return `${value.toFixed(decimals).replace('.', ',')} %`;
}

// Format number with Finnish thousand separator
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('fi-FI').format(value);
}

// Get Finnish hour (timezone-safe)
export function getFinnishHour(date?: Date): number {
  const d = date || new Date();
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'Europe/Helsinki',
    hour: 'numeric',
    hour12: false,
  });
  return parseInt(formatter.format(d), 10);
}

// Classify loan rate (for visual indicators)
export function classifyRate(effectiveRate: number, type: string): 'excellent' | 'good' | 'average' | 'high' | 'very-high' {
  if (type === 'asuntolaina') {
    if (effectiveRate <= 3.5) return 'excellent';
    if (effectiveRate <= 4.5) return 'good';
    if (effectiveRate <= 5.5) return 'average';
    if (effectiveRate <= 7) return 'high';
    return 'very-high';
  }
  // Consumer loans
  if (effectiveRate <= 6) return 'excellent';
  if (effectiveRate <= 10) return 'good';
  if (effectiveRate <= 15) return 'average';
  if (effectiveRate <= 18) return 'high';
  return 'very-high';
}
