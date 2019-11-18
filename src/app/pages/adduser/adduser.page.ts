import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {

  protected user: User = new User;

  constructor(
    private userService:UserService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    console.log(this.user);
    this.userService.add(this.user).then(
      res=>{
        console.log("Cadastrado!", res);
      },
       erro=>{
        console.log("Erro: ", erro); 
       }
    )
  }

}
