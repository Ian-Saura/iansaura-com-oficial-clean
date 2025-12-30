#!/bin/bash

echo "🔧 Extrayendo y configurando en Ferozo..."

lftp -c "
set ssl:verify-certificate no
open -u c2621673,83difepiFU ftp://c2621673.ferozo.com
cd public_html

echo '📦 Extrayendo ZIP...'
quote SITE UNZIP ferozo-deployment.zip

echo '🗑️ Borrando ZIP...'
rm ferozo-deployment.zip

echo '✅ Archivos desplegados!'
bye
"

echo "✅ Deployment completado en Ferozo!"
