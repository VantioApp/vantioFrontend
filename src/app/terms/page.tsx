import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Logo } from '@/presentation/components/ui/logo';
import { Footer } from '@/presentation/components/ui/footer';

export const metadata: Metadata = {
  title: 'Términos y Condiciones',
  description: 'Términos y condiciones de uso de la plataforma educativa Vantio.',
};

export default function TermsPage() {
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
              Términos y Condiciones
            </h1>
            <p className="text-sm text-slate-500 mt-4">Última actualización: 27 de julio de 2026</p>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
          <div className="max-w-3xl mx-auto px-6">
            <div className="bg-white rounded-xl border border-slate-200 p-8 md:p-10 shadow-sm space-y-10">

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">1. Introducción y Aceptación</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">1.1 Partes</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Los presentes Términos y Condiciones regulan el acceso y uso de la plataforma web Vantio
                  (en adelante, &quot;la Plataforma&quot;), accesible desde https://vantio.xchecho.com, operada por
                  Sergio Alejandro Morales Cuesta (en adelante, &quot;el Titular de la Plataforma&quot; o &quot;Vantio&quot;).
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Para efectos de estos Términos, se entenderá como &quot;Usuario&quot; o &quot;Usuarios&quot; a toda persona
                  natural que acceda, se registre o utilice la Plataforma de cualquier forma.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">1.2 Aceptación</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  El acceso y uso de la Plataforma implica la aceptación plena e incondicional de estos Términos.
                  Si el Usuario no está de acuerdo con cualquiera de las disposiciones aquí contenidas, debe
                  abstenerse de utilizar la Plataforma.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">Al registrarse, el Usuario declara:</p>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li>Ser mayor de dieciocho (18) años.</li>
                  <li>Tener capacidad legal para contratar y obligarse según la legislación colombiana.</li>
                  <li>Haber leído, comprendido y aceptado estos Términos y Condiciones.</li>
                  <li>Haber leído, comprendido y aceptado la <Link href="/privacy" className="text-amber-600 font-semibold hover:underline">Política de Privacidad</Link>.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">1.3 Modificaciones</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Vantio se reserva el derecho de modificar los presentes Términos en cualquier momento. Las
                  modificaciones entrarán en vigor desde su publicación en la Plataforma. Para cambios
                  sustanciales, se notificará por correo electrónico a los Usuarios registrados con al menos
                  quince (15) días de antelación. El uso continuado de la Plataforma con posterioridad a la
                  entrada en vigor de las modificaciones constituye la aceptación tácita de las mismas.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">2. Descripción del Servicio</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">2.1 Qué es Vantio</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Vantio es una plataforma educativa digital que proporciona herramientas de preparación para
                  exámenes de conocimiento en Derecho Penal y Derecho Civil colombiano, mediante simulacros
                  de preguntas de opción múltiple, seguimiento de progreso y métricas de rendimiento.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">2.2 Funcionalidades principales</h3>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li><strong>Quizzes aleatorios:</strong> La Plataforma genera pruebas de opción múltiple con preguntas seleccionadas aleatoriamente del banco de preguntas disponible.</li>
                  <li><strong>Evaluación automática:</strong> Las respuestas del Usuario se evalúan automáticamente, generando una puntuación y un análisis de rendimiento.</li>
                  <li><strong>Seguimiento de progreso:</strong> La Plataforma registra y muestra el historial de pruebas realizadas, puntuaciones y progreso por materia.</li>
                  <li><strong>Retroalimentación:</strong> Por cada pregunta, la Plataforma puede proporcionar la respuesta correcta y una explicación de la misma.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">2.3 Naturaleza del servicio</h3>
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-2">
                  <p className="text-sm font-bold text-amber-800 mb-2">IMPORTANTE — AVISO LEGAL FUNDAMENTAL:</p>
                  <p className="text-sm text-amber-900 leading-relaxed mb-3">
                    Vantio es una herramienta educativa y de práctica. El contenido de la Plataforma tiene
                    exclusivamente fines de estudio, práctica y preparación académica. No constituye
                    asesoría jurídica, opinión legal ni recomendación profesional.
                  </p>
                  <p className="text-sm text-amber-900 leading-relaxed mb-2">El Usuario reconoce y acepta que:</p>
                  <ul className="text-sm text-amber-900 space-y-1.5 ml-4 list-disc">
                    <li>Las preguntas y respuestas pueden no reflejar la totalidad de interpretaciones jurídicas existentes.</li>
                    <li>La respuesta correcta indicada se basa en el criterio doctrinal predominante, pero no constituye una verdad jurídica absoluta ni vinculante.</li>
                    <li>Vantio no sustituye el estudio formal, la asesoría de un abogado titulado ni los cursos preparatorios institucionales.</li>
                    <li>La aprobación de quizzes en la Plataforma no garantiza la aprobación de exámenes preparatorios oficiales ni certificaciones profesionales.</li>
                  </ul>
                </div>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">3. Registro y Cuenta de Usuario</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">3.1 Proceso de registro</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Para acceder a las funcionalidades principales de la Plataforma, el Usuario debe crear una
                  cuenta proporcionando: nombre completo, dirección de correo electrónico válida y contraseña segura.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">3.2 Veracidad de la información</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  El Usuario se obliga a proporcionar información veraz, exacta, actualizada y completa. El
                  Usuario es el único responsable por cualquier perjuicio derivado de la inexactitud o falsedad
                  de la información suministrada.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">3.3 Seguridad de la cuenta</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  El Usuario es responsable de mantener la confidencialidad de sus credenciales de acceso.
                  Debe notificar inmediatamente a Vantio cualquier uso no autorizado de su cuenta o cualquier
                  otra violación de seguridad. Vantio no será responsable por pérdidas o daños derivados del
                  uso no autorizado de una cuenta por parte de terceros, siempre que dicha circunstancia no
                  sea imputable a un fallo de seguridad de la Plataforma.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">3.4 Una cuenta por persona</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Cada Usuario solo puede poseer una cuenta. No está permitida la creación de cuentas múltiples
                  o la suplantación de identidad.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">3.5 Cierre de cuenta</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  El Usuario puede solicitar el cierre de su cuenta en cualquier momento contactando a{' '}
                  <a href="mailto:sam94c@gmail.com" className="text-amber-600 font-semibold hover:underline">sam94c@gmail.com</a>.
                  Vantio procederá conforme a lo establecido en la Política de Privacidad respecto a la
                  eliminación de datos. Vantio se reserva el derecho de suspender o cancelar cuentas que
                  violen estos Términos, sin previo aviso y sin que ello genere derecho a indemnización alguna.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">4. Uso Aceptable de la Plataforma</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">4.1 Uso permitido</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  La Plataforma debe utilizarse exclusivamente para los fines educativos descritos en estos
                  Términos y de conformidad con la legislación aplicable.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">4.2 Conductas prohibidas</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">Queda expresamente prohibido al Usuario:</p>
                <ol className="text-sm text-slate-600 space-y-2 ml-4 list-decimal">
                  <li><strong>Ingeniería inversa:</strong> Descompilar, desensamblar, realizar ingeniería inversa o intentar derivar el código fuente de la Plataforma.</li>
                  <li><strong>Acceso no autorizado:</strong> Intentar acceder a áreas restringidas de la Plataforma, a los servidores o a las bases de datos sin autorización.</li>
                  <li><strong>Uso automatizado:</strong> Utilizar bots, scrapers, spiders u otros medios automatizados para extraer datos de la Plataforma sin autorización escrita previa.</li>
                  <li><strong>Interferencia:</strong> Interferir o interrumpir el funcionamiento de la Plataforma, sus servidores o redes conectadas.</li>
                  <li><strong>Carga maliciosa:</strong> Subir o transmitir virus, malware, troyanos o cualquier código de naturaleza destructiva.</li>
                  <li><strong>Suplantación:</strong> Hacerse pasar por otra persona, entidad o por el Titular de la Plataforma.</li>
                  <li><strong>Uso fraudulento:</strong> Manipular puntuaciones, explotar vulnerabilidades para obtener ventajas indebidas o falsear resultados de quizzes.</li>
                  <li><strong>Contenido ilegal:</strong> Utilizar la Plataforma para almacenar, transmitir o difundir contenido ilegal, difamatorio, obsceno, discriminatorio o que vulnere derechos de terceros.</li>
                  <li><strong>Explotación comercial no autorizada:</strong> Revender, alquilar o comercializar el acceso a la Plataforma o su contenido sin autorización expresa.</li>
                  <li><strong>Violación de propiedad intelectual:</strong> Reproducir, distribuir, modificar o crear obras derivadas del contenido de la Plataforma sin autorización.</li>
                </ol>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  El incumplimiento de estas prohibiciones dará lugar a la suspensión o cancelación inmediata
                  de la cuenta, sin perjuicio de las acciones legales que Vantio pueda emprender.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">5. Propiedad Intelectual</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">5.1 Titularidad de la Plataforma</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Todos los derechos de propiedad intelectual sobre la Plataforma —incluyendo el código fuente,
                  el diseño, la interfaz de usuario, la arquitectura, la base de datos, los logotipos, las marcas
                  y el nombre &quot;Vantio&quot;— pertenecen exclusivamente al Titular de la Plataforma y están protegidos
                  por la legislación colombiana de derechos de autor (Ley 23 de 1982 y modificaciones) y los
                  tratados internacionales suscritos por Colombia.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">5.2 Contenido de las preguntas</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Las preguntas del banco de preguntas han sido elaboradas o recopiladas a partir del estudio de
                  fuentes doctrinales, legales y jurisprudenciales. La redacción, selección de opciones,
                  explicaciones y curaduría constituyen una obra derivada protegida por derechos de autor. En la
                  medida en que las preguntas versan sobre normas jurídicas de dominio público, los textos legales
                  y jurisprudenciales citados son de libre acceso conforme al ordenamiento jurídico colombiano.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">5.3 Licencia de uso limitada</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Vantio otorga al Usuario una licencia limitada, no exclusiva, no transferible y revocable para
                  acceder y utilizar la Plataforma exclusivamente para sus fines educativos personales.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-2">Esta licencia no concede al Usuario derecho alguno de:</p>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc">
                  <li>Reproducir, distribuir o comunicar públicamente el contenido de la Plataforma.</li>
                  <li>Crear obras derivadas basadas en el contenido de la Plataforma.</li>
                  <li>Utilizar el contenido con fines comerciales sin autorización expresa y escrita de Vantio.</li>
                  <li>Extraer el banco de preguntas, total o parcialmente, para incorporarlo en otras plataformas o servicios.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2 mt-4">5.4 Contenido del Usuario</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  El Usuario conserva la titularidad de cualquier contenido que suba voluntariamente a la
                  Plataforma. No obstante, al subir dicho contenido, el Usuario otorga a Vantio una licencia no
                  exclusiva, gratuita, mundial y por el tiempo que el contenido permanezca en la Plataforma, para
                  mostrarlo, almacenarlo y distribuirlo en el contexto del servicio prestado.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">6. Limitación de Responsabilidad</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">6.1 Exactitud del contenido educativo</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Vantio realiza esfuerzos razonables para que las preguntas, respuestas y explicaciones sean
                  precisas y estén actualizadas. Sin embargo, Vantio no garantiza la exactitud, integridad,
                  actualidad o idoneidad del contenido para un propósito específico.
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">El Usuario reconoce que:</p>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li>La doctrina jurídica está sujeta a diversas interpretaciones.</li>
                  <li>Las leyes y la jurisprudencia evolucionan constantemente.</li>
                  <li>Pueden existir discrepancias doctrinales legítimas respecto a la respuesta correcta de algunas preguntas.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">6.2 Disponibilidad del servicio</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Vantio se esforzará por mantener la Plataforma disponible de forma continuada. No obstante, el
                  acceso puede suspenderse temporalmente por razones técnicas, de mantenimiento, seguridad o
                  causas de fuerza mayor, sin que ello genere responsabilidad alguna. Vantio no garantiza que la
                  Plataforma esté libre de errores, interrupciones o vulnerabilidades.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">6.3 Exclusión de garantías</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  La Plataforma se proporciona &quot;TAL CUAL&quot; y &quot;SEGÚN DISPONIBILIDAD&quot;, sin garantías de ningún
                  tipo, expresas o implícitas, incluyendo las garantías implícitas de comerciabilidad, idoneidad
                  para un fin particular y no infracción.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">6.4 Limitación de daños</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">En la máxima medida permitida por la ley aplicable, Vantio no será responsable por:</p>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-3">
                  <li>Daños directos, indirectos, incidentales, especiales, punitivos o consecuentes derivados del uso de la Plataforma.</li>
                  <li>Resultados adversos en exámenes preparatorios o certificaciones profesionales.</li>
                  <li>Decisiones tomadas por el Usuario basadas en el contenido de la Plataforma.</li>
                  <li>Pérdida de datos derivada de fallos técnicos, salvo negligencia grave o dolo.</li>
                </ul>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Dado que Vantio actualmente opera como un servicio gratuito, la responsabilidad total de Vantio
                  frente al Usuario por cualquier reclamación se limitará, en todo caso, a cero pesos colombianos
                  (COP $0).
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">6.5 Fuerza mayor</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Vantio no será responsable por el incumplimiento de sus obligaciones cuando este sea causado por
                  eventos de fuerza mayor o caso fortuito, incluyendo desastres naturales, incendios, terremotos,
                  actos de gobierno, cortes de energía, fallas en telecomunicaciones ajenas a Vantio, ciberataques,
                  o cualquier otra circunstancia fuera del control razonable del Titular de la Plataforma.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">7. Servicios de Terceros</h2>
                <p className="text-sm text-slate-600 leading-relaxed">
                  La Plataforma puede contener enlaces a sitios web, recursos o servicios de terceros. Vantio no
                  controla, respalda ni asume responsabilidad por el contenido, las políticas de privacidad o las
                  prácticas de dichos terceros. La interacción con terceros es por cuenta y riesgo exclusivo del
                  Usuario. Los proveedores de infraestructura utilizados por Vantio son seleccionados con
                  criterios de calidad y seguridad, pero Vantio no garantiza su disponibilidad continua o su
                  inmunidad frente a incidentes de seguridad.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">8. Sistema de Puntuación y Evaluación</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">8.1 Criterio de aprobación</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  La Plataforma establece un umbral de aprobación predeterminado (sesenta por ciento — 60%) para
                  los quizzes. Este umbral es un criterio interno de la Plataforma y no corresponde necesariamente
                  al umbral de aprobación de ningún examen preparatorio oficial o certificación profesional.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">8.2 Naturaleza indicativa de las puntuaciones</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Las puntuaciones, análisis de rendimiento y recomendaciones generadas por la Plataforma tienen
                  carácter indicativo y orientativo. No constituyen una evaluación formal, certificación académica
                  ni acreditación profesional.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">9. Comunicaciones</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.1 Comunicaciones del servicio</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Al registrarse, el Usuario acepta recibir comunicaciones esenciales del servicio al correo
                  electrónico registrado, incluyendo: confirmación de registro, notificaciones sobre cambios en
                  los Términos o la Política de Privacidad, alertas de seguridad y notificaciones sobre el estado
                  de la cuenta.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">9.2 Comunicaciones promocionales</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Actualmente Vantio no envía comunicaciones promocionales o de marketing. En caso de
                  implementarse en el futuro, el Usuario será informado previamente y podrá optar por no recibirlas
                  en cualquier momento.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">10. Terminación</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">10.1 Terminación por el Usuario</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  El Usuario puede dejar de utilizar la Plataforma en cualquier momento y solicitar la eliminación
                  de su cuenta conforme al procedimiento descrito en la sección 3.5.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">10.2 Terminación por Vantio</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Vantio se reserva el derecho de suspender o cancelar el acceso de un Usuario a la Plataforma,
                  sin previo aviso, en los siguientes casos:
                </p>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li>Violación de estos Términos y Condiciones.</li>
                  <li>Uso fraudulento o abusivo de la Plataforma.</li>
                  <li>Conducta que pueda causar perjuicio a Vantio, a otros Usuarios o a terceros.</li>
                  <li>Requerimiento de autoridad judicial o administrativa competente.</li>
                  <li>Inactividad prolongada (más de 24 meses), previa notificación al Usuario.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">10.3 Efectos de la terminación</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Tras la terminación de la cuenta: el Usuario perderá el acceso a la Plataforma y a su historial
                  de pruebas; Vantio procederá a la eliminación o anonimización de los datos personales conforme a
                  su Política de Privacidad; las disposiciones de estos Términos que por su naturaleza deban
                  sobrevivir a la terminación (propiedad intelectual, limitación de responsabilidad, ley aplicable)
                  permanecerán vigentes.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">11. Ley Aplicable y Jurisdicción</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">11.1 Ley aplicable</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Estos Términos y Condiciones se rigen e interpretan de conformidad con las leyes de la República
                  de Colombia, sin tener en cuenta sus principios de conflictos de leyes.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">11.2 Legislación específica aplicable</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">El uso de la Plataforma está sujeto, entre otras, a las siguientes disposiciones:</p>
                <ul className="text-sm text-slate-600 space-y-1.5 ml-4 list-disc mb-4">
                  <li>Ley 527 de 1999 (Comercio Electrónico).</li>
                  <li>Ley 1581 de 2012 (Protección de Datos Personales).</li>
                  <li>Ley 23 de 1982 (Derechos de Autor).</li>
                  <li>Ley 1480 de 2011 (Estatuto del Consumidor), en lo que resulte aplicable a servicios digitales gratuitos.</li>
                </ul>

                <h3 className="text-sm font-bold text-slate-800 mb-2">11.3 Resolución de conflictos</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Para cualquier controversia derivada de estos Términos, las partes procurarán inicialmente una
                  solución amistosa. El Usuario puede dirigir sus inquietudes a{' '}
                  <a href="mailto:sam94c@gmail.com" className="text-amber-600 font-semibold hover:underline">sam94c@gmail.com</a>.
                  En caso de no alcanzarse un acuerdo, las partes se someten a la jurisdicción de los tribunales
                  competentes de la República de Colombia. Para los Usuarios consumidores residentes en Colombia,
                  será competente el juez del domicilio del Usuario.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-4">12. Disposiciones Finales</h2>

                <h3 className="text-sm font-bold text-slate-800 mb-2">12.1 Invalidez parcial</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  Si cualquier disposición de estos Términos fuera declarada nula, ineficaz o inválida por
                  autoridad competente, dicha disposición se tendrá por no puesta, sin que ello afecte la validez
                  y eficacia de las restantes disposiciones.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">12.2 No renuncia</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  La falta de ejercicio por parte de Vantio de cualquier derecho o disposición de estos Términos
                  no constituirá una renuncia a dicho derecho o disposición, ni a ejercerlo en el futuro.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">12.3 Cesión</h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  El Usuario no puede ceder, transferir o subrogar sus derechos y obligaciones derivados de estos
                  Términos sin el consentimiento previo y por escrito de Vantio. Vantio podrá ceder sus derechos y
                  obligaciones en cualquier momento, notificándolo al Usuario.
                </p>

                <h3 className="text-sm font-bold text-slate-800 mb-2">12.4 Acuerdo completo</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Estos Términos, junto con la Política de Privacidad, constituyen el acuerdo completo entre el
                  Usuario y Vantio en relación con el uso de la Plataforma, y sustituyen todos los acuerdos,
                  entendimientos y comunicaciones previos, verbales o escritos.
                </p>
              </div>

              <div>
                <h2 className="font-serif text-xl font-bold text-slate-900 mb-3">13. Contacto</h2>
                <p className="text-sm text-slate-600 leading-relaxed mb-3">
                  Para cualquier consulta, solicitud de soporte, notificación o reclamación relacionada con estos
                  Términos y Condiciones, el Usuario puede contactar a:
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
