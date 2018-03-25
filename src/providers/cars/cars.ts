
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Rx';
import {SimulateCarsProvider} from '../simulate-cars/simulate-cars';
import 'rxjs/add/operator/map';

@Injectable()
export class CarsProvider {
public simulate: SimulateCarsProvider;
  constructor() {
  	this.simulate = new SimulateCarsProvider();
  }

  pollForRiderPickup() {
    return this.simulate.riderPickedUp();
  }
  
  pollForRiderDropoff() {
    return this.simulate.riderDroppedOff();
  }
  
  dropoffCar(pickupLocation, dropoffLocation) {
    return this.simulate.dropoffPickupCar(pickupLocation, dropoffLocation);
  }

  /* 
  ** function v1.0 findPickupCar(pickupLocation)
  ** pickupLocation => find the target location

  */

  findPickupCar(pickupLocation) {
     return this.simulate.findPickupCar(pickupLocation);
  }

  /* 
  ** function v1.0 getPickupCar()
  ** used For Get Car
  */
  getPickupCar() {
    return this.simulate.getPickupCar();
  }

  /* 
  ** function v1.0 getCars(lat, lng)
  ** lat, lng for each car
  ** used to lat and lng for each car every 2 seconds
  */

  getCars(lat, lng) {
  	return Observable
  		.interval(2000)
  		.switchMap(()=> this.simulate.getCars(lat, lng))
  		.share(); //for used more subscribtion
  }
}
