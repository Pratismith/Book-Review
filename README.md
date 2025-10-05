# 📚 BookNest - Modern Book Review Application

A beautiful, full-stack MERN (MongoDB, Express, React, Node.js) book review application with modern UI design, user authentication, and comprehensive book management features.

![BookNest](https://img.shields.io/badge/MERN-Stack-green) ![Status](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

## 📦 Deployment Optimization

This repository has been optimized for deployment on **Vercel** and **Firebase**. The following changes were made:

### ✅ Files Removed
- `netlify.toml` (root and frontend) - Netlify-specific configuration
- `frontend/_redirects` - Netlify redirect rules
- `backend/railway.json` - Railway deployment config
- `DEPLOYMENT_GUIDE.md` - Old Netlify/Railway deployment guide
- `RENDER_DEPLOYMENT.md` - Render deployment guide
- `book-review.md` - Duplicate documentation
- `FEATURES_VERIFICATION.md` - Internal verification file
- `start.sh` - Old startup script
- `attached_assets/` - Pasted text files

### 🔄 Files Modified
- `backend/server.js` - Added module.exports for serverless, Vercel detection
- `backend/server.js` - Updated CORS to support Vercel (.vercel.app) and Firebase (.firebaseapp.com, .web.app) domains
- `backend/package.json` - Simplified scripts (removed Heroku-specific build)

### ➕ Files Added
- `vercel.json` - Vercel deployment configuration
- `firebase.json` - Firebase hosting and functions config
- `.firebaserc` - Firebase project configuration
- `backend/api/index.js` - Serverless function entry point for Vercel
- `start-dev.sh` - Development startup script for Replit

## ✨ Features

### 🎨 Modern UI/UX
- **Beautiful Design**: Warm amber/brown color palette with gradient backgrounds
- **Responsive Layout**: Fully responsive design that works on all devices
- **Book Cover Images**: Dynamic book covers from Unsplash
- **Smooth Animations**: Hover effects, transitions, and loading states
- **Glass-morphism Cards**: Modern card designs with backdrop blur

### 🔐 Authentication & Security
- **JWT Authentication**: Secure user authentication with JSON Web Tokens
- **Protected Routes**: Route protection for authenticated users only
- **Password Hashing**: bcrypt.js for secure password storage
- **User Sessions**: Persistent login sessions

### 📖 Book Management
- **CRUD Operations**: Create, Read, Update, Delete books
- **Search & Filter**: Search by title/author, filter by genre
- **Pagination**: Efficient book browsing with pagination
- **User-specific Management**: Users can only edit/delete their own books

### ⭐ Review System
- **Star Ratings**: 1-5 star rating system
- **Text Reviews**: Detailed written reviews
- **Average Ratings**: Calculated average ratings for each book
- **Review Management**: Users can delete their own reviews

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - JSON Web Tokens for authentication
- **bcrypt.js** - Password hashing

### Frontend
- **React 18** - UI library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Next-generation frontend build tool

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd booknest
   ```

2. **Install Backend Dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd frontend
   npm install
   ```

4. **Configure Environment Variables**
   
   Create a `.env` file in the `backend` directory:
   ```env
   PORT=3001
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/bookReview
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5000
   ```

5. **Start the Application**

   **Development Mode (Separate Terminals)**
   
   Terminal 1 - Backend:
   ```bash
   cd backend
   npm run dev
   ```
   
   Terminal 2 - Frontend:
   ```bash
   cd frontend
   npm run dev
   ```

6. **Access the Application**
   - Frontend: http://localhost:5000
   - Backend API: http://localhost:3001

## 🌐 MongoDB Atlas Setup

### Important: IP Whitelisting Required

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to your cluster → Network Access
3. Click "Add IP Address"
4. Add `0.0.0.0/0` (allow from anywhere) for development/testing
5. For production, add your deployment platform's IP addresses
6. Save changes

**Note**: The application won't connect to MongoDB without proper IP whitelisting.

---

## 🚢 Deployment Guides

## 🔷 Deploy to Vercel

Vercel is recommended for its simplicity and excellent performance for MERN applications.

### Option 1: Monorepo Deployment (Recommended)

Deploy both frontend and backend from the same repository.

#### Step 1: Prepare Your Repository

The repository is already configured with `vercel.json`. Verify it exists in the root directory.

#### Step 2: Install Vercel CLI

```bash
npm install -g vercel
```

#### Step 3: Deploy Backend

1. Navigate to your project root:
   ```bash
   cd /path/to/booknest
   ```

2. Login to Vercel:
   ```bash
   vercel login
   ```

3. Deploy the backend:
   ```bash
   vercel --prod
   ```

4. During deployment, Vercel will ask configuration questions:
   - **Set up and deploy**: Yes
   - **Which scope**: Select your account
   - **Link to existing project**: No (first time) or Yes (redeployment)
   - **What's your project's name**: booknest-backend
   - **In which directory is your code located**: ./

5. Set environment variables via Vercel Dashboard or CLI:
   ```bash
   vercel env add MONGO_URI
   vercel env add JWT_SECRET
   vercel env add NODE_ENV
   ```
   
   Or via the Vercel Dashboard:
   - Go to your project → Settings → Environment Variables
   - Add:
     - `MONGO_URI`: Your MongoDB Atlas connection string
     - `JWT_SECRET`: Your secret key
     - `NODE_ENV`: `production`
     - `FRONTEND_URL`: Your frontend Vercel URL (after frontend deployment)

6. Redeploy after setting environment variables:
   ```bash
   vercel --prod
   ```

#### Step 4: Deploy Frontend

1. Update the API URL in your frontend. Create `.env.production` in the `frontend` directory:
   ```env
   VITE_API_URL=https://your-backend-url.vercel.app
   ```

2. The frontend will be automatically deployed as part of the monorepo configuration.

3. After deployment, update the backend's `FRONTEND_URL` environment variable with your frontend URL.

### Option 2: Separate Projects

Deploy frontend and backend as separate Vercel projects.

#### Backend Deployment:

1. Create a new Vercel project for the backend:
   ```bash
   cd backend
   vercel --prod
   ```

2. Configure environment variables in Vercel Dashboard

#### Frontend Deployment:

1. Create a new Vercel project for the frontend:
   ```bash
   cd frontend
   vercel --prod
   ```

2. Set the backend API URL:
   ```bash
   vercel env add VITE_API_URL
   # Enter your backend Vercel URL
   ```

### Vercel Deployment Checklist

- ✅ MongoDB Atlas allows connections from `0.0.0.0/0` or Vercel's IP ranges
- ✅ All environment variables are set in Vercel Dashboard
- ✅ `FRONTEND_URL` in backend matches your frontend deployment URL
- ✅ `VITE_API_URL` in frontend matches your backend deployment URL
- ✅ Test API endpoints: `https://your-backend.vercel.app/api/books`
- ✅ Verify CORS is working by signing up/logging in

### Common Vercel Issues

**Issue**: API routes return 404
- **Solution**: Verify `vercel.json` routes are configured correctly

**Issue**: CORS errors
- **Solution**: Add your Vercel frontend URL to `FRONTEND_URL` environment variable

**Issue**: Database connection fails
- **Solution**: Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`

---

## 🔥 Deploy to Firebase

Firebase provides hosting for the frontend and Cloud Functions for the backend.

### Prerequisites

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Enter project name (e.g., `booknest-app`)
4. Disable Google Analytics (optional)
5. Click "Create Project"

### Step 2: Initialize Firebase

1. From your project root:
   ```bash
   firebase init
   ```

2. Select features:
   - ☑️ Hosting
   - ☑️ Functions

3. Configuration:
   - **Use existing project**: Select your Firebase project
   - **What language**: JavaScript
   - **Use ESLint**: No
   - **Install dependencies**: Yes
   - **Public directory**: frontend/dist
   - **Single-page app**: Yes
   - **Set up automatic builds**: No
   - **Overwrite files**: No

### Step 3: Configure Functions

The project already has `firebase.json` configured. Verify your functions directory:

1. Copy backend code to functions:
   ```bash
   cp -r backend/* functions/
   ```

2. Update `functions/package.json` to include all backend dependencies

3. Install dependencies:
   ```bash
   cd functions
   npm install
   cd ..
   ```

### Step 4: Set Environment Variables

Firebase uses environment configuration for secrets:

```bash
firebase functions:config:set \
  mongodb.uri="your_mongodb_connection_string" \
  jwt.secret="your_jwt_secret" \
  app.frontend_url="https://your-project.web.app"
```

Update `backend/config/db.js` to use Firebase config:
```javascript
const functions = require('firebase-functions');
const mongoURI = functions.config().mongodb?.uri || process.env.MONGO_URI;
```

### Step 5: Build Frontend

```bash
cd frontend
npm run build
cd ..
```

### Step 6: Deploy

Deploy everything to Firebase:

```bash
firebase deploy
```

Or deploy separately:

```bash
# Deploy only hosting
firebase deploy --only hosting

# Deploy only functions
firebase deploy --only functions
```

### Step 7: Update CORS

After deployment, update the backend CORS configuration to include your Firebase URLs:
- `https://your-project.web.app`
- `https://your-project.firebaseapp.com`

The backend is already configured to accept Firebase domains.

### Firebase Deployment URLs

After deployment, you'll receive:
- **Hosting URL**: `https://your-project.web.app`
- **Functions URL**: `https://us-central1-your-project.cloudfunctions.net/api`

Update your frontend to use the Functions URL as the API endpoint.

### Firebase Deployment Checklist

- ✅ Firebase project created in Console
- ✅ Firebase CLI installed and logged in
- ✅ Backend code copied to functions directory
- ✅ Environment variables configured via `firebase functions:config:set`
- ✅ Frontend built (`npm run build`)
- ✅ MongoDB Atlas allows connections from Firebase Cloud Functions IPs
- ✅ CORS includes Firebase hosting domain
- ✅ Frontend API endpoint updated to Functions URL

### Common Firebase Issues

**Issue**: Functions deployment fails
- **Solution**: Ensure all dependencies are in `functions/package.json`

**Issue**: Database connection timeout
- **Solution**: MongoDB Atlas must allow Firebase Cloud Functions IP ranges. Use `0.0.0.0/0` for testing.

**Issue**: CORS errors
- **Solution**: Verify backend CORS includes your `.web.app` and `.firebaseapp.com` domains

**Issue**: Environment variables not working
- **Solution**: Use `firebase functions:config:get` to verify they're set correctly

---

## 📝 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/login` | Login user |

### Books
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/books` | Get all books (with pagination, search, filter) | No |
| GET | `/api/books/:id` | Get book details with reviews | No |
| POST | `/api/books` | Add new book | Yes |
| PUT | `/api/books/:id` | Update book | Yes (Owner only) |
| DELETE | `/api/books/:id` | Delete book | Yes (Owner only) |

### Reviews
| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/reviews/:bookId` | Add review | Yes |
| GET | `/api/reviews/:bookId` | Get book reviews | No |
| PUT | `/api/reviews/:id` | Update review | Yes (Owner only) |
| DELETE | `/api/reviews/:id` | Delete review | Yes (Owner only) |

## 🔒 Security Best Practices

1. **Never commit .env files** - Use `.gitignore` (already configured)
2. **Use strong JWT secrets** - Generate with: `openssl rand -base64 32`
3. **Validate user input** - Always sanitize and validate
4. **Use HTTPS in production** - Both Vercel and Firebase provide SSL automatically
5. **Rotate secrets** - If exposed, immediately rotate MongoDB credentials and JWT secret
6. **Restrict MongoDB access** - Use specific IP ranges in production (not `0.0.0.0/0`)

## 🐛 Troubleshooting

### Common Issues

#### 1. **MongoDB Connection Failed**
**Error**: `Could not connect to any servers in your MongoDB Atlas cluster`

**Solution**:
- Whitelist deployment platform IPs in MongoDB Atlas Network Access
- Verify MONGO_URI environment variable is correct
- Check MongoDB cluster status

#### 2. **CORS Errors**
**Error**: `Access-Control-Allow-Origin header`

**Solution**:
- Ensure backend has proper CORS configuration (already included)
- Verify FRONTEND_URL environment variable is set
- Check that frontend URL matches exactly (including https://)

#### 3. **JWT Token Errors**
**Error**: `jwt malformed` or `invalid signature`

**Solution**:
- Clear browser localStorage
- Verify JWT_SECRET is identical in all deployments
- Re-login to get fresh token

#### 4. **API 404 Errors on Vercel**
**Solution**:
- Verify `vercel.json` routes configuration
- Check that `/api/*` routes to backend correctly
- Review deployment logs in Vercel dashboard

#### 5. **Firebase Functions Timeout**
**Solution**:
- Increase function timeout in Firebase console
- Optimize MongoDB queries
- Check database connection is established quickly

## 📞 Support

If you encounter any issues:

1. Check the Troubleshooting section above
2. Review the MongoDB Atlas IP whitelist settings
3. Ensure all environment variables are correctly set
4. Verify CORS configuration includes your deployment domain
5. Check deployment platform logs (Vercel Dashboard / Firebase Console)

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Book cover images from [Unsplash](https://unsplash.com)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)
- Deployed on [Vercel](https://vercel.com) and [Firebase](https://firebase.google.com)

---

**Happy Reading! 📚**
