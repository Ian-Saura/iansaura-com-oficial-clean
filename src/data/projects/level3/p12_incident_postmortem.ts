import { Project } from '../../../types/members';

export const p12IncidentPostmortem: Project = {
  id: 'p12-incident-postmortem',
  level: 3,
  title: {
    es: 'Postmortem de Incidente',
    pt: 'Postmortem de Incidente'
  },
  description: {
    es: 'Escribí un postmortem de un incidente real o simulado. Aprendé a manejar crisis sin culpar y a prevenir que vuelva a pasar.',
    pt: 'Escreva um postmortem de um incidente real ou simulado. Aprenda a lidar com crises sem culpar e a prevenir que voltem a acontecer.'
  },
  difficulty: 'Expert',
  duration: '3-4 horas',
  skills: [
    { es: 'Incident Management', pt: 'Gestão de Incidentes' },
    { es: 'Root Cause Analysis', pt: 'Análise de Causa Raiz' },
    { es: 'Comunicación', pt: 'Comunicação' },
    { es: 'Liderazgo', pt: 'Liderança' }
  ],
  icon: '🔥',
  color: 'orange',
  datasetId: 'logs',
  prerequisites: ['p11-code-review-guide'],
  estimatedLines: 0,
  realWorldExample: {
    es: 'Así documenta Google sus incidentes para aprender y mejorar',
    pt: 'Assim o Google documenta seus incidentes para aprender e melhorar'
  },
  usedBy: ['Google', 'Cloudflare', 'GitHub', 'PagerDuty'],
  learningObjectives: [
    { es: 'Documentar incidentes de forma estructurada', pt: 'Documentar incidentes de forma estruturada' },
    { es: 'Hacer root cause analysis (5 Whys)', pt: 'Fazer análise de causa raiz (5 Porquês)' },
    { es: 'Escribir action items accionables', pt: 'Escrever itens de ação acionáveis' },
    { es: 'Comunicar sin culpar (blameless)', pt: 'Comunicar sem culpar (blameless)' },
    { es: 'Prevenir incidentes futuros', pt: 'Prevenir incidentes futuros' },
  ],
  expectedOutputs: [
    {
      step: 3,
      description: { es: 'Análisis 5 Whys', pt: 'Análise 5 Porquês' },
      example: `❓ ¿Por qué falló el pipeline?
   → El job de Spark se quedó sin memoria

❓ ¿Por qué se quedó sin memoria?
   → El dataset creció 10x en una semana

❓ ¿Por qué no escaló automáticamente?
   → No tenía auto-scaling configurado

❓ ¿Por qué no estaba configurado?
   → No era parte del checklist de deploy

❓ ¿Por qué no estaba en el checklist?
   → ROOT CAUSE: No teníamos checklist`
    },
  ],
  interviewStory: {
    hook: {
      es: "Lideré la respuesta a un incidente que afectó $500K en revenue y creé el proceso de postmortems que previno 3 incidentes similares.",
      pt: "Liderei a resposta a um incidente que afetou $500K em receita e criei o processo de postmortems que preveniu 3 incidentes similares."
    },
    situation: {
      es: "Un pipeline crítico falló y nadie se dio cuenta por 6 horas. Los dashboards de ventas mostraron $0 y el equipo de finanzas entró en pánico.",
      pt: "Um pipeline crítico falhou e ninguém percebeu por 6 horas. Os dashboards de vendas mostraram $0 e a equipe de finanças entrou em pânico."
    },
    task: {
      es: "Resolver el incidente, documentarlo sin culpar a nadie, e implementar mejoras para que no vuelva a pasar.",
      pt: "Resolver o incidente, documentá-lo sem culpar ninguém, e implementar melhorias para que não volte a acontecer."
    },
    actions: [
      { es: "Coordiné la respuesta: identifiqué el problema, comuniqué a stakeholders, restauré servicio", pt: "Coordenei a resposta: identifiquei o problema, comuniquei aos stakeholders, restaurei o serviço" },
      { es: "Hice análisis de 5 Whys para llegar a la causa raíz (falta de alertas)", pt: "Fiz análise dos 5 Porquês para chegar à causa raiz (falta de alertas)" },
      { es: "Escribí postmortem blameless enfocado en sistemas, no personas", pt: "Escrevi postmortem blameless focado em sistemas, não pessoas" },
      { es: "Definí action items con owners y deadlines", pt: "Defini action items com owners e prazos" },
      { es: "Implementé alertas y runbooks para el futuro", pt: "Implementei alertas e runbooks para o futuro" }
    ],
    results: [
      { es: "Servicio restaurado en 2 horas (vs 6 horas de detección)", pt: "Serviço restaurado em 2 horas (vs 6 horas de detecção)" },
      { es: "3 incidentes similares prevenidos por las mejoras implementadas", pt: "3 incidentes similares prevenidos pelas melhorias implementadas" },
      { es: "Cultura de blameless postmortems establecida en el equipo", pt: "Cultura de postmortems blameless estabelecida na equipe" },
      { es: "Tiempo de detección de incidentes: de horas a minutos", pt: "Tempo de detecção de incidentes: de horas para minutos" }
    ],
    learnings: [
      { es: "Blameless no significa sin responsables - significa enfocarse en sistemas", pt: "Blameless não significa sem responsáveis - significa focar em sistemas" },
      { es: "Los action items sin owner y deadline no se hacen", pt: "Os action items sem owner e prazo não são feitos" },
      { es: "El incidente es una oportunidad de mejorar, no de culpar", pt: "O incidente é uma oportunidade de melhorar, não de culpar" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Qué es un postmortem blameless?", pt: "O que é um postmortem blameless?" },
        answer: { es: "Es analizar qué falló en el SISTEMA, no quién cometió el error. Si alguien pudo hacer un error, el sistema debería haberlo prevenido. Culpar no mejora nada.", pt: "É analisar o que falhou no SISTEMA, não quem cometeu o erro. Se alguém pôde cometer um erro, o sistema deveria tê-lo prevenido. Culpar não melhora nada." }
      },
      {
        question: { es: "¿Cómo priorizás los action items?", pt: "Como você prioriza os action items?" },
        answer: { es: "Por impacto y esfuerzo. Primero: alertas (alto impacto, bajo esfuerzo). Después: automatización. Último: refactors grandes. Cada item tiene owner y deadline.", pt: "Por impacto e esforço. Primeiro: alertas (alto impacto, baixo esforço). Depois: automação. Último: grandes refatorações. Cada item tem owner e prazo." }
      },
      {
        question: { es: "¿Cómo manejás la presión durante un incidente?", pt: "Como você lida com a pressão durante um incidente?" },
        answer: { es: "Roles claros: uno coordina, uno comunica, otros resuelven. Comunicación frecuente a stakeholders. No buscar culpables durante el incidente - eso viene después.", pt: "Papéis claros: um coordena, um comunica, outros resolvem. Comunicação frequente aos stakeholders. Não procurar culpados durante o incidente - isso vem depois." }
      }
    ],
    closingStatement: { es: "Los incidentes son inevitables - lo que importa es cómo respondemos y aprendemos de ellos.", pt: "Os incidentes são inevitáveis - o que importa é como respondemos e aprendemos com eles." }
  },
  steps: [
    {
      order: 1,
      text: { es: '🔥 Elegí o simulá un incidente', pt: '🔥 Escolha ou simule um incidente' },
      explanation: {
        es: `Opciones:
1. **Incidente real** de tu trabajo (anonimizado)
2. **Incidente simulado** usando el dataset de logs:
   - "El pipeline de analytics dejó de procesar datos por 4 horas"
   - "Los dashboards mostraron datos incorrectos por 2 días"
   - "El job de Spark falló y perdimos datos de un día"`,
        pt: `Opções:
1. **Incidente real** do seu trabalho (anonimizado)
2. **Incidente simulado** usando o dataset de logs:
   - "O pipeline de analytics parou de processar dados por 4 horas"
   - "Os dashboards mostraram dados incorretos por 2 dias"
   - "O job de Spark falhou e perdemos dados de um dia"`
      },
      checkpoint: { es: '¿Elegiste un incidente para documentar?', pt: 'Escolheu um incidente para documentar?' }
    },
    {
      order: 2,
      text: { es: '📋 Documentá qué pasó', pt: '📋 Documente o que aconteceu' },
      code: `# Postmortem: Pipeline de Analytics Caído

## Resumen
El pipeline de analytics dejó de procesar datos entre 2024-01-15 14:00 
y 2024-01-15 18:00 UTC, resultando en 4 horas de datos faltantes en 
los dashboards ejecutivos.

## Impacto
- **Duración**: 4 horas
- **Usuarios afectados**: ~50 analistas y ejecutivos
- **Datos perdidos**: Ninguno (se recuperaron con backfill)
- **Severidad**: Alta (dashboards ejecutivos afectados)

## Detección
- **Quién detectó**: Alerta de Datadog (lag > 1 hora)
- **Cuándo**: 2024-01-15 15:00 UTC (1 hora después del inicio)
- **Cómo**: Alerta automática + reporte de usuario`,
      explanation: { es: 'El resumen debe ser claro y cuantificar el impacto.', pt: 'O resumo deve ser claro e quantificar o impacto.' }
    },
    {
      order: 3,
      text: { es: '⏱️ Creá timeline detallado', pt: '⏱️ Crie timeline detalhada' },
      code: `## Timeline

| Hora (UTC) | Evento |
|------------|--------|
| 14:00 | Deploy de nueva versión del pipeline |
| 14:05 | Primeros errores en logs (no detectados) |
| 14:30 | Lag de Kafka empieza a crecer |
| 15:00 | Alerta de Datadog: "Kafka lag > 1 hora" |
| 15:05 | On-call (Ana) recibe alerta, empieza investigación |
| 15:20 | Ana identifica que el problema empezó después del deploy |
| 15:30 | Ana hace rollback a versión anterior |
| 15:45 | Pipeline vuelve a procesar, lag empieza a bajar |
| 17:00 | Lag vuelve a niveles normales |
| 18:00 | Backfill completado, datos recuperados |
| 18:30 | Incidente cerrado |`,
      explanation: { es: 'El timeline ayuda a entender la secuencia de eventos y tiempos de respuesta.', pt: 'A timeline ajuda a entender a sequência de eventos e tempos de resposta.' },
      tip: { es: 'Sé específico con las horas. "Alrededor de las 3" no sirve.', pt: 'Seja específico com as horas. "Por volta das 3" não serve.' }
    },
    {
      order: 4,
      text: { es: '🔍 Hacé root cause analysis', pt: '🔍 Faça análise de causa raiz' },
      code: `## Root Cause Analysis (5 Whys)

**Síntoma**: El pipeline dejó de procesar datos.

1. **¿Por qué?** El job de Spark falló con OutOfMemoryError.

2. **¿Por qué?** El nuevo código cargaba todo el dataset en memoria.

3. **¿Por qué?** El desarrollador usó .collect() en un DataFrame grande.

4. **¿Por qué?** No había tests que validaran el uso de memoria.

5. **¿Por qué?** No teníamos guías de performance para Spark.

**Root Cause**: Falta de guías de best practices para Spark y tests 
de performance en el pipeline de CI.`,
      explanation: { es: 'Los 5 Whys te llevan del síntoma a la causa raíz. Seguí preguntando hasta llegar.', pt: 'Os 5 Porquês te levam do sintoma à causa raiz. Continue perguntando até chegar.' },
      tip: { es: 'La causa raíz suele ser un problema de proceso o cultura, no técnico.', pt: 'A causa raiz costuma ser um problema de processo ou cultura, não técnico.' }
    },
    {
      order: 5,
      text: { es: '✅ Definí action items', pt: '✅ Defina action items' },
      code: `## Action Items

| # | Acción | Owner | Deadline | Status |
|---|--------|-------|----------|--------|
| 1 | Crear guía de best practices para Spark | @carlos | 2024-01-22 | Pendiente |
| 2 | Agregar tests de memoria al CI | @ana | 2024-01-25 | Pendiente |
| 3 | Reducir threshold de alerta de lag a 30 min | @ops | 2024-01-16 | Completado |
| 4 | Agregar alerta de errores en logs | @ana | 2024-01-20 | Pendiente |
| 5 | Hacer code review obligatorio para cambios en Spark | @carlos | 2024-01-17 | Completado |`,
      explanation: { es: 'Cada action item debe tener owner y deadline. Si no, no se hace.', pt: 'Cada action item deve ter owner e prazo. Se não, não é feito.' },
      warning: { es: 'No pongas más de 5-7 action items. Priorizá los más importantes.', pt: 'Não coloque mais de 5-7 action items. Priorize os mais importantes.' }
    },
    {
      order: 6,
      text: { es: '📚 Escribí lecciones aprendidas', pt: '📚 Escreva lições aprendidas' },
      code: `## Lecciones Aprendidas

### Qué funcionó bien
- La alerta de lag detectó el problema (aunque podría ser más rápida)
- El rollback fue rápido y efectivo
- El backfill recuperó todos los datos

### Qué podemos mejorar
- Detectar errores en logs antes de que causen lag
- Tener tests de performance en CI
- Documentar best practices de Spark

### Qué tuvimos suerte
- El incidente fue en horario laboral (no a las 3am)
- Los datos estaban en Kafka y se pudieron reprocesar
- No había reunión ejecutiva ese día`,
      explanation: { es: 'Las lecciones aprendidas son el valor real del postmortem.', pt: 'As lições aprendidas são o valor real do postmortem.' }
    },
  ],
  deliverable: { es: 'Documento de postmortem completo', pt: 'Documento de postmortem completo' },
  evaluation: [
    { es: '¿El timeline es claro y específico?', pt: 'A timeline é clara e específica?' },
    { es: '¿Llegaste al root cause real (no síntomas)?', pt: 'Chegou à causa raiz real (não sintomas)?' },
    { es: '¿Los action items son accionables (owner + deadline)?', pt: 'Os action items são acionáveis (owner + prazo)?' },
    { es: '¿Es blameless (sin culpar a personas)?', pt: 'É blameless (sem culpar pessoas)?' },
    { es: '¿Las lecciones son útiles para prevenir futuros incidentes?', pt: 'As lições são úteis para prevenir futuros incidentes?' },
  ],
  theory: {
    es: `## Cultura Blameless

Un postmortem blameless:
- Se enfoca en el sistema, no en las personas
- Asume que todos actuaron con buena intención
- Busca mejorar procesos, no castigar

**Malo**: "Juan rompió producción"
**Bueno**: "El proceso de deploy no tenía validación suficiente"

## Estructura de Postmortem

1. **Resumen**: Qué pasó, cuánto duró, impacto
2. **Timeline**: Secuencia de eventos con horas
3. **Root Cause**: 5 Whys hasta la causa raíz
4. **Action Items**: Qué vamos a hacer (owner + deadline)
5. **Lecciones**: Qué aprendimos

## Tipos de Action Items

| Tipo | Ejemplo | Prioridad |
|------|---------|-----------|
| Prevención | Tests de performance | Alta |
| Detección | Mejores alertas | Alta |
| Mitigación | Runbooks más claros | Media |
| Proceso | Code review obligatorio | Media |`,
    pt: `## Cultura Blameless

Um postmortem blameless:
- Foca no sistema, não nas pessoas
- Assume que todos agiram com boa intenção
- Busca melhorar processos, não punir

**Ruim**: "João quebrou a produção"
**Bom**: "O processo de deploy não tinha validação suficiente"

## Estrutura de Postmortem

1. **Resumo**: O que aconteceu, quanto durou, impacto
2. **Timeline**: Sequência de eventos com horas
3. **Root Cause**: 5 Porquês até a causa raiz
4. **Action Items**: O que vamos fazer (owner + prazo)
5. **Lições**: O que aprendemos

## Tipos de Action Items

| Tipo | Exemplo | Prioridade |
|------|---------|-----------|
| Prevenção | Testes de performance | Alta |
| Detecção | Melhores alertas | Alta |
| Mitigação | Runbooks mais claros | Média |
| Processo | Code review obrigatório | Média |`
  },
};


