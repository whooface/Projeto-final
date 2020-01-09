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
    private camera:Camera,
    public actionSheetController: ActionSheetController,
  ) { }

  ngOnInit() {
  }
  onSubmit(form){
    this.msg.presentLoading()
    this.userService.add(this.user).then(
      res=>{
        console.log(res)
        //console.log("Cadastrado!", res);
        this.msg.dismissLoading()
        this.msg.presentAlert("Bem Vindo","Cadastrado com sucesso!")
        this.user = new User;
        form.reset();
        this.router.navigate(['home']);
      },
       erro=>{
        console.log("Erro: ", erro); 
        this.msg.dismissLoading()
        this.msg.presentAlert("Ops!","Erro ao cadastrar!")
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
      quality: 100,
      sourceType:this.camera.PictureSourceType.PHOTOLIBRARY,
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
  async escolherFoto() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Escolher Opção',
      buttons: [
        {
        text: 'Tirar Foto',
        icon: 'camera',
        handler: () => {
          this.tirarfoto()
        }
      }, 
      {
        text: 'Galeria',
        icon: 'photos',
        handler: () => {
          this.pegarfoto()
        }
      },
      {
        text: 'Remover foto',
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
  sair(){
    this.router.navigate(["/login"])
  }
  

}


