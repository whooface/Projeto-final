import { Component, OnInit } from '@angular/core';
import {UserService} from '../../service/user.service';
var status = false;
@Component({
  selector: 'app-trocar-senha',
  templateUrl: './trocar-senha.page.html',
  styleUrls: ['./trocar-senha.page.scss'],
})
export class TrocarSenhaPage implements OnInit {
 
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
  }
  private senha:string;
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
  this.userService.afAuth.auth.signInWithEmailAndPassword(this.userService.afAuth.auth.currentUser.email,this.senha);
}

}
