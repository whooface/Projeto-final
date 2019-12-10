
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
    protected userservice:UserService,
    private menu: MenuController
  ) {
    console.log(this.userservice.afAuth.auth.currentUser)
    // console.log(this.userservice.afAuth.user)
  }

  ionViewWillEnter() {
    this.menu.enable(true);
    let login = this.userservice.afAuth.auth.currentUser;
    if (login) {
      this.userservice.get().subscribe(
        res => {
          if (res == null) {
            this.user = new User
           if(login.displayName != null) {
            this.user.foto = login.photoURL
            this.user.nome = login.displayName
          } 
        } else {
            this.user = res
          }
          this.user.email = login.email
        }
      )
    }
  }
}
