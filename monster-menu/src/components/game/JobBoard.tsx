import React from 'react';
import { useGameState } from '@/contexts/GameStateContext';
import { Monster } from '@/types/game';

const availableJobs: Array<{
  monster: Monster;
  reward: number;
  deadline: string;
}> = [
  {
    monster: {
      id: '1',
      name: 'Fire Drake',
      type: 'Beast',
      dangerLevel: 3,
      description: 'A small but fierce dragon-like creature that roams the volcanic regions.',
      successesNeeded: 3,
      possibleIngredients: ['Dragon Scale', 'Fire Gland', 'Drake Meat'],
      imageUrl: '/monsters/fire-drake.jpg',
    },
    reward: 150,
    deadline: '3 days',
  },
  {
    monster: {
      id: '2',
      name: 'Forest Troll',
      type: 'Beast',
      dangerLevel: 2,
      description: 'A large, slow-moving creature that regenerates quickly.',
      successesNeeded: 2,
      possibleIngredients: ['Troll Blood', 'Troll Hide', 'Troll Liver'],
      imageUrl: '/monsters/forest-troll.jpg',
    },
    reward: 100,
    deadline: '2 days',
  },
  {
    monster: {
      id: '3',
      name: 'Crystal Golem',
      type: 'Construct',
      dangerLevel: 4,
      description: 'A magical construct made of living crystal.',
      successesNeeded: 4,
      possibleIngredients: ['Crystal Shard', 'Magical Core', 'Golem Dust'],
      imageUrl: '/monsters/crystal-golem.jpg',
    },
    reward: 200,
    deadline: '4 days',
  },
];

export default function JobBoard() {
  const { state, dispatch } = useGameState();

  const acceptJob = (job: typeof availableJobs[0]) => {
    dispatch({ type: 'SET_JOB', payload: job });
    dispatch({ type: 'SET_PHASE', payload: 'Hunt' });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Available Jobs</h2>
      <p className="text-gray-600">
        Choose a monster to hunt. Consider your stats and the monster's danger level before accepting a job.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {availableJobs.map((job) => (
          <div
            key={job.monster.id}
            className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
          >
            <h3 className="text-xl font-semibold mb-2">{job.monster.name}</h3>
            <div className="text-sm text-gray-600 mb-2">
              Type: {job.monster.type}
            </div>
            <div className="text-sm text-gray-600 mb-2">
              Danger Level: {job.monster.dangerLevel}
            </div>
            <p className="text-gray-700 mb-4">{job.monster.description}</p>
            <div className="mb-4">
              <h4 className="font-semibold mb-1">Possible Ingredients:</h4>
              <ul className="list-disc list-inside text-sm text-gray-600">
                {job.monster.possibleIngredients.map((ingredient) => (
                  <li key={ingredient}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <div className="text-yellow-600 font-semibold">
                  Reward: {job.reward} coins
                </div>
                <div className="text-sm text-gray-600">
                  Deadline: {job.deadline}
                </div>
              </div>
              <button
                onClick={() => acceptJob(job)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
              >
                Accept Job
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 