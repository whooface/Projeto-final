import { User } from './../../model/user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adduser',
  templateUrl: './adduser.page.html',
  styleUrls: ['./adduser.page.scss'],
})
export class AdduserPage implements OnInit {
  protected usuario = new User;
  constructor() { }

  ngOnInit() {

  }

  onSubmit(){
    console.log(this.usuario)
  }

}
