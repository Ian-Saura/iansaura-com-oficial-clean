import { Project } from '../../../types/members';

export const p2_streaming_basics: Project = {
  id: 'p2-streaming-basics',
  level: 2,
  title: { es: 'Introducción a Streaming con Python', en: 'Introduction to Streaming with Python', pt: 'Introdução a Streaming com Python' },
  description: {
    es: 'Procesá datos en tiempo real (simulado). Preparación para Kafka y sistemas de streaming reales.',
    en: 'Process real-time data (simulated). Preparation for Kafka and real streaming systems.',
    pt: 'Processe dados em tempo real (simulado). Preparação para Kafka e sistemas de streaming reais.'
  },
  difficulty: 'Avanzado',
  duration: '4-5 horas',
  skills: [{ es: 'Python' }, { es: 'Streaming' }, { es: 'Queues', en: 'Queues', pt: 'Filas' }, { es: 'Real-time Processing', en: 'Real-time Processing', pt: 'Processamento em Tempo Real' }],
  icon: '🌊',
  color: 'blue',
  datasetId: 'iot',
  prerequisites: ['p1-etl-python', 'p6-airflow-orchestration'],
  estimatedLines: 120,
  realWorldExample: {
    es: 'Así procesa Uber eventos de viajes en tiempo real para calcular precios dinámicos',
    en: 'This is how Uber processes trip events in real-time to calculate surge pricing',
    pt: 'Assim a Uber processa eventos de viagens em tempo real para calcular preços dinâmicos'
  },
  usedBy: ['Uber', 'Lyft', 'Twitter', 'LinkedIn', 'Confluent'],
  expectedOutputs: [
    {
      step: 5,
      description: { es: 'Streaming en acción', en: 'Streaming in action', pt: 'Streaming em ação' },
      example: `[Producer] Sending: {"sensor_id": 42, "temp": 23.5, "ts": "2024-01-15T10:30:00"}
[Consumer] Received: sensor_42 = 23.5°C
[Producer] Sending: {"sensor_id": 42, "temp": 24.1, "ts": "2024-01-15T10:30:01"}
[Consumer] Received: sensor_42 = 24.1°C (⚠️ +0.6°C)
[Alert] Temperature spike detected!

Processed: 1000 events/second`
    },
  ],
  learningObjectives: [
    { es: 'Entender producer/consumer pattern', en: 'Understand producer/consumer pattern', pt: 'Entender padrão producer/consumer' },
    { es: 'Implementar colas en memoria', en: 'Implement in-memory queues', pt: 'Implementar filas em memória' },
    { es: 'Procesar eventos en ventanas de tiempo', en: 'Process events in time windows', pt: 'Processar eventos em janelas de tempo' },
    { es: 'Manejar backpressure', en: 'Handle backpressure', pt: 'Lidar com backpressure' },
    { es: 'Garantizar procesamiento sin pérdida', en: 'Ensure lossless processing', pt: 'Garantir processamento sem perda' },
  ],
  interviewStory: {
    hook: { es: "Construí un sistema de streaming que procesa 10,000 eventos por segundo y detecta anomalías en tiempo real.", en: "Built a streaming system processing 10,000 events per second and detecting anomalies in real-time.", pt: "Construí um sistema de streaming que processa 10.000 eventos por segundo e detecta anomalias em tempo real." },
    situation: { es: "Teníamos sensores IoT enviando datos cada segundo, pero los procesábamos en batch diario. Cuando un sensor fallaba, nos enterábamos al día siguiente.", en: "We had IoT sensors sending data every second, but processed it in daily batch. When a sensor failed, we found out the next day.", pt: "Tínhamos sensores IoT enviando dados a cada segundo, mas processávamos em batch diário. Quando um sensor falhava, descobríamos no dia seguinte." },
    task: { es: "Implementar procesamiento en tiempo real para detectar anomalías inmediatamente.", en: "Implement real-time processing to detect anomalies immediately.", pt: "Implementar processamento em tempo real para detectar anomalias imediatamente." },
    actions: [
      { es: "Diseñé arquitectura producer/consumer con colas en memoria", en: "Designed producer/consumer architecture with in-memory queues", pt: "Projetei arquitetura producer/consumer com filas em memória" },
      { es: "Implementé windowing para calcular promedios móviles", en: "Implemented windowing to calculate moving averages", pt: "Implementei windowing para calcular médias móveis" },
      { es: "Agregué detección de anomalías: si temp > 2 std dev, alerta", en: "Added anomaly detection: if temp > 2 std dev, alert", pt: "Adicionei detecção de anomalias: se temp > 2 std dev, alerta" },
      { es: "Manejé backpressure para no perder eventos cuando el consumer es lento", en: "Handled backpressure to not lose events when consumer is slow", pt: "Lidei com backpressure para não perder eventos quando o consumer é lento" },
      { es: "Implementé checkpointing para recovery sin pérdida de datos", en: "Implemented checkpointing for recovery without data loss", pt: "Implementei checkpointing para recuperação sem perda de dados" }
    ],
    results: [
      { es: "Detección de anomalías: de 24 horas a 5 segundos", en: "Anomaly detection: from 24 hours to 5 seconds", pt: "Detecção de anomalias: de 24 horas para 5 segundos" },
      { es: "Procesamos 10,000 eventos/segundo sin pérdida", en: "Processed 10,000 events/second without loss", pt: "Processamos 10.000 eventos/segundo sem perda" },
      { es: "Prevenimos 3 fallas de equipos que habrían costado $50K cada una", en: "Prevented 3 equipment failures that would have cost $50K each", pt: "Prevenimos 3 falhas de equipamentos que teriam custado $50K cada uma" },
      { es: "Sistema base listo para migrar a Kafka en producción", en: "Base system ready to migrate to Kafka in production", pt: "Sistema base pronto para migrar para Kafka em produção" }
    ],
    learnings: [
      { es: "Streaming no es 'batch más rápido' - es un paradigma diferente", en: "Streaming is not 'faster batch' - it's a different paradigm", pt: "Streaming não é 'batch mais rápido' - é um paradigma diferente" },
      { es: "Backpressure es crítico - sin él, perdés datos o crasheás", en: "Backpressure is critical - without it, you lose data or crash", pt: "Backpressure é crítico - sem ele, perde dados ou quebra" },
      { es: "Windowing es la clave para hacer cálculos útiles en streaming", en: "Windowing is key to doing useful calculations in streaming", pt: "Windowing é a chave para fazer cálculos úteis em streaming" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cuál es la diferencia entre streaming y batch?", en: "What is the difference between streaming and batch?", pt: "Qual a diferença entre streaming e batch?" },
        answer: { es: "Batch procesa datos históricos en chunks. Streaming procesa eventos a medida que llegan, uno por uno. Streaming tiene latencia baja pero es más complejo de implementar correctamente.", en: "Batch processes historical data in chunks. Streaming processes events as they arrive, one by one. Streaming has low latency but is more complex to implement correctly.", pt: "Batch processa dados históricos em chunks. Streaming processa eventos à medida que chegam, um por um. Streaming tem latência baixa mas é mais complexo de implementar corretamente." }
      },
      {
        question: { es: "¿Cómo garantizás que no se pierdan eventos?", en: "How do you ensure events are not lost?", pt: "Como garante que não se percam eventos?" },
        answer: { es: "1) Acknowledgments: el consumer confirma que procesó, 2) Checkpointing: guardo offset periódicamente, 3) Replay: si falla, puedo reprocesar desde el último checkpoint.", en: "1) Acknowledgments: consumer confirms processing, 2) Checkpointing: save offset periodically, 3) Replay: if failure, reprocess from last checkpoint.", pt: "1) Acknowledgments: o consumer confirma que processou, 2) Checkpointing: guardo offset periodicamente, 3) Replay: se falhar, posso reprocessar desde o último checkpoint." }
      },
      {
        question: { es: "¿Qué es backpressure y cómo lo manejás?", en: "What is backpressure and how do you handle it?", pt: "O que é backpressure e como lida com ele?" },
        answer: { es: "Es cuando el producer genera más rápido de lo que el consumer procesa. Opciones: 1) Buffer con límite y drop oldest, 2) Slow down producer, 3) Scale out consumers. Depende del caso de uso.", en: "It's when producer generates faster than consumer processes. Options: 1) Buffer with limit and drop oldest, 2) Slow down producer, 3) Scale out consumers. Depends on use case.", pt: "É quando o producer gera mais rápido do que o consumer processa. Opções: 1) Buffer com limite e drop oldest, 2) Slow down producer, 3) Scale out consumers. Depende do caso de uso." }
      }
    ],
    closingStatement: { es: "Streaming es el futuro de data engineering - batch ya no es suficiente para muchos casos de uso.", en: "Streaming is the future of data engineering - batch is no longer enough for many use cases.", pt: "Streaming é o futuro de data engineering - batch já não é suficiente para muitos casos de uso." }
  },
  steps: [
    { 
      order: 1, 
      text: { es: '📤 Creá el Producer', en: '📤 Create the Producer', pt: '📤 Crie o Producer' },
      code: `# producer.py
import json
import time
import random
from datetime import datetime
from queue import Queue

def generate_event():
    """Genera un evento IoT simulado."""
    return {
        "device_id": f"device_{random.randint(1, 100)}",
        "temperature": round(random.uniform(20, 30), 2),
        "humidity": round(random.uniform(40, 80), 2),
        "timestamp": datetime.now().isoformat()
    }

def producer(queue: Queue, events_per_second: int = 10):
    """Produce eventos continuamente."""
    while True:
        event = generate_event()
        queue.put(event)
        print(f"Produced: {event['device_id']} - {event['temperature']}°C")
        time.sleep(1 / events_per_second)`,
      explanation: { es: 'El producer genera eventos y los pone en una cola. En producción, sería Kafka.', en: 'Producer generates events and puts them in a queue. In production, this would be Kafka.', pt: 'O producer gera eventos e os coloca numa fila. Em produção, seria Kafka.' }
    },
    { 
      order: 2, 
      text: { es: '📥 Creá el Consumer', en: '📥 Create the Consumer', pt: '📥 Crie o Consumer' },
      code: `# consumer.py
from queue import Queue, Empty
from collections import defaultdict
import time

def consumer(queue: Queue, window_seconds: int = 10):
    """Consume y agrega eventos en ventanas de tiempo."""
    window_data = defaultdict(list)
    window_start = time.time()
    
    while True:
        try:
            event = queue.get(timeout=1)
            device_id = event['device_id']
            window_data[device_id].append(event['temperature'])
            
        except Empty:
            pass
        
        # Cada window_seconds, emitir agregados
        if time.time() - window_start >= window_seconds:
            print(f"\\n=== Window Summary ===")
            for device_id, temps in window_data.items():
                avg_temp = sum(temps) / len(temps)
                print(f"{device_id}: avg={avg_temp:.2f}°C ({len(temps)} events)")
            
            window_data.clear()
            window_start = time.time()`,
      explanation: { es: 'El consumer lee eventos y los agrega en ventanas de tiempo (tumbling window).', en: 'Consumer reads events and aggregates them in time windows (tumbling window).', pt: 'O consumer lê eventos e os agrega em janelas de tempo (tumbling window).' }
    },
    { 
      order: 3, 
      text: { es: '🔗 Conectá producer y consumer', en: '🔗 Connect producer and consumer', pt: '🔗 Conecte producer e consumer' },
      code: `# main.py
import threading
from queue import Queue

from producer import producer
from consumer import consumer

def main():
    queue = Queue(maxsize=1000)  # Límite para backpressure
    
    # Iniciar producer en thread separado
    producer_thread = threading.Thread(
        target=producer, 
        args=(queue, 10),  # 10 eventos/segundo
        daemon=True
    )
    
    # Iniciar consumer
    consumer_thread = threading.Thread(
        target=consumer,
        args=(queue, 5),  # Ventana de 5 segundos
        daemon=True
    )
    
    producer_thread.start()
    consumer_thread.start()
    
    # Correr por 60 segundos
    import time
    time.sleep(60)
    print("\\nShutting down...")

if __name__ == "__main__":
    main()`,
      explanation: { es: 'Threads permiten que producer y consumer corran en paralelo.', en: 'Threads allow producer and consumer to run in parallel.', pt: 'Threads permitem que producer e consumer rodem em paralelo.' }
    },
    { 
      order: 4, 
      text: { es: '🪟 Implementá sliding windows', en: '🪟 Implement sliding windows', pt: '🪟 Implemente sliding windows' },
      code: `from collections import deque
import time

class SlidingWindow:
    def __init__(self, window_size_seconds: int):
        self.window_size = window_size_seconds
        self.events = deque()
    
    def add(self, event):
        now = time.time()
        self.events.append((now, event))
        self._cleanup(now)
    
    def _cleanup(self, now):
        """Elimina eventos fuera de la ventana."""
        while self.events and now - self.events[0][0] > self.window_size:
            self.events.popleft()
    
    def get_events(self):
        self._cleanup(time.time())
        return [e for _, e in self.events]`,
      explanation: { es: 'Sliding window mantiene los últimos N segundos de eventos, no ventanas fijas.', en: 'Sliding window keeps last N seconds of events, not fixed windows.', pt: 'Sliding window mantém os últimos N segundos de eventos, não janelas fixas.' }
    },
    { 
      order: 5, 
      text: { es: '💾 Guardá resultados', en: '💾 Save results', pt: '💾 Salve resultados' },
      code: `import json
from datetime import datetime

def save_aggregations(aggregations: dict, output_file: str = "output/aggregations.jsonl"):
    """Guarda agregaciones en formato JSONL."""
    with open(output_file, 'a') as f:
        record = {
            "timestamp": datetime.now().isoformat(),
            "aggregations": aggregations
        }
        f.write(json.dumps(record) + "\\n")`,
      explanation: { es: 'JSONL (JSON Lines) es ideal para append de eventos.', en: 'JSONL (JSON Lines) is ideal for appending events.', pt: 'JSONL (JSON Lines) é ideal para append de eventos.' }
    },
  ],
  deliverable: { es: 'Script producer + consumer + documentación', en: 'Producer + consumer script + documentation', pt: 'Script producer + consumer + documentação' },
  evaluation: [
    { es: '¿El sistema procesa eventos continuamente?', en: 'Does the system process events continuously?', pt: 'O sistema processa eventos continuamente?' },
    { es: '¿Las agregaciones son correctas?', en: 'Are aggregations correct?', pt: 'As agregações estão corretas?' },
    { es: '¿Manejás backpressure (cola llena)?', en: 'Do you handle backpressure (full queue)?', pt: 'Lida com backpressure (fila cheia)?' },
    { es: '¿Podés explicar tumbling vs sliding windows?', en: 'Can you explain tumbling vs sliding windows?', pt: 'Consegue explicar tumbling vs sliding windows?' },
  ],
  theory: { es: `## Batch vs Near Real-Time vs Streaming

| Paradigma | Latencia | Ejemplo | Cuándo usar |
|-----------|----------|---------|-------------|
| **Batch** | Horas/días | ETL nocturno | Reportes, ML training |
| **Micro-batch** | Minutos | Spark Streaming | Balance latencia/complejidad |
| **Near Real-Time** | Segundos | Flink, Kafka Streams | Dashboards, alertas |
| **True Streaming** | Milisegundos | Kafka + Flink | Fraude, trading |

### ¿Cuál elegir?
- **¿Latencia de horas está OK?** → Batch (más simple, más barato)
- **¿Necesitás datos cada 5-15 min?** → Micro-batch (Spark Streaming)
- **¿Necesitás datos en segundos?** → Near real-time (Kafka + procesador)
- **¿Cada milisegundo importa?** → True streaming (costoso, complejo)

**Regla de oro**: Empezá con batch, migrá a streaming solo si es necesario.

## Conceptos de Streaming

**Producer**: Genera/envía eventos
**Consumer**: Recibe/procesa eventos
**Queue/Topic**: Buffer entre producer y consumer
**Offset**: Posición del consumer en el topic

## Tipos de Windows

| Tipo | Descripción | Ejemplo |
|------|-------------|---------|
| **Tumbling** | Ventanas fijas sin overlap | 0-5s, 5-10s, 10-15s |
| **Sliding** | Ventanas que se mueven | Últimos 5s cada 1s |
| **Session** | Basadas en actividad | Sesión de usuario |
| **Global** | Sin límite temporal | Acumulado total |

## Garantías de Entrega

| Garantía | Descripción | Trade-off |
|----------|-------------|-----------|
| **At-most-once** | Puede perder eventos | Más rápido |
| **At-least-once** | Puede duplicar eventos | Requiere idempotencia |
| **Exactly-once** | Ni pérdida ni duplicados | Más lento, más complejo |

## Event Time vs Processing Time

- **Event Time**: Cuándo ocurrió el evento (timestamp del evento)
- **Processing Time**: Cuándo lo procesamos (timestamp del servidor)

**Problema**: Los eventos pueden llegar tarde (out-of-order).
**Solución**: Watermarks - "ya procesé todo hasta este timestamp".`, en: `## Batch vs Near Real-Time vs Streaming

| Paradigm | Latency | Example | When to use |
|----------|---------|---------|-------------|
| **Batch** | Hours/days | Nightly ETL | Reports, ML training |
| **Micro-batch** | Minutes | Spark Streaming | Latency/complexity balance |
| **Near Real-Time** | Seconds | Flink, Kafka Streams | Dashboards, alerts |
| **True Streaming** | Milliseconds | Kafka + Flink | Fraud, trading |

### Which one to choose?
- **Latency of hours OK?** → Batch (simpler, cheaper)
- **Need data every 5-15 min?** → Micro-batch (Spark Streaming)
- **Need data in seconds?** → Near real-time (Kafka + processor)
- **Every millisecond matters?** → True streaming (costly, complex)

**Golden Rule**: Start with batch, migrate to streaming only if necessary.

## Streaming Concepts

**Producer**: Generates/sends events
**Consumer**: Receives/processes events
**Queue/Topic**: Buffer between producer and consumer
**Offset**: Consumer position in topic

## Window Types

| Type | Description | Example |
|------|-------------|---------|
| **Tumbling** | Fixed windows without overlap | 0-5s, 5-10s, 10-15s |
| **Sliding** | Moving windows | Last 5s every 1s |
| **Session** | Activity based | User session |
| **Global** | No time limit | Total accumulated |

## Delivery Guarantees

| Guarantee | Description | Trade-off |
|-----------|-------------|-----------|
| **At-most-once** | Can lose events | Faster |
| **At-least-once** | Can duplicate events | Requires idempotency |
| **Exactly-once** | No loss, no duplicates | Slower, more complex |

## Event Time vs Processing Time

- **Event Time**: When event occurred (event timestamp)
- **Processing Time**: When we processed it (server timestamp)

**Problem**: Events can arrive late (out-of-order).
**Solution**: Watermarks - "I processed everything up to this timestamp".`, pt: `## Batch vs Near Real-Time vs Streaming

| Paradigma | Latência | Exemplo | Quando usar |
|-----------|----------|---------|-------------|
| **Batch** | Horas/dias | ETL noturno | Relatórios, treino de ML |
| **Micro-batch** | Minutos | Spark Streaming | Equilíbrio latência/complexidade |
| **Near Real-Time** | Segundos | Flink, Kafka Streams | Dashboards, alertas |
| **True Streaming** | Milissegundos | Kafka + Flink | Fraude, trading |

### Qual escolher?
- **Latência de horas está OK?** → Batch (mais simples, mais barato)
- **Precisa de dados a cada 5-15 min?** → Micro-batch (Spark Streaming)
- **Precisa de dados em segundos?** → Near real-time (Kafka + processador)
- **Cada milissegundo importa?** → True streaming (caro, complexo)

**Regra de Ouro**: Comece com batch, migre para streaming só se necessário.

## Conceitos de Streaming

**Producer**: Gera/envia eventos
**Consumer**: Recebe/processa eventos
**Queue/Topic**: Buffer entre producer e consumer
**Offset**: Posição do consumer no tópico

## Tipos de Windows

| Tipo | Descrição | Exemplo |
|------|-----------|---------|
| **Tumbling** | Janelas fixas sem sobreposição | 0-5s, 5-10s, 10-15s |
| **Sliding** | Janelas que se movem | Últimos 5s a cada 1s |
| **Session** | Baseadas em atividade | Sessão de usuário |
| **Global** | Sem limite temporal | Acumulado total |

## Garantias de Entrega

| Garantia | Descrição | Trade-off |
|----------|-----------|-----------|
| **At-most-once** | Pode perder eventos | Mais rápido |
| **At-least-once** | Pode duplicar eventos | Requer idempotência |
| **Exactly-once** | Nem perda nem duplicados | Mais lento, mais complexo |

## Event Time vs Processing Time

- **Event Time**: Quando ocorreu o evento (timestamp do evento)
- **Processing Time**: Quando o processamos (timestamp do servidor)

**Problema**: Os eventos podem chegar tarde (out-of-order).
**Solução**: Watermarks - "já processei tudo até este timestamp".` },
};


