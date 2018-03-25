import { Injectable } from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
/*
  Generated class for the SimulateCarsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SimulateCarsProvider {
 public myRouteIndex: number;
 public directionsService: google.maps.DirectionsService;
  public myRoute: any;


 constructor() {
    this.directionsService = new google.maps.DirectionsService();
  }
  
  riderPickedUp() {
    // simulate rider picked up after 1 second
    return Observable.timer(1000);
  }
  
  riderDroppedOff() {
    // simulate rider dropped off after 1 second
    return Observable.timer(1000);
  }
  
  getPickupCar() {
    return Observable.create(observable => {
      
      let car = this.myRoute[this.myRouteIndex];
      observable.next(car);
      this.myRouteIndex ++;
     
    })
  }

  /*
  ** Function V1.0 getSegmentedDirections
  ** used for segments Route Direction when The Route Is Defined
  */
  
  getSegmentedDirections(directions) {
    let route = directions.routes[0];
    let legs = route.legs;
    let path = [];
    let increments = [];
    let duration = 0;
    
    let numOfLegs = legs.length;
    
    // work backwards though each leg in directions route
    while (numOfLegs--) {
      
      let leg = legs[numOfLegs];
      let steps = leg.steps;
      let numOfSteps = steps.length;
      
      while(numOfSteps--) {
        
        let step = steps[numOfSteps];
        let points = step.path;
        let numOfPoints = points.length;
        
        duration += step.duration.value;
        
        while(numOfPoints--) {
          
          let point = points[numOfPoints];
          
          path.push(point);
          
          increments.unshift({
            position: point,  // car position 
            time: duration,  // time left before arrival
            path: path.slice(0) // clone array to prevent referencing final path array
          })
        }
      }
    }
    
    return increments;
  }


  /*
  ** Function V2.0 getSegmentedDirections
  ** used for segments Route Direction when The Route Is Defined
  */
  
   getSegmentedDirectionsV2(directions) {
    let route = directions.routes[0];
    let legs = route.legs;
    let path = [];
    let increments = [];
    let duration = 0; // Time
    
    let numOfLegs = legs.length;
    /*
     numOfLegs = 15 leg
     driver = 2 leg after 2 seconds
     numOfLegs = 13 leg
    */
    
    // work backwards though each leg in directions route
    while (numOfLegs--) {
      
      let leg = legs[numOfLegs];
      let steps = leg.steps;
      let numOfSteps = steps.length;
      
      while(numOfSteps--) {
        
        let step = steps[numOfSteps];
        let points = step.path;
        let numOfPoints = points.length;
        
        duration += step.duration.value;
        
        while(numOfPoints--) {
          
          let point = points[numOfPoints];
          
          path.push(point);
          
          increments.unshift({
            position: point,  // car position 
            time: duration,  // time left before arrival
            path: path.slice(0) // clone array to prevent referencing final path array
          })
        }
      }


    }
    
    return increments;
  }


  /*
  ** Function V1.0 calculateRoute
  ** Calucte The Destinatino the Route From Start To End
  ** Travel Mode IS Deiving Car
  */

  calculateRoute(start, end) {
    
    return Observable.create(observable => {
      
      this.directionsService.route({
        origin: start,
        destination: end,
        travelMode: google.maps.TravelMode.DRIVING
      }, (response, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          observable.next(response);
        }
        else {
          observable.error(status);
        }
      })
    });
  }

  /*
  ** Function V1.0 simulateRoute
  ** Simulate Route From Start To End
  ** Travel Mode IS Deiving Car
  */
  
  simulateRoute(start, end) {
    
    return Observable.create(observable => {
      this.calculateRoute(start, end).subscribe(directions => {
        // get route path
        this.myRoute = this.getSegmentedDirections(directions);
        // return pickup car
        this.getPickupCar().subscribe(car => {
          observable.next(car); // first increment in car path
        })
      })
    });
  }

   /*
  ** Function V2.0 simulateRoute
  ** Simulate Route From Start To End
  ** Travel Mode IS Deiving Car
  */

  simulateRouteV2(start, end) {
    
    return Observable.create(observable => {
      this.calculateRoute(start, end).subscribe(directions => {
        // get route path
        this.myRoute = this.getSegmentedDirections(directions);
        // return pickup car
        this.getPickupCar().subscribe(car => {
          observable.next(car); // first increment in car path
        })
      })
    });
  }

   /*
  ** Function V1.0 findPickupCar
  ** pickupLocation => To get The Target Location
  ** Travel Mode IS Deiving Car
  ** *findPickupCar
  */
  
  findPickupCar(pickupLocation) {
    
    this.myRouteIndex = 0;
    
    let car = this.cars1.cars[0]; // pick one of the cars to simulate pickupLocation
    let start = new google.maps.LatLng(car.coord.lat, car.coord.lng);
    let end = pickupLocation;
    
    return this.simulateRoute(start, end);
  }

   /*
  ** Function V1.0 dropoffPickupCar
  ** pickupLocation => To get The Target Location
  ** dropoffLocation => Drop Of Location
  ** 
  ** *findPickupCar
  */
  
  dropoffPickupCar(pickupLocation, dropoffLocation) {
    return this.simulateRoute(pickupLocation, dropoffLocation);
  }

  /* 
  ** function v1.0 getCars(lat, lng)
  ** lat, lng for each car
  ** used to lat and lng from json file
  */

  getCars(lat, lng) {
    
    let carData = this.cars[this.carIndex];
    
    this.carIndex++;
    
    if (this.carIndex > this.cars.length-1) {
      this.carIndex = 0;
    }
    
    return Observable.create(
      observer => observer.next(carData)
    )
  }

  private carIndex: number = 0;
  
  private cars1 = {
    cars: [{
      id: 1,
      coord: {
        lat: 29.849111,
        lng: 31.313076
      }
    },
    {
      id: 2,
      coord: {
        lat: 29.848974,
        lng: 31.313265
      }
    }
  ]
 };
 
 private cars2 = {
    cars: [{
      id: 1,
      coord: {
        lat: 29.849165,
        lng: 31.312557
      }
    },
    {
      id: 2,
      coord: {
        lat: 29.848958,
        lng: 31.312477
      }
    }
  ]
 };
 
 private cars3 = {
    cars: [{
      id: 1,
      coord: {
        lat: 29.849100,
        lng: 31.312697
      }
    },
    {
      id: 2,
      coord: {
        lat: 29.849340,
        lng: 31.312743
      }
    }
  ]
 };
 
 private cars4 = {
    cars: [{
      id: 1,
      coord: {
        lat: 29.848546,
        lng: 31.312892
      }
    },
    {
      id: 2,
      coord: {
        lat: 29.848583,
        lng: 31.312622
      }
    }
  ]
 };
 
 private cars5 = {
    cars: [{
      id: 1,
      coord: {
        lat: 29.848659,
        lng: 31.314165
      }
    },
    {
      id: 2,
      coord: {
        lat: 29.849055,
        lng:  31.313279
      }
    }
  ]
 };
  
 private cars: Array<any> = [this.cars1, this.cars2, this.cars3, this.cars4, this.cars5];	

}
