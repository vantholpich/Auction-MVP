import { supabase } from '../lib/supabase';
import { Person } from '../types';
import { Database } from '../types/database';

type FriendProfile = Database['public']['Tables']['friend_profiles']['Row'];
type FriendProfileInsert = Database['public']['Tables']['friend_profiles']['Insert'];
type Testimonial = Database['public']['Tables']['testimonials']['Row'];

// Transform database row to Person interface
function transformToPersonInterface(profile: FriendProfile, testimonials: Testimonial[] = []): Person {
  return {
    id: profile.id,
    name: profile.name,
    age: profile.age,
    bio: profile.bio,
    occupation: profile.occupation,
    image: profile.image || '',
    gallery: profile.gallery || [],
    bids: profile.bids,
    auctionedBy: profile.auctioned_by,
    about: profile.about,
    pros: profile.pros || [],
    cons: profile.cons || [],
    interests: profile.interests || [],
    instagram: profile.instagram || undefined,
    facebook: profile.facebook || undefined,
    testimonials: testimonials.map(t => ({
      name: t.name,
      text: t.text,
      avatar: t.avatar || ''
    }))
  };
}

// Get all active friend profiles
export async function getFriendProfiles(): Promise<Person[]> {
  try {
    const { data: profiles, error: profilesError } = await supabase
      .from('friend_profiles')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (profilesError) throw profilesError;

    // Get testimonials for all profiles
    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('*');

    if (testimonialsError) throw testimonialsError;

    // Group testimonials by friend_profile_id
    const testimonialsMap = testimonials?.reduce((acc, testimonial) => {
      if (!acc[testimonial.friend_profile_id]) {
        acc[testimonial.friend_profile_id] = [];
      }
      acc[testimonial.friend_profile_id].push(testimonial);
      return acc;
    }, {} as Record<number, Testimonial[]>) || {};

    return profiles?.map(profile => 
      transformToPersonInterface(profile, testimonialsMap[profile.id] || [])
    ) || [];
  } catch (error) {
    console.error('Error fetching friend profiles:', error);
    throw error;
  }
}

// Get a single friend profile by ID
export async function getFriendProfile(id: number): Promise<Person | null> {
  try {
    const { data: profile, error: profileError } = await supabase
      .from('friend_profiles')
      .select('*')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (profileError) throw profileError;

    const { data: testimonials, error: testimonialsError } = await supabase
      .from('testimonials')
      .select('*')
      .eq('friend_profile_id', id);

    if (testimonialsError) throw testimonialsError;

    return transformToPersonInterface(profile, testimonials || []);
  } catch (error) {
    console.error('Error fetching friend profile:', error);
    return null;
  }
}

// Create a new friend profile
export async function createFriendProfile(profileData: {
  name: string;
  age: number;
  bio: string;
  occupation: string;
  interests: string;
  pros: string;
  cons: string;
  auctionedBy: string;
  instagram?: string;
  facebook?: string;
  image?: string;
  gallery?: string[];
}): Promise<Person | null> {
  try {
    const insertData: FriendProfileInsert = {
      name: profileData.name,
      age: profileData.age,
      bio: profileData.bio,
      occupation: profileData.occupation,
      image: profileData.image || null,
      gallery: profileData.gallery || [],
      auctioned_by: profileData.auctionedBy,
      about: profileData.bio, // Use bio as about for now
      pros: profileData.pros.split(',').map(p => p.trim()).filter(p => p),
      cons: profileData.cons.split(',').map(c => c.trim()).filter(c => c),
      interests: profileData.interests.split(',').map(i => i.trim()).filter(i => i),
      instagram: profileData.instagram || null,
      facebook: profileData.facebook || null,
      bids: 0,
      is_active: true
    };

    const { data: profile, error } = await supabase
      .from('friend_profiles')
      .insert(insertData)
      .select()
      .single();

    if (error) throw error;

    return transformToPersonInterface(profile);
  } catch (error) {
    console.error('Error creating friend profile:', error);
    throw error;
  }
}

// Update friend profile
export async function updateFriendProfile(id: number, updates: Partial<FriendProfileInsert>): Promise<Person | null> {
  try {
    const { data: profile, error } = await supabase
      .from('friend_profiles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    return transformToPersonInterface(profile);
  } catch (error) {
    console.error('Error updating friend profile:', error);
    throw error;
  }
}

// Delete (deactivate) friend profile
export async function deleteFriendProfile(id: number): Promise<boolean> {
  try {
    const { error } = await supabase
      .from('friend_profiles')
      .update({ is_active: false })
      .eq('id', id);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error deleting friend profile:', error);
    return false;
  }
}