# 🧹 Plan de Limpieza de Warnings - ESLint/TypeScript

## 📊 Resumen
- **Total warnings:** 286
- **Tipos:**
  - `@typescript-eslint/no-unused-vars`: 244 (85%)
  - `react-hooks/exhaustive-deps`: 24 (8%)
  - Otros: 18 (7%)

---

## ⚠️ REGLAS CRÍTICAS (NO ROMPER NADA)

1. **SIEMPRE** ejecutar `npm run build` después de cada archivo modificado
2. **NUNCA** eliminar código que NO sea un import o variable no usada
3. **NUNCA** agregar dependencias a hooks sin verificar que no cause loops infinitos
4. Para hooks con dependencias faltantes, **PREFERIR** agregar `// eslint-disable-next-line react-hooks/exhaustive-deps` en lugar de agregar la dependencia
5. **COMMIT** después de cada grupo de archivos (máximo 5 archivos por commit)

---

## 🔧 TIPO 1: Imports No Usados (244 casos)

### Patrón a buscar:
```
'NombreVariable' is defined but never used
```

### Cómo arreglar:
1. Abrir el archivo indicado
2. Ir a la línea del import (usualmente líneas 1-10)
3. Eliminar SOLO el nombre no usado del import
4. **NO** eliminar el import completo si tiene otros elementos usados

### Ejemplo:
```typescript
// ANTES (warning: 'X' is defined but never used)
import { X, Check, Star } from 'lucide-react';

// DESPUÉS (si X no se usa, pero Check y Star sí)
import { Check, Star } from 'lucide-react';
```

### Archivos a limpiar (por prioridad):

#### ALTA PRIORIDAD (componentes principales):
| Archivo | Línea | Variable No Usada |
|---------|-------|-------------------|
| `src/pages/Admin.tsx` | 2 | `Navigate` |
| `src/pages/Members.tsx` | varios | Ver build output |
| `src/pages/BootcampPlatform.tsx` | varios | Ver build output |
| `src/pages/Home.tsx` | varios | Ver build output |

#### MEDIA PRIORIDAD (componentes extraídos):
| Archivo | Línea | Variable No Usada |
|---------|-------|-------------------|
| `src/components/members/BadgeModal.tsx` | 2 | `Award`, `Trophy` |
| `src/components/members/MembersUtils.tsx` | 4 | `Video` |
| `src/components/members/tabs/RoadmapTab.tsx` | 2 | `Link` |
| `src/components/members/tabs/DatasetsTab.tsx` | 3 | `ExternalLink` |
| `src/components/members/tabs/ProyectosTab.tsx` | 3 | `CheckCircle` |
| `src/components/members/tabs/PracticaTab.tsx` | 10 | `tLocalized` |
| `src/components/members/tabs/VideosTab.tsx` | 6 | `tLocalized` |
| `src/components/admin/tabs/MetricsTab.tsx` | varios | Ver build output |
| `src/components/admin/tabs/SubscribersTab.tsx` | 4 | `DollarSign`, `Users`, `Calendar` |

#### BAJA PRIORIDAD (data files):
| Archivo | Descripción |
|---------|-------------|
| `src/data/projects/level3/*.ts` | Variables de proyectos |
| `src/data/exercises/*.ts` | Variables de ejercicios |
| `src/data/roadmap/*.ts` | Variables de roadmap |

---

## 🔧 TIPO 2: Variables Asignadas Pero No Usadas (parte de los 244)

### Patrón a buscar:
```
'variableName' is assigned a value but never used
```

### Cómo arreglar:

#### Opción A - Si es destructuring de useState:
```typescript
// ANTES (warning: 'setX' is assigned but never used)
const [value, setValue] = useState(0);

// DESPUÉS (si setValue nunca se usa)
const [value] = useState(0);
```

#### Opción B - Si es destructuring de objeto:
```typescript
// ANTES (warning: 'description' is assigned but never used)
const { title, description, id } = data;

// DESPUÉS (si description no se usa)
const { title, id } = data;
```

#### Opción C - Si la variable se necesita para el futuro (PREFERIR):
```typescript
// Agregar underscore para indicar que es intencional
const [_value, setValue] = useState(0);
// O usar eslint-disable
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const [value, setValue] = useState(0);
```

### Archivos con este problema:
| Archivo | Línea | Variable |
|---------|-------|----------|
| `src/components/CertificateGenerator.tsx` | 111 | `description` |
| `src/components/OnboardingTutorial.tsx` | 221 | `steps` |
| `src/components/PythonPlayground.tsx` | 59 | `setSelectedDifficulty` |
| `src/components/PythonPlayground.tsx` | 133 | `progressLoaded` |
| `src/components/SQLPlayground.tsx` | 57 | `setSelectedDifficulty` |
| `src/components/SQLPlayground.tsx` | 98 | `showTheory`, `setShowTheory` |
| `src/components/members/tabs/ApiTokenSection.tsx` | 65 | `copied`, `setCopied` |
| `src/components/members/tabs/DashboardTab.tsx` | 63-87 | varios |
| `src/pages/Admin.tsx` | 542 | `conversionRate` |

---

## 🔧 TIPO 3: Dependencias de Hooks Faltantes (24 casos)

### ⚠️ PRECAUCIÓN: Estos son los más peligrosos de arreglar

### Patrón a buscar:
```
React Hook useEffect has missing dependencies: 'X'. Either include them or remove the dependency array
```

### Cómo arreglar (PREFERIR OPCIÓN A):

#### Opción A - Deshabilitar ESLint (MÁS SEGURO):
```typescript
// ANTES
useEffect(() => {
  loadData();
}, []);

// DESPUÉS
useEffect(() => {
  loadData();
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

#### Opción B - Agregar dependencia (SOLO si estás seguro que no causa loop):
```typescript
// ANTES
useEffect(() => {
  loadData();
}, []);

// DESPUÉS (VERIFICAR que loadData esté memoizado con useCallback)
useEffect(() => {
  loadData();
}, [loadData]);
```

### Archivos con este problema:
| Archivo | Línea | Dependencia Faltante | Recomendación |
|---------|-------|---------------------|---------------|
| `src/components/AICodeReview.tsx` | 80 | `fetchReview`, `hasFetched` | Deshabilitar |
| `src/components/NotificationCenter.tsx` | 65 | `notifications.length` | Deshabilitar |
| `src/components/PythonPlayground.tsx` | 236, 245, 273, 484 | varios | Deshabilitar |
| `src/components/ReferralProgram.tsx` | 25 | `loadReferralData` | Deshabilitar |
| `src/components/SQLPlayground.tsx` | 270, 279, 323 | varios | Deshabilitar |
| `src/components/members/InterviewMode.tsx` | 113 | `finishInterview` | Deshabilitar |
| `src/hooks/useUserProgress.ts` | 414, 547, 779 | varios | Deshabilitar |
| `src/i18n/LanguageContext.tsx` | 52 | `language` | Deshabilitar |
| `src/pages/Admin.tsx` | 315, 1176, 1185 | varios | Deshabilitar |
| `src/pages/BootcampPlatform.tsx` | 318, 360, 488, 547 | varios | Deshabilitar |
| `src/pages/Settings.tsx` | 56 | `loadPaymentHistory`, `loadSubscriptionInfo` | Deshabilitar |

---

## 📋 ORDEN DE EJECUCIÓN

### Fase 1: Imports no usados en archivos refactorizados
```bash
# Archivos a limpiar primero
src/components/members/BadgeModal.tsx
src/components/members/MembersUtils.tsx
src/components/members/tabs/*.tsx
src/components/admin/tabs/*.tsx
src/pages/Admin.tsx
src/pages/Members.tsx
```

### Fase 2: Imports no usados en otros componentes
```bash
src/components/AICodeReview.tsx
src/components/CertificateGenerator.tsx
src/components/LevelCompletionModal.tsx
# ... etc
```

### Fase 3: Variables no usadas
```bash
# Solo si es seguro eliminarlas
# Preferir _ prefix o eslint-disable
```

### Fase 4: Hooks (CON MUCHO CUIDADO)
```bash
# Agregar eslint-disable-next-line react-hooks/exhaustive-deps
# NO agregar dependencias sin verificar
```

### Fase 5: Data files (opcional, baja prioridad)
```bash
src/data/**/*.ts
```

---

## ✅ VERIFICACIÓN DESPUÉS DE CADA CAMBIO

```bash
# Después de modificar cada archivo:
npm run build

# Si compila sin errores, continuar
# Si hay errores de compilación, REVERTIR el cambio
```

---

## 📝 TEMPLATE DE COMMITS

```bash
# Después de limpiar un grupo de archivos
git add -A
git commit -m "chore: clean unused imports in [nombre_carpeta]"

# Ejemplo:
git commit -m "chore: clean unused imports in members/tabs"
git commit -m "chore: clean unused imports in admin/tabs"
git commit -m "chore: add eslint-disable for hook dependencies"
```

---

## 🎯 OBJETIVO FINAL

- Reducir warnings de 286 a < 50
- NO introducir bugs ni errores de compilación
- Mantener el código funcionando exactamente igual

