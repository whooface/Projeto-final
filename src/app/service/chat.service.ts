import { User } from './../model/user';
import { Chat } from './../model/Chat';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';



@Injectable({
  providedIn: 'root'
})
export class ChatService {
    nome: any;
    mensagem: any = '';

  constructor(
    public afAuth : AngularFireAuth,
    public fireds: AngularFireDatabase
  ) { }

  enviarMensagem(chat:Chat){
      this.fireds.list('/chat').push({
          nome: this.nome,
          mensagem: this.mensagem
      })
  }
}
