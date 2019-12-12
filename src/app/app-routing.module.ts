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
  { path: 'perfildog', loadChildren: './pages/perfildog/perfildog.module#PerfildogPageModule', canActivate:[GuardService] },
  { path: 'perfiluser', loadChildren: './pages/perfiluser/perfiluser.module#PerfiluserPageModule', canActivate:[GuardService] },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'googlemaps', loadChildren: './pages/googlemaps/googlemaps.module#GooglemapsPageModule', canActivate:[GuardService] }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
