// const express = require('express');
// const dotenv = require('dotenv');
// const cors = require('cors');
// const path = require('path');
// const connectDB = require('./config/db');

// dotenv.config();

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Serve static uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // Connect to DB
// connectDB(process.env.MONGO_URI);

// // Routes
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/books', require('./routes/books'));
// app.use('/api/reviews', require('./routes/reviews'));

// // Serve static files from the React app in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/dist')));
  
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
//   });
// }

// const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 5000 : 3001);
// const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';
// app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Connect to DB
connectDB(process.env.MONGO_URI);

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/books', require('./routes/books'));
app.use('/api/reviews', require('./routes/reviews'));

// Serve React frontend in production
if (process.env.NODE_ENV === 'production') {
  // Serve static files from frontend/dist
  app.use(express.static(path.join(__dirname, 'frontend/dist')));

  // For any route not handled by API, send index.html
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || (process.env.NODE_ENV === 'production' ? 5000 : 3001);
const HOST = process.env.NODE_ENV === 'production' ? '0.0.0.0' : 'localhost';

app.listen(PORT, HOST, () => console.log(`Server running on ${HOST}:${PORT}`));
