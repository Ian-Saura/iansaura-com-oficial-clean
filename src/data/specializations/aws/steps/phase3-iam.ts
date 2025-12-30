/**
 * FASE 3: IAM & SEGURIDAD PARA DATA ENGINEERING
 * 8 pasos para dominar seguridad en AWS
 */

import { AWSStep } from '../types';

export const phase3Steps: AWSStep[] = [
  {
    id: 'aws-3-1',
    stepNumber: 20,
    title: { es: 'Fundamentos de IAM', en: 'IAM Fundamentals', pt: 'Fundamentos do IAM' },
    description: { es: 'Entender el modelo de identidad y acceso de AWS.', en: 'Understand AWS identity and access model.', pt: 'Entender o modelo de identidade e acesso da AWS.' },
    theory: {
      es: `## IAM - Identity and Access Management

### Componentes de IAM
- **Users**: Identidades para personas
- **Groups**: Colecciones de usuarios
- **Roles**: Identidades para servicios/aplicaciones
- **Policies**: Documentos JSON que definen permisos

### Principio de Least Privilege
Solo otorga los permisos mínimos necesarios. Nunca uses \`"Action": "*"\` o \`"Resource": "*"\` en producción.

### Estructura de una Policy
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow|Deny",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::bucket-name/*",
    "Condition": {...}
  }]
}
\`\`\`

### Tipos de Policies
- **AWS Managed**: Mantenidas por AWS
- **Customer Managed**: Creadas por ti
- **Inline**: Embebidas en user/group/role`,
      en: `## IAM - Identity and Access Management

### IAM Components
- **Users**: Identities for people
- **Groups**: Collections of users
- **Roles**: Identities for services/applications
- **Policies**: JSON documents defining permissions

### Principle of Least Privilege
Only grant minimum necessary permissions. Never use \`"Action": "*"\` or \`"Resource": "*"\` in production.

### Policy Structure
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow|Deny",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::bucket-name/*",
    "Condition": {...}
  }]
}
\`\`\`

### Policy Types
- **AWS Managed**: Maintained by AWS
- **Customer Managed**: Created by you
- **Inline**: Embedded in user/group/role`,
      pt: `## IAM - Identity and Access Management

### Componentes do IAM
- **Users**: Identidades para pessoas
- **Groups**: Coleções de usuários
- **Roles**: Identidades para serviços/aplicações
- **Policies**: Documentos JSON que definem permissões

### Princípio de Least Privilege
Conceda apenas as permissões mínimas necessárias. Nunca use \`"Action": "*"\` ou \`"Resource": "*"\` em produção.

### Estrutura de uma Policy
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow|Deny",
    "Action": ["s3:GetObject", "s3:PutObject"],
    "Resource": "arn:aws:s3:::bucket-name/*",
    "Condition": {...}
  }]
}
\`\`\`

### Tipos de Policies
- **AWS Managed**: Mantidas pela AWS
- **Customer Managed**: Criadas por você
- **Inline**: Embarcadas em user/group/role`
    },
    practicalTips: [
      { es: '🔐 Usa grupos para asignar permisos, no usuarios individuales', en: '🔐 Use groups to assign permissions, not individual users', pt: '🔐 Use grupos para atribuir permissões, não usuários individuais' },
      { es: '📋 Usa IAM Policy Simulator para probar policies antes de aplicarlas', en: '📋 Use IAM Policy Simulator to test policies before applying', pt: '📋 Use IAM Policy Simulator para testar policies antes de aplicar' }
    ],
    externalLinks: [
      { title: 'IAM User Guide', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/introduction.html', type: 'aws_docs' },
      { title: 'IAM Policy Simulator', url: 'https://policysim.aws.amazon.com/', type: 'tool' }
    ],
    checkpoint: { es: '✅ ¿Puedes explicar la diferencia entre users, groups, roles y policies?', en: '✅ Can you explain the difference between users, groups, roles and policies?', pt: '✅ Você consegue explicar a diferença entre users, groups, roles e policies?' },
    xpReward: 60,
    estimatedMinutes: 35,
    services: ['IAM']
  },

  {
    id: 'aws-3-2',
    stepNumber: 21,
    title: { es: 'IAM Roles para servicios AWS', en: 'IAM Roles for AWS services', pt: 'IAM Roles para serviços AWS' },
    description: { es: 'Crear roles que permiten a servicios como Glue y Lambda acceder a otros recursos.', en: 'Create roles that allow services like Glue and Lambda to access other resources.', pt: 'Criar roles que permitem a serviços como Glue e Lambda acessar outros recursos.' },
    theory: {
      es: `## IAM Roles - El Corazón de la Seguridad en Data Engineering

### ¿Por qué Roles y no Access Keys?
- Access Keys son estáticas y pueden filtrarse
- Roles proveen credenciales temporales automáticamente
- Rotación automática de credenciales

### Roles comunes en Data Engineering
\`\`\`
GlueServiceRole:
  - Asume: Glue service
  - Permisos: S3, CloudWatch Logs, Glue Catalog

LambdaExecutionRole:
  - Asume: Lambda service
  - Permisos: S3, Glue, CloudWatch

EMRServiceRole:
  - Asume: EMR service
  - Permisos: EC2, S3, Glue Catalog

RedshiftServiceRole:
  - Asume: Redshift service
  - Permisos: S3 (COPY/UNLOAD)
\`\`\`

### Trust Policy (quién puede asumir el rol)
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Service": "glue.amazonaws.com"
    },
    "Action": "sts:AssumeRole"
  }]
}
\`\`\``,
      en: `## IAM Roles - The Heart of Data Engineering Security

### Why Roles and not Access Keys?
- Access Keys are static and can leak
- Roles provide temporary credentials automatically
- Automatic credential rotation

### Common roles in Data Engineering
\`\`\`
GlueServiceRole:
  - Assumes: Glue service
  - Permissions: S3, CloudWatch Logs, Glue Catalog

LambdaExecutionRole:
  - Assumes: Lambda service
  - Permissions: S3, Glue, CloudWatch

EMRServiceRole:
  - Assumes: EMR service
  - Permissions: EC2, S3, Glue Catalog

RedshiftServiceRole:
  - Assumes: Redshift service
  - Permissions: S3 (COPY/UNLOAD)
\`\`\`

### Trust Policy (who can assume the role)
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Service": "glue.amazonaws.com"
    },
    "Action": "sts:AssumeRole"
  }]
}
\`\`\``,
      pt: `## IAM Roles - O Coração da Segurança em Data Engineering

### Por que Roles e não Access Keys?
- Access Keys são estáticas e podem vazar
- Roles fornecem credenciais temporárias automaticamente
- Rotação automática de credenciais

### Roles comuns em Data Engineering
\`\`\`
GlueServiceRole:
  - Assume: Serviço Glue
  - Permissões: S3, CloudWatch Logs, Glue Catalog

LambdaExecutionRole:
  - Assume: Serviço Lambda
  - Permissões: S3, Glue, CloudWatch

EMRServiceRole:
  - Assume: Serviço EMR
  - Permissões: EC2, S3, Glue Catalog

RedshiftServiceRole:
  - Assume: Serviço Redshift
  - Permissões: S3 (COPY/UNLOAD)
\`\`\`

### Trust Policy (quem pode assumir o role)
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "Service": "glue.amazonaws.com"
    },
    "Action": "sts:AssumeRole"
  }]
}
\`\`\``
    },
    practicalTips: [
      { es: '🎯 Crea roles específicos por servicio, no un rol "god mode"', en: '🎯 Create specific roles per service, not a "god mode" role', pt: '🎯 Crie roles específicos por serviço, não um role "god mode"' }
    ],
    externalLinks: [
      { title: 'IAM Roles for Services', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_create_for-service.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un rol para Glue con permisos a S3?', en: '✅ Did you create a role for Glue with S3 permissions?', pt: '✅ Você criou um role para Glue com permissões ao S3?' },
    xpReward: 65,
    estimatedMinutes: 40,
    services: ['IAM']
  },

  {
    id: 'aws-3-3',
    stepNumber: 22,
    title: { es: 'Escribir IAM Policies efectivas', en: 'Write effective IAM Policies', pt: 'Escrever IAM Policies efetivas' },
    description: { es: 'Crear policies siguiendo least privilege con conditions y resource-level permissions.', en: 'Create policies following least privilege with conditions and resource-level permissions.', pt: 'Criar policies seguindo least privilege com conditions e resource-level permissions.' },
    theory: {
      es: `## Escribir IAM Policies Efectivas

### Estructura detallada
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowS3ReadOnDataLake",
    "Effect": "Allow",
    "Action": [
      "s3:GetObject",
      "s3:ListBucket"
    ],
    "Resource": [
      "arn:aws:s3:::company-datalake-prod",
      "arn:aws:s3:::company-datalake-prod/*"
    ],
    "Condition": {
      "StringEquals": {
        "s3:prefix": ["processed/", "serving/"]
      }
    }
  }]
}
\`\`\`

### Conditions útiles
- \`StringEquals\`: Coincidencia exacta
- \`StringLike\`: Con wildcards
- \`IpAddress\`: Restringir por IP
- \`DateLessThan\`: Permisos temporales

### Patterns comunes
**Data Analyst - Solo lectura processed/serving:**
\`\`\`json
"Action": ["s3:GetObject", "athena:StartQueryExecution"],
"Resource": ["arn:aws:s3:::dl-prod/processed/*", "arn:aws:s3:::dl-prod/serving/*"]
\`\`\`

**Data Engineer - Full access a todo el Data Lake:**
\`\`\`json
"Action": ["s3:*", "glue:*", "athena:*"],
"Resource": "*",
"Condition": {"StringEquals": {"aws:RequestedRegion": "us-east-1"}}
\`\`\``,
      en: `## Writing Effective IAM Policies

### Detailed structure
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowS3ReadOnDataLake",
    "Effect": "Allow",
    "Action": [
      "s3:GetObject",
      "s3:ListBucket"
    ],
    "Resource": [
      "arn:aws:s3:::company-datalake-prod",
      "arn:aws:s3:::company-datalake-prod/*"
    ],
    "Condition": {
      "StringEquals": {
        "s3:prefix": ["processed/", "serving/"]
      }
    }
  }]
}
\`\`\`

### Useful Conditions
- \`StringEquals\`: Exact match
- \`StringLike\`: With wildcards
- \`IpAddress\`: Restrict by IP
- \`DateLessThan\`: Temporary permissions

### Common patterns
**Data Analyst - Read-only processed/serving:**
\`\`\`json
"Action": ["s3:GetObject", "athena:StartQueryExecution"],
"Resource": ["arn:aws:s3:::dl-prod/processed/*", "arn:aws:s3:::dl-prod/serving/*"]
\`\`\`

**Data Engineer - Full access to entire Data Lake:**
\`\`\`json
"Action": ["s3:*", "glue:*", "athena:*"],
"Resource": "*",
"Condition": {"StringEquals": {"aws:RequestedRegion": "us-east-1"}}
\`\`\``,
      pt: `## Escrevendo IAM Policies Efetivas

### Estrutura detalhada
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Sid": "AllowS3ReadOnDataLake",
    "Effect": "Allow",
    "Action": [
      "s3:GetObject",
      "s3:ListBucket"
    ],
    "Resource": [
      "arn:aws:s3:::company-datalake-prod",
      "arn:aws:s3:::company-datalake-prod/*"
    ],
    "Condition": {
      "StringEquals": {
        "s3:prefix": ["processed/", "serving/"]
      }
    }
  }]
}
\`\`\`

### Conditions úteis
- \`StringEquals\`: Correspondência exata
- \`StringLike\`: Com wildcards
- \`IpAddress\`: Restringir por IP
- \`DateLessThan\`: Permissões temporárias

### Patterns comuns
**Data Analyst - Somente leitura processed/serving:**
\`\`\`json
"Action": ["s3:GetObject", "athena:StartQueryExecution"],
"Resource": ["arn:aws:s3:::dl-prod/processed/*", "arn:aws:s3:::dl-prod/serving/*"]
\`\`\`

**Data Engineer - Acesso total a todo o Data Lake:**
\`\`\`json
"Action": ["s3:*", "glue:*", "athena:*"],
"Resource": "*",
"Condition": {"StringEquals": {"aws:RequestedRegion": "us-east-1"}}
\`\`\``
    },
    practicalTips: [
      { es: '🔍 Usa IAM Access Analyzer para identificar permisos no utilizados', en: '🔍 Use IAM Access Analyzer to identify unused permissions', pt: '🔍 Use IAM Access Analyzer para identificar permissões não utilizadas' }
    ],
    externalLinks: [
      { title: 'IAM Policy Reference', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/reference_policies.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Escribiste una policy con conditions y resources específicos?', en: '✅ Did you write a policy with conditions and specific resources?', pt: '✅ Você escreveu uma policy com conditions e resources específicos?' },
    xpReward: 70,
    estimatedMinutes: 45,
    services: ['IAM']
  },

  {
    id: 'aws-3-4',
    stepNumber: 23,
    title: { es: 'AWS KMS para encriptación', en: 'AWS KMS for encryption', pt: 'AWS KMS para encriptação' },
    description: { es: 'Gestionar keys de encriptación para proteger datos sensibles.', en: 'Manage encryption keys to protect sensitive data.', pt: 'Gerenciar keys de encriptação para proteger dados sensíveis.' },
    theory: {
      es: `## AWS KMS - Key Management Service

### Tipos de Keys
- **AWS Managed Keys**: AWS las crea y gestiona automáticamente
- **Customer Managed Keys (CMK)**: Tú las creas y controlas
- **AWS Owned Keys**: Usadas internamente por AWS

### Cuándo usar KMS vs S3 Default Encryption
| Caso | Solución |
|------|----------|
| Datos no sensibles | SSE-S3 (default) |
| Datos sensibles, audit trail | SSE-KMS con CMK |
| Compliance estricto | SSE-KMS + key rotation |

### Key Policy ejemplo
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::123456789012:role/GlueRole"},
    "Action": ["kms:Decrypt", "kms:GenerateDataKey"],
    "Resource": "*"
  }]
}
\`\`\`

### Costos KMS
- CMK: $1/mes por key
- API calls: $0.03 por 10,000 requests
- Puede sumar rápido en pipelines de alto volumen`,
      en: `## AWS KMS - Key Management Service

### Key Types
- **AWS Managed Keys**: AWS creates and manages automatically
- **Customer Managed Keys (CMK)**: You create and control them
- **AWS Owned Keys**: Used internally by AWS

### When to use KMS vs S3 Default Encryption
| Case | Solution |
|------|----------|
| Non-sensitive data | SSE-S3 (default) |
| Sensitive data, audit trail | SSE-KMS with CMK |
| Strict compliance | SSE-KMS + key rotation |

### Key Policy example
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::123456789012:role/GlueRole"},
    "Action": ["kms:Decrypt", "kms:GenerateDataKey"],
    "Resource": "*"
  }]
}
\`\`\`

### KMS Costs
- CMK: $1/month per key
- API calls: $0.03 per 10,000 requests
- Can add up fast in high-volume pipelines`,
      pt: `## AWS KMS - Key Management Service

### Tipos de Keys
- **AWS Managed Keys**: AWS cria e gerencia automaticamente
- **Customer Managed Keys (CMK)**: Você cria e controla
- **AWS Owned Keys**: Usadas internamente pela AWS

### Quando usar KMS vs S3 Default Encryption
| Caso | Solução |
|------|----------|
| Dados não sensíveis | SSE-S3 (default) |
| Dados sensíveis, audit trail | SSE-KMS com CMK |
| Compliance estrito | SSE-KMS + key rotation |

### Key Policy exemplo
\`\`\`json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::123456789012:role/GlueRole"},
    "Action": ["kms:Decrypt", "kms:GenerateDataKey"],
    "Resource": "*"
  }]
}
\`\`\`

### Custos KMS
- CMK: $1/mês por key
- API calls: $0.03 por 10,000 requests
- Pode somar rápido em pipelines de alto volume`
    },
    practicalTips: [
      { es: '🔑 Usa una CMK por ambiente (dev/staging/prod) para mejor aislamiento', en: '🔑 Use one CMK per environment (dev/staging/prod) for better isolation', pt: '🔑 Use uma CMK por ambiente (dev/staging/prod) para melhor isolamento' }
    ],
    externalLinks: [
      { title: 'AWS KMS Developer Guide', url: 'https://docs.aws.amazon.com/kms/latest/developerguide/overview.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste una CMK y la usaste para encriptar un bucket S3?', en: '✅ Did you create a CMK and use it to encrypt an S3 bucket?', pt: '✅ Você criou uma CMK e usou para encriptar um bucket S3?' },
    xpReward: 55,
    estimatedMinutes: 35,
    services: ['KMS', 'S3']
  },

  {
    id: 'aws-3-5',
    stepNumber: 24,
    title: { es: 'AWS Lake Formation para governance', en: 'AWS Lake Formation for governance', pt: 'AWS Lake Formation para governança' },
    description: { es: 'Implementar control de acceso granular a nivel de tabla y columna en tu Data Lake.', en: 'Implement granular access control at table and column level in your Data Lake.', pt: 'Implementar controle de acesso granular em nível de tabela e coluna no seu Data Lake.' },
    theory: {
      es: `## AWS Lake Formation - Governance para Data Lakes

### ¿Qué problema resuelve?
Sin Lake Formation, necesitas gestionar permisos en:
- S3 (bucket policies)
- Glue Catalog (resource policies)
- IAM (policies por usuario/rol)
- Athena (workgroups)

Con Lake Formation, todo en un solo lugar.

### Permisos granulares
- **Database level**: Acceso a toda la base de datos
- **Table level**: Acceso a tablas específicas
- **Column level**: Acceso a columnas específicas (ocultar PII)
- **Row level**: Filtrar filas por condición

### Ejemplo: Ocultar datos sensibles
\`\`\`
Data Analysts pueden ver:
- customers.id ✓
- customers.name ✓
- customers.email ✗ (PII - oculto)
- customers.ssn ✗ (PII - oculto)
\`\`\`

### Registro de Data Lake
1. Registra buckets S3 en Lake Formation
2. Crea bases de datos y tablas
3. Define permisos por principal
4. Lake Formation aplica automáticamente`,
      en: `## AWS Lake Formation - Governance for Data Lakes

### What problem does it solve?
Without Lake Formation, you need to manage permissions in:
- S3 (bucket policies)
- Glue Catalog (resource policies)
- IAM (policies per user/role)
- Athena (workgroups)

With Lake Formation, everything in one place.

### Granular permissions
- **Database level**: Access to entire database
- **Table level**: Access to specific tables
- **Column level**: Access to specific columns (hide PII)
- **Row level**: Filter rows by condition

### Example: Hide sensitive data
\`\`\`
Data Analysts can see:
- customers.id ✓
- customers.name ✓
- customers.email ✗ (PII - hidden)
- customers.ssn ✗ (PII - hidden)
\`\`\`

### Data Lake Registration
1. Register S3 buckets in Lake Formation
2. Create databases and tables
3. Define permissions by principal
4. Lake Formation applies automatically`,
      pt: `## AWS Lake Formation - Governança para Data Lakes

### Que problema resolve?
Sem Lake Formation, você precisa gerenciar permissões em:
- S3 (bucket policies)
- Glue Catalog (resource policies)
- IAM (policies por usuário/role)
- Athena (workgroups)

Com Lake Formation, tudo em um só lugar.

### Permissões granulares
- **Database level**: Acesso a toda a base de dados
- **Table level**: Acesso a tabelas específicas
- **Column level**: Acesso a colunas específicas (ocultar PII)
- **Row level**: Filtrar linhas por condição

### Exemplo: Ocultar dados sensíveis
\`\`\`
Data Analysts podem ver:
- customers.id ✓
- customers.name ✓
- customers.email ✗ (PII - oculto)
- customers.ssn ✗ (PII - oculto)
\`\`\`

### Registro de Data Lake
1. Registre buckets S3 no Lake Formation
2. Crie bases de dados e tabelas
3. Defina permissões por principal
4. Lake Formation aplica automaticamente`
    },
    practicalTips: [
      { es: '🏛️ Lake Formation es el estándar para empresas grandes - apréndelo aunque sea más complejo', en: '🏛️ Lake Formation is the standard for large companies - learn it even if it\'s more complex', pt: '🏛️ Lake Formation é o padrão para empresas grandes - aprenda mesmo sendo mais complexo' }
    ],
    externalLinks: [
      { title: 'AWS Lake Formation', url: 'https://docs.aws.amazon.com/lake-formation/latest/dg/what-is-lake-formation.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Registraste un bucket en Lake Formation y configuraste permisos de tabla?', en: '✅ Did you register a bucket in Lake Formation and configure table permissions?', pt: '✅ Você registrou um bucket no Lake Formation e configurou permissões de tabela?' },
    xpReward: 70,
    estimatedMinutes: 50,
    services: ['Lake Formation', 'Glue Data Catalog']
  },

  {
    id: 'aws-3-6',
    stepNumber: 25,
    title: { es: 'Cross-account access patterns', en: 'Cross-account access patterns', pt: 'Padrões de cross-account access' },
    description: { es: 'Configurar acceso seguro entre cuentas AWS para arquitecturas multi-account.', en: 'Configure secure access between AWS accounts for multi-account architectures.', pt: 'Configurar acesso seguro entre contas AWS para arquiteturas multi-account.' },
    theory: {
      es: `## Cross-Account Access

### ¿Por qué múltiples cuentas?
- Aislamiento de ambientes (dev/staging/prod)
- Separación de equipos
- Límites de facturación
- Blast radius reducido

### Patrón: AssumeRole
\`\`\`
Cuenta A (Data Lake)         Cuenta B (Analytics)
    ↓                              ↓
  Role "DataLakeAccess"       User/Role que asume
    ↓                              ↓
  Trust Policy ←───────────── AssumeRole request
\`\`\`

### Trust Policy en cuenta A
\`\`\`json
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::ACCOUNT_B_ID:root"
    },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": {
        "sts:ExternalId": "unique-secret-id"
      }
    }
  }]
}
\`\`\`

### Resource-based policies para S3
\`\`\`json
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::ACCOUNT_B_ID:role/AnalyticsRole"},
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::data-lake-bucket/*"
  }]
}
\`\`\``,
      en: `## Cross-Account Access

### Why multiple accounts?
- Environment isolation (dev/staging/prod)
- Team separation
- Billing limits
- Reduced blast radius

### Pattern: AssumeRole
\`\`\`
Account A (Data Lake)         Account B (Analytics)
    ↓                              ↓
  Role "DataLakeAccess"       User/Role that assumes
    ↓                              ↓
  Trust Policy ←───────────── AssumeRole request
\`\`\`

### Trust Policy in account A
\`\`\`json
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::ACCOUNT_B_ID:root"
    },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": {
        "sts:ExternalId": "unique-secret-id"
      }
    }
  }]
}
\`\`\`

### Resource-based policies for S3
\`\`\`json
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::ACCOUNT_B_ID:role/AnalyticsRole"},
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::data-lake-bucket/*"
  }]
}
\`\`\``,
      pt: `## Cross-Account Access

### Por que múltiplas contas?
- Isolamento de ambientes (dev/staging/prod)
- Separação de equipes
- Limites de faturamento
- Blast radius reduzido

### Padrão: AssumeRole
\`\`\`
Conta A (Data Lake)         Conta B (Analytics)
    ↓                              ↓
  Role "DataLakeAccess"       User/Role que assume
    ↓                              ↓
  Trust Policy ←───────────── AssumeRole request
\`\`\`

### Trust Policy na conta A
\`\`\`json
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": {
      "AWS": "arn:aws:iam::ACCOUNT_B_ID:root"
    },
    "Action": "sts:AssumeRole",
    "Condition": {
      "StringEquals": {
        "sts:ExternalId": "unique-secret-id"
      }
    }
  }]
}
\`\`\`

### Resource-based policies para S3
\`\`\`json
{
  "Statement": [{
    "Effect": "Allow",
    "Principal": {"AWS": "arn:aws:iam::ACCOUNT_B_ID:role/AnalyticsRole"},
    "Action": ["s3:GetObject"],
    "Resource": "arn:aws:s3:::data-lake-bucket/*"
  }]
}
\`\`\``
    },
    practicalTips: [
      { es: '🔐 Siempre usa ExternalId en trust policies para prevenir "confused deputy" attacks', en: '🔐 Always use ExternalId in trust policies to prevent "confused deputy" attacks', pt: '🔐 Sempre use ExternalId em trust policies para prevenir ataques "confused deputy"' }
    ],
    externalLinks: [
      { title: 'Cross-Account Access', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Entiendes cómo funciona AssumeRole entre cuentas?', en: '✅ Do you understand how AssumeRole works between accounts?', pt: '✅ Você entende como funciona AssumeRole entre contas?' },
    xpReward: 60,
    estimatedMinutes: 40,
    services: ['IAM', 'STS']
  },

  {
    id: 'aws-3-7',
    stepNumber: 26,
    title: { es: 'Secrets Manager y Parameter Store', en: 'Secrets Manager and Parameter Store', pt: 'Secrets Manager e Parameter Store' },
    description: { es: 'Gestionar credenciales y configuración de forma segura.', en: 'Manage credentials and configuration securely.', pt: 'Gerenciar credenciais e configuração de forma segura.' },
    theory: {
      es: `## Gestión de Secrets en AWS

### Secrets Manager vs Parameter Store
| Feature | Secrets Manager | Parameter Store |
|---------|-----------------|-----------------|
| Rotación automática | ✅ Built-in | ❌ Manual |
| Costo | $0.40/secret/mes | Gratis (Standard) |
| Tamaño máximo | 64KB | 8KB (Standard) |
| Cross-account | ✅ | ✅ |

### Cuándo usar cuál
- **Secrets Manager**: DB passwords, API keys, cualquier cosa que necesite rotación
- **Parameter Store**: Configuración, feature flags, URLs de endpoints

### Ejemplo: Conexión a database
\`\`\`python
import boto3
import json

def get_db_credentials():
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId='prod/database/credentials')
    secret = json.loads(response['SecretString'])
    return secret['username'], secret['password']
\`\`\`

### Rotación automática
Secrets Manager puede rotar automáticamente credenciales de:
- RDS (MySQL, PostgreSQL, etc.)
- Redshift
- DocumentDB
- Custom (Lambda function)`,
      en: `## Secrets Management in AWS

### Secrets Manager vs Parameter Store
| Feature | Secrets Manager | Parameter Store |
|---------|-----------------|-----------------|
| Automatic rotation | ✅ Built-in | ❌ Manual |
| Cost | $0.40/secret/month | Free (Standard) |
| Maximum size | 64KB | 8KB (Standard) |
| Cross-account | ✅ | ✅ |

### When to use which
- **Secrets Manager**: DB passwords, API keys, anything that needs rotation
- **Parameter Store**: Configuration, feature flags, endpoint URLs

### Example: Database connection
\`\`\`python
import boto3
import json

def get_db_credentials():
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId='prod/database/credentials')
    secret = json.loads(response['SecretString'])
    return secret['username'], secret['password']
\`\`\`

### Automatic rotation
Secrets Manager can automatically rotate credentials for:
- RDS (MySQL, PostgreSQL, etc.)
- Redshift
- DocumentDB
- Custom (Lambda function)`,
      pt: `## Gestão de Secrets na AWS

### Secrets Manager vs Parameter Store
| Feature | Secrets Manager | Parameter Store |
|---------|-----------------|-----------------|
| Rotação automática | ✅ Built-in | ❌ Manual |
| Custo | $0.40/secret/mês | Grátis (Standard) |
| Tamanho máximo | 64KB | 8KB (Standard) |
| Cross-account | ✅ | ✅ |

### Quando usar qual
- **Secrets Manager**: Senhas de DB, API keys, qualquer coisa que precisa de rotação
- **Parameter Store**: Configuração, feature flags, URLs de endpoints

### Exemplo: Conexão com database
\`\`\`python
import boto3
import json

def get_db_credentials():
    client = boto3.client('secretsmanager')
    response = client.get_secret_value(SecretId='prod/database/credentials')
    secret = json.loads(response['SecretString'])
    return secret['username'], secret['password']
\`\`\`

### Rotação automática
Secrets Manager pode rotacionar automaticamente credenciais de:
- RDS (MySQL, PostgreSQL, etc.)
- Redshift
- DocumentDB
- Custom (Lambda function)`
    },
    practicalTips: [
      { es: '🔒 NUNCA hardcodees credenciales - siempre usa Secrets Manager o Parameter Store', en: '🔒 NEVER hardcode credentials - always use Secrets Manager or Parameter Store', pt: '🔒 NUNCA faça hardcode de credenciais - sempre use Secrets Manager ou Parameter Store' }
    ],
    externalLinks: [
      { title: 'Secrets Manager', url: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html', type: 'aws_docs' },
      { title: 'Parameter Store', url: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Creaste un secret y lo accediste desde código Python?', en: '✅ Did you create a secret and access it from Python code?', pt: '✅ Você criou um secret e acessou a partir de código Python?' },
    xpReward: 50,
    estimatedMinutes: 30,
    services: ['Secrets Manager', 'Systems Manager']
  },

  {
    id: 'aws-3-8',
    stepNumber: 27,
    title: { es: 'CloudTrail para auditoría', en: 'CloudTrail for auditing', pt: 'CloudTrail para auditoria' },
    description: { es: 'Configurar logging de todas las acciones API para compliance y troubleshooting.', en: 'Configure logging of all API actions for compliance and troubleshooting.', pt: 'Configurar logging de todas as ações API para compliance e troubleshooting.' },
    theory: {
      es: `## AWS CloudTrail - Auditoría de Acciones

### ¿Qué registra CloudTrail?
Cada llamada API a AWS:
- Quién hizo la acción
- Qué acción fue
- Cuándo ocurrió
- Desde qué IP
- Éxito o fallo

### Tipos de eventos
- **Management Events**: Operaciones de control (crear bucket, modificar policy)
- **Data Events**: Operaciones de datos (GetObject, PutObject en S3)
- **Insights Events**: Detección de actividad anormal

### Configuración recomendada
\`\`\`
Trail: organization-trail
  - Multi-region: Yes
  - Log all management events
  - Log data events for critical buckets
  - Send to CloudWatch Logs
  - Encrypt with KMS
\`\`\`

### Queries con Athena
CloudTrail puede enviar logs a S3 y puedes consultarlos con Athena:
\`\`\`sql
SELECT eventTime, userIdentity.userName, eventName, sourceIPAddress
FROM cloudtrail_logs
WHERE eventName LIKE 'Delete%'
  AND eventTime > '2024-01-01'
ORDER BY eventTime DESC;
\`\`\``,
      en: `## AWS CloudTrail - Action Auditing

### What does CloudTrail record?
Every API call to AWS:
- Who performed the action
- What action was it
- When it occurred
- From which IP
- Success or failure

### Event types
- **Management Events**: Control operations (create bucket, modify policy)
- **Data Events**: Data operations (GetObject, PutObject in S3)
- **Insights Events**: Abnormal activity detection

### Recommended configuration
\`\`\`
Trail: organization-trail
  - Multi-region: Yes
  - Log all management events
  - Log data events for critical buckets
  - Send to CloudWatch Logs
  - Encrypt with KMS
\`\`\`

### Queries with Athena
CloudTrail can send logs to S3 and you can query them with Athena:
\`\`\`sql
SELECT eventTime, userIdentity.userName, eventName, sourceIPAddress
FROM cloudtrail_logs
WHERE eventName LIKE 'Delete%'
  AND eventTime > '2024-01-01'
ORDER BY eventTime DESC;
\`\`\``,
      pt: `## AWS CloudTrail - Auditoria de Ações

### O que o CloudTrail registra?
Cada chamada de API à AWS:
- Quem fez a ação
- Qual ação foi
- Quando ocorreu
- De qual IP
- Sucesso ou falha

### Tipos de eventos
- **Management Events**: Operações de controle (criar bucket, modificar policy)
- **Data Events**: Operações de dados (GetObject, PutObject no S3)
- **Insights Events**: Detecção de atividade anormal

### Configuração recomendada
\`\`\`
Trail: organization-trail
  - Multi-region: Yes
  - Log all management events
  - Log data events for critical buckets
  - Send to CloudWatch Logs
  - Encrypt with KMS
\`\`\`

### Queries com Athena
CloudTrail pode enviar logs para S3 e você pode consultá-los com Athena:
\`\`\`sql
SELECT eventTime, userIdentity.userName, eventName, sourceIPAddress
FROM cloudtrail_logs
WHERE eventName LIKE 'Delete%'
  AND eventTime > '2024-01-01'
ORDER BY eventTime DESC;
\`\`\``
    },
    practicalTips: [
      { es: '📊 Crea alertas en CloudWatch para eventos críticos como DeleteBucket o StopLogging', en: '📊 Create CloudWatch alerts for critical events like DeleteBucket or StopLogging', pt: '📊 Crie alertas no CloudWatch para eventos críticos como DeleteBucket ou StopLogging' }
    ],
    externalLinks: [
      { title: 'CloudTrail User Guide', url: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-user-guide.html', type: 'aws_docs' }
    ],
    checkpoint: { es: '✅ ¿Configuraste un trail y consultaste los eventos con Event History?', en: '✅ Did you configure a trail and query events with Event History?', pt: '✅ Você configurou um trail e consultou os eventos com Event History?' },
    interviewTips: [{ es: 'CloudTrail es pregunta frecuente: "¿Cómo auditas acceso a datos sensibles?"', en: 'CloudTrail is a frequent question: "How do you audit access to sensitive data?"', pt: 'CloudTrail é pergunta frequente: "Como você audita acesso a dados sensíveis?"' }],
    xpReward: 55,
    estimatedMinutes: 35,
    services: ['CloudTrail', 'CloudWatch']
  }
];








