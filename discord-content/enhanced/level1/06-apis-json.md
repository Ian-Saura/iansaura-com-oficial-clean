---
id: "l1-apis-json"
version: "1.0.0"
lastUpdated: "2026-01-05"

title:
  es: "APIs y JSON: Conectando con el Mundo"
  en: "APIs and JSON: Connecting with the World"
  pt: "APIs e JSON: Conectando com o Mundo"

subtitle:
  es: "El 90% de los datos vienen de APIs"
  en: "90% of data comes from APIs"
  pt: "90% dos dados vêm de APIs"

level: 1
phase: "l1-apis"
estimatedTime: "10-12 horas"

prerequisites:
  - "l1-python-fundamentals"

tags:
  - "api"
  - "rest"
  - "json"
  - "http"
  - "data-ingestion"

theoreticalFoundations:
  - "Protocolo HTTP"
  - "REST architectural style"
  - "Serialización de datos"
  - "Autenticación y autorización"
---

<!-- 
╔══════════════════════════════════════════════════════════════╗
║  📚 BLOQUE: APIs y JSON                                      ║
║  Nivel: 1 | Fase: Ingesta de Datos                           ║
╚══════════════════════════════════════════════════════════════╝
-->

# 🔌 APIs y JSON: Conectando con el Mundo

> **Objetivo**: Dominar el consumo de APIs REST y el manejo de JSON para ingesta de datos. Entender autenticación, paginación, rate limiting.

---

## 🧠 Mapa Conceptual

```mermaid
mindmap
  root((APIs &
    JSON))
    🌐 HTTP Fundamentals
      Métodos
        GET leer
        POST crear
        PUT actualizar
        DELETE eliminar
      Status Codes
        2xx éxito
        4xx error cliente
        5xx error servidor
      Headers
        Content-Type
        Authorization
        Rate Limits
    📄 JSON
      Estructura
        Objects {}
        Arrays []
        Primitives
      Parsing
        json.loads
        json.dumps
      Nested data
        Aplanar
        Normalizar
    🔐 Autenticación
      API Keys
        Header
        Query param
      OAuth 2.0
        Bearer tokens
        Refresh tokens
      JWT
        Claims
        Expiration
    ⚡ Patrones
      Paginación
        Offset
        Cursor
        Link headers
      Rate Limiting
        Backoff
        Retry
      Error Handling
        Timeouts
        Retries
```

---

## 🔗 First Principles: De la Teoría a la Práctica

| Concepto CS | Qué significa | Implementación práctica |
|-------------|---------------|------------------------|
| **REST** | Representational State Transfer | Arquitectura donde URLs representan recursos y verbos HTTP representan acciones. Stateless: cada request contiene toda la info necesaria. |
| **Serialización** | Convertir objetos a texto transmisible | JSON es texto estructurado. Python dict ↔ JSON string. Necesario porque HTTP transmite texto. |
| **Idempotencia** | Repetir operación da mismo resultado | GET, PUT, DELETE son idempotentes. POST no (crea nuevo recurso cada vez). Importante para retries. |
| **Rate Limiting** | Limitar requests por tiempo | APIs protegen sus servidores limitando requests. Típico: 100 req/min. Debes manejar 429 Too Many Requests. |
| **Stateless** | Servidor no guarda estado entre requests | Cada request debe incluir autenticación. No hay "sesión" como en web tradicional. |

> [!IMPORTANT]
> 🧠 **First Principle clave**: Una API REST es una **interfaz sobre HTTP** donde URLs identifican recursos y verbos HTTP definen acciones. Es **stateless**: el servidor no recuerda requests anteriores, por eso cada request lleva token de autenticación.

---

## 📋 Technical Cheat Sheet

### 🖥️ HTTP Status Codes Críticos

```python
# Códigos que DEBES conocer

# ✅ 2xx - Éxito
200  # OK - Request exitoso
201  # Created - Recurso creado (respuesta a POST)
204  # No Content - Éxito pero sin body (común en DELETE)

# ⚠️ 4xx - Error del cliente (TU problema)
400  # Bad Request - Datos inválidos
401  # Unauthorized - Falta autenticación o inválida
403  # Forbidden - Autenticado pero sin permiso
404  # Not Found - Recurso no existe
422  # Unprocessable Entity - Datos válidos pero lógica falla
429  # Too Many Requests - Rate limit excedido

# 🔥 5xx - Error del servidor (SU problema)
500  # Internal Server Error - Bug en el servidor
502  # Bad Gateway - Servidor upstream falló
503  # Service Unavailable - Servidor sobrecargado
504  # Gateway Timeout - Servidor upstream no respondió
```

### 📝 Snippets de Alta Densidad

#### Patrón 1: Request Básico con requests

```python
# 🔥 BEST PRACTICE: Siempre usar timeout, siempre verificar status

import requests

# GET básico
response = requests.get(
    'https://api.example.com/users',
    timeout=30  # SIEMPRE especificar timeout
)

# Verificar éxito
response.raise_for_status()  # Lanza excepción si status >= 400

# Parsear JSON
data = response.json()

# Con parámetros de query
response = requests.get(
    'https://api.example.com/users',
    params={
        'status': 'active',
        'limit': 100,
        'page': 1
    },
    timeout=30
)
# URL resultante: .../users?status=active&limit=100&page=1

# Con headers (autenticación)
response = requests.get(
    'https://api.example.com/users',
    headers={
        'Authorization': 'Bearer your-token-here',
        'Accept': 'application/json'
    },
    timeout=30
)
```

#### Patrón 2: Manejo Robusto de Errores

```python
# 🔥 BEST PRACTICE: Error handling específico para APIs
import requests
from requests.exceptions import HTTPError, Timeout, RequestException
import time

def fetch_with_retry(url: str, max_retries: int = 3, backoff: float = 1.0):
    """Fetch con retry y exponential backoff."""
    
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=30)
            response.raise_for_status()
            return response.json()
            
        except Timeout:
            print(f"Timeout en intento {attempt + 1}")
            if attempt < max_retries - 1:
                time.sleep(backoff * (2 ** attempt))  # Exponential backoff
            else:
                raise
                
        except HTTPError as e:
            if e.response.status_code == 429:  # Rate limited
                retry_after = int(e.response.headers.get('Retry-After', 60))
                print(f"Rate limited. Esperando {retry_after}s")
                time.sleep(retry_after)
            elif e.response.status_code >= 500:  # Server error, retry
                print(f"Server error {e.response.status_code}, reintentando...")
                time.sleep(backoff * (2 ** attempt))
            else:  # 4xx errors, no retry
                raise
                
        except RequestException as e:
            print(f"Error de conexión: {e}")
            if attempt < max_retries - 1:
                time.sleep(backoff * (2 ** attempt))
            else:
                raise

    raise Exception(f"Failed after {max_retries} attempts")
```

#### Patrón 3: Paginación

```python
# 🔥 BEST PRACTICE: Manejar paginación automáticamente

# Tipo 1: Paginación por offset
def fetch_all_offset_pagination(base_url: str, page_size: int = 100):
    """Obtener todos los resultados con paginación offset."""
    all_results = []
    page = 1
    
    while True:
        response = requests.get(
            base_url,
            params={'page': page, 'limit': page_size},
            timeout=30
        )
        response.raise_for_status()
        data = response.json()
        
        results = data.get('results', [])
        all_results.extend(results)
        
        # Condición de parada
        if len(results) < page_size:  # Última página
            break
        page += 1
    
    return all_results

# Tipo 2: Paginación por cursor (más eficiente)
def fetch_all_cursor_pagination(base_url: str):
    """Obtener todos los resultados con paginación cursor."""
    all_results = []
    cursor = None
    
    while True:
        params = {'limit': 100}
        if cursor:
            params['cursor'] = cursor
            
        response = requests.get(base_url, params=params, timeout=30)
        response.raise_for_status()
        data = response.json()
        
        all_results.extend(data.get('results', []))
        
        cursor = data.get('next_cursor')
        if not cursor:  # No más páginas
            break
    
    return all_results

# Tipo 3: Link headers (GitHub style)
def fetch_all_link_pagination(url: str):
    """Obtener todos los resultados siguiendo Link headers."""
    all_results = []
    
    while url:
        response = requests.get(url, timeout=30)
        response.raise_for_status()
        all_results.extend(response.json())
        
        # Parsear Link header
        links = response.headers.get('Link', '')
        url = None
        for link in links.split(','):
            if 'rel="next"' in link:
                url = link.split(';')[0].strip(' <>')
                break
    
    return all_results
```

#### Patrón 4: Trabajar con JSON Anidado

```python
# 🔥 BEST PRACTICE: Aplanar JSON anidado para DataFrames
import pandas as pd
from pandas import json_normalize

# JSON anidado típico de una API
data = {
    "id": 1,
    "name": "John",
    "address": {
        "city": "Buenos Aires",
        "country": "Argentina"
    },
    "orders": [
        {"id": 101, "total": 100},
        {"id": 102, "total": 200}
    ]
}

# Aplanar con json_normalize
df = json_normalize(data)
# Columnas: id, name, address.city, address.country

# Para listas anidadas, usar record_path
orders_df = json_normalize(
    data,
    record_path='orders',  # Lista a expandir
    meta=['id', 'name'],   # Campos del padre a incluir
    meta_prefix='user_'
)
# Columnas: id, total, user_id, user_name

# Para múltiples registros
users = [
    {"id": 1, "name": "John", "address": {"city": "BA"}},
    {"id": 2, "name": "Jane", "address": {"city": "Santiago"}},
]
df = json_normalize(users)
```

#### Patrón 5: Session para Múltiples Requests

```python
# 🔥 BEST PRACTICE: Usar Session para conexiones persistentes
import requests

# Session reutiliza conexiones TCP (más eficiente)
with requests.Session() as session:
    session.headers.update({
        'Authorization': 'Bearer your-token',
        'Accept': 'application/json'
    })
    
    # Múltiples requests reutilizan la conexión
    users = session.get('https://api.example.com/users', timeout=30).json()
    orders = session.get('https://api.example.com/orders', timeout=30).json()
    products = session.get('https://api.example.com/products', timeout=30).json()

# Usar Session con retry automático
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def create_session_with_retry():
    session = requests.Session()
    
    retry_strategy = Retry(
        total=3,
        backoff_factor=1,
        status_forcelist=[429, 500, 502, 503, 504]
    )
    
    adapter = HTTPAdapter(max_retries=retry_strategy)
    session.mount("https://", adapter)
    session.mount("http://", adapter)
    
    return session

session = create_session_with_retry()
response = session.get('https://api.example.com/data')
```

### 🏗️ Patrones de Diseño Aplicados

#### 1. API Client Class

```python
# Encapsular lógica de API en una clase reutilizable
from dataclasses import dataclass
from typing import Optional, Dict, Any
import requests

@dataclass
class APIClient:
    """Cliente genérico para APIs REST."""
    
    base_url: str
    api_key: str
    timeout: int = 30
    
    def __post_init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'Authorization': f'Bearer {self.api_key}',
            'Accept': 'application/json'
        })
    
    def _request(
        self, 
        method: str, 
        endpoint: str, 
        params: Optional[Dict] = None,
        json: Optional[Dict] = None
    ) -> Any:
        url = f"{self.base_url.rstrip('/')}/{endpoint.lstrip('/')}"
        response = self.session.request(
            method=method,
            url=url,
            params=params,
            json=json,
            timeout=self.timeout
        )
        response.raise_for_status()
        return response.json()
    
    def get(self, endpoint: str, **params) -> Any:
        return self._request('GET', endpoint, params=params)
    
    def post(self, endpoint: str, data: Dict) -> Any:
        return self._request('POST', endpoint, json=data)

# Uso
client = APIClient(
    base_url='https://api.example.com/v1',
    api_key='your-key'
)
users = client.get('/users', status='active', limit=100)
```

#### 2. Incremental Data Fetcher

```python
# Para pipelines que necesitan datos incrementales
from datetime import datetime, timedelta
from typing import Iterator, Dict

class IncrementalFetcher:
    """Fetcher que obtiene solo datos nuevos desde última ejecución."""
    
    def __init__(self, client: APIClient, state_file: str):
        self.client = client
        self.state_file = state_file
    
    def get_last_timestamp(self) -> datetime:
        try:
            with open(self.state_file) as f:
                return datetime.fromisoformat(f.read().strip())
        except FileNotFoundError:
            return datetime.now() - timedelta(days=30)  # Default: últimos 30 días
    
    def save_timestamp(self, ts: datetime):
        with open(self.state_file, 'w') as f:
            f.write(ts.isoformat())
    
    def fetch_incremental(self, endpoint: str) -> Iterator[Dict]:
        since = self.get_last_timestamp()
        max_ts = since
        
        for page in self._paginate(endpoint, since):
            for record in page:
                record_ts = datetime.fromisoformat(record['updated_at'])
                if record_ts > max_ts:
                    max_ts = record_ts
                yield record
        
        self.save_timestamp(max_ts)
```

### ⚠️ Gotchas de Nivel Senior

> [!WARNING]
> **Gotcha #1: No especificar timeout**
> 
> Sin timeout, tu código puede colgarse indefinidamente.
> 
> ```python
> # ❌ PELIGROSO - Puede colgarse para siempre
> response = requests.get('https://api.example.com/slow')
> 
> # ✅ SIEMPRE especificar timeout
> response = requests.get('https://api.example.com/slow', timeout=30)
> 
> # Timeout separado para conexión y lectura
> response = requests.get(url, timeout=(3, 30))  # 3s connect, 30s read
> ```

> [!WARNING]
> **Gotcha #2: Rate Limits no documentados**
> 
> Muchas APIs tienen rate limits que no documentan claramente.
> 
> ```python
> # ✅ Siempre agregar delay entre requests
> import time
> 
> for user_id in user_ids:
>     data = fetch_user(user_id)
>     process(data)
>     time.sleep(0.1)  # 100ms entre requests = max 10 req/s
> 
> # ✅ Mejor: respetar headers de rate limit
> remaining = int(response.headers.get('X-RateLimit-Remaining', 100))
> if remaining < 10:
>     reset_time = int(response.headers.get('X-RateLimit-Reset', 60))
>     time.sleep(reset_time)
> ```

> [!WARNING]
> **Gotcha #3: JSON con fechas**
> 
> JSON no tiene tipo nativo para fechas. Cada API usa formato diferente.
> 
> ```python
> # Formatos comunes
> "2024-01-15T10:30:00Z"           # ISO 8601 (más común)
> "2024-01-15T10:30:00+00:00"      # ISO con offset
> "2024-01-15"                      # Solo fecha
> 1705315800                        # Unix timestamp
> "01/15/2024"                      # US format (ambiguo!)
> 
> # ✅ Parsear explícitamente
> from datetime import datetime
> 
> # ISO format
> dt = datetime.fromisoformat(date_str.replace('Z', '+00:00'))
> 
> # Unix timestamp
> dt = datetime.fromtimestamp(timestamp)
> 
> # Con pandas (más robusto)
> df['date'] = pd.to_datetime(df['date_string'], utc=True)
> ```

> [!WARNING]
> **Gotcha #4: APIs que cambian sin aviso**
> 
> Los campos pueden aparecer/desaparecer, cambiar de tipo.
> 
> ```python
> # ❌ FRÁGIL
> user_email = response['user']['profile']['email']  # KeyError si falta
> 
> # ✅ ROBUSTO
> user_email = response.get('user', {}).get('profile', {}).get('email')
> 
> # ✅ O validar con schema
> from pydantic import BaseModel
> 
> class UserProfile(BaseModel):
>     email: str | None = None
>     name: str
> 
> profile = UserProfile(**response['profile'])
> ```

---

## 📚 Bibliografía Académica y Profesional

### 📖 Referencias Clave

| Recurso | Tipo | Por qué leerlo |
|---------|------|----------------|
| **RESTful Web APIs** | Libro - Leonard Richardson | Diseño de APIs REST. Entiende por qué las APIs funcionan así. |
| **HTTP/1.1 Specification** | RFC 2616 | La especificación original del protocolo. |
| **requests Documentation** | Docs | La librería más usada para HTTP en Python. |

### 📋 APIs para Practicar

- **JSONPlaceholder** - 🔗 [jsonplaceholder.typicode.com](https://jsonplaceholder.typicode.com/) - API fake para testing
- **OpenWeather** - 🔗 [openweathermap.org](https://openweathermap.org/api) - Datos climáticos
- **Alpha Vantage** - 🔗 [alphavantage.co](https://www.alphavantage.co/) - Datos financieros
- **GitHub API** - 🔗 [docs.github.com](https://docs.github.com/en/rest) - Excelente documentación

---

## ✅ Checklist de Dominio

Antes de avanzar, verifica que puedes:

- [ ] Hacer requests GET con parámetros y headers
- [ ] Manejar errores HTTP correctamente (try/except, status codes)
- [ ] Implementar retry con exponential backoff
- [ ] Manejar paginación automáticamente
- [ ] Parsear JSON anidado a DataFrames
- [ ] Usar Session para requests eficientes
- [ ] Explicar diferencia entre autenticación y autorización
- [ ] Trabajar con API keys y Bearer tokens
- [ ] Respetar rate limits de APIs
- [ ] Completar el proyecto API Pipeline

---

*Última actualización: Enero 2026 | Versión: 1.0.0*

