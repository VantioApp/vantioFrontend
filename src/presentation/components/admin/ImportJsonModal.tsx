'use client';

import { useState } from 'react';
import { useImportQuestions } from '@/presentation/hooks/use-import-questions';

interface ImportJsonModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function ImportJsonModal({
  onClose,
  onSuccess,
}: ImportJsonModalProps) {
  const [jsonContent, setJsonContent] = useState('');
  const [validationError, setValidationError] = useState('');
  const { mutate: importQuestions, isPending, error } = useImportQuestions();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setJsonContent(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  const handleSubmit = () => {
    try {
      setValidationError('');
      const data = JSON.parse(jsonContent);
      importQuestions(data, { onSuccess: () => onSuccess() });
    } catch (err) {
      setValidationError(err instanceof Error ? err.message : 'Error al parsear JSON');
    }
  };

  const displayError = validationError || error?.message;

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
            disabled={!jsonContent || isPending}
            className="px-4 py-2 text-sm font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isPending ? 'Importando...' : 'Importar'}
          </button>
        </div>
      </div>
    </div>
  );
}
