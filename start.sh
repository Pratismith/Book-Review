#!/bin/bash

(cd backend && node server.js) &
BACKEND_PID=$!

(cd frontend && npm run dev) &
FRONTEND_PID=$!

wait $FRONTEND_PID
