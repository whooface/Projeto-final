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

  add(conversa:Conversa,idConversa:string){
 

  return this.firebs.object("/conversas/" + idConversa).set(conversa)

}
 get(idConversa:number){
  return this.firebs.object<Conversa>("/conversas/" + idConversa).valueChanges()

 }

 getMyConversas(idDog){
    return this.firebs.list<Conversa>("/conversas/" , ref=> ref.orderByChild('idDog').equalTo(idDog)).snapshotChanges()
    
    .pipe(
      map(dados =>
        dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
      )
    )
}
update(conversa:Conversa,idConversa:string){
  console.log(idConversa)

  return this.firebs.object("conversas/"+ idConversa).update(conversa);
}

 }
