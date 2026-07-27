import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, GraduationCap, Target, Users, BookOpen, Award, Shield, Lightbulb } from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { Footer } from '@/presentation/components/ui/footer';

export const metadata: Metadata = {
  title: 'Sobre Nosotros',
  description: 'Conoce la misión de Vantio: transformar la preparación jurídica en Colombia mediante tecnología educativa de vanguardia.',
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo variant="full" theme="light" height={36} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Sobre Nosotros</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
              Excelencia Académica al Alcance de Todos
            </h1>
            <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
              Vantio nació con una misión clara: democratizar la preparación para exámenes preparatorios
              de Derecho en Colombia, combinando el rigor doctrinal con tecnología educativa de vanguardia.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Nuestra Misión</span>
                <h2 className="font-serif text-3xl font-bold text-slate-900 mt-3">
                  Formar profesionales mejor preparados para el ejercicio del Derecho
                </h2>
                <p className="text-slate-600 mt-4 leading-relaxed">
                  Creemos que la preparación para los exámenes preparatorios no debe ser un privilegio.
                  Nuestra plataforma ofrece simulacros de alta calidad, retroalimentación inmediata y
                  seguimiento de progreso personalizado, permitiendo que cada estudiante identifique
                  sus fortalezas y fortalezca sus debilidades de manera eficiente.
                </p>
                <p className="text-slate-600 mt-4 leading-relaxed">
                  Desarrollamos contenido basado en la doctrina jurídica colombiana más reconocida,
                  curado por profesionales con experiencia en educación legal, para garantizar que
                  cada pregunta y explicación refleje el nivel de exigencia de los exámenes reales.
                </p>
              </div>
              <div className="bg-slate-900 rounded-xl p-8 text-center">
                <GraduationCap className="w-16 h-16 text-amber-500 mx-auto" />
                <p className="font-serif text-2xl font-bold text-white mt-6">
                  &quot;La educación jurídica de calidad es el pilar fundamental de una sociedad justa&quot;
                </p>
                <p className="text-slate-400 text-sm mt-4">Principio fundador de Vantio</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-white border-y border-slate-200">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Nuestros Valores</span>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mt-3">
                Lo que nos define
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-gray-50 rounded-xl p-6 border border-slate-200/60">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Rigor Académico</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Cada pregunta es revisada y validada conforme a la doctrina y legislación vigente en Colombia.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-slate-200/60">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center mb-4">
                  <Target className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Enfoque Práctico</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Simulacros diseñados para replicar las condiciones reales de los exámenes preparatorios.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-slate-200/60">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center mb-4">
                  <Lightbulb className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Innovación</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Tecnología de punta para ofrecer la mejor experiencia de aprendizaje digital.
                </p>
              </div>
              <div className="bg-gray-50 rounded-xl p-6 border border-slate-200/60">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center mb-4">
                  <Users className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Accesibilidad</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Educación de calidad al alcance de cualquier estudiante, sin importar su ubicación.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Lo que ofrecemos</span>
              <h2 className="font-serif text-3xl font-bold text-slate-900 mt-3">
                Herramientas para tu éxito profesional
              </h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Banco de Preguntas</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Cientos de preguntas curadas sobre Derecho Penal, Civil y áreas en expansión,
                  con explicaciones doctrinales detalladas para cada respuesta.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Simulacros Cronometrados</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Replica las condiciones reales del examen con pruebas aleatorias cronometradas
                  que evalúan tu conocimiento bajo presión.
                </p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900">Análisis de Rendimiento</h3>
                <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                  Métricas detalladas por tema y área para identificar tus fortalezas
                  y enfocar tu estudio donde más lo necesitas.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
