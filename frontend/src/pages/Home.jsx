// import { useState, useEffect } from 'react'
// import api from '../api/axios'
// import BookCard from '../components/BookCard'

// const Home = () => {
//   const [books, setBooks] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [page, setPage] = useState(1)
//   const [totalPages, setTotalPages] = useState(1)
//   const [search, setSearch] = useState('')
//   const [genre, setGenre] = useState('')

//   useEffect(() => {
//     fetchBooks()
//   }, [page, search, genre])

//   const fetchBooks = async () => {
//     try {
//       setLoading(true)
//       const params = new URLSearchParams({ page })
//       if (search) params.append('q', search)
//       if (genre) params.append('genre', genre)
      
//       const { data } = await api.get(`/books?${params}`)
//       setBooks(data.books)
//       setTotalPages(data.pages)
//     } catch (error) {
//       console.error('Error fetching books:', error)
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleSearch = (e) => {
//     e.preventDefault()
//     setPage(1)
//   }

//   return (
//     <div>
//       <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-800 mb-4">Book Collection</h1>
        
//         <form onSubmit={handleSearch} className="flex gap-4 mb-4">
//           <input
//             type="text"
//             placeholder="Search by title or author..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           />
//           <select
//             value={genre}
//             onChange={(e) => {
//               setGenre(e.target.value)
//               setPage(1)
//             }}
//             className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">All Genres</option>
//             <option value="Fiction">Fiction</option>
//             <option value="Non-Fiction">Non-Fiction</option>
//             <option value="Mystery">Mystery</option>
//             <option value="Sci-Fi">Sci-Fi</option>
//             <option value="Romance">Romance</option>
//             <option value="Thriller">Thriller</option>
//           </select>
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           >
//             Search
//           </button>
//         </form>
//       </div>

//       {loading ? (
//         <div className="text-center py-8">Loading...</div>
//       ) : books.length === 0 ? (
//         <div className="text-center py-8 text-gray-500">
//           No books found. Be the first to add one!
//         </div>
//       ) : (
//         <>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
//             {books.map((book) => (
//               <BookCard key={book._id} book={book} />
//             ))}
//           </div>

//           {totalPages > 1 && (
//             <div className="flex justify-center gap-2">
//               <button
//                 onClick={() => setPage((p) => Math.max(1, p - 1))}
//                 disabled={page === 1}
//                 className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
//               >
//                 Previous
//               </button>
//               <span className="px-4 py-2">
//                 Page {page} of {totalPages}
//               </span>
//               <button
//                 onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
//                 disabled={page === totalPages}
//                 className="px-4 py-2 bg-blue-600 text-white rounded disabled:bg-gray-300"
//               >
//                 Next
//               </button>
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   )
// }

// export default Home

import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../api/axios'
import BookCard from '../components/BookCard'
// Use direct Unsplash URL for BG (fast, no assets folder needed); swap to local if preferred
const bookshelfBg = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?ixlib=rb-4.0.3&auto=format&fit=crop&w=2071&q=80'

const Home = () => {
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
      {/* Hero Section with Background */}
      <section 
        className="relative min-h-[60vh] bg-cover bg-fixed bg-center flex items-center justify-center px-4 text-white"
        style={{ backgroundImage: `url(${bookshelfBg})` }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center w-full px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 drop-shadow-2xl animate-fade-in">
            Book Haven
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-95 max-w-2xl mx-auto leading-relaxed drop-shadow-md">
            Discover captivating stories, share honest reviews, and connect with a community of passionate readers.
          </p>
          
          {/* Enhanced Search Form */}
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search by title or author..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-6 py-4 rounded-full text-black text-lg font-medium shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-400/50 transition-all duration-300"
            />
            <select
              value={genre}
              onChange={(e) => {
                setGenre(e.target.value)
                setPage(1)
              }}
              className="px-6 py-4 rounded-full text-black text-lg font-medium shadow-xl focus:outline-none focus:ring-4 focus:ring-amber-400/50 transition-all duration-300"
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
              className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-4 rounded-full font-bold text-lg shadow-xl transition-all duration-300 whitespace-nowrap"
            >
              Explore Books
            </button>
          </form>
          
          {/* Optional CTA if no books */}
          {books.length === 0 && !loading && (
            <Link
              to="/add-book"
              className="mt-6 inline-block bg-white hover:bg-gray-100 text-amber-600 px-8 py-3 rounded-full font-semibold text-lg shadow-xl transition-all duration-300"
            >
              Be the First to Add a Book!
            </Link>
          )}
        </div>
      </section>

      {/* Books Grid Section */}
      <section className="relative py-12 px-4 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        {loading ? (
          <div className="text-center py-16">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-amber-500"></div>
            <p className="mt-2 text-gray-600">Loading your library...</p>
          </div>
        ) : books.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-2xl mb-4">No books found yet.</p>
            <Link
              to="/add-book"
              className="bg-amber-500 hover:bg-amber-600 text-black px-8 py-3 rounded-full font-semibold transition-all duration-300"
            >
              Add Your First Book
            </Link>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {books.map((book) => (
                  <BookCard key={book._id} book={book} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
                  >
                    Previous
                  </button>
                  <span className="px-6 py-3 text-gray-700 font-medium bg-white rounded-full shadow-sm">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 font-semibold"
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