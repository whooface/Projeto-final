import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { Camera } from '@ionic-native/camera/ngx';
import { DatePicker } from '@ionic-native/date-picker/ngx';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {GuardService} from './service/guard.service'
import { Network } from '@ionic-native/network/ngx';


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    ],
  providers: [
    StatusBar,
    SplashScreen,
    [GuardService],
    Network,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera, GooglePlus, Geolocation, AndroidPermissions, DatePicker,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
