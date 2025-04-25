import React, { useState } from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import DiceRoller from '@/components/ui/DiceRoller';

export default function HuntingScreen() {
  const { state, dispatch } = useGameState();
  const { currentJob, player } = state;
  const [successes, setSuccesses] = useState(0);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');

  if (!currentJob) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">No Active Job</h2>
        <p className="mb-4">Please accept a job from the job board first.</p>
        <button
          onClick={() => dispatch({ type: 'SET_PHASE', payload: 'Job' })}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Return to Job Board
        </button>
      </div>
    );
  }

  const handleRoll = (result: number) => {
    const total = result + player.stats.hunt;
    setRollResult(total);

    if (total >= 6) {
      setMessage('Critical Success! You found the monster!');
      setSuccesses((prev) => prev + 2);
    } else if (total >= 4) {
      setMessage('Success! You found a clue.');
      setSuccesses((prev) => prev + 1);
    } else if (total >= 2) {
      setMessage('Mixed Success. You found something, but it might be a trap.');
    } else {
      setMessage('Failure! The monster might have spotted you...');
      // Reduce health on failure
      dispatch({
        type: 'UPDATE_STATS',
        payload: {
          health: {
            current: Math.max(0, player.health.current - 1),
            max: player.health.max,
          },
        },
      });
    }
  };

  const handleNextPhase = () => {
    if (successes >= currentJob.monster.successesNeeded) {
      dispatch({ type: 'SET_PHASE', payload: 'Harvest' });
    } else {
      setMessage('You need more successes to find the monster!');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Hunting {currentJob.monster.name}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Monster Info</h3>
            <p className="text-gray-700 mb-2">{currentJob.monster.description}</p>
            <div className="text-sm text-gray-600">
              <p>Type: {currentJob.monster.type}</p>
              <p>Danger Level: {currentJob.monster.dangerLevel}</p>
              <p>Successes Needed: {currentJob.monster.successesNeeded}</p>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Hunting Progress</h3>
            <div className="mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full"
                    style={{
                      width: `${(successes / currentJob.monster.successesNeeded) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm">
                  {successes}/{currentJob.monster.successesNeeded}
                </span>
              </div>
            </div>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Your Hunt Stat: {player.stats.hunt}</h4>
              <DiceRoller onRoll={handleRoll} />
            </div>
            {rollResult !== null && (
              <div className="mb-4">
                <p className="font-semibold">Roll Result: {rollResult}</p>
                <p className="text-gray-700">{message}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => dispatch({ type: 'SET_PHASE', payload: 'Job' })}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Abandon Hunt
        </button>
        <button
          onClick={handleNextPhase}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={successes < currentJob.monster.successesNeeded}
        >
          {successes >= currentJob.monster.successesNeeded
            ? 'Harvest Monster'
            : 'Continue Hunting'}
        </button>
      </div>
    </div>
  );
} 