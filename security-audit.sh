#!/bin/bash

echo "═══════════════════════════════════════════════════════════════"
echo "   🔒 AUDITORÍA DE SEGURIDAD - ETHICAL HACKING"
echo "═══════════════════════════════════════════════════════════════"
echo ""

# Credenciales a buscar
PASSWORDS=("***REMOVED***" "***REMOVED***")
USERNAMES=("c2621673" "c2621673_ian")
HOSTS=("c2621673.ferozo.com" "ferozo.com")

echo "🔍 PASO 1: Buscando en código local..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

for pass in "${PASSWORDS[@]}"; do
    echo -n "Buscando password '$pass': "
    results=$(grep -r "$pass" --include="*.php" --include="*.js" --include="*.json" --include="*.env" --include="*.sh" . 2>/dev/null | grep -v node_modules | grep -v ".git" | wc -l)
    if [ "$results" -gt 0 ]; then
        echo "❌ Encontrado en $results archivos"
        grep -r "$pass" --include="*.php" --include="*.js" --include="*.json" --include="*.env" --include="*.sh" . 2>/dev/null | grep -v node_modules | grep -v ".git" | head -5
    else
        echo "✅ No encontrado"
    fi
done

echo ""
echo "🌐 PASO 2: Probando acceso público a archivos sensibles..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# Archivos que NO deberían ser accesibles
FILES=(
    "api/db-config.php"
    "api/db-config-production.php"
    "api/secure-config.php"
    "api/secure-config-simple.php"
    "database/.env"
    "database/.env.database"
    ".env"
    ".env.production"
    "fix-migration.php"
    "setup-automation-web.php"
    "run-migration.php"
    "api/config.php"
)

for file in "${FILES[@]}"; do
    echo -n "Testing $file: "
    status=$(curl -s -o /dev/null -w "%{http_code}" "https://iansaura.com/$file" 2>/dev/null)
    if [ "$status" = "200" ]; then
        echo "❌ ACCESIBLE (HTTP $status) - PELIGRO!"
        # Intentar leer contenido
        content=$(curl -s "https://iansaura.com/$file" | grep -i "password\|pass\|teMI\|83dif" | head -2)
        if [ ! -z "$content" ]; then
            echo "   ⚠️  CONTENIDO SENSIBLE DETECTADO!"
        fi
    elif [ "$status" = "403" ]; then
        echo "✅ PROTEGIDO (HTTP $status)"
    elif [ "$status" = "404" ]; then
        echo "✅ NO EXISTE (HTTP $status)"
    else
        echo "⚠️  Respuesta: HTTP $status"
    fi
done

echo ""
echo "🔍 PASO 3: Probando directorios sensibles..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

DIRS=(
    "database/"
    "logs/"
    "api/"
    ".git/"
)

for dir in "${DIRS[@]}"; do
    echo -n "Testing $dir: "
    status=$(curl -s -o /dev/null -w "%{http_code}" "https://iansaura.com/$dir" 2>/dev/null)
    if [ "$status" = "200" ]; then
        echo "❌ LISTADO PÚBLICO (HTTP $status) - PELIGRO!"
    elif [ "$status" = "403" ]; then
        echo "✅ PROTEGIDO (HTTP $status)"
    elif [ "$status" = "404" ]; then
        echo "✅ NO ACCESIBLE (HTTP $status)"
    else
        echo "⚠️  Respuesta: HTTP $status"
    fi
done

echo ""
echo "🔍 PASO 4: Probando archivos comunes con credenciales..."
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

COMMON_FILES=(
    "phpinfo.php"
    "info.php"
    "test.php"
    "debug.php"
    "config.json"
    "credentials.json"
    ".env.backup"
    "backup.sql"
    "database.sql"
)

for file in "${COMMON_FILES[@]}"; do
    echo -n "Testing $file: "
    status=$(curl -s -o /dev/null -w "%{http_code}" "https://iansaura.com/$file" 2>/dev/null)
    if [ "$status" = "200" ]; then
        echo "❌ ACCESIBLE (HTTP $status)"
    else
        echo "✅ OK (HTTP $status)"
    fi
done

echo ""
echo "═══════════════════════════════════════════════════════════════"
echo "   ✅ AUDITORÍA COMPLETADA"
echo "═══════════════════════════════════════════════════════════════"
