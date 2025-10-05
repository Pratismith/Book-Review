#!/bin/bash

# Get the script directory
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Start backend in the background
echo "🚀 Starting backend server..."
(cd "$SCRIPT_DIR/backend" && node server.js) &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Start frontend
echo "🎨 Starting frontend server..."
cd "$SCRIPT_DIR/frontend" && npm run dev

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
