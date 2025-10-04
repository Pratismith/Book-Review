import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {
  const getBookCoverUrl = (title, author) => {
    const query = encodeURIComponent(`${title} ${author} book cover`)
    return `https://source.unsplash.com/400x600/?book,${query}`
  }

  const displayImage = book.coverImage || getBookCoverUrl(book.title, book.author)
  const avgRating = book.avgRating ? Number(book.avgRating).toFixed(1) : 0
  const reviewCount = book.reviewCount || 0

  return (
    <Link to={`/books/${book._id}`} className="group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative h-64 bg-gradient-to-br from-amber-200 to-orange-200 overflow-hidden">
          <img 
            src={displayImage}
            alt={book.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&h=600&fit=crop'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          {book.genre && (
            <span className="absolute top-4 right-4 bg-amber-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {book.genre}
            </span>
          )}
          
          {/* Average Rating Badge */}
          {avgRating > 0 && (
            <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-xl px-3 py-2 shadow-lg flex items-center gap-2">
              <div className="flex items-center">
                <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-lg font-bold text-gray-900 ml-1">{avgRating}</span>
              </div>
              <span className="text-sm text-gray-600">({reviewCount} {reviewCount === 1 ? 'review' : 'reviews'})</span>
            </div>
          )}
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-amber-700 transition-colors">
            {book.title}
          </h3>
          <p className="text-amber-600 font-medium mb-3">by {book.author}</p>
          {book.year && (
            <p className="text-gray-500 text-sm mb-3">Published: {book.year}</p>
          )}
          {book.description && (
            <p className="text-gray-600 mb-4 line-clamp-2 leading-relaxed">{book.description}</p>
          )}
          
          {/* Star Rating Display */}
          {avgRating > 0 && (
            <div className="mb-4 flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(avgRating) ? 'text-amber-500' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-600">{avgRating}/5</span>
            </div>
          )}
          
          <div className="flex items-center text-amber-600 group-hover:text-amber-700 font-semibold">
            <span>View Details</span>
            <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default BookCard
