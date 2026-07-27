import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Comunícate con el equipo de Vantio para resolver tus dudas sobre la plataforma, el contenido académico o cualquier inquietud.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
