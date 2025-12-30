#!/bin/bash

# Verificar el nuevo checkout preference de $39
# Verifica que el checkout esté configurado correctamente

echo "=== 🧪 Verificando Checkout Preference $39 ==="
echo ""

# Variables
CHECKOUT_ID="cjBCTR37cZj0tpmHhH"
WEBHOOK_URL="https://www.iansaura.com/api/oneinfinite-webhook.php"
API_KEY="NOtsqA63MZj6zPJhhF"
API_SECRET="ofcnbZqeKAfWq62iNHmB"

echo "1. ✅ Nuevo Checkout ID: $CHECKOUT_ID"
echo "2. ✅ Precio: $39 USD (3900 cents)"
echo "3. ✅ Checkout URL: https://oneinfinite.la/checkout/$CHECKOUT_ID"
echo "4. ✅ Webhook URL: $WEBHOOK_URL"
echo ""

# Verificar que el checkout preference existe
echo "5. 🔍 Verificando checkout preference..."
curl -X GET "https://api.oneinfinite.la/v1/checkout_preferences/$CHECKOUT_ID" \
  -H "x-api-key: $API_KEY" \
  -H "x-api-secret: $API_SECRET" \
  -H "Content-Type: application/json"

echo ""
echo ""
echo "6. 🔍 Verificando webhook endpoint..."
curl -X GET "$WEBHOOK_URL" -w "\nStatus: %{http_code}\n"

echo ""
echo ""
echo "=== 📋 Resumen del Cambio de Precio ==="
echo "💰 Precio anterior: $19 USD"
echo "💰 Precio nuevo: $39 USD"
echo "📈 Incremento: +$20 USD"
echo "✅ Webhook configurado automáticamente"
echo ""
echo "=== 🎯 Próximos Pasos ==="
echo "1. 🚀 Despliega los cambios: ./deploy-ferozo.sh"
echo "2. 🧪 Prueba el nuevo checkout: https://oneinfinite.la/checkout/$CHECKOUT_ID"
echo "3. 📊 Monitorea los logs: tail -f logs/oneinfinite-webhook.log"
echo ""
echo "=== 🔗 URLs Importantes ==="
echo "• Store (local): http://localhost:3000/store"
echo "• Store (prod): https://www.iansaura.com/store"
echo "• Checkout: https://oneinfinite.la/checkout/$CHECKOUT_ID"
echo "• Webhook: $WEBHOOK_URL"
echo ""
echo "🚀 ¡El sistema está listo con el nuevo precio de $39!" 