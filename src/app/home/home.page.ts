
import { Component } from '@angular/core';
import { UserService } from './../service/user.service';
import { User } from '../model/user';
import { DogService } from '../service/dog.service'
import { Dog} from '../model/dog'
import { Router } from '@angular/router';
import { MenuController, Platform } from '@ionic/angular';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { AlertController } from '@ionic/angular';
import { MensagemService } from '../service/mensagem.service'
import { ToastController } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import { PerfildogPage } from '../pages/perfildog/perfildog.page'
import { ChatPage} from '../pages/chat/chat.page'

declare var $:any


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
protected user:User = new User
protected dog:Dog;
protected dogArray = []
private nomeAbreviado:string = "";
private images: string[] = [];

  constructor(
    protected userService:UserService,
    private menu : MenuController,
    private DogService : DogService,
    private router: Router,
    public viewer: PhotoViewer,
    public platForm:Platform,
    public alert: AlertController,
    public msg: MensagemService,
    public toast:ToastController,
    private modalPerfilDog:ModalController,
    private modalChat:ModalController
  ) {
    console.log(this.userService.afAuth.auth.currentUser)
    // console.log(this.userservice.afAuth.user)
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

  chamarChat(pet){
  
    this.modalChat.create({
      component: ChatPage,
      componentProps:{
        dog:pet,
        idDog:pet.key
      }
    }).then(modal => modal.present())
  }
  abrirPerfil(idDog){
    this.modalPerfilDog.create({
      component: PerfildogPage,
      componentProps:{
        idDog:idDog
      }
    }).then(modal => modal.present())
  }
  async presentToast(msg) {
    const toast = await this.toast.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  favoritar(idDog){
    
   console.log(idDog)
   let icon =  (<HTMLInputElement>document.getElementById(idDog))
 
   
   console.log(icon)
   console.log(icon.name)
   if(icon.name == "heart"){
     console.log(this.user.interessado.indexOf(idDog))
     let index =  this.user.interessado.indexOf(idDog)
     this.user.interessado.splice(index)
     
     this.userService.update(this.user).then(
      res=>{
      this.presentToast("Removemos da sua lista de interesse!")
      }
    )
        
  }
  else{
    if(this.user.interessado == null){
      this.user.interessado = [idDog]
    }
    else{
    this.user.interessado.push(idDog)
    }
  
    this.userService.update(this.user).then(
      res=>{
      this.presentToast("Adcionamos a sua lista de interesse!")
      }
    )
  }   
  }

  enviarSolicitacao(pet){
  
            $('#bloqueio').fadeIn(0)
            $('.icon1').fadeIn(300)
            $('.icon6').delay(600).fadeIn(300)
            $('.icon2').delay(700).fadeIn(300)
            $('.icon3').delay(800).fadeIn(300)
            $('.icon4').delay(900).fadeIn(300)
            $('.icon5').delay(1000).fadeIn(300)
            
            $('.icon1').delay(1200).fadeOut(300)
            $('.icon2').delay(1200).fadeOut(300)
            $('.icon3').delay(1200).fadeOut(300)
            $('.icon4').delay(1200).fadeOut(300)
            $('.icon5').delay(1200).fadeOut(300)
            $('.icon6').delay(1200).fadeOut(300)
            $('#bloqueio').fadeOut(2600)
            //temporizador dos audios
            setTimeout(() => {
              $('audio')[0].play();
            }, 300);
            setTimeout(() => {
              $('audio')[1].play();
            }, 600);
            setTimeout(() => {
              $('audio')[2].play();
            }, 700);
            setTimeout(() => {
              $('audio')[3].play();
            }, 800);
            setTimeout(() => {
              $('audio')[4].play();
            }, 900);
            setTimeout(() => {
              $('audio')[5].play();
            }, 1000);
            
            setTimeout(()=>{
              this.chamarChat(pet)
            },2600)

          }
        



  ngOnInit(){
    $(document).ready(function(){
      //$('.descricao').hide()
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
          // marginTop:"+=50px"
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
      // marginTop:"-=50px"
    },1000)
  })
}

zoomFoto(url){
  this.viewer.show(url,"",{share:true});
}








  ionViewWillEnter() {
     
    

    this.DogService.getAll().subscribe(
      res=> {
        this.dogArray = []
        //For para apenas mostrar os pet que nao sao do usuario na tela principal
        for(let i = 0;i < res.length;i++){
          if(res[i].dono != this.userService.afAuth.auth.currentUser.uid){
            
                this.dogArray.push(res[i])
              }
            }
            
          }
        
    )

    this.menu.enable(true)
    let login = this.userService.afAuth.auth.currentUser;
    if (login) {
      this.userService.get().subscribe(
        res => {
          if (res == null) {
            this.user = new User
           if(login.displayName != null) {
            this.user = res
            this.user.foto = login.photoURL
            this.user.nome = login.displayName
           
          } 
        } else {
            this.user = res
            this.nomeAbreviado = this.user.nome.substr(0,this.user.nome.indexOf(" ")).toUpperCase()
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

  ngOnDestroy(){
    console.log("destruiu")
    
  }

}
