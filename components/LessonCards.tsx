import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Platform,
  Image,
} from 'react-native';
import { Asset } from 'expo-asset';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PanGestureHandler, State, GestureHandlerRootView } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useAudioPlayer } from 'expo-audio';
import { Card } from '@/data/types';
import { philosophicalCards } from '@/data/cards';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Calculate card dimensions based on image aspect ratio (1024x1536 = 2:3)
const CARD_ASPECT_RATIO = 1024 / 1536; // 0.667
const CARD_WIDTH = SCREEN_WIDTH * 0.85; // Use 85% of screen width
const CARD_HEIGHT = CARD_WIDTH / CARD_ASPECT_RATIO;

// Preload all images to prevent loading delays
const imageMap: { [key: string]: any } = {
  '917dd5af-f82f-4f3c-a194-c94adb2172f5.png': require('../card_images/917dd5af-f82f-4f3c-a194-c94adb2172f5.png'),
  'af6566c3-f05a-45aa-8d26-1197f7ff0893.png': require('../card_images/af6566c3-f05a-45aa-8d26-1197f7ff0893.png'),
  'b0cd077e-0925-4838-8d95-b35ecaad178a.png': require('../card_images/b0cd077e-0925-4838-8d95-b35ecaad178a.png'),
  'e1ec474f-c935-44ba-9ee2-4d88d306d3b5.png': require('../card_images/e1ec474f-c935-44ba-9ee2-4d88d306d3b5.png'),
  'f861806e-d162-469e-aa63-6328e0da9af2.png': require('../card_images/f861806e-d162-469e-aa63-6328e0da9af2.png'),
};

const LessonCards: React.FC = () => {
  const [cards] = useState<Card[]>(philosophicalCards);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [cardsData, setCardsData] = useState(cards);
  const [currentAudioFile, setCurrentAudioFile] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [narrationEnabled, setNarrationEnabled] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const flipRotation = useSharedValue(0);
  const translateY = useSharedValue(0);
  const [startY, setStartY] = useState(0);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Web keyboard support
  useEffect(() => {
    if (Platform.OS === 'web') {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
          e.preventDefault();
          handleSwipe('up');
        } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
          e.preventDefault();
          handleSwipe('down');
        } else if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          handleFlip();
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [currentCardIndex, isFlipped]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getAudioSource = (audioFile: string) => {
    // Map audio files to require statements
    const audioMap: { [key: string]: any } = {
      'card1.mp3': require('../assets/audio/card1.mp3'),
      'card2.mp3': require('../assets/audio/card2.mp3'),
    };
    return audioMap[audioFile];
  };

  const getImageSource = (imageName: string) => {
    return imageMap[imageName] || imageMap['917dd5af-f82f-4f3c-a194-c94adb2172f5.png'];
  };

  // Preload all images on component mount
  useEffect(() => {
    const preloadImages = async () => {
      try {
        const imageAssets = Object.values(imageMap);
        await Asset.loadAsync(imageAssets);
        setImagesLoaded(true);
        console.log('All images preloaded successfully');
      } catch (error) {
        console.error('Error preloading images:', error);
        setImagesLoaded(true); // Continue anyway
      }
    };

    preloadImages();
  }, []);

  // Create audio player for current audio file
  const audioPlayer = useAudioPlayer(currentAudioFile ? getAudioSource(currentAudioFile) : null);

  const playAudio = async () => {
    try {
      const currentCard = cardsData[currentCardIndex];
      if (!currentCard.audio) return;

      const audioSource = getAudioSource(currentCard.audio);
      if (!audioSource) {
        console.log('Audio file not found:', currentCard.audio);
        return;
      }

      // Set current audio file and play
      setCurrentAudioFile(currentCard.audio);
      audioPlayer.seekTo(0); // Reset position
      audioPlayer.play();
      setIsPlaying(true);

      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log('Error playing audio:', error);
      setIsPlaying(false);
    }
  };

  const stopAudio = async () => {
    try {
      audioPlayer.pause();
      setIsPlaying(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    } catch (error) {
      console.log('Error stopping audio:', error);
    }
  };

  // Auto-play audio when card comes into focus (if narration enabled)
  useEffect(() => {
    if (!isFlipped && !isAnimating && narrationEnabled) {
      const currentCard = cardsData[currentCardIndex];
      if (currentCard.audio) {
        // Small delay to ensure card is fully in view
        const timer = setTimeout(() => {
          playAudio();
        }, 300);
        return () => clearTimeout(timer);
      }
    }
  }, [currentCardIndex, isFlipped, isAnimating, narrationEnabled]);

  // Monitor audio player status
  useEffect(() => {
    if (audioPlayer.isLoaded && audioPlayer.status?.didJustFinish) {
      setIsPlaying(false);
    }
  }, [audioPlayer.status]);

  const handleFlip = () => {
    // Stop audio when flipping
    if (isPlaying) {
      stopAudio();
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    
    flipRotation.value = withSpring(newFlippedState ? 180 : 0, {
      damping: 15,
      stiffness: 200,
    });
  };

  const handleResonance = (rating: number) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    const newCards = [...cardsData];
    newCards[currentCardIndex].resonance = rating;
    newCards[currentCardIndex].lastSeen = new Date();
    setCardsData(newCards);
  };

  const handleNotesChange = (notes: string) => {
    const newCards = [...cardsData];
    newCards[currentCardIndex].notes = notes;
    setCardsData(newCards);
  };

  const handleSwipe = (direction: 'up' | 'down') => {
    if (isAnimating) return; // Prevent multiple animations
    
    // Stop audio when swiping to different card
    if (isPlaying) {
      stopAudio();
    }
    
    if (direction === 'up' && currentCardIndex < cards.length - 1) {
      setIsAnimating(true);
      // Animate card sliding up and out
      translateY.value = withSpring(-SCREEN_HEIGHT, {
        damping: 25,
        stiffness: 300,
      });
      
      // After animation, switch card and slide in from bottom
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex + 1);
        setIsFlipped(false);
        flipRotation.value = 0;
        translateY.value = SCREEN_HEIGHT;
        translateY.value = withSpring(0, {
          damping: 25,
          stiffness: 300,
        });
        setTimeout(() => setIsAnimating(false), 200);
      }, 200);
    } else if (direction === 'down' && currentCardIndex > 0) {
      setIsAnimating(true);
      // Animate card sliding down and out
      translateY.value = withSpring(SCREEN_HEIGHT, {
        damping: 25,
        stiffness: 300,
      });
      
      // After animation, switch card and slide in from top
      setTimeout(() => {
        setCurrentCardIndex(currentCardIndex - 1);
        setIsFlipped(false);
        flipRotation.value = 0;
        translateY.value = -SCREEN_HEIGHT;
        translateY.value = withSpring(0, {
          damping: 25,
          stiffness: 300,
        });
        setTimeout(() => setIsAnimating(false), 200);
      }, 200);
    }
  };

  const onGestureEvent = (event: any) => {
    if (Platform.OS !== 'web') {
      translateY.value = event.nativeEvent.translationY;
    }
  };

  const onHandlerStateChange = (event: any) => {
    if (Platform.OS !== 'web') {
      if (event.nativeEvent.state === State.END) {
        const { translationY, velocityY } = event.nativeEvent;
        
        if (Math.abs(translationY) > 100 || Math.abs(velocityY) > 1000) {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          if (translationY < 0) {
            runOnJS(handleSwipe)('up');
          } else {
            runOnJS(handleSwipe)('down');
          }
        } else {
          translateY.value = withSpring(0);
        }
      }
    }
  };

  // Web-specific mouse handlers
  const handleMouseDown = (e: any) => {
    if (Platform.OS === 'web') {
      setStartY(e.clientY || e.touches?.[0]?.clientY || 0);
    }
  };

  const handleMouseUp = (e: any) => {
    if (Platform.OS === 'web') {
      const endY = e.clientY || e.changedTouches?.[0]?.clientY || 0;
      const diff = startY - endY;
      
      if (Math.abs(diff) > 50) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (diff > 0) {
          handleSwipe('up');
        } else {
          handleSwipe('down');
        }
      }
    }
  };

  // Web-specific wheel/scroll handler for touchpad
  const handleWheel = (e: any) => {
    if (Platform.OS === 'web' && !isAnimating) {
      e.preventDefault();
      const delta = e.deltaY;
      const newAccumulator = scrollAccumulator + delta;
      setScrollAccumulator(newAccumulator);
      
      // Threshold for swipe detection
      if (Math.abs(newAccumulator) > 100) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        if (newAccumulator > 0) {
          handleSwipe('up');
        } else {
          handleSwipe('down');
        }
        setScrollAccumulator(0);
      }
      
      // Reset accumulator after a delay if no more scrolling
      setTimeout(() => {
        setScrollAccumulator(0);
      }, 200);
    }
  };

  const frontAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [0, 180]);
    return {
      transform: [
        { rotateY: `${rotateY}deg` },
        { translateY: translateY.value },
      ],
      opacity: interpolate(flipRotation.value, [0, 90, 180], [1, 0, 0]),
    };
  });

  const backAnimatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(flipRotation.value, [0, 180], [180, 360]);
    return {
      transform: [
        { rotateY: `${rotateY}deg` },
        { translateY: translateY.value },
      ],
      opacity: interpolate(flipRotation.value, [0, 90, 180], [0, 0, 1]),
    };
  });

  const currentCard = cardsData[currentCardIndex];
  console.log('Current card index:', currentCardIndex, 'Image:', currentCard?.front?.image);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.timer}>
          <Ionicons name="time-outline" size={16} color="#64748b" />
          <Text style={styles.timerText}>{formatTime(sessionTime)}</Text>
        </View>
        <TouchableOpacity 
          style={styles.narrationToggle}
          onPress={() => {
            const newNarrationState = !narrationEnabled;
            setNarrationEnabled(newNarrationState);
            // Stop audio if turning narration off and audio is playing
            if (!newNarrationState && isPlaying) {
              stopAudio();
            }
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
        >
          <Ionicons 
            name={narrationEnabled ? "volume-high" : "volume-mute"} 
            size={20} 
            color={narrationEnabled ? "#6366f1" : "#9ca3af"} 
          />
        </TouchableOpacity>
        <Text style={styles.counter}>
          {currentCardIndex + 1} / {cards.length}
        </Text>
      </View>

      {!imagesLoaded ? (
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading images...</Text>
        </View>
      ) : Platform.OS === 'web' ? (
        <Animated.View 
          style={styles.cardContainer}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onWheel={handleWheel}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={handleFlip}
            style={styles.card}
          >
            <Animated.View style={[styles.cardFace, styles.cardFront, frontAnimatedStyle]}>
              <Image 
                key={`card-${currentCardIndex}-${currentCard.front.image}`}
                source={getImageSource(currentCard.front.image)} 
                style={styles.cardImageFull}
                fadeDuration={0}
                resizeMethod="resize"
              />
            </Animated.View>

            <Animated.View style={[styles.cardFace, styles.cardBack, backAnimatedStyle]}>
              <TouchableOpacity 
                activeOpacity={1}
                onPress={handleFlip}
                style={styles.backContent}
              >
                <TouchableOpacity onPress={handleFlip} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={20} color="#64748b" />
                </TouchableOpacity>

                  <Text style={styles.fullQuote}>&ldquo;{currentCard.back.fullQuote}&rdquo;</Text>
                  
                  <View style={styles.source}>
                    <Ionicons name="book-outline" size={16} color="#64748b" />
                    <Text style={styles.sourceText}>{currentCard.back.source}</Text>
                  </View>

                  <View style={styles.tags}>
                    <Ionicons name="pricetag-outline" size={16} color="#64748b" />
                    {currentCard.back.tags.map(tag => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.resonanceSection}>
                    <Text style={styles.resonanceTitle}>How much does this resonate?</Text>
                    <View style={styles.stars}>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <TouchableOpacity
                          key={rating}
                          onPress={(e) => {
                            e.stopPropagation();
                            handleResonance(rating);
                          }}
                          style={styles.starButton}
                        >
                          <Ionicons
                            name={rating <= currentCard.resonance ? "star" : "star-outline"}
                            size={32}
                            color={rating <= currentCard.resonance ? "#fbbf24" : "#d1d5db"}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.notesSection}>
                    <Text style={styles.notesTitle}>Your notes</Text>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                      <TextInput
                        style={styles.notesInput}
                        value={currentCard.notes}
                        onChangeText={handleNotesChange}
                        placeholder="Add your thoughts..."
                        multiline
                        numberOfLines={3}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onBlur={Keyboard.dismiss}
                      />
                    </TouchableWithoutFeedback>
                  </View>
              </TouchableOpacity>
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      ) : (
        <PanGestureHandler
          onGestureEvent={onGestureEvent}
          onHandlerStateChange={onHandlerStateChange}
        >
          <Animated.View style={styles.cardContainer}>
            <TouchableOpacity
              activeOpacity={1}
              onPress={handleFlip}
              style={styles.card}
            >
            <Animated.View style={[styles.cardFace, styles.cardFront, frontAnimatedStyle]}>
              <Image 
                key={`card-${currentCardIndex}-${currentCard.front.image}`}
                source={getImageSource(currentCard.front.image)} 
                style={styles.cardImageFull}
                fadeDuration={0}
                resizeMethod="resize"
              />
            </Animated.View>

            <Animated.View style={[styles.cardFace, styles.cardBack, backAnimatedStyle]}>
              <TouchableOpacity 
                activeOpacity={1}
                onPress={handleFlip}
                style={styles.backContent}
              >
                <TouchableOpacity onPress={handleFlip} style={styles.backButton}>
                  <Ionicons name="arrow-back" size={20} color="#64748b" />
                </TouchableOpacity>

                  <Text style={styles.fullQuote}>&ldquo;{currentCard.back.fullQuote}&rdquo;</Text>
                  
                  <View style={styles.source}>
                    <Ionicons name="book-outline" size={16} color="#64748b" />
                    <Text style={styles.sourceText}>{currentCard.back.source}</Text>
                  </View>

                  <View style={styles.tags}>
                    <Ionicons name="pricetag-outline" size={16} color="#64748b" />
                    {currentCard.back.tags.map(tag => (
                      <View key={tag} style={styles.tag}>
                        <Text style={styles.tagText}>{tag}</Text>
                      </View>
                    ))}
                  </View>

                  <View style={styles.resonanceSection}>
                    <Text style={styles.resonanceTitle}>How much does this resonate?</Text>
                    <View style={styles.stars}>
                      {[1, 2, 3, 4, 5].map(rating => (
                        <TouchableOpacity
                          key={rating}
                          onPress={(e) => {
                            e.stopPropagation();
                            handleResonance(rating);
                          }}
                          style={styles.starButton}
                        >
                          <Ionicons
                            name={rating <= currentCard.resonance ? "star" : "star-outline"}
                            size={32}
                            color={rating <= currentCard.resonance ? "#fbbf24" : "#d1d5db"}
                          />
                        </TouchableOpacity>
                      ))}
                    </View>
                  </View>

                  <View style={styles.notesSection}>
                    <Text style={styles.notesTitle}>Your notes</Text>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                      <TextInput
                        style={styles.notesInput}
                        value={currentCard.notes}
                        onChangeText={handleNotesChange}
                        placeholder="Add your thoughts..."
                        multiline
                        numberOfLines={3}
                        returnKeyType="done"
                        blurOnSubmit={true}
                        onBlur={Keyboard.dismiss}
                      />
                    </TouchableWithoutFeedback>
                  </View>
              </TouchableOpacity>
            </Animated.View>
            </TouchableOpacity>
          </Animated.View>
        </PanGestureHandler>
      )}

      <Text style={styles.swipeHint}>
        {Platform.OS === 'web' 
          ? 'Scroll, arrow keys, or drag to navigate • Space/Enter to flip'
          : 'Swipe up/down to navigate'
        }
      </Text>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1f5f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginHorizontal: 16,
    marginTop: 16,
  },
  timer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timerText: {
    fontSize: 14,
    color: '#64748b',
  },
  counter: {
    fontSize: 14,
    color: '#64748b',
  },
  narrationToggle: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#f8fafc',
  },
  cardContainer: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    alignSelf: 'center',
    marginVertical: 20,
    backgroundColor: 'transparent',
    position: 'relative',
  },
  card: {
    width: '100%',
    height: '100%',
    position: 'relative',
  },
  cardFace: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
    borderRadius: 0,
  },
  cardFront: {
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardBack: {
    backgroundColor: '#ffffff',
    padding: 24,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  backContent: {
    flex: 1,
  },
  cardImage: {
    width: 120,
    height: 120,
    marginBottom: 24,
    borderRadius: 12,
  },
  cardImageFull: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 16,
    resizeMode: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 16,
    textAlign: 'center',
  },
  insight: {
    fontSize: 18,
    color: '#374151',
    textAlign: 'center',
    lineHeight: 26,
    fontStyle: 'italic',
  },
  tapHint: {
    fontSize: 12,
    color: '#9ca3af',
    marginTop: 32,
  },
  audioButton: {
    marginTop: 16,
    marginBottom: 8,
    alignSelf: 'center',
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 16,
  },
  fullQuote: {
    fontSize: 16,
    color: '#374151',
    fontStyle: 'italic',
    lineHeight: 24,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    paddingLeft: 16,
  },
  source: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sourceText: {
    fontSize: 14,
    color: '#64748b',
    flex: 1,
  },
  tags: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 16,
  },
  tagText: {
    fontSize: 12,
    color: '#64748b',
  },
  resonanceSection: {
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
    paddingTop: 16,
    marginBottom: 16,
  },
  resonanceTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  stars: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  starButton: {
    padding: 4,
  },
  notesSection: {
    marginBottom: 16,
  },
  notesTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  notesInput: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    padding: 12,
    fontSize: 14,
    textAlignVertical: 'top',
    minHeight: 80,
  },
  swipeHint: {
    textAlign: 'center',
    fontSize: 12,
    color: '#9ca3af',
    paddingVertical: 16,
    backgroundColor: '#ffffff',
    marginHorizontal: 16,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: CARD_HEIGHT,
  },
  loadingText: {
    fontSize: 16,
    color: '#64748b',
    textAlign: 'center',
  },
});

export default LessonCards;