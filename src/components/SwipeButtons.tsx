import { X, Heart } from 'lucide-react';
import { motion } from 'motion/react';

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
}

export function SwipeButtons({ onPass, onLike }: SwipeButtonsProps) {
  return (
    <div className="flex items-center justify-center gap-8 pb-8">
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onPass}
        className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center"
      >
        <X className="w-8 h-8 text-gray-400" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onLike}
        className="w-20 h-20 bg-gradient-to-r from-pink-500 to-red-500 rounded-full shadow-lg flex items-center justify-center"
      >
        <Heart className="w-10 h-10 text-white fill-current" />
      </motion.button>
    </div>
  );
}