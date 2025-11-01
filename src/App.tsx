import { useState } from 'react';
import { mockPeople } from './data/mockData';
import { AuctionsView } from './components/AuctionsView';
import { CreateFriendProfileView } from './components/CreateFriendProfileView';
import { BottomNavigation } from './components/BottomNavigation';
import { toast } from 'sonner';

type ViewType = 'auctions' | 'my-friends';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('auctions');

  const handleCreateProfile = () => {
    toast.success('Friend profile created successfully!');
    setCurrentView('auctions');
  };



  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      {currentView === 'auctions' && (
        <AuctionsView
          people={mockPeople}
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