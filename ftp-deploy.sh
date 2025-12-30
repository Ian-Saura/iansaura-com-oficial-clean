#!/bin/bash

echo "🚀 Conectando a Ferozo via FTP..."

lftp -c "
set ssl:verify-certificate no
open -u c2621673,83difepiFU ftp://c2621673.ferozo.com
cd public_html
echo '📤 Subiendo ferozo-deployment.zip...'
put ferozo-deployment.zip
echo '✅ Archivo subido!'
bye
"

echo "✅ Upload completado!"
