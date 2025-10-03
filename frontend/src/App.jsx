import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import BookDetails from './pages/BookDetails'
import AddEditBook from './pages/AddEditBook'

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/add-book" element={<AddEditBook />} />
            <Route path="/edit-book/:id" element={<AddEditBook />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
