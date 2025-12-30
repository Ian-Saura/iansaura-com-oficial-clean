import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import { 
  BookOpen, 
  Code, 
  Database, 
  Cloud, 
  TrendingUp, 
  CheckCircle,
  ArrowRight,
  Zap,
  Target,
  DollarSign,
  Clock,
  Users,
  Briefcase
} from 'lucide-react';

interface GuiaDataEngineeringProps {
  user?: any;
}

const GuiaDataEngineering: React.FC<GuiaDataEngineeringProps> = ({ user }) => {
  return (
    <>
      <Helmet>
        <title>Guía Completa de Data Engineering 2025 | Qué es, Cómo Aprender, Salarios en LATAM</title>
        <meta name="description" content="Guía definitiva de Data Engineering en español. Aprende qué es un Data Engineer, qué tecnologías necesitas (Python, SQL, AWS, dbt), salarios en LATAM, y cómo conseguir tu primer trabajo remoto. Por Ian Saura." />
        <meta name="keywords" content="qué es data engineering, cómo ser data engineer, salario data engineer LATAM, aprender data engineering, curso data engineering español, roadmap data engineer, Python para datos, SQL data engineering" />
        <link rel="canonical" href="https://www.iansaura.com/guia-data-engineering" />
        
        {/* Open Graph */}
        <meta property="og:title" content="Guía Completa de Data Engineering 2025 | Ian Saura" />
        <meta property="og:description" content="Todo lo que necesitas saber para convertirte en Data Engineer. Tecnologías, salarios, roadmap y recursos en español." />
        <meta property="og:url" content="https://www.iansaura.com/guia-data-engineering" />
        <meta property="og:type" content="article" />
        
        {/* Article specific */}
        <meta property="article:author" content="Ian Saura" />
        <meta property="article:published_time" content="2025-01-01T00:00:00Z" />
        <meta property="article:modified_time" content="2025-11-27T00:00:00Z" />
        <meta property="article:section" content="Technology" />
        <meta property="article:tag" content="Data Engineering" />
        <meta property="article:tag" content="Python" />
        <meta property="article:tag" content="SQL" />
        <meta property="article:tag" content="AWS" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
        <Navigation user={user} />
        
        {/* Hero Section */}
        <header className="pt-24 pb-16 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-emerald-500/20">
              <BookOpen className="w-4 h-4" />
              Guía Actualizada 2025
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
              Guía Completa de <span className="text-emerald-400">Data Engineering</span>
            </h1>
            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto">
              Todo lo que necesitas saber para convertirte en Data Engineer: qué es, qué tecnologías aprender, 
              cuánto se gana en LATAM, y cómo conseguir tu primer trabajo remoto.
            </p>
            <p className="text-slate-400">
              Por <strong className="text-white">Ian Saura</strong> • Data Engineer & Profesor • +5 años de experiencia
            </p>
          </div>
        </header>

        {/* Table of Contents */}
        <nav className="max-w-4xl mx-auto px-4 mb-16">
          <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-lg font-semibold text-white mb-4">📑 Contenido de esta guía</h2>
            <ul className="grid md:grid-cols-2 gap-2 text-slate-300">
              <li><a href="#que-es" className="hover:text-emerald-400 transition-colors">1. ¿Qué es Data Engineering?</a></li>
              <li><a href="#vs-otros" className="hover:text-emerald-400 transition-colors">2. Data Engineer vs Data Scientist vs Data Analyst</a></li>
              <li><a href="#tecnologias" className="hover:text-emerald-400 transition-colors">3. Tecnologías que debes aprender</a></li>
              <li><a href="#roadmap" className="hover:text-emerald-400 transition-colors">4. Roadmap para principiantes</a></li>
              <li><a href="#salarios" className="hover:text-emerald-400 transition-colors">5. Salarios en LATAM y España</a></li>
              <li><a href="#trabajo" className="hover:text-emerald-400 transition-colors">6. Cómo conseguir tu primer trabajo</a></li>
              <li><a href="#recursos" className="hover:text-emerald-400 transition-colors">7. Recursos recomendados</a></li>
              <li><a href="#faq" className="hover:text-emerald-400 transition-colors">8. Preguntas frecuentes</a></li>
            </ul>
          </div>
        </nav>

        {/* Main Content */}
        <article className="max-w-4xl mx-auto px-4 pb-20">
          
          {/* Section 1: What is Data Engineering */}
          <section id="que-es" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-8 h-8 text-emerald-400" />
              ¿Qué es Data Engineering?
            </h2>
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-slate-300 text-lg leading-relaxed mb-4">
                <strong className="text-white">Data Engineering</strong> (Ingeniería de Datos) es la disciplina que se encarga de 
                <strong className="text-emerald-400"> diseñar, construir y mantener los sistemas</strong> que permiten recolectar, 
                almacenar, procesar y distribuir datos a gran escala.
              </p>
              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                Un <strong className="text-white">Data Engineer</strong> (Ingeniero de Datos) es el profesional responsable de crear 
                la infraestructura de datos que permite a las empresas tomar decisiones basadas en información. 
                Sin Data Engineers, los Data Scientists y Analistas no tendrían datos limpios y organizados para trabajar.
              </p>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
                <h3 className="text-xl font-semibold text-white mb-4">🎯 Responsabilidades principales de un Data Engineer:</h3>
                <ul className="space-y-3">
                  {[
                    'Diseñar y construir pipelines de datos (ETL/ELT)',
                    'Crear y mantener Data Warehouses y Data Lakes',
                    'Asegurar la calidad y consistencia de los datos',
                    'Optimizar el rendimiento de consultas y procesos',
                    'Implementar sistemas de monitoreo y alertas',
                    'Colaborar con Data Scientists y Analistas'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section 2: vs Others */}
          <section id="vs-otros" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Users className="w-8 h-8 text-blue-400" />
              Data Engineer vs Data Scientist vs Data Analyst
            </h2>
            
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-700">
                    <th className="py-4 px-4 text-white font-semibold">Rol</th>
                    <th className="py-4 px-4 text-white font-semibold">Enfoque Principal</th>
                    <th className="py-4 px-4 text-white font-semibold">Herramientas Clave</th>
                  </tr>
                </thead>
                <tbody className="text-slate-300">
                  <tr className="border-b border-slate-800 bg-emerald-500/5">
                    <td className="py-4 px-4 font-semibold text-emerald-400">Data Engineer</td>
                    <td className="py-4 px-4">Construir infraestructura y pipelines de datos</td>
                    <td className="py-4 px-4">Python, SQL, AWS, Spark, Airflow, dbt</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-4 px-4 font-semibold text-purple-400">Data Scientist</td>
                    <td className="py-4 px-4">Crear modelos predictivos y de ML</td>
                    <td className="py-4 px-4">Python, R, TensorFlow, Scikit-learn</td>
                  </tr>
                  <tr className="border-b border-slate-800">
                    <td className="py-4 px-4 font-semibold text-blue-400">Data Analyst</td>
                    <td className="py-4 px-4">Analizar datos y crear reportes</td>
                    <td className="py-4 px-4">SQL, Excel, Tableau, Power BI</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <p className="text-slate-400 mt-4 text-sm">
              💡 <strong className="text-slate-300">Tip:</strong> Data Engineering es ideal si te gusta programar y construir sistemas. 
              Es la base sobre la cual trabajan los otros roles de datos.
            </p>
          </section>

          {/* Section 3: Technologies */}
          <section id="tecnologias" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Code className="w-8 h-8 text-purple-400" />
              Tecnologías que debes aprender
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Fundamentals */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Target className="w-5 h-5 text-emerald-400" />
                  Fundamentos (Obligatorios)
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'Python', desc: 'Lenguaje principal para Data Engineering' },
                    { name: 'SQL', desc: 'Consultas, joins, window functions' },
                    { name: 'Git', desc: 'Control de versiones' },
                    { name: 'Linux/Bash', desc: 'Línea de comandos' }
                  ].map((tech, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5" />
                      <div>
                        <strong className="text-white">{tech.name}</strong>
                        <span className="text-slate-400"> - {tech.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cloud & Tools */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Cloud className="w-5 h-5 text-blue-400" />
                  Cloud & Herramientas
                </h3>
                <ul className="space-y-3">
                  {[
                    { name: 'AWS', desc: 'S3, Glue, Redshift, Lambda' },
                    { name: 'Snowflake', desc: 'Data Warehouse moderno' },
                    { name: 'dbt', desc: 'Transformación de datos' },
                    { name: 'Airflow', desc: 'Orquestación de pipelines' }
                  ].map((tech, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                      <div>
                        <strong className="text-white">{tech.name}</strong>
                        <span className="text-slate-400"> - {tech.desc}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Advanced */}
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 md:col-span-2">
                <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  Avanzado (Para Senior)
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { name: 'Apache Spark', desc: 'Procesamiento distribuido' },
                    { name: 'Kafka', desc: 'Streaming de datos' },
                    { name: 'Databricks', desc: 'Plataforma unificada de datos' },
                    { name: 'Kubernetes', desc: 'Orquestación de contenedores' },
                    { name: 'Terraform', desc: 'Infrastructure as Code' },
                    { name: 'Data Modeling', desc: 'Kimball, Data Vault' }
                  ].map((tech, i) => (
                    <div key={i} className="flex items-start gap-3 text-slate-300">
                      <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5" />
                      <div>
                        <strong className="text-white">{tech.name}</strong>
                        <span className="text-slate-400"> - {tech.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Roadmap */}
          <section id="roadmap" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-emerald-400" />
              Roadmap para principiantes
            </h2>
            
            <div className="space-y-6">
              {[
                {
                  phase: 'Fase 1: Fundamentos',
                  duration: '1-2 meses',
                  color: 'emerald',
                  items: ['Aprende Python básico', 'Domina SQL (joins, subqueries, window functions)', 'Entiende conceptos de bases de datos']
                },
                {
                  phase: 'Fase 2: Primeros Pipelines',
                  duration: '2-3 meses',
                  color: 'blue',
                  items: ['Crea tu primer ETL con Python', 'Aprende a usar APIs', 'Practica con proyectos reales']
                },
                {
                  phase: 'Fase 3: Cloud & Herramientas',
                  duration: '2-3 meses',
                  color: 'purple',
                  items: ['Familiarízate con AWS (S3, Glue)', 'Aprende Snowflake o BigQuery', 'Usa dbt para transformaciones']
                },
                {
                  phase: 'Fase 4: Buscar Trabajo',
                  duration: '1-3 meses',
                  color: 'yellow',
                  items: ['Arma tu portfolio con 2-3 proyectos', 'Practica entrevistas técnicas', 'Aplica a posiciones Jr/Entry']
                }
              ].map((phase, i) => (
                <div key={i} className={`bg-slate-800/50 rounded-xl p-6 border border-${phase.color}-500/30 relative overflow-hidden`}>
                  <div className={`absolute top-0 left-0 w-1 h-full bg-${phase.color}-500`}></div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-semibold text-white">{phase.phase}</h3>
                    <span className={`text-${phase.color}-400 text-sm bg-${phase.color}-500/10 px-3 py-1 rounded-full`}>
                      <Clock className="w-4 h-4 inline mr-1" />
                      {phase.duration}
                    </span>
                  </div>
                  <ul className="space-y-2">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-300">
                        <ArrowRight className={`w-4 h-4 text-${phase.color}-400`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: Salaries */}
          <section id="salarios" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-400" />
              Salarios en LATAM y España (2025)
            </h2>
            
            <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700 mb-6">
              <p className="text-slate-300 mb-6">
                Los salarios varían según experiencia, país y si el trabajo es local o remoto para empresas extranjeras.
                <strong className="text-white"> Los trabajos remotos para USA/Europa pagan significativamente más.</strong>
              </p>
              
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-700">
                      <th className="py-3 px-4 text-white font-semibold">Nivel</th>
                      <th className="py-3 px-4 text-white font-semibold">Local (USD/mes)</th>
                      <th className="py-3 px-4 text-white font-semibold">Remoto USA/EU</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4">Entry/Trainee</td>
                      <td className="py-3 px-4">$500 - $1,000</td>
                      <td className="py-3 px-4">$1,500 - $2,500</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4">Junior (1-2 años)</td>
                      <td className="py-3 px-4">$1,000 - $2,000</td>
                      <td className="py-3 px-4">$2,500 - $4,000</td>
                    </tr>
                    <tr className="border-b border-slate-800">
                      <td className="py-3 px-4">Semi-Senior (2-4 años)</td>
                      <td className="py-3 px-4">$2,000 - $3,500</td>
                      <td className="py-3 px-4">$4,000 - $6,000</td>
                    </tr>
                    <tr className="border-b border-slate-800 bg-emerald-500/5">
                      <td className="py-3 px-4 font-semibold text-emerald-400">Senior (4+ años)</td>
                      <td className="py-3 px-4">$3,500 - $5,000</td>
                      <td className="py-3 px-4 text-emerald-400 font-semibold">$6,000 - $10,000+</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <p className="text-slate-400 mt-4 text-sm">
                📊 Datos basados en ofertas de trabajo en Argentina, México, Colombia, Chile y España (2024-2025).
              </p>
            </div>
          </section>

          {/* Section 6: Getting a Job */}
          <section id="trabajo" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Briefcase className="w-8 h-8 text-blue-400" />
              Cómo conseguir tu primer trabajo
            </h2>
            
            <div className="space-y-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-xl font-semibold text-white mb-4">🎯 Estrategia que funciona:</h3>
                <ol className="space-y-4">
                  {[
                    {
                      title: 'Arma 2-3 proyectos para tu portfolio',
                      desc: 'ETL completo con Python, pipeline en AWS, dashboard con datos reales'
                    },
                    {
                      title: 'Practica SQL en DataLemur y Python en LeetCode',
                      desc: 'Las entrevistas técnicas son predecibles si practicas'
                    },
                    {
                      title: 'Busca en Google "Data Engineer Jr LATAM" filtrado por últimas 24hs',
                      desc: 'Aplica todos los días a lo que encuentres'
                    },
                    {
                      title: 'Prepara tu pitch para entrevistas de RRHH',
                      desc: 'Investiga la empresa, ten claras tus tecnologías'
                    },
                    {
                      title: 'Toma feedback de cada entrevista',
                      desc: '¿Fallaste en SQL? Vuelve a practicar. ¿En sistema design? Estudia arquitecturas'
                    }
                  ].map((step, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                      <div>
                        <strong className="text-white block">{step.title}</strong>
                        <span className="text-slate-400">{step.desc}</span>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </section>

          {/* Section 7: Resources */}
          <section id="recursos" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-purple-400" />
              Recursos recomendados
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">📚 Para aprender</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Bootcamp de Ian Saura</strong> - Data Engineering en español</li>
                  <li>• <strong>DataLemur</strong> - Práctica de SQL</li>
                  <li>• <strong>Documentación de dbt</strong> - Gratis y excelente</li>
                  <li>• <strong>AWS Free Tier</strong> - Practica gratis</li>
                </ul>
              </div>
              
              <div className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                <h3 className="text-lg font-semibold text-white mb-4">📖 Libros recomendados</h3>
                <ul className="space-y-2 text-slate-300">
                  <li>• <strong>Fundamentals of Data Engineering</strong> - Reis & Housley</li>
                  <li>• <strong>Designing Data-Intensive Applications</strong> - Kleppmann</li>
                  <li>• <strong>The Data Warehouse Toolkit</strong> - Kimball</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8: FAQ */}
          <section id="faq" className="mb-16 scroll-mt-24">
            <h2 className="text-3xl font-bold text-white mb-6">❓ Preguntas frecuentes</h2>
            
            <div className="space-y-4">
              {[
                {
                  q: '¿Necesito un título universitario para ser Data Engineer?',
                  a: 'No es obligatorio. Muchos Data Engineers son autodidactas o vienen de bootcamps. Lo importante es demostrar habilidades técnicas con proyectos.'
                },
                {
                  q: '¿Cuánto tiempo toma conseguir el primer trabajo?',
                  a: 'Con dedicación full-time, entre 4-8 meses. Part-time puede tomar 8-12 meses. Depende de tu background y cuánto practiques.'
                },
                {
                  q: '¿Es mejor Data Engineering o Data Science?',
                  a: 'Depende de tus intereses. Si te gusta programar y construir sistemas, Data Engineering. Si prefieres estadística y modelos, Data Science. Data Engineering tiene más demanda actualmente.'
                },
                {
                  q: '¿Puedo conseguir trabajo remoto desde LATAM?',
                  a: 'Sí, absolutamente. Hay mucha demanda de Data Engineers en empresas de USA/Europa que contratan remoto en LATAM. El inglés es importante para estas posiciones.'
                },
                {
                  q: '¿Qué nivel de inglés necesito?',
                  a: 'Para trabajos locales, básico. Para remotos internacionales, necesitas poder comunicarte en reuniones y leer documentación técnica (B2 mínimo).'
                }
              ].map((faq, i) => (
                <div key={i} className="bg-slate-800/50 rounded-xl p-6 border border-slate-700">
                  <h3 className="text-lg font-semibold text-white mb-2">{faq.q}</h3>
                  <p className="text-slate-300">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <section className="bg-gradient-to-r from-emerald-500/20 to-blue-500/20 rounded-2xl p-8 border border-emerald-500/30 text-center">
            <h2 className="text-2xl font-bold text-white mb-4">
              ¿Listo para empezar tu carrera en Data Engineering?
            </h2>
            <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
              Únete a +150 profesionales que ya transformaron su carrera con mis bootcamps y mentorías.
              Aprende Data Engineering en español con proyectos reales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/bootcamps"
                className="inline-flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Ver Bootcamp
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/suscripcion"
                className="inline-flex items-center justify-center gap-2 bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
              >
                Suscripción $30/mes
              </Link>
            </div>
          </section>
        </article>

        {/* Footer */}
        <footer className="border-t border-slate-800 py-8 px-4">
          <div className="max-w-4xl mx-auto text-center text-slate-400">
            <p>© 2025 Ian Saura. Todos los derechos reservados.</p>
            <p className="mt-2">
              <Link to="/" className="hover:text-emerald-400">Inicio</Link>
              {' • '}
              <Link to="/bootcamps" className="hover:text-emerald-400">Bootcamps</Link>
              {' • '}
              <Link to="/suscripcion" className="hover:text-emerald-400">Suscripción</Link>
              {' • '}
              <Link to="/mentorias" className="hover:text-emerald-400">Mentorías</Link>
            </p>
          </div>
        </footer>
      </div>
    </>
  );
};

export default GuiaDataEngineering;