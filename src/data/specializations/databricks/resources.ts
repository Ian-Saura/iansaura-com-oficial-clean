/**
 * Databricks External Resources
 * Recursos externos verificados para aprender Databricks
 * 
 * ACTUALIZADO: Enero 2026 - Free Edition (reemplaza Community Edition)
 */

export interface DatabricksResource {
  id: string;
  title: string;
  url: string;
  type: 'docs' | 'video' | 'course' | 'book' | 'tool' | 'article' | 'practice';
  category: string;
  description: { es: string; en: string; pt: string };
  free: boolean;
  recommended: boolean;
}

export const DATABRICKS_RESOURCES: DatabricksResource[] = [
  // =====================================================
  // DOCUMENTACIÓN OFICIAL
  // =====================================================
  {
    id: 'res-docs-1',
    title: 'Databricks Documentation',
    url: 'https://docs.databricks.com/',
    type: 'docs',
    category: 'official',
    description: {
      es: 'Documentación oficial completa de Databricks',
      en: 'Complete official Databricks documentation',
      pt: 'Documentação oficial completa do Databricks'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-docs-2',
    title: 'Delta Lake Documentation',
    url: 'https://docs.delta.io/',
    type: 'docs',
    category: 'official',
    description: {
      es: 'Documentación oficial de Delta Lake',
      en: 'Official Delta Lake documentation',
      pt: 'Documentação oficial do Delta Lake'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-docs-3',
    title: 'Apache Spark Documentation',
    url: 'https://spark.apache.org/docs/latest/',
    type: 'docs',
    category: 'official',
    description: {
      es: 'Documentación oficial de Apache Spark',
      en: 'Official Apache Spark documentation',
      pt: 'Documentação oficial do Apache Spark'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-docs-4',
    title: 'MLflow Documentation',
    url: 'https://mlflow.org/docs/latest/index.html',
    type: 'docs',
    category: 'official',
    description: {
      es: 'Documentación oficial de MLflow',
      en: 'Official MLflow documentation',
      pt: 'Documentação oficial do MLflow'
    },
    free: true,
    recommended: true
  },

  // =====================================================
  // CURSOS Y CERTIFICACIÓN
  // =====================================================
  {
    id: 'res-course-1',
    title: 'Databricks Academy',
    url: 'https://www.databricks.com/learn/training/home',
    type: 'course',
    category: 'certification',
    description: {
      es: 'Cursos oficiales gratuitos de Databricks con labs prácticos',
      en: 'Free official Databricks courses with hands-on labs',
      pt: 'Cursos oficiais gratuitos do Databricks com labs práticos'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-course-2',
    title: 'Databricks Certification Prep',
    url: 'https://www.databricks.com/learn/certification',
    type: 'course',
    category: 'certification',
    description: {
      es: 'Recursos de preparación para certificaciones',
      en: 'Certification preparation resources',
      pt: 'Recursos de preparação para certificações'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-course-3',
    title: 'Udemy - Databricks Certified DE Associate',
    url: 'https://www.udemy.com/course/databricks-certified-data-engineer-associate/',
    type: 'course',
    category: 'certification',
    description: {
      es: 'Curso completo de preparación para certificación',
      en: 'Complete certification prep course',
      pt: 'Curso completo de preparação para certificação'
    },
    free: false,
    recommended: true
  },

  // =====================================================
  // VIDEOS Y TUTORIALES
  // =====================================================
  {
    id: 'res-video-1',
    title: 'Databricks YouTube Channel',
    url: 'https://www.youtube.com/@Databricks',
    type: 'video',
    category: 'learning',
    description: {
      es: 'Canal oficial con tutoriales, demos y conferencias',
      en: 'Official channel with tutorials, demos and conferences',
      pt: 'Canal oficial com tutoriais, demos e conferências'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-video-2',
    title: 'What is a Lakehouse?',
    url: 'https://www.youtube.com/watch?v=wKEYuaNr-S0',
    type: 'video',
    category: 'learning',
    description: {
      es: 'Explicación del concepto de Lakehouse',
      en: 'Explanation of the Lakehouse concept',
      pt: 'Explicação do conceito de Lakehouse'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-video-3',
    title: 'Data + AI Summit Sessions',
    url: 'https://www.databricks.com/dataaisummit/sessions',
    type: 'video',
    category: 'learning',
    description: {
      es: 'Sesiones grabadas del Data + AI Summit',
      en: 'Recorded sessions from Data + AI Summit',
      pt: 'Sessões gravadas do Data + AI Summit'
    },
    free: true,
    recommended: true
  },

  // =====================================================
  // HERRAMIENTAS
  // =====================================================
  {
    id: 'res-tool-1',
    title: 'Databricks Free Edition',
    url: 'https://www.databricks.com/try-databricks-free',
    type: 'tool',
    category: 'practice',
    description: {
      es: 'Versión gratuita de Databricks (2026) con serverless compute, Unity Catalog básico y Databricks Assistant',
      en: 'Free Databricks version (2026) with serverless compute, basic Unity Catalog and Databricks Assistant',
      pt: 'Versão gratuita do Databricks (2026) com serverless compute, Unity Catalog básico e Databricks Assistant'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-tool-1b',
    title: 'Databricks Assistant Documentation',
    url: 'https://docs.databricks.com/en/notebooks/databricks-assistant-faq.html',
    type: 'docs',
    category: 'learning',
    description: {
      es: 'Guía del asistente de IA integrado para escribir código, explicar errores y optimizar queries',
      en: 'Guide to the integrated AI assistant for writing code, explaining errors and optimizing queries',
      pt: 'Guia do assistente de IA integrado para escrever código, explicar erros e otimizar queries'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-tool-2',
    title: 'Databricks CLI',
    url: 'https://docs.databricks.com/dev-tools/cli/index.html',
    type: 'tool',
    category: 'development',
    description: {
      es: 'CLI para interactuar con Databricks desde terminal',
      en: 'CLI to interact with Databricks from terminal',
      pt: 'CLI para interagir com Databricks do terminal'
    },
    free: true,
    recommended: false
  },
  {
    id: 'res-tool-3',
    title: 'dbx - Databricks eXtensions',
    url: 'https://github.com/databrickslabs/dbx',
    type: 'tool',
    category: 'development',
    description: {
      es: 'Herramienta para CI/CD de proyectos Databricks',
      en: 'CI/CD tool for Databricks projects',
      pt: 'Ferramenta para CI/CD de projetos Databricks'
    },
    free: true,
    recommended: false
  },

  // =====================================================
  // PRÁCTICA
  // =====================================================
  {
    id: 'res-practice-1',
    title: 'Databricks Sample Datasets',
    url: 'https://docs.databricks.com/dbfs/databricks-datasets.html',
    type: 'practice',
    category: 'practice',
    description: {
      es: 'Datasets de ejemplo incluidos en Databricks',
      en: 'Sample datasets included in Databricks',
      pt: 'Datasets de exemplo incluídos no Databricks'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-practice-2',
    title: 'Practice Exam - DE Associate',
    url: 'https://www.databricks.com/learn/certification/data-engineer-associate',
    type: 'practice',
    category: 'certification',
    description: {
      es: 'Examen de práctica oficial para certificación',
      en: 'Official practice exam for certification',
      pt: 'Exame de prática oficial para certificação'
    },
    free: true,
    recommended: true
  },

  // =====================================================
  // ARTÍCULOS Y BLOGS
  // =====================================================
  {
    id: 'res-article-1',
    title: 'Databricks Blog',
    url: 'https://www.databricks.com/blog',
    type: 'article',
    category: 'learning',
    description: {
      es: 'Blog oficial con artículos técnicos y novedades',
      en: 'Official blog with technical articles and news',
      pt: 'Blog oficial com artigos técnicos e novidades'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-article-2',
    title: 'Medallion Architecture',
    url: 'https://www.databricks.com/glossary/medallion-architecture',
    type: 'article',
    category: 'learning',
    description: {
      es: 'Guía completa de arquitectura Medallion',
      en: 'Complete Medallion architecture guide',
      pt: 'Guia completo de arquitetura Medallion'
    },
    free: true,
    recommended: true
  },
  {
    id: 'res-article-3',
    title: 'Delta Lake Best Practices',
    url: 'https://docs.databricks.com/delta/best-practices.html',
    type: 'article',
    category: 'best-practices',
    description: {
      es: 'Mejores prácticas oficiales para Delta Lake',
      en: 'Official Delta Lake best practices',
      pt: 'Melhores práticas oficiais para Delta Lake'
    },
    free: true,
    recommended: true
  },

  // =====================================================
  // LIBROS
  // =====================================================
  {
    id: 'res-book-1',
    title: 'Learning Spark, 2nd Edition',
    url: 'https://www.oreilly.com/library/view/learning-spark-2nd/9781492050032/',
    type: 'book',
    category: 'learning',
    description: {
      es: 'Libro completo sobre Apache Spark (O\'Reilly)',
      en: 'Complete Apache Spark book (O\'Reilly)',
      pt: 'Livro completo sobre Apache Spark (O\'Reilly)'
    },
    free: false,
    recommended: true
  },
  {
    id: 'res-book-2',
    title: 'Delta Lake: The Definitive Guide',
    url: 'https://www.databricks.com/resources/ebook/delta-lake-the-definitive-guide',
    type: 'book',
    category: 'learning',
    description: {
      es: 'Guía definitiva de Delta Lake (gratis)',
      en: 'Delta Lake definitive guide (free)',
      pt: 'Guia definitivo do Delta Lake (grátis)'
    },
    free: true,
    recommended: true
  }
];

// Estadísticas de recursos
export const RESOURCE_STATS = {
  total: DATABRICKS_RESOURCES.length,
  free: DATABRICKS_RESOURCES.filter(r => r.free).length,
  recommended: DATABRICKS_RESOURCES.filter(r => r.recommended).length,
  byType: {
    docs: DATABRICKS_RESOURCES.filter(r => r.type === 'docs').length,
    video: DATABRICKS_RESOURCES.filter(r => r.type === 'video').length,
    course: DATABRICKS_RESOURCES.filter(r => r.type === 'course').length,
    book: DATABRICKS_RESOURCES.filter(r => r.type === 'book').length,
    tool: DATABRICKS_RESOURCES.filter(r => r.type === 'tool').length,
    article: DATABRICKS_RESOURCES.filter(r => r.type === 'article').length,
    practice: DATABRICKS_RESOURCES.filter(r => r.type === 'practice').length
  }
};

// Recursos recomendados para empezar
export const STARTER_RESOURCES = DATABRICKS_RESOURCES.filter(
  r => r.recommended && r.free
);


