import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth, AngularFireAuthModule } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  protected user: User = new User; 
  public amigos: Array<any> = [] ;
  
  constructor(
      
    public firedb: AngularFireDatabase,
    public afAuth: AngularFireAuth,
    protected userService: UserService,

    ) {}

    ngOnInit() {
    }
    ionViewWillEnter() {
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
      //função para puxar todos os users
      this.userService.getAll().subscribe(
        res=>{
          this.amigos = res
        }
      )
    }

  }