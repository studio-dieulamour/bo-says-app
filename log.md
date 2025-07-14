# Development Log - Bo Says Audio Integration

## Audio Playback Implementation

### Overview
Added comprehensive audio playback functionality to the philosophical flashcard app, allowing quotes to be read aloud when cards are displayed.

### Changes Implemented

#### 1. Data Structure Updates
- **File**: `data/types.ts`
- **Change**: Added optional `audio?: string` property to Card interface
- **Purpose**: Allow cards to reference audio files for quote reading

#### 2. Card Data Enhancement
- **File**: `data/cards.ts`
- **Change**: Added audio file references to cards
  - Card 1: `audio: "card1.mp3"` (Atomic Habits quote)
  - Card 2: `audio: "card2.mp3"` (Tao Te Ching quote)
- **Purpose**: Link specific audio files to their corresponding flashcards

#### 3. Audio Infrastructure
- **Dependency**: Installed `expo-av` package for audio playback
- **Directory**: Created `assets/audio/` directory for storing MP3 files
- **Files Added**: 
  - `assets/audio/card1.mp3`
  - `assets/audio/card2.mp3`

#### 4. Core Audio Functionality (`components/LessonCards.tsx`)

##### State Management
- Added `sound` state for Audio.Sound instance management
- Added `isPlaying` state for play/pause button UI updates
- Added `narrationEnabled` state for auto-play control

##### Audio Functions
- **`getAudioSource()`**: Maps audio filenames to require() statements
- **`playAudio()`**: Loads and plays audio files with error handling
- **`stopAudio()`**: Stops current audio playback
- **Audio cleanup**: useEffect for proper sound unloading on unmount

##### UI Components
- **Audio Button**: Play/pause button with Ionicons
  - Shows play-circle when stopped
  - Shows pause-circle when playing
  - Only appears on cards with audio files
  - Includes haptic feedback
- **Narration Toggle**: Speaker icon in top navigation bar
  - Shows volume-high when enabled (blue)
  - Shows volume-mute when disabled (gray)
  - Controls auto-play behavior
  - Includes haptic feedback
- **Styling**: Added `audioButton` and `narrationToggle` styles for proper positioning

#### 5. Auto-Play Behavior
- **Trigger**: Audio automatically plays when card front comes into focus
- **Conditions**: 
  - Card has audio file
  - Card is showing front side (not flipped)
  - No animation in progress
  - Narration mode is enabled
  - 300ms delay for smooth transition
- **Dependencies**: Responds to `currentCardIndex`, `isFlipped`, `isAnimating`, and `narrationEnabled` changes

#### 6. Auto-Stop Behavior
Audio automatically stops when:
- **Card is flipped**: From front to back or vice versa
- **Card navigation**: Swiping/scrolling to different card
- **Manual control**: User taps pause button
- **Narration disabled**: User turns off narration mode while audio is playing

#### 7. Narration Mode Control
- **Toggle Location**: Top navigation bar between timer and card counter
- **Visual States**: 
  - Enabled: volume-high icon in blue (#6366f1)
  - Disabled: volume-mute icon in gray (#9ca3af)
- **Functionality**:
  - Controls whether audio auto-plays when cards come into focus
  - Manual play buttons work regardless of narration mode
  - Stops current audio when narration is disabled
  - Persists user preference during session
- **User Experience**: Haptic feedback on toggle, smooth visual transitions

#### 8. Cross-Platform Support
- **Web**: Full functionality with keyboard controls maintained
- **Mobile**: Touch gestures and haptic feedback integrated
- **Audio buttons**: Added to both web and mobile card implementations
- **Narration toggle**: Consistent behavior across all platforms

### Technical Implementation Details

#### Audio File Management
```typescript
const audioMap: { [key: string]: any } = {
  'card1.mp3': require('../assets/audio/card1.mp3'),
  'card2.mp3': require('../assets/audio/card2.mp3'),
};
```

#### Smart State Management
- Prevents memory leaks with proper audio cleanup
- Handles audio state across card transitions
- Manages multiple simultaneous audio prevention

#### User Experience Features
- **Haptic feedback** on audio controls
- **Visual feedback** with dynamic play/pause icons
- **Seamless integration** with existing flip and swipe animations
- **Non-intrusive UI** - audio button only appears when needed

### Usage Instructions

#### For Users
1. Navigate to any card with audio (cards 1-2 currently)
2. Audio plays automatically when card appears (if narration mode is enabled)
3. Toggle narration mode using the speaker icon in the top navigation bar
4. Tap audio button to pause/resume manually
5. Audio stops automatically when flipping or changing cards

#### For Developers (Adding More Audio)
1. Add MP3 file to `assets/audio/`
2. Update card data with `audio: "filename.mp3"`
3. Add filename to `audioMap` in `LessonCards.tsx`

### Performance Considerations
- Audio files loaded on-demand (not preloaded)
- Proper cleanup prevents memory accumulation
- Optimized state updates to prevent unnecessary re-renders
- Error handling for missing or corrupted audio files

### Future Enhancement Opportunities
- Audio speed controls
- Volume controls
- Audio caching for offline use
- Text-to-speech fallback for cards without audio files
- Audio visualization/waveforms
- Multiple language audio tracks