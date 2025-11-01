import { useState, useEffect } from 'react';
import { AuctionsView } from './components/AuctionsView';
import { CreateFriendProfileView } from './components/CreateFriendProfileView';
import { BottomNavigation } from './components/BottomNavigation';
import { toast } from 'sonner';
import { Person } from './types';
import { getFriendProfiles } from './services/friendProfileService';

type ViewType = 'auctions' | 'my-friends';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('auctions');
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

  // Load friend profiles from Supabase
  useEffect(() => {
    loadProfiles();
  }, []);

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const profiles = await getFriendProfiles();
      setPeople(profiles);
    } catch (error) {
      console.error('Error loading profiles:', error);
      toast.error('Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProfile = () => {
    toast.success('Friend profile created successfully!');
    setCurrentView('auctions');
    // Reload profiles to include the new one
    loadProfiles();
  };



  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profiles...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      {currentView === 'auctions' && (
        <AuctionsView
          people={people}
          onPersonSelect={() => {}} // Simplified - no detailed profile view
        />
      )}

      {currentView === 'my-friends' && (
        <CreateFriendProfileView
          onBack={() => setCurrentView('auctions')}
          onCreateProfile={handleCreateProfile}
        />
      )}

      {/* Bottom Navigation - Hide on my-friends view */}
      {currentView === 'auctions' && (
        <BottomNavigation
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      )}
    </div>
  );
}