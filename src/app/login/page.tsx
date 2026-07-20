'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Mail, Lock, ArrowLeft, ArrowRight } from 'lucide-react';
import { Logo } from '@/components/ui/logo';
import { useAuthStore } from '@/stores/authStore';

export default function LoginPage() {
  const router = useRouter();
  const { login, isLoading, error, clearError } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!email) {
      return;
    }

    try {
      await login(email, password);
      const { user } = useAuthStore.getState();
      if (user?.role === 'admin') {
        router.push('/admin');
      } else {
        router.push('/dashboard');
      }
    } catch (err) {
      console.error('Login failed:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between font-sans text-slate-800 antialiased relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5 pointer-events-none bg-gradient-to-bl from-amber-500 to-transparent" />
      
      {/* Mini Header */}
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

      {/* Main Canvas Container */}
      <main className="flex-grow flex flex-col items-center justify-center p-6 my-8 z-10">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-xl shadow-md p-8 border border-slate-200/80"
        >
          {/* Logo Heading */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm overflow-hidden">
              <Logo variant="isotype" theme="dark" height={40} />
            </div>
            <h1 className="font-serif text-3xl font-bold text-slate-900">Bienvenido de nuevo</h1>
            <p className="text-sm text-slate-500 mt-1">Ingresa tus credenciales para continuar</p>
          </div>

          {error && (
            <div className="mb-6 p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg font-medium">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2" htmlFor="email">
                Correo Electrónico
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
                  placeholder="tu@correo.com"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider" htmlFor="password">
                  Contraseña
                </label>
                <a href="#" className="text-xs font-semibold text-amber-600 hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
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
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </form>

          {/* Prompt to register */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-sm text-slate-500">
              ¿No tienes cuenta?{' '}
              <Link href="/register" className="text-amber-600 font-semibold hover:underline">
                Regístrate gratis
              </Link>
            </p>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 w-full py-4 text-center border-t border-slate-800 shrink-0">
        <p className="text-[11px] text-slate-500">
          © 2026 Vantio Legal Education. Todos los derechos reservados. Excelencia Profesional en el Derecho.
        </p>
      </footer>
    </div>
  );
}
