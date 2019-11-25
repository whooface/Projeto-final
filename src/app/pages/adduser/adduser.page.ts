import { MensagemService } from './../../service/mensagem.service';
import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';



@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {

  protected user: User = new User;

  constructor(
    private userService : UserService,
    private msg : MensagemService,
    private router:Router,
    private camera: Camera,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
  }
  onSubmit(form){
    console.log(this.user);
    this.userService.add(this.user).then(
      res=>{
        //console.log("Cadastrado!", res);
        this.msg.presentAlert("DAAALE","Cadastado com sucesso!")
        this.user = new User;
        form.reset();
        this.router.navigate(['']);
      },
       erro=>{
        console.log("Erro: ", erro); 
        this.msg.presentAlert("IH MANÉ","Erro no cadastro!")
       }
    )
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
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
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
  async escolherfoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolher Opção',
      buttons: [
        {
        text: 'Câmera',
        icon: 'camera',
        handler: () => {
          this.tirarfoto();
        }
      }, 
      
      {
        text: 'Remover Foto',
        icon: 'qr-scanner',
        handler: () => {
         this.user.foto=null;
        }
      },
      {
        text: 'Galeria',
        icon: 'photos',
        handler: () => {
         this.pegarfoto();
        }
      },  
      {
        text: 'Cancel',
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
