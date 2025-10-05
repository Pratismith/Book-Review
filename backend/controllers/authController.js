const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = async (req, res) => {
try {
const { name, email, password } = req.body;
console.log('📝 Signup attempt:', { name, email, hasPassword: !!password });
if (!name || !email || !password) return res.status(400).json({ message: 'Please enter all fields' });

console.log('🔍 Checking if user exists...');
let user = await User.findOne({ email });
if (user) {
  console.log('❌ User already exists:', email);
  return res.status(400).json({ message: 'User already exists' });
}

console.log('🔐 Hashing password...');
const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);

console.log('💾 Creating new user...');
user = new User({ name, email, password: hashed });
await user.save();
console.log('✅ User saved successfully:', user._id);

console.log('🎟️ Generating JWT token...');
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not defined!');
  return res.status(500).json({ message: 'Server configuration error' });
}
const payload = { id: user._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
console.log('✅ Token generated successfully');

res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error('❌ Signup error:', err.message);
console.error('Full error:', err);
res.status(500).json({ message: 'Server error', error: err.message });
}
};


exports.login = async (req, res) => {
try {
const { email, password } = req.body;
console.log('🔑 Login attempt:', { email, hasPassword: !!password });
if (!email || !password) return res.status(400).json({ message: 'Please enter all fields' });

console.log('🔍 Finding user...');
const user = await User.findOne({ email });
if (!user) {
  console.log('❌ User not found:', email);
  return res.status(400).json({ message: 'Invalid credentials' });
}
console.log('✅ User found:', user._id);

console.log('🔐 Verifying password...');
const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) {
  console.log('❌ Password mismatch for:', email);
  return res.status(400).json({ message: 'Invalid credentials' });
}
console.log('✅ Password verified');

console.log('🎟️ Generating JWT token...');
if (!process.env.JWT_SECRET) {
  console.error('❌ JWT_SECRET is not defined!');
  return res.status(500).json({ message: 'Server configuration error' });
}
const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
console.log('✅ Token generated successfully');

res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error('❌ Login error:', err.message);
console.error('Full error:', err);
res.status(500).json({ message: 'Server error', error: err.message });
}
};