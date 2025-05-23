
import { useState, useEffect } from 'react';
import BetPanel from '../components/BetPanel';
import GameStats from '../components/GameStats';
import GameTabs from '../components/GameTabs';
import { playSound } from '../utils/sounds';

const Index = () => {
  const [balance, setBalance] = useState(5000);
  const [currentBet, setCurrentBet] = useState(10);
  const [mineCount, setMineCount] = useState(3);
  const [gameState, setGameState] = useState<'betting' | 'playing' | 'gameOver'>('betting');
  const [multiplier, setMultiplier] = useState(1);
  const [revealedTiles, setRevealedTiles] = useState(0);

  // Load balance from localStorage on component mount
  useEffect(() => {
    const savedBalance = localStorage.getItem('minesBalance');
    if (savedBalance) {
      setBalance(parseFloat(savedBalance));
    }
  }, []);

  // Save balance to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('minesBalance', balance.toString());
  }, [balance]);

  // Preload sounds
  useEffect(() => {
    const sounds = ['click', 'win', 'lose', 'cashout'];
    sounds.forEach(sound => {
      const audio = new Audio(`/sounds/${sound}.mp3`);
      audio.preload = 'auto';
    });
  }, []);

  const calculateMultiplier = (revealed: number, mines: number) => {
    const safeTiles = 25 - mines;
    if (revealed === 0) return 1;
    
    let mult = 1;
    for (let i = 0; i < revealed; i++) {
      mult *= (safeTiles / (safeTiles - i));
    }
    return mult * (1 + mines * 0.1);
  };

  const startGame = () => {
    // Allow going into negative balance if they want to bet more than they have
    setBalance(balance - currentBet);
    setGameState('playing');
    setRevealedTiles(0);
    setMultiplier(1);
  };

  const cashOut = () => {
    const winAmount = currentBet * multiplier;
    setBalance(balance + winAmount);
    setGameState('betting');
    setRevealedTiles(0);
    setMultiplier(1);
  };

  const onTileReveal = (isMine: boolean, newRevealedCount: number) => {
    if (isMine) {
      setGameState('gameOver');
      setMultiplier(1);
    } else {
      setRevealedTiles(newRevealedCount);
      const newMultiplier = calculateMultiplier(newRevealedCount, mineCount);
      setMultiplier(newMultiplier);
    }
  };

  const resetGame = () => {
    setGameState('betting');
    setRevealedTiles(0);
    setMultiplier(1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white p-4 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-2">
            MINES
          </h1>
          <p className="text-gray-400 text-lg">Test your luck in the minefield</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Bet Panel */}
          <div className="lg:col-span-1 order-2 lg:order-1 animate-fade-in">
            <BetPanel
              balance={balance}
              currentBet={currentBet}
              setCurrentBet={setCurrentBet}
              mineCount={mineCount}
              setMineCount={setMineCount}
              gameState={gameState}
              multiplier={multiplier}
              onStartGame={startGame}
              onCashOut={cashOut}
              onReset={resetGame}
            />
          </div>

          {/* Game Area */}
          <div className="lg:col-span-2 order-1 lg:order-2 animate-fade-in">
            <GameTabs
              mineCount={mineCount}
              gameState={gameState}
              onTileReveal={onTileReveal}
            />
          </div>
        </div>

        {/* Game Stats */}
        <div className="mt-6 animate-fade-in">
          <GameStats
            balance={balance}
            currentBet={currentBet}
            multiplier={multiplier}
            revealedTiles={revealedTiles}
            gameState={gameState}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;
