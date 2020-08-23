import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash'

export interface MenuDialogData{
  inventory: any;
}

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss']
})
export class MenuDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MenuDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MenuDialogData,
  ) {
    this.inventory = this.data.inventory
  }

  inventory: any;
  weaponGroup: any = [];
  secondaryGroup: any = [];
  armorGroup: any = [];
  equip: any ={};

  ngOnInit(): void {
    this.sortInventory()
  }

  sortInventory(){
    _.forEach(this.inventory, item=>{
      if (item.type === 'main'){
        this.weaponGroup.push(item)
      }else if(item.type === 'secondary'){
        this.secondaryGroup.push(item)
      }else{
        this.armorGroup.push(item)
      }
    });
  }
  equipWeapon(weapon){
    this.equip.weapon = weapon;
    console.log('Main Weapon changed: ', weapon)
  }
  equipSecondary(item){
    this.equip.secondary = item;
    console.log('Secondary changed: ', item)
  }
  equipArmor(armor){
    this.equip.armor = armor;
    console.log('Armor changed: ', armor)
  }

}
