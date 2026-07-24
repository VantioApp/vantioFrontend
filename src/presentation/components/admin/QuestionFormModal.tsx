'use client';

import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { useCreateQuestion } from '@/presentation/hooks/use-create-question';
import { useUpdateQuestion } from '@/presentation/hooks/use-update-question';
import type { AdminQuestion, AdminSubject, QuestionOption } from '@/core/interfaces';

interface QuestionFormModalProps {
  question: AdminQuestion | null;
  subjects: AdminSubject[];
  onClose: () => void;
  onSuccess: () => void;
}

export function QuestionFormModal({
  question,
  subjects,
  onClose,
  onSuccess,
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
  const [correctAnswer, setCorrectAnswer] = useState<string>(
    question?.correctAnswer || '',
  );
  const [explanation, setExplanation] = useState(question?.explanation || '');
  const [difficulty, setDifficulty] = useState(question?.difficulty || 1);
  const [subjectId, setSubjectId] = useState(question?.subjectId || subjects[0]?.id || '');
  const [source, setSource] = useState(question?.source || '');
  const [validationError, setValidationError] = useState('');

  const createMutation = useCreateQuestion();
  const updateMutation = useUpdateQuestion();
  const isPending = createMutation.isPending || updateMutation.isPending;
  const error = createMutation.error || updateMutation.error;

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
    if (correctAnswer === options[index].label) {
      setCorrectAnswer('');
    }
  };

  const setCorrectAnswerOption = (label: string) => {
    setCorrectAnswer(correctAnswer === label ? '' : label);
  };

  const handleSubmit = () => {
    if (!text.trim()) {
      setValidationError('El texto de la pregunta es requerido');
      return;
    }
    if (options.some((o) => !o.text.trim())) {
      setValidationError('Todas las opciones deben tener texto');
      return;
    }
    if (correctAnswer === '') {
      setValidationError('Debes seleccionar una respuesta correcta');
      return;
    }
    if (!subjectId) {
      setValidationError('Debes seleccionar una materia');
      return;
    }

    setValidationError('');

    const data = {
      text,
      options,
      correctAnswer,
      explanation: explanation || undefined,
      difficulty,
      subjectId,
      source: source || undefined,
    };

    if (question) {
      updateMutation.mutate(
        { id: question.id, data },
        { onSuccess: () => onSuccess() }
      );
    } else {
      createMutation.mutate(
        data,
        { onSuccess: () => onSuccess() }
      );
    }
  };

  const displayError = validationError || error?.message;

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
                    onClick={() => setCorrectAnswerOption(option.label)}
                    className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                      correctAnswer === option.label
                        ? 'bg-emerald-100 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 text-slate-500 border border-slate-200 hover:bg-slate-200'
                    }`}
                  >
                    {correctAnswer === option.label ? 'Correcta' : 'Marcar'}
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

          {displayError && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-sm text-rose-700">
              {displayError}
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
            disabled={isPending}
            className="px-4 py-2 text-sm font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isPending ? 'Guardando...' : question ? 'Actualizar' : 'Crear'}
          </button>
        </div>
      </div>
    </div>
  );
}
