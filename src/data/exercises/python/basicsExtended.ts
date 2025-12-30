/**
 * Python Basics Extended Exercises
 * Intermediate level exercises building on basics
 */

import { PythonExercise } from '../types';

export const PYTHON_BASICS_EXTENDED: PythonExercise[] = [
  // === String Manipulation ===
  {
    id: 'py-basics-x1',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['string', 'manipulation', 'methods'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Manipulación de strings',
      en: 'String Manipulation',
      pt: 'Manipulação de Strings'
    },
    description: {
      es: 'Creá una función que tome un string y retorne un análisis completo: largo, palabras, vocales.',
      en: 'Create a function that takes a string and returns complete analysis: length, words, vowels.',
      pt: 'Crie uma função que pegue uma string e retorne análise completa: comprimento, palavras, vogais.'
    },
    theory: {
      es: `**Análisis de strings con Saurio 🦖:**

Saurio necesita entender textos! Aprendé a manipular strings con:

\`\`\`python
def analyze_string(text: str) -> dict:
    vowels = "aeiouAEIOU"
    return {
        "length": len(text),
        "words": len(text.split()),
        "vowel_count": sum(1 for c in text if c in vowels),
        "uppercase": sum(1 for c in text if c.isupper()),
        "lowercase": sum(1 for c in text if c.islower()),
    }
\`\`\`

**Métodos importantes:**
- \`.split()\` → divide por espacios
- \`.upper()/.lower()\` → mayúscula/minúscula
- \`.count(char)\` → cuenta caracteres
- \`.strip()\` → elimina espacios al inicio/final`,
      en: `**String analysis with Saurio 🦖:**

Saurio needs to understand texts! Learn to manipulate strings with:

\`\`\`python
def analyze_string(text: str) -> dict:
    vowels = "aeiouAEIOU"
    return {
        "length": len(text),
        "words": len(text.split()),
        "vowel_count": sum(1 for c in text if c in vowels),
        "uppercase": sum(1 for c in text if c.isupper()),
        "lowercase": sum(1 for c in text if c.islower()),
    }
\`\`\`

**Important methods:**
- \`.split()\` → divide by spaces
- \`.upper()/.lower()\` → uppercase/lowercase
- \`.count(char)\` → count characters
- \`.strip()\` → remove leading/trailing spaces`,
      pt: `**Análise de strings com Saurio 🦖:**

Saurio precisa entender textos! Aprenda a manipular strings com:

\`\`\`python
def analyze_string(text: str) -> dict:
    vowels = "aeiouAEIOU"
    return {
        "length": len(text),
        "words": len(text.split()),
        "vowel_count": sum(1 for c in text if c in vowels),
        "uppercase": sum(1 for c in text if c.isupper()),
        "lowercase": sum(1 for c in text if c.islower()),
    }
\`\`\`

**Métodos importantes:**
- \`.split()\` → divide por espaços
- \`.upper()/.lower()\` → maiúscula/minúscula
- \`.count(char)\` → contar caracteres
- \`.strip()\` → remover espaços iniciais/finais`
    },
    realWorldExample: {
      es: 'Saurio analiza comentarios de usuarios para moderar contenido.',
      en: 'Saurio analyzes user comments to moderate content.',
      pt: 'Saurio analisa comentários de usuários para moderar conteúdo.'
    },
    hint: {
      es: 'Usá list comprehension para contar vocales y caracteres especiales',
      en: 'Use list comprehension to count vowels and special characters',
      pt: 'Use list comprehension para contar vogais e caracteres especiais'
    },
    
    starterCode: {
      es: `def analyze_string(text: str) -> dict:
    """
    Analiza un string completo.
    
    Returns:
        Dict con: length, words, vowel_count, uppercase, lowercase
    """
    # Tu código acá
    pass`,
      en: `def analyze_string(text: str) -> dict:
    """
    Analyze a complete string.
    
    Returns:
        Dict with: length, words, vowel_count, uppercase, lowercase
    """
    # Your code here
    pass`,
      pt: `def analyze_string(text: str) -> dict:
    """
    Analisa uma string completa.
    
    Returns:
        Dict com: length, words, vowel_count, uppercase, lowercase
    """
    # Seu código aqui
    pass`
    },
    solution: `def analyze_string(text: str) -> dict:
    vowels = "aeiouAEIOU"
    return {
        "length": len(text),
        "words": len(text.split()),
        "vowel_count": sum(1 for c in text if c in vowels),
        "uppercase": sum(1 for c in text if c.isupper()),
        "lowercase": sum(1 for c in text if c.islower()),
    }`,
    testCode: `
result = analyze_string("Hello World")
assert result["length"] == 11, f"length should be 11, got {result['length']}"
assert result["words"] == 2, f"words should be 2, got {result['words']}"
assert result["vowel_count"] == 3, f"vowel_count should be 3 (e,o,o), got {result['vowel_count']}"
assert result["uppercase"] == 2, f"uppercase should be 2 (H,W), got {result['uppercase']}"
assert result["lowercase"] == 8, f"lowercase should be 8 (e,l,l,o,o,r,l,d), got {result['lowercase']}"

result2 = analyze_string("Python 3")
assert result2["vowel_count"] == 1, f"vowel_count should be 1 (o), got {result2['vowel_count']}"
assert result2["uppercase"] == 1, f"uppercase should be 1 (P), got {result2['uppercase']}"

print("✅ Correct!")
`,
  },
  // === FizzBuzz clásico ===
  {
    id: 'py-basics-x2',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['loops', 'conditionals', 'modulo'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'FizzBuzz - Ejercicio clásico',
      en: 'FizzBuzz - Classic Exercise',
      pt: 'FizzBuzz - Exercício Clássico'
    },
    description: {
      es: 'Implementá el clásico FizzBuzz: retorná "Fizz" si es divisible por 3, "Buzz" por 5, "FizzBuzz" por 15, sino el número.',
      en: 'Implement classic FizzBuzz: return "Fizz" if divisible by 3, "Buzz" by 5, "FizzBuzz" by 15, else number.',
      pt: 'Implemente o clássico FizzBuzz: retorne "Fizz" se divisível por 3, "Buzz" por 5, "FizzBuzz" por 15, senão o número.'
    },
    theory: {
      es: `**FizzBuzz - Primera entrevista de todos 🦖:**

Saurio aprendió esto en su primer entrevista técnica!

\`\`\`python
def fizzbuzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result
\`\`\`

**Tip importante:** Verificar múltiplo de 15 ANTES que 3 y 5 (orden importa!)`,
      en: `**FizzBuzz - Everyone's first interview 🦖:**

Saurio learned this in his first technical interview!

\`\`\`python
def fizzbuzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result
\`\`\`

**Important tip:** Check multiple of 15 BEFORE 3 and 5 (order matters!)`,
      pt: `**FizzBuzz - Primeira entrevista de todos 🦖:**

Saurio aprendeu isso em sua primeira entrevista técnica!

\`\`\`python
def fizzbuzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result
\`\`\`

**Dica importante:** Verificar múltiplo de 15 ANTES que 3 e 5 (ordem importa!)`
    },
    realWorldExample: {
      es: 'Patrón para cualquier problema que requiera lógica condicional.',
      en: 'Pattern for any problem requiring conditional logic.',
      pt: 'Padrão para qualquer problema que exija lógica condicional.'
    },
    hint: {
      es: 'Verificá múltiplos con % (módulo). Orden: 15 → 3 → 5 → número',
      en: 'Check multiples with % (modulo). Order: 15 → 3 → 5 → number',
      pt: 'Verifique múltiplos com % (módulo). Ordem: 15 → 3 → 5 → número'
    },
    
    starterCode: {
      es: `def fizzbuzz(n: int) -> list[str]:
    """
    Retorna lista FizzBuzz de 1 a n.
    
    Returns:
        ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", ...]
    """
    # Tu código acá
    pass`,
      en: `def fizzbuzz(n: int) -> list[str]:
    """
    Returns FizzBuzz list from 1 to n.
    
    Returns:
        ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", ...]
    """
    # Your code here
    pass`,
      pt: `def fizzbuzz(n: int) -> list[str]:
    """
    Retorna lista FizzBuzz de 1 a n.
    
    Returns:
        ["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", ...]
    """
    # Seu código aqui
    pass`
    },
    solution: `def fizzbuzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result`,
    testCode: `
result = fizzbuzz(15)
assert result[0] == "1"
assert result[2] == "Fizz"  # 3
assert result[4] == "Buzz"  # 5
assert result[14] == "FizzBuzz"  # 15
assert len(result) == 15

result2 = fizzbuzz(5)
assert result2 == ["1", "2", "Fizz", "4", "Buzz"]

print("✅ Todos los tests pasaron!")
`,
  },
  // === Filter List ===
  {
    id: 'py-basics-x3',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['list', 'filter', 'comprehension'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Filtrar lista de números',
      en: 'Filter List of Numbers',
      pt: 'Filtrar Lista de Números'
    },
    description: {
      es: 'Creá una función que filtre números pares de una lista.',
      en: 'Create a function that filters even numbers from a list.',
      pt: 'Crie uma função que filtre números pares de uma lista.'
    },
    theory: {
      es: `**Filtrar con list comprehension:**

\`\`\`python
def filter_even(numbers: list[int]) -> list[int]:
    return [n for n in numbers if n % 2 == 0]

# También funciona con filter()
def filter_even(numbers: list[int]) -> list[int]:
    return list(filter(lambda x: x % 2 == 0, numbers))
\`\`\`

**Saurio prefiere list comprehension** porque es más legible y eficiente.`,
      en: `**Filter with list comprehension:**

\`\`\`python
def filter_even(numbers: list[int]) -> list[int]:
    return [n for n in numbers if n % 2 == 0]

# Also works with filter()
def filter_even(numbers: list[int]) -> list[int]:
    return list(filter(lambda x: x % 2 == 0, numbers))
\`\`\`

**Saurio prefers list comprehension** because it's more readable and efficient.`,
      pt: `**Filtrar com list comprehension:**

\`\`\`python
def filter_even(numbers: list[int]) -> list[int]:
    return [n for n in numbers if n % 2 == 0]

# Também funciona com filter()
def filter_even(numbers: list[int]) -> list[int]:
    return list(filter(lambda x: x % 2 == 0, numbers))
\`\`\`

**Saurio prefere list comprehension** porque é mais legível e eficiente.`
    },
    realWorldExample: {
      es: 'Filtrar datos en pipelines, validaciones de input.',
      en: 'Filter data in pipelines, input validations.',
      pt: 'Filtrar dados em pipelines, validações de entrada.'
    },
    hint: {
      es: 'Usá list comprehension: [n for n in numeros if n % 2 == 0]',
      en: 'Use list comprehension: [n for n in numbers if n % 2 == 0]',
      pt: 'Use list comprehension: [n for n in numeros if n % 2 == 0]'
    },
    
    starterCode: {
      es: `def filter_even(numbers: list[int]) -> list[int]:
    """
    Filtra números pares de una lista.
    
    Args:
        numbers: Lista de números
        
    Returns:
        Lista con solo números pares
    """
    # Tu código acá
    pass`,
      en: `def filter_even(numbers: list[int]) -> list[int]:
    """
    Filter even numbers from a list.
    
    Args:
        numbers: List of numbers
        
    Returns:
        List with only even numbers
    """
    # Your code here
    pass`,
      pt: `def filter_even(numbers: list[int]) -> list[int]:
    """
    Filtra números pares de uma lista.
    
    Args:
        numbers: Lista de números
        
    Returns:
        Lista com apenas números pares
    """
    # Seu código aqui
    pass`
    },
    solution: `def filter_even(numbers: list[int]) -> list[int]:
    return [n for n in numbers if n % 2 == 0]`,
    testCode: `
assert filter_even([1, 2, 3, 4, 5, 6]) == [2, 4, 6]
assert filter_even([1, 3, 5]) == []
assert filter_even([2, 4, 6, 8]) == [2, 4, 6, 8]
assert filter_even([]) == []

print("✅ Todos los tests pasaron!")
`,
  },
  // === Reverse String ===
  {
    id: 'py-basics-x4',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['string', 'slicing', 'palindrome'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Invertir string y detectar palíndromos',
      en: 'Reverse String and Detect Palindromes',
      pt: 'Invertir String e Detectar Palíndromos'
    },
    description: {
      es: 'Creá una función que invierta un string y detecte si es palíndromo (se lee igual al revés).',
      en: 'Create a function that reverses a string and detects if it\'s a palindrome (reads same backwards).',
      pt: 'Crie uma função que inverta uma string e detecte se é palíndromo (lê-se igual ao contrário).'
    },
    theory: {
      es: `**Invertir strings con slicing:**

\`\`\`python
def is_palindrome(s: str) -> bool:
    # Remover espacios y minúsculas
    clean = s.replace(" ", "").lower()
    # Comparar con versión invertida
    return clean == clean[::-1]

# Ejemplo:
is_palindrome("racecar")  # True
is_palindrome("hello")     # False
is_palindrome("A man a plan a canal Panama")  # True
\`\`\`

**Truco:** \`[::-1]\` invierte una secuencia (string, list, tuple)`,
      en: `**Reverse strings with slicing:**

\`\`\`python
def is_palindrome(s: str) -> bool:
    # Remove spaces and lowercase
    clean = s.replace(" ", "").lower()
    # Compare with reversed version
    return clean == clean[::-1]

# Example:
is_palindrome("racecar")  # True
is_palindrome("hello")     # False
is_palindrome("A man a plan a canal Panama")  # True
\`\`\`

**Trick:** \`[::-1]\` reverses any sequence (string, list, tuple)`,
      pt: `**Inverter strings com slicing:**

\`\`\`python
def is_palindrome(s: str) -> bool:
    # Remover espaços e minúsculas
    clean = s.replace(" ", "").lower()
    # Comparar com versão invertida
    return clean == clean[::-1]

# Exemplo:
is_palindrome("racecar")  # True
is_palindrome("hello")     # False
is_palindrome("A man a plan a canal Panama")  # True
\`\`\`

**Truque:** \`[::-1]\` inverte qualquer sequência (string, list, tuple)`
    },
    realWorldExample: {
      es: 'Validación de datos, búsqueda de patrones.',
      en: 'Data validation, pattern finding.',
      pt: 'Validação de dados, busca de padrões.'
    },
    hint: {
      es: 'Usá [::-1] para invertir. Limpia espacios y mayúsculas.',
      en: 'Use [::-1] to reverse. Clean spaces and uppercase.',
      pt: 'Use [::-1] para inverter. Limpe espaços e maiúsculas.'
    },
    
    starterCode: {
      es: `def is_palindrome(s: str) -> bool:
    """
    Detecta si un string es palíndromo.
    
    Args:
        s: String a verificar
        
    Returns:
        True si es palíndromo, False sino
    """
    # Tu código acá
    pass`,
      en: `def is_palindrome(s: str) -> bool:
    """
    Detect if a string is a palindrome.
    
    Args:
        s: String to check
        
    Returns:
        True if palindrome, False otherwise
    """
    # Your code here
    pass`,
      pt: `def is_palindrome(s: str) -> bool:
    """
    Detecta se uma string é palíndromo.
    
    Args:
        s: String a verificar
        
    Returns:
        True se palíndromo, False caso contrário
    """
    # Seu código aqui
    pass`
    },
    solution: `def is_palindrome(s: str) -> bool:
    clean = s.replace(" ", "").lower()
    return clean == clean[::-1]`,
    testCode: `
assert is_palindrome("racecar") == True
assert is_palindrome("hello") == False
assert is_palindrome("A man a plan a canal Panama") == True
assert is_palindrome("civic") == True
assert is_palindrome("python") == False

print("✅ Todos los tests pasaron!")
`,
  },
  // === Find Max/Min ===
  {
    id: 'py-basics-x5',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['max', 'min', 'comparison'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Encontrar máximo y mínimo',
      en: 'Find Maximum and Minimum',
      pt: 'Encontrar Máximo e Mínimo'
    },
    description: {
      es: 'Creá una función que encuentre el máximo y mínimo de una lista sin usar max() ni min().',
      en: 'Create a function that finds max and min from a list without using max() or min().',
      pt: 'Crie uma função que encontre máx e mín de uma lista sem usar max() ou min().'
    },
    theory: {
      es: `**Encontrar máx/mín manualmente:**

\`\`\`python
def find_max_min(numbers: list[int]) -> tuple[int, int]:
    if not numbers:
        return None, None
    
    max_val = numbers[0]
    min_val = numbers[0]
    
    for num in numbers[1:]:
        if num > max_val:
            max_val = num
        if num < min_val:
            min_val = num
    
    return max_val, min_val

# Alternativa con max/min (más simple):
def find_max_min(numbers: list[int]) -> tuple[int, int]:
    return max(numbers), min(numbers)
\`\`\`

**Saurio entiende ambas** - la manual es para entrevistas, la funcional es para producción.`,
      en: `**Find max/min manually:**

\`\`\`python
def find_max_min(numbers: list[int]) -> tuple[int, int]:
    if not numbers:
        return None, None
    
    max_val = numbers[0]
    min_val = numbers[0]
    
    for num in numbers[1:]:
        if num > max_val:
            max_val = num
        if num < min_val:
            min_val = num
    
    return max_val, min_val

# Alternative with max/min (simpler):
def find_max_min(numbers: list[int]) -> tuple[int, int]:
    return max(numbers), min(numbers)
\`\`\`

**Saurio understands both** - manual is for interviews, functional is for production.`,
      pt: `**Encontrar máx/mín manualmente:**

\`\`\`python
def find_max_min(numbers: list[int]) -> tuple[int, int]:
    if not numbers:
        return None, None
    
    max_val = numbers[0]
    min_val = numbers[0]
    
    for num in numbers[1:]:
        if num > max_val:
            max_val = num
        if num < min_val:
            min_val = num
    
    return max_val, min_val

# Alternativa com max/min (mais simples):
def find_max_min(numbers: list[int]) -> tuple[int, int]:
    return max(numbers), min(numbers)
\`\`\`

**Saurio entende ambas** - manual é para entrevistas, funcional é para produção.`
    },
    realWorldExample: {
      es: 'Encontrar outliers, extremos en datos.',
      en: 'Find outliers, extremes in data.',
      pt: 'Encontrar outliers, extremos em dados.'
    },
    hint: {
      es: 'Inicializá max/min con el primer elemento, luego iterá comparando',
      en: 'Initialize max/min with first element, then iterate comparing',
      pt: 'Inicialize máx/mín com o primeiro elemento, depois itere comparando'
    },
    
    starterCode: {
      es: `def find_max_min(numbers: list[int]) -> tuple[int, int]:
    """
    Encuentra máximo y mínimo sin usar max/min.
    
    Returns:
        Tupla (máximo, mínimo)
    """
    # Tu código acá
    pass`,
      en: `def find_max_min(numbers: list[int]) -> tuple[int, int]:
    """
    Find max and min without using max/min.
    
    Returns:
        Tuple (maximum, minimum)
    """
    # Your code here
    pass`,
      pt: `def find_max_min(numbers: list[int]) -> tuple[int, int]:
    """
    Encontra máx e mín sem usar max/min.
    
    Returns:
        Tupla (máximo, mínimo)
    """
    # Seu código aqui
    pass`
    },
    solution: `def find_max_min(numbers: list[int]) -> tuple[int, int]:
    if not numbers:
        return None, None
    max_val = numbers[0]
    min_val = numbers[0]
    for num in numbers[1:]:
        if num > max_val:
            max_val = num
        if num < min_val:
            min_val = num
    return max_val, min_val`,
    testCode: `
assert find_max_min([3, 1, 4, 1, 5, 9]) == (9, 1)
assert find_max_min([42]) == (42, 42)
assert find_max_min([-5, -2, -10, -1]) == (-1, -10)
assert find_max_min([0, 0, 0]) == (0, 0)

print("✅ Todos los tests pasaron!")
`,
  },
  // === Sum and Average ===
  {
    id: 'py-basics-x6',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['sum', 'average', 'statistics'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Calcular suma y promedio',
      en: 'Calculate Sum and Average',
      pt: 'Calcular Soma e Média'
    },
    description: {
      es: 'Creá una función que calcule suma, promedio, y varianza de una lista de números.',
      en: 'Create a function that calculates sum, average, and variance of a list of numbers.',
      pt: 'Crie uma função que calcule soma, média e variância de uma lista de números.'
    },
    theory: {
      es: `**Estadísticas básicas:**

\`\`\`python
def calculate_stats(numbers: list[float]) -> dict:
    if not numbers:
        return {"sum": 0, "avg": 0, "variance": 0}
    
    total = sum(numbers)
    avg = total / len(numbers)
    variance = sum((x - avg) ** 2 for x in numbers) / len(numbers)
    
    return {
        "sum": total,
        "avg": avg,
        "count": len(numbers),
        "variance": variance
    }
\`\`\`

**Fórmulas:**
- Suma: Σ x
- Promedio: Σ x / n
- Varianza: Σ (x - avg)² / n`,
      en: `**Basic statistics:**

\`\`\`python
def calculate_stats(numbers: list[float]) -> dict:
    if not numbers:
        return {"sum": 0, "avg": 0, "variance": 0}
    
    total = sum(numbers)
    avg = total / len(numbers)
    variance = sum((x - avg) ** 2 for x in numbers) / len(numbers)
    
    return {
        "sum": total,
        "avg": avg,
        "count": len(numbers),
        "variance": variance
    }
\`\`\`

**Formulas:**
- Sum: Σ x
- Average: Σ x / n
- Variance: Σ (x - avg)² / n`,
      pt: `**Estatísticas básicas:**

\`\`\`python
def calculate_stats(numbers: list[float]) -> dict:
    if not numbers:
        return {"sum": 0, "avg": 0, "variance": 0}
    
    total = sum(numbers)
    avg = total / len(numbers)
    variance = sum((x - avg) ** 2 for x in numbers) / len(numbers)
    
    return {
        "sum": total,
        "avg": avg,
        "count": len(numbers),
        "variance": variance
    }
\`\`\`

**Fórmulas:**
- Soma: Σ x
- Média: Σ x / n
- Variância: Σ (x - avg)² / n`
    },
    realWorldExample: {
      es: 'Saurio calcula promedios de calificaciones, analiza datos de sensores.',
      en: 'Saurio calculates grade averages, analyzes sensor data.',
      pt: 'Saurio calcula médias de notas, analisa dados de sensores.'
    },
    hint: {
      es: 'Usá sum() para la suma. Para varianza: sum((x-avg)**2)/len()',
      en: 'Use sum() for total. For variance: sum((x-avg)**2)/len()',
      pt: 'Use sum() para a soma. Para variância: sum((x-avg)**2)/len()'
    },
    
    starterCode: {
      es: `def calculate_stats(numbers: list[float]) -> dict:
    """
    Calcula estadísticas básicas.
    
    Returns:
        Dict con sum, avg, count, variance
    """
    # Tu código acá
    pass`,
      en: `def calculate_stats(numbers: list[float]) -> dict:
    """
    Calculate basic statistics.
    
    Returns:
        Dict with sum, avg, count, variance
    """
    # Your code here
    pass`,
      pt: `def calculate_stats(numbers: list[float]) -> dict:
    """
    Calcula estatísticas básicas.
    
    Returns:
        Dict com sum, avg, count, variance
    """
    # Seu código aqui
    pass`
    },
    solution: `def calculate_stats(numbers: list[float]) -> dict:
    if not numbers:
        return {"sum": 0, "avg": 0, "count": 0, "variance": 0}
    total = sum(numbers)
    avg = total / len(numbers)
    variance = sum((x - avg) ** 2 for x in numbers) / len(numbers)
    return {"sum": total, "avg": avg, "count": len(numbers), "variance": variance}`,
    testCode: `
result = calculate_stats([1, 2, 3, 4, 5])
assert result["sum"] == 15
assert result["avg"] == 3
assert result["count"] == 5

result2 = calculate_stats([10, 20])
assert result2["sum"] == 30
assert result2["avg"] == 15

print("✅ Todos los tests pasaron!")
`,
  },
  // === Remove Duplicates ===
  {
    id: 'py-basics-x7',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['set', 'unique', 'dedup'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Eliminar duplicados de lista',
      en: 'Remove Duplicates from List',
      pt: 'Remover Duplicados de Lista'
    },
    description: {
      es: 'Creá una función que elimine duplicados manteniendo el orden original.',
      en: 'Create a function that removes duplicates while preserving original order.',
      pt: 'Crie uma função que remova duplicados mantendo a ordem original.'
    },
    theory: {
      es: `**Remover duplicados preservando orden:**

\`\`\`python
def remove_duplicates(items: list) -> list:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

# Alternativa corta (Python 3.7+):
def remove_duplicates(items: list) -> list:
    return list(dict.fromkeys(items))

# ⚠️ Esto NO preserva orden:
# list(set(items))
\`\`\`

**¿Por qué set no funciona?**
- Los sets no tienen orden garantizado
- En Python 3.7+ dicts sí preservan orden`,
      en: `**Remove duplicates preserving order:**

\`\`\`python
def remove_duplicates(items: list) -> list:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

# Short alternative (Python 3.7+):
def remove_duplicates(items: list) -> list:
    return list(dict.fromkeys(items))

# ⚠️ This doesn't preserve order:
# list(set(items))
\`\`\`

**Why doesn't set work?**
- Sets have no guaranteed order
- In Python 3.7+ dicts preserve order`,
      pt: `**Remover duplicados preservando ordem:**

\`\`\`python
def remove_duplicates(items: list) -> list:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result

# Alternativa curta (Python 3.7+):
def remove_duplicates(items: list) -> list:
    return list(dict.fromkeys(items))

# ⚠️ Isto não preserva ordem:
# list(set(items))
\`\`\`

**Por que set não funciona?**
- Sets não têm ordem garantida
- Em Python 3.7+ dicts preservam ordem`
    },
    realWorldExample: {
      es: 'Limpieza de datos, deduplicación de registros.',
      en: 'Data cleaning, record deduplication.',
      pt: 'Limpeza de dados, deduplicação de registros.'
    },
    hint: {
      es: 'Usá un set para tracking O(1) y una lista para preservar orden',
      en: 'Use a set for O(1) tracking and a list to preserve order',
      pt: 'Use um set para rastreamento O(1) e uma lista para preservar ordem'
    },
    
    starterCode: {
      es: `def remove_duplicates(items: list) -> list:
    """
    Elimina duplicados preservando orden.
    
    Args:
        items: Lista con posibles duplicados
        
    Returns:
        Lista sin duplicados, mismo orden
    """
    # Tu código acá
    pass`,
      en: `def remove_duplicates(items: list) -> list:
    """
    Remove duplicates preserving order.
    
    Args:
        items: List with possible duplicates
        
    Returns:
        List without duplicates, same order
    """
    # Your code here
    pass`,
      pt: `def remove_duplicates(items: list) -> list:
    """
    Remove duplicados preservando ordem.
    
    Args:
        items: Lista com possíveis duplicados
        
    Returns:
        Lista sem duplicados, mesma ordem
    """
    # Seu código aqui
    pass`
    },
    solution: `def remove_duplicates(items: list) -> list:
    seen = set()
    result = []
    for item in items:
        if item not in seen:
            seen.add(item)
            result.append(item)
    return result`,
    testCode: `
assert remove_duplicates([1, 2, 2, 3, 1, 4]) == [1, 2, 3, 4]
assert remove_duplicates(["a", "b", "a", "c"]) == ["a", "b", "c"]
assert remove_duplicates([1, 1, 1]) == [1]
assert remove_duplicates([]) == []

print("✅ Todos los tests pasaron!")
`,
  },
  // === Sort Dictionaries ===
  {
    id: 'py-basics-x8',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'basics',
    tags: ['sort', 'lambda', 'sorted'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Ordenar lista de diccionarios',
      en: 'Sort List of Dictionaries',
      pt: 'Ordenar Lista de Dicionários'
    },
    description: {
      es: 'Creá una función que ordene una lista de diccionarios por un campo específico.',
      en: 'Create a function that sorts a list of dictionaries by a specific field.',
      pt: 'Crie uma função que ordene uma lista de dicionários por um campo específico.'
    },
    theory: {
      es: `**Ordenar con sorted() y lambda:**

\`\`\`python
def sort_by_field(records: list[dict], field: str, reverse: bool = False) -> list[dict]:
    return sorted(records, key=lambda r: r[field], reverse=reverse)

# Ejemplos:
users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Carlos", "age": 35},
]

# Ordenar por edad (ascendente)
sorted_by_age = sorted(users, key=lambda u: u["age"])

# Ordenar por nombre (descendente)
sorted_by_name = sorted(users, key=lambda u: u["name"], reverse=True)
\`\`\`

**Tip:** \`lambda r: r[field]\` es una función anónima que retorna el valor del campo.`,
      en: `**Sort with sorted() and lambda:**

\`\`\`python
def sort_by_field(records: list[dict], field: str, reverse: bool = False) -> list[dict]:
    return sorted(records, key=lambda r: r[field], reverse=reverse)

# Examples:
users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Carlos", "age": 35},
]

# Sort by age (ascending)
sorted_by_age = sorted(users, key=lambda u: u["age"])

# Sort by name (descending)
sorted_by_name = sorted(users, key=lambda u: u["name"], reverse=True)
\`\`\`

**Tip:** \`lambda r: r[field]\` is an anonymous function that returns the field value.`,
      pt: `**Ordenar com sorted() e lambda:**

\`\`\`python
def sort_by_field(records: list[dict], field: str, reverse: bool = False) -> list[dict]:
    return sorted(records, key=lambda r: r[field], reverse=reverse)

# Exemplos:
users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Carlos", "age": 35},
]

# Ordenar por idade (ascendente)
sorted_by_age = sorted(users, key=lambda u: u["age"])

# Ordenar por nome (descendente)
sorted_by_name = sorted(users, key=lambda u: u["name"], reverse=True)
\`\`\`

**Dica:** \`lambda r: r[field]\` é uma função anônima que retorna o valor do campo.`
    },
    realWorldExample: {
      es: 'Ordenar resultados de búsqueda, ranking de usuarios.',
      en: 'Sort search results, user rankings.',
      pt: 'Ordenar resultados de busca, ranking de usuários.'
    },
    hint: {
      es: 'Usá sorted() con key=lambda r: r[field]',
      en: 'Use sorted() with key=lambda r: r[field]',
      pt: 'Use sorted() com key=lambda r: r[field]'
    },
    
    starterCode: {
      es: `def sort_by_field(records: list[dict], field: str, reverse: bool = False) -> list[dict]:
    """
    Ordena lista de diccionarios por un campo.
    
    Args:
        records: Lista de diccionarios
        field: Campo por el cual ordenar
        reverse: Si True, orden descendente
        
    Returns:
        Lista ordenada
    """
    # Tu código acá
    pass`,
      en: `def sort_by_field(records: list[dict], field: str, reverse: bool = False) -> list[dict]:
    """
    Sort list of dictionaries by a field.
    
    Args:
        records: List of dictionaries
        field: Field to sort by
        reverse: If True, descending order
        
    Returns:
        Sorted list
    """
    # Your code here
    pass`,
      pt: `def sort_by_field(records: list[dict], field: str, reverse: bool = False) -> list[dict]:
    """
    Ordena lista de dicionários por um campo.
    
    Args:
        records: Lista de dicionários
        field: Campo para ordenar
        reverse: Se True, ordem descendente
        
    Returns:
        Lista ordenada
    """
    # Seu código aqui
    pass`
    },
    solution: `def sort_by_field(records: list[dict], field: str, reverse: bool = False) -> list[dict]:
    return sorted(records, key=lambda r: r[field], reverse=reverse)`,
    testCode: `
users = [
    {"name": "Alice", "age": 30},
    {"name": "Bob", "age": 25},
    {"name": "Carlos", "age": 35},
]

result = sort_by_field(users, "age")
assert result[0]["name"] == "Bob"      # 25
assert result[1]["name"] == "Alice"    # 30
assert result[2]["name"] == "Carlos"   # 35

result_desc = sort_by_field(users, "age", reverse=True)
assert result_desc[0]["name"] == "Carlos"  # 35

print("✅ Todos los tests pasaron!")
`,
  },
  // === Zip Lists ===
  {
    id: 'py-basics-x9',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'basics',
    tags: ['zip', 'combine', 'tuples'],
    interviewFrequency: 'medium',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Combinar listas con zip()',
      en: 'Combine Lists with zip()',
      pt: 'Combinar Listas com zip()'
    },
    description: {
      es: 'Creá una función que combine nombres y edades usando zip() y devuelva diccionarios.',
      en: 'Create a function that combines names and ages using zip() and returns dictionaries.',
      pt: 'Crie uma função que combine nomes e idades usando zip() e retorne dicionários.'
    },
    theory: {
      es: `**zip() para combinar secuencias:**

\`\`\`python
def combine_lists(names: list[str], ages: list[int]) -> list[dict]:
    return [{"name": n, "age": a} for n, a in zip(names, ages)]

# Ejemplo:
names = ["Alice", "Bob", "Carlos"]
ages = [30, 25, 35]

result = combine_lists(names, ages)
# [
#   {"name": "Alice", "age": 30},
#   {"name": "Bob", "age": 25},
#   {"name": "Carlos", "age": 35}
# ]
\`\`\`

**zip() se detiene en la lista más corta:**
\`\`\`python
list(zip([1, 2, 3], ["a", "b"]))  # [(1, 'a'), (2, 'b')]
\`\`\``,
      en: `**zip() to combine sequences:**

\`\`\`python
def combine_lists(names: list[str], ages: list[int]) -> list[dict]:
    return [{"name": n, "age": a} for n, a in zip(names, ages)]

# Example:
names = ["Alice", "Bob", "Carlos"]
ages = [30, 25, 35]

result = combine_lists(names, ages)
# [
#   {"name": "Alice", "age": 30},
#   {"name": "Bob", "age": 25},
#   {"name": "Carlos", "age": 35}
# ]
\`\`\`

**zip() stops at shortest list:**
\`\`\`python
list(zip([1, 2, 3], ["a", "b"]))  # [(1, 'a'), (2, 'b')]
\`\`\``,
      pt: `**zip() para combinar sequências:**

\`\`\`python
def combine_lists(names: list[str], ages: list[int]) -> list[dict]:
    return [{"name": n, "age": a} for n, a in zip(names, ages)]

# Exemplo:
names = ["Alice", "Bob", "Carlos"]
ages = [30, 25, 35]

result = combine_lists(names, ages)
# [
#   {"name": "Alice", "age": 30},
#   {"name": "Bob", "age": 25},
#   {"name": "Carlos", "age": 35}
# ]
\`\`\`

**zip() para na lista mais curta:**
\`\`\`python
list(zip([1, 2, 3], ["a", "b"]))  # [(1, 'a'), (2, 'b')]
\`\`\``
    },
    realWorldExample: {
      es: 'Saurio empareja estudiantes con calificaciones, combina datos de múltiples fuentes.',
      en: 'Saurio pairs students with grades, combines data from multiple sources.',
      pt: 'Saurio empareja estudantes com notas, combina dados de múltiplas fontes.'
    },
    hint: {
      es: 'Usá zip() con list comprehension para crear dicts',
      en: 'Use zip() with list comprehension to create dicts',
      pt: 'Use zip() com list comprehension para criar dicts'
    },
    
    starterCode: {
      es: `def combine_lists(names: list[str], ages: list[int]) -> list[dict]:
    """
    Combina dos listas en una lista de diccionarios.
    
    Args:
        names: Lista de nombres
        ages: Lista de edades
        
    Returns:
        Lista de dicts {name, age}
    """
    # Tu código acá
    pass`,
      en: `def combine_lists(names: list[str], ages: list[int]) -> list[dict]:
    """
    Combine two lists into a list of dictionaries.
    
    Args:
        names: List of names
        ages: List of ages
        
    Returns:
        List of dicts {name, age}
    """
    # Your code here
    pass`,
      pt: `def combine_lists(names: list[str], ages: list[int]) -> list[dict]:
    """
    Combina duas listas em uma lista de dicionários.
    
    Args:
        names: Lista de nomes
        ages: Lista de idades
        
    Returns:
        Lista de dicts {name, age}
    """
    # Seu código aqui
    pass`
    },
    solution: `def combine_lists(names: list[str], ages: list[int]) -> list[dict]:
    return [{"name": n, "age": a} for n, a in zip(names, ages)]`,
    testCode: `
result = combine_lists(["Alice", "Bob"], [30, 25])
assert len(result) == 2
assert result[0] == {"name": "Alice", "age": 30}
assert result[1] == {"name": "Bob", "age": 25}

# zip se detiene en la más corta
result2 = combine_lists(["Alice", "Bob", "Carlos"], [30, 25])
assert len(result2) == 2

print("✅ Todos los tests pasaron!")
`,
  },
  // === Loop with Position (enumerate) ===
  {
    id: 'py-basics-x10',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'basics',
    tags: ['enumerate', 'index', 'loop'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Loop con posición usando enumerate()',
      en: 'Loop with Position using enumerate()',
      pt: 'Loop com Posição usando enumerate()'
    },
    description: {
      es: 'Creá una función que agregue índices a cada elemento y retorne la posición del máximo.',
      en: 'Create a function that adds indices to each element and returns the position of maximum.',
      pt: 'Crie uma função que adicione índices a cada elemento e retorne a posição do máximo.'
    },
    theory: {
      es: `**enumerate() para obtener índice y valor:**

\`\`\`python
def find_max_index(numbers: list[int]) -> tuple[int, int]:
    max_val = numbers[0]
    max_idx = 0
    
    for i, num in enumerate(numbers):
        if num > max_val:
            max_val = num
            max_idx = i
    
    return max_idx, max_val

# Ejemplo:
numbers = [10, 20, 15, 30, 5]
idx, val = find_max_index(numbers)
# idx = 3, val = 30
\`\`\`

**Sin enumerate():**
\`\`\`python
for i in range(len(numbers)):
    # números[i]
\`\`\`

**Con enumerate() (mejor):**
\`\`\`python
for i, item in enumerate(numbers):
    # usa i e item directamente
\`\`\``,
      en: `**enumerate() to get index and value:**

\`\`\`python
def find_max_index(numbers: list[int]) -> tuple[int, int]:
    max_val = numbers[0]
    max_idx = 0
    
    for i, num in enumerate(numbers):
        if num > max_val:
            max_val = num
            max_idx = i
    
    return max_idx, max_val

# Example:
numbers = [10, 20, 15, 30, 5]
idx, val = find_max_index(numbers)
# idx = 3, val = 30
\`\`\`

**Without enumerate():**
\`\`\`python
for i in range(len(numbers)):
    # numbers[i]
\`\`\`

**With enumerate() (better):**
\`\`\`python
for i, item in enumerate(numbers):
    # use i and item directly
\`\`\``,
      pt: `**enumerate() para obter índice e valor:**

\`\`\`python
def find_max_index(numbers: list[int]) -> tuple[int, int]:
    max_val = numbers[0]
    max_idx = 0
    
    for i, num in enumerate(numbers):
        if num > max_val:
            max_val = num
            max_idx = i
    
    return max_idx, max_val

# Exemplo:
numbers = [10, 20, 15, 30, 5]
idx, val = find_max_index(numbers)
# idx = 3, val = 30
\`\`\`

**Sem enumerate():**
\`\`\`python
for i in range(len(numbers)):
    # números[i]
\`\`\`

**Com enumerate() (melhor):**
\`\`\`python
for i, item in enumerate(numbers):
    # use i e item diretamente
\`\`\``
    },
    realWorldExample: {
      es: 'Encontrar la posición de errores en un archivo, indexar resultados.',
      en: 'Find position of errors in a file, index results.',
      pt: 'Encontrar a posição de erros em um arquivo, indexar resultados.'
    },
    hint: {
      es: 'Usá for i, item in enumerate(lista):',
      en: 'Use for i, item in enumerate(list):',
      pt: 'Use for i, item in enumerate(lista):'
    },
    
    starterCode: {
      es: `def find_max_index(numbers: list[int]) -> tuple[int, int]:
    """
    Encuentra la posición del máximo.
    
    Returns:
        Tupla (índice, valor_máximo)
    """
    # Tu código acá
    pass`,
      en: `def find_max_index(numbers: list[int]) -> tuple[int, int]:
    """
    Find the position of the maximum.
    
    Returns:
        Tuple (index, maximum_value)
    """
    # Your code here
    pass`,
      pt: `def find_max_index(numbers: list[int]) -> tuple[int, int]:
    """
    Encontra a posição do máximo.
    
    Returns:
        Tupla (índice, valor_máximo)
    """
    # Seu código aqui
    pass`
    },
    solution: `def find_max_index(numbers: list[int]) -> tuple[int, int]:
    max_val = numbers[0]
    max_idx = 0
    for i, num in enumerate(numbers):
        if num > max_val:
            max_val = num
            max_idx = i
    return max_idx, max_val`,
    testCode: `
assert find_max_index([10, 20, 15, 30, 5]) == (3, 30)
assert find_max_index([5, 4, 3, 2, 1]) == (0, 5)
assert find_max_index([1, 1, 1]) == (0, 1)

print("✅ Todos los tests pasaron!")
`,
  },
];

export default PYTHON_BASICS_EXTENDED;


