import { Router } from '@angular/router';
import { User } from './../../model/user';
import { Component, OnInit, Sanitizer } from '@angular/core';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.page.html',
  styleUrls: ['./perfiluser.page.scss'],
})
export class PerfiluserPage implements OnInit {

  protected user : User = new User
  
  constructor(
    protected userService:UserService,
    private router:Router
  ) { }

  ngOnInit() {
    
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
          console.log(this.user)
        },
        erro => {
          console.log(erro)
          this.router.navigate(['/login'])
        }
      )
    }
  }

  sair() {
    this.userService.logout()
    this.router.navigate(["/"])
  }
}


