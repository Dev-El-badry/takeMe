import { Component, Input, OnInit, OnChanges } from '@angular/core';
import {CarsProvider} from '../../providers/cars/cars';
import * as SlidingMarker from 'marker-animate-unobtrusive';
/**
 * Generated class for the AvailableCarsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'available-cars',
  templateUrl: 'available-cars.html'
})
export class AvailableCarsComponent {
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
 
   public carMarkers: Array<google.maps.Marker>; //var to define marker
  
  constructor(public carService: CarsProvider) {
    this.carMarkers = [];
  }

  ngOnInit() {
this.fetchAndRefreshCars();
  }

  ngOnChanges() {
    if(this.isPickupRequested) {
      this.removeCarMarkers();
    }
  }
  
  /* 
  ** function v1.0 removeCarMarkers()
  ** used to remove all cars on map when isPickupRequested is TRUE
  */
  removeCarMarkers() {
     let numOfCars = this.carMarkers.length;
     while(numOfCars--) {
       let car = this.carMarkers.pop();
       car.setMap(null);
     }
  }
  
  /* 
  ** function v1.0 addCarMarker(car)
  ** car => array contain data for each car like lat and lng
  ** used to add Markers On Map 
  */
  addCarMarker(car) {
    let carMarker = new SlidingMarker({
      map: this.map,
      position: new google.maps.LatLng(car.coord.lat, car.coord.lng),
      icon: 'img/car-icon.png'  
    });
    
    carMarker.setDuration(2000);
    carMarker.setEasing('linear');
    
    carMarker.set('id', car.id); // MVCObject()
    
    this.carMarkers.push(carMarker);
  }
  
  /* 
  ** function v1.0 updateCarMarker(car)
  ** car => array contain data for each car like lat and lng
  ** used to update Marker Car On Map ( Real Time )
  */
  updateCarMarker(car) {
    for (var i=0, numOfCars=this.carMarkers.length; i < numOfCars; i++) {
      // find car and update it
      if ((<any>this.carMarkers[i]).id === (<any>car).id) {
        this.carMarkers[i].setPosition(new google.maps.LatLng(car.coord.lat, car.coord.lng));
        return;
      }
      
    }
    
    // car does not exist in carMarkers
    this.addCarMarker(car);
  }
  
  /* 
  ** function v1.0 fetchAndRefreshCars(car)
  ** 
  ** used to fetch cars From Car Services (Real Time)
  */
  fetchAndRefreshCars() {
    this.carService.getCars(9,9)
      .subscribe(carsData => {
        
        if (!this.isPickupRequested) {
          (<any>carsData).cars.forEach( car => {
            this.updateCarMarker(car);
          })
        }
      })
  }	

}
