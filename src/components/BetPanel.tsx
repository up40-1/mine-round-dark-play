
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

interface BetPanelProps {
  balance: number;
  currentBet: number;
  setCurrentBet: (bet: number) => void;
  mineCount: number;
  setMineCount: (count: number) => void;
  gameState: 'betting' | 'playing' | 'gameOver';
  multiplier: number;
  onStartGame: () => void;
  onCashOut: () => void;
  onReset: () => void;
}

const BetPanel = ({
  balance,
  currentBet,
  setCurrentBet,
  mineCount,
  setMineCount,
  gameState,
  multiplier,
  onStartGame,
  onCashOut,
  onReset
}: BetPanelProps) => {
  const [betInput, setBetInput] = useState(currentBet.toString());

  const handleBetChange = (value: string) => {
    setBetInput(value);
    const numValue = parseFloat(value) || 0;
    setCurrentBet(Math.max(0, numValue));
  };

  const quickBetButtons = [10, 50, 100, 250, 500];

  const potentialWin = currentBet * multiplier;

  return (
    <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-yellow-400 mb-2">Balance</h2>
        <p className="text-3xl font-bold">€{balance.toFixed(2)}</p>
      </div>

      {/* Bet Amount */}
      <div className="space-y-3">
        <Label htmlFor="bet-amount" className="text-gray-300">Bet Amount (€)</Label>
        <Input
          id="bet-amount"
          type="number"
          value={betInput}
          onChange={(e) => handleBetChange(e.target.value)}
          disabled={gameState === 'playing'}
          className="bg-gray-700 border-gray-600 text-white text-center text-lg font-bold"
          min="0"
          step="0.01"
        />
        
        {/* Quick Bet Buttons */}
        <div className="grid grid-cols-5 gap-2">
          {quickBetButtons.map((amount) => (
            <Button
              key={amount}
              variant="outline"
              size="sm"
              onClick={() => {
                setCurrentBet(amount);
                setBetInput(amount.toString());
              }}
              disabled={gameState === 'playing'}
              className="bg-gray-700 border-gray-600 hover:bg-gray-600 text-white"
            >
              {amount}
            </Button>
          ))}
        </div>
      </div>

      {/* Mine Count */}
      <div className="space-y-3">
        <Label className="text-gray-300">Mines: {mineCount}</Label>
        <Slider
          value={[mineCount]}
          onValueChange={(value) => setMineCount(value[0])}
          min={1}
          max={20}
          step={1}
          disabled={gameState === 'playing'}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-400">
          <span>1 Mine</span>
          <span>20 Mines</span>
        </div>
      </div>

      {/* Multiplier Display */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 rounded-xl p-4 text-center">
        <p className="text-gray-300 text-sm mb-1">Current Multiplier</p>
        <p className="text-2xl font-bold text-yellow-400">{multiplier.toFixed(2)}x</p>
        <p className="text-gray-400 text-sm mt-1">
          Potential Win: €{potentialWin.toFixed(2)}
        </p>
      </div>

      {/* Game Controls */}
      <div className="space-y-3">
        {gameState === 'betting' && (
          <Button
            onClick={onStartGame}
            disabled={currentBet <= 0 || currentBet > balance}
            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold py-3 text-lg rounded-xl transition-all duration-300"
          >
            Start Game
          </Button>
        )}
        
        {gameState === 'playing' && (
          <Button
            onClick={onCashOut}
            className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 text-white font-bold py-3 text-lg rounded-xl transition-all duration-300"
          >
            Cash Out (€{potentialWin.toFixed(2)})
          </Button>
        )}
        
        {gameState === 'gameOver' && (
          <Button
            onClick={onReset}
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 text-lg rounded-xl transition-all duration-300"
          >
            New Game
          </Button>
        )}
      </div>

      {/* Balance Warning */}
      {balance < 0 && (
        <div className="bg-red-600/20 border border-red-600 rounded-xl p-3 text-center">
          <p className="text-red-400 font-bold">Negative Balance!</p>
          <p className="text-red-300 text-sm">You're in the red zone</p>
        </div>
      )}
    </div>
  );
};

export default BetPanel;
