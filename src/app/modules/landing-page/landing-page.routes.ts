import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { RbookComponent } from '../components/rbook/rbook.component';
import { MailListComponent } from '../components/mail-list/mail-list.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MailListResolverService } from '../../core/resolver/mail-list-resolver.service';
import { RBookResolverService } from 'src/app/core/resolver/rbook-resolver.service';
import { AuthGuardService } from 'src/app/core/guards/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'mail',
        component: MailListComponent,
        resolve: { mailData: MailListResolverService },
        canActivate: [AuthGuardService],
      },
      {
        path: 'social',
        component: RbookComponent,
        resolve: { rbookData: RBookResolverService },
        canActivate: [AuthGuardService],
      },
    ],
  },
];

export const LandingPageRouteModule: ModuleWithProviders<any> =
  RouterModule.forChild(routes);
