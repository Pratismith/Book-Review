#!/bin/bash

# Start backend in the background
echo "🚀 Starting backend server..."
cd backend && node server.js &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend server..."
cd ../frontend && npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
