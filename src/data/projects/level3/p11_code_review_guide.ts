import { Project } from '../../../types/members';

export const p11CodeReviewGuide: Project = {
  id: 'p11-code-review-guide',
  level: 3,
  title: {
    es: 'Guía de Code Review para Data Engineering',
    pt: 'Guia de Code Review para Data Engineering'
  },
  description: {
    es: 'Creá estándares de code review para tu equipo. Tus reviews deben agregar valor real y ayudar a otros a crecer.',
    pt: 'Crie padrões de code review para sua equipe. Seus reviews devem agregar valor real e ajudar os outros a crescer.'
  },
  difficulty: 'Expert',
  duration: '3-4 horas',
  skills: [
    { es: 'Code Review', pt: 'Revisão de Código' },
    { es: 'Best Practices', pt: 'Melhores Práticas' },
    { es: 'Comunicación', pt: 'Comunicação' },
    { es: 'Liderazgo', pt: 'Liderança' },
    { es: 'Mentoring', pt: 'Mentoria' }
  ],
  icon: '👀',
  color: 'blue',
  prerequisites: ['p10-mentoring-doc'],
  estimatedLines: 0,
  realWorldExample: {
    es: 'Así hace code review el equipo de Data Platform de Google',
    pt: 'Assim faz code review a equipe de Data Platform do Google'
  },
  usedBy: ['Google', 'Microsoft', 'Meta', 'Amazon'],
  learningObjectives: [
    { es: 'Identificar qué buscar en PRs de data', pt: 'Identificar o que procurar em PRs de data' },
    { es: 'Dar feedback constructivo', pt: 'Dar feedback construtivo' },
    { es: 'Balancear velocidad con calidad', pt: 'Balancear velocidade com qualidade' },
    { es: 'Mentorear a través de reviews', pt: 'Mentorear através de reviews' },
    { es: 'Establecer estándares de equipo', pt: 'Estabelecer padrões de equipe' },
  ],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Ejemplo de review constructivo', pt: 'Exemplo de review construtivo' },
      example: `❌ "Esto está mal"

✅ "Consideraste usar COALESCE aquí? 
   El campo puede ser NULL y causaría 
   un error en el JOIN downstream.
   
   Sugerencia:
   COALESCE(user_id, 'unknown') as user_id"`
    },
  ],
  interviewStory: {
    hook: {
      es: "Establecí estándares de code review que redujeron bugs en producción 60% y aceleraron el onboarding de juniors.",
      pt: "Estabeleci padrões de code review que reduziram bugs em produção em 60% e aceleraram o onboarding de juniores."
    },
    situation: {
      es: "Los code reviews eran inconsistentes - algunos PRs pasaban sin revisión, otros tardaban días. No había estándares claros de qué buscar.",
      pt: "Os code reviews eram inconsistentes - alguns PRs passavam sem revisão, outros demoravam dias. Não havia padrões claros do que procurar."
    },
    task: {
      es: "Crear una guía de code review específica para Data Engineering que el equipo pudiera seguir.",
      pt: "Criar um guia de code review específico para Data Engineering que a equipe pudesse seguir."
    },
    actions: [
      { es: "Documenté los errores más comunes que habíamos visto en producción", pt: "Documentei os erros mais comuns que tínhamos visto em produção" },
      { es: "Creé checklists específicos para SQL, Python, y configuración", pt: "Criei checklists específicos para SQL, Python, e configuração" },
      { es: "Establecí SLAs: reviews en <24h, PRs pequeños (<400 líneas)", pt: "Estabeleci SLAs: reviews em <24h, PRs pequenos (<400 linhas)" },
      { es: "Implementé pair programming para PRs complejos", pt: "Implementei pair programming para PRs complexos" },
      { es: "Entrené al equipo en cómo dar feedback constructivo", pt: "Treinei a equipe em como dar feedback construtivo" }
    ],
    results: [
      { es: "Bugs en producción: -60% en 6 meses", pt: "Bugs em produção: -60% em 6 meses" },
      { es: "Tiempo de review: de 3 días a <24 horas", pt: "Tempo de review: de 3 dias para <24 horas" },
      { es: "Juniors contribuyendo código de calidad en 2 semanas", pt: "Juniores contribuindo código de qualidade em 2 semanas" },
      { es: "Cultura de feedback positivo establecida", pt: "Cultura de feedback positivo estabelecida" }
    ],
    learnings: [
      { es: "El tono del feedback importa tanto como el contenido", pt: "O tom do feedback importa tanto quanto o conteúdo" },
      { es: "Los checklists automatizan lo obvio y dejan tiempo para lo importante", pt: "Os checklists automatizam o óbvio e deixam tempo para o importante" },
      { es: "Code review es mentoring - una oportunidad de enseñar", pt: "Code review é mentoria - uma oportunidade de ensinar" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Qué buscás primero en un PR de data?", pt: "O que você procura primeiro em um PR de data?" },
        answer: { es: "1) ¿Es idempotente? 2) ¿Maneja errores? 3) ¿Tiene tests? 4) ¿Está documentado el 'por qué'? Después miro performance y estilo.", pt: "1) É idempotente? 2) Trata erros? 3) Tem testes? 4) Está documentado o 'por que'? Depois olho performance e estilo." }
      },
      {
        question: { es: "¿Cómo das feedback negativo?", pt: "Como você dá feedback negativo?" },
        answer: { es: "Nunca 'esto está mal'. Siempre pregunto: '¿Consideraste X?' o sugiero: 'Podrías usar Y porque Z'. El objetivo es enseñar, no criticar.", pt: "Nunca 'isso está errado'. Sempre pergunto: 'Considerou X?' ou sugiro: 'Poderia usar Y porque Z'. O objetivo é ensinar, não criticar." }
      },
      {
        question: { es: "¿Cómo manejás PRs muy grandes?", pt: "Como você lida com PRs muito grandes?" },
        answer: { es: "Pido que lo dividan. Un PR de 1000 líneas es imposible de revisar bien. Regla: si no puedo revisarlo en 30 minutos, es muy grande.", pt: "Peço que dividam. Um PR de 1000 linhas é impossível de revisar bem. Regra: se não consigo revisar em 30 minutos, é muito grande." }
      }
    ],
    closingStatement: { es: "Code review bien hecho multiplica la calidad del equipo entero.", pt: "Code review bem feito multiplica a qualidade de toda a equipe." }
  },
  steps: [
    {
      order: 1,
      text: { es: '📋 Listá errores comunes en PRs de data', pt: '📋 Liste erros comuns em PRs de data' },
      explanation: {
        es: `Basándote en tu experiencia, listá los errores más comunes:

**SQL:**
- SELECT * en producción
- JOINs sin índices
- No manejar NULLs
- Queries sin LIMIT en desarrollo

**Python:**
- No manejar excepciones
- Hardcodear credenciales
- No loguear errores
- Código no idempotente

**Pipelines:**
- No configurar retries
- No validar datos de entrada
- No particionar output
- No documentar dependencias`,
        pt: `Baseando-se na sua experiência, liste os erros mais comuns:

**SQL:**
- SELECT * em produção
- JOINs sem índices
- Não tratar NULLs
- Queries sem LIMIT em desenvolvimento

**Python:**
- Não tratar exceções
- Hardcodar credenciais
- Não logar erros
- Código não idempotente

**Pipelines:**
- Não configurar retries
- Não validar dados de entrada
- Não particionar output
- Não documentar dependências`
      },
      checkpoint: { es: '¿Listaste al menos 10 errores comunes?', pt: 'Listou pelo menos 10 erros comuns?' }
    },
    {
      order: 2,
      text: { es: '✅ Definí checklist de aprobación', pt: '✅ Defina checklist de aprovação' },
      code: `# Checklist de Code Review - Data Engineering

## Antes de aprobar, verificar:

### Código
- [ ] El código es legible y tiene comentarios donde hace falta
- [ ] No hay código duplicado (DRY)
- [ ] Los nombres de variables/funciones son descriptivos
- [ ] No hay secrets hardcodeados

### SQL
- [ ] Queries tienen alias claros
- [ ] JOINs usan columnas indexadas
- [ ] Maneja NULLs explícitamente
- [ ] No usa SELECT * en producción

### Pipelines
- [ ] Es idempotente (correr 2 veces = mismo resultado)
- [ ] Tiene retries configurados
- [ ] Valida datos de entrada
- [ ] Loguea inicio, fin, y errores

### Testing
- [ ] Tiene tests para casos críticos
- [ ] Tests pasan en CI

### Documentación
- [ ] README actualizado si cambia comportamiento
- [ ] Docstrings en funciones públicas`,
      explanation: { es: 'Un checklist hace el review consistente y evita olvidar cosas.', pt: 'Um checklist torna o review consistente e evita esquecer coisas.' }
    },
    {
      order: 3,
      text: { es: '💬 Escribí ejemplos de feedback', pt: '💬 Escreva exemplos de feedback' },
      code: `# Cómo dar feedback constructivo

## ❌ Malo (destructivo)
"Este código es horrible, no entiendo qué hace"
"Esto está mal"
"No hagas esto"

## ✅ Bueno (constructivo)

### Sugerencia
"¿Qué te parece si extraemos esta lógica a una función? 
Sería más fácil de testear y reusar."

### Pregunta
"¿Consideraste qué pasa si la API devuelve un error 500?
Podríamos agregar un retry con backoff."

### Explicación
"Este JOIN puede ser lento porque 'user_id' no tiene índice.
Podríamos agregar uno o usar una subquery.
Más info: [link a documentación]"

### Elogio
"Me gusta cómo manejaste los edge cases acá.
El logging es muy claro."`,
      explanation: { es: 'El tono importa. Feedback constructivo ayuda a crecer, destructivo desmotiva.', pt: 'O tom importa. Feedback construtivo ajuda a crescer, destrutivo desmotiva.' },
      tip: { es: 'Usá "¿Qué te parece si...?" en vez de "Deberías..."', pt: 'Use "Que tal se...?" em vez de "Você deveria..."' }
    },
    {
      order: 4,
      text: { es: '👍👎 Incluí ejemplos de código', pt: '👍👎 Inclua exemplos de código' },
      code: `# Ejemplos: Bueno vs Malo

## Manejo de errores

### ❌ Malo
\`\`\`python
def fetch_data(url):
    response = requests.get(url)
    return response.json()
\`\`\`

### ✅ Bueno
\`\`\`python
def fetch_data(url: str, max_retries: int = 3) -> dict:
    """Fetches data from URL with retries."""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            return response.json()
        except requests.RequestException as e:
            logger.warning(f"Attempt {attempt + 1} failed: {e}")
            if attempt == max_retries - 1:
                raise
            time.sleep(2 ** attempt)
\`\`\`

## SQL Queries

### ❌ Malo
\`\`\`sql
select * from orders o, customers c 
where o.customer_id = c.id
\`\`\`

### ✅ Bueno
\`\`\`sql
SELECT 
    o.order_id,
    o.order_date,
    o.total_amount,
    c.customer_name,
    c.email
FROM orders o
INNER JOIN customers c ON o.customer_id = c.customer_id
WHERE o.order_date >= CURRENT_DATE - INTERVAL '30 days'
\`\`\``,
      explanation: { es: 'Ejemplos concretos son más útiles que reglas abstractas.', pt: 'Exemplos concretos são mais úteis que regras abstratas.' }
    },
    {
      order: 5,
      text: { es: '📝 Creá checklist para reviewers', pt: '📝 Crie checklist para revisores' },
      code: `# Guía para Reviewers

## Antes de empezar
1. Leé la descripción del PR completa
2. Entendé el contexto: ¿qué problema resuelve?
3. Mirá los tests primero (te dicen qué debería hacer)

## Durante el review
1. Empezá por la arquitectura general
2. Después mirá los detalles
3. Priorizá: bugs > performance > estilo

## Tipos de comentarios
- **Blocker**: Debe arreglarse antes de merge
- **Suggestion**: Mejoraría pero no es crítico
- **Question**: Necesito entender mejor
- **Praise**: Algo que está muy bien

## Cuándo aprobar
- No hay blockers
- Tests pasan
- Documentación actualizada

## Cuándo pedir cambios
- Hay bugs obvios
- Falta manejo de errores crítico
- No hay tests para funcionalidad nueva`,
      explanation: { es: 'Un checklist hace el review consistente y evita olvidar cosas.', pt: 'Um checklist torna o review consistente e evita esquecer coisas.' },
      checkpoint: { es: '¿Tu guía es clara y accionable?', pt: 'Seu guia é claro e acionável?' }
    },
    {
      order: 6,
      text: { es: '🤝 Compartí con tu equipo', pt: '🤝 Compartilhe com sua equipe' },
      explanation: {
        es: `1. Compartí la guía con tu equipo
2. Pedí feedback: ¿falta algo? ¿algo no es práctico?
3. Iterá basándote en el feedback
4. Proponé adoptarla como estándar

Si no tenés equipo, compartila en LinkedIn o con la comunidad.`,
        pt: `1. Compartilhe o guia com sua equipe
2. Peça feedback: falta algo? algo não é prático?
3. Itere com base no feedback
4. Proponha adotá-la como padrão

Se não tiver equipe, compartilhe no LinkedIn ou com a comunidade.`
      },
      checkpoint: { es: '¿Recibiste feedback de al menos 2 personas?', pt: 'Recebeu feedback de pelo menos 2 pessoas?' }
    },
  ],
  deliverable: { es: 'Documento de estándares + checklist + ejemplos', pt: 'Documento de padrões + checklist + exemplos' },
  evaluation: [
    { es: '¿Es práctico y aplicable?', pt: 'É prático e aplicável?' },
    { es: '¿Los ejemplos son claros?', pt: 'Os exemplos são claros?' },
    { es: '¿El feedback es constructivo?', pt: 'O feedback é construtivo?' },
    { es: '¿Tu equipo lo adoptó (o lo adoptarían)?', pt: 'Sua equipe adotou (ou adotaria)?' },
  ],
  theory: {
    es: `## Principios de Code Review

### 1. Sé amable
El código no es la persona. Criticá el código, no al autor.

### 2. Sé específico
"Esto está mal" no ayuda. "Este JOIN puede ser lento porque..." sí.

### 3. Sé educativo
Explicá el "por qué". Links a documentación ayudan.

### 4. Sé pragmático
No todo tiene que ser perfecto. Priorizá lo importante.

### 5. Sé rápido
Reviews que tardan días bloquean al equipo. Respondé en <24h.

## Qué buscar en PRs de Data

| Categoría | Qué revisar |
|-----------|-------------|
| Correctitud | ¿Hace lo que debería? |
| Performance | ¿Es eficiente a escala? |
| Mantenibilidad | ¿Otro puede entenderlo? |
| Testing | ¿Tiene tests suficientes? |
| Seguridad | ¿Maneja secrets bien? |`,
    pt: `## Princípios de Code Review

### 1. Seja gentil
O código não é a pessoa. Critique o código, não o autor.

### 2. Seja específico
"Isso está errado" não ajuda. "Este JOIN pode ser lento porque..." sim.

### 3. Seja educativo
Explique o "por que". Links para documentação ajudam.

### 4. Seja pragmático
Nem tudo tem que ser perfeito. Priorize o importante.

### 5. Seja rápido
Reviews que demoram dias bloqueiam a equipe. Responda em <24h.

## O que procurar em PRs de Data

| Categoria | O que revisar |
|-----------|-------------|
| Correção | Faz o que deveria? |
| Performance | É eficiente em escala? |
| Manutenibilidade | Outro consegue entender? |
| Testes | Tem testes suficientes? |
| Segurança | Lida bem com segredos? |`
  },
};


