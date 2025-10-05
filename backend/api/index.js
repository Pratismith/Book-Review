const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('../config/db');

dotenv.config({ path: path.join(__dirname, '../.env') });

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5000',
  'http://localhost:3000',
  process.env.FRONTEND_URL
].filter(Boolean);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) {
      callback(null, true);
    } 
    else if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } 
    else if (origin && (origin.includes('.replit.dev') || origin.includes('.vercel.app'))) {
      callback(null, true);
    }
    else if (process.env.NODE_ENV !== 'production') {
      callback(null, true);
    } 
    else {
      console.error(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

connectDB(process.env.MONGO_URI);

app.use('/api/auth', require('../routes/auth'));
app.use('/api/books', require('../routes/books'));
app.use('/api/reviews', require('../routes/reviews'));

module.exports = app;
