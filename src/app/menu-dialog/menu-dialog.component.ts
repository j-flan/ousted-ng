import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';

export interface MenuDialogData {
  inventory: any;
  equipped: any;
  hp: any;
}

@Component({
  selector: 'app-menu-dialog',
  templateUrl: './menu-dialog.component.html',
  styleUrls: ['./menu-dialog.component.scss'],
})
export class MenuDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<MenuDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MenuDialogData
  ) {
    this.inventory = this.data.inventory;
    this.equipped = this.data.equipped;
    this.hp = this.data.hp;
  }
  showEquipped: any = {};
  equipped: any;
  inventory: any;
  weaponGroup: any = [];
  secondaryGroup: any = [];
  armorGroup: any = [];
  ItemGroup: any = [];
  equip: any = {};
  items: any;
  hp: any;

  ngOnInit(): void {

    console.log('Have equipped items', this.equipped);
    this.sortInventory();
    this.passEquippedValues(
      this.equipped.mainWeapon,
      this.equipped.secondary,
      this.equipped.armor

    );
    console.log('Have equipped items', this.showEquipped);
  }

  passEquippedValues(weapon, off, armor) {
    this.showEquipped.mainWeapon = weapon;
    this.showEquipped.secondary = off;
    this.showEquipped.armor = armor;
  }

  sortInventory() {
    _.forEach(this.inventory, (item) => {
      if (item.type === 'main') {
        this.weaponGroup.push(item);
      } else if (item.type === 'secondary') {
        this.secondaryGroup.push(item);
      } else if (item.type === 'Item') {
        this.ItemGroup.push(item);
      } else {
        this.armorGroup.push(item);
      }
    });
  }
  equipWeapon(weapon) {
    this.equip.weapon = weapon;
    this.showEquipped.mainWeapon = weapon;
    console.log('Main Weapon changed: ', weapon);
  }
  equipSecondary(item) {
    this.equip.secondary = item;
    this.showEquipped.secondary = item;
    console.log('Secondary changed: ', item);
  }
  equipArmor(armor) {
    this.equip.armor = armor;
    this.showEquipped.armor = armor;
    console.log('Armor changed: ', armor);
  }
  useItem(item){
    if (_.includes(item.name, 'potion')){
      this.hp += item.hp;
      this.equip.hp = this.hp
      this.removeItem(item)
    }else{
      console.log('Cant use item now')
    }
  }
  removeItem(item){
    let potionArray = _.filter(this.inventory, potions => {
      return potions === item;
    });
    _.remove(this.inventory, potions=>{
      return potions = item;
    })
    _.forEach(potionArray, potion=>{
      this.inventory.push(potion);
    })
    this.equip.inventory = this.inventory;
  }
}
