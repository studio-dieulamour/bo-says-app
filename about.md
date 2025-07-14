# Bo Says - Philosophical Flashcard App

## Post-Refactor Architecture

### Architecture Overview
This is an Expo React Native application using the new App Router pattern. The app displays philosophical flashcards with wisdom quotes from various traditions. **Recently refactored for improved organization and maintainability.**

### Current Program Flow

```
app/_layout.tsx (Root Layout)
├── ThemeProvider setup
├── Font loading (SpaceMono)
└── Stack Navigator
    ├── (tabs)/ - Tab Navigation
    └── +not-found.tsx

app/(tabs)/_layout.tsx (Tab Layout)
├── Tab Navigator setup
├── Home tab (index.tsx)
└── Explore tab (explore.tsx)

app/(tabs)/index.tsx (Home Screen)
└── Imports and renders: @/components/LessonCards

components/LessonCards.tsx (Main App Component)
├── Imports card data from @/data/cards
├── React Native implementation
├── Pan gesture handling
├── Cross-platform interaction (web/mobile)
└── State management (cards, flipping, navigation)

data/ (New - Organized Data Layer)
├── types.ts - TypeScript interfaces
├── cards.ts - Philosophical flashcard data
└── Utility functions for filtering/categorizing
```

### Key Components Used

**Active Components:**
- `components/LessonCards.tsx` - Main flashcard component (refactored to use data imports)
- `app/(tabs)/index.tsx` - Home screen entry point
- `app/(tabs)/explore.tsx` - Enhanced with app statistics and wisdom tradition breakdown
- `app/_layout.tsx` - Root layout with theme and navigation
- `app/(tabs)/_layout.tsx` - Tab navigation layout

**Supporting Components (in use):**
- `components/ui/IconSymbol.tsx` - Icon rendering for tabs
- `components/ui/TabBarBackground.tsx` - Tab bar styling
- `components/HapticTab.tsx` - Haptic feedback for tabs
- `components/Collapsible.tsx` - Used in enhanced explore tab
- `components/ParallaxScrollView.tsx` - Used in enhanced explore tab
- `components/ThemedText.tsx` - Used in enhanced explore tab
- `components/ThemedView.tsx` - Used in enhanced explore tab
- `hooks/useColorScheme.tsx` - Theme detection

### Refactor Changes Completed

**Files Removed (Cleanup):**
- ✅ `lesson-cards-app.tsx` - Removed duplicate/unused component
- ✅ `components/HelloWave.tsx` - Removed unused component

**New Data Organization:**
- ✅ `data/types.ts` - TypeScript interfaces for Card, CardCategory, etc.
- ✅ `data/cards.ts` - Extracted all 24 philosophical cards with utility functions
- ✅ Enhanced explore tab with live app statistics and philosophical tradition breakdown

**Code Improvements:**
- ✅ Separated data concerns from component logic
- ✅ Added utility functions for filtering cards by tradition/tags
- ✅ Enhanced explore screen with meaningful app content instead of template
- ✅ Maintained all existing functionality while improving organization

### Updated File Structure

```
expo-test/
├── data/                         # ✅ NEW - Organized data layer
│   ├── types.ts                  # ✅ NEW - TypeScript interfaces
│   └── cards.ts                  # ✅ NEW - Card data + utilities
├── app/                          # ✅ Active - App Router structure
│   ├── _layout.tsx               # ✅ Active - Root layout
│   ├── +not-found.tsx            # ✅ Active - 404 handling
│   └── (tabs)/                   # ✅ Active - Tab navigation
│       ├── _layout.tsx           # ✅ Active - Tab layout
│       ├── index.tsx             # ✅ Active - Home screen
│       └── explore.tsx           # ✅ Enhanced - Now shows app statistics
├── components/                   # ✅ Active - Component library
│   ├── LessonCards.tsx           # ✅ Refactored - Now imports data
│   ├── ui/                       # ✅ Active - UI components
│   ├── Collapsible.tsx           # ✅ Active - Used in explore tab
│   ├── ParallaxScrollView.tsx    # ✅ Active - Used in explore tab
│   ├── ThemedText.tsx            # ✅ Active - Used in explore tab
│   └── ThemedView.tsx            # ✅ Active - Used in explore tab
├── hooks/                        # ✅ Active - Custom hooks
├── constants/                    # ✅ Active - App constants
└── assets/                       # ✅ Active - Static assets
```

### Card Data Structure

Each flashcard contains:
```typescript
{
  id: number;
  front: {
    title: string;      // Book/source name
    insight: string;    // Main quote/insight
    image: string;      // Emoji representation
  };
  back: {
    fullQuote: string;  // Extended quote with context
    source: string;     // Author and source citation
    tags: string[];     // Categorization tags
  };
  resonance: number;    // User rating (0-5 stars)
  notes: string;        // Personal notes
  lastSeen: Date;       // Last viewed timestamp
}
```

### Philosophical Content Included

**24 Total Cards from 8 Traditions:**
1. **Stoicism** (5 cards) - Marcus Aurelius Meditations, Seneca Letters
2. **Sufi Mysticism** (4 cards) - Rumi teachings
3. **Transcendentalism** (3 cards) - Ralph Waldo Emerson
4. **Existential Psychology** (3 cards) - Viktor Frankl's Logotherapy
5. **Analytical Psychology** (3 cards) - Carl Jung
6. **Eastern Philosophy** (2 cards) - Tao Te Ching, Buddhism
7. **Ancient Chinese Wisdom** (2 cards) - Confucius, I Ching
8. **Habits & Growth** (2 cards) - Atomic Habits, Tiny Experiments

### Data Layer Features

The new `data/` directory provides:

**Card Management:**
- `getCardCount()` - Returns total number of cards
- `getCardsByTag(tag)` - Filter cards by specific tags
- `getCardsByTradition(tradition)` - Filter by philosophical tradition
- `getTraditionCounts()` - Statistics for explore screen

**Type Safety:**
- `Card` interface with front/back structure
- `CardCategory` interface for future categorization
- `PhilosophicalTradition` type for tradition filtering

### Explore Screen Enhancement

The explore tab now displays:
- **Live Statistics**: Total cards and breakdown by tradition
- **Usage Guide**: How to interact with the flashcards
- **Featured Sources**: Overview of philosophers and authors included
- **App Description**: Purpose and philosophy behind Bo Says

---

## Future Enhancement Opportunities

### Phase 2: User Experience (Future)
1. **Persistence**: Add AsyncStorage for user progress and ratings
2. **Search**: Add filtering by tags, content, or tradition
3. **Progress Tracking**: Show learning statistics and streaks
4. **Favorites**: Mark and easily access favorite cards
5. **Export**: Share insights or progress with others

### Phase 3: Advanced Features (Future)
1. **State Management**: Consider Zustand/Redux for complex state
2. **Navigation**: Add card detail views or tradition-based browsing
3. **Accessibility**: Improve screen reader support and keyboard navigation
4. **Performance**: Lazy loading for large card sets
5. **Social**: Share quotes or create custom card collections

The current refactor creates a solid foundation for these future enhancements while maintaining the core philosophical learning experience.