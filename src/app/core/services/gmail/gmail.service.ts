import { Injectable } from '@angular/core';
import { IGmail } from '../../interfaces/gmail.interface';
import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { map, mergeAll, toArray, mergeMap, catchError } from 'rxjs/operators';
import {
  gmailAPIBase,
  getGLabelListUrl,
} from '../../../configs/endpoint.constant';
import { AuthService } from '../../authentication/authentication.service';
import { GmailHTTPService } from '../../http/gmail-enpoint/gmail-enpoint.service';
import { GmailResEnum } from 'src/app/shared/enums/gmail.enum';

@Injectable({
  providedIn: 'root',
})
export class GmailService {
  tt = 0;

  private totalMails: number = 0;
  private nextPageToken: string = '';
  userId: string = '';

  constructor(
    private gmailHttp: GmailHTTPService,
    private auther: AuthService
  ) {}

  getGmailInit(): Observable<IGmail[]> {
    this.tt = 1;
    this.nextPageToken = '';
    this.userId = this.auther.getUserId() as string;
    return this.getMailList();
  }

  getNextPageGmail(): Observable<IGmail[]> {
    return this.getMailList({ pageToken: this.getMextPageToken() });
  }

  getMailList(params: any = {}): Observable<any> {
    return this.gmailHttp.getEmailListIds(this.userId, params).pipe(
      map((data: any) => {
        this.nextPageToken = data?.nextPageToken;
        return data?.messages;
      }),
      mergeAll(),
      mergeMap((p: any) => this.getMailDetails(p?.id)),
      toArray()
    );
  }

  returnTruth(): boolean {
    return true;
  }

  getMailDetails(labelId: string = ''): Observable<any> {
    return this.gmailHttp.getEmailDataById(this.userId, labelId).pipe(
      map((g: any) => {
        let totalObj: any = {};
        totalObj.date = new Date(parseInt(g.internalDate)).toLocaleString();
        totalObj.labelId = labelId;
        totalObj.id = this.tt++;
        g.payload.headers.forEach((head: any) => {
          if (head.name === GmailResEnum.SUBJECT) {
            totalObj.subject = head.value;
          }
          if (head.name === GmailResEnum.FROM) {
            totalObj.from = head.value;
          }
        });
        return totalObj;
      })
    );
  }

  getMextPageToken(): string {
    return this.nextPageToken;
  }

  getTotalMailCount(): number {
    return this.totalMails;
  }
}
