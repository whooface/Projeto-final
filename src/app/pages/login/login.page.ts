import { Platform } from '@ionic/angular';
import { MensagemService } from './../../service/mensagem.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';




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
    private platform:Platform
  ) { }

  ngOnInit() {
  }
  onSubmit(fc){

  }
  
  login(){
    this.afAuth.auth.signInWithEmailAndPassword(this.email,this.senha).then(
      res =>{
        this.router.navigate([''])
      },
      err=>{
        console.log(err);
        this.msg.presentAlert("Ops!","Não foi encontrado o usuário!");
      }

    )
  }
  loginGoogle(){
    if(!this.platform.is("cordova")){
     this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider()).then(
       res =>{
         this.router.navigate([''])
       }
     );

    }
    else{
      this.googlePlus.login({})
      .then(res => 
        this.router.navigate([''])
      )
      .catch(error => console.error(error));}
  }

  logout(){
    this.afAuth.auth.signOut().then(
      () => this.router.navigate([''])
    );
  }

      
    }
    