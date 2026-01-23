/**
 * FASE 2: Arquitectura de Databricks
 * 9 pasos para entender cómo funciona Databricks por dentro
 * 
 * ACTUALIZADO: Enero 2026 - Incluye arquitectura serverless y Free Edition
 */

import { DatabricksPhase } from '../types';

export const PHASE_2_ARCHITECTURE: DatabricksPhase = {
  id: 'db-phase-2',
  number: 2,
  title: {
    es: 'Arquitectura de Databricks',
    en: 'Databricks Architecture',
    pt: 'Arquitetura do Databricks'
  },
  subtitle: {
    es: 'Entendé cómo funciona por dentro',
    en: 'Understand how it works internally',
    pt: 'Entenda como funciona por dentro'
  },
  description: {
    es: 'Conocer la arquitectura de Databricks te permite tomar mejores decisiones de diseño, optimizar costos y resolver problemas de performance. Esta fase cubre tanto la arquitectura enterprise (planes pagos) como serverless (Free Edition).',
    en: 'Knowing Databricks architecture allows you to make better design decisions, optimize costs and solve performance problems. This phase covers both enterprise architecture (paid plans) and serverless (Free Edition).',
    pt: 'Conhecer a arquitetura do Databricks permite tomar melhores decisões de design, otimizar custos e resolver problemas de performance. Esta fase cobre tanto a arquitetura enterprise (planos pagos) quanto serverless (Free Edition).'
  },
  icon: '🏗️',
  color: 'blue',
  estimatedDays: '3-4 días',
  steps: [
    {
      id: 'db-2-1',
      title: {
        es: 'Control Plane vs Data Plane',
        en: 'Control Plane vs Data Plane',
        pt: 'Control Plane vs Data Plane'
      },
      description: {
        es: 'Databricks separa la gestión (control) del procesamiento (data). Entendé por qué esto importa.',
        en: 'Databricks separates management (control) from processing (data). Understand why this matters.',
        pt: 'O Databricks separa a gestão (control) do processamento (data). Entenda por que isso importa.'
      },
      theory: {
        es: `## Control Plane vs Data Plane

Databricks tiene una arquitectura única de dos planos:

### Control Plane (gestionado por Databricks)
\`\`\`
┌─────────────────────────────────────┐
│         CONTROL PLANE               │
│    (Databricks Cloud Account)       │
├─────────────────────────────────────┤
│ • Web Application (UI)              │
│ • Notebook Service                  │
│ • Job Scheduler                     │
│ • Cluster Manager                   │
│ • Identity & Access Management      │
│ • Billing & Usage Tracking          │
└─────────────────────────────────────┘
\`\`\`

### Data Plane (en TU cuenta de cloud)
\`\`\`
┌─────────────────────────────────────┐
│          DATA PLANE                 │
│    (Tu cuenta AWS/Azure/GCP)        │
├─────────────────────────────────────┤
│ • Clusters (EC2, VMs)               │
│ • Storage (S3, ADLS, GCS)           │
│ • Networking (VPC, VNet)            │
│ • TUS DATOS (nunca salen)           │
└─────────────────────────────────────┘
\`\`\`

### ¿Por qué esta separación?

1. **Seguridad**: Tus datos NUNCA pasan por servidores de Databricks
2. **Compliance**: Cumplís regulaciones (GDPR, HIPAA) más fácilmente
3. **Control**: Usás tu propia infraestructura de cloud
4. **Costos**: Pagás compute directamente a AWS/Azure/GCP

### Flujo de una operación típica:

\`\`\`
Usuario → Control Plane → Inicia Cluster
                        ↓
              Data Plane (tu cloud)
                        ↓
              Cluster lee datos de TU S3/ADLS
                        ↓
              Procesa datos
                        ↓
              Escribe resultados en TU storage
\`\`\``,
        en: `## Control Plane vs Data Plane

Databricks has a unique two-plane architecture:

### Control Plane (managed by Databricks)
\`\`\`
┌─────────────────────────────────────┐
│         CONTROL PLANE               │
│    (Databricks Cloud Account)       │
├─────────────────────────────────────┤
│ • Web Application (UI)              │
│ • Notebook Service                  │
│ • Job Scheduler                     │
│ • Cluster Manager                   │
│ • Identity & Access Management      │
│ • Billing & Usage Tracking          │
└─────────────────────────────────────┘
\`\`\`

### Data Plane (in YOUR cloud account)
\`\`\`
┌─────────────────────────────────────┐
│          DATA PLANE                 │
│    (Your AWS/Azure/GCP account)     │
├─────────────────────────────────────┤
│ • Clusters (EC2, VMs)               │
│ • Storage (S3, ADLS, GCS)           │
│ • Networking (VPC, VNet)            │
│ • YOUR DATA (never leaves)          │
└─────────────────────────────────────┘
\`\`\`

### Why this separation?

1. **Security**: Your data NEVER passes through Databricks servers
2. **Compliance**: Easier to meet regulations (GDPR, HIPAA)
3. **Control**: Use your own cloud infrastructure
4. **Costs**: Pay compute directly to AWS/Azure/GCP

### Flow of a typical operation:

\`\`\`
User → Control Plane → Starts Cluster
                     ↓
           Data Plane (your cloud)
                     ↓
           Cluster reads data from YOUR S3/ADLS
                     ↓
           Processes data
                     ↓
           Writes results to YOUR storage
\`\`\``,
        pt: `## Control Plane vs Data Plane

O Databricks tem uma arquitetura única de dois planos:

### Control Plane (gerenciado pelo Databricks)
\`\`\`
┌─────────────────────────────────────┐
│         CONTROL PLANE               │
│    (Databricks Cloud Account)       │
├─────────────────────────────────────┤
│ • Web Application (UI)              │
│ • Notebook Service                  │
│ • Job Scheduler                     │
│ • Cluster Manager                   │
│ • Identity & Access Management      │
│ • Billing & Usage Tracking          │
└─────────────────────────────────────┘
\`\`\`

### Data Plane (na SUA conta de cloud)
\`\`\`
┌─────────────────────────────────────┐
│          DATA PLANE                 │
│    (Sua conta AWS/Azure/GCP)        │
├─────────────────────────────────────┤
│ • Clusters (EC2, VMs)               │
│ • Storage (S3, ADLS, GCS)           │
│ • Networking (VPC, VNet)            │
│ • SEUS DADOS (nunca saem)           │
└─────────────────────────────────────┘
\`\`\`

### Por que essa separação?

1. **Segurança**: Seus dados NUNCA passam por servidores do Databricks
2. **Compliance**: Mais fácil cumprir regulações (GDPR, HIPAA)
3. **Controle**: Use sua própria infraestrutura de cloud
4. **Custos**: Pague compute diretamente para AWS/Azure/GCP

### Fluxo de uma operação típica:

\`\`\`
Usuário → Control Plane → Inicia Cluster
                        ↓
              Data Plane (seu cloud)
                        ↓
              Cluster lê dados do SEU S3/ADLS
                        ↓
              Processa dados
                        ↓
              Escreve resultados no SEU storage
\`\`\``
      },
      practicalTips: [
        {
          es: '🔒 Esta arquitectura es clave para aprobar auditorías de seguridad. Memorizala.',
          en: '🔒 This architecture is key to passing security audits. Memorize it.',
          pt: '🔒 Esta arquitetura é chave para passar auditorias de segurança. Memorize-a.'
        },
        {
          es: '💰 En entrevistas, mencionar esta separación muestra que entendés Databricks a fondo.',
          en: '💰 In interviews, mentioning this separation shows you understand Databricks deeply.',
          pt: '💰 Em entrevistas, mencionar esta separação mostra que você entende Databricks profundamente.'
        },
        {
          es: '📌 En Free Edition, Databricks gestiona todo (control + data plane). Esta arquitectura aplica a planes enterprise.',
          en: '📌 In Free Edition, Databricks manages everything (control + data plane). This architecture applies to enterprise plans.',
          pt: '📌 No Free Edition, o Databricks gerencia tudo (control + data plane). Esta arquitetura aplica-se a planos enterprise.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks Architecture Overview',
          url: 'https://docs.databricks.com/getting-started/overview.html',
          type: 'docs'
        },
        {
          title: 'Security & Trust Center',
          url: 'https://www.databricks.com/trust',
          type: 'article'
        }
      ],
      checkpoint: {
        es: '🤔 Si un cliente te pregunta "¿mis datos pasan por servidores de Databricks?", ¿qué respondés?',
        en: '🤔 If a client asks "does my data pass through Databricks servers?", what do you answer?',
        pt: '🤔 Se um cliente perguntar "meus dados passam por servidores do Databricks?", o que você responde?'
      },
      xpReward: 20,
      estimatedMinutes: 20
    },
    {
      id: 'db-2-2',
      title: {
        es: 'Databricks en AWS, Azure y GCP',
        en: 'Databricks on AWS, Azure and GCP',
        pt: 'Databricks na AWS, Azure e GCP'
      },
      description: {
        es: 'Databricks corre en los 3 clouds principales. Conocé las diferencias.',
        en: 'Databricks runs on all 3 major clouds. Learn the differences.',
        pt: 'O Databricks roda nos 3 principais clouds. Conheça as diferenças.'
      },
      theory: {
        es: `## Databricks en Cada Cloud

### AWS (el más maduro)
\`\`\`
Storage: S3
Compute: EC2
Network: VPC
Identity: IAM
Integración nativa: Glue, Redshift, Kinesis
\`\`\`
**Pros:** Más features, más documentación
**Contras:** Setup más manual

### Azure (partnership con Microsoft)
\`\`\`
Storage: ADLS Gen2, Blob Storage
Compute: Azure VMs
Network: VNet
Identity: Azure AD (SSO nativo!)
Integración nativa: Synapse, Data Factory, Power BI
\`\`\`
**Pros:** SSO con Azure AD, integración Office 365
**Contras:** Algunas features llegan después que AWS

### GCP (el más nuevo)
\`\`\`
Storage: GCS
Compute: GCE
Network: VPC
Identity: Google IAM
Integración nativa: BigQuery, Dataflow
\`\`\`
**Pros:** Mejor pricing de compute
**Contras:** Menos features que AWS/Azure

### Comparativa de Servicios:

| Feature | AWS | Azure | GCP |
|---------|-----|-------|-----|
| Storage | S3 | ADLS | GCS |
| Unity Catalog | ✅ | ✅ | ✅ |
| Photon Engine | ✅ | ✅ | ✅ |
| Serverless SQL | ✅ | ✅ | ✅ |
| SSO Nativo | IAM | Azure AD | Google |
| Madurez | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |`,
        en: `## Databricks on Each Cloud

### AWS (most mature)
\`\`\`
Storage: S3
Compute: EC2
Network: VPC
Identity: IAM
Native integration: Glue, Redshift, Kinesis
\`\`\`
**Pros:** More features, more documentation
**Cons:** More manual setup

### Azure (Microsoft partnership)
\`\`\`
Storage: ADLS Gen2, Blob Storage
Compute: Azure VMs
Network: VNet
Identity: Azure AD (native SSO!)
Native integration: Synapse, Data Factory, Power BI
\`\`\`
**Pros:** SSO with Azure AD, Office 365 integration
**Cons:** Some features arrive later than AWS

### GCP (newest)
\`\`\`
Storage: GCS
Compute: GCE
Network: VPC
Identity: Google IAM
Native integration: BigQuery, Dataflow
\`\`\`
**Pros:** Better compute pricing
**Cons:** Fewer features than AWS/Azure

### Service Comparison:

| Feature | AWS | Azure | GCP |
|---------|-----|-------|-----|
| Storage | S3 | ADLS | GCS |
| Unity Catalog | ✅ | ✅ | ✅ |
| Photon Engine | ✅ | ✅ | ✅ |
| Serverless SQL | ✅ | ✅ | ✅ |
| Native SSO | IAM | Azure AD | Google |
| Maturity | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |`,
        pt: `## Databricks em Cada Cloud

### AWS (mais maduro)
\`\`\`
Storage: S3
Compute: EC2
Network: VPC
Identity: IAM
Integração nativa: Glue, Redshift, Kinesis
\`\`\`
**Prós:** Mais features, mais documentação
**Contras:** Setup mais manual

### Azure (parceria com Microsoft)
\`\`\`
Storage: ADLS Gen2, Blob Storage
Compute: Azure VMs
Network: VNet
Identity: Azure AD (SSO nativo!)
Integração nativa: Synapse, Data Factory, Power BI
\`\`\`
**Prós:** SSO com Azure AD, integração Office 365
**Contras:** Algumas features chegam depois da AWS

### GCP (mais novo)
\`\`\`
Storage: GCS
Compute: GCE
Network: VPC
Identity: Google IAM
Integração nativa: BigQuery, Dataflow
\`\`\`
**Prós:** Melhor pricing de compute
**Contras:** Menos features que AWS/Azure

### Comparação de Serviços:

| Feature | AWS | Azure | GCP |
|---------|-----|-------|-----|
| Storage | S3 | ADLS | GCS |
| Unity Catalog | ✅ | ✅ | ✅ |
| Photon Engine | ✅ | ✅ | ✅ |
| Serverless SQL | ✅ | ✅ | ✅ |
| SSO Nativo | IAM | Azure AD | Google |
| Maturidade | ⭐⭐⭐ | ⭐⭐⭐ | ⭐⭐ |`
      },
      practicalTips: [
        {
          es: '🎯 Si buscás trabajo, enfocate en AWS o Azure. Son los más demandados.',
          en: '🎯 If you\'re job hunting, focus on AWS or Azure. They\'re most in-demand.',
          pt: '🎯 Se você está procurando emprego, foque em AWS ou Azure. São os mais demandados.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks on AWS',
          url: 'https://docs.databricks.com/administration-guide/cloud-configurations/aws/index.html',
          type: 'docs'
        },
        {
          title: 'Azure Databricks',
          url: 'https://docs.microsoft.com/en-us/azure/databricks/',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '🤔 ¿En qué cloud trabaja la empresa donde querés aplicar? Investigalo.',
        en: '🤔 What cloud does the company you want to apply to use? Research it.',
        pt: '🤔 Em qual cloud trabalha a empresa onde você quer aplicar? Pesquise.'
      },
      xpReward: 15,
      estimatedMinutes: 15
    },
    {
      id: 'db-2-3',
      title: {
        es: 'Tipos de Compute: Serverless, All-Purpose y Job Clusters',
        en: 'Compute Types: Serverless, All-Purpose and Job Clusters',
        pt: 'Tipos de Compute: Serverless, All-Purpose e Job Clusters'
      },
      description: {
        es: 'Databricks ofrece diferentes opciones de compute. Elegir correctamente impacta en costos y performance.',
        en: 'Databricks offers different compute options. Choosing correctly impacts costs and performance.',
        pt: 'O Databricks oferece diferentes opções de compute. Escolher corretamente impacta em custos e performance.'
      },
      theory: {
        es: `## Tipos de Compute en Databricks

### 🆕 Serverless Compute (Free Edition y planes pagos)
\`\`\`
✅ Para: Desarrollo rápido, SQL analytics, notebooks
✅ Disponible en: Free Edition (único tipo disponible)
💰 Costo: Por uso (sin costo en Free Edition)
⏱️ Inicio: Segundos (sin esperas)
\`\`\`

**Características:**
- Se activa automáticamente al ejecutar código
- Sin configuración manual
- Recursos administrados por Databricks
- Incluye Photon para queries SQL
- Lenguajes: Python y SQL (en Free Edition)

### All-Purpose Clusters (Solo planes pagos)
\`\`\`
✅ Para: Desarrollo, exploración, notebooks colaborativos
❌ No para: Jobs de producción
💰 Costo: Más caro (DBU premium)
⏱️ Duración: Pueden estar encendidos mucho tiempo
\`\`\`

**Características:**
- Múltiples usuarios pueden conectarse
- Configuración personalizada (RAM, cores, GPU)
- Lenguajes: Python, SQL, R, Scala
- Persisten después de ejecutar código

### Job Clusters (Solo planes pagos)
\`\`\`
✅ Para: Jobs de producción, pipelines schedulados
❌ No para: Desarrollo interactivo
💰 Costo: Más barato (~50% menos DBUs que All-Purpose)
⏱️ Duración: Se crean y destruyen automáticamente
\`\`\`

**Características:**
- Un cluster por job
- Se destruyen al terminar el job
- Configuración vía API/UI de Jobs
- Optimizados para batch processing

### Comparativa Completa:

| Tipo | Disponibilidad | DBU/hora | Inicio | Lenguajes |
|------|---------------|----------|--------|-----------|
| Serverless | Free + Pagos | Por uso | Segundos | Python, SQL |
| All-Purpose | Solo Pagos | ~1.0 | 3-5 min | Python, SQL, R, Scala |
| Job | Solo Pagos | ~0.5 | 3-5 min | Python, SQL, R, Scala |

### Best Practices:

1. **Free Edition**: Usá serverless (es automático)
2. **Desarrollo (pagos)**: All-Purpose con auto-terminate (30 min)
3. **Producción (pagos)**: Job clusters o Serverless Jobs
4. **Costos**: Monitorear con Tags por proyecto/equipo`,
        en: `## Compute Types in Databricks

### 🆕 Serverless Compute (Free Edition and paid plans)
\`\`\`
✅ For: Quick development, SQL analytics, notebooks
✅ Available in: Free Edition (only type available)
💰 Cost: Per use (no cost in Free Edition)
⏱️ Startup: Seconds (no waiting)
\`\`\`

**Features:**
- Activates automatically when running code
- No manual configuration
- Resources managed by Databricks
- Includes Photon for SQL queries
- Languages: Python and SQL (in Free Edition)

### All-Purpose Clusters (Paid plans only)
\`\`\`
✅ For: Development, exploration, collaborative notebooks
❌ Not for: Production jobs
💰 Cost: More expensive (premium DBU)
⏱️ Duration: Can stay on for long periods
\`\`\`

**Features:**
- Multiple users can connect
- Custom configuration (RAM, cores, GPU)
- Languages: Python, SQL, R, Scala
- Persist after running code

### Job Clusters (Paid plans only)
\`\`\`
✅ For: Production jobs, scheduled pipelines
❌ Not for: Interactive development
💰 Cost: Cheaper (~50% less DBUs than All-Purpose)
⏱️ Duration: Created and destroyed automatically
\`\`\`

**Features:**
- One cluster per job
- Destroyed when job completes
- Configuration via Jobs API/UI
- Optimized for batch processing

### Complete Comparison:

| Type | Availability | DBU/hour | Startup | Languages |
|------|-------------|----------|---------|-----------|
| Serverless | Free + Paid | Per use | Seconds | Python, SQL |
| All-Purpose | Paid only | ~1.0 | 3-5 min | Python, SQL, R, Scala |
| Job | Paid only | ~0.5 | 3-5 min | Python, SQL, R, Scala |

### Best Practices:

1. **Free Edition**: Use serverless (it's automatic)
2. **Development (paid)**: All-Purpose with auto-terminate (30 min)
3. **Production (paid)**: Job clusters or Serverless Jobs
4. **Costs**: Monitor with Tags by project/team`,
        pt: `## Tipos de Compute no Databricks

### 🆕 Serverless Compute (Free Edition e planos pagos)
\`\`\`
✅ Para: Desenvolvimento rápido, SQL analytics, notebooks
✅ Disponível em: Free Edition (único tipo disponível)
💰 Custo: Por uso (sem custo no Free Edition)
⏱️ Início: Segundos (sem esperas)
\`\`\`

**Características:**
- Ativa automaticamente ao executar código
- Sem configuração manual
- Recursos gerenciados pelo Databricks
- Inclui Photon para queries SQL
- Linguagens: Python e SQL (no Free Edition)

### All-Purpose Clusters (Apenas planos pagos)
\`\`\`
✅ Para: Desenvolvimento, exploração, notebooks colaborativos
❌ Não para: Jobs de produção
💰 Custo: Mais caro (DBU premium)
⏱️ Duração: Podem ficar ligados muito tempo
\`\`\`

**Características:**
- Múltiplos usuários podem conectar
- Configuração personalizada (RAM, cores, GPU)
- Linguagens: Python, SQL, R, Scala
- Persistem após executar código

### Job Clusters (Apenas planos pagos)
\`\`\`
✅ Para: Jobs de produção, pipelines schedulados
❌ Não para: Desenvolvimento interativo
💰 Custo: Mais barato (~50% menos DBUs que All-Purpose)
⏱️ Duração: Criados e destruídos automaticamente
\`\`\`

**Características:**
- Um cluster por job
- Destruídos ao terminar o job
- Configuração via API/UI de Jobs
- Otimizados para batch processing

### Comparação Completa:

| Tipo | Disponibilidade | DBU/hora | Início | Linguagens |
|------|-----------------|----------|--------|------------|
| Serverless | Free + Pagos | Por uso | Segundos | Python, SQL |
| All-Purpose | Apenas Pagos | ~1.0 | 3-5 min | Python, SQL, R, Scala |
| Job | Apenas Pagos | ~0.5 | 3-5 min | Python, SQL, R, Scala |

### Melhores Práticas:

1. **Free Edition**: Use serverless (é automático)
2. **Desenvolvimento (pagos)**: All-Purpose com auto-terminate (30 min)
3. **Produção (pagos)**: Job clusters ou Serverless Jobs
4. **Custos**: Monitorar com Tags por projeto/equipe`
      },
      practicalTips: [
        {
          es: '💰 Un error común de principiantes: usar All-Purpose para jobs de producción. Cuesta el doble!',
          en: '💰 A common beginner mistake: using All-Purpose for production jobs. Costs double!',
          pt: '💰 Um erro comum de iniciantes: usar All-Purpose para jobs de produção. Custa o dobro!'
        },
        {
          es: '🆓 En Free Edition, no te preocupes por elegir - solo tenés serverless y funciona automáticamente.',
          en: '🆓 In Free Edition, don\'t worry about choosing - you only have serverless and it works automatically.',
          pt: '🆓 No Free Edition, não se preocupe em escolher - você só tem serverless e funciona automaticamente.'
        }
      ],
      externalLinks: [
        {
          title: 'Cluster Types',
          url: 'https://docs.databricks.com/clusters/index.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '💡 ¿Qué tipo de cluster usarías para un ETL que corre a las 3am todos los días?',
        en: '💡 What cluster type would you use for an ETL that runs at 3am every day?',
        pt: '💡 Que tipo de cluster você usaria para um ETL que roda às 3am todos os dias?'
      },
      xpReward: 20,
      estimatedMinutes: 15
    },
    {
      id: 'db-2-4',
      title: {
        es: 'Databricks Runtime: Versiones y Componentes',
        en: 'Databricks Runtime: Versions and Components',
        pt: 'Databricks Runtime: Versões e Componentes'
      },
      description: {
        es: 'El Runtime es el "sistema operativo" de tu cluster. Elegir bien impacta en compatibilidad y performance.',
        en: 'The Runtime is your cluster\'s "operating system". Choosing well impacts compatibility and performance.',
        pt: 'O Runtime é o "sistema operacional" do seu cluster. Escolher bem impacta em compatibilidade e performance.'
      },
      theory: {
        es: `## Databricks Runtime

El Runtime es un conjunto pre-configurado de:
- Apache Spark
- Bibliotecas de Python/R/Scala
- Optimizaciones de Databricks
- Delta Lake

### Tipos de Runtime:

| Runtime | Incluye | Uso |
|---------|---------|-----|
| Standard | Spark + bibliotecas básicas | General |
| ML | + TensorFlow, PyTorch, Scikit-learn | Machine Learning |
| Photon | + Motor Photon (C++) | Performance máxima |
| GPU | + CUDA, cuDNN | Deep Learning |

### Versionado:

\`\`\`
13.3 LTS (Spark 3.4.1, Scala 2.12)
│    │
│    └── Long Term Support (soporte largo)
└── Versión mayor del Runtime
\`\`\`

### LTS vs Latest:

**LTS (Long Term Support):**
- Soporte por 2 años
- Más estable
- ✅ Recomendado para producción

**Latest:**
- Features más nuevas
- Puede tener bugs
- ✅ Bueno para experimentar

### Componentes del Runtime:

\`\`\`python
# Ver versión de Spark
spark.version  # "3.4.1"

# Ver versión del Runtime
spark.conf.get("spark.databricks.clusterUsageTags.sparkVersion")

# Ver bibliotecas instaladas
%pip list
\`\`\`

### Best Practices:
1. Producción: Siempre LTS
2. Desarrollo: Puede ser latest
3. Documentar versión en cada proyecto`,
        en: `## Databricks Runtime

The Runtime is a pre-configured set of:
- Apache Spark
- Python/R/Scala libraries
- Databricks optimizations
- Delta Lake

### Runtime Types:

| Runtime | Includes | Use |
|---------|----------|-----|
| Standard | Spark + basic libraries | General |
| ML | + TensorFlow, PyTorch, Scikit-learn | Machine Learning |
| Photon | + Photon Engine (C++) | Maximum performance |
| GPU | + CUDA, cuDNN | Deep Learning |

### Versioning:

\`\`\`
13.3 LTS (Spark 3.4.1, Scala 2.12)
│    │
│    └── Long Term Support
└── Runtime major version
\`\`\`

### LTS vs Latest:

**LTS (Long Term Support):**
- 2-year support
- More stable
- ✅ Recommended for production

**Latest:**
- Newest features
- May have bugs
- ✅ Good for experimenting

### Runtime Components:

\`\`\`python
# Check Spark version
spark.version  # "3.4.1"

# Check Runtime version
spark.conf.get("spark.databricks.clusterUsageTags.sparkVersion")

# See installed libraries
%pip list
\`\`\`

### Best Practices:
1. Production: Always LTS
2. Development: Can be latest
3. Document version in each project`,
        pt: `## Databricks Runtime

O Runtime é um conjunto pré-configurado de:
- Apache Spark
- Bibliotecas Python/R/Scala
- Otimizações do Databricks
- Delta Lake

### Tipos de Runtime:

| Runtime | Inclui | Uso |
|---------|--------|-----|
| Standard | Spark + bibliotecas básicas | Geral |
| ML | + TensorFlow, PyTorch, Scikit-learn | Machine Learning |
| Photon | + Motor Photon (C++) | Performance máxima |
| GPU | + CUDA, cuDNN | Deep Learning |

### Versionamento:

\`\`\`
13.3 LTS (Spark 3.4.1, Scala 2.12)
│    │
│    └── Long Term Support (suporte longo)
└── Versão maior do Runtime
\`\`\`

### LTS vs Latest:

**LTS (Long Term Support):**
- Suporte por 2 anos
- Mais estável
- ✅ Recomendado para produção

**Latest:**
- Features mais novas
- Pode ter bugs
- ✅ Bom para experimentar

### Componentes do Runtime:

\`\`\`python
# Ver versão do Spark
spark.version  # "3.4.1"

# Ver versão do Runtime
spark.conf.get("spark.databricks.clusterUsageTags.sparkVersion")

# Ver bibliotecas instaladas
%pip list
\`\`\`

### Melhores Práticas:
1. Produção: Sempre LTS
2. Desenvolvimento: Pode ser latest
3. Documentar versão em cada projeto`
      },
      practicalTips: [
        {
          es: '⚠️ Cambiar de Runtime puede romper código. Siempre testear antes de actualizar en producción.',
          en: '⚠️ Changing Runtime can break code. Always test before updating in production.',
          pt: '⚠️ Mudar de Runtime pode quebrar código. Sempre testar antes de atualizar em produção.'
        }
      ],
      externalLinks: [
        {
          title: 'Runtime Release Notes',
          url: 'https://docs.databricks.com/release-notes/runtime/releases.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '🤔 ¿Qué Runtime elegirías para un pipeline de ML en producción?',
        en: '🤔 What Runtime would you choose for an ML pipeline in production?',
        pt: '🤔 Qual Runtime você escolheria para um pipeline de ML em produção?'
      },
      xpReward: 20,
      estimatedMinutes: 20
    },
    {
      id: 'db-2-5',
      title: {
        es: 'Photon Engine: El Acelerador Nativo',
        en: 'Photon Engine: The Native Accelerator',
        pt: 'Photon Engine: O Acelerador Nativo'
      },
      description: {
        es: 'Photon puede hacer tu código 2-8x más rápido sin cambiar nada. Entendé cómo funciona.',
        en: 'Photon can make your code 2-8x faster without changing anything. Understand how it works.',
        pt: 'O Photon pode fazer seu código 2-8x mais rápido sem mudar nada. Entenda como funciona.'
      },
      theory: {
        es: `## Photon Engine

Photon es el motor de ejecución nativo de Databricks, escrito en C++ para máxima performance.

### ¿Qué es Photon?

\`\`\`
Spark tradicional:
Python → JVM (Java) → Ejecución

Con Photon:
Python → Photon (C++ nativo) → Ejecución vectorizada
\`\`\`

### Beneficios:

| Métrica | Sin Photon | Con Photon |
|---------|------------|------------|
| Queries SQL | 1x | 2-8x más rápido |
| Agregaciones | 1x | 3-5x más rápido |
| Joins | 1x | 2-4x más rápido |
| Costo | Base | Similar o menor (menos tiempo) |

### ¿Cuándo usar Photon?

✅ **Sí:**
- SQL Analytics
- ETL con transformaciones SQL
- Agregaciones grandes
- Delta Lake operations

❌ **No tanto:**
- UDFs de Python puro
- Código muy custom
- Clusters pequeños

### Cómo activar:

1. Al crear cluster, elegir Runtime con "Photon"
2. O seleccionar "Use Photon Acceleration"

### Verificar si está activo:
\`\`\`python
# Debería mostrar operaciones con "Photon" en el plan
df.explain()

# O revisar en Spark UI > SQL > Query Details
\`\`\`

### Pricing:
- Photon tiene un costo adicional en DBUs (~1.5x)
- Pero como es más rápido, el costo total suele ser igual o menor`,
        en: `## Photon Engine

Photon is Databricks' native execution engine, written in C++ for maximum performance.

### What is Photon?

\`\`\`
Traditional Spark:
Python → JVM (Java) → Execution

With Photon:
Python → Photon (native C++) → Vectorized execution
\`\`\`

### Benefits:

| Metric | Without Photon | With Photon |
|--------|---------------|-------------|
| SQL Queries | 1x | 2-8x faster |
| Aggregations | 1x | 3-5x faster |
| Joins | 1x | 2-4x faster |
| Cost | Base | Similar or less (less time) |

### When to use Photon?

✅ **Yes:**
- SQL Analytics
- ETL with SQL transformations
- Large aggregations
- Delta Lake operations

❌ **Not so much:**
- Pure Python UDFs
- Very custom code
- Small clusters

### How to activate:

1. When creating cluster, choose Runtime with "Photon"
2. Or select "Use Photon Acceleration"

### Verify if active:
\`\`\`python
# Should show operations with "Photon" in the plan
df.explain()

# Or check in Spark UI > SQL > Query Details
\`\`\`

### Pricing:
- Photon has additional DBU cost (~1.5x)
- But since it's faster, total cost is usually same or less`,
        pt: `## Photon Engine

O Photon é o motor de execução nativo do Databricks, escrito em C++ para performance máxima.

### O que é Photon?

\`\`\`
Spark tradicional:
Python → JVM (Java) → Execução

Com Photon:
Python → Photon (C++ nativo) → Execução vetorizada
\`\`\`

### Benefícios:

| Métrica | Sem Photon | Com Photon |
|---------|------------|------------|
| Queries SQL | 1x | 2-8x mais rápido |
| Agregações | 1x | 3-5x mais rápido |
| Joins | 1x | 2-4x mais rápido |
| Custo | Base | Similar ou menor (menos tempo) |

### Quando usar Photon?

✅ **Sim:**
- SQL Analytics
- ETL com transformações SQL
- Agregações grandes
- Operações Delta Lake

❌ **Nem tanto:**
- UDFs de Python puro
- Código muito custom
- Clusters pequenos

### Como ativar:

1. Ao criar cluster, escolher Runtime com "Photon"
2. Ou selecionar "Use Photon Acceleration"

### Verificar se está ativo:
\`\`\`python
# Deve mostrar operações com "Photon" no plano
df.explain()

# Ou verificar no Spark UI > SQL > Query Details
\`\`\`

### Pricing:
- Photon tem custo adicional em DBUs (~1.5x)
- Mas como é mais rápido, o custo total costuma ser igual ou menor`
      },
      practicalTips: [
        {
          es: '🚀 Photon está incluido automáticamente en serverless compute (Free Edition y planes pagos).',
          en: '🚀 Photon is automatically included in serverless compute (Free Edition and paid plans).',
          pt: '🚀 Photon está incluído automaticamente no serverless compute (Free Edition e planos pagos).'
        },
        {
          es: '💡 En Free Edition, todas tus queries SQL ya usan Photon sin configuración adicional.',
          en: '💡 In Free Edition, all your SQL queries already use Photon without additional configuration.',
          pt: '💡 No Free Edition, todas as suas queries SQL já usam Photon sem configuração adicional.'
        }
      ],
      externalLinks: [
        {
          title: 'Photon Runtime',
          url: 'https://docs.databricks.com/runtime/photon.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '💡 ¿En qué tipo de workloads NO usarías Photon?',
        en: '💡 What type of workloads would you NOT use Photon for?',
        pt: '💡 Em que tipo de workloads você NÃO usaria Photon?'
      },
      xpReward: 20,
      estimatedMinutes: 15
    },
    {
      id: 'db-2-6',
      title: {
        es: 'Workspace, Metastore y Catalog: La Jerarquía',
        en: 'Workspace, Metastore and Catalog: The Hierarchy',
        pt: 'Workspace, Metastore e Catalog: A Hierarquia'
      },
      description: {
        es: 'Entendé cómo se organizan los datos en Databricks: workspace > metastore > catalog > schema > table.',
        en: 'Understand how data is organized in Databricks: workspace > metastore > catalog > schema > table.',
        pt: 'Entenda como os dados são organizados no Databricks: workspace > metastore > catalog > schema > table.'
      },
      theory: {
        es: `## Jerarquía de Datos en Databricks

### Modelo de 3 niveles (Unity Catalog):

\`\`\`
                    METASTORE
                        │
         ┌──────────────┼──────────────┐
         │              │              │
      CATALOG 1     CATALOG 2     CATALOG 3
         │              │              │
    ┌────┼────┐    ┌────┼────┐   ┌────┼────┐
    │    │    │    │    │    │   │    │    │
  SCHEMA SCHEMA  SCHEMA SCHEMA SCHEMA SCHEMA
    │
  TABLES, VIEWS, FUNCTIONS
\`\`\`

### Componentes:

**Metastore:**
- Contenedor de nivel más alto
- Uno por región de cloud
- Almacena metadata de todos los objetos

**Catalog:**
- Agrupa schemas relacionados
- Ejemplo: \`dev\`, \`staging\`, \`prod\`

**Schema (Database):**
- Agrupa tablas relacionadas
- Ejemplo: \`sales\`, \`marketing\`, \`finance\`

**Table:**
- Los datos en sí
- Managed o External

### Nombres completos:

\`\`\`sql
-- Tres partes: catalog.schema.table
SELECT * FROM prod.sales.orders

-- Si estás en el catalog/schema correcto
USE CATALOG prod;
USE SCHEMA sales;
SELECT * FROM orders;
\`\`\`

### Hive Metastore (legacy) vs Unity Catalog:

| Feature | Hive | Unity Catalog |
|---------|------|---------------|
| Governance | ❌ | ✅ |
| Cross-workspace | ❌ | ✅ |
| Row-level security | ❌ | ✅ |
| Audit logs | Básico | Completo |`,
        en: `## Data Hierarchy in Databricks

### 3-level model (Unity Catalog):

\`\`\`
                    METASTORE
                        │
         ┌──────────────┼──────────────┐
         │              │              │
      CATALOG 1     CATALOG 2     CATALOG 3
         │              │              │
    ┌────┼────┐    ┌────┼────┐   ┌────┼────┐
    │    │    │    │    │    │   │    │    │
  SCHEMA SCHEMA  SCHEMA SCHEMA SCHEMA SCHEMA
    │
  TABLES, VIEWS, FUNCTIONS
\`\`\`

### Components:

**Metastore:**
- Top-level container
- One per cloud region
- Stores metadata for all objects

**Catalog:**
- Groups related schemas
- Example: \`dev\`, \`staging\`, \`prod\`

**Schema (Database):**
- Groups related tables
- Example: \`sales\`, \`marketing\`, \`finance\`

**Table:**
- The data itself
- Managed or External

### Full names:

\`\`\`sql
-- Three parts: catalog.schema.table
SELECT * FROM prod.sales.orders

-- If you're in the right catalog/schema
USE CATALOG prod;
USE SCHEMA sales;
SELECT * FROM orders;
\`\`\`

### Hive Metastore (legacy) vs Unity Catalog:

| Feature | Hive | Unity Catalog |
|---------|------|---------------|
| Governance | ❌ | ✅ |
| Cross-workspace | ❌ | ✅ |
| Row-level security | ❌ | ✅ |
| Audit logs | Basic | Complete |`,
        pt: `## Hierarquia de Dados no Databricks

### Modelo de 3 níveis (Unity Catalog):

\`\`\`
                    METASTORE
                        │
         ┌──────────────┼──────────────┐
         │              │              │
      CATALOG 1     CATALOG 2     CATALOG 3
         │              │              │
    ┌────┼────┐    ┌────┼────┐   ┌────┼────┐
    │    │    │    │    │    │   │    │    │
  SCHEMA SCHEMA  SCHEMA SCHEMA SCHEMA SCHEMA
    │
  TABLES, VIEWS, FUNCTIONS
\`\`\`

### Componentes:

**Metastore:**
- Container de nível mais alto
- Um por região de cloud
- Armazena metadata de todos os objetos

**Catalog:**
- Agrupa schemas relacionados
- Exemplo: \`dev\`, \`staging\`, \`prod\`

**Schema (Database):**
- Agrupa tabelas relacionadas
- Exemplo: \`sales\`, \`marketing\`, \`finance\`

**Table:**
- Os dados em si
- Managed ou External

### Nomes completos:

\`\`\`sql
-- Três partes: catalog.schema.table
SELECT * FROM prod.sales.orders

-- Se você está no catalog/schema correto
USE CATALOG prod;
USE SCHEMA sales;
SELECT * FROM orders;
\`\`\`

### Hive Metastore (legacy) vs Unity Catalog:

| Feature | Hive | Unity Catalog |
|---------|------|---------------|
| Governance | ❌ | ✅ |
| Cross-workspace | ❌ | ✅ |
| Row-level security | ❌ | ✅ |
| Audit logs | Básico | Completo |`
      },
      practicalTips: [
        {
          es: '🎯 Unity Catalog es el futuro. Si tu empresa aún usa Hive Metastore, planificá la migración.',
          en: '🎯 Unity Catalog is the future. If your company still uses Hive Metastore, plan the migration.',
          pt: '🎯 Unity Catalog é o futuro. Se sua empresa ainda usa Hive Metastore, planeje a migração.'
        }
      ],
      externalLinks: [
        {
          title: 'Unity Catalog Overview',
          url: 'https://docs.databricks.com/data-governance/unity-catalog/index.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '🤔 ¿Cuál es la diferencia entre un Catalog y un Schema?',
        en: '🤔 What\'s the difference between a Catalog and a Schema?',
        pt: '🤔 Qual é a diferença entre um Catalog e um Schema?'
      },
      xpReward: 20,
      estimatedMinutes: 20
    },
    {
      id: 'db-2-7',
      title: {
        es: 'Managed vs External Tables',
        en: 'Managed vs External Tables',
        pt: 'Managed vs External Tables'
      },
      description: {
        es: 'Dos formas de almacenar datos con comportamientos muy diferentes. Elegí bien.',
        en: 'Two ways to store data with very different behaviors. Choose wisely.',
        pt: 'Duas formas de armazenar dados com comportamentos muito diferentes. Escolha bem.'
      },
      theory: {
        es: `## Managed vs External Tables

### Managed Tables (Default)
\`\`\`
┌──────────────────────────────────┐
│         MANAGED TABLE            │
├──────────────────────────────────┤
│ • Databricks controla los datos  │
│ • Ubicación: metastore default   │
│ • DROP TABLE = borra datos       │
│ • Ideal para datos intermedios   │
└──────────────────────────────────┘
\`\`\`

\`\`\`sql
-- Crear managed table
CREATE TABLE mi_tabla (
  id INT,
  nombre STRING
);

-- Los datos se guardan en ubicación default
-- dbfs:/user/hive/warehouse/mi_tabla
\`\`\`

### External Tables
\`\`\`
┌──────────────────────────────────┐
│        EXTERNAL TABLE            │
├──────────────────────────────────┤
│ • Vos controlás la ubicación     │
│ • Ubicación: donde vos digas     │
│ • DROP TABLE = solo borra metadata │
│ • Ideal para data lake           │
└──────────────────────────────────┘
\`\`\`

\`\`\`sql
-- Crear external table
CREATE TABLE mi_tabla_ext (
  id INT,
  nombre STRING
)
LOCATION 's3://mi-bucket/datos/mi_tabla';

-- DROP solo borra la definición, no los archivos
\`\`\`

### Comparación:

| Aspecto | Managed | External |
|---------|---------|----------|
| Control ubicación | Databricks | Usuario |
| DROP TABLE | Borra todo | Solo metadata |
| Backup | Más complejo | Fácil (tu storage) |
| Costo storage | DBU incluido | Tu cuenta cloud |
| Compartir datos | Difícil | Fácil |

### ¿Cuándo usar cada una?

**Managed:**
- Tablas temporales
- Resultados intermedios de ETL
- Datos que no necesitás fuera de Databricks

**External:**
- Data Lake
- Datos compartidos entre herramientas
- Datos que ya existen en S3/ADLS/GCS
- Producción`,
        en: `## Managed vs External Tables

### Managed Tables (Default)
\`\`\`
┌──────────────────────────────────┐
│         MANAGED TABLE            │
├──────────────────────────────────┤
│ • Databricks controls the data   │
│ • Location: default metastore    │
│ • DROP TABLE = deletes data      │
│ • Ideal for intermediate data    │
└──────────────────────────────────┘
\`\`\`

\`\`\`sql
-- Create managed table
CREATE TABLE my_table (
  id INT,
  name STRING
);

-- Data is saved in default location
-- dbfs:/user/hive/warehouse/my_table
\`\`\`

### External Tables
\`\`\`
┌──────────────────────────────────┐
│        EXTERNAL TABLE            │
├──────────────────────────────────┤
│ • You control the location       │
│ • Location: wherever you say     │
│ • DROP TABLE = only deletes metadata │
│ • Ideal for data lake            │
└──────────────────────────────────┘
\`\`\`

\`\`\`sql
-- Create external table
CREATE TABLE my_ext_table (
  id INT,
  name STRING
)
LOCATION 's3://my-bucket/data/my_table';

-- DROP only deletes definition, not files
\`\`\`

### Comparison:

| Aspect | Managed | External |
|--------|---------|----------|
| Location control | Databricks | User |
| DROP TABLE | Deletes all | Only metadata |
| Backup | More complex | Easy (your storage) |
| Storage cost | DBU included | Your cloud account |
| Share data | Difficult | Easy |

### When to use each?

**Managed:**
- Temporary tables
- Intermediate ETL results
- Data you don't need outside Databricks

**External:**
- Data Lake
- Data shared between tools
- Data already in S3/ADLS/GCS
- Production`,
        pt: `## Managed vs External Tables

### Managed Tables (Padrão)
\`\`\`
┌──────────────────────────────────┐
│         MANAGED TABLE            │
├──────────────────────────────────┤
│ • Databricks controla os dados   │
│ • Localização: metastore padrão  │
│ • DROP TABLE = apaga dados       │
│ • Ideal para dados intermediários│
└──────────────────────────────────┘
\`\`\`

\`\`\`sql
-- Criar managed table
CREATE TABLE minha_tabela (
  id INT,
  nome STRING
);

-- Os dados são salvos na localização padrão
-- dbfs:/user/hive/warehouse/minha_tabela
\`\`\`

### External Tables
\`\`\`
┌──────────────────────────────────┐
│        EXTERNAL TABLE            │
├──────────────────────────────────┤
│ • Você controla a localização    │
│ • Localização: onde você disser  │
│ • DROP TABLE = só apaga metadata │
│ • Ideal para data lake           │
└──────────────────────────────────┘
\`\`\`

\`\`\`sql
-- Criar external table
CREATE TABLE minha_tabela_ext (
  id INT,
  nome STRING
)
LOCATION 's3://meu-bucket/dados/minha_tabela';

-- DROP só apaga a definição, não os arquivos
\`\`\`

### Comparação:

| Aspecto | Managed | External |
|---------|---------|----------|
| Controle localização | Databricks | Usuário |
| DROP TABLE | Apaga tudo | Só metadata |
| Backup | Mais complexo | Fácil (seu storage) |
| Custo storage | DBU incluído | Sua conta cloud |
| Compartilhar dados | Difícil | Fácil |

### Quando usar cada uma?

**Managed:**
- Tabelas temporárias
- Resultados intermediários de ETL
- Dados que você não precisa fora do Databricks

**External:**
- Data Lake
- Dados compartilhados entre ferramentas
- Dados que já existem no S3/ADLS/GCS
- Produção`
      },
      practicalTips: [
        {
          es: '⚠️ Cuidado con DROP en managed tables en producción. Los datos se borran para siempre!',
          en: '⚠️ Be careful with DROP on managed tables in production. Data is deleted forever!',
          pt: '⚠️ Cuidado com DROP em managed tables em produção. Os dados são apagados para sempre!'
        }
      ],
      externalLinks: [
        {
          title: 'Managed vs External Tables',
          url: 'https://docs.databricks.com/data-governance/unity-catalog/create-tables.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '💡 ¿Qué pasa si hago DROP TABLE en una external table?',
        en: '💡 What happens if I DROP TABLE on an external table?',
        pt: '💡 O que acontece se eu fizer DROP TABLE em uma external table?'
      },
      xpReward: 20,
      estimatedMinutes: 15
    },
    {
      id: 'db-2-8',
      title: {
        es: 'DBUs: La Moneda de Databricks',
        en: 'DBUs: The Databricks Currency',
        pt: 'DBUs: A Moeda do Databricks'
      },
      description: {
        es: 'Entendé cómo se cobra Databricks para optimizar costos.',
        en: 'Understand how Databricks charges to optimize costs.',
        pt: 'Entenda como o Databricks cobra para otimizar custos.'
      },
      theory: {
        es: `## DBUs - Databricks Units

Un DBU es la unidad de procesamiento de Databricks. Es como "créditos" que consumís al usar la plataforma.

### Fórmula de costo:

\`\`\`
Costo Total = (DBUs consumidos × Precio por DBU) + Costo de infraestructura cloud
\`\`\`

### Factores que afectan DBUs:

| Factor | Impacto en DBUs |
|--------|-----------------|
| Tamaño del cluster | Más grande = más DBUs/hora |
| Tipo de cluster | Job < All-Purpose |
| Runtime | Photon consume más DBUs |
| Tiempo encendido | Más tiempo = más DBUs |

### Ejemplo de consumo:

\`\`\`
Cluster i3.xlarge (4 DBUs/hora)
× 8 horas de uso
× $0.40 por DBU (ejemplo)
= $12.80 en DBUs

+ Costo EC2 de AWS
= Costo total
\`\`\`

### Tips para reducir costos:

1. **Auto-terminate**: Siempre configurar (ej: 30 min)
2. **Job clusters**: Para producción (50% menos DBUs)
3. **Spot instances**: 60-90% descuento en compute
4. **Right-sizing**: No sobredimensionar clusters
5. **Photon**: Aunque cuesta más DBUs, puede ser más barato por velocidad

### Monitorear costos:

\`\`\`sql
-- Ver uso de DBUs (requiere permisos admin)
SELECT * FROM system.billing.usage
WHERE usage_date >= current_date - 30
\`\`\`

### Tags para tracking:

\`\`\`python
# Al crear cluster, agregar tags
{
  "proyecto": "ventas-etl",
  "equipo": "data-engineering",
  "ambiente": "produccion"
}
\`\`\``,
        en: `## DBUs - Databricks Units

A DBU is Databricks' processing unit. It's like "credits" you consume when using the platform.

### Cost formula:

\`\`\`
Total Cost = (DBUs consumed × Price per DBU) + Cloud infrastructure cost
\`\`\`

### Factors affecting DBUs:

| Factor | DBU Impact |
|--------|------------|
| Cluster size | Bigger = more DBUs/hour |
| Cluster type | Job < All-Purpose |
| Runtime | Photon consumes more DBUs |
| Time running | More time = more DBUs |

### Consumption example:

\`\`\`
i3.xlarge cluster (4 DBUs/hour)
× 8 hours of use
× $0.40 per DBU (example)
= $12.80 in DBUs

+ AWS EC2 cost
= Total cost
\`\`\`

### Tips to reduce costs:

1. **Auto-terminate**: Always configure (e.g., 30 min)
2. **Job clusters**: For production (50% less DBUs)
3. **Spot instances**: 60-90% compute discount
4. **Right-sizing**: Don't over-provision clusters
5. **Photon**: Although it costs more DBUs, can be cheaper due to speed

### Monitor costs:

\`\`\`sql
-- View DBU usage (requires admin permissions)
SELECT * FROM system.billing.usage
WHERE usage_date >= current_date - 30
\`\`\`

### Tags for tracking:

\`\`\`python
# When creating cluster, add tags
{
  "project": "sales-etl",
  "team": "data-engineering",
  "environment": "production"
}
\`\`\``,
        pt: `## DBUs - Databricks Units

Um DBU é a unidade de processamento do Databricks. É como "créditos" que você consome ao usar a plataforma.

### Fórmula de custo:

\`\`\`
Custo Total = (DBUs consumidos × Preço por DBU) + Custo de infraestrutura cloud
\`\`\`

### Fatores que afetam DBUs:

| Fator | Impacto em DBUs |
|-------|-----------------|
| Tamanho do cluster | Maior = mais DBUs/hora |
| Tipo de cluster | Job < All-Purpose |
| Runtime | Photon consome mais DBUs |
| Tempo ligado | Mais tempo = mais DBUs |

### Exemplo de consumo:

\`\`\`
Cluster i3.xlarge (4 DBUs/hora)
× 8 horas de uso
× $0.40 por DBU (exemplo)
= $12.80 em DBUs

+ Custo EC2 da AWS
= Custo total
\`\`\`

### Dicas para reduzir custos:

1. **Auto-terminate**: Sempre configurar (ex: 30 min)
2. **Job clusters**: Para produção (50% menos DBUs)
3. **Spot instances**: 60-90% desconto em compute
4. **Right-sizing**: Não superdimensionar clusters
5. **Photon**: Embora custe mais DBUs, pode ser mais barato pela velocidade

### Monitorar custos:

\`\`\`sql
-- Ver uso de DBUs (requer permissões admin)
SELECT * FROM system.billing.usage
WHERE usage_date >= current_date - 30
\`\`\`

### Tags para tracking:

\`\`\`python
# Ao criar cluster, adicionar tags
{
  "projeto": "vendas-etl",
  "equipe": "data-engineering",
  "ambiente": "producao"
}
\`\`\``
      },
      practicalTips: [
        {
          es: '💰 Configurar alertas de billing cuando el consumo supere X%. Evitá sorpresas.',
          en: '💰 Set billing alerts when consumption exceeds X%. Avoid surprises.',
          pt: '💰 Configure alertas de billing quando o consumo ultrapassar X%. Evite surpresas.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks Pricing',
          url: 'https://www.databricks.com/product/pricing',
          type: 'article'
        },
        {
          title: 'Cost Management',
          url: 'https://docs.databricks.com/administration-guide/account-settings/billable-usage.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '💡 ¿Cómo reducirías el costo de un ETL que corre 4 horas diarias?',
        en: '💡 How would you reduce the cost of an ETL that runs 4 hours daily?',
        pt: '💡 Como você reduziria o custo de um ETL que roda 4 horas por dia?'
      },
      xpReward: 25,
      estimatedMinutes: 20
    },
    {
      id: 'db-2-8b',
      title: {
        es: 'Cluster Policies: Governance de Clusters',
        en: 'Cluster Policies: Cluster Governance',
        pt: 'Cluster Policies: Governança de Clusters'
      },
      description: {
        es: 'Controla qué tipos de clusters pueden crear los usuarios en tu workspace.',
        en: 'Control what types of clusters users can create in your workspace.',
        pt: 'Controle quais tipos de clusters os usuários podem criar no seu workspace.'
      },
      theory: {
        es: `## Cluster Policies: Governance Empresarial

Las Cluster Policies permiten a los admins **controlar y estandarizar** la creación de clusters. Esto es CRÍTICO para:
- Controlar costos
- Garantizar seguridad
- Estandarizar configuraciones

### ¿Por qué son Importantes?

\`\`\`
Sin Policies:                    Con Policies:
                                 
Usuario A: i3.2xlarge x 10      ┌──────────────────────────┐
Usuario B: i3.4xlarge x 20      │     CLUSTER POLICY       │
Usuario C: i3.8xlarge x 5       │                          │
         ↓                      │ • Max 4 workers          │
    COSTOS SIN CONTROL          │ • Solo i3.xlarge         │
    $$$$$$$                     │ • Autotermination ON     │
                                │ • Spot instances         │
                                └──────────────────────────┘
                                          ↓
                                  COSTOS CONTROLADOS
                                  $$
\`\`\`

### Estructura de una Policy

\`\`\`json
{
  "name": "Data Engineering Standard",
  "definition": {
    "spark_version": {
      "type": "fixed",
      "value": "14.3.x-scala2.12"
    },
    "node_type_id": {
      "type": "allowlist",
      "values": ["i3.xlarge", "i3.2xlarge"]
    },
    "autoscale.max_workers": {
      "type": "range",
      "maxValue": 10
    },
    "autotermination_minutes": {
      "type": "fixed",
      "value": 30,
      "hidden": true
    },
    "custom_tags.team": {
      "type": "fixed",
      "value": "data-engineering"
    }
  }
}
\`\`\`

### Tipos de Restricciones

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| \`fixed\` | Valor fijo, no modificable | Runtime específico |
| \`allowlist\` | Solo valores de la lista | Tipos de instancia |
| \`blocklist\` | Prohibir valores | No usar GPU |
| \`range\` | Rango numérico | Max 10 workers |
| \`unlimited\` | Sin restricción | Usuario decide |
| \`regex\` | Debe matchear regex | Nombre del cluster |

### Ejemplo: Policy para Desarrollo

\`\`\`json
{
  "name": "Dev - Cost Optimized",
  "description": "Para desarrollo y experimentación",
  "definition": {
    "spark_version": {
      "type": "allowlist",
      "values": ["14.3.x-scala2.12", "14.3.x-scala2.12"],
      "defaultValue": "14.3.x-scala2.12"
    },
    "node_type_id": {
      "type": "allowlist",
      "values": ["i3.xlarge", "m5.large"],
      "defaultValue": "i3.xlarge"
    },
    "driver_node_type_id": {
      "type": "fixed",
      "value": "i3.xlarge"
    },
    "autoscale.min_workers": {
      "type": "fixed",
      "value": 1
    },
    "autoscale.max_workers": {
      "type": "range",
      "maxValue": 4,
      "defaultValue": 2
    },
    "autotermination_minutes": {
      "type": "range",
      "minValue": 10,
      "maxValue": 60,
      "defaultValue": 30
    },
    "aws_attributes.availability": {
      "type": "fixed",
      "value": "SPOT_WITH_FALLBACK"
    }
  }
}
\`\`\`

### Ejemplo: Policy para Producción

\`\`\`json
{
  "name": "Production - High Availability",
  "description": "Para jobs críticos de producción",
  "definition": {
    "spark_version": {
      "type": "fixed",
      "value": "14.3.x-scala2.12"
    },
    "node_type_id": {
      "type": "fixed",
      "value": "i3.2xlarge"
    },
    "autoscale.min_workers": {
      "type": "range",
      "minValue": 2
    },
    "autoscale.max_workers": {
      "type": "range",
      "maxValue": 20
    },
    "autotermination_minutes": {
      "type": "fixed",
      "value": 0,
      "hidden": true
    },
    "aws_attributes.availability": {
      "type": "fixed",
      "value": "ON_DEMAND"
    },
    "cluster_log_conf.type": {
      "type": "fixed",
      "value": "S3"
    }
  }
}
\`\`\`

### Crear Policy via UI

1. **Compute** → **Cluster Policies** → **Create Policy**
2. Nombrar la policy
3. Definir restricciones en JSON
4. Asignar a grupos de usuarios

### Crear Policy via API

\`\`\`python
import requests

policy = {
    "name": "My Policy",
    "definition": {
        "autoscale.max_workers": {
            "type": "range",
            "maxValue": 5
        }
    }
}

response = requests.post(
    f"{databricks_url}/api/2.0/policies/clusters/create",
    headers={"Authorization": f"Bearer {token}"},
    json=policy
)
\`\`\`

### Instance Pools (Complemento de Policies)

Los Instance Pools pre-aprovisionan VMs para reducir el tiempo de inicio:

\`\`\`
Sin Pool:                       Con Pool:
                               
Crear cluster                   ┌─────────────────────┐
      ↓                        │   INSTANCE POOL     │
Solicitar VMs a AWS            │                     │
      ↓ (2-5 min)              │  VM VM VM VM VM     │
VMs listas                     │  (pre-aprovisionadas)│
      ↓                        └─────────────────────┘
Cluster listo                           ↓
                                Crear cluster
Total: 3-8 min                         ↓ (30 seg)
                                Cluster listo
                               
                               Total: 30-60 seg
\`\`\`

### Crear un Pool

\`\`\`json
{
  "instance_pool_name": "Data Engineering Pool",
  "node_type_id": "i3.xlarge",
  "min_idle_instances": 2,
  "max_capacity": 20,
  "idle_instance_autotermination_minutes": 30
}
\`\`\``,
        en: `## Cluster Policies: Enterprise Governance

Cluster Policies let admins **control and standardize** cluster creation.

\`\`\`json
{
  "name": "Standard Policy",
  "definition": {
    "autoscale.max_workers": {
      "type": "range",
      "maxValue": 10
    },
    "autotermination_minutes": {
      "type": "fixed",
      "value": 30
    }
  }
}
\`\`\`

### Key Benefits
- Cost control
- Security compliance
- Standardized configurations`,
        pt: `## Cluster Policies: Governança Empresarial

Cluster Policies permitem aos admins **controlar e padronizar** a criação de clusters.

\`\`\`json
{
  "name": "Policy Padrão",
  "definition": {
    "autoscale.max_workers": {
      "type": "range",
      "maxValue": 10
    }
  }
}
\`\`\``
      },
      practicalTips: [
        { es: '💰 Las policies son ESENCIALES para controlar costos en empresas grandes.', en: '💰 Policies are ESSENTIAL for cost control in large enterprises.', pt: '💰 Policies são ESSENCIAIS para controle de custos em grandes empresas.' },
        { es: '🔒 Usa "fixed" + "hidden" para configuraciones que los usuarios no deben cambiar.', en: '🔒 Use "fixed" + "hidden" for settings users should not change.', pt: '🔒 Use "fixed" + "hidden" para configurações que os usuários não devem alterar.' },
        { es: '⚡ Instance Pools + Policies = clusters rápidos y controlados.', en: '⚡ Instance Pools + Policies = fast and controlled clusters.', pt: '⚡ Instance Pools + Policies = clusters rápidos e controlados.' }
      ],
      externalLinks: [
        { title: 'Cluster Policies', url: 'https://docs.databricks.com/administration-guide/clusters/policies.html', type: 'docs' },
        { title: 'Instance Pools', url: 'https://docs.databricks.com/clusters/instance-pools/index.html', type: 'docs' }
      ],
      checkpoint: {
        es: '✅ ¿Sabés qué restricciones pondrías en una policy de desarrollo vs producción?',
        en: '✅ Do you know what restrictions you would put in a dev vs production policy?',
        pt: '✅ Você sabe quais restrições colocaria em uma policy de dev vs produção?'
      },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-2-9',
      title: {
        es: 'Quiz: Arquitectura de Databricks',
        en: 'Quiz: Databricks Architecture',
        pt: 'Quiz: Arquitetura do Databricks'
      },
      description: {
        es: 'Poné a prueba lo que aprendiste sobre la arquitectura.',
        en: 'Test what you learned about architecture.',
        pt: 'Teste o que você aprendeu sobre arquitetura.'
      },
      theory: {
        es: `## 📝 Quiz de Arquitectura

Respondé estas preguntas para verificar tu comprensión:

### Pregunta 1:
¿Dónde corren tus clusters de Databricks?
- a) En servidores de Databricks
- b) En tu cuenta de cloud (AWS/Azure/GCP)
- c) En ambos

### Pregunta 2:
¿Qué pasa cuando hacés DROP TABLE en una managed table?
- a) Solo se borra la metadata
- b) Se borran los datos y la metadata
- c) Se mueven los datos a backup

### Pregunta 3:
¿Qué tipo de cluster usarías para un job de producción schedulado?
- a) All-Purpose cluster
- b) Job cluster
- c) Cualquiera da igual

### Pregunta 4:
Photon Engine es más rápido porque:
- a) Usa más memoria
- b) Está escrito en C++ con ejecución vectorizada
- c) Usa GPUs

### Pregunta 5:
¿Cuál es el orden correcto de la jerarquía de datos en Unity Catalog?
- a) Schema > Catalog > Table
- b) Catalog > Schema > Table
- c) Table > Schema > Catalog

---

### Respuestas:
1. b) En tu cuenta de cloud
2. b) Se borran datos y metadata
3. b) Job cluster (más barato)
4. b) C++ con ejecución vectorizada
5. b) Catalog > Schema > Table

### ¿Cuántas acertaste?
- 5/5: 🏆 Excelente! Entendés la arquitectura
- 3-4/5: 👍 Bien, repasá los puntos que fallaste
- 0-2/5: 📚 Volvé a leer la fase antes de continuar`,
        en: `## 📝 Architecture Quiz

Answer these questions to verify your understanding:

### Question 1:
Where do your Databricks clusters run?
- a) On Databricks servers
- b) In your cloud account (AWS/Azure/GCP)
- c) In both

### Question 2:
What happens when you DROP TABLE on a managed table?
- a) Only metadata is deleted
- b) Data and metadata are deleted
- c) Data is moved to backup

### Question 3:
What cluster type would you use for a scheduled production job?
- a) All-Purpose cluster
- b) Job cluster
- c) Either one is fine

### Question 4:
Photon Engine is faster because:
- a) It uses more memory
- b) It's written in C++ with vectorized execution
- c) It uses GPUs

### Question 5:
What's the correct order of data hierarchy in Unity Catalog?
- a) Schema > Catalog > Table
- b) Catalog > Schema > Table
- c) Table > Schema > Catalog

---

### Answers:
1. b) In your cloud account
2. b) Data and metadata are deleted
3. b) Job cluster (cheaper)
4. b) C++ with vectorized execution
5. b) Catalog > Schema > Table

### How many did you get right?
- 5/5: 🏆 Excellent! You understand the architecture
- 3-4/5: 👍 Good, review the points you missed
- 0-2/5: 📚 Re-read the phase before continuing`,
        pt: `## 📝 Quiz de Arquitetura

Responda estas perguntas para verificar sua compreensão:

### Pergunta 1:
Onde seus clusters do Databricks rodam?
- a) Em servidores do Databricks
- b) Na sua conta de cloud (AWS/Azure/GCP)
- c) Em ambos

### Pergunta 2:
O que acontece quando você faz DROP TABLE em uma managed table?
- a) Só a metadata é deletada
- b) Os dados e a metadata são deletados
- c) Os dados são movidos para backup

### Pergunta 3:
Que tipo de cluster você usaria para um job de produção schedulado?
- a) All-Purpose cluster
- b) Job cluster
- c) Qualquer um serve

### Pergunta 4:
Photon Engine é mais rápido porque:
- a) Usa mais memória
- b) É escrito em C++ com execução vetorizada
- c) Usa GPUs

### Pergunta 5:
Qual é a ordem correta da hierarquia de dados no Unity Catalog?
- a) Schema > Catalog > Table
- b) Catalog > Schema > Table
- c) Table > Schema > Catalog

---

### Respostas:
1. b) Na sua conta de cloud
2. b) Dados e metadata são deletados
3. b) Job cluster (mais barato)
4. b) C++ com execução vetorizada
5. b) Catalog > Schema > Table

### Quantas você acertou?
- 5/5: 🏆 Excelente! Você entende a arquitetura
- 3-4/5: 👍 Bom, revise os pontos que errou
- 0-2/5: 📚 Releia a fase antes de continuar`
      },
      practicalTips: [
        {
          es: '📝 Estas preguntas son similares a las del examen de certificación.',
          en: '📝 These questions are similar to certification exam questions.',
          pt: '📝 Estas perguntas são similares às do exame de certificação.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks Certification Prep',
          url: 'https://www.databricks.com/learn/certification',
          type: 'article'
        }
      ],
      checkpoint: {
        es: '🏆 ¿Acertaste 4 o más? Si no, repasá antes de seguir.',
        en: '🏆 Did you get 4 or more right? If not, review before continuing.',
        pt: '🏆 Você acertou 4 ou mais? Se não, revise antes de continuar.'
      },
      xpReward: 30,
      estimatedMinutes: 15
    }
  ]
};


