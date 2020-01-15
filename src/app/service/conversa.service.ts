import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Conversa } from '../model/conversa'
import { Mensagem } from '../model/mensagem'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConversaService {

  constructor(
    public io:Socket
  ) { }


  getMyConversas(idUser){
    this.io.emit('getMyConversas',idUser)
    this.io.on('myConversas',(conversas)=>{
      return conversas;
    })
  }

  novaConversa(conversa:Conversa){
    this.io.emit('criarConversa',conversa)
  }
  room(idConversa:string){
    this.io.emit('entrarSala',idConversa)
  }
}
