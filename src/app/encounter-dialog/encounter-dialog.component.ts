import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface EncounterDialogData {
  npc: any;
}

@Component({
  selector: 'app-encounter-dialog',
  templateUrl: './encounter-dialog.component.html',
  styleUrls: ['./encounter-dialog.component.scss']
})
export class EncounterDialog implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EncounterDialog>,
    @Inject(MAT_DIALOG_DATA) public data: EncounterDialogData
  ) {
    this.npc = data.npc
  }
  npc:any;
  ngOnInit(): void {
  }

}
