import { NgModule } from '@angular/core';
import { LandingPageComponent } from './landing-page.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { NavigationPaneComponent } from './navigation-pane/navigation-pane.component';
import { CommonModule } from '@angular/common';
import { LandingPageRouteModule } from './landing-page.routes';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { ForemenComponent } from '../components/rbook/rbook.component';
import { MailListComponent } from '../components/mail-list/mail-list.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { GmailStoreModule } from 'src/app/core/store/gmail/gmail-store.module';
import { GmailEffects } from 'src/app/core/store/gmail/gmail.effects';
import { gmailReducer } from 'src/app/core/store/gmail/gmail.reducers';
import { MailListResolverService } from '../../core/resolver/mail-list-resolver.service';
import { RBookResolverService } from 'src/app/core/resolver/rbook-resolver.service';
import { RBookStoreModule } from 'src/app/core/store/rbook/rbook-store.module';
import { postReducer } from 'src/app/core/store/rbook/rbook.reducers';
import { PostEffects } from 'src/app/core/store/rbook/rbook.effects';

@NgModule({
  declarations: [
    LandingPageComponent,
    HeaderComponent,
    FooterComponent,
    NavigationPaneComponent,
    DashboardComponent,
    ForemenComponent,
    MailListComponent,
  ],
  imports: [
    LandingPageRouteModule,
    CommonModule,
    StoreModule.forRoot({ gmailReducer, postReducer }),
    EffectsModule.forRoot([GmailEffects, PostEffects]),
    StoreDevtoolsModule.instrument({}),
    GmailStoreModule,
    RBookStoreModule,
  ],
  providers: [MailListResolverService, RBookResolverService],
  bootstrap: [LandingPageComponent],
})
export class LandingPageModule {}
