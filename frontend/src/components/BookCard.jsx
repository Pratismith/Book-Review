import { Link } from 'react-router-dom'

const BookCard = ({ book }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold text-gray-800 mb-2">{book.title}</h3>
      <p className="text-gray-600 mb-2">by {book.author}</p>
      {book.genre && (
        <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mb-2">
          {book.genre}
        </span>
      )}
      {book.year && <p className="text-gray-500 text-sm mb-2">Year: {book.year}</p>}
      {book.description && (
        <p className="text-gray-700 mb-4 line-clamp-3">{book.description}</p>
      )}
      <Link
        to={`/books/${book._id}`}
        className="text-blue-600 hover:text-blue-800 font-medium"
      >
        View Details →
      </Link>
    </div>
  )
}

export default BookCard
