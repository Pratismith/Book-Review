import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import api from '../api/axios'

const Profile = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [myBooks, setMyBooks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }
    fetchMyBooks()
  }, [user, navigate])

  const fetchMyBooks = async () => {
    try {
      const { data } = await api.get('/books')
      const userBooks = data.books.filter(
        (book) => book.addedBy?._id === user._id
      )
      setMyBooks(userBooks)
    } catch (error) {
      console.error('Error fetching books:', error)
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
    <div>
      <div className="bg-white rounded-lg shadow-md p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">My Profile</h1>
        <div className="space-y-2">
          <p className="text-gray-700">
            <span className="font-semibold">Name:</span> {user.name}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">My Books</h2>
        
        {loading ? (
          <p>Loading...</p>
        ) : myBooks.length === 0 ? (
          <p className="text-gray-500">You haven't added any books yet.</p>
        ) : (
          <div className="space-y-4">
            {myBooks.map((book) => (
              <div
                key={book._id}
                className="border border-gray-200 rounded-lg p-4 flex justify-between items-start"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{book.title}</h3>
                  <p className="text-gray-600">by {book.author}</p>
                  {book.genre && (
                    <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mt-2">
                      {book.genre}
                    </span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Link
                    to={`/edit-book/${book._id}`}
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Profile
