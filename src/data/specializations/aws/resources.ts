/**
 * RECURSOS EXTERNOS AWS DATA ENGINEERING
 * Links verificados a documentación oficial, cursos y herramientas
 */

export interface AWSResource {
  id: string;
  title: string;
  description: {
    es: string;
    en: string;
    pt: string;
  };
  url: string;
  type: 'docs' | 'video' | 'course' | 'tool' | 'article' | 'github' | 'certification';
  service?: string;
  free: boolean;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
}

export const awsResources: AWSResource[] = [
  // === DOCUMENTACIÓN OFICIAL AWS ===
  {
    id: 'aws-docs-s3',
    title: 'Amazon S3 User Guide',
    description: {
      es: 'Documentación oficial completa de S3 incluyendo best practices para Data Lakes.',
      en: 'Complete official S3 documentation including Data Lakes best practices.',
      pt: 'Documentação oficial completa do S3 incluindo melhores práticas para Data Lakes.'
    },
    url: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/',
    type: 'docs',
    service: 'S3',
    free: true,
    difficulty: 'beginner',
    tags: ['s3', 'storage', 'datalake']
  },
  {
    id: 'aws-docs-glue',
    title: 'AWS Glue Developer Guide',
    description: {
      es: 'Guía completa de Glue: ETL, Data Catalog, crawlers, y PySpark.',
      en: 'Complete Glue guide: ETL, Data Catalog, crawlers, and PySpark.',
      pt: 'Guia completo do Glue: ETL, Data Catalog, crawlers e PySpark.'
    },
    url: 'https://docs.aws.amazon.com/glue/latest/dg/',
    type: 'docs',
    service: 'Glue',
    free: true,
    difficulty: 'intermediate',
    tags: ['glue', 'etl', 'pyspark']
  },
  {
    id: 'aws-docs-athena',
    title: 'Amazon Athena User Guide',
    description: {
      es: 'Documentación de Athena con optimización de queries y federated queries.',
      en: 'Athena documentation with query optimization and federated queries.',
      pt: 'Documentação do Athena com otimização de queries e federated queries.'
    },
    url: 'https://docs.aws.amazon.com/athena/latest/ug/',
    type: 'docs',
    service: 'Athena',
    free: true,
    difficulty: 'intermediate',
    tags: ['athena', 'sql', 'serverless']
  },
  {
    id: 'aws-docs-redshift',
    title: 'Amazon Redshift Database Developer Guide',
    description: {
      es: 'Guía de desarrollo para Redshift incluyendo tuning y Spectrum.',
      en: 'Development guide for Redshift including tuning and Spectrum.',
      pt: 'Guia de desenvolvimento para Redshift incluindo tuning e Spectrum.'
    },
    url: 'https://docs.aws.amazon.com/redshift/latest/dg/',
    type: 'docs',
    service: 'Redshift',
    free: true,
    difficulty: 'advanced',
    tags: ['redshift', 'warehouse', 'sql']
  },
  {
    id: 'aws-docs-kinesis',
    title: 'Amazon Kinesis Data Streams Developer Guide',
    description: {
      es: 'Documentación de Kinesis para ingesta de streaming en tiempo real.',
      en: 'Kinesis documentation for real-time streaming ingestion.',
      pt: 'Documentação do Kinesis para ingestão de streaming em tempo real.'
    },
    url: 'https://docs.aws.amazon.com/streams/latest/dev/',
    type: 'docs',
    service: 'Kinesis',
    free: true,
    difficulty: 'intermediate',
    tags: ['kinesis', 'streaming', 'real-time']
  },
  {
    id: 'aws-docs-emr',
    title: 'Amazon EMR Management Guide',
    description: {
      es: 'Guía de EMR para procesamiento Big Data con Spark, Hive y Presto.',
      en: 'EMR guide for Big Data processing with Spark, Hive, and Presto.',
      pt: 'Guia do EMR para processamento Big Data com Spark, Hive e Presto.'
    },
    url: 'https://docs.aws.amazon.com/emr/latest/ManagementGuide/',
    type: 'docs',
    service: 'EMR',
    free: true,
    difficulty: 'advanced',
    tags: ['emr', 'spark', 'bigdata']
  },
  {
    id: 'aws-docs-stepfunctions',
    title: 'AWS Step Functions Developer Guide',
    description: {
      es: 'Guía de Step Functions para orquestación de workflows de datos.',
      en: 'Step Functions guide for data workflow orchestration.',
      pt: 'Guia do Step Functions para orquestração de workflows de dados.'
    },
    url: 'https://docs.aws.amazon.com/step-functions/latest/dg/',
    type: 'docs',
    service: 'Step Functions',
    free: true,
    difficulty: 'intermediate',
    tags: ['stepfunctions', 'orchestration', 'serverless']
  },
  {
    id: 'aws-docs-lakeformation',
    title: 'AWS Lake Formation Developer Guide',
    description: {
      es: 'Documentación de Lake Formation para governance de Data Lakes.',
      en: 'Lake Formation documentation for Data Lake governance.',
      pt: 'Documentação do Lake Formation para governance de Data Lakes.'
    },
    url: 'https://docs.aws.amazon.com/lake-formation/latest/dg/',
    type: 'docs',
    service: 'Lake Formation',
    free: true,
    difficulty: 'advanced',
    tags: ['lakeformation', 'governance', 'security']
  },

  // === WHITEPAPERS Y BEST PRACTICES ===
  {
    id: 'aws-whitepaper-datalake',
    title: 'Building Data Lakes on AWS',
    description: {
      es: 'Whitepaper oficial de arquitectura de Data Lakes en AWS.',
      en: 'Official whitepaper on Data Lake architecture on AWS.',
      pt: 'Whitepaper oficial de arquitetura de Data Lakes na AWS.'
    },
    url: 'https://docs.aws.amazon.com/whitepapers/latest/building-data-lakes/building-data-lake-aws.html',
    type: 'docs',
    free: true,
    difficulty: 'intermediate',
    tags: ['datalake', 'architecture', 'whitepaper']
  },
  {
    id: 'aws-whitepaper-analytics',
    title: 'AWS Well-Architected Framework - Analytics Lens',
    description: {
      es: 'Best practices para arquitecturas de analytics en AWS.',
      en: 'Best practices for analytics architectures on AWS.',
      pt: 'Melhores práticas para arquiteturas de analytics na AWS.'
    },
    url: 'https://docs.aws.amazon.com/wellarchitected/latest/analytics-lens/welcome.html',
    type: 'docs',
    free: true,
    difficulty: 'advanced',
    tags: ['wellarchitected', 'analytics', 'bestpractices']
  },
  {
    id: 'aws-whitepaper-streaming',
    title: 'Streaming Data Solutions on AWS',
    description: {
      es: 'Guía de arquitecturas de streaming en AWS.',
      en: 'Guide to streaming architectures on AWS.',
      pt: 'Guia de arquiteturas de streaming na AWS.'
    },
    url: 'https://aws.amazon.com/streaming-data/',
    type: 'docs',
    free: true,
    difficulty: 'intermediate',
    tags: ['streaming', 'architecture', 'kinesis']
  },

  // === CURSOS GRATUITOS ===
  {
    id: 'aws-skillbuilder',
    title: 'AWS Skill Builder',
    description: {
      es: 'Plataforma de aprendizaje oficial de AWS con cursos gratuitos.',
      en: 'Official AWS learning platform with free courses.',
      pt: 'Plataforma de aprendizado oficial da AWS com cursos gratuitos.'
    },
    url: 'https://skillbuilder.aws/',
    type: 'course',
    free: true,
    difficulty: 'beginner',
    tags: ['learning', 'training', 'certification']
  },
  {
    id: 'aws-skillbuilder-analytics',
    title: 'Data Analytics Learning Plan - Skill Builder',
    description: {
      es: 'Learning path gratuito para Data Analytics en AWS.',
      en: 'Free learning path for Data Analytics on AWS.',
      pt: 'Learning path gratuito para Data Analytics na AWS.'
    },
    url: 'https://explore.skillbuilder.aws/learn/learning_plan/view/97/data-analytics-learning-plan',
    type: 'course',
    free: true,
    difficulty: 'intermediate',
    tags: ['learning', 'analytics', 'certification']
  },
  {
    id: 'aws-workshops',
    title: 'AWS Workshops - Analytics',
    description: {
      es: 'Workshops hands-on gratuitos de AWS para analytics y data.',
      en: 'Free hands-on AWS workshops for analytics and data.',
      pt: 'Workshops hands-on gratuitos da AWS para analytics e dados.'
    },
    url: 'https://workshops.aws/categories/Analytics',
    type: 'course',
    free: true,
    difficulty: 'intermediate',
    tags: ['workshop', 'handson', 'analytics']
  },

  // === CURSOS DE PAGO RECOMENDADOS ===
  {
    id: 'udemy-stephane-maarek',
    title: 'AWS Certified Data Analytics Specialty - Stephane Maarek',
    description: {
      es: 'Curso top-rated para preparar la certificación DAS-C01.',
      en: 'Top-rated course to prepare for DAS-C01 certification.',
      pt: 'Curso top-rated para preparar a certificação DAS-C01.'
    },
    url: 'https://www.udemy.com/course/aws-data-analytics/',
    type: 'course',
    free: false,
    difficulty: 'intermediate',
    tags: ['certification', 'course', 'udemy']
  },
  {
    id: 'tutorials-dojo-practice',
    title: 'Tutorials Dojo - DAS-C01 Practice Exams',
    description: {
      es: 'Exámenes de práctica de alta calidad para la certificación.',
      en: 'High-quality practice exams for certification.',
      pt: 'Exames de prática de alta qualidade para a certificação.'
    },
    url: 'https://tutorialsdojo.com/courses/aws-certified-data-analytics-specialty-practice-exams/',
    type: 'course',
    free: false,
    difficulty: 'intermediate',
    tags: ['certification', 'practice', 'exam']
  },

  // === VIDEOS Y YOUTUBE ===
  {
    id: 'youtube-reinvent-analytics',
    title: 'AWS re:Invent Analytics Sessions',
    description: {
      es: 'Sesiones de re:Invent sobre Data Analytics y Big Data.',
      en: 'AWS re:Invent sessions on Data Analytics and Big Data.',
      pt: 'Sessões do re:Invent sobre Data Analytics e Big Data.'
    },
    url: 'https://www.youtube.com/playlist?list=PLhr1KZpdzukcaA06WloeNmGlnM_f1LrdP',
    type: 'video',
    free: true,
    difficulty: 'advanced',
    tags: ['reinvent', 'conference', 'analytics']
  },
  {
    id: 'youtube-aws-online-tech-talks',
    title: 'AWS Online Tech Talks - Analytics',
    description: {
      es: 'Webinars técnicos de AWS sobre servicios de analytics.',
      en: 'AWS technical webinars on analytics services.',
      pt: 'Webinars técnicos da AWS sobre serviços de analytics.'
    },
    url: 'https://aws.amazon.com/events/online-tech-talks/on-demand/?ott-on-demand-all.sort-by=item.additionalFields.startDateTime&ott-on-demand-all.sort-order=desc&awsf.ott-on-demand-master-category=categories%23analytics',
    type: 'video',
    free: true,
    difficulty: 'intermediate',
    tags: ['webinar', 'techtalks', 'analytics']
  },

  // === HERRAMIENTAS ===
  {
    id: 'tool-aws-cli',
    title: 'AWS CLI v2',
    description: {
      es: 'CLI oficial de AWS para gestión desde terminal.',
      en: 'Official AWS CLI for terminal management.',
      pt: 'CLI oficial da AWS para gestão via terminal.'
    },
    url: 'https://aws.amazon.com/cli/',
    type: 'tool',
    free: true,
    difficulty: 'beginner',
    tags: ['cli', 'tool', 'automation']
  },
  {
    id: 'tool-terraform-aws',
    title: 'Terraform AWS Provider',
    description: {
      es: 'Provider de Terraform para Infrastructure as Code en AWS.',
      en: 'Terraform provider for Infrastructure as Code on AWS.',
      pt: 'Provider do Terraform para Infrastructure as Code na AWS.'
    },
    url: 'https://registry.terraform.io/providers/hashicorp/aws/latest/docs',
    type: 'tool',
    free: true,
    difficulty: 'intermediate',
    tags: ['terraform', 'iac', 'devops']
  },
  {
    id: 'tool-aws-cdk',
    title: 'AWS CDK',
    description: {
      es: 'Cloud Development Kit para definir infraestructura con código.',
      en: 'Cloud Development Kit to define infrastructure with code.',
      pt: 'Cloud Development Kit para definir infraestrutura com código.'
    },
    url: 'https://docs.aws.amazon.com/cdk/latest/guide/',
    type: 'tool',
    free: true,
    difficulty: 'intermediate',
    tags: ['cdk', 'iac', 'typescript']
  },
  {
    id: 'tool-boto3',
    title: 'Boto3 - AWS SDK for Python',
    description: {
      es: 'SDK oficial de Python para AWS.',
      en: 'Official Python SDK for AWS.',
      pt: 'SDK oficial de Python para AWS.'
    },
    url: 'https://boto3.amazonaws.com/v1/documentation/api/latest/index.html',
    type: 'tool',
    free: true,
    difficulty: 'beginner',
    tags: ['python', 'sdk', 'automation']
  },
  {
    id: 'tool-aws-sam',
    title: 'AWS SAM - Serverless Application Model',
    description: {
      es: 'Framework para desarrollo y deploy de aplicaciones serverless.',
      en: 'Framework for serverless application development and deployment.',
      pt: 'Framework para desenvolvimento e deploy de aplicações serverless.'
    },
    url: 'https://docs.aws.amazon.com/serverless-application-model/',
    type: 'tool',
    free: true,
    difficulty: 'intermediate',
    tags: ['sam', 'serverless', 'lambda']
  },

  // === GITHUB REPOS ===
  {
    id: 'github-aws-samples',
    title: 'AWS Samples - GitHub',
    description: {
      es: 'Repositorio oficial con ejemplos de código de AWS.',
      en: 'Official repository with AWS code samples.',
      pt: 'Repositório oficial com exemplos de código da AWS.'
    },
    url: 'https://github.com/aws-samples',
    type: 'github',
    free: true,
    difficulty: 'intermediate',
    tags: ['samples', 'code', 'github']
  },
  {
    id: 'github-aws-glue-samples',
    title: 'AWS Glue Samples',
    description: {
      es: 'Ejemplos de scripts y jobs de Glue.',
      en: 'Glue scripts and jobs examples.',
      pt: 'Exemplos de scripts e jobs do Glue.'
    },
    url: 'https://github.com/aws-samples/aws-glue-samples',
    type: 'github',
    service: 'Glue',
    free: true,
    difficulty: 'intermediate',
    tags: ['glue', 'samples', 'pyspark']
  },
  {
    id: 'github-datalake-cfn',
    title: 'AWS Data Lake CloudFormation Templates',
    description: {
      es: 'Templates de CloudFormation para Data Lakes.',
      en: 'CloudFormation templates for Data Lakes.',
      pt: 'Templates de CloudFormation para Data Lakes.'
    },
    url: 'https://github.com/awslabs/aws-data-lake-solution',
    type: 'github',
    free: true,
    difficulty: 'advanced',
    tags: ['datalake', 'cloudformation', 'iac']
  },
  {
    id: 'github-system-design-primer',
    title: 'System Design Primer',
    description: {
      es: 'Guía completa de diseño de sistemas (no específico AWS pero muy útil).',
      en: 'Complete system design guide (not AWS-specific but very useful).',
      pt: 'Guia completo de design de sistemas (não específico da AWS mas muito útil).'
    },
    url: 'https://github.com/donnemartin/system-design-primer',
    type: 'github',
    free: true,
    difficulty: 'advanced',
    tags: ['systemdesign', 'architecture', 'interview']
  },

  // === CERTIFICACIÓN ===
  {
    id: 'cert-das-c01',
    title: 'AWS Certified Data Analytics - Specialty',
    description: {
      es: 'Página oficial de la certificación DAS-C01.',
      en: 'Official page for DAS-C01 certification.',
      pt: 'Página oficial da certificação DAS-C01.'
    },
    url: 'https://aws.amazon.com/certification/certified-data-analytics-specialty/',
    type: 'certification',
    free: true,
    difficulty: 'advanced',
    tags: ['certification', 'das-c01', 'exam']
  },
  {
    id: 'cert-das-exam-guide',
    title: 'DAS-C01 Exam Guide (PDF)',
    description: {
      es: 'Guía oficial del examen con dominios y porcentajes.',
      en: 'Official exam guide with domains and percentages.',
      pt: 'Guia oficial do exame com domínios e porcentagens.'
    },
    url: 'https://d1.awsstatic.com/training-and-certification/docs-data-analytics-specialty/AWS-Certified-Data-Analytics-Specialty_Exam-Guide.pdf',
    type: 'certification',
    free: true,
    difficulty: 'advanced',
    tags: ['certification', 'examguide', 'das-c01']
  },
  {
    id: 'cert-das-sample-questions',
    title: 'DAS-C01 Sample Questions',
    description: {
      es: 'Preguntas de ejemplo oficiales del examen.',
      en: 'Official exam sample questions.',
      pt: 'Perguntas de exemplo oficiais do exame.'
    },
    url: 'https://d1.awsstatic.com/training-and-certification/docs-data-analytics-specialty/AWS-Certified-Data-Analytics-Specialty_Sample-Questions.pdf',
    type: 'certification',
    free: true,
    difficulty: 'advanced',
    tags: ['certification', 'practice', 'das-c01']
  },

  // === BLOGS Y ARTÍCULOS ===
  {
    id: 'blog-aws-big-data',
    title: 'AWS Big Data Blog',
    description: {
      es: 'Blog oficial de AWS sobre Big Data y Analytics.',
      en: 'Official AWS blog about Big Data and Analytics.',
      pt: 'Blog oficial da AWS sobre Big Data e Analytics.'
    },
    url: 'https://aws.amazon.com/blogs/big-data/',
    type: 'article',
    free: true,
    difficulty: 'intermediate',
    tags: ['blog', 'bigdata', 'analytics']
  },
  {
    id: 'blog-aws-architecture',
    title: 'AWS Architecture Blog',
    description: {
      es: 'Blog de arquitecturas y patrones en AWS.',
      en: 'Blog about architectures and patterns on AWS.',
      pt: 'Blog de arquiteturas e padrões na AWS.'
    },
    url: 'https://aws.amazon.com/blogs/architecture/',
    type: 'article',
    free: true,
    difficulty: 'advanced',
    tags: ['blog', 'architecture', 'patterns']
  },
  {
    id: 'blog-repost',
    title: 'AWS re:Post Community',
    description: {
      es: 'Comunidad de preguntas y respuestas de AWS.',
      en: 'AWS questions and answers community.',
      pt: 'Comunidade de perguntas e respostas da AWS.'
    },
    url: 'https://repost.aws/',
    type: 'article',
    free: true,
    difficulty: 'beginner',
    tags: ['community', 'qa', 'support']
  }
];

// Helper para obtener recursos por tipo
export const getResourcesByType = (type: AWSResource['type']): AWSResource[] => {
  return awsResources.filter(r => r.type === type);
};

// Helper para obtener recursos por servicio
export const getResourcesByService = (service: string): AWSResource[] => {
  return awsResources.filter(r => r.service === service);
};

// Helper para obtener recursos gratuitos
export const getFreeResources = (): AWSResource[] => {
  return awsResources.filter(r => r.free);
};

// Estadísticas
export const resourceStats = {
  total: awsResources.length,
  free: awsResources.filter(r => r.free).length,
  byType: {
    docs: awsResources.filter(r => r.type === 'docs').length,
    video: awsResources.filter(r => r.type === 'video').length,
    course: awsResources.filter(r => r.type === 'course').length,
    tool: awsResources.filter(r => r.type === 'tool').length,
    article: awsResources.filter(r => r.type === 'article').length,
    github: awsResources.filter(r => r.type === 'github').length,
    certification: awsResources.filter(r => r.type === 'certification').length
  }
};








