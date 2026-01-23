/**
 * FASE 1: Setup & Fundamentos de Databricks
 * 10 pasos detallados para comenzar con Databricks Free Edition (2026)
 * 
 * ACTUALIZADO: Enero 2026 - Migración de Community Edition a Free Edition
 * - Serverless compute (no más clusters manuales)
 * - Databricks Assistant incluido
 * - Unity Catalog básico disponible
 * - Solo Python y SQL (no R ni Scala)
 */

import { DatabricksPhase } from '../types';

export const PHASE_1_SETUP: DatabricksPhase = {
  id: 'db-phase-1',
  number: 1,
  title: {
    es: 'Setup & Fundamentos',
    en: 'Setup & Fundamentals',
    pt: 'Setup & Fundamentos'
  },
  subtitle: {
    es: 'Tu primer contacto con Databricks',
    en: 'Your first contact with Databricks',
    pt: 'Seu primeiro contato com Databricks'
  },
  description: {
    es: 'Aprenderás a crear tu cuenta gratuita en Databricks Free Edition, entender la arquitectura básica con serverless compute, y ejecutar tu primer notebook con la ayuda del Databricks Assistant. Esta fase sienta las bases para todo lo que viene.',
    en: 'You will learn to create your free account on Databricks Free Edition, understand the basic architecture with serverless compute, and run your first notebook with the help of Databricks Assistant. This phase lays the foundation for everything that follows.',
    pt: 'Você aprenderá a criar sua conta gratuita no Databricks Free Edition, entender a arquitetura básica com serverless compute, e executar seu primeiro notebook com a ajuda do Databricks Assistant. Esta fase estabelece as bases para tudo o que vem a seguir.'
  },
  icon: '🚀',
  color: 'emerald',
  estimatedDays: '3-4 días',
  steps: [
    // PASO 1.1
    {
      id: 'db-1-1',
      title: {
        es: '¿Qué es Databricks y por qué aprenderlo?',
        en: 'What is Databricks and why learn it?',
        pt: 'O que é Databricks e por que aprender?'
      },
      description: {
        es: 'Entendé qué problema resuelve Databricks y por qué es la plataforma más demandada del mercado.',
        en: 'Understand what problem Databricks solves and why it is the most in-demand platform in the market.',
        pt: 'Entenda qual problema o Databricks resolve e por que é a plataforma mais demandada do mercado.'
      },
      theory: {
        es: `## ¿Qué es Databricks?

Databricks es una **plataforma unificada de datos y AI** fundada por los creadores de Apache Spark. Combina:

- **Data Engineering**: Pipelines de datos escalables
- **Data Science**: Notebooks colaborativos
- **Machine Learning**: MLflow integrado
- **Data Warehousing**: SQL Analytics

### El Problema que Resuelve

Antes de Databricks, las empresas tenían:
- Data Lakes desordenados ("data swamps")
- Múltiples herramientas desconectadas
- Silos entre equipos de datos
- Dificultad para hacer ML en producción

### Databricks Lakehouse

Databricks introdujo el concepto de **Lakehouse**, que combina:
- La flexibilidad de un Data Lake (almacena cualquier dato)
- La confiabilidad de un Data Warehouse (ACID, schema enforcement)

### ¿Por qué es tan demandado?

1. **Empresas top lo usan**: Shell, Comcast, Regeneron, HSBC
2. **Salarios altos**: DE con Databricks ganan 20-30% más
3. **Crecimiento**: #1 en Gartner Magic Quadrant
4. **Ecosistema**: Spark + Delta Lake + MLflow + Unity Catalog`,
        en: `## What is Databricks?

Databricks is a **unified data and AI platform** founded by the creators of Apache Spark. It combines:

- **Data Engineering**: Scalable data pipelines
- **Data Science**: Collaborative notebooks
- **Machine Learning**: Integrated MLflow
- **Data Warehousing**: SQL Analytics

### The Problem it Solves

Before Databricks, companies had:
- Messy Data Lakes ("data swamps")
- Multiple disconnected tools
- Silos between data teams
- Difficulty putting ML in production

### Databricks Lakehouse

Databricks introduced the **Lakehouse** concept, combining:
- The flexibility of a Data Lake (stores any data)
- The reliability of a Data Warehouse (ACID, schema enforcement)

### Why is it so in-demand?

1. **Top companies use it**: Shell, Comcast, Regeneron, HSBC
2. **High salaries**: DEs with Databricks earn 20-30% more
3. **Growth**: #1 in Gartner Magic Quadrant
4. **Ecosystem**: Spark + Delta Lake + MLflow + Unity Catalog`,
        pt: `## O que é Databricks?

Databricks é uma **plataforma unificada de dados e IA** fundada pelos criadores do Apache Spark. Combina:

- **Data Engineering**: Pipelines de dados escaláveis
- **Data Science**: Notebooks colaborativos
- **Machine Learning**: MLflow integrado
- **Data Warehousing**: SQL Analytics

### O Problema que Resolve

Antes do Databricks, as empresas tinham:
- Data Lakes desorganizados ("data swamps")
- Múltiplas ferramentas desconectadas
- Silos entre equipes de dados
- Dificuldade para colocar ML em produção

### Databricks Lakehouse

Databricks introduziu o conceito de **Lakehouse**, que combina:
- A flexibilidade de um Data Lake (armazena qualquer dado)
- A confiabilidade de um Data Warehouse (ACID, schema enforcement)

### Por que é tão demandado?

1. **Empresas top usam**: Shell, Comcast, Regeneron, HSBC
2. **Salários altos**: DEs com Databricks ganham 20-30% mais
3. **Crescimento**: #1 no Gartner Magic Quadrant
4. **Ecossistema**: Spark + Delta Lake + MLflow + Unity Catalog`
      },
      practicalTips: [
        {
          es: '💡 Databricks Free Edition es GRATIS y suficiente para aprender todo lo básico e intermedio. Incluye serverless compute, Delta Lake, Unity Catalog básico y Databricks Assistant.',
          en: '💡 Databricks Free Edition is FREE and sufficient to learn all basic and intermediate concepts. Includes serverless compute, Delta Lake, basic Unity Catalog and Databricks Assistant.',
          pt: '💡 Databricks Free Edition é GRATUITO e suficiente para aprender todos os conceitos básicos e intermediários. Inclui serverless compute, Delta Lake, Unity Catalog básico e Databricks Assistant.'
        },
        {
          es: '🎯 Agregá "Databricks" a tu LinkedIn ahora mismo. Es un keyword que atrae recruiters.',
          en: '🎯 Add "Databricks" to your LinkedIn right now. It\'s a keyword that attracts recruiters.',
          pt: '🎯 Adicione "Databricks" ao seu LinkedIn agora mesmo. É uma keyword que atrai recrutadores.'
        },
        {
          es: '🤖 El Databricks Assistant (IA) está incluido gratis y te ayuda a escribir código, explicar errores y optimizar queries.',
          en: '🤖 Databricks Assistant (AI) is included for free and helps you write code, explain errors and optimize queries.',
          pt: '🤖 O Databricks Assistant (IA) está incluído gratuitamente e ajuda a escrever código, explicar erros e otimizar queries.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks Official Website',
          url: 'https://www.databricks.com/',
          type: 'docs'
        },
        {
          title: 'What is a Data Lakehouse? (Official Docs)',
          url: 'https://www.databricks.com/glossary/data-lakehouse',
          type: 'docs'
        },
        {
          title: 'Databricks Free Edition',
          url: 'https://www.databricks.com/try-databricks-free',
          type: 'tool'
        }
      ],
      checkpoint: {
        es: '🤔 ¿Podés explicar en una oración qué es un Lakehouse y por qué es mejor que un Data Lake tradicional?',
        en: '🤔 Can you explain in one sentence what a Lakehouse is and why it\'s better than a traditional Data Lake?',
        pt: '🤔 Você consegue explicar em uma frase o que é um Lakehouse e por que é melhor que um Data Lake tradicional?'
      },
      xpReward: 15,
      estimatedMinutes: 20
    },
    // PASO 1.2
    {
      id: 'db-1-2',
      title: {
        es: 'Crear cuenta en Databricks Free Edition',
        en: 'Create Databricks Free Edition account',
        pt: 'Criar conta no Databricks Free Edition'
      },
      description: {
        es: 'Registrate gratis y configurá tu primer workspace de Databricks con serverless compute.',
        en: 'Register for free and set up your first Databricks workspace with serverless compute.',
        pt: 'Registre-se gratuitamente e configure seu primeiro workspace do Databricks com serverless compute.'
      },
      theory: {
        es: `## Databricks Free Edition (2026)

**Free Edition** es la versión gratuita de Databricks, perfecta para aprender. Reemplaza a la antigua Community Edition con mejoras significativas:

### Qué incluye (GRATIS):
- ✅ Workspace completo
- ✅ Notebooks ilimitados
- ✅ **Serverless compute** (sin crear clusters manualmente)
- ✅ Delta Lake completo
- ✅ **Unity Catalog básico** (governance)
- ✅ **Databricks Assistant** (IA para coding)
- ✅ Delta Live Tables (DLT)
- ✅ MLflow
- ✅ Datasets de ejemplo
- ✅ Acceso a Databricks Academy (cursos gratis)

### Qué NO incluye (requiere plan pago):
- ❌ R y Scala (solo Python y SQL)
- ❌ Clusters personalizados/GPU
- ❌ Múltiples workspaces
- ❌ SSO/SCIM empresarial
- ❌ Acceso a internet sin restricciones
- ❌ Soporte enterprise

### Paso a paso para crear la cuenta:

1. **Ir a**: https://www.databricks.com/try-databricks-free
2. **Click en "Start for free"**
3. **Completar el formulario**:
   - Email (usá uno profesional)
   - Nombre completo
   - País
4. **Verificar email**
5. **Crear password**
6. **¡Listo!** Ya tenés tu workspace con serverless compute

### Diferencias clave vs Community Edition (antigua):

| Aspecto | Community Edition (vieja) | Free Edition (nueva) |
|---------|--------------------------|---------------------|
| Compute | Cluster 15GB manual | Serverless automático |
| Unity Catalog | No disponible | Disponible (básico) |
| DLT | No disponible | Disponible |
| AI Assistant | No disponible | Incluido |
| Lenguajes | Python, SQL, R, Scala | Solo Python y SQL |`,
        en: `## Databricks Free Edition (2026)

**Free Edition** is the free version of Databricks, perfect for learning. It replaces the old Community Edition with significant improvements:

### What's included (FREE):
- ✅ Full workspace
- ✅ Unlimited notebooks
- ✅ **Serverless compute** (no manual cluster creation)
- ✅ Complete Delta Lake
- ✅ **Basic Unity Catalog** (governance)
- ✅ **Databricks Assistant** (AI for coding)
- ✅ Delta Live Tables (DLT)
- ✅ MLflow
- ✅ Sample datasets
- ✅ Databricks Academy access (free courses)

### What's NOT included (requires paid plan):
- ❌ R and Scala (Python and SQL only)
- ❌ Custom clusters/GPU
- ❌ Multiple workspaces
- ❌ Enterprise SSO/SCIM
- ❌ Unrestricted internet access
- ❌ Enterprise support

### Step by step to create account:

1. **Go to**: https://www.databricks.com/try-databricks-free
2. **Click "Start for free"**
3. **Fill the form**:
   - Email (use a professional one)
   - Full name
   - Country
4. **Verify email**
5. **Create password**
6. **Done!** You have your workspace with serverless compute

### Key differences vs Community Edition (old):

| Aspect | Community Edition (old) | Free Edition (new) |
|--------|------------------------|-------------------|
| Compute | 15GB manual cluster | Automatic serverless |
| Unity Catalog | Not available | Available (basic) |
| DLT | Not available | Available |
| AI Assistant | Not available | Included |
| Languages | Python, SQL, R, Scala | Python and SQL only |`,
        pt: `## Databricks Free Edition (2026)

**Free Edition** é a versão gratuita do Databricks, perfeita para aprender. Substitui o antigo Community Edition com melhorias significativas:

### O que inclui (GRÁTIS):
- ✅ Workspace completo
- ✅ Notebooks ilimitados
- ✅ **Serverless compute** (sem criar clusters manualmente)
- ✅ Delta Lake completo
- ✅ **Unity Catalog básico** (governance)
- ✅ **Databricks Assistant** (IA para coding)
- ✅ Delta Live Tables (DLT)
- ✅ MLflow
- ✅ Datasets de exemplo
- ✅ Acesso ao Databricks Academy (cursos grátis)

### O que NÃO inclui (requer plano pago):
- ❌ R e Scala (apenas Python e SQL)
- ❌ Clusters personalizados/GPU
- ❌ Múltiplos workspaces
- ❌ SSO/SCIM empresarial
- ❌ Acesso à internet sem restrições
- ❌ Suporte enterprise

### Passo a passo para criar conta:

1. **Ir para**: https://www.databricks.com/try-databricks-free
2. **Clicar em "Start for free"**
3. **Preencher o formulário**:
   - Email (use um profissional)
   - Nome completo
   - País
4. **Verificar email**
5. **Criar senha**
6. **Pronto!** Você tem seu workspace com serverless compute

### Diferenças chave vs Community Edition (antigo):

| Aspecto | Community Edition (antigo) | Free Edition (novo) |
|---------|---------------------------|-------------------|
| Compute | Cluster 15GB manual | Serverless automático |
| Unity Catalog | Não disponível | Disponível (básico) |
| DLT | Não disponível | Disponível |
| AI Assistant | Não disponível | Incluído |
| Linguagens | Python, SQL, R, Scala | Apenas Python e SQL |`
      },
      practicalTips: [
        {
          es: '⚠️ Usá un email que revises frecuentemente. Databricks envía notificaciones importantes.',
          en: '⚠️ Use an email you check frequently. Databricks sends important notifications.',
          pt: '⚠️ Use um email que você verifica frequentemente. Databricks envia notificações importantes.'
        },
        {
          es: '💡 Guardá tus credenciales en un password manager. Las vas a necesitar seguido.',
          en: '💡 Save your credentials in a password manager. You\'ll need them often.',
          pt: '💡 Salve suas credenciais em um gerenciador de senhas. Você vai precisar delas frequentemente.'
        },
        {
          es: '🚀 No necesitás crear un cluster - el serverless compute se activa automáticamente cuando ejecutás código.',
          en: '🚀 You don\'t need to create a cluster - serverless compute activates automatically when you run code.',
          pt: '🚀 Você não precisa criar um cluster - o serverless compute ativa automaticamente quando você executa código.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks Free Edition Signup',
          url: 'https://www.databricks.com/try-databricks-free',
          type: 'tool'
        },
        {
          title: 'Free Edition Documentation',
          url: 'https://docs.databricks.com/en/getting-started/free-edition.html',
          type: 'docs'
        },
        {
          title: 'Free Edition Limitations',
          url: 'https://docs.databricks.com/en/getting-started/free-edition-limitations.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '✅ ¿Ya tenés tu cuenta creada y pudiste entrar al workspace?',
        en: '✅ Do you have your account created and were you able to enter the workspace?',
        pt: '✅ Você já tem sua conta criada e conseguiu entrar no workspace?'
      },
      xpReward: 20,
      estimatedMinutes: 15
    },
    // PASO 1.3
    {
      id: 'db-1-3',
      title: {
        es: 'Tour por el Workspace de Databricks',
        en: 'Tour of the Databricks Workspace',
        pt: 'Tour pelo Workspace do Databricks'
      },
      description: {
        es: 'Conocé cada sección del workspace y entendé para qué sirve cada una.',
        en: 'Get to know each section of the workspace and understand what each one is for.',
        pt: 'Conheça cada seção do workspace e entenda para que serve cada uma.'
      },
      theory: {
        es: `## El Workspace de Databricks Free Edition

Cuando entrás a Databricks, ves una interfaz moderna con varios elementos. Vamos a recorrerlos:

### 🏠 Home (Inicio)
Tu página principal. Muestra:
- Notebooks recientes
- Accesos rápidos a recursos
- Tutoriales y guías de inicio

### 📁 Workspace
El "explorador de archivos" de Databricks:
- **Users/tu_usuario/**: Tu carpeta personal
- **Shared/**: Carpetas compartidas con el equipo
- **Repos/**: Integración con Git

### 🔧 Compute
En Free Edition, el compute es **serverless**:
- Se activa automáticamente al ejecutar código
- No necesitás crear ni gestionar clusters
- Los recursos se asignan según demanda

> 💡 **Nota**: En planes pagos, aquí se crean clusters personalizados.

### 📊 Catalog (Unity Catalog)
Explora y gestiona tus datos:
- **Catalogs**: Contenedores de nivel superior
- **Schemas**: Agrupan tablas relacionadas
- **Tables/Views**: Tus datos

### 🔄 Workflows (Jobs)
Automatización y scheduling:
- Crear Jobs
- Ver ejecuciones
- Configurar triggers

### 🤖 Databricks Assistant
El asistente de IA integrado:
- Ayuda a escribir código
- Explica errores
- Optimiza queries
- Responde preguntas sobre Databricks

### 🧪 Machine Learning
Herramientas de ML:
- Experiments (MLflow)
- Models (Registry)

### ⚙️ Settings
Configuración de tu cuenta y workspace

### Navegación por teclado:
- \`Ctrl + Shift + P\` o \`Cmd + Shift + P\`: Command palette
- \`Ctrl + Alt + N\`: Nuevo notebook`,
        en: `## The Databricks Free Edition Workspace

When you enter Databricks, you see a modern interface with several elements. Let's go through them:

### 🏠 Home
Your main page. Shows:
- Recent notebooks
- Quick access to resources
- Tutorials and getting started guides

### 📁 Workspace
Databricks "file explorer":
- **Users/your_user/**: Your personal folder
- **Shared/**: Folders shared with team
- **Repos/**: Git integration

### 🔧 Compute
In Free Edition, compute is **serverless**:
- Activates automatically when you run code
- No need to create or manage clusters
- Resources allocated on demand

> 💡 **Note**: In paid plans, custom clusters are created here.

### 📊 Catalog (Unity Catalog)
Explore and manage your data:
- **Catalogs**: Top-level containers
- **Schemas**: Group related tables
- **Tables/Views**: Your data

### 🔄 Workflows (Jobs)
Automation and scheduling:
- Create Jobs
- View executions
- Configure triggers

### 🤖 Databricks Assistant
The integrated AI assistant:
- Helps write code
- Explains errors
- Optimizes queries
- Answers questions about Databricks

### 🧪 Machine Learning
ML tools:
- Experiments (MLflow)
- Models (Registry)

### ⚙️ Settings
Account and workspace configuration

### Keyboard navigation:
- \`Ctrl + Shift + P\` or \`Cmd + Shift + P\`: Command palette
- \`Ctrl + Alt + N\`: New notebook`,
        pt: `## O Workspace do Databricks Free Edition

Quando você entra no Databricks, vê uma interface moderna com vários elementos. Vamos percorrê-los:

### 🏠 Home (Início)
Sua página principal. Mostra:
- Notebooks recentes
- Acessos rápidos a recursos
- Tutoriais e guias de início

### 📁 Workspace
O "explorador de arquivos" do Databricks:
- **Users/seu_usuario/**: Sua pasta pessoal
- **Shared/**: Pastas compartilhadas com a equipe
- **Repos/**: Integração com Git

### 🔧 Compute
No Free Edition, o compute é **serverless**:
- Ativa automaticamente ao executar código
- Não precisa criar nem gerenciar clusters
- Recursos alocados sob demanda

> 💡 **Nota**: Em planos pagos, clusters personalizados são criados aqui.

### 📊 Catalog (Unity Catalog)
Explore e gerencie seus dados:
- **Catalogs**: Containers de nível superior
- **Schemas**: Agrupam tabelas relacionadas
- **Tables/Views**: Seus dados

### 🔄 Workflows (Jobs)
Automação e scheduling:
- Criar Jobs
- Ver execuções
- Configurar triggers

### 🤖 Databricks Assistant
O assistente de IA integrado:
- Ajuda a escrever código
- Explica erros
- Otimiza queries
- Responde perguntas sobre Databricks

### 🧪 Machine Learning
Ferramentas de ML:
- Experiments (MLflow)
- Models (Registry)

### ⚙️ Settings
Configuração da sua conta e workspace

### Navegação por teclado:
- \`Ctrl + Shift + P\` ou \`Cmd + Shift + P\`: Command palette
- \`Ctrl + Alt + N\`: Novo notebook`
      },
      practicalTips: [
        {
          es: '🎯 Explorá cada sección sin miedo. No podés romper nada en Free Edition.',
          en: '🎯 Explore each section without fear. You can\'t break anything in Free Edition.',
          pt: '🎯 Explore cada seção sem medo. Você não pode quebrar nada no Free Edition.'
        },
        {
          es: '💡 Creá una carpeta personal dentro de Workspace > Users > tu_usuario para organizar tus notebooks.',
          en: '💡 Create a personal folder inside Workspace > Users > your_user to organize your notebooks.',
          pt: '💡 Crie uma pasta pessoal dentro de Workspace > Users > seu_usuario para organizar seus notebooks.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks Workspace Overview',
          url: 'https://docs.databricks.com/workspace/index.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '🤔 ¿Podés encontrar dónde se crean los clusters y dónde se guardan los notebooks?',
        en: '🤔 Can you find where clusters are created and where notebooks are saved?',
        pt: '🤔 Você consegue encontrar onde os clusters são criados e onde os notebooks são salvos?'
      },
      xpReward: 15,
      estimatedMinutes: 15
    },
    // PASO 1.4
    {
      id: 'db-1-4',
      title: {
        es: 'Entendiendo Serverless Compute',
        en: 'Understanding Serverless Compute',
        pt: 'Entendendo Serverless Compute'
      },
      description: {
        es: 'En Free Edition, Databricks usa serverless compute. No necesitás crear clusters - el poder de cómputo se asigna automáticamente.',
        en: 'In Free Edition, Databricks uses serverless compute. You don\'t need to create clusters - computing power is assigned automatically.',
        pt: 'No Free Edition, o Databricks usa serverless compute. Você não precisa criar clusters - o poder de computação é atribuído automaticamente.'
      },
      theory: {
        es: `## Serverless Compute en Free Edition

En Databricks Free Edition, el compute es **serverless**. Esto significa que NO necesitás crear ni gestionar clusters manualmente.

### ¿Cómo funciona?

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    TU NOTEBOOK                          │
│              Escribís y ejecutás código                 │
└─────────────────────────┬───────────────────────────────┘
                          │ Click "Run"
                          ▼
┌─────────────────────────────────────────────────────────┐
│               SERVERLESS COMPUTE                        │
│  • Se activa automáticamente                            │
│  • Recursos asignados según necesidad                   │
│  • Sin configuración manual                             │
│  • Sin tiempos de espera de inicio                     │
└─────────────────────────────────────────────────────────┘
\`\`\`

### Ventajas del Serverless:
- ✅ **Sin esperas**: No hay que esperar 5 min para que inicie un cluster
- ✅ **Sin configuración**: No elegís RAM, cores, runtime
- ✅ **Sin gestión**: No hay que apagar/encender nada
- ✅ **Costo eficiente**: Solo pagás por lo que usás (en planes pagos)

### Comparación con Clusters Tradicionales:

| Aspecto | Clusters (Plan Pago) | Serverless (Free Edition) |
|---------|---------------------|---------------------------|
| Setup | Manual (3-5 min) | Automático (~segundos) |
| Configuración | RAM, cores, runtime | Ninguna |
| Gestión | Encender/apagar | Automático |
| Lenguajes | Python, SQL, R, Scala | Python, SQL |
| Costo | Por hora de cluster | Por uso |

### Lo que ves en Compute:

En Free Edition, la sección Compute muestra:
- Tu uso de serverless
- Historial de ejecuciones
- No hay botón "Create Cluster" (no lo necesitás)

### ¿Cómo ejecutar código?

1. Abrí un notebook
2. Escribí código en una celda
3. Click en **Run** o presioná **Shift + Enter**
4. ¡El serverless compute se activa automáticamente!

> 💡 **Para usuarios avanzados**: En planes pagos, podés crear clusters personalizados con configuraciones específicas (GPU, más RAM, etc.).`,
        en: `## Serverless Compute in Free Edition

In Databricks Free Edition, compute is **serverless**. This means you DON'T need to create or manage clusters manually.

### How does it work?

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    YOUR NOTEBOOK                        │
│              Write and execute code                     │
└─────────────────────────┬───────────────────────────────┘
                          │ Click "Run"
                          ▼
┌─────────────────────────────────────────────────────────┐
│               SERVERLESS COMPUTE                        │
│  • Activates automatically                              │
│  • Resources assigned as needed                         │
│  • No manual configuration                              │
│  • No startup wait times                                │
└─────────────────────────────────────────────────────────┘
\`\`\`

### Serverless Advantages:
- ✅ **No waiting**: No need to wait 5 min for cluster startup
- ✅ **No configuration**: Don't choose RAM, cores, runtime
- ✅ **No management**: Nothing to turn on/off
- ✅ **Cost efficient**: Only pay for what you use (in paid plans)

### Comparison with Traditional Clusters:

| Aspect | Clusters (Paid Plan) | Serverless (Free Edition) |
|--------|---------------------|---------------------------|
| Setup | Manual (3-5 min) | Automatic (~seconds) |
| Configuration | RAM, cores, runtime | None |
| Management | Turn on/off | Automatic |
| Languages | Python, SQL, R, Scala | Python, SQL |
| Cost | Per cluster hour | Per use |

### What you see in Compute:

In Free Edition, the Compute section shows:
- Your serverless usage
- Execution history
- No "Create Cluster" button (you don't need it)

### How to run code?

1. Open a notebook
2. Write code in a cell
3. Click **Run** or press **Shift + Enter**
4. Serverless compute activates automatically!

> 💡 **For advanced users**: In paid plans, you can create custom clusters with specific configurations (GPU, more RAM, etc.).`,
        pt: `## Serverless Compute no Free Edition

No Databricks Free Edition, o compute é **serverless**. Isso significa que você NÃO precisa criar nem gerenciar clusters manualmente.

### Como funciona?

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    SEU NOTEBOOK                         │
│              Escreve e executa código                   │
└─────────────────────────┬───────────────────────────────┘
                          │ Click "Run"
                          ▼
┌─────────────────────────────────────────────────────────┐
│               SERVERLESS COMPUTE                        │
│  • Ativa automaticamente                                │
│  • Recursos atribuídos conforme necessidade             │
│  • Sem configuração manual                              │
│  • Sem tempos de espera de início                       │
└─────────────────────────────────────────────────────────┘
\`\`\`

### Vantagens do Serverless:
- ✅ **Sem esperas**: Não precisa esperar 5 min para iniciar cluster
- ✅ **Sem configuração**: Não escolhe RAM, cores, runtime
- ✅ **Sem gestão**: Nada para ligar/desligar
- ✅ **Custo eficiente**: Só paga pelo que usa (em planos pagos)

### Comparação com Clusters Tradicionais:

| Aspecto | Clusters (Plano Pago) | Serverless (Free Edition) |
|---------|----------------------|---------------------------|
| Setup | Manual (3-5 min) | Automático (~segundos) |
| Configuração | RAM, cores, runtime | Nenhuma |
| Gestão | Ligar/desligar | Automático |
| Linguagens | Python, SQL, R, Scala | Python, SQL |
| Custo | Por hora de cluster | Por uso |

### O que você vê em Compute:

No Free Edition, a seção Compute mostra:
- Seu uso de serverless
- Histórico de execuções
- Sem botão "Create Cluster" (você não precisa)

### Como executar código?

1. Abra um notebook
2. Escreva código em uma célula
3. Clique em **Run** ou pressione **Shift + Enter**
4. O serverless compute ativa automaticamente!

> 💡 **Para usuários avançados**: Em planos pagos, você pode criar clusters personalizados com configurações específicas (GPU, mais RAM, etc.).`
      },
      practicalTips: [
        {
          es: '🚀 En Free Edition, solo ejecutá tu código. El compute se encarga solo.',
          en: '🚀 In Free Edition, just run your code. Compute takes care of itself.',
          pt: '🚀 No Free Edition, apenas execute seu código. O compute cuida de si mesmo.'
        },
        {
          es: '💡 La primera celda puede tardar unos segundos mientras se inicializa el serverless. Las siguientes son instantáneas.',
          en: '💡 The first cell may take a few seconds while serverless initializes. Following ones are instant.',
          pt: '💡 A primeira célula pode levar alguns segundos enquanto o serverless inicializa. As seguintes são instantâneas.'
        },
        {
          es: '📚 Entender clusters tradicionales sigue siendo importante para trabajos enterprise. Lo cubrimos en la Fase 2.',
          en: '📚 Understanding traditional clusters is still important for enterprise jobs. We cover it in Phase 2.',
          pt: '📚 Entender clusters tradicionais ainda é importante para trabalhos enterprise. Cobrimos isso na Fase 2.'
        }
      ],
      externalLinks: [
        {
          title: 'Serverless Compute Documentation',
          url: 'https://docs.databricks.com/en/compute/serverless.html',
          type: 'docs'
        },
        {
          title: 'Free Edition Compute Limitations',
          url: 'https://docs.databricks.com/en/getting-started/free-edition-limitations.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '✅ ¿Entendés por qué no necesitás crear un cluster en Free Edition?',
        en: '✅ Do you understand why you don\'t need to create a cluster in Free Edition?',
        pt: '✅ Você entende por que não precisa criar um cluster no Free Edition?'
      },
      xpReward: 25,
      estimatedMinutes: 15
    },
    // PASO 1.5
    {
      id: 'db-1-5',
      title: {
        es: 'Tu primer Notebook en Databricks',
        en: 'Your first Notebook in Databricks',
        pt: 'Seu primeiro Notebook no Databricks'
      },
      description: {
        es: 'Los notebooks son donde escribís y ejecutás código. Creá tu primero y ejecutá código Python y SQL.',
        en: 'Notebooks are where you write and run code. Create your first one and run Python and SQL code.',
        pt: 'Os notebooks são onde você escreve e executa código. Crie seu primeiro e execute código Python e SQL.'
      },
      theory: {
        es: `## Notebooks en Databricks

Un notebook es un documento interactivo con **celdas** que pueden contener:
- Código (Python, SQL)
- Markdown (documentación)
- Visualizaciones

> ⚠️ **Free Edition**: Solo soporta Python y SQL. R y Scala requieren plan pago.

### Crear un Notebook:

1. Ir a **Workspace** > **Users** > tu usuario
2. Click derecho > **Create** > **Notebook**
3. **Name**: "01-Mi-Primer-Notebook"
4. **Default Language**: Python
5. Click **Create**

> 💡 No necesitás seleccionar un cluster - el serverless compute se activa automáticamente cuando ejecutás.

### Anatomía del Notebook:

\`\`\`
┌────────────────────────────────────────┐
│  📓 01-Mi-Primer-Notebook              │
├────────────────────────────────────────┤
│  [+ Code] [+ Text] [+ SQL]             │
├────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │ # Celda 1 (Python)               │  │
│  │ print("Hola Databricks!")        │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ %sql                             │  │
│  │ SELECT "Hola desde SQL"          │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
\`\`\`

### Magic Commands:

Podés cambiar el lenguaje de una celda individual:
- \`%python\` - Ejecutar Python
- \`%sql\` - Ejecutar SQL
- \`%md\` - Markdown (documentación)
- \`%sh\` - Shell commands
- \`%fs\` - Comandos de DBFS

> ⚠️ \`%scala\` y \`%r\` NO están disponibles en Free Edition.

### Databricks Assistant (IA):

Podés usar el asistente de IA integrado:
- Click en el ícono de IA o escribí \`/\` en una celda vacía
- Pedile que genere código, explique errores, o optimice queries

### Atajos de teclado:
- \`Shift + Enter\`: Ejecutar celda y avanzar
- \`Ctrl + Enter\`: Ejecutar celda sin avanzar
- \`Esc + A\`: Insertar celda arriba
- \`Esc + B\`: Insertar celda abajo`,
        en: `## Notebooks in Databricks

A notebook is an interactive document with **cells** that can contain:
- Code (Python, SQL)
- Markdown (documentation)
- Visualizations

> ⚠️ **Free Edition**: Only supports Python and SQL. R and Scala require paid plan.

### Create a Notebook:

1. Go to **Workspace** > **Users** > your user
2. Right click > **Create** > **Notebook**
3. **Name**: "01-My-First-Notebook"
4. **Default Language**: Python
5. Click **Create**

> 💡 You don't need to select a cluster - serverless compute activates automatically when you run.

### Notebook Anatomy:

\`\`\`
┌────────────────────────────────────────┐
│  📓 01-My-First-Notebook               │
├────────────────────────────────────────┤
│  [+ Code] [+ Text] [+ SQL]             │
├────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │ # Cell 1 (Python)                │  │
│  │ print("Hello Databricks!")       │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ %sql                             │  │
│  │ SELECT "Hello from SQL"          │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
\`\`\`

### Magic Commands:

You can change the language of an individual cell:
- \`%python\` - Run Python
- \`%sql\` - Run SQL
- \`%md\` - Markdown (documentation)
- \`%sh\` - Shell commands
- \`%fs\` - DBFS commands

> ⚠️ \`%scala\` and \`%r\` are NOT available in Free Edition.

### Databricks Assistant (AI):

You can use the integrated AI assistant:
- Click the AI icon or type \`/\` in an empty cell
- Ask it to generate code, explain errors, or optimize queries

### Keyboard shortcuts:
- \`Shift + Enter\`: Run cell and advance
- \`Ctrl + Enter\`: Run cell without advancing
- \`Esc + A\`: Insert cell above
- \`Esc + B\`: Insert cell below`,
        pt: `## Notebooks no Databricks

Um notebook é um documento interativo com **células** que podem conter:
- Código (Python, SQL)
- Markdown (documentação)
- Visualizações

> ⚠️ **Free Edition**: Suporta apenas Python e SQL. R e Scala requerem plano pago.

### Criar um Notebook:

1. Ir para **Workspace** > **Users** > seu usuário
2. Clique direito > **Create** > **Notebook**
3. **Name**: "01-Meu-Primeiro-Notebook"
4. **Default Language**: Python
5. Clicar em **Create**

> 💡 Você não precisa selecionar um cluster - o serverless compute ativa automaticamente quando você executa.

### Anatomia do Notebook:

\`\`\`
┌────────────────────────────────────────┐
│  📓 01-Meu-Primeiro-Notebook           │
├────────────────────────────────────────┤
│  [+ Code] [+ Text] [+ SQL]             │
├────────────────────────────────────────┤
│  ┌──────────────────────────────────┐  │
│  │ # Célula 1 (Python)              │  │
│  │ print("Olá Databricks!")         │  │
│  └──────────────────────────────────┘  │
│  ┌──────────────────────────────────┐  │
│  │ %sql                             │  │
│  │ SELECT "Olá do SQL"              │  │
│  └──────────────────────────────────┘  │
└────────────────────────────────────────┘
\`\`\`

### Magic Commands:

Você pode mudar a linguagem de uma célula individual:
- \`%python\` - Executar Python
- \`%sql\` - Executar SQL
- \`%md\` - Markdown (documentação)
- \`%sh\` - Comandos Shell
- \`%fs\` - Comandos DBFS

> ⚠️ \`%scala\` e \`%r\` NÃO estão disponíveis no Free Edition.

### Databricks Assistant (IA):

Você pode usar o assistente de IA integrado:
- Clique no ícone de IA ou digite \`/\` em uma célula vazia
- Peça para gerar código, explicar erros ou otimizar queries

### Atalhos de teclado:
- \`Shift + Enter\`: Executar célula e avançar
- \`Ctrl + Enter\`: Executar célula sem avançar
- \`Esc + A\`: Inserir célula acima
- \`Esc + B\`: Inserir célula abaixo`
      },
      codeExample: {
        language: 'python',
        code: `# Celda 1: Python básico
print("🎉 ¡Hola Databricks!")

# Celda 2: Ver versión de Spark
spark.version

# Celda 3: Crear un DataFrame simple
data = [("Ana", 25), ("Bob", 30), ("Carlos", 35)]
df = spark.createDataFrame(data, ["nombre", "edad"])
df.show()

# Celda 4: SQL (usar %sql al inicio de la celda)
# %sql
# SELECT * FROM VALUES 
#   ('Ana', 25), 
#   ('Bob', 30), 
#   ('Carlos', 35) 
# AS tabla(nombre, edad)`,
        explanation: {
          es: 'Este código muestra las operaciones básicas: imprimir, ver la versión de Spark, crear un DataFrame, y ejecutar SQL.',
          en: 'This code shows basic operations: printing, checking Spark version, creating a DataFrame, and running SQL.',
          pt: 'Este código mostra operações básicas: imprimir, verificar versão do Spark, criar um DataFrame e executar SQL.'
        }
      },
      practicalTips: [
        {
          es: '📝 Siempre documentá tu notebook con celdas Markdown (%md). Tu yo del futuro te lo agradecerá.',
          en: '📝 Always document your notebook with Markdown cells (%md). Your future self will thank you.',
          pt: '📝 Sempre documente seu notebook com células Markdown (%md). Seu eu do futuro vai agradecer.'
        },
        {
          es: '💡 Usá nombres descriptivos para tus notebooks: "01-Exploración-Datos", "02-Limpieza", etc.',
          en: '💡 Use descriptive names for your notebooks: "01-Data-Exploration", "02-Cleaning", etc.',
          pt: '💡 Use nomes descritivos para seus notebooks: "01-Exploração-Dados", "02-Limpeza", etc.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks Notebooks Guide',
          url: 'https://docs.databricks.com/notebooks/index.html',
          type: 'docs'
        },
        {
          title: 'Notebook Keyboard Shortcuts',
          url: 'https://docs.databricks.com/notebooks/notebooks-manage.html#keyboard-shortcuts',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '✅ ¿Pudiste ejecutar código Python y SQL en tu notebook?',
        en: '✅ Were you able to run Python and SQL code in your notebook?',
        pt: '✅ Você conseguiu executar código Python e SQL no seu notebook?'
      },
      xpReward: 30,
      estimatedMinutes: 25
    },
    // PASO 1.6
    {
      id: 'db-1-6',
      title: {
        es: 'DBFS: El Sistema de Archivos de Databricks',
        en: 'DBFS: The Databricks File System',
        pt: 'DBFS: O Sistema de Arquivos do Databricks'
      },
      description: {
        es: 'DBFS es donde Databricks almacena datos. Aprendé a navegarlo y subir archivos.',
        en: 'DBFS is where Databricks stores data. Learn to navigate it and upload files.',
        pt: 'DBFS é onde o Databricks armazena dados. Aprenda a navegar e fazer upload de arquivos.'
      },
      theory: {
        es: `## DBFS - Databricks File System

DBFS es una capa de abstracción sobre el almacenamiento en la nube (S3, ADLS, GCS).

### Estructura de DBFS:

\`\`\`
dbfs:/
├── FileStore/          # Archivos subidos por usuarios
│   ├── tables/         # Datos de tablas
│   └── shared_uploads/ # Uploads compartidos
├── databricks-datasets/ # Datasets de ejemplo (gratis!)
├── user/               # Carpetas de usuarios
└── mnt/                # Puntos de montaje (cloud storage)
\`\`\`

### Comandos para explorar DBFS:

\`\`\`python
# Listar contenido
%fs ls /

# Ver datasets de ejemplo
%fs ls /databricks-datasets/

# Crear carpeta
%fs mkdirs /FileStore/mi-proyecto/

# Copiar archivo
%fs cp /source/file.csv /destination/file.csv

# Ver contenido de archivo
%fs head /databricks-datasets/README.md
\`\`\`

### Desde Python:
\`\`\`python
# Usando dbutils
dbutils.fs.ls("/databricks-datasets/")

# Leer archivo como texto
dbutils.fs.head("/databricks-datasets/README.md")

# Copiar archivo
dbutils.fs.cp("source", "destination")
\`\`\`

### Datasets de Ejemplo Disponibles:

| Dataset | Descripción | Tamaño |
|---------|-------------|--------|
| /databricks-datasets/samples/population-vs-price/ | Datos de ciudades | ~10KB |
| /databricks-datasets/nyctaxi/ | Taxis de NYC | ~100MB |
| /databricks-datasets/wine-quality/ | Calidad de vinos | ~200KB |
| /databricks-datasets/COVID/ | Datos COVID-19 | ~50MB |
| /databricks-datasets/amazon/ | Reviews Amazon | ~1GB |`,
        en: `## DBFS - Databricks File System

DBFS is an abstraction layer over cloud storage (S3, ADLS, GCS).

### DBFS Structure:

\`\`\`
dbfs:/
├── FileStore/          # User-uploaded files
│   ├── tables/         # Table data
│   └── shared_uploads/ # Shared uploads
├── databricks-datasets/ # Sample datasets (free!)
├── user/               # User folders
└── mnt/                # Mount points (cloud storage)
\`\`\`

### Commands to explore DBFS:

\`\`\`python
# List contents
%fs ls /

# View sample datasets
%fs ls /databricks-datasets/

# Create folder
%fs mkdirs /FileStore/my-project/

# Copy file
%fs cp /source/file.csv /destination/file.csv

# View file contents
%fs head /databricks-datasets/README.md
\`\`\`

### From Python:
\`\`\`python
# Using dbutils
dbutils.fs.ls("/databricks-datasets/")

# Read file as text
dbutils.fs.head("/databricks-datasets/README.md")

# Copy file
dbutils.fs.cp("source", "destination")
\`\`\`

### Available Sample Datasets:

| Dataset | Description | Size |
|---------|-------------|------|
| /databricks-datasets/samples/population-vs-price/ | City data | ~10KB |
| /databricks-datasets/nyctaxi/ | NYC Taxis | ~100MB |
| /databricks-datasets/wine-quality/ | Wine quality | ~200KB |
| /databricks-datasets/COVID/ | COVID-19 data | ~50MB |
| /databricks-datasets/amazon/ | Amazon reviews | ~1GB |`,
        pt: `## DBFS - Databricks File System

DBFS é uma camada de abstração sobre o armazenamento em nuvem (S3, ADLS, GCS).

### Estrutura do DBFS:

\`\`\`
dbfs:/
├── FileStore/          # Arquivos enviados por usuários
│   ├── tables/         # Dados de tabelas
│   └── shared_uploads/ # Uploads compartilhados
├── databricks-datasets/ # Datasets de exemplo (grátis!)
├── user/               # Pastas de usuários
└── mnt/                # Pontos de montagem (cloud storage)
\`\`\`

### Comandos para explorar DBFS:

\`\`\`python
# Listar conteúdo
%fs ls /

# Ver datasets de exemplo
%fs ls /databricks-datasets/

# Criar pasta
%fs mkdirs /FileStore/meu-projeto/

# Copiar arquivo
%fs cp /source/file.csv /destination/file.csv

# Ver conteúdo do arquivo
%fs head /databricks-datasets/README.md
\`\`\`

### Do Python:
\`\`\`python
# Usando dbutils
dbutils.fs.ls("/databricks-datasets/")

# Ler arquivo como texto
dbutils.fs.head("/databricks-datasets/README.md")

# Copiar arquivo
dbutils.fs.cp("source", "destination")
\`\`\`

### Datasets de Exemplo Disponíveis:

| Dataset | Descrição | Tamanho |
|---------|-----------|---------|
| /databricks-datasets/samples/population-vs-price/ | Dados de cidades | ~10KB |
| /databricks-datasets/nyctaxi/ | Táxis NYC | ~100MB |
| /databricks-datasets/wine-quality/ | Qualidade de vinhos | ~200KB |
| /databricks-datasets/COVID/ | Dados COVID-19 | ~50MB |
| /databricks-datasets/amazon/ | Reviews Amazon | ~1GB |`
      },
      codeExample: {
        language: 'python',
        code: `# Explorar DBFS desde el notebook

# 1. Listar datasets de ejemplo
display(dbutils.fs.ls("/databricks-datasets/"))

# 2. Ver contenido de un archivo
print(dbutils.fs.head("/databricks-datasets/README.md", 500))

# 3. Crear tu carpeta de trabajo
dbutils.fs.mkdirs("/FileStore/mi-proyecto/")

# 4. Verificar que se creó
display(dbutils.fs.ls("/FileStore/"))

# 5. Cargar un dataset de ejemplo en DataFrame
df = spark.read.csv(
    "/databricks-datasets/samples/population-vs-price/data_geo.csv",
    header=True,
    inferSchema=True
)
display(df)`,
        explanation: {
          es: 'Este código muestra cómo navegar DBFS, crear carpetas y cargar datos de los datasets de ejemplo.',
          en: 'This code shows how to navigate DBFS, create folders, and load data from sample datasets.',
          pt: 'Este código mostra como navegar no DBFS, criar pastas e carregar dados dos datasets de exemplo.'
        }
      },
      practicalTips: [
        {
          es: '📂 Los datasets en /databricks-datasets/ son perfectos para practicar sin tener que subir datos propios.',
          en: '📂 The datasets in /databricks-datasets/ are perfect for practicing without uploading your own data.',
          pt: '📂 Os datasets em /databricks-datasets/ são perfeitos para praticar sem precisar fazer upload de dados próprios.'
        },
        {
          es: '⚠️ En Free Edition, los datos pueden eliminarse si no usás tu cuenta por un período prolongado. Hacé backups de datos importantes.',
          en: '⚠️ In Free Edition, data may be deleted if you don\'t use your account for an extended period. Backup important data.',
          pt: '⚠️ No Free Edition, os dados podem ser deletados se você não usar sua conta por um período prolongado. Faça backup de dados importantes.'
        }
      ],
      externalLinks: [
        {
          title: 'DBFS Documentation',
          url: 'https://docs.databricks.com/dbfs/index.html',
          type: 'docs'
        },
        {
          title: 'Sample Datasets',
          url: 'https://docs.databricks.com/dbfs/databricks-datasets.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '✅ ¿Pudiste listar los datasets de ejemplo y cargar uno en un DataFrame?',
        en: '✅ Were you able to list the sample datasets and load one into a DataFrame?',
        pt: '✅ Você conseguiu listar os datasets de exemplo e carregar um em um DataFrame?'
      },
      xpReward: 25,
      estimatedMinutes: 20
    },
    // PASO 1.7
    {
      id: 'db-1-7',
      title: {
        es: 'Subir tus propios datos a Databricks',
        en: 'Upload your own data to Databricks',
        pt: 'Fazer upload dos seus próprios dados para o Databricks'
      },
      description: {
        es: 'Aprendé a subir archivos CSV, JSON y Parquet desde tu computadora.',
        en: 'Learn to upload CSV, JSON and Parquet files from your computer.',
        pt: 'Aprenda a fazer upload de arquivos CSV, JSON e Parquet do seu computador.'
      },
      theory: {
        es: `## Subir Datos a Databricks

Hay varias formas de subir datos:

### Método 1: UI de Databricks (más fácil)

1. Ir a **Data** en el menú lateral
2. Click en **Create Table**
3. **Drop files to upload** o click para seleccionar
4. Elegir opciones:
   - Crear tabla o solo subir archivo
   - Nombre de la tabla
   - Tipo de archivo (CSV, JSON, Parquet, etc.)

### Método 2: Arrastrar al Notebook

1. Abrir un notebook
2. Arrastrar archivo desde tu computadora al notebook
3. Databricks genera código automáticamente

### Método 3: dbutils (programático)

\`\`\`python
# Después de subir por UI, el archivo queda en:
# /FileStore/tables/tu_archivo.csv

# Leerlo
df = spark.read.csv(
    "/FileStore/tables/tu_archivo.csv",
    header=True,
    inferSchema=True
)
\`\`\`

### Método 4: Desde URL externa

\`\`\`python
# Descargar desde internet
import urllib.request

url = "https://example.com/data.csv"
local_path = "/tmp/data.csv"
dbfs_path = "/FileStore/data.csv"

# Descargar
urllib.request.urlretrieve(url, local_path)

# Copiar a DBFS
dbutils.fs.cp(f"file:{local_path}", f"dbfs:{dbfs_path}")
\`\`\`

### Formatos soportados:
| Formato | Extensión | Uso recomendado |
|---------|-----------|-----------------|
| CSV | .csv | Datos pequeños, legibles |
| JSON | .json | APIs, documentos |
| Parquet | .parquet | Producción, performance |
| Delta | .delta | Databricks native |
| Avro | .avro | Streaming |
| ORC | .orc | Hive compatibility |`,
        en: `## Upload Data to Databricks

There are several ways to upload data:

### Method 1: Databricks UI (easiest)

1. Go to **Data** in the sidebar
2. Click **Create Table**
3. **Drop files to upload** or click to select
4. Choose options:
   - Create table or just upload file
   - Table name
   - File type (CSV, JSON, Parquet, etc.)

### Method 2: Drag to Notebook

1. Open a notebook
2. Drag file from your computer to the notebook
3. Databricks generates code automatically

### Method 3: dbutils (programmatic)

\`\`\`python
# After uploading via UI, the file is at:
# /FileStore/tables/your_file.csv

# Read it
df = spark.read.csv(
    "/FileStore/tables/your_file.csv",
    header=True,
    inferSchema=True
)
\`\`\`

### Method 4: From external URL

\`\`\`python
# Download from internet
import urllib.request

url = "https://example.com/data.csv"
local_path = "/tmp/data.csv"
dbfs_path = "/FileStore/data.csv"

# Download
urllib.request.urlretrieve(url, local_path)

# Copy to DBFS
dbutils.fs.cp(f"file:{local_path}", f"dbfs:{dbfs_path}")
\`\`\`

### Supported formats:
| Format | Extension | Recommended use |
|--------|-----------|-----------------|
| CSV | .csv | Small data, readable |
| JSON | .json | APIs, documents |
| Parquet | .parquet | Production, performance |
| Delta | .delta | Databricks native |
| Avro | .avro | Streaming |
| ORC | .orc | Hive compatibility |`,
        pt: `## Fazer Upload de Dados para o Databricks

Existem várias formas de fazer upload de dados:

### Método 1: UI do Databricks (mais fácil)

1. Ir para **Data** no menu lateral
2. Clicar em **Create Table**
3. **Drop files to upload** ou clicar para selecionar
4. Escolher opções:
   - Criar tabela ou apenas fazer upload
   - Nome da tabela
   - Tipo de arquivo (CSV, JSON, Parquet, etc.)

### Método 2: Arrastar para o Notebook

1. Abrir um notebook
2. Arrastar arquivo do seu computador para o notebook
3. Databricks gera código automaticamente

### Método 3: dbutils (programático)

\`\`\`python
# Após fazer upload pela UI, o arquivo fica em:
# /FileStore/tables/seu_arquivo.csv

# Ler
df = spark.read.csv(
    "/FileStore/tables/seu_arquivo.csv",
    header=True,
    inferSchema=True
)
\`\`\`

### Método 4: De URL externa

\`\`\`python
# Baixar da internet
import urllib.request

url = "https://example.com/data.csv"
local_path = "/tmp/data.csv"
dbfs_path = "/FileStore/data.csv"

# Baixar
urllib.request.urlretrieve(url, local_path)

# Copiar para DBFS
dbutils.fs.cp(f"file:{local_path}", f"dbfs:{dbfs_path}")
\`\`\`

### Formatos suportados:
| Formato | Extensão | Uso recomendado |
|---------|----------|-----------------|
| CSV | .csv | Dados pequenos, legíveis |
| JSON | .json | APIs, documentos |
| Parquet | .parquet | Produção, performance |
| Delta | .delta | Databricks nativo |
| Avro | .avro | Streaming |
| ORC | .orc | Compatibilidade Hive |`
      },
      practicalTips: [
        {
          es: '📊 Siempre que puedas, convertí tus datos a Parquet o Delta. Son mucho más eficientes.',
          en: '📊 Whenever possible, convert your data to Parquet or Delta. They are much more efficient.',
          pt: '📊 Sempre que puder, converta seus dados para Parquet ou Delta. São muito mais eficientes.'
        },
        {
          es: '💡 Free Edition tiene límites de almacenamiento. Para datasets grandes, considerá un plan pago.',
          en: '💡 Free Edition has storage limits. For large datasets, consider a paid plan.',
          pt: '💡 Free Edition tem limites de armazenamento. Para datasets grandes, considere um plano pago.'
        },
        {
          es: '⚠️ El acceso a internet externo está limitado a dominios confiables en Free Edition.',
          en: '⚠️ External internet access is limited to trusted domains in Free Edition.',
          pt: '⚠️ O acesso à internet externa é limitado a domínios confiáveis no Free Edition.'
        }
      ],
      externalLinks: [
        {
          title: 'Importing Data Documentation',
          url: 'https://docs.databricks.com/data/data.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '✅ ¿Pudiste subir un archivo CSV propio y leerlo como DataFrame?',
        en: '✅ Were you able to upload your own CSV file and read it as a DataFrame?',
        pt: '✅ Você conseguiu fazer upload de um arquivo CSV próprio e lê-lo como DataFrame?'
      },
      xpReward: 20,
      estimatedMinutes: 20
    },
    // PASO 1.8
    {
      id: 'db-1-8',
      title: {
        es: 'Visualizaciones Nativas en Databricks',
        en: 'Native Visualizations in Databricks',
        pt: 'Visualizações Nativas no Databricks'
      },
      description: {
        es: 'Databricks tiene visualizaciones built-in increíbles. Aprendé a usarlas.',
        en: 'Databricks has amazing built-in visualizations. Learn to use them.',
        pt: 'O Databricks tem visualizações built-in incríveis. Aprenda a usá-las.'
      },
      theory: {
        es: `## Visualizaciones en Databricks

Databricks tiene un sistema de visualización muy poderoso integrado.

### Usar display() en vez de show()

\`\`\`python
# ❌ Esto muestra texto plano
df.show()

# ✅ Esto muestra una tabla interactiva con opciones de visualización
display(df)
\`\`\`

### Tipos de Visualización Disponibles:

Después de ejecutar \`display(df)\`, podés hacer click en el ícono de gráfico para:

| Tipo | Uso |
|------|-----|
| 📊 Bar Chart | Comparar categorías |
| 📈 Line Chart | Tendencias temporales |
| 🥧 Pie Chart | Proporciones |
| 📉 Area Chart | Volúmenes acumulados |
| 🗺️ Map | Datos geográficos |
| 📋 Pivot Table | Análisis multidimensional |
| 🎯 Scatter Plot | Correlaciones |

### Configurar Visualización:

1. Ejecutar \`display(df)\`
2. Click en **+** al lado de "Table"
3. Elegir tipo de gráfico
4. Configurar:
   - Keys (eje X)
   - Values (eje Y)
   - Series groupings
   - Aggregations

### Guardar Visualización:

Las visualizaciones se guardan con el notebook. Podés:
- Renombrarlas
- Tener múltiples por celda
- Exportarlas como imagen`,
        en: `## Visualizations in Databricks

Databricks has a very powerful integrated visualization system.

### Use display() instead of show()

\`\`\`python
# ❌ This shows plain text
df.show()

# ✅ This shows an interactive table with visualization options
display(df)
\`\`\`

### Available Visualization Types:

After running \`display(df)\`, you can click the chart icon for:

| Type | Use |
|------|-----|
| 📊 Bar Chart | Compare categories |
| 📈 Line Chart | Time trends |
| 🥧 Pie Chart | Proportions |
| 📉 Area Chart | Cumulative volumes |
| 🗺️ Map | Geographic data |
| 📋 Pivot Table | Multidimensional analysis |
| 🎯 Scatter Plot | Correlations |

### Configure Visualization:

1. Run \`display(df)\`
2. Click **+** next to "Table"
3. Choose chart type
4. Configure:
   - Keys (X axis)
   - Values (Y axis)
   - Series groupings
   - Aggregations

### Save Visualization:

Visualizations are saved with the notebook. You can:
- Rename them
- Have multiple per cell
- Export as image`,
        pt: `## Visualizações no Databricks

O Databricks tem um sistema de visualização muito poderoso integrado.

### Usar display() em vez de show()

\`\`\`python
# ❌ Isso mostra texto simples
df.show()

# ✅ Isso mostra uma tabela interativa com opções de visualização
display(df)
\`\`\`

### Tipos de Visualização Disponíveis:

Após executar \`display(df)\`, você pode clicar no ícone de gráfico para:

| Tipo | Uso |
|------|-----|
| 📊 Bar Chart | Comparar categorias |
| 📈 Line Chart | Tendências temporais |
| 🥧 Pie Chart | Proporções |
| 📉 Area Chart | Volumes acumulados |
| 🗺️ Map | Dados geográficos |
| 📋 Pivot Table | Análise multidimensional |
| 🎯 Scatter Plot | Correlações |

### Configurar Visualização:

1. Executar \`display(df)\`
2. Clicar em **+** ao lado de "Table"
3. Escolher tipo de gráfico
4. Configurar:
   - Keys (eixo X)
   - Values (eixo Y)
   - Series groupings
   - Aggregations

### Salvar Visualização:

As visualizações são salvas com o notebook. Você pode:
- Renomeá-las
- Ter múltiplas por célula
- Exportá-las como imagem`
      },
      codeExample: {
        language: 'python',
        code: `# Cargar datos de ejemplo para visualizar
df = spark.read.csv(
    "/databricks-datasets/samples/population-vs-price/data_geo.csv",
    header=True,
    inferSchema=True
)

# Ver con display (interactivo)
display(df)

# Tip: Después de ejecutar, click en el ícono de gráfico
# para crear visualizaciones sin código

# También podés agregar títulos con displayHTML
displayHTML("<h2>🏙️ Análisis de Ciudades</h2>")
display(df)`,
        explanation: {
          es: 'Usá display() para ver tablas interactivas. Luego podés crear gráficos con clicks.',
          en: 'Use display() to see interactive tables. Then you can create charts with clicks.',
          pt: 'Use display() para ver tabelas interativas. Depois você pode criar gráficos com cliques.'
        }
      },
      practicalTips: [
        {
          es: '🎨 Databricks guarda las visualizaciones automáticamente. No perdés tu trabajo.',
          en: '🎨 Databricks saves visualizations automatically. You won\'t lose your work.',
          pt: '🎨 O Databricks salva as visualizações automaticamente. Você não perde seu trabalho.'
        },
        {
          es: '💡 Usá displayHTML() para agregar títulos y formato entre visualizaciones.',
          en: '💡 Use displayHTML() to add titles and formatting between visualizations.',
          pt: '💡 Use displayHTML() para adicionar títulos e formatação entre visualizações.'
        }
      ],
      externalLinks: [
        {
          title: 'Databricks Visualizations',
          url: 'https://docs.databricks.com/visualizations/index.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '✅ ¿Creaste al menos un gráfico de barras y uno de líneas usando display()?',
        en: '✅ Did you create at least one bar chart and one line chart using display()?',
        pt: '✅ Você criou pelo menos um gráfico de barras e um de linhas usando display()?'
      },
      xpReward: 20,
      estimatedMinutes: 20
    },
    // PASO 1.9
    {
      id: 'db-1-9',
      title: {
        es: 'dbutils: La Navaja Suiza de Databricks',
        en: 'dbutils: The Swiss Army Knife of Databricks',
        pt: 'dbutils: O Canivete Suíço do Databricks'
      },
      description: {
        es: 'dbutils es una utilidad poderosa para trabajar con archivos, secrets, widgets y más.',
        en: 'dbutils is a powerful utility for working with files, secrets, widgets and more.',
        pt: 'dbutils é um utilitário poderoso para trabalhar com arquivos, secrets, widgets e mais.'
      },
      theory: {
        es: `## dbutils - Databricks Utilities

\`dbutils\` es un objeto que viene pre-cargado en Databricks con utilidades muy útiles.

### Módulos principales:

### 1. dbutils.fs - Sistema de archivos
\`\`\`python
# Listar archivos
dbutils.fs.ls("/path/")

# Copiar
dbutils.fs.cp("source", "dest")

# Mover
dbutils.fs.mv("source", "dest")

# Eliminar
dbutils.fs.rm("path", recurse=True)

# Crear carpeta
dbutils.fs.mkdirs("path")

# Ver contenido
dbutils.fs.head("path", maxBytes=1000)
\`\`\`

### 2. dbutils.widgets - Parámetros interactivos
\`\`\`python
# Crear widget de texto
dbutils.widgets.text("nombre", "default", "Etiqueta")

# Crear dropdown
dbutils.widgets.dropdown("pais", "AR", ["AR", "MX", "CO"])

# Obtener valor
valor = dbutils.widgets.get("nombre")

# Eliminar
dbutils.widgets.remove("nombre")
dbutils.widgets.removeAll()
\`\`\`

### 3. dbutils.secrets - Credenciales seguras
\`\`\`python
# Obtener secret (configurado en Scope)
password = dbutils.secrets.get(scope="mi-scope", key="db-password")
\`\`\`

### 4. dbutils.notebook - Ejecutar otros notebooks
\`\`\`python
# Ejecutar notebook y obtener resultado
result = dbutils.notebook.run("path/notebook", timeout_seconds=60)

# Salir del notebook con valor
dbutils.notebook.exit("valor_de_retorno")
\`\`\`

### 5. dbutils.library - Instalar bibliotecas
\`\`\`python
# Instalar desde PyPI
dbutils.library.installPyPI("pandas")

# Reiniciar Python
dbutils.library.restartPython()
\`\`\`

### Ver ayuda:
\`\`\`python
dbutils.help()
dbutils.fs.help()
\`\`\``,
        en: `## dbutils - Databricks Utilities

\`dbutils\` is a pre-loaded object in Databricks with very useful utilities.

### Main modules:

### 1. dbutils.fs - File system
\`\`\`python
# List files
dbutils.fs.ls("/path/")

# Copy
dbutils.fs.cp("source", "dest")

# Move
dbutils.fs.mv("source", "dest")

# Delete
dbutils.fs.rm("path", recurse=True)

# Create folder
dbutils.fs.mkdirs("path")

# View contents
dbutils.fs.head("path", maxBytes=1000)
\`\`\`

### 2. dbutils.widgets - Interactive parameters
\`\`\`python
# Create text widget
dbutils.widgets.text("name", "default", "Label")

# Create dropdown
dbutils.widgets.dropdown("country", "US", ["US", "MX", "CO"])

# Get value
value = dbutils.widgets.get("name")

# Remove
dbutils.widgets.remove("name")
dbutils.widgets.removeAll()
\`\`\`

### 3. dbutils.secrets - Secure credentials
\`\`\`python
# Get secret (configured in Scope)
password = dbutils.secrets.get(scope="my-scope", key="db-password")
\`\`\`

### 4. dbutils.notebook - Run other notebooks
\`\`\`python
# Run notebook and get result
result = dbutils.notebook.run("path/notebook", timeout_seconds=60)

# Exit notebook with value
dbutils.notebook.exit("return_value")
\`\`\`

### 5. dbutils.library - Install libraries
\`\`\`python
# Install from PyPI
dbutils.library.installPyPI("pandas")

# Restart Python
dbutils.library.restartPython()
\`\`\`

### View help:
\`\`\`python
dbutils.help()
dbutils.fs.help()
\`\`\``,
        pt: `## dbutils - Databricks Utilities

\`dbutils\` é um objeto pré-carregado no Databricks com utilidades muito úteis.

### Módulos principais:

### 1. dbutils.fs - Sistema de arquivos
\`\`\`python
# Listar arquivos
dbutils.fs.ls("/path/")

# Copiar
dbutils.fs.cp("source", "dest")

# Mover
dbutils.fs.mv("source", "dest")

# Excluir
dbutils.fs.rm("path", recurse=True)

# Criar pasta
dbutils.fs.mkdirs("path")

# Ver conteúdo
dbutils.fs.head("path", maxBytes=1000)
\`\`\`

### 2. dbutils.widgets - Parâmetros interativos
\`\`\`python
# Criar widget de texto
dbutils.widgets.text("nome", "default", "Rótulo")

# Criar dropdown
dbutils.widgets.dropdown("pais", "BR", ["BR", "MX", "CO"])

# Obter valor
valor = dbutils.widgets.get("nome")

# Remover
dbutils.widgets.remove("nome")
dbutils.widgets.removeAll()
\`\`\`

### 3. dbutils.secrets - Credenciais seguras
\`\`\`python
# Obter secret (configurado no Scope)
password = dbutils.secrets.get(scope="meu-scope", key="db-password")
\`\`\`

### 4. dbutils.notebook - Executar outros notebooks
\`\`\`python
# Executar notebook e obter resultado
result = dbutils.notebook.run("path/notebook", timeout_seconds=60)

# Sair do notebook com valor
dbutils.notebook.exit("valor_de_retorno")
\`\`\`

### 5. dbutils.library - Instalar bibliotecas
\`\`\`python
# Instalar do PyPI
dbutils.library.installPyPI("pandas")

# Reiniciar Python
dbutils.library.restartPython()
\`\`\`

### Ver ajuda:
\`\`\`python
dbutils.help()
dbutils.fs.help()
\`\`\``
      },
      codeExample: {
        language: 'python',
        code: `# Ejemplos prácticos de dbutils

# 1. Ver ayuda general
dbutils.help()

# 2. Listar datasets de ejemplo
display(dbutils.fs.ls("/databricks-datasets/"))

# 3. Crear un widget para filtrar datos
dbutils.widgets.dropdown(
    "dataset",
    "wine-quality",
    ["wine-quality", "nyctaxi", "COVID"],
    "Seleccionar Dataset"
)

# 4. Usar el valor del widget
selected = dbutils.widgets.get("dataset")
print(f"Dataset seleccionado: {selected}")

# 5. Mostrar archivos del dataset seleccionado
display(dbutils.fs.ls(f"/databricks-datasets/{selected}/"))`,
        explanation: {
          es: 'Los widgets permiten crear notebooks interactivos donde el usuario puede seleccionar parámetros sin tocar código.',
          en: 'Widgets allow you to create interactive notebooks where the user can select parameters without touching code.',
          pt: 'Os widgets permitem criar notebooks interativos onde o usuário pode selecionar parâmetros sem tocar no código.'
        }
      },
      practicalTips: [
        {
          es: '⭐ Los widgets son ideales para crear notebooks que usen otras personas no técnicas.',
          en: '⭐ Widgets are ideal for creating notebooks that non-technical people can use.',
          pt: '⭐ Os widgets são ideais para criar notebooks que pessoas não técnicas possam usar.'
        },
        {
          es: '🔒 Nunca hardcodees passwords en el código. Usá dbutils.secrets.',
          en: '🔒 Never hardcode passwords in code. Use dbutils.secrets.',
          pt: '🔒 Nunca coloque senhas fixas no código. Use dbutils.secrets.'
        }
      ],
      externalLinks: [
        {
          title: 'dbutils Reference',
          url: 'https://docs.databricks.com/dev-tools/databricks-utils.html',
          type: 'docs'
        },
        {
          title: 'Widgets Documentation',
          url: 'https://docs.databricks.com/notebooks/widgets.html',
          type: 'docs'
        }
      ],
      checkpoint: {
        es: '✅ ¿Creaste un widget dropdown y lo usaste para filtrar datos?',
        en: '✅ Did you create a dropdown widget and use it to filter data?',
        pt: '✅ Você criou um widget dropdown e o usou para filtrar dados?'
      },
      xpReward: 25,
      estimatedMinutes: 25
    },
    // PASO 1.10
    {
      id: 'db-1-10',
      title: {
        es: 'Proyecto Mini: Tu Primer Pipeline Completo',
        en: 'Mini Project: Your First Complete Pipeline',
        pt: 'Mini Projeto: Seu Primeiro Pipeline Completo'
      },
      description: {
        es: 'Juntá todo lo aprendido en un mini proyecto: cargar datos, transformar, visualizar.',
        en: 'Put everything learned together in a mini project: load data, transform, visualize.',
        pt: 'Junte tudo o que aprendeu em um mini projeto: carregar dados, transformar, visualizar.'
      },
      theory: {
        es: `## Mini Proyecto: Análisis de Calidad de Vinos 🍷

Vamos a crear un notebook completo que:
1. Cargue datos del dataset wine-quality
2. Explore y limpie los datos
3. Cree visualizaciones
4. Guarde resultados

### Estructura del Notebook:

\`\`\`
📓 01-Analisis-Vinos
├── 📝 Markdown: Título y descripción
├── 🔧 Setup: Imports y configuración
├── 📥 Ingesta: Cargar datos
├── 🔍 Exploración: Análisis inicial
├── 🧹 Limpieza: Transformaciones
├── 📊 Visualización: Gráficos
└── 💾 Guardado: Persistir resultados
\`\`\`

### Checklist del Proyecto:

- [ ] Crear notebook con nombre descriptivo
- [ ] Documentar con Markdown
- [ ] Cargar dataset wine-quality
- [ ] Explorar schema y estadísticas
- [ ] Crear al menos 3 visualizaciones
- [ ] Guardar DataFrame limpio como tabla
- [ ] Agregar conclusiones`,
        en: `## Mini Project: Wine Quality Analysis 🍷

We're going to create a complete notebook that:
1. Loads data from wine-quality dataset
2. Explores and cleans the data
3. Creates visualizations
4. Saves results

### Notebook Structure:

\`\`\`
📓 01-Wine-Analysis
├── 📝 Markdown: Title and description
├── 🔧 Setup: Imports and configuration
├── 📥 Ingestion: Load data
├── 🔍 Exploration: Initial analysis
├── 🧹 Cleaning: Transformations
├── 📊 Visualization: Charts
└── 💾 Saving: Persist results
\`\`\`

### Project Checklist:

- [ ] Create notebook with descriptive name
- [ ] Document with Markdown
- [ ] Load wine-quality dataset
- [ ] Explore schema and statistics
- [ ] Create at least 3 visualizations
- [ ] Save clean DataFrame as table
- [ ] Add conclusions`,
        pt: `## Mini Projeto: Análise de Qualidade de Vinhos 🍷

Vamos criar um notebook completo que:
1. Carregue dados do dataset wine-quality
2. Explore e limpe os dados
3. Crie visualizações
4. Salve resultados

### Estrutura do Notebook:

\`\`\`
📓 01-Analise-Vinhos
├── 📝 Markdown: Título e descrição
├── 🔧 Setup: Imports e configuração
├── 📥 Ingestão: Carregar dados
├── 🔍 Exploração: Análise inicial
├── 🧹 Limpeza: Transformações
├── 📊 Visualização: Gráficos
└── 💾 Salvamento: Persistir resultados
\`\`\`

### Checklist do Projeto:

- [ ] Criar notebook com nome descritivo
- [ ] Documentar com Markdown
- [ ] Carregar dataset wine-quality
- [ ] Explorar schema e estatísticas
- [ ] Criar pelo menos 3 visualizações
- [ ] Salvar DataFrame limpo como tabela
- [ ] Adicionar conclusões`
      },
      codeExample: {
        language: 'python',
        code: `# ===========================================
# 🍷 ANÁLISIS DE CALIDAD DE VINOS
# Proyecto de la Fase 1 - Databricks
# ===========================================

# %md
# # 🍷 Análisis de Calidad de Vinos
# 
# **Objetivo:** Explorar el dataset de calidad de vinos y crear visualizaciones.
# 
# **Dataset:** /databricks-datasets/wine-quality/

# Celda 1: Setup
from pyspark.sql.functions import *

# Celda 2: Cargar datos
df_red = spark.read.csv(
    "/databricks-datasets/wine-quality/winequality-red.csv",
    header=True,
    inferSchema=True,
    sep=";"
)
df_red = df_red.withColumn("wine_type", lit("red"))

df_white = spark.read.csv(
    "/databricks-datasets/wine-quality/winequality-white.csv",
    header=True,
    inferSchema=True,
    sep=";"
)
df_white = df_white.withColumn("wine_type", lit("white"))

# Unir ambos datasets
df = df_red.union(df_white)
print(f"Total de vinos: {df.count()}")

# Celda 3: Exploración
df.printSchema()
display(df.describe())

# Celda 4: Análisis de calidad
# (Crear gráfico de barras después de ejecutar)
quality_dist = df.groupBy("quality", "wine_type").count()
display(quality_dist)

# Celda 5: Correlación alcohol vs calidad
# (Crear scatter plot)
display(df.select("alcohol", "quality", "wine_type"))

# Celda 6: Guardar como tabla
df.write.mode("overwrite").saveAsTable("wines_analysis")
print("✅ Tabla guardada exitosamente!")`,
        explanation: {
          es: 'Este proyecto integra todo lo aprendido: cargar datos, explorar, transformar, visualizar y guardar.',
          en: 'This project integrates everything learned: loading data, exploring, transforming, visualizing and saving.',
          pt: 'Este projeto integra tudo o que foi aprendido: carregar dados, explorar, transformar, visualizar e salvar.'
        }
      },
      practicalTips: [
        {
          es: '📓 Este notebook puede ser parte de tu portfolio. Hacelo prolijo!',
          en: '📓 This notebook can be part of your portfolio. Make it neat!',
          pt: '📓 Este notebook pode fazer parte do seu portfólio. Faça-o organizado!'
        },
        {
          es: '💡 Agregá tus propias conclusiones al final del notebook. Muestra pensamiento analítico.',
          en: '💡 Add your own conclusions at the end of the notebook. Show analytical thinking.',
          pt: '💡 Adicione suas próprias conclusões no final do notebook. Mostre pensamento analítico.'
        }
      ],
      externalLinks: [
        {
          title: 'Wine Quality Dataset Info',
          url: 'https://archive.ics.uci.edu/ml/datasets/wine+quality',
          type: 'article'
        }
      ],
      checkpoint: {
        es: '🏆 ¿Completaste el notebook con al menos 3 visualizaciones y guardaste la tabla?',
        en: '🏆 Did you complete the notebook with at least 3 visualizations and save the table?',
        pt: '🏆 Você completou o notebook com pelo menos 3 visualizações e salvou a tabela?'
      },
      xpReward: 50,
      estimatedMinutes: 45
    }
  ]
};


