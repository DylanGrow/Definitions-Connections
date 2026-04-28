import React, { useState, useEffect, useCallback } from 'react';
import { RotateCcw, Lightbulb, Send } from 'lucide-react';

// ============================================================================
// NETWORKING TERMS DATABASE - JSON STRUCTURE (Replace with your DB)
// ============================================================================
const NETWORKING_TERMS = [
  // Layer 1: Physical Layer (transmission of raw bits)
  { id: 'hub', term: 'Hub', osiLayer: 1, category: 'Layer 1: Physical', difficulty: 1 },
  { id: 'repeater', term: 'Repeater', osiLayer: 1, category: 'Layer 1: Physical', difficulty: 1 },
  { id: 'ethernet', term: 'Ethernet', osiLayer: 1, category: 'Layer 1: Physical', difficulty: 1 },
  { id: 'cable', term: 'Cable', osiLayer: 1, category: 'Layer 1: Physical', difficulty: 1 },

  // Layer 2: Data Link Layer (MAC, frames)
  { id: 'switch', term: 'Switch', osiLayer: 2, category: 'Layer 2: Data Link', difficulty: 1 },
  { id: 'mac', term: 'MAC Address', osiLayer: 2, category: 'Layer 2: Data Link', difficulty: 1 },
  { id: 'frame', term: 'Frame', osiLayer: 2, category: 'Layer 2: Data Link', difficulty: 1 },
  { id: 'arp', term: 'ARP', osiLayer: 2, category: 'Layer 2: Data Link', difficulty: 2 },

  // Layer 3: Network Layer (routing, IP)
  { id: 'router', term: 'Router', osiLayer: 3, category: 'Layer 3: Network', difficulty: 1 },
  { id: 'ip', term: 'IP Address', osiLayer: 3, category: 'Layer 3: Network', difficulty: 1 },
  { id: 'icmp', term: 'ICMP', osiLayer: 3, category: 'Layer 3: Network', difficulty: 2 },
  { id: 'bgp', term: 'BGP', osiLayer: 3, category: 'Layer 3: Network', difficulty: 3 },

  // Layer 4: Transport Layer (TCP, UDP)
  { id: 'tcp', term: 'TCP', osiLayer: 4, category: 'Layer 4: Transport', difficulty: 1 },
  { id: 'udp', term: 'UDP', osiLayer: 4, category: 'Layer 4: Transport', difficulty: 1 },
  { id: 'port', term: 'Port', osiLayer: 4, category: 'Layer 4: Transport', difficulty: 1 },
  { id: 'sctp', term: 'SCTP', osiLayer: 4, category: 'Layer 4: Transport', difficulty: 3 },

  // Layer 5-7: Upper Layers
  { id: 'dns', term: 'DNS', osiLayer: 7, category: 'Layer 7: Application', difficulty: 1 },
  { id: 'http', term: 'HTTP', osiLayer: 7, category: 'Layer 7: Application', difficulty: 1 },
  { id: 'https', term: 'HTTPS', osiLayer: 7, category: 'Layer 7: Application', difficulty: 1 },
  { id: 'smtp', term: 'SMTP', osiLayer: 7, category: 'Layer 7: Application', difficulty: 2 },
  { id: 'tls', term: 'TLS/SSL', osiLayer: 6, category: 'Layer 6: Presentation', difficulty: 2 },
  { id: 'session', term: 'Session', osiLayer: 5, category: 'Layer 5: Session', difficulty: 2 },
  { id: 'gateway', term: 'Gateway', osiLayer: 5, category: 'Layer 5: Session', difficulty: 2 },
  { id: 'proxy', term: 'Proxy', osiLayer: 7, category: 'Layer 7: Application', difficulty: 2 },
];

// Color mapping for OSI layers
const LAYER_COLORS = {
  1: { bg: 'bg-purple-600', accent: 'bg-purple-500', border: 'border-purple-400', light: 'bg-purple-100', text: 'text-purple-900' },
  2: { bg: 'bg-cyan-600', accent: 'bg-cyan-500', border: 'border-cyan-400', light: 'bg-cyan-100', text: 'text-cyan-900' },
  3: { bg: 'bg-emerald-600', accent: 'bg-emerald-500', border: 'border-emerald-400', light: 'bg-emerald-100', text: 'text-emerald-900' },
  4: { bg: 'bg-amber-600', accent: 'bg-amber-500', border: 'border-amber-400', light: 'bg-amber-100', text: 'text-amber-900' },
  5: { bg: 'bg-pink-600', accent: 'bg-pink-500', border: 'border-pink-400', light: 'bg-pink-100', text: 'text-pink-900' },
  6: { bg: 'bg-indigo-600', accent: 'bg-indigo-500', border: 'border-indigo-400', light: 'bg-indigo-100', text: 'text-indigo-900' },
  7: { bg: 'bg-blue-600', accent: 'bg-blue-500', border: 'border-blue-400', light: 'bg-blue-100', text: 'text-blue-900' },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

// Fisher-Yates shuffle algorithm
const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Generate a new game: select 4 random categories, then 4 terms per category
const generateNewGame = () => {
  // Get unique OSI layers
  const layerGroups = {};
  NETWORKING_TERMS.forEach(term => {
    if (!layerGroups[term.osiLayer]) {
      layerGroups[term.osiLayer] = [];
    }
    layerGroups[term.osiLayer].push(term);
  });

  // Select 4 random layers
  const layers = Object.keys(layerGroups).map(Number);
  const selectedLayers = shuffleArray(layers).slice(0, 4);

  // Get 4 terms from each selected layer
  const categories = selectedLayers.map(layer => {
    const termsInLayer = layerGroups[layer];
    return shuffleArray(termsInLayer).slice(0, 4).map(t => ({ ...t, categoryId: `layer-${layer}` }));
  });

  const allTerms = categories.flat();
  return {
    terms: shuffleArray(allTerms),
    categories: categories.map((cats, idx) => ({
      id: `layer-${selectedLayers[idx]}`,
      layer: selectedLayers[idx],
      name: `Layer ${selectedLayers[idx]}: ${categories[idx][0].category.split(': ')[1]}`,
      terms: cats.map(t => t.id),
      color: LAYER_COLORS[selectedLayers[idx]],
    })),
  };
};

// ============================================================================
// MAIN APP COMPONENT
// ============================================================================

export default function App() {
  const [gameState, setGameState] = useState(() => {
    const gameData = generateNewGame();
    return {
      ...gameData,
      selected: [],
      solved: [],
      mistakes: 4,
      gameOver: false,
      won: false,
      hintsUsed: 0,
      shake: false,
      message: '',
    };
  });

  // Register service worker for PWA
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/service-worker.js').catch(() => {
        // Service worker registration failed - app still works
      });
    }

    // Request PWA install prompt
    let deferredPrompt;
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault();
      deferredPrompt = e;
      // Show install button if needed
    });
  }, []);

  // Load streak from localStorage
  const [streak, setStreak] = useState(() => {
    return parseInt(localStorage.getItem('connectionStreak') || '0');
  });

  // Handle term selection
  const toggleSelect = useCallback((termId) => {
    if (gameState.gameOver || gameState.won) return;

    setGameState(prev => {
      const isSelected = prev.selected.includes(termId);
      const newSelected = isSelected
        ? prev.selected.filter(id => id !== termId)
        : prev.selected.length < 4
        ? [...prev.selected, termId]
        : prev.selected;

      return { ...prev, selected: newSelected, shake: false, message: '' };
    });
  }, [gameState.gameOver, gameState.won]);

  // Handle game submission
  const submitGuess = useCallback(() => {
    if (gameState.selected.length !== 4) return;

    setGameState(prev => {
      const selectedTerms = prev.selected;
      
      // Check if selected terms match a category
      const matchedCategory = prev.categories.find(cat =>
        cat.terms.every(t => selectedTerms.includes(t)) &&
        selectedTerms.every(t => cat.terms.includes(t))
      );

      if (matchedCategory) {
        // Correct guess
        const newSolved = [...prev.solved, matchedCategory.id];
        const isWon = newSolved.length === prev.categories.length;

        if (isWon) {
          // Save streak on win
          const newStreak = streak + 1;
          setStreak(newStreak);
          localStorage.setItem('connectionStreak', newStreak);
        }

        return {
          ...prev,
          solved: newSolved,
          selected: [],
          won: isWon,
          message: isWon ? '🎉 Perfect! You won!' : '✅ Correct!',
          shake: false,
        };
      }

      // Check if one away
      const oneAwayMatch = prev.categories.find(cat => {
        const matches = selectedTerms.filter(t => cat.terms.includes(t)).length;
        return matches === 3;
      });

      if (oneAwayMatch) {
        return {
          ...prev,
          selected: [],
          message: '⚠️ One away!',
          shake: true,
        };
      }

      // Wrong guess
      const newMistakes = prev.mistakes - 1;
      const isGameOver = newMistakes <= 0;

      if (isGameOver) {
        // Reset streak on loss
        setStreak(0);
        localStorage.setItem('connectionStreak', '0');
      }

      return {
        ...prev,
        selected: [],
        mistakes: newMistakes,
        gameOver: isGameOver,
        message: isGameOver ? '💔 Game Over!' : '❌ Wrong guess',
        shake: true,
      };
    });
  }, [streak]);

  // Shuffle remaining terms
  const shuffleTerms = useCallback(() => {
    setGameState(prev => ({
      ...prev,
      terms: shuffleArray(prev.terms.filter(t => !prev.solved.some(s => 
        prev.categories.find(c => c.id === s)?.terms.includes(t.id)
      ))),
    }));
  }, []);

  // Use hint
  const useHint = useCallback(() => {
    if (gameState.hintsUsed >= 3 || gameState.gameOver || gameState.won) return;

    setGameState(prev => ({
      ...prev,
      hintsUsed: prev.hintsUsed + 1,
      message: `💡 Category ${prev.hintsUsed + 1}: ${prev.categories[prev.hintsUsed]?.name}`,
    }));
  }, [gameState.hintsUsed, gameState.gameOver, gameState.won]);

  // New game
  const newGame = useCallback(() => {
    const gameData = generateNewGame();
    setGameState({
      ...gameData,
      selected: [],
      solved: [],
      mistakes: 4,
      gameOver: false,
      won: false,
      hintsUsed: 0,
      shake: false,
      message: '',
    });
  }, []);

  // Get unsolved terms
  const unsolvedTerms = gameState.terms.filter(t => 
    !gameState.solved.some(s => 
      gameState.categories.find(c => c.id === s)?.terms.includes(t.id)
    )
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 font-sans" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
      {/* PWA Meta Tags (in real HTML, add to head) */}
      <style>{`
        html {
          --color-purple: #a78bfa;
          --color-cyan: #06b6d4;
          --color-emerald: #10b981;
          --color-amber: #f59e0b;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        
        .shake {
          animation: shake 0.5s cubic-bezier(0.36, 0, 0.66, -0.56);
        }
        
        @keyframes slideIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .slide-in {
          animation: slideIn 0.3s ease-out;
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5); }
          50% { box-shadow: 0 0 30px rgba(59, 130, 246, 0.8); }
        }
        
        .glow {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }
      `}</style>

      {/* Header */}
      <header className="max-w-2xl mx-auto mb-8">
        <h1 className="text-4xl font-bold text-center mb-2 slide-in">
          🌐 Network Terms
        </h1>
        <p className="text-center text-slate-400 text-sm mb-4">
          Learn networking by OSI Layer
        </p>

        {/* Stats */}
        <div className="flex justify-between items-center bg-slate-900 rounded-lg p-4 border border-slate-800">
          <div className="text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wide">Streak</div>
            <div className="text-2xl font-bold text-blue-400">{streak}</div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wide">Mistakes</div>
            <div className={`text-2xl font-bold ${gameState.mistakes === 0 ? 'text-red-400' : gameState.mistakes <= 2 ? 'text-amber-400' : 'text-slate-200'}`}>
              {gameState.mistakes}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-slate-500 uppercase tracking-wide">Solved</div>
            <div className="text-2xl font-bold text-emerald-400">{gameState.solved.length}/4</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto">
        {/* Message Display */}
        {gameState.message && (
          <div className={`text-center mb-4 p-3 rounded-lg font-semibold slide-in ${
            gameState.message.includes('✅') || gameState.message.includes('🎉')
              ? 'bg-emerald-900 text-emerald-200'
              : gameState.message.includes('⚠️')
              ? 'bg-amber-900 text-amber-200'
              : 'bg-red-900 text-red-200'
          }`}>
            {gameState.message}
          </div>
        )}

        {/* Game Grid */}
        <div className={`grid grid-cols-4 gap-2 mb-6 ${gameState.shake ? 'shake' : ''}`}>
          {unsolvedTerms.map(term => {
            const isSelected = gameState.selected.includes(term.id);
            const category = gameState.categories.find(c => c.terms.includes(term.id));
            const colors = category?.color || LAYER_COLORS[1];

            return (
              <button
                key={term.id}
                onClick={() => toggleSelect(term.id)}
                disabled={gameState.gameOver && !gameState.won}
                className={`
                  p-3 rounded-lg font-semibold text-sm transition-all duration-200
                  transform hover:scale-105 active:scale-95 disabled:cursor-not-allowed
                  border-2 aspect-square flex items-center justify-center text-center
                  ${isSelected
                    ? `${colors.bg} border-slate-100 text-white glow shadow-lg`
                    : `bg-slate-800 border-slate-700 hover:border-slate-600 hover:bg-slate-700`
                  }
                `}
              >
                <span className="line-clamp-3 text-xs md:text-sm">{term.term}</span>
              </button>
            );
          })}
        </div>

        {/* Solved Categories */}
        {gameState.solved.length > 0 && (
          <div className="space-y-2 mb-6">
            {gameState.solved.map(categoryId => {
              const category = gameState.categories.find(c => c.id === categoryId);
              return (
                <div
                  key={categoryId}
                  className={`${category.color.light} ${category.color.text} p-4 rounded-lg font-semibold text-center slide-in`}
                >
                  {category.name}
                </div>
              );
            })}
          </div>
        )}

        {/* Controls */}
        <div className="space-y-3">
          {/* Primary Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={submitGuess}
              disabled={gameState.selected.length !== 4 || gameState.gameOver || gameState.won}
              className="bg-blue-600 hover:bg-blue-500 disabled:bg-slate-700 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <Send size={18} /> Submit
            </button>
            <button
              onClick={shuffleTerms}
              disabled={gameState.gameOver || gameState.won}
              className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
            >
              <RotateCcw size={18} /> Shuffle
            </button>
          </div>

          {/* Secondary Actions */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={useHint}
              disabled={gameState.hintsUsed >= 3 || gameState.gameOver || gameState.won}
              className="bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:cursor-not-allowed px-4 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors text-sm"
            >
              <Lightbulb size={18} /> Hint ({3 - gameState.hintsUsed})
            </button>
            <button
              onClick={newGame}
              className="bg-emerald-600 hover:bg-emerald-500 px-4 py-3 rounded-lg font-semibold transition-colors"
            >
              New Game
            </button>
          </div>
        </div>

        {/* Game Over / Win State */}
        {(gameState.gameOver || gameState.won) && (
          <div className="mt-8 p-6 bg-slate-900 rounded-lg border-2 border-slate-700 text-center slide-in">
            <p className="text-xl font-bold mb-2">
              {gameState.won ? '🎉 You Won!' : '💔 Game Over'}
            </p>
            <p className="text-slate-400 mb-4">
              {gameState.won
                ? `Great job! Your streak is now ${streak}.`
                : 'Better luck next time. Keep learning!'}
            </p>
            <button
              onClick={newGame}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-2 rounded-lg font-semibold"
            >
              Play Again
            </button>
          </div>
        )}

        {/* Footer Info */}
        <footer className="mt-12 text-center text-slate-500 text-xs space-y-2">
          <p>📚 Learn networking by grouping related terms by OSI Layer</p>
          <p>💾 Your streak is saved locally</p>
          <p>📱 This PWA works offline after first load</p>
        </footer>
      </main>
    </div>
  );
}
