# FoodieApp

A beautiful mobile-first meal logging application built with Expo and Supabase.

## Features

- User authentication (sign up/sign in)
- Log restaurant meals with ratings, photos, and details
- View meal history with search and filtering
- Beautiful, production-ready UI design
- Real-time data sync with Supabase

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open the app in your browser or scan the QR code with the Expo Go app

## Admin Test Credentials

For testing purposes, you can use these admin credentials:

**Email:** admin@foodieapp.com  
**Password:** Admin123!

This account has been pre-configured for testing all app features.

## Database Schema

The app uses Supabase with the following main table:

### meals
- `id` (uuid, primary key)
- `user_id` (uuid, foreign key to auth.users)
- `restaurant_name` (text, required)
- `meal_name` (text, required)
- `description` (text, optional)
- `rating` (integer, 1-5, required)
- `price` (numeric, optional)
- `cuisine` (text, optional)
- `location` (text, optional)
- `image_url` (text, optional)
- `created_at` (timestamp)
- `updated_at` (timestamp)

## Tech Stack

- **Frontend:** React Native with Expo
- **Backend:** Supabase (PostgreSQL + Auth)
- **Navigation:** Expo Router
- **Styling:** React Native StyleSheet
- **Icons:** Lucide React Native
- **Fonts:** Inter (Google Fonts)

## Project Structure

```
app/
├── _layout.tsx              # Root layout
├── (auth)/                  # Authentication screens
│   ├── login.tsx
│   └── signup.tsx
└── (tabs)/                  # Main app tabs
    ├── index.tsx            # Home screen
    ├── add.tsx              # Add meal screen
    └── history.tsx          # Meal history screen

components/
├── MealCard.tsx             # Meal display component
└── StarRating.tsx           # Rating component

context/
└── MealContext.tsx          # Meal data management

hooks/
├── useAuth.ts               # Authentication hook
└── useFrameworkReady.ts     # Framework initialization

lib/
└── supabase.ts              # Supabase client

types/
├── database.ts              # Database type definitions
└── meal.ts                  # Meal type definitions
```

## Environment Variables

Create a `.env` file with your Supabase credentials:

```
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Features Overview

### Authentication
- Secure email/password authentication
- User session management
- Protected routes

### Meal Logging
- Add restaurant meals with detailed information
- 5-star rating system
- Photo upload support
- Price and cuisine tracking
- Location notes

### Meal History
- View all logged meals
- Search by restaurant, meal, or cuisine
- Sort by date, rating, or name
- Beautiful card-based layout

### User Experience
- Mobile-first responsive design
- Smooth animations and transitions
- Intuitive navigation
- Error handling and loading states
- Production-ready UI components