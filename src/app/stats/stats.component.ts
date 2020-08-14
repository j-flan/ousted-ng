import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  constructor() { }

  stats:any;
  gold:number = 0;
  hp:number = 100;
  hpMax:number = 100;
  minDmg:number = 2;
  maxDmg:number = 5;
  dex: number = 7;
  evade: number = 7;
  points: number = 0;
  poison: boolean = false;
  poisonCount: number = 0;
  stun: boolean = false;
  vamp: boolean = false;
  stunned: boolean = false;

  item: any = {
    shortSword: false,
    longSword: false,
    phantomBane: false,
    leatherArmor: false,
    mercurialBoots: false,
    magicDagger: false,
    magicShield: false,
    bastardSword: false,
    voidRapier: false,
    coralKukri: false,
    parryingDagger: false,
    studdedLeatherArmor: false,
    soultrapKatana: false,
    lightningAxe: false,
    voidBangle: false
}

  ngOnInit(): void {
  }

}
