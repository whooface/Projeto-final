import { DogService } from './../../service/dog.service';
import { Dog } from './../../model/dog';
import { MensagemService } from './../../service/mensagem.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';


@Component({
  selector: 'app-adddog',
  templateUrl: './adddog.page.html',
  styleUrls: ['./adddog.page.scss'],
})
export class AdddogPage implements OnInit {

  protected dog: Dog = new Dog;
  private pets: Array<Object> = []


  constructor(
    private dogService : DogService,
    private msg : MensagemService,
    private router:Router,
    private camera:Camera,
    public actionSheetController: ActionSheetController,
  ) { 
    this.pets = [
      {
       especie: "Canina",
       sexo : "Masculino",
       tempo: "Ano",
       
      }
      ,
      {
       especie: "Felino",
       sexo : "Feminino",
       tempo: "Meses"
       
      },
     
    ]
  
  }

  ngOnInit() {
  }

  onSubmit(form){
    //console.log(this.user);
    this.msg.presentLoading()
    this.dogService.add(this.dog).then(
      res=>{
        //console.log("Cadastrado!", res);
        this.msg.dismissLoading()
        this.msg.presentAlert("DAAALE","Cadastado com sucesso!")
        this.dog = new Dog;
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
