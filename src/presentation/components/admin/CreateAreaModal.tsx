'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { useCreateArea } from '@/presentation/hooks/use-create-area';

interface CreateAreaModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateAreaModal({
  onClose,
  onSuccess,
}: CreateAreaModalProps) {
  const [areaName, setAreaName] = useState('');
  const { mutate: createArea, isPending, error } = useCreateArea();

  const handleSubmit = () => {
    if (!areaName.trim()) return;
    createArea(areaName.trim(), { onSuccess: () => onSuccess() });
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
              {error.message}
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
            disabled={!areaName.trim() || isPending}
            className="px-4 py-2 text-sm font-semibold bg-amber-600 text-white rounded-lg hover:bg-amber-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {isPending ? 'Creando...' : 'Crear Área'}
          </button>
        </div>
      </div>
    </div>
  );
}
