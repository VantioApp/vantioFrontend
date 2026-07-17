'use client';

import { motion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Scale, ArrowRight, Award, GraduationCap, CheckCircle, LineChart, BookOpen } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-amber-100 selection:text-slate-900">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-slate-900" />
            <span className="font-serif text-2xl font-bold text-slate-900 tracking-tight">Vantio</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Características</a>
            <a href="#about" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">Metodología</a>
            <span className="text-sm font-medium text-slate-300">|</span>
            <div className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 border border-amber-200">
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Exámenes Preparatorios 2026
            </div>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-semibold text-slate-700 hover:text-slate-900 px-4 py-2 hover:bg-slate-50 rounded-lg transition-colors"
            >
              Iniciar Sesión
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

      {/* Hero Section */}
      <section className="relative bg-white border-b border-slate-200/60 overflow-hidden py-16 md:py-24">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
        
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Hero Left Content */}
          <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80"
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">El estándar de oro en educación jurídica</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-bold leading-[1.1] tracking-tight"
            >
              Excelencia en tu <span className="text-slate-900 underline decoration-amber-500/60 decoration-4 underline-offset-8">Preparación</span> Jurídica
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-slate-600 leading-relaxed max-w-xl"
            >
              La plataforma de cuestionarios interactivos y simulacros definitiva para abogados y estudiantes que buscan superar sus exámenes preparatorios con total éxito. Rigor académico, métricas de rendimiento y tecnología de vanguardia.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
            >
              <Link
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
              >
                Crear Cuenta gratis
                <ArrowRight className="w-5 h-5 text-amber-400" />
              </Link>
              <Link
                href="/login"
                className="w-full sm:w-auto inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-4 rounded-lg shadow-sm transition-all active:scale-95"
              >
                Iniciar Sesión
              </Link>
            </motion.div>
          </div>

          {/* Hero Right Content (Graphics & Floating Cards) */}
          <div className="lg:col-span-6 relative flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100"
            >
              <Image 
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0mVe32pmwQWj_rP7XPXL-CJ1YY1whccPmhBB3tDWU0Ggm_7_PYWAW2hfYdUX5dbOOOpjyql8CodXdo8OaQ86TCVFdKaBmWv3xc1Wze5U6UjiEFyOxKnuL_FMSHGiG34FeLRmuN_LWIXwegeu2U5n20fqtTcK3STzRrmgMaEC5h1lO9Ez3V8nzVYaPhfTjcmVtICidVZENBQD_sHCGYzK1q26gUWavg3sqbnhTuriPy3LGF8SJFxGF" 
                alt="Law library study setup with computer"
                fill
                className="object-cover select-none"
                referrerPolicy="no-referrer"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
              
              {/* Floating Stat Card */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute bottom-6 left-6 right-6 md:-left-8 md:right-auto md:w-64 bg-white p-4 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tasa de Aprobación</p>
                  <p className="font-serif text-3xl font-bold text-slate-900 mt-0.5">94%</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight mb-4">
              Herramientas Diseñadas para el Éxito
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Nuestra metodología combina la doctrina legal tradicional con interfaces de aprendizaje modernas y libres de distracciones, maximizando la retención y minimizando el estrés.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                  <Scale className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Simulacros Aleatorios</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Enfrenta exámenes de preparatorios generados dinámicamente con preguntas que simulan la presión de tiempo, estructura y complejidad de las pruebas reales de la facultad.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Modo Práctica</span>
                <span className="text-amber-600">Simulación real</span>
              </div>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                  <LineChart className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Seguimiento de Progreso</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Visualiza tu evolución a través de métricas detalladas e historial completo. Identifica rápidamente tus áreas débiles en la doctrina para enfocar tu tiempo de estudio eficazmente.
                </p>
              </div>
              <div className="pt-6">
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-1.5">
                  <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
                </div>
                <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <span>Meta de Aprobación</span>
                  <span className="text-emerald-600">75% Completado</span>
                </div>
              </div>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -4 }}
              className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Contenido Jurídico Actualizado</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Accede a un pool de preguntas cuidadosamente elaboradas y revisadas por docentes y jurisprudencia actualizada al Código General del Proceso y Códigos de fondo vigentes.
                </p>
              </div>
              <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Última Actualización</span>
                <span className="text-emerald-600">Al día en 2026</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Trust & Testimonial Callout */}
      <section id="about" className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center gap-6">
          <GraduationCap className="w-12 h-12 text-slate-900" />
          <h3 className="font-serif text-2xl md:text-3xl font-bold text-slate-900">
            "La mejor inversión académica que pude hacer para ganar mis preparatorios de Derecho Penal y Civil."
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

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-white">
              <Scale className="w-6 h-6 text-amber-400" />
              <span className="font-serif text-xl font-bold tracking-tight">Vantio</span>
            </div>
            <p className="text-xs text-slate-500 text-center md:text-left">
              © 2026 Vantio Legal Education. Todos los derechos reservados. Excelencia Profesional en el Derecho.
            </p>
          </div>

          <nav className="flex flex-wrap gap-6 justify-center">
            <a href="#" className="text-xs hover:text-white transition-colors">Términos de Servicio</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Política de Privacidad</a>
            <a href="#" className="text-xs hover:text-white transition-colors">Soporte Técnico</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
