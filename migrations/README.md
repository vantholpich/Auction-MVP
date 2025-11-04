# Database Migrations

## Social Media Fields Migration

To add Instagram and Facebook fields to your Supabase database:

1. Go to your Supabase dashboard
2. Navigate to the SQL Editor
3. Run the SQL from `add_social_media_fields.sql`

Or run this SQL directly:

```sql
ALTER TABLE friend_profiles 
ADD COLUMN instagram TEXT,
ADD COLUMN facebook TEXT;
```

This will add optional Instagram and Facebook fields to store social media handles for each friend profile.