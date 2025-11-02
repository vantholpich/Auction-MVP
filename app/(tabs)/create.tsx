import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { createFriendProfile } from '../../src/services/friendProfileService';

export default function CreateFriendScreen() {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    bio: '',
    interests: '',
    pros: '',
    cons: '',
    occupation: '',
    auctionedBy: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    // Basic validation
    if (!formData.name || !formData.age || !formData.bio || !formData.occupation || !formData.auctionedBy) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    try {
      setIsSubmitting(true);
      
      await createFriendProfile({
        name: formData.name,
        age: parseInt(formData.age),
        bio: formData.bio,
        occupation: formData.occupation,
        interests: formData.interests,
        pros: formData.pros,
        cons: formData.cons,
        auctionedBy: formData.auctionedBy
      });

      Alert.alert('Success', 'Friend profile created successfully!');
      
      // Reset form
      setFormData({
        name: '',
        age: '',
        bio: '',
        interests: '',
        pros: '',
        cons: '',
        occupation: '',
        auctionedBy: ''
      });
      
      // Navigate back to auctions
      router.push('/(tabs)');
    } catch (error) {
      console.error('Error creating profile:', error);
      Alert.alert('Error', 'Failed to create profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>List Your Friend</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.introSection}>
            <Text style={styles.title}>Create Their Profile</Text>
            <Text style={styles.subtitle}>
              Fill in the details below to create an awesome profile for your friend.
            </Text>
          </View>

          {/* Friend's Name */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Friend's Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter your friend's name"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Age */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Age *</Text>
            <TextInput
              style={styles.input}
              value={formData.age}
              onChangeText={(text) => setFormData({ ...formData, age: text })}
              placeholder="Enter age"
              placeholderTextColor="#9ca3af"
              keyboardType="numeric"
            />
          </View>

          {/* Photos */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Photos</Text>
            <Text style={styles.helperText}>
              Add up to 6 photos. The first one will be their main profile picture.
            </Text>
            <View style={styles.photoGrid}>
              <TouchableOpacity style={styles.photoButton}>
                <Ionicons name="add" size={32} color="#ec4899" />
                <Text style={styles.photoButtonText}>Add Photo</Text>
              </TouchableOpacity>
              <View style={styles.photoPlaceholder}>
                <Ionicons name="add" size={32} color="#d1d5db" />
              </View>
              <View style={styles.photoPlaceholder}>
                <Ionicons name="add" size={32} color="#d1d5db" />
              </View>
            </View>
          </View>

          {/* Bio */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Bio *</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.bio}
              onChangeText={(text) => setFormData({ ...formData, bio: text })}
              placeholder="Tell us something interesting about them..."
              placeholderTextColor="#9ca3af"
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Interests */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Interests</Text>
            <TextInput
              style={styles.input}
              value={formData.interests}
              onChangeText={(text) => setFormData({ ...formData, interests: text })}
              placeholder="e.g., Hiking, Cooking, Video Games..."
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Pros */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pros</Text>
            <TextInput
              style={styles.input}
              value={formData.pros}
              onChangeText={(text) => setFormData({ ...formData, pros: text })}
              placeholder="What are their best qualities?"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Cons */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Cons</Text>
            <TextInput
              style={styles.input}
              value={formData.cons}
              onChangeText={(text) => setFormData({ ...formData, cons: text })}
              placeholder="Be honest, but kind!"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Occupation */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Occupation *</Text>
            <TextInput
              style={styles.input}
              value={formData.occupation}
              onChangeText={(text) => setFormData({ ...formData, occupation: text })}
              placeholder="What do they do for work?"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Auctioned By */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Your Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.auctionedBy}
              onChangeText={(text) => setFormData({ ...formData, auctionedBy: text })}
              placeholder="Who's listing this friend?"
              placeholderTextColor="#9ca3af"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>
              {isSubmitting ? 'Creating Profile...' : 'Create Friend Profile'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  placeholder: {
    width: 40,
  },
  scrollView: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  introSection: {
    marginBottom: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6b7280',
    lineHeight: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: '#000',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fdf2f8',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000',
    minHeight: 48,
  },
  textArea: {
    minHeight: 100,
    paddingTop: 12,
  },
  helperText: {
    fontSize: 14,
    color: '#6b7280',
    marginBottom: 12,
  },
  photoGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  photoButton: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#fdf2f8',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#ec4899',
    borderStyle: 'dashed',
  },
  photoButtonText: {
    fontSize: 14,
    color: '#ec4899',
    fontWeight: '500',
    marginTop: 4,
  },
  photoPlaceholder: {
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#fdf2f8',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButton: {
    backgroundColor: '#ec4899',
    borderRadius: 24,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  submitButtonDisabled: {
    opacity: 0.5,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },
});