import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {GuardService} from './service/guard.service'



const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'adduser',loadChildren: './pages/adduser/adduser.module#AdduserPageModule' },
  { path: 'adddog',loadChildren: './pages/adddog/adddog.module#AdddogPageModule', },
  { path: 'perfildog/:id', loadChildren: './pages/perfildog/perfildog.module#PerfildogPageModule',  },
  { path: 'perfiluser', loadChildren: './pages/perfiluser/perfiluser.module#PerfiluserPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'googlemaps', loadChildren: './pages/googlemaps/googlemaps.module#GooglemapsPageModule', canActivate:[GuardService] },
  { path: 'updateuser', loadChildren: './pages/updateuser/updateuser.module#UpdateuserPageModule' },
  { path: 'trocar-senha', loadChildren: './pages/trocar-senha/trocar-senha.module#TrocarSenhaPageModule' },
  { path: 'contatos', loadChildren: './pages/contatos/contatos.module#ContatosPageModule' },
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' },
  { path: 'notificacao', loadChildren: './pages/notificacao/notificacao.module#NotificacaoPageModule' },  { path: 'galeria-dog', loadChildren: './pages/galeria-dog/galeria-dog.module#GaleriaDogPageModule' },
  { path: 'favoritos', loadChildren: './pages/favoritos/favoritos.module#FavoritosPageModule' }








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
