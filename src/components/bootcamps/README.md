# Bootcamp Components

Este directorio contiene los componentes relacionados con la visualización y gestión de bootcamps.

## Componentes

### `Testimonials.tsx`

Sección de testimonios moderna y responsive para mostrar la experiencia de alumnos del bootcamp.

#### Características:

- **Testimonio destacado**: Victor Serey (Calificación 10/10, Cohorte Sep 2025)
  - Texto completo de su experiencia
  - Logro destacado: "Diseñó un Pipeline desde 0 en 3 semanas"
  - Diseño con gradiente púrpura/azul

- **3 Stats Cards**:
  - 10/10 - Calificación promedio
  - Pipeline desde 0 - Proyecto real en 3 semanas
  - 100% recomendado por alumnos

- **Grid de testimonios adicionales**: 3 testimonios más en formato responsive
  - María González (Data Analyst → Data Engineer)
  - Carlos Rodríguez (Desarrollador Backend)
  - Ana Martínez (Ingeniera de Software)

- **CTA final**: Call-to-action para inscripción al bootcamp
  - Botón principal: Unirse al bootcamp
  - Botón secundario: Conocer más

#### Estilo y Diseño:

- Gradiente púrpura/azul en el background
- Cards con sombras y efecto hover
- Animaciones con Framer Motion
- Completamente responsive (mobile, tablet, desktop)
- Efectos de blob animados en el fondo
- Iconos de Lucide React

#### Props:

```typescript
interface TestimonialsProps {
  onOpenWaitlist?: (plan: string) => void;  // Función para abrir modal de lista de espera
  bootcampTitle?: string;                    // Título del bootcamp actual
}
```

#### Uso:

```tsx
import Testimonials from './Testimonials';

<Testimonials 
  onOpenWaitlist={handleOpenWaitlist}
  bootcampTitle="Bootcamp de Data Engineering"
/>
```

### `BootcampDetail.tsx`

Componente principal que muestra todos los detalles de un bootcamp, incluyendo:
- Información general (duración, cupos, cohorte)
- Objetivos de aprendizaje
- Proyecto final
- Syllabus semana por semana
- **Sección de testimonios**
- Preguntas frecuentes

### `WeekCard.tsx`

Componente expandible para mostrar el contenido de cada semana del bootcamp.

### `BootcampTabs.tsx`

Componente de tabs para navegar entre diferentes bootcamps disponibles.

## Personalización

### Agregar más testimonios:

Edita el array `additionalTestimonials` en `Testimonials.tsx`:

```typescript
const additionalTestimonials: TestimonialData[] = [
  {
    name: "Nombre del Alumno",
    role: "Rol anterior → Rol actual",
    cohort: "Cohorte Mes Año",
    rating: 10,
    text: "Testimonio completo del alumno...",
    achievement: "Logro destacado"
  },
  // ... más testimonios
];
```

### Modificar estadísticas:

Edita el array `stats` en `Testimonials.tsx`:

```typescript
const stats = [
  {
    icon: <Star className="w-8 h-8 text-purple-600" />,
    value: "10/10",
    label: "Calificación promedio",
    gradient: "from-purple-500 to-pink-500"
  },
  // ... más stats
];
```

### Cambiar colores del gradiente:

El componente usa las siguientes clases de Tailwind:
- `from-purple-600 to-blue-600` - Gradiente principal
- `from-purple-50 via-blue-50 to-indigo-50` - Background suave
- Puedes modificarlas para usar otros colores del tema

## Dependencias

- `framer-motion`: Animaciones
- `lucide-react`: Iconos
- `tailwindcss`: Estilos

## Stack Tecnológico

- **React 18** con TypeScript
- **Tailwind CSS** para estilos
- **Framer Motion** para animaciones
- **Lucide React** para iconos
- Diseño responsive con mobile-first approach


