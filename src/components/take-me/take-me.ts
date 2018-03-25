import {Component, Input, Output, EventEmitter, OnChanges, OnInit} from '@angular/core';
import {CarsProvider} from '../../providers/cars/cars';
import {} from '@types/googlemaps';
import {Observable} from 'rxjs/Observable';
import { PickupPubSubProvider } from '../../providers/pickup-pub-sub/pickup-pub-sub';
declare let google;
/**
 * Generated class for the TakeMeComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'take-me',
  templateUrl: 'take-me.html'
})
export class TakeMeComponent implements OnChanges, OnInit {

  @Input() isPinSet: boolean;
  @Input() map: google.maps.Map;
  @Input() isPickupRequested: boolean;
  @Input() destination;
 @Output() updatedPickupLocation: EventEmitter<google.maps.LatLng> = new EventEmitter<google.maps.LatLng>();
  private pickupMarker: google.maps.Marker;
  private popup: google.maps.InfoWindow;

  currentLocation: google.maps.LatLng;
  private pickupSubscription:any;
  constructor( public pickupPubSub: PickupPubSubProvider) {
   
    
  }

    ngOnInit() {
    this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
      if (e.event === this.pickupPubSub.EVENTS.ARRIVAL_TIME) {
        this.updateTime(e.data);
      }
    })
  }

  ngOnChanges(changes) {
    console.log(changes);
    
    // do not allow pickup pin/location
    // to change if pickup is requested
    if (!this.isPickupRequested) {
      if (this.isPinSet) {
        this.showPickupMarker();
      }
      else {
        this.removePickupMarker();
      }
    }
    
    if (this.destination) {
      this.removePickupMarker();
    }
    
  }


  showPickupMarker() {
  	this.removePickupMarker();

  	this.pickupMarker = new google.maps.Marker({
      map: this.map,
      animation: google.maps.Animation.BOUNCE,
      position: this.map.getCenter(),
      icon: 'img/person-icon.png'
    })

  	 setTimeout( () => {
      this.pickupMarker.setAnimation(null);
    }, 750);

    this.showPickupTime();


  }

// updatePickupLocation(location) {
//     this.currentLocation = location;
//     this.centerLocation(location);
//   }

showPickupTime() {
    this.popup = new google.maps.InfoWindow({
      content: '<h5>You Are Here</h5>'
    });
    
    this.popup.open(this.map, this.pickupMarker);
    
    google.maps.event.addListener(this.pickupMarker, 'click', () => {
      this.popup.open(this.map, this.pickupMarker);
    });
    //send update current location
    this.updatedPickupLocation.next(this.pickupMarker.getPosition());
  }

 removePickupMarker() {
    if (this.pickupMarker) {
      this.pickupMarker.setMap(null);
      this.pickupMarker = null;
    }
  }

  centerLocation(location) {
    
    // if (location) {
    //   this.map.panTo(location);
    // }
    // else {
      
    //   this.getCurrentLocation().subscribe(currentLocation => {
    //     this.map.panTo(currentLocation);
    //   });
    // }
  }

 updateTime(seconds) {
    let minutes = Math.floor(seconds/60);
    this.popup.setContent(`<h5>${minutes} minutes</h5>`);
  }



}
