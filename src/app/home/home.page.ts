import { UserService } from 'src/app/service/user.service';
import { User } from './../model/user';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected user :User = new User

  constructor(
    protected userService:UserService
  ) {
    console.log(this.userService.afAuth.auth.currentUser)
    // console.log(this.userService.afAuth.user)
  }

  ionViewWillEnter() {
    let login = this.userService.afAuth.auth.currentUser;
    if (login) {
      this.userService.get().subscribe(
        res => {
          if (res == null) {
            this.user = new User;
          } else {
            this.user = res
          }
          this.user.email = login.email
        }
      )
    }
  }
}
