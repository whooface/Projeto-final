import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import {MensagemService} from '../../service/mensagem.service';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.page.html',
  styleUrls: ['./updateuser.page.scss'],
})
export class UpdateuserPage implements OnInit {
   //private array = [];
  constructor(
    private userService: UserService,
    private msg: MensagemService,
    public alert: AlertController,
    private router: Router
  ) { }
  private user = new User

  ngOnInit() {
    this.userService.afAuth.auth.currentUser.email
  }
  ionViewWillEnter() {
    if(this.userService.afAuth.auth.currentUser.displayName != null){
      document.getElementById("senhaGoogle").style.display = "none";
    }
    this.userService.get().subscribe(
      res=>{
        this.user = res
      })
      this.userService.getAll().subscribe(
        res=>{
          //this.array = res
          //console.log(this.array)
        }
      )
     
    }
    mudarSenha(){
      this.mudarSenhaAlert();
      

    }
      async mudarSenhaAlert() {
        const alert = await this.alert.create({
          header: 'Alterar Senha?',
          message: 'Deseja alterar sua senha?',
          buttons: [
            {
              text: 'Não',
              role: 'cancel',
            }, {
              text: 'Sim',
              handler: () => {
               this.router.navigate(['trocar-senha']);
              }
            }
          ]
        });
      
    await alert.present();
  }
 
    
    
  }




