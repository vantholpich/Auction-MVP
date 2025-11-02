export interface Person {
  id: number;
  name: string;
  age: number;
  bio: string;
  occupation: string;
  image: string;
  gallery: string[];
  bids: number;
  auctionedBy: string;
  about: string;
  pros: string[];
  cons: string[];
  interests: string[];
  testimonials: {
    name: string;
    text: string;
    avatar: string;
  }[];
}

export interface Bid {
  id: number;
  personId: number;
  amount: number;
  message: string;
  timestamp: Date;
}

export interface FriendProfile {
  id: number;
  name: string;
  age: number;
  photos: string[];
  bio: string;
  interests: string;
  pros: string;
  cons: string;
  occupation: string;
  likes: number;
  matches: number;
  isActive: boolean;
}