import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule, CUSTOM_ELEMENTS_SCHEMA    } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Geolocation } from '@ionic-native/geolocation';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { MapComponent } from '../components/map/map';
import { TakeMeComponent } from '../components/take-me/take-me';
import { AvailableCarsComponent } from '../components/available-cars/available-cars';
import { CarsProvider } from '../providers/cars/cars';
import { SimulateCarsProvider } from '../providers/simulate-cars/simulate-cars';
import { PickupCarComponent } from '../components/pickup-car/pickup-car';
import { PickupPubSubProvider } from '../providers/pickup-pub-sub/pickup-pub-sub';
import { DestinationAddressComponent } from '../components/destination-address/destination-address';

import { LoginPage } from '../pages/login/login';
import { RegisterPage } from '../pages/register/register';

/* Components */


import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

var config = {
    apiKey: "AIzaSyDYm9dbnOOpCssyBTFHAZt4BSSXE-ZXJHs",
    authDomain: "takeme-1515188301655.firebaseapp.com",
    databaseURL: "https://takeme-1515188301655.firebaseio.com",
    projectId: "takeme-1515188301655",
    storageBucket: "",
    messagingSenderId: "603119948495"
  };


@NgModule({
  schemas:  [ CUSTOM_ELEMENTS_SCHEMA ],
  declarations: [
    MyApp,
    HomePage,
    MapComponent,
    TakeMeComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddressComponent,
    LoginPage,
   RegisterPage
   
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
     AngularFireModule.initializeApp(config),
    AngularFireDatabaseModule,
    AngularFireAuthModule

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    MapComponent,
    TakeMeComponent,
    AvailableCarsComponent,
    PickupCarComponent,
    DestinationAddressComponent,
    LoginPage,
    RegisterPage
   
  ],
  providers: [
    Geolocation,
    StatusBar,
    SplashScreen,
    
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CarsProvider,
    SimulateCarsProvider,
    PickupPubSubProvider
  ]
})
export class AppModule {}
