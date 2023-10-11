import { OAuthService } from 'angular-oauth2-oidc';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { gmailAPIBase } from 'src/app/configs/endpoint.constant';
import { AuthService } from '../authentication/authentication.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private readonly auther: AuthService) {}

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401 || err.status === 403) {
      // either refresh the token , or completely logout the user
      this.auther.logOut();
      return of([]);
    }
    return throwError(err);
  }

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let modifiedReq = request;
    if (request.url.includes(gmailAPIBase)) {
      const userToken = this.auther.getToken();
      modifiedReq = request.clone({
        headers: request.headers.set('Authorization', `Bearer ${userToken}`),
      });
    }
    return next
      .handle(modifiedReq)
      .pipe(catchError((x) => this.handleAuthError(x)));
  }
}
