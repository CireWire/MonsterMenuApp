"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useGameState } from '@/contexts/GameStateContext';
import { PlayerCharacter } from '@/types/game';

export default function CharacterCreation() {
  const router = useRouter();
  const { dispatch } = useGameState();
  const [formData, setFormData] = useState<Partial<PlayerCharacter>>({
    name: '',
    cartName: '',
    stats: {
      hunt: 0,
      cook: 0,
      charm: 0,
    },
    signatureDish: '',
  });

  const [remainingPoints, setRemainingPoints] = useState(2);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCharacter: PlayerCharacter = {
      ...formData,
      name: formData.name || '',
      cartName: formData.cartName || '',
      stats: formData.stats || { hunt: 0, cook: 0, charm: 0 },
      health: { current: 10, max: 10 },
      durability: { current: 10, max: 10 },
      inventory: {
        ingredients: [],
        dishes: [],
        supplies: [],
        rations: 0,
      },
      money: 0,
      reputation: 0,
      signatureDish: formData.signatureDish || '',
      journal: [],
    };

    dispatch({ type: 'SET_PLAYER', payload: newCharacter });
    router.push('/game');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStatChange = (stat: keyof PlayerCharacter['stats'], value: number) => {
    const currentStats = formData.stats || { hunt: 0, cook: 0, charm: 0 };
    const currentValue = currentStats[stat];
    const diff = value - currentValue;
    
    // Check if we have enough points to make this change
    if (remainingPoints - diff < 0 || value < 0 || value > 2) {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      stats: {
        ...(prev.stats || { hunt: 0, cook: 0, charm: 0 }),
        [stat]: value,
      },
    }));
    
    setRemainingPoints(remainingPoints - diff);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Create Your Character</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chef Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Cart Name
          </label>
          <input
            type="text"
            name="cartName"
            value={formData.cartName}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Signature Dish
          </label>
          <input
            type="text"
            name="signatureDish"
            value={formData.signatureDish}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Stats (0-2 points each)</h2>
            <span className="text-sm font-medium text-gray-600">
              Remaining Points: {remainingPoints}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hunt
              </label>
              <input
                type="number"
                min="0"
                max="2"
                value={formData.stats?.hunt}
                onChange={(e) => handleStatChange('hunt', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Cook
              </label>
              <input
                type="number"
                min="0"
                max="2"
                value={formData.stats?.cook}
                onChange={(e) => handleStatChange('cook', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Charm
              </label>
              <input
                type="number"
                min="0"
                max="2"
                value={formData.stats?.charm}
                onChange={(e) => handleStatChange('charm', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Distribute 2 stat points among Hunt, Cook, and Charm. You can increase these stats later through upgrades.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Start Your Adventure
        </button>
      </form>
    </div>
  );
} 