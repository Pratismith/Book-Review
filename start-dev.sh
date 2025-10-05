#!/bin/bash

# Cleanup function
cleanup() {
  echo "🛑 Shutting down servers..."
  if [ ! -z "$BACKEND_PID" ]; then
    kill $BACKEND_PID 2>/dev/null
  fi
  exit 0
}

# Set trap before starting processes
trap cleanup EXIT INT TERM

# Start backend in the background
echo "🚀 Starting backend server..."
(cd backend && node server.js) &
BACKEND_PID=$!

# Wait for backend to be ready
sleep 3

# Start frontend
echo "🎨 Starting frontend server..."
cd frontend && npm run dev
