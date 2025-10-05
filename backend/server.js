const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const connectDB = require('./config/db');

dotenv.config();
const app = express();

// Middleware
app.use(express.json());

// CORS Configuration
const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('Not allowed by CORS'));
  },
  credentials: true
}));

// Serve uploads/static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect DB
connectDB(process.env.MONGO_URI);

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/reviews', require('./routes/reviews'));

// Serve frontend build
const frontendPath = path.join(__dirname, '..', 'frontend', 'dist');
if (fs.existsSync(frontendPath)) {
  app.use(express.static(frontendPath));
  app.get('*', (req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
  });
  console.log('✅ Serving frontend from:', frontendPath);
} else {
  console.log('⚠️  Frontend build not found, API only mode.');
}

// Railway-friendly port
const PORT = process.env.PORT || 3001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🌐 Allowed origins: ${allowedOrigins.join(', ')}`);
});
