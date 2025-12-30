#!/bin/bash

# OneinFinite Webhook System Test
# Ian Saura Data Engineering Hub

echo "🧪 OneinFinite Webhook System Test"
echo "=================================="

# Configuration
WEBHOOK_URL="https://www.iansaura.com/api/oneinfinite-webhook.php"
LOCAL_WEBHOOK_URL="http://localhost:8000/api/oneinfinite-webhook.php"

# Test data
TEST_EMAIL="your-test-email@gmail.com"  # Change this to your email
TEST_PAYMENT_ID="test_$(date +%s)"

function test_webhook_endpoint() {
    echo "🔍 Testing webhook endpoint accessibility..."
    
    # Test production endpoint
    echo "Testing production: $WEBHOOK_URL"
    PROD_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -I "$WEBHOOK_URL")
    
    if [ "$PROD_STATUS" = "405" ]; then
        echo "✅ Production endpoint accessible (405 Method Not Allowed - expected for GET)"
    else
        echo "⚠️  Production endpoint returned: $PROD_STATUS"
    fi
    
    # Test local endpoint if running
    echo "Testing local: $LOCAL_WEBHOOK_URL"
    LOCAL_STATUS=$(curl -s -o /dev/null -w "%{http_code}" -I "$LOCAL_WEBHOOK_URL" 2>/dev/null || echo "000")
    
    if [ "$LOCAL_STATUS" = "405" ]; then
        echo "✅ Local endpoint accessible (405 Method Not Allowed - expected for GET)"
    elif [ "$LOCAL_STATUS" = "000" ]; then
        echo "⚠️  Local endpoint not running (start with: php -S localhost:8000 -t .)"
    else
        echo "⚠️  Local endpoint returned: $LOCAL_STATUS"
    fi
    
    echo ""
}

function test_webhook_payload() {
    local url=$1
    local test_name=$2
    local payload=$3
    
    echo "📡 Testing: $test_name"
    echo "URL: $url"
    
    RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$url" \
        -H "Content-Type: application/json" \
        -d "$payload")
    
    HTTP_CODE=$(echo "$RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
    BODY=$(echo "$RESPONSE" | sed '/HTTP_CODE:/d')
    
    echo "Response Code: $HTTP_CODE"
    echo "Response Body: $BODY"
    
    if [ "$HTTP_CODE" = "200" ]; then
        echo "✅ Test passed"
    else
        echo "❌ Test failed"
    fi
    
    echo ""
}

function run_webhook_tests() {
    local base_url=$1
    local environment=$2
    
    echo "🚀 Running webhook tests ($environment)"
    echo "======================================"
    
    # Test 1: Valid payment webhook
    VALID_PAYLOAD='{
        "id": "'$TEST_PAYMENT_ID'",
        "amount": 16.9,
        "currency": "USD",
        "created_at": "2025-07-08T20:30:15Z",
        "status": "CLOSED",
        "title": "Fundamentos Python - Test",
        "payer": {
            "email": "'$TEST_EMAIL'",
            "first_name": "Test",
            "last_name": "User",
            "phone_number": "+1234567890"
        }
    }'
    
    test_webhook_payload "$base_url" "Valid Payment Webhook" "$VALID_PAYLOAD"
    
    # Test 2: Invalid status
    INVALID_STATUS_PAYLOAD='{
        "id": "test_invalid_'$(date +%s)'",
        "amount": 16.9,
        "currency": "USD",
        "status": "PENDING",
        "title": "Test product",
        "payer": {
            "email": "'$TEST_EMAIL'",
            "first_name": "Test",
            "last_name": "User"
        }
    }'
    
    test_webhook_payload "$base_url" "Invalid Status (PENDING)" "$INVALID_STATUS_PAYLOAD"
    
    # Test 3: Missing email
    NO_EMAIL_PAYLOAD='{
        "id": "test_no_email_'$(date +%s)'",
        "amount": 16.9,
        "currency": "USD",
        "status": "CLOSED",
        "title": "Test product",
        "payer": {
            "first_name": "Test",
            "last_name": "User"
        }
    }'
    
    test_webhook_payload "$base_url" "Missing Payer Email" "$NO_EMAIL_PAYLOAD"
    
    # Test 4: Empty payload
    test_webhook_payload "$base_url" "Empty Payload" "{}"
    
    # Test 5: Invalid JSON
    echo "📡 Testing: Invalid JSON"
    echo "URL: $base_url"
    
    INVALID_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$base_url" \
        -H "Content-Type: application/json" \
        -d "invalid json data")
    
    INVALID_HTTP_CODE=$(echo "$INVALID_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
    echo "Response Code: $INVALID_HTTP_CODE"
    
    if [ "$INVALID_HTTP_CODE" = "400" ]; then
        echo "✅ Invalid JSON test passed"
    else
        echo "❌ Invalid JSON test failed"
    fi
    
    echo ""
    
    # Test 6: Duplicate prevention
    echo "📡 Testing: Duplicate Prevention"
    echo "Sending same payload twice..."
    
    DUPLICATE_PAYLOAD='{
        "id": "duplicate_test_'$(date +%s)'",
        "status": "CLOSED",
        "payer": {
            "email": "'$TEST_EMAIL'",
            "first_name": "Duplicate",
            "last_name": "Test"
        }
    }'
    
    # First request
    FIRST_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$base_url" \
        -H "Content-Type: application/json" \
        -d "$DUPLICATE_PAYLOAD")
    
    FIRST_CODE=$(echo "$FIRST_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
    echo "First request: $FIRST_CODE"
    
    # Second request (should be detected as duplicate)
    sleep 1
    SECOND_RESPONSE=$(curl -s -w "\nHTTP_CODE:%{http_code}" -X POST "$base_url" \
        -H "Content-Type: application/json" \
        -d "$DUPLICATE_PAYLOAD")
    
    SECOND_CODE=$(echo "$SECOND_RESPONSE" | grep "HTTP_CODE:" | cut -d: -f2)
    SECOND_BODY=$(echo "$SECOND_RESPONSE" | sed '/HTTP_CODE:/d')
    
    echo "Second request: $SECOND_CODE"
    echo "Second response: $SECOND_BODY"
    
    if [[ "$SECOND_BODY" == *"Already processed"* ]]; then
        echo "✅ Duplicate prevention test passed"
    else
        echo "❌ Duplicate prevention test failed"
    fi
    
    echo ""
}

function check_configuration() {
    echo "🔧 Checking system configuration..."
    
    # Check if API credentials are configured
    if [ -f "api/secure-config.php" ]; then
        echo "✅ Configuration file exists"
        
        # Check if credentials are set (basic check)
        if grep -q "ONEINFINITE_API_KEY" api/secure-config.php; then
            echo "✅ OneinFinite API configuration found"
        else
            echo "⚠️  OneinFinite API credentials not configured"
            echo "   Edit api/secure-config.php to add your API key and secret"
        fi
    else
        echo "❌ Configuration file not found: api/secure-config.php"
    fi
    
    # Check if PDF file exists
    if [ -f "assets/Fundamentos_Python_Ian_Saura.pdf" ]; then
        PDF_SIZE=$(ls -lh assets/Fundamentos_Python_Ian_Saura.pdf | awk '{print $5}')
        echo "✅ PDF file exists ($PDF_SIZE)"
    else
        echo "❌ PDF file not found: assets/Fundamentos_Python_Ian_Saura.pdf"
    fi
    
    # Check if logs directory exists
    if [ -d "logs" ]; then
        echo "✅ Logs directory exists"
    else
        echo "⚠️  Logs directory not found (will be created automatically)"
    fi
    
    echo ""
}

function view_recent_logs() {
    echo "📋 Recent webhook activity..."
    
    if [ -f "logs/oneinfinite-webhook.log" ]; then
        echo "Last 5 webhook events:"
        tail -5 logs/oneinfinite-webhook.log
    else
        echo "No webhook log file found"
    fi
    
    echo ""
    
    if [ -f "logs/processed-webhooks.log" ]; then
        echo "Recently processed payments:"
        tail -5 logs/processed-webhooks.log
    else
        echo "No processed webhooks log found"
    fi
    
    echo ""
}

function main() {
    echo "📧 Test email will be sent to: $TEST_EMAIL"
    echo "🆔 Test payment ID: $TEST_PAYMENT_ID"
    echo ""
    
    # Configuration check
    check_configuration
    
    # Endpoint accessibility test
    test_webhook_endpoint
    
    # Choose environment to test
    echo "Which environment would you like to test?"
    echo "1) Production (https://www.iansaura.com)"
    echo "2) Local development (localhost:8000)"
    echo "3) Both"
    echo ""
    read -p "Select option (1-3): " -n 1 -r
    echo
    echo ""
    
    case $REPLY in
        1)
            run_webhook_tests "$WEBHOOK_URL" "Production"
            ;;
        2)
            run_webhook_tests "$LOCAL_WEBHOOK_URL" "Local Development"
            ;;
        3)
            run_webhook_tests "$WEBHOOK_URL" "Production"
            echo ""
            run_webhook_tests "$LOCAL_WEBHOOK_URL" "Local Development"
            ;;
        *)
            echo "❌ Invalid option. Please run script again and choose 1, 2, or 3."
            exit 1
            ;;
    esac
    
    # Show recent logs
    view_recent_logs
    
    echo "🎯 Test Summary"
    echo "==============="
    echo "1. Check the logs for detailed webhook processing information"
    echo "2. If testing with your real email, check your inbox for PDF delivery"
    echo "3. Monitor logs during real transactions: tail -f logs/oneinfinite-webhook.log"
    echo ""
    echo "📋 Log files to monitor:"
    echo "- logs/oneinfinite-webhook.log (all webhook events)"
    echo "- logs/pdf-delivery.log (PDF delivery attempts)"
    echo "- logs/webhook-errors.log (PHP errors)"
    echo ""
    echo "💡 To test with real payment:"
    echo "1. Configure your API credentials in api/secure-config.php"
    echo "2. Deploy webhook: ./deploy-ferozo.sh"
    echo "3. Set webhook URL in OneinFinite dashboard"
    echo "4. Make a test purchase and monitor logs"
}

# Run main function
main 