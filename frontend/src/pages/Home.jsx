import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import api from '../api/axios'
import BookCard from '../components/BookCard'

const Home = () => {
  const { user } = useAuth()
  const [books, setBooks] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [search, setSearch] = useState('')
  const [genre, setGenre] = useState('')

  useEffect(() => {
    fetchBooks()
  }, [page, search, genre])

  const fetchBooks = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({ page })
      if (search) params.append('q', search)
      if (genre) params.append('genre', genre)
      
      const { data } = await api.get(`/books?${params}`)
      setBooks(data.books)
      setTotalPages(data.pages)
    } catch (error) {
      console.error('Error fetching books:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setPage(1)
  }

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <section className="relative min-h-[70vh] bg-gradient-to-br from-amber-900 via-orange-800 to-amber-700 flex items-center justify-center px-4 text-white overflow-hidden">
        {/* Decorative Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto text-center w-full px-4">
          <div className="mb-6">
            <svg className="w-20 h-20 mx-auto text-amber-200 animate-bounce" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-2xl animate-fade-in">
            Discover Your Next Great Read
          </h1>
          <p className="text-xl md:text-2xl mb-10 opacity-95 max-w-3xl mx-auto leading-relaxed">
            Explore thousands of book reviews from our passionate community
          </p>
          
          {/* Auth Call-to-Action for Non-Logged-In Users */}
          {!user && (
            <div className="mb-10 flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                to="/login"
                className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border-2 border-white px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-white hover:bg-amber-50 text-amber-900 px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
                Sign Up Free
              </Link>
            </div>
          )}
          
          {/* Enhanced Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-3xl mx-auto mb-8">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full text-gray-900 text-lg font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/50 transition-all duration-300 placeholder:text-gray-500"
            />
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value)
                setPage(1)
              }}
              className="px-6 py-4 rounded-full text-gray-900 text-lg font-medium shadow-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/50 transition-all duration-300"
            >
              <option value="">All Genres</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Romance">Romance</option>
              <option value="Thriller">Thriller</option>
            </select>
            <button
              type="submit"
              className="bg-white hover:bg-amber-100 text-amber-900 px-10 py-4 rounded-full font-bold text-lg shadow-2xl transition-all duration-300 hover:scale-105 whitespace-nowrap"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Books Grid Section */}
      <section className="relative py-16 px-4 min-h-screen container mx-auto">
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
            <p className="mt-4 text-amber-800 text-lg font-medium">Loading your library...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-20">
            <svg className="w-24 h-24 mx-auto text-amber-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <p className="text-2xl text-gray-700 mb-6 font-semibold">No books found yet.</p>
            {user ? (
              <Link
                to="/add-book"
                className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105"
              >
                Add Your First Book
              </Link>
            ) : (
              <div className="space-y-4">
                <p className="text-gray-600 mb-4">Sign up to start adding books and reviews!</p>
                <div className="flex gap-4 justify-center">
                  <Link
                    to="/login"
                    className="inline-block bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    Sign Up
                  </Link>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-bold text-amber-900 mb-10 text-center">Featured Books</h2>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-4 items-center">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                  >
                    Previous
                  </button>
                  <span className="px-6 py-3 text-amber-900 font-bold bg-white rounded-full shadow-md text-lg">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-8 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 font-semibold shadow-lg hover:shadow-xl hover:scale-105 disabled:hover:scale-100"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </section>
    </>
  )
}

export default Home