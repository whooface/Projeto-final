import { Injectable } from '@angular/core';
import { User } from './../model/user';
import {AngularFireDatabase} from '@angular/fire/database'; 
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firedb: AngularFireDatabase,
    private afAuth: AngularFireAuth
  ) { }

  add(user:User){
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.senha).then(
      res=>{
        user.senha = null;
        user.email = null;
        return this.firedb.object("user/"+res.user.uid).set(user).then().catch(
          ()=>{
            this.afAuth.auth.currentUser.delete();
          });
        //  ({
        //  nome:user.nome,
        //  ativo:user.ativo,
        //  })
        },
      erro=>{
        this.afAuth.auth.currentUser.delete();
      }
    )
    //return this.firedb.object("user").set(user);
    //return this.firedb.list("user").push(user);
  }

  get(){
    let user = this.afAuth.auth.currentUser;
    console.log(user);
    return this.firedb.object("user/" + user.uid).valueChanges();
  }

  update(){
    let user = this.afAuth.auth.currentUser;
    return this.firedb.object("user/" + user.uid).update(user);
  }

  delete(){
    let uid = this.afAuth.auth.currentUser.uid;
    this.afAuth.auth.currentUser.delete();
    return this.firedb.object("user/" + uid).update({
      ativo: false
    });
    //return this.firedb.object("user/" + user.uid).remove();
  }

}