import { User } from './../../model/user';
import { Dog } from '../../model/dog'
import { UserService } from './../../service/user.service';
import { Chat } from './../../model/chat';
import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ModalController,NavParams } from '@ionic/angular';
import {Mensagem} from '../../model/mensagem'
import { Conversa } from 'src/app/model/conversa';
import { DogService } from '../../service/dog.service';
import { ConversaService } from '../../service/conversa.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  protected user: User = new User 
  protected dog;
  protected msg:Mensagem
  public mensagem:string = "";
  public remetente:string = "Eu";
  public conversa:Conversa;
  public idDog:string;
  public idConversa:any;
  public destinatario;
  public user2: User = new User

  
  
  public entrada : string; 
  
  constructor(
    protected  userService : UserService,
    private modal:ModalController,
    private nav:NavParams,
    private dogService:DogService,
    private conversaService:ConversaService
  
    

  ) {
    this.getMensagens().subscribe(
      (res:any)=>{
        this.conversa.mensagens.push(res)
      }
    )
   }

  ngOnInit() {
    
    this.idDog = this.nav.get('idDog')
    this.dogService.get(this.idDog).subscribe(
      res=>{
      this.dog = new Dog
      console.log(this.dog)
      console.log(res)
      this.dog = res
      }
    )
  
    this.userService.get().subscribe(
      res=>{
        this.user = res
      }
    )
    

    console.log(this.dog)

    
  }

   

  ionViewWillEnter(){
    console.log(this.remetente)
    if(!this.nav.get('home')){
      
      this.conversaService.io.emit('entrarSala',this.conversa.idConversa)
       for(let i = 0; i< this.conversa.users.length; i++){
         if(this.conversa.users[i] != this.userService.afAuth.auth.currentUser.uid){
            this.userService.getUser(this.conversa.users[i]).subscribe(
              res=>{
                this.user2 = new User
                this.user2 = res
                this.destinatario = this.user2.nome
              }
            )
         }
       }
      
    }
    

  }
  
  getMensagens(){
    let observable = new Observable(observer =>{
        this.conversaService.io.on('mensagem',(msg)=>{
          observer.next(msg);
        })
    })
    return observable
    
  }

  closeModal(){
    this.modal.dismiss()
  }
  enviar(){
    this.msg = new Mensagem
    this.msg.autor = this.userService.afAuth.auth.currentUser.uid
    this.msg.mensagem = this.mensagem

    if(this.nav.get('home') && !this.conversa){
      let data = new Date
      this.conversa = new Conversa
      this.conversa.idConversa = data.getTime().toString()
      this.conversa.idDog = this.idDog
      this.conversa.users = [this.userService.afAuth.auth.currentUser.uid,this.dog.dono]
      this.conversa.mensagens = [this.msg]
      this.conversaService.novaConversa(this.conversa)
      console.log(this.msg)
      this.conversaService.io.emit('entrarSala',this.conversa.idConversa)
      this.mensagem = ""
    }else{

      this.conversa.mensagens.push(this.msg)
      this.conversaService.io.emit('enviarMensagem',[this.msg,this.conversa.idConversa])
      this.mensagem = ""
      
    }
    }
  ngOnDestroy(){
    this.conversaService.io.emit('sairSala',this.conversa.idConversa)
    
  }
  }  




