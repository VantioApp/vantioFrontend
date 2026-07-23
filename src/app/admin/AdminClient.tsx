'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Users, FileText, TrendingUp, BookOpen, AlertCircle } from 'lucide-react';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';
import { useAdminStats } from '@/presentation/hooks/use-admin-stats';
import { formatDate } from '@/core/utils/format-date';
import type { AdminStats } from '@/core/interfaces';

interface AdminClientProps {
  initialStats: AdminStats | null;
}

export default function AdminClient({ initialStats }: AdminClientProps) {
  const router = useRouter();
  const { user: storeUser } = useAuthStore();
  const isHydrated = useAuthHydration();
  const [days, setDays] = useState(7);

  const user = storeUser;

  const { data: stats = initialStats, isLoading } = useAdminStats(
    days,
    initialStats && days === 7 ? initialStats : undefined
  );

  useEffect(() => {
    if (!isHydrated) {
      console.log('[Admin] Waiting for hydration...');
      return;
    }

    console.log('[Admin] Hydrated. user.role:', user?.role);

    if (user?.role !== 'admin') {
      console.log('[Admin] User is not admin, redirecting to dashboard');
      router.push('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHydrated, user, router]);

  if (!user) return null;

  const memberSince = user.createdAt ? formatDate(user.createdAt) : 'N/A';

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-slate-500 mt-1">Welcome back to your academic progress.</p>
        </div>
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
              <h3 className="font-serif text-2xl md:text-3xl font-bold">Preparacion Intensiva</h3>
              <p className="text-sm opacity-90 mt-2 max-w-md">Continua tu preparacion para el examen final con una nueva prueba de simulacion completa.</p>
            </div>
            <button className="z-10 bg-white text-amber-700 px-6 py-3 rounded-lg text-sm font-bold hover:bg-opacity-95 shadow-sm transition-all hover:scale-105 active:scale-95 whitespace-nowrap">
              Iniciar Nueva Prueba
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Users</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">{stats?.totalUsers || 0}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-slate-100 text-slate-900 rounded-lg flex items-center justify-center">
                <FileText className="w-6 h-6" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Exams</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">{stats?.totalTests || 0}</p>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center border border-amber-200">
                <TrendingUp className="w-6 h-6 text-amber-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Average Score</p>
                <p className="text-2xl font-bold text-slate-950 mt-0.5">{stats?.averageScore || 0}%</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <div className="flex justify-between items-center mb-4 pb-3 border-b border-slate-200">
              <h3 className="font-serif text-xl font-bold text-slate-900">Mi Historial de Pruebas</h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setDays(7)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    days === 7 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  7 dias
                </button>
                <button
                  onClick={() => setDays(30)}
                  className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                    days === 30 ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  30 dias
                </button>
              </div>
            </div>

            {isLoading ? (
              <p className="text-center py-8 text-slate-400 text-sm">Cargando estadisticas...</p>
            ) : stats ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="w-5 h-5 text-slate-600" />
                    <span className="text-sm font-medium text-slate-700">Personas que han realizado pruebas</span>
                  </div>
                  <span className="text-lg font-bold text-slate-900">{stats.recentTestTakers}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {stats.availableAreas.map((area) => (
                    <div key={area.area} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <BookOpen className="w-4 h-4 text-amber-600" />
                        <span className="text-sm font-semibold text-slate-900">{area.area}</span>
                      </div>
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{area.subjectCount} materias</span>
                        <span>{area.totalQuestions} preguntas</span>
                      </div>
                    </div>
                  ))}
                </div>

                {stats.testsByArea.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold text-slate-700 mb-2">Pruebas por area</h4>
                    <div className="space-y-2">
                      {stats.testsByArea.map((area) => (
                        <div key={area.area} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <span className="text-sm text-slate-700">{area.area}</span>
                          <div className="flex items-center gap-4">
                            <span className="text-xs text-slate-500">{area.totalTests} pruebas</span>
                            <span className="text-sm font-bold text-slate-900">{area.averageScore}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-8 border border-dashed border-slate-200 rounded-lg">
                <AlertCircle className="w-10 h-10 text-slate-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-slate-500">No se pudieron cargar las estadisticas.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
