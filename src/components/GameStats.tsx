
interface GameStatsProps {
  balance: number;
  currentBet: number;
  multiplier: number;
  revealedTiles: number;
  gameState: 'betting' | 'playing' | 'gameOver';
}

const GameStats = ({ balance, currentBet, multiplier, revealedTiles, gameState }: GameStatsProps) => {
  const safeTilesRevealed = revealedTiles;
  const potentialWin = currentBet * multiplier;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center">
        <p className="text-gray-400 text-sm mb-1">Balance</p>
        <p className={`text-xl font-bold ${balance >= 0 ? 'text-green-400' : 'text-red-400'}`}>
          €{balance.toFixed(2)}
        </p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center">
        <p className="text-gray-400 text-sm mb-1">Current Bet</p>
        <p className="text-xl font-bold text-blue-400">€{currentBet.toFixed(2)}</p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center">
        <p className="text-gray-400 text-sm mb-1">Multiplier</p>
        <p className="text-xl font-bold text-yellow-400">{multiplier.toFixed(2)}x</p>
      </div>
      
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700 text-center">
        <p className="text-gray-400 text-sm mb-1">Safe Tiles</p>
        <p className="text-xl font-bold text-purple-400">{safeTilesRevealed}</p>
      </div>
    </div>
  );
};

export default GameStats;
