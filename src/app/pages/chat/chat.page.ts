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
  
  
  public entrada : string; 
  
  constructor(
    protected  userService : UserService,
    private io:Socket,
    private modal:ModalController,
    private nav:NavParams,
    private contatoService:ContatosService
    

  ) { }

  ngOnInit() {
  
    this.dog = this.nav.get('dog')
    this.idDog = this.nav.get('idDog')

  }

  ionViewWillEnter(){
    
    this.userService.get().subscribe(
      res=>{
        this.user = res
        
    }
      )

  }

  closeModal(){
    this.modal.dismiss()
  }
  enviar(){
    this.msg = new Mensagem
    this.remetente = this.user.nome
    this.msg.autor = this.userService.afAuth.auth.currentUser.uid.toString()
    this.msg.mensagem = this.mensagem
    this.mensagens.push(this.msg)
    this.mensagem = ""
    
}
}
