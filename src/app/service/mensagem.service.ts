import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    public alertController: AlertController,
    public LoadingController: LoadingController
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

  async presentAlertSenha(titulo:string, texto:string){
    const alertSenha = await this.alertController.create({
      header: titulo,
      //subHeader: 'Subtitle',
      message: texto,
      buttons: ['Não','Sim']
    });

    await alertSenha.present();
  }
  async presentLoading() {
    const loading = await this.LoadingController.create({
      // message: 'Hellooo',
      // duration: 2000
      spinner:"dots"
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();

    console.log('Loading dismissed!');
  }
  async dismissLoading(){
    await this.LoadingController.dismiss();
  }

}
