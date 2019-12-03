import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  { path: 'adduser', loadChildren: './pages/adduser/adduser.module#AdduserPageModule' },
  { path: 'adddog', loadChildren: './pages/adddog/adddog.module#AdddogPageModule' },
  { path: 'perfildog', loadChildren: './pages/perfildog/perfildog.module#PerfildogPageModule' },
  { path: 'perfiluser', loadChildren: './pages/perfiluser/perfiluser.module#PerfiluserPageModule' },
  { path: 'login', loadChildren: './pages/login/login.module#LoginPageModule' },
  { path: 'maps', loadChildren: './pages/maps/maps.module#MapsPageModule' }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
