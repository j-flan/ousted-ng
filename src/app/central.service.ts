import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CentralService {

  location: any = 'forest';

  constructor() { }

  getLocation(){
    return this.location
  }
  setLocation(location){
    this.location = location;
  }
}
