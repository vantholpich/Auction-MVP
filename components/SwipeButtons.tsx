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
  onNext: () => void;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export default function SwipeButtons({ onNext }: SwipeButtonsProps) {
  const nextScale = useSharedValue(1);

  const handleNextPress = () => {
    nextScale.value = withSpring(0.9, {}, () => {
      nextScale.value = withSpring(1);
    });
    onNext();
  };

  const nextAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: nextScale.value }],
  }));

  return (
    <View style={styles.container}>
      <AnimatedTouchableOpacity
        style={[styles.nextButton, nextAnimatedStyle]}
        onPress={handleNextPress}
        activeOpacity={0.8}
      >
        <Ionicons name="arrow-up" size={40} color="#ffffff" />
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
  },
  nextButton: {
    width: 80,
    height: 80,
    backgroundColor: '#06b6d4',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 12,
  },
});