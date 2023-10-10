import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { map, fromEvent, of } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  startWith,
  switchMap,
} from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import * as fromPosts from '../../../core/store/rbook/index';
import { maxResults } from 'src/app/configs/endpoint.constant';

@Component({
  selector: 'app-rbook',
  templateUrl: './rbook.component.html',
  styleUrls: ['./rbook.component.scss'],
})
export class ForemenComponent implements OnInit, AfterViewInit {
  @ViewChild('searchInput', { static: true }) input: ElementRef;

  postList$: any;
  currPage: number = 0;
  totalPostCount: number = 0;
  subList: any[] = [];
  maxResults = maxResults;
  sortState: any = {};

  constructor(private readonly _store: Store) {}

  ngOnInit(): void {
    this.initSubscriptions();
  }

  ngAfterViewInit() {
    fromEvent<any>(this.input.nativeElement, 'keyup')
      .pipe(
        map((event) => event.target.value),
        startWith(null),
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((search) => {
          console.log(search);
          if (search !== null) {
            this._store.dispatch(
              fromPosts.getSearchedName({ searchFilter: search })
            );
          }
          return of(search);
        })
      )
      .subscribe();
  }

  private initSubscriptions(): void {
    this.postList$ = this._store.pipe(select(fromPosts.selectPostList));
    this.subList = [
      this._store.pipe(select(fromPosts.selectCurrPage)).subscribe((x) => {
        this.currPage = x;
      }),
      this._store
        .pipe(select(fromPosts.selectTotalPostCount))
        .subscribe((x) => {
          this.totalPostCount = x;
        }),
      this._store.pipe(select(fromPosts.selectSortState)).subscribe((x) => {
        this.sortState = x;
      }),
    ];
  }

  // setPaginationPages(totalCount: number): void {
  //   let divis = Math.ceil(totalCount / maxResults);
  //   this.pages = [...Array(divis).keys()];
  // }

  backPageClicked() {
    this._store.dispatch(fromPosts.getBackCachePosts());
  }

  nextPageClicked() {
    this._store.dispatch(fromPosts.getNextCachePosts());
  }

  sortBy(propertyName: string) {
    this._store.dispatch(
      fromPosts.getSortedCachePosts({
        sortBy: propertyName,
      })
    );
  }
}
