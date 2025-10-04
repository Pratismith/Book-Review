# Deploying Book Review App to Render

This guide will walk you through deploying your MERN stack Book Review application to Render.

## Prerequisites

1. A MongoDB Atlas account with a database set up
2. A GitHub repository with your code
3. A Render account (free tier works fine)

## Deployment Steps

### Step 1: Prepare Your MongoDB Atlas Database

1. **Create a MongoDB Atlas Account** (if you don't have one):
   - Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster**:
   - Create a new M0 (free tier) cluster
   - Choose a cloud provider and region

3. **Whitelist All IPs for Render**:
   - Go to "Network Access" in your MongoDB Atlas dashboard
   - Click "Add IP Address"
   - Add `0.0.0.0/0` to allow connections from anywhere (required for Render)

4. **Get Your Connection String**:
   - Go to "Database" → "Connect" → "Connect your application"
   - Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/`)
   - Replace `<password>` with your actual database password
   - Add your database name at the end (e.g., `bookReview`)
   - Example: `mongodb+srv://myuser:mypass@cluster0.abc123.mongodb.net/bookReview`

### Step 2: Deploy to Render

Since this app has both frontend and backend in one repository, we'll deploy them as a single Web Service.

1. **Go to Render Dashboard**:
   - Visit [render.com](https://render.com)
   - Sign in or create an account
   - Click "New" → "Web Service"

2. **Connect Your GitHub Repository**:
   - Authorize Render to access your GitHub
   - Select your book review repository

3. **Configure Build Settings**:
   ```
   Name: book-review-app (or any name you prefer)
   Region: Choose the closest to you
   Branch: main (or your default branch)
   Root Directory: (leave empty)
   Runtime: Node
   Build Command: npm run build
   Start Command: npm start
   ```

4. **Set Environment Variables**:
   Click "Advanced" → "Add Environment Variable" and add:
   
   ```
   MONGO_URI = mongodb+srv://your-username:your-password@your-cluster.mongodb.net/bookReview
   JWT_SECRET = kMhw6FuQFvOdvcPoQxSuhdK/lGyU+OYYjb8VIvgfm/k=
   NODE_ENV = production
   ```
   
   **Important**: Replace the MONGO_URI with your actual MongoDB Atlas connection string!

5. **Choose Plan**:
   - Select "Free" plan (sufficient for testing and small apps)
   - Note: Free tier services may spin down after 15 minutes of inactivity

6. **Create Web Service**:
   - Click "Create Web Service"
   - Render will start building and deploying your app
   - This may take 5-10 minutes

### Step 3: Monitor Deployment

1. **Watch Build Logs**:
   - Render will show real-time build logs
   - The build process will:
     - Install backend dependencies
     - Install frontend dependencies
     - Build the React frontend
     - Start the Node.js server

2. **Deployment Success**:
   - Once complete, you'll see "Your service is live 🎉"
   - Render will provide a URL like: `https://book-review-app-xxxx.onrender.com`

3. **Test Your App**:
   - Click on the provided URL
   - Your app should load with the React frontend
   - Try signing up, logging in, and adding books

## How It Works

The deployment uses the following process:

1. **Build Phase** (`npm run build`):
   - Installs backend dependencies: `cd backend && npm install`
   - Installs frontend dependencies: `cd frontend && npm install`
   - Builds React frontend: `cd frontend && npm run build`
   - Creates optimized static files in `frontend/dist/`

2. **Start Phase** (`npm start`):
   - Runs the backend server: `cd backend && node server.js`
   - Backend serves API routes at `/api/*`
   - Backend serves frontend static files from `../frontend/dist/`
   - Backend serves uploads at `/uploads/*`

## Troubleshooting

### Issue: Build Fails with "Cannot find module"

**Solution**: Make sure all dependencies are listed in `package.json` files. Run `npm install` locally to verify.

### Issue: MongoDB Connection Error

**Solutions**:
1. Verify your MongoDB Atlas connection string is correct
2. Make sure you've whitelisted `0.0.0.0/0` in Network Access
3. Check that your database user has read/write permissions
4. Ensure your password doesn't contain special characters (or URL encode them)

### Issue: App Loads but Shows "Network Error"

**Solution**: Check that environment variables are set correctly in Render dashboard. The `NODE_ENV` should be `production`.

### Issue: Images Not Loading

**Solution**: The free tier of Render doesn't persist uploaded files after restart. For production, consider using cloud storage like AWS S3 or Cloudinary for image uploads.

### Issue: App is Slow to Load

**Solution**: Free tier services spin down after 15 minutes of inactivity. The first request after spin-down takes 30-60 seconds. Upgrade to paid tier for always-on service.

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/bookReview` |
| `JWT_SECRET` | Secret key for JWT tokens | `kMhw6FuQFvOdvcPoQxSuhdK/lGyU+OYYjb8VIvgfm/k=` |
| `NODE_ENV` | Node environment | `production` |
| `PORT` | Server port (auto-set by Render) | Auto-assigned |

## Alternative: Two Separate Services

If you prefer to deploy frontend and backend separately:

### Backend (Web Service):
```
Root Directory: backend
Build Command: npm install
Start Command: node server.js
```

### Frontend (Static Site):
```
Root Directory: frontend
Build Command: npm run build
Publish Directory: dist
```

Then update `frontend/src/api/axios.js` to point to your backend URL.

## Updating Your App

After making changes to your code:

1. Commit and push to GitHub
2. Render will automatically detect changes and redeploy
3. You can also manually trigger a deploy from the Render dashboard

## Cost

- **Free Tier**: $0/month
  - 750 hours/month of runtime
  - Spins down after 15 min inactivity
  - Slower build times
  
- **Starter Plan**: $7/month
  - Always-on
  - Faster builds
  - Better performance

## Support

If you encounter issues:
- Check Render's logs in the dashboard
- Visit [Render Community Forum](https://community.render.com)
- Review [Render Documentation](https://render.com/docs)

---

**Your app should now be live!** 🎉

Visit your Render URL and start reviewing books!
