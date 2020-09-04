import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash'

//The declaration interface for the modal
//(the header script for the dialog interface)
export interface MerchantDialogData {
  merchantStock: any;
  playerGold: number;
  location: any;
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
     this.location = this.data.location
  }
  bounty: any ={}
  inventory: any = [];
  playerGold: number
  stock: any;
  mainWeapons: any;
  secondary: any;
  armor: any;
  items: any;
  panelOpenState: boolean = false;
  location: any;

  ngOnInit(){
    this.bounty.gold = this.playerGold;
    console.log('merchnt oninit location: ', this.location)
    this.panelOpenState = false;;
    this.mainWeapons = _.values(this.stock.mainWeapon);
    this.secondary = _.values(this.stock.secondary);
    this.armor = _.values(this.stock.armor);
    this.items = _.values(this.stock.items);
    this.sortInventory()
  }

  sortInventory() {
    this.mainWeapons = _.filter(this.mainWeapons, weapon=>{
      return this.location.name === weapon.location
    });
    console.log('new main weapons', this.mainWeapons);
    this.secondary = _.filter(this.secondary, weapon=>{
      return this.location.name === weapon.location
    });
    this.armor = _.filter(this.armor, armor=>{
      return this.location.name === armor.location
    });
  }
  buyItem(item){
    console.log('Bought Item: ', item);
    if (this.playerGold >= item.cost){
      this.inventory.push(item);
      this.playerGold -= item.cost;
      this.updateInventory();
    };
    console.log('Inventory: ', this.inventory);
  }
  updateInventory(){
    this.bounty = {
      gold: this.playerGold,
      loot: this.inventory
    };
  }
  removeItem(item){
    let remove = _.findIndex(this.inventory, index => {
        return index === item;
    });
    this.inventory.splice(remove, 1);
    this.playerGold += item.cost;
    this.updateInventory();
  }
}
