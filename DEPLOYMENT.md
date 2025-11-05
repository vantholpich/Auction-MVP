# Vercel Deployment Guide

## Quick Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard
1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will automatically detect the configuration from `vercel.json`
5. Click "Deploy"

### Option 2: Deploy via Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy from project root
vercel

# For production deployment
vercel --prod
```

## Environment Variables
Make sure to add these environment variables in Vercel dashboard:
- `EXPO_PUBLIC_SUPABASE_URL`
- `EXPO_PUBLIC_SUPABASE_ANON_KEY`

## Build Configuration
The app is configured with:
- Build Command: `npx expo export -p web --output-dir dist`
- Output Directory: `dist`
- Framework: None (custom Expo setup)

## Troubleshooting
If you encounter build issues:
1. Try deploying directly from GitHub via Vercel dashboard
2. Check that all environment variables are set
3. Ensure your Supabase database is accessible from the web

## Post-Deployment
After deployment:
1. Test the social media links work correctly
2. Verify image uploads work with Supabase
3. Check that the app is responsive on different screen sizes