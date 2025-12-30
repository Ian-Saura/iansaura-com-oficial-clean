#!/bin/bash
# Deploy script para iansaura.com
# Este script sube los archivos sin borrar la carpeta api ni las credenciales

set -e

echo "🔨 Building..."
npm run build

echo "📤 Uploading to server..."

# Subir archivos estáticos (CSS, JS, imágenes)
lftp -u c2621673,***REMOVED*** c2621673.ferozo.com << 'EOF'
set ftp:ssl-allow no
set mirror:parallel-transfer-count 5

# Subir static (CSS, JS)
cd public_html/static
mirror -R --delete --ignore-time ../build/static .

# Subir index.html y otros archivos raíz
cd ..
put build/index.html
put build/favicon.svg
put build/manifest.json
put build/robots.txt

# Subir archivos PHP de api (sin borrar credenciales)
cd api
mput api/*.php

bye
EOF

echo "✅ Deploy completado!"
echo ""
echo "Archivos subidos:"
echo "  - static/css/*"
echo "  - static/js/*"
echo "  - index.html"
echo "  - api/*.php"
echo ""
echo "⚠️  NO se borró: api/.db-credentials.php"
