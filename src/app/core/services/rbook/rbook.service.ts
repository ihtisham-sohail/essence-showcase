import { Injectable } from '@angular/core';
import { IPost } from '../../interfaces/rbook.interface';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { map, mergeAll, toArray, mergeMap, catchError } from 'rxjs/operators';
import {
  gmailAPIBase,
  getGLabelListUrl,
  postListUrl,
} from '../../../configs/endpoint.constant';
import { AuthService } from '../../authentication/authentication.serivce';

@Injectable({
  providedIn: 'root',
})
export class RbookService {
  userId = '110916484611327720160';

  constructor(
    private auth: AuthService,
    private oAuth: OAuthService,
    private httpClient: HttpClient
  ) {}

  getAllPosts(): Observable<IPost[]> {
    return this.httpClient.get<IPost[]>(postListUrl);
  }
}
