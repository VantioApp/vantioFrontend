import Image from 'next/image';
import Link from 'next/link';
import { Scale, ArrowRight, Award, GraduationCap, LineChart, BookOpen } from 'lucide-react';
import { AnimatedDiv } from './AnimatedDiv';

export function HeroSection() {
  return (
    <section className="relative bg-white border-b border-slate-200/60 overflow-hidden py-16 md:py-24">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0f172a 1.5px, transparent 1.5px)', backgroundSize: '32px 32px' }} />
      
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
          <AnimatedDiv 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 border border-slate-200/80"
          >
            <Award className="w-4 h-4 text-amber-600" />
            <span className="text-xs font-semibold text-slate-700 uppercase tracking-wider">Concurso DIAN 2676 · Gestor II · OPEC 236844</span>
          </AnimatedDiv>

          <AnimatedDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-bold leading-[1.1] tracking-tight"
          >
            Prepárate para el <span className="text-slate-900 underline decoration-amber-500/60 decoration-4 underline-offset-8">concurso de la DIAN</span>
          </AnimatedDiv>

          <AnimatedDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-slate-600 leading-relaxed max-w-xl"
          >
            Más de 600 preguntas situacionales organizadas por eje temático, con el Código de Ética y el Diccionario de Competencias de la DIAN, simulacros configurables y métricas de desempeño. También incluye preparación en Derecho Penal y Privado.
          </AnimatedDiv>

          <AnimatedDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto pt-2"
          >
            <Link
              href="/register"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold px-8 py-4 rounded-lg shadow-md hover:shadow-lg transition-all active:scale-95"
            >
              Crear cuenta gratis
              <ArrowRight className="w-5 h-5 text-amber-400" />
            </Link>
            <Link
              href="/login"
              className="w-full sm:w-auto inline-flex items-center justify-center border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-8 py-4 rounded-lg shadow-sm transition-all active:scale-95"
            >
              Iniciar sesión
            </Link>
          </AnimatedDiv>
        </div>

        <div className="lg:col-span-6 relative flex justify-center">
          <AnimatedDiv 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="relative w-full max-w-md aspect-[4/3] rounded-2xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100"
          >
            <Image 
              src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80" 
              alt="Law library study setup with computer"
              fill
              className="object-cover select-none"
              referrerPolicy="no-referrer"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent pointer-events-none" />
            
            <AnimatedDiv 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="absolute bottom-6 left-6 right-6 md:-left-8 md:right-auto md:w-64 bg-white p-4 rounded-xl shadow-lg border border-slate-200/80 flex items-center gap-4"
            >
              <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 flex-shrink-0">
                <GraduationCap className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Banco de preguntas</p>
                <p className="font-serif text-3xl font-bold text-slate-900 mt-0.5">600+</p>
              </div>
            </AnimatedDiv>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight mb-4">
            Herramientas diseñadas para el éxito
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            Práctica con el formato de la prueba, retroalimentación en cada opción y seguimiento de tu avance por eje temático.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatedDiv 
            whileHover={{ y: -4 }}
            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Simulacros Aleatorios</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Genera simulacros de 40, 80, 144 o el número de preguntas que prefieras, con temporizador, y limítalos a los ejes que quieres reforzar.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Tamaño configurable</span>
              <span className="text-amber-600">Por eje temático</span>
            </div>
          </AnimatedDiv>

          <AnimatedDiv 
            whileHover={{ y: -4 }}
            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <LineChart className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Seguimiento de progreso</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Consulta tu historial y el desempeño por tema para identificar rápidamente tus áreas débiles y enfocar tu tiempo de estudio.
              </p>
            </div>
            <div className="pt-6">
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-1.5">
                <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
              </div>
              <div className="flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
                <span>Tu avance</span>
                <span className="text-emerald-600">Por eje</span>
              </div>
            </div>
          </AnimatedDiv>

          <AnimatedDiv 
            whileHover={{ y: -4 }}
            className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 bg-slate-900 text-amber-400 rounded-lg flex items-center justify-center mb-6 shadow-sm">
                <BookOpen className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-bold text-slate-900 mb-3">Contenido con explicaciones</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Cada pregunta explica por qué la respuesta correcta lo es y por qué las demás opciones no, y el banco pasa por revisión de profesionales.
              </p>
            </div>
            <div className="pt-6 border-t border-slate-100 mt-6 flex justify-between items-center text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <span>Convocatoria</span>
              <span className="text-emerald-600">DIAN 2676</span>
            </div>
          </AnimatedDiv>
        </div>
      </div>
    </section>
  );
}

const DIAN_AXES = [
  'Código de Ética',
  'Diccionario de Competencias',
  'Gestión de recaudo',
  'Cobro',
  'Devoluciones',
  'Régimen sancionatorio',
];

export function DianSection() {
  return (
    <section id="dian" className="py-20 bg-white border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-6 flex flex-col gap-5">
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-600">
            Proceso de Selección DIAN 2676
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-slate-900 font-bold tracking-tight">
            Gestor II · OPEC 236844
          </h2>
          <p className="text-slate-600 text-lg leading-relaxed">
            El banco cubre los ejes funcionales del empleo, además de integridad y competencias comportamentales.
            Practica por eje o combina varios en un mismo simulacro.
          </p>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-slate-700">
            {DIAN_AXES.map((axis) => (
              <li key={axis} className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-600 shrink-0" />
                {axis}
              </li>
            ))}
            <li className="flex items-center gap-2 text-slate-500">y más ejes funcionales…</li>
          </ul>
        </div>
        <div className="lg:col-span-6 grid grid-cols-3 gap-4 text-center">
          {[
            { value: '14', label: 'Ejes temáticos' },
            { value: '600+', label: 'Preguntas' },
            { value: '3', label: 'Opciones por pregunta' },
          ].map((stat) => (
            <div key={stat.label} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
              <p className="font-serif text-3xl sm:text-4xl font-bold text-slate-900">{stat.value}</p>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
