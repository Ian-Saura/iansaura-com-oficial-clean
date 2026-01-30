---
id: "l1-python-fundamentals"
version: "1.0.0"
lastUpdated: "2026-01-05"

title:
  es: "Python Fundamentals para Data Engineering"
  en: "Python Fundamentals for Data Engineering"
  pt: "Fundamentos de Python para Data Engineering"

subtitle:
  es: "El lenguaje que domina el ecosistema de datos"
  en: "The language that dominates the data ecosystem"
  pt: "A linguagem que domina o ecossistema de dados"

level: 1
phase: "l1-python"
estimatedTime: "15-20 horas"

prerequisites: []

tags:
  - "python"
  - "programming"
  - "data-engineering"
  - "fundamentals"

theoreticalFoundations:
  - "Tipado dinámico vs estático"
  - "Gestión de memoria y garbage collection"
  - "Paradigmas de programación"
  - "Complejidad algorítmica"
---

<!-- 
╔══════════════════════════════════════════════════════════════╗
║  📚 BLOQUE: PYTHON FUNDAMENTALS                              ║
║  Nivel: 1 | Fase: Bases de Programación                      ║
╚══════════════════════════════════════════════════════════════╝
-->

# 🐍 Python Fundamentals para Data Engineering

> **Objetivo**: Dominar Python como herramienta profesional para manipulación de datos, no solo como lenguaje de scripting casual.

---

## 🧠 Mapa Conceptual

```mermaid
mindmap
  root((Python para
    Data Engineering))
    🔬 Fundamentos del Lenguaje
      Tipado Dinámico
        Duck Typing
        Type Hints moderno
      Modelo de Memoria
        Referencias vs Valores
        Mutabilidad
        Garbage Collection
      Estructuras de Datos
        Listas O(1) append
        Diccionarios O(1) lookup
        Sets O(1) membership
    🛠️ Paradigmas
      Funcional
        map/filter/reduce
        List Comprehensions
        Generators
      Orientado a Objetos
        Clases y herencia
        Dunder methods
        Protocolos
    ⚡ Performance
      Vectorización
        NumPy broadcasting
        Evitar loops
      Profiling
        cProfile
        memory_profiler
      Concurrencia
        asyncio
        multiprocessing
    📦 Ecosistema Data
      Pandas
      NumPy
      PySpark
      Polars
```

---

## 🔗 First Principles: De la Teoría a la Práctica

| Concepto CS | Qué significa | Implementación en Python |
|-------------|---------------|-------------------------|
| **Complejidad O(n)** | Tiempo de ejecución proporcional al input | `list.append()` es O(1), `list.insert(0, x)` es O(n). Usar `collections.deque` para inserciones al inicio. |
| **Hash Tables** | Estructuras con lookup O(1) | Los `dict` y `set` de Python usan hash tables. Por eso lookup es instantáneo vs listas que son O(n). |
| **Mutabilidad** | Objetos que pueden cambiar in-place | Listas son mutables (cuidado al pasar a funciones), tuplas y strings son inmutables (más seguras). |
| **Lazy Evaluation** | Computar valores solo cuando se necesitan | Generators (`yield`) procesan items uno a uno, no cargan todo en memoria. Crítico para Big Data. |
| **Duck Typing** | "Si camina como pato..." | Python no chequea tipos en runtime, solo que el objeto tenga los métodos necesarios. |
| **GIL (Global Interpreter Lock)** | Solo un thread ejecuta Python a la vez | Para CPU-bound usar `multiprocessing`, para I/O-bound usar `asyncio` o `threading`. |

> [!IMPORTANT]
> 🧠 **First Principle clave**: Python prioriza **legibilidad y productividad** sobre performance raw. Para Data Engineering, compensamos con **vectorización** (NumPy/Pandas) y **distribución** (Spark/Dask).

---

## 📋 Technical Cheat Sheet

### 🖥️ Comandos CLI Críticos

```bash
# Crear entorno virtual (SIEMPRE usar en proyectos)
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
.venv\Scripts\activate     # Windows

# Instalar dependencias desde requirements
pip install -r requirements.txt

# Generar requirements con versiones exactas
pip freeze > requirements.txt

# Ver dónde está instalado un paquete
pip show pandas

# Ejecutar script con profiling de tiempo
python -m cProfile -s cumtime script.py

# Ejecutar script con profiling de memoria
python -m memory_profiler script.py

# Formatear código (standard en empresas)
black src/
isort src/

# Type checking estático
mypy src/

# Linting
ruff check src/
```

### 📝 Snippets de Alta Densidad

#### Patrón 1: Iteración Eficiente

```python
# 🔥 BEST PRACTICE: Nunca usar índices para iterar
# Cuándo usar: SIEMPRE que iteres sobre colecciones

# ❌ EVITAR - Antipatrón C-style
for i in range(len(lista)):
    print(lista[i])

# ✅ CORRECTO - Pythonic
for item in lista:
    print(item)

# ✅ Si necesitas índice, usar enumerate
for idx, item in enumerate(lista):
    print(f"{idx}: {item}")

# ✅ Iterar múltiples listas en paralelo
for a, b in zip(lista1, lista2):
    print(a, b)

# ✅ Diccionarios - iterar items
for key, value in diccionario.items():
    print(f"{key}: {value}")
```

#### Patrón 2: Comprehensions sobre Loops

```python
# 🔥 BEST PRACTICE: Comprehensions son 30-50% más rápidas
# Cuándo usar: Transformar o filtrar colecciones

# ❌ EVITAR
resultado = []
for x in datos:
    if x > 0:
        resultado.append(x * 2)

# ✅ CORRECTO - List comprehension
resultado = [x * 2 for x in datos if x > 0]

# ✅ Dict comprehension
mapping = {k: v.upper() for k, v in items.items()}

# ✅ Set comprehension (elimina duplicados)
unicos = {x.lower() for x in palabras}

# ✅ Generator expression (para grandes volúmenes)
# No carga todo en memoria, procesa uno a uno
suma = sum(x * 2 for x in datos if x > 0)
```

#### Patrón 3: Context Managers para Recursos

```python
# 🔥 BEST PRACTICE: SIEMPRE usar `with` para archivos/conexiones
# Cuándo usar: Cualquier recurso que necesite cerrarse

# ❌ EVITAR - Puede quedar abierto si hay error
f = open('data.csv')
data = f.read()
f.close()

# ✅ CORRECTO - Se cierra automáticamente incluso con errores
with open('data.csv', 'r', encoding='utf-8') as f:
    data = f.read()

# ✅ Múltiples archivos
with open('input.csv') as fin, open('output.csv', 'w') as fout:
    fout.write(fin.read())

# ✅ Context manager personalizado
from contextlib import contextmanager

@contextmanager
def database_connection(host):
    conn = create_connection(host)
    try:
        yield conn
    finally:
        conn.close()
```

#### Patrón 4: Funciones de Primera Clase

```python
# 🔥 BEST PRACTICE: Funciones como objetos para código flexible
# Cuándo usar: Procesamiento de datos, pipelines

# Funciones son objetos, se pueden pasar como argumentos
def aplicar_transformacion(datos, funcion):
    return [funcion(x) for x in datos]

# Lambda para transformaciones simples
resultado = aplicar_transformacion(numeros, lambda x: x ** 2)

# Funciones parciales para pre-configurar
from functools import partial

def multiplicar(x, factor):
    return x * factor

duplicar = partial(multiplicar, factor=2)
triplicar = partial(multiplicar, factor=3)
```

#### Patrón 5: Manejo de Errores Robusto

```python
# 🔥 BEST PRACTICE: Errores específicos, nunca bare except
# Cuándo usar: Cualquier código que pueda fallar

# ❌ EVITAR - Captura todo, incluso Ctrl+C
try:
    resultado = operacion()
except:
    pass

# ✅ CORRECTO - Específico
try:
    resultado = operacion()
except ValueError as e:
    logger.warning(f"Valor inválido: {e}")
    resultado = valor_default
except ConnectionError as e:
    logger.error(f"Error de conexión: {e}")
    raise  # Re-lanzar para que el caller maneje

# ✅ Para Data Engineering: capturar y continuar
errores = []
for item in datos:
    try:
        procesar(item)
    except Exception as e:
        errores.append({'item': item, 'error': str(e)})
        continue

if errores:
    logger.warning(f"Procesamiento con {len(errores)} errores")
```

### 🏗️ Patrones de Diseño Aplicados

#### 1. Factory Pattern para Data Sources

```
┌─────────────────┐     ┌─────────────────────────┐
│  DataSource     │────▶│  CSVSource              │
│  (Abstract)     │     │  JSONSource             │
│                 │     │  ParquetSource          │
│  + read()       │     │  APISource              │
│  + write()      │     └─────────────────────────┘
└─────────────────┘
```

```python
class DataSourceFactory:
    @staticmethod
    def create(path: str) -> DataSource:
        if path.endswith('.csv'):
            return CSVSource(path)
        elif path.endswith('.parquet'):
            return ParquetSource(path)
        elif path.startswith('http'):
            return APISource(path)
        raise ValueError(f"Formato no soportado: {path}")

# Uso
source = DataSourceFactory.create('datos.parquet')
df = source.read()
```

**Cuándo usar**: Pipelines que deben leer de múltiples formatos/fuentes.

#### 2. Strategy Pattern para Transformaciones

```python
from abc import ABC, abstractmethod
from typing import Protocol

class TransformStrategy(Protocol):
    def transform(self, data: pd.DataFrame) -> pd.DataFrame: ...

class CleanNulls:
    def transform(self, data: pd.DataFrame) -> pd.DataFrame:
        return data.dropna()

class NormalizeColumns:
    def transform(self, data: pd.DataFrame) -> pd.DataFrame:
        data.columns = [c.lower().replace(' ', '_') for c in data.columns]
        return data

class Pipeline:
    def __init__(self, strategies: list[TransformStrategy]):
        self.strategies = strategies
    
    def execute(self, data: pd.DataFrame) -> pd.DataFrame:
        for strategy in self.strategies:
            data = strategy.transform(data)
        return data

# Uso
pipeline = Pipeline([NormalizeColumns(), CleanNulls()])
df_clean = pipeline.execute(df_raw)
```

**Cuándo usar**: Cuando necesitas pipelines de transformación configurables.

#### 3. Singleton Pattern para Configuración

```python
class Config:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance._load_config()
        return cls._instance
    
    def _load_config(self):
        import os
        self.database_url = os.getenv('DATABASE_URL')
        self.debug = os.getenv('DEBUG', 'false').lower() == 'true'

# Siempre retorna la misma instancia
config = Config()
```

**Cuándo usar**: Configuración global, conexiones a base de datos.

### ⚠️ Gotchas de Nivel Senior

> [!WARNING]
> **Gotcha #1: Argumentos por defecto mutables**
> 
> Python evalúa los defaults una sola vez al definir la función, no en cada llamada.
> 
> ```python
> # ❌ BUG SILENCIOSO - La lista se comparte entre llamadas
> def agregar_item(item, lista=[]):
>     lista.append(item)
>     return lista
> 
> agregar_item(1)  # [1]
> agregar_item(2)  # [1, 2] ← ¡Sorpresa!
> 
> # ✅ CORRECTO
> def agregar_item(item, lista=None):
>     if lista is None:
>         lista = []
>     lista.append(item)
>     return lista
> ```

> [!WARNING]
> **Gotcha #2: Shallow Copy vs Deep Copy**
> 
> Copiar una lista no copia los objetos internos.
> 
> ```python
> import copy
> 
> original = [[1, 2], [3, 4]]
> 
> # ❌ Shallow copy - sublistas son referencias
> copia = original.copy()
> copia[0][0] = 999
> print(original)  # [[999, 2], [3, 4]] ← ¡Modificado!
> 
> # ✅ Deep copy - copia todo recursivamente
> copia = copy.deepcopy(original)
> copia[0][0] = 999
> print(original)  # [[1, 2], [3, 4]] ← Intacto
> ```

> [!WARNING]
> **Gotcha #3: Float Precision**
> 
> Los floats tienen errores de precisión inherentes (IEEE 754).
> 
> ```python
> # ❌ Comparación directa de floats
> 0.1 + 0.2 == 0.3  # False!
> 
> # ✅ Usar tolerancia
> import math
> math.isclose(0.1 + 0.2, 0.3)  # True
> 
> # ✅ Para dinero/finanzas usar Decimal
> from decimal import Decimal
> Decimal('0.1') + Decimal('0.2') == Decimal('0.3')  # True
> ```

> [!WARNING]
> **Gotcha #4: String Concatenation en Loops**
> 
> Strings son inmutables, cada `+` crea un nuevo objeto.
> 
> ```python
> # ❌ O(n²) - Crea n objetos string
> resultado = ""
> for s in lista_strings:
>     resultado += s
> 
> # ✅ O(n) - Mucho más eficiente
> resultado = "".join(lista_strings)
> ```

> [!WARNING]
> **Gotcha #5: Import Circular**
> 
> Dos módulos que se importan mutuamente causan errores sutiles.
> 
> ```python
> # module_a.py
> from module_b import func_b  # ← ImportError
> 
> # Solución 1: Import dentro de la función
> def func_a():
>     from module_b import func_b
>     return func_b()
> 
> # Solución 2: Reestructurar en módulo común
> ```

---

## 📊 Métricas y Benchmarks

| Operación | List | Dict | Set | Notas |
|-----------|------|------|-----|-------|
| Lookup | O(n) | O(1) | O(1) | Usar dict/set para búsquedas |
| Insert | O(1) append, O(n) insert | O(1) | O(1) | |
| Delete | O(n) | O(1) | O(1) | |
| Membership (`in`) | O(n) | O(1) | O(1) | **Crítico para filtros** |

| Escenario | Loop explícito | Comprehension | Vectorizado (NumPy) |
|-----------|---------------|---------------|---------------------|
| Sumar 1M números | 120ms | 80ms | 2ms |
| Filtrar 1M items | 150ms | 100ms | 5ms |

---

## 📚 Bibliografía Académica y Profesional

### 📖 Libros Seminales

| Libro | Autor | Capítulos relevantes | Por qué leerlo |
|-------|-------|---------------------|----------------|
| **Fluent Python** (2nd Ed) | Luciano Ramalho | Caps. 1-5, 14-17 | El libro definitivo para Python avanzado. Entiende cómo funciona Python por dentro. |
| **Effective Python** (2nd Ed) | Brett Slatkin | 90 items | Tips prácticos organizados por tema. Perfecto para seniors. |
| **Python Cookbook** (3rd Ed) | Beazley & Jones | Según necesidad | Recetas para problemas específicos. |
| **High Performance Python** (2nd Ed) | Gorelick & Ozsvald | Caps. 1-7 | Optimización, profiling, Cython, multiprocessing. |

### 📄 Papers de Investigación

1. **"Python: A Programming Language for Software Integration and Development"** (1998) - Van Rossum
   - 🔗 [CWI Report](https://www.python.org/doc/essays/cp4e/)
   - 💡 **Insight clave**: La filosofía original de Python y por qué priorizó legibilidad.

2. **"The Global Interpreter Lock"** - Python Wiki
   - 🔗 [GIL Wiki](https://wiki.python.org/moin/GlobalInterpreterLock)
   - 💡 **Insight clave**: Entender por qué multithreading no acelera CPU-bound tasks.

### 📋 Whitepapers y Documentación Técnica

- **Python Language Reference**
  - 🔗 [docs.python.org](https://docs.python.org/3/reference/)
  - Relevancia: Documentación oficial, la fuente de verdad.

- **PEP 8 - Style Guide**
  - 🔗 [PEP 8](https://peps.python.org/pep-0008/)
  - Relevancia: Convenciones de estilo que toda empresa espera.

- **PEP 484 - Type Hints**
  - 🔗 [PEP 484](https://peps.python.org/pep-0484/)
  - Relevancia: Type hints modernos, estándar en proyectos profesionales.

### 🎓 Cursos y Recursos Adicionales

- **"Beyond the Basic Stuff with Python"** - Al Sweigart (libro gratuito)
  - 🔗 [inventwithpython.com](https://inventwithpython.com/beyond/)
  - Ideal para: Transición de básico a intermedio.

- **Real Python**
  - 🔗 [realpython.com](https://realpython.com)
  - Tutoriales de calidad profesional.

---

## 🔄 Conexiones con Otros Bloques

| Bloque relacionado | Tipo de conexión | Descripción |
|-------------------|------------------|-------------|
| **Pandas Data Manipulation** | Continuación directa | Aplica estos fundamentos a manipulación de DataFrames |
| **SQL Fundamentals** | Paralelo | Mismo paradigma de pensamiento (transformar datos) |
| **APIs y JSON** | Usa estos skills | Diccionarios y requests para consumir APIs |
| **PySpark** (Nivel 2) | Evolución | Mismos conceptos pero distribuido |

---

## ✅ Checklist de Dominio

Antes de avanzar, verifica que puedes:

- [ ] Crear y activar entornos virtuales sin pensar
- [ ] Escribir list/dict comprehensions fluidamente
- [ ] Explicar la diferencia entre `is` y `==`
- [ ] Usar context managers (`with`) correctamente
- [ ] Manejar errores con excepciones específicas
- [ ] Entender por qué `append([])` como default es un bug
- [ ] Elegir la estructura de datos correcta (list vs dict vs set)
- [ ] Escribir funciones con type hints básicos
- [ ] Usar `enumerate`, `zip`, y dict `.items()` naturalmente
- [ ] Explicar qué es el GIL y cuándo importa

---

## 💬 Preguntas de Autoevaluación

1. **Conceptual**: ¿Por qué `in` es O(1) para sets pero O(n) para listas? ¿Cómo impacta esto un filtro sobre 1 millón de registros?

2. **Práctica**: Tienes un archivo de 10GB. ¿Cómo lo procesarías sin quedarte sin memoria? (Hint: generators)

3. **Diseño**: Necesitas un pipeline que lea de CSV, JSON y APIs, aplique las mismas transformaciones, y escriba a Parquet. ¿Qué patrones usarías?

---

*Última actualización: Enero 2026 | Versión: 1.0.0*

