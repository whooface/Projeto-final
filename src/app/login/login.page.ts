import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  protected email:string = null;
  protected senha:string = null;

  constructor(
    private afAuth:AngularFireAuth
  ) { }

  ngOnInit() {
  }
  
  ngOnSubmit(fc) {

  }

}
