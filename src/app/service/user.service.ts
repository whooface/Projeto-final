import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    protected db: AngularFireDatabase,
    protected afAuth : AngularFireAuth 
  ) { }

  add(usuario:User){
      //return this.db.object("Usuario").set(usuario)
        return this.afAuth.auth.createUserWithEmailAndPassword(usuario.email,usuario.senha).then(
        res=>{
          ///deixa nulo senha e email para nao ir para tabela de usuario 
          usuario.senha = null;
          usuario.email = null;
          //user.uid pega o uid dado ao usuario quando for cadastrado
          return this.db.object("usuarios/"+res.user.uid).set(usuario).then().catch(()=>{
              this.afAuth.auth.currentUser.delete()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          })
        },
        erro=>{
          
        }
      )
      //return this.db.list("Usuario").push(usuario)
  }
  get(){
    let user = this.afAuth.auth.currentUser
    console.log(user)
    return this.db.object(`usuarios/${user.uid}`).valueChanges();
  }
  update(usuario:User){
    let user = this.afAuth.auth.currentUser
    console.log(user)
    return this.db.object(`usuarios/${user.uid}`).update(usuario)
  }
  delete(){
    let id = this.afAuth.auth.currentUser.uid
    //deleta usuario
    //return this.db.object(`usuarios/${user.uid}`).remove()
    this.afAuth.auth.currentUser.delete();
    //return this.db.object(`usuarios/${id}`).update({
      //ativo: false
   // })
  
  }

}
