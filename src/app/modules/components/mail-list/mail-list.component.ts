import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { OAuthService } from 'angular-oauth2-oidc';
import { Observable } from 'rxjs';
import { startWith, delay } from 'rxjs/operators';
import { gmailAPIBase } from '../../../configs/endpoint.constant';

import { IGmail } from '../../../core/interfaces/gmail.interface';
import { select, Store } from '@ngrx/store';
import * as fromGmails from '../../../core/store/gmail/index';

@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.component.html',
  styleUrls: ['./mail-list.component.scss'],
})
export class MailListComponent implements OnInit, OnDestroy {
  constructor(private readonly _store: Store) {}

  gmails$: Observable<IGmail[]>;
  isLoading$: Observable<boolean>;
  totalEmails$: Observable<number>;
  currPage: number = 0;
  lastestPage: number = 0;
  totalItems = 1;
  nextPageAvl: string = '';

  subList: any[] = [];

  ngOnInit(): void {
    this.initSubscriptions();
  }

  private initSubscriptions(): void {
    this.gmails$ = this._store.pipe(select(fromGmails.selectGmailList));
    this.isLoading$ = this._store.pipe(select(fromGmails.selectGmailIsLoading));
    this.subList = [
      this._store.pipe(select(fromGmails.selectNextPageAvl)).subscribe((x) => {
        this.nextPageAvl = x;
      }),
      this._store.pipe(select(fromGmails.selectCurrPage)).subscribe((x) => {
        this.currPage = x;
      }),
      this._store.pipe(select(fromGmails.selectLastestPage)).subscribe((x) => {
        this.lastestPage = x;
      }),
    ];
  }

  nextPageClicked() {
    if (this.currPage !== this.lastestPage) {
      this._store.dispatch(fromGmails.getNextCacheGmails());
    } else {
      this._store.dispatch(fromGmails.getNextGmails());
    }
  }

  backPageClicked() {
    this._store.dispatch(fromGmails.getBackCacheGmails());
  }

  ngOnDestroy(): void {
    this.subList.forEach((x) => x.unsubscribe());
  }
}
