import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { RegisterPage } from '../register/register';
import { HomePage } from '../home/home';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
	@ViewChild('email') email;
	@ViewChild('pword') pword;
	@ViewChild('type') type;
  items: Observable<any[]>;
  constructor(public db: AngularFireDatabase,public fire:AngularFireAuth,public modalCtrl: ModalController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
  	
    firebase.auth().signInWithEmailAndPassword(this.email.value, this.pword.value)
    .then(data=> {
      this.db.list('items').push({
        email: this.email.value,
        pword: this.pword.value,
        type: this.type.value
      }).then(data=> { if(this.type.value == 'u') { this.navCtrl.push(HomePage); } } );


    }).catch(error=> {
      console.log('get error', error);
    });
  }

  createAccount() {
    console.log('Here...');
   let modal = this.modalCtrl.create(RegisterPage);
    modal.present();
  }

}
