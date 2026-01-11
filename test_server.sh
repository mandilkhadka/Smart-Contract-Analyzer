#!/bin/bash
cd /Users/m/code/mandilkhadka/Smart-Contract-Analyzer

echo "Starting server..."
bin/dev > /tmp/server.log 2>&1 &
SERVER_PID=$!

echo "Waiting for server to start..."
sleep 10

if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Server is running on http://localhost:3000"
    echo "✅ Vite dev server should be on http://localhost:3036"
    echo ""
    echo "To stop the server, run: kill $SERVER_PID"
else
    echo "❌ Server failed to start"
    echo "Check logs: tail -f /tmp/server.log"
    kill $SERVER_PID 2>/dev/null
fi
