'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { Scale, Play, LogOut, Award, BookOpen } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useQuizStore } from '@/stores/quizStore';

export default function DashboardPage() {
  const router = useRouter();
  const { user, logout, isAuthenticated } = useAuthStore();
  const { startQuiz } = useQuizStore();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login');
    }
  }, [isAuthenticated, router]);

  const handleStartQuiz = async () => {
    try {
      await startQuiz('penal-subject-id');
      router.push('/quiz/active');
    } catch (error) {
      console.error('Failed to start quiz:', error);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-8 h-8 text-slate-900" />
            <span className="font-serif text-2xl font-bold text-slate-900 tracking-tight">Vantio</span>
          </Link>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-semibold text-slate-400">ESTUDIANTE</span>
              <span className="text-sm font-bold text-slate-900">{user.name}</span>
            </div>
            
            <button 
              onClick={handleLogout}
              title="Cerrar Sesión"
              className="flex items-center justify-center p-2 rounded-lg border border-slate-200 hover:bg-rose-50 text-slate-500 hover:text-rose-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow py-12 px-6">
        <div className="max-w-5xl mx-auto flex flex-col gap-8">
          <div>
            <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Hola, {user.name}</h1>
            <p className="text-sm text-slate-500 mt-1">Sigue tu progreso académico y prepárate para aprobar.</p>
          </div>

          <div className="relative bg-amber-600 rounded-xl p-8 text-white shadow-md overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none" />
            
            <div className="text-center md:text-left">
              <span className="inline-flex items-center gap-1 bg-amber-700/55 text-white border border-amber-400/30 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider mb-3">
                Estudio Aleatorio
              </span>
              <h3 className="font-serif text-3xl font-bold tracking-tight mb-2">Preparación Intensiva</h3>
              <p className="text-sm text-white/90 leading-relaxed max-w-md">
                Continúa tu preparación para el examen final rindiendo un simulacro aleatorio de preguntas claves.
              </p>
            </div>

            <button
              onClick={handleStartQuiz}
              className="bg-white text-slate-950 hover:bg-slate-50 font-bold px-6 py-4 rounded-lg flex items-center gap-2 shadow-sm hover:shadow-md transition-all active:scale-95 whitespace-nowrap"
            >
              <Play className="w-4 h-4 fill-slate-950" />
              Iniciar Nueva Prueba
            </button>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-600" />
              Mi Historial de Pruebas
            </h3>

            <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
              <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-500">Aún no has completado ninguna prueba.</p>
              <button 
                onClick={handleStartQuiz}
                className="text-xs font-bold text-amber-600 mt-2 hover:underline"
              >
                Inicia tu primer simulacro aquí
              </button>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-slate-900 py-6 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500">
          © 2026 Vantio Legal Education. Todos los derechos reservados. Excelencia Profesional en el Derecho.
        </p>
      </footer>
    </div>
  );
}
