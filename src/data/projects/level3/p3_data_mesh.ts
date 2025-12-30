import { Project } from '../../../types/members';

export const p3DataMesh: Project = {
  id: 'p3-data-mesh',
  level: 3,
  title: {
    es: 'Diseño Data Mesh',
    pt: 'Design Data Mesh'
  },
  description: {
    es: 'Diseñá una arquitectura Data Mesh para una empresa. El paradigma que está reemplazando al Data Warehouse centralizado en empresas grandes.',
    pt: 'Projete uma arquitetura Data Mesh para uma empresa. O paradigma que está substituindo o Data Warehouse centralizado em grandes empresas.'
  },
  difficulty: 'Expert',
  duration: '5-6 horas',
  skills: [
    { es: 'Data Mesh', pt: 'Data Mesh' },
    { es: 'Arquitectura', pt: 'Arquitetura' },
    { es: 'Domain-Driven Design', pt: 'Domain-Driven Design' },
    { es: 'Governance', pt: 'Governança' }
  ],
  icon: '🕸️',
  color: 'purple',
  prerequisites: ['p9-system-design', 'p4-data-warehouse'],
  estimatedLines: 0,
  realWorldExample: {
    es: 'Así implementó Zalando Data Mesh para escalar su plataforma de datos',
    pt: 'Assim a Zalando implementou Data Mesh para escalar sua plataforma de dados'
  },
  usedBy: ['Zalando', 'JPMorgan', 'Netflix', 'Intuit'],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Diagrama de Data Mesh', pt: 'Diagrama de Data Mesh' },
      example: `┌─────────────────────────────────────────────────┐
│              SELF-SERVE PLATFORM                │
│  (Storage, Compute, Catalog, Governance)        │
└─────────────────────────────────────────────────┘
        ▲           ▲           ▲           ▲
┌───────┴───┐ ┌─────┴─────┐ ┌───┴────┐ ┌────┴────┐
│  VENTAS   │ │ MARKETING │ │ LOGIST │ │ FINANCE │
│           │ │           │ │        │ │         │
│ orders    │ │ campaigns │ │ shipmt │ │ revenue │
│ customers │ │ leads     │ │ routes │ │ costs   │
└───────────┘ └───────────┘ └────────┘ └─────────┘
  (Domain)      (Domain)     (Domain)   (Domain)`
    },
  ],
  learningObjectives: [
    { es: 'Entender los 4 principios de Data Mesh', pt: 'Entender os 4 princípios do Data Mesh' },
    { es: 'Identificar dominios y sus data products', pt: 'Identificar domínios e seus data products' },
    { es: 'Diseñar infraestructura self-serve', pt: 'Projetar infraestrutura self-serve' },
    { es: 'Definir governance federado', pt: 'Definir governança federada' },
    { es: 'Evaluar trade-offs vs arquitectura centralizada', pt: 'Avaliar trade-offs vs arquitetura centralizada' },
  ],
  interviewStory: {
    hook: {
      es: "Diseñé la transición a Data Mesh que eliminó el bottleneck del equipo central de datos y aceleró el time-to-market 5x.",
      pt: "Projetei a transição para Data Mesh que eliminou o gargalo da equipe central de dados e acelerou o time-to-market em 5x."
    },
    situation: {
      es: "El equipo central de datos era un cuello de botella. Cada nuevo reporte tardaba semanas porque todo pasaba por nosotros. Los dominios estaban frustrados.",
      pt: "A equipe central de dados era um gargalo. Cada novo relatório demorava semanas porque tudo passava por nós. Os domínios estavam frustrados."
    },
    task: {
      es: "Diseñar una arquitectura Data Mesh donde cada dominio fuera dueño de sus datos y pudiera publicarlos como productos.",
      pt: "Projetar uma arquitetura Data Mesh onde cada domínio fosse dono de seus dados e pudesse publicá-los como produtos."
    },
    actions: [
      { es: "Identifiqué los 4 dominios principales y sus data products", pt: "Identifiquei os 4 domínios principais e seus data products" },
      { es: "Diseñé la plataforma self-serve: templates, CI/CD, catálogo", pt: "Projetei a plataforma self-serve: templates, CI/CD, catálogo" },
      { es: "Definí estándares de calidad y governance federado", pt: "Defini padrões de qualidade e governança federada" },
      { es: "Creé el modelo de data product con SLAs y ownership", pt: "Criei o modelo de data product com SLAs e ownership" },
      { es: "Planifiqué la migración incremental dominio por dominio", pt: "Planejei a migração incremental domínio por domínio" }
    ],
    results: [
      { es: "Time-to-market de nuevos data products: de 4 semanas a 3 días", pt: "Time-to-market de novos data products: de 4 semanas para 3 dias" },
      { es: "Equipo central reducido de 15 a 5 personas (los otros se movieron a dominios)", pt: "Equipe central reduzida de 15 para 5 pessoas (os outros se moveram para domínios)" },
      { es: "Calidad de datos mejoró porque los dueños están más cerca", pt: "Qualidade de dados melhorou porque os donos estão mais próximos" },
      { es: "4 dominios publicando data products independientemente", pt: "4 domínios publicando data products independentemente" }
    ],
    learnings: [
      { es: "Data Mesh no es para todos - requiere madurez organizacional", pt: "Data Mesh não é para todos - requer maturidade organizacional" },
      { es: "La plataforma self-serve es el habilitador crítico", pt: "A plataforma self-serve é o habilitador crítico" },
      { es: "Governance federado es más difícil que centralizado pero escala mejor", pt: "Governança federada é mais difícil que centralizada, mas escala melhor" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cuáles son los 4 principios de Data Mesh?", pt: "Quais são os 4 princípios do Data Mesh?" },
        answer: { es: "1) Ownership por dominio, 2) Data as a product, 3) Plataforma self-serve, 4) Governance federado. Los 4 son necesarios - sin uno, no funciona.", pt: "1) Ownership por domínio, 2) Data as a product, 3) Plataforma self-serve, 4) Governança federada. Os 4 são necessários - sem um, não funciona." }
      },
      {
        question: { es: "¿Cuándo NO usarías Data Mesh?", pt: "Quando você NÃO usaria Data Mesh?" },
        answer: { es: "Empresas chicas (<50 ingenieros), dominios muy acoplados, poca madurez de datos. El overhead no vale la pena. Empezaría con un Data Warehouse bien hecho.", pt: "Empresas pequenas (<50 engenheiros), domínios muito acoplados, pouca maturidade de dados. O overhead não vale a pena. Começaria com um Data Warehouse bem feito." }
      },
      {
        question: { es: "¿Cómo evitás duplicación de datos entre dominios?", pt: "Como você evita duplicação de dados entre domínios?" },
        answer: { es: "Data contracts y catálogo centralizado. Cada data product tiene un owner claro. Si dos dominios necesitan lo mismo, uno lo publica y el otro lo consume.", pt: "Data contracts e catálogo centralizado. Cada data product tem um owner claro. Se dois domínios precisam do mesmo, um o publica e o outro consome." }
      }
    ],
    closingStatement: { es: "Data Mesh es un cambio organizacional, no solo técnico - requiere cambiar cómo pensamos sobre ownership de datos.", pt: "Data Mesh é uma mudança organizacional, não apenas técnica - requer mudar como pensamos sobre ownership de dados." }
  },
  steps: [
    {
      order: 1,
      text: { es: '🏢 Elegí una empresa ficticia', pt: '🏢 Escolha uma empresa fictícia' },
      explanation: {
        es: `Creá una empresa ficticia con 4+ dominios:

**Ejemplo: E-commerce "ShopMax"**
- **Ventas**: Órdenes, pagos, devoluciones
- **Marketing**: Campañas, atribución, conversión
- **Producto**: Catálogo, inventario, precios
- **Clientes**: Perfiles, segmentación, loyalty
- **Logística**: Envíos, tracking, almacenes`,
        pt: `Crie uma empresa fictícia com 4+ domínios:

**Exemplo: E-commerce "ShopMax"**
- **Vendas**: Pedidos, pagamentos, devoluções
- **Marketing**: Campanhas, atribuição, conversão
- **Produto**: Catálogo, inventário, preços
- **Clientes**: Perfis, segmentação, fidelidade
- **Logística**: Envios, rastreamento, armazéns`
      },
      checkpoint: { es: '¿Definiste al menos 4 dominios con sus responsabilidades?', pt: 'Definiu pelo menos 4 domínios com suas responsabilidades?' }
    },
    {
      order: 2,
      text: { es: '📦 Identificá data products por dominio', pt: '📦 Identifique data products por domínio' },
      code: `# Data Products por Dominio

## Dominio: Ventas
- **orders_fact**: Tabla de hechos de órdenes
- **daily_revenue**: Métricas de revenue diario
- **order_events**: Stream de eventos de órdenes

## Dominio: Marketing
- **campaign_performance**: Métricas de campañas
- **attribution_model**: Modelo de atribución
- **customer_journey**: Eventos de journey

## Dominio: Producto
- **product_catalog**: Catálogo actualizado
- **inventory_status**: Estado de inventario real-time
- **price_history**: Historial de precios

## Dominio: Clientes
- **customer_360**: Vista unificada del cliente
- **segments**: Segmentos de clientes
- **churn_prediction**: Modelo de churn`,
      explanation: { es: 'Cada data product es propiedad de un dominio y tiene un "product owner".', pt: 'Cada data product é propriedade de um domínio e tem um "product owner".' },
      tip: { es: 'Un data product debe ser discoverable, addressable, trustworthy, self-describing.', pt: 'Um data product deve ser discoverable, addressable, trustworthy, self-describing.' }
    },
    {
      order: 3,
      text: { es: '🔧 Diseñá la infraestructura self-serve', pt: '🔧 Projete a infraestrutura self-serve' },
      explanation: {
        es: `La plataforma self-serve permite a los dominios crear y publicar data products sin depender de un equipo central.

**Componentes:**
1. **Data Product Template**: Estructura estándar para crear productos
2. **Schema Registry**: Catálogo de schemas
3. **Data Catalog**: Descubrimiento de productos
4. **Quality Framework**: Validación automática
5. **Access Control**: Permisos por dominio
6. **Monitoring**: Métricas de uso y calidad`,
        pt: `A plataforma self-serve permite aos domínios criar e publicar data products sem depender de uma equipe central.

**Componentes:**
1. **Data Product Template**: Estrutura padrão para criar produtos
2. **Schema Registry**: Catálogo de schemas
3. **Data Catalog**: Descoberta de produtos
4. **Quality Framework**: Validação automática
5. **Access Control**: Permissões por domínio
6. **Monitoring**: Métricas de uso e qualidade`
      },
      checkpoint: { es: '¿Tu plataforma permite a los dominios ser autónomos?', pt: 'Sua plataforma permite aos domínios serem autônomos?' }
    },
    {
      order: 4,
      text: { es: '📜 Definí contratos de datos', pt: '📜 Defina contratos de dados' },
      code: `# Contrato de Data Product: orders_fact

## Metadata
- **Owner**: Equipo de Ventas
- **SLA**: 99.9% disponibilidad
- **Freshness**: Actualizado cada hora
- **Retention**: 2 años

## Schema
| Campo | Tipo | Descripción |
|-------|------|-------------|
| order_id | STRING | PK, formato: ORD-XXXXXX |
| customer_id | STRING | FK a customer_360 |
| order_date | TIMESTAMP | UTC |
| total_amount | DECIMAL(10,2) | En USD |
| status | ENUM | pending, completed, cancelled |

## Quality Rules
- order_id: unique, not null
- total_amount: >= 0
- order_date: <= now()

## Access
- Marketing: READ
- Finance: READ
- Data Science: READ
- External: DENIED`,
      explanation: { es: 'Los contratos definen expectativas claras entre productor y consumidor.', pt: 'Os contratos definem expectativas claras entre produtor e consumidor.' }
    },
    {
      order: 5,
      text: { es: '👥 Diseñá governance federado', pt: '👥 Projete governança federada' },
      explanation: {
        es: `**Governance Global (Platform Team):**
- Estándares de naming
- Políticas de seguridad
- SLAs mínimos
- Herramientas comunes

**Governance Local (Dominios):**
- Schema de sus productos
- Lógica de negocio
- Frecuencia de actualización
- Acceso a sus datos

**Federated Computational Governance:**
- Políticas como código
- Validación automática
- Enforcement en CI/CD`,
        pt: `**Governança Global (Platform Team):**
- Padrões de naming
- Políticas de segurança
- SLAs mínimos
- Ferramentas comuns

**Governança Local (Domínios):**
- Schema de seus produtos
- Lógica de negócio
- Frequência de atualização
- Acesso aos seus dados

**Governança Computacional Federada:**
- Políticas como código
- Validação automática
- Enforcement em CI/CD`
      },
      checkpoint: { es: '¿Definiste qué es global vs local?', pt: 'Definiu o que é global vs local?' }
    },
    {
      order: 6,
      text: { es: '⚖️ Identificá trade-offs', pt: '⚖️ Identifique trade-offs' },
      code: `# Trade-offs: Data Mesh vs Centralizado

## Ventajas de Data Mesh
- Escala con la organización
- Dominios son autónomos
- Ownership claro
- Menos cuellos de botella

## Desventajas de Data Mesh
- Más complejo de implementar
- Requiere madurez organizacional
- Puede haber duplicación
- Governance más difícil

## Cuándo usar Data Mesh
✅ Empresa grande (100+ ingenieros)
✅ Múltiples dominios autónomos
✅ Equipo central es cuello de botella
✅ Dominios tienen capacidad técnica

## Cuándo NO usar Data Mesh
❌ Empresa pequeña
❌ Pocos dominios
❌ Equipo central funciona bien
❌ Dominios no tienen capacidad técnica`,
      explanation: { es: 'Data Mesh no es para todos. Evaluá si tu organización está lista.', pt: 'Data Mesh não é para todos. Avalie se sua organização está pronta.' }
    },
    {
      order: 7,
      text: { es: '📝 Creá diagrama completo', pt: '📝 Crie diagrama completo' },
      explanation: {
        es: `Creá un diagrama mostrando:
1. Dominios y sus data products
2. Plataforma self-serve
3. Flujo de datos entre dominios
4. Governance (global vs local)

Usá draw.io o similar.`,
        pt: `Crie um diagrama mostrando:
1. Domínios e seus data products
2. Plataforma self-serve
3. Fluxo de dados entre domínios
4. Governança (global vs local)

Use draw.io ou similar.`
      },
      checkpoint: { es: '¿Tu diagrama muestra la arquitectura completa?', pt: 'Seu diagrama mostra a arquitetura completa?' }
    },
  ],
  deliverable: { es: 'Documento de arquitectura + diagramas + contratos de ejemplo', pt: 'Documento de arquitetura + diagramas + contratos de exemplo' },
  evaluation: [
    { es: '¿Los dominios están bien definidos?', pt: 'Os domínios estão bem definidos?' },
    { es: '¿Los data products tienen ownership claro?', pt: 'Os data products têm ownership claro?' },
    { es: '¿La plataforma self-serve es realista?', pt: 'A plataforma self-serve é realista?' },
    { es: '¿El governance es práctico?', pt: 'A governança é prática?' },
    { es: '¿Evaluaste trade-offs honestamente?', pt: 'Avaliou trade-offs honestamente?' },
  ],
  theory: {
    es: `## Los 4 Principios de Data Mesh

### 1. Domain Ownership
Cada dominio es dueño de sus datos. No hay equipo central que "posea" todos los datos.

### 2. Data as a Product
Los datos se tratan como productos con:
- Product owner
- SLAs
- Documentación
- Versionamiento

### 3. Self-Serve Platform
Infraestructura que permite a los dominios crear y publicar data products sin depender de otros.

### 4. Federated Governance
Governance distribuida con estándares globales pero autonomía local.

## Cuándo considerar Data Mesh

| Factor | Centralizado | Data Mesh |
|--------|--------------|-----------|
| Tamaño | < 50 ingenieros | > 100 ingenieros |
| Dominios | Pocos, acoplados | Muchos, autónomos |
| Bottleneck | No | Equipo central |
| Madurez | Baja | Alta |`,
    pt: `## Os 4 Princípios do Data Mesh

### 1. Domain Ownership
Cada domínio é dono de seus dados. Não há equipe central que "possua" todos os dados.

### 2. Data as a Product
Os dados são tratados como produtos com:
- Product owner
- SLAs
- Documentação
- Versionamento

### 3. Self-Serve Platform
Infraestrutura que permite aos domínios criar e publicar data products sem depender de outros.

### 4. Federated Governance
Governança distribuída com padrões globais mas autonomia local.

## Quando considerar Data Mesh

| Fator | Centralizado | Data Mesh |
|--------|--------------|-----------|
| Tamanho | < 50 engenheiros | > 100 engenheiros |
| Domínios | Poucos, acoplados | Muitos, autônomos |
| Gargalo | Não | Equipe central |
| Maturidade | Baixa | Alta |`
  },
};


