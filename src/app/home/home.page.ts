import { Router } from '@angular/router';

import { Component } from '@angular/core';
import { UserService } from './../service/user.service';
import { User } from './../model/user';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
protected user:User = new User



  constructor(
    protected userService:UserService,
    private menu : MenuController,
    private router: Router
  ) {
    console.log(this.userService.afAuth.auth.currentUser)
    // console.log(this.userService.afAuth.user)
  }

  ionViewWillEnter() {
    this.menu.enable(true)
    let login = this.userService.afAuth.auth.currentUser;
    if (login) {
      this.userService.get().subscribe(
        res => {
          if (res == null) {
            this.user = new User
           if(login.displayName != null) {
            this.user.foto = login.photoURL
            this.user.nome = login.displayName
          } 
        } else {
            this.user = res
            this.user.email = login.email
          }
          console.log(this.user)
        },
        erro => {
          console.log(erro)
          this.router.navigate(['/login'])
        }
      )
    }
  }
}