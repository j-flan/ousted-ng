import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as _ from 'lodash'

export interface MenuDialogData{
  
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
  ) { }

  ngOnInit(): void {
  }

}
