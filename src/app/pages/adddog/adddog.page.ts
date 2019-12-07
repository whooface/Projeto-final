import { Dog } from './../../model/dog';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-adddog',
  templateUrl: './adddog.page.html',
  styleUrls: ['./adddog.page.scss'],
})
export class AdddogPage implements OnInit {

  protected dog: Dog = new Dog;
  constructor() { }

  ngOnInit() {
  }
  pets: any = [
    {
      id:1,

      especies: "Canino"
    },
    {
      id:2,
      
      especies:"Felino"
    }
  ]  
}
