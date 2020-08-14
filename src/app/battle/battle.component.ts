import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-battle',
  templateUrl: './battle.component.html',
  styleUrls: ['./battle.component.scss']
})
export class BattleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
   
  }

//   attack(){          
//     //hit or miss
//     let out = document.getElementById("text");
//     let hit = Math.floor((Math.random() * this.enemy.toHit) + 1);
//     //hit for random damage between min & max
//     if (this.player.dex >= hit){
//         this.hitAnimation();
//         let range = this.player.maxDmg - this.player.minDmg;
//         let dmg = Math.floor((Math.random() * range)+ this.player.minDmg);
//         this.enemy.hp -= dmg;
//         out.textContent = `You hit the ${this.enemy.name} for ${dmg} dmg`;
//         if(this.player.vamp)
//             this.pVamp();
//         else if(this.player.stun)
//             this.pStun();
//         else if(this.player.poison)
//             this.pPoison();
//         //enemy killed
//         if (this.enemy.hp <= 0){
//             this.enemyKilled();
            
//         } 
//     }
//     //miss
//     else{
//         out.textContent = "You Miss!";              
//     }        
// }
// enemyAttack(){
//   //hit or miss
//   let eOut = document.getElementById("attText");
//   let hitRange = this.enemy.maxHit - this.enemy.minHit;
//   let hit = Math.floor((Math.random() * hitRange) + this.enemy.minHit);

//   //hit for random damage between min & max
//   if (hit >= this.player.evade){
//       if(this.heroImage != 'gifs/heroAttack.gif'){
//           this.heroHit();
//           setTimeout(()=>{this.heroHit(); this.setHeroImage(`gifs/hero1.gif`)},750);
//       }          
//       let range = this.enemy.maxDmg - this.enemy.minDmg;
//       let dmg = Math.floor((Math.random() * range) + this.enemy.minDmg);
//       this.player.hp -= dmg;
//       eOut.textContent = `${this.enemy.name} ${this.enemy.attack} for ${dmg} dmg`;
//       if(this.enemy.vamp)
//           this.eVamp();
//       else if(this.enemy.stun)
//           this.eStun();
//       else if(this.enemy.poison)
//           this.ePoison();
//       if(this.player.hp < 1)
//           this.playerKilled();     
//   }
//   //miss
//   else{
//       eOut.textContent = `${this.enemy.name} Misses!`;
//   }
// }





}
