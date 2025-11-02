# Supabase Storage Setup for Images

## Create Storage Bucket

1. **Go to your Supabase Dashboard**
2. **Navigate to Storage** in the left sidebar
3. **Click "Create a new bucket"**
4. **Bucket Settings:**
   - **Name:** `friend-profiles`
   - **Public bucket:** ✅ **Enable** (so images can be viewed publicly)
   - **File size limit:** 50MB (optional)
   - **Allowed MIME types:** `image/*` (optional)

## Set Up Storage Policies

After creating the bucket, you need to set up Row Level Security policies:

### 1. Enable RLS on Storage
```sql
-- Enable RLS on storage.objects
ALTER TABLE storage.objects ENABLE ROW LEVEL SECURITY;
```

### 2. Create Upload Policy
```sql
-- Allow anyone to upload to friend-profiles bucket
CREATE POLICY "Allow public uploads to friend-profiles" ON storage.objects
FOR INSERT WITH CHECK (bucket_id = 'friend-profiles');
```

### 3. Create Read Policy
```sql
-- Allow anyone to read from friend-profiles bucket
CREATE POLICY "Allow public reads from friend-profiles" ON storage.objects
FOR SELECT USING (bucket_id = 'friend-profiles');
```

### 4. Create Delete Policy (Optional)
```sql
-- Allow anyone to delete from friend-profiles bucket
CREATE POLICY "Allow public deletes from friend-profiles" ON storage.objects
FOR DELETE USING (bucket_id = 'friend-profiles');
```

## Verify Setup

1. **Check bucket exists:** Go to Storage > friend-profiles
2. **Test upload:** Try creating a profile with images
3. **Check public access:** Images should be viewable via public URLs

## Folder Structure

The app will create this folder structure in your bucket:
```
friend-profiles/
└── profile-images/
    ├── 1699123456789-abc123.jpg
    ├── 1699123456790-def456.jpg
    └── ...
```

## Public URL Format

Images will be accessible at:
```
https://your-project-id.supabase.co/storage/v1/object/public/friend-profiles/profile-images/filename.jpg
```

## Troubleshooting

- **Images not showing:** Check if bucket is public and policies are set
- **Upload fails:** Verify upload policy exists and bucket name is correct
- **Permission denied:** Ensure RLS policies allow public access