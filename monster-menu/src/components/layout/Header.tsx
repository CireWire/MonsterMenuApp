"use client";

import React from 'react';
import Link from 'next/link';
import { useGameState } from '@/contexts/GameStateContext';

export default function Header() {
  const { state } = useGameState();
  const { player } = state;

  return (
    <header className="bg-brown-950 text-gray-100 p-4 border-b-4 border-brown-800">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-3xl font-bold font-serif text-gray-100">
            Monster Menu
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/game" className="text-gray-700 hover:text-gray-800 transition-colors">
              Game
            </Link>
            <Link href="/journal" className="text-gray-700 hover:text-gray-800 transition-colors">
              Journal
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-gray-800 transition-colors">
              About
            </Link>
          </nav>
        </div>
        
        {player.name && (
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <span className="font-bold text-gray-100">{player.name}</span>
              <span className="text-brown-300 ml-2">({player.cartName})</span>
            </div>
            <div className="flex space-x-3">
              <span className="bg-brown-700 px-3 py-1 rounded border border-brown-600 text-gray-100">💰 {player.money}</span>
              <span className="bg-brown-700 px-3 py-1 rounded border border-brown-600 text-gray-100">⭐ {player.reputation}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 