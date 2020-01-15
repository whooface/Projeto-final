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
    canActivate:[GuardService]
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'adduser',loadChildren: './pages/adduser/adduser.module#AdduserPageModule' },
  { path: 'adddog',loadChildren: './pages/adddog/adddog.module#AdddogPageModule', canActivate:[GuardService]},
  { path: 'perfildog/:id', loadChildren: './pages/perfildog/perfildog.module#PerfildogPageModule',  },
  { path: 'perfiluser', loadChildren: './pages/perfiluser/perfiluser.module#PerfiluserPageModule',canActivate:[GuardService] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'googlemaps', loadChildren: './pages/googlemaps/googlemaps.module#GooglemapsPageModule', canActivate:[GuardService] },
  { path: 'updateuser', loadChildren: './pages/updateuser/updateuser.module#UpdateuserPageModule' ,canActivate:[GuardService]},
  { path: 'trocar-senha', loadChildren: './pages/trocar-senha/trocar-senha.module#TrocarSenhaPageModule' ,canActivate:[GuardService]},
  { path: 'contatos', loadChildren: './pages/contatos/contatos.module#ContatosPageModule' ,canActivate:[GuardService]},
  { path: 'chat', loadChildren: './pages/chat/chat.module#ChatPageModule' ,canActivate:[GuardService]},
  { path: 'notificacao', loadChildren: './pages/notificacao/notificacao.module#NotificacaoPageModule',canActivate:[GuardService]},
  { path: 'galeria-dog', loadChildren: './pages/galeria-dog/galeria-dog.module#GaleriaDogPageModule' ,canActivate:[GuardService]},
  { path: 'favoritos', loadChildren: './pages/favoritos/favoritos.module#FavoritosPageModule' ,canActivate:[GuardService]}








];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
