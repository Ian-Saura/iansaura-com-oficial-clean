# Guía de Traducción - Ian Saura Academy

## Resumen
Esta guía explica cómo traducir todo el contenido de la plataforma a **Inglés (en)** y **Portugués (pt)**.

---

## ESTRUCTURA ACTUAL

Los textos ya usan un formato de localización:
```typescript
{
  es: "Texto en español",
  en: "Text in English"
}
```

Hay que agregar `pt` a cada uno:
```typescript
{
  es: "Texto en español",
  en: "Text in English",
  pt: "Texto em português"
}
```

---

## ARCHIVOS A TRADUCIR

### 1. UI General (YA HECHO en `src/i18n/index.ts`)
- Navegación, botones, mensajes de error, etc.
- ~200 textos cortos
- ✅ Ya tiene ES, EN, PT

### 2. Ejercicios SQL (~150 ejercicios)
Ubicación: `src/data/exercises/sql/`

Archivos:
- `fundamentals.ts` - Ejercicios básicos
- `aggregations.ts` - COUNT, SUM, GROUP BY
- `joins.ts` - INNER, LEFT, RIGHT JOIN
- `windowFunctions.ts` - ROW_NUMBER, RANK, LAG
- `advanced.ts` - CTEs, subconsultas
- `optimization.ts` - Performance
- `interview.ts` - Preguntas de entrevistas
- `dbt.ts` - Ejercicios de dbt

Campos a traducir por ejercicio:
- `title`: { es, en, pt }
- `description`: { es, en, pt }
- `theory`: { es, en, pt }
- `realWorldExample`: { es, en, pt }
- `hint`: { es, en, pt } (opcional)

**NO traducir**: schema, sampleData, expectedQuery (es código SQL)

### 3. Ejercicios Python (~100 ejercicios)
Ubicación: `src/data/exercises/python/`

Archivos:
- `basics.ts` - Python básico
- `pandas.ts` - DataFrames
- `etl.ts` - ETL pipelines
- `airflow.ts` - Apache Airflow
- `pyspark.ts` - PySpark
- `interview.ts` - Entrevistas

Campos a traducir:
- `title`: { es, en, pt }
- `description`: { es, en, pt }
- `theory`: { es, en, pt }
- `realWorldExample`: { es, en, pt }
- `hint`: { es, en, pt }
- `starterCode`: { es, en, pt } (los comentarios del código)

**NO traducir**: solution, testCode (es código Python)

### 4. Roadmap
Ubicación: `src/data/roadmapData.ts`

Estructura compleja con niveles, pasos, recursos.
~500 textos

### 5. Proyectos
Ubicación: `src/data/projects/`

Archivos:
- `level1Projects.ts`
- `level2Projects.ts`
- `level3Projects.ts`
- `databricksProject.ts`
- `snowflakeProject.ts`

### 6. Datasets
Ubicación: `src/data/datasetsData.ts`

### 7. Videos
Ubicación: `src/data/videosData.ts`

---

## PROCESO DE TRADUCCIÓN

### Paso 1: Actualizar el tipo LocalizedContent

En `src/data/exercises/types.ts`, cambiar:
```typescript
export interface LocalizedContent {
  es: string;
  en: string;
  pt: string;  // AGREGAR
}
```

Y actualizar la función `t()`:
```typescript
export type Language = 'es' | 'en' | 'pt';  // Agregar pt

export function t(content: LocalizedContent, lang: Language = 'es'): string {
  return content[lang] || content.es;  // Fallback a español
}
```

### Paso 2: Traducir archivo por archivo

Para cada archivo, el modelo debe:

1. Leer el archivo completo
2. Para cada campo que sea `{ es: "...", en: "..." }`:
   - Mantener `es` igual
   - Verificar/corregir `en` si es necesario
   - Agregar `pt` con la traducción al portugués brasileño
3. Guardar el archivo

### Paso 3: Ejemplo de traducción

**ANTES:**
```typescript
{
  id: 'sql-fund-1',
  title: {
    es: 'Seleccionar todas las columnas',
    en: 'Select all columns'
  },
  description: {
    es: 'Escribe una consulta que muestre todos los empleados',
    en: 'Write a query that shows all employees'
  },
  theory: {
    es: 'La sentencia SELECT es fundamental en SQL...',
    en: 'The SELECT statement is fundamental in SQL...'
  }
}
```

**DESPUÉS:**
```typescript
{
  id: 'sql-fund-1',
  title: {
    es: 'Seleccionar todas las columnas',
    en: 'Select all columns',
    pt: 'Selecionar todas as colunas'
  },
  description: {
    es: 'Escribe una consulta que muestre todos los empleados',
    en: 'Write a query that shows all employees',
    pt: 'Escreva uma consulta que mostre todos os funcionários'
  },
  theory: {
    es: 'La sentencia SELECT es fundamental en SQL...',
    en: 'The SELECT statement is fundamental in SQL...',
    pt: 'A instrução SELECT é fundamental em SQL...'
  }
}
```

---

## ORDEN RECOMENDADO DE TRADUCCIÓN

1. ✅ `src/i18n/index.ts` - UI (YA HECHO)
2. `src/data/exercises/types.ts` - Actualizar tipos
3. `src/data/exercises/sql/fundamentals.ts` - Empezar con SQL básico
4. Continuar con el resto de SQL
5. Ejercicios Python
6. Roadmap
7. Proyectos
8. Datasets y Videos

---

## PROMPT PARA EL MODELO TRADUCTOR

```
Eres un traductor técnico especializado en Data Engineering.

Tu tarea es agregar traducciones en portugués brasileño (pt) a un archivo TypeScript.

Reglas:
1. Mantén el texto en español (es) exactamente igual
2. Verifica que el inglés (en) sea correcto, corrige si es necesario
3. Agrega la traducción al portugués brasileño (pt)
4. Usa português brasileiro (no português de Portugal)
5. Mantén la terminología técnica en inglés cuando sea estándar (SQL, DataFrame, JOIN, etc.)
6. NO traduzcas código, solo textos descriptivos
7. Mantén el formato TypeScript válido

Ejemplo de entrada:
title: {
  es: 'Fundamentos de SQL',
  en: 'SQL Fundamentals'
},

Ejemplo de salida:
title: {
  es: 'Fundamentos de SQL',
  en: 'SQL Fundamentals',
  pt: 'Fundamentos de SQL'
},

Ahora traduce el siguiente archivo:
[PEGAR CONTENIDO DEL ARCHIVO]
```

---

## ESTIMACIÓN DE TRABAJO

| Archivo | Textos aprox. | Tiempo estimado |
|---------|---------------|-----------------|
| UI (i18n) | 200 | ✅ Hecho |
| SQL exercises | 750 | 2-3 horas |
| Python exercises | 500 | 1-2 horas |
| Roadmap | 500 | 2 horas |
| Projects | 300 | 1 hora |
| Datasets/Videos | 100 | 30 min |
| **TOTAL** | ~2350 | ~8-10 horas |

---

## VALIDACIÓN

Después de traducir, ejecutar:
```bash
npm run build
```

Si hay errores de TypeScript, significa que falta algún campo `pt` o hay un error de sintaxis.

