import React, { useState } from 'react';

interface DiceRollerProps {
  onRoll: (result: number) => void;
}

export default function DiceRoller({ onRoll }: DiceRollerProps) {
  const [isRolling, setIsRolling] = useState(false);
  const [currentRoll, setCurrentRoll] = useState<number | null>(null);

  const rollDice = () => {
    if (isRolling) return;

    setIsRolling(true);
    setCurrentRoll(null);

    // Simulate rolling animation
    const rolls = Array.from({ length: 10 }, () =>
      Math.floor(Math.random() * 6) + 1
    );

    let currentIndex = 0;
    const interval = setInterval(() => {
      setCurrentRoll(rolls[currentIndex]);
      currentIndex++;

      if (currentIndex >= rolls.length) {
        clearInterval(interval);
        const finalRoll = Math.floor(Math.random() * 6) + 1;
        setCurrentRoll(finalRoll);
        setIsRolling(false);
        onRoll(finalRoll);
      }
    }, 100);
  };

  return (
    <div className="flex flex-col items-center">
      <button
        onClick={rollDice}
        disabled={isRolling}
        className={`px-6 py-3 rounded-lg text-white font-semibold ${
          isRolling
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {isRolling ? 'Rolling...' : 'Roll Dice'}
      </button>

      {currentRoll !== null && (
        <div className="mt-4 text-4xl font-bold">
          <div className="w-16 h-16 flex items-center justify-center bg-white rounded-lg shadow-md border-2 border-gray-300">
            {currentRoll}
          </div>
        </div>
      )}
    </div>
  );
} 