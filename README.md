# Vantio Frontend

<div align="center">

**Plataforma educativa de quiz para profesionales de leyes y contabilidad en Colombia**

*Preparación rigurosa para exámenes preparatorios de Derecho Penal y Civil*

</div>

---

## 📋 Descripción

Vantio Frontend es la interfaz de usuario de la plataforma educativa Vantio. Proporciona una experiencia moderna y responsiva para que estudiantes de derecho puedan:

- **Realizar simulacros** de exámenes preparatorios
- **Seguir su progreso** con métricas detalladas
- **Revisar respuestas** con explicaciones doctrinales
- **Administrar su perfil** y historial de pruebas

### Materias disponibles

- **Derecho Penal**: Teoría del Delito, Bienes Jurídicos, Procedimiento Penal
- **Derecho Privado**: Civiles I, Civiles II, Preguntas Adicionales

> **Nota**: La sección de Contabilidad está planificada para fases posteriores.

---

## 🛠️ Stack Tecnológico

| Componente | Tecnología |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Lenguaje** | TypeScript 5 |
| **Estilos** | Tailwind CSS v4 |
| **Estado** | Zustand |
| **Animaciones** | Framer Motion |
| **Iconos** | Lucide React |
| **Fuentes** | Merriweather + Inter (next/font) |
| **Imágenes** | Next.js Image Optimization |

---

## 📦 Instalación

### Prerrequisitos

- Node.js 20+
- npm, yarn, pnpm o bun
- Backend de Vantio corriendo (ver [vantioBackend](https://github.com/VantioApp/vantioBackend))

### Pasos

```bash
# Clonar repositorio
git clone https://github.com/VantioApp/vantioFrontend.git
cd vantioFrontend

# Instalar dependencias
pnpm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con la URL de tu API

# Iniciar servidor de desarrollo
pnpm run dev
```

La aplicación estará disponible en `http://localhost:3000`

---

## 🔐 Variables de Entorno

| Variable | Descripción | Default |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | URL de la API de Vantio Backend | `http://localhost:4001/api` |

---

## 📡 Integración con Backend

El frontend consume los siguientes endpoints del backend:

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Inicio de sesión
- `GET /api/auth/profile` - Perfil del usuario autenticado

### Quizzes
- `POST /api/quiz/generate` - Generar quiz aleatorio
- `POST /api/quiz/:testId/submit` - Enviar respuestas
- `GET /api/quiz/:testId/results` - Obtener resultados
- `GET /api/quiz/history/:userId` - Historial de pruebas

### Preguntas
- `GET /api/questions/subjects` - Listar materias
- `GET /api/questions/subject/:id` - Preguntas por materia

---

## 🗂️ Estructura del Proyecto

```
vantioFrontend/
├── src/
│   ├── app/                    # Rutas de Next.js App Router
│   │   ├── page.tsx            # Landing page
│   │   ├── login/page.tsx      # Inicio de sesión
│   │   ├── register/page.tsx   # Registro
│   │   ├── dashboard/page.tsx  # Panel del estudiante
│   │   ├── admin/page.tsx      # Panel de administrador
│   │   ├── quiz/
│   │   │   └── [testId]/
│   │   │       ├── page.tsx    # Interfaz de quiz
│   │   │       └── results/page.tsx  # Resultados
│   │   ├── layout.tsx          # Layout raíz
│   │   └── globals.css         # Estilos globales
│   ├── components/             # Componentes reutilizables
│   ├── stores/                 # Zustand stores
│   │   ├── authStore.ts        # Estado de autenticación
│   │   └── quizStore.ts        # Estado del quiz
│   ├── lib/                    # Utilidades
│   │   ├── api.ts              # Cliente API
│   │   └── utils.ts            # Funciones helper
│   └── types/                  # Tipos TypeScript
│       └── index.ts
├── public/                     # Assets estáticos
├── next.config.ts              # Configuración Next.js
├── tailwind.config.ts          # Configuración Tailwind
├── tsconfig.json               # Configuración TypeScript
└── package.json
```

---

## 🎨 Sistema de Diseño

El proyecto sigue el sistema de diseño **Lexicon Academic**:

### Tipografía
- **Títulos**: Merriweather (Serif) - Autoridad académica
- **Cuerpo**: Inter (Sans-serif) - Legibilidad funcional

### Colores principales
- **Deep Navy** (#0f172a) - Estabilidad institucional
- **Muted Gold** (#d97706) - Acento para acciones principales
- **Light Gray** (#f9fafb) - Fondo para reducir fatiga visual
- **Pure White** (#ffffff) - Superficies de contenido

Ver `DESIGN.md` para el sistema de diseño completo.

---

## 🚀 Comandos disponibles

| Comando | Descripción |
|---|---|
| `pnpm run dev` | Iniciar servidor de desarrollo |
| `pnpm run build` | Compilar para producción |
| `pnpm run start` | Iniciar servidor de producción |
| `pnpm run lint` | Ejecutar ESLint |

---

## 🔒 Autenticación

El frontend implementa autenticación JWT:

1. **Login/Registro**: El usuario ingresa credenciales
2. **Token JWT**: El backend devuelve un token con expiración de 7 días
3. **Persistencia**: El token se guarda en Zustand + localStorage
4. **Requests**: Se envía en header `Authorization: Bearer <token>`
5. **Protección de rutas**: Middleware de Next.js verifica autenticación

---

## 📱 Rutas de la Aplicación

| Ruta | Descripción | Auth |
|---|---|---|
| `/` | Landing page | No |
| `/login` | Inicio de sesión | No |
| `/register` | Registro | No |
| `/dashboard` | Panel del estudiante | Sí |
| `/admin` | Panel de administrador | Sí (admin) |
| `/quiz/[testId]` | Interfaz de quiz | Sí |
| `/quiz/[testId]/results` | Resultados del quiz | Sí |

---

## 🐳 Despliegue

### Vercel (Recomendado)

```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel
```

### Docker

```bash
# Construir imagen
docker build -t vantio-frontend .

# Ejecutar contenedor
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_API_URL=https://api.vantio.app \
  vantio-frontend
```

---

## 📄 Licencia

UNLICENSED - Proyecto privado de Vantio

---

<div align="center">

**Vantio** - Excelencia en preparación jurídica

</div>
