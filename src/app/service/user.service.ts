import { AngularFirestore } from '@angular/fire/firestore';
import { User } from './../model/user';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firedb : AngularFireDatabase,
    public afAuth : AngularFireAuth,
    public fireds: AngularFirestore
  ) { }

  add(user:User){
      return this.afAuth.auth.createUserWithEmailAndPassword(user.email,user.senha).then(
        res=>{
          user.senha = null;
          user.email = null;
          user.ativo = true;
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

  get(){
    let user = this.afAuth.auth.currentUser;
    console.log(user);
    return this.firedb.object<User>("usuarios/"+ user.uid).valueChanges();
  }

  //varivel com dois U
  update(user:User){
    let uuser = this.afAuth.auth.currentUser;
    console.log(user);
    return this.firedb.object("usuarios/"+ uuser.uid).update(user);
  }
  //varivel com dois U
  delete(user:User){
    let uid = this.afAuth.auth.currentUser;
    this.afAuth.auth.currentUser.delete()
    return this.firedb.object("usuarios/"+ uid).update({ativo: false});
  }
  logout(){
    this.afAuth.auth.signOut()
  }

  gelAll() {
    return this.fireds.collection<User>("user", ref => ref.where('ativo', '==', true)).snapshotChanges()
      .pipe(
        map(dados =>
          dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
          //dados.map(d => ({ key: d.payload.key, ...d.payload.val() }))
        )
      )
}

}

