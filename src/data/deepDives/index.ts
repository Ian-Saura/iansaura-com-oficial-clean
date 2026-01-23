import { DeepDiveContent, RoadmapDeepDiveMapping } from '../../types/deepDives';

// ============================================
// DEEP DIVES - Catálogo de contenido profundo
// ============================================
// Contenido teórico-académico OPCIONAL que complementa el roadmap
// Para quienes quieren entender el "por qué", no solo el "cómo"

export const deepDives: DeepDiveContent[] = [
  // ============================================
  // LEVEL 1 - FUNDAMENTOS
  // ============================================
  {
    id: 'deep-python-fundamentals',
    title: { 
      es: 'Python: First Principles', 
      en: 'Python: First Principles', 
      pt: 'Python: Primeiros Princípios' 
    },
    subtitle: { 
      es: 'Modelo de ejecución, memoria y por qué Python funciona así', 
      en: 'Execution model, memory and why Python works this way', 
      pt: 'Modelo de execução, memória e por que Python funciona assim' 
    },
    category: 'python',
    icon: '🐍',
    color: 'emerald',
    readingTime: '45 min',
    difficulty: 'foundational',
    contentPath: 'level1/01-python-fundamentals.md',
    tags: [
      { es: 'Interpretado', en: 'Interpreted', pt: 'Interpretado' },
      { es: 'GIL', en: 'GIL', pt: 'GIL' },
      { es: 'Memoria', en: 'Memory', pt: 'Memória' },
      { es: 'Bytecode', en: 'Bytecode', pt: 'Bytecode' }
    ],
    keyReferences: [
      { title: 'Fluent Python', author: 'Luciano Ramalho', type: 'book' },
      { title: 'CPython Internals', author: 'Anthony Shaw', type: 'book' },
      { title: 'Python Data Model', author: 'Python.org', type: 'documentation' }
    ],
    complementsPhases: ['l1-python', 'l0-python-inicio', 'l0-python-funciones'],
    xpBonus: 50
  },
  {
    id: 'deep-pandas-vectorization',
    title: { 
      es: 'Pandas: Vectorización y Performance', 
      en: 'Pandas: Vectorization and Performance', 
      pt: 'Pandas: Vetorização e Performance' 
    },
    subtitle: { 
      es: 'Por qué los loops son lentos y cómo pensar en arrays', 
      en: 'Why loops are slow and how to think in arrays', 
      pt: 'Por que loops são lentos e como pensar em arrays' 
    },
    category: 'pandas',
    icon: '🐼',
    color: 'blue',
    readingTime: '60 min',
    difficulty: 'intermediate',
    contentPath: 'level1/02-pandas-data-manipulation.md',
    tags: [
      { es: 'NumPy', en: 'NumPy', pt: 'NumPy' },
      { es: 'SIMD', en: 'SIMD', pt: 'SIMD' },
      { es: 'Vectorización', en: 'Vectorization', pt: 'Vetorização' }
    ],
    keyReferences: [
      { title: 'Python for Data Analysis', author: 'Wes McKinney', type: 'book' },
      { title: 'High Performance Python', author: 'Gorelick & Ozsvald', type: 'book' }
    ],
    complementsPhases: ['l1-python', 'l1-pandas-adv'],
    prerequisites: ['deep-python-fundamentals'],
    xpBonus: 60
  },
  {
    id: 'deep-sql-fundamentals',
    title: { 
      es: 'SQL: Álgebra Relacional', 
      en: 'SQL: Relational Algebra', 
      pt: 'SQL: Álgebra Relacional' 
    },
    subtitle: { 
      es: 'La teoría matemática detrás de cada query', 
      en: 'The mathematical theory behind every query', 
      pt: 'A teoria matemática por trás de cada query' 
    },
    category: 'sql',
    icon: '🗃️',
    color: 'cyan',
    readingTime: '50 min',
    difficulty: 'foundational',
    contentPath: 'level1/03-sql-fundamentals.md',
    tags: [
      { es: 'Codd', en: 'Codd', pt: 'Codd' },
      { es: 'Normalización', en: 'Normalization', pt: 'Normalização' },
      { es: 'ACID', en: 'ACID', pt: 'ACID' }
    ],
    keyReferences: [
      { title: 'A Relational Model of Data for Large Shared Data Banks', author: 'E.F. Codd', type: 'paper' },
      { title: 'Database Internals', author: 'Alex Petrov', type: 'book' }
    ],
    complementsPhases: ['l1-sql', 'l0-sql-intro', 'l0-sql-comandos'],
    xpBonus: 50
  },
  {
    id: 'deep-sql-advanced',
    title: { 
      es: 'SQL Avanzado: Query Optimization', 
      en: 'Advanced SQL: Query Optimization', 
      pt: 'SQL Avançado: Otimização de Queries' 
    },
    subtitle: { 
      es: 'EXPLAIN ANALYZE, índices y cómo piensa el query planner', 
      en: 'EXPLAIN ANALYZE, indexes and how the query planner thinks', 
      pt: 'EXPLAIN ANALYZE, índices e como o query planner pensa' 
    },
    category: 'sql',
    icon: '⚡',
    color: 'purple',
    readingTime: '75 min',
    difficulty: 'advanced',
    contentPath: 'level1/04-sql-advanced.md',
    tags: [
      { es: 'Window Functions', en: 'Window Functions', pt: 'Window Functions' },
      { es: 'CTEs', en: 'CTEs', pt: 'CTEs' },
      { es: 'Query Plans', en: 'Query Plans', pt: 'Query Plans' }
    ],
    keyReferences: [
      { title: 'The Art of PostgreSQL', author: 'Dimitri Fontaine', type: 'book' },
      { title: 'SQL Performance Explained', author: 'Markus Winand', type: 'book' }
    ],
    complementsPhases: ['l1-sql', 'l0-sql-intro', 'l0-sql-comandos'],
    prerequisites: ['deep-sql-fundamentals'],
    xpBonus: 75
  },
  {
    id: 'deep-git-internals',
    title: { 
      es: 'Git: El Modelo DAG', 
      en: 'Git: The DAG Model', 
      pt: 'Git: O Modelo DAG' 
    },
    subtitle: { 
      es: 'Content-addressable storage y cómo Git realmente funciona', 
      en: 'Content-addressable storage and how Git really works', 
      pt: 'Content-addressable storage e como Git realmente funciona' 
    },
    category: 'git',
    icon: '📦',
    color: 'orange',
    readingTime: '40 min',
    difficulty: 'intermediate',
    contentPath: 'level1/05-git-version-control.md',
    tags: [
      { es: 'DAG', en: 'DAG', pt: 'DAG' },
      { es: 'SHA-1', en: 'SHA-1', pt: 'SHA-1' },
      { es: 'Objects', en: 'Objects', pt: 'Objects' }
    ],
    keyReferences: [
      { title: 'Pro Git', author: 'Scott Chacon', type: 'book' },
      { title: 'Git Internals', author: 'Git Documentation', type: 'documentation' }
    ],
    complementsPhases: ['l1-git', 'l0-git'],
    xpBonus: 40
  },
  {
    id: 'deep-apis-protocols',
    title: { 
      es: 'APIs: HTTP y Protocolos', 
      en: 'APIs: HTTP and Protocols', 
      pt: 'APIs: HTTP e Protocolos' 
    },
    subtitle: { 
      es: 'REST, GraphQL, gRPC y cuándo usar cada uno', 
      en: 'REST, GraphQL, gRPC and when to use each', 
      pt: 'REST, GraphQL, gRPC e quando usar cada um' 
    },
    category: 'apis',
    icon: '🌐',
    color: 'teal',
    readingTime: '55 min',
    difficulty: 'intermediate',
    contentPath: 'level1/06-apis-json.md',
    tags: [
      { es: 'REST', en: 'REST', pt: 'REST' },
      { es: 'HTTP/2', en: 'HTTP/2', pt: 'HTTP/2' },
      { es: 'Serialización', en: 'Serialization', pt: 'Serialização' }
    ],
    keyReferences: [
      { title: 'RESTful Web APIs', author: "Richardson & Ruby", type: 'book' },
      { title: 'HTTP/2 in Action', author: 'Barry Pollard', type: 'book' }
    ],
    complementsPhases: ['l1-apis'],
    xpBonus: 55
  },
  {
    id: 'deep-docker-containers',
    title: { 
      es: 'Docker: Virtualización de OS', 
      en: 'Docker: OS Virtualization', 
      pt: 'Docker: Virtualização de OS' 
    },
    subtitle: { 
      es: 'Namespaces, cgroups y por qué los contenedores son tan eficientes', 
      en: 'Namespaces, cgroups and why containers are so efficient', 
      pt: 'Namespaces, cgroups e por que containers são tão eficientes' 
    },
    category: 'docker',
    icon: '🐳',
    color: 'blue',
    readingTime: '50 min',
    difficulty: 'intermediate',
    contentPath: 'level1/07-docker-containers.md',
    tags: [
      { es: 'Namespaces', en: 'Namespaces', pt: 'Namespaces' },
      { es: 'cgroups', en: 'cgroups', pt: 'cgroups' },
      { es: 'Layers', en: 'Layers', pt: 'Layers' }
    ],
    keyReferences: [
      { title: 'Docker Deep Dive', author: 'Nigel Poulton', type: 'book' },
      { title: 'Container Security', author: 'Liz Rice', type: 'book' }
    ],
    complementsPhases: ['l1-docker'],
    xpBonus: 50
  },

  // ============================================
  // LEVEL 2 - ESCALA
  // ============================================
  {
    id: 'deep-spark-distributed',
    title: { 
      es: 'Spark: Sistemas Distribuidos', 
      en: 'Spark: Distributed Systems', 
      pt: 'Spark: Sistemas Distribuídos' 
    },
    subtitle: { 
      es: 'MapReduce, shuffles y el arte de procesar petabytes', 
      en: 'MapReduce, shuffles and the art of processing petabytes', 
      pt: 'MapReduce, shuffles e a arte de processar petabytes' 
    },
    category: 'spark',
    icon: '⚡',
    color: 'orange',
    readingTime: '90 min',
    difficulty: 'advanced',
    contentPath: 'level2/01-spark-distributed-processing.md',
    tags: [
      { es: 'MapReduce', en: 'MapReduce', pt: 'MapReduce' },
      { es: 'Shuffles', en: 'Shuffles', pt: 'Shuffles' },
      { es: 'Catalyst', en: 'Catalyst', pt: 'Catalyst' }
    ],
    keyReferences: [
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', type: 'book' },
      { title: 'MapReduce: Simplified Data Processing on Large Clusters', author: 'Dean & Ghemawat', type: 'paper' },
      { title: 'Spark: The Definitive Guide', author: 'Chambers & Zaharia', type: 'book' }
    ],
    complementsPhases: ['l2-spark'],
    prerequisites: ['deep-python-fundamentals', 'deep-pandas-vectorization'],
    xpBonus: 100
  },
  {
    id: 'deep-airflow-orchestration',
    title: { 
      es: 'Airflow: Scheduling y DAGs', 
      en: 'Airflow: Scheduling and DAGs', 
      pt: 'Airflow: Scheduling e DAGs' 
    },
    subtitle: { 
      es: 'Teoría de scheduling, idempotencia y orquestación distribuida', 
      en: 'Scheduling theory, idempotence and distributed orchestration', 
      pt: 'Teoria de scheduling, idempotência e orquestração distribuída' 
    },
    category: 'airflow',
    icon: '🌬️',
    color: 'cyan',
    readingTime: '70 min',
    difficulty: 'advanced',
    contentPath: 'level2/02-airflow-orchestration.md',
    tags: [
      { es: 'DAGs', en: 'DAGs', pt: 'DAGs' },
      { es: 'Idempotencia', en: 'Idempotence', pt: 'Idempotência' },
      { es: 'Scheduling', en: 'Scheduling', pt: 'Scheduling' }
    ],
    keyReferences: [
      { title: 'Data Pipelines with Apache Airflow', author: 'Harenslak & de Ruiter', type: 'book' },
      { title: 'Fundamentals of Data Engineering', author: 'Reis & Housley', type: 'book' }
    ],
    complementsPhases: ['l2-airflow', 'l2-orchestration'],
    prerequisites: ['deep-python-fundamentals'],
    xpBonus: 80
  },

  // ============================================
  // LEVEL 3 - ARQUITECTURA
  // ============================================
  {
    id: 'deep-system-design',
    title: { 
      es: 'System Design: CAP y Trade-offs', 
      en: 'System Design: CAP and Trade-offs', 
      pt: 'System Design: CAP e Trade-offs' 
    },
    subtitle: { 
      es: 'Teoremas fundamentales, patrones de arquitectura y decisiones de diseño', 
      en: 'Fundamental theorems, architecture patterns and design decisions', 
      pt: 'Teoremas fundamentais, padrões de arquitetura e decisões de design' 
    },
    category: 'system-design',
    icon: '🏛️',
    color: 'purple',
    readingTime: '120 min',
    difficulty: 'advanced',
    contentPath: 'level3/01-system-design.md',
    tags: [
      { es: 'CAP Theorem', en: 'CAP Theorem', pt: 'Teorema CAP' },
      { es: 'Consistencia', en: 'Consistency', pt: 'Consistência' },
      { es: 'Sharding', en: 'Sharding', pt: 'Sharding' }
    ],
    keyReferences: [
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', type: 'book' },
      { title: 'Dynamo: Amazon\'s Highly Available Key-value Store', author: 'DeCandia et al.', type: 'paper' },
      { title: 'The Google File System', author: 'Ghemawat et al.', type: 'paper' }
    ],
    complementsPhases: ['l3-architecture', 'l3-system-design'],
    prerequisites: ['deep-spark-distributed'],
    xpBonus: 150
  },

  // ============================================
  // ESPECIALIZACIONES
  // ============================================
  {
    id: 'deep-databricks-lakehouse',
    title: { 
      es: 'Databricks: Arquitectura Lakehouse', 
      en: 'Databricks: Lakehouse Architecture', 
      pt: 'Databricks: Arquitetura Lakehouse' 
    },
    subtitle: { 
      es: 'Delta Lake, Unity Catalog y el futuro del data warehousing', 
      en: 'Delta Lake, Unity Catalog and the future of data warehousing', 
      pt: 'Delta Lake, Unity Catalog e o futuro do data warehousing' 
    },
    category: 'databricks',
    icon: '🔶',
    color: 'orange',
    readingTime: '80 min',
    difficulty: 'advanced',
    contentPath: 'specializations/databricks-fundamentals.md',
    tags: [
      { es: 'Delta Lake', en: 'Delta Lake', pt: 'Delta Lake' },
      { es: 'Lakehouse', en: 'Lakehouse', pt: 'Lakehouse' },
      { es: 'Unity Catalog', en: 'Unity Catalog', pt: 'Unity Catalog' }
    ],
    keyReferences: [
      { title: 'Delta Lake: The Definitive Guide', author: 'Databricks', type: 'book' },
      { title: 'Delta Lake: High-Performance ACID Table Storage over Cloud Object Stores', author: 'Databricks Research', type: 'paper' },
      { title: 'Lakehouse: A New Generation of Open Platforms', author: 'Databricks Research', type: 'paper' }
    ],
    complementsPhases: ['spec-databricks'],
    prerequisites: ['deep-spark-distributed', 'deep-system-design'],
    xpBonus: 100
  },

  // ============================================
  // NUEVOS DEEP DIVES - Marzo 2026
  // ============================================
  {
    id: 'deep-dbt-transformation',
    title: { 
      es: 'dbt: Transformaciones como Código', 
      en: 'dbt: Transformations as Code', 
      pt: 'dbt: Transformações como Código' 
    },
    subtitle: { 
      es: 'El paradigma de Analytics Engineering y ELT moderno', 
      en: 'The Analytics Engineering paradigm and modern ELT', 
      pt: 'O paradigma de Analytics Engineering e ELT moderno' 
    },
    category: 'dbt',
    icon: '🔧',
    color: 'orange',
    readingTime: '65 min',
    difficulty: 'intermediate',
    contentPath: 'level1/08-dbt-fundamentals.md',
    tags: [
      { es: 'Macros', en: 'Macros', pt: 'Macros' },
      { es: 'Tests', en: 'Tests', pt: 'Testes' },
      { es: 'Lineage', en: 'Lineage', pt: 'Linhagem' }
    ],
    keyReferences: [
      { title: 'dbt Documentation', author: 'dbt Labs', type: 'documentation' },
      { title: 'Analytics Engineering Fundamentals', author: 'dbt Labs', type: 'book' }
    ],
    complementsPhases: ['l1-dbt'],
    prerequisites: ['deep-sql-advanced'],
    xpBonus: 65
  },
  {
    id: 'deep-snowflake-architecture',
    title: { 
      es: 'Snowflake: Arquitectura Cloud-Native', 
      en: 'Snowflake: Cloud-Native Architecture', 
      pt: 'Snowflake: Arquitetura Cloud-Native' 
    },
    subtitle: { 
      es: 'Separación de storage y compute, virtual warehouses y optimización', 
      en: 'Storage and compute separation, virtual warehouses and optimization', 
      pt: 'Separação de storage e compute, virtual warehouses e otimização' 
    },
    category: 'snowflake',
    icon: '❄️',
    color: 'cyan',
    readingTime: '70 min',
    difficulty: 'intermediate',
    contentPath: 'level1/09-snowflake-architecture.md',
    tags: [
      { es: 'Micro-partitions', en: 'Micro-partitions', pt: 'Micro-partições' },
      { es: 'Clustering', en: 'Clustering', pt: 'Clustering' },
      { es: 'Time Travel', en: 'Time Travel', pt: 'Time Travel' }
    ],
    keyReferences: [
      { title: 'Snowflake: The Definitive Guide', author: 'Joyce Kay Avila', type: 'book' },
      { title: 'The Snowflake Elastic Data Warehouse', author: 'Dageville et al.', type: 'paper' }
    ],
    complementsPhases: ['l1-snowflake'],
    prerequisites: ['deep-sql-fundamentals'],
    xpBonus: 70
  },
  {
    id: 'deep-data-quality',
    title: { 
      es: 'Data Quality: Frameworks y Testing', 
      en: 'Data Quality: Frameworks and Testing', 
      pt: 'Data Quality: Frameworks e Testing' 
    },
    subtitle: { 
      es: 'Great Expectations, data contracts y calidad como código', 
      en: 'Great Expectations, data contracts and quality as code', 
      pt: 'Great Expectations, contratos de dados e qualidade como código' 
    },
    category: 'data-quality',
    icon: '✅',
    color: 'emerald',
    readingTime: '55 min',
    difficulty: 'intermediate',
    contentPath: 'level2/03-data-quality.md',
    tags: [
      { es: 'Great Expectations', en: 'Great Expectations', pt: 'Great Expectations' },
      { es: 'Data Contracts', en: 'Data Contracts', pt: 'Contratos de Dados' },
      { es: 'Schema Validation', en: 'Schema Validation', pt: 'Validação de Schema' }
    ],
    keyReferences: [
      { title: 'Great Expectations Documentation', author: 'Great Expectations', type: 'documentation' },
      { title: 'Data Quality Fundamentals', author: 'Barr Moses', type: 'book' }
    ],
    complementsPhases: ['l2-quality'],
    prerequisites: ['deep-python-fundamentals'],
    xpBonus: 55
  },
  {
    id: 'deep-data-modeling-kimball',
    title: { 
      es: 'Data Modeling: Kimball vs Inmon', 
      en: 'Data Modeling: Kimball vs Inmon', 
      pt: 'Data Modeling: Kimball vs Inmon' 
    },
    subtitle: { 
      es: 'Modelado dimensional, Star Schema y OBT para analytics moderno', 
      en: 'Dimensional modeling, Star Schema and OBT for modern analytics', 
      pt: 'Modelagem dimensional, Star Schema e OBT para analytics moderno' 
    },
    category: 'data-modeling',
    icon: '📐',
    color: 'purple',
    readingTime: '80 min',
    difficulty: 'intermediate',
    contentPath: 'level2/04-data-modeling.md',
    tags: [
      { es: 'Star Schema', en: 'Star Schema', pt: 'Star Schema' },
      { es: 'Slowly Changing Dimensions', en: 'Slowly Changing Dimensions', pt: 'Slowly Changing Dimensions' },
      { es: 'Fact Tables', en: 'Fact Tables', pt: 'Fact Tables' }
    ],
    keyReferences: [
      { title: 'The Data Warehouse Toolkit', author: 'Ralph Kimball', type: 'book' },
      { title: 'Building the Data Warehouse', author: 'Bill Inmon', type: 'book' }
    ],
    complementsPhases: ['l2-modeling'],
    prerequisites: ['deep-sql-advanced'],
    xpBonus: 80
  },
  {
    id: 'deep-streaming-kafka',
    title: { 
      es: 'Kafka: Streaming en Tiempo Real', 
      en: 'Kafka: Real-Time Streaming', 
      pt: 'Kafka: Streaming em Tempo Real' 
    },
    subtitle: { 
      es: 'Event sourcing, exactly-once y arquitecturas event-driven', 
      en: 'Event sourcing, exactly-once and event-driven architectures', 
      pt: 'Event sourcing, exactly-once e arquiteturas event-driven' 
    },
    category: 'streaming',
    icon: '📡',
    color: 'amber',
    readingTime: '85 min',
    difficulty: 'advanced',
    contentPath: 'level2/05-kafka-streaming.md',
    tags: [
      { es: 'Kafka Streams', en: 'Kafka Streams', pt: 'Kafka Streams' },
      { es: 'Event Sourcing', en: 'Event Sourcing', pt: 'Event Sourcing' },
      { es: 'CQRS', en: 'CQRS', pt: 'CQRS' }
    ],
    keyReferences: [
      { title: 'Kafka: The Definitive Guide', author: 'Narkhede, Shapira & Palino', type: 'book' },
      { title: 'Designing Event-Driven Systems', author: 'Ben Stopford', type: 'book' }
    ],
    complementsPhases: ['l2-streaming'],
    prerequisites: ['deep-system-design'],
    xpBonus: 85
  },
  {
    id: 'deep-cloud-architecture',
    title: { 
      es: 'Cloud Architecture: Patrones para Data', 
      en: 'Cloud Architecture: Patterns for Data', 
      pt: 'Cloud Architecture: Padrões para Dados' 
    },
    subtitle: { 
      es: 'Multi-cloud, serverless, y cost optimization para pipelines', 
      en: 'Multi-cloud, serverless, and cost optimization for pipelines', 
      pt: 'Multi-cloud, serverless e otimização de custos para pipelines' 
    },
    category: 'cloud',
    icon: '☁️',
    color: 'blue',
    readingTime: '75 min',
    difficulty: 'advanced',
    contentPath: 'level2/06-cloud-architecture.md',
    tags: [
      { es: 'Serverless', en: 'Serverless', pt: 'Serverless' },
      { es: 'FinOps', en: 'FinOps', pt: 'FinOps' },
      { es: 'Multi-Cloud', en: 'Multi-Cloud', pt: 'Multi-Cloud' }
    ],
    keyReferences: [
      { title: 'Cloud Architecture Patterns', author: 'Bill Wilder', type: 'book' },
      { title: 'Fundamentals of Data Engineering', author: 'Reis & Housley', type: 'book' }
    ],
    complementsPhases: ['l2-cloud', 'l1-aws'],
    prerequisites: ['deep-docker-containers'],
    xpBonus: 75
  },
  {
    id: 'deep-technical-leadership',
    title: { 
      es: 'Technical Leadership: Staff+ Engineering', 
      en: 'Technical Leadership: Staff+ Engineering', 
      pt: 'Technical Leadership: Staff+ Engineering' 
    },
    subtitle: { 
      es: 'Influence without authority, tech strategy y arquitectura organizacional', 
      en: 'Influence without authority, tech strategy and organizational architecture', 
      pt: 'Influência sem autoridade, estratégia técnica e arquitetura organizacional' 
    },
    category: 'leadership',
    icon: '👑',
    color: 'rose',
    readingTime: '60 min',
    difficulty: 'advanced',
    contentPath: 'level3/02-technical-leadership.md',
    tags: [
      { es: 'Staff Engineer', en: 'Staff Engineer', pt: 'Staff Engineer' },
      { es: 'Tech Strategy', en: 'Tech Strategy', pt: 'Tech Strategy' },
      { es: 'Mentorship', en: 'Mentorship', pt: 'Mentoria' }
    ],
    keyReferences: [
      { title: 'Staff Engineer', author: 'Will Larson', type: 'book' },
      { title: 'The Manager\'s Path', author: 'Camille Fournier', type: 'book' },
      { title: 'An Elegant Puzzle', author: 'Will Larson', type: 'book' }
    ],
    complementsPhases: ['l3-leadership'],
    prerequisites: ['deep-system-design'],
    xpBonus: 60
  },
  {
    id: 'deep-distributed-systems',
    title: { 
      es: 'Distributed Systems: Consenso y Replicación', 
      en: 'Distributed Systems: Consensus and Replication', 
      pt: 'Sistemas Distribuídos: Consenso e Replicação' 
    },
    subtitle: { 
      es: 'Raft, Paxos, replicación y el problema de los generales bizantinos', 
      en: 'Raft, Paxos, replication and the Byzantine generals problem', 
      pt: 'Raft, Paxos, replicação e o problema dos generais bizantinos' 
    },
    category: 'system-design',
    icon: '🌐',
    color: 'indigo',
    readingTime: '100 min',
    difficulty: 'advanced',
    contentPath: 'level3/03-distributed-systems.md',
    tags: [
      { es: 'Raft', en: 'Raft', pt: 'Raft' },
      { es: 'Paxos', en: 'Paxos', pt: 'Paxos' },
      { es: 'Consensus', en: 'Consensus', pt: 'Consenso' }
    ],
    keyReferences: [
      { title: 'Designing Data-Intensive Applications', author: 'Martin Kleppmann', type: 'book' },
      { title: 'In Search of an Understandable Consensus Algorithm (Raft)', author: 'Ongaro & Ousterhout', type: 'paper' },
      { title: 'The Part-Time Parliament (Paxos)', author: 'Leslie Lamport', type: 'paper' }
    ],
    complementsPhases: ['l3-distributed', 'l3-architecture'],
    prerequisites: ['deep-system-design'],
    xpBonus: 100
  },
  {
    id: 'deep-aws-data-stack',
    title: { 
      es: 'AWS Data Stack: S3, Glue y Redshift', 
      en: 'AWS Data Stack: S3, Glue and Redshift', 
      pt: 'AWS Data Stack: S3, Glue e Redshift' 
    },
    subtitle: { 
      es: 'Arquitectura serverless de datos en AWS y patrones de costo-eficiencia', 
      en: 'Serverless data architecture in AWS and cost-efficiency patterns', 
      pt: 'Arquitetura serverless de dados em AWS e padrões de custo-eficiência' 
    },
    category: 'aws',
    icon: '☁️',
    color: 'amber',
    readingTime: '90 min',
    difficulty: 'advanced',
    contentPath: 'specializations/aws-data-stack.md',
    tags: [
      { es: 'S3', en: 'S3', pt: 'S3' },
      { es: 'Glue', en: 'Glue', pt: 'Glue' },
      { es: 'Redshift', en: 'Redshift', pt: 'Redshift' },
      { es: 'Athena', en: 'Athena', pt: 'Athena' }
    ],
    keyReferences: [
      { title: 'AWS Well-Architected Framework', author: 'AWS', type: 'whitepaper' },
      { title: 'Data Engineering on AWS', author: 'Gareth Eagar', type: 'book' },
      { title: 'Amazon Redshift Engineering Documentation', author: 'AWS', type: 'documentation' }
    ],
    complementsPhases: ['spec-aws', 'l1-aws'],
    prerequisites: ['deep-cloud-architecture'],
    xpBonus: 90
  }
];

// ============================================
// MAPEO: Fases del Roadmap → Deep Dives
// ============================================
// Conecta las fases del roadmap con el contenido profundo relevante

export const roadmapToDeepDive: RoadmapDeepDiveMapping[] = [
  // ============================================
  // LEVEL 0 - FUNDAMENTOS
  // ============================================
  { phaseId: 'l0-python-inicio', deepDiveIds: ['deep-python-fundamentals'] },
  { phaseId: 'l0-python-variables', deepDiveIds: ['deep-python-fundamentals'] },
  { phaseId: 'l0-python-listas', deepDiveIds: ['deep-python-fundamentals'] },
  { phaseId: 'l0-python-if', deepDiveIds: ['deep-python-fundamentals'] },
  { phaseId: 'l0-python-for', deepDiveIds: ['deep-python-fundamentals'] },
  { phaseId: 'l0-python-funciones', deepDiveIds: ['deep-python-fundamentals'] },
  { phaseId: 'l0-python-diccionarios', deepDiveIds: ['deep-python-fundamentals'] },
  { phaseId: 'l0-sql-intro', deepDiveIds: ['deep-sql-fundamentals'] },
  { phaseId: 'l0-sql-comandos', deepDiveIds: ['deep-sql-fundamentals'] },
  { phaseId: 'l0-sql-groupby', deepDiveIds: ['deep-sql-fundamentals', 'deep-sql-advanced'] },
  { phaseId: 'l0-sql-joins', deepDiveIds: ['deep-sql-fundamentals', 'deep-sql-advanced'] },
  { phaseId: 'l0-git', deepDiveIds: ['deep-git-internals'] },
  
  // ============================================
  // LEVEL 1 - BASES SÓLIDAS
  // ============================================
  { phaseId: 'l1-python', deepDiveIds: ['deep-python-fundamentals', 'deep-pandas-vectorization'] },
  { phaseId: 'l1-pandas-adv', deepDiveIds: ['deep-pandas-vectorization'] },
  { phaseId: 'l1-sql', deepDiveIds: ['deep-sql-fundamentals'] },
  { phaseId: 'l1-sql-adv', deepDiveIds: ['deep-sql-advanced'] },
  { phaseId: 'l1-git', deepDiveIds: ['deep-git-internals'] },
  { phaseId: 'l1-apis', deepDiveIds: ['deep-apis-protocols'] },
  { phaseId: 'l1-docker', deepDiveIds: ['deep-docker-containers'] },
  { phaseId: 'l1-aws', deepDiveIds: ['deep-cloud-architecture', 'deep-aws-data-stack'] },
  { phaseId: 'l1-snowflake', deepDiveIds: ['deep-snowflake-architecture'] },
  { phaseId: 'l1-dbt', deepDiveIds: ['deep-dbt-transformation'] },
  
  // ============================================
  // LEVEL 2 - ESCALA (IDs a verificar cuando se cree)
  // ============================================
  { phaseId: 'l2-spark', deepDiveIds: ['deep-spark-distributed'] },
  { phaseId: 'l2-airflow', deepDiveIds: ['deep-airflow-orchestration'] },
  { phaseId: 'l2-orchestration', deepDiveIds: ['deep-airflow-orchestration'] },
  { phaseId: 'l2-quality', deepDiveIds: ['deep-data-quality'] },
  { phaseId: 'l2-modeling', deepDiveIds: ['deep-data-modeling-kimball'] },
  { phaseId: 'l2-streaming', deepDiveIds: ['deep-streaming-kafka'] },
  { phaseId: 'l2-cloud', deepDiveIds: ['deep-cloud-architecture'] },
  
  // ============================================
  // LEVEL 3 - LIDERAZGO (IDs a verificar cuando se cree)
  // ============================================
  { phaseId: 'l3-architecture', deepDiveIds: ['deep-system-design', 'deep-distributed-systems'] },
  { phaseId: 'l3-system-design', deepDiveIds: ['deep-system-design', 'deep-distributed-systems'] },
  { phaseId: 'l3-leadership', deepDiveIds: ['deep-technical-leadership'] },
  { phaseId: 'l3-distributed', deepDiveIds: ['deep-distributed-systems'] },
  
  // ============================================
  // ESPECIALIZACIONES
  // ============================================
  { phaseId: 'spec-databricks', deepDiveIds: ['deep-databricks-lakehouse', 'deep-spark-distributed'] },
  { phaseId: 'spec-aws', deepDiveIds: ['deep-aws-data-stack', 'deep-cloud-architecture'] }
];

// Helper: Obtener Deep Dives para una fase específica
export const getDeepDivesForPhase = (phaseId: string): DeepDiveContent[] => {
  const mapping = roadmapToDeepDive.find(m => m.phaseId === phaseId);
  if (!mapping) return [];
  return deepDives.filter(dd => mapping.deepDiveIds.includes(dd.id));
};

// Helper: Obtener Deep Dive por ID
export const getDeepDiveById = (id: string): DeepDiveContent | undefined => {
  return deepDives.find(dd => dd.id === id);
};

// Helper: Obtener todos los Deep Dives por categoría
export const getDeepDivesByCategory = (category: string): DeepDiveContent[] => {
  return deepDives.filter(dd => dd.category === category);
};

// Helper: Obtener Deep Dives por nivel de dificultad
export const getDeepDivesByDifficulty = (difficulty: 'foundational' | 'intermediate' | 'advanced'): DeepDiveContent[] => {
  return deepDives.filter(dd => dd.difficulty === difficulty);
};

// Estadísticas globales
export const DEEP_DIVES_STATS = {
  total: deepDives.length,
  totalReadingTime: deepDives.reduce((acc, dd) => acc + parseInt(dd.readingTime), 0),
  totalXP: deepDives.reduce((acc, dd) => acc + dd.xpBonus, 0),
  byDifficulty: {
    foundational: deepDives.filter(dd => dd.difficulty === 'foundational').length,
    intermediate: deepDives.filter(dd => dd.difficulty === 'intermediate').length,
    advanced: deepDives.filter(dd => dd.difficulty === 'advanced').length
  }
};

