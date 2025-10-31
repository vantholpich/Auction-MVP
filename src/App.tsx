import { useState } from 'react';
import { ViewType, Person } from './types';
import { mockPeople } from './data/mockData';
import { AuctionsView } from './components/AuctionsView';
import { ProfileView } from './components/ProfileView';
import { MyBidsView } from './components/MyBidsView';
import { SettingsView } from './components/SettingsView';
import { CreateFriendProfileView } from './components/CreateFriendProfileView';
import { MyFriendsView } from './components/MyFriendsView';
import { BottomNavigation } from './components/BottomNavigation';
import { toast } from 'sonner@2.0.3';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('auctions');
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null);

  const handlePersonSelect = (person: Person) => {
    setSelectedPerson(person);
  };

  const handleBackToAuctions = () => {
    setSelectedPerson(null);
  };

  const handlePlaceBid = () => {
    toast.success('Bid placed successfully!');
    setSelectedPerson(null);
  };

  const handleMessage = () => {
    toast.info('Message sent!');
  };

  const handleNavigate = (view: 'create-friend' | 'my-friends') => {
    setCurrentView(view);
  };

  const handleBackToProfile = () => {
    setCurrentView('profile');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully');
    setCurrentView('auctions');
  };

  const handleCreateProfile = () => {
    setCurrentView('my-friends');
  };

  const handleAuctionFriend = () => {
    setCurrentView('create-friend');
  };

  // If a person is selected, show their profile
  if (selectedPerson) {
    return (
      <ProfileView
        person={selectedPerson}
        onBack={handleBackToAuctions}
        onPlaceBid={handlePlaceBid}
        onMessage={handleMessage}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Main Content */}
      {currentView === 'auctions' && (
        <AuctionsView
          people={mockPeople}
          onPersonSelect={handlePersonSelect}
        />
      )}
      
      {currentView === 'my-bids' && (
        <MyBidsView
          people={mockPeople}
          onPersonSelect={handlePersonSelect}
        />
      )}
      
      {currentView === 'my-friends' && (
        <MyFriendsView
          onBack={handleBackToProfile}
          onAuctionFriend={handleAuctionFriend}
        />
      )}
      
      {currentView === 'profile' && (
        <SettingsView
          onNavigate={handleNavigate}
          onLogout={handleLogout}
        />
      )}

      {currentView === 'create-friend' && (
        <CreateFriendProfileView
          onBack={handleBackToProfile}
          onCreateProfile={handleCreateProfile}
        />
      )}

      {/* Bottom Navigation - Hide on certain views */}
      {!['create-friend'].includes(currentView) && (
        <BottomNavigation
          currentView={currentView}
          onViewChange={setCurrentView}
        />
      )}
    </div>
  );
}