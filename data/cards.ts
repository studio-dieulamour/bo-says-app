import { Card } from './types';

export const philosophicalCards: Card[] = [
  {
    id: 1,
    front: {
      title: "Transformation",
      insight: "When I let go of what I am, I become what I might be.",
      image: "917dd5af-f82f-4f3c-a194-c94adb2172f5.png"
    },
    back: {
      fullQuote: "When I let go of what I am, I become what I might be. The sage is not trapped by limitations of identity or past experience. True growth requires releasing attachment to who we think we are.",
      source: "Lao Tzu - Tao Te Ching, Verse 22",
      tags: ["taoism", "transformation", "letting-go", "identity"],
    },
    resonance: 0,
    notes: "",
    lastSeen: new Date()
  },
  {
    id: 2,
    front: {
      title: "Inner Strength",
      insight: "You have power over your mind—not outside events. Realize this, and you will find strength.",
      image: "af6566c3-f05a-45aa-8d26-1197f7ff0893.png"
    },
    back: {
      fullQuote: "You have power over your mind—not outside events. Realize this, and you will find strength. For it is never the events themselves that disturb us, but our judgments on them.",
      source: "Marcus Aurelius - Meditations, Book 2",
      tags: ["stoicism", "control", "mindfulness", "inner-strength"],
    },
    resonance: 0,
    notes: "",
    lastSeen: new Date()
  },
  {
    id: 3,
    front: {
      title: "Systems Thinking",
      insight: "You do not rise to the level of your goals. You fall to the level of your systems.",
      image: "b0cd077e-0925-4838-8d95-b35ecaad178a.png"
    },
    back: {
      fullQuote: "You do not rise to the level of your goals. You fall to the level of your systems. Your goal is your desired outcome. Your system is the collection of daily habits that will get you there. Winners and losers have the same goals.",
      source: "James Clear - Atomic Habits, Chapter 1",
      tags: ["habits", "systems", "productivity", "goals"],
    },
    resonance: 0,
    notes: "",
    lastSeen: new Date()
  },
  {
    id: 4,
    front: {
      title: "Buddhist Wisdom",
      insight: "The root of suffering is attachment.",
      image: "e1ec474f-c935-44ba-9ee2-4d88d306d3b5.png"
    },
    back: {
      fullQuote: "The root of suffering is attachment. When we cling to things, people, or outcomes, we create the conditions for our own suffering. Liberation comes from letting go and accepting the impermanent nature of all things.",
      source: "Buddha - Four Noble Truths",
      tags: ["buddhism", "suffering", "attachment", "mindfulness", "liberation"],
    },
    resonance: 0,
    notes: "",
    lastSeen: new Date()
  },
  {
    id: 5,
    front: {
      title: "Natural Rhythm",
      insight: "Nature does not hurry, yet everything is accomplished.",
      image: "f861806e-d162-469e-aa63-6328e0da9af2.png"
    },
    back: {
      fullQuote: "Nature does not hurry, yet everything is accomplished. The Tao works without forcing, achieves without striving. In stillness and patience, all things unfold in their proper time.",
      source: "Lao Tzu - Tao Te Ching, Verse 2",
      tags: ["taoism", "patience", "natural-rhythm", "wu-wei", "timing"],
    },
    resonance: 0,
    notes: "",
    lastSeen: new Date()
  }
];

export const getCardsByTag = (tag: string): Card[] => {
  return philosophicalCards.filter(card => 
    card.back.tags.includes(tag)
  );
};

export const getCardsByTradition = (tradition: string): Card[] => {
  const traditionTags: Record<string, string[]> = {
    'stoicism': ['stoicism'],
    'transcendentalism': ['transcendentalism'],
    'sufism': ['sufism'],
    'psychology': ['psychology', 'logotherapy'],
    'eastern': ['taoism', 'buddhism'],
    'ancient-wisdom': ['ancient-wisdom'],
    'habits': ['habits', 'experimentation']
  };
  
  const tags = traditionTags[tradition] || [];
  return philosophicalCards.filter(card => 
    card.back.tags.some(tag => tags.includes(tag))
  );
};

export const getCardCount = (): number => philosophicalCards.length;

export const getTraditionCounts = () => {
  return {
    'Stoicism': getCardsByTradition('stoicism').length,
    'Transcendentalism': getCardsByTradition('transcendentalism').length,
    'Sufism': getCardsByTradition('sufism').length,
    'Psychology': getCardsByTradition('psychology').length,
    'Eastern Philosophy': getCardsByTradition('eastern').length,
    'Ancient Wisdom': getCardsByTradition('ancient-wisdom').length,
    'Habits & Growth': getCardsByTradition('habits').length,
  };
};