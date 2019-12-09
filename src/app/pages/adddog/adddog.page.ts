import { DogService } from './../../service/dog.service';
import { Dog } from './../../model/dog';
import { Component, OnInit } from '@angular/core';
import { stringify } from 'querystring';



@Component({
  selector: 'app-adddog',
  templateUrl: './adddog.page.html',
  styleUrls: ['./adddog.page.scss'],
})
export class AdddogPage implements OnInit {
  protected dog = new Dog
  private pets: Array<Object> = []

  constructor(
    protected dogService:DogService
  ) { 
    this.pets = [
      {
       especie: "Canina"
       
      }
      ,
      {
       especie: "Felino"
      },
     
    ]
  }

  
  ngOnInit() {
  }
  

  onSubmit(form){
    console.log(this.dog.especie,
      this.dog.nome)
  }
}
