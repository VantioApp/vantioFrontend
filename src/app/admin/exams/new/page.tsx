'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { useAuthStore } from '@/stores/authStore';
import { useAuthHydration } from '@/hooks/useAuthHydration';
import api from '@/lib/api';
import type { AdminSubjectsResponse } from '@/types';
import { QuestionFormModal } from '@/components/admin/QuestionFormModal';

export default function NewQuestionPage() {
  const router = useRouter();
  const user = useAuthStore((s) => s.user);
  const token = useAuthStore((s) => s.token);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const isHydrated = useAuthHydration();
  const [subjects, setSubjects] = useState<AdminSubjectsResponse>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);

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
        const data = await api.get<AdminSubjectsResponse>('/admin/subjects', token);
        setSubjects(data);
        setShowForm(true);
      } catch (err) {
        console.error('Failed to load subjects:', err);
      } finally {
        setLoading(false);
      }
    };

    loadSubjects();
  }, [isAuthenticated, user]);

  if (!user) return null;

  if (loading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-12 text-center">
        <p className="text-sm text-slate-400">Cargando...</p>
      </div>
    );
  }

  return (
    <>
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push('/admin/exams')}
          className="p-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">
            Nueva Pregunta
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Crea una nueva pregunta para el banco
          </p>
        </div>
      </div>

      {showForm && (
        <QuestionFormModal
          question={null}
          subjects={subjects}
          onClose={() => router.push('/admin/exams')}
          onSuccess={() => router.push('/admin/exams')}
          token={token}
        />
      )}
    </>
  );
}
