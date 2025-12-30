/**
 * Python Interview Exercises
 * Classic algorithmic challenges
 */

import { PythonExercise } from '../types';

export const PYTHON_INTERVIEW: PythonExercise[] = [
  {
    id: 'py-int1',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'interview',
    tags: ['string', 'slicing', 'easy'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'Invertir string (Slicing)',
      en: 'Reverse String (Slicing)',
      pt: 'Inverter string (Slicing)'
    },
    description: {
      es: 'Invertí un string usando slicing de Python.',
      en: 'Reverse a string using Python slicing.',
      pt: 'Inverta uma string usando slicing do Python.'
    },
    theory: {
      es: `**Slicing Avanzado:**

\`\`\`python
texto = "Python"
# [inicio:fin:paso]
texto[::-1]  # "nohtyP"
\`\`\`

Es la forma más "Pythonic" de invertir secuencias.`,
      en: `**Advanced Slicing:**

\`\`\`python
text = "Python"
# [start:end:step]
text[::-1]  # "nohtyP"
\`\`\`

It's the most "Pythonic" way to reverse sequences.`,
      pt: `**Slicing Avançado:**

\`\`\`python
texto = "Python"
# [inicio:fim:passo]
texto[::-1]  # "nohtyP"
\`\`\`

É a forma mais "Pythonic" de inverter sequências.`
    },
    realWorldExample: {
      es: 'Manipulación de texto rápida, palíndromos.',
      en: 'Fast text manipulation, palindromes.',
      pt: 'Manipulação de texto rápida, palíndromos.'
    },
    hint: {
      es: 'Usá [::-1]',
      en: 'Use [::-1]',
      pt: 'Use [::-1]'
    },
    
    starterCode: {
      es: `def reverse_string(s):
    # Tu código aquí
    pass

print(reverse_string("Entrevista"))`,
      en: `def reverse_string(s):
    # Your code here
    pass

print(reverse_string("Interview"))`,
      pt: `def reverse_string(s):
    # Seu código aqui
    pass

print(reverse_string("Entrevista"))`
    },
    solution: `def reverse_string(s):
    return s[::-1]

print(reverse_string("Entrevista"))`,
    testCode: `
assert reverse_string("hola") == "aloh", "Should return 'aloh'"
assert reverse_string("123") == "321", "Should return '321'"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-int2',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'interview',
    tags: ['counter', 'dict', 'anagram'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Anagramas (Counter)',
      en: 'Anagrams (Counter)',
      pt: 'Anagramas (Counter)'
    },
    description: {
      es: 'Verificá si dos strings son anagramas (tienen las mismas letras en misma cantidad).',
      en: 'Check if two strings are anagrams (have same letters in same quantity).',
      pt: 'Verifique se duas strings são anagramas (têm as mesmas letras na mesma quantidade).'
    },
    theory: {
      es: `**Collections.Counter:**

Cuenta elementos hasheables.

\`\`\`python
from collections import Counter

Counter("abac")  # {'a': 2, 'b': 1, 'c': 1}

# Comparar conteos
Counter(s1) == Counter(s2)
\`\`\``,
      en: `**Collections.Counter:**

Counts hashable elements.

\`\`\`python
from collections import Counter

Counter("abac")  # {'a': 2, 'b': 1, 'c': 1}

# Compare counts
Counter(s1) == Counter(s2)
\`\`\``,
      pt: `**Collections.Counter:**

Conta elementos hasheables.

\`\`\`python
from collections import Counter

Counter("abac")  # {'a': 2, 'b': 1, 'c': 1}

# Comparar contagens
Counter(s1) == Counter(s2)
\`\`\``
    },
    realWorldExample: {
      es: 'Comparar distribuciones de caracteres, validación de datos.',
      en: 'Compare character distributions, data validation.',
      pt: 'Comparar distribuições de caracteres, validação de dados.'
    },
    hint: {
      es: 'Usá Counter(s1) == Counter(s2)',
      en: 'Use Counter(s1) == Counter(s2)',
      pt: 'Use Counter(s1) == Counter(s2)'
    },
    
    starterCode: {
      es: `from collections import Counter

def is_anagram(s1, s2):
    # Tu código aquí
    pass

print(is_anagram("listen", "silent"))  # True`,
      en: `from collections import Counter

def is_anagram(s1, s2):
    # Your code here
    pass

print(is_anagram("listen", "silent"))  # True`,
      pt: `from collections import Counter

def is_anagram(s1, s2):
    # Seu código aqui
    pass

print(is_anagram("listen", "silent"))  # True`
    },
    solution: `from collections import Counter

def is_anagram(s1, s2):
    return Counter(s1) == Counter(s2)

print(is_anagram("listen", "silent"))`,
    testCode: `
assert is_anagram("listen", "silent") == True, "listen/silent are anagrams"
assert is_anagram("hello", "world") == False, "hello/world are NOT anagrams"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-int3',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'interview',
    tags: ['list', 'flatten', 'recursion'],
    interviewFrequency: 'medium',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Lista aplanada (Flatten)',
      en: 'Flatten List',
      pt: 'Lista aplanada (Flatten)'
    },
    description: {
      es: 'Aplaná una lista de listas (solo 1 nivel de profundidad).',
      en: 'Flatten a list of lists (only 1 level deep).',
      pt: 'Aplane uma lista de listas (apenas 1 nível de profundidade).'
    },
    theory: {
      es: `**Flattening Lists:**

\`\`\`python
matriz = [[1, 2], [3, 4]]

# List comprehension doble
[item for sublist in matriz for item in sublist]

# O usar itertools.chain
\`\`\``,
      en: `**Flattening Lists:**

\`\`\`python
matrix = [[1, 2], [3, 4]]

# Double list comprehension
[item for sublist in matrix for item in sublist]

# Or use itertools.chain
\`\`\``,
      pt: `**Flattening Lists:**

\`\`\`python
matriz = [[1, 2], [3, 4]]

# List comprehension duplo
[item for sublist in matriz for item in sublist]

# Ou usar itertools.chain
\`\`\``
    },
    realWorldExample: {
      es: 'Procesar resultados paginados, JSONs anidados.',
      en: 'Process paginated results, nested JSONs.',
      pt: 'Processar resultados paginados, JSONs aninhados.'
    },
    hint: {
      es: 'Usá [item for sublist in l for item in sublist]',
      en: 'Use [item for sublist in l for item in sublist]',
      pt: 'Use [item for sublist in l for item in sublist]'
    },
    
    starterCode: {
      es: `def flatten(lista):
    # Tu código aquí
    pass

print(flatten([[1, 2], [3, 4], [5]]))`,
      en: `def flatten(lista):
    # Your code here
    pass

print(flatten([[1, 2], [3, 4], [5]]))`,
      pt: `def flatten(lista):
    # Seu código aqui
    pass

print(flatten([[1, 2], [3, 4], [5]]))`
    },
    solution: `def flatten(lista):
    return [item for sublist in lista for item in sublist]

print(flatten([[1, 2], [3, 4], [5]]))`,
    testCode: `
assert flatten([[1], [2, 3]]) == [1, 2, 3], "Should flatten"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-int4',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'interview',
    tags: ['recursion', 'fibonacci', 'math'],
    interviewFrequency: 'medium',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Fibonacci (Recursivo)',
      en: 'Fibonacci (Recursive)',
      pt: 'Fibonacci (Recursivo)'
    },
    description: {
      es: 'Implementá la función Fibonacci recursiva.',
      en: 'Implement the recursive Fibonacci function.',
      pt: 'Implemente a função Fibonacci recursiva.'
    },
    theory: {
      es: `**Recursión:**

Una función que se llama a sí misma.

\`\`\`python
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
\`\`\`

**Caso base:** Es crucial para evitar loop infinito.`,
      en: `**Recursion:**

A function that calls itself.

\`\`\`python
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
\`\`\`

**Base case:** Crucial to avoid infinite loop.`,
      pt: `**Recursão:**

Uma função que chama a si mesma.

\`\`\`python
def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)
\`\`\`

**Caso base:** É crucial para evitar loop infinito.`
    },
    realWorldExample: {
      es: 'Algoritmos de árbol, grafos, divide y vencerás.',
      en: 'Tree algorithms, graphs, divide and conquer.',
      pt: 'Algoritmos de árvore, grafos, dividir e conquistar.'
    },
    hint: {
      es: 'Si n <= 1 retorná n, sino fib(n-1) + fib(n-2)',
      en: 'If n <= 1 return n, else fib(n-1) + fib(n-2)',
      pt: 'Se n <= 1 retorne n, senão fib(n-1) + fib(n-2)'
    },
    
    starterCode: {
      es: `def fib(n):
    # Tu código aquí
    pass

print(fib(6))  # 8`,
      en: `def fib(n):
    # Your code here
    pass

print(fib(6))  # 8`,
      pt: `def fib(n):
    # Seu código aqui
    pass

print(fib(6))  # 8`
    },
    solution: `def fib(n):
    if n <= 1: return n
    return fib(n-1) + fib(n-2)

print(fib(6))`,
    testCode: `
assert fib(0) == 0
assert fib(1) == 1
assert fib(6) == 8
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-int5',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'interview',
    tags: ['dict', 'twosum', 'algorithm'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 15,
    
    title: {
      es: 'Two Sum (Diccionarios)',
      en: 'Two Sum (Dictionaries)',
      pt: 'Two Sum (Dicionários)'
    },
    description: {
      es: 'Encontrá los índices de dos números que sumen el objetivo (target) en O(n).',
      en: 'Find the indices of two numbers that add up to the target in O(n).',
      pt: 'Encontre os índices de dois números que somem o objetivo (target) em O(n).'
    },
    theory: {
      es: `**Two Sum en O(n):**

Usamos un diccionario para guardar los valores vistos y sus índices.

\`\`\`python
vistos = {}
for i, num in enumerate(nums):
    complemento = target - num
    if complemento in vistos:
        return [vistos[complemento], i]
    vistos[num] = i
\`\`\``,
      en: `**Two Sum in O(n):**

We use a dictionary to store seen values and their indices.

\`\`\`python
seen = {}
for i, num in enumerate(nums):
    complement = target - num
    if complement in seen:
        return [seen[complement], i]
    seen[num] = i
\`\`\``,
      pt: `**Two Sum em O(n):**

Usamos um dicionário para guardar os valores vistos e seus índices.

\`\`\`python
vistos = {}
for i, num in enumerate(nums):
    complemento = target - num
    if complemento in vistos:
        return [vistos[complemento], i]
    vistos[num] = i
\`\`\``
    },
    realWorldExample: {
      es: 'Optimización de búsquedas, matching, finanzas.',
      en: 'Search optimization, matching, finance.',
      pt: 'Otimização de buscas, matching, finanças.'
    },
    hint: {
      es: 'Guardá num: indice en un diccionario mientras iterás',
      en: 'Store num: index in a dictionary while iterating',
      pt: 'Guarde num: indice em um dicionário enquanto itera'
    },
    
    starterCode: {
      es: `def two_sum(nums, target):
    # Tu código aquí
    pass

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
      en: `def two_sum(nums, target):
    # Your code here
    pass

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`,
      pt: `def two_sum(nums, target):
    # Seu código aqui
    pass

print(two_sum([2, 7, 11, 15], 9))  # [0, 1]`
    },
    solution: `def two_sum(nums, target):
    vistos = {}
    for i, num in enumerate(nums):
        complemento = target - num
        if complemento in vistos:
            return [vistos[complemento], i]
        vistos[num] = i
    return []

print(two_sum([2, 7, 11, 15], 9))`,
    testCode: `
result = two_sum([2, 7, 11, 15], 9)
assert result == [0, 1] or result == [1, 0], "Should return indices [0, 1]"
print("✅ ¡Correcto!")
`,
  },
];

export default PYTHON_INTERVIEW;
