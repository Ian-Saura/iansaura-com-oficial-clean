<?php
/**
 * Input Validation Middleware
 * Centralized validation for all API inputs
 */

class Validator {
    private $errors = [];
    private $sanitized = [];
    
    /**
     * Validate and sanitize email
     */
    public function email($value, $field = 'email', $required = true) {
        $value = trim(strtolower($value ?? ''));
        
        if (empty($value)) {
            if ($required) {
                $this->errors[$field] = 'Email is required';
            }
            return null;
        }
        
        $email = filter_var($value, FILTER_VALIDATE_EMAIL);
        if (!$email) {
            $this->errors[$field] = 'Invalid email format';
            return null;
        }
        
        // Additional checks
        if (strlen($email) > 254) {
            $this->errors[$field] = 'Email too long';
            return null;
        }
        
        $this->sanitized[$field] = $email;
        return $email;
    }
    
    /**
     * Validate and sanitize string
     */
    public function string($value, $field, $minLen = 0, $maxLen = 255, $required = true) {
        $value = trim($value ?? '');
        
        if (empty($value)) {
            if ($required) {
                $this->errors[$field] = "$field is required";
            }
            return null;
        }
        
        if (strlen($value) < $minLen) {
            $this->errors[$field] = "$field must be at least $minLen characters";
            return null;
        }
        
        if (strlen($value) > $maxLen) {
            $this->errors[$field] = "$field must be at most $maxLen characters";
            return null;
        }
        
        // Sanitize HTML
        $sanitized = htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
        $this->sanitized[$field] = $sanitized;
        return $sanitized;
    }
    
    /**
     * Validate integer
     */
    public function int($value, $field, $min = null, $max = null, $required = true) {
        if ($value === null || $value === '') {
            if ($required) {
                $this->errors[$field] = "$field is required";
            }
            return null;
        }
        
        $int = filter_var($value, FILTER_VALIDATE_INT);
        if ($int === false) {
            $this->errors[$field] = "$field must be an integer";
            return null;
        }
        
        if ($min !== null && $int < $min) {
            $this->errors[$field] = "$field must be at least $min";
            return null;
        }
        
        if ($max !== null && $int > $max) {
            $this->errors[$field] = "$field must be at most $max";
            return null;
        }
        
        $this->sanitized[$field] = $int;
        return $int;
    }
    
    /**
     * Validate boolean
     */
    public function bool($value, $field, $required = false) {
        if ($value === null) {
            if ($required) {
                $this->errors[$field] = "$field is required";
            }
            return null;
        }
        
        $bool = filter_var($value, FILTER_VALIDATE_BOOLEAN, FILTER_NULL_ON_FAILURE);
        $this->sanitized[$field] = $bool;
        return $bool;
    }
    
    /**
     * Validate URL
     */
    public function url($value, $field, $required = true) {
        $value = trim($value ?? '');
        
        if (empty($value)) {
            if ($required) {
                $this->errors[$field] = "$field is required";
            }
            return null;
        }
        
        $url = filter_var($value, FILTER_VALIDATE_URL);
        if (!$url) {
            $this->errors[$field] = "Invalid URL format";
            return null;
        }
        
        $this->sanitized[$field] = $url;
        return $url;
    }
    
    /**
     * Validate JSON string
     */
    public function json($value, $field, $required = true) {
        if (empty($value)) {
            if ($required) {
                $this->errors[$field] = "$field is required";
            }
            return null;
        }
        
        $decoded = json_decode($value, true);
        if (json_last_error() !== JSON_ERROR_NONE) {
            $this->errors[$field] = "Invalid JSON format";
            return null;
        }
        
        $this->sanitized[$field] = $decoded;
        return $decoded;
    }
    
    /**
     * Validate enum (value must be in allowed list)
     */
    public function enum($value, $field, array $allowed, $required = true) {
        if (empty($value)) {
            if ($required) {
                $this->errors[$field] = "$field is required";
            }
            return null;
        }
        
        if (!in_array($value, $allowed, true)) {
            $this->errors[$field] = "$field must be one of: " . implode(', ', $allowed);
            return null;
        }
        
        $this->sanitized[$field] = $value;
        return $value;
    }
    
    /**
     * Check if validation passed
     */
    public function isValid() {
        return empty($this->errors);
    }
    
    /**
     * Get all errors
     */
    public function getErrors() {
        return $this->errors;
    }
    
    /**
     * Get first error message
     */
    public function getFirstError() {
        return reset($this->errors) ?: null;
    }
    
    /**
     * Get sanitized values
     */
    public function getSanitized() {
        return $this->sanitized;
    }
    
    /**
     * Send error response and exit
     */
    public function failIfInvalid() {
        if (!$this->isValid()) {
            http_response_code(400);
            header('Content-Type: application/json');
            echo json_encode([
                'success' => false,
                'error' => $this->getFirstError(),
                'errors' => $this->getErrors()
            ]);
            exit;
        }
    }
}

/**
 * Quick validation helper functions
 */
function validateEmail($email) {
    $email = trim(strtolower($email ?? ''));
    return filter_var($email, FILTER_VALIDATE_EMAIL) ?: null;
}

function validateInt($value, $min = null, $max = null) {
    $int = filter_var($value, FILTER_VALIDATE_INT);
    if ($int === false) return null;
    if ($min !== null && $int < $min) return null;
    if ($max !== null && $int > $max) return null;
    return $int;
}

function sanitizeString($value, $maxLen = 255) {
    $value = trim($value ?? '');
    $value = htmlspecialchars($value, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    return substr($value, 0, $maxLen);
}

function sanitizeJson($value) {
    $decoded = json_decode($value ?? '', true);
    return json_last_error() === JSON_ERROR_NONE ? $decoded : null;
}

