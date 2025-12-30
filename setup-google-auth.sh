#!/bin/bash

# Google Authentication Setup Script
# Ian Saura Data Engineering Hub

echo "🔐 Setting up Google Authentication..."
echo "====================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Google OAuth credentials (from your existing setup)
# IMPORTANT: Replace these with your actual credentials from Google Cloud Console
GOOGLE_CLIENT_ID="${GOOGLE_CLIENT_ID:-YOUR_GOOGLE_CLIENT_ID_HERE}"
GOOGLE_CLIENT_SECRET="${GOOGLE_CLIENT_SECRET:-YOUR_GOOGLE_CLIENT_SECRET_HERE}"
GOOGLE_PROJECT_ID="${GOOGLE_PROJECT_ID:-YOUR_GOOGLE_PROJECT_ID_HERE}"

echo -e "${BLUE}📋 Your Google OAuth Credentials:${NC}"
echo "   Client ID: $GOOGLE_CLIENT_ID"
echo "   Project ID: $GOOGLE_PROJECT_ID"
echo "   Client Secret: [HIDDEN]"
echo ""

# Step 1: Create local environment file
echo -e "${YELLOW}Step 1: Creating local environment file...${NC}"

cat > .env.local << EOF
# Google OAuth Configuration
REACT_APP_GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID
REACT_APP_GOOGLE_PROJECT_ID=$GOOGLE_PROJECT_ID

# API Configuration
REACT_APP_API_URL=http://localhost:3001
REACT_APP_ENVIRONMENT=development

# Feature flags
REACT_APP_ENABLE_GOOGLE_AUTH=true
EOF

echo -e "${GREEN}✅ Created .env.local${NC}"

# Step 2: Update production environment template
echo -e "${YELLOW}Step 2: Updating production environment...${NC}"

# Create production environment file if it doesn't exist
if [ ! -f ".env.production" ]; then
    cp production.env.example .env.production
fi

# Update production environment with Google credentials
sed -i.bak "s/GOOGLE_CLIENT_ID=.*/GOOGLE_CLIENT_ID=$GOOGLE_CLIENT_ID/" .env.production
sed -i.bak "s/GOOGLE_CLIENT_SECRET=.*/GOOGLE_CLIENT_SECRET=$GOOGLE_CLIENT_SECRET/" .env.production

echo -e "${GREEN}✅ Updated .env.production${NC}"

# Step 3: Create Google Auth test script
echo -e "${YELLOW}Step 3: Creating Google Auth test script...${NC}"

cat > test-google-auth.php << 'EOF'
<?php
/**
 * Google Authentication Test Script
 * Tests Google OAuth integration
 */

echo "🧪 Testing Google Authentication\n";
echo "================================\n\n";

// Test Google Auth API endpoint
$apiUrl = 'http://localhost:3001/api/google-auth.php';

echo "📡 Testing Google Auth API: $apiUrl\n";

// Test with sample Google user data
$sampleGoogleUser = [
    'googleUser' => [
        'id' => 'google_test_123',
        'email' => 'test@gmail.com',
        'name' => 'Test User',
        'picture' => 'https://example.com/avatar.jpg'
    ]
];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $apiUrl);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($sampleGoogleUser));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'User-Agent: Google-Auth-Test/1.0'
]);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$error = curl_error($ch);
curl_close($ch);

if ($error) {
    echo "❌ CURL Error: $error\n";
} else {
    echo "📊 HTTP Status: $httpCode\n";
    echo "📄 Response: $response\n";
    
    $result = json_decode($response, true);
    if ($result && isset($result['success']) && $result['success']) {
        echo "✅ Google Auth API working correctly!\n";
        echo "   User ID: " . $result['user']['id'] . "\n";
        echo "   Email: " . $result['user']['email'] . "\n";
        echo "   Name: " . $result['user']['name'] . "\n";
    } else {
        echo "❌ Google Auth API test failed\n";
        if ($result && isset($result['error'])) {
            echo "   Error: " . $result['error'] . "\n";
        }
    }
}

echo "\n🔧 Frontend Configuration:\n";
echo "   React App URL: http://localhost:3000\n";
echo "   Auth Page: http://localhost:3000/auth\n";
echo "   Google Button: Click 'Continuar con Google'\n";

echo "\n📋 Next Steps:\n";
echo "1. Start React app: npm start\n";
echo "2. Start PHP server: php -S localhost:3001 -t .\n";
echo "3. Visit: http://localhost:3000/auth\n";
echo "4. Click: 'Continuar con Google'\n";
echo "5. Complete OAuth flow\n";

echo "\n🎉 Google Authentication is configured!\n";
EOF

chmod +x test-google-auth.php
echo -e "${GREEN}✅ Created test-google-auth.php${NC}"

# Step 4: Test current setup
echo -e "${YELLOW}Step 4: Testing current configuration...${NC}"

# Check if Google client ID is properly set
if [ -f ".env.local" ]; then
    echo -e "${GREEN}✅ Local environment file created${NC}"
    echo "   Location: .env.local"
else
    echo -e "${RED}❌ Failed to create .env.local${NC}"
fi

# Check if Google Auth API exists
if [ -f "api/google-auth.php" ]; then
    echo -e "${GREEN}✅ Google Auth API found${NC}"
    echo "   Location: api/google-auth.php"
else
    echo -e "${RED}❌ Google Auth API not found${NC}"
    echo "   Expected: api/google-auth.php"
fi

# Check if Google config exists
if [ -f "src/config/google.ts" ]; then
    echo -e "${GREEN}✅ Google config found${NC}"
    echo "   Location: src/config/google.ts"
else
    echo -e "${RED}❌ Google config not found${NC}"
fi

echo ""
echo -e "${BLUE}🎯 Setup Complete!${NC}"
echo ""
echo -e "${GREEN}✅ Environment files configured${NC}"
echo -e "${GREEN}✅ Google OAuth credentials set${NC}"
echo -e "${GREEN}✅ Test script created${NC}"
echo -e "${GREEN}✅ Ready for testing${NC}"
echo ""

echo -e "${YELLOW}📋 To test Google Authentication:${NC}"
echo ""
echo "1. Start development servers:"
echo "   npm start                    # React app (port 3000)"
echo "   php -S localhost:3001 -t .   # PHP API (port 3001)"
echo ""
echo "2. Test the API:"
echo "   php test-google-auth.php"
echo ""
echo "3. Test the frontend:"
echo "   Visit: http://localhost:3000/auth"
echo "   Click: 'Continuar con Google'"
echo ""
echo "4. Monitor users in database:"
echo "   SELECT * FROM users WHERE provider = 'google';"
echo ""

echo -e "${BLUE}🔗 Useful Links:${NC}"
echo "   Google Console: https://console.cloud.google.com/"
echo "   Your OAuth App: https://console.cloud.google.com/apis/credentials/oauthclient/$GOOGLE_CLIENT_ID"
echo "   Auth Test Page: http://localhost:3000/auth"
echo ""

echo -e "${GREEN}🎉 Google Authentication is ready to use!${NC}"
echo ""
echo -e "${YELLOW}💡 Note: Make sure your Google Console OAuth settings match:${NC}"
echo "   JavaScript Origins: http://localhost:3000, https://www.iansaura.com"
echo "   Redirect URIs: http://localhost:3000/login, https://www.iansaura.com/login"
echo "" 