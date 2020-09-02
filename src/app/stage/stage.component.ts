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

  location: any = this.central.location;
  ngOnInit(){
    console.log('stage location: ', this.location)
  }

  // changeLocationRandom(){
  //   let rand = Math.floor(Math.random() * this.central.areas.length -1);
  //   this.central.setRandomLocation(rand)
  //   this.location = this.central.getLocation();
  // }
  goNorth(){
    this.changeLocation(this.location.nextAreas.north);
  }
  goSouth(){
    this.changeLocation(this.location.nextAreas.south);
  }
  goEast(){
    this.changeLocation(this.location.nextAreas.east);
  }
  goWest(){
    this.changeLocation(this.location.nextAreas.west);
  }
  changeLocation(place){
    let areasValues = _.values(this.central.areas)
    let newArea = _.find(areasValues, area=>{
      return area.name == place;
    })
    this.updateLocation(newArea);
  }
  updateLocation(newArea){
    this.location = newArea;
    this.central.getEnemy(newArea);
  }
}
