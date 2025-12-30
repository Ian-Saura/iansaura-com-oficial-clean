import { DatabricksLab } from './types';

/**
 * Labs de Delta Lake
 * El corazón del Lakehouse
 */
export const DATABRICKS_LABS_DELTA_LAKE: DatabricksLab[] = [
  // =====================================================
  // LAB 4: Introducción a Delta Lake
  // =====================================================
  {
    id: 'db-lab-004',
    title: {
      es: '🔷 Introducción a Delta Lake',
      en: '🔷 Introduction to Delta Lake',
      pt: '🔷 Introdução ao Delta Lake'
    },
    subtitle: {
      es: 'ACID, Time Travel y Schema Enforcement',
      en: 'ACID, Time Travel and Schema Enforcement',
      pt: 'ACID, Time Travel e Schema Enforcement'
    },
    description: {
      es: 'Descubre Delta Lake, el formato de almacenamiento que hace posible el Lakehouse. Aprenderás sobre transacciones ACID, time travel, y schema enforcement.',
      en: 'Discover Delta Lake, the storage format that makes Lakehouse possible. You will learn about ACID transactions, time travel, and schema enforcement.',
      pt: 'Descubra o Delta Lake, o formato de armazenamento que torna o Lakehouse possível. Você aprenderá sobre transações ACID, time travel e schema enforcement.'
    },
    difficulty: 'intermediate',
    estimatedMinutes: 50,
    relatedPhases: ['db-phase-5'],
    prerequisites: [
      { es: 'Labs 1-3 completados', en: 'Labs 1-3 completed', pt: 'Labs 1-3 completados' },
      { es: 'Entender conceptos básicos de bases de datos', en: 'Understand basic database concepts', pt: 'Entender conceitos básicos de bancos de dados' }
    ],
    objectives: [
      { es: 'Crear y gestionar tablas Delta', en: 'Create and manage Delta tables', pt: 'Criar e gerenciar tabelas Delta' },
      { es: 'Usar Time Travel para ver versiones anteriores', en: 'Use Time Travel to view previous versions', pt: 'Usar Time Travel para ver versões anteriores' },
      { es: 'Entender schema enforcement y evolution', en: 'Understand schema enforcement and evolution', pt: 'Entender schema enforcement e evolution' },
      { es: 'Ver el historial de una tabla', en: 'View table history', pt: 'Ver o histórico de uma tabela' }
    ],
    steps: [
      {
        id: 'lab004-step1',
        title: { es: '¿Qué es Delta Lake?', en: 'What is Delta Lake?', pt: 'O que é Delta Lake?' },
        description: {
          es: 'Delta Lake es un formato de almacenamiento open-source que agrega ACID transactions, schema enforcement, y time travel a data lakes.',
          en: 'Delta Lake is an open-source storage format that adds ACID transactions, schema enforcement, and time travel to data lakes.',
          pt: 'Delta Lake é um formato de armazenamento open-source que adiciona transações ACID, schema enforcement e time travel a data lakes.'
        },
        code: `# Delta Lake = Parquet + Transaction Log
# 
# Ventajas sobre Parquet puro:
# ✅ ACID transactions (lecturas/escrituras consistentes)
# ✅ Time Travel (volver a versiones anteriores)
# ✅ Schema enforcement (rechaza datos incorrectos)
# ✅ Schema evolution (agregar columnas)
# ✅ MERGE, UPDATE, DELETE (impossible en Parquet)
# ✅ Optimización automática (OPTIMIZE, Z-ORDER)

# Ver que Delta Lake ya está disponible
print(f"Versión de Delta Lake: {spark.conf.get('spark.databricks.delta.version')}")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab004-step2',
        title: { es: 'Crear tabla Delta', en: 'Create Delta table', pt: 'Criar tabela Delta' },
        description: {
          es: 'Crea tu primera tabla Delta desde un DataFrame.',
          en: 'Create your first Delta table from a DataFrame.',
          pt: 'Crie sua primeira tabela Delta de um DataFrame.'
        },
        code: `# Crear datos de productos
productos_data = [
    (1, "Laptop Pro", "Electronics", 1299.99, 50),
    (2, "Wireless Mouse", "Electronics", 29.99, 200),
    (3, "USB-C Hub", "Electronics", 49.99, 150),
    (4, "Desk Chair", "Furniture", 299.99, 30),
    (5, "Standing Desk", "Furniture", 599.99, 20)
]

df_productos = spark.createDataFrame(
    productos_data,
    ["product_id", "name", "category", "price", "stock"]
)

# Guardar como tabla Delta
df_productos.write.format("delta").mode("overwrite").save("/tmp/delta/productos")

# También podemos crear como tabla registrada
df_productos.write.format("delta").mode("overwrite").saveAsTable("productos_delta")

print("✅ Tabla Delta creada!")

# Verificar
spark.read.format("delta").load("/tmp/delta/productos").show()`,
        codeLanguage: 'python',
        tip: { es: '💡 format("delta") es la clave para usar Delta Lake', en: '💡 format("delta") is the key to using Delta Lake', pt: '💡 format("delta") é a chave para usar o Delta Lake' }
      },
      {
        id: 'lab004-step3',
        title: { es: 'UPDATE y DELETE', en: 'UPDATE and DELETE', pt: 'UPDATE e DELETE' },
        description: {
          es: 'A diferencia de Parquet, Delta Lake soporta UPDATE y DELETE.',
          en: 'Unlike Parquet, Delta Lake supports UPDATE and DELETE.',
          pt: 'Diferente do Parquet, o Delta Lake suporta UPDATE e DELETE.'
        },
        code: `%sql
-- Actualizar precio de un producto
UPDATE productos_delta
SET price = 1199.99
WHERE product_id = 1;

-- Verificar el cambio
SELECT * FROM productos_delta WHERE product_id = 1;

-- Eliminar producto con stock bajo
DELETE FROM productos_delta
WHERE stock < 25;

-- Verificar
SELECT * FROM productos_delta;`,
        codeLanguage: 'sql',
        checkpoint: { es: '¿Cuántos productos quedan después del DELETE?', en: 'How many products remain after DELETE?', pt: 'Quantos produtos restam após o DELETE?' }
      },
      {
        id: 'lab004-step4',
        title: { es: 'Ver historial de la tabla', en: 'View table history', pt: 'Ver histórico da tabela' },
        description: {
          es: 'Delta Lake mantiene un registro de todas las operaciones realizadas.',
          en: 'Delta Lake keeps a record of all operations performed.',
          pt: 'O Delta Lake mantém um registro de todas as operações realizadas.'
        },
        code: `%sql
-- Ver historial completo
DESCRIBE HISTORY productos_delta;

-- Historial limitado
DESCRIBE HISTORY productos_delta LIMIT 5;`,
        codeLanguage: 'sql',
        tip: { es: '💡 El historial muestra quién, cuándo y qué operación se hizo', en: '💡 History shows who, when and what operation was done', pt: '💡 O histórico mostra quem, quando e que operação foi feita' }
      },
      {
        id: 'lab004-step5',
        title: { es: 'Time Travel', en: 'Time Travel', pt: 'Time Travel' },
        description: {
          es: 'Viaja en el tiempo para ver versiones anteriores de tus datos.',
          en: 'Time travel to see previous versions of your data.',
          pt: 'Viaje no tempo para ver versões anteriores dos seus dados.'
        },
        code: `%sql
-- Ver datos de la versión 0 (inicial)
SELECT * FROM productos_delta VERSION AS OF 0;

-- También puedes usar timestamp
-- SELECT * FROM productos_delta TIMESTAMP AS OF '2024-01-15 10:00:00';

-- Comparar versión actual vs anterior
SELECT 'actual' as version, * FROM productos_delta
UNION ALL
SELECT 'version_0' as version, * FROM productos_delta VERSION AS OF 0;`,
        codeLanguage: 'sql'
      },
      {
        id: 'lab004-step6',
        title: { es: 'Time Travel con Python', en: 'Time Travel with Python', pt: 'Time Travel com Python' },
        description: {
          es: 'También puedes hacer time travel desde Python.',
          en: 'You can also do time travel from Python.',
          pt: 'Você também pode fazer time travel do Python.'
        },
        code: `from delta.tables import DeltaTable

# Leer versión específica
df_v0 = spark.read.format("delta").option("versionAsOf", 0).load("/tmp/delta/productos")
print("Versión 0:")
df_v0.show()

# Leer versión actual
df_actual = spark.read.format("delta").load("/tmp/delta/productos")
print("Versión actual:")
df_actual.show()

# Contar diferencia
print(f"Diferencia de registros: {df_v0.count() - df_actual.count()}")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab004-step7',
        title: { es: 'Schema Enforcement', en: 'Schema Enforcement', pt: 'Schema Enforcement' },
        description: {
          es: 'Delta Lake rechaza datos que no coinciden con el schema.',
          en: 'Delta Lake rejects data that doesn\'t match the schema.',
          pt: 'O Delta Lake rejeita dados que não correspondem ao schema.'
        },
        code: `# Intentar insertar datos con schema diferente
bad_data = [
    (6, "New Product", "Electronics", "INVALID_PRICE", 100)  # price debería ser float
]

df_bad = spark.createDataFrame(bad_data, ["product_id", "name", "category", "price", "stock"])

try:
    df_bad.write.format("delta").mode("append").save("/tmp/delta/productos")
except Exception as e:
    print(f"❌ Error esperado: {type(e).__name__}")
    print("Delta Lake rechazó los datos porque el schema no coincide")
    
# Con datos correctos funciona
good_data = [(6, "New Product", "Electronics", 99.99, 100)]
df_good = spark.createDataFrame(good_data, ["product_id", "name", "category", "price", "stock"])
df_good.write.format("delta").mode("append").save("/tmp/delta/productos")
print("✅ Datos correctos insertados")`,
        codeLanguage: 'python',
        warning: { es: '⚠️ Schema enforcement es estricto por default', en: '⚠️ Schema enforcement is strict by default', pt: '⚠️ Schema enforcement é estrito por padrão' }
      },
      {
        id: 'lab004-step8',
        title: { es: 'Schema Evolution', en: 'Schema Evolution', pt: 'Schema Evolution' },
        description: {
          es: 'Agrega nuevas columnas a una tabla existente.',
          en: 'Add new columns to an existing table.',
          pt: 'Adicione novas colunas a uma tabela existente.'
        },
        code: `# Datos con columna nueva
new_data_with_column = [(7, "Premium Item", "Electronics", 199.99, 50, "2024-01-20")]
df_new = spark.createDataFrame(
    new_data_with_column, 
    ["product_id", "name", "category", "price", "stock", "added_date"]
)

# Sin mergeSchema, esto falla
# Con mergeSchema, agrega la nueva columna
df_new.write.format("delta") \\
    .mode("append") \\
    .option("mergeSchema", "true") \\
    .save("/tmp/delta/productos")

# Verificar nuevo schema
spark.read.format("delta").load("/tmp/delta/productos").printSchema()
spark.read.format("delta").load("/tmp/delta/productos").show()`,
        codeLanguage: 'python',
        tip: { es: '💡 mergeSchema=true permite schema evolution', en: '💡 mergeSchema=true enables schema evolution', pt: '💡 mergeSchema=true habilita schema evolution' },
        checkpoint: { es: '¿Qué valor tiene added_date en los registros viejos?', en: 'What value does added_date have in old records?', pt: 'Que valor tem added_date nos registros antigos?' }
      }
    ],
    xpReward: 100,
    badge: {
      id: 'badge-db-delta-intro',
      name: { es: 'Delta Lake Explorer', en: 'Delta Lake Explorer', pt: 'Delta Lake Explorer' },
      icon: '🔷'
    },
    resources: [
      { title: 'Delta Lake Documentation', url: 'https://docs.delta.io/latest/index.html', type: 'docs' },
      { title: 'Delta Lake Quick Start', url: 'https://docs.databricks.com/delta/quick-start.html', type: 'docs' }
    ],
    tags: ['intermediate', 'delta-lake', 'acid', 'time-travel'],
    services: ['Delta Lake', 'Spark']
  },

  // =====================================================
  // LAB 5: MERGE y Upserts
  // =====================================================
  {
    id: 'db-lab-005',
    title: {
      es: '🔀 MERGE: Upserts en Delta Lake',
      en: '🔀 MERGE: Upserts in Delta Lake',
      pt: '🔀 MERGE: Upserts no Delta Lake'
    },
    subtitle: {
      es: 'Update, Insert o Delete en una sola operación',
      en: 'Update, Insert or Delete in a single operation',
      pt: 'Update, Insert ou Delete em uma única operação'
    },
    description: {
      es: 'Domina MERGE INTO, la operación más poderosa de Delta Lake. Aprenderás a hacer upserts, CDC (Change Data Capture), y SCD Type 2.',
      en: 'Master MERGE INTO, Delta Lake\'s most powerful operation. You will learn to do upserts, CDC (Change Data Capture), and SCD Type 2.',
      pt: 'Domine MERGE INTO, a operação mais poderosa do Delta Lake. Você aprenderá a fazer upserts, CDC (Change Data Capture) e SCD Type 2.'
    },
    difficulty: 'intermediate',
    estimatedMinutes: 45,
    relatedPhases: ['db-phase-5'],
    prerequisites: [
      { es: 'Lab 4 completado', en: 'Lab 4 completed', pt: 'Lab 4 completado' }
    ],
    objectives: [
      { es: 'Usar MERGE INTO para upserts', en: 'Use MERGE INTO for upserts', pt: 'Usar MERGE INTO para upserts' },
      { es: 'Implementar diferentes patrones de MERGE', en: 'Implement different MERGE patterns', pt: 'Implementar diferentes padrões de MERGE' },
      { es: 'Entender CDC con Delta Lake', en: 'Understand CDC with Delta Lake', pt: 'Entender CDC com Delta Lake' },
      { es: 'Usar la API Python de DeltaTable', en: 'Use DeltaTable Python API', pt: 'Usar a API Python do DeltaTable' }
    ],
    steps: [
      {
        id: 'lab005-step1',
        title: { es: 'Preparar tabla de clientes', en: 'Prepare customers table', pt: 'Preparar tabela de clientes' },
        description: {
          es: 'Crea una tabla Delta de clientes para practicar MERGE.',
          en: 'Create a Delta customers table to practice MERGE.',
          pt: 'Crie uma tabela Delta de clientes para praticar MERGE.'
        },
        code: `# Crear tabla de clientes
clientes_data = [
    (1, "Alice Johnson", "alice@email.com", "Gold", "2023-01-15"),
    (2, "Bob Smith", "bob@email.com", "Silver", "2023-03-20"),
    (3, "Charlie Brown", "charlie@email.com", "Bronze", "2023-06-10"),
    (4, "Diana Prince", "diana@email.com", "Gold", "2023-02-28")
]

df_clientes = spark.createDataFrame(
    clientes_data,
    ["customer_id", "name", "email", "tier", "signup_date"]
)

df_clientes.write.format("delta").mode("overwrite").saveAsTable("clientes")

print("Tabla inicial:")
spark.table("clientes").show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab005-step2',
        title: { es: 'MERGE básico - Upsert', en: 'Basic MERGE - Upsert', pt: 'MERGE básico - Upsert' },
        description: {
          es: 'Actualiza registros existentes e inserta nuevos en una sola operación.',
          en: 'Update existing records and insert new ones in a single operation.',
          pt: 'Atualize registros existentes e insira novos em uma única operação.'
        },
        code: `%sql
-- Datos nuevos: Alice cambió de tier, Eve es nueva
CREATE OR REPLACE TEMP VIEW updates AS
SELECT * FROM VALUES
    (1, 'Alice Johnson', 'alice@email.com', 'Platinum', '2023-01-15'),
    (5, 'Eve Wilson', 'eve@email.com', 'Silver', '2024-01-10')
AS t(customer_id, name, email, tier, signup_date);

-- MERGE: actualizar si existe, insertar si no
MERGE INTO clientes AS target
USING updates AS source
ON target.customer_id = source.customer_id
WHEN MATCHED THEN
    UPDATE SET *
WHEN NOT MATCHED THEN
    INSERT *;

-- Verificar resultados
SELECT * FROM clientes ORDER BY customer_id;`,
        codeLanguage: 'sql',
        checkpoint: { es: '¿Alice ahora es Platinum? ¿Se agregó Eve?', en: 'Is Alice now Platinum? Was Eve added?', pt: 'Alice agora é Platinum? Eve foi adicionada?' }
      },
      {
        id: 'lab005-step3',
        title: { es: 'MERGE con condiciones', en: 'MERGE with conditions', pt: 'MERGE com condições' },
        description: {
          es: 'Agrega condiciones adicionales para controlar cuándo actualizar.',
          en: 'Add additional conditions to control when to update.',
          pt: 'Adicione condições adicionais para controlar quando atualizar.'
        },
        code: `%sql
-- Solo actualizar si el tier es "mejor" (más alto)
CREATE OR REPLACE TEMP VIEW tier_updates AS
SELECT * FROM VALUES
    (2, 'Bob Smith', 'bob.new@email.com', 'Gold', '2023-03-20'),
    (3, 'Charlie Brown', 'charlie@email.com', 'Bronze', '2023-06-10') -- mismo tier
AS t(customer_id, name, email, tier, signup_date);

-- MERGE con condición adicional
MERGE INTO clientes AS target
USING tier_updates AS source
ON target.customer_id = source.customer_id
WHEN MATCHED AND source.tier != target.tier THEN
    UPDATE SET 
        tier = source.tier,
        email = source.email
WHEN MATCHED THEN
    UPDATE SET email = source.email;  -- solo actualizar email si tier es igual

SELECT * FROM clientes ORDER BY customer_id;`,
        codeLanguage: 'sql'
      },
      {
        id: 'lab005-step4',
        title: { es: 'MERGE con DELETE', en: 'MERGE with DELETE', pt: 'MERGE com DELETE' },
        description: {
          es: 'MERGE también puede eliminar registros.',
          en: 'MERGE can also delete records.',
          pt: 'MERGE também pode deletar registros.'
        },
        code: `%sql
-- Marcar clientes para eliminar con flag is_deleted
CREATE OR REPLACE TEMP VIEW delete_updates AS
SELECT * FROM VALUES
    (4, 'Diana Prince', 'diana@email.com', 'Gold', '2023-02-28', true)
AS t(customer_id, name, email, tier, signup_date, is_deleted);

-- MERGE con DELETE
MERGE INTO clientes AS target
USING delete_updates AS source
ON target.customer_id = source.customer_id
WHEN MATCHED AND source.is_deleted = true THEN
    DELETE
WHEN MATCHED THEN
    UPDATE SET *;

SELECT * FROM clientes ORDER BY customer_id;`,
        codeLanguage: 'sql',
        tip: { es: '💡 DELETE en MERGE es útil para CDC', en: '💡 DELETE in MERGE is useful for CDC', pt: '💡 DELETE no MERGE é útil para CDC' }
      },
      {
        id: 'lab005-step5',
        title: { es: 'MERGE con Python API', en: 'MERGE with Python API', pt: 'MERGE com Python API' },
        description: {
          es: 'Usa la API Python de DeltaTable para operaciones más complejas.',
          en: 'Use DeltaTable Python API for more complex operations.',
          pt: 'Use a API Python do DeltaTable para operações mais complexas.'
        },
        code: `from delta.tables import DeltaTable
from pyspark.sql.functions import col, lit, current_timestamp

# Obtener referencia a la tabla Delta
delta_table = DeltaTable.forName(spark, "clientes")

# Nuevos datos
updates_data = [
    (1, "Alice Johnson", "alice.updated@email.com", "Platinum", "2023-01-15"),
    (6, "Frank Miller", "frank@email.com", "Bronze", "2024-01-15")
]
df_updates = spark.createDataFrame(
    updates_data,
    ["customer_id", "name", "email", "tier", "signup_date"]
)

# MERGE usando Python API
delta_table.alias("target").merge(
    df_updates.alias("source"),
    "target.customer_id = source.customer_id"
).whenMatchedUpdate(
    set={
        "email": "source.email",
        "tier": "source.tier"
    }
).whenNotMatchedInsert(
    values={
        "customer_id": "source.customer_id",
        "name": "source.name",
        "email": "source.email",
        "tier": "source.tier",
        "signup_date": "source.signup_date"
    }
).execute()

print("Después del MERGE con Python:")
spark.table("clientes").show()`,
        codeLanguage: 'python'
      },
      {
        id: 'lab005-step6',
        title: { es: 'SCD Type 2 con MERGE', en: 'SCD Type 2 with MERGE', pt: 'SCD Type 2 com MERGE' },
        description: {
          es: 'Implementa Slowly Changing Dimensions Type 2 para mantener historial.',
          en: 'Implement Slowly Changing Dimensions Type 2 to maintain history.',
          pt: 'Implemente Slowly Changing Dimensions Type 2 para manter histórico.'
        },
        code: `%sql
-- Crear tabla con campos SCD2
CREATE OR REPLACE TABLE clientes_scd2 (
    customer_id INT,
    name STRING,
    email STRING,
    tier STRING,
    effective_date DATE,
    end_date DATE,
    is_current BOOLEAN
) USING DELTA;

-- Insertar datos iniciales
INSERT INTO clientes_scd2
SELECT 
    customer_id, name, email, tier,
    CAST(signup_date AS DATE) as effective_date,
    CAST('9999-12-31' AS DATE) as end_date,
    true as is_current
FROM clientes;

SELECT * FROM clientes_scd2;`,
        codeLanguage: 'sql'
      },
      {
        id: 'lab005-step7',
        title: { es: 'Aplicar cambio SCD2', en: 'Apply SCD2 change', pt: 'Aplicar mudança SCD2' },
        description: {
          es: 'Cuando un cliente cambia de tier, mantén el historial.',
          en: 'When a customer changes tier, maintain the history.',
          pt: 'Quando um cliente muda de tier, mantenha o histórico.'
        },
        code: `%sql
-- Simular cambio: Bob pasa de Silver a Gold
CREATE OR REPLACE TEMP VIEW scd2_updates AS
SELECT * FROM VALUES
    (2, 'Bob Smith', 'bob@email.com', 'Gold', CAST('2024-01-20' AS DATE))
AS t(customer_id, name, email, new_tier, change_date);

-- MERGE SCD2: cerrar registro viejo, insertar nuevo
MERGE INTO clientes_scd2 AS target
USING scd2_updates AS source
ON target.customer_id = source.customer_id AND target.is_current = true

-- Cerrar el registro actual
WHEN MATCHED AND target.tier != source.new_tier THEN
    UPDATE SET 
        end_date = source.change_date,
        is_current = false;

-- Insertar nuevo registro para Bob
INSERT INTO clientes_scd2 VALUES
    (2, 'Bob Smith', 'bob@email.com', 'Gold', '2024-01-20', '9999-12-31', true);

-- Ver historial completo de Bob
SELECT * FROM clientes_scd2 
WHERE customer_id = 2 
ORDER BY effective_date;`,
        codeLanguage: 'sql',
        checkpoint: { es: '¿Puedes ver ambas versiones de Bob?', en: 'Can you see both versions of Bob?', pt: 'Você consegue ver ambas versões de Bob?' }
      }
    ],
    xpReward: 100,
    badge: {
      id: 'badge-db-merge-master',
      name: { es: 'MERGE Master', en: 'MERGE Master', pt: 'MERGE Master' },
      icon: '🔀'
    },
    resources: [
      { title: 'MERGE INTO Documentation', url: 'https://docs.databricks.com/delta/merge.html', type: 'docs' },
      { title: 'DeltaTable Python API', url: 'https://docs.delta.io/latest/api/python/index.html', type: 'docs' }
    ],
    tags: ['intermediate', 'delta-lake', 'merge', 'upsert', 'scd2'],
    services: ['Delta Lake', 'Spark SQL']
  },

  // =====================================================
  // LAB 6: Optimización de Delta Lake
  // =====================================================
  {
    id: 'db-lab-006',
    title: {
      es: '⚡ Optimización de Delta Lake',
      en: '⚡ Delta Lake Optimization',
      pt: '⚡ Otimização do Delta Lake'
    },
    subtitle: {
      es: 'OPTIMIZE, Z-ORDER, VACUUM y más',
      en: 'OPTIMIZE, Z-ORDER, VACUUM and more',
      pt: 'OPTIMIZE, Z-ORDER, VACUUM e mais'
    },
    description: {
      es: 'Aprende a optimizar tus tablas Delta para máximo rendimiento. OPTIMIZE compacta archivos pequeños, Z-ORDER mejora queries con filtros, y VACUUM limpia archivos obsoletos.',
      en: 'Learn to optimize your Delta tables for maximum performance. OPTIMIZE compacts small files, Z-ORDER improves queries with filters, and VACUUM cleans obsolete files.',
      pt: 'Aprenda a otimizar suas tabelas Delta para máximo desempenho. OPTIMIZE compacta arquivos pequenos, Z-ORDER melhora queries com filtros e VACUUM limpa arquivos obsoletos.'
    },
    difficulty: 'intermediate',
    estimatedMinutes: 40,
    relatedPhases: ['db-phase-5'],
    prerequisites: [
      { es: 'Labs 4-5 completados', en: 'Labs 4-5 completed', pt: 'Labs 4-5 completados' }
    ],
    objectives: [
      { es: 'Usar OPTIMIZE para compactar archivos', en: 'Use OPTIMIZE to compact files', pt: 'Usar OPTIMIZE para compactar arquivos' },
      { es: 'Aplicar Z-ORDER para queries más rápidos', en: 'Apply Z-ORDER for faster queries', pt: 'Aplicar Z-ORDER para queries mais rápidos' },
      { es: 'Usar VACUUM para limpiar storage', en: 'Use VACUUM to clean storage', pt: 'Usar VACUUM para limpar storage' },
      { es: 'Entender particionamiento', en: 'Understand partitioning', pt: 'Entender particionamento' }
    ],
    steps: [
      {
        id: 'lab006-step1',
        title: { es: 'El problema de archivos pequeños', en: 'The small files problem', pt: 'O problema de arquivos pequenos' },
        description: {
          es: 'Muchos appends generan archivos pequeños que hacen los queries lentos.',
          en: 'Many appends generate small files that make queries slow.',
          pt: 'Muitos appends geram arquivos pequenos que tornam queries lentos.'
        },
        code: `# Simular muchos appends pequeños (problema común)
from pyspark.sql.functions import rand, expr
import time

# Crear tabla para demo
spark.sql("DROP TABLE IF EXISTS ventas_demo")
spark.sql("""
    CREATE TABLE ventas_demo (
        sale_id BIGINT,
        product STRING,
        category STRING,
        amount DOUBLE,
        sale_date DATE
    ) USING DELTA
""")

# Hacer 10 pequeños inserts (simula streaming o micro-batches)
for i in range(10):
    spark.sql(f"""
        INSERT INTO ventas_demo
        SELECT 
            {i*100} + monotonically_increasing_id() as sale_id,
            concat('Product_', cast(rand()*10 as int)) as product,
            CASE WHEN rand() < 0.33 THEN 'Electronics' 
                 WHEN rand() < 0.66 THEN 'Clothing' 
                 ELSE 'Home' END as category,
            rand() * 500 as amount,
            date_add('2024-01-01', cast(rand()*30 as int)) as sale_date
        FROM range(100)
    """)

print("Datos insertados en 10 batches pequeños")`,
        codeLanguage: 'python'
      },
      {
        id: 'lab006-step2',
        title: { es: 'Ver detalles de archivos', en: 'View file details', pt: 'Ver detalhes de arquivos' },
        description: {
          es: 'Usa DESCRIBE DETAIL para ver cuántos archivos tiene tu tabla.',
          en: 'Use DESCRIBE DETAIL to see how many files your table has.',
          pt: 'Use DESCRIBE DETAIL para ver quantos arquivos sua tabela tem.'
        },
        code: `%sql
-- Ver detalles de la tabla
DESCRIBE DETAIL ventas_demo;

-- Ver número de archivos (antes de OPTIMIZE)
SELECT numFiles, sizeInBytes/1024 as sizeKB 
FROM (DESCRIBE DETAIL ventas_demo);`,
        codeLanguage: 'sql',
        tip: { es: '💡 Muchos archivos pequeños = queries lentos', en: '💡 Many small files = slow queries', pt: '💡 Muitos arquivos pequenos = queries lentos' }
      },
      {
        id: 'lab006-step3',
        title: { es: 'OPTIMIZE: Compactar archivos', en: 'OPTIMIZE: Compact files', pt: 'OPTIMIZE: Compactar arquivos' },
        description: {
          es: 'OPTIMIZE combina archivos pequeños en archivos más grandes y eficientes.',
          en: 'OPTIMIZE combines small files into larger, more efficient files.',
          pt: 'OPTIMIZE combina arquivos pequenos em arquivos maiores e mais eficientes.'
        },
        code: `%sql
-- Compactar archivos
OPTIMIZE ventas_demo;

-- Ver resultado
SELECT numFiles, sizeInBytes/1024 as sizeKB 
FROM (DESCRIBE DETAIL ventas_demo);

-- También podemos ver las métricas de la operación
DESCRIBE HISTORY ventas_demo LIMIT 1;`,
        codeLanguage: 'sql',
        checkpoint: { es: '¿Cuántos archivos hay ahora vs antes?', en: 'How many files are there now vs before?', pt: 'Quantos arquivos há agora vs antes?' }
      },
      {
        id: 'lab006-step4',
        title: { es: 'Z-ORDER: Clustering de datos', en: 'Z-ORDER: Data clustering', pt: 'Z-ORDER: Clustering de dados' },
        description: {
          es: 'Z-ORDER agrupa datos por columnas de filtro frecuente, mejorando data skipping.',
          en: 'Z-ORDER groups data by frequently filtered columns, improving data skipping.',
          pt: 'Z-ORDER agrupa dados por colunas de filtro frequente, melhorando data skipping.'
        },
        code: `%sql
-- OPTIMIZE con Z-ORDER en columna de filtro frecuente
OPTIMIZE ventas_demo ZORDER BY (category);

-- Ahora los queries que filtran por category son más rápidos
-- porque Delta Lake puede "saltar" archivos que no tienen la categoría buscada

-- Query de ejemplo (observa el tiempo de ejecución)
SELECT category, SUM(amount) as total
FROM ventas_demo
WHERE category = 'Electronics'
GROUP BY category;`,
        codeLanguage: 'sql',
        tip: { es: '💡 Z-ORDER en columnas que usas frecuentemente en WHERE', en: '💡 Z-ORDER on columns you frequently use in WHERE', pt: '💡 Z-ORDER em colunas que você usa frequentemente em WHERE' }
      },
      {
        id: 'lab006-step5',
        title: { es: 'VACUUM: Limpiar archivos obsoletos', en: 'VACUUM: Clean obsolete files', pt: 'VACUUM: Limpar arquivos obsoletos' },
        description: {
          es: 'VACUUM elimina archivos que ya no son necesarios (de versiones antiguas).',
          en: 'VACUUM removes files that are no longer needed (from old versions).',
          pt: 'VACUUM remove arquivos que não são mais necessários (de versões antigas).'
        },
        code: `%sql
-- Ver historial primero
DESCRIBE HISTORY ventas_demo;

-- VACUUM por defecto mantiene 7 días de historial
-- Para demo, usamos 0 horas (NO HACER EN PRODUCCIÓN)
SET spark.databricks.delta.retentionDurationCheck.enabled = false;

VACUUM ventas_demo RETAIN 0 HOURS;

-- En producción usarías:
-- VACUUM ventas_demo RETAIN 168 HOURS; -- 7 días

SET spark.databricks.delta.retentionDurationCheck.enabled = true;`,
        codeLanguage: 'sql',
        warning: { es: '⚠️ VACUUM con 0 HOURS elimina la posibilidad de time travel', en: '⚠️ VACUUM with 0 HOURS removes time travel capability', pt: '⚠️ VACUUM com 0 HOURS remove a capacidade de time travel' }
      },
      {
        id: 'lab006-step6',
        title: { es: 'Particionamiento', en: 'Partitioning', pt: 'Particionamento' },
        description: {
          es: 'Las particiones dividen datos físicamente para queries más eficientes.',
          en: 'Partitions physically divide data for more efficient queries.',
          pt: 'Partições dividem dados fisicamente para queries mais eficientes.'
        },
        code: `# Crear tabla particionada por fecha
spark.sql("""
    CREATE TABLE ventas_particionada (
        sale_id BIGINT,
        product STRING,
        category STRING,
        amount DOUBLE,
        sale_date DATE
    ) USING DELTA
    PARTITIONED BY (sale_date)
""")

# Insertar datos
spark.sql("""
    INSERT INTO ventas_particionada
    SELECT * FROM ventas_demo
""")

# Ver particiones
spark.sql("SHOW PARTITIONS ventas_particionada").show()

# Query que usa partition pruning
spark.sql("""
    SELECT * FROM ventas_particionada
    WHERE sale_date = '2024-01-15'
""").explain()  # Ver que solo lee 1 partición`,
        codeLanguage: 'python',
        tip: { es: '💡 Particiona por columnas con alta cardinalidad que usas en filtros', en: '💡 Partition by high cardinality columns you use in filters', pt: '💡 Particione por colunas de alta cardinalidade que você usa em filtros' }
      },
      {
        id: 'lab006-step7',
        title: { es: 'Resumen de buenas prácticas', en: 'Best practices summary', pt: 'Resumo de boas práticas' },
        description: {
          es: 'Checklist de optimización para tablas Delta en producción.',
          en: 'Optimization checklist for Delta tables in production.',
          pt: 'Checklist de otimização para tabelas Delta em produção.'
        },
        code: `# CHECKLIST DE OPTIMIZACIÓN DELTA LAKE
# 
# 1. OPTIMIZE regularmente (diario o semanal)
#    - Compacta archivos pequeños
#    - Mejora performance de lectura
#
# 2. Z-ORDER en columnas de filtro frecuente
#    - Máximo 3-4 columnas
#    - Las más selectivas primero
#
# 3. VACUUM para liberar storage
#    - Mínimo 7 días de retención en producción
#    - Programar semanal/mensual
#
# 4. Particionamiento inteligente
#    - Por fecha/timestamp es común
#    - Evitar over-partitioning (muchas particiones pequeñas)
#    - Ideal: particiones de 1GB+
#
# 5. Auto Optimize (en Databricks)
spark.conf.set("spark.databricks.delta.optimizeWrite.enabled", "true")
spark.conf.set("spark.databricks.delta.autoCompact.enabled", "true")

print("✅ Auto Optimize habilitado para nuevas escrituras")`,
        codeLanguage: 'python'
      }
    ],
    xpReward: 100,
    badge: {
      id: 'badge-db-optimizer',
      name: { es: 'Delta Optimizer', en: 'Delta Optimizer', pt: 'Delta Optimizer' },
      icon: '⚡'
    },
    resources: [
      { title: 'OPTIMIZE Documentation', url: 'https://docs.databricks.com/delta/optimize.html', type: 'docs' },
      { title: 'Z-ORDER Documentation', url: 'https://docs.databricks.com/delta/data-skipping.html', type: 'docs' },
      { title: 'VACUUM Documentation', url: 'https://docs.databricks.com/delta/vacuum.html', type: 'docs' }
    ],
    tags: ['intermediate', 'delta-lake', 'optimize', 'zorder', 'vacuum', 'performance'],
    services: ['Delta Lake', 'Spark']
  }
];

