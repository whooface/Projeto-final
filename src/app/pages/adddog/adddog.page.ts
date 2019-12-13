import { DogService } from './../../service/dog.service';
import { Dog } from './../../model/dog';
import { MensagemService } from './../../service/mensagem.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
const data = new Date();

@Component({
  selector: 'app-adddog',
  templateUrl: './adddog.page.html',
  styleUrls: ['./adddog.page.scss'],
})
export class AdddogPage implements OnInit {

  protected dog: Dog = new Dog;
  private pets: Array<Object> = []


  constructor(
    private dogService : DogService,
    private msg : MensagemService,
    private router:Router,
    private camera:Camera,
    public actionSheetController: ActionSheetController,
  ) { 
    this.pets = [
      {
       especie: "Canina",
       sexo : "Macho",
       tempo: "Ano",
       
      }
      ,
      {
       especie: "Felino",
       sexo : "Fêmea",
       tempo: "Meses"
       
      },
     
    ]
  
  }

  ngOnInit() {
    console.log(data.getTime())
  }


  onSubmit(form){
    //console.log(this.user);
    this.msg.presentLoading()
    this.dogService.add(this.dog).then(
      res=>{
        //console.log("Cadastrado!", res);
        this.msg.dismissLoading()
        this.msg.presentAlert("DAAALE","Cadastado com sucesso!")
        this.dog = new Dog;
        form.reset();
        this.router.navigate(['']);
      },
       erro=>{
        console.log("Erro: ", erro); 
        this.msg.presentAlert("IH MANÉ","Erro no cadastro!")
       }
    )
  }

    //Fotos ------------------------------------------  
    tirarFoto() {
      const options: CameraOptions = {
        quality: 50,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
      }
  
      this.camera.getPicture(options).then((imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        let base64Image = 'data:image/jpeg;base64,' + imageData;
        if (this.dog.fotos == null) {
          this.dog.fotos = []
        }
        this.dog.fotos.push(base64Image);
      }, (err) => {
        // Handle error
      });
    }
  
    pegarFoto() {
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
        if (this.dog.fotos == null) {
          this.dog.fotos = []
        }
        this.dog.fotos.push(base64Image);
      }, (err) => {
        // Handle error
      });
    }
  
    async escolherFoto() {
      const actionSheet = await this.actionSheetController.create({
        header: 'Escolhar Opção',
        buttons: [
          {
            text: 'Camera',
            icon: 'camera',
            handler: () => {
              this.tirarFoto()
            }
          },
          {
            text: 'Galeria',
            icon: 'photos',
            handler: () => {
              this.pegarFoto()
            }
          },
          {
            text: 'Remover Foto',
            icon: 'qr-scanner',
            handler: () => {
              this.dog.fotos = null;
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
  
    async removerFoto(index) {
      const alert = await this.msg.alertController.create({
        header: 'Confirmar!',
        message: 'Deseja apagar a ' + (index + 1) + 'ª foto?',
        buttons: [
          {
            text: 'Sim',
            handler: () => {
              this.dog.fotos.splice(index, 1)
              if (this.dog.fotos[0] == null)
                this.dog.fotos = null
            }
          },
          {
            text: 'Não',
            role: 'cancel',
            cssClass: 'secondary',
          }
        ]
      })
      await alert.present()
    }
  




}