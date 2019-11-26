import { MensagemService } from './../../service/mensagem.service';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email: string = null;
  protected senha: string = null;

  constructor(
    private afAuth:AngularFireAuth,
    private router:Router,
    private msg: MensagemService

  ) { }

  ngOnInit() {
  }
  onSubmit(fc){
    
  }
    login(){
      this.afAuth.auth.signInWithEmailAndPassword(this.email, this.senha).then(
        res=>{
          this.router.navigate([''])
        },
        err=>{
          console.log(err);
          this.msg.presentAlert("Ops!", "Não foi encontrado o usuario!");
        }
      )

      
    }
    logout(){
      this.afAuth.auth.signOut().then(
          () => this.router.navigate([''])
      )
    }
}
