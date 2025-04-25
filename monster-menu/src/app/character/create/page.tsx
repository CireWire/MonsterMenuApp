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
      hunt: 1,
      cook: 1,
      charm: 1,
    },
    signatureDish: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newCharacter: PlayerCharacter = {
      ...formData,
      name: formData.name || '',
      cartName: formData.cartName || '',
      stats: formData.stats || { hunt: 1, cook: 1, charm: 1 },
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
    setFormData((prev) => ({
      ...prev,
      stats: {
        ...prev.stats,
        [stat]: Math.max(1, Math.min(5, value)),
      },
    }));
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
          <h2 className="text-xl font-semibold">Stats (1-5 points each)</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Hunt
              </label>
              <input
                type="number"
                min="1"
                max="5"
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
                min="1"
                max="5"
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
                min="1"
                max="5"
                value={formData.stats?.charm}
                onChange={(e) => handleStatChange('charm', parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              />
            </div>
          </div>
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