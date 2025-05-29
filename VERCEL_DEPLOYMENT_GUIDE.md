# 🚀 Vercel Deployment Guide for Vibe Checker App

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Account**: Code should be pushed to GitHub
3. **Node.js**: The app uses Node.js and npm

## 📁 Project Setup for Deployment

The project is now configured for Vercel deployment with:

- ✅ **Environment Variables**: Supabase credentials moved to `.env`
- ✅ **Vercel Config**: `vercel.json` configured for Vite
- ✅ **Build Process**: Tested and working
- ✅ **Git Ready**: Repository initialized and ready

## 🔧 Deployment Steps

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Prepare for Vercel deployment"
   git push origin main
   ```

2. **Deploy on Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import from GitHub
   - Select your repository
   - Configure environment variables (see below)
   - Deploy!

### Method 2: Vercel CLI

1. **Install Vercel CLI**:
   ```bash
   npm i -g vercel
   ```

2. **Deploy**:
   ```bash
   cd /home/lakshya/Desktop/emergent-part-2/vibe-check-quiz
   vercel
   ```

## 🔐 Environment Variables Configuration

In your Vercel project dashboard, add these environment variables:

| Variable Name | Value |
|---------------|-------|
| `VITE_SUPABASE_URL` | `https://rwftmnsiatowemwxrhgs.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ3ZnRtbnNpYXRvd2Vtd3hyaGdzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg1MjM4NjEsImV4cCI6MjA2NDA5OTg2MX0.5XOdsDiW7XCDfbxxthyA7z2xgLogpKtMe4NN93MoVDk` |

### How to Add Environment Variables in Vercel:

1. Go to your project dashboard on Vercel
2. Click "Settings" tab
3. Click "Environment Variables" in the sidebar
4. Add each variable with its value
5. Make sure to select all environments (Production, Preview, Development)

## 📝 Build Configuration

The project includes a `vercel.json` file with optimal settings:

```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "devCommand": "npm run dev"
}
```

## 🔍 Pre-Deployment Checklist

- [x] Build process works locally
- [x] Environment variables configured
- [x] Git repository ready
- [x] Vercel configuration file created
- [x] Dependencies are production-ready
- [x] No sensitive data in codebase

## 🎯 Post-Deployment Steps

1. **Verify Deployment**: Test all features on the live URL
2. **Database Setup**: Create the `loved_playlists` table in Supabase (see `DATABASE_SETUP.md`)
3. **Test Functionality**: 
   - User authentication
   - Quiz functionality
   - Music discovery
   - Playlist love feature
   - Profile pages

## 🚨 Troubleshooting

### Common Issues:

1. **Build Fails**: Check for any missing dependencies or build errors
   ```bash
   npm run build
   ```

2. **Environment Variables Not Working**: 
   - Ensure they start with `VITE_` for client-side access
   - Check they're added in Vercel dashboard
   - Redeploy after adding env vars

3. **Supabase Connection Issues**:
   - Verify Supabase URL and key are correct
   - Check Supabase project is active
   - Ensure database tables exist

### Debug Commands:

```bash
# Test local build
npm run build
npm run preview

# Check environment variables
echo $VITE_SUPABASE_URL
echo $VITE_SUPABASE_ANON_KEY
```

## 🌐 Expected Result

After successful deployment, you'll have:

- ✅ Live app accessible via Vercel URL
- ✅ All features working (quiz, music discovery, profiles)
- ✅ Database integration with Supabase
- ✅ Responsive design on all devices
- ✅ Fast loading with Vercel's CDN

## 📱 Features Available

- **Vibe Quiz**: Interactive personality quiz
- **Music Discovery**: Spotify playlist recommendations
- **Playlist Love**: Save favorite playlists
- **User Profiles**: Personal dashboard with loved playlists
- **Social Features**: User directory and interactions
- **Responsive Design**: Works on desktop and mobile

## 🔗 Next Steps After Deployment

1. **Custom Domain** (optional): Add a custom domain in Vercel settings
2. **Analytics**: Enable Vercel Analytics for usage insights
3. **Performance**: Monitor Core Web Vitals
4. **Database**: Complete the `loved_playlists` table setup
5. **Share**: Share your live app with users!

---

## 🚀 Ready to Deploy!

Your Vibe Checker app is now fully prepared for Vercel deployment. Follow the steps above and you'll have a live, fully-functional music discovery app!
