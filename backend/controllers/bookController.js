const Book = require('../models/Book');
const Review = require('../models/Review');


exports.addBook = async (req, res) => {
try {
const { title, author, description, genre, year } = req.body;
const coverImage = req.file ? `/uploads/books/${req.file.filename}` : null;
const book = new Book({ 
  title, 
  author, 
  description, 
  genre, 
  year, 
  coverImage,
  addedBy: req.user._id 
});
await book.save();
res.status(201).json(book);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.updateBook = async (req, res) => {
try {
const book = await Book.findById(req.params.id);
if (!book) return res.status(404).json({ message: 'Book not found' });
if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });


const updates = ['title','author','description','genre','year'];
updates.forEach(k => { if (req.body[k] !== undefined) book[k] = req.body[k]; });

if (req.file) {
  book.coverImage = `/uploads/books/${req.file.filename}`;
}

await book.save();
res.json(book);
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.deleteBook = async (req, res) => {
try {
const book = await Book.findById(req.params.id);
if (!book) return res.status(404).json({ message: 'Book not found' });
if (book.addedBy.toString() !== req.user._id.toString()) return res.status(403).json({ message: 'Not allowed' });


await Review.deleteMany({ bookId: book._id });
await book.deleteOne();
res.json({ message: 'Book removed' });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


exports.getBooks = async (req, res) => {
try {
const page = parseInt(req.query.page) || 1;
const limit = 5;
const skip = (page - 1) * limit;

const q = (req.query.q || '').trim();
const genre = req.query.genre;
const sortBy = req.query.sortBy;

const matchFilter = {};
if (q) matchFilter.$or = [ { title: new RegExp(q, 'i') }, { author: new RegExp(q, 'i') } ];
if (genre) matchFilter.genre = genre;

if (sortBy === 'rating') {
  const aggregation = [
    { $match: matchFilter },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'bookId',
        as: 'reviews'
      }
    },
    {
      $addFields: {
        avgRating: {
          $cond: {
            if: { $gt: [{ $size: '$reviews' }, 0] },
            then: { $avg: '$reviews.rating' },
            else: 0
          }
        }
      }
    },
    { $sort: { avgRating: -1 } },
    {
      $lookup: {
        from: 'users',
        localField: 'addedBy',
        foreignField: '_id',
        as: 'addedBy'
      }
    },
    { $unwind: { path: '$addedBy', preserveNullAndEmptyArrays: true } },
    {
      $project: {
        _id: 1,
        title: 1,
        author: 1,
        description: 1,
        genre: 1,
        year: 1,
        coverImage: 1,
        createdAt: 1,
        updatedAt: 1,
        avgRating: 1,
        'addedBy._id': 1,
        'addedBy.name': 1
      }
    }
  ];

  const totalResult = await Book.aggregate([
    { $match: matchFilter },
    { $count: 'total' }
  ]);
  const total = totalResult.length > 0 ? totalResult[0].total : 0;

  aggregation.push({ $skip: skip });
  aggregation.push({ $limit: limit });

  const books = await Book.aggregate(aggregation);

  return res.json({ books, total, page, pages: Math.ceil(total / limit) });
}

let sortOptions = { createdAt: -1 };
if (sortBy === 'year') {
  sortOptions = { year: -1 };
}

const total = await Book.countDocuments(matchFilter);
const books = await Book.find(matchFilter).sort(sortOptions).skip(skip).limit(limit).populate('addedBy', 'name');

res.json({ books, total, page, pages: Math.ceil(total / limit) });
} catch (err) {
console.error(err);
res.status(500).json({ message: 'Server error' });
}
};


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


exports.getMyBooks = async (req, res) => {
  try {
    const books = await Book.find({ addedBy: req.user._id })
      .sort({ createdAt: -1 })
      .populate('addedBy', 'name');
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};
