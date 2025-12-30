import { Project } from '../../../types/members';

export const p2_docker_pipeline: Project = {
  id: 'p2-docker-pipeline',
  level: 2,
  title: { es: 'Pipeline Dockerizado', en: 'Dockerized Pipeline', pt: 'Pipeline Dockerizado' },
  description: {
    es: 'Containerizá un pipeline completo para que corra en cualquier lado. Docker es esencial para reproducibilidad.',
    en: 'Containerize a complete pipeline so it runs anywhere. Docker is essential for reproducibility.',
    pt: 'Containerize um pipeline completo para que rode em qualquer lugar. Docker é essencial para reprodutibilidade.'
  },
  difficulty: 'Avanzado',
  duration: '4-5 horas',
  skills: [{ es: 'Docker' }, { es: 'Python' }, { es: 'DevOps' }, { es: 'CI/CD' }],
  icon: '🐳',
  color: 'blue',
  datasetId: 'ecommerce',
  prerequisites: ['p1-etl-python'],
  estimatedLines: 80,
  realWorldExample: {
    es: 'Así empaqueta Airbnb sus pipelines para correr en Kubernetes',
    en: 'This is how Airbnb packages its pipelines to run on Kubernetes',
    pt: 'Assim o Airbnb empacota seus pipelines para rodar no Kubernetes'
  },
  usedBy: ['Airbnb', 'Spotify', 'Google', 'Amazon', 'Microsoft'],
  learningObjectives: [
    { es: 'Escribir Dockerfiles eficientes', en: 'Write efficient Dockerfiles', pt: 'Escrever Dockerfiles eficientes' },
    { es: 'Usar multi-stage builds', en: 'Use multi-stage builds', pt: 'Usar multi-stage builds' },
    { es: 'Configurar docker-compose', en: 'Configure docker-compose', pt: 'Configurar docker-compose' },
    { es: 'Manejar variables de entorno', en: 'Handle environment variables', pt: 'Lidar com variáveis de ambiente' },
    { es: 'Implementar health checks', en: 'Implement health checks', pt: 'Implementar health checks' },
  ],
  expectedOutputs: [
    {
      step: 5,
      description: { es: 'Container corriendo', en: 'Container running', pt: 'Container rodando' },
      example: `$ docker ps
CONTAINER ID   IMAGE          STATUS         PORTS
abc123         etl-pipeline   Up 2 minutes   
def456         postgres:15    Up 5 minutes   5432/tcp

$ docker logs abc123
2024-01-15 10:30:00 INFO Starting ETL pipeline...
2024-01-15 10:30:05 INFO Loaded 10000 records
2024-01-15 10:30:10 INFO Pipeline completed!`
    },
  ],
  interviewStory: {
    hook: { es: "Dockericé nuestros pipelines y eliminé el clásico 'en mi máquina funciona' - ahora deployamos a producción en 5 minutos.", en: "Dockerized our pipelines and eliminated the classic 'works on my machine' - now we deploy to production in 5 minutes.", pt: "Dockerizei nossos pipelines e eliminei o clássico 'na minha máquina funciona' - agora fazemos deploy para produção em 5 minutos." },
    situation: { es: "Los pipelines corrían diferente en cada máquina. Dependencias de Python conflictuaban, versiones de librerías no coincidían. Deployar a producción era un dolor de cabeza.", en: "Pipelines ran differently on each machine. Python dependencies conflicted, library versions didn't match. Deploying to production was a headache.", pt: "Os pipelines rodavam diferente em cada máquina. Dependências de Python conflitavam, versões de bibliotecas não coincidiam. Fazer deploy para produção era uma dor de cabeça." },
    task: { es: "Containerizar todos los pipelines para garantizar reproducibilidad desde desarrollo hasta producción.", en: "Containerize all pipelines to ensure reproducibility from development to production.", pt: "Containerizar todos os pipelines para garantir reprodutibilidade desde desenvolvimento até produção." },
    actions: [
      { es: "Escribí Dockerfiles optimizados con multi-stage builds para imágenes pequeñas", en: "Wrote optimized Dockerfiles with multi-stage builds for small images", pt: "Escrevi Dockerfiles otimizados com multi-stage builds para imagens pequenas" },
      { es: "Configuré docker-compose para levantar el stack completo localmente", en: "Configured docker-compose to spin up the full stack locally", pt: "Configurei docker-compose para levantar a stack completa localmente" },
      { es: "Implementé health checks para que Kubernetes supiera si el container está sano", en: "Implemented health checks so Kubernetes knew if the container was healthy", pt: "Implementei health checks para que o Kubernetes soubesse se o container está saudável" },
      { es: "Usé variables de entorno para configuración sin tocar código", en: "Used environment variables for configuration without touching code", pt: "Usei variáveis de ambiente para configuração sem tocar código" },
      { es: "Integré con CI/CD para build y push automático a registry", en: "Integrated with CI/CD for automatic build and push to registry", pt: "Integrei com CI/CD para build e push automático para registry" }
    ],
    results: [
      { es: "Deploy a producción: de 2 horas a 5 minutos", en: "Deploy to production: from 2 hours to 5 minutes", pt: "Deploy para produção: de 2 horas para 5 minutos" },
      { es: "Cero bugs de 'en mi máquina funciona'", en: "Zero 'works on my machine' bugs", pt: "Zero bugs de 'na minha máquina funciona'" },
      { es: "Imágenes de 1.2GB reducidas a 180MB con multi-stage", en: "Images reduced from 1.2GB to 180MB with multi-stage", pt: "Imagens de 1.2GB reduzidas para 180MB com multi-stage" },
      { es: "Onboarding de nuevos devs: docker-compose up y listo", en: "New dev onboarding: docker-compose up and done", pt: "Onboarding de novos devs: docker-compose up e pronto" }
    ],
    learnings: [
      { es: "El orden de los COPY importa - requirements.txt primero para cache", en: "COPY order matters - requirements.txt first for cache", pt: "A ordem dos COPY importa - requirements.txt primeiro para cache" },
      { es: "Multi-stage builds son esenciales para imágenes de producción", en: "Multi-stage builds are essential for production images", pt: "Multi-stage builds são essenciais para imagens de produção" },
      { es: "Health checks no son opcionales - Kubernetes los necesita", en: "Health checks are not optional - Kubernetes needs them", pt: "Health checks não são opcionais - Kubernetes precisa deles" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo optimizaste el tamaño de las imágenes?", en: "How did you optimize image size?", pt: "Como otimizou o tamanho das imagens?" },
        answer: { es: "1) Base image slim en vez de full, 2) Multi-stage build: compilar en una imagen, copiar solo binarios a la final, 3) .dockerignore para no copiar basura, 4) Combinar RUN commands para menos layers.", en: "1) Base image slim instead of full, 2) Multi-stage build: compile in one image, copy only binaries to final, 3) .dockerignore to avoid copying trash, 4) Combine RUN commands for fewer layers.", pt: "1) Base image slim em vez de full, 2) Multi-stage build: compilar em uma imagem, copiar apenas binários para a final, 3) .dockerignore para não copiar lixo, 4) Combinar RUN commands para menos layers." }
      },
      {
        question: { es: "¿Cómo manejás secrets en Docker?", en: "How do you handle secrets in Docker?", pt: "Como lida com secrets no Docker?" },
        answer: { es: "Nunca en el Dockerfile. Uso variables de entorno en runtime, o Docker secrets para Swarm/Kubernetes. En CI/CD, los secrets vienen del vault.", en: "Never in Dockerfile. I use runtime env vars, or Docker secrets for Swarm/Kubernetes. In CI/CD, secrets come from vault.", pt: "Nunca no Dockerfile. Uso variáveis de ambiente em runtime, ou Docker secrets para Swarm/Kubernetes. Em CI/CD, os secrets vêm do vault." }
      },
      {
        question: { es: "¿Docker vs Kubernetes?", en: "Docker vs Kubernetes?", pt: "Docker vs Kubernetes?" },
        answer: { es: "Docker es para containers individuales. Kubernetes orquesta múltiples containers, maneja scaling, health checks, rolling deploys. Uso Docker local, Kubernetes en producción.", en: "Docker is for individual containers. Kubernetes orchestrates multiple containers, handles scaling, health checks, rolling deploys. I use Docker locally, Kubernetes in production.", pt: "Docker é para containers individuais. Kubernetes orquestra múltiplos containers, lida com scaling, health checks, rolling deploys. Uso Docker local, Kubernetes em produção." }
      }
    ],
    closingStatement: { es: "Docker transformó nuestro proceso de desarrollo - lo que funciona local, funciona en producción.", en: "Docker transformed our development process - what works locally, works in production.", pt: "Docker transformou nosso processo de desenvolvimento - o que funciona local, funciona em produção." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📄 Creá el Dockerfile', en: '📄 Create Dockerfile', pt: '📄 Crie o Dockerfile' },
      code: `# Dockerfile
FROM python:3.10-slim

WORKDIR /app

# Copiar requirements primero (para cache)
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar código
COPY . .

# Variables de entorno
ENV PYTHONUNBUFFERED=1

# Comando por defecto
CMD ["python", "main.py"]`,
      explanation: { es: 'Copiar requirements.txt primero aprovecha el cache de Docker.', en: 'Copying requirements.txt first leverages Docker cache.', pt: 'Copiar requirements.txt primeiro aproveita o cache do Docker.' },
      tip: { es: 'Usá python:slim en vez de python:latest para imágenes más livianas.', en: 'Use python:slim instead of python:latest for lighter images.', pt: 'Use python:slim em vez de python:latest para imagens mais leves.' }
    },
    { 
      order: 2, 
      text: { es: '⚡ Multi-stage build', en: '⚡ Multi-stage build', pt: '⚡ Multi-stage build' },
      code: `# Dockerfile optimizado
FROM python:3.10-slim AS builder

WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

FROM python:3.10-slim

WORKDIR /app
COPY --from=builder /root/.local /root/.local
COPY . .

ENV PATH=/root/.local/bin:$PATH
ENV PYTHONUNBUFFERED=1

CMD ["python", "main.py"]`,
      explanation: { es: 'Multi-stage build: instalás en una imagen, copiás solo lo necesario a otra más liviana.', en: 'Multi-stage build: install in one image, copy only necessary files to another lighter one.', pt: 'Multi-stage build: instala em uma imagem, copia apenas o necessário para outra mais leve.' }
    },
    { 
      order: 3, 
      text: { es: '🐳 Creá docker-compose', en: '🐳 Create docker-compose', pt: '🐳 Crie docker-compose' },
      code: `# docker-compose.yml
version: '3.8'

services:
  etl:
    build: .
    volumes:
      - ./data:/app/data
      - ./output:/app/output
    environment:
      - API_TOKEN=\${API_TOKEN}
    healthcheck:
      test: ["CMD", "python", "-c", "import main"]
      interval: 30s
      timeout: 10s
      retries: 3`,
      explanation: { es: 'docker-compose simplifica correr múltiples servicios y manejar configuración.', en: 'docker-compose simplifies running multiple services and handling configuration.', pt: 'docker-compose simplifica rodar múltiplos serviços e lidar com configuração.' }
    },
    { 
      order: 4, 
      text: { es: '🔧 Configurá variables de entorno', en: '🔧 Configure environment variables', pt: '🔧 Configure variáveis de ambiente' },
      code: `# .env
API_TOKEN=tu_token_aqui

# En docker-compose, las variables se cargan automáticamente
# O podés pasarlas explícitamente:
# docker-compose --env-file .env up`,
      warning: { es: 'Nunca commitees el archivo .env. Agregalo a .gitignore.', en: 'Never commit .env file. Add it to .gitignore.', pt: 'Nunca dê commit no arquivo .env. Adicione ao .gitignore.' }
    },
    { 
      order: 5, 
      text: { es: '🚀 Build y run', en: '🚀 Build and run', pt: '🚀 Build e run' },
      code: `# Build
docker-compose build

# Run
docker-compose up

# Run en background
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down`,
      checkpoint: { es: '¿docker-compose up corre sin errores?', en: 'Does docker-compose up run without errors?', pt: 'docker-compose up roda sem erros?' }
    },
    { 
      order: 6, 
      text: { es: '📝 Documentá', en: '📝 Document', pt: '📝 Documente' },
      explanation: { es: 'Creá README explicando: cómo buildear, cómo correr, cómo configurar.', en: 'Create README explaining: how to build, how to run, how to configure.', pt: 'Crie README explicando: como buildar, como rodar, como configurar.' },
      checkpoint: { es: '¿Alguien puede correr tu pipeline con solo leer el README?', en: 'Can someone run your pipeline just by reading the README?', pt: 'Alguém pode rodar seu pipeline só lendo o README?' }
    },
  ],
  deliverable: { es: 'Dockerfile + docker-compose.yml + README', en: 'Dockerfile + docker-compose.yml + README', pt: 'Dockerfile + docker-compose.yml + README' },
  evaluation: [
    { es: '¿El container es liviano (<500MB)?', en: 'Is container lightweight (<500MB)?', pt: 'O container é leve (<500MB)?' },
    { es: '¿Funciona con docker-compose up?', en: 'Does it work with docker-compose up?', pt: 'Funciona com docker-compose up?' },
    { es: '¿Las variables de entorno están bien manejadas?', en: 'Are environment variables handled well?', pt: 'As variáveis de ambiente estão bem gerenciadas?' },
    { es: '¿Hay health checks?', en: 'Are there health checks?', pt: 'Tem health checks?' },
  ],
  theory: { es: `## Docker Best Practices

1. **Usar imágenes slim**: python:3.10-slim en vez de python:3.10
2. **Multi-stage builds**: Reducir tamaño final
3. **Cache de layers**: Copiar requirements.txt primero
4. **No correr como root**: Crear usuario específico
5. **.dockerignore**: Excluir archivos innecesarios`, en: `## Docker Best Practices

1. **Use slim images**: python:3.10-slim instead of python:3.10
2. **Multi-stage builds**: Reduce final size
3. **Layer cache**: Copy requirements.txt first
4. **Don't run as root**: Create specific user
5. **.dockerignore**: Exclude unnecessary files`, pt: `## Melhores Práticas Docker

1. **Usar imagens slim**: python:3.10-slim em vez de python:3.10
2. **Multi-stage builds**: Reduzir tamanho final
3. **Cache de layers**: Copiar requirements.txt primeiro
4. **Não rodar como root**: Criar usuário específico
5. **.dockerignore**: Excluir arquivos desnecessários` },
};


