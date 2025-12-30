# 🗺️ ROADMAP DE DATA ENGINEERING

## Nivel 1: Conseguir tu Primer Trabajo

*Bienvenido al juego. Vamos paso a paso, sin apuros pero sin dormirnos.*

---

## 🎯 ANTES DE ARRANCAR

Agarrá papel y lapicera (o Notion, lo que uses) y respondé esto:

```
📝 MI SITUACIÓN ACTUAL:

1. ¿Cuánto sé de Python? (1-10): ___
2. ¿Cuánto sé de SQL? (1-10): ___
3. ¿Tengo experiencia laboral en datos? (sí/no): ___
4. ¿En cuánto tiempo quiero conseguir laburo? ___
5. ¿Cuántas horas por semana puedo meterle? ___
```

Guardá esto. Lo vas a comparar en 3 meses y te vas a sorprender.

---

## 📚 FASE 1: Las Bases (No te saltees esto, posta)

Antes de tocar AWS, Snowflake o cualquier herramienta "fancy", necesitás dominar 3 cosas. Sin esto, todo lo demás es construir sobre arena.

### 1️⃣ Python

No necesitás ser un crack. Necesitás poder:
- Leer un CSV y manipularlo con Pandas
- Escribir funciones y loops sin googlear cada línea
- Entender qué hace un script cuando lo leés

---

### 🛑 STOP #1 - Práctica de Python

**Opción A - Si nunca programaste:**
Hacé el curso "Python Crash Course" o cualquier curso básico. Metele 2 semanas.

**Opción B - Si ya sabés algo:**
Andá a LeetCode → https://leetcode.com/
Filtrá por "Easy" y "Arrays/Strings"
**Hacé 20 ejercicios.** No sigas hasta completarlos. Posta.

```
✅ Completé 20 ejercicios de LeetCode Easy
Fecha: ___________
```

Ya con esto sos crack en lo básico. Dale, seguí.

---

### 2️⃣ SQL

SQL es el 80% de tu laburo diario como Data Engineer. En serio, no exagero. Si hay algo que tenés que dominar, es esto.

Necesitás poder:
- JOINs sin pensar (INNER, LEFT, RIGHT)
- GROUP BY + agregaciones
- Window Functions (ROW_NUMBER, RANK, LAG, LEAD)
- CTEs (WITH queries)

---

### 🛑 STOP #2 - Práctica de SQL (El más importante de todos)

Andá a **DataLemur** → https://datalemur.com/

Esto es oro puro. Son preguntas reales de entrevistas de Facebook, Amazon, Google, etc.

**Tu misión:**
1. Completá TODOS los ejercicios "Easy" (son ~20)
2. Completá al menos 10 ejercicios "Medium"

No sigas el roadmap hasta hacer esto. Te lo digo en serio. Esto es lo que te va a conseguir laburo.

```
✅ Completé todos los Easy de DataLemur
Fecha: ___________

✅ Completé 10 Medium de DataLemur
Fecha: ___________
```

Listo, ya sos un crack en SQL. El 90% de los que aplican a laburos no hicieron esto. Vos sí.

---

### 3️⃣ Conceptos de Datos

Necesitás entender de qué hablamos cuando hablamos. No podés ir a una entrevista sin saber qué es un Data Warehouse.

**Conceptos clave:**
- Data Warehouse vs Data Lake (¿cuál es cuál?)
- ETL vs ELT (¿cuándo usar cada uno?)
- Batch vs Streaming (¿diferencia?)
- Modelado dimensional (Star Schema, hechos, dimensiones)

---

### 🛑 STOP #3 - Fundamentos teóricos

**Mirá las grabaciones del Bootcamp de Fundamentos** en #grabaciones-bootcamps

Ahí está todo explicado como corresponde. Dale, andá y miralo. Después volvé.

O si querés ir más profundo:

📖 Leé los capítulos 1-3 de **"Fundamentals of Data Engineering"** de Joe Reis.

Es EL libro para entender el panorama completo.

```
✅ Vi las grabaciones del bootcamp O leí caps 1-3 del libro
Fecha: ___________
Concepto que más me costó entender: ___________
```

Bien ahí. Ya tenés las bases. Ahora sí viene lo divertido.

---

## 🛠️ FASE 2: Tecnologías del Mercado Actual

Ok, ya tenés las bases. Ahora sí, vamos a las herramientas que te van a abrir puertas.

El mercado actual pide: **AWS, Snowflake, dbt, y algo de orquestación (Airflow).**

### ☁️ AWS (Amazon Web Services)

AWS es el cloud más usado. Necesitás familiarizarte con:
- **S3** → donde guardás los datos (tu Data Lake)
- **Glue** → ETL serverless
- **Athena** → queries sobre S3
- **Lambda** → funciones serverless
- **Step Functions** → orquestación

---

### 🛑 STOP #4 - Hands-on con AWS

1. Creá una cuenta de AWS (tiene free tier, no te cobran nada)
2. Seguí este proyecto:

**Proyecto: Pipeline End-to-End en AWS**
*(Próximamente voy a subir una guía paso a paso)*

Por ahora, tu misión:
- Subí un CSV a S3
- Creá una tabla en Athena que lea ese CSV
- Hacé una query

Suena simple pero es el 101 de AWS. Si hacés esto, ya estás adelante del 70% de los que aplican.

```
✅ Tengo cuenta de AWS creada
✅ Subí mi primer archivo a S3
✅ Hice mi primera query en Athena
Fecha: ___________
```

Sos un crack. Seguí.

---

### ❄️ Snowflake

Snowflake es el Data Warehouse moderno más demandado. Muchas empresas están migrando a Snowflake.

📖 **Recurso:** https://docs.snowflake.com/en/user-guide-getting-started

---

### 🛑 STOP #5 - Snowflake basics

1. Creá una cuenta trial de Snowflake (30 días gratis)
2. Cargá un dataset
3. Hacé queries básicas
4. Entendé el concepto de Warehouse, Database, Schema

```
✅ Tengo cuenta de Snowflake
✅ Cargué mi primer dataset
✅ Entiendo la jerarquía Warehouse > Database > Schema
Fecha: ___________
```

Dale, ya tenés Snowflake. Vamos por dbt.

---

### 🔧 dbt (data build tool)

dbt es LA herramienta para transformaciones. Código versionado, testing automático, documentación. Es hermoso, en serio.

📖 **Recurso:** https://courses.getdbt.com/ (es gratis)

---

### 🛑 STOP #6 - dbt Fundamentals

Hacé el curso **"dbt Fundamentals"** en dbt Learn. Es gratis y toma ~4 horas.

No sigas hasta completarlo. Te lo pido por favor.

```
✅ Completé dbt Fundamentals
Fecha: ___________
Certificado/captura: [guardalo, queda lindo en LinkedIn]
```

Bien ahí. Ya sabés las herramientas principales. Sos un crack.

---

## 🎯 FASE 3: Búsqueda de Trabajo

Ya tenés las bases y conocés las herramientas. Ahora a buscar laburo.

### Mi estrategia (funciona, la usé yo)

1. Abrí Google
2. Buscá: `"Data Engineer" "Junior" LATAM` (o tu región)
3. **Filtrá por últimas 24 horas**
4. Postulate a TODO lo que encaje mínimamente
5. Repetí todos los días

¿Por qué últimas 24 horas? Porque las ofertas viejas ya tienen 500 postulantes. Las nuevas tienen 20. Matemática simple.

---

### 🛑 STOP #7 - Empezá a postular HOY

No esperes a "estar listo". Nunca vas a estar 100% listo. Nadie lo está.

**Tu misión esta semana:**
- Postulate a 10 posiciones
- Anotá a cuáles te postulaste
- Anotá qué tecnologías pedían que no sabías

```
📋 MIS POSTULACIONES SEMANA 1:

1. Empresa: ___ | Tecnologías que me faltaban: ___
2. Empresa: ___ | Tecnologías que me faltaban: ___
3. ...
```

Las tecnologías que te faltan = tu lista de estudio para la próxima semana. Así de simple.

---

## 🎤 FASE 4: Entrevistas

### Etapa 1: RRHH

**Antes de la call:**
- Leé el mail de invitación completo
- Investigá qué hace la empresa (2 minutos en su web)
- Tené claras las tecnologías que piden

**En la call:**
Te van a preguntar años de experiencia y qué hiciste con cada tecnología. Nada técnico profundo. Solo soná seguro y que sepas de qué hablás.

---

### Etapa 2: Técnica

Puede ser:

**A) Challenge en casa**
Te dan un problema, tenés X días. Luego lo revisás con ellos.
→ Tomátelo en serio. Documentá tu código. Hacé tests. Lucite.

**B) Live coding**
SQL o Python en vivo. 
→ Si fallás acá, volvé a DataLemur. Sin excusas. Ya sabés qué hacer.

**C) Charla técnica**
Discusión de arquitecturas y decisiones.
→ Si viste el bootcamp, esto te sale natural. Confiá.

---

### 🛑 STOP #8 - Después de cada entrevista

Anotá inmediatamente:

```
📋 POST-ENTREVISTA:

Empresa: ___________
Fecha: ___________

¿En qué fallé? ___________
¿Qué pregunta no supe responder? ___________
¿Qué tengo que estudiar? ___________
```

**Este feedback es ORO.** Es exactamente lo que tenés que estudiar. No lo desperdicies.

---

### Etapa 3: Fit Cultural

Básicamente: ¿sos buena onda? ¿te vas a llevar bien con el equipo?

Sé vos mismo. Si no encajás con la cultura, mejor enterarte ahora y no después.

---

## 🔄 EL LOOP

```
Ver Job Descriptions → Identificar qué te falta → 
Estudiar eso → Aplicar → Entrevistar → 
Anotar feedback → Estudiar lo que fallaste → Repetir
```

Hasta que entres. Y vas a entrar. Es cuestión de tiempo y consistencia.

---

## 📚 Recursos Nivel 1

**Libros:**
- "Fundamentals of Data Engineering" - Joe Reis ⭐ (el más importante)
- "Learning SQL" - Alan Beaulieu (si necesitás reforzar SQL)
- "Python Crash Course" - Eric Matthes (si sos nuevo en Python)

**Práctica:**
- DataLemur (SQL) - https://datalemur.com/
- LeetCode (Python) - https://leetcode.com/
- StrataScratch (más SQL) - https://stratascratch.com/

**Cursos:**
- Bootcamp de Fundamentos (grabaciones en #grabaciones-bootcamps)
- dbt Learn (gratis) - https://courses.getdbt.com/

---

## ✅ CHECKLIST NIVEL 1

Antes de pasar al Nivel 2, asegurate de haber completado:

```
[ ] 20 ejercicios Easy en LeetCode (Python)
[ ] TODOS los Easy de DataLemur (SQL)
[ ] 10 Medium de DataLemur (SQL)
[ ] Vi el bootcamp O leí Fundamentals of Data Engineering
[ ] Tengo cuenta de AWS y subí algo a S3
[ ] Tengo cuenta de Snowflake y cargué un dataset
[ ] Completé dbt Fundamentals
[ ] Me postulé a al menos 20 posiciones
[ ] Tuve al menos 3 entrevistas
[ ] CONSEGUÍ MI PRIMER LABURO 🎉
```

---

**¿Conseguiste laburo?**

Felicitaciones crack. Ahora empieza lo bueno.

→ **Pasá al Nivel 2: De Entry a Jr/SSR** 🚀

Y acordate: cualquier duda, estoy en #dudas-premium o en el Q&A mensual.

— Ian