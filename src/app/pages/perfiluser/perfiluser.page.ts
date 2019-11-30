import { Component, OnInit, Sanitizer } from '@angular/core';
import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfiluser',
  templateUrl: './perfiluser.page.html',
  styleUrls: ['./perfiluser.page.scss'],
})
export class PerfiluserPage implements OnInit {

  protected user:User = new User

  constructor(
    protected userservice:UserService,
    private router:Router
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    let login = this.userservice.afAuth.auth.currentUser;
    if (login) {
      this.userservice.get().subscribe(
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
    this.userservice.logout()
    this.router.navigate(["/"])
  }


}
