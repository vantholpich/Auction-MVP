import { motion, useMotionValue, useTransform } from 'motion/react';
import { Person } from '../types';
import { Heart, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AuctionCardProps {
  person: Person;
  onSwipe: (direction: 'left' | 'right') => void;
  onTap: () => void;
}

export function AuctionCard({ person, onSwipe, onTap }: AuctionCardProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-25, 25]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0, 1, 1, 1, 0]);

  const handleDragEnd = () => {
    const currentX = x.get();
    if (currentX > 100) {
      onSwipe('right');
    } else if (currentX < -100) {
      onSwipe('left');
    }
  };

  return (
    <motion.div
      className="absolute inset-4 bg-white rounded-3xl shadow-2xl overflow-hidden cursor-pointer"
      style={{ x, rotate, opacity }}
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      onClick={onTap}
      whileHover={{ scale: 1.02 }}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="relative h-full">
        <ImageWithFallback
          src={person.image}
          alt={person.name}
          className="w-full h-full object-cover"
        />
        
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        
        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="w-5 h-5 text-pink-500 fill-current" />
            <span className="text-sm opacity-90">{person.bids} Bids</span>
          </div>
          
          <h2 className="text-2xl font-bold mb-1">
            {person.name}, {person.age}
          </h2>
          
          <p className="text-sm opacity-90 mb-3 line-clamp-2">
            {person.bio}
          </p>
          
          <div className="text-xs opacity-75">
            Auctioned by {person.auctionedBy}
          </div>
        </div>
      </div>
    </motion.div>
  );
}