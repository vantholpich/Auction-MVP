import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

interface OnboardingScreenProps {
  onComplete: () => void;
}

const onboardingSteps = [
  {
    id: 1,
    title: "Welcome to Friend Auction!",
    description: "The fun way to help your friends find their perfect match",
    icon: "heart-outline",
    color: "#ec4899"
  },
  {
    id: 2,
    title: "List Your Friends",
    description: "Create profiles for your single friends with photos, bios, and what makes them awesome",
    icon: "person-add-outline",
    color: "#8b5cf6"
  },
  {
    id: 3,
    title: "They Appear on Auction",
    description: "Your friends' profiles will show up for others to discover and connect with",
    icon: "albums-outline",
    color: "#06b6d4"
  },
  {
    id: 4,
    title: "Swipe Up to Browse",
    description: "Simply swipe up or tap the arrow to browse through profiles. Connect via their social media!",
    icon: "arrow-up-outline",
    color: "#06b6d4"
  }
];

export default function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const skipOnboarding = () => {
    onComplete();
  };

  const currentStepData = onboardingSteps[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={skipOnboarding}>
        <Text style={styles.skipText}>Skip</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.content}>
        {/* Icon */}
        <View style={[styles.iconContainer, { backgroundColor: `${currentStepData.color}20` }]}>
          <Ionicons 
            name={currentStepData.icon as any} 
            size={80} 
            color={currentStepData.color} 
          />
        </View>

        {/* Title */}
        <Text style={styles.title}>{currentStepData.title}</Text>

        {/* Description */}
        <Text style={styles.description}>{currentStepData.description}</Text>

        {/* Step Indicators */}
        <View style={styles.stepIndicators}>
          {onboardingSteps.map((_, index) => (
            <View
              key={index}
              style={[
                styles.stepDot,
                {
                  backgroundColor: index === currentStep ? currentStepData.color : '#e5e7eb',
                  width: index === currentStep ? 24 : 8,
                }
              ]}
            />
          ))}
        </View>
      </View>

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        {/* Next/Get Started Button */}
        <TouchableOpacity 
          style={[styles.nextButton, { backgroundColor: currentStepData.color }]} 
          onPress={nextStep}
        >
          <Text style={styles.nextButtonText}>
            {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
          </Text>
          <Ionicons 
            name={currentStep === onboardingSteps.length - 1 ? 'checkmark' : 'arrow-forward'} 
            size={20} 
            color="#ffffff" 
            style={styles.buttonIcon}
          />
        </TouchableOpacity>

        {/* Step Counter */}
        <Text style={styles.stepCounter}>
          {currentStep + 1} of {onboardingSteps.length}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  skipButton: {
    alignSelf: 'flex-end',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  skipText: {
    fontSize: 16,
    color: '#6b7280',
    fontWeight: '500',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  iconContainer: {
    width: 160,
    height: 160,
    borderRadius: 80,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#111827',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 18,
    color: '#6b7280',
    textAlign: 'center',
    lineHeight: 26,
    marginBottom: 40,
  },
  stepIndicators: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepDot: {
    height: 8,
    borderRadius: 4,
  },
  bottomSection: {
    paddingHorizontal: 32,
    paddingBottom: 32,
    alignItems: 'center',
  },
  nextButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 24,
    width: '100%',
    marginBottom: 16,
  },
  nextButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
  },
  buttonIcon: {
    marginLeft: 8,
  },
  stepCounter: {
    fontSize: 14,
    color: '#9ca3af',
  },
});