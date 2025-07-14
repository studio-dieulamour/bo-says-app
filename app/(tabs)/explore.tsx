import { StyleSheet } from 'react-native';

import { Collapsible } from '@/components/Collapsible';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { IconSymbol } from '@/components/ui/IconSymbol';
import { getCardCount, getTraditionCounts } from '@/data/cards';

export default function ExploreScreen() {
  const totalCards = getCardCount();
  const traditionCounts = getTraditionCounts();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <IconSymbol
          size={310}
          color="#808080"
          name="book.closed"
          style={styles.headerImage}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Explore Wisdom</ThemedText>
      </ThemedView>
      <ThemedText>
        Discover philosophical insights from {totalCards} carefully curated cards spanning multiple wisdom traditions.
      </ThemedText>
      
      <Collapsible title="Philosophical Traditions">
        <ThemedView style={styles.traditionContainer}>
          {Object.entries(traditionCounts).map(([tradition, count]) => (
            <ThemedView key={tradition} style={styles.traditionRow}>
              <ThemedText type="defaultSemiBold">{tradition}</ThemedText>
              <ThemedText style={styles.traditionCount}>{count} cards</ThemedText>
            </ThemedView>
          ))}
        </ThemedView>
        <ThemedText style={styles.traditionDescription}>
          Each tradition offers unique perspectives on life, meaning, and personal growth.
        </ThemedText>
      </Collapsible>

      <Collapsible title="How to Use Bo Says">
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Tap cards</ThemedText> to flip and read the full quote
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Swipe or use arrow keys</ThemedText> to navigate between cards
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Rate insights</ThemedText> with the star system based on personal resonance
        </ThemedText>
        <ThemedText>
          • <ThemedText type="defaultSemiBold">Add notes</ThemedText> to capture your thoughts and reflections
        </ThemedText>
      </Collapsible>

      <Collapsible title="Featured Sources">
        <ThemedText>
          <ThemedText type="defaultSemiBold">Ancient Wisdom:</ThemedText> Lao Tzu, Buddha, Confucius, I Ching
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Stoic Philosophy:</ThemedText> Marcus Aurelius, Seneca
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Modern Psychology:</ThemedText> Viktor Frankl, Carl Jung
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Mystical Poetry:</ThemedText> Rumi's Sufi teachings
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Transcendentalism:</ThemedText> Ralph Waldo Emerson
        </ThemedText>
        <ThemedText>
          <ThemedText type="defaultSemiBold">Personal Development:</ThemedText> James Clear, Sam Schillace
        </ThemedText>
      </Collapsible>

      <Collapsible title="About the App">
        <ThemedText>
          Bo Says is designed to bring philosophical wisdom into your daily routine through 
          bite-sized, reflective flashcards. Each card contains a meaningful insight that 
          can spark contemplation and personal growth.
        </ThemedText>
        <ThemedText style={styles.aboutNote}>
          The app encourages mindful engagement with each quote, allowing you to rate 
          how much each insight resonates with you and add personal notes for future reflection.
        </ThemedText>
      </Collapsible>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  traditionContainer: {
    gap: 8,
    marginVertical: 8,
  },
  traditionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  traditionCount: {
    opacity: 0.7,
    fontSize: 14,
  },
  traditionDescription: {
    marginTop: 8,
    fontStyle: 'italic',
    opacity: 0.8,
  },
  aboutNote: {
    marginTop: 8,
    fontStyle: 'italic',
    opacity: 0.8,
  },
});
