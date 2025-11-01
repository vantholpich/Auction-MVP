# Supabase Backend Setup Guide

## Prerequisites
- A Supabase account (free tier is sufficient)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and enter project details:
   - Name: `friend-auction-app` (or any name you prefer)
   - Database Password: Generate a strong password
   - Region: Choose the closest to your users
4. Click "Create new project"
5. Wait for the project to be set up (usually takes 1-2 minutes)

## Step 2: Set Up the Database Schema

1. In your Supabase dashboard, go to the "SQL Editor" tab
2. Copy the entire contents of `supabase-schema.sql` from this project
3. Paste it into the SQL editor
4. Click "Run" to execute the schema creation
5. You should see success messages for all the tables and data creation

## Step 3: Get Your Project Credentials

1. In your Supabase dashboard, go to "Settings" → "API"
2. Copy the following values:
   - **Project URL** (looks like `https://your-project-id.supabase.co`)
   - **Anon/Public Key** (starts with `eyJ...`)

## Step 4: Configure Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```

2. Edit `.env.local` and replace the placeholder values:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

## Step 5: Test the Connection

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Open the app in your browser
3. You should see the sample profiles loaded from Supabase
4. Try creating a new friend profile to test the create functionality

## Features Included

### ✅ Database Tables
- **friend_profiles**: Store friend profile data
- **testimonials**: Store testimonials for each friend
- **bids**: Store bids on friend profiles (for future use)
- **user_interactions**: Track user likes/passes without authentication

### ✅ API Services
- **Friend Profile Service**: CRUD operations for friend profiles
- **User Interaction Service**: Track user actions (like/pass/view)
- **Bid Service**: Handle bidding functionality (ready for future use)

### ✅ Features
- Load profiles from Supabase database
- Create new friend profiles
- Track user interactions (prevents showing same profiles)
- Real-time data updates
- No authentication required (uses session-based tracking)

## Database Schema Overview

```sql
friend_profiles
├── id (Primary Key)
├── name, age, bio, occupation
├── image, gallery (photo URLs)
├── auctioned_by (who listed them)
├── pros, cons, interests (arrays)
├── bids (count), is_active
└── created_at, updated_at

testimonials
├── id (Primary Key)
├── friend_profile_id (Foreign Key)
├── name, text, avatar
└── created_at

user_interactions
├── id (Primary Key)
├── session_id (tracks anonymous users)
├── friend_profile_id (Foreign Key)
├── action (like/pass/view)
└── created_at
```

## Troubleshooting

### Connection Issues
- Verify your environment variables are correct
- Check that your Supabase project is active
- Ensure you're using the correct URL and anon key

### Schema Issues
- Make sure you ran the entire `supabase-schema.sql` script
- Check the Supabase logs for any error messages
- Verify all tables were created in the "Table Editor"

### Data Issues
- Check the "Table Editor" to see if sample data was inserted
- Verify Row Level Security policies are enabled
- Make sure the `is_active` column is set to `true` for profiles

## Next Steps

The backend is now fully functional! You can:

1. **Add more sample data** through the Supabase dashboard
2. **Implement photo upload** using Supabase Storage
3. **Add real-time features** using Supabase subscriptions
4. **Implement bidding functionality** (already set up in the database)
5. **Add user authentication** if needed in the future

## Support

If you encounter any issues:
1. Check the browser console for error messages
2. Review the Supabase dashboard logs
3. Verify your environment variables
4. Ensure your Supabase project is active and properly configured