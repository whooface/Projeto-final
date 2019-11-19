import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class MensagemService {

  constructor(
    public alertController:AlertController) { }

  async presentAlert(titulo:string,texto:string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: texto,
      buttons: ['OK']
    });

    await alert.present();
  }

}
