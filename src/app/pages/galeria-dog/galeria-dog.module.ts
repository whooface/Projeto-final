import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GaleriaDogPage } from './galeria-dog.page';

const routes: Routes = [
  {
    path: '',
    component: GaleriaDogPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GaleriaDogPage]
})
export class GaleriaDogPageModule {}
