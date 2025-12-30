import { Project } from '../../../types/members';

export const p3KafkaStreaming: Project = {
  id: 'p3-kafka-streaming',
  level: 3,
  title: {
    es: 'Pipeline de Streaming con Apache Kafka',
    pt: 'Pipeline de Streaming com Apache Kafka'
  },
  description: {
    es: 'Construí un pipeline de streaming real que procesa eventos en tiempo real. Kafka es el estándar de la industria para streaming.',
    pt: 'Construa um pipeline de streaming real que processa eventos em tempo real. Kafka é o padrão da indústria para streaming.'
  },
  difficulty: 'Expert',
  duration: '6-8 horas',
  skills: [
    { es: 'Kafka', pt: 'Kafka' },
    { es: 'Python', pt: 'Python' },
    { es: 'Streaming', pt: 'Streaming' },
    { es: 'Docker', pt: 'Docker' },
    { es: 'Real-time Processing', pt: 'Processamento em Tempo Real' }
  ],
  icon: '📡',
  color: 'orange',
  datasetId: 'iot',
  estimatedLines: 200,
  realWorldExample: {
    es: 'Así procesa LinkedIn billones de mensajes por día con Kafka',
    pt: 'Assim o LinkedIn processa bilhões de mensagens por dia com Kafka'
  },
  usedBy: ['LinkedIn', 'Uber', 'Netflix', 'Airbnb', 'Confluent'],
  expectedOutputs: [
    {
      step: 5,
      description: { es: 'Consumer procesando eventos', pt: 'Consumer processando eventos' },
      example: `Starting consumer...
Device device_42: avg_temp=24.35°C (n=15)
Device device_17: avg_temp=22.80°C (n=12)
Device device_89: avg_temp=26.10°C (n=8)
...
Processed 1000 events in 10 seconds
Throughput: 100 events/second`
    },
  ],
  learningObjectives: [
    { es: 'Entender arquitectura de Kafka (topics, partitions, consumer groups)', pt: 'Entender arquitetura do Kafka (topics, partitions, consumer groups)' },
    { es: 'Implementar producers y consumers', pt: 'Implementar producers e consumers' },
    { es: 'Manejar offsets correctamente', pt: 'Lidar com offsets corretamente' },
    { es: 'Procesar en ventanas de tiempo', pt: 'Processar em janelas de tempo' },
    { es: 'Garantizar procesamiento sin pérdida', pt: 'Garantir processamento sem perda' },
  ],
  interviewStory: {
    hook: {
      es: "Implementé Kafka para procesar 1 millón de eventos por minuto con latencia sub-segundo y cero pérdida de datos.",
      pt: "Implementei Kafka para processar 1 milhão de eventos por minuto com latência sub-segundo e zero perda de dados."
    },
    situation: {
      es: "El sistema de batch procesaba eventos con 24 horas de delay. El negocio necesitaba reaccionar en tiempo real a comportamiento de usuarios.",
      pt: "O sistema de batch processava eventos com 24 horas de delay. O negócio precisava reagir em tempo real ao comportamento dos usuários."
    },
    task: {
      es: "Migrar de batch a streaming con Kafka para procesamiento en tiempo real.",
      pt: "Migrar de batch para streaming com Kafka para processamento em tempo real."
    },
    actions: [
      { es: "Diseñé la arquitectura: topics por tipo de evento, particiones por user_id", pt: "Projetei a arquitetura: topics por tipo de evento, particiones por user_id" },
      { es: "Implementé producers con acknowledgments para garantizar entrega", pt: "Implementei producers com acknowledgments para garantir entrega" },
      { es: "Creé consumer groups para procesamiento paralelo y fault-tolerant", pt: "Criei consumer groups para processamento paralelo e fault-tolerant" },
      { es: "Implementé exactly-once semantics con transacciones de Kafka", pt: "Implementei exactly-once semantics com transações do Kafka" },
      { es: "Agregué monitoreo con métricas de lag y throughput", pt: "Adicionei monitoramento com métricas de lag e throughput" }
    ],
    results: [
      { es: "Latencia: de 24 horas a <1 segundo", pt: "Latência: de 24 horas para <1 segundo" },
      { es: "Throughput: 1M eventos/minuto sin problemas", pt: "Throughput: 1M eventos/minuto sem problemas" },
      { es: "Cero pérdida de datos gracias a replicación y acks", pt: "Zero perda de dados graças a replicação e acks" },
      { es: "El equipo de producto puede reaccionar en tiempo real", pt: "A equipe de produto pode reagir em tempo real" }
    ],
    learnings: [
      { es: "El particionamiento es crítico - mal particionado = hotspots", pt: "O particionamento é crítico - mal particionado = hotspots" },
      { es: "Consumer lag es LA métrica a monitorear", pt: "Consumer lag é A métrica a monitorar" },
      { es: "Exactly-once es posible pero tiene costo de performance", pt: "Exactly-once é possível mas tem custo de performance" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo garantizás que no se pierdan mensajes?", pt: "Como você garante que não se percam mensagens?" },
        answer: { es: "Tres niveles: 1) acks=all en producer, 2) replication.factor=3, 3) min.insync.replicas=2. Si un broker cae, los otros tienen la copia.", pt: "Três níveis: 1) acks=all no producer, 2) replication.factor=3, 3) min.insync.replicas=2. Se um broker cair, os outros têm a cópia." }
      },
      {
        question: { es: "¿Qué pasa si un consumer se cae?", pt: "O que acontece se um consumer cair?" },
        answer: { es: "El consumer group rebalancea y otro consumer toma sus particiones. El offset está guardado en Kafka, así que retoma desde donde quedó.", pt: "O consumer group rebalanceia e outro consumer toma suas particiones. O offset está guardado no Kafka, então retoma de onde parou." }
      },
      {
        question: { es: "¿Cuántas particiones debería tener un topic?", pt: "Quantas particiones deveria ter um topic?" },
        answer: { es: "Regla general: particiones >= número de consumers. Más particiones = más paralelismo pero más overhead. Empiezo con 10-20 y ajusto según throughput.", pt: "Regra geral: particiones >= número de consumers. Mais particiones = mais paralelismo mas mais overhead. Começo com 10-20 e ajusto segundo throughput." }
      }
    ],
    closingStatement: { es: "Kafka es el backbone de cualquier arquitectura de datos moderna - dominarlo es esencial.", pt: "Kafka é o backbone de qualquer arquitetura de dados moderna - dominá-lo é essencial." }
  },
  prerequisites: ['p2-streaming-basics'],
  steps: [
    {
      order: 1,
      text: { es: '📖 Entendé conceptos de Kafka', pt: '📖 Entenda conceitos de Kafka' },
      explanation: {
        es: `**Topic**: Canal donde se publican mensajes (ej: "iot-events")
**Partition**: División del topic para paralelismo
**Producer**: Envía mensajes a topics
**Consumer**: Lee mensajes de topics
**Consumer Group**: Grupo de consumers que comparten la carga
**Offset**: Posición del consumer en el topic`,
        pt: `**Topic**: Canal onde se publicam mensagens (ex: "iot-events")
**Partition**: Divisão do topic para paralelismo
**Producer**: Envia mensagens para topics
**Consumer**: Lê mensagens de topics
**Consumer Group**: Grupo de consumers que compartilham a carga
**Offset**: Posição do consumer no topic`
      },
      checkpoint: { es: '¿Podés explicar qué es un consumer group?', pt: 'Pode explicar o que é um consumer group?' }
    },
    {
      order: 2,
      text: { es: '🐳 Levantá Kafka con Docker', pt: '🐳 Levante Kafka com Docker' },
      code: `# docker-compose.yml
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:7.4.0
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181

  kafka:
    image: confluentinc/cp-kafka:7.4.0
    depends_on:
      - zookeeper
    ports:
      - "9092:9092"
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1

  kafka-ui:
    image: provectuslabs/kafka-ui:latest
    ports:
      - "8080:8080"
    environment:
      KAFKA_CLUSTERS_0_NAME: local
      KAFKA_CLUSTERS_0_BOOTSTRAPSERVERS: kafka:9092`,
      explanation: { es: 'Kafka UI te permite ver topics, mensajes, y consumer groups visualmente.', pt: 'Kafka UI permite ver topics, mensagens, e consumer groups visualmente.' },
      checkpoint: { es: '¿Podés acceder a Kafka UI en http://localhost:8080?', pt: 'Consegue acessar Kafka UI em http://localhost:8080?' }
    },
    {
      order: 3,
      text: { es: '📝 Creá el topic', pt: '📝 Crie o topic' },
      code: `# Instalar kafka-python
pip install kafka-python

# Crear topic desde Python
from kafka.admin import KafkaAdminClient, NewTopic

admin = KafkaAdminClient(bootstrap_servers='localhost:9092')

topic = NewTopic(
    name='iot-events',
    num_partitions=3,
    replication_factor=1
)

admin.create_topics([topic])
print("Topic creado!")`,
      explanation: { es: '3 particiones permiten 3 consumers en paralelo.', pt: '3 particiones permitem 3 consumers em paralelo.' },
      tip: { es: 'En producción, usarías más particiones y replication_factor > 1.', pt: 'Em produção, usaria mais particiones e replication_factor > 1.' }
    },
    {
      order: 4,
      text: { es: '📤 Implementá el Producer', pt: '📤 Implemente o Producer' },
      code: `# producer.py
import json
import time
import random
from datetime import datetime
from kafka import KafkaProducer

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8'),
    key_serializer=lambda k: k.encode('utf-8') if k else None
)

def generate_event():
    return {
        "device_id": f"device_{random.randint(1, 100)}",
        "temperature": round(random.uniform(20, 30), 2),
        "humidity": round(random.uniform(40, 80), 2),
        "timestamp": datetime.now().isoformat()
    }

def produce_events(events_per_second: int = 10):
    print("Starting producer...")
    while True:
        event = generate_event()
        
        # Usar device_id como key para ordering
        producer.send(
            'iot-events',
            key=event['device_id'],
            value=event
        )
        
        print(f"Sent: {event['device_id']}")
        time.sleep(1 / events_per_second)

if __name__ == "__main__":
    produce_events()`,
      explanation: { es: 'La key determina a qué partición va el mensaje. Misma key = misma partición = orden garantizado.', pt: 'A key determina para qual partición vai a mensagem. Mesma key = mesma partición = ordem garantida.' },
      tip: { es: 'Usá device_id como key para que todos los eventos de un device vayan a la misma partición.', pt: 'Use device_id como key para que todos os eventos de um device vão para a mesma partición.' }
    },
    {
      order: 5,
      text: { es: '📥 Implementá el Consumer', pt: '📥 Implemente o Consumer' },
      code: `# consumer.py
import json
from collections import defaultdict
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'iot-events',
    bootstrap_servers='localhost:9092',
    group_id='iot-processor',
    auto_offset_reset='earliest',
    enable_auto_commit=True,
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

def process_events():
    print("Starting consumer...")
    
    # Agregaciones en memoria
    stats = defaultdict(lambda: {'count': 0, 'sum_temp': 0})
    
    for message in consumer:
        event = message.value
        device_id = event['device_id']
        
        # Actualizar stats
        stats[device_id]['count'] += 1
        stats[device_id]['sum_temp'] += event['temperature']
        
        avg_temp = stats[device_id]['sum_temp'] / stats[device_id]['count']
        
        print(f"Device {device_id}: avg_temp={avg_temp:.2f}°C (n={stats[device_id]['count']})")

if __name__ == "__main__":
    process_events()`,
      explanation: { es: 'auto_offset_reset="earliest" lee desde el principio si es un consumer nuevo.', pt: 'auto_offset_reset="earliest" lê do início se for um consumer novo.' },
      checkpoint: { es: '¿El consumer recibe mensajes del producer?', pt: 'O consumer recebe mensagens do producer?' }
    },
    {
      order: 6,
      text: { es: '🪟 Implementá windowing', pt: '🪟 Implemente windowing' },
      code: `# consumer_windowed.py
import json
import time
from collections import defaultdict
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'iot-events',
    bootstrap_servers='localhost:9092',
    group_id='iot-windowed',
    auto_offset_reset='earliest',
    enable_auto_commit=False,  # Commit manual
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

WINDOW_SECONDS = 10

def process_with_windows():
    print(f"Processing with {WINDOW_SECONDS}s windows...")
    
    window_data = defaultdict(list)
    window_start = time.time()
    
    for message in consumer:
        event = message.value
        window_data[event['device_id']].append(event['temperature'])
        
        # Emitir cada WINDOW_SECONDS
        if time.time() - window_start >= WINDOW_SECONDS:
            print(f"\\n=== Window {time.strftime('%H:%M:%S')} ===")
            
            for device_id, temps in window_data.items():
                avg = sum(temps) / len(temps)
                print(f"{device_id}: avg={avg:.2f}°C ({len(temps)} events)")
            
            # Commit offsets después de procesar
            consumer.commit()
            
            # Reset window
            window_data.clear()
            window_start = time.time()

if __name__ == "__main__":
    process_with_windows()`,
      explanation: { es: 'Commit manual te da control sobre cuándo marcar mensajes como procesados.', pt: 'Commit manual te dá controle sobre quando marcar mensagens como processadas.' },
      warning: { es: 'Si no hacés commit, vas a reprocesar mensajes si el consumer se reinicia.', pt: 'Se não fizer commit, vai reprocessar mensagens se o consumer reiniciar.' }
    },
    {
      order: 7,
      text: { es: '💾 Guardá resultados', pt: '💾 Guarde resultados' },
      code: `# Agregar al consumer
import os
from datetime import datetime

def save_window_results(window_data: dict, output_dir: str = 'output'):
    os.makedirs(output_dir, exist_ok=True)
    
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filename = f"{output_dir}/window_{timestamp}.json"
    
    results = {
        'timestamp': datetime.now().isoformat(),
        'window_seconds': WINDOW_SECONDS,
        'aggregations': {
            device_id: {
                'avg_temperature': sum(temps) / len(temps),
                'min_temperature': min(temps),
                'max_temperature': max(temps),
                'event_count': len(temps)
            }
            for device_id, temps in window_data.items()
        }
    }
    
    with open(filename, 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"Saved to {filename}")`,
      explanation: { es: 'Guardá resultados de cada ventana para análisis posterior.', pt: 'Guarde resultados de cada janela para análise posterior.' }
    },
    {
      order: 8,
      text: { es: '⚠️ Implementá graceful shutdown', pt: '⚠️ Implemente graceful shutdown' },
      code: `import signal
import sys

def shutdown_handler(signum, frame):
    print("\\nShutting down gracefully...")
    consumer.commit()  # Commit pending offsets
    consumer.close()
    sys.exit(0)

signal.signal(signal.SIGINT, shutdown_handler)
signal.signal(signal.SIGTERM, shutdown_handler)`,
      explanation: { es: 'Graceful shutdown evita perder mensajes cuando parás el consumer.', pt: 'Graceful shutdown evita perder mensagens quando para o consumer.' },
      tip: { es: 'Siempre hacé commit antes de cerrar.', pt: 'Sempre faça commit antes de fechar.' }
    },
    {
      order: 9,
      text: { es: '📊 Verificá en Kafka UI', pt: '📊 Verifique no Kafka UI' },
      explanation: {
        es: `En http://localhost:8080:
1. Ver el topic "iot-events"
2. Ver mensajes
3. Ver consumer groups y su lag
4. Ver particiones`,
        pt: `Em http://localhost:8080:
1. Ver o topic "iot-events"
2. Ver mensagens
3. Ver consumer groups e seu lag
4. Ver particiones`
      },
      checkpoint: { es: '¿Podés ver el lag del consumer group en Kafka UI?', pt: 'Consegue ver o lag do consumer group no Kafka UI?' }
    },
  ],
  deliverable: { es: 'Repo con docker-compose + producer + consumer + documentación', pt: 'Repo com docker-compose + producer + consumer + documentação' },
  evaluation: [
    { es: '¿El producer envía eventos sin errores?', pt: 'O producer envia eventos sem erros?' },
    { es: '¿El consumer procesa sin perder eventos?', pt: 'O consumer processa sem perder eventos?' },
    { es: '¿Manejás offsets correctamente?', pt: 'Lida com offsets corretamente?' },
    { es: '¿Implementaste graceful shutdown?', pt: 'Implementou graceful shutdown?' },
    { es: '¿El sistema se recupera de crashes?', pt: 'O sistema se recupera de crashes?' },
  ],
  theory: {
    es: `## Arquitectura de Kafka

\`\`\`
[Producers] → [Kafka Cluster] → [Consumers]
                    |
              [Zookeeper]
\`\`\`

**Topic**: Canal de mensajes
**Partition**: División para paralelismo
**Replica**: Copia para durabilidad
**Consumer Group**: Grupo que comparte la carga

## Garantías de Entrega

| Garantía | Descripción | Cómo lograrla |
|----------|-------------|---------------|
| At-most-once | Puede perder | auto_commit=True |
| At-least-once | Puede duplicar | Commit después de procesar |
| Exactly-once | Ni pérdida ni duplicados | Transacciones + idempotencia |

## Partitioning

- Mensajes con misma key van a misma partición
- Orden garantizado solo dentro de partición
- Más particiones = más paralelismo`,
    pt: `## Arquitetura do Kafka

\`\`\`
[Producers] → [Kafka Cluster] → [Consumers]
                    |
              [Zookeeper]
\`\`\`

**Topic**: Canal de mensagens
**Partition**: Divisão para paralelismo
**Replica**: Cópia para durabilidade
**Consumer Group**: Grupo que compartilha a carga

## Garantias de Entrega

| Garantia | Descrição | Como conseguir |
|----------|-------------|---------------|
| At-most-once | Pode perder | auto_commit=True |
| At-least-once | Pode duplicar | Commit depois de processar |
| Exactly-once | Nem perda nem duplicados | Transações + idempotência |

## Partitioning

- Mensagens com mesma key vão para mesma partição
- Ordem garantida apenas dentro de partição
- Mais partições = mais paralelismo`
  },
};


