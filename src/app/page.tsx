import type { Metadata } from 'next';
import Link from 'next/link';
import { Award, GraduationCap } from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { HeroSection, FeaturesSection, DianSection } from '@/presentation/components/landing/LandingClient';
import { Footer } from '@/presentation/components/ui/footer';

export const metadata: Metadata = {
  title: 'Simulacros para el concurso DIAN 2676 – Gestor II (OPEC 236844)',
  description:
    'Prepárate para el Proceso de Selección DIAN 2676, empleo Gestor II (OPEC 236844): más de 600 preguntas situacionales con caso, enunciado y tres opciones, 14 ejes temáticos, Código de Ética y Diccionario de Competencias, y simulacros de 40, 80 o 144 preguntas.',
  keywords: [
    'concurso DIAN',
    'DIAN 2676',
    'proceso de selección DIAN',
    'Gestor II',
    'OPEC 236844',
    'simulacro DIAN',
    'pruebas de ejecución',
    'preguntas situacionales',
    'carrera administrativa DIAN',
    'Código de Ética DIAN',
    'Diccionario de Competencias DIAN',
  ],
  openGraph: {
    title: 'Simulacros para el concurso DIAN 2676 – Gestor II | Vantio',
    description:
      'Más de 600 preguntas situacionales por eje temático y simulacros de 40, 80 o 144 preguntas para el Proceso de Selección DIAN 2676.',
    url: '/',
    type: 'website',
  },
};

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo variant="full" theme="light" height={36} />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#dian" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Proceso DIAN</a>
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Características</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Metodología</a>
            <span className="text-sm font-medium text-slate-300">|</span>
            <div className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-amber-200">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Convocatoria DIAN 2676
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold bg-slate-900 text-white px-4 py-2 rounded-lg shadow-sm md:bg-transparent md:text-slate-700 md:shadow-none md:hover:text-slate-900 md:hover:bg-slate-50 transition-colors"
            >
              Iniciar Sesión
            </Link>
            <Link
              href="/register"
              className="hidden md:inline-flex text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      <HeroSection />

      <FeaturesSection />

      <DianSection />

      <section id="about" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center flex flex-col items-center gap-5">
          <GraduationCap className="w-12 h-12 text-slate-900" />
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
            Entrena con el formato que vas a encontrar en la prueba
          </h3>
          <p className="text-slate-600 leading-relaxed">
            Cada pregunta presenta un caso, un enunciado y tres opciones de respuesta, con la explicación de por qué
            la opción correcta lo es y por qué las otras no. Al terminar, Vantio te muestra tu desempeño por eje
            temático para que enfoques el estudio donde más lo necesitas.
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
