import { User } from './../model/user';
import { Dog } from './../model/dog';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from "rxjs/operators"
import { AngularFirestore } from "@angular/fire/firestore";



@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(
     private firest : AngularFirestore,
     private firebs : AngularFireDatabase,
     public afAuth : AngularFireAuth,

  ) { }


    add(dog: Dog) {
    // return this.firestore.collection<Dog>("dog").add(
    return this.firest.collection<Dog>("dog").add(
      {
        dono: this.afAuth.auth.currentUser.uid,
        nome: dog.nome,
        descricao: dog.descricao,
        especie: dog.especie,
        fotos: dog.fotos,
        status: true,
        verificado: false,
        idade: dog.idade,
        // tempo: dog.tempo,
        genero: dog.genero
      });
    }

  get(id){
    return this.firest.collection("dog").doc<Dog>(id).valueChanges();
  }

  getAll(){
     return this.firest.collection<Dog>("dog",ref=> ref.where('status','==',true).where('verificado','==',true)).snapshotChanges()
    .pipe(
      map(dados =>
        dados.map(d => ({  key: d.payload.doc.id, ...d.payload.doc.data() }))
        
      )
    ) 
    
  }

  getMyDogs(){
    return this.firest.collection<Dog>("dog",ref=> ref.where('dono','==',this.afAuth.auth.currentUser.uid)).snapshotChanges()
    .pipe(
      map(dados =>
        dados.map(d => ({ key: d.payload.doc.id, ...d.payload.doc.data() }))
        
      )
    ) 
  }

  //varivel com dois U
  update(dog:Dog,id:string){

    return this.firest.collection("dog").doc<Dog>(id).update(dog);
  }
  //varivel com dois U
  delete(id:string){
    return this.firest.collection("dog").doc<Dog>(id).update({
      status: false 
    });
  }

}