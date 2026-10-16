import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Revisión de preguntas',
  robots: { index: false, follow: false },
};

export default function RevisionLayout({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">{children}</div>;
}
