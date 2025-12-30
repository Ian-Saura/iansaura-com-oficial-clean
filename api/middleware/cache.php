<?php
/**
 * Simple File-Based Cache System
 * For caching expensive database queries
 * 
 * Usage:
 *   require_once __DIR__ . '/middleware/cache.php';
 *   
 *   $data = getCached('leaderboard', 300, function() {
 *       // Expensive query here
 *       return $result;
 *   });
 */

define('CACHE_DIR', sys_get_temp_dir() . '/iansaura_cache');

/**
 * Get cached data or compute it
 * 
 * @param string $key Unique cache key
 * @param int $ttl Time to live in seconds
 * @param callable $callback Function to compute the data if not cached
 * @return mixed The cached or computed data
 */
function getCached($key, $ttl, $callback) {
    $cacheFile = CACHE_DIR . '/' . md5($key) . '.cache';
    
    // Ensure cache directory exists
    if (!is_dir(CACHE_DIR)) {
        @mkdir(CACHE_DIR, 0755, true);
    }
    
    // Check if cache exists and is valid
    if (file_exists($cacheFile)) {
        $data = @json_decode(file_get_contents($cacheFile), true);
        
        if ($data && isset($data['expires']) && $data['expires'] > time()) {
            // Cache hit - return cached data
            return $data['value'];
        }
    }
    
    // Cache miss - compute the data
    $value = $callback();
    
    // Store in cache
    $cacheData = [
        'key' => $key,
        'value' => $value,
        'expires' => time() + $ttl,
        'created' => date('Y-m-d H:i:s')
    ];
    
    @file_put_contents($cacheFile, json_encode($cacheData), LOCK_EX);
    
    return $value;
}

/**
 * Invalidate a specific cache key
 */
function invalidateCache($key) {
    $cacheFile = CACHE_DIR . '/' . md5($key) . '.cache';
    if (file_exists($cacheFile)) {
        @unlink($cacheFile);
        return true;
    }
    return false;
}

/**
 * Clear all cache (use sparingly)
 */
function clearAllCache() {
    if (!is_dir(CACHE_DIR)) return 0;
    
    $files = glob(CACHE_DIR . '/*.cache');
    $count = 0;
    
    foreach ($files as $file) {
        if (@unlink($file)) {
            $count++;
        }
    }
    
    return $count;
}

/**
 * Clean expired cache files
 */
function cleanExpiredCache() {
    if (!is_dir(CACHE_DIR)) return 0;
    
    $files = glob(CACHE_DIR . '/*.cache');
    $cleaned = 0;
    $now = time();
    
    foreach ($files as $file) {
        $data = @json_decode(file_get_contents($file), true);
        if ($data && isset($data['expires']) && $data['expires'] < $now) {
            @unlink($file);
            $cleaned++;
        }
    }
    
    return $cleaned;
}

/**
 * Get cache statistics
 */
function getCacheStats() {
    if (!is_dir(CACHE_DIR)) {
        return ['total_files' => 0, 'total_size' => 0, 'expired' => 0];
    }
    
    $files = glob(CACHE_DIR . '/*.cache');
    $totalSize = 0;
    $expired = 0;
    $now = time();
    
    foreach ($files as $file) {
        $totalSize += filesize($file);
        $data = @json_decode(file_get_contents($file), true);
        if ($data && isset($data['expires']) && $data['expires'] < $now) {
            $expired++;
        }
    }
    
    return [
        'total_files' => count($files),
        'total_size' => round($totalSize / 1024, 2) . ' KB',
        'expired' => $expired
    ];
}

// Cache presets (TTL in seconds)
class CacheTTL {
    const MINUTE = 60;
    const FIVE_MINUTES = 300;
    const FIFTEEN_MINUTES = 900;
    const HOUR = 3600;
    const DAY = 86400;
    
    // Specific cache durations for endpoints
    const LEADERBOARD = 300;          // 5 minutes
    const ANALYTICS = 3600;           // 1 hour
    const ROADMAP_DATA = 86400;       // 1 day (rarely changes)
    const USER_STATS = 60;            // 1 minute
}

