import { User } from './../model/user';
import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private firedb : AngularFireDatabase
  ) { }

  add(user:User){
    return this.firedb.list("user").push(user);
  }

}
