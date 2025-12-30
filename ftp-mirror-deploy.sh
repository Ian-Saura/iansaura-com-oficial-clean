#!/bin/bash

echo "🚀 Desplegando archivos directamente a Ferozo..."

# First, extract the zip locally to a temp directory
rm -rf temp-deploy 2>/dev/null
unzip -q ferozo-deployment.zip -d temp-deploy

echo "📤 Subiendo archivos via FTP (esto puede tomar 1-2 minutos)..."

lftp -c "
set ssl:verify-certificate no
set ftp:passive-mode on
open -u c2621673,***REMOVED*** ftp://c2621673.ferozo.com
cd public_html
mirror -R --delete --verbose=0 --parallel=3 temp-deploy/ .
bye
"

# Cleanup
rm -rf temp-deploy

echo "✅ Deployment completado!"
