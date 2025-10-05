# 🚀 Deployment Guide: Netlify + Railway

This guide will walk you through deploying your BookNest application with the frontend on Netlify and the backend on Railway.

## 📋 Prerequisites

- GitHub account
- Netlify account (free tier works)
- Railway account (free tier works)
- MongoDB Atlas account (already configured)

---

## 🔧 Part 1: Backend Deployment on Railway

### Step 1: Prepare Your Repository

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for Netlify and Railway deployment"
   git push origin main
   ```

### Step 2: Deploy Backend to Railway

1. **Go to Railway Dashboard:**
   - Visit [railway.app](https://railway.app)
   - Click **"New Project"**

2. **Deploy from GitHub:**
   - Select **"Deploy from GitHub repo"**
   - Choose your repository from the list
   - Railway will automatically detect it's a Node.js project

3. **Configure Environment Variables:**
   - Once deployed, click on your service
   - Go to the **"Variables"** tab
   - Add the following environment variables:

   ```env
   PORT=3001
   MONGO_URI=mongodb+srv://pratismith2_db_user:0tLSWpS9FqIbE9jd@cluster0.ak3ooy7.mongodb.net/bookReview
   JWT_SECRET=dq1vp1bGv2M7U2CWNzkMzHWtLIMyrpUEvDDTzFoP-BY
   NODE_ENV=production
   FRONTEND_URL=https://your-netlify-app.netlify.app
   ```

   > ⚠️ **Important:** You'll update `FRONTEND_URL` in Step 8 after deploying the frontend

4. **Set Root Directory (if needed):**
   - Go to **"Settings"** tab
   - Under **"Build & Deploy"**, set Root Directory to `backend`

5. **Generate Public URL:**
   - Go to **"Settings"** → **"Networking"**
   - Click **"Generate Domain"**
   - Copy the generated URL (e.g., `your-app.up.railway.app`)
   - **Save this URL** - you'll need it for the frontend!

6. **Verify Deployment:**
   - Check the **"Deployments"** tab for build logs
   - Ensure there are no errors
   - Test the API by visiting: `https://your-app.up.railway.app/api/books`

---

## 🎨 Part 2: Frontend Deployment on Netlify

### Step 3: Update Frontend Environment Variable

1. **Edit `frontend/.env.production`:**
   ```env
   VITE_API_URL=https://your-railway-backend.up.railway.app/api
   ```

   Replace `your-railway-backend.up.railway.app` with your actual Railway URL from Step 2.5

2. **Commit the change:**
   ```bash
   git add frontend/.env.production
   git commit -m "Update production API URL"
   git push origin main
   ```

### Step 4: Deploy Frontend to Netlify

**Option A: Deploy via Netlify UI (Recommended)**

1. **Go to Netlify Dashboard:**
   - Visit [app.netlify.com](https://app.netlify.com)
   - Click **"Add new site"** → **"Import an existing project"**

2. **Connect to GitHub:**
   - Select **GitHub**
   - Authorize Netlify to access your repositories
   - Choose your book review repository

3. **Configure Build Settings:**
   - **Base directory:** `frontend`
   - **Build command:** `npm run build`
   - **Publish directory:** `frontend/dist`
   - **Production branch:** `main`

4. **Add Environment Variables:**
   - Click **"Show advanced"** → **"New variable"**
   - Add:
     ```
     VITE_API_URL = https://your-railway-backend.up.railway.app/api
     ```
   - Replace with your actual Railway URL

5. **Deploy:**
   - Click **"Deploy site"**
   - Wait for the build to complete (usually 1-2 minutes)

**Option B: Deploy via Netlify CLI**

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy from frontend directory
cd frontend
netlify init

# Follow the prompts:
# - Create & configure a new site
# - Build command: npm run build
# - Publish directory: dist

# Add environment variable
netlify env:set VITE_API_URL "https://your-railway-backend.up.railway.app/api"

# Deploy
netlify deploy --prod
```

### Step 5: Get Your Netlify URL

1. After deployment completes, Netlify will provide a URL (e.g., `https://your-app-name.netlify.app`)
2. **Copy this URL** - you need it for Step 6

### Step 6: Custom Domain (Optional)

1. In Netlify Dashboard → **"Domain settings"**
2. Click **"Add custom domain"**
3. Follow the instructions to configure your domain's DNS

---

## 🔄 Part 3: Final Configuration

### Step 7: Update Railway CORS Settings

1. **Go back to Railway Dashboard**
2. Select your backend service
3. Go to **"Variables"** tab
4. Update the `FRONTEND_URL` variable:
   ```env
   FRONTEND_URL=https://your-netlify-app.netlify.app
   ```
   (Use the URL from Step 5)

5. **Redeploy:**
   - Railway will automatically redeploy with the new environment variable
   - Wait for deployment to complete

### Step 8: Verify Everything Works

1. **Test the Frontend:**
   - Visit your Netlify URL
   - Try signing up for a new account
   - Try logging in
   - Try adding a book
   - Try adding a review

2. **Check for CORS Errors:**
   - Open browser DevTools (F12)
   - Go to Console tab
   - Ensure there are no CORS errors

3. **Test All Features:**
   - ✅ User signup/login
   - ✅ Browse books
   - ✅ Search and filter
   - ✅ Add/Edit/Delete books
   - ✅ Add/Delete reviews
   - ✅ User profile

---

## 🔒 Security Checklist

- ✅ Environment variables are set correctly
- ✅ `.env` files are in `.gitignore` (not committed to GitHub)
- ✅ MongoDB Atlas allows connections from Railway IP (0.0.0.0/0 or specific IP)
- ✅ CORS is properly configured with specific origins
- ✅ JWT_SECRET is strong and unique
- ✅ NODE_ENV is set to 'production' in Railway

---

## 🐛 Troubleshooting

### Issue 1: CORS Errors

**Error:** `Access-Control-Allow-Origin header is present`

**Solution:**
- Ensure `FRONTEND_URL` in Railway matches your exact Netlify URL (no trailing slash)
- Check that Railway has redeployed after updating environment variables
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Issue 2: MongoDB Connection Failed

**Error:** `MongoServerError: bad auth : Authentication failed`

**Solution:**
- Verify `MONGO_URI` in Railway Variables tab
- Check MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify database user credentials are correct

### Issue 3: API Calls Return 404

**Error:** API endpoints not found

**Solution:**
- Verify `VITE_API_URL` in Netlify environment variables
- Ensure the URL ends with `/api` (e.g., `https://backend.up.railway.app/api`)
- Check Railway logs for backend errors

### Issue 4: Build Fails on Netlify

**Error:** Build command failed

**Solution:**
- Check that `frontend/.env.production` exists
- Verify all dependencies are in `package.json`
- Check Netlify build logs for specific errors
- Ensure Node version is 18+ (set in `netlify.toml`)

### Issue 5: Uploads Not Working

**Error:** File uploads fail

**Solution:**
- Note: Railway's ephemeral filesystem means uploaded files won't persist
- Consider using cloud storage (AWS S3, Cloudinary) for production uploads
- For testing, uploads will work but disappear on redeploy

---

## 📊 Monitoring & Logs

### View Railway Logs

1. Go to Railway Dashboard → Your service
2. Click **"Deployments"** tab
3. Click on the latest deployment
4. View real-time logs in the **"Logs"** tab

### View Netlify Logs

1. Go to Netlify Dashboard → Your site
2. Click **"Deploys"** tab
3. Click on the latest deploy
4. View build logs and function logs

---

## 🔄 Continuous Deployment

Both Railway and Netlify are now configured for **automatic deployments**:

- **Push to GitHub** → Automatic deployment on both platforms
- **Frontend changes** → Netlify rebuilds automatically
- **Backend changes** → Railway rebuilds automatically

---

## 💰 Cost Breakdown (Free Tiers)

| Service | Free Tier Limits | Upgrade Cost |
|---------|------------------|--------------|
| **Netlify** | 100 GB bandwidth/month, 300 build minutes/month | $19/month for Pro |
| **Railway** | $5 free trial credit, then $5/month minimum | Usage-based pricing |
| **MongoDB Atlas** | 512 MB storage, Shared cluster | $9/month for M10 |

**Estimated Monthly Cost:** $0-$5 (within free tiers)

---

## 🎯 Next Steps

1. **Set up monitoring:** Add error tracking (Sentry, LogRocket)
2. **Add analytics:** Integrate Google Analytics or Mixpanel
3. **Implement caching:** Add Redis for better performance
4. **Cloud storage:** Move uploads to S3 or Cloudinary
5. **Email service:** Add SendGrid for notifications
6. **SSL certificate:** Netlify provides free SSL automatically

---

## 📞 Support Resources

- **Railway Docs:** https://docs.railway.app
- **Netlify Docs:** https://docs.netlify.com
- **MongoDB Atlas:** https://docs.atlas.mongodb.com

---

## ✅ Deployment Checklist

Before going live, ensure:

- [ ] All environment variables are set correctly
- [ ] MongoDB Atlas IP whitelist is configured
- [ ] CORS is working (test all API endpoints)
- [ ] User authentication works (signup/login)
- [ ] All CRUD operations work (books, reviews)
- [ ] Search and filters work
- [ ] Responsive design works on mobile
- [ ] Images load correctly
- [ ] No console errors in browser DevTools
- [ ] SSL certificate is active (https://)
- [ ] Custom domain is configured (optional)

---

**🎉 Congratulations!** Your BookNest app is now live and accessible to users worldwide!
