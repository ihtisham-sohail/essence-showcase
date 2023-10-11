import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/authentication/authentication.service';
import { LoginService } from './login.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, AfterViewInit {
  constructor(
    private router: Router,
    private authService: AuthService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {}

  handleLoginPopup() {
    this.authService.startLoginFlow();
  }

  ngAfterViewInit(): void {
    this.authService.initClientGmailAuth();
  }

  startAuthentication(): void {}
}
