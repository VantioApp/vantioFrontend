import Link from 'next/link';
import { Award, GraduationCap } from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { HeroSection, FeaturesSection } from '@/presentation/components/landing/LandingClient';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo variant="full" theme="light" height={36} />
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Caracteristicas</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Metodologia</a>
            <span className="text-sm font-medium text-slate-300">|</span>
            <div className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-amber-200">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Examenes Preparatorios 2026
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Iniciar Sesion
            </Link>
            <Link
              href="/register"
              className="text-sm font-semibold bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              Registrarse
            </Link>
          </div>
        </div>
      </header>

      <HeroSection />

      <FeaturesSection />

      <section id="about" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <GraduationCap className="w-12 h-12 text-slate-900" />
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
            &quot;La mejor inversion academica que pude hacer para ganar mis preparatorios de Derecho Penal y Civil.&quot;
          </h3>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 font-bold text-slate-900 flex items-center justify-center text-sm shadow-sm">
              AM
            </div>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-900">Alex Mercer</p>
              <p className="text-xs text-slate-500">Abogado Graduado - Universidad de Jurisprudencia</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center">
              <Logo variant="full" theme="dark" height={28} />
            </div>
            <p className="text-xs text-slate-500 text-center md:text-left">
              (c) 2026 Vantio Legal Education. Todos los derechos reservados. Excelencia Profesional en el Derecho.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="text-xs hover:text-white transition-colors">Terminos de Servicio</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Politica de Privacidad</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Soporte Tecnico</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
