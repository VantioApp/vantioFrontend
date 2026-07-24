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
| Framework | Next.js (App Router) | 16.x |
| Lenguaje | TypeScript | 5.x |
| Estilos | Tailwind CSS | 4.x |
| Estado global | Zustand | 5.x |
| Data Fetching | TanStack Query | 5.x |
| Animaciones | Framer Motion | 12.x |
| Iconos | Lucide React | 1.x |
| Fuentes | Merriweather + Inter | next/font |
| Runtime | Node.js | 20+ |

---

## Estructura del Proyecto

## Arquitectura de Tres Capas

El proyecto sigue una arquitectura de tres capas para separar responsabilidades:

```
vantioFrontend/
├── src/
│   ├── app/                         # Capa 1: Rutas y layouts (Next.js App Router)
│   │   ├── page.tsx                 # Landing page (/)
│   │   ├── layout.tsx               # Layout raíz con fuentes
│   │   ├── proxy.ts                 # Protección de rutas (Next.js 16)
│   │   ├── globals.css              # Estilos globales + Tailwind
│   │   ├── login/page.tsx           # Inicio de sesión (/login)
│   │   ├── register/page.tsx        # Registro (/register)
│   │   ├── dashboard/
│   │   │   ├── page.tsx             # Server Component (prefetch)
│   │   │   └── DashboardClient.tsx  # Client Component
│   │   ├── admin/
│   │   │   ├── page.tsx             # Server Component (prefetch)
│   │   │   ├── AdminClient.tsx      # Client Component
│   │   │   └── ...
│   │   └── quiz/
│   │       └── [testId]/
│   │           ├── page.tsx         # Interfaz quiz (/quiz/:testId)
│   │           └── results/page.tsx # Resultados (/quiz/:testId/results)
│   │
│   ├── core/                        # Capa 2: Lógica de negocio y datos
│   │   ├── actions/                 # Funciones de API por dominio
│   │   │   ├── api/
│   │   │   │   └── fetch-client.ts  # Cliente fetch central
│   │   │   ├── auth/
│   │   │   │   └── auth-actions.ts  # loginAction, registerAction, etc.
│   │   │   ├── quiz/
│   │   │   │   └── quiz-actions.ts  # generateQuizAction, submitQuizAction, etc.
│   │   │   ├── admin/
│   │   │   │   └── admin-actions.ts # getAdminStatsAction, etc.
│   │   │   └── questions/
│   │   │       └── questions-actions.ts
│   │   ├── interfaces/              # Tipos TypeScript por dominio
│   │   │   ├── auth/auth.ts
│   │   │   ├── quiz/quiz.ts
│   │   │   ├── admin/admin.ts
│   │   │   ├── questions/questions.ts
│   │   │   └── index.ts             # Re-exports centralizados
│   │   └── utils/                   # Utilidades puras
│   │       ├── cn.ts
│   │       ├── format-date.ts
│   │       ├── format-time.ts
│   │       └── server/
│   │           └── get-auth-token.ts
│   │
│   └── presentation/                # Capa 3: UI y estado
│       ├── components/              # Componentes React
│       │   ├── admin/
│       │   │   ├── QuestionFormModal.tsx
│       │   │   ├── ImportJsonModal.tsx
│       │   │   └── CreateAreaModal.tsx
│       │   ├── ui/
│       │   │   └── logo.tsx
│       │   ├── landing/
│       │   │   └── LandingClient.tsx
│       │   └── AuthHydrator.tsx
│       ├── hooks/                   # Custom hooks con TanStack Query
│       │   ├── use-auth.ts          # useLogin, useRegister, useLogout
│       │   ├── use-profile.ts       # useProfile
│       │   ├── use-quiz.ts          # useGenerateQuiz, useSubmitQuiz
│       │   ├── use-quiz-history.ts  # useQuizHistory
│       │   ├── use-quiz-results.ts  # useQuizResults
│       │   ├── use-admin-stats.ts   # useAdminStats
│       │   ├── use-admin-users.ts   # useAdminUsers
│       │   ├── use-admin-subjects.ts
│       │   ├── use-admin-questions.ts
│       │   ├── use-create-question.ts
│       │   ├── use-update-question.ts
│       │   ├── use-toggle-question.ts
│       │   ├── use-import-questions.ts
│       │   ├── use-create-area.ts
│       │   ├── use-subjects.ts
│       │   ├── use-questions-by-subject.ts
│       │   └── use-question.ts
│       ├── stores/                  # Zustand stores (solo estado local/UI)
│       │   ├── authStore.ts         # user, token, isAuthenticated
│       │   └── quizStore.ts         # Estado del quiz activo
│       └── assets/                  # Imágenes, fuentes, etc.
│
├── public/                          # Assets estáticos
├── next.config.ts                   # Configuración Next.js
├── postcss.config.mjs               # Configuración PostCSS
├── tsconfig.json                    # Configuración TypeScript
└── package.json
```

### Reglas de Capas

| Capa | Permitido | Prohibido |
|------|-----------|-----------|
| `app/` | Rutas, layouts, Server Components | Lógica de negocio, llamadas API directas |
| `core/` | Actions, interfaces, utils | Componentes React, JSX, hooks |
| `presentation/` | Componentes, hooks, stores, assets | Lógica de API directa |

### Path Aliases

```json
{
  "@/*": ["./src/*"],
  "@core/*": ["./src/core/*"],
  "@presentation/*": ["./src/presentation/*"]
}
```

---

## Convenciones de Código

### Next.js App Router

- **Server Components**: Por defecto, todos los componentes son Server Components
- **Client Components**: Usar `'use client'` al inicio del archivo cuando se necesiten hooks o interactividad
- **Rutas**: Cada carpeta en `app/` representa una ruta
- **Layouts**: `layout.tsx` envuelve las páginas y se comparte entre rutas
- **Metadata**: Exportar `metadata` desde `layout.tsx` o `page.tsx`
- **Estrategia híbrida**: Server Components hacen prefetch, Client Components usan hooks con `initialData`

### Agregar Nuevas Features

#### 1. Agregar un nuevo endpoint

**Paso 1: Crear la action en `core/actions/`**
```typescript
// src/core/actions/quiz/quiz-actions.ts
export const getQuizStatsAction = async (userId: string, token: string): Promise<QuizStats> => {
  return api.get<QuizStats>(`/quiz/stats/${userId}`, token);
};
```

**Paso 2: Crear el hook en `presentation/hooks/`**
```typescript
// src/presentation/hooks/use-quiz-stats.ts
import { useQuery } from '@tanstack/react-query';
import { getQuizStatsAction } from '@/core/actions/quiz/quiz-actions';
import { useAuthStore } from '@/presentation/stores/authStore';
import type { QuizStats } from '@/core/interfaces';

export function useQuizStats(userId: string, initialData?: QuizStats) {
  const token = useAuthStore((s) => s.token);
  return useQuery({
    queryKey: ['quiz-stats', userId],
    queryFn: () => getQuizStatsAction(userId, token!),
    enabled: !!userId && !!token,
    initialData,
  });
}
```

**Paso 3: Usar el hook en un componente**
```typescript
// En un Client Component
const { data: stats, isLoading } = useQuizStats(user.id);
```

#### 2. Agregar un nuevo tipo

**Paso 1: Definir en `core/interfaces/`**
```typescript
// src/core/interfaces/quiz/quiz.ts
export interface QuizStats {
  totalQuizzes: number;
  averageScore: number;
  bestScore: number;
}
```

**Paso 2: Exportar desde `core/interfaces/index.ts`**
```typescript
// src/core/interfaces/index.ts
export type { QuizStats } from './quiz/quiz';
```

#### 3. Agregar un nuevo componente

**Ubicación según tipo:**
- Componentes de UI generales: `presentation/components/ui/`
- Componentes de dominio específico: `presentation/components/<dominio>/`
- Componentes de página: `app/<ruta>/` (como Client Component si es necesario)

### Componentes

- **Naming**: PascalCase para componentes (`LandingPage.tsx`)
- **Props**: TypeScript interfaces para todas las props
- **Estilos**: Tailwind CSS utility classes, evitar CSS personalizado
- **Accesibilidad**: Usar elementos semánticos (`<button>`, `<nav>`, `<main>`)
- **Imágenes**: Siempre usar `next/image` para optimización
- **Imports**: Usar path aliases (`@/`, `@core/`, `@presentation/`)
- **Cursor pointer obligatorio**: Todos los elementos interactivos (`<button>`, `<Link>`, `<a>` con handler, `<tr>` clickeable, elementos de navegación) DEBEN incluir `cursor-pointer` en su className. Esto mejora la affordance y la UX. Excepción: botones en estado `disabled` usan `disabled:cursor-not-allowed`.

### Reglas Importantes

1. **NO usar `api` directamente en componentes**: Siempre usar hooks de TanStack Query
2. **NO incluir lógica de API en stores de Zustand**: Solo estado local/UI
3. **NO pasar `token` como prop a componentes**: Los hooks lo leen del store
4. **NO hacer fetch directo en Client Components**: Usar actions + hooks
5. **Server Components pueden usar actions directamente**: Para prefetch
6. **Siempre invalidar queries después de mutations**: Para mantener caché consistente
7. **Usar `initialData` en hooks**: Para estrategia híbrida server/client
8. **Query keys deben ser arrays**: Con dominio y parámetros relevantes
9. **Tipos en `core/interfaces/`**: Organizados por dominio, re-exportados desde `index.ts`
10. **Actions en `core/actions/`**: Funciones puras que solo hacen HTTP
11. **Hooks en `presentation/hooks/`**: Envuelven actions con TanStack Query
12. **Componentes en `presentation/components/`**: Solo UI, reciben datos via props o hooks

## Estado y Data Fetching

### Estado Local con Zustand

Zustand se usa **solo para estado local/UI** que no requiere caché o sincronización con servidor:

- **`authStore`**: user, token, isAuthenticated (estado de sesión)
- **`quizStore`**: Estado del quiz activo (preguntas, respuestas, timer)

**Reglas:**
- **NO** usar Zustand para datos del servidor (listas, estadísticas, etc.)
- **NO** incluir lógica de API en los stores
- Los stores deben ser simples: estado + setters síncronos
- Usar `persist` middleware solo para authStore (sobrevivir refresh)

### Data Fetching con TanStack Query

Todas las peticiones al servidor usan **TanStack Query v5** a través de custom hooks:

#### Actions (Capa core)

Funciones puras que encapsulan las llamadas HTTP:

```typescript
// src/core/actions/auth/auth-actions.ts
export const loginAction = async (email: string, password: string): Promise<AuthResponse> => {
  return api.post<AuthResponse>('/auth/login', { email, password });
};
```

#### Hooks (Capa presentation)

Custom hooks que envuelven las actions con TanStack Query:

```typescript
// src/presentation/hooks/use-auth.ts
export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }) => loginAction(email, password),
    onSuccess: (data) => {
      useAuthStore.getState().setAuth(data.user, data.access_token);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
  });
}
```

#### Patrones de Uso

**Queries (datos de solo lectura):**
```typescript
const { data: user } = useProfile();
const { data: history } = useQuizHistory(userId);
const { data: stats } = useAdminStats(7);
```

**Mutations (operaciones que modifican datos):**
```typescript
const { mutate: login, isPending, error } = useLogin();
const { mutate: generateQuiz } = useGenerateQuiz();
const { mutate: createQuestion } = useCreateQuestion();
```

**Invalidación de caché:**
- Después de mutations, invalidar queries relevantes
- Ejemplo: después de `useCreateQuestion`, invalidar `['admin-questions']` y `['admin-subjects']`

### Estrategia Híbrida Server/Client

Para páginas con datos críticos, usar **Server Components** para prefetch:

```typescript
// app/dashboard/page.tsx (Server Component)
export default async function DashboardPage() {
  const token = await getAuthToken();
  const user = await getProfileAction(token);
  const history = await getQuizHistoryAction(user.id, token);
  return <DashboardClient initialUser={user} initialHistory={history} />;
}

// app/dashboard/DashboardClient.tsx (Client Component)
export default function DashboardClient({ initialUser, initialHistory }) {
  const { data: user } = useProfile(initialUser);
  const { data: history } = useQuizHistory(user?.id, initialHistory);
  // ...
}
```

**Ventajas:**
- Mejor UX: datos llegan con la página inicial
- TanStack Query usa `initialData` para no repetir la petición
- Permite revalidación automática en el cliente

### Query Keys y Invalidación

#### Query Keys Consistentes

Usar arrays con dominio y parámetros para invalidaciones precisas:

```typescript
// Queries simples
queryKey: ['profile']
queryKey: ['subjects']

// Queries con parámetros
queryKey: ['quiz-history', userId]
queryKey: ['admin-stats', days]
queryKey: ['admin-users', page, search]
queryKey: ['admin-questions', area, page, search, subjectId, isActive]
queryKey: ['quiz-results', testId]
```

#### Patrones de Invalidación

**Después de mutations, invalidar queries relevantes:**

```typescript
// Crear/actualizar pregunta
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['admin-questions'] });
  queryClient.invalidateQueries({ queryKey: ['admin-subjects'] });
}

// Enviar quiz
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['quiz-history', userId] });
}

// Login/register
onSuccess: () => {
  queryClient.invalidateQueries({ queryKey: ['profile'] });
}

// Logout
onSuccess: () => {
  queryClient.clear(); // Limpiar toda la caché
}
```

**Invalidación selectiva:**

```typescript
// Invalidar solo preguntas de un área específica
queryClient.invalidateQueries({ 
  queryKey: ['admin-questions', 'Derecho Penal'] 
});

// Invalidar todas las preguntas (cualquier área)
queryClient.invalidateQueries({ 
  queryKey: ['admin-questions'] 
});
```

#### Optimistic Updates

Para mejor UX, usar optimistic updates en operaciones rápidas:

```typescript
// useToggleQuestion.ts
onMutate: async (questionId) => {
  await queryClient.cancelQueries({ queryKey: ['admin-questions', ...] });
  const previous = queryClient.getQueryData(['admin-questions', ...]);
  
  if (previous) {
    queryClient.setQueryData(['admin-questions', ...], {
      ...previous,
      questions: previous.questions.map(q =>
        q.id === questionId ? { ...q, isActive: !q.isActive } : q
      ),
    });
  }
  
  return { previous };
},
onError: (_err, _questionId, context) => {
  if (context?.previous) {
    queryClient.setQueryData(['admin-questions', ...], context.previous);
  }
},
onSettled: () => {
  queryClient.invalidateQueries({ queryKey: ['admin-questions', ...] });
}
```

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
3. **Mutación con TanStack Query**: 
   - `useRegister()` o `useLogin()` ejecutan la mutación
   - On success: actualizan `authStore` con `setAuth(user, token)`
   - Guardan token en cookies (`access_token`, `vantio_token`)
   - Invalidan query `['profile']`
4. **Redirección por rol**:
   - Si `user.role === 'admin'` → `/admin`
   - Si no → `/dashboard`
5. **Persistencia**: 
   - Token en cookies (httpOnly si el backend lo configura)
   - Estado de auth en Zustand store (persist middleware)
6. **Requests autenticados**: 
   - Token se pasa explícitamente a las actions
   - Hooks leen token de `useAuthStore`
7. **Protección de rutas**:
   - `proxy.ts` verifica token en cookies
   - `/admin/*`: Solo usuarios con rol `admin`. Estudiantes son redirigidos a `/dashboard`.
   - `/dashboard`, `/quiz/*`: Requieren autenticación.
8. **Hydratación**: 
   - `AuthHydrator` verifica token al cargar la app
   - Si hay token, llama a `getProfileAction` para validar
   - Si falla, limpia auth con `clearAuth()`
9. **Logout**: 
   - `useLogout()` ejecuta mutación
   - Limpia cookies y store
   - Limpia caché de TanStack Query con `queryClient.clear()`
   - Redirige a `/`

---

## Flujo de Quiz

1. **Inicio**: Usuario hace clic en "Iniciar Nueva Prueba" en `/dashboard`
2. **Selección de área**: Modal para elegir entre "Derecho Penal" o "Derecho Privado"
3. **Generación con mutación**: 
   - `useGenerateQuiz()` ejecuta `generateQuizAction`
   - On success: actualiza `quizStore` con `setQuiz(testId, questions)`
   - Redirige a `/quiz/[testId]`
4. **Backend**: Busca todas las materias del área, selecciona 40 preguntas aleatorias y crea `TestSession`
5. **Interfaz**: Usuario responde preguntas una por una en `/quiz/[testId]`
6. **Timer**: Countdown de 30 minutos, manejado por `quizStore.tickTimer()`
7. **Envío con mutación**: 
   - Al finalizar (timer o última pregunta), `useSubmitQuiz()` ejecuta `submitQuizAction`
   - On success: invalida `['quiz-history']` para actualizar dashboard
   - Redirige a `/quiz/[testId]/results`
8. **Resultados**: Frontend muestra resultados en `/quiz/[testId]/results`
   - Usa datos del `quizStore` (preguntas, respuestas, score)
   - Opcionalmente puede usar `useQuizResults` para obtener datos del backend
9. **Historial**: Se actualiza automáticamente en `/dashboard` gracias a la invalidación de caché

---

## Integración con Backend

### Cliente Fetch Central

```typescript
// src/core/actions/api/fetch-client.ts
const API_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export async function fetchClient<T>(
  endpoint: string,
  options: { method?: string; body?: unknown; token?: string | null } = {}
): Promise<T> {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };
  if (options.token) {
    headers['Authorization'] = `Bearer ${options.token}`;
  }
  // ... fetch logic
}

export const api = {
  get: <T>(endpoint: string, token?: string | null) => fetchClient<T>(endpoint, { token }),
  post: <T>(endpoint: string, body?: unknown, token?: string | null) => 
    fetchClient<T>(endpoint, { method: 'POST', body, token }),
  put: <T>(endpoint: string, body?: unknown, token?: string | null) => 
    fetchClient<T>(endpoint, { method: 'PUT', body, token }),
  patch: <T>(endpoint: string, body?: unknown, token?: string | null) => 
    fetchClient<T>(endpoint, { method: 'PATCH', body, token }),
  delete: <T>(endpoint: string, token?: string | null) => 
    fetchClient<T>(endpoint, { method: 'DELETE', token }),
};
```

### Actions por Dominio

| Dominio | Archivo | Actions |
|---------|---------|---------|
| Auth | `core/actions/auth/auth-actions.ts` | `loginAction`, `registerAction`, `logoutAction`, `getProfileAction` |
| Quiz | `core/actions/quiz/quiz-actions.ts` | `generateQuizAction`, `submitQuizAction`, `getQuizResultsAction`, `getQuizHistoryAction` |
| Admin | `core/actions/admin/admin-actions.ts` | `getAdminStatsAction`, `getAdminUsersAction`, `getAdminSubjectsAction`, `getAdminQuestionsAction`, `createQuestionAction`, `updateQuestionAction`, `toggleQuestionAction`, `importQuestionsAction`, `createAreaAction` |
| Questions | `core/actions/questions/questions-actions.ts` | `getSubjectsAction`, `getQuestionsBySubjectAction`, `getQuestionAction` |

### Hooks por Dominio

| Dominio | Archivo | Hooks |
|---------|---------|-------|
| Auth | `presentation/hooks/use-auth.ts` | `useLogin`, `useRegister`, `useLogout` |
| Profile | `presentation/hooks/use-profile.ts` | `useProfile` |
| Quiz | `presentation/hooks/use-quiz.ts` | `useGenerateQuiz`, `useSubmitQuiz` |
| Quiz History | `presentation/hooks/use-quiz-history.ts` | `useQuizHistory` |
| Quiz Results | `presentation/hooks/use-quiz-results.ts` | `useQuizResults` |
| Admin Stats | `presentation/hooks/use-admin-stats.ts` | `useAdminStats` |
| Admin Users | `presentation/hooks/use-admin-users.ts` | `useAdminUsers` |
| Admin Subjects | `presentation/hooks/use-admin-subjects.ts` | `useAdminSubjects` |
| Admin Questions | `presentation/hooks/use-admin-questions.ts` | `useAdminQuestions` |
| CRUD Questions | `presentation/hooks/use-*-question.ts` | `useCreateQuestion`, `useUpdateQuestion`, `useToggleQuestion` |
| Import | `presentation/hooks/use-import-questions.ts` | `useImportQuestions` |
| Areas | `presentation/hooks/use-create-area.ts` | `useCreateArea` |
| Public Questions | `presentation/hooks/use-subjects.ts` | `useSubjects` |
| Questions by Subject | `presentation/hooks/use-questions-by-subject.ts` | `useQuestionsBySubject` |
| Question by ID | `presentation/hooks/use-question.ts` | `useQuestion` |

### Endpoints consumidos

| Método | Endpoint | Auth | Action | Hook |
|--------|----------|------|--------|------|
| POST | `/auth/register` | No | `registerAction` | `useRegister` |
| POST | `/auth/login` | No | `loginAction` | `useLogin` |
| GET | `/auth/profile` | JWT | `getProfileAction` | `useProfile` |
| POST | `/auth/logout` | No | `logoutAction` | `useLogout` |
| POST | `/quiz/generate` | JWT | `generateQuizAction` | `useGenerateQuiz` |
| POST | `/quiz/:testId/submit` | JWT | `submitQuizAction` | `useSubmitQuiz` |
| GET | `/quiz/:testId/results` | JWT | `getQuizResultsAction` | `useQuizResults` |
| GET | `/quiz/history/:userId` | JWT | `getQuizHistoryAction` | `useQuizHistory` |
| GET | `/admin/stats?days=7` | Admin | `getAdminStatsAction` | `useAdminStats` |
| GET | `/admin/users?search=&page=&limit=` | Admin | `getAdminUsersAction` | `useAdminUsers` |
| GET | `/admin/subjects` | Admin | `getAdminSubjectsAction` | `useAdminSubjects` |
| GET | `/admin/questions?area=&subjectId=&search=&isActive=&page=&limit=` | Admin | `getAdminQuestionsAction` | `useAdminQuestions` |
| POST | `/admin/questions` | Admin | `createQuestionAction` | `useCreateQuestion` |
| PUT | `/admin/questions/:id` | Admin | `updateQuestionAction` | `useUpdateQuestion` |
| PATCH | `/admin/questions/:id/toggle` | Admin | `toggleQuestionAction` | `useToggleQuestion` |
| POST | `/admin/questions/import` | Admin | `importQuestionsAction` | `useImportQuestions` |
| POST | `/admin/areas` | Admin | `createAreaAction` | `useCreateArea` |
| GET | `/questions/subjects` | No | `getSubjectsAction` | `useSubjects` |
| GET | `/questions/subject/:subjectId` | No | `getQuestionsBySubjectAction` | `useQuestionsBySubject` |
| GET | `/questions/:id` | No | `getQuestionAction` | `useQuestion` |

---

## Protección de Rutas (Proxy)

Next.js 16 usa `proxy.ts` (anteriormente `middleware.ts`) para protección de rutas:

```typescript
// src/proxy.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('access_token')?.value ||
                request.cookies.get('vantio_token')?.value;
  const { pathname } = request.nextUrl;

  const protectedRoutes = ['/dashboard', '/admin', '/quiz'];
  const isProtected = protectedRoutes.some(r => pathname.startsWith(r));

  if (isProtected && !token) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*', '/quiz/:path*'],
};
```

**Nota:** En Next.js 16, `middleware.ts` fue renombrado a `proxy.ts`. El archivo debe estar en la raíz de `src/` o en la raíz del proyecto.

---

## Variables de Entorno

| Variable | Descripción | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL de la API de Vantio Backend | `http://localhost:4001/api` |

---

## Comandos

### Desarrollo

```bash
# Instalar dependencias
pnpm install

# Iniciar servidor de desarrollo
pnpm run dev

# Abrir en navegador
open http://localhost:3000
```

### Build y Producción

```bash
# Compilar para producción
pnpm run build

# Iniciar servidor de producción
pnpm run start
```

### Linting

```bash
# Ejecutar ESLint
pnpm run lint
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
- Backend corre en `http://localhost:4001`
- Frontend corre en `http://localhost:3000`
- CORS está configurado en el backend para permitir ambos orígenes

---

## Recursos Adicionales

- [Documentación Next.js](https://nextjs.org/docs)
- [Documentación Tailwind CSS](https://tailwindcss.com/docs)
- [Documentación TanStack Query](https://tanstack.com/query/latest)
- [Documentación Zustand](https://docs.pmnd.rs/zustand/getting-started/introduction)
- [Documentación Framer Motion](https://www.framer.com/motion/)
- [Documentación Lucide Icons](https://lucide.dev/icons/)

---

## Resumen de Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                         app/                                 │
│  (Rutas, Server Components, prefetch, layouts)              │
└────────────────┬────────────────────────────────────────────┘
                 │ usa
                 ▼
┌─────────────────────────────────────────────────────────────┐
│                    presentation/                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │  components  │  │    hooks     │  │   stores     │     │
│  │   (UI/JSX)   │  │ (TanStack Q) │  │  (Zustand)   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────────────┘     │
└─────────┼──────────────────┼───────────────────────────────┘
          │ usa              │ usa
          │                  ▼
          │         ┌─────────────────────────────────────────┐
          │         │                      core/               │
          │         │  ┌──────────────┐  ┌──────────────┐    │
          │         │  │   actions    │  │  interfaces  │    │
          │         │  │   (HTTP)     │  │   (types)    │    │
          │         │  └──────┬───────┘  └──────────────┘    │
          │         └─────────┼───────────────────────────────┘
          │                   │ usa
          │                   ▼
          │         ┌─────────────────────────────────────────┐
          │         │           fetch-client.ts                │
          │         │      (Cliente HTTP central)              │
          └─────────┴─────────────────────────────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Backend API    │
                    │  (vantioBackend) │
                    └──────────────────┘
```

**Flujo de datos:**
1. Server Component hace prefetch con actions
2. Pasa `initialData` a Client Component
3. Client Component usa hooks de TanStack Query con `initialData`
4. Hooks llaman actions (que usan fetch-client)
5. TanStack Query maneja caché, revalidación, estados de carga/error
6. Zustand solo para estado local (auth, quiz activo)
