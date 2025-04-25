export type MonsterType = 'Beast' | 'Elemental' | 'Undead' | 'Aberration' | 'Construct';

export interface PlayerCharacter {
  name: string;
  cartName: string;
  stats: {
    hunt: number;
    cook: number;
    charm: number;
  };
  health: {
    current: number;
    max: number;
  };
  durability: {
    current: number;
    max: number;
  };
  inventory: {
    ingredients: Ingredient[];
    dishes: Dish[];
    supplies: Supply[];
    rations: number;
  };
  money: number;
  reputation: number;
  signatureDish: string;
  journal: JournalEntry[];
}

export interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  dangerLevel: number;
  description: string;
  successesNeeded: number;
  possibleIngredients: string[];
  imageUrl?: string;
}

export interface Ingredient {
  id: string;
  name: string;
  quality: 'Poor' | 'Standard' | 'Good' | 'Prime';
  monsterSource: string;
  specialProperty?: string;
  quantity: number;
}

export interface Dish {
  id: string;
  name: string;
  ingredients: Ingredient[];
  quality: number;
  price: number;
  description: string;
}

export interface Supply {
  id: string;
  name: string;
  quantity: number;
  cost: number;
}

export interface JournalEntry {
  id: string;
  date: string;
  title: string;
  content: string;
  type: 'Hunt' | 'Cook' | 'Market' | 'Downtime';
  imageUrl?: string;
}

export interface GameState {
  player: PlayerCharacter;
  currentPhase: 'Job' | 'Hunt' | 'Harvest' | 'Cook' | 'Sell' | 'Downtime';
  currentMonster?: Monster;
  currentJob?: {
    monster: Monster;
    reward: number;
    deadline: string;
  };
} 