import { useState, useEffect } from 'react';
import { Person } from '../types';
import { AuctionCard } from './AuctionCard';
import { SwipeButtons } from './SwipeButtons';
import { Menu, Filter } from 'lucide-react';
import { recordInteraction, getPassedProfiles, getLikedProfiles } from '../services/userInteractionService';

interface AuctionsViewProps {
  people: Person[];
  onPersonSelect: (person: Person) => void;
}

export function AuctionsView({ people, onPersonSelect }: AuctionsViewProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);

  // Filter out people the user has already interacted with
  useEffect(() => {
    const filterPeople = async () => {
      try {
        const [passedIds, likedIds] = await Promise.all([
          getPassedProfiles(),
          getLikedProfiles()
        ]);
        
        const interactedIds = new Set([...passedIds, ...likedIds]);
        const filtered = people.filter(person => !interactedIds.has(person.id));
        setFilteredPeople(filtered);
      } catch (error) {
        console.error('Error filtering people:', error);
        setFilteredPeople(people);
      }
    };

    if (people.length > 0) {
      filterPeople();
    }
  }, [people]);

  const handleSwipe = async (direction: 'left' | 'right') => {
    const currentPerson = filteredPeople[currentIndex];
    if (currentPerson) {
      // Record the interaction
      const action = direction === 'left' ? 'pass' : 'like';
      await recordInteraction(currentPerson.id, action);
    }
    
    // Move to next person
    setCurrentIndex((prev) => (prev + 1) % filteredPeople.length);
  };

  const handlePass = () => handleSwipe('left');
  const handleLike = () => handleSwipe('right');

  const currentPerson = filteredPeople[currentIndex];

  if (!currentPerson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-100 to-orange-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-600 mb-2">No more auctions!</h2>
          <p className="text-gray-500">Check back later for new people.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-orange-100">
      {/* Header */}
      <div className="flex items-center justify-between p-6 py-2">
        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Menu className="w-5 h-5 text-gray-700" />
        </button>
        
        <h1 className="text-2xl font-bold text-gray-800">Auctions</h1>
        
        <button className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
          <Filter className="w-5 h-5 text-gray-700" />
        </button>
      </div>

      {/* Cards Stack */}
      <div className="relative h-[calc(100vh-200px)] mx-4">
        {filteredPeople.slice(currentIndex, currentIndex + 3).map((person, index) => (
          <div
            key={person.id}
            className="absolute inset-0"
            style={{
              zIndex: 3 - index,
              transform: `scale(${1 - index * 0.05}) translateY(${index * 8}px)`,
            }}
          >
            <AuctionCard
              person={person}
              onSwipe={handleSwipe}
              onTap={() => {}} // Simplified for MVP
            />
          </div>
        ))}
      </div>

      {/* Swipe Buttons */}
      <SwipeButtons onPass={handlePass} onLike={handleLike} />
    </div>
  );
}