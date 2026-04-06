import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Valitse Laina — Blogi';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Format slug into readable Finnish title
function formatTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const title = formatTitle(slug);

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

        {/* Top: category badge */}
        <div style={{ display: 'flex' }}>
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
            Blogi
          </div>
        </div>

        {/* Middle: title */}
        <div
          style={{
            fontSize: title.length > 40 ? '44px' : '52px',
            fontWeight: 'bold',
            color: 'white',
            lineHeight: 1.2,
            maxWidth: '900px',
          }}
        >
          {title}
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
