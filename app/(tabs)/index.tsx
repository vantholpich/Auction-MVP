import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Person } from '../../src/types';
import { getFriendProfiles } from '../../src/services/friendProfileService';
import { recordInteraction, getPassedProfiles, getLikedProfiles } from '../../src/services/userInteractionService';
import AuctionCard from '../../components/AuctionCard';
import SwipeButtons from '../../components/SwipeButtons';

const { width, height } = Dimensions.get('window');

export default function AuctionsScreen() {
  const [people, setPeople] = useState<Person[]>([]);
  const [filteredPeople, setFilteredPeople] = useState<Person[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  // Load friend profiles from Supabase
  useEffect(() => {
    loadProfiles();
  }, []);

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

  const loadProfiles = async () => {
    try {
      setLoading(true);
      const profiles = await getFriendProfiles();
      setPeople(profiles);
    } catch (error) {
      console.error('Error loading profiles:', error);
      Alert.alert('Error', 'Failed to load profiles');
    } finally {
      setLoading(false);
    }
  };

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

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading profiles...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentPerson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No more auctions!</Text>
          <Text style={styles.emptySubtitle}>Check back later for new people.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="menu" size={20} color="#374151" />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>ListLook</Text>
        
        <TouchableOpacity style={styles.headerButton}>
          <Ionicons name="filter" size={20} color="#374151" />
        </TouchableOpacity>
      </View>

      {/* Cards Stack */}
      <View style={styles.cardsContainer}>
        {filteredPeople.slice(currentIndex, currentIndex + 3).map((person, index) => (
          <View
            key={person.id}
            style={[
              styles.cardWrapper,
              {
                zIndex: 3 - index,
                transform: [
                  { scale: 1 - index * 0.05 },
                  { translateY: index * 8 }
                ],
              }
            ]}
          >
            <AuctionCard
              person={person}
              onSwipe={handleSwipe}
              onTap={() => {}} // Simplified for MVP
            />
          </View>
        ))}
      </View>

      {/* Swipe Buttons */}
      <SwipeButtons onPass={handlePass} onLike={handleLike} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fdf2f8', // pink-50 equivalent
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#6b7280',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#4b5563',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#6b7280',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
  },
  headerButton: {
    width: 40,
    height: 40,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },
  cardsContainer: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 0, // Space for swipe buttons
  },
  cardWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});