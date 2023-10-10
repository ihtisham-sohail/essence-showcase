import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {
  getGLabelListUrl,
  getGmailDataUrl,
  gmailApiTokenValidity,
} from 'src/app/configs/endpoint.constant';

@Injectable({
  providedIn: 'root',
})
export class GmailHTTPService {
  constructor(private http: HttpClient) {}

  getEmailListIds(userId: string, params = {}): Observable<any> {
    return this.http.get(getGLabelListUrl(userId), { params });
  }

  getEmailDataById(
    userId: string = '1',
    mailId: string = '1'
  ): Observable<any> {
    return this.http.get(getGmailDataUrl(userId, mailId));
  }
}
