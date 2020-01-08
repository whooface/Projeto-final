import { User } from './../../model/user';
import { UserService } from './../../service/user.service';
import { Chat } from './../../model/chat';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';



@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  protected user: User = new User 
  protected chat: Chat = new Chat;
  
  public entrada : string; 
  
  constructor(
    protected  userService : UserService,
    private io:Socket
  

  ) { }

  ngOnInit() {
    this.io.connect()
    
    
  }

 enviar(){
    this.io.emit("msg",`O usuario ${this.userService.afAuth.auth.currentUser.email} enviou uma mensagem!`)
   
  
}
}