export interface Meal {
  id: string;
  user_id: string;
  restaurant_name: string;
  meal_name: string;
  description?: string | null;
  rating: number;
  price?: number | null;
  cuisine?: string | null;
  location?: string | null;
  image_url?: string | null;
  created_at: string;
  updated_at: string;
}

export interface CreateMealData {
  restaurant_name: string;
  meal_name: string;
  description?: string;
  rating: number;
  price?: number;
  cuisine?: string;
  location?: string;
  image_url?: string;
}