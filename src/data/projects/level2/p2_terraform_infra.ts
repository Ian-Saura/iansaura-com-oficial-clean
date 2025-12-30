import { Project } from '../../../types/members';

export const p2_terraform_infra: Project = {
  id: 'p2-terraform-infra',
  level: 2,
  title: { es: 'Infraestructura con Terraform', en: 'Infrastructure with Terraform', pt: 'Infraestrutura com Terraform' },
  description: {
    es: 'Creá infraestructura de datos en AWS con código. Infrastructure as Code es fundamental para SSR.',
    en: 'Create data infrastructure on AWS with code. Infrastructure as Code is fundamental for SSR.',
    pt: 'Crie infraestrutura de dados na AWS com código. Infrastructure as Code é fundamental para SSR.'
  },
  difficulty: 'Avanzado',
  duration: '5-6 horas',
  skills: [{ es: 'Terraform' }, { es: 'AWS' }, { es: 'IaC' }, { es: 'DevOps' }],
  icon: '🏗️',
  color: 'purple',
  prerequisites: ['p5-aws-pipeline'],
  estimatedLines: 150,
  realWorldExample: {
    es: 'Así gestiona HashiCorp (creadores de Terraform) su propia infraestructura',
    en: 'This is how HashiCorp (creators of Terraform) manages its own infrastructure',
    pt: 'Assim a HashiCorp (criadores do Terraform) gerencia sua própria infraestrutura'
  },
  usedBy: ['HashiCorp', 'Cloudflare', 'Databricks', 'Twitch'],
  learningObjectives: [
    { es: 'Escribir código Terraform', en: 'Write Terraform code', pt: 'Escrever código Terraform' },
    { es: 'Crear recursos AWS (S3, Glue, IAM)', en: 'Create AWS resources (S3, Glue, IAM)', pt: 'Criar recursos AWS (S3, Glue, IAM)' },
    { es: 'Usar variables y outputs', en: 'Use variables and outputs', pt: 'Usar variáveis e outputs' },
    { es: 'Manejar estado (state)', en: 'Manage state', pt: 'Gerenciar estado (state)' },
    { es: 'Aplicar y destruir infraestructura', en: 'Apply and destroy infrastructure', pt: 'Aplicar e destruir infraestrutura' },
  ],
  expectedOutputs: [
    {
      step: 5,
      description: { es: 'terraform apply exitoso', en: 'Successful terraform apply', pt: 'terraform apply com sucesso' },
      example: `Plan: 3 to add, 0 to change, 0 to destroy.

aws_s3_bucket.datalake: Creating...
aws_s3_bucket.datalake: Created [id=my-datalake-123]
aws_iam_role.glue: Creating...
aws_iam_role.glue: Created [id=glue-role]

Apply complete! Resources: 3 added

Outputs:
bucket_name = "my-datalake-123"
glue_role_arn = "arn:aws:iam::..."`
    },
  ],
  interviewStory: {
    hook: { es: "Migré nuestra infraestructura de 'clicks en la consola' a Terraform, y ahora recreamos todo el ambiente de producción en 15 minutos.", en: "Migrated our infrastructure from 'console clicks' to Terraform, and now we recreate the entire production environment in 15 minutes.", pt: "Migrei nossa infraestrutura de 'cliques no console' para Terraform, e agora recriamos todo o ambiente de produção em 15 minutos." },
    situation: { es: "La infraestructura se creaba manualmente en la consola de AWS. Nadie sabía exactamente qué recursos existían, y recrear el ambiente era imposible.", en: "Infrastructure was created manually in AWS console. No one knew exactly what resources existed, and recreating the environment was impossible.", pt: "A infraestrutura era criada manualmente no console da AWS. Ninguém sabia exatamente quais recursos existiam, e recriar o ambiente era impossível." },
    task: { es: "Implementar Infrastructure as Code con Terraform para que toda la infra esté versionada y sea reproducible.", en: "Implement Infrastructure as Code with Terraform so all infra is versioned and reproducible.", pt: "Implementar Infrastructure as Code com Terraform para que toda a infra esteja versionada e seja reproduzível." },
    actions: [
      { es: "Importé recursos existentes a Terraform state", en: "Imported existing resources to Terraform state", pt: "Importei recursos existentes para o Terraform state" },
      { es: "Escribí módulos reutilizables para S3, Glue, IAM", en: "Wrote reusable modules for S3, Glue, IAM", pt: "Escrevi módulos reutilizáveis para S3, Glue, IAM" },
      { es: "Configuré remote state en S3 con locking en DynamoDB", en: "Configured remote state in S3 with DynamoDB locking", pt: "Configurei remote state no S3 com locking no DynamoDB" },
      { es: "Implementé workspaces para dev/staging/prod", en: "Implemented workspaces for dev/staging/prod", pt: "Implementei workspaces para dev/staging/prod" },
      { es: "Integré terraform plan en PRs para review de cambios", en: "Integrated terraform plan in PRs for change review", pt: "Integrei terraform plan em PRs para review de mudanças" }
    ],
    results: [
      { es: "Tiempo para recrear ambiente: de 'imposible' a 15 minutos", en: "Time to recreate environment: from 'impossible' to 15 minutes", pt: "Tempo para recriar ambiente: de 'impossível' para 15 minutos" },
      { es: "Todos los cambios de infra pasan por code review", en: "All infra changes go through code review", pt: "Todas as mudanças de infra passam por code review" },
      { es: "Disaster recovery: terraform apply y listo", en: "Disaster recovery: terraform apply and done", pt: "Disaster recovery: terraform apply e pronto" },
      { es: "Costo reducido 30% al identificar recursos huérfanos", en: "Cost reduced 30% by identifying orphaned resources", pt: "Custo reduzido em 30% ao identificar recursos órfãos" }
    ],
    learnings: [
      { es: "El state de Terraform es sagrado - nunca editarlo manualmente", en: "Terraform state is sacred - never edit manually", pt: "O state do Terraform é sagrado - nunca editar manualmente" },
      { es: "Modules son esenciales para no repetir código", en: "Modules are essential to avoid repeating code", pt: "Modules são essenciais para não repetir código" },
      { es: "terraform plan en CI/CD previene desastres", en: "terraform plan in CI/CD prevents disasters", pt: "terraform plan em CI/CD previne desastres" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo manejás el state de Terraform?", en: "How do you manage Terraform state?", pt: "Como gerencia o state do Terraform?" },
        answer: { es: "Remote state en S3 con locking en DynamoDB. Nunca local, nunca en git. El state tiene secrets y puede causar conflictos si dos personas aplican a la vez.", en: "Remote state in S3 with DynamoDB locking. Never local, never in git. State has secrets and can cause conflicts if two people apply at once.", pt: "Remote state no S3 com locking no DynamoDB. Nunca local, nunca no git. O state tem secrets e pode causar conflitos se duas pessoas aplicam ao mesmo tempo." }
      },
      {
        question: { es: "¿Qué pasa si alguien hace cambios manuales en la consola?", en: "What happens if someone makes manual changes in console?", pt: "O que acontece se alguém faz mudanças manuais no console?" },
        answer: { es: "terraform plan lo detecta como drift. Tenemos alertas para drift y política de que todo cambio debe ser via Terraform. Si es urgente, se importa después.", en: "terraform plan detects it as drift. We have alerts for drift and policy that all changes must be via Terraform. If urgent, import later.", pt: "terraform plan detecta como drift. Temos alertas para drift e política de que toda mudança deve ser via Terraform. Se for urgente, importa depois." }
      },
      {
        question: { es: "¿Terraform vs CloudFormation vs Pulumi?", en: "Terraform vs CloudFormation vs Pulumi?", pt: "Terraform vs CloudFormation vs Pulumi?" },
        answer: { es: "Terraform: multi-cloud, gran comunidad, HCL. CloudFormation: solo AWS, más integrado. Pulumi: código real (Python/TS). Elijo Terraform para multi-cloud, CloudFormation si es 100% AWS.", en: "Terraform: multi-cloud, huge community, HCL. CloudFormation: AWS only, more integrated. Pulumi: real code (Python/TS). I choose Terraform for multi-cloud, CloudFormation if 100% AWS.", pt: "Terraform: multi-cloud, grande comunidade, HCL. CloudFormation: só AWS, mais integrado. Pulumi: código real (Python/TS). Escolho Terraform para multi-cloud, CloudFormation se for 100% AWS." }
      }
    ],
    closingStatement: { es: "Infrastructure as Code no es opcional para equipos serios - si no está en código, no existe.", en: "Infrastructure as Code is not optional for serious teams - if it's not in code, it doesn't exist.", pt: "Infrastructure as Code não é opcional para equipes sérias - se não está em código, não existe." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📦 Instalá Terraform', en: '📦 Install Terraform', pt: '📦 Instale Terraform' },
      code: `# macOS
brew install terraform

# Verificar
terraform --version`,
      checkpoint: { es: '¿terraform --version funciona?', en: 'Does terraform --version work?', pt: 'terraform --version funciona?' }
    },
    { 
      order: 2, 
      text: { es: '📂 Creá estructura del proyecto', en: '📂 Create project structure', pt: '📂 Crie a estrutura do projeto' },
      code: `mkdir terraform-data-infra
cd terraform-data-infra

touch main.tf variables.tf outputs.tf`,
      explanation: { es: 'Separar en archivos hace el código más mantenible.', en: 'Separating into files makes code more maintainable.', pt: 'Separar em arquivos faz o código mais sustentável.' }
    },
    { 
      order: 3, 
      text: { es: '📄 Creá main.tf', en: '📄 Create main.tf', pt: '📄 Crie main.tf' },
      code: `# main.tf

terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}

# S3 Bucket para Data Lake
resource "aws_s3_bucket" "data_lake" {
  bucket = var.bucket_name
  
  tags = {
    Environment = var.environment
    Project     = "data-platform"
  }
}

# Glue Database
resource "aws_glue_catalog_database" "analytics" {
  name = "analytics_db"
}`,
      explanation: { es: 'resource define un recurso a crear. var.xxx referencia variables.', en: 'resource defines a resource to create. var.xxx references variables.', pt: 'resource define um recurso a criar. var.xxx referencia variáveis.' }
    },
    { 
      order: 4, 
      text: { es: '📄 Creá variables.tf', en: '📄 Create variables.tf', pt: '📄 Crie variables.tf' },
      code: `# variables.tf

variable "aws_region" {
  description = "AWS region"
  type        = string
  default     = "us-east-1"
}

variable "bucket_name" {
  description = "S3 bucket name"
  type        = string
}

variable "environment" {
  description = "Environment (dev, staging, prod)"
  type        = string
  default     = "dev"
}`,
      explanation: { es: 'Las variables hacen el código reutilizable para diferentes ambientes.', en: 'Variables make code reusable for different environments.', pt: 'As variáveis tornam o código reutilizável para diferentes ambientes.' }
    },
    { 
      order: 5, 
      text: { es: '🚀 Inicializá y aplicá', en: '🚀 Initialize and apply', pt: '🚀 Inicialize e aplique' },
      code: `# Inicializar (descarga providers)
terraform init

# Ver plan (qué va a crear)
terraform plan -var="bucket_name=mi-data-lake-123"

# Aplicar (crear recursos)
terraform apply -var="bucket_name=mi-data-lake-123"

# Destruir (eliminar todo)
terraform destroy`,
      warning: { es: 'terraform destroy elimina TODO. Usá con cuidado en producción.', en: 'terraform destroy deletes EVERYTHING. Use with care in production.', pt: 'terraform destroy elimina TUDO. Use com cuidado em produção.' },
      checkpoint: { es: '¿terraform plan muestra los recursos a crear?', en: 'Does terraform plan show resources to create?', pt: 'terraform plan mostra os recursos a criar?' }
    },
    { 
      order: 6, 
      text: { es: '📝 Documentá', en: '📝 Document', pt: '📝 Documente' },
      explanation: { es: 'Creá README explicando: qué recursos crea, cómo configurar, cómo deployar.', en: 'Create README explaining: what resources it creates, how to configure, how to deploy.', pt: 'Crie README explicando: que recursos cria, como configurar, como fazer deploy.' },
      checkpoint: { es: '¿Tu README tiene instrucciones claras?', en: 'Does your README have clear instructions?', pt: 'Seu README tem instruções claras?' }
    },
  ],
  deliverable: { es: 'Repo con código Terraform + README', en: 'Repo with Terraform code + README', pt: 'Repo com código Terraform + README' },
  evaluation: [
    { es: '¿El código es modular (variables, outputs)?', en: 'Is code modular (variables, outputs)?', pt: 'O código é modular (variáveis, outputs)?' },
    { es: '¿Los permisos IAM son mínimos?', en: 'Are IAM permissions minimal?', pt: 'As permissões IAM são mínimas?' },
    { es: '¿Documentaste cómo deployar?', en: 'Did you document how to deploy?', pt: 'Documentou como fazer deploy?' },
    { es: '¿terraform plan funciona sin errores?', en: 'Does terraform plan work without errors?', pt: 'terraform plan funciona sem erros?' },
  ],
  theory: { es: `## Terraform Workflow

1. **terraform init**: Descarga providers
2. **terraform plan**: Muestra qué va a hacer
3. **terraform apply**: Crea/modifica recursos
4. **terraform destroy**: Elimina recursos

## State

Terraform guarda el estado en terraform.tfstate:
- Sabe qué recursos existen
- Detecta cambios (drift)
- En equipo, usar remote state (S3 + DynamoDB)`, en: `## Terraform Workflow

1. **terraform init**: Download providers
2. **terraform plan**: Shows what it will do
3. **terraform apply**: Creates/modifies resources
4. **terraform destroy**: Deletes resources

## State

Terraform saves state in terraform.tfstate:
- Knows what resources exist
- Detects changes (drift)
- In teams, use remote state (S3 + DynamoDB)`, pt: `## Workflow Terraform

1. **terraform init**: Baixa providers
2. **terraform plan**: Mostra o que vai fazer
3. **terraform apply**: Cria/modifica recursos
4. **terraform destroy**: Elimina recursos

## State

Terraform guarda o estado em terraform.tfstate:
- Sabe que recursos existem
- Detecta mudanças (drift)
- Em equipe, usar remote state (S3 + DynamoDB)` },
};


