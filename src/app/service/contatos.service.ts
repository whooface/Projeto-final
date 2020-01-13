import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Conversa } from '../model/conversa'
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {

  constructor(
    private firebs:AngularFireDatabase,
    private auth:AngularFireAuth
  ) { }

  add(conversa:Conversa){
   
  return this.firebs.object("conversas/" + conversa.idConversa).set(conversa)

}
 get(idConversa:number){
  return this.firebs.object<Conversa>("conversas/" + idConversa).valueChanges()

 }

 getMyConversas(){
    return this.firebs.list<Conversa>("conversas").snapshotChanges()
    
    .pipe(
      map(dados =>
        dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
      )
    )
}

 }
