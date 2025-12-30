import { Project } from '../../../types/members';

export const p3MonitoringAlerting: Project = {
  id: 'p3-monitoring-alerting',
  level: 3,
  title: {
    es: 'Monitoring y Alertas para Pipelines',
    pt: 'Monitoramento e Alertas para Pipelines'
  },
  description: {
    es: 'Implementá observabilidad completa. Un Senior sabe cuando algo falla ANTES de que el usuario lo reporte.',
    pt: 'Implemente observabilidade completa. Um Sênior sabe quando algo falha ANTES que o usuário reporte.'
  },
  difficulty: 'Expert',
  duration: '5-6 horas',
  skills: [
    { es: 'Monitoring', pt: 'Monitoramento' },
    { es: 'Prometheus', pt: 'Prometheus' },
    { es: 'Grafana', pt: 'Grafana' },
    { es: 'Alerting', pt: 'Alertas' },
    { es: 'Observability', pt: 'Observabilidade' }
  ],
  icon: '📊',
  color: 'purple',
  prerequisites: ['p6-airflow-orchestration', 'p7-data-quality'],
  estimatedLines: 150,
  realWorldExample: {
    es: 'Así monitorea el equipo de Data Platform de Netflix sus pipelines',
    pt: 'Assim a equipe de Data Platform da Netflix monitora seus pipelines'
  },
  usedBy: ['Netflix', 'Datadog', 'Grafana Labs', 'New Relic'],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Dashboard de Grafana', pt: 'Dashboard do Grafana' },
      example: `┌─────────────────────────────────────────┐
│ ETL Pipeline Dashboard                  │
├──────────────┬──────────────┬───────────┤
│ Throughput   │ Error Rate   │ Latency   │
│ 1.2K/s  ↑5%  │ 0.02%   ✓    │ p99: 2.3s │
├──────────────┴──────────────┴───────────┤
│ [Graph: Records/sec over 24h]           │
├─────────────────────────────────────────┤
│ Active Alerts: 0  │  Last run: 2m ago   │
└─────────────────────────────────────────┘`
    },
  ],
  learningObjectives: [
    { es: 'Definir métricas clave (SLIs/SLOs)', pt: 'Definir métricas chave (SLIs/SLOs)' },
    { es: 'Instrumentar código con métricas', pt: 'Instrumentar código com métricas' },
    { es: 'Crear dashboards informativos', pt: 'Criar dashboards informativos' },
    { es: 'Configurar alertas accionables', pt: 'Configurar alertas acionáveis' },
    { es: 'Escribir runbooks para incidentes', pt: 'Escrever runbooks para incidentes' },
  ],
  interviewStory: {
    hook: {
      es: "Implementé observabilidad completa que redujo el tiempo de detección de incidentes de 4 horas a 2 minutos.",
      pt: "Implementei observabilidade completa que reduziu o tempo de detecção de incidentes de 4 horas para 2 minutos."
    },
    situation: {
      es: "Los pipelines fallaban y nadie se enteraba hasta que el equipo de negocio preguntaba por qué los dashboards estaban vacíos. No había monitoreo.",
      pt: "Os pipelines falhavam e ninguém ficava sabendo até que a equipe de negócios perguntasse por que os dashboards estavam vazios. Não havia monitoramento."
    },
    task: {
      es: "Implementar observabilidad end-to-end: métricas, dashboards, alertas y runbooks.",
      pt: "Implementar observabilidade end-to-end: métricas, dashboards, alertas e runbooks."
    },
    actions: [
      { es: "Definí SLIs/SLOs con el equipo de producto (latencia <5min, error rate <0.1%)", pt: "Defini SLIs/SLOs com a equipe de produto (latência <5min, taxa de erro <0.1%)" },
      { es: "Instrumenté pipelines con Prometheus: throughput, latencia, errores", pt: "Instrumentei pipelines com Prometheus: throughput, latência, erros" },
      { es: "Creé dashboards en Grafana con las métricas más importantes", pt: "Criei dashboards no Grafana com as métricas mais importantes" },
      { es: "Configuré alertas con PagerDuty: críticas despiertan, warnings esperan", pt: "Configurei alertas com PagerDuty: críticas acordam, warnings esperam" },
      { es: "Escribí runbooks para cada alerta con pasos de diagnóstico y resolución", pt: "Escrevi runbooks para cada alerta com passos de diagnóstico e resolução" }
    ],
    results: [
      { es: "Tiempo de detección: de 4 horas a 2 minutos", pt: "Tempo de detecção: de 4 horas para 2 minutos" },
      { es: "MTTR (tiempo de resolución): de 2 horas a 15 minutos con runbooks", pt: "MTTR (tempo de resolução): de 2 horas para 15 minutos com runbooks" },
      { es: "SLO de 99.9% cumplido por 6 meses consecutivos", pt: "SLO de 99.9% cumprido por 6 meses consecutivos" },
      { es: "El equipo de negocio confía en que los datos están frescos", pt: "A equipe de negócios confia que os dados estão frescos" }
    ],
    learnings: [
      { es: "Las alertas deben ser accionables - si no sabés qué hacer, no alertes", pt: "Os alertas devem ser acionáveis - se não sabe o que fazer, não alerte" },
      { es: "Menos métricas es más - 5 métricas bien elegidas > 50 métricas random", pt: "Menos métricas é mais - 5 métricas bem escolhidas > 50 métricas aleatórias" },
      { es: "Los runbooks se escriben ANTES del incidente, no durante", pt: "Os runbooks são escritos ANTES do incidente, não durante" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Qué métricas monitoreas para un pipeline de datos?", pt: "Quais métricas você monitora para um pipeline de dados?" },
        answer: { es: "Los 4 golden signals: latencia (p50, p99), throughput (records/sec), error rate, y data freshness. Específico de data: data quality score y schema drift.", pt: "Os 4 golden signals: latência (p50, p99), throughput (registros/seg), taxa de erro, e data freshness. Específico de data: pontuação de qualidade de dados e schema drift." }
      },
      {
        question: { es: "¿Cómo evitás alert fatigue?", pt: "Como você evita a fadiga de alertas?" },
        answer: { es: "1) Solo alertas accionables, 2) Agregar delays para evitar flapping, 3) Diferentes severidades (crítico despierta, warning espera), 4) Revisar y eliminar alertas inútiles.", pt: "1) Apenas alertas acionáveis, 2) Adicionar delays para evitar flapping, 3) Diferentes severidades (crítico acorda, warning espera), 4) Revisar e eliminar alertas inúteis." }
      },
      {
        question: { es: "¿Qué es un SLO y cómo lo definís?", pt: "O que é um SLO e como você o define?" },
        answer: { es: "SLO = objetivo de nivel de servicio. Lo defino con el negocio: '99.9% de los datos disponibles en <5 minutos'. El SLI es la métrica que mido, el SLO es el objetivo.", pt: "SLO = objetivo de nível de serviço. Defino com o negócio: '99.9% dos dados disponíveis em <5 minutos'. O SLI é a métrica que meço, o SLO é o objetivo." }
      }
    ],
    closingStatement: { es: "Sin observabilidad, estás volando a ciegas. Es lo primero que implemento en cualquier sistema.", pt: "Sem observabilidade, você está voando às cegas. É a primeira coisa que implemento em qualquer sistema." }
  },
  steps: [
    {
      order: 1,
      text: { es: '📊 Definí métricas clave', pt: '📊 Defina métricas chave' },
      explanation: {
        es: `**SLIs (Service Level Indicators):**
- **Latencia**: ¿Cuánto tarda el pipeline?
- **Throughput**: ¿Cuántos registros/segundo?
- **Error Rate**: ¿Qué % falla?
- **Data Freshness**: ¿Qué tan actualizados están los datos?

**SLOs (Service Level Objectives):**
- Latencia p99 < 5 minutos
- Error rate < 1%
- Data freshness < 1 hora
- Disponibilidad > 99.9%`,
        pt: `**SLIs (Service Level Indicators):**
- **Latência**: Quanto demora o pipeline?
- **Throughput**: Quantos registros/segundo?
- **Taxa de Erro**: Qual % falha?
- **Data Freshness**: Quão atualizados estão os dados?

**SLOs (Service Level Objectives):**
- Latência p99 < 5 minutos
- Taxa de erro < 1%
- Data freshness < 1 hora
- Disponibilidade > 99.9%`
      },
      checkpoint: { es: '¿Definiste SLIs y SLOs para tu pipeline?', pt: 'Definiu SLIs e SLOs para seu pipeline?' }
    },
    {
      order: 2,
      text: { es: '🐳 Levantá Prometheus + Grafana', pt: '🐳 Levante Prometheus + Grafana' },
      code: `# docker-compose.yml
version: '3.8'
services:
  prometheus:
    image: prom/prometheus:latest
    ports:
      - "9090:9090"
    volumes:
      - ./prometheus.yml:/etc/prometheus/prometheus.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3000:3000"
    environment:
      - GF_SECURITY_ADMIN_PASSWORD=admin`,
      explanation: { es: 'Prometheus recolecta métricas, Grafana las visualiza.', pt: 'Prometheus coleta métricas, Grafana as visualiza.' },
      checkpoint: { es: '¿Podés acceder a Grafana en http://localhost:3000?', pt: 'Consegue acessar Grafana em http://localhost:3000?' }
    },
    {
      order: 3,
      text: { es: '📈 Instrumentá tu pipeline', pt: '📈 Instrumente seu pipeline' },
      code: `# metrics.py
from prometheus_client import Counter, Histogram, Gauge, start_http_server

# Métricas
RECORDS_PROCESSED = Counter(
    'pipeline_records_processed_total',
    'Total records processed',
    ['pipeline', 'status']
)

PROCESSING_TIME = Histogram(
    'pipeline_processing_seconds',
    'Time spent processing',
    ['pipeline'],
    buckets=[1, 5, 10, 30, 60, 120, 300]
)

DATA_FRESHNESS = Gauge(
    'pipeline_data_freshness_seconds',
    'Seconds since last data update',
    ['pipeline']
)

# Usar en el código
def process_batch(records):
    with PROCESSING_TIME.labels(pipeline='etl').time():
        for record in records:
            try:
                process(record)
                RECORDS_PROCESSED.labels(pipeline='etl', status='success').inc()
            except Exception as e:
                RECORDS_PROCESSED.labels(pipeline='etl', status='error').inc()
                raise`,
      explanation: { es: 'prometheus_client expone métricas que Prometheus recolecta.', pt: 'prometheus_client expõe métricas que Prometheus coleta.' },
      tip: { es: 'Usá labels para segmentar métricas (por pipeline, por status, etc).', pt: 'Use labels para segmentar métricas (por pipeline, por status, etc).' }
    },
    {
      order: 4,
      text: { es: '📊 Creá dashboard en Grafana', pt: '📊 Crie dashboard no Grafana' },
      explanation: {
        es: `Creá un dashboard con:

**Panel 1: Throughput**
- Query: rate(pipeline_records_processed_total[5m])
- Tipo: Graph

**Panel 2: Error Rate**
- Query: rate(pipeline_records_processed_total{status="error"}[5m]) / rate(pipeline_records_processed_total[5m])
- Tipo: Gauge

**Panel 3: Latencia (p99)**
- Query: histogram_quantile(0.99, rate(pipeline_processing_seconds_bucket[5m]))
- Tipo: Graph

**Panel 4: Data Freshness**
- Query: pipeline_data_freshness_seconds
- Tipo: Stat`,
        pt: `Crie um dashboard com:

**Painel 1: Throughput**
- Query: rate(pipeline_records_processed_total[5m])
- Tipo: Graph

**Painel 2: Taxa de Erro**
- Query: rate(pipeline_records_processed_total{status="error"}[5m]) / rate(pipeline_records_processed_total[5m])
- Tipo: Gauge

**Painel 3: Latência (p99)**
- Query: histogram_quantile(0.99, rate(pipeline_processing_seconds_bucket[5m]))
- Tipo: Graph

**Painel 4: Data Freshness**
- Query: pipeline_data_freshness_seconds
- Tipo: Stat`
      },
      checkpoint: { es: '¿Tu dashboard muestra las 4 métricas clave?', pt: 'Seu dashboard mostra as 4 métricas chave?' }
    },
    {
      order: 5,
      text: { es: '🔔 Configurá alertas', pt: '🔔 Configure alertas' },
      code: `# alerting_rules.yml
groups:
  - name: pipeline_alerts
    rules:
      - alert: HighErrorRate
        expr: rate(pipeline_records_processed_total{status="error"}[5m]) / rate(pipeline_records_processed_total[5m]) > 0.01
        for: 5m
        labels:
          severity: critical
        annotations:
          summary: "High error rate in pipeline"
          description: "Error rate is {{ $value | humanizePercentage }}"
      
      - alert: DataStale
        expr: pipeline_data_freshness_seconds > 3600
        for: 10m
        labels:
          severity: warning
        annotations:
          summary: "Data is stale"
          description: "Data is {{ $value | humanizeDuration }} old"`,
      explanation: { es: 'Las alertas deben ser accionables. Si no sabés qué hacer cuando suena, no sirve.', pt: 'Os alertas devem ser acionáveis. Se não sabe o que fazer quando toca, não serve.' },
      tip: { es: 'Usá "for: 5m" para evitar alertas por picos momentáneos.', pt: 'Use "for: 5m" para evitar alertas por picos momentâneos.' }
    },
    {
      order: 6,
      text: { es: '📝 Implementá logging estructurado', pt: '📝 Implemente logging estruturado' },
      code: `import logging
import json
from datetime import datetime

class StructuredLogger:
    def __init__(self, name: str):
        self.logger = logging.getLogger(name)
        self.logger.setLevel(logging.INFO)
        handler = logging.StreamHandler()
        handler.setFormatter(logging.Formatter('%(message)s'))
        self.logger.addHandler(handler)
    
    def log(self, level: str, message: str, **kwargs):
        log_entry = {
            'timestamp': datetime.utcnow().isoformat(),
            'level': level,
            'message': message,
            **kwargs
        }
        self.logger.info(json.dumps(log_entry))

# Uso
logger = StructuredLogger('pipeline')
logger.log('INFO', 'Processing batch', batch_id=123, records=1000)
logger.log('ERROR', 'Failed to process', batch_id=123, error='Connection timeout')`,
      explanation: { es: 'Logs estructurados (JSON) son más fáciles de buscar y analizar.', pt: 'Logs estruturados (JSON) são mais fáceis de buscar e analisar.' }
    },
    {
      order: 7,
      text: { es: '📚 Escribí runbooks', pt: '📚 Escreva runbooks' },
      code: `# Runbook: HighErrorRate Alert

## Descripción
El pipeline tiene error rate > 1% por más de 5 minutos.

## Impacto
Datos no se procesan correctamente. Dashboards pueden mostrar datos incompletos.

## Diagnóstico
1. Ver logs del pipeline: \`kubectl logs -l app=pipeline\`
2. Buscar errores específicos: \`grep "ERROR" logs | tail -50\`
3. Verificar dependencias (API, DB): \`curl health-check-url\`

## Resolución

### Si es error de conexión a API
1. Verificar status de la API externa
2. Si está caída, esperar o escalar

### Si es error de datos
1. Identificar registros problemáticos
2. Filtrarlos temporalmente
3. Crear ticket para fix

### Si es error de memoria
1. Verificar uso de memoria: \`kubectl top pods\`
2. Escalar si es necesario: \`kubectl scale deployment pipeline --replicas=3\`

## Escalación
Si no se resuelve en 30 min, escalar a @data-platform-oncall`,
      explanation: { es: 'Un runbook dice exactamente qué hacer cuando suena una alerta.', pt: 'Um runbook diz exatamente o que fazer quando toca um alerta.' },
      checkpoint: { es: '¿Tus runbooks son claros y accionables?', pt: 'Seus runbooks são claros e acionáveis?' }
    },
  ],
  deliverable: { es: 'docker-compose + código instrumentado + dashboards + runbooks', pt: 'docker-compose + código instrumentado + dashboards + runbooks' },
  evaluation: [
    { es: '¿Las métricas cubren los casos críticos?', pt: 'As métricas cobrem os casos críticos?' },
    { es: '¿Las alertas son accionables?', pt: 'Os alertas são acionáveis?' },
    { es: '¿Los dashboards muestran el estado del sistema?', pt: 'Os dashboards mostram o estado do sistema?' },
    { es: '¿Los runbooks son claros?', pt: 'Os runbooks são claros?' },
    { es: '¿Los logs son estructurados y buscables?', pt: 'Os logs são estruturados e buscáveis?' },
  ],
  theory: {
    es: `## Los 3 Pilares de Observabilidad

### 1. Logs
- Qué pasó (texto)
- Estructurados (JSON) para búsqueda
- Niveles: DEBUG, INFO, WARN, ERROR

### 2. Metrics
- Cuánto/cuándo (números)
- Agregables (promedios, percentiles)
- Tipos: Counter, Gauge, Histogram

### 3. Traces
- Cómo fluyó (request path)
- Distribuidos (entre servicios)
- Útil para debugging

## Métricas Clave para Pipelines

| Métrica | Tipo | Qué mide |
|---------|------|----------|
| Throughput | Counter | Registros/segundo |
| Latency | Histogram | Tiempo de procesamiento |
| Error Rate | Counter | % de errores |
| Data Freshness | Gauge | Edad de los datos |

## Alertas Efectivas

✅ Accionables: Sabés qué hacer
✅ Específicas: Dicen qué está mal
✅ Con contexto: Links a dashboards/runbooks

❌ Ruidosas: Suenan sin ser problema
❌ Vagas: "Algo está mal"
❌ Sin runbook: No sabés qué hacer`,
    pt: `## Os 3 Pilares da Observabilidade

### 1. Logs
- O que aconteceu (texto)
- Estruturados (JSON) para busca
- Níveis: DEBUG, INFO, WARN, ERROR

### 2. Metrics
- Quanto/quando (números)
- Agregáveis (médias, percentis)
- Tipos: Counter, Gauge, Histogram

### 3. Traces
- Como fluiu (request path)
- Distribuídos (entre serviços)
- Útil para debugging

## Métricas Chave para Pipelines

| Métrica | Tipo | O que mede |
|---------|------|----------|
| Throughput | Counter | Registros/segundo |
| Latência | Histogram | Tempo de processamento |
| Taxa de Erro | Counter | % de erros |
| Data Freshness | Gauge | Idade dos dados |

## Alertas Efetivos

✅ Acionáveis: Sabe o que fazer
✅ Específicos: Dizem o que está errado
✅ Com contexto: Links para dashboards/runbooks

❌ Ruidosos: Tocam sem ser problema
❌ Vagos: "Algo está errado"
❌ Sem runbook: Não sabe o que fazer`
  },
};


