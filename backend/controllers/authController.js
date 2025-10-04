const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');


exports.signup = async (req, res) => {
try {
const { name, email, password } = req.body;
if (!name || !email || !password) return res.status(400).json({ message: 'Please enter all fields' });


let user = await User.findOne({ email });
if (user) return res.status(400).json({ message: 'User already exists' });


const salt = await bcrypt.genSalt(10);
const hashed = await bcrypt.hash(password, salt);


user = new User({ name, email, password: hashed });
await user.save();


const payload = { id: user._id };
const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });


res.status(201).json({ token, user: { _id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.login = async (req, res) => {
try {
const { email, password } = req.body;
if (!email || !password) return res.status(400).json({ message: 'Please enter all fields' });


const user = await User.findOne({ email });
if (!user) return res.status(400).json({ message: 'Invalid credentials' });


const isMatch = await bcrypt.compare(password, user.password);
if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });


const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
res.json({ token, user: { _id: user._id, name: user.name, email: user.email } });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};