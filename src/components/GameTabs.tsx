
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MinesGame from "./MinesGame";
import SlotsGame from "./SlotsGame";
import { playSound } from "../utils/sounds";

interface GameTabsProps {
  mineCount: number;
  gameState: 'betting' | 'playing' | 'gameOver';
  onTileReveal: (isMine: boolean, revealedCount: number) => void;
}

const GameTabs = ({ mineCount, gameState, onTileReveal }: GameTabsProps) => {
  const handleTabChange = () => {
    playSound('click');
  };

  return (
    <Tabs defaultValue="mines" className="w-full">
      <TabsList className="grid grid-cols-2 w-full mb-4 bg-gray-800/70 rounded-xl">
        <TabsTrigger 
          value="mines" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-yellow-600/50 data-[state=active]:to-orange-600/50 rounded-xl transition-all py-3"
          onClick={handleTabChange}
        >
          💎 Mines
        </TabsTrigger>
        <TabsTrigger 
          value="slots" 
          className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600/50 data-[state=active]:to-pink-600/50 rounded-xl transition-all py-3"
          onClick={handleTabChange}
        >
          🎰 Slots
        </TabsTrigger>
      </TabsList>
      <TabsContent value="mines" className="transition-all duration-500 ease-in-out">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
          <MinesGame 
            mineCount={mineCount}
            gameState={gameState}
            onTileReveal={onTileReveal}
          />
        </div>
      </TabsContent>
      <TabsContent value="slots" className="transition-all duration-500 ease-in-out">
        <SlotsGame />
      </TabsContent>
    </Tabs>
  );
};

export default GameTabs;
