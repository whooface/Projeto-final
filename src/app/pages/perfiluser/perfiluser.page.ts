import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.page.html',
  styleUrls: ['./perfiluser.page.scss'],
})
export class PerfiluserPage implements OnInit {

  protected user:User = new User

  constructor(
    protected userservice:UserService,
    private router:Router,
    private geolocation: Geolocation,
    private camera:Camera,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter() {
    let login = this.userservice.afAuth.auth.currentUser;
    if (login) {
      this.userservice.get().subscribe(
        res => {
          if (res == null) {
            this.user = new User;
            if(login.displayName != null) {
              this.user.foto = login.photoURL
              this.user.nome = login.displayName
            }
          } else {
            this.user = res
          }
            this.user.email = login.email
            this.localAtual();
          console.log(this.user)
        },
        erro => {
          console.log(erro)
          this.router.navigate(['/login'])
        }
      )
    }
  }
  
  sair() {
    this.userservice.logout()
    this.router.navigate([""])
  }


  localAtual(){
    this.geolocation.getCurrentPosition().then((resp) => {
     this.user.lat = resp.coords.latitude
     this.user.lng = resp.coords.longitude
     }).catch((error) => {
       console.log('Error getting location', error);
     });
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
     this.user.foto = base64Image;
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
