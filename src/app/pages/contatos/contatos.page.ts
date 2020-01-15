import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ChatPage} from '../chat/chat.page'
import{ ConversaService} from '../../service/conversa.service'




@Component({
  selector: 'app-chat',
  templateUrl: './contatos.page.html',
  styleUrls: ['./contatos.page.scss'],
})
export class ContatosPage implements OnInit {
  protected user: User = new User; 
  public conversas: Array<any> = [] ;
  
  constructor(
      
    public firedb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    protected userService: UserService,
    protected conversaService:ConversaService,
   
    private modal:ModalController

    ) {}

    ngOnInit() {
    }
    ionViewWillEnter() {

     this.conversaService.io.emit('getMyConversas',this.userService.afAuth.auth.currentUser.uid)
     this.conversaService.io.on('myConversas',(conversas)=>{
        this.conversas = conversas
     })

      
      let login = this.userService.afAuth.auth.currentUser;
      if (login) {
        this.userService.get().subscribe(
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
              
          },
          erro => {
            
          }
        )
      }
    }
    chamarChat(i){
  
      this.modal.create({
        component: ChatPage,
        componentProps:{
          conversa:i,
          idDog:i.idDog
        }
      }).then(modal => modal.present())
    }
  }