#!/bin/bash

# Cloudflare Cache Purge Script
# Ian Saura Data Engineering Hub

echo "🌩️  Cloudflare Cache Purge"
echo "========================="

# Configuration (you need to set these values)
CLOUDFLARE_EMAIL=""
CLOUDFLARE_API_KEY=""
CLOUDFLARE_ZONE_ID=""
DOMAIN="iansaura.com"

# List of URLs to purge
URLS_TO_PURGE=(
    "https://www.iansaura.com/test-purchase.html"
    "https://www.iansaura.com/test-contact.php"
    "https://www.iansaura.com/test-form-submit.php"
    "https://www.iansaura.com/test-simple-contact.php"
    "https://www.iansaura.com/test-smtp.php"
    "https://www.iansaura.com/test-contact-live.php"
    "https://www.iansaura.com/test-email-now.php"
    "https://www.iansaura.com/test-waitlist-email.php"
    "https://www.iansaura.com/test-pdf-delivery.php"
    "https://www.iansaura.com/test-pdf-pipeline.php"
    "https://www.iansaura.com/test-image.html"
    "https://www.iansaura.com/debug-contact.php"
    "https://www.iansaura.com/debug-pdf-path.php"
    "https://www.iansaura.com/debug-pdf-attachment.php"
    "https://www.iansaura.com/contact-simple.php"
    "https://www.iansaura.com/contact-basic.php"
    "https://www.iansaura.com/contact-local.php"
    "https://www.iansaura.com/setup-email-credentials.php"
    "https://www.iansaura.com/cleanup-test-files.php"
    "https://www.iansaura.com/admin.php"
    "https://www.iansaura.com/phpinfo.php"
    "https://www.iansaura.com/info.php"
    "https://www.iansaura.com/composer.json"
    "https://www.iansaura.com/package.json"
    "https://www.iansaura.com/README.md"
    "https://www.iansaura.com/DEPLOYMENT.md"
    "https://www.iansaura.com/TODO.md"
    "https://www.iansaura.com/NOTES.md"
)

function check_credentials() {
    if [ -z "$CLOUDFLARE_EMAIL" ] || [ -z "$CLOUDFLARE_API_KEY" ] || [ -z "$CLOUDFLARE_ZONE_ID" ]; then
        echo "❌ Error: Cloudflare credentials not configured"
        echo ""
        echo "📋 Setup Instructions:"
        echo "====================="
        echo "1. Get your Cloudflare credentials:"
        echo "   - Email: Your Cloudflare account email"
        echo "   - API Key: Go to Cloudflare Dashboard > My Profile > API Tokens > Global API Key"
        echo "   - Zone ID: Go to your domain overview page, find Zone ID on the right sidebar"
        echo ""
        echo "2. Edit this script and add your credentials:"
        echo "   CLOUDFLARE_EMAIL=\"your-email@example.com\""
        echo "   CLOUDFLARE_API_KEY=\"your-api-key-here\""
        echo "   CLOUDFLARE_ZONE_ID=\"your-zone-id-here\""
        echo ""
        echo "3. Run the script again"
        echo ""
        echo "🔧 Alternative: Manual purge through Cloudflare Dashboard"
        echo "   1. Go to https://dash.cloudflare.com"
        echo "   2. Select your domain"
        echo "   3. Go to Caching > Configuration"
        echo "   4. Click 'Purge Everything' or 'Custom purge'"
        echo ""
        return 1
    fi
    return 0
}

function purge_individual_urls() {
    echo "🧹 Purging individual URLs..."
    
    # Prepare JSON payload with URLs
    local json_urls=""
    for url in "${URLS_TO_PURGE[@]}"; do
        if [ -n "$json_urls" ]; then
            json_urls="$json_urls,"
        fi
        json_urls="$json_urls\"$url\""
    done
    
    local payload="{\"files\":[$json_urls]}"
    
    echo "📡 Sending purge request to Cloudflare..."
    
    response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
        -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
        -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
        -H "Content-Type: application/json" \
        --data "$payload")
    
    # Check if successful
    if echo "$response" | grep -q '"success":true'; then
        echo "✅ Individual URLs purged successfully!"
        return 0
    else
        echo "❌ Individual URL purge failed:"
        echo "$response"
        return 1
    fi
}

function purge_everything() {
    echo "🌪️  Purging ALL cache..."
    echo "⚠️  This will clear all cached content for your domain"
    
    read -p "Continue with purge everything? (y/N): " -n 1 -r
    echo
    
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        echo "❌ Purge everything cancelled."
        return 1
    fi
    
    response=$(curl -s -X POST "https://api.cloudflare.com/client/v4/zones/$CLOUDFLARE_ZONE_ID/purge_cache" \
        -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
        -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
        -H "Content-Type: application/json" \
        --data '{"purge_everything":true}')
    
    if echo "$response" | grep -q '"success":true'; then
        echo "✅ All cache purged successfully!"
        return 0
    else
        echo "❌ Purge everything failed:"
        echo "$response"
        return 1
    fi
}

function verify_purge() {
    echo ""
    echo "🔍 Verifying purge results..."
    echo "Waiting 10 seconds for changes to propagate..."
    sleep 10
    
    local failed_count=0
    local total_count=${#URLS_TO_PURGE[@]}
    
    for url in "${URLS_TO_PURGE[@]:0:5}"; do # Test first 5 URLs
        http_status=$(curl -s -o /dev/null -w "%{http_code}" "$url")
        
        if [ "$http_status" -eq 404 ]; then
            echo "✅ $url returns 404 (purged successfully)"
        elif [ "$http_status" -eq 200 ]; then
            echo "⚠️  $url still returns 200 (may need more time)"
            failed_count=$((failed_count + 1))
        else
            echo "❓ $url returns $http_status (unexpected)"
        fi
    done
    
    echo ""
    if [ $failed_count -eq 0 ]; then
        echo "🎉 Cache purge successful! All tested URLs return 404"
    else
        echo "⏳ Some URLs still cached. This is normal - try again in 5-10 minutes"
        echo "💡 CDN propagation can take time across all edge servers"
    fi
}

# Main execution
echo "🎯 Target domain: $DOMAIN"
echo "📝 URLs to purge: ${#URLS_TO_PURGE[@]}"
echo ""

if ! check_credentials; then
    exit 1
fi

echo "🔐 Credentials configured ✅"
echo ""

echo "Choose purge method:"
echo "1) Purge specific URLs (recommended)"
echo "2) Purge everything (faster but affects all cache)"
echo ""
read -p "Select option (1 or 2): " -n 1 -r
echo

case $REPLY in
    1)
        if purge_individual_urls; then
            verify_purge
        fi
        ;;
    2)
        if purge_everything; then
            verify_purge
        fi
        ;;
    *)
        echo "❌ Invalid option. Please run script again and choose 1 or 2."
        exit 1
        ;;
esac

echo ""
echo "🏁 Cache purge process completed!"
echo ""
echo "📋 Next steps:"
echo "1. Wait 5-10 minutes for full propagation"
echo "2. Run './verify-production-security.sh' to confirm"
echo "3. Check manually: curl -I https://www.iansaura.com/test-purchase.html"
echo ""
echo "💡 If URLs still return 200, wait longer or contact Cloudflare support" 