import { DogService } from './../../service/dog.service';
import { User } from './../../model/user';
import { Dog } from '../../model/dog'
import { UserService } from './../../service/user.service';
import { Chat } from './../../model/chat';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ModalController,NavParams } from '@ionic/angular';
import {Mensagem} from '../../model/mensagem'
import { Conversa } from 'src/app/model/conversa';
import { ContatosService } from '../../service/contatos.service'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  protected user: User = new User 
  protected dog: Dog = new Dog;
  protected msg:Mensagem
  private mensagens = []
  public mensagem;
  public remetente:string;
  public conversa:Conversa = new Conversa;
  public idDog:string;
  public idConversa:any;
  
  
  public entrada : string; 
  
  constructor(
    protected  userService : UserService,
    private io:Socket,
    private modal:ModalController,
    private nav:NavParams,
    private contatoService:ContatosService,
    private dogService:DogService
    

  ) { }

  ngOnInit() {
 
   


  
    
    this.idDog = this.nav.get('idDog')
    console.log(this.dog)
    this.dogService.get(this.idDog).subscribe(
      res=>{
        this.dog = res
      }
    )
    

  }

  ionViewWillEnter(){
    this.contatoService.getMyConversas(this.idDog).subscribe(
      res=>{
        console.log(res[0].users)
        for(let i = 0;i < res.length;i++){
          if(res[i].users  && res[i].users.indexOf(this.userService.afAuth.auth.currentUser.uid) != -1){
              this.conversa = res[i]
              this.idConversa = res[i].key
          }
        }
        
      }
    )
        
  }

  closeModal(){
    this.modal.dismiss()
  }
  enviar(){
    if(!this.conversa.mensagens){
      let data = new Date
      this.conversa.idDog = this.idDog
      this.conversa.users =  [this.userService.afAuth.auth.currentUser.uid,this.dog.dono]
      this.conversa.mensagens = []
      this.idConversa = data.getTime()
      this.contatoService.add(this.conversa,this.idConversa).then()
      console.log("crio uma nova conversa")
    }
     console.log(this.conversa)
    
     console.log(this.conversa)
    this.msg = new Mensagem
    this.remetente = this.user.nome
    this.msg.autor = this.userService.afAuth.auth.currentUser.uid.toString()
    this.msg.mensagem = this.mensagem
    this.conversa.mensagens.push()
    if(!this.conversa.mensagens){
      this.conversa.mensagens = [this.msg]
      console.log('if')
    }else{
      this.conversa.mensagens.push(this.msg)
      console.log('else')
    }
    this.contatoService.update(this.conversa,this.idConversa) 
  
    this.mensagem = ""
    
}
}
