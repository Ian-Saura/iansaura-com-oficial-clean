#!/bin/bash

# Deployment Verification Script
# Checks if iansaura.com is working correctly after deployment

DOMAIN="https://iansaura.com"

echo "🔍 Verifying deployment at $DOMAIN"
echo "========================================="
echo ""

# Check if site is reachable
echo "1. Checking homepage..."
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN")
if [ "$HTTP_CODE" = "200" ]; then
    echo "   ✅ Homepage loads (HTTP $HTTP_CODE)"
else
    echo "   ❌ Homepage failed (HTTP $HTTP_CODE)"
fi

# Check if index.html is being served
echo ""
echo "2. Checking if HTML content is present..."
CONTENT=$(curl -s "$DOMAIN" | grep -o "<div id=\"root\"></div>")
if [ -n "$CONTENT" ]; then
    echo "   ✅ React root div found"
else
    echo "   ❌ React root div not found - might be showing directory listing"
fi

# Check if JavaScript is loading
echo ""
echo "3. Checking if JavaScript bundle loads..."
JS_FILE=$(curl -s "$DOMAIN" | grep -o "/static/js/main\.[a-z0-9]*\.js" | head -1)
if [ -n "$JS_FILE" ]; then
    JS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN$JS_FILE")
    if [ "$JS_CODE" = "200" ]; then
        echo "   ✅ JavaScript bundle loads (HTTP $JS_CODE)"
        echo "      File: $JS_FILE"
    else
        echo "   ❌ JavaScript bundle failed (HTTP $JS_CODE)"
    fi
else
    echo "   ❌ JavaScript bundle not found in HTML"
fi

# Check if CSS is loading
echo ""
echo "4. Checking if CSS bundle loads..."
CSS_FILE=$(curl -s "$DOMAIN" | grep -o "/static/css/main\.[a-z0-9]*\.css" | head -1)
if [ -n "$CSS_FILE" ]; then
    CSS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN$CSS_FILE")
    if [ "$CSS_CODE" = "200" ]; then
        echo "   ✅ CSS bundle loads (HTTP $CSS_CODE)"
        echo "      File: $CSS_FILE"
    else
        echo "   ❌ CSS bundle failed (HTTP $CSS_CODE)"
    fi
else
    echo "   ❌ CSS bundle not found in HTML"
fi

# Check React Router support
echo ""
echo "5. Checking React Router support..."
BOOTCAMPS_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/bootcamps")
if [ "$BOOTCAMPS_CODE" = "200" ]; then
    echo "   ✅ React Router works (/bootcamps returns HTTP $BOOTCAMPS_CODE)"
else
    echo "   ❌ React Router failed (/bootcamps returns HTTP $BOOTCAMPS_CODE)"
    echo "      This usually means .htaccess is missing or incorrect"
fi

# Check API endpoint
echo ""
echo "6. Checking API availability..."
API_CODE=$(curl -s -o /dev/null -w "%{http_code}" "$DOMAIN/api/track.php")
if [ "$API_CODE" = "200" ] || [ "$API_CODE" = "405" ]; then
    echo "   ✅ API endpoint accessible (HTTP $API_CODE)"
else
    echo "   ⚠️  API endpoint returned HTTP $API_CODE (might be normal)"
fi

# Check .htaccess security headers
echo ""
echo "7. Checking security headers..."
SECURITY_HEADERS=$(curl -s -I "$DOMAIN" | grep -i "x-content-type-options\|x-frame-options\|x-xss-protection")
if [ -n "$SECURITY_HEADERS" ]; then
    echo "   ✅ Security headers present"
    echo "$SECURITY_HEADERS" | sed 's/^/      /'
else
    echo "   ⚠️  Security headers not found (check if .htaccess is correct)"
fi

echo ""
echo "========================================="
echo "Verification complete!"
echo ""
echo "If you see ❌ errors above, check:"
echo "  - .htaccess file is present in public_html/"
echo "  - All files extracted correctly"
echo "  - File permissions are correct (644 for files, 755 for directories)"






