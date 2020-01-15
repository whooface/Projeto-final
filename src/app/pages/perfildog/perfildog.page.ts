import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DogService } from '../../service/dog.service'
import { Dog } from '../../model/dog'
import { ModalController, NavParams } from '@ionic/angular';
import { GaleriaDogPage } from '../galeria-dog/galeria-dog.page'
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-perfildog',
  templateUrl: './perfildog.page.html',
  styleUrls: ['./perfildog.page.scss'],
  providers: [DatePipe]
})
export class PerfildogPage implements OnInit {
    
  private dog:Dog = new Dog;

  constructor(
    private rotaAtiva : ActivatedRoute,
    private nav:NavParams,
    private dogService: DogService,
    private modal:ModalController,
    private modalFotos:ModalController,
    private dataPipe:DatePipe,

  ) { }
   private idDog:string;
 
   public dataAt:any = new Date()
   

  ngOnInit() {
    setTimeout(() => {
      let dataDog = this.dataPipe.transform(this.dog.idade,'dd-MM-yyyy').substring(6,10)
      this.dataAt = this.dataPipe.transform(this.dataAt,'dd-MM-yyyy').substring(6.10)
      
     
      
     
      console.log(typeof(dataDog))
      
      
    }, 5000);
   
    
    
    

    
    
    
    

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
  ionViewWillEnter(){
    
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
