export interface Database {
  public: {
    Tables: {
      friend_profiles: {
        Row: {
          id: number;
          name: string;
          age: number;
          bio: string;
          occupation: string;
          image: string | null;
          gallery: string[];
          bids: number;
          auctioned_by: string;
          about: string;
          pros: string[];
          cons: string[];
          interests: string[];
          created_at: string;
          updated_at: string;
          is_active: boolean;
        };
        Insert: {
          id?: number;
          name: string;
          age: number;
          bio: string;
          occupation: string;
          image?: string | null;
          gallery?: string[];
          bids?: number;
          auctioned_by: string;
          about: string;
          pros: string[];
          cons: string[];
          interests: string[];
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
        Update: {
          id?: number;
          name?: string;
          age?: number;
          bio?: string;
          occupation?: string;
          image?: string | null;
          gallery?: string[];
          bids?: number;
          auctioned_by?: string;
          about?: string;
          pros?: string[];
          cons?: string[];
          interests?: string[];
          created_at?: string;
          updated_at?: string;
          is_active?: boolean;
        };
      };
      testimonials: {
        Row: {
          id: number;
          friend_profile_id: number;
          name: string;
          text: string;
          avatar: string | null;
          created_at: string;
        };
        Insert: {
          id?: number;
          friend_profile_id: number;
          name: string;
          text: string;
          avatar?: string | null;
          created_at?: string;
        };
        Update: {
          id?: number;
          friend_profile_id?: number;
          name?: string;
          text?: string;
          avatar?: string | null;
          created_at?: string;
        };
      };
      bids: {
        Row: {
          id: number;
          friend_profile_id: number;
          amount: number;
          message: string | null;
          bidder_name: string;
          created_at: string;
        };
        Insert: {
          id?: number;
          friend_profile_id: number;
          amount: number;
          message?: string | null;
          bidder_name: string;
          created_at?: string;
        };
        Update: {
          id?: number;
          friend_profile_id?: number;
          amount?: number;
          message?: string | null;
          bidder_name?: string;
          created_at?: string;
        };
      };
      user_interactions: {
        Row: {
          id: number;
          session_id: string;
          friend_profile_id: number;
          action: 'like' | 'pass' | 'view';
          created_at: string;
        };
        Insert: {
          id?: number;
          session_id: string;
          friend_profile_id: number;
          action: 'like' | 'pass' | 'view';
          created_at?: string;
        };
        Update: {
          id?: number;
          session_id?: string;
          friend_profile_id?: number;
          action?: 'like' | 'pass' | 'view';
          created_at?: string;
        };
      };
    };
  };
}