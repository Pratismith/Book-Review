import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import api from '../api/axios'

const AddEditBook = () => {
  const { id } = useParams()
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    genre: '',
    year: '',
  })

  useEffect(() => {
    if (!user) {
      navigate('/login')
      return
    }

    if (id) {
      fetchBook()
    }
  }, [id, user, navigate])

  const fetchBook = async () => {
    try {
      const { data } = await api.get(`/books/${id}`)
      if (data.book.addedBy._id !== user._id) {
        alert('You can only edit your own books')
        navigate('/')
        return
      }
      setFormData({
        title: data.book.title || '',
        author: data.book.author || '',
        description: data.book.description || '',
        genre: data.book.genre || '',
        year: data.book.year || '',
      })
    } catch (error) {
      console.error('Error fetching book:', error)
      navigate('/')
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      if (id) {
        await api.put(`/books/${id}`, formData)
      } else {
        await api.post('/books', formData)
      }
      navigate('/profile')
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to save book')
    } finally {
      setLoading(false)
    }
  }

  if (!user) return null

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-10 border border-amber-200">
          <div className="text-center mb-8">
            <div className="inline-block p-4 bg-amber-100 rounded-full mb-4">
              <svg className="w-12 h-12 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-amber-900 mb-2">
              {id ? 'Edit Book' : 'Add New Book'}
            </h1>
            <p className="text-gray-600">
              {id ? 'Update the book information below' : 'Share a new book with the community'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-6 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all duration-300 text-gray-900"
                placeholder="Enter book title"
              />
            </div>

            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Author <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
                className="w-full px-6 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all duration-300 text-gray-900"
                placeholder="Enter author name"
              />
            </div>

            <div>
              <label className="block text-amber-900 font-semibold mb-2">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="5"
                className="w-full px-6 py-4 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all duration-300 text-gray-900"
                placeholder="Brief description of the book"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-amber-900 font-semibold mb-2">Genre</label>
                <select
                  name="genre"
                  value={formData.genre}
                  onChange={handleChange}
                  className="w-full px-6 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all duration-300 text-gray-900"
                >
                  <option value="">Select a genre</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Non-Fiction">Non-Fiction</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Sci-Fi">Sci-Fi</option>
                  <option value="Romance">Romance</option>
                  <option value="Thriller">Thriller</option>
                </select>
              </div>

              <div>
                <label className="block text-amber-900 font-semibold mb-2">Publication Year</label>
                <input
                  type="number"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                  min="1000"
                  max="2100"
                  className="w-full px-6 py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-amber-400/30 focus:border-amber-500 transition-all duration-300 text-gray-900"
                  placeholder="e.g., 2023"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-amber-600 to-orange-600 text-white py-4 rounded-xl font-bold text-lg hover:from-amber-700 hover:to-orange-700 disabled:from-gray-400 disabled:to-gray-500 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
              >
                {loading ? 'Saving...' : id ? 'Update Book' : 'Add Book'}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 bg-gray-200 text-gray-700 py-4 rounded-xl font-bold text-lg hover:bg-gray-300 transition-all duration-300 shadow-lg"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEditBook
