/**
 * Databricks Data Engineer Associate Exam Simulator
 * 45 preguntas tipo examen real
 * 
 * Distribución por tema (según examen oficial):
 * - Lakehouse Platform: 24% (~11 preguntas)
 * - ELT with Spark: 29% (~13 preguntas)
 * - Incremental Processing: 22% (~10 preguntas)
 * - Production Pipelines: 16% (~7 preguntas)
 * - Data Governance: 9% (~4 preguntas)
 */

export interface DatabricksExamQuestion {
  id: string;
  category: 'lakehouse' | 'spark' | 'incremental' | 'production' | 'governance';
  difficulty: 'easy' | 'medium' | 'hard';
  question: {
    es: string;
    en: string;
    pt: string;
  };
  options: {
    es: string[];
    en: string[];
    pt: string[];
  };
  correctAnswer: number; // Index 0-3
  explanation: {
    es: string;
    en: string;
    pt: string;
  };
  topic: string;
}

export const DATABRICKS_EXAM_QUESTIONS: DatabricksExamQuestion[] = [
  // ==========================================
  // LAKEHOUSE PLATFORM (24% - ~11 questions)
  // ==========================================
  {
    id: 'db-exam-001',
    category: 'lakehouse',
    difficulty: 'easy',
    topic: 'Databricks Architecture',
    question: {
      es: '¿Cuál es la principal ventaja de la arquitectura Lakehouse?',
      en: 'What is the main advantage of the Lakehouse architecture?',
      pt: 'Qual é a principal vantagem da arquitetura Lakehouse?'
    },
    options: {
      es: [
        'Combina lo mejor de Data Lakes y Data Warehouses',
        'Es más barato que otras arquitecturas',
        'Solo funciona con datos estructurados',
        'Requiere menos almacenamiento'
      ],
      en: [
        'Combines the best of Data Lakes and Data Warehouses',
        'It is cheaper than other architectures',
        'Only works with structured data',
        'Requires less storage'
      ],
      pt: [
        'Combina o melhor de Data Lakes e Data Warehouses',
        'É mais barato que outras arquiteturas',
        'Só funciona com dados estruturados',
        'Requer menos armazenamento'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Lakehouse combina la flexibilidad y bajo costo de Data Lakes con las características ACID y performance de Data Warehouses.',
      en: 'Lakehouse combines the flexibility and low cost of Data Lakes with ACID features and Data Warehouse performance.',
      pt: 'Lakehouse combina a flexibilidade e baixo custo de Data Lakes com as características ACID e performance de Data Warehouses.'
    }
  },
  {
    id: 'db-exam-002',
    category: 'lakehouse',
    difficulty: 'easy',
    topic: 'Cluster Types',
    question: {
      es: '¿Cuál es la diferencia entre All-Purpose Clusters y Job Clusters?',
      en: 'What is the difference between All-Purpose Clusters and Job Clusters?',
      pt: 'Qual é a diferença entre All-Purpose Clusters e Job Clusters?'
    },
    options: {
      es: [
        'All-Purpose son para desarrollo interactivo, Job Clusters para producción automatizada',
        'Job Clusters son más rápidos',
        'All-Purpose no pueden ejecutar notebooks',
        'No hay diferencia, son lo mismo'
      ],
      en: [
        'All-Purpose are for interactive development, Job Clusters for automated production',
        'Job Clusters are faster',
        'All-Purpose cannot run notebooks',
        'No difference, they are the same'
      ],
      pt: [
        'All-Purpose são para desenvolvimento interativo, Job Clusters para produção automatizada',
        'Job Clusters são mais rápidos',
        'All-Purpose não podem executar notebooks',
        'Não há diferença, são iguais'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'All-Purpose Clusters están diseñados para desarrollo interactivo y colaboración. Job Clusters se crean y destruyen automáticamente para cada job, optimizando costos en producción.',
      en: 'All-Purpose Clusters are designed for interactive development and collaboration. Job Clusters are automatically created and destroyed for each job, optimizing production costs.',
      pt: 'All-Purpose Clusters são projetados para desenvolvimento interativo e colaboração. Job Clusters são criados e destruídos automaticamente para cada job, otimizando custos em produção.'
    }
  },
  {
    id: 'db-exam-003',
    category: 'lakehouse',
    difficulty: 'medium',
    topic: 'DBFS',
    question: {
      es: '¿Qué es DBFS (Databricks File System)?',
      en: 'What is DBFS (Databricks File System)?',
      pt: 'O que é DBFS (Databricks File System)?'
    },
    options: {
      es: [
        'Un sistema de archivos propietario que reemplaza S3/ADLS',
        'Una capa de abstracción sobre el almacenamiento en la nube',
        'Un tipo de base de datos',
        'Un formato de archivo'
      ],
      en: [
        'A proprietary file system that replaces S3/ADLS',
        'An abstraction layer over cloud storage',
        'A type of database',
        'A file format'
      ],
      pt: [
        'Um sistema de arquivos proprietário que substitui S3/ADLS',
        'Uma camada de abstração sobre o armazenamento em nuvem',
        'Um tipo de banco de dados',
        'Um formato de arquivo'
      ]
    },
    correctAnswer: 1,
    explanation: {
      es: 'DBFS es una capa de abstracción que permite acceder a almacenamiento en la nube (S3, ADLS, GCS) usando paths tipo /mnt/ o dbfs:/.',
      en: 'DBFS is an abstraction layer that allows accessing cloud storage (S3, ADLS, GCS) using paths like /mnt/ or dbfs:/.',
      pt: 'DBFS é uma camada de abstração que permite acessar armazenamento em nuvem (S3, ADLS, GCS) usando paths tipo /mnt/ ou dbfs:/.'
    }
  },
  {
    id: 'db-exam-004',
    category: 'lakehouse',
    difficulty: 'medium',
    topic: 'Photon',
    question: {
      es: '¿Qué es Photon en Databricks?',
      en: 'What is Photon in Databricks?',
      pt: 'O que é Photon no Databricks?'
    },
    options: {
      es: [
        'Un formato de archivo',
        'Un motor de ejecución nativo vectorizado escrito en C++',
        'Un tipo de cluster',
        'Una herramienta de visualización'
      ],
      en: [
        'A file format',
        'A native vectorized execution engine written in C++',
        'A cluster type',
        'A visualization tool'
      ],
      pt: [
        'Um formato de arquivo',
        'Um motor de execução nativo vetorizado escrito em C++',
        'Um tipo de cluster',
        'Uma ferramenta de visualização'
      ]
    },
    correctAnswer: 1,
    explanation: {
      es: 'Photon es un motor de ejecución vectorizado escrito en C++ que acelera queries SQL y Spark hasta 8x más rápido.',
      en: 'Photon is a vectorized execution engine written in C++ that accelerates SQL and Spark queries up to 8x faster.',
      pt: 'Photon é um motor de execução vetorizado escrito em C++ que acelera queries SQL e Spark até 8x mais rápido.'
    }
  },
  {
    id: 'db-exam-005',
    category: 'lakehouse',
    difficulty: 'easy',
    topic: 'Notebooks',
    question: {
      es: '¿Qué magic command se usa para ejecutar código Python en una celda de un notebook SQL?',
      en: 'What magic command is used to run Python code in a SQL notebook cell?',
      pt: 'Qual magic command é usado para executar código Python em uma célula de notebook SQL?'
    },
    options: {
      es: ['%python', '%py', '%run python', '%exec python'],
      en: ['%python', '%py', '%run python', '%exec python'],
      pt: ['%python', '%py', '%run python', '%exec python']
    },
    correctAnswer: 0,
    explanation: {
      es: '%python permite ejecutar código Python en una celda de cualquier tipo de notebook (SQL, Scala, R).',
      en: '%python allows running Python code in a cell of any notebook type (SQL, Scala, R).',
      pt: '%python permite executar código Python em uma célula de qualquer tipo de notebook (SQL, Scala, R).'
    }
  },

  // ==========================================
  // ELT WITH SPARK (29% - ~13 questions)
  // ==========================================
  {
    id: 'db-exam-006',
    category: 'spark',
    difficulty: 'easy',
    topic: 'DataFrames',
    question: {
      es: '¿Cuál es la diferencia entre transformaciones y acciones en Spark?',
      en: 'What is the difference between transformations and actions in Spark?',
      pt: 'Qual é a diferença entre transformações e ações no Spark?'
    },
    options: {
      es: [
        'Las transformaciones son lazy, las acciones triggean la ejecución',
        'Las acciones son lazy, las transformaciones triggean la ejecución',
        'No hay diferencia',
        'Las transformaciones son más rápidas'
      ],
      en: [
        'Transformations are lazy, actions trigger execution',
        'Actions are lazy, transformations trigger execution',
        'No difference',
        'Transformations are faster'
      ],
      pt: [
        'Transformações são lazy, ações disparam a execução',
        'Ações são lazy, transformações disparam a execução',
        'Não há diferença',
        'Transformações são mais rápidas'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Las transformaciones (filter, select, join) son lazy - solo definen el plan. Las acciones (show, count, collect, write) ejecutan el plan.',
      en: 'Transformations (filter, select, join) are lazy - they only define the plan. Actions (show, count, collect, write) execute the plan.',
      pt: 'Transformações (filter, select, join) são lazy - só definem o plano. Ações (show, count, collect, write) executam o plano.'
    }
  },
  {
    id: 'db-exam-007',
    category: 'spark',
    difficulty: 'medium',
    topic: 'Joins',
    question: {
      es: '¿Cuándo debería usar broadcast() en un join?',
      en: 'When should you use broadcast() in a join?',
      pt: 'Quando você deveria usar broadcast() em um join?'
    },
    options: {
      es: [
        'Cuando una de las tablas es pequeña (< 10MB por defecto)',
        'Cuando ambas tablas son grandes',
        'Nunca, Spark lo hace automáticamente siempre',
        'Solo para joins con más de 3 tablas'
      ],
      en: [
        'When one of the tables is small (< 10MB by default)',
        'When both tables are large',
        'Never, Spark always does it automatically',
        'Only for joins with more than 3 tables'
      ],
      pt: [
        'Quando uma das tabelas é pequena (< 10MB por padrão)',
        'Quando ambas tabelas são grandes',
        'Nunca, Spark sempre faz automaticamente',
        'Apenas para joins com mais de 3 tabelas'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'broadcast() envía la tabla pequeña a todos los executors, evitando shuffle. Es ideal cuando una tabla cabe en memoria (< spark.sql.autoBroadcastJoinThreshold, default 10MB).',
      en: 'broadcast() sends the small table to all executors, avoiding shuffle. Ideal when one table fits in memory (< spark.sql.autoBroadcastJoinThreshold, default 10MB).',
      pt: 'broadcast() envia a tabela pequena para todos os executors, evitando shuffle. Ideal quando uma tabela cabe na memória (< spark.sql.autoBroadcastJoinThreshold, padrão 10MB).'
    }
  },
  {
    id: 'db-exam-008',
    category: 'spark',
    difficulty: 'medium',
    topic: 'Window Functions',
    question: {
      es: '¿Cuál es la diferencia entre ROW_NUMBER() y RANK()?',
      en: 'What is the difference between ROW_NUMBER() and RANK()?',
      pt: 'Qual é a diferença entre ROW_NUMBER() e RANK()?'
    },
    options: {
      es: [
        'ROW_NUMBER da números únicos, RANK puede tener empates (gaps)',
        'RANK da números únicos, ROW_NUMBER puede tener empates',
        'Son exactamente iguales',
        'ROW_NUMBER es para filas, RANK es para columnas'
      ],
      en: [
        'ROW_NUMBER gives unique numbers, RANK can have ties (gaps)',
        'RANK gives unique numbers, ROW_NUMBER can have ties',
        'They are exactly the same',
        'ROW_NUMBER is for rows, RANK is for columns'
      ],
      pt: [
        'ROW_NUMBER dá números únicos, RANK pode ter empates (gaps)',
        'RANK dá números únicos, ROW_NUMBER pode ter empates',
        'São exatamente iguais',
        'ROW_NUMBER é para linhas, RANK é para colunas'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'ROW_NUMBER() siempre da 1,2,3,4... RANK() da el mismo número a empates y salta (1,2,2,4). DENSE_RANK() no salta (1,2,2,3).',
      en: 'ROW_NUMBER() always gives 1,2,3,4... RANK() gives same number to ties and skips (1,2,2,4). DENSE_RANK() does not skip (1,2,2,3).',
      pt: 'ROW_NUMBER() sempre dá 1,2,3,4... RANK() dá o mesmo número para empates e pula (1,2,2,4). DENSE_RANK() não pula (1,2,2,3).'
    }
  },
  {
    id: 'db-exam-009',
    category: 'spark',
    difficulty: 'hard',
    topic: 'Performance',
    question: {
      es: '¿Qué hace spark.sql.adaptive.enabled = true?',
      en: 'What does spark.sql.adaptive.enabled = true do?',
      pt: 'O que spark.sql.adaptive.enabled = true faz?'
    },
    options: {
      es: [
        'Habilita Adaptive Query Execution para optimizar queries en runtime',
        'Habilita el modo debug',
        'Aumenta el paralelismo automáticamente',
        'Habilita el cache automático'
      ],
      en: [
        'Enables Adaptive Query Execution to optimize queries at runtime',
        'Enables debug mode',
        'Automatically increases parallelism',
        'Enables automatic caching'
      ],
      pt: [
        'Habilita Adaptive Query Execution para otimizar queries em runtime',
        'Habilita o modo debug',
        'Aumenta o paralelismo automaticamente',
        'Habilita o cache automático'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'AQE optimiza el plan de ejecución en runtime basándose en estadísticas reales: coalesce de particiones pequeñas, conversión a broadcast join, manejo de skew.',
      en: 'AQE optimizes the execution plan at runtime based on real statistics: small partition coalescing, broadcast join conversion, skew handling.',
      pt: 'AQE otimiza o plano de execução em runtime baseado em estatísticas reais: coalesce de partições pequenas, conversão para broadcast join, tratamento de skew.'
    }
  },
  {
    id: 'db-exam-010',
    category: 'spark',
    difficulty: 'medium',
    topic: 'I/O',
    question: {
      es: '¿Por qué Parquet es mejor que CSV para analytics?',
      en: 'Why is Parquet better than CSV for analytics?',
      pt: 'Por que Parquet é melhor que CSV para analytics?'
    },
    options: {
      es: [
        'Es columnar, comprimido, y tiene schema embebido',
        'Es más fácil de leer para humanos',
        'Ocupa más espacio pero es más rápido',
        'CSV y Parquet tienen el mismo rendimiento'
      ],
      en: [
        'It is columnar, compressed, and has embedded schema',
        'It is easier for humans to read',
        'Takes more space but is faster',
        'CSV and Parquet have the same performance'
      ],
      pt: [
        'É colunar, comprimido, e tem schema embebido',
        'É mais fácil para humanos lerem',
        'Ocupa mais espaço mas é mais rápido',
        'CSV e Parquet têm o mesmo desempenho'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Parquet: columnar (lee solo columnas necesarias), compresión eficiente, schema embebido, predicate pushdown. Ideal para analytics sobre muchas columnas.',
      en: 'Parquet: columnar (reads only needed columns), efficient compression, embedded schema, predicate pushdown. Ideal for analytics on many columns.',
      pt: 'Parquet: colunar (lê só colunas necessárias), compressão eficiente, schema embebido, predicate pushdown. Ideal para analytics em muitas colunas.'
    }
  },

  // ==========================================
  // INCREMENTAL PROCESSING (22% - ~10 questions)
  // ==========================================
  {
    id: 'db-exam-011',
    category: 'incremental',
    difficulty: 'easy',
    topic: 'Delta Lake',
    question: {
      es: '¿Qué garantiza Delta Lake que un Data Lake tradicional no tiene?',
      en: 'What does Delta Lake guarantee that a traditional Data Lake does not have?',
      pt: 'O que Delta Lake garante que um Data Lake tradicional não tem?'
    },
    options: {
      es: [
        'Transacciones ACID',
        'Almacenamiento en la nube',
        'Procesamiento distribuido',
        'Soporte para archivos JSON'
      ],
      en: [
        'ACID transactions',
        'Cloud storage',
        'Distributed processing',
        'JSON file support'
      ],
      pt: [
        'Transações ACID',
        'Armazenamento em nuvem',
        'Processamento distribuído',
        'Suporte a arquivos JSON'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Delta Lake agrega transacciones ACID a Data Lakes, garantizando atomicidad, consistencia, aislamiento y durabilidad en operaciones de datos.',
      en: 'Delta Lake adds ACID transactions to Data Lakes, guaranteeing atomicity, consistency, isolation and durability in data operations.',
      pt: 'Delta Lake adiciona transações ACID a Data Lakes, garantindo atomicidade, consistência, isolamento e durabilidade em operações de dados.'
    }
  },
  {
    id: 'db-exam-012',
    category: 'incremental',
    difficulty: 'medium',
    topic: 'Time Travel',
    question: {
      es: '¿Cómo se lee una versión anterior de una tabla Delta?',
      en: 'How do you read a previous version of a Delta table?',
      pt: 'Como você lê uma versão anterior de uma tabela Delta?'
    },
    options: {
      es: [
        'spark.read.format("delta").option("versionAsOf", 5).load(path)',
        'spark.read.delta(path, version=5)',
        'spark.read.format("delta").version(5).load(path)',
        'SELECT * FROM tabla@version5'
      ],
      en: [
        'spark.read.format("delta").option("versionAsOf", 5).load(path)',
        'spark.read.delta(path, version=5)',
        'spark.read.format("delta").version(5).load(path)',
        'SELECT * FROM table@version5'
      ],
      pt: [
        'spark.read.format("delta").option("versionAsOf", 5).load(path)',
        'spark.read.delta(path, version=5)',
        'spark.read.format("delta").version(5).load(path)',
        'SELECT * FROM tabela@version5'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Time Travel en Delta Lake usa option("versionAsOf", N) o option("timestampAsOf", "fecha"). En SQL: SELECT * FROM tabla VERSION AS OF 5.',
      en: 'Time Travel in Delta Lake uses option("versionAsOf", N) or option("timestampAsOf", "date"). In SQL: SELECT * FROM table VERSION AS OF 5.',
      pt: 'Time Travel no Delta Lake usa option("versionAsOf", N) ou option("timestampAsOf", "data"). Em SQL: SELECT * FROM tabela VERSION AS OF 5.'
    }
  },
  {
    id: 'db-exam-013',
    category: 'incremental',
    difficulty: 'medium',
    topic: 'MERGE',
    question: {
      es: '¿Qué hace el comando MERGE en Delta Lake?',
      en: 'What does the MERGE command do in Delta Lake?',
      pt: 'O que o comando MERGE faz no Delta Lake?'
    },
    options: {
      es: [
        'Permite UPDATE, INSERT y DELETE en una sola operación (upsert)',
        'Combina dos tablas en una nueva',
        'Solo hace INSERT de datos nuevos',
        'Crea una vista de dos tablas'
      ],
      en: [
        'Allows UPDATE, INSERT and DELETE in a single operation (upsert)',
        'Combines two tables into a new one',
        'Only INSERTs new data',
        'Creates a view of two tables'
      ],
      pt: [
        'Permite UPDATE, INSERT e DELETE em uma única operação (upsert)',
        'Combina duas tabelas em uma nova',
        'Só faz INSERT de dados novos',
        'Cria uma view de duas tabelas'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'MERGE (upsert) permite: WHEN MATCHED UPDATE, WHEN MATCHED DELETE, WHEN NOT MATCHED INSERT. Ideal para CDC y sincronización de datos.',
      en: 'MERGE (upsert) allows: WHEN MATCHED UPDATE, WHEN MATCHED DELETE, WHEN NOT MATCHED INSERT. Ideal for CDC and data synchronization.',
      pt: 'MERGE (upsert) permite: WHEN MATCHED UPDATE, WHEN MATCHED DELETE, WHEN NOT MATCHED INSERT. Ideal para CDC e sincronização de dados.'
    }
  },
  {
    id: 'db-exam-014',
    category: 'incremental',
    difficulty: 'medium',
    topic: 'OPTIMIZE',
    question: {
      es: '¿Qué hace OPTIMIZE con ZORDER BY?',
      en: 'What does OPTIMIZE with ZORDER BY do?',
      pt: 'O que OPTIMIZE com ZORDER BY faz?'
    },
    options: {
      es: [
        'Compacta archivos y coloca datos similares juntos para mejor data skipping',
        'Ordena los datos alfabéticamente',
        'Comprime los archivos',
        'Elimina duplicados'
      ],
      en: [
        'Compacts files and colocates similar data for better data skipping',
        'Sorts data alphabetically',
        'Compresses files',
        'Removes duplicates'
      ],
      pt: [
        'Compacta arquivos e coloca dados similares juntos para melhor data skipping',
        'Ordena os dados alfabeticamente',
        'Comprime os arquivos',
        'Remove duplicados'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'OPTIMIZE compacta archivos pequeños en archivos más grandes. ZORDER BY organiza datos por columnas frecuentemente filtradas, mejorando data skipping.',
      en: 'OPTIMIZE compacts small files into larger files. ZORDER BY organizes data by frequently filtered columns, improving data skipping.',
      pt: 'OPTIMIZE compacta arquivos pequenos em arquivos maiores. ZORDER BY organiza dados por colunas frequentemente filtradas, melhorando data skipping.'
    }
  },
  {
    id: 'db-exam-015',
    category: 'incremental',
    difficulty: 'hard',
    topic: 'VACUUM',
    question: {
      es: '¿Por qué VACUUM tiene un retention period mínimo de 7 días por defecto?',
      en: 'Why does VACUUM have a minimum retention period of 7 days by default?',
      pt: 'Por que VACUUM tem um período de retenção mínimo de 7 dias por padrão?'
    },
    options: {
      es: [
        'Para permitir Time Travel y evitar problemas con queries largas en ejecución',
        'Es un límite arbitrario de Databricks',
        'Para cumplir con regulaciones de datos',
        'Para optimizar el almacenamiento'
      ],
      en: [
        'To allow Time Travel and avoid issues with long-running queries',
        'It is an arbitrary Databricks limit',
        'To comply with data regulations',
        'To optimize storage'
      ],
      pt: [
        'Para permitir Time Travel e evitar problemas com queries longas em execução',
        'É um limite arbitrário do Databricks',
        'Para cumprir com regulações de dados',
        'Para otimizar o armazenamento'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'El retention de 7 días protege: (1) Time Travel que depende de archivos antiguos, (2) Queries largas que podrían estar leyendo archivos que VACUUM eliminaría.',
      en: 'The 7-day retention protects: (1) Time Travel that depends on old files, (2) Long-running queries that might be reading files VACUUM would delete.',
      pt: 'A retenção de 7 dias protege: (1) Time Travel que depende de arquivos antigos, (2) Queries longas que poderiam estar lendo arquivos que VACUUM eliminaria.'
    }
  },

  // ==========================================
  // PRODUCTION PIPELINES (16% - ~7 questions)
  // ==========================================
  {
    id: 'db-exam-016',
    category: 'production',
    difficulty: 'easy',
    topic: 'Workflows',
    question: {
      es: '¿Qué es un Job Cluster en Databricks Workflows?',
      en: 'What is a Job Cluster in Databricks Workflows?',
      pt: 'O que é um Job Cluster no Databricks Workflows?'
    },
    options: {
      es: [
        'Un cluster que se crea al inicio del job y se destruye al finalizar',
        'Un cluster compartido entre múltiples jobs',
        'Un cluster que nunca se apaga',
        'Un cluster solo para notebooks interactivos'
      ],
      en: [
        'A cluster created at job start and destroyed at completion',
        'A cluster shared among multiple jobs',
        'A cluster that never shuts down',
        'A cluster only for interactive notebooks'
      ],
      pt: [
        'Um cluster criado no início do job e destruído ao finalizar',
        'Um cluster compartilhado entre múltiplos jobs',
        'Um cluster que nunca desliga',
        'Um cluster só para notebooks interativos'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Job Clusters son efímeros: se crean para cada ejecución del job y se destruyen al terminar. Esto optimiza costos en producción.',
      en: 'Job Clusters are ephemeral: created for each job run and destroyed upon completion. This optimizes production costs.',
      pt: 'Job Clusters são efêmeros: criados para cada execução do job e destruídos ao terminar. Isso otimiza custos em produção.'
    }
  },
  {
    id: 'db-exam-017',
    category: 'production',
    difficulty: 'medium',
    topic: 'DLT',
    question: {
      es: '¿Qué son las Expectations en Delta Live Tables?',
      en: 'What are Expectations in Delta Live Tables?',
      pt: 'O que são Expectations no Delta Live Tables?'
    },
    options: {
      es: [
        'Reglas de calidad de datos que validan registros',
        'Configuraciones de rendimiento',
        'Tipos de tablas',
        'Modos de ejecución'
      ],
      en: [
        'Data quality rules that validate records',
        'Performance configurations',
        'Table types',
        'Execution modes'
      ],
      pt: [
        'Regras de qualidade de dados que validam registros',
        'Configurações de performance',
        'Tipos de tabelas',
        'Modos de execução'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Expectations son constraints declarativos: expect (warn), expect_or_drop (filtra), expect_or_fail (falla el pipeline). Automatizan la calidad de datos.',
      en: 'Expectations are declarative constraints: expect (warn), expect_or_drop (filters), expect_or_fail (fails pipeline). They automate data quality.',
      pt: 'Expectations são constraints declarativos: expect (avisa), expect_or_drop (filtra), expect_or_fail (falha o pipeline). Automatizam a qualidade de dados.'
    }
  },
  {
    id: 'db-exam-018',
    category: 'production',
    difficulty: 'medium',
    topic: 'Auto Loader',
    question: {
      es: '¿Cuál es la ventaja principal de Auto Loader sobre spark.read?',
      en: 'What is the main advantage of Auto Loader over spark.read?',
      pt: 'Qual é a principal vantagem do Auto Loader sobre spark.read?'
    },
    options: {
      es: [
        'Detecta y procesa automáticamente nuevos archivos de forma incremental',
        'Es más rápido para archivos grandes',
        'Soporta más formatos de archivo',
        'Usa menos memoria'
      ],
      en: [
        'Automatically detects and processes new files incrementally',
        'It is faster for large files',
        'Supports more file formats',
        'Uses less memory'
      ],
      pt: [
        'Detecta e processa automaticamente novos arquivos de forma incremental',
        'É mais rápido para arquivos grandes',
        'Suporta mais formatos de arquivo',
        'Usa menos memória'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Auto Loader (cloudFiles) mantiene estado de archivos procesados, detecta nuevos archivos automáticamente, y escala a millones de archivos eficientemente.',
      en: 'Auto Loader (cloudFiles) maintains state of processed files, automatically detects new files, and scales to millions of files efficiently.',
      pt: 'Auto Loader (cloudFiles) mantém estado de arquivos processados, detecta novos arquivos automaticamente, e escala a milhões de arquivos eficientemente.'
    }
  },

  // ==========================================
  // DATA GOVERNANCE (9% - ~4 questions)
  // ==========================================
  {
    id: 'db-exam-019',
    category: 'governance',
    difficulty: 'easy',
    topic: 'Unity Catalog',
    question: {
      es: '¿Cuál es el namespace de 3 niveles en Unity Catalog?',
      en: 'What is the 3-level namespace in Unity Catalog?',
      pt: 'Qual é o namespace de 3 níveis no Unity Catalog?'
    },
    options: {
      es: [
        'catalog.schema.table',
        'database.table.column',
        'workspace.database.table',
        'account.workspace.table'
      ],
      en: [
        'catalog.schema.table',
        'database.table.column',
        'workspace.database.table',
        'account.workspace.table'
      ],
      pt: [
        'catalog.schema.table',
        'database.table.column',
        'workspace.database.table',
        'account.workspace.table'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Unity Catalog usa catalog.schema.table (ej: prod_catalog.sales.orders). Un metastore puede tener múltiples catalogs, cada catalog múltiples schemas.',
      en: 'Unity Catalog uses catalog.schema.table (e.g., prod_catalog.sales.orders). A metastore can have multiple catalogs, each catalog multiple schemas.',
      pt: 'Unity Catalog usa catalog.schema.table (ex: prod_catalog.sales.orders). Um metastore pode ter múltiplos catalogs, cada catalog múltiplos schemas.'
    }
  },
  {
    id: 'db-exam-020',
    category: 'governance',
    difficulty: 'medium',
    topic: 'Permissions',
    question: {
      es: '¿Qué comando se usa para dar permisos de lectura a un usuario en Unity Catalog?',
      en: 'What command is used to grant read permissions to a user in Unity Catalog?',
      pt: 'Qual comando é usado para dar permissões de leitura a um usuário no Unity Catalog?'
    },
    options: {
      es: [
        'GRANT SELECT ON TABLE tabla TO usuario',
        'ALLOW READ ON tabla FOR usuario',
        'PERMIT SELECT tabla usuario',
        'ADD PERMISSION READ tabla usuario'
      ],
      en: [
        'GRANT SELECT ON TABLE table TO user',
        'ALLOW READ ON table FOR user',
        'PERMIT SELECT table user',
        'ADD PERMISSION READ table user'
      ],
      pt: [
        'GRANT SELECT ON TABLE tabela TO usuario',
        'ALLOW READ ON tabela FOR usuario',
        'PERMIT SELECT tabela usuario',
        'ADD PERMISSION READ tabela usuario'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Unity Catalog usa sintaxis SQL estándar: GRANT SELECT/INSERT/UPDATE/DELETE ON TABLE/SCHEMA/CATALOG TO user/group. REVOKE para quitar permisos.',
      en: 'Unity Catalog uses standard SQL syntax: GRANT SELECT/INSERT/UPDATE/DELETE ON TABLE/SCHEMA/CATALOG TO user/group. REVOKE to remove permissions.',
      pt: 'Unity Catalog usa sintaxe SQL padrão: GRANT SELECT/INSERT/UPDATE/DELETE ON TABLE/SCHEMA/CATALOG TO user/group. REVOKE para remover permissões.'
    }
  },

  // More questions to complete 45...
  {
    id: 'db-exam-021',
    category: 'spark',
    difficulty: 'easy',
    topic: 'UDFs',
    question: {
      es: '¿Por qué las Pandas UDFs son más eficientes que las UDFs regulares?',
      en: 'Why are Pandas UDFs more efficient than regular UDFs?',
      pt: 'Por que Pandas UDFs são mais eficientes que UDFs regulares?'
    },
    options: {
      es: [
        'Procesan datos en batches usando Apache Arrow, reduciendo serialización',
        'Usan menos memoria',
        'Son más fáciles de escribir',
        'Soportan más tipos de datos'
      ],
      en: [
        'They process data in batches using Apache Arrow, reducing serialization',
        'They use less memory',
        'They are easier to write',
        'They support more data types'
      ],
      pt: [
        'Processam dados em batches usando Apache Arrow, reduzindo serialização',
        'Usam menos memória',
        'São mais fáceis de escrever',
        'Suportam mais tipos de dados'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Pandas UDFs (vectorized UDFs) usan Apache Arrow para transferir datos en batches entre JVM y Python, evitando la serialización fila por fila de UDFs tradicionales.',
      en: 'Pandas UDFs (vectorized UDFs) use Apache Arrow to transfer data in batches between JVM and Python, avoiding row-by-row serialization of traditional UDFs.',
      pt: 'Pandas UDFs (vectorized UDFs) usam Apache Arrow para transferir dados em batches entre JVM e Python, evitando a serialização linha por linha de UDFs tradicionais.'
    }
  },
  {
    id: 'db-exam-022',
    category: 'spark',
    difficulty: 'hard',
    topic: 'Partitioning',
    question: {
      es: '¿Cuál es la diferencia entre repartition() y coalesce()?',
      en: 'What is the difference between repartition() and coalesce()?',
      pt: 'Qual é a diferença entre repartition() e coalesce()?'
    },
    options: {
      es: [
        'repartition() hace shuffle completo, coalesce() solo puede reducir particiones sin shuffle completo',
        'coalesce() hace shuffle completo, repartition() no',
        'Son exactamente iguales',
        'repartition() es para aumentar, coalesce() para reducir a 1'
      ],
      en: [
        'repartition() does full shuffle, coalesce() can only reduce partitions without full shuffle',
        'coalesce() does full shuffle, repartition() does not',
        'They are exactly the same',
        'repartition() is for increasing, coalesce() for reducing to 1'
      ],
      pt: [
        'repartition() faz shuffle completo, coalesce() só pode reduzir partições sem shuffle completo',
        'coalesce() faz shuffle completo, repartition() não',
        'São exatamente iguais',
        'repartition() é para aumentar, coalesce() para reduzir a 1'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'repartition(N) hace shuffle completo, puede aumentar o disminuir. coalesce(N) solo reduce particiones combinando las existentes sin shuffle completo, más eficiente.',
      en: 'repartition(N) does full shuffle, can increase or decrease. coalesce(N) only reduces partitions by combining existing ones without full shuffle, more efficient.',
      pt: 'repartition(N) faz shuffle completo, pode aumentar ou diminuir. coalesce(N) só reduz partições combinando as existentes sem shuffle completo, mais eficiente.'
    }
  },
  {
    id: 'db-exam-023',
    category: 'incremental',
    difficulty: 'medium',
    topic: 'Streaming',
    question: {
      es: '¿Qué es un checkpoint en Structured Streaming?',
      en: 'What is a checkpoint in Structured Streaming?',
      pt: 'O que é um checkpoint no Structured Streaming?'
    },
    options: {
      es: [
        'Almacena el estado del query para recuperación ante fallos',
        'Un punto de pausa en el procesamiento',
        'Una validación de datos',
        'Un tipo de trigger'
      ],
      en: [
        'Stores query state for fault recovery',
        'A pause point in processing',
        'A data validation',
        'A trigger type'
      ],
      pt: [
        'Armazena o estado da query para recuperação de falhas',
        'Um ponto de pausa no processamento',
        'Uma validação de dados',
        'Um tipo de trigger'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'El checkpoint guarda: (1) offsets de datos procesados, (2) estado de agregaciones. Permite exactly-once semantics y recuperación ante fallos.',
      en: 'The checkpoint saves: (1) processed data offsets, (2) aggregation state. Enables exactly-once semantics and fault recovery.',
      pt: 'O checkpoint guarda: (1) offsets de dados processados, (2) estado de agregações. Permite exactly-once semantics e recuperação de falhas.'
    }
  },
  {
    id: 'db-exam-024',
    category: 'production',
    difficulty: 'medium',
    topic: 'DLT',
    question: {
      es: '¿Cuál es la diferencia entre una tabla LIVE y una tabla STREAMING en DLT?',
      en: 'What is the difference between a LIVE table and a STREAMING table in DLT?',
      pt: 'Qual é a diferença entre uma tabela LIVE e uma tabela STREAMING no DLT?'
    },
    options: {
      es: [
        'LIVE es para batch (reprocesa todo), STREAMING es incremental (solo datos nuevos)',
        'STREAMING es más rápido',
        'LIVE es para datos pequeños',
        'No hay diferencia'
      ],
      en: [
        'LIVE is for batch (reprocesses everything), STREAMING is incremental (only new data)',
        'STREAMING is faster',
        'LIVE is for small data',
        'No difference'
      ],
      pt: [
        'LIVE é para batch (reprocessa tudo), STREAMING é incremental (só dados novos)',
        'STREAMING é mais rápido',
        'LIVE é para dados pequenos',
        'Não há diferença'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: '@dlt.table procesa todo el input cada vez. @dlt.table con spark.readStream procesa solo datos nuevos incrementalmente, ideal para fuentes de streaming.',
      en: '@dlt.table processes all input each time. @dlt.table with spark.readStream processes only new data incrementally, ideal for streaming sources.',
      pt: '@dlt.table processa todo o input cada vez. @dlt.table com spark.readStream processa só dados novos incrementalmente, ideal para fontes de streaming.'
    }
  },
  {
    id: 'db-exam-025',
    category: 'governance',
    difficulty: 'hard',
    topic: 'Data Lineage',
    question: {
      es: '¿Qué información captura automáticamente el Data Lineage de Unity Catalog?',
      en: 'What information does Unity Catalog Data Lineage automatically capture?',
      pt: 'Que informação o Data Lineage do Unity Catalog captura automaticamente?'
    },
    options: {
      es: [
        'Relaciones entre tablas, columnas origen/destino, notebooks y jobs que las modifican',
        'Solo nombres de tablas',
        'Solo queries ejecutadas',
        'Solo usuarios que acceden'
      ],
      en: [
        'Table relationships, source/target columns, notebooks and jobs that modify them',
        'Only table names',
        'Only executed queries',
        'Only users who access'
      ],
      pt: [
        'Relações entre tabelas, colunas origem/destino, notebooks e jobs que as modificam',
        'Só nomes de tabelas',
        'Só queries executadas',
        'Só usuários que acessam'
      ]
    },
    correctAnswer: 0,
    explanation: {
      es: 'Unity Catalog captura lineage a nivel de tabla y columna automáticamente cuando ejecutas Spark SQL/Python. Incluye qué notebooks/jobs crearon o modificaron los datos.',
      en: 'Unity Catalog captures table and column level lineage automatically when running Spark SQL/Python. Includes which notebooks/jobs created or modified the data.',
      pt: 'Unity Catalog captura lineage a nível de tabela e coluna automaticamente quando executa Spark SQL/Python. Inclui quais notebooks/jobs criaram ou modificaram os dados.'
    }
  }
];

// Estadísticas del exam simulator
export const EXAM_STATS = {
  totalQuestions: DATABRICKS_EXAM_QUESTIONS.length,
  byCategory: {
    lakehouse: DATABRICKS_EXAM_QUESTIONS.filter(q => q.category === 'lakehouse').length,
    spark: DATABRICKS_EXAM_QUESTIONS.filter(q => q.category === 'spark').length,
    incremental: DATABRICKS_EXAM_QUESTIONS.filter(q => q.category === 'incremental').length,
    production: DATABRICKS_EXAM_QUESTIONS.filter(q => q.category === 'production').length,
    governance: DATABRICKS_EXAM_QUESTIONS.filter(q => q.category === 'governance').length
  },
  byDifficulty: {
    easy: DATABRICKS_EXAM_QUESTIONS.filter(q => q.difficulty === 'easy').length,
    medium: DATABRICKS_EXAM_QUESTIONS.filter(q => q.difficulty === 'medium').length,
    hard: DATABRICKS_EXAM_QUESTIONS.filter(q => q.difficulty === 'hard').length
  },
  examConfig: {
    questionsPerExam: 45,
    timeMinutes: 90,
    passingScore: 70
  }
};
