import { Component, OnInit } from '@angular/core';
import { CentralService } from '../central.service';
import * as _ from 'lodash';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss']
})
export class StageComponent implements OnInit {

  constructor(
    public central: CentralService,
  ) { }

  location: any = this.central.getLocation();

  ngOnInit(){
  }
  // changeLocationRandom(){
  //   let rand = Math.floor(Math.random() * this.central.areas.length -1);
  //   this.central.setRandomLocation(rand)
  //   this.location = this.central.getLocation();
  // }
  goNorth(){
    let place = this.central.location.north;
    this.central.location = _.values(this.central.areas[place])
  }
  goSouth(){
    let place = this.central.location.south
    this.central.location = _.values(this.central.areas[place])


  }
  goEast(){
    let place = this.central.location.east
    this.central.location = _.values(this.central.areas[place])

  }
  goWest(){
    let place = this.central.location.west
    this.central.location = _.values(this.central.areas[place])
  }
}
