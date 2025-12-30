import { RoadmapLevel } from '../../types/members';

export const level3: RoadmapLevel = {
    level: 3,
    title: { es: 'Ser Senior', en: 'Being Senior', pt: 'Ser Sênior' },
    subtitle: { es: 'Liderazgo técnico y calidad', en: 'Technical leadership and quality', pt: 'Liderança técnica e qualidade' },
    description: { es: 'Llegaste a SSR. Felicitaciones. Ahora viene lo interesante. Ser Senior no es solo saber más tecnologías. Es tener impacto a nivel de equipo, tomar decisiones técnicas que escalan, y defender la calidad cuando todos te apuran. Este nivel es sobre madurez profesional.', en: 'You reached SSR. Congratulations. Now comes the interesting part. Being Senior is not just knowing more technologies. It is having impact at the team level, making technical decisions that scale, and defending quality when everyone rushes you. This level is about professional maturity.', pt: 'Você chegou a SSR. Parabéns. Agora vem a parte interessante. Ser Sênior não é apenas saber mais tecnologias. É ter impacto no nível da equipe, tomar decisões técnicas que escalam e defender a qualidade quando todos te apressam. Este nível é sobre maturidade profissional.' },
    badge: '👑 Senior',
    color: 'purple',
    phases: [
      {
        id: 'l3-intro',
        title: { es: 'Tu Situación Actual', en: 'Your Current Situation', pt: 'Sua Situação Atual' },
        emoji: '🎯',
        sections: [
          {
            id: 'l3-situacion',
            title: { es: 'Mapeá dónde estás', en: 'Map where you are', pt: 'Mapeie onde você está' },
            description: { es: 'Sé brutalmente honesto. Nadie más va a ver esto.', en: 'Be brutally honest. No one else will see this.', pt: 'Seja brutalmente honesto. Ninguém mais vai ver isso.' },
            steps: [
              { id: 'l3-sit-1', text: { es: 'Años de experiencia en Data Engineering', en: 'Years of Data Engineering experience', pt: 'Anos de experiência em Data Engineering' }, type: 'reflection', textInput: { es: 'X años', en: 'X years', pt: 'X anos' } },
              { id: 'l3-sit-2', text: { es: 'Sueldo actual (USD/mes)', en: 'Current salary (USD/month)', pt: 'Salário atual (USD/mês)' }, type: 'reflection', textInput: { es: '$...', en: '$...', pt: '$...' } },
              { id: 'l3-sit-3', text: { es: 'Puesto actual', en: 'Current position', pt: 'Cargo atual' }, type: 'reflection', textInput: { es: 'Título...', en: 'Title...', pt: 'Título...' } },
              { id: 'l3-sit-4', text: { es: '¿Me considero Senior? ¿Por qué sí o por qué no?', en: 'Do I consider myself Senior? Why yes or why not?', pt: 'Me considero Sênior? Por que sim ou por que não?' }, type: 'reflection', textInput: { es: 'Honestamente...', en: 'Honestly...', pt: 'Honestamente...' } },
              { id: 'l3-sit-5', text: { es: '¿Mi empresa me considera Senior?', en: 'Does my company consider me Senior?', pt: 'Minha empresa me considera Sênior?' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
              { id: 'l3-sit-6', text: { es: '¿El mercado me pagaría como Senior? ($4000+ USD)', en: 'Would the market pay me as Senior? ($4000+ USD)', pt: 'O mercado me pagaria como Sênior? ($4000+ USD)' }, type: 'reflection', textInput: { es: 'Sí/No', en: 'Yes/No', pt: 'Sim/Não' } },
              { id: 'l3-sit-7', text: { es: 'Si hay algún "no", ¿qué me falta?', en: 'If there is any "no", what am I missing?', pt: 'Se houver algum "não", o que me falta?' }, type: 'reflection', textInput: { es: 'Gaps identificados...', en: 'Identified gaps...', pt: 'Gaps identificados...' } },
            ]
          }
        ]
      },
      {
        id: 'l3-prerequisitos',
        title: { es: 'Verificación: ¿Dominás el Nivel 2?', en: 'Verification: Do you master Level 2?', pt: 'Verificação: Você domina o Nível 2?' },
        emoji: '✅',
        sections: [
          {
            id: 'l3-prereq-check',
            title: { es: '📋 Checklist del Nivel 2', en: '📋 Level 2 Checklist', pt: '📋 Checklist do Nível 2' },
            description: { es: 'Senior no es solo años de experiencia. Es dominar las herramientas y tener impacto real. Verificá que dominás todo esto.', en: 'Senior is not just years of experience. It is mastering the tools and having real impact. Verify you master all this.', pt: 'Sênior não é apenas anos de experiência. É dominar as ferramentas e ter impacto real. Verifique que você domina tudo isso.' },
            steps: [
              { 
                id: 'l3-pre-1', 
                text: { es: '⚡ Puedo procesar datasets de 10GB+ con Spark', en: '⚡ I can process 10GB+ datasets with Spark', pt: '⚡ Consigo processar datasets de 10GB+ com Spark' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l3-pre-2', 
                text: { es: '🔄 Diseñé y deployé pipelines en Airflow', en: '🔄 I designed and deployed pipelines in Airflow', pt: '🔄 Projetei e deployei pipelines em Airflow' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l3-pre-3', 
                text: { es: '☁️ Trabajé con servicios cloud (AWS/GCP/Azure)', en: '☁️ I worked with cloud services (AWS/GCP/Azure)', pt: '☁️ Trabalhei com serviços cloud (AWS/GCP/Azure)' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l3-pre-4', 
                text: { es: '🏗️ Diseñé arquitecturas de datos (Data Warehouse, Data Lake)', en: '🏗️ I designed data architectures (Data Warehouse, Data Lake)', pt: '🏗️ Projetei arquiteturas de dados (Data Warehouse, Data Lake)' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l3-pre-5', 
                text: { es: '📊 Implementé data quality y tests', en: '📊 I implemented data quality and tests', pt: '📊 Implementei data quality e testes' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l3-pre-6', 
                text: { es: '🔧 Tengo experiencia con dbt o herramientas similares', en: '🔧 I have experience with dbt or similar tools', pt: '🔧 Tenho experiência com dbt ou ferramentas similares' },
                type: 'task', 
                checkbox: true
              },
            ]
          },
          {
            id: 'l3-prereq-exp',
            title: { es: '💼 Experiencia Práctica', en: '💼 Practical Experience', pt: '💼 Experiência Prática' },
            description: { es: 'El nivel Senior requiere experiencia real, no solo conocimientos teóricos.', en: 'Senior level requires real experience, not just theoretical knowledge.', pt: 'O nível Sênior requer experiência real, não apenas conhecimentos teóricos.' },
            steps: [
              { 
                id: 'l3-exp-1', 
                text: { es: 'Tengo 2+ años trabajando como Data Engineer', en: 'I have 2+ years working as Data Engineer', pt: 'Tenho 2+ anos trabalhando como Data Engineer' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l3-exp-2', 
                text: { es: 'Trabajé en pipelines que corren en producción', en: 'I worked on pipelines running in production', pt: 'Trabalhei em pipelines rodando em produção' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l3-exp-3', 
                text: { es: 'Manejé incidentes y debuggeé problemas en prod', en: 'I handled incidents and debugged production problems', pt: 'Lidei com incidentes e debuguei problemas em prod' },
                type: 'task', 
                checkbox: true
              },
              { 
                id: 'l3-exp-4', 
                text: { es: 'Colaboré con otros equipos (Analytics, Backend, ML)', en: 'I collaborated with other teams (Analytics, Backend, ML)', pt: 'Colaborei com outros times (Analytics, Backend, ML)' },
                type: 'task', 
                checkbox: true
              },
            ],
            stopTitle: { es: '🎯 ¿Listo para ser Senior?', en: '🎯 Ready to be Senior?', pt: '🎯 Pronto para ser Sênior?' },
            stopContent: { es: 'Si marcaste la mayoría, estás listo para el camino a Senior. Este nivel es sobre liderazgo técnico, toma de decisiones y tener impacto a nivel de equipo.', en: 'If you checked most, you are ready for the path to Senior. This level is about technical leadership, decision making and having team-level impact.', pt: 'Se você marcou a maioria, está pronto para o caminho a Sênior. Este nível é sobre liderança técnica, tomada de decisões e ter impacto no nível da equipe.' }
          }
        ]
      },
      {
        id: 'l3-mindset',
        title: { es: 'Fase 1: El Cambio de Mindset', en: 'Phase 1: The Mindset Shift', pt: 'Fase 1: A Mudança de Mindset' },
        emoji: '🧠',
        sections: [
          {
            id: 'l3-consciencia',
            title: { es: '1️⃣ Sé Consciente de Cada Acción', en: '1️⃣ Be Conscious of Every Action', pt: '1️⃣ Esteja Consciente de Cada Ação' },
            description: { es: 'Para ser Senior necesitás ser consciente y responsable de CADA una de tus acciones. Si tenés un buen manager, cada acción es una demostración de tu seniority.', en: 'To be Senior you need to be conscious and responsible for EVERY one of your actions. If you have a good manager, every action is a demonstration of your seniority.', pt: 'Para ser Sênior você precisa estar consciente e responsável por CADA uma de suas ações. Se você tem um bom gerente, cada ação é uma demonstração de sua senioridade.' },
            steps: [
              { 
                id: 'l3-con-1', 
                text: { es: 'Reflexioné sobre cómo respondo mensajes y mails', en: 'I reflected on how I respond to messages and emails', pt: 'Refleti sobre como respondo mensagens e e-mails' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Preguntas para reflexionar:
  
  - ¿Respondo rápido o dejo mensajes sin leer por días?
  - ¿Mis respuestas son claras o generan más preguntas?
  - ¿Uso el canal correcto? (Slack para urgente, email para documentar)
  
  💡 Los seniors son predecibles. La gente sabe qué esperar de vos.`,
                  en: `Reflect questions:
  
  - Do I respond quickly or leave messages unread for days?
  - Are my answers clear or do they generate more questions?
  - Do I use the right channel? (Slack for urgent, email for documenting)
  
  💡 Seniors are predictable. People know what to expect from you.`,
                  pt: `Perguntas para refletir:
  
  - Respondo rápido ou deixo mensagens sem ler por dias?
  - Minhas respostas são claras ou geram mais perguntas?
  - Uso o canal correto? (Slack para urgente, email para documentar)
  
  💡 Os seniores são previsíveis. As pessoas sabem o que esperar de você.`
                }
              },
              { 
                id: 'l3-con-2', 
                text: { es: 'Reflexioné sobre cómo participo en reuniones', en: 'I reflected on how I participate in meetings', pt: 'Refleti sobre como participo em reuniões' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Preguntas para reflexionar:
  
  - ¿Llego preparado con contexto?
  - ¿Hablo demasiado o demasiado poco?
  - ¿Mis intervenciones agregan valor?
  - ¿Tomo notas y action items?
  
  💡 Un senior sabe cuándo hablar y cuándo escuchar.`,
                  en: `Reflect questions:
  
  - Do I arrive prepared with context?
  - Do I talk too much or too little?
  - Do my interventions add value?
  - Do I take notes and action items?
  
  💡 A senior knows when to talk and when to listen.`,
                  pt: `Perguntas para refletir:
  
  - Chego preparado com contexto?
  - Falo demais ou muito pouco?
  - Minhas intervenções agregam valor?
  - Tomo notas e action items?
  
  💡 Um sênior sabe quando falar e quando ouvir.`
                }
              },
              { 
                id: 'l3-con-3', 
                text: { es: 'Reflexioné sobre cómo resuelvo tareas', en: 'I reflected on how I solve tasks', pt: 'Refleti sobre como resolvo tarefas' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Preguntas para reflexionar:
  
  - ¿Entiendo bien el problema antes de codear?
  - ¿Pido ayuda cuando me trabo o me frustro solo?
  - ¿Considero edge cases?
  - ¿Testeo antes de entregar?
  
  💡 Un senior entrega consistentemente, sin sorpresas.`,
                  en: `Reflect questions:
  
  - Do I understand the problem well before coding?
  - Do I ask for help when stuck or get frustrated alone?
  - Do I consider edge cases?
  - Do I test before delivering?
  
  💡 A senior delivers consistently, without surprises.`,
                  pt: `Perguntas para refletir:
  
  - Entendo bem o problema antes de codar?
  - Peço ajuda quando travo ou me frustro sozinho?
  - Considero edge cases?
  - Testo antes de entregar?
  
  💡 Um sênior entrega consistentemente, sem surpresas.`
                }
              },
              { 
                id: 'l3-con-4', 
                text: { es: 'Reflexioné sobre cómo estimo tiempos', pt: 'Refleti sobre como estimo tempos' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Preguntas para reflexionar:
  
  - ¿Mis estimaciones suelen ser precisas?
  - ¿Incluyo tiempo para testing, code review, imprevistos?
  - ¿Actualizo cuando cambia el scope?
  
  💡 Regla: estimá, multiplicá x2, y agregá buffer. Mejor entregar antes que después.`,
                  pt: `Perguntas para refletir:
  
  - Minhas estimativas costumam ser precisas?
  - Incluo tempo para testes, code review, imprevistos?
  - Atualizo quando o escopo muda?
  
  💡 Regra: estime, multiplique x2 e adicione buffer. Melhor entregar antes do que depois.`
                }
              },
              { 
                id: 'l3-con-5', 
                text: { es: 'Reflexioné sobre cómo respondo a stakeholders', pt: 'Refleti sobre como respondo aos stakeholders' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Preguntas para reflexionar:
  
  - ¿Traduzco lenguaje técnico a términos de negocio?
  - ¿Gestiono expectativas o prometo más de lo que puedo?
  - ¿Comunico proactivamente cuando hay cambios?
  
  💡 Los seniors son el "traductor" entre técnico y negocio.`,
                  pt: `Perguntas para refletir:
  
  - Traduzo linguagem técnica para termos de negócio?
  - Gerencio expectativas ou prometo mais do que posso?
  - Comunico proativamente quando há mudanças?
  
  💡 Os seniores são o "tradutor" entre técnico e negócio.`
                }
              },
              { 
                id: 'l3-con-6', 
                text: { es: 'Reflexioné sobre cómo reacciono ante urgencias', pt: 'Refleti sobre como reajo a urgências' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Preguntas para reflexionar:
  
  - ¿Mantengo la calma o entro en pánico?
  - ¿Priorizo correctamente (fix primero, root cause después)?
  - ¿Comunico el estado a quien corresponde?
  - ¿Documento lo que pasó para evitar repetir?
  
  💡 En las urgencias es donde se ven los seniors de verdad.`,
                  pt: `Perguntas para refletir:
  
  - Mantenho a calma ou entro em pânico?
  - Priorizo corretamente (fix primeiro, root cause depois)?
  - Comunico o estado a quem corresponde?
  - Documento o que aconteceu para evitar repetir?
  
  💡 Nas urgências é onde se veem os verdadeiros seniores.`
                }
              },
              { id: 'l3-con-7', text: { es: '¿Qué área necesito mejorar más?', pt: 'Qual área preciso melhorar mais?' }, type: 'reflection', textInput: { es: 'Ej: Manejo del estrés en urgencias...', pt: 'Ex: Gestão do estresse em urgências...' } },
            ],
            stopTitle: { es: '💡 La diferencia Senior', pt: '💡 A diferença Sênior' },
            stopContent: { es: 'Un Junior reacciona. Un SSR planifica. Un Senior anticipa. Empezá a pensar: "¿Qué puede salir mal?" ANTES de que pase.', pt: 'Um Júnior reage. Um SSR planeja. Um Sênior antecipa. Comece a pensar: "O que pode dar errado?" ANTES que aconteça.' }
          },
          {
            id: 'l3-calidad',
            title: { es: '2️⃣ Defender tu Tranquilidad = Calidad', en: '2️⃣ Defend Your Peace of Mind = Quality', pt: '2️⃣ Defender sua Tranquilidade = Qualidade' },
            description: { es: 'Debés defender tu tranquilidad a toda costa para poder hacer entregables de MUY alta calidad. Siempre te van a apurar. Pero la calidad es tu reputación a largo plazo.', en: 'You must defend your peace of mind at all costs to deliver very high quality. You will always be rushed. But quality is your long-term reputation.', pt: 'Você deve defender sua tranquilidade a todo custo para poder fazer entregáveis de MUITO alta qualidade. Sempre vão te apressar. Mas a qualidade é sua reputação a longo prazo.' },
            steps: [
              { id: 'l3-cal-1', text: { es: 'Mi último entregable grande fue...', pt: 'Meu último entregável grande foi...' }, type: 'reflection', textInput: { es: '¿Qué era?...', pt: 'O que era?...' } },
              { id: 'l3-cal-2', text: { es: '¿Estoy orgulloso de la calidad? (1-10)', pt: 'Estou orgulhoso da qualidade? (1-10)' }, type: 'reflection', textInput: { es: 'X', en: 'X', pt: 'X' } },
              { id: 'l3-cal-3', text: { es: '¿Tiene tests automatizados?', pt: 'Tem testes automatizados?' }, type: 'reflection', textInput: { es: 'Sí/No', pt: 'Sim/Não' } },
              { id: 'l3-cal-4', text: { es: '¿Tiene documentación clara?', pt: 'Tem documentação clara?' }, type: 'reflection', textInput: { es: 'Sí/No', pt: 'Sim/Não' } },
              { id: 'l3-cal-5', text: { es: '¿Tiene monitoring y alertas?', pt: 'Tem monitoramento e alertas?' }, type: 'reflection', textInput: { es: 'Sí/No', pt: 'Sim/Não' } },
              { id: 'l3-cal-6', text: { es: '¿Otro dev podría entenderlo sin preguntarme?', pt: 'Outro dev poderia entendê-lo sem me perguntar?' }, type: 'reflection', textInput: { es: 'Sí/No', pt: 'Sim/Não' } },
              { id: 'l3-cal-7', text: { es: 'Si alguna es "no", ¿fue por tiempo o por disciplina?', pt: 'Se alguma é "não", foi por tempo ou por disciplina?' }, type: 'reflection', textInput: { es: 'Razón honesta...', pt: 'Razão honesta...' } },
            ],
            stopTitle: { es: '🛑 STOP - Reflexión dura', pt: '🛑 STOP - Reflexão dura' },
            stopContent: { es: 'Un Senior apurado que entrega código mediocre... no es un Senior. Es alguien que no sabe manejar expectativas. La calidad de tu trabajo ES tu seniority.', pt: 'Um Sênior apressado que entrega código medíocre... não é um Sênior. É alguém que não sabe gerenciar expectativas. A qualidade do seu trabalho É sua senioridade.' }
          },
          {
            id: 'l3-estimacion',
            title: { es: '3️⃣ Estimación: Tu Herramienta de Defensa', en: '3️⃣ Estimation: Your Defense Tool', pt: '3️⃣ Estimativa: Sua Ferramenta de Defesa' },
            description: { es: 'No trates de tardar menos. Hacé las cosas bien y aclará las expectativas temprano.', en: 'Don\'t try to do it faster. Do things right and clarify expectations early.', pt: 'Não tente demorar menos. Faça as coisas bem e esclareça as expectativas cedo.' },
            steps: [
              { id: 'l3-est-1', text: { es: 'La última vez que me apuraron - Situación', pt: 'A última vez que me apressaram - Situação' }, type: 'reflection', textInput: { es: 'Qué pedían...', pt: 'O que pediam...' } },
              { id: 'l3-est-2', text: { es: '¿En cuánto tiempo lo pedían?', pt: 'Em quanto tempo pediam?' }, type: 'reflection', textInput: { es: 'X días/horas', pt: 'X dias/horas' } },
              { id: 'l3-est-3', text: { es: '¿Qué respondí?', pt: 'O que respondi?' }, type: 'reflection', textInput: { es: 'Mi respuesta...', pt: 'Minha resposta...' } },
              { id: 'l3-est-4', text: { es: '¿Qué DEBERÍA haber respondido?', pt: 'O que DEVERIA ter respondido?' }, type: 'reflection', textInput: { es: 'Mejor respuesta...', pt: 'Melhor resposta...' } },
              { id: 'l3-est-5', text: { es: '¿Qué sacrifiqué por entregar rápido?', pt: 'O que sacrifiquei para entregar rápido?' }, type: 'reflection', textInput: { es: 'Tests/Docs/Calidad...', pt: 'Testes/Docs/Qualidade...' } },
            ],
            stopTitle: { es: '💡 Script para manejar presión', pt: '💡 Script para lidar com pressão' },
            stopContent: { es: '"Puedo hacerlo en X tiempo con calidad básica, o en Y tiempo con calidad completa (tests, docs, monitoring). ¿Qué preferís?" Esto te cambia la vida. Ponés la decisión en el otro.', pt: '"Posso fazer em X tempo com qualidade básica, ou em Y tempo com qualidade completa (testes, docs, monitoramento). O que você prefere?" Isso muda sua vida. Coloca a decisão no outro.' }
          }
        ]
      },
      {
        id: 'l3-lectura',
        title: { es: 'Fase 2: Lectura Obligatoria', en: 'Phase 2: Required Reading', pt: 'Fase 2: Leitura Obrigatória' },
        emoji: '📚',
        sections: [
          {
            id: 'l3-system-design',
            title: { es: '1️⃣ System Design', en: '1️⃣ System Design', pt: '1️⃣ System Design' },
            description: { es: 'Estos libros te enseñan a pensar en sistemas a escala. Cómo diseñar YouTube, Twitter, un sistema de pagos. Es lo que te preguntan en entrevistas Senior.', en: 'These books teach you to think about systems at scale. How to design YouTube, Twitter, a payment system. This is what they ask you in Senior interviews.', pt: 'Estes livros te ensinam a pensar em sistemas em escala. Como projetar YouTube, Twitter, um sistema de pagamentos. É o que te perguntam em entrevistas Sênior.' },
            steps: [
              { id: 'l3-sd-1', text: { es: 'Leí "System Design Interview" Vol 1 - Alex Xu', pt: 'Li "System Design Interview" Vol 1 - Alex Xu' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Comprar Vol 1', link: 'https://www.amazon.com/System-Design-Interview-insiders-Second/dp/B08CMF2CQF' } },
              { id: 'l3-sd-2', text: { es: 'Leí "System Design Interview" Vol 2 - Alex Xu', pt: 'Li "System Design Interview" Vol 2 - Alex Xu' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Comprar Vol 2', link: 'https://www.amazon.com/System-Design-Interview-Insiders-Guide/dp/1736049119' } },
              { id: 'l3-sd-3', text: { es: 'Caso que más me gustó', pt: 'Caso que mais gostei' }, type: 'reflection', textInput: { es: 'Ej: Diseño de YouTube...', pt: 'Ex: Design do YouTube...' } },
              { id: 'l3-sd-4', text: { es: 'Concepto nuevo que aprendí', pt: 'Conceito novo que aprendi' }, type: 'reflection', textInput: { es: 'Ej: Consistent hashing...', pt: 'Ex: Consistent hashing...' } },
              { id: 'l3-sd-5', text: { es: 'Completé proyecto "Diseño de Sistema: Analytics Platform"', pt: 'Completei projeto "Design de Sistema: Analytics Platform"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p9-system-design' } },
              { id: 'l3-sd-6', text: { es: '🏋️ Completé ejercicios SQL Interview (FAANG) de la plataforma', pt: '🏋️ Completei exercícios SQL Interview (FAANG) da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'SQL FAANG Interview', link: '/members?tab=ejercicios&category=sql&subcategory=interview' } },
              { id: 'l3-sd-7', text: { es: '🏋️ Completé ejercicios Python Expert de la plataforma', pt: '🏋️ Completei exercícios Python Expert da plataforma' }, type: 'task', checkbox: true, resource: { type: 'exercise', label: 'Python Expert', link: '/members?tab=ejercicios&category=python&difficulty=expert' } },
            ]
          },
          {
            id: 'l3-staff',
            title: { es: '2️⃣ Liderazgo Técnico', en: '2️⃣ Technical Leadership', pt: '2️⃣ Liderança Técnica' },
            description: { es: 'Qué viene después de Senior. Cómo tener impacto a nivel de múltiples equipos. Aunque no quieras ser Staff, entender este nivel te hace mejor Senior.', en: 'What comes after Senior. How to have impact at the level of multiple teams. Even if you don\'t want to be Staff, understanding this level makes you a better Senior.', pt: 'O que vem depois de Sênior. Como ter impacto no nível de múltiplas equipes. Mesmo que não queira ser Staff, entender este nível te faz um melhor Sênior.' },
            steps: [
              { id: 'l3-stf-1', text: { es: 'Leí "Staff Engineer" de Will Larson', pt: 'Li "Staff Engineer" de Will Larson' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Staff Engineer', link: 'https://staffeng.com/book' } },
              { id: 'l3-stf-2', text: { es: '¿Me veo como Staff/Principal en el futuro?', pt: 'Me vejo como Staff/Principal no futuro?' }, type: 'reflection', textInput: { es: 'Sí/No y por qué...', pt: 'Sim/Não e por quê...' } },
              { id: 'l3-stf-3', text: { es: '¿Qué arquetipo de Staff me atrae? (Tech Lead, Architect, Solver, Right Hand)', pt: 'Qual arquétipo de Staff me atrai? (Tech Lead, Architect, Solver, Right Hand)' }, type: 'reflection', textInput: { es: 'Arquetipo...', pt: 'Arquétipo...' } },
              { id: 'l3-stf-4', text: { es: 'Leí "The Manager\'s Path" de Camille Fournier', pt: 'Li "The Manager\'s Path" de Camille Fournier' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Manager\'s Path', link: 'https://www.amazon.com/Managers-Path-Leaders-Navigating-Growth/dp/1491973897' } },
            ]
          },
          {
            id: 'l3-negociacion',
            title: { es: '3️⃣ Negociación', en: '3️⃣ Negotiation', pt: '3️⃣ Negociação' },
            description: { es: 'Para negociar sueldo, deadlines, scope, y manejar stakeholders difíciles.', en: 'For negotiating salary, deadlines, scope, and managing difficult stakeholders.', pt: 'Para negociar salário, prazos, escopo e gerenciar stakeholders difíceis.' },
            steps: [
              { id: 'l3-neg-1', text: { es: 'Leí "Never Split the Difference" de Chris Voss', pt: 'Li "Never Split the Difference" de Chris Voss' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Never Split the Difference', link: 'https://www.amazon.com/Never-Split-Difference-Negotiating-Depended/dp/0062407805' } },
              { id: 'l3-neg-2', text: { es: 'Técnica que más me sirvió', pt: 'Técnica que mais me serviu' }, type: 'reflection', textInput: { es: 'Ej: Mirroring, labeling...', pt: 'Ex: Mirroring, labeling...' } },
              { id: 'l3-neg-3', text: { es: '¿Cuándo la usé?', pt: 'Quando a usei?' }, type: 'reflection', textInput: { es: 'Situación...', pt: 'Situação...' } },
            ]
          }
        ]
      },
      {
        id: 'l3-responsabilidades',
        title: { es: 'Fase 3: Responsabilidades Senior', en: 'Phase 3: Senior Responsibilities', pt: 'Fase 3: Responsabilidades Sênior' },
        emoji: '🎯',
        sections: [
          {
            id: 'l3-mentoring',
            title: { es: '1️⃣ Mentoring', en: '1️⃣ Mentoring', pt: '1️⃣ Mentoria' },
            description: { es: 'Un Senior ayuda a otros a crecer. No es opcional. Es parte del rol.', en: 'A Senior helps others grow. It is not optional. It is part of the role.', pt: 'Um Sênior ajuda outros a crescer. Não é opcional. É parte do papel.' },
            steps: [
              { 
                id: 'l3-men-1', 
                text: { es: 'Estoy mentoreando activamente a alguien junior', pt: 'Estou mentorando ativamente alguém júnior' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Cómo mentorear efectivamente:
  
  1. Reuniones 1:1 regulares (30min/semana)
  2. Dar contexto, no solo respuestas
  3. Hacer preguntas antes de dar soluciones
  4. Celebrar sus logros
  5. Ser paciente con errores (vos también los cometiste)
  
  💡 Mentorear te hace mejor ingeniero. Explicar clarifica tu propio conocimiento.`,
                  pt: `Como mentorar efetivamente:
  
  1. Reuniões 1:1 regulares (30min/semana)
  2. Dar contexto, não apenas respostas
  3. Fazer perguntas antes de dar soluções
  4. Celebrar suas conquistas
  5. Ser paciente com erros (você também os cometeu)
  
  💡 Mentorar te faz um engenheiro melhor. Explicar clarifica seu próprio conhecimento.`
                }
              },
              { id: 'l3-men-2', text: { es: 'Completé proyecto "Documentación para Onboarding"', pt: 'Completei projeto "Documentação para Onboarding"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p10-mentoring-doc' } },
              { 
                id: 'l3-men-3', 
                text: { es: 'Di feedback que ayudó a alguien a mejorar', pt: 'Dei feedback que ajudou alguém a melhorar' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Modelo SBI para feedback:
  
  S - Situación: "En la reunión del martes..."
  B - Behavior: "...noté que interrumpiste a Juan 3 veces..."
  I - Impact: "...eso hizo que perdiera el hilo y la reunión se alargó."
  
  Bueno:
  ✅ Específico, no genérico
  ✅ Sobre comportamiento, no personalidad
  ✅ Dado pronto, no meses después
  ✅ En privado para feedback negativo`,
                  pt: `Modelo SBI para feedback:
  
  S - Situação: "Na reunião de terça-feira..."
  B - Comportamento: "...notei que você interrompeu o Juan 3 vezes..."
  I - Impacto: "...isso fez com que ele perdesse o fio da meada e a reunião se prolongou."
  
  Bom:
  ✅ Específico, não genérico
  ✅ Sobre comportamento, não personalidade
  ✅ Dado logo, não meses depois
  ✅ Em privado para feedback negativo`
                }
              },
              { id: 'l3-men-4', text: { es: 'Nombre de la persona que estoy mentoreando', pt: 'Nome da pessoa que estou mentorando' }, type: 'reflection', textInput: { es: 'Nombre...', pt: 'Nome...' } },
            ]
          },
          {
            id: 'l3-code-review',
            title: { es: '2️⃣ Code Reviews de Calidad', en: '2️⃣ Quality Code Reviews', pt: '2️⃣ Code Reviews de Qualidade' },
            description: { es: 'Tus code reviews deben agregar valor real. No solo "LGTM".', en: 'Your code reviews must add real value. Not just "LGTM".', pt: 'Seus code reviews devem agregar valor real. Não apenas "LGTM".' },
            steps: [
              { id: 'l3-cr-1', text: { es: 'Completé proyecto "Guía de Code Review"', pt: 'Completei projeto "Guia de Code Review"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p11-code-review-guide' } },
              { 
                id: 'l3-cr-2', 
                text: { es: 'Mis reviews incluyen sugerencias constructivas', pt: 'Meus reviews incluem sugestões construtivas' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Code reviews constructivos:
  
  ❌ "Esto está mal"
  ✅ "Esto podría causar X problema. ¿Qué te parece si usamos Y? [link a docs]"
  
  ❌ "Refactoreá esto"
  ✅ "Esta lógica es difícil de seguir. Podrías extraer una función calculate_tax()?"
  
  💡 Proponé soluciones, no solo señales problemas.`,
                  pt: `Code reviews construtivos:
  
  ❌ "Isso está errado"
  ✅ "Isso poderia causar o problema X. O que você acha de usarmos Y? [link para docs]"
  
  ❌ "Refatore isso"
  ✅ "Esta lógica é difícil de seguir. Você poderia extrair uma função calculate_tax()?"
  
  💡 Proponha soluções, não apenas aponte problemas.`
                }
              },
              { 
                id: 'l3-cr-3', 
                text: { es: 'Mis reviews detectan bugs antes de que lleguen a prod', pt: 'Meus reviews detectam bugs antes que cheguem em prod' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Qué buscar en un code review:
  
  🔍 Edge cases: ¿qué pasa con null, vacío, negativo?
  🔍 Concurrencia: ¿hay race conditions?
  🔍 Performance: ¿N+1 queries? ¿loops innecesarios?
  🔍 Seguridad: ¿SQL injection? ¿secrets hardcodeados?
  🔍 Tests: ¿cubren los casos importantes?
  
  💡 Leé el código como si lo fueras a debuggear a las 3am.`,
                  pt: `O que buscar em um code review:
  
  🔍 Edge cases: o que acontece com null, vazio, negativo?
  🔍 Concorrência: há race conditions?
  🔍 Performance: N+1 queries? loops desnecessários?
  🔍 Segurança: SQL injection? secrets hardcoded?
  🔍 Testes: cobrem os casos importantes?
  
  💡 Leia o código como se fosse debugá-lo às 3am.`
                }
              },
              { 
                id: 'l3-cr-4', 
                text: { es: 'Mis reviews ayudan a juniors a aprender', pt: 'Meus reviews ajudam juniores a aprender' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Cómo usar reviews para enseñar:
  
  1. Explicá el "por qué", no solo el "qué"
  2. Linkeá documentación/artículos útiles
  3. Reconocé lo que está bien, no solo lo malo
  4. Para cambios grandes, ofrecé pair programming
  
  💡 Un buen review deja al autor sabiendo más que antes.`,
                  pt: `Como usar reviews para ensinar:
  
  1. Explique o "porquê", não apenas o "o quê"
  2. Link documentação/artigos úteis
  3. Reconheça o que está bom, não apenas o ruim
  4. Para mudanças grandes, ofereça pair programming
  
  💡 Um bom review deixa o autor sabendo mais do que antes.`
                }
              },
            ]
          },
          {
            id: 'l3-incidentes',
            title: { es: '3️⃣ Manejo de Incidentes', en: '3️⃣ Incident Management', pt: '3️⃣ Gestão de Incidentes' },
            description: { es: 'Cuando algo explota, ¿sos parte de la solución o del pánico?', en: 'When something breaks, are you part of the solution or the panic?', pt: 'Quando algo explode, você é parte da solução ou do pânico?' },
            steps: [
              { id: 'l3-inc-1', text: { es: 'Completé proyecto "Postmortem de Incidente"', pt: 'Completei projeto "Postmortem de Incidente"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p12-incident-postmortem' } },
              { 
                id: 'l3-inc-2', 
                text: { es: 'Lideré la resolución de un incidente', pt: 'Liderei a resolução de um incidente' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Cómo liderar un incidente:
  
  1. CALMA - no entres en pánico
  2. COMUNICÁ - "Estoy investigando X, update en 15 min"
  3. MITIGÁ - solución temporal para restaurar servicio
  4. INVESTIGÁ - root cause (puede ser después)
  5. DOCUMENTÁ - qué pasó, qué hicimos, qué aprendimos
  
  💡 Liderar no es resolver solo. Es coordinar al equipo.`,
                  pt: `Como liderar um incidente:
  
  1. CALMA - não entre em pânico
  2. COMUNIQUE - "Estou investigando X, update em 15 min"
  3. MITIGUE - solução temporária para restaurar serviço
  4. INVESTIGUE - causa raiz (pode ser depois)
  5. DOCUMENTE - o que aconteceu, o que fizemos, o que aprendemos
  
  💡 Liderar não é resolver sozinho. É coordenar a equipe.`
                }
              },
              { 
                id: 'l3-inc-3', 
                text: { es: 'Escribí un postmortem blameless', pt: 'Escrevi um postmortem blameless' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Estructura de postmortem:
  
  1. Summary: qué pasó, impacto
  2. Timeline: hora por hora qué se hizo
  3. Root cause: por qué pasó (5 whys)
  4. What went well: qué funcionó
  5. What went wrong: qué podemos mejorar
  6. Action items: cambios concretos
  
  💡 BLAMELESS = no culpar personas. Culpar al SISTEMA que permitió el error.`,
                  pt: `Estrutura de postmortem:
  
  1. Resumo: o que aconteceu, impacto
  2. Timeline: hora a hora o que foi feito
  3. Causa raiz: por que aconteceu (5 porquês)
  4. O que correu bem: o que funcionou
  5. O que correu mal: o que podemos melhorar
  6. Itens de ação: mudanças concretas
  
  💡 BLAMELESS = não culpar pessoas. Culpar o SISTEMA que permitiu o erro.`
                }
              },
              { 
                id: 'l3-inc-4', 
                text: { es: 'Implementé mejoras para evitar que se repita', pt: 'Implementei melhorias para evitar que se repita' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Tipos de mejoras post-incidente:
  
  🔧 Técnicas:
  - Más alertas/monitoreo
  - Circuit breakers, retries
  - Mejor validación de datos
  
  📋 Proceso:
  - Checklist de deploy
  - Runbooks actualizados
  - Mejor documentación
  
  💡 El objetivo es que el MISMO error no pueda pasar de nuevo.`,
                  pt: `Tipos de melhorias pós-incidente:
  
  🔧 Técnicas:
  - Mais alertas/monitoramento
  - Circuit breakers, retries
  - Melhor validação de dados
  
  📋 Processo:
  - Checklist de deploy
  - Runbooks atualizados
  - Melhor documentação
  
  💡 O objetivo é que o MESMO erro não possa acontecer de novo.`
                }
              },
            ]
          },
          {
            id: 'l3-autoevaluacion',
            title: { es: '4️⃣ Autoevaluación: ¿Soy Senior?', en: '4️⃣ Self-Evaluation: Am I Senior?', pt: '4️⃣ Autoavaliação: Sou Sênior?' },
            description: { es: 'Marcá con honestidad. Si tenés 8+, sos crack. Si tenés menos, ya sabés qué mejorar.', en: 'Mark with honesty. If you have 8+, you\'re a pro. If you have less, you know what to improve.', pt: 'Marque com honestidade. Se tiver 8+, você é fera. Se tiver menos, já sabe o que melhorar.' },
            steps: [
              { id: 'l3-auto-1', text: { es: 'TÉCNICO: Puedo diseñar una arquitectura desde cero', pt: 'TÉCNICO: Posso projetar uma arquitetura do zero' }, type: 'task', checkbox: true },
              { id: 'l3-auto-2', text: { es: 'TÉCNICO: Puedo defender mis decisiones técnicas con argumentos', pt: 'TÉCNICO: Posso defender minhas decisões técnicas com argumentos' }, type: 'task', checkbox: true },
              { id: 'l3-auto-3', text: { es: 'TÉCNICO: Mis code reviews agregan valor real', pt: 'TÉCNICO: Meus code reviews agregam valor real' }, type: 'task', checkbox: true },
              { id: 'l3-auto-4', text: { es: 'TÉCNICO: Identifico deuda técnica antes de que explote', pt: 'TÉCNICO: Identifico dívida técnica antes que exploda' }, type: 'task', checkbox: true },
              { id: 'l3-auto-5', text: { es: 'SOFT: Puedo explicar problemas técnicos a no técnicos', pt: 'SOFT: Posso explicar problemas técnicos a não técnicos' }, type: 'task', checkbox: true },
              { id: 'l3-auto-6', text: { es: 'SOFT: Mis estimaciones son precisas (±20%)', pt: 'SOFT: Minhas estimativas são precisas (±20%)' }, type: 'task', checkbox: true },
              { id: 'l3-auto-7', text: { es: 'SOFT: Sé decir "no" sin quedar mal', pt: 'SOFT: Sei dizer "não" sem ficar mal' }, type: 'task', checkbox: true },
              { id: 'l3-auto-8', text: { es: 'SOFT: Documento mis decisiones importantes', pt: 'SOFT: Documento minhas decisões importantes' }, type: 'task', checkbox: true },
              { id: 'l3-auto-9', text: { es: 'SOFT: Manejo bien el estrés y las urgencias', pt: 'SOFT: Lido bem com estresse e urgências' }, type: 'task', checkbox: true },
              { id: 'l3-auto-10', text: { es: 'LIDERAZGO: Mentoreo activamente a alguien', pt: 'LIDERANÇA: Mentoro ativamente alguém' }, type: 'task', checkbox: true },
              { id: 'l3-auto-11', text: { es: 'Total de checks (de 10)', pt: 'Total de checks (de 10)' }, type: 'reflection', textInput: { es: 'X/10', en: 'X/10', pt: 'X/10' } },
            ]
          }
        ]
      },
      {
        id: 'l3-tecnico-profundo',
        title: { es: 'Fase 4: Dominio Técnico Avanzado', en: 'Phase 4: Advanced Technical Mastery', pt: 'Fase 4: Domínio Técnico Avançado' },
        emoji: '🔬',
        sections: [
          {
            id: 'l3-best-practices',
            title: { es: '🏆 Best Practices de Lead Data Engineer', en: '🏆 Lead Data Engineer Best Practices', pt: '🏆 Best Practices de Lead Data Engineer' },
            description: { es: 'Estas son las prácticas que separan a un Senior de un Lead. No son opcionales - son lo que te hace confiable.', en: 'These are the practices that separate a Senior from a Lead. They are not optional - they are what make you trustworthy.', pt: 'Estas são as práticas que separam um Sênior de um Lead. Não são opcionais - são o que te faz confiável.' },
            steps: [
              { 
                id: 'l3-bp-1', 
                text: { es: '📁 ESTRUCTURA DE PROYECTOS: Uso estructura estándar (src/, tests/, config/, docs/)', pt: '📁 ESTRUTURA DE PROJETOS: Uso estrutura padrão (src/, tests/, config/, docs/)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Estructura típica de proyecto DE:
  
  my_project/
  ├── src/
  │   └── etl/
  │       ├── extract.py
  │       ├── transform.py
  │       └── load.py
  ├── tests/
  ├── config/
  ├── docs/
  ├── requirements.txt
  └── README.md
  
  💡 La consistencia importa más que la estructura exacta.`,
                  pt: `Estrutura típica de projeto DE:
  
  my_project/
  ├── src/
  │   └── etl/
  │       ├── extract.py
  │       ├── transform.py
  │       └── load.py
  ├── tests/
  ├── config/
  ├── docs/
  ├── requirements.txt
  └── README.md
  
  💡 A consistência importa mais que a estrutura exata.`
                }
              },
              { 
                id: 'l3-bp-2', 
                text: { es: '📁 Separo código de configuración (no hardcodeo paths, credenciales)', pt: '📁 Separo código de configuração (não hardcoded paths, credenciais)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `❌ Hardcodeado:
  bucket = "s3://produccion-data-lake/raw/"
  api_key = "sk-abc123..."
  
  ✅ Configurable:
  bucket = os.environ.get("DATA_BUCKET")
  api_key = os.environ.get("API_KEY")
  
  💡 Esto permite cambiar entre dev/prod sin cambiar código.`,
                  pt: `❌ Hardcoded:
  bucket = "s3://produccion-data-lake/raw/"
  api_key = "sk-abc123..."
  
  ✅ Configurável:
  bucket = os.environ.get("DATA_BUCKET")
  api_key = os.environ.get("API_KEY")
  
  💡 Isso permite mudar entre dev/prod sem mudar código.`
                }
              },
              { 
                id: 'l3-bp-3', 
                text: { es: '📁 Uso .env para secrets y config/, settings.py para configuración', pt: '📁 Uso .env para secrets e config/, settings.py para configuração' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `.env (NO comitear):
  AWS_ACCESS_KEY=xxx
  DATABASE_URL=postgres://...
  
  config/settings.py (SÍ comitear):
  BATCH_SIZE = 1000
  RETRY_COUNT = 3
  LOG_LEVEL = "INFO"
  
  💡 Agregá .env a .gitignore. Creá .env.example como template.`,
                  pt: `.env (NÃO commitar):
  AWS_ACCESS_KEY=xxx
  DATABASE_URL=postgres://...
  
  config/settings.py (SIM commitar):
  BATCH_SIZE = 1000
  RETRY_COUNT = 3
  LOG_LEVEL = "INFO"
  
  💡 Adicione .env ao .gitignore. Crie .env.example como template.`
                }
              },
              { 
                id: 'l3-bp-4', 
                text: { es: '🌀 ORQUESTADORES: Mis DAGs son "thin" - solo orquestan, no tienen lógica pesada', pt: '🌀 ORQUESTRADORES: Meus DAGs são "thin" - só orquestram, não têm lógica pesada' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `❌ Mal: Lógica compleja dentro del DAG
  def my_task():
      df = spark.read.parquet()
      # 200 líneas de transformación...
      df.write.parquet()
  
  ✅ Bien: DAG "thin" que llama módulos
  from etl.transformations import process_sales
  def my_task():
      process_sales(date=execution_date)`,
                  pt: `❌ Mal: Lógica complexa dentro do DAG
  def my_task():
      df = spark.read.parquet()
      # 200 linhas de transformação...
      df.write.parquet()
  
  ✅ Bem: DAG "thin" que chama módulos
  from etl.transformations import process_sales
  def my_task():
      process_sales(date=execution_date)`
                }
              },
              { 
                id: 'l3-bp-5', 
                text: { es: '🌀 La lógica de negocio está en módulos Python separados, no en el DAG', pt: '🌀 A lógica de negócio está em módulos Python separados, não no DAG' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Estructura recomendada:
  /dags
    pipeline.py  ← Solo orquestación
  /src
    /etl
      transformations.py  ← Lógica de negocio
      validations.py
  /tests
    test_transformations.py  ← Testeable!
  
  💡 Beneficio: Podés testear la lógica sin Airflow.`,
                  pt: `Estrutura recomendada:
  /dags
    pipeline.py  ← Só orquestração
  /src
    /etl
      transformations.py  ← Lógica de negócio
      validations.py
  /tests
    test_transformations.py  ← Testável!
  
  💡 Benefício: Pode testar a lógica sem Airflow.`
                }
              },
              { 
                id: 'l3-bp-6', 
                text: { es: '🌀 Uso BashOperator/PythonOperator que llaman scripts externos', pt: '🌀 Uso BashOperator/PythonOperator que chamam scripts externos' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `# BashOperator llamando script
  BashOperator(
      task_id='run_etl',
      bash_command='python /src/etl/main.py --date {{ ds }}'
  )
  
  # PythonOperator llamando función importada
  from src.etl import process_sales
  PythonOperator(
      task_id='process',
      python_callable=process_sales
  )`,
                  pt: `# BashOperator chamando script
  BashOperator(
      task_id='run_etl',
      bash_command='python /src/etl/main.py --date {{ ds }}'
  )
  
  # PythonOperator chamando função importada
  from src.etl import process_sales
  PythonOperator(
      task_id='process',
      python_callable=process_sales
  )`
                }
              },
              { 
                id: 'l3-bp-7', 
                text: { es: '📝 LOGGING: Uso logging estructurado (JSON) en vez de print()', pt: '📝 LOGGING: Uso logging estruturado (JSON) em vez de print()' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `❌ print("Error en proceso")
  
  ✅ Logging estructurado:
  import logging
  logger = logging.getLogger(__name__)
  logger.error("Error en proceso", extra={
      "job_id": "12345",
      "table": "orders",
      "error_type": "schema_mismatch"
  })
  
  💡 JSON logs son parseables por CloudWatch, Datadog, etc.`,
                  pt: `❌ print("Erro no processo")
  
  ✅ Logging estruturado:
  import logging
  logger = logging.getLogger(__name__)
  logger.error("Erro no processo", extra={
      "job_id": "12345",
      "table": "orders",
      "error_type": "schema_mismatch"
  })
  
  💡 JSON logs são parseáveis por CloudWatch, Datadog, etc.`
                }
              },
              { 
                id: 'l3-bp-8', 
                text: { es: '📝 Mis logs tienen: timestamp, level, message, context (job_id, etc)', pt: '📝 Meus logs têm: timestamp, level, message, context (job_id, etc)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Un buen log entry:
  {
    "timestamp": "2024-01-15T10:30:00Z",
    "level": "ERROR",
    "message": "Failed to process batch",
    "job_id": "etl-12345",
    "batch_size": 1000,
    "error": "Connection timeout"
  }
  
  💡 Con contexto podés filtrar en CloudWatch/Datadog.`,
                  pt: `Um bom log entry:
  {
    "timestamp": "2024-01-15T10:30:00Z",
    "level": "ERROR",
    "message": "Failed to process batch",
    "job_id": "etl-12345",
    "batch_size": 1000,
    "error": "Connection timeout"
  }
  
  💡 Com contexto você pode filtrar no CloudWatch/Datadog.`
                }
              },
              { 
                id: 'l3-bp-9', 
                text: { es: '📝 Configuro diferentes niveles: DEBUG en dev, INFO/WARNING en prod', pt: '📝 Configuro diferentes níveis: DEBUG em dev, INFO/WARNING em prod' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Niveles de log:
  DEBUG: Todo detalle (solo dev)
  INFO: Eventos normales importantes
  WARNING: Algo raro pero no crítico
  ERROR: Algo falló
  CRITICAL: Sistema caído
  
  Config típica:
  DEV: DEBUG (ver todo)
  PROD: INFO (no llenar storage)`,
                  pt: `Níveis de log:
  DEBUG: Todo detalhe (apenas dev)
  INFO: Eventos normais importantes
  WARNING: Algo estranho mas não crítico
  ERROR: Algo falhou
  CRITICAL: Sistema caído
  
  Config típica:
  DEV: DEBUG (ver tudo)
  PROD: INFO (não encher storage)`
                }
              },
              { 
                id: 'l3-bp-10', 
                text: { es: '🔀 GIT: Uso feature branches (nunca commit directo a main)', pt: '🔀 GIT: Uso feature branches (nunca commit direto na main)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Workflow profesional:
  
  1. git checkout -b feature/add-validation
  2. Hacer cambios, commits
  3. Push y crear PR
  4. Code review
  5. Merge a main
  
  💡 main siempre debe estar deployable. Los feature branches protegen eso.`,
                  pt: `Workflow profissional:
  
  1. git checkout -b feature/add-validation
  2. Fazer mudanças, commits
  3. Push e criar PR
  4. Code review
  5. Merge na main
  
  💡 main sempre deve estar deployável. As feature branches protegem isso.`
                }
              },
              { 
                id: 'l3-bp-11', 
                text: { es: '🔀 Mis commits son atómicos y con mensajes descriptivos', pt: '🔀 Meus commits são atômicos e com mensagens descritivas' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Commit atómico = UN cambio lógico.
  
  ❌ Malo:
  "Fix everything"
  "Update files"
  
  ✅ Bueno:
  "Add null check to extract_users function"
  "Refactor SQL query for better performance"
  "Fix #123: Handle empty API response"
  
  💡 Si tu mensaje tiene "y", probablemente deberían ser 2 commits.`,
                  pt: `Commit atômico = UMA mudança lógica.
  
  ❌ Ruim:
  "Fix everything"
  "Update files"
  
  ✅ Bom:
  "Add null check to extract_users function"
  "Refactor SQL query for better performance"
  "Fix #123: Handle empty API response"
  
  💡 Se sua mensagem tem "e", provavelmente deveriam ser 2 commits.`
                }
              },
              { 
                id: 'l3-bp-12', 
                text: { es: '🔀 Uso PRs con code review antes de mergear', pt: '🔀 Uso PRs com code review antes de mergear' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `PR = Pull Request / Merge Request.
  
  Un buen PR incluye:
  - Descripción de qué cambia y por qué
  - Screenshots si es UI
  - Cómo testear
  - Link a ticket/issue
  
  💡 PRs pequeños se aprueban más rápido. 200-400 líneas ideal.`,
                  pt: `PR = Pull Request / Merge Request.
  
  Um bom PR inclui:
  - Descrição do que muda e por quê
  - Screenshots se for UI
  - Como testar
  - Link para ticket/issue
  
  💡 PRs pequenos são aprovados mais rápido. 200-400 linhas ideal.`
                }
              },
              { 
                id: 'l3-bp-13', 
                text: { es: '🔀 Sé resolver conflictos de merge sin romper nada', pt: '🔀 Sei resolver conflitos de merge sem quebrar nada' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Pasos para resolver conflictos:
  
  1. git fetch origin
  2. git merge origin/main (o rebase)
  3. Abrir archivos con conflictos
  4. Elegir qué mantener (o combinar)
  5. git add <archivos>
  6. git commit
  
  <<<< HEAD
  tu código
  ====
  código de ellos
  >>>> main
  
  💡 Ante la duda, preguntá al autor del otro cambio.`,
                  pt: `Passos para resolver conflitos:
  
  1. git fetch origin
  2. git merge origin/main (ou rebase)
  3. Abrir arquivos com conflitos
  4. Escolher o que manter (ou combinar)
  5. git add <arquivos>
  6. git commit
  
  <<<< HEAD
  seu código
  ====
  código deles
  >>>> main
  
  💡 Na dúvida, pergunte ao autor da outra mudança.`
                }
              },
              { 
                id: 'l3-bp-14', 
                text: { es: '📄 DOCUMENTACIÓN: Escribo ADRs (Architecture Decision Records) para decisiones importantes', pt: '📄 DOCUMENTAÇÃO: Escrevo ADRs (Architecture Decision Records) para decisões importantes' }, 
                type: 'task', 
                checkbox: true, 
                resource: { type: 'external', label: 'ADR Template', link: 'https://adr.github.io/' },
                explanation: {
                  es: `ADR = documento que explica una decisión técnica.
  
  📝 Estructura:
  1. Contexto: ¿Qué problema resolvemos?
  2. Decisión: ¿Qué elegimos?
  3. Alternativas consideradas
  4. Consecuencias: Pros y contras
  
  💡 En 6 meses cuando pregunten "¿por qué usamos X?", el ADR responde.`,
                  pt: `ADR = documento que explica uma decisão técnica.
  
  📝 Estrutura:
  1. Contexto: Que problema resolvemos?
  2. Decisão: O que escolhemos?
  3. Alternativas consideradas
  4. Consequências: Prós e contras
  
  💡 Em 6 meses quando perguntarem "por que usamos X?", o ADR responde.`
                }
              },
              { 
                id: 'l3-bp-15', 
                text: { es: '📄 Documento trade-offs y razones detrás de mis decisiones técnicas', pt: '📄 Documento trade-offs e razões por trás das minhas decisões técnicas' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Ejemplo de trade-off documentado:
  
  "Elegimos Parquet sobre CSV porque:
  ✅ 10x menos storage
  ✅ Queries 50x más rápidas con Athena
  ❌ Requiere herramientas especiales para leer
  ❌ No humano-legible
  
  La complejidad extra vale la pena dado el volumen (10TB/día)."`,
                  pt: `Exemplo de trade-off documentado:
  
  "Escolhemos Parquet sobre CSV porque:
  ✅ 10x menos storage
  ✅ Queries 50x mais rápidas com Athena
  ❌ Requer ferramentas especiais para ler
  ❌ Não humano-legível
  
  A complexidade extra vale a pena dado o volume (10TB/dia)."`
                }
              },
              { 
                id: 'l3-bp-16', 
                text: { es: '💰 COSTOS: Sé estimar el costo de un pipeline en la nube (compute, storage, transfer)', pt: '💰 CUSTOS: Sei estimar o custo de um pipeline na nuvem (compute, storage, transfer)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Componentes de costo en AWS:
  
  💾 STORAGE: S3 ~$0.023/GB/mes
  ⚡ COMPUTE: 
  - EMR: $0.10-$3/hora por nodo
  - Glue: $0.44/DPU-hora
  📊 QUERIES: Athena $5/TB escaneado
  🔄 TRANSFER: $0.09/GB saliente
  
  💡 Tip: Parquet + particiones = 10x menos costo en Athena.`,
                  pt: `Componentes de custo na AWS:
  
  💾 STORAGE: S3 ~$0.023/GB/mês
  ⚡ COMPUTE: 
  - EMR: $0.10-$3/hora por nó
  - Glue: $0.44/DPU-hora
  📊 QUERIES: Athena $5/TB escaneado
  🔄 TRANSFER: $0.09/GB sainte
  
  💡 Dica: Parquet + partições = 10x menos custo no Athena.`
                }
              },
              { 
                id: 'l3-bp-17', 
                text: { es: '💰 Optimizo pipelines considerando costo vs performance', pt: '💰 Otimizo pipelines considerando custo vs performance' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Optimizaciones de costo:
  
  1. Usar Spot instances (~70% ahorro)
  2. Comprimir datos (Parquet con Snappy)
  3. Particionar por fecha (menos data escaneada)
  4. Auto-scaling down cuando no hay trabajo
  5. Reserved capacity para workloads predecibles
  
  💡 Siempre preguntate: "¿Vale la pena pagar 2x por ser 10% más rápido?"`,
                  pt: `Otimizações de custo:
  
  1. Usar Spot instances (~70% economia)
  2. Comprimir dados (Parquet com Snappy)
  3. Particionar por data (menos dados escaneados)
  4. Auto-scaling down quando não há trabalho
  5. Reserved capacity para workloads previsíveis
  
  💡 Sempre se pergunte: "Vale a pena pagar 2x para ser 10% mais rápido?"`
                }
              },
              { 
                id: 'l3-bp-18', 
                text: { es: '🔄 SCHEMA EVOLUTION: Entiendo cómo manejar cambios de schema sin romper pipelines', pt: '🔄 SCHEMA EVOLUTION: Entendo como lidar com mudanças de schema sem quebrar pipelines' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Cambios de schema que rompen:
  ❌ Eliminar columna que alguien usa
  ❌ Cambiar tipo incompatible (int → string OK, string → int ❌)
  ❌ Renombrar sin alias
  
  Cambios seguros:
  ✅ Agregar columna nullable
  ✅ Agregar default value
  ✅ Widening (int32 → int64)
  
  💡 Siempre: backward compatible primero, deprecar, luego eliminar.`,
                  pt: `Mudanças de schema que quebram:
  ❌ Eliminar coluna que alguém usa
  ❌ Mudar tipo incompatível (int → string OK, string → int ❌)
  ❌ Renomear sem alias
  
  Mudanças seguras:
  ✅ Adicionar coluna nullable
  ✅ Adicionar valor padrão
  ✅ Widening (int32 → int64)
  
  💡 Sempre: backward compatible primeiro, deprecar, depois eliminar.`
                }
              },
              { 
                id: 'l3-bp-19', 
                text: { es: '🔄 Uso schema registry o versionado de schemas cuando es necesario', pt: '🔄 Uso schema registry ou versionamento de schemas quando necessário' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Schema Registry (ej: Confluent para Kafka):
  - Valida que productores envíen schema correcto
  - Versiona schemas (v1, v2, v3...)
  - Rechaza cambios incompatibles
  
  💡 Alternativas:
  - Avro con schema embebido
  - Delta Lake schema enforcement
  - dbt contracts`,
                  pt: `Schema Registry (ex: Confluent para Kafka):
  - Valida que produtores enviem schema correto
  - Versiona schemas (v1, v2, v3...)
  - Rejeita mudanças incompatíveis
  
  💡 Alternativas:
  - Avro com schema embutido
  - Delta Lake schema enforcement
  - dbt contracts`
                }
              },
              { 
                id: 'l3-bp-20', 
                text: { es: '🏛️ DATA GOVERNANCE: Entiendo la diferencia entre Data Governance y Data Stewardship', pt: '🏛️ DATA GOVERNANCE: Entendo a diferença entre Data Governance e Data Stewardship' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `📋 DATA GOVERNANCE: Políticas y reglas
  - Quién puede acceder a qué datos
  - Cómo se clasifican los datos (PII, confidencial)
  - Retención y eliminación
  - Compliance (GDPR, HIPAA)
  
  👤 DATA STEWARDSHIP: Implementación
  - Personas responsables de cada dataset
  - Mantienen calidad y metadata
  - Responden preguntas de negocio`,
                  pt: `📋 DATA GOVERNANCE: Políticas e regras
  - Quem pode acessar quais dados
  - Como os dados são classificados (PII, confidencial)
  - Retenção e eliminação
  - Compliance (GDPR, HIPAA)
  
  👤 DATA STEWARDSHIP: Implementação
  - Pessoas responsáveis por cada dataset
  - Mantêm qualidade e metadados
  - Respondem perguntas de negócio`
                }
              },
              { 
                id: 'l3-bp-21', 
                text: { es: '🏛️ Implemento lineage y catalogación de datos', pt: '🏛️ Implemento linhagem e catalogação de dados' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `📊 DATA LINEAGE: De dónde viene cada dato
  "La columna revenue viene de orders.total * fx_rate"
  Herramientas: OpenLineage, Marquez, dbt docs
  
  📚 DATA CATALOG: Qué datos existen y qué significan
  - Lista de tablas/datasets
  - Descripciones de columnas
  - Owners y contactos
  Herramientas: DataHub, Amundsen, AWS Glue Catalog`,
                  pt: `📊 DATA LINEAGE: De onde vem cada dado
  "A coluna revenue vem de orders.total * fx_rate"
  Ferramentas: OpenLineage, Marquez, dbt docs
  
  📚 DATA CATALOG: Que dados existem e o que significam
  - Lista de tabelas/datasets
  - Descrições de colunas
  - Owners e contatos
  Ferramentas: DataHub, Amundsen, AWS Glue Catalog`
                }
              },
            ]
          },
          {
            id: 'l3-formatos-storage',
            title: { es: '📦 Formatos de Archivo y Storage', pt: '📦 Formatos de Arquivo e Storage' },
            description: { es: 'Elegir el formato correcto puede hacer tu pipeline 10x más rápido. Esto es lo que un Lead sabe.', pt: 'Escolher o formato correto pode fazer seu pipeline 10x mais rápido. Isso é o que um Lead sabe.' },
            steps: [
              { 
                id: 'l3-fmt-1', 
                text: { es: 'Entiendo Row-oriented (CSV, JSON) vs Columnar (Parquet, ORC)', pt: 'Entendo Row-oriented (CSV, JSON) vs Columnar (Parquet, ORC)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `📏 ROW-ORIENTED (CSV, JSON):
  Lee fila completa → bueno para: SELECT *
  Malo para: SELECT columna (lee todo igual)
  
  📊 COLUMNAR (Parquet, ORC):
  Lee columnas individuales → bueno para: SELECT columna
  Comprime mejor (valores similares juntos)
  10-100x más eficiente para analytics`,
                  pt: `📏 ROW-ORIENTED (CSV, JSON):
  Lê linha completa → bom para: SELECT *
  Ruim para: SELECT coluna (lê tudo igual)
  
  📊 COLUMNAR (Parquet, ORC):
  Lê colunas individuais → bom para: SELECT coluna
  Comprime melhor (valores similares juntos)
  10-100x mais eficiente para analytics`
                }
              },
              { 
                id: 'l3-fmt-2', 
                text: { es: 'Sé cuándo usar cada uno: CSV para intercambio, Parquet para analytics', pt: 'Sei quando usar cada um: CSV para troca, Parquet para analytics' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `📝 CSV: Intercambio, archivos pequeños, lectura humana
  📦 JSON: APIs, datos semi-estructurados, logs
  📊 PARQUET: Analytics, Data Lakes, Spark
  📊 ORC: Similar a Parquet, mejor para Hive
  🔄 AVRO: Streaming (Kafka), evolución de schema
  
  💡 Regla simple: Si es para analytics → Parquet.`,
                  pt: `📝 CSV: Troca, arquivos pequenos, leitura humana
  📦 JSON: APIs, dados semi-estruturados, logs
  📊 PARQUET: Analytics, Data Lakes, Spark
  📊 ORC: Similar a Parquet, melhor para Hive
  🔄 AVRO: Streaming (Kafka), evolução de schema
  
  💡 Regra simples: Se é para analytics → Parquet.`
                }
              },
              { 
                id: 'l3-fmt-3', 
                text: { es: 'Entiendo compresión: Snappy (rápido), Gzip (pequeño), Zstd (balance)', pt: 'Entendo compressão: Snappy (rápido), Gzip (pequeno), Zstd (balanceado)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `⚡ SNAPPY: Rápido de comprimir/descomprimir
  - ~2x compresión
  - Ideal para Spark (velocidad > tamaño)
  
  📦 GZIP: Máxima compresión
  - ~5-10x compresión
  - Lento, bueno para archivos que no se leen seguido
  
  ⚖️ ZSTD: Balance
  - 3-5x compresión
  - Velocidad decente
  - La opción moderna recomendada`,
                  pt: `⚡ SNAPPY: Rápido de comprimir/descomprimir
  - ~2x compressão
  - Ideal para Spark (velocidade > tamanho)
  
  📦 GZIP: Máxima compressão
  - ~5-10x compressão
  - Lento, bom para arquivos que não são lidos com frequência
  
  ⚖️ ZSTD: Balanceado
  - 3-5x compressão
  - Velocidade decente
  - A opção moderna recomendada`
                }
              },
              { 
                id: 'l3-fmt-4', 
                text: { es: 'Entiendo RLE (Run Length Encoding) y por qué Parquet lo usa', pt: 'Entendo RLE (Run Length Encoding) e por que Parquet o usa' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `RLE comprime valores repetidos:
  
  Antes: [USA, USA, USA, USA, USA]
  Después: [(USA, 5)]  ← "USA aparece 5 veces"
  
  💡 Parquet agrupa por columna, entonces:
  - Columna "país" tiene muchas repeticiones
  - RLE comprime muchísimo
  - Por eso ordenar datos por columnas categóricas mejora compresión`,
                  pt: `RLE comprime valores repetidos:
  
  Antes: [USA, USA, USA, USA, USA]
  Depois: [(USA, 5)]  ← "USA aparece 5 vezes"
  
  💡 Parquet agrupa por coluna, então:
  - Coluna "país" tem muitas repetições
  - RLE comprime muitíssimo
  - Por isso ordenar dados por colunas categóricas melhora a compressão`
                }
              },
              { 
                id: 'l3-fmt-5', 
                text: { es: 'Sé qué es Dictionary Encoding y cuándo es efectivo', pt: 'Sei o que é Dictionary Encoding e quando é efetivo' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Dictionary Encoding reemplaza valores por IDs:
  
  Diccionario: {0: "Argentina", 1: "Brasil", 2: "Chile"}
  Datos: [0, 0, 1, 2, 0, 1]  ← Mucho más pequeño
  
  💡 Efectivo cuando:
  - Columna tiene pocos valores únicos (país, estado)
  - Valores son strings largos
  
  ❌ Inefectivo cuando:
  - Muchos valores únicos (IDs, timestamps)`,
                  pt: `Dictionary Encoding substitui valores por IDs:
  
  Dicionário: {0: "Argentina", 1: "Brasil", 2: "Chile"}
  Dados: [0, 0, 1, 2, 0, 1]  ← Muito menor
  
  💡 Efetivo quando:
  - Coluna tem poucos valores únicos (país, estado)
  - Valores são strings longos
  
  ❌ Inefetivo quando:
  - Muitos valores únicos (IDs, timestamps)`
                }
              },
              { 
                id: 'l3-fmt-6', 
                text: { es: 'Entiendo Predicate Pushdown y cómo Parquet lo habilita', pt: 'Entendo Predicate Pushdown e como Parquet o habilita' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Predicate Pushdown = filtrar ANTES de leer todo.
  
  SELECT * FROM tabla WHERE fecha = '2024-01-01'
  
  Sin pushdown: Lee 100GB, filtra después
  Con pushdown: Lee solo el row group con fecha 2024-01-01
  
  💡 Parquet guarda min/max por row group.
  Si min_fecha=2024-02-01, sabe que ese grupo no tiene enero y lo salta.`,
                  pt: `Predicate Pushdown = filtrar ANTES de ler tudo.
  
  SELECT * FROM tabela WHERE fecha = '2024-01-01'
  
  Sem pushdown: Lê 100GB, filtra depois
  Com pushdown: Lê apenas o row group com data 2024-01-01
  
  💡 Parquet guarda min/max por row group.
  Se min_fecha=2024-02-01, sabe que esse grupo não tem janeiro e o pula.`
                }
              },
              { 
                id: 'l3-fmt-7', 
                text: { es: 'Sé elegir el row group size óptimo para mi caso de uso', pt: 'Sei escolher o row group size ideal para meu caso de uso' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Row Group = bloque de filas en Parquet.
  
  📏 MUY PEQUEÑO (<64MB):
  - Más overhead de metadata
  - Pero mejor para queries muy selectivos
  
  📏 MUY GRANDE (>256MB):
  - Menos overhead
  - Pero lee más datos de los necesarios
  
  💡 Default: 128MB es bueno para la mayoría.
  Si queries filtran mucho → 64MB
  Si queries leen mucho → 256MB`,
                  pt: `Row Group = bloco de linhas em Parquet.
  
  📏 MUITO PEQUENO (<64MB):
  - Mais overhead de metadados
  - Mas melhor para queries muito seletivas
  
  📏 MUITO GRANDE (>256MB):
  - Menos overhead
  - Mas lê mais dados do que o necessário
  
  💡 Padrão: 128MB é bom para a maioria.
  Se queries filtram muito → 64MB
  Se queries leem muito → 256MB`
                }
              },
            ]
          },
          {
            id: 'l3-partitioning',
            title: { es: '🗂️ Particionamiento Avanzado', pt: '🗂️ Particionamento Avançado' },
            description: { es: 'El particionamiento correcto puede hacer que queries de 1 hora tarden 10 segundos.', pt: 'O particionamento correto pode fazer com que queries de 1 hora demorem 10 segundos.' },
            steps: [
              { 
                id: 'l3-part-1', 
                text: { es: 'Entiendo particionamiento por fecha (year/month/day) y cuándo usarlo', pt: 'Entendo particionamento por data (year/month/day) e quando usá-lo' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Particionamiento = organizar datos en carpetas.
  
  data/
    year=2024/
      month=01/
      month=02/
    year=2023/
  
  Beneficio: cuando filtrás por fecha, solo lee las carpetas relevantes.
  
  💡 Usalo cuando el 90%+ de tus queries filtran por esa columna.`,
                  pt: `Particionamento = organizar dados em pastas.
  
  data/
    year=2024/
      month=01/
      month=02/
    year=2023/
  
  Benefício: quando você filtra por data, lê apenas as pastas relevantes.
  
  💡 Use quando 90%+ das suas queries filtram por essa coluna.`
                }
              },
              { 
                id: 'l3-part-2', 
                text: { es: 'Sé elegir la columna de partición correcta según los queries', pt: 'Sei escolher a coluna de partição correta de acordo com as queries' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Criterios para elegir columna de partición:
  
  ✅ Se usa en WHERE frecuentemente
  ✅ Baja cardinalidad (no email, sí país)
  ✅ Distribuye datos de forma pareja
  ✅ Los valores crecen (fecha, no género)
  
  Ejemplo:
  - Logs → fecha
  - Transacciones → fecha + región
  - Usuarios → país (si queries son por país)`,
                  pt: `Critérios para escolher coluna de partição:
  
  ✅ Usada em WHERE frequentemente
  ✅ Baixa cardinalidade (não email, sim país)
  ✅ Distribui dados de forma uniforme
  ✅ Os valores crescem (data, não gênero)
  
  Exemplo:
  - Logs → data
  - Transações → data + região
  - Usuários → país (se queries são por país)`
                }
              },
              { 
                id: 'l3-part-3', 
                text: { es: 'Entiendo el problema de "too many partitions" y cómo evitarlo', pt: 'Entendo o problema de "too many partitions" e como evitá-lo' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Small files problem:
  
  Muchas particiones = muchos archivos pequeños
  = lento para listar y leer
  
  Síntomas:
  - 100,000+ archivos
  - Archivos < 1MB
  
  Soluciones:
  - Compactar archivos (OPTIMIZE en Delta)
  - Usar menos niveles de partición
  - No particionar por alta cardinalidad`,
                  pt: `Small files problem:
  
  Muitas partições = muitos arquivos pequenos
  = lento para listar e ler
  
  Sintomas:
  - 100.000+ arquivos
  - Arquivos < 1MB
  
  Soluções:
  - Compactar arquivos (OPTIMIZE em Delta)
  - Usar menos níveis de partição
  - Não particionar por alta cardinalidade`
                }
              },
              { 
                id: 'l3-part-4', 
                text: { es: 'Sé la diferencia entre partitioning y bucketing/clustering', pt: 'Sei a diferença entre partitioning e bucketing/clustering' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Partitioning = divide en CARPETAS (físico)
  → Útil para filtros (WHERE date = ...)
  
  Bucketing = divide en archivos por hash
  → Útil para JOINs (datos relacionados juntos)
  
  Clustering (Snowflake) = ordena datos dentro de partición
  → Útil para range queries
  
  💡 Podés combinarlos: particionar por fecha, clusterizar por user_id.`,
                  pt: `Partitioning = divide em PASTAS (físico)
  → Útil para filtros (WHERE date = ...)
  
  Bucketing = divide em arquivos por hash
  → Útil para JOINs (dados relacionados juntos)
  
  Clustering (Snowflake) = ordena dados dentro de partição
  → Útil para range queries
  
  💡 Pode combiná-los: particionar por data, clusterizar por user_id.`
                }
              },
              { 
                id: 'l3-part-5', 
                text: { es: 'Entiendo Z-ordering (Databricks) y cuándo usarlo', pt: 'Entendo Z-ordering (Databricks) e quando usá-lo' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Z-ordering = ordena datos por múltiples columnas a la vez.
  
  OPTIMIZE my_table ZORDER BY (user_id, date)
  
  Beneficio: filtra eficientemente por user_id Y date
  (el orden normal solo optimiza la primera columna)
  
  💡 Útil cuando tenés queries que filtran por combinaciones de columnas.`,
                  pt: `Z-ordering = ordena dados por múltiplas colunas de uma vez.
  
  OPTIMIZE my_table ZORDER BY (user_id, date)
  
  Benefício: filtra eficientemente por user_id E date
  (a ordem normal só otimiza a primeira coluna)
  
  💡 Útil quando tem queries que filtram por combinações de colunas.`
                }
              },
              { 
                id: 'l3-part-6', 
                text: { es: 'Sé calcular el tamaño óptimo de partición (100MB-1GB típico)', pt: 'Sei calcular o tamanho ideal de partição (100MB-1GB típico)' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Tamaño ideal de archivos:
  
  Muy pequeño (<10MB): overhead de metadata, lento
  Muy grande (>1GB): no paraleliza bien, memoria
  Ideal: 100MB - 1GB (depende del cluster)
  
  Para Spark:
  spark.conf.set("spark.sql.files.maxPartitionBytes", "256MB")
  
  💡 Ajustá según tu caso. Monitorea el Spark UI.`,
                  pt: `Tamanho ideal de arquivos:
  
  Muito pequeno (<10MB): overhead de metadados, lento
  Muito grande (>1GB): não paraleliza bem, memória
  Ideal: 100MB - 1GB (depende do cluster)
  
  Para Spark:
  spark.conf.set("spark.sql.files.maxPartitionBytes", "256MB")
  
  💡 Ajuste conforme seu caso. Monitore a Spark UI.`
                }
              },
              { 
                id: 'l3-part-7', 
                text: { es: 'Entiendo partition pruning y cómo escribir queries que lo aprovechen', pt: 'Entendo partition pruning e como escrever queries que o aproveitem' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Partition pruning = Spark/Athena SALTA particiones que no necesita.
  
  -- CON pruning (rápido)
  SELECT * FROM ventas WHERE fecha = '2024-01-01'
  
  -- SIN pruning (lee todo)
  SELECT * FROM ventas WHERE YEAR(fecha) = 2024
  
  Regla: usá la columna de partición DIRECTAMENTE en WHERE, sin funciones.`,
                  pt: `Partition pruning = Spark/Athena PULA partições que não precisa.
  
  -- COM pruning (rápido)
  SELECT * FROM vendas WHERE data = '2024-01-01'
  
  -- SEM pruning (lê tudo)
  SELECT * FROM vendas WHERE YEAR(data) = 2024
  
  Regra: use a coluna de partição DIRETAMENTE no WHERE, sem funções.`
                }
              },
            ]
          },
          {
            id: 'l3-spark-deep',
            title: { es: '⚡ Spark Avanzado', pt: '⚡ Spark Avançado' },
            description: { es: 'Un Lead no solo usa Spark - entiende por qué las cosas son lentas y cómo arreglarlas.', pt: 'Um Lead não só usa Spark - entende por que as coisas são lentas e como consertá-las.' },
            steps: [
              { 
                id: 'l3-spk-1', 
                text: { es: 'Entiendo la arquitectura: Driver, Executors, Cluster Manager', pt: 'Entendo a arquitetura: Driver, Executors, Cluster Manager' }, 
                type: 'task', 
                checkbox: true,
                explanation: {
                  es: `Arquitectura de Spark:
  
  DRIVER = tu programa principal
  → Coordina el trabajo, mantiene el plan
  
  EXECUTORS = workers que ejecutan tareas
  → Procesan datos en paralelo
  → Cada uno tiene memoria y cores
  
  CLUSTER MANAGER = asigna recursos
  → YARN, Kubernetes, Standalone
  
  💡 Cuando un job falla, fijate si falló en el driver o executor.`,
                  pt: `Arquitetura de Spark:
  
  DRIVER = seu programa principal
  → Coordena o trabalho, mantém o plano
  
  EXECUTORS = workers que executam tarefas
  → Processam dados em paralelo
  → Cada um tem memória e cores
  
  CLUSTER MANAGER = aloca recursos
  → YARN, Kubernetes, Standalone
  
  💡 Quando um job falha, veja se falhou no driver ou executor.`
                }
              },
              { id: 'l3-spk-2', text: { es: 'Sé leer el Spark UI: Jobs, Stages, Tasks, Storage, SQL', pt: 'Sei ler a Spark UI: Jobs, Stages, Tasks, Storage, SQL' }, type: 'task', checkbox: true },
              { id: 'l3-spk-3', text: { es: 'Entiendo Shuffle en detalle: por qué es costoso y cómo minimizarlo', pt: 'Entendo Shuffle em detalhe: por que é custoso e como minimizá-lo' }, type: 'task', checkbox: true },
              { id: 'l3-spk-4', text: { es: 'Sé identificar y resolver Data Skew (salting, broadcast)', pt: 'Sei identificar e resolver Data Skew (salting, broadcast)' }, type: 'task', checkbox: true },
              { id: 'l3-spk-5', text: { es: 'Entiendo Catalyst Optimizer y cómo escribir queries que lo aprovechen', pt: 'Entendo Catalyst Optimizer e como escrever queries que o aproveitem' }, type: 'task', checkbox: true },
              { id: 'l3-spk-6', text: { es: 'Sé cuándo usar cache() vs persist() y cuándo NO usarlos', pt: 'Sei quando usar cache() vs persist() e quando NÃO usá-los' }, type: 'task', checkbox: true },
              { id: 'l3-spk-7', text: { es: 'Entiendo AQE (Adaptive Query Execution) y sus beneficios', pt: 'Entendo AQE (Adaptive Query Execution) e seus benefícios' }, type: 'task', checkbox: true },
              { id: 'l3-spk-8', text: { es: 'Sé configurar spark.sql.shuffle.partitions según mi data', pt: 'Sei configurar spark.sql.shuffle.partitions conforme meus dados' }, type: 'task', checkbox: true },
              { id: 'l3-spk-9', text: { es: 'Entiendo la diferencia entre narrow y wide transformations', pt: 'Entendo a diferença entre narrow e wide transformations' }, type: 'task', checkbox: true },
              { id: 'l3-spk-10', text: { es: 'Sé debuggear OOM errors y configurar memoria correctamente', pt: 'Sei debugar OOM errors e configurar memória corretamente' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-distributed',
            title: { es: '🌐 Sistemas Distribuidos', pt: '🌐 Sistemas Distribuídos' },
            description: { es: 'Un Senior entiende cómo funcionan los sistemas a escala. No solo los usa, entiende por qué funcionan así.', pt: 'Um Sênior entende como funcionam os sistemas em escala. Não apenas os usa, entende por que funcionam assim.' },
            steps: [
              { id: 'l3-dist-1', text: { es: 'Entiendo el teorema CAP y sus implicaciones prácticas', pt: 'Entendo o teorema CAP e suas implicações práticas' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'CAP Theorem', link: 'https://en.wikipedia.org/wiki/CAP_theorem' } },
              { id: 'l3-dist-2', text: { es: 'Sé la diferencia entre consistencia eventual y fuerte', pt: 'Sei a diferença entre consistência eventual e forte' }, type: 'task', checkbox: true },
              { id: 'l3-dist-3', text: { es: 'Entiendo particionamiento (sharding) y sus trade-offs', pt: 'Entendo particionamento (sharding) e seus trade-offs' }, type: 'task', checkbox: true },
              { id: 'l3-dist-4', text: { es: 'Entiendo replicación: leader-follower, multi-leader, leaderless', pt: 'Entendo replicação: leader-follower, multi-leader, leaderless' }, type: 'task', checkbox: true },
              { id: 'l3-dist-5', text: { es: 'Sé qué es consistent hashing y cuándo usarlo', pt: 'Sei o que é consistent hashing e quando usá-lo' }, type: 'task', checkbox: true },
              { id: 'l3-dist-6', text: { es: 'Entiendo transacciones distribuidas (2PC, Saga pattern)', pt: 'Entendo transações distribuídas (2PC, Saga pattern)' }, type: 'task', checkbox: true },
              { id: 'l3-dist-7', text: { es: 'Sé qué es idempotencia y por qué es crítica', pt: 'Sei o que é idempotência e por que é crítica' }, type: 'task', checkbox: true },
              { id: 'l3-dist-8', text: { es: 'Entiendo backpressure en sistemas de streaming', pt: 'Entendo backpressure em sistemas de streaming' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '📚 Lectura obligatoria', pt: '📚 Leitura obrigatória' },
            stopContent: { es: 'Si no leíste DDIA (Designing Data-Intensive Applications), hacelo ahora. Es el libro que separa a los que entienden sistemas de los que solo los usan.', pt: 'Se não leu DDIA (Designing Data-Intensive Applications), leia agora. É o livro que separa os que entendem sistemas dos que apenas os usam.' }
          },
          {
            id: 'l3-data-modeling',
            title: { es: '2️⃣ Modelado de Datos Avanzado', pt: '2️⃣ Modelagem de Dados Avançada' },
            description: { es: 'Un Senior puede diseñar modelos de datos que escalan y son mantenibles.', pt: 'Um Sênior pode projetar modelos de dados que escalam e são sustentáveis.' },
            steps: [
              { id: 'l3-dm-1', text: { es: 'Entiendo normalización vs desnormalización y cuándo usar cada una', pt: 'Entendo normalização vs desnormalização e quando usar cada uma' }, type: 'task', checkbox: true },
              { id: 'l3-dm-2', text: { es: 'Sé diseñar modelos dimensionales (star schema, snowflake)', pt: 'Sei projetar modelos dimensionais (star schema, snowflake)' }, type: 'task', checkbox: true },
              { id: 'l3-dm-3', text: { es: 'Entiendo Slowly Changing Dimensions (SCD Type 1, 2, 3)', pt: 'Entendo Slowly Changing Dimensions (SCD Type 1, 2, 3)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'SCD Types', link: 'https://en.wikipedia.org/wiki/Slowly_changing_dimension' } },
              { id: 'l3-dm-4', text: { es: 'Sé diseñar Data Vault (hubs, links, satellites)', pt: 'Sei projetar Data Vault (hubs, links, satellites)' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Data Vault', link: 'https://datavaultalliance.com/news/data-vault-basics/' } },
              { id: 'l3-dm-5', text: { es: 'Entiendo One Big Table (OBT) y cuándo usarlo', pt: 'Entendo One Big Table (OBT) e quando usá-lo' }, type: 'task', checkbox: true },
              { id: 'l3-dm-6', text: { es: 'Sé diseñar schemas para time-series data', pt: 'Sei projetar schemas para time-series data' }, type: 'task', checkbox: true },
              { id: 'l3-dm-7', text: { es: 'Entiendo particionamiento de tablas (por fecha, por hash)', pt: 'Entendo particionamento de tabelas (por data, por hash)' }, type: 'task', checkbox: true },
              { id: 'l3-dm-8', text: { es: 'Diseñé un modelo de datos para un caso real', pt: 'Projetei um modelo de dados para um caso real' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-streaming-avanzado',
            title: { es: '3️⃣ Streaming a Escala', pt: '3️⃣ Streaming em Escala' },
            description: { es: 'Batch es fácil. Streaming es donde se pone interesante.', pt: 'Batch é fácil. Streaming é onde fica interessante.' },
            steps: [
              { id: 'l3-str-1', text: { es: 'Entiendo la diferencia entre event time y processing time', pt: 'Entendo a diferença entre event time e processing time' }, type: 'task', checkbox: true },
              { id: 'l3-str-2', text: { es: 'Sé qué son watermarks y cómo manejar late data', pt: 'Sei o que são watermarks e como lidar com late data' }, type: 'task', checkbox: true },
              { id: 'l3-str-3', text: { es: 'Entiendo windowing: tumbling, sliding, session windows', pt: 'Entendo windowing: tumbling, sliding, session windows' }, type: 'task', checkbox: true },
              { id: 'l3-str-4', text: { es: 'Sé la diferencia entre at-least-once, at-most-once, exactly-once', pt: 'Sei a diferença entre at-least-once, at-most-once, exactly-once' }, type: 'task', checkbox: true },
              { id: 'l3-str-5', text: { es: 'Entiendo Kafka internals: partitions, offsets, consumer groups', pt: 'Entendo Kafka internals: partitions, offsets, consumer groups' }, type: 'task', checkbox: true },
              { id: 'l3-str-6', text: { es: 'Sé cuándo usar Kafka Streams vs Flink vs Spark Streaming', pt: 'Sei quando usar Kafka Streams vs Flink vs Spark Streaming' }, type: 'task', checkbox: true },
              { id: 'l3-str-7', text: { es: 'Completé proyecto "Pipeline de Streaming con Kafka"', pt: 'Completei projeto "Pipeline de Streaming com Kafka"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p3-kafka-streaming' } },
              { id: 'l3-str-8', text: { es: 'Implementé un sistema con exactly-once semantics', pt: 'Implementei um sistema com exactly-once semantics' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-optimization',
            title: { es: '4️⃣ Optimización y Performance', pt: '4️⃣ Otimização e Performance' },
            description: { es: 'Un Senior no solo hace que funcione. Hace que funcione RÁPIDO.', pt: 'Um Sênior não só faz funcionar. Faz funcionar RÁPIDO.' },
            steps: [
              { id: 'l3-opt-1', text: { es: 'Sé hacer profiling de código Python (cProfile, line_profiler)', pt: 'Sei fazer profiling de código Python (cProfile, line_profiler)' }, type: 'task', checkbox: true },
              { id: 'l3-opt-2', text: { es: 'Entiendo cómo optimizar queries en Spark (broadcast joins, partitioning)', pt: 'Entendo como otimizar queries em Spark (broadcast joins, partitioning)' }, type: 'task', checkbox: true },
              { id: 'l3-opt-3', text: { es: 'Sé leer y optimizar EXPLAIN plans en SQL', pt: 'Sei ler e otimizar EXPLAIN plans em SQL' }, type: 'task', checkbox: true },
              { id: 'l3-opt-4', text: { es: 'Entiendo cuándo usar columnar vs row storage', pt: 'Entendo quando usar columnar vs row storage' }, type: 'task', checkbox: true },
              { id: 'l3-opt-5', text: { es: 'Sé optimizar costos en cloud (spot instances, reserved capacity)', pt: 'Sei otimizar custos na cloud (spot instances, reserved capacity)' }, type: 'task', checkbox: true },
              { id: 'l3-opt-6', text: { es: 'Entiendo caching strategies (Redis, Memcached)', pt: 'Entendo caching strategies (Redis, Memcached)' }, type: 'task', checkbox: true },
              { id: 'l3-opt-7', text: { es: 'Completé proyecto "Performance Tuning de Pipeline"', pt: 'Completei projeto "Performance Tuning de Pipeline"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p3-performance-tuning' } },
              { id: 'l3-opt-8', text: { es: 'Optimicé un pipeline real logrando mejora de 5x+', pt: 'Otimizei um pipeline real alcançando melhoria de 5x+' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-observability',
            title: { es: '5️⃣ Observabilidad', pt: '5️⃣ Observabilidade' },
            description: { es: 'Si no podés ver qué pasa en tu sistema, no podés arreglarlo cuando falla.', pt: 'Se não pode ver o que acontece no seu sistema, não pode consertá-lo quando falha.' },
            steps: [
              { id: 'l3-obs-1', text: { es: 'Entiendo los 3 pilares: logs, metrics, traces', pt: 'Entendo os 3 pilares: logs, metrics, traces' }, type: 'task', checkbox: true },
              { id: 'l3-obs-2', text: { es: 'Implementé logging estructurado (JSON logs)', pt: 'Implementei logging estruturado (JSON logs)' }, type: 'task', checkbox: true },
              { id: 'l3-obs-3', text: { es: 'Definí métricas clave para mis pipelines (latency, throughput, error rate)', pt: 'Defini métricas chave para meus pipelines (latency, throughput, error rate)' }, type: 'task', checkbox: true },
              { id: 'l3-obs-4', text: { es: 'Configuré alertas que son accionables (no ruidosas)', pt: 'Configurei alertas que são acionáveis (não ruidosos)' }, type: 'task', checkbox: true },
              { id: 'l3-obs-5', text: { es: 'Creé dashboards útiles para monitoreo', pt: 'Criei dashboards úteis para monitoramento' }, type: 'task', checkbox: true },
              { id: 'l3-obs-6', text: { es: 'Implementé data freshness monitoring', pt: 'Implementei data freshness monitoring' }, type: 'task', checkbox: true },
              { id: 'l3-obs-7', text: { es: 'Completé proyecto "Monitoring y Alertas"', pt: 'Completei projeto "Monitoring e Alertas"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p3-monitoring-alerting' } },
            ],
            stopTitle: { es: '🔔 Alertas efectivas', pt: '🔔 Alertas efetivas' },
            stopContent: { es: 'Una buena alerta te dice QUÉ está mal y tiene un runbook de CÓMO arreglarlo. Si tus alertas solo dicen "algo falló", no son útiles.', pt: 'Um bom alerta te diz O QUE está errado e tem um runbook de COMO consertar. Se seus alertas só dizem "algo falhou", não são úteis.' }
          },
          {
            id: 'l3-security',
            title: { es: '6️⃣ Seguridad de Datos', pt: '6️⃣ Segurança de Dados' },
            description: { es: 'Un Senior entiende las implicaciones de seguridad de sus decisiones.', pt: 'Um Sênior entende as implicações de segurança de suas decisões.' },
            steps: [
              { id: 'l3-sec-1', text: { es: 'Entiendo encriptación at-rest vs in-transit', pt: 'Entendo encriptação at-rest vs in-transit' }, type: 'task', checkbox: true },
              { id: 'l3-sec-2', text: { es: 'Sé manejar secrets (no hardcodear credenciales)', pt: 'Sei gerenciar secrets (não hardcodar credenciais)' }, type: 'task', checkbox: true },
              { id: 'l3-sec-3', text: { es: 'Entiendo IAM y least privilege principle', pt: 'Entendo IAM e least privilege principle' }, type: 'task', checkbox: true },
              { id: 'l3-sec-4', text: { es: 'Sé qué es PII y cómo manejarlo (masking, tokenization)', pt: 'Sei o que é PII e como gerenciá-lo (masking, tokenization)' }, type: 'task', checkbox: true },
              { id: 'l3-sec-5', text: { es: 'Entiendo GDPR/CCPA y sus implicaciones técnicas', pt: 'Entendo GDPR/CCPA e suas implicações técnicas' }, type: 'task', checkbox: true },
              { id: 'l3-sec-6', text: { es: 'Implementé data masking en un pipeline', pt: 'Implementei data masking em um pipeline' }, type: 'task', checkbox: true },
              { id: 'l3-sec-7', text: { es: 'Configuré audit logging para acceso a datos sensibles', pt: 'Configurei audit logging para acesso a dados sensíveis' }, type: 'task', checkbox: true },
            ]
          }
        ]
      },
      {
        id: 'l3-proyectos-senior',
        title: { es: 'Fase 5: Proyectos Técnicos Senior', pt: 'Fase 5: Projetos Técnicos Sênior' },
        emoji: '⚡',
        sections: [
          {
            id: 'l3-arquitectura-proyectos',
            title: { es: '1️⃣ Arquitectura y Diseño de Sistemas', pt: '1️⃣ Arquitetura e Design de Sistemas' },
            description: { es: 'Un Senior diseña sistemas. Estos proyectos te dan experiencia real en diseño a escala.', pt: 'Um Sênior projeta sistemas. Estes projetos te dão experiência real em design em escala.' },
            steps: [
              { id: 'l3-arqp-1', text: { es: 'Completé "Diseño de Sistema: Analytics Platform"', pt: 'Completei "Design de Sistema: Analytics Platform"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p9-system-design' } },
              { id: 'l3-arqp-2', text: { es: 'Completé "Diseño Data Mesh"', pt: 'Completei "Design Data Mesh"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p3-data-mesh' } },
              { id: 'l3-arqp-3', text: { es: 'Completé "Diseño de Data Lake"', pt: 'Completei "Design de Data Lake"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p3-data-lake-design' } },
            ],
            stopTitle: { es: '🎯 Práctica de entrevistas', pt: '🎯 Prática de entrevistas' },
            stopContent: { es: 'Estos proyectos son exactamente lo que te van a pedir en entrevistas Senior. Practicá explicar tus decisiones en voz alta. "Elegí X porque... El trade-off es..."', pt: 'Estes projetos são exatamente o que vão te pedir em entrevistas Sênior. Pratique explicar suas decisões em voz alta. "Escolhi X porque... O trade-off é..."' }
          },
          {
            id: 'l3-streaming-proyectos',
            title: { es: '2️⃣ Streaming y Real-time', pt: '2️⃣ Streaming e Real-time' },
            description: { es: 'El streaming es cada vez más importante. Un Senior debe poder diseñar e implementar pipelines real-time.', pt: 'O streaming é cada vez mais importante. Um Sênior deve poder projetar e implementar pipelines real-time.' },
            steps: [
              { id: 'l3-str-1', text: { es: 'Completé "Streaming con Kafka"', pt: 'Completei "Streaming com Kafka"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p3-kafka-streaming' } },
              { id: 'l3-str-2', text: { es: 'Entiendo exactly-once vs at-least-once semantics', pt: 'Entendo exactly-once vs at-least-once semantics' }, type: 'task', checkbox: true },
              { id: 'l3-str-3', text: { es: 'Puedo explicar cuándo usar batch vs streaming', pt: 'Posso explicar quando usar batch vs streaming' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-performance-proyectos',
            title: { es: '3️⃣ Performance y Observabilidad', pt: '3️⃣ Performance e Observabilidade' },
            description: { es: 'Un Senior no solo construye pipelines. Los hace rápidos y observables.', pt: 'Um Sênior não apenas constrói pipelines. Os faz rápidos e observáveis.' },
            steps: [
              { id: 'l3-perf-1', text: { es: 'Completé "Performance Tuning de Pipeline"', pt: 'Completei "Performance Tuning de Pipeline"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p3-performance-tuning' } },
              { id: 'l3-perf-2', text: { es: 'Completé "Monitoring y Alertas para Pipelines"', pt: 'Completei "Monitoring e Alertas para Pipelines"' }, type: 'task', checkbox: true, resource: { type: 'project', label: 'Ir al Proyecto', projectId: 'p3-monitoring-alerting' } },
              { id: 'l3-perf-3', text: { es: 'Sé usar profiling para identificar cuellos de botella', pt: 'Sei usar profiling para identificar gargalos' }, type: 'task', checkbox: true },
              { id: 'l3-perf-4', text: { es: 'Tengo dashboards de métricas en mis pipelines', pt: 'Tenho dashboards de métricas em meus pipelines' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '💡 La diferencia Senior', pt: '💡 A diferença Sênior' },
            stopContent: { es: 'Un Junior hace que funcione. Un SSR hace que funcione bien. Un Senior hace que funcione bien, rápido, y que sepas cuando deja de funcionar.', pt: 'Um Júnior faz funcionar. Um SSR faz funcionar bem. Um Sênior faz funcionar bem, rápido, e que você saiba quando deixa de funcionar.' }
          },
          {
            id: 'l3-portfolio',
            title: { es: '4️⃣ Tu Portfolio Senior', pt: '4️⃣ Seu Portfólio Sênior' },
            description: { es: 'Para este punto, deberías tener un portfolio impresionante. Revisá que todo esté documentado.', pt: 'Neste ponto, você deveria ter um portfólio impressionante. Revise se tudo está documentado.' },
            steps: [
              { id: 'l3-port-1', text: { es: 'Tengo al menos 5 proyectos en GitHub con README claro', pt: 'Tenho pelo menos 5 projetos no GitHub com README claro' }, type: 'task', checkbox: true },
              { id: 'l3-port-2', text: { es: 'Al menos 2 proyectos incluyen diagramas de arquitectura', pt: 'Pelo menos 2 projetos incluem diagramas de arquitetura' }, type: 'task', checkbox: true },
              { id: 'l3-port-3', text: { es: 'Al menos 1 proyecto incluye métricas de performance', pt: 'Pelo menos 1 projeto inclui métricas de performance' }, type: 'task', checkbox: true },
              { id: 'l3-port-4', text: { es: 'Mi LinkedIn refleja mi nivel Senior', pt: 'Meu LinkedIn reflete meu nível Sênior' }, type: 'task', checkbox: true },
              { id: 'l3-port-5', text: { es: 'Puedo explicar cada proyecto en detalle en una entrevista', pt: 'Posso explicar cada projeto em detalhe em uma entrevista' }, type: 'task', checkbox: true },
            ]
          }
        ]
      },
      {
        id: 'l3-casos-avanzados',
        title: { es: 'Fase 6: Casos de Estudio Avanzados', pt: 'Fase 6: Estudos de Caso Avançados' },
        emoji: '🏛️',
        sections: [
          {
            id: 'l3-casos-intro',
            title: { es: '💬 Mensaje de Ian', pt: '💬 Mensagem do Ian' },
            description: { es: 'Como Senior, necesitás entender cómo las empresas más grandes del mundo resuelven problemas de datos a escala. No para copiarlos, sino para tener criterio cuando te toque decidir. Estos casos son más profundos que los del nivel anterior.', pt: 'Como Sênior, você precisa entender como as maiores empresas do mundo resolvem problemas de dados em escala. Não para copiá-los, mas para ter critério quando te tocar decidir. Estes casos são mais profundos que os do nível anterior.' },
            steps: [
              { id: 'l3-cas-msg', text: { es: 'Entiendo que estudiar arquitecturas a escala me da perspectiva', pt: 'Entendo que estudar arquiteturas em escala me dá perspectiva' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-caso-linkedin',
            title: { es: '1️⃣ LinkedIn - Kafka y el Origen del Streaming', pt: '1️⃣ LinkedIn - Kafka e a Origem do Streaming' },
            description: { es: 'LinkedIn creó Kafka. Entender por qué y cómo lo usan te da perspectiva única sobre streaming.', pt: 'LinkedIn criou Kafka. Entender por que e como o usam te dá perspectiva única sobre streaming.' },
            steps: [
              { id: 'l3-link-1', text: { es: 'Leí "The Log: What every software engineer should know"', pt: 'Li "The Log: What every software engineer should know"' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'The Log - Jay Kreps', link: 'https://engineering.linkedin.com/distributed-systems/log-what-every-software-engineer-should-know-about-real-time-datas-unifying' } },
              { id: 'l3-link-2', text: { es: 'Entiendo por qué el log es la abstracción fundamental', pt: 'Entendo por que o log é a abstração fundamental' }, type: 'task', checkbox: true },
              { id: 'l3-link-3', text: { es: 'Entiendo cómo Kafka habilita event sourcing', pt: 'Entendo como Kafka habilita event sourcing' }, type: 'task', checkbox: true },
              { id: 'l3-link-4', text: { es: '¿Por qué LinkedIn necesitó crear Kafka?', pt: 'Por que o LinkedIn precisou criar o Kafka?' }, type: 'reflection', textInput: { es: 'Respuesta...', pt: 'Resposta...' } },
            ]
          },
          {
            id: 'l3-caso-meta',
            title: { es: '2️⃣ Meta - Presto y el SQL a Escala', pt: '2️⃣ Meta - Presto e o SQL em Escala' },
            description: { es: 'Meta (Facebook) procesa exabytes de datos. Presto es su respuesta a "¿cómo hacemos SQL sobre todo esto?"', pt: 'Meta (Facebook) processa exabytes de dados. Presto é sua resposta a "como fazemos SQL sobre tudo isso?"' },
            steps: [
              { id: 'l3-meta-1', text: { es: 'Leí sobre la arquitectura de Presto', pt: 'Li sobre a arquitetura do Presto' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Presto Paper', link: 'https://research.facebook.com/publications/presto-sql-on-everything/' } },
              { id: 'l3-meta-2', text: { es: 'Entiendo: Coordinator, Workers, Connectors', pt: 'Entendo: Coordinator, Workers, Connectors' }, type: 'task', checkbox: true },
              { id: 'l3-meta-3', text: { es: 'Entiendo por qué Presto es diferente a Spark SQL', pt: 'Entendo por que Presto é diferente de Spark SQL' }, type: 'task', checkbox: true },
              { id: 'l3-meta-4', text: { es: '¿Cuándo usarías Presto vs Spark?', pt: 'Quando usaria Presto vs Spark?' }, type: 'reflection', textInput: { es: 'Respuesta...', pt: 'Resposta...' } },
            ]
          },
          {
            id: 'l3-caso-stripe',
            title: { es: '3️⃣ Stripe - Data Infrastructure', pt: '3️⃣ Stripe - Data Infrastructure' },
            description: { es: 'Stripe maneja billones de dólares en transacciones. Su infraestructura de datos es un ejemplo de confiabilidad.', pt: 'Stripe gerencia bilhões de dólares em transações. Sua infraestrutura de dados é um exemplo de confiabilidade.' },
            steps: [
              { id: 'l3-stripe-1', text: { es: 'Leí sobre la infraestructura de datos de Stripe', pt: 'Li sobre a infraestrutura de dados da Stripe' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Stripe Engineering', link: 'https://stripe.com/blog/online-migrations' } },
              { id: 'l3-stripe-2', text: { es: 'Entiendo cómo hacen migraciones online sin downtime', pt: 'Entendo como fazem migrações online sem downtime' }, type: 'task', checkbox: true },
              { id: 'l3-stripe-3', text: { es: 'Entiendo la importancia de idempotencia en pagos', pt: 'Entendo a importância de idempotência em pagamentos' }, type: 'task', checkbox: true },
              { id: 'l3-stripe-4', text: { es: '¿Qué aprendo de Stripe sobre confiabilidad?', pt: 'O que aprendo com a Stripe sobre confiabilidade?' }, type: 'reflection', textInput: { es: 'Respuesta...', pt: 'Resposta...' } },
            ]
          },
          {
            id: 'l3-caso-databricks',
            title: { es: '4️⃣ Databricks - Lakehouse Architecture', pt: '4️⃣ Databricks - Lakehouse Architecture' },
            description: { es: 'Databricks popularizó el concepto de Lakehouse. Entender Delta Lake es clave para el futuro.', pt: 'Databricks popularizou o conceito de Lakehouse. Entender Delta Lake é chave para o futuro.' },
            steps: [
              { id: 'l3-dbricks-1', text: { es: 'Leí el paper de Delta Lake', pt: 'Li o paper do Delta Lake' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Delta Lake Paper', link: 'https://www.databricks.com/research/delta-lake-high-performance-acid-table-storage-over-cloud-object-stores' } },
              { id: 'l3-dbricks-2', text: { es: 'Entiendo: ACID sobre object storage, time travel, schema evolution', pt: 'Entendo: ACID sobre object storage, time travel, schema evolution' }, type: 'task', checkbox: true },
              { id: 'l3-dbricks-3', text: { es: 'Entiendo por qué Lakehouse combina lo mejor de Lake y Warehouse', pt: 'Entendo por que Lakehouse combina o melhor de Lake e Warehouse' }, type: 'task', checkbox: true },
              { id: 'l3-dbricks-4', text: { es: '¿Cuándo recomendarías Lakehouse vs DW tradicional?', pt: 'Quando recomendaria Lakehouse vs DW tradicional?' }, type: 'reflection', textInput: { es: 'Respuesta...', pt: 'Resposta...' } },
            ],
            stopTitle: { es: '🎯 Ejercicio Senior', pt: '🎯 Exercício Sênior' },
            stopContent: { es: 'Elegí un problema de tu empresa actual. ¿Cómo lo resolvería LinkedIn? ¿Meta? ¿Stripe? Pensar así te hace Senior.', pt: 'Escolha um problema da sua empresa atual. Como o LinkedIn resolveria? Meta? Stripe? Pensar assim te faz Sênior.' }
          }
        ]
      },
      {
        id: 'l3-liderazgo-tecnico',
        title: { es: 'Fase 7: Liderazgo Técnico en Acción', pt: 'Fase 7: Liderança Técnica em Ação' },
        emoji: '👑',
        sections: [
          {
            id: 'l3-lid-intro',
            title: { es: '💬 Mensaje de Ian', pt: '💬 Mensagem do Ian' },
            description: { es: 'Ser Senior no es solo saber más. Es influir sin autoridad formal. Es hacer que otros sean mejores. Es tomar decisiones que afectan al equipo y defenderlas. Esta fase es sobre eso.', pt: 'Ser Sênior não é apenas saber mais. É influenciar sem autoridade formal. É fazer com que outros sejam melhores. É tomar decisões que afetam a equipe e defendê-las. Esta fase é sobre isso.' },
            steps: [
              { id: 'l3-lid-msg', text: { es: 'Entiendo que el liderazgo técnico es sobre influencia, no autoridad', pt: 'Entendo que a liderança técnica é sobre influência, não autoridade' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-rfc',
            title: { es: '1️⃣ Escribir RFCs (Request for Comments)', pt: '1️⃣ Escrever RFCs (Request for Comments)' },
            description: { es: 'Los Seniors proponen cambios importantes por escrito. Un RFC bien escrito puede cambiar el rumbo de un equipo.', pt: 'Os Seniores propõem mudanças importantes por escrito. Um RFC bem escrito pode mudar o rumo de uma equipe.' },
            steps: [
              { id: 'l3-rfc-1', text: { es: 'Entiendo qué es un RFC y cuándo escribir uno', pt: 'Entendo o que é um RFC e quando escrever um' }, type: 'task', checkbox: true, resource: { type: 'external', label: 'Ejemplo de RFC', link: 'https://blog.pragmaticengineer.com/rfcs-and-design-docs/' } },
              { id: 'l3-rfc-2', text: { es: 'Escribí un RFC para una mejora técnica en mi empresa', pt: 'Escrevi um RFC para uma melhoria técnica na minha empresa' }, type: 'task', checkbox: true },
              { id: 'l3-rfc-3', text: { es: 'Mi RFC incluye: Problema, Propuesta, Alternativas, Trade-offs', pt: 'Meu RFC inclui: Problema, Proposta, Alternativas, Trade-offs' }, type: 'task', checkbox: true },
              { id: 'l3-rfc-4', text: { es: 'Presenté mi RFC al equipo y recibí feedback', pt: 'Apresentei meu RFC à equipe e recebi feedback' }, type: 'task', checkbox: true },
              { id: 'l3-rfc-5', text: { es: 'Implementé (o lideré la implementación de) mi RFC', pt: 'Implementei (ou liderei a implementação do) meu RFC' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '📝 Template de RFC', pt: '📝 Template de RFC' },
            stopContent: { es: '1. Contexto/Problema 2. Propuesta 3. Alternativas consideradas 4. Trade-offs 5. Plan de implementación 6. Métricas de éxito. Usá este template.', pt: '1. Contexto/Problema 2. Proposta 3. Alternativas consideradas 4. Trade-offs 5. Plano de implementação 6. Métricas de sucesso. Use este template.' }
          },
          {
            id: 'l3-tech-debt',
            title: { es: '2️⃣ Manejar Deuda Técnica', pt: '2️⃣ Gerenciar Dívida Técnica' },
            description: { es: 'Un Senior no ignora la deuda técnica. La identifica, prioriza, y negocia tiempo para pagarla.', pt: 'Um Sênior não ignora a dívida técnica. Ele a identifica, prioriza e negocia tempo para pagá-la.' },
            steps: [
              { id: 'l3-td-1', text: { es: 'Hice un inventario de deuda técnica en mi área', pt: 'Fiz um inventário de dívida técnica na minha área' }, type: 'task', checkbox: true },
              { id: 'l3-td-2', text: { es: 'Prioricé la deuda por impacto y esfuerzo', pt: 'Priorizei a dívida por impacto e esforço' }, type: 'task', checkbox: true },
              { id: 'l3-td-3', text: { es: 'Negocié tiempo con mi manager para pagar deuda', pt: 'Negociei tempo com meu gerente para pagar dívida' }, type: 'task', checkbox: true },
              { id: 'l3-td-4', text: { es: 'Pagué al menos una pieza de deuda técnica importante', pt: 'Paguei pelo menos uma peça de dívida técnica importante' }, type: 'task', checkbox: true },
              { id: 'l3-td-5', text: { es: 'Documenté el antes/después para mostrar el impacto', pt: 'Documentei o antes/depois para mostrar o impacto' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-influencia',
            title: { es: '3️⃣ Influir Sin Autoridad', pt: '3️⃣ Influenciar Sem Autoridade' },
            description: { es: 'No sos manager. No podés obligar a nadie. Pero podés influir. Esto es arte.', pt: 'Você não é gerente. Não pode obrigar ninguém. Mas pode influenciar. Isso é arte.' },
            steps: [
              { id: 'l3-inf-1', text: { es: 'Convencí a alguien de adoptar una mejor práctica', pt: 'Convenci alguém a adotar uma melhor prática' }, type: 'task', checkbox: true },
              { id: 'l3-inf-2', text: { es: 'Logré que el equipo adopte una herramienta que propuse', pt: 'Consegui que a equipe adote uma ferramenta que propus' }, type: 'task', checkbox: true },
              { id: 'l3-inf-3', text: { es: 'Cambié una decisión técnica con argumentos, no con autoridad', pt: 'Mudei uma decisão técnica com argumentos, não com autoridade' }, type: 'task', checkbox: true },
              { id: 'l3-inf-4', text: { es: 'Sé cuándo pelear una batalla y cuándo dejar ir', pt: 'Sei quando lutar uma batalha e quando deixar ir' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '💡 Cómo influir', pt: '💡 Como influenciar' },
            stopContent: { es: 'No digas "deberíamos hacer X". Decí "probé X en este caso y funcionó así. ¿Qué les parece para nuestro problema?" Datos > opiniones. Siempre.', pt: 'Não diga "deveríamos fazer X". Diga "testei X neste caso e funcionou assim. O que vocês acham para o nosso problema?" Dados > opiniões. Sempre.' }
          },
          {
            id: 'l3-stakeholders',
            title: { es: '4️⃣ Manejar Stakeholders', pt: '4️⃣ Gerenciar Stakeholders' },
            description: { es: 'Un Senior sabe hablar con producto, con negocio, con otros equipos. Sin drama.', pt: 'Um Sênior sabe falar com produto, com negócio, com outras equipes. Sem drama.' },
            steps: [
              { id: 'l3-stk-1', text: { es: 'Sé traducir requerimientos de negocio a soluciones técnicas', pt: 'Sei traduzir requisitos de negócio para soluções técnicas' }, type: 'task', checkbox: true },
              { id: 'l3-stk-2', text: { es: 'Sé decir "no" a un stakeholder sin quemar puentes', pt: 'Sei dizer "não" a um stakeholder sem queimar pontes' }, type: 'task', checkbox: true },
              { id: 'l3-stk-3', text: { es: 'Sé negociar scope cuando los timelines son imposibles', pt: 'Sei negociar escopo quando os prazos são impossíveis' }, type: 'task', checkbox: true },
              { id: 'l3-stk-4', text: { es: 'Sé comunicar problemas técnicos a no-técnicos', pt: 'Sei comunicar problemas técnicos a não técnicos' }, type: 'task', checkbox: true },
              { id: 'l3-stk-5', text: { es: 'Manejé una situación difícil con un stakeholder', pt: 'Lidei com uma situação difícil com um stakeholder' }, type: 'task', checkbox: true },
            ]
          }
        ]
      },
      {
        id: 'l3-proyecto-senior',
        title: { es: 'Fase 8: Proyecto Senior (Tu Legado)', pt: 'Fase 8: Projeto Sênior (Seu Legado)' },
        emoji: '🏆',
        sections: [
          {
            id: 'l3-proy-intro',
            title: { es: '💬 Mensaje de Ian', pt: '💬 Mensagem do Ian' },
            description: { es: 'Este proyecto es diferente. No es solo técnico. Es sobre diseñar algo que otros puedan mantener, escalar, y entender. Es dejar un legado. Cuando te vayas de un equipo, ¿qué queda?', pt: 'Este projeto é diferente. Não é apenas técnico. É sobre projetar algo que outros possam manter, escalar e entender. É deixar um legado. Quando você sair de uma equipe, o que fica?' },
            steps: [
              { id: 'l3-proy-msg', text: { es: 'Entiendo que un proyecto Senior es sobre impacto duradero', pt: 'Entendo que um projeto Sênior é sobre impacto duradouro' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-proy-desc',
            title: { es: '🚀 El Proyecto: Real-Time Analytics Platform', pt: '🚀 O Projeto: Real-Time Analytics Platform' },
            description: { es: 'Vas a diseñar e implementar una plataforma de analytics en tiempo real. Streaming, procesamiento, serving, dashboards. Todo.', pt: 'Você vai projetar e implementar uma plataforma de analytics em tempo real. Streaming, processamento, serving, dashboards. Tudo.' },
            steps: [
              { id: 'l3-proy-1', text: { es: 'FASE 1: Escribí RFC con el diseño completo', pt: 'FASE 1: Escrevi RFC com o design completo' }, type: 'task', checkbox: true },
              { id: 'l3-proy-2', text: { es: 'FASE 2: Ingesta streaming (Kafka o equivalente)', pt: 'FASE 2: Ingestão streaming (Kafka ou equivalente)' }, type: 'task', checkbox: true },
              { id: 'l3-proy-3', text: { es: 'FASE 3: Procesamiento streaming (Flink, Spark Streaming, o Kafka Streams)', pt: 'FASE 3: Processamento streaming (Flink, Spark Streaming, ou Kafka Streams)' }, type: 'task', checkbox: true },
              { id: 'l3-proy-4', text: { es: 'FASE 4: Storage (time-series optimizado)', pt: 'FASE 4: Storage (time-series otimizado)' }, type: 'task', checkbox: true },
              { id: 'l3-proy-5', text: { es: 'FASE 5: Serving layer (APIs, caching)', pt: 'FASE 5: Serving layer (APIs, caching)' }, type: 'task', checkbox: true },
              { id: 'l3-proy-6', text: { es: 'FASE 6: Observabilidad completa (métricas, logs, alertas)', pt: 'FASE 6: Observabilidade completa (métricas, logs, alertas)' }, type: 'task', checkbox: true },
              { id: 'l3-proy-7', text: { es: 'FASE 7: Documentación de arquitectura y decisiones', pt: 'FASE 7: Documentação de arquitetura e decisões' }, type: 'task', checkbox: true },
              { id: 'l3-proy-8', text: { es: 'FASE 8: Runbooks para operaciones', pt: 'FASE 8: Runbooks para operações' }, type: 'task', checkbox: true },
              { id: 'l3-proy-9', text: { es: 'FASE 9: Onboarding doc para nuevos miembros', pt: 'FASE 9: Onboarding doc para novos membros' }, type: 'task', checkbox: true },
              { id: 'l3-proy-10', text: { es: '🎉 COMPLETÉ MI REAL-TIME ANALYTICS PLATFORM 🎉', pt: '🎉 COMPLETEI MINHA REAL-TIME ANALYTICS PLATFORM 🎉' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '⏱️ Esto es un proyecto grande', pt: '⏱️ Isto é um projeto grande' },
            stopContent: { es: 'Este proyecto puede tomar 2-3 meses part-time. No te apures. Cada decisión de diseño importa. Documentá todo. Al final, vas a tener algo que impresiona en cualquier entrevista Senior.', pt: 'Este projeto pode levar 2-3 meses part-time. Não se apresse. Cada decisão de design importa. Documente tudo. No final, você terá algo que impressiona em qualquer entrevista Sênior.' }
          }
        ]
      },
      {
        id: 'l3-entrevistas-senior',
        title: { es: 'Fase 9: Entrevistas Senior', pt: 'Fase 9: Entrevistas Sênior' },
        emoji: '🎤',
        sections: [
          {
            id: 'l3-ent-intro',
            title: { es: '💬 La verdad sobre entrevistas Senior', pt: '💬 A verdade sobre entrevistas Sênior' },
            description: { es: 'Las entrevistas Senior son sobre demostrar criterio, experiencia, y liderazgo. No solo conocimiento técnico. Te van a pedir que diseñes sistemas, que expliques decisiones pasadas, y que demuestres que podés liderar.', pt: 'As entrevistas Sênior são sobre demonstrar critério, experiência e liderança. Não apenas conhecimento técnico. Vão te pedir para projetar sistemas, explicar decisões passadas e demonstrar que pode liderar.' },
            steps: [
              { id: 'l3-ent-msg', text: { es: 'Entiendo que las entrevistas Senior evalúan criterio y liderazgo', pt: 'Entendo que as entrevistas Sênior avaliam critério e liderança' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-ent-system',
            title: { es: '1️⃣ System Design Senior', pt: '1️⃣ System Design Sênior' },
            description: { es: 'Te van a pedir diseñar sistemas complejos. Tenés que poder manejar ambigüedad y hacer trade-offs.', pt: 'Vão te pedir para projetar sistemas complexos. Você tem que poder lidar com ambiguidade e fazer trade-offs.' },
            steps: [
              { id: 'l3-ents-1', text: { es: 'Practiqué: "Diseñá un sistema de recomendaciones como Netflix"', pt: 'Pratiquei: "Projete um sistema de recomendações como Netflix"' }, type: 'task', checkbox: true },
              { id: 'l3-ents-2', text: { es: 'Practiqué: "Diseñá un data pipeline que maneje 1B eventos/día"', pt: 'Pratiquei: "Projete um data pipeline que gerencie 1B eventos/dia"' }, type: 'task', checkbox: true },
              { id: 'l3-ents-3', text: { es: 'Practiqué: "Diseñá un sistema de detección de fraude en real-time"', pt: 'Pratiquei: "Projete um sistema de detecção de fraude em real-time"' }, type: 'task', checkbox: true },
              { id: 'l3-ents-4', text: { es: 'Practiqué: "Diseñá la arquitectura de datos de un marketplace"', pt: 'Pratiquei: "Projete a arquitetura de dados de um marketplace"' }, type: 'task', checkbox: true },
              { id: 'l3-ents-5', text: { es: 'Sé manejar preguntas de follow-up ("¿y si la escala se duplica?")', pt: 'Sei lidar com perguntas de follow-up ("e se a escala dobrar?")' }, type: 'task', checkbox: true },
              { id: 'l3-ents-6', text: { es: 'Sé identificar y comunicar single points of failure', pt: 'Sei identificar e comunicar single points of failure' }, type: 'task', checkbox: true },
              { id: 'l3-ents-7', text: { es: '🎯 Completé al menos 5 System Design Interviews en la plataforma', pt: '🎯 Completei pelo menos 5 System Design Interviews na plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: 'System Design', en: 'System Design', pt: 'System Design' }, link: '/members?tab=interviews' } },
              { id: 'l3-ents-8', text: { es: '🦖 Practiqué con Saurio como entrevistador AI', pt: '🦖 Pratiquei com Saurio como entrevistador AI' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: 'System Design', en: 'System Design', pt: 'System Design' }, link: '/members?tab=interviews' } },
            ],
            stopTitle: { es: '🎯 Framework avanzado', pt: '🎯 Framework avançado' },
            stopContent: { es: 'Para Senior: 1) Clarificar (5 min) 2) High-level (5 min) 3) Deep dive en 2-3 componentes (20 min) 4) Trade-offs y alternativas (5 min) 5) Operaciones y escalabilidad (5 min). Practicá con timer. En la plataforma tenés 10 entrevistas reales para practicar con Saurio.', pt: 'Para Sênior: 1) Clarificar (5 min) 2) High-level (5 min) 3) Deep dive em 2-3 componentes (20 min) 4) Trade-offs e alternativas (5 min) 5) Operações e escalabilidade (5 min). Pratique com timer. Na plataforma você tem 10 entrevistas reais para praticar com Saurio.' }
          },
          {
            id: 'l3-ent-deep',
            title: { es: '2️⃣ Technical Deep Dive', pt: '2️⃣ Technical Deep Dive' },
            description: { es: 'Te van a pedir que expliques proyectos pasados en detalle. Cada decisión, cada trade-off.', pt: 'Vão te pedir para explicar projetos passados em detalhe. Cada decisão, cada trade-off.' },
            steps: [
              { id: 'l3-entd-1', text: { es: 'Preparé 3 proyectos para explicar en profundidad', pt: 'Preparei 3 projetos para explicar em profundidade' }, type: 'task', checkbox: true },
              { id: 'l3-entd-2', text: { es: 'Para cada proyecto sé: Problema, Solución, Alternativas, Trade-offs, Resultados', pt: 'Para cada projeto sei: Problema, Solução, Alternativas, Trade-offs, Resultados' }, type: 'task', checkbox: true },
              { id: 'l3-entd-3', text: { es: 'Sé explicar decisiones que tomé y por qué', pt: 'Sei explicar decisões que tomei e por que' }, type: 'task', checkbox: true },
              { id: 'l3-entd-4', text: { es: 'Sé explicar qué haría diferente si lo hiciera de nuevo', pt: 'Sei explicar o que faria diferente se fizesse de novo' }, type: 'task', checkbox: true },
              { id: 'l3-entd-5', text: { es: 'Practiqué explicar proyectos en 10-15 minutos', pt: 'Pratiquei explicar projetos em 10-15 minutos' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-ent-leadership',
            title: { es: '3️⃣ Leadership Principles', pt: '3️⃣ Leadership Principles' },
            description: { es: 'Empresas como Amazon, Google, Meta evalúan leadership principles. Preparate.', pt: 'Empresas como Amazon, Google, Meta avaliam leadership principles. Prepare-se.' },
            steps: [
              { id: 'l3-entl-1', text: { es: 'Preparé historia: "Contame de una vez que influenciaste sin autoridad"', pt: 'Preparei história: "Conte sobre uma vez que influenciou sem autoridade"' }, type: 'task', checkbox: true },
              { id: 'l3-entl-2', text: { es: 'Preparé historia: "Contame de una decisión técnica difícil"', pt: 'Preparei história: "Conte sobre uma decisão técnica difícil"' }, type: 'task', checkbox: true },
              { id: 'l3-entl-3', text: { es: 'Preparé historia: "Contame de una vez que mentoreaste a alguien"', pt: 'Preparei história: "Conte sobre uma vez que mentorou alguém"' }, type: 'task', checkbox: true },
              { id: 'l3-entl-4', text: { es: 'Preparé historia: "Contame de una vez que manejaste un deadline imposible"', pt: 'Preparei história: "Conte sobre uma vez que lidou com um prazo impossível"' }, type: 'task', checkbox: true },
              { id: 'l3-entl-5', text: { es: 'Preparé historia: "Contame de una vez que no estuviste de acuerdo con tu manager"', pt: 'Preparei história: "Conte sobre uma vez que não concordou com seu gerente"' }, type: 'task', checkbox: true },
              { id: 'l3-entl-6', text: { es: 'Todas mis historias siguen formato STAR con métricas concretas', pt: 'Todas minhas histórias seguem formato STAR com métricas concretas' }, type: 'task', checkbox: true },
              { id: 'l3-entl-7', text: { es: '🎯 Completé todas las preguntas Behavioral tricky de la plataforma', pt: '🎯 Completei todas as perguntas Behavioral tricky da plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: 'Behavioral', en: 'Behavioral', pt: 'Behavioral' }, link: '/members?tab=interviews' } },
            ]
          },
          {
            id: 'l3-ent-negociacion',
            title: { es: '4️⃣ Negociación de Oferta', pt: '4️⃣ Negociação de Oferta' },
            description: { es: 'Conseguir la oferta es la mitad. Negociarla bien es la otra mitad.', pt: 'Conseguir a oferta é a metade. Negociá-la bem é a outra metade.' },
            steps: [
              { id: 'l3-entn-1', text: { es: 'Sé cuánto paga el mercado para mi nivel (Levels.fyi, Glassdoor)', pt: 'Sei quanto paga o mercado para meu nível (Levels.fyi, Glassdoor)' }, type: 'task', checkbox: true },
              { id: 'l3-entn-2', text: { es: 'Tengo al menos 2 ofertas para comparar (o puedo conseguirlas)', pt: 'Tenho pelo menos 2 ofertas para comparar (ou posso conseguí-las)' }, type: 'task', checkbox: true },
              { id: 'l3-entn-3', text: { es: 'Sé negociar más que solo salario (equity, bonus, remote, PTO)', pt: 'Sei negociar mais que apenas salário (equity, bonus, remote, PTO)' }, type: 'task', checkbox: true },
              { id: 'l3-entn-4', text: { es: 'Practiqué la conversación de negociación', pt: 'Pratiquei a conversa de negociação' }, type: 'task', checkbox: true },
              { id: 'l3-entn-5', text: { es: 'Leí "Never Split the Difference" y aplico las técnicas', pt: 'Li "Never Split the Difference" e aplico as técnicas' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '💰 La regla de oro', pt: '💰 A regra de ouro' },
            stopContent: { es: 'Nunca digas un número primero. Siempre preguntá: "¿Cuál es el rango para esta posición?" Si insisten, decí: "Estoy buscando algo competitivo con el mercado para Senior DE, que según mis datos está en $X-Y". Siempre rangos, nunca números fijos.', pt: 'Nunca diga um número primeiro. Sempre pergunte: "Qual é o intervalo para esta posição?" Se insistirem, diga: "Estou procurando algo competitivo com o mercado para Sênior DE, que segundo meus dados está em $X-Y". Sempre intervalos, nunca números fixos.' }
          },
          {
            id: 'l3-mock-interview',
            title: { es: '🎤 Mock Interview Senior - La Prueba Final', pt: '🎤 Mock Interview Sênior - A Prova Final' },
            description: { es: 'Antes de dar por completado el Level 3, completá una Mock Interview de 45 minutos. Si sos Senior, deberías obtener HIRE o STRONG HIRE consistentemente.', pt: 'Antes de dar por completo o Level 3, complete uma Mock Interview de 45 minutos. Se é Sênior, deveria obter HIRE ou STRONG HIRE consistentemente.' },
            steps: [
              { id: 'l3-mock-1', text: { es: '🎯 Completé la Mock Interview de 45 min en la plataforma', pt: '🎯 Completei a Mock Interview de 45 min na plataforma' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: '🎤 Mock Interview', en: '🎤 Mock Interview', pt: '🎤 Mock Interview' }, link: '/members?tab=interviews' } },
              { id: 'l3-mock-2', text: { es: 'Mi resultado fue HIRE o STRONG HIRE', pt: 'Meu resultado foi HIRE ou STRONG HIRE' }, type: 'task', checkbox: true },
              { id: 'l3-mock-3', text: { es: 'Repetí la Mock hasta obtener STRONG HIRE al menos 1 vez', pt: 'Repeti a Mock até obter STRONG HIRE pelo menos 1 vez' }, type: 'task', checkbox: true },
              { id: 'l3-mock-4', text: { es: 'Practiqué preguntas de Negociación Salarial en Behavioral', pt: 'Pratiquei perguntas de Negociação Salarial em Behavioral' }, type: 'task', checkbox: true, resource: { type: 'practice', label: { es: '💰 Negociación', en: '💰 Negotiation', pt: '💰 Negociação' }, link: '/members?tab=interviews' } },
              { id: 'l3-mock-5', text: { es: 'Me grabé haciendo una mock para analizar mi comunicación', pt: 'Me gravei fazendo uma mock para analisar minha comunicação' }, type: 'task', checkbox: true },
            ],
            stopTitle: { es: '🏆 STRONG HIRE = Estás listo', pt: '🏆 STRONG HIRE = Está pronto' },
            stopContent: { es: 'Si lográs STRONG HIRE consistentemente en las Mock Interviews, estás en el top 5% de candidatos para posiciones Senior. Tu comunicación, estructura STAR, y profundidad técnica están donde tienen que estar. Ahora salí y conseguí esa oferta Senior.', pt: 'Se conseguir STRONG HIRE consistentemente nas Mock Interviews, está no top 5% dos candidatos para posições Sênior. Sua comunicação, estrutura STAR, e profundidade técnica estão onde precisam estar. Agora saia e consiga essa oferta Sênior.' }
          }
        ]
      },
      {
        id: 'l3-futuro',
        title: { es: 'Fase 10: Más Allá de Senior', pt: 'Fase 10: Além de Sênior' },
        emoji: '🚀',
        sections: [
          {
            id: 'l3-futuro-intro',
            title: { es: '💬 Mensaje Final de Ian', pt: '💬 Mensagem Final do Ian' },
            description: { es: 'Si llegaste hasta acá, sos parte del 1% que realmente completa lo que empieza. Tenés skills técnicos de nivel mundial, experiencia real, proyectos que impresionan, y criterio de Senior. Ahora es momento de elegir tu camino. No hay respuesta correcta. Solo hay lo que vos querés.', pt: 'Se chegou até aqui, você é parte do 1% que realmente completa o que começa. Tem skills técnicos de nível mundial, experiência real, projetos que impressionam e critério de Sênior. Agora é momento de escolher seu caminho. Não há resposta correta. Apenas o que você quer.' },
            steps: [
              { id: 'l3-fut-msg', text: { es: 'Leí el mensaje y estoy listo para elegir mi camino', pt: 'Li a mensagem e estou pronto para escolher meu caminho' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-opciones',
            title: { es: '¿Qué Viene Después?', pt: 'O Que Vem Depois?' },
            description: { es: 'El título de "Senior" no es el destino. Es el punto donde realmente empezás a elegir tu camino.', pt: 'O título de "Sênior" não é o destino. É o ponto onde realmente começa a escolher seu caminho.' },
            steps: [
              { id: 'l3-opc-1', text: { es: 'Staff Engineer / Principal - Impacto en múltiples equipos, arquitectura', pt: 'Staff Engineer / Principal - Impacto em múltiplas equipes, arquitetura' }, type: 'task', checkbox: true },
              { id: 'l3-opc-2', text: { es: 'Tech Lead - Liderar equipo técnicamente + algo de gestión', pt: 'Tech Lead - Liderar equipe tecnicamente + um pouco de gestão' }, type: 'task', checkbox: true },
              { id: 'l3-opc-3', text: { es: 'Engineering Manager - Menos código, más personas', pt: 'Engineering Manager - Menos código, mais pessoas' }, type: 'task', checkbox: true },
              { id: 'l3-opc-4', text: { es: 'Arquitecto de Datos - Visión holística, decisiones de largo plazo', pt: 'Arquiteto de Dados - Visão holística, decisões de longo prazo' }, type: 'task', checkbox: true },
              { id: 'l3-opc-5', text: { es: 'Consultor / Freelance - Múltiples clientes, flexibilidad', pt: 'Consultor / Freelance - Múltiplos clientes, flexibilidade' }, type: 'task', checkbox: true },
              { id: 'l3-opc-6', text: { es: 'Emprender - Tu propio producto, máximo riesgo/recompensa', pt: 'Empreender - Seu próprio produto, máximo risco/recompensa' }, type: 'task', checkbox: true },
            ]
          },
          {
            id: 'l3-plan',
            title: { es: '¿Qué Querés Ser en 5 Años?', pt: 'O Que Você Quer Ser em 5 Anos?' },
            description: { es: 'Ahora tenés las bases para elegir. No hay respuesta correcta.', pt: 'Agora você tem as bases para escolher. Não há resposta correta.' },
            steps: [
              { id: 'l3-plan-1', text: { es: '¿Dónde me veo en 5 años?', pt: 'Onde me vejo em 5 anos?' }, type: 'reflection', textInput: { es: 'Visión...', pt: 'Visão...' } },
              { id: 'l3-plan-2', text: { es: '¿Qué rol me atrae más?', pt: 'Qual papel me atrai mais?' }, type: 'reflection', textInput: { es: 'Rol...', pt: 'Papel...' } },
              { id: 'l3-plan-3', text: { es: '¿Qué me falta para llegar ahí?', pt: 'O que me falta para chegar lá?' }, type: 'reflection', textInput: { es: 'Gaps...', pt: 'Gaps...' } },
              { id: 'l3-plan-4', text: { es: '¿Qué voy a hacer ESTE AÑO para acercarme?', pt: 'O que vou fazer ESTE ANO para me aproximar?' }, type: 'reflection', textInput: { es: 'Acciones concretas...', pt: 'Ações concretas...' } },
              { id: 'l3-plan-5', text: { es: '🎉 SOY SENIOR Y SÉ A DÓNDE VOY 🎉', pt: '🎉 SOU SÊNIOR E SEI PARA ONDE VOU 🎉' }, type: 'task', checkbox: true },
            ]
          }
        ]
      }
    ],
    checklist: [
      { es: '✅ Mis entregables tienen calidad Senior (tests, docs, monitoring)', pt: '✅ Meus entregáveis têm qualidade Sênior (testes, docs, monitoramento)', en: '✅ My deliverables have Senior quality (tests, docs, monitoring)' },
      { es: '✅ Sé defender mis estimaciones ante presión', pt: '✅ Sei defender minhas estimativas sob pressão', en: '✅ I can defend my estimates under pressure' },
      { es: '✅ Leí "System Design Interview" Vol 1 y 2', pt: '✅ Li "System Design Interview" Vol 1 e 2', en: '✅ I read "System Design Interview" Vol 1 and 2' },
      { es: '✅ Leí "Staff Engineer"', pt: '✅ Li "Staff Engineer"', en: '✅ I read "Staff Engineer"' },
      { es: '✅ Leí "Never Split the Difference"', pt: '✅ Li "Never Split the Difference"', en: '✅ I read "Never Split the Difference"' },
      { es: '✅ Puedo diseñar arquitecturas y defender decisiones', pt: '✅ Posso projetar arquiteturas e defender decisões', en: '✅ I can design architectures and defend decisions' },
      { es: '✅ Mentoreo activamente a alguien junior', pt: '✅ Mentoro ativamente alguém júnior', en: '✅ I actively mentor a junior' },
      { es: '✅ Mis code reviews agregan valor real', pt: '✅ Meus code reviews agregam valor real', en: '✅ My code reviews add real value' },
      { es: '✅ Manejo incidentes con calma y hago postmortems', pt: '✅ Lido com incidentes com calma e faço postmortems', en: '✅ I handle incidents calmly and write postmortems' },
      { es: '✅ Tengo claro qué quiero ser en 5 años', pt: '✅ Tenho claro o que quero ser em 5 anos', en: '✅ I am clear about what I want to be in 5 years' },
      { es: '✅ Me pagan como Senior ($4000+ USD)', pt: '✅ Me pagam como Sênior ($4000+ USD)', en: '✅ I am paid as a Senior ($4000+ USD)' },
    ],
    resources: [
      {
        title: { es: '📚 Libros Técnicos', pt: '📚 Livros Técnicos', en: '📚 Technical Books' },
        items: [
          { es: '"System Design Interview" Vol 1 y 2 - Alex Xu ⭐', pt: '"System Design Interview" Vol 1 e 2 - Alex Xu ⭐', en: '"System Design Interview" Vol 1 and 2 - Alex Xu ⭐' },
          { es: '"Data Mesh" - Zhamak Dehghani', pt: '"Data Mesh" - Zhamak Dehghani', en: '"Data Mesh" - Zhamak Dehghani' },
          { es: '"Building Microservices" - Sam Newman', pt: '"Building Microservices" - Sam Newman', en: '"Building Microservices" - Sam Newman' },
          { es: '"Streaming Systems" - Tyler Akidau', pt: '"Streaming Systems" - Tyler Akidau', en: '"Streaming Systems" - Tyler Akidau' },
        ]
      },
      {
        title: { es: '👔 Liderazgo', pt: '👔 Liderança', en: '👔 Leadership' },
        items: [
          { es: '"Staff Engineer" - Will Larson ⭐', pt: '"Staff Engineer" - Will Larson ⭐', en: '"Staff Engineer" - Will Larson ⭐' },
          { es: '"The Manager\'s Path" - Camille Fournier', pt: '"The Manager\'s Path" - Camille Fournier', en: '"The Manager\'s Path" - Camille Fournier' },
          { es: '"An Elegant Puzzle" - Will Larson', pt: '"An Elegant Puzzle" - Will Larson', en: '"An Elegant Puzzle" - Will Larson' },
          { es: '"Team Topologies" - Matthew Skelton', pt: '"Team Topologies" - Matthew Skelton', en: '"Team Topologies" - Matthew Skelton' },
        ]
      },
      {
        title: { es: '🗣️ Soft Skills', pt: '🗣️ Soft Skills', en: '🗣️ Soft Skills' },
        items: [
          { es: '"Never Split the Difference" - Chris Voss ⭐', pt: '"Never Split the Difference" - Chris Voss ⭐', en: '"Never Split the Difference" - Chris Voss ⭐' },
          { es: '"Crucial Conversations" - Patterson et al.', pt: '"Crucial Conversations" - Patterson et al.', en: '"Crucial Conversations" - Patterson et al.' },
          { es: '"The Pragmatic Programmer" - David Thomas', pt: '"The Pragmatic Programmer" - David Thomas', en: '"The Pragmatic Programmer" - David Thomas' },
          { es: '"Radical Candor" - Kim Scott', pt: '"Radical Candor" - Kim Scott', en: '"Radical Candor" - Kim Scott' },
        ]
      },
      {
        title: { es: '💰 Salarios Senior LATAM (2025)', pt: '💰 Salários Sênior LATAM (2025)', en: '💰 Senior Salaries LATAM (2025)' },
        items: [
          { es: 'Argentina: $3,000 - $6,000 USD/mes', pt: 'Argentina: $3,000 - $6,000 USD/mês', en: 'Argentina: $3,000 - $6,000 USD/month' },
          { es: 'México: $3,500 - $7,000 USD/mes', pt: 'México: $3,500 - $7,000 USD/mês', en: 'Mexico: $3,500 - $7,000 USD/month' },
          { es: 'Brasil: $3,000 - $6,000 USD/mes', pt: 'Brasil: $3,000 - $6,000 USD/mês', en: 'Brazil: $3,000 - $6,000 USD/month' },
          { es: 'Colombia: $2,500 - $5,000 USD/mes', pt: 'Colômbia: $2,500 - $5,000 USD/mês', en: 'Colombia: $2,500 - $5,000 USD/month' },
          { es: 'Remoto USA: $6,000 - $12,000 USD/mes', pt: 'Remoto EUA: $6,000 - $12,000 USD/mês', en: 'Remote USA: $6,000 - $12,000 USD/month' },
        ]
      }
    ]
  };
