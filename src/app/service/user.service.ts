
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators"
import {Chat} from '../model/chat'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firedb : AngularFireDatabase,
    public afAuth : AngularFireAuth,
  ) { }

  add(user:User){
      return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.senha).then(
        res=>{
          user.senha = null;
          user.email = null;
          //user.ativo = true;
          return this.firedb.object("user/" + res.user.uid).set(user).then().catch(
            ()=>{
              this.afAuth.auth.currentUser.delete()
            });//apagar user

          // ({
          //  nome:user.nome,
          //  ativo:user.ativo,
          // })
        },
        erro=>{
          //APAGAR USER this.afAuth.auth.currentUser.delete()
        }
    )
    //cadastro no banco
    //return this.firedb.list("user").push(user);
  }
  
  addConversa(user:User,chat:Chat){
    let uuser = this.afAuth.auth.currentUser;
    let data = new Date()

    chat.idConversa = chat.user.substr(0,5) + data.getTime().toString()
    
    
    this.get().subscribe(
      res=>{
        user.contatos =  res.contatos
        console.log(res) 
      }
    )
    if(user.contatos == null){
        user.contatos = [chat]
    }
    else{
      user.contatos.push(chat)
    }
   
    return this.firedb.object("user/"+ uuser.uid + "/contatos").set(user.contatos);
  }

  getUser(id){
    console.log(id)
    return this.firedb.object<User>("user/" + id).valueChanges()
  }

  get(){
    let user = this.afAuth.auth.currentUser;
    console.log(user);
    return this.firedb.object<User>("user/"+ user.uid).valueChanges();
  }

  getGoogle(id){
    return this.firedb.object<User>("user/"+ id,
    ).valueChanges();
  }
  addGoogle(user:User,uid){
    user.senha = null;
    user.email = null;
    //user.ativo = true;
    
    this.firedb.object("user/" + uid).set(user)

  }

  getAll(){
    return this.firedb.list<User>("user").snapshotChanges()
    .pipe(
      map(dados =>
        dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
      )
    )
}

  //varivel com dois U
  update(user:User){
    let uuser = this.afAuth.auth.currentUser;
    console.log(user);
    return this.firedb.object("user/"+ uuser.uid).update(user);
  }
  //varivel com dois U
  delete(user:User){
    let uid = this.afAuth.auth.currentUser;
    this.afAuth.auth.currentUser.delete()
    return this.firedb.object("user/"+ uid).update({ativo: false});
  }
  logout(){
    this.afAuth.auth.signOut();
  }

}

