'use client';

import { motion, useReducedMotion } from 'motion/react';
import Image from 'next/image';
import Link from 'next/link';
import { Scale, ArrowRight, Award, GraduationCap, LineChart, BookOpen } from 'lucide-react';

export function LandingAnimations() {
  return null;
}

export function HeroSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="relative bg-white border-b border-slate-200/60 overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
          <motion.div 
            initial={shouldReduce ? false : { opacity: 0, y: 15 }}
            animate={shouldReduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">El estandar de oro en educacion juridica</span>
          </motion.div>

          <motion.h1 
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={shouldReduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-bold leading-[1.1] tracking-tight"
          >
            Excelencia en tu <span className="text-slate-900 underline decoration-amber-500/60 decoration-4 underline-offset-8">Preparacion</span> Juridica
          </motion.h1>

          <motion.p 
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={shouldReduce ? false : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed max-w-xl"
          >
            La plataforma de cuestionarios interactivos y simulacros definitiva para abogados y estudiantes que buscan superar sus examenes preparatorios con total exito. Rigor academico, metricas de rendimiento y tecnologia de vanguardia.
          </motion.p>

          <motion.div 
            initial={shouldReduce ? false : { opacity: 0, y: 20 }}
            animate={shouldReduce ? false : { opacity: 1, y: 0 }}
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
              Iniciar Sesion
            </Link>
          </motion.div>
        </div>

        <div className="lg:col-span-6 relative flex justify-center">
          <motion.div 
            initial={shouldReduce ? false : { opacity: 0, scale: 0.95 }}
            animate={shouldReduce ? false : { opacity: 1, scale: 1 }}
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
            
            <motion.div 
              initial={shouldReduce ? false : { opacity: 0, x: 30 }}
              animate={shouldReduce ? false : { opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-6 left-6 right-6 md:-left-8 md:right-auto md:w-64 bg-white p-4 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Tasa de Aprobacion</p>
                <p className="font-serif text-3xl font-bold text-slate-900 mt-0.5">94%</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  const shouldReduce = useReducedMotion();

  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight mb-4">
            Herramientas Disenadas para el Exito
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Nuestra metodologia combina la doctrina legal tradicional con interfaces de aprendizaje modernas y libres de distracciones, maximizando la retencion y minimizando el estres.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div 
            whileHover={shouldReduce ? undefined : { y: -4 }}
            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Simulacros Aleatorios</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Enfrenta examenes de preparatorios generados dinamicamente con preguntas que simulan la presion de tiempo, estructura y complejidad de las pruebas reales de la facultad.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Modo Practica</span>
              <span className="text-amber-600">Simulacion real</span>
            </div>
          </motion.div>

          <motion.div 
            whileHover={shouldReduce ? undefined : { y: -4 }}
            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Seguimiento de Progreso</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Visualiza tu evolucion a traves de metricas detalladas e historial completo. Identifica rapidamente tus areas debiles en la doctrina para enfocar tu tiempo de estudio eficazmente.
              </p>
            </div>
            <div className="pt-6">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Meta de Aprobacion</span>
                <span className="text-emerald-600">75% Completado</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            whileHover={shouldReduce ? undefined : { y: -4 }}
            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Contenido Juridico Actualizado</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Accede a un pool de preguntas cuidadosamente elaboradas y revisadas por docentes y jurisprudencia actualizada al Codigo General del Proceso y Codigos de fondo vigentes.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Ultima Actualizacion</span>
              <span className="text-emerald-600">Al dia en 2026</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
