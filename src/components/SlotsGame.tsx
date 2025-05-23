
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const SlotsGame = () => {
  return (
    <div className="w-full max-w-lg mx-auto text-center p-6">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Slots Game</h2>
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700">
        <p className="text-xl text-gray-300 mb-6">Coming Soon!</p>
        <p className="text-gray-400 mb-8">
          Our exciting slots game is currently under development.
          Check back soon for an even more addictive gaming experience!
        </p>
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[1, 2, 3].map((num) => (
            <div 
              key={num}
              className="aspect-square rounded-xl bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center"
            >
              <span className="text-4xl">🎰</span>
            </div>
          ))}
        </div>
        <Button
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 text-lg rounded-xl transition-all duration-300 active:scale-95"
          disabled
        >
          Play Slots
        </Button>
      </div>
    </div>
  );
};

export default SlotsGame;
