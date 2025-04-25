"use client";

import React from 'react';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-4xl font-bold mb-8">About Monster Menu</h1>
      
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold mb-4">The Game</h2>
          <p className="text-lg mb-4">
            Monster Menu is a unique tabletop role-playing game that combines monster hunting with culinary arts. 
            Players take on the role of monster hunters who also run a food cart, using the ingredients they 
            harvest from their hunts to create delicious dishes.
          </p>
          <p className="text-lg">
            This digital adaptation brings the game to life with an interactive interface, making it easier 
            to track your character's progress, manage your inventory, and create culinary masterpieces.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">How to Play</h2>
          <div className="space-y-4">
            <p className="text-lg">
              1. <strong>Create Your Character:</strong> Choose your name, cart name, and distribute your stats 
              (Hunt, Cook, and Charm).
            </p>
            <p className="text-lg">
              2. <strong>Take on Jobs:</strong> Accept contracts to hunt specific monsters for their ingredients.
            </p>
            <p className="text-lg">
              3. <strong>Hunt & Harvest:</strong> Track down monsters and harvest their ingredients.
            </p>
            <p className="text-lg">
              4. <strong>Cook & Create:</strong> Use your ingredients to create dishes in your cart.
            </p>
            <p className="text-lg">
              5. <strong>Sell & Grow:</strong> Sell your dishes to customers and grow your reputation.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Credits</h2>
          <p className="text-lg mb-4">
            Monster Menu was created by Eric Gutierrez Jr. and is brought to life in this digital adaptation 
            by The Helix Corporation.
          </p>
          <p className="text-lg">
            Special thanks to all the playtesters and contributors who helped shape this game.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Get Started</h2>
          <p className="text-lg mb-4">
            Ready to begin your culinary monster hunting adventure?
          </p>
          <Link 
            href="/character/create" 
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create Your Character
          </Link>
        </section>
      </div>
    </div>
  );
} 