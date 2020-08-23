import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash'

//The declaration interface for the modal
//(the header script for the dialog interface)
export interface MerchantDialogData {
  merchantStock: any;
  playerGold: number;
}

@Component({
  selector: 'merchant-dialog',
  templateUrl: 'merchant-dialog.component.html',
  styleUrls: ['merchant-dialog.component.scss']
})
export class MerchantDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MerchantDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MerchantDialogData,
  ) {
     this.stock = this.data.merchantStock
     this.playerGold = this.data.playerGold
  }
  bounty: any ={}
  inventory: any = [];
  playerGold: number
  stock: any;
  mainWeapons: any;
  secondary: any;
  armor: any;
  panelOpenState: boolean

  ngOnInit(){
    this.panelOpenState = false
    this.mainWeapons = _.values(this.stock.mainWeapon)
    this.secondary = _.values(this.stock.secondary)
    this.armor = _.values(this.stock.armor)
  }
  buyItem(item){
    console.log('Bought Item: ', item)
    if (this.playerGold >= item.cost){
      this.inventory.push(item)
      this.playerGold -= item.cost
    }
    console.log('Inventory: ', this.inventory)
  }
  cashOut(){
    this.bounty = {
      gold: this.playerGold,
      loot: this.inventory
    }
  }
}