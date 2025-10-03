import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900 text-white shadow-2xl sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2 text-2xl font-bold hover:scale-105 transition-transform duration-300">
            <svg className="w-8 h-8 text-amber-300" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
            </svg>
            <span className="bg-gradient-to-r from-amber-200 to-yellow-200 bg-clip-text text-transparent">BookNest</span>
          </Link>
          <div className="flex items-center space-x-6">
            <Link to="/" className="hover:text-amber-200 transition-colors duration-200 font-medium">
              Home
            </Link>
            {user ? (
              <>
                <Link to="/add-book" className="hover:text-amber-200 transition-colors duration-200 font-medium">
                  Add Book
                </Link>
                <Link to="/profile" className="hover:text-amber-200 transition-colors duration-200 font-medium">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-amber-600 hover:bg-amber-700 px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-amber-200 transition-colors duration-200 font-medium">
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="bg-amber-500 hover:bg-amber-600 text-gray-900 px-6 py-2 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
