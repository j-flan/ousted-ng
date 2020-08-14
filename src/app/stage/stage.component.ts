import { Component, OnInit } from '@angular/core';
import { CentralService } from '../central.service'

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  constructor(
    protected central: CentralService
  ) { }

  location: string;

  ngOnInit(){
    this.location = this.central.getLocation();
  }

}
