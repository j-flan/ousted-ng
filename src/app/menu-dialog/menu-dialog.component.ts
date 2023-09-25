import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash';
import { PlayerEquipment, PlayerStats } from '../player-interface';

export interface MenuDialogData {
  equipment: PlayerEquipment,
  stats: PlayerStats
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
    console.log('have data:,  ', this.data);
    this.equipment = data.equipment;
    this.stats = data.stats;
  }

  equipment: PlayerEquipment;
  stats: PlayerStats

  showEquipped: any = {};
  weaponGroup: any = [];
  secondaryGroup: any = [];
  armorGroup: any = [];
  itemGroup: any = [];
  equip: any = {};
  panelOpenState: boolean = false;

  ngOnInit(): void {
    this.equip.hp = this.stats.hp;
    this.sortInventory();
    this.passEquippedValues(
      _.values(this.equipment.primary)[0],
      _.values(this.equipment.secondary)[0],
      _.values(this.equipment.armor)[0]
    );
  }

  passEquippedValues(weapon, off, armor) {
    this.weaponGroup.push(weapon);
    this.secondaryGroup.push(off);
    this.armorGroup.push(armor);
    console.log('have equipped: ', weapon, off, armor)
    this.showEquipped.mainWeapon = weapon;
    this.showEquipped.secondary = off;
    this.showEquipped.armor = armor;
  }

  sortInventory() {
    _.forEach(this.equipment.inventory, (item) => {
      if (item.type === 'primary') {
        
      } else if (item.type === 'secondary') {
        
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
    if(item.hp){
      this.stats.maxHp += item.hp;
    }
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
      this.stats.hp += item.hp;
      if (this.stats.hp > this.stats.maxHp){
        this.stats.hp = this.stats.maxHp;
      }
      this.equip.hp = this.stats.hp;
      this.removeItem(item);
    }
  }
  removeItem(item){
    if (_.includes(item.name, 'potion'))
      this.findUsedPotion(item);
    else
      console.log('Cant use item now');
  }
  findUsedPotion(item){
    let remove = _.findIndex(this.equipment.inventory, index=>{
      return item === index
    });
    this.equipment.inventory.splice(remove, 1);
    this.equip.items = this.equipment.inventory;
  }
}

