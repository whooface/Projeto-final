import { Dog } from './../model/dog';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DogService {

  constructor(
    private firebd:AngularFireDatabase,
    public afAuth:AngularFireAuth
  ) { }

  
      
    add(dog:Dog){
    
    }
}
