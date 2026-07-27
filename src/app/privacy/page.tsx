import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { Footer } from '@/presentation/components/ui/footer';

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description: 'Política de privacidad y tratamiento de datos personales de la plataforma educativa Vantio.',
};

export default function PrivacyPage() {
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
        <section className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">Legal</span>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-slate-900 mt-4 leading-tight">
              Política de Privacidad
            </h1>
            <p className="text-sm text-slate-500 mt-4">Última actualización: 27 de julio de 2026</p>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 md:p-10 shadow-sm space-y-10">

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">1. Identificación del Responsable del Tratamiento</h2>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mb-4">
                  <p className="text-sm text-slate-700"><strong>Responsable:</strong> Sergio Alejandro Morales Cuesta (en adelante &quot;Vantio&quot; o &quot;el Responsable&quot;), persona natural colombiana, domiciliado en Colombia.</p>
                  <p className="text-sm text-slate-700 mt-2"><strong>Correo electrónico:</strong> <a href="mailto:sam94c@gmail.com" className="text-amber-600 font-semibold hover:underline">sam94c@gmail.com</a></p>
                  <p className="text-sm text-slate-700 mt-2"><strong>Sitio web:</strong> https://vantio.xchecho.com</p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Para efectos de la Ley 1581 de 2012 (Protección de Datos Personales) y el Decreto 1377 de
                  2013, el Responsable del Tratamiento de los datos personales recolectados a través de la
                  Plataforma Vantio es la persona natural identificada anteriormente.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">2. Marco Legal Aplicable</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Esta Política de Privacidad se rige por:</p>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li><strong>Ley 1581 de 2012</strong> — Régimen General de Protección de Datos Personales (Habeas Data).</li>
                  <li><strong>Decreto 1377 de 2013</strong> — Reglamentación parcial de la Ley 1581.</li>
                  <li><strong>Constitución Política de Colombia, Artículo 15</strong> — Derecho a la intimidad personal y familiar, habeas data.</li>
                  <li><strong>Sentencias de la Corte Constitucional</strong> sobre protección de datos personales.</li>
                </ul>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Vantio se acoge voluntariamente a estos principios incluso en fase de lanzamiento. Si en el
                  futuro la Plataforma recibe usuarios residentes en la Unión Europea, se adecuará
                  adicionalmente al Reglamento General de Protección de Datos (GDPR).
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">3. Definiciones</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Para efectos de esta política:</p>
                <div className="space-y-3">
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <strong>Dato personal:</strong> Cualquier información vinculada o que pueda asociarse a una persona natural identificada o identificable.
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <strong>Dato sensible:</strong> Aquellos que afectan la intimidad del titular o cuyo uso indebido puede generar discriminación. Vantio <strong>NO recolecta datos sensibles</strong>.
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <strong>Titular:</strong> Persona natural cuyos datos son objeto de tratamiento. En esta Plataforma: el usuario registrado.
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <strong>Responsable del Tratamiento:</strong> Persona natural o jurídica que decide sobre la base de datos y el tratamiento.
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <strong>Encargado del Tratamiento:</strong> Persona natural o jurídica que realiza el tratamiento por cuenta del Responsable.
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <strong>Tratamiento:</strong> Cualquier operación sobre datos personales (recolección, almacenamiento, uso, circulación, supresión, etc.).
                  </div>
                  <div className="text-sm text-slate-600 leading-relaxed">
                    <strong>Autorización:</strong> Consentimiento previo, expreso e informado del Titular para el tratamiento de sus datos.
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">4. Datos Personales que Recolectamos</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">4.1 Datos suministrados directamente por el usuario</h3>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Dato</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Finalidad</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Obligatorio</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Nombre completo</td>
                        <td className="px-4 py-2">Identificación del usuario, personalización, visualización en perfil</td>
                        <td className="px-4 py-2">Sí</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Correo electrónico</td>
                        <td className="px-4 py-2">Identificador único, inicio de sesión, recuperación, comunicaciones</td>
                        <td className="px-4 py-2">Sí</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Contraseña (hasheada)</td>
                        <td className="px-4 py-2">Autenticación segura en la Plataforma</td>
                        <td className="px-4 py-2">Sí</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Avatar / foto de perfil</td>
                        <td className="px-4 py-2">Personalización visual del perfil</td>
                        <td className="px-4 py-2">No</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-sm font-bold text-slate-800 mb-2">4.2 Datos generados por la actividad del usuario</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li><strong>Datos de quizzes:</strong> materias, puntuaciones, respuestas correctas/incorrectas, tiempos de sesión, respuestas seleccionadas.</li>
                  <li><strong>Datos de progreso:</strong> porcentaje de maestría por materia, total de preguntas respondidas, respuestas correctas, fecha del último test.</li>
                  <li><strong>Datos de rendimiento:</strong> análisis de temas fuertes y débiles, recomendaciones generadas automáticamente.</li>
                  <li><strong>Áreas de estudio inscritas:</strong> materias o áreas de conocimiento en las que el usuario se ha inscrito voluntariamente.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">4.3 Datos que NO recolectamos</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li>Datos sensibles (origen racial, orientación política, convicciones religiosas, datos de salud, biométricos).</li>
                  <li>Datos de menores de 14 años. La Plataforma no está dirigida a menores.</li>
                  <li>Datos financieros (tarjetas de crédito, cuentas bancarias). Actualmente Vantio no procesa pagos.</li>
                  <li>Datos de geolocalización precisa.</li>
                  <li>Datos de navegación externa (historial de sitios visitados fuera de la Plataforma).</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">4.4 Datos de navegación</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Por la naturaleza técnica del servicio, nuestro proveedor de infraestructura puede recolectar
                  automáticamente datos de navegación como dirección IP, tipo de navegador, sistema operativo y
                  páginas visitadas. Estos datos se utilizan exclusivamente para fines operativos y no se
                  asocian a perfiles de usuario con fines de marketing o publicidad.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">5. Finalidades del Tratamiento</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Los datos personales recolectados son tratados para las siguientes finalidades:</p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Finalidad</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Base legal</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Creación y gestión de la cuenta de usuario</td>
                        <td className="px-4 py-2">Ejecución del servicio</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Autenticación y control de acceso</td>
                        <td className="px-4 py-2">Ejecución del servicio + interés legítimo en seguridad</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Generación de quizzes aleatorios por área</td>
                        <td className="px-4 py-2">Ejecución del servicio</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Cálculo de puntuaciones, progreso y análisis</td>
                        <td className="px-4 py-2">Ejecución del servicio</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Historial de pruebas realizadas</td>
                        <td className="px-4 py-2">Ejecución del servicio</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Estadísticas globales anonimizadas (panel admin)</td>
                        <td className="px-4 py-2">Interés legítimo en mejora del servicio</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Responder solicitudes de soporte o ejercicio de derechos</td>
                        <td className="px-4 py-2">Obligación legal / Interés legítimo</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2">Comunicaciones esenciales del servicio</td>
                        <td className="px-4 py-2">Obligación legal / Interés legítimo</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2">Cumplir obligaciones legales aplicables</td>
                        <td className="px-4 py-2">Obligación legal</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Los datos de rendimiento solo son visibles para el propio usuario. Los administradores acceden
                  exclusivamente a estadísticas agregadas y anonimizadas con fines operativos y de mejora del
                  servicio.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">6. Cookies y Tecnologías Similares</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">6.1 Cookies utilizadas</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Vantio utiliza exclusivamente cookies técnicas esenciales para el funcionamiento de la
                  Plataforma. No se utilizan cookies de publicidad, rastreo o analítica de terceros.
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Cookie</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Tipo</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Duración</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Finalidad</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2 font-mono text-xs">access_token</td>
                        <td className="px-4 py-2">Técnica (httpOnly)</td>
                        <td className="px-4 py-2">7 días</td>
                        <td className="px-4 py-2">Autenticación del usuario. Token JWT. No accesible desde JavaScript.</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-xs">vantio_token</td>
                        <td className="px-4 py-2">Técnica</td>
                        <td className="px-4 py-2">7 días</td>
                        <td className="px-4 py-2">Respaldo de autenticación para la capa de enrutamiento.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <h3 className="text-sm font-bold text-slate-800 mb-2">6.2 Almacenamiento local (localStorage)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  La Plataforma utiliza localStorage del navegador exclusivamente para almacenar temporalmente el
                  estado de autenticación (información básica del usuario como nombre, email y rol) con el fin de
                  persistir la sesión entre recargas. No se almacena el token JWT ni la contraseña en localStorage.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">6.3 Gestión de cookies</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  El usuario puede configurar su navegador para rechazar cookies. Sin embargo, si desactiva las
                  cookies técnicas, la Plataforma no podrá mantener la sesión iniciada y su funcionamiento se
                  verá afectado.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">7. Terceros Encargados del Tratamiento</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Para la operación técnica de la Plataforma, Vantio contrata los servicios de los siguientes
                  proveedores, quienes actúan como Encargados del Tratamiento:
                </p>
                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-sm border border-slate-200 rounded-lg overflow-hidden">
                    <thead className="bg-slate-50">
                      <tr>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Proveedor</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Servicio</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Datos involucrados</th>
                        <th scope="col" className="text-left px-4 py-2 font-semibold text-slate-700 border-b border-slate-200">Ubicación</th>
                      </tr>
                    </thead>
                    <tbody className="text-slate-600">
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2 font-semibold">Supabase</td>
                        <td className="px-4 py-2">Base de datos PostgreSQL</td>
                        <td className="px-4 py-2">Todos los datos de usuarios, quizzes y progreso</td>
                        <td className="px-4 py-2">EE. UU. (AWS)</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2 font-semibold">Vercel</td>
                        <td className="px-4 py-2">Hosting del frontend</td>
                        <td className="px-4 py-2">Datos de navegación (IP, logs)</td>
                        <td className="px-4 py-2">EE. UU.</td>
                      </tr>
                      <tr className="border-b border-slate-100">
                        <td className="px-4 py-2 font-semibold">Hetzner</td>
                        <td className="px-4 py-2">Servidor del backend (API)</td>
                        <td className="px-4 py-2">Tránsito de datos, logs</td>
                        <td className="px-4 py-2">Alemania</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-semibold">Cloudflare</td>
                        <td className="px-4 py-2">CDN y SSL</td>
                        <td className="px-4 py-2">Datos de navegación (IP, caché)</td>
                        <td className="px-4 py-2">Global</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  No se venden, comparten ni ceden datos personales a terceros con fines comerciales,
                  publicitarios o de marketing.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">8. Transferencia Internacional de Datos</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Los proveedores de infraestructura de Vantio operan servidores ubicados en Estados Unidos y
                  Alemania, lo que implica la transferencia internacional de datos personales. Al utilizar la
                  Plataforma, el titular autoriza expresamente esta transferencia exclusivamente para los fines
                  operativos descritos en esta Política. Vantio se asegura de que dichos proveedores ofrezcan
                  niveles adecuados de protección de conformidad con los estándares aplicables.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">9. Derechos del Titular</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  De conformidad con la Ley 1581 de 2012, el titular de los datos personales tiene los siguientes derechos:
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.1 Derecho de acceso</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Conocer, actualizar y rectificar sus datos personales frente al Responsable. El usuario puede
                  consultar sus datos en cualquier momento desde su perfil en la Plataforma o solicitándolo al
                  correo de contacto.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.2 Derecho de rectificación</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Solicitar la corrección de datos inexactos, incompletos o desactualizados. El usuario puede
                  actualizar su nombre y avatar desde su perfil en la Plataforma.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.3 Derecho de cancelación (supresión)</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Solicitar la eliminación de sus datos personales cuando: no estén siendo tratados conforme a
                  la finalidad autorizada, haya finalizado la necesidad del tratamiento, o el titular revoque su
                  autorización, salvo que exista un deber legal que impida eliminarlos.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.4 Derecho de oposición</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Oponerse al tratamiento de sus datos en cualquier momento y por cualquier causa legítima.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.5 Derecho a revocar la autorización</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Revocar el consentimiento previamente otorgado para el tratamiento de sus datos, salvo que la
                  ley disponga lo contrario.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.6 Derecho a presentar quejas</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Presentar quejas ante la Superintendencia de Industria y Comercio (SIC) por infracciones a la
                  ley de protección de datos.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.7 Procedimiento para ejercer los derechos</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Para ejercer cualquiera de estos derechos, el titular debe enviar una solicitud por correo
                  electrónico a <a href="mailto:sam94c@gmail.com" className="text-amber-600 font-semibold hover:underline">sam94c@gmail.com</a> indicando:
                </p>
                <ol className="text-sm text-slate-600 space-y-1.5 ml-4 list-decimal mb-4">
                  <li>Nombre completo del titular.</li>
                  <li>Identificación (cédula de ciudadanía o documento equivalente).</li>
                  <li>Descripción clara y precisa de la solicitud.</li>
                  <li>Dirección de correo electrónico para recibir la respuesta.</li>
                </ol>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Vantio responderá en un plazo máximo de diez (10) días hábiles desde la recepción de la
                  solicitud completa. En caso de no ser posible atender la solicitud en dicho plazo, se
                  informará al titular dentro de los cinco (5) días siguientes, explicando los motivos y el
                  plazo estimado, que en ningún caso superará los quince (15) días hábiles adicionales.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">10. Conservación de los Datos</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Los datos personales se conservarán mientras:</p>
                <ol className="text-sm text-slate-600 space-y-1.5 ml-4 list-decimal mb-4">
                  <li>La cuenta del usuario permanezca activa en la Plataforma.</li>
                  <li>Sean necesarios para las finalidades descritas en esta Política.</li>
                  <li>Exista una obligación legal de conservación.</li>
                </ol>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Cuentas inactivas: Vantio se reserva el derecho de eliminar cuentas que permanezcan inactivas
                  por más de 24 meses sin actividad, previa notificación al titular con al menos treinta (30)
                  días de antelación.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">Eliminación de cuenta: cuando un usuario solicite la eliminación, Vantio procederá a:</p>
                <ol className="text-sm text-slate-600 space-y-1.5 ml-4 list-decimal">
                  <li>Eliminar o anonimizar irreversiblemente todos los datos personales en un plazo de treinta (30) días hábiles.</li>
                  <li>Conservar únicamente aquellos datos que deban mantenerse por obligación legal, en cuyo caso se bloquearán.</li>
                  <li>Las estadísticas agregadas y anonimizadas podrán conservarse indefinidamente con fines de mejora del servicio.</li>
                </ol>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">11. Seguridad de los Datos</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">Medidas técnicas</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li><strong>Cifrado de contraseñas:</strong> Las contraseñas se almacenan hasheadas con bcrypt (10 salt rounds). Nadie, incluido el Responsable, puede leer la contraseña en texto plano.</li>
                  <li><strong>Cifrado en tránsito:</strong> Toda comunicación entre el navegador y los servidores se realiza mediante HTTPS/TLS (SSL Full a través de Cloudflare).</li>
                  <li><strong>Tokens de autenticación:</strong> Los tokens JWT se almacenan en cookies httpOnly, lo que impide su acceso desde JavaScript (protección contra XSS).</li>
                  <li><strong>Cabeceras de seguridad:</strong> Content Security Policy (CSP), X-Content-Type-Options: nosniff, X-Frame-Options: DENY y Referrer-Policy.</li>
                  <li><strong>Validación de entradas:</strong> Todas las entradas son validadas tanto en el frontend como en el backend (class-validator) para prevenir inyecciones.</li>
                  <li><strong>Límites de carga:</strong> El backend impone un límite de 1 MB en las peticiones JSON.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">Medidas administrativas</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li><strong>Acceso mínimo:</strong> Solo el Responsable y encargados autorizados tienen acceso a los datos.</li>
                  <li><strong>Proveedores evaluados:</strong> Los proveedores de infraestructura son seleccionados con criterios de seguridad y protección de datos.</li>
                  <li><strong>Variables sensibles:</strong> Las credenciales de base de datos y claves de API nunca se incluyen en el código fuente ni en repositorios.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">Limitación</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Ninguna medida de seguridad es infalible. En caso de una brecha de seguridad que afecte
                  significativamente los datos personales, Vantio notificará a los titulares afectados en un
                  plazo máximo de setenta y dos (72) horas desde su detección.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">12. Menores de Edad</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  La Plataforma Vantio está dirigida a estudiantes de derecho y profesionales, por lo que se
                  asume que los usuarios son mayores de edad (18 años en Colombia). No se recolectan datos de
                  menores de 14 años. Si un padre, madre o tutor tiene conocimiento de que un menor a su cargo
                  ha proporcionado datos personales sin su consentimiento, debe contactarnos a{' '}
                  <a href="mailto:sam94c@gmail.com" className="text-amber-600 font-semibold hover:underline">sam94c@gmail.com</a>{' '}
                  para proceder a la eliminación inmediata de dichos datos.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">13. Modificaciones a la Política de Privacidad</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Vantio se reserva el derecho de modificar esta Política de Privacidad en cualquier momento
                  para reflejar cambios en el servicio, en la legislación aplicable o en las prácticas de
                  tratamiento de datos. Las modificaciones se publicarán en la Plataforma con indicación de la
                  fecha de última actualización. Para cambios sustanciales, se notificará a los usuarios por
                  correo electrónico con al menos quince (15) días de antelación. El uso continuado de la
                  Plataforma después de la entrada en vigor de los cambios constituye la aceptación de los
                  mismos.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">14. Autoridad de Control</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  El titular tiene derecho a presentar quejas o reclamaciones ante la autoridad colombiana de
                  protección de datos:
                </p>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700"><strong>Superintendencia de Industria y Comercio (SIC)</strong></p>
                  <p className="text-sm text-slate-700 mt-1">Delegatura para la Protección de Datos Personales</p>
                  <p className="text-sm text-slate-700 mt-1">Línea gratuita nacional: 01 8000 910165</p>
                  <p className="text-sm text-slate-700 mt-1">Sitio web: https://www.sic.gov.co</p>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">15. Vigencia de la Base de Datos</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  La base de datos que contiene los datos personales de los usuarios tendrá una vigencia igual
                  al tiempo de mantenimiento de las finalidades del tratamiento descritas en esta Política, o
                  hasta que el titular solicite su eliminación, lo que ocurra primero.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">16. Aviso de Privacidad</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Esta Política de Privacidad constituye el Aviso de Privacidad de la Plataforma Vantio, que se
                  pone a disposición de los titulares de forma previa a la recolección de sus datos personales,
                  en cumplimiento del literal c) del artículo 17 de la Ley 1581 de 2012. Al registrarse en la
                  Plataforma, el usuario declara haber leído y comprendido esta Política y otorga su
                  autorización expresa, previa e informada para el tratamiento de sus datos personales conforme
                  a las finalidades aquí descritas.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">17. Contacto</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Para cualquier consulta, solicitud o reclamación relacionada con esta Política de Privacidad o
                  con el tratamiento de datos personales:
                </p>
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                  <p className="text-sm text-slate-700"><strong>Correo electrónico:</strong> <a href="mailto:sam94c@gmail.com" className="text-amber-600 font-semibold hover:underline">sam94c@gmail.com</a></p>
                  <p className="text-sm text-slate-700 mt-1"><strong>Responsable:</strong> Sergio Alejandro Morales Cuesta</p>
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
