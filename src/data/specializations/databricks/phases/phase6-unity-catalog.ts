/**
 * FASE 6: Unity Catalog
 * Governance centralizada de datos - El sistema nervioso de Databricks
 */

import { DatabricksPhase } from '../types';

export const PHASE_6_UNITY_CATALOG: DatabricksPhase = {
  id: 'db-phase-6',
  number: 6,
  title: { es: 'Unity Catalog', en: 'Unity Catalog', pt: 'Unity Catalog' },
  subtitle: { es: 'Governance y seguridad de datos', en: 'Data governance and security', pt: 'Governance e segurança de dados' },
  description: { 
    es: 'Unity Catalog es el sistema de governance centralizado de Databricks. Controla accesos, audita uso, rastrea linaje y gestiona datos de forma unificada. Es FUNDAMENTAL para empresas y está en el 30% del examen de certificación.',
    en: 'Unity Catalog is Databricks centralized governance system. Controls access, audits usage, tracks lineage and manages data in a unified way.',
    pt: 'Unity Catalog é o sistema de governance centralizado do Databricks. Controla acessos, audita uso, rastreia linhagem e gerencia dados de forma unificada.'
  },
  icon: '🔐',
  color: 'purple',
  estimatedDays: '4-5 días',
  steps: [
    {
      id: 'db-6-1',
      title: { es: '¿Qué es Unity Catalog?', en: 'What is Unity Catalog?', pt: 'O que é Unity Catalog?' },
      description: { es: 'Introducción completa a Unity Catalog y por qué es crítico para empresas.', en: 'Complete introduction to Unity Catalog and why it is critical for enterprises.', pt: 'Introdução completa ao Unity Catalog e por que é crítico para empresas.' },
      theory: {
        es: `## Unity Catalog: El Cerebro de Governance de Databricks

Unity Catalog es la **solución de governance unificada** de Databricks que te permite gestionar datos, ML models, y notebooks desde un solo lugar.

### El Problema que Resuelve

**Antes de Unity Catalog:**
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    CAOS DE GOVERNANCE                        │
├─────────────────────────────────────────────────────────────┤
│ ❌ Cada workspace tiene su propio Hive Metastore            │
│ ❌ Los datos no se comparten fácilmente entre workspaces    │
│ ❌ Permisos dispersos (IAM + Hive + Table ACLs)             │
│ ❌ No hay linaje de datos automático                        │
│ ❌ Auditoría fragmentada                                    │
│ ❌ No hay catálogo central de assets                        │
└─────────────────────────────────────────────────────────────┘
\`\`\`

**Con Unity Catalog:**
\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                GOVERNANCE UNIFICADA                          │
├─────────────────────────────────────────────────────────────┤
│ ✅ UN metastore para TODOS los workspaces                   │
│ ✅ Compartir datos entre workspaces fácilmente              │
│ ✅ Permisos centralizados con SQL GRANT/REVOKE              │
│ ✅ Linaje automático de datos                               │
│ ✅ Auditoría completa de quién accede a qué                 │
│ ✅ Catálogo central searchable                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Jerarquía de Unity Catalog

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                      METASTORE                               │
│         (Contenedor top-level por región)                    │
│                          │                                   │
│         ┌────────────────┼────────────────┐                 │
│         ▼                ▼                ▼                 │
│   ┌──────────┐    ┌──────────┐    ┌──────────┐             │
│   │ CATALOG  │    │ CATALOG  │    │ CATALOG  │             │
│   │  (prod)  │    │  (dev)   │    │ (staging)│             │
│   └────┬─────┘    └────┬─────┘    └────┬─────┘             │
│        │               │               │                    │
│   ┌────┴────┐     ┌────┴────┐     ┌────┴────┐              │
│   ▼         ▼     ▼         ▼     ▼         ▼              │
│ SCHEMA   SCHEMA SCHEMA   SCHEMA SCHEMA   SCHEMA            │
│ (sales)  (hr)   (sales)  (hr)   (sales)  (hr)              │
│    │        │      │        │      │        │              │
│    ▼        ▼      ▼        ▼      ▼        ▼              │
│ TABLES  TABLES  TABLES  TABLES  TABLES  TABLES             │
│ VIEWS   VIEWS   VIEWS   VIEWS   VIEWS   VIEWS              │
│ FUNCS   FUNCS   FUNCS   FUNCS   FUNCS   FUNCS              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Nomenclatura de 3 Niveles

\`\`\`sql
-- Formato: catalog.schema.object
SELECT * FROM prod.sales.customers;
--            │     │      │
--            │     │      └── Tabla
--            │     └── Schema (base de datos)
--            └── Catalog (ambiente)

-- Equivalente a:
USE CATALOG prod;
USE SCHEMA sales;
SELECT * FROM customers;
\`\`\`

### ¿Qué puedes gestionar con Unity Catalog?

| Objeto | Descripción |
|--------|-------------|
| **Tables** | Managed y External tables (Delta, Parquet, CSV) |
| **Iceberg Tables** | ⭐ NUEVO 2024: Soporte nativo Apache Iceberg |
| **Views** | Vistas SQL |
| **Functions** | UDFs registradas |
| **Volumes** | Archivos no estructurados |
| **Models** | MLflow models |
| **Connections** | Conexiones externas (Lakehouse Federation) |
| **Shares** | Delta Sharing para compartir datos |

### 🆕 Apache Iceberg en Unity Catalog (2024)

Databricks ahora soporta **Apache Iceberg** nativamente:

\`\`\`sql
-- Crear tabla Iceberg
CREATE TABLE catalog.schema.my_iceberg_table
USING ICEBERG
AS SELECT * FROM source_data;

-- Time travel en Iceberg (igual que Delta!)
SELECT * FROM catalog.schema.my_iceberg_table VERSION AS OF 123;
\`\`\`

**Beneficios**: Compatibilidad con Snowflake, Trino, Athena + governance unificada.

### Unity Catalog vs Hive Metastore

| Feature | Hive Metastore | Unity Catalog |
|---------|---------------|---------------|
| Scope | Por workspace | Multi-workspace |
| Permisos | Table ACLs básicos | Fine-grained RBAC |
| Linaje | Manual | Automático |
| Auditoría | Limitada | Completa |
| Compartir datos | Difícil | Delta Sharing nativo |
| ML Models | Separado | Integrado |

### ⚠️ Nota Importante

Unity Catalog **NO está disponible en Community Edition**. Para practicar:
1. Usa el **trial gratuito de 14 días** de Databricks
2. Toma los **labs de Databricks Academy** (gratis)
3. Estudia la documentación para el examen`,
        en: `## Unity Catalog: Databricks Governance Brain

Unity Catalog is Databricks **unified governance solution** that lets you manage data, ML models, and notebooks from one place.

### 3-Level Naming

\`\`\`sql
SELECT * FROM prod.sales.customers;
--            catalog.schema.table
\`\`\`

### What can you manage?

- Tables (managed & external)
- Views, Functions
- Volumes (unstructured files)
- ML Models
- External Connections
- Delta Shares`,
        pt: `## Unity Catalog: O Cérebro de Governance do Databricks

Unity Catalog é a **solução de governance unificada** do Databricks.

### Nomenclatura de 3 Níveis

\`\`\`sql
SELECT * FROM prod.sales.customers;
--            catalog.schema.tabela
\`\`\``
      },
      practicalTips: [
        { es: '💡 Piensa en Catalog como "ambiente" (dev/staging/prod) y Schema como "base de datos".', en: '💡 Think of Catalog as "environment" (dev/staging/prod) and Schema as "database".', pt: '💡 Pense em Catalog como "ambiente" (dev/staging/prod) e Schema como "banco de dados".' },
        { es: '🎯 El 30% del examen de certificación es sobre Unity Catalog. Estudialo bien.', en: '🎯 30% of the certification exam is about Unity Catalog. Study it well.', pt: '🎯 30% do exame de certificação é sobre Unity Catalog. Estude bem.' },
        { es: '⚠️ Unity Catalog requiere Databricks Premium o Enterprise, no está en Community Edition.', en: '⚠️ Unity Catalog requires Databricks Premium or Enterprise, not in Community Edition.', pt: '⚠️ Unity Catalog requer Databricks Premium ou Enterprise, não está no Community Edition.' }
      ],
      externalLinks: [
        { title: 'Unity Catalog Overview', url: 'https://docs.databricks.com/data-governance/unity-catalog/index.html', type: 'docs' },
        { title: 'Databricks Academy - UC Course', url: 'https://www.databricks.com/learn/training/catalog/data-governance', type: 'video' }
      ],
      checkpoint: { es: '🤔 ¿Podés explicar la diferencia entre Metastore, Catalog y Schema?', en: '🤔 Can you explain the difference between Metastore, Catalog and Schema?', pt: '🤔 Você consegue explicar a diferença entre Metastore, Catalog e Schema?' },
      xpReward: 25,
      estimatedMinutes: 30
    },
    {
      id: 'db-6-2',
      title: { es: 'Crear Catalogs y Schemas', en: 'Create Catalogs and Schemas', pt: 'Criar Catalogs e Schemas' },
      description: { es: 'Aprende a organizar tus datos con la jerarquía de Unity Catalog.', en: 'Learn to organize your data with Unity Catalog hierarchy.', pt: 'Aprenda a organizar seus dados com a hierarquia do Unity Catalog.' },
      theory: {
        es: `## Crear y Gestionar Catalogs y Schemas

### Crear un Catalog

\`\`\`sql
-- Crear catalog para ambiente de desarrollo
CREATE CATALOG IF NOT EXISTS dev
COMMENT 'Ambiente de desarrollo';

-- Crear catalog para producción con ubicación específica
CREATE CATALOG IF NOT EXISTS prod
MANAGED LOCATION 's3://mi-bucket/prod/'
COMMENT 'Ambiente de producción';

-- Ver catalogs disponibles
SHOW CATALOGS;

-- Cambiar a un catalog
USE CATALOG dev;
\`\`\`

### Crear Schemas dentro de un Catalog

\`\`\`sql
-- Asegurarse de estar en el catalog correcto
USE CATALOG dev;

-- Crear schemas por dominio de negocio
CREATE SCHEMA IF NOT EXISTS sales
COMMENT 'Datos del equipo de ventas';

CREATE SCHEMA IF NOT EXISTS marketing
COMMENT 'Datos del equipo de marketing';

CREATE SCHEMA IF NOT EXISTS hr
MANAGED LOCATION 's3://mi-bucket/dev/hr/'
COMMENT 'Datos de recursos humanos - sensible';

-- Ver schemas
SHOW SCHEMAS;

-- Cambiar a un schema
USE SCHEMA sales;
\`\`\`

### Crear Tablas dentro de un Schema

\`\`\`sql
-- Tabla managed (Databricks controla ubicación)
CREATE TABLE IF NOT EXISTS dev.sales.customers (
    customer_id BIGINT,
    name STRING,
    email STRING,
    created_at TIMESTAMP
) USING DELTA
COMMENT 'Tabla de clientes';

-- Tabla external (tú controlas ubicación)
CREATE TABLE IF NOT EXISTS dev.sales.orders (
    order_id BIGINT,
    customer_id BIGINT,
    amount DOUBLE,
    order_date DATE
) USING DELTA
LOCATION 's3://mi-bucket/external/orders/'
COMMENT 'Tabla de órdenes';
\`\`\`

### Estructura Recomendada para Empresas

\`\`\`
metastore (región: us-east-1)
│
├── prod                          # Solo lectura para la mayoría
│   ├── bronze                    # Raw data
│   │   ├── sales_raw
│   │   ├── marketing_raw
│   │   └── hr_raw
│   ├── silver                    # Cleaned data
│   │   ├── sales_clean
│   │   ├── marketing_clean
│   │   └── hr_clean
│   └── gold                      # Aggregated/Analytics
│       ├── sales_analytics
│       ├── marketing_analytics
│       └── executive_dashboards
│
├── staging                       # Pre-producción
│   └── (misma estructura que prod)
│
└── dev                           # Desarrollo
    └── (misma estructura que prod)
\`\`\`

### Comandos Útiles

\`\`\`sql
-- Describir un catalog
DESCRIBE CATALOG dev;

-- Describir un schema
DESCRIBE SCHEMA dev.sales;

-- Ver propiedades extendidas
DESCRIBE CATALOG EXTENDED prod;

-- Modificar comentario
ALTER CATALOG dev SET COMMENT 'Ambiente de desarrollo actualizado';

-- Eliminar (con cuidado!)
DROP SCHEMA IF EXISTS dev.test_schema CASCADE;
DROP CATALOG IF EXISTS temp_catalog CASCADE;
\`\`\``,
        en: `## Create and Manage Catalogs and Schemas

\`\`\`sql
-- Create catalog
CREATE CATALOG IF NOT EXISTS dev COMMENT 'Development environment';

-- Create schema
CREATE SCHEMA IF NOT EXISTS dev.sales COMMENT 'Sales data';

-- Create table
CREATE TABLE dev.sales.customers (id BIGINT, name STRING) USING DELTA;
\`\`\``,
        pt: `## Criar e Gerenciar Catalogs e Schemas

\`\`\`sql
-- Criar catalog
CREATE CATALOG IF NOT EXISTS dev COMMENT 'Ambiente de desenvolvimento';

-- Criar schema
CREATE SCHEMA IF NOT EXISTS dev.sales COMMENT 'Dados de vendas';
\`\`\``
      },
      practicalTips: [
        { es: '📁 Usa catalogs para ambientes (dev/staging/prod) y schemas para dominios (sales/hr/marketing).', en: '📁 Use catalogs for environments (dev/staging/prod) and schemas for domains (sales/hr/marketing).', pt: '📁 Use catalogs para ambientes (dev/staging/prod) e schemas para domínios (sales/hr/marketing).' },
        { es: '⚠️ CASCADE elimina todo dentro. Úsalo con mucho cuidado en producción.', en: '⚠️ CASCADE deletes everything inside. Use it very carefully in production.', pt: '⚠️ CASCADE deleta tudo dentro. Use com muito cuidado em produção.' }
      ],
      externalLinks: [
        { title: 'Create Catalogs', url: 'https://docs.databricks.com/data-governance/unity-catalog/create-catalogs.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Creaste un catalog con schemas organizados por dominio?', en: '✅ Did you create a catalog with schemas organized by domain?', pt: '✅ Você criou um catalog com schemas organizados por domínio?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-6-3',
      title: { es: 'Permisos con GRANT y REVOKE', en: 'Permissions with GRANT and REVOKE', pt: 'Permissões com GRANT e REVOKE' },
      description: { es: 'El sistema de permisos de Unity Catalog es simple pero poderoso: usa SQL estándar.', en: 'Unity Catalog permission system is simple but powerful: uses standard SQL.', pt: 'O sistema de permissões do Unity Catalog é simples mas poderoso: usa SQL padrão.' },
      theory: {
        es: `## Sistema de Permisos de Unity Catalog

Unity Catalog usa **SQL estándar** para gestionar permisos: GRANT y REVOKE.

### Privilegios Disponibles

| Privilegio | Aplica a | Permite |
|------------|----------|---------|
| **SELECT** | Table, View | Leer datos |
| **MODIFY** | Table | INSERT, UPDATE, DELETE |
| **CREATE** | Schema, Catalog | Crear objetos dentro |
| **USAGE** | Catalog, Schema | Acceder al contenedor |
| **ALL PRIVILEGES** | Cualquiera | Todos los permisos |

### Sintaxis Básica

\`\`\`sql
-- Dar permiso a un usuario
GRANT SELECT ON TABLE prod.sales.customers TO \`usuario@empresa.com\`;

-- Dar permiso a un grupo
GRANT SELECT, MODIFY ON TABLE prod.sales.orders TO \`data_analysts\`;

-- Dar acceso a todo un schema
GRANT USAGE ON SCHEMA prod.sales TO \`data_analysts\`;
GRANT SELECT ON SCHEMA prod.sales TO \`data_analysts\`;

-- Dar acceso a un catalog completo
GRANT USAGE ON CATALOG prod TO \`data_analysts\`;

-- Quitar permiso
REVOKE MODIFY ON TABLE prod.sales.orders FROM \`junior_analyst@empresa.com\`;
\`\`\`

### Jerarquía de Permisos

\`\`\`
Para acceder a prod.sales.customers necesitas:

1. USAGE en catalog 'prod'
2. USAGE en schema 'sales' 
3. SELECT en table 'customers'

┌─────────────────────────────────────┐
│  CATALOG: prod                      │
│  └── Necesita: USAGE                │
│      │                              │
│      └── SCHEMA: sales              │
│          └── Necesita: USAGE        │
│              │                      │
│              └── TABLE: customers   │
│                  └── Necesita: SELECT│
└─────────────────────────────────────┘
\`\`\`

### Ejemplo Completo: Configurar Acceso para Analistas

\`\`\`sql
-- 1. Dar acceso al catalog de producción
GRANT USAGE ON CATALOG prod TO \`data_analysts\`;

-- 2. Dar acceso a schemas específicos (no HR por ser sensible)
GRANT USAGE ON SCHEMA prod.sales TO \`data_analysts\`;
GRANT USAGE ON SCHEMA prod.marketing TO \`data_analysts\`;

-- 3. Dar permisos de lectura en las tablas
GRANT SELECT ON ALL TABLES IN SCHEMA prod.sales TO \`data_analysts\`;
GRANT SELECT ON ALL TABLES IN SCHEMA prod.marketing TO \`data_analysts\`;

-- 4. Para analistas senior, permitir crear views
GRANT CREATE ON SCHEMA prod.sales TO \`senior_analysts\`;
\`\`\`

### Ver Permisos

\`\`\`sql
-- Ver permisos de una tabla
SHOW GRANTS ON TABLE prod.sales.customers;

-- Ver permisos de un usuario
SHOW GRANTS TO \`usuario@empresa.com\`;

-- Ver todos los permisos en un schema
SHOW GRANTS ON SCHEMA prod.sales;
\`\`\`

### Ownership (Dueño)

\`\`\`sql
-- El creador es el dueño por defecto
-- El dueño tiene TODOS los permisos

-- Transferir ownership
ALTER TABLE prod.sales.customers SET OWNER TO \`data_engineering\`;
ALTER SCHEMA prod.sales SET OWNER TO \`data_platform_team\`;
\`\`\`

### Best Practices

1. **Usa grupos, no usuarios individuales**
2. **Principio de mínimo privilegio**
3. **Nunca des ALL PRIVILEGES a usuarios finales**
4. **Documenta quién tiene acceso a qué**
5. **Revisa permisos periódicamente**`,
        en: `## Unity Catalog Permission System

\`\`\`sql
-- Grant to user
GRANT SELECT ON TABLE prod.sales.customers TO \`user@company.com\`;

-- Grant to group
GRANT SELECT, MODIFY ON TABLE prod.sales.orders TO \`data_analysts\`;

-- Revoke
REVOKE MODIFY FROM \`junior@company.com\`;

-- Show grants
SHOW GRANTS ON TABLE prod.sales.customers;
\`\`\``,
        pt: `## Sistema de Permissões do Unity Catalog

\`\`\`sql
-- Dar permissão a usuário
GRANT SELECT ON TABLE prod.sales.customers TO \`usuario@empresa.com\`;

-- Dar permissão a grupo
GRANT SELECT, MODIFY ON TABLE prod.sales.orders TO \`data_analysts\`;
\`\`\``
      },
      practicalTips: [
        { es: '👥 SIEMPRE usa grupos en vez de usuarios individuales. Es más mantenible.', en: '👥 ALWAYS use groups instead of individual users. More maintainable.', pt: '👥 SEMPRE use grupos em vez de usuários individuais. Mais manutenível.' },
        { es: '🔐 Recuerda: para acceder a una tabla necesitas USAGE en catalog Y schema, más SELECT en la tabla.', en: '🔐 Remember: to access a table you need USAGE on catalog AND schema, plus SELECT on the table.', pt: '🔐 Lembre: para acessar uma tabela precisa USAGE no catalog E schema, mais SELECT na tabela.' }
      ],
      externalLinks: [
        { title: 'Manage Privileges', url: 'https://docs.databricks.com/data-governance/unity-catalog/manage-privileges/index.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Configuraste permisos para un grupo de analistas en un schema específico?', en: '✅ Did you configure permissions for an analyst group on a specific schema?', pt: '✅ Você configurou permissões para um grupo de analistas em um schema específico?' },
      xpReward: 35,
      estimatedMinutes: 35
    },
    {
      id: 'db-6-4',
      title: { es: 'External Locations y Storage Credentials', en: 'External Locations and Storage Credentials', pt: 'External Locations e Storage Credentials' },
      description: { es: 'Conecta datos externos de S3/ADLS/GCS de forma segura y gobernada.', en: 'Connect external data from S3/ADLS/GCS in a secure and governed way.', pt: 'Conecte dados externos de S3/ADLS/GCS de forma segura e governada.' },
      theory: {
        es: `## External Locations: Acceso Gobernado a Cloud Storage

External Locations permiten acceder a datos en S3, ADLS o GCS de forma gobernada.

### Arquitectura

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                     UNITY CATALOG                            │
│                          │                                   │
│    ┌─────────────────────┼─────────────────────┐            │
│    │                     │                     │            │
│    ▼                     ▼                     ▼            │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│ │STORAGE       │  │STORAGE       │  │STORAGE       │       │
│ │CREDENTIAL    │  │CREDENTIAL    │  │CREDENTIAL    │       │
│ │(AWS IAM Role)│  │(Azure SP)    │  │(GCP SA)      │       │
│ └──────┬───────┘  └──────┬───────┘  └──────┬───────┘       │
│        │                 │                 │                │
│        ▼                 ▼                 ▼                │
│ ┌──────────────┐  ┌──────────────┐  ┌──────────────┐       │
│ │EXTERNAL      │  │EXTERNAL      │  │EXTERNAL      │       │
│ │LOCATION      │  │LOCATION      │  │LOCATION      │       │
│ │s3://bucket/  │  │abfss://...   │  │gs://bucket/  │       │
│ └──────────────┘  └──────────────┘  └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Paso 1: Crear Storage Credential

\`\`\`sql
-- Para AWS (usando IAM Role)
CREATE STORAGE CREDENTIAL IF NOT EXISTS aws_s3_credential
WITH (
    arn = 'arn:aws:iam::123456789:role/databricks-unity-catalog-role'
)
COMMENT 'Credencial para acceso a S3';

-- Para Azure (usando Service Principal)
CREATE STORAGE CREDENTIAL IF NOT EXISTS azure_credential
WITH (
    azure_managed_identity_client_id = 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx'
)
COMMENT 'Credencial para Azure ADLS';
\`\`\`

### Paso 2: Crear External Location

\`\`\`sql
-- Crear external location apuntando a un bucket
CREATE EXTERNAL LOCATION IF NOT EXISTS raw_data_location
URL 's3://mi-empresa-datalake/raw/'
WITH (STORAGE CREDENTIAL aws_s3_credential)
COMMENT 'Ubicación de datos raw en S3';

-- Dar acceso a un grupo
GRANT READ FILES ON EXTERNAL LOCATION raw_data_location TO \`data_engineers\`;
GRANT WRITE FILES ON EXTERNAL LOCATION raw_data_location TO \`data_engineers\`;
\`\`\`

### Paso 3: Crear External Table

\`\`\`sql
-- Tabla que apunta a datos externos
CREATE TABLE IF NOT EXISTS dev.bronze.external_events (
    event_id STRING,
    event_type STRING,
    timestamp TIMESTAMP,
    payload STRING
) USING DELTA
LOCATION 's3://mi-empresa-datalake/raw/events/';

-- Unity Catalog valida que tengas acceso a esa location
\`\`\`

### Permisos para External Locations

| Permiso | Permite |
|---------|---------|
| READ FILES | Leer archivos del storage |
| WRITE FILES | Escribir archivos al storage |
| CREATE EXTERNAL TABLE | Crear tablas en esa ubicación |
| ALL PRIVILEGES | Todos los anteriores |

### Verificar Configuración

\`\`\`sql
-- Listar storage credentials
SHOW STORAGE CREDENTIALS;

-- Listar external locations
SHOW EXTERNAL LOCATIONS;

-- Ver detalles
DESCRIBE EXTERNAL LOCATION raw_data_location;
\`\`\``,
        en: `## External Locations: Governed Cloud Storage Access

\`\`\`sql
-- Create storage credential (AWS)
CREATE STORAGE CREDENTIAL aws_cred
WITH (arn = 'arn:aws:iam::123456789:role/my-role');

-- Create external location
CREATE EXTERNAL LOCATION raw_data
URL 's3://bucket/raw/'
WITH (STORAGE CREDENTIAL aws_cred);

-- Grant access
GRANT READ FILES ON EXTERNAL LOCATION raw_data TO \`data_team\`;
\`\`\``,
        pt: `## External Locations: Acesso Governado a Cloud Storage

\`\`\`sql
-- Criar storage credential
CREATE STORAGE CREDENTIAL aws_cred
WITH (arn = 'arn:aws:iam::123456789:role/my-role');

-- Criar external location
CREATE EXTERNAL LOCATION raw_data
URL 's3://bucket/raw/'
WITH (STORAGE CREDENTIAL aws_cred);
\`\`\``
      },
      practicalTips: [
        { es: '🔑 Storage Credential = "cómo autenticar", External Location = "dónde están los datos".', en: '🔑 Storage Credential = "how to authenticate", External Location = "where the data is".', pt: '🔑 Storage Credential = "como autenticar", External Location = "onde estão os dados".' },
        { es: '⚠️ Esto requiere configuración de IAM/Service Principals en tu cloud provider.', en: '⚠️ This requires IAM/Service Principal configuration in your cloud provider.', pt: '⚠️ Isto requer configuração de IAM/Service Principals no seu cloud provider.' }
      ],
      externalLinks: [
        { title: 'External Locations', url: 'https://docs.databricks.com/data-governance/unity-catalog/manage-external-locations-and-credentials.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Entendés la relación entre Storage Credential y External Location?', en: '✅ Do you understand the relationship between Storage Credential and External Location?', pt: '✅ Você entende a relação entre Storage Credential e External Location?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-6-5',
      title: { es: 'Data Lineage Automático', en: 'Automatic Data Lineage', pt: 'Data Lineage Automático' },
      description: { es: 'Unity Catalog captura automáticamente de dónde vienen tus datos y a dónde van.', en: 'Unity Catalog automatically captures where your data comes from and where it goes.', pt: 'Unity Catalog captura automaticamente de onde vêm seus dados e para onde vão.' },
      theory: {
        es: `## Data Lineage: El Mapa de tus Datos

Unity Catalog captura **automáticamente** el linaje de datos cuando ejecutas queries.

### ¿Qué es Data Lineage?

\`\`\`
Data Lineage = "El árbol genealógico de tus datos"

Responde preguntas como:
- ¿De dónde vienen los datos de esta tabla?
- ¿Qué tablas downstream se afectan si cambio esta columna?
- ¿Quién creó esta transformación?
- ¿Cuándo fue la última vez que se actualizó?
\`\`\`

### Visualización del Lineage

\`\`\`
                    UPSTREAM (Fuentes)
                         │
    ┌────────────────────┼────────────────────┐
    │                    │                    │
    ▼                    ▼                    ▼
┌─────────┐        ┌─────────┐        ┌─────────┐
│ bronze. │        │ bronze. │        │ external│
│ orders  │        │customers│        │ api_data│
└────┬────┘        └────┬────┘        └────┬────┘
     │                  │                  │
     └──────────────────┼──────────────────┘
                        │
                        ▼
                 ┌─────────────┐
                 │   silver.   │
                 │ orders_clean│  ◄── TU TABLA
                 └──────┬──────┘
                        │
          ┌─────────────┼─────────────┐
          │             │             │
          ▼             ▼             ▼
    ┌──────────┐  ┌──────────┐  ┌──────────┐
    │  gold.   │  │  gold.   │  │ ML Model │
    │ revenue  │  │ customer │  │predictions│
    │ _by_day  │  │ _360     │  │          │
    └──────────┘  └──────────┘  └──────────┘
    
                    DOWNSTREAM (Dependientes)
\`\`\`

### Cómo se Captura el Lineage

El lineage se captura automáticamente cuando:

1. **Ejecutas queries SQL**
\`\`\`sql
-- Unity Catalog registra que gold.revenue depende de silver.orders
CREATE OR REPLACE TABLE gold.revenue_by_day AS
SELECT 
    order_date,
    SUM(amount) as total_revenue
FROM silver.orders_clean
GROUP BY order_date;
\`\`\`

2. **Usas DataFrame API**
\`\`\`python
# También se captura el lineage
df_orders = spark.table("silver.orders_clean")
df_revenue = df_orders.groupBy("order_date").sum("amount")
df_revenue.write.saveAsTable("gold.revenue_by_day")
\`\`\`

3. **Corres notebooks o jobs**
   - Se registra qué notebook/job creó la transformación

### Ver el Lineage

**En la UI de Databricks:**
1. Ir a **Catalog Explorer**
2. Seleccionar tu tabla
3. Click en tab **"Lineage"**
4. Ver gráfico upstream/downstream

**Programáticamente:**
\`\`\`python
# Usando la API de Unity Catalog
from databricks.sdk import WorkspaceClient

w = WorkspaceClient()
lineage = w.lineage.get_lineage(
    table_name="prod.gold.revenue_by_day",
    direction="BOTH"  # UPSTREAM, DOWNSTREAM, or BOTH
)
\`\`\`

### Casos de Uso del Lineage

1. **Impact Analysis**
   - "Si cambio esta columna, ¿qué dashboards se rompen?"

2. **Root Cause Analysis**
   - "Este reporte tiene datos incorrectos, ¿de dónde vienen?"

3. **Compliance**
   - "¿Dónde se usa el campo email de clientes?"

4. **Documentation**
   - Documentación automática de pipelines`,
        en: `## Data Lineage: The Map of Your Data

Unity Catalog **automatically** captures data lineage when you run queries.

### How Lineage is Captured

\`\`\`sql
-- Unity Catalog records that gold.revenue depends on silver.orders
CREATE TABLE gold.revenue AS SELECT * FROM silver.orders;
\`\`\`

### View Lineage

In Databricks UI: Catalog Explorer → Select table → "Lineage" tab`,
        pt: `## Data Lineage: O Mapa dos Seus Dados

Unity Catalog captura **automaticamente** a linhagem de dados.

\`\`\`sql
CREATE TABLE gold.revenue AS SELECT * FROM silver.orders;
-- UC registra a dependência automaticamente
\`\`\``
      },
      practicalTips: [
        { es: '🔍 El lineage es automático - no necesitas configurar nada, solo usar Unity Catalog.', en: '🔍 Lineage is automatic - no setup needed, just use Unity Catalog.', pt: '🔍 A linhagem é automática - não precisa configurar nada, só usar Unity Catalog.' },
        { es: '💡 Usa el lineage antes de hacer cambios en producción para ver el impacto.', en: '💡 Use lineage before making production changes to see the impact.', pt: '💡 Use a linhagem antes de fazer mudanças em produção para ver o impacto.' }
      ],
      externalLinks: [
        { title: 'Data Lineage', url: 'https://docs.databricks.com/data-governance/unity-catalog/data-lineage.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Exploraste el lineage de una tabla en el Catalog Explorer?', en: '✅ Did you explore the lineage of a table in Catalog Explorer?', pt: '✅ Você explorou a linhagem de uma tabela no Catalog Explorer?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-6-6',
      title: { es: 'Audit Logs y Monitoreo', en: 'Audit Logs and Monitoring', pt: 'Audit Logs e Monitoramento' },
      description: { es: 'Rastrea quién accede a qué datos y cuándo - crítico para compliance.', en: 'Track who accesses what data and when - critical for compliance.', pt: 'Rastreie quem acessa quais dados e quando - crítico para compliance.' },
      theory: {
        es: `## Audit Logs: El Registro de Todo

Unity Catalog registra **cada acción** en audit logs para compliance y seguridad.

### ¿Qué se Registra?

| Evento | Ejemplo |
|--------|---------|
| **Acceso a datos** | SELECT en tabla |
| **Modificaciones** | INSERT, UPDATE, DELETE |
| **Cambios de permisos** | GRANT, REVOKE |
| **Creación/Eliminación** | CREATE TABLE, DROP SCHEMA |
| **Acceso denegado** | Permission denied |

### Ejemplo de Audit Log Entry

\`\`\`json
{
  "timestamp": "2024-01-15T10:30:00Z",
  "action": "SELECT",
  "principal": "analyst@empresa.com",
  "resource": "prod.sales.customers",
  "source_ip": "192.168.1.100",
  "workspace_id": "1234567890",
  "cluster_id": "0115-103000-xyz",
  "success": true,
  "rows_returned": 10000
}
\`\`\`

### Acceder a los Audit Logs

**Método 1: System Tables (Recomendado)**

\`\`\`sql
-- Ver últimos accesos a una tabla específica
SELECT 
    event_time,
    user_identity.email as user,
    action_name,
    request_params.full_name_arg as table_name
FROM system.access.audit
WHERE request_params.full_name_arg = 'prod.sales.customers'
    AND event_time > current_timestamp() - INTERVAL 7 DAYS
ORDER BY event_time DESC;
\`\`\`

**Método 2: Exportar a tu SIEM**

Los logs se pueden exportar a:
- AWS CloudWatch
- Azure Monitor
- Splunk
- Datadog

### Queries Útiles de Auditoría

\`\`\`sql
-- ¿Quién accedió a datos sensibles esta semana?
SELECT 
    user_identity.email,
    COUNT(*) as accesos,
    COUNT(DISTINCT request_params.full_name_arg) as tablas_distintas
FROM system.access.audit
WHERE request_params.full_name_arg LIKE 'prod.hr.%'
    AND event_time > current_timestamp() - INTERVAL 7 DAYS
GROUP BY user_identity.email
ORDER BY accesos DESC;

-- Intentos de acceso denegados
SELECT *
FROM system.access.audit
WHERE response.status_code = 'PERMISSION_DENIED'
    AND event_time > current_timestamp() - INTERVAL 24 HOURS;

-- Cambios de permisos recientes
SELECT 
    event_time,
    user_identity.email,
    action_name,
    request_params
FROM system.access.audit
WHERE action_name IN ('GRANT', 'REVOKE')
    AND event_time > current_timestamp() - INTERVAL 30 DAYS;
\`\`\`

### Alertas de Seguridad

\`\`\`sql
-- Crear alerta para accesos fuera de horario
-- (Integrar con tu sistema de alertas)
SELECT *
FROM system.access.audit
WHERE HOUR(event_time) NOT BETWEEN 8 AND 18  -- Fuera de 8am-6pm
    AND request_params.full_name_arg LIKE 'prod.%'
    AND event_time > current_timestamp() - INTERVAL 1 HOUR;
\`\`\``,
        en: `## Audit Logs: The Record of Everything

\`\`\`sql
-- View recent table accesses
SELECT 
    event_time,
    user_identity.email,
    action_name,
    request_params.full_name_arg as table_name
FROM system.access.audit
WHERE event_time > current_timestamp() - INTERVAL 7 DAYS;
\`\`\``,
        pt: `## Audit Logs: O Registro de Tudo

\`\`\`sql
-- Ver acessos recentes
SELECT 
    event_time,
    user_identity.email,
    action_name
FROM system.access.audit
WHERE event_time > current_timestamp() - INTERVAL 7 DAYS;
\`\`\``
      },
      practicalTips: [
        { es: '🔐 Los audit logs son críticos para compliance (GDPR, HIPAA, SOX). No los ignores.', en: '🔐 Audit logs are critical for compliance (GDPR, HIPAA, SOX). Don\'t ignore them.', pt: '🔐 Audit logs são críticos para compliance (GDPR, HIPAA, SOX). Não os ignore.' },
        { es: '📊 Crea dashboards de auditoría para monitoreo continuo.', en: '📊 Create audit dashboards for continuous monitoring.', pt: '📊 Crie dashboards de auditoria para monitoramento contínuo.' }
      ],
      externalLinks: [
        { title: 'Audit Logs', url: 'https://docs.databricks.com/administration-guide/account-settings/audit-logs.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Consultaste los audit logs para ver quién accedió a una tabla?', en: '✅ Did you query audit logs to see who accessed a table?', pt: '✅ Você consultou os audit logs para ver quem acessou uma tabela?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-6-7',
      title: { es: 'Tags y Data Classification', en: 'Tags and Data Classification', pt: 'Tags e Data Classification' },
      description: { es: 'Clasifica tus datos (PII, confidencial, público) para mejor governance.', en: 'Classify your data (PII, confidential, public) for better governance.', pt: 'Classifique seus dados (PII, confidencial, público) para melhor governance.' },
      theory: {
        es: `## Tags: Clasificación de Datos

Los tags te permiten categorizar y encontrar datos fácilmente.

### Agregar Tags a Tablas

\`\`\`sql
-- Agregar tags a una tabla
ALTER TABLE prod.hr.employees 
SET TAGS ('pii' = 'true', 'sensitivity' = 'high', 'owner' = 'hr_team');

-- Agregar tags a columnas específicas
ALTER TABLE prod.hr.employees 
ALTER COLUMN email SET TAGS ('pii' = 'true');

ALTER TABLE prod.hr.employees 
ALTER COLUMN salary SET TAGS ('sensitivity' = 'confidential');

-- Agregar comentarios descriptivos
COMMENT ON TABLE prod.hr.employees IS 'Tabla maestra de empleados. Contiene PII.';
COMMENT ON COLUMN prod.hr.employees.email IS 'Email corporativo del empleado. PII.';
\`\`\`

### Ver y Buscar por Tags

\`\`\`sql
-- Ver tags de una tabla
DESCRIBE TABLE EXTENDED prod.hr.employees;

-- Buscar tablas con ciertos tags (usando information_schema)
SELECT 
    table_catalog,
    table_schema,
    table_name,
    tag_name,
    tag_value
FROM system.information_schema.table_tags
WHERE tag_name = 'pii' AND tag_value = 'true';

-- Buscar columnas con PII
SELECT 
    table_name,
    column_name,
    tag_name,
    tag_value
FROM system.information_schema.column_tags
WHERE tag_name = 'pii';
\`\`\`

### Quitar Tags

\`\`\`sql
-- Quitar tag específico
ALTER TABLE prod.hr.employees UNSET TAGS ('temp_flag');

-- Quitar tag de columna
ALTER TABLE prod.hr.employees 
ALTER COLUMN phone UNSET TAGS ('pii');
\`\`\`

### Estrategia de Clasificación Recomendada

| Tag | Valores | Uso |
|-----|---------|-----|
| \`sensitivity\` | public, internal, confidential, restricted | Nivel de sensibilidad |
| \`pii\` | true, false | Datos personales identificables |
| \`owner\` | team_name | Equipo responsable |
| \`data_domain\` | sales, hr, finance | Dominio de negocio |
| \`retention\` | 30days, 1year, 7years | Política de retención |

### Ejemplo: Sistema de Clasificación Completo

\`\`\`sql
-- Tabla pública (métricas agregadas)
ALTER TABLE prod.gold.sales_by_region 
SET TAGS (
    'sensitivity' = 'public',
    'pii' = 'false',
    'owner' = 'analytics_team',
    'data_domain' = 'sales'
);

-- Tabla confidencial (datos de clientes)
ALTER TABLE prod.silver.customers 
SET TAGS (
    'sensitivity' = 'confidential',
    'pii' = 'true',
    'owner' = 'customer_success',
    'data_domain' = 'crm',
    'retention' = '7years'
);

-- Columnas sensibles
ALTER TABLE prod.silver.customers 
ALTER COLUMN email SET TAGS ('pii' = 'true', 'gdpr_relevant' = 'true');

ALTER TABLE prod.silver.customers 
ALTER COLUMN phone SET TAGS ('pii' = 'true');

ALTER TABLE prod.silver.customers 
ALTER COLUMN credit_card_hash SET TAGS ('sensitivity' = 'restricted', 'pci' = 'true');
\`\`\``,
        en: `## Tags: Data Classification

\`\`\`sql
-- Add tags to table
ALTER TABLE prod.hr.employees 
SET TAGS ('pii' = 'true', 'sensitivity' = 'high');

-- Add tags to column
ALTER TABLE prod.hr.employees 
ALTER COLUMN email SET TAGS ('pii' = 'true');

-- Search by tags
SELECT * FROM system.information_schema.table_tags
WHERE tag_name = 'pii';
\`\`\``,
        pt: `## Tags: Classificação de Dados

\`\`\`sql
-- Adicionar tags à tabela
ALTER TABLE prod.hr.employees 
SET TAGS ('pii' = 'true', 'sensitivity' = 'high');

-- Adicionar tags à coluna
ALTER TABLE prod.hr.employees 
ALTER COLUMN email SET TAGS ('pii' = 'true');
\`\`\``
      },
      practicalTips: [
        { es: '🏷️ Los tags facilitan encontrar datos sensibles para compliance (GDPR, CCPA).', en: '🏷️ Tags make it easy to find sensitive data for compliance (GDPR, CCPA).', pt: '🏷️ Tags facilitam encontrar dados sensíveis para compliance (GDPR, CCPA).' },
        { es: '📝 Usa comentarios (COMMENT ON) además de tags para documentación más detallada.', en: '📝 Use comments (COMMENT ON) in addition to tags for more detailed documentation.', pt: '📝 Use comentários (COMMENT ON) além de tags para documentação mais detalhada.' }
      ],
      externalLinks: [
        { title: 'Tags', url: 'https://docs.databricks.com/data-governance/unity-catalog/tags.html', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Clasificaste una tabla y sus columnas con tags apropiados?', en: '✅ Did you classify a table and its columns with appropriate tags?', pt: '✅ Você classificou uma tabela e suas colunas com tags apropriadas?' },
      xpReward: 25,
      estimatedMinutes: 25
    },
    {
      id: 'db-6-8',
      title: { es: 'Delta Sharing', en: 'Delta Sharing', pt: 'Delta Sharing' },
      description: { es: 'Comparte datos de forma segura con otras organizaciones o equipos externos.', en: 'Share data securely with other organizations or external teams.', pt: 'Compartilhe dados de forma segura com outras organizações ou equipes externos.' },
      theory: {
        es: `## Delta Sharing: Compartir Datos de Forma Segura

Delta Sharing es un protocolo abierto para compartir datos de forma segura, incluso fuera de Databricks.

### ¿Qué es Delta Sharing?

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    TU ORGANIZACIÓN                           │
│                    (Data Provider)                           │
│                          │                                   │
│    ┌─────────────────────┼─────────────────────┐            │
│    │     Unity Catalog    │                     │            │
│    │          │           │                     │            │
│    │    SHARE "partners"  │                     │            │
│    │    ├── customers     │                     │            │
│    │    └── products      │                     │            │
│    └─────────────────────────────────────────────┘           │
│                          │                                   │
└──────────────────────────┼──────────────────────────────────┘
                           │
                    Delta Sharing Protocol
                           │
┌──────────────────────────┼──────────────────────────────────┐
│                          ▼                                   │
│    ┌─────────────────────────────────────────────┐          │
│    │            RECIPIENT "partner_co"            │          │
│    │                                              │          │
│    │  Puede leer con:                            │          │
│    │  - Databricks                               │          │
│    │  - Spark (cualquier vendor)                 │          │
│    │  - Python (pandas)                          │          │
│    │  - Power BI                                 │          │
│    │  - Tableau                                  │          │
│    └─────────────────────────────────────────────┘          │
│                    OTRA ORGANIZACIÓN                         │
│                    (Data Recipient)                          │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Paso 1: Crear un Share

\`\`\`sql
-- Crear un share (colección de datos para compartir)
CREATE SHARE IF NOT EXISTS partners_share
COMMENT 'Datos compartidos con partners comerciales';

-- Agregar tablas al share
ALTER SHARE partners_share ADD TABLE prod.gold.products;
ALTER SHARE partners_share ADD TABLE prod.gold.product_categories;

-- También puedes compartir schemas completos
ALTER SHARE partners_share ADD SCHEMA prod.gold;
\`\`\`

### Paso 2: Crear Recipients

\`\`\`sql
-- Crear un recipient (quién recibe los datos)
CREATE RECIPIENT IF NOT EXISTS acme_corp
COMMENT 'Acme Corporation - Partner comercial';

-- Ver el activation link (enviar al recipient)
DESCRIBE RECIPIENT acme_corp;
-- Esto genera un link que el recipient usa para conectarse
\`\`\`

### Paso 3: Dar Acceso al Share

\`\`\`sql
-- Dar acceso al recipient
GRANT SELECT ON SHARE partners_share TO RECIPIENT acme_corp;

-- Ver quién tiene acceso
SHOW GRANTS ON SHARE partners_share;
\`\`\`

### Para el Recipient: Consumir los Datos

**En Databricks:**
\`\`\`sql
-- Crear catalog desde el share
CREATE CATALOG IF NOT EXISTS shared_from_partner
USING SHARE provider_workspace.partners_share;

-- Leer datos
SELECT * FROM shared_from_partner.gold.products;
\`\`\`

**En Python (sin Databricks):**
\`\`\`python
import delta_sharing

# Leer con el archivo de credenciales recibido
profile_file = "config.share"
table_url = f"{profile_file}#partners_share.gold.products"

# Leer como pandas DataFrame
df = delta_sharing.load_as_pandas(table_url)
\`\`\`

### Ventajas de Delta Sharing

1. **Sin copia de datos**: El recipient lee directamente de tu storage
2. **Actualización en tiempo real**: Ve los datos más recientes
3. **Control de acceso**: Puedes revocar en cualquier momento
4. **Auditable**: Todo queda registrado
5. **Multi-plataforma**: Funciona con cualquier herramienta`,
        en: `## Delta Sharing: Secure Data Sharing

\`\`\`sql
-- Create share
CREATE SHARE partners_share;

-- Add tables
ALTER SHARE partners_share ADD TABLE prod.gold.products;

-- Create recipient
CREATE RECIPIENT acme_corp;

-- Grant access
GRANT SELECT ON SHARE partners_share TO RECIPIENT acme_corp;
\`\`\``,
        pt: `## Delta Sharing: Compartilhamento Seguro de Dados

\`\`\`sql
-- Criar share
CREATE SHARE partners_share;

-- Adicionar tabelas
ALTER SHARE partners_share ADD TABLE prod.gold.products;

-- Criar recipient
CREATE RECIPIENT acme_corp;
\`\`\``
      },
      practicalTips: [
        { es: '🌐 Delta Sharing es un protocolo ABIERTO - el recipient no necesita Databricks.', en: '🌐 Delta Sharing is an OPEN protocol - the recipient doesn\'t need Databricks.', pt: '🌐 Delta Sharing é um protocolo ABERTO - o recipient não precisa do Databricks.' },
        { es: '🔒 El recipient solo puede LEER, no modificar tus datos originales.', en: '🔒 The recipient can only READ, not modify your original data.', pt: '🔒 O recipient só pode LER, não modificar seus dados originais.' }
      ],
      externalLinks: [
        { title: 'Delta Sharing', url: 'https://docs.databricks.com/data-sharing/index.html', type: 'docs' },
        { title: 'Delta Sharing Protocol', url: 'https://delta.io/sharing/', type: 'docs' }
      ],
      checkpoint: { es: '✅ ¿Entendés cómo crear un Share y dar acceso a un Recipient?', en: '✅ Do you understand how to create a Share and give access to a Recipient?', pt: '✅ Você entende como criar um Share e dar acesso a um Recipient?' },
      xpReward: 30,
      estimatedMinutes: 30
    },
    {
      id: 'db-6-9',
      title: { es: 'Proyecto: Governance Empresarial', en: 'Project: Enterprise Governance', pt: 'Projeto: Governance Empresarial' },
      description: { es: 'Implementa una estrategia de governance completa para una empresa ficticia.', en: 'Implement a complete governance strategy for a fictional company.', pt: 'Implemente uma estratégia de governance completa para uma empresa fictícia.' },
      theory: {
        es: `## Proyecto Final: Governance para "TechCorp LATAM"

Vas a configurar Unity Catalog para una empresa ficticia con múltiples equipos.

### Escenario

TechCorp LATAM tiene:
- 3 equipos: Sales, Marketing, HR
- 3 ambientes: Dev, Staging, Prod
- Datos sensibles en HR (PII)
- Necesitan compartir datos con un partner externo

### Arquitectura a Implementar

\`\`\`
METASTORE: techcorp_latam
│
├── CATALOG: prod
│   ├── SCHEMA: bronze
│   │   ├── sales_raw (SELECT: all_analysts)
│   │   ├── marketing_raw (SELECT: all_analysts)
│   │   └── hr_raw (SELECT: hr_team ONLY)
│   │
│   ├── SCHEMA: silver
│   │   ├── sales_clean (SELECT: all_analysts)
│   │   ├── marketing_clean (SELECT: all_analysts)
│   │   └── hr_clean (SELECT: hr_team ONLY)
│   │
│   └── SCHEMA: gold
│       ├── revenue_metrics (SELECT: all_analysts, executives)
│       ├── campaign_performance (SELECT: marketing_team)
│       └── headcount (SELECT: hr_team, executives)
│
├── CATALOG: staging
│   └── (mirrors prod structure)
│
├── CATALOG: dev
│   └── (mirrors prod structure, all devs have access)
│
└── SHARE: partner_data
    └── gold.revenue_metrics (RECIPIENT: partner_analytics_co)
\`\`\`

### Checklist del Proyecto

- [ ] Crear 3 catalogs (dev, staging, prod)
- [ ] Crear schemas bronze/silver/gold en cada catalog
- [ ] Crear grupos de usuarios (all_analysts, hr_team, marketing_team, executives)
- [ ] Configurar permisos según la tabla de acceso
- [ ] Agregar tags PII a tablas de HR
- [ ] Crear un Share para el partner externo
- [ ] Documentar toda la estructura con comentarios

### Tabla de Permisos

| Grupo | dev.* | staging.* | prod.bronze | prod.silver | prod.gold |
|-------|-------|-----------|-------------|-------------|-----------|
| developers | ALL | SELECT | - | - | - |
| all_analysts | SELECT | SELECT | SELECT (no HR) | SELECT (no HR) | SELECT (no HR) |
| hr_team | - | - | SELECT hr | SELECT hr | SELECT hr |
| marketing_team | - | - | - | - | SELECT marketing |
| executives | - | - | - | SELECT | SELECT |

### Código de Referencia

\`\`\`sql
-- 1. Crear estructura
CREATE CATALOG prod;
CREATE SCHEMA prod.bronze;
CREATE SCHEMA prod.silver;
CREATE SCHEMA prod.gold;

-- 2. Crear tabla de ejemplo con tags
CREATE TABLE prod.bronze.hr_raw (...);
ALTER TABLE prod.bronze.hr_raw SET TAGS ('pii' = 'true', 'sensitivity' = 'restricted');

-- 3. Configurar permisos
GRANT USAGE ON CATALOG prod TO \`all_analysts\`;
GRANT USAGE ON SCHEMA prod.bronze TO \`all_analysts\`;
GRANT SELECT ON TABLE prod.bronze.sales_raw TO \`all_analysts\`;
-- NOTA: No dar acceso a hr_raw a all_analysts

GRANT SELECT ON ALL TABLES IN SCHEMA prod.bronze TO \`hr_team\` 
WHERE table_name LIKE 'hr_%';

-- 4. Crear share para partner
CREATE SHARE partner_data;
ALTER SHARE partner_data ADD TABLE prod.gold.revenue_metrics;
CREATE RECIPIENT partner_analytics_co;
GRANT SELECT ON SHARE partner_data TO RECIPIENT partner_analytics_co;
\`\`\``,
        en: `## Final Project: Enterprise Governance

Implement Unity Catalog for "TechCorp" with:
- 3 environments (dev, staging, prod)
- 3 teams (sales, marketing, HR)
- PII data protection
- External partner sharing`,
        pt: `## Projeto Final: Governance Empresarial

Implemente Unity Catalog para "TechCorp" com:
- 3 ambientes (dev, staging, prod)
- 3 equipes (sales, marketing, HR)
- Proteção de dados PII
- Compartilhamento com partner externo`
      },
      practicalTips: [
        { es: '📝 Documenta todo en un diagrama - es perfecto para tu portfolio.', en: '📝 Document everything in a diagram - perfect for your portfolio.', pt: '📝 Documente tudo em um diagrama - perfeito para seu portfólio.' },
        { es: '🎯 Este tipo de arquitectura de governance es pregunta SEGURA en entrevistas de DE Senior.', en: '🎯 This type of governance architecture is a SURE question in Senior DE interviews.', pt: '🎯 Este tipo de arquitetura de governance é pergunta CERTA em entrevistas de DE Senior.' }
      ],
      externalLinks: [
        { title: 'Unity Catalog Best Practices', url: 'https://docs.databricks.com/data-governance/unity-catalog/best-practices.html', type: 'docs' }
      ],
      checkpoint: { es: '🏆 ¿Implementaste la estructura completa de governance con permisos diferenciados?', en: '🏆 Did you implement the complete governance structure with differentiated permissions?', pt: '🏆 Você implementou a estrutura completa de governance com permissões diferenciadas?' },
      xpReward: 75,
      estimatedMinutes: 90
    }
  ]
};
