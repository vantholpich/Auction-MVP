import { supabase } from '../lib/supabase';
import { Database } from '../types/database';

type Bid = Database['public']['Tables']['bids']['Row'];
type BidInsert = Database['public']['Tables']['bids']['Insert'];

// Create a new bid
export async function createBid(
  friendProfileId: number,
  amount: number,
  bidderName: string,
  message?: string
): Promise<Bid | null> {
  try {
    const bidData: BidInsert = {
      friend_profile_id: friendProfileId,
      amount: amount,
      bidder_name: bidderName,
      message: message || null
    };

    const { data, error } = await supabase
      .from('bids')
      .insert(bidData)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error('Error creating bid:', error);
    throw error;
  }
}

// Get bids for a friend profile
export async function getBidsForProfile(friendProfileId: number): Promise<Bid[]> {
  try {
    const { data, error } = await supabase
      .from('bids')
      .select('*')
      .eq('friend_profile_id', friendProfileId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching bids:', error);
    return [];
  }
}

// Get highest bid for a profile
export async function getHighestBid(friendProfileId: number): Promise<Bid | null> {
  try {
    const { data, error } = await supabase
      .from('bids')
      .select('*')
      .eq('friend_profile_id', friendProfileId)
      .order('amount', { ascending: false })
      .limit(1)
      .single();

    if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "not found"
    return data || null;
  } catch (error) {
    console.error('Error fetching highest bid:', error);
    return null;
  }
}

// Get total bid count for a profile
export async function getBidCount(friendProfileId: number): Promise<number> {
  try {
    const { count, error } = await supabase
      .from('bids')
      .select('*', { count: 'exact', head: true })
      .eq('friend_profile_id', friendProfileId);

    if (error) throw error;
    return count || 0;
  } catch (error) {
    console.error('Error fetching bid count:', error);
    return 0;
  }
}