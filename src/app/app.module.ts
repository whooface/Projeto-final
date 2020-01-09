import { DatePicker } from '@ionic-native/date-picker/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Camera } from '@ionic-native/camera/ngx';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {PhotoViewer} from '@ionic-native/photo-viewer/ngx'


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


//Firebase
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from '@angular/fire/auth';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import {GuardService} from './service/guard.service'
import { Network } from '@ionic-native/network/ngx';


import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
  BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    SocketIoModule.forRoot(config),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
    
    ],
  providers: [
    StatusBar,
    SplashScreen,
    [GuardService],
    Network,

    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera, GooglePlus, Geolocation, AndroidPermissions, DatePicker,PhotoViewer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
