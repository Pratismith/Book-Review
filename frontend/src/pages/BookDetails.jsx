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

  const getBookCoverUrl = (title, author) => {
    const query = encodeURIComponent(`${title} ${author} book cover`)
    return `https://source.unsplash.com/600x900/?book,${query}`
  }

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-amber-500 border-t-transparent"></div>
        <p className="mt-4 text-amber-800 text-lg">Loading book details...</p>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <p className="text-2xl text-gray-700">Book not found</p>
      </div>
    )
  }

  const userReview = reviews.find((r) => r.userId?._id === user?._id)
  const displayImage = book.coverImage || getBookCoverUrl(book.title, book.author)

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden border border-amber-200 mb-10">
          <div className="grid md:grid-cols-2 gap-10 p-10">
            <div>
              <img 
                src={displayImage}
                alt={book.title}
                className="w-full rounded-2xl shadow-2xl"
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=600&h=900&fit=crop'
                }}
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-5xl font-bold text-amber-900 mb-4">{book.title}</h1>
                  <p className="text-2xl text-amber-600 font-semibold mb-6">by {book.author}</p>
                </div>
                {user && book.addedBy?._id === user._id && (
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-amber-600 text-white px-6 py-3 rounded-full hover:bg-amber-700 font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                  >
                    Edit Book
                  </Link>
                )}
              </div>
              
              <div className="flex gap-3 mb-6">
                {book.genre && (
                  <span className="bg-amber-500 text-white px-4 py-2 rounded-full font-semibold">
                    {book.genre}
                  </span>
                )}
                {book.year && (
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full font-semibold">
                    {book.year}
                  </span>
                )}
              </div>

              {book.description && (
                <p className="text-gray-700 text-lg mb-6 leading-relaxed">{book.description}</p>
              )}

              <div className="bg-gradient-to-r from-amber-100 to-orange-100 p-6 rounded-2xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-amber-900 font-semibold mb-2">Average Rating</p>
                    <div className="flex items-center">
                      <span className="text-4xl font-bold text-amber-600">{averageRating}</span>
                      <span className="text-2xl text-amber-600 ml-2">/ 5</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-amber-900 font-semibold mb-2">Total Reviews</p>
                    <span className="text-4xl font-bold text-amber-600">{reviews.length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-amber-200">
          <h2 className="text-3xl font-bold text-amber-900 mb-8">Reviews</h2>
          
          {!user ? (
            <div className="mb-10 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-300 text-center">
              <svg className="w-16 h-16 mx-auto text-amber-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-2xl font-bold text-amber-900 mb-4">Want to Share Your Review?</h3>
              <p className="text-gray-700 mb-6">Sign up or log in to share your thoughts about this book with the community!</p>
              <div className="flex gap-4 justify-center">
                <Link
                  to="/login"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Sign Up Free
                </Link>
              </div>
            </div>
          ) : user && !userReview ? (
            <form onSubmit={handleSubmitReview} className="mb-10 p-8 bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border-2 border-amber-200">
              <h3 className="text-2xl font-bold text-amber-900 mb-6">Write a Review</h3>
              <div className="mb-6">
                <label className="block text-amber-900 font-semibold mb-3">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="w-full px-6 py-3 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all duration-300 text-gray-900"
                >
                  <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
                  <option value={4}>⭐⭐⭐⭐ Good</option>
                  <option value={3}>⭐⭐⭐ Average</option>
                  <option value={2}>⭐⭐ Poor</option>
                  <option value={1}>⭐ Terrible</option>
                </select>
              </div>
              <div className="mb-6">
                <label className="block text-amber-900 font-semibold mb-3">Your Review</label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  rows="5"
                  className="w-full px-6 py-4 border-2 border-amber-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all duration-300 text-gray-900"
                  placeholder="Share your thoughts about this book..."
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full font-bold hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          ) : user && userReview ? (
            <div className="mb-10 p-8 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border-2 border-green-200 text-center">
              <svg className="w-16 h-16 mx-auto text-green-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-green-900 mb-2">You've Already Reviewed This Book!</h3>
              <p className="text-gray-700">Thank you for sharing your thoughts! You can see your review below.</p>
            </div>
          ) : null}

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <svg className="w-20 h-20 mx-auto text-amber-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <p className="text-xl text-gray-600">No reviews yet. Be the first to review!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review._id} className="border-2 border-amber-200 rounded-2xl p-6 bg-gradient-to-r from-white to-amber-50 hover:border-amber-400 transition-all duration-300">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="font-bold text-xl text-amber-900">
                        {review.userId?.name || 'Anonymous'}
                      </p>
                      <div className="flex items-center mt-2">
                        <span className="text-2xl text-amber-500">
                          {'★'.repeat(review.rating)}
                        </span>
                        <span className="text-2xl text-gray-300">
                          {'★'.repeat(5 - review.rating)}
                        </span>
                        <span className="ml-3 text-amber-600 font-semibold">
                          {review.rating}/5
                        </span>
                      </div>
                    </div>
                    {user && review.userId?._id === user._id && (
                      <button
                        onClick={() => handleDeleteReview(review._id)}
                        className="text-red-600 hover:text-red-800 font-semibold px-4 py-2 rounded-full hover:bg-red-50 transition-all duration-300"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                  {review.reviewText && (
                    <p className="text-gray-700 text-lg leading-relaxed">{review.reviewText}</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default BookDetails
