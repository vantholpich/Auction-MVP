import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Linking,
  Alert,
  Platform,
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

  const openSocialMedia = async (platform: 'instagram' | 'facebook', username: string) => {
    let url = '';
    
    if (platform === 'instagram') {
      if (Platform.OS === 'web') {
        url = `https://instagram.com/${username}`;
      } else {
        // Try app first, fallback to web
        const appUrl = `instagram://user?username=${username}`;
        const webUrl = `https://instagram.com/${username}`;
        
        try {
          const canOpen = await Linking.canOpenURL(appUrl);
          url = canOpen ? appUrl : webUrl;
        } catch {
          url = webUrl;
        }
      }
    } else if (platform === 'facebook') {
      if (Platform.OS === 'web') {
        url = `https://facebook.com/${username}`;
      } else {
        // Try app first, fallback to web
        const appUrl = `fb://profile/${username}`;
        const webUrl = `https://facebook.com/${username}`;
        
        try {
          const canOpen = await Linking.canOpenURL(appUrl);
          url = canOpen ? appUrl : webUrl;
        } catch {
          url = webUrl;
        }
      }
    }

    try {
      await Linking.openURL(url);
    } catch (error) {
      Alert.alert('Error', 'Could not open social media profile');
    }
  };

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
            <Text style={styles.name}>
              {person.name}, {person.age}
            </Text>
            
            <Text style={styles.bio} numberOfLines={2}>
              {person.bio}
            </Text>
            
            {/* Social Media Links */}
            {(person.instagram || person.facebook) && (
              <View style={styles.socialContainer}>
                {person.instagram && (
                  <TouchableOpacity 
                    style={styles.socialItem}
                    onPress={() => openSocialMedia('instagram', person.instagram!)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="logo-instagram" size={16} color="#E4405F" />
                    <Text style={styles.socialText}>@{person.instagram}</Text>
                  </TouchableOpacity>
                )}
                {person.facebook && (
                  <TouchableOpacity 
                    style={styles.socialItem}
                    onPress={() => openSocialMedia('facebook', person.facebook!)}
                    activeOpacity={0.7}
                  >
                    <Ionicons name="logo-facebook" size={16} color="#1877F2" />
                    <Text style={styles.socialText}>{person.facebook}</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}
            
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
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  content: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 24,
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
  socialContainer: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 8,
  },
  socialItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  socialText: {
    color: '#ffffff',
    fontSize: 12,
    opacity: 0.9,
  },
});
    