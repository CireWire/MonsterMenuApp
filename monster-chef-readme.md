# Monster Menu - NextJS Web Application

A digital adaptation of the Monster Menu tabletop role-playing game where players hunt monsters, harvest ingredients, cook unique dishes, and sell them to build their culinary reputation.

![Monster Menu Banner](https://via.placeholder.com/800x400)

## 📋 Overview

Monster Chef is an interactive single-player RPG where you play as a wandering chef who hunts monsters for ingredients. Hunt beasts in the wild, harvest choice ingredients, craft delicious recipes, and sell your creations to earn coin and reputation. Upgrade your cart, improve your skills, and become the most renowned Monster Chef in the land!

## 🛠️ Tech Stack

- **Frontend**: NextJS, React, TypeScript
- **Styling**: TailwindCSS
- **State Management**: React Context API or Redux
- **Database**: Local Storage (MVP), Firebase (future)

## 🔄 Game Flow

The application follows the game's six core phases:

1. **Find a Job/Rumor** - Discover potential monster targets
2. **The Hunt** - Track and battle monsters in the wild
3. **The Harvest** - Collect ingredients from defeated monsters
4. **The Cook** - Create dishes from harvested ingredients
5. **The Sell** - Sell your creations at your food cart
6. **Downtime** - Spend earnings on upgrades and supplies

## 📁 Project Structure

```
/
├── components/
│   ├── layout/
│   │   ├── Layout.tsx
│   │   ├── Header.tsx
│   │   └── Footer.tsx
│   ├── game/
│   │   ├── CharacterCreation.tsx
│   │   ├── JobBoard.tsx
│   │   ├── HuntingScreen.tsx
│   │   ├── HarvestScreen.tsx
│   │   ├── CookingScreen.tsx
│   │   ├── MarketScreen.tsx
│   │   ├── DowntimeScreen.tsx
│   │   └── Journal.tsx
│   ├── ui/
│   │   ├── Button.tsx
│   │   ├── DiceRoller.tsx
│   │   ├── StatBlock.tsx
│   │   ├── InventoryItem.tsx
│   │   └── RecipeCard.tsx
│   └── shared/
│       ├── Notifications.tsx
│       └── Modal.tsx
├── contexts/
│   ├── GameStateContext.tsx
│   └── PlayerContext.tsx
├── hooks/
│   ├── useGameMechanics.ts
│   └── useDiceRoll.ts
├── lib/
│   ├── gameHelpers.ts
│   ├── monsterData.ts
│   └── ingredientData.ts
├── pages/
│   ├── index.tsx
│   ├── game/index.tsx
│   ├── character/create.tsx
│   ├── journal.tsx
│   └── about.tsx
├── styles/
│   └── globals.css
└── types/
    ├── character.ts
    ├── monster.ts
    └── game.ts
```

## 🧩 Core Features Implementation

### Character Creation

- Name input for Chef and Cart
- Stat distribution (HUNT, COOK, CHARM)
- Equipment selection
- Signature dish concept

### Game State Management

- Player stats tracking
- Inventory management
- Health and durability tracking
- Money and reputation systems

### Dice Rolling Mechanism

Implement the core d6 + stat mechanic:
- 6+ = Critical Success
- 4-5 = Success
- 2-3 = Mixed Success
- 1 = Failure

### Monster Encounters

- Monster database with stats, descriptions and difficulty ratings
- Dynamic encounter generation
- Combat resolution system
- Success/failure tracking

### Cooking System

- Ingredient combination interface
- Recipe creation mechanics
- Quality rating calculations
- Visual representation of dishes

### Market/Sales System

- Customer simulation
- Revenue calculation
- Reputation tracking
- Random events

### Journal System

Allow players to document their adventures with:
- Auto-generated journal entries
- Custom notes
- Image attachment option
- Adventure timeline

## 📱 Responsive Design

The application should be fully responsive to work on:
- Desktop computers
- Tablets
- Mobile phones

## 🎮 User Experience Considerations

- **Onboarding**: Tutorial for new players
- **Accessibility**: Screen reader support, keyboard navigation
- **Save System**: Auto-save and manual save options
- **Audio**: Ambient sounds, feedback effects (optional)
- **Visual Feedback**: Animations for dice rolls, cooking, combat

## 📈 Future Enhancements

- **Online Features**: Share recipes with other players
- **Expanded Content**: More monsters, regions, ingredients
- **Progressive Web App**: Offline functionality
- **Authentication**: User accounts to track progress across devices

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📖 Game Rules Reference

The complete game rules are available in the [RULES.md](RULES.md) file, which details all gameplay mechanics, tables, and options directly from the original tabletop RPG.

## 🤝 Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🎲 Game Data Structure Examples

### Player Character
```typescript
interface PlayerCharacter {
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
```

### Monster
```typescript
interface Monster {
  id: string;
  name: string;
  type: MonsterType;
  dangerLevel: number;
  description: string;
  successesNeeded: number;
  possibleIngredients: string[];
  imageUrl?: string;
}
```

### Ingredient
```typescript
interface Ingredient {
  id: string;
  name: string;
  quality: 'Poor' | 'Standard' | 'Good' | 'Prime';
  monsterSource: string;
  specialProperty?: string;
  quantity: number;
}
```

Happy hunting and cooking!
