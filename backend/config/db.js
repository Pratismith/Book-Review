const mongoose = require('mongoose');


const connectDB = async (mongoURI) => {
try {
if (!mongoURI) {
  console.error('❌ MONGO_URI is not defined!');
  process.exit(1);
}
console.log('🔌 Connecting to MongoDB...');
console.log('📍 URI starts with:', mongoURI.substring(0, 20) + '...');
await mongoose.connect(mongoURI);
console.log('✅ MongoDB connected successfully');
} catch (err) {
console.error('❌ MongoDB connection error:', err.message);
console.error('Full error:', err);
process.exit(1);
}
};


module.exports = connectDB;