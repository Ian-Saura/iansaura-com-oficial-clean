/**
 * Python ETL Exercises
 * Extraction, Transformation, Loading scenarios
 */

import { PythonExercise } from '../types';

export const PYTHON_ETL: PythonExercise[] = [
  {
    id: 'py-etl1',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['api', 'requests', 'json'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'ETL: Extracción de API',
      en: 'ETL: API Extraction',
      pt: 'ETL: Extração de API'
    },
    description: {
      es: 'Simulá una llamada a API, obtené el JSON y convertilo a DataFrame.',
      en: 'Simulate an API call, get the JSON, and convert it to a DataFrame.',
      pt: 'Simule uma chamada de API, obtenha o JSON e converta-o para DataFrame.'
    },
    theory: {
      es: `**Extracción de APIs:**

En la vida real usamos \`requests\`.

\`\`\`python
import requests
import pandas as pd

response = requests.get('https://api.example.com/data')
data = response.json()
df = pd.DataFrame(data)
\`\`\`

**Tip:** A veces el JSON está anidado y necesitás \`pd.json_normalize(data)\`.`,
      en: `**API Extraction:**

In real life we use \`requests\`.

\`\`\`python
import requests
import pandas as pd

response = requests.get('https://api.example.com/data')
data = response.json()
df = pd.DataFrame(data)
\`\`\`

**Tip:** Sometimes JSON is nested and you need \`pd.json_normalize(data)\`.`,
      pt: `**Extração de APIs:**

Na vida real usamos \`requests\`.

\`\`\`python
import requests
import pandas as pd

response = requests.get('https://api.example.com/data')
data = response.json()
df = pd.DataFrame(data)
\`\`\`

**Dica:** Às vezes o JSON está aninhado e você precisa de \`pd.json_normalize(data)\`.`
    },
    realWorldExample: {
      es: 'Ingestar datos de servicios externos (Stripe, Shopify, etc).',
      en: 'Ingest data from external services (Stripe, Shopify, etc).',
      pt: 'Ingerir dados de serviços externos (Stripe, Shopify, etc).'
    },
    hint: {
      es: 'Usá pd.DataFrame(mock_response.json())',
      en: 'Use pd.DataFrame(mock_response.json())',
      pt: 'Use pd.DataFrame(mock_response.json())'
    },
    
    starterCode: {
      es: `import pandas as pd
import json

# Simulamos la respuesta de una API
class MockResponse:
    def json(self):
        return [
            {"id": 1, "user": "Ana", "active": True},
            {"id": 2, "user": "Bob", "active": False}
        ]

response = MockResponse()

# Convertí la respuesta JSON a DataFrame
df = None

# Tu código aquí

print(df)`,
      en: `import pandas as pd
import json

# Mock API response
class MockResponse:
    def json(self):
        return [
            {"id": 1, "user": "Ana", "active": True},
            {"id": 2, "user": "Bob", "active": False}
        ]

response = MockResponse()

# Convert JSON response to DataFrame
df = None

# Your code here

print(df)`,
      pt: `import pandas as pd
import json

# Simulamos a resposta de uma API
class MockResponse:
    def json(self):
        return [
            {"id": 1, "user": "Ana", "active": True},
            {"id": 2, "user": "Bob", "active": False}
        ]

response = MockResponse()

# Converta a resposta JSON para DataFrame
df = None

# Seu código aqui

print(df)`
    },
    solution: `import pandas as pd

class MockResponse:
    def json(self):
        return [
            {"id": 1, "user": "Ana", "active": True},
            {"id": 2, "user": "Bob", "active": False}
        ]

response = MockResponse()
df = pd.DataFrame(response.json())

print(df)`,
    testCode: `
assert len(df) == 2, "Should have 2 rows"
assert 'user' in df.columns, "Should have user column"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-etl2',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['transform', 'cleaning', 'strings'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'ETL: Transformación y Limpieza',
      en: 'ETL: Transformation and Cleaning',
      pt: 'ETL: Transformação e Limpeza'
    },
    description: {
      es: 'Normalizá los emails (minúsculas, sin espacios) y extraé el dominio.',
      en: 'Normalize emails (lowercase, no spaces) and extract domain.',
      pt: 'Normalize os e-mails (minúsculas, sem espaços) e extraia o domínio.'
    },
    theory: {
      es: `**Limpieza de Strings en Pandas:**

\`\`\`python
# Acceder a métodos string con .str
df['email'] = df['email'].str.lower().str.strip()

# Split y expansión
df[['user', 'domain']] = df['email'].str.split('@', expand=True)
\`\`\``,
      en: `**String Cleaning in Pandas:**

\`\`\`python
# Access string methods with .str
df['email'] = df['email'].str.lower().str.strip()

# Split and expansion
df[['user', 'domain']] = df['email'].str.split('@', expand=True)
\`\`\``,
      pt: `**Limpeza de Strings em Pandas:**

\`\`\`python
# Acessar métodos string com .str
df['email'] = df['email'].str.lower().str.strip()

# Split e expansão
df[['user', 'domain']] = df['email'].str.split('@', expand=True)
\`\`\``
    },
    realWorldExample: {
      es: 'Limpieza de datos de usuarios, estandarización.',
      en: 'User data cleaning, standardization.',
      pt: 'Limpeza de dados de usuários, padronização.'
    },
    hint: {
      es: 'Usá .str.lower().str.strip() y luego .str.split("@", expand=True)',
      en: 'Use .str.lower().str.strip() and then .str.split("@", expand=True)',
      pt: 'Use .str.lower().str.strip() e depois .str.split("@", expand=True)'
    },
    
    starterCode: {
      es: `import pandas as pd

df = pd.DataFrame({
    'email': ['  ANA@Gmail.com ', 'bob@hotmail.COM', ' Charlie@yahoo.com']
})

# 1. Normalizá 'email' (minúsculas y trim)
# 2. Creá columna 'domain' extrayendo el dominio

# Tu código aquí

print(df)`,
      en: `import pandas as pd

df = pd.DataFrame({
    'email': ['  ANA@Gmail.com ', 'bob@hotmail.COM', ' Charlie@yahoo.com']
})

# 1. Normalize 'email' (lowercase and trim)
# 2. Create 'domain' column extracting the domain

# Your code here

print(df)`,
      pt: `import pandas as pd

df = pd.DataFrame({
    'email': ['  ANA@Gmail.com ', 'bob@hotmail.COM', ' Charlie@yahoo.com']
})

# 1. Normalize 'email' (minúsculas e trim)
# 2. Crie coluna 'domain' extraindo o domínio

# Seu código aqui

print(df)`
    },
    solution: `import pandas as pd

df = pd.DataFrame({
    'email': ['  ANA@Gmail.com ', 'bob@hotmail.COM', ' Charlie@yahoo.com']
})

df['email'] = df['email'].str.lower().str.strip()
df['domain'] = df['email'].str.split('@').str[1]

print(df)`,
    testCode: `
assert df.loc[0, 'email'] == 'ana@gmail.com', "Email should be normalized"
assert df.loc[0, 'domain'] == 'gmail.com', "Domain should be extracted"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-etl3',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'etl',
    tags: ['incremental', 'logic', 'dates'],
    interviewFrequency: 'medium',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'ETL: Carga Incremental',
      en: 'ETL: Incremental Load',
      pt: 'ETL: Carga Incremental'
    },
    description: {
      es: 'Identificá qué registros son nuevos o actualizados comparando con una fecha de corte.',
      en: 'Identify which records are new or updated by comparing with a cutoff date.',
      pt: 'Identifique quais registros são novos ou atualizados comparando com uma data de corte.'
    },
    theory: {
      es: `**Carga Incremental:**

Para no procesar todo el histórico cada vez, filtramos por fecha de modificación ("watermark").

\`\`\`python
# Convertir a datetime
df['updated_at'] = pd.to_datetime(df['updated_at'])

# Filtrar nuevos
last_run = pd.Timestamp('2023-01-01')
new_data = df[df['updated_at'] > last_run]
\`\`\``,
      en: `**Incremental Load:**

To avoid processing full history every time, we filter by modification date ("watermark").

\`\`\`python
# Convert to datetime
df['updated_at'] = pd.to_datetime(df['updated_at'])

# Filter new
last_run = pd.Timestamp('2023-01-01')
new_data = df[df['updated_at'] > last_run]
\`\`\``,
      pt: `**Carga Incremental:**

Para não processar todo o histórico a cada vez, filtramos pela data de modificação ("watermark").

\`\`\`python
# Converter para datetime
df['updated_at'] = pd.to_datetime(df['updated_at'])

# Filtrar novos
last_run = pd.Timestamp('2023-01-01')
new_data = df[df['updated_at'] > last_run]
\`\`\``
    },
    realWorldExample: {
      es: 'Pipelines diarios que solo procesan lo del día anterior.',
      en: 'Daily pipelines that only process data from the previous day.',
      pt: 'Pipelines diários que só processam o do dia anterior.'
    },
    hint: {
      es: 'Asegurate de convertir a datetime con pd.to_datetime()',
      en: 'Make sure to convert to datetime with pd.to_datetime()',
      pt: 'Certifique-se de converter para datetime com pd.to_datetime()'
    },
    
    starterCode: {
      es: `import pandas as pd

data = {
    'id': [1, 2, 3],
    'updated_at': ['2023-01-10', '2023-01-12', '2023-01-05']
}
df = pd.DataFrame(data)

# Fecha de la última ejecución
last_run_date = '2023-01-08'

# Filtrá solo los registros posteriores a last_run_date
# (Convertí a datetime primero)
incremental_df = None

# Tu código aquí

print(incremental_df)`,
      en: `import pandas as pd

data = {
    'id': [1, 2, 3],
    'updated_at': ['2023-01-10', '2023-01-12', '2023-01-05']
}
df = pd.DataFrame(data)

# Last run date
last_run_date = '2023-01-08'

# Filter only records after last_run_date
# (Convert to datetime first)
incremental_df = None

# Your code here

print(incremental_df)`,
      pt: `import pandas as pd

data = {
    'id': [1, 2, 3],
    'updated_at': ['2023-01-10', '2023-01-12', '2023-01-05']
}
df = pd.DataFrame(data)

# Data da última execução
last_run_date = '2023-01-08'

# Filtre apenas os registros posteriores a last_run_date
# (Converta para datetime primeiro)
incremental_df = None

# Seu código aqui

print(incremental_df)`
    },
    solution: `import pandas as pd

data = {
    'id': [1, 2, 3],
    'updated_at': ['2023-01-10', '2023-01-12', '2023-01-05']
}
df = pd.DataFrame(data)

df['updated_at'] = pd.to_datetime(df['updated_at'])
incremental_df = df[df['updated_at'] > pd.to_datetime('2023-01-08')]

print(incremental_df)`,
    testCode: `
assert len(incremental_df) == 2, "Should have 2 new records"
assert 3 not in incremental_df['id'].values, "ID 3 is old"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-etl4',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'etl',
    tags: ['validation', 'quality', 'assert'],
    interviewFrequency: 'medium',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Data Quality: Validación',
      en: 'Data Quality: Validation',
      pt: 'Data Quality: Validação'
    },
    description: {
      es: 'Validá que no haya nulos en columnas críticas y que los precios sean positivos.',
      en: 'Validate no nulls in critical columns and positive prices.',
      pt: 'Valide que não haja nulos em colunas críticas e que os preços sejam positivos.'
    },
    theory: {
      es: `**Validación de Datos:**

Antes de cargar datos, debemos asegurarnos que cumplan reglas.

\`\`\`python
# Verificar nulos
if df['id'].isna().any():
    raise ValueError("IDs nulos encontrados")

# Verificar rango de valores
if (df['precio'] < 0).any():
    raise ValueError("Precios negativos encontrados")
\`\`\`

Libraries útiles: \`pandera\`, \`great_expectations\`.`,
      en: `**Data Validation:**

Before loading data, we must ensure they follow rules.

\`\`\`python
# Check nulls
if df['id'].isna().any():
    raise ValueError("Null IDs found")

# Check value range
if (df['price'] < 0).any():
    raise ValueError("Negative prices found")
\`\`\`

Useful libraries: \`pandera\`, \`great_expectations\`.`,
      pt: `**Validação de Dados:**

Antes de carregar dados, devemos garantir que cumpram regras.

\`\`\`python
# Verificar nulos
if df['id'].isna().any():
    raise ValueError("IDs nulos encontrados")

# Verificar faixa de valores
if (df['preco'] < 0).any():
    raise ValueError("Preços negativos encontrados")
\`\`\`

Bibliotecas úteis: \`pandera\`, \`great_expectations\`.`
    },
    realWorldExample: {
      es: 'Evitar romper el dashboard o la app downstream con datos corruptos.',
      en: 'Avoid breaking dashboard or downstream app with corrupt data.',
      pt: 'Evitar quebrar o dashboard ou o app downstream com dados corrompidos.'
    },
    hint: {
      es: 'Usá .any() para chequear si existe al menos un caso inválido',
      en: 'Use .any() to check if at least one invalid case exists',
      pt: 'Use .any() para verificar se existe pelo menos um caso inválido'
    },
    
    starterCode: {
      es: `import pandas as pd
import numpy as np

def validate_data(df):
    """
    Retorna True si pasa las validaciones, False si falla.
    Validaciones:
    1. 'id' no debe tener nulos
    2. 'price' debe ser > 0
    """
    # Tu código aquí
    return True

# Tests
df_ok = pd.DataFrame({'id': [1, 2], 'price': [10, 20]})
df_null = pd.DataFrame({'id': [1, np.nan], 'price': [10, 20]})
df_neg = pd.DataFrame({'id': [1, 2], 'price': [10, -5]})

print(f"OK: {validate_data(df_ok)}")
print(f"Null Fail: {validate_data(df_null)}")
print(f"Neg Fail: {validate_data(df_neg)}")`,
      en: `import pandas as pd
import numpy as np

def validate_data(df):
    """
    Returns True if checks pass, False if fails.
    Checks:
    1. 'id' must not have nulls
    2. 'price' must be > 0
    """
    # Your code here
    return True

# Tests
df_ok = pd.DataFrame({'id': [1, 2], 'price': [10, 20]})
df_null = pd.DataFrame({'id': [1, np.nan], 'price': [10, 20]})
df_neg = pd.DataFrame({'id': [1, 2], 'price': [10, -5]})

print(f"OK: {validate_data(df_ok)}")
print(f"Null Fail: {validate_data(df_null)}")
print(f"Neg Fail: {validate_data(df_neg)}")`,
      pt: `import pandas as pd
import numpy as np

def validate_data(df):
    """
    Retorna True se passa as validações, False se falha.
    Validações:
    1. 'id' não deve ter nulos
    2. 'price' deve ser > 0
    """
    # Seu código aqui
    return True

# Testes
df_ok = pd.DataFrame({'id': [1, 2], 'price': [10, 20]})
df_null = pd.DataFrame({'id': [1, np.nan], 'price': [10, 20]})
df_neg = pd.DataFrame({'id': [1, 2], 'price': [10, -5]})

print(f"OK: {validate_data(df_ok)}")
print(f"Null Fail: {validate_data(df_null)}")
print(f"Neg Fail: {validate_data(df_neg)}")`
    },
    solution: `import pandas as pd
import numpy as np

def validate_data(df):
    if df['id'].isna().any():
        return False
    if (df['price'] <= 0).any():
        return False
    return True

df_ok = pd.DataFrame({'id': [1, 2], 'price': [10, 20]})
df_null = pd.DataFrame({'id': [1, np.nan], 'price': [10, 20]})
df_neg = pd.DataFrame({'id': [1, 2], 'price': [10, -5]})

print(f"OK: {validate_data(df_ok)}")
print(f"Null Fail: {validate_data(df_null)}")
print(f"Neg Fail: {validate_data(df_neg)}")`,
    testCode: `
assert validate_data(df_ok) == True
assert validate_data(df_null) == False
assert validate_data(df_neg) == False
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-etl5',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'etl',
    tags: ['upsert', 'merge', 'logic'],
    interviewFrequency: 'medium',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'ETL: Upsert (Merge)',
      en: 'ETL: Upsert (Merge)',
      pt: 'ETL: Upsert (Merge)'
    },
    description: {
      es: 'Actualizá una tabla "target" con datos de "source". Si existe el ID actualizá, si no insertá.',
      en: 'Update a "target" table with "source" data. If ID exists update, else insert.',
      pt: 'Atualize uma tabela "target" com dados de "source". Se o ID existir atualize, senão insira.'
    },
    theory: {
      es: `**Upsert (Update + Insert):**

Estrategia común en Pandas:
1. Identificar registros nuevos (Insert)
2. Identificar registros existentes (Update)
3. Concatenar todo

\`\`\`python
# IDs en source
source_ids = source['id']

# Separar target en: a actualizar y no tocados
target_update = target[target['id'].isin(source_ids)] # (A veces se descarta y se usa source directo)
target_keep = target[~target['id'].isin(source_ids)]

# Resultado: Lo que mantengo + Lo nuevo/actualizado del source
final_df = pd.concat([target_keep, source])
\`\`\``,
      en: `**Upsert (Update + Insert):**

Common strategy in Pandas:
1. Identify new records (Insert)
2. Identify existing records (Update)
3. Concatenate everything

\`\`\`python
# IDs in source
source_ids = source['id']

# Separate target into: to update and untouched
target_update = target[target['id'].isin(source_ids)] # (Sometimes discarded and source used directly)
target_keep = target[~target['id'].isin(source_ids)]

# Result: What I keep + New/updated from source
final_df = pd.concat([target_keep, source])
\`\`\``,
      pt: `**Upsert (Update + Insert):**

Estratégia comum em Pandas:
1. Identificar registros novos (Insert)
2. Identificar registros existentes (Update)
3. Concatenar tudo

\`\`\`python
# IDs em source
source_ids = source['id']

# Separar target em: a atualizar e não tocados
target_update = target[target['id'].isin(source_ids)] # (Às vezes descartado e source usado direto)
target_keep = target[~target['id'].isin(source_ids)]

# Resultado: O que mantenho + Novo/atualizado do source
final_df = pd.concat([target_keep, source])
\`\`\``
    },
    realWorldExample: {
      es: 'Sincronizar bases de datos, actualizar dimensiones.',
      en: 'Synchronize databases, update dimensions.',
      pt: 'Sincronizar bancos de dados, atualizar dimensões.'
    },
    hint: {
      es: 'Eliminá del target los IDs que vienen en source, luego concatená source',
      en: 'Remove from target IDs coming in source, then concatenate source',
      pt: 'Remova do target os IDs que vêm em source, depois concatene source'
    },
    
    starterCode: {
      es: `import pandas as pd

target = pd.DataFrame({
    'id': [1, 2, 3],
    'val': ['old_1', 'old_2', 'old_3']
})

source = pd.DataFrame({
    'id': [2, 4],        # 2 actualiza, 4 inserta
    'val': ['new_2', 'new_4']
})

# Realizá el upsert: 
# target final debe tener id 1 (old), 2 (new), 3 (old), 4 (new)
final_df = None

# Tu código aquí

print(final_df.sort_values('id'))`,
      en: `import pandas as pd

target = pd.DataFrame({
    'id': [1, 2, 3],
    'val': ['old_1', 'old_2', 'old_3']
})

source = pd.DataFrame({
    'id': [2, 4],        # 2 updates, 4 inserts
    'val': ['new_2', 'new_4']
})

# Perform upsert: 
# final target should have id 1 (old), 2 (new), 3 (old), 4 (new)
final_df = None

# Your code here

print(final_df.sort_values('id'))`,
      pt: `import pandas as pd

target = pd.DataFrame({
    'id': [1, 2, 3],
    'val': ['old_1', 'old_2', 'old_3']
})

source = pd.DataFrame({
    'id': [2, 4],        # 2 atualiza, 4 insere
    'val': ['new_2', 'new_4']
})

# Realize o upsert: 
# target final deve ter id 1 (old), 2 (new), 3 (old), 4 (new)
final_df = None

# Seu código aqui

print(final_df.sort_values('id'))`
    },
    solution: `import pandas as pd

target = pd.DataFrame({
    'id': [1, 2, 3],
    'val': ['old_1', 'old_2', 'old_3']
})

source = pd.DataFrame({
    'id': [2, 4],
    'val': ['new_2', 'new_4']
})

# Mantener filas de target que NO están en source
target_keep = target[~target['id'].isin(source['id'])]

# Concatenar con source (que tiene updates y inserts)
final_df = pd.concat([target_keep, source])

print(final_df.sort_values('id'))`,
    testCode: `
final_sorted = final_df.sort_values('id').reset_index(drop=True)
assert len(final_sorted) == 4, "Should have 4 rows"
assert final_sorted.loc[1, 'val'] == 'new_2', "ID 2 should be updated"
assert final_sorted.loc[3, 'val'] == 'new_4', "ID 4 should be inserted"
print("✅ ¡Correcto!")
`,
  },
];

export default PYTHON_ETL;
