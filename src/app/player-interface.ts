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

export interface Weapon{
  type: string,
  name: string,
  minDmg: number,
  maxDmg: number,
  dex: number,
  cost: number,
}

export interface Armor{
  type: string,
  name: string,
  defense: number,
  evade: number,
  cost: number,
}

export interface PlayerEquipment{
    primary: Weapon,
    secondary: Weapon,
    armor: Armor,
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
    type: 'primary',
    name: 'Dull Blade',
    minDmg: 2,
    maxDmg: 5,
    dex: 6,
    cost: 0,
  },
  secondary: {
    type: 'secondary',
    name: 'fist',
    minDmg: 0,
    maxDmg: 1,
    dex: 1,
    cost: 0,
  },
  armor: {
    type: 'armor',
    name: 'Soiled Clothes',
    defense: 0,
    evade: 7,
    cost: 0,
  },
  inventory: []
};