/**
 * Analytics helpers — thin, defensive wrappers around GA4 (gtag) and Clarity.
 *
 * Design goals:
 * - No-op when window / gtag / clarity is unavailable (SSR, ad-blockers, etc.)
 * - Never throw — all calls are wrapped in try/catch.
 * - Strict TypeScript, no `any` leaking to callers.
 */

type GtagFn = (...args: unknown[]) => void;
type ClarityFn = (...args: unknown[]) => void;

interface AnalyticsGlobals {
  gtag?: GtagFn;
  clarity?: ClarityFn;
}

function getGlobals(): AnalyticsGlobals | null {
  if (typeof window === 'undefined') return null;
  return window as unknown as AnalyticsGlobals;
}

/**
 * Send a custom event to Google Analytics 4 via gtag.
 * Safe to call during SSR or when gtag is not yet loaded — becomes a no-op.
 */
export function trackEvent(
  name: string,
  params?: Record<string, unknown>,
): void {
  const g = getGlobals();
  if (!g) return;
  try {
    if (typeof g.gtag === 'function') {
      g.gtag('event', name, params ?? {});
    }
  } catch {
    // Swallow — analytics must never break the app.
  }
}

/**
 * Track an outbound click to a loan provider's apply page.
 * Fires to both GA4 and Microsoft Clarity when available.
 */
export function trackAffiliateClick(
  provider: string,
  productType: string,
  extras?: Record<string, unknown>,
): void {
  const params: Record<string, unknown> = {
    provider,
    product_type: productType,
    ...(extras ?? {}),
  };

  trackEvent('affiliate_click', params);

  const g = getGlobals();
  if (!g) return;
  try {
    if (typeof g.clarity === 'function') {
      g.clarity('event', 'affiliate_click');
      g.clarity('set', 'affiliate_provider', provider);
      g.clarity('set', 'affiliate_product_type', productType);
    }
  } catch {
    // Swallow.
  }
}

/**
 * Track a lead event (e.g. newsletter signup, contact-form submit).
 */
export function trackLead(
  source: string,
  params?: Record<string, unknown>,
): void {
  trackEvent('lead', { source, ...(params ?? {}) });

  const g = getGlobals();
  if (!g) return;
  try {
    if (typeof g.clarity === 'function') {
      g.clarity('event', 'lead');
      g.clarity('set', 'lead_source', source);
    }
  } catch {
    // Swallow.
  }
}

/**
 * Track when a user initiates a comparison (submits the calculator form).
 */
export function trackBeginCompare(
  params?: Record<string, unknown>,
): void {
  trackEvent('begin_compare', params);

  const g = getGlobals();
  if (!g) return;
  try {
    if (typeof g.clarity === 'function') {
      g.clarity('event', 'begin_compare');
    }
  } catch {
    // Swallow.
  }
}
