# INSTRUCCIONES PARA TRADUCIR

## TU TAREA

Agregar portugués brasileño (pt) a cada texto que tenga esta estructura:
```
{
  es: "texto español",
  en: "texto inglés"
}
```

Convertirlo a:
```
{
  es: "texto español",
  en: "texto inglés",
  pt: "texto português"
}
```

---

## ARCHIVOS A TRADUCIR (en orden)

### PASO 1: Actualizar tipos
Archivo: `src/data/exercises/types.ts`
Línea 8: Cambiar `export type Language = 'es' | 'en';` a `export type Language = 'es' | 'en' | 'pt';`
Línea 13: Agregar `pt: string;` al interface LocalizedContent

### PASO 2: Ejercicios SQL
1. `src/data/exercises/sql/fundamentals.ts`
2. `src/data/exercises/sql/aggregations.ts`
3. `src/data/exercises/sql/joins.ts`
4. `src/data/exercises/sql/windowFunctions.ts`
5. `src/data/exercises/sql/advanced.ts`
6. `src/data/exercises/sql/optimization.ts`
7. `src/data/exercises/sql/interview.ts`
8. `src/data/exercises/sql/dbt.ts`

### PASO 3: Ejercicios Python
1. `src/data/exercises/python/basics.ts`
2. `src/data/exercises/python/pandas.ts`
3. `src/data/exercises/python/etl.ts`
4. `src/data/exercises/python/airflow.ts`
5. `src/data/exercises/python/pyspark.ts`
6. `src/data/exercises/python/interview.ts`

### PASO 4: Roadmap
- `src/data/roadmapData.ts`

### PASO 5: Proyectos
- `src/data/projects/level1Projects.ts`
- `src/data/projects/level2Projects.ts`
- `src/data/projects/level3Projects.ts`

### PASO 6: Otros
- `src/data/datasetsData.ts`
- `src/data/videosData.ts`

---

## REGLAS DE TRADUCCIÓN

1. **Mantener español igual** - No tocar el texto en `es`
2. **Revisar inglés** - Si hay errores en `en`, corregirlos
3. **Portugués brasileño** - Usar PT-BR, no PT-PT
4. **Términos técnicos** - Mantener en inglés: SQL, JOIN, DataFrame, SELECT, etc.
5. **Formato** - Mantener markdown (**, \`\`\`, etc.)
6. **NO traducir código** - Los campos `schema`, `sampleData`, `expectedQuery`, `solution`, `testCode` son código, no traducir

---

## EJEMPLO COMPLETO

### ANTES:
```typescript
{
  id: 'sql-f1',
  title: {
    es: 'SELECT Básico',
    en: 'Basic SELECT'
  },
  description: {
    es: 'Seleccioná todas las columnas de la tabla products.',
    en: 'Select all columns from the products table.'
  },
  theory: {
    es: `**SELECT** es el comando más básico de SQL.`,
    en: `**SELECT** is the most basic SQL command.`
  },
  hint: {
    es: 'Usá SELECT * FROM tabla',
    en: 'Use SELECT * FROM table'
  },
  // NO TRADUCIR ESTOS:
  schema: `CREATE TABLE products...`,
  expectedQuery: 'SELECT * FROM products'
}
```

### DESPUÉS:
```typescript
{
  id: 'sql-f1',
  title: {
    es: 'SELECT Básico',
    en: 'Basic SELECT',
    pt: 'SELECT Básico'
  },
  description: {
    es: 'Seleccioná todas las columnas de la tabla products.',
    en: 'Select all columns from the products table.',
    pt: 'Selecione todas as colunas da tabela products.'
  },
  theory: {
    es: `**SELECT** es el comando más básico de SQL.`,
    en: `**SELECT** is the most basic SQL command.`,
    pt: `**SELECT** é o comando mais básico de SQL.`
  },
  hint: {
    es: 'Usá SELECT * FROM tabla',
    en: 'Use SELECT * FROM table',
    pt: 'Use SELECT * FROM tabela'
  },
  // NO TRADUCIR ESTOS (quedan igual):
  schema: `CREATE TABLE products...`,
  expectedQuery: 'SELECT * FROM products'
}
```

---

## PROMPT PARA COPIAR Y PEGAR

```
Eres un traductor técnico de Data Engineering.

TAREA: Agregar portugués brasileño (pt) a cada objeto que tenga {es, en}.

REGLAS:
- Mantener `es` exactamente igual
- Corregir `en` si tiene errores
- Agregar `pt` con portugués brasileño
- Términos técnicos quedan en inglés (SQL, JOIN, DataFrame, etc.)
- NO traducir código (schema, sampleData, expectedQuery, solution, testCode)
- Mantener formato markdown

Traduce este archivo:

[PEGAR CONTENIDO DEL ARCHIVO AQUÍ]
```

---

## VERIFICACIÓN

Después de cada archivo, correr:
```bash
npx tsc --noEmit
```

Si no hay errores, el archivo está bien.

