import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [myBooks, setMyBooks] = useState([])
  const [myReviews, setMyReviews] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchMyData()
  }, [user, navigate])

  const fetchMyData = async () => {
    try {
      const { data } = await api.get('/books')
      const userBooks = data.books.filter(
        (book) => book.addedBy?._id === user._id
      )
      setMyBooks(userBooks)

      const allReviews = []
      for (const book of data.books) {
        const reviewData = await api.get(`/reviews/${book._id}`)
        const userReviewsForBook = reviewData.data.filter(
          (review) => review.userId?._id === user._id
        )
        allReviews.push(...userReviewsForBook.map(review => ({
          ...review,
          bookTitle: book.title,
          bookId: book._id
        })))
      }
      setMyReviews(allReviews)
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book?')) return

    try {
      await api.delete(`/books/${bookId}`)
      setMyBooks(myBooks.filter((book) => book._id !== bookId))
    } catch (error) {
      console.error('Error deleting book:', error)
      alert('Failed to delete book')
    }
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 mb-10 border border-amber-200">
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-6">
              <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-full p-6">
                <svg className="w-16 h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h1 className="text-4xl font-bold text-amber-900 mb-2">My Profile</h1>
                <div className="space-y-1 text-gray-700">
                  <p className="text-xl">
                    <span className="font-semibold text-amber-800">Name:</span> {user.name}
                  </p>
                  <p className="text-lg">
                    <span className="font-semibold text-amber-800">Email:</span> {user.email}
                  </p>
                </div>
              </div>
            </div>
            <Link
              to="/add-book"
              className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              + Add New Book
            </Link>
          </div>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-amber-200">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 flex items-center">
            <svg className="w-8 h-8 mr-3 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            My Books ({myBooks.length})
          </h2>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
              <p className="mt-4 text-amber-800">Loading your books...</p>
            </div>
          ) : myBooks.length === 0 ? (
            <div className="text-center py-16">
              <svg className="w-24 h-24 mx-auto text-amber-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              <p className="text-xl text-gray-600 mb-6">You haven't added any books yet.</p>
              <Link
                to="/add-book"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105"
              >
                Add Your First Book
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {myBooks.map((book) => (
                <div
                  key={book._id}
                  className="border-2 border-amber-200 rounded-2xl p-6 hover:border-amber-400 transition-all duration-300 bg-gradient-to-r from-amber-50 to-orange-50"
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-amber-900 mb-2">{book.title}</h3>
                      <p className="text-amber-600 font-medium mb-3">by {book.author}</p>
                      <div className="flex gap-2 flex-wrap">
                        {book.genre && (
                          <span className="inline-block bg-amber-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                            {book.genre}
                          </span>
                        )}
                        {book.year && (
                          <span className="inline-block bg-orange-500 text-white text-sm font-semibold px-4 py-1 rounded-full">
                            {book.year}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Link
                        to={`/edit-book/${book._id}`}
                        className="bg-amber-600 text-white px-6 py-2 rounded-full hover:bg-amber-700 font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => handleDelete(book._id)}
                        className="bg-red-600 text-white px-6 py-2 rounded-full hover:bg-red-700 font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* User's Reviews Section */}
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-amber-200 mt-10">
          <h2 className="text-3xl font-bold text-amber-900 mb-8 flex items-center">
            <svg className="w-8 h-8 mr-3 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
            </svg>
            My Reviews ({myReviews.length})
          </h2>
          
          {loading ? (
            <div className="text-center py-10">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
            </div>
          ) : myReviews.length === 0 ? (
            <div className="text-center py-16 bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl">
              <svg className="w-20 h-20 mx-auto text-amber-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
              </svg>
              <p className="text-xl text-gray-700 mb-2 font-semibold">No reviews yet</p>
              <p className="text-gray-600">Start reviewing books to share your thoughts!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myReviews.map((review) => (
                <div key={review._id} className="bg-gradient-to-br from-white to-amber-50 rounded-2xl p-6 border-2 border-amber-200 hover:border-amber-300 transition-all duration-300 hover:shadow-lg">
                  <div className="flex justify-between items-start mb-3">
                    <Link 
                      to={`/book/${review.bookId}`}
                      className="text-xl font-bold text-amber-900 hover:text-amber-700 transition-colors"
                    >
                      📖 {review.bookTitle}
                    </Link>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center bg-amber-100 px-3 py-1 rounded-full">
                        <span className="text-amber-600 font-bold mr-1">{review.rating}</span>
                        <svg className="w-5 h-5 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  {review.reviewText && (
                    <p className="text-gray-700 leading-relaxed mb-3">{review.reviewText}</p>
                  )}
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                    <Link 
                      to={`/book/${review.bookId}`}
                      className="text-amber-600 hover:text-amber-700 font-semibold hover:underline"
                    >
                      View Book →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile
