# ✅ Setup Completado - Red Flags Email Automation

## 📊 Estado del Sistema

### ✅ Completado
- [x] Landing page `/redflags` deployada y funcionando
- [x] Base de datos MySQL configurada en Ferozo
- [x] 5 tablas creadas:
  - `redflags_subscribers` - Lista de emails
  - `email_sequence_log` - Tracking de emails automáticos
  - `broadcast_campaigns` - Campañas manuales
  - `broadcast_send_log` - Tracking de broadcasts
  - `bootcamp_purchases` - Compras (para excluir de emails)
- [x] API `redflags-delivery.php` deployada
- [x] Script de automatización `email-automation-cron.php` listo
- [x] Templates de emails HTML creados (Email 1, 2, 3, 4, 5, 6)
- [x] PDF "15 Red Flags" subido y protegido

### ⏰ Pendiente (1 paso - 5 minutos)
- [ ] Configurar Cron Job en cPanel

---

## 🚀 Cómo Configurar el Cron Job

### Paso 1: Acceder a cPanel
1. Ve a tu panel de Ferozo
2. Busca "Cron Jobs" o "Tareas Cron"

### Paso 2: Crear Cron Job
```bash
Comando:
/usr/bin/php /home/c2621673/public_html/api/email-automation-cron.php

Frecuencia:
*/15 * * * *
```

**Explicación**: Este cron job se ejecutará cada 15 minutos y enviará:
- Email 2 a usuarios que descargaron hace 48 horas
- Email 3 a usuarios que descargaron hace 120 horas (5 días)

---

## 🧪 Cómo Probar el Funnel

### Test 1: Email Inmediato
1. Ve a: https://iansaura.com/redflags
2. Ingresa tu email: `iansauradata@gmail.com`
3. Haz clic en "Descargar PDF Gratis"
4. **Resultado esperado**: Email 1 llega en menos de 1 minuto con el PDF adjunto

### Test 2: Email Automático 2
- Esperar 48 horas después del Test 1
- El cron job enviará Email 2 automáticamente
- **Contenido**: "Red Flag más común: logging inexistente o mal hecho"

### Test 3: Email Automático 3
- Esperar 120 horas (5 días) después del Test 1
- El cron job enviará Email 3 automáticamente
- **Contenido**: "Esta validación te puede ahorrar 3 días de rollback"

---

## 📧 Cronograma de Emails

### Emails Automáticos (Ya configurados)
| Email | Trigger | Asunto | Acción |
|-------|---------|--------|--------|
| Email 1 | Inmediato | Tu checklist de Red Flags | Envío automático al descargar |
| Email 2 | +48 horas | El error que hace imposible debuggear | Cron job |
| Email 3 | +120 horas | Esta validación te puede ahorrar 3 días | Cron job |

### Emails Manuales (Broadcast)
| Email | Fecha | Hora | Asunto | Archivo Template |
|-------|-------|------|--------|------------------|
| Email 4 | 29 Dic | 18:00 | Mañana abren inscripciones | email-4-prelanzamiento.html |
| Email 5 | 30 Dic | 10:00 | [Inscripciones abiertas] | email-5-apertura.html |
| Email 6 | 3 Ene | 10:00 | Última chance early bird | email-6-cierre-early.html |
| Email 7 | 6 Ene | 10:00 | "Ahora entiendo por qué..." | (crear) |
| Email 8 | 9 Ene | 10:00 | Quedan 5 cupos | (crear) |
| Email 9 | 11 Ene | 10:00 | Cierran inscripciones mañana | (crear) |

---

## 🔒 Seguridad

### Credenciales Configuradas
- Base de datos: `c2621673_ian`
- Usuario: `c2621673_ian`
- Host: `localhost`
- Password: `teMIloba31`

### Archivos Protegidos
- `.htaccess` protege el directorio `/database/`
- PDF no es accesible directamente, solo por email
- Scripts de setup requieren key: `?key=redflags2025`

---

## 📁 Estructura de Archivos en Producción

```
public_html/
├── index.html                          # React app (homepage)
├── redflags/                           # React Router maneja /redflags
├── api/
│   ├── redflags-delivery.php           # Envía Email 1 con PDF
│   ├── email-automation-cron.php       # Envía Email 2 y 3 (cron)
│   ├── db-config-production.php        # Configuración DB
│   └── ...
├── assets/
│   └── 15-RED-FLAGS-EN-TU-CODIGO-DE-DATA-ENGINEERING.pdf
├── email-templates/
│   ├── email-2-logging.html
│   ├── email-3-validation.html
│   ├── email-4-prelanzamiento.html
│   ├── email-5-apertura.html
│   └── email-6-cierre-early.html
├── database/
│   └── email-automation-schema.sql     # Schema (ya ejecutado)
└── fix-migration.php                   # Script de setup (ejecutado)
```

---

## 🎯 Próximos Pasos

### Ahora (Antes del 29 Diciembre)
1. ✅ Configurar cron job (5 minutos)
2. ✅ Probar funnel con tu email
3. 📱 Promocionar el PDF en LinkedIn (4-5x por semana)
4. 📊 Meta: 300-400 emails hasta 29 Dic

### 29 Diciembre - 12 Enero (Campaña de Ventas)
1. 📧 Enviar broadcasts manuales según cronograma
2. 💰 Procesar inscripciones al bootcamp
3. 📊 Monitorear conversiones

### 13 Enero 2025
🚀 Arranca el bootcamp a las 18:00 hs

---

## 🛠️ Comandos Útiles

### Ver subscribers en la DB
```sql
SELECT email, subscribed_at, status 
FROM redflags_subscribers 
ORDER BY subscribed_at DESC;
```

### Ver emails enviados
```sql
SELECT s.email, l.email_number, l.sent_at, l.status
FROM email_sequence_log l
JOIN redflags_subscribers s ON l.subscriber_id = s.id
ORDER BY l.sent_at DESC;
```

### Probar manualmente Email 2 o 3
```bash
/usr/bin/php /home/c2621673/public_html/api/email-automation-cron.php
```

---

## 📞 Soporte

Si algo no funciona:
1. Revisa logs en: `logs/pdf-delivery-errors.log`
2. Verifica la base de datos con los comandos SQL de arriba
3. Ejecuta `fix-migration.php?key=redflags2025` si necesitas recrear las tablas

---

## 🎉 ¡Sistema Listo!

Todo está configurado y listo para funcionar. Solo falta:
1. Configurar el cron job
2. Hacer tu primera prueba

**¡Éxito con el lanzamiento del bootcamp!** 🚀




