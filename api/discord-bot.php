<?php
/**
 * Discord Bot Integration
 * Manages role assignment for subscribers
 */

require_once __DIR__ . '/subscription-config.php';

class DiscordBot {
    private $token;
    private $guildId;
    private $roleId;
    private $apiUrl;
    
    public function __construct() {
        $this->token = DISCORD_BOT_TOKEN;
        $this->guildId = DISCORD_GUILD_ID;
        $this->roleId = DISCORD_SUBSCRIBER_ROLE_ID;
        $this->apiUrl = DISCORD_API_URL;
    }
    
    /**
     * Make a request to Discord API
     */
    private function request($method, $endpoint, $data = null) {
        $url = $this->apiUrl . $endpoint;
        
        $headers = [
            'Authorization: Bot ' . $this->token,
            'Content-Type: application/json',
            'User-Agent: IanSauraSubscriptionBot/1.0'
        ];
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers);
        curl_setopt($ch, CURLOPT_TIMEOUT, 30);
        
        if ($method === 'PUT') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
            if ($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            }
        } elseif ($method === 'DELETE') {
            curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'DELETE');
        } elseif ($method === 'POST') {
            curl_setopt($ch, CURLOPT_POST, true);
            if ($data) {
                curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
            }
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        $error = curl_error($ch);
        curl_close($ch);
        
        if ($error) {
            throw new Exception("Discord API cURL error: $error");
        }
        
        return [
            'code' => $httpCode,
            'body' => json_decode($response, true),
            'raw' => $response
        ];
    }
    
    /**
     * Search for a user by username in the guild
     */
    public function findUserByUsername($username) {
        // Remove @ if present
        $username = ltrim($username, '@');
        
        // Search guild members
        $response = $this->request('GET', "/guilds/{$this->guildId}/members/search?query=" . urlencode($username) . "&limit=10");
        
        if ($response['code'] !== 200) {
            throw new Exception("Failed to search users: " . ($response['raw'] ?? 'Unknown error'));
        }
        
        $members = $response['body'];
        
        if (empty($members)) {
            return null;
        }
        
        // Find exact match
        foreach ($members as $member) {
            $memberUsername = $member['user']['username'] ?? '';
            $memberGlobalName = $member['user']['global_name'] ?? '';
            
            if (strcasecmp($memberUsername, $username) === 0 || 
                strcasecmp($memberGlobalName, $username) === 0) {
                return $member['user']['id'];
            }
        }
        
        // Return first result if no exact match
        return $members[0]['user']['id'] ?? null;
    }
    
    /**
     * Add subscriber role to a user
     */
    public function addSubscriberRole($userId) {
        $response = $this->request('PUT', "/guilds/{$this->guildId}/members/{$userId}/roles/{$this->roleId}");
        
        // 204 = success (no content), 201 = success
        if ($response['code'] !== 204 && $response['code'] !== 201 && $response['code'] !== 200) {
            $errorMsg = $response['body']['message'] ?? $response['raw'] ?? 'Unknown error';
            throw new Exception("Failed to add role: HTTP {$response['code']} - $errorMsg");
        }
        
        return true;
    }
    
    /**
     * Remove subscriber role from a user
     */
    public function removeSubscriberRole($userId) {
        $response = $this->request('DELETE', "/guilds/{$this->guildId}/members/{$userId}/roles/{$this->roleId}");
        
        // 204 = success (no content)
        if ($response['code'] !== 204 && $response['code'] !== 200) {
            $errorMsg = $response['body']['message'] ?? $response['raw'] ?? 'Unknown error';
            throw new Exception("Failed to remove role: HTTP {$response['code']} - $errorMsg");
        }
        
        return true;
    }
    
    /**
     * Get user info by ID
     */
    public function getUser($userId) {
        $response = $this->request('GET', "/users/{$userId}");
        
        if ($response['code'] !== 200) {
            return null;
        }
        
        return $response['body'];
    }
    
    /**
     * Get guild member info
     */
    public function getGuildMember($userId) {
        $response = $this->request('GET', "/guilds/{$this->guildId}/members/{$userId}");
        
        if ($response['code'] !== 200) {
            return null;
        }
        
        return $response['body'];
    }
    
    /**
     * Check if user has subscriber role
     */
    public function hasSubscriberRole($userId) {
        $member = $this->getGuildMember($userId);
        
        if (!$member) {
            return false;
        }
        
        return in_array($this->roleId, $member['roles'] ?? []);
    }
    
    /**
     * Send DM to user
     */
    public function sendDirectMessage($userId, $message) {
        // Create DM channel
        $dmResponse = $this->request('POST', '/users/@me/channels', [
            'recipient_id' => $userId
        ]);
        
        if ($dmResponse['code'] !== 200) {
            throw new Exception("Failed to create DM channel");
        }
        
        $channelId = $dmResponse['body']['id'];
        
        // Send message
        $msgResponse = $this->request('POST', "/channels/{$channelId}/messages", [
            'content' => $message
        ]);
        
        if ($msgResponse['code'] !== 200) {
            throw new Exception("Failed to send DM");
        }
        
        return true;
    }
    
    /**
     * Test bot connection
     */
    public function testConnection() {
        $response = $this->request('GET', '/users/@me');
        
        if ($response['code'] !== 200) {
            return [
                'success' => false,
                'error' => $response['body']['message'] ?? 'Connection failed'
            ];
        }
        
        return [
            'success' => true,
            'bot_name' => $response['body']['username'],
            'bot_id' => $response['body']['id']
        ];
    }
}
?>


