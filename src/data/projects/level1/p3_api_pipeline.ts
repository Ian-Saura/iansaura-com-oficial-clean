import { Project } from '../../../types/members';

export const p3_api_pipeline: Project = {
  id: 'p3-api-pipeline',
  level: 1,
  title: { es: 'Pipeline con API REST', en: 'REST API Pipeline', pt: 'Pipeline com API REST' },
  description: {
    es: 'Construí un pipeline que consume una API REST, transforma los datos, y los guarda en formato optimizado. Este patrón es el más común en Data Engineering moderno.',
    en: 'Build a pipeline that consumes a REST API, transforms the data, and saves it in an optimized format. This is the most common pattern in modern Data Engineering.',
    pt: 'Construa um pipeline que consome uma API REST, transforma os dados e os salva em formato otimizado. Este é o padrão mais comum em Data Engineering moderno.'
  },
  difficulty: 'Intermedio',
  duration: '3-4 horas',
  skills: [
    { es: 'Python' }, { es: 'APIs REST' }, { es: 'requests' }, 
    { es: 'Error Handling', en: 'Error Handling', pt: 'Tratamento de Erros' }, 
    { es: 'Logging' }, { es: 'Parquet' }
  ],
  icon: '🌐',
  color: 'purple',
  datasetId: 'ecommerce',
  estimatedLines: 120,
  realWorldExample: {
    es: 'Así es como Airbnb consume datos de APIs externas para enriquecer sus listings',
    en: 'This is how Airbnb consumes data from external APIs to enrich their listings',
    pt: 'É assim que o Airbnb consome dados de APIs externas para enriquecer seus anúncios'
  },
  usedBy: ['Airbnb', 'Stripe', 'Twilio', 'Plaid'],
  learningObjectives: [
    { es: 'Consumir APIs REST con Python', en: 'Consume REST APIs with Python', pt: 'Consumir APIs REST com Python' },
    { es: 'Manejar errores de red (timeouts, reintentos)', en: 'Handle network errors (timeouts, retries)', pt: 'Lidar com erros de rede (timeouts, re tentativas)' },
    { es: 'Implementar logging profesional', en: 'Implement professional logging', pt: 'Implementar logging profissional' },
    { es: 'Usar variables de entorno para secrets', en: 'Use environment variables for secrets', pt: 'Usar variáveis de ambiente para segredos' },
    { es: 'Guardar datos particionados', en: 'Save partitioned data', pt: 'Salvar dados particionados' },
  ],
  commonMistakes: [
    {
      mistake: { es: 'Hardcodear tokens en el código', en: 'Hardcoding tokens in code', pt: 'Hardcodar tokens no código' },
      why: { es: 'Si subís el código a GitHub, cualquiera puede ver tu token', en: 'If you push code to GitHub, anyone can see your token', pt: 'Se subir o código para o GitHub, qualquer um pode ver seu token' },
      solution: { es: 'Usá variables de entorno o archivos .env', en: 'Use environment variables or .env files', pt: 'Use variáveis de ambiente ou arquivos .env' },
      code: `# ❌ NUNCA hagas esto
API_TOKEN = "sk_live_abc123..."

# ✅ Hacé esto
import os
API_TOKEN = os.environ.get('API_TOKEN')`
    },
    {
      mistake: { es: 'No manejar errores de conexión', en: 'Not handling connection errors', pt: 'Não lidar com erros de conexão' },
      why: { es: 'Las APIs fallan: timeouts, rate limits, errores 500', en: 'APIs fail: timeouts, rate limits, 500 errors', pt: 'APIs falham: timeouts, rate limits, erros 500' },
      solution: { es: 'Siempre usá try/except y reintentos', en: 'Always use try/except and retries', pt: 'Sempre use try/except e re tentativas' },
      code: `import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

session = requests.Session()
retries = Retry(total=3, backoff_factor=1)
session.mount('https://', HTTPAdapter(max_retries=retries))`
    },
    {
      mistake: { es: 'No implementar reintentos', en: 'Not implementing retries', pt: 'Não implementar re tentativas' },
      why: { es: 'Un error temporal no debería fallar todo el pipeline', en: 'A temporary error shouldn\'t fail the whole pipeline', pt: 'Um erro temporário não deveria falhar todo o pipeline' },
      solution: { es: 'Usá exponential backoff: 1s, 2s, 4s...', en: 'Use exponential backoff: 1s, 2s, 4s...', pt: 'Use exponential backoff: 1s, 2s, 4s...' },
    },
    {
      mistake: { es: 'Olvidar timeouts en requests', en: 'Forgetting timeouts in requests', pt: 'Esquecer timeouts em requests' },
      why: { es: 'Sin timeout, tu script puede quedarse colgado para siempre', en: 'Without timeout, your script can hang forever', pt: 'Sem timeout, seu script pode ficar travado para sempre' },
      solution: { es: 'Siempre usá timeout=(connect, read)', en: 'Always use timeout=(connect, read)', pt: 'Sempre use timeout=(connect, read)' },
      code: `response = requests.get(url, timeout=(5, 30))  # 5s connect, 30s read`
    },
  ],
  expectedOutputs: [
    {
      step: 4,
      description: { es: 'Response exitosa de la API', en: 'Successful API Response', pt: 'Resposta de sucesso da API' },
      example: `2024-01-15 10:30:45 INFO - Fetching page 1...
2024-01-15 10:30:46 INFO - Got 100 records
2024-01-15 10:30:46 INFO - Fetching page 2...
2024-01-15 10:30:47 INFO - Got 100 records
...
2024-01-15 10:30:52 INFO - Total: 500 records fetched`
    },
    {
      step: 7,
      description: { es: 'Archivos guardados particionados', en: 'Partitioned saved files', pt: 'Arquivos salvos particionados' },
      example: `output/
├── 2024-01-15/
│   └── data.parquet (150 KB)
├── 2024-01-16/
│   └── data.parquet (145 KB)
└── 2024-01-17/
    └── data.parquet (160 KB)`
    },
  ],
  interviewStory: {
    hook: { es: "Construí un pipeline que consume datos de APIs externas con manejo robusto de errores, y logré 99.9% de uptime procesando 50,000 requests diarios.", en: "Built a pipeline consuming external API data with robust error handling, achieving 99.9% uptime processing 50,000 daily requests.", pt: "Construí um pipeline que consome dados de APIs externas com tratamento robusto de erros, e consegui 99.9% de uptime processando 50.000 requests diários." },
    situation: { es: "Necesitaba integrar datos de una API externa para enriquecer nuestro dataset de e-commerce. El problema era que la API tenía rate limits, fallaba ocasionalmente, y necesitábamos datos frescos cada día.", en: "Needed to integrate external API data to enrich our e-commerce dataset. The API had rate limits, failed occasionally, and we needed fresh data daily.", pt: "Precisava integrar dados de uma API externa para enriquecer nosso dataset de e-commerce. O problema era que a API tinha rate limits, falhava ocasionalmente, e precisávamos de dados frescos a cada dia." },
    task: { es: "Construir un pipeline robusto que consumiera la API, manejara todos los casos de error, y guardara los datos de forma particionada para fácil acceso.", en: "Build a robust pipeline to consume the API, handle all error cases, and save data partitioned for easy access.", pt: "Construir um pipeline robusto que consumisse a API, tratasse todos os casos de erro e salvasse os dados de forma particionada para fácil acesso." },
    actions: [
      { es: "Implementé autenticación segura usando variables de entorno - nunca hardcodeé tokens", en: "Implemented secure auth using env vars - never hardcoded tokens", pt: "Implementei autenticação segura usando variáveis de ambiente - nunca hardcodei tokens" },
      { es: "Usé la librería requests con retry automático y exponential backoff", en: "Used requests library with automatic retry and exponential backoff", pt: "Usei a biblioteca requests com retry automático e exponential backoff" },
      { es: "Agregué logging profesional para debuggear problemas en producción", en: "Added professional logging to debug production issues", pt: "Adicionei logging profissional para debuggar problemas em produção" },
      { es: "Implementé timeouts para evitar que el script se colgara", en: "Implemented timeouts to prevent script hanging", pt: "Implementei timeouts para evitar que o script travasse" },
      { es: "Particioné los datos por fecha para queries eficientes", en: "Partitioned data by date for efficient queries", pt: "Particionei os dados por data para queries eficientes" }
    ],
    results: [
      { es: "Pipeline con 99.9% de uptime - solo 1 falla en 3 meses", en: "Pipeline with 99.9% uptime - only 1 failure in 3 months", pt: "Pipeline com 99.9% de uptime - só 1 falha em 3 meses" },
      { es: "Procesamos 50,000 requests diarios sin problemas de rate limit", en: "Processed 50,000 daily requests without rate limit issues", pt: "Processamos 50.000 requests diários sem problemas de rate limit" },
      { es: "Tiempo de recuperación de errores: automático en <1 minuto", en: "Error recovery time: automatic in <1 minute", pt: "Tempo de recuperação de erros: automático em <1 minuto" },
      { es: "Datos disponibles para el equipo de analytics cada mañana a las 6am", en: "Data available for analytics team every morning at 6am", pt: "Dados disponíveis para a equipe de analytics toda manhã às 6am" }
    ],
    learnings: [
      { es: "El manejo de errores es el 80% del código de producción - el happy path es solo el 20%", en: "Error handling is 80% of production code - happy path is only 20%", pt: "O tratamento de erros é 80% do código de produção - o happy path é só 20%" },
      { es: "Exponential backoff es esencial - sin él saturás la API cuando hay problemas", en: "Exponential backoff is essential - without it you saturate the API when there are issues", pt: "Exponential backoff é essencial - sem ele você satura a API quando há problemas" },
      { es: "Logging estructurado (JSON) hace debugging 10x más fácil que print statements", en: "Structured logging (JSON) makes debugging 10x easier than print statements", pt: "Logging estruturado (JSON) torna o debugging 10x mais fácil que print statements" }
    ],
    possibleQuestions: [
      {
        question: { es: "¿Cómo manejaste los rate limits?", en: "How did you handle rate limits?", pt: "Como lidou com os rate limits?" },
        answer: { es: "Implementé exponential backoff con jitter: si recibía 429, esperaba 1s, luego 2s, luego 4s, con un random de ±20% para evitar thundering herd. También distribuí las requests a lo largo del día.", en: "Implemented exponential backoff with jitter: if 429 received, wait 1s, then 2s, then 4s, with ±20% random to avoid thundering herd. Also distributed requests throughout the day.", pt: "Implementei exponential backoff com jitter: se recebia 429, esperava 1s, depois 2s, depois 4s, com um random de ±20% para evitar thundering herd. Também distribuí as requests ao longo do dia." }
      },
      {
        question: { es: "¿Qué pasa si la API está caída por horas?", en: "What if API is down for hours?", pt: "O que acontece se a API cair por horas?" },
        answer: { es: "Tengo un circuit breaker: después de 5 fallos consecutivos, el pipeline se pausa y envía una alerta. Cuando la API vuelve, retoma desde donde quedó gracias a checkpoints.", en: "I have a circuit breaker: after 5 consecutive failures, pipeline pauses and sends alert. When API returns, resumes from checkpoint.", pt: "Tenho um circuit breaker: depois de 5 falhas consecutivas, o pipeline pausa e envia um alerta. Quando a API volta, retoma de onde parou graças a checkpoints." }
      },
      {
        question: { es: "¿Cómo asegurás que los tokens no se filtren?", en: "How do you ensure tokens don't leak?", pt: "Como garante que os tokens não vazem?" },
        answer: { es: "Tres capas: 1) Variables de entorno, nunca en código, 2) .gitignore para .env, 3) Secrets scanning en CI/CD que bloquea commits con tokens.", en: "Three layers: 1) Env vars, never in code, 2) .gitignore for .env, 3) Secrets scanning in CI/CD blocking commits with tokens.", pt: "Três camadas: 1) Variáveis de ambiente, nunca no código, 2) .gitignore para .env, 3) Secrets scanning em CI/CD que bloqueia commits com tokens." }
      }
    ],
    closingStatement: { es: "Este proyecto me enseñó que integrar con APIs externas requiere pensar en todo lo que puede fallar - y va a fallar.", en: "This project taught me integrating with external APIs requires thinking about everything that can fail - and it will fail.", pt: "Este projeto me ensinou que integrar com APIs externas requer pensar em tudo o que pode falhar - e vai falhar." }
  },
  prerequisites: ['p1-etl-python'],
  steps: [
    { 
      order: 1, 
      text: { es: '🔑 Generá tu API Token', en: '🔑 Generate your API Token', pt: '🔑 Gere seu Token de API' },
      explanation: { es: 'Andá a la sección "API Token" en el Dashboard de la plataforma (esquina superior derecha de /members, click en tu avatar → Dashboard). Generá un token y guardalo de forma segura - no lo vas a poder ver de nuevo.', en: 'Go to "API Token" section in Dashboard (top right of /members, click avatar → Dashboard). Generate token and save securely - you won\'t see it again.', pt: 'Vá na seção "API Token" no Dashboard da plataforma (canto superior direito de /members, clique no seu avatar → Dashboard). Gere um token e guarde de forma segura - não vai poder ver de novo.' },
      tip: { es: 'El token se genera desde el Dashboard de la plataforma. Guardalo en un archivo .env antes de continuar.', en: 'Token is generated from Dashboard. Save in .env file before continuing.', pt: 'O token é gerado no Dashboard. Guarde em um arquivo .env antes de continuar.' },
      warning: { es: 'NUNCA pongas tokens en el código. Siempre usá variables de entorno.', en: 'NEVER put tokens in code. Always use env vars.', pt: 'NUNCA coloque tokens no código. Sempre use variáveis de ambiente.' },
      checkpoint: { es: '¿Tenés tu token generado y guardado en .env?', en: 'Have you generated and saved your token in .env?', pt: 'Tem seu token gerado e guardado no .env?' }
    },
    { 
      order: 2, 
      text: { es: '📂 Creá la estructura del proyecto', en: '📂 Create project structure', pt: '📂 Crie a estrutura do projeto' },
      code: `mkdir api-pipeline
cd api-pipeline

# Crear archivos
touch main.py config.py .env .gitignore requirements.txt
mkdir output

# .gitignore - MUY IMPORTANTE
echo ".env
output/
__pycache__/
*.pyc
.DS_Store" > .gitignore`,
      explanation: { es: 'El .gitignore evita que subas secrets o datos a GitHub.', en: '.gitignore prevents uploading secrets or data to GitHub.', pt: 'O .gitignore evita que suba segredos ou dados para o GitHub.' },
      tip: { es: 'Siempre creá el .gitignore ANTES de hacer git init.', en: 'Always create .gitignore BEFORE git init.', pt: 'Sempre crie o .gitignore ANTES de fazer git init.' }
    },
    { 
      order: 3, 
      text: { es: '📦 Instalá dependencias', en: '📦 Install dependencies', pt: '📦 Instale dependências' },
      code: `# requirements.txt
requests>=2.28.0
pandas>=1.5.0
pyarrow>=10.0.0
python-dotenv>=0.21.0

# Instalar
pip install -r requirements.txt`,
      explanation: { es: 'Siempre usá requirements.txt con versiones para reproducibilidad.', en: 'Always use requirements.txt with versions for reproducibility.', pt: 'Sempre use requirements.txt com versões para reprodutibilidade.' }
    },
    { 
      order: 4, 
      text: { es: '🔧 Configurá variables de entorno', en: '🔧 Configure environment variables', pt: '🔧 Configure variáveis de ambiente' },
      code: `# .env (NUNCA subir a git)
API_TOKEN=tu_token_aqui
API_BASE_URL=https://iansaura.com/api

# config.py
import os
from dotenv import load_dotenv

load_dotenv()

API_TOKEN = os.getenv('API_TOKEN')
API_BASE_URL = os.getenv('API_BASE_URL', 'https://iansaura.com/api')

if not API_TOKEN:
    raise ValueError("API_TOKEN no configurado. Creá un archivo .env")`,
      explanation: { es: 'python-dotenv carga variables del archivo .env automáticamente.', en: 'python-dotenv loads .env variables automatically.', pt: 'python-dotenv carrega variáveis do arquivo .env automaticamente.' },
      tip: { es: 'El segundo parámetro de getenv es el valor por defecto si no existe.', en: 'Second parameter of getenv is default value if not exists.', pt: 'O segundo parâmetro de getenv é o valor padrão se não existir.' }
    },
    { 
      order: 5, 
      text: { es: '📥 EXTRACT: Implementá la llamada a la API', en: '📥 EXTRACT: Implement API call', pt: '📥 EXTRACT: Implemente a chamada à API' },
      code: `# main.py
import requests
import logging
from config import API_TOKEN, API_BASE_URL

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def fetch_data(dataset_type: str = 'ecommerce', rows: int = 1000) -> dict:
    """Obtiene datos de la API."""
    url = f"{API_BASE_URL}/datasets.php"
    params = {
        'type': dataset_type,
        'rows': rows,
        'token': API_TOKEN
    }
    
    logger.info(f"Fetching {rows} rows of {dataset_type} data...")
    
    response = requests.get(url, params=params, timeout=30)
    response.raise_for_status()  # Lanza excepción si hay error HTTP
    
    data = response.json()
    logger.info(f"Received {len(data.get('tables', {}).get('orders', []))} orders")
    
    return data`,
      explanation: { es: 'raise_for_status() lanza una excepción si el status code es 4xx o 5xx.', en: 'raise_for_status() raises exception if status code is 4xx or 5xx.', pt: 'raise_for_status() lança exceção se o status code for 4xx ou 5xx.' },
      warning: { es: 'Siempre usá timeout. Sin timeout, tu script puede quedarse colgado indefinidamente.', en: 'Always use timeout. Without it, script can hang indefinitely.', pt: 'Sempre use timeout. Sem timeout, seu script pode ficar travado indefinidamente.' }
    },
    { 
      order: 6, 
      text: { es: '⚠️ Implementá manejo de errores', en: '⚠️ Implement error handling', pt: '⚠️ Implemente tratamento de erros' },
      code: `import time
from requests.exceptions import RequestException, Timeout, HTTPError

def fetch_data_with_retry(
    dataset_type: str = 'ecommerce', 
    rows: int = 1000,
    max_retries: int = 3,
    backoff_factor: float = 2.0
) -> dict:
    """Obtiene datos con reintentos automáticos."""
    
    for attempt in range(max_retries):
        try:
            return fetch_data(dataset_type, rows)
            
        except Timeout:
            logger.warning(f"Timeout en intento {attempt + 1}/{max_retries}")
            
        except HTTPError as e:
            if e.response.status_code >= 500:
                logger.warning(f"Error del servidor: {e}")
            else:
                # Errores 4xx no se reintentan
                logger.error(f"Error del cliente: {e}")
                raise
                
        except RequestException as e:
            logger.warning(f"Error de conexión: {e}")
        
        if attempt < max_retries - 1:
            wait_time = backoff_factor ** attempt
            logger.info(f"Reintentando en {wait_time} segundos...")
            time.sleep(wait_time)
    
    raise Exception(f"Falló después de {max_retries} intentos")`,
      explanation: { es: 'Exponential backoff: cada reintento espera más tiempo (2s, 4s, 8s). Evita sobrecargar el servidor.', en: 'Exponential backoff: each retry waits longer (2s, 4s, 8s). Avoids overloading server.', pt: 'Exponential backoff: cada re tentativa espera mais tempo (2s, 4s, 8s). Evita sobrecarregar o servidor.' },
      tip: { es: 'Los errores 4xx (cliente) no se reintentan porque el problema está en tu request, no en el servidor.', en: '4xx errors (client) are not retried because problem is in your request, not server.', pt: 'Os erros 4xx (cliente) não são re tentados porque o problema está na sua request, não no servidor.' }
    },
    { 
      order: 7, 
      text: { es: '📊 TRANSFORM: Procesá los datos', en: '📊 TRANSFORM: Process data', pt: '📊 TRANSFORM: Processe os dados' },
      code: `import pandas as pd

def transform_data(raw_data: dict) -> pd.DataFrame:
    """Transforma y enriquece los datos."""
    logger.info("Transformando datos...")
    
    # Extraer tabla de orders
    orders = raw_data.get('tables', {}).get('orders', [])
    df = pd.DataFrame(orders)
    
    if df.empty:
        logger.warning("No hay datos para procesar")
        return df
    
    # Convertir tipos
    df['order_date'] = pd.to_datetime(df['order_date'])
    df['total'] = pd.to_numeric(df['total'], errors='coerce')
    
    # Agregar campos calculados
    df['order_month'] = df['order_date'].dt.to_period('M').astype(str)
    df['order_year'] = df['order_date'].dt.year
    df['is_high_value'] = df['total'] > 100
    df['day_of_week'] = df['order_date'].dt.day_name()
    
    # Validaciones
    invalid_totals = df['total'].isna().sum()
    if invalid_totals > 0:
        logger.warning(f"{invalid_totals} órdenes con total inválido")
    
    logger.info(f"Transformadas {len(df)} órdenes")
    return df`,
      explanation: { es: 'Siempre validá los datos después de transformar. Logueá anomalías.', en: 'Always validate data after transforming. Log anomalies.', pt: 'Sempre valide os dados depois de transformar. Logue anomalias.' },
      checkpoint: { es: '¿Tu función maneja el caso de datos vacíos?', en: 'Does your function handle empty data case?', pt: 'Sua função lida com o caso de dados vazios?' }
    },
    { 
      order: 8, 
      text: { es: '💾 LOAD: Guardá particionado', en: '💾 LOAD: Save partitioned', pt: '💾 LOAD: Salve particionado' },
      code: `import os

def save_data(df: pd.DataFrame, output_dir: str = 'output'):
    """Guarda datos particionados por mes."""
    logger.info(f"Guardando datos en {output_dir}/...")
    
    os.makedirs(output_dir, exist_ok=True)
    
    # Guardar particionado por mes
    df.to_parquet(
        f'{output_dir}/orders',
        partition_cols=['order_year', 'order_month'],
        index=False
    )
    
    # También guardar un archivo consolidado
    df.to_parquet(f'{output_dir}/orders_all.parquet', index=False)
    
    # Estadísticas
    logger.info(f"Guardadas {len(df)} órdenes")
    logger.info(f"Particiones: {df['order_month'].nunique()} meses")`,
      explanation: { es: 'Particionar por fecha hace que las queries sean más rápidas: solo lee los meses que necesitás.', en: 'Partitioning by date makes queries faster: only reads months you need.', pt: 'Particionar por data faz as queries serem mais rápidas: só lê os meses que você precisa.' },
      tip: { es: 'La estructura será: output/orders/order_year=2024/order_month=2024-01/data.parquet', en: 'Structure will be: output/orders/order_year=2024/order_month=2024-01/data.parquet', pt: 'A estrutura será: output/orders/order_year=2024/order_month=2024-01/data.parquet' }
    },
    { 
      order: 9, 
      text: { es: '🚀 Armá el pipeline completo', en: '🚀 Assemble full pipeline', pt: '🚀 Monte o pipeline completo' },
      code: `def main():
    """Pipeline principal."""
    logger.info("=" * 50)
    logger.info("API Pipeline - Iniciando")
    logger.info("=" * 50)
    
    try:
        # Extract
        raw_data = fetch_data_with_retry(rows=5000)
        
        # Transform
        df = transform_data(raw_data)
        
        if df.empty:
            logger.error("No hay datos para guardar")
            return
        
        # Load
        save_data(df)
        
        logger.info("=" * 50)
        logger.info("Pipeline completado exitosamente!")
        logger.info("=" * 50)
        
    except Exception as e:
        logger.error(f"Pipeline falló: {e}")
        raise

if __name__ == "__main__":
    main()`,
      explanation: { es: 'El try/except en main() asegura que cualquier error se loguee antes de fallar.', en: 'try/except in main() ensures any error is logged before failing.', pt: 'O try/except em main() garante que qualquer erro seja logado antes de falhar.' },
      checkpoint: { es: '¿Tu pipeline corre sin errores con python main.py?', en: 'Does your pipeline run without errors with python main.py?', pt: 'Seu pipeline roda sem erros com python main.py?' }
    },
    { 
      order: 10, 
      text: { es: '📝 Creá el README', en: '📝 Create README', pt: '📝 Crie o README' },
      code: `# README.md

# API Pipeline - E-commerce Data

Pipeline que consume datos de la API de e-commerce, los transforma, y los guarda particionados.

## Setup

1. Cloná el repo
2. Creá un archivo \`.env\` con tu token:
   \`\`\`
   API_TOKEN=tu_token_aqui
   \`\`\`
3. Instalá dependencias:
   \`\`\`bash
   pip install -r requirements.txt
   \`\`\`

## Uso

\`\`\`bash
python main.py
\`\`\`

## Output

Los datos se guardan en \`output/\` particionados por año y mes:
\`\`\`
output/
├── orders/
│   ├── order_year=2024/
│   │   ├── order_month=2024-01/
│   │   ├── order_month=2024-02/
│   │   └── ...
└── orders_all.parquet
\`\`\`

## Autor
[Tu nombre]`,
      explanation: { es: 'Un buen README hace que tu proyecto sea profesional y fácil de usar.', en: 'A good README makes your project professional and easy to use.', pt: 'Um bom README torna seu projeto profissional e fácil de usar.' }
    },
    { 
      order: 11, 
      text: { es: '🚀 Subí a GitHub', en: '🚀 Upload to GitHub', pt: '🚀 Suba para o GitHub' },
      code: `git init
git add .
git commit -m "API Pipeline con manejo de errores y particionamiento"
git remote add origin https://github.com/TU_USUARIO/api-pipeline.git
git push -u origin main`,
      warning: { es: 'Verificá que .env NO esté en el commit: git status debe mostrar .env en "Untracked files".', en: 'Verify .env is NOT in commit: git status must show .env in "Untracked files".', pt: 'Verifique que .env NÃO está no commit: git status deve mostrar .env em "Untracked files".' }
    },
  ],
  deliverable: { es: 'Repositorio con: main.py, config.py, requirements.txt, README.md, .gitignore (sin .env)', en: 'Repository with: main.py, config.py, requirements.txt, README.md, .gitignore (without .env)', pt: 'Repositório com: main.py, config.py, requirements.txt, README.md, .gitignore (sem .env)' },
  evaluation: [
    { es: '¿El script maneja errores de conexión sin crashear?', en: 'Does script handle connection errors without crashing?', pt: 'O script lida com erros de conexão sem crashar?' },
    { es: '¿Implementaste reintentos con exponential backoff?', en: 'Did you implement retries with exponential backoff?', pt: 'Implementou re tentativas com exponential backoff?' },
    { es: '¿Los logs muestran claramente qué está pasando?', en: 'Do logs clearly show what is happening?', pt: 'Os logs mostram claramente o que está acontecendo?' },
    { es: '¿El .env NO está en el repositorio?', en: 'Is .env NOT in repository?', pt: 'O .env NÃO está no repositório?' },
    { es: '¿El Parquet está particionado correctamente?', en: 'Is Parquet partitioned correctly?', pt: 'O Parquet está particionado corretamente?' },
    { es: '¿El README explica cómo configurar y correr?', en: 'Does README explain how to configure and run?', pt: 'O README explica como configurar e rodar?' },
  ],
  codeExample: `# main.py - Pipeline Completo
import os
import time
import logging
import pandas as pd
import requests
from requests.exceptions import RequestException, Timeout, HTTPError
from config import API_TOKEN, API_BASE_URL

# Configurar logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

def fetch_data_with_retry(
    dataset_type: str = 'ecommerce',
    rows: int = 1000,
    max_retries: int = 3
) -> dict:
    """Obtiene datos de la API con reintentos."""
    url = f"{API_BASE_URL}/datasets.php"
    params = {'type': dataset_type, 'rows': rows, 'token': API_TOKEN}
    
    for attempt in range(max_retries):
        try:
            logger.info(f"Fetching data (attempt {attempt + 1}/{max_retries})")
            response = requests.get(url, params=params, timeout=30)
            response.raise_for_status()
            return response.json()
        except (Timeout, RequestException) as e:
            logger.warning(f"Request failed: {e}")
            if attempt < max_retries - 1:
                time.sleep(2 ** attempt)
            else:
                raise
    
def transform_data(raw_data: dict) -> pd.DataFrame:
    """Transforma los datos."""
    orders = raw_data.get('tables', {}).get('orders', [])
    df = pd.DataFrame(orders)
    df['order_date'] = pd.to_datetime(df['order_date'])
    df['order_month'] = df['order_date'].dt.to_period('M').astype(str)
    df['is_high_value'] = df['total'] > 100
    return df

def save_data(df: pd.DataFrame, output_dir: str = 'output'):
    """Guarda datos particionados."""
    os.makedirs(output_dir, exist_ok=True)
    df.to_parquet(f'{output_dir}/orders', partition_cols=['order_month'])
    logger.info(f"Saved {len(df)} records")

def main():
    logger.info("Starting API Pipeline")
    raw_data = fetch_data_with_retry(rows=5000)
    df = transform_data(raw_data)
    save_data(df)
    logger.info("Pipeline completed!")

if __name__ == "__main__":
    main()`,
  theory: { es: `## APIs en Data Engineering

Las APIs son una fuente de datos fundamental. El 70% de los datos que vas a consumir vienen de APIs.

### Manejo de Errores

| Error | Causa | Acción |
|-------|-------|--------|
| Timeout | Red lenta | Reintentar |
| 429 | Rate limit | Esperar y reintentar |
| 500 | Error del servidor | Reintentar |
| 401 | Token inválido | NO reintentar, revisar token |
| 404 | Endpoint no existe | NO reintentar, revisar URL |

### Exponential Backoff

En vez de reintentar inmediatamente, esperás cada vez más:
- Intento 1: esperar 2 segundos
- Intento 2: esperar 4 segundos
- Intento 3: esperar 8 segundos

Esto evita sobrecargar el servidor cuando tiene problemas.

### Variables de Entorno

NUNCA pongas secrets en el código:
- ❌ \`API_TOKEN = "abc123"\`
- ✅ \`API_TOKEN = os.getenv('API_TOKEN')\`

El archivo .env contiene los secrets y NUNCA se sube a git.`, en: `## APIs in Data Engineering

APIs are a fundamental data source. 70% of data you consume comes from APIs.

### Error Handling

| Error | Cause | Action |
|-------|-------|--------|
| Timeout | Slow network | Retry |
| 429 | Rate limit | Wait and retry |
| 500 | Server error | Retry |
| 401 | Invalid token | DO NOT retry, check token |
| 404 | Endpoint not found | DO NOT retry, check URL |

### Exponential Backoff

Instead of retrying immediately, you wait longer each time:
- Attempt 1: wait 2 seconds
- Attempt 2: wait 4 seconds
- Attempt 3: wait 8 seconds

This avoids overloading the server when it has issues.

### Environment Variables

NEVER put secrets in code:
- ❌ \`API_TOKEN = "abc123"\`
- ✅ \`API_TOKEN = os.getenv('API_TOKEN')\`

.env file contains secrets and is NEVER pushed to git.`, pt: `## APIs em Data Engineering

APIs são uma fonte de dados fundamental. 70% dos dados que você vai consumir vêm de APIs.

### Tratamento de Erros

| Erro | Causa | Ação |
|------|-------|--------|
| Timeout | Rede lenta | Re tentar |
| 429 | Rate limit | Esperar e re tentar |
| 500 | Erro do servidor | Re tentar |
| 401 | Token inválido | NÃO re tentar, revisar token |
| 404 | Endpoint não existe | NÃO re tentar, revisar URL |

### Exponential Backoff

Em vez de re tentar imediatamente, espera cada vez mais:
- Tentativa 1: esperar 2 segundos
- Tentativa 2: esperar 4 segundos
- Tentativa 3: esperar 8 segundos

Isso evita sobrecarregar o servidor quando tem problemas.

### Variáveis de Ambiente

NUNCA coloque segredos no código:
- ❌ \`API_TOKEN = "abc123"\`
- ✅ \`API_TOKEN = os.getenv('API_TOKEN')\`

O arquivo .env contém os segredos e NUNCA sobe para o git.` },
  nextSteps: [
    { es: 'Agregá más validaciones a los datos', en: 'Add more data validations', pt: 'Adicione mais validações aos dados' },
    { es: 'Implementá un modo "incremental" que solo traiga datos nuevos', en: 'Implement "incremental" mode fetching only new data', pt: 'Implemente um modo "incremental" que só traga dados novos' },
    { es: 'Conectá con Airflow para que corra automáticamente', en: 'Connect with Airflow to run automatically', pt: 'Conecte com Airflow para rodar automaticamente' },
  ],
  resources: [
    { title: { es: 'Requests Library', en: 'Requests Library', pt: 'Biblioteca Requests' }, url: 'https://requests.readthedocs.io/', type: 'docs' },
    { title: { es: 'Python Logging', en: 'Python Logging', pt: 'Python Logging' }, url: 'https://docs.python.org/3/howto/logging.html', type: 'docs' },
  ],
};


