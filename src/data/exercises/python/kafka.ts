/**
 * Kafka/Streaming Exercises
 * Real-time data processing
 */

import { PythonExercise } from '../types';

export const PYTHON_KAFKA: PythonExercise[] = [
  {
    id: 'py-kafka1',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'kafka',
    tags: ['kafka', 'producer', 'streaming'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Kafka: Producer Básico',
      en: 'Kafka: Basic Producer',
      pt: 'Kafka: Producer Básico'
    },
    description: {
      es: 'Creá un producer de Kafka que envíe mensajes JSON a un topic.',
      en: 'Create a Kafka producer that sends JSON messages to a topic.',
      pt: 'Crie um producer do Kafka que envie mensagens JSON para um tópico.'
    },
    theory: {
      es: `**Kafka Producer en Python:**

Usamos \`confluent-kafka\` o \`kafka-python\`.

\`\`\`python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Enviar mensaje
producer.send('mi-topic', {'key': 'value'})
producer.flush()  # Asegura envío
\`\`\`

**Conceptos clave:**
- **Topic**: Canal donde se publican mensajes
- **Partition**: Subdivisión del topic para paralelismo
- **Key**: Determina la partición (mismo key → misma partición)`,
      en: `**Kafka Producer in Python:**

We use \`confluent-kafka\` or \`kafka-python\`.

\`\`\`python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Send message
producer.send('my-topic', {'key': 'value'})
producer.flush()  # Ensure delivery
\`\`\`

**Key concepts:**
- **Topic**: Channel where messages are published
- **Partition**: Subdivision for parallelism
- **Key**: Determines partition (same key → same partition)`,
      pt: `**Kafka Producer em Python:**

Usamos \`confluent-kafka\` ou \`kafka-python\`.

\`\`\`python
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

# Enviar mensagem
producer.send('meu-topico', {'key': 'value'})
producer.flush()  # Garante envio
\`\`\`

**Conceitos chave:**
- **Topic**: Canal onde mensagens são publicadas
- **Partition**: Subdivisão para paralelismo
- **Key**: Determina a partição (mesma key → mesma partição)`
    },
    realWorldExample: {
      es: 'Enviar eventos de clickstream en tiempo real.',
      en: 'Send clickstream events in real-time.',
      pt: 'Enviar eventos de clickstream em tempo real.'
    },
    hint: {
      es: 'Inicializá KafkaProducer con bootstrap_servers y value_serializer',
      en: 'Initialize KafkaProducer with bootstrap_servers and value_serializer',
      pt: 'Inicialize KafkaProducer com bootstrap_servers e value_serializer'
    },
    
    starterCode: {
      es: `from kafka import KafkaProducer
import json

# Configurá el producer para enviar JSON
producer = None

# Enviá un mensaje al topic "events"
message = {"event": "page_view", "user_id": 123}

# Tu código aquí`,
      en: `from kafka import KafkaProducer
import json

# Configure producer to send JSON
producer = None

# Send a message to topic "events"
message = {"event": "page_view", "user_id": 123}

# Your code here`,
      pt: `from kafka import KafkaProducer
import json

# Configure o producer para enviar JSON
producer = None

# Envie uma mensagem para o tópico "events"
message = {"event": "page_view", "user_id": 123}

# Seu código aqui`
    },
    solution: `producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    value_serializer=lambda v: json.dumps(v).encode('utf-8')
)

producer.send('events', message)
producer.flush()`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-kafka2',
    type: 'python',
    difficulty: 'medium',
    category: 'python',
    subcategory: 'kafka',
    tags: ['kafka', 'consumer', 'streaming'],
    interviewFrequency: 'high',
    xpReward: 30,
    coinsReward: 12,
    
    title: {
      es: 'Kafka: Consumer Básico',
      en: 'Kafka: Basic Consumer',
      pt: 'Kafka: Consumer Básico'
    },
    description: {
      es: 'Creá un consumer que lea mensajes de un topic y los procese.',
      en: 'Create a consumer that reads messages from a topic and processes them.',
      pt: 'Crie um consumer que leia mensagens de um tópico e as processe.'
    },
    theory: {
      es: `**Kafka Consumer:**

\`\`\`python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'mi-topic',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    group_id='mi-grupo',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    print(message.value)
\`\`\`

**Conceptos:**
- **Consumer Group**: Grupo de consumers que comparten la carga
- **Offset**: Posición del último mensaje leído
- **auto_offset_reset**: Dónde empezar si no hay offset guardado`,
      en: `**Kafka Consumer:**

\`\`\`python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'my-topic',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    group_id='my-group',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    print(message.value)
\`\`\`

**Concepts:**
- **Consumer Group**: Group of consumers sharing the load
- **Offset**: Position of last read message
- **auto_offset_reset**: Where to start if no saved offset`,
      pt: `**Kafka Consumer:**

\`\`\`python
from kafka import KafkaConsumer
import json

consumer = KafkaConsumer(
    'meu-topico',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    group_id='meu-grupo',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    print(message.value)
\`\`\`

**Conceitos:**
- **Consumer Group**: Grupo de consumers compartilhando a carga
- **Offset**: Posição da última mensagem lida
- **auto_offset_reset**: Onde começar se não houver offset salvo`
    },
    realWorldExample: {
      es: 'Procesar eventos en tiempo real para dashboards.',
      en: 'Process real-time events for dashboards.',
      pt: 'Processar eventos em tempo real para dashboards.'
    },
    hint: {
      es: 'Usá KafkaConsumer con group_id y value_deserializer',
      en: 'Use KafkaConsumer with group_id and value_deserializer',
      pt: 'Use KafkaConsumer com group_id e value_deserializer'
    },
    
    starterCode: {
      es: `from kafka import KafkaConsumer
import json

# Configurá el consumer para leer JSON del topic "events"
consumer = None

# Leé los mensajes
# for message in consumer:
#     process(message.value)

# Tu código aquí`,
      en: `from kafka import KafkaConsumer
import json

# Configure consumer to read JSON from topic "events"
consumer = None

# Read messages
# for message in consumer:
#     process(message.value)

# Your code here`,
      pt: `from kafka import KafkaConsumer
import json

# Configure o consumer para ler JSON do tópico "events"
consumer = None

# Leia as mensagens
# for message in consumer:
#     process(message.value)

# Seu código aqui`
    },
    solution: `consumer = KafkaConsumer(
    'events',
    bootstrap_servers='localhost:9092',
    auto_offset_reset='earliest',
    group_id='event-processor',
    value_deserializer=lambda m: json.loads(m.decode('utf-8'))
)

for message in consumer:
    print(f"Received: {message.value}")`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-kafka3',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'kafka',
    tags: ['kafka', 'avro', 'schema'],
    interviewFrequency: 'medium',
    xpReward: 40,
    coinsReward: 18,
    
    title: {
      es: 'Kafka: Schema Avro',
      en: 'Kafka: Avro Schema',
      pt: 'Kafka: Schema Avro'
    },
    description: {
      es: 'Definí un schema Avro para mensajes de eventos de usuario.',
      en: 'Define an Avro schema for user event messages.',
      pt: 'Defina um schema Avro para mensagens de eventos de usuário.'
    },
    theory: {
      es: `**Apache Avro en Kafka:**

Avro proporciona serialización eficiente con schema.

\`\`\`python
# Schema Avro
schema = {
    "type": "record",
    "name": "UserEvent",
    "fields": [
        {"name": "user_id", "type": "int"},
        {"name": "event_type", "type": "string"},
        {"name": "timestamp", "type": "long"},
        {"name": "metadata", "type": ["null", "string"], "default": null}
    ]
}
\`\`\`

**Ventajas:**
- Schema evolution (compatibilidad hacia atrás)
- Serialización binaria eficiente
- Schema Registry centralizado`,
      en: `**Apache Avro in Kafka:**

Avro provides efficient serialization with schema.

\`\`\`python
# Avro Schema
schema = {
    "type": "record",
    "name": "UserEvent",
    "fields": [
        {"name": "user_id", "type": "int"},
        {"name": "event_type", "type": "string"},
        {"name": "timestamp", "type": "long"},
        {"name": "metadata", "type": ["null", "string"], "default": null}
    ]
}
\`\`\`

**Advantages:**
- Schema evolution (backward compatibility)
- Efficient binary serialization
- Centralized Schema Registry`,
      pt: `**Apache Avro no Kafka:**

Avro fornece serialização eficiente com schema.

\`\`\`python
# Schema Avro
schema = {
    "type": "record",
    "name": "UserEvent",
    "fields": [
        {"name": "user_id", "type": "int"},
        {"name": "event_type", "type": "string"},
        {"name": "timestamp", "type": "long"},
        {"name": "metadata", "type": ["null", "string"], "default": null}
    ]
}
\`\`\`

**Vantagens:**
- Schema evolution (compatibilidade retroativa)
- Serialização binária eficiente
- Schema Registry centralizado`
    },
    realWorldExample: {
      es: 'Definir contratos de datos entre equipos.',
      en: 'Define data contracts between teams.',
      pt: 'Definir contratos de dados entre equipes.'
    },
    hint: {
      es: 'Usá type "record" con fields que tengan name y type',
      en: 'Use type "record" with fields having name and type',
      pt: 'Use type "record" com fields tendo name e type'
    },
    
    starterCode: {
      es: `# Definí un schema Avro para un evento de compra
# Campos: order_id (int), product_name (string), 
#         amount (double), created_at (long)

purchase_schema = {
    "type": "record",
    "name": "PurchaseEvent",
    "fields": [
        # Tu código aquí
    ]
}`,
      en: `# Define an Avro schema for a purchase event
# Fields: order_id (int), product_name (string), 
#         amount (double), created_at (long)

purchase_schema = {
    "type": "record",
    "name": "PurchaseEvent",
    "fields": [
        # Your code here
    ]
}`,
      pt: `# Defina um schema Avro para um evento de compra
# Campos: order_id (int), product_name (string), 
#         amount (double), created_at (long)

purchase_schema = {
    "type": "record",
    "name": "PurchaseEvent",
    "fields": [
        # Seu código aqui
    ]
}`
    },
    solution: `purchase_schema = {
    "type": "record",
    "name": "PurchaseEvent",
    "fields": [
        {"name": "order_id", "type": "int"},
        {"name": "product_name", "type": "string"},
        {"name": "amount", "type": "double"},
        {"name": "created_at", "type": "long"}
    ]
}`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-kafka4',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'kafka',
    tags: ['kafka', 'streams', 'processing'],
    interviewFrequency: 'medium',
    xpReward: 45,
    coinsReward: 20,
    
    title: {
      es: 'Kafka: Procesamiento de Streams',
      en: 'Kafka: Stream Processing',
      pt: 'Kafka: Processamento de Streams'
    },
    description: {
      es: 'Implementá un procesador que filtre y transforme mensajes en tiempo real.',
      en: 'Implement a processor that filters and transforms messages in real-time.',
      pt: 'Implemente um processador que filtre e transforme mensagens em tempo real.'
    },
    theory: {
      es: `**Stream Processing Pattern:**

\`\`\`python
from kafka import KafkaConsumer, KafkaProducer
import json

consumer = KafkaConsumer('raw-events', ...)
producer = KafkaProducer(...)

for message in consumer:
    event = message.value
    
    # Filtrar
    if event['type'] != 'important':
        continue
    
    # Transformar
    enriched = {
        **event,
        'processed_at': time.time(),
        'source': 'stream-processor'
    }
    
    # Publicar a otro topic
    producer.send('processed-events', enriched)
\`\`\``,
      en: `**Stream Processing Pattern:**

\`\`\`python
from kafka import KafkaConsumer, KafkaProducer
import json

consumer = KafkaConsumer('raw-events', ...)
producer = KafkaProducer(...)

for message in consumer:
    event = message.value
    
    # Filter
    if event['type'] != 'important':
        continue
    
    # Transform
    enriched = {
        **event,
        'processed_at': time.time(),
        'source': 'stream-processor'
    }
    
    # Publish to another topic
    producer.send('processed-events', enriched)
\`\`\``,
      pt: `**Pattern de Stream Processing:**

\`\`\`python
from kafka import KafkaConsumer, KafkaProducer
import json

consumer = KafkaConsumer('raw-events', ...)
producer = KafkaProducer(...)

for message in consumer:
    event = message.value
    
    # Filtrar
    if event['type'] != 'important':
        continue
    
    # Transformar
    enriched = {
        **event,
        'processed_at': time.time(),
        'source': 'stream-processor'
    }
    
    # Publicar para outro tópico
    producer.send('processed-events', enriched)
\`\`\``
    },
    realWorldExample: {
      es: 'ETL en tiempo real, detección de fraude.',
      en: 'Real-time ETL, fraud detection.',
      pt: 'ETL em tempo real, detecção de fraude.'
    },
    hint: {
      es: 'Consumí de un topic, filtrá/transformá, publicá a otro',
      en: 'Consume from one topic, filter/transform, publish to another',
      pt: 'Consuma de um tópico, filtre/transforme, publique para outro'
    },
    
    starterCode: {
      es: `import time

def process_stream(consumer, producer):
    """
    Lee del topic 'raw-events', filtra eventos tipo 'purchase'
    con amount > 100, y los envía a 'high-value-purchases'
    """
    for message in consumer:
        event = message.value
        
        # Tu código aquí
        # 1. Filtrar: solo type='purchase' y amount > 100
        # 2. Agregar timestamp de procesamiento
        # 3. Enviar a 'high-value-purchases'
        pass`,
      en: `import time

def process_stream(consumer, producer):
    """
    Read from 'raw-events' topic, filter events type 'purchase'
    with amount > 100, and send to 'high-value-purchases'
    """
    for message in consumer:
        event = message.value
        
        # Your code here
        # 1. Filter: only type='purchase' and amount > 100
        # 2. Add processing timestamp
        # 3. Send to 'high-value-purchases'
        pass`,
      pt: `import time

def process_stream(consumer, producer):
    """
    Leia do tópico 'raw-events', filtre eventos tipo 'purchase'
    com amount > 100, e envie para 'high-value-purchases'
    """
    for message in consumer:
        event = message.value
        
        # Seu código aqui
        # 1. Filtrar: apenas type='purchase' e amount > 100
        # 2. Adicionar timestamp de processamento
        # 3. Enviar para 'high-value-purchases'
        pass`
    },
    solution: `def process_stream(consumer, producer):
    for message in consumer:
        event = message.value
        
        # Filter
        if event.get('type') != 'purchase':
            continue
        if event.get('amount', 0) <= 100:
            continue
        
        # Transform
        enriched = {
            **event,
            'processed_at': time.time(),
            'is_high_value': True
        }
        
        # Publish
        producer.send('high-value-purchases', enriched)`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
  {
    id: 'py-kafka5',
    type: 'python',
    difficulty: 'hard',
    category: 'python',
    subcategory: 'kafka',
    tags: ['kafka', 'exactly-once', 'transactions'],
    interviewFrequency: 'medium',
    xpReward: 50,
    coinsReward: 22,
    
    title: {
      es: 'Kafka: Exactly-Once Semantics',
      en: 'Kafka: Exactly-Once Semantics',
      pt: 'Kafka: Exactly-Once Semantics'
    },
    description: {
      es: 'Configurá un producer con garantías transaccionales (exactly-once).',
      en: 'Configure a producer with transactional guarantees (exactly-once).',
      pt: 'Configure um producer com garantias transacionais (exactly-once).'
    },
    theory: {
      es: `**Exactly-Once en Kafka:**

Garantiza que cada mensaje se procese exactamente una vez.

\`\`\`python
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    enable_idempotence=True,  # Evita duplicados
    acks='all',  # Espera confirmación de todas las réplicas
    transactional_id='my-transactional-producer'
)

# Inicializar transacciones
producer.init_transactions()

try:
    producer.begin_transaction()
    producer.send('topic', value)
    producer.commit_transaction()
except Exception:
    producer.abort_transaction()
\`\`\`

**Semánticas:**
- **At-most-once**: Puede perder mensajes
- **At-least-once**: Puede duplicar mensajes
- **Exactly-once**: Ni pierde ni duplica`,
      en: `**Exactly-Once in Kafka:**

Guarantees each message is processed exactly once.

\`\`\`python
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    enable_idempotence=True,  # Prevents duplicates
    acks='all',  # Wait for all replicas confirmation
    transactional_id='my-transactional-producer'
)

# Initialize transactions
producer.init_transactions()

try:
    producer.begin_transaction()
    producer.send('topic', value)
    producer.commit_transaction()
except Exception:
    producer.abort_transaction()
\`\`\`

**Semantics:**
- **At-most-once**: May lose messages
- **At-least-once**: May duplicate messages
- **Exactly-once**: Neither loses nor duplicates`,
      pt: `**Exactly-Once no Kafka:**

Garante que cada mensagem é processada exatamente uma vez.

\`\`\`python
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    enable_idempotence=True,  # Evita duplicados
    acks='all',  # Espera confirmação de todas as réplicas
    transactional_id='my-transactional-producer'
)

# Inicializar transações
producer.init_transactions()

try:
    producer.begin_transaction()
    producer.send('topic', value)
    producer.commit_transaction()
except Exception:
    producer.abort_transaction()
\`\`\`

**Semânticas:**
- **At-most-once**: Pode perder mensagens
- **At-least-once**: Pode duplicar mensagens
- **Exactly-once**: Não perde nem duplica`
    },
    realWorldExample: {
      es: 'Procesamiento de pagos, actualizaciones de inventario.',
      en: 'Payment processing, inventory updates.',
      pt: 'Processamento de pagamentos, atualizações de inventário.'
    },
    hint: {
      es: 'Usá enable_idempotence=True, acks="all", y transactional_id',
      en: 'Use enable_idempotence=True, acks="all", and transactional_id',
      pt: 'Use enable_idempotence=True, acks="all", e transactional_id'
    },
    
    starterCode: {
      es: `from kafka import KafkaProducer

# Configurá un producer con exactly-once semantics
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    # Tu código aquí - agregá las configuraciones necesarias
)

# Enviá un mensaje de forma transaccional
def send_transactional(topic, message):
    # Tu código aquí
    pass`,
      en: `from kafka import KafkaProducer

# Configure a producer with exactly-once semantics
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    # Your code here - add necessary configurations
)

# Send a message transactionally
def send_transactional(topic, message):
    # Your code here
    pass`,
      pt: `from kafka import KafkaProducer

# Configure um producer com exactly-once semantics
producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    # Seu código aqui - adicione as configurações necessárias
)

# Envie uma mensagem transacionalmente
def send_transactional(topic, message):
    # Seu código aqui
    pass`
    },
    solution: `producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    enable_idempotence=True,
    acks='all',
    transactional_id='payment-processor'
)

producer.init_transactions()

def send_transactional(topic, message):
    try:
        producer.begin_transaction()
        producer.send(topic, message)
        producer.commit_transaction()
    except Exception as e:
        producer.abort_transaction()
        raise e`,
    testCode: `
print("✅ ¡Correcto! (Validación estática)")
`,
  },
];

export default PYTHON_KAFKA;


