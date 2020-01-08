import { Component, OnInit } from '@angular/core';
import { UserService } from './../../service/user.service';
import { User } from './../../model/user';
@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.page.html',
  styleUrls: ['./updateuser.page.scss'],
})
export class UpdateuserPage implements OnInit {
   private array = [];
  constructor(
    private userService: UserService
  ) { }
  private user = new User
  ngOnInit() {
  }
  ionViewWillEnter() {
    this.userService.get().subscribe(
      res=>{
        this.user = res
      })
      this.userService.getAll().subscribe(
        res=>{
          this.array = res
          console.log(this.array)
        }
      )
     
    }
    
  }


