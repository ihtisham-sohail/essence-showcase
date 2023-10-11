import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { OAuthService, AuthConfig } from 'angular-oauth2-oidc';
import { gmailApiTokenValidity } from 'src/app/configs/endpoint.constant';
import { Observable } from 'rxjs';
import {
  clientIdString,
  issuerName,
  scopeString,
} from 'src/app/configs/auth.constant';

declare const google: any;

const oAuthConfig: AuthConfig = {
  issuer: issuerName,
  strictDiscoveryDocumentValidation: false,
  redirectUri: `${window.location.origin}`,
  clientId: clientIdString,
  scope: scopeString,
  postLogoutRedirectUri: `${window.location.origin}/login`,
  dummyClientSecret: 'test',
};
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _TOKEN_KEY = 'access_token';
  private _USER_ID = 'user_id';
  constructor(
    private http: HttpClient,
    private router: Router,
    private oAuth: OAuthService
  ) {
    oAuth.configure(oAuthConfig);
  }

  startLoginFlow() {
    this.oAuth.initLoginFlowInPopup({
      height: 100,
      width: 40,
      windowRef: window,
    });
  }

  initClientGmailAuth() {
    this.oAuth.loadDiscoveryDocument().then(() => {
      this.oAuth.tryLoginImplicitFlow().then(() => {
        if (this.oAuth.hasValidAccessToken()) {
          this.oAuth.loadUserProfile().then((userProfile: any) => {
            this.afterSignIn(userProfile);
          });
        }
      });
    });

    // google.accounts.id.initialize({
    //   client_id:
    //     '564272994165-oam1g99n57cd1tq3gg5m0r9eu4uvi1bp.apps.googleusercontent.com',
    //   callback: (response: any) => this.handleGoogleSignIn(response),
    // });
    // google.accounts.id.renderButton(
    //   document.getElementById('buttonDiv'),
    //   { size: 'large', type: 'icon', shape: 'pill' } // customization attributes
    // );
  }

  // handleGoogleSignIn(response: any): void {

  //   this.setToken(response.credential);
  //   let base64Url = response.credential.split('.')[1];
  //   let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  //   let jsonPayload = decodeURIComponent(
  //     atob(base64)
  //       .split('')
  //       .map(function (c) {
  //         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  //       })
  //       .join('')
  //   );

  //   this._TOKEN_KEY = JSON.parse(jsonPayload);

  //   //this.httpService.VerifyGoogleToken(this._TOKEN_KEY);
  //   const val = this.http
  //     .get<any>(
  //       `https://oauth2.googleapis.com/tokeninfo?id_token=${jsonPayload}`
  //     )
  //     .subscribe();
  //   console.log(val);
  //   this.router.navigate(['home']);
  // }

  afterSignIn(userProfile: any) {
    this.setUserId(userProfile.info.sub);
    this.setToken(this.oAuth.getAccessToken());
    this.router.navigate(['home']);
  }

  setUserId(userId: string): void {
    localStorage.setItem(this._USER_ID, userId);
  }

  getUserId(): string | null {
    return localStorage.getItem(this._USER_ID);
  }

  setToken(token: string): void {
    localStorage.setItem(this._TOKEN_KEY, token);
  }

  isLoggedIn(): boolean {
    //return this.oAuth.hasValidAccessToken();
    return this.checkTokenValidity();
  }

  getToken(): string {
    const tok = localStorage.getItem(this._TOKEN_KEY);
    return tok ? tok : '';
  }

  checkTokenValidity(): boolean {
    //this.verifyTokenValidityGmailAPI().subscribe((x) => console.log(x));

    return this.oAuth.hasValidAccessToken() && !!this.getToken();
    //return !!this.getToken();
  }

  verifyTokenValidityGmailAPI(): Observable<any> {
    return this.http.get(gmailApiTokenValidity(this.getToken()));
  }

  clearToken(): void {
    localStorage.removeItem(this._TOKEN_KEY);
    localStorage.removeItem(this._USER_ID);
  }

  logOut(): void {
    //this.clearToken();
    this.oAuth.logOut();
    this.clearToken();
    //this.router.navigate(['login']);
  }
}
