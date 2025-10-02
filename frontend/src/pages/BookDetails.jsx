import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../api/axios'

const BookDetails = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [book, setBook] = useState(null)
  const [reviews, setReviews] = useState([])
  const [averageRating, setAverageRating] = useState(0)
  const [loading, setLoading] = useState(true)
  const [rating, setRating] = useState(5)
  const [reviewText, setReviewText] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchBookDetails()
  }, [id])

  const fetchBookDetails = async () => {
    try {
      const { data } = await api.get(`/books/${id}`)
      setBook(data.book)
      setReviews(data.reviews)
      setAverageRating(data.averageRating)
    } catch (error) {
      console.error('Error fetching book details:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmitReview = async (e) => {
    e.preventDefault()
    if (!user) {
      navigate('/login')
      return
    }

    setSubmitting(true)
    try {
      await api.post(`/reviews/${id}`, { rating, reviewText })
      setRating(5)
      setReviewText('')
      fetchBookDetails()
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to submit review')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDeleteReview = async (reviewId) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return

    try {
      await api.delete(`/reviews/${reviewId}`)
      fetchBookDetails()
    } catch (error) {
      alert('Failed to delete review')
    }
  }

  if (loading) {
    return <div className="text-center py-8">Loading...</div>
  }

  if (!book) {
    return <div className="text-center py-8">Book not found</div>
  }

  const userReview = reviews.find((r) => r.userId?._id === user?._id)

  return (
    <div>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <div className="flex justify-between items-start mb-4">
          <h1 className="text-4xl font-bold text-gray-800">{book.title}</h1>
          {user && book.addedBy?._id === user._id && (
            <Link
              to={`/edit-book/${book._id}`}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Book
            </Link>
          )}
        </div>
        <p className="text-xl text-gray-600 mb-4">by {book.author}</p>
        
        <div className="flex gap-4 mb-4">
          {book.genre && (
            <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded">
              {book.genre}
            </span>
          )}
          {book.year && (
            <span className="inline-block bg-gray-100 text-gray-800 px-3 py-1 rounded">
              {book.year}
            </span>
          )}
        </div>

        {book.description && (
          <p className="text-gray-700 mb-4">{book.description}</p>
        )}

        <div className="text-lg font-semibold text-gray-800">
          Average Rating: {averageRating} / 5 ({reviews.length} reviews)
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Reviews</h2>
        
        {user && !userReview && (
          <form onSubmit={handleSubmitReview} className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Rating</label>
              <select
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={5}>5 - Excellent</option>
                <option value={4}>4 - Good</option>
                <option value={3}>3 - Average</option>
                <option value={2}>2 - Poor</option>
                <option value={1}>1 - Terrible</option>
              </select>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Review</label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                rows="4"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Share your thoughts about this book..."
              />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        )}

        {reviews.length === 0 ? (
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        ) : (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review._id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <p className="font-semibold text-gray-800">
                      {review.userId?.name || 'Anonymous'}
                    </p>
                    <p className="text-yellow-500">
                      {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
                    </p>
                  </div>
                  {user && review.userId?._id === user._id && (
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-red-600 hover:text-red-800 text-sm"
                    >
                      Delete
                    </button>
                  )}
                </div>
                {review.reviewText && (
                  <p className="text-gray-700">{review.reviewText}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default BookDetails
