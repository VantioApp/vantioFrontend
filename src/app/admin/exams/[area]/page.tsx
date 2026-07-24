'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { useQueryClient } from '@tanstack/react-query';
import {
  ArrowLeft, Search, Filter, Plus, Eye, EyeOff, Edit2, ChevronLeft, ChevronRight, Loader2,
} from 'lucide-react';
import { useAuthStore } from '@/presentation/stores/authStore';
import { useAuthHydration } from '@/presentation/hooks/use-auth-hydration';
import { useAdminSubjects } from '@/presentation/hooks/use-admin-subjects';
import { useAdminQuestions } from '@/presentation/hooks/use-admin-questions';
import { useToggleQuestion } from '@/presentation/hooks/use-toggle-question';
import type { AdminQuestion } from '@/core/interfaces';

const QuestionFormModal = dynamic(() => import('@/presentation/components/admin/QuestionFormModal').then((m) => m.QuestionFormModal), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"><div className="bg-white rounded-xl shadow-xl max-w-3xl w-full p-8 text-center"><p className="text-sm text-slate-400">Cargando...</p></div></div>,
});

export default function AreaQuestionsPage() {
  const router = useRouter();
  const params = useParams();
  const queryClient = useQueryClient();
  const area = decodeURIComponent(params.area as string);
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthHydration();

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [subjectFilter, setSubjectFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [showFormModal, setShowFormModal] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<AdminQuestion | null>(null);


  const { data: allSubjects = [] } = useAdminSubjects();
  const subjects = allSubjects.filter((s) => s.area === area);

  const { data: questionsData, isLoading } = useAdminQuestions({
    area,
    page,
    limit: 20,
    search: search || undefined,
    subjectId: subjectFilter || undefined,
    isActive: statusFilter === '' ? undefined : statusFilter === 'true',
  });

  const questions = questionsData?.questions ?? [];
  const totalPages = questionsData?.totalPages ?? 1;
  const total = questionsData?.total ?? 0;

  const toggleMutation = useToggleQuestion(area, page, search, subjectFilter, statusFilter);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isHydrated, isAuthenticated, user, router]);

  if (!user) return null;

  const handleEdit = (question: AdminQuestion) => {
    setEditingQuestion(question);
    setShowFormModal(true);
  };

  const handleCreate = () => {
    setEditingQuestion(null);
    setShowFormModal(true);
  };

  const handleFormSuccess = () => {
    setShowFormModal(false);
    setEditingQuestion(null);
    setPage(1);
    queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
    queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
    router.refresh();
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push('/admin/exams')}
            className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex-1">
            <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">
              {area}
            </h1>
            <p className="text-sm text-slate-500 mt-1">
              {total} preguntas en total
            </p>
          </div>
          <button
            onClick={handleCreate}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-600 text-white rounded-lg text-sm font-semibold hover:bg-amber-500 transition-colors shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            Nueva Pregunta
          </button>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm">
          <div className="border-b border-slate-200 px-6 py-4 bg-slate-50/50">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Buscar pregunta..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-slate-900 transition-colors"
                />
              </div>

              <select
                value={subjectFilter}
                onChange={(e) => {
                  setSubjectFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-slate-900 transition-colors cursor-pointer"
              >
                <option value="">Todas las materias</option>
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.questionCount})
                  </option>
                ))}
              </select>

              <select
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value);
                  setPage(1);
                }}
                className="px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white focus:outline-none focus:border-slate-900 transition-colors cursor-pointer"
              >
                <option value="">Todos los estados</option>
                <option value="true">Activas</option>
                <option value="false">Inactivas</option>
              </select>
            </div>
          </div>

          {isLoading ? (
            <div className="p-8 text-center">
              <p className="text-sm text-slate-400">Cargando preguntas...</p>
            </div>
          ) : questions.length === 0 ? (
            <div className="p-8 text-center">
              <Filter className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <p className="text-sm font-medium text-slate-500">
                No se encontraron preguntas
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {questions.map((question) => (
                <div
                  key={question.id}
                  className={`p-4 hover:bg-slate-50 transition-colors ${
                    !question.isActive ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-0.5 bg-slate-100 text-slate-600 rounded text-xs font-medium">
                          {question.subject.name}
                        </span>
                        <span
                          className={`px-2 py-0.5 rounded text-xs font-semibold ${
                            question.isActive
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-slate-100 text-slate-500 border border-slate-200'
                          }`}
                        >
                          {question.isActive ? 'Activa' : 'Inactiva'}
                        </span>
                        <span className="text-xs text-slate-400">
                          Dificultad: {question.difficulty}
                        </span>
                      </div>

                      <p className="text-sm text-slate-900 font-medium line-clamp-2 mb-2">
                        {question.text}
                      </p>

                      <div className="flex flex-wrap gap-1.5">
                        {question.options.map((opt) => (
                          <span
                            key={opt.label}
                            className={`px-2 py-0.5 rounded text-xs font-medium ${
                              question.correctAnswer === opt.label
                                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-50 text-slate-500 border border-slate-100'
                            }`}
                          >
                            {opt.label}: {opt.text.substring(0, 40)}...
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => toggleMutation.mutate(question.id)}
                        disabled={toggleMutation.isPending && toggleMutation.variables === question.id}
                        className={`p-2 rounded-lg transition-colors cursor-pointer disabled:opacity-50 ${
                          question.isActive
                            ? 'text-emerald-600 hover:bg-emerald-50'
                            : 'text-slate-400 hover:bg-slate-100'
                        }`}
                        title={question.isActive ? 'Desactivar' : 'Activar'}
                      >
                        {toggleMutation.isPending && toggleMutation.variables === question.id ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : question.isActive ? (
                          <Eye className="w-4 h-4" />
                        ) : (
                          <EyeOff className="w-4 h-4" />
                        )}
                      </button>
                      <button
                        onClick={() => handleEdit(question)}
                        className="p-2 text-slate-500 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-colors cursor-pointer"
                        title="Editar"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {totalPages > 1 && (
            <div className="border-t border-slate-200 px-6 py-4 bg-slate-50/50 flex justify-between items-center">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Anterior
              </button>
              <span className="text-xs text-slate-500">
                Página {page} de {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-4 py-2 text-xs font-semibold rounded-lg border border-slate-200 bg-white hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
              >
                Siguiente
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>

      {showFormModal && (
        <QuestionFormModal
          question={editingQuestion}
          subjects={subjects}
          onClose={() => {
            setShowFormModal(false);
            setEditingQuestion(null);
          }}
          onSuccess={handleFormSuccess}
        />
      )}
    </>
  );
}
