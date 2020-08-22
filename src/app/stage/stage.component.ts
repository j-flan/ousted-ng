import { Component, OnInit } from '@angular/core';
import { CentralService } from '../central.service'

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  constructor(
    protected central: CentralService,
  ) { }

  location: any = this.central.getLocation();

  ngOnInit(){
  }
  changeLocationRandom(){
    let rand = Math.floor(Math.random() * this.central.areasArray.length -1); 
    this.central.setRandomLocation(rand)
    this.location = this.central.getLocation();
  }
}
