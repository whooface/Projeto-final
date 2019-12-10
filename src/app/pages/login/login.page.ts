import { MensagemService } from './../../service/mensagem.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, MenuController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ModalController } from '@ionic/angular';



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
    private geolocation: Geolocation,
    private menu: MenuController
  ) { }

  ngOnInit() {
    this.localAtual(),
    this.hide()
    
    
  }
  onSubmit(fc){


  }
  ionViewWillEnter(){
   this.menu.enable(false);
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

  logout(){
    this.afAuth.auth.signOut().then(
      () => this.router.navigate([''])
    );
  }
  localAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp.coords.latitude)
      console.log(resp.coords.longitude)
     }).catch((error) => {
       console.log('Error getting location', error);
     });
  }
  show(){
     if(document.getElementById("b").style.visibility == "hidden"){
      document.getElementById("b").style.visibility = "visible"
     } else{
      document.getElementById('b').style.visibility = "hidden"
      
     }
     
  }
  hide(){
    document.getElementById('b').style.visibility = "hidden";
  }

}
