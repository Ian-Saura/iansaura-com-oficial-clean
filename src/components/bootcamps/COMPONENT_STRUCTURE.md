# 🏗️ Estructura del Componente Testimonials

## Jerarquía Visual

```
<Testimonials>
  │
  ├── Background decorations (blobs animados)
  │
  ├── Section Header
  │   ├── Título principal
  │   └── Descripción
  │
  ├── Stats Cards (Grid 3 columnas)
  │   ├── Card 1: 10/10 (Calificación)
  │   ├── Card 2: Pipeline desde 0
  │   └── Card 3: 100% recomendado
  │
  ├── Featured Testimonial (Victor Serey)
  │   ├── Quote icon
  │   ├── Texto del testimonio
  │   ├── Info del alumno
  │   │   ├── Avatar placeholder
  │   │   ├── Nombre
  │   │   └── Cohorte
  │   ├── Rating (10/10 con estrellas)
  │   └── Logro destacado (card separada)
  │
  ├── Additional Testimonials Grid (3 columnas)
  │   ├── Testimonial Card 1 (María)
  │   │   ├── Avatar + Nombre + Rol
  │   │   ├── Rating con estrellas
  │   │   ├── Texto del testimonio
  │   │   ├── Logro destacado
  │   │   └── Cohorte
  │   ├── Testimonial Card 2 (Carlos)
  │   └── Testimonial Card 3 (Ana)
  │
  └── CTA Section
      ├── Título motivacional
      ├── Descripción
      ├── Botones de acción
      │   ├── Botón primario (Unirme)
      │   └── Botón secundario (Conocer más)
      └── Texto de cupos limitados
```

## Colores y Gradientes

### Background Principal:
```css
bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50
```

### Featured Testimonial:
```css
bg-gradient-to-br from-purple-600 to-blue-600
```

### Stats Cards Gradients:
- Card 1: `from-purple-500 to-pink-500`
- Card 2: `from-blue-500 to-cyan-500`
- Card 3: `from-indigo-500 to-purple-500`

### Botones:
- Primario: `from-purple-600 to-blue-600`
- Secundario: `border-gray-300` con hover `border-purple-600`

## Animaciones

### Framer Motion:
- **Fade in**: Todos los elementos principales
- **Slide up**: Elementos al entrar en viewport
- **Stagger**: Delay progresivo entre elementos del grid

### CSS Animations:
- **Blob animation**: Efectos de fondo animados
- **Hover effects**: Transform scale y shadow en cards

## Responsive Breakpoints

### Mobile (< 768px):
- Stack vertical
- Cards en columna única
- Padding reducido
- Texto más pequeño

### Tablet (768px - 1024px):
- Grid de 2 columnas para testimonials
- Stats cards mantienen 3 columnas
- Featured testimonial stack vertical

### Desktop (> 1024px):
- Grid completo de 3 columnas
- Featured testimonial horizontal (2 columnas)
- Máximo ancho del contenedor

## Iconos Utilizados

- `Star`: Rating y calificaciones
- `Quote`: Comillas en featured testimonial
- `TrendingUp`: Estadísticas y logros
- `Award`: Logros destacados
- `Users`: Avatar placeholder

## Interactividad

### Hover States:
- Cards: `hover:shadow-xl hover:-translate-y-1`
- Botones: `hover:scale-105`
- Links: Color transition

### Click Events:
- Botón "Unirme": `onOpenWaitlist(bootcampTitle)`
- Botón "Conocer más": Navegación a `/mentorias`

## Accesibilidad

- Semantic HTML
- Alt texts para imágenes (cuando se agreguen)
- Contraste de colores WCAG AAA
- Animaciones respetan `prefers-reduced-motion`
- Keyboard navigation friendly

## Performance

- Lazy loading con `whileInView` (Framer Motion)
- Animaciones con `viewport={{ once: true }}`
- CSS-in-JS optimizado con Tailwind
- Componente memoizable si es necesario

## Customización Rápida

### Cambiar el testimonio destacado:
```typescript
const featuredTestimonial = {
  name: "Tu Alumno",
  cohort: "Cohorte",
  rating: 10,
  text: "Testimonio...",
  achievement: "Logro..."
};
```

### Agregar testimonios:
```typescript
const additionalTestimonials = [
  // Agrega objetos con la misma estructura
];
```

### Modificar stats:
```typescript
const stats = [
  {
    icon: <IconComponent />,
    value: "Valor",
    label: "Descripción",
    gradient: "from-color to-color"
  }
];
```

## Integración

El componente se importa en `BootcampDetail.tsx`:

```tsx
import Testimonials from './Testimonials';

// Dentro del render:
<Testimonials 
  onOpenWaitlist={onOpenWaitlist}
  bootcampTitle={bootcamp.title}
/>
```

## Props Interface

```typescript
interface TestimonialsProps {
  onOpenWaitlist?: (plan: string) => void;
  bootcampTitle?: string;
}
```

Ambas props son opcionales, el componente funciona sin ellas.

## Tamaño del Componente

- **Líneas de código**: ~350
- **Componentes internos**: 5 secciones principales
- **Estado**: Ninguno (stateless component)
- **Dependencias**: framer-motion, lucide-react







