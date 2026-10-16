import type { Metadata } from "next";
import { Merriweather, Inter } from "next/font/google";
import { Providers } from "./providers";
import "./globals.css";

const merriweather = Merriweather({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vantio.xchecho.com'),
  title: {
    default: 'Vantio - Plataforma de Preparación Jurídica',
    template: '%s | Vantio',
  },
  description:
    'Simulacros y banco de preguntas para el Proceso de Selección DIAN 2676 (Gestor II, OPEC 236844), además de preparación en Derecho Penal y Privado. Seguimiento de progreso y métricas de rendimiento.',
  keywords: [
    'concurso DIAN',
    'DIAN 2676',
    'Gestor II',
    'OPEC 236844',
    'derecho',
    'quiz',
    'preparación',
    'exámenes',
    'Colombia',
    'penal',
    'civil',
    'simulacros',
    'preparatorio',
    'educación jurídica',
    'abogados',
    'contabilidad',
  ],
  authors: [{ name: 'Vantio' }],
  creator: 'Vantio',
  publisher: 'Vantio',
  applicationName: 'Vantio',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: 'Vantio - Plataforma de Preparación Jurídica',
    description:
      'Simulacros y banco de preguntas para el concurso DIAN 2676 (Gestor II) y exámenes de Derecho en Colombia.',
    url: 'https://vantio.xchecho.com',
    siteName: 'Vantio',
    locale: 'es_CO',
    type: 'website',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: 'Vantio - Plataforma de Preparación Jurídica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vantio - Plataforma de Preparación Jurídica',
    description:
      'Simulacros y banco de preguntas para el concurso DIAN 2676 (Gestor II) y exámenes de Derecho en Colombia.',
    images: ['/opengraph-image'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon',
  },
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${merriweather.variable} ${inter.variable}`}>
      <head>
        <link rel="preconnect" href="https://lh3.googleusercontent.com" />
      </head>
      <body className="min-h-screen antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
