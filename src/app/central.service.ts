import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CentralService {
  output: any = [];
  playerImage: any = 'hero';
  enemyImage: any;

  constructor() {}

  randomPlaceholderImage() {
    this.enemyImage = Math.floor(Math.random() * 15 + 1);
  }

  getLocation() {
    return this.location;
  }
  setLocation(location) {
    this.location = location;
    console.log('Have location: ', location);
  }
  setRandomLocation(rand) {
    let place = this.areasArray[rand];
    this.setLocation(this.areas[place.name]);
  }
  updateOutput(update) {
    this.output.push(update);
    if (this.output.length > 5) {
      this.output.shift();
    }
  }

  poison: boolean = false;
  poisonCount: number = 0;
  stun: boolean = false;
  vamp: boolean = false;
  stunned: boolean = false;

  bear = {
    name: 'Bear',
    hp: 12,
    attackStyle: 'swipes',
    minDmg: 3,
    maxDmg: 6,
    minHit: 4,
    maxHit: 10,
    minFlee: 5,
    maxFlee: 10,
    toHit: 8,
    gold: 5,
    points: 50,
  };
  goblins = {
    name: 'Goblin',
    hp: 6,
    attackStyle: 'attack',
    minDmg: 1,
    maxDmg: 5,
    minHit: 5,
    maxHit: 10,
    minFlee: 6,
    maxFlee: 10,
    toHit: 8,
    gold: 3,
    points: 10,
  };
  elf = {
    name: 'Elf',
    hp: 8,
    attackStyle: 'attacks',
    minDmg: 3,
    maxDmg: 5,
    minHit: 6,
    maxHit: 10,
    minFlee: 5,
    maxFlee: 10,
    toHit: 8,
    gold: 6,
    points: 30,
  };
  bandit = {
    name: 'Bandit',
    hp: 12,
    attackStyle: 'attacks',
    minDmg: 4,
    maxDmg: 6,
    minHit: 4,
    maxHit: 10,
    minFlee: 5,
    maxFlee: 10,
    toHit: 8,
    gold: 6,
    points: 30,
  };
  marauder = {
    name: 'Marauder',
    hp: 15,
    attackStyle: 'attacks',
    minDmg: 5,
    maxDmg: 8,
    minHit: 5,
    maxHit: 10,
    minFlee: 6,
    maxFlee: 10,
    toHit: 8,
    gold: 7,
    points: 40,
  };
  wolves = {
    name: 'Wolf',
    hp: 15,
    attackStyle: 'attack',
    minDmg: 2,
    maxDmg: 7,
    minHit: 4,
    maxHit: 11,
    minFlee: 5,
    maxFlee: 10,
    toHit: 8,
    gold: 5,
    points: 30,
  };
  wraith = {
    name: 'Wraith',
    hp: 18,
    attackStyle: 'attacks',
    minDmg: 4,
    maxDmg: 8,
    minHit: 5,
    maxHit: 11,
    minFlee: 6,
    maxFlee: 10,
    toHit: 9,
    gold: 8,
    points: 50,
  };
  mudMan = {
    name: 'Mud Man',
    hp: 14,
    attackStyle: 'attacks',
    minDmg: 3,
    maxDmg: 8,
    minHit: 5,
    maxHit: 11,
    minFlee: 6,
    maxFlee: 10,
    toHit: 8,
    gold: 5,
    points: 40,
  };
  poo = {
    name: 'Poo',
    hp: 20,
    attackStyle: 'lunges',
    minDmg: 3,
    maxDmg: 9,
    minHit: 6,
    maxHit: 11,
    minFlee: 7,
    maxFlee: 10,
    toHit: 8,
    gold: 8,
    points: 70,
  };
  leech = {
    name: 'Leech',
    hp: 14,
    attackStyle: 'bites',
    minDmg: 3,
    maxDmg: 8,
    minHit: 4,
    maxHit: 12,
    minFlee: 5,
    maxFlee: 10,
    toHit: 8,
    gold: 6,
    points: 35,

    special: 'vamp',
  };
  thrall = {
    name: 'Thrall',
    hp: 20,
    attackStyle: 'lunges',
    minDmg: 3,
    maxDmg: 9,
    minHit: 4,
    maxHit: 11,
    minFlee: 6,
    maxFlee: 12,
    toHit: 8,
    gold: 12,
    points: 60,
  };
  wyvren = {
    name: 'Wyvren',
    hp: 25,
    attackStyle: 'claws',
    minDmg: 5,
    maxDmg: 9,
    minHit: 4,
    maxHit: 11,
    minFlee: 6,
    maxFlee: 12,
    toHit: 8,
    gold: 11,
    points: 100,
  };
  fSprite = {
    name: 'Fire Sprite',
    hp: 30,
    attackStyle: 'throws fireball',
    minDmg: 5,
    maxDmg: 9,
    minHit: 5,
    maxHit: 12,
    minFlee: 5,
    maxFlee: 12,
    toHit: 9,
    gold: 15,
    points: 125,
  };
  mimic = {
    name: 'Mimic',
    hp: 35,
    attackStyle: 'chomps',
    minDmg: 5,
    maxDmg: 7,
    minHit: 6,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 20,
    points: 150,
  };
  mTroll = {
    name: 'Mountain Troll',
    hp: 50,
    attackStyle: 'clubs you',
    minDmg: 6,
    maxDmg: 8,
    minHit: 4,
    maxHit: 11,
    minFlee: 5,
    maxFlee: 12,
    toHit: 8,
    gold: 20,
    points: 140,
  };
  chaosEl = {
    name: 'Chaos Elemental',
    hp: 60,
    attackStyle: 'burns',
    minDmg: 7,
    maxDmg: 8,
    minHit: 7,
    maxHit: 12,
    minFlee: 7,
    maxFlee: 12,
    toHit: 10,
    gold: 28,
    points: 250,
  };
  bat = {
    name: 'Vampire Bat',
    hp: 30,
    attackStyle: 'bites',
    minDmg: 5,
    maxDmg: 5,
    minHit: 5,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 13,
    points: 120,

    special: 'vamp',
  };
  fern = {
    name: 'Fern Feind',
    hp: 30,
    attackStyle: 'whips',
    minDmg: 5,
    maxDmg: 7,
    minHit: 5,
    maxHit: 12,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 15,
    points: 125,
  };
  zombie = {
    name: 'Zombie',
    hp: 35,
    attackStyle: 'claws',
    minDmg: 6,
    maxDmg: 7,
    minHit: 6,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 20,
    points: 150,
  };
  panther = {
    name: 'Panther',
    hp: 40,
    attackStyle: 'claws',
    minDmg: 6,
    maxDmg: 8,
    minHit: 5,
    maxHit: 11,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 20,
    points: 140,
  };
  viper = {
    name: 'Viper',
    hp: 40,
    attackStyle: 'strikes',
    minDmg: 6,
    maxDmg: 7,
    minHit: 5,
    maxHit: 11,
    minFlee: 7,
    maxFlee: 11,
    toHit: 9,
    gold: 15,
    points: 160,
    special: 'poison',
  };
  malboro = {
    name: 'Malboro',
    hp: 35,
    attackStyle: 'swats',
    minDmg: 7,
    maxDmg: 6,
    minHit: 5,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 25,
    points: 150,
    special: 'poison',
  };
  litchling = {
    name: 'Litchling',
    hp: 35,
    attackStyle: 'claws',
    minDmg: 4,
    maxDmg: 9,
    minHit: 5,
    maxHit: 12,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 20,
    points: 175,

    special: 'vamp',
  };
  crows = {
    name: 'Murder Crows',
    hp: 50,
    attackStyle: 'dive bomb',
    minDmg: 5,
    maxDmg: 6,
    minHit: 6,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 25,
    points: 150,
  };
  banshee = {
    name: 'Banshee',
    hp: 55,
    attackStyle: 'claws',
    minDmg: 5,
    maxDmg: 8,
    minHit: 5,
    maxHit: 11,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 18,
    points: 140,
  };
  aElement = {
    name: 'Air Elemental',
    hp: 45,
    attackStyle: 'gusts',
    minDmg: 7,
    maxDmg: 5,
    minHit: 6,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 20,
    points: 150,
  };
  scorpion = {
    name: 'Crystal Scorpion',
    hp: 35,
    attackStyle: 'stings',
    minDmg: 5,
    maxDmg: 7,
    minHit: 5,
    maxHit: 12,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 17,
    points: 155,
    special: 'poison',
  };
  phantom = {
    name: 'Desert Phantom',
    hp: 40,
    attackStyle: 'Mind Flays',
    minDmg: 6,
    maxDmg: 6,
    minHit: 6,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 20,
    points: 150,
  };
  wisp = {
    name: "Will-o'-the-wisp",
    hp: 40,
    attackStyle: 'bludgeons',
    minDmg: 5,
    maxDmg: 7,
    minHit: 5,
    maxHit: 11,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 18,
    points: 140,
  };
  taranTroll = {
    name: 'Taran-Troll',
    hp: 60,
    attackStyle: 'lunges',
    minDmg: 6,
    maxDmg: 7,
    minHit: 4,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 20,
    points: 175,
  };
  ants = {
    name: 'Komodo Ants',
    hp: 40,
    attackStyle: 'sting',
    minDmg: 6,
    maxDmg: 5,
    minHit: 5,
    maxHit: 12,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 15,
    points: 155,
    special: 'poison',
  };
  doppleganger = {
    name: 'Doppleganger',
    hp: 40,
    attackStyle: 'strikes',
    minDmg: 6,
    maxDmg: 6,
    minHit: 5,
    maxHit: 11,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 18,
    points: 150,

    special: 'vamp',
  };
  miniBears = {
    name: 'Minibears',
    hp: 50,
    attackStyle: 'bite',
    minDmg: 5,
    maxDmg: 8,
    minHit: 6,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 9,
    gold: 20,
    points: 175,
  };
  witch = {
    name: 'Hag Witch',
    hp: 50,
    attackStyle: 'strikes',
    minDmg: 6,
    maxDmg: 7,
    minHit: 6,
    maxHit: 13,
    minFlee: 7,
    maxFlee: 14,
    toHit: 10,
    gold: 25,
    points: 220,

    special: 'stun',
  };
  mush = {
    name: 'Mush Man',
    hp: 50,
    attackStyle: 'strikes',
    minDmg: 6,
    maxDmg: 7,
    minHit: 5,
    maxHit: 11,
    minFlee: 5,
    maxFlee: 14,
    toHit: 10,
    gold: 25,
    points: 200,
    special: 'poison',
  };
  centaur = {
    name: 'Centaur',
    hp: 60,
    attackStyle: 'attacks',
    minDmg: 6,
    maxDmg: 9,
    minHit: 6,
    maxHit: 12,
    minFlee: 7,
    maxFlee: 15,
    toHit: 10,
    gold: 30,
    points: 250,
  };
  drunk = {
    name: 'Drunkass',
    hp: 25,
    attackStyle: 'swings',
    minDmg: 5,
    maxDmg: 8,
    minHit: 3,
    maxHit: 11,
    minFlee: 3,
    maxFlee: 14,
    toHit: 8,
    gold: 10,
    points: 80,
  };
  rat = {
    name: 'Sewer Rat',
    hp: 25,
    attackStyle: 'bites',
    minDmg: 5,
    maxDmg: 6,
    minHit: 6,
    maxHit: 12,
    minFlee: 7,
    maxFlee: 14,
    toHit: 9,
    gold: 15,
    points: 250,
  };
  cultist = {
    name: 'Cultist',
    hp: 20,
    attackStyle: 'stabs wildly',
    minDmg: 5,
    maxDmg: 7,
    minHit: 5,
    maxHit: 12,
    minFlee: 6,
    maxFlee: 12,
    toHit: 8,
    gold: 12,
    points: 110,

    special: 'vamp',
  };
  scarabs = {
    name: 'Scarabs',
    hp: 50,
    attackStyle: 'sting',
    minDmg: 6,
    maxDmg: 7,
    minHit: 5,
    maxHit: 12,
    minFlee: 5,
    maxFlee: 14,
    toHit: 10,
    gold: 22,
    points: 165,

    special: 'stun',
  };
  pViper = {
    name: 'Pit Viper',
    hp: 55,
    attackStyle: 'strikes',
    minDmg: 6,
    maxDmg: 7,
    minHit: 6,
    maxHit: 12,
    minFlee: 7,
    maxFlee: 15,
    toHit: 10,
    gold: 25,
    points: 200,
    special: 'poison',
  };
  spectre = {
    name: 'Spectre',
    hp: 60,
    attackStyle: 'attacks',
    minDmg: 6,
    maxDmg: 7,
    minHit: 6,
    maxHit: 12,
    minFlee: 7,
    maxFlee: 15,
    toHit: 10,
    gold: 18,
    points: 220,
  };
  chimera = {
    name: 'Chimera',
    hp: 65,
    attackStyle: 'attacks',
    minDmg: 5,
    maxDmg: 8,
    minHit: 5,
    maxHit: 13,
    minFlee: 7,
    maxFlee: 15,
    toHit: 10,
    gold: 24,
    points: 220,
    special: 'poison',
  };
  golem = {
    name: 'Stone Golem',
    hp: 80,
    attackStyle: 'swings',
    minDmg: 7,
    maxDmg: 9,
    minHit: 5,
    maxHit: 11,
    minFlee: 7,
    maxFlee: 15,
    toHit: 10,
    gold: 30,
    points: 240,
  };
  omegaTroll = {
    name: 'Omega Troll',
    hp: 80,
    attackStyle: 'clubs',
    minDmg: 7,
    maxDmg: 10,
    minHit: 4,
    maxHit: 13,
    minFlee: 7,
    maxFlee: 16,
    toHit: 10,
    gold: 40,
    points: 275,
  };
  sandMan = {
    name: 'Sandman',
    hp: 70,
    attackStyle: 'attacks',
    minDmg: 5,
    maxDmg: 7,
    minHit: 7,
    maxHit: 12,
    minFlee: 7,
    maxFlee: 16,
    toHit: 10,
    gold: 28,
    points: 175,

    special: 'stun',
  };
  fBat = {
    name: 'Fire Bat',
    hp: 60,
    attackStyle: 'bites',
    minDmg: 7,
    maxDmg: 6,
    minHit: 7,
    maxHit: 12,
    minFlee: 7,
    maxFlee: 16,
    toHit: 10,
    gold: 30,
    points: 220,

    special: 'vamp',
  };

  //enemies

  //bosses
  chaos = {
    name: 'Chaos',
    hp: 150,
    attackStyle: 'attacks',
    minDmg: 8,
    maxDmg: 9,
    minHit: 7,
    maxHit: 13,
    minFlee: 10,
    maxFlee: 20,
    toHit: 10,
    gold: 100,
    points: 1000,
  };
  chaosDemon = {
    name: 'Chaos Demon',
    hp: 90,
    attackStyle: 'attacks',
    minDmg: 6,
    maxDmg: 12,
    minHit: 5,
    maxHit: 12,
    minFlee: 8,
    maxFlee: 15,
    toHit: 9,
    gold: 50,
    points: 500,
  };
  horde = {
    name: 'Necro Horde',
    hp: 120,
    attackStyle: 'attacks',
    minDmg: 7,
    maxDmg: 9,
    minHit: 5,
    maxHit: 13,
    minFlee: 8,
    maxFlee: 17,
    toHit: 9,
    gold: 40,
    points: 600,
  };
  gryphon = {
    name: 'Gryphon',
    hp: 120,
    attackStyle: 'strikes',
    minDmg: 7,
    maxDmg: 9,
    minHit: 6,
    maxHit: 12,
    minFlee: 8,
    maxFlee: 20,
    toHit: 9,
    gold: 40,
    points: 600,
  };
  litchKing = {
    name: 'Litch  King',
    hp: 110,
    attackStyle: 'attacks',
    minDmg: 7,
    maxDmg: 10,
    minHit: 6,
    maxHit: 12,
    minFlee: 10,
    maxFlee: 20,
    toHit: 10,
    gold: 50,
    points: 800,

    special: 'vamp',
  };
  vandal = {
    name: 'Greasy Vandal',
    hp: 45,
    attackStyle: 'slashes',
    minDmg: 5,
    maxDmg: 10,
    minHit: 5,
    maxHit: 12,
    minFlee: 5,
    maxFlee: 14,
    toHit: 9,
    gold: 0,
    points: 250,
  };

  //vandal is "mini-boss" that triggers victim event that awards the player with +25 maxHp

  //NPCs
  lady = {
    name: 'Lady of the Lake',
    ability: 'watery tart',
    hp: 1,
    attackStyle: 'rendering',
    minDmg: 0,
    maxDmg: 0,
    minHit: 0,
    maxHit: 0,
    minFlee: 0,
    maxFlee: 0,
    toHit: 0,
    gold: 0,
    points: 0,
  };
  randomMerchant = {
    name: 'Random Merchant',
    ability: 'swindling',
    hp: 1,
    attackStyle: 'poverty',
    minDmg: 0,
    maxDmg: 0,
    minHit: 0,
    maxHit: 0,
    minFlee: 0,
    maxFlee: 0,
    toHit: 0,
    gold: 0,
    points: 0,
  };

  areas = {
    forest: {
      name: 'forest',
      enemies: [this.bear, this.goblins, this.elf, this.goblins],
    },
    merchantRoad: {
      name: 'merchantRoad',
      enemies: [this.wolves, this.bandit, this.marauder, this.elf],
    },
    swampRoad: {
      name: 'swampRoad',
      enemies: [this.wolves, this.wraith, this.mudMan, this.leech],
    },
    cityRoad: {
      name: 'cityRoad',
      enemies: [this.marauder, this.thrall, this.wyvren, this.bandit],
    },
    mountainRoad: {
      name: 'mountainRoad',
      enemies: [this.fSprite, this.mimic, this.mTroll, this.bat],
    },
    valleyRoad: {
      name: 'valleyRoad',
      enemies: [this.fern, this.zombie, this.panther, this.malboro],
    },
    marshRoad: {
      name: 'marshRoad',
      enemies: [this.litchling, this.crows, this.banshee, this.aElement],
    },
    desertRoad: {
      name: 'desertRoad',
      enemies: [this.scorpion, this.phantom, this.wisp, this.taranTroll],
    },
    cliffsRoad: {
      name: 'cliffsRoad',
      enemies: [this.ants, this.mimic, this.doppleganger, this.miniBears],
    },
    forestRoad: {
      name: 'forestRoad',
      enemies: [this.witch, this.bat, this.mush, this.centaur],
    },
    plainsRoad: {
      name: 'plainsRoad',
      enemies: [this.chimera, this.crows, this.sandMan, this.golem],
    },
    volcanoRoad: {
      name: 'volcanoRoad',
      enemies: [this.chaosEl, this.fBat, this.omegaTroll, this.chimera],
    },
    lake: {
      name: 'lake',
      enemies: [this.leech, this.mudMan, this.lady, this.poo],
    },
    city: {
      name: 'city',
      enemies: [this.drunk, this.vandal, this.rat, this.cultist],
    },
    mountain: {
      name: 'mountain',
      enemies: [this.fSprite, this.chaosDemon, this.mTroll, this.bat],
    },
    valley: {
      name: 'valley',
      enemies: [this.fern, this.randomMerchant, this.viper, this.malboro],
    },
    marsh: {
      name: 'marsh',
      enemies: [this.litchling, this.horde, this.crows, this.aElement],
    },
    desert: {
      name: 'desert',
      enemies: [this.scorpion, this.randomMerchant, this.wisp, this.taranTroll],
    },
    cliffs: {
      name: 'cliffs',
      enemies: [this.ants, this.gryphon, this.crows, this.miniBears],
    },
    tomb: {
      name: 'tomb',
      enemies: [this.scarabs, this.litchKing, this.pViper, this.spectre],
    },
    plains: {
      name: 'plains',
      enemies: [this.chimera, this.sandMan, this.crows, this.golem],
    },
    volcano: {
      name: 'volcano',
      enemies: [this.chaosEl, this.chaos, this.omegaTroll, this.fBat],
    },
  };
  //for randomized areas right now
  areasArray = [
    this.areas.forest,
    this.areas.merchantRoad,
    this.areas.swampRoad,
    this.areas.cityRoad,
    this.areas.mountainRoad,
    this.areas.valleyRoad,
    this.areas.marshRoad,
    this.areas.desertRoad,
    this.areas.cliffsRoad,
    this.areas.forestRoad,
    this.areas.plainsRoad,
    this.areas.volcanoRoad,
    this.areas.lake,
    this.areas.city,
    this.areas.mountain,
    this.areas.valley,
    this.areas.marsh,
    this.areas.desert,
    this.areas.cliffs,
    this.areas.tomb,
    this.areas.plains,
    this.areas.volcano,
  ];
  location: any = this.areas.forest;

  mainWeapon: any = {
    shortSword: {
      type: 'main',
      name: 'Shortsword',
      minDmg: 3,
      maxDmg: 6,
      dex: 7,
      cost: 10,
      special: '',
    },
    longSword: {
      type: 'main',
      name: 'Longsword',
      minDmg: 4,
      maxDmg: 9,
      dex: 6,
      cost: 15,
      special: '',
    },
    phantomBane: {
      type: 'main',
      name: 'Phantombane',
      minDmg: 5,
      maxDmg: 8,
      dex: 7,
      cost: 0,
      special: '',
    },
    bastardSword: {
      type: 'main',
      name: 'Frozen Bastard Sword',
      minDmg: 6,
      maxDmg: 12,
      dex: 6,
      cost: 70,
      special: 'stun',
    },
    voidRapier: {
      type: 'main',
      name: 'Void Rapier',
      minDmg: 5,
      maxDmg: 11,
      dex: 7,
      cost: 60,
      special: 'vamp',
    },
    coralKukri: {
      type: 'main',
      name: 'Coral Kukri',
      minDmg: 6,
      maxDmg: 11,
      dex: 7,
      cost: 60,
      special: 'poison',
    },
    soultrapKatana: {
      type: 'main',
      name: 'Soultrap Katana',
      minDmg: 7,
      maxDmg: 13,
      dex: 7,
      cost: 200,
      special: 'vamp',
    },
    lightningAxe: {
      type: 'main',
      name: 'Lightning Axe',
      minDmg: 8,
      maxDmg: 13,
      dex: 6,
      cost: 240,
      special: 'stun',
    },
  };
  armor: any = {
    leatherArmor: {
      type: 'armor',
      name: 'Leather Armor',
      defense: 1,
      evade: 6,
      cost: 15,
    },
    studdedLeatherArmor: {
      type: 'armor',
      name: 'Studded Leather Armor',
      defense: 2,
      evade: 5,
      cost: 220,
    },
  };
  startingItems: any = {
    clothes: {
      type: 'armor',
      name: 'Soiled Clothes',
      defense: 0,
      evade: 7,
      cost: 0,
    },
    basicSword: {
      type: 'main',
      name: 'Dull Blade',
      minDmg: 2,
      maxDmg: 5,
      dex: 7,
      cost: 0,
      special: '',
    },
    fist: {
      type: 'secondary',
      name: 'fist',
      dex: 0,
      minDmg: 0,
      hp: 0,
      cost: 0,
    },
  };
  // accessory: any ={
  //   mercurialBoots: {
  //     this.player.armor.evade += 1
  // },
  //   voidBangle: this.vamp = true
  // }
  secondary: any = {
    parryingDagger: {
      type: 'secondary',
      name: 'Parrying Dagger',
      dex: 2,
      minDmg: 1,
      hp: 0,
      cost: 150,
    },
    magicDagger: {
      type: 'secondary',
      name: 'Magic Dagger',
      dex: 1,
      minDmg: 1,
      hp: 0,
      cost: 30,
    },
    magicShield: {
      type: 'secondary',
      name: 'Magic Shield',
      dex: 0,
      minDmg: 0,
      hp: 25,
      cost: 30,
    },
  };
}
