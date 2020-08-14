import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor() { }

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
      armor: 0,
      evade: 7,
      cost: 0
    },
    leatherArmor:{
      name:'Leather Armor',
      armor: 1,
      evade: 6,
      cost: 15
    },
    studdedLeatherArmor: {
      name: 'Studded Leather Armor',
      armor: 2,
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

  playerWeapon = new Subject<any>();
  playerArmor = new Subject<any>();
  playerSecondary = new Subject<any>();
  //playerAccessory = new Subject<any>();

  playerItem: any = {
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
      }
    });
    this.playerWeapon.next(this.mainWeapon.basicSword);

    this.playerSecondary.subscribe({
      next: item=>{
        this.playerItem.secondary = item;
      }
    });

    this.playerArmor.subscribe({
      next: item=>{
        this.playerItem.armor = item;
      }
    });
    this.playerArmor.next(this.armor.clothes)

    this.playerStat ={
      gold: 0,
      points: 0,
      hp: 100,
      maxHp: 100,
      dex: this.playerItem.mainWeapon.dex,
      evade: this.playerItem.armor.evade,
      armor: this.playerItem.armor.armor
    }

  };

  setWeapon(weapon){
    this.playerWeapon.next(weapon);
  }
  setArmor(armor){
    this.playerArmor.next(armor);
  }
  setSecondary(secondary){
    this.playerSecondary.next(secondary);
  }

  rangeCalc(){

  }

}
