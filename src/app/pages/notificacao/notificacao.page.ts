import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { User } from '../../model/user';
import { UserService } from '../../service/user.service';
@Component({
  selector: 'app-notificacao',
  templateUrl: './notificacao.page.html',
  styleUrls: ['./notificacao.page.scss'],
})
export class NotificacaoPage implements OnInit {

  constructor(
    public toastController: ToastController,
    protected user:User = new User,
    protected userService:UserService
  ) { }

  ngOnInit() {
   

  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Excluimos a notificação',
      duration: 2000
    });
    toast.present();
  }
  teste(){
    this.presentToast()
    document.getElementById("teste").style.display = "none"
      
 
  }

}
