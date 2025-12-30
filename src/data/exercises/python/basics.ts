/**
 * Python Basics Exercises
 * Variables, loops, functions, data structures
 */

import { PythonExercise } from '../types';

export const PYTHON_BASICS: PythonExercise[] = [
  {
    id: 'py-b1',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['list comprehension', 'basics'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'List Comprehension',
      en: 'List Comprehension',
      pt: 'List Comprehension'
    },
    description: {
      es: 'Creá una lista con los cuadrados de los números del 1 al 10.',
      en: 'Create a list with the squares of numbers from 1 to 10.',
      pt: 'Crie uma lista com os quadrados dos números de 1 a 10.'
    },
    theory: {
      es: `**List Comprehension** es una forma concisa de crear listas.

\`\`\`python
# Sintaxis básica
[expresión for item in iterable]

# Con filtro
[expresión for item in iterable if condición]

# Ejemplos
dobles = [n*2 for n in range(5)]  # [0, 2, 4, 6, 8]
pares = [x for x in range(10) if x % 2 == 0]
\`\`\`

**Dict y Set Comprehension:**
\`\`\`python
letras = {i: chr(65+i) for i in range(3)}  # {0: 'A', 1: 'B', 2: 'C'}
\`\`\``,
      en: `**List Comprehension** is a concise way to create lists.

\`\`\`python
# Basic syntax
[expression for item in iterable]

# With filter
[expression for item in iterable if condition]

# Examples
doubles = [n*2 for n in range(5)]  # [0, 2, 4, 6, 8]
evens = [x for x in range(10) if x % 2 == 0]
\`\`\`

**Dict and Set Comprehension:**
\`\`\`python
letters = {i: chr(65+i) for i in range(3)}  # {0: 'A', 1: 'B', 2: 'C'}
\`\`\``,
      pt: `**List Comprehension** é uma forma concisa de criar listas.

\`\`\`python
# Sintaxe básica
[expressao for item in iteravel]

# Com filtro
[expressao for item in iteravel if condicao]

# Exemplos
dobros = [n*2 for n in range(5)]  # [0, 2, 4, 6, 8]
pares = [x for x in range(10) if x % 2 == 0]
\`\`\`

**Dict e Set Comprehension:**
\`\`\`python
letras = {i: chr(65+i) for i in range(3)}  # {0: 'A', 1: 'B', 2: 'C'}
\`\`\``
    },
    realWorldExample: {
      es: 'Transformar datos, filtrar listas rápidamente.',
      en: 'Transform data, filter lists quickly.',
      pt: 'Transformar dados, filtrar listas rapidamente.'
    },
    hint: {
      es: 'Usá [x**2 for x in range(1, 11)]',
      en: 'Use [x**2 for x in range(1, 11)]',
      pt: 'Use [x**2 for x in range(1, 11)]'
    },
    
    starterCode: {
      es: `# Creá la lista de cuadrados del 1 al 10
cuadrados = []

print(cuadrados)`,
      en: `# Create the list of squares from 1 to 10
cuadrados = []  # Use this variable name

print(cuadrados)`,
      pt: `# Crie a lista de quadrados de 1 a 10
cuadrados = []  # Use este nome de variável

print(cuadrados)`
    },
    solution: `cuadrados = [x**2 for x in range(1, 11)]
print(cuadrados)`,
    testCode: `
expected = [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
assert cuadrados == expected, f"Expected {expected}, got {cuadrados}"
print("✅ Correct!")
`,
  },
  {
    id: 'py-b2',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['dict', 'get', 'frequency'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Contar frecuencias',
      en: 'Count Frequencies',
      pt: 'Contar Frequências'
    },
    description: {
      es: 'Contá la frecuencia de cada palabra en una lista.',
      en: 'Count the frequency of each word in a list.',
      pt: 'Conte a frequência de cada palavra em uma lista.'
    },
    theory: {
      es: `**Métodos útiles de diccionarios:**

\`\`\`python
# get() - obtener con valor default
mi_dict = {'a': 1}
valor = mi_dict.get('b', 0)  # Retorna 0 si 'b' no existe

# Patrón para contar elementos
conteo = {}
for item in lista:
    conteo[item] = conteo.get(item, 0) + 1
\`\`\`

**Alternativas:**
- \`collections.defaultdict(int)\` - auto-inicializa en 0
- \`collections.Counter(lista)\` - cuenta automáticamente`,
      en: `**Useful dictionary methods:**

\`\`\`python
# get() - get with default value
my_dict = {'a': 1}
value = my_dict.get('b', 0)  # Returns 0 if 'b' doesn't exist

# Pattern to count elements
count = {}
for item in items:
    count[item] = count.get(item, 0) + 1
\`\`\`

**Alternatives:**
- \`collections.defaultdict(int)\` - auto-initializes to 0
- \`collections.Counter(items)\` - counts automatically`,
      pt: `**Métodos úteis de dicionários:**

\`\`\`python
# get() - obter com valor padrão
meu_dict = {'a': 1}
valor = meu_dict.get('b', 0)  # Retorna 0 se 'b' não existe

# Padrão para contar elementos
contagem = {}
for item in lista:
    contagem[item] = contagem.get(item, 0) + 1
\`\`\`

**Alternativas:**
- \`collections.defaultdict(int)\` - auto-inicializa em 0
- \`collections.Counter(lista)\` - conta automaticamente`
    },
    realWorldExample: {
      es: 'Contar eventos, crear histogramas.',
      en: 'Count events, create histograms.',
      pt: 'Contar eventos, criar histogramas.'
    },
    hint: {
      es: 'Usá dict.get(key, 0) + 1',
      en: 'Use dict.get(key, 0) + 1',
      pt: 'Use dict.get(key, 0) + 1'
    },
    
    starterCode: {
      es: `palabras = ['python', 'data', 'python', 'sql', 'data', 'python']

# Contá la frecuencia de cada palabra
frecuencias = {}

print(frecuencias)`,
      en: `palabras = ['python', 'data', 'python', 'sql', 'data', 'python']

# Count the frequency of each word
frecuencias = {}  # Use this variable name

print(frecuencias)`,
      pt: `palabras = ['python', 'data', 'python', 'sql', 'data', 'python']

# Conte a frequência de cada palavra
frecuencias = {}  # Use este nome de variável

print(frecuencias)`
    },
    solution: `palabras = ['python', 'data', 'python', 'sql', 'data', 'python']
frecuencias = {}
for palabra in palabras:
    frecuencias[palabra] = frecuencias.get(palabra, 0) + 1
print(frecuencias)`,
    testCode: `
assert frecuencias['python'] == 3, "python should appear 3 times"
assert frecuencias['data'] == 2, "data should appear 2 times"
assert frecuencias['sql'] == 1, "sql should appear 1 time"
print("✅ Correct!")
`,
  },
  {
    id: 'py-b3',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['functions', 'basics'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Crear función promedio',
      en: 'Create Average Function',
      pt: 'Criar Função Média'
    },
    description: {
      es: 'Creá una función que calcule el promedio de una lista de números.',
      en: 'Create a function that calculates the average of a list of numbers.',
      pt: 'Crie uma função que calcule a média de uma lista de números.'
    },
    theory: {
      es: `**Funciones en Python:**

\`\`\`python
def mi_funcion(parametro):
    # Procesar y retornar resultado
    return resultado

# Con type hints (recomendado)
def sumar(a: int, b: int) -> int:
    return a + b
\`\`\`

**Funciones útiles para listas:**
- \`sum(lista)\` - suma todos los elementos
- \`len(lista)\` - cantidad de elementos
- \`max(lista)\`, \`min(lista)\` - máximo y mínimo`,
      en: `**Functions in Python:**

\`\`\`python
def my_function(parameter):
    # Process and return result
    return result

# With type hints (recommended)
def add(a: int, b: int) -> int:
    return a + b
\`\`\`

**Useful functions for lists:**
- \`sum(list)\` - sums all elements
- \`len(list)\` - number of elements
- \`max(list)\`, \`min(list)\` - maximum and minimum`,
      pt: `**Funções em Python:**

\`\`\`python
def minha_funcao(parametro):
    # Processar e retornar resultado
    return resultado

# Com type hints (recomendado)
def somar(a: int, b: int) -> int:
    return a + b
\`\`\`

**Funções úteis para listas:**
- \`sum(lista)\` - soma todos os elementos
- \`len(lista)\` - quantidade de elementos
- \`max(lista)\`, \`min(lista)\` - máximo e mínimo`
    },
    realWorldExample: {
      es: 'Calcular métricas, transformar datos.',
      en: 'Calculate metrics, transform data.',
      pt: 'Calcular métricas, transformar dados.'
    },
    hint: {
      es: 'Usá sum() y len()',
      en: 'Use sum() and len()',
      pt: 'Use sum() e len()'
    },
    
    starterCode: {
      es: `def calcular_promedio(numeros):
    # Tu código acá
    pass

# Test
resultado = calcular_promedio([10, 20, 30, 40, 50])
print(f"Promedio: {resultado}")`,
      en: `def calculate_average(numbers):
    # Your code here
    pass

# Test
result = calculate_average([10, 20, 30, 40, 50])
print(f"Average: {result}")`,
      pt: `def calcular_media(numeros):
    # Seu código aqui
    pass

# Teste
resultado = calcular_media([10, 20, 30, 40, 50])
print(f"Média: {resultado}")`
    },
    solution: `def calcular_promedio(numeros):
    return sum(numeros) / len(numeros)

resultado = calcular_promedio([10, 20, 30, 40, 50])
print(f"Promedio: {resultado}")`,
    testCode: `
assert calcular_promedio([10, 20, 30, 40, 50]) == 30, "Average of [10,20,30,40,50] should be 30"
assert calcular_promedio([1, 2, 3]) == 2, "Average of [1,2,3] should be 2"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b4',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'basics',
    tags: ['sorting', 'key function'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Ordenar con key',
      en: 'Sort with key',
      pt: 'Ordenar com key'
    },
    description: {
      es: 'Ordená una lista de diccionarios por el campo "precio".',
      en: 'Sort a list of dictionaries by the "price" field.',
      pt: 'Ordene uma lista de dicionários pelo campo "preco".'
    },
    theory: {
      es: `**Ordenar en Python:**

\`\`\`python
# Dos formas de ordenar
lista.sort()      # Modifica la lista original
sorted(lista)     # Retorna nueva lista ordenada

# Ordenar por un campo específico
sorted(datos, key=lambda x: x['campo'])

# Orden descendente
sorted(datos, key=lambda x: x['valor'], reverse=True)
\`\`\`

**Tip:** \`key\` recibe una función que extrae el valor por el cual ordenar.`,
      en: `**Sorting in Python:**

\`\`\`python
# Two ways to sort
list.sort()       # Modifies original list
sorted(list)      # Returns new sorted list

# Sort by a specific field
sorted(data, key=lambda x: x['field'])

# Descending order
sorted(data, key=lambda x: x['value'], reverse=True)
\`\`\`

**Tip:** \`key\` receives a function that extracts the value to sort by.`,
      pt: `**Ordenar em Python:**

\`\`\`python
# Duas formas de ordenar
lista.sort()      # Modifica a lista original
sorted(lista)     # Retorna nova lista ordenada

# Ordenar por um campo específico
sorted(dados, key=lambda x: x['campo'])

# Ordem descendente
sorted(dados, key=lambda x: x['valor'], reverse=True)
\`\`\`

**Dica:** \`key\` recebe uma função que extrai o valor pelo qual ordenar.`
    },
    realWorldExample: {
      es: 'Ordenar resultados de búsqueda, ranking.',
      en: 'Sort search results, rankings.',
      pt: 'Ordenar resultados de busca, ranking.'
    },
    hint: {
      es: 'Usá sorted() con key=lambda',
      en: 'Use sorted() with key=lambda',
      pt: 'Use sorted() com key=lambda'
    },
    
    starterCode: {
      es: `productos = [
    {'nombre': 'Laptop', 'precio': 999},
    {'nombre': 'Mouse', 'precio': 29},
    {'nombre': 'Monitor', 'precio': 299}
]

# Ordená por precio ascendente
ordenados = None

print(ordenados)`,
      en: `products = [
    {'name': 'Laptop', 'price': 999},
    {'name': 'Mouse', 'price': 29},
    {'name': 'Monitor', 'price': 299}
]

# Sort by price ascending
sorted_products = None

print(sorted_products)`,
      pt: `produtos = [
    {'nome': 'Laptop', 'preco': 999},
    {'nome': 'Mouse', 'preco': 29},
    {'nome': 'Monitor', 'preco': 299}
]

# Ordene por preço ascendente
ordenados = None

print(ordenados)`
    },
    solution: `productos = [
    {'nombre': 'Laptop', 'precio': 999},
    {'nombre': 'Mouse', 'precio': 29},
    {'nombre': 'Monitor', 'precio': 299}
]
ordenados = sorted(productos, key=lambda p: p['precio'])
print(ordenados)`,
    testCode: `
assert ordenados[0]['precio'] == 29, "First should be cheapest"
assert ordenados[-1]['precio'] == 999, "Last should be most expensive"
print("✅ ¡Correcto!")
`,
  },
  
  // === DATA ENGINEERING PYTHON ===
  {
    id: 'py-de1',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'data-engineering',
    tags: ['json', 'file handling', 'etl'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Cargar y procesar JSON',
      en: 'Load and process JSON',
      pt: 'Carregar e processar JSON'
    },
    description: {
      es: 'Cargá un JSON con órdenes y calculá el total de ventas.',
      en: 'Load a JSON with orders and calculate total sales.',
      pt: 'Carregue um JSON com pedidos e calcule o total de vendas.'
    },
    theory: {
      es: `**Trabajar con JSON en Python:**

\`\`\`python
import json

# Leer JSON de string
data = json.loads('{"key": "value"}')

# Leer JSON de archivo
with open('data.json') as f:
    data = json.load(f)

# Escribir JSON
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)
\`\`\``,
      en: `**Working with JSON in Python:**

\`\`\`python
import json

# Read JSON from string
data = json.loads('{"key": "value"}')

# Read JSON from file
with open('data.json') as f:
    data = json.load(f)

# Write JSON
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)
\`\`\``,
      pt: `**Trabalhar com JSON em Python:**

\`\`\`python
import json

# Ler JSON de string
data = json.loads('{"key": "value"}')

# Ler JSON de arquivo
with open('data.json') as f:
    data = json.load(f)

# Escrever JSON
with open('output.json', 'w') as f:
    json.dump(data, f, indent=2)
\`\`\``
    },
    realWorldExample: {
      es: 'Procesar datos de APIs, archivos de configuración.',
      en: 'Process API data, configuration files.',
      pt: 'Processar dados de APIs, arquivos de configuração.'
    },
    hint: {
      es: 'Usá json.loads() y sum() con list comprehension',
      en: 'Use json.loads() and sum() with list comprehension',
      pt: 'Use json.loads() e sum() com list comprehension'
    },
    
    starterCode: {
      es: `import json

# Datos de ejemplo (en producción vendría de un archivo)
orders_json = '''
[
    {"id": 1, "customer": "Ana", "total": 150.50},
    {"id": 2, "customer": "Juan", "total": 89.99},
    {"id": 3, "customer": "María", "total": 210.00}
]
'''

# Cargá el JSON y calculá el total de ventas
orders = None  # Cargá el JSON aquí
total_sales = None  # Calculá el total

print(f"Total ventas: {total_sales}")`,
      en: `import json

# Sample data (in production would come from a file)
orders_json = '''
[
    {"id": 1, "customer": "Ana", "total": 150.50},
    {"id": 2, "customer": "Juan", "total": 89.99},
    {"id": 3, "customer": "María", "total": 210.00}
]
'''

# Load the JSON and calculate total sales
orders = None  # Load JSON here
total_sales = None  # Calculate total

print(f"Total sales: {total_sales}")`,
      pt: `import json

# Dados de exemplo (em produção viria de um arquivo)
orders_json = '''
[
    {"id": 1, "customer": "Ana", "total": 150.50},
    {"id": 2, "customer": "Juan", "total": 89.99},
    {"id": 3, "customer": "María", "total": 210.00}
]
'''

# Carregue o JSON e calcule o total de vendas
orders = None  # Carregue o JSON aqui
total_sales = None  # Calcule o total

print(f"Total vendas: {total_sales}")`
    },
    solution: `import json

orders_json = '''
[
    {"id": 1, "customer": "Ana", "total": 150.50},
    {"id": 2, "customer": "Juan", "total": 89.99},
    {"id": 3, "customer": "María", "total": 210.00}
]
'''

orders = json.loads(orders_json)
total_sales = sum(order['total'] for order in orders)
print(f"Total ventas: {total_sales}")`,
    testCode: `
assert orders is not None, "orders should be loaded"
assert len(orders) == 3, "Should have 3 orders"
assert abs(total_sales - 450.49) < 0.01, "Total should be 450.49"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-de2',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'data-engineering',
    tags: ['error handling', 'try except', 'logging'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Manejo de errores robusto',
      en: 'Robust error handling',
      pt: 'Tratamento de erros robusto'
    },
    description: {
      es: 'Implementá una función que procese datos con manejo de errores.',
      en: 'Implement a function that processes data with error handling.',
      pt: 'Implemente uma função que processe dados com tratamento de erros.'
    },
    theory: {
      es: `**Manejo de errores en Python:**

\`\`\`python
try:
    result = risky_operation()
except ValueError as e:
    print(f"Error de valor: {e}")
except Exception as e:
    print(f"Error inesperado: {e}")
finally:
    cleanup()  # Siempre se ejecuta

# Raise custom errors
if not valid:
    raise ValueError("Datos inválidos")
\`\`\``,
      en: `**Error handling in Python:**

\`\`\`python
try:
    result = risky_operation()
except ValueError as e:
    print(f"Value error: {e}")
except Exception as e:
    print(f"Unexpected error: {e}")
finally:
    cleanup()  # Always runs

# Raise custom errors
if not valid:
    raise ValueError("Invalid data")
\`\`\``,
      pt: `**Tratamento de erros em Python:**

\`\`\`python
try:
    result = risky_operation()
except ValueError as e:
    print(f"Erro de valor: {e}")
except Exception as e:
    print(f"Erro inesperado: {e}")
finally:
    cleanup()  # Sempre executa

# Raise custom errors
if not valid:
    raise ValueError("Dados inválidos")
\`\`\``
    },
    realWorldExample: {
      es: 'Pipelines de datos deben manejar errores sin crashear.',
      en: 'Data pipelines must handle errors without crashing.',
      pt: 'Pipelines de dados devem tratar erros sem travar.'
    },
    hint: {
      es: 'Usá try/except y retorná None o un valor por defecto si falla',
      en: 'Use try/except and return None or a default value on failure',
      pt: 'Use try/except e retorne None ou um valor padrão se falhar'
    },
    
    starterCode: {
      es: `def safe_divide(a, b):
    """Divide a/b de forma segura, retorna None si falla."""
    # Implementá el manejo de errores
    pass

# Tests
print(safe_divide(10, 2))   # Debería ser 5.0
print(safe_divide(10, 0))   # Debería ser None
print(safe_divide("a", 2))  # Debería ser None`,
      en: `def safe_divide(a, b):
    """Safely divide a/b, return None on failure."""
    # Implement error handling
    pass

# Tests
print(safe_divide(10, 2))   # Should be 5.0
print(safe_divide(10, 0))   # Should be None
print(safe_divide("a", 2))  # Should be None`,
      pt: `def safe_divide(a, b):
    """Divide a/b de forma segura, retorna None se falhar."""
    # Implemente o tratamento de erros
    pass

# Testes
print(safe_divide(10, 2))   # Deve ser 5.0
print(safe_divide(10, 0))   # Deve ser None
print(safe_divide("a", 2))  # Deve ser None`
    },
    solution: `def safe_divide(a, b):
    """Divide a/b de forma segura, retorna None si falla."""
    try:
        return a / b
    except (ZeroDivisionError, TypeError):
        return None

# Tests
print(safe_divide(10, 2))   # 5.0
print(safe_divide(10, 0))   # None
print(safe_divide("a", 2))  # None`,
    testCode: `
assert safe_divide(10, 2) == 5.0, "10/2 should be 5.0"
assert safe_divide(10, 0) is None, "Division by zero should return None"
assert safe_divide("a", 2) is None, "Invalid type should return None"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-de3',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'data-engineering',
    tags: ['generators', 'memory', 'big data'],
    interviewFrequency: 'high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Generadores para Big Data',
      en: 'Generators for Big Data',
      pt: 'Geradores para Big Data'
    },
    description: {
      es: 'Creá un generador para procesar datos sin cargar todo en memoria.',
      en: 'Create a generator to process data without loading everything in memory.',
      pt: 'Crie um gerador para processar dados sem carregar tudo na memória.'
    },
    theory: {
      es: `**Generadores en Python:**

\`\`\`python
# Función generadora (usa yield)
def read_large_file(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

# Generator expression
squares = (x**2 for x in range(1000000))

# Beneficios:
# - No carga todo en memoria
# - Procesa item por item
# - Ideal para archivos grandes
\`\`\``,
      en: `**Generators in Python:**

\`\`\`python
# Generator function (uses yield)
def read_large_file(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

# Generator expression
squares = (x**2 for x in range(1000000))

# Benefits:
# - Doesn't load everything in memory
# - Processes item by item
# - Ideal for large files
\`\`\``,
      pt: `**Geradores em Python:**

\`\`\`python
# Função geradora (usa yield)
def read_large_file(filepath):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

# Generator expression
squares = (x**2 for x in range(1000000))

# Benefícios:
# - Não carrega tudo na memória
# - Processa item por item
# - Ideal para arquivos grandes
\`\`\``
    },
    realWorldExample: {
      es: 'Procesar archivos de GB sin quedarse sin memoria.',
      en: 'Process GB files without running out of memory.',
      pt: 'Processar arquivos de GB sem ficar sem memória.'
    },
    hint: {
      es: 'Usá yield en vez de return para crear un generador',
      en: 'Use yield instead of return to create a generator',
      pt: 'Use yield em vez de return para criar um gerador'
    },
    
    starterCode: {
      es: `def batch_processor(data, batch_size):
    """
    Generador que devuelve los datos en batches.
    
    Ejemplo:
    list(batch_processor([1,2,3,4,5], 2)) -> [[1,2], [3,4], [5]]
    """
    # Implementá el generador
    pass

# Test
data = list(range(10))
for batch in batch_processor(data, 3):
    print(f"Procesando batch: {batch}")`,
      en: `def batch_processor(data, batch_size):
    """
    Generator that yields data in batches.
    
    Example:
    list(batch_processor([1,2,3,4,5], 2)) -> [[1,2], [3,4], [5]]
    """
    # Implement the generator
    pass

# Test
data = list(range(10))
for batch in batch_processor(data, 3):
    print(f"Processing batch: {batch}")`,
      pt: `def batch_processor(data, batch_size):
    """
    Gerador que retorna os dados em batches.
    
    Exemplo:
    list(batch_processor([1,2,3,4,5], 2)) -> [[1,2], [3,4], [5]]
    """
    # Implemente o gerador
    pass

# Teste
data = list(range(10))
for batch in batch_processor(data, 3):
    print(f"Processando batch: {batch}")`
    },
    solution: `def batch_processor(data, batch_size):
    """Generador que devuelve los datos en batches."""
    for i in range(0, len(data), batch_size):
        yield data[i:i + batch_size]

# Test
data = list(range(10))
for batch in batch_processor(data, 3):
    print(f"Procesando batch: {batch}")`,
    testCode: `
batches = list(batch_processor([1,2,3,4,5], 2))
assert batches == [[1,2], [3,4], [5]], "Batches should be [[1,2], [3,4], [5]]"
assert len(list(batch_processor(range(100), 10))) == 10, "Should have 10 batches"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-de4',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'data-engineering',
    tags: ['decorators', 'timing', 'logging'],
    interviewFrequency: 'high',
    xpReward: 45,
    coinsReward: 20,
    
    title: {
      es: 'Decorador de timing',
      en: 'Timing decorator',
      pt: 'Decorador de timing'
    },
    description: {
      es: 'Creá un decorador que mida el tiempo de ejecución de funciones.',
      en: 'Create a decorator that measures function execution time.',
      pt: 'Crie um decorador que meça o tempo de execução de funções.'
    },
    theory: {
      es: `**Decoradores en Python:**

Un decorador es una función que recibe una función y retorna una versión modificada.

\`\`\`python
from functools import wraps

def mi_decorador(func):
    @wraps(func)  # Preserva metadata de la función original
    def wrapper(*args, **kwargs):
        # Código ANTES de ejecutar la función
        resultado = func(*args, **kwargs)
        # Código DESPUÉS de ejecutar la función
        return resultado
    return wrapper

@mi_decorador
def slow_function():
    time.sleep(1)
\`\`\``,
      en: `**Decorators in Python:**

A decorator is a function that receives a function and returns a modified version.

\`\`\`python
from functools import wraps

def my_decorator(func):
    @wraps(func)  # Preserves original function metadata
    def wrapper(*args, **kwargs):
        # Code BEFORE executing the function
        result = func(*args, **kwargs)
        # Code AFTER executing the function
        return result
    return wrapper

@my_decorator
def some_function():
    pass
\`\`\``,
      pt: `**Decoradores em Python:**

Um decorador é uma função que recebe uma função e retorna uma versão modificada.

\`\`\`python
from functools import wraps

def meu_decorador(func):
    @wraps(func)  # Preserva metadados da função original
    def wrapper(*args, **kwargs):
        # Código ANTES de executar a função
        resultado = func(*args, **kwargs)
        # Código DEPOIS de executar a função
        return resultado
    return wrapper

@meu_decorador
def slow_function():
    time.sleep(1)
\`\`\``
    },
    realWorldExample: {
      es: 'Monitorear performance de funciones en pipelines.',
      en: 'Monitor function performance in pipelines.',
      pt: 'Monitorar performance de funções em pipelines.'
    },
    hint: {
      es: 'Usá time.time() antes y después de llamar a la función',
      en: 'Use time.time() before and after calling the function',
      pt: 'Use time.time() antes e depois de chamar a função'
    },
    
    starterCode: {
      es: `import time

def timer(func):
    """Decorador que mide tiempo de ejecución."""
    # Implementá el decorador
    pass

@timer
def example_function(n):
    """Función que simula trabajo."""
    total = sum(range(n))
    return total

# Test
result = example_function(1000000)
print(f"Resultado: {result}")`,
      en: `import time

def timer(func):
    """Decorator that measures execution time."""
    # Implement the decorator
    pass

@timer
def example_function(n):
    """Function that simulates work."""
    total = sum(range(n))
    return total

# Test
result = example_function(1000000)
print(f"Result: {result}")`,
      pt: `import time

def timer(func):
    """Decorador que mede tempo de execução."""
    # Implemente o decorador
    pass

@timer
def example_function(n):
    """Função que simula trabalho."""
    total = sum(range(n))
    return total

# Teste
resultado = example_function(1000000)
print(f"Resultado: {resultado}")`
    },
    solution: `import time

def timer(func):
    """Decorador que mide tiempo de ejecución."""
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} tardó {elapsed:.4f}s")
        return result
    return wrapper

@timer
def example_function(n):
    """Función que simula trabajo."""
    total = sum(range(n))
    return total

result = example_function(1000000)
print(f"Resultado: {result}")`,
    testCode: `
assert result == 499999500000, "Result should be correct sum"
assert callable(timer), "timer should be a function"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-de5',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'data-engineering',
    tags: ['dataclass', 'typing', 'clean code'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Dataclasses para modelos de datos',
      en: 'Dataclasses for data models',
      pt: 'Dataclasses para modelos de dados'
    },
    description: {
      es: 'Usá dataclasses para crear modelos de datos tipados.',
      en: 'Use dataclasses to create typed data models.',
      pt: 'Use dataclasses para criar modelos de dados tipados.'
    },
    theory: {
      es: `**Dataclasses en Python:**

\`\`\`python
from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    age: Optional[int] = None

# Uso
user = User(id=1, name="Ana", email="ana@email.com")
print(user.name)  # Ana

# Comparación automática
user1 = User(1, "Ana", "ana@email.com")
user2 = User(1, "Ana", "ana@email.com")
print(user1 == user2)  # True
\`\`\``,
      en: `**Dataclasses in Python:**

\`\`\`python
from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    age: Optional[int] = None

# Usage
user = User(id=1, name="Ana", email="ana@email.com")
print(user.name)  # Ana

# Automatic comparison
user1 = User(1, "Ana", "ana@email.com")
user2 = User(1, "Ana", "ana@email.com")
print(user1 == user2)  # True
\`\`\``,
      pt: `**Dataclasses em Python:**

\`\`\`python
from dataclasses import dataclass
from typing import Optional

@dataclass
class User:
    id: int
    name: str
    email: str
    age: Optional[int] = None

# Uso
user = User(id=1, name="Ana", email="ana@email.com")
print(user.name)  # Ana

# Comparação automática
user1 = User(1, "Ana", "ana@email.com")
user2 = User(1, "Ana", "ana@email.com")
print(user1 == user2)  # True
\`\`\``
    },
    realWorldExample: {
      es: 'Modelar entidades de datos de forma tipada y limpia.',
      en: 'Model data entities in a typed and clean way.',
      pt: 'Modelar entidades de dados de forma tipada e limpa.'
    },
    hint: {
      es: 'Usá @dataclass y definí los campos con tipos',
      en: 'Use @dataclass and define fields with types',
      pt: 'Use @dataclass e defina os campos com tipos'
    },
    
    starterCode: {
      es: `from dataclasses import dataclass
from typing import Optional

# Creá una dataclass Order con:
# - order_id: int
# - customer_name: str
# - total: float
# - status: str (default: "pending")

# Tu código aquí

# Test
order = Order(order_id=1, customer_name="Ana", total=150.50)
print(f"Order {order.order_id}: {order.total} - {order.status}")`,
      en: `from dataclasses import dataclass
from typing import Optional

# Create a dataclass Order with:
# - order_id: int
# - customer_name: str
# - total: float
# - status: str (default: "pending")

# Your code here

# Test
order = Order(order_id=1, customer_name="Ana", total=150.50)
print(f"Order {order.order_id}: {order.total} - {order.status}")`,
      pt: `from dataclasses import dataclass
from typing import Optional

# Crie uma dataclass Order com:
# - order_id: int
# - customer_name: str
# - total: float
# - status: str (default: "pending")

# Seu código aqui

# Teste
order = Order(order_id=1, customer_name="Ana", total=150.50)
print(f"Order {order.order_id}: {order.total} - {order.status}")`
    },
    solution: `from dataclasses import dataclass
from typing import Optional

@dataclass
class Order:
    order_id: int
    customer_name: str
    total: float
    status: str = "pending"

order = Order(order_id=1, customer_name="Ana", total=150.50)
print(f"Order {order.order_id}: {order.total} - {order.status}")`,
    testCode: `
assert order.order_id == 1, "order_id should be 1"
assert order.customer_name == "Ana", "customer_name should be Ana"
assert order.total == 150.50, "total should be 150.50"
assert order.status == "pending", "status should be pending"
print("✅ ¡Correcto!")
`,
  },
  // === NUEVOS EJERCICIOS EASY ===
  {
    id: 'py-b10',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['string', 'methods', 'basics'],
    interviewFrequency: 'high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'Manipulación de Strings',
      en: 'String Manipulation',
      pt: 'Manipulação de Strings'
    },
    description: {
      es: 'Dado un email, extraé el nombre de usuario (antes del @) y el dominio (después del @).',
      en: 'Given an email, extract the username (before @) and domain (after @).',
      pt: 'Dado um e-mail, extraia o nome de usuário (antes do @) e o domínio (depois do @).'
    },
    theory: {
      es: `**Métodos de strings más usados:**

\`\`\`python
email = "ana@empresa.com"

# Split por caracter
partes = email.split("@")  # ['ana', 'empresa.com']

# Acceder a partes
usuario = partes[0]  # 'ana'
dominio = partes[1]  # 'empresa.com'

# Otros métodos útiles
"  texto  ".strip()      # 'texto'
"HOLA".lower()           # 'hola'
"hola".upper()           # 'HOLA'
"hola mundo".title()     # 'Hola Mundo'
"hola".replace("o", "0") # 'h0la'
\`\`\``,
      en: `**Most used string methods:** split(), strip(), lower(), upper(), replace().`,
      pt: `**Métodos de strings mais usados:**

\`\`\`python
email = "ana@empresa.com"

# Split por caractere
partes = email.split("@")  # ['ana', 'empresa.com']

# Acessar partes
usuario = partes[0]  # 'ana'
dominio = partes[1]  # 'empresa.com'

# Outros métodos úteis
"  texto  ".strip()      # 'texto'
"HOLA".lower()           # 'hola'
"hola".upper()           # 'HOLA'
"hola mundo".title()     # 'Hola Mundo'
"hola".replace("o", "0") # 'h0la'
\`\`\``
    },
    realWorldExample: {
      es: 'Parsear emails, URLs, logs, archivos CSV.',
      en: 'Parse emails, URLs, logs, CSV files.',
      pt: 'Fazer parse de e-mails, URLs, logs, arquivos CSV.'
    },
    hint: {
      es: 'Usá split("@") para separar el email en partes',
      en: 'Use split("@") to separate the email into parts',
      pt: 'Use split("@") para separar o e-mail em partes'
    },
    
    starterCode: {
      es: `email = "usuario.test@empresa.com"

# Extraé el nombre de usuario y el dominio
# Tu código aquí

print(f"Usuario: {usuario}")
print(f"Dominio: {dominio}")`,
      en: `email = "usuario.test@empresa.com"

# Extract the username and domain
# Your code here

print(f"Username: {usuario}")
print(f"Domain: {dominio}")`,
      pt: `email = "usuario.test@empresa.com"

# Extraia o nome de usuário e o domínio
# Seu código aqui

print(f"Usuário: {usuario}")
print(f"Domínio: {dominio}")`
    },
    solution: `email = "usuario.test@empresa.com"

partes = email.split("@")
usuario = partes[0]
dominio = partes[1]

print(f"Usuario: {usuario}")
print(f"Dominio: {dominio}")`,
    testCode: `
assert usuario == "usuario.test", "Usuario should be 'usuario.test'"
assert dominio == "empresa.com", "Dominio should be 'empresa.com'"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b11',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['loops', 'range', 'basics'],
    interviewFrequency: 'very_high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'FizzBuzz Clásico',
      en: 'Classic FizzBuzz',
      pt: 'FizzBuzz Clássico'
    },
    description: {
      es: 'Imprimí los números del 1 al 15. Para múltiplos de 3 imprimí "Fizz", para múltiplos de 5 imprimí "Buzz", para múltiplos de ambos imprimí "FizzBuzz".',
      en: 'Print numbers from 1 to 15. For multiples of 3 print "Fizz", for multiples of 5 print "Buzz", for multiples of both print "FizzBuzz".',
      pt: 'Imprima os números de 1 a 15. Para múltiplos de 3 imprima "Fizz", para múltiplos de 5 imprima "Buzz", para múltiplos de ambos imprima "FizzBuzz".'
    },
    theory: {
      es: `**FizzBuzz** es el ejercicio de entrevista más clásico.

\`\`\`python
# Operador módulo (%) - retorna el resto de la división
10 % 3  # 1 (10 = 3*3 + 1)
9 % 3   # 0 (divisible exacto)
\`\`\`

**Tips:**
- Si \`n % x == 0\`, entonces n es divisible por x
- Chequeá la condición más específica primero
- Usá \`and\` para combinar condiciones`,
      en: `**FizzBuzz** is the most classic interview exercise.

\`\`\`python
# Modulo operator (%) - returns division remainder
10 % 3  # 1 (10 = 3*3 + 1)
9 % 3   # 0 (exactly divisible)
\`\`\`

**Tips:**
- If \`n % x == 0\`, then n is divisible by x
- Check the most specific condition first
- Use \`and\` to combine conditions`,
      pt: `**FizzBuzz** é o exercício de entrevista mais clássico.

\`\`\`python
# Operador módulo (%) - retorna o resto da divisão
10 % 3  # 1 (10 = 3*3 + 1)
9 % 3   # 0 (divisível exato)
\`\`\`

**Dicas:**
- Se \`n % x == 0\`, então n é divisível por x
- Verifique a condição mais específica primeiro
- Use \`and\` para combinar condições`
    },
    realWorldExample: {
      es: 'Lógica condicional, validaciones, categorización.',
      en: 'Conditional logic, validations, categorization.',
      pt: 'Lógica condicional, validações, categorização.'
    },
    hint: {
      es: 'Chequeá primero si es divisible por AMBOS (3 y 5)',
      en: 'Check first if divisible by BOTH (3 and 5)',
      pt: 'Verifique primeiro se é divisível por AMBOS (3 e 5)'
    },
    
    starterCode: {
      es: `resultados = []

# Recorré del 1 al 15 y agregá a resultados:
# - "FizzBuzz" si es múltiplo de 3 y 5
# - "Fizz" si es múltiplo de 3
# - "Buzz" si es múltiplo de 5
# - El número si no es múltiplo de ninguno

# Tu código aquí

print(resultados)`,
      en: `resultados = []

# Loop from 1 to 15 and append to resultados:
# - "FizzBuzz" if multiple of 3 and 5
# - "Fizz" if multiple of 3
# - "Buzz" if multiple of 5
# - The number if not multiple of any

# Your code here

print(resultados)`,
      pt: `resultados = []

# Percorra de 1 a 15 e adicione a resultados:
# - "FizzBuzz" se for múltiplo de 3 e 5
# - "Fizz" se for múltiplo de 3
# - "Buzz" se for múltiplo de 5
# - O número se não for múltiplo de nenhum

# Seu código aqui

print(resultados)`
    },
    solution: `resultados = []

for i in range(1, 16):
    if i % 3 == 0 and i % 5 == 0:
        resultados.append("FizzBuzz")
    elif i % 3 == 0:
        resultados.append("Fizz")
    elif i % 5 == 0:
        resultados.append("Buzz")
    else:
        resultados.append(i)

print(resultados)`,
    testCode: `
expected = [1, 2, "Fizz", 4, "Buzz", "Fizz", 7, 8, "Fizz", "Buzz", 11, "Fizz", 13, 14, "FizzBuzz"]
assert resultados == expected, f"Expected {expected}, got {resultados}"
print("✅ ¡Correcto!")
`,
  },
    {
    id: 'py-b13',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['list', 'filter', 'basics'],
    interviewFrequency: 'high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'Filtrar lista',
      en: 'Filter List',
      pt: 'Filtrar Lista'
    },
    description: {
      es: 'Dada una lista de números, filtrá solo los números pares mayores a 10.',
      en: 'Given a list of numbers, filter only even numbers greater than 10.',
      pt: 'Dada uma lista de números, filtre apenas os números pares maiores que 10.'
    },
    theory: {
      es: `**Filtrar listas en Python:**

\`\`\`python
# List comprehension con condición
resultado = [x for x in lista if condicion]

# Ejemplo: números mayores a 5
mayores = [n for n in numeros if n > 5]
\`\`\`

**Tip:** Podés combinar múltiples condiciones con \`and\` y \`or\`.`,
      en: `**Filtering lists in Python:**

\`\`\`python
# List comprehension with condition
result = [x for x in list if condition]

# Example: numbers greater than 5
greater = [n for n in numbers if n > 5]
\`\`\`

**Tip:** You can combine multiple conditions with \`and\` and \`or\`.`,
      pt: `**Filtrar listas em Python:**

\`\`\`python
# List comprehension com condição
resultado = [x for x in lista if condicao]

# Exemplo: números maiores que 5
maiores = [n for n in numeros if n > 5]
\`\`\`

**Dica:** Você pode combinar múltiplas condições com \`and\` e \`or\`.`
    },
    realWorldExample: {
      es: 'Filtrar registros por condiciones, limpieza de datos.',
      en: 'Filter records by conditions, data cleaning.',
      pt: 'Filtrar registros por condições, limpeza de dados.'
    },
    hint: {
      es: 'Usá list comprehension con dos condiciones: par Y mayor a 10',
      en: 'Use list comprehension with two conditions: even AND greater than 10',
      pt: 'Use list comprehension com duas condições: par E maior que 10'
    },
    
    starterCode: {
      es: `numeros = [5, 12, 8, 20, 3, 16, 7, 14, 22, 9]

# Filtrá solo los números pares mayores a 10
filtrados = []

# Tu código aquí

print(filtrados)`,
      en: `numeros = [5, 12, 8, 20, 3, 16, 7, 14, 22, 9]

# Filter only even numbers greater than 10
filtrados = []

# Your code here

print(filtrados)`,
      pt: `numeros = [5, 12, 8, 20, 3, 16, 7, 14, 22, 9]

# Filtre apenas os números pares maiores que 10
filtrados = []

# Seu código aqui

print(filtrados)`
    },
    solution: `numeros = [5, 12, 8, 20, 3, 16, 7, 14, 22, 9]

filtrados = [n for n in numeros if n % 2 == 0 and n > 10]

print(filtrados)`,
    testCode: `
assert filtrados == [12, 20, 16, 14, 22], f"Expected [12, 20, 16, 14, 22], got {filtrados}"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b14',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['reverse', 'string', 'basics'],
    interviewFrequency: 'high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'Invertir string',
      en: 'Reverse String',
      pt: 'Inverter String'
    },
    description: {
      es: 'Invertí un string dado (ej: "python" → "nohtyp").',
      en: 'Reverse a given string (e.g.: "python" → "nohtyp").',
      pt: 'Inverta uma string dada (ex: "python" → "nohtyp").'
    },
    theory: {
      es: `**Slicing en Python:**

\`\`\`python
lista = [0, 1, 2, 3, 4]
lista[1:3]   # [1, 2] - desde índice 1 hasta 3 (excluido)
lista[::2]   # [0, 2, 4] - cada 2 elementos
lista[::-1]  # [4, 3, 2, 1, 0] - orden inverso
\`\`\`

**Sintaxis:** \`secuencia[inicio:fin:paso]\`
- Un paso negativo recorre en reversa`,
      en: `**Slicing in Python:**

\`\`\`python
list = [0, 1, 2, 3, 4]
list[1:3]   # [1, 2] - from index 1 to 3 (excluded)
list[::2]   # [0, 2, 4] - every 2 elements
list[::-1]  # [4, 3, 2, 1, 0] - reverse order
\`\`\`

**Syntax:** \`sequence[start:end:step]\`
- A negative step traverses in reverse`,
      pt: `**Slicing em Python:**

\`\`\`python
lista = [0, 1, 2, 3, 4]
lista[1:3]   # [1, 2] - do índice 1 até 3 (excluído)
lista[::2]   # [0, 2, 4] - a cada 2 elementos
lista[::-1]  # [4, 3, 2, 1, 0] - ordem inversa
\`\`\`

**Sintaxe:** \`sequencia[inicio:fim:passo]\`
- Um passo negativo percorre ao contrário`
    },
    realWorldExample: {
      es: 'Validar palíndromos, manipular datos.',
      en: 'Validate palindromes, manipulate data.',
      pt: 'Validar palíndromos, manipular dados.'
    },
    hint: {
      es: 'Usá slicing con paso negativo: texto[::-1]',
      en: 'Use slicing with negative step: texto[::-1]',
      pt: 'Use slicing com passo negativo: texto[::-1]'
    },
    
    starterCode: {
      es: `texto = "data engineering"

# Invertí el string
invertido = ""

# Tu código aquí

print(invertido)`,
      en: `texto = "data engineering"

# Reverse the string
invertido = ""

# Your code here

print(invertido)`,
      pt: `texto = "data engineering"

# Inverta a string
invertido = ""

# Seu código aqui

print(invertido)`
    },
    solution: `texto = "data engineering"

invertido = texto[::-1]

print(invertido)`,
    testCode: `
assert invertido == "gnireenigne atad", f"Expected 'gnireenigne atad', got '{invertido}'"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b15',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['max', 'min', 'list', 'basics'],
    interviewFrequency: 'high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'Encontrar máximo y mínimo',
      en: 'Find Maximum and Minimum',
      pt: 'Encontrar Máximo e Mínimo'
    },
    description: {
      es: 'Dada una lista de números, encontrá el máximo y el mínimo SIN usar max() o min().',
      en: 'Given a list of numbers, find the maximum and minimum WITHOUT using max() or min().',
      pt: 'Dada uma lista de números, encontre o máximo e o mínimo SEM usar max() ou min().'
    },
    theory: {
      es: `**Encontrar extremos sin built-ins:**

**Algoritmo:**
1. Inicializá con el primer elemento de la lista
2. Recorré la lista comparando cada elemento
3. Actualizá si encontrás uno mayor/menor

\`\`\`python
# Comparaciones básicas
5 > 3   # True
2 < 8   # True
\`\`\`

**⚠️ En entrevistas** a veces piden hacerlo sin \`max()\` o \`min()\`.`,
      en: `**Finding extremes without built-ins:**

**Algorithm:**
1. Initialize with the first element of the list
2. Iterate through the list comparing each element
3. Update if you find a greater/smaller one

\`\`\`python
# Basic comparisons
5 > 3   # True
2 < 8   # True
\`\`\`

**⚠️ In interviews** they sometimes ask to do it without \`max()\` or \`min()\`.`,
      pt: `**Encontrar extremos sem built-ins:**

**Algoritmo:**
1. Inicialize com o primeiro elemento da lista
2. Percorra a lista comparando cada elemento
3. Atualize se encontrar um maior/menor

\`\`\`python
# Comparações básicas
5 > 3   # True
2 < 8   # True
\`\`\`

**⚠️ Em entrevistas** às vezes pedem para fazer isso sem \`max()\` ou \`min()\`.`
    },
    realWorldExample: {
      es: 'Entender algoritmos básicos, optimización.',
      en: 'Understand basic algorithms, optimization.',
      pt: 'Entender algoritmos básicos, otimização.'
    },
    hint: {
      es: 'Inicializá maximo y minimo con el primer elemento de la lista',
      en: 'Initialize maximo and minimo with the first element of the list',
      pt: 'Inicialize maximo e minimo com o primeiro elemento da lista'
    },
    
    starterCode: {
      es: `numeros = [34, 12, 89, 5, 67, 23, 91, 8]

# Encontrá el máximo y mínimo sin usar max() o min()
maximo = None
minimo = None

# Tu código aquí

print(f"Máximo: {maximo}")
print(f"Mínimo: {minimo}")`,
      en: `numeros = [34, 12, 89, 5, 67, 23, 91, 8]

# Find maximum and minimum without using max() or min()
maximo = None
minimo = None

# Your code here

print(f"Maximum: {maximo}")
print(f"Minimum: {minimo}")`,
      pt: `numeros = [34, 12, 89, 5, 67, 23, 91, 8]

# Encontre o máximo e mínimo sem usar max() ou min()
maximo = None
minimo = None

# Seu código aqui

print(f"Máximo: {maximo}")
print(f"Mínimo: {minimo}")`
    },
    solution: `numeros = [34, 12, 89, 5, 67, 23, 91, 8]

maximo = numeros[0]
minimo = numeros[0]

for n in numeros:
    if n > maximo:
        maximo = n
    if n < minimo:
        minimo = n

print(f"Máximo: {maximo}")
print(f"Mínimo: {minimo}")`,
    testCode: `
assert maximo == 91, f"Maximum should be 91, got {maximo}"
assert minimo == 5, f"Minimum should be 5, got {minimo}"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b16',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['sum', 'average', 'list', 'basics'],
    interviewFrequency: 'high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'Suma y promedio',
      en: 'Sum and Average',
      pt: 'Soma e Média'
    },
    description: {
      es: 'Calculá la suma y el promedio de una lista de números.',
      en: 'Calculate the sum and average of a list of numbers.',
      pt: 'Calcule a soma e a média de uma lista de números.'
    },
    theory: {
      es: `**Funciones built-in útiles:**

\`\`\`python
numeros = [1, 2, 3, 4, 5]

sum(numeros)   # Suma todos los elementos
len(numeros)   # Cantidad de elementos
\`\`\`

**Promedio:** Es la suma total dividida por la cantidad de elementos.`,
      en: `**Useful built-in functions:**

\`\`\`python
numbers = [1, 2, 3, 4, 5]

sum(numbers)   # Sums all elements
len(numbers)   # Number of elements
\`\`\`

**Average:** It's the total sum divided by the number of elements.`,
      pt: `**Funções built-in úteis:**

\`\`\`python
numeros = [1, 2, 3, 4, 5]

sum(numeros)   # Soma todos os elementos
len(numeros)   # Quantidade de elementos
\`\`\`

**Média:** É a soma total dividida pela quantidade de elementos.`
    },
    realWorldExample: {
      es: 'Métricas básicas, reportes, análisis de datos.',
      en: 'Basic metrics, reports, data analysis.',
      pt: 'Métricas básicas, relatórios, análise de dados.'
    },
    hint: {
      es: 'El promedio es la suma dividida por la cantidad de elementos',
      en: 'Average is sum divided by number of elements',
      pt: 'A média é a soma dividida pela quantidade de elementos'
    },
    
    starterCode: {
      es: `ventas = [1500, 2300, 1800, 2100, 1950]

# Calculá la suma y el promedio
suma = 0
promedio = 0

# Tu código aquí

print(f"Suma: {suma}")
print(f"Promedio: {promedio}")`,
      en: `ventas = [1500, 2300, 1800, 2100, 1950]

# Calculate sum and average
suma = 0
promedio = 0

# Your code here

print(f"Sum: {suma}")
print(f"Average: {promedio}")`,
      pt: `ventas = [1500, 2300, 1800, 2100, 1950]

# Calcule a soma e a média
suma = 0
promedio = 0

# Seu código aqui

print(f"Soma: {suma}")
print(f"Média: {promedio}")`
    },
    solution: `ventas = [1500, 2300, 1800, 2100, 1950]

suma = sum(ventas)
promedio = suma / len(ventas)

print(f"Suma: {suma}")
print(f"Promedio: {promedio}")`,
    testCode: `
assert suma == 9650, f"Sum should be 9650, got {suma}"
assert promedio == 1930.0, f"Average should be 1930.0, got {promedio}"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b17',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['duplicates', 'set', 'list', 'basics'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Eliminar duplicados',
      en: 'Remove Duplicates',
      pt: 'Remover Duplicatas'
    },
    description: {
      es: 'Dada una lista con duplicados, creá una nueva lista solo con valores únicos (mantené el orden).',
      en: 'Given a list with duplicates, create a new list with only unique values (keep order).',
      pt: 'Dada uma lista com duplicatas, crie uma nova lista apenas com valores únicos (mantenha a ordem).'
    },
    theory: {
      es: `**Estructuras sin duplicados:**

\`\`\`python
# set() - colección sin duplicados
mi_set = {1, 2, 2, 3}  # {1, 2, 3}

# dict - las claves son únicas
mi_dict = {"a": 1, "a": 2}  # {"a": 2}
\`\`\`

**Tip:** \`dict.fromkeys(lista)\` crea un dict usando los elementos como claves (elimina duplicados y mantiene orden en Python 3.7+).`,
      en: `**Structures without duplicates:**

\`\`\`python
# set() - collection without duplicates
my_set = {1, 2, 2, 3}  # {1, 2, 3}

# dict - keys are unique
my_dict = {"a": 1, "a": 2}  # {"a": 2}
\`\`\`

**Tip:** \`dict.fromkeys(list)\` creates a dict using elements as keys (removes duplicates and keeps order in Python 3.7+).`,
      pt: `**Estruturas sem duplicatas:**

\`\`\`python
# set() - coleção sem duplicatas
meu_set = {1, 2, 2, 3}  # {1, 2, 3}

# dict - as chaves são únicas
meu_dict = {"a": 1, "a": 2}  # {"a": 2}
\`\`\`

**Dica:** \`dict.fromkeys(lista)\` cria um dict usando os elementos como chaves (remove duplicatas e mantém a ordem no Python 3.7+).`
    },
    realWorldExample: {
      es: 'Limpiar datos, eliminar registros duplicados.',
      en: 'Clean data, remove duplicate records.',
      pt: 'Limpar dados, remover registros duplicados.'
    },
    hint: {
      es: 'Usá dict.fromkeys() para mantener el orden original',
      en: 'Use dict.fromkeys() to keep original order',
      pt: 'Use dict.fromkeys() para manter a ordem original'
    },
    
    starterCode: {
      es: `emails = ["ana@test.com", "bob@test.com", "ana@test.com", "carlos@test.com", "bob@test.com"]

# Eliminá duplicados manteniendo el orden
unicos = []

# Tu código aquí

print(unicos)`,
      en: `emails = ["ana@test.com", "bob@test.com", "ana@test.com", "carlos@test.com", "bob@test.com"]

# Remove duplicates keeping order
unicos = []

# Your code here

print(unicos)`,
      pt: `emails = ["ana@test.com", "bob@test.com", "ana@test.com", "carlos@test.com", "bob@test.com"]

# Remova duplicatas mantendo a ordem
unicos = []

# Seu código aqui

print(unicos)`
    },
    solution: `emails = ["ana@test.com", "bob@test.com", "ana@test.com", "carlos@test.com", "bob@test.com"]

unicos = list(dict.fromkeys(emails))

print(unicos)`,
    testCode: `
assert unicos == ["ana@test.com", "bob@test.com", "carlos@test.com"], f"Expected ['ana@test.com', 'bob@test.com', 'carlos@test.com'], got {unicos}"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b18',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['sort', 'list', 'basics'],
    interviewFrequency: 'high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'Ordenar lista de diccionarios',
      en: 'Sort List of Dictionaries',
      pt: 'Ordenar Lista de Dicionários'
    },
    description: {
      es: 'Ordená una lista de empleados por salario de mayor a menor.',
      en: 'Sort a list of employees by salary from highest to lowest.',
      pt: 'Ordene uma lista de funcionários por salário do maior para o menor.'
    },
    theory: {
      es: `**Ordenar con \`sorted()\`:**

\`\`\`python
# sorted() retorna nueva lista ordenada
sorted([3, 1, 2])  # [1, 2, 3]

# key= especifica por qué valor ordenar
sorted(datos, key=lambda x: x["campo"])

# reverse=True para orden descendente
sorted(datos, key=..., reverse=True)
\`\`\``,
      en: `**Sorting with \`sorted()\`:**

\`\`\`python
# sorted() returns new sorted list
sorted([3, 1, 2])  # [1, 2, 3]

# key= specifies what value to sort by
sorted(data, key=lambda x: x["field"])

# reverse=True for descending order
sorted(data, key=..., reverse=True)
\`\`\``,
      pt: `**Ordenar com \`sorted()\`:**

\`\`\`python
# sorted() retorna nova lista ordenada
sorted([3, 1, 2])  # [1, 2, 3]

# key= especifica por qual valor ordenar
sorted(dados, key=lambda x: x["campo"])

# reverse=True para ordem descendente
sorted(dados, key=..., reverse=True)
\`\`\``
    },
    realWorldExample: {
      es: 'Rankings, reportes ordenados, top N.',
      en: 'Rankings, sorted reports, top N.',
      pt: 'Rankings, relatórios ordenados, top N.'
    },
    hint: {
      es: 'Usá sorted() con key=lambda y reverse=True',
      en: 'Use sorted() with key=lambda and reverse=True',
      pt: 'Use sorted() com key=lambda e reverse=True'
    },
    
    starterCode: {
      es: `empleados = [
    {"nombre": "Ana", "salario": 50000},
    {"nombre": "Bob", "salario": 65000},
    {"nombre": "Carlos", "salario": 45000},
    {"nombre": "Diana", "salario": 70000}
]

# Ordená por salario de mayor a menor
ordenados = []

# Tu código aquí

print(ordenados)`,
      en: `empleados = [
    {"nombre": "Ana", "salario": 50000},
    {"nombre": "Bob", "salario": 65000},
    {"nombre": "Carlos", "salario": 45000},
    {"nombre": "Diana", "salario": 70000}
]

# Sort by salary from highest to lowest
ordenados = []

# Your code here

print(ordenados)`,
      pt: `empleados = [
    {"nome": "Ana", "salario": 50000},
    {"nome": "Bob", "salario": 65000},
    {"nome": "Carlos", "salario": 45000},
    {"nome": "Diana", "salario": 70000}
]

# Ordene por salário do maior para o menor
ordenados = []

# Seu código aqui

print(ordenados)`
    },
    solution: `empleados = [
    {"nombre": "Ana", "salario": 50000},
    {"nombre": "Bob", "salario": 65000},
    {"nombre": "Carlos", "salario": 45000},
    {"nombre": "Diana", "salario": 70000}
]

ordenados = sorted(empleados, key=lambda x: x["salario"], reverse=True)

print(ordenados)`,
    testCode: `
# Detectar error común: lista dentro de lista
if isinstance(ordenados, list) and len(ordenados) == 1 and isinstance(ordenados[0], list):
    raise AssertionError("Tenés una lista dentro de otra lista. Probablemente escribiste [sorted(...)] en vez de sorted(...). Sacá los corchetes externos.")
assert isinstance(ordenados, list), "ordenados debería ser una lista"
assert len(ordenados) == 4, f"Deberían ser 4 empleados, hay {len(ordenados)}"
# Usamos índices seguros para evitar error si la lista está vacía
if len(ordenados) > 0:
    assert ordenados[0].get("nombre", "") == "Diana", f"Expected primero Diana (70000), got {ordenados[0].get('nombre')}"
    assert ordenados[1].get("nombre", "") == "Bob", f"Expected segundo Bob (65000), got {ordenados[1].get('nombre')}"
    assert ordenados[3].get("nombre", "") == "Carlos", f"Expected último Carlos (45000), got {ordenados[3].get('nombre')}"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b19',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['zip', 'list', 'basics'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Combinar dos listas',
      en: 'Combine Two Lists',
      pt: 'Combinar Duas Listas'
    },
    description: {
      es: 'Dadas dos listas (nombres y edades), creá una lista de diccionarios combinándolas.',
      en: 'Given two lists (names and ages), create a list of dictionaries combining them.',
      pt: 'Dadas duas listas (nomes e idades), crie uma lista de dicionários combinando-as.'
    },
    theory: {
      es: `**zip() combina iterables:**

\`\`\`python
letras = ["a", "b", "c"]
numeros = [1, 2, 3]

# zip() empareja elementos por posición
list(zip(letras, numeros))  # [("a", 1), ("b", 2), ("c", 3)]

# Iterar con desempaquetado
for letra, num in zip(letras, numeros):
    print(letra, num)
\`\`\`

**⚠️ zip() para en la lista más corta.**`,
      en: `**zip() combines iterables:**

\`\`\`python
letters = ["a", "b", "c"]
numbers = [1, 2, 3]

# zip() pairs elements by position
list(zip(letters, numbers))  # [("a", 1), ("b", 2), ("c", 3)]

# Iterate with unpacking
for letter, num in zip(letters, numbers):
    print(letter, num)
\`\`\`

**⚠️ zip() stops at the shortest list.**`,
      pt: `**zip() combina iteráveis:**

\`\`\`python
letras = ["a", "b", "c"]
numeros = [1, 2, 3]

# zip() emparelha elementos por posição
list(zip(letras, numeros))  # [("a", 1), ("b", 2), ("c", 3)]

# Iterar com desempacotamento
for letra, num in zip(letras, numeros):
    print(letra, num)
\`\`\`

**⚠️ zip() para na lista mais curta.**`
    },
    realWorldExample: {
      es: 'Combinar datos de diferentes fuentes.',
      en: 'Combine data from different sources.',
      pt: 'Combinar dados de diferentes fontes.'
    },
    hint: {
      es: 'Usá zip() para iterar ambas listas juntas',
      en: 'Use zip() to iterate both lists together',
      pt: 'Use zip() para iterar ambas as listas juntas'
    },
    
    starterCode: {
      es: `nombres = ["Ana", "Bob", "Carlos", "Diana"]
edades = [28, 34, 29, 31]

# Creá una lista de diccionarios con nombre y edad
personas = []

# Tu código aquí

print(personas)`,
      en: `nombres = ["Ana", "Bob", "Carlos", "Diana"]
edades = [28, 34, 29, 31]

# Create a list of dictionaries with name and age
personas = []

# Your code here

print(personas)`,
      pt: `nomes = ["Ana", "Bob", "Carlos", "Diana"]
idades = [28, 34, 29, 31]

# Crie uma lista de dicionários com nome e idade
pessoas = []

# Seu código aqui

print(pessoas)`
    },
    solution: `nombres = ["Ana", "Bob", "Carlos", "Diana"]
edades = [28, 34, 29, 31]

personas = [{"nombre": n, "edad": e} for n, e in zip(nombres, edades)]

print(personas)`,
    testCode: `
assert len(personas) == 4, "Should have 4 personas"
if len(personas) > 0:
    assert personas[0].get("nombre") == "Ana", "First name should be Ana"
    assert personas[0].get("edad") == 28, "First age should be 28"
    assert personas[3].get("nombre") == "Diana", "Last name should be Diana"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-b20',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['enumerate', 'loop', 'basics'],
    interviewFrequency: 'high',
    xpReward: 10,
    coinsReward: 5,
    
    title: {
      es: 'Recorrer con posición',
      en: 'Loop with Position',
      pt: 'Percorrer com Posição'
    },
    description: {
      es: 'Imprimí cada producto con su posición en el ranking (empezando en 1).',
      en: 'Print each product with its ranking position (starting at 1).',
      pt: 'Imprima cada produto com sua posição no ranking (começando em 1).'
    },
    theory: {
      es: `**enumerate() da índice + valor:**

\`\`\`python
colores = ["rojo", "verde", "azul"]

for indice, color in enumerate(colores):
    print(indice, color)
# 0 rojo
# 1 verde
# 2 azul
\`\`\`

**Tip:** Usá \`start=N\` para cambiar el índice inicial.`,
      en: `**enumerate() gives index + value:**

\`\`\`python
colors = ["red", "green", "blue"]

for index, color in enumerate(colors):
    print(index, color)
# 0 red
# 1 green
# 2 blue
\`\`\`

**Tip:** Use \`start=N\` to change the starting index.`,
      pt: `**enumerate() dá índice + valor:**

\`\`\`python
cores = ["vermelho", "verde", "azul"]

for indice, cor in enumerate(cores):
    print(indice, cor)
# 0 vermelho
# 1 verde
# 2 azul
\`\`\`

**Dica:** Use \`start=N\` para mudar o índice inicial.`
    },
    realWorldExample: {
      es: 'Rankings, numeración de items, posiciones.',
      en: 'Rankings, item numbering, positions.',
      pt: 'Rankings, numeração de itens, posições.'
    },
    hint: {
      es: 'Usá enumerate(lista, start=1) para empezar desde 1',
      en: 'Use enumerate(lista, start=1) to start from 1',
      pt: 'Use enumerate(lista, start=1) para começar do 1'
    },
    
    starterCode: {
      es: `productos = ["iPhone", "MacBook", "AirPods", "iPad", "Apple Watch"]

# Imprimí cada producto con su posición (1, 2, 3...)
# Formato: "1. iPhone"

# Tu código aquí`,
      en: `productos = ["iPhone", "MacBook", "AirPods", "iPad", "Apple Watch"]

# Print each product with its position (1, 2, 3...)
# Format: "1. iPhone"

# Your code here`,
      pt: `produtos = ["iPhone", "MacBook", "AirPods", "iPad", "Apple Watch"]

# Imprima cada produto com sua posição (1, 2, 3...)
# Formato: "1. iPhone"

# Seu código aqui`
    },
    solution: `productos = ["iPhone", "MacBook", "AirPods", "iPad", "Apple Watch"]

for i, producto in enumerate(productos, start=1):
    print(f"{i}. {producto}")`,
    testCode: `
# El test verifica que se usó enumerate correctamente
import io
import sys
old_stdout = sys.stdout
sys.stdout = io.StringIO()

for i, producto in enumerate(productos, start=1):
    print(f"{i}. {producto}")

output = sys.stdout.getvalue()
sys.stdout = old_stdout

assert "1. iPhone" in output, "Should print '1. iPhone'"
assert "5. Apple Watch" in output, "Should print '5. Apple Watch'"
print("✅ ¡Correcto!")
`,
  },
];

export default PYTHON_BASICS;
