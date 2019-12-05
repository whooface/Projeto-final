import { MensagemService } from './../../service/mensagem.service';
import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
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

  constructor() { }

  ngOnInit() {
  }

}
