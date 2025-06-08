import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Star, MapPin, DollarSign } from 'lucide-react-native';
import { Meal } from '@/types/meal';

interface MealCardProps {
  meal: Meal;
  onPress?: () => void;
}

export function MealCard({ meal, onPress }: MealCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={16}
        color={i < rating ? '#F59E0B' : '#E5E7EB'}
        fill={i < rating ? '#F59E0B' : 'none'}
      />
    ));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.card}>
        {meal.imageUrl && (
          <Image source={{ uri: meal.imageUrl }} style={styles.image} />
        )}
        <View style={styles.content}>
          <View style={styles.header}>
            <Text style={styles.restaurantName}>{meal.restaurantName}</Text>
            <Text style={styles.date}>{formatDate(meal.date)}</Text>
          </View>
          
          <Text style={styles.mealName}>{meal.mealName}</Text>
          
          {meal.description && (
            <Text style={styles.description} numberOfLines={2}>
              {meal.description}
            </Text>
          )}
          
          <View style={styles.footer}>
            <View style={styles.rating}>
              {renderStars(meal.rating)}
            </View>
            
            <View style={styles.metadata}>
              {meal.location && (
                <View style={styles.metaItem}>
                  <MapPin size={14} color="#6B7280" />
                  <Text style={styles.metaText}>{meal.location}</Text>
                </View>
              )}
              {meal.price && (
                <View style={styles.metaItem}>
                  <DollarSign size={14} color="#6B7280" />
                  <Text style={styles.metaText}>${meal.price}</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  restaurantName: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
    flex: 1,
    marginRight: 8,
  },
  date: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
  mealName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#374151',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rating: {
    flexDirection: 'row',
    gap: 2,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#6B7280',
  },
});