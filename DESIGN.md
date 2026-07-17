# DESIGN.md - Vantio Design System

## Lexicon Academic

El sistema de diseño de Vantio está diseñado para educación legal de alto nivel, priorizando autoridad, claridad y rigor intelectual. La estética es **Corporate Modern** con un enfoque hacia **Academic Editorial**, equilibrando el peso de la tradición legal con la eficiencia del software moderno.

---

## Brand & Style

El sistema está diseñado para profesionales legales y estudiantes de derecho que requieren un entorno enfocado y libre de distracciones para trabajo profundo. La UI evoca una sensación de "pergamino digital": limpio, estructurado y profundamente confiable. Altos ratios de espacio en blanco y jerarquías tipográficas rigurosas aseguran que textos legales complejos permanezcan legibles y navegables.

---

## Colors

### Paleta Principal

| Token | Hex | Uso |
|---|---|---|
| **Deep Navy** | `#0f172a` | Estabilidad institucional, botones primarios |
| **Muted Gold** | `#d97706` | Acento sofisticado para acciones principales |
| **Light Gray** | `#f9fafb` | Fondo de página, reduce fatiga visual |
| **Pure White** | `#ffffff` | Superficies de contenido, tarjetas |

### Colores de Feedback

| Token | Hex | Uso |
|---|---|---|
| **Emerald** | `#10b981` | Éxito, respuestas correctas, aprobado |
| **Rose** | `#f43f5e` | Error, respuestas incorrectas, requiere refuerzo |
| **Amber** | `#f59e0b` | Advertencia, destacado, progreso |

### Paleta Extendida (Tailwind)

```css
/* Slate - Textos y bordes */
--slate-50: #f8fafc;
--slate-100: #f1f5f9;
--slate-200: #e2e8f0;
--slate-300: #cbd5e1;
--slate-400: #94a3b8;
--slate-500: #64748b;
--slate-600: #475569;
--slate-700: #334155;
--slate-800: #1e293b;
--slate-900: #0f172a;

/* Amber - Acentos */
--amber-50: #fffbeb;
--amber-100: #fef3c7;
--amber-200: #fde68a;
--amber-300: #fcd34d;
--amber-400: #fbbf24;
--amber-500: #f59e0b;
--amber-600: #d97706;
--amber-700: #b45309;
--amber-800: #92400e;
--amber-900: #78350f;

/* Emerald - Éxito */
--emerald-50: #ecfdf5;
--emerald-100: #d1fae5;
--emerald-200: #a7f3d0;
--emerald-300: #6ee7b7;
--emerald-400: #34d399;
--emerald-500: #10b981;
--emerald-600: #059669;
--emerald-700: #047857;
--emerald-800: #065f46;
--emerald-900: #064e3b;

/* Rose - Error */
--rose-50: #fff1f2;
--rose-100: #ffe4e6;
--rose-200: #fecdd3;
--rose-300: #fda4af;
--rose-400: #fb7185;
--rose-500: #f43f5e;
--rose-600: #e11d48;
--rose-700: #be123c;
--rose-800: #9f1239;
--rose-900: #881337;
```

---

## Typography

El sistema emplea un emparejamiento clásico de **"Serif para Títulos, Sans para UI"**.

### Merriweather (Serif)
**Uso**: Títulos, headings, elementos de autoridad
**Características**: Sensación de libro, autoridad académica, tradición legal

| Estilo | Tamaño | Peso | Line Height | Letter Spacing |
|---|---|---|---|---|
| **headline-xl** | 40px | 700 | 52px | -0.02em |
| **headline-lg** | 32px | 700 | 40px | -0.01em |
| **headline-lg-mobile** | 28px | 700 | 36px | - |
| **headline-md** | 24px | 700 | 32px | - |

### Inter (Sans-serif)
**Uso**: Cuerpo, UI, texto funcional
**Características**: Densidad funcional, legibilidad, modernidad

| Estilo | Tamaño | Peso | Line Height | Letter Spacing |
|---|---|---|---|---|
| **body-lg** | 18px | 400 | 28px | - |
| **body-md** | 16px | 400 | 24px | - |
| **body-sm** | 14px | 400 | 20px | - |
| **label-md** | 14px | 600 | 16px | 0.05em |
| **label-sm** | 12px | 500 | 16px | - |

### Reglas de Tipografía

- **Ancho máximo de línea**: El texto del cuerpo nunca debe exceder 700px de ancho
- **label-md**: Usar para tags de categorías y headers de sección
- **Line heights generosos**: Accommodar terminología compleja y citas
- **Contraste**: Serif para decoración/autoridad, Sans para funcionalidad

---

## Layout & Spacing

### Filosofía

El layout sigue una filosofía de **Fixed Grid** en desktop para mantener una apariencia scholarly y estructurada, centrada en el viewport. En mobile y tablet, el grid transiciona a un modelo **Fluid**.

### Sistema de Espaciado

| Token | Valor | Uso |
|---|---|---|
| **unit** | 4px | Unidad base para todas las dimensiones |
| **container-max** | 1280px | Ancho máximo del contenido |
| **gutter** | 24px | Espacio entre columnas |
| **margin-desktop** | 48px | Margen lateral en desktop |
| **margin-mobile** | 16px | Margen lateral en mobile |
| **stack-sm** | 8px | Espacio vertical entre elementos relacionados |
| **stack-md** | 16px | Espacio vertical entre secciones |
| **stack-lg** | 32px | Espacio vertical entre secciones principales |

### Reglas de Layout

- **Ritmo vertical**: Crítico, usar `stack-lg` para separar secciones principales
- **Agrupación**: Usar `stack-sm` para agrupar labels e inputs relacionados
- **Respiración**: El contenido debe sentirse poco congestionado
- **Enfoque**: Permitir al usuario enfocarse en un concepto legal a la vez

---

## Elevation & Depth

El sistema usa **Tonal Layering** suplementado con **Ambient Shadows**. La mayoría de las superficies se mantienen en un nivel base plano para mantener un tono serio y profesional.

### Niveles de Elevación

| Nivel | Fondo | Sombra | Uso |
|---|---|---|---|
| **Level 0** | `#f9fafb` | - | Fondo de página |
| **Level 1** | `#ffffff` | `shadow-sm` (0 1px 2px 0 rgba(0,0,0,0.05)) | Tarjetas, contenido |
| **Level 2** | `#ffffff` | `shadow-md` (0 4px 6px -1px rgba(0,0,0,0.1)) | Dropdowns, modales |

### Reglas de Profundidad

- **Evitar**: Blurs pesados o glows coloridos
- **Sensación**: La profundidad debe sentirse física y understated
- **Metáfora**: Como papeles apilados en un escritorio limpio

---

## Shapes

El lenguaje de formas es **Rounded (8px base)**. Esto suaviza la austeridad del navy profundo y la tipografía serif, haciendo la plataforma sentir moderna y accesible en lugar de arcaica.

### Radios de Borde

| Token | Valor | Uso |
|---|---|---|
| **sm** | 0.25rem (4px) | Checkboxes, radio buttons, elementos técnicos |
| **DEFAULT** | 0.5rem (8px) | Botones estándar, inputs |
| **md** | 0.75rem (12px) | - |
| **lg** | 1rem (16px) | Tarjetas interactivas |
| **xl** | 1.5rem (24px) | Contenedores grandes |
| **full** | 9999px | Círculos, avatares |

---

## Components

### Buttons

#### Primary Button
```tsx
<button className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95">
  Acción Principal
</button>
```

#### Secondary Button
```tsx
<button className="border border-slate-300 hover:border-slate-400 bg-white hover:bg-slate-50 text-slate-800 font-semibold px-5 py-2.5 rounded-lg shadow-sm transition-all active:scale-95">
  Acción Secundaria
</button>
```

#### Accent Button
```tsx
<button className="bg-amber-600 hover:bg-amber-500 text-white font-semibold px-5 py-2.5 rounded-lg shadow-sm hover:shadow-md transition-all active:scale-95">
  Acción Destacada
</button>
```

### Inputs

```tsx
<input 
  type="text"
  className="w-full px-4 py-3 text-sm rounded-lg border border-slate-200 bg-white placeholder-slate-400 focus:outline-none focus:border-slate-900 focus:ring-2 focus:ring-slate-900/10 transition-all"
  placeholder="Placeholder text"
/>
```

**Comportamiento**:
- Borde: 1px `#e2e8f0` (slate-200)
- Focus: Borde cambia a Deep Navy con anillo exterior de 2px soft blue-gray

### Cards

```tsx
<div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
  {/* Contenido de la tarjeta */}
</div>
```

**Reglas**:
- Usar para módulos de cursos o estudios de caso
- Deben feature un borde de 1px Slate-100 y `shadow-sm` para distinguirse del fondo

### Chips / Tags

```tsx
<span className="bg-slate-100 text-slate-700 px-2.5 py-1 rounded text-xs font-semibold">
  Constitutional Law
</span>
```

**Uso**: Tags legales (ej. "Constitutional Law", "Penal", "Civil")

### Lists

**Reglas**:
- Usar divisores horizontales sutiles (`#f1f5f9`) en lugar de colores alternados
- Mantener apariencia académica

### Progress Bars

```tsx
<div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
  <div className="h-full bg-amber-500 rounded-full" style={{ width: '75%' }}></div>
</div>
```

**Reglas**:
- Altura del track: 4px (thin)
- Fill de progreso: Muted Gold para representar logro

---

## Iconography

### Lucide React

Usamos **Lucide React** para todos los iconos. Características:

- **Estilo**: Outline, consistente, moderno
- **Tamaños comunes**: 
  - Small: `w-4 h-4` (16px)
  - Medium: `w-5 h-5` (20px)
  - Large: `w-6 h-6` (24px)
- **Colores**: Heredar del texto padre o usar colores de acento

### Iconos Principales

| Icono | Uso |
|---|---|
| `Scale` | Logo, branding legal |
| `Award` | Logros, certificaciones |
| `GraduationCap` | Educación, estudiantes |
| `BookOpen` | Contenido, preguntas |
| `CheckCircle` | Éxito, aprobado |
| `AlertTriangle` | Error, requiere refuerzo |
| `Timer` | Tiempo, countdown |
| `Users` | Usuarios, estudiantes |
| `FileText` | Documentos, pruebas |
| `TrendingUp` | Progreso, métricas |

---

## Animation

### Framer Motion

Usamos **Framer Motion** para animaciones sutiles y profesionales.

#### Fade In + Slide Up
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  {/* Contenido */}
</motion.div>
```

#### Hover Lift
```tsx
<motion.div
  whileHover={{ y: -4 }}
  className="bg-white p-8 rounded-xl border border-slate-200 shadow-sm"
>
  {/* Tarjeta */}
</motion.div>
```

#### Scale In
```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.95 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.6 }}
>
  {/* Contenido */}
</motion.div>
```

### Reglas de Animación

- **Duración**: 0.3s - 0.6s para la mayoría de las animaciones
- **Easing**: ease-out para entradas, ease-in para salidas
- **Sutileza**: Las animaciones deben ser sutiles, no distractoras
- **Propósito**: Guiar la atención, no decorar

---

## Responsive Design

### Breakpoints

| Token | Valor | Uso |
|---|---|---|
| `sm` | 640px | Mobile landscape |
| `md` | 768px | Tablet |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Desktop |
| `2xl` | 1536px | Large desktop |

### Mobile-First

```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  {/* Items */}
</div>
```

### Reglas Responsive

- **Mobile-first**: Escribir estilos para mobile primero, luego escalar
- **Container queries**: Usar cuando sea posible para componentes reutilizables
- **Touch targets**: Mínimo 44x44px para elementos interactivos en mobile
- **Typography**: Reducir tamaños de heading en mobile (headline-lg-mobile)

---

## Accessibility

### WCAG 2.2 AA

- **Contraste de color**: Ratio mínimo 4.5:1 para texto normal
- **Focus indicators**: Visibles en todos los elementos interactivos
- **Keyboard navigation**: Todos los elementos accesibles por teclado
- **Screen readers**: Usar elementos semánticos y ARIA cuando sea necesario
- **Alt text**: Descriptivo para todas las imágenes

### Reglas de Accesibilidad

- **Semántica**: Usar `<button>` para acciones, `<a>` para navegación
- **Focus visible**: No remover outline sin proporcionar alternativa
- **Labels**: Todos los inputs deben tener labels asociados
- **Error messages**: Claros y específicos, asociados al input

---

## Dark Mode

**Estado**: No implementado aún

### Consideraciones futuras

- Usar `prefers-color-scheme` media query
- Invertir superficies: Dark background, light text
- Mantener acentos (Amber, Emerald, Rose) consistentes
- Probar contraste en ambos modos

---

## Ejemplos de Uso

### Landing Page Hero

```tsx
<section className="bg-white border-b border-slate-200/60 py-16 md:py-24">
  <div className="max-w-7xl mx-auto px-6">
    <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-slate-900 font-bold leading-[1.1] tracking-tight">
      Excelencia en tu <span className="underline decoration-amber-500/60 decoration-4 underline-offset-8">
        Preparación
      </span> Jurídica
    </h1>
    <p className="text-lg text-slate-600 leading-relaxed max-w-xl mt-6">
      La plataforma de cuestionarios interactivos y simulacros definitiva...
    </p>
  </div>
</section>
```

### Quiz Question Card

```tsx
<div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8">
  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-100 px-3 py-1 rounded">
    Pregunta 1 de 40
  </span>
  <h2 className="font-serif text-xl md:text-2xl text-slate-900 font-bold leading-relaxed mt-6">
    {question.statement}
  </h2>
  {/* Options */}
</div>
```

### Success Message

```tsx
<div className="bg-emerald-50 border border-emerald-200 text-emerald-700 px-4 py-3 rounded-lg">
  <CheckCircle className="w-5 h-5 inline mr-2" />
  ¡Prueba aprobada! Excelente nivel.
</div>
```

---

## Recursos

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/icons/)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
