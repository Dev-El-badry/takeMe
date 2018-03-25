import { Component, Input } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import {} from '@types/googlemaps';
import {PickupPubSubProvider} from '../../providers/pickup-pub-sub/pickup-pub-sub';
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../login/login';

import * as firebase from 'firebase/app';
declare var google:any;

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  isPickupRequested:boolean;
  public pickupSubscription: any;
  public timeTillArrival: number;
  public isRiderPickedUp: boolean;
  public destination: string;

  constructor(public fire: AngularFireAuth,public navCtrl: NavController, private pickupPubSub: PickupPubSubProvider, private alertCtrl:AlertController) {

    fire.auth.onAuthStateChanged(function(user) {
      if(!user) {
        navCtrl.setRoot(LoginPage);
      } else {
        this.isPickupRequested = false;
          
        this.isRiderPickedUp = false;
        this.timeTillArrival = 5;
        this.pickupSubscription = this.pickupPubSub.watch().subscribe(e => {
          this.processPickupSubscription(e);
        })
      }
       
      
    });

  	
  }

  logout() {
    firebase.auth().signOut().then(data=> {
      this.navCtrl.push(LoginPage);
    }).catch(error=> {
      console.log('Get An Error', error);
    });
  }

  processPickupSubscription(e) {
    console.log(e);
    switch(e.event) {
      case this.pickupPubSub.EVENTS.ARRIVAL_TIME:
        this.updateArrivalTime(e.data);
        break;
      case this.pickupPubSub.EVENTS.PICKUP:
        this.riderPickedUp();
        break;
      case this.pickupPubSub.EVENTS.DROPOFF:
        this.riderDroppedOff();
        break;
    }
  }

  updateArrivalTime(seconds) {
    let minutes = Math.floor(seconds/60);
    this.timeTillArrival = minutes;
  }

  riderDroppedOff() {
    this.rateDriver();
    this.isRiderPickedUp = false;
    this.isPickupRequested = false;
    this.destination = null;
    this.timeTillArrival = 5;
  }

    rateDriver() {
    let prompt = this.alertCtrl.create({
      title: 'Rate Driver',
      message: 'Select a rating for your driver',
      inputs: [{
        type: 'radio',
        label: 'Perfect',
        value: 'perfect',
        checked: true
      },
      {
        type: 'radio',
        label: 'Okay',
        value: 'okay'
      },
      {
        type: 'radio',
        label: 'Horrible',
        value: 'horrible'
      }],
      buttons: [{
        text: 'Submit',
        handler: rating => {
          // TODO: send rating to server
          console.log(rating);
        }
      }]
    });
    
    prompt.present(prompt);
  }  

  setDestination(destination) {
    console.log('sdfsfd');
    this.destination = destination;
  }
  
  riderPickedUp() {
    console.log(this.isRiderPickedUp);
    this.isRiderPickedUp = true;
    console.log(this.isRiderPickedUp);
  }
  
  confirmPickup() {
  	this.isPickupRequested = true;
  }

  cancelPickup() {
  	this.isPickupRequested = false;
  }

}
