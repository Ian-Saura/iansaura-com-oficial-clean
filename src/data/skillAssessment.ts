/**
 * Skill Assessment System for Data Engineering
 * 
 * Evalua 4 areas:
 * 1. SQL (queries, joins, window functions, optimization)
 * 2. Python (pandas, data manipulation, ETL patterns)
 * 3. Data Engineering Concepts (arquitectura, tools, best practices)
 * 4. System Design (basico)
 */

export type SkillArea = 'sql' | 'python' | 'concepts' | 'system-design';
export type QuestionDifficulty = 'junior' | 'mid' | 'senior';

export interface AssessmentQuestion {
  id: string;
  area: SkillArea;
  difficulty: QuestionDifficulty;
  question: {
    es: string;
    en: string;
    pt: string;
  };
  options: {
    id: string;
    text: { es: string; en: string; pt: string };
    isCorrect: boolean;
  }[];
  explanation: {
    es: string;
    en: string;
    pt: string;
  };
  codeSnippet?: string;
  timeLimit: number;
  points: number;
}

export interface AssessmentResult {
  totalScore: number;
  maxScore: number;
  percentage: number;
  level: 'junior' | 'mid' | 'senior' | 'expert';
  byArea: {
    area: SkillArea;
    score: number;
    maxScore: number;
    percentage: number;
    recommendation: { es: string; en: string; pt: string };
  }[];
  strengths: SkillArea[];
  weaknesses: SkillArea[];
  readyToApply: boolean;
  nextSteps: { es: string[]; en: string[]; pt: string[] };
}

export const SKILL_AREAS = [
  { 
    id: 'sql' as SkillArea, 
    name: { es: 'SQL', en: 'SQL', pt: 'SQL' },
    icon: '🗃️',
    description: { es: 'Queries, JOINs, Window Functions, Optimizacion', en: 'Queries, JOINs, Window Functions, Optimization', pt: 'Queries, JOINs, Window Functions, Otimizacao' }
  },
  { 
    id: 'python' as SkillArea, 
    name: { es: 'Python', en: 'Python', pt: 'Python' },
    icon: '🐍',
    description: { es: 'Pandas, ETL, Data Manipulation', en: 'Pandas, ETL, Data Manipulation', pt: 'Pandas, ETL, Manipulacao de Dados' }
  },
  { 
    id: 'concepts' as SkillArea, 
    name: { es: 'Conceptos DE', en: 'DE Concepts', pt: 'Conceitos DE' },
    icon: '🧠',
    description: { es: 'Arquitectura, Tools, Best Practices', en: 'Architecture, Tools, Best Practices', pt: 'Arquitetura, Tools, Best Practices' }
  },
  { 
    id: 'system-design' as SkillArea, 
    name: { es: 'System Design', en: 'System Design', pt: 'System Design' },
    icon: '🏗️',
    description: { es: 'Diseno de pipelines y arquitecturas', en: 'Pipeline and architecture design', pt: 'Design de pipelines e arquiteturas' }
  },
];

export const ASSESSMENT_QUESTIONS: AssessmentQuestion[] = [
  // SQL - JUNIOR
  {
    id: 'sql-j-1',
    area: 'sql',
    difficulty: 'junior',
    question: {
      es: 'Cual es la diferencia entre WHERE y HAVING?',
      en: 'What is the difference between WHERE and HAVING?',
      pt: 'Qual e a diferenca entre WHERE e HAVING?'
    },
    options: [
      { id: 'a', text: { es: 'WHERE filtra antes del GROUP BY, HAVING filtra despues del GROUP BY', en: 'WHERE filters before GROUP BY, HAVING filters after GROUP BY', pt: 'WHERE filtra antes do GROUP BY, HAVING filtra depois do GROUP BY' }, isCorrect: true },
      { id: 'b', text: { es: 'Son sinonimos, se pueden usar indistintamente', en: 'They are synonyms, can be used interchangeably', pt: 'Sao sinonimos, podem ser usados indistintamente' }, isCorrect: false },
      { id: 'c', text: { es: 'WHERE es para numeros, HAVING es para texto', en: 'WHERE is for numbers, HAVING is for text', pt: 'WHERE e para numeros, HAVING e para texto' }, isCorrect: false },
      { id: 'd', text: { es: 'HAVING solo funciona con COUNT, WHERE con cualquier columna', en: 'HAVING only works with COUNT, WHERE with any column', pt: 'HAVING so funciona com COUNT, WHERE com qualquer coluna' }, isCorrect: false }
    ],
    explanation: {
      es: 'WHERE filtra filas ANTES de agrupar. HAVING filtra grupos DESPUES de la agregacion.',
      en: 'WHERE filters rows BEFORE grouping. HAVING filters groups AFTER aggregation.',
      pt: 'WHERE filtra linhas ANTES de agrupar. HAVING filtra grupos DEPOIS da agregacao.'
    },
    timeLimit: 45,
    points: 10
  },
  {
    id: 'sql-j-2',
    area: 'sql',
    difficulty: 'junior',
    question: {
      es: 'Que resultado da esta query?',
      en: 'What result does this query give?',
      pt: 'Que resultado essa query da?'
    },
    codeSnippet: `SELECT department, COUNT(*) as emp_count
FROM employees
GROUP BY department
ORDER BY emp_count DESC
LIMIT 3;`,
    options: [
      { id: 'a', text: { es: 'Los 3 departamentos con mas empleados', en: 'The 3 departments with most employees', pt: 'Os 3 departamentos com mais funcionarios' }, isCorrect: true },
      { id: 'b', text: { es: 'Los 3 primeros empleados de cada departamento', en: 'The first 3 employees of each department', pt: 'Os 3 primeiros funcionarios de cada departamento' }, isCorrect: false },
      { id: 'c', text: { es: 'Todos los departamentos ordenados por nombre', en: 'All departments ordered by name', pt: 'Todos os departamentos ordenados por nome' }, isCorrect: false },
      { id: 'd', text: { es: 'Error porque emp_count no existe en la tabla', en: 'Error because emp_count does not exist in the table', pt: 'Erro porque emp_count nao existe na tabela' }, isCorrect: false }
    ],
    explanation: {
      es: 'GROUP BY agrupa por departamento, COUNT(*) cuenta empleados por grupo, ORDER BY DESC ordena de mayor a menor, y LIMIT 3 toma solo los top 3.',
      en: 'GROUP BY groups by department, COUNT(*) counts employees per group, ORDER BY DESC orders from highest to lowest, and LIMIT 3 takes only the top 3.',
      pt: 'GROUP BY agrupa por departamento, COUNT(*) conta funcionarios por grupo, ORDER BY DESC ordena de maior para menor, e LIMIT 3 pega apenas os top 3.'
    },
    timeLimit: 60,
    points: 10
  },
  // SQL - MID
  {
    id: 'sql-m-1',
    area: 'sql',
    difficulty: 'mid',
    question: {
      es: 'Que hace esta query con Window Functions?',
      en: 'What does this query with Window Functions do?',
      pt: 'O que essa query com Window Functions faz?'
    },
    codeSnippet: `SELECT employee_id, salary, department,
  RANK() OVER (PARTITION BY department ORDER BY salary DESC) as rank
FROM employees
WHERE rank <= 3;`,
    options: [
      { id: 'a', text: { es: 'Error: no podes filtrar por una columna calculada en el mismo SELECT', en: 'Error: you cannot filter by a calculated column in the same SELECT', pt: 'Erro: voce nao pode filtrar por uma coluna calculada no mesmo SELECT' }, isCorrect: true },
      { id: 'b', text: { es: 'Top 3 empleados mejor pagados por departamento', en: 'Top 3 highest paid employees per department', pt: 'Top 3 funcionarios mais bem pagos por departamento' }, isCorrect: false },
      { id: 'c', text: { es: 'Todos los empleados con su ranking de salario', en: 'All employees with their salary ranking', pt: 'Todos os funcionarios com seu ranking de salario' }, isCorrect: false },
      { id: 'd', text: { es: 'Los 3 departamentos con salarios mas altos', en: 'The 3 departments with highest salaries', pt: 'Os 3 departamentos com salarios mais altos' }, isCorrect: false }
    ],
    explanation: {
      es: 'WHERE se ejecuta ANTES del SELECT, por lo que "rank" no existe todavia. Para filtrar por window functions necesitas una subquery o CTE.',
      en: 'WHERE executes BEFORE SELECT, so "rank" does not exist yet. To filter by window functions you need a subquery or CTE.',
      pt: 'WHERE e executado ANTES do SELECT, entao "rank" ainda nao existe. Para filtrar por window functions voce precisa de uma subquery ou CTE.'
    },
    timeLimit: 90,
    points: 20
  },
  {
    id: 'sql-m-2',
    area: 'sql',
    difficulty: 'mid',
    question: {
      es: 'Que tipo de JOIN usarias para encontrar clientes SIN pedidos?',
      en: 'What type of JOIN would you use to find customers WITHOUT orders?',
      pt: 'Que tipo de JOIN voce usaria para encontrar clientes SEM pedidos?'
    },
    options: [
      { id: 'a', text: { es: 'LEFT JOIN + WHERE orders.id IS NULL', en: 'LEFT JOIN + WHERE orders.id IS NULL', pt: 'LEFT JOIN + WHERE orders.id IS NULL' }, isCorrect: true },
      { id: 'b', text: { es: 'INNER JOIN', en: 'INNER JOIN', pt: 'INNER JOIN' }, isCorrect: false },
      { id: 'c', text: { es: 'RIGHT JOIN + WHERE customers.id IS NULL', en: 'RIGHT JOIN + WHERE customers.id IS NULL', pt: 'RIGHT JOIN + WHERE customers.id IS NULL' }, isCorrect: false },
      { id: 'd', text: { es: 'CROSS JOIN', en: 'CROSS JOIN', pt: 'CROSS JOIN' }, isCorrect: false }
    ],
    explanation: {
      es: 'LEFT JOIN mantiene todos los registros de la tabla izquierda aunque no tengan match. Si orders.id IS NULL, significa que ese cliente no tiene pedidos.',
      en: 'LEFT JOIN keeps all records from the left table even without a match. If orders.id IS NULL, it means that customer has no orders.',
      pt: 'LEFT JOIN mantem todos os registros da tabela esquerda mesmo sem match. Se orders.id IS NULL, significa que esse cliente nao tem pedidos.'
    },
    timeLimit: 60,
    points: 20
  },
  // SQL - SENIOR
  {
    id: 'sql-s-1',
    area: 'sql',
    difficulty: 'senior',
    question: {
      es: 'Como optimizarias esta query lenta?',
      en: 'How would you optimize this slow query?',
      pt: 'Como voce otimizaria essa query lenta?'
    },
    codeSnippet: `SELECT * FROM orders o
JOIN products p ON o.product_id = p.id
WHERE DATE(o.created_at) = '2024-01-15'
  AND p.category = 'Electronics';`,
    options: [
      { id: 'a', text: { es: 'Evitar DATE() en WHERE (no usa indice), usar BETWEEN. Crear indice compuesto.', en: 'Avoid DATE() in WHERE (does not use index), use BETWEEN. Create composite index.', pt: 'Evitar DATE() no WHERE (nao usa indice), usar BETWEEN. Criar indice composto.' }, isCorrect: true },
      { id: 'b', text: { es: 'Cambiar JOIN por subquery', en: 'Change JOIN to subquery', pt: 'Mudar JOIN para subquery' }, isCorrect: false },
      { id: 'c', text: { es: 'Agregar LIMIT 1000', en: 'Add LIMIT 1000', pt: 'Adicionar LIMIT 1000' }, isCorrect: false },
      { id: 'd', text: { es: 'Usar SELECT DISTINCT', en: 'Use SELECT DISTINCT', pt: 'Usar SELECT DISTINCT' }, isCorrect: false }
    ],
    explanation: {
      es: 'DATE(created_at) aplica una funcion a cada fila, evitando que use el indice. Mejor: WHERE created_at >= "2024-01-15" AND created_at < "2024-01-16".',
      en: 'DATE(created_at) applies a function to each row, preventing index use. Better: WHERE created_at >= "2024-01-15" AND created_at < "2024-01-16".',
      pt: 'DATE(created_at) aplica uma funcao a cada linha, impedindo o uso do indice. Melhor: WHERE created_at >= "2024-01-15" AND created_at < "2024-01-16".'
    },
    timeLimit: 120,
    points: 30
  },
  // PYTHON - JUNIOR
  {
    id: 'py-j-1',
    area: 'python',
    difficulty: 'junior',
    question: {
      es: 'Que hace df.dropna()?',
      en: 'What does df.dropna() do?',
      pt: 'O que df.dropna() faz?'
    },
    options: [
      { id: 'a', text: { es: 'Elimina filas que contienen valores nulos (NaN)', en: 'Removes rows that contain null values (NaN)', pt: 'Remove linhas que contem valores nulos (NaN)' }, isCorrect: true },
      { id: 'b', text: { es: 'Reemplaza valores nulos por 0', en: 'Replaces null values with 0', pt: 'Substitui valores nulos por 0' }, isCorrect: false },
      { id: 'c', text: { es: 'Cuenta la cantidad de valores nulos', en: 'Counts the number of null values', pt: 'Conta a quantidade de valores nulos' }, isCorrect: false },
      { id: 'd', text: { es: 'Muestra las filas con valores nulos', en: 'Shows rows with null values', pt: 'Mostra as linhas com valores nulos' }, isCorrect: false }
    ],
    explanation: {
      es: 'dropna() elimina filas con NaN. Para reemplazar usas fillna(valor), para contar usas isnull().sum().',
      en: 'dropna() removes rows with NaN. To replace you use fillna(value), to count you use isnull().sum().',
      pt: 'dropna() remove linhas com NaN. Para substituir voce usa fillna(valor), para contar voce usa isnull().sum().'
    },
    timeLimit: 45,
    points: 10
  },
  {
    id: 'py-j-2',
    area: 'python',
    difficulty: 'junior',
    question: {
      es: 'Cual es la diferencia entre una lista y una tupla en Python?',
      en: 'What is the difference between a list and a tuple in Python?',
      pt: 'Qual e a diferenca entre uma lista e uma tupla em Python?'
    },
    options: [
      { id: 'a', text: { es: 'Listas son mutables, tuplas son inmutables', en: 'Lists are mutable, tuples are immutable', pt: 'Listas sao mutaveis, tuplas sao imutaveis' }, isCorrect: true },
      { id: 'b', text: { es: 'Listas usan [], tuplas usan {} - son lo mismo', en: 'Lists use [], tuples use {} - they are the same', pt: 'Listas usam [], tuplas usam {} - sao iguais' }, isCorrect: false },
      { id: 'c', text: { es: 'Listas solo guardan numeros, tuplas guardan cualquier tipo', en: 'Lists only store numbers, tuples store any type', pt: 'Listas so guardam numeros, tuplas guardam qualquer tipo' }, isCorrect: false },
      { id: 'd', text: { es: 'No hay diferencia, son sinonimos', en: 'There is no difference, they are synonyms', pt: 'Nao ha diferenca, sao sinonimos' }, isCorrect: false }
    ],
    explanation: {
      es: 'Las listas [] se pueden modificar despues de crear. Las tuplas () no. Tuplas son mas rapidas y se pueden usar como keys de diccionarios.',
      en: 'Lists [] can be modified after creation. Tuples () cannot. Tuples are faster and can be used as dictionary keys.',
      pt: 'Listas [] podem ser modificadas apos criar. Tuplas () nao. Tuplas sao mais rapidas e podem ser usadas como chaves de dicionarios.'
    },
    timeLimit: 45,
    points: 10
  },
  // PYTHON - MID
  {
    id: 'py-m-1',
    area: 'python',
    difficulty: 'mid',
    question: {
      es: 'Que hace este codigo?',
      en: 'What does this code do?',
      pt: 'O que esse codigo faz?'
    },
    codeSnippet: `df.groupby('category').agg({
    'sales': 'sum',
    'quantity': 'mean',
    'customer_id': 'nunique'
}).reset_index()`,
    options: [
      { id: 'a', text: { es: 'Agrupa por categoria: suma ventas, promedio cantidad, clientes unicos', en: 'Groups by category: sum sales, average quantity, unique customers', pt: 'Agrupa por categoria: soma vendas, media quantidade, clientes unicos' }, isCorrect: true },
      { id: 'b', text: { es: 'Filtra por categoria y ordena por ventas', en: 'Filters by category and orders by sales', pt: 'Filtra por categoria e ordena por vendas' }, isCorrect: false },
      { id: 'c', text: { es: 'Error porque agg no acepta diccionarios', en: 'Error because agg does not accept dictionaries', pt: 'Erro porque agg nao aceita dicionarios' }, isCorrect: false },
      { id: 'd', text: { es: 'Crea 3 nuevas columnas sin agrupar', en: 'Creates 3 new columns without grouping', pt: 'Cria 3 novas colunas sem agrupar' }, isCorrect: false }
    ],
    explanation: {
      es: 'agg() con diccionario permite aplicar diferentes funciones a diferentes columnas. "nunique" cuenta valores unicos.',
      en: 'agg() with dictionary allows applying different functions to different columns. "nunique" counts unique values.',
      pt: 'agg() com dicionario permite aplicar diferentes funcoes a diferentes colunas. "nunique" conta valores unicos.'
    },
    timeLimit: 90,
    points: 20
  },
  {
    id: 'py-m-2',
    area: 'python',
    difficulty: 'mid',
    question: {
      es: 'Cual es la forma mas eficiente de iterar sobre un DataFrame grande?',
      en: 'What is the most efficient way to iterate over a large DataFrame?',
      pt: 'Qual e a forma mais eficiente de iterar sobre um DataFrame grande?'
    },
    options: [
      { id: 'a', text: { es: 'Evitar iteracion: usar operaciones vectorizadas', en: 'Avoid iteration: use vectorized operations', pt: 'Evitar iteracao: usar operacoes vetorizadas' }, isCorrect: true },
      { id: 'b', text: { es: 'for index, row in df.iterrows()', en: 'for index, row in df.iterrows()', pt: 'for index, row in df.iterrows()' }, isCorrect: false },
      { id: 'c', text: { es: 'for i in range(len(df))', en: 'for i in range(len(df))', pt: 'for i in range(len(df))' }, isCorrect: false },
      { id: 'd', text: { es: 'df.to_dict() y luego iterar', en: 'df.to_dict() and then iterate', pt: 'df.to_dict() e depois iterar' }, isCorrect: false }
    ],
    explanation: {
      es: 'Las operaciones vectorizadas son 100-1000x mas rapidas que iterrows() porque usan optimizaciones en C.',
      en: 'Vectorized operations are 100-1000x faster than iterrows() because they use C optimizations.',
      pt: 'Operacoes vetorizadas sao 100-1000x mais rapidas que iterrows() porque usam otimizacoes em C.'
    },
    timeLimit: 60,
    points: 20
  },
  // PYTHON - SENIOR
  {
    id: 'py-s-1',
    area: 'python',
    difficulty: 'senior',
    question: {
      es: 'Que patron usarias para procesar un archivo de 50GB que no entra en memoria?',
      en: 'What pattern would you use to process a 50GB file that does not fit in memory?',
      pt: 'Que padrao voce usaria para processar um arquivo de 50GB que nao cabe na memoria?'
    },
    options: [
      { id: 'a', text: { es: 'Leer en chunks: pd.read_csv(file, chunksize=100000)', en: 'Read in chunks: pd.read_csv(file, chunksize=100000)', pt: 'Ler em chunks: pd.read_csv(file, chunksize=100000)' }, isCorrect: true },
      { id: 'b', text: { es: 'Aumentar la RAM del servidor', en: 'Increase the server RAM', pt: 'Aumentar a RAM do servidor' }, isCorrect: false },
      { id: 'c', text: { es: 'Usar df.sample() para tomar una muestra', en: 'Use df.sample() to take a sample', pt: 'Usar df.sample() para pegar uma amostra' }, isCorrect: false },
      { id: 'd', text: { es: 'Convertir a Excel que es mas eficiente', en: 'Convert to Excel which is more efficient', pt: 'Converter para Excel que e mais eficiente' }, isCorrect: false }
    ],
    explanation: {
      es: 'chunksize retorna un iterator que procesa N filas a la vez, manteniendo el uso de memoria constante.',
      en: 'chunksize returns an iterator that processes N rows at a time, keeping memory usage constant.',
      pt: 'chunksize retorna um iterator que processa N linhas por vez, mantendo o uso de memoria constante.'
    },
    timeLimit: 60,
    points: 30
  },
  // CONCEPTS - JUNIOR
  {
    id: 'concepts-j-1',
    area: 'concepts',
    difficulty: 'junior',
    question: {
      es: 'Que significa ETL?',
      en: 'What does ETL mean?',
      pt: 'O que significa ETL?'
    },
    options: [
      { id: 'a', text: { es: 'Extract, Transform, Load', en: 'Extract, Transform, Load', pt: 'Extract, Transform, Load' }, isCorrect: true },
      { id: 'b', text: { es: 'Every Table Loaded', en: 'Every Table Loaded', pt: 'Every Table Loaded' }, isCorrect: false },
      { id: 'c', text: { es: 'Execute Transfer Log', en: 'Execute Transfer Log', pt: 'Execute Transfer Log' }, isCorrect: false },
      { id: 'd', text: { es: 'External Table Link', en: 'External Table Link', pt: 'External Table Link' }, isCorrect: false }
    ],
    explanation: {
      es: 'ETL es el patron clasico: Extraes datos, los Transformas, y los Cargas en destino.',
      en: 'ETL is the classic pattern: Extract data, Transform it, and Load it to destination.',
      pt: 'ETL e o padrao classico: Extrair dados, Transforma-los, e Carrega-los no destino.'
    },
    timeLimit: 30,
    points: 10
  },
  {
    id: 'concepts-j-2',
    area: 'concepts',
    difficulty: 'junior',
    question: {
      es: 'Cual es la diferencia entre un Data Warehouse y una Base de Datos transaccional?',
      en: 'What is the difference between a Data Warehouse and a transactional Database?',
      pt: 'Qual e a diferenca entre um Data Warehouse e um Banco de Dados transacional?'
    },
    options: [
      { id: 'a', text: { es: 'DW optimizado para analisis, DB transaccional para operaciones rapidas', en: 'DW optimized for analytics, transactional DB for fast operations', pt: 'DW otimizado para analytics, DB transacional para operacoes rapidas' }, isCorrect: true },
      { id: 'b', text: { es: 'Son lo mismo, solo cambia el nombre', en: 'They are the same, just the name changes', pt: 'Sao o mesmo, so muda o nome' }, isCorrect: false },
      { id: 'c', text: { es: 'DW solo guarda archivos, DB guarda tablas', en: 'DW only stores files, DB stores tables', pt: 'DW so guarda arquivos, DB guarda tabelas' }, isCorrect: false },
      { id: 'd', text: { es: 'DW es mas barato', en: 'DW is cheaper', pt: 'DW e mais barato' }, isCorrect: false }
    ],
    explanation: {
      es: 'DB transaccionales son OLTP. DW son OLAP (Online Analytical Processing) optimizados para queries complejas.',
      en: 'Transactional DBs are OLTP. DW are OLAP (Online Analytical Processing) optimized for complex queries.',
      pt: 'DBs transacionais sao OLTP. DW sao OLAP (Online Analytical Processing) otimizados para queries complexas.'
    },
    timeLimit: 60,
    points: 10
  },
  // CONCEPTS - MID
  {
    id: 'concepts-m-1',
    area: 'concepts',
    difficulty: 'mid',
    question: {
      es: 'Que es la Medallion Architecture (Bronze/Silver/Gold)?',
      en: 'What is Medallion Architecture (Bronze/Silver/Gold)?',
      pt: 'O que e Medallion Architecture (Bronze/Silver/Gold)?'
    },
    options: [
      { id: 'a', text: { es: 'Bronze = datos crudos, Silver = limpios, Gold = agregados', en: 'Bronze = raw data, Silver = cleaned, Gold = aggregated', pt: 'Bronze = dados brutos, Silver = limpos, Gold = agregados' }, isCorrect: true },
      { id: 'b', text: { es: 'Bronze = desarrollo, Silver = staging, Gold = produccion', en: 'Bronze = development, Silver = staging, Gold = production', pt: 'Bronze = desenvolvimento, Silver = staging, Gold = producao' }, isCorrect: false },
      { id: 'c', text: { es: 'Son tipos de licencias de software', en: 'They are types of software licenses', pt: 'Sao tipos de licencas de software' }, isCorrect: false },
      { id: 'd', text: { es: 'Es un sistema de ranking de calidad', en: 'Its a data quality ranking system', pt: 'E um sistema de ranking de qualidade' }, isCorrect: false }
    ],
    explanation: {
      es: 'Medallion es un patron de Data Lakehouse que permite lineage y reprocessing.',
      en: 'Medallion is a Data Lakehouse pattern that allows lineage and reprocessing.',
      pt: 'Medallion e um padrao de Data Lakehouse que permite lineage e reprocessamento.'
    },
    timeLimit: 60,
    points: 20
  },
  {
    id: 'concepts-m-2',
    area: 'concepts',
    difficulty: 'mid',
    question: {
      es: 'Para que sirve Apache Airflow?',
      en: 'What is Apache Airflow used for?',
      pt: 'Para que serve Apache Airflow?'
    },
    options: [
      { id: 'a', text: { es: 'Orquestacion de pipelines: programar y gestionar dependencias', en: 'Pipeline orchestration: schedule and manage dependencies', pt: 'Orquestracao de pipelines: agendar e gerenciar dependencias' }, isCorrect: true },
      { id: 'b', text: { es: 'Procesar datos en streaming en tiempo real', en: 'Process streaming data in real-time', pt: 'Processar dados em streaming em tempo real' }, isCorrect: false },
      { id: 'c', text: { es: 'Almacenar datos en un data lake', en: 'Store data in a data lake', pt: 'Armazenar dados em um data lake' }, isCorrect: false },
      { id: 'd', text: { es: 'Visualizar datos en dashboards', en: 'Visualize data in dashboards', pt: 'Visualizar dados em dashboards' }, isCorrect: false }
    ],
    explanation: {
      es: 'Airflow es un orquestador: define DAGs donde cada nodo es una tarea. No procesa datos directamente.',
      en: 'Airflow is an orchestrator: it defines DAGs where each node is a task. It does not process data directly.',
      pt: 'Airflow e um orquestrador: define DAGs onde cada no e uma tarefa. Nao processa dados diretamente.'
    },
    timeLimit: 45,
    points: 20
  },
  // CONCEPTS - SENIOR
  {
    id: 'concepts-s-1',
    area: 'concepts',
    difficulty: 'senior',
    question: {
      es: 'Cuando usarias un Data Lake vs un Data Warehouse?',
      en: 'When would you use a Data Lake vs a Data Warehouse?',
      pt: 'Quando voce usaria um Data Lake vs um Data Warehouse?'
    },
    options: [
      { id: 'a', text: { es: 'Lake para datos crudos y ML. Warehouse para datos estructurados y BI.', en: 'Lake for raw data and ML. Warehouse for structured data and BI.', pt: 'Lake para dados brutos e ML. Warehouse para dados estruturados e BI.' }, isCorrect: true },
      { id: 'b', text: { es: 'Lake siempre es mejor porque es mas barato', en: 'Lake is always better because its cheaper', pt: 'Lake sempre e melhor porque e mais barato' }, isCorrect: false },
      { id: 'c', text: { es: 'Warehouse siempre es mejor porque es mas rapido', en: 'Warehouse is always better because its faster', pt: 'Warehouse sempre e melhor porque e mais rapido' }, isCorrect: false },
      { id: 'd', text: { es: 'Son lo mismo, solo cambia el vendor', en: 'They are the same, just the vendor changes', pt: 'Sao o mesmo, so muda o vendor' }, isCorrect: false }
    ],
    explanation: {
      es: 'Data Lakehouse combina: storage barato del Lake + queries rapidas del Warehouse.',
      en: 'Data Lakehouse combines: cheap storage from Lake + fast queries from Warehouse.',
      pt: 'Data Lakehouse combina: storage barato do Lake + queries rapidas do Warehouse.'
    },
    timeLimit: 90,
    points: 30
  },
  // SYSTEM DESIGN - JUNIOR
  {
    id: 'sd-j-1',
    area: 'system-design',
    difficulty: 'junior',
    question: {
      es: 'Que es batch processing vs streaming processing?',
      en: 'What is batch processing vs streaming processing?',
      pt: 'O que e batch processing vs streaming processing?'
    },
    options: [
      { id: 'a', text: { es: 'Batch: grupos grandes periodicamente. Streaming: tiempo real.', en: 'Batch: large groups periodically. Streaming: real-time.', pt: 'Batch: grupos grandes periodicamente. Streaming: tempo real.' }, isCorrect: true },
      { id: 'b', text: { es: 'Son lo mismo', en: 'They are the same', pt: 'Sao o mesmo' }, isCorrect: false },
      { id: 'c', text: { es: 'Batch es mas moderno que streaming', en: 'Batch is more modern than streaming', pt: 'Batch e mais moderno que streaming' }, isCorrect: false },
      { id: 'd', text: { es: 'Streaming solo funciona con video', en: 'Streaming only works with video', pt: 'Streaming so funciona com video' }, isCorrect: false }
    ],
    explanation: {
      es: 'Batch: Spark, Airflow. Streaming: Kafka, Flink. Elegir segun latencia requerida.',
      en: 'Batch: Spark, Airflow. Streaming: Kafka, Flink. Choose based on required latency.',
      pt: 'Batch: Spark, Airflow. Streaming: Kafka, Flink. Escolher baseado na latencia requerida.'
    },
    timeLimit: 60,
    points: 10
  },
  // SYSTEM DESIGN - MID
  {
    id: 'sd-m-1',
    area: 'system-design',
    difficulty: 'mid',
    question: {
      es: 'Si tenes un pipeline que falla frecuentemente, que agregarias primero?',
      en: 'If you have a pipeline that fails frequently, what would you add first?',
      pt: 'Se voce tem um pipeline que falha frequentemente, o que voce adicionaria primeiro?'
    },
    options: [
      { id: 'a', text: { es: 'Idempotencia, retries con backoff, alertas, logging', en: 'Idempotency, retries with backoff, alerts, logging', pt: 'Idempotencia, retries com backoff, alertas, logging' }, isCorrect: true },
      { id: 'b', text: { es: 'Mas servidores para manejar la carga', en: 'More servers to handle the load', pt: 'Mais servidores para lidar com a carga' }, isCorrect: false },
      { id: 'c', text: { es: 'Reescribir en otro lenguaje', en: 'Rewrite in another language', pt: 'Reescrever em outra linguagem' }, isCorrect: false },
      { id: 'd', text: { es: 'Reducir la frecuencia de ejecucion', en: 'Reduce execution frequency', pt: 'Reduzir a frequencia de execucao' }, isCorrect: false }
    ],
    explanation: {
      es: 'Idempotencia = reintentar da el mismo resultado. Retries con backoff = esperar mas entre intentos. Alertas + Logs = saber cuando y por que falla.',
      en: 'Idempotency = retrying gives the same result. Retries with backoff = wait longer between attempts. Alerts + Logs = know when and why it fails.',
      pt: 'Idempotencia = tentar de novo da o mesmo resultado. Retries com backoff = esperar mais entre tentativas. Alertas + Logs = saber quando e por que falha.'
    },
    timeLimit: 60,
    points: 20
  },
  // SYSTEM DESIGN - SENIOR
  {
    id: 'sd-s-1',
    area: 'system-design',
    difficulty: 'senior',
    question: {
      es: 'Como implementarias exactly-once semantics en un pipeline de Kafka?',
      en: 'How would you implement exactly-once semantics in a Kafka pipeline?',
      pt: 'Como voce implementaria exactly-once semantics em um pipeline de Kafka?'
    },
    options: [
      { id: 'a', text: { es: 'Transacciones de Kafka + consumidor idempotente', en: 'Kafka transactions + idempotent consumer', pt: 'Transacoes de Kafka + consumidor idempotente' }, isCorrect: true },
      { id: 'b', text: { es: 'Usar auto-commit de offsets', en: 'Use auto-commit of offsets', pt: 'Usar auto-commit de offsets' }, isCorrect: false },
      { id: 'c', text: { es: 'Kafka garantiza exactly-once por defecto', en: 'Kafka guarantees exactly-once by default', pt: 'Kafka garante exactly-once por padrao' }, isCorrect: false },
      { id: 'd', text: { es: 'No es posible', en: 'Its not possible', pt: 'Nao e possivel' }, isCorrect: false }
    ],
    explanation: {
      es: 'Exactly-once requiere: productor idempotente, transacciones atomicas, y consumidor que solo lea mensajes committed.',
      en: 'Exactly-once requires: idempotent producer, atomic transactions, and consumer that only reads committed messages.',
      pt: 'Exactly-once requer: produtor idempotente, transacoes atomicas, e consumidor que so leia mensagens committed.'
    },
    timeLimit: 120,
    points: 30
  }
];

// Calculate assessment result
export function calculateAssessmentResult(
  answers: { questionId: string; selectedOptionId: string; timeSpent: number }[]
): AssessmentResult {
  let totalScore = 0;
  let maxScore = 0;
  
  const areaScores: Record<SkillArea, { score: number; maxScore: number }> = {
    'sql': { score: 0, maxScore: 0 },
    'python': { score: 0, maxScore: 0 },
    'concepts': { score: 0, maxScore: 0 },
    'system-design': { score: 0, maxScore: 0 }
  };

  for (const answer of answers) {
    const question = ASSESSMENT_QUESTIONS.find(q => q.id === answer.questionId);
    if (!question) continue;

    maxScore += question.points;
    areaScores[question.area].maxScore += question.points;

    const isCorrect = question.options.find(o => o.id === answer.selectedOptionId)?.isCorrect;
    if (isCorrect) {
      totalScore += question.points;
      areaScores[question.area].score += question.points;
    }
  }

  const percentage = maxScore > 0 ? Math.round((totalScore / maxScore) * 100) : 0;

  let level: 'junior' | 'mid' | 'senior' | 'expert';
  if (percentage >= 90) level = 'expert';
  else if (percentage >= 70) level = 'senior';
  else if (percentage >= 50) level = 'mid';
  else level = 'junior';

  const byArea = SKILL_AREAS.map(area => {
    const areaData = areaScores[area.id];
    const areaPercentage = areaData.maxScore > 0 
      ? Math.round((areaData.score / areaData.maxScore) * 100) 
      : 0;

    let recommendation: { es: string; en: string; pt: string };
    if (areaPercentage >= 80) {
      recommendation = { es: 'Excelente! Listo para entrevistas.', en: 'Excellent! Ready for interviews.', pt: 'Excelente! Pronto para entrevistas.' };
    } else if (areaPercentage >= 60) {
      recommendation = { es: 'Bien, pero repasa los conceptos que fallaste.', en: 'Good, but review the concepts you missed.', pt: 'Bom, mas revise os conceitos que voce errou.' };
    } else {
      recommendation = { es: 'Necesitas mas practica en esta area.', en: 'You need more practice in this area.', pt: 'Voce precisa de mais pratica nessa area.' };
    }

    return { area: area.id, score: areaData.score, maxScore: areaData.maxScore, percentage: areaPercentage, recommendation };
  });

  const sortedAreas = [...byArea].sort((a, b) => b.percentage - a.percentage);
  const strengths = sortedAreas.filter(a => a.percentage >= 70).map(a => a.area);
  const weaknesses = sortedAreas.filter(a => a.percentage < 50).map(a => a.area);

  const readyToApply = percentage >= 60 && weaknesses.length === 0;

  const nextSteps: { es: string[]; en: string[]; pt: string[] } = { es: [], en: [], pt: [] };

  if (weaknesses.includes('sql')) {
    nextSteps.es.push('Practica mas SQL en la seccion de Practica');
    nextSteps.en.push('Practice more SQL in the Practice section');
    nextSteps.pt.push('Pratique mais SQL na secao de Pratica');
  }
  if (weaknesses.includes('python')) {
    nextSteps.es.push('Completa los ejercicios de Python/Pandas');
    nextSteps.en.push('Complete the Python/Pandas exercises');
    nextSteps.pt.push('Complete os exercicios de Python/Pandas');
  }
  if (weaknesses.includes('concepts')) {
    nextSteps.es.push('Revisa el Roadmap Level 1 para conceptos fundamentales');
    nextSteps.en.push('Review Roadmap Level 1 for fundamental concepts');
    nextSteps.pt.push('Revise o Roadmap Level 1 para conceitos fundamentais');
  }
  if (weaknesses.includes('system-design')) {
    nextSteps.es.push('Practica las System Design Interviews');
    nextSteps.en.push('Practice the System Design Interviews');
    nextSteps.pt.push('Pratique as System Design Interviews');
  }

  if (readyToApply) {
    nextSteps.es.push('Estas listo para aplicar! Practica Behavioral Interviews');
    nextSteps.en.push('Youre ready to apply! Practice Behavioral Interviews');
    nextSteps.pt.push('Voce esta pronto para aplicar! Pratique Behavioral Interviews');
  }

  return { totalScore, maxScore, percentage, level, byArea, strengths, weaknesses, readyToApply, nextSteps };
}

export function generateAssessment(questionCount: number = 15): AssessmentQuestion[] {
  const questions: AssessmentQuestion[] = [];
  const targetPerArea = Math.ceil(questionCount / SKILL_AREAS.length);
  
  for (const area of SKILL_AREAS) {
    const areaQuestions = ASSESSMENT_QUESTIONS.filter(q => q.area === area.id);
    const shuffled = [...areaQuestions].sort(() => Math.random() - 0.5);
    questions.push(...shuffled.slice(0, targetPerArea));
  }

  return questions.sort(() => Math.random() - 0.5).slice(0, questionCount);
}

export const ASSESSMENT_STATS = {
  totalQuestions: ASSESSMENT_QUESTIONS.length,
  byArea: SKILL_AREAS.map(area => ({
    ...area,
    count: ASSESSMENT_QUESTIONS.filter(q => q.area === area.id).length
  })),
  estimatedTime: 25,
  questionsPerAssessment: 15
};







