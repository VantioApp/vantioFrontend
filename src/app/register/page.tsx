'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'motion/react';
import Link from 'next/link';
import { Mail, Lock, User, ArrowLeft, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useAuthStore } from '@/stores/authStore';

export default function RegisterPage() {
  const router = useRouter();
  const register = useAuthStore((s) => s.register);
  const isLoading = useAuthStore((s) => s.isLoading);
  const error = useAuthStore((s) => s.error);
  const clearError = useAuthStore((s) => s.clearError);
  const shouldReduce = useReducedMotion();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [terms, setTerms] = useState(false);
  const [localError, setLocalError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    clearError();

    if (!name.trim()) {
      setLocalError('Por favor ingresa tu nombre completo.');
      return;
    }
    if (!email) {
      setLocalError('Por favor ingresa tu correo electrónico.');
      return;
    }
    if (password.length < 8) {
      setLocalError('La contraseña debe tener al menos 8 caracteres.');
      return;
    }
    if (!terms) {
      setLocalError('Debes aceptar los Términos de Servicio y Políticas de Privacidad.');
      return;
    }

    try {
      await register(name, email, password);
      router.push('/dashboard');
    } catch (err) {
      console.error('Registration failed:', err);
    }
  };

  const displayError = localError || error;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans text-slate-800 antialiased relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none bg-gradient-to-bl from-amber-500 to-transparent" />
      
      <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-6 md:px-12 w-full">
        <Link href="/" className="flex items-center">
          <Logo variant="full" theme="light" height={32} />
        </Link>
        <Link 
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 uppercase tracking-wider transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Volver
        </Link>
      </header>

      <main className="flex-grow flex items-center justify-center p-6 my-8 z-10">
        <motion.div 
          initial={shouldReduce ? false : { opacity: 0, y: 15 }}
          animate={shouldReduce ? false : { opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-slate-200/80"
        >
          <div className="text-center mb-8">
            <h1 className="font-serif text-3xl font-bold text-slate-900">Crea tu cuenta</h1>
            <p className="text-sm text-slate-500 mt-1">Únete a la plataforma líder en preparación jurídica</p>
          </div>

          {displayError && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
              {displayError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2" htmlFor="fullName">
                Nombre Completo
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  id="fullName"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                  placeholder="Ej. María Pérez"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2" htmlFor="email">
                Email Institucional o Personal
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2" htmlFor="password">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                  placeholder="Mínimo 8 caracteres"
                  required
                />
              </div>
              <p className="text-[10px] text-slate-400 mt-1.5 leading-tight">
                Debe contener letras, números y caracteres especiales para garantizar la seguridad.
              </p>
            </div>

            <div className="flex items-start gap-3 pt-2">
              <input
                id="terms"
                type="checkbox"
                checked={terms}
                onChange={(e) => setTerms(e.target.checked)}
                className="mt-1 h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-900/20 cursor-pointer"
              />
              <label htmlFor="terms" className="text-xs text-slate-500 leading-normal select-none cursor-pointer">
                Acepto los{' '}
                <a href="#" className="text-amber-600 font-semibold hover:underline">
                  Términos de Servicio
                </a>{' '}
                y la{' '}
                <a href="#" className="text-amber-600 font-semibold hover:underline">
                  Política de Privacidad
                </a>
                .
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm pt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creando cuenta...' : 'Registrarse'}
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              ¿Ya tienes cuenta?{' '}
              <Link href="/login" className="text-amber-600 font-semibold hover:underline">
                Inicia sesión
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      <footer className="bg-slate-900 w-full py-4 text-center border-t border-slate-800 shrink-0">
        <p className="text-[11px] text-slate-500">
          © 2026 Vantio Legal Education. Todos los derechos reservados. Excelencia Profesional en el Derecho.
        </p>
      </footer>
    </div>
  );
}
