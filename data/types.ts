export interface Card {
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
  audio?: string;       // Audio file path for quote reading
  resonance: number;    // User rating (0-5 stars)
  notes: string;        // Personal notes
  lastSeen: Date;       // Last viewed timestamp
}

export interface CardCategory {
  id: string;
  name: string;
  description: string;
  tags: string[];
}

export type PhilosophicalTradition = 
  | 'habits'
  | 'eastern'
  | 'stoicism'
  | 'transcendentalism'
  | 'existential'
  | 'sufism'
  | 'psychology'
  | 'ancient-wisdom';