-- Add Instagram and Facebook fields to friend_profiles table
ALTER TABLE friend_profiles 
ADD COLUMN instagram TEXT,
ADD COLUMN facebook TEXT;

-- Add comments for documentation
COMMENT ON COLUMN friend_profiles.instagram IS 'Instagram username (without @)';
COMMENT ON COLUMN friend_profiles.facebook IS 'Facebook profile name or URL';