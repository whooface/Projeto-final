import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import {MensagemService} from 'src/app/service/mensagem.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {
  protected usuario = new User;
  constructor(
    private usuarioService: UserService,
    private msg:MensagemService,
    private router: Router
  ) { }

  ngOnInit() {

  }

  onSubmit(form){
    console.log(this.usuario)
    this.usuarioService.add(this.usuario).then(
      res=>{
        console.log(`Cadastrado ${res}`)
        this.msg.presentAlert("Ok!","Cadastrado Com Sucesso!")
        this.usuario = new User;
        //reseta formulario
        form.reset()
        this.router.navigate([''])
      },
      erro=>{
          console.log(`Erro ${erro}`)
          this.msg.presentAlert("Ops!","Erro ao tentar cadastrar! Verifique os dados e se o email ja foi cadastrado!")
      }
    )
  }
 

}
