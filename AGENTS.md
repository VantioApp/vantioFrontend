# AGENTS.md - Vantio Frontend

## Descripción del Proyecto

**Vantio Frontend** es la interfaz de usuario de la plataforma educativa Vantio, diseñada para profesionales de leyes y contabilidad en Colombia. Proporciona una experiencia moderna y responsiva para que estudiantes realicen simulacros de exámenes preparatorios de Derecho Penal y Civil.

### Contexto del Dominio

- **Propósito**: Preparación para exámenes preparatorios de Derecho Penal y Civil
- **Audiencia**: Estudiantes de derecho y profesionales que buscan certificaciones
- **Materias iniciales**: Derecho Penal (Teoría del Delito, Bienes Jurídicos, Procedimiento Penal) y Derecho Privado (Civiles I, Civiles II)
- **Fase futura**: Contabilidad (no implementada aún)

---

## Stack Tecnológico

| Componente | Tecnología | Versión |
|---|---|---|
| Framework | Next.js (App Router) | 15.x |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS | 4.x |
| Estado global | Zustand | 5.x |
| Animaciones | Framer Motion | 12.x |
| Iconos | Lucide React | 1.x |
| Fuentes | Merriweather + Inter | next/font |
| Runtime | Node.js | 20+ |

---

## Estructura del Proyecto

```
vantioFrontend/
├── src/
│   ├── app/                         # Rutas de Next.js App Router
│   │   ├── page.tsx                 # Landing page (/)
│   │   ├── layout.tsx               # Layout raíz con fuentes
│   │   ├── globals.css              # Estilos globales + Tailwind
│   │   ├── login/page.tsx           # Inicio de sesión (/login)
│   │   ├── register/page.tsx        # Registro (/register)
│   │   ├── dashboard/page.tsx       # Panel estudiante (/dashboard)
│   │   ├── admin/page.tsx           # Panel admin (/admin)
│   │   └── quiz/
│   │       └── [testId]/
│   │           ├── page.tsx         # Interfaz quiz (/quiz/:testId)
│   │           └── results/page.tsx # Resultados (/quiz/:testId/results)
│   ├── components/                  # Componentes reutilizables
│   ├── stores/                      # Zustand stores
│   │   ├── authStore.ts             # Estado de autenticación
│   │   └── quizStore.ts             # Estado del quiz activo
│   ├── lib/                         # Utilidades y helpers
│   │   ├── api.ts                   # Cliente API con fetch
│   │   └── utils.ts                 # Funciones helper (cn, formatDate, etc.)
│   └── types/                       # Tipos TypeScript
│       └── index.ts                 # User, Question, QuizState, etc.
├── public/                          # Assets estáticos
├── next.config.ts                   # Configuración Next.js
├── postcss.config.mjs               # Configuración PostCSS
├── tsconfig.json                    # Configuración TypeScript
└── package.json
```

---

## Convenciones de Código

### Next.js App Router

- **Server Components**: Por defecto, todos los componentes son Server Components
- **Client Components**: Usar `'use client'` al inicio del archivo cuando se necesiten hooks o interactividad
- **Rutas**: Cada carpeta en `app/` representa una ruta
- **Layouts**: `layout.tsx` envuelve las páginas y se comparte entre rutas
- **Metadata**: Exportar `metadata` desde `layout.tsx` o `page.tsx`

### Componentes

- **Naming**: PascalCase para componentes (`LandingPage.tsx`)
- **Props**: TypeScript interfaces para todas las props
- **Estilos**: Tailwind CSS utility classes, evitar CSS personalizado
- **Accesibilidad**: Usar elementos semánticos (`<button>`, `<nav>`, `<main>`)
- **Imágenes**: Siempre usar `next/image` para optimización

### Estado con Zustand

- **Stores**: Un store por dominio (auth, quiz)
- **Persistencia**: Usar `persist` middleware para datos que deben sobrevivir refresh
- **Actions**: Métodos que modifican el estado, nombrados con verbos
- **Selectores**: Acceder solo a las propiedades necesarias en cada componente

### TypeScript

- **Strict mode**: Habilitado en `tsconfig.json`
- **Types**: Definir interfaces para todos los datos de API
- **No `any`**: Evitar tipo `any`, usar `unknown` si es necesario
- **Generics**: Usar generics en funciones reutilizables

### Estilos con Tailwind v4

- **Configuración**: Usar `@theme` en `globals.css` para definir variables
- **Fuentes**: Definir en `@theme` y usar con `font-serif` o `font-sans`
- **Colores**: Usar paleta de Tailwind (slate, amber, emerald, rose)
- **Responsive**: Mobile-first con breakpoints `sm:`, `md:`, `lg:`
- **Dark mode**: No implementado aún, pero usar clases preparadas

---

## Flujo de Autenticación

1. **Registro**: Usuario completa formulario en `/register`
2. **Login**: Usuario ingresa credenciales en `/login`
3. **Token JWT**: Backend devuelve `{ user, access_token }`
4. **Persistencia**: Token se guarda en Zustand store + localStorage
5. **Requests autenticados**: Header `Authorization: Bearer <token>`
6. **Protección de rutas**: Componentes verifican `isAuthenticated` y redirigen a `/login` si es necesario
7. **Logout**: Limpiar store y redirigir a `/`

---

## Flujo de Quiz

1. **Inicio**: Usuario hace clic en "Iniciar Nueva Prueba" en `/dashboard`
2. **Generación**: Frontend llama `POST /api/quiz/generate` con `subjectId`
3. **Backend**: Crea `TestSession` y retorna preguntas sin respuestas correctas
4. **Interfaz**: Usuario responde preguntas una por una en `/quiz/[testId]`
5. **Timer**: Countdown de 30 minutos, se actualiza cada segundo
6. **Envío**: Al finalizar, frontend llama `POST /api/quiz/[testId]/submit`
7. **Resultados**: Frontend muestra resultados en `/quiz/[testId]/results`
8. **Historial**: Se actualiza en `/dashboard`

---

## Integración con Backend

### Cliente API

```typescript
// src/lib/api.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  get: <T>(endpoint: string, token?: string | null) => request<T>(endpoint, { token }),
  post: <T>(endpoint: string, body?: unknown, token?: string | null) => 
    request<T>(endpoint, { method: 'POST', body, token }),
};
```

### Endpoints consumidos

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar usuario |
| POST | `/auth/login` | Iniciar sesión |
| GET | `/auth/profile` | Obtener perfil |
| POST | `/quiz/generate` | Generar quiz |
| POST | `/quiz/:testId/submit` | Enviar respuestas |
| GET | `/quiz/:testId/results` | Resultados |
| GET | `/quiz/history/:userId` | Historial |

---

## Variables de Entorno

| Variable | Descripción | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL de la API de Vantio Backend | `http://localhost:3001/api` |

---

## Comandos

### Desarrollo

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev

# Abrir en navegador
open http://localhost:3000
```

### Build y Producción

```bash
# Compilar para producción
npm run build

# Iniciar servidor de producción
npm run start
```

### Linting

```bash
# Ejecutar ESLint
npm run lint
```

---

## Sistema de Diseño

El proyecto sigue el sistema de diseño **Lexicon Academic**:

### Tipografía
- **Merriweather** (Serif): Títulos y headings - autoridad académica
- **Inter** (Sans-serif): Cuerpo y UI - legibilidad funcional

### Colores principales
- **Slate-900** (#0f172a): Texto principal, botones primarios
- **Amber-500/600** (#f59e0b / #d97706): Acentos, acciones destacadas
- **Slate-50** (#f8fafc): Fondo de página
- **White** (#ffffff): Superficies de contenido

### Espaciado
- **Base unit**: 4px
- **Container max**: 1280px
- **Gutter**: 24px
- **Stack sizes**: sm (8px), md (16px), lg (32px)

### Bordes redondeados
- **sm**: 0.25rem (4px)
- **DEFAULT**: 0.5rem (8px)
- **md**: 0.75rem (12px)
- **lg**: 1rem (16px)
- **xl**: 1.5rem (24px)
- **full**: 9999px (círculos)

Ver `DESIGN.md` para el sistema de diseño completo.

---

## Optimizaciones de Next.js

### Imágenes
- Usar `next/image` para todas las imágenes
- Configurar dominios remotos en `next.config.ts`
- Usar `priority` para imágenes above-the-fold

### Fuentes
- Usar `next/font` para Merriweather e Inter
- Fuentes se cargan automáticamente con `display: swap`
- No hay layout shift (CLS)

### Rendimiento
- Server Components por defecto
- Client Components solo cuando es necesario
- Code splitting automático por ruta
- Static generation para páginas estáticas

---

## Convenciones de Git

- **Branches**: `main` (producción), `develop` (desarrollo), `feature/*` (nuevas features)
- **Commits**: Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, etc.)
- **PRs**: Requeridos para merges a `main`
- **No commits de**: `.env.local`, `node_modules`, `.next`, archivos sensibles

---

## Consideraciones de Accesibilidad

- **Semántica**: Usar elementos HTML semánticos (`<nav>`, `<main>`, `<article>`)
- **ARIA**: Agregar atributos ARIA cuando sea necesario
- **Keyboard navigation**: Todos los elementos interactivos deben ser accesibles por teclado
- **Focus states**: Indicadores de focus visibles
- **Color contrast**: Ratio mínimo 4.5:1 para texto normal
- **Alt text**: Todas las imágenes deben tener texto alternativo descriptivo

---

## Dependencias del Backend

El frontend consume la API de `vantioBackend`. Para desarrollo local:
- Backend corre en `http://localhost:3001`
- Frontend corre en `http://localhost:3000`
- CORS está configurado en el backend para permitir ambos orígenes

---

## Recursos Adicionales

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Documentación Framer Motion](https://www.framer.com/motion/)
- [Documentación Lucide Icons](https://lucide.dev/icons/)
