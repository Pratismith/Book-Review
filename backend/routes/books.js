const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const { protect } = require('../middlewares/auth');
const upload = require('../middlewares/upload');

router.post('/', protect, upload.single('coverImage'), bookController.addBook);

router.get('/', bookController.getBooks);

router.get('/my-books', protect, bookController.getMyBooks);

router.get('/:id', bookController.getBookDetails);

router.put('/:id', protect, upload.single('coverImage'), bookController.updateBook);

router.delete('/:id', protect, bookController.deleteBook);

module.exports = router;
