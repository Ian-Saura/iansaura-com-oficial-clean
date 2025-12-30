import { Project } from '../../../types/members';

export const p10MentoringDoc: Project = {
  id: 'p10-mentoring-doc',
  level: 3,
  title: {
    es: 'Documentación para Onboarding',
    pt: 'Documentação para Onboarding'
  },
  description: {
    es: 'Creá la documentación que te hubiera gustado tener cuando empezaste. Un Senior ayuda a otros a crecer más rápido.',
    pt: 'Crie a documentação que você gostaria de ter tido quando começou. Um Sênior ajuda os outros a crescerem mais rápido.'
  },
  difficulty: 'Expert',
  duration: '4-6 horas',
  skills: [
    { es: 'Documentación', pt: 'Documentação' },
    { es: 'Comunicación', pt: 'Comunicação' },
    { es: 'Liderazgo', pt: 'Liderança' },
    { es: 'Mentoring', pt: 'Mentoria' },
    { es: 'Technical Writing', pt: 'Escrita Técnica' }
  ],
  icon: '📚',
  color: 'emerald',
  prerequisites: ['p9-system-design'],
  estimatedLines: 0,
  realWorldExample: {
    es: 'Así documenta Stripe sus sistemas para que nuevos ingenieros sean productivos en 2 semanas',
    pt: 'Assim a Stripe documenta seus sistemas para que novos engenheiros sejam produtivos em 2 semanas'
  },
  usedBy: ['Stripe', 'GitLab', 'Notion', 'Figma'],
  learningObjectives: [
    { es: 'Escribir documentación clara y accionable', pt: 'Escrever documentação clara e acionável' },
    { es: 'Estructurar información para diferentes audiencias', pt: 'Estruturar informação para diferentes audiências' },
    { es: 'Incluir diagramas que expliquen flujos', pt: 'Incluir diagramas que expliquem fluxos' },
    { es: 'Crear troubleshooting guides', pt: 'Criar guias de solução de problemas' },
    { es: 'Iterar basándote en feedback', pt: 'Iterar com base em feedback' },
  ],
  expectedOutputs: [
    {
      step: 3,
      description: { es: 'Estructura de documentación', pt: 'Estrutura de documentação' },
      example: `docs/
├── README.md (overview)
├── architecture/
│   ├── overview.md
│   └── diagrams/
├── getting-started/
│   ├── setup.md
│   └── first-pipeline.md
├── runbooks/
│   ├── incident-response.md
│   └── common-issues.md
└── api/
    └── reference.md`
    },
  ],
  commonMistakes: [
    { mistake: { es: 'Asumir conocimiento previo', pt: 'Assumir conhecimento prévio' }, why: { es: 'Dificulta el onboarding de juniors', pt: 'Dificulta o onboarding de juniores' }, solution: { es: 'Explicar todo desde cero o linkear a recursos', pt: 'Explicar tudo do zero ou linkar recursos' } },
    { mistake: { es: 'Documentar solo el "qué" y no el "por qué"', pt: 'Documentar apenas o "o que" e não o "por que"' }, why: { es: 'El contexto es clave para entender decisiones', pt: 'O contexto é chave para entender decisões' }, solution: { es: 'Incluir sección de Decisiones de Diseño', pt: 'Incluir seção de Decisões de Design' } },
    { mistake: { es: 'No actualizar la documentación', pt: 'Não atualizar a documentação' }, why: { es: 'Documentación obsoleta es peor que no tener', pt: 'Documentação obsoleta é pior que não ter' }, solution: { es: 'Actualizar docs con cada PR', pt: 'Atualizar docs com cada PR' } },
    { mistake: { es: 'Demasiado texto, pocos diagramas', pt: 'Muito texto, poucos diagramas' }, why: { es: 'Una imagen vale más que mil palabras', pt: 'Uma imagem vale mais que mil palavras' }, solution: { es: 'Usar diagramas para explicar flujos', pt: 'Usar diagramas para explicar fluxos' } },
  ],
  interviewStory: {
    hook: {
      es: "Creé documentación de onboarding que redujo el tiempo de productividad de nuevos ingenieros de 4 semanas a 5 días.",
      pt: "Criei documentação de onboarding que reduziu o tempo de produtividade de novos engenheiros de 4 semanas para 5 dias."
    },
    situation: {
      es: "Cada nuevo ingeniero tardaba un mes en ser productivo. No había documentación, todo era conocimiento tribal. Cuando alguien se iba, se perdía conocimiento crítico.",
      pt: "Cada novo engenheiro demorava um mês para ser produtivo. Não havia documentação, tudo era conhecimento tribal. Quando alguém saía, perdia-se conhecimento crítico."
    },
    task: {
      es: "Crear documentación completa que permitiera a cualquier ingeniero entender y operar nuestros sistemas.",
      pt: "Criar documentação completa que permitisse a qualquer engenheiro entender e operar nossos sistemas."
    },
    actions: [
      { es: "Entrevisté a ingenieros nuevos y seniors para entender qué faltaba", pt: "Entrevistei engenheiros novos e seniores para entender o que faltava" },
      { es: "Creé architecture docs con diagramas y decisiones de diseño", pt: "Criei docs de arquitetura com diagramas e decisões de design" },
      { es: "Escribí runbooks para operaciones comunes y troubleshooting", pt: "Escrevi runbooks para operações comuns e solução de problemas" },
      { es: "Implementé docs-as-code: markdown en el repo, review en PRs", pt: "Implementei docs-as-code: markdown no repo, review em PRs" },
      { es: "Establecí proceso de actualización: cada cambio incluye update de docs", pt: "Estabeleci processo de atualização: cada mudança inclui update de docs" }
    ],
    results: [
      { es: "Onboarding: de 4 semanas a 5 días para ser productivo", pt: "Onboarding: de 4 semanas para 5 dias para ser produtivo" },
      { es: "Incidentes resueltos 3x más rápido con runbooks", pt: "Incidentes resolvidos 3x mais rápido com runbooks" },
      { es: "Conocimiento documentado: ya no dependemos de 'preguntarle a Juan'", pt: "Conhecimento documentado: já não dependemos de 'perguntar ao João'" },
      { es: "La documentación se mantiene actualizada por proceso", pt: "A documentação se mantém atualizada por processo" }
    ],
    learnings: [
      { es: "La documentación es un producto - necesita mantenimiento continuo", pt: "A documentação é um produto - precisa de manutenção contínua" },
      { es: "Los diagramas valen más que mil palabras - invertí tiempo en hacerlos bien", pt: "Os diagramas valem mais que mil palavras - investi tempo em fazê-los bem" },
      { es: "Documentar el 'por qué' es más importante que el 'qué'", pt: "Documentar o 'por que' é mais importante que o 'o que'" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo mantenés la documentación actualizada?", pt: "Como você mantém a documentação atualizada?" },
        answer: { es: "Docs-as-code: vive en el mismo repo que el código. Cada PR que cambia comportamiento debe incluir update de docs. Lo revisamos en code review.", pt: "Docs-as-code: vive no mesmo repo que o código. Cada PR que muda comportamento deve incluir update de docs. Revisamos no code review." }
      },
      {
        question: { es: "¿Qué documentás primero?", pt: "O que você documenta primeiro?" },
        answer: { es: "1) Cómo levantar el ambiente local, 2) Arquitectura high-level, 3) Runbooks para incidentes comunes. Con eso un nuevo dev puede empezar a contribuir.", pt: "1) Como levantar o ambiente local, 2) Arquitetura high-level, 3) Runbooks para incidentes comuns. Com isso um novo dev pode começar a contribuir." }
      },
      {
        question: { es: "¿Cómo manejás documentación técnica vs no-técnica?", pt: "Como você lida com documentação técnica vs não-técnica?" },
        answer: { es: "Audiencias diferentes, docs diferentes. README para devs, Confluence/Notion para producto y ops. Nunca mezclo - confunde a todos.", pt: "Audiências diferentes, docs diferentes. README para devs, Confluence/Notion para produto e ops. Nunca misturo - confunde a todos." }
      }
    ],
    closingStatement: { es: "Un Senior no solo escribe código - crea sistemas que otros pueden entender y mantener.", pt: "Um Sênior não apenas escreve código - cria sistemas que outros podem entender e manter." }
  },
  steps: [
    {
      order: 1,
      text: { es: '🎯 Elegí un sistema para documentar', pt: '🎯 Escolha um sistema para documentar' },
      explanation: {
        es: `Elegí un proyecto o sistema que conozcas bien:
- Un pipeline que construiste
- Un sistema de tu trabajo
- El proyecto integrador del nivel 2

El sistema debe ser lo suficientemente complejo para necesitar documentación.`,
        pt: `Escolha um projeto ou sistema que você conheça bem:
- Um pipeline que você construiu
- Um sistema do seu trabalho
- O projeto integrador do nível 2

O sistema deve ser suficientemente complexo para precisar de documentação.`
      },
      checkpoint: { es: '¿Elegiste un sistema que conocés bien?', pt: 'Escolheu um sistema que você conhece bem?' }
    },
    {
      order: 2,
      text: { es: '🏗️ Escribí la guía de arquitectura', pt: '🏗️ Escreva o guia de arquitetura' },
      code: `# Arquitectura del Sistema X

## Resumen
[1-2 párrafos explicando qué hace el sistema y por qué existe]

## Diagrama de Arquitectura
[Diagrama mostrando componentes y flujo de datos]

## Componentes

### 1. Ingesta (Kafka)
- **Qué hace**: Recibe eventos de la API
- **Por qué Kafka**: Buffer ante picos, replay si falla
- **Configuración clave**: 3 particiones, 7 días retención

### 2. Procesamiento (Spark)
- **Qué hace**: Limpia y agrega datos
- **Por qué Spark**: Volumen de datos (10GB/día)
- **Jobs principales**: daily_aggregation, hourly_metrics

### 3. Storage (S3 + Snowflake)
[...]

## Decisiones de Diseño

### ¿Por qué Kafka en vez de SQS?
Necesitábamos replay y múltiples consumidores. SQS no soporta replay.

### ¿Por qué Snowflake en vez de Redshift?
Separación de compute y storage. Más fácil de escalar.`,
      explanation: { es: 'La guía de arquitectura explica el "qué" y el "por qué" de cada decisión.', pt: 'O guia de arquitetura explica o "o que" e o "por que" de cada decisão.' },
      tip: { es: 'Incluí las decisiones que tomaste y por qué. Eso ayuda a entender el contexto.', pt: 'Inclua as decisões que você tomou e por quê. Isso ajuda a entender o contexto.' }
    },
    {
      order: 3,
      text: { es: '💻 Escribí la guía de setup local', pt: '💻 Escreva o guia de setup local' },
      code: `# Setup Local

## Prerequisitos
- Docker Desktop instalado
- Python 3.10+
- AWS CLI configurado (perfil: dev)

## Paso 1: Clonar el repo
\`\`\`bash
git clone https://github.com/empresa/sistema-x.git
cd sistema-x
\`\`\`

## Paso 2: Configurar variables de entorno
\`\`\`bash
cp .env.example .env
# Editar .env con tus credenciales
\`\`\`

## Paso 3: Levantar servicios
\`\`\`bash
docker-compose up -d
# Esperar ~2 minutos a que todo esté listo
\`\`\`

## Paso 4: Verificar que funciona
\`\`\`bash
# Debería devolver "OK"
curl http://localhost:8080/health
\`\`\`

## Problemas comunes

### "Port 8080 already in use"
\`\`\`bash
# Ver qué usa el puerto
lsof -i :8080
# Matar el proceso o cambiar el puerto en docker-compose.yml
\`\`\`

### "Cannot connect to Kafka"
Esperá 30 segundos más. Kafka tarda en iniciar.`,
      explanation: { es: 'La guía de setup debe ser paso a paso, sin asumir conocimiento previo.', pt: 'O guia de setup deve ser passo a passo, sem assumir conhecimento prévio.' },
      checkpoint: { es: '¿Un junior puede seguir tu guía sin preguntarte nada?', pt: 'Um júnior consegue seguir seu guia sem te perguntar nada?' }
    },
    {
      order: 4,
      text: { es: '🔧 Escribí troubleshooting guide', pt: '🔧 Escreva guia de solução de problemas' },
      code: `# Troubleshooting

## El pipeline no corre

### Síntoma
El DAG de Airflow está en rojo, la task "extract" falla.

### Diagnóstico
1. Ver logs de la task en Airflow UI
2. Buscar el error específico

### Causas comunes

#### "Connection refused to API"
- **Causa**: La API externa está caída
- **Solución**: Verificar status de la API, esperar y reintentar
- **Prevención**: Agregar health check antes de correr

#### "Out of memory"
- **Causa**: Dataset más grande de lo esperado
- **Solución**: Aumentar memoria del worker o procesar en batches
- **Prevención**: Monitorear tamaño de datos

## Los datos no llegan a Snowflake

### Síntoma
Las tablas en Snowflake no se actualizan.

### Diagnóstico
1. Verificar que el job de Spark corrió
2. Ver logs en CloudWatch
3. Verificar permisos de IAM

[...]`,
      explanation: { es: 'El troubleshooting guide es lo más valioso. Ahorra horas de debugging.', pt: 'O guia de solução de problemas é o mais valioso. Economiza horas de debugging.' },
      tip: { es: 'Documentá cada problema que resolviste. Eventualmente tendrás una guía completa.', pt: 'Documente cada problema que você resolveu. Eventualmente terá um guia completo.' }
    },
    {
      order: 5,
      text: { es: '📊 Agregá diagramas', pt: '📊 Adicione diagramas' },
      explanation: {
        es: `Creá diagramas para:
1. **Arquitectura general**: Componentes y conexiones
2. **Flujo de datos**: Cómo fluyen los datos paso a paso
3. **Modelo de datos**: Tablas y relaciones
4. **Deployment**: Cómo se despliega en producción

Usá herramientas como:
- draw.io (gratis, colaborativo)
- Excalidraw (estilo sketch)
- Mermaid (diagramas como código)`,
        pt: `Crie diagramas para:
1. **Arquitetura geral**: Componentes e conexões
2. **Fluxo de dados**: Como os dados fluem passo a passo
3. **Modelo de dados**: Tabelas e relações
4. **Deployment**: Como é implantado em produção

Use ferramentas como:
- draw.io (grátis, colaborativo)
- Excalidraw (estilo sketch)
- Mermaid (diagramas como código)`
      },
      checkpoint: { es: '¿Tus diagramas son claros sin leer el texto?', pt: 'Seus diagramas são claros sem ler o texto?' }
    },
    {
      order: 6,
      text: { es: '📝 Incluí ejemplos de código', pt: '📝 Inclua exemplos de código' },
      code: `# Ejemplos de Uso

## Agregar una nueva métrica

### 1. Definir la métrica en config
\`\`\`python
# config/metrics.py
METRICS = {
    "daily_revenue": {
        "query": "SELECT SUM(amount) FROM orders WHERE date = :date",
        "schedule": "daily",
        "alert_threshold": 1000
    },
    # Agregar tu métrica aquí
    "new_metric": {
        "query": "...",
        "schedule": "hourly",
        "alert_threshold": 100
    }
}
\`\`\`

### 2. Testear localmente
\`\`\`bash
python -m pytest tests/test_metrics.py -k "test_new_metric"
\`\`\`

### 3. Deployar
\`\`\`bash
git push origin main
# El CI/CD despliega automáticamente
\`\`\``,
      explanation: { es: 'Los ejemplos de código concretos son más útiles que explicaciones abstractas.', pt: 'Exemplos de código concretos são mais úteis que explicações abstratas.' }
    },
    {
      order: 7,
      text: { es: '🔍 Pedí feedback a un junior', pt: '🔍 Peça feedback a um júnior' },
      explanation: {
        es: `Encontrá a alguien junior y pedile que:
1. Lea la documentación
2. Intente hacer el setup local
3. Anote todas las preguntas que tenga

Las preguntas que tenga son gaps en tu documentación.`,
        pt: `Encontre alguém júnior e peça que:
1. Leia a documentação
2. Tente fazer o setup local
3. Anote todas as perguntas que tiver

As perguntas que tiver são lacunas na sua documentação.`
      },
      checkpoint: { es: '¿Recibiste feedback de al menos una persona?', pt: 'Recebeu feedback de pelo menos uma pessoa?' }
    },
    {
      order: 8,
      text: { es: '✏️ Iterá basándote en feedback', pt: '✏️ Itere com base em feedback' },
      explanation: {
        es: `Incorporá el feedback:
- Agregá las respuestas a las preguntas
- Clarificá los pasos confusos
- Agregá más ejemplos donde hizo falta

La documentación nunca está "terminada". Siempre se puede mejorar.`,
        pt: `Incorpore o feedback:
- Adicione as respostas às perguntas
- Clarifique os passos confusos
- Adicione mais exemplos onde fez falta

A documentação nunca está "terminada". Sempre pode melhorar.`
      },
      checkpoint: { es: '¿Actualizaste la documentación con el feedback?', pt: 'Atualizou a documentação com o feedback?' }
    },
  ],
  deliverable: { es: 'Documentación completa en Markdown o Notion', pt: 'Documentação completa em Markdown ou Notion' },
  evaluation: [
    { es: '¿Un junior puede entenderlo sin preguntarte?', pt: 'Um júnior consegue entender sem te perguntar?' },
    { es: '¿Los diagramas son claros y actualizados?', pt: 'Os diagramas são claros e atualizados?' },
    { es: '¿Cubriste los errores más comunes?', pt: 'Cobriu os erros mais comuns?' },
    { es: '¿Incorporaste feedback real?', pt: 'Incorporou feedback real?' },
    { es: '¿Explica el "por qué" además del "qué"?', pt: 'Explica o "por que" além do "o que"?' },
  ],
  theory: {
    es: `## Principios de Buena Documentación

### 1. Audiencia primero
- ¿Quién va a leer esto?
- ¿Qué necesitan saber?
- ¿Qué conocimiento previo tienen?

### 2. Estructura clara
- Resumen al principio
- Tabla de contenidos
- Secciones lógicas
- Links entre secciones

### 3. Ejemplos concretos
- Código que funciona
- Screenshots actualizados
- Comandos copy-paste

### 4. Mantenimiento
- Fecha de última actualización
- Owner de la documentación
- Proceso para actualizar

## Tipos de Documentación

| Tipo | Audiencia | Contenido |
|------|-----------|-----------|
| README | Todos | Qué es, cómo empezar |
| Architecture | Seniors | Diseño, decisiones |
| Runbook | Ops | Cómo operar, troubleshoot |
| Tutorial | Juniors | Paso a paso |`,
    pt: `## Princípios de Boa Documentação

### 1. Audiência primeiro
- Quem vai ler isso?
- O que precisam saber?
- Que conhecimento prévio têm?

### 2. Estrutura clara
- Resumo no início
- Tabela de conteúdos
- Seções lógicas
- Links entre seções

### 3. Exemplos concretos
- Código que funciona
- Screenshots atualizados
- Comandos copy-paste

### 4. Manutenção
- Data da última atualização
- Owner da documentação
- Processo para atualizar

## Tipos de Documentação

| Tipo | Audiência | Conteúdo |
|------|-----------|-----------|
| README | Todos | O que é, como começar |
| Architecture | Seniores | Design, decisões |
| Runbook | Ops | Como operar, troubleshoot |
| Tutorial | Juniores | Passo a passo |`
  },
};


