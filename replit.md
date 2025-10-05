# BookNest - Book Review Application

## Overview

BookNest is a full-stack MERN (MongoDB, Express, React, Node.js) application that enables users to browse, review, and manage books. The platform features user authentication, book management with CRUD operations, a star-based review system, and search/filter capabilities. The application uses JWT for authentication, bcrypt for password security, and features a modern UI built with React and Tailwind CSS.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture (React + Vite)

**Problem**: Need a fast, modern development experience with hot module replacement and optimized production builds.

**Solution**: React 18 with Vite as the build tool, using client-side routing via React Router v6.

**Key Decisions**:
- **Vite over Create React App**: Faster development server with ESM-based HMR, optimized production builds
- **Tailwind CSS**: Utility-first styling for rapid UI development with consistent design tokens
- **Context API for Auth State**: Simple global state management for user authentication without external libraries
- **Axios with Interceptors**: Centralized HTTP client that automatically attaches JWT tokens to requests

**Pros**: Fast development, minimal configuration, excellent DX
**Cons**: Less opinionated than CRA, requires manual configuration for some features

### Backend Architecture (Express + MongoDB)

**Problem**: Need a scalable REST API with user authentication and data persistence.

**Solution**: Express.js server with MongoDB (Mongoose ODM) and JWT-based authentication.

**Key Decisions**:
- **Mongoose Models**: Three core models (User, Book, Review) with relationships via ObjectId references
- **JWT Authentication**: Stateless auth using Bearer tokens stored in localStorage
- **Bcrypt Password Hashing**: Salt rounds of 10 for secure password storage
- **Middleware Pattern**: Reusable `protect` middleware for route authentication
- **Controller-Route Separation**: Clean separation of business logic (controllers) from routing (routes)
- **Multer for File Uploads**: Handles book cover image uploads with validation and size limits (5MB)

**Authentication Flow**:
1. User signs up → password hashed → JWT token generated
2. Token stored in client localStorage
3. Axios interceptor attaches token to protected requests
4. Backend middleware verifies token and attaches user to request

**Data Relationships**:
- Books reference Users (addedBy field) - only creators can edit/delete
- Reviews reference both Books and Users - ensures one review per user per book

### Database Schema

**Collections**:
- **Users**: name, email (unique), password (hashed), profileImage, timestamps
- **Books**: title, author, description, genre, year, coverImage, addedBy (User ref), timestamps
- **Reviews**: bookId (Book ref), userId (User ref), rating (1-5), reviewText, timestamps

**Indexing Strategy**: Unique index on User.email for fast lookups and duplicate prevention

### API Design

**RESTful Endpoints**:
- **Auth**: POST `/api/auth/signup`, POST `/api/auth/login`
- **Books**: GET/POST `/api/books`, GET/PUT/DELETE `/api/books/:id`, GET `/api/books/my-books`
- **Reviews**: POST `/api/reviews/:bookId`, GET `/api/reviews/:bookId`, PUT/DELETE `/api/reviews/:id`

**Pagination**: Backend implements limit/skip for 5 books per page
**Search/Filter**: Query params for title/author search and genre filtering

### CORS Configuration

**Problem**: Frontend and backend on different origins in development and production.

**Solution**: Dynamic CORS configuration that allows multiple origins.

**Allowed Origins**:
- Localhost ports (3000, 5000) for development
- Replit domains (.replit.dev) for cloud development
- Netlify domains (.netlify.app) for production
- Environment variable FRONTEND_URL for explicit configuration

**Pros**: Flexible for multiple deployment scenarios
**Cons**: Requires careful configuration to avoid security issues in production

### Deployment Architecture

**Current Strategy**: Separate frontend/backend deployment
- **Frontend**: Netlify (static hosting with SPA routing via _redirects)
- **Backend**: Railway (Node.js server)
- **Database**: MongoDB Atlas (cloud-hosted)

**Alternatives Considered**: 
- Monolithic deployment (Heroku/Render) - rejected for better scaling
- Vercel serverless functions - requires Express adapter

**Build Process**:
- Frontend: Vite build → dist folder → Netlify
- Backend: Direct deployment, Railway runs `node server.js`

## External Dependencies

### Third-Party Services

1. **MongoDB Atlas**
   - Cloud-hosted MongoDB database
   - Connection string: `mongodb+srv://...`
   - Used for persistent data storage
   - Free tier M0 cluster

2. **Unsplash API** (Implicit)
   - Dynamic book cover images via URL patterns
   - Used as placeholder/default images
   - No API key required for basic usage

### NPM Packages

**Backend**:
- **express** (^4.18.2): Web framework
- **mongoose** (^7.3.1): MongoDB ODM
- **jsonwebtoken** (^9.0.0): JWT generation/verification
- **bcryptjs** (^2.4.3): Password hashing
- **cors** (^2.8.5): Cross-origin resource sharing
- **dotenv** (^16.0.3): Environment variable management
- **multer** (^2.0.2): File upload handling
- **nodemon** (^3.1.10): Dev server with auto-restart

**Frontend**:
- **react** (^18.2.0): UI library
- **react-dom** (^18.2.0): React DOM rendering
- **react-router-dom** (^6.14.0): Client-side routing
- **axios** (^1.4.0): HTTP client
- **vite** (^6.3.6): Build tool and dev server
- **tailwindcss** (^3.3.2): Utility-first CSS framework
- **@vitejs/plugin-react** (^4.0.0): React support for Vite

### Environment Variables

**Backend** (.env):
- `PORT`: Server port (default 3001)
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT signing
- `NODE_ENV`: Environment (development/production)
- `FRONTEND_URL`: Frontend origin for CORS

**Frontend** (via import.meta.env):
- `VITE_API_URL`: Backend API URL for production builds

### Deployment Platforms

1. **Netlify** (Frontend)
   - Static site hosting
   - Automatic builds from Git
   - SPA routing via _redirects file
   - Free tier with custom domains

2. **Railway** (Backend)
   - Node.js hosting
   - Automatic deployments from Git
   - Environment variable management
   - Free tier with usage limits

3. **GitHub**
   - Version control and source code hosting
   - Integration with Netlify and Railway for CI/CD