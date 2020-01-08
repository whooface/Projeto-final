import { Injectable } from '@angular/core';
import {UserService} from '../service/user.service'
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GuardService implements CanActivate{

  constructor(
    private service : UserService,
    private router : Router,

  ) { }

  canActivate(
    rotaAtual: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):boolean {
  if(this.service.afAuth.auth.currentUser != null){
      console.log(this.router.url)
      return true
   }
   else{
     this.router.navigate(['/login'])
     console.log(this.router.url)
     return false
   }
    
  }
}
