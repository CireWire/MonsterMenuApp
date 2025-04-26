"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useGameState } from '@/contexts/GameStateContext';

export default function Header() {
  const { state } = useGameState();
  const { player } = state;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="bg-brown-950 text-gray-100 p-4 border-b-4 border-brown-800">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-3xl font-bold font-serif text-gray-700">
            Monster Menu
          </Link>
          
          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 hover:text-gray-800"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Desktop navigation */}
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

        {/* Mobile navigation */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 space-y-4">
            <Link
              href="/game"
              className="block text-gray-700 hover:text-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Game
            </Link>
            <Link
              href="/journal"
              className="block text-gray-700 hover:text-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Journal
            </Link>
            <Link
              href="/about"
              className="block text-gray-700 hover:text-gray-800 transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              About
            </Link>
          </nav>
        )}
        
        {player.name && (
          <div className="flex items-center space-x-6 mt-4 md:mt-0">
            <div className="text-sm">
              <span className="font-bold text-gray-100">{player.name}</span>
              <span className="text-brown-300 ml-2">({player.cartName})</span>
            </div>
            <div className="flex space-x-3">
              <span className="bg-brown-700 px-3 py-1 rounded border border-brown-600 text-gray-700">💰 {player.money}</span>
              <span className="bg-brown-700 px-3 py-1 rounded border border-brown-600 text-gray-700">⭐ {player.reputation}</span>
            </div>
          </div>
        )}
      </div>
    </header>
  );
} 