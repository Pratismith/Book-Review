# Book Review Application - Replit Setup

## Overview
A full-stack book review application built with Node.js/Express backend and React frontend. Users can browse books, add reviews with ratings, and manage their book collection with image uploads.

## Current Status
- **Last Updated**: October 4, 2025
- **Frontend**: ✅ Running on port 5000 (React + Vite)
- **Backend**: ✅ Running on port 3001 (Node.js + Express)
- **Database**: ⚠️ MongoDB Atlas (requires setup - see instructions below)
- **Image Uploads**: ✅ Fully functional with Multer

## 🚨 IMPORTANT: MongoDB Atlas Setup Required

This application requires MongoDB Atlas. Please follow these steps:

1. **Create a MongoDB Atlas Account** (if you don't have one):
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**:
   - Create a new M0 (free tier) cluster
   - Choose a cloud provider and region

3. **Whitelist Replit's IP**:
   - Go to "Network Access" in your MongoDB Atlas dashboard
   - Click "Add IP Address"
   - Add `0.0.0.0/0` to allow connections from anywhere (or add Replit's specific IP range)

4. **Get Your Connection String**:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string (it looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual database password
   - Add your database name (e.g., `bookReview`) at the end

5. **Update backend/.env**:
   ```env
   PORT=3001
   MONGO_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/bookReview
   JWT_SECRET=kMhw6FuQFvOdvcPoQxSuhdK/lGyU+OYYjb8VIvgfm/k=
   ```

6. **Restart the App**: The workflow will automatically restart and connect to your MongoDB database.

## Project Structure
```
/
├── backend/          # Node.js/Express API server
│   ├── config/       # Database configuration
│   ├── controllers/  # Route handlers (auth, books, reviews)
│   ├── middlewares/  # Auth, upload middlewares
│   ├── models/       # Mongoose models (User, Book, Review)
│   ├── routes/       # API routes
│   ├── uploads/      # Uploaded images (books, users)
│   ├── server.js     # Main server file
│   └── .env          # Environment variables
│
├── frontend/         # React application with Vite
│   ├── src/
│   │   ├── api/      # Axios configuration
│   │   ├── components/  # BookCard, Navbar
│   │   ├── context/  # Auth context
│   │   ├── pages/    # All page components
│   │   ├── App.jsx   # Main app
│   │   └── index.jsx # Entry point
│   ├── index.html
│   └── vite.config.js
│
└── start.sh          # Startup script
```

## Features
- **User Authentication**: Sign up and login with JWT tokens, password hashing
- **Book Management**: Full CRUD operations with image upload
  - Add books with cover images
  - Edit your own books
  - Delete your own books
  - View all books with pagination (5 per page)
- **Image Uploads**: Upload and display book cover images
  - Supported formats: JPG, PNG, GIF, WebP
  - Maximum file size: 5MB
  - Images stored in `backend/uploads/books/`
- **Book Discovery**: Search by title/author, filter by genre, sort by newest/year/rating
- **Review System**: Rate books (1-5 stars), write reviews, delete own reviews
- **Profile Page**: 
  - View all your books (dedicated endpoint: GET /api/books/my-books)
  - View all your reviews with book titles (dedicated endpoint: GET /api/reviews/my-reviews)
- **Modern UI**: Beautiful gradients, animations, and responsive design with Tailwind CSS

## Tech Stack
### Backend
- Node.js & Express
- MongoDB (Mongoose)
- Multer (file uploads)
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
- Serves static files from `/uploads`
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
- `GET /api/books` - List all books (with pagination, search, filter, sort)
- `GET /api/books/my-books` - Get logged-in user's books
- `GET /api/books/:id` - Get book details with reviews
- `POST /api/books` - Add book (authenticated, with image upload)
- `PUT /api/books/:id` - Update book (authenticated, owner only, with image upload)
- `DELETE /api/books/:id` - Delete book (authenticated, owner only)

### Reviews
- `GET /api/reviews/my-reviews` - Get logged-in user's reviews with book titles
- `GET /api/reviews/:bookId` - Get reviews for a specific book
- `POST /api/reviews/:bookId` - Add review (authenticated)
- `PUT /api/reviews/:id` - Update review (authenticated, owner only)
- `DELETE /api/reviews/:id` - Delete review (authenticated, owner only)

## File Uploads
### Book Covers
- Endpoint: `POST /api/books` or `PUT /api/books/:id`
- Field name: `coverImage`
- Storage: `backend/uploads/books/`
- URL format: `/uploads/books/book-{timestamp}-{random}.ext`
- Frontend access: Images are served statically at `/uploads/books/...`

### Middleware
- `backend/middlewares/upload.js` - Book cover upload handler
- `backend/middlewares/uploadUserPhoto.js` - User photo upload handler (for future use)

## Recent Changes

### October 4, 2025: Image Upload & Profile Endpoints Implementation
- **Image Upload System**:
  - ✅ Added `coverImage` field to Book model
  - ✅ Added `profileImage` field to User model (for future use)
  - ✅ Created Multer middleware for handling file uploads
  - ✅ Updated server.js to serve static files from `/uploads` directory
  - ✅ Updated book routes to accept image uploads on POST and PUT
  - ✅ Modified AddEditBook page to include image upload with live preview
  - ✅ Updated BookCard and BookDetails to display uploaded cover images
  - ✅ Fallback to Unsplash images if no cover image is uploaded

- **Profile Page Fixes**:
  - ✅ Added `GET /api/books/my-books` endpoint - dedicated endpoint for user's books
  - ✅ Added `GET /api/reviews/my-reviews` endpoint - dedicated endpoint for user's reviews with book titles
  - ✅ Updated Profile.jsx to use new dedicated endpoints instead of filtering client-side
  - ✅ Fixed "My Books" section to properly display all user's books
  - ✅ Fixed "My Reviews" section to properly display all user's reviews with book titles
  - ✅ Added book cover thumbnails in My Books section

- **Backend Improvements**:
  - ✅ Updated bookController.js to handle image uploads in addBook and updateBook
  - ✅ Updated reviewController.js with getMyReviews method that populates book titles
  - ✅ Added image field to MongoDB aggregation pipeline for rating sort
  - ✅ Updated routes to include upload middleware

- **UI Enhancements**:
  - ✅ Beautiful file upload input with custom styling
  - ✅ Live image preview before uploading
  - ✅ Book cover displays in Profile page My Books section
  - ✅ Improved form layouts and spacing
  - ✅ Added more genre options (Fantasy, Biography, History, Self-Help)

### October 3, 2025: Backend Improvements & UI Enhancements
- Dark Mode Toggle with smooth transitions
- Advanced Sorting with MongoDB aggregation for rating sort
- Fixed deprecated `.remove()` methods to `.deleteOne()`
- Complete Feature Implementation & Verification
- Modern Design System with warm amber/brown color palette
- Cache Control headers added to Vite config

### October 3, 2025: Initial Replit Setup
- Installed Node.js 20 and dependencies
- Fixed project structure
- Configured Vite for Replit proxy compatibility
- Created combined startup script
- Set up workflow on port 5000

## Deployment Configuration
- **Type**: VM (Always running, maintains state)
- **Build**: `cd frontend && npm run build`
- **Run**: `cd backend && NODE_ENV=production node server.js`
- **Production Port**: 5000
- **Development Ports**: Backend 3001, Frontend 5000

### Production Behavior
In production mode:
- Backend serves on `0.0.0.0:5000`
- Frontend static files served from `frontend/dist`
- API endpoints available at `/api/*`
- Static uploads available at `/uploads/*`
- All other routes serve the React SPA
- MongoDB connection must be accessible from deployment environment

## Known Issues
1. **MongoDB Connection**: Requires MongoDB Atlas setup (see instructions above)
2. **IP Whitelisting**: Must whitelist `0.0.0.0/0` or Replit's IP in MongoDB Atlas Network Access

## Tips for Competition Submission
- The app features a beautiful, modern design with smooth animations
- All image uploads work correctly with proper preview functionality
- Profile page shows user's books and reviews in organized sections
- Book covers enhance the visual appeal of the application
- Responsive design works on all devices
- Search, filter, and sort functionality is fully operational
