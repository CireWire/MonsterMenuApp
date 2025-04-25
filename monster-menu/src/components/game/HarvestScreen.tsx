import React, { useState } from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import { Ingredient } from '@/types/game';
import DiceRoller from '@/components/ui/DiceRoller';

export default function HarvestScreen() {
  const { state, dispatch } = useGameState();
  const { currentJob, player } = state;
  const [harvestedIngredients, setHarvestedIngredients] = useState<Ingredient[]>([]);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const MAX_HARVESTS = 3;

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
    if (harvestedIngredients.length >= MAX_HARVESTS) {
      setMessage('You have reached the maximum number of harvests (3).');
      return;
    }

    const total = result + player.stats.hunt;
    setRollResult(total);

    if (total >= 6) {
      setMessage('Critical Success! You found a prime ingredient!');
      harvestIngredient('Prime');
    } else if (total >= 4) {
      setMessage('Success! You found a good quality ingredient.');
      harvestIngredient('Good');
    } else if (total >= 2) {
      setMessage('Mixed Success. You found a standard quality ingredient.');
      harvestIngredient('Standard');
    } else {
      setMessage('Failure! You only found a poor quality ingredient.');
      harvestIngredient('Poor');
    }
  };

  const harvestIngredient = (quality: Ingredient['quality']) => {
    const possibleIngredients = currentJob.monster.possibleIngredients;
    const randomIngredient = possibleIngredients[Math.floor(Math.random() * possibleIngredients.length)];

    const newIngredient: Ingredient = {
      id: Date.now().toString(),
      name: randomIngredient,
      quality,
      monsterSource: currentJob.monster.name,
      quantity: 1,
    };

    setHarvestedIngredients((prev) => [...prev, newIngredient]);
  };

  const handleNextPhase = () => {
    // Add harvested ingredients to player's inventory
    dispatch({
      type: 'UPDATE_INVENTORY',
      payload: {
        ingredients: [...player.inventory.ingredients, ...harvestedIngredients],
      },
    });

    // Move to cooking phase
    dispatch({ type: 'SET_PHASE', payload: 'Cook' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">
          Harvesting {currentJob.monster.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">Harvesting Progress</h3>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Your Hunt Stat: {player.stats.hunt}</h4>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div
                    className="bg-green-600 h-4 rounded-full"
                    style={{
                      width: `${(harvestedIngredients.length / MAX_HARVESTS) * 100}%`,
                    }}
                  ></div>
                </div>
                <span className="text-sm">
                  {harvestedIngredients.length}/{MAX_HARVESTS} Harvests
                </span>
              </div>
              <DiceRoller onRoll={handleRoll} disabled={harvestedIngredients.length >= MAX_HARVESTS} />
            </div>
            {rollResult !== null && (
              <div className="mb-4">
                <p className="font-semibold">Roll Result: {rollResult}</p>
                <p className="text-gray-700">{message}</p>
              </div>
            )}
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Harvested Ingredients</h3>
            {harvestedIngredients.length === 0 ? (
              <p className="text-gray-600">No ingredients harvested yet.</p>
            ) : (
              <div className="space-y-2">
                {harvestedIngredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className={`flex justify-between items-center p-2 rounded ${
                      ingredient.quality === 'Prime' ? 'bg-green-100' :
                      ingredient.quality === 'Good' ? 'bg-blue-100' :
                      ingredient.quality === 'Standard' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}
                  >
                    <div>
                      <span className="font-semibold">{ingredient.name}</span>
                      <span className="text-sm text-gray-600 ml-2">
                        ({ingredient.quality})
                      </span>
                    </div>
                    <span className="text-sm text-gray-600">
                      x{ingredient.quantity}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => dispatch({ type: 'SET_PHASE', payload: 'Hunt' })}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Return to Hunt
        </button>
        <button
          onClick={handleNextPhase}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={harvestedIngredients.length === 0}
        >
          Proceed to Cooking
        </button>
      </div>
    </div>
  );
} 