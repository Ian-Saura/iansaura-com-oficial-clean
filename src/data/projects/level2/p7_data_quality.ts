import { Project } from '../../../types/members';

export const p7_data_quality: Project = {
  id: 'p7-data-quality',
  level: 2,
  title: { es: 'Data Quality con Great Expectations', en: 'Data Quality with Great Expectations', pt: 'Data Quality com Great Expectations' },
  description: {
    es: 'Implementá validación automática de datos. El 80% de los problemas en pipelines son por datos sucios que no se detectaron a tiempo.',
    en: 'Implement automatic data validation. 80% of pipeline problems are due to dirty data not detected in time.',
    pt: 'Implemente validação automática de dados. 80% dos problemas em pipelines são por dados sujos que não foram detectados a tempo.'
  },
  difficulty: 'Avanzado',
  duration: '4-5 horas',
  skills: [{ es: 'Python' }, { es: 'Great Expectations' }, { es: 'Data Quality' }, { es: 'Testing' }],
  icon: '✅',
  color: 'emerald',
  datasetId: 'finanzas',
  prerequisites: ['p1-extra-python-cleaning', 'p6-airflow-orchestration'],
  estimatedLines: 100,
  realWorldExample: {
    es: 'Así valida Stripe sus datos de transacciones antes de procesarlos',
    en: 'This is how Stripe validates its transaction data before processing',
    pt: 'Assim a Stripe valida seus dados de transações antes de processá-los'
  },
  usedBy: ['Stripe', 'Instacart', 'GitHub', 'Compass'],
  learningObjectives: [
    { es: 'Entender dimensiones de Data Quality', en: 'Understand Data Quality dimensions', pt: 'Entender dimensões de Data Quality' },
    { es: 'Configurar Great Expectations', en: 'Configure Great Expectations', pt: 'Configurar Great Expectations' },
    { es: 'Definir expectations (reglas de validación)', en: 'Define expectations (validation rules)', pt: 'Definir expectations (regras de validação)' },
    { es: 'Generar Data Docs automáticos', en: 'Generate automatic Data Docs', pt: 'Gerar Data Docs automáticos' },
    { es: 'Integrar con pipelines', en: 'Integrate with pipelines', pt: 'Integrar com pipelines' },
  ],
  expectedOutputs: [
    {
      step: 5,
      description: { es: 'Validación exitosa', en: 'Successful validation', pt: 'Validação bem-sucedida' },
      example: `Validation Results
━━━━━━━━━━━━━━━━━━━
✓ expect_column_to_exist: amount
✓ expect_column_values_to_not_be_null: customer_id
✓ expect_column_values_to_be_between: amount [0, 100000]
✗ expect_column_values_to_be_unique: transaction_id
  Unexpected: 3 duplicates found

3/4 expectations passed (75%)`
    },
  ],
  interviewStory: {
    hook: { es: "Implementé validación de datos con Great Expectations que detectó un bug de $2M antes de que llegara a producción.", en: "Implemented data validation with Great Expectations that detected a $2M bug before it reached production.", pt: "Implementei validação de dados com Great Expectations que detectou um bug de $2M antes que chegasse em produção." },
    situation: { es: "Los pipelines no tenían validación. Datos corruptos llegaban al Data Warehouse y causaban reportes incorrectos. Una vez un bug de ETL duplicó transacciones y nadie lo notó por 2 semanas.", en: "Pipelines had no validation. Corrupt data reached Data Warehouse causing incorrect reports. Once an ETL bug duplicated transactions and no one noticed for 2 weeks.", pt: "Os pipelines não tinham validação. Dados corrompidos chegavam ao Data Warehouse e causavam relatórios incorretos. Uma vez um bug de ETL duplicou transações e ninguém notou por 2 semanas." },
    task: { es: "Implementar un framework de Data Quality que validara datos automáticamente y bloqueara datos corruptos.", en: "Implement a Data Quality framework that automatically validated data and blocked corrupt data.", pt: "Implementar um framework de Data Quality que validasse dados automaticamente e bloqueasse dados corrompidos." },
    actions: [
      { es: "Instalé y configuré Great Expectations como framework de validación", en: "Installed and configured Great Expectations as validation framework", pt: "Instalei e configurei Great Expectations como framework de validação" },
      { es: "Definí expectations para cada tabla: nulls, rangos, unicidad, relaciones", en: "Defined expectations for each table: nulls, ranges, uniqueness, relationships", pt: "Defini expectations para cada tabela: nulls, intervalos, unicidade, relacionamentos" },
      { es: "Integré validación en el pipeline de Airflow como paso obligatorio", en: "Integrated validation in Airflow pipeline as mandatory step", pt: "Integrei validação no pipeline do Airflow como passo obrigatório" },
      { es: "Configuré alertas a Slack cuando fallan validaciones", en: "Configured Slack alerts when validations fail", pt: "Configurei alertas no Slack quando falham validações" },
      { es: "Creé Data Docs para que el equipo vea el estado de calidad", en: "Created Data Docs for the team to see quality status", pt: "Criei Data Docs para que a equipe veja o estado de qualidade" }
    ],
    results: [
      { es: "Detectamos un bug que habría causado $2M en reportes incorrectos", en: "Detected a bug that would have caused $2M in incorrect reports", pt: "Detectamos um bug que teria causado $2M em relatórios incorretos" },
      { es: "Tiempo de detección de problemas: de 2 semanas a 5 minutos", en: "Problem detection time: from 2 weeks to 5 minutes", pt: "Tempo de detecção de problemas: de 2 semanas para 5 minutos" },
      { es: "100% de los datos en producción pasan validación", en: "100% of production data passes validation", pt: "100% dos dados em produção passam validação" },
      { es: "El equipo de negocio confía en los datos por primera vez", en: "Business team trusts data for the first time", pt: "A equipe de negócio confia nos dados pela primeira vez" }
    ],
    learnings: [
      { es: "Data Quality no es opcional - es tan importante como el código", en: "Data Quality is not optional - it's as important as code", pt: "Data Quality não é opcional - é tão importante quanto o código" },
      { es: "Las expectations deben venir del negocio, no solo de IT", en: "Expectations must come from business, not just IT", pt: "As expectations devem vir do negócio, não apenas de TI" },
      { es: "Bloquear datos malos es mejor que limpiarlos después", en: "Blocking bad data is better than cleaning it later", pt: "Bloquear dados ruins é melhor que limpá-los depois" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Qué expectations implementás siempre?", en: "What expectations do you always implement?", pt: "Quais expectations implementa sempre?" },
        answer: { es: "Mínimo: not_null en PKs, unique en PKs, rangos válidos para números, formatos para fechas. Luego agrego reglas de negocio específicas.", en: "Minimum: not_null on PKs, unique on PKs, valid ranges for numbers, formats for dates. Then I add specific business rules.", pt: "Mínimo: not_null em PKs, unique em PKs, intervalos válidos para números, formatos para datas. Depois adiciono regras de negócio específicas." }
      },
      {
        question: { es: "¿Qué pasa cuando falla una validación?", en: "What happens when a validation fails?", pt: "O que acontece quando falha uma validação?" },
        answer: { es: "Depende de la severidad. Críticas: bloquean el pipeline y alertan. Warnings: alertan pero continúan. Todo queda logueado para auditoría.", en: "Depends on severity. Critical: block pipeline and alert. Warnings: alert but continue. Everything is logged for audit.", pt: "Depende da severidade. Críticas: bloqueiam o pipeline e alertam. Warnings: alertam mas continuam. Tudo fica logado para auditoria." }
      },
      {
        question: { es: "¿Great Expectations vs dbt tests?", en: "Great Expectations vs dbt tests?", pt: "Great Expectations vs dbt tests?" },
        answer: { es: "Complementarios. dbt tests son más simples y corren dentro de dbt. GE es más poderoso para validaciones complejas, profiling, y documentación. Uso ambos.", en: "Complementary. dbt tests are simpler and run inside dbt. GE is more powerful for complex validations, profiling, and documentation. I use both.", pt: "Complementares. dbt tests são mais simples e rodam dentro do dbt. GE é mais poderoso para validações complexas, profiling e documentação. Uso ambos." }
      }
    ],
    closingStatement: { es: "Data Quality es el trabajo menos glamoroso pero el más importante - datos malos arruinan decisiones.", en: "Data Quality is the least glamorous job but the most important - bad data ruins decisions.", pt: "Data Quality é o trabalho menos glamoroso mas o mais importante - dados ruins arruínam decisões." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📦 Instalá Great Expectations', en: '📦 Install Great Expectations', pt: '📦 Instale Great Expectations' },
      code: `pip install great_expectations`,
      checkpoint: { es: '¿great_expectations --version funciona?', en: 'Does great_expectations --version work?', pt: 'great_expectations --version funciona?' }
    },
    { 
      order: 2, 
      text: { es: '🚀 Inicializá el proyecto', en: '🚀 Initialize project', pt: '🚀 Inicialize o projeto' },
      code: `great_expectations init

# Estructura creada:
# great_expectations/
# ├── expectations/
# ├── checkpoints/
# ├── plugins/
# └── great_expectations.yml`,
      explanation: { es: 'GE crea una estructura para organizar expectations, checkpoints y documentación.', en: 'GE creates a structure to organize expectations, checkpoints, and documentation.', pt: 'GE cria uma estrutura para organizar expectations, checkpoints e documentação.' }
    },
    { 
      order: 3, 
      text: { es: '📂 Configurá el datasource', en: '📂 Configure datasource', pt: '📂 Configure o datasource' },
      code: `great_expectations datasource new

# Elegir: Pandas
# Nombre: finanzas_data
# Path: data/`,
      explanation: { es: 'Un datasource es la conexión a tus datos (archivos, base de datos, etc.).', en: 'A datasource is the connection to your data (files, database, etc.).', pt: 'Um datasource é a conexão com seus dados (arquivos, banco de dados, etc.).' }
    },
    { 
      order: 4, 
      text: { es: '✅ Definí expectations', en: '✅ Define expectations', pt: '✅ Defina expectations' },
      code: `# En Python:
import great_expectations as gx

context = gx.get_context()

# Crear expectation suite
suite = context.add_expectation_suite("finanzas_suite")

# Agregar expectations
validator = context.get_validator(
    batch_request=batch_request,
    expectation_suite_name="finanzas_suite"
)

# Columna debe existir
validator.expect_column_to_exist("transaction_id")

# No nulos en campos críticos
validator.expect_column_values_to_not_be_null("transaction_id")
validator.expect_column_values_to_not_be_null("amount")

# Valores en rango
validator.expect_column_values_to_be_between(
    "amount", 
    min_value=0, 
    max_value=1000000
)

# Valores únicos (PK)
validator.expect_column_values_to_be_unique("transaction_id")

# Guardar
validator.save_expectation_suite()`,
      explanation: { es: 'Cada expectation es una regla de validación. Si falla, sabés que hay un problema de datos.', en: 'Each expectation is a validation rule. If it fails, you know there is a data problem.', pt: 'Cada expectation é uma regra de validação. Se falha, você sabe que há um problema de dados.' }
    },
    { 
      order: 5, 
      text: { es: '🔍 Corré validación', en: '🔍 Run validation', pt: '🔍 Rode validação' },
      code: `# Crear checkpoint
great_expectations checkpoint new finanzas_checkpoint

# Correr validación
great_expectations checkpoint run finanzas_checkpoint`,
      explanation: { es: 'Un checkpoint combina datos + expectations y corre la validación.', en: 'A checkpoint combines data + expectations and runs validation.', pt: 'Um checkpoint combina dados + expectations e roda a validação.' }
    },
    { 
      order: 6, 
      text: { es: '📊 Revisá Data Docs', en: '📊 Check Data Docs', pt: '📊 Revise Data Docs' },
      code: `# Generar documentación
great_expectations docs build

# Abrir en browser
# great_expectations/uncommitted/data_docs/local_site/index.html`,
      explanation: { es: 'Data Docs muestra resultados de validación con visualizaciones.', en: 'Data Docs shows validation results with visualizations.', pt: 'Data Docs mostra resultados de validação com visualizações.' },
      checkpoint: { es: '¿Podés ver los resultados en Data Docs?', en: 'Can you see results in Data Docs?', pt: 'Consegue ver os resultados em Data Docs?' }
    },
    { 
      order: 7, 
      text: { es: '🔗 Integrá con tu pipeline', en: '🔗 Integrate with your pipeline', pt: '🔗 Integre com seu pipeline' },
      code: `# En tu script ETL:
import great_expectations as gx

def validate_data(df):
    context = gx.get_context()
    
    result = context.run_checkpoint(
        checkpoint_name="finanzas_checkpoint",
        batch_request={
            "runtime_parameters": {"batch_data": df},
            "batch_identifiers": {"default_identifier_name": "runtime_batch"},
        }
    )
    
    if not result.success:
        raise ValueError("Data quality check failed!")
    
    return df`,
      explanation: { es: 'Integrá la validación en tu pipeline para que falle si los datos son malos.', en: 'Integrate validation in your pipeline so it fails if data is bad.', pt: 'Integre a validação no seu pipeline para que falhe se os dados são ruins.' }
    },
  ],
  deliverable: { es: 'Proyecto GE con expectations + screenshots de Data Docs', en: 'GE Project with expectations + Data Docs screenshots', pt: 'Projeto GE com expectations + screenshots de Data Docs' },
  evaluation: [
    { es: '¿Las expectations cubren casos críticos?', en: 'Do expectations cover critical cases?', pt: 'As expectations cobrem casos críticos?' },
    { es: '¿Generaste Data Docs?', en: 'Did you generate Data Docs?', pt: 'Gerou Data Docs?' },
    { es: '¿Integraste con un pipeline?', en: 'Did you integrate with a pipeline?', pt: 'Integrou com um pipeline?' },
  ],
  theory: { es: `## Dimensiones de Data Quality

| Dimensión | Pregunta | Ejemplo |
|-----------|----------|---------|
| Completeness | ¿Están todos los datos? | No hay nulos en campos críticos |
| Uniqueness | ¿Hay duplicados? | PKs son únicas |
| Validity | ¿Los valores son válidos? | Fechas en formato correcto |
| Accuracy | ¿Los datos son correctos? | Montos positivos |
| Consistency | ¿Los datos son coherentes? | Total = cantidad * precio |
| Timeliness | ¿Los datos están actualizados? | Datos de ayer disponibles hoy |`, en: `## Data Quality Dimensions

| Dimension | Question | Example |
|-----------|----------|---------|
| Completeness | Is all data present? | No nulls in critical fields |
| Uniqueness | Are there duplicates? | PKs are unique |
| Validity | Are values valid? | Dates in correct format |
| Accuracy | Is data correct? | Positive amounts |
| Consistency | Is data coherent? | Total = quantity * price |
| Timeliness | Is data up to date? | Yesterday's data available today |`, pt: `## Dimensões de Data Quality

| Dimensão | Pergunta | Exemplo |
|----------|----------|---------|
| Completeness | Estão todos os dados? | Não há nulos em campos críticos |
| Uniqueness | Há duplicados? | PKs são únicas |
| Validity | Os valores são válidos? | Datas em formato correto |
| Accuracy | Os dados estão corretos? | Montantes positivos |
| Consistency | Os dados são coerentes? | Total = quantidade * preço |
| Timeliness | Os dados estão atualizados? | Dados de ontem disponíveis hoje |` },
};


