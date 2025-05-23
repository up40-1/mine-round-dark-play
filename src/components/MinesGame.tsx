
import { useState, useEffect } from 'react';
import { Bomb, Gem } from 'lucide-react';

interface MinesGameProps {
  mineCount: number;
  gameState: 'betting' | 'playing' | 'gameOver';
  onTileReveal: (isMine: boolean, revealedCount: number) => void;
}

interface Tile {
  id: number;
  isMine: boolean;
  isRevealed: boolean;
  isFlagged: boolean;
}

const MinesGame = ({ mineCount, gameState, onTileReveal }: MinesGameProps) => {
  const [tiles, setTiles] = useState<Tile[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);

  // Initialize game board
  useEffect(() => {
    if (gameState === 'playing') {
      initializeBoard();
    }
  }, [gameState, mineCount]);

  const initializeBoard = () => {
    const newTiles: Tile[] = [];
    
    // Create 25 tiles
    for (let i = 0; i < 25; i++) {
      newTiles.push({
        id: i,
        isMine: false,
        isRevealed: false,
        isFlagged: false,
      });
    }

    // Randomly place mines
    const minePositions = new Set<number>();
    while (minePositions.size < mineCount) {
      const randomPos = Math.floor(Math.random() * 25);
      minePositions.add(randomPos);
    }

    minePositions.forEach(pos => {
      newTiles[pos].isMine = true;
    });

    setTiles(newTiles);
    setRevealedCount(0);
  };

  const handleTileClick = (tileId: number) => {
    if (gameState !== 'playing') return;
    
    const tile = tiles[tileId];
    if (tile.isRevealed) return;

    const newTiles = [...tiles];
    newTiles[tileId].isRevealed = true;
    setTiles(newTiles);

    if (tile.isMine) {
      // Reveal all mines
      newTiles.forEach(t => {
        if (t.isMine) t.isRevealed = true;
      });
      setTiles(newTiles);
      onTileReveal(true, revealedCount);
    } else {
      const newRevealedCount = revealedCount + 1;
      setRevealedCount(newRevealedCount);
      onTileReveal(false, newRevealedCount);
    }
  };

  const renderTile = (tile: Tile) => {
    let content = null;
    let bgClass = 'bg-gradient-to-br from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700';
    
    if (tile.isRevealed) {
      if (tile.isMine) {
        content = <Bomb className="w-6 h-6 text-red-500" />;
        bgClass = 'bg-gradient-to-br from-red-600 to-red-700';
      } else {
        content = <Gem className="w-6 h-6 text-green-400" />;
        bgClass = 'bg-gradient-to-br from-green-600 to-green-700';
      }
    }

    return (
      <button
        key={tile.id}
        onClick={() => handleTileClick(tile.id)}
        disabled={gameState !== 'playing' || tile.isRevealed}
        className={`
          aspect-square rounded-xl border-2 border-gray-600 
          ${bgClass}
          transition-all duration-300 ease-in-out
          transform hover:scale-105 active:scale-95
          flex items-center justify-center
          shadow-lg hover:shadow-xl
          ${tile.isRevealed ? 'animate-pulse' : ''}
          ${gameState === 'playing' && !tile.isRevealed ? 'cursor-pointer' : 'cursor-default'}
        `}
      >
        {content}
      </button>
    );
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="grid grid-cols-5 gap-3 p-4">
        {tiles.map(tile => renderTile(tile))}
      </div>
      
      {gameState === 'betting' && (
        <div className="text-center mt-6">
          <p className="text-gray-400 text-lg">Place your bet to start mining!</p>
        </div>
      )}
      
      {gameState === 'gameOver' && (
        <div className="text-center mt-6">
          <p className="text-red-400 text-xl font-bold mb-2">💥 BOOM! 💥</p>
          <p className="text-gray-400">You hit a mine! Better luck next time.</p>
        </div>
      )}
    </div>
  );
};

export default MinesGame;
