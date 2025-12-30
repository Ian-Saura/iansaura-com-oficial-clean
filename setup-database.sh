#!/bin/bash

# 🎯 Ian Saura Data Engineering Hub - Database Setup Script
# This script prepares everything for Ferozo deployment

echo "🚀 Ian Saura Data Engineering Hub - Database Setup"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Please run this script from the project root directory${NC}"
    exit 1
fi

echo -e "${BLUE}📋 Database Setup Checklist${NC}"
echo "================================"
echo ""

# Step 1: Verify files exist
echo -e "${YELLOW}Step 1: Verifying setup files...${NC}"
FILES_TO_CHECK=(
    "database/database-setup.sql"
    "api/secure-config.php"
    "api/user-logger.php"
    "api/analytics-dashboard.php"
    "api/contact.php"
    "api/page-tracker.js"
    "api/track.php"
)

ALL_FILES_EXIST=true
for file in "${FILES_TO_CHECK[@]}"; do
    if [ -f "$file" ]; then
        echo -e "  ✅ $file"
    else
        echo -e "  ❌ $file ${RED}(MISSING)${NC}"
        ALL_FILES_EXIST=false
    fi
done

if [ "$ALL_FILES_EXIST" = false ]; then
    echo -e "${RED}❌ Some required files are missing. Please check the setup.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All setup files verified!${NC}"
echo ""

# Step 2: Build React application
echo -e "${YELLOW}Step 2: Building React application...${NC}"
if npm run build; then
    echo -e "${GREEN}✅ React build successful!${NC}"
else
    echo -e "${RED}❌ React build failed. Please fix build errors first.${NC}"
    exit 1
fi
echo ""

# Step 3: Create deployment package
echo -e "${YELLOW}Step 3: Creating deployment package...${NC}"

# Create temporary deployment directory
DEPLOY_DIR="deployment-temp"
rm -rf "$DEPLOY_DIR"
mkdir -p "$DEPLOY_DIR"

# Copy build files
echo "  📁 Copying React build files..."
cp -r build/* "$DEPLOY_DIR/"

# Copy API files
echo "  📁 Copying API files..."
mkdir -p "$DEPLOY_DIR/api"
cp api/*.php "$DEPLOY_DIR/api/"
cp api/*.js "$DEPLOY_DIR/api/"

# Copy database files
echo "  📁 Copying database files..."
mkdir -p "$DEPLOY_DIR/database"
cp database/database-setup.sql "$DEPLOY_DIR/database/"

echo -e "${GREEN}✅ Deployment package created!${NC}"
echo ""

# Step 4: Create database setup instructions
echo -e "${YELLOW}Step 4: Creating database setup instructions...${NC}"

cat > "$DEPLOY_DIR/FEROZO_SETUP_INSTRUCTIONS.txt" << 'EOF'
🎯 FEROZO HOSTING SETUP INSTRUCTIONS
===================================

📊 DATABASE SETUP:
1. Log into your Ferozo control panel
2. Go to "MySQL Databases" section
3. Your database is already created:
   - Database: c2621673_ian
   - User: c2621673_ian
   - Password: ***REMOVED***
   - Host: localhost

4. Open phpMyAdmin from your control panel
5. Select database "c2621673_ian"
6. Go to "Import" tab
7. Upload the file: database/database-setup.sql
8. Click "Go" to create all tables

🌐 FILE UPLOAD:
1. Upload all files from this deployment package to your /public_html folder
2. Make sure the API folder is uploaded to /public_html/api/

🔐 SECURITY:
- Database credentials are in api/secure-config.php
- Change the analytics dashboard password in api/analytics-dashboard.php
- Default password is: admin123!

📈 ANALYTICS ACCESS:
Visit: https://yourdomain.com/api/analytics-dashboard.php

🎉 DONE!
Your site will now track all user activity automatically!
EOF

echo -e "${GREEN}✅ Setup instructions created!${NC}"
echo ""

# Step 5: Create ZIP file for easy upload
echo -e "${YELLOW}Step 5: Creating ZIP file for upload...${NC}"
if command -v zip &> /dev/null; then
    cd "$DEPLOY_DIR"
    zip -r "../ferozo-deployment-complete.zip" . > /dev/null 2>&1
    cd ..
    echo -e "${GREEN}✅ ZIP file created: ferozo-deployment-complete.zip${NC}"
else
    echo -e "${YELLOW}⚠️  ZIP command not found. You can manually compress the deployment-temp folder.${NC}"
fi

# Cleanup
rm -rf "$DEPLOY_DIR"

echo ""
echo -e "${GREEN}🎉 DATABASE SETUP COMPLETE!${NC}"
echo "=========================="
echo ""
echo -e "${BLUE}📋 NEXT STEPS:${NC}"
echo "1. Upload 'ferozo-deployment-complete.zip' to your Ferozo hosting"
echo "2. Extract it in your /public_html folder"
echo "3. Import database/database-setup.sql via phpMyAdmin"
echo "4. Visit your analytics dashboard and change the password"
echo ""
echo -e "${BLUE}🔗 IMPORTANT LINKS:${NC}"
echo "• Analytics Dashboard: https://yourdomain.com/api/analytics-dashboard.php"
echo "• Database: c2621673_ian (already configured)"
echo "• Default Analytics Password: admin123!"
echo ""
echo -e "${GREEN}Your Ian Saura Data Engineering Hub is ready to track users! 🚀${NC}" 