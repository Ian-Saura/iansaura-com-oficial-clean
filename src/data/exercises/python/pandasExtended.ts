/* eslint-disable no-useless-escape */
/**
 * Python Pandas Extended Exercises
 * More advanced data manipulation and analysis
 */

import { PythonExercise } from '../types';

export const PYTHON_PANDAS_EXTENDED: PythonExercise[] = [
  // === SELECCIÓN AVANZADA ===
  {
    id: 'py-pdx1',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'loc', 'iloc', 'selection'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'loc vs iloc',
      en: 'loc vs iloc',
      pt: 'loc vs iloc'
    },
    description: {
      es: 'Seleccioná filas y columnas específicas usando loc e iloc.',
      en: 'Select specific rows and columns using loc and iloc.',
      pt: 'Selecione linhas e colunas específicas usando loc e iloc.'
    },
    theory: {
      es: `**loc vs iloc:**

\`\`\`python
# loc: por etiquetas (nombres)
df.loc[0:3, 'nombre']          # Filas 0-3, columna 'nombre'
df.loc[df['edad'] > 18, :]     # Filtro + todas las columnas

# iloc: por posición (índices numéricos)
df.iloc[0:3, 0:2]              # Primeras 3 filas, primeras 2 cols
df.iloc[[0, 2, 4], :]          # Filas específicas

# Diferencia clave:
# loc[0:3] incluye el 3 (etiqueta)
# iloc[0:3] NO incluye el 3 (posición, como Python)
\`\`\``,
      en: `**loc vs iloc:**

\`\`\`python
# loc: by labels (names)
df.loc[0:3, 'name']           # Rows 0-3, column 'name'
df.loc[df['age'] > 18, :]     # Filter + all columns

# iloc: by position (numeric indices)
df.iloc[0:3, 0:2]             # First 3 rows, first 2 cols
df.iloc[[0, 2, 4], :]         # Specific rows

# Key difference:
# loc[0:3] includes 3 (label)
# iloc[0:3] does NOT include 3 (position, like Python)
\`\`\``,
      pt: `**loc vs iloc:**

\`\`\`python
# loc: por rótulos (nomes)
df.loc[0:3, 'nome']           # Linhas 0-3, coluna 'nome'
df.loc[df['idade'] > 18, :]   # Filtro + todas as colunas

# iloc: por posição (índices numéricos)
df.iloc[0:3, 0:2]             # Primeiras 3 linhas, primeiras 2 cols
df.iloc[[0, 2, 4], :]         # Linhas específicas

# Diferença chave:
# loc[0:3] inclui o 3 (rótulo)
# iloc[0:3] NÃO inclui o 3 (posição, como Python)
\`\`\``
    },
    realWorldExample: {
      es: 'Seleccionar subconjuntos precisos de datos para análisis.',
      en: 'Select precise data subsets for analysis.',
      pt: 'Selecionar subconjuntos precisos de dados para análise.'
    },
    hint: {
      es: 'Para iloc usá índices numéricos: df.iloc[fila, columna]',
      en: 'For iloc use numeric indices: df.iloc[row, column]',
      pt: 'Para iloc use índices numéricos: df.iloc[linha, coluna]'
    },
    
    starterCode: {
      es: `import pandas as pd

df = pd.DataFrame({
    'nombre': ['Ana', 'Bob', 'Carlos', 'Diana', 'Eva'],
    'edad': [25, 30, 35, 28, 32],
    'ciudad': ['Madrid', 'London', 'Paris', 'Berlin', 'Rome'],
    'salario': [50000, 60000, 55000, 48000, 52000]
})

# 1. Seleccioná las primeras 3 filas y las columnas 'nombre' y 'edad' usando iloc
resultado_iloc = None

# 2. Seleccioná personas mayores de 28 años, solo columnas 'nombre' y 'salario' usando loc
resultado_loc = None

# Tu código aquí

print("iloc result:")
print(resultado_iloc)
print("\\nloc result:")
print(resultado_loc)`,
      en: `import pandas as pd

df = pd.DataFrame({
    'name': ['Ana', 'Bob', 'Carlos', 'Diana', 'Eva'],
    'age': [25, 30, 35, 28, 32],
    'city': ['Madrid', 'London', 'Paris', 'Berlin', 'Rome'],
    'salary': [50000, 60000, 55000, 48000, 52000]
})

# 1. Select first 3 rows and columns 'name' and 'age' using iloc
result_iloc = None

# 2. Select people older than 28, only columns 'name' and 'salary' using loc
result_loc = None

# Your code here

print("iloc result:")
print(result_iloc)
print("\\nloc result:")
print(result_loc)`,
      pt: `import pandas as pd

df = pd.DataFrame({
    'nome': ['Ana', 'Bob', 'Carlos', 'Diana', 'Eva'],
    'idade': [25, 30, 35, 28, 32],
    'cidade': ['Madrid', 'London', 'Paris', 'Berlin', 'Rome'],
    'salario': [50000, 60000, 55000, 48000, 52000]
})

# 1. Selecione as primeiras 3 linhas e as colunas 'nome' e 'idade' usando iloc
resultado_iloc = None

# 2. Selecione pessoas maiores de 28 anos, apenas colunas 'nome' e 'salario' usando loc
resultado_loc = None

# Seu código aqui

print("iloc result:")
print(resultado_iloc)
print("\\nloc result:")
print(resultado_loc)`
    },
    solution: `import pandas as pd

df = pd.DataFrame({
    'nombre': ['Ana', 'Bob', 'Carlos', 'Diana', 'Eva'],
    'edad': [25, 30, 35, 28, 32],
    'ciudad': ['Madrid', 'London', 'Paris', 'Berlin', 'Rome'],
    'salario': [50000, 60000, 55000, 48000, 52000]
})

resultado_iloc = df.iloc[0:3, 0:2]
resultado_loc = df.loc[df['edad'] > 28, ['nombre', 'salario']]

print("iloc result:")
print(resultado_iloc)
print("\\nloc result:")
print(resultado_loc)`,
    testCode: `
assert len(resultado_iloc) == 3, "iloc should return 3 rows"
assert len(resultado_loc) == 3, "loc should return 3 rows (Bob, Carlos, Eva)"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pdx2',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'sort', 'nlargest'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Top N con nlargest/nsmallest',
      en: 'Top N with nlargest/nsmallest',
      pt: 'Top N com nlargest/nsmallest'
    },
    description: {
      es: 'Encontrá los 3 productos más caros y los 2 más baratos.',
      en: 'Find the 3 most expensive and 2 cheapest products.',
      pt: 'Encontre os 3 produtos mais caros e os 2 mais baratos.'
    },
    theory: {
      es: `**nlargest y nsmallest:**

Más eficiente que ordenar todo el DataFrame.

\`\`\`python
# Top 5 mayores por columna
df.nlargest(5, 'ventas')

# Top 3 menores por columna
df.nsmallest(3, 'precio')

# Por múltiples columnas
df.nlargest(5, ['ventas', 'ganancia'])

# Equivalente menos eficiente:
df.sort_values('ventas', ascending=False).head(5)
\`\`\``,
      en: `**nlargest and nsmallest:**

More efficient than sorting the entire DataFrame.

\`\`\`python
# Top 5 largest by column
df.nlargest(5, 'sales')

# Top 3 smallest by column
df.nsmallest(3, 'price')

# By multiple columns
df.nlargest(5, ['sales', 'profit'])

# Less efficient equivalent:
df.sort_values('sales', ascending=False).head(5)
\`\`\``,
      pt: `**nlargest e nsmallest:**

Mais eficiente do que ordenar todo o DataFrame.

\`\`\`python
# Top 5 maiores por coluna
df.nlargest(5, 'vendas')

# Top 3 menores por coluna
df.nsmallest(3, 'preco')

# Por múltiplas colunas
df.nlargest(5, ['vendas', 'lucro'])

# Equivalente menos eficiente:
df.sort_values('vendas', ascending=False).head(5)
\`\`\``
    },
    realWorldExample: {
      es: 'Rankings, top performers, alertas de outliers.',
      en: 'Rankings, top performers, outlier alerts.',
      pt: 'Rankings, top performers, alertas de outliers.'
    },
    hint: {
      es: 'Usá df.nlargest(n, columna) y df.nsmallest(n, columna)',
      en: 'Use df.nlargest(n, column) and df.nsmallest(n, column)',
      pt: 'Use df.nlargest(n, coluna) e df.nsmallest(n, coluna)'
    },
    
    starterCode: {
      es: `import pandas as pd

productos = pd.DataFrame({
    'producto': ['Laptop', 'Mouse', 'Monitor', 'Keyboard', 'Webcam', 'Headset'],
    'precio': [999, 29, 349, 79, 89, 149],
    'stock': [10, 150, 45, 80, 30, 60]
})

# Encontrá los 3 productos más caros
top_3_caros = None

# Encontrá los 2 productos más baratos
top_2_baratos = None

# Tu código aquí

print("Top 3 más caros:")
print(top_3_caros)
print("\\nTop 2 más baratos:")
print(top_2_baratos)`,
      en: `import pandas as pd

products = pd.DataFrame({
    'product': ['Laptop', 'Mouse', 'Monitor', 'Keyboard', 'Webcam', 'Headset'],
    'price': [999, 29, 349, 79, 89, 149],
    'stock': [10, 150, 45, 80, 30, 60]
})

# Find the 3 most expensive products
top_3_expensive = None

# Find the 2 cheapest products
top_2_cheap = None

# Your code here

print("Top 3 most expensive:")
print(top_3_expensive)
print("\\nTop 2 cheapest:")
print(top_2_cheap)`,
      pt: `import pandas as pd

produtos = pd.DataFrame({
    'produto': ['Laptop', 'Mouse', 'Monitor', 'Keyboard', 'Webcam', 'Headset'],
    'preco': [999, 29, 349, 79, 89, 149],
    'estoque': [10, 150, 45, 80, 30, 60]
})

# Encontre os 3 produtos mais caros
top_3_caros = None

# Encontre os 2 produtos mais baratos
top_2_baratos = None

# Seu código aqui

print("Top 3 mais caros:")
print(top_3_caros)
print("\\nTop 2 mais baratos:")
print(top_2_baratos)`
    },
    solution: `import pandas as pd

productos = pd.DataFrame({
    'producto': ['Laptop', 'Mouse', 'Monitor', 'Keyboard', 'Webcam', 'Headset'],
    'precio': [999, 29, 349, 79, 89, 149],
    'stock': [10, 150, 45, 80, 30, 60]
})

top_3_caros = productos.nlargest(3, 'precio')
top_2_baratos = productos.nsmallest(2, 'precio')

print("Top 3 más caros:")
print(top_3_caros)
print("\\nTop 2 más baratos:")
print(top_2_baratos)`,
    testCode: `
assert len(top_3_caros) == 3, "Should have 3 expensive products"
assert len(top_2_baratos) == 2, "Should have 2 cheap products"
assert top_3_caros.iloc[0]['precio'] == 999, "Most expensive should be 999"
assert top_2_baratos.iloc[0]['precio'] == 29, "Cheapest should be 29"
print("✅ ¡Correcto!")
`,
  },
  // === TRANSFORMACIONES ===
  {
    id: 'py-pdx3',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'transform', 'groupby'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'GroupBy con transform()',
      en: 'GroupBy with transform()',
      pt: 'GroupBy com transform()'
    },
    description: {
      es: 'Calculá el salario promedio por departamento y agregalo como columna a cada fila.',
      en: 'Calculate average salary per department and add it as a column to each row.',
      pt: 'Calcule o salário médio por departamento e adicione como coluna a cada linha.'
    },
    theory: {
      es: `**transform() vs agg():**

\`\`\`python
# agg() - reduce filas (una fila por grupo)
df.groupby('dept')['salario'].mean()
# dept
# IT       5000
# Sales    4500

# transform() - mantiene todas las filas
df['promedio_dept'] = df.groupby('dept')['salario'].transform('mean')
# Agrega la columna a cada fila original
\`\`\`

**Casos de uso de transform:**
- Normalización por grupo
- Comparar valor individual vs promedio del grupo
- Rellenar NaN con media del grupo`,
      en: `**transform() vs agg():**

\`\`\`python
# agg() - reduces rows (one row per group)
df.groupby('dept')['salary'].mean()
# dept
# IT       5000
# Sales    4500

# transform() - keeps all rows
df['dept_avg'] = df.groupby('dept')['salary'].transform('mean')
# Adds the column to each original row
\`\`\`

**Use cases for transform:**
- Normalization by group
- Compare individual value vs group average
- Fill NaN with group mean`,
      pt: `**transform() vs agg():**

\`\`\`python
# agg() - reduz linhas (uma linha por grupo)
df.groupby('dept')['salario'].mean()
# dept
# IT       5000
# Sales    4500

# transform() - mantém todas as linhas
df['media_dept'] = df.groupby('dept')['salario'].transform('mean')
# Adiciona a coluna a cada linha original
\`\`\`

**Casos de uso do transform:**
- Normalização por grupo
- Comparar valor individual vs média do grupo
- Preencher NaN com média do grupo`
    },
    realWorldExample: {
      es: 'Comparar empleado vs promedio de su departamento.',
      en: 'Compare employee vs their department average.',
      pt: 'Comparar funcionário vs média do seu departamento.'
    },
    hint: {
      es: 'Usá groupby("dept")["salary"].transform("mean")',
      en: 'Use groupby("dept")["salary"].transform("mean")',
      pt: 'Use groupby("dept")["salary"].transform("mean")'
    },
    
    starterCode: {
      es: `import pandas as pd

empleados = pd.DataFrame({
    'nombre': ['Ana', 'Bob', 'Carlos', 'Diana', 'Eva', 'Frank'],
    'dept': ['IT', 'Sales', 'IT', 'Sales', 'IT', 'Sales'],
    'salario': [5000, 4000, 5500, 4500, 4800, 5000]
})

# 1. Agregá columna 'salario_promedio_dept' con el promedio del departamento
# 2. Agregá columna 'diferencia' = salario - salario_promedio_dept

# Tu código aquí

print(empleados)`,
      en: `import pandas as pd

employees = pd.DataFrame({
    'name': ['Ana', 'Bob', 'Carlos', 'Diana', 'Eva', 'Frank'],
    'dept': ['IT', 'Sales', 'IT', 'Sales', 'IT', 'Sales'],
    'salary': [5000, 4000, 5500, 4500, 4800, 5000]
})

# 1. Add column 'dept_avg_salary' with department average
# 2. Add column 'difference' = salary - dept_avg_salary

# Your code here

print(employees)`,
      pt: `import pandas as pd

funcionarios = pd.DataFrame({
    'nome': ['Ana', 'Bob', 'Carlos', 'Diana', 'Eva', 'Frank'],
    'dept': ['IT', 'Sales', 'IT', 'Sales', 'IT', 'Sales'],
    'salario': [5000, 4000, 5500, 4500, 4800, 5000]
})

# 1. Adicione coluna 'salario_medio_dept' com a média do departamento
# 2. Adicione coluna 'diferenca' = salario - salario_medio_dept

# Seu código aqui

print(funcionarios)`
    },
    solution: `import pandas as pd

empleados = pd.DataFrame({
    'nombre': ['Ana', 'Bob', 'Carlos', 'Diana', 'Eva', 'Frank'],
    'dept': ['IT', 'Sales', 'IT', 'Sales', 'IT', 'Sales'],
    'salario': [5000, 4000, 5500, 4500, 4800, 5000]
})

empleados['salario_promedio_dept'] = empleados.groupby('dept')['salario'].transform('mean')
empleados['diferencia'] = empleados['salario'] - empleados['salario_promedio_dept']

print(empleados)`,
    testCode: `
assert 'salario_promedio_dept' in empleados.columns, "Should have salario_promedio_dept column"
assert 'diferencia' in empleados.columns, "Should have diferencia column"
# IT avg = (5000+5500+4800)/3 = 5100
# Sales avg = (4000+4500+5000)/3 = 4500
assert abs(empleados.loc[0, 'salario_promedio_dept'] - 5100) < 1, "IT avg should be 5100"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pdx4',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'melt', 'reshape'],
    interviewFrequency: 'high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Unpivot con melt()',
      en: 'Unpivot with melt()',
      pt: 'Unpivot com melt()'
    },
    description: {
      es: 'Convertí un DataFrame de formato ancho a formato largo (tidy data).',
      en: 'Convert a DataFrame from wide to long format (tidy data).',
      pt: 'Converta um DataFrame de formato largo para formato longo (tidy data).'
    },
    theory: {
      es: `**melt() - Unpivot (ancho → largo):**

\`\`\`python
# DataFrame ancho
#    producto  Q1  Q2  Q3
# 0  Laptop   10  15  20

df_largo = df.melt(
    id_vars=['producto'],     # Columnas que no cambian
    value_vars=['Q1','Q2','Q3'],  # Columnas a "derretir"
    var_name='trimestre',     # Nombre nueva col de nombres
    value_name='ventas'       # Nombre nueva col de valores
)

# Resultado:
#    producto trimestre  ventas
# 0  Laptop   Q1        10
# 1  Laptop   Q2        15
# 2  Laptop   Q3        20
\`\`\`

**Opuesto:** \`pivot()\` o \`pivot_table()\``,
      en: `**melt() - Unpivot (wide → long):**

\`\`\`python
# Wide DataFrame
#    product  Q1  Q2  Q3
# 0  Laptop   10  15  20

df_long = df.melt(
    id_vars=['product'],      # Columns that don't change
    value_vars=['Q1','Q2','Q3'],  # Columns to "melt"
    var_name='quarter',       # Name of new name column
    value_name='sales'        # Name of new value column
)

# Result:
#    product quarter  sales
# 0  Laptop  Q1       10
# 1  Laptop  Q2       15
# 2  Laptop  Q3       20
\`\`\`

**Opposite:** \`pivot()\` or \`pivot_table()\``,
      pt: `**melt() - Unpivot (largo → longo):**

\`\`\`python
# DataFrame largo
#    produto  Q1  Q2  Q3
# 0  Laptop   10  15  20

df_longo = df.melt(
    id_vars=['produto'],      # Colunas que não mudam
    value_vars=['Q1','Q2','Q3'],  # Colunas a "derreter"
    var_name='trimestre',     # Nome da nova col de nomes
    value_name='vendas'       # Nome da nova col de valores
)

# Resultado:
#    produto trimestre  vendas
# 0  Laptop  Q1         10
# 1  Laptop  Q2         15
# 2  Laptop  Q3         20
\`\`\`

**Oposto:** \`pivot()\` ou \`pivot_table()\``
    },
    realWorldExample: {
      es: 'Preparar datos para visualización, bases de datos normalizadas.',
      en: 'Prepare data for visualization, normalized databases.',
      pt: 'Preparar dados para visualização, bancos de dados normalizados.'
    },
    hint: {
      es: 'Usá melt(id_vars=[...], var_name=..., value_name=...)',
      en: 'Use melt(id_vars=[...], var_name=..., value_name=...)',
      pt: 'Use melt(id_vars=[...], var_name=..., value_name=...)'
    },
    
    starterCode: {
      es: `import pandas as pd

# Ventas por trimestre (formato ancho)
ventas_ancho = pd.DataFrame({
    'producto': ['Laptop', 'Mouse', 'Monitor'],
    'Q1': [100, 500, 200],
    'Q2': [120, 450, 220],
    'Q3': [150, 480, 250],
    'Q4': [180, 520, 280]
})

print("Formato ancho:")
print(ventas_ancho)

# Convertí a formato largo con columnas: producto, trimestre, ventas
ventas_largo = None

# Tu código aquí

print("\\nFormato largo:")
print(ventas_largo)`,
      en: `import pandas as pd

# Sales by quarter (wide format)
sales_wide = pd.DataFrame({
    'product': ['Laptop', 'Mouse', 'Monitor'],
    'Q1': [100, 500, 200],
    'Q2': [120, 450, 220],
    'Q3': [150, 480, 250],
    'Q4': [180, 520, 280]
})

print("Wide format:")
print(sales_wide)

# Convert to long format with columns: product, quarter, sales
sales_long = None

# Your code here

print("\\nLong format:")
print(sales_long)`,
      pt: `import pandas as pd

# Vendas por trimestre (formato largo)
vendas_largo = pd.DataFrame({
    'produto': ['Laptop', 'Mouse', 'Monitor'],
    'Q1': [100, 500, 200],
    'Q2': [120, 450, 220],
    'Q3': [150, 480, 250],
    'Q4': [180, 520, 280]
})

print("Formato largo:")
print(vendas_largo)

# Converta para formato longo com colunas: produto, trimestre, vendas
vendas_longo = None

# Seu código aqui

print("\\nFormato longo:")
print(vendas_longo)`
    },
    solution: `import pandas as pd

ventas_ancho = pd.DataFrame({
    'producto': ['Laptop', 'Mouse', 'Monitor'],
    'Q1': [100, 500, 200],
    'Q2': [120, 450, 220],
    'Q3': [150, 480, 250],
    'Q4': [180, 520, 280]
})

ventas_largo = ventas_ancho.melt(
    id_vars=['producto'],
    var_name='trimestre',
    value_name='ventas'
)

print("Formato ancho:")
print(ventas_ancho)
print("\\nFormato largo:")
print(ventas_largo)`,
    testCode: `
assert len(ventas_largo) == 12, "Should have 12 rows (3 products * 4 quarters)"
assert 'trimestre' in ventas_largo.columns, "Should have trimestre column"
assert 'ventas' in ventas_largo.columns, "Should have ventas column"
print("✅ ¡Correcto!")
`,
  },
  {
    id: 'py-pdx5',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'cumsum', 'cumulative'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Cálculos acumulados',
      en: 'Cumulative Calculations',
      pt: 'Cálculos Acumulados'
    },
    description: {
      es: 'Calculá ventas acumuladas y el % del total para cada día.',
      en: 'Calculate cumulative sales and % of total for each day.',
      pt: 'Calcule vendas acumuladas e % do total para cada dia.'
    },
    theory: {
      es: `**Funciones acumuladas:**

\`\`\`python
df['ventas_acumuladas'] = df['ventas'].cumsum()
df['max_acumulado'] = df['ventas'].cummax()
df['min_acumulado'] = df['ventas'].cummin()

# % del total
df['pct_total'] = df['ventas'] / df['ventas'].sum() * 100

# % acumulado
df['pct_acumulado'] = df['ventas'].cumsum() / df['ventas'].sum() * 100
\`\`\`

**Tip:** Útil para análisis de Pareto (80/20).`,
      en: `**Cumulative functions:**

\`\`\`python
df['cumulative_sales'] = df['sales'].cumsum()
df['cumulative_max'] = df['sales'].cummax()
df['cumulative_min'] = df['sales'].cummin()

# % of total
df['pct_total'] = df['sales'] / df['sales'].sum() * 100

# Cumulative %
df['cumulative_pct'] = df['sales'].cumsum() / df['sales'].sum() * 100
\`\`\`

**Tip:** Useful for Pareto analysis (80/20).`,
      pt: `**Funções acumuladas:**

\`\`\`python
df['vendas_acumuladas'] = df['vendas'].cumsum()
df['max_acumulado'] = df['vendas'].cummax()
df['min_acumulado'] = df['vendas'].cummin()

# % do total
df['pct_total'] = df['vendas'] / df['vendas'].sum() * 100

# % acumulado
df['pct_acumulado'] = df['vendas'].cumsum() / df['vendas'].sum() * 100
\`\`\`

**Dica:** Útil para análise de Pareto (80/20).`
    },
    realWorldExample: {
      es: 'Tracking de metas, análisis de tendencias, reportes ejecutivos.',
      en: 'Goal tracking, trend analysis, executive reports.',
      pt: 'Tracking de metas, análise de tendências, relatórios executivos.'
    },
    hint: {
      es: 'Usá cumsum() para acumulado y divide por sum() para porcentaje',
      en: 'Use cumsum() for cumulative and divide by sum() for percentage',
      pt: 'Use cumsum() para acumulado e divida por sum() para porcentagem'
    },
    
    starterCode: {
      es: `import pandas as pd

ventas = pd.DataFrame({
    'dia': ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    'ventas': [1000, 1500, 1200, 1800, 2000]
})

# 1. Calculá ventas_acumuladas (cumsum)
# 2. Calculá pct_acumulado (% acumulado del total)

# Tu código aquí

print(ventas)`,
      en: `import pandas as pd

sales = pd.DataFrame({
    'day': ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    'sales': [1000, 1500, 1200, 1800, 2000]
})

# 1. Calculate cumulative_sales (cumsum)
# 2. Calculate cumulative_pct (cumulative % of total)

# Your code here

print(sales)`,
      pt: `import pandas as pd

vendas = pd.DataFrame({
    'dia': ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    'vendas': [1000, 1500, 1200, 1800, 2000]
})

# 1. Calcule vendas_acumuladas (cumsum)
# 2. Calcule pct_acumulado (% acumulado do total)

# Seu código aqui

print(vendas)`
    },
    solution: `import pandas as pd

ventas = pd.DataFrame({
    'dia': ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'],
    'ventas': [1000, 1500, 1200, 1800, 2000]
})

ventas['ventas_acumuladas'] = ventas['ventas'].cumsum()
ventas['pct_acumulado'] = ventas['ventas'].cumsum() / ventas['ventas'].sum() * 100

print(ventas)`,
    testCode: `
assert ventas['ventas_acumuladas'].iloc[-1] == 7500, "Total cumulative should be 7500"
assert abs(ventas['pct_acumulado'].iloc[-1] - 100) < 0.01, "Last pct should be 100%"
assert abs(ventas['pct_acumulado'].iloc[0] - 13.33) < 0.1, "First pct should be ~13.33%"
print("✅ ¡Correcto!")
`,
  },
  // === STRINGS EN PANDAS ===
  {
    id: 'py-pdx6',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'str', 'string'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Operaciones de strings (.str)',
      en: 'String Operations (.str)',
      pt: 'Operações de strings (.str)'
    },
    description: {
      es: 'Limpiá y extraé información de una columna de emails.',
      en: 'Clean and extract information from an email column.',
      pt: 'Limpe e extraia informações de uma coluna de e-mails.'
    },
    theory: {
      es: `**Operaciones de strings en Pandas (.str):**

\`\`\`python
# Básicos
df['col'].str.lower()
df['col'].str.upper()
df['col'].str.strip()
df['col'].str.replace('a', 'b')

# Búsqueda
df['col'].str.contains('patron')
df['col'].str.startswith('A')
df['col'].str.endswith('.com')

# Extracción
df['col'].str.split('@')
df['col'].str.extract(r'(\w+)@(\w+)')
df['col'].str[0:5]  # Substring
\`\`\``,
      en: `**String operations in Pandas (.str):**

\`\`\`python
# Basics
df['col'].str.lower()
df['col'].str.upper()
df['col'].str.strip()
df['col'].str.replace('a', 'b')

# Search
df['col'].str.contains('pattern')
df['col'].str.startswith('A')
df['col'].str.endswith('.com')

# Extraction
df['col'].str.split('@')
df['col'].str.extract(r'(\w+)@(\w+)')
df['col'].str[0:5]  # Substring
\`\`\``,
      pt: `**Operações de strings em Pandas (.str):**

\`\`\`python
# Básicos
df['col'].str.lower()
df['col'].str.upper()
df['col'].str.strip()
df['col'].str.replace('a', 'b')

# Busca
df['col'].str.contains('padrao')
df['col'].str.startswith('A')
df['col'].str.endswith('.com')

# Extração
df['col'].str.split('@')
df['col'].str.extract(r'(\w+)@(\w+)')
df['col'].str[0:5]  # Substring
\`\`\``
    },
    realWorldExample: {
      es: 'Limpieza de datos, extracción de features de texto.',
      en: 'Data cleaning, text feature extraction.',
      pt: 'Limpeza de dados, extração de features de texto.'
    },
    hint: {
      es: 'Usá .str.split("@").str[0] para usuario y .str[1] para dominio',
      en: 'Use .str.split("@").str[0] for user and .str[1] for domain',
      pt: 'Use .str.split("@").str[0] para usuário e .str[1] para domínio'
    },
    
    starterCode: {
      es: `import pandas as pd

usuarios = pd.DataFrame({
    'email': ['  Ana.Garcia@Gmail.com  ', 'bob.smith@YAHOO.COM', 'CARLOS@empresa.ORG']
})

# 1. Limpiá espacios y convertí a minúsculas -> columna 'email_clean'
# 2. Extraé el usuario (antes del @) -> columna 'usuario'
# 3. Extraé el dominio (después del @) -> columna 'dominio'

# Tu código aquí

print(usuarios)`,
      en: `import pandas as pd

users = pd.DataFrame({
    'email': ['  Ana.Garcia@Gmail.com  ', 'bob.smith@YAHOO.COM', 'CARLOS@empresa.ORG']
})

# 1. Clean spaces and convert to lowercase -> 'email_clean' column
# 2. Extract user (before @) -> 'user' column
# 3. Extract domain (after @) -> 'domain' column

# Your code here

print(users)`,
      pt: `import pandas as pd

usuarios = pd.DataFrame({
    'email': ['  Ana.Garcia@Gmail.com  ', 'bob.smith@YAHOO.COM', 'CARLOS@empresa.ORG']
})

# 1. Limpe espaços e converta para minúsculas -> coluna 'email_limpo'
# 2. Extraia o usuário (antes do @) -> coluna 'usuario'
# 3. Extraia o domínio (depois do @) -> coluna 'dominio'

# Seu código aqui

print(usuarios)`
    },
    solution: `import pandas as pd

usuarios = pd.DataFrame({
    'email': ['  Ana.Garcia@Gmail.com  ', 'bob.smith@YAHOO.COM', 'CARLOS@empresa.ORG']
})

usuarios['email_clean'] = usuarios['email'].str.strip().str.lower()
usuarios['usuario'] = usuarios['email_clean'].str.split('@').str[0]
usuarios['dominio'] = usuarios['email_clean'].str.split('@').str[1]

print(usuarios)`,
    testCode: `
assert usuarios['email_clean'].iloc[0] == 'ana.garcia@gmail.com', "Should be cleaned and lowercase"
assert usuarios['usuario'].iloc[1] == 'bob.smith', "User should be bob.smith"
assert usuarios['dominio'].iloc[2] == 'empresa.org', "Domain should be empresa.org"
print("✅ ¡Correcto!")
`,
  },
  // === FECHAS ===
  {
    id: 'py-pdx7',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'datetime', 'dates'],
    interviewFrequency: 'very_high',
    xpReward: 25,
    coinsReward: 10,
    
    title: {
      es: 'Trabajar con fechas (.dt)',
      en: 'Working with Dates (.dt)',
      pt: 'Trabalhar com Datas (.dt)'
    },
    description: {
      es: 'Extraé componentes de fecha y calculá días desde el primer pedido.',
      en: 'Extract date components and calculate days since first order.',
      pt: 'Extraia componentes de data e calcule dias desde o primeiro pedido.'
    },
    theory: {
      es: `**Fechas en Pandas (.dt):**

\`\`\`python
# Convertir a datetime
df['fecha'] = pd.to_datetime(df['fecha'])

# Extraer componentes
df['fecha'].dt.year
df['fecha'].dt.month
df['fecha'].dt.day
df['fecha'].dt.dayofweek   # 0=Lunes
df['fecha'].dt.day_name()  # 'Monday'

# Diferencias
df['dias'] = (df['fecha2'] - df['fecha1']).dt.days

# Filtrar por fecha
df[df['fecha'] > '2024-01-01']
\`\`\``,
      en: `**Dates in Pandas (.dt):**

\`\`\`python
# Convert to datetime
df['date'] = pd.to_datetime(df['date'])

# Extract components
df['date'].dt.year
df['date'].dt.month
df['date'].dt.day
df['date'].dt.dayofweek   # 0=Monday
df['date'].dt.day_name()  # 'Monday'

# Differences
df['days'] = (df['date2'] - df['date1']).dt.days

# Filter by date
df[df['date'] > '2024-01-01']
\`\`\``,
      pt: `**Datas em Pandas (.dt):**

\`\`\`python
# Converter para datetime
df['data'] = pd.to_datetime(df['data'])

# Extrair componentes
df['data'].dt.year
df['data'].dt.month
df['data'].dt.day
df['data'].dt.dayofweek   # 0=Segunda
df['data'].dt.day_name()  # 'Monday'

# Diferenças
df['dias'] = (df['data2'] - df['data1']).dt.days

# Filtrar por data
df[df['data'] > '2024-01-01']
\`\`\``
    },
    realWorldExample: {
      es: 'Análisis temporal, cohortes, estacionalidad.',
      en: 'Temporal analysis, cohorts, seasonality.',
      pt: 'Análise temporal, coortes, sazonalidade.'
    },
    hint: {
      es: 'Usá pd.to_datetime() y luego .dt.year, .dt.month, etc.',
      en: 'Use pd.to_datetime() then .dt.year, .dt.month, etc.',
      pt: 'Use pd.to_datetime() e depois .dt.year, .dt.month, etc.'
    },
    
    starterCode: {
      es: `import pandas as pd

pedidos = pd.DataFrame({
    'pedido_id': [1, 2, 3, 4, 5],
    'fecha': ['2024-01-15', '2024-02-20', '2024-03-05', '2024-03-15', '2024-04-01']
})

# 1. Convertí 'fecha' a datetime
# 2. Extraé año, mes y día de la semana (nombre)
# 3. Calculá días desde el primer pedido

# Tu código aquí

print(pedidos)`,
      en: `import pandas as pd

orders = pd.DataFrame({
    'order_id': [1, 2, 3, 4, 5],
    'date': ['2024-01-15', '2024-02-20', '2024-03-05', '2024-03-15', '2024-04-01']
})

# 1. Convert 'date' to datetime
# 2. Extract year, month and day of week (name)
# 3. Calculate days since first order

# Your code here

print(orders)`,
      pt: `import pandas as pd

pedidos = pd.DataFrame({
    'pedido_id': [1, 2, 3, 4, 5],
    'data': ['2024-01-15', '2024-02-20', '2024-03-05', '2024-03-15', '2024-04-01']
})

# 1. Converta 'data' para datetime
# 2. Extraia ano, mês e dia da semana (nome)
# 3. Calcule dias desde o primeiro pedido

# Seu código aqui

print(pedidos)`
    },
    solution: `import pandas as pd

pedidos = pd.DataFrame({
    'pedido_id': [1, 2, 3, 4, 5],
    'fecha': ['2024-01-15', '2024-02-20', '2024-03-05', '2024-03-15', '2024-04-01']
})

pedidos['fecha'] = pd.to_datetime(pedidos['fecha'])
pedidos['año'] = pedidos['fecha'].dt.year
pedidos['mes'] = pedidos['fecha'].dt.month
pedidos['dia_semana'] = pedidos['fecha'].dt.day_name()
pedidos['dias_desde_primero'] = (pedidos['fecha'] - pedidos['fecha'].min()).dt.days

print(pedidos)`,
    testCode: `
assert pedidos['año'].iloc[0] == 2024, "Year should be 2024"
assert pedidos['mes'].iloc[1] == 2, "Month of second order should be 2"
assert pedidos['dias_desde_primero'].iloc[0] == 0, "First order should have 0 days"
print("✅ ¡Correcto!")
`,
  },
  // === AGREGACIONES MÚLTIPLES ===
  {
    id: 'py-pdx8',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'agg', 'named'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Agregaciones con nombres personalizados',
      en: 'Aggregations with Custom Names',
      pt: 'Agregações com Nomes Personalizados'
    },
    description: {
      es: 'Calculá múltiples estadísticas por grupo con nombres descriptivos.',
      en: 'Calculate multiple statistics per group with descriptive names.',
      pt: 'Calcule múltiplas estatísticas por grupo com nomes descritivos.'
    },
    theory: {
      es: `**Agregaciones con nombres custom:**

\`\`\`python
# Usando named aggregation (Pandas 0.25+)
df.groupby('grupo').agg(
    total_ventas=('ventas', 'sum'),
    promedio_precio=('precio', 'mean'),
    cantidad=('id', 'count'),
    max_descuento=('descuento', 'max')
)

# Múltiples funciones por columna
df.groupby('grupo').agg({
    'ventas': ['sum', 'mean', 'std'],
    'precio': ['min', 'max']
})
\`\`\``,
      en: `**Aggregations with custom names:**

\`\`\`python
# Using named aggregation (Pandas 0.25+)
df.groupby('group').agg(
    total_sales=('sales', 'sum'),
    avg_price=('price', 'mean'),
    count=('id', 'count'),
    max_discount=('discount', 'max')
)

# Multiple functions per column
df.groupby('group').agg({
    'sales': ['sum', 'mean', 'std'],
    'price': ['min', 'max']
})
\`\`\``,
      pt: `**Agregações com nomes customizados:**

\`\`\`python
# Usando named aggregation (Pandas 0.25+)
df.groupby('grupo').agg(
    total_vendas=('vendas', 'sum'),
    media_preco=('preco', 'mean'),
    quantidade=('id', 'count'),
    max_desconto=('desconto', 'max')
)

# Múltiplas funções por coluna
df.groupby('grupo').agg({
    'vendas': ['sum', 'mean', 'std'],
    'preco': ['min', 'max']
})
\`\`\``
    },
    realWorldExample: {
      es: 'Reportes de métricas por categoría, dashboards.',
      en: 'Category metric reports, dashboards.',
      pt: 'Relatórios de métricas por categoria, dashboards.'
    },
    hint: {
      es: 'Usá .agg(nombre_columna=("columna_original", "funcion"))',
      en: 'Use .agg(column_name=("original_column", "function"))',
      pt: 'Use .agg(nome_coluna=("coluna_original", "funcao"))'
    },
    
    starterCode: {
      es: `import pandas as pd

ventas = pd.DataFrame({
    'categoria': ['Electro', 'Ropa', 'Electro', 'Ropa', 'Electro', 'Ropa'],
    'producto': ['TV', 'Camisa', 'Laptop', 'Pantalón', 'Phone', 'Vestido'],
    'monto': [500, 50, 1000, 80, 800, 120],
    'cantidad': [2, 10, 1, 15, 3, 8]
})

# Calculá por categoría:
# - total_ventas: suma de monto
# - promedio_monto: promedio de monto
# - productos_vendidos: count de producto
# - max_cantidad: máximo de cantidad

resumen = None

# Tu código aquí

print(resumen)`,
      en: `import pandas as pd

sales = pd.DataFrame({
    'category': ['Electro', 'Clothes', 'Electro', 'Clothes', 'Electro', 'Clothes'],
    'product': ['TV', 'Shirt', 'Laptop', 'Pants', 'Phone', 'Dress'],
    'amount': [500, 50, 1000, 80, 800, 120],
    'quantity': [2, 10, 1, 15, 3, 8]
})

# Calculate per category:
# - total_sales: sum of amount
# - avg_amount: average of amount
# - products_sold: count of product
# - max_quantity: max of quantity

summary = None

# Your code here

print(summary)`,
      pt: `import pandas as pd

vendas = pd.DataFrame({
    'categoria': ['Eletro', 'Roupas', 'Eletro', 'Roupas', 'Eletro', 'Roupas'],
    'produto': ['TV', 'Camisa', 'Laptop', 'Calça', 'Phone', 'Vestido'],
    'valor': [500, 50, 1000, 80, 800, 120],
    'quantidade': [2, 10, 1, 15, 3, 8]
})

# Calcule por categoria:
# - total_vendas: soma de valor
# - media_valor: média de valor
# - produtos_vendidos: count de produto
# - max_quantidade: máximo de quantidade

resumo = None

# Seu código aqui

print(resumo)`
    },
    solution: `import pandas as pd

ventas = pd.DataFrame({
    'categoria': ['Electro', 'Ropa', 'Electro', 'Ropa', 'Electro', 'Ropa'],
    'producto': ['TV', 'Camisa', 'Laptop', 'Pantalón', 'Phone', 'Vestido'],
    'monto': [500, 50, 1000, 80, 800, 120],
    'cantidad': [2, 10, 1, 15, 3, 8]
})

resumen = ventas.groupby('categoria').agg(
    total_ventas=('monto', 'sum'),
    promedio_monto=('monto', 'mean'),
    productos_vendidos=('producto', 'count'),
    max_cantidad=('cantidad', 'max')
).reset_index()

print(resumen)`,
    testCode: `
assert 'total_ventas' in resumen.columns, "Should have total_ventas column"
assert 'promedio_monto' in resumen.columns, "Should have promedio_monto column"
electro = resumen[resumen['categoria'] == 'Electro']
assert electro['total_ventas'].values[0] == 2300, "Electro total should be 2300"
print("✅ ¡Correcto!")
`,
  },
  // === DUPLICADOS ===
  {
    id: 'py-pdx9',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'duplicates', 'cleaning'],
    interviewFrequency: 'very_high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Encontrar y eliminar duplicados',
      en: 'Find and Remove Duplicates',
      pt: 'Encontrar e Remover Duplicados'
    },
    description: {
      es: 'Identificá y eliminá filas duplicadas basándote en ciertas columnas.',
      en: 'Identify and remove duplicate rows based on certain columns.',
      pt: 'Identifique e remova linhas duplicadas baseando-se em certas colunas.'
    },
    theory: {
      es: `**Duplicados en Pandas:**

\`\`\`python
# Detectar duplicados
df.duplicated()                    # Todas las columnas
df.duplicated(subset=['col1'])     # Solo algunas columnas
df.duplicated(keep='first')        # Marca duplicados excepto primero
df.duplicated(keep='last')         # Marca duplicados excepto último
df.duplicated(keep=False)          # Marca TODOS los duplicados

# Contar duplicados
df.duplicated().sum()

# Eliminar duplicados
df.drop_duplicates()
df.drop_duplicates(subset=['email'])
df.drop_duplicates(keep='last')
\`\`\``,
      en: `**Duplicates in Pandas:**

\`\`\`python
# Detect duplicates
df.duplicated()                    # All columns
df.duplicated(subset=['col1'])     # Only some columns
df.duplicated(keep='first')        # Mark duplicates except first
df.duplicated(keep='last')         # Mark duplicates except last
df.duplicated(keep=False)          # Mark ALL duplicates

# Count duplicates
df.duplicated().sum()

# Remove duplicates
df.drop_duplicates()
df.drop_duplicates(subset=['email'])
df.drop_duplicates(keep='last')
\`\`\``,
      pt: `**Duplicados em Pandas:**

\`\`\`python
# Detectar duplicados
df.duplicated()                    # Todas as colunas
df.duplicated(subset=['col1'])     # Apenas algumas colunas
df.duplicated(keep='first')        # Marca duplicados exceto primeiro
df.duplicated(keep='last')         # Marca duplicados exceto último
df.duplicated(keep=False)          # Marca TODOS os duplicados

# Contar duplicados
df.duplicated().sum()

# Remover duplicados
df.drop_duplicates()
df.drop_duplicates(subset=['email'])
df.drop_duplicates(keep='last')
\`\`\``
    },
    realWorldExample: {
      es: 'Limpieza de datos, deduplicación de registros.',
      en: 'Data cleaning, record deduplication.',
      pt: 'Limpeza de dados, deduplicação de registros.'
    },
    hint: {
      es: 'Usá drop_duplicates(subset=["email"], keep="last")',
      en: 'Use drop_duplicates(subset=["email"], keep="last")',
      pt: 'Use drop_duplicates(subset=["email"], keep="last")'
    },
    
    starterCode: {
      es: `import pandas as pd

usuarios = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'email': ['ana@test.com', 'bob@test.com', 'ana@test.com', 'carlos@test.com', 'bob@test.com'],
    'nombre': ['Ana', 'Bob', 'Ana García', 'Carlos', 'Robert'],
    'registro': ['2024-01-01', '2024-01-02', '2024-01-15', '2024-01-03', '2024-02-01']
})

print("Original:")
print(usuarios)

# 1. Contá cuántos emails duplicados hay
duplicados = 0

# 2. Eliminá duplicados por email, quedándote con el ÚLTIMO registro
usuarios_unicos = None

# Tu código aquí

print(f"\\nEmails duplicados: {duplicados}")
print("\\nUsuarios únicos:")
print(usuarios_unicos)`,
      en: `import pandas as pd

users = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'email': ['ana@test.com', 'bob@test.com', 'ana@test.com', 'carlos@test.com', 'bob@test.com'],
    'name': ['Ana', 'Bob', 'Ana García', 'Carlos', 'Robert'],
    'registered': ['2024-01-01', '2024-01-02', '2024-01-15', '2024-01-03', '2024-02-01']
})

print("Original:")
print(users)

# 1. Count how many duplicate emails there are
duplicates = 0

# 2. Remove duplicates by email, keeping the LAST record
unique_users = None

# Your code here

print(f"\\nDuplicate emails: {duplicates}")
print("\\nUnique users:")
print(unique_users)`,
      pt: `import pandas as pd

usuarios = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'email': ['ana@test.com', 'bob@test.com', 'ana@test.com', 'carlos@test.com', 'bob@test.com'],
    'nome': ['Ana', 'Bob', 'Ana García', 'Carlos', 'Robert'],
    'registro': ['2024-01-01', '2024-01-02', '2024-01-15', '2024-01-03', '2024-02-01']
})

print("Original:")
print(usuarios)

# 1. Conte quantos e-mails duplicados existem
duplicados = 0

# 2. Remova duplicados por email, ficando com o ÚLTIMO registro
usuarios_unicos = None

# Seu código aqui

print(f"\\nEmails duplicados: {duplicados}")
print("\\nUsuários únicos:")
print(usuarios_unicos)`
    },
    solution: `import pandas as pd

usuarios = pd.DataFrame({
    'id': [1, 2, 3, 4, 5],
    'email': ['ana@test.com', 'bob@test.com', 'ana@test.com', 'carlos@test.com', 'bob@test.com'],
    'nombre': ['Ana', 'Bob', 'Ana García', 'Carlos', 'Robert'],
    'registro': ['2024-01-01', '2024-01-02', '2024-01-15', '2024-01-03', '2024-02-01']
})

duplicados = usuarios.duplicated(subset=['email']).sum()
usuarios_unicos = usuarios.drop_duplicates(subset=['email'], keep='last')

print("Original:")
print(usuarios)
print(f"\\nEmails duplicados: {duplicados}")
print("\\nUsuarios únicos:")
print(usuarios_unicos)`,
    testCode: `
assert duplicados == 2, f"Should have 2 duplicates, got {duplicados}"
assert len(usuarios_unicos) == 3, f"Should have 3 unique users, got {len(usuarios_unicos)}"
print("✅ ¡Correcto!")
`,
  },
  // === CONCAT Y APPEND ===
  {
    id: 'py-pdx10',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'concat', 'union'],
    interviewFrequency: 'high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Concatenar DataFrames',
      en: 'Concatenate DataFrames',
      pt: 'Concatenar DataFrames'
    },
    description: {
      es: 'Uní datos de ventas de diferentes meses en un solo DataFrame.',
      en: 'Combine sales data from different months into a single DataFrame.',
      pt: 'Una dados de vendas de diferentes meses em um só DataFrame.'
    },
    theory: {
      es: `**pd.concat() para unir DataFrames:**

\`\`\`python
# Unir verticalmente (agregar filas)
pd.concat([df1, df2])
pd.concat([df1, df2], ignore_index=True)  # Reiniciar índices

# Unir horizontalmente (agregar columnas)
pd.concat([df1, df2], axis=1)

# Múltiples DataFrames
pd.concat([df1, df2, df3, df4])

# Con keys para identificar origen
pd.concat([df1, df2], keys=['enero', 'febrero'])
\`\`\``,
      en: `**pd.concat() to join DataFrames:**

\`\`\`python
# Join vertically (add rows)
pd.concat([df1, df2])
pd.concat([df1, df2], ignore_index=True)  # Reset indices

# Join horizontally (add columns)
pd.concat([df1, df2], axis=1)

# Multiple DataFrames
pd.concat([df1, df2, df3, df4])

# With keys to identify source
pd.concat([df1, df2], keys=['january', 'february'])
\`\`\``,
      pt: `**pd.concat() para juntar DataFrames:**

\`\`\`python
# Juntar verticalmente (adicionar linhas)
pd.concat([df1, df2])
pd.concat([df1, df2], ignore_index=True)  # Reiniciar índices

# Juntar horizontalmente (adicionar colunas)
pd.concat([df1, df2], axis=1)

# Múltiplos DataFrames
pd.concat([df1, df2, df3, df4])

# Com keys para identificar origem
pd.concat([df1, df2], keys=['janeiro', 'fevereiro'])
\`\`\``
    },
    realWorldExample: {
      es: 'Consolidar datos de múltiples fuentes o períodos.',
      en: 'Consolidate data from multiple sources or periods.',
      pt: 'Consolidar dados de múltiplas fontes ou períodos.'
    },
    hint: {
      es: 'Usá pd.concat([df1, df2], ignore_index=True)',
      en: 'Use pd.concat([df1, df2], ignore_index=True)',
      pt: 'Use pd.concat([df1, df2], ignore_index=True)'
    },
    
    starterCode: {
      es: `import pandas as pd

ventas_enero = pd.DataFrame({
    'producto': ['A', 'B'],
    'ventas': [100, 150],
    'mes': ['Enero', 'Enero']
})

ventas_febrero = pd.DataFrame({
    'producto': ['A', 'B'],
    'ventas': [120, 180],
    'mes': ['Febrero', 'Febrero']
})

ventas_marzo = pd.DataFrame({
    'producto': ['A', 'B'],
    'ventas': [130, 200],
    'mes': ['Marzo', 'Marzo']
})

# Concatená los 3 DataFrames en uno solo
# Usá ignore_index=True para reiniciar los índices
ventas_totales = None

# Tu código aquí

print(ventas_totales)`,
      en: `import pandas as pd

sales_jan = pd.DataFrame({
    'product': ['A', 'B'],
    'sales': [100, 150],
    'month': ['January', 'January']
})

sales_feb = pd.DataFrame({
    'product': ['A', 'B'],
    'sales': [120, 180],
    'month': ['February', 'February']
})

sales_mar = pd.DataFrame({
    'product': ['A', 'B'],
    'sales': [130, 200],
    'month': ['March', 'March']
})

# Concatenate the 3 DataFrames into one
# Use ignore_index=True to reset indices
total_sales = None

# Your code here

print(total_sales)`,
      pt: `import pandas as pd

vendas_jan = pd.DataFrame({
    'produto': ['A', 'B'],
    'vendas': [100, 150],
    'mes': ['Janeiro', 'Janeiro']
})

vendas_fev = pd.DataFrame({
    'produto': ['A', 'B'],
    'vendas': [120, 180],
    'mes': ['Fevereiro', 'Fevereiro']
})

vendas_mar = pd.DataFrame({
    'produto': ['A', 'B'],
    'vendas': [130, 200],
    'mes': ['Março', 'Março']
})

# Concatene os 3 DataFrames em um só
# Use ignore_index=True para reiniciar os índices
vendas_totais = None

# Seu código aqui

print(vendas_totais)`
    },
    solution: `import pandas as pd

ventas_enero = pd.DataFrame({
    'producto': ['A', 'B'],
    'ventas': [100, 150],
    'mes': ['Enero', 'Enero']
})

ventas_febrero = pd.DataFrame({
    'producto': ['A', 'B'],
    'ventas': [120, 180],
    'mes': ['Febrero', 'Febrero']
})

ventas_marzo = pd.DataFrame({
    'producto': ['A', 'B'],
    'ventas': [130, 200],
    'mes': ['Marzo', 'Marzo']
})

ventas_totales = pd.concat([ventas_enero, ventas_febrero, ventas_marzo], ignore_index=True)

print(ventas_totales)`,
    testCode: `
assert len(ventas_totales) == 6, f"Should have 6 rows, got {len(ventas_totales)}"
assert list(ventas_totales.index) == [0, 1, 2, 3, 4, 5], "Index should be reset"
print("✅ ¡Correcto!")
`,
  },
  // === VALUE_COUNTS ===
  {
    id: 'py-pdx11',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'value_counts', 'frequency'],
    interviewFrequency: 'very_high',
    xpReward: 15,
    coinsReward: 6,
    
    title: {
      es: 'Contar valores con value_counts()',
      en: 'Count Values with value_counts()',
      pt: 'Contar Valores com value_counts()'
    },
    description: {
      es: 'Analizá la distribución de categorías y estados de pedidos.',
      en: 'Analyze the distribution of categories and order statuses.',
      pt: 'Analise a distribuição de categorias e status de pedidos.'
    },
    theory: {
      es: `**value_counts() para frecuencias:**

\`\`\`python
# Conteo básico
df['categoria'].value_counts()

# Con porcentajes
df['categoria'].value_counts(normalize=True) * 100

# Incluir NaN
df['col'].value_counts(dropna=False)

# Ordenar por índice
df['col'].value_counts().sort_index()

# Agrupar valores (bins)
df['edad'].value_counts(bins=5)
\`\`\``,
      en: `**value_counts() for frequencies:**

\`\`\`python
# Basic count
df['category'].value_counts()

# With percentages
df['category'].value_counts(normalize=True) * 100

# Include NaN
df['col'].value_counts(dropna=False)

# Sort by index
df['col'].value_counts().sort_index()

# Group values (bins)
df['age'].value_counts(bins=5)
\`\`\``,
      pt: `**value_counts() para frequências:**

\`\`\`python
# Contagem básica
df['categoria'].value_counts()

# Com porcentagens
df['categoria'].value_counts(normalize=True) * 100

# Incluir NaN
df['col'].value_counts(dropna=False)

# Ordenar por índice
df['col'].value_counts().sort_index()

# Agrupar valores (bins)
df['idade'].value_counts(bins=5)
\`\`\``
    },
    realWorldExample: {
      es: 'Análisis exploratorio, distribución de datos.',
      en: 'Exploratory analysis, data distribution.',
      pt: 'Análise exploratória, distribuição de dados.'
    },
    hint: {
      es: 'Usá value_counts() para conteo y value_counts(normalize=True) para %',
      en: 'Use value_counts() for count and value_counts(normalize=True) for %',
      pt: 'Use value_counts() para contagem e value_counts(normalize=True) para %'
    },
    
    starterCode: {
      es: `import pandas as pd

pedidos = pd.DataFrame({
    'pedido_id': range(1, 11),
    'estado': ['entregado', 'pendiente', 'entregado', 'cancelado', 
               'entregado', 'entregado', 'pendiente', 'entregado',
               'cancelado', 'entregado']
})

# 1. Contá cuántos pedidos hay por estado
conteo = None

# 2. Calculá el porcentaje de cada estado
porcentajes = None

# Tu código aquí

print("Conteo por estado:")
print(conteo)
print("\\nPorcentaje por estado:")
print(porcentajes)`,
      en: `import pandas as pd

orders = pd.DataFrame({
    'order_id': range(1, 11),
    'status': ['delivered', 'pending', 'delivered', 'cancelled', 
               'delivered', 'delivered', 'pending', 'delivered',
               'cancelled', 'delivered']
})

# 1. Count how many orders per status
count = None

# 2. Calculate percentage of each status
percentages = None

# Your code here

print("Count by status:")
print(count)
print("\\nPercentage by status:")
print(percentages)`,
      pt: `import pandas as pd

pedidos = pd.DataFrame({
    'pedido_id': range(1, 11),
    'status': ['entregue', 'pendente', 'entregue', 'cancelado', 
               'entregue', 'entregue', 'pendente', 'entregue',
               'cancelado', 'entregue']
})

# 1. Conte quantos pedidos por status
contagem = None

# 2. Calcule a porcentagem de cada status
porcentagens = None

# Seu código aqui

print("Contagem por status:")
print(contagem)
print("\\nPorcentagem por status:")
print(porcentagens)`
    },
    solution: `import pandas as pd

pedidos = pd.DataFrame({
    'pedido_id': range(1, 11),
    'estado': ['entregado', 'pendiente', 'entregado', 'cancelado', 
               'entregado', 'entregado', 'pendiente', 'entregado',
               'cancelado', 'entregado']
})

conteo = pedidos['estado'].value_counts()
porcentajes = pedidos['estado'].value_counts(normalize=True) * 100

print("Conteo por estado:")
print(conteo)
print("\\nPorcentaje por estado:")
print(porcentajes)`,
    testCode: `
assert conteo['entregado'] == 6, "Should have 6 delivered"
assert abs(porcentajes['entregado'] - 60) < 0.1, "Delivered should be 60%"
print("✅ ¡Correcto!")
`,
  },
  // === QUERY ===
  {
    id: 'py-pdx12',
    type: 'python',
    difficulty: 'easy',
    category: 'python',
    subcategory: 'pandas',
    tags: ['pandas', 'query', 'filter'],
    interviewFrequency: 'high',
    xpReward: 20,
    coinsReward: 8,
    
    title: {
      es: 'Filtrar con query() estilo SQL',
      en: 'Filter with SQL-style query()',
      pt: 'Filtrar com query() estilo SQL'
    },
    description: {
      es: 'Usá query() para filtrar datos con sintaxis similar a SQL.',
      en: 'Use query() to filter data with SQL-like syntax.',
      pt: 'Use query() para filtrar dados com sintaxe similar ao SQL.'
    },
    theory: {
      es: `**query() para filtros legibles:**

\`\`\`python
# En vez de:
df[(df['edad'] > 18) & (df['ciudad'] == 'Madrid')]

# Podés usar:
df.query("edad > 18 and ciudad == 'Madrid'")

# Variables con @
min_edad = 18
df.query("edad > @min_edad")

# Operadores
df.query("categoria in ['A', 'B']")
df.query("nombre.str.contains('Ana')", engine='python')
\`\`\`

**Ventaja:** Más legible para queries complejos.`,
      en: `**query() for readable filters:**

\`\`\`python
# Instead of:
df[(df['age'] > 18) & (df['city'] == 'Madrid')]

# You can use:
df.query("age > 18 and city == 'Madrid'")

# Variables with @
min_age = 18
df.query("age > @min_age")

# Operators
df.query("category in ['A', 'B']")
df.query("name.str.contains('Ana')", engine='python')
\`\`\`

**Advantage:** More readable for complex queries.`,
      pt: `**query() para filtros legíveis:**

\`\`\`python
# Em vez de:
df[(df['idade'] > 18) & (df['cidade'] == 'Madrid')]

# Você pode usar:
df.query("idade > 18 and cidade == 'Madrid'")

# Variáveis com @
min_idade = 18
df.query("idade > @min_idade")

# Operadores
df.query("categoria in ['A', 'B']")
df.query("nome.str.contains('Ana')", engine='python')
\`\`\`

**Vantagem:** Mais legível para queries complexos.`
    },
    realWorldExample: {
      es: 'Filtros dinámicos, queries parametrizados.',
      en: 'Dynamic filters, parameterized queries.',
      pt: 'Filtros dinâmicos, queries parametrizados.'
    },
    hint: {
      es: `Usá query("columna > valor and otra_col == 'texto'")`,
      en: `Use query("column > value and other_col == 'text'")`,
      pt: `Use query("coluna > valor and outra_col == 'texto'")`
    },
    
    starterCode: {
      es: `import pandas as pd

productos = pd.DataFrame({
    'nombre': ['Laptop Pro', 'Mouse Basic', 'Monitor HD', 'Keyboard', 'Webcam'],
    'categoria': ['Electronics', 'Electronics', 'Electronics', 'Electronics', 'Accessories'],
    'precio': [999, 29, 349, 79, 89],
    'stock': [5, 100, 20, 50, 30]
})

# Usá query() para filtrar:
# - Productos de categoría 'Electronics'
# - Con precio menor a 500
# - Y stock mayor a 10

min_stock = 10
filtrados = None

# Tu código aquí

print(filtrados)`,
      en: `import pandas as pd

products = pd.DataFrame({
    'name': ['Laptop Pro', 'Mouse Basic', 'Monitor HD', 'Keyboard', 'Webcam'],
    'category': ['Electronics', 'Electronics', 'Electronics', 'Electronics', 'Accessories'],
    'price': [999, 29, 349, 79, 89],
    'stock': [5, 100, 20, 50, 30]
})

# Use query() to filter:
# - Products in 'Electronics' category
# - With price less than 500
# - And stock greater than 10

min_stock = 10
filtered = None

# Your code here

print(filtered)`,
      pt: `import pandas as pd

produtos = pd.DataFrame({
    'nome': ['Laptop Pro', 'Mouse Basic', 'Monitor HD', 'Keyboard', 'Webcam'],
    'categoria': ['Electronics', 'Electronics', 'Electronics', 'Electronics', 'Accessories'],
    'preco': [999, 29, 349, 79, 89],
    'estoque': [5, 100, 20, 50, 30]
})

# Use query() para filtrar:
# - Produtos da categoria 'Electronics'
# - Com preço menor que 500
# - E estoque maior que 10

min_estoque = 10
filtrados = None

# Seu código aqui

print(filtrados)`
    },
    solution: `import pandas as pd

productos = pd.DataFrame({
    'nombre': ['Laptop Pro', 'Mouse Basic', 'Monitor HD', 'Keyboard', 'Webcam'],
    'categoria': ['Electronics', 'Electronics', 'Electronics', 'Electronics', 'Accessories'],
    'precio': [999, 29, 349, 79, 89],
    'stock': [5, 100, 20, 50, 30]
})

min_stock = 10
filtrados = productos.query("categoria == 'Electronics' and precio < 500 and stock > @min_stock")

print(filtrados)`,
    testCode: `
assert len(filtrados) == 3, f"Should have 3 products, got {len(filtrados)}"
assert 'Laptop Pro' not in filtrados['nombre'].values, "Laptop Pro should be excluded (price > 500)"
print("✅ ¡Correcto!")
`,
  },
];

export default PYTHON_PANDAS_EXTENDED;

