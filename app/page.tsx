"use client";

import React from 'react';
import Link from 'next/link';
import { useGameState } from '@/contexts/GameStateContext';

export default function Home() {
  const { state } = useGameState();
  const { player } = state;

  return (
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to Monster Menu</h1>
      <p className="text-xl mb-8">
        Hunt monsters, harvest ingredients, and create culinary masterpieces in this unique RPG adventure!
      </p>

      {!player.name ? (
        <div className="space-y-4">
          <Link
            href="/character/create"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Character
          </Link>
          <p className="text-gray-600">Start your culinary adventure today!</p>
        </div>
      ) : (
        <div className="space-y-4">
          <Link
            href="/game"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Continue Your Adventure
          </Link>
          <p className="text-gray-600">
            Welcome back, {player.name}! Ready to hunt some monsters?
          </p>
        </div>
      )}

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Hunt Monsters</h2>
          <p className="text-gray-600">
            Track and battle fearsome creatures in the wild to gather rare ingredients.
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Cook Dishes</h2>
          <p className="text-gray-600">
            Combine ingredients to create unique and powerful dishes that impress your customers.
          </p>
        </div>
        <div className="p-6 bg-gray-100 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Build Reputation</h2>
          <p className="text-gray-600">
            Sell your creations, earn money, and become the most renowned Monster Chef in the land!
          </p>
        </div>
      </div>
    </div>
  );
}
