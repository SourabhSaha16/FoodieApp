export interface Meal {
  id: string;
  restaurantName: string;
  mealName: string;
  description?: string;
  rating: number;
  date: string;
  imageUrl?: string;
  price?: number;
  cuisine?: string;
  location?: string;
}