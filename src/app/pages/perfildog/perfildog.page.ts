import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DogService } from '../../service/dog.service'
import { Dog } from '../../model/dog'
import { ModalController, NavParams } from '@ionic/angular';
import { GaleriaDogPage } from '../galeria-dog/galeria-dog.page'

@Component({
  selector: 'app-perfildog',
  templateUrl: './perfildog.page.html',
  styleUrls: ['./perfildog.page.scss'],
})
export class PerfildogPage implements OnInit {

  constructor(
    private rotaAtiva : ActivatedRoute,
    private nav:NavParams,
    private dogService: DogService,
    private modal:ModalController,
    private modalFotos:ModalController
  ) { }
   private idDog:string;
   private dog:Dog = new Dog;

  ngOnInit() {
   if(this.rotaAtiva.snapshot.params['id']){
    this.idDog = this.rotaAtiva.snapshot.params['id']
   }
   if(this.nav.get('idDog')){
     this.idDog = this.nav.get('idDog')
    
   }
 

   this.dogService.get(this.idDog).subscribe(
     res=>{
       this.dog = res;
     }
   )
  }

  close(){
    this.modal.dismiss()
  }
  abrirFoto(i){
    this.modalFotos.create({
      component: GaleriaDogPage,
      componentProps:{
        img: this.dog.fotos[i],
        
      }
    }).then(modal => modal.present())
  }
  
}
