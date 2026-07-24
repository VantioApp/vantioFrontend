'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UserCircle, Save, CheckCircle2 } from 'lucide-react';
import { useProfile } from '@/presentation/hooks/use-profile';
import { useUpdateProfile } from '@/presentation/hooks/use-update-profile';
import { formatDate } from '@/core/utils/format-date';

export default function ProfileClient() {
  const { data: user } = useProfile();
  const { mutate: updateProfile, isPending } = useUpdateProfile();
  const [name, setName] = useState(user?.name || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');
  const [saved, setSaved] = useState(false);

  if (!user) return null;

  const memberSince = user.createdAt ? formatDate(user.createdAt) : 'N/A';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(
      {
        name: name.trim() || undefined,
        avatarUrl: avatarUrl.trim() || null,
      },
      {
        onSuccess: () => {
          setSaved(true);
          setTimeout(() => setSaved(false), 3000);
        },
      },
    );
  };

  return (
    <>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="font-serif text-3xl md:text-4xl text-slate-900 font-bold tracking-tight">Mi Perfil</h1>
          <p className="text-sm text-slate-500 mt-1">Actualiza tu información personal.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-200">
          <UserCircle className="w-6 h-6 text-amber-600" />
          <h3 className="font-serif text-xl font-bold text-slate-900">Información Personal</h3>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-start">
            <div className="flex flex-col items-center gap-3 md:w-48 shrink-0">
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-50 shadow-sm bg-slate-100 flex items-center justify-center">
                {avatarUrl ? (
                  <Image src={avatarUrl} alt={user.name} width={96} height={96} className="w-full h-full object-cover" />
                ) : (
                  <UserCircle className="w-12 h-12 text-slate-400" />
                )}
              </div>
              <p className="text-xs text-slate-500 text-center">Miembro desde: {memberSince}</p>
            </div>

            <div className="flex-1 flex flex-col gap-4">
              <div>
                <label htmlFor="email" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Correo Electrónico
                </label>
                <input
                  id="email"
                  type="email"
                  value={user.email}
                  disabled
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-500 text-sm cursor-not-allowed"
                />
                <p className="text-[11px] text-slate-400 mt-1">El correo electrónico no se puede modificar desde aquí.</p>
              </div>

              <div>
                <label htmlFor="name" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Nombre Completo
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-slate-900 transition-colors"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="avatarUrl" className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  URL del Avatar
                </label>
                <input
                  id="avatarUrl"
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-slate-200 bg-white text-slate-900 text-sm focus:outline-none focus:border-slate-900 transition-colors"
                  placeholder="https://ejemplo.com/avatar.jpg"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-4 border-t border-slate-200">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-2.5 rounded-lg text-sm font-semibold transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-4 h-4" />
              {isPending ? 'Guardando...' : 'Guardar Cambios'}
            </button>

            {saved && (
              <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Perfil actualizado
              </span>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
