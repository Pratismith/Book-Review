const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');
const { protect } = require('../middlewares/auth');

router.post('/:bookId', protect, reviewController.addReview);

router.get('/my-reviews', protect, reviewController.getMyReviews);

router.get('/:bookId', reviewController.getReviewsForBook);

router.put('/:id', protect, reviewController.updateReview);

router.delete('/:id', protect, reviewController.deleteReview);

module.exports = router;
