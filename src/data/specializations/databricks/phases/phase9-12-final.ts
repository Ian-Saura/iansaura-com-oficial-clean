/**
 * FASES 9-12: SQL Warehouse, MLflow, Best Practices, Certificación
 * 33 pasos finales para completar la especialización
 * 
 * ACTUALIZADO: Enero 2026 - Notas sobre Free Edition:
 * - SQL Warehouse usa serverless automáticamente en Free Edition
 * - MLflow está disponible en Free Edition
 * - AI/BI Dashboards (nuevos) reemplazan los legacy dashboards
 * - Databricks Academy tiene cursos gratuitos para certificación
 */

import { DatabricksPhase, DatabricksStep } from '../types';

// Helper para crear steps compactos
const createStep = (id: string, titleEs: string, titleEn: string, titlePt: string, descEs: string, descEn: string, descPt: string, theoryEs: string, theoryEn: string, theoryPt: string, tip: {es: string, en: string, pt: string}, checkEs: string, checkEn: string, checkPt: string, xp: number, mins: number): DatabricksStep => ({
  id, title: {es: titleEs, en: titleEn, pt: titlePt}, description: {es: descEs, en: descEn, pt: descPt}, theory: {es: theoryEs, en: theoryEn, pt: theoryPt},
  practicalTips: [tip], externalLinks: [], checkpoint: {es: checkEs, en: checkEn, pt: checkPt}, xpReward: xp, estimatedMinutes: mins
});

export const PHASE_9_SQL_WAREHOUSE: DatabricksPhase = {
  id: 'db-phase-9', number: 9,
  title: { es: 'SQL Warehouse & BI', en: 'SQL Warehouse & BI', pt: 'SQL Warehouse & BI' },
  subtitle: { es: 'Analytics y visualización', en: 'Analytics and visualization', pt: 'Analytics e visualização' },
  description: { es: 'SQL Warehouses permiten ejecutar SQL a escala y conectar herramientas de BI. En Free Edition, usas serverless compute automáticamente para tus queries SQL. Los nuevos AI/BI Dashboards (2026) reemplazan los dashboards legacy.', en: 'SQL Warehouses allow running SQL at scale and connecting BI tools. In Free Edition, you use serverless compute automatically for your SQL queries. New AI/BI Dashboards (2026) replace legacy dashboards.', pt: 'SQL Warehouses permitem executar SQL em escala e conectar ferramentas de BI. No Free Edition, você usa serverless compute automaticamente para suas queries SQL. Os novos AI/BI Dashboards (2026) substituem os dashboards legacy.' },
  icon: '📈', color: 'indigo', estimatedDays: '3-4 días',
  steps: [
    createStep('db-9-1', '¿Qué es SQL Warehouse?', 'What is SQL Warehouse?', 'O que é SQL Warehouse?',
      'Compute optimizado para SQL analytics.', 'Compute optimized for SQL analytics.', 'Compute otimizado para SQL analytics.',
      `## SQL Warehouse\n\nSQL Warehouses son clusters optimizados para:\n- Queries SQL ad-hoc\n- Dashboards y reportes\n- Conexión con BI tools (Tableau, Power BI)\n\n### Tipos:\n- **Serverless**: Auto-escala, pago por uso\n- **Pro**: Balance costo/performance\n- **Classic**: Más control, menos costo\n\n### Crear:\nSQL > SQL Warehouses > Create`,
      `## SQL Warehouse\n\nSQL Warehouses are clusters optimized for:\n- Ad-hoc SQL queries\n- Dashboards and reports\n- BI tool connections (Tableau, Power BI)\n\n### Types:\n- **Serverless**: Auto-scales, pay per use\n- **Pro**: Cost/performance balance\n- **Classic**: More control, less cost\n\n### Create:\nSQL > SQL Warehouses > Create`,
      `## SQL Warehouse\n\nSQL Warehouses são clusters otimizados para:\n- Queries SQL ad-hoc\n- Dashboards e relatórios\n- Conexão com BI tools (Tableau, Power BI)\n\n### Tipos:\n- **Serverless**: Auto-escala, pague pelo uso\n- **Pro**: Balanço custo/performance\n- **Classic**: Mais controle, menos custo\n\n### Criar:\nSQL > SQL Warehouses > Create`,
      {es: '💡 Serverless es ideal para cargas variables.', en: '💡 Serverless is ideal for variable workloads.', pt: '💡 Serverless é ideal para cargas variáveis.'},
      '🤔 ¿Cuándo usar Serverless vs Pro?', '🤔 When to use Serverless vs Pro?', '🤔 Quando usar Serverless vs Pro?', 20, 15),
    createStep('db-9-2', 'Databricks SQL Editor', 'Databricks SQL Editor', 'Databricks SQL Editor',
      'Escribí y ejecutá queries directamente en el browser.', 'Write and run queries directly in the browser.', 'Escreva e execute queries diretamente no browser.',
      `## SQL Editor\n\n\`\`\`sql\n-- Query básica\nSELECT * FROM catalog.schema.tabla LIMIT 100;\n\n-- Con parámetros\nSELECT * FROM ventas WHERE fecha = :fecha_param;\n\n-- CTE\nWITH ventas_mes AS (\n  SELECT * FROM ventas WHERE month(fecha) = 1\n)\nSELECT categoria, SUM(monto) FROM ventas_mes GROUP BY 1;\n\`\`\`\n\n### Features:\n- Autocompletado inteligente\n- Historial de queries\n- Guardar queries como snippets`,
      `## SQL Editor\n\n\`\`\`sql\n-- Basic query\nSELECT * FROM catalog.schema.table LIMIT 100;\n\n-- With parameters\nSELECT * FROM sales WHERE date = :date_param;\n\n-- CTE\nWITH month_sales AS (\n  SELECT * FROM sales WHERE month(date) = 1\n)\nSELECT category, SUM(amount) FROM month_sales GROUP BY 1;\n\`\`\`\n\n### Features:\n- Smart autocomplete\n- Query history\n- Save queries as snippets`,
      `## SQL Editor\n\n\`\`\`sql\n-- Query básica\nSELECT * FROM catalog.schema.tabela LIMIT 100;\n\n-- Com parâmetros\nSELECT * FROM vendas WHERE data = :data_param;\n\n-- CTE\nWITH vendas_mes AS (\n  SELECT * FROM vendas WHERE month(data) = 1\n)\nSELECT categoria, SUM(valor) FROM vendas_mes GROUP BY 1;\n\`\`\`\n\n### Features:\n- Autocomplete inteligente\n- Histórico de queries\n- Salvar queries como snippets`,
      {es: '⌨️ Ctrl+Enter ejecuta la query seleccionada.', en: '⌨️ Ctrl+Enter runs the selected query.', pt: '⌨️ Ctrl+Enter executa a query selecionada.'},
      '✅ ¿Ejecutaste una query con parámetros?', '✅ Did you run a query with parameters?', '✅ Você executou uma query com parâmetros?', 20, 15),
    createStep('db-9-3', 'Dashboards Nativos', 'Native Dashboards', 'Dashboards Nativos',
      'Creá dashboards interactivos sin código.', 'Create interactive dashboards without code.', 'Crie dashboards interativos sem código.',
      `## Dashboards\n\n### Crear Dashboard:\n1. SQL > Dashboards > Create\n2. Add visualization\n3. Conectar query guardada\n4. Configurar refresh\n\n### Tipos de visualización:\n- Line/Bar/Pie charts\n- Tables\n- Counters\n- Maps\n- Pivot tables\n\n### Refresh automático:\n- Schedule: cada X minutos\n- Trigger: cuando cambian datos`,
      `## Dashboards\n\n### Create Dashboard:\n1. SQL > Dashboards > Create\n2. Add visualization\n3. Connect saved query\n4. Configure refresh\n\n### Visualization types:\n- Line/Bar/Pie charts\n- Tables\n- Counters\n- Maps\n- Pivot tables\n\n### Auto refresh:\n- Schedule: every X minutes\n- Trigger: when data changes`,
      `## Dashboards\n\n### Criar Dashboard:\n1. SQL > Dashboards > Create\n2. Add visualization\n3. Conectar query salva\n4. Configurar refresh\n\n### Tipos de visualização:\n- Line/Bar/Pie charts\n- Tables\n- Counters\n- Maps\n- Pivot tables\n\n### Refresh automático:\n- Schedule: cada X minutos\n- Trigger: quando dados mudam`,
      {es: '📊 Los dashboards son perfectos para stakeholders no técnicos.', en: '📊 Dashboards are perfect for non-technical stakeholders.', pt: '📊 Dashboards são perfeitos para stakeholders não técnicos.'},
      '✅ ¿Creaste un dashboard con 3+ visualizaciones?', '✅ Did you create a dashboard with 3+ visualizations?', '✅ Você criou um dashboard com 3+ visualizações?', 30, 25),
    createStep('db-9-4', 'Alerts SQL', 'SQL Alerts', 'Alertas SQL',
      'Recibí notificaciones cuando tus métricas cambian.', 'Get notifications when your metrics change.', 'Receba notificações quando suas métricas mudam.',
      `## SQL Alerts\n\n### Crear Alert:\n1. Guardar query que retorna valor numérico\n2. SQL > Alerts > Create\n3. Configurar condición: > < = !=\n4. Configurar destino: email, Slack\n5. Schedule de evaluación\n\n### Ejemplo query para alert:\n\`\`\`sql\nSELECT COUNT(*) as errores\nFROM logs\nWHERE level = 'ERROR'\n  AND timestamp > current_timestamp() - INTERVAL 1 HOUR\n\`\`\`\n\n### Condición: errores > 100`,
      `## SQL Alerts\n\n### Create Alert:\n1. Save query that returns numeric value\n2. SQL > Alerts > Create\n3. Configure condition: > < = !=\n4. Configure destination: email, Slack\n5. Evaluation schedule\n\n### Example alert query:\n\`\`\`sql\nSELECT COUNT(*) as errors\nFROM logs\nWHERE level = 'ERROR'\n  AND timestamp > current_timestamp() - INTERVAL 1 HOUR\n\`\`\`\n\n### Condition: errors > 100`,
      `## SQL Alerts\n\n### Criar Alert:\n1. Salvar query que retorna valor numérico\n2. SQL > Alerts > Create\n3. Configurar condição: > < = !=\n4. Configurar destino: email, Slack\n5. Schedule de avaliação\n\n### Exemplo query para alert:\n\`\`\`sql\nSELECT COUNT(*) as erros\nFROM logs\nWHERE level = 'ERROR'\n  AND timestamp > current_timestamp() - INTERVAL 1 HOUR\n\`\`\`\n\n### Condição: erros > 100`,
      {es: '🚨 Alerts son clave para monitoreo proactivo.', en: '🚨 Alerts are key for proactive monitoring.', pt: '🚨 Alerts são chave para monitoramento proativo.'},
      '✅ ¿Configuraste un alert?', '✅ Did you configure an alert?', '✅ Você configurou um alert?', 25, 20),
    createStep('db-9-5', 'Conectar BI Tools', 'Connect BI Tools', 'Conectar BI Tools',
      'Tableau, Power BI, Looker se conectan fácilmente.', 'Tableau, Power BI, Looker connect easily.', 'Tableau, Power BI, Looker se conectam facilmente.',
      `## Conexión BI\n\n### Drivers:\n- ODBC/JDBC disponibles\n- Partner Connect para setup rápido\n\n### Tableau:\n1. Server: tu-workspace.cloud.databricks.com\n2. HTTP Path: del SQL Warehouse\n3. Auth: Token personal\n\n### Power BI:\n1. Get Data > Azure Databricks\n2. Ingresar Server/Path\n3. DirectQuery o Import\n\n### Connection string:\n\`\`\`\njdbc:databricks://HOST:443/default;transportMode=http;ssl=1;httpPath=PATH;AuthMech=3;UID=token;PWD=TOKEN\n\`\`\``,
      `## BI Connection\n\n### Drivers:\n- ODBC/JDBC available\n- Partner Connect for quick setup\n\n### Tableau:\n1. Server: your-workspace.cloud.databricks.com\n2. HTTP Path: from SQL Warehouse\n3. Auth: Personal token\n\n### Power BI:\n1. Get Data > Azure Databricks\n2. Enter Server/Path\n3. DirectQuery or Import\n\n### Connection string:\n\`\`\`\njdbc:databricks://HOST:443/default;transportMode=http;ssl=1;httpPath=PATH;AuthMech=3;UID=token;PWD=TOKEN\n\`\`\``,
      `## Conexão BI\n\n### Drivers:\n- ODBC/JDBC disponíveis\n- Partner Connect para setup rápido\n\n### Tableau:\n1. Server: seu-workspace.cloud.databricks.com\n2. HTTP Path: do SQL Warehouse\n3. Auth: Token pessoal\n\n### Power BI:\n1. Get Data > Azure Databricks\n2. Inserir Server/Path\n3. DirectQuery ou Import\n\n### Connection string:\n\`\`\`\njdbc:databricks://HOST:443/default;transportMode=http;ssl=1;httpPath=PATH;AuthMech=3;UID=token;PWD=TOKEN\n\`\`\``,
      {es: '💡 Partner Connect automatiza la configuración de muchas herramientas.', en: '💡 Partner Connect automates configuration for many tools.', pt: '💡 Partner Connect automatiza a configuração de muitas ferramentas.'},
      '✅ ¿Conectaste alguna herramienta BI?', '✅ Did you connect any BI tool?', '✅ Você conectou alguma ferramenta BI?', 30, 30),
    createStep('db-9-6', 'Query Federation', 'Query Federation', 'Query Federation',
      'Consultá datos en sistemas externos desde Databricks.', 'Query data in external systems from Databricks.', 'Consulte dados em sistemas externos do Databricks.',
      `## Lakehouse Federation\n\n### Crear External Catalog:\n\`\`\`sql\nCREATE FOREIGN CATALOG mysql_catalog\nUSING CONNECTION mysql_conn;\n\`\`\`\n\n### Query federada:\n\`\`\`sql\nSELECT * FROM mysql_catalog.db.tabla\nJOIN delta_catalog.schema.tabla ON ...\n\`\`\`\n\n### Sistemas soportados:\n- MySQL, PostgreSQL\n- SQL Server\n- Snowflake\n- BigQuery`,
      `## Lakehouse Federation\n\n### Create External Catalog:\n\`\`\`sql\nCREATE FOREIGN CATALOG mysql_catalog\nUSING CONNECTION mysql_conn;\n\`\`\`\n\n### Federated query:\n\`\`\`sql\nSELECT * FROM mysql_catalog.db.table\nJOIN delta_catalog.schema.table ON ...\n\`\`\`\n\n### Supported systems:\n- MySQL, PostgreSQL\n- SQL Server\n- Snowflake\n- BigQuery`,
      `## Lakehouse Federation\n\n### Criar External Catalog:\n\`\`\`sql\nCREATE FOREIGN CATALOG mysql_catalog\nUSING CONNECTION mysql_conn;\n\`\`\`\n\n### Query federada:\n\`\`\`sql\nSELECT * FROM mysql_catalog.db.tabela\nJOIN delta_catalog.schema.tabela ON ...\n\`\`\`\n\n### Sistemas suportados:\n- MySQL, PostgreSQL\n- SQL Server\n- Snowflake\n- BigQuery`,
      {es: '🌐 Federation evita mover datos innecesariamente.', en: '🌐 Federation avoids moving data unnecessarily.', pt: '🌐 Federation evita mover dados desnecessariamente.'},
      '🤔 ¿Cuándo usarías Federation vs ETL?', '🤔 When would you use Federation vs ETL?', '🤔 Quando você usaria Federation vs ETL?', 25, 20),
    createStep('db-9-7', 'Query Optimization', 'Query Optimization', 'Otimização de Queries',
      'Optimizá tus queries SQL para máxima performance.', 'Optimize your SQL queries for maximum performance.', 'Otimize suas queries SQL para performance máxima.',
      `## Optimización SQL\n\n### Query Profile:\n- Click en query > Query Profile\n- Ver tiempo por operación\n- Identificar scans grandes\n\n### Tips:\n\`\`\`sql\n-- Usar partition pruning\nWHERE fecha = '2024-01-01'  -- Si particionado por fecha\n\n-- Evitar SELECT *\nSELECT col1, col2 FROM tabla\n\n-- Usar LIMIT en exploración\nSELECT * FROM tabla LIMIT 100\n\n-- Z-ORDER para filtros frecuentes\nOPTIMIZE tabla ZORDER BY (columna_filtro)\n\`\`\``,
      `## SQL Optimization\n\n### Query Profile:\n- Click query > Query Profile\n- View time per operation\n- Identify large scans\n\n### Tips:\n\`\`\`sql\n-- Use partition pruning\nWHERE date = '2024-01-01'  -- If partitioned by date\n\n-- Avoid SELECT *\nSELECT col1, col2 FROM table\n\n-- Use LIMIT in exploration\nSELECT * FROM table LIMIT 100\n\n-- Z-ORDER for frequent filters\nOPTIMIZE table ZORDER BY (filter_column)\n\`\`\``,
      `## Otimização SQL\n\n### Query Profile:\n- Click na query > Query Profile\n- Ver tempo por operação\n- Identificar scans grandes\n\n### Dicas:\n\`\`\`sql\n-- Usar partition pruning\nWHERE data = '2024-01-01'  -- Se particionado por data\n\n-- Evitar SELECT *\nSELECT col1, col2 FROM tabela\n\n-- Usar LIMIT em exploração\nSELECT * FROM tabela LIMIT 100\n\n-- Z-ORDER para filtros frequentes\nOPTIMIZE tabela ZORDER BY (coluna_filtro)\n\`\`\``,
      {es: '⚡ Query Profile es tu mejor amigo para optimización.', en: '⚡ Query Profile is your best friend for optimization.', pt: '⚡ Query Profile é seu melhor amigo para otimização.'},
      '✅ ¿Usaste Query Profile para optimizar una query?', '✅ Did you use Query Profile to optimize a query?', '✅ Você usou Query Profile para otimizar uma query?', 25, 25),
    createStep('db-9-8', 'Proyecto: Dashboard Analytics', 'Project: Analytics Dashboard', 'Projeto: Dashboard Analytics',
      'Construí un dashboard ejecutivo completo.', 'Build a complete executive dashboard.', 'Construa um dashboard executivo completo.',
      `## Proyecto: Dashboard Ejecutivo\n\n### Componentes:\n- [ ] 5+ queries guardadas\n- [ ] Dashboard con 6+ visualizaciones\n- [ ] KPIs principales (counters)\n- [ ] Trends (line charts)\n- [ ] Breakdown (bar/pie)\n- [ ] Filtros interactivos\n- [ ] Refresh automático\n- [ ] Alert configurado`,
      `## Project: Executive Dashboard\n\n### Components:\n- [ ] 5+ saved queries\n- [ ] Dashboard with 6+ visualizations\n- [ ] Main KPIs (counters)\n- [ ] Trends (line charts)\n- [ ] Breakdown (bar/pie)\n- [ ] Interactive filters\n- [ ] Auto refresh\n- [ ] Alert configured`,
      `## Projeto: Dashboard Executivo\n\n### Componentes:\n- [ ] 5+ queries salvas\n- [ ] Dashboard com 6+ visualizações\n- [ ] KPIs principais (counters)\n- [ ] Tendências (line charts)\n- [ ] Breakdown (bar/pie)\n- [ ] Filtros interativos\n- [ ] Refresh automático\n- [ ] Alert configurado`,
      {es: '🏆 Un buen dashboard puede impresionar en entrevistas.', en: '🏆 A good dashboard can impress in interviews.', pt: '🏆 Um bom dashboard pode impressionar em entrevistas.'},
      '🏆 ¿Tu dashboard tiene 6+ visualizaciones?', '🏆 Does your dashboard have 6+ visualizations?', '🏆 Seu dashboard tem 6+ visualizações?', 75, 60)
  ]
};

export const PHASE_10_MLFLOW: DatabricksPhase = {
  id: 'db-phase-10', number: 10,
  title: { es: 'MLflow & ML Engineering', en: 'MLflow & ML Engineering', pt: 'MLflow & ML Engineering' },
  subtitle: { es: 'Machine Learning en producción', en: 'Machine Learning in production', pt: 'Machine Learning em produção' },
  description: { es: 'MLflow es la plataforma open-source de Databricks para gestionar el ciclo de vida de ML.', en: 'MLflow is Databricks\' open-source platform for managing the ML lifecycle.', pt: 'MLflow é a plataforma open-source do Databricks para gerenciar o ciclo de vida de ML.' },
  icon: '🤖', color: 'pink', estimatedDays: '4-5 días',
  steps: [
    createStep('db-10-1', 'Introducción a MLflow', 'Introduction to MLflow', 'Introdução ao MLflow',
      'MLflow: tracking, registry, deployment de modelos.', 'MLflow: model tracking, registry, deployment.', 'MLflow: tracking, registry, deployment de modelos.',
      `## MLflow\n\n### Componentes:\n- **Tracking**: Loguear experimentos, métricas, parámetros\n- **Models**: Empaquetar modelos en formato estándar\n- **Registry**: Gestionar versiones y stages\n- **Projects**: Reproducibilidad\n\n### En Databricks:\nMLflow viene integrado y mejorado con:\n- UI nativa\n- Autologging\n- Model Serving\n- Feature Store integrado`,
      `## MLflow\n\n### Components:\n- **Tracking**: Log experiments, metrics, parameters\n- **Models**: Package models in standard format\n- **Registry**: Manage versions and stages\n- **Projects**: Reproducibility\n\n### In Databricks:\nMLflow comes integrated and enhanced with:\n- Native UI\n- Autologging\n- Model Serving\n- Integrated Feature Store`,
      `## MLflow\n\n### Componentes:\n- **Tracking**: Logar experimentos, métricas, parâmetros\n- **Models**: Empacotar modelos em formato padrão\n- **Registry**: Gerenciar versões e stages\n- **Projects**: Reproducibilidade\n\n### No Databricks:\nMLflow vem integrado e aprimorado com:\n- UI nativa\n- Autologging\n- Model Serving\n- Feature Store integrado`,
      {es: '💡 MLflow es el estándar de la industria para MLOps.', en: '💡 MLflow is the industry standard for MLOps.', pt: '💡 MLflow é o padrão da indústria para MLOps.'},
      '🤔 ¿Cuáles son los 4 componentes de MLflow?', '🤔 What are the 4 components of MLflow?', '🤔 Quais são os 4 componentes do MLflow?', 20, 15),
    createStep('db-10-2', 'Experiment Tracking', 'Experiment Tracking', 'Experiment Tracking',
      'Registrá todos tus experimentos de ML.', 'Record all your ML experiments.', 'Registre todos seus experimentos de ML.',
      `## Tracking\n\n\`\`\`python\nimport mlflow\n\n# Crear/usar experimento\nmlflow.set_experiment("/Users/mi_user/mi_experimento")\n\n# Iniciar run\nwith mlflow.start_run():\n    # Loguear parámetros\n    mlflow.log_param("learning_rate", 0.01)\n    mlflow.log_param("epochs", 100)\n    \n    # Entrenar...\n    \n    # Loguear métricas\n    mlflow.log_metric("accuracy", 0.95)\n    mlflow.log_metric("loss", 0.05)\n    \n    # Loguear modelo\n    mlflow.sklearn.log_model(model, "model")\n\`\`\``,
      `## Tracking\n\n\`\`\`python\nimport mlflow\n\n# Create/use experiment\nmlflow.set_experiment("/Users/my_user/my_experiment")\n\n# Start run\nwith mlflow.start_run():\n    # Log parameters\n    mlflow.log_param("learning_rate", 0.01)\n    mlflow.log_param("epochs", 100)\n    \n    # Train...\n    \n    # Log metrics\n    mlflow.log_metric("accuracy", 0.95)\n    mlflow.log_metric("loss", 0.05)\n    \n    # Log model\n    mlflow.sklearn.log_model(model, "model")\n\`\`\``,
      `## Tracking\n\n\`\`\`python\nimport mlflow\n\n# Criar/usar experimento\nmlflow.set_experiment("/Users/meu_user/meu_experimento")\n\n# Iniciar run\nwith mlflow.start_run():\n    # Logar parâmetros\n    mlflow.log_param("learning_rate", 0.01)\n    mlflow.log_param("epochs", 100)\n    \n    # Treinar...\n    \n    # Logar métricas\n    mlflow.log_metric("accuracy", 0.95)\n    mlflow.log_metric("loss", 0.05)\n    \n    # Logar modelo\n    mlflow.sklearn.log_model(model, "model")\n\`\`\``,
      {es: '📊 Todo queda registrado en la UI de MLflow.', en: '📊 Everything is recorded in the MLflow UI.', pt: '📊 Tudo fica registrado na UI do MLflow.'},
      '✅ ¿Logueaste un experimento con métricas?', '✅ Did you log an experiment with metrics?', '✅ Você logou um experimento com métricas?', 30, 25),
    createStep('db-10-3', 'Autologging', 'Autologging', 'Autologging',
      'Logueo automático para frameworks populares.', 'Automatic logging for popular frameworks.', 'Log automático para frameworks populares.',
      `## Autologging\n\n\`\`\`python\nimport mlflow\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Habilitar autologging\nmlflow.sklearn.autolog()\n\n# Entrenar (se loguea TODO automáticamente)\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\n\n# Automáticamente loguea:\n# - Todos los parámetros\n# - Métricas (accuracy, f1, etc.)\n# - Modelo serializado\n# - Feature importance\n\`\`\`\n\n### Frameworks soportados:\n- scikit-learn\n- TensorFlow/Keras\n- PyTorch\n- XGBoost\n- LightGBM\n- Spark MLlib`,
      `## Autologging\n\n\`\`\`python\nimport mlflow\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Enable autologging\nmlflow.sklearn.autolog()\n\n# Train (EVERYTHING logged automatically)\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\n\n# Automatically logs:\n# - All parameters\n# - Metrics (accuracy, f1, etc.)\n# - Serialized model\n# - Feature importance\n\`\`\`\n\n### Supported frameworks:\n- scikit-learn\n- TensorFlow/Keras\n- PyTorch\n- XGBoost\n- LightGBM\n- Spark MLlib`,
      `## Autologging\n\n\`\`\`python\nimport mlflow\nfrom sklearn.ensemble import RandomForestClassifier\n\n# Habilitar autologging\nmlflow.sklearn.autolog()\n\n# Treinar (TUDO é logado automaticamente)\nmodel = RandomForestClassifier(n_estimators=100)\nmodel.fit(X_train, y_train)\n\n# Automaticamente loga:\n# - Todos os parâmetros\n# - Métricas (accuracy, f1, etc.)\n# - Modelo serializado\n# - Feature importance\n\`\`\`\n\n### Frameworks suportados:\n- scikit-learn\n- TensorFlow/Keras\n- PyTorch\n- XGBoost\n- LightGBM\n- Spark MLlib`,
      {es: '⚡ Autolog es magia. Actívalo siempre.', en: '⚡ Autolog is magic. Always enable it.', pt: '⚡ Autolog é mágico. Sempre ative.'},
      '✅ ¿Usaste autolog para un modelo?', '✅ Did you use autolog for a model?', '✅ Você usou autolog para um modelo?', 25, 20),
    createStep('db-10-4', 'Model Registry', 'Model Registry', 'Model Registry',
      'Gestioná versiones y stages de tus modelos.', 'Manage versions and stages of your models.', 'Gerencie versões e stages dos seus modelos.',
      `## Model Registry\n\n### Registrar modelo:\n\`\`\`python\n# Desde un run existente\nmlflow.register_model(\n    "runs:/RUN_ID/model",\n    "mi_modelo_produccion"\n)\n\n# O al loguear\nwith mlflow.start_run():\n    mlflow.sklearn.log_model(\n        model, "model",\n        registered_model_name="mi_modelo"\n    )\n\`\`\`\n\n### Stages:\n- **None**: Recién registrado\n- **Staging**: En pruebas\n- **Production**: En producción\n- **Archived**: Descartado\n\n### Transicionar:\n\`\`\`python\nfrom mlflow import MlflowClient\nclient = MlflowClient()\nclient.transition_model_version_stage(\n    name="mi_modelo",\n    version=1,\n    stage="Production"\n)\n\`\`\``,
      `## Model Registry\n\n### Register model:\n\`\`\`python\n# From existing run\nmlflow.register_model(\n    "runs:/RUN_ID/model",\n    "my_production_model"\n)\n\n# Or when logging\nwith mlflow.start_run():\n    mlflow.sklearn.log_model(\n        model, "model",\n        registered_model_name="my_model"\n    )\n\`\`\`\n\n### Stages:\n- **None**: Newly registered\n- **Staging**: In testing\n- **Production**: In production\n- **Archived**: Discarded\n\n### Transition:\n\`\`\`python\nfrom mlflow import MlflowClient\nclient = MlflowClient()\nclient.transition_model_version_stage(\n    name="my_model",\n    version=1,\n    stage="Production"\n)\n\`\`\``,
      `## Model Registry\n\n### Registrar modelo:\n\`\`\`python\n# De um run existente\nmlflow.register_model(\n    "runs:/RUN_ID/model",\n    "meu_modelo_producao"\n)\n\n# Ou ao logar\nwith mlflow.start_run():\n    mlflow.sklearn.log_model(\n        model, "model",\n        registered_model_name="meu_modelo"\n    )\n\`\`\`\n\n### Stages:\n- **None**: Recém registrado\n- **Staging**: Em testes\n- **Production**: Em produção\n- **Archived**: Descartado\n\n### Transicionar:\n\`\`\`python\nfrom mlflow import MlflowClient\nclient = MlflowClient()\nclient.transition_model_version_stage(\n    name="meu_modelo",\n    version=1,\n    stage="Production"\n)\n\`\`\``,
      {es: '🔄 Registry permite rollback fácil si algo sale mal.', en: '🔄 Registry allows easy rollback if something goes wrong.', pt: '🔄 Registry permite rollback fácil se algo der errado.'},
      '✅ ¿Registraste un modelo y lo moviste a Production?', '✅ Did you register a model and move it to Production?', '✅ Você registrou um modelo e o moveu para Production?', 30, 25),
    createStep('db-10-5', 'Model Serving', 'Model Serving', 'Model Serving',
      'Desplegá modelos como endpoints REST.', 'Deploy models as REST endpoints.', 'Implante modelos como endpoints REST.',
      `## Model Serving\n\n### Habilitar serving:\n1. Models > Tu modelo > Serving\n2. Enable serving\n3. Esperar que el endpoint esté listo\n\n### Llamar endpoint:\n\`\`\`python\nimport requests\n\nurl = "https://workspace.cloud.databricks.com/serving-endpoints/mi_modelo/invocations"\nheaders = {"Authorization": f"Bearer {token}"}\ndata = {"dataframe_records": [{"feature1": 1, "feature2": 2}]}\n\nresponse = requests.post(url, json=data, headers=headers)\npredictions = response.json()\n\`\`\`\n\n### Opciones:\n- Serverless (recomendado)\n- GPU serving\n- A/B testing`,
      `## Model Serving\n\n### Enable serving:\n1. Models > Your model > Serving\n2. Enable serving\n3. Wait for endpoint to be ready\n\n### Call endpoint:\n\`\`\`python\nimport requests\n\nurl = "https://workspace.cloud.databricks.com/serving-endpoints/my_model/invocations"\nheaders = {"Authorization": f"Bearer {token}"}\ndata = {"dataframe_records": [{"feature1": 1, "feature2": 2}]}\n\nresponse = requests.post(url, json=data, headers=headers)\npredictions = response.json()\n\`\`\`\n\n### Options:\n- Serverless (recommended)\n- GPU serving\n- A/B testing`,
      `## Model Serving\n\n### Habilitar serving:\n1. Models > Seu modelo > Serving\n2. Enable serving\n3. Esperar que o endpoint esteja pronto\n\n### Chamar endpoint:\n\`\`\`python\nimport requests\n\nurl = "https://workspace.cloud.databricks.com/serving-endpoints/meu_modelo/invocations"\nheaders = {"Authorization": f"Bearer {token}"}\ndata = {"dataframe_records": [{"feature1": 1, "feature2": 2}]}\n\nresponse = requests.post(url, json=data, headers=headers)\npredictions = response.json()\n\`\`\`\n\n### Opções:\n- Serverless (recomendado)\n- GPU serving\n- A/B testing`,
      {es: '🚀 Model Serving es la forma más fácil de poner ML en producción.', en: '🚀 Model Serving is the easiest way to put ML in production.', pt: '🚀 Model Serving é a forma mais fácil de colocar ML em produção.'},
      '✅ ¿Desplegaste un modelo y lo llamaste via API?', '✅ Did you deploy a model and call it via API?', '✅ Você implantou um modelo e o chamou via API?', 35, 30),
    createStep('db-10-6', 'Feature Store', 'Feature Store', 'Feature Store',
      'Almacená y reutilizá features de ML.', 'Store and reuse ML features.', 'Armazene e reutilize features de ML.',
      `## Feature Store\n\n### Crear Feature Table:\n\`\`\`python\nfrom databricks.feature_store import FeatureStoreClient\n\nfs = FeatureStoreClient()\n\n# Crear tabla de features\nfs.create_table(\n    name="catalog.schema.customer_features",\n    primary_keys=["customer_id"],\n    df=features_df,\n    description="Features de clientes"\n)\n\`\`\`\n\n### Entrenar con features:\n\`\`\`python\n# Crear training set\ntraining_set = fs.create_training_set(\n    df=labels_df,\n    feature_lookups=[\n        FeatureLookup(\n            table_name="catalog.schema.customer_features",\n            lookup_key="customer_id"\n        )\n    ],\n    label="target"\n)\n\ntraining_df = training_set.load_df()\n\`\`\``,
      `## Feature Store\n\n### Create Feature Table:\n\`\`\`python\nfrom databricks.feature_store import FeatureStoreClient\n\nfs = FeatureStoreClient()\n\n# Create feature table\nfs.create_table(\n    name="catalog.schema.customer_features",\n    primary_keys=["customer_id"],\n    df=features_df,\n    description="Customer features"\n)\n\`\`\`\n\n### Train with features:\n\`\`\`python\n# Create training set\ntraining_set = fs.create_training_set(\n    df=labels_df,\n    feature_lookups=[\n        FeatureLookup(\n            table_name="catalog.schema.customer_features",\n            lookup_key="customer_id"\n        )\n    ],\n    label="target"\n)\n\ntraining_df = training_set.load_df()\n\`\`\``,
      `## Feature Store\n\n### Criar Feature Table:\n\`\`\`python\nfrom databricks.feature_store import FeatureStoreClient\n\nfs = FeatureStoreClient()\n\n# Criar tabela de features\nfs.create_table(\n    name="catalog.schema.customer_features",\n    primary_keys=["customer_id"],\n    df=features_df,\n    description="Features de clientes"\n)\n\`\`\`\n\n### Treinar com features:\n\`\`\`python\n# Criar training set\ntraining_set = fs.create_training_set(\n    df=labels_df,\n    feature_lookups=[\n        FeatureLookup(\n            table_name="catalog.schema.customer_features",\n            lookup_key="customer_id"\n        )\n    ],\n    label="target"\n)\n\ntraining_df = training_set.load_df()\n\`\`\``,
      {es: '♻️ Feature Store evita duplicar código de feature engineering.', en: '♻️ Feature Store avoids duplicating feature engineering code.', pt: '♻️ Feature Store evita duplicar código de feature engineering.'},
      '✅ ¿Creaste una feature table?', '✅ Did you create a feature table?', '✅ Você criou uma feature table?', 35, 30),
    createStep('db-10-7', 'AutoML', 'AutoML', 'AutoML',
      'Databricks AutoML entrena modelos automáticamente.', 'Databricks AutoML trains models automatically.', 'Databricks AutoML treina modelos automaticamente.',
      `## AutoML\n\n### Desde UI:\n1. Machine Learning > Experiments > Create AutoML\n2. Seleccionar tabla de datos\n3. Seleccionar target column\n4. Elegir tipo: Classification, Regression, Forecasting\n5. Iniciar\n\n### Desde código:\n\`\`\`python\nfrom databricks import automl\n\nsummary = automl.classify(\n    dataset=df,\n    target_col="label",\n    timeout_minutes=30\n)\n\n# Ver mejor modelo\nbest_run = summary.best_trial\nprint(best_run.metrics)\n\`\`\`\n\n### Genera automáticamente:\n- Notebooks de feature engineering\n- Código de entrenamiento\n- Comparación de modelos\n- Modelo registrado`,
      `## AutoML\n\n### From UI:\n1. Machine Learning > Experiments > Create AutoML\n2. Select data table\n3. Select target column\n4. Choose type: Classification, Regression, Forecasting\n5. Start\n\n### From code:\n\`\`\`python\nfrom databricks import automl\n\nsummary = automl.classify(\n    dataset=df,\n    target_col="label",\n    timeout_minutes=30\n)\n\n# View best model\nbest_run = summary.best_trial\nprint(best_run.metrics)\n\`\`\`\n\n### Automatically generates:\n- Feature engineering notebooks\n- Training code\n- Model comparison\n- Registered model`,
      `## AutoML\n\n### Pela UI:\n1. Machine Learning > Experiments > Create AutoML\n2. Selecionar tabela de dados\n3. Selecionar coluna target\n4. Escolher tipo: Classification, Regression, Forecasting\n5. Iniciar\n\n### Pelo código:\n\`\`\`python\nfrom databricks import automl\n\nsummary = automl.classify(\n    dataset=df,\n    target_col="label",\n    timeout_minutes=30\n)\n\n# Ver melhor modelo\nbest_run = summary.best_trial\nprint(best_run.metrics)\n\`\`\`\n\n### Gera automaticamente:\n- Notebooks de feature engineering\n- Código de treinamento\n- Comparação de modelos\n- Modelo registrado`,
      {es: '🤖 AutoML es perfecto para baseline rápido o usuarios no expertos en ML.', en: '🤖 AutoML is perfect for quick baseline or non-ML expert users.', pt: '🤖 AutoML é perfeito para baseline rápido ou usuários não especialistas em ML.'},
      '✅ ¿Ejecutaste AutoML y revisaste el mejor modelo?', '✅ Did you run AutoML and review the best model?', '✅ Você executou AutoML e revisou o melhor modelo?', 30, 30),
    createStep('db-10-8', 'Proyecto: Pipeline ML End-to-End', 'Project: End-to-End ML Pipeline', 'Projeto: Pipeline ML End-to-End',
      'Construí un pipeline ML completo: datos → features → modelo → serving.', 'Build a complete ML pipeline: data → features → model → serving.', 'Construa um pipeline ML completo: dados → features → modelo → serving.',
      `## Proyecto: ML Pipeline\n\n### Checklist:\n- [ ] Datos en Delta Lake\n- [ ] Features en Feature Store\n- [ ] Experimento con tracking\n- [ ] Autologging habilitado\n- [ ] Mejor modelo en Registry\n- [ ] Modelo en stage Production\n- [ ] Endpoint serving activo\n- [ ] API llamable`,
      `## Project: ML Pipeline\n\n### Checklist:\n- [ ] Data in Delta Lake\n- [ ] Features in Feature Store\n- [ ] Experiment with tracking\n- [ ] Autologging enabled\n- [ ] Best model in Registry\n- [ ] Model in Production stage\n- [ ] Active serving endpoint\n- [ ] Callable API`,
      `## Projeto: Pipeline ML\n\n### Checklist:\n- [ ] Dados no Delta Lake\n- [ ] Features no Feature Store\n- [ ] Experimento com tracking\n- [ ] Autologging habilitado\n- [ ] Melhor modelo no Registry\n- [ ] Modelo em stage Production\n- [ ] Endpoint serving ativo\n- [ ] API chamável`,
      {es: '🏆 Este pipeline es lo que hacen Data Scientists en empresas top.', en: '🏆 This pipeline is what Data Scientists do at top companies.', pt: '🏆 Este pipeline é o que Data Scientists fazem em empresas top.'},
      '🏆 ¿Tu modelo está sirviendo predicciones via API?', '🏆 Is your model serving predictions via API?', '🏆 Seu modelo está servindo predições via API?', 100, 90)
  ]
};

export const PHASE_11_BEST_PRACTICES: DatabricksPhase = {
  id: 'db-phase-11', number: 11,
  title: { es: 'Best Practices & Performance', en: 'Best Practices & Performance', pt: 'Melhores Práticas & Performance' },
  subtitle: { es: 'Optimización y producción', en: 'Optimization and production', pt: 'Otimização e produção' },
  description: { es: 'Las mejores prácticas para pipelines de producción escalables y mantenibles.', en: 'Best practices for scalable and maintainable production pipelines.', pt: 'Melhores práticas para pipelines de produção escaláveis e manuteníveis.' },
  icon: '🎯', color: 'yellow', estimatedDays: '3-4 días',
  steps: [
    createStep('db-11-1', 'Estructura de Proyecto', 'Project Structure', 'Estrutura de Projeto', 'Organizá tu código de forma mantenible.', 'Organize your code in a maintainable way.', 'Organize seu código de forma manutenível.',
      `## Estructura Recomendada\n\n\`\`\`\nproyecto/\n├── notebooks/\n│   ├── 01_ingesta.py\n│   ├── 02_transformacion.py\n│   └── 03_gold.py\n├── src/\n│   ├── utils.py\n│   └── transformations.py\n├── tests/\n│   └── test_transformations.py\n├── config/\n│   └── config.yaml\n└── requirements.txt\n\`\`\`\n\n### Tips:\n- Código reutilizable en src/\n- Configuración externa\n- Tests para funciones críticas`,
      `## Recommended Structure\n\n\`\`\`\nproject/\n├── notebooks/\n│   ├── 01_ingestion.py\n│   ├── 02_transformation.py\n│   └── 03_gold.py\n├── src/\n│   ├── utils.py\n│   └── transformations.py\n├── tests/\n│   └── test_transformations.py\n├── config/\n│   └── config.yaml\n└── requirements.txt\n\`\`\`\n\n### Tips:\n- Reusable code in src/\n- External configuration\n- Tests for critical functions`,
      `## Estrutura Recomendada\n\n\`\`\`\nprojeto/\n├── notebooks/\n│   ├── 01_ingestao.py\n│   ├── 02_transformacao.py\n│   └── 03_gold.py\n├── src/\n│   ├── utils.py\n│   └── transformations.py\n├── tests/\n│   └── test_transformations.py\n├── config/\n│   └── config.yaml\n└── requirements.txt\n\`\`\`\n\n### Dicas:\n- Código reutilizável em src/\n- Configuração externa\n- Testes para funções críticas`,
      {es: '📁 Una buena estructura escala con el equipo.', en: '📁 Good structure scales with the team.', pt: '📁 Uma boa estrutura escala com a equipe.'}, '✅ ¿Organizaste tu proyecto con esta estructura?', '✅ Did you organize your project with this structure?', '✅ Você organizou seu projeto com essa estrutura?', 20, 15),
    createStep('db-11-2', 'Git Integration', 'Git Integration', 'Integração Git', 'Conectá repos Git para versionado de código.', 'Connect Git repos for code versioning.', 'Conecte repos Git para versionamento de código.',
      `## Repos en Databricks\n\n### Conectar repositorio:\n1. Workspace > Repos > Add Repo\n2. URL del repo Git\n3. Credenciales (token)\n\n### Operaciones:\n- Pull: traer cambios\n- Push: subir cambios\n- Checkout branch\n- Crear branch\n\n### CI/CD:\n- GitHub Actions\n- Azure DevOps\n- Databricks Asset Bundles`,
      `## Repos in Databricks\n\n### Connect repository:\n1. Workspace > Repos > Add Repo\n2. Git repo URL\n3. Credentials (token)\n\n### Operations:\n- Pull: get changes\n- Push: upload changes\n- Checkout branch\n- Create branch\n\n### CI/CD:\n- GitHub Actions\n- Azure DevOps\n- Databricks Asset Bundles`,
      `## Repos no Databricks\n\n### Conectar repositório:\n1. Workspace > Repos > Add Repo\n2. URL do repo Git\n3. Credenciais (token)\n\n### Operações:\n- Pull: trazer mudanças\n- Push: subir mudanças\n- Checkout branch\n- Criar branch\n\n### CI/CD:\n- GitHub Actions\n- Azure DevOps\n- Databricks Asset Bundles`,
      {es: '🔄 Siempre usá Git, incluso para proyectos pequeños.', en: '🔄 Always use Git, even for small projects.', pt: '🔄 Sempre use Git, mesmo para projetos pequenos.'}, '✅ ¿Conectaste un repo Git?', '✅ Did you connect a Git repo?', '✅ Você conectou um repo Git?', 25, 20),
    {
      id: 'db-11-2b',
      title: { es: 'Databricks Asset Bundles (DABs)', en: 'Databricks Asset Bundles (DABs)', pt: 'Databricks Asset Bundles (DABs)' },
      description: { es: 'El nuevo estándar (2024) para CI/CD en Databricks. Reemplaza a dbx.', en: 'The new standard (2024) for CI/CD in Databricks. Replaces dbx.', pt: 'O novo padrão (2024) para CI/CD no Databricks. Substitui dbx.' },
      theory: {
        es: `## Databricks Asset Bundles (DABs)

DABs es la forma **oficial y recomendada** de hacer CI/CD en Databricks (2024). Reemplaza a herramientas anteriores como dbx.

### ¿Qué es un Asset Bundle?

Es un **proyecto como código** que define:
- Jobs y pipelines
- Clusters
- Notebooks
- DLT pipelines
- Permisos
- Variables por ambiente

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                 DATABRICKS ASSET BUNDLE                      │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│  databricks.yml           # Configuración principal          │
│       │                                                      │
│       ├── Define: Jobs, Pipelines, Clusters                 │
│       │                                                      │
│       └── Ambientes: dev → staging → prod                   │
│                                                              │
│  src/                    # Tu código                         │
│  resources/              # Configuraciones adicionales       │
│                                                              │
└─────────────────────────────────────────────────────────────┘
\`\`\`

### Estructura de un Bundle

\`\`\`
my-project/
├── databricks.yml           # Configuración principal
├── resources/
│   ├── jobs.yml            # Definición de jobs
│   └── pipelines.yml       # Definición de DLT
├── src/
│   ├── notebooks/
│   │   ├── bronze.py
│   │   ├── silver.py
│   │   └── gold.py
│   └── libs/
│       └── transforms.py
└── tests/
    └── test_transforms.py
\`\`\`

### databricks.yml Básico

\`\`\`yaml
# databricks.yml
bundle:
  name: mi-pipeline-etl

# Variables que cambian por ambiente
variables:
  catalog:
    description: "Catalog de Unity"
    default: "dev"
  warehouse_id:
    description: "SQL Warehouse ID"

# Recursos (jobs, pipelines, etc)
include:
  - resources/*.yml

# Ambientes
targets:
  dev:
    workspace:
      host: https://dbc-xxxxx.cloud.databricks.com
    variables:
      catalog: dev
  
  staging:
    workspace:
      host: https://dbc-xxxxx.cloud.databricks.com
    variables:
      catalog: staging
  
  prod:
    workspace:
      host: https://dbc-xxxxx.cloud.databricks.com
    variables:
      catalog: prod
    mode: production  # Requiere permisos explícitos
\`\`\`

### resources/jobs.yml

\`\`\`yaml
resources:
  jobs:
    daily_etl:
      name: "Daily ETL Pipeline"
      schedule:
        quartz_cron_expression: "0 0 6 * * ?"
        timezone_id: "America/Buenos_Aires"
      
      tasks:
        - task_key: bronze
          notebook_task:
            notebook_path: ./src/notebooks/bronze.py
          job_cluster_key: etl_cluster
        
        - task_key: silver
          depends_on:
            - task_key: bronze
          notebook_task:
            notebook_path: ./src/notebooks/silver.py
          job_cluster_key: etl_cluster
        
        - task_key: gold
          depends_on:
            - task_key: silver
          notebook_task:
            notebook_path: ./src/notebooks/gold.py
          job_cluster_key: etl_cluster
      
      job_clusters:
        - job_cluster_key: etl_cluster
          new_cluster:
            spark_version: "14.3.x-scala2.12"
            num_workers: 2
            node_type_id: i3.xlarge
            aws_attributes:
              availability: SPOT_WITH_FALLBACK
      
      email_notifications:
        on_failure:
          - team@company.com
\`\`\`

### Comandos CLI

\`\`\`bash
# Instalar CLI
pip install databricks-cli

# Configurar autenticación
databricks configure --token

# Validar bundle
databricks bundle validate

# Desplegar a dev
databricks bundle deploy -t dev

# Ver cambios sin aplicar
databricks bundle deploy -t staging --dry-run

# Desplegar a producción
databricks bundle deploy -t prod

# Ejecutar job manualmente
databricks bundle run daily_etl -t dev

# Destruir recursos (cuidado!)
databricks bundle destroy -t dev
\`\`\`

### CI/CD con GitHub Actions

\`\`\`yaml
# .github/workflows/deploy.yml
name: Deploy to Databricks

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: databricks/setup-cli@main
      - run: databricks bundle validate
        env:
          DATABRICKS_TOKEN: \${{ secrets.DATABRICKS_TOKEN }}
          DATABRICKS_HOST: \${{ secrets.DATABRICKS_HOST }}

  deploy-staging:
    needs: validate
    if: github.event_name == 'pull_request'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: databricks/setup-cli@main
      - run: databricks bundle deploy -t staging
        env:
          DATABRICKS_TOKEN: \${{ secrets.DATABRICKS_TOKEN }}
          DATABRICKS_HOST: \${{ secrets.DATABRICKS_HOST }}

  deploy-prod:
    needs: validate
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    environment: production
    steps:
      - uses: actions/checkout@v3
      - uses: databricks/setup-cli@main
      - run: databricks bundle deploy -t prod
        env:
          DATABRICKS_TOKEN: \${{ secrets.DATABRICKS_TOKEN_PROD }}
          DATABRICKS_HOST: \${{ secrets.DATABRICKS_HOST_PROD }}
\`\`\`

### DABs vs Otras Herramientas

| Feature | DABs (2024) | dbx (legacy) | Terraform |
|---------|-------------|--------------|-----------|
| Oficial Databricks | ✅ Sí | ❌ Deprecated | ❌ No |
| YAML config | ✅ | ✅ | HCL |
| Ambientes | ✅ Built-in | Requiere config | Requiere config |
| Validación | ✅ CLI | Limited | Limited |
| Preview cambios | ✅ dry-run | ❌ | ✅ plan |
| DLT support | ✅ Nativo | Limited | Limited |`,
        en: `## Databricks Asset Bundles (DABs)

DABs is the **official and recommended** way to do CI/CD in Databricks (2024). Replaces previous tools like dbx.

### What is an Asset Bundle?

It's a **project as code** that defines jobs, pipelines, clusters, DLT pipelines, permissions, and environment variables.

\`\`\`yaml
# databricks.yml
bundle:
  name: my-etl-pipeline

targets:
  dev:
    workspace:
      host: https://dbc-xxxxx.cloud.databricks.com
  prod:
    workspace:
      host: https://dbc-xxxxx.cloud.databricks.com
    mode: production
\`\`\`

### CLI Commands
\`\`\`bash
databricks bundle validate     # Validate
databricks bundle deploy -t dev # Deploy to dev
databricks bundle run job -t dev # Run job
\`\`\``,
        pt: `## Databricks Asset Bundles (DABs)

DABs é a forma **oficial e recomendada** de fazer CI/CD no Databricks (2024). Substitui ferramentas anteriores como dbx.

### O que é um Asset Bundle?

É um **projeto como código** que define jobs, pipelines, clusters, pipelines DLT, permissões e variáveis de ambiente.

\`\`\`yaml
# databricks.yml
bundle:
  name: meu-pipeline-etl

targets:
  dev:
    workspace:
      host: https://dbc-xxxxx.cloud.databricks.com
  prod:
    workspace:
      host: https://dbc-xxxxx.cloud.databricks.com
\`\`\``
      },
      practicalTips: [
        { es: '🚀 DABs es el FUTURO de CI/CD en Databricks. Aprendelo ahora.', en: '🚀 DABs is the FUTURE of CI/CD in Databricks. Learn it now.', pt: '🚀 DABs é o FUTURO de CI/CD no Databricks. Aprenda agora.' },
        { es: '🔄 Si usás dbx, migrá a DABs. dbx está deprecated.', en: '🔄 If you use dbx, migrate to DABs. dbx is deprecated.', pt: '🔄 Se você usa dbx, migre para DABs. dbx está deprecated.' },
        { es: '💡 Usá targets (dev/staging/prod) para separar ambientes.', en: '💡 Use targets (dev/staging/prod) to separate environments.', pt: '💡 Use targets (dev/staging/prod) para separar ambientes.' }
      ],
      externalLinks: [
        { title: 'Asset Bundles Docs', url: 'https://docs.databricks.com/dev-tools/bundles/index.html', type: 'docs' },
        { title: 'Bundle Examples', url: 'https://github.com/databricks/bundle-examples', type: 'article' }
      ],
      checkpoint: { es: '✅ ¿Creaste un bundle básico y lo desplegaste a dev?', en: '✅ Did you create a basic bundle and deploy it to dev?', pt: '✅ Você criou um bundle básico e o fez deploy para dev?' },
      xpReward: 40,
      estimatedMinutes: 40
    },
    createStep('db-11-3', 'Secrets Management', 'Secrets Management', 'Gerenciamento de Secrets', 'Nunca hardcodees credenciales. Usá secrets.', 'Never hardcode credentials. Use secrets.', 'Nunca coloque credenciais fixas. Use secrets.',
      `## Databricks Secrets\n\n### Crear scope y secret:\n\`\`\`bash\ndatabricks secrets create-scope --scope mi_scope\ndatabricks secrets put --scope mi_scope --key db_password\n\`\`\`\n\n### Usar en código:\n\`\`\`python\npassword = dbutils.secrets.get(\n    scope="mi_scope", \n    key="db_password"\n)\n\`\`\`\n\n### Best practices:\n- Un scope por proyecto/ambiente\n- Rotar secrets regularmente\n- Limitar acceso por grupo`,
      `## Databricks Secrets\n\n### Create scope and secret:\n\`\`\`bash\ndatabricks secrets create-scope --scope my_scope\ndatabricks secrets put --scope my_scope --key db_password\n\`\`\`\n\n### Use in code:\n\`\`\`python\npassword = dbutils.secrets.get(\n    scope="my_scope", \n    key="db_password"\n)\n\`\`\`\n\n### Best practices:\n- One scope per project/environment\n- Rotate secrets regularly\n- Limit access by group`,
      `## Databricks Secrets\n\n### Criar scope e secret:\n\`\`\`bash\ndatabricks secrets create-scope --scope meu_scope\ndatabricks secrets put --scope meu_scope --key db_password\n\`\`\`\n\n### Usar no código:\n\`\`\`python\npassword = dbutils.secrets.get(\n    scope="meu_scope", \n    key="db_password"\n)\n\`\`\`\n\n### Melhores práticas:\n- Um scope por projeto/ambiente\n- Rotacionar secrets regularmente\n- Limitar acesso por grupo`,
      {es: '🔐 Si veo passwords en código, es red flag inmediata.', en: '🔐 If I see passwords in code, it\'s an immediate red flag.', pt: '🔐 Se eu vejo senhas no código, é red flag imediata.'}, '✅ ¿Creaste un secret y lo usaste en código?', '✅ Did you create a secret and use it in code?', '✅ Você criou um secret e o usou no código?', 25, 20),
    createStep('db-11-4', 'Cost Management', 'Cost Management', 'Gestão de Custos', 'Controlá y optimizá costos de Databricks.', 'Control and optimize Databricks costs.', 'Controle e otimize custos do Databricks.',
      `## Optimización de Costos\n\n### Quick wins:\n- Auto-terminate clusters (30 min)\n- Job clusters vs All-Purpose\n- Spot instances (60-90% ahorro)\n- Right-size clusters\n\n### Monitoreo:\n\`\`\`sql\nSELECT \n  workspace_id,\n  sku_name,\n  SUM(usage_quantity) as dbus,\n  SUM(usage_quantity * list_price) as cost\nFROM system.billing.usage\nGROUP BY 1, 2\n\`\`\`\n\n### Tags para chargeback:\n- Por equipo\n- Por proyecto\n- Por ambiente`,
      `## Cost Optimization\n\n### Quick wins:\n- Auto-terminate clusters (30 min)\n- Job clusters vs All-Purpose\n- Spot instances (60-90% savings)\n- Right-size clusters\n\n### Monitoring:\n\`\`\`sql\nSELECT \n  workspace_id,\n  sku_name,\n  SUM(usage_quantity) as dbus,\n  SUM(usage_quantity * list_price) as cost\nFROM system.billing.usage\nGROUP BY 1, 2\n\`\`\`\n\n### Tags for chargeback:\n- By team\n- By project\n- By environment`,
      `## Otimização de Custos\n\n### Quick wins:\n- Auto-terminate clusters (30 min)\n- Job clusters vs All-Purpose\n- Spot instances (60-90% economia)\n- Right-size clusters\n\n### Monitoramento:\n\`\`\`sql\nSELECT \n  workspace_id,\n  sku_name,\n  SUM(usage_quantity) as dbus,\n  SUM(usage_quantity * list_price) as cost\nFROM system.billing.usage\nGROUP BY 1, 2\n\`\`\`\n\n### Tags para chargeback:\n- Por equipe\n- Por projeto\n- Por ambiente`,
      {es: '💰 El costo es responsabilidad del DE. Monitoréalo.', en: '💰 Cost is the DE\'s responsibility. Monitor it.', pt: '💰 Custo é responsabilidade do DE. Monitore.'}, '✅ ¿Configuraste tags de costo en tus clusters?', '✅ Did you configure cost tags on your clusters?', '✅ Você configurou tags de custo nos seus clusters?', 25, 20),
    createStep('db-11-5', 'Testing Data Pipelines', 'Testing Data Pipelines', 'Testando Pipelines de Dados', 'Testear pipelines es esencial para producción.', 'Testing pipelines is essential for production.', 'Testar pipelines é essencial para produção.',
      `## Testing\n\n### Unit tests:\n\`\`\`python\nimport pytest\nfrom src.transformations import clean_data\n\ndef test_clean_data():\n    input_df = spark.createDataFrame([...])\n    result = clean_data(input_df)\n    assert result.count() == expected_count\n\`\`\`\n\n### Integration tests:\n- Test con datos de sample\n- Verificar schema output\n- Verificar constraints\n\n### Data quality tests:\n- Great Expectations\n- DLT Expectations\n- Custom assertions`,
      `## Testing\n\n### Unit tests:\n\`\`\`python\nimport pytest\nfrom src.transformations import clean_data\n\ndef test_clean_data():\n    input_df = spark.createDataFrame([...])\n    result = clean_data(input_df)\n    assert result.count() == expected_count\n\`\`\`\n\n### Integration tests:\n- Test with sample data\n- Verify output schema\n- Verify constraints\n\n### Data quality tests:\n- Great Expectations\n- DLT Expectations\n- Custom assertions`,
      `## Testing\n\n### Unit tests:\n\`\`\`python\nimport pytest\nfrom src.transformations import clean_data\n\ndef test_clean_data():\n    input_df = spark.createDataFrame([...])\n    result = clean_data(input_df)\n    assert result.count() == expected_count\n\`\`\`\n\n### Testes de integração:\n- Teste com dados de amostra\n- Verificar schema output\n- Verificar constraints\n\n### Testes de qualidade de dados:\n- Great Expectations\n- DLT Expectations\n- Custom assertions`,
      {es: '🧪 Un pipeline sin tests es una bomba de tiempo.', en: '🧪 A pipeline without tests is a time bomb.', pt: '🧪 Um pipeline sem testes é uma bomba-relógio.'}, '✅ ¿Escribiste tests para tu pipeline?', '✅ Did you write tests for your pipeline?', '✅ Você escreveu testes para seu pipeline?', 30, 25),
    createStep('db-11-6', 'Monitoring & Observability', 'Monitoring & Observability', 'Monitoramento & Observabilidade', 'Monitoreá salud y performance de tus pipelines.', 'Monitor health and performance of your pipelines.', 'Monitore saúde e performance dos seus pipelines.',
      `## Observabilidad\n\n### System Tables:\n\`\`\`sql\n-- Jobs\nSELECT * FROM system.workflow.jobs;\n\n-- Clusters\nSELECT * FROM system.compute.clusters;\n\n-- Queries SQL\nSELECT * FROM system.query.history;\n\`\`\`\n\n### Métricas clave:\n- Job success rate\n- Duración de runs\n- Data freshness\n- Error rate\n\n### Integración:\n- Datadog\n- Grafana\n- Custom dashboards`,
      `## Observability\n\n### System Tables:\n\`\`\`sql\n-- Jobs\nSELECT * FROM system.workflow.jobs;\n\n-- Clusters\nSELECT * FROM system.compute.clusters;\n\n-- SQL Queries\nSELECT * FROM system.query.history;\n\`\`\`\n\n### Key metrics:\n- Job success rate\n- Run duration\n- Data freshness\n- Error rate\n\n### Integration:\n- Datadog\n- Grafana\n- Custom dashboards`,
      `## Observabilidade\n\n### System Tables:\n\`\`\`sql\n-- Jobs\nSELECT * FROM system.workflow.jobs;\n\n-- Clusters\nSELECT * FROM system.compute.clusters;\n\n-- Queries SQL\nSELECT * FROM system.query.history;\n\`\`\`\n\n### Métricas chave:\n- Job success rate\n- Duração de runs\n- Data freshness\n- Error rate\n\n### Integração:\n- Datadog\n- Grafana\n- Custom dashboards`,
      {es: '📊 Si no lo medís, no lo podés mejorar.', en: '📊 If you don\'t measure it, you can\'t improve it.', pt: '📊 Se você não mede, não pode melhorar.'}, '✅ ¿Creaste un dashboard de monitoreo?', '✅ Did you create a monitoring dashboard?', '✅ Você criou um dashboard de monitoramento?', 30, 25),
    createStep('db-11-7', 'Performance Tuning Checklist', 'Performance Tuning Checklist', 'Checklist de Performance', 'Lista de verificación para optimizar performance.', 'Checklist for optimizing performance.', 'Lista de verificação para otimizar performance.',
      `## Performance Checklist\n\n### Antes de ejecutar:\n- [ ] Usar Delta (no CSV/JSON)\n- [ ] Particionamiento correcto\n- [ ] Z-ORDER en columnas de filtro\n- [ ] AQE habilitado\n- [ ] Broadcast para tablas pequeñas\n\n### Durante desarrollo:\n- [ ] Revisar Spark UI\n- [ ] Buscar skew\n- [ ] Verificar shuffle\n- [ ] Cache datos reutilizados\n\n### Post-deployment:\n- [ ] OPTIMIZE schedulado\n- [ ] VACUUM schedulado\n- [ ] Monitoreo de métricas`,
      `## Performance Checklist\n\n### Before running:\n- [ ] Use Delta (not CSV/JSON)\n- [ ] Correct partitioning\n- [ ] Z-ORDER on filter columns\n- [ ] AQE enabled\n- [ ] Broadcast for small tables\n\n### During development:\n- [ ] Review Spark UI\n- [ ] Look for skew\n- [ ] Verify shuffle\n- [ ] Cache reused data\n\n### Post-deployment:\n- [ ] Scheduled OPTIMIZE\n- [ ] Scheduled VACUUM\n- [ ] Metrics monitoring`,
      `## Checklist de Performance\n\n### Antes de executar:\n- [ ] Usar Delta (não CSV/JSON)\n- [ ] Particionamento correto\n- [ ] Z-ORDER em colunas de filtro\n- [ ] AQE habilitado\n- [ ] Broadcast para tabelas pequenas\n\n### Durante desenvolvimento:\n- [ ] Revisar Spark UI\n- [ ] Buscar skew\n- [ ] Verificar shuffle\n- [ ] Cache dados reutilizados\n\n### Pós-deployment:\n- [ ] OPTIMIZE schedulado\n- [ ] VACUUM schedulado\n- [ ] Monitoramento de métricas`,
      {es: '✅ Este checklist te va a ahorrar horas de debugging.', en: '✅ This checklist will save you hours of debugging.', pt: '✅ Este checklist vai te economizar horas de debugging.'}, '✅ ¿Revisaste todos los items del checklist?', '✅ Did you review all checklist items?', '✅ Você revisou todos os items do checklist?', 20, 15),
    createStep('db-11-8', 'Production Readiness', 'Production Readiness', 'Prontidão para Produção', 'Verificá que tu pipeline esté listo para prod.', 'Verify your pipeline is ready for prod.', 'Verifique que seu pipeline está pronto para prod.',
      `## Production Checklist\n\n### Código:\n- [ ] En Git\n- [ ] Tests pasando\n- [ ] Code review hecho\n- [ ] Documentación\n\n### Pipeline:\n- [ ] Job clusters (no All-Purpose)\n- [ ] Retries configurados\n- [ ] Timeouts\n- [ ] Alertas de fallo\n\n### Datos:\n- [ ] Unity Catalog governance\n- [ ] Data quality checks\n- [ ] Particionamiento\n- [ ] Backup strategy\n\n### Operacional:\n- [ ] Monitoreo\n- [ ] Runbooks\n- [ ] On-call definido`,
      `## Production Checklist\n\n### Code:\n- [ ] In Git\n- [ ] Tests passing\n- [ ] Code review done\n- [ ] Documentation\n\n### Pipeline:\n- [ ] Job clusters (not All-Purpose)\n- [ ] Retries configured\n- [ ] Timeouts\n- [ ] Failure alerts\n\n### Data:\n- [ ] Unity Catalog governance\n- [ ] Data quality checks\n- [ ] Partitioning\n- [ ] Backup strategy\n\n### Operational:\n- [ ] Monitoring\n- [ ] Runbooks\n- [ ] On-call defined`,
      `## Checklist de Produção\n\n### Código:\n- [ ] No Git\n- [ ] Testes passando\n- [ ] Code review feito\n- [ ] Documentação\n\n### Pipeline:\n- [ ] Job clusters (não All-Purpose)\n- [ ] Retries configurados\n- [ ] Timeouts\n- [ ] Alertas de falha\n\n### Dados:\n- [ ] Unity Catalog governance\n- [ ] Data quality checks\n- [ ] Particionamento\n- [ ] Estratégia de backup\n\n### Operacional:\n- [ ] Monitoramento\n- [ ] Runbooks\n- [ ] On-call definido`,
      {es: '🚀 Este checklist es lo que revisan en empresas top.', en: '🚀 This checklist is what top companies review.', pt: '🚀 Este checklist é o que empresas top revisam.'}, '✅ ¿Tu pipeline pasa todos los checks de producción?', '✅ Does your pipeline pass all production checks?', '✅ Seu pipeline passa todos os checks de produção?', 25, 20),
    createStep('db-11-9', 'Proyecto: Pipeline Production-Ready', 'Project: Production-Ready Pipeline', 'Projeto: Pipeline Production-Ready', 'Aplicá todo lo aprendido en un pipeline completo.', 'Apply everything learned in a complete pipeline.', 'Aplique tudo o que aprendeu em um pipeline completo.',
      `## Proyecto Final: Best Practices\n\n### Requerimientos:\n- [ ] Código en Git repo\n- [ ] Estructura de proyecto correcta\n- [ ] Secrets (no passwords en código)\n- [ ] Unit tests\n- [ ] DLT con expectations\n- [ ] Job con retries/alerts\n- [ ] Monitoreo dashboard\n- [ ] Documentación completa\n\n### Bonus:\n- [ ] CI/CD con GitHub Actions\n- [ ] Feature Store\n- [ ] Data quality dashboard`,
      `## Final Project: Best Practices\n\n### Requirements:\n- [ ] Code in Git repo\n- [ ] Correct project structure\n- [ ] Secrets (no passwords in code)\n- [ ] Unit tests\n- [ ] DLT with expectations\n- [ ] Job with retries/alerts\n- [ ] Monitoring dashboard\n- [ ] Complete documentation\n\n### Bonus:\n- [ ] CI/CD with GitHub Actions\n- [ ] Feature Store\n- [ ] Data quality dashboard`,
      `## Projeto Final: Melhores Práticas\n\n### Requisitos:\n- [ ] Código em Git repo\n- [ ] Estrutura de projeto correta\n- [ ] Secrets (sem senhas no código)\n- [ ] Unit tests\n- [ ] DLT com expectations\n- [ ] Job com retries/alerts\n- [ ] Dashboard de monitoramento\n- [ ] Documentação completa\n\n### Bônus:\n- [ ] CI/CD com GitHub Actions\n- [ ] Feature Store\n- [ ] Dashboard de qualidade de dados`,
      {es: '🏆 Este proyecto demuestra que sos production-ready.', en: '🏆 This project demonstrates you\'re production-ready.', pt: '🏆 Este projeto demonstra que você é production-ready.'}, '🏆 ¿Completaste todos los requerimientos?', '🏆 Did you complete all requirements?', '🏆 Você completou todos os requisitos?', 100, 90)
  ]
};

export const PHASE_12_CERTIFICATION: DatabricksPhase = {
  id: 'db-phase-12', number: 12,
  title: { es: 'Certificación Databricks', en: 'Databricks Certification', pt: 'Certificação Databricks' },
  subtitle: { es: 'Preparación para el examen', en: 'Exam preparation', pt: 'Preparação para o exame' },
  description: { es: 'Preparate para la certificación Databricks Data Engineer Associate, una de las más demandadas del mercado.', en: 'Prepare for the Databricks Data Engineer Associate certification, one of the most in-demand in the market.', pt: 'Prepare-se para a certificação Databricks Data Engineer Associate, uma das mais demandadas do mercado.' },
  icon: '🎓', color: 'gold', estimatedDays: '5-7 días',
  steps: [
    createStep('db-12-1', 'Overview del Examen', 'Exam Overview', 'Visão Geral do Exame', 'Conocé la estructura y contenido del examen.', 'Know the structure and content of the exam.', 'Conheça a estrutura e conteúdo do exame.',
      `## Databricks DE Associate\n\n### Formato:\n- 45 preguntas\n- 90 minutos\n- 70% para aprobar\n- Proctored online\n\n### Temas:\n1. Databricks Lakehouse Platform (24%)\n2. ELT with Spark SQL & Python (29%)\n3. Incremental Processing (22%)\n4. Production Pipelines (16%)\n5. Data Governance (9%)\n\n### Costo: $200 USD\n### Validez: 2 años`,
      `## Databricks DE Associate\n\n### Format:\n- 45 questions\n- 90 minutes\n- 70% to pass\n- Proctored online\n\n### Topics:\n1. Databricks Lakehouse Platform (24%)\n2. ELT with Spark SQL & Python (29%)\n3. Incremental Processing (22%)\n4. Production Pipelines (16%)\n5. Data Governance (9%)\n\n### Cost: $200 USD\n### Validity: 2 years`,
      `## Databricks DE Associate\n\n### Formato:\n- 45 questões\n- 90 minutos\n- 70% para passar\n- Proctored online\n\n### Tópicos:\n1. Databricks Lakehouse Platform (24%)\n2. ELT com Spark SQL & Python (29%)\n3. Processamento Incremental (22%)\n4. Pipelines de Produção (16%)\n5. Governança de Dados (9%)\n\n### Custo: $200 USD\n### Validade: 2 anos`,
      {es: '📚 ELT con Spark es el tema más importante. Enfocate ahí.', en: '📚 ELT with Spark is the most important topic. Focus there.', pt: '📚 ELT com Spark é o tópico mais importante. Foque lá.'}, '🤔 ¿Cuánto tiempo tenés para el examen?', '🤔 How much time do you have for the exam?', '🤔 Quanto tempo você tem para o exame?', 15, 10),
    createStep('db-12-2', 'Temas Clave: Lakehouse Platform', 'Key Topics: Lakehouse Platform', 'Tópicos Chave: Lakehouse Platform', 'Lo que tenés que saber sobre la plataforma.', 'What you need to know about the platform.', 'O que você precisa saber sobre a plataforma.',
      `## Lakehouse Platform (24%)\n\n### Debes saber:\n- Control Plane vs Data Plane\n- Cluster types (All-Purpose vs Job)\n- Databricks Runtime versions\n- Repos y versionado\n- DBFS y almacenamiento\n\n### Preguntas típicas:\n- ¿Dónde se almacenan los datos?\n- ¿Cuándo usar Job vs All-Purpose cluster?\n- ¿Qué es un workspace?`,
      `## Lakehouse Platform (24%)\n\n### You must know:\n- Control Plane vs Data Plane\n- Cluster types (All-Purpose vs Job)\n- Databricks Runtime versions\n- Repos and versioning\n- DBFS and storage\n\n### Typical questions:\n- Where is data stored?\n- When to use Job vs All-Purpose cluster?\n- What is a workspace?`,
      `## Lakehouse Platform (24%)\n\n### Você deve saber:\n- Control Plane vs Data Plane\n- Tipos de cluster (All-Purpose vs Job)\n- Versões do Databricks Runtime\n- Repos e versionamento\n- DBFS e armazenamento\n\n### Perguntas típicas:\n- Onde os dados são armazenados?\n- Quando usar Job vs All-Purpose cluster?\n- O que é um workspace?`,
      {es: '⭐ La arquitectura de 2 planos es pregunta casi segura.', en: '⭐ The 2-plane architecture is almost certainly a question.', pt: '⭐ A arquitetura de 2 planos é quase certa de cair.'}, '✅ ¿Podés explicar Control Plane vs Data Plane?', '✅ Can you explain Control Plane vs Data Plane?', '✅ Você consegue explicar Control Plane vs Data Plane?', 25, 20),
    createStep('db-12-3', 'Temas Clave: ELT con Spark', 'Key Topics: ELT with Spark', 'Tópicos Chave: ELT com Spark', 'El tema más importante del examen.', 'The most important exam topic.', 'O tópico mais importante do exame.',
      `## ELT con Spark (29%)\n\n### Debes saber:\n- Leer/escribir datos (CSV, JSON, Parquet, Delta)\n- Transformaciones (filter, select, join, groupBy)\n- Window functions\n- SQL vs DataFrame API\n- Schema enforcement\n\n### Preguntas típicas:\n- ¿Cómo leer un CSV con header?\n- ¿Diferencia entre filter y where?\n- ¿Qué hace coalesce vs repartition?\n- ¿Cómo hacer un LEFT JOIN?`,
      `## ELT with Spark (29%)\n\n### You must know:\n- Read/write data (CSV, JSON, Parquet, Delta)\n- Transformations (filter, select, join, groupBy)\n- Window functions\n- SQL vs DataFrame API\n- Schema enforcement\n\n### Typical questions:\n- How to read a CSV with header?\n- Difference between filter and where?\n- What does coalesce vs repartition do?\n- How to do a LEFT JOIN?`,
      `## ELT com Spark (29%)\n\n### Você deve saber:\n- Ler/escrever dados (CSV, JSON, Parquet, Delta)\n- Transformações (filter, select, join, groupBy)\n- Window functions\n- SQL vs DataFrame API\n- Schema enforcement\n\n### Perguntas típicas:\n- Como ler um CSV com header?\n- Diferença entre filter e where?\n- O que faz coalesce vs repartition?\n- Como fazer um LEFT JOIN?`,
      {es: '⚡ Practicá mucho código. Este tema es 90% práctica.', en: '⚡ Practice a lot of code. This topic is 90% practice.', pt: '⚡ Pratique muito código. Este tópico é 90% prática.'}, '✅ ¿Podés escribir un ETL de memoria?', '✅ Can you write an ETL from memory?', '✅ Você consegue escrever um ETL de memória?', 30, 25),
    createStep('db-12-4', 'Temas Clave: Incremental Processing', 'Key Topics: Incremental Processing', 'Tópicos Chave: Processamento Incremental', 'Delta Lake y procesamiento incremental.', 'Delta Lake and incremental processing.', 'Delta Lake e processamento incremental.',
      `## Incremental Processing (22%)\n\n### Debes saber:\n- Delta Lake (ACID, time travel, MERGE)\n- Structured Streaming\n- Auto Loader (cloudFiles)\n- Change Data Feed\n- checkpointLocation\n\n### Preguntas típicas:\n- ¿Cómo hacer time travel a versión anterior?\n- ¿Qué hace MERGE?\n- ¿Diferencia entre append y complete mode?\n- ¿Qué es un checkpoint?`,
      `## Incremental Processing (22%)\n\n### You must know:\n- Delta Lake (ACID, time travel, MERGE)\n- Structured Streaming\n- Auto Loader (cloudFiles)\n- Change Data Feed\n- checkpointLocation\n\n### Typical questions:\n- How to time travel to previous version?\n- What does MERGE do?\n- Difference between append and complete mode?\n- What is a checkpoint?`,
      `## Processamento Incremental (22%)\n\n### Você deve saber:\n- Delta Lake (ACID, time travel, MERGE)\n- Structured Streaming\n- Auto Loader (cloudFiles)\n- Change Data Feed\n- checkpointLocation\n\n### Perguntas típicas:\n- Como fazer time travel para versão anterior?\n- O que faz MERGE?\n- Diferença entre append e complete mode?\n- O que é um checkpoint?`,
      {es: '🔷 Delta Lake es el diferenciador de Databricks. Sabélo bien.', en: '🔷 Delta Lake is Databricks\' differentiator. Know it well.', pt: '🔷 Delta Lake é o diferencial do Databricks. Saiba bem.'}, '✅ ¿Podés explicar los 3 output modes de streaming?', '✅ Can you explain the 3 streaming output modes?', '✅ Você consegue explicar os 3 output modes de streaming?', 30, 25),
    createStep('db-12-5', 'Temas Clave: Production Pipelines', 'Key Topics: Production Pipelines', 'Tópicos Chave: Pipelines de Produção', 'Workflows, DLT, y jobs.', 'Workflows, DLT, and jobs.', 'Workflows, DLT e jobs.',
      `## Production Pipelines (16%)\n\n### Debes saber:\n- Workflows (crear, schedule, dependencies)\n- Delta Live Tables (DLT)\n- Expectations (expect, expect_or_drop, expect_or_fail)\n- Job clusters\n- Notifications\n\n### Preguntas típicas:\n- ¿Cómo crear un job multi-task?\n- ¿Diferencia entre expect y expect_or_fail?\n- ¿Qué pasa si una expectation falla?`,
      `## Production Pipelines (16%)\n\n### You must know:\n- Workflows (create, schedule, dependencies)\n- Delta Live Tables (DLT)\n- Expectations (expect, expect_or_drop, expect_or_fail)\n- Job clusters\n- Notifications\n\n### Typical questions:\n- How to create a multi-task job?\n- Difference between expect and expect_or_fail?\n- What happens if an expectation fails?`,
      `## Pipelines de Produção (16%)\n\n### Você deve saber:\n- Workflows (criar, schedule, dependências)\n- Delta Live Tables (DLT)\n- Expectations (expect, expect_or_drop, expect_or_fail)\n- Job clusters\n- Notificações\n\n### Perguntas típicas:\n- Como criar um job multi-task?\n- Diferença entre expect e expect_or_fail?\n- O que acontece se uma expectation falha?`,
      {es: '📊 Las 3 expectations de DLT son pregunta casi segura.', en: '📊 The 3 DLT expectations are almost certain questions.', pt: '📊 As 3 expectations do DLT são quase certas de cair.'}, '✅ ¿Cuál es la diferencia entre las 3 expectations?', '✅ What\'s the difference between the 3 expectations?', '✅ Qual é a diferença entre as 3 expectations?', 25, 20),
    createStep('db-12-6', 'Temas Clave: Data Governance', 'Key Topics: Data Governance', 'Tópicos Chave: Governança de Dados', 'Unity Catalog y permisos.', 'Unity Catalog and permissions.', 'Unity Catalog e permissões.',
      `## Data Governance (9%)\n\n### Debes saber:\n- Unity Catalog (catalog > schema > table)\n- Permisos (GRANT, REVOKE)\n- Managed vs External tables\n- Data lineage\n- Audit logs\n\n### Preguntas típicas:\n- ¿Qué pasa al hacer DROP en managed vs external?\n- ¿Cómo dar SELECT a un grupo?\n- ¿Qué es un metastore?`,
      `## Data Governance (9%)\n\n### You must know:\n- Unity Catalog (catalog > schema > table)\n- Permissions (GRANT, REVOKE)\n- Managed vs External tables\n- Data lineage\n- Audit logs\n\n### Typical questions:\n- What happens when DROP on managed vs external?\n- How to give SELECT to a group?\n- What is a metastore?`,
      `## Governança de Dados (9%)\n\n### Você deve saber:\n- Unity Catalog (catalog > schema > table)\n- Permissões (GRANT, REVOKE)\n- Managed vs External tables\n- Data lineage\n- Audit logs\n\n### Perguntas típicas:\n- O que acontece ao fazer DROP em managed vs external?\n- Como dar SELECT a um grupo?\n- O que é um metastore?`,
      {es: '🔐 Managed vs External es pregunta frecuente.', en: '🔐 Managed vs External is a frequent question.', pt: '🔐 Managed vs External é pergunta frequente.'}, '✅ ¿Qué pasa al hacer DROP TABLE en cada tipo?', '✅ What happens when you DROP TABLE on each type?', '✅ O que acontece ao fazer DROP TABLE em cada tipo?', 25, 20),
    createStep('db-12-7', 'Practice Tests y Recursos', 'Practice Tests and Resources', 'Testes Práticos e Recursos', 'Recursos para prepararte.', 'Resources to prepare.', 'Recursos para se preparar.',
      `## Recursos de Estudio\n\n### Oficiales:\n- Databricks Academy (gratis)\n- Practice Exam oficial\n- Documentación\n\n### Comunidad:\n- Udemy: "Databricks Certified Data Engineer Associate"\n- YouTube: Databricks channel\n- Reddit: r/databricks\n\n### Tips:\n- Hacé TODOS los labs de Databricks Academy\n- Practicá en Free Edition (gratis)\n- Tomá el practice exam 2+ veces\n- Leé documentación de Delta Lake`,
      `## Study Resources\n\n### Official:\n- Databricks Academy (free)\n- Official Practice Exam\n- Documentation\n\n### Community:\n- Udemy: "Databricks Certified Data Engineer Associate"\n- YouTube: Databricks channel\n- Reddit: r/databricks\n\n### Tips:\n- Do ALL Databricks Academy labs\n- Practice in Free Edition (free)\n- Take practice exam 2+ times\n- Read Delta Lake documentation`,
      `## Recursos de Estudo\n\n### Oficiais:\n- Databricks Academy (grátis)\n- Practice Exam oficial\n- Documentação\n\n### Comunidade:\n- Udemy: "Databricks Certified Data Engineer Associate"\n- YouTube: Canal Databricks\n- Reddit: r/databricks\n\n### Dicas:\n- Faça TODOS os labs do Databricks Academy\n- Pratique no Free Edition (grátis)\n- Faça o practice exam 2+ vezes\n- Leia documentação do Delta Lake`,
      {es: '📚 Databricks Academy es el recurso #1. Es gratis y oficial.', en: '📚 Databricks Academy is resource #1. It\'s free and official.', pt: '📚 Databricks Academy é o recurso #1. É grátis e oficial.'}, '✅ ¿Te registraste en Databricks Academy?', '✅ Did you register on Databricks Academy?', '✅ Você se registrou no Databricks Academy?', 20, 15),
    createStep('db-12-8', 'Estrategia de Examen', 'Exam Strategy', 'Estratégia de Exame', 'Tips para el día del examen.', 'Tips for exam day.', 'Dicas para o dia do exame.',
      `## Día del Examen\n\n### Antes:\n- Dormí bien\n- Probá tu setup (cámara, micrófono)\n- Ambiente silencioso\n- Documento de identidad listo\n\n### Durante:\n- 2 min por pregunta máximo\n- Marcá las difíciles y seguí\n- Lee TODA la pregunta\n- Buscá keywords en opciones\n- Si no sabés, eliminá opciones\n\n### Después:\n- Resultado inmediato\n- Badge en 24-48hs\n- Agregá a LinkedIn!\n\n### ¡ÉXITOS! 🎉`,
      `## Exam Day\n\n### Before:\n- Sleep well\n- Test your setup (camera, microphone)\n- Quiet environment\n- ID document ready\n\n### During:\n- 2 min per question max\n- Mark difficult ones and continue\n- Read the ENTIRE question\n- Look for keywords in options\n- If unsure, eliminate options\n\n### After:\n- Immediate result\n- Badge in 24-48h\n- Add to LinkedIn!\n\n### GOOD LUCK! 🎉`,
      `## Dia do Exame\n\n### Antes:\n- Durma bem\n- Teste seu setup (câmera, microfone)\n- Ambiente silencioso\n- Documento de identidade pronto\n\n### Durante:\n- 2 min por questão máximo\n- Marque as difíceis e continue\n- Leia a questão INTEIRA\n- Busque keywords nas opções\n- Se não souber, elimine opções\n\n### Depois:\n- Resultado imediato\n- Badge em 24-48h\n- Adicione ao LinkedIn!\n\n### BOA SORTE! 🎉`,
      {es: '🎯 Lee toda la pregunta. Muchos errores vienen de no leer bien.', en: '🎯 Read the whole question. Many errors come from not reading well.', pt: '🎯 Leia toda a questão. Muitos erros vêm de não ler bem.'}, '🏆 ¡Estás listo para certificarte!', '🏆 You\'re ready to get certified!', '🏆 Você está pronto para se certificar!', 30, 20)
  ]
};

// Export all phases as an array for easy use in the index
export const DATABRICKS_PHASES_9_12_FINAL: DatabricksPhase[] = [
  PHASE_9_SQL_WAREHOUSE,
  PHASE_10_MLFLOW,
  PHASE_11_BEST_PRACTICES,
  PHASE_12_CERTIFICATION
];
