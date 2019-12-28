import { ChatService } from './../../service/chat.service';
import { User } from './../../model/user';
import { UserService } from './../../service/user.service';
import { Chat } from './../../model/Chat';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ToastController } from '@ionic/angular';



@Component({
  selector: 'app-bate-papo',
  templateUrl: './bate-papo.page.html',
  styleUrls: ['./bate-papo.page.scss'],
})
export class BatePapoPage implements OnInit {
  
  protected chat: Chat = new Chat;
  private user: User = new User
  
  
  currentUser =''
  mensagem = ''
  mensagens = []
 

  constructor(
    private socket: Socket,
    protected userService : UserService,
    public chatService: ChatService,
    private toastCtrl: ToastController,

  ) { }

  ngOnInit() {
    this.socket.connect();

    
    let nome = this.user.email
    
    this.user = new User
    
    let name = `${nome}`
    this.currentUser = name;

     this.socket.emit('set-name', name);

     this.socket.fromEvent('users-changed').subscribe(data =>{
       console.log('a data: ', data);
       let user = data['user'];
       if(data['event']== 'left'){
         this.showToast(`Usuario: ${user} Saiu`)
       }else{
        this.showToast(`Usuario: ${user} entrou`)
       }
       
     })

     this.socket.fromEvent('message').subscribe(mensagem =>{
      console.log('New:', mensagem);
      this.mensagens.push(mensagem);
     })
  }
  async showToast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg ,
      duration: 2000,
      position: 'top',
    });
    toast.present();
  }
  
  

 enviarMsg(){
    this.socket.emit('send-message',{text: this.mensagem});
    this.mensagem = '';

 }

 ionViewWillLeave(){
   this.socket.disconnect();
 }
}