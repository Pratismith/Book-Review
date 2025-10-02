const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middlewares/auth');

// Add review to a book
router.post('/:bookId', protect, reviewController.addReview);

// Get all reviews for a book
router.get('/:bookId', reviewController.getReviewsForBook);

// Update review
router.put('/:id', protect, reviewController.updateReview);

// Delete review
router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;
