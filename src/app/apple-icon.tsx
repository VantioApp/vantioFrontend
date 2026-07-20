import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Vantio';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#0f172a',
          fontFamily: 'Georgia, serif',
          fontSize: '48px',
          fontWeight: 900,
          color: '#ffffff',
          letterSpacing: '-0.02em',
        }}
      >
        V
      </div>
    ),
    {
      ...size,
    }
  );
}
