import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { User } from '../../model/user';
import { DogService } from '../../service/dog.service'
import { Dog} from '../../model/dog'
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { MensagemService } from '../../service/mensagem.service'
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PerfildogPage } from '../../pages/perfildog/perfildog.page'
import { ChatPage} from '../../pages/chat/chat.page'

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.page.html',
  styleUrls: ['./favoritos.page.scss'],
})
export class FavoritosPage implements OnInit {
  
  protected user:User = new User
  protected dog:Dog;
  protected dogArray = []
  private nomeAbreviado:string = "";
  private images: string[] = [];

  constructor(
    protected userService:UserService,
    private menu : MenuController,
    private DogService : DogService,
    private router: Router,
    public viewer: PhotoViewer,
    public platForm:Platform,
    public alert: AlertController,
    public msg: MensagemService,
    public toast:ToastController,
    private modalPerfilDog:ModalController,
    private modalChat:ModalController 
    ) { }

    chamarChat(pet){
  
      this.modalChat.create({
        component: ChatPage,
        componentProps:{
          dog:pet,
          idDog:pet.key
        }
      }).then(modal => modal.present())
    }
    abrirPerfil(idDog){
      this.modalPerfilDog.create({
        component: PerfildogPage,
        componentProps:{
          idDog:idDog
        }
      }).then(modal => modal.present())
    }
    async presentToast(msg) {
      const toast = await this.toast.create({
        message: msg,
        duration: 2000
      });
      toast.present();
    }

  ngOnInit() {
  }

  ionViewWillEnter() {
     
    

    this.DogService.getAll().subscribe(
      res=> {
        this.dogArray = []
        //For para apenas mostrar os pet que nao sao do usuario na tela principal
        for(let i = 0;i < res.length;i++){
          if(res[i].dono != this.userService.afAuth.auth.currentUser.uid){
            
                this.dogArray.push(res[i])
              }
            }
            
          }
        
    )

    
    }
    

  }