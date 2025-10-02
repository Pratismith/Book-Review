const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect } = require('../middlewares/auth');

// Add a new book
router.post('/', protect, bookController.addBook);

// Get all books (with pagination)
router.get('/', bookController.getBooks);

// Get single book details (with reviews & avg rating)
router.get('/:id', bookController.getBookDetails);

// Update book
router.put('/:id', protect, bookController.updateBook);

// Delete book
router.delete('/:id', protect, bookController.deleteBook);

module.exports = router;
