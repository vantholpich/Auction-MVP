import React from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface SwipeButtonsProps {
  onPass: () => void;
  onLike: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function SwipeButtons({ onPass, onLike }: SwipeButtonsProps) {
  const passScale = useSharedValue(1);
  const likeScale = useSharedValue(1);

  const handlePassPress = () => {
    passScale.value = withSpring(0.9, {}, () => {
      passScale.value = withSpring(1);
    });
    onPass();
  };

  const handleLikePress = () => {
    likeScale.value = withSpring(0.9, {}, () => {
      likeScale.value = withSpring(1);
    });
    onLike();
  };

  const passAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: passScale.value }],
  }));

  const likeAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: likeScale.value }],
  }));

  return (
    <View style={styles.container}>
      <AnimatedTouchableOpacity
        style={[styles.passButton, passAnimatedStyle]}
        onPress={handlePassPress}
        activeOpacity={0.8}
      >
        <Ionicons name="close" size={32} color="#9ca3af" />
      </AnimatedTouchableOpacity>
      
      <AnimatedTouchableOpacity
        style={[styles.likeButton, likeAnimatedStyle]}
        onPress={handleLikePress}
        activeOpacity={0.8}
      >
        <Ionicons name="heart" size={40} color="#ffffff" />
      </AnimatedTouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 0,
    gap: 32,
  },
  passButton: {
    width: 64,
    height: 64,
    backgroundColor: '#ffffff',
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 0,
  },
  likeButton: {
    width: 80,
    height: 80,
    backgroundColor: '#ec4899',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
});