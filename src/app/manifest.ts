import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Vantio - Plataforma de Preparación Jurídica',
    short_name: 'Vantio',
    description:
      'Plataforma educativa para profesionales de leyes y contabilidad en Colombia. Simulacros aleatorios, seguimiento de progreso y métricas de rendimiento para exámenes preparatorios de Derecho Penal y Civil.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f8fafc',
    theme_color: '#0f172a',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
