import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Person } from '../src/types';

const { width } = Dimensions.get('window');
const SWIPE_THRESHOLD = width * 0.25;

interface AuctionCardProps {
  person: Person;
  onSwipe: (direction: 'left' | 'right') => void;
  onTap: () => void;
}

export default function AuctionCard({ person, onSwipe, onTap }: AuctionCardProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
    })
    .onEnd(() => {
      const shouldSwipeRight = translateX.value > SWIPE_THRESHOLD;
      const shouldSwipeLeft = translateX.value < -SWIPE_THRESHOLD;

      if (shouldSwipeRight) {
        translateX.value = withSpring(width * 2);
        runOnJS(onSwipe)('right');
      } else if (shouldSwipeLeft) {
        translateX.value = withSpring(-width * 2);
        runOnJS(onSwipe)('left');
      } else {
        // Snap back to center
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    });

  const cardStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      translateX.value,
      [-200, 0, 200],
      [-25, 0, 25]
    );

    const opacity = interpolate(
      Math.abs(translateX.value),
      [0, 200],
      [1, 0]
    );

    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        { rotate: `${rotate}deg` },
      ],
      opacity,
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <Animated.View style={[styles.card, cardStyle]}>
        <TouchableOpacity style={styles.cardContent} onPress={onTap} activeOpacity={0.95}>
          <Image
            source={{ uri: person.image || 'https://via.placeholder.com/400x600' }}
            style={styles.image}
            resizeMode="cover"
          />
          
          {/* Gradient overlay */}
          <View style={styles.overlay} />
          
          {/* Content */}
          <View style={styles.content}>
            <View style={styles.bidsContainer}>
              <Ionicons name="heart" size={20} color="#ec4899" />
              <Text style={styles.bidsText}>{person.bids} Bids</Text>
            </View>
            
            <Text style={styles.name}>
              {person.name}, {person.age}
            </Text>
            
            <Text style={styles.bio} numberOfLines={2}>
              {person.bio}
            </Text>
            
            <Text style={styles.auctionedBy}>
              Auctioned by {person.auctionedBy}
            </Text>
          </View>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 24,
    margin: 8, // Reduced margin to make cards taller
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 16,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    backgroundColor: 'transparent',
    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
  },
  bidsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  bidsText: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
    marginLeft: 8,
  },
  name: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  bio: {
    color: '#ffffff',
    fontSize: 14,
    opacity: 0.9,
    marginBottom: 12,
    lineHeight: 20,
  },
  auctionedBy: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.75,
  },
});
    