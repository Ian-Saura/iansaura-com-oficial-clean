/**
 * Python ETL Extended Exercises
 * Extract, Transform, Load operations
 */

import { PythonExercise } from '../types';

export const PYTHON_ETL_EXTENDED: PythonExercise[] = [
  // === Parse JSON Lines ===
  {
    id: 'py-etl-x1',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['json', 'jsonl', 'parsing', 'streaming'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Parsear JSON Lines (JSONL)',
      en: 'Parse JSON Lines (JSONL)',
      pt: 'Parsear JSON Lines (JSONL)'
    },
    description: {
      es: 'Creá una función que lea un string con formato JSONL (un JSON por línea) y retorne una lista de diccionarios.',
      en: 'Create a function that reads a string with JSONL format (one JSON per line) and returns a list of dictionaries.',
      pt: 'Crie uma função que leia uma string com formato JSONL (um JSON por linha) e retorne uma lista de dicionários.'
    },
    theory: {
      es: `**JSON Lines (JSONL):**

Formato muy usado en data engineering para streaming de datos.

\`\`\`python
import json

def parse_jsonl(text: str) -> list[dict]:
    """Parse JSONL format."""
    results = []
    for line in text.strip().split('\\n'):
        if line.strip():  # Ignorar líneas vacías
            results.append(json.loads(line))
    return results

# Versión one-liner
def parse_jsonl(text: str) -> list[dict]:
    return [json.loads(line) for line in text.strip().split('\\n') if line.strip()]
\`\`\`

**Ventajas de JSONL:**
- Puede procesarse línea por línea (streaming)
- Fácil de agregar nuevos registros
- Usado por BigQuery, Elasticsearch, etc.`,
      en: `**JSON Lines (JSONL):**

Format widely used in data engineering for data streaming.

\`\`\`python
import json

def parse_jsonl(text: str) -> list[dict]:
    """Parse JSONL format."""
    results = []
    for line in text.strip().split('\\n'):
        if line.strip():  # Skip empty lines
            results.append(json.loads(line))
    return results

# One-liner version
def parse_jsonl(text: str) -> list[dict]:
    return [json.loads(line) for line in text.strip().split('\\n') if line.strip()]
\`\`\`

**JSONL advantages:**
- Can be processed line by line (streaming)
- Easy to append new records
- Used by BigQuery, Elasticsearch, etc.`,
      pt: `**JSON Lines (JSONL):**

Formato muito usado em data engineering para streaming de dados.

\`\`\`python
import json

def parse_jsonl(text: str) -> list[dict]:
    """Parse JSONL format."""
    results = []
    for line in text.strip().split('\\n'):
        if line.strip():  # Ignorar linhas vazias
            results.append(json.loads(line))
    return results

# Versão one-liner
def parse_jsonl(text: str) -> list[dict]:
    return [json.loads(line) for line in text.strip().split('\\n') if line.strip()]
\`\`\`

**Vantagens do JSONL:**
- Pode ser processado linha por linha (streaming)
- Fácil de adicionar novos registros
- Usado por BigQuery, Elasticsearch, etc.`
    },
    realWorldExample: {
      es: 'Logs de eventos, exportaciones de BigQuery, feeds de datos.',
      en: 'Event logs, BigQuery exports, data feeds.',
      pt: 'Logs de eventos, exportações do BigQuery, feeds de dados.'
    },
    hint: {
      es: 'Dividí por líneas, filtrá vacías y parseá cada una con json.loads()',
      en: 'Split by lines, filter empty ones and parse each with json.loads()',
      pt: 'Divida por linhas, filtre vazias e parse cada uma com json.loads()'
    },
    
    starterCode: {
      es: `import json

def parse_jsonl(text: str) -> list[dict]:
    """
    Parsea un string en formato JSONL.
    
    Args:
        text: String con un JSON por línea
        
    Returns:
        Lista de diccionarios
    """
    # Tu código acá
    pass`,
      en: `import json

def parse_jsonl(text: str) -> list[dict]:
    """
    Parse a string in JSONL format.
    
    Args:
        text: String with one JSON per line
        
    Returns:
        List of dictionaries
    """
    # Your code here
    pass`,
      pt: `import json

def parse_jsonl(text: str) -> list[dict]:
    """
    Parseia uma string em formato JSONL.
    
    Args:
        text: String com um JSON por linha
        
    Returns:
        Lista de dicionários
    """
    # Seu código aqui
    pass`
    },
    solution: `import json

def parse_jsonl(text: str) -> list[dict]:
    return [json.loads(line) for line in text.strip().split('\\n') if line.strip()]`,
    testCode: `
jsonl_input = """{"name": "Alice", "age": 30}
{"name": "Bob", "age": 25}
{"name": "Carlos", "age": 35}"""

result = parse_jsonl(jsonl_input)
assert len(result) == 3, f"Expected 3 records, got {len(result)}"
assert result[0] == {"name": "Alice", "age": 30}, "First record incorrect"
assert result[1]["name"] == "Bob", "Second record name incorrect"
assert result[2]["age"] == 35, "Third record age incorrect"

# Test con líneas vacías
jsonl_with_empty = """{"id": 1}

{"id": 2}
"""
result2 = parse_jsonl(jsonl_with_empty)
assert len(result2) == 2, "Should skip empty lines"

print("✅ Todos los tests pasaron!")
`,
    requiredImports: ['json'],
  },
  // === Flatten Nested JSON ===
  {
    id: 'py-etl-x2',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'etl',
    tags: ['json', 'flatten', 'nested', 'transform'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Aplanar JSON anidado',
      en: 'Flatten Nested JSON',
      pt: 'Achatar JSON Aninhado'
    },
    description: {
      es: 'Creá una función que convierta un diccionario anidado en uno plano, uniendo las claves con punto (.).',
      en: 'Create a function that converts a nested dictionary to a flat one, joining keys with dot (.).',
      pt: 'Crie uma função que converta um dicionário aninhado em um plano, unindo as chaves com ponto (.).'
    },
    theory: {
      es: `**Aplanar JSON anidado:**

Muy común para cargar datos en tablas SQL o DataFrames.

\`\`\`python
def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            # Recursión para diccionarios anidados
            items.extend(flatten_dict(v, new_key, sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

# Ejemplo
nested = {"user": {"name": "Ana", "address": {"city": "BA"}}}
flat = flatten_dict(nested)
# {"user.name": "Ana", "user.address.city": "BA"}
\`\`\``,
      en: `**Flatten nested JSON:**

Very common for loading data into SQL tables or DataFrames.

\`\`\`python
def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            # Recursion for nested dicts
            items.extend(flatten_dict(v, new_key, sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

# Example
nested = {"user": {"name": "Ana", "address": {"city": "BA"}}}
flat = flatten_dict(nested)
# {"user.name": "Ana", "user.address.city": "BA"}
\`\`\``,
      pt: `**Achatar JSON aninhado:**

Muito comum para carregar dados em tabelas SQL ou DataFrames.

\`\`\`python
def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            # Recursão para dicts aninhados
            items.extend(flatten_dict(v, new_key, sep).items())
        else:
            items.append((new_key, v))
    return dict(items)

# Exemplo
nested = {"user": {"name": "Ana", "address": {"city": "BA"}}}
flat = flatten_dict(nested)
# {"user.name": "Ana", "user.address.city": "BA"}
\`\`\``
    },
    realWorldExample: {
      es: 'APIs con respuestas anidadas, preparación para BigQuery.',
      en: 'APIs with nested responses, BigQuery preparation.',
      pt: 'APIs com respostas aninhadas, preparação para BigQuery.'
    },
    hint: {
      es: 'Usá recursión para procesar diccionarios anidados',
      en: 'Use recursion to process nested dictionaries',
      pt: 'Use recursão para processar dicionários aninhados'
    },
    
    starterCode: {
      es: `def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    """
    Aplana un diccionario anidado.
    
    Args:
        d: Diccionario a aplanar
        parent_key: Clave padre (para recursión)
        sep: Separador entre claves
        
    Returns:
        Diccionario plano
    """
    # Tu código acá
    pass`,
      en: `def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    """
    Flatten a nested dictionary.
    
    Args:
        d: Dictionary to flatten
        parent_key: Parent key (for recursion)
        sep: Separator between keys
        
    Returns:
        Flat dictionary
    """
    # Your code here
    pass`,
      pt: `def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    """
    Achata um dicionário aninhado.
    
    Args:
        d: Dicionário a achatar
        parent_key: Chave pai (para recursão)
        sep: Separador entre chaves
        
    Returns:
        Dicionário plano
    """
    # Seu código aqui
    pass`
    },
    solution: `def flatten_dict(d: dict, parent_key: str = '', sep: str = '.') -> dict:
    items = []
    for k, v in d.items():
        new_key = f"{parent_key}{sep}{k}" if parent_key else k
        if isinstance(v, dict):
            items.extend(flatten_dict(v, new_key, sep).items())
        else:
            items.append((new_key, v))
    return dict(items)`,
    testCode: `
# Test básico
nested = {"a": 1, "b": {"c": 2, "d": {"e": 3}}}
result = flatten_dict(nested)
expected = {"a": 1, "b.c": 2, "b.d.e": 3}
assert result == expected, f"Expected {expected}, got {result}"

# Test más complejo
user_data = {
    "user": {
        "name": "Alice",
        "profile": {
            "age": 30,
            "location": {"city": "NY", "country": "USA"}
        }
    },
    "active": True
}
result2 = flatten_dict(user_data)
assert result2["user.name"] == "Alice"
assert result2["user.profile.age"] == 30
assert result2["user.profile.location.city"] == "NY"
assert result2["active"] == True

# Test con separador personalizado
result3 = flatten_dict({"a": {"b": 1}}, sep='_')
assert result3 == {"a_b": 1}

print("✅ Todos los tests pasaron!")
`,
  },
  // === CSV to Dict List ===
  {
    id: 'py-etl-x3',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['csv', 'parsing', 'dictreader'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Parsear CSV a lista de diccionarios',
      en: 'Parse CSV to List of Dictionaries',
      pt: 'Parsear CSV para Lista de Dicionários'
    },
    description: {
      es: 'Creá una función que convierta un string CSV en una lista de diccionarios usando la primera fila como headers.',
      en: 'Create a function that converts a CSV string to a list of dictionaries using the first row as headers.',
      pt: 'Crie uma função que converta uma string CSV em uma lista de dicionários usando a primeira linha como headers.'
    },
    theory: {
      es: `**Parsear CSV manualmente:**

\`\`\`python
import csv
from io import StringIO

def csv_to_dicts(csv_text: str) -> list[dict]:
    """Parse CSV string to list of dicts."""
    reader = csv.DictReader(StringIO(csv_text))
    return list(reader)

# Sin librería csv:
def csv_to_dicts_manual(csv_text: str) -> list[dict]:
    lines = csv_text.strip().split('\\n')
    headers = lines[0].split(',')
    return [
        dict(zip(headers, line.split(',')))
        for line in lines[1:]
    ]
\`\`\`

**Tip:** \`csv.DictReader\` maneja mejor casos edge como comillas.`,
      en: `**Parse CSV manually:**

\`\`\`python
import csv
from io import StringIO

def csv_to_dicts(csv_text: str) -> list[dict]:
    """Parse CSV string to list of dicts."""
    reader = csv.DictReader(StringIO(csv_text))
    return list(reader)

# Without csv library:
def csv_to_dicts_manual(csv_text: str) -> list[dict]:
    lines = csv_text.strip().split('\\n')
    headers = lines[0].split(',')
    return [
        dict(zip(headers, line.split(',')))
        for line in lines[1:]
    ]
\`\`\`

**Tip:** \`csv.DictReader\` handles edge cases like quotes better.`,
      pt: `**Parsear CSV manualmente:**

\`\`\`python
import csv
from io import StringIO

def csv_to_dicts(csv_text: str) -> list[dict]:
    """Parse CSV string to list of dicts."""
    reader = csv.DictReader(StringIO(csv_text))
    return list(reader)

# Sem biblioteca csv:
def csv_to_dicts_manual(csv_text: str) -> list[dict]:
    lines = csv_text.strip().split('\\n')
    headers = lines[0].split(',')
    return [
        dict(zip(headers, line.split(',')))
        for line in lines[1:]
    ]
\`\`\`

**Dica:** \`csv.DictReader\` lida melhor com casos edge como aspas.`
    },
    realWorldExample: {
      es: 'Importación de datos, migración de sistemas legacy.',
      en: 'Data import, legacy system migration.',
      pt: 'Importação de dados, migração de sistemas legados.'
    },
    hint: {
      es: 'Usá zip() para emparejar headers con valores de cada fila',
      en: 'Use zip() to pair headers with values from each row',
      pt: 'Use zip() para emparelhar headers com valores de cada linha'
    },
    
    starterCode: {
      es: `def csv_to_dicts(csv_text: str) -> list[dict]:
    """
    Convierte CSV a lista de diccionarios.
    
    Args:
        csv_text: String con formato CSV
        
    Returns:
        Lista de diccionarios
    """
    # Tu código acá (sin usar librería csv)
    pass`,
      en: `def csv_to_dicts(csv_text: str) -> list[dict]:
    """
    Convert CSV to list of dictionaries.
    
    Args:
        csv_text: String in CSV format
        
    Returns:
        List of dictionaries
    """
    # Your code here (without csv library)
    pass`,
      pt: `def csv_to_dicts(csv_text: str) -> list[dict]:
    """
    Converte CSV para lista de dicionários.
    
    Args:
        csv_text: String em formato CSV
        
    Returns:
        Lista de dicionários
    """
    # Seu código aqui (sem biblioteca csv)
    pass`
    },
    solution: `def csv_to_dicts(csv_text: str) -> list[dict]:
    lines = csv_text.strip().split('\\n')
    headers = lines[0].split(',')
    return [dict(zip(headers, line.split(','))) for line in lines[1:]]`,
    testCode: `
csv_input = """name,age,city
Alice,30,NY
Bob,25,LA
Carlos,35,BA"""

result = csv_to_dicts(csv_input)
assert len(result) == 3, f"Expected 3 records, got {len(result)}"
assert result[0] == {"name": "Alice", "age": "30", "city": "NY"}
assert result[1]["name"] == "Bob"
assert result[2]["city"] == "BA"

print("✅ Todos los tests pasaron!")
`,
  },
  // === Data Validation ===
  {
    id: 'py-etl-x4',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['validation', 'data quality', 'schema'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Validar registros contra un schema',
      en: 'Validate Records Against Schema',
      pt: 'Validar Registros Contra um Schema'
    },
    description: {
      es: 'Creá una función que valide si un diccionario cumple con un schema de tipos de datos.',
      en: 'Create a function that validates if a dictionary matches a data type schema.',
      pt: 'Crie uma função que valide se um dicionário corresponde a um schema de tipos de dados.'
    },
    theory: {
      es: `**Validación de datos:**

\`\`\`python
def validate_record(record: dict, schema: dict) -> tuple[bool, list[str]]:
    """
    Valida un registro contra un schema.
    
    Args:
        record: Diccionario a validar
        schema: {"campo": type} ej: {"name": str, "age": int}
        
    Returns:
        (is_valid, list_of_errors)
    """
    errors = []
    
    # Verificar campos requeridos
    for field, expected_type in schema.items():
        if field not in record:
            errors.append(f"Missing field: {field}")
        elif not isinstance(record[field], expected_type):
            errors.append(
                f"Invalid type for {field}: expected {expected_type.__name__}, "
                f"got {type(record[field]).__name__}"
            )
    
    return len(errors) == 0, errors
\`\`\``,
      en: `**Data validation:**

\`\`\`python
def validate_record(record: dict, schema: dict) -> tuple[bool, list[str]]:
    """
    Validate a record against schema.
    
    Args:
        record: Dictionary to validate
        schema: {"field": type} e.g.: {"name": str, "age": int}
        
    Returns:
        (is_valid, list_of_errors)
    """
    errors = []
    
    # Check required fields
    for field, expected_type in schema.items():
        if field not in record:
            errors.append(f"Missing field: {field}")
        elif not isinstance(record[field], expected_type):
            errors.append(
                f"Invalid type for {field}: expected {expected_type.__name__}, "
                f"got {type(record[field]).__name__}"
            )
    
    return len(errors) == 0, errors
\`\`\``,
      pt: `**Validação de dados:**

\`\`\`python
def validate_record(record: dict, schema: dict) -> tuple[bool, list[str]]:
    """
    Valida um registro contra schema.
    
    Args:
        record: Dicionário a validar
        schema: {"campo": type} ex: {"name": str, "age": int}
        
    Returns:
        (is_valid, list_of_errors)
    """
    errors = []
    
    # Verificar campos obrigatórios
    for field, expected_type in schema.items():
        if field not in record:
            errors.append(f"Missing field: {field}")
        elif not isinstance(record[field], expected_type):
            errors.append(
                f"Invalid type for {field}: expected {expected_type.__name__}, "
                f"got {type(record[field]).__name__}"
            )
    
    return len(errors) == 0, errors
\`\`\``
    },
    realWorldExample: {
      es: 'Validación de API inputs, ETL data quality checks.',
      en: 'API input validation, ETL data quality checks.',
      pt: 'Validação de inputs de API, checks de qualidade de dados ETL.'
    },
    hint: {
      es: 'Usá isinstance() para verificar tipos y acumulá errores en una lista',
      en: 'Use isinstance() to check types and accumulate errors in a list',
      pt: 'Use isinstance() para verificar tipos e acumule erros em uma lista'
    },
    
    starterCode: {
      es: `def validate_record(record: dict, schema: dict) -> tuple[bool, list[str]]:
    """
    Valida un registro contra un schema de tipos.
    
    Args:
        record: Diccionario a validar
        schema: Dict con campo -> tipo esperado
        
    Returns:
        Tupla (es_válido, lista_de_errores)
    """
    # Tu código acá
    pass`,
      en: `def validate_record(record: dict, schema: dict) -> tuple[bool, list[str]]:
    """
    Validate a record against a type schema.
    
    Args:
        record: Dictionary to validate
        schema: Dict with field -> expected type
        
    Returns:
        Tuple (is_valid, list_of_errors)
    """
    # Your code here
    pass`,
      pt: `def validate_record(record: dict, schema: dict) -> tuple[bool, list[str]]:
    """
    Valida um registro contra um schema de tipos.
    
    Args:
        record: Dicionário a validar
        schema: Dict com campo -> tipo esperado
        
    Returns:
        Tupla (é_válido, lista_de_erros)
    """
    # Seu código aqui
    pass`
    },
    solution: `def validate_record(record: dict, schema: dict) -> tuple[bool, list[str]]:
    errors = []
    for field, expected_type in schema.items():
        if field not in record:
            errors.append(f"Missing field: {field}")
        elif not isinstance(record[field], expected_type):
            errors.append(f"Invalid type for {field}: expected {expected_type.__name__}, got {type(record[field]).__name__}")
    return len(errors) == 0, errors`,
    testCode: `
schema = {"name": str, "age": int, "active": bool}

# Test válido
valid_record = {"name": "Alice", "age": 30, "active": True}
is_valid, errors = validate_record(valid_record, schema)
assert is_valid == True, "Should be valid"
assert len(errors) == 0, "Should have no errors"

# Test con campo faltante
missing_field = {"name": "Bob", "active": False}
is_valid, errors = validate_record(missing_field, schema)
assert is_valid == False, "Should be invalid"
assert any("age" in e for e in errors), "Should report missing age"

# Test con tipo incorrecto
wrong_type = {"name": "Carlos", "age": "thirty", "active": True}
is_valid, errors = validate_record(wrong_type, schema)
assert is_valid == False, "Should be invalid"
assert any("int" in e for e in errors), "Should report type error"

print("✅ Todos los tests pasaron!")
`,
  },
  // === Deduplicate Records ===
  {
    id: 'py-etl-x5',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['deduplication', 'unique', 'transform'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Deduplicar registros por clave',
      en: 'Deduplicate Records by Key',
      pt: 'Deduplicar Registros por Chave'
    },
    description: {
      es: 'Creá una función que elimine registros duplicados basándose en una clave específica, manteniendo el primer ocurrencia.',
      en: 'Create a function that removes duplicate records based on a specific key, keeping the first occurrence.',
      pt: 'Crie uma função que remova registros duplicados baseando-se em uma chave específica, mantendo a primeira ocorrência.'
    },
    theory: {
      es: `**Deduplicación por clave:**

\`\`\`python
def deduplicate(records: list[dict], key: str) -> list[dict]:
    """
    Elimina duplicados manteniendo el primero.
    """
    seen = set()
    result = []
    
    for record in records:
        key_value = record.get(key)
        if key_value not in seen:
            seen.add(key_value)
            result.append(record)
    
    return result

# Versión más concisa (Python 3.7+ mantiene orden)
def deduplicate(records: list[dict], key: str) -> list[dict]:
    seen = {}
    for r in records:
        seen.setdefault(r[key], r)
    return list(seen.values())
\`\`\`

**Tip:** En producción, considerá qué registro mantener (primero, último, más reciente).`,
      en: `**Deduplication by key:**

\`\`\`python
def deduplicate(records: list[dict], key: str) -> list[dict]:
    """
    Remove duplicates keeping the first one.
    """
    seen = set()
    result = []
    
    for record in records:
        key_value = record.get(key)
        if key_value not in seen:
            seen.add(key_value)
            result.append(record)
    
    return result

# More concise version (Python 3.7+ preserves order)
def deduplicate(records: list[dict], key: str) -> list[dict]:
    seen = {}
    for r in records:
        seen.setdefault(r[key], r)
    return list(seen.values())
\`\`\`

**Tip:** In production, consider which record to keep (first, last, most recent).`,
      pt: `**Deduplicação por chave:**

\`\`\`python
def deduplicate(records: list[dict], key: str) -> list[dict]:
    """
    Remove duplicados mantendo o primeiro.
    """
    seen = set()
    result = []
    
    for record in records:
        key_value = record.get(key)
        if key_value not in seen:
            seen.add(key_value)
            result.append(record)
    
    return result

# Versão mais concisa (Python 3.7+ mantém ordem)
def deduplicate(records: list[dict], key: str) -> list[dict]:
    seen = {}
    for r in records:
        seen.setdefault(r[key], r)
    return list(seen.values())
\`\`\`

**Dica:** Em produção, considere qual registro manter (primeiro, último, mais recente).`
    },
    realWorldExample: {
      es: 'Limpieza de datos, merge de fuentes, ETL pipelines.',
      en: 'Data cleaning, source merging, ETL pipelines.',
      pt: 'Limpeza de dados, merge de fontes, ETL pipelines.'
    },
    hint: {
      es: 'Usá un set para trackear valores de clave ya vistos',
      en: 'Use a set to track key values already seen',
      pt: 'Use um set para rastrear valores de chave já vistos'
    },
    
    starterCode: {
      es: `def deduplicate(records: list[dict], key: str) -> list[dict]:
    """
    Elimina registros duplicados por clave.
    
    Args:
        records: Lista de diccionarios
        key: Nombre del campo clave
        
    Returns:
        Lista sin duplicados (mantiene el primero)
    """
    # Tu código acá
    pass`,
      en: `def deduplicate(records: list[dict], key: str) -> list[dict]:
    """
    Remove duplicate records by key.
    
    Args:
        records: List of dictionaries
        key: Name of key field
        
    Returns:
        List without duplicates (keeps first)
    """
    # Your code here
    pass`,
      pt: `def deduplicate(records: list[dict], key: str) -> list[dict]:
    """
    Remove registros duplicados por chave.
    
    Args:
        records: Lista de dicionários
        key: Nome do campo chave
        
    Returns:
        Lista sem duplicados (mantém o primeiro)
    """
    # Seu código aqui
    pass`
    },
    solution: `def deduplicate(records: list[dict], key: str) -> list[dict]:
    seen = set()
    result = []
    for record in records:
        key_value = record.get(key)
        if key_value not in seen:
            seen.add(key_value)
            result.append(record)
    return result`,
    testCode: `
records = [
    {"id": 1, "name": "Alice"},
    {"id": 2, "name": "Bob"},
    {"id": 1, "name": "Alice Updated"},  # Duplicado
    {"id": 3, "name": "Carlos"},
    {"id": 2, "name": "Bob Updated"},    # Duplicado
]

result = deduplicate(records, "id")
assert len(result) == 3, f"Expected 3 unique records, got {len(result)}"
assert result[0]["name"] == "Alice", "Should keep first occurrence"
assert result[1]["name"] == "Bob", "Should keep first Bob"

# Verificar orden preservado
ids = [r["id"] for r in result]
assert ids == [1, 2, 3], "Should preserve original order"

print("✅ Todos los tests pasaron!")
`,
  },
  // === Batch Processing ===
  {
    id: 'py-etl-x6',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['batch', 'chunking', 'generator', 'memory'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Procesar en batches/chunks',
      en: 'Process in Batches/Chunks',
      pt: 'Processar em Batches/Chunks'
    },
    description: {
      es: 'Creá un generador que divida una lista en chunks de tamaño fijo para procesamiento por lotes.',
      en: 'Create a generator that splits a list into fixed-size chunks for batch processing.',
      pt: 'Crie um gerador que divida uma lista em chunks de tamanho fixo para processamento em lotes.'
    },
    theory: {
      es: `**Batching/Chunking para grandes volúmenes:**

\`\`\`python
from typing import Iterator

def batch_generator(items: list, batch_size: int) -> Iterator[list]:
    """Genera batches de tamaño fijo."""
    for i in range(0, len(items), batch_size):
        yield items[i:i + batch_size]

# Uso:
for batch in batch_generator(huge_list, batch_size=1000):
    process_batch(batch)
    
# Versión con itertools
from itertools import islice

def batched(iterable, n):
    it = iter(iterable)
    while batch := list(islice(it, n)):
        yield batch
\`\`\`

**¿Por qué usar batches?**
- Control de memoria
- APIs con rate limits
- Procesamiento paralelo
- Commits transaccionales`,
      en: `**Batching/Chunking for large volumes:**

\`\`\`python
from typing import Iterator

def batch_generator(items: list, batch_size: int) -> Iterator[list]:
    """Generate fixed-size batches."""
    for i in range(0, len(items), batch_size):
        yield items[i:i + batch_size]

# Usage:
for batch in batch_generator(huge_list, batch_size=1000):
    process_batch(batch)
    
# itertools version
from itertools import islice

def batched(iterable, n):
    it = iter(iterable)
    while batch := list(islice(it, n)):
        yield batch
\`\`\`

**Why use batches?**
- Memory control
- APIs with rate limits
- Parallel processing
- Transactional commits`,
      pt: `**Batching/Chunking para grandes volumes:**

\`\`\`python
from typing import Iterator

def batch_generator(items: list, batch_size: int) -> Iterator[list]:
    """Gera batches de tamanho fixo."""
    for i in range(0, len(items), batch_size):
        yield items[i:i + batch_size]

# Uso:
for batch in batch_generator(huge_list, batch_size=1000):
    process_batch(batch)
    
# Versão com itertools
from itertools import islice

def batched(iterable, n):
    it = iter(iterable)
    while batch := list(islice(it, n)):
        yield batch
\`\`\`

**Por que usar batches?**
- Controle de memória
- APIs com rate limits
- Processamento paralelo
- Commits transacionais`
    },
    realWorldExample: {
      es: 'Bulk inserts, llamadas a APIs, procesamiento de archivos grandes.',
      en: 'Bulk inserts, API calls, large file processing.',
      pt: 'Bulk inserts, chamadas de APIs, processamento de arquivos grandes.'
    },
    hint: {
      es: 'Usá range con step igual al batch_size y slicing',
      en: 'Use range with step equal to batch_size and slicing',
      pt: 'Use range com step igual ao batch_size e slicing'
    },
    
    starterCode: {
      es: `def batch_generator(items: list, batch_size: int):
    """
    Generador que divide items en batches.
    
    Args:
        items: Lista de elementos
        batch_size: Tamaño de cada batch
        
    Yields:
        Listas de tamaño batch_size (o menos para el último)
    """
    # Tu código acá
    pass`,
      en: `def batch_generator(items: list, batch_size: int):
    """
    Generator that splits items into batches.
    
    Args:
        items: List of elements
        batch_size: Size of each batch
        
    Yields:
        Lists of size batch_size (or less for last)
    """
    # Your code here
    pass`,
      pt: `def batch_generator(items: list, batch_size: int):
    """
    Gerador que divide items em batches.
    
    Args:
        items: Lista de elementos
        batch_size: Tamanho de cada batch
        
    Yields:
        Listas de tamanho batch_size (ou menos para o último)
    """
    # Seu código aqui
    pass`
    },
    solution: `def batch_generator(items: list, batch_size: int):
    for i in range(0, len(items), batch_size):
        yield items[i:i + batch_size]`,
    testCode: `
items = list(range(10))  # [0, 1, 2, ..., 9]

# Test batch_size=3
batches = list(batch_generator(items, 3))
assert len(batches) == 4, f"Expected 4 batches, got {len(batches)}"
assert batches[0] == [0, 1, 2], "First batch incorrect"
assert batches[-1] == [9], "Last batch should have remaining item"

# Test batch_size=5
batches = list(batch_generator(items, 5))
assert len(batches) == 2, "Expected 2 batches"
assert batches[0] == [0, 1, 2, 3, 4]
assert batches[1] == [5, 6, 7, 8, 9]

# Test con lista vacía
empty_batches = list(batch_generator([], 3))
assert empty_batches == [], "Empty list should yield no batches"

print("✅ Todos los tests pasaron!")
`,
  },
  // === Transform with Mapping ===
  {
    id: 'py-etl-x7',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['transform', 'mapping', 'rename'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Transformar campos con mapping',
      en: 'Transform Fields with Mapping',
      pt: 'Transformar Campos com Mapping'
    },
    description: {
      es: 'Creá una función que renombre campos de un diccionario según un mapping de transformación.',
      en: 'Create a function that renames dictionary fields according to a transformation mapping.',
      pt: 'Crie uma função que renomeie campos de um dicionário segundo um mapping de transformação.'
    },
    theory: {
      es: `**Transformar/renombrar campos:**

\`\`\`python
def transform_fields(record: dict, mapping: dict) -> dict:
    """
    Renombra campos según mapping.
    
    Args:
        record: Diccionario original
        mapping: {"old_name": "new_name", ...}
    """
    return {
        mapping.get(k, k): v  # Usa mapping o mantiene original
        for k, v in record.items()
    }

# Ejemplo:
record = {"first_name": "Ana", "last_name": "García", "age": 30}
mapping = {"first_name": "nombre", "last_name": "apellido"}
result = transform_fields(record, mapping)
# {"nombre": "Ana", "apellido": "García", "age": 30}
\`\`\``,
      en: `**Transform/rename fields:**

\`\`\`python
def transform_fields(record: dict, mapping: dict) -> dict:
    """
    Rename fields according to mapping.
    
    Args:
        record: Original dictionary
        mapping: {"old_name": "new_name", ...}
    """
    return {
        mapping.get(k, k): v  # Use mapping or keep original
        for k, v in record.items()
    }

# Example:
record = {"first_name": "Ana", "last_name": "García", "age": 30}
mapping = {"first_name": "nombre", "last_name": "apellido"}
result = transform_fields(record, mapping)
# {"nombre": "Ana", "apellido": "García", "age": 30}
\`\`\``,
      pt: `**Transformar/renomear campos:**

\`\`\`python
def transform_fields(record: dict, mapping: dict) -> dict:
    """
    Renomeia campos segundo mapping.
    
    Args:
        record: Dicionário original
        mapping: {"old_name": "new_name", ...}
    """
    return {
        mapping.get(k, k): v  # Usa mapping ou mantém original
        for k, v in record.items()
    }

# Exemplo:
record = {"first_name": "Ana", "last_name": "García", "age": 30}
mapping = {"first_name": "nome", "last_name": "sobrenome"}
result = transform_fields(record, mapping)
# {"nome": "Ana", "sobrenome": "García", "age": 30}
\`\`\``
    },
    realWorldExample: {
      es: 'Normalización de APIs externas, migración de schemas.',
      en: 'External API normalization, schema migration.',
      pt: 'Normalização de APIs externas, migração de schemas.'
    },
    hint: {
      es: 'Usá dict comprehension con mapping.get(k, k) para mantener campos no mapeados',
      en: 'Use dict comprehension with mapping.get(k, k) to keep unmapped fields',
      pt: 'Use dict comprehension com mapping.get(k, k) para manter campos não mapeados'
    },
    
    starterCode: {
      es: `def transform_fields(record: dict, mapping: dict) -> dict:
    """
    Renombra campos de un diccionario.
    
    Args:
        record: Diccionario original
        mapping: Dict con old_name -> new_name
        
    Returns:
        Diccionario con campos renombrados
    """
    # Tu código acá
    pass`,
      en: `def transform_fields(record: dict, mapping: dict) -> dict:
    """
    Rename dictionary fields.
    
    Args:
        record: Original dictionary
        mapping: Dict with old_name -> new_name
        
    Returns:
        Dictionary with renamed fields
    """
    # Your code here
    pass`,
      pt: `def transform_fields(record: dict, mapping: dict) -> dict:
    """
    Renomeia campos de um dicionário.
    
    Args:
        record: Dicionário original
        mapping: Dict com old_name -> new_name
        
    Returns:
        Dicionário com campos renomeados
    """
    # Seu código aqui
    pass`
    },
    solution: `def transform_fields(record: dict, mapping: dict) -> dict:
    return {mapping.get(k, k): v for k, v in record.items()}`,
    testCode: `
record = {"first_name": "Alice", "last_name": "Smith", "age": 30, "email": "alice@mail.com"}
mapping = {"first_name": "nombre", "last_name": "apellido"}

result = transform_fields(record, mapping)
assert "nombre" in result, "Should have renamed field"
assert "apellido" in result, "Should have renamed field"
assert result["nombre"] == "Alice", "Value should be preserved"
assert "age" in result, "Unmapped fields should be kept"
assert "email" in result, "Unmapped fields should be kept"
assert "first_name" not in result, "Old name should be gone"

# Test con mapping vacío
result2 = transform_fields({"a": 1, "b": 2}, {})
assert result2 == {"a": 1, "b": 2}, "Empty mapping should return same dict"

print("✅ Todos los tests pasaron!")
`,
  },
  // === Date Parsing and Formatting ===
  {
    id: 'py-etl-x8',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['datetime', 'parsing', 'formatting'],
    interviewFrequency: 'very_high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Parsear y formatear fechas',
      en: 'Parse and Format Dates',
      pt: 'Parsear e Formatar Datas'
    },
    description: {
      es: 'Creá una función que convierta fechas de un formato a otro.',
      en: 'Create a function that converts dates from one format to another.',
      pt: 'Crie uma função que converta datas de um formato para outro.'
    },
    theory: {
      es: `**Parsing y formateo de fechas:**

\`\`\`python
from datetime import datetime

def convert_date(date_str: str, from_format: str, to_format: str) -> str:
    """
    Convierte fecha entre formatos.
    
    Formatos comunes:
    - %Y-%m-%d = 2024-01-15
    - %d/%m/%Y = 15/01/2024
    - %B %d, %Y = January 15, 2024
    - %Y-%m-%dT%H:%M:%S = ISO 8601
    """
    parsed = datetime.strptime(date_str, from_format)
    return parsed.strftime(to_format)

# Ejemplo:
convert_date("15/01/2024", "%d/%m/%Y", "%Y-%m-%d")
# "2024-01-15"
\`\`\`

**Códigos más usados:**
- %Y = Año 4 dígitos, %y = 2 dígitos
- %m = Mes con cero, %B = Nombre completo
- %d = Día con cero
- %H:%M:%S = Hora:Minuto:Segundo`,
      en: `**Date parsing and formatting:**

\`\`\`python
from datetime import datetime

def convert_date(date_str: str, from_format: str, to_format: str) -> str:
    """
    Convert date between formats.
    
    Common formats:
    - %Y-%m-%d = 2024-01-15
    - %d/%m/%Y = 15/01/2024
    - %B %d, %Y = January 15, 2024
    - %Y-%m-%dT%H:%M:%S = ISO 8601
    """
    parsed = datetime.strptime(date_str, from_format)
    return parsed.strftime(to_format)

# Example:
convert_date("15/01/2024", "%d/%m/%Y", "%Y-%m-%d")
# "2024-01-15"
\`\`\`

**Most used codes:**
- %Y = 4-digit year, %y = 2-digit
- %m = Month with zero, %B = Full name
- %d = Day with zero
- %H:%M:%S = Hour:Minute:Second`,
      pt: `**Parsing e formatação de datas:**

\`\`\`python
from datetime import datetime

def convert_date(date_str: str, from_format: str, to_format: str) -> str:
    """
    Converte data entre formatos.
    
    Formatos comuns:
    - %Y-%m-%d = 2024-01-15
    - %d/%m/%Y = 15/01/2024
    - %B %d, %Y = January 15, 2024
    - %Y-%m-%dT%H:%M:%S = ISO 8601
    """
    parsed = datetime.strptime(date_str, from_format)
    return parsed.strftime(to_format)

# Exemplo:
convert_date("15/01/2024", "%d/%m/%Y", "%Y-%m-%d")
# "2024-01-15"
\`\`\`

**Códigos mais usados:**
- %Y = Ano 4 dígitos, %y = 2 dígitos
- %m = Mês com zero, %B = Nome completo
- %d = Dia com zero
- %H:%M:%S = Hora:Minuto:Segundo`
    },
    realWorldExample: {
      es: 'Normalización de fechas de diferentes fuentes.',
      en: 'Date normalization from different sources.',
      pt: 'Normalização de datas de diferentes fontes.'
    },
    hint: {
      es: 'Usá datetime.strptime() para parsear y strftime() para formatear',
      en: 'Use datetime.strptime() to parse and strftime() to format',
      pt: 'Use datetime.strptime() para parsear e strftime() para formatar'
    },
    
    starterCode: {
      es: `from datetime import datetime

def convert_date(date_str: str, from_format: str, to_format: str) -> str:
    """
    Convierte una fecha de un formato a otro.
    
    Args:
        date_str: Fecha como string
        from_format: Formato de entrada (ej: "%d/%m/%Y")
        to_format: Formato de salida (ej: "%Y-%m-%d")
        
    Returns:
        Fecha en nuevo formato
    """
    # Tu código acá
    pass`,
      en: `from datetime import datetime

def convert_date(date_str: str, from_format: str, to_format: str) -> str:
    """
    Convert a date from one format to another.
    
    Args:
        date_str: Date as string
        from_format: Input format (e.g.: "%d/%m/%Y")
        to_format: Output format (e.g.: "%Y-%m-%d")
        
    Returns:
        Date in new format
    """
    # Your code here
    pass`,
      pt: `from datetime import datetime

def convert_date(date_str: str, from_format: str, to_format: str) -> str:
    """
    Converte uma data de um formato para outro.
    
    Args:
        date_str: Data como string
        from_format: Formato de entrada (ex: "%d/%m/%Y")
        to_format: Formato de saída (ex: "%Y-%m-%d")
        
    Returns:
        Data no novo formato
    """
    # Seu código aqui
    pass`
    },
    solution: `from datetime import datetime

def convert_date(date_str: str, from_format: str, to_format: str) -> str:
    parsed = datetime.strptime(date_str, from_format)
    return parsed.strftime(to_format)`,
    testCode: `
# Test DD/MM/YYYY -> YYYY-MM-DD
result = convert_date("15/01/2024", "%d/%m/%Y", "%Y-%m-%d")
assert result == "2024-01-15", f"Expected 2024-01-15, got {result}"

# Test ISO -> DD/MM/YYYY
result2 = convert_date("2024-03-20", "%Y-%m-%d", "%d/%m/%Y")
assert result2 == "20/03/2024", f"Expected 20/03/2024, got {result2}"

# Test con hora
result3 = convert_date("2024-01-15T14:30:00", "%Y-%m-%dT%H:%M:%S", "%d/%m/%Y %H:%M")
assert result3 == "15/01/2024 14:30", f"Expected 15/01/2024 14:30, got {result3}"

print("✅ Todos los tests pasaron!")
`,
    requiredImports: ['datetime'],
  },
  // === Merge/Join Datasets ===
  {
    id: 'py-etl-x9',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'etl',
    tags: ['join', 'merge', 'combine'],
    interviewFrequency: 'very_high',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Merge/Join de dos datasets',
      en: 'Merge/Join Two Datasets',
      pt: 'Merge/Join de Dois Datasets'
    },
    description: {
      es: 'Creá una función que haga un LEFT JOIN entre dos listas de diccionarios usando una clave común.',
      en: 'Create a function that performs a LEFT JOIN between two lists of dictionaries using a common key.',
      pt: 'Crie uma função que faça um LEFT JOIN entre duas listas de dicionários usando uma chave comum.'
    },
    theory: {
      es: `**LEFT JOIN manual en Python:**

\`\`\`python
def left_join(left: list[dict], right: list[dict], 
              left_key: str, right_key: str) -> list[dict]:
    """
    LEFT JOIN: todos los de la izquierda + matching de la derecha.
    """
    # Crear índice del lado derecho
    right_index = {r[right_key]: r for r in right}
    
    result = []
    for l in left:
        merged = l.copy()
        right_match = right_index.get(l[left_key], {})
        # Agregar campos del lado derecho
        for k, v in right_match.items():
            if k != right_key:  # No duplicar la clave
                merged[k] = v
        result.append(merged)
    
    return result
\`\`\`

**Tipos de JOIN:**
- INNER: solo matches
- LEFT: todos izquierda + matches
- RIGHT: todos derecha + matches
- FULL OUTER: todos de ambos`,
      en: `**Manual LEFT JOIN in Python:**

\`\`\`python
def left_join(left: list[dict], right: list[dict], 
              left_key: str, right_key: str) -> list[dict]:
    """
    LEFT JOIN: all from left + matching from right.
    """
    # Create index from right side
    right_index = {r[right_key]: r for r in right}
    
    result = []
    for l in left:
        merged = l.copy()
        right_match = right_index.get(l[left_key], {})
        # Add fields from right side
        for k, v in right_match.items():
            if k != right_key:  # Don't duplicate key
                merged[k] = v
        result.append(merged)
    
    return result
\`\`\`

**JOIN types:**
- INNER: only matches
- LEFT: all left + matches
- RIGHT: all right + matches
- FULL OUTER: all from both`,
      pt: `**LEFT JOIN manual em Python:**

\`\`\`python
def left_join(left: list[dict], right: list[dict], 
              left_key: str, right_key: str) -> list[dict]:
    """
    LEFT JOIN: todos da esquerda + matching da direita.
    """
    # Criar índice do lado direito
    right_index = {r[right_key]: r for r in right}
    
    result = []
    for l in left:
        merged = l.copy()
        right_match = right_index.get(l[left_key], {})
        # Adicionar campos do lado direito
        for k, v in right_match.items():
            if k != right_key:  # Não duplicar a chave
                merged[k] = v
        result.append(merged)
    
    return result
\`\`\`

**Tipos de JOIN:**
- INNER: só matches
- LEFT: todos esquerda + matches
- RIGHT: todos direita + matches
- FULL OUTER: todos de ambos`
    },
    realWorldExample: {
      es: 'Enriquecer datos de ventas con info de clientes.',
      en: 'Enrich sales data with customer info.',
      pt: 'Enriquecer dados de vendas com info de clientes.'
    },
    hint: {
      es: 'Creá un índice (dict) del lado derecho para búsqueda O(1)',
      en: 'Create an index (dict) from right side for O(1) lookup',
      pt: 'Crie um índice (dict) do lado direito para busca O(1)'
    },
    
    starterCode: {
      es: `def left_join(left: list[dict], right: list[dict], 
              left_key: str, right_key: str) -> list[dict]:
    """
    Realiza LEFT JOIN entre dos listas de diccionarios.
    
    Args:
        left: Lista izquierda (todos se incluyen)
        right: Lista derecha (solo matches)
        left_key: Clave en lista izquierda
        right_key: Clave en lista derecha
        
    Returns:
        Lista con registros mergeados
    """
    # Tu código acá
    pass`,
      en: `def left_join(left: list[dict], right: list[dict], 
              left_key: str, right_key: str) -> list[dict]:
    """
    Perform LEFT JOIN between two lists of dictionaries.
    
    Args:
        left: Left list (all included)
        right: Right list (only matches)
        left_key: Key in left list
        right_key: Key in right list
        
    Returns:
        List with merged records
    """
    # Your code here
    pass`,
      pt: `def left_join(left: list[dict], right: list[dict], 
              left_key: str, right_key: str) -> list[dict]:
    """
    Realiza LEFT JOIN entre duas listas de dicionários.
    
    Args:
        left: Lista esquerda (todos incluídos)
        right: Lista direita (só matches)
        left_key: Chave na lista esquerda
        right_key: Chave na lista direita
        
    Returns:
        Lista com registros mergeados
    """
    # Seu código aqui
    pass`
    },
    solution: `def left_join(left: list[dict], right: list[dict], 
              left_key: str, right_key: str) -> list[dict]:
    right_index = {r[right_key]: r for r in right}
    result = []
    for l in left:
        merged = l.copy()
        right_match = right_index.get(l[left_key], {})
        for k, v in right_match.items():
            if k != right_key:
                merged[k] = v
        result.append(merged)
    return result`,
    testCode: `
orders = [
    {"order_id": 1, "customer_id": 101, "amount": 100},
    {"order_id": 2, "customer_id": 102, "amount": 200},
    {"order_id": 3, "customer_id": 999, "amount": 50},  # No match
]

customers = [
    {"customer_id": 101, "name": "Alice", "city": "NY"},
    {"customer_id": 102, "name": "Bob", "city": "LA"},
    {"customer_id": 103, "name": "Carlos", "city": "BA"},
]

result = left_join(orders, customers, "customer_id", "customer_id")

assert len(result) == 3, "Should have all orders"
assert result[0]["name"] == "Alice", "First order should have Alice"
assert result[1]["city"] == "LA", "Second order should have LA"
assert "name" not in result[2], "Third order has no match"

print("✅ Todos los tests pasaron!")
`,
  },
  // === Data Aggregation ===
  {
    id: 'py-etl-x10',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['aggregation', 'groupby', 'reduce'],
    interviewFrequency: 'very_high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Agregar datos por grupo',
      en: 'Aggregate Data by Group',
      pt: 'Agregar Dados por Grupo'
    },
    description: {
      es: 'Creá una función que agrupe registros por una clave y calcule agregaciones (sum, count, avg).',
      en: 'Create a function that groups records by a key and calculates aggregations (sum, count, avg).',
      pt: 'Crie uma função que agrupe registros por uma chave e calcule agregações (sum, count, avg).'
    },
    theory: {
      es: `**Agregación manual (sin Pandas):**

\`\`\`python
from collections import defaultdict

def aggregate_by(records: list[dict], group_key: str, 
                 agg_key: str) -> dict:
    """Agrupa y calcula sum, count, avg."""
    groups = defaultdict(list)
    
    for r in records:
        groups[r[group_key]].append(r[agg_key])
    
    return {
        key: {
            'sum': sum(values),
            'count': len(values),
            'avg': sum(values) / len(values),
            'min': min(values),
            'max': max(values),
        }
        for key, values in groups.items()
    }
\`\`\`

**Con itertools.groupby:**
\`\`\`python
from itertools import groupby
from operator import itemgetter

# Nota: requiere datos ordenados por la clave de grupo
sorted_data = sorted(records, key=itemgetter(group_key))
for key, group in groupby(sorted_data, key=itemgetter(group_key)):
    ...
\`\`\``,
      en: `**Manual aggregation (no Pandas):**

\`\`\`python
from collections import defaultdict

def aggregate_by(records: list[dict], group_key: str, 
                 agg_key: str) -> dict:
    """Group and calculate sum, count, avg."""
    groups = defaultdict(list)
    
    for r in records:
        groups[r[group_key]].append(r[agg_key])
    
    return {
        key: {
            'sum': sum(values),
            'count': len(values),
            'avg': sum(values) / len(values),
            'min': min(values),
            'max': max(values),
        }
        for key, values in groups.items()
    }
\`\`\`

**With itertools.groupby:**
\`\`\`python
from itertools import groupby
from operator import itemgetter

# Note: requires data sorted by group key
sorted_data = sorted(records, key=itemgetter(group_key))
for key, group in groupby(sorted_data, key=itemgetter(group_key)):
    ...
\`\`\``,
      pt: `**Agregação manual (sem Pandas):**

\`\`\`python
from collections import defaultdict

def aggregate_by(records: list[dict], group_key: str, 
                 agg_key: str) -> dict:
    """Agrupa e calcula sum, count, avg."""
    groups = defaultdict(list)
    
    for r in records:
        groups[r[group_key]].append(r[agg_key])
    
    return {
        key: {
            'sum': sum(values),
            'count': len(values),
            'avg': sum(values) / len(values),
            'min': min(values),
            'max': max(values),
        }
        for key, values in groups.items()
    }
\`\`\`

**Com itertools.groupby:**
\`\`\`python
from itertools import groupby
from operator import itemgetter

# Nota: requer dados ordenados pela chave de grupo
sorted_data = sorted(records, key=itemgetter(group_key))
for key, group in groupby(sorted_data, key=itemgetter(group_key)):
    ...
\`\`\``
    },
    realWorldExample: {
      es: 'Reportes de ventas por región, métricas por categoría.',
      en: 'Sales reports by region, metrics by category.',
      pt: 'Relatórios de vendas por região, métricas por categoria.'
    },
    hint: {
      es: 'Usá defaultdict(list) para agrupar valores, luego calculá agregaciones',
      en: 'Use defaultdict(list) to group values, then calculate aggregations',
      pt: 'Use defaultdict(list) para agrupar valores, depois calcule agregações'
    },
    
    starterCode: {
      es: `from collections import defaultdict

def aggregate_by(records: list[dict], group_key: str, agg_key: str) -> dict:
    """
    Agrupa registros y calcula agregaciones.
    
    Args:
        records: Lista de diccionarios
        group_key: Campo por el cual agrupar
        agg_key: Campo numérico a agregar
        
    Returns:
        Dict {grupo: {sum, count, avg}}
    """
    # Tu código acá
    pass`,
      en: `from collections import defaultdict

def aggregate_by(records: list[dict], group_key: str, agg_key: str) -> dict:
    """
    Group records and calculate aggregations.
    
    Args:
        records: List of dictionaries
        group_key: Field to group by
        agg_key: Numeric field to aggregate
        
    Returns:
        Dict {group: {sum, count, avg}}
    """
    # Your code here
    pass`,
      pt: `from collections import defaultdict

def aggregate_by(records: list[dict], group_key: str, agg_key: str) -> dict:
    """
    Agrupa registros e calcula agregações.
    
    Args:
        records: Lista de dicionários
        group_key: Campo pelo qual agrupar
        agg_key: Campo numérico a agregar
        
    Returns:
        Dict {grupo: {sum, count, avg}}
    """
    # Seu código aqui
    pass`
    },
    solution: `from collections import defaultdict

def aggregate_by(records: list[dict], group_key: str, agg_key: str) -> dict:
    groups = defaultdict(list)
    for r in records:
        groups[r[group_key]].append(r[agg_key])
    return {
        key: {
            'sum': sum(values),
            'count': len(values),
            'avg': sum(values) / len(values)
        }
        for key, values in groups.items()
    }`,
    testCode: `
sales = [
    {"region": "North", "amount": 100},
    {"region": "North", "amount": 150},
    {"region": "South", "amount": 200},
    {"region": "North", "amount": 50},
    {"region": "South", "amount": 100},
]

result = aggregate_by(sales, "region", "amount")

assert result["North"]["sum"] == 300, f"North sum should be 300"
assert result["North"]["count"] == 3, "North count should be 3"
assert result["North"]["avg"] == 100, "North avg should be 100"

assert result["South"]["sum"] == 300, "South sum should be 300"
assert result["South"]["count"] == 2, "South count should be 2"
assert result["South"]["avg"] == 150, "South avg should be 150"

print("✅ Todos los tests pasaron!")
`,
    requiredImports: ['collections'],
  },
  // === Filter and Extract ===
  {
    id: 'py-etl-x11',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'etl',
    tags: ['filter', 'extract', 'transform'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Filtrar y extraer campos',
      en: 'Filter and Extract Fields',
      pt: 'Filtrar e Extrair Campos'
    },
    description: {
      es: 'Creá una función que filtre registros según una condición y extraiga solo ciertos campos.',
      en: 'Create a function that filters records based on a condition and extracts only certain fields.',
      pt: 'Crie uma função que filtre registros segundo uma condição e extraia apenas certos campos.'
    },
    theory: {
      es: `**Filtrar + proyectar campos:**

\`\`\`python
def filter_extract(records: list[dict], 
                   condition: callable,
                   fields: list[str]) -> list[dict]:
    """
    Filtra y extrae campos específicos.
    
    Args:
        records: Lista de diccionarios
        condition: Función que retorna True/False
        fields: Lista de campos a extraer
    """
    return [
        {k: r[k] for k in fields if k in r}
        for r in records
        if condition(r)
    ]

# Ejemplo:
users = [{"name": "Ana", "age": 30, "email": "ana@mail.com"}, ...]
adults = filter_extract(
    users,
    condition=lambda u: u["age"] >= 18,
    fields=["name", "email"]
)
\`\`\``,
      en: `**Filter + project fields:**

\`\`\`python
def filter_extract(records: list[dict], 
                   condition: callable,
                   fields: list[str]) -> list[dict]:
    """
    Filter and extract specific fields.
    
    Args:
        records: List of dictionaries
        condition: Function that returns True/False
        fields: List of fields to extract
    """
    return [
        {k: r[k] for k in fields if k in r}
        for r in records
        if condition(r)
    ]

# Example:
users = [{"name": "Ana", "age": 30, "email": "ana@mail.com"}, ...]
adults = filter_extract(
    users,
    condition=lambda u: u["age"] >= 18,
    fields=["name", "email"]
)
\`\`\``,
      pt: `**Filtrar + projetar campos:**

\`\`\`python
def filter_extract(records: list[dict], 
                   condition: callable,
                   fields: list[str]) -> list[dict]:
    """
    Filtra e extrai campos específicos.
    
    Args:
        records: Lista de dicionários
        condition: Função que retorna True/False
        fields: Lista de campos a extrair
    """
    return [
        {k: r[k] for k in fields if k in r}
        for r in records
        if condition(r)
    ]

# Exemplo:
users = [{"name": "Ana", "age": 30, "email": "ana@mail.com"}, ...]
adults = filter_extract(
    users,
    condition=lambda u: u["age"] >= 18,
    fields=["name", "email"]
)
\`\`\``
    },
    realWorldExample: {
      es: 'Preparar datos para reporte, extraer campos específicos.',
      en: 'Prepare data for report, extract specific fields.',
      pt: 'Preparar dados para relatório, extrair campos específicos.'
    },
    hint: {
      es: 'Combiná list comprehension con dict comprehension',
      en: 'Combine list comprehension with dict comprehension',
      pt: 'Combine list comprehension com dict comprehension'
    },
    
    starterCode: {
      es: `def filter_extract(records: list[dict], 
                   condition, fields: list[str]) -> list[dict]:
    """
    Filtra registros y extrae campos específicos.
    
    Args:
        records: Lista de diccionarios
        condition: Función lambda para filtrar
        fields: Lista de campos a extraer
        
    Returns:
        Lista filtrada con solo los campos especificados
    """
    # Tu código acá
    pass`,
      en: `def filter_extract(records: list[dict], 
                   condition, fields: list[str]) -> list[dict]:
    """
    Filter records and extract specific fields.
    
    Args:
        records: List of dictionaries
        condition: Lambda function for filtering
        fields: List of fields to extract
        
    Returns:
        Filtered list with only specified fields
    """
    # Your code here
    pass`,
      pt: `def filter_extract(records: list[dict], 
                   condition, fields: list[str]) -> list[dict]:
    """
    Filtra registros e extrai campos específicos.
    
    Args:
        records: Lista de dicionários
        condition: Função lambda para filtrar
        fields: Lista de campos a extrair
        
    Returns:
        Lista filtrada com apenas os campos especificados
    """
    # Seu código aqui
    pass`
    },
    solution: `def filter_extract(records: list[dict], 
                   condition, fields: list[str]) -> list[dict]:
    return [
        {k: r[k] for k in fields if k in r}
        for r in records
        if condition(r)
    ]`,
    testCode: `
users = [
    {"name": "Alice", "age": 25, "email": "alice@mail.com", "country": "US"},
    {"name": "Bob", "age": 17, "email": "bob@mail.com", "country": "UK"},
    {"name": "Carlos", "age": 30, "email": "carlos@mail.com", "country": "AR"},
    {"name": "Diana", "age": 15, "email": "diana@mail.com", "country": "BR"},
]

# Filtrar adultos y extraer solo name y email
result = filter_extract(users, lambda u: u["age"] >= 18, ["name", "email"])

assert len(result) == 2, f"Expected 2 adults, got {len(result)}"
assert result[0] == {"name": "Alice", "email": "alice@mail.com"}
assert result[1] == {"name": "Carlos", "email": "carlos@mail.com"}
assert "age" not in result[0], "Should not include age"
assert "country" not in result[0], "Should not include country"

print("✅ Todos los tests pasaron!")
`,
  },
  // === Error Handling in ETL ===
  {
    id: 'py-etl-x12',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'etl',
    tags: ['error handling', 'try-except', 'logging'],
    interviewFrequency: 'high',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Manejo de errores en ETL',
      en: 'Error Handling in ETL',
      pt: 'Tratamento de Erros em ETL'
    },
    description: {
      es: 'Creá una función que procese registros, capture errores individuales y retorne resultados exitosos junto con los errores.',
      en: 'Create a function that processes records, captures individual errors and returns successful results along with errors.',
      pt: 'Crie uma função que processe registros, capture erros individuais e retorne resultados bem-sucedidos junto com os erros.'
    },
    theory: {
      es: `**Error handling en pipelines ETL:**

\`\`\`python
def process_with_errors(records: list[dict], 
                        transform_fn: callable) -> tuple[list, list]:
    """
    Procesa registros capturando errores individuales.
    
    Returns:
        (successful_results, errors)
    """
    successes = []
    errors = []
    
    for i, record in enumerate(records):
        try:
            result = transform_fn(record)
            successes.append(result)
        except Exception as e:
            errors.append({
                'index': i,
                'record': record,
                'error': str(e),
                'type': type(e).__name__
            })
    
    return successes, errors
\`\`\`

**Principio:** Un registro malo no debe romper todo el pipeline.`,
      en: `**Error handling in ETL pipelines:**

\`\`\`python
def process_with_errors(records: list[dict], 
                        transform_fn: callable) -> tuple[list, list]:
    """
    Process records capturing individual errors.
    
    Returns:
        (successful_results, errors)
    """
    successes = []
    errors = []
    
    for i, record in enumerate(records):
        try:
            result = transform_fn(record)
            successes.append(result)
        except Exception as e:
            errors.append({
                'index': i,
                'record': record,
                'error': str(e),
                'type': type(e).__name__
            })
    
    return successes, errors
\`\`\`

**Principle:** One bad record shouldn't break the entire pipeline.`,
      pt: `**Tratamento de erros em pipelines ETL:**

\`\`\`python
def process_with_errors(records: list[dict], 
                        transform_fn: callable) -> tuple[list, list]:
    """
    Processa registros capturando erros individuais.
    
    Returns:
        (successful_results, errors)
    """
    successes = []
    errors = []
    
    for i, record in enumerate(records):
        try:
            result = transform_fn(record)
            successes.append(result)
        except Exception as e:
            errors.append({
                'index': i,
                'record': record,
                'error': str(e),
                'type': type(e).__name__
            })
    
    return successes, errors
\`\`\`

**Princípio:** Um registro ruim não deve quebrar todo o pipeline.`
    },
    realWorldExample: {
      es: 'Pipelines robustos que no fallan por un dato malo.',
      en: 'Robust pipelines that don\'t fail on bad data.',
      pt: 'Pipelines robustos que não falham por um dado ruim.'
    },
    hint: {
      es: 'Envolvé cada transformación en try-except y acumulá errores',
      en: 'Wrap each transformation in try-except and accumulate errors',
      pt: 'Envolva cada transformação em try-except e acumule erros'
    },
    
    starterCode: {
      es: `def process_with_errors(records: list[dict], transform_fn) -> tuple[list, list]:
    """
    Procesa registros capturando errores individuales.
    
    Args:
        records: Lista de registros a procesar
        transform_fn: Función de transformación
        
    Returns:
        Tupla (resultados_exitosos, lista_de_errores)
        Cada error tiene: index, record, error, type
    """
    # Tu código acá
    pass`,
      en: `def process_with_errors(records: list[dict], transform_fn) -> tuple[list, list]:
    """
    Process records capturing individual errors.
    
    Args:
        records: List of records to process
        transform_fn: Transformation function
        
    Returns:
        Tuple (successful_results, error_list)
        Each error has: index, record, error, type
    """
    # Your code here
    pass`,
      pt: `def process_with_errors(records: list[dict], transform_fn) -> tuple[list, list]:
    """
    Processa registros capturando erros individuais.
    
    Args:
        records: Lista de registros a processar
        transform_fn: Função de transformação
        
    Returns:
        Tupla (resultados_bem_sucedidos, lista_de_erros)
        Cada erro tem: index, record, error, type
    """
    # Seu código aqui
    pass`
    },
    solution: `def process_with_errors(records: list[dict], transform_fn) -> tuple[list, list]:
    successes = []
    errors = []
    for i, record in enumerate(records):
        try:
            result = transform_fn(record)
            successes.append(result)
        except Exception as e:
            errors.append({
                'index': i,
                'record': record,
                'error': str(e),
                'type': type(e).__name__
            })
    return successes, errors`,
    testCode: `
def risky_transform(record):
    """Puede fallar si amount es string o negativo."""
    amount = record["amount"]
    if isinstance(amount, str):
        raise ValueError("amount must be numeric")
    if amount < 0:
        raise ValueError("amount cannot be negative")
    return {"id": record["id"], "doubled": amount * 2}

records = [
    {"id": 1, "amount": 100},
    {"id": 2, "amount": "invalid"},  # Error
    {"id": 3, "amount": 200},
    {"id": 4, "amount": -50},        # Error
    {"id": 5, "amount": 300},
]

successes, errors = process_with_errors(records, risky_transform)

assert len(successes) == 3, f"Expected 3 successes, got {len(successes)}"
assert len(errors) == 2, f"Expected 2 errors, got {len(errors)}"
assert successes[0]["doubled"] == 200, "First should be doubled"
assert errors[0]["index"] == 1, "First error at index 1"
assert errors[1]["index"] == 3, "Second error at index 3"
assert "ValueError" in errors[0]["type"], "Should capture error type"

print("✅ Todos los tests pasaron!")
`,
  },
];

export default PYTHON_ETL_EXTENDED;








