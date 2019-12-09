import { DogService } from './../../service/dog.service';
import { Dog } from './../../model/dog';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-adddog',
  templateUrl: './adddog.page.html',
  styleUrls: ['./adddog.page.scss'],
})
export class AdddogPage implements OnInit {
  protected dog = new Dog

  constructor(
    protected dogService:DogService
  ) { }

  dogs: any[] =[
    { id:1,
      porte:'Pequeno'
    },
    {id:2,
      porte:'Médio'
    },
    {id:3,
      porte:'Grande'
    }
  ];

  ngOnInit() {
  }

}
