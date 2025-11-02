# Friend Auction App - React Native Expo

A mobile app built with React Native and Expo that allows users to create and browse friend profiles in an auction-style interface.

## Features

- 📱 **Native Mobile Experience** - Built with React Native and Expo
- 🔄 **File-based Routing** - Using Expo Router for navigation
- 💾 **Supabase Backend** - Real-time database with PostgreSQL
- 🎨 **StyleSheet Styling** - Native React Native styling
- 👆 **Gesture-based Interactions** - Swipe cards with React Native Reanimated
- 📊 **User Interaction Tracking** - Anonymous session-based tracking

## Tech Stack

- **React Native** - Mobile app framework
- **Expo** - Development platform and toolchain
- **Expo Router** - File-based routing system
- **TypeScript** - Type safety
- **Supabase** - Backend as a Service
- **React Native Reanimated** - Smooth animations
- **React Native Gesture Handler** - Touch interactions
- **AsyncStorage** - Local data persistence

## Project Structure

```
├── app/                    # File-based routing
│   ├── (tabs)/            # Tab navigation group
│   │   ├── index.tsx      # Auctions screen
│   │   ├── create.tsx     # Create friend profile screen
│   │   └── _layout.tsx    # Tab layout
│   └── _layout.tsx        # Root layout
├── components/            # React Native components
│   ├── AuctionCard.tsx    # Swipeable profile card
│   └── SwipeButtons.tsx   # Like/Pass buttons
├── src/
│   ├── services/          # API services
│   ├── types/             # TypeScript types
│   └── lib/               # Utilities and config
└── assets/                # Images and static files
```

## Getting Started

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- Expo CLI (`npm install -g @expo/cli`)
- iOS Simulator (for iOS development)
- Android Studio/Emulator (for Android development)

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and add your Supabase credentials:
   ```env
   EXPO_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
   ```

3. **Set up Supabase database:**
   - Follow the instructions in `SUPABASE_SETUP.md`
   - Run the SQL schema in your Supabase dashboard

### Running the App

1. **Start the development server:**
   ```bash
   npm start
   ```

2. **Run on specific platforms:**
   ```bash
   # iOS Simulator
   npm run ios
   
   # Android Emulator
   npm run android
   
   # Web browser
   npm run web
   ```

3. **Using Expo Go:**
   - Install Expo Go on your mobile device
   - Scan the QR code from the terminal
   - The app will load on your device

## App Screens

### 🏠 Auctions (Home)
- Browse friend profiles in a card-based interface
- Swipe left to pass, right to like
- Tap buttons to pass/like
- Tracks user interactions to avoid showing same profiles

### 👥 Create Friend Profile
- Form to create new friend profiles
- Required fields: Name, Age, Bio, Occupation, Your Name
- Optional fields: Interests, Pros, Cons
- Photo upload placeholder (ready for implementation)

## Key Components

### AuctionCard
- Swipeable card component using React Native Gesture Handler
- Smooth animations with React Native Reanimated
- Displays profile information with gradient overlay

### SwipeButtons
- Animated pass/like buttons
- Provides alternative to swiping gestures
- Smooth scale animations on press

## Database Schema

The app uses the same Supabase schema as the web version:

- **friend_profiles** - Store friend profile data
- **testimonials** - Store testimonials for each friend
- **bids** - Store bids on friend profiles
- **user_interactions** - Track user likes/passes

## Styling

The app uses React Native StyleSheet for styling:

- **Consistent Design System** - Colors, spacing, and typography
- **Responsive Layout** - Adapts to different screen sizes
- **Native Feel** - Platform-specific styling where appropriate

## Development

### Adding New Screens

1. Create a new file in the `app/` directory
2. Export a React component as default
3. The file name becomes the route (e.g., `profile.tsx` → `/profile`)

### Adding New Components

1. Create components in the `components/` directory
2. Use React Native components (View, Text, TouchableOpacity, etc.)
3. Style with StyleSheet.create()

### Environment Variables

Use `EXPO_PUBLIC_` prefix for variables that need to be available in the app:

```env
EXPO_PUBLIC_SUPABASE_URL=your-url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-key
```

## Building for Production

### Development Build
```bash
expo build:android
expo build:ios
```

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for production
eas build --platform all
```

## Deployment

### Expo Go (Development)
- Automatically available when running `expo start`
- Great for testing and development

### App Stores
- Use EAS Build to create production builds
- Submit to Google Play Store and Apple App Store
- Follow Expo's deployment guides

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test on both iOS and Android
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For issues and questions:
- Check the Expo documentation
- Review Supabase guides
- Open an issue in this repository