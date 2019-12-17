import { User } from './../../model/user';
import { UserService } from './../../service/user.service';
import { Chat } from './../../model/Chat';
import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'app-bate-papo',
  templateUrl: './bate-papo.page.html',
  styleUrls: ['./bate-papo.page.scss'],
})
export class BatePapoPage implements OnInit {
  protected user: User = new User 
  protected chat: Chat = new Chat;
  
  public entrada : string; 
  
  constructor(
    protected  userService : UserService
  ) { }

  ngOnInit() {
     
  }
  

 enviar(){
    this.chat.id = this.userService.afAuth.auth.currentUser
     this.chat.entrada.push(this.entrada)
     console.log(this.chat.id)
  

     if(this.chat.id == this.userService.afAuth.auth.currentUser){
       this.chat.tipo = true;
      let cu =  (<HTMLInputElement>document.getElementById('lado'))
      cu.style.float = "right";
      
  }else{
    this.chat.tipo = false
  }
  
}
}