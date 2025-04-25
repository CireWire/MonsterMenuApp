import React, { useState } from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import { Ingredient, Dish } from '@/types/game';
import DiceRoller from '@/components/ui/DiceRoller';

export default function CookingScreen() {
  const { state, dispatch } = useGameState();
  const { player } = state;
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [dishName, setDishName] = useState('');
  const [rollResult, setRollResult] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [createdDish, setCreatedDish] = useState<Dish | null>(null);

  const handleRoll = (result: number) => {
    const total = result + player.stats.cook;
    setRollResult(total);

    // Calculate dish quality based on roll and ingredient quality
    const ingredientQualityScore = selectedIngredients.reduce((score, ingredient) => {
      const qualityScores = {
        Poor: 1,
        Standard: 2,
        Good: 3,
        Prime: 4,
      };
      return score + qualityScores[ingredient.quality];
    }, 0);

    const averageQuality = ingredientQualityScore / selectedIngredients.length;
    const finalQuality = Math.min(10, Math.floor((total + averageQuality) / 2));

    const newDish: Dish = {
      id: Date.now().toString(),
      name: dishName || 'Unnamed Dish',
      ingredients: selectedIngredients,
      quality: finalQuality,
      price: Math.floor(finalQuality * 20),
      description: `A ${finalQuality >= 8 ? 'masterpiece' : finalQuality >= 5 ? 'delicious' : 'simple'} dish made from ${selectedIngredients.map(i => i.name).join(', ')}.`,
    };

    setCreatedDish(newDish);
    setMessage(`You created a ${finalQuality >= 8 ? 'masterpiece' : finalQuality >= 5 ? 'delicious' : 'simple'} dish!`);
  };

  const handleNextPhase = () => {
    if (createdDish) {
      // Add the created dish to player's inventory
      dispatch({
        type: 'UPDATE_INVENTORY',
        payload: {
          dishes: [...player.inventory.dishes, createdDish],
        },
      });

      // Move to market phase
      dispatch({ type: 'SET_PHASE', payload: 'Sell' });
    }
  };

  const toggleIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      const isSelected = prev.some((i) => i.id === ingredient.id);
      if (isSelected) {
        return prev.filter((i) => i.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Cooking</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <h3 className="text-xl font-semibold mb-2">Available Ingredients</h3>
            <div className="space-y-2 mb-4">
              {player.inventory.ingredients.map((ingredient) => (
                <div
                  key={ingredient.id}
                  className={`p-3 rounded cursor-pointer transition-colors ${
                    selectedIngredients.some((i) => i.id === ingredient.id)
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                  }`}
                  onClick={() => toggleIngredient(ingredient)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{ingredient.name}</span>
                    <span className={`text-sm px-2 py-1 rounded ${
                      ingredient.quality === 'Prime' ? 'bg-green-100 text-green-800' :
                      ingredient.quality === 'Good' ? 'bg-blue-100 text-blue-800' :
                      ingredient.quality === 'Standard' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {ingredient.quality}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dish Name
              </label>
              <input
                type="text"
                value={dishName}
                onChange={(e) => setDishName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder="Enter a name for your dish"
              />
            </div>

            <div className="mb-4">
              <h4 className="font-semibold mb-2">Your Cook Stat: {player.stats.cook}</h4>
              <DiceRoller onRoll={handleRoll} disabled={selectedIngredients.length === 0} />
            </div>
            {rollResult !== null && (
              <div className="mb-4">
                <p className="font-semibold">Roll Result: {rollResult}</p>
                <p className="text-gray-700">{message}</p>
              </div>
            )}
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-2">Selected Ingredients</h3>
            {selectedIngredients.length === 0 ? (
              <p className="text-gray-600">No ingredients selected yet.</p>
            ) : (
              <div className="space-y-2">
                {selectedIngredients.map((ingredient) => (
                  <div
                    key={ingredient.id}
                    className="p-3 rounded bg-blue-50 border-2 border-blue-200"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">{ingredient.name}</span>
                      <span className={`text-sm px-2 py-1 rounded ${
                        ingredient.quality === 'Prime' ? 'bg-green-100 text-green-800' :
                        ingredient.quality === 'Good' ? 'bg-blue-100 text-blue-800' :
                        ingredient.quality === 'Standard' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {ingredient.quality}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">Created Dish</h3>
              {createdDish ? (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-lg mb-2">{createdDish.name}</h4>
                  <p className="text-gray-700 mb-2">{createdDish.description}</p>
                  <div className="mb-2">
                    <span className="font-semibold">Quality:</span>{' '}
                    <span className="text-blue-600">{createdDish.quality}/10</span>
                  </div>
                  <div>
                    <span className="font-semibold">Estimated Price:</span>{' '}
                    <span className="text-yellow-600">{createdDish.price} coins</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600">No dish created yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={() => dispatch({ type: 'SET_PHASE', payload: 'Harvest' })}
          className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
        >
          Return to Harvest
        </button>
        <button
          onClick={handleNextPhase}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          disabled={!createdDish}
        >
          Proceed to Market
        </button>
      </div>
    </div>
  );
} 