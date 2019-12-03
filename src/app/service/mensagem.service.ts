import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController
  ) { }

  async presentAlert(titulo:string, texto:string){
    const alert = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }
  async presentLoading(){
    const loading = await this.loadingController.create({
       message: 'Carregando'

    });
    await loading.present();
  }
    async dismissLoading(){
      await this.loadingController.dismiss();
    }
}
