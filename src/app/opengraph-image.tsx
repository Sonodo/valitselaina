import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Valitse Laina — Vertaa lainoja rehellisesti';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0f2440 0%, #1a365d 40%, #2a4a7f 100%)',
          fontFamily: 'Arial, sans-serif',
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

        {/* Shield icon */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            backgroundColor: 'rgba(214, 158, 46, 0.15)',
            marginBottom: '24px',
          }}
        >
          <svg
            width="44"
            height="44"
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
        </div>

        {/* Site name */}
        <div
          style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: 'white',
            letterSpacing: '-1px',
            marginBottom: '16px',
          }}
        >
          Valitse Laina
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '28px',
            color: '#d69e2e',
            fontWeight: '600',
            marginBottom: '40px',
          }}
        >
          Vertaa lainoja rehellisesti
        </div>

        {/* Trust badges */}
        <div
          style={{
            display: 'flex',
            gap: '24px',
          }}
        >
          {['Puolueeton vertailu', '28+ lainanantajaa', 'Ilmainen palvelu'].map(
            (badge) => (
              <div
                key={badge}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  borderRadius: '9999px',
                  padding: '10px 20px',
                  fontSize: '16px',
                  color: 'rgba(255, 255, 255, 0.85)',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#48bb78"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                {badge}
              </div>
            ),
          )}
        </div>

        {/* Domain */}
        <div
          style={{
            position: 'absolute',
            bottom: '28px',
            fontSize: '18px',
            color: 'rgba(255, 255, 255, 0.4)',
          }}
        >
          valitselaina.fi
        </div>
      </div>
    ),
    { ...size },
  );
}
