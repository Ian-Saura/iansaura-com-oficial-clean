<?php
/**
 * Subscription System Configuration
 * Gumroad + OneInfinite + Discord Integration
 * 
 * Los secretos se cargan desde secrets.php
 */

// Cargar secretos
require_once __DIR__ . '/secrets.php';

// Gumroad Configuration
define('GUMROAD_SUBSCRIPTION_LINK', 'https://sauravibe3.gumroad.com/l/dgyzxi');
// GUMROAD_ACCESS_TOKEN debe estar definido en secrets.php

// OneInfinite API Configuration (usando constantes de secrets.php)
// ID de la suscripción con 7 días de trial configurado en el dashboard
if (!defined('ONEINFINITE_SUBSCRIPTION_ID')) {
    define('ONEINFINITE_SUBSCRIPTION_ID', 'ZhE72dwU773N3ZLrE2');
}
define('ONEINFINITE_API_URL', 'https://api.one.lat/v1');

// Discord API URL
define('DISCORD_API_URL', 'https://discord.com/api/v10');

// Admin notification email
define('ADMIN_EMAIL', 'info@iansaura.com');

// Subscription settings
define('SUBSCRIPTION_NAME', 'Ian Saura Premium');
?>