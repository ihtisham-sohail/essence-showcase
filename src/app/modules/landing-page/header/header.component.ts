import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/authentication/authentication.serivce';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log('Header Component');
  }
  LogoutPressed() {
    this.authService.logOut();
    this.router.navigate(['login']);
  }
}
