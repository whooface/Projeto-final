import { Component, OnInit } from '@angular/core';
import { Camera } from '@ionic-native/camera/ngx';
import { MensagemService } from 'src/app/service/mensagem.service';
import { Router } from '@angular/router';
import { ActionSheetController } from '@ionic/angular';
import { Dog } from './../../model/dog';
import { DogService } from './../../service/dog.service';
import { User } from './../../model/user';

@Component({
  selector: 'app-adddog',
  templateUrl: './adddog.page.html',
  styleUrls: ['./adddog.page.scss'],
})
export class AdddogPage implements OnInit {

  constructor(
    private user: User,
    private dogService: DogService,
    private dog: Dog,
    private msg : MensagemService,
    private router:Router,
    private camera:Camera,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
  }

  tirarfoto(){
    const options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     if (this.dog.fotos == null){
       this.dog.fotos = []
     }
    }, (err) => {
     // Handle error
    });
  }


    pegarfoto(){
    const options: CameraOptions = {
      quality: 50,
      //Galeria
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    
    this.camera.getPicture(options).then((imageData) => {
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL):
     let base64Image = 'data:image/jpeg;base64,' + imageData;
     this.user.foto = base64Image;
    }, (err) => {
     // Handle error
    });
  }

    //ACTION SHEET
  async escolherfoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolher imagem da:',
      buttons: [{
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.tirarfoto();
        }
      },{
        text: 'Galeria',
        icon: 'photos',
        handler: () => {
          this.pegarfoto();
        }
      },{
        text: 'Remover Foto',
        icon: 'qr-scanner',
        handler: () => {
          this.user.foto = null;
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }
  
}
