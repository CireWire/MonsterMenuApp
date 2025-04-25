"use client";

import React from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import JobBoard from '@/components/game/JobBoard';
import HuntingScreen from '@/components/game/HuntingScreen';
import HarvestScreen from '@/components/game/HarvestScreen';
import CookingScreen from '@/components/game/CookingScreen';
import MarketScreen from '@/components/game/MarketScreen';
import DowntimeScreen from '@/components/game/DowntimeScreen';

export default function GamePage() {
  const { state } = useGameState();
  const { currentPhase } = state;

  if (!state.player.name) {
    return (
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">No Character Found</h1>
        <p className="mb-4">Please create a character to start playing.</p>
        <a
          href="/character/create"
          className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Character
        </a>
      </div>
    );
  }

  const renderPhase = () => {
    switch (currentPhase) {
      case 'Job':
        return <JobBoard />;
      case 'Hunt':
        return <HuntingScreen />;
      case 'Harvest':
        return <HarvestScreen />;
      case 'Cook':
        return <CookingScreen />;
      case 'Sell':
        return <MarketScreen />;
      case 'Downtime':
        return <DowntimeScreen />;
      default:
        return <JobBoard />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Game Phase: {currentPhase}</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-yellow-500 text-white px-4 py-2 rounded">
            <div className="text-sm font-semibold">Money</div>
            <div className="text-lg">{state.player.money}</div>
          </div>
          <div className="bg-blue-500 text-white px-4 py-2 rounded">
            <div className="text-sm font-semibold">Reputation</div>
            <div className="text-lg">{state.player.reputation}</div>
          </div>
          <div className="bg-red-500 text-white px-4 py-2 rounded">
            <div className="text-sm font-semibold">Health</div>
            <div className="text-lg">{state.player.health.current}/{state.player.health.max}</div>
          </div>
          <div className="bg-gray-500 text-white px-4 py-2 rounded">
            <div className="text-sm font-semibold">Durability</div>
            <div className="text-lg">{state.player.durability.current}/{state.player.durability.max}</div>
          </div>
        </div>
      </div>

      {renderPhase()}
    </div>
  );
} 