import { useState } from 'react';
import { ArrowLeft, Heart, Users, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyFriendsViewProps {
  onBack: () => void;
  onAuctionFriend: () => void;
}

export function MyFriendsView({ onBack, onAuctionFriend }: MyFriendsViewProps) {
  const [activeTab, setActiveTab] = useState<'auctioned' | 'liked'>('auctioned');

  const activeProfiles = [
    {
      id: 1,
      name: "Sophia's Profile",
      image: "https://images.unsplash.com/photo-1697095098675-1d02496ef86a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwd29tYW4lMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzU4MjA0NjUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      likes: 24,
      matches: 3,
    },
  ];

  const pastProfiles = [
    {
      id: 2,
      name: "Ethan's Profile",
      image: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMHlvdW5nJTIwbWFuJTIwcHJvZmVzc2lvbmFsfGVufDF8fHx8MTc1ODE4NDE0M3ww&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Profile is now inactive.",
    },
    {
      id: 3,
      name: "Olivia's Profile",
      image: "https://images.unsplash.com/photo-1581664467483-c05270a796c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3J0cmFpdCUyMGNhc3VhbCUyMHlvdW5nJTIwcGVyc29ufGVufDF8fHx8MTc1ODIzOTI4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
      status: "Profile is now inactive.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white px-6 py-4 flex items-center">
        <button onClick={onBack} className="p-2 -ml-2">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="flex-1 text-center mr-10">My Friends/Liked Profiles</h1>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="flex px-6">
          <button
            onClick={() => setActiveTab('auctioned')}
            className={`flex-1 py-4 relative ${
              activeTab === 'auctioned' ? 'text-pink-600' : 'text-gray-500'
            }`}
          >
            Friends I've Auctioned
            {activeTab === 'auctioned' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('liked')}
            className={`flex-1 py-4 relative ${
              activeTab === 'liked' ? 'text-pink-600' : 'text-gray-500'
            }`}
          >
            Profiles I've Liked
            {activeTab === 'liked' && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-600" />
            )}
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Active Profiles */}
        <div>
          <h3 className="mb-4">Active Profiles</h3>
          <div className="space-y-4">
            {activeProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0">
                  <ImageWithFallback
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4>{profile.name}</h4>
                  <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-pink-600" />
                      {profile.likes} Likes
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-gray-400" />
                      {profile.matches} Matches
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button
                      variant="outline"
                      className="flex-1 h-9 rounded-full border-gray-300"
                    >
                      Edit
                    </Button>
                    <Button className="flex-1 h-9 rounded-full bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Past Profiles */}
        <div>
          <h3 className="mb-4">Past Profiles</h3>
          <div className="space-y-4">
            {pastProfiles.map((profile) => (
              <div
                key={profile.id}
                className="bg-white rounded-2xl p-4 flex items-center gap-4"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-gray-200 flex-shrink-0">
                  <ImageWithFallback
                    src={profile.image}
                    alt={profile.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h4>{profile.name}</h4>
                  <p className="text-sm text-gray-500 mt-1">{profile.status}</p>
                  <div className="mt-3">
                    <Button
                      variant="outline"
                      className="w-full h-9 rounded-full border-gray-300"
                    >
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Auction a Friend Button */}
      <div className="fixed bottom-24 left-0 right-0 px-6">
        <Button
          onClick={onAuctionFriend}
          className="w-full h-14 bg-gradient-to-r from-pink-500 to-pink-600 hover:from-pink-600 hover:to-pink-700 rounded-full shadow-lg"
        >
          <Plus className="w-5 h-5 mr-2" />
          Auction a Friend
        </Button>
      </div>
    </div>
  );
}
