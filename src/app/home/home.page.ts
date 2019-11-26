import { Router } from '@angular/router';
import { User } from './../model/user';
import { UserService } from 'src/app/service/user.service';
import { Component } from '@angular/core';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  protected user:User


  constructor(
    protected userService:UserService,
    private router:Router
  ) {}

  ngOnit(){
    
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
            this.user.email = login.email
          }
          
        }
      )
    }
  }
  
}
