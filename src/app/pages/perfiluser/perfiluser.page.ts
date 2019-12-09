import { Router } from '@angular/router';
import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';

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
            if(login.displayName != null ){
              this.user.nome = login.displayName
              this.user.foto = login.photoURL
              this.user.email = login.email
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

  sair() {
    this.userservice.logout()
    this.router.navigate(["/"])
  }
}


