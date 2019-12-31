import { Router } from '@angular/router';
import { Component} from '@angular/core';
import { UserService } from './../service/user.service';
import { User } from './../model/user';
import { MenuController } from '@ionic/angular';

declare var $:any

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
protected user:User = new User



  constructor(
    protected userService:UserService,
    private menu : MenuController,
    private router: Router
  ) {
    console.log(this.userService.afAuth.auth.currentUser)
    // console.log(this.userService.afAuth.user)
  }

  ngOnInit(){
    $(document).ready(function () {
      //you can set this, as long as it's not greater than the slides length
      var show = 1;
      //calculate each slides width depending on how many you want to show
      var w = $('#slider').width() / show;
      var l = $('.slide').length;
      
      //set each slide width
      $('.slide').width(w);
      //set the container width to fix the animation and make it look sliding
      $('#slider').width(w + l)
      
      function slider() {
          $('.slide:first-child').animate({
              marginLeft: -w //hide the first slide on the left
          }, 'slow', function () {
              //once completely hidden, move this slide next to the last slide
              $(this).appendTo($(this).parent()).css({marginLeft: 0});
          });
      }
      //use setInterval to do the timed execution and animation
      var timer = setInterval(slider, 5000);

  });

  $(document).ready(function(){
    $('.descricao').fadeOut()
  })

  }

  openDescricao(){
      $(document).ready(function () {
        console.log('test')
        $('.descricao').fadeIn('slow')
        $('.test').animate({scrollTop:$(document).height()}, 1000);
        
      }) 

  }




  ionViewWillEnter() {
    this.menu.enable(true)
    let login = this.userService.afAuth.auth.currentUser;
    if (login) {
      this.userService.get().subscribe(
        res => {
          if (res == null) {
            this.user = new User
           if(login.displayName != null) {
            this.user.foto = login.photoURL
            this.user.nome = login.displayName
          } 
        } else {
            this.user = res
            this.user.email = login.email
          }
          console.log(this.user)
        },
        erro => {
          console.log(erro)
        
          this.router.navigate(['/login'])
        }
      )
    }
  }
}