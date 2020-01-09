import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
import {MensagemService} from '../../service/mensagem.service';
import { Router } from '@angular/router';
var status = false;
@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.page.html',
  styleUrls: ['./trocar-senha.page.scss'],
})
export class TrocarSenhaPage implements OnInit {
 
  constructor(
    private userService: UserService,
    private msg: MensagemService,
    private router : Router
  ) { }

  ngOnInit() {
  }
  
  private senha:string;
  private nSenha:string;

  visualizarSenha(id,icon){
    console.log(id);
    let icone = (<HTMLInputElement>document.getElementById(icon));
    let olho = (<HTMLInputElement>document.getElementById(id));
    if(status == false){
      status = true;
      icone.name = "eye-off"
      olho.type = "text"
      console.log(status)
    }
    else{
      status = false;
      icone.name = "eye"
      olho.type = "password"
      console.log(status)
    }
  
}

alterarSenha(){
  const auth = this.userService.afAuth.auth
  this.msg.presentLoading()
  auth.signInWithEmailAndPassword(auth.currentUser.email,this.senha).then(
     res=>{
        auth.currentUser.updatePassword(this.nSenha).then(
          res=>{
             console.log("Senha alterada com sucesso!")
             this.msg.dismissLoading()
             this.msg.presentAlert('Sucesso!','Senha alterada com sucesso!!')
             auth.signOut()
             this.router.navigate([''])
            }
       )
        },
    erro=>{
          console.log(`Houve um erro: ${erro}`)
          this.msg.dismissLoading()
          this.msg.presentAlert('Erro!','Senha atual incorreta!!')
      }
    )
  }
}
