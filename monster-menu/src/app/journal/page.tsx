"use client";

import React, { useState } from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import { JournalEntry } from '@/types/game';

type EntryType = 'All' | 'Hunt' | 'Cook' | 'Market' | 'Downtime';

export default function JournalPage() {
  const { state } = useGameState();
  const [selectedType, setSelectedType] = useState<EntryType>('All');
  const { journal } = state.player;

  const filteredEntries = selectedType === 'All' 
    ? journal 
    : journal.filter(entry => entry.type === selectedType);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Your Journal</h1>
        <div className="flex space-x-2">
          {(['All', 'Hunt', 'Cook', 'Market', 'Downtime'] as EntryType[]).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-4 py-2 rounded-lg ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {filteredEntries.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600">No journal entries yet.</p>
          <p className="text-gray-500 mt-2">Your adventures will be recorded here!</p>
        </div>
      ) : (
        <div className="space-y-8">
          {filteredEntries.map((entry: JournalEntry) => (
            <div 
              key={entry.id}
              className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-semibold">{entry.title}</h2>
                  <p className="text-gray-500">{formatDate(entry.date)}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  entry.type === 'Hunt' ? 'bg-red-100 text-red-800' :
                  entry.type === 'Cook' ? 'bg-green-100 text-green-800' :
                  entry.type === 'Market' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-blue-100 text-blue-800'
                }`}>
                  {entry.type}
                </span>
              </div>
              
              <p className="text-gray-700 whitespace-pre-line">{entry.content}</p>
              
              {entry.imageUrl && (
                <div className="mt-4">
                  <img 
                    src={entry.imageUrl} 
                    alt={entry.title}
                    className="rounded-lg max-w-full h-auto"
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 