import { Project } from '../../../types/members';

export const p1_etl_python: Project = {
  id: 'p1-etl-python',
  level: 1,
  title: { es: 'ETL Simple con Python', en: 'Simple ETL with Python', pt: 'ETL Simples com Python' },
  description: {
    es: 'Tu primer pipeline de datos real: extraer de CSV, transformar con Pandas, y cargar resultados. Este es el patrón que vas a usar en el 80% de tu trabajo como Data Engineer.',
    en: 'Your first real data pipeline: extract from CSV, transform with Pandas, and load results. This is the pattern you will use in 80% of your work as a Data Engineer.',
    pt: 'Seu primeiro pipeline de dados real: extrair de CSV, transformar com Pandas e carregar resultados. Este é o padrão que você usará em 80% do seu trabalho como Data Engineer.'
  },
  difficulty: 'Principiante',
  duration: '2-3 horas',
  skills: [
    { es: 'Python' }, { es: 'Pandas' }, { es: 'CSV' }, { es: 'JSON' }, { es: 'Parquet' }, 
    { es: 'Data Cleaning', en: 'Data Cleaning', pt: 'Limpeza de Dados' }
  ],
  icon: '🐍',
  color: 'emerald',
  datasetId: 'ecommerce',
  estimatedLines: 80,
  realWorldExample: {
    es: 'Así es como Spotify procesa datos de reproducciones para generar reportes diarios',
    en: 'This is how Spotify processes playback data to generate daily reports',
    pt: 'É assim que o Spotify processa dados de reproduções para gerar relatórios diários'
  },
  usedBy: ['Spotify', 'Netflix', 'MercadoLibre', 'Rappi'],
  learningObjectives: [
    { es: 'Entender el patrón ETL (Extract, Transform, Load)', en: 'Understand the ETL pattern (Extract, Transform, Load)', pt: 'Entender o padrão ETL (Extract, Transform, Load)' },
    { es: 'Manipular DataFrames con Pandas', en: 'Manipulate DataFrames with Pandas', pt: 'Manipular DataFrames com Pandas' },
    { es: 'Limpiar datos: nulos, duplicados, tipos', en: 'Clean data: nulls, duplicates, types', pt: 'Limpar dados: nulos, duplicados, tipos' },
    { es: 'Guardar en formatos optimizados (Parquet)', en: 'Save in optimized formats (Parquet)', pt: 'Salvar em formatos otimizados (Parquet)' },
    { es: 'Documentar código profesionalmente', en: 'Document code professionally', pt: 'Documentar código profissionalmente' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'No revisar los datos antes de transformar', en: 'Not checking data before transforming', pt: 'Não verificar os dados antes de transformar' },
      why: { es: 'Podés aplicar transformaciones incorrectas si no conocés la estructura', en: 'You can apply incorrect transformations if you don\'t know the structure', pt: 'Você pode aplicar transformações incorretas se não conhecer a estrutura' },
      solution: { es: 'Siempre usá df.head(), df.info(), df.describe() antes de cualquier transformación', en: 'Always use df.head(), df.info(), df.describe() before any transformation', pt: 'Sempre use df.head(), df.info(), df.describe() antes de qualquer transformação' },
      code: `# SIEMPRE empezá con esto:
df.head()      # Ver primeras filas
df.info()      # Ver tipos y nulos
df.describe()  # Estadísticas básicas`
    },
    {
      mistake: { es: 'Olvidar manejar valores nulos', en: 'Forgetting to handle null values', pt: 'Esquecer de lidar com valores nulos' },
      why: { es: 'Los nulos pueden causar errores en cálculos o resultados incorrectos', en: 'Nulls can cause calculation errors or incorrect results', pt: 'Nulos podem causar erros em cálculos ou resultados incorretos' },
      solution: { es: 'Decidí qué hacer con cada columna: eliminar, rellenar con promedio, o dejar', en: 'Decide what to do with each column: drop, fill with mean, or leave', pt: 'Decida o que fazer com cada coluna: remover, preencher com média ou deixar' },
      code: `# Opción 1: Eliminar filas con nulos
df = df.dropna()

# Opción 2: Rellenar con valor
df['columna'] = df['columna'].fillna(0)

# Opción 3: Rellenar con promedio
df['precio'] = df['precio'].fillna(df['precio'].mean())`
    },
    {
      mistake: { es: 'No documentar las decisiones de limpieza', en: 'Not documenting cleaning decisions', pt: 'Não documentar as decisões de limpeza' },
      why: { es: 'En 3 meses no vas a recordar por qué eliminaste esas filas', en: 'In 3 months you won\'t remember why you dropped those rows', pt: 'Em 3 meses você não vai lembrar por que removeu essas linhas' },
      solution: { es: 'Agregá comentarios explicando el "por qué" de cada decisión', en: 'Add comments explaining the "why" of each decision', pt: 'Adicione comentários explicando o "porquê" de cada decisão' },
      code: `# Eliminamos filas sin customer_id porque son órdenes de prueba
# del equipo de QA (confirmado con el equipo de producto)
df = df.dropna(subset=['customer_id'])`
    },
    {
      mistake: { es: 'Usar CSV en vez de Parquet para datos grandes', en: 'Using CSV instead of Parquet for large data', pt: 'Usar CSV em vez de Parquet para dados grandes' },
      why: { es: 'CSV es 10x más lento y ocupa 5x más espacio', en: 'CSV is 10x slower and takes 5x more space', pt: 'CSV é 10x mais lento e ocupa 5x mais espaço' },
      solution: { es: 'Usá Parquet para cualquier archivo > 100MB', en: 'Use Parquet for any file > 100MB', pt: 'Use Parquet para qualquer arquivo > 100MB' },
      code: `# ❌ Malo para datos grandes
df.to_csv('datos.csv')

# ✅ Mucho mejor
df.to_parquet('datos.parquet')`
    },
  ],
  expectedOutputs: [
    {
      step: 3,
      description: { es: 'Output esperado al explorar los datos', en: 'Expected output when exploring data', pt: 'Output esperado ao explorar os dados' },
      example: `📂 Archivos encontrados en data/:
- ecommerce_orders.csv
- ecommerce_order_items.csv
- ecommerce_customers.csv
- ecommerce_products.csv
- ecommerce_categories.csv
... (14 archivos en total)

📈 Resumen:
Orders: 1000 filas, 8 columnas
Order Items: 2500 filas
Customers: 500 filas
Products: 200 filas`
    },
    {
      step: 7,
      description: { es: 'Output esperado de métricas de negocio', en: 'Expected output of business metrics', pt: 'Output esperado de métricas de negócio' },
      example: `🏆 Top 5 clientes:
         total_gastado  cantidad_ordenes
customer_id                                
42              15420.50                12
156             12350.00                 8
89              11200.75                15
...

📦 Producto más vendido: ID 23 (450 unidades)

📈 Ventas por mes:
    mes  total_ventas
2024-01      125000.00
2024-02      142000.00
2024-03      138500.00`
    },
    {
      step: 9,
      description: { es: 'Comparación de tamaños CSV vs Parquet', en: 'CSV vs Parquet size comparison', pt: 'Comparação de tamanhos CSV vs Parquet' },
      example: `Tamaño CSV: 2450.3 KB
Tamaño Parquet: 312.1 KB
Parquet es 7.9x más chico`
    }
  ],
  interviewStory: {
    hook: { es: "En mi último proyecto construí un pipeline ETL que procesaba datos de e-commerce y logré reducir el tiempo de generación de reportes de 2 horas manuales a 3 minutos automáticos.", en: "In my last project I built an ETL pipeline processing e-commerce data and managed to reduce reporting time from 2 manual hours to 3 automatic minutes.", pt: "No meu último projeto construí um pipeline ETL processando dados de e-commerce e consegui reduzir o tempo de geração de relatórios de 2 horas manuais para 3 minutos automáticos." },
    situation: { es: "Trabajé con un dataset de e-commerce que simulaba el sistema de una empresa real, con más de 10 tablas relacionadas: órdenes, productos, clientes, inventario. El problema era que el equipo de negocio tardaba horas en generar reportes manualmente en Excel.", en: "I worked with an e-commerce dataset simulating a real company system, with over 10 related tables: orders, products, customers, inventory. The problem was business team took hours to generate reports manually in Excel.", pt: "Trabalhei com um dataset de e-commerce simulando o sistema de uma empresa real, com mais de 10 tabelas relacionadas: pedidos, produtos, clientes, inventário. O problema era que a equipe de negócio demorava horas para gerar relatórios manualmente no Excel." },
    task: { es: "Mi objetivo era construir un pipeline automatizado que extrajera los datos, los limpiara, calculara métricas de negocio, y los dejara listos para análisis.", en: "My goal was to build an automated pipeline to extract data, clean it, calculate business metrics, and leave it ready for analysis.", pt: "Meu objetivo era construir um pipeline automatizado que extraísse os dados, limpasse, calculasse métricas de negócio e os deixasse prontos para análise." },
    actions: [
      { es: "Diseñé la arquitectura del pipeline siguiendo el patrón ETL clásico", en: "Designed pipeline architecture following classic ETL pattern", pt: "Desenhei a arquitetura do pipeline seguindo o padrão ETL clássico" },
      { es: "Usé Pandas para cargar y explorar los datos, identificando problemas de calidad", en: "Used Pandas to load and explore data, identifying quality issues", pt: "Usei Pandas para carregar e explorar os dados, identificando problemas de qualidade" },
      { es: "Implementé limpieza de datos: manejé 15% de valores nulos en precios usando el promedio por categoría", en: "Implemented data cleaning: handled 15% null values in prices using category mean", pt: "Implementei limpeza de dados: tratei 15% de valores nulos em preços usando a média por categoria" },
      { es: "Eliminé duplicados que representaban el 3% del dataset", en: "Removed duplicates representing 3% of the dataset", pt: "Removi duplicatas que representavam 3% do dataset" },
      { es: "Calculé métricas clave: top clientes, productos más vendidos, tendencias mensuales", en: "Calculated key metrics: top customers, best-selling products, monthly trends", pt: "Calculei métricas chave: top clientes, produtos mais vendidos, tendências mensais" },
      { es: "Optimicé el storage usando Parquet, reduciendo el tamaño 8x vs CSV", en: "Optimized storage using Parquet, reducing size 8x vs CSV", pt: "Otimizei o storage usando Parquet, reduzindo o tamanho 8x vs CSV" }
    ],
    results: [
      { es: "Pipeline 100% automatizado que corre en 3 minutos", en: "100% automated pipeline running in 3 minutes", pt: "Pipeline 100% automatizado que roda em 3 minutos" },
      { es: "Reducción de 8x en tamaño de archivos (de 2.4MB a 300KB)", en: "8x reduction in file size (from 2.4MB to 300KB)", pt: "Redução de 8x no tamanho de arquivos (de 2.4MB para 300KB)" },
      { es: "Identificamos que el 20% de los clientes generaban el 65% de las ventas", en: "Identified that 20% of customers generated 65% of sales", pt: "Identificamos que 20% dos clientes geravam 65% das vendas" },
      { es: "El equipo de negocio ahora tiene datos frescos cada mañana", en: "Business team now has fresh data every morning", pt: "A equipe de negócio agora tem dados frescos toda manhã" }
    ],
    learnings: [
      { es: "Aprendí que explorar los datos ANTES de transformar es crítico - casi aplico transformaciones incorrectas por no revisar los tipos de datos", en: "Learned that exploring data BEFORE transforming is critical - almost applied incorrect transformations by not checking data types", pt: "Aprendi que explorar os dados ANTES de transformar é crítico - quase apliquei transformações incorretas por não verificar os tipos de dados" },
      { es: "Documentar las decisiones de limpieza es esencial - en un mes no recordaría por qué eliminé ciertas filas", en: "Documenting cleaning decisions is essential - in a month I wouldn't remember why I dropped certain rows", pt: "Documentar as decisões de limpeza é essencial - em um mês não lembraria por que removi certas linhas" },
      { es: "Parquet no es solo más chico, también es más rápido de leer - esto importa cuando escalás", en: "Parquet is not just smaller, it's also faster to read - this matters when scaling", pt: "Parquet não é só menor, também é mais rápido de ler - isso importa quando escala" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo manejaste los valores nulos?", en: "How did you handle null values?", pt: "Como você tratou os valores nulos?" },
        answer: { es: "Dependía de la columna. Para precios usé el promedio por categoría porque tenía sentido de negocio. Para customer_id eliminé las filas porque eran órdenes de prueba. Siempre documenté el 'por qué' de cada decisión.", en: "It depended on the column. For prices I used category mean because it made business sense. For customer_id I dropped rows because they were test orders. Always documented the 'why' of each decision.", pt: "Dependia da coluna. Para preços usei a média por categoria porque fazia sentido de negócio. Para customer_id removi as linhas porque eram pedidos de teste. Sempre documentei o 'porquê' de cada decisão." }
      },
      {
        question: { es: "¿Por qué elegiste Parquet sobre CSV?", en: "Why did you choose Parquet over CSV?", pt: "Por que escolheu Parquet em vez de CSV?" },
        answer: { es: "Tres razones: es 8x más chico por la compresión columnar, es más rápido de leer porque solo carga las columnas que necesitás, y preserva los tipos de datos - con CSV perdés esa información.", en: "Three reasons: it's 8x smaller due to columnar compression, faster to read because it only loads columns you need, and preserves data types - with CSV you lose that info.", pt: "Três razões: é 8x menor pela compressão colunar, é mais rápido de ler porque só carrega as colunas que você precisa, e preserva os tipos de dados - com CSV você perde essa informação." }
      },
      {
        question: { es: "¿Cómo lo escalarías para más datos?", en: "How would you scale it for more data?", pt: "Como escalaria para mais dados?" },
        answer: { es: "Para datasets más grandes usaría chunks en Pandas o migraría a PySpark. También agregaría procesamiento incremental en vez de full refresh.", en: "For larger datasets I would use chunks in Pandas or migrate to PySpark. Also would add incremental processing instead of full refresh.", pt: "Para datasets maiores usaria chunks no Pandas ou migraria para PySpark. Também adicionaria processamento incremental em vez de full refresh." }
      }
    ],
    closingStatement: { es: "Este proyecto me enseñó que un buen Data Engineer no solo mueve datos, sino que entiende el problema de negocio y entrega valor medible.", en: "This project taught me that a good Data Engineer not only moves data, but understands the business problem and delivers measurable value.", pt: "Este projeto me ensinou que um bom Data Engineer não só move dados, mas entende o problema de negócio e entrega valor mensurável." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📥 EXTRACT: Descargá el dataset de E-commerce desde la pestaña Datasets', en: '📥 EXTRACT: Download E-commerce dataset from Datasets tab', pt: '📥 EXTRACT: Baixe o dataset de E-commerce da aba Datasets' },
      explanation: { es: 'El dataset contiene 11 tablas relacionadas: categories, brands, suppliers, warehouses, products, inventory, customers, promotions, orders, order_items y reviews. Esto simula una base de datos real de e-commerce.', en: 'Dataset contains 11 related tables: categories, brands, suppliers, warehouses, products, inventory, customers, promotions, orders, order_items and reviews. This simulates a real e-commerce database.', pt: 'O dataset contém 11 tabelas relacionadas: categories, brands, suppliers, warehouses, products, inventory, customers, promotions, orders, order_items e reviews. Isso simula um banco de dados real de e-commerce.' },
      tip: { es: 'Descargá todos los archivos en formato CSV. Vas a obtener 14 archivos (uno por tabla): ecommerce_orders.csv, ecommerce_customers.csv, etc. Guardá todos en la carpeta data/.', en: 'Download all files in CSV format. You will get 14 files (one per table): ecommerce_orders.csv, ecommerce_customers.csv, etc. Save all in the data/ folder.', pt: 'Baixe todos os arquivos em formato CSV. Você vai obter 14 arquivos (um por tabela): ecommerce_orders.csv, ecommerce_customers.csv, etc. Salve todos na pasta data/.' },
      checkpoint: { es: '¿Tenés el archivo descargado en tu carpeta de proyecto?', en: 'Do you have the file downloaded in your project folder?', pt: 'Você tem o arquivo baixado na sua pasta de projeto?' },
      estimatedTime: '5min',
      difficulty: 'easy'
    },
    { 
      order: 2, 
      text: { es: '📂 Creá la estructura del proyecto', en: '📂 Create project structure', pt: '📂 Crie a estrutura do projeto' },
      code: `# En tu terminal (Mac/Linux: Terminal, Windows: PowerShell o CMD)

# 1. Primero, abrí la terminal y fijate dónde estás:
pwd          # Mac/Linux: muestra tu ubicación actual
cd           # Windows: muestra tu ubicación actual

# 2. Andá a tu carpeta de proyectos (ejemplo):
cd Documents   # o donde quieras guardar el proyecto

# 3. Creá la carpeta del proyecto y entrá:
mkdir mi-primer-etl
cd mi-primer-etl

# 4. Creá los archivos y carpetas:
# En Windows (PowerShell):
New-Item etl.py -ItemType File
mkdir data, output

# En Mac/Linux (Terminal):
touch etl.py
mkdir data output

# 5. Mové los CSVs descargados a la carpeta data/
# Podés arrastrarlos con el mouse o usar:
# Mac/Linux: mv ~/Downloads/ecommerce_*.csv ./data/
# Windows: move %USERPROFILE%\\Downloads\\ecommerce_*.csv .\\data\\`,
      explanation: { es: 'Una estructura clara hace tu proyecto más profesional y fácil de entender. Podés usar cualquier terminal.', en: 'Clear structure makes your project more professional and easier to understand. You can use any terminal.', pt: 'Uma estrutura clara torna seu projeto mais profissional e fácil de entender. Você pode usar qualquer terminal.' },
      tip: { es: '💡 ¿Perdido con la terminal? Recordá: pwd = dónde estoy, ls = qué hay aquí, cd = moverme. Si no hiciste el Nivel 0, revisá la fase "Tu Computadora y la Terminal" para entender rutas y comandos básicos.', en: '💡 Lost with the terminal? Remember: pwd = where am I, ls = what is here, cd = move. If you didn\'t do Level 0, check the "Your Computer and Terminal" phase to understand paths and basic commands.', pt: '💡 Perdido com o terminal? Lembre-se: pwd = onde estou, ls = o que tem aqui, cd = mover. Se não fez o Nível 0, confira a fase "Seu Computador e o Terminal" para entender caminhos e comandos básicos.' },
      estimatedTime: '5min',
      difficulty: 'easy',
      expectedOutput: `mi-primer-etl/
├── etl.py
├── data/
│   ├── ecommerce_orders.csv
│   ├── ecommerce_customers.csv
│   ├── ecommerce_products.csv
│   └── ... (14 archivos CSV)
└── output/`
    },
    { 
      order: 3, 
      text: { es: '📖 Cargá y explorá los datos', en: '📖 Load and explore data', pt: '📖 Carregue e explore os dados' },
      code: `import pandas as pd
import glob
import os

# Verificar que existen los archivos CSV descargados
archivos = glob.glob('data/ecommerce_*.csv')
if not archivos:
    print("❌ No se encontraron los archivos. Asegurate de descargarlos en la carpeta data/")
    print("   Deberías tener: ecommerce_orders.csv, ecommerce_customers.csv, etc.")
else:
    print(f"📂 Archivos encontrados: {len(archivos)}")
    for f in sorted(archivos):
        print(f"  - {os.path.basename(f)}")

# Cargar los CSVs principales
df_orders = pd.read_csv('data/ecommerce_orders.csv')
df_order_items = pd.read_csv('data/ecommerce_order_items.csv')
df_customers = pd.read_csv('data/ecommerce_customers.csv')
df_products = pd.read_csv('data/ecommerce_products.csv')

# Explorar
print(f"\\n📈 Resumen:")
print(f"Orders: {len(df_orders)} filas, {len(df_orders.columns)} columnas")
print(f"Order Items: {len(df_order_items)} filas")
print(f"Customers: {len(df_customers)} filas")
print(f"Products: {len(df_products)} filas")

print("\\n🔍 Primeras filas de orders:")
print(df_orders.head())
print("\\n📋 Info de orders:")
print(df_orders.info())`,
      explanation: { es: 'Siempre explorá los datos antes de transformar. df.info() te muestra tipos y nulos. Los archivos CSV tienen el formato ecommerce_TABLA.csv (ej: ecommerce_orders.csv).', en: 'Always explore data before transforming. df.info() shows types and nulls. CSV files follow the format ecommerce_TABLE.csv (ex: ecommerce_orders.csv).', pt: 'Sempre explore os dados antes de transformar. df.info() mostra tipos e nulos. Os arquivos CSV têm o formato ecommerce_TABELA.csv (ex: ecommerce_orders.csv).' },
      tip: { es: '💡 ¿Error "archivo no encontrado"? Asegurate de ejecutar el código DESDE la carpeta mi-primer-etl (usá cd mi-primer-etl). La ruta "data/archivo.json" es RELATIVA - significa "desde donde estoy, entrá a data/". Si no entendés rutas, revisá la fase Terminal en el Nivel 0.', en: '💡 "File not found" error? Make sure to run the code FROM the mi-primer-etl folder (use cd mi-primer-etl). The path "data/file.json" is RELATIVE - it means "from where I am, enter data/". If you don\'t understand paths, check the Terminal phase in Level 0.', pt: '💡 Erro "arquivo não encontrado"? Certifique-se de executar o código A PARTIR da pasta mi-primer-etl (use cd mi-primer-etl). O caminho "data/arquivo.json" é RELATIVO - significa "de onde estou, entre em data/". Se não entende caminhos, confira a fase Terminal no Nível 0.' },
      checkpoint: { es: '¿Podés ver cuántas filas tiene cada tabla? ¿Hay columnas con valores nulos?', en: 'Can you see how many rows each table has? Are there columns with null values?', pt: 'Consegue ver quantas linhas tem cada tabela? Existem colunas com valores nulos?' },
      estimatedTime: '15min',
      difficulty: 'easy'
    },
    { 
      order: 4, 
      text: { es: '🔍 TRANSFORM - Identificá y manejá nulos', en: '🔍 TRANSFORM - Identify and handle nulls', pt: '🔍 TRANSFORM - Identifique e trate nulos' },
      estimatedTime: '20min',
      difficulty: 'medium',
      challenge: { es: 'Antes de ver el código, intentá: ¿Cómo verías cuántos nulos hay por columna? ¿Qué harías con ellos?', en: 'Before seeing code, try: How would you see how many nulls per column? What would you do with them?', pt: 'Antes de ver o código, tente: Como veria quantos nulos há por coluna? O que faria com eles?' },
      explanation: { es: 'No hay una regla universal para manejar nulos. Depende del contexto. Lo importante es DOCUMENTAR tu decisión.', en: 'No universal rule for handling nulls. Context matters. Important thing is to DOCUMENT your decision.', pt: 'Não há regra universal para lidar com nulos. Depende do contexto. O importante é DOCUMENTAR sua decisão.' },
      warning: { es: 'Nunca elimines nulos sin entender por qué están ahí. A veces un nulo tiene significado (ej: cliente sin teléfono).', en: 'Never drop nulls without understanding why they are there. Sometimes null has meaning (ex: customer without phone).', pt: 'Nunca remova nulos sem entender por que estão lá. Às vezes um nulo tem significado (ex: cliente sem telefone).' },
      hints: [
        {
          level: 1,
          title: { es: '💡 Pista 1', en: '💡 Hint 1', pt: '💡 Dica 1' },
          content: { es: 'Para ver nulos usá .isnull().sum() sobre el DataFrame. Te da un conteo por columna.', en: 'To see nulls use .isnull().sum() on DataFrame. Gives you a count per column.', pt: 'Para ver nulos use .isnull().sum() no DataFrame. Te dá uma contagem por coluna.' }
        },
        {
          level: 2,
          title: { es: '💡 Pista 2', en: '💡 Hint 2', pt: '💡 Dica 2' },
          content: { es: 'Para eliminar filas con nulos usá .dropna(). Podés especificar columnas con subset=[...].\nPara rellenar nulos usá .fillna(valor).', en: 'To drop rows with nulls use .dropna(). You can specify columns with subset=[...].\nTo fill nulls use .fillna(value).', pt: 'Para remover linhas com nulos use .dropna(). Pode especificar colunas com subset=[...].\nPara preencher nulos use .fillna(valor).' },
          code: `# Eliminar donde hay nulos en columnas críticas
df_clean = df.dropna(subset=['columna_importante'])

# Rellenar nulos con 0
df['columna'] = df['columna'].fillna(0)`
        },
        {
          level: 3,
          title: { es: '✅ Solución Completa', en: '✅ Full Solution', pt: '✅ Solução Completa' },
          content: { es: 'Acá está el código completo para manejar nulos:', en: 'Here is the full code to handle nulls:', pt: 'Aqui está o código completo para lidar com nulos:' },
          code: `# Ver nulos por columna
print("Nulos por columna:")
print(df_orders.isnull().sum())

# Decisión: ¿eliminar o rellenar?
# Si son pocos (<5%), podemos eliminar
# Si son muchos, mejor rellenar con un valor por defecto

# Ejemplo: eliminar filas con nulos en campos críticos
df_orders_clean = df_orders.dropna(subset=['customer_id', 'product_id', 'total'])

# Ejemplo: rellenar con 0 en campos numéricos opcionales
df_orders_clean['discount'] = df_orders_clean['discount'].fillna(0)

print(f"Filas antes: {len(df_orders)}, después: {len(df_orders_clean)}")`
        }
      ]
    },
    { 
      order: 5, 
      text: { es: '🔍 TRANSFORM - Eliminá duplicados', en: '🔍 TRANSFORM - Remove duplicates', pt: '🔍 TRANSFORM - Remova duplicatas' },
      challenge: { es: 'Intentá: ¿Cómo detectarías duplicados? ¿Qué pasa si un order_id aparece dos veces?', en: 'Try: How would you detect duplicates? What if an order_id appears twice?', pt: 'Tente: Como detectaria duplicatas? O que acontece se um order_id aparece duas vezes?' },
      explanation: { es: 'Los duplicados pueden venir de errores en la fuente o de cargas repetidas. Siempre verificá.', en: 'Duplicates can come from source errors or repeated loads. Always verify.', pt: 'As duplicatas podem vir de erros na fonte ou de cargas repetidas. Sempre verifique.' },
      tip: { es: 'Usá duplicated(subset=[...]) para buscar duplicados en columnas específicas, no en toda la fila.', en: 'Use duplicated(subset=[...]) to check duplicates in specific columns, not entire row.', pt: 'Use duplicated(subset=[...]) para buscar duplicatas em colunas específicas, não em toda a linha.' },
      hints: [
        {
          level: 1,
          title: { es: '💡 Pista 1', en: '💡 Hint 1', pt: '💡 Dica 1' },
          content: { es: 'Para ver duplicados usá .duplicated().sum(). Te dice cuántas filas son duplicadas.', en: 'To see duplicates use .duplicated().sum(). Tells you how many rows are duplicated.', pt: 'Para ver duplicatas use .duplicated().sum(). Diz quantas linhas são duplicadas.' }
        },
        {
          level: 2,
          title: { es: '💡 Pista 2', en: '💡 Hint 2', pt: '💡 Dica 2' },
          content: { es: 'Para eliminar duplicados usá .drop_duplicates(). Podés especificar qué columnas considerar con subset=[...].\nEl parámetro keep puede ser "first", "last", o False.', en: 'To drop duplicates use .drop_duplicates(). You can specify columns with subset=[...].\nkeep parameter can be "first", "last", or False.', pt: 'Para remover duplicatas use .drop_duplicates(). Pode especificar quais colunas considerar com subset=[...].\nO parâmetro keep pode ser "first", "last", ou False.' },
          code: `# Eliminar duplicados exactos
df = df.drop_duplicates()

# Eliminar duplicados por columna específica, quedarse con el último
df = df.drop_duplicates(subset=['id'], keep='last')`
        },
        {
          level: 3,
          title: { es: '✅ Solución Completa', en: '✅ Full Solution', pt: '✅ Solução Completa' },
          content: { es: 'Acá está el código completo:', en: 'Here is the full code:', pt: 'Aqui está o código completo:' },
          code: `# Ver duplicados
duplicados = df_orders_clean.duplicated().sum()
print(f"Duplicados encontrados: {duplicados}")

# Ver duplicados por columna específica (ej: order_id debería ser único)
duplicados_id = df_orders_clean.duplicated(subset=['order_id']).sum()
print(f"Order IDs duplicados: {duplicados_id}")

# Eliminar duplicados
df_orders_clean = df_orders_clean.drop_duplicates()

# Si hay IDs duplicados, quedarse con el más reciente
df_orders_clean = df_orders_clean.sort_values('order_date').drop_duplicates(
    subset=['order_id'], 
    keep='last'
)`
        }
      ]
    },
    { 
      order: 6, 
      text: { es: '🔍 TRANSFORM - Corregí tipos de datos', en: '🔍 TRANSFORM - Fix data types', pt: '🔍 TRANSFORM - Corrija tipos de dados' },
      code: `# Ver tipos actuales
print(df_orders_clean.dtypes)

# Convertir fechas
df_orders_clean['order_date'] = pd.to_datetime(df_orders_clean['order_date'])

# Asegurar que los números sean numéricos
df_orders_clean['total'] = pd.to_numeric(df_orders_clean['total'], errors='coerce')
df_orders_clean['quantity'] = pd.to_numeric(df_orders_clean['quantity'], errors='coerce')

# Verificar
print("\\nTipos después de conversión:")
print(df_orders_clean.dtypes)`,
      explanation: { es: 'Pandas a veces infiere tipos incorrectamente. Fechas como strings, números como objetos. Siempre verificá y corregí.', en: 'Pandas sometimes infers types incorrectly. Dates as strings, numbers as objects. Always verify and fix.', pt: 'Pandas às vezes infere tipos incorretamente. Datas como strings, números como objetos. Sempre verifique e corrija.' },
      warning: { es: 'errors="coerce" convierte valores inválidos a NaN. Después tenés que manejar esos NaN.', en: 'errors="coerce" converts invalid values to NaN. Then you have to handle those NaNs.', pt: 'errors="coerce" converte valores inválidos em NaN. Depois tem que tratar esses NaN.' }
    },
    { 
      order: 7, 
      text: { es: '📊 TRANSFORM - Respondé preguntas de negocio', en: '📊 TRANSFORM - Answer business questions', pt: '📊 TRANSFORM - Responda perguntas de negócio' },
      explanation: { es: `En este paso vas a responder preguntas reales que haría un gerente de e-commerce. Usá groupby + agg sobre estas columnas:
      
**Columnas clave para agrupar:**
- \`customer_id\`: Para análisis por cliente
- \`product_id\`: Para análisis por producto  
- \`order_date\` (convertida a mes): Para tendencias temporales
- \`status\`: Para análisis de estados de órdenes

**Columnas para agregar:**
- \`total_amount\`: Sumar para ingresos totales
- \`quantity\`: Sumar para unidades vendidas
- \`order_id\`: Contar para número de órdenes`, en: `In this step you answer real questions an e-commerce manager would ask. Use groupby + agg on these columns:
      
**Key grouping columns:**
- \`customer_id\`: For customer analysis
- \`product_id\`: For product analysis  
- \`order_date\` (converted to month): For temporal trends
- \`status\`: For order status analysis

**Aggregation columns:**
- \`total_amount\`: Sum for total revenue
- \`quantity\`: Sum for units sold
- \`order_id\`: Count for number of orders`, pt: `Neste passo vai responder perguntas reais que um gerente de e-commerce faria. Use groupby + agg sobre estas colunas:
      
**Colunas chave para agrupar:**
- \`customer_id\`: Para análise por cliente
- \`product_id\`: Para análise por produto  
- \`order_date\` (convertida a mês): Para tendências temporais
- \`status\`: Para análise de status de pedidos

**Colunas para agregar:**
- \`total_amount\`: Somar para receitas totais
- \`quantity\`: Somar para unidades vendidas
- \`order_id\`: Contar para número de pedidos` },
      challenge: { es: `Respondé estas 3 preguntas de negocio:
1. ¿Cuáles son los 5 clientes que más gastaron?
2. ¿Cuál es el producto más vendido (por cantidad)?
3. ¿Cómo evolucionaron las ventas mes a mes?`, en: `Answer these 3 business questions:
1. Who are the top 5 spenders?
2. What is the best-selling product (by quantity)?
3. How did sales evolve month by month?`, pt: `Responda estas 3 perguntas de negócio:
1. Quais são os 5 clientes que mais gastaram?
2. Qual é o produto mais vendido (por quantidade)?
3. Como evoluíram as vendas mês a mês?` },
      code: `# PREGUNTA 1: Top 5 clientes por gasto total
# Agrupamos por customer_id y sumamos total_amount
ventas_cliente = df_orders_clean.groupby('customer_id').agg({
  'total_amount': 'sum',
  'order_id': 'count'
}).rename(columns={'total_amount': 'total_gastado', 'order_id': 'cantidad_ordenes'})
ventas_cliente = ventas_cliente.sort_values('total_gastado', ascending=False)
print("🏆 Top 5 clientes:")
print(ventas_cliente.head())

# PREGUNTA 2: Producto más vendido
# Primero unimos orders con order_items para tener quantity
# Agrupamos por product_id y sumamos quantity
productos_vendidos = df_order_items.groupby('product_id')['quantity'].sum().sort_values(ascending=False)
print(f"\\n📦 Producto más vendido: ID {productos_vendidos.idxmax()} ({productos_vendidos.max()} unidades)")

# PREGUNTA 3: Evolución mensual de ventas
# Agrupamos por mes y sumamos total_amount
df_orders_clean['mes'] = df_orders_clean['order_date'].dt.to_period('M')
ventas_mes = df_orders_clean.groupby('mes')['total_amount'].sum().reset_index()
ventas_mes.columns = ['mes', 'total_ventas']
print("\\n📈 Ventas por mes:")
print(ventas_mes)`,
      tip: { es: 'Siempre renombrá las columnas después de agregar para que sean descriptivas. Usá sort_values() para ordenar resultados.', en: 'Always rename columns after aggregating so they are descriptive. Use sort_values() to order results.', pt: 'Sempre renomeie as colunas depois de agregar para que sejam descritivas. Use sort_values() para ordenar resultados.' }
    },
    { 
      order: 8, 
      text: { es: '💾 LOAD - Guardá en CSV', en: '💾 LOAD - Save to CSV', pt: '💾 LOAD - Salve em CSV' },
      code: `# Crear carpeta output si no existe
import os
os.makedirs('output', exist_ok=True)

# Guardar métricas en CSV
ventas_cliente.to_csv('output/ventas_por_cliente.csv', index=False)
ventas_mes.to_csv('output/ventas_por_mes.csv', index=False)

# Guardar datos limpios
df_orders_clean.to_csv('output/orders_clean.csv', index=False)

print("✅ Archivos CSV guardados en output/")`,
      explanation: { es: 'CSV es el formato más universal. Cualquiera puede abrirlo en Excel.', en: 'CSV is the most universal format. Anyone can open it in Excel.', pt: 'CSV é o formato mais universal. Qualquer um pode abrir no Excel.' },
      tip: { es: 'Usá index=False para no guardar el índice de Pandas como columna.', en: 'Use index=False to avoid saving Pandas index as column.', pt: 'Use index=False para não salvar o índice do Pandas como coluna.' }
    },
    { 
      order: 9, 
      text: { es: '💾 LOAD - Guardá en Parquet (formato profesional)', en: '💾 LOAD - Save to Parquet (professional format)', pt: '💾 LOAD - Salve em Parquet (formato profissional)' },
      code: `# Instalar pyarrow si no lo tenés: pip install pyarrow

# Guardar en Parquet
df_orders_clean.to_parquet('output/orders_clean.parquet', index=False)

# Comparar tamaños
csv_size = os.path.getsize('output/orders_clean.csv') / 1024
parquet_size = os.path.getsize('output/orders_clean.parquet') / 1024

print(f"Tamaño CSV: {csv_size:.1f} KB")
print(f"Tamaño Parquet: {parquet_size:.1f} KB")
print(f"Parquet es {csv_size/parquet_size:.1f}x más chico")`,
      explanation: { es: 'Parquet es columnar y comprimido. Para datasets grandes, es 10x más rápido de leer que CSV.', en: 'Parquet is columnar and compressed. For large datasets, it\'s 10x faster to read than CSV.', pt: 'Parquet é colunar e comprimido. Para datasets grandes, é 10x mais rápido de ler que CSV.' },
      tip: { es: 'En producción, siempre usá Parquet. CSV solo para compartir con no-técnicos.', en: 'In production, always use Parquet. CSV only for sharing with non-techies.', pt: 'Em produção, sempre use Parquet. CSV só para compartilhar com não-técnicos.' }
    },
    { 
      order: 10, 
      text: { es: '📝 Documentá tu trabajo', en: '📝 Document your work', pt: '📝 Documente seu trabalho' },
      code: `# Crear README.md

readme_content = """
# Mi Primer ETL con Python

## Descripción
Pipeline ETL que procesa datos de e-commerce para generar métricas de ventas.

## Cómo correr
\`\`\`bash
pip install pandas pyarrow
python etl.py
\`\`\`

## Decisiones de limpieza
- **Nulos**: Eliminé filas sin customer_id, product_id o total (campos críticos)
- **Duplicados**: Eliminé duplicados por order_id, quedándome con el más reciente
- **Tipos**: Convertí order_date a datetime, total y quantity a numérico

## Output
- \`ventas_por_cliente.csv\`: Total gastado y cantidad de órdenes por cliente
- \`ventas_por_mes.csv\`: Ventas totales por mes
- \`orders_clean.parquet\`: Dataset limpio en formato optimizado

## Autor
[Tu nombre] - [Fecha]
"""

with open('README.md', 'w') as f:
    f.write(readme_content)

print("✅ README.md creado")`,
      explanation: { es: 'Un buen README es tu carta de presentación. En entrevistas, van a mirar tu GitHub.', en: 'A good README is your cover letter. In interviews, they will look at your GitHub.', pt: 'Um bom README é sua carta de apresentação. Em entrevistas, vão olhar seu GitHub.' },
      checkpoint: { es: '¿Tu README explica qué hace el proyecto, cómo correrlo, y qué decisiones tomaste?', en: 'Does your README explain what the project does, how to run it, and what decisions you took?', pt: 'Seu README explica o que faz o projeto, como rodar e que decisões tomou?' }
    },
    { 
      order: 11, 
      text: { es: '🚀 Subí a GitHub', en: '🚀 Upload to GitHub', pt: '🚀 Suba para o GitHub' },
      code: `# En terminal:
git init
git add .
git commit -m "Mi primer ETL con Python"

# Crear repo en GitHub y conectar
git remote add origin https://github.com/TU_USUARIO/mi-primer-etl.git
git push -u origin main`,
      explanation: { es: 'Tu portfolio en GitHub es fundamental para conseguir trabajo. Cada proyecto cuenta.', en: 'Your GitHub portfolio is fundamental to get a job. Every project counts.', pt: 'Seu portfolio no GitHub é fundamental para conseguir emprego. Cada projeto conta.' },
      tip: { es: 'Agregá un .gitignore para no subir los datos (pueden ser grandes o sensibles).', en: 'Add a .gitignore to not upload data (can be large or sensitive).', pt: 'Adicione um .gitignore para não subir os dados (podem ser grandes ou sensíveis).' }
    },
  ],
  deliverable: { es: 'Repositorio en GitHub con: etl.py, requirements.txt, README.md, carpeta output/ con resultados', en: 'GitHub repository with: etl.py, requirements.txt, README.md, output/ folder with results', pt: 'Repositório no GitHub com: etl.py, requirements.txt, README.md, pasta output/ com resultados' },
  evaluation: [
    { es: '¿El script corre sin errores con python etl.py?', en: 'Does the script run without errors with python etl.py?', pt: 'O script roda sem erros com python etl.py?' },
    { es: '¿Documentaste cómo manejaste los nulos y por qué?', en: 'Did you document how you handled nulls and why?', pt: 'Documentou como tratou os nulos e por quê?' },
    { es: '¿Las métricas calculadas son correctas? (verificá manualmente 2-3)', en: 'Are calculated metrics correct? (manually verify 2-3)', pt: 'As métricas calculadas estão corretas? (verifique manualmente 2-3)' },
    { es: '¿El código tiene comentarios explicando cada paso?', en: 'Does the code have comments explaining each step?', pt: 'O código tem comentários explicando cada passo?' },
    { es: '¿El README explica cómo correr el proyecto?', en: 'Does the README explain how to run the project?', pt: 'O README explica como rodar o projeto?' },
    { es: '¿Guardaste en Parquet además de CSV?', en: 'Did you save in Parquet besides CSV?', pt: 'Salvou em Parquet além de CSV?' },
  ],
  codeExample: `# etl.py - Pipeline ETL Completo
import pandas as pd
import os
from datetime import datetime

def extract(data_dir: str = 'data') -> dict:
    """Extrae datos de los archivos CSV."""
    print("📥 EXTRACT: Cargando datos...")
    
    tables = {}
    csv_files = {
        'orders': 'ecommerce_orders.csv',
        'order_items': 'ecommerce_order_items.csv',
        'customers': 'ecommerce_customers.csv',
        'products': 'ecommerce_products.csv',
        'categories': 'ecommerce_categories.csv',
    }
    
    for table_name, filename in csv_files.items():
        filepath = os.path.join(data_dir, filename)
        if os.path.exists(filepath):
            tables[table_name] = pd.read_csv(filepath)
            print(f"   {table_name}: {len(tables[table_name])} filas")
        else:
            print(f"   ⚠️ {filename} no encontrado")
    
    return tables

def transform(tables: dict) -> pd.DataFrame:
    """Limpia y transforma los datos."""
    print("\\n🔄 TRANSFORM: Limpiando datos...")
    df = tables['orders'].copy()
    
    # 1. Manejar nulos
    antes = len(df)
    df = df.dropna(subset=['customer_id', 'total_amount'])
    print(f"   Filas eliminadas por nulos: {antes - len(df)}")
    
    # 2. Eliminar duplicados
    antes = len(df)
    df = df.drop_duplicates(subset=['order_id'], keep='last')
    print(f"   Duplicados eliminados: {antes - len(df)}")
    
    # 3. Corregir tipos
    df['order_date'] = pd.to_datetime(df['order_date'])
    df['total_amount'] = pd.to_numeric(df['total_amount'], errors='coerce')
    
    # 4. Agregar campos calculados
    df['order_month'] = df['order_date'].dt.to_period('M').astype(str)
    df['is_high_value'] = df['total_amount'] > 100
    
    print(f"   Filas finales: {len(df)}")
    return df

def load(df: pd.DataFrame, output_dir: str = 'output'):
    """Guarda los resultados."""
    print(f"\\n💾 LOAD: Guardando en {output_dir}/...")
    os.makedirs(output_dir, exist_ok=True)
    
    # Datos limpios
    df.to_csv(f'{output_dir}/orders_clean.csv', index=False)
    df.to_parquet(f'{output_dir}/orders_clean.parquet', index=False)
    
    # Métricas
    ventas_cliente = df.groupby('customer_id')['total_amount'].sum().reset_index()
    ventas_cliente.to_csv(f'{output_dir}/ventas_por_cliente.csv', index=False)
    
    ventas_mes = df.groupby('order_month')['total_amount'].sum().reset_index()
    ventas_mes.to_csv(f'{output_dir}/ventas_por_mes.csv', index=False)
    
    print("   ✅ Archivos guardados")

def main():
    print("=" * 50)
    print("ETL Pipeline - E-commerce Data")
    print("=" * 50)
    
    tables = extract('data')
    df_clean = transform(tables)
    load(df_clean)
    
    print("\\n✅ ETL completado exitosamente!")

if __name__ == "__main__":
    main()`,
  theory: { es: `## ¿Qué es ETL?

**ETL** significa Extract, Transform, Load. Es el patrón fundamental de Data Engineering:

### 1. Extract (Extraer)
Obtener datos de una fuente:
- Archivos (CSV, JSON, Parquet)
- APIs REST
- Bases de datos (PostgreSQL, MySQL)
- Servicios cloud (S3, GCS)

### 2. Transform (Transformar)
Limpiar y preparar los datos:
- Manejar valores nulos
- Eliminar duplicados
- Corregir tipos de datos
- Calcular métricas
- Enriquecer con datos adicionales

### 3. Load (Cargar)
Guardar en el destino:
- Data Warehouse (Snowflake, BigQuery)
- Data Lake (S3, GCS)
- Archivos (Parquet, CSV)

## ¿Por qué Pandas?

Pandas es la librería estándar para manipulación de datos en Python:
- **DataFrames**: Tablas en memoria, fáciles de manipular
- **Operaciones vectorizadas**: Rápidas sin loops explícitos
- **Integración**: Lee/escribe SQL, Parquet, JSON, Excel, CSV

## Formatos de Archivo

| Formato | Pros | Contras | Usar cuando |
|---------|------|---------|-------------|
| CSV | Universal, legible | Lento, sin tipos | Compartir con no-técnicos |
| JSON | Flexible, estructuras anidadas | Verboso | APIs, configs |
| Parquet | Rápido, comprimido, tipado | Binario | Producción, analytics |

**Regla práctica**: Usá Parquet para guardar datos procesados. Es 10x más rápido que CSV.`, en: `## What is ETL?

**ETL** stands for Extract, Transform, Load. It is the fundamental pattern of Data Engineering:

### 1. Extract
Get data from a source:
- Files (CSV, JSON, Parquet)
- REST APIs
- Databases (PostgreSQL, MySQL)
- Cloud services (S3, GCS)

### 2. Transform
Clean and prepare data:
- Handle null values
- Remove duplicates
- Fix data types
- Calculate metrics
- Enrich with additional data

### 3. Load
Save to destination:
- Data Warehouse (Snowflake, BigQuery)
- Data Lake (S3, GCS)
- Files (Parquet, CSV)

## Why Pandas?

Pandas is the standard library for data manipulation in Python:
- **DataFrames**: In-memory tables, easy to manipulate
- **Vectorized operations**: Fast without explicit loops
- **Integration**: Reads/writes SQL, Parquet, JSON, Excel, CSV

## File Formats

| Format | Pros | Cons | Use when |
|--------|------|------|----------|
| CSV | Universal, readable | Slow, untyped | Share with non-techies |
| JSON | Flexible, nested structures | Verbose | APIs, configs |
| Parquet | Fast, compressed, typed | Binary | Production, analytics |

**Rule of thumb**: Use Parquet to save processed data. It's 10x faster than CSV.`, pt: `## O que é ETL?

**ETL** significa Extract, Transform, Load. É o padrão fundamental de Data Engineering:

### 1. Extract (Extrair)
Obter dados de uma fonte:
- Arquivos (CSV, JSON, Parquet)
- APIs REST
- Bancos de dados (PostgreSQL, MySQL)
- Serviços cloud (S3, GCS)

### 2. Transform (Transformar)
Limpar e preparar os dados:
- Lidar com valores nulos
- Remover duplicatas
- Corrigir tipos de dados
- Calcular métricas
- Enriquecer com dados adicionais

### 3. Load (Carregar)
Salvar no destino:
- Data Warehouse (Snowflake, BigQuery)
- Data Lake (S3, GCS)
- Arquivos (Parquet, CSV)

## Por que Pandas?

Pandas é a biblioteca padrão para manipulação de dados em Python:
- **DataFrames**: Tabelas em memória, fáceis de manipular
- **Operações vetorizadas**: Rápidas sem loops explícitos
- **Integração**: Lê/escreve SQL, Parquet, JSON, Excel, CSV

## Formatos de Arquivo

| Formato | Pros | Contras | Usar quando |
|---------|------|---------|-------------|
| CSV | Universal, legível | Lento, sem tipos | Compartilhar com não-técnicos |
| JSON | Flexível, estruturas aninhadas | Verboso | APIs, configs |
| Parquet | Rápido, comprimido, tipado | Binário | Produção, analytics |

**Regra prática**: Use Parquet para salvar dados processados. É 10x mais rápido que CSV.` },
  nextSteps: [
    { es: 'Hacé el proyecto "Análisis SQL de Logs" para practicar SQL', en: 'Do "SQL Logs Analysis" project to practice SQL', pt: 'Faça o projeto "Análise SQL de Logs" para praticar SQL' },
    { es: 'Agregá más métricas: ticket promedio, clientes recurrentes', en: 'Add more metrics: average ticket, recurring customers', pt: 'Adicione mais métricas: ticket médio, clientes recorrentes' },
    { es: 'Conectá con una base de datos real en vez de archivos', en: 'Connect to a real database instead of files', pt: 'Conecte com um banco de dados real em vez de arquivos' },
  ],
  resources: [
    { title: { es: 'Pandas en 10 minutos', en: 'Pandas in 10 minutes', pt: 'Pandas em 10 minutos' }, url: 'https://pandas.pydata.org/docs/user_guide/10min.html', type: 'docs' },
    { title: { es: 'ETL vs ELT', en: 'ETL vs ELT', pt: 'ETL vs ELT' }, url: 'https://www.fivetran.com/blog/etl-vs-elt', type: 'article' },
  ],
};


