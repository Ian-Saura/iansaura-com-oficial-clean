<?php
// Simple PHP Router for Development Server
// This file handles routing for the PHP built-in server

$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string
$path = parse_url($requestUri, PHP_URL_PATH);

// Handle CORS for all requests
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('Access-Control-Allow-Credentials: true');

// Handle preflight OPTIONS requests
if ($requestMethod === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Log the request for debugging
error_log("Router: {$requestMethod} {$path}");

// Route API requests
if (strpos($path, '/api/') === 0) {
    // Remove /api/ prefix
    $apiPath = substr($path, 5);
    $file = __DIR__ . '/' . $apiPath;
    
    if (file_exists($file) && pathinfo($file, PATHINFO_EXTENSION) === 'php') {
        include $file;
        exit;
    }
}

// Route direct PHP files
$file = __DIR__ . $path;
if (file_exists($file) && pathinfo($file, PATHINFO_EXTENSION) === 'php') {
    include $file;
    exit;
}

// For non-API requests, let the built-in server handle them
return false;
?> 