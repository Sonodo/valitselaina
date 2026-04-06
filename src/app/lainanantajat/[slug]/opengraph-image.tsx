import { ImageResponse } from 'next/og';
import { getProviderBySlug } from '@/data/providers';

export const runtime = 'edge';
export const alt = 'Valitse Laina — Lainanantaja';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const typeLabels: Record<string, string> = {
  bank: 'Pankki',
  fintech: 'Fintech',
  p2p: 'Vertaislaina',
  other: 'Muu rahoittaja',
};

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const provider = getProviderBySlug(slug);

  const name = provider?.name ?? slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
  const type = provider ? typeLabels[provider.type] ?? provider.type : '';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(135deg, #0f2440 0%, #1a365d 40%, #2a4a7f 100%)',
          fontFamily: 'Arial, sans-serif',
          padding: '60px',
        }}
      >
        {/* Top decorative bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '6px',
            background: 'linear-gradient(90deg, #d69e2e, #ecc94b, #d69e2e)',
          }}
        />

        {/* Top: type badge */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <div
            style={{
              backgroundColor: 'rgba(214, 158, 46, 0.2)',
              color: '#ecc94b',
              fontSize: '18px',
              fontWeight: '600',
              padding: '8px 20px',
              borderRadius: '9999px',
            }}
          >
            Lainanantaja
          </div>
          {type && (
            <div
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: 'rgba(255, 255, 255, 0.8)',
                fontSize: '18px',
                fontWeight: '500',
                padding: '8px 20px',
                borderRadius: '9999px',
              }}
            >
              {type}
            </div>
          )}
        </div>

        {/* Middle: provider name */}
        <div
          style={{
            fontSize: name.length > 25 ? '56px' : '68px',
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.2,
          }}
        >
          {name}
        </div>

        {/* Bottom: branding */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <svg
              width="28"
              height="28"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#d69e2e"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
              <path d="M9 12l2 2 4-4" />
            </svg>
            <span style={{ fontSize: '24px', fontWeight: 'bold', color: 'white' }}>
              Valitse Laina
            </span>
          </div>
          <span style={{ fontSize: '16px', color: 'rgba(255, 255, 255, 0.4)' }}>
            valitselaina.fi
          </span>
        </div>
      </div>
    ),
    { ...size },
  );
}
