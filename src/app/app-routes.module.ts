import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./modules/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
    canActivate: [AuthGuardService],
  },
  {
    path: '**',
    redirectTo: '/login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
