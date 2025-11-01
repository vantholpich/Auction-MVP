-- Friend Auction App Database Schema
-- Run this in your Supabase SQL editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Friend Profiles Table
CREATE TABLE friend_profiles (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    age INTEGER NOT NULL CHECK (age >= 18 AND age <= 100),
    bio TEXT NOT NULL,
    occupation VARCHAR(255) NOT NULL,
    image TEXT,
    gallery TEXT[] DEFAULT '{}',
    bids INTEGER DEFAULT 0,
    auctioned_by VARCHAR(255) NOT NULL,
    about TEXT NOT NULL,
    pros TEXT[] DEFAULT '{}',
    cons TEXT[] DEFAULT '{}',
    interests TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    is_active BOOLEAN DEFAULT true
);

-- Testimonials Table
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    friend_profile_id INTEGER REFERENCES friend_profiles(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    text TEXT NOT NULL,
    avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Bids Table
CREATE TABLE bids (
    id SERIAL PRIMARY KEY,
    friend_profile_id INTEGER REFERENCES friend_profiles(id) ON DELETE CASCADE,
    amount DECIMAL(10,2) NOT NULL CHECK (amount > 0),
    message TEXT,
    bidder_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User Interactions Table (for tracking likes/passes without auth)
CREATE TABLE user_interactions (
    id SERIAL PRIMARY KEY,
    session_id VARCHAR(255) NOT NULL,
    friend_profile_id INTEGER REFERENCES friend_profiles(id) ON DELETE CASCADE,
    action VARCHAR(10) NOT NULL CHECK (action IN ('like', 'pass', 'view')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(session_id, friend_profile_id, action)
);

-- Indexes for better performance
CREATE INDEX idx_friend_profiles_active ON friend_profiles(is_active);
CREATE INDEX idx_friend_profiles_created_at ON friend_profiles(created_at);
CREATE INDEX idx_testimonials_friend_profile_id ON testimonials(friend_profile_id);
CREATE INDEX idx_bids_friend_profile_id ON bids(friend_profile_id);
CREATE INDEX idx_user_interactions_session_id ON user_interactions(session_id);
CREATE INDEX idx_user_interactions_friend_profile_id ON user_interactions(friend_profile_id);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically update updated_at
CREATE TRIGGER update_friend_profiles_updated_at 
    BEFORE UPDATE ON friend_profiles 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Function to increment bid count
CREATE OR REPLACE FUNCTION increment_bid_count()
RETURNS TRIGGER AS $$
BEGIN
    UPDATE friend_profiles 
    SET bids = bids + 1 
    WHERE id = NEW.friend_profile_id;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Trigger to automatically increment bid count when new bid is added
CREATE TRIGGER increment_bid_count_trigger
    AFTER INSERT ON bids
    FOR EACH ROW
    EXECUTE FUNCTION increment_bid_count();

-- Enable Row Level Security (RLS)
ALTER TABLE friend_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE bids ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_interactions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (since no auth is required)
CREATE POLICY "Allow public read access on friend_profiles" ON friend_profiles
    FOR SELECT USING (is_active = true);

CREATE POLICY "Allow public insert on friend_profiles" ON friend_profiles
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on testimonials" ON testimonials
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on testimonials" ON testimonials
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read access on bids" ON bids
    FOR SELECT USING (true);

CREATE POLICY "Allow public insert on bids" ON bids
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public access on user_interactions" ON user_interactions
    FOR ALL USING (true);

-- Insert sample data
INSERT INTO friend_profiles (name, age, bio, occupation, image, gallery, bids, auctioned_by, about, pros, cons, interests) VALUES
(
    'Ethan',
    28,
    'Looking for someone who loves adventure and spontaneous trips.',
    'Software Engineer',
    'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODE4NDE0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ARRAY[
        'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODE4NDE0M3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
        'https://images.unsplash.com/photo-1581664467483-c05270a796c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGNhc3VhbCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc1ODIzOTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    124,
    'Sarah M.',
    'Ethan is a travel-loving software engineer with a passion for exploring new cultures and trying extreme sports. He''s the type of person who will book a last-minute flight to a new country and figure out the details later.',
    ARRAY['Great at cooking', 'Loves animals', 'Great sense of humor', 'Adventurous and spontaneous'],
    ARRAY['A bit of a spontaneous', 'Gets too competitive at board games', 'Always refers to wine'],
    ARRAY['Adventure', 'Travel', 'Coding', 'Rock Climbing']
),
(
    'Sophia',
    27,
    'Creative soul who believes in authentic connections and deep conversations.',
    'Graphic Designer',
    'https://images.unsplash.com/photo-1697095098675-1d02496ef86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MjA0NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ARRAY[
        'https://images.unsplash.com/photo-1697095098675-1d02496ef86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MjA0NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    89,
    'Marcus L.',
    'Sophia is a creative soul who loves authentic adventures and meaningful connections, as well as watching new cultures. She''s a talented graphic designer with a keen eye for aesthetics.',
    ARRAY['Loyal and trustworthy', 'Great cook', 'Great sense of humor', 'Adventurous and spontaneous'],
    ARRAY['A bit of a perfectionist', 'Gets too competitive at board games', 'Always afraid of spiders'],
    ARRAY['Photography', 'Yoga', 'Shared Dinners', 'Reading']
),
(
    'Marcus',
    26,
    'Fitness enthusiast who loves cooking and weekend camping trips.',
    'Personal Trainer',
    'https://images.unsplash.com/photo-1581664467483-c05270a796c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGNhc3VhbCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc1ODIzOTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    ARRAY[
        'https://images.unsplash.com/photo-1581664467483-c05270a796c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGNhc3VhbCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc1ODIzOTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'
    ],
    76,
    'Emma T.',
    'Marcus is passionate about health and wellness, always encouraging others to be their best selves. He loves spending time outdoors and is an amazing cook.',
    ARRAY['Extremely motivated', 'Great listener', 'Amazing cook', 'Loves the outdoors'],
    ARRAY['Can be too health-focused', 'Wakes up very early', 'Talks about fitness a lot'],
    ARRAY['Fitness', 'Cooking', 'Hiking', 'Meditation']
);

-- Insert testimonials
INSERT INTO testimonials (friend_profile_id, name, text, avatar) VALUES
(1, 'Alex M.', 'Ethan is the most genuine and adventurous person I know. His positive energy is infectious and he''ll make you laugh until your stomach hurts.', 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'),
(1, 'Jessica R.', 'He''s a heart of gold. She''s an amazing friend and would be an even better partner.', 'https://images.unsplash.com/photo-1697095098675-1d02496ef86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MjA0NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'),
(2, 'Maya K.', 'Sophia is the most loyal generous and thoughtful friend around. She''ll make you feel so welcome on our first dinner.', 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral'),
(3, 'David L.', 'Marcus is the most supportive and motivating person I know. He genuinely cares about everyone around him.', 'https://images.unsplash.com/photo-1706025090794-7ade2c1b6208?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx5b3VuZyUyMHByb2Zlc3Npb25hbCUyMGhlYWRzaG90fGVufDF8fHx8MTc1ODE4NzcxMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral');