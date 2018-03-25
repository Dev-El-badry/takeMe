import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { LoginPage } from '../login/login';
/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

@ViewChild('email') email;
@ViewChild('pword') pword;

  constructor(private fire: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams,public viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }

  createAccount() {
  	console.log(this.email, this.pword);
		firebase.auth().createUserWithEmailAndPassword(this.email.value, this.pword.value)
	   .then(data=> {
	      this.navCtrl.push(LoginPage);
	    }).catch(error=> {
	      console.log('get error', error);
	    });
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
