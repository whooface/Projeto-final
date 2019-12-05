// import { User } from './../model/user';
// import { Dog } from './../model/dog';
// import { Injectable } from '@angular/core';
// import {AngularFireDatabase} from '@angular/fire/database';
// import { AngularFireAuth } from '@angular/fire/auth';


// @Injectable({
//   providedIn: 'root'
// })
// export class DogService {

//   constructor(
//     private firedb : AngularFireDatabase,
//     public afAuth : AngularFireAuth,
//   ) { }


//  add(dog:Dog){
//       return this.firedb.list(/).add(

//       )
//         }

//   get(){
//     let User = this.afAuth.auth.currentUser;
//     console.log(user);
//     return this.firedb.object<User>("user/"+ user.uid).valueChanges();
//   }

//   //varivel com dois U
//   update(user:User){
//     let uuser = this.afAuth.auth.currentUser;
//     console.log(user);
//     return this.firedb.object("user/"+ uuser.uid).update(user);
//   }
//   //varivel com dois U
//   delete(user:User){
//     let uid = this.afAuth.auth.currentUser;
//     this.afAuth.auth.currentUser.delete()
//     return this.firedb.object("user/"+ uid).update({ativo: false});
//   }

// }
