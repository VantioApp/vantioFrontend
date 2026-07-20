'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import api from '@/lib/api';
import type { AdminQuestion, AdminSubjectsResponse, QuestionOption } from '@/types';

interface QuestionFormModalProps {
  question: AdminQuestion | null;
  subjects: AdminSubjectsResponse;
  onClose: () => void;
  onSuccess: () => void;
  token: string | null;
}

export function QuestionFormModal({
  question,
  subjects,
  onClose,
  onSuccess,
  token,
}: QuestionFormModalProps) {
  const [text, setText] = useState(question?.text || '');
  const [options, setOptions] = useState<QuestionOption[]>(
    question?.options || [
      { label: 'A', text: '' },
      { label: 'B', text: '' },
      { label: 'C', text: '' },
      { label: 'D', text: '' },
    ],
  );
  const [correctAnswers, setCorrectAnswers] = useState<string[]>(
    question?.correctAnswers || [],
  );
  const [explanation, setExplanation] = useState(question?.explanation || '');
  const [difficulty, setDifficulty] = useState(question?.difficulty || 1);
  const [subjectId, setSubjectId] = useState(question?.subjectId || subjects[0]?.id || '');
  const [source, setSource] = useState(question?.source || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleOptionChange = (index: number, field: 'label' | 'text', value: string) => {
    const newOptions = [...options];
    newOptions[index] = { ...newOptions[index], [field]: value };
    setOptions(newOptions);
  };

  const handleAddOption = () => {
    const nextLabel = String.fromCharCode(65 + options.length);
    setOptions([...options, { label: nextLabel, text: '' }]);
  };

  const handleRemoveOption = (index: number) => {
    if (options.length <= 2) return;
    const newOptions = options.filter((_, i) => i !== index);
    setOptions(newOptions);
    setCorrectAnswers(correctAnswers.filter((a) => a !== options[index].label));
  };

  const toggleCorrectAnswer = (label: string) => {
    if (correctAnswers.includes(label)) {
      setCorrectAnswers(correctAnswers.filter((a) => a !== label));
    } else {
      setCorrectAnswers([...correctAnswers, label]);
    }
  };

  const handleSubmit = async () => {
    if (!text.trim()) {
      setError('El texto de la pregunta es requerido');
      return;
    }
    if (options.some((o) => !o.text.trim())) {
      setError('Todas las opciones deben tener texto');
      return;
    }
    if (correctAnswers.length === 0) {
      setError('Debes seleccionar al menos una respuesta correcta');
      return;
    }
    if (!subjectId) {
      setError('Debes seleccionar una materia');
      return;
    }

    try {
      setLoading(true);
      setError('');

      const data = {
        text,
        options,
        correctAnswers,
        explanation: explanation || undefined,
        difficulty,
        subjectId,
        source: source || undefined,
      };

      if (question) {
        await api.put(`/admin/questions/${question.id}`, data, token);
      } else {
        await api.post('/admin/questions', data, token);
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-200">
          <h2 className="font-serif text-xl font-bold text-slate-900">
            {question ? 'Editar Pregunta' : 'Nueva Pregunta'}
          </h2>
          <p className="text-sm text-slate-500 mt-1">
            {question ? 'Modifica los campos de la pregunta' : 'Completa los campos para crear una nueva pregunta'}
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Materia *
            </label>
            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 cursor-pointer"
            >
              <option value="">Seleccionar materia</option>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Texto de la pregunta *
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
              placeholder="Escribe la pregunta aquí..."
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Opciones de respuesta *
            </label>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option.label}
                    onChange={(e) => handleOptionChange(index, 'label', e.target.value)}
                    className="w-16 px-2 py-2 border border-slate-200 rounded-lg text-sm text-center focus:outline-none focus:border-slate-900"
                    placeholder="A"
                  />
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                    className="flex-1 px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                    placeholder="Texto de la opción"
                  />
                  <button
                    type="button"
                    onClick={() => toggleCorrectAnswer(option.label)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      correctAnswers.includes(option.label)
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {correctAnswers.includes(option.label) ? 'Correcta' : 'Marcar'}
                  </button>
                  {options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveOption(index)}
                      className="p-2 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={handleAddOption}
              className="mt-2 flex items-center gap-1 text-xs font-semibold text-amber-600 hover:text-amber-700 cursor-pointer"
            >
              <Plus className="w-3 h-3" />
              Agregar opción
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Dificultad
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900 cursor-pointer"
              >
                <option value={1}>1 - Fácil</option>
                <option value={2}>2 - Medio</option>
                <option value={3}>3 - Difícil</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Fuente
              </label>
              <input
                type="text"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
                placeholder="PDF, página, etc."
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Explicación
            </label>
            <textarea
              value={explanation}
              onChange={(e) => setExplanation(e.target.value)}
              rows={2}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-slate-900"
              placeholder="Explicación de la respuesta correcta..."
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
            disabled={loading}
            className="px-4 py-2 text-sm font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {loading ? 'Guardando...' : question ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </div>
    </div>
  );
}
