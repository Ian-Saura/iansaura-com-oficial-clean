import { LocalizedContent } from '../types/i18n';

/**
 * Bootcamp Data - Contenido completo del Bootcamp de Data Engineering
 * 
 * Estructura:
 * - 8 Semanas de contenido
 * - Cada semana tiene: video, presentación, ejercicios extra
 * - Proyecto Final con guía completa
 * - Sección de entregas (links a formularios)
 */

export interface BootcampWeek {
  id: string;
  weekNumber: number;
  title: LocalizedContent;
  description: LocalizedContent;
  videoUrl: string;
  videoId: string; // YouTube ID for embedding
  presentationUrl?: string;
  presentationName?: string;
  exercises: BootcampExercise[];
  deliveryFormUrl: string;
}

export interface BootcampExercise {
  id: string;
  title: LocalizedContent;
  objective: LocalizedContent;
  instructions: LocalizedContent[];
  deliverable: LocalizedContent;
  files?: { name: string; url: string }[];
  codeExamples?: { language: string; code: string }[];
}

export interface BootcampRules {
  id: string;
  title: LocalizedContent;
  icon: string;
  content: LocalizedContent;
}

export interface BootcampFinalProject {
  context: LocalizedContent;
  datasets: { name: string; description: LocalizedContent; example: string }[];
  weeklyTasks: { week: number; title: LocalizedContent; objective: LocalizedContent; deliverables: LocalizedContent[] }[];
}

// ============================================
// REGLAS DEL BOOTCAMP
// ============================================
export const bootcampRules: BootcampRules[] = [
  {
    id: 'rule-1',
    title: { es: 'Uso del contenido', en: 'Content Usage', pt: 'Uso do conteúdo' },
    icon: '📽',
    content: { 
      es: 'Está prohibida la descarga, reproducción o redistribución de las grabaciones o materiales. Este contenido es exclusivo para los participantes del Bootcamp. El incumplimiento implica la pérdida de acceso inmediato.', 
      en: 'Downloading, reproducing, or redistributing recordings or materials is prohibited. This content is exclusive to Bootcamp participants. Non-compliance implies immediate loss of access.', 
      pt: 'É proibido baixar, reproduzir ou redistribuir as gravações ou materiais. Este conteúdo é exclusivo para os participantes do Bootcamp. O descumprimento implica a perda imediata de acesso.' 
    }
  },
  {
    id: 'rule-2',
    title: { es: 'Participación activa', en: 'Active Participation', pt: 'Participação Ativa' },
    icon: '🧑‍💻',
    content: { 
      es: 'Se espera que cada estudiante participe en las clases, Discord y entregas semanales. El aprendizaje es mejor cuando lo hacemos en comunidad.', 
      en: 'Each student is expected to participate in classes, Discord, and weekly deliveries. Learning is better when done in community.', 
      pt: 'Espera-se que cada estudante participe das aulas, Discord e entregas semanais. O aprendizado é melhor quando feito em comunidade.' 
    }
  },
  {
    id: 'rule-3',
    title: { es: 'Entregas y fechas', en: 'Deliveries and Deadlines', pt: 'Entregas e Prazos' },
    icon: '📅',
    content: { 
      es: 'Las tareas deben entregarse dentro del plazo estipulado (domingo 23:59). Si no podés entregarla a tiempo, avisá por Discord en el canal #consultas.', 
      en: 'Tasks must be submitted within the stipulated deadline (Sunday 23:59). If you cannot submit on time, notify via Discord in the #consultas channel.', 
      pt: 'As tarefas devem ser entregues dentro do prazo estipulado (domingo 23:59). Se não puder entregar a tempo, avise pelo Discord no canal #consultas.' 
    }
  },
  {
    id: 'rule-4',
    title: { es: 'Respeto y colaboración', en: 'Respect and Collaboration', pt: 'Respeito e Colaboração' },
    icon: '🤝',
    content: { 
      es: 'Este espacio es seguro y colaborativo. Se espera respeto mutuo, apoyo entre compañeros y cero tolerancia a faltas de respeto o discriminación.', 
      en: 'This space is safe and collaborative. Mutual respect, peer support, and zero tolerance for disrespect or discrimination are expected.', 
      pt: 'Este espaço é seguro e colaborativo. Espera-se respeito mútuo, apoio entre colegas e tolerância zero a falta de respeito ou discriminação.' 
    }
  },
  {
    id: 'rule-5',
    title: { es: 'Uso de Discord', en: 'Discord Usage', pt: 'Uso do Discord' },
    icon: '💡',
    content: { 
      es: 'Los anuncios oficiales se publican en el canal #avisos. Las dudas van en #consultas-semanales o en el canal de tu semana. No hacer spam ni enviar mensajes directos sin consentimiento.', 
      en: 'Official announcements are posted in the #avisos channel. Questions go in #consultas-semanales or your week\'s channel. Do not spam or send direct messages without consent.', 
      pt: 'Os anúncios oficiais são publicados no canal #avisos. As dúvidas vão em #consultas-semanales ou no canal da sua semana. Não faça spam nem envie mensagens diretas sem consentimento.' 
    }
  },
  {
    id: 'rule-6',
    title: { es: 'Uso de herramientas externas (como IA)', en: 'Use of External Tools (like AI)', pt: 'Uso de Ferramentas Externas (como IA)' },
    icon: '🤖',
    content: { 
      es: 'Se puede usar IA (como ChatGPT) para acelerar el aprendizaje, pero nunca para copiar tareas sin entenderlas. Tu objetivo es aprender, no "pasar" el bootcamp.', 
      en: 'AI (like ChatGPT) can be used to accelerate learning, but never to copy tasks without understanding them. Your goal is to learn, not to "pass" the bootcamp.', 
      pt: 'Pode-se usar IA (como ChatGPT) para acelerar o aprendizado, mas nunca para copiar tarefas sem entendê-las. Seu objetivo é aprender, não "passar" no bootcamp.' 
    }
  },
  {
    id: 'rule-7',
    title: { es: 'Certificación', en: 'Certification', pt: 'Certificação' },
    icon: '🎓',
    content: { 
      es: 'Se entregará certificado solo a quienes completen al menos el 80% de las entregas y participen activamente.', 
      en: 'Certificate will be awarded only to those who complete at least 80% of deliveries and participate actively.', 
      pt: 'O certificado será entregue apenas para quem completar pelo menos 80% das entregas e participar ativamente.' 
    }
  }
];

// ============================================
// SEMANAS DEL BOOTCAMP
// ============================================
export const bootcampWeeks: BootcampWeek[] = [
  {
    id: 'week-1',
    weekNumber: 1,
    title: { es: 'Introducción al rol + Roadmap', en: 'Role Introduction + Roadmap', pt: 'Introdução ao Papel + Roadmap' },
    description: { es: 'Qué es Data Engineering, roles en el ecosistema de datos, herramientas principales.', en: 'What is Data Engineering, roles in data ecosystem, main tools.', pt: 'O que é Data Engineering, papéis no ecossistema de dados, ferramentas principais.' },
    videoUrl: 'https://youtu.be/oDMquk7krqc',
    videoId: 'oDMquk7krqc',
    presentationName: 'Semana-1-Introduccion-al-Ecosistema-de-Datos.pdf',
    deliveryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSep2NdMqdMPRHIdE4wOCdUDAbpRySHNNl7KSP_CZJ1aowMuLA/viewform',
    exercises: [
      {
        id: 'w1-ex1',
        title: { es: 'Diagrama de flujo de datos', en: 'Data Flow Diagram', pt: 'Diagrama de Fluxo de Dados' },
        objective: { es: 'Diseñar un flujo de datos de una empresa cotidiana, identificando fuentes, almacenamiento, transformación y visualización.', en: 'Design a data flow for an everyday company, identifying sources, storage, transformation, and visualization.', pt: 'Projetar um fluxo de dados de uma empresa cotidiana, identificando fontes, armazenamento, transformação e visualização.' },
        instructions: [
          { es: 'Piensa en un negocio o empresa real o ficticia (cafetería, e-commerce, gimnasio, etc.)', en: 'Think of a real or fictional business (coffee shop, e-commerce, gym, etc.)', pt: 'Pense em um negócio real ou fictício (cafeteria, e-commerce, academia, etc.)' },
          { es: 'Identifica: Fuentes de datos (POS, app móvil, redes sociales, ERP, sensores IoT)', en: 'Identify: Data sources (POS, mobile app, social media, ERP, IoT sensors)', pt: 'Identifique: Fontes de dados (POS, app móvel, redes sociais, ERP, sensores IoT)' },
          { es: 'Identifica: Almacenamiento (base de datos, hojas de cálculo, S3, data warehouse)', en: 'Identify: Storage (database, spreadsheets, S3, data warehouse)', pt: 'Identifique: Armazenamento (banco de dados, planilhas, S3, data warehouse)' },
          { es: 'Identifica: Transformación (Python, Excel, dbt, ETL)', en: 'Identify: Transformation (Python, Excel, dbt, ETL)', pt: 'Identifique: Transformação (Python, Excel, dbt, ETL)' },
          { es: 'Identifica: Visualización (Tableau, Power BI, Metabase)', en: 'Identify: Visualization (Tableau, Power BI, Metabase)', pt: 'Identifique: Visualização (Tableau, Power BI, Metabase)' },
          { es: 'Usa Miro, Draw.io o PowerPoint para representar el flujo con flechas e iconos', en: 'Use Miro, Draw.io or PowerPoint to represent flow with arrows and icons', pt: 'Use Miro, Draw.io ou PowerPoint para representar o fluxo com setas e ícones' },
          { es: 'Exporta el diagrama como imagen y súbelo con una breve explicación (3-5 líneas)', en: 'Export diagram as image and upload with brief explanation (3-5 lines)', pt: 'Exporte o diagrama como imagem e envie com uma breve explicação (3-5 linhas)' }
        ],
        deliverable: { es: 'Diagrama (.png, PDF o Notion) + explicación breve', en: 'Diagram (.png, PDF or Notion) + brief explanation', pt: 'Diagrama (.png, PDF ou Notion) + breve explicação' }
      },
      {
        id: 'w1-ex2',
        title: { es: 'Glosario de herramientas', en: 'Tools Glossary', pt: 'Glossário de Ferramentas' },
        objective: { es: 'Investigar 6 herramientas vistas en la clase y documentar su uso, posición en el pipeline y nivel de complejidad.', en: 'Research 6 tools seen in class and document usage, pipeline position, and complexity.', pt: 'Pesquisar 6 ferramentas vistas em aula e documentar uso, posição no pipeline e complexidade.' },
        instructions: [
          { es: 'Elige 6 herramientas mencionadas (ej: Airbyte, pandas, S3, PostgreSQL, dbt, Airflow)', en: 'Choose 6 mentioned tools (e.g., Airbyte, pandas, S3, PostgreSQL, dbt, Airflow)', pt: 'Escolha 6 ferramentas mencionadas (ex: Airbyte, pandas, S3, PostgreSQL, dbt, Airflow)' },
          { es: 'Para cada una completa: Nombre, ¿Para qué sirve?, Etapa del pipeline, Nivel de complejidad', en: 'For each complete: Name, What is it for?, Pipeline stage, Complexity level', pt: 'Para cada uma complete: Nome, Para que serve?, Etapa do pipeline, Nível de complexidade' },
          { es: 'Presenta el glosario en una tabla en Notion o como archivo .docx o .md', en: 'Present glossary in a Notion table or as .docx/.md file', pt: 'Apresente o glossário em uma tabela no Notion ou como arquivo .docx ou .md' }
        ],
        deliverable: { es: 'Tabla con 6 herramientas documentadas', en: 'Table with 6 documented tools', pt: 'Tabela com 6 ferramentas documentadas' }
      },
      {
        id: 'w1-ex3',
        title: { es: 'Reto de roles', en: 'Roles Challenge', pt: 'Desafio de Papéis' },
        objective: { es: 'Comprender y comparar los roles más comunes en el mundo de datos.', en: 'Understand and compare common data roles.', pt: 'Compreender e comparar os papéis mais comuns no mundo de dados.' },
        instructions: [
          { es: 'Investiga qué hace cada perfil: Data Engineer, Data Analyst, Data Scientist, Analytics Engineer', en: 'Research each profile: Data Engineer, Data Analyst, Data Scientist, Analytics Engineer', pt: 'Pesquise o que faz cada perfil: Data Engineer, Data Analyst, Data Scientist, Analytics Engineer' },
          { es: 'Haz una tabla comparativa con: Rol, Tareas principales, Herramientas más usadas, Nivel de programación, Ejemplo de entregable', en: 'Make comparative table: Role, Main tasks, Top tools, Coding level, Deliverable example', pt: 'Faça uma tabela comparativa: Papel, Tarefas principais, Ferramentas mais usadas, Nível de programação, Exemplo de entregável' },
          { es: 'Escribe un párrafo final (5-7 líneas): ¿Cuál de estos roles te interesa más y por qué? ¿Qué habilidades crees que deberías desarrollar?', en: 'Write final paragraph: Which role interests you most and why? What skills should you develop?', pt: 'Escreva um parágrafo final: Qual papel te interessa mais e por quê? Que habilidades deve desenvolver?' }
        ],
        deliverable: { es: 'Tabla comparativa + párrafo de reflexión', en: 'Comparative table + reflection paragraph', pt: 'Tabela comparativa + parágrafo de reflexão' }
      }
    ]
  },
  {
    id: 'week-2',
    weekNumber: 2,
    title: { es: 'Fundamentos de Python para datos', en: 'Python Fundamentals for Data', pt: 'Fundamentos de Python para Dados' },
    description: { es: 'Python aplicado: pandas, funciones, manejo de archivos, buenas prácticas.', en: 'Applied Python: pandas, functions, file handling, best practices.', pt: 'Python aplicado: pandas, funções, manipulação de arquivos, boas práticas.' },
    videoUrl: 'https://youtu.be/UuCJd3bHm0E',
    videoId: 'UuCJd3bHm0E',
    presentationName: 'Semana_2.pdf',
    deliveryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSe6pGiIiUCBUG29d7vxMU000EzO64NewOB0iTdIR8jLC-OoyQ/viewform',
    exercises: [
      {
        id: 'w2-ex1',
        title: { es: 'Limpieza de CSV con pandas', en: 'CSV Cleaning with pandas', pt: 'Limpeza de CSV com pandas' },
        objective: { es: 'Aplicar lo aprendido sobre Python y pandas para simular tareas reales de un pipeline de datos.', en: 'Apply Python/pandas learning to simulate real data pipeline tasks.', pt: 'Aplicar o aprendizado de Python/pandas para simular tarefas reais de pipeline de dados.' },
        instructions: [
          { es: 'Cargar ventas_home.csv en un DataFrame con pandas', en: 'Load ventas_home.csv into DataFrame', pt: 'Carregar ventas_home.csv em um DataFrame' },
          { es: 'Limpiar: Quitar espacios extra en producto, Uniformar categoria, Reemplazar precios en texto por números, Rellenar nulos en cantidad con 0', en: 'Clean: Trim spaces, Standardize category, Fix prices, Fill null quantities', pt: 'Limpar: Remover espaços, Padronizar categoria, Corrigir preços, Preencher nulos' },
          { es: 'Crear la columna ingresos = precio * cantidad', en: 'Create ingresos = precio * cantidad', pt: 'Criar ingresos = precio * cantidad' },
          { es: 'Agrupar por categoria, sumando ingresos y contando productos distintos', en: 'Group by category, summing revenue and counting distinct products', pt: 'Agrupar por categoria, somando receitas e contando produtos distintos' },
          { es: 'Guardar el resultado como resumen_ventas.csv', en: 'Save result as resumen_ventas.csv', pt: 'Salvar resultado como resumen_ventas.csv' }
        ],
        deliverable: { es: 'Archivo resumen_ventas.csv + código usado', en: 'resumen_ventas.csv file + code used', pt: 'Arquivo resumen_ventas.csv + código usado' },
        codeExamples: [
          {
            language: 'python',
            code: `import pandas as pd

# Cargar datos
df = pd.read_csv("ventas_home.csv")

# Limpiar espacios
df['producto'] = df['producto'].str.strip()

# Uniformar categorías
df['categoria'] = df['categoria'].str.title()

# Convertir precios a numérico
df['precio'] = pd.to_numeric(df['precio'], errors='coerce')

# Rellenar nulos
df['cantidad'] = df['cantidad'].fillna(0)

# Calcular ingresos
df['ingresos'] = df['precio'] * df['cantidad']

# Agrupar y guardar
resumen = df.groupby('categoria').agg({
    'ingresos': 'sum',
    'producto': 'nunique'
}).reset_index()

resumen.to_csv('resumen_ventas.csv', index=False)`
          }
        ]
      },
      {
        id: 'w2-ex2',
        title: { es: 'Diccionarios y JSON', en: 'Dictionaries and JSON', pt: 'Dicionários e JSON' },
        objective: { es: 'Practicar estructuras básicas y conversión a JSON.', en: 'Practice basic structures and JSON conversion.', pt: 'Praticar estruturas básicas e conversão para JSON.' },
        instructions: [
          { es: 'Crear un diccionario con stock de productos', en: 'Create dictionary with product stock', pt: 'Criar dicionário com estoque de produtos' },
          { es: 'Agregar un producto nuevo', en: 'Add new product', pt: 'Adicionar novo produto' },
          { es: 'Actualizar la cantidad de un producto existente', en: 'Update existing product quantity', pt: 'Atualizar quantidade de produto existente' },
          { es: 'Eliminar un producto', en: 'Delete a product', pt: 'Excluir um produto' },
          { es: 'Guardar el diccionario en stock.json', en: 'Save dictionary to stock.json', pt: 'Salvar dicionário em stock.json' },
          { es: 'Leer stock.json y mostrar su contenido', en: 'Read stock.json and show content', pt: 'Ler stock.json e mostrar conteúdo' }
        ],
        deliverable: { es: 'Archivo stock.json + script usado', en: 'stock.json file + script used', pt: 'Arquivo stock.json + script usado' },
        codeExamples: [
          {
            language: 'python',
            code: `import json

stock = {
    "Manzana": 50,
    "Banana": 30,
    "Pera": 20
}

# Agregar producto
stock["Naranja"] = 40

# Actualizar cantidad
stock["Manzana"] = 60

# Eliminar producto
del stock["Pera"]

# Guardar en JSON
with open('stock.json', 'w') as f:
    json.dump(stock, f, indent=2)

# Leer JSON
with open('stock.json', 'r') as f:
    data = json.load(f)
    print(data)`
          }
        ]
      },
      {
        id: 'w2-ex3',
        title: { es: 'APIs públicas (opcional)', en: 'Public APIs (optional)', pt: 'APIs Públicas (opcional)' },
        objective: { es: 'Traer datos en tiempo real desde internet.', en: 'Fetch real-time data from internet.', pt: 'Trazer dados em tempo real da internet.' },
        instructions: [
          { es: 'Usar la API https://jsonplaceholder.typicode.com/todos', en: 'Use API https://jsonplaceholder.typicode.com/todos', pt: 'Usar a API https://jsonplaceholder.typicode.com/todos' },
          { es: 'Cargar los datos con requests', en: 'Load data with requests', pt: 'Carregar dados com requests' },
          { es: 'Filtrar solo las tareas completadas (completed == True)', en: 'Filter only completed tasks', pt: 'Filtrar apenas tarefas concluídas' },
          { es: 'Guardar el resultado en todos_completados.json', en: 'Save result to todos_completados.json', pt: 'Salvar resultado em todos_completados.json' }
        ],
        deliverable: { es: 'Archivo todos_completados.json + código', en: 'todos_completados.json file + code', pt: 'Arquivo todos_completados.json + código' }
      }
    ]
  },
  {
    id: 'week-3',
    weekNumber: 3,
    title: { es: 'SQL aplicado a Ingeniería de Datos', en: 'SQL for Data Engineering', pt: 'SQL para Engenharia de Dados' },
    description: { es: 'SQL avanzado: JOINs, agregaciones, window functions, CTEs.', en: 'Advanced SQL: JOINs, aggregations, window functions, CTEs.', pt: 'SQL avançado: JOINs, agregações, window functions, CTEs.' },
    videoUrl: 'https://youtu.be/sXT2n5JtaH4',
    videoId: 'sXT2n5JtaH4',
    presentationName: 'Semana_3.pptx.pdf',
    deliveryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSf3KUrj3gIdutbmYvGHKnFssX_ff-hleKoIl98ZAU_iLWxMEA/viewform',
    exercises: [
      {
        id: 'w3-ex1',
        title: { es: 'Agregaciones y JOINs', en: 'Aggregations and JOINs', pt: 'Agregações e JOINs' },
        objective: { es: 'Calcular el total de ingresos por producto y ordenar de mayor a menor ingreso.', en: 'Calculate total revenue by product and sort descending.', pt: 'Calcular receita total por produto e ordenar decrescente.' },
        instructions: [
          { es: 'Join ventas ↔ productos', en: 'Join ventas ↔ productos', pt: 'Join ventas ↔ productos' },
          { es: 'Agregación SUM(cantidad * precio)', en: 'Aggregation SUM(cantidad * precio)', pt: 'Agregação SUM(cantidad * precio)' },
          { es: 'GROUP BY por producto', en: 'GROUP BY product', pt: 'GROUP BY produto' },
          { es: 'ORDER BY descendente', en: 'ORDER BY descending', pt: 'ORDER BY descendente' }
        ],
        deliverable: { es: 'Script .sql o capturas de la consulta + resultado', en: '.sql script or screenshot of query + result', pt: 'Script .sql ou capturas da consulta + resultado' },
        codeExamples: [
          {
            language: 'sql',
            code: `SELECT p.nombre,
       SUM(v.cantidad * v.precio) AS ingresos
FROM ventas v
JOIN productos p ON v.producto_id = p.id
GROUP BY p.nombre
ORDER BY ingresos DESC;`
          }
        ]
      },
      {
        id: 'w3-ex2',
        title: { es: 'Subqueries', en: 'Subqueries', pt: 'Subqueries' },
        objective: { es: 'Listar productos con ventas por encima del promedio.', en: 'List products with sales above average.', pt: 'Listar produtos com vendas acima da média.' },
        instructions: [
          { es: 'Subquery que calcule el promedio de ingresos por producto', en: 'Subquery calculating average revenue per product', pt: 'Subquery que calcule a média de receita por produto' },
          { es: 'Comparar cada producto contra ese promedio (en HAVING o WHERE)', en: 'Compare each product vs average (HAVING or WHERE)', pt: 'Comparar cada produto contra essa média (HAVING ou WHERE)' },
          { es: 'Mostrar producto + ingresos', en: 'Show product + revenue', pt: 'Mostrar produto + receita' }
        ],
        deliverable: { es: 'Script .sql con la consulta', en: '.sql script with query', pt: 'Script .sql com a consulta' },
        codeExamples: [
          {
            language: 'sql',
            code: `SELECT p.nombre,
       SUM(v.cantidad * v.precio) AS ingresos
FROM ventas v
JOIN productos p ON v.producto_id = p.id
GROUP BY p.nombre
HAVING SUM(v.cantidad * v.precio) >
(
  SELECT AVG(total_prod) FROM (
    SELECT SUM(v2.cantidad * v2.precio) AS total_prod
    FROM ventas v2
    GROUP BY v2.producto_id
  ) t
);`
          }
        ]
      },
      {
        id: 'w3-ex3',
        title: { es: 'CTEs encadenados', en: 'Chained CTEs', pt: 'CTEs Encadeados' },
        objective: { es: 'Usar CTEs para calcular ventas por región y la participación porcentual de cada región sobre el total.', en: 'Use CTEs to calculate sales by region and % share.', pt: 'Usar CTEs para calcular vendas por região e % de participação.' },
        instructions: [
          { es: 'CTE1: ingresos por región (ventas + clientes)', en: 'CTE1: revenue by region', pt: 'CTE1: receita por região' },
          { es: 'CTE2: total global de ingresos', en: 'CTE2: global revenue total', pt: 'CTE2: total global de receita' },
          { es: 'Select final: region, ingresos, porcentaje = ingresos / total * 100, ordenado desc', en: 'Final Select: region, revenue, % = revenue / total * 100, desc', pt: 'Select final: região, receita, % = receita / total * 100, desc' }
        ],
        deliverable: { es: 'Script .sql con CTEs', en: '.sql script with CTEs', pt: 'Script .sql com CTEs' },
        codeExamples: [
          {
            language: 'sql',
            code: `WITH ingresos_region AS (
  SELECT c.region,
         SUM(v.cantidad * v.precio) AS ingresos
  FROM ventas v
  JOIN clientes c ON v.cliente_id = c.id
  GROUP BY c.region
),
total_global AS (
  SELECT SUM(ingresos) AS total FROM ingresos_region
)
SELECT ir.region,
       ir.ingresos,
       ROUND((ir.ingresos * 100.0) / tg.total, 2) AS porcentaje
FROM ingresos_region ir
CROSS JOIN total_global tg
ORDER BY porcentaje DESC;`
          }
        ]
      }
    ]
  },
  {
    id: 'week-4',
    weekNumber: 4,
    title: { es: 'Diseño de Data Warehouses y Modelado Analítico', en: 'Data Warehouse Design and Analytical Modeling', pt: 'Design de Data Warehouses e Modelagem Analítica' },
    description: { es: 'Data Lakes, Data Warehouses, arquitecturas modernas, cloud.', en: 'Data Lakes, Data Warehouses, modern architectures, cloud.', pt: 'Data Lakes, Data Warehouses, arquiteturas modernas, nuvem.' },
    videoUrl: 'https://youtu.be/Z0-FdWQZ2GA',
    videoId: 'Z0-FdWQZ2GA',
    presentationName: 'Diseno-de-Data-Warehouses-y-Modelado-Analitico.pdf',
    deliveryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdp_YqdiikI3rcGHAg3pR8QuoAazo8jghvk32-nlWyOgdlY4A/viewform',
    exercises: [
      {
        id: 'w4-ex1',
        title: { es: 'Diseño de modelo dimensional', en: 'Dimensional Model Design', pt: 'Design de Modelo Dimensional' },
        objective: { es: 'Analizar datos crudos e identificar dimensiones y hechos para un esquema estrella.', en: 'Analyze raw data and identify dimensions/facts for star schema.', pt: 'Analisar dados brutos e identificar dimensões/fatos para esquema estrela.' },
        instructions: [
          { es: 'Analizar ventas_raw.csv e identificar: Dimensiones (clientes, productos, tiempo, región) y Hechos/métricas (monto, cantidad, descuento)', en: 'Analyze ventas_raw.csv, identify: Dimensions, Facts', pt: 'Analisar ventas_raw.csv, identificar: Dimensões, Fatos' },
          { es: 'Diseñar un esquema estrella con: Tabla de hechos fct_ventas, Tablas dimensionales dim_cliente, dim_producto, dim_fecha', en: 'Design star schema with fct_ventas, dim_tables', pt: 'Projetar esquema estrela com fct_ventas, dim_tables' },
          { es: 'Documentar el diseño con: Diagrama simple, Listado de campos por tabla, Tipos de datos propuestos', en: 'Document design: Diagram, Fields list, Data types', pt: 'Documentar design: Diagrama, Lista de campos, Tipos de dados' }
        ],
        deliverable: { es: 'Documento con el diseño del modelo dimensional', en: 'Document with dimensional model design', pt: 'Documento com design do modelo dimensional' }
      },
      {
        id: 'w4-ex2',
        title: { es: 'Implementar dimensiones en SQL', en: 'Implement Dimensions in SQL', pt: 'Implementar Dimensões em SQL' },
        objective: { es: 'Crear scripts SQL para las tablas dimensionales.', en: 'Create SQL scripts for dimensional tables.', pt: 'Criar scripts SQL para tabelas dimensionais.' },
        instructions: [
          { es: 'Crear dim_cliente.sql → cliente único con atributos', en: 'Create dim_cliente.sql', pt: 'Criar dim_cliente.sql' },
          { es: 'Crear dim_producto.sql → catálogo de productos', en: 'Create dim_producto.sql', pt: 'Criar dim_producto.sql' },
          { es: 'Crear dim_fecha.sql → calendario con año, mes, trimestre', en: 'Create dim_fecha.sql', pt: 'Criar dim_fecha.sql' },
          { es: 'Poblar las dimensiones extrayendo datos únicos del CSV', en: 'Populate dimensions from CSV', pt: 'Popular dimensões do CSV' },
          { es: 'Agregar surrogate keys (IDs autoincrementales)', en: 'Add surrogate keys', pt: 'Adicionar surrogate keys' }
        ],
        deliverable: { es: 'Scripts SQL de creación y carga de dimensiones', en: 'SQL scripts for dimension creation/loading', pt: 'Scripts SQL de criação/carga de dimensões' }
      },
      {
        id: 'w4-ex3',
        title: { es: 'Crear tabla de hechos', en: 'Create Fact Table', pt: 'Criar Tabela de Fatos' },
        objective: { es: 'Implementar fct_ventas.sql que referencie las dimensiones.', en: 'Implement fct_ventas.sql referencing dimensions.', pt: 'Implementar fct_ventas.sql referenciando dimensões.' },
        instructions: [
          { es: 'Implementar fct_ventas.sql que: Referencie las dimensiones mediante FKs, Contenga solo métricas (monto, cantidad), Use las surrogate keys de las dimensiones', en: 'Implement fct_ventas.sql: FKs to dimensions, only metrics, use surrogate keys', pt: 'Implementar fct_ventas.sql: FKs para dimensões, apenas métricas, usar surrogate keys' },
          { es: 'Documentar las relaciones entre hechos y dimensiones', en: 'Document relationships', pt: 'Documentar relacionamentos' },
          { es: 'Verificar integridad referencial', en: 'Verify referential integrity', pt: 'Verificar integridade referencial' }
        ],
        deliverable: { es: 'fct_ventas.sql con documentación de las relaciones', en: 'fct_ventas.sql with documentation', pt: 'fct_ventas.sql com documentação' }
      }
    ]
  },
  {
    id: 'week-5',
    weekNumber: 5,
    title: { es: 'Automatización y orquestación', en: 'Automation and Orchestration', pt: 'Automação e Orquestração' },
    description: { es: 'Airflow, scheduling, dependencias entre tareas, DAGs.', en: 'Airflow, scheduling, task dependencies, DAGs.', pt: 'Airflow, agendamento, dependências entre tarefas, DAGs.' },
    videoUrl: 'https://youtu.be/Q_C9DTL6yrg',
    videoId: 'Q_C9DTL6yrg',
    presentationName: 'Semana-5-Pipelines-y-Automatizacion.pdf',
    deliveryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSdtFm6iAeYaU_qP35ncmMTM4l_50z2xB8Q1rrkcNL_ENL00FQ/viewform',
    exercises: [
      {
        id: 'w5-ex1',
        title: { es: 'Pipeline Python completo', en: 'Complete Python Pipeline', pt: 'Pipeline Python Completo' },
        objective: { es: 'Crear pipeline_ventas.py con cuatro etapas claramente separadas.', en: 'Create pipeline_ventas.py with four clearly separated stages.', pt: 'Criar pipeline_ventas.py com quatro etapas claramente separadas.' },
        instructions: [
          { es: 'Carga: Leer ventas_raw.csv', en: 'Load: Read ventas_raw.csv', pt: 'Carga: Ler ventas_raw.csv' },
          { es: 'Limpieza: Corregir tipos, eliminar espacios, manejar nulos', en: 'Cleaning: Fix types, trim spaces, handle nulls', pt: 'Limpeza: Corrigir tipos, eliminar espaços, tratar nulos' },
          { es: 'Transformación: Calcular ventas mensuales, agregar columna mes', en: 'Transformation: Calculate monthly sales, add month column', pt: 'Transformação: Calcular vendas mensais, adicionar coluna mês' },
          { es: 'Exportación: Guardar ventas_mensuales.csv', en: 'Export: Save ventas_mensuales.csv', pt: 'Exportação: Salvar ventas_mensuales.csv' },
          { es: 'Agregar logging básico en cada etapa', en: 'Add basic logging in each stage', pt: 'Adicionar logging básico em cada etapa' },
          { es: 'Parametrizar rutas de archivos (no hardcodear)', en: 'Parameterize file paths (do not hardcode)', pt: 'Parametrizar caminhos de arquivos (não hardcode)' }
        ],
        deliverable: { es: 'Script Python funcional con logs de ejecución', en: 'Functional Python script with execution logs', pt: 'Script Python funcional com logs de execução' }
      },
      {
        id: 'w5-ex2',
        title: { es: 'Documentación ejecutable', en: 'Executable Documentation', pt: 'Documentação Executável' },
        objective: { es: 'Convertir el pipeline a notebook .ipynb estructurado.', en: 'Convert pipeline to structured .ipynb notebook.', pt: 'Converter pipeline para notebook .ipynb estruturado.' },
        instructions: [
          { es: 'Convertir el pipeline a notebook .ipynb', en: 'Convert pipeline to .ipynb notebook', pt: 'Converter pipeline para notebook .ipynb' },
          { es: 'Estructurar con Markdown en secciones claras', en: 'Structure with Markdown in clear sections', pt: 'Estruturar com Markdown em seções claras' },
          { es: 'Agregar celdas de validación entre etapas: Verificar tipos, Mostrar primeras filas, Contar registros', en: 'Add validation cells between stages: Check types, Show first rows, Count records', pt: 'Adicionar células de validação entre etapas: Verificar tipos, Mostrar primeiras linhas, Contar registros' },
          { es: 'Incluir explicación final de casos de uso del pipeline', en: 'Include final explanation of pipeline use cases', pt: 'Incluir explicação final de casos de uso do pipeline' }
        ],
        deliverable: { es: 'Notebook documentado y ejecutable', en: 'Documented and executable notebook', pt: 'Notebook documentado e executável' }
      },
      {
        id: 'w5-ex3',
        title: { es: 'Script bash de automatización', en: 'Automation Bash Script', pt: 'Script Bash de Automação' },
        objective: { es: 'Crear run_pipeline.sh para automatizar la ejecución.', en: 'Create run_pipeline.sh to automate execution.', pt: 'Criar run_pipeline.sh para automatizar a execução.' },
        instructions: [
          { es: 'Crear run_pipeline.sh que: Ejecute el pipeline Python, Guarde logs con timestamp, Muestre mensaje de éxito/error', en: 'Create run_pipeline.sh that: Runs Python pipeline, Saves logs with timestamp, Shows success/error message', pt: 'Criar run_pipeline.sh que: Execute o pipeline Python, Salve logs com timestamp, Mostre mensagem de sucesso/erro' },
          { es: 'Programar ejecución con cron (opcional): Configurar para correr diariamente, Documentar la expresión cron usada', en: 'Schedule with cron (optional): Configure daily run, Document cron expression used', pt: 'Agendar com cron (opcional): Configurar para rodar diariamente, Documentar expressão cron usada' }
        ],
        deliverable: { es: 'Script bash funcional y documentación de cron', en: 'Functional bash script and cron documentation', pt: 'Script bash funcional e documentação do cron' }
      }
    ]
  },
  {
    id: 'week-6',
    weekNumber: 6,
    title: { es: 'Git, entornos virtuales y calidad de datos', en: 'Git, Virtual Environments, and Data Quality', pt: 'Git, Ambientes Virtuais e Qualidade de Dados' },
    description: { es: 'Data quality, testing, control de versiones, CI/CD.', en: 'Data quality, testing, version control, CI/CD.', pt: 'Qualidade de dados, testes, controle de versão, CI/CD.' },
    videoUrl: 'https://youtu.be/RXs7AW_7d_E',
    videoId: 'RXs7AW_7d_E',
    presentationName: 'Semana-6-Git-Entornos-Virtuales-y-Calidad-de-Datos.pdf',
    deliveryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScUhmt0WH7Bo28sJgDjj5lurx3StGud_qjpOmxvmRYgOqB9HA/viewform',
    exercises: [
      {
        id: 'w6-ex1',
        title: { es: 'Repositorio Git estructurado', en: 'Structured Git Repository', pt: 'Repositório Git Estruturado' },
        objective: { es: 'Inicializar repo Git con estructura profesional.', en: 'Initialize Git repo with professional structure.', pt: 'Inicializar repo Git com estrutura profissional.' },
        instructions: [
          { es: 'Inicializar repo Git para el proyecto', en: 'Initialize Git repo for project', pt: 'Inicializar repo Git para o projeto' },
          { es: 'Crear estructura de carpetas: /data (CSVs), /sql (Scripts SQL), /notebooks (Jupyter), /logs (Archivos de log)', en: 'Create folder structure: /data, /sql, /notebooks, /logs', pt: 'Criar estrutura de pastas: /data, /sql, /notebooks, /logs' },
          { es: 'Crear .gitignore apropiado (excluir datos sensibles, logs, etc.)', en: 'Create appropriate .gitignore (exclude sensitive data, logs, etc.)', pt: 'Criar .gitignore apropriado (excluir dados sensíveis, logs, etc.)' },
          { es: 'Hacer al menos 3 commits con mensajes descriptivos: feat: add data cleaning pipeline, docs: add pipeline documentation', en: 'Make at least 3 commits with descriptive messages', pt: 'Fazer pelo menos 3 commits com mensagens descritivas' }
        ],
        deliverable: { es: 'Link al repositorio o carpeta .git comprimida', en: 'Repo link or compressed .git folder', pt: 'Link para o repositório ou pasta .git compactada' }
      },
      {
        id: 'w6-ex2',
        title: { es: 'Entorno virtual con requirements', en: 'Virtual Environment with requirements', pt: 'Ambiente Virtual com requirements' },
        objective: { es: 'Crear entorno virtual reproducible.', en: 'Create reproducible virtual environment.', pt: 'Criar ambiente virtual reprodutível.' },
        instructions: [
          { es: 'Crear entorno virtual para el proyecto', en: 'Create virtual environment for project', pt: 'Criar ambiente virtual para o projeto' },
          { es: 'Instalar dependencias necesarias (pandas, jupyter, etc.)', en: 'Install necessary dependencies', pt: 'Instalar dependências necessárias' },
          { es: 'Generar requirements.txt', en: 'Generate requirements.txt', pt: 'Gerar requirements.txt' },
          { es: 'Documentar en README.md: Cómo crear el entorno, Cómo instalar dependencias, Cómo ejecutar el pipeline', en: 'Document in README.md: How to create env, install deps, run pipeline', pt: 'Documentar no README.md: Como criar ambiente, instalar deps, rodar pipeline' }
        ],
        deliverable: { es: 'requirements.txt y README.md completo', en: 'requirements.txt and complete README.md', pt: 'requirements.txt e README.md completo' }
      },
      {
        id: 'w6-ex3',
        title: { es: 'Tests de calidad de datos', en: 'Data Quality Tests', pt: 'Testes de Qualidade de Dados' },
        objective: { es: 'Agregar validaciones automáticas al pipeline.', en: 'Add automatic validations to pipeline.', pt: 'Adicionar validações automáticas ao pipeline.' },
        instructions: [
          { es: 'Agregar validaciones al pipeline Python: Not null (verificar campos obligatorios), Tipos (validar que montos sean numéricos), Rangos (fechas dentro de período esperado)', en: 'Add validations to Python pipeline: Not null, Types, Ranges', pt: 'Adicionar validações ao pipeline Python: Not null, Tipos, Faixas' },
          { es: 'Implementar función validate_data() que: Retorne True/False, Loguee los errores encontrados', en: 'Implement validate_data() function: Returns True/False, Logs errors', pt: 'Implementar função validate_data() que: Retorne True/False, Logue os erros' },
          { es: 'Integrar validación en el pipeline (abortar si falla)', en: 'Integrate validation in pipeline (abort if fails)', pt: 'Integrar validação no pipeline (abortar se falhar)' }
        ],
        deliverable: { es: 'Pipeline actualizado con validaciones funcionales', en: 'Updated pipeline with functional validations', pt: 'Pipeline atualizado com validações funcionais' }
      }
    ]
  },
  {
    id: 'week-7',
    weekNumber: 7,
    title: { es: 'Estrategias de carga (Bulk vs incremental)', en: 'Loading Strategies (Bulk vs Incremental)', pt: 'Estratégias de Carga (Bulk vs Incremental)' },
    description: { es: 'Deploy, monitoring, logging, alertas, mejores prácticas.', en: 'Deploy, monitoring, logging, alerts, best practices.', pt: 'Deploy, monitoramento, logging, alertas, melhores práticas.' },
    videoUrl: 'https://youtu.be/7fT-iBcHEK0',
    videoId: '7fT-iBcHEK0',
    deliveryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLScYz3rBc1kGPQpd7WD9RKFnN_1fMsI5mx10j42SscedwOxsCQ/viewform',
    exercises: [
      {
        id: 'w7-ex1',
        title: { es: 'Carga Full (Bulk)', en: 'Full Load (Bulk)', pt: 'Carga Full (Bulk)' },
        objective: { es: 'Implementar load_full.py que cargue todos los datos.', en: 'Implement load_full.py to load all data.', pt: 'Implementar load_full.py que carregue todos os dados.' },
        instructions: [
          { es: 'Implementar load_full.py que: Cargue todos los datos del CSV, Truncate y recree la tabla destino, Registre timestamp de última carga completa', en: 'Implement load_full.py: Load all CSV data, Truncate/recreate target table, Log timestamp', pt: 'Implementar load_full.py: Carregar todos os dados do CSV, Truncate/recriar tabela destino, Registrar timestamp' },
          { es: 'Medir y documentar: Tiempo de ejecución, Cantidad de registros cargados', en: 'Measure and document: Execution time, Records loaded', pt: 'Medir e documentar: Tempo de execução, Quantidade de registros carregados' }
        ],
        deliverable: { es: 'Script de carga full con métricas documentadas', en: 'Full load script with documented metrics', pt: 'Script de carga full com métricas documentadas' }
      },
      {
        id: 'w7-ex2',
        title: { es: 'Carga Incremental', en: 'Incremental Load', pt: 'Carga Incremental' },
        objective: { es: 'Implementar load_incremental.py con watermark.', en: 'Implement load_incremental.py with watermark.', pt: 'Implementar load_incremental.py com watermark.' },
        instructions: [
          { es: 'Implementar load_incremental.py que: Use watermark (última fecha procesada), Cargue solo registros nuevos/modificados, Actualice el watermark después de carga exitosa', en: 'Implement load_incremental.py: Use watermark, Load only new/modified, Update watermark on success', pt: 'Implementar load_incremental.py: Usar watermark, Carregar apenas novos/modificados, Atualizar watermark após sucesso' },
          { es: 'Crear tabla watermarks para control', en: 'Create watermarks table for control', pt: 'Criar tabela watermarks para controle' },
          { es: 'Comparar performance vs carga full', en: 'Compare performance vs full load', pt: 'Comparar performance vs carga full' }
        ],
        deliverable: { es: 'Script de carga incremental con lógica de watermark', en: 'Incremental load script with watermark logic', pt: 'Script de carga incremental com lógica de watermark' },
        codeExamples: [
          {
            language: 'sql',
            code: `CREATE TABLE watermarks (
  table_name VARCHAR,
  last_updated TIMESTAMP
);`
          }
        ]
      },
      {
        id: 'w7-ex3',
        title: { es: 'Análisis comparativo', en: 'Comparative Analysis', pt: 'Análise Comparativa' },
        objective: { es: 'Simular escenarios y documentar recomendaciones.', en: 'Simulate scenarios and document recommendations.', pt: 'Simular cenários e documentar recomendações.' },
        instructions: [
          { es: 'Simular escenarios de carga: Escenario A: 10,000 registros (solo 100 nuevos), Escenario B: 10,000 registros (todos nuevos)', en: 'Simulate load scenarios: A (few new), B (all new)', pt: 'Simular cenários de carga: A (poucos novos), B (todos novos)' },
          { es: 'Documentar en tabla comparativa: Estrategia, Escenario, Tiempo, Registros procesados, Recomendación', en: 'Document in table: Strategy, Scenario, Time, Records, Recommendation', pt: 'Documentar em tabela: Estratégia, Cenário, Tempo, Registros, Recomendação' },
          { es: 'Escribir conclusiones sobre cuándo usar cada estrategia', en: 'Write conclusions on when to use each strategy', pt: 'Escrever conclusões sobre quando usar cada estratégia' }
        ],
        deliverable: { es: 'Documento con análisis y recomendaciones', en: 'Document with analysis and recommendations', pt: 'Documento com análise e recomendações' }
      }
    ]
  },
  {
    id: 'week-8',
    weekNumber: 8,
    title: { es: 'Visualización de datos + Looker Studio', en: 'Data Visualization + Looker Studio', pt: 'Visualização de Dados + Looker Studio' },
    description: { es: 'Dashboards, métricas, storytelling con datos.', en: 'Dashboards, metrics, data storytelling.', pt: 'Dashboards, métricas, storytelling com dados.' },
    videoUrl: 'https://youtu.be/dlEspsj1500',
    videoId: 'dlEspsj1500',
    presentationName: 'Data_Viz_Looker_Studio.pdf',
    deliveryFormUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSeQGCY64Y0LDhKr8OG1R5dmvk9bu6cdORVAFGYhVkLmPTkGFw/viewform',
    exercises: [
      {
        id: 'w8-ex1',
        title: { es: 'Dashboard de Ventas de Pizza', en: 'Pizza Sales Dashboard', pt: 'Dashboard de Vendas de Pizza' },
        objective: { es: 'Crear un dashboard en Looker Studio basado en el dataset de ventas de pizza.', en: 'Create a dashboard in Looker Studio based on pizza sales dataset.', pt: 'Criar um dashboard no Looker Studio baseado no dataset de vendas de pizza.' },
        instructions: [
          { es: 'Descargar el dataset PIZZA_SALES_DATASET.xlsx', en: 'Download PIZZA_SALES_DATASET.xlsx', pt: 'Baixar o dataset PIZZA_SALES_DATASET.xlsx' },
          { es: 'Conectar los datos a Looker Studio', en: 'Connect data to Looker Studio', pt: 'Conectar dados ao Looker Studio' },
          { es: 'Crear visualizaciones: Ventas totales, Ventas por categoría, Tendencia temporal, Top productos', en: 'Create visualizations: Total Sales, Sales by Category, Time Trend, Top Products', pt: 'Criar visualizações: Vendas Totais, Vendas por Categoria, Tendência Temporal, Top Produtos' },
          { es: 'Aplicar filtros interactivos', en: 'Apply interactive filters', pt: 'Aplicar filtros interativos' },
          { es: 'Seguir el template de diseño proporcionado', en: 'Follow provided design template', pt: 'Seguir o template de design fornecido' }
        ],
        deliverable: { es: 'Link al dashboard de Looker Studio', en: 'Link to Looker Studio dashboard', pt: 'Link para o dashboard do Looker Studio' }
      }
    ]
  }
];

// ============================================
// PROYECTO FINAL - Consignas Extendidas
// ============================================
export const bootcampFinalProject: BootcampFinalProject = {
  context: {
    es: `## 📅 Duración: 8 semanas

Este trabajo práctico final se desarrolla **semana a semana**, en paralelo con las clases. No se hace al final: **lo vas construyendo mientras aprendés**.

**Datasets sugeridos:** Tableau "Superstore", Olist – Brazilian E-Commerce (Kaggle), Online Retail II (UCI), Instacart 2017, o el generador de datos de la plataforma.

---

### 📄 Contexto del proyecto

**Empresa simulada:** "VentasOnline SA"

Esta empresa de e-commerce recibe archivos CSV con datos de clientes, productos y ventas. Hoy no tiene ningún proceso de datos estructurado. Tu misión como Data Engineer es construir un pipeline que:

- Lea los archivos crudos
- Los limpie y transforme  
- Verifique la calidad de los datos
- Automatice el flujo
- Exporte los resultados para análisis o visualización

El proyecto final refleja lo que hace un Data Engineer junior en la vida real: tomar datos rotos, estructurarlos, validarlos, automatizarlos y dejarlos listos para ser consumidos.

---

### 📁 Datos disponibles (archivos CSV)

Estos archivos pueden venir con **errores comunes** como:
- Fechas mal formateadas
- Valores nulos o duplicados
- Tipos inconsistentes (texto donde debería haber número)
- Campos con nombres inconsistentes

Esto permite simular un escenario realista donde los estudiantes deben aplicar lo aprendido.`,
    en: `## 📅 Duration: 8 weeks

This final practical work is developed **week by week**, in parallel with classes. It is not done at the end: **you build it as you learn**.

**Suggested datasets:** Tableau "Superstore", Olist – Brazilian E-Commerce (Kaggle), Online Retail II (UCI), Instacart 2017, or the platform's data generator.

---

### 📄 Project Context

**Simulated Company:** "VentasOnline SA"

This e-commerce company receives CSV files with customer, product, and sales data. Today it has no structured data process. Your mission as a Data Engineer is to build a pipeline that:

- Reads raw files
- Cleans and transforms them
- Verifies data quality
- Automates the flow
- Exports results for analysis or visualization

The final project reflects what a junior Data Engineer does in real life: taking broken data, structuring it, validating it, automating it, and making it ready for consumption.

---

### 📁 Available Data (CSV files)

These files may come with **common errors** like:
- Poorly formatted dates
- Null or duplicate values
- Inconsistent types (text where there should be numbers)
- Fields with inconsistent names

This allows simulating a realistic scenario where students must apply what they learned.`,
    pt: `## 📅 Duração: 8 semanas

Este trabalho prático final é desenvolvido **semana a semana**, em paralelo com as aulas. Não é feito no final: **você constrói enquanto aprende**.

**Datasets sugeridos:** Tableau "Superstore", Olist – Brazilian E-Commerce (Kaggle), Online Retail II (UCI), Instacart 2017, ou o gerador de dados da plataforma.

---

### 📄 Contexto do projeto

**Empresa simulada:** "VentasOnline SA"

Esta empresa de e-commerce recebe arquivos CSV com dados de clientes, produtos e vendas. Hoje não tem nenhum processo de dados estruturado. Sua missão como Data Engineer é construir um pipeline que:

- Leia os arquivos brutos
- Limpe e transforme-os
- Verifique a qualidade dos dados
- Automatize o fluxo
- Exporte os resultados para análise ou visualização

O projeto final reflete o que um Data Engineer júnior faz na vida real: pegar dados quebrados, estruturá-los, validá-los, automatizá-los e deixá-los prontos para consumo.

---

### 📁 Dados disponíveis (arquivos CSV)

Esses arquivos podem vir com **erros comuns** como:
- Datas mal formatadas
- Valores nulos ou duplicados
- Tipos inconsistentes (texto onde deveria haver número)
- Campos com nomes inconsistentes

Isso permite simular um cenário realista onde os alunos devem aplicar o que aprenderam.`
  },

  datasets: [
    {
      name: 'clientes.csv',
      description: { es: 'Datos de clientes de la tienda (ID, nombre, email, ciudad, fecha de alta)', en: 'Store customer data (ID, name, email, city, registration date)', pt: 'Dados de clientes da loja (ID, nome, email, cidade, data de cadastro)' },
      example: `cliente_id,nombre,email,ciudad,fecha_alta
1,Ana,ana@gmail.com,CABA,2021-04-05
2,Bruno,bruno@hotmail.com,Córdoba,2021-06-12
3,Camila,camila@yahoo.com,Salta,2022-03-20`
    },
    {
      name: 'productos.csv',
      description: { es: 'Catálogo de productos (ID, nombre, categoría, precio)', en: 'Product catalog (ID, name, category, price)', pt: 'Catálogo de produtos (ID, nome, categoria, preço)' },
      example: `producto_id,nombre,categoria,precio
101,Mouse,Gaming,8500
102,Teclado,Oficina,6700
103,Auriculares,Audio,9200`
    },
    {
      name: 'ventas.csv',
      description: { es: 'Transacciones de ventas (ID venta, cliente, producto, fecha, cantidad, descuento)', en: 'Sales transactions (Sale ID, customer, product, date, quantity, discount)', pt: 'Transações de vendas (ID venda, cliente, produto, data, quantidade, desconto)' },
      example: `venta_id,cliente_id,producto_id,fecha_venta,cantidad,descuento
1001,1,101,2023-01-15,2,0
1002,2,102,2023-01-18,1,10
1003,3,103,2023-02-10,3,5`
    }
  ],

  weeklyTasks: [
    {
      week: 1,
      title: { es: 'Diseño del pipeline de datos', en: 'Data Pipeline Design', pt: 'Design do Pipeline de Dados' },
      objective: { es: 'Diseñar el recorrido de los datos desde que llegan como CSV hasta que quedan listos para análisis. El objetivo es pensar como un Data Engineer real desde el día 1: entender el proceso antes de automatizarlo.', en: 'Design the data journey from CSV arrival to analysis readiness. The goal is to think like a real Data Engineer from day 1: understand the process before automating it.', pt: 'Projetar o percurso dos dados desde a chegada como CSV até ficarem prontos para análise. O objetivo é pensar como um Data Engineer real desde o dia 1: entender o processo antes de automatizá-lo.' },
      deliverables: [
        { es: 'Diagrama del pipeline (.png, Notion o PDF) mostrando: [CSVs] → [pandas.read_csv + limpieza] → [JOIN tablas] → [Validación] → [Export]', en: 'Pipeline diagram (.png, Notion or PDF) showing: [CSVs] → [pandas.read_csv + cleaning] → [JOIN tables] → [Validation] → [Export]', pt: 'Diagrama do pipeline (.png, Notion ou PDF) mostrando: [CSVs] → [pandas.read_csv + limpeza] → [JOIN tabelas] → [Validação] → [Export]' },
        { es: 'Tabla con herramientas por etapa (Ingesta, Limpieza, Transformación, Validación, Automatización, Output)', en: 'Table with tools per stage (Ingestion, Cleaning, Transformation, Validation, Automation, Output)', pt: 'Tabela com ferramentas por etapa (Ingestão, Limpeza, Transformação, Validação, Automação, Output)' },
        { es: 'Lista de supuestos sobre el sistema (opcional pero pro)', en: 'List of system assumptions (optional but pro)', pt: 'Lista de suposições sobre o sistema (opcional mas pro)' },
        { es: 'Subir a: https://docs.google.com/forms/d/e/1FAIpQLSep2NdMqdMPRHIdE4wOCdUDAbpRySHNNl7KSP_CZJ1aowMuLA/viewform', en: 'Upload to: https://docs.google.com/forms/d/e/1FAIpQLSep2NdMqdMPRHIdE4wOCdUDAbpRySHNNl7KSP_CZJ1aowMuLA/viewform', pt: 'Enviar para: https://docs.google.com/forms/d/e/1FAIpQLSep2NdMqdMPRHIdE4wOCdUDAbpRySHNNl7KSP_CZJ1aowMuLA/viewform' }
      ]
    },
    {
      week: 2,
      title: { es: 'Lectura y limpieza de datos con pandas', en: 'Data Reading and Cleaning with pandas', pt: 'Leitura e Limpeza de Dados com pandas' },
      objective: { es: 'Aplicar las herramientas de Python vistas en clase para hacer una primera limpieza de datos crudos. Errores a detectar: fechas faltantes, cantidad nula, descuento faltante, filas duplicadas.', en: 'Apply Python tools seen in class to perform initial cleaning of raw data. Errors to detect: missing dates, null quantity, missing discount, duplicate rows.', pt: 'Aplicar as ferramentas de Python vistas em aula para fazer uma primeira limpeza de dados brutos. Erros a detectar: datas faltantes, quantidade nula, desconto faltante, linhas duplicadas.' },
      deliverables: [
        { es: 'Script etl_ingesta.py funcional que: lea el archivo original, muestre info básica (df.info(), df.head()), renombre columnas si hace falta, elimine/impute nulos, valide tipos de datos, guarde CSV limpio', en: 'Functional etl_ingesta.py script that: reads original file, shows basic info, renames columns if needed, removes/imputes nulls, validates data types, saves clean CSV', pt: 'Script etl_ingesta.py funcional que: leia o arquivo original, mostre info básica, renomeie colunas se necessário, remova/impute nulos, valide tipos de dados, salve CSV limpo' },
        { es: 'Output generado (ventas_limpio.csv)', en: 'Generated output (ventas_limpio.csv)', pt: 'Output gerado (ventas_limpio.csv)' },
        { es: 'Breve explicación de qué limpiaste y por qué', en: 'Brief explanation of what you cleaned and why', pt: 'Breve explicação do que limpou e por quê' }
      ]
    },
    {
      week: 3,
      title: { es: 'Transformaciones con SQL (DuckDB)', en: 'Transformations with SQL (DuckDB)', pt: 'Transformações com SQL (DuckDB)' },
      objective: { es: 'Aplicar SQL sobre los datos ya limpiados, unir tablas relevantes (ventas, productos, clientes), calcular métricas reales (ingresos, cantidades, descuentos) y preparar la base para el modelo analítico.', en: 'Apply SQL on cleaned data, join relevant tables, calculate real metrics, and prepare base for analytical model.', pt: 'Aplicar SQL sobre os dados já limpos, unir tabelas relevantes, calcular métricas reais e preparar a base para o modelo analítico.' },
      deliverables: [
        { es: 'Archivo transformaciones.sql con: creación de tablas desde CSV, JOINs entre ventas + productos + clientes, cálculo de ingresos (cantidad * precio * (1 - descuento/100)), agrupaciones por cliente/categoría/mes', en: 'transformaciones.sql file with: table creation from CSV, JOINs, revenue calculation, groupings', pt: 'Arquivo transformaciones.sql com: criação de tabelas desde CSV, JOINs, cálculo de receitas, agrupamentos' },
        { es: 'Captura o export de la tabla generada con: cliente_id, categoria, mes, ingresos_totales, cantidad_ventas', en: 'Screenshot or export of generated table with key metrics', pt: 'Captura ou export da tabela gerada com métricas chave' },
        { es: 'Breve descripción: qué hiciste, por qué esa lógica, qué aprendiste', en: 'Brief description: what you did, logic used, what you learned', pt: 'Breve descrição: o que fez, lógica usada, o que aprendeu' }
      ]
    },
    {
      week: 4,
      title: { es: 'Modelado de datos (Esquema Estrella)', en: 'Data Modeling (Star Schema)', pt: 'Modelagem de Dados (Esquema Estrela)' },
      objective: { es: 'Diseñar e implementar un modelo de datos estructurado con enfoque analítico. La tabla fact_ventas contiene los datos medibles, las tablas dimensionales (clientes, productos, fechas) contienen atributos descriptivos.', en: 'Design and implement a structured data model with analytical focus. fact_ventas table contains measurable data, dimensional tables contain descriptive attributes.', pt: 'Projetar e implementar um modelo de dados estruturado com foco analítico. A tabela fact_ventas contém dados mensuráveis, as tabelas dimensionais contêm atributos descritivos.' },
      deliverables: [
        { es: 'Archivo .sql con creación de: dim_clientes (cliente_id, nombre, ciudad), dim_productos (producto_id, nombre_producto, categoria, precio), fact_ventas (venta_id, cliente_id, producto_id, fecha_venta, cantidad, descuento, precio, ingreso_total)', en: '.sql file creating dim_clientes, dim_productos, fact_ventas', pt: 'Arquivo .sql criando dim_clientes, dim_productos, fact_ventas' },
        { es: 'Captura de las 3 tablas resultantes', en: 'Screenshot of the 3 resulting tables', pt: 'Captura das 3 tabelas resultantes' },
        { es: 'Diagrama visual en Miro o Notion mostrando relaciones (opcional)', en: 'Visual diagram in Miro or Notion showing relationships (optional)', pt: 'Diagrama visual no Miro ou Notion mostrando relacionamentos (opcional)' },
        { es: 'Breve descripción: ¿Qué tabla contiene los hechos? ¿Qué métricas podrías sacar?', en: 'Brief description: Which table contains facts? What metrics could you extract?', pt: 'Breve descrição: Qual tabela contém os fatos? Que métricas você poderia extrair?' }
      ]
    },
    {
      week: 5,
      title: { es: 'Automatización del pipeline', en: 'Pipeline Automation', pt: 'Automação do Pipeline' },
      objective: { es: 'Automatizar la ejecución del pipeline que ya venís construyendo: ingesta → limpieza → transformación → validación → export. Escribir un script que ejecute todo con logs y que se pueda correr periódicamente.', en: 'Automate execution of the pipeline you\'ve been building. Write a script that runs everything with logs and can be scheduled.', pt: 'Automatizar a execução do pipeline que você vem construindo. Escrever um script que execute tudo com logs e possa ser agendado.' },
      deliverables: [
        { es: 'Script run_pipeline.py funcional y comentado que: ejecute cada etapa con subprocess, guarde logs con timestamps, maneje errores con try/except', en: 'Functional run_pipeline.py script that executes each stage with subprocess, saves logs, handles errors', pt: 'Script run_pipeline.py funcional que execute cada etapa com subprocess, salve logs, trate erros' },
        { es: 'Log generado (logs/pipeline.log) con mensajes como: ✔ Ingesta completada, ✔ Transformación completada', en: 'Generated log (logs/pipeline.log) with success messages', pt: 'Log gerado (logs/pipeline.log) com mensagens de sucesso' },
        { es: 'Captura o salida con los resultados', en: 'Screenshot or output with results', pt: 'Captura ou saída com os resultados' },
        { es: '(Opcional) Agendarlo con cron y mostrar el crontab', en: '(Optional) Schedule with cron and show crontab', pt: '(Opcional) Agendar com cron e mostrar o crontab' }
      ]
    },
    {
      week: 6,
      title: { es: 'Validación de calidad de datos', en: 'Data Quality Validation', pt: 'Validação de Qualidade de Dados' },
      objective: { es: 'Incorporar validaciones automáticas dentro del pipeline para detectar: valores nulos, duplicados, fechas futuras, tipos incorrectos, valores fuera de rango. Si algo falla, se debe loguear o interrumpir la ejecución.', en: 'Incorporate automatic validations to detect nulls, duplicates, future dates, wrong types. If fails, log or interrupt.', pt: 'Incorporar validações automáticas para detectar nulos, duplicados, datas futuras, tipos errados. Se falhar, logar ou interromper.' },
      deliverables: [
        { es: 'Script validaciones.py funcional con: validación de nulos en campos críticos, validación de fechas (no futuras), validación de rangos (cantidad > 0, descuento 0-100), función validate_data() que retorne True/False y loguee errores', en: 'Functional validaciones.py script with null checks, date validation, range validation, validate_data() function', pt: 'Script validaciones.py funcional com verificações de nulos, validação de datas, faixas, função validate_data()' },
        { es: 'Log generado (logs/validaciones.log)', en: 'Generated log (logs/validaciones.log)', pt: 'Log gerado (logs/validaciones.log)' },
        { es: 'Explicación de qué validaciones implementaste y por qué', en: 'Explanation of implemented validations and why', pt: 'Explicação de quais validações implementou e por quê' }
      ]
    },
    {
      week: 7,
      title: { es: 'Estructura profesional del proyecto', en: 'Professional Project Structure', pt: 'Estrutura Profissional do Projeto' },
      objective: { es: 'Organizar tu pipeline como un proyecto de ingeniería reproducible, modular, versionado y bien documentado. El código sin estructura, sin entorno, sin README y sin control de versiones es simplemente un experimento.', en: 'Organize your pipeline as a reproducible, modular, versioned, and well-documented engineering project.', pt: 'Organizar seu pipeline como um projeto de engenharia reproduzível, modular, versionado e bem documentado.' },
      deliverables: [
        { es: 'Carpeta completa con estructura: /data (CSVs), /outputs (salidas), /logs (logs), /src (scripts Python y SQL), run_pipeline.py, requirements.txt, README.md, .gitignore', en: 'Complete folder structure with data, outputs, logs, src, scripts, config files', pt: 'Pasta completa com estrutura: dados, saídas, logs, src, scripts, arquivos de configuração' },
        { es: 'README funcional: descripción del proyecto, estructura del pipeline, cómo ejecutar, requisitos', en: 'Functional README: project description, pipeline structure, how to run, requirements', pt: 'README funcional: descrição do projeto, estrutura do pipeline, como executar, requisitos' },
        { es: 'requirements.txt generado desde entorno virtual (pip freeze > requirements.txt)', en: 'requirements.txt generated from virtual environment', pt: 'requirements.txt gerado do ambiente virtual' },
        { es: '(Opcional) Repo en GitHub con buen commit inicial', en: '(Optional) GitHub repo with good initial commit', pt: '(Opcional) Repo no GitHub com bom commit inicial' }
      ]
    },
    {
      week: 8,
      title: { es: 'Presentación final del proyecto', en: 'Final Project Presentation', pt: 'Apresentação Final do Projeto' },
      objective: { es: 'Entregar el proyecto completo, funcional y documentado. Demostrar que podés construir un pipeline de datos real, profesional y presentarlo como parte de tu portfolio.', en: 'Deliver complete, functional, documented project. Demonstrate you can build a real, professional data pipeline.', pt: 'Entregar o projeto completo, funcional e documentado. Demonstrar que pode construir um pipeline de dados real e profissional.' },
      deliverables: [
        { es: 'Proyecto completo funcionando: scripts funcionales, validaciones implementadas, estructura clara, automatización completa, logs generados, entorno virtual, documentación clara, output final limpio', en: 'Complete working project with functional scripts, validations, structure, automation, logs, env, docs', pt: 'Projeto completo funcionando com scripts, validações, estrutura, automação, logs, ambiente, documentação' },
        { es: 'Presentación: diagrama del pipeline, carpetas + scripts clave, cómo lo ejecutás, validaciones, qué aprendiste / qué mejorarías', en: 'Presentation: pipeline diagram, folders + key scripts, how to run, validations, learnings', pt: 'Apresentação: diagrama do pipeline, pastas + scripts chave, como executar, validações, aprendizados' },
        { es: 'Opciones de entrega: Presentación en vivo (5-7 min), Video grabado + link (Loom/YouTube), Entrega Notion o PDF con capturas y link a repo', en: 'Delivery options: Live presentation, Recorded video, Notion/PDF with screenshots', pt: 'Opções de entrega: Apresentação ao vivo, Vídeo gravado, Notion/PDF com capturas' }
      ]
    }
  ]
};

// ============================================
// QUICK LINKS
// ============================================
export const bootcampQuickLinks = {
  discord: 'https://discord.gg/jfyqeAMpmk',
  linkedin: 'https://linkedin.com/in/iansaura',
  email: 'iansauradata@gmail.com'
};

// ============================================
// HELPER FUNCTIONS
// ============================================
export function getWeekById(weekId: string): BootcampWeek | undefined {
  return bootcampWeeks.find(w => w.id === weekId);
}

export function getWeekByNumber(weekNumber: number): BootcampWeek | undefined {
  return bootcampWeeks.find(w => w.weekNumber === weekNumber);
}

export function getTotalExercises(): number {
  return bootcampWeeks.reduce((acc, week) => acc + week.exercises.length, 0);
}