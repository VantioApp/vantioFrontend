import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Vantio - Plataforma de Preparación Jurídica';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          fontFamily: 'Georgia, serif',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '24px',
          }}
        >
          <div
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#ffffff',
              letterSpacing: '-0.02em',
              lineHeight: 1,
            }}
          >
            Vantio
          </div>
          <div
            style={{
              width: '80px',
              height: '4px',
              backgroundColor: '#d97706',
              borderRadius: '2px',
            }}
          />
          <div
            style={{
              fontSize: '28px',
              color: '#94a3b8',
              fontWeight: 400,
              letterSpacing: '0.02em',
              textAlign: 'center',
              maxWidth: '800px',
            }}
          >
            Plataforma de Preparación Jurídica
          </div>
          <div
            style={{
              fontSize: '16px',
              color: '#64748b',
              fontWeight: 500,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginTop: '16px',
            }}
          >
            Simulacros · Derecho Penal · Derecho Civil
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
