'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { BookOpen, FileText, Plus, Upload } from 'lucide-react';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';
import { useAdminSubjects } from '@/presentation/hooks/use-admin-subjects';
import type { AdminSubject } from '@/core/interfaces';

const ImportJsonModal = dynamic(() => import('@/presentation/components/admin/ImportJsonModal'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-8 text-center"><p className="text-sm text-slate-400">Cargando...</p></div></div>,
});

const CreateAreaModal = dynamic(() => import('@/presentation/components/admin/CreateAreaModal'), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl shadow-xl max-w-md w-full p-8 text-center"><p className="text-sm text-slate-400">Cargando...</p></div></div>,
});

interface AreaStats {
  area: string;
  subjects: AdminSubject[];
  totalQuestions: number;
  activeQuestions: number;
}

export default function AdminExamsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthHydration();
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCreateAreaModal, setShowCreateAreaModal] = useState(false);

  const { data: subjects = [], isLoading } = useAdminSubjects();

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isHydrated, isAuthenticated, user, router]);

  if (!user) return null;

  const areas: AreaStats[] = [];
  const areaMap = new Map<string, AreaStats>();

  for (const subject of subjects) {
    if (!areaMap.has(subject.area)) {
      areaMap.set(subject.area, {
        area: subject.area,
        subjects: [],
        totalQuestions: 0,
        activeQuestions: 0,
      });
    }
    const area = areaMap.get(subject.area)!;
    area.subjects.push(subject);
    area.totalQuestions += subject.questionCount;
    area.activeQuestions += subject.activeQuestionCount;
  }

  areas.push(...areaMap.values());

  const handleAreaClick = (area: string) => {
    router.push(`/admin/exams/${encodeURIComponent(area)}`);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">
            Gestión de Preguntas
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Administra las preguntas por área de conocimiento
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowImportModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-700 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-colors cursor-pointer"
          >
            <Upload className="w-4 h-4" />
            Importar JSON
          </button>
          <button
            onClick={() => setShowCreateAreaModal(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-500 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nueva Área
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <p className="text-sm text-slate-400">Cargando áreas...</p>
        </div>
      ) : areas.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
          <BookOpen className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <h2 className="font-serif text-xl font-bold text-slate-900 mb-2">
            No hay áreas configuradas
          </h2>
          <p className="text-sm text-slate-500">
            Importa preguntas desde JSON para crear las áreas
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {areas.map((area) => (
            <button
              key={area.area}
              onClick={() => handleAreaClick(area.area)}
              className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 text-left hover:border-amber-300 hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-lg flex items-center justify-center border border-amber-200">
                  <BookOpen className="w-6 h-6" />
                </div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {area.subjects.length} materias
                </span>
              </div>

              <h3 className="font-serif text-xl font-bold text-slate-900 mb-2 group-hover:text-amber-700 transition-colors">
                {area.area}
              </h3>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total preguntas</span>
                  <span className="font-semibold text-slate-900">{area.totalQuestions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Activas</span>
                  <span className="font-semibold text-emerald-600">{area.activeQuestions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Inactivas</span>
                  <span className="font-semibold text-slate-400">
                    {area.totalQuestions - area.activeQuestions}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100">
                <p className="text-xs text-slate-400 mb-2">Materias:</p>
                <div className="flex flex-wrap gap-1.5">
                  {area.subjects.slice(0, 3).map((subject) => (
                    <span
                      key={subject.id}
                      className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium"
                    >
                      {subject.name}
                    </span>
                  ))}
                  {area.subjects.length > 3 && (
                    <span className="px-2 py-0.5 bg-slate-100 text-slate-400 rounded text-xs font-medium">
                      +{area.subjects.length - 3} más
                    </span>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center text-amber-600 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                <FileText className="w-4 h-4 mr-1" />
                Ver preguntas
              </div>
            </button>
          ))}
        </div>
      )}

      {showImportModal && (
        <ImportJsonModal
          onClose={() => setShowImportModal(false)}
          onSuccess={() => {
            setShowImportModal(false);
            router.refresh();
          }}
        />
      )}

      {showCreateAreaModal && (
        <CreateAreaModal
          onClose={() => setShowCreateAreaModal(false)}
          onSuccess={() => {
            setShowCreateAreaModal(false);
            router.refresh();
          }}
        />
      )}
    </>
  );
}
