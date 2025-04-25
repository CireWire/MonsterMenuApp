"use client";

import React from 'react';
import Link from 'next/link';
import { useGameState } from '@/contexts/GameStateContext';

export default function Header() {
  const { state } = useGameState();
  const { player } = state;

  return (
    <header className="bg-brown-900 text-white p-4 border-b-4 border-brown-700">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <Link href="/" className="text-3xl font-bold font-serif">
            Monster Menu
          </Link>
          <nav className="hidden md:flex space-x-6">
            <Link href="/game" className="hover:text-brown-300 transition-colors">
              Game
            </Link>
            <Link href="/journal" className="hover:text-brown-300 transition-colors">
              Journal
            </Link>
            <Link href="/about" className="hover:text-brown-300 transition-colors">
              About
            </Link>
          </nav>
        </div>
        
        {player.name && (
          <div className="flex items-center space-x-6">
            <div className="text-sm">
              <span className="font-bold">{player.name}</span>
              <span className="text-brown-300 ml-2">({player.cartName})</span>
            </div>
            <div className="flex space-x-3">
              <span className="bg-brown-700 px-3 py-1 rounded border border-brown-600">💰 {player.money}</span>
              <span className="bg-brown-700 px-3 py-1 rounded border border-brown-600">⭐ {player.reputation}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 