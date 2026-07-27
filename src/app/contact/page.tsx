'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mail, MessageSquare, User, Send, MapPin, Clock, CheckCircle } from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { Footer } from '@/presentation/components/ui/footer';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-slate-800 antialiased">
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-200/80">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Logo variant="full" theme="light" height={36} />
          </Link>
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            Volver al Inicio
          </Link>
        </div>
      </header>

      <main className="flex-grow">
        <section className="py-20 bg-white border-b border-slate-200">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Contacto</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
              ¿Tienes preguntas? Estamos aquí para ayudarte
            </h1>
            <p className="text-lg text-slate-600 mt-6 max-w-2xl mx-auto leading-relaxed">
              Nuestro equipo está disponible para resolver tus dudas sobre la plataforma,
              el contenido académico o cualquier inquietud que tengas.
            </p>
          </div>
        </section>

        <section className="py-16 bg-gray-50">
          <div className="max-w-5xl mx-auto px-6">
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white rounded-xl p-6 border border-slate-200/60 text-center">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Correo Electrónico</h3>
                <a href="mailto:sam94c@gmail.com" className="text-sm text-amber-600 font-semibold hover:underline mt-2 block">sam94c@gmail.com</a>
                <p className="text-xs text-slate-400 mt-1">Respuesta en menos de 24 horas</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200/60 text-center">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MessageSquare className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Soporte Técnico</h3>
                <p className="text-sm text-slate-600 mt-2">Asistencia con la plataforma</p>
                <p className="text-xs text-slate-400 mt-1">Lunes a Viernes, 8am - 6pm</p>
              </div>
              <div className="bg-white rounded-xl p-6 border border-slate-200/60 text-center">
                <div className="w-12 h-12 bg-amber-50 border border-amber-200 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="font-serif text-lg font-bold text-slate-900">Ubicación</h3>
                <p className="text-sm text-slate-600 mt-2">Colombia</p>
                <p className="text-xs text-slate-400 mt-1">Operación 100% digital</p>
              </div>
            </div>

            <div className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3 bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <h2 className="font-serif text-2xl font-bold text-slate-900 mb-6">Envíanos un mensaje</h2>

                {submitted ? (
                  <div className="text-center py-12" aria-live="polite" role="status">
                    <div className="w-16 h-16 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle className="w-8 h-8 text-emerald-600" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-slate-900">Mensaje enviado</h3>
                    <p className="text-slate-600 mt-2 text-sm">
                      Gracias por contactarnos. Te responderemos lo antes posible.
                    </p>
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setName('');
                        setEmail('');
                        setSubject('');
                        setMessage('');
                      }}
                      className="mt-6 text-sm font-semibold text-amber-600 hover:underline cursor-pointer"
                    >
                      Enviar otro mensaje
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2" htmlFor="contact-name">
                        Nombre Completo
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <User className="w-4 h-4" />
                        </div>
                        <input
                          id="contact-name"
                          type="text"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          autoComplete="name"
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                          placeholder="Tu nombre"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2" htmlFor="contact-email">
                        Correo Electrónico
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          id="contact-email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                          className="w-full pl-10 pr-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                          placeholder="tu@correo.com"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2" htmlFor="contact-subject">
                        Asunto
                      </label>
                      <input
                        id="contact-subject"
                        type="text"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="w-full px-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
                        placeholder="¿En qué podemos ayudarte?"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2" htmlFor="contact-message">
                        Mensaje
                      </label>
                      <textarea
                        id="contact-message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        rows={5}
                        className="w-full px-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all resize-none"
                        placeholder="Describe tu consulta con el mayor detalle posible..."
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3.5 px-4 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95 flex items-center justify-center gap-2 text-sm cursor-pointer"
                    >
                      Enviar Mensaje
                      <Send className="w-4 h-4 text-amber-400" />
                    </button>
                  </form>
                )}
              </div>

              <div className="md:col-span-2 flex flex-col gap-6">
                <div className="bg-slate-900 rounded-xl p-6 text-center">
                  <Clock className="w-8 h-8 text-amber-500 mx-auto mb-3" />
                  <h3 className="font-serif text-lg font-bold text-white">Horario de Atención</h3>
                  <div className="mt-3 space-y-1.5 text-sm text-slate-400">
                    <p>Lunes a Viernes: 8:00 AM - 6:00 PM</p>
                    <p>Sábados: 9:00 AM - 1:00 PM</p>
                    <p>Domingos y festivos: Cerrado</p>
                  </div>
                  <p className="text-xs text-slate-500 mt-3">Hora de Colombia (GMT-5)</p>
                </div>
                <div className="bg-white rounded-xl p-6 border border-slate-200/60">
                  <h3 className="font-serif text-lg font-bold text-slate-900 mb-3">Preguntas Frecuentes</h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-700">¿Cómo inicio una prueba?</p>
                      <p className="text-xs text-slate-500 mt-1">Regístrate, ingresa al dashboard y selecciona &quot;Iniciar Nueva Prueba&quot;.</p>
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <p className="text-sm font-semibold text-slate-700">¿Las preguntas son reales?</p>
                      <p className="text-xs text-slate-500 mt-1">Nuestro banco está basado en la doctrina y legislación colombiana vigente.</p>
                    </div>
                    <div className="border-t border-slate-100 pt-3">
                      <p className="text-sm font-semibold text-slate-700">¿Puedo repetir las pruebas?</p>
                      <p className="text-xs text-slate-500 mt-1">Sí, puedes realizar simulacros las veces que necesites.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
