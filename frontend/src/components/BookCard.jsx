import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {
  const getBookCoverUrl = (title, author) => {
    const query = encodeURIComponent(`${title} ${author} book cover`)
    return `https://source.unsplash.com/400x600/?book,${query}`
  }

  return (
    <Link to={`/books/${book._id}`} className="group">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
        <div className="relative h-64 bg-gradient-to-br from-amber-200 to-orange-200 overflow-hidden">
          <img 
            src={getBookCoverUrl(book.title, book.author)}
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
