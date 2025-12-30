#!/bin/bash

# Production Security Verification Script
# Ian Saura Data Engineering Hub

echo "🔍 Production Security Verification"
echo "=================================="

# Base URL for your domain
BASE_URL="https://www.iansaura.com"

# List of files that should NOT be accessible
SECURITY_CHECK_FILES=(
    "test-purchase.html"
    "test-contact.php"
    "test-form-submit.php"
    "test-simple-contact.php"
    "test-smtp.php"
    "test-contact-live.php"
    "test-email-now.php"
    "test-waitlist-email.php"
    "test-pdf-delivery.php"
    "test-pdf-pipeline.php"
    "test-image.html"
    "debug-contact.php"
    "debug-pdf-path.php"
    "debug-pdf-attachment.php"
    "contact-simple.php"
    "contact-basic.php"
    "contact-local.php"
    "setup-email-credentials.php"
    "cleanup-test-files.php"
    "test-waitlist-db.php"
    ".env"
    ".env.local"
    ".env.production"
    "config.php.backup"
    "database.sql"
    "backup.sql"
    "admin.php"
    "phpinfo.php"
    "info.php"
    "wp-config.php"
    ".htaccess.bak"
    ".htaccess.backup"
    ".git"
    ".gitignore"
    "composer.json"
    "package.json"
    "README.md"
    "DEPLOYMENT.md"
    "TODO.md"
    "NOTES.md"
)

echo "🔍 Checking for security vulnerabilities..."
echo ""

FOUND_ISSUES=0
TOTAL_CHECKS=0

for file in "${SECURITY_CHECK_FILES[@]}"; do
    TOTAL_CHECKS=$((TOTAL_CHECKS + 1))
    
    # Check if file is accessible
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$BASE_URL/$file")
    
    if [ "$HTTP_STATUS" -eq 200 ]; then
        echo "🚨 SECURITY ISSUE: $file is accessible ($HTTP_STATUS)"
        echo "   URL: $BASE_URL/$file"
        FOUND_ISSUES=$((FOUND_ISSUES + 1))
    elif [ "$HTTP_STATUS" -eq 404 ]; then
        echo "✅ SECURE: $file returns 404 (not accessible)"
    else
        echo "⚠️  WARNING: $file returns $HTTP_STATUS (unexpected response)"
    fi
done

echo ""
echo "📊 Security Check Results:"
echo "========================="
echo "Total files checked: $TOTAL_CHECKS"
echo "Security issues found: $FOUND_ISSUES"
echo "Secure files: $((TOTAL_CHECKS - FOUND_ISSUES))"

if [ $FOUND_ISSUES -gt 0 ]; then
    echo ""
    echo "🚨 SECURITY ALERT!"
    echo "=================="
    echo "Found $FOUND_ISSUES security issues that need immediate attention."
    echo ""
    echo "🔧 Recommended actions:"
    echo "1. Run './cleanup-production-test-files.sh' to remove test files"
    echo "2. Review your server configuration"
    echo "3. Check file permissions"
    echo "4. Verify .htaccess rules"
    echo ""
    echo "💡 Quick fix command:"
    echo "   ./cleanup-production-test-files.sh"
    
    exit 1
else
    echo ""
    echo "✅ SECURITY STATUS: GOOD"
    echo "======================="
    echo "No security issues detected."
    echo "Your production server appears to be secure."
fi

echo ""
echo "🔍 Additional security checks:"
echo "============================="

# Check main pages are working
echo "🌐 Testing main functionality..."

MAIN_PAGES=(
    ""
    "success.php"
    "api/pdf-delivery.php"
    "api/contact.php"
    "api/waitlist.php"
)

for page in "${MAIN_PAGES[@]}"; do
    if [ -z "$page" ]; then
        page_url="$BASE_URL"
        page_name="Homepage"
    else
        page_url="$BASE_URL/$page"
        page_name="$page"
    fi
    
    HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$page_url")
    
    if [ "$HTTP_STATUS" -eq 200 ]; then
        echo "✅ $page_name is accessible ($HTTP_STATUS)"
    elif [ "$HTTP_STATUS" -eq 403 ] && [ "$page" = "success.php" ]; then
        echo "✅ $page_name properly secured ($HTTP_STATUS)"
    else
        echo "⚠️  $page_name returned $HTTP_STATUS"
    fi
done

echo ""
echo "🎯 Security recommendations:"
echo "=========================="
echo "1. Regularly run this security check"
echo "2. Monitor server logs for suspicious activity"
echo "3. Keep all software updated"
echo "4. Use strong passwords and 2FA"
echo "5. Regularly backup your data"
echo "6. Review file permissions periodically"

echo ""
echo "📅 Next security check recommended: $(date -d '+1 week' '+%Y-%m-%d')" 