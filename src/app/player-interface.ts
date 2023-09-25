export interface PlayerStats{
    minDmg: number,
    maxDmg: number,
    dex: number,
    evade: number,
    defense: number,
    gold: number,
    points: number,
    hp: number,
    maxHp: number,
}

export interface PlayerEquipment{
    primary: Object,
    secondary: Object,
    armor: Object,
    inventory: any[],
  }
  
  export interface PlayerData{
    equipment: PlayerEquipment,
    stats: PlayerStats,
  }

  export const defaultStats = {
    minDmg: 0,
    maxDmg: 0,
    dex: 0,
    evade: 0,
    defense: 0,
    gold: 1000,
    points: 0,
    hp: 100,
    maxHp: 100,
};

export const startingEquipment = {
  primary:{
    basicSword: {
      type: 'primary',
      name: 'Dull Blade',
      minDmg: 2,
      maxDmg: 5,
      dex: 7,
      cost: 0,
  
    },
  },
  secondary: {
    fist: {
      type: 'secondary',
      name: 'fist',
      dex: 0,
      minDmg: 0,
      hp: 0,
      cost: 0,
    }
  },
  armor: {
    clothes: {
      type: 'armor',
      name: 'Soiled Clothes',
      defense: 0,
      evade: 7,
      cost: 0,
    },
  },
  inventory: []
};