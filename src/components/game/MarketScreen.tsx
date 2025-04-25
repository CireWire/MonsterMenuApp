import React, { useState } from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import { Dish } from '@/types/game';
import DiceRoller from '@/components/ui/DiceRoller';

export default function MarketScreen() {
  const { state, dispatch } = useGameState();
  const { player } = state;
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [soldDishes, setSoldDishes] = useState<Dish[]>([]);

  const handleRoll = (result: number) => {
    if (!selectedDish) return;

    const total = result + player.stats.charm;
    setRollResult(total);

    let priceMultiplier = 1;
    let reputationGain = 0;

    if (total >= 6) {
      setMessage('Critical Success! The customer is amazed!');
      priceMultiplier = 1.5;
      reputationGain = 2;
    } else if (total >= 4) {
      setMessage('Success! The customer is satisfied.');
      priceMultiplier = 1.2;
      reputationGain = 1;
    } else if (total >= 2) {
      setMessage('Mixed Success. The customer is unimpressed.');
      priceMultiplier = 0.8;
    } else {
      setMessage('Failure! The customer is disappointed.');
      priceMultiplier = 0.5;
      reputationGain = -1;
    }

    const finalPrice = Math.floor(selectedDish.price * priceMultiplier);

    // Update player's money and reputation
    dispatch({ type: 'UPDATE_MONEY', payload: finalPrice });
    dispatch({ type: 'UPDATE_REPUTATION', payload: reputationGain });

    // Add to sold dishes
    setSoldDishes((prev) => [...prev, selectedDish]);

    // Remove dish from inventory
    dispatch({
      type: 'UPDATE_INVENTORY',
      payload: {
        dishes: player.inventory.dishes.filter((d) => d.id !== selectedDish.id),
      },
    });

    setSelectedDish(null);
  };

  const handleNextPhase = () => {
    dispatch({ type: 'SET_PHASE', payload: 'Downtime' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Market</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-2">Available Dishes</h3>
            <div className="space-y-2 mb-4">
              {player.inventory.dishes.map((dish) => (
                <div
                  key={dish.id}
                  className={`p-4 rounded cursor-pointer transition-colors ${
                    selectedDish?.id === dish.id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => setSelectedDish(dish)}
                >
                  <h4 className="font-semibold">{dish.name}</h4>
                  <p className="text-sm text-gray-600">{dish.description}</p>
                  <div className="flex justify-between mt-2">
                    <span className="text-sm">
                      Quality: {dish.quality}/10
                    </span>
                    <span className="text-sm font-semibold">
                      Base Price: {dish.price} coins
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {selectedDish && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">
                  Your Charm Stat: {player.stats.charm}
                </h4>
                <DiceRoller onRoll={handleRoll} />
              </div>
            )}
            {rollResult !== null && (
              <div className="mb-4">
                <p className="font-semibold">Roll Result: {rollResult}</p>
                <p className="text-gray-700">{message}</p>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Selected Dish</h3>
              {selectedDish ? (
                <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-semibold text-lg mb-2">{selectedDish.name}</h4>
                  <p className="text-gray-700 mb-2">{selectedDish.description}</p>
                  <div className="mb-2">
                    <span className="font-semibold">Quality:</span>{' '}
                    <span className="text-blue-600">{selectedDish.quality}/10</span>
                  </div>
                  <div>
                    <span className="font-semibold">Base Price:</span>{' '}
                    <span className="text-yellow-600">{selectedDish.price} coins</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No dish selected yet.</p>
              )}
            </div>

            <div>
              <h3 className="text-xl font-semibold mb-2">Today's Sales</h3>
              {soldDishes.length === 0 ? (
                <p className="text-gray-600">No dishes sold yet.</p>
              ) : (
                <div className="space-y-2">
                  {soldDishes.map((dish) => (
                    <div
                      key={dish.id}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200"
                    >
                      <h4 className="font-semibold">{dish.name}</h4>
                      <p className="text-sm text-gray-600">{dish.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => dispatch({ type: 'SET_PHASE', payload: 'Cook' })}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Return to Cooking
        </button>
        <button
          onClick={handleNextPhase}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Proceed to Downtime
        </button>
      </div>
    </div>
  );
} 