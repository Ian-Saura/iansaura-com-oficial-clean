import { Project } from '../../../types/members';

export const p9SystemDesign: Project = {
  id: 'p9-system-design',
  level: 3,
  title: {
    es: 'Diseño de Sistema: Analytics Platform',
    pt: 'Design de Sistema: Analytics Platform'
  },
  description: {
    es: 'Diseñá una plataforma de analytics como la de Spotify o Netflix. Este es exactamente el tipo de ejercicio que te hacen en entrevistas Senior.',
    pt: 'Projete uma plataforma de analytics como a do Spotify ou Netflix. Este é exatamente o tipo de exercício feito em entrevistas Sênior.'
  },
  difficulty: 'Expert',
  duration: '6-8 horas',
  skills: [
    { es: 'System Design', pt: 'Design de Sistema' },
    { es: 'Arquitectura', pt: 'Arquitetura' },
    { es: 'Escalabilidad', pt: 'Escalabilidade' },
    { es: 'Trade-offs', pt: 'Trade-offs' },
    { es: 'Documentación', pt: 'Documentação' }
  ],
  icon: '🏗️',
  color: 'purple',
  prerequisites: ['p4-data-warehouse', 'p6-airflow-orchestration', 'p5-aws-pipeline'],
  estimatedLines: 50,
  realWorldExample: {
    es: 'Así diseñaron el sistema de analytics de Spotify que procesa 100B+ eventos/día',
    pt: 'Assim projetaram o sistema de analytics do Spotify que processa 100B+ eventos/dia'
  },
  usedBy: ['Spotify', 'Netflix', 'Uber', 'Meta', 'Google'],
  learningObjectives: [
    { es: 'Clarificar requisitos antes de diseñar', pt: 'Clarificar requisitos antes de projetar' },
    { es: 'Estimar escala (back-of-envelope)', pt: 'Estimar escala (back-of-envelope)' },
    { es: 'Diseñar componentes de ingesta, storage, procesamiento', pt: 'Projetar componentes de ingestão, armazenamento, processamento' },
    { es: 'Identificar y comunicar trade-offs', pt: 'Identificar e comunicar trade-offs' },
    { es: 'Considerar operaciones (monitoring, alertas)', pt: 'Considerar operações (monitoramento, alertas)' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'Empezar a diseñar sin clarificar requisitos', pt: 'Começar a projetar sem clarificar requisitos' },
      why: { es: 'Vas a diseñar algo que no resuelve el problema', pt: 'Você vai projetar algo que não resolve o problema' },
      solution: { es: 'Primero: ¿Qué? ¿Para quién? ¿Cuántos usuarios?', pt: 'Primeiro: O quê? Para quem? Quantos usuários?' },
    },
    {
      mistake: { es: 'No estimar escala', pt: 'Não estimar escala' },
      why: { es: 'La solución para 1000 usuarios ≠ 1M usuarios', pt: 'A solução para 1000 usuários ≠ 1M usuários' },
      solution: { es: 'Back-of-envelope: eventos/día, storage/año, queries/segundo', pt: 'Back-of-envelope: eventos/dia, storage/ano, queries/segundo' },
    },
    {
      mistake: { es: 'Ignorar casos de falla', pt: 'Ignorar casos de falha' },
      why: { es: 'En producción, TODO falla eventualmente', pt: 'Em produção, TUDO falha eventualmente' },
      solution: { es: 'Preguntate: ¿Qué pasa si X muere? ¿Cómo recupero?', pt: 'Pergunte-se: O que acontece se X morrer? Como recupero?' },
    },
  ],
  expectedOutputs: [
    {
      step: 5,
      description: { es: 'Diagrama de arquitectura', pt: 'Diagrama de arquitetura' },
      example: `┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Clients   │────▶│    Kafka    │────▶│   Spark     │
│  (SDKs)     │     │  (ingesta)  │     │ (proceso)   │
└─────────────┘     └─────────────┘     └──────┬──────┘
                                               │
                    ┌─────────────┐     ┌──────▼──────┐
                    │   Presto    │◀────│     S3      │
                    │  (queries)  │     │  (storage)  │
                    └──────┬──────┘     └─────────────┘
                           │
                    ┌──────▼──────┐
                    │  Dashboard  │
                    │  (Superset) │
                    └─────────────┘`
    },
  ],
  interviewStory: {
    hook: {
      es: "Diseñé una plataforma de analytics que procesa 100 millones de eventos diarios con latencia sub-segundo para queries.",
      pt: "Projetei uma plataforma de analytics que processa 100 milhões de eventos diários com latência sub-segundo para queries."
    },
    situation: {
      es: "La empresa necesitaba analytics en tiempo real para 50 millones de usuarios. El sistema existente no escalaba y las queries tardaban minutos.",
      pt: "A empresa precisava de analytics em tempo real para 50 milhões de usuários. O sistema existente não escalava e as queries demoravam minutos."
    },
    task: {
      es: "Diseñar una arquitectura de analytics desde cero que soportara la escala actual y 10x de crecimiento.",
      pt: "Projetar uma arquitetura de analytics do zero que suportasse a escala atual e 10x de crescimento."
    },
    actions: [
      { es: "Clarifiqué requisitos: 100M eventos/día, queries en <1s, retención 2 años", pt: "Clarifiquei requisitos: 100M eventos/dia, queries em <1s, retenção 2 anos" },
      { es: "Hice estimaciones back-of-envelope: 1.2KB/evento = 120GB/día = 44TB/año", pt: "Fiz estimativas back-of-envelope: 1.2KB/evento = 120GB/dia = 44TB/ano" },
      { es: "Diseñé ingesta con Kafka para buffering y desacople", pt: "Projetei ingestão com Kafka para buffering e desacoplamento" },
      { es: "Elegí Spark Streaming para procesamiento y S3/Delta Lake para storage", pt: "Escolhi Spark Streaming para processamento e S3/Delta Lake para armazenamento" },
      { es: "Agregué capa de serving con Presto para queries interactivas", pt: "Adicionei camada de serving com Presto para queries interativas" }
    ],
    results: [
      { es: "Sistema en producción procesando 100M+ eventos/día", pt: "Sistema em produção processando 100M+ eventos/dia" },
      { es: "Latencia de queries: p99 < 1 segundo", pt: "Latência de queries: p99 < 1 segundo" },
      { es: "Costo: 60% menos que la solución anterior (Redshift)", pt: "Custo: 60% menos que a solução anterior (Redshift)" },
      { es: "Escalable: el mismo diseño soportaría 1B eventos/día", pt: "Escalável: o mesmo design suportaria 1B eventos/dia" }
    ],
    learnings: [
      { es: "Siempre clarificar requisitos antes de diseñar - el diseño para 1M usuarios ≠ 100M", pt: "Sempre clarificar requisitos antes de projetar - o design para 1M usuários ≠ 100M" },
      { es: "Back-of-envelope calculations son esenciales para no over/under-engineer", pt: "Cálculos back-of-envelope são essenciais para não over/under-engineer" },
      { es: "Los trade-offs son inevitables - hay que comunicarlos claramente", pt: "Os trade-offs são inevitáveis - é preciso comunicá-los claramente" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Por qué Kafka + Spark en vez de solo Kinesis?", pt: "Por que Kafka + Spark em vez de apenas Kinesis?" },
        answer: { es: "Kafka nos da más control: retención configurable, replay, múltiples consumers. Kinesis es más managed pero menos flexible. Para esta escala, el control vale la pena.", pt: "Kafka nos dá mais controle: retenção configurável, replay, múltiplos consumidores. Kinesis é mais gerenciado, mas menos flexível. Para esta escala, o controle vale a pena." }
      },
      {
        question: { es: "¿Cómo manejás el cold start de queries?", pt: "Como você lida com o cold start de queries?" },
        answer: { es: "Pre-agregaciones para queries comunes (cubos OLAP). Las queries ad-hoc van directo a Presto sobre Parquet. Balance entre latencia y flexibilidad.", pt: "Pré-agregações para queries comuns (cubos OLAP). As queries ad-hoc vão direto para Presto sobre Parquet. Balanço entre latência e flexibilidade." }
      },
      {
        question: { es: "¿Qué pasa si Kafka se cae?", pt: "O que acontece se o Kafka cair?" },
        answer: { es: "Kafka es un cluster de 3+ brokers con replicación. Si un broker cae, los otros siguen. Si todo cae, los producers buffean localmente y reintentan. Diseño para fallas.", pt: "Kafka é um cluster de 3+ brokers com replicação. Se um broker cair, os outros continuam. Se tudo cair, os producers fazem buffer localmente e tentam novamente. Design para falhas." }
      }
    ],
    closingStatement: { es: "System Design es el skill que te hace Senior - no es solo código, es entender trade-offs y comunicarlos.", pt: "System Design é a habilidade que te torna Sênior - não é apenas código, é entender trade-offs e comunicá-los." }
  },
  steps: [
    {
      order: 1,
      text: { es: '📋 Clarificá requisitos funcionales', pt: '📋 Clarifique requisitos funcionais' },
      explanation: {
        es: `Antes de diseñar, hacé estas preguntas:

**Funcionales:**
- ¿Qué eventos vamos a trackear? (page views, clicks, purchases)
- ¿Qué queries necesitan los usuarios? (dashboards, ad-hoc, ML)
- ¿Necesitamos real-time o batch está bien?
- ¿Cuánto historial guardamos?

**Ejemplo de respuestas:**
- Trackear: page views, clicks, purchases, searches
- Queries: dashboards diarios, reportes mensuales, ML features
- Latencia: dashboards pueden tener 5 min de delay
- Historial: 2 años`,
        pt: `Antes de projetar, faça estas perguntas:

**Funcionais:**
- Que eventos vamos rastrear? (page views, clicks, purchases)
- Que queries os usuários precisam? (dashboards, ad-hoc, ML)
- Precisamos de real-time ou batch está bom?
- Quanto histórico guardamos?

**Exemplo de respostas:**
- Rastrear: page views, clicks, purchases, searches
- Queries: dashboards diários, relatórios mensais, ML features
- Latência: dashboards podem ter 5 min de delay
- Histórico: 2 anos`
      },
      tip: { es: 'En una entrevista, hacé estas preguntas antes de dibujar nada.', pt: 'Em uma entrevista, faça estas perguntas antes de desenhar qualquer coisa.' },
      checkpoint: { es: '¿Tenés claros los requisitos funcionales?', pt: 'Você tem claros os requisitos funcionais?' }
    },
    {
      order: 2,
      text: { es: '📊 Estimá escala (back-of-envelope)', pt: '📊 Estime a escala (back-of-envelope)' },
      code: `# Estimaciones de escala

## Usuarios
- 10M usuarios activos diarios (DAU)
- Promedio 50 eventos/usuario/día
- Total: 500M eventos/día

## Throughput
- 500M eventos / 86400 segundos = ~6000 eventos/segundo
- Pico (2x promedio) = 12000 eventos/segundo

## Storage
- Tamaño promedio evento: 500 bytes
- Diario: 500M * 500B = 250GB/día
- Anual: 250GB * 365 = ~90TB/año
- 2 años: ~180TB

## Queries
- 100 analistas
- 10 queries/analista/día = 1000 queries/día
- Pico: 100 queries/hora`,
      explanation: { es: 'Back-of-envelope te da orden de magnitud. No necesitás ser exacto.', pt: 'Back-of-envelope te dá ordem de grandeza. Não precisa ser exato.' },
      tip: { es: 'Siempre calculá pico (2-3x promedio) para dimensionar.', pt: 'Sempre calcule o pico (2-3x média) para dimensionar.' }
    },
    {
      order: 3,
      text: { es: '📐 Diseño high-level', pt: '📐 Design high-level' },
      explanation: {
        es: `Dibujá los componentes principales:

\`\`\`
[Clients] → [API Gateway] → [Kafka] → [Flink] → [S3 Data Lake]
                                          ↓
                                    [Spark Jobs]
                                          ↓
                                    [Snowflake DW]
                                          ↓
                                    [Dashboards]
\`\`\`

**Componentes:**
1. **Ingesta**: API Gateway + Kafka (buffer + desacople)
2. **Procesamiento**: Flink (streaming) + Spark (batch)
3. **Storage**: S3 (raw) + Snowflake (analytics)
4. **Serving**: APIs + Dashboards`,
        pt: `Desenhe os componentes principais:

\`\`\`
[Clients] → [API Gateway] → [Kafka] → [Flink] → [S3 Data Lake]
                                          ↓
                                    [Spark Jobs]
                                          ↓
                                    [Snowflake DW]
                                          ↓
                                    [Dashboards]
\`\`\`

**Componentes:**
1. **Ingestão**: API Gateway + Kafka (buffer + desacoplamento)
2. **Processamento**: Flink (streaming) + Spark (batch)
3. **Armazenamento**: S3 (raw) + Snowflake (analytics)
4. **Serving**: APIs + Dashboards`
      },
      checkpoint: { es: '¿Tu diagrama tiene ingesta, procesamiento, storage y serving?', pt: 'Seu diagrama tem ingestão, processamento, armazenamento e serving?' }
    },
    {
      order: 4,
      text: { es: '📥 Deep dive: Ingesta', pt: '📥 Deep dive: Ingestão' },
      explanation: {
        es: `**Decisiones clave:**

1. **¿Por qué Kafka?**
   - Buffer ante picos de tráfico
   - Desacopla productores de consumidores
   - Replay si algo falla
   - Múltiples consumidores

2. **Particionamiento:**
   - Por event_type (para procesamiento paralelo)
   - O por user_id (para ordenamiento por usuario)

3. **Retención:**
   - 7 días en Kafka (para replay)
   - Después va a S3

4. **Schema:**
   - Usar Avro o Protobuf (tipado, evolución)
   - Schema Registry para compatibilidad`,
        pt: `**Decisões chave:**

1. **Por que Kafka?**
   - Buffer ante picos de tráfego
   - Desacopla produtores de consumidores
   - Replay se algo falhar
   - Múltiplos consumidores

2. **Particionamento:**
   - Por event_type (para processamento paralelo)
   - Ou por user_id (para ordenação por usuário)

3. **Retenção:**
   - 7 dias no Kafka (para replay)
   - Depois vai para S3

4. **Schema:**
   - Usar Avro ou Protobuf (tipado, evolução)
   - Schema Registry para compatibilidade`
      },
      tip: { es: 'Siempre justificá por qué elegiste cada tecnología.', pt: 'Sempre justifique por que escolheu cada tecnologia.' }
    },
    {
      order: 5,
      text: { es: '💾 Deep dive: Storage', pt: '💾 Deep dive: Armazenamento' },
      explanation: {
        es: `**Data Lake (S3):**
\`\`\`
s3://analytics-lake/
├── raw/                    # Eventos crudos (Avro)
│   └── events/
│       └── year=2024/month=01/day=15/
├── processed/              # Eventos limpios (Parquet)
│   └── events/
│       └── event_type=page_view/year=2024/
└── aggregated/             # Métricas pre-calculadas
    └── daily_metrics/
\`\`\`

**Data Warehouse (Snowflake):**
- Modelo dimensional (star schema)
- Tablas más consultadas
- Agregaciones pre-calculadas

**Trade-off:** 
- Data Lake: Barato, flexible, lento
- Data Warehouse: Caro, estructurado, rápido`,
        pt: `**Data Lake (S3):**
\`\`\`
s3://analytics-lake/
├── raw/                    # Eventos crus (Avro)
│   └── events/
│       └── year=2024/month=01/day=15/
├── processed/              # Eventos limpos (Parquet)
│   └── events/
│       └── event_type=page_view/year=2024/
└── aggregated/             # Métricas pré-calculadas
    └── daily_metrics/
\`\`\`

**Data Warehouse (Snowflake):**
- Modelo dimensional (star schema)
- Tabelas mais consultadas
- Agregações pré-calculadas

**Trade-off:** 
- Data Lake: Barato, flexível, lento
- Data Warehouse: Caro, estruturado, rápido`
      },
      checkpoint: { es: '¿Explicaste por qué usás Data Lake + Data Warehouse?', pt: 'Explicou por que usa Data Lake + Data Warehouse?' }
    },
    {
      order: 6,
      text: { es: '🔄 Deep dive: Procesamiento', pt: '🔄 Deep dive: Processamento' },
      explanation: {
        es: `**Streaming (Flink):**
- Validación de eventos
- Enriquecimiento (user info, geo)
- Métricas real-time (últimos 5 min)
- Escribir a S3 (raw)

**Batch (Spark):**
- Agregaciones diarias
- Features para ML
- Backfill si hay errores
- Escribir a Snowflake

**Trade-off:**
- Streaming: Baja latencia, más complejo
- Batch: Simple, alta latencia`,
        pt: `**Streaming (Flink):**
- Validação de eventos
- Enriquecimento (user info, geo)
- Métricas real-time (últimos 5 min)
- Escrever para S3 (raw)

**Batch (Spark):**
- Agregações diárias
- Features para ML
- Backfill se houver erros
- Escrever para Snowflake

**Trade-off:**
- Streaming: Baixa latência, mais complexo
- Batch: Simples, alta latência`
      },
      tip: { es: 'Lambda architecture: Streaming + Batch. Kappa: Solo streaming.', pt: 'Arquitetura Lambda: Streaming + Batch. Kappa: Apenas streaming.' }
    },
    {
      order: 7,
      text: { es: '⚖️ Identificá trade-offs', pt: '⚖️ Identifique trade-offs' },
      explanation: {
        es: `**Trade-offs clave:**

1. **Consistencia vs Latencia**
   - Elegimos: Eventual consistency (5 min delay OK)
   - Razón: Dashboards no necesitan real-time

2. **Costo vs Performance**
   - Elegimos: S3 + Snowflake (no todo en Snowflake)
   - Razón: S3 es 10x más barato para storage

3. **Simplicidad vs Flexibilidad**
   - Elegimos: Schema Registry (más setup, menos bugs)
   - Razón: Evita problemas de schema evolution

4. **Compra vs Build**
   - Elegimos: Snowflake (no self-hosted DW)
   - Razón: Menos ops, más caro pero vale la pena`,
        pt: `**Trade-offs chave:**

1. **Consistência vs Latência**
   - Escolhemos: Consistência eventual (5 min delay OK)
   - Razão: Dashboards não precisam de real-time

2. **Custo vs Performance**
   - Escolhemos: S3 + Snowflake (nem tudo no Snowflake)
   - Razão: S3 é 10x mais barato para armazenamento

3. **Simplicidade vs Flexibilidade**
   - Escolhemos: Schema Registry (mais configuração, menos bugs)
   - Razão: Evita problemas de evolução de schema

4. **Comprar vs Construir**
   - Escolhemos: Snowflake (não self-hosted DW)
   - Razão: Menos ops, mais caro mas vale a pena`
      },
      checkpoint: { es: '¿Podés defender cada trade-off?', pt: 'Consegue defender cada trade-off?' }
    },
    {
      order: 8,
      text: { es: '🔒 Seguridad y compliance', pt: '🔒 Segurança e compliance' },
      explanation: {
        es: `**Consideraciones:**

1. **Autenticación**: API keys + OAuth para dashboards
2. **Autorización**: RBAC (roles por equipo)
3. **Encriptación**: 
   - En tránsito: TLS
   - En reposo: S3 SSE, Snowflake encryption
4. **PII**: 
   - Hashear user_id en raw
   - Acceso restringido a datos sensibles
5. **Audit**: Logs de quién accede a qué`,
        pt: `**Considerações:**

1. **Autenticação**: API keys + OAuth para dashboards
2. **Autorização**: RBAC (papéis por equipe)
3. **Criptografia**: 
   - Em trânsito: TLS
   - Em repouso: S3 SSE, Snowflake encryption
4. **PII**: 
   - Hashear user_id em raw
   - Acesso restrito a dados sensíveis
5. **Auditoria**: Logs de quem acessa o quê`
      },
      tip: { es: 'En entrevistas Senior, mencionar seguridad te diferencia.', pt: 'Em entrevistas Sênior, mencionar segurança te diferencia.' }
    },
    {
      order: 9,
      text: { es: '📈 Operaciones y monitoring', pt: '📈 Operações e monitoramento' },
      explanation: {
        es: `**Métricas clave:**
- Ingesta: eventos/segundo, latencia p99
- Procesamiento: jobs fallidos, lag de Kafka
- Storage: GB/día, queries/hora
- Serving: latencia de dashboards

**Alertas:**
- Lag de Kafka > 5 min
- Jobs fallidos > 2 consecutivos
- Latencia p99 > 5s

**Runbooks:**
- Qué hacer si Kafka está laggeado
- Cómo hacer backfill
- Cómo escalar Flink`,
        pt: `**Métricas chave:**
- Ingestão: eventos/segundo, latência p99
- Processamento: jobs falhados, lag do Kafka
- Armazenamento: GB/dia, queries/hora
- Serving: latência de dashboards

**Alertas:**
- Lag do Kafka > 5 min
- Jobs falhados > 2 consecutivos
- Latência p99 > 5s

**Runbooks:**
- O que fazer se Kafka estiver com lag
- Como fazer backfill
- Como escalar Flink`
      },
      checkpoint: { es: '¿Tu diseño incluye cómo operarlo?', pt: 'Seu design inclui como operá-lo?' }
    },
    {
      order: 10,
      text: { es: '📝 Documentá el diseño', pt: '📝 Documente o design' },
      explanation: {
        es: `Creá un documento con:

1. **Resumen ejecutivo**: Qué problema resuelve
2. **Requisitos**: Funcionales y no funcionales
3. **Estimaciones**: Escala y costos
4. **Arquitectura**: Diagrama + explicación
5. **Trade-offs**: Decisiones y justificación
6. **Operaciones**: Monitoring y alertas
7. **Plan de implementación**: Fases

Usá draw.io o Excalidraw para diagramas.`,
        pt: `Crie um documento com:

1. **Resumo executivo**: Que problema resolve
2. **Requisitos**: Funcionais e não funcionais
3. **Estimativas**: Escala e custos
4. **Arquitetura**: Diagrama + explicação
5. **Trade-offs**: Decisões e justificativa
6. **Operações**: Monitoramento e alertas
7. **Plano de implementação**: Fases

Use draw.io ou Excalidraw para diagramas.`
      },
      checkpoint: { es: '¿Alguien puede entender tu diseño sin que lo expliques?', pt: 'Alguém consegue entender seu design sem que você o explique?' }
    },
  ],
  deliverable: { es: 'Documento de diseño completo + diagrama de arquitectura', pt: 'Documento de design completo + diagrama de arquitetura' },
  evaluation: [
    { es: '¿Clarificaste requisitos antes de diseñar?', pt: 'Clarificou requisitos antes de projetar?' },
    { es: '¿Estimaste escala correctamente?', pt: 'Estimou escala corretamente?' },
    { es: '¿Identificaste y justificaste trade-offs?', pt: 'Identificou e justificou trade-offs?' },
    { es: '¿Consideraste operaciones (monitoring, alertas)?', pt: 'Considerou operações (monitoramento, alertas)?' },
    { es: '¿El diseño es realista e implementable?', pt: 'O design é realista e implementável?' },
  ],
  theory: {
    es: `## Framework para System Design

### 1. Clarificar (5 min)
- ¿Qué problema resolvemos?
- ¿Quiénes son los usuarios?
- ¿Qué funcionalidades son críticas?

### 2. Estimar (5 min)
- Usuarios, eventos, storage
- Throughput (eventos/segundo)
- Latencia requerida

### 3. High-level design (10 min)
- Componentes principales
- Flujo de datos
- Tecnologías candidatas

### 4. Deep dive (20 min)
- 2-3 componentes críticos
- Decisiones de diseño
- Trade-offs

### 5. Wrap-up (5 min)
- Resumen de trade-offs
- Puntos de falla
- Cómo escalar

## Tecnologías Comunes

| Componente | Opciones |
|------------|----------|
| Ingesta | Kafka, Kinesis, Pub/Sub |
| Procesamiento | Spark, Flink, dbt |
| Storage | S3, Snowflake, BigQuery |
| Serving | APIs, Dashboards, ML |`,
    pt: `## Framework para System Design

### 1. Clarificar (5 min)
- Que problema resolvemos?
- Quem são os usuários?
- Que funcionalidades são críticas?

### 2. Estimar (5 min)
- Usuários, eventos, armazenamento
- Throughput (eventos/segundo)
- Latência requerida

### 3. High-level design (10 min)
- Componentes principais
- Fluxo de dados
- Tecnologias candidatas

### 4. Deep dive (20 min)
- 2-3 componentes críticos
- Decisões de design
- Trade-offs

### 5. Wrap-up (5 min)
- Resumo de trade-offs
- Pontos de falha
- Como escalar

## Tecnologias Comuns

| Componente | Opções |
|------------|----------|
| Ingestão | Kafka, Kinesis, Pub/Sub |
| Processamento | Spark, Flink, dbt |
| Armazenamento | S3, Snowflake, BigQuery |
| Serving | APIs, Dashboards, ML |`
  },
  nextSteps: [
    { es: 'Practicá con otros escenarios: e-commerce, social media, IoT', pt: 'Pratique com outros cenários: e-commerce, social media, IoT' },
    { es: 'Hacé mock interviews con otros', pt: 'Faça mock interviews com outros' },
    { es: 'Estudiá arquitecturas reales (Netflix, Uber, Spotify)', pt: 'Estude arquiteturas reais (Netflix, Uber, Spotify)' },
  ],
};


