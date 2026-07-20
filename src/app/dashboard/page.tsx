'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { LogOut, BookOpen, Users, CheckCircle2, XCircle } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useAuthStore } from '@/stores/authStore';
import { useQuizStore } from '@/stores/quizStore';
import { useAuthHydration } from '@/hooks/useAuthHydration';
import api from '@/lib/api';
import { formatDate } from '@/lib/utils';

interface TestHistoryItem {
  id: string;
  totalQuestions: number;
  correctCount: number;
  score: number;
  passed: boolean;
  startedAt: string;
  finishedAt: string | null;
}

export default function DashboardPage() {
  const router = useRouter();
  const { user, token, logout, isAuthenticated } = useAuthStore();
  const { startQuiz } = useQuizStore();
  const isHydrated = useAuthHydration();
  const [history, setHistory] = useState<TestHistoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAreaModal, setShowAreaModal] = useState(false);

  useEffect(() => {
    if (!isHydrated) {
      console.log('[Dashboard] Waiting for hydration...');
      return;
    }
    
    console.log('[Dashboard] Hydrated. isAuthenticated:', isAuthenticated, 'user:', user?.name);
    
    // El proxy ya protege contra usuarios no autenticados
    // Si llegamos aquí y no hay usuario, algo está mal
    if (!user) {
      console.log('[Dashboard] No user after hydration, redirecting to login');
      router.push('/login');
    }
  }, [isHydrated, user, router]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const loadHistory = async () => {
      try {
        setLoading(true);
        const data = await api.get<TestHistoryItem[]>(`/quiz/history/${user.id}`, token);
        setHistory(data);
      } catch (err) {
        console.error('Failed to load history:', err);
      } finally {
        setLoading(false);
      }
    };

    loadHistory();
  }, [isAuthenticated, user]);

  const handleStartQuiz = async (area: string) => {
    setShowAreaModal(false);
    try {
      await startQuiz(area);
      const { testId } = useQuizStore.getState();
      if (testId) router.push(`/quiz/${testId}`);
    } catch (err) {
      console.error('Failed to start quiz:', err);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  if (!user) return null;

  const memberSince = user.createdAt ? formatDate(user.createdAt) : 'N/A';

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased">
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo variant="full" theme="light" height={36} />
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
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Dashboard</h1>
            <p className="text-sm text-slate-500 mt-1">Welcome back to your academic progress.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col items-center text-center lg:col-span-1">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-4 border-slate-50 shadow-sm bg-slate-100 flex items-center justify-center">
                {user.avatarUrl ? (
                  <Image src={user.avatarUrl} alt={user.name} width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-12 h-12 text-slate-400" />
                )}
              </div>
              <h2 className="font-serif text-xl font-bold text-slate-900">{user.name}</h2>
              <p className="text-sm text-slate-500 mt-1 mb-6">Member since: {memberSince}</p>
              <button className="w-full border border-slate-300 text-slate-900 py-2 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors">
                Editar Perfil
              </button>
            </div>

            <div className="lg:col-span-2 flex flex-col gap-6">
              <div className="bg-amber-600 text-white rounded-xl p-8 flex flex-col sm:flex-row items-center justify-between shadow-sm relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white to-transparent pointer-events-none"></div>
                <div className="z-10 text-center sm:text-left mb-4 sm:mb-0">
                  <h3 className="font-serif text-2xl md:text-3xl font-bold">Preparación Intensiva</h3>
                  <p className="text-sm opacity-90 mt-2 max-w-md">Continúa tu preparación para el examen final con una nueva prueba de simulación completa.</p>
                </div>
                <button
                  onClick={() => setShowAreaModal(true)}
                  className="z-10 bg-white text-amber-700 px-6 py-3 rounded-lg text-sm font-bold hover:bg-opacity-95 shadow-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap"
                >
                  Iniciar Nueva Prueba
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex-1">
                <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
                  <h3 className="font-serif text-xl font-bold text-slate-900">Mi Historial de Pruebas</h3>
                  <button className="text-amber-600 text-xs font-semibold hover:underline">Ver Todo</button>
                </div>

                {loading ? (
                  <p className="text-center py-8 text-slate-400 text-sm">Cargando historial...</p>
                ) : history.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="border-b border-slate-200 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                          <th className="py-3 px-2 font-medium">Prueba</th>
                          <th className="py-3 px-2 font-medium">Fecha</th>
                          <th className="py-3 px-2 font-medium">Puntaje</th>
                          <th className="py-3 px-2 font-medium text-right">Estado</th>
                        </tr>
                      </thead>
                      <tbody className="text-sm">
                        {history.map((test) => (
                          <tr key={test.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                            <td className="py-4 px-2 font-medium text-slate-900">Simulacro #{test.id.slice(0, 8)}</td>
                            <td className="py-4 px-2 text-slate-600">
                              {test.finishedAt ? formatDate(test.finishedAt) : formatDate(test.startedAt)}
                            </td>
                            <td className="py-4 px-2 text-slate-900 font-semibold">
                              {Math.round(test.score)}/100
                            </td>
                            <td className="py-4 px-2 text-right">
                              {test.passed ? (
                                <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-1 rounded text-xs font-semibold">
                                  <CheckCircle2 className="w-3.5 h-3.5" />
                                  Aprobado
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 bg-rose-50 text-rose-700 border border-rose-200 px-2 py-1 rounded text-xs font-semibold">
                                  <XCircle className="w-3.5 h-3.5" />
                                  Requiere Refuerzo
                                </span>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-center py-12 border border-dashed border-slate-200 rounded-lg">
                    <BookOpen className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                    <p className="text-sm font-medium text-slate-500">Aún no has completado ninguna prueba.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showAreaModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
            <h3 className="font-serif text-xl font-bold text-slate-900 mb-2">Selecciona un área</h3>
            <p className="text-sm text-slate-500 mb-6">Elige el área de conocimiento para tu nueva prueba.</p>

            <div className="space-y-3">
              <button
                onClick={() => handleStartQuiz('Derecho Penal')}
                className="w-full p-4 border border-slate-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Derecho Penal</p>
                    <p className="text-xs text-slate-500">Teoría del Delito, Bienes Jurídicos, Procedimiento Penal</p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => handleStartQuiz('Derecho Privado')}
                className="w-full p-4 border border-slate-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <BookOpen className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="font-semibold text-slate-900">Derecho Privado</p>
                    <p className="text-xs text-slate-500">Civiles I, Civiles II, Preguntas Adicionales</p>
                  </div>
                </div>
              </button>
            </div>

            <button
              onClick={() => setShowAreaModal(false)}
              className="w-full mt-4 py-2 text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      <footer className="bg-slate-900 py-6 border-t border-slate-800 text-center">
        <p className="text-xs text-slate-500">
          © 2026 Vantio Legal Education. Todos los derechos reservados. Excelencia Profesional en el Derecho.
        </p>
      </footer>
    </div>
  );
}
