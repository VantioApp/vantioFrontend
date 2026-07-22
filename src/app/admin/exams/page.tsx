'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, FileText, Plus, Upload, X } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useAuthHydration } from '@/hooks/useAuthHydration';
import api from '@/lib/api';
import type { AdminSubjectsResponse } from '@/types';

interface AreaStats {
  area: string;
  subjects: AdminSubjectsResponse;
  totalQuestions: number;
  activeQuestions: number;
}

export default function AdminExamsPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthHydration();
  const [subjects, setSubjects] = useState<AdminSubjectsResponse>([]);
  const [loading, setLoading] = useState(true);
  const [showImportModal, setShowImportModal] = useState(false);
  const [showCreateAreaModal, setShowCreateAreaModal] = useState(false);

  useEffect(() => {
    if (!isHydrated) return;
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isHydrated, isAuthenticated, user, router]);

  useEffect(() => {
    if (!isAuthenticated || !user) return;

    const loadSubjects = async () => {
      try {
        setLoading(true);
        const data = await api.get<AdminSubjectsResponse>('/admin/subjects', token);
        setSubjects(data);
      } catch (err) {
        console.error('Failed to load subjects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, [isAuthenticated, user, token]);

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

      {loading ? (
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
          token={token}
        />
      )}

      {showCreateAreaModal && (
        <CreateAreaModal
          onClose={() => setShowCreateAreaModal(false)}
          onSuccess={() => {
            setShowCreateAreaModal(false);
            router.refresh();
          }}
          token={token}
        />
      )}
    </>
  );
}

function CreateAreaModal({
  onClose,
  onSuccess,
  token,
}: {
  onClose: () => void;
  onSuccess: () => void;
  token: string | null;
}) {
  const [areaName, setAreaName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    if (!areaName.trim()) {
      setError('El nombre del área es requerido');
      return;
    }

    try {
      setLoading(true);
      setError('');
      await api.post('/admin/areas', { name: areaName.trim() }, token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al crear área');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center">
          <div>
            <h2 className="font-serif text-xl font-bold text-slate-900">Crear Nueva Área</h2>
            <p className="text-sm text-slate-500 mt-1">
              Crea una nueva categoría para organizar preguntas
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Nombre del área *
            </label>
            <input
              type="text"
              value={areaName}
              onChange={(e) => setAreaName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
              placeholder="Ej: Derecho Laboral, Contabilidad, etc."
              autoFocus
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-700">
              {error}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!areaName.trim() || loading}
            className="px-4 py-2 text-sm font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading ? 'Creando...' : 'Crear Área'}
          </button>
        </div>
      </div>
    </div>
  );
}

function ImportJsonModal({
  onClose,
  onSuccess,
  token,
}: {
  onClose: () => void;
  onSuccess: () => void;
  token: string | null;
}) {
  const [jsonContent, setJsonContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonContent(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      setError('');
      const data = JSON.parse(jsonContent);
      await api.post('/admin/questions/import', data, token);
      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al importar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-serif text-xl font-bold text-slate-900">Importar Preguntas</h2>
          <p className="text-sm text-slate-500 mt-1">
            Sube un archivo JSON con el formato estándar de Vantio
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Archivo JSON
            </label>
            <input
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
            />
          </div>

          {jsonContent && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Contenido (preview)
              </label>
              <textarea
                value={jsonContent}
                onChange={(e) => setJsonContent(e.target.value)}
                rows={10}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-xs font-mono focus:outline-none focus:border-slate-900"
              />
            </div>
          )}

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-700">
              {error}
            </div>
          )}
        </div>

        <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubmit}
            disabled={!jsonContent || loading}
            className="px-4 py-2 text-sm font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading ? 'Importando...' : 'Importar'}
          </button>
        </div>
      </div>
    </div>
  );
}
