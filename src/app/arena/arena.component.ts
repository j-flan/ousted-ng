import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { CentralService } from '../central.service';
import { MatDialog } from '@angular/material/dialog';
import { MerchantDialog } from '../merchant-dialog/merchant-dialog.component';
import { MenuDialog } from '../menu-dialog/menu-dialog.component';
import * as _ from 'lodash';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.scss'],
})
export class ArenaComponent implements OnInit {
  constructor(public central: CentralService, protected dialog: MatDialog) {}

  inventory: any = [];
  items: any = [];
  showBattleOptions: boolean = false;
  enemyHp: number;
  thisEnemy: any;
  playerDmg: any;
  enemyDmg: any;
  enemyDmgOutput: boolean=false;
  playerDmgOutput: boolean=false;
  playerDmgOutputMove: string = 'player-dmg-output-start'
  enemyDmgOutputMove: string = 'enemy-dmg-output-start'
  enemyPoisonCounter: any = false;
  enemyStunned: boolean =false;
  playerStunned: boolean =false;
  playerPoisonCounter: any = false;

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
  player: any = {};

  ngOnInit(): void {
    this.central.enemyFound.subscribe({
      next: enemy=>{
        if(enemy){
          this.thisEnemy = enemy
          this.setNewEnemyHp(enemy.hp)
        }
      }
    })
    this.player = {
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
    this.playerWeapon.subscribe({
      next: (weapon) => {
        this.playerItem.mainWeapon = weapon;
        this.player.maxDmg = weapon.maxDmg;
        this.player.minDmg = weapon.minDmg;
        this.player.dex = weapon.dex;
        this.playerItem.secondary.dex
          ? (this.player.dex += this.playerItem.secondary.dex)
          : (this.player.dex += 0);
        console.log('Equipped weapon: ', this.playerItem.mainWeapon);
        console.log('dex: ', this.player.dex);
      },
    });
    this.playerWeapon.next(this.central.startingItems.basicSword);
    this.inventory.push(this.central.startingItems.basicSword);

    this.playerSecondary.subscribe({
      next: (item) => {
        this.playerItem.secondary = item;
        this.player.minDmg = this.playerItem.mainWeapon.minDmg + item.minDmg;
        this.player.dex = this.playerItem.mainWeapon.dex + item.dex;
        this.player.maxHp += item.hp;
      },
    });
    this.playerSecondary.next(this.central.startingItems.fist);
    this.inventory.push(this.central.startingItems.fist);

    this.playerArmor.subscribe({
      next: (item) => {
        this.playerItem.armor = item;
        this.player.evade = item.evade;
        this.player.defense = item.defense;
      },
    });
    this.playerArmor.next(this.central.startingItems.clothes);
    this.inventory.push(this.central.startingItems.clothes);
  }

  setWeapon(weapon) {
    this.playerWeapon.next(weapon);
  }
  setArmor(armor) {
    this.playerArmor.next(armor);
  }
  setSecondary(secondary) {
    this.playerSecondary.next(secondary);
  }


  setNewEnemyHp(hp) {
    this.enemyHp = hp;
    this.showBattleOptions = true;
  }
  enemyKilled(killed) {
    if (killed){
      this.player.gold += this.thisEnemy.gold;
      this.player.points += this.thisEnemy.points;
    }else{
      this.enemyHp = -1;
    }
    setTimeout(() => {
      this.central.enemyImage = false;
    }, 1000);
    this.showBattleOptions = false;
    this.enemyPoisonCounter = false;
    this.enemyStunned = false;
    this.playerPoisonCounter = false;
  }
  flee(){
    let range = this.thisEnemy.maxFlee - this.thisEnemy.minFlee;
    let strike = Math.floor((Math.random() * range) + this.thisEnemy.minFlee);
    if (this.player.evade > strike){
      this.central.updateOutput(`Ran away from the ${this.thisEnemy.name}!`);
      this.enemyKilled(false);
    }
    else{
      this.showBattleOptions = false;
      this.central.updateOutput(`Couldn't outrun the  ${this.thisEnemy.name}!`);
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
    }

  }
  playerDoesDamage(){
    setTimeout(()=>{
      this.enemyDmgOutput = true;
      this.enemyDmgOutputMove = 'enemy-dmg-output-end'
    }, 500);
    setTimeout(()=>{
      this.enemyDmgOutput = false;
      this.enemyDmgOutputMove = 'enemy-dmg-output-start'
    }, 1500);
    setTimeout(()=>{
      this.central.enemySlash = true;
    }, 500);
    setTimeout(()=>{
      this.central.enemySlash = false;
    }, 700);
  }
  attackAnimation() {
    this.central.playerImage = 'heroAttack';
    setTimeout(() => {
      this.central.playerImage = 'hero';
    }, 770);
  }

  enemyDoesDamage(){
    setTimeout(()=>{
      this.playerDmgOutput = true;
      this.playerDmgOutputMove = 'player-dmg-output-end';
    }, 200);
    setTimeout(()=>{
      this.playerDmgOutput = false;
      this.playerDmgOutputMove = 'player-dmg-output-start';

    }, 1500);
    setTimeout(()=>{
      this.central.playerSlash = true;
    }, 200);
    setTimeout(()=>{
      this.central.playerSlash = false;
    }, 700);
  }
  playerWeaponSpecial(){
    let special = this.playerItem.mainWeapon.special;
      if(special == 'vamp'){
        this.player.hp += 1;
        this.playerDmg = `+1`;
        if (this.player.hp > this.player.maxHp){
          this.player.hp = this.player.maxHp;
        }
        setTimeout(()=>{
          this.playerDmgOutput = true;
          this.playerDmgOutputMove = 'player-dmg-output-end';
        }, 700);
        setTimeout(()=>{
          this.playerDmgOutput = false;
          this.playerDmgOutputMove = 'player-dmg-output-start';
        }, 1500);
      }
      else if(special == 'stun'){
        this.stunEnemy();
      }
      else if(special == 'poison'){
        this.poisonEnemy();
      }
  }
  poisonPlayer(){
    if(!this.playerPoisonCounter){
      let poisonChance = Math.floor(Math.random() * (4) + 1);
      console.log('1/4 enemy poison roll, poison on 1: ', poisonChance)
      if(poisonChance == 1){
        this.playerDmg += ' POISONED';
        this.playerPoisonCounter = 3;
      }
    }
  }
  poisonEnemy(){
    if(!this.enemyPoisonCounter){
      let poisonChance = Math.floor(Math.random() * (4) + 1);
      console.log('1/4 poison roll, poison on 1: ', poisonChance)
      if(poisonChance == 1){
        this.enemyDmg += ' POISONED';
        this.enemyPoisonCounter = 3;
      }
    }
  }
  playerPoisoned(){
    this.playerPoisonCounter -= 1;
    this.player.hp -= 2;
    this.playerDmg = `poisoned -2`;
    this.playerDmgOutput = true;
    this.playerDmgOutputMove = 'player-dmg-output-end'
    this.central.updateOutput(`Player takes 2 poison damage`);
    setTimeout(()=>{
      this.playerDmgOutput = false;
      this.playerDmgOutputMove = 'player-dmg-output-start'
    }, 1500);
    if (this.player.hp < 1){
      this.playerKilled();
    }else if ( this.playerPoisonCounter < 1){
      this.playerPoisonCounter = false;
    }
  }
  enemyPoisoned(){
    this.enemyPoisonCounter -= 1;
    this.enemyHp -= 2;
    this.enemyDmg = `poisoned -2`;
    this.enemyDmgOutput = true;
    this.enemyDmgOutputMove = 'enemy-dmg-output-end'
    this.central.updateOutput(`${this.thisEnemy.name} was hit for 2 poison`);
    setTimeout(()=>{
      this.enemyDmgOutput = false;
      this.enemyDmgOutputMove = 'enemy-dmg-output-start'
    }, 1500);
    if (this.enemyHp < 1){
      this.enemyKilled(true);
    }else if ( this.enemyPoisonCounter < 1){
      this.enemyPoisonCounter = false;
    }
  }
  stunPlayer(){
    let stunChance = Math.floor(Math.random() * (5) + 1);
    console.log('1/5 enemy stun roll, stun on 1: ', stunChance)
    if(stunChance == 1){
      this.playerStunned = true
      this.playerDmg += ' STUNNED';
      this.central.updateOutput(`Player stunned for 1 turn`);
      setTimeout(()=>{
        this.playerDmgOutput = true;
        this.playerDmgOutputMove = 'player-dmg-output-end'
      }, 200);
      setTimeout(()=>{
        this.playerDmgOutput = false;
        this.playerDmgOutputMove = 'player-dmg-output-start'
      }, 1500);
      setTimeout(() => {
        this.enemyAttack();
      }, 2000);
    }else if (this.playerStunned){
      this.playerStunned = false;
    }
  }
  stunEnemy(){
    let stunChance = Math.floor(Math.random() * (5) + 1);
    console.log('1/5 stun roll, stun on 1: ', stunChance)
    if(stunChance == 1){
      this.enemyStunned = true;
      this.enemyDmg += ' STUNNED';
      this.central.updateOutput(`${this.thisEnemy.name} stunned for 1 turn`);
      setTimeout(()=>{
        this.enemyDmgOutput = true;
        this.enemyDmgOutputMove = 'enemy-dmg-output-end'
      }, 500);
      setTimeout(()=>{
        this.enemyDmgOutput = false;
        this.enemyDmgOutputMove = 'enemy-dmg-output-start'
      }, 1500);
    }
  }
  enemySpecialAttack(){
    let special = this.thisEnemy.special
    if (special == 'vamp'){
      this.enemyHp += 1;
        this.enemyDmg = `+1`;
        setTimeout(()=>{
          this.enemyDmgOutput = true;
          this.enemyDmgOutputMove = 'enemy-dmg-output-end'
        }, 200);
        setTimeout(()=>{
          this.enemyDmgOutput = false;
          this.enemyDmgOutputMove = 'enemy-dmg-output-start'
        }, 1500);
    } else if (special == 'poison'){
      this.poisonPlayer();
    } else if (special == 'stun'){
      this.stunPlayer();
    }
  }
  attack() {
    if (this.playerPoisonCounter){
      this.playerPoisoned();
    }
    this.attackAnimation();
    console.log('maxDMG: ', this.player.maxDmg, 'minDmg', this.player.minDmg);
    //hit or miss

    let hitChance = Math.floor(Math.random() * this.thisEnemy.toHit + 1);
    console.log('Hit chance: ', hitChance);
    //hit for random damage between min & max
    if (this.player.dex >= hitChance) {
      this.playerDoesDamage();
      let attackRange = this.player.maxDmg - this.player.minDmg;
      this.enemyDmg = Math.floor(Math.random() * attackRange + this.player.minDmg);
      this.central.updateOutput(
        `${this.thisEnemy.name} was hit for ${this.enemyDmg} physical dmg`
      );
      this.enemyHp -= this.enemyDmg;
      if(this.playerItem.mainWeapon.special){
       this.playerWeaponSpecial();
      }
      if (this.enemyHp <= 0) {
        this.central.updateOutput(`${this.thisEnemy.name} was slain`);
        this.enemyKilled(true);
      }
    }
    //miss
    else {
      this.central.updateOutput(`Player Misses!`);
    }
    this.showBattleOptions = false;
    if (this.enemyHp > 0) {
      setTimeout(() => {
        this.enemyAttack();
      }, 2000);
    }
  }
  enemyAttack() {
    if(this.enemyStunned){
      this.showBattleOptions = true;
      this.enemyStunned = false;
      return;
    }
    if (this.enemyPoisonCounter){
      this.enemyPoisoned();
    }
    this.central.enemyAttackMove = 'enemyStrike';
    setTimeout(()=>{
      this.central.enemyAttackMove = 'enemyRest';
    }, 99);
    //hit or miss
    let hitRange = this.thisEnemy.maxHit - this.thisEnemy.minHit;
    let toHit = Math.floor(Math.random() * hitRange + this.thisEnemy.minHit);

    if (toHit >= this.player.evade) {
      this.enemyDoesDamage();
      let attackRange = this.thisEnemy.maxDmg - this.thisEnemy.minDmg;
      this.playerDmg = Math.floor(Math.random() * attackRange + this.thisEnemy.minDmg);
      let damage = `${this.thisEnemy.name} ${this.thisEnemy.attackStyle} for ${this.playerDmg} physical dmg`;
      if (this.player.defense > 0) {
        damage += ` \(-${this.player.defense}\)`;
      }
      this.central.updateOutput(damage);
      this.player.hp -= this.playerDmg - this.player.defense;
      if (this.thisEnemy.special){
        this.enemySpecialAttack();
      }
      if (this.player.hp < 1) {
        this.playerKilled();
      }
    }
    //miss
    else {
      this.central.updateOutput(`${this.thisEnemy.name} attack blocked!`);
      this.central.playerImage = 'heroBlock';
      setTimeout(()=>{
        this.central.playerImage = 'hero';
      }, 700)
    }
    if (!this.playerStunned){
      this.showBattleOptions = true;
    }
  }

  playerKilled() {
    this.showBattleOptions = false;
    this.central.updateOutput(`${this.thisEnemy.name} Killed you!!!`);
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  merchantModal() {
    const dialogRef = this.dialog.open(MerchantDialog, {
      width: '700px',
      maxHeight: '850px',
      data: {
        merchantStock: {
          mainWeapon: this.central.mainWeapon,
          secondary: this.central.secondary,
          armor: this.central.armor,
          items: this.central.singleUseItems,

        },
        location: this.central.location,
        playerGold: this.player.gold,
      },
    });
    dialogRef.afterClosed().subscribe((stash) => {
      if (stash) {
        console.log('Have stash', stash);
        this.player.gold = stash.gold;
        _.forEach(stash.loot, (item) => {
          if (item.type === 'Item') this.items.push(item);
          else this.inventory.push(item);
        });
        console.log('Updated inventory', this.inventory);
      }
    });
  }

  menuModal() {
    const dialogRef = this.dialog.open(MenuDialog, {
      width: '700px',
      maxHeight: '850px',
      disableClose: true,
      data: {
        inventory: this.inventory,
        equipped: this.playerItem,
        items: this.items,
        hp: this.player.hp,
        maxHp: this.player.maxHp,
      },
    });
    dialogRef.afterClosed().subscribe((gear?) => {
      if (gear) {
        if (gear.weapon) this.playerWeapon.next(gear.weapon);
        if (gear.secondary) this.playerSecondary.next(gear.secondary);
        if (gear.armor) this.playerArmor.next(gear.armor);
        if (gear.items) {
          this.items = gear.items;
          this.player.hp = gear.hp;
        }
      }
    });
  }
  useItemBattle(item){
    if(!this.showBattleOptions || this.player.hp < 1){
      this.central.updateOutput('Option not availabe outside of combat')
      return;
    }
    this.useItem(item);
    if (this.playerPoisonCounter){
      this.playerPoisoned();
    }
    this.showBattleOptions = false;
    if (this.enemyHp > 0) {
      setTimeout(() => {
        this.enemyAttack();
      }, 1000);
    }

  }
  useItem(item) {
    if (item) {
      if (_.includes(item.name, 'potion')) {
        this.player.hp += item.hp;
        this.central.updateOutput(
          `Drank ${item.name}`
        );
        if (this.player.hp > this.player.maxHp) {
          this.player.hp = this.player.maxHp;
        }
      } else if (_.includes(item.name, 'bomb')) {
        this.enemyHp -= item.dmg;
        this.central.updateOutput(
          `${item.name} thrown, dealing ${item.dmg} physical dmg to ${this.thisEnemy.name}`
        );
      }
      this.removeItem(item);
      if (this.enemyHp <= 0) {
        this.central.updateOutput(`${this.thisEnemy.name} was blown to pieces!`);
        this.enemyKilled(true);
      }
    }
  }
  removeItem(item) {
    let remove = _.findIndex(this.items, (index) => {
      return item === index;
    });
    this.items.splice(remove, 1);
  }
}
