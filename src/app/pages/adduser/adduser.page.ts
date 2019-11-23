import { MensagemService } from './../../service/mensagem.service';
import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {

  protected user: User = new User;

  constructor(
    private userService : UserService,
    private msg : MensagemService,
    private router:Router
  ) { }

  ngOnInit() {

  }

  onSubmit(form){
    console.log(this.user);
    this.userService.add(this.user).then(
      res=>{
        //console.log("Cadastrado!", res);
        this.msg.presentAlert("DAAALE","Cadastado com sucesso!")
        this.user = new User;
        form.reset();
        this.router.navigate(['']);
      },
       erro=>{
        console.log("Erro: ", erro); 
        this.msg.presentAlert("IH MANÉ","Erro no cadastro!")
       }
    )
  }

  

}
