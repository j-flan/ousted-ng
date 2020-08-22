import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import {CentralService} from '../central.service'

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss']
})
export class ArenaComponent implements OnInit {

  constructor(
    protected central: CentralService
  ) { }

  enemies: any;  
  areas: any; 
  area: any;
  enemy: any;
  stats: any;
  dex: any;
  evade: any;
  defence: any;
  min: any;
  max: any;
  thisEnemy: any;
  playerWeapon = new Subject<any>();
  playerArmor = new Subject<any>();
  playerSecondary = new Subject<any>();
  //playerAccessory = new Subject<any>();

  @Input() playerItem: any = {
    mainWeapon: {},
    secondary: {},
    armor: {},
    //accessory: {},
  };
  playerStat: any ={};

  ngOnInit(): void {
    this.playerWeapon.subscribe({
      next: weapon=>{
        this.playerItem.mainWeapon = weapon;
        this.max = weapon.max
        this.dex = weapon.dex + this.playerItem.secondary.dex
    
      }
    });
    this.playerWeapon.next(this.mainWeapon.basicSword);

    this.playerSecondary.subscribe({
      next: item=>{
        this.playerItem.secondary = item;
        this.min = this.playerItem.mainWeapon.min + item.min
        this.dex = this.playerItem.mainWeapon.dex + item.dex
      }
    });

    this.playerArmor.subscribe({
      next: item=>{
        this.playerItem.armor = item;
        this.evade = item.evade
        this.defence = item.defence
      }
    });
    this.playerArmor.next(this.armor.clothes)

    this.playerStat ={
      gold: 0,
      points: 0,
      hp: 100,
      maxHp: 100,
    }
    this.areas = {
      'forest': [this.bear, this.goblins, this.elf, this.goblins],
      'merchantRoad' : [this.wolves, this.bandit, this.marauder, this.elf],
      'swampRoad' : [this.wolves, this.wraith, this.mudMan, this.leech],
      'cityRoad' : [this.marauder, this.thrall, this.wyvren, this.bandit],
      'mountainRoad' : [this.fSprite, this.mimic, this.mTroll, this.bat],
      'valleyRoad' : [this.fern, this.zombie, this.panther, this.malboro],
      'marshRoad' : [this.litchling, this.crows, this.banshee, this.aElement],
      'desertRoad' : [this.scorpion, this.phantom, this.wisp, this.taranTroll],
      'cliffsRoad' : [this.ants, this.mimic, this.doppleganger, this.miniBears],
      'forestRoad' : [this.witch, this.bat, this.mush, this.centaur],
      'plainsRoad' : [this.chimera, this.crows, this.sandMan, this.golem],
      'volcanoRoad' : [this.chaosEl, this.fBat, this.omegaTroll, this.chimera],
      'lake' : [this.leech, this.mudMan, this.lady, this.poo],
      'city' : [this.drunk, this.vandal, this.rat, this.cultist],
      'mountain' : [this.fSprite, this.chaosDemon, this.mTroll, this.bat],
      'valley' : [this.fern, this.randomMerchant, this.viper, this.malboro],
      'marsh' : [this.litchling, this.horde, this.crows, this.aElement],
      'desert' : [this.scorpion, this.randomMerchant, this.wisp, this.taranTroll],
      'cliffs' : [this.ants, this.gryphon, this.crows, this.miniBears],
      'tomb' : [this.scarabs, this.litchKing, this.pViper, this.spectre],
      'plains' : [this.chimera, this.sandMan, this.crows, this.golem],
      'volcano' : [this.chaosEl, this.chaos, this.omegaTroll, this.fBat],
    }
  }

  setWeapon(weapon){
    this.playerWeapon.next(weapon);
  }
  setArmor(armor){
    this.playerArmor.next(armor);
  }
  setSecondary(secondary){
    this.playerSecondary.next(secondary);
  }

  getEnemy(){ 
    let location = this.central.getLocation() 
    let rand = Math.floor(Math.random() * 4); 
    this.enemy = this.areas[location][rand];
    return this.enemy;           
  }

  getNewEnemy(){
    this.thisEnemy = this.getEnemy()
  }

  attack(){         
    //hit or miss
    //let out = document.getElementById("text");
    let hit = Math.floor((Math.random() * this.thisEnemy.toHit) + 1);
    //hit for random damage between min & max
    if (this.dex >= hit){
        //this.hitAnimation();
        let range = this.max - this.min;
        let dmg = Math.floor((Math.random() * range)+ this.min);
        this.thisEnemy.hp -= dmg;
       // out.textContent = `You hit the ${this.thisEnemy.name} for ${dmg} dmg`;
        // if(this.player.vamp)
        //     this.pVamp();
        // else if(this.player.stun)
        //     this.pStun();
        // else if(this.player.poison)
        //     this.pPoison();
        //thisEnemy killed
        if (this.thisEnemy.hp <= 0){
            //this.thisEnemyKilled();
            
        } 
    }
    //miss
    // else{
    //     out.textContent = "You Miss!";              
    // }        
}
thisEnemyAttack(){
  //hit or miss

  //let eOut = document.getElementById("attText");
  let hitRange = this.thisEnemy.maxHit - this.thisEnemy.minHit;
  let hit = Math.floor((Math.random() * hitRange) + this.thisEnemy.minHit);

  //hit for random damage between min & max

  if (hit >= this.evade){
    //   if(this.heroImage != 'gifs/heroAttack.gif'){
    //       this.heroHit();
    //       setTimeout(()=>{this.heroHit(); this.setHeroImage(`gifs/hero1.gif`)},750);
    //   }          
      let range = this.thisEnemy.maxDmg - this.thisEnemy.minDmg;
      let dmg = Math.floor((Math.random() * range) + this.thisEnemy.minDmg);
      this.stats.hp -= dmg;
      //eOut.textContent = `${this.thisEnemy.name} ${this.thisEnemy.attack} for ${dmg} dmg`;
    //   if(this.thisEnemy.vamp)
    //       this.eVamp();
    //   else if(this.thisEnemy.stun)
    //       this.eStun();
    //   else if(this.thisEnemy.poison)
    //       this.ePoison();
      if(this.playerStat.hp < 1){}
          //this.playerKilled();     
  }
  //miss
//   else{
//       eOut.textContent = `${this.thisEnemy.name} Misses!`;
//   }
    }


    poison: boolean = false;
    poisonCount: number = 0;
    stun: boolean = false;
    vamp: boolean = false;
    stunned: boolean = false;
  
    mainWeapon: any = {
      basicSword:{
        name: "knife",
        min: 2,
        max: 5,
        dex: 7,
        cost: 0,
        special: ''
      },
      shortSword: {
        name:"Shortsword",
        min: 3,
        max: 6,
        dex: 7,
        cost: 10,
        special: ''
      },
      longSword: {
        name: 'Longsword',
        min: 4,
        max: 9,
        dex: 6,
        cost: 15,
        special: ''
      },
      phantomBane: {
        name: 'Phantombane',
        min: 5,
        max: 8,
        dex: 7,
        cost: 0,
        special: ''
      },
      bastardSword: {
        name: 'Frozen Bastard Sword',
        min: 6,
        max: 12,
        dex: 6,
        cost: 70,
        special: 'stun'
      },
      voidRapier: {
        name: 'Void Rapier',
        min: 5,
        max: 11,
        dex: 7,
        cost: 60,
        special: 'vamp'
      },
      coralKukri: {
        name: 'Coral Kukri',
        min: 6,
        max: 11,
        dex: 7,
        cost: 60,
        special: 'poison'
      },
      soultrapKatana: {
        name: 'Soultrap Katana',
        min: 7,
        max: 13,
        dex: 7,
        cost: 200,
        special: 'vamp'
      },
      lightningAxe: {
        name: 'Lightning Axe',
        min: 8,
        max: 13,
        dex: 6,
        cost: 240,
        special: 'stun'
      },
      
  }
    armor: any = {
      clothes:{
        name:'Soiled Clothes',
        defence: 0,
        evade: 7,
        cost: 0
      },
      leatherArmor:{
        name:'Leather Armor',
        defence: 1,
        evade: 6,
        cost: 15
      },
      studdedLeatherArmor: {
        name: 'Studded Leather Armor',
        defence: 2,
        evade: 6,
        cost: 220
      },
    }
    // accessory: any ={
    //   mercurialBoots: {
    //     this.player.armor.evade += 1
    // },
    //   voidBangle: this.vamp = true
    // }
    secondary: any ={
      parryingDagger: {
        name:'Parrying Dagger',
        dex: 2,
        min: 1,
        hp: 0,
        cost: 150
      },
      magicDagger: {
        name: 'Magic Dagger',
        dex: 1,
        min: 1,
        hp: 0,
        cost: 30
      },
      magicShield: {
        name: 'Magic Shield',
        dex: 0,
        min:0,
        hp: 25,
        cost: 30
      },
    }
  
   


    bear = {name: "Bear", hp: 12, attackStyle: "swipes", minDmg: 3, maxDmg: 6, minHit: 4, maxHit: 10, minFlee: 5, maxFlee: 10, toHit: 8, gold: 5, points: 50, poison: false,stun: false,vamp: false}
    goblins = {name: "Goblin", hp: 6, attackStyle: "attack", minDmg: 1, maxDmg: 5, minHit: 5, maxHit: 10, minFlee: 6, maxFlee: 10, toHit: 8, gold: 3, points:10 , poison: false,stun: false,vamp: false}
    elf = {name: "Elf", hp: 8, attackStyle: "attacks", minDmg: 3, maxDmg: 5, minHit: 6, maxHit: 10, minFlee: 5, maxFlee: 10, toHit: 8, gold: 6, points: 30, poison: false,stun: false,vamp: false}
    bandit = {name: "Bandit", hp: 12, attackStyle: "attacks", minDmg: 4, maxDmg: 6, minHit: 4, maxHit: 10, minFlee: 5, maxFlee: 10, toHit: 8, gold: 6, points: 30, poison: false,stun: false,vamp: false}
    marauder = {name: "Marauder", hp: 15, attackStyle: "attacks", minDmg: 5, maxDmg: 8, minHit: 5, maxHit: 10, minFlee: 6, maxFlee: 10, toHit: 8, gold: 7, points: 40, poison: false,stun: false,vamp: false}
    wolves = {name: "Wolf", hp: 15, attackStyle: "attack", minDmg: 2, maxDmg: 7, minHit: 4, maxHit: 11, minFlee: 5, maxFlee: 10, toHit: 8, gold: 5, points: 30, poison: false,stun: false,vamp: false}
    wraith = {name: "Wraith", hp: 18, attackStyle: "attacks", minDmg: 4, maxDmg: 8, minHit: 5, maxHit: 11, minFlee: 6, maxFlee: 10, toHit: 9, gold: 8, points: 50, poison: false,stun: false,vamp: false}
    mudMan = {name: "Mud Man", hp: 14, attackStyle: "attacks", minDmg: 3, maxDmg: 8, minHit: 5, maxHit: 11, minFlee: 6, maxFlee: 10, toHit: 8, gold: 5, points: 40, poison: false,stun: false,vamp: false}
    poo = {name: "Poo", hp: 20, attackStyle: "lunges", minDmg: 3, maxDmg: 9, minHit: 6, maxHit: 11, minFlee: 7, maxFlee: 10, toHit: 8, gold: 8, points: 70, poison: false,stun: false,vamp: false}
    leech = {name: "Leech", hp: 14, attackStyle: "bites", minDmg: 3, maxDmg: 8, minHit: 4, maxHit: 12, minFlee: 5, maxFlee: 10, toHit: 8, gold: 6, points: 35, poison: false,stun: false,vamp: true}
    thrall = {name: "Thrall", hp: 20, attackStyle: "lunges", minDmg: 3, maxDmg: 9, minHit: 4, maxHit: 11, minFlee: 6, maxFlee: 12, toHit: 8, gold: 12, points: 60, poison: false,stun: false,vamp: false}
    wyvren = {name: "Wyvren", hp: 25, attackStyle: "claws", minDmg: 5, maxDmg: 9, minHit: 4, maxHit: 11, minFlee: 6, maxFlee: 12, toHit: 8, gold: 11, points: 100, poison: false,stun: false,vamp: false}
    fSprite = {name: "Fire Sprite", hp: 30, attackStyle: "throws fireball", minDmg: 5, maxDmg: 9, minHit: 5, maxHit: 12, minFlee: 5, maxFlee: 12, toHit: 9, gold: 15, points: 125, poison: false,stun: false,vamp: false}
    mimic = {name: "Mimic", hp: 35, attackStyle: "chomps", minDmg: 5, maxDmg: 7, minHit: 6, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 20, points: 150, poison: false,stun: false,vamp: false}
    mTroll = {name: "Mountain Troll", hp: 50, attackStyle: "clubs you", minDmg: 6, maxDmg: 8, minHit: 4, maxHit: 11, minFlee: 5, maxFlee: 12, toHit: 8, gold: 20, points: 140, poison: false,stun: false,vamp: false}
    chaosEl = {name: "Chaos Elemental", hp: 60, attackStyle: "burns", minDmg: 7, maxDmg: 8, minHit: 7, maxHit: 12, minFlee: 7, maxFlee: 12, toHit:10 , gold: 28, points: 250, poison: false,stun: false,vamp: false}
    bat = {name: "Vampire Bat", hp: 30, attackStyle: "bites", minDmg: 5, maxDmg: 5, minHit: 5, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 13, points: 120, poison: false,stun: false,vamp: true}
    fern = {name: "Fern Feind", hp: 30, attackStyle: "whips", minDmg: 5, maxDmg: 7, minHit: 5, maxHit: 12, minFlee: 5, maxFlee: 14, toHit:9 , gold: 15, points: 125, poison: false,stun: false,vamp: false}
    zombie = {name: "Zombie", hp: 35, attackStyle: "claws", minDmg: 6, maxDmg: 7, minHit: 6, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 20, points: 150, poison: false,stun: false,vamp: false}
    panther = {name: "Panther", hp: 40, attackStyle: "claws", minDmg: 6, maxDmg: 8, minHit: 5, maxHit: 11, minFlee: 5, maxFlee: 14, toHit: 9, gold: 20, points: 140, poison: false,stun: false,vamp: false}
    viper = {name: "Viper", hp: 40, attackStyle: "strikes", minDmg: 6, maxDmg: 7, minHit: 5, maxHit: 11, minFlee: 7, maxFlee: 11, toHit: 9, gold: 15, points: 160, poison: true,stun: false,vamp: false}
    malboro = {name: "Malboro", hp: 35, attackStyle: "swats", minDmg: 7, maxDmg: 6, minHit: 5, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 25, points: 150, poison: true,stun: false,vamp: false}
    litchling = {name: "Litchling", hp: 35, attackStyle: "claws", minDmg: 4, maxDmg: 9, minHit: 5, maxHit: 12, minFlee: 5, maxFlee: 14, toHit: 9, gold: 20, points: 175, poison: false,stun: false,vamp: true}
    crows = {name: "Murder Crows", hp: 50, attackStyle: "dive bomb", minDmg: 5, maxDmg: 6, minHit: 6, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 25, points: 150, poison: false,stun: false,vamp: false}
    banshee = {name: "Banshee", hp: 55, attackStyle: "claws", minDmg: 5, maxDmg: 8, minHit: 5, maxHit: 11, minFlee: 5, maxFlee: 14, toHit: 9, gold: 18, points: 140, poison: false,stun: false,vamp: false}
    aElement = {name: "Air Elemental", hp: 45, attackStyle: "gusts", minDmg: 7, maxDmg: 5, minHit: 6, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 20, points: 150, poison: false,stun: false,vamp: false}
    scorpion = {name: "Crystal Scorpion", hp: 35, attackStyle: "stings", minDmg: 5, maxDmg: 7, minHit: 5, maxHit: 12, minFlee: 5, maxFlee: 14, toHit: 9, gold: 17, points: 155, poison: true,stun: false,vamp: false}
    phantom = {name: "Desert Phantom", hp: 40, attackStyle: "Mind Flays", minDmg: 6, maxDmg: 6, minHit: 6, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 20, points: 150, poison: false,stun: false,vamp: false}
    wisp = {name: "Will-o'-the-wisp", hp: 40, attackStyle: "bludgeons", minDmg: 5, maxDmg: 7, minHit: 5, maxHit: 11, minFlee: 5, maxFlee: 14, toHit: 9, gold: 18, points: 140, poison: false,stun: false,vamp: false}
    taranTroll = {name: "Taran-Troll", hp: 60, attackStyle: "lunges", minDmg: 6, maxDmg: 7, minHit: 4, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 20, points: 175, poison: false,stun: false,vamp: false}
    ants = {name: "Komodo Ants", hp: 40, attackStyle: "sting", minDmg: 6, maxDmg: 5, minHit: 5, maxHit: 12, minFlee: 5, maxFlee: 14, toHit: 9, gold: 15, points: 155, poison: true,stun: false,vamp: false}
    doppleganger = {name: "Doppleganger", hp: 40, attackStyle: "strikes", minDmg: 6, maxDmg: 6, minHit: 5, maxHit: 11, minFlee: 5, maxFlee: 14, toHit: 9, gold: 18, points: 150, poison: false,stun: false,vamp: true}
    miniBears = {name: "Minibears", hp: 50, attackStyle: "bite", minDmg: 5, maxDmg: 8, minHit: 6, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 9, gold: 20, points: 175, poison: false,stun: false,vamp: false}
    witch = {name: "Hag Witch", hp: 50, attackStyle: "strikes", minDmg: 6, maxDmg: 7, minHit: 6, maxHit: 13, minFlee: 7, maxFlee: 14, toHit: 10, gold: 25, points: 220, poison: false,stun: true,vamp: false}
    mush = {name: "Mush Man", hp: 50, attackStyle: "strikes", minDmg: 6, maxDmg: 7, minHit: 5, maxHit: 11, minFlee: 5, maxFlee: 14, toHit: 10, gold: 25, points: 200, poison: true,stun: false,vamp: false}
    centaur = {name: "Centaur", hp: 60, attackStyle: "attacks", minDmg: 6, maxDmg: 9, minHit: 6, maxHit: 12, minFlee: 7, maxFlee: 15, toHit: 10, gold: 30, points: 250, poison: false,stun: false,vamp: false}
    drunk = {name: "Drunkass", hp: 25, attackStyle: "swings", minDmg: 5, maxDmg: 8, minHit: 3, maxHit: 11, minFlee: 3, maxFlee: 14, toHit: 8, gold: 10, points: 80, poison: false,stun: false,vamp: false}
    rat = {name: "Sewer Rat", hp: 25, attackStyle: "bites", minDmg: 5, maxDmg: 6, minHit: 6, maxHit: 12, minFlee: 7, maxFlee: 14, toHit: 9, gold: 15, points: 250, poison: false,stun: false,vamp: false}
    cultist = {name: "Cultist", hp: 20, attackStyle: "stabs wildly", minDmg: 5, maxDmg: 7, minHit: 5, maxHit: 12, minFlee: 6, maxFlee: 12, toHit: 8, gold: 12, points: 110, poison: false,stun: false,vamp: true}
    scarabs = {name: "Scarabs", hp: 50, attackStyle: "sting", minDmg: 6, maxDmg: 7, minHit: 5, maxHit: 12, minFlee: 5, maxFlee: 14, toHit: 10, gold: 22, points: 165, poison: false,stun: true,vamp: false}
    pViper = {name: "Pit Viper", hp: 55, attackStyle: "strikes", minDmg: 6, maxDmg: 7, minHit: 6, maxHit: 12, minFlee: 7, maxFlee: 15, toHit: 10, gold: 25, points: 200, poison: true,stun: false,vamp: false}
    spectre = {name: "Spectre", hp: 60, attackStyle: "attacks", minDmg: 6, maxDmg: 7, minHit: 6, maxHit: 12, minFlee: 7, maxFlee: 15, toHit: 10, gold: 18, points: 220, poison: false,stun: false,vamp: false}
    chimera = {name: "Chimera", hp: 65, attackStyle: "attacks", minDmg: 5, maxDmg: 8, minHit: 5, maxHit: 13, minFlee: 7, maxFlee: 15, toHit: 10, gold: 24, points: 220, poison: true,stun: false,vamp: false}
    golem = {name: "Stone Golem", hp: 80, attackStyle: "swings", minDmg: 7, maxDmg: 9, minHit: 5, maxHit: 11, minFlee: 7, maxFlee: 15, toHit: 10, gold: 30, points: 240, poison: false,stun: false,vamp: false}
    omegaTroll = {name: "Omega Troll", hp: 80, attackStyle: "clubs", minDmg: 7, maxDmg: 10, minHit: 4, maxHit: 13, minFlee: 7, maxFlee: 16, toHit: 10, gold: 40, points: 275, poison: false,stun: false,vamp: false}
    sandMan = {name: "Sandman", hp: 70, attackStyle: "attacks", minDmg: 5, maxDmg: 7, minHit: 7, maxHit: 12, minFlee: 7, maxFlee: 16, toHit: 10, gold: 28, points: 175, poison: false,stun: true,vamp: false}
    fBat = {name: "Fire Bat", hp: 60, attackStyle: "bites", minDmg: 7, maxDmg: 6, minHit: 7, maxHit: 12, minFlee: 7, maxFlee: 16, toHit: 10, gold: 30, points: 220, poison: false,stun: false,vamp: true}
  
  //enemies
  
  //bosses
    chaos = {name: "Chaos", hp: 150, attackStyle: "attacks", minDmg: 8, maxDmg: 9, minHit: 7, maxHit: 13, minFlee: 10, maxFlee: 20, toHit: 10, gold: 100, points: 1000, poison: false,stun: false,vamp: false}
    chaosDemon = {name: "Chaos Demon", hp: 90, attackStyle: "attacks", minDmg: 6, maxDmg: 12, minHit: 5, maxHit: 12, minFlee: 8, maxFlee: 15, toHit: 9, gold: 50, points: 500, poison: false,stun: false,vamp: false}
    horde = {name: "Necro Horde", hp: 120, attackStyle: "attacks", minDmg: 7, maxDmg: 9, minHit: 5, maxHit: 13, minFlee: 8, maxFlee: 17, toHit: 9, gold: 40, points: 600, poison: false,stun: false,vamp: false}
    gryphon = {name: "Gryphon", hp: 120, attackStyle: "strikes", minDmg: 7, maxDmg: 9, minHit: 6, maxHit: 12, minFlee: 8, maxFlee: 20, toHit: 9, gold: 40, points: 600, poison: false,stun: false,vamp: false}
    litchKing = {name: "Litch  King", hp: 110, attackStyle: "attacks", minDmg: 7, maxDmg: 10, minHit: 6, maxHit: 12, minFlee: 10, maxFlee: 20, toHit: 10, gold:50 , points: 800, poison: false,stun: false,vamp: true}
    vandal = {name: "Greasy Vandal", hp: 45, attackStyle: "slashes", minDmg: 5, maxDmg: 10, minHit: 5, maxHit: 12, minFlee: 5, maxFlee: 14, toHit: 9, gold: 0, points: 250, poison: false,stun: false,vamp: false}
  
  
  //vandal is "mini-boss" that triggers victim event that awards the player with +25 maxHp
  
  //NPCs
    lady = {name: 'Lady of the Lake', ability: 'watery tart', hp: 1, attackStyle: 'rendering', minDmg: 0, maxDmg: 0, minHit: 0, maxHit: 0, minFlee: 0, maxFlee: 0, toHit: 0, gold: 0, points: 0, poison: false,stun: false,vamp: false}
    randomMerchant = {name: 'Random Merchant', ability: 'swindling', hp: 1, attackStyle: 'poverty', minDmg: 0, maxDmg: 0, minHit: 0, maxHit: 0, minFlee: 0, maxFlee: 0, toHit: 0, gold: 0, points: 0, poison: false,stun: false,vamp: false}
  
}

