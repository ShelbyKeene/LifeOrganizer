import React from 'react';
import { Droplets, Plus, Minus } from 'lucide-react';

interface WaterTrackerProps {
  currentIntake: number;
  onUpdate: (amount: number) => void;
}

export const WaterTracker: React.FC<WaterTrackerProps> = ({
  currentIntake,
  onUpdate,
}) => {
  const dailyGoal = 2000; // 2L daily goal
  const progress = Math.min((currentIntake / dailyGoal) * 100, 100);

  const handleAdd = (amount: number) => {
    onUpdate(currentIntake + amount);
  };

  const handleSubtract = (amount: number) => {
    onUpdate(Math.max(currentIntake - amount, 0));
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-light text-white flex items-center gap-2">
        <Droplets className="w-6 h-6" />
        Water Intake
      </h3>

      <div className="relative h-48 w-48 mx-auto">
        {/* Water fill animation */}
        <div className="absolute inset-0 rounded-full border-4 border-white/20 overflow-hidden">
          <div
            className="absolute bottom-0 w-full bg-blue-500/50 transition-all duration-500"
            style={{ height: `${progress}%` }}
          />
        </div>
        
        {/* Progress text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <span className="text-3xl font-light">{currentIntake}ml</span>
          <span className="text-sm text-white/70">of {dailyGoal}ml</span>
        </div>
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleSubtract(250)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <Minus className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleAdd(250)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors text-white"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};