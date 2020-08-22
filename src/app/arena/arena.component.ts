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

  enemyHp: any;
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
  player: any ={};

  ngOnInit(): void {
    this.player ={
      minDmg: 0,
      maxDmg: 0,
      dex: 0,
      evade: 0,
      defence: 0,
      gold: 0,
      points: 0,
      hp: 100,
      maxHp: 100,
    }
    this.playerWeapon.subscribe({
      next: weapon=>{
        this.playerItem.mainWeapon = weapon;
        this.player.maxDmg = weapon.maxDmg
        this.player.minDmg = weapon.minDmg
        this.player.dex = weapon.dex
        this.playerItem.secondary.dex ? 
          this.player.dex += this.playerItem.secondary.dex : this.player.dex += 0
        console.log('Equipped weapon: ', this.playerItem.mainWeapon)
        console.log('dex: ', this.player.dex)
      }
    });
    this.playerWeapon.next(this.central.mainWeapon.basicSword);

    this.playerSecondary.subscribe({
      next: item=>{
        this.playerItem.secondary = item;
        this.player.minDmg = this.playerItem.mainWeapon.minDmg + item.minDmg
        this.player.dex = this.playerItem.mainWeapon.dex + item.dex
      }
    });

    this.playerArmor.subscribe({
      next: item=>{
        this.playerItem.armor = item;
        this.player.evade = item.evade
        this.player.defence = item.defence
      }
    });
    this.playerArmor.next(this.central.armor.clothes)
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
    this.thisEnemy = location.enemies[rand];
    this.setNewEnemyHp(this.thisEnemy.hp)          
  }
 setNewEnemyHp(hp){
   this.enemyHp = hp
 }
 enemyKilled(){
   this.player.gold += this.thisEnemy.gold
 }
  attack(){   
    console.log('maxDMG: ', this.player.maxDmg, 'minDmg', this.player.minDmg  )
    let attackRange = (this.player.maxDmg - this.player.minDmg);      
    //hit or miss
    //let out = document.getElementById("text");
    let hitChance = Math.floor(Math.random() * (this.thisEnemy.toHit) + 1);
    console.log('Hit chance: ', hitChance)
    //hit for random damage between min & max
    if (this.player.dex >= hitChance){
        //this.hitAnimation();
        
        let dmg = Math.floor(Math.random() * (attackRange)+ this.player.minDmg);
        console.log(this.thisEnemy.name, ' Hit for ', dmg, 'physical dmg')
        this.enemyHp -= dmg;
       // out.textContent = `You hit the ${this.thisEnemy.name} for ${dmg} dmg`;
        // if(this.player.vamp)
        //     this.pVamp();
        // else if(this.player.stun)
        //     this.pStun();
        // else if(this.player.poison)
        //     this.pPoison();
        //thisEnemy killed
        if (this.enemyHp <= 0){
          console.log('Death!')
            //this.thisEnemyKilled();
            
        } 
    }
    //miss
    else{
        console.log('Miss!')              
    }        
}
thisEnemyAttack(){
  //hit or miss

  //let eOut = document.getElementById("attText");
  let hitRange = this.thisEnemy.maxHit - this.thisEnemy.minHit;
  let hit = Math.floor((Math.random() * hitRange) + this.thisEnemy.minHit);

  //hit for random damage between min & max

  if (hit >= this.player.evade){
    //   if(this.heroImage != 'gifs/heroAttack.gif'){
    //       this.heroHit();
    //       setTimeout(()=>{this.heroHit(); this.setHeroImage(`gifs/hero1.gif`)},750);
    //   }          
      let range = this.thisEnemy.maxDmg - this.thisEnemy.minDmg;
      let dmg = Math.floor((Math.random() * range) + this.thisEnemy.minDmg);
      this.player.hp -= dmg;
      //eOut.textContent = `${this.thisEnemy.name} ${this.thisEnemy.attack} for ${dmg} dmg`;
    //   if(this.thisEnemy.vamp)
    //       this.eVamp();
    //   else if(this.thisEnemy.stun)
    //       this.eStun();
    //   else if(this.thisEnemy.poison)
    //       this.ePoison();
      if(this.player.hp < 1){}
          //this.playerKilled();     
  }
  //miss
//   else{
//       eOut.textContent = `${this.thisEnemy.name} Misses!`;
//   }
    }


    
   


    
  
}

