import { Platform } from '@ionic/angular';
import { MensagemService } from './../../service/mensagem.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import{ Geolocation} from '@ionic-native/geolocation/ngx';





@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email:string=null;
  protected senha:string=null;
  

  constructor(
    private afAuth : AngularFireAuth,
    private router:Router,
    private msg:MensagemService,
    private googlePlus: GooglePlus,
    private platform:Platform,
    private geolocation:Geolocation,

   
 
  ) { }

  ngOnInit() {
  }
  onSubmit(fc){

  }
  
  login() {
    this.msg.presentLoading()
    this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(
      res => {
        this.msg.dismissLoading()
        this.router.navigate([''])
      },
      err => {
        console.log(err);
        this.msg.dismissLoading()
        this.msg.presentAlert("Ops!", "Não foi encotrado o usuario!");
      }
    )
  }
  loginGoogle() {
    if (!this.platform.is("cordova")) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(res => {
          console.log(res)
          this.router.navigate([''])
        })
        .catch(err => console.error(err))
    } else {
      this.googlePlus.login({})
        .then(res => {
          console.log(res)
          this.router.navigate([''])
        })
        .catch(err => console.error(err))
    }
  }

  logout(){
    this.afAuth.auth.signOut().then(
      () => this.router.navigate([''])
    );
  }
  localAtual(){
    this.geolocation.getCurrentPosition().then((resp) =>{
      console.log("latitude:", resp.coords.latitude)
      console.log("longitude:", resp.coords.longitude)

    }).catch((error) =>{
      console.log("Error getting location")
    })
  }
}
    