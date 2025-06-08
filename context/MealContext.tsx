import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Meal } from '@/types/meal';

interface MealContextType {
  meals: Meal[];
  addMeal: (meal: Omit<Meal, 'id'>) => void;
  updateMeal: (id: string, meal: Partial<Meal>) => void;
  deleteMeal: (id: string) => void;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: ReactNode }) {
  const [meals, setMeals] = useState<Meal[]>([
    {
      id: '1',
      restaurantName: 'The Garden Bistro',
      mealName: 'Truffle Pasta',
      description: 'Handmade pasta with black truffle and parmesan',
      rating: 5,
      date: new Date().toISOString(),
      imageUrl: 'https://images.pexels.com/photos/1279330/pexels-photo-1279330.jpeg',
      price: 32,
      cuisine: 'Italian',
      location: 'Downtown',
    },
    {
      id: '2',
      restaurantName: 'Sakura Sushi',
      mealName: 'Omakase Selection',
      description: 'Chef\'s choice of fresh sashimi and nigiri',
      rating: 4,
      date: new Date(Date.now() - 86400000).toISOString(),
      imageUrl: 'https://images.pexels.com/photos/248444/pexels-photo-248444.jpeg',
      price: 65,
      cuisine: 'Japanese',
      location: 'Midtown',
    },
  ]);

  const addMeal = (meal: Omit<Meal, 'id'>) => {
    const newMeal = {
      ...meal,
      id: Date.now().toString(),
    };
    setMeals(prev => [newMeal, ...prev]);
  };

  const updateMeal = (id: string, updatedMeal: Partial<Meal>) => {
    setMeals(prev => prev.map(meal => 
      meal.id === id ? { ...meal, ...updatedMeal } : meal
    ));
  };

  const deleteMeal = (id: string) => {
    setMeals(prev => prev.filter(meal => meal.id !== id));
  };

  return (
    <MealContext.Provider value={{ meals, addMeal, updateMeal, deleteMeal }}>
      {children}
    </MealContext.Provider>
  );
}

export function useMeals() {
  const context = useContext(MealContext);
  if (context === undefined) {
    throw new Error('useMeals must be used within a MealProvider');
  }
  return context;
}