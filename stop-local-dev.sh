#!/bin/bash

# 🛑 Stop Local Development Servers
# Ian Saura Data Engineering Hub

echo "🛑 Stopping Local Development Environment"
echo "========================================"

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# Kill any processes on ports 3000 and 3001
echo "🧹 Stopping all processes on ports 3000 and 3001..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:3001 | xargs kill -9 2>/dev/null || true

# Stop PHP server if PID file exists
if [ -f logs/php-server.pid ]; then
    PHP_PID=$(cat logs/php-server.pid)
    echo "🐘 Stopping PHP server (PID: $PHP_PID)..."
    kill $PHP_PID 2>/dev/null || true
    rm logs/php-server.pid
    echo "✅ PHP server stopped"
fi

# Kill any remaining React processes
echo "⚛️  Stopping React development server..."
pkill -f "react-scripts start" 2>/dev/null || true

# Clean up any remaining Node processes
pkill -f "node.*start" 2>/dev/null || true

echo -e "${GREEN}🎉 All development servers stopped!${NC}"
echo ""
echo "💡 To start again, run: ./start-local-dev.sh"
echo "📝 Logs are available in the logs/ directory" 