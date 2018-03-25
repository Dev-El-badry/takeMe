import { Component, OnInit, Input } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import {Observable} from 'rxjs/Observable';
import { NavController, LoadingController } from 'ionic-angular';
import {} from '@types/googlemaps';
declare var google:any;
/**
 * Generated class for the MapComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'map',
  templateUrl: 'map.html',


})


export class MapComponent implements OnInit {
    @Input() destination: string;
    @Input() isPickupRequested:boolean;
    public map :google.maps.Map;
    public isMapIdle: boolean;
   // public pickupLocation: google.maps.LatLng;
    public currentLocation: google.maps.LatLng;
	myLocation = new google.maps.LatLng(29.848116, 31.313593);
  constructor(private geolocation: Geolocation, public loadingCtrl: LoadingController) {
   
  }  

  ngOnInit () {
  	this.map = this.createMap();
    this.addMapEventListeners();
    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    });
  }



  addMapEventListeners() {
    
    google.maps.event.addListener(this.map, 'dragstart', () => {
      this.isMapIdle = false;
    })
    google.maps.event.addListener(this.map, 'idle', () => {
      this.isMapIdle = true;
    })
    
  }

 getCurrentLocation() {
    let loading = this.loadingCtrl.create({
      content: 'Locating...'
    });
    
    loading.present(loading);
   let options = { timeout: 1000, enableHighAccuracy: true };
   let locationObs = Observable.create(observable => {

     this.geolocation.getCurrentPosition(options)
     .then(resp=> {
       let lat = resp.coords.latitude;
       let lng = resp.coords.longitude;

       let location  = new google.maps.LatLng(lat, lng);

       console.log('Geolocation: ' + location);
       observable.next(location);
       loading.dismiss();
     },
     (err) => {
       console.log('Geolocation err: '+err);
       loading.dismiss();
     })

   }); 

   return locationObs;
 }
  
  createMap (location = this.myLocation) {
  	let mapOptions = {
  		center: location,
  		zoom: 16,
  		mapTypeId: google.maps.MapTypeId.ROAMAP,
  		disableDefaultUI: true
  	};

  	let mapEI = document.getElementById('map');
  	let map = new google.maps.Map(mapEI, mapOptions);

  	return map;
  }

    updatePickupLocation(location) {
    this.currentLocation = location;
    this.centerLocation(location);
  }

  centerLocation(location) {
    
    if (location) {
      this.map.panTo(location);
    }
    else {
      
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      });
    }
  }


}
