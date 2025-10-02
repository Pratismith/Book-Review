# Book Review Application

## Overview
A full-stack book review application built with Node.js/Express backend and React frontend. Users can browse books, add reviews with ratings, and manage their book collection.

## Project Structure
```
/
├── backend/          # Node.js/Express API server
│   ├── config/       # Database configuration
│   ├── controllers/  # Route handlers (auth, books, reviews)
│   ├── middlewares/  # Authentication middleware
│   ├── models/       # Mongoose models (User, Book, Review)
│   ├── routes/       # API routes
│   ├── server.js     # Main server file
│   └── .env          # Environment variables (MongoDB URI, JWT secret)
│
└── frontend/         # React application with Vite
    ├── src/
    │   ├── api/      # Axios configuration
    │   ├── components/  # Reusable components (Navbar, BookCard)
    │   ├── context/  # Auth context for state management
    │   ├── pages/    # Page components
    │   ├── App.jsx   # Main app component
    │   └── index.jsx # Entry point
    ├── index.html
    └── vite.config.js
```

## Features
- **User Authentication**: Sign up and login with JWT tokens
- **Book Management**: Add, edit, and delete books (authenticated users only)
- **Book Discovery**: Browse books with pagination, search by title/author, filter by genre
- **Review System**: Rate books (1-5 stars) and write reviews
- **Responsive UI**: Built with Tailwind CSS

## Tech Stack
### Backend
- Node.js & Express
- MongoDB (Mongoose)
- JWT authentication
- bcrypt for password hashing

### Frontend
- React 18
- React Router for navigation
- Axios for API calls
- Tailwind CSS for styling
- Vite for build tooling

## Configuration
### Backend (Port 3001)
- Runs on `localhost:3001`
- Connects to MongoDB Atlas
- Environment variables in `/backend/.env`

### Frontend (Port 5000)
- Runs on `0.0.0.0:5000`
- Configured to accept all hosts for Replit proxy
- API calls route to `localhost:3001` in development

## API Endpoints
### Authentication
- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user

### Books
- `GET /api/books` - List books (with pagination, search, filter)
- `GET /api/books/:id` - Get book details with reviews
- `POST /api/books` - Add book (authenticated)
- `PUT /api/books/:id` - Update book (authenticated, owner only)
- `DELETE /api/books/:id` - Delete book (authenticated, owner only)

### Reviews
- `POST /api/reviews/:bookId` - Add review (authenticated)
- `GET /api/reviews/:bookId` - Get reviews for book
- `PUT /api/reviews/:id` - Update review (authenticated, owner only)
- `DELETE /api/reviews/:id` - Delete review (authenticated, owner only)

## Setup Notes
- Frontend workflow runs on port 5000 (user-facing)
- Backend must be started separately on port 3001
- MongoDB connection uses existing Atlas cluster from .env file
- All host verification bypassed for Replit proxy compatibility

## Recent Changes (Oct 2, 2025)
- Imported from GitHub and set up in Replit environment
- Built complete React frontend from scratch (all files were empty on import)
- Configured Vite with proper host settings (0.0.0.0:5000, allowedHosts: true)
- Fixed backend routes to use correct middleware path (`middlewares/` not `middleware/`)
- Corrected controller function names to match route definitions
- Completed incomplete reviewController.js file
- Updated MongoDB connection to remove deprecated options
- Created comprehensive React application with all pages and components
- Set up Tailwind CSS with proper configuration
