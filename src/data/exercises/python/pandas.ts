/**
 * Python Pandas Exercises
 * Data manipulation, analysis, cleaning
 */

import { PythonExercise } from '../types';

export const PYTHON_PANDAS: PythonExercise[] = [
  {
    id: 'py-pd1',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'csv', 'read_csv'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'Pandas: Cargar CSV',
      en: 'Pandas: Load CSV',
      pt: 'Pandas: Carregar CSV'
    },
    description: {
      es: 'Cargá un archivo CSV en un DataFrame y mostrá las primeras 5 filas.',
      en: 'Load a CSV file into a DataFrame and show the first 5 rows.',
      pt: 'Carregue um arquivo CSV em um DataFrame e mostre as primeiras 5 linhas.'
    },
    theory: {
      es: `**Pandas read_csv:**

\`\`\`python
import pandas as pd

# Cargar CSV
df = pd.read_csv('archivo.csv')

# Ver primeras filas
df.head()      # Default 5
df.head(10)    # Primeras 10

# Ver info general
df.info()
df.describe()
\`\`\``,
      en: `**Pandas read_csv:**

\`\`\`python
import pandas as pd

# Load CSV
df = pd.read_csv('file.csv')

# View first rows
df.head()      # Default 5
df.head(10)    # First 10

# View general info
df.info()
df.describe()
\`\`\``,
      pt: `**Pandas read_csv:**

\`\`\`python
import pandas as pd

# Carregar CSV
df = pd.read_csv('arquivo.csv')

# Ver primeiras linhas
df.head()      # Padrão 5
df.head(10)    # Primeiras 10

# Ver informações gerais
df.info()
df.describe()
\`\`\``
    },
    realWorldExample: {
      es: 'Paso inicial de cualquier análisis de datos.',
      en: 'Initial step of any data analysis.',
      pt: 'Passo inicial de qualquer análise de dados.'
    },
    hint: {
      es: 'Usá pd.read_csv() y df.head()',
      en: 'Use pd.read_csv() and df.head()',
      pt: 'Use pd.read_csv() e df.head()'
    },
    
    starterCode: {
      es: `import pandas as pd
import io

# Simulamos un archivo CSV
csv_content = """id,name,age,city
1,Ana,28,Madrid
2,Bob,34,London
3,Charlie,22,New York
4,Diana,31,Paris
5,Eve,26,Berlin
6,Frank,40,Rome"""

# Convertimos string a "archivo"
csv_file = io.StringIO(csv_content)

# Cargá el CSV en un DataFrame llamado 'df'
# Tu código aquí

# Mostrá las primeras 5 filas
print(df.head())`,
      en: `import pandas as pd
import io

# Simulate a CSV file
csv_content = """id,name,age,city
1,Ana,28,Madrid
2,Bob,34,London
3,Charlie,22,New York
4,Diana,31,Paris
5,Eve,26,Berlin
6,Frank,40,Rome"""

# Convert string to "file"
csv_file = io.StringIO(csv_content)

# Load CSV into a DataFrame named 'df'
# Your code here

# Show first 5 rows
print(df.head())`,
      pt: `import pandas as pd
import io

# Simulamos um arquivo CSV
csv_content = """id,name,age,city
1,Ana,28,Madrid
2,Bob,34,London
3,Charlie,22,New York
4,Diana,31,Paris
5,Eve,26,Berlin
6,Frank,40,Rome"""

# Convertemos string para "arquivo"
csv_file = io.StringIO(csv_content)

# Carregue o CSV em um DataFrame chamado 'df'
# Seu código aqui

# Mostre as primeiras 5 linhas
print(df.head())`
    },
    solution: `import pandas as pd
import io

csv_content = """id,name,age,city
1,Ana,28,Madrid
2,Bob,34,London
3,Charlie,22,New York
4,Diana,31,Paris
5,Eve,26,Berlin
6,Frank,40,Rome"""

csv_file = io.StringIO(csv_content)
df = pd.read_csv(csv_file)

print(df.head())`,
    testCode: `
assert isinstance(df, pd.DataFrame), "df should be a DataFrame"
assert len(df) == 6, "Should have 6 rows"
assert list(df.columns) == ['id', 'name', 'age', 'city'], "Columns should match"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd2',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'filter', 'loc'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'Pandas: Filtrar datos',
      en: 'Pandas: Filter Data',
      pt: 'Pandas: Filtrar dados'
    },
    description: {
      es: 'Filtrá el DataFrame para obtener solo las personas mayores de 30 años.',
      en: 'Filter the DataFrame to get only people older than 30.',
      pt: 'Filtre o DataFrame para obter apenas pessoas com mais de 30 anos.'
    },
    theory: {
      es: `**Filtrado en Pandas:**

\`\`\`python
# Filtrar por condición booleana
adultos = df[df['edad'] >= 18]

# Múltiples condiciones (usar paréntesis y & |)
filtro = df[(df['edad'] > 18) & (df['ciudad'] == 'Madrid')]

# query() method (estilo SQL)
df.query("edad > 18 and ciudad == 'Madrid'")
\`\`\``,
      en: `**Filtering in Pandas:**

\`\`\`python
# Filter by boolean condition
adults = df[df['age'] >= 18]

# Multiple conditions (use parentheses and & |)
filter = df[(df['age'] > 18) & (df['city'] == 'Madrid')]

# query() method (SQL style)
df.query("age > 18 and city == 'Madrid'")
\`\`\``,
      pt: `**Filtragem em Pandas:**

\`\`\`python
# Filtrar por condição booleana
adultos = df[df['idade'] >= 18]

# Múltiplas condições (usar parênteses e & |)
filtro = df[(df['idade'] > 18) & (df['cidade'] == 'Madrid')]

# Método query() (estilo SQL)
df.query("idade > 18 and cidade == 'Madrid'")
\`\`\``
    },
    realWorldExample: {
      es: 'Segmentación de usuarios, limpieza de outliers.',
      en: 'User segmentation, outlier cleaning.',
      pt: 'Segmentação de usuários, limpeza de outliers.'
    },
    hint: {
      es: 'Usá df[df["age"] > 30]',
      en: 'Use df[df["age"] > 30]',
      pt: 'Use df[df["age"] > 30]'
    },
    
    starterCode: {
      es: `import pandas as pd

data = {
    'name': ['Ana', 'Bob', 'Charlie', 'Diana', 'Frank'],
    'age': [28, 34, 22, 31, 40],
    'city': ['Madrid', 'London', 'NY', 'Paris', 'Rome']
}
df = pd.DataFrame(data)

# Filtrá personas mayores de 30
mayores_30 = None # Tu código aquí

print(mayores_30)`,
      en: `import pandas as pd

data = {
    'name': ['Ana', 'Bob', 'Charlie', 'Diana', 'Frank'],
    'age': [28, 34, 22, 31, 40],
    'city': ['Madrid', 'London', 'NY', 'Paris', 'Rome']
}
df = pd.DataFrame(data)

# Filter people older than 30
over_30 = None # Your code here

print(over_30)`,
      pt: `import pandas as pd

data = {
    'name': ['Ana', 'Bob', 'Charlie', 'Diana', 'Frank'],
    'age': [28, 34, 22, 31, 40],
    'city': ['Madrid', 'London', 'NY', 'Paris', 'Rome']
}
df = pd.DataFrame(data)

# Filtre pessoas maiores de 30
maiores_30 = None # Seu código aqui

print(maiores_30)`
    },
    solution: `import pandas as pd

data = {
    'name': ['Ana', 'Bob', 'Charlie', 'Diana', 'Frank'],
    'age': [28, 34, 22, 31, 40],
    'city': ['Madrid', 'London', 'NY', 'Paris', 'Rome']
}
df = pd.DataFrame(data)

mayores_30 = df[df['age'] > 30]

print(mayores_30)`,
    testCode: `
assert len(mayores_30) == 3, "Should have 3 people > 30"
assert 34 in mayores_30['age'].values, "Should include 34"
assert 22 not in mayores_30['age'].values, "Should not include 22"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd3',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'groupby', 'aggregation'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Pandas: GroupBy y Agregación',
      en: 'Pandas: GroupBy and Aggregation',
      pt: 'Pandas: GroupBy e Agregação'
    },
    description: {
      es: 'Calculá el salario promedio por departamento.',
      en: 'Calculate the average salary per department.',
      pt: 'Calcule o salário médio por departamento.'
    },
    theory: {
      es: `**GroupBy en Pandas:**

Es similar al \`GROUP BY\` de SQL.

\`\`\`python
# Agrupar y calcular media
df.groupby('departamento')['salario'].mean()

# Múltiples agregaciones
df.groupby('depto').agg({
    'salario': ['mean', 'max'],
    'edad': 'min'
})

# Reset index para volver a DataFrame plano
df.groupby('depto').mean().reset_index()
\`\`\``,
      en: `**GroupBy in Pandas:**

Similar to SQL \`GROUP BY\`.

\`\`\`python
# Group and calculate mean
df.groupby('department')['salary'].mean()

# Multiple aggregations
df.groupby('dept').agg({
    'salary': ['mean', 'max'],
    'age': 'min'
})

# Reset index to get flat DataFrame
df.groupby('dept').mean().reset_index()
\`\`\``,
      pt: `**GroupBy em Pandas:**

Semelhante ao \`GROUP BY\` do SQL.

\`\`\`python
# Agrupar e calcular média
df.groupby('departamento')['salario'].mean()

# Múltiplas agregações
df.groupby('depto').agg({
    'salario': ['mean', 'max'],
    'edad': 'min'
})

# Reset index para voltar a DataFrame plano
df.groupby('depto').mean().reset_index()
\`\`\``
    },
    realWorldExample: {
      es: 'Reportes de ventas por región, métricas por equipo.',
      en: 'Sales reports by region, metrics by team.',
      pt: 'Relatórios de vendas por região, métricas por equipe.'
    },
    hint: {
      es: 'Usá groupby("department")["salary"].mean()',
      en: 'Use groupby("department")["salary"].mean()',
      pt: 'Use groupby("department")["salary"].mean()'
    },
    
    starterCode: {
      es: `import pandas as pd

data = {
    'department': ['IT', 'HR', 'IT', 'Sales', 'HR', 'IT'],
    'employee': ['A', 'B', 'C', 'D', 'E', 'F'],
    'salary': [5000, 4000, 5200, 6000, 4200, 5100]
}
df = pd.DataFrame(data)

# Calculá el salario promedio por departamento (df resultante debe tener 'department' y 'salary')
# Tip: usá reset_index() al final
avg_salary = None

print(avg_salary)`,
      en: `import pandas as pd

data = {
    'department': ['IT', 'HR', 'IT', 'Sales', 'HR', 'IT'],
    'employee': ['A', 'B', 'C', 'D', 'E', 'F'],
    'salary': [5000, 4000, 5200, 6000, 4200, 5100]
}
df = pd.DataFrame(data)

# Calculate average salary per department (result df should have 'department' and 'salary')
# Tip: use reset_index() at the end
avg_salary = None

print(avg_salary)`,
      pt: `import pandas as pd

data = {
    'department': ['IT', 'HR', 'IT', 'Sales', 'HR', 'IT'],
    'employee': ['A', 'B', 'C', 'D', 'E', 'F'],
    'salary': [5000, 4000, 5200, 6000, 4200, 5100]
}
df = pd.DataFrame(data)

# Calcule o salário médio por departamento (df resultante deve ter 'department' e 'salary')
# Dica: use reset_index() no final
avg_salary = None

print(avg_salary)`
    },
    solution: `import pandas as pd

data = {
    'department': ['IT', 'HR', 'IT', 'Sales', 'HR', 'IT'],
    'employee': ['A', 'B', 'C', 'D', 'E', 'F'],
    'salary': [5000, 4000, 5200, 6000, 4200, 5100]
}
df = pd.DataFrame(data)

avg_salary = df.groupby('department')['salary'].mean().reset_index()

print(avg_salary)`,
    testCode: `
assert len(avg_salary) == 3, "Should have 3 departments"
it_avg = avg_salary[avg_salary['department'] == 'IT']['salary'].values[0]
assert int(it_avg) == 5100, f"IT average should be 5100, got {it_avg}"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd4',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'fillna', 'dropna', 'cleaning'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Pandas: Manejo de Nulos',
      en: 'Pandas: Handling Nulls',
      pt: 'Pandas: Tratamento de Nulos'
    },
    description: {
      es: 'Rellená los valores nulos de la columna "score" con el promedio de esa columna.',
      en: 'Fill null values in "score" column with the mean of that column.',
      pt: 'Preencha os valores nulos da coluna "score" com a média dessa coluna.'
    },
    theory: {
      es: `**Manejo de Nulos (NaN):**

\`\`\`python
# Detectar nulos
df.isna().sum()

# Eliminar filas con nulos
df.dropna()

# Rellenar nulos con valor fijo
df.fillna(0)

# Rellenar con la media/mediana
mean_val = df['col'].mean()
df['col'] = df['col'].fillna(mean_val)
\`\`\``,
      en: `**Handling Nulls (NaN):**

\`\`\`python
# Detect nulls
df.isna().sum()

# Drop rows with nulls
df.dropna()

# Fill nulls with fixed value
df.fillna(0)

# Fill with mean/median
mean_val = df['col'].mean()
df['col'] = df['col'].fillna(mean_val)
\`\`\``,
      pt: `**Tratamento de Nulos (NaN):**

\`\`\`python
# Detectar nulos
df.isna().sum()

# Eliminar linhas com nulos
df.dropna()

# Preencher nulos com valor fixo
df.fillna(0)

# Preencher com a média/mediana
mean_val = df['col'].mean()
df['col'] = df['col'].fillna(mean_val)
\`\`\``
    },
    realWorldExample: {
      es: 'Imputación de datos faltantes antes de entrenar modelos ML.',
      en: 'Imputation of missing data before training ML models.',
      pt: 'Imputação de dados faltantes antes de treinar modelos ML.'
    },
    hint: {
      es: 'Calculá df["score"].mean() y luego usá fillna()',
      en: 'Calculate df["score"].mean() and then use fillna()',
      pt: 'Calcule df["score"].mean() e depois use fillna()'
    },
    
    starterCode: {
      es: `import pandas as pd
import numpy as np

data = {
    'student': ['A', 'B', 'C', 'D', 'E'],
    'score': [85, np.nan, 90, np.nan, 75]
}
df = pd.DataFrame(data)

# 1. Calculá el promedio de 'score'
# 2. Rellená los NaNs con ese promedio
mean_score = None
df_filled = df.copy()

# Tu código aquí

print(df_filled)`,
      en: `import pandas as pd
import numpy as np

data = {
    'student': ['A', 'B', 'C', 'D', 'E'],
    'score': [85, np.nan, 90, np.nan, 75]
}
df = pd.DataFrame(data)

# 1. Calculate 'score' mean
# 2. Fill NaNs with that mean
mean_score = None
df_filled = df.copy()

# Your code here

print(df_filled)`,
      pt: `import pandas as pd
import numpy as np

data = {
    'student': ['A', 'B', 'C', 'D', 'E'],
    'score': [85, np.nan, 90, np.nan, 75]
}
df = pd.DataFrame(data)

# 1. Calcule a média de 'score'
# 2. Preencha os NaNs com essa média
mean_score = None
df_filled = df.copy()

# Seu código aqui

print(df_filled)`
    },
    solution: `import pandas as pd
import numpy as np

data = {
    'student': ['A', 'B', 'C', 'D', 'E'],
    'score': [85, np.nan, 90, np.nan, 75]
}
df = pd.DataFrame(data)

mean_score = df['score'].mean()
df_filled = df.copy()
df_filled['score'] = df_filled['score'].fillna(mean_score)

print(df_filled)`,
    testCode: `
assert df_filled['score'].isna().sum() == 0, "Should have no NaNs"
expected_mean = (85 + 90 + 75) / 3
assert abs(df_filled.loc[1, 'score'] - expected_mean) < 0.01, "NaN should be filled with mean"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd5',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'columns', 'transform'],
    interviewFrequency: 'medium',
    xpReward: 15,
    coinsReward: 5,
    
    title: {
      es: 'Pandas: Crear columnas',
      en: 'Pandas: Create Columns',
      pt: 'Pandas: Criar colunas'
    },
    description: {
      es: 'Creá una columna "total" multiplicando "price" por "quantity".',
      en: 'Create a "total" column by multiplying "price" by "quantity".',
      pt: 'Crie uma coluna "total" multiplicando "price" por "quantity".'
    },
    theory: {
      es: `**Crear/Modificar Columnas:**

En Pandas las operaciones son vectorizadas (se aplican a toda la columna a la vez).

\`\`\`python
# Operación aritmética directa
df['total'] = df['precio'] * df['cantidad']

# Con constante
df['iva'] = df['total'] * 0.21

# Strings
df['nombre_completo'] = df['nombre'] + ' ' + df['apellido']
\`\`\``,
      en: `**Create/Modify Columns:**

In Pandas operations are vectorized (applied to the whole column at once).

\`\`\`python
# Direct arithmetic operation
df['total'] = df['price'] * df['quantity']

# With constant
df['tax'] = df['total'] * 0.21

# Strings
df['full_name'] = df['first_name'] + ' ' + df['last_name']
\`\`\``,
      pt: `**Criar/Modificar Colunas:**

Em Pandas as operações são vetorizadas (aplicam-se a toda a coluna de uma vez).

\`\`\`python
# Operação aritmética direta
df['total'] = df['preco'] * df['quantidade']

# Com constante
df['imposto'] = df['total'] * 0.21

# Strings
df['nome_completo'] = df['nome'] + ' ' + df['sobrenome']
\`\`\``
    },
    realWorldExample: {
      es: 'Calcular métricas derivadas, feature engineering.',
      en: 'Calculate derived metrics, feature engineering.',
      pt: 'Calcular métricas derivadas, feature engineering.'
    },
    hint: {
      es: 'Usá df["total"] = df["price"] * df["quantity"]',
      en: 'Use df["total"] = df["price"] * df["quantity"]',
      pt: 'Use df["total"] = df["price"] * df["quantity"]'
    },
    
    starterCode: {
      es: `import pandas as pd

data = {
    'product': ['A', 'B', 'C'],
    'price': [10.0, 20.0, 15.0],
    'quantity': [5, 2, 10]
}
df = pd.DataFrame(data)

# Creá la columna 'total'
# Tu código aquí

print(df)`,
      en: `import pandas as pd

data = {
    'product': ['A', 'B', 'C'],
    'price': [10.0, 20.0, 15.0],
    'quantity': [5, 2, 10]
}
df = pd.DataFrame(data)

# Create 'total' column
# Your code here

print(df)`,
      pt: `import pandas as pd

data = {
    'product': ['A', 'B', 'C'],
    'price': [10.0, 20.0, 15.0],
    'quantity': [5, 2, 10]
}
df = pd.DataFrame(data)

# Crie a coluna 'total'
# Seu código aqui

print(df)`
    },
    solution: `import pandas as pd

data = {
    'product': ['A', 'B', 'C'],
    'price': [10.0, 20.0, 15.0],
    'quantity': [5, 2, 10]
}
df = pd.DataFrame(data)

df['total'] = df['price'] * df['quantity']

print(df)`,
    testCode: `
assert 'total' in df.columns, "Should have 'total' column"
assert df.loc[0, 'total'] == 50.0, "First total should be 50.0"
assert df.loc[2, 'total'] == 150.0, "Last total should be 150.0"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd6',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'merge', 'join'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Pandas: Merge / Join',
      en: 'Pandas: Merge / Join',
      pt: 'Pandas: Merge / Join'
    },
    description: {
      es: 'Uní dos DataFrames (ventas y productos) usando el product_id.',
      en: 'Merge two DataFrames (sales and products) using product_id.',
      pt: 'Junte dois DataFrames (vendas e produtos) usando product_id.'
    },
    theory: {
      es: `**Merge (Joins) en Pandas:**

\`\`\`python
# Inner join (default)
merged = pd.merge(ventas, productos, on='product_id')

# Left join
merged = pd.merge(ventas, productos, on='product_id', how='left')

# Si las columnas tienen nombres distintos
pd.merge(df1, df2, left_on='id_prod', right_on='id')
\`\`\``,
      en: `**Merge (Joins) in Pandas:**

\`\`\`python
# Inner join (default)
merged = pd.merge(sales, products, on='product_id')

# Left join
merged = pd.merge(sales, products, on='product_id', how='left')

# If columns have different names
pd.merge(df1, df2, left_on='id_prod', right_on='id')
\`\`\``,
      pt: `**Merge (Joins) em Pandas:**

\`\`\`python
# Inner join (padrão)
merged = pd.merge(vendas, produtos, on='product_id')

# Left join
merged = pd.merge(vendas, produtos, on='product_id', how='left')

# Se as colunas tiverem nomes diferentes
pd.merge(df1, df2, left_on='id_prod', right_on='id')
\`\`\``
    },
    realWorldExample: {
      es: 'Enriquecer tablas de hechos con dimensiones.',
      en: 'Enrich fact tables with dimensions.',
      pt: 'Enriquecer tabelas de fatos com dimensões.'
    },
    hint: {
      es: 'Usá pd.merge(sales, products, on="product_id", how="left")',
      en: 'Use pd.merge(sales, products, on="product_id", how="left")',
      pt: 'Use pd.merge(sales, products, on="product_id", how="left")'
    },
    
    starterCode: {
      es: `import pandas as pd

sales = pd.DataFrame({
    'sale_id': [1, 2, 3],
    'product_id': [101, 102, 101],
    'amount': [1, 2, 1]
})

products = pd.DataFrame({
    'product_id': [101, 102],
    'product_name': ['Apple', 'Banana']
})

# Hacé un merge para traer el nombre del producto a sales
# Usá how='left'
sales_enriched = None

print(sales_enriched)`,
      en: `import pandas as pd

sales = pd.DataFrame({
    'sale_id': [1, 2, 3],
    'product_id': [101, 102, 101],
    'amount': [1, 2, 1]
})

products = pd.DataFrame({
    'product_id': [101, 102],
    'product_name': ['Apple', 'Banana']
})

# Merge to bring product name to sales
# Use how='left'
sales_enriched = None

print(sales_enriched)`,
      pt: `import pandas as pd

sales = pd.DataFrame({
    'sale_id': [1, 2, 3],
    'product_id': [101, 102, 101],
    'amount': [1, 2, 1]
})

products = pd.DataFrame({
    'product_id': [101, 102],
    'product_name': ['Apple', 'Banana']
})

# Faça um merge para trazer o nome do produto para sales
# Use how='left'
sales_enriched = None

print(sales_enriched)`
    },
    solution: `import pandas as pd

sales = pd.DataFrame({
    'sale_id': [1, 2, 3],
    'product_id': [101, 102, 101],
    'amount': [1, 2, 1]
})

products = pd.DataFrame({
    'product_id': [101, 102],
    'product_name': ['Apple', 'Banana']
})

sales_enriched = pd.merge(sales, products, on='product_id', how='left')

print(sales_enriched)`,
    testCode: `
assert 'product_name' in sales_enriched.columns, "Should include product_name"
assert len(sales_enriched) == 3, "Should keep all sales rows"
assert sales_enriched.loc[0, 'product_name'] == 'Apple', "First sale should be Apple"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd7',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'pivot', 'reshape'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Pandas: Pivot Table',
      en: 'Pandas: Pivot Table',
      pt: 'Pandas: Pivot Table'
    },
    description: {
      es: 'Creá una tabla pivote que muestre el total de ventas por "fecha" y "producto".',
      en: 'Create a pivot table showing total sales by "date" and "product".',
      pt: 'Crie uma tabela dinâmica que mostre o total de vendas por "data" e "produto".'
    },
    theory: {
      es: `**Pivot Tables:**

Transforma filas en columnas para reportes.

\`\`\`python
df.pivot_table(
    index='fecha',         # Filas
    columns='producto',    # Columnas
    values='ventas',       # Qué sumar
    aggfunc='sum'          # Función (sum, mean, count)
)
\`\`\``,
      en: `**Pivot Tables:**

Transforms rows into columns for reporting.

\`\`\`python
df.pivot_table(
    index='date',          # Rows
    columns='product',     # Columns
    values='sales',        # What to sum
    aggfunc='sum'          # Function (sum, mean, count)
)
\`\`\``,
      pt: `**Pivot Tables:**

Transforma linhas em colunas para relatórios.

\`\`\`python
df.pivot_table(
    index='data',          # Linhas
    columns='produto',     # Colunas
    values='vendas',       # O que somar
    aggfunc='sum'          # Função (sum, mean, count)
)
\`\`\``
    },
    realWorldExample: {
      es: 'Crear reportes cruzados para Excel o Dashboards.',
      en: 'Create cross-tabs for Excel or Dashboards.',
      pt: 'Criar relatórios cruzados para Excel ou Dashboards.'
    },
    hint: {
      es: 'Usá pivot_table con index="date", columns="product", values="sales"',
      en: 'Use pivot_table with index="date", columns="product", values="sales"',
      pt: 'Use pivot_table com index="date", columns="product", values="sales"'
    },
    
    starterCode: {
      es: `import pandas as pd

data = {
    'date': ['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02'],
    'product': ['A', 'B', 'A', 'B'],
    'sales': [100, 200, 150, 250]
}
df = pd.DataFrame(data)

# Pivot table: fechas en filas, productos en columnas, suma de ventas
pivot_df = None

print(pivot_df)`,
      en: `import pandas as pd

data = {
    'date': ['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02'],
    'product': ['A', 'B', 'A', 'B'],
    'sales': [100, 200, 150, 250]
}
df = pd.DataFrame(data)

# Pivot table: dates in rows, products in columns, sum of sales
pivot_df = None

print(pivot_df)`,
      pt: `import pandas as pd

data = {
    'date': ['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02'],
    'product': ['A', 'B', 'A', 'B'],
    'sales': [100, 200, 150, 250]
}
df = pd.DataFrame(data)

# Pivot table: datas nas linhas, produtos nas colunas, soma de vendas
pivot_df = None

print(pivot_df)`
    },
    solution: `import pandas as pd

data = {
    'date': ['2023-01-01', '2023-01-01', '2023-01-02', '2023-01-02'],
    'product': ['A', 'B', 'A', 'B'],
    'sales': [100, 200, 150, 250]
}
df = pd.DataFrame(data)

pivot_df = df.pivot_table(index='date', columns='product', values='sales', aggfunc='sum')

print(pivot_df)`,
    testCode: `
assert 'A' in pivot_df.columns and 'B' in pivot_df.columns, "Should have columns A and B"
assert len(pivot_df) == 2, "Should have 2 dates"
assert pivot_df.loc['2023-01-01', 'A'] == 100, "Value check failed"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd8',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'rolling', 'window'],
    interviewFrequency: 'medium',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Pandas: Rolling Window',
      en: 'Pandas: Rolling Window',
      pt: 'Pandas: Rolling Window'
    },
    description: {
      es: 'Calculá el promedio móvil de 3 días para la columna "ventas".',
      en: 'Calculate the 3-day moving average for the "sales" column.',
      pt: 'Calcule a média móvel de 3 dias para a coluna "vendas".'
    },
    theory: {
      es: `**Rolling Windows:**

Usado para series de tiempo (suavizar curvas).

\`\`\`python
# Media móvil de 3 periodos
df['ma_3'] = df['ventas'].rolling(window=3).mean()

# Suma acumulada
df['cumsum'] = df['ventas'].cumsum()
\`\`\``,
      en: `**Rolling Windows:**

Used for time series (smoothing curves).

\`\`\`python
# 3-period moving average
df['ma_3'] = df['sales'].rolling(window=3).mean()

# Cumulative sum
df['cumsum'] = df['sales'].cumsum()
\`\`\``,
      pt: `**Rolling Windows:**

Usado para séries temporais (suavizar curvas).

\`\`\`python
# Média móvel de 3 períodos
df['ma_3'] = df['vendas'].rolling(window=3).mean()

# Soma acumulada
df['cumsum'] = df['vendas'].cumsum()
\`\`\``
    },
    realWorldExample: {
      es: 'Análisis de tendencias en bolsa, métricas semanales.',
      en: 'Stock trend analysis, weekly metrics.',
      pt: 'Análise de tendências na bolsa, métricas semanais.'
    },
    hint: {
      es: 'Usá rolling(window=3).mean()',
      en: 'Use rolling(window=3).mean()',
      pt: 'Use rolling(window=3).mean()'
    },
    
    starterCode: {
      es: `import pandas as pd

data = {
    'day': [1, 2, 3, 4, 5],
    'sales': [10, 20, 30, 40, 50]
}
df = pd.DataFrame(data)

# Calculá la media móvil de 3 días
df['moving_avg'] = None

# Tu código aquí

print(df)`,
      en: `import pandas as pd

data = {
    'day': [1, 2, 3, 4, 5],
    'sales': [10, 20, 30, 40, 50]
}
df = pd.DataFrame(data)

# Calculate 3-day moving average
df['moving_avg'] = None

# Your code here

print(df)`,
      pt: `import pandas as pd

data = {
    'day': [1, 2, 3, 4, 5],
    'sales': [10, 20, 30, 40, 50]
}
df = pd.DataFrame(data)

# Calcule a média móvel de 3 dias
df['moving_avg'] = None

# Seu código aqui

print(df)`
    },
    solution: `import pandas as pd

data = {
    'day': [1, 2, 3, 4, 5],
    'sales': [10, 20, 30, 40, 50]
}
df = pd.DataFrame(data)

df['moving_avg'] = df['sales'].rolling(window=3).mean()

print(df)`,
    testCode: `
assert pd.isna(df.loc[1, 'moving_avg']), "First 2 values should be NaN"
assert df.loc[2, 'moving_avg'] == 20.0, "Avg of 10,20,30 should be 20"
assert df.loc[4, 'moving_avg'] == 40.0, "Avg of 30,40,50 should be 40"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd9',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'apply', 'lambda'],
    interviewFrequency: 'medium',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Pandas: Apply custom function',
      en: 'Pandas: Apply custom function',
      pt: 'Pandas: Apply custom function'
    },
    description: {
      es: 'Creá una columna "categoria" basada en el precio: "High" si > 50, sino "Low".',
      en: 'Create a "category" column based on price: "High" if > 50, else "Low".',
      pt: 'Crie uma coluna "categoria" baseada no preço: "High" se > 50, senão "Low".'
    },
    theory: {
      es: `**Apply en Pandas:**

Aplica una función a cada elemento (o fila/columna).

\`\`\`python
# Lambda simple
df['new_col'] = df['col'].apply(lambda x: x * 2)

# Función compleja
def clasificar(x):
    if x > 100: return 'A'
    elif x > 50: return 'B'
    else: return 'C'

df['clase'] = df['valor'].apply(clasificar)
\`\`\``,
      en: `**Apply in Pandas:**

Applies a function to each element (or row/column).

\`\`\`python
# Simple lambda
df['new_col'] = df['col'].apply(lambda x: x * 2)

# Complex function
def classify(x):
    if x > 100: return 'A'
    elif x > 50: return 'B'
    else: return 'C'

df['class'] = df['val'].apply(classify)
\`\`\``,
      pt: `**Apply em Pandas:**

Aplica uma função a cada elemento (ou linha/coluna).

\`\`\`python
# Lambda simples
df['new_col'] = df['col'].apply(lambda x: x * 2)

# Função complexa
def classificar(x):
    if x > 100: return 'A'
    elif x > 50: return 'B'
    else: return 'C'

df['clase'] = df['valor'].apply(classificar)
\`\`\``
    },
    realWorldExample: {
      es: 'Categorización compleja, limpieza de texto custom.',
      en: 'Complex categorization, custom text cleaning.',
      pt: 'Categorização complexa, limpeza de texto customizada.'
    },
    hint: {
      es: 'Usá apply(lambda x: "High" if x > 50 else "Low")',
      en: 'Use apply(lambda x: "High" if x > 50 else "Low")',
      pt: 'Use apply(lambda x: "High" if x > 50 else "Low")'
    },
    
    starterCode: {
      es: `import pandas as pd

data = {'price': [20, 60, 45, 80, 10]}
df = pd.DataFrame(data)

# Creá columna 'category': 'High' si price > 50, sino 'Low'
# Tu código aquí

print(df)`,
      en: `import pandas as pd

data = {'price': [20, 60, 45, 80, 10]}
df = pd.DataFrame(data)

# Create 'category' column: 'High' if price > 50, else 'Low'
# Your code here

print(df)`,
      pt: `import pandas as pd

data = {'price': [20, 60, 45, 80, 10]}
df = pd.DataFrame(data)

# Crie coluna 'category': 'High' se price > 50, senão 'Low'
# Seu código aqui

print(df)`
    },
    solution: `import pandas as pd

data = {'price': [20, 60, 45, 80, 10]}
df = pd.DataFrame(data)

df['category'] = df['price'].apply(lambda x: 'High' if x > 50 else 'Low')

print(df)`,
    testCode: `
assert df.loc[0, 'category'] == 'Low', "20 should be Low"
assert df.loc[1, 'category'] == 'High', "60 should be High"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pd10',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'optimization', 'types'],
    interviewFrequency: 'medium',
    xpReward: 35,
    coinsReward: 15,
    
    title: {
      es: 'Pandas: Optimización de Memoria',
      en: 'Pandas: Memory Optimization',
      pt: 'Pandas: Otimização de Memória'
    },
    description: {
      es: 'Optimizá el uso de memoria convirtiendo columnas object a category y float64 a float32.',
      en: 'Optimize memory usage by converting object columns to category and float64 to float32.',
      pt: 'Otimize o uso de memória convertendo colunas object para category e float64 para float32.'
    },
    theory: {
      es: `**Optimización de Memoria:**

- **category**: Para strings con pocos valores únicos (ahorra mucho espacio).
- **int8/16/32**: En lugar de int64 si los números son chicos.
- **float32**: En lugar de float64 si no requerís ultra precisión.

\`\`\`python
df['col_str'] = df['col_str'].astype('category')
df['col_float'] = df['col_float'].astype('float32')
\`\`\``,
      en: `**Memory Optimization:**

- **category**: For strings with few unique values (saves a lot of space).
- **int8/16/32**: Instead of int64 if numbers are small.
- **float32**: Instead of float64 if ultra precision is not needed.

\`\`\`python
df['col_str'] = df['col_str'].astype('category')
df['col_float'] = df['col_float'].astype('float32')
\`\`\``,
      pt: `**Otimização de Memória:**

- **category**: Para strings com poucos valores únicos (economiza muito espaço).
- **int8/16/32**: Em vez de int64 se os números forem pequenos.
- **float32**: Em vez de float64 se não precisar de ultra precisão.

\`\`\`python
df['col_str'] = df['col_str'].astype('category')
df['col_float'] = df['col_float'].astype('float32')
\`\`\``
    },
    realWorldExample: {
      es: 'Procesar datasets grandes en máquinas con RAM limitada.',
      en: 'Process large datasets on machines with limited RAM.',
      pt: 'Processar grandes datasets em máquinas com RAM limitada.'
    },
    hint: {
      es: 'Usá .astype("category") y .astype("float32")',
      en: 'Use .astype("category") and .astype("float32")',
      pt: 'Use .astype("category") e .astype("float32")'
    },
    
    starterCode: {
      es: `import pandas as pd
import numpy as np

# Dataset grande simulado
df = pd.DataFrame({
    'type': ['A', 'B', 'A', 'C'] * 1000,
    'value': np.random.randn(4000)
})

print(f"Memoria inicial: {df.memory_usage(deep=True).sum()} bytes")
print(df.dtypes)

# Optimizá: 'type' a category, 'value' a float32
# Tu código aquí

print(f"Memoria final: {df.memory_usage(deep=True).sum()} bytes")
print(df.dtypes)`,
      en: `import pandas as pd
import numpy as np

# Simulated large dataset
df = pd.DataFrame({
    'type': ['A', 'B', 'A', 'C'] * 1000,
    'value': np.random.randn(4000)
})

print(f"Initial memory: {df.memory_usage(deep=True).sum()} bytes")
print(df.dtypes)

# Optimize: 'type' to category, 'value' to float32
# Your code here

print(f"Final memory: {df.memory_usage(deep=True).sum()} bytes")
print(df.dtypes)`,
      pt: `import pandas as pd
import numpy as np

# Dataset grande simulado
df = pd.DataFrame({
    'type': ['A', 'B', 'A', 'C'] * 1000,
    'value': np.random.randn(4000)
})

print(f"Memoria inicial: {df.memory_usage(deep=True).sum()} bytes")
print(df.dtypes)

# Otimize: 'type' para category, 'value' para float32
# Seu código aqui

print(f"Memoria final: {df.memory_usage(deep=True).sum()} bytes")
print(df.dtypes)`
    },
    solution: `import pandas as pd
import numpy as np

df = pd.DataFrame({
    'type': ['A', 'B', 'A', 'C'] * 1000,
    'value': np.random.randn(4000)
})

df['type'] = df['type'].astype('category')
df['value'] = df['value'].astype('float32')

print(f"Memoria final: {df.memory_usage(deep=True).sum()} bytes")
print(df.dtypes)`,
    testCode: `
assert str(df['type'].dtype) == 'category', "type should be category"
assert str(df['value'].dtype) == 'float32', "value should be float32"
print("✅ ¡Correcto!")
`,
  },
];

export default PYTHON_PANDAS;
