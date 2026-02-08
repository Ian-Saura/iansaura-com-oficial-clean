/**
 * FASE FARGATE: ECS FARGATE PARA ETL PESADO
 * 8 pasos para dominar contenedores serverless como motor de procesamiento pesado
 * Nivel 1: Serverless Data Engineering
 * 
 * Costo: Fargate cobra por vCPU/hora y GB/hora. Spot disponible (70% ahorro).
 */
import { AWSStep } from '../types';

export const phaseFargateSteps: AWSStep[] = [
  // ═══════════════════════════════════════════════════════════════
  // STEP 1: Cuando Lambda No Alcanza
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-fargate-1',
    stepNumber: 212,
    title: {
      es: 'Cuando Lambda No Alcanza',
      en: 'When Lambda Is Not Enough',
      pt: 'Quando Lambda Não É Suficiente'
    },
    description: {
      es: 'Entender los límites de Lambda y cuándo Fargate es la opción correcta para ETL pesado, procesamiento largo y archivos grandes.',
      en: 'Understand Lambda limits and when Fargate is the right choice for heavy ETL, long processing and large files.',
      pt: 'Entender os limites do Lambda e quando Fargate é a opção correta para ETL pesado, processamento longo e arquivos grandes.'
    },
    theory: {
      es: `## Cuando Lambda No Alcanza

### Los Límites Duros de Lambda
\`\`\`
┌────────────────────────────────────────────────────┐
│              LÍMITES DE LAMBDA                      │
├────────────────────────────────────────────────────┤
│  ⏱️  Timeout máximo:      15 minutos               │
│  🧠 Memoria máxima:       10 GB                    │
│  💾 Almacenamiento /tmp:  10 GB                    │
│  📦 Deployment package:   250 MB (zip), 10 GB (img)│
│  📤 Payload response:     6 MB (sync)              │
│  🔄 Concurrencia default: 1,000 por región         │
└────────────────────────────────────────────────────┘
\`\`\`

### Fargate: Contenedores Sin Servidores
Fargate es el motor de compute serverless de ECS. Ejecutas contenedores Docker sin gestionar EC2. No hay límite de tiempo ni de memoria (hasta 30 GB estándar, 120 GB con configuración extendida).

\`\`\`
Lambda:                          Fargate:
┌──────────────────┐            ┌──────────────────┐
│ Max 15 min       │            │ Sin límite tiempo│
│ Max 10 GB RAM    │            │ Hasta 120 GB RAM │
│ Max 6 vCPU       │            │ Hasta 16 vCPU    │
│ Event-driven     │            │ Task-based       │
│ Auto-scale 0→N   │            │ Scale 0→N        │
│ Cold start 1-10s │            │ Start 30-60s     │
│ $0 Free Tier     │            │ $$ por uso       │
└──────────────────┘            └──────────────────┘
\`\`\`

### Árbol de Decisión: Lambda vs Fargate
\`\`\`
¿Tu ETL tarda < 15 minutos?
├── SÍ → ¿Necesita < 10 GB RAM?
│        ├── SÍ → ✅ USA LAMBDA (más barato, más simple)
│        └── NO → 🐳 USA FARGATE
└── NO → 🐳 USA FARGATE

¿Tu archivo pesa > 10 GB?
├── SÍ → 🐳 USA FARGATE (puede montar EFS o usar más RAM)
└── NO → ✅ Lambda puede manejarlo

¿Necesitas procesamiento stateful (mantener estado entre ejecuciones)?
├── SÍ → 🐳 USA FARGATE (contenedor persiste)
└── NO → ✅ Lambda es ideal para stateless

¿Necesitas GPU?
├── SÍ → 🖥️ USA EC2 o SageMaker
└── NO → Lambda o Fargate
\`\`\`

### Comparativa de Costos (1 ejecución diaria, 30 días)
| Escenario | Lambda | Fargate | Ganador |
|-----------|--------|---------|---------|
| 100 MB, 2 min | $0.00 (Free Tier) | $0.04 | Lambda |
| 1 GB, 10 min | $0.10 | $0.08 | ~Igual |
| 5 GB, 30 min | ❌ Timeout | $0.20 | Fargate |
| 10 GB, 2 horas | ❌ Timeout | $0.80 | Fargate |
| 50 GB, 6 horas | ❌ Imposible | $2.40 | Fargate |

### Procesamiento Stateful vs Stateless
- **Stateless (Lambda)**: Cada invocación es independiente. No recuerda nada entre ejecuciones. Ideal para: transformar un archivo, validar un registro, enviar notificación.
- **Stateful (Fargate)**: El contenedor puede mantener estado en memoria durante toda la ejecución. Ideal para: procesar millones de registros acumulando resultados, joins en memoria, deduplicación masiva.

### Manejo de Archivos Grandes
\`\`\`python
# Lambda: limitado a 10 GB en /tmp
# Si el archivo es mayor, necesitas streaming o chunks

# Fargate: hasta 200 GB de ephemeral storage
# O montar EFS para almacenamiento compartido ilimitado
# Puedes tener 120 GB de RAM para procesamiento en memoria
\`\`\`

### Cuándo Usar Cada Servicio en Producción
| Caso de Uso | Servicio Recomendado |
|-------------|---------------------|
| CSV < 1 GB, transformación simple | Lambda |
| CSV > 10 GB, transformación compleja | Fargate |
| Procesamiento < 15 min, event-driven | Lambda |
| Procesamiento > 15 min, batch/scheduled | Fargate |
| Miles de archivos pequeños en paralelo | Lambda |
| Un archivo gigante que requiere mucha RAM | Fargate |
| Pipeline Spark distribuido | Glue / EMR |
| ML Training | SageMaker |`,
      en: `## When Lambda Is Not Enough

### Lambda Hard Limits
\`\`\`
┌────────────────────────────────────────────────────┐
│              LAMBDA LIMITS                          │
├────────────────────────────────────────────────────┤
│  ⏱️  Max timeout:       15 minutes                  │
│  🧠 Max memory:         10 GB                      │
│  💾 /tmp storage:       10 GB                      │
│  📦 Deployment package: 250 MB (zip), 10 GB (img)  │
│  📤 Payload response:   6 MB (sync)                │
└────────────────────────────────────────────────────┘
\`\`\`

### Fargate: Serverless Containers
Fargate is the serverless compute engine for ECS. Run Docker containers without managing EC2. No time or memory limits (up to 30 GB standard, 120 GB extended).

### Decision Tree: Lambda vs Fargate
\`\`\`
Does your ETL take < 15 minutes?
├── YES → Needs < 10 GB RAM? → YES → ✅ USE LAMBDA
│                              → NO  → 🐳 USE FARGATE
└── NO  → 🐳 USE FARGATE

Is your file > 10 GB?
├── YES → 🐳 USE FARGATE
└── NO  → ✅ Lambda can handle it
\`\`\`

### Cost Comparison (1 daily execution, 30 days)
| Scenario | Lambda | Fargate | Winner |
|----------|--------|---------|--------|
| 100 MB, 2 min | $0.00 (Free Tier) | $0.04 | Lambda |
| 5 GB, 30 min | ❌ Timeout | $0.20 | Fargate |
| 10 GB, 2 hours | ❌ Timeout | $0.80 | Fargate |

### When to Use Each Service
| Use Case | Recommended Service |
|----------|---------------------|
| CSV < 1 GB, simple transform | Lambda |
| CSV > 10 GB, complex transform | Fargate |
| Processing < 15 min, event-driven | Lambda |
| Processing > 15 min, batch/scheduled | Fargate |
| Thousands of small files in parallel | Lambda |
| One huge file needing lots of RAM | Fargate |`,
      pt: `## Quando Lambda Não É Suficiente

### Limites do Lambda
\`\`\`
Timeout máximo:      15 minutos
Memória máxima:      10 GB
Armazenamento /tmp:  10 GB
\`\`\`

### Fargate: Containers Serverless
Fargate é o motor de compute serverless do ECS. Execute containers Docker sem gerenciar EC2. Sem limite de tempo nem memória (até 30 GB padrão, 120 GB estendido).

### Árvore de Decisão: Lambda vs Fargate
\`\`\`
Seu ETL demora < 15 minutos?
├── SIM → Precisa < 10 GB RAM? → SIM → ✅ USE LAMBDA
│                                → NÃO → 🐳 USE FARGATE
└── NÃO → 🐳 USE FARGATE
\`\`\`

### Quando Usar Cada Serviço
| Caso de Uso | Serviço Recomendado |
|-------------|---------------------|
| CSV < 1 GB, transformação simples | Lambda |
| CSV > 10 GB, transformação complexa | Fargate |
| Processamento < 15 min, event-driven | Lambda |
| Processamento > 15 min, batch/scheduled | Fargate |`
    },
    practicalTips: [
      { es: '📏 Regla de oro: si tu ETL cabe en 15 min y 10 GB RAM, usa Lambda. Si no, usa Fargate. Siempre empieza con Lambda y migra cuando sea necesario.', en: '📏 Rule of thumb: if your ETL fits in 15 min and 10 GB RAM, use Lambda. Otherwise, use Fargate. Always start with Lambda and migrate when needed.', pt: '📏 Regra de ouro: se seu ETL cabe em 15 min e 10 GB RAM, use Lambda. Senão, use Fargate. Sempre comece com Lambda e migre quando necessário.' },
      { es: '💡 En la práctica empresarial, el 80% de los pipelines caben en Lambda. Fargate es para el 20% restante: archivos pesados, procesamiento largo, dependencias complejas.', en: '💡 In enterprise practice, 80% of pipelines fit in Lambda. Fargate is for the remaining 20%: heavy files, long processing, complex dependencies.', pt: '💡 Na prática empresarial, 80% dos pipelines cabem no Lambda. Fargate é para os 20% restantes: arquivos pesados, processamento longo, dependências complexas.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cuándo elegirías Fargate sobre Lambda para ETL?" → Cuando el procesamiento supera 15 minutos, cuando necesito más de 10 GB de RAM, cuando tengo dependencias pesadas (Spark, TensorFlow), o cuando necesito procesamiento stateful acumulando resultados en memoria.', en: '🎯 "When would you choose Fargate over Lambda for ETL?" → When processing exceeds 15 minutes, when I need more than 10 GB RAM, when I have heavy dependencies (Spark, TensorFlow), or when I need stateful processing accumulating results in memory.', pt: '🎯 "Quando você escolheria Fargate sobre Lambda para ETL?" → Quando o processamento supera 15 minutos, quando preciso de mais de 10 GB de RAM, quando tenho dependências pesadas (Spark, TensorFlow), ou quando preciso de processamento stateful acumulando resultados na memória.' },
      { es: '🎯 "Tu pipeline Lambda empieza a dar timeout. ¿Qué haces?" → 1) Optimizar: chunks, streaming, reducir datos. 2) Si ya está optimizado y sigue tardando > 15 min, migrar a Fargate. 3) Mantener la misma lógica Python, solo cambiar el runtime. 4) Usar Step Functions para orquestar Lambda → Fargate.', en: '🎯 "Your Lambda pipeline starts timing out. What do you do?" → 1) Optimize: chunks, streaming, reduce data. 2) If already optimized and still > 15 min, migrate to Fargate. 3) Keep the same Python logic, just change the runtime. 4) Use Step Functions to orchestrate Lambda → Fargate.', pt: '🎯 "Seu pipeline Lambda começa a dar timeout. O que você faz?" → 1) Otimizar: chunks, streaming, reduzir dados. 2) Se já está otimizado e continua > 15 min, migrar para Fargate. 3) Manter a mesma lógica Python, só mudar o runtime. 4) Usar Step Functions para orquestrar Lambda → Fargate.' },
      { es: '🎯 "¿Fargate es realmente serverless?" → Sí, en el sentido de que no gestionas EC2. AWS provisiona la infraestructura. Pero NO escala a 0 automáticamente como Lambda (necesitas configurar Service con desired count = 0). Para tareas ETL, se usan RunTask (no Services), que sí escalan a 0.', en: '🎯 "Is Fargate truly serverless?" → Yes, in the sense you don\'t manage EC2. AWS provisions infrastructure. But it does NOT auto-scale to 0 like Lambda (you need Service with desired count = 0). For ETL tasks, use RunTask (not Services), which does scale to 0.', pt: '🎯 "Fargate é realmente serverless?" → Sim, no sentido de que você não gerencia EC2. AWS provisiona a infraestrutura. Mas NÃO escala a 0 automaticamente como Lambda (precisa configurar Service com desired count = 0). Para tarefas ETL, use RunTask (não Services), que sim escala a 0.' }
    ],
    commonMistakes: [
      { es: '❌ Usar Fargate para tareas simples que Lambda maneja perfectamente - pagas más por nada', en: '❌ Using Fargate for simple tasks that Lambda handles perfectly - you pay more for nothing', pt: '❌ Usar Fargate para tarefas simples que Lambda lida perfeitamente - você paga mais por nada' },
      { es: '❌ No considerar Spot Fargate para ETL batch - puedes ahorrar hasta 70% en workloads tolerantes a interrupciones', en: '❌ Not considering Spot Fargate for batch ETL - you can save up to 70% on interrupt-tolerant workloads', pt: '❌ Não considerar Spot Fargate para ETL batch - você pode economizar até 70% em workloads tolerantes a interrupções' }
    ],
    externalLinks: [
      { title: 'AWS Fargate Documentation', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/AWS_Fargate.html', type: 'aws_docs' },
      { title: 'Lambda vs Fargate Comparison', url: 'https://aws.amazon.com/fargate/pricing/', type: 'aws_docs' },
      { title: 'Serverless Containers on AWS', url: 'https://aws.amazon.com/fargate/', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Puedes explicar cuándo usar Lambda vs Fargate vs Glue para un ETL dado?', en: '✅ Can you explain when to use Lambda vs Fargate vs Glue for a given ETL?', pt: '✅ Você consegue explicar quando usar Lambda vs Fargate vs Glue para um ETL dado?' },
    xpReward: 55,
    estimatedMinutes: 30,
    services: ['Lambda', 'ECS', 'Fargate']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 2: Docker para Data Engineers
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-fargate-2',
    stepNumber: 213,
    title: {
      es: 'Docker para Data Engineers',
      en: 'Docker for Data Engineers',
      pt: 'Docker para Data Engineers'
    },
    description: {
      es: 'Crear imágenes Docker optimizadas para ETL con Python, pandas y pyarrow. Multi-stage builds, buenas prácticas y .dockerignore.',
      en: 'Build optimized Docker images for ETL with Python, pandas and pyarrow. Multi-stage builds, best practices and .dockerignore.',
      pt: 'Criar imagens Docker otimizadas para ETL com Python, pandas e pyarrow. Multi-stage builds, boas práticas e .dockerignore.'
    },
    theory: {
      es: `## Docker para Data Engineers

### ¿Por qué Docker para ETL?
- **Reproducibilidad**: el mismo entorno en dev, staging y prod
- **Dependencias complejas**: pandas, pyarrow, scipy, sklearn sin conflictos
- **Sin límite de tamaño**: hasta 10 GB (vs 250 MB en Lambda zip)
- **Portabilidad**: funciona en Fargate, ECS EC2, EKS, Lambda Container Images

### Dockerfile Completo para ETL
\`\`\`dockerfile
# ═══════════════════════════════════════════════
# MULTI-STAGE BUILD: ETL Pipeline Python
# ═══════════════════════════════════════════════

# Stage 1: Builder - instalar dependencias
FROM python:3.12-slim AS builder

WORKDIR /build

# Instalar dependencias de compilación
RUN apt-get update && apt-get install -y --no-install-recommends \\
    gcc g++ && \\
    rm -rf /var/lib/apt/lists/*

# Copiar solo requirements primero (cache de Docker)
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Stage 2: Runtime - imagen final ligera
FROM python:3.12-slim AS runtime

# Metadata
LABEL maintainer="data-engineering-team"
LABEL description="ETL Pipeline: Bronze → Silver → Gold"
LABEL version="1.0.0"

WORKDIR /app

# Copiar dependencias del builder
COPY --from=builder /install /usr/local

# Copiar código de la aplicación
COPY src/ ./src/
COPY config/ ./config/

# Variables de entorno por defecto
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1
ENV AWS_DEFAULT_REGION=us-east-1

# Usuario no-root (seguridad)
RUN useradd --create-home etluser
USER etluser

# Comando de entrada
ENTRYPOINT ["python", "-m", "src.main"]
CMD ["--mode", "full"]
\`\`\`

### requirements.txt para ETL
\`\`\`
pandas==2.2.0
pyarrow==15.0.0
boto3==1.34.0
botocore==1.34.0
python-dateutil==2.9.0
requests==2.31.0
\`\`\`

### .dockerignore
\`\`\`
# .dockerignore - NO incluir estos archivos en la imagen
.git
.gitignore
__pycache__
*.pyc
*.pyo
.env
.env.*
*.md
tests/
docs/
.vscode/
.idea/
*.egg-info/
dist/
build/
.pytest_cache/
.mypy_cache/
node_modules/
\`\`\`

### COPY vs ADD
\`\`\`dockerfile
# COPY: copia archivos locales al contenedor (PREFERIR SIEMPRE)
COPY requirements.txt .
COPY src/ ./src/

# ADD: como COPY pero además:
#   - Descomprime .tar.gz automáticamente
#   - Descarga URLs
# USAR SOLO cuando necesitas descomprimir
ADD data.tar.gz /data/

# ❌ NO usar ADD para copiar archivos simples
# ADD requirements.txt .  ← usar COPY
\`\`\`

### CMD vs ENTRYPOINT
\`\`\`dockerfile
# ENTRYPOINT: comando que SIEMPRE se ejecuta (no se puede sobrescribir fácil)
ENTRYPOINT ["python", "-m", "src.main"]

# CMD: argumentos por defecto (se pueden sobrescribir)
CMD ["--mode", "full"]

# Resultado: python -m src.main --mode full
# Override: docker run mi-etl --mode incremental
#   → python -m src.main --mode incremental
\`\`\`

### Multi-Stage Build: ¿Por qué?
\`\`\`
Sin multi-stage:
  python:3.12 (1.0 GB) + gcc + pandas + pyarrow = ~2.5 GB 😱

Con multi-stage:
  Stage 1 (builder): python:3.12 + gcc + compilar dependencias
  Stage 2 (runtime): python:3.12-slim + solo binarios compilados = ~400 MB ✅

Ahorro: 2.5 GB → 400 MB = 84% menos tamaño
  → Push a ECR más rápido
  → Pull en Fargate más rápido
  → Menor superficie de ataque (seguridad)
\`\`\`

### Build y Test Local
\`\`\`bash
# Construir imagen
docker build -t mi-etl:latest .

# Ejecutar localmente con credenciales AWS
docker run \\
  -e AWS_ACCESS_KEY_ID=$AWS_ACCESS_KEY_ID \\
  -e AWS_SECRET_ACCESS_KEY=$AWS_SECRET_ACCESS_KEY \\
  -e AWS_DEFAULT_REGION=us-east-1 \\
  -e INPUT_BUCKET=mi-datalake-dev \\
  -e OUTPUT_BUCKET=mi-datalake-dev \\
  mi-etl:latest --mode test

# Ver tamaño de la imagen
docker images mi-etl
\`\`\``,
      en: `## Docker for Data Engineers

### Why Docker for ETL?
- **Reproducibility**: same environment in dev, staging and prod
- **Complex dependencies**: pandas, pyarrow, scipy, sklearn without conflicts
- **No size limit**: up to 10 GB (vs 250 MB Lambda zip)
- **Portability**: works on Fargate, ECS EC2, EKS, Lambda Container Images

### Complete ETL Dockerfile
\`\`\`dockerfile
# MULTI-STAGE BUILD: ETL Pipeline Python

# Stage 1: Builder
FROM python:3.12-slim AS builder
WORKDIR /build
RUN apt-get update && apt-get install -y --no-install-recommends gcc g++ && \\
    rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

# Stage 2: Runtime
FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /install /usr/local
COPY src/ ./src/
COPY config/ ./config/

ENV PYTHONUNBUFFERED=1
ENV AWS_DEFAULT_REGION=us-east-1

RUN useradd --create-home etluser
USER etluser

ENTRYPOINT ["python", "-m", "src.main"]
CMD ["--mode", "full"]
\`\`\`

### Multi-Stage Build Savings
\`\`\`
Without multi-stage: python:3.12 + gcc + pandas = ~2.5 GB
With multi-stage: python:3.12-slim + compiled binaries = ~400 MB (84% smaller)
\`\`\`

### COPY vs ADD
- COPY: copies local files (ALWAYS prefer this)
- ADD: also decompresses .tar.gz and downloads URLs (use only when needed)

### CMD vs ENTRYPOINT
- ENTRYPOINT: command that ALWAYS runs
- CMD: default arguments (can be overridden)`,
      pt: `## Docker para Data Engineers

### Por que Docker para ETL?
- **Reprodutibilidade**: mesmo ambiente em dev, staging e prod
- **Dependências complexas**: pandas, pyarrow sem conflitos
- **Sem limite de tamanho**: até 10 GB
- **Portabilidade**: funciona em Fargate, ECS EC2, EKS, Lambda Container Images

### Dockerfile Completo para ETL
\`\`\`dockerfile
# MULTI-STAGE BUILD
FROM python:3.12-slim AS builder
WORKDIR /build
COPY requirements.txt .
RUN pip install --no-cache-dir --prefix=/install -r requirements.txt

FROM python:3.12-slim AS runtime
WORKDIR /app
COPY --from=builder /install /usr/local
COPY src/ ./src/

ENV PYTHONUNBUFFERED=1
RUN useradd --create-home etluser
USER etluser

ENTRYPOINT ["python", "-m", "src.main"]
CMD ["--mode", "full"]
\`\`\`

### Multi-Stage Build
\`\`\`
Sem multi-stage: ~2.5 GB
Com multi-stage: ~400 MB (84% menor)
\`\`\``
    },
    practicalTips: [
      { es: '🐳 SIEMPRE usa multi-stage builds para ETL - la imagen final solo necesita el runtime, no gcc ni compiladores. Ahorro típico: 84% en tamaño.', en: '🐳 ALWAYS use multi-stage builds for ETL - the final image only needs the runtime, not gcc or compilers. Typical savings: 84% in size.', pt: '🐳 SEMPRE use multi-stage builds para ETL - a imagem final só precisa do runtime, não gcc nem compiladores. Economia típica: 84% no tamanho.' },
      { es: '📋 Copia requirements.txt ANTES del código fuente - Docker cachea las capas y no reinstala dependencias si solo cambias código.', en: '📋 Copy requirements.txt BEFORE source code - Docker caches layers and won\'t reinstall dependencies if you only change code.', pt: '📋 Copie requirements.txt ANTES do código fonte - Docker faz cache das camadas e não reinstala dependências se você só mudar código.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo optimizarías una imagen Docker para ETL?" → 1) Multi-stage build: compilar en builder, copiar solo binarios al runtime. 2) python:3.12-slim como base (no full). 3) .dockerignore para excluir tests, docs, .git. 4) Combinar RUN commands para reducir capas. 5) Usuario no-root por seguridad.', en: '🎯 "How would you optimize a Docker image for ETL?" → 1) Multi-stage build: compile in builder, copy only binaries to runtime. 2) python:3.12-slim as base (not full). 3) .dockerignore to exclude tests, docs, .git. 4) Combine RUN commands to reduce layers. 5) Non-root user for security.', pt: '🎯 "Como você otimizaria uma imagem Docker para ETL?" → 1) Multi-stage build: compilar no builder, copiar só binários para runtime. 2) python:3.12-slim como base (não full). 3) .dockerignore para excluir tests, docs, .git. 4) Combinar RUN commands para reduzir camadas. 5) Usuário não-root por segurança.' },
      { es: '🎯 "¿Cuál es la diferencia entre CMD y ENTRYPOINT?" → ENTRYPOINT define el ejecutable (no se sobrescribe fácilmente). CMD define argumentos por defecto (se sobrescriben al hacer docker run). Combinados: ENTRYPOINT es el programa, CMD son los flags default.', en: '🎯 "What is the difference between CMD and ENTRYPOINT?" → ENTRYPOINT defines the executable (not easily overridden). CMD defines default arguments (overridden on docker run). Combined: ENTRYPOINT is the program, CMD are the default flags.', pt: '🎯 "Qual é a diferença entre CMD e ENTRYPOINT?" → ENTRYPOINT define o executável (não é facilmente sobrescrito). CMD define argumentos padrão (sobrescritos ao fazer docker run). Combinados: ENTRYPOINT é o programa, CMD são os flags padrão.' }
    ],
    commonMistakes: [
      { es: '❌ Usar python:3.12 (imagen completa de 1 GB) en vez de python:3.12-slim (150 MB)', en: '❌ Using python:3.12 (full 1 GB image) instead of python:3.12-slim (150 MB)', pt: '❌ Usar python:3.12 (imagem completa de 1 GB) em vez de python:3.12-slim (150 MB)' },
      { es: '❌ Copiar todo el proyecto con COPY . . sin .dockerignore - incluye .git, tests, docs innecesariamente', en: '❌ Copying entire project with COPY . . without .dockerignore - includes .git, tests, docs unnecessarily', pt: '❌ Copiar todo o projeto com COPY . . sem .dockerignore - inclui .git, tests, docs desnecessariamente' }
    ],
    externalLinks: [
      { title: 'Dockerfile Best Practices', url: 'https://docs.docker.com/develop/develop-images/dockerfile_best-practices/', type: 'docs' },
      { title: 'Python Docker Images', url: 'https://hub.docker.com/_/python', type: 'docs' },
      { title: 'Multi-stage Builds', url: 'https://docs.docker.com/build/building/multi-stage/', type: 'docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un Dockerfile multi-stage para tu ETL Python con pandas y pyarrow?', en: '✅ Did you create a multi-stage Dockerfile for your Python ETL with pandas and pyarrow?', pt: '✅ Você criou um Dockerfile multi-stage para seu ETL Python com pandas e pyarrow?' },
    xpReward: 60,
    estimatedMinutes: 35,
    services: ['ECS', 'Fargate']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 3: Amazon ECR
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-fargate-3',
    stepNumber: 214,
    title: {
      es: 'Amazon ECR: Registro de Imágenes Docker',
      en: 'Amazon ECR: Docker Image Registry',
      pt: 'Amazon ECR: Registro de Imagens Docker'
    },
    description: {
      es: 'Crear repositorios en ECR, hacer push/pull de imágenes, configurar lifecycle policies y vulnerability scanning.',
      en: 'Create ECR repositories, push/pull images, configure lifecycle policies and vulnerability scanning.',
      pt: 'Criar repositórios no ECR, fazer push/pull de imagens, configurar lifecycle policies e vulnerability scanning.'
    },
    theory: {
      es: `## Amazon Elastic Container Registry (ECR)

### ¿Qué es ECR?
ECR es el registro de imágenes Docker de AWS. Es como Docker Hub pero privado, integrado con IAM, y optimizado para ECS/Fargate.

\`\`\`
Tu máquina local          Amazon ECR              ECS Fargate
┌──────────────┐         ┌──────────────┐        ┌──────────────┐
│ docker build │ ──push─▶│ mi-etl:v1.0  │ ──pull─▶│ Ejecuta ETL  │
│ docker tag   │         │ mi-etl:v1.1  │        │ en contenedor│
│ docker push  │         │ mi-etl:latest│        │              │
└──────────────┘         └──────────────┘        └──────────────┘
\`\`\`

### Crear Repositorio ECR
\`\`\`bash
# Crear repositorio
aws ecr create-repository \\
  --repository-name data-engineering/etl-pipeline \\
  --image-scanning-configuration scanOnPush=true \\
  --encryption-configuration encryptionType=AES256

# Listar repositorios
aws ecr describe-repositories

# Obtener URI del repositorio
aws ecr describe-repositories \\
  --repository-names data-engineering/etl-pipeline \\
  --query 'repositories[0].repositoryUri' \\
  --output text
# Output: 123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline
\`\`\`

### Build, Tag y Push
\`\`\`bash
# 1. Login en ECR (obtener token de autenticación)
aws ecr get-login-password --region us-east-1 | \\
  docker login --username AWS --password-stdin \\
  123456789012.dkr.ecr.us-east-1.amazonaws.com

# 2. Build de la imagen
docker build -t etl-pipeline:latest .

# 3. Tag con la URI de ECR
docker tag etl-pipeline:latest \\
  123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:latest

docker tag etl-pipeline:latest \\
  123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:v1.0.0

# 4. Push a ECR
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:v1.0.0
\`\`\`

### Pull de Imagen
\`\`\`bash
# Pull (después de docker login)
docker pull 123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:v1.0.0
\`\`\`

### Lifecycle Policy: Limpiar Imágenes Viejas
\`\`\`bash
# Mantener solo las últimas 10 imágenes taggeadas
aws ecr put-lifecycle-policy \\
  --repository-name data-engineering/etl-pipeline \\
  --lifecycle-policy-text '{
    "rules": [
      {
        "rulePriority": 1,
        "description": "Keep only 10 tagged images",
        "selection": {
          "tagStatus": "tagged",
          "tagPrefixList": ["v"],
          "countType": "imageCountMoreThan",
          "countNumber": 10
        },
        "action": { "type": "expire" }
      },
      {
        "rulePriority": 2,
        "description": "Delete untagged images older than 1 day",
        "selection": {
          "tagStatus": "untagged",
          "countType": "sinceImagePushed",
          "countUnit": "days",
          "countNumber": 1
        },
        "action": { "type": "expire" }
      }
    ]
  }'
\`\`\`

### Vulnerability Scanning
\`\`\`bash
# Escanear una imagen manualmente
aws ecr start-image-scan \\
  --repository-name data-engineering/etl-pipeline \\
  --image-id imageTag=latest

# Ver resultados del escaneo
aws ecr describe-image-scan-findings \\
  --repository-name data-engineering/etl-pipeline \\
  --image-id imageTag=latest

# Habilitar Enhanced Scanning (usa Amazon Inspector)
aws ecr put-registry-scanning-configuration \\
  --scan-type ENHANCED \\
  --rules '[{"scanFrequency": "CONTINUOUS_SCAN", "repositoryFilters": [{"filter": "*", "filterType": "WILDCARD"}]}]'
\`\`\`

### Script Automatizado: Build + Push
\`\`\`bash
#!/bin/bash
# deploy-image.sh - Build y push automatizado
set -e

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
REGION="us-east-1"
REPO="data-engineering/etl-pipeline"
TAG=\${1:-latest}
FULL_URI="$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com/$REPO:$TAG"

echo "Building image..."
docker build -t "$REPO:$TAG" .

echo "Logging into ECR..."
aws ecr get-login-password --region $REGION | \\
  docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$REGION.amazonaws.com"

echo "Tagging and pushing..."
docker tag "$REPO:$TAG" "$FULL_URI"
docker push "$FULL_URI"

echo "✅ Pushed: $FULL_URI"
\`\`\``,
      en: `## Amazon Elastic Container Registry (ECR)

### What is ECR?
ECR is AWS's Docker image registry. Like Docker Hub but private, integrated with IAM, and optimized for ECS/Fargate.

### Create Repository
\`\`\`bash
aws ecr create-repository \\
  --repository-name data-engineering/etl-pipeline \\
  --image-scanning-configuration scanOnPush=true
\`\`\`

### Build, Tag and Push
\`\`\`bash
# 1. Login to ECR
aws ecr get-login-password --region us-east-1 | \\
  docker login --username AWS --password-stdin \\
  123456789012.dkr.ecr.us-east-1.amazonaws.com

# 2. Build
docker build -t etl-pipeline:latest .

# 3. Tag with ECR URI
docker tag etl-pipeline:latest \\
  123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:latest

# 4. Push
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:latest
\`\`\`

### Lifecycle Policy
\`\`\`bash
# Keep only last 10 tagged images, delete untagged after 1 day
aws ecr put-lifecycle-policy \\
  --repository-name data-engineering/etl-pipeline \\
  --lifecycle-policy-text '{
    "rules": [
      {"rulePriority": 1, "selection": {"tagStatus": "tagged", "tagPrefixList": ["v"], "countType": "imageCountMoreThan", "countNumber": 10}, "action": {"type": "expire"}},
      {"rulePriority": 2, "selection": {"tagStatus": "untagged", "countType": "sinceImagePushed", "countUnit": "days", "countNumber": 1}, "action": {"type": "expire"}}
    ]
  }'
\`\`\`

### Vulnerability Scanning
\`\`\`bash
aws ecr start-image-scan \\
  --repository-name data-engineering/etl-pipeline \\
  --image-id imageTag=latest
\`\`\``,
      pt: `## Amazon Elastic Container Registry (ECR)

### O que é ECR?
ECR é o registro de imagens Docker da AWS. Como Docker Hub mas privado, integrado com IAM.

### Criar Repositório e Push
\`\`\`bash
# Criar repositório
aws ecr create-repository --repository-name data-engineering/etl-pipeline

# Login
aws ecr get-login-password --region us-east-1 | \\
  docker login --username AWS --password-stdin 123456789012.dkr.ecr.us-east-1.amazonaws.com

# Build, Tag, Push
docker build -t etl-pipeline:latest .
docker tag etl-pipeline:latest 123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:latest
docker push 123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:latest
\`\`\`

### Lifecycle Policy
Manter apenas as últimas 10 imagens e deletar imagens sem tag após 1 dia.`
    },
    practicalTips: [
      { es: '🔄 SIEMPRE configura lifecycle policies en ECR - sin ellas, las imágenes viejas se acumulan y el storage de ECR no es gratis ($0.10/GB/mes).', en: '🔄 ALWAYS configure lifecycle policies in ECR - without them, old images accumulate and ECR storage is not free ($0.10/GB/month).', pt: '🔄 SEMPRE configure lifecycle policies no ECR - sem elas, imagens antigas se acumulam e o storage do ECR não é grátis ($0.10/GB/mês).' },
      { es: '🔒 Habilita scanOnPush=true al crear el repositorio - detecta vulnerabilidades en cada push automáticamente.', en: '🔒 Enable scanOnPush=true when creating the repository - detects vulnerabilities on every push automatically.', pt: '🔒 Habilite scanOnPush=true ao criar o repositório - detecta vulnerabilidades em cada push automaticamente.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo automatizarías el despliegue de una imagen Docker a ECR?" → Script bash con: aws ecr get-login-password → docker build → docker tag → docker push. En CI/CD: GitHub Actions o CodePipeline con permisos IAM para ECR push.', en: '🎯 "How would you automate Docker image deployment to ECR?" → Bash script with: aws ecr get-login-password → docker build → docker tag → docker push. In CI/CD: GitHub Actions or CodePipeline with IAM permissions for ECR push.', pt: '🎯 "Como você automatizaria o deploy de uma imagem Docker no ECR?" → Script bash com: aws ecr get-login-password → docker build → docker tag → docker push. Em CI/CD: GitHub Actions ou CodePipeline com permissões IAM para ECR push.' },
      { es: '🎯 "¿Cómo gestionas versiones de imágenes en ECR?" → Tags semánticas: v1.0.0, v1.1.0. Tag latest para la más reciente. Lifecycle policy para limpiar automáticamente. NUNCA usar solo latest en producción - siempre un tag inmutable.', en: '🎯 "How do you manage image versions in ECR?" → Semantic tags: v1.0.0, v1.1.0. Latest tag for most recent. Lifecycle policy for auto-cleanup. NEVER use only latest in production - always an immutable tag.', pt: '🎯 "Como você gerencia versões de imagens no ECR?" → Tags semânticas: v1.0.0, v1.1.0. Tag latest para a mais recente. Lifecycle policy para limpeza automática. NUNCA usar só latest em produção - sempre uma tag imutável.' }
    ],
    externalLinks: [
      { title: 'Amazon ECR Documentation', url: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/what-is-ecr.html', type: 'aws_docs' },
      { title: 'ECR Lifecycle Policies', url: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/LifecyclePolicies.html', type: 'aws_docs' },
      { title: 'ECR Image Scanning', url: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un repositorio ECR, hiciste push de una imagen y configuraste lifecycle policy?', en: '✅ Did you create an ECR repository, push an image and configure lifecycle policy?', pt: '✅ Você criou um repositório ECR, fez push de uma imagem e configurou lifecycle policy?' },
    xpReward: 55,
    estimatedMinutes: 30,
    services: ['ECR']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 4: ECS Concepts
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-fargate-4',
    stepNumber: 215,
    title: {
      es: 'ECS Concepts: Clusters, Tasks y Services',
      en: 'ECS Concepts: Clusters, Tasks and Services',
      pt: 'ECS Concepts: Clusters, Tasks e Services'
    },
    description: {
      es: 'Entender la arquitectura de ECS: Clusters, Task Definitions, Tasks, Services y los launch types Fargate vs EC2.',
      en: 'Understand ECS architecture: Clusters, Task Definitions, Tasks, Services and Fargate vs EC2 launch types.',
      pt: 'Entender a arquitetura do ECS: Clusters, Task Definitions, Tasks, Services e os launch types Fargate vs EC2.'
    },
    theory: {
      es: `## ECS: Elastic Container Service

### Arquitectura de ECS
\`\`\`
                          Amazon ECS
┌──────────────────────────────────────────────────────────┐
│                      CLUSTER                              │
│  ┌────────────────────────────────────────────────────┐  │
│  │              Task Definition (plantilla)            │  │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────────┐ │  │
│  │  │ Container│  │ CPU/Mem  │  │ IAM Role         │ │  │
│  │  │ Image    │  │ Config   │  │ (permisos)       │ │  │
│  │  │ (ECR)    │  │          │  │                  │ │  │
│  │  └──────────┘  └──────────┘  └──────────────────┘ │  │
│  └────────────────────────────────────────────────────┘  │
│                         │                                  │
│              ┌──────────┴──────────┐                      │
│              ▼                     ▼                      │
│      ┌──────────────┐     ┌──────────────┐               │
│      │   TASK        │     │   SERVICE     │               │
│      │ (ejecución    │     │ (N tasks      │               │
│      │  única, ETL)  │     │  siempre on)  │               │
│      └──────────────┘     └──────────────┘               │
│                                                            │
│  Launch Types:                                             │
│  ┌──────────┐  ┌──────────┐                               │
│  │ FARGATE  │  │   EC2    │                               │
│  │ (server- │  │ (tú      │                               │
│  │  less)   │  │  gestionas│                               │
│  └──────────┘  └──────────┘                               │
└──────────────────────────────────────────────────────────┘
\`\`\`

### Conceptos Clave

**Cluster**: Agrupación lógica de recursos. Para Fargate, es solo un namespace (no hay servidores que gestionar).
\`\`\`bash
# Crear cluster
aws ecs create-cluster --cluster-name data-engineering
\`\`\`

**Task Definition**: Plantilla que describe cómo ejecutar tu contenedor. Define: imagen, CPU, memoria, variables de entorno, IAM role, logging.

**Task**: Una instancia en ejecución de una Task Definition. Para ETL batch: ejecutar una Task puntual con RunTask.

**Service**: Mantiene N Tasks corriendo permanentemente. Para APIs web, no para ETL batch.

### Fargate vs EC2 Launch Type
| Criterio | Fargate | EC2 |
|----------|---------|-----|
| Gestión de servidores | AWS | Tú |
| Precio | Por vCPU/hora + GB/hora | Por instancia EC2 |
| Escala a 0 | ✅ (RunTask) | ❌ (instancias siempre on) |
| GPU | ❌ | ✅ |
| Spot | ✅ (Fargate Spot) | ✅ (EC2 Spot) |
| Mejor para ETL batch | ✅ Ideal | Overkill |
| Mejor para APIs 24/7 | ✅ Bueno | ✅ Más barato a escala |
| Max vCPU | 16 | Sin límite |
| Max RAM | 120 GB | Sin límite |
| Ephemeral storage | 200 GB | Depende del disco |

### ¿Cuándo Task vs Service?
\`\`\`
ETL Batch (archivos grandes):
  → RunTask: ejecutar, procesar, terminar
  → Escala a 0 cuando no hay trabajo
  → Costo: solo cuando ejecuta
  
API Web (siempre disponible):
  → Service: mantener N tasks corriendo
  → Auto-scaling basado en CPU/requests
  → Costo: 24/7 pero con escalado
\`\`\`

### Para Data Engineering: SIEMPRE usar Tasks (no Services)
\`\`\`
Patrón de ETL con Fargate:
  1. EventBridge/Step Functions dispara el ETL
  2. ECS RunTask lanza un contenedor Fargate
  3. El contenedor procesa los datos
  4. El contenedor termina (exit code 0)
  5. No hay costo cuando no hay trabajo
\`\`\``,
      en: `## ECS: Elastic Container Service

### ECS Architecture
\`\`\`
               Amazon ECS
┌──────────────────────────────────┐
│            CLUSTER                │
│  ┌────────────────────────────┐  │
│  │    Task Definition         │  │
│  │  (image, CPU, mem, role)   │  │
│  └────────────┬───────────────┘  │
│        ┌──────┴──────┐           │
│        ▼             ▼           │
│    ┌────────┐   ┌─────────┐     │
│    │ TASK   │   │ SERVICE │     │
│    │ (one-  │   │ (N tasks│     │
│    │  shot) │   │ always) │     │
│    └────────┘   └─────────┘     │
│                                  │
│  Launch Types: FARGATE | EC2     │
└──────────────────────────────────┘
\`\`\`

### Key Concepts
- **Cluster**: Logical grouping. For Fargate, just a namespace.
- **Task Definition**: Template for how to run your container.
- **Task**: Running instance (use for batch ETL).
- **Service**: Keeps N tasks running (use for APIs).

### Fargate vs EC2
| Criteria | Fargate | EC2 |
|----------|---------|-----|
| Server management | AWS | You |
| Scale to 0 | ✅ (RunTask) | ❌ |
| GPU | ❌ | ✅ |
| Best for batch ETL | ✅ Ideal | Overkill |

### For Data Engineering: ALWAYS use Tasks (not Services)`,
      pt: `## ECS: Elastic Container Service

### Arquitetura do ECS
\`\`\`
Cluster → Task Definition → Task (execução única) ou Service (sempre on)
Launch Types: FARGATE (serverless) ou EC2 (você gerencia)
\`\`\`

### Conceitos Chave
- **Cluster**: Agrupação lógica. Para Fargate, é só um namespace.
- **Task Definition**: Template de como executar seu container.
- **Task**: Instância em execução (use para ETL batch).
- **Service**: Mantém N tasks rodando (use para APIs).

### Para Data Engineering: SEMPRE usar Tasks (não Services)
RunTask lança um container, processa os dados e termina. Sem custo quando não há trabalho.`
    },
    practicalTips: [
      { es: '🎯 Para ETL batch en Fargate, usa RunTask (no Services). RunTask ejecuta, procesa y termina. Sin costo cuando no hay trabajo.', en: '🎯 For batch ETL on Fargate, use RunTask (not Services). RunTask executes, processes and terminates. No cost when idle.', pt: '🎯 Para ETL batch no Fargate, use RunTask (não Services). RunTask executa, processa e termina. Sem custo quando não há trabalho.' },
      { es: '📦 Un cluster Fargate es solo un namespace - no hay servidores que gestionar, no hay costo por el cluster mismo.', en: '📦 A Fargate cluster is just a namespace - no servers to manage, no cost for the cluster itself.', pt: '📦 Um cluster Fargate é só um namespace - sem servidores para gerenciar, sem custo pelo cluster em si.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cuál es la diferencia entre Task y Service en ECS?" → Task: ejecución única, ideal para batch ETL. Se ejecuta y termina. Service: mantiene N tasks corriendo siempre, ideal para APIs web con auto-scaling. Para Data Engineering, 95% de las veces usas Tasks.', en: '🎯 "What is the difference between Task and Service in ECS?" → Task: one-shot execution, ideal for batch ETL. Runs and terminates. Service: keeps N tasks running, ideal for web APIs with auto-scaling. For Data Engineering, 95% of the time you use Tasks.', pt: '🎯 "Qual é a diferença entre Task e Service no ECS?" → Task: execução única, ideal para ETL batch. Executa e termina. Service: mantém N tasks rodando, ideal para APIs web com auto-scaling. Para Data Engineering, 95% das vezes você usa Tasks.' },
      { es: '🎯 "¿Por qué Fargate en vez de EC2 para ETL?" → 1) No gestionas servidores. 2) Escala a 0 (sin costo idle). 3) Pay-per-use por segundo. 4) No necesitas gestionar AMIs, parches, auto-scaling groups. 5) Para workloads con GPU, sí necesitas EC2.', en: '🎯 "Why Fargate instead of EC2 for ETL?" → 1) No server management. 2) Scales to 0 (no idle cost). 3) Pay-per-use per second. 4) No AMIs, patches, auto-scaling groups. 5) For GPU workloads, you need EC2.', pt: '🎯 "Por que Fargate em vez de EC2 para ETL?" → 1) Sem gerenciamento de servidores. 2) Escala a 0 (sem custo idle). 3) Pay-per-use por segundo. 4) Sem AMIs, patches, auto-scaling groups. 5) Para workloads com GPU, você precisa de EC2.' }
    ],
    externalLinks: [
      { title: 'Amazon ECS Documentation', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html', type: 'aws_docs' },
      { title: 'ECS Launch Types', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/launch_types.html', type: 'aws_docs' },
      { title: 'ECS Concepts', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html#welcome-concepts', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Puedes explicar la diferencia entre Cluster, Task Definition, Task y Service?', en: '✅ Can you explain the difference between Cluster, Task Definition, Task and Service?', pt: '✅ Você consegue explicar a diferença entre Cluster, Task Definition, Task e Service?' },
    xpReward: 50,
    estimatedMinutes: 25,
    services: ['ECS', 'Fargate']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 5: Task Definitions para ETL
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-fargate-5',
    stepNumber: 216,
    title: {
      es: 'Task Definitions para ETL',
      en: 'Task Definitions for ETL',
      pt: 'Task Definitions para ETL'
    },
    description: {
      es: 'Crear Task Definitions optimizadas para ETL: configuración de CPU/memoria, IAM Task Role, logging a CloudWatch y ephemeral storage.',
      en: 'Create ETL-optimized Task Definitions: CPU/memory configuration, IAM Task Role, CloudWatch logging and ephemeral storage.',
      pt: 'Criar Task Definitions otimizadas para ETL: configuração de CPU/memória, IAM Task Role, logging no CloudWatch e ephemeral storage.'
    },
    theory: {
      es: `## Task Definitions para ETL

### Configuraciones de CPU y Memoria en Fargate
\`\`\`
┌────────────────────────────────────────────────┐
│   vCPU  │  Memoria Disponible                  │
├─────────┼──────────────────────────────────────┤
│  0.25   │  0.5 GB, 1 GB, 2 GB                 │
│  0.5    │  1 GB - 4 GB (incrementos de 1 GB)   │
│  1      │  2 GB - 8 GB                         │
│  2      │  4 GB - 16 GB                        │
│  4      │  8 GB - 30 GB                        │
│  8      │  16 GB - 60 GB (requiere Linux)      │
│  16     │  32 GB - 120 GB (requiere Linux)     │
└─────────┴──────────────────────────────────────┘

Para ETL con pandas:
  Archivos < 1 GB  → 1 vCPU, 4 GB RAM
  Archivos 1-5 GB  → 2 vCPU, 8 GB RAM
  Archivos 5-20 GB → 4 vCPU, 30 GB RAM
  Archivos > 20 GB → 8-16 vCPU, 60-120 GB RAM
\`\`\`

### Task Definition JSON Completa
\`\`\`json
{
  "family": "etl-bronze-to-gold",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "2048",
  "memory": "8192",
  "ephemeralStorage": {
    "sizeInGiB": 100
  },
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/etl-task-role",
  "containerDefinitions": [
    {
      "name": "etl-pipeline",
      "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/data-engineering/etl-pipeline:v1.0.0",
      "essential": true,
      "cpu": 2048,
      "memory": 8192,
      "environment": [
        {"name": "ENVIRONMENT", "value": "production"},
        {"name": "INPUT_BUCKET", "value": "mi-datalake-prod"},
        {"name": "OUTPUT_BUCKET", "value": "mi-datalake-prod"},
        {"name": "LOG_LEVEL", "value": "INFO"},
        {"name": "AWS_DEFAULT_REGION", "value": "us-east-1"}
      ],
      "secrets": [
        {
          "name": "DB_CONNECTION_STRING",
          "valueFrom": "arn:aws:secretsmanager:us-east-1:123456789012:secret:prod/redshift/datalake"
        }
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/etl-bronze-to-gold",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "etl",
          "awslogs-create-group": "true"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "echo healthy"],
        "interval": 30,
        "timeout": 5,
        "retries": 3,
        "startPeriod": 60
      }
    }
  ],
  "tags": [
    {"key": "Project", "value": "DataLake"},
    {"key": "Environment", "value": "Production"},
    {"key": "Team", "value": "DataEngineering"}
  ]
}
\`\`\`

### Los Dos IAM Roles
\`\`\`
1. Execution Role (executionRoleArn):
   → Permisos que ECS necesita para EJECUTAR la tarea
   → Pull imagen de ECR
   → Escribir logs a CloudWatch
   → Leer secrets de Secrets Manager
   → AWS provee: ecsTaskExecutionRole (managed policy)

2. Task Role (taskRoleArn):
   → Permisos que TU CÓDIGO necesita
   → Leer/escribir en S3
   → Acceder a Glue Catalog
   → Escribir en DynamoDB
   → TÚ lo creas con least privilege
\`\`\`

### IAM Task Role para ETL
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": ["s3:GetObject", "s3:PutObject", "s3:ListBucket"],
      "Resource": [
        "arn:aws:s3:::mi-datalake-prod",
        "arn:aws:s3:::mi-datalake-prod/*"
      ]
    },
    {
      "Effect": "Allow",
      "Action": ["glue:GetTable", "glue:GetPartitions", "glue:CreatePartition"],
      "Resource": "*"
    },
    {
      "Effect": "Allow",
      "Action": ["cloudwatch:PutMetricData"],
      "Resource": "*"
    }
  ]
}
\`\`\`

### Registrar la Task Definition
\`\`\`bash
# Registrar task definition
aws ecs register-task-definition \\
  --cli-input-json file://task-definition.json

# Listar task definitions
aws ecs list-task-definitions --family-prefix etl-bronze-to-gold

# Ver última revisión
aws ecs describe-task-definition \\
  --task-definition etl-bronze-to-gold
\`\`\`

### Ephemeral Storage
- Default: 20 GB (gratis)
- Extensible: hasta 200 GB ($0.000111/GB/hora)
- Se monta en el contenedor, no persiste después de la tarea
- Ideal para archivos temporales grandes durante ETL`,
      en: `## Task Definitions for ETL

### Fargate CPU and Memory Configurations
\`\`\`
vCPU  | Memory Available
0.25  | 0.5 GB, 1 GB, 2 GB
0.5   | 1 GB - 4 GB
1     | 2 GB - 8 GB
2     | 4 GB - 16 GB
4     | 8 GB - 30 GB
8     | 16 GB - 60 GB
16    | 32 GB - 120 GB
\`\`\`

### Complete Task Definition JSON
\`\`\`json
{
  "family": "etl-bronze-to-gold",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "2048",
  "memory": "8192",
  "ephemeralStorage": {"sizeInGiB": 100},
  "executionRoleArn": "arn:aws:iam::123456789012:role/ecsTaskExecutionRole",
  "taskRoleArn": "arn:aws:iam::123456789012:role/etl-task-role",
  "containerDefinitions": [{
    "name": "etl-pipeline",
    "image": "123456789012.dkr.ecr.us-east-1.amazonaws.com/etl-pipeline:v1.0.0",
    "essential": true,
    "environment": [
      {"name": "INPUT_BUCKET", "value": "my-datalake"},
      {"name": "OUTPUT_BUCKET", "value": "my-datalake"}
    ],
    "logConfiguration": {
      "logDriver": "awslogs",
      "options": {
        "awslogs-group": "/ecs/etl-bronze-to-gold",
        "awslogs-region": "us-east-1",
        "awslogs-stream-prefix": "etl"
      }
    }
  }]
}
\`\`\`

### Two IAM Roles
- **Execution Role**: ECS needs to pull image from ECR, write logs
- **Task Role**: YOUR CODE needs to access S3, Glue, DynamoDB`,
      pt: `## Task Definitions para ETL

### Configurações de CPU e Memória no Fargate
\`\`\`
vCPU  | Memória Disponível
0.25  | 0.5 GB, 1 GB, 2 GB
1     | 2 GB - 8 GB
2     | 4 GB - 16 GB
4     | 8 GB - 30 GB
\`\`\`

### Dois IAM Roles
- **Execution Role**: ECS precisa para pull imagem do ECR, escrever logs
- **Task Role**: SEU CÓDIGO precisa para acessar S3, Glue, DynamoDB

### Registrar Task Definition
\`\`\`bash
aws ecs register-task-definition --cli-input-json file://task-definition.json
\`\`\``
    },
    practicalTips: [
      { es: '🔐 SIEMPRE separa Execution Role (permisos de ECS) de Task Role (permisos de tu código). El Task Role debe tener least privilege: solo los buckets y tablas que tu ETL necesita.', en: '🔐 ALWAYS separate Execution Role (ECS permissions) from Task Role (your code permissions). The Task Role should have least privilege: only the buckets and tables your ETL needs.', pt: '🔐 SEMPRE separe Execution Role (permissões do ECS) de Task Role (permissões do seu código). O Task Role deve ter least privilege: só os buckets e tabelas que seu ETL precisa.' },
      { es: '💾 Configura ephemeral storage de 100 GB para ETL de archivos grandes - el default de 20 GB se llena rápido al descomprimir o transformar datos.', en: '💾 Configure 100 GB ephemeral storage for large file ETL - the default 20 GB fills up quickly when decompressing or transforming data.', pt: '💾 Configure ephemeral storage de 100 GB para ETL de arquivos grandes - o default de 20 GB enche rápido ao descomprimir ou transformar dados.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cuál es la diferencia entre executionRoleArn y taskRoleArn en ECS?" → executionRoleArn: permisos que ECS necesita para ejecutar la tarea (pull de ECR, logs a CloudWatch, leer secrets). taskRoleArn: permisos que TU CÓDIGO necesita (S3, DynamoDB, Glue). Separar roles es seguridad best practice.', en: '🎯 "What is the difference between executionRoleArn and taskRoleArn in ECS?" → executionRoleArn: permissions ECS needs to run the task (ECR pull, CloudWatch logs, read secrets). taskRoleArn: permissions YOUR CODE needs (S3, DynamoDB, Glue). Separating roles is a security best practice.', pt: '🎯 "Qual é a diferença entre executionRoleArn e taskRoleArn no ECS?" → executionRoleArn: permissões que o ECS precisa para executar a tarefa (pull do ECR, logs no CloudWatch, ler secrets). taskRoleArn: permissões que SEU CÓDIGO precisa (S3, DynamoDB, Glue). Separar roles é best practice de segurança.' },
      { es: '🎯 "¿Cómo manejas secrets en una Task Definition de Fargate?" → En la Task Definition, usar el campo "secrets" que referencia ARNs de Secrets Manager. ECS inyecta el valor como variable de entorno en el contenedor. Nunca hardcodear en "environment".', en: '🎯 "How do you handle secrets in a Fargate Task Definition?" → In the Task Definition, use the "secrets" field referencing Secrets Manager ARNs. ECS injects the value as an environment variable. Never hardcode in "environment".', pt: '🎯 "Como você lida com secrets em uma Task Definition do Fargate?" → Na Task Definition, usar o campo "secrets" que referencia ARNs do Secrets Manager. O ECS injeta o valor como variável de ambiente no container. Nunca hardcodear em "environment".' }
    ],
    externalLinks: [
      { title: 'ECS Task Definitions', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task_definitions.html', type: 'aws_docs' },
      { title: 'Fargate Task Sizes', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-cpu-memory-error.html', type: 'aws_docs' },
      { title: 'ECS Task IAM Roles', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/task-iam-roles.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste una Task Definition con CPU/memoria optimizados, Task Role con least privilege y logging a CloudWatch?', en: '✅ Did you create a Task Definition with optimized CPU/memory, least privilege Task Role and CloudWatch logging?', pt: '✅ Você criou uma Task Definition com CPU/memória otimizados, Task Role com least privilege e logging no CloudWatch?' },
    xpReward: 65,
    estimatedMinutes: 40,
    services: ['ECS', 'Fargate', 'IAM', 'CloudWatch']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 6: Ejecutar Tareas Fargate
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-fargate-6',
    stepNumber: 217,
    title: {
      es: 'Ejecutar Tareas Fargate',
      en: 'Running Fargate Tasks',
      pt: 'Executar Tarefas Fargate'
    },
    description: {
      es: 'Lanzar y monitorear tareas Fargate con boto3 y CLI. Configurar VPC, subnets, security groups y capturar resultados.',
      en: 'Launch and monitor Fargate tasks with boto3 and CLI. Configure VPC, subnets, security groups and capture results.',
      pt: 'Lançar e monitorar tarefas Fargate com boto3 e CLI. Configurar VPC, subnets, security groups e capturar resultados.'
    },
    theory: {
      es: `## Ejecutar Tareas Fargate

### RunTask con AWS CLI
\`\`\`bash
# Ejecutar una tarea Fargate
aws ecs run-task \\
  --cluster data-engineering \\
  --task-definition etl-bronze-to-gold:3 \\
  --launch-type FARGATE \\
  --count 1 \\
  --network-configuration '{
    "awsvpcConfiguration": {
      "subnets": ["subnet-0abc123", "subnet-0def456"],
      "securityGroups": ["sg-0xyz789"],
      "assignPublicIp": "ENABLED"
    }
  }' \\
  --overrides '{
    "containerOverrides": [{
      "name": "etl-pipeline",
      "environment": [
        {"name": "INPUT_PREFIX", "value": "bronze/sales/2024/12/"},
        {"name": "OUTPUT_PREFIX", "value": "gold/daily_summary/"}
      ]
    }]
  }'
\`\`\`

### awsvpc Network Mode
Todas las tareas Fargate usan \`awsvpc\` - cada tarea obtiene su propia ENI (Elastic Network Interface) con IP privada.

\`\`\`
VPC (10.0.0.0/16)
├── Subnet pública (10.0.1.0/24)
│   └── Tarea Fargate (10.0.1.50) → Internet Gateway → S3, ECR
│       assignPublicIp: ENABLED
│
├── Subnet privada (10.0.2.0/24)
│   └── Tarea Fargate (10.0.2.30) → NAT Gateway → S3, ECR
│       assignPublicIp: DISABLED (más seguro, pero NAT cuesta $)
│
└── Security Group
    └── Outbound: HTTPS (443) a 0.0.0.0/0 (para acceder a S3, ECR)
    └── Inbound: nada (ETL no recibe conexiones)
\`\`\`

### RunTask con boto3 (Python)
\`\`\`python
import boto3
import time

ecs = boto3.client('ecs')

def run_fargate_etl(input_prefix: str, output_prefix: str) -> dict:
    """Lanza una tarea Fargate para ETL y espera a que termine."""
    
    # 1. Lanzar la tarea
    response = ecs.run_task(
        cluster='data-engineering',
        taskDefinition='etl-bronze-to-gold',
        launchType='FARGATE',
        count=1,
        networkConfiguration={
            'awsvpcConfiguration': {
                'subnets': ['subnet-0abc123', 'subnet-0def456'],
                'securityGroups': ['sg-0xyz789'],
                'assignPublicIp': 'ENABLED'
            }
        },
        overrides={
            'containerOverrides': [{
                'name': 'etl-pipeline',
                'environment': [
                    {'name': 'INPUT_PREFIX', 'value': input_prefix},
                    {'name': 'OUTPUT_PREFIX', 'value': output_prefix}
                ]
            }]
        }
    )
    
    task_arn = response['tasks'][0]['taskArn']
    task_id = task_arn.split('/')[-1]
    print(f"Tarea lanzada: {task_id}")
    
    # 2. Esperar a que termine (polling)
    while True:
        desc = ecs.describe_tasks(
            cluster='data-engineering',
            tasks=[task_arn]
        )
        task = desc['tasks'][0]
        status = task['lastStatus']
        print(f"  Status: {status}")
        
        if status == 'STOPPED':
            # Verificar exit code
            container = task['containers'][0]
            exit_code = container.get('exitCode', -1)
            reason = task.get('stoppedReason', 'N/A')
            
            result = {
                'task_id': task_id,
                'exit_code': exit_code,
                'stopped_reason': reason,
                'success': exit_code == 0,
                'started_at': str(task.get('startedAt', '')),
                'stopped_at': str(task.get('stoppedAt', ''))
            }
            
            if exit_code != 0:
                print(f"❌ Tarea falló con exit code {exit_code}: {reason}")
            else:
                print(f"✅ Tarea completada exitosamente")
            
            return result
        
        time.sleep(15)  # Polling cada 15 segundos

# Ejecutar
result = run_fargate_etl(
    input_prefix='bronze/sales/2024/12/',
    output_prefix='gold/daily_summary/'
)
print(f"Resultado: {result}")
\`\`\`

### Monitorear Tareas
\`\`\`bash
# Listar tareas activas
aws ecs list-tasks --cluster data-engineering --desired-status RUNNING

# Describir tarea específica
aws ecs describe-tasks \\
  --cluster data-engineering \\
  --tasks arn:aws:ecs:us-east-1:123456789012:task/data-engineering/abc123

# Ver logs en CloudWatch
aws logs get-log-events \\
  --log-group-name /ecs/etl-bronze-to-gold \\
  --log-stream-name etl/etl-pipeline/abc123

# Detener tarea manualmente
aws ecs stop-task \\
  --cluster data-engineering \\
  --task arn:aws:ecs:...:task/data-engineering/abc123 \\
  --reason "Manual stop for debugging"
\`\`\`

### Override de Container en Runtime
Los overrides permiten cambiar configuración sin crear nueva Task Definition:
\`\`\`python
# Cambiar variables de entorno
overrides = {
    'containerOverrides': [{
        'name': 'etl-pipeline',
        'environment': [
            {'name': 'INPUT_PREFIX', 'value': 'bronze/logs/2024/12/15/'},
            {'name': 'MODE', 'value': 'incremental'}
        ]
    }]
}

# Cambiar CPU/memoria para un archivo grande
overrides = {
    'cpu': '4096',      # Override a 4 vCPU
    'memory': '30720',  # Override a 30 GB
    'containerOverrides': [{
        'name': 'etl-pipeline',
        'cpu': 4096,
        'memory': 30720
    }]
}
\`\`\``,
      en: `## Running Fargate Tasks

### RunTask with AWS CLI
\`\`\`bash
aws ecs run-task \\
  --cluster data-engineering \\
  --task-definition etl-bronze-to-gold:3 \\
  --launch-type FARGATE \\
  --network-configuration '{
    "awsvpcConfiguration": {
      "subnets": ["subnet-0abc123"],
      "securityGroups": ["sg-0xyz789"],
      "assignPublicIp": "ENABLED"
    }
  }'
\`\`\`

### RunTask with boto3
\`\`\`python
import boto3, time

ecs = boto3.client('ecs')

def run_fargate_etl(input_prefix, output_prefix):
    response = ecs.run_task(
        cluster='data-engineering',
        taskDefinition='etl-bronze-to-gold',
        launchType='FARGATE',
        networkConfiguration={
            'awsvpcConfiguration': {
                'subnets': ['subnet-0abc123'],
                'securityGroups': ['sg-0xyz789'],
                'assignPublicIp': 'ENABLED'
            }
        },
        overrides={
            'containerOverrides': [{
                'name': 'etl-pipeline',
                'environment': [
                    {'name': 'INPUT_PREFIX', 'value': input_prefix},
                    {'name': 'OUTPUT_PREFIX', 'value': output_prefix}
                ]
            }]
        }
    )
    
    task_arn = response['tasks'][0]['taskArn']
    
    # Wait for completion
    while True:
        desc = ecs.describe_tasks(cluster='data-engineering', tasks=[task_arn])
        status = desc['tasks'][0]['lastStatus']
        if status == 'STOPPED':
            exit_code = desc['tasks'][0]['containers'][0].get('exitCode', -1)
            return {'success': exit_code == 0, 'exit_code': exit_code}
        time.sleep(15)
\`\`\`

### Monitoring
\`\`\`bash
aws ecs list-tasks --cluster data-engineering --desired-status RUNNING
aws ecs describe-tasks --cluster data-engineering --tasks TASK_ARN
\`\`\``,
      pt: `## Executar Tarefas Fargate

### RunTask com boto3
\`\`\`python
import boto3, time

ecs = boto3.client('ecs')

response = ecs.run_task(
    cluster='data-engineering',
    taskDefinition='etl-bronze-to-gold',
    launchType='FARGATE',
    networkConfiguration={
        'awsvpcConfiguration': {
            'subnets': ['subnet-0abc123'],
            'securityGroups': ['sg-0xyz789'],
            'assignPublicIp': 'ENABLED'
        }
    }
)

task_arn = response['tasks'][0]['taskArn']

# Esperar conclusão com polling
while True:
    desc = ecs.describe_tasks(cluster='data-engineering', tasks=[task_arn])
    if desc['tasks'][0]['lastStatus'] == 'STOPPED':
        exit_code = desc['tasks'][0]['containers'][0].get('exitCode', -1)
        print(f"Exit code: {exit_code}")
        break
    time.sleep(15)
\`\`\``
    },
    practicalTips: [
      { es: '🌐 Para ETL que solo accede a servicios AWS (S3, ECR), usa subnet pública con assignPublicIp: ENABLED - evitas el costo de NAT Gateway ($0.045/hora + $0.045/GB).', en: '🌐 For ETL that only accesses AWS services (S3, ECR), use public subnet with assignPublicIp: ENABLED - avoids NAT Gateway cost ($0.045/hour + $0.045/GB).', pt: '🌐 Para ETL que só acessa serviços AWS (S3, ECR), use subnet pública com assignPublicIp: ENABLED - evita o custo do NAT Gateway ($0.045/hora + $0.045/GB).' },
      { es: '🔄 Usa overrides para cambiar variables de entorno sin crear nueva Task Definition - ideal para parametrizar fechas, modos, o prefijos de input/output.', en: '🔄 Use overrides to change environment variables without creating a new Task Definition - ideal for parameterizing dates, modes, or input/output prefixes.', pt: '🔄 Use overrides para mudar variáveis de ambiente sem criar nova Task Definition - ideal para parametrizar datas, modos, ou prefixos de input/output.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo lanzarías un ETL en Fargate desde Step Functions?" → Step Functions tiene integración nativa con ECS RunTask. Defines la task definition, network config y overrides directamente en el state machine. Step Functions espera automáticamente a que termine y captura el exit code.', en: '🎯 "How would you launch an ETL on Fargate from Step Functions?" → Step Functions has native integration with ECS RunTask. Define task definition, network config and overrides directly in the state machine. Step Functions automatically waits for completion and captures the exit code.', pt: '🎯 "Como você lançaria um ETL no Fargate a partir do Step Functions?" → Step Functions tem integração nativa com ECS RunTask. Defina task definition, network config e overrides diretamente na state machine. Step Functions espera automaticamente a conclusão e captura o exit code.' },
      { es: '🎯 "¿Qué pasa si tu tarea Fargate falla a mitad del procesamiento?" → 1) El exit code será != 0. 2) Los logs están en CloudWatch. 3) Puedes configurar retry en Step Functions. 4) Para idempotencia, tu ETL debe poder re-procesar sin duplicar datos (overwrite en S3, upsert en DB).', en: '🎯 "What happens if your Fargate task fails mid-processing?" → 1) Exit code will be != 0. 2) Logs are in CloudWatch. 3) You can configure retry in Step Functions. 4) For idempotency, your ETL must be able to re-process without duplicating data (overwrite in S3, upsert in DB).', pt: '🎯 "O que acontece se sua tarefa Fargate falha no meio do processamento?" → 1) O exit code será != 0. 2) Os logs estão no CloudWatch. 3) Você pode configurar retry no Step Functions. 4) Para idempotência, seu ETL deve poder re-processar sem duplicar dados (overwrite no S3, upsert no DB).' }
    ],
    commonMistakes: [
      { es: '❌ Olvidar configurar Security Group con outbound HTTPS (443) - la tarea no puede acceder a S3 ni ECR y falla silenciosamente', en: '❌ Forgetting to configure Security Group with outbound HTTPS (443) - task cannot access S3 or ECR and fails silently', pt: '❌ Esquecer de configurar Security Group com outbound HTTPS (443) - a tarefa não consegue acessar S3 nem ECR e falha silenciosamente' }
    ],
    externalLinks: [
      { title: 'ECS RunTask API', url: 'https://docs.aws.amazon.com/AmazonECS/latest/APIReference/API_RunTask.html', type: 'aws_docs' },
      { title: 'Fargate Networking', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-networking.html', type: 'aws_docs' },
      { title: 'ECS with Step Functions', url: 'https://docs.aws.amazon.com/step-functions/latest/dg/connect-ecs.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Lanzaste una tarea Fargate con boto3, esperaste a que termine y capturaste el exit code?', en: '✅ Did you launch a Fargate task with boto3, wait for completion and capture the exit code?', pt: '✅ Você lançou uma tarefa Fargate com boto3, esperou a conclusão e capturou o exit code?' },
    xpReward: 70,
    estimatedMinutes: 45,
    services: ['ECS', 'Fargate', 'CloudWatch']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 7: Procesamiento de Archivos Pesados
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-fargate-7',
    stepNumber: 218,
    title: {
      es: 'Procesamiento de Archivos Pesados',
      en: 'Processing Heavy Files',
      pt: 'Processamento de Arquivos Pesados'
    },
    description: {
      es: 'ETL completo en Python para procesar archivos de +10 GB: lectura en chunks, deduplicación con hash, validación de tipos y escritura Parquet particionado.',
      en: 'Complete Python ETL to process +10 GB files: chunk reading, hash deduplication, type validation and partitioned Parquet writing.',
      pt: 'ETL completo em Python para processar arquivos de +10 GB: leitura em chunks, deduplicação com hash, validação de tipos e escrita Parquet particionado.'
    },
    theory: {
      es: `## Procesamiento de Archivos Pesados con Fargate

### Script ETL Completo: Logs de +10 GB
\`\`\`python
"""
ETL Pipeline para procesamiento de archivos pesados en Fargate.
Procesa logs de +10 GB: lectura en chunks, deduplicación, validación,
y escritura Parquet particionado a Gold.

Uso: python -m src.main --input-prefix bronze/logs/2024/12/ --output-prefix gold/logs_clean/
"""
import os
import sys
import hashlib
import logging
import argparse
from datetime import datetime
from typing import Generator

import boto3
import pandas as pd
import pyarrow as pa
import pyarrow.parquet as pq

# Configuración
logging.basicConfig(
    level=os.environ.get('LOG_LEVEL', 'INFO'),
    format='%(asctime)s [%(levelname)s] %(message)s'
)
logger = logging.getLogger(__name__)

s3 = boto3.client('s3')
CHUNK_SIZE = 500_000  # Filas por chunk (ajustar según RAM disponible)
BUCKET = os.environ.get('INPUT_BUCKET', 'mi-datalake-prod')
OUTPUT_BUCKET = os.environ.get('OUTPUT_BUCKET', BUCKET)

# Schema esperado
EXPECTED_SCHEMA = {
    'timestamp': 'datetime64[ns]',
    'user_id': 'int64',
    'action': 'str',
    'ip_address': 'str',
    'session_id': 'str',
    'response_code': 'int64',
    'bytes_sent': 'int64',
    'url': 'str'
}

REQUIRED_COLUMNS = ['timestamp', 'user_id', 'action', 'ip_address']


def list_input_files(bucket: str, prefix: str) -> list:
    """Lista todos los archivos CSV/JSON en el prefijo de input."""
    paginator = s3.get_paginator('list_objects_v2')
    files = []
    for page in paginator.paginate(Bucket=bucket, Prefix=prefix):
        for obj in page.get('Contents', []):
            key = obj['Key']
            if key.endswith(('.csv', '.csv.gz', '.json', '.jsonl')):
                files.append({
                    'key': key,
                    'size': obj['Size'],
                    'last_modified': obj['LastModified']
                })
    logger.info(f"Encontrados {len(files)} archivos en s3://{bucket}/{prefix}")
    return sorted(files, key=lambda x: x['key'])


def read_s3_chunks(bucket: str, key: str) -> Generator[pd.DataFrame, None, None]:
    """Lee un archivo de S3 en chunks para no saturar la memoria."""
    logger.info(f"Leyendo en chunks: s3://{bucket}/{key}")
    
    if key.endswith(('.csv', '.csv.gz')):
        # Descargar a archivo temporal para leer en chunks
        local_path = f"/tmp/{key.split('/')[-1]}"
        s3.download_file(bucket, key, local_path)
        
        for chunk in pd.read_csv(
            local_path,
            chunksize=CHUNK_SIZE,
            dtype={'user_id': 'Int64', 'response_code': 'Int64', 'bytes_sent': 'Int64'},
            parse_dates=['timestamp'],
            on_bad_lines='warn'
        ):
            yield chunk
        
        # Limpiar archivo temporal
        os.remove(local_path)
    
    elif key.endswith(('.json', '.jsonl')):
        local_path = f"/tmp/{key.split('/')[-1]}"
        s3.download_file(bucket, key, local_path)
        
        for chunk in pd.read_json(
            local_path,
            lines=True,
            chunksize=CHUNK_SIZE,
            dtype={'user_id': 'Int64'}
        ):
            yield chunk
        
        os.remove(local_path)


def compute_row_hash(row: pd.Series) -> str:
    """Genera un hash único para deduplicación."""
    hash_input = f"{row.get('timestamp', '')}-{row.get('user_id', '')}-{row.get('session_id', '')}-{row.get('url', '')}"
    return hashlib.md5(hash_input.encode()).hexdigest()


def validate_and_clean(df: pd.DataFrame, source_file: str) -> pd.DataFrame:
    """Valida schema, limpia datos y agrega metadata."""
    rows_before = len(df)
    
    # 1. Validar columnas requeridas
    missing = set(REQUIRED_COLUMNS) - set(df.columns)
    if missing:
        raise ValueError(f"Columnas faltantes en {source_file}: {missing}")
    
    # 2. Remover filas con nulls en columnas críticas
    df = df.dropna(subset=REQUIRED_COLUMNS)
    
    # 3. Validar y convertir tipos
    if 'timestamp' in df.columns:
        df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')
        df = df.dropna(subset=['timestamp'])
    
    if 'response_code' in df.columns:
        df['response_code'] = pd.to_numeric(df['response_code'], errors='coerce').fillna(0).astype('int64')
    
    if 'bytes_sent' in df.columns:
        df['bytes_sent'] = pd.to_numeric(df['bytes_sent'], errors='coerce').fillna(0).astype('int64')
    
    # 4. Deduplicación con hash
    df['_row_hash'] = df.apply(compute_row_hash, axis=1)
    df = df.drop_duplicates(subset=['_row_hash'])
    
    # 5. Agregar metadata de procesamiento
    df['_processed_at'] = datetime.utcnow().isoformat()
    df['_source_file'] = source_file
    
    rows_after = len(df)
    logger.info(f"  Limpieza: {rows_before} → {rows_after} filas ({rows_before - rows_after} removidas)")
    
    return df


def write_partitioned_parquet(
    df: pd.DataFrame,
    output_bucket: str,
    output_prefix: str,
    partition_cols: list = None
):
    """Escribe DataFrame como Parquet particionado a S3."""
    if partition_cols is None:
        partition_cols = ['year', 'month', 'day']
    
    # Crear columnas de partición desde timestamp
    if 'timestamp' in df.columns:
        df['year'] = df['timestamp'].dt.year.astype(str)
        df['month'] = df['timestamp'].dt.month.map(lambda x: f'{x:02d}')
        df['day'] = df['timestamp'].dt.day.map(lambda x: f'{x:02d}')
    
    # Escribir cada partición
    for partition_values, partition_df in df.groupby(partition_cols):
        if isinstance(partition_values, str):
            partition_values = (partition_values,)
        
        partition_path = '/'.join(
            f'{col}={val}' for col, val in zip(partition_cols, partition_values)
        )
        
        # Remover columnas de partición del DataFrame
        write_df = partition_df.drop(columns=partition_cols, errors='ignore')
        
        # Convertir a Parquet en memoria
        table = pa.Table.from_pandas(write_df, preserve_index=False)
        
        # Nombre de archivo único
        timestamp = datetime.utcnow().strftime('%Y%m%d_%H%M%S')
        file_name = f"data_{timestamp}_{len(write_df)}_rows.parquet"
        output_key = f"{output_prefix}{partition_path}/{file_name}"
        
        # Escribir a S3
        import io
        buffer = io.BytesIO()
        pq.write_table(table, buffer, compression='snappy')
        buffer.seek(0)
        
        s3.put_object(
            Bucket=output_bucket,
            Key=output_key,
            Body=buffer.getvalue()
        )
        logger.info(f"  Escrito: s3://{output_bucket}/{output_key} ({len(write_df)} filas)")


def main():
    parser = argparse.ArgumentParser(description='ETL Pipeline Fargate')
    parser.add_argument('--input-prefix', required=True, help='Prefijo S3 de input')
    parser.add_argument('--output-prefix', required=True, help='Prefijo S3 de output')
    parser.add_argument('--mode', default='full', choices=['full', 'incremental', 'test'])
    args = parser.parse_args()
    
    input_prefix = os.environ.get('INPUT_PREFIX', args.input_prefix)
    output_prefix = os.environ.get('OUTPUT_PREFIX', args.output_prefix)
    
    logger.info(f"=== ETL Pipeline Iniciado ===")
    logger.info(f"Input: s3://{BUCKET}/{input_prefix}")
    logger.info(f"Output: s3://{OUTPUT_BUCKET}/{output_prefix}")
    logger.info(f"Mode: {args.mode}")
    
    start_time = datetime.utcnow()
    total_rows_in = 0
    total_rows_out = 0
    files_processed = 0
    
    try:
        # Listar archivos de input
        files = list_input_files(BUCKET, input_prefix)
        
        if not files:
            logger.warning("No se encontraron archivos para procesar")
            sys.exit(0)
        
        # Procesar cada archivo en chunks
        for file_info in files:
            logger.info(f"Procesando: {file_info['key']} ({file_info['size'] / 1024 / 1024:.1f} MB)")
            
            all_chunks = []
            for chunk_num, chunk_df in enumerate(read_s3_chunks(BUCKET, file_info['key'])):
                logger.info(f"  Chunk {chunk_num + 1}: {len(chunk_df)} filas")
                total_rows_in += len(chunk_df)
                
                # Validar y limpiar chunk
                clean_chunk = validate_and_clean(chunk_df, file_info['key'])
                all_chunks.append(clean_chunk)
                
                # Flush a S3 cada 5 chunks para no saturar memoria
                if len(all_chunks) >= 5:
                    combined = pd.concat(all_chunks, ignore_index=True)
                    combined = combined.drop_duplicates(subset=['_row_hash'])
                    write_partitioned_parquet(combined, OUTPUT_BUCKET, output_prefix)
                    total_rows_out += len(combined)
                    all_chunks = []  # Liberar memoria
            
            # Flush chunks restantes
            if all_chunks:
                combined = pd.concat(all_chunks, ignore_index=True)
                combined = combined.drop_duplicates(subset=['_row_hash'])
                write_partitioned_parquet(combined, OUTPUT_BUCKET, output_prefix)
                total_rows_out += len(combined)
            
            files_processed += 1
        
        # Resumen
        elapsed = (datetime.utcnow() - start_time).total_seconds()
        logger.info(f"=== ETL Pipeline Completado ===")
        logger.info(f"  Archivos procesados: {files_processed}")
        logger.info(f"  Filas input:  {total_rows_in:,}")
        logger.info(f"  Filas output: {total_rows_out:,}")
        logger.info(f"  Filas removidas: {total_rows_in - total_rows_out:,}")
        logger.info(f"  Tiempo total: {elapsed:.1f} segundos")
        
        sys.exit(0)
        
    except Exception as e:
        logger.error(f"Pipeline falló: {str(e)}", exc_info=True)
        sys.exit(1)


if __name__ == '__main__':
    main()
\`\`\`

### Tips de Manejo de Memoria
\`\`\`
1. SIEMPRE lee en chunks (chunksize=500K filas)
2. Flush a S3 periódicamente (cada 5 chunks)
3. Usa del df / gc.collect() para liberar memoria
4. Monitorea con: import psutil; psutil.virtual_memory()
5. Configura Fargate con 2x la RAM que esperas necesitar
6. Usa dtypes específicos (Int64 en vez de object) para reducir memoria
\`\`\``,
      en: `## Processing Heavy Files with Fargate

### Complete ETL Script: +10 GB Logs
\`\`\`python
"""
ETL Pipeline for heavy file processing in Fargate.
Processes +10 GB logs: chunk reading, deduplication, validation,
and partitioned Parquet writing to Gold.
"""
import os, sys, hashlib, logging, argparse
from datetime import datetime
import boto3, pandas as pd, pyarrow as pa, pyarrow.parquet as pq

logging.basicConfig(level='INFO', format='%(asctime)s [%(levelname)s] %(message)s')
logger = logging.getLogger(__name__)

s3 = boto3.client('s3')
CHUNK_SIZE = 500_000
BUCKET = os.environ.get('INPUT_BUCKET', 'my-datalake')

def read_s3_chunks(bucket, key):
    local_path = f"/tmp/{key.split('/')[-1]}"
    s3.download_file(bucket, key, local_path)
    for chunk in pd.read_csv(local_path, chunksize=CHUNK_SIZE, on_bad_lines='warn'):
        yield chunk
    os.remove(local_path)

def validate_and_clean(df, source_file):
    df = df.dropna(subset=['timestamp', 'user_id'])
    df['_row_hash'] = df.apply(
        lambda r: hashlib.md5(f"{r.get('timestamp')}-{r.get('user_id')}-{r.get('url')}".encode()).hexdigest(),
        axis=1
    )
    df = df.drop_duplicates(subset=['_row_hash'])
    df['_processed_at'] = datetime.utcnow().isoformat()
    df['_source_file'] = source_file
    return df

def write_partitioned_parquet(df, output_bucket, output_prefix):
    import io
    df['year'] = pd.to_datetime(df['timestamp']).dt.year.astype(str)
    df['month'] = pd.to_datetime(df['timestamp']).dt.month.map(lambda x: f'{x:02d}')
    
    for (year, month), partition_df in df.groupby(['year', 'month']):
        write_df = partition_df.drop(columns=['year', 'month'])
        table = pa.Table.from_pandas(write_df, preserve_index=False)
        buffer = io.BytesIO()
        pq.write_table(table, buffer, compression='snappy')
        buffer.seek(0)
        output_key = f"{output_prefix}year={year}/month={month}/data.parquet"
        s3.put_object(Bucket=output_bucket, Key=output_key, Body=buffer.getvalue())

# Main processing loop reads chunks, validates, deduplicates, writes Parquet
\`\`\`

### Memory Management Tips
- Always read in chunks (500K rows)
- Flush to S3 periodically
- Use specific dtypes (Int64 instead of object)
- Configure Fargate with 2x expected RAM`,
      pt: `## Processamento de Arquivos Pesados com Fargate

### Script ETL Completo
\`\`\`python
"""
ETL Pipeline para processamento de arquivos pesados no Fargate.
"""
import os, sys, hashlib, logging
import boto3, pandas as pd, pyarrow as pa, pyarrow.parquet as pq

s3 = boto3.client('s3')
CHUNK_SIZE = 500_000

def read_s3_chunks(bucket, key):
    local_path = f"/tmp/{key.split('/')[-1]}"
    s3.download_file(bucket, key, local_path)
    for chunk in pd.read_csv(local_path, chunksize=CHUNK_SIZE):
        yield chunk
    os.remove(local_path)

def validate_and_clean(df, source_file):
    df = df.dropna(subset=['timestamp', 'user_id'])
    df['_row_hash'] = df.apply(
        lambda r: hashlib.md5(f"{r.get('timestamp')}-{r.get('user_id')}".encode()).hexdigest(),
        axis=1
    )
    df = df.drop_duplicates(subset=['_row_hash'])
    return df
\`\`\`

### Dicas de Gerenciamento de Memória
- Sempre leia em chunks (500K linhas)
- Flush para S3 periodicamente
- Configure Fargate com 2x a RAM esperada`
    },
    practicalTips: [
      { es: '🧠 Regla: configura Fargate con 2x la RAM que esperas necesitar. Si tu archivo es 10 GB, usa 20-30 GB de RAM. pandas crea copias intermedias que duplican el uso de memoria.', en: '🧠 Rule: configure Fargate with 2x the RAM you expect to need. If your file is 10 GB, use 20-30 GB RAM. pandas creates intermediate copies that double memory usage.', pt: '🧠 Regra: configure Fargate com 2x a RAM que espera precisar. Se seu arquivo é 10 GB, use 20-30 GB de RAM. pandas cria cópias intermediárias que duplicam o uso de memória.' },
      { es: '🔄 Flush chunks procesados a S3 periódicamente (cada 5 chunks). No acumules todo en memoria - escribe, libera, y continúa.', en: '🔄 Flush processed chunks to S3 periodically (every 5 chunks). Don\'t accumulate everything in memory - write, release, and continue.', pt: '🔄 Flush chunks processados para S3 periodicamente (a cada 5 chunks). Não acumule tudo na memória - escreva, libere e continue.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo procesarías un archivo de 50 GB de logs?" → 1) Fargate con 4 vCPU, 30 GB RAM, 200 GB ephemeral storage. 2) Descargar a /tmp. 3) Leer en chunks de 500K filas con pandas. 4) Validar, limpiar, deduplicar por chunk. 5) Escribir Parquet particionado por fecha a S3. 6) Flush a S3 cada 5 chunks para no saturar memoria. 7) En producción: usar hash MD5 para deduplicación cross-chunk.', en: '🎯 "How would you process a 50 GB log file?" → 1) Fargate with 4 vCPU, 30 GB RAM, 200 GB ephemeral storage. 2) Download to /tmp. 3) Read in 500K row chunks with pandas. 4) Validate, clean, deduplicate per chunk. 5) Write Parquet partitioned by date to S3. 6) Flush to S3 every 5 chunks. 7) In production: use MD5 hash for cross-chunk deduplication.', pt: '🎯 "Como você processaria um arquivo de 50 GB de logs?" → 1) Fargate com 4 vCPU, 30 GB RAM, 200 GB ephemeral storage. 2) Baixar para /tmp. 3) Ler em chunks de 500K linhas com pandas. 4) Validar, limpar, deduplicar por chunk. 5) Escrever Parquet particionado por data no S3. 6) Flush para S3 a cada 5 chunks. 7) Em produção: usar hash MD5 para deduplicação cross-chunk.' },
      { es: '🎯 "¿Por qué no usar Spark/Glue para archivos grandes?" → Para un solo archivo de 50 GB, pandas en Fargate es más simple, más barato y más rápido de desarrollar. Spark/Glue brillan cuando tienes TB de datos distribuidos o necesitas procesamiento distribuido real. Para < 100 GB, Fargate + pandas suele ser suficiente.', en: '🎯 "Why not use Spark/Glue for large files?" → For a single 50 GB file, pandas on Fargate is simpler, cheaper and faster to develop. Spark/Glue shine when you have TB of distributed data or need real distributed processing. For < 100 GB, Fargate + pandas is usually sufficient.', pt: '🎯 "Por que não usar Spark/Glue para arquivos grandes?" → Para um único arquivo de 50 GB, pandas no Fargate é mais simples, mais barato e mais rápido de desenvolver. Spark/Glue brilham quando você tem TB de dados distribuídos. Para < 100 GB, Fargate + pandas geralmente é suficiente.' }
    ],
    commonMistakes: [
      { es: '❌ Leer todo el archivo en memoria con pd.read_csv() sin chunksize - para 10 GB necesitarías ~30 GB de RAM', en: '❌ Reading entire file into memory with pd.read_csv() without chunksize - for 10 GB you would need ~30 GB RAM', pt: '❌ Ler todo o arquivo na memória com pd.read_csv() sem chunksize - para 10 GB precisaria de ~30 GB de RAM' },
      { es: '❌ No hacer flush periódico a S3 - acumular todos los chunks en una lista hasta el final consume memoria innecesariamente', en: '❌ Not doing periodic flush to S3 - accumulating all chunks in a list until the end consumes memory unnecessarily', pt: '❌ Não fazer flush periódico para S3 - acumular todos os chunks em uma lista até o final consome memória desnecessariamente' }
    ],
    externalLinks: [
      { title: 'Pandas Read CSV Chunks', url: 'https://pandas.pydata.org/docs/reference/api/pandas.read_csv.html', type: 'docs' },
      { title: 'PyArrow Parquet', url: 'https://arrow.apache.org/docs/python/parquet.html', type: 'docs' },
      { title: 'Fargate Ephemeral Storage', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-task-storage.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un ETL que lee archivos de +10 GB en chunks, deduplica con hash y escribe Parquet particionado?', en: '✅ Did you create an ETL that reads +10 GB files in chunks, deduplicates with hash and writes partitioned Parquet?', pt: '✅ Você criou um ETL que lê arquivos de +10 GB em chunks, deduplica com hash e escreve Parquet particionado?' },
    xpReward: 80,
    estimatedMinutes: 50,
    services: ['ECS', 'Fargate', 'S3']
  },

  // ═══════════════════════════════════════════════════════════════
  // STEP 8: Costos y Optimización
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'aws-fargate-8',
    stepNumber: 219,
    title: {
      es: 'Costos y Optimización',
      en: 'Costs and Optimization',
      pt: 'Custos e Otimização'
    },
    description: {
      es: 'Entender el pricing de Fargate, optimizar con Spot, right-sizing y comparar costos con Lambda, Glue y EMR.',
      en: 'Understand Fargate pricing, optimize with Spot, right-sizing and compare costs with Lambda, Glue and EMR.',
      pt: 'Entender o pricing do Fargate, otimizar com Spot, right-sizing e comparar custos com Lambda, Glue e EMR.'
    },
    theory: {
      es: `## Costos y Optimización de Fargate

### Pricing de Fargate (us-east-1, 2024)
\`\`\`
┌─────────────────────────────────────────────────┐
│           FARGATE PRICING                        │
├─────────────────────────────────────────────────┤
│  vCPU:    $0.04048 por vCPU por hora            │
│  Memoria: $0.004445 por GB por hora             │
│  Storage: $0.000111 por GB por hora (> 20 GB)   │
│                                                  │
│  Mínimo de cobro: 1 minuto                      │
│  Granularidad: por segundo                       │
│  Spot: 70% descuento (~$0.012/vCPU/h)          │
└─────────────────────────────────────────────────┘
\`\`\`

### Calculadora de Costos: Ejemplo Real
\`\`\`
Escenario: ETL diario que procesa 20 GB de logs

Configuración Fargate:
  2 vCPU, 8 GB RAM, 100 GB ephemeral storage
  Duración: 45 minutos (0.75 horas)

Cálculo por ejecución:
  vCPU:    2 × $0.04048 × 0.75h = $0.0607
  Memoria: 8 × $0.004445 × 0.75h = $0.0267
  Storage: 80 × $0.000111 × 0.75h = $0.0067
  ──────────────────────────────────
  Total por ejecución:              $0.0941

Costo mensual (30 ejecuciones):     $2.82
Costo con Spot (70% off):           $0.85/mes 🔥
\`\`\`

### Spot Fargate: 70% de Ahorro
\`\`\`
Fargate Spot = contenedores que AWS puede interrumpir
              cuando necesita la capacidad

¿Cuándo usar Spot?
  ✅ ETL batch (si se interrumpe, re-ejecutas)
  ✅ Procesamiento que puede reiniciar
  ✅ Tareas con checkpoint/retry
  ❌ APIs en producción 24/7
  ❌ Procesamiento que no puede interrumpirse
\`\`\`

### Configurar Spot
\`\`\`bash
# Con CLI: usar capacityProviderStrategy
aws ecs run-task \\
  --cluster data-engineering \\
  --task-definition etl-bronze-to-gold \\
  --capacity-provider-strategy '[{
    "capacityProvider": "FARGATE_SPOT",
    "weight": 1,
    "base": 0
  }]' \\
  --network-configuration '{...}'
\`\`\`

\`\`\`python
# Con boto3
ecs.run_task(
    cluster='data-engineering',
    taskDefinition='etl-bronze-to-gold',
    capacityProviderStrategy=[{
        'capacityProvider': 'FARGATE_SPOT',
        'weight': 1,
        'base': 0
    }],
    networkConfiguration={...}
)
\`\`\`

### Comparativa de Costos: Lambda vs Fargate vs Glue vs EMR
\`\`\`
Escenario: Procesar archivos diariamente durante 1 mes

┌──────────────────────────────────────────────────────────────────┐
│ Workload         │ Lambda    │ Fargate  │ Glue     │ EMR       │
├──────────────────┼───────────┼──────────┼──────────┼───────────┤
│ 100 MB, 2 min    │ $0/mes    │ $0.80    │ $13.20   │ $50+      │
│                  │ (Free Tier)│          │(1 DPU mín)│           │
├──────────────────┼───────────┼──────────┼──────────┼───────────┤
│ 1 GB, 10 min     │ $3.00     │ $1.50    │ $13.20   │ $50+      │
│                  │           │          │          │           │
├──────────────────┼───────────┼──────────┼──────────┼───────────┤
│ 10 GB, 45 min    │ ❌ Timeout│ $2.82    │ $19.80   │ $50+      │
│                  │           │Spot:$0.85│          │           │
├──────────────────┼───────────┼──────────┼──────────┼───────────┤
│ 100 GB, 3 horas  │ ❌        │ $12.00   │ $39.60   │ $30.00    │
│                  │           │Spot:$3.60│ (3 DPUs) │           │
├──────────────────┼───────────┼──────────┼──────────┼───────────┤
│ 1 TB, 8 horas    │ ❌        │ $48.00   │ $105.60  │ $40.00    │
│ (distribuido)    │           │(1 task)  │ (10 DPUs)│(5 nodos)  │
└──────────────────┴───────────┴──────────┴──────────┴───────────┘

Recomendación por tamaño:
  < 1 GB:     Lambda (gratis o casi gratis)
  1-100 GB:   Fargate Spot (más barato que Glue)
  100 GB-1 TB: Fargate o EMR Serverless (depende de paralelismo)
  > 1 TB:     EMR o Glue (procesamiento distribuido necesario)
\`\`\`

### Right-Sizing: Optimizar CPU y Memoria
\`\`\`
Paso 1: Ejecutar con configuración generosa (4 vCPU, 30 GB)
Paso 2: Revisar CloudWatch métricas:
  - CPUUtilization: si < 30%, reducir vCPU
  - MemoryUtilization: si < 50%, reducir RAM
Paso 3: Ajustar y re-probar

Ejemplo:
  Inicio: 4 vCPU, 30 GB → $0.37/hora
  Optimizado: 2 vCPU, 8 GB → $0.12/hora
  Ahorro: 68% 💰
\`\`\`

### Cuándo Usar Cada Servicio (Resumen Final)
| Servicio | Mejor Para | Costo Mínimo |
|----------|-----------|--------------|
| Lambda | Archivos < 10 GB, < 15 min, event-driven | $0 (Free Tier) |
| Fargate | Archivos 1-100 GB, ETL largo, dependencias | $0.01/tarea |
| Fargate Spot | Batch ETL tolerante a interrupciones | $0.003/tarea |
| Glue | Spark ETL, schema inference, crawlers | $0.44/DPU/hora |
| EMR Serverless | Spark distribuido > 100 GB | $0.05/vCPU/hora |
| EMR on EC2 | Clusters persistentes, ML a escala | $$/hora |`,
      en: `## Fargate Costs and Optimization

### Fargate Pricing (us-east-1)
\`\`\`
vCPU:    $0.04048 per vCPU per hour
Memory:  $0.004445 per GB per hour
Storage: $0.000111 per GB per hour (> 20 GB)

Spot: 70% discount (~$0.012/vCPU/h)
\`\`\`

### Cost Calculator Example
\`\`\`
Daily ETL processing 20 GB logs:
  2 vCPU, 8 GB RAM, 100 GB storage, 45 minutes

  vCPU:    2 × $0.04048 × 0.75h = $0.0607
  Memory:  8 × $0.004445 × 0.75h = $0.0267
  Storage: 80 × $0.000111 × 0.75h = $0.0067
  Total per run:                    $0.0941
  Monthly (30 runs):                $2.82
  With Spot (70% off):              $0.85/month 🔥
\`\`\`

### Cost Comparison: Lambda vs Fargate vs Glue vs EMR
| Workload | Lambda | Fargate | Glue | EMR |
|----------|--------|---------|------|-----|
| 100 MB, 2 min | $0 | $0.80/mo | $13.20 | $50+ |
| 10 GB, 45 min | ❌ Timeout | $2.82 (Spot: $0.85) | $19.80 | $50+ |
| 100 GB, 3 hours | ❌ | $12 (Spot: $3.60) | $39.60 | $30 |

### Recommendation by Size
- < 1 GB: Lambda
- 1-100 GB: Fargate Spot
- 100 GB-1 TB: EMR Serverless
- > 1 TB: EMR

### Right-Sizing
1. Start generous (4 vCPU, 30 GB)
2. Check CloudWatch: CPUUtilization, MemoryUtilization
3. If < 50% used, reduce configuration
4. Typical savings: 50-70%`,
      pt: `## Custos e Otimização do Fargate

### Pricing do Fargate (us-east-1)
\`\`\`
vCPU:    $0.04048 por vCPU por hora
Memória: $0.004445 por GB por hora
Spot:    70% desconto
\`\`\`

### Exemplo de Calculadora
\`\`\`
ETL diário processando 20 GB:
  2 vCPU, 8 GB RAM, 45 minutos
  Total por execução: $0.0941
  Mensal: $2.82
  Com Spot: $0.85/mês 🔥
\`\`\`

### Comparação de Custos
| Workload | Lambda | Fargate | Glue |
|----------|--------|---------|------|
| 100 MB, 2 min | $0 | $0.80 | $13.20 |
| 10 GB, 45 min | ❌ | $2.82 | $19.80 |

### Recomendação por Tamanho
- < 1 GB: Lambda
- 1-100 GB: Fargate Spot
- > 100 GB: EMR Serverless`
    },
    practicalTips: [
      { es: '💰 USA FARGATE SPOT para todo ETL batch - 70% de ahorro. Si se interrumpe (raro), Step Functions o EventBridge re-lanzan la tarea automáticamente.', en: '💰 USE FARGATE SPOT for all batch ETL - 70% savings. If interrupted (rare), Step Functions or EventBridge re-launch the task automatically.', pt: '💰 USE FARGATE SPOT para todo ETL batch - 70% de economia. Se interrompido (raro), Step Functions ou EventBridge re-lançam a tarefa automaticamente.' },
      { es: '📊 Revisa CloudWatch metrics después de cada ejecución: si CPUUtilization < 30% o MemoryUtilization < 50%, estás pagando de más. Reduce la configuración.', en: '📊 Check CloudWatch metrics after each run: if CPUUtilization < 30% or MemoryUtilization < 50%, you\'re overpaying. Reduce the configuration.', pt: '📊 Verifique CloudWatch metrics após cada execução: se CPUUtilization < 30% ou MemoryUtilization < 50%, você está pagando demais. Reduza a configuração.' }
    ],
    interviewTips: [
      { es: '🎯 "¿Cómo reducirías costos en un pipeline ETL con Fargate?" → 1) Fargate Spot para batch (70% off). 2) Right-sizing con CloudWatch metrics. 3) Configuración mínima viable. 4) Evaluar si Lambda es suficiente (< 15 min, < 10 GB). 5) Comprimir output (Parquet Snappy). 6) Lifecycle policies en ECR para limpiar imágenes viejas.', en: '🎯 "How would you reduce costs in an ETL pipeline with Fargate?" → 1) Fargate Spot for batch (70% off). 2) Right-sizing with CloudWatch metrics. 3) Minimum viable configuration. 4) Evaluate if Lambda is sufficient (< 15 min, < 10 GB). 5) Compress output (Parquet Snappy). 6) ECR lifecycle policies to clean old images.', pt: '🎯 "Como você reduziria custos em um pipeline ETL com Fargate?" → 1) Fargate Spot para batch (70% off). 2) Right-sizing com CloudWatch metrics. 3) Configuração mínima viável. 4) Avaliar se Lambda é suficiente (< 15 min, < 10 GB). 5) Comprimir output (Parquet Snappy). 6) Lifecycle policies no ECR para limpar imagens antigas.' },
      { es: '🎯 "Tu empresa procesa 500 GB de datos diarios. ¿Lambda, Fargate, Glue o EMR?" → Depende del patrón: Si son 500 archivos de 1 GB cada uno → Lambda en paralelo ($0/mes con Free Tier). Si es 1 archivo de 500 GB → Fargate con 16 vCPU, 120 GB RAM, Spot ($15/día). Si necesitas joins distribuidos entre datasets de 500 GB → EMR Serverless o Glue con Spark. No hay respuesta única - depende del workload.', en: '🎯 "Your company processes 500 GB daily. Lambda, Fargate, Glue or EMR?" → Depends on pattern: 500 files of 1 GB each → Lambda in parallel ($0/month). 1 file of 500 GB → Fargate with 16 vCPU, 120 GB RAM, Spot ($15/day). Distributed joins between 500 GB datasets → EMR Serverless or Glue with Spark.', pt: '🎯 "Sua empresa processa 500 GB de dados diários. Lambda, Fargate, Glue ou EMR?" → Depende do padrão: 500 arquivos de 1 GB → Lambda em paralelo ($0/mês). 1 arquivo de 500 GB → Fargate com 16 vCPU, 120 GB RAM, Spot ($15/dia). Joins distribuídos entre datasets de 500 GB → EMR Serverless ou Glue com Spark.' }
    ],
    commonMistakes: [
      { es: '❌ No usar Spot para ETL batch - estás pagando 3x más por nada. El riesgo de interrupción es < 5% y se mitiga con retry automático.', en: '❌ Not using Spot for batch ETL - you\'re paying 3x more for nothing. Interruption risk is < 5% and mitigated with auto-retry.', pt: '❌ Não usar Spot para ETL batch - você está pagando 3x mais por nada. O risco de interrupção é < 5% e é mitigado com retry automático.' },
      { es: '❌ Usar Glue para archivos pequeños (< 10 GB) - el mínimo de 1 DPU ($0.44/hora) hace que Glue sea caro para workloads simples. Fargate o Lambda son mucho más baratos.', en: '❌ Using Glue for small files (< 10 GB) - the minimum 1 DPU ($0.44/hour) makes Glue expensive for simple workloads. Fargate or Lambda are much cheaper.', pt: '❌ Usar Glue para arquivos pequenos (< 10 GB) - o mínimo de 1 DPU ($0.44/hora) torna Glue caro para workloads simples. Fargate ou Lambda são muito mais baratos.' }
    ],
    externalLinks: [
      { title: 'Fargate Pricing', url: 'https://aws.amazon.com/fargate/pricing/', type: 'aws_docs' },
      { title: 'Fargate Spot', url: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/fargate-capacity-providers.html', type: 'aws_docs' },
      { title: 'AWS Pricing Calculator', url: 'https://calculator.aws/', type: 'tool' },
      { title: 'ECS Cost Optimization', url: 'https://docs.aws.amazon.com/AmazonECS/latest/bestpracticesguide/cost-optimization.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Puedes calcular el costo de un ETL en Fargate y explicar cuándo Spot, Lambda o Glue son mejores opciones?', en: '✅ Can you calculate the cost of an ETL on Fargate and explain when Spot, Lambda or Glue are better options?', pt: '✅ Você consegue calcular o custo de um ETL no Fargate e explicar quando Spot, Lambda ou Glue são melhores opções?' },
    xpReward: 65,
    estimatedMinutes: 35,
    services: ['ECS', 'Fargate', 'CloudWatch']
  }
];

// ═══════════════════════════════════════════════════════════════
// Helper exports
// ═══════════════════════════════════════════════════════════════
export const FARGATE_PHASE_INFO = {
  totalSteps: phaseFargateSteps.length,
  totalXP: phaseFargateSteps.reduce((sum, s) => sum + s.xpReward, 0),
  totalMinutes: phaseFargateSteps.reduce((sum, s) => sum + s.estimatedMinutes, 0),
  freeTier: false,
  freeTierDetails: 'Fargate cobra por vCPU/hora y GB/hora. Spot disponible.',
  services: ['ECS', 'Fargate', 'ECR', 'S3', 'CloudWatch', 'IAM']
};
