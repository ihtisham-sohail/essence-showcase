import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './landing-page.component';
import { ForemenComponent } from '../components/rbook/rbook.component';
import { MailListComponent } from '../components/mail-list/mail-list.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { MailListResolverService } from '../../core/resolver/mail-list-resolver.service';
import { RBookResolverService } from 'src/app/core/resolver/rbook-resolver.service';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'mail',
        component: MailListComponent,
        resolve: { mailData: MailListResolverService },
      },
      {
        path: 'social',
        component: ForemenComponent,
        resolve: { rbookData: RBookResolverService },
      },
    ],
  },
];

export const LandingPageRouteModule: ModuleWithProviders<any> =
  RouterModule.forChild(routes);
