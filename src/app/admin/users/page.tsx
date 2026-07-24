'use client';

import { Fragment, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Users, Search, Mail, Calendar, Award, TrendingUp, ChevronDown, ChevronRight, GraduationCap } from 'lucide-react';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';
import { useAdminUsers } from '@/presentation/hooks/use-admin-users';
import { formatDate } from '@/core/utils/format-date';

export default function AdminUsersPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isHydrated = useAuthHydration();
  const [searchTerm, setSearchTerm] = useState('');
  const [page, setPage] = useState(1);
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  const { data: usersData, isLoading } = useAdminUsers({
    search: searchTerm || undefined,
    page,
    limit: 20,
  });

  useEffect(() => {
    if (!isHydrated) {
      console.log('[AdminUsers] Waiting for hydration...');
      return;
    }
    
    console.log('[AdminUsers] Hydrated. user.role:', user?.role);
    
    if (user?.role !== 'admin') {
      console.log('[AdminUsers] User is not admin, redirecting to dashboard');
      router.push('/dashboard');
    }
  }, [isHydrated, user, router]);

  if (!user) return null;

  const toggleExpand = (userId: string) => {
    setExpandedUserId(expandedUserId === userId ? null : userId);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">User Management</h1>
          <p className="text-sm text-slate-500 mt-1">Dashboard metrics and administration.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-200 px-6 py-4 bg-slate-50/50 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Buscar por nombre o correo..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full sm:w-64 pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-slate-900 transition-colors"
            />
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Users className="w-4 h-4" />
            <span>{usersData?.total || 0} usuarios</span>
          </div>
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <p className="text-sm text-slate-400">Cargando usuarios...</p>
          </div>
        ) : usersData && usersData.users.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50">
                  <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nombre</th>
                  <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Email</th>
                  <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Fecha de Registro</th>
                  <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Pruebas</th>
                  <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Puntaje Promedio</th>
                  <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Areas Inscritas</th>
                  <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Rol</th>
                  <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Estado</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {usersData.users.map((u) => (
                  <Fragment key={u.id}>
                    <tr className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900">{u.name}</td>
                      <td className="py-4 px-6 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          {u.email}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-slate-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {formatDate(u.createdAt)}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Award className="w-3.5 h-3.5 text-amber-600" />
                          <span className="font-semibold text-slate-900">{u.totalTests}</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="font-semibold text-slate-900">{u.averageScore}%</span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <button
                          onClick={() => toggleExpand(u.id)}
                          className="flex items-center gap-2 text-left hover:bg-slate-100 px-2 py-1 rounded transition-colors cursor-pointer"
                        >
                          {expandedUserId === u.id ? (
                            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                          )}
                          <div className="flex items-center gap-1.5">
                            <GraduationCap className="w-3.5 h-3.5 text-amber-600" />
                            <span className="font-semibold text-slate-900">{u.enrolledAreasCount}</span>
                            <span className="text-slate-400 text-xs">/ {u.enrolledAreasCount === 1 ? 'area' : 'areas'}</span>
                          </div>
                        </button>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`inline-flex px-2 py-1 rounded text-xs font-semibold ${
                          u.role === 'admin' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {u.role === 'admin' ? 'Admin' : 'Student'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          Activo
                        </span>
                      </td>
                    </tr>
                    {expandedUserId === u.id && u.enrolledAreas.length > 0 && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={8} className="py-3 px-6">
                          <div className="flex flex-wrap gap-2">
                            {u.enrolledAreas.map((area) => (
                              <span
                                key={area}
                                className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded text-xs font-medium"
                              >
                                <GraduationCap className="w-3 h-3" />
                                {area}
                              </span>
                            ))}
                          </div>
                        </td>
                      </tr>
                    )}
                    {expandedUserId === u.id && u.enrolledAreas.length === 0 && (
                      <tr className="bg-slate-50/50">
                        <td colSpan={8} className="py-3 px-6">
                          <p className="text-xs text-slate-400 italic">Sin areas inscritas</p>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-3" />
            <p className="text-sm font-medium text-slate-500">No se encontraron usuarios.</p>
          </div>
        )}

        {usersData && usersData.totalPages > 1 && (
          <div className="border-t border-slate-200 px-6 py-4 bg-slate-50/50 flex justify-between items-center">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Anterior
            </button>
            <span className="text-xs text-slate-500">
              Página {page} de {usersData.totalPages}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(usersData.totalPages, p + 1))}
              disabled={page === usersData.totalPages}
              className="px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </>
  );
}
