# BookNest - Book Review Application

## Overview

BookNest is a full-stack MERN (MongoDB, Express, React, Node.js) book review application that enables users to discover books, write reviews, and manage their personal book collections. The application features a modern UI with warm amber/brown aesthetics, JWT-based authentication, and a comprehensive book and review management system.

**Latest Update (October 2025):** Fully configured for production deployment on Netlify (frontend) and Railway (backend) with proper CORS, environment variables, and build configurations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Application Structure

The application follows a monorepo structure with separate backend and frontend directories:

- **Backend**: Node.js/Express REST API server
- **Frontend**: React SPA with Vite build tooling
- **Database**: MongoDB with Mongoose ODM

### Backend Architecture

**Framework**: Express.js server with RESTful API design

**Authentication & Authorization**:
- JWT (JSON Web Tokens) for stateless authentication
- bcrypt.js for password hashing (salt rounds: 10)
- Auth middleware (`protect`) validates tokens and attaches user to request
- Token expiration: 7 days (configurable via JWT_EXPIRES_IN)

**Data Models** (Mongoose schemas):
- **User**: name, email (unique), hashed password, profileImage, timestamps
- **Book**: title, author, description, genre, year, coverImage, addedBy (user reference), timestamps
- **Review**: bookId, userId, rating (1-5), reviewText, timestamps

**API Route Structure**:
- `/api/auth` - Authentication (signup, login)
- `/api/books` - Book CRUD operations (add, get, update, delete, search/filter, pagination)
- `/api/reviews` - Review operations (add, update, delete, get by book)

**File Upload Handling**:
- Multer middleware for image uploads
- Destination: `uploads/books/`
- Supported formats: jpeg, jpg, png, gif, webp
- File size limit: 5MB
- Naming convention: `book-{timestamp}-{random}.{ext}`

**Authorization Rules**:
- Only book creators can edit/delete their books
- Only review authors can edit/delete their reviews
- All authenticated users can add books and reviews

### Frontend Architecture

**Framework**: React 18 with functional components and hooks

**Routing**: React Router v6 for client-side navigation

**State Management**:
- Context API for authentication state (AuthContext)
- localStorage for token persistence
- Component-level state for UI management

**API Communication**:
- Axios with interceptors for centralized token attachment
- Base URL configuration via environment variables
- Development proxy to backend (configured in vite.config.js)

**Styling**: Tailwind CSS utility-first framework with custom animations

**Key Pages**:
- Home (book browsing with search/filter/pagination)
- Book Details (with reviews)
- Add/Edit Book
- User Profile (my books, my reviews)
- Login/Signup

**Features**:
- Protected routes (redirect to login if unauthenticated)
- Dynamic book cover images (Unsplash integration)
- Responsive design (mobile-first approach)
- Glass-morphism card effects

### Development & Deployment Strategy

**Build Process**:
- Root package.json orchestrates backend and frontend builds
- Frontend builds to `frontend/dist/`
- Production: Backend serves frontend static files

**Environment Configuration**:
- Backend: dotenv for environment variables (PORT, MONGO_URI, JWT_SECRET, FRONTEND_URL, NODE_ENV)
- Frontend: Vite environment variables (VITE_API_URL)
- Development: Uses Vite proxy to route `/api` to `localhost:3001`
- Production: Frontend makes direct API calls to Railway backend URL

**CORS Configuration**:
- Development: Allows localhost, Replit domains, and proxy requests
- Production: Restricted to FRONTEND_URL from environment (Netlify domain)
- Credentials enabled for JWT authentication
- Supports preflight OPTIONS requests

**Deployment Targets**:
- Frontend: Netlify (static hosting with SPA routing via `netlify.toml`)
- Backend: Railway (Node.js service with `railway.json` config)
- Database: MongoDB Atlas (cloud-hosted with IP whitelist)

**Development Tools**:
- Vite dev server with HMR (port 5000) + proxy for API requests
- Backend runs on port 3001 in development
- start.sh script runs both frontend and backend concurrently
- Nodemon for backend hot-reload

**Deployment Files**:
- `railway.json` - Railway backend configuration
- `netlify.toml` - Netlify frontend configuration
- `frontend/.env.production` - Production API URL
- `backend/.env.example` - Environment variable template
- `DEPLOYMENT_GUIDE.md` - Complete deployment instructions

## External Dependencies

### Database
- **MongoDB Atlas**: Cloud-hosted NoSQL database
- Connection string stored in `MONGO_URI` environment variable
- Database name: `bookReview`

### Authentication
- **JWT (jsonwebtoken)**: Token generation and validation
- Secret key stored in `JWT_SECRET` environment variable

### Third-Party Services
- **Unsplash**: Dynamic book cover images (frontend integration)

### Key NPM Packages

**Backend**:
- express: Web framework
- mongoose: MongoDB ODM
- bcryptjs: Password hashing
- jsonwebtoken: JWT authentication
- cors: Cross-origin request handling
- dotenv: Environment variable management
- multer: File upload handling

**Frontend**:
- react & react-dom: UI library
- react-router-dom: Client-side routing
- axios: HTTP client
- tailwindcss: CSS framework
- vite: Build tool and dev server

### Hosting Services
- **Netlify**: Frontend static hosting (free tier)
- **Railway**: Backend API hosting (free tier)
- **MongoDB Atlas**: Database hosting (M0 free cluster)