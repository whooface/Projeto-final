import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { MensagemService } from './../../service/mensagem.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {

  protected user: User = new User;

  constructor(
    private userService: UserService,
    private msg:MensagemService,
    private router:Router
  ) { }

  ngOnInit() {
  }
  onSubmit(form){
    console.log(this.user);
    this.userService.add(this.user).then(
      res=>{
        //console.log("Cadastrado!", res);
        this.msg.presentAlert("Aviso", "Cadastrado Com Sucesso!");
        this.user = new User;
        form.reset();
        this.router.navigate(['']);
      },
      erro=>{
        console.log("Erro: ", erro);
        this.msg.presentAlert("Ops!","Erro Ao Tentar Cadastrar! Verifique Os Dados Ou Se O Email Já Foi Cadastrado!" )
      }
    )
  }
}
