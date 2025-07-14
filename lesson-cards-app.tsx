import React, { useState, useEffect } from 'react';
import { Star, Clock, Book, Tag, ArrowLeft } from 'lucide-react';

const LessonCardsApp = () => {
  const [cards, setCards] = useState([
    {
      id: 1,
      front: {
        title: "Atomic Habits",
        insight: "You do not rise to the level of your goals. You fall to the level of your systems.",
        image: "📚"
      },
      back: {
        fullQuote: "You do not rise to the level of your goals. You fall to the level of your systems. Your goal is your desired outcome. Your system is the collection of daily habits that will get you there.",
        source: "James Clear - Atomic Habits, Chapter 1",
        tags: ["habits", "systems", "productivity"],
      },
      resonance: 0,
      notes: "",
      lastSeen: new Date()
    },
    {
      id: 2,
      front: {
        title: "Tao Te Ching",
        insight: "When nothing is done, nothing is left undone.",
        image: "☯️"
      },
      back: {
        fullQuote: "The Tao does nothing, yet nothing is left undone. If powerful people could center themselves in it, the whole world would be transformed by itself, in its natural rhythms.",
        source: "Lao Tzu - Tao Te Ching, Verse 37",
        tags: ["taoism", "wu-wei", "philosophy"],
      },
      resonance: 0,
      notes: "",
      lastSeen: new Date()
    },
    {
      id: 3,
      front: {
        title: "Buddhism",
        insight: "The root of suffering is attachment.",
        image: "🪷"
      },
      back: {
        fullQuote: "The root of suffering is attachment. When we cling to things, people, or outcomes, we create the conditions for our own suffering. Liberation comes from letting go.",
        source: "Buddha - Four Noble Truths",
        tags: ["buddhism", "suffering", "mindfulness"],
      },
      resonance: 0,
      notes: "",
      lastSeen: new Date()
    },
    {
      id: 4,
      front: {
        title: "Tiny Experiments",
        insight: "Start with the smallest possible step that moves you forward.",
        image: "🧪"
      },
      back: {
        fullQuote: "The path to big changes is paved with tiny experiments. Start with the smallest possible step that moves you forward, then iterate based on what you learn.",
        source: "Sam Schillace - Tiny Experiments",
        tags: ["experimentation", "growth", "iteration"],
      },
      resonance: 0,
      notes: "",
      lastSeen: new Date()
    }
  ]);

  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [startY, setStartY] = useState(0);
  const [showBreathingPrompt, setShowBreathingPrompt] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
    if (!isFlipped) {
      // Show breathing prompt after flip
      setShowBreathingPrompt(true);
      setTimeout(() => setShowBreathingPrompt(false), 3000);
    }
  };

  const handleResonance = (rating) => {
    const newCards = [...cards];
    newCards[currentCardIndex].resonance = rating;
    newCards[currentCardIndex].lastSeen = new Date();
    setCards(newCards);
  };

  const handleNotesChange = (notes) => {
    const newCards = [...cards];
    newCards[currentCardIndex].notes = notes;
    setCards(newCards);
  };

  const handleSwipe = (direction) => {
    if (direction === 'up' && currentCardIndex < cards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setIsFlipped(false);
    } else if (direction === 'down' && currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMouseDown = (e) => {
    setStartY(e.clientY);
  };

  const handleMouseUp = (e) => {
    const endY = e.clientY;
    const diff = startY - endY;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleSwipe('up');
      } else {
        handleSwipe('down');
      }
    }
  };

  const currentCard = cards[currentCardIndex];

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      {/* Mobile Frame */}
      <div className="w-full max-w-sm mx-auto">
        {/* Status Bar */}
        <div className="bg-white rounded-t-3xl px-6 py-3 flex justify-between items-center text-sm">
          <div className="flex items-center gap-2 text-slate-600">
            <Clock className="w-4 h-4" />
            <span>{formatTime(sessionTime)}</span>
          </div>
          <div className="text-slate-600">
            {currentCardIndex + 1} / {cards.length}
          </div>
        </div>

        {/* Main Content */}
        <div 
          className="bg-white shadow-xl relative overflow-hidden"
          style={{ height: '600px' }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          {/* Breathing Prompt */}
          {showBreathingPrompt && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-8 text-center">
                <p className="text-lg text-slate-700">Take 3 deep breaths</p>
                <p className="text-sm text-slate-500 mt-2">Pause and reflect</p>
              </div>
            </div>
          )}

          {/* Card Container */}
          <div className="h-full flex items-center justify-center p-6">
            <div
              className="w-full h-full cursor-pointer relative"
              style={{
                perspective: '1000px'
              }}
              onClick={handleFlip}
            >
              <div
                className="absolute inset-0 w-full h-full duration-700"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                  transition: 'transform 0.7s'
                }}
              >
                {/* Front of Card */}
                <div 
                  className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-8 flex flex-col items-center justify-center"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden'
                  }}
                >
                  <div className="text-6xl mb-6">{currentCard.front.image}</div>
                  <h2 className="text-xl font-semibold text-slate-800 mb-4 text-center">{currentCard.front.title}</h2>
                  <p className="text-lg text-slate-700 text-center leading-relaxed">
                    "{currentCard.front.insight}"
                  </p>
                  <p className="text-xs text-slate-400 mt-8">Tap to flip</p>
                </div>

                {/* Back of Card */}
                <div 
                  className="absolute inset-0 bg-white rounded-2xl p-6 overflow-y-auto"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)'
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    onClick={handleFlip}
                    className="mb-4 text-slate-400 hover:text-slate-600"
                  >
                    <ArrowLeft className="w-5 h-5" />
                  </button>

                  <div className="space-y-4">
                    <blockquote className="text-slate-700 italic border-l-4 border-indigo-400 pl-4">
                      "{currentCard.back.fullQuote}"
                    </blockquote>

                    <div className="flex items-center gap-2 text-sm text-slate-600">
                      <Book className="w-4 h-4" />
                      <span>{currentCard.back.source}</span>
                    </div>

                    <div className="flex items-center gap-2 flex-wrap">
                      <Tag className="w-4 h-4 text-slate-400" />
                      {currentCard.back.tags.map(tag => (
                        <span key={tag} className="px-2 py-1 bg-slate-100 text-slate-600 rounded-full text-xs">
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="border-t pt-4">
                      <p className="text-sm font-medium text-slate-700 mb-2">How much does this resonate?</p>
                      <div className="flex gap-2 justify-center mb-4">
                        {[1, 2, 3, 4, 5].map(rating => (
                          <button
                            key={rating}
                            onClick={() => handleResonance(rating)}
                            className="transition-all transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                rating <= currentCard.resonance
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-slate-300 hover:text-slate-400'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-700 mb-2">Your notes</p>
                      <textarea
                        value={currentCard.notes}
                        onChange={(e) => handleNotesChange(e.target.value)}
                        placeholder="Add your thoughts..."
                        className="w-full p-3 border border-slate-200 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-indigo-400"
                        rows="3"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Swipe Indicator */}
          <div className="absolute bottom-4 left-0 right-0 flex justify-center">
            <div className="flex gap-1">
              {cards.map((_, index) => (
                <div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentCardIndex ? 'bg-indigo-500 w-6' : 'bg-slate-300 w-2'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Navigation Hint */}
        <div className="bg-white rounded-b-3xl px-6 py-4 text-center">
          <p className="text-xs text-slate-400">Swipe up/down to navigate</p>
        </div>
      </div>
    </div>
  );
};

export default LessonCardsApp;