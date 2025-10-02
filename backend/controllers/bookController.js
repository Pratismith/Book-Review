const Book = require('../models/Book');
const Review = require('../models/Review');


// Create book
exports.createBook = async (req, res) => {
try {
const { title, author, description, genre, year } = req.body;
const book = new Book({ title, author, description, genre, year, addedBy: req.user._id });
await book.save();
res.status(201).json(book);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


// Edit book
exports.updateBook = async (req, res) => {
try {
const book = await Book.findById(req.params.id);
if (!book) return res.status(404).json({ message: 'Book not found' });
if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });


const updates = ['title','author','description','genre','year'];
updates.forEach(k => { if (req.body[k] !== undefined) book[k] = req.body[k]; });
await book.save();
res.json(book);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


// Delete book
exports.deleteBook = async (req, res) => {
try {
const book = await Book.findById(req.params.id);
if (!book) return res.status(404).json({ message: 'Book not found' });
if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });


await Review.deleteMany({ bookId: book._id });
await book.remove();
res.json({ message: 'Book removed' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


// List books with pagination and optional search/filter
exports.listBooks = async (req, res) => {
try {
const page = parseInt(req.query.page) || 1;
const limit = 5;
const skip = (page - 1) * limit;


const q = (req.query.q || '').trim();
const genre = req.query.genre;


const filter = {};
if (q) filter.$or = [ { title: new RegExp(q, 'i') }, { author: new RegExp(q, 'i') } ];
if (genre) filter.genre = genre;


const total = await Book.countDocuments(filter);
const books = await Book.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).populate('addedBy', 'name');


res.json({ books, total, page, pages: Math.ceil(total / limit) });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


// Get book details + reviews + average rating
exports.getBookDetails = async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate('addedBy', 'name email');
    if (!book) return res.status(404).json({ message: 'Book not found' });

    const reviews = await Review.find({ bookId: book._id }).populate('userId', 'name');
    const avg = reviews.length
      ? (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

    res.json({
      book,
      reviews,
      averageRating: avg
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
