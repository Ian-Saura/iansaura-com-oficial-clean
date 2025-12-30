# 📧 Guía Completa de Automatización de Emails

## 🎯 Sistema de Email Marketing para Red Flags Funnel

### Arquitectura del Sistema

```
Usuario descarga PDF
        ↓
[redflags-delivery.php] → Envía Email 1 (inmediato)
        ↓
Guarda en DB (redflags_subscribers)
        ↓
[email-automation-cron.php] → Corre cada hora
        ↓
├→ Email 2 (48 horas después)
└→ Email 3 (120 horas después / 5 días)
```

---

## 📊 Base de Datos

### Tablas Creadas:

1. **`redflags_subscribers`** - Lista de subscribers
2. **`email_sequence_log`** - Tracking de emails automatizados enviados
3. **`broadcast_campaigns`** - Campañas manuales (broadcasts)
4. **`broadcast_send_log`** - Log de broadcasts enviados
5. **`bootcamp_purchases`** - Compradores (para excluir de broadcasts)

### Setup de Base de Datos:

```bash
# En tu servidor de producción
mysql -u your_user -p your_database < database/email-automation-schema.sql
```

O desde PHP:

```bash
php api/setup-email-automation-db.php
```

---

## ⚙️ Configuración del Cron Job

### En Servidor Linux (cPanel/Ferozo):

1. **Accede a cPanel → Cron Jobs**

2. **Agrega un nuevo cron:**

```bash
# Corre cada hora
0 * * * * /usr/bin/php /path/to/api/email-automation-cron.php >> /path/to/logs/email-automation-cron.log 2>&1
```

3. **Verifica que el path sea correcto:**

```bash
which php  # Te da el path correcto de PHP
pwd        # Verifica tu directorio actual
```

### Ejemplo completo para Ferozo:

```bash
0 * * * * /usr/bin/php8.1 /home/username/public_html/api/email-automation-cron.php >> /home/username/public_html/logs/email-automation-cron.log 2>&1
```

---

## 📅 Timeline Completo de Emails

### AUTOMATIZADOS (Secuencia Post-Descarga)

| Email | Trigger | Asunto | Contenido |
|-------|---------|--------|-----------|
| **Email 1** | 0 horas (inmediato) | Tu checklist de Red Flags [+ lo que nadie te cuenta sobre fundamentos] | Bienvenida + PDF adjunto + Teaser |
| **Email 2** | +48 horas (día 2) | El error que hace imposible debuggear tus pipelines | Red Flag: Logging mal hecho |
| **Email 3** | +120 horas (día 5) | Esta validación te puede ahorrar 3 días de rollback | Red Flag: Validación de inputs |

### MANUALES (Campaña de Ventas)

| Fecha | Hora | Email | Acción | Asunto |
|-------|------|-------|--------|--------|
| **29 Dic Dom** | 18:00 | Pre-lanzamiento | Aviso apertura mañana | Mañana abren inscripciones |
| **30 Dic Lun** | 10:00 | **APERTURA** | Early bird $350 | [Inscripciones abiertas] Año Nuevo, Nuevos Fundamentos |
| **3 Ene Vie** | 10:00 | Cierre early bird | Termina 23:59 → $400 | Última chance early bird |
| **6 Ene Lun** | 10:00 | Testimonios | Quedan 8 cupos | "Ahora entiendo por qué hago las cosas así" |
| **9 Ene Jue** | 10:00 | Últimos cupos | Quedan 5 cupos | Quedan 5 cupos para el lunes |
| **11 Ene Sáb** | 10:00 | **CIERRE FINAL** | Termina 23:59 | Cierran inscripciones mañana |

---

## 🔧 Cómo Enviar Emails Manuales (Broadcasts)

### Opción 1: Script PHP (Recomendado)

Crea un script `send-broadcast.php`:

```php
<?php
require_once 'api/db-config.php';
require_once 'api/email-automation-cron.php'; // Para usar sendSMTPEmail()

$campaignName = "Pre-lanzamiento 29 Dic";
$subject = "Mañana abren inscripciones (Año Nuevo, Nuevos Fundamentos)";
$htmlBody = "..."; // Tu HTML aquí

// Get all active subscribers who haven't purchased
$stmt = $pdo->query("
    SELECT email FROM redflags_subscribers 
    WHERE status = 'active' 
    AND email NOT IN (SELECT email FROM bootcamp_purchases)
");
$subscribers = $stmt->fetchAll(PDO::FETCH_COLUMN);

foreach ($subscribers as $email) {
    sendSMTPEmail($smtpHost, $smtpPort, $smtpUsername, $smtpPassword, 
                  $email, $subject, $htmlBody, $error);
    sleep(2); // Rate limiting
}
?>
```

### Opción 2: Mailchimp / ConvertKit (Alternativa)

Si prefieres una plataforma dedicada:
- Exporta subscribers desde la DB
- Importa a Mailchimp/ConvertKit
- Crea campaigns ahí

---

## 📝 Cómo Editar los Emails Automatizados

### Editar Email 2 o Email 3:

1. Abre `api/email-automation-cron.php`
2. Busca la función `getEmailTemplate()`
3. Modifica el 'subject' o 'body' del email correspondiente
4. Guarda y el cron usará el nuevo template

### Ejemplo:

```php
2 => [ // Day 2
    'subject' => 'NUEVO ASUNTO AQUÍ',
    'body' => "
<!DOCTYPE html>
...
NUEVO HTML AQUÍ
...
</html>"
]
```

---

## 🧪 Testing del Sistema

### Test Manual del Cron:

```bash
# En tu terminal local o servidor
php api/email-automation-cron.php
```

Revisa los logs:
```bash
tail -f logs/email-automation.log
tail -f logs/email-automation-errors.log
```

### Test de la Secuencia Completa:

1. **Descarga el PDF** desde `/redflags` con un email de prueba
2. **Verifica Email 1** llegó inmediatamente
3. **Verifica DB**:
   ```sql
   SELECT * FROM redflags_subscribers WHERE email = 'tu-email@test.com';
   ```
4. **Simula el paso del tiempo** (para testing):
   ```sql
   -- Simular que se suscribió hace 48 horas
   UPDATE redflags_subscribers 
   SET subscribed_at = DATE_SUB(NOW(), INTERVAL 48 HOUR) 
   WHERE email = 'tu-email@test.com';
   ```
5. **Corre el cron manualmente**:
   ```bash
   php api/email-automation-cron.php
   ```
6. **Verifica Email 2** llegó

---

## 📊 Monitoreo y Analytics

### Queries Útiles:

```sql
-- Total de subscribers
SELECT COUNT(*) FROM redflags_subscribers WHERE status = 'active';

-- Emails enviados hoy
SELECT email_number, COUNT(*) 
FROM email_sequence_log 
WHERE DATE(sent_at) = CURDATE()
GROUP BY email_number;

-- Tasa de envío por email
SELECT 
    email_number,
    COUNT(*) as total_sent,
    SUM(CASE WHEN status = 'sent' THEN 1 ELSE 0 END) as successful,
    SUM(CASE WHEN status = 'failed' THEN 1 ELSE 0 END) as failed
FROM email_sequence_log
GROUP BY email_number;

-- Subscribers que aún no recibieron Email 2
SELECT s.email, s.subscribed_at
FROM redflags_subscribers s
WHERE s.subscribed_at <= DATE_SUB(NOW(), INTERVAL 48 HOUR)
AND NOT EXISTS (
    SELECT 1 FROM email_sequence_log esl 
    WHERE esl.subscriber_id = s.id AND esl.email_number = 2
);
```

---

## 🚨 Troubleshooting

### Email no se envía:

1. **Verifica logs**:
   ```bash
   tail -100 logs/email-automation.log
   tail -100 logs/email-automation-errors.log
   ```

2. **Verifica credenciales SMTP** en `email-automation-cron.php`

3. **Test SMTP manualmente**:
   ```bash
   telnet c2621673.ferozo.com 465
   ```

### Cron no corre:

1. **Verifica cron está activo**:
   ```bash
   crontab -l
   ```

2. **Verifica permisos**:
   ```bash
   chmod +x api/email-automation-cron.php
   ```

3. **Verifica path de PHP**:
   ```bash
   which php
   ```

### Emails se envían duplicados:

- Verifica que el cron no esté corriendo dos veces
- Chequea `email_sequence_log` para ver si hay duplicados:
  ```sql
  SELECT subscriber_id, email_number, COUNT(*) 
  FROM email_sequence_log 
  GROUP BY subscriber_id, email_number 
  HAVING COUNT(*) > 1;
  ```

---

## 🔐 Seguridad

### Credenciales SMTP:

⚠️ **IMPORTANTE**: Las credenciales SMTP están hardcodeadas en:
- `api/redflags-delivery.php`
- `api/email-automation-cron.php`

**Para producción**, considera:
1. Mover a variables de entorno
2. Usar archivo de configuración fuera del webroot
3. Encriptar credenciales

### GDPR / Privacidad:

- Los usuarios pueden responder "UNSUBSCRIBE" a cualquier email
- Procesar manualmente o implementar webhook para auto-unsub
- Guardar fecha de consentimiento en `subscribed_at`

---

## 📈 Mejoras Futuras

### Fase 2:

- [ ] Dashboard de analytics en `/admin/emails`
- [ ] Tracking de opens (pixel tracking)
- [ ] Tracking de clicks (URL shortener interno)
- [ ] A/B testing de subject lines
- [ ] Personalización con {nombre} (capturar en form)
- [ ] Webhook para unsubscribe automático
- [ ] Integración con Zapier/Make para sincronizar con CRM

### Fase 3:

- [ ] Segmentación avanzada
- [ ] Behavioral triggers (ej: "abrió email 2 pero no email 3")
- [ ] Lead scoring
- [ ] Integración con Stripe para auto-marcar compradores

---

## ✅ Checklist de Deployment

### Antes de Lanzar:

- [ ] Crear tablas en DB producción
- [ ] Actualizar credenciales SMTP si es necesario
- [ ] Configurar cron job en servidor
- [ ] Test completo de la secuencia
- [ ] Verificar que PDF está en `/public/` en producción
- [ ] Test de envío desde producción
- [ ] Verificar logs están escribiendo correctamente
- [ ] Hacer un deploy de prueba con tu email personal

### Post-Lanzamiento:

- [ ] Monitorear logs diariamente primera semana
- [ ] Verificar tasa de bounces
- [ ] Ajustar copy si es necesario
- [ ] Responder a replies personalmente

---

## 📞 Soporte

Si algo falla:
1. Revisa logs primero
2. Testea localmente
3. Verifica configuración de cron
4. Contacta soporte de Ferozo si es problema de SMTP

---

**Sistema creado por Ian Saura - Data Engineering Hub**

**Última actualización**: Noviembre 11, 2025




