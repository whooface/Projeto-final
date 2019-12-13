import { Platform } from '@ionic/angular';
import { MensagemService } from './../../service/mensagem.service';
import { Router  } from '@angular/router';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { MenuController } from '@ionic/angular';
import * as $ from "jquery";


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
    private menu : MenuController,
   
  ) { }

  ngOnInit() {
  
  }

  ionViewWillEnter(){
    $(document).ready(function(){
      $(".inputs").hide()
      $(".balao").show()
    })
    this.email = ""
    this.senha = ""
    //this.localAtual()
    this.menu.enable(false)
    //console.log(this.afAuth.auth.currentUser)
  }
  onSubmit(fc){

  }
  
  loginGoogle() {
    if (!this.platform.is("cordova")) {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider())
        .then(res => {
          console.log(res)
          this.router.navigate(['home'])
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
        console.log(this.router.url)
        this.router.navigate(['home'])
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
    $(document).ready(function(){
      $('.balao').fadeOut(800)
      $('.inputs').fadeIn(500)
  });
  
   
  }
  sair(){
    $(document).ready(function(){
      $('.balao').fadeIn(800)
      $('.inputs').fadeOut(500)
  });
  }
}
    