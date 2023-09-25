import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MenuDialog } from '../menu-dialog/menu-dialog.component';
import {take} from 'rxjs/operators';
import {
  PlayerStats, 
  PlayerData, 
  PlayerEquipment, 
  defaultStats,
  startingEquipment
} from '../player-interface'





@Component({
  selector: 'action-menu',
  templateUrl: './action-menu.component.html',
  styleUrls: ['./action-menu.component.scss']
})
export class ActionMenuComponent implements OnInit {

  constructor(
    protected dialog: MatDialog
  ) { }

  equipment: PlayerEquipment = startingEquipment;
  stats: PlayerStats = defaultStats;
  playerData: PlayerData = {
    equipment: this.equipment,
    stats: this.stats
  };
  

  //move to another service
  enemyHp: number;



  ngOnInit(): void {
    console.log('have playerdata: ', this.playerData);
  }
  menuModal() {
    const dialogRef = this.dialog.open(MenuDialog, {
      disableClose: true,
      data: {
        equipment: this.playerData.equipment,
        stats: this.playerData.stats
      }
    });
    dialogRef.afterClosed()
      .pipe(take(1))
      .subscribe((gear?) => {
        if (gear) 
          this.setEquipment(gear);
      });
  }

  setEquipment(gear){
    const gearKeys = Object.keys(gear);
    gearKeys.map(key=>{
      this.playerData.equipment[key] = gear[key];
    })
  }
}
