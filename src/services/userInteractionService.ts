import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type UserInteraction = Database['public']['Tables']['user_interactions']['Row'];
type UserInteractionInsert = Database['public']['Tables']['user_interactions']['Insert'];

// Generate a simple session ID (you can make this more sophisticated)
function getSessionId(): string {
  let sessionId = localStorage.getItem('friend_auction_session_id');
  if (!sessionId) {
    sessionId = 'session_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
    localStorage.setItem('friend_auction_session_id', sessionId);
  }
  return sessionId;
}

// Record user interaction (like, pass, view)
export async function recordInteraction(
  friendProfileId: number, 
  action: 'like' | 'pass' | 'view'
): Promise<boolean> {
  try {
    const sessionId = getSessionId();
    
    const interactionData: UserInteractionInsert = {
      session_id: sessionId,
      friend_profile_id: friendProfileId,
      action: action
    };

    const { error } = await supabase
      .from('user_interactions')
      .upsert(interactionData, {
        onConflict: 'session_id,friend_profile_id,action'
      });

    if (error) throw error;
    return true;
  } catch (error) {
    console.error('Error recording interaction:', error);
    return false;
  }
}

// Get user interactions for current session
export async function getUserInteractions(): Promise<UserInteraction[]> {
  try {
    const sessionId = getSessionId();
    
    const { data, error } = await supabase
      .from('user_interactions')
      .select('*')
      .eq('session_id', sessionId);

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching user interactions:', error);
    return [];
  }
}

// Check if user has already interacted with a profile
export async function hasUserInteracted(
  friendProfileId: number, 
  action?: 'like' | 'pass' | 'view'
): Promise<boolean> {
  try {
    const sessionId = getSessionId();
    
    let query = supabase
      .from('user_interactions')
      .select('id')
      .eq('session_id', sessionId)
      .eq('friend_profile_id', friendProfileId);

    if (action) {
      query = query.eq('action', action);
    }

    const { data, error } = await query;

    if (error) throw error;
    return (data?.length || 0) > 0;
  } catch (error) {
    console.error('Error checking user interaction:', error);
    return false;
  }
}

// Get profiles that user has liked
export async function getLikedProfiles(): Promise<number[]> {
  try {
    const sessionId = getSessionId();
    
    const { data, error } = await supabase
      .from('user_interactions')
      .select('friend_profile_id')
      .eq('session_id', sessionId)
      .eq('action', 'like');

    if (error) throw error;
    return data?.map(item => item.friend_profile_id) || [];
  } catch (error) {
    console.error('Error fetching liked profiles:', error);
    return [];
  }
}

// Get profiles that user has passed on
export async function getPassedProfiles(): Promise<number[]> {
  try {
    const sessionId = getSessionId();
    
    const { data, error } = await supabase
      .from('user_interactions')
      .select('friend_profile_id')
      .eq('session_id', sessionId)
      .eq('action', 'pass');

    if (error) throw error;
    return data?.map(item => item.friend_profile_id) || [];
  } catch (error) {
    console.error('Error fetching passed profiles:', error);
    return [];
  }
}