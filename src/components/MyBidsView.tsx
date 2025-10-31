import { Calendar, DollarSign, Clock } from 'lucide-react';
import { Person } from '../types';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface MyBidsViewProps {
  people: Person[];
  onPersonSelect: (person: Person) => void;
}

export function MyBidsView({ people, onPersonSelect }: MyBidsViewProps) {
  // Mock bid data - in a real app this would come from a backend
  const myBids = [
    { person: people[0], amount: 150, status: 'winning', timeLeft: '2h 15m' },
    { person: people[1], amount: 120, status: 'outbid', timeLeft: '5h 30m' },
    { person: people[2], amount: 200, status: 'winning', timeLeft: '1d 3h' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Header */}
      <div className="bg-white px-6 py-4 pt-12 border-b border-gray-200">
        <h1 className="text-2xl font-bold text-gray-800">My Bids</h1>
        <p className="text-gray-600 mt-1">{myBids.length} active bids</p>
      </div>

      {/* Bids List */}
      <div className="px-6 py-4">
        {myBids.length === 0 ? (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-600 mb-2">No bids yet</h2>
            <p className="text-gray-500">Start bidding on auctions to see them here!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {myBids.map((bid, index) => (
              <div
                key={index}
                onClick={() => onPersonSelect(bid.person)}
                className="bg-white rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-200">
                    <ImageWithFallback
                      src={bid.person.image}
                      alt={bid.person.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-lg">
                        {bid.person.name}, {bid.person.age}
                      </h3>
                      <Badge
                        variant={bid.status === 'winning' ? 'default' : 'destructive'}
                        className={
                          bid.status === 'winning'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }
                      >
                        {bid.status === 'winning' ? 'Winning' : 'Outbid'}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4" />
                        <span>${bid.amount}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{bid.timeLeft} left</span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mt-1 line-clamp-1">
                      {bid.person.bio}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}