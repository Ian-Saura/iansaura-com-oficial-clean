---
id: "l1-docker-containers"
version: "1.0.0"
lastUpdated: "2026-01-05"

title:
  es: "Docker: Containerización para Data Engineers"
  en: "Docker: Containerization for Data Engineers"
  pt: "Docker: Containerização para Data Engineers"

subtitle:
  es: "Empaqueta tu código para que funcione en cualquier lugar"
  en: "Package your code to work anywhere"
  pt: "Empacote seu código para funcionar em qualquer lugar"

level: 1
phase: "l1-docker"
estimatedTime: "12-15 horas"

prerequisites:
  - "l1-python-fundamentals"
  - "l1-git-version-control"

tags:
  - "docker"
  - "containers"
  - "devops"
  - "reproducibility"

theoreticalFoundations:
  - "Virtualización a nivel de OS"
  - "Namespaces y cgroups de Linux"
  - "Inmutabilidad de infraestructura"
  - "Capas de filesystem (UnionFS)"
---

<!-- 
╔══════════════════════════════════════════════════════════════╗
║  📚 BLOQUE: DOCKER CONTAINERS                                ║
║  Nivel: 1 | Fase: Deployment y Reproducibilidad              ║
╚══════════════════════════════════════════════════════════════╝
-->

# 🐳 Docker: Containerización para Data Engineers

> **Objetivo**: Dominar Docker para crear pipelines reproducibles. Entender imágenes, contenedores, y cómo empaquetar aplicaciones de datos.

---

## 🧠 Mapa Conceptual

```mermaid
mindmap
  root((Docker
    Mastery))
    🔬 Conceptos Core
      Contenedor
        Proceso aislado
        Filesystem propio
        Red propia
      Imagen
        Template inmutable
        Capas
        Base image
      Registry
        Docker Hub
        ECR/GCR
        Private
    📖 Dockerfile
      FROM base
      COPY archivos
      RUN comandos
      CMD entrypoint
      Optimización
        Cache de capas
        Multi-stage
        .dockerignore
    🔧 Operaciones
      Lifecycle
        build
        run
        stop
        rm
      Networking
        bridge
        host
        port mapping
      Volumes
        bind mounts
        named volumes
        tmpfs
    🚀 Data Engineering
      Python apps
        requirements.txt
        venv en container
      ETL pipelines
        Airflow
        Prefect
      DBs locales
        PostgreSQL
        MySQL
      Compose
        multi-container
        dependencias
```

---

## 🔗 First Principles: De la Teoría a la Práctica

| Concepto CS | Qué significa | Implementación en Docker |
|-------------|---------------|--------------------------|
| **Virtualización de OS** | Aislar procesos sin VM completa | Docker usa namespaces de Linux para aislar procesos, filesystem, red. Comparte kernel con host → más ligero que VMs. |
| **Inmutabilidad** | Una vez creado, no cambia | Imágenes son inmutables. Si quieres cambiar algo, creas nueva imagen. Garantiza reproducibilidad. |
| **Capas (Layers)** | Filesystem como stack de cambios | Cada instrucción en Dockerfile crea una capa. Capas se cachean → builds más rápidos. |
| **Aislamiento** | Procesos no ven otros procesos | Contenedor tiene su propio filesystem, PID namespace, network. Seguro y predecible. |
| **Declarativo** | Describir estado deseado | Dockerfile describe cómo construir imagen. `docker-compose.yml` describe cómo correr servicios. |

> [!IMPORTANT]
> 🧠 **First Principle clave**: Docker resuelve el problema de **"funciona en mi máquina"**. Un contenedor empaqueta código + dependencias + configuración en una unidad que corre idéntica en desarrollo, CI/CD, y producción.

---

## 📋 Technical Cheat Sheet

### 🖥️ Comandos CLI Críticos

```bash
# ═══════════════════════════════════════
# IMÁGENES
# ═══════════════════════════════════════
# Construir imagen desde Dockerfile
docker build -t mi-app:v1 .
docker build -t mi-app:v1 -f Dockerfile.prod .

# Listar imágenes
docker images
docker image ls

# Eliminar imagen
docker rmi mi-app:v1
docker image prune  # eliminar imágenes sin usar

# Push a registry
docker tag mi-app:v1 username/mi-app:v1
docker push username/mi-app:v1

# Pull desde registry
docker pull postgres:15

# ═══════════════════════════════════════
# CONTENEDORES
# ═══════════════════════════════════════
# Ejecutar contenedor
docker run mi-app:v1
docker run -d mi-app:v1  # detached (background)
docker run -it mi-app:v1 bash  # interactivo con shell

# Con port mapping
docker run -p 8080:80 mi-app:v1  # host:container

# Con variables de entorno
docker run -e DATABASE_URL=postgres://... mi-app:v1
docker run --env-file .env mi-app:v1

# Con volumen (persistencia)
docker run -v $(pwd)/data:/app/data mi-app:v1  # bind mount
docker run -v mi-volume:/app/data mi-app:v1   # named volume

# Listar contenedores
docker ps        # corriendo
docker ps -a     # todos

# Logs
docker logs container_id
docker logs -f container_id  # follow

# Ejecutar comando en contenedor existente
docker exec -it container_id bash
docker exec container_id python script.py

# Detener y eliminar
docker stop container_id
docker rm container_id
docker rm -f container_id  # forzar

# Limpiar todo
docker system prune -a  # ⚠️ elimina todo lo no usado

# ═══════════════════════════════════════
# DOCKER COMPOSE
# ═══════════════════════════════════════
docker compose up         # iniciar servicios
docker compose up -d      # detached
docker compose up --build # rebuild imágenes
docker compose down       # parar y eliminar
docker compose logs -f    # logs de todos los servicios
docker compose exec app bash  # shell en servicio
```

### 📝 Snippets de Alta Densidad

#### Patrón 1: Dockerfile para Python ETL

```dockerfile
# 🔥 BEST PRACTICE: Multi-stage build para imágenes pequeñas

# === Stage 1: Builder ===
FROM python:3.11-slim as builder

WORKDIR /app

# Instalar dependencias de compilación
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

# Copiar solo requirements primero (cache optimization)
COPY requirements.txt .

# Instalar dependencias en virtualenv
RUN python -m venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"
RUN pip install --no-cache-dir -r requirements.txt

# === Stage 2: Runtime ===
FROM python:3.11-slim

WORKDIR /app

# Copiar virtualenv del builder
COPY --from=builder /opt/venv /opt/venv
ENV PATH="/opt/venv/bin:$PATH"

# Instalar solo runtime dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpq5 \
    && rm -rf /var/lib/apt/lists/*

# Copiar código
COPY src/ ./src/
COPY config/ ./config/

# Usuario no-root (seguridad)
RUN useradd --create-home appuser
USER appuser

# Variables de entorno
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Comando por defecto
CMD ["python", "src/main.py"]
```

#### Patrón 2: .dockerignore (siempre incluir)

```dockerignore
# 🔥 BEST PRACTICE: Excluir todo lo innecesario para builds rápidos

# Git
.git
.gitignore

# Python
__pycache__
*.pyc
*.pyo
*.egg-info
.eggs
*.egg
.venv
venv
.pytest_cache

# IDE
.vscode
.idea
*.swp

# Tests (no necesarios en producción)
tests/
*_test.py
test_*.py

# Docs
docs/
*.md
!README.md

# Local config
.env
.env.local
*.local

# Data (no empaquetar datos en imagen)
data/
*.csv
*.parquet

# Logs
logs/
*.log

# Docker
Dockerfile*
docker-compose*
.docker
```

#### Patrón 3: docker-compose.yml para Desarrollo

```yaml
# 🔥 BEST PRACTICE: Compose para entorno de desarrollo completo

version: '3.8'

services:
  # Tu aplicación ETL
  etl:
    build:
      context: .
      dockerfile: Dockerfile
    volumes:
      - ./src:/app/src  # Hot reload para desarrollo
      - ./data:/app/data
    environment:
      - DATABASE_URL=postgresql://user:pass@postgres:5432/db
      - REDIS_URL=redis://redis:6379
    depends_on:
      postgres:
        condition: service_healthy
    command: python src/main.py

  # PostgreSQL para desarrollo
  postgres:
    image: postgres:15
    environment:
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass
      POSTGRES_DB: db
    volumes:
      - postgres_data:/var/lib/postgresql/data
      - ./init.sql:/docker-entrypoint-initdb.d/init.sql
    ports:
      - "5432:5432"
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U user -d db"]
      interval: 5s
      timeout: 5s
      retries: 5

  # Redis para cache/queue
  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  # Adminer para ver la DB
  adminer:
    image: adminer
    ports:
      - "8080:8080"
    depends_on:
      - postgres

volumes:
  postgres_data:
```

#### Patrón 4: Dockerfile para Airflow Custom

```dockerfile
# 🔥 BEST PRACTICE: Extender imagen oficial de Airflow

FROM apache/airflow:2.8.0-python3.11

USER root

# Dependencias del sistema si las necesitas
RUN apt-get update && apt-get install -y --no-install-recommends \
    git \
    && rm -rf /var/lib/apt/lists/*

USER airflow

# Instalar providers y librerías adicionales
COPY requirements-airflow.txt .
RUN pip install --no-cache-dir -r requirements-airflow.txt

# Copiar DAGs y plugins
COPY dags/ /opt/airflow/dags/
COPY plugins/ /opt/airflow/plugins/
```

### 🏗️ Patrones de Diseño Aplicados

#### 1. One Process Per Container

```yaml
# ✅ CORRECTO: Cada servicio en su contenedor
services:
  web:
    image: nginx
  api:
    build: ./api
  worker:
    build: ./worker
  db:
    image: postgres

# ❌ EVITAR: Múltiples procesos en un contenedor
# No uses supervisord para correr web + worker + cron
```

**Por qué**: Logging más claro, scaling independiente, reinicio aislado.

#### 2. Build Arguments para Configuración

```dockerfile
# Dockerfile
ARG PYTHON_VERSION=3.11
FROM python:${PYTHON_VERSION}-slim

ARG ENV=production
ENV ENVIRONMENT=${ENV}

COPY requirements.${ENV}.txt requirements.txt
RUN pip install -r requirements.txt
```

```bash
# Build para diferentes entornos
docker build --build-arg ENV=development -t app:dev .
docker build --build-arg ENV=production -t app:prod .
```

#### 3. Health Checks

```dockerfile
# En Dockerfile
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD curl -f http://localhost:8000/health || exit 1
```

```yaml
# En docker-compose.yml
services:
  api:
    build: .
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8000/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

### ⚠️ Gotchas de Nivel Senior

> [!WARNING]
> **Gotcha #1: Orden de instrucciones y cache**
> 
> Docker cachea capas. Si cambias una capa, todas las siguientes se rebuildan.
> 
> ```dockerfile
> # ❌ LENTO - cualquier cambio de código invalida cache de pip
> COPY . .
> RUN pip install -r requirements.txt
> 
> # ✅ RÁPIDO - solo rebuilds pip si cambia requirements.txt
> COPY requirements.txt .
> RUN pip install -r requirements.txt
> COPY . .
> ```

> [!WARNING]
> **Gotcha #2: Correr como root**
> 
> Por defecto, contenedores corren como root. Riesgo de seguridad.
> 
> ```dockerfile
> # ✅ Crear y usar usuario no-root
> RUN useradd --create-home --shell /bin/bash appuser
> USER appuser
> WORKDIR /home/appuser/app
> ```

> [!WARNING]
> **Gotcha #3: Imágenes gigantes**
> 
> Usar imagen base incorrecta o no limpiar puede resultar en imágenes de GBs.
> 
> ```dockerfile
> # ❌ GRANDE (~1GB)
> FROM python:3.11
> 
> # ✅ PEQUEÑA (~150MB)
> FROM python:3.11-slim
> 
> # ✅ MÁS PEQUEÑA (~50MB) pero más trabajo
> FROM python:3.11-alpine
> 
> # Siempre limpiar cache de apt
> RUN apt-get update && apt-get install -y pkg \
>     && rm -rf /var/lib/apt/lists/*
> ```

> [!WARNING]
> **Gotcha #4: Datos en contenedores**
> 
> Los datos dentro del contenedor se pierden cuando el contenedor se elimina.
> 
> ```bash
> # ❌ Datos se pierden
> docker run postgres
> 
> # ✅ Datos persisten en volume
> docker run -v pgdata:/var/lib/postgresql/data postgres
> 
> # ✅ O bind mount para desarrollo
> docker run -v $(pwd)/data:/var/lib/postgresql/data postgres
> ```

> [!WARNING]
> **Gotcha #5: .env y secretos en imagen**
> 
> NUNCA incluir secretos en la imagen. Quedan en las capas incluso si los borras después.
> 
> ```dockerfile
> # ❌ PELIGROSO - secreto queda en capa
> COPY .env .
> RUN source .env && do_something
> RUN rm .env  # No ayuda, ya está en capa anterior
> 
> # ✅ Pasar secretos en runtime
> # docker run -e SECRET_KEY=xxx app
> # o docker run --env-file .env app
> ```

---

## 📊 Comparativa de Imágenes Base

| Imagen | Tamaño | Pros | Contras |
|--------|--------|------|---------|
| `python:3.11` | ~1GB | Todo incluido, fácil | Muy grande |
| `python:3.11-slim` | ~150MB | Balance tamaño/facilidad | Falta algunas libs |
| `python:3.11-alpine` | ~50MB | Muy pequeña | musl vs glibc, problemas de compatibilidad |
| `distroless/python3` | ~50MB | Mínima, segura | Sin shell, debugging difícil |

---

## 📚 Bibliografía Académica y Profesional

### 📖 Libros y Recursos

| Recurso | Tipo | Por qué leerlo |
|---------|------|----------------|
| **Docker Deep Dive** | Libro - Nigel Poulton | LA referencia para entender Docker a fondo |
| **Docker Documentation** | Docs oficiales | Siempre actualizado, muy completo |
| **The Twelve-Factor App** | Metodología | Principios de apps cloud-native que Docker habilita |

### 📋 Recursos Prácticos

- **Docker Official Images** - 🔗 [hub.docker.com](https://hub.docker.com/search?q=&type=image&image_filter=official)
- **Dockerfile Best Practices** - 🔗 [docs.docker.com](https://docs.docker.com/develop/develop-images/dockerfile_best-practices/)
- **Play with Docker** - 🔗 [labs.play-with-docker.com](https://labs.play-with-docker.com/) - Practica sin instalar

---

## ✅ Checklist de Dominio

Antes de avanzar, verifica que puedes:

- [ ] Escribir un Dockerfile para aplicación Python
- [ ] Usar multi-stage builds para imágenes pequeñas
- [ ] Configurar .dockerignore correctamente
- [ ] Usar docker-compose para múltiples servicios
- [ ] Manejar volúmenes para persistencia de datos
- [ ] Pasar configuración vía variables de entorno
- [ ] Debuggear contenedores con `exec` y `logs`
- [ ] Explicar diferencia entre imagen y contenedor
- [ ] Optimizar orden de instrucciones para cache
- [ ] Correr contenedores como usuario no-root

---

*Última actualización: Enero 2026 | Versión: 1.0.0*

