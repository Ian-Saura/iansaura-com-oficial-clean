/**
 * FASE 0: SETUP AWS FREE TIER
 * Configuración inicial para practicar sin gastar dinero
 * 
 * Esta fase es OBLIGATORIA antes de comenzar la especialización
 */

import { AWSStep } from '../types';

export const phase0Steps: AWSStep[] = [
  // STEP 0.1: Introducción a costos
  {
    id: 'aws-0-1',
    stepNumber: 1,
    title: {
      es: '💰 Entendiendo los costos de AWS',
      en: '💰 Understanding AWS costs',
      pt: '💰 Entendendo os custos da AWS'
    },
    description: {
      es: 'Antes de crear tu cuenta, entendé cómo funciona el modelo de precios de AWS para evitar sorpresas.',
      en: 'Before creating your account, understand how AWS pricing works to avoid surprises.',
      pt: 'Antes de criar sua conta, entenda como funciona o modelo de preços da AWS para evitar surpresas.'
    },
    theory: {
      es: `## Modelo de Precios AWS

AWS usa un modelo **pay-as-you-go** (pagás lo que usás). Pero hay buenas noticias:

### 🆓 AWS Free Tier - 3 Tipos:

| Tipo | Duración | Ejemplo |
|------|----------|---------|
| **Always Free** | Para siempre | Lambda: 1M requests/mes |
| **12 Months Free** | Primer año | EC2 t2.micro: 750h/mes |
| **Trials** | Período limitado | Redshift: 2 meses gratis |

### 💵 Servicios que SÍ cuestan (y usaremos poco):

| Servicio | Costo aprox | Cuándo lo usamos |
|----------|-------------|------------------|
| EMR | $0.10-0.50/hora | Fase 7 (opcional) |
| Redshift | $0.25/hora | Fase 6 (opcional) |
| Glue Jobs | $0.44/DPU-hora | Fase 4 (minimizado) |

### 📊 Costo total estimado de esta especialización:

| Si usás solo Free Tier | Si usás todo |
|------------------------|--------------|
| **$0 - $5** | **$20 - $40** |

La mayoría de los labs están diseñados para **$0**.`,
      en: `## AWS Pricing Model

AWS uses a **pay-as-you-go** model. But there's good news:

### 🆓 AWS Free Tier - 3 Types:

| Type | Duration | Example |
|------|----------|---------|
| **Always Free** | Forever | Lambda: 1M requests/month |
| **12 Months Free** | First year | EC2 t2.micro: 750h/month |
| **Trials** | Limited period | Redshift: 2 months free |

### 💵 Services that DO cost (we'll use sparingly):

| Service | Approx cost | When we use it |
|---------|-------------|----------------|
| EMR | $0.10-0.50/hour | Phase 7 (optional) |
| Redshift | $0.25/hour | Phase 6 (optional) |
| Glue Jobs | $0.44/DPU-hour | Phase 4 (minimized) |

### 📊 Estimated total cost for this specialization:

| Free Tier only | Everything |
|----------------|------------|
| **$0 - $5** | **$20 - $40** |

Most labs are designed for **$0**.`,
      pt: `## Modelo de Preços AWS

AWS usa um modelo **pay-as-you-go** (paga o que usa). Mas há boas notícias:

### 🆓 AWS Free Tier - 3 Tipos:

| Tipo | Duração | Exemplo |
|------|---------|---------|
| **Always Free** | Para sempre | Lambda: 1M requests/mês |
| **12 Months Free** | Primeiro ano | EC2 t2.micro: 750h/mês |
| **Trials** | Período limitado | Redshift: 2 meses grátis |

### 💵 Serviços que SIM custam (usaremos pouco):

| Serviço | Custo aprox | Quando usamos |
|---------|-------------|---------------|
| EMR | $0.10-0.50/hora | Fase 7 (opcional) |
| Redshift | $0.25/hora | Fase 6 (opcional) |
| Glue Jobs | $0.44/DPU-hora | Fase 4 (minimizado) |

### 📊 Custo total estimado desta especialização:

| Só Free Tier | Tudo |
|--------------|------|
| **$0 - $5** | **$20 - $40** |

A maioria dos labs são projetados para **$0**.`
    },
    practicalTips: [
      {
        es: '💡 Creá una cuenta NUEVA de AWS para tener 12 meses completos de Free Tier',
        en: '💡 Create a NEW AWS account to get full 12 months of Free Tier',
        pt: '💡 Crie uma conta NOVA da AWS para ter 12 meses completos de Free Tier'
      },
      {
        es: '⚠️ SIEMPRE hacé cleanup después de cada lab - recursos olvidados = cobros',
        en: '⚠️ ALWAYS do cleanup after each lab - forgotten resources = charges',
        pt: '⚠️ SEMPRE faça cleanup depois de cada lab - recursos esquecidos = cobranças'
      }
    ],
    externalLinks: [
      { title: 'AWS Free Tier', url: 'https://aws.amazon.com/free/', type: 'aws_docs' },
      { title: 'AWS Pricing Calculator', url: 'https://calculator.aws/', type: 'tool' }
    ],
    checkpoint: {
      es: '✅ Entiendo que puedo hacer la mayoría gratis si sigo las instrucciones de cleanup',
      en: '✅ I understand I can do most of it for free if I follow cleanup instructions',
      pt: '✅ Entendo que posso fazer a maioria de graça se seguir as instruções de cleanup'
    },
    xpReward: 25,
    estimatedMinutes: 10,
    services: []
  },

  // STEP 0.2: Crear cuenta AWS
  {
    id: 'aws-0-2',
    stepNumber: 2,
    title: {
      es: '📝 Crear tu cuenta AWS',
      en: '📝 Create your AWS account',
      pt: '📝 Criar sua conta AWS'
    },
    description: {
      es: 'Paso a paso para crear tu cuenta AWS y activar el Free Tier.',
      en: 'Step by step to create your AWS account and activate Free Tier.',
      pt: 'Passo a passo para criar sua conta AWS e ativar o Free Tier.'
    },
    theory: {
      es: `## Crear Cuenta AWS

### Qué necesitás:
- 📧 Email (recomiendo uno nuevo solo para AWS)
- 💳 Tarjeta de crédito/débito (NO te cobran, solo verifican)
- 📱 Teléfono para verificación

### Paso a paso:

1. **Ir a** [aws.amazon.com/free](https://aws.amazon.com/free)
2. **Click en** "Create a Free Account"
3. **Email y contraseña** - Usá una contraseña FUERTE (16+ caracteres)
4. **Tipo de cuenta**: Personal
5. **Información de contacto** - Tu info real
6. **Tarjeta de crédito** - AWS hace un cargo de $1 que se revierte
7. **Verificación telefónica** - Te llaman o envían SMS
8. **Plan de soporte**: Basic (GRATIS)

### ⚠️ IMPORTANTE:
- Anotá tu **Account ID** (número de 12 dígitos)
- Guardá las credenciales del **root user** en un lugar seguro
- Este usuario root es SOLO para emergencias`,
      en: `## Create AWS Account

### What you need:
- 📧 Email (I recommend a new one just for AWS)
- 💳 Credit/debit card (They DON'T charge you, just verify)
- 📱 Phone for verification

### Step by step:

1. **Go to** [aws.amazon.com/free](https://aws.amazon.com/free)
2. **Click** "Create a Free Account"
3. **Email and password** - Use a STRONG password (16+ chars)
4. **Account type**: Personal
5. **Contact information** - Your real info
6. **Credit card** - AWS makes a $1 charge that gets reversed
7. **Phone verification** - They call or send SMS
8. **Support plan**: Basic (FREE)

### ⚠️ IMPORTANT:
- Write down your **Account ID** (12-digit number)
- Save the **root user** credentials in a safe place
- This root user is ONLY for emergencies`,
      pt: `## Criar Conta AWS

### O que você precisa:
- 📧 Email (recomendo um novo só para AWS)
- 💳 Cartão de crédito/débito (NÃO cobram, só verificam)
- 📱 Telefone para verificação

### Passo a passo:

1. **Ir para** [aws.amazon.com/free](https://aws.amazon.com/free)
2. **Click em** "Create a Free Account"
3. **Email e senha** - Use uma senha FORTE (16+ caracteres)
4. **Tipo de conta**: Personal
5. **Informação de contato** - Sua info real
6. **Cartão de crédito** - AWS faz uma cobrança de $1 que é revertida
7. **Verificação telefônica** - Te ligam ou enviam SMS
8. **Plano de suporte**: Basic (GRÁTIS)

### ⚠️ IMPORTANTE:
- Anote seu **Account ID** (número de 12 dígitos)
- Guarde as credenciais do **root user** em lugar seguro
- Este usuário root é SÓ para emergências`
    },
    practicalTips: [
      {
        es: '🔒 Usá un password manager (1Password, Bitwarden) para guardar credenciales',
        en: '🔒 Use a password manager (1Password, Bitwarden) to save credentials',
        pt: '🔒 Use um gerenciador de senhas (1Password, Bitwarden) para guardar credenciais'
      }
    ],
    awsConsoleSteps: [
      { es: 'Ir a aws.amazon.com/free', en: 'Go to aws.amazon.com/free', pt: 'Ir para aws.amazon.com/free' },
      { es: 'Click "Create a Free Account"', en: 'Click "Create a Free Account"', pt: 'Click "Create a Free Account"' },
      { es: 'Completar el formulario', en: 'Complete the form', pt: 'Completar o formulário' },
      { es: 'Verificar email y teléfono', en: 'Verify email and phone', pt: 'Verificar email e telefone' }
    ],
    externalLinks: [
      { title: 'Create AWS Account', url: 'https://aws.amazon.com/free/', type: 'aws_docs' },
      { title: 'AWS Account Best Practices', url: 'https://docs.aws.amazon.com/accounts/latest/reference/best-practices.html', type: 'aws_docs' }
    ],
    checkpoint: {
      es: '✅ Tengo mi cuenta AWS creada y puedo hacer login',
      en: '✅ I have my AWS account created and can log in',
      pt: '✅ Tenho minha conta AWS criada e consigo fazer login'
    },
    xpReward: 50,
    estimatedMinutes: 15,
    services: []
  },

  // STEP 0.3: Configurar MFA
  {
    id: 'aws-0-3',
    stepNumber: 3,
    title: {
      es: '🔐 Configurar MFA (Autenticación de 2 factores)',
      en: '🔐 Configure MFA (2-Factor Authentication)',
      pt: '🔐 Configurar MFA (Autenticação de 2 fatores)'
    },
    description: {
      es: 'MFA es OBLIGATORIO para proteger tu cuenta. Sin esto, cualquiera con tu password puede crear recursos y dejarte una deuda de miles de dólares.',
      en: 'MFA is MANDATORY to protect your account. Without this, anyone with your password can create resources and leave you with a debt of thousands of dollars.',
      pt: 'MFA é OBRIGATÓRIO para proteger sua conta. Sem isso, qualquer um com sua senha pode criar recursos e te deixar uma dívida de milhares de dólares.'
    },
    theory: {
      es: `## Por qué MFA es OBLIGATORIO

### Horror stories reales:
- "Me hackearon la cuenta y me cobraron $50,000 en crypto mining"
- "Dejé mis credenciales en GitHub y en 2 horas tenía $15,000 de deuda"

### Cómo configurar MFA:

1. **Instalar app de autenticación** en tu celular:
   - Google Authenticator (más simple)
   - Authy (backup en la nube)
   - 1Password (si ya lo usás)

2. **En AWS Console**:
   - Click en tu nombre (arriba derecha) → Security credentials
   - En "Multi-factor authentication (MFA)" → Assign MFA device
   - Elegir "Authenticator app"
   - Escanear QR code con tu app
   - Ingresar 2 códigos consecutivos

### ⚠️ GUARDAR CÓDIGOS DE BACKUP
AWS te da códigos de recuperación. **GUARDALOS** en un lugar seguro offline.`,
      en: `## Why MFA is MANDATORY

### Real horror stories:
- "My account got hacked and I was charged $50,000 in crypto mining"
- "I left my credentials on GitHub and in 2 hours I had $15,000 in debt"

### How to configure MFA:

1. **Install authenticator app** on your phone:
   - Google Authenticator (simplest)
   - Authy (cloud backup)
   - 1Password (if you already use it)

2. **In AWS Console**:
   - Click your name (top right) → Security credentials
   - In "Multi-factor authentication (MFA)" → Assign MFA device
   - Choose "Authenticator app"
   - Scan QR code with your app
   - Enter 2 consecutive codes

### ⚠️ SAVE BACKUP CODES
AWS gives you recovery codes. **SAVE THEM** in a safe offline place.`,
      pt: `## Por que MFA é OBRIGATÓRIO

### Histórias de horror reais:
- "Hackearam minha conta e me cobraram $50,000 em crypto mining"
- "Deixei minhas credenciais no GitHub e em 2 horas tinha $15,000 de dívida"

### Como configurar MFA:

1. **Instalar app de autenticação** no seu celular:
   - Google Authenticator (mais simples)
   - Authy (backup na nuvem)
   - 1Password (se já usa)

2. **No AWS Console**:
   - Click no seu nome (canto superior direito) → Security credentials
   - Em "Multi-factor authentication (MFA)" → Assign MFA device
   - Escolher "Authenticator app"
   - Escanear QR code com seu app
   - Inserir 2 códigos consecutivos

### ⚠️ GUARDAR CÓDIGOS DE BACKUP
AWS te dá códigos de recuperação. **GUARDE-OS** em lugar seguro offline.`
    },
    practicalTips: [
      {
        es: '📱 Usá Authy si querés backup - si perdés el celular, podés recuperar',
        en: '📱 Use Authy if you want backup - if you lose your phone, you can recover',
        pt: '📱 Use Authy se quiser backup - se perder o celular, pode recuperar'
      }
    ],
    externalLinks: [
      { title: 'Enable MFA for Root User', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_root-user_manage_mfa.html', type: 'aws_docs' },
      { title: 'Google Authenticator', url: 'https://support.google.com/accounts/answer/1066447', type: 'tool' },
      { title: 'Authy', url: 'https://authy.com/', type: 'tool' }
    ],
    checkpoint: {
      es: '✅ MFA está activo en mi cuenta root',
      en: '✅ MFA is active on my root account',
      pt: '✅ MFA está ativo na minha conta root'
    },
    commonMistakes: [
      {
        es: '❌ No guardar los códigos de backup - si perdés el celular, perdés la cuenta',
        en: '❌ Not saving backup codes - if you lose your phone, you lose the account',
        pt: '❌ Não guardar os códigos de backup - se perder o celular, perde a conta'
      }
    ],
    xpReward: 50,
    estimatedMinutes: 10,
    services: ['IAM']
  },

  // STEP 0.4: Configurar Budget Alerts
  {
    id: 'aws-0-4',
    stepNumber: 4,
    title: {
      es: '🚨 Configurar Budget Alerts (CRÍTICO)',
      en: '🚨 Configure Budget Alerts (CRITICAL)',
      pt: '🚨 Configurar Budget Alerts (CRÍTICO)'
    },
    description: {
      es: 'AWS te avisa ANTES de que te cobren. Configurá alertas en $5, $10 y $20 para estar tranquilo.',
      en: 'AWS notifies you BEFORE they charge. Set up alerts at $5, $10, and $20 to stay calm.',
      pt: 'AWS te avisa ANTES de cobrar. Configure alertas em $5, $10 e $20 para ficar tranquilo.'
    },
    theory: {
      es: `## Budget Alerts - Tu red de seguridad

### Vamos a crear 3 alertas:

| Alerta | Monto | Para qué |
|--------|-------|----------|
| 🟢 Verde | $5 | "Todo bien, seguí" |
| 🟡 Amarillo | $10 | "Revisá qué está corriendo" |
| 🔴 Rojo | $20 | "PARÁ TODO y hacé cleanup" |

### Paso a paso en AWS Console:

1. Buscar "Budgets" en la barra de búsqueda
2. Click "Create budget"
3. Elegir "Cost budget"
4. Configurar:
   - Budget name: "Free Tier Alert $5"
   - Budget amount: 5
   - Threshold: 80%
   - Email: tu email

5. Repetir para $10 y $20

### También activar "Free Tier Usage Alerts":
- Billing → Billing preferences
- Activar "Receive Free Tier Usage Alerts"`,
      en: `## Budget Alerts - Your safety net

### We'll create 3 alerts:

| Alert | Amount | Purpose |
|-------|--------|---------|
| 🟢 Green | $5 | "All good, continue" |
| 🟡 Yellow | $10 | "Check what's running" |
| 🔴 Red | $20 | "STOP everything and cleanup" |

### Step by step in AWS Console:

1. Search "Budgets" in the search bar
2. Click "Create budget"
3. Choose "Cost budget"
4. Configure:
   - Budget name: "Free Tier Alert $5"
   - Budget amount: 5
   - Threshold: 80%
   - Email: your email

5. Repeat for $10 and $20

### Also activate "Free Tier Usage Alerts":
- Billing → Billing preferences
- Enable "Receive Free Tier Usage Alerts"`,
      pt: `## Budget Alerts - Sua rede de segurança

### Vamos criar 3 alertas:

| Alerta | Valor | Para quê |
|--------|-------|----------|
| 🟢 Verde | $5 | "Tudo bem, continue" |
| 🟡 Amarelo | $10 | "Verifique o que está rodando" |
| 🔴 Vermelho | $20 | "PARE tudo e faça cleanup" |

### Passo a passo no AWS Console:

1. Buscar "Budgets" na barra de busca
2. Click "Create budget"
3. Escolher "Cost budget"
4. Configurar:
   - Budget name: "Free Tier Alert $5"
   - Budget amount: 5
   - Threshold: 80%
   - Email: seu email

5. Repetir para $10 e $20

### Também ativar "Free Tier Usage Alerts":
- Billing → Billing preferences
- Ativar "Receive Free Tier Usage Alerts"`
    },
    practicalTips: [
      {
        es: '📧 Usá un email que revises TODOS los días para las alertas',
        en: '📧 Use an email you check EVERY day for alerts',
        pt: '📧 Use um email que você checa TODOS os dias para alertas'
      }
    ],
    cliCommands: [
      {
        command: `aws budgets create-budget --account-id YOUR_ACCOUNT_ID --budget '{
  "BudgetName": "FreeTierAlert",
  "BudgetLimit": {"Amount": "5", "Unit": "USD"},
  "BudgetType": "COST",
  "TimeUnit": "MONTHLY"
}' --notifications-with-subscribers '[{
  "Notification": {
    "NotificationType": "ACTUAL",
    "ComparisonOperator": "GREATER_THAN",
    "Threshold": 80
  },
  "Subscribers": [{"SubscriptionType": "EMAIL", "Address": "tu@email.com"}]
}]'`,
        explanation: {
          es: 'Crear budget de $5 con alerta al 80%',
          en: 'Create $5 budget with alert at 80%',
          pt: 'Criar budget de $5 com alerta em 80%'
        }
      }
    ],
    externalLinks: [
      { title: 'AWS Budgets', url: 'https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html', type: 'aws_docs' }
    ],
    checkpoint: {
      es: '✅ Tengo alertas configuradas para $5, $10 y $20',
      en: '✅ I have alerts configured for $5, $10, and $20',
      pt: '✅ Tenho alertas configuradas para $5, $10 e $20'
    },
    xpReward: 50,
    estimatedMinutes: 15,
    services: ['Budgets']
  },

  // STEP 0.5: Crear IAM User
  {
    id: 'aws-0-5',
    stepNumber: 5,
    title: {
      es: '👤 Crear tu IAM User (NO uses root)',
      en: '👤 Create your IAM User (DON\'T use root)',
      pt: '👤 Criar seu IAM User (NÃO use root)'
    },
    description: {
      es: 'El usuario root es para emergencias. Creá un IAM user para el día a día.',
      en: 'The root user is for emergencies. Create an IAM user for daily use.',
      pt: 'O usuário root é para emergências. Crie um IAM user para o dia a dia.'
    },
    theory: {
      es: `## Por qué NO usar root

El usuario root puede:
- Cerrar tu cuenta
- Borrar TODO
- No tiene restricciones

### Creá tu IAM User:

1. **IAM** → Users → Create user
2. **User name**: tu-nombre-admin
3. **Provide user access to AWS Console**: ✅
4. **I want to create an IAM user**: Seleccionar
5. **Custom password**: Poner una fuerte
6. **Permissions**: Attach policy "AdministratorAccess" (para aprender)
7. **Tags**: Environment=Learning

### Después de crear:
- Guardá las credenciales
- Configurá MFA también en este user
- **SIEMPRE usá este user, NO root**`,
      en: `## Why NOT to use root

The root user can:
- Close your account
- Delete EVERYTHING
- Has no restrictions

### Create your IAM User:

1. **IAM** → Users → Create user
2. **User name**: your-name-admin
3. **Provide user access to AWS Console**: ✅
4. **I want to create an IAM user**: Select
5. **Custom password**: Set a strong one
6. **Permissions**: Attach policy "AdministratorAccess" (for learning)
7. **Tags**: Environment=Learning

### After creating:
- Save the credentials
- Configure MFA on this user too
- **ALWAYS use this user, NOT root**`,
      pt: `## Por que NÃO usar root

O usuário root pode:
- Fechar sua conta
- Deletar TUDO
- Não tem restrições

### Crie seu IAM User:

1. **IAM** → Users → Create user
2. **User name**: seu-nome-admin
3. **Provide user access to AWS Console**: ✅
4. **I want to create an IAM user**: Selecionar
5. **Custom password**: Colocar uma forte
6. **Permissions**: Attach policy "AdministratorAccess" (para aprender)
7. **Tags**: Environment=Learning

### Depois de criar:
- Guarde as credenciais
- Configure MFA também neste user
- **SEMPRE use este user, NÃO root**`
    },
    practicalTips: [
      {
        es: '🏷️ Poné tags en todo: Environment=Learning te ayuda a identificar recursos de prueba',
        en: '🏷️ Tag everything: Environment=Learning helps identify test resources',
        pt: '🏷️ Coloque tags em tudo: Environment=Learning ajuda a identificar recursos de teste'
      }
    ],
    externalLinks: [
      { title: 'Create IAM User', url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html', type: 'aws_docs' }
    ],
    checkpoint: {
      es: '✅ Tengo mi IAM user creado y con MFA activo',
      en: '✅ I have my IAM user created and with MFA active',
      pt: '✅ Tenho meu IAM user criado e com MFA ativo'
    },
    xpReward: 50,
    estimatedMinutes: 15,
    services: ['IAM']
  },

  // STEP 0.6: Instalar AWS CLI
  {
    id: 'aws-0-6',
    stepNumber: 6,
    title: {
      es: '⌨️ Instalar AWS CLI',
      en: '⌨️ Install AWS CLI',
      pt: '⌨️ Instalar AWS CLI'
    },
    description: {
      es: 'La línea de comandos de AWS - vas a usarla en todos los labs.',
      en: 'The AWS command line - you\'ll use it in all labs.',
      pt: 'A linha de comandos da AWS - você vai usar em todos os labs.'
    },
    theory: {
      es: `## Instalación AWS CLI v2

### macOS:
\`\`\`bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
\`\`\`

### Linux:
\`\`\`bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
\`\`\`

### Windows:
Descargar de: https://awscli.amazonaws.com/AWSCLIV2.msi

### Verificar instalación:
\`\`\`bash
aws --version
# aws-cli/2.x.x ...
\`\`\``,
      en: `## AWS CLI v2 Installation

### macOS:
\`\`\`bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
\`\`\`

### Linux:
\`\`\`bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
\`\`\`

### Windows:
Download from: https://awscli.amazonaws.com/AWSCLIV2.msi

### Verify installation:
\`\`\`bash
aws --version
# aws-cli/2.x.x ...
\`\`\``,
      pt: `## Instalação AWS CLI v2

### macOS:
\`\`\`bash
curl "https://awscli.amazonaws.com/AWSCLIV2.pkg" -o "AWSCLIV2.pkg"
sudo installer -pkg AWSCLIV2.pkg -target /
\`\`\`

### Linux:
\`\`\`bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
\`\`\`

### Windows:
Baixar de: https://awscli.amazonaws.com/AWSCLIV2.msi

### Verificar instalação:
\`\`\`bash
aws --version
# aws-cli/2.x.x ...
\`\`\``
    },
    practicalTips: [
      {
        es: '💻 Si tenés problemas, reiniciá la terminal después de instalar',
        en: '💻 If you have issues, restart the terminal after installing',
        pt: '💻 Se tiver problemas, reinicie o terminal depois de instalar'
      }
    ],
    cliCommands: [
      {
        command: 'aws --version',
        explanation: {
          es: 'Verificar que AWS CLI está instalado',
          en: 'Verify AWS CLI is installed',
          pt: 'Verificar que AWS CLI está instalado'
        }
      }
    ],
    externalLinks: [
      { title: 'Install AWS CLI', url: 'https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html', type: 'aws_docs' }
    ],
    checkpoint: {
      es: '✅ "aws --version" funciona en mi terminal',
      en: '✅ "aws --version" works in my terminal',
      pt: '✅ "aws --version" funciona no meu terminal'
    },
    xpReward: 25,
    estimatedMinutes: 10,
    services: ['CLI']
  },

  // STEP 0.7: Configurar AWS CLI
  {
    id: 'aws-0-7',
    stepNumber: 7,
    title: {
      es: '🔧 Configurar AWS CLI con tus credenciales',
      en: '🔧 Configure AWS CLI with your credentials',
      pt: '🔧 Configurar AWS CLI com suas credenciais'
    },
    description: {
      es: 'Conectá tu CLI a tu cuenta AWS.',
      en: 'Connect your CLI to your AWS account.',
      pt: 'Conecte seu CLI à sua conta AWS.'
    },
    theory: {
      es: `## Crear Access Keys

1. **IAM** → Users → Tu user → Security credentials
2. **Create access key**
3. **Use case**: Command Line Interface
4. Copiar **Access Key ID** y **Secret Access Key**

## Configurar CLI

\`\`\`bash
aws configure
# AWS Access Key ID: [pegar tu access key]
# AWS Secret Access Key: [pegar tu secret]
# Default region: us-east-1
# Default output format: json
\`\`\`

## Verificar conexión

\`\`\`bash
aws sts get-caller-identity
# Debe mostrar tu Account ID y User
\`\`\`

⚠️ **IMPORTANTE**: us-east-1 es la región más barata y tiene todo`,
      en: `## Create Access Keys

1. **IAM** → Users → Your user → Security credentials
2. **Create access key**
3. **Use case**: Command Line Interface
4. Copy **Access Key ID** and **Secret Access Key**

## Configure CLI

\`\`\`bash
aws configure
# AWS Access Key ID: [paste your access key]
# AWS Secret Access Key: [paste your secret]
# Default region: us-east-1
# Default output format: json
\`\`\`

## Verify connection

\`\`\`bash
aws sts get-caller-identity
# Should show your Account ID and User
\`\`\`

⚠️ **IMPORTANT**: us-east-1 is the cheapest region and has everything`,
      pt: `## Criar Access Keys

1. **IAM** → Users → Seu user → Security credentials
2. **Create access key**
3. **Use case**: Command Line Interface
4. Copiar **Access Key ID** e **Secret Access Key**

## Configurar CLI

\`\`\`bash
aws configure
# AWS Access Key ID: [colar sua access key]
# AWS Secret Access Key: [colar seu secret]
# Default region: us-east-1
# Default output format: json
\`\`\`

## Verificar conexão

\`\`\`bash
aws sts get-caller-identity
# Deve mostrar seu Account ID e User
\`\`\`

⚠️ **IMPORTANTE**: us-east-1 é a região mais barata e tem tudo`
    },
    practicalTips: [
      {
        es: '🌎 Siempre usá us-east-1 como región - es la más barata y tiene todos los servicios',
        en: '🌎 Always use us-east-1 as region - it\'s the cheapest and has all services',
        pt: '🌎 Sempre use us-east-1 como região - é a mais barata e tem todos os serviços'
      }
    ],
    cliCommands: [
      {
        command: 'aws configure',
        explanation: {
          es: 'Configurar credenciales de AWS',
          en: 'Configure AWS credentials',
          pt: 'Configurar credenciais da AWS'
        }
      },
      {
        command: 'aws sts get-caller-identity',
        explanation: {
          es: 'Verificar que la conexión funciona',
          en: 'Verify the connection works',
          pt: 'Verificar que a conexão funciona'
        }
      }
    ],
    externalLinks: [
      { title: 'Configure AWS CLI', url: 'https://docs.aws.amazon.com/cli/latest/userguide/cli-configure-quickstart.html', type: 'aws_docs' }
    ],
    checkpoint: {
      es: '✅ "aws sts get-caller-identity" muestra mi account ID',
      en: '✅ "aws sts get-caller-identity" shows my account ID',
      pt: '✅ "aws sts get-caller-identity" mostra meu account ID'
    },
    commonMistakes: [
      {
        es: '❌ Poner las credenciales en GitHub - NUNCA commitees archivos con secrets',
        en: '❌ Putting credentials on GitHub - NEVER commit files with secrets',
        pt: '❌ Colocar credenciais no GitHub - NUNCA commite arquivos com secrets'
      }
    ],
    xpReward: 50,
    estimatedMinutes: 10,
    services: ['IAM', 'CLI']
  },

  // STEP 0.8: Checklist final
  {
    id: 'aws-0-8',
    stepNumber: 8,
    title: {
      es: '✅ Checklist Final - ¡Listo para empezar!',
      en: '✅ Final Checklist - Ready to start!',
      pt: '✅ Checklist Final - Pronto para começar!'
    },
    description: {
      es: 'Verificá que tenés todo listo antes de pasar a la Fase 1.',
      en: 'Verify you have everything ready before moving to Phase 1.',
      pt: 'Verifique que tem tudo pronto antes de passar para a Fase 1.'
    },
    theory: {
      es: `## ✅ Checklist de Setup Completo

| Item | Estado |
|------|--------|
| Cuenta AWS creada | ⬜ |
| MFA en root user | ⬜ |
| Budget alerts ($5, $10, $20) | ⬜ |
| Free Tier alerts activadas | ⬜ |
| IAM user creado | ⬜ |
| MFA en IAM user | ⬜ |
| AWS CLI instalado | ⬜ |
| AWS CLI configurado | ⬜ |
| Región = us-east-1 | ⬜ |

## 🎉 ¡Felicitaciones!

Ahora tenés un ambiente AWS:
- ✅ **Seguro** (MFA en todos lados)
- ✅ **Económico** (alertas antes de gastar)
- ✅ **Listo para labs** (CLI configurado)

## 💰 Recordá:
- **SIEMPRE** hacé cleanup después de cada lab
- **REVISÁ** tu billing dashboard cada semana
- Si algo se dispara, **PARÁ TODO** y revisá`,
      en: `## ✅ Complete Setup Checklist

| Item | Status |
|------|--------|
| AWS account created | ⬜ |
| MFA on root user | ⬜ |
| Budget alerts ($5, $10, $20) | ⬜ |
| Free Tier alerts activated | ⬜ |
| IAM user created | ⬜ |
| MFA on IAM user | ⬜ |
| AWS CLI installed | ⬜ |
| AWS CLI configured | ⬜ |
| Region = us-east-1 | ⬜ |

## 🎉 Congratulations!

Now you have an AWS environment that is:
- ✅ **Secure** (MFA everywhere)
- ✅ **Budget-friendly** (alerts before spending)
- ✅ **Ready for labs** (CLI configured)

## 💰 Remember:
- **ALWAYS** do cleanup after each lab
- **CHECK** your billing dashboard every week
- If something spikes, **STOP EVERYTHING** and review`,
      pt: `## ✅ Checklist de Setup Completo

| Item | Status |
|------|--------|
| Conta AWS criada | ⬜ |
| MFA no root user | ⬜ |
| Budget alerts ($5, $10, $20) | ⬜ |
| Free Tier alerts ativadas | ⬜ |
| IAM user criado | ⬜ |
| MFA no IAM user | ⬜ |
| AWS CLI instalado | ⬜ |
| AWS CLI configurado | ⬜ |
| Região = us-east-1 | ⬜ |

## 🎉 Parabéns!

Agora você tem um ambiente AWS:
- ✅ **Seguro** (MFA em todos os lugares)
- ✅ **Econômico** (alertas antes de gastar)
- ✅ **Pronto para labs** (CLI configurado)

## 💰 Lembre-se:
- **SEMPRE** faça cleanup depois de cada lab
- **VERIFIQUE** seu billing dashboard toda semana
- Se algo disparar, **PARE TUDO** e revise`
    },
    practicalTips: [
      {
        es: '📅 Poné un recordatorio semanal para revisar AWS Billing',
        en: '📅 Set a weekly reminder to check AWS Billing',
        pt: '📅 Coloque um lembrete semanal para verificar AWS Billing'
      }
    ],
    externalLinks: [
      { title: 'AWS Billing Dashboard', url: 'https://console.aws.amazon.com/billing/home', type: 'aws_docs' }
    ],
    checkpoint: {
      es: '✅ Completé todos los items del checklist y estoy listo para la Fase 1',
      en: '✅ I completed all checklist items and I\'m ready for Phase 1',
      pt: '✅ Completei todos os items do checklist e estou pronto para a Fase 1'
    },
    xpReward: 100,
    estimatedMinutes: 10,
    services: []
  }
];

// Información de Free Tier por servicio
export const FREE_TIER_INFO = {
  s3: {
    free: '5 GB storage, 20k GET, 2k PUT/mes',
    afterFree: '$0.023/GB',
    tip: 'Borrá objetos después de los labs'
  },
  lambda: {
    free: '1M requests, 400k GB-seconds/mes',
    afterFree: '$0.20/1M requests',
    tip: 'Casi imposible pasarse en labs'
  },
  glue: {
    free: '1M objects cataloged',
    afterFree: '$0.44/DPU-hour para jobs',
    tip: 'Usá Spark local para desarrollo'
  },
  athena: {
    free: 'No hay free tier',
    afterFree: '$5/TB scanned',
    tip: 'Usá LIMIT y particiones para minimizar'
  },
  redshift: {
    free: '2 meses DC2.Large',
    afterFree: '$0.25/hour',
    tip: '⚠️ OPCIONAL - podés skipear'
  },
  emr: {
    free: 'No hay free tier',
    afterFree: '$0.10-0.50/hour',
    tip: '⚠️ OPCIONAL - usá Spark local'
  },
  kinesis: {
    free: 'No hay free tier',
    afterFree: '$0.015/shard-hour',
    tip: '⚠️ OPCIONAL - labs diseñados para mínimo'
  }
};

// Costos estimados por fase
export const PHASE_COSTS = [
  { phase: 0, name: 'Setup', cost: '$0', note: 'Todo gratis' },
  { phase: 1, name: 'Fundamentos', cost: '$0', note: 'Solo Console y CLI' },
  { phase: 2, name: 'S3', cost: '$0', note: 'Free Tier' },
  { phase: 3, name: 'IAM/Security', cost: '$0', note: 'Free Tier' },
  { phase: 4, name: 'Glue', cost: '$0-2', note: 'Catalog gratis, Jobs opcional' },
  { phase: 5, name: 'Athena', cost: '$0-1', note: 'Queries pequeñas' },
  { phase: 6, name: 'Redshift', cost: '$0-5', note: 'OPCIONAL - 2 meses trial' },
  { phase: 7, name: 'EMR', cost: '$0-5', note: 'OPCIONAL - usá Spark local' },
  { phase: 8, name: 'Kinesis', cost: '$0-2', note: 'OPCIONAL - labs minimizados' },
  { phase: 9, name: 'Orchestration', cost: '$0', note: 'Step Functions Free Tier' },
  { phase: 10, name: 'IaC', cost: '$0', note: 'CloudFormation gratis' },
  { phase: 11, name: 'Monitoring', cost: '$0', note: 'CloudWatch Free Tier' },
  { phase: 12, name: 'Certification', cost: '$0', note: 'Solo estudio' }
];

