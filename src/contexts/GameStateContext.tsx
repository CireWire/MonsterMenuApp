"use client";

import { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, PlayerCharacter } from '@/types/game';

type GameAction =
  | { type: 'SET_PLAYER'; payload: PlayerCharacter }
  | { type: 'SET_PHASE'; payload: GameState['currentPhase'] }
  | { type: 'SET_MONSTER'; payload: GameState['currentMonster'] }
  | { type: 'SET_JOB'; payload: GameState['currentJob'] }
  | { type: 'UPDATE_STATS'; payload: Partial<PlayerCharacter> }
  | { type: 'UPDATE_INVENTORY'; payload: Partial<PlayerCharacter['inventory']> }
  | { type: 'UPDATE_MONEY'; payload: number }
  | { type: 'UPDATE_REPUTATION'; payload: number };

const initialState: GameState = {
  player: {
    name: '',
    cartName: '',
    stats: {
      hunt: 0,
      cook: 0,
      charm: 0,
    },
    health: {
      current: 10,
      max: 10,
    },
    durability: {
      current: 10,
      max: 10,
    },
    inventory: {
      ingredients: [],
      dishes: [],
      supplies: [],
      rations: 0,
    },
    money: 0,
    reputation: 0,
    signatureDish: '',
    journal: [],
  },
  currentPhase: 'Job',
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'SET_PLAYER':
      return { ...state, player: action.payload };
    case 'SET_PHASE':
      return { ...state, currentPhase: action.payload };
    case 'SET_MONSTER':
      return { ...state, currentMonster: action.payload };
    case 'SET_JOB':
      return { ...state, currentJob: action.payload };
    case 'UPDATE_STATS':
      return {
        ...state,
        player: {
          ...state.player,
          ...action.payload,
        },
      };
    case 'UPDATE_INVENTORY':
      return {
        ...state,
        player: {
          ...state.player,
          inventory: { ...state.player.inventory, ...action.payload },
        },
      };
    case 'UPDATE_MONEY':
      return {
        ...state,
        player: {
          ...state.player,
          money: state.player.money + action.payload,
        },
      };
    case 'UPDATE_REPUTATION':
      return {
        ...state,
        player: {
          ...state.player,
          reputation: state.player.reputation + action.payload,
        },
      };
    default:
      return state;
  }
}

const GameStateContext = createContext<{
  state: GameState;
  dispatch: React.Dispatch<GameAction>;
} | null>(null);

export function GameStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(gameReducer, initialState);

  return (
    <GameStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GameStateContext.Provider>
  );
}

export function useGameState() {
  const context = useContext(GameStateContext);
  if (!context) {
    throw new Error('useGameState must be used within a GameStateProvider');
  }
  return context;
} 