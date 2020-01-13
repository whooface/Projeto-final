import { Component, OnInit } from '@angular/core';
import { ModalController,NavParams } from '@ionic/angular';

@Component({
  selector: 'app-galeria-dog',
  templateUrl: './galeria-dog.page.html',
  styleUrls: ['./galeria-dog.page.scss'],
})
export class GaleriaDogPage implements OnInit {
   
  constructor(
    private modal:ModalController,
    private nav:NavParams
  ) { }

  slideOpts = {
    initialSlide: 2,
    speed: 400000
  };
 
  private img:string;
  ngOnInit() {
  
  this.img = this.nav.get('img')
  console.log(this.img)
  }
  
  close(){
   this.modal.dismiss()
  }
}
