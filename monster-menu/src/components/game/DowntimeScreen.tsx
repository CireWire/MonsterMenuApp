import React from 'react';
import { useGameState } from '@/contexts/GameStateContext';

const upgrades = [
  {
    id: 'health',
    name: 'Health Upgrade',
    description: 'Increase your maximum health by 2',
    cost: 100,
    effect: (player: any) => ({
      health: {
        current: player.health.max + 2,
        max: player.health.max + 2,
      },
    }),
  },
  {
    id: 'durability',
    name: 'Cart Durability',
    description: 'Increase your cart\'s maximum durability by 2',
    cost: 150,
    effect: (player: any) => ({
      durability: {
        current: player.durability.max + 2,
        max: player.durability.max + 2,
      },
    }),
  },
  {
    id: 'hunt',
    name: 'Hunting Training',
    description: 'Increase your Hunt stat by 1',
    cost: 200,
    effect: (player: any) => ({
      stats: {
        ...player.stats,
        hunt: player.stats.hunt + 1,
      },
    }),
  },
  {
    id: 'cook',
    name: 'Cooking Training',
    description: 'Increase your Cook stat by 1',
    cost: 200,
    effect: (player: any) => ({
      stats: {
        ...player.stats,
        cook: player.stats.cook + 1,
      },
    }),
  },
  {
    id: 'charm',
    name: 'Charm Training',
    description: 'Increase your Charm stat by 1',
    cost: 200,
    effect: (player: any) => ({
      stats: {
        ...player.stats,
        charm: player.stats.charm + 1,
      },
    }),
  },
];

export default function DowntimeScreen() {
  const { state, dispatch } = useGameState();
  const { player } = state;

  const handleRest = () => {
    dispatch({
      type: 'UPDATE_STATS',
      payload: {
        health: {
          current: player.health.max,
          max: player.health.max,
        },
        durability: {
          current: player.durability.max,
          max: player.durability.max,
        },
      },
    });
  };

  const handleUpgrade = (upgrade: typeof upgrades[0]) => {
    if (player.money >= upgrade.cost) {
      dispatch({
        type: 'UPDATE_STATS',
        payload: upgrade.effect(player),
      });
      dispatch({ type: 'UPDATE_MONEY', payload: -upgrade.cost });
    }
  };

  const handleNextDay = () => {
    dispatch({ type: 'SET_PHASE', payload: 'Job' });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Downtime</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Rest and Recovery</h3>
            <button
              onClick={handleRest}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded hover:bg-blue-700"
            >
              Rest (Restore Health and Durability)
            </button>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Upgrades</h3>
            <div className="space-y-4">
              {upgrades.map((upgrade) => (
                <div
                  key={upgrade.id}
                  className="bg-gray-50 p-4 rounded-lg"
                >
                  <h4 className="font-semibold">{upgrade.name}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {upgrade.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-yellow-600 font-semibold">
                      {upgrade.cost} coins
                    </span>
                    <button
                      onClick={() => handleUpgrade(upgrade)}
                      disabled={player.money < upgrade.cost}
                      className={`px-4 py-2 rounded ${
                        player.money >= upgrade.cost
                          ? 'bg-green-600 text-white hover:bg-green-700'
                          : 'bg-gray-400 text-white cursor-not-allowed'
                      }`}
                    >
                      Purchase
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleNextDay}
          className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700"
        >
          Start New Day
        </button>
      </div>
    </div>
  );
} 