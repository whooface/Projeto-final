import { Dog } from './../model/dog';
import { Router } from '@angular/router';
import { Component} from '@angular/core';
import { UserService } from './../service/user.service';
import { User } from './../model/user';
import { MenuController, Platform } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';



declare var $:any


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
protected user:User = new User
private images: string[] = [];




  constructor(
    protected userService:UserService,
    private menu : MenuController,
    private router: Router,
    public viewer: PhotoViewer,
    public platForm:Platform
  ) {
    console.log(this.userService.afAuth.auth.currentUser)
    // console.log(this.userService.afAuth.user)
    this.platForm.ready().then(()=>{
      this.images = [
        'assets/fundo.jpg',
        'assets/fundo.jpg',
        'assets/fundo.jpg',
        'assets/fundo.jpg',
        'assets/fundo.jpg'
      ]
    })

  }

  ngOnInit(){

    $(document).ready(function(){
      $('.descricao').hide()
    })

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

  }

  openDescricao(){
      $(document).ready(function () {
          $('.foto').fadeOut('fast')
          $('.descricao').slideDown()
          $('.nomeDog').hide()
          $('.localDog').hide()
          $('.welcome-card').animate({
            marginTop:"+=50px"
          },2000)
          $('.album').fadeOut()  
      }) 
  }

  openFoto(){
    $(document).ready(function (){
      $('.foto').slideDown('fast')
      $('.descricao').fadeOut()
      $('.album').fadeIn()
      $('.nomeDog').fadeIn()
      $('.localDog').fadeIn()
      $('.welcome-card').animate({
        marginTop:"-=50px"
      },1000)
    })
  }

  zoomFoto(url){
    this.viewer.show(url,"",{share:true});
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