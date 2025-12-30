import { Project } from '../../../types/members';

export const p1_extra_python_cleaning: Project = {
  id: 'p1-extra-python-cleaning',
  level: 1,
  title: { es: 'Masterclass de Limpieza con Pandas', en: 'Pandas Cleaning Masterclass', pt: 'Masterclass de Limpeza com Pandas' },
  description: {
    es: 'Limpiá un dataset sucio real: fechas mal formadas, nulos, duplicados y texto inconsistente. El 80% del trabajo de un DE.',
    en: 'Clean a real dirty dataset: malformed dates, nulls, duplicates, and inconsistent text. 80% of a DE\'s job.',
    pt: 'Limpe um dataset sujo real: datas mal formadas, nulos, duplicados e texto inconsistente. 80% do trabalho de um DE.'
  },
  difficulty: 'Intermedio',
  duration: '2-3 horas',
  skills: [{ es: 'Python' }, { es: 'Pandas' }, { es: 'Data Cleaning', en: 'Data Cleaning', pt: 'Limpeza de Dados' }],
  icon: '🧹',
  color: 'emerald',
  datasetId: 'crm_dirty',
  prerequisites: ['p1-etl-python'],
  estimatedLines: 50,
  realWorldExample: {
    es: 'Datos que llegan de Excel, inputs manuales o scrapers siempre vienen sucios y rompen los pipelines.',
    en: 'Data coming from Excel, manual inputs, or scrapers is always dirty and breaks pipelines.',
    pt: 'Dados que chegam de Excel, inputs manuais ou scrapers sempre vêm sujos e quebram os pipelines.'
  },
  usedBy: ['Todos los Data Engineers', 'Data Scientists', 'Analysts'],
  learningObjectives: [
    { es: 'Manejar valores nulos (fillna, dropna)', en: 'Handle null values (fillna, dropna)', pt: 'Lidar com valores nulos (fillna, dropna)' },
    { es: 'Normalizar texto (lower, strip, regex)', en: 'Normalize text (lower, strip, regex)', pt: 'Normalizar texto (lower, strip, regex)' },
    { es: 'Parsear fechas con formatos mixtos', en: 'Parse dates with mixed formats', pt: 'Parsear datas com formatos mistos' },
    { es: 'Detectar y eliminar duplicados difusos', en: 'Detect and remove fuzzy duplicates', pt: 'Detectar e remover duplicados difusos' },
  ],
  expectedOutputs: [
    {
      step: 2,
      description: { es: 'DataFrame limpio sin nulos críticos', en: 'Clean DataFrame without critical nulls', pt: 'DataFrame limpo sem nulos críticos' },
      example: `   id     name       email           signup_date
0  1      juan perez juan@mail.com   2023-01-01
1  2      ana lopez  ana@test.com    2023-01-02`
    },
  ],
  interviewStory: {
    hook: { es: "Salvé una migración de CRM detectando que el 30% de los emails estaban duplicados por espacios en blanco invisibles.", en: "Saved a CRM migration by detecting 30% of emails were duplicated due to invisible whitespace.", pt: "Salvei uma migração de CRM detectando que 30% dos emails estavam duplicados por espaços em branco invisíveis." },
    situation: { es: "Estábamos migrando datos de clientes a Salesforce y el sistema rechazaba la carga por duplicados, aunque a simple vista parecían únicos.", en: "We were migrating customer data to Salesforce and the system rejected the load due to duplicates, even though they looked unique.", pt: "Estávamos migrando dados de clientes para Salesforce e o sistema rejeitava a carga por duplicados, embora parecessem únicos." },
    task: { es: "Limpiar y desduplicar una base de 500k usuarios antes del deadline del lunes.", en: "Clean and deduplicate a 500k user base before Monday's deadline.", pt: "Limpar e desduplicar uma base de 500k usuários antes do prazo de segunda-feira." },
    actions: [
      { es: "Normalicé emails: lowercase y strip() para quitar espacios", en: "Normalized emails: lowercase and strip() to remove spaces", pt: "Normalizei emails: lowercase e strip() para tirar espaços" },
      { es: "Detecté caracteres no imprimibles con regex", en: "Detected non-printable characters with regex", pt: "Detectei caracteres não imprimíveis com regex" },
      { es: "Unifiqué formatos de fecha que venían mezclados (DD/MM/YY vs MM-DD-YYYY)", en: "Unified mixed date formats (DD/MM/YY vs MM-DD-YYYY)", pt: "Unifiquei formatos de data que vinham misturados (DD/MM/YY vs MM-DD-YYYY)" },
      { es: "Imputé datos faltantes usando la moda por categoría", en: "Imputed missing data using mode by category", pt: "Imputei dados faltantes usando a moda por categoria" }
    ],
    results: [
      { es: "La carga a Salesforce pasó sin errores", en: "Salesforce load passed without errors", pt: "A carga para Salesforce passou sem erros" },
      { es: "Reduje la base de 500k a 350k registros reales únicos", en: "Reduced base from 500k to 350k real unique records", pt: "Reduzi a base de 500k para 350k registros reais únicos" },
      { es: "Creé una librería de limpieza estándar para el equipo", en: "Created a standard cleaning library for the team", pt: "Criei uma biblioteca de limpeza padrão para a equipe" }
    ],
    learnings: [
      { es: "Nunca confíes en los datos de entrada, SIEMPRE explorá primero", en: "Never trust input data, ALWAYS explore first", pt: "Nunca confie nos dados de entrada, SEMPRE explore primeiro" },
      { es: "La limpieza debe ser reproducible (código vs Excel manual)", en: "Cleaning must be reproducible (code vs manual Excel)", pt: "A limpeza deve ser reproduzível (código vs Excel manual)" },
      { es: "Hay que definir reglas de negocio para los nulos (¿borrar o imputar?)", en: "Business rules for nulls must be defined (delete or impute?)", pt: "Tem que definir regras de negócio para os nulos (apagar ou imputar?)" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo manejás los valores nulos?", en: "How do you handle null values?", pt: "Como lida com valores nulos?" },
        answer: { es: "Depende del caso. Si es crítico (ID), borro la fila. Si es numérico, puedo usar media/mediana. Si es categórico, 'Unknown' o moda. Siempre consulto a negocio.", en: "Depends on the case. If critical (ID), I drop row. If numeric, might use mean/median. If categorical, 'Unknown' or mode. Always consult business.", pt: "Depende do caso. Se é crítico (ID), apago a linha. Se é numérico, posso usar média/mediana. Se é categórico, 'Unknown' ou moda. Sempre consulto o negócio." }
      },
      {
        question: { es: "¿Cómo convertís una columna object a datetime?", en: "How do you convert an object column to datetime?", pt: "Como converte uma coluna object para datetime?" },
        answer: { es: "pd.to_datetime(col, errors='coerce') para manejar errores transformándolos en NaT.", en: "pd.to_datetime(col, errors='coerce') to handle errors by turning them into NaT.", pt: "pd.to_datetime(col, errors='coerce') para lidar com erros transformando em NaT." }
      },
      {
        question: { es: "¿Cómo detectás outliers?", en: "How do you detect outliers?", pt: "Como detecta outliers?" },
        answer: { es: "Visualmente con boxplots, o estadísticamente (Z-score > 3 o rango intercuartil IQR).", en: "Visually with boxplots, or statistically (Z-score > 3 or IQR).", pt: "Visualmente com boxplots, ou estatisticamente (Z-score > 3 ou intervalo interquartil IQR)." }
      }
    ],
    closingStatement: { es: "Data Cleaning no es glamoroso, pero es la base de todo pipeline confiable.", en: "Data Cleaning is not glamorous, but it's the foundation of every reliable pipeline.", pt: "Data Cleaning não é glamoroso, mas é a base de todo pipeline confiável." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '🕵️ Exploración inicial (EDA)', en: '🕵️ Initial Exploration (EDA)', pt: '🕵️ Exploração inicial (EDA)' },
      code: `import pandas as pd

df = pd.read_csv('dirty_data.csv')

# Ver info general y nulos
print(df.info())
print(df.isnull().sum())

# Ver valores únicos en columna de texto para detectar inconsistencias
print(df['category'].unique())`,
      explanation: { es: 'Antes de tocar nada, mirá qué tenés. df.info() y value_counts() son tus mejores amigos.', en: 'Before touching anything, see what you have. df.info() and value_counts() are your best friends.', pt: 'Antes de tocar nada, veja o que tem. df.info() e value_counts() são seus melhores amigos.' },
      checkpoint: { es: '¿Identificaste qué columnas tienen nulos?', en: 'Identified which columns have nulls?', pt: 'Identificou quais colunas têm nulos?' }
    },
    { 
      order: 2, 
      text: { es: '🧹 Limpieza de texto', en: '🧹 Text cleaning', pt: '🧹 Limpeza de texto' },
      code: `# Estandarizar a minúsculas y quitar espacios
df['email'] = df['email'].str.lower().str.strip()

# Reemplazar valores inconsistentes
df['category'] = df['category'].replace({
    'Elec.': 'Electronics',
    'electronic': 'Electronics'
})

# Regex para limpiar precios (quitar $)
df['price'] = df['price'].astype(str).str.replace('$', '').astype(float)`,
      explanation: { es: 'El texto sucio impide agrupar y unir datos. Estandarizá siempre.', en: 'Dirty text prevents grouping and joining. Always standardize.', pt: 'Texto sujo impede agrupar e unir dados. Estandarize sempre.' },
      tip: { es: 'Usá regex para patrones complejos.', en: 'Use regex for complex patterns.', pt: 'Use regex para padrões complexos.' }
    },
    { 
      order: 3, 
      text: { es: '📅 Fechas y Nulos', en: '📅 Dates and Nulls', pt: '📅 Datas e Nulos' },
      code: `# Convertir fechas (maneja errores)
df['date'] = pd.to_datetime(df['date'], errors='coerce')

# Llenar nulos (Imputación)
df['category'] = df['category'].fillna('Unknown')
df['amount'] = df['amount'].fillna(0)

# Borrar filas si el ID es nulo
df = df.dropna(subset=['user_id'])`,
      explanation: { es: 'errors="coerce" convierte fechas inválidas en NaT (Not a Time). Decidí qué hacer con los nulos según negocio.', en: 'errors="coerce" turns invalid dates into NaT. Decide what to do with nulls based on business.', pt: 'errors="coerce" converte datas inválidas em NaT (Not a Time). Decida o que fazer com os nulos segundo o negócio.' }
    },
    { 
      order: 4, 
      text: { es: '👯 Desduplicación', en: '👯 Deduplication', pt: '👯 Desduplicação' },
      code: `# Ver duplicados exactos
print(df.duplicated().sum())

# Borrar duplicados manteniendo el primero
df = df.drop_duplicates(subset=['user_id', 'date'], keep='first')`,
      explanation: { es: 'Los duplicados inflan métricas. Definí qué columnas hacen única a una fila (Primary Key lógica).', en: 'Duplicates inflate metrics. Define which columns make a row unique (logical Primary Key).', pt: 'Duplicados inflam métricas. Defina quais colunas fazem uma linha única (Primary Key lógica).' }
    },
    { 
      order: 5, 
      text: { es: '💾 Guardar limpio', en: '💾 Save clean', pt: '💾 Salvar limpo' },
      code: `df.to_csv('clean_data.csv', index=False)`,
      explanation: { es: 'Guardá el resultado sin el índice de Pandas.', en: 'Save result without Pandas index.', pt: 'Salve o resultado sem o índice do Pandas.' }
    },
  ],
  deliverable: { es: 'Notebook de Python que lee CSV sucio y guarda CSV limpio', en: 'Python Notebook reading dirty CSV and saving clean CSV', pt: 'Notebook de Python que lê CSV sujo e salva CSV limpo' },
  evaluation: [
    { es: '¿El código maneja fechas inválidas?', en: 'Does code handle invalid dates?', pt: 'O código lida com datas inválidas?' },
    { es: '¿Están los textos estandarizados?', en: 'Are texts standardized?', pt: 'Os textos estão estandarizados?' },
    { es: '¿Justificaste cómo trataste los nulos?', en: 'Did you justify how you handled nulls?', pt: 'Justificou como tratou os nulos?' },
    { es: '¿El CSV final no tiene índice extra?', en: 'Does final CSV lack extra index?', pt: 'O CSV final não tem índice extra?' },
  ],
  theory: { es: `## Técnicas de Limpieza

### 1. Missing Data (Nulos)
- **MCAR**: Missing Completely At Random (no hay patrón).
- **MNAR**: Missing Not At Random (hay una razón, ej: gente rica no dice su sueldo).
- **Acciones**: Drop (borrar), Impute (promedio, moda, valor fijo).

### 2. Data Types
- Convertir siempre a tipos correctos: \`int\`, \`float\`, \`datetime\`, \`category\`.
- Optimiza memoria y permite operaciones correctas.

### 3. Outliers
- Valores extremos que pueden ser errores o anomalías reales.
- Detectar con Z-Score o IQR.

### 4. Inconsistencias
- "USA", "U.S.A.", "United States" -> Todo a "USA".
- Mapeos manuales o algoritmos de distancia de texto (Levenshtein).`, en: `## Cleaning Techniques

### 1. Missing Data (Nulls)
- **MCAR**: Missing Completely At Random (no pattern).
- **MNAR**: Missing Not At Random (there's a reason, e.g., rich people don't disclose salary).
- **Actions**: Drop (delete), Impute (mean, mode, fixed value).

### 2. Data Types
- Always convert to correct types: \`int\`, \`float\`, \`datetime\`, \`category\`.
- Optimizes memory and enables correct operations.

### 3. Outliers
- Extreme values that can be errors or real anomalies.
- Detect with Z-Score or IQR.

### 4. Inconsistencies
- "USA", "U.S.A.", "United States" -> All to "USA".
- Manual mappings or text distance algorithms (Levenshtein).`, pt: `## Técnicas de Limpeza

### 1. Missing Data (Nulos)
- **MCAR**: Missing Completely At Random (não há padrão).
- **MNAR**: Missing Not At Random (há uma razão, ex: gente rica não diz seu salário).
- **Ações**: Drop (apagar), Impute (média, moda, valor fixo).

### 2. Data Types
- Converter sempre para tipos corretos: \`int\`, \`float\`, \`datetime\`, \`category\`.
- Otimiza memória e permite operações corretas.

### 3. Outliers
- Valores extremos que podem ser erros ou anomalias reais.
- Detectar com Z-Score ou IQR.

### 4. Inconsistências
- "USA", "U.S.A.", "United States" -> Tudo para "USA".
- Mapeamentos manuais ou algoritmos de distância de texto (Levenshtein).` },
};


