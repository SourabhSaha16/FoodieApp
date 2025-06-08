import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Meal, CreateMealData } from '@/types/meal';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/hooks/useAuth';

interface MealContextType {
  meals: Meal[];
  loading: boolean;
  error: string | null;
  addMeal: (meal: CreateMealData) => Promise<void>;
  updateMeal: (id: string, meal: Partial<CreateMealData>) => Promise<void>;
  deleteMeal: (id: string) => Promise<void>;
  refreshMeals: () => Promise<void>;
}

const MealContext = createContext<MealContextType | undefined>(undefined);

export function MealProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [meals, setMeals] = useState<Meal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMeals = async () => {
    if (!user) {
      setMeals([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('meals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) {
        throw fetchError;
      }

      setMeals(data || []);
    } catch (err) {
      console.error('Error fetching meals:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch meals');
    } finally {
      setLoading(false);
    }
  };

  const addMeal = async (mealData: CreateMealData) => {
    if (!user) {
      throw new Error('User must be authenticated to add meals');
    }

    try {
      setError(null);

      const { data, error: insertError } = await supabase
        .from('meals')
        .insert([
          {
            ...mealData,
            user_id: user.id,
          },
        ])
        .select()
        .single();

      if (insertError) {
        throw insertError;
      }

      setMeals(prev => [data, ...prev]);
    } catch (err) {
      console.error('Error adding meal:', err);
      setError(err instanceof Error ? err.message : 'Failed to add meal');
      throw err;
    }
  };

  const updateMeal = async (id: string, mealData: Partial<CreateMealData>) => {
    if (!user) {
      throw new Error('User must be authenticated to update meals');
    }

    try {
      setError(null);

      const { data, error: updateError } = await supabase
        .from('meals')
        .update(mealData)
        .eq('id', id)
        .eq('user_id', user.id)
        .select()
        .single();

      if (updateError) {
        throw updateError;
      }

      setMeals(prev => prev.map(meal => meal.id === id ? data : meal));
    } catch (err) {
      console.error('Error updating meal:', err);
      setError(err instanceof Error ? err.message : 'Failed to update meal');
      throw err;
    }
  };

  const deleteMeal = async (id: string) => {
    if (!user) {
      throw new Error('User must be authenticated to delete meals');
    }

    try {
      setError(null);

      const { error: deleteError } = await supabase
        .from('meals')
        .delete()
        .eq('id', id)
        .eq('user_id', user.id);

      if (deleteError) {
        throw deleteError;
      }

      setMeals(prev => prev.filter(meal => meal.id !== id));
    } catch (err) {
      console.error('Error deleting meal:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete meal');
      throw err;
    }
  };

  const refreshMeals = async () => {
    await fetchMeals();
  };

  useEffect(() => {
    fetchMeals();
  }, [user]);

  return (
    <MealContext.Provider value={{ 
      meals, 
      loading, 
      error, 
      addMeal, 
      updateMeal, 
      deleteMeal, 
      refreshMeals 
    }}>
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