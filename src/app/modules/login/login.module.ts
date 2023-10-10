import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { LoginRoutes } from './login.routes';
import { AuthService } from 'src/app/core/authentication/authentication.serivce';

@NgModule({
  declarations: [LoginComponent],
  imports: [LoginRoutes],
  providers: [AuthService],
  bootstrap: [LoginComponent],
})
export class LoginModule {}
