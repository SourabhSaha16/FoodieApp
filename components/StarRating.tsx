import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Star } from 'lucide-react-native';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  size?: number;
  readonly?: boolean;
}

export function StarRating({ 
  rating, 
  onRatingChange, 
  size = 24, 
  readonly = false 
}: StarRatingProps) {
  const handleStarPress = (starRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(starRating);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length: 5 }, (_, i) => {
        const starRating = i + 1;
        const isFilled = starRating <= rating;
        
        const StarComponent = readonly ? View : TouchableOpacity;
        
        return (
          <StarComponent
            key={i}
            onPress={readonly ? undefined : () => handleStarPress(starRating)}
            style={styles.star}
          >
            <Star
              size={size}
              color={isFilled ? '#F59E0B' : '#E5E7EB'}
              fill={isFilled ? '#F59E0B' : 'none'}
            />
          </StarComponent>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: 4,
  },
  star: {
    padding: 4,
  },
});