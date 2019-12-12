import { User } from './../model/user';
import { Dog } from './../model/dog';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(
    // private firestore : AngularFirestore,
     private firebs : AngularFireDatabase,
    public afAuth : AngularFireAuth,

  ) { }


    add(dog: Dog) {
    // return this.firestore.collection<Dog>("dog").add(
    return this.firebs.list<Dog>("dog").push(
      {
        dono: this.afAuth.auth.currentUser.uid,
        nome: dog.nome,
        descricao: dog.descricao,
        especie: dog.especie,
        fotos: dog.fotos,
        status: true,
        verificado: false,
        idade: dog.idade,
        tempo: dog.tempo,
      });
    }

  get(uid){
    return this.firebs.object<Dog>("dog/"+ uid).valueChanges();
  }

  //varivel com dois U
  update(dog:Dog){
    let uuser = this.afAuth.auth.currentUser;
    console.log(dog);
    return this.firebs.object("user/"+ uuser.uid).update(dog);
  }
  //varivel com dois U
  delete(user:User){
    let uid = this.afAuth.auth.currentUser;
    this.afAuth.auth.currentUser.delete()
    return this.firebs.object("user/"+ uid).update({ativo: false});
  }

}
