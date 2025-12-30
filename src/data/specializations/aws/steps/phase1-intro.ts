/**
 * FASE 1: INTRODUCCIÓN A AWS Y EL ECOSISTEMA CLOUD
 * 9 pasos detallados para comenzar en AWS
 */

import { AWSStep } from '../types';

export const phase1Steps: AWSStep[] = [
  // =====================================================
  // PASO 1.1: ¿Qué es AWS y por qué dominó el mercado?
  // =====================================================
  {
    id: 'aws-1-1',
    stepNumber: 1,
    title: {
      es: '¿Qué es AWS y por qué domina el mercado?',
      en: 'What is AWS and why does it dominate the market?',
      pt: 'O que é AWS e por que domina o mercado?'
    },
    description: {
      es: 'Entender qué es Amazon Web Services, su historia, y por qué tiene +32% del mercado cloud global.',
      en: 'Understand what Amazon Web Services is, its history, and why it has +32% of the global cloud market.',
      pt: 'Entender o que é Amazon Web Services, sua história e por que tem +32% do mercado cloud global.'
    },
    theory: {
      es: `## Amazon Web Services: El Líder del Cloud Computing

### Historia y Origen
AWS nació en 2006 cuando Amazon decidió comercializar su infraestructura interna. Jeff Bezos identificó que la infraestructura de cómputo y almacenamiento que Amazon había construido para su e-commerce podía ser un producto en sí mismo.

### ¿Por qué AWS domina?
1. **First mover advantage**: 5 años de ventaja sobre Azure y GCP
2. **Amplitud de servicios**: +200 servicios vs ~100 de competidores
3. **Madurez**: Servicios probados en producción por millones de clientes
4. **Ecosistema**: La mayor comunidad de partners, certificaciones, y recursos

### Market Share 2024
- **AWS**: 32% (líder absoluto)
- **Azure**: 23% (crecimiento enterprise)
- **Google Cloud**: 10% (fuerte en ML/AI)

### ¿Por qué AWS para Data Engineering?
- **S3**: El estándar de facto para Data Lakes
- **Glue**: ETL serverless con PySpark
- **Redshift**: Data Warehouse más maduro
- **Kinesis**: Streaming nativo integrado
- **Athena**: SQL serverless sobre S3

### El modelo de responsabilidad compartida
AWS gestiona la seguridad DE la nube (hardware, redes, data centers), mientras tú gestionas la seguridad EN la nube (datos, accesos, configuración).`,
      en: `## Amazon Web Services: The Cloud Computing Leader

### History and Origin
AWS was born in 2006 when Amazon decided to commercialize its internal infrastructure. Jeff Bezos identified that the compute and storage infrastructure Amazon had built for its e-commerce could be a product in itself.

### Why does AWS dominate?
1. **First mover advantage**: 5 years ahead of Azure and GCP
2. **Breadth of services**: 200+ services vs ~100 from competitors
3. **Maturity**: Services proven in production by millions of customers
4. **Ecosystem**: The largest community of partners, certifications, and resources

### Market Share 2024
- **AWS**: 32% (absolute leader)
- **Azure**: 23% (enterprise growth)
- **Google Cloud**: 10% (strong in ML/AI)

### Why AWS for Data Engineering?
- **S3**: The de facto standard for Data Lakes
- **Glue**: Serverless ETL with PySpark
- **Redshift**: Most mature Data Warehouse
- **Kinesis**: Native integrated streaming
- **Athena**: Serverless SQL on S3

### The Shared Responsibility Model
AWS manages security OF the cloud (hardware, networks, data centers), while you manage security IN the cloud (data, access, configuration).`,
      pt: `## Amazon Web Services: O Líder do Cloud Computing

### História e Origem
A AWS nasceu em 2006 quando a Amazon decidiu comercializar sua infraestrutura interna. Jeff Bezos identificou que a infraestrutura de computação e armazenamento que a Amazon havia construído para seu e-commerce poderia ser um produto em si.

### Por que a AWS domina?
1. **First mover advantage**: 5 anos à frente de Azure e GCP
2. **Amplitude de serviços**: +200 serviços vs ~100 dos concorrentes
3. **Maturidade**: Serviços comprovados em produção por milhões de clientes
4. **Ecossistema**: A maior comunidade de parceiros, certificações e recursos

### Market Share 2024
- **AWS**: 32% (líder absoluto)
- **Azure**: 23% (crescimento enterprise)
- **Google Cloud**: 10% (forte em ML/AI)

### Por que AWS para Data Engineering?
- **S3**: O padrão de facto para Data Lakes
- **Glue**: ETL serverless com PySpark
- **Redshift**: Data Warehouse mais maduro
- **Kinesis**: Streaming nativo integrado
- **Athena**: SQL serverless sobre S3

### O modelo de responsabilidade compartilhada
A AWS gerencia a segurança DA nuvem (hardware, redes, data centers), enquanto você gerencia a segurança NA nuvem (dados, acessos, configuração).`
    },
    practicalTips: [
      {
        es: '💡 En entrevistas, conocer la historia y posición de AWS demuestra que entiendes el contexto del mercado',
        en: '💡 In interviews, knowing AWS history and position shows you understand market context',
        pt: '💡 Em entrevistas, conhecer a história e posição da AWS mostra que você entende o contexto do mercado'
      },
      {
        es: '🎯 Las startups prefieren AWS por madurez; enterprises grandes suelen usar Azure por integración con Microsoft',
        en: '🎯 Startups prefer AWS for maturity; large enterprises often use Azure for Microsoft integration',
        pt: '🎯 Startups preferem AWS pela maturidade; grandes empresas costumam usar Azure pela integração com Microsoft'
      },
      {
        es: '📊 Revisa el "Gartner Magic Quadrant for Cloud" cada año para entender el panorama competitivo',
        en: '📊 Review the "Gartner Magic Quadrant for Cloud" each year to understand the competitive landscape',
        pt: '📊 Revise o "Gartner Magic Quadrant for Cloud" cada ano para entender o panorama competitivo'
      }
    ],
    externalLinks: [
      {
        title: 'AWS Overview - Official Documentation',
        url: 'https://aws.amazon.com/what-is-aws/',
        type: 'aws_docs'
      },
      {
        title: 'AWS Architecture Center',
        url: 'https://aws.amazon.com/architecture/',
        type: 'aws_docs'
      },
      {
        title: 'Cloud Market Share Statistics 2024',
        url: 'https://www.statista.com/chart/18819/worldwide-market-share-of-leading-cloud-infrastructure-service-providers/',
        type: 'article'
      },
      {
        title: 'AWS re:Invent 2024 Keynote (YouTube)',
        url: 'https://www.youtube.com/c/amazonwebservices',
        type: 'video'
      }
    ],
    checkpoint: {
      es: '✅ ¿Puedes explicar en 2 minutos qué es AWS, por qué lidera el mercado, y mencionar 5 servicios clave para Data Engineering?',
      en: '✅ Can you explain in 2 minutes what AWS is, why it leads the market, and mention 5 key services for Data Engineering?',
      pt: '✅ Você consegue explicar em 2 minutos o que é AWS, por que lidera o mercado e mencionar 5 serviços-chave para Data Engineering?'
    },
    interviewTips: [
      {
        es: 'Pregunta común: "¿Por qué elegirías AWS sobre Azure o GCP?" - Responde basándote en madurez de servicios de datos, ecosistema, y casos de uso específicos',
        en: 'Common question: "Why would you choose AWS over Azure or GCP?" - Answer based on data services maturity, ecosystem, and specific use cases',
        pt: 'Pergunta comum: "Por que você escolheria AWS sobre Azure ou GCP?" - Responda com base na maturidade dos serviços de dados, ecossistema e casos de uso específicos'
      }
    ],
    xpReward: 50,
    estimatedMinutes: 30,
    services: ['AWS General']
  },

  // =====================================================
  // PASO 1.2: Crear tu cuenta AWS de forma segura
  // =====================================================
  {
    id: 'aws-1-2',
    stepNumber: 2,
    title: {
      es: 'Crear tu cuenta AWS de forma segura',
      en: 'Create your AWS account securely',
      pt: 'Criar sua conta AWS de forma segura'
    },
    description: {
      es: 'Configurar una cuenta AWS siguiendo las mejores prácticas de seguridad desde el día 1.',
      en: 'Configure an AWS account following security best practices from day 1.',
      pt: 'Configurar uma conta AWS seguindo as melhores práticas de segurança desde o dia 1.'
    },
    theory: {
      es: `## Creación de Cuenta AWS - Paso a Paso Seguro

### Antes de empezar
1. **Email dedicado**: Crea un email solo para AWS (ej: tunombre+aws@gmail.com)
2. **Tarjeta de crédito**: AWS requiere una tarjeta, pero no cobrará si usas Free Tier
3. **Número de teléfono**: Para verificación SMS

### Free Tier - Tu mejor aliado
AWS ofrece 3 tipos de Free Tier:
- **Always Free**: Servicios siempre gratis hasta ciertos límites
- **12 Months Free**: Gratis el primer año (ej: 750h EC2 t2.micro/mes)
- **Trials**: Pruebas cortas de servicios específicos

### Servicios relevantes en Free Tier para Data Engineering:
- **S3**: 5GB de almacenamiento standard
- **Glue**: 1 millón de objetos en Data Catalog
- **Athena**: 5GB de datos escaneados/mes (primeros 12 meses)
- **Lambda**: 1 millón de requests/mes
- **CloudWatch**: 10 métricas custom, 5GB logs

### ⚠️ Errores costosos a evitar
1. **No configurar billing alerts**: Puedes despertar con facturas de miles de dólares
2. **Usar root account**: NUNCA uses la cuenta root para trabajo diario
3. **Dejar recursos activos**: Un cluster EMR olvidado = $$$
4. **Regiones caras**: us-east-1 suele ser más barata que otras regiones`,
      en: `## AWS Account Creation - Secure Step by Step

### Before starting
1. **Dedicated email**: Create an email just for AWS (e.g., yourname+aws@gmail.com)
2. **Credit card**: AWS requires a card, but won't charge if you use Free Tier
3. **Phone number**: For SMS verification

### Free Tier - Your best ally
AWS offers 3 types of Free Tier:
- **Always Free**: Services always free up to certain limits
- **12 Months Free**: Free for the first year (e.g., 750h EC2 t2.micro/month)
- **Trials**: Short trials of specific services

### Relevant Free Tier services for Data Engineering:
- **S3**: 5GB of standard storage
- **Glue**: 1 million objects in Data Catalog
- **Athena**: 5GB of data scanned/month (first 12 months)
- **Lambda**: 1 million requests/month
- **CloudWatch**: 10 custom metrics, 5GB logs

### ⚠️ Costly mistakes to avoid
1. **Not configuring billing alerts**: You can wake up with thousand-dollar bills
2. **Using root account**: NEVER use root account for daily work
3. **Leaving active resources**: A forgotten EMR cluster = $$$
4. **Expensive regions**: us-east-1 is usually cheaper than other regions`,
      pt: `## Criação de Conta AWS - Passo a Passo Seguro

### Antes de começar
1. **Email dedicado**: Crie um email só para AWS (ex: seunome+aws@gmail.com)
2. **Cartão de crédito**: AWS requer um cartão, mas não cobrará se usar Free Tier
3. **Número de telefone**: Para verificação SMS

### Free Tier - Seu melhor aliado
A AWS oferece 3 tipos de Free Tier:
- **Always Free**: Serviços sempre gratuitos até certos limites
- **12 Months Free**: Gratuito no primeiro ano (ex: 750h EC2 t2.micro/mês)
- **Trials**: Testes curtos de serviços específicos

### Serviços relevantes no Free Tier para Data Engineering:
- **S3**: 5GB de armazenamento standard
- **Glue**: 1 milhão de objetos no Data Catalog
- **Athena**: 5GB de dados escaneados/mês (primeiros 12 meses)
- **Lambda**: 1 milhão de requests/mês
- **CloudWatch**: 10 métricas custom, 5GB logs

### ⚠️ Erros custosos a evitar
1. **Não configurar alertas de billing**: Você pode acordar com faturas de milhares de dólares
2. **Usar conta root**: NUNCA use a conta root para trabalho diário
3. **Deixar recursos ativos**: Um cluster EMR esquecido = $$$
4. **Regiões caras**: us-east-1 costuma ser mais barata que outras regiões`
    },
    practicalTips: [
      {
        es: '🔐 Activa MFA en la cuenta root INMEDIATAMENTE después de crearla',
        en: '🔐 Enable MFA on root account IMMEDIATELY after creating it',
        pt: '🔐 Ative MFA na conta root IMEDIATAMENTE após criá-la'
      },
      {
        es: '💰 Configura un Budget Alert de $10 USD para empezar - te avisará antes de gastar',
        en: '💰 Set up a $10 USD Budget Alert to start - it will warn you before spending',
        pt: '💰 Configure um Budget Alert de $10 USD para começar - ele avisará antes de gastar'
      },
      {
        es: '📍 Usa us-east-1 (N. Virginia) como región principal - tiene todos los servicios y mejores precios',
        en: '📍 Use us-east-1 (N. Virginia) as main region - has all services and best prices',
        pt: '📍 Use us-east-1 (N. Virginia) como região principal - tem todos os serviços e melhores preços'
      }
    ],
    awsConsoleSteps: [
      {
        es: '1. Ve a aws.amazon.com y click en "Create an AWS Account"',
        en: '1. Go to aws.amazon.com and click "Create an AWS Account"',
        pt: '1. Vá para aws.amazon.com e clique em "Create an AWS Account"'
      },
      {
        es: '2. Ingresa email dedicado y nombre de cuenta (ej: "tunombre-learning")',
        en: '2. Enter dedicated email and account name (e.g., "yourname-learning")',
        pt: '2. Digite email dedicado e nome da conta (ex: "seunome-learning")'
      },
      {
        es: '3. Verifica email con el código recibido',
        en: '3. Verify email with received code',
        pt: '3. Verifique email com o código recebido'
      },
      {
        es: '4. Ingresa información de tarjeta de crédito (no se cobrará)',
        en: '4. Enter credit card information (won\'t be charged)',
        pt: '4. Digite informações do cartão de crédito (não será cobrado)'
      },
      {
        es: '5. Verifica identidad por SMS',
        en: '5. Verify identity via SMS',
        pt: '5. Verifique identidade por SMS'
      },
      {
        es: '6. Selecciona plan "Basic Support - Free"',
        en: '6. Select "Basic Support - Free" plan',
        pt: '6. Selecione plano "Basic Support - Free"'
      },
      {
        es: '7. ¡Cuenta creada! Ahora configura seguridad básica',
        en: '7. Account created! Now configure basic security',
        pt: '7. Conta criada! Agora configure segurança básica'
      }
    ],
    externalLinks: [
      {
        title: 'AWS Free Tier - Complete Guide',
        url: 'https://aws.amazon.com/free/',
        type: 'aws_docs'
      },
      {
        title: 'Setting up your AWS Account - Best Practices',
        url: 'https://docs.aws.amazon.com/accounts/latest/reference/best-practices.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS Pricing Calculator',
        url: 'https://calculator.aws/',
        type: 'tool'
      }
    ],
    checkpoint: {
      es: '✅ ¿Tienes tu cuenta AWS creada, MFA activado en root, y un budget alert de $10 configurado?',
      en: '✅ Do you have your AWS account created, MFA enabled on root, and a $10 budget alert configured?',
      pt: '✅ Você tem sua conta AWS criada, MFA ativado no root e um budget alert de $10 configurado?'
    },
    commonMistakes: [
      {
        es: '❌ No activar MFA en root - esto es un riesgo de seguridad crítico',
        en: '❌ Not enabling MFA on root - this is a critical security risk',
        pt: '❌ Não ativar MFA no root - isso é um risco de segurança crítico'
      },
      {
        es: '❌ Usar la cuenta root para todo - crea un usuario IAM para trabajo diario',
        en: '❌ Using root account for everything - create an IAM user for daily work',
        pt: '❌ Usar a conta root para tudo - crie um usuário IAM para trabalho diário'
      },
      {
        es: '❌ No configurar billing alerts - puedes tener sorpresas muy costosas',
        en: '❌ Not configuring billing alerts - you can have very costly surprises',
        pt: '❌ Não configurar alertas de billing - você pode ter surpresas muito custosas'
      }
    ],
    xpReward: 75,
    estimatedMinutes: 45,
    services: ['IAM', 'Billing']
  },

  // =====================================================
  // PASO 1.3: Configurar MFA y seguridad inicial
  // =====================================================
  {
    id: 'aws-1-3',
    stepNumber: 3,
    title: {
      es: 'Configurar MFA y seguridad inicial',
      en: 'Configure MFA and initial security',
      pt: 'Configurar MFA e segurança inicial'
    },
    description: {
      es: 'Proteger tu cuenta AWS con autenticación multifactor y configuraciones de seguridad básicas.',
      en: 'Protect your AWS account with multi-factor authentication and basic security settings.',
      pt: 'Proteger sua conta AWS com autenticação multifator e configurações de segurança básicas.'
    },
    theory: {
      es: `## MFA y Seguridad Inicial en AWS

### ¿Qué es MFA?
Multi-Factor Authentication añade una segunda capa de seguridad. Además de tu contraseña, necesitas un código temporal de una app o dispositivo físico.

### Tipos de MFA en AWS
1. **Virtual MFA (Recomendado)**: Apps como Google Authenticator, Authy, Microsoft Authenticator
2. **Hardware MFA**: YubiKey u otros tokens físicos
3. **SMS (No recomendado)**: Vulnerable a SIM swapping

### Configuración de seguridad esencial
1. **MFA en cuenta root**: OBLIGATORIO
2. **Password policy**: Mínimo 14 caracteres, mayúsculas, números, símbolos
3. **Billing alerts**: Notificaciones de costos
4. **CloudTrail**: Logging de todas las acciones API

### IAM Root vs IAM Users
- **Root Account**: Solo para tareas administrativas críticas (billing, cerrar cuenta)
- **IAM User**: Para trabajo diario - crear uno con MFA también

### Security Hub y Trusted Advisor
AWS te da herramientas gratuitas para auditar tu seguridad:
- **Security Hub**: Vista centralizada de alertas de seguridad
- **Trusted Advisor**: Recomendaciones de seguridad, performance y costos`,
      en: `## MFA and Initial Security in AWS

### What is MFA?
Multi-Factor Authentication adds a second layer of security. Besides your password, you need a temporary code from an app or physical device.

### Types of MFA in AWS
1. **Virtual MFA (Recommended)**: Apps like Google Authenticator, Authy, Microsoft Authenticator
2. **Hardware MFA**: YubiKey or other physical tokens
3. **SMS (Not recommended)**: Vulnerable to SIM swapping

### Essential security configuration
1. **MFA on root account**: MANDATORY
2. **Password policy**: Minimum 14 characters, uppercase, numbers, symbols
3. **Billing alerts**: Cost notifications
4. **CloudTrail**: Logging of all API actions

### IAM Root vs IAM Users
- **Root Account**: Only for critical administrative tasks (billing, close account)
- **IAM User**: For daily work - create one with MFA too

### Security Hub and Trusted Advisor
AWS gives you free tools to audit your security:
- **Security Hub**: Centralized view of security alerts
- **Trusted Advisor**: Security, performance and cost recommendations`,
      pt: `## MFA e Segurança Inicial na AWS

### O que é MFA?
Multi-Factor Authentication adiciona uma segunda camada de segurança. Além da sua senha, você precisa de um código temporário de um app ou dispositivo físico.

### Tipos de MFA na AWS
1. **Virtual MFA (Recomendado)**: Apps como Google Authenticator, Authy, Microsoft Authenticator
2. **Hardware MFA**: YubiKey ou outros tokens físicos
3. **SMS (Não recomendado)**: Vulnerável a SIM swapping

### Configuração de segurança essencial
1. **MFA na conta root**: OBRIGATÓRIO
2. **Password policy**: Mínimo 14 caracteres, maiúsculas, números, símbolos
3. **Billing alerts**: Notificações de custos
4. **CloudTrail**: Logging de todas as ações API

### IAM Root vs IAM Users
- **Root Account**: Somente para tarefas administrativas críticas (billing, fechar conta)
- **IAM User**: Para trabalho diário - criar um com MFA também

### Security Hub e Trusted Advisor
A AWS oferece ferramentas gratuitas para auditar sua segurança:
- **Security Hub**: Visão centralizada de alertas de segurança
- **Trusted Advisor**: Recomendações de segurança, performance e custos`
    },
    practicalTips: [
      {
        es: '📱 Usa Authy en lugar de Google Authenticator - permite backup y múltiples dispositivos',
        en: '📱 Use Authy instead of Google Authenticator - allows backup and multiple devices',
        pt: '📱 Use Authy em vez de Google Authenticator - permite backup e múltiplos dispositivos'
      },
      {
        es: '💾 GUARDA los códigos de recuperación de MFA en un lugar seguro (1Password, etc.)',
        en: '💾 SAVE MFA recovery codes in a safe place (1Password, etc.)',
        pt: '💾 GUARDE os códigos de recuperação do MFA em um lugar seguro (1Password, etc.)'
      },
      {
        es: '🔒 Considera una YubiKey si manejas datos sensibles o proyectos de producción',
        en: '🔒 Consider a YubiKey if you handle sensitive data or production projects',
        pt: '🔒 Considere uma YubiKey se você lida com dados sensíveis ou projetos de produção'
      }
    ],
    awsConsoleSteps: [
      {
        es: '1. Ve a IAM > Security credentials (como root)',
        en: '1. Go to IAM > Security credentials (as root)',
        pt: '1. Vá para IAM > Security credentials (como root)'
      },
      {
        es: '2. En "Multi-factor authentication (MFA)", click "Assign MFA device"',
        en: '2. In "Multi-factor authentication (MFA)", click "Assign MFA device"',
        pt: '2. Em "Multi-factor authentication (MFA)", clique em "Assign MFA device"'
      },
      {
        es: '3. Selecciona "Authenticator app" y dale un nombre (ej: "root-mfa")',
        en: '3. Select "Authenticator app" and give it a name (e.g., "root-mfa")',
        pt: '3. Selecione "Authenticator app" e dê um nome (ex: "root-mfa")'
      },
      {
        es: '4. Escanea el QR con tu app de autenticación',
        en: '4. Scan the QR with your authenticator app',
        pt: '4. Escaneie o QR com seu app de autenticação'
      },
      {
        es: '5. Ingresa 2 códigos consecutivos para verificar',
        en: '5. Enter 2 consecutive codes to verify',
        pt: '5. Digite 2 códigos consecutivos para verificar'
      },
      {
        es: '6. ¡MFA activado! Ahora ve a Billing > Budgets para crear alertas',
        en: '6. MFA enabled! Now go to Billing > Budgets to create alerts',
        pt: '6. MFA ativado! Agora vá para Billing > Budgets para criar alertas'
      }
    ],
    externalLinks: [
      {
        title: 'Enable MFA on AWS Account - Official Guide',
        url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_credentials_mfa_enable_virtual.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS Security Best Practices',
        url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
        type: 'aws_docs'
      },
      {
        title: 'Authy - Download (Recomendado)',
        url: 'https://authy.com/download/',
        type: 'tool'
      }
    ],
    checkpoint: {
      es: '✅ ¿Tienes MFA activado en root, y guardaste los códigos de recuperación en un lugar seguro?',
      en: '✅ Do you have MFA enabled on root, and saved recovery codes in a safe place?',
      pt: '✅ Você tem MFA ativado no root e guardou os códigos de recuperação em um lugar seguro?'
    },
    xpReward: 50,
    estimatedMinutes: 20,
    services: ['IAM', 'Security Hub']
  },

  // =====================================================
  // PASO 1.4: Crear usuario IAM para trabajo diario
  // =====================================================
  {
    id: 'aws-1-4',
    stepNumber: 4,
    title: {
      es: 'Crear usuario IAM para trabajo diario',
      en: 'Create IAM user for daily work',
      pt: 'Criar usuário IAM para trabalho diário'
    },
    description: {
      es: 'Crear un usuario IAM con permisos de administrador para tu trabajo diario, nunca uses root.',
      en: 'Create an IAM user with administrator permissions for your daily work, never use root.',
      pt: 'Criar um usuário IAM com permissões de administrador para seu trabalho diário, nunca use root.'
    },
    theory: {
      es: `## Crear tu Usuario IAM - Separación de Privilegios

### ¿Por qué no usar root?
- Root tiene permisos ILIMITADOS que no se pueden restringir
- Si comprometen root, pierdes TODO
- Algunas acciones solo pueden hacerse con root (intencionalmente limitado)
- Es una best practice universal en cloud security

### Tu primer usuario IAM
Crearemos un usuario con:
1. **Console access**: Para usar la web de AWS
2. **Programmatic access**: Para AWS CLI y SDKs
3. **AdministratorAccess**: Policy predefinida con (casi) todos los permisos
4. **MFA**: Sí, también en tu usuario IAM

### Estructura recomendada
\`\`\`
tu-cuenta-aws/
├── Root (solo emergencias, MFA activado)
├── IAM User: admin-tunombre (AdministratorAccess + MFA)
└── Futuros: service accounts, data-engineer, etc.
\`\`\`

### Access Keys vs Console Password
- **Console Password**: Para login web manual
- **Access Keys**: Para CLI y programático (ID + Secret)

### ⚠️ Nunca compartas access keys
Las access keys son como contraseñas. Nunca las comitas a Git, las envíes por email, o las pongas en código.`,
      en: `## Create your IAM User - Separation of Privileges

### Why not use root?
- Root has UNLIMITED permissions that cannot be restricted
- If root is compromised, you lose EVERYTHING
- Some actions can only be done with root (intentionally limited)
- It's a universal best practice in cloud security

### Your first IAM user
We'll create a user with:
1. **Console access**: To use the AWS web console
2. **Programmatic access**: For AWS CLI and SDKs
3. **AdministratorAccess**: Predefined policy with (almost) all permissions
4. **MFA**: Yes, also on your IAM user

### Recommended structure
\`\`\`
your-aws-account/
├── Root (emergencies only, MFA enabled)
├── IAM User: admin-yourname (AdministratorAccess + MFA)
└── Future: service accounts, data-engineer, etc.
\`\`\`

### Access Keys vs Console Password
- **Console Password**: For manual web login
- **Access Keys**: For CLI and programmatic use (ID + Secret)

### ⚠️ Never share access keys
Access keys are like passwords. Never commit them to Git, send them by email, or put them in code.`,
      pt: `## Criar seu Usuário IAM - Separação de Privilégios

### Por que não usar root?
- Root tem permissões ILIMITADAS que não podem ser restringidas
- Se o root for comprometido, você perde TUDO
- Algumas ações só podem ser feitas com root (intencionalmente limitado)
- É uma best practice universal em segurança cloud

### Seu primeiro usuário IAM
Criaremos um usuário com:
1. **Console access**: Para usar o console web da AWS
2. **Programmatic access**: Para AWS CLI e SDKs
3. **AdministratorAccess**: Policy predefinida com (quase) todas as permissões
4. **MFA**: Sim, também no seu usuário IAM

### Estrutura recomendada
\`\`\`
sua-conta-aws/
├── Root (somente emergências, MFA ativado)
├── IAM User: admin-seunome (AdministratorAccess + MFA)
└── Futuros: service accounts, data-engineer, etc.
\`\`\`

### Access Keys vs Console Password
- **Console Password**: Para login web manual
- **Access Keys**: Para CLI e uso programático (ID + Secret)

### ⚠️ Nunca compartilhe access keys
As access keys são como senhas. Nunca as faça commit no Git, envie por email ou coloque no código.`
    },
    practicalTips: [
      {
        es: '📝 Nombra tu usuario de forma clara: "admin-tunombre" o "tunombre-admin"',
        en: '📝 Name your user clearly: "admin-yourname" or "yourname-admin"',
        pt: '📝 Nomeie seu usuário de forma clara: "admin-seunome" ou "seunome-admin"'
      },
      {
        es: '🔑 Descarga el archivo CSV con las credenciales - es la ÚNICA vez que verás el Secret Access Key',
        en: '🔑 Download the CSV file with credentials - it\'s the ONLY time you\'ll see the Secret Access Key',
        pt: '🔑 Baixe o arquivo CSV com as credenciais - é a ÚNICA vez que você verá o Secret Access Key'
      },
      {
        es: '🛡️ Activa MFA en tu usuario IAM también, no solo en root',
        en: '🛡️ Enable MFA on your IAM user too, not just on root',
        pt: '🛡️ Ative MFA no seu usuário IAM também, não só no root'
      }
    ],
    codeExample: {
      language: 'bash',
      code: `# Una vez creado el usuario, configura AWS CLI
aws configure --profile my-admin

# Te pedirá:
# AWS Access Key ID [None]: AKIAIOSFODNN7EXAMPLE
# AWS Secret Access Key [None]: wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY
# Default region name [None]: us-east-1
# Default output format [None]: json

# Verifica que funciona
aws sts get-caller-identity --profile my-admin`,
      explanation: {
        es: 'Configura AWS CLI con el profile "my-admin" usando las credenciales del usuario IAM creado.',
        en: 'Configure AWS CLI with the "my-admin" profile using the credentials of the created IAM user.',
        pt: 'Configure AWS CLI com o profile "my-admin" usando as credenciais do usuário IAM criado.'
      }
    },
    awsConsoleSteps: [
      {
        es: '1. Ve a IAM > Users > Add users',
        en: '1. Go to IAM > Users > Add users',
        pt: '1. Vá para IAM > Users > Add users'
      },
      {
        es: '2. Nombre: "admin-tunombre", selecciona ambos tipos de acceso',
        en: '2. Name: "admin-yourname", select both access types',
        pt: '2. Nome: "admin-seunome", selecione ambos tipos de acesso'
      },
      {
        es: '3. En permisos, click "Attach existing policies directly"',
        en: '3. In permissions, click "Attach existing policies directly"',
        pt: '3. Em permissões, clique em "Attach existing policies directly"'
      },
      {
        es: '4. Busca y selecciona "AdministratorAccess"',
        en: '4. Search and select "AdministratorAccess"',
        pt: '4. Busque e selecione "AdministratorAccess"'
      },
      {
        es: '5. Salta tags (opcional), revisa y crea',
        en: '5. Skip tags (optional), review and create',
        pt: '5. Pule tags (opcional), revise e crie'
      },
      {
        es: '6. ¡IMPORTANTE! Descarga el CSV con las credenciales',
        en: '6. IMPORTANT! Download the CSV with credentials',
        pt: '6. IMPORTANTE! Baixe o CSV com as credenciais'
      },
      {
        es: '7. Activa MFA en el nuevo usuario (IAM > Users > tu-user > Security credentials)',
        en: '7. Enable MFA on the new user (IAM > Users > your-user > Security credentials)',
        pt: '7. Ative MFA no novo usuário (IAM > Users > seu-user > Security credentials)'
      }
    ],
    externalLinks: [
      {
        title: 'Creating IAM Users - AWS Documentation',
        url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/id_users_create.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS IAM Best Practices',
        url: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html',
        type: 'aws_docs'
      }
    ],
    checkpoint: {
      es: '✅ ¿Creaste usuario IAM con AdministratorAccess, descargaste las credenciales, y activaste MFA?',
      en: '✅ Did you create IAM user with AdministratorAccess, download credentials, and enable MFA?',
      pt: '✅ Você criou usuário IAM com AdministratorAccess, baixou as credenciais e ativou MFA?'
    },
    xpReward: 75,
    estimatedMinutes: 30,
    services: ['IAM']
  },

  // =====================================================
  // PASO 1.5: Entender regiones y zonas de disponibilidad
  // =====================================================
  {
    id: 'aws-1-5',
    stepNumber: 5,
    title: {
      es: 'Entender regiones y zonas de disponibilidad',
      en: 'Understand regions and availability zones',
      pt: 'Entender regiões e zonas de disponibilidade'
    },
    description: {
      es: 'Comprender la infraestructura global de AWS: regiones, AZs, edge locations, y cómo elegir dónde desplegar.',
      en: 'Understand AWS global infrastructure: regions, AZs, edge locations, and how to choose where to deploy.',
      pt: 'Compreender a infraestrutura global da AWS: regiões, AZs, edge locations e como escolher onde implantar.'
    },
    theory: {
      es: `## Infraestructura Global de AWS

### Conceptos clave
1. **Region**: Área geográfica con múltiples data centers (ej: us-east-1, eu-west-1)
2. **Availability Zone (AZ)**: Data centers aislados dentro de una región (ej: us-east-1a, us-east-1b)
3. **Edge Location**: Puntos de presencia para CDN (CloudFront) y DNS (Route 53)
4. **Local Zone**: Extensiones de regiones para latencia ultra-baja

### Regiones AWS (2024)
AWS tiene 33+ regiones globalmente:
- **América**: us-east-1 (Virginia), us-west-2 (Oregon), sa-east-1 (São Paulo)
- **Europa**: eu-west-1 (Irlanda), eu-central-1 (Frankfurt)
- **Asia**: ap-southeast-1 (Singapur), ap-northeast-1 (Tokyo)

### ¿Cómo elegir una región?
1. **Latencia**: Elige la más cercana a tus usuarios
2. **Precio**: us-east-1 suele ser 10-20% más barata
3. **Servicios**: No todos los servicios están en todas las regiones
4. **Compliance**: Algunas regulaciones exigen datos en regiones específicas (GDPR → EU)
5. **Disponibilidad de servicios nuevos**: us-east-1 los recibe primero

### Para Data Engineering
Generalmente usamos **us-east-1** porque:
- Tiene TODOS los servicios
- Precios más bajos
- Más capacity disponible
- Documentación y ejemplos usan esta región

### Multi-AZ vs Multi-Region
- **Multi-AZ**: Alta disponibilidad dentro de una región (Redshift, RDS)
- **Multi-Region**: Disaster recovery y presencia global (más costoso y complejo)`,
      en: `## AWS Global Infrastructure

### Key concepts
1. **Region**: Geographic area with multiple data centers (e.g., us-east-1, eu-west-1)
2. **Availability Zone (AZ)**: Isolated data centers within a region (e.g., us-east-1a, us-east-1b)
3. **Edge Location**: Points of presence for CDN (CloudFront) and DNS (Route 53)
4. **Local Zone**: Region extensions for ultra-low latency

### AWS Regions (2024)
AWS has 33+ regions globally:
- **Americas**: us-east-1 (Virginia), us-west-2 (Oregon), sa-east-1 (São Paulo)
- **Europe**: eu-west-1 (Ireland), eu-central-1 (Frankfurt)
- **Asia**: ap-southeast-1 (Singapore), ap-northeast-1 (Tokyo)

### How to choose a region?
1. **Latency**: Choose the one closest to your users
2. **Price**: us-east-1 is usually 10-20% cheaper
3. **Services**: Not all services are in all regions
4. **Compliance**: Some regulations require data in specific regions (GDPR → EU)
5. **New service availability**: us-east-1 gets them first

### For Data Engineering
We generally use **us-east-1** because:
- It has ALL services
- Lowest prices
- More capacity available
- Documentation and examples use this region

### Multi-AZ vs Multi-Region
- **Multi-AZ**: High availability within a region (Redshift, RDS)
- **Multi-Region**: Disaster recovery and global presence (more costly and complex)`,
      pt: `## Infraestrutura Global da AWS

### Conceitos-chave
1. **Region**: Área geográfica com múltiplos data centers (ex: us-east-1, eu-west-1)
2. **Availability Zone (AZ)**: Data centers isolados dentro de uma região (ex: us-east-1a, us-east-1b)
3. **Edge Location**: Pontos de presença para CDN (CloudFront) e DNS (Route 53)
4. **Local Zone**: Extensões de regiões para latência ultra-baixa

### Regiões AWS (2024)
A AWS tem 33+ regiões globalmente:
- **Américas**: us-east-1 (Virginia), us-west-2 (Oregon), sa-east-1 (São Paulo)
- **Europa**: eu-west-1 (Irlanda), eu-central-1 (Frankfurt)
- **Ásia**: ap-southeast-1 (Singapura), ap-northeast-1 (Tokyo)

### Como escolher uma região?
1. **Latência**: Escolha a mais próxima dos seus usuários
2. **Preço**: us-east-1 costuma ser 10-20% mais barata
3. **Serviços**: Nem todos os serviços estão em todas as regiões
4. **Compliance**: Algumas regulações exigem dados em regiões específicas (GDPR → EU)
5. **Disponibilidade de novos serviços**: us-east-1 recebe primeiro

### Para Data Engineering
Geralmente usamos **us-east-1** porque:
- Tem TODOS os serviços
- Preços mais baixos
- Mais capacity disponível
- Documentação e exemplos usam esta região

### Multi-AZ vs Multi-Region
- **Multi-AZ**: Alta disponibilidade dentro de uma região (Redshift, RDS)
- **Multi-Region**: Disaster recovery e presença global (mais custoso e complexo)`
    },
    practicalTips: [
      {
        es: '🌎 Usa us-east-1 para aprender - tiene todo y es más barato',
        en: '🌎 Use us-east-1 for learning - has everything and is cheaper',
        pt: '🌎 Use us-east-1 para aprender - tem tudo e é mais barato'
      },
      {
        es: '⚠️ SIEMPRE verifica en qué región estás antes de crear recursos',
        en: '⚠️ ALWAYS check which region you\'re in before creating resources',
        pt: '⚠️ SEMPRE verifique em qual região você está antes de criar recursos'
      },
      {
        es: '💰 Algunos recursos (S3, IAM) son globales, pero la mayoría son regionales',
        en: '💰 Some resources (S3, IAM) are global, but most are regional',
        pt: '💰 Alguns recursos (S3, IAM) são globais, mas a maioria é regional'
      }
    ],
    externalLinks: [
      {
        title: 'AWS Global Infrastructure Map',
        url: 'https://aws.amazon.com/about-aws/global-infrastructure/',
        type: 'aws_docs'
      },
      {
        title: 'AWS Regions and Endpoints',
        url: 'https://docs.aws.amazon.com/general/latest/gr/rande.html',
        type: 'aws_docs'
      },
      {
        title: 'Service Availability by Region',
        url: 'https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/',
        type: 'aws_docs'
      }
    ],
    checkpoint: {
      es: '✅ ¿Puedes explicar la diferencia entre región, AZ, y edge location? ¿Sabes por qué usamos us-east-1?',
      en: '✅ Can you explain the difference between region, AZ, and edge location? Do you know why we use us-east-1?',
      pt: '✅ Você consegue explicar a diferença entre região, AZ e edge location? Sabe por que usamos us-east-1?'
    },
    interviewTips: [
      {
        es: 'Pregunta común: "¿Cómo diseñarías para alta disponibilidad en AWS?" - Menciona Multi-AZ para HA y Multi-Region para DR',
        en: 'Common question: "How would you design for high availability in AWS?" - Mention Multi-AZ for HA and Multi-Region for DR',
        pt: 'Pergunta comum: "Como você projetaria para alta disponibilidade na AWS?" - Mencione Multi-AZ para HA e Multi-Region para DR'
      }
    ],
    xpReward: 50,
    estimatedMinutes: 25,
    services: ['AWS Global Infrastructure']
  },

  // =====================================================
  // PASO 1.6: Navegar la consola de AWS
  // =====================================================
  {
    id: 'aws-1-6',
    stepNumber: 6,
    title: {
      es: 'Navegar la consola de AWS con confianza',
      en: 'Navigate the AWS console confidently',
      pt: 'Navegar pelo console da AWS com confiança'
    },
    description: {
      es: 'Familiarizarte con la interfaz web de AWS, buscar servicios, y usar el Resource Groups.',
      en: 'Get familiar with the AWS web interface, search for services, and use Resource Groups.',
      pt: 'Familiarizar-se com a interface web da AWS, buscar serviços e usar Resource Groups.'
    },
    theory: {
      es: `## La Consola de AWS - Tu Centro de Control

### Elementos clave de la consola
1. **Barra de servicios**: Busca cualquier servicio con Ctrl/Cmd + S
2. **Selector de región**: Esquina superior derecha - MUY IMPORTANTE
3. **Account menu**: Tu usuario, billing, sign out
4. **CloudShell**: Terminal en el navegador con AWS CLI preinstalado

### Atajos útiles
- **Alt + S**: Búsqueda de servicios
- **CloudShell icon**: Terminal integrada
- **?**: Ayuda contextual en muchos servicios

### Servicios que usarás frecuentemente (Data Engineering)
1. **S3**: Almacenamiento de datos
2. **Glue**: ETL y Data Catalog
3. **Athena**: Queries SQL
4. **Redshift**: Data Warehouse
5. **IAM**: Permisos y seguridad
6. **CloudWatch**: Monitoring y logs

### Resource Groups y Tags
Los tags son metadata clave-valor que aplicas a recursos:
\`\`\`
Project: data-lake-prod
Environment: production
Owner: data-team
Cost-Center: analytics
\`\`\`

Resource Groups te permite ver todos los recursos con ciertos tags juntos.

### AWS Organizations (para empresas)
Permite gestionar múltiples cuentas AWS con:
- Facturación consolidada
- Service Control Policies (SCPs)
- Separación por ambiente (dev/staging/prod)`,
      en: `## The AWS Console - Your Control Center

### Key console elements
1. **Services bar**: Search any service with Ctrl/Cmd + S
2. **Region selector**: Top right corner - VERY IMPORTANT
3. **Account menu**: Your user, billing, sign out
4. **CloudShell**: Browser terminal with pre-installed AWS CLI

### Useful shortcuts
- **Alt + S**: Service search
- **CloudShell icon**: Integrated terminal
- **?**: Contextual help in many services

### Services you'll use frequently (Data Engineering)
1. **S3**: Data storage
2. **Glue**: ETL and Data Catalog
3. **Athena**: SQL queries
4. **Redshift**: Data Warehouse
5. **IAM**: Permissions and security
6. **CloudWatch**: Monitoring and logs

### Resource Groups and Tags
Tags are key-value metadata you apply to resources:
\`\`\`
Project: data-lake-prod
Environment: production
Owner: data-team
Cost-Center: analytics
\`\`\`

Resource Groups let you see all resources with certain tags together.

### AWS Organizations (for companies)
Allows managing multiple AWS accounts with:
- Consolidated billing
- Service Control Policies (SCPs)
- Environment separation (dev/staging/prod)`,
      pt: `## O Console da AWS - Seu Centro de Controle

### Elementos-chave do console
1. **Barra de serviços**: Busque qualquer serviço com Ctrl/Cmd + S
2. **Seletor de região**: Canto superior direito - MUITO IMPORTANTE
3. **Menu da conta**: Seu usuário, billing, sign out
4. **CloudShell**: Terminal no navegador com AWS CLI pré-instalado

### Atalhos úteis
- **Alt + S**: Busca de serviços
- **CloudShell icon**: Terminal integrado
- **?**: Ajuda contextual em muitos serviços

### Serviços que você usará frequentemente (Data Engineering)
1. **S3**: Armazenamento de dados
2. **Glue**: ETL e Data Catalog
3. **Athena**: Queries SQL
4. **Redshift**: Data Warehouse
5. **IAM**: Permissões e segurança
6. **CloudWatch**: Monitoring e logs

### Resource Groups e Tags
Tags são metadados chave-valor que você aplica aos recursos:
\`\`\`
Project: data-lake-prod
Environment: production
Owner: data-team
Cost-Center: analytics
\`\`\`

Resource Groups permitem ver todos os recursos com certas tags juntos.

### AWS Organizations (para empresas)
Permite gerenciar múltiplas contas AWS com:
- Faturamento consolidado
- Service Control Policies (SCPs)
- Separação por ambiente (dev/staging/prod)`
    },
    practicalTips: [
      {
        es: '⌨️ Usa Ctrl/Cmd + S para buscar servicios rápidamente - es el atajo más útil',
        en: '⌨️ Use Ctrl/Cmd + S to quickly search services - it\'s the most useful shortcut',
        pt: '⌨️ Use Ctrl/Cmd + S para buscar serviços rapidamente - é o atalho mais útil'
      },
      {
        es: '📌 Marca como favoritos los servicios que más usas (star icon)',
        en: '📌 Bookmark the services you use most (star icon)',
        pt: '📌 Marque como favoritos os serviços que mais usa (ícone de estrela)'
      },
      {
        es: '🏷️ Siempre tagea tus recursos - facilita tracking de costos y organización',
        en: '🏷️ Always tag your resources - makes cost tracking and organization easier',
        pt: '🏷️ Sempre coloque tags nos seus recursos - facilita tracking de custos e organização'
      }
    ],
    awsConsoleSteps: [
      {
        es: '1. Login con tu usuario IAM (no root)',
        en: '1. Login with your IAM user (not root)',
        pt: '1. Login com seu usuário IAM (não root)'
      },
      {
        es: '2. Verifica que estás en la región correcta (us-east-1)',
        en: '2. Verify you\'re in the correct region (us-east-1)',
        pt: '2. Verifique que está na região correta (us-east-1)'
      },
      {
        es: '3. Usa Ctrl+S para buscar "S3" y ábrelo',
        en: '3. Use Ctrl+S to search "S3" and open it',
        pt: '3. Use Ctrl+S para buscar "S3" e abra-o'
      },
      {
        es: '4. Marca S3, IAM, Glue, Athena como favoritos',
        en: '4. Bookmark S3, IAM, Glue, Athena as favorites',
        pt: '4. Marque S3, IAM, Glue, Athena como favoritos'
      },
      {
        es: '5. Abre CloudShell (icono de terminal) y ejecuta: aws sts get-caller-identity',
        en: '5. Open CloudShell (terminal icon) and run: aws sts get-caller-identity',
        pt: '5. Abra CloudShell (ícone de terminal) e execute: aws sts get-caller-identity'
      }
    ],
    externalLinks: [
      {
        title: 'Getting Started with the AWS Console',
        url: 'https://docs.aws.amazon.com/awsconsolehelpdocs/latest/gsg/getting-started.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS CloudShell Documentation',
        url: 'https://docs.aws.amazon.com/cloudshell/latest/userguide/welcome.html',
        type: 'aws_docs'
      },
      {
        title: 'Tagging Best Practices',
        url: 'https://docs.aws.amazon.com/whitepapers/latest/tagging-best-practices/tagging-best-practices.html',
        type: 'aws_docs'
      }
    ],
    checkpoint: {
      es: '✅ ¿Puedes navegar a S3, IAM, y Glue sin usar el buscador? ¿Funciona CloudShell?',
      en: '✅ Can you navigate to S3, IAM, and Glue without using the search? Does CloudShell work?',
      pt: '✅ Você consegue navegar para S3, IAM e Glue sem usar o buscador? O CloudShell funciona?'
    },
    xpReward: 40,
    estimatedMinutes: 20,
    services: ['Console', 'CloudShell', 'Resource Groups']
  },

  // =====================================================
  // PASO 1.7: Instalar y configurar AWS CLI
  // =====================================================
  {
    id: 'aws-1-7',
    stepNumber: 7,
    title: {
      es: 'Instalar y configurar AWS CLI',
      en: 'Install and configure AWS CLI',
      pt: 'Instalar e configurar AWS CLI'
    },
    description: {
      es: 'Instalar AWS CLI v2 en tu máquina local y configurar credenciales con profiles.',
      en: 'Install AWS CLI v2 on your local machine and configure credentials with profiles.',
      pt: 'Instalar AWS CLI v2 na sua máquina local e configurar credenciais com profiles.'
    },
    theory: {
      es: `## AWS CLI - Tu Herramienta de Línea de Comandos

### ¿Por qué necesitas AWS CLI?
- Automatización de tareas
- Scripts de despliegue
- Integración con CI/CD
- Más rápido que la consola para muchas operaciones

### Versiones de AWS CLI
- **v1**: Legacy, aún soportada
- **v2**: Recomendada - mejor performance, autocompletado, SSO

### Instalación por sistema operativo
**macOS (Homebrew)**:
\`\`\`bash
brew install awscli
\`\`\`

**Linux**:
\`\`\`bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
\`\`\`

**Windows**:
Descarga el MSI installer de la documentación oficial.

### Configuración con profiles
Los profiles te permiten manejar múltiples cuentas/roles:
\`\`\`
~/.aws/credentials
[default]
aws_access_key_id = AKIAEXAMPLE
aws_secret_access_key = wJalrXExample

[prod]
aws_access_key_id = AKIAPRODEXAMPLE
aws_secret_access_key = differentSecretKey

~/.aws/config
[default]
region = us-east-1
output = json

[profile prod]
region = us-east-1
output = json
\`\`\`

### Usando profiles
\`\`\`bash
# Usar profile específico
aws s3 ls --profile prod

# Cambiar profile por defecto temporal
export AWS_PROFILE=prod
aws s3 ls  # usa prod
\`\`\``,
      en: `## AWS CLI - Your Command Line Tool

### Why do you need AWS CLI?
- Task automation
- Deployment scripts
- CI/CD integration
- Faster than the console for many operations

### AWS CLI Versions
- **v1**: Legacy, still supported
- **v2**: Recommended - better performance, autocomplete, SSO

### Installation by operating system
**macOS (Homebrew)**:
\`\`\`bash
brew install awscli
\`\`\`

**Linux**:
\`\`\`bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
\`\`\`

**Windows**:
Download the MSI installer from official documentation.

### Configuration with profiles
Profiles let you manage multiple accounts/roles:
\`\`\`
~/.aws/credentials
[default]
aws_access_key_id = AKIAEXAMPLE
aws_secret_access_key = wJalrXExample

[prod]
aws_access_key_id = AKIAPRODEXAMPLE
aws_secret_access_key = differentSecretKey

~/.aws/config
[default]
region = us-east-1
output = json

[profile prod]
region = us-east-1
output = json
\`\`\`

### Using profiles
\`\`\`bash
# Use specific profile
aws s3 ls --profile prod

# Temporarily change default profile
export AWS_PROFILE=prod
aws s3 ls  # uses prod
\`\`\``,
      pt: `## AWS CLI - Sua Ferramenta de Linha de Comando

### Por que você precisa do AWS CLI?
- Automação de tarefas
- Scripts de deploy
- Integração com CI/CD
- Mais rápido que o console para muitas operações

### Versões do AWS CLI
- **v1**: Legacy, ainda suportada
- **v2**: Recomendada - melhor performance, autocompletar, SSO

### Instalação por sistema operacional
**macOS (Homebrew)**:
\`\`\`bash
brew install awscli
\`\`\`

**Linux**:
\`\`\`bash
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install
\`\`\`

**Windows**:
Baixe o instalador MSI da documentação oficial.

### Configuração com profiles
Os profiles permitem gerenciar múltiplas contas/roles:
\`\`\`
~/.aws/credentials
[default]
aws_access_key_id = AKIAEXAMPLE
aws_secret_access_key = wJalrXExample

[prod]
aws_access_key_id = AKIAPRODEXAMPLE
aws_secret_access_key = differentSecretKey

~/.aws/config
[default]
region = us-east-1
output = json

[profile prod]
region = us-east-1
output = json
\`\`\`

### Usando profiles
\`\`\`bash
# Usar profile específico
aws s3 ls --profile prod

# Mudar profile padrão temporariamente
export AWS_PROFILE=prod
aws s3 ls  # usa prod
\`\`\``
    },
    codeExample: {
      language: 'bash',
      code: `# Verificar instalación
aws --version
# aws-cli/2.x.x Python/3.x.x ...

# Configurar credenciales (interactivo)
aws configure
# AWS Access Key ID: [tu-access-key]
# AWS Secret Access Key: [tu-secret-key]
# Default region name: us-east-1
# Default output format: json

# Verificar configuración
aws sts get-caller-identity

# Respuesta esperada:
# {
#     "UserId": "AIDAEXAMPLEID",
#     "Account": "123456789012",
#     "Arn": "arn:aws:iam::123456789012:user/admin-tunombre"
# }

# Comandos útiles para empezar
aws s3 ls                          # Lista buckets S3
aws iam list-users                 # Lista usuarios IAM
aws ec2 describe-regions           # Lista regiones disponibles`,
      explanation: {
        es: 'Comandos básicos para verificar que AWS CLI está instalado y configurado correctamente.',
        en: 'Basic commands to verify that AWS CLI is installed and configured correctly.',
        pt: 'Comandos básicos para verificar que o AWS CLI está instalado e configurado corretamente.'
      }
    },
    practicalTips: [
      {
        es: '🔧 Instala aws-cli v2, no la v1 - tiene mejor autocompletado y rendimiento',
        en: '🔧 Install aws-cli v2, not v1 - has better autocomplete and performance',
        pt: '🔧 Instale aws-cli v2, não a v1 - tem melhor autocompletar e performance'
      },
      {
        es: '🛡️ Nunca pongas credenciales en código - usa profiles o variables de entorno',
        en: '🛡️ Never put credentials in code - use profiles or environment variables',
        pt: '🛡️ Nunca coloque credenciais no código - use profiles ou variáveis de ambiente'
      },
      {
        es: '⚡ Habilita autocompletado: complete -C aws_completer aws',
        en: '⚡ Enable autocomplete: complete -C aws_completer aws',
        pt: '⚡ Habilite autocompletar: complete -C aws_completer aws'
      }
    ],
    externalLinks: [
      {
        title: 'Installing AWS CLI v2',
        url: 'https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html',
        type: 'aws_docs'
      },
      {
        title: 'Configuring the AWS CLI',
        url: 'https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS CLI Command Reference',
        url: 'https://awscli.amazonaws.com/v2/documentation/api/latest/index.html',
        type: 'aws_docs'
      }
    ],
    cliCommands: [
      {
        command: 'aws configure list',
        explanation: {
          es: 'Muestra la configuración actual (profile, region, credentials)',
          en: 'Shows current configuration (profile, region, credentials)',
          pt: 'Mostra a configuração atual (profile, region, credentials)'
        }
      },
      {
        command: 'aws configure list-profiles',
        explanation: {
          es: 'Lista todos los profiles configurados',
          en: 'Lists all configured profiles',
          pt: 'Lista todos os profiles configurados'
        }
      }
    ],
    checkpoint: {
      es: '✅ ¿Puedes ejecutar "aws s3 ls" y "aws sts get-caller-identity" sin errores?',
      en: '✅ Can you run "aws s3 ls" and "aws sts get-caller-identity" without errors?',
      pt: '✅ Você consegue executar "aws s3 ls" e "aws sts get-caller-identity" sem erros?'
    },
    xpReward: 60,
    estimatedMinutes: 30,
    services: ['CLI']
  },

  // =====================================================
  // PASO 1.8: Configurar Billing Alerts
  // =====================================================
  {
    id: 'aws-1-8',
    stepNumber: 8,
    title: {
      es: 'Configurar Billing Alerts y Cost Explorer',
      en: 'Configure Billing Alerts and Cost Explorer',
      pt: 'Configurar Billing Alerts e Cost Explorer'
    },
    description: {
      es: 'Proteger tu billetera configurando alertas de costos y entendiendo cómo AWS cobra.',
      en: 'Protect your wallet by configuring cost alerts and understanding how AWS charges.',
      pt: 'Proteger sua carteira configurando alertas de custos e entendendo como a AWS cobra.'
    },
    theory: {
      es: `## Billing y Cost Management - Evita Sorpresas

### Cómo cobra AWS
AWS usa el modelo **pay-as-you-go**:
- Pagas por lo que usas
- Sin compromisos upfront (en la mayoría de servicios)
- Facturación mensual

### Componentes del costo en Data Engineering
1. **Compute**: Glue DPUs, EMR clusters, Lambda invocations
2. **Storage**: S3 (por GB/mes), Redshift (por nodo/hora)
3. **Data Transfer**: Entre regiones, hacia internet
4. **Requests**: API calls, S3 PUT/GET
5. **Query scanning**: Athena (por TB escaneado)

### AWS Budgets - Tu Primera Línea de Defensa
Crea presupuestos con alertas:
- **Cost Budget**: Alerta cuando gastes X USD
- **Usage Budget**: Alerta cuando uses X horas de EC2, etc.
- **Savings Plans**: Alerta sobre coverage

### Tipos de alertas recomendadas para aprendizaje
1. **$5 USD**: Primera alerta temprana
2. **$10 USD**: Revisa qué está costando
3. **$25 USD**: Para, revisa, y destruye recursos
4. **$50 USD**: Algo está muy mal - actúa inmediatamente

### Cost Explorer
Herramienta gratuita para analizar costos:
- Vista por servicio
- Vista por tag
- Forecast de costos
- Detección de anomalías

### ⚠️ Errores costosos comunes
1. **EMR cluster olvidado**: $100-500+/día fácilmente
2. **Redshift cluster**: $100+/día
3. **NAT Gateway con mucho tráfico**: $0.045/GB
4. **S3 Glacier retrieval**: Puede ser muy caro en urgente`,
      en: `## Billing and Cost Management - Avoid Surprises

### How AWS charges
AWS uses the **pay-as-you-go** model:
- You pay for what you use
- No upfront commitments (in most services)
- Monthly billing

### Cost components in Data Engineering
1. **Compute**: Glue DPUs, EMR clusters, Lambda invocations
2. **Storage**: S3 (per GB/month), Redshift (per node/hour)
3. **Data Transfer**: Between regions, to internet
4. **Requests**: API calls, S3 PUT/GET
5. **Query scanning**: Athena (per TB scanned)

### AWS Budgets - Your First Line of Defense
Create budgets with alerts:
- **Cost Budget**: Alert when you spend X USD
- **Usage Budget**: Alert when you use X hours of EC2, etc.
- **Savings Plans**: Alert about coverage

### Recommended alert types for learning
1. **$5 USD**: First early warning
2. **$10 USD**: Check what's costing
3. **$25 USD**: Stop, review, and destroy resources
4. **$50 USD**: Something is very wrong - act immediately

### Cost Explorer
Free tool to analyze costs:
- View by service
- View by tag
- Cost forecast
- Anomaly detection

### ⚠️ Common costly mistakes
1. **Forgotten EMR cluster**: $100-500+/day easily
2. **Redshift cluster**: $100+/day
3. **NAT Gateway with high traffic**: $0.045/GB
4. **S3 Glacier retrieval**: Can be very expensive when urgent`,
      pt: `## Billing e Cost Management - Evite Surpresas

### Como a AWS cobra
A AWS usa o modelo **pay-as-you-go**:
- Você paga pelo que usa
- Sem compromissos antecipados (na maioria dos serviços)
- Faturamento mensal

### Componentes do custo em Data Engineering
1. **Compute**: Glue DPUs, EMR clusters, Lambda invocations
2. **Storage**: S3 (por GB/mês), Redshift (por nó/hora)
3. **Data Transfer**: Entre regiões, para internet
4. **Requests**: API calls, S3 PUT/GET
5. **Query scanning**: Athena (por TB escaneado)

### AWS Budgets - Sua Primeira Linha de Defesa
Crie orçamentos com alertas:
- **Cost Budget**: Alerta quando gastar X USD
- **Usage Budget**: Alerta quando usar X horas de EC2, etc.
- **Savings Plans**: Alerta sobre coverage

### Tipos de alertas recomendadas para aprendizado
1. **$5 USD**: Primeiro alerta antecipado
2. **$10 USD**: Verifique o que está custando
3. **$25 USD**: Pare, revise e destrua recursos
4. **$50 USD**: Algo está muito errado - aja imediatamente

### Cost Explorer
Ferramenta gratuita para analisar custos:
- Visualização por serviço
- Visualização por tag
- Previsão de custos
- Detecção de anomalias

### ⚠️ Erros custosos comuns
1. **Cluster EMR esquecido**: $100-500+/dia facilmente
2. **Cluster Redshift**: $100+/dia
3. **NAT Gateway com muito tráfego**: $0.045/GB
4. **S3 Glacier retrieval**: Pode ser muito caro quando urgente`
    },
    practicalTips: [
      {
        es: '💰 Configura múltiples alertas: $5, $10, $25 - mejor prevenir que lamentar',
        en: '💰 Set up multiple alerts: $5, $10, $25 - better safe than sorry',
        pt: '💰 Configure múltiplos alertas: $5, $10, $25 - melhor prevenir do que remediar'
      },
      {
        es: '📊 Revisa Cost Explorer cada semana durante tu aprendizaje',
        en: '📊 Check Cost Explorer every week during your learning',
        pt: '📊 Revise Cost Explorer toda semana durante seu aprendizado'
      },
      {
        es: '🗑️ Siempre destruye los recursos después de cada práctica - usa tags para identificarlos',
        en: '🗑️ Always destroy resources after each practice - use tags to identify them',
        pt: '🗑️ Sempre destrua os recursos após cada prática - use tags para identificá-los'
      }
    ],
    awsConsoleSteps: [
      {
        es: '1. Ve a Billing Dashboard (icono de cuenta > Billing)',
        en: '1. Go to Billing Dashboard (account icon > Billing)',
        pt: '1. Vá para Billing Dashboard (ícone da conta > Billing)'
      },
      {
        es: '2. En el menú izquierdo, click "Budgets"',
        en: '2. In the left menu, click "Budgets"',
        pt: '2. No menu esquerdo, clique em "Budgets"'
      },
      {
        es: '3. Click "Create budget" > "Cost budget - Recommended"',
        en: '3. Click "Create budget" > "Cost budget - Recommended"',
        pt: '3. Clique em "Create budget" > "Cost budget - Recommended"'
      },
      {
        es: '4. Nombre: "Monthly-Learning-Budget", Amount: 10 USD',
        en: '4. Name: "Monthly-Learning-Budget", Amount: 10 USD',
        pt: '4. Nome: "Monthly-Learning-Budget", Amount: 10 USD'
      },
      {
        es: '5. Configura alertas al 50% ($5), 80% ($8), y 100% ($10)',
        en: '5. Configure alerts at 50% ($5), 80% ($8), and 100% ($10)',
        pt: '5. Configure alertas em 50% ($5), 80% ($8) e 100% ($10)'
      },
      {
        es: '6. Agrega tu email para recibir las alertas',
        en: '6. Add your email to receive alerts',
        pt: '6. Adicione seu email para receber os alertas'
      },
      {
        es: '7. Crea el budget y verifica que llegó email de confirmación',
        en: '7. Create the budget and verify confirmation email arrived',
        pt: '7. Crie o budget e verifique que chegou email de confirmação'
      }
    ],
    externalLinks: [
      {
        title: 'AWS Budgets User Guide',
        url: 'https://docs.aws.amazon.com/cost-management/latest/userguide/budgets-managing-costs.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS Cost Explorer',
        url: 'https://docs.aws.amazon.com/cost-management/latest/userguide/ce-what-is.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS Pricing Calculator',
        url: 'https://calculator.aws/',
        type: 'tool'
      }
    ],
    checkpoint: {
      es: '✅ ¿Tienes un budget de $10 con alertas al 50%, 80% y 100%? ¿Recibiste el email de confirmación?',
      en: '✅ Do you have a $10 budget with alerts at 50%, 80% and 100%? Did you receive the confirmation email?',
      pt: '✅ Você tem um budget de $10 com alertas em 50%, 80% e 100%? Recebeu o email de confirmação?'
    },
    xpReward: 50,
    estimatedMinutes: 25,
    services: ['Billing', 'Budgets', 'Cost Explorer']
  },

  // =====================================================
  // PASO 1.9: El ecosistema de servicios AWS para Data
  // =====================================================
  {
    id: 'aws-1-9',
    stepNumber: 9,
    title: {
      es: 'El ecosistema de servicios AWS para Data Engineering',
      en: 'The AWS service ecosystem for Data Engineering',
      pt: 'O ecossistema de serviços AWS para Data Engineering'
    },
    description: {
      es: 'Entender el mapa completo de servicios AWS para datos y cómo se conectan entre sí.',
      en: 'Understand the complete map of AWS services for data and how they connect to each other.',
      pt: 'Entender o mapa completo de serviços AWS para dados e como se conectam entre si.'
    },
    theory: {
      es: `## Mapa de Servicios AWS para Data Engineering

### Arquitectura típica de Data Lake en AWS
\`\`\`
Sources → Ingestion → Storage → Processing → Serving → Consumption
   ↓         ↓           ↓          ↓           ↓          ↓
Kinesis   Glue       S3         EMR        Athena    QuickSight
DMS       Firehose   Glacier    Glue       Redshift  BI Tools
API GW    AppFlow              Lambda     OpenSearch  Notebooks
\`\`\`

### Servicios por categoría

#### 🗄️ STORAGE
- **S3**: Object storage - el corazón del Data Lake
- **S3 Glacier**: Archivado de bajo costo
- **EFS**: File system para EC2/containers

#### 🔄 INGESTION
- **Kinesis Data Streams**: Streaming real-time
- **Kinesis Data Firehose**: Delivery a S3/Redshift
- **AWS DMS**: Database Migration Service
- **AWS AppFlow**: SaaS connectors (Salesforce, etc.)
- **AWS Transfer Family**: SFTP/FTPS to S3

#### ⚙️ PROCESSING
- **AWS Glue**: ETL serverless con PySpark
- **Amazon EMR**: Hadoop/Spark managed
- **AWS Lambda**: Serverless compute
- **AWS Step Functions**: Orchestration

#### 📊 ANALYTICS
- **Amazon Athena**: SQL serverless sobre S3
- **Amazon Redshift**: Data Warehouse
- **Amazon Redshift Spectrum**: Query S3 desde Redshift
- **Amazon OpenSearch**: Search y analytics

#### 🎯 CATALOG & GOVERNANCE
- **AWS Glue Data Catalog**: Metastore central
- **AWS Lake Formation**: Data Lake governance
- **AWS DataZone**: Data mesh / sharing

#### 📈 BI & VISUALIZATION
- **Amazon QuickSight**: BI serverless
- **Grafana managed**: Dashboards

#### 🔐 SECURITY
- **AWS IAM**: Identity & Access
- **AWS KMS**: Key management
- **AWS Secrets Manager**: Credentials
- **AWS CloudTrail**: Audit logs

### ¿Cuándo usar qué?
| Necesidad | Servicio Principal |
|-----------|-------------------|
| Almacenar datos raw | S3 Standard |
| ETL batch | Glue Jobs |
| ETL streaming | Kinesis + Lambda |
| SQL ad-hoc sobre S3 | Athena |
| Data Warehouse | Redshift |
| Big Data processing | EMR |
| Orquestación simple | Step Functions |
| Orquestación compleja | MWAA (Airflow) |`,
      en: `## AWS Services Map for Data Engineering

### Typical Data Lake Architecture in AWS
\`\`\`
Sources → Ingestion → Storage → Processing → Serving → Consumption
   ↓         ↓           ↓          ↓           ↓          ↓
Kinesis   Glue       S3         EMR        Athena    QuickSight
DMS       Firehose   Glacier    Glue       Redshift  BI Tools
API GW    AppFlow              Lambda     OpenSearch  Notebooks
\`\`\`

### Services by category

#### 🗄️ STORAGE
- **S3**: Object storage - the heart of the Data Lake
- **S3 Glacier**: Low-cost archival
- **EFS**: File system for EC2/containers

#### 🔄 INGESTION
- **Kinesis Data Streams**: Real-time streaming
- **Kinesis Data Firehose**: Delivery to S3/Redshift
- **AWS DMS**: Database Migration Service
- **AWS AppFlow**: SaaS connectors (Salesforce, etc.)
- **AWS Transfer Family**: SFTP/FTPS to S3

#### ⚙️ PROCESSING
- **AWS Glue**: Serverless ETL with PySpark
- **Amazon EMR**: Managed Hadoop/Spark
- **AWS Lambda**: Serverless compute
- **AWS Step Functions**: Orchestration

#### 📊 ANALYTICS
- **Amazon Athena**: Serverless SQL on S3
- **Amazon Redshift**: Data Warehouse
- **Amazon Redshift Spectrum**: Query S3 from Redshift
- **Amazon OpenSearch**: Search and analytics

#### 🎯 CATALOG & GOVERNANCE
- **AWS Glue Data Catalog**: Central metastore
- **AWS Lake Formation**: Data Lake governance
- **AWS DataZone**: Data mesh / sharing

#### 📈 BI & VISUALIZATION
- **Amazon QuickSight**: Serverless BI
- **Grafana managed**: Dashboards

#### 🔐 SECURITY
- **AWS IAM**: Identity & Access
- **AWS KMS**: Key management
- **AWS Secrets Manager**: Credentials
- **AWS CloudTrail**: Audit logs

### When to use what?
| Need | Primary Service |
|-----------|-------------------|
| Store raw data | S3 Standard |
| Batch ETL | Glue Jobs |
| Streaming ETL | Kinesis + Lambda |
| Ad-hoc SQL on S3 | Athena |
| Data Warehouse | Redshift |
| Big Data processing | EMR |
| Simple orchestration | Step Functions |
| Complex orchestration | MWAA (Airflow) |`,
      pt: `## Mapa de Serviços AWS para Data Engineering

### Arquitetura típica de Data Lake na AWS
\`\`\`
Sources → Ingestion → Storage → Processing → Serving → Consumption
   ↓         ↓           ↓          ↓           ↓          ↓
Kinesis   Glue       S3         EMR        Athena    QuickSight
DMS       Firehose   Glacier    Glue       Redshift  BI Tools
API GW    AppFlow              Lambda     OpenSearch  Notebooks
\`\`\`

### Serviços por categoria

#### 🗄️ STORAGE
- **S3**: Object storage - o coração do Data Lake
- **S3 Glacier**: Arquivamento de baixo custo
- **EFS**: File system para EC2/containers

#### 🔄 INGESTION
- **Kinesis Data Streams**: Streaming real-time
- **Kinesis Data Firehose**: Entrega para S3/Redshift
- **AWS DMS**: Database Migration Service
- **AWS AppFlow**: Conectores SaaS (Salesforce, etc.)
- **AWS Transfer Family**: SFTP/FTPS para S3

#### ⚙️ PROCESSING
- **AWS Glue**: ETL serverless com PySpark
- **Amazon EMR**: Hadoop/Spark gerenciado
- **AWS Lambda**: Compute serverless
- **AWS Step Functions**: Orquestração

#### 📊 ANALYTICS
- **Amazon Athena**: SQL serverless sobre S3
- **Amazon Redshift**: Data Warehouse
- **Amazon Redshift Spectrum**: Query S3 do Redshift
- **Amazon OpenSearch**: Search e analytics

#### 🎯 CATALOG & GOVERNANCE
- **AWS Glue Data Catalog**: Metastore central
- **AWS Lake Formation**: Governança de Data Lake
- **AWS DataZone**: Data mesh / compartilhamento

#### 📈 BI & VISUALIZAÇÃO
- **Amazon QuickSight**: BI serverless
- **Grafana managed**: Dashboards

#### 🔐 SEGURANÇA
- **AWS IAM**: Identity & Access
- **AWS KMS**: Gerenciamento de chaves
- **AWS Secrets Manager**: Credenciais
- **AWS CloudTrail**: Logs de auditoria

### Quando usar o quê?
| Necessidade | Serviço Principal |
|-----------|-------------------|
| Armazenar dados raw | S3 Standard |
| ETL batch | Glue Jobs |
| ETL streaming | Kinesis + Lambda |
| SQL ad-hoc sobre S3 | Athena |
| Data Warehouse | Redshift |
| Big Data processing | EMR |
| Orquestração simples | Step Functions |
| Orquestração complexa | MWAA (Airflow) |`
    },
    practicalTips: [
      {
        es: '🗺️ Guarda este mapa de servicios - lo consultarás constantemente',
        en: '🗺️ Save this services map - you\'ll consult it constantly',
        pt: '🗺️ Guarde este mapa de serviços - você consultará constantemente'
      },
      {
        es: '🎯 El 80% de tu trabajo será con: S3 + Glue + Athena + (Redshift o EMR)',
        en: '🎯 80% of your work will be with: S3 + Glue + Athena + (Redshift or EMR)',
        pt: '🎯 80% do seu trabalho será com: S3 + Glue + Athena + (Redshift ou EMR)'
      },
      {
        es: '💡 Cuando tengas dudas sobre qué servicio usar, pregunta: "¿Es batch o streaming? ¿Es serverless o necesito control?"',
        en: '💡 When in doubt about which service to use, ask: "Is it batch or streaming? Is it serverless or do I need control?"',
        pt: '💡 Quando tiver dúvidas sobre qual serviço usar, pergunte: "É batch ou streaming? É serverless ou preciso de controle?"'
      }
    ],
    externalLinks: [
      {
        title: 'AWS Analytics Services Overview',
        url: 'https://aws.amazon.com/big-data/datalakes-and-analytics/',
        type: 'aws_docs'
      },
      {
        title: 'AWS Data Lakes Reference Architecture',
        url: 'https://docs.aws.amazon.com/whitepapers/latest/building-data-lakes/building-data-lake-aws.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS Well-Architected Framework - Analytics Lens',
        url: 'https://docs.aws.amazon.com/wellarchitected/latest/analytics-lens/welcome.html',
        type: 'aws_docs'
      },
      {
        title: 'AWS Architecture Icons (para diagramas)',
        url: 'https://aws.amazon.com/architecture/icons/',
        type: 'tool'
      }
    ],
    checkpoint: {
      es: '✅ ¿Puedes dibujar un diagrama básico de Data Lake en AWS nombrando al menos 8 servicios y su propósito?',
      en: '✅ Can you draw a basic Data Lake diagram in AWS naming at least 8 services and their purpose?',
      pt: '✅ Você consegue desenhar um diagrama básico de Data Lake na AWS nomeando pelo menos 8 serviços e seu propósito?'
    },
    interviewTips: [
      {
        es: 'Pregunta de diseño muy común: "Diseña un Data Lake en AWS para procesar logs de aplicaciones" - Usa este mapa como base',
        en: 'Very common design question: "Design a Data Lake in AWS to process application logs" - Use this map as a base',
        pt: 'Pergunta de design muito comum: "Projete um Data Lake na AWS para processar logs de aplicações" - Use este mapa como base'
      }
    ],
    certificationNotes: {
      es: 'Este mapa de servicios es FUNDAMENTAL para la certificación. El examen pregunta constantemente "¿Qué servicio usarías para X?"',
      en: 'This services map is FUNDAMENTAL for certification. The exam constantly asks "Which service would you use for X?"',
      pt: 'Este mapa de serviços é FUNDAMENTAL para a certificação. O exame pergunta constantemente "Qual serviço você usaria para X?"'
    },
    xpReward: 75,
    estimatedMinutes: 45,
    services: ['All Data Services']
  }
];








