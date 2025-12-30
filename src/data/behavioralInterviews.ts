/**
 * Behavioral Interview Questions for Data Engineering
 * 
 * Estructura basada en el método STAR:
 * - Situation: Contexto
 * - Task: Tu responsabilidad
 * - Action: Qué hiciste
 * - Result: Resultado medible
 */

export interface BehavioralQuestion {
  id: string;
  category: 'conflict' | 'leadership' | 'failure' | 'success' | 'teamwork' | 'technical-decision' | 'pressure' | 'salary';
  question: {
    es: string;
    en: string;
    pt: string;
  };
  whyTheyAsk: {
    es: string;
    en: string;
    pt: string;
  };
  whatTheyLookFor: {
    es: string[];
    en: string[];
    pt: string[];
  };
  exampleAnswer: {
    situation: { es: string; en: string; pt: string };
    task: { es: string; en: string; pt: string };
    action: { es: string; en: string; pt: string };
    result: { es: string; en: string; pt: string };
  };
  redFlags: {
    es: string[];
    en: string[];
    pt: string[];
  };
  followUpQuestions: {
    es: string[];
    en: string[];
    pt: string[];
  };
  difficulty: 'common' | 'tricky' | 'senior';
  estimatedXP: number;
}

export const BEHAVIORAL_CATEGORIES = [
  { 
    id: 'conflict', 
    name: { es: '⚔️ Conflicto', en: '⚔️ Conflict', pt: '⚔️ Conflito' },
    description: { es: 'Cómo manejás desacuerdos', en: 'How you handle disagreements', pt: 'Como você lida com desacordos' }
  },
  { 
    id: 'leadership', 
    name: { es: '👑 Liderazgo', en: '👑 Leadership', pt: '👑 Liderança' },
    description: { es: 'Iniciativa y guiar a otros', en: 'Initiative and guiding others', pt: 'Iniciativa e guiar outros' }
  },
  { 
    id: 'failure', 
    name: { es: '💔 Fracaso', en: '💔 Failure', pt: '💔 Fracasso' },
    description: { es: 'Errores y aprendizajes', en: 'Mistakes and learnings', pt: 'Erros e aprendizados' }
  },
  { 
    id: 'success', 
    name: { es: '🏆 Éxito', en: '🏆 Success', pt: '🏆 Sucesso' },
    description: { es: 'Logros y su impacto', en: 'Achievements and their impact', pt: 'Conquistas e seu impacto' }
  },
  { 
    id: 'teamwork', 
    name: { es: '🤝 Trabajo en Equipo', en: '🤝 Teamwork', pt: '🤝 Trabalho em Equipe' },
    description: { es: 'Colaboración y comunicación', en: 'Collaboration and communication', pt: 'Colaboração e comunicação' }
  },
  { 
    id: 'technical-decision', 
    name: { es: '🔧 Decisiones Técnicas', en: '🔧 Technical Decisions', pt: '🔧 Decisões Técnicas' },
    description: { es: 'Cómo elegís tecnologías', en: 'How you choose technologies', pt: 'Como você escolhe tecnologias' }
  },
  { 
    id: 'pressure', 
    name: { es: '🔥 Bajo Presión', en: '🔥 Under Pressure', pt: '🔥 Sob Pressão' },
    description: { es: 'Deadlines y situaciones críticas', en: 'Deadlines and critical situations', pt: 'Prazos e situações críticas' }
  },
  { 
    id: 'salary', 
    name: { es: '💰 Negociación Salarial', en: '💰 Salary Negotiation', pt: '💰 Negociação Salarial' },
    description: { es: 'Cómo negociar tu compensación', en: 'How to negotiate your compensation', pt: 'Como negociar sua compensação' }
  },
];

export const BEHAVIORAL_QUESTIONS: BehavioralQuestion[] = [
  // ============ CONFLICT ============
  {
    id: 'bq-conflict-1',
    category: 'conflict',
    question: {
      es: 'Contame de una vez que tuviste un desacuerdo con un compañero de trabajo. ¿Cómo lo resolviste?',
      en: 'Tell me about a time you had a disagreement with a coworker. How did you resolve it?',
      pt: 'Conte-me sobre uma vez que você teve um desentendimento com um colega de trabalho. Como você resolveu?'
    },
    whyTheyAsk: {
      es: 'Quieren ver si podés manejar conflictos de forma profesional sin escalar innecesariamente.',
      en: 'They want to see if you can handle conflicts professionally without unnecessary escalation.',
      pt: 'Eles querem ver se você consegue lidar com conflitos de forma profissional sem escalar desnecessariamente.'
    },
    whatTheyLookFor: {
      es: [
        'Que escuchaste el punto de vista del otro',
        'Que buscaste datos/evidencia para fundamentar tu posición',
        'Que llegaste a un compromiso o solución win-win',
        'Que mantuviste la relación profesional'
      ],
      en: [
        'That you listened to the other person\'s point of view',
        'That you looked for data/evidence to support your position',
        'That you reached a compromise or win-win solution',
        'That you maintained the professional relationship'
      ],
      pt: [
        'Que você ouviu o ponto de vista do outro',
        'Que você buscou dados/evidência para fundamentar sua posição',
        'Que você chegou a um compromisso ou solução win-win',
        'Que você manteve o relacionamento profissional'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'En mi trabajo anterior, el equipo de Analytics quería que migremos a Snowflake inmediatamente, pero yo creía que deberíamos primero resolver problemas de calidad de datos.',
        en: 'At my previous job, the Analytics team wanted us to migrate to Snowflake immediately, but I believed we should first resolve data quality issues.',
        pt: 'No meu trabalho anterior, a equipe de Analytics queria que migrássemos para Snowflake imediatamente, mas eu acreditava que deveríamos primeiro resolver problemas de qualidade de dados.'
      },
      task: {
        es: 'Mi responsabilidad era asegurar que la migración fuera exitosa y que el equipo de Analytics pudiera confiar en los datos.',
        en: 'My responsibility was to ensure the migration was successful and that the Analytics team could trust the data.',
        pt: 'Minha responsabilidade era garantir que a migração fosse bem-sucedida e que a equipe de Analytics pudesse confiar nos dados.'
      },
      action: {
        es: 'Programé una reunión con el lead de Analytics. Le mostré ejemplos concretos de inconsistencias en los datos y propuse un plan de 2 fases: primero 2 semanas de limpieza, luego migración. También ofrecí ayudar con queries mientras tanto.',
        en: 'I scheduled a meeting with the Analytics lead. I showed them concrete examples of data inconsistencies and proposed a 2-phase plan: first 2 weeks of cleanup, then migration. I also offered to help with queries in the meantime.',
        pt: 'Agendei uma reunião com o lead de Analytics. Mostrei exemplos concretos de inconsistências nos dados e propus um plano de 2 fases: primeiro 2 semanas de limpeza, depois migração. Também ofereci ajudar com queries enquanto isso.'
      },
      result: {
        es: 'Aceptaron el plan. La migración se retrasó 2 semanas pero tuvimos 0 incidentes post-migración. El lead de Analytics después me agradeció porque sus reportes ahora eran confiables.',
        en: 'They accepted the plan. The migration was delayed 2 weeks but we had 0 post-migration incidents. The Analytics lead later thanked me because their reports were now reliable.',
        pt: 'Eles aceitaram o plano. A migração foi atrasada 2 semanas mas tivemos 0 incidentes pós-migração. O lead de Analytics depois me agradeceu porque seus relatórios agora eram confiáveis.'
      }
    },
    redFlags: {
      es: [
        '❌ "No tengo conflictos, me llevo bien con todos" - Suena falso',
        '❌ Culpar 100% al otro sin autocrítica',
        '❌ Escalar al manager sin intentar resolverlo primero',
        '❌ No mencionar el resultado o impacto'
      ],
      en: [
        '❌ "I don\'t have conflicts, I get along with everyone" - Sounds fake',
        '❌ Blaming 100% on the other person without self-criticism',
        '❌ Escalating to manager without trying to resolve first',
        '❌ Not mentioning the result or impact'
      ],
      pt: [
        '❌ "Não tenho conflitos, me dou bem com todos" - Soa falso',
        '❌ Culpar 100% o outro sem autocrítica',
        '❌ Escalar para o gerente sem tentar resolver primeiro',
        '❌ Não mencionar o resultado ou impacto'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Qué hubieras hecho diferente?',
        '¿Cómo quedó tu relación con esa persona después?',
        '¿Tuviste que ceder en algo?'
      ],
      en: [
        'What would you have done differently?',
        'How was your relationship with that person afterwards?',
        'Did you have to give in on something?'
      ],
      pt: [
        'O que você teria feito diferente?',
        'Como ficou seu relacionamento com essa pessoa depois?',
        'Você teve que ceder em algo?'
      ]
    },
    difficulty: 'common',
    estimatedXP: 100
  },

  // ============ FAILURE ============
  {
    id: 'bq-failure-1',
    category: 'failure',
    question: {
      es: 'Contame de un error grande que cometiste en el trabajo. ¿Qué pasó y qué aprendiste?',
      en: 'Tell me about a big mistake you made at work. What happened and what did you learn?',
      pt: 'Conte-me sobre um erro grande que você cometeu no trabalho. O que aconteceu e o que você aprendeu?'
    },
    whyTheyAsk: {
      es: 'Quieren ver si sos humilde, si aprendés de tus errores, y si tomás responsabilidad.',
      en: 'They want to see if you\'re humble, if you learn from your mistakes, and if you take responsibility.',
      pt: 'Eles querem ver se você é humilde, se aprende com seus erros, e se assume responsabilidade.'
    },
    whatTheyLookFor: {
      es: [
        'Que admitas el error sin excusas',
        'Que expliques qué hiciste para solucionarlo',
        'Que menciones qué aprendiste',
        'Que hayas implementado algo para prevenir que pase de nuevo'
      ],
      en: [
        'That you admit the mistake without excuses',
        'That you explain what you did to fix it',
        'That you mention what you learned',
        'That you implemented something to prevent it from happening again'
      ],
      pt: [
        'Que você admita o erro sem desculpas',
        'Que você explique o que fez para corrigir',
        'Que você mencione o que aprendeu',
        'Que você tenha implementado algo para prevenir que aconteça de novo'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Hace 2 años, deployé un pipeline a producción sin testearlo completamente en staging. Confiaba en que era un cambio menor.',
        en: '2 years ago, I deployed a pipeline to production without fully testing it in staging. I was confident it was a minor change.',
        pt: 'Há 2 anos, deployei um pipeline para produção sem testá-lo completamente em staging. Eu confiava que era uma mudança menor.'
      },
      task: {
        es: 'El pipeline procesaba pagos de clientes, así que cuando falló, los reportes financieros del día estaban incorrectos.',
        en: 'The pipeline processed customer payments, so when it failed, the day\'s financial reports were incorrect.',
        pt: 'O pipeline processava pagamentos de clientes, então quando falhou, os relatórios financeiros do dia estavam incorretos.'
      },
      action: {
        es: 'Inmediatamente revertí el cambio, notifiqué a mi manager, y pasé la noche corrigiendo los datos manualmente. Al día siguiente, documenté el incidente y propuse agregar tests automáticos obligatorios antes de cualquier deploy.',
        en: 'I immediately reverted the change, notified my manager, and spent the night manually correcting the data. The next day, I documented the incident and proposed adding mandatory automated tests before any deploy.',
        pt: 'Imediatamente reverti a mudança, notifiquei meu gerente, e passei a noite corrigindo os dados manualmente. No dia seguinte, documentei o incidente e propus adicionar testes automatizados obrigatórios antes de qualquer deploy.'
      },
      result: {
        es: 'Implementamos un CI/CD que bloquea deploys sin tests. Desde entonces no tuvimos incidentes similares. Aprendí que "cambio menor" no existe cuando procesas datos críticos.',
        en: 'We implemented a CI/CD that blocks deploys without tests. Since then we haven\'t had similar incidents. I learned that "minor change" doesn\'t exist when you\'re processing critical data.',
        pt: 'Implementamos um CI/CD que bloqueia deploys sem testes. Desde então não tivemos incidentes similares. Aprendi que "mudança menor" não existe quando você processa dados críticos.'
      }
    },
    redFlags: {
      es: [
        '❌ "Nunca cometí un error grande" - Nadie te cree',
        '❌ Culpar a otros o al sistema',
        '❌ Un error demasiado pequeño (no demuestra aprendizaje real)',
        '❌ No mencionar qué cambió después'
      ],
      en: [
        '❌ "I\'ve never made a big mistake" - No one believes you',
        '❌ Blaming others or the system',
        '❌ A mistake that\'s too small (doesn\'t show real learning)',
        '❌ Not mentioning what changed afterwards'
      ],
      pt: [
        '❌ "Nunca cometi um erro grande" - Ninguém acredita',
        '❌ Culpar outros ou o sistema',
        '❌ Um erro muito pequeno (não demonstra aprendizado real)',
        '❌ Não mencionar o que mudou depois'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Cómo reaccionó tu manager?',
        '¿Cuánto tiempo te llevó detectar el error?',
        '¿Cambió algo en tu forma de trabajar después?'
      ],
      en: [
        'How did your manager react?',
        'How long did it take you to detect the error?',
        'Did anything change in how you work afterwards?'
      ],
      pt: [
        'Como seu gerente reagiu?',
        'Quanto tempo levou para detectar o erro?',
        'Algo mudou na sua forma de trabalhar depois?'
      ]
    },
    difficulty: 'common',
    estimatedXP: 100
  },

  // ============ TECHNICAL DECISION ============
  {
    id: 'bq-technical-1',
    category: 'technical-decision',
    question: {
      es: 'Contame de una decisión técnica difícil que tuviste que tomar. ¿Cómo la abordaste?',
      en: 'Tell me about a difficult technical decision you had to make. How did you approach it?',
      pt: 'Conte-me sobre uma decisão técnica difícil que você teve que tomar. Como você abordou?'
    },
    whyTheyAsk: {
      es: 'Quieren ver tu proceso de pensamiento, cómo evalúas trade-offs, y si considerás el contexto del negocio.',
      en: 'They want to see your thought process, how you evaluate trade-offs, and if you consider the business context.',
      pt: 'Eles querem ver seu processo de pensamento, como você avalia trade-offs, e se considera o contexto do negócio.'
    },
    whatTheyLookFor: {
      es: [
        'Que consideraste múltiples opciones',
        'Que evaluaste pros y contras objetivamente',
        'Que involucraste a stakeholders relevantes',
        'Que tu decisión tenía en cuenta costos, tiempo, y mantenibilidad'
      ],
      en: [
        'That you considered multiple options',
        'That you evaluated pros and cons objectively',
        'That you involved relevant stakeholders',
        'That your decision considered costs, time, and maintainability'
      ],
      pt: [
        'Que você considerou múltiplas opções',
        'Que você avaliou prós e contras objetivamente',
        'Que você envolveu stakeholders relevantes',
        'Que sua decisão considerou custos, tempo, e manutenibilidade'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Necesitábamos procesar 10x más datos pero nuestro pipeline en Python estaba llegando al límite. Tenía que decidir entre optimizar el código existente, migrar a Spark, o usar un servicio managed.',
        en: 'We needed to process 10x more data but our Python pipeline was hitting its limit. I had to decide between optimizing the existing code, migrating to Spark, or using a managed service.',
        pt: 'Precisávamos processar 10x mais dados mas nosso pipeline em Python estava chegando ao limite. Eu tinha que decidir entre otimizar o código existente, migrar para Spark, ou usar um serviço gerenciado.'
      },
      task: {
        es: 'Como el único Data Engineer, la decisión era mía pero impactaba al equipo de Analytics y al presupuesto.',
        en: 'As the only Data Engineer, the decision was mine but it impacted the Analytics team and the budget.',
        pt: 'Como o único Data Engineer, a decisão era minha mas impactava a equipe de Analytics e o orçamento.'
      },
      action: {
        es: 'Hice un spike de 1 semana probando las 3 opciones. Documenté: costo mensual, tiempo de implementación, curva de aprendizaje del equipo, y performance. Presenté los findings al CTO con mi recomendación.',
        en: 'I did a 1-week spike testing all 3 options. I documented: monthly cost, implementation time, team learning curve, and performance. I presented the findings to the CTO with my recommendation.',
        pt: 'Fiz um spike de 1 semana testando as 3 opções. Documentei: custo mensal, tempo de implementação, curva de aprendizado do time, e performance. Apresentei os findings ao CTO com minha recomendação.'
      },
      result: {
        es: 'Elegimos Spark en Databricks. Costaba más pero el tiempo de procesamiento bajó de 4 horas a 20 minutos. El ROI fue positivo en 3 meses porque Analytics podía iterar más rápido.',
        en: 'We chose Spark on Databricks. It cost more but processing time dropped from 4 hours to 20 minutes. ROI was positive in 3 months because Analytics could iterate faster.',
        pt: 'Escolhemos Spark no Databricks. Custava mais mas o tempo de processamento caiu de 4 horas para 20 minutos. O ROI foi positivo em 3 meses porque Analytics podia iterar mais rápido.'
      }
    },
    redFlags: {
      es: [
        '❌ Elegir solo por preferencia personal sin datos',
        '❌ No considerar el costo o tiempo',
        '❌ No involucrar a nadie más en la decisión',
        '❌ No poder explicar por qué descartaste las otras opciones'
      ],
      en: [
        '❌ Choosing only by personal preference without data',
        '❌ Not considering cost or time',
        '❌ Not involving anyone else in the decision',
        '❌ Not being able to explain why you discarded other options'
      ],
      pt: [
        '❌ Escolher só por preferência pessoal sem dados',
        '❌ Não considerar o custo ou tempo',
        '❌ Não envolver mais ninguém na decisão',
        '❌ Não conseguir explicar por que descartou as outras opções'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Qué hubieras elegido con la mitad del presupuesto?',
        '¿Hubo resistencia a tu recomendación?',
        '¿Cambiarías algo de esa decisión hoy?'
      ],
      en: [
        'What would you have chosen with half the budget?',
        'Was there resistance to your recommendation?',
        'Would you change anything about that decision today?'
      ],
      pt: [
        'O que você teria escolhido com metade do orçamento?',
        'Houve resistência à sua recomendação?',
        'Você mudaria algo dessa decisão hoje?'
      ]
    },
    difficulty: 'common',
    estimatedXP: 120
  },

  // ============ PRESSURE ============
  {
    id: 'bq-pressure-1',
    category: 'pressure',
    question: {
      es: 'Contame de una vez que tuviste que entregar algo con un deadline muy ajustado. ¿Cómo lo manejaste?',
      en: 'Tell me about a time you had to deliver something with a very tight deadline. How did you handle it?',
      pt: 'Conte-me sobre uma vez que você teve que entregar algo com um prazo muito apertado. Como você lidou?'
    },
    whyTheyAsk: {
      es: 'Quieren ver cómo manejás el estrés, si priorizás bien, y si pedís ayuda cuando la necesitás.',
      en: 'They want to see how you handle stress, if you prioritize well, and if you ask for help when needed.',
      pt: 'Eles querem ver como você lida com estresse, se prioriza bem, e se pede ajuda quando precisa.'
    },
    whatTheyLookFor: {
      es: [
        'Que priorizaste lo esencial vs lo nice-to-have',
        'Que comunicaste el status regularmente',
        'Que pediste ayuda si la necesitabas',
        'Que entregaste algo funcional aunque no fuera perfecto'
      ],
      en: [
        'That you prioritized essential vs nice-to-have',
        'That you communicated status regularly',
        'That you asked for help if you needed it',
        'That you delivered something functional even if not perfect'
      ],
      pt: [
        'Que você priorizou o essencial vs nice-to-have',
        'Que você comunicou o status regularmente',
        'Que você pediu ajuda se precisou',
        'Que você entregou algo funcional mesmo que não fosse perfeito'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'El CEO necesitaba un dashboard para una reunión con inversores en 3 días. Normalmente tomaría 2 semanas.',
        en: 'The CEO needed a dashboard for an investor meeting in 3 days. It would normally take 2 weeks.',
        pt: 'O CEO precisava de um dashboard para uma reunião com investidores em 3 dias. Normalmente levaria 2 semanas.'
      },
      task: {
        es: 'Tenía que entregar algo funcional y visualmente presentable que mostrara las métricas clave del negocio.',
        en: 'I had to deliver something functional and visually presentable that showed the key business metrics.',
        pt: 'Eu tinha que entregar algo funcional e visualmente apresentável que mostrasse as métricas chave do negócio.'
      },
      action: {
        es: 'Primero pregunté: "¿Cuáles son las 5 métricas que SÍ o SÍ necesitás?" Eliminé las otras 15. Usé una herramienta no-code (Metabase) en vez de algo custom. Trabajé noches pero comuniqué progreso cada día.',
        en: 'First I asked: "What are the 5 metrics you absolutely need?" I eliminated the other 15. I used a no-code tool (Metabase) instead of something custom. I worked nights but communicated progress every day.',
        pt: 'Primeiro perguntei: "Quais são as 5 métricas que você absolutamente precisa?" Eliminei as outras 15. Usei uma ferramenta no-code (Metabase) em vez de algo custom. Trabalhei noites mas comuniquei progresso todo dia.'
      },
      result: {
        es: 'Entregué el dashboard 4 horas antes de la reunión. El CEO consiguió el funding. Después migramos a algo más robusto con calma.',
        en: 'I delivered the dashboard 4 hours before the meeting. The CEO got the funding. Later we migrated to something more robust calmly.',
        pt: 'Entreguei o dashboard 4 horas antes da reunião. O CEO conseguiu o funding. Depois migramos para algo mais robusto com calma.'
      }
    },
    redFlags: {
      es: [
        '❌ "Nunca tengo deadlines apretados" - No te creen',
        '❌ Decir que trabajaste 24/7 sin pedir ayuda (hero syndrome)',
        '❌ No mencionar qué sacrificaste o priorizaste',
        '❌ No comunicar el riesgo a tiempo'
      ],
      en: [
        '❌ "I never have tight deadlines" - They don\'t believe you',
        '❌ Saying you worked 24/7 without asking for help (hero syndrome)',
        '❌ Not mentioning what you sacrificed or prioritized',
        '❌ Not communicating the risk on time'
      ],
      pt: [
        '❌ "Nunca tenho prazos apertados" - Não acreditam',
        '❌ Dizer que trabalhou 24/7 sem pedir ajuda (hero syndrome)',
        '❌ Não mencionar o que sacrificou ou priorizou',
        '❌ Não comunicar o risco a tempo'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Qué hubieras hecho si veías que no llegabas?',
        '¿Pediste ayuda a alguien?',
        '¿Qué aprendiste sobre estimación de tiempo?'
      ],
      en: [
        'What would you have done if you saw you weren\'t going to make it?',
        'Did you ask anyone for help?',
        'What did you learn about time estimation?'
      ],
      pt: [
        'O que você teria feito se visse que não ia conseguir?',
        'Você pediu ajuda a alguém?',
        'O que você aprendeu sobre estimativa de tempo?'
      ]
    },
    difficulty: 'common',
    estimatedXP: 100
  },

  // ============ LEADERSHIP ============
  {
    id: 'bq-leadership-1',
    category: 'leadership',
    question: {
      es: 'Contame de una vez que tomaste la iniciativa en algo que no era tu responsabilidad.',
      en: 'Tell me about a time you took initiative on something that wasn\'t your responsibility.',
      pt: 'Conte-me sobre uma vez que você tomou iniciativa em algo que não era sua responsabilidade.'
    },
    whyTheyAsk: {
      es: 'Quieren ver si sos proactivo, si ves más allá de tu job description, y si podés liderar sin título.',
      en: 'They want to see if you\'re proactive, if you see beyond your job description, and if you can lead without a title.',
      pt: 'Eles querem ver se você é proativo, se vê além do seu job description, e se pode liderar sem título.'
    },
    whatTheyLookFor: {
      es: [
        'Que identificaste un problema/oportunidad',
        'Que propusiste una solución sin que te lo pidieran',
        'Que coordinaste con otros para ejecutar',
        'Que mediste el impacto'
      ],
      en: [
        'That you identified a problem/opportunity',
        'That you proposed a solution without being asked',
        'That you coordinated with others to execute',
        'That you measured the impact'
      ],
      pt: [
        'Que você identificou um problema/oportunidade',
        'Que você propôs uma solução sem que pedissem',
        'Que você coordenou com outros para executar',
        'Que você mediu o impacto'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Noté que cada vez que alguien nuevo entraba al equipo, tardaba 2 semanas en entender nuestros pipelines porque no había documentación.',
        en: 'I noticed that every time someone new joined the team, it took 2 weeks to understand our pipelines because there was no documentation.',
        pt: 'Notei que toda vez que alguém novo entrava na equipe, levava 2 semanas para entender nossos pipelines porque não havia documentação.'
      },
      task: {
        es: 'No era mi responsabilidad documentar, pero vi que era un problema que afectaba la velocidad del equipo.',
        en: 'It wasn\'t my responsibility to document, but I saw it was a problem affecting team velocity.',
        pt: 'Não era minha responsabilidade documentar, mas vi que era um problema que afetava a velocidade do time.'
      },
      action: {
        es: 'Propuse al manager dedicar 2 horas por semana a documentación. Creé un template, documenté los 5 pipelines principales, y organicé sesiones de "doc review" donde el equipo validaba y mejoraba.',
        en: 'I proposed to my manager dedicating 2 hours per week to documentation. I created a template, documented the 5 main pipelines, and organized "doc review" sessions where the team validated and improved.',
        pt: 'Propus ao gerente dedicar 2 horas por semana a documentação. Criei um template, documentei os 5 pipelines principais, e organizei sessões de "doc review" onde o time validava e melhorava.'
      },
      result: {
        es: 'El onboarding del siguiente hire bajó de 2 semanas a 3 días. El manager lo mencionó en mi review como ejemplo de ownership.',
        en: 'The next hire\'s onboarding dropped from 2 weeks to 3 days. My manager mentioned it in my review as an example of ownership.',
        pt: 'O onboarding do próximo contratado caiu de 2 semanas para 3 dias. Meu gerente mencionou isso na minha review como exemplo de ownership.'
      }
    },
    redFlags: {
      es: [
        '❌ Hacer algo sin consultar a nadie (cowboy)',
        '❌ Tomar crédito de un esfuerzo de equipo',
        '❌ No tener resultado medible',
        '❌ Algo muy pequeño que no muestra impacto real'
      ],
      en: [
        '❌ Doing something without consulting anyone (cowboy)',
        '❌ Taking credit for a team effort',
        '❌ No measurable result',
        '❌ Something too small that doesn\'t show real impact'
      ],
      pt: [
        '❌ Fazer algo sem consultar ninguém (cowboy)',
        '❌ Tomar crédito por um esforço de equipe',
        '❌ Sem resultado mensurável',
        '❌ Algo muito pequeno que não mostra impacto real'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Cómo convenciste a tu manager de que valía la pena?',
        '¿Hubo resistencia del equipo?',
        '¿Seguís manteniendo esa iniciativa hoy?'
      ],
      en: [
        'How did you convince your manager it was worth it?',
        'Was there resistance from the team?',
        'Are you still maintaining that initiative today?'
      ],
      pt: [
        'Como você convenceu seu gerente de que valia a pena?',
        'Houve resistência do time?',
        'Você ainda mantém essa iniciativa hoje?'
      ]
    },
    difficulty: 'common',
    estimatedXP: 100
  },

  // ============ TEAMWORK ============
  {
    id: 'bq-teamwork-1',
    category: 'teamwork',
    question: {
      es: 'Contame de un proyecto donde tuviste que colaborar con equipos de otras áreas. ¿Cómo fue?',
      en: 'Tell me about a project where you had to collaborate with teams from other areas. How was it?',
      pt: 'Conte-me sobre um projeto onde você teve que colaborar com equipes de outras áreas. Como foi?'
    },
    whyTheyAsk: {
      es: 'Data Engineering siempre trabaja con Analytics, Backend, y Negocio. Quieren ver que podés comunicarte con no-técnicos.',
      en: 'Data Engineering always works with Analytics, Backend, and Business. They want to see you can communicate with non-technical people.',
      pt: 'Data Engineering sempre trabalha com Analytics, Backend, e Negócio. Eles querem ver que você consegue se comunicar com pessoas não-técnicas.'
    },
    whatTheyLookFor: {
      es: [
        'Que adaptaste tu comunicación al audience',
        'Que entendiste las necesidades del otro equipo',
        'Que manejaste expectativas y plazos',
        'Que el resultado fue beneficioso para ambos'
      ],
      en: [
        'That you adapted your communication to the audience',
        'That you understood the other team\'s needs',
        'That you managed expectations and timelines',
        'That the result was beneficial for both'
      ],
      pt: [
        'Que você adaptou sua comunicação ao público',
        'Que você entendeu as necessidades do outro time',
        'Que você gerenciou expectativas e prazos',
        'Que o resultado foi benéfico para ambos'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Marketing necesitaba un pipeline para trackear attribution de campañas. Querían datos "en tiempo real" pero no entendían lo que eso implicaba técnicamente.',
        en: 'Marketing needed a pipeline to track campaign attribution. They wanted data "in real-time" but didn\'t understand what that technically implied.',
        pt: 'Marketing precisava de um pipeline para rastrear attribution de campanhas. Eles queriam dados "em tempo real" mas não entendiam o que isso implicava tecnicamente.'
      },
      task: {
        es: 'Tenía que entregar algo útil sin prometer lo imposible, y educarlos sobre qué era realista.',
        en: 'I had to deliver something useful without promising the impossible, and educate them on what was realistic.',
        pt: 'Eu tinha que entregar algo útil sem prometer o impossível, e educá-los sobre o que era realista.'
      },
      action: {
        es: 'Primero hice una sesión de discovery para entender el "por qué" detrás de su pedido. Resultó que no necesitaban real-time, sino ver datos del día anterior a las 9am. Propuse un pipeline batch que corría a las 6am.',
        en: 'First I did a discovery session to understand the "why" behind their request. It turned out they didn\'t need real-time, but to see yesterday\'s data by 9am. I proposed a batch pipeline running at 6am.',
        pt: 'Primeiro fiz uma sessão de discovery para entender o "porquê" do pedido deles. Resultou que não precisavam de real-time, mas ver dados do dia anterior às 9h. Propus um pipeline batch que rodava às 6h.'
      },
      result: {
        es: 'El pipeline se entregó en 1 semana (vs 1 mes si fuera real-time). Marketing estaba feliz porque tenían sus datos a tiempo. Aprendí que siempre hay que preguntar el "por qué" antes del "cómo".',
        en: 'The pipeline was delivered in 1 week (vs 1 month if real-time). Marketing was happy because they had their data on time. I learned to always ask "why" before "how".',
        pt: 'O pipeline foi entregue em 1 semana (vs 1 mês se fosse real-time). Marketing estava feliz porque tinham seus dados a tempo. Aprendi que sempre tem que perguntar o "porquê" antes do "como".'
      }
    },
    redFlags: {
      es: [
        '❌ Quejarte de que "no entienden lo técnico"',
        '❌ Prometer todo lo que piden sin pushback',
        '❌ No involucrarlos en el proceso',
        '❌ No adaptar el lenguaje a su nivel'
      ],
      en: [
        '❌ Complaining that "they don\'t understand the technical stuff"',
        '❌ Promising everything they ask without pushback',
        '❌ Not involving them in the process',
        '❌ Not adapting language to their level'
      ],
      pt: [
        '❌ Reclamar que "não entendem o técnico"',
        '❌ Prometer tudo que pedem sem pushback',
        '❌ Não envolvê-los no processo',
        '❌ Não adaptar a linguagem ao nível deles'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Cómo manejaste cuando pedían cambios de último momento?',
        '¿Tuviste que decir que no a algo?',
        '¿Cómo mediste el éxito del proyecto?'
      ],
      en: [
        'How did you handle last-minute change requests?',
        'Did you have to say no to something?',
        'How did you measure the project\'s success?'
      ],
      pt: [
        'Como você lidou com pedidos de mudança de última hora?',
        'Você teve que dizer não a algo?',
        'Como você mediu o sucesso do projeto?'
      ]
    },
    difficulty: 'common',
    estimatedXP: 100
  },

  // ============ SUCCESS ============
  {
    id: 'bq-success-1',
    category: 'success',
    question: {
      es: 'Contame del logro profesional del que estás más orgulloso.',
      en: 'Tell me about the professional achievement you\'re most proud of.',
      pt: 'Conte-me sobre a conquista profissional da qual você mais se orgulha.'
    },
    whyTheyAsk: {
      es: 'Quieren ver qué considerás un éxito, si podés cuantificar impacto, y qué tipo de trabajo te motiva.',
      en: 'They want to see what you consider success, if you can quantify impact, and what type of work motivates you.',
      pt: 'Eles querem ver o que você considera sucesso, se consegue quantificar impacto, e que tipo de trabalho te motiva.'
    },
    whatTheyLookFor: {
      es: [
        'Impacto medible (ahorro de dinero, tiempo, etc.)',
        'Tu rol específico en el éxito',
        'Desafíos que superaste',
        'Aprendizajes que aplicás hoy'
      ],
      en: [
        'Measurable impact (money saved, time saved, etc.)',
        'Your specific role in the success',
        'Challenges you overcame',
        'Learnings you apply today'
      ],
      pt: [
        'Impacto mensurável (economia de dinheiro, tempo, etc.)',
        'Seu papel específico no sucesso',
        'Desafios que você superou',
        'Aprendizados que você aplica hoje'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Cuando entré a mi empresa anterior, los reportes tardaban 8 horas en generarse y fallaban 30% de las veces.',
        en: 'When I joined my previous company, reports took 8 hours to generate and failed 30% of the time.',
        pt: 'Quando entrei na minha empresa anterior, os relatórios levavam 8 horas para gerar e falhavam 30% das vezes.'
      },
      task: {
        es: 'Mi objetivo era hacer que los reportes fueran confiables para que el equipo de finanzas pudiera tomar decisiones a tiempo.',
        en: 'My goal was to make reports reliable so the finance team could make decisions on time.',
        pt: 'Meu objetivo era fazer os relatórios confiáveis para que o time de finanças pudesse tomar decisões a tempo.'
      },
      action: {
        es: 'Rediseñé la arquitectura usando un data warehouse (Snowflake), implementé data quality checks, y migré de scripts manuales a Airflow. Tardé 4 meses trabajando en paralelo con el sistema legacy.',
        en: 'I redesigned the architecture using a data warehouse (Snowflake), implemented data quality checks, and migrated from manual scripts to Airflow. It took 4 months working in parallel with the legacy system.',
        pt: 'Redesenhei a arquitetura usando um data warehouse (Snowflake), implementei data quality checks, e migrei de scripts manuais para Airflow. Levou 4 meses trabalhando em paralelo com o sistema legado.'
      },
      result: {
        es: 'Los reportes ahora tardan 45 minutos y tienen 99.9% de uptime. Finanzas estima que ahorran 10 horas/semana en validación manual. Me promovieron a Senior después de este proyecto.',
        en: 'Reports now take 45 minutes and have 99.9% uptime. Finance estimates they save 10 hours/week on manual validation. I was promoted to Senior after this project.',
        pt: 'Os relatórios agora levam 45 minutos e têm 99.9% de uptime. Finanças estima que economizam 10 horas/semana em validação manual. Fui promovido a Senior depois deste projeto.'
      }
    },
    redFlags: {
      es: [
        '❌ Un logro sin números o métricas',
        '❌ Algo que no requirió esfuerzo real',
        '❌ Tomar crédito solo cuando fue un esfuerzo de equipo',
        '❌ Un logro de hace 10 años sin nada reciente'
      ],
      en: [
        '❌ An achievement without numbers or metrics',
        '❌ Something that didn\'t require real effort',
        '❌ Taking solo credit when it was a team effort',
        '❌ An achievement from 10 years ago with nothing recent'
      ],
      pt: [
        '❌ Uma conquista sem números ou métricas',
        '❌ Algo que não exigiu esforço real',
        '❌ Tomar crédito sozinho quando foi esforço de equipe',
        '❌ Uma conquista de 10 anos atrás sem nada recente'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Qué fue lo más difícil de ese proyecto?',
        '¿Qué harías diferente si lo hicieras de nuevo?',
        '¿Por qué elegiste esa tecnología específica?'
      ],
      en: [
        'What was the hardest part of that project?',
        'What would you do differently if you did it again?',
        'Why did you choose that specific technology?'
      ],
      pt: [
        'Qual foi a parte mais difícil desse projeto?',
        'O que você faria diferente se fizesse de novo?',
        'Por que você escolheu essa tecnologia específica?'
      ]
    },
    difficulty: 'common',
    estimatedXP: 100
  },

  // ============ TRICKY QUESTIONS ============
  {
    id: 'bq-tricky-1',
    category: 'failure',
    question: {
      es: '¿Cuál es tu mayor debilidad?',
      en: 'What is your biggest weakness?',
      pt: 'Qual é sua maior fraqueza?'
    },
    whyTheyAsk: {
      es: 'Quieren ver si tenés autoconciencia y si estás trabajando activamente en mejorar.',
      en: 'They want to see if you have self-awareness and if you\'re actively working on improving.',
      pt: 'Eles querem ver se você tem autoconsciência e se está ativamente trabalhando em melhorar.'
    },
    whatTheyLookFor: {
      es: [
        'Una debilidad REAL (no "soy muy perfeccionista")',
        'Que sepas cómo te afecta en el trabajo',
        'Que tengas un plan concreto para mejorar',
        'Que ya hayas hecho progreso'
      ],
      en: [
        'A REAL weakness (not "I\'m too much of a perfectionist")',
        'That you know how it affects you at work',
        'That you have a concrete plan to improve',
        'That you\'ve already made progress'
      ],
      pt: [
        'Uma fraqueza REAL (não "sou muito perfeccionista")',
        'Que você saiba como te afeta no trabalho',
        'Que você tenha um plano concreto para melhorar',
        'Que você já tenha feito progresso'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Mi debilidad es que a veces me cuesta delegar. Prefiero hacer las cosas yo mismo porque sé que quedarán bien.',
        en: 'My weakness is that sometimes I struggle to delegate. I prefer doing things myself because I know they\'ll turn out well.',
        pt: 'Minha fraqueza é que às vezes tenho dificuldade em delegar. Prefiro fazer as coisas eu mesmo porque sei que vão ficar bem.'
      },
      task: {
        es: 'Esto me afectaba porque terminaba sobrecargado y mis compañeros no crecían porque no les daba oportunidades.',
        en: 'This affected me because I ended up overloaded and my colleagues didn\'t grow because I didn\'t give them opportunities.',
        pt: 'Isso me afetava porque eu ficava sobrecarregado e meus colegas não cresciam porque eu não dava oportunidades a eles.'
      },
      action: {
        es: 'Empecé a asignar tareas más chicas a juniors con checkpoints frecuentes. También aprendí que está bien si lo hacen "diferente" mientras el resultado sea correcto.',
        en: 'I started assigning smaller tasks to juniors with frequent checkpoints. I also learned that it\'s okay if they do it "differently" as long as the result is correct.',
        pt: 'Comecei a atribuir tarefas menores a juniors com checkpoints frequentes. Também aprendi que está ok se fizerem "diferente" desde que o resultado esteja correto.'
      },
      result: {
        es: 'En mi último equipo, logré que 2 juniors se volvieran independientes en 3 meses. Todavía me cuesta, pero mejoré mucho.',
        en: 'In my last team, I helped 2 juniors become independent in 3 months. I still struggle with it, but I\'ve improved a lot.',
        pt: 'Na minha última equipe, ajudei 2 juniors a se tornarem independentes em 3 meses. Ainda tenho dificuldade, mas melhorei muito.'
      }
    },
    redFlags: {
      es: [
        '❌ "Soy demasiado perfeccionista" - Cliché que no dice nada',
        '❌ Una debilidad que no es real',
        '❌ Una debilidad crítica para el rol (ej: "odio trabajar en equipo")',
        '❌ No tener plan para mejorar'
      ],
      en: [
        '❌ "I\'m too much of a perfectionist" - Cliché that says nothing',
        '❌ A weakness that isn\'t real',
        '❌ A weakness critical to the role (e.g., "I hate teamwork")',
        '❌ No plan to improve'
      ],
      pt: [
        '❌ "Sou muito perfeccionista" - Clichê que não diz nada',
        '❌ Uma fraqueza que não é real',
        '❌ Uma fraqueza crítica para o cargo (ex: "odeio trabalhar em equipe")',
        '❌ Sem plano para melhorar'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Cómo medís tu progreso en esa área?',
        '¿Alguien te dio feedback sobre esto?',
        '¿Cómo elegís qué tareas delegar?'
      ],
      en: [
        'How do you measure your progress in that area?',
        'Did anyone give you feedback on this?',
        'How do you choose which tasks to delegate?'
      ],
      pt: [
        'Como você mede seu progresso nessa área?',
        'Alguém te deu feedback sobre isso?',
        'Como você escolhe quais tarefas delegar?'
      ]
    },
    difficulty: 'tricky',
    estimatedXP: 150
  },

  {
    id: 'bq-tricky-2',
    category: 'conflict',
    question: {
      es: '¿Por qué querés dejar tu trabajo actual?',
      en: 'Why do you want to leave your current job?',
      pt: 'Por que você quer sair do seu trabalho atual?'
    },
    whyTheyAsk: {
      es: 'Quieren ver si vas a hablar mal de tu empleador actual (red flag) y si tus razones son válidas.',
      en: 'They want to see if you\'ll badmouth your current employer (red flag) and if your reasons are valid.',
      pt: 'Eles querem ver se você vai falar mal do seu empregador atual (red flag) e se suas razões são válidas.'
    },
    whatTheyLookFor: {
      es: [
        'Razones positivas (buscar crecimiento, nuevos desafíos)',
        'Sin hablar mal del empleador actual',
        'Que lo que buscás se alinea con el nuevo rol',
        'Honestidad sin drama'
      ],
      en: [
        'Positive reasons (seeking growth, new challenges)',
        'Without badmouthing current employer',
        'That what you seek aligns with the new role',
        'Honesty without drama'
      ],
      pt: [
        'Razões positivas (buscar crescimento, novos desafios)',
        'Sem falar mal do empregador atual',
        'Que o que você busca se alinha com o novo cargo',
        'Honestidade sem drama'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Estuve 3 años en mi empresa actual y crecí mucho. Llegué como Junior y ahora soy el DE más senior del equipo.',
        en: 'I\'ve been at my current company for 3 years and grew a lot. I started as Junior and now I\'m the most senior DE on the team.',
        pt: 'Estive 3 anos na minha empresa atual e cresci muito. Entrei como Junior e agora sou o DE mais senior do time.'
      },
      task: {
        es: 'El problema es que ya no tengo espacio para crecer. Somos una startup chica y no hay roles de Staff o Manager disponibles.',
        en: 'The problem is I no longer have room to grow. We\'re a small startup and there are no Staff or Manager roles available.',
        pt: 'O problema é que não tenho mais espaço para crescer. Somos uma startup pequena e não há cargos de Staff ou Manager disponíveis.'
      },
      action: {
        es: 'Busco un equipo más grande donde pueda aprender de otros seniors, trabajar con data a mayor escala, y eventualmente mentorear juniors.',
        en: 'I\'m looking for a larger team where I can learn from other seniors, work with data at a larger scale, and eventually mentor juniors.',
        pt: 'Busco um time maior onde possa aprender de outros seniors, trabalhar com dados em maior escala, e eventualmente mentorar juniors.'
      },
      result: {
        es: 'Por eso me interesa esta oportunidad: tienen un equipo de 15 DEs, trabajan con petabytes, y el rol incluye mentoría.',
        en: 'That\'s why I\'m interested in this opportunity: you have a team of 15 DEs, work with petabytes, and the role includes mentoring.',
        pt: 'Por isso me interessa esta oportunidade: vocês têm um time de 15 DEs, trabalham com petabytes, e o cargo inclui mentoria.'
      }
    },
    redFlags: {
      es: [
        '❌ "Mi jefe es un idiota" - Nunca hables mal',
        '❌ "Solo busco mejor salario" - Suena mercenario',
        '❌ Razones vagas como "busco un cambio"',
        '❌ Huir de problemas en vez de buscar oportunidades'
      ],
      en: [
        '❌ "My boss is an idiot" - Never badmouth',
        '❌ "I\'m just looking for better pay" - Sounds mercenary',
        '❌ Vague reasons like "looking for a change"',
        '❌ Running from problems instead of seeking opportunities'
      ],
      pt: [
        '❌ "Meu chefe é um idiota" - Nunca fale mal',
        '❌ "Só busco melhor salário" - Soa mercenário',
        '❌ Razões vagas como "busco uma mudança"',
        '❌ Fugir de problemas em vez de buscar oportunidades'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Hablaste con tu manager sobre crecimiento?',
        '¿Qué te gustaría que tuviera tu próximo rol que no tenés ahora?',
        '¿Consideraste otras opciones internas?'
      ],
      en: [
        'Did you talk to your manager about growth?',
        'What would you like your next role to have that you don\'t have now?',
        'Did you consider other internal options?'
      ],
      pt: [
        'Você conversou com seu gerente sobre crescimento?',
        'O que você gostaria que seu próximo cargo tivesse que você não tem agora?',
        'Você considerou outras opções internas?'
      ]
    },
    difficulty: 'tricky',
    estimatedXP: 150
  },

  // ============ SALARY NEGOTIATION ============
  {
    id: 'bq-salary-1',
    category: 'salary',
    question: {
      es: '¿Cuáles son tus expectativas salariales?',
      en: 'What are your salary expectations?',
      pt: 'Quais são suas expectativas salariais?'
    },
    whyTheyAsk: {
      es: 'Quieren saber si estás dentro de su presupuesto y cómo te valorás a vos mismo.',
      en: 'They want to know if you\'re within their budget and how you value yourself.',
      pt: 'Eles querem saber se você está dentro do orçamento e como você se valoriza.'
    },
    whatTheyLookFor: {
      es: [
        '✓ Que hayas investigado el mercado',
        '✓ Un rango en vez de un número fijo',
        '✓ Confianza sin arrogancia',
        '✓ Flexibilidad para negociar el paquete completo'
      ],
      en: [
        '✓ That you\'ve researched the market',
        '✓ A range instead of a fixed number',
        '✓ Confidence without arrogance',
        '✓ Flexibility to negotiate the complete package'
      ],
      pt: [
        '✓ Que você pesquisou o mercado',
        '✓ Uma faixa em vez de um número fixo',
        '✓ Confiança sem arrogância',
        '✓ Flexibilidade para negociar o pacote completo'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Basándome en mi investigación del mercado para roles de Data Engineer con mi experiencia...',
        en: 'Based on my market research for Data Engineer roles with my experience...',
        pt: 'Baseado na minha pesquisa de mercado para cargos de Data Engineer com minha experiência...'
      },
      task: {
        es: '...y considerando el scope de este rol que incluye liderazgo técnico y mentoring...',
        en: '...and considering the scope of this role that includes technical leadership and mentoring...',
        pt: '...e considerando o escopo deste cargo que inclui liderança técnica e mentoria...'
      },
      action: {
        es: '...mi expectativa está en el rango de $X a $Y USD anuales.',
        en: '...my expectation is in the range of $X to $Y USD annually.',
        pt: '...minha expectativa está na faixa de $X a $Y USD anuais.'
      },
      result: {
        es: 'Pero estoy abierto a discutir el paquete completo incluyendo equity, bonus, y beneficios.',
        en: 'But I\'m open to discussing the complete package including equity, bonus, and benefits.',
        pt: 'Mas estou aberto a discutir o pacote completo incluindo equity, bonus e benefícios.'
      }
    },
    redFlags: {
      es: [
        '❌ "No sé, ¿cuánto pagan?" - Parece no preparado',
        '❌ Dar un número muy bajo - Te desvalorizás',
        '❌ Dar un número muy alto sin justificar',
        '❌ "Necesito al menos X para pagar mis cuentas"'
      ],
      en: [
        '❌ "I don\'t know, how much do you pay?" - Seems unprepared',
        '❌ Giving a very low number - You undervalue yourself',
        '❌ Giving a very high number without justification',
        '❌ "I need at least X to pay my bills"'
      ],
      pt: [
        '❌ "Não sei, quanto vocês pagam?" - Parece despreparado',
        '❌ Dar um número muito baixo - Você se desvaloriza',
        '❌ Dar um número muito alto sem justificativa',
        '❌ "Preciso de pelo menos X para pagar minhas contas"'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Cómo llegaste a ese número?',
        '¿Qué pasa si no podemos llegar a ese rango?',
        '¿Cuál es tu salario actual?'
      ],
      en: [
        'How did you arrive at that number?',
        'What if we can\'t reach that range?',
        'What\'s your current salary?'
      ],
      pt: [
        'Como você chegou a esse número?',
        'E se não conseguirmos chegar a essa faixa?',
        'Qual é seu salário atual?'
      ]
    },
    difficulty: 'tricky',
    estimatedXP: 200
  },
  {
    id: 'bq-salary-2',
    category: 'salary',
    question: {
      es: '¿Cuál es tu salario actual?',
      en: 'What\'s your current salary?',
      pt: 'Qual é seu salário atual?'
    },
    whyTheyAsk: {
      es: 'Quieren anclar la negociación a tu salario actual. En muchos lugares es ilegal preguntar esto.',
      en: 'They want to anchor the negotiation to your current salary. In many places it\'s illegal to ask this.',
      pt: 'Eles querem ancorar a negociação ao seu salário atual. Em muitos lugares é ilegal perguntar isso.'
    },
    whatTheyLookFor: {
      es: [
        '✓ Que redirijas a tus expectativas',
        '✓ Profesionalismo al declinar',
        '✓ Enfoque en el valor que aportás'
      ],
      en: [
        '✓ That you redirect to your expectations',
        '✓ Professionalism when declining',
        '✓ Focus on the value you bring'
      ],
      pt: [
        '✓ Que você redirecione para suas expectativas',
        '✓ Profissionalismo ao declinar',
        '✓ Foco no valor que você traz'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Prefiero no compartir mi salario actual porque no refleja necesariamente mi valor de mercado.',
        en: 'I prefer not to share my current salary because it doesn\'t necessarily reflect my market value.',
        pt: 'Prefiro não compartilhar meu salário atual porque não reflete necessariamente meu valor de mercado.'
      },
      task: {
        es: 'Mi compensación actual incluye varios componentes que hacen difícil una comparación directa.',
        en: 'My current compensation includes various components that make a direct comparison difficult.',
        pt: 'Minha compensação atual inclui vários componentes que dificultam uma comparação direta.'
      },
      action: {
        es: 'Lo que puedo decirte es que basándome en mi investigación y el scope de este rol...',
        en: 'What I can tell you is that based on my research and the scope of this role...',
        pt: 'O que posso te dizer é que baseado na minha pesquisa e o escopo deste cargo...'
      },
      result: {
        es: '...mi expectativa para un movimiento que valga la pena está en el rango de $X a $Y.',
        en: '...my expectation for a worthwhile move is in the range of $X to $Y.',
        pt: '...minha expectativa para uma mudança que valha a pena está na faixa de $X a $Y.'
      }
    },
    redFlags: {
      es: [
        '❌ Dar el número sin pensar',
        '❌ Mentir sobre tu salario',
        '❌ Ser agresivo al declinar'
      ],
      en: [
        '❌ Giving the number without thinking',
        '❌ Lying about your salary',
        '❌ Being aggressive when declining'
      ],
      pt: [
        '❌ Dar o número sem pensar',
        '❌ Mentir sobre seu salário',
        '❌ Ser agressivo ao declinar'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Podés darme al menos un ballpark?',
        '¿Por qué no querés compartirlo?'
      ],
      en: [
        'Can you give me at least a ballpark?',
        'Why don\'t you want to share it?'
      ],
      pt: [
        'Pode me dar pelo menos uma estimativa?',
        'Por que não quer compartilhar?'
      ]
    },
    difficulty: 'tricky',
    estimatedXP: 200
  },
  {
    id: 'bq-salary-3',
    category: 'salary',
    question: {
      es: 'Tenemos una oferta de $X. ¿Qué te parece?',
      en: 'We have an offer of $X. What do you think?',
      pt: 'Temos uma oferta de $X. O que você acha?'
    },
    whyTheyAsk: {
      es: 'Quieren ver tu reacción y si vas a negociar. La primera oferta casi nunca es la final.',
      en: 'They want to see your reaction and if you\'ll negotiate. The first offer is almost never final.',
      pt: 'Eles querem ver sua reação e se você vai negociar. A primeira oferta quase nunca é a final.'
    },
    whatTheyLookFor: {
      es: [
        '✓ Que no aceptes inmediatamente',
        '✓ Que pidas tiempo para evaluar',
        '✓ Que negocies profesionalmente',
        '✓ Que consideres el paquete completo'
      ],
      en: [
        '✓ That you don\'t accept immediately',
        '✓ That you ask for time to evaluate',
        '✓ That you negotiate professionally',
        '✓ That you consider the complete package'
      ],
      pt: [
        '✓ Que você não aceite imediatamente',
        '✓ Que você peça tempo para avaliar',
        '✓ Que você negocie profissionalmente',
        '✓ Que você considere o pacote completo'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Gracias por la oferta. Estoy muy entusiasmado con la oportunidad de unirme al equipo.',
        en: 'Thank you for the offer. I\'m very excited about the opportunity to join the team.',
        pt: 'Obrigado pela oferta. Estou muito entusiasmado com a oportunidade de me juntar ao time.'
      },
      task: {
        es: 'Quisiera tomarme un par de días para evaluar el paquete completo.',
        en: 'I\'d like to take a couple of days to evaluate the complete package.',
        pt: 'Gostaria de levar alguns dias para avaliar o pacote completo.'
      },
      action: {
        es: 'Tengo algunas preguntas sobre [equity/bonus/beneficios]. ¿Hay flexibilidad en el base salary?',
        en: 'I have some questions about [equity/bonus/benefits]. Is there flexibility on the base salary?',
        pt: 'Tenho algumas perguntas sobre [equity/bonus/benefícios]. Há flexibilidade no salário base?'
      },
      result: {
        es: 'Basándome en mi investigación y el valor que puedo aportar, esperaba algo más cercano a $Y.',
        en: 'Based on my research and the value I can bring, I was expecting something closer to $Y.',
        pt: 'Baseado na minha pesquisa e o valor que posso trazer, esperava algo mais próximo de $Y.'
      }
    },
    redFlags: {
      es: [
        '❌ "¡Acepto!" - Nunca aceptes en el momento',
        '❌ "Es muy poco" - Suena ingrato',
        '❌ No hacer preguntas sobre el paquete',
        '❌ Amenazar con otras ofertas (a menos que sea verdad)'
      ],
      en: [
        '❌ "I accept!" - Never accept on the spot',
        '❌ "It\'s too low" - Sounds ungrateful',
        '❌ Not asking questions about the package',
        '❌ Threatening with other offers (unless it\'s true)'
      ],
      pt: [
        '❌ "Aceito!" - Nunca aceite na hora',
        '❌ "É muito pouco" - Soa ingrato',
        '❌ Não fazer perguntas sobre o pacote',
        '❌ Ameaçar com outras ofertas (a menos que seja verdade)'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Qué necesitarías para aceptar hoy?',
        '¿Tenés otras ofertas?',
        '¿Cuál es tu timeline de decisión?'
      ],
      en: [
        'What would you need to accept today?',
        'Do you have other offers?',
        'What\'s your decision timeline?'
      ],
      pt: [
        'O que você precisaria para aceitar hoje?',
        'Você tem outras ofertas?',
        'Qual é seu prazo de decisão?'
      ]
    },
    difficulty: 'senior',
    estimatedXP: 250
  },
  {
    id: 'bq-salary-4',
    category: 'salary',
    question: {
      es: 'Este es nuestro máximo. No podemos ir más arriba.',
      en: 'This is our maximum. We can\'t go higher.',
      pt: 'Este é nosso máximo. Não podemos ir mais alto.'
    },
    whyTheyAsk: {
      es: 'Puede ser verdad o puede ser una táctica. Querés ver si hay otras formas de mejorar el paquete.',
      en: 'It might be true or it might be a tactic. You want to see if there are other ways to improve the package.',
      pt: 'Pode ser verdade ou pode ser uma tática. Você quer ver se há outras formas de melhorar o pacote.'
    },
    whatTheyLookFor: {
      es: [
        '✓ Creatividad para negociar otros beneficios',
        '✓ Que no te rindas fácilmente',
        '✓ Profesionalismo al explorar opciones'
      ],
      en: [
        '✓ Creativity to negotiate other benefits',
        '✓ That you don\'t give up easily',
        '✓ Professionalism when exploring options'
      ],
      pt: [
        '✓ Criatividade para negociar outros benefícios',
        '✓ Que você não desista facilmente',
        '✓ Profissionalismo ao explorar opções'
      ]
    },
    exampleAnswer: {
      situation: {
        es: 'Entiendo las limitaciones presupuestarias.',
        en: 'I understand the budget constraints.',
        pt: 'Entendo as limitações orçamentárias.'
      },
      task: {
        es: 'Me gustaría explorar otras formas de cerrar la brecha.',
        en: 'I\'d like to explore other ways to close the gap.',
        pt: 'Gostaria de explorar outras formas de fechar a diferença.'
      },
      action: {
        es: '¿Hay flexibilidad en signing bonus, equity, días de vacaciones, trabajo remoto, o una revisión salarial garantizada en 6 meses?',
        en: 'Is there flexibility on signing bonus, equity, vacation days, remote work, or a guaranteed salary review in 6 months?',
        pt: 'Há flexibilidade em signing bonus, equity, dias de férias, trabalho remoto, ou uma revisão salarial garantida em 6 meses?'
      },
      result: {
        es: 'Cualquiera de estos me ayudaría a hacer que el paquete total funcione.',
        en: 'Any of these would help me make the total package work.',
        pt: 'Qualquer um desses me ajudaria a fazer o pacote total funcionar.'
      }
    },
    redFlags: {
      es: [
        '❌ Aceptar sin intentar nada más',
        '❌ Rechazar sin explorar alternativas',
        '❌ Ser agresivo o presionar demasiado'
      ],
      en: [
        '❌ Accepting without trying anything else',
        '❌ Rejecting without exploring alternatives',
        '❌ Being aggressive or pushing too hard'
      ],
      pt: [
        '❌ Aceitar sem tentar mais nada',
        '❌ Rejeitar sem explorar alternativas',
        '❌ Ser agressivo ou pressionar demais'
      ]
    },
    followUpQuestions: {
      es: [
        '¿Qué sería más importante para vos de esas opciones?',
        '¿Cuándo podrías empezar?'
      ],
      en: [
        'What would be most important to you from those options?',
        'When could you start?'
      ],
      pt: [
        'O que seria mais importante para você dessas opções?',
        'Quando você poderia começar?'
      ]
    },
    difficulty: 'senior',
    estimatedXP: 250
  }
];

// Helper functions
export const getBehavioralByCategory = (category: string): BehavioralQuestion[] => {
  return BEHAVIORAL_QUESTIONS.filter(q => q.category === category);
};

export const getBehavioralById = (id: string): BehavioralQuestion | undefined => {
  return BEHAVIORAL_QUESTIONS.find(q => q.id === id);
};

export const getRandomBehavioralQuestions = (count: number = 5): BehavioralQuestion[] => {
  const shuffled = [...BEHAVIORAL_QUESTIONS].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

export const BEHAVIORAL_STATS = {
  total: BEHAVIORAL_QUESTIONS.length,
  byCategory: BEHAVIORAL_CATEGORIES.map(cat => ({
    ...cat,
    count: BEHAVIORAL_QUESTIONS.filter(q => q.category === cat.id).length
  })),
  totalXP: BEHAVIORAL_QUESTIONS.reduce((sum, q) => sum + q.estimatedXP, 0)
};

