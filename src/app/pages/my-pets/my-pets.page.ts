import { ActivatedRoute } from '@angular/router';
import { PerfildogPage } from './../perfildog/perfildog.page';
import { ModalController, NavParams, NavController } from '@ionic/angular';
import { Dog } from './../../model/dog';
import { DogService } from './../../service/dog.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-my-pets',
  templateUrl: './my-pets.page.html',
  styleUrls: ['./my-pets.page.scss'],
})
export class MyPetsPage implements OnInit {

  constructor(private dogService:DogService,
              private modalController:ModalController,
              ) { }

  public dogs:any = []
  ngOnInit() {
    
    this.dogService.getMyDogs().subscribe(
      res=>{
        this.dogs = res
      }
    )
  }

  async presentModal(i) {
    const modal = await this.modalController.create({
      component: PerfildogPage,
      componentProps:{
        idDog:i
      }
    });
    return await modal.present();
  }
}


