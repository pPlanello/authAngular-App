import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './auth/guards/user.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren:  () => import('./pages/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'register',
    loadChildren:  () => import('./pages/register/register.module').then(m => m.RegisterModule)
  },
  {
    path: 'home',
    loadChildren:  () => import('./pages/home/home.module').then(m => m.HomeModule),
    canActivate: [ UserGuard ],
    canLoad: [ UserGuard ]
  },
  {
    path: '**',
    redirectTo: 'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
