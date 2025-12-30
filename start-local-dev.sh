#!/bin/bash

# 🚀 Local Development Starter Script
# Ian Saura Data Engineering Hub

echo "🚀 Starting Local Development Environment"
echo "========================================"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if PHP is installed
if ! command -v php &> /dev/null; then
    echo "❌ PHP is not installed. Please install PHP first."
    echo "   On macOS: brew install php"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

echo -e "${BLUE}📋 Setup Overview:${NC}"
echo "• React App: http://localhost:3000"
echo "• PHP APIs: http://localhost:3001/api"
echo "• Analytics Dashboard: http://localhost:3001/api/analytics-dashboard-local.php"
echo "• Password: admin123!"
echo ""

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}📦 Installing Node.js dependencies...${NC}"
    npm install
fi

# Create logs directory
mkdir -p logs

echo -e "${GREEN}✅ Starting servers...${NC}"

# Kill any existing processes on ports 3000 and 3001
echo "🧹 Cleaning up existing processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true
sleep 2

# Start PHP built-in server in background
echo "🐘 Starting PHP API server on port 3001..."
cd api
php -S localhost:3001 router.php > ../logs/php-server.log 2>&1 &
PHP_PID=$!
cd ..

# Wait a moment for PHP server to start
sleep 3

# Check if PHP server started successfully
if ! curl -s http://localhost:3001 > /dev/null; then
    echo "❌ Failed to start PHP server"
    kill $PHP_PID 2>/dev/null
    exit 1
fi

echo "✅ PHP API server started successfully (PID: $PHP_PID)"

# Function to start React server
start_react_server() {
    echo "⚛️ Starting React development server..."
    npm start > logs/react_server.log 2>&1 &
    REACT_PID=$!
    echo $REACT_PID > logs/react_server.pid
    echo "✅ React server started (PID: $REACT_PID)"
}

# Start React development server
echo "⚛️  Starting React development server..."
echo "   This will open in your browser automatically"
echo ""
echo "🔧 Available endpoints:"
echo "   - Home: http://localhost:3000"
echo "   - Auth: http://localhost:3000/auth"
echo "   - Analytics: http://localhost:3001/api/analytics-dashboard-local.php"
echo "   - Test APIs: http://localhost:3001/api/test-local.php"
echo ""
echo "📝 API Endpoints:"
echo "   - Waitlist: POST http://localhost:3001/api/waitlist-local.php"
echo "   - Contact: POST http://localhost:3001/api/contact-local.php"
echo "   - Auth: POST http://localhost:3001/api/auth-local.php"
echo ""
echo -e "${GREEN}🎉 Local development environment started!${NC}"
echo ""
echo -e "${BLUE}📱 Access your application:${NC}"
echo "• Main App: http://localhost:3000"
echo "• Analytics: http://localhost:3001/api/analytics-dashboard-local.php"
echo ""
echo -e "${YELLOW}📊 Monitor in real-time:${NC}"
echo "• Contact Forms: tail -f logs/contact_readable.txt"
echo "• User Tracking: tail -f logs/tracking_readable.txt"
echo "• All Logs: tail -f logs/*.txt"
echo ""
echo -e "${BLUE}🛑 To stop servers:${NC}"
echo "• Press Ctrl+C or run: ./stop-local-dev.sh"
echo ""

# Save PHP PID for cleanup
echo $PHP_PID > logs/php-server.pid

# Start React (this will block until stopped)
npm start

# Trap Ctrl+C to clean up
cleanup() {
    echo ""
    echo -e "${YELLOW}🛑 Stopping servers...${NC}"
    
    if [ -f logs/php-server.pid ]; then
        PHP_PID=$(cat logs/php-server.pid)
        kill $PHP_PID 2>/dev/null
        rm logs/php-server.pid
        echo "✅ PHP server stopped"
    fi
    
    if [ -f logs/react_server.pid ]; then
        REACT_PID=$(cat logs/react_server.pid)
        kill $REACT_PID 2>/dev/null
        rm logs/react_server.pid
        echo "✅ React server stopped"
    fi
    
    echo -e "${GREEN}👋 Local development environment stopped!${NC}"
    exit 0
}

trap cleanup SIGINT

# Keep script running
while true; do
    sleep 1
done 