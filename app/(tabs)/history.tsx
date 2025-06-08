import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Search, Filter } from 'lucide-react-native';
import { MealProvider, useMeals } from '@/context/MealContext';
import { MealCard } from '@/components/MealCard';

function HistoryContent() {
  const { meals } = useMeals();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'date' | 'rating' | 'name'>('date');

  const filteredMeals = meals
    .filter(meal => {
      const query = searchQuery.toLowerCase();
      return (
        meal.restaurantName.toLowerCase().includes(query) ||
        meal.mealName.toLowerCase().includes(query) ||
        meal.description?.toLowerCase().includes(query) ||
        meal.cuisine?.toLowerCase().includes(query)
      );
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'date':
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case 'rating':
          return b.rating - a.rating;
        case 'name':
          return a.restaurantName.localeCompare(b.restaurantName);
        default:
          return 0;
      }
    });

  const getSortButtonStyle = (sortType: typeof sortBy) => [
    styles.sortButton,
    sortBy === sortType && styles.sortButtonActive,
  ];

  const getSortButtonTextStyle = (sortType: typeof sortBy) => [
    styles.sortButtonText,
    sortBy === sortType && styles.sortButtonTextActive,
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal History</Text>
        <Text style={styles.subtitle}>
          {meals.length} meal{meals.length !== 1 ? 's' : ''} logged
        </Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search meals, restaurants..."
            placeholderTextColor="#9CA3AF"
          />
        </View>
      </View>

      <View style={styles.filtersContainer}>
        <View style={styles.filterRow}>
          <View style={styles.filterIcon}>
            <Filter size={16} color="#6B7280" />
          </View>
          <Text style={styles.filterLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            <TouchableOpacity
              style={getSortButtonStyle('date')}
              onPress={() => setSortBy('date')}
            >
              <Text style={getSortButtonTextStyle('date')}>Date</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getSortButtonStyle('rating')}
              onPress={() => setSortBy('rating')}
            >
              <Text style={getSortButtonTextStyle('rating')}>Rating</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={getSortButtonStyle('name')}
              onPress={() => setSortBy('name')}
            >
              <Text style={getSortButtonTextStyle('name')}>Name</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <ScrollView 
        style={styles.scrollView} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {filteredMeals.length > 0 ? (
          <View style={styles.mealsContainer}>
            {filteredMeals.map((meal) => (
              <MealCard key={meal.id} meal={meal} />
            ))}
          </View>
        ) : (
          <View style={styles.emptyState}>
            {searchQuery ? (
              <>
                <Text style={styles.emptyTitle}>No meals found</Text>
                <Text style={styles.emptyDescription}>
                  Try adjusting your search terms or browse all meals.
                </Text>
                <TouchableOpacity
                  style={styles.clearButton}
                  onPress={() => setSearchQuery('')}
                >
                  <Text style={styles.clearButtonText}>Clear Search</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <Text style={styles.emptyTitle}>No meals logged yet</Text>
                <Text style={styles.emptyDescription}>
                  Start logging your restaurant experiences to see them here.
                </Text>
              </>
            )}
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

export default function HistoryScreen() {
  return (
    <MealProvider>
      <HistoryContent />
    </MealProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingBottom: 16,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  searchInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    gap: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#111827',
  },
  filtersContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  filterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  filterIcon: {
    marginRight: 4,
  },
  filterLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
    marginLeft: 8,
  },
  sortButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  sortButtonActive: {
    backgroundColor: '#F97316',
  },
  sortButtonText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#6B7280',
  },
  sortButtonTextActive: {
    color: '#FFFFFF',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  mealsContainer: {
    paddingHorizontal: 24,
    gap: 8,
  },
  emptyState: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 32,
    margin: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emptyTitle: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    marginBottom: 8,
  },
  emptyDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 20,
  },
  clearButton: {
    backgroundColor: '#F97316',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  clearButtonText: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#FFFFFF',
  },
});