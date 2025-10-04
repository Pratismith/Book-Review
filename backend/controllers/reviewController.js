const Review = require('../models/Review');
const Book = require('../models/Book');


exports.addReview = async (req, res) => {
try {
const { rating, reviewText } = req.body;
const bookId = req.params.bookId;


const existing = await Review.findOne({ bookId, userId: req.user._id });
if (existing) return res.status(400).json({ message: 'You already reviewed this book. Edit your review instead.' });


const review = new Review({ bookId, userId: req.user._id, rating, reviewText });
await review.save();
res.status(201).json(review);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.updateReview = async (req, res) => {
try {
const review = await Review.findById(req.params.id);
if (!review) return res.status(404).json({ message: 'Review not found' });
if (review.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });


if (req.body.rating !== undefined) review.rating = req.body.rating;
if (req.body.reviewText !== undefined) review.reviewText = req.body.reviewText;
await review.save();
res.json(review);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.deleteReview = async (req, res) => {
try {
const review = await Review.findById(req.params.id);
if (!review) return res.status(404).json({ message: 'Review not found' });
if (review.userId.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });

await review.deleteOne();
res.json({ message: 'Review removed' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};

exports.getReviewsForBook = async (req, res) => {
try {
const reviews = await Review.find({ bookId: req.params.bookId }).populate('userId', 'name');
res.json(reviews);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ userId: req.user._id })
      .populate('userId', 'name')
      .sort({ createdAt: -1 });
    
    const reviewsWithBooks = await Promise.all(
      reviews.map(async (review) => {
        const book = await Book.findById(review.bookId);
        return {
          ...review.toObject(),
          bookTitle: book ? book.title : 'Unknown Book',
          bookId: book ? book._id : null
        };
      })
    );
    
    res.json(reviewsWithBooks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
