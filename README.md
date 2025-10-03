# 📚 BookNest - Modern Book Review Application

A beautiful, full-stack MERN (MongoDB, Express, React, Node.js) book review application with modern UI design, user authentication, and comprehensive book management features.

![BookNest](https://img.shields.io/badge/MERN-Stack-green) ![Status](https://img.shields.io/badge/Status-Active-success) ![License](https://img.shields.io/badge/License-MIT-blue)

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

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB)
- npm or yarn package manager

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd book-review-app
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
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

5. **Start the Application**

   **Option 1: Development Mode (Separate Terminals)**
   
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

   **Option 2: Using the Startup Script**
   ```bash
   bash start.sh
   ```

6. **Access the Application**
   - Frontend: http://localhost:5000
   - Backend API: http://localhost:3001

## 🌐 MongoDB Atlas Setup

### Important: IP Whitelisting Required

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Navigate to your cluster → Network Access
3. Click "Add IP Address"
4. Add `0.0.0.0/0` (allow from anywhere) OR add your specific IP
5. Save changes

**Note**: The application won't connect to MongoDB without proper IP whitelisting.

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

## 🎨 UI Customization Guide

### Changing the Color Theme

1. **Update Tailwind Colors** in `frontend/src/App.jsx`:
   ```jsx
   // Current: Amber/Orange theme
   className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50"
   
   // Change to Blue theme:
   className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-cyan-50"
   ```

2. **Update Navbar** in `frontend/src/components/Navbar.jsx`:
   ```jsx
   // Current: Amber gradient
   className="bg-gradient-to-r from-amber-900 via-amber-800 to-orange-900"
   
   // Change to Blue:
   className="bg-gradient-to-r from-blue-900 via-blue-800 to-indigo-900"
   ```

3. **Update Button Colors** throughout components:
   ```jsx
   // Find and replace:
   "amber-600" → "blue-600"
   "amber-500" → "blue-500"
   "orange-600" → "indigo-600"
   ```

### Modifying Layout

**Change Hero Section** in `frontend/src/pages/Home.jsx`:
```jsx
// Adjust height
className="relative min-h-[70vh]" // Change to min-h-[50vh] for shorter

// Modify background pattern
// Edit the SVG pattern in the backgroundImage style
```

**Adjust Card Spacing**:
```jsx
// In Home.jsx grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
// Change gap-8 to gap-4 (tighter) or gap-12 (wider)
```

### Adding New Features

1. **Add New Book Fields**:
   - Update `backend/models/Book.js` schema
   - Update `frontend/src/pages/AddEditBook.jsx` form
   - Update `frontend/src/components/BookCard.jsx` display

2. **Add Book Categories/Tags**:
   - Extend genre options in all forms
   - Add category badges to BookCard component
   - Implement multi-select filters

3. **Add User Profiles**:
   - Extend User model with profile fields
   - Create profile edit page
   - Add avatar upload functionality

## 🐛 Troubleshooting

### Common Issues & Solutions

#### 1. **MongoDB Connection Failed**
**Error**: `Could not connect to any servers in your MongoDB Atlas cluster`

**Solution**:
- Whitelist your IP in MongoDB Atlas Network Access
- Verify MONGO_URI in .env file is correct
- Check MongoDB cluster status

#### 2. **Port Already in Use**
**Error**: `EADDRINUSE: address already in use`

**Solution**:
```bash
# Find and kill the process using the port
# On Mac/Linux:
lsof -i :3001  # or :5000
kill -9 <PID>

# On Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

#### 3. **CORS Errors**
**Error**: `Access-Control-Allow-Origin header`

**Solution**:
- Ensure backend has `cors()` middleware enabled
- Check frontend API URL in `frontend/src/api/axios.js`
- Verify backend is running on correct port

#### 4. **JWT Token Errors**
**Error**: `jwt malformed` or `invalid signature`

**Solution**:
- Clear browser localStorage
- Verify JWT_SECRET matches in .env
- Re-login to get fresh token

#### 5. **Vite Build Errors**
**Error**: `Failed to resolve import`

**Solution**:
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

#### 6. **Browser Caching Issues (Replit)**
**Issue**: Changes not visible in preview

**Solution**:
- Open browser DevTools (F12)
- Right-click refresh button
- Select "Empty Cache and Hard Reload"
- Or use Ctrl+Shift+R (Cmd+Shift+R on Mac)

## 🚀 Deployment Guide

### Deploy to Production

1. **Build Frontend**:
   ```bash
   cd frontend
   npm run build
   ```

2. **Set Environment Variables**:
   ```env
   NODE_ENV=production
   PORT=5000
   MONGO_URI=your_production_mongodb_uri
   JWT_SECRET=strong_random_secret
   ```

3. **Start Production Server**:
   ```bash
   cd backend
   NODE_ENV=production node server.js
   ```

### Replit Deployment

1. Click the "Deploy" button in Replit
2. Configure deployment settings (already set up):
   - **Type**: VM (always running)
   - **Build**: `cd frontend && npm run build`
   - **Run**: `cd backend && NODE_ENV=production node server.js`
3. Ensure MongoDB allows connections from deployment IP
4. Deploy and test

## 🔒 Security Best Practices

1. **Never commit .env files** - Use `.gitignore`
2. **Use strong JWT secrets** - Generate with: `openssl rand -base64 32`
3. **Validate user input** - Always sanitize and validate
4. **Use HTTPS in production** - Enable SSL/TLS
5. **Rate limiting** - Implement API rate limiting
6. **Update dependencies** - Regularly run `npm audit fix`

## 📈 Performance Optimization

### Backend
- **Database Indexing**: Add indexes to frequently queried fields
- **Pagination**: Already implemented for book listings
- **Caching**: Consider Redis for session storage

### Frontend
- **Code Splitting**: Vite automatically handles this
- **Image Optimization**: Lazy load images
- **Minification**: Production build includes minification

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -m 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Book cover images from [Unsplash](https://unsplash.com)
- Icons from [Heroicons](https://heroicons.com)
- UI components styled with [Tailwind CSS](https://tailwindcss.com)

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the Troubleshooting section above
2. Review the MongoDB Atlas IP whitelist settings
3. Ensure all environment variables are correctly set
4. Check that both frontend and backend are running
5. Clear browser cache if UI changes aren't visible

**Happy Reading! 📚**
