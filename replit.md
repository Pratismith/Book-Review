# Book Review Application - Replit Setup

## Overview
A full-stack book review application built with Node.js/Express backend and React frontend. Users can browse books, add reviews with ratings, and manage their book collection.

## Current Status
- **Last Updated**: October 3, 2025
- **Frontend**: ✅ Running on port 5000 (React + Vite)
- **Backend**: ✅ Running on port 3001 (Node.js + Express)
- **Database**: ⚠️ MongoDB Atlas (requires IP whitelisting)

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
├── frontend/         # React application with Vite
│   ├── src/
│   │   ├── api/      # Axios configuration
│   │   ├── components/  # Reusable components (Navbar, BookCard)
│   │   ├── context/  # Auth context for state management
│   │   ├── pages/    # Page components
│   │   ├── App.jsx   # Main app component
│   │   └── index.jsx # Entry point
│   ├── index.html
│   └── vite.config.js
│
└── start.sh          # Startup script for both frontend & backend
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
- API calls route to `localhost:3001` in development
- Vite configured for Replit proxy compatibility

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

## Important Setup Notes

### MongoDB Atlas Connection
The application uses MongoDB Atlas for the database. **Important**: You need to whitelist Replit's IP address in your MongoDB Atlas cluster to allow connections.

**To whitelist Replit's IP:**
1. Go to your MongoDB Atlas dashboard
2. Navigate to Network Access
3. Add IP Address: `0.0.0.0/0` (allow from anywhere) OR add Replit's specific IP range
4. Save changes

**Current MongoDB URI** (from backend/.env):
- Database: `bookReview`
- Cluster: `cluster0.ak3ooy7.mongodb.net`

### Running the Application
The application uses a combined startup script (`start.sh`) that runs both backend and frontend:
- Backend starts on `localhost:3001`
- Frontend starts on `0.0.0.0:5000`

The workflow "App" automatically starts both services.

### Environment Variables
Located in `backend/.env`:
- `PORT=3001` - Backend server port
- `MONGO_URI` - MongoDB connection string
- `JWT_SECRET` - Secret key for JWT token generation

## Recent Changes
- **Oct 3, 2025**: UI Upgrade & Authentication Enhancements
  - **Modern Design System**: Completely redesigned UI with warm amber/brown color palette
  - **Visual Enhancements**: Added book cover images, gradients, shadows, and smooth animations
  - **Authentication UX**: Added prominent auth prompts throughout the app
    - Homepage hero section: Login/Signup buttons for non-logged-in users
    - BookDetails page: Auth prompts for review submissions
    - Smart conditional rendering based on user login status
  - **Cache Control**: Added no-cache headers to Vite config for better preview updates
  - **Comprehensive README**: Created detailed documentation with setup, troubleshooting, and customization guides
  
- **Oct 3, 2025**: Initial Replit setup completed
  - Installed Node.js 20 and all dependencies
  - Fixed project structure (removed duplicate frontend files from backend/middlewares/)
  - Configured Vite for Replit proxy compatibility (HMR on port 443)
  - Created combined startup script for backend + frontend
  - Set up workflow on port 5000
  - Identified MongoDB Atlas IP whitelisting requirement

## Known Issues
1. **MongoDB Connection**: Requires IP whitelisting in MongoDB Atlas dashboard
   - Error: "Could not connect to any servers in your MongoDB Atlas cluster"
   - Solution: Whitelist Replit's IP in MongoDB Atlas Network Access settings

## Deployment Configuration
- **Type**: VM (Always running, maintains state)
- **Build**: Compiles frontend with `npm run build` in frontend directory
- **Run**: Starts backend with `NODE_ENV=production node server.js`
- **Production Port**: 5000 (backend serves both API and frontend static files)
- **Development Ports**: Backend on 3001, Frontend on 5000

### Production Behavior
In production mode:
- Backend serves on `0.0.0.0:5000`
- Frontend static files are served from `frontend/dist`
- API endpoints are available at `/api/*`
- All other routes serve the React SPA
- MongoDB connection needs to be accessible from deployment environment
